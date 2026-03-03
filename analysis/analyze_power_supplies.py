#!/usr/bin/env python3
"""Analyze power supply patterns across all REC designs.

Finds regulators, traces input/output nets, classifies topologies,
identifies triac circuits, EMC/EMF components, fuse ratings.

Output: analysis/power_supply_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, classify_regulator_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
SCHEM_DIR = BOARD_DIR
OUTPUT = os.path.join(os.path.dirname(__file__), "power_supply_patterns.json")

# Regulator patterns: (regex, topology)
REGULATOR_PATTERNS = [
    (re.compile(r"NCP1117", re.I), "ldo"),
    (re.compile(r"SPX3819", re.I), "ldo"),
    (re.compile(r"AP2112", re.I), "ldo"),
    (re.compile(r"LM317", re.I), "ldo"),
    (re.compile(r"MC78\d{2}", re.I), "linear"),
    (re.compile(r"LM78\d{2}", re.I), "linear"),
    (re.compile(r"MC7805", re.I), "linear"),
    (re.compile(r"LM7805", re.I), "linear"),
    (re.compile(r"AOZ\d+", re.I), "buck"),
    (re.compile(r"TPS54", re.I), "buck"),
    (re.compile(r"MC33063", re.I), "buck"),
    (re.compile(r"MAX1672", re.I), "boost"),
    (re.compile(r"IRM.?(\d+)", re.I), "ac-dc"),
]

# Triac patterns
TRIAC_RE = re.compile(r"BTA\d+|BTB\d+|T\d+\d{2,3}", re.I)
OPTO_TRIAC_RE = re.compile(r"MOC3\d{3}", re.I)

# EMC component patterns
FERRITE_RE = re.compile(r"ferrite|bead|FB\d|BLM|MPZ", re.I)
VARISTOR_RE = re.compile(r"varistor|MOV|275V|ERZV", re.I)
TVS_RE = re.compile(r"TVS|SMBJ|SMAJ|SMCJ|P6KE|1.5KE", re.I)
FUSE_RE = re.compile(r"fuse|PTC|MF-R|RXEF", re.I)

POWER_NET_RE = re.compile(
    r"^\+?\d+\.?\d*V|^VCC|^VDD|^VBUS|^V_|^\+\d|^AVCC|^DVCC|^AVDD|^DVDD|^AC_|^DC_|^UNREG",
    re.IGNORECASE,
)
GND_NET_RE = re.compile(r"^GND|^VSS|^AGND|^DGND|^PGND|^EARTH|^N$|^NEUTRAL", re.IGNORECASE)


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
    schematics = sorted(glob.glob(os.path.join(SCHEM_DIR, "*_schematic.json")))
    print(f"Analyzing power supplies across {len(boards)} boards, {len(schematics)} schematics...")

    regulator_stats = defaultdict(lambda: {
        "topology": "",
        "occurrences": 0,
        "input_nets": defaultdict(int),
        "output_nets": defaultdict(int),
        "supporting_components": [],
        "designs": set(),
    })

    triac_circuits = []
    emc_components = defaultdict(lambda: {"type": "", "count": 0, "values": defaultdict(int), "designs": set()})
    fuse_stats = defaultdict(lambda: {"count": 0, "values": defaultdict(int), "designs": set()})

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements:
            continue

        elem_map = {e["name"]: e for e in elements}

        # Build element -> nets mapping
        elem_nets = defaultdict(set)
        net_elements = defaultdict(set)
        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)
                net_elements[net_name].add(e_name)

        # Load matching schematic for pin-level analysis
        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        # Find regulators
        for elem in elements:
            e_value = elem.get("value", "")
            e_package = elem.get("package", "")
            e_name = elem["name"]
            # Also check schematic deviceset for more precise identification
            sch_info = part_info.get(e_name, {})
            deviceset = sch_info.get("deviceset", "")
            search_str = f"{e_value} {e_package} {deviceset}"

            for pattern, topology in REGULATOR_PATTERNS:
                if pattern.search(search_str):
                    m = pattern.search(search_str)
                    reg_key = m.group(0) if m else search_str[:20]

                    regulator_stats[reg_key]["topology"] = topology
                    regulator_stats[reg_key]["occurrences"] += 1
                    regulator_stats[reg_key]["designs"].add(design)

                    # Use schematic pin names to separate input vs output nets
                    if schematic:
                        pin_class = classify_regulator_pins(e_name, schematic)
                        for n in pin_class["input_nets"]:
                            regulator_stats[reg_key]["input_nets"][n] += 1
                        for n in pin_class["output_nets"]:
                            regulator_stats[reg_key]["output_nets"][n] += 1
                    else:
                        # Fallback: all power nets go to both (imprecise)
                        nets = elem_nets.get(e_name, set())
                        for n in nets:
                            if POWER_NET_RE.match(n):
                                regulator_stats[reg_key]["input_nets"][n] += 1
                                regulator_stats[reg_key]["output_nets"][n] += 1

                    # Find supporting components on same nets
                    nets = elem_nets.get(e_name, set())
                    for net_name in nets:
                        for connected in net_elements[net_name]:
                            if connected == e_name:
                                continue
                            ce = elem_map.get(connected)
                            if not ce:
                                continue
                            cp = ref_prefix(connected)
                            if cp in ("C", "L", "D", "R"):
                                # Classify cap role using pin info when available
                                role = cp
                                if cp == "C" and schematic:
                                    if net_name in (classify_regulator_pins(e_name, schematic).get("input_nets", [])):
                                        role = "input_cap"
                                    elif net_name in (classify_regulator_pins(e_name, schematic).get("output_nets", [])):
                                        role = "output_cap"
                                regulator_stats[reg_key]["supporting_components"].append({
                                    "ref": connected,
                                    "type": role,
                                    "value": ce.get("value", ""),
                                    "net": net_name,
                                    "design": design,
                                })
                    break

        # Find triac circuits
        triacs_in_design = []
        optos_in_design = []
        for elem in elements:
            search = f"{elem.get('value', '')} {elem.get('package', '')}"
            if TRIAC_RE.search(search):
                triacs_in_design.append(elem)
            if OPTO_TRIAC_RE.search(search):
                optos_in_design.append(elem)

        if triacs_in_design:
            # Find snubber components (caps in 0.01-0.1uF range near triacs)
            snubber_caps = []
            for elem in elements:
                if ref_prefix(elem["name"]) == "C":
                    v = (elem.get("value", "") or "").upper()
                    if any(s in v for s in ("0.022", "0.047", "0.01", "0.1", "22N", "47N", "10N", "100N")):
                        snubber_caps.append(elem)

            triac_circuits.append({
                "design": design,
                "triacs": [{"name": t["name"], "value": t.get("value", "")} for t in triacs_in_design],
                "optos": [{"name": o["name"], "value": o.get("value", "")} for o in optos_in_design],
                "snubber_caps": len(snubber_caps),
            })

        # Find EMC components
        for elem in elements:
            search = f"{elem.get('value', '')} {elem.get('package', '')} {elem.get('name', '')}"
            if FERRITE_RE.search(search):
                emc_components["ferrite_bead"]["type"] = "ferrite_bead"
                emc_components["ferrite_bead"]["count"] += 1
                emc_components["ferrite_bead"]["values"][elem.get("value", "")] += 1
                emc_components["ferrite_bead"]["designs"].add(design)
            elif VARISTOR_RE.search(search):
                emc_components["varistor"]["type"] = "varistor"
                emc_components["varistor"]["count"] += 1
                emc_components["varistor"]["values"][elem.get("value", "")] += 1
                emc_components["varistor"]["designs"].add(design)
            elif TVS_RE.search(search):
                emc_components["tvs_diode"]["type"] = "tvs_diode"
                emc_components["tvs_diode"]["count"] += 1
                emc_components["tvs_diode"]["values"][elem.get("value", "")] += 1
                emc_components["tvs_diode"]["designs"].add(design)

            # Fuses
            if ref_prefix(elem["name"]) == "F" or FUSE_RE.search(search):
                fuse_val = elem.get("value", "") or "unknown"
                fuse_stats[fuse_val]["count"] += 1
                fuse_stats[fuse_val]["designs"].add(design)

    # Build output
    supply_patterns = []
    for reg_key, stats in sorted(regulator_stats.items(), key=lambda x: -x[1]["occurrences"]):
        # Aggregate supporting component types
        comp_roles = defaultdict(lambda: defaultdict(int))
        for sc in stats["supporting_components"]:
            role = "input_cap" if sc["type"] == "C" else sc["type"]
            comp_roles[role][sc["value"]] += 1

        components = []
        for role, values in comp_roles.items():
            top_value = max(values.items(), key=lambda x: x[1])
            components.append({
                "role": role,
                "preferredValue": top_value[0],
                "values": sorted(values.keys()),
                "count": sum(values.values()),
            })

        supply_patterns.append({
            "id": f"supply-{reg_key.lower().replace(' ', '-')[:30]}",
            "regulator": reg_key,
            "topology": stats["topology"],
            "occurrences": stats["occurrences"],
            "inputNets": dict(sorted(stats["input_nets"].items(), key=lambda x: -x[1])[:5]),
            "outputNets": dict(sorted(stats["output_nets"].items(), key=lambda x: -x[1])[:5]),
            "components": components[:10],
            "sourceDesigns": sorted(stats["designs"])[:20],
        })

    emc_output = []
    for key, data in emc_components.items():
        emc_output.append({
            "type": data["type"],
            "count": data["count"],
            "values": dict(sorted(data["values"].items(), key=lambda x: -x[1])[:10]),
            "designCount": len(data["designs"]),
        })

    fuse_output = []
    for val, data in sorted(fuse_stats.items(), key=lambda x: -x[1]["count"]):
        fuse_output.append({
            "rating": val,
            "count": data["count"],
            "designCount": len(data["designs"]),
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "regulator_types": len(regulator_stats),
            "supply_patterns": len(supply_patterns),
            "designs_with_triacs": len(triac_circuits),
            "emc_component_types": len(emc_output),
            "fuse_ratings": len(fuse_output),
        },
        "supply_patterns": supply_patterns,
        "triac_circuits": triac_circuits[:30],
        "emc_components": emc_output,
        "fuse_ratings": fuse_output,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Regulator types: {len(regulator_stats)}")
    print(f"  Supply patterns: {len(supply_patterns)}")
    print(f"  Designs with triacs: {len(triac_circuits)}")
    print(f"  EMC component types: {len(emc_output)}")
    print(f"  Fuse ratings: {len(fuse_output)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
