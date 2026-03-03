#!/usr/bin/env python3
"""Analyze relay and driver circuits across all REC designs.

Finds relays, solenoids, motor drivers, catalogs flyback diodes,
driver transistors/ICs, coil voltages, MCU connections.

Output: analysis/relay_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "relay_patterns.json")

RELAY_RE = re.compile(r"RELAY|RLY|G5V|G2R|OMRON|HF\d{2}|SRD|JQC|T90|JS\d|JW\d", re.I)
SOLENOID_RE = re.compile(r"SOLENOID|SOL|VALVE|ACTUATOR", re.I)
MOTOR_RE = re.compile(r"MOTOR|L298|L293|A4988|DRV\d|TB6612|BTS\d", re.I)
FLYBACK_RE = re.compile(r"1N4\d+|1N5\d+|BAV\d+|UF\d+|FR\d+|RL\d+|DIODE", re.I)
DRIVER_IC_RE = re.compile(r"ULN2003|ULN2803|UDN2981|TD62783|TPIC\d|TBD62\d", re.I)
TRANSISTOR_RE = re.compile(r"2N\d+|BC\d+|BSS\d+|IRLML|IRF\d+|FQP|TIP\d+|MMBT|S8050", re.I)
MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)


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
    print(f"Analyzing relay/driver circuits across {len(boards)} boards...")

    relay_designs = []
    relay_type_stats = defaultdict(int)
    driver_stats = defaultdict(int)
    flyback_stats = defaultdict(int)
    coil_voltage_stats = defaultdict(int)

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

        # Find relays
        relays = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if RELAY_RE.search(search) or ref_prefix(elem["name"]) == "K":
                relays.append(elem)
                relay_type_stats[elem.get("value", "") or deviceset] += 1

                # Infer coil voltage from nets or value
                val = (elem.get("value", "") or "").upper()
                for v in ("5V", "12V", "24V", "48V"):
                    if v in val:
                        coil_voltage_stats[v] += 1
                        break
                else:
                    nets = elem_nets.get(elem["name"], set())
                    for n in nets:
                        for v in ("5V", "12V", "24V"):
                            if v in n.upper():
                                coil_voltage_stats[v] += 1
                                break

        # Find solenoids, motors
        solenoids = []
        motors = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if SOLENOID_RE.search(search):
                solenoids.append(elem)
            elif MOTOR_RE.search(search):
                motors.append(elem)

        if not relays and not solenoids and not motors:
            continue

        # Find driver components
        drivers = []
        flyback_diodes = []
        transistors = []
        mcus = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if DRIVER_IC_RE.search(search):
                m = DRIVER_IC_RE.search(search)
                drivers.append({"name": elem["name"], "value": m.group(0)})
                driver_stats[m.group(0)] += 1
            elif TRANSISTOR_RE.search(search) or ref_prefix(elem["name"]) == "Q":
                transistors.append({"name": elem["name"], "value": elem.get("value", "")})
            elif FLYBACK_RE.search(search) and ref_prefix(elem["name"]) == "D":
                # Check if diode is on same net as a relay
                d_nets = elem_nets.get(elem["name"], set())
                for relay in relays:
                    r_nets = elem_nets.get(relay["name"], set())
                    if d_nets & r_nets:
                        flyback_diodes.append({"name": elem["name"], "value": elem.get("value", "")})
                        flyback_stats[elem.get("value", "")] += 1
                        break

            if MCU_RE.search(search):
                mcus.append(elem)

        # Map MCU pins driving relays (via drivers or transistors)
        relay_drive_details = []
        for relay in relays:
            r_nets = elem_nets.get(relay["name"], set())

            # Find what drives this relay's coil
            driver_chain = []
            for driver in drivers:
                d_nets = elem_nets.get(driver["name"], set())
                if d_nets & r_nets:
                    driver_chain.append({"type": "driver_ic", "value": driver["value"]})

                    # Find MCU pin driving this driver
                    if schematic:
                        d_pins = get_part_pins(schematic, driver["name"])
                        for dp in d_pins:
                            if any(k in dp["pin"].upper() for k in ("IN", "I", "1B", "2B")):
                                for mcu in mcus:
                                    if mcu["name"] in net_elements.get(dp["net"], set()):
                                        mcu_pins = get_part_pins(schematic, mcu["name"])
                                        mcu_pin = next((mp["pin"] for mp in mcu_pins if mp["net"] == dp["net"]), None)
                                        driver_chain.append({"type": "mcu_pin", "mcu": mcu.get("value", ""), "pin": mcu_pin})

            for transistor in transistors:
                t_nets = elem_nets.get(transistor["name"], set())
                if t_nets & r_nets:
                    driver_chain.append({"type": "transistor", "value": transistor["value"]})

            relay_drive_details.append({
                "relay": relay["name"],
                "value": relay.get("value", ""),
                "driverChain": driver_chain,
                "hasFlyback": any(
                    elem_nets.get(fb["name"], set()) & r_nets
                    for fb in flyback_diodes
                ),
            })

        relay_designs.append({
            "design": design,
            "relayCount": len(relays),
            "relays": relay_drive_details,
            "solenoidCount": len(solenoids),
            "motorCount": len(motors),
            "driverICs": drivers,
            "transistors": transistors[:10],
            "flybackDiodes": flyback_diodes[:10],
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_relays": len(relay_designs),
            "total_relays": sum(d["relayCount"] for d in relay_designs),
        },
        "relay_types": dict(sorted(relay_type_stats.items(), key=lambda x: -x[1])[:20]),
        "driver_ics": dict(sorted(driver_stats.items(), key=lambda x: -x[1])),
        "flyback_diodes": dict(sorted(flyback_stats.items(), key=lambda x: -x[1])[:10]),
        "coil_voltages": dict(sorted(coil_voltage_stats.items(), key=lambda x: -x[1])),
        "designs": relay_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with relays: {len(relay_designs)}")
    print(f"  Total relays: {sum(d['relayCount'] for d in relay_designs)}")
    print(f"  Driver ICs: {dict(driver_stats)}")
    print(f"  Coil voltages: {dict(coil_voltage_stats)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
