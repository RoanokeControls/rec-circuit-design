#!/usr/bin/env python3
"""Deep analysis of triac circuits across all REC designs.

For every board with triacs, catalogs ALL components in the drive circuit:
triacs, opto-isolators, snubber R+C, gate resistors, freewheeling diodes,
varistors, fuses, current sense resistors, and MCU drive pins.

Output: analysis/triac_deep_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins, build_pin_net_map

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "triac_deep_patterns.json")

TRIAC_RE = re.compile(r"BTA\d+|BTB\d+|T\d{4}", re.I)
OPTO_RE = re.compile(r"MOC3\d{3}|MOC30\d{2}|TLP\d+|PC817", re.I)
SNUBBER_CAP_VALUES = re.compile(r"0\.022|0\.047|0\.01|0\.1|22N|47N|10N|100N|0\.033", re.I)
SNUBBER_RES_VALUES = re.compile(r"39|47|100|150|220|330|470", re.I)
VARISTOR_RE = re.compile(r"varistor|MOV|275V|ERZV|RV\d", re.I)
FUSE_RE = re.compile(r"fuse|PTC|MF-R|RXEF", re.I)
MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)
DIODE_RE = re.compile(r"1N4\d+|1N5\d+|BAV\d+|BAT\d+|UF\d+|FR\d+", re.I)
INDUCTOR_RE = re.compile(r"^L\d|INDUCTOR|FERRITE|CHOKE", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def distance(a, b):
    return math.sqrt((a.get("x", 0) - b.get("x", 0)) ** 2 + (a.get("y", 0) - b.get("y", 0)) ** 2)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing triac circuits across {len(boards)} boards...")

    triac_designs = []
    triac_model_stats = defaultdict(lambda: {"count": 0, "designs": set()})
    opto_model_stats = defaultdict(lambda: {"count": 0, "designs": set()})
    snubber_stats = {"caps": defaultdict(int), "resistors": defaultdict(int)}
    gate_resistor_stats = defaultdict(int)
    protection_stats = defaultdict(int)
    mcu_drive_stats = defaultdict(int)

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

        # Load schematic
        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        # Find triacs
        triacs = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"
            if TRIAC_RE.search(search):
                m = TRIAC_RE.search(search)
                triacs.append((elem, m.group(0)))

        if not triacs:
            continue

        # Find all related components for this design
        optos = []
        snubber_caps = []
        snubber_resistors = []
        gate_resistors = []
        varistors = []
        fuses = []
        diodes = []
        mcus = []
        inductors = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset} {elem['name']}"
            val = elem.get("value", "") or ""

            if OPTO_RE.search(search):
                m = OPTO_RE.search(search)
                optos.append({"name": elem["name"], "value": m.group(0)})
                opto_model_stats[m.group(0)]["count"] += 1
                opto_model_stats[m.group(0)]["designs"].add(design)
            elif VARISTOR_RE.search(search):
                varistors.append({"name": elem["name"], "value": val})
                protection_stats["varistor"] += 1
            elif ref_prefix(elem["name"]) == "F" or FUSE_RE.search(search):
                fuses.append({"name": elem["name"], "value": val})
                protection_stats["fuse"] += 1
            elif DIODE_RE.search(search):
                diodes.append({"name": elem["name"], "value": val})
            elif ref_prefix(elem["name"]) == "L" or INDUCTOR_RE.search(search):
                inductors.append({"name": elem["name"], "value": val})

            # Check for snubber components
            if ref_prefix(elem["name"]) == "C" and SNUBBER_CAP_VALUES.search(val):
                snubber_caps.append({"name": elem["name"], "value": val})
                snubber_stats["caps"][val] += 1
            elif ref_prefix(elem["name"]) == "R" and val:
                # Gate resistors are typically small values connected to triac gate nets
                pass  # Will check connectivity below

            # MCUs
            if MCU_RE.search(search):
                mcus.append(elem)

        # For each triac, trace its connections
        triac_circuits = []
        for triac_elem, triac_model in triacs:
            triac_model_stats[triac_model]["count"] += 1
            triac_model_stats[triac_model]["designs"].add(design)

            triac_nets = elem_nets.get(triac_elem["name"], set())

            # Find gate net — look for net with gate resistor or opto
            gate_net = None
            gate_components = []
            load_net = None
            line_net = None

            # Use schematic pin names if available
            if schematic:
                pins = get_part_pins(schematic, triac_elem["name"])
                for p in pins:
                    pname = p["pin"].upper()
                    if "GATE" in pname or pname == "G":
                        gate_net = p["net"]
                    elif pname in ("MT1", "A1", "T1", "1"):
                        load_net = p["net"]
                    elif pname in ("MT2", "A2", "T2", "2"):
                        line_net = p["net"]

            # Find components on gate net
            if gate_net:
                for connected in net_elements.get(gate_net, set()):
                    if connected == triac_elem["name"]:
                        continue
                    ce = elem_map.get(connected)
                    if ce and ref_prefix(connected) == "R":
                        gate_components.append({"name": connected, "value": ce.get("value", ""), "role": "gate_resistor"})
                        gate_resistor_stats[ce.get("value", "")] += 1

            # Find snubbers — caps in parallel with triac (on MT1/MT2 nets)
            triac_snubbers = []
            for sc in snubber_caps:
                sc_nets = elem_nets.get(sc["name"], set())
                shared = sc_nets & triac_nets
                if len(shared) >= 1:
                    triac_snubbers.append(sc)

            # Find connected optos
            triac_optos = []
            for opto in optos:
                opto_nets = elem_nets.get(opto["name"], set())
                if gate_net and gate_net in opto_nets:
                    triac_optos.append(opto)
                elif opto_nets & triac_nets:
                    triac_optos.append(opto)

            # Find MCU driving this triac (via opto or direct)
            drive_mcu = None
            drive_pin = None
            if triac_optos and schematic:
                for opto in triac_optos:
                    opto_pins = get_part_pins(schematic, opto["name"])
                    for op in opto_pins:
                        # Opto input pins (anode/cathode side)
                        if any(k in op["pin"].upper() for k in ("ANODE", "A", "1", "2", "IN")):
                            opto_input_net = op["net"]
                            for mcu in mcus:
                                if mcu["name"] in net_elements.get(opto_input_net, set()):
                                    drive_mcu = mcu
                                    # Find which MCU pin
                                    mcu_pins = get_part_pins(schematic, mcu["name"])
                                    for mp in mcu_pins:
                                        if mp["net"] == opto_input_net:
                                            drive_pin = mp["pin"]
                                            break
                                    break

            if drive_mcu:
                mcu_val = drive_mcu.get("value", "")
                mcu_drive_stats[mcu_val] += 1

            triac_circuits.append({
                "triac": triac_model,
                "triacRef": triac_elem["name"],
                "gateNet": gate_net,
                "gateComponents": gate_components,
                "loadNet": load_net,
                "lineNet": line_net,
                "snubbers": triac_snubbers,
                "optos": triac_optos,
                "driveMcu": drive_mcu.get("value", "") if drive_mcu else None,
                "drivePin": drive_pin,
            })

        # Collect design-level info
        triac_designs.append({
            "design": design,
            "triacCount": len(triacs),
            "triacModels": list(set(m for _, m in triacs)),
            "circuits": triac_circuits,
            "optos": optos,
            "snubberCaps": snubber_caps,
            "varistors": varistors,
            "fuses": fuses,
            "diodes": diodes[:10],
            "inductors": inductors[:5],
            "mcuCount": len(mcus),
        })

    # Build output
    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_triacs": len(triac_designs),
            "total_triacs": sum(d["triacCount"] for d in triac_designs),
        },
        "triac_models": {
            k: {"count": v["count"], "designs": len(v["designs"])}
            for k, v in sorted(triac_model_stats.items(), key=lambda x: -x[1]["count"])
        },
        "opto_models": {
            k: {"count": v["count"], "designs": len(v["designs"])}
            for k, v in sorted(opto_model_stats.items(), key=lambda x: -x[1]["count"])
        },
        "snubber_cap_values": dict(sorted(snubber_stats["caps"].items(), key=lambda x: -x[1])),
        "gate_resistor_values": dict(sorted(gate_resistor_stats.items(), key=lambda x: -x[1])),
        "protection_components": dict(protection_stats),
        "mcu_drive_parts": dict(sorted(mcu_drive_stats.items(), key=lambda x: -x[1])),
        "designs": triac_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with triacs: {len(triac_designs)}")
    print(f"  Total triacs: {sum(d['triacCount'] for d in triac_designs)}")
    print(f"  Triac models: {dict(sorted(triac_model_stats.items(), key=lambda x: -x[1]['count']))}")
    print(f"  Opto models: {dict(sorted(opto_model_stats.items(), key=lambda x: -x[1]['count']))}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
