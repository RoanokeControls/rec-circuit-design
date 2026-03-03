#!/usr/bin/env python3
"""Analyze power supply capacity and load budget per board.

For each board, determines power supply topology, infers current capacity
from regulator types, catalogs loads (MCU, relays, triacs, LEDs, displays).

Output: analysis/power_capacity_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, classify_regulator_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "power_capacity_patterns.json")

# Regulator current ratings (typical max output current in mA)
REGULATOR_RATINGS = {
    "NCP1117": {"current_ma": 1000, "topology": "ldo"},
    "SPX3819": {"current_ma": 500, "topology": "ldo"},
    "AP2112": {"current_ma": 600, "topology": "ldo"},
    "LM317": {"current_ma": 1500, "topology": "ldo"},
    "MC7805": {"current_ma": 1000, "topology": "linear"},
    "LM7805": {"current_ma": 1000, "topology": "linear"},
    "MC7812": {"current_ma": 1000, "topology": "linear"},
    "MC7815": {"current_ma": 1000, "topology": "linear"},
    "AOZ1282": {"current_ma": 2000, "topology": "buck"},
    "AOZ1284": {"current_ma": 4000, "topology": "buck"},
    "TPS54302": {"current_ma": 3000, "topology": "buck"},
    "TPS5430": {"current_ma": 3000, "topology": "buck"},
    "MC33063": {"current_ma": 1500, "topology": "buck"},
    "MAX1672": {"current_ma": 500, "topology": "boost"},
    "IRM-05": {"current_ma": 1000, "topology": "ac-dc"},
    "IRM-10": {"current_ma": 2000, "topology": "ac-dc"},
    "IRM-20": {"current_ma": 4000, "topology": "ac-dc"},
}

# Load current estimates (typical mA)
LOAD_ESTIMATES = {
    "mcu_pic": 25,
    "mcu_esp32": 240,
    "mcu_stm32": 50,
    "mcu_rp2040": 45,
    "mcu_atmega": 20,
    "relay": 70,
    "led": 15,
    "opto": 10,
    "display_lcd": 3,
    "display_oled": 20,
    "rs485_transceiver": 50,
    "usb_bridge": 25,
    "shift_register": 15,
    "darlington_driver": 5,
}

MCU_PATTERNS = [
    (re.compile(r"PIC1[268]", re.I), "mcu_pic"),
    (re.compile(r"ESP32", re.I), "mcu_esp32"),
    (re.compile(r"STM32", re.I), "mcu_stm32"),
    (re.compile(r"RP2040", re.I), "mcu_rp2040"),
    (re.compile(r"ATMEGA|ATSAMD", re.I), "mcu_atmega"),
]

RELAY_RE = re.compile(r"RELAY|RLY|G5V|G2R|OMRON|HF\d{2}|SRD|JQC", re.I)
LED_RE = re.compile(r"^LED\d|^D\d.*LED", re.I)
OPTO_RE = re.compile(r"MOC3\d|PC817|TLP\d|4N\d{2}", re.I)
DISPLAY_RE = re.compile(r"LCD|OLED|7.?SEG|DISPLAY|NHD|SSD1306", re.I)
RS485_RE = re.compile(r"MAX485|SP3485|ADM485|SN75176", re.I)
USB_BRIDGE_RE = re.compile(r"FT232|CH340|CP210|MCP2221", re.I)
SHIFT_REG_RE = re.compile(r"74HC595|74HC164|74HC573|SN74", re.I)
DARLINGTON_RE = re.compile(r"ULN2003|ULN2803|UDN2981|TD62783", re.I)

REGULATOR_RE = re.compile(
    r"NCP1117|SPX3819|AP2112|LM317|MC78\d{2}|LM78\d{2}|AOZ\d+|TPS5\d+|MC33063|MAX1672|IRM.?\d+",
    re.I,
)


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
    print(f"Analyzing power capacity across {len(boards)} boards...")

    board_profiles = []
    topology_counts = defaultdict(int)
    supply_voltage_counts = defaultdict(int)

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements:
            continue

        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        elem_map = {e["name"]: e for e in elements}
        elem_nets = defaultdict(set)

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)

        # Find regulators and their ratings
        regulators = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if REGULATOR_RE.search(search):
                m = REGULATOR_RE.search(search)
                reg_name = m.group(0)

                # Look up rating
                rating = None
                for key, info in REGULATOR_RATINGS.items():
                    if key.lower() in reg_name.lower():
                        rating = info
                        break

                # Determine output voltage from nets or pin names
                output_voltage = None
                if schematic:
                    pin_class = classify_regulator_pins(elem["name"], schematic)
                    for net in pin_class.get("output_nets", []):
                        v_match = re.search(r"(\d+\.?\d*)V|(\d+)V(\d+)", net, re.I)
                        if v_match:
                            output_voltage = v_match.group(0)
                            break

                if not output_voltage:
                    nets = elem_nets.get(elem["name"], set())
                    for n in nets:
                        v_match = re.search(r"\+?(\d+\.?\d*)V", n, re.I)
                        if v_match:
                            output_voltage = v_match.group(0)

                regulators.append({
                    "name": elem["name"],
                    "part": reg_name,
                    "currentMa": rating["current_ma"] if rating else None,
                    "topology": rating["topology"] if rating else "unknown",
                    "outputVoltage": output_voltage,
                })

                if rating:
                    topology_counts[rating["topology"]] += 1
                if output_voltage:
                    supply_voltage_counts[output_voltage] += 1

        # Count loads
        loads = defaultdict(int)
        load_details = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            # MCUs
            for pattern, load_type in MCU_PATTERNS:
                if pattern.search(search):
                    loads[load_type] += 1
                    load_details.append({"type": load_type, "ref": elem["name"], "estimatedMa": LOAD_ESTIMATES.get(load_type, 0)})
                    break

            # Relays
            if RELAY_RE.search(search) or ref_prefix(elem["name"]) == "K":
                loads["relay"] += 1
                load_details.append({"type": "relay", "ref": elem["name"], "estimatedMa": LOAD_ESTIMATES["relay"]})

            # LEDs
            if ref_prefix(elem["name"]) == "LED" or LED_RE.search(search):
                loads["led"] += 1

            # Optos
            if OPTO_RE.search(search):
                loads["opto"] += 1

            # Displays
            if DISPLAY_RE.search(search):
                if re.search(r"OLED|SSD1306", search, re.I):
                    loads["display_oled"] += 1
                    load_details.append({"type": "display_oled", "ref": elem["name"], "estimatedMa": LOAD_ESTIMATES["display_oled"]})
                else:
                    loads["display_lcd"] += 1
                    load_details.append({"type": "display_lcd", "ref": elem["name"], "estimatedMa": LOAD_ESTIMATES["display_lcd"]})

            # RS-485
            if RS485_RE.search(search):
                loads["rs485_transceiver"] += 1
                load_details.append({"type": "rs485_transceiver", "ref": elem["name"], "estimatedMa": LOAD_ESTIMATES["rs485_transceiver"]})

            # USB bridge
            if USB_BRIDGE_RE.search(search):
                loads["usb_bridge"] += 1

            # Shift registers
            if SHIFT_REG_RE.search(search):
                loads["shift_register"] += 1

            # Darlington drivers
            if DARLINGTON_RE.search(search):
                loads["darlington_driver"] += 1

        # Estimate total current
        estimated_load_ma = 0
        for load_type, count in loads.items():
            estimated_load_ma += LOAD_ESTIMATES.get(load_type, 5) * count
        # Add LED current
        estimated_load_ma += loads.get("led", 0) * LOAD_ESTIMATES["led"]

        # Total supply capacity
        total_supply_ma = sum(r["currentMa"] or 0 for r in regulators)

        if regulators or sum(loads.values()) > 2:
            board_profiles.append({
                "design": design,
                "regulators": regulators,
                "totalSupplyCapacityMa": total_supply_ma,
                "loads": dict(loads),
                "estimatedLoadMa": estimated_load_ma,
                "headroomMa": total_supply_ma - estimated_load_ma if total_supply_ma > 0 else None,
                "componentCount": len(elements),
            })

    # Sort by complexity
    board_profiles.sort(key=lambda x: -(x.get("estimatedLoadMa", 0)))

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "boards_with_power_data": len(board_profiles),
            "topology_distribution": dict(sorted(topology_counts.items(), key=lambda x: -x[1])),
            "supply_voltages": dict(sorted(supply_voltage_counts.items(), key=lambda x: -x[1])),
        },
        "boards": board_profiles,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Boards with power data: {len(board_profiles)}")
    print(f"  Topologies: {dict(topology_counts)}")
    print(f"  Supply voltages: {dict(supply_voltage_counts)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
