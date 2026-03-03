#!/usr/bin/env python3
"""Analyze sensor and input circuits across all REC designs.

Finds thermistors, current sense resistors, voltage dividers, optocouplers,
hall effect sensors, pressure/temperature sensors. Maps signal conditioning
circuits (op-amps, filters, voltage references).

Output: analysis/sensor_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "sensor_patterns.json")

# Sensor patterns
THERMISTOR_RE = re.compile(r"NTC|PTC|THERMIST|10K.*NTC|NTCLE|B57\d+|TDK", re.I)
CURRENT_SENSE_RE = re.compile(r"SHUNT|SENSE|0\.0\d+|0\.1[^0-9]|INA\d+|ACS\d+|HALL", re.I)
OPAMP_RE = re.compile(r"LM358|LM324|MCP60\d+|OPA\d+|TL\d{2,3}|LM741|AD82\d+|INA\d+", re.I)
VREF_RE = re.compile(r"VREF|LM336|LM385|TL431|MCP1525|REF\d+|ADR\d+", re.I)
OPTO_INPUT_RE = re.compile(r"PC817|4N\d{2}|6N\d{2}|CNY\d+|LTV\d+|TLP\d+|H11", re.I)
HALL_RE = re.compile(r"HALL|A130\d|AH\d{3,4}|DRV\d+|SS49|ACS7\d+", re.I)
TEMP_SENSOR_RE = re.compile(r"DS18B20|LM35|TMP\d+|MCP9\d+|BME\d+|DHT\d+|SHT\d+", re.I)
PRESSURE_RE = re.compile(r"BMP\d+|MPX\d+|MPXV\d+|PRESSURE|PSI|TRANSDUCER", re.I)

# Analog signal conditioning
FILTER_CAP_RE = re.compile(r"^C\d", re.I)
MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)
ANALOG_NET_RE = re.compile(r"AN\d|A/D|ADC|ANALOG|SENSE|THERM|NTC|TEMP|CURR|VOLT", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing sensor circuits across {len(boards)} boards...")

    sensor_designs = []
    sensor_type_stats = defaultdict(int)
    conditioning_stats = defaultdict(int)
    thermistor_values = defaultdict(int)
    current_sense_values = defaultdict(int)
    voltage_divider_count = 0

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements:
            continue

        elem_map = {e["name"]: e for e in elements}
        elem_nets = defaultdict(set)
        net_elements = defaultdict(set)

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)
                net_elements[net_name].add(e_name)

        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        sensors = []
        opamps = []
        vrefs = []
        opto_inputs = []
        mcus = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            val = elem.get("value", "") or ""
            search = f"{val} {elem.get('package', '')} {deviceset}"

            # Thermistors
            if THERMISTOR_RE.search(search) or (ref_prefix(elem["name"]) in ("RT", "TH", "NTC")):
                sensors.append({"name": elem["name"], "value": val, "type": "thermistor"})
                sensor_type_stats["thermistor"] += 1
                thermistor_values[val] += 1

            # Current sense
            elif CURRENT_SENSE_RE.search(search) and ref_prefix(elem["name"]) in ("R", "U"):
                # Check if it's a low-value resistor (current sense) or an IC
                if ref_prefix(elem["name"]) == "R":
                    # Low value resistors used as current sense
                    try:
                        r_val = float(re.sub(r"[^0-9.]", "", val or "999"))
                        if r_val < 1.0:
                            sensors.append({"name": elem["name"], "value": val, "type": "current_sense_resistor"})
                            sensor_type_stats["current_sense_resistor"] += 1
                            current_sense_values[val] += 1
                    except ValueError:
                        pass
                else:
                    sensors.append({"name": elem["name"], "value": val, "type": "current_sense_ic"})
                    sensor_type_stats["current_sense_ic"] += 1

            # Temperature sensors (digital)
            elif TEMP_SENSOR_RE.search(search):
                sensors.append({"name": elem["name"], "value": deviceset or val, "type": "temp_sensor"})
                sensor_type_stats["temp_sensor"] += 1

            # Hall effect sensors
            elif HALL_RE.search(search):
                sensors.append({"name": elem["name"], "value": val, "type": "hall_sensor"})
                sensor_type_stats["hall_sensor"] += 1

            # Pressure sensors
            elif PRESSURE_RE.search(search):
                sensors.append({"name": elem["name"], "value": val, "type": "pressure_sensor"})
                sensor_type_stats["pressure_sensor"] += 1

            # Optocoupler inputs (signal isolation)
            elif OPTO_INPUT_RE.search(search):
                opto_inputs.append({"name": elem["name"], "value": deviceset or val})
                sensor_type_stats["optocoupler_input"] += 1

            # Op-amps (signal conditioning)
            elif OPAMP_RE.search(search):
                opamps.append({"name": elem["name"], "value": deviceset or val})
                conditioning_stats["opamp"] += 1

            # Voltage references
            elif VREF_RE.search(search):
                vrefs.append({"name": elem["name"], "value": deviceset or val})
                conditioning_stats["voltage_reference"] += 1

            # MCUs
            if MCU_RE.search(search):
                mcus.append(elem)

        # Find voltage dividers: two resistors in series on an analog net
        for net_name in set().union(*[elem_nets.get(e["name"], set()) for e in elements]):
            if not ANALOG_NET_RE.search(net_name):
                continue
            resistors_on_net = [e for e in net_elements.get(net_name, set())
                                if ref_prefix(e) == "R"]
            if len(resistors_on_net) >= 2:
                # Check if any MCU is also on this net
                has_mcu = any(MCU_RE.search(f"{elem_map.get(e, {}).get('value', '')}") for e in net_elements.get(net_name, set()))
                if has_mcu:
                    voltage_divider_count += 1
                    sensors.append({
                        "name": f"divider_{net_name}",
                        "value": f"{', '.join(elem_map.get(r, {}).get('value', '') for r in resistors_on_net[:2])}",
                        "type": "voltage_divider",
                        "net": net_name,
                    })
                    sensor_type_stats["voltage_divider"] += 1

        if not sensors and not opto_inputs:
            continue

        # Map sensor connections to MCU pins
        sensor_mcu_connections = []
        if schematic:
            for sensor in sensors:
                s_nets = elem_nets.get(sensor["name"], set())
                for mcu in mcus:
                    mcu_pins = get_part_pins(schematic, mcu["name"])
                    for mp in mcu_pins:
                        if mp["net"] in s_nets:
                            sensor_mcu_connections.append({
                                "sensor": sensor["name"],
                                "sensorType": sensor["type"],
                                "mcuPin": mp["pin"],
                                "net": mp["net"],
                                "mcu": mcu.get("value", ""),
                            })

        sensor_designs.append({
            "design": design,
            "sensors": sensors,
            "optoInputs": opto_inputs,
            "opamps": opamps,
            "voltageRefs": vrefs,
            "mcuConnections": sensor_mcu_connections[:20],
            "sensorCount": len(sensors),
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_sensors": len(sensor_designs),
            "total_sensors": sum(d["sensorCount"] for d in sensor_designs),
        },
        "sensor_types": dict(sorted(sensor_type_stats.items(), key=lambda x: -x[1])),
        "conditioning_components": dict(sorted(conditioning_stats.items(), key=lambda x: -x[1])),
        "thermistor_values": dict(sorted(thermistor_values.items(), key=lambda x: -x[1])[:10]),
        "current_sense_values": dict(sorted(current_sense_values.items(), key=lambda x: -x[1])[:10]),
        "designs": sensor_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with sensors: {len(sensor_designs)}")
    print(f"  Sensor types: {dict(sensor_type_stats)}")
    print(f"  Conditioning: {dict(conditioning_stats)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
