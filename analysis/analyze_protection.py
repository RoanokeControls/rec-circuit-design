#!/usr/bin/env python3
"""Analyze ESD/protection circuits across all REC designs.

TVS diodes placement relative to connectors, ESD protection on USB/comm lines,
Zener clamp circuits, polarity protection, overcurrent protection patterns.

Output: analysis/protection_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "protection_patterns.json")

TVS_RE = re.compile(r"TVS|SMBJ|SMAJ|SMCJ|P6KE|1\.5KE|PESD|PRTR|CDSOT|USBLC|ESD\d|TPD\d", re.I)
ZENER_RE = re.compile(r"ZENER|BZX|BZV|1N47\d{2}|1N52\d{2}|MMSZ", re.I)
VARISTOR_RE = re.compile(r"VARISTOR|MOV|275V|ERZV|RV\d|14D", re.I)
FUSE_RE = re.compile(r"FUSE|PTC|MF-R|RXEF|PPTC|POLYFUSE|LITTELFUSE", re.I)
PFET_RE = re.compile(r"IRLML|IRF\d+P|SI\d+|FDN|AO\d+", re.I)
SCHOTTKY_RE = re.compile(r"SS\d{2}|SB\d{2}|BAT\d+|MBRS|1N58\d+|SK\d{2}", re.I)
CONNECTOR_RE = re.compile(r"^J\d|^X\d|^P\d|^CON|USB|RJ\d|HEADER|TERMINAL", re.I)


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
    print(f"Analyzing protection circuits across {len(boards)} boards...")

    protection_designs = []
    protection_type_stats = defaultdict(int)
    tvs_value_stats = defaultdict(int)
    fuse_value_stats = defaultdict(int)
    zener_value_stats = defaultdict(int)
    varistor_value_stats = defaultdict(int)
    tvs_connector_distances = []

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

        tvs_diodes = []
        zeners = []
        varistors = []
        fuses = []
        polarity_protection = []
        connectors = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            val = elem.get("value", "") or ""
            search = f"{val} {elem.get('package', '')} {deviceset} {elem['name']}"

            if TVS_RE.search(search):
                tvs_diodes.append(elem)
                protection_type_stats["tvs_diode"] += 1
                tvs_value_stats[deviceset or val] += 1

            elif ZENER_RE.search(search):
                zeners.append(elem)
                protection_type_stats["zener_clamp"] += 1
                zener_value_stats[deviceset or val] += 1

            elif VARISTOR_RE.search(search):
                varistors.append(elem)
                protection_type_stats["varistor"] += 1
                varistor_value_stats[val] += 1

            elif ref_prefix(elem["name"]) == "F" or FUSE_RE.search(search):
                fuses.append(elem)
                protection_type_stats["fuse"] += 1
                fuse_value_stats[val] += 1

            # Polarity protection — reverse Schottky or P-FET on power input
            elif SCHOTTKY_RE.search(search) and ref_prefix(elem["name"]) == "D":
                e_nets = elem_nets.get(elem["name"], set())
                if any(re.match(r"^\+?\d|^VIN|^VBUS|^V_IN", n, re.I) for n in e_nets):
                    polarity_protection.append({"name": elem["name"], "value": val, "type": "schottky"})
                    protection_type_stats["polarity_schottky"] += 1
            elif PFET_RE.search(search) and ref_prefix(elem["name"]) == "Q":
                e_nets = elem_nets.get(elem["name"], set())
                if any(re.match(r"^\+?\d|^VIN|^VBUS|^V_IN", n, re.I) for n in e_nets):
                    polarity_protection.append({"name": elem["name"], "value": val, "type": "pfet"})
                    protection_type_stats["polarity_pfet"] += 1

            # Connectors (for distance calculation)
            if ref_prefix(elem["name"]) in ("J", "X", "P", "CON") or CONNECTOR_RE.search(search):
                connectors.append(elem)

        if not tvs_diodes and not zeners and not varistors and not fuses and not polarity_protection:
            continue

        # Calculate TVS distance to nearest connector
        tvs_details = []
        for tvs in tvs_diodes:
            min_dist = float("inf")
            nearest_connector = None
            for conn in connectors:
                d = distance(tvs, conn)
                if d < min_dist:
                    min_dist = d
                    nearest_connector = conn["name"]

            tvs_nets = elem_nets.get(tvs["name"], set())
            # Identify what the TVS is protecting
            protected_signal = "unknown"
            for n in tvs_nets:
                if re.search(r"USB", n, re.I):
                    protected_signal = "usb"
                elif re.search(r"RS485|RS232|TX|RX", n, re.I):
                    protected_signal = "serial"
                elif re.search(r"CAN", n, re.I):
                    protected_signal = "can"
                elif re.match(r"^\+?\d|^VIN|^VBUS", n, re.I):
                    protected_signal = "power"
                elif re.search(r"SDA|SCL", n, re.I):
                    protected_signal = "i2c"

            dist_mm = round(min_dist, 2) if min_dist < float("inf") else None
            if dist_mm is not None:
                tvs_connector_distances.append(dist_mm)

            tvs_details.append({
                "ref": tvs["name"],
                "value": tvs.get("value", ""),
                "protectedSignal": protected_signal,
                "distanceToConnectorMm": dist_mm,
                "nearestConnector": nearest_connector,
            })

        protection_designs.append({
            "design": design,
            "tvsDiodes": tvs_details,
            "zeners": [{"name": z["name"], "value": z.get("value", "")} for z in zeners],
            "varistors": [{"name": v["name"], "value": v.get("value", "")} for v in varistors],
            "fuses": [{"name": f["name"], "value": f.get("value", "")} for f in fuses],
            "polarityProtection": polarity_protection,
        })

    # TVS distance stats
    tvs_distance_stats = {}
    if tvs_connector_distances:
        sorted_dists = sorted(tvs_connector_distances)
        tvs_distance_stats = {
            "median_mm": round(sorted_dists[len(sorted_dists) // 2], 2),
            "p25_mm": round(sorted_dists[len(sorted_dists) // 4], 2),
            "p75_mm": round(sorted_dists[3 * len(sorted_dists) // 4], 2),
            "count": len(sorted_dists),
        }

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_protection": len(protection_designs),
        },
        "protection_types": dict(sorted(protection_type_stats.items(), key=lambda x: -x[1])),
        "tvs_values": dict(sorted(tvs_value_stats.items(), key=lambda x: -x[1])[:15]),
        "fuse_values": dict(sorted(fuse_value_stats.items(), key=lambda x: -x[1])[:15]),
        "zener_values": dict(sorted(zener_value_stats.items(), key=lambda x: -x[1])[:10]),
        "varistor_values": dict(sorted(varistor_value_stats.items(), key=lambda x: -x[1])[:10]),
        "tvs_to_connector_distance": tvs_distance_stats,
        "designs": protection_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with protection: {len(protection_designs)}")
    print(f"  Protection types: {dict(protection_type_stats)}")
    print(f"  TVS-to-connector median: {tvs_distance_stats.get('median_mm', 'N/A')}mm")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
