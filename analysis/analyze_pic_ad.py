#!/usr/bin/env python3
"""Analyze PIC MCU pin connections — especially A/D channels and all I/O.

For every PIC MCU found in the schematics, enumerates every pin connection,
classifies pins by function (analog, digital I/O, power, programming, comms),
and maps what sensors/signals connect to analog inputs.

Output: analysis/pic_ad_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "pic_ad_patterns.json")

PIC_RE = re.compile(r"PIC1[268]F?\d+", re.I)

# Pin function classification
AD_PIN_RE = re.compile(r"AN\d|RA\d|RB\d|RC\d|RD\d|RE\d", re.I)
ANALOG_PIN_RE = re.compile(r"AN\d+|ANA\d+|VREF|CVREF|DAC", re.I)

# What's connected to analog pins — infer from net names and connected parts
SENSOR_PATTERNS = [
    (re.compile(r"THERM|NTC|PTC|TEMP|T_SENS", re.I), "thermistor"),
    (re.compile(r"I_SENSE|ISENSE|CURRENT|SHUNT|CT\d", re.I), "current_sense"),
    (re.compile(r"V_DIV|VDIV|V_SENSE|VSENSE|V_MON|VMON|VFEEDBACK|FB", re.I), "voltage_divider"),
    (re.compile(r"POT|TRIM|ADJ|WIPER", re.I), "potentiometer"),
    (re.compile(r"PHOTO|LDR|LIGHT|AMBIENT", re.I), "light_sensor"),
    (re.compile(r"PRESSURE|PSI|BAR|TRANSDUCER", re.I), "pressure_sensor"),
    (re.compile(r"HUMID|RH|MOISTURE", re.I), "humidity_sensor"),
    (re.compile(r"BATT|BATTERY|CELL", re.I), "battery_monitor"),
    (re.compile(r"AC_", re.I), "ac_measurement"),
]

# Digital output patterns
OUTPUT_PATTERNS = [
    (re.compile(r"TRIAC|BTA|BTB|GATE", re.I), "triac_drive"),
    (re.compile(r"RELAY|RLY|K\d", re.I), "relay_drive"),
    (re.compile(r"LED|INDICATOR|STATUS", re.I), "led_drive"),
    (re.compile(r"BUZZER|BEEP|ALARM", re.I), "buzzer"),
    (re.compile(r"MOTOR|PWM|FAN", re.I), "motor_control"),
]

# Communication patterns
COMM_PATTERNS = [
    (re.compile(r"SDA|SCL|I2C", re.I), "i2c"),
    (re.compile(r"MOSI|MISO|SCK|SS|SPI", re.I), "spi"),
    (re.compile(r"TX|RX|UART|SERIAL|RS485|RS232", re.I), "uart"),
    (re.compile(r"CAN", re.I), "can"),
    (re.compile(r"USB", re.I), "usb"),
    (re.compile(r"1WIRE|OW|ONEWIRE", re.I), "onewire"),
]


def classify_pin_function(pin_name, net_name, connected_parts):
    """Classify a PIC pin by its function based on pin name, net, and connected parts."""
    pin_upper = pin_name.upper()
    net_upper = (net_name or "").upper()
    combined = f"{net_name} {' '.join(connected_parts)}"

    # Power pins
    if any(k in pin_upper for k in ("VDD", "VCC", "VSS", "GND", "AVDD", "AVSS")):
        return "power", None

    # Programming pins
    if any(k in pin_upper for k in ("PGC", "PGD", "MCLR", "VPP")):
        return "programming", "ICSP"

    # Check if pin has analog capability
    is_analog_capable = bool(re.search(r"AN\d+", pin_upper))

    # Check communication first
    for pattern, comm_type in COMM_PATTERNS:
        if pattern.search(pin_upper) or pattern.search(net_upper):
            return "communication", comm_type

    # Check sensor connections on analog-capable pins
    if is_analog_capable:
        for pattern, sensor_type in SENSOR_PATTERNS:
            if pattern.search(combined):
                return "analog_input", sensor_type

    # Check digital output patterns
    for pattern, output_type in OUTPUT_PATTERNS:
        if pattern.search(combined):
            return "digital_output", output_type

    # If analog-capable but no specific sensor identified
    if is_analog_capable and net_name and net_name not in ("", "GND", "N$*"):
        return "analog_input", "general_adc"

    # Crystal/oscillator
    if any(k in pin_upper for k in ("OSC", "CLKI", "CLKO")):
        return "crystal", None

    # General digital I/O
    if net_name and not net_name.startswith("N$"):
        return "digital_io", None

    return "unconnected", None


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing PIC A/D connections across {len(boards)} boards...")

    pic_designs = []
    all_pin_usage = defaultdict(int)
    analog_sources = defaultdict(int)
    pin_function_counts = defaultdict(int)
    comm_usage = defaultdict(int)
    output_usage = defaultdict(int)

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements:
            continue

        # Load schematic for pin-level data
        schematic = load_schematic_for_board(bpath)
        if not schematic:
            continue

        part_info = build_part_info_map(schematic)

        # Build net -> element mapping from board
        net_elements = defaultdict(set)
        elem_nets = defaultdict(set)
        elem_map = {e["name"]: e for e in elements}

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)
                net_elements[net_name].add(e_name)

        # Find PIC MCUs
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if not PIC_RE.search(search):
                continue

            m = PIC_RE.search(search)
            pic_part = m.group(0)

            # Get all pin connections from schematic
            pins = get_part_pins(schematic, elem["name"])
            if not pins:
                continue

            pin_details = []
            analog_pins = []
            digital_outputs = []
            comms = []

            for p in pins:
                pin_name = p["pin"]
                net = p["net"]

                # Find other elements on this net
                connected = []
                for other_elem in net_elements.get(net, set()):
                    if other_elem != elem["name"]:
                        oe = elem_map.get(other_elem)
                        if oe:
                            connected.append(f"{other_elem}:{oe.get('value', '')}")

                func_type, func_detail = classify_pin_function(
                    pin_name, net, connected
                )

                pin_info = {
                    "pin": pin_name,
                    "net": net,
                    "function": func_type,
                    "detail": func_detail,
                    "connectedParts": connected[:5],
                }
                pin_details.append(pin_info)
                pin_function_counts[func_type] += 1

                if func_type == "analog_input":
                    analog_pins.append(pin_info)
                    if func_detail:
                        analog_sources[func_detail] += 1
                elif func_type == "digital_output":
                    digital_outputs.append(pin_info)
                    if func_detail:
                        output_usage[func_detail] += 1
                elif func_type == "communication":
                    comms.append(pin_info)
                    if func_detail:
                        comm_usage[func_detail] += 1

            pic_designs.append({
                "design": design,
                "partNumber": pic_part,
                "elementName": elem["name"],
                "totalPins": len(pins),
                "analogPins": analog_pins,
                "digitalOutputs": digital_outputs,
                "communications": comms,
                "pinSummary": {
                    "analog_input": len(analog_pins),
                    "digital_output": len(digital_outputs),
                    "communication": len(comms),
                    "programming": sum(1 for p in pin_details if p["function"] == "programming"),
                    "power": sum(1 for p in pin_details if p["function"] == "power"),
                    "crystal": sum(1 for p in pin_details if p["function"] == "crystal"),
                    "digital_io": sum(1 for p in pin_details if p["function"] == "digital_io"),
                    "unconnected": sum(1 for p in pin_details if p["function"] == "unconnected"),
                },
                "allPins": pin_details,
            })

    # Summary stats
    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "pic_designs_found": len(pic_designs),
            "unique_pics": len(set(d["partNumber"] for d in pic_designs)),
        },
        "pin_function_distribution": dict(sorted(pin_function_counts.items(), key=lambda x: -x[1])),
        "analog_source_types": dict(sorted(analog_sources.items(), key=lambda x: -x[1])),
        "digital_output_types": dict(sorted(output_usage.items(), key=lambda x: -x[1])),
        "communication_types": dict(sorted(comm_usage.items(), key=lambda x: -x[1])),
        "pic_designs": pic_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  PIC designs found: {len(pic_designs)}")
    print(f"  Unique PIC parts: {len(set(d['partNumber'] for d in pic_designs))}")
    print(f"  Analog source types: {dict(analog_sources)}")
    print(f"  Communication types: {dict(comm_usage)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
