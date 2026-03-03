#!/usr/bin/env python3
"""Analyze decoupling capacitor placement patterns across all REC designs.

For each IC, finds capacitors on the same power/ground nets via contactrefs,
computes pad-to-pad distances, and classifies placement quality.

Output: analysis/decoupling_patterns.json
"""

import glob
import json
import math
import os
import re
import sys
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "decoupling_patterns.json")

# IC reference designator prefixes
IC_PREFIXES = {"U", "IC", "VR", "DD"}

# Capacitor reference designator prefixes
CAP_PREFIXES = {"C"}

# Power/ground net name patterns
POWER_NET_RE = re.compile(
    r"^\+?\d+\.?\d*V|^VCC|^VDD|^VBUS|^V_|^\+\d|^AVCC|^DVCC|^AVDD|^DVDD",
    re.IGNORECASE,
)
GND_NET_RE = re.compile(r"^GND|^VSS|^AGND|^DGND|^PGND|^EARTH", re.IGNORECASE)


def ref_prefix(name):
    """Extract alphabetic prefix from reference designator."""
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def transform_pad(pad, elem):
    """Transform package-relative pad coordinates to board-absolute coordinates."""
    px, py = pad["x"], pad["y"]
    angle_rad = math.radians(elem.get("angle", 0))
    mirror = elem.get("mirror", 0)

    if mirror:
        px = -px

    cos_a = math.cos(angle_rad)
    sin_a = math.sin(angle_rad)
    bx = elem["x"] + px * cos_a - py * sin_a
    by = elem["y"] + px * sin_a + py * cos_a

    return bx, by


def element_center(elem):
    """Get element center position (fallback when no pads)."""
    return elem["x"], elem["y"]


def min_pad_distance(elem_a, elem_b):
    """Compute minimum pad-to-pad distance between two elements."""
    pads_a = elem_a.get("pads", [])
    pads_b = elem_b.get("pads", [])

    if not pads_a or not pads_b:
        # Fallback to center-to-center
        ax, ay = element_center(elem_a)
        bx, by = element_center(elem_b)
        return math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)

    min_dist = float("inf")
    for pa in pads_a:
        ax, ay = transform_pad(pa, elem_a)
        for pb in pads_b:
            bx, by = transform_pad(pb, elem_b)
            d = math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
            if d < min_dist:
                min_dist = d

    return min_dist


def classify_distance(dist_mm):
    if dist_mm < 5:
        return "bypass_close"
    elif dist_mm < 15:
        return "bypass_moderate"
    else:
        return "bypass_distant"


def parse_cap_value(value_str):
    """Parse capacitor value string to a normalized form."""
    if not value_str:
        return None
    v = value_str.upper().strip()
    # Remove common suffixes
    v = v.replace("F", "").replace(" ", "")
    return value_str.strip()


def cap_value_uf(value_str):
    """Try to parse capacitor value to microfarads for bulk classification."""
    if not value_str:
        return None
    v = value_str.upper().strip()
    # Match patterns like 10UF, 0.1UF, 100NF, 100PF, 10U, 0.1U
    m = re.match(r"([\d.]+)\s*(UF|U|MF|NF|PF|N|P)?", v)
    if not m:
        return None
    num = float(m.group(1))
    unit = (m.group(2) or "UF").upper()
    if unit in ("UF", "U", "MF"):
        return num
    elif unit in ("NF", "N"):
        return num / 1000.0
    elif unit in ("PF", "P"):
        return num / 1000000.0
    return num  # assume uF


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing decoupling across {len(boards)} boards...")

    # Accumulate per-IC-type stats
    # Key: IC value/deviceset (normalized)
    ic_stats = defaultdict(lambda: {
        "occurrences": 0,
        "caps": [],  # list of {value, distance_mm, classification, design}
        "designs": set(),
    })

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", os.path.basename(bpath))
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements or not signals:
            continue

        # Build lookup: element name -> element data
        elem_map = {e["name"]: e for e in elements}

        # Build net membership: element_name -> set of net names
        elem_nets = defaultdict(set)
        # Build net -> elements mapping
        net_elements = defaultdict(set)

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)
                net_elements[net_name].add(e_name)

        # Find ICs and their associated caps
        for elem in elements:
            e_name = elem["name"]
            prefix = ref_prefix(e_name)
            if prefix not in IC_PREFIXES:
                continue

            ic_value = elem.get("value", "") or elem.get("package", "")
            if not ic_value:
                continue

            # Find power and ground nets this IC is on
            ic_nets = elem_nets.get(e_name, set())
            power_nets = {n for n in ic_nets if POWER_NET_RE.match(n)}
            gnd_nets = {n for n in ic_nets if GND_NET_RE.match(n)}

            if not power_nets and not gnd_nets:
                continue

            # Find caps on the same power/ground nets
            supply_nets = power_nets | gnd_nets
            nearby_caps = set()
            for net_name in supply_nets:
                for connected_elem in net_elements[net_name]:
                    if connected_elem == e_name:
                        continue
                    if ref_prefix(connected_elem) in CAP_PREFIXES:
                        nearby_caps.add(connected_elem)

            if not nearby_caps:
                continue

            ic_stats[ic_value]["occurrences"] += 1
            ic_stats[ic_value]["designs"].add(design)

            for cap_name in nearby_caps:
                cap_elem = elem_map.get(cap_name)
                if not cap_elem:
                    continue

                dist = min_pad_distance(elem, cap_elem)
                cap_val = cap_elem.get("value", "")

                ic_stats[ic_value]["caps"].append({
                    "value": cap_val,
                    "distance_mm": round(dist, 2),
                    "classification": classify_distance(dist),
                    "is_bulk": (cap_value_uf(cap_val) or 0) >= 10,
                    "design": design,
                })

    # Aggregate into patterns
    patterns = []
    for ic_value, stats in sorted(ic_stats.items(), key=lambda x: -x[1]["occurrences"]):
        if stats["occurrences"] < 2:
            continue

        # Group caps by value
        cap_groups = defaultdict(list)
        for cap in stats["caps"]:
            cap_groups[cap["value"]].append(cap)

        cap_summaries = []
        for cap_val, caps in sorted(cap_groups.items(), key=lambda x: -len(x[1])):
            distances = [c["distance_mm"] for c in caps]
            distances.sort()
            is_bulk = caps[0]["is_bulk"] if caps else False

            cap_summaries.append({
                "role": "bulk" if is_bulk else "bypass",
                "preferredValue": cap_val,
                "values": sorted(set(c["value"] for c in caps)),
                "medianDistanceMm": round(distances[len(distances) // 2], 2) if distances else 0,
                "p25Mm": round(distances[len(distances) // 4], 2) if len(distances) > 3 else (round(distances[0], 2) if distances else 0),
                "p75Mm": round(distances[3 * len(distances) // 4], 2) if len(distances) > 3 else (round(distances[-1], 2) if distances else 0),
                "count": len(caps),
            })

        # Determine IC category
        ic_lower = ic_value.lower()
        if any(k in ic_lower for k in ("ncp1117", "lm317", "mc78", "spx38", "ap2112", "aoz", "irm", "lm7805", "mc7805")):
            category = "regulator"
        elif any(k in ic_lower for k in ("pic18", "pic16", "esp32", "stm32", "rp2040", "atmega", "atsamd", "nrf5")):
            category = "mcu"
        elif any(k in ic_lower for k in ("ft232", "ch340", "cp210", "mcp23", "sn74", "mm74")):
            category = "interface"
        elif any(k in ic_lower for k in ("bta12", "moc30", "uln28")):
            category = "driver"
        else:
            category = "other"

        all_distances = [c["distance_mm"] for c in stats["caps"]]
        all_distances.sort()
        median_all = round(all_distances[len(all_distances) // 2], 2) if all_distances else 0

        # Generate design rule
        if median_all < 5:
            rule = f"Place bypass caps within 5mm of {ic_value} (current median: {median_all}mm)"
        elif median_all < 15:
            rule = f"Bypass caps for {ic_value} typically 5-15mm away (median: {median_all}mm)"
        else:
            rule = f"Caps for {ic_value} tend to be distant ({median_all}mm median) — consider closer placement"

        patterns.append({
            "id": f"decoupling-{ic_value.lower().replace(' ', '-').replace('/', '-')[:40]}",
            "icValue": ic_value,
            "icCategory": category,
            "occurrences": stats["occurrences"],
            "caps": cap_summaries[:10],  # top 10 cap values
            "designRule": rule,
            "sourceDesigns": sorted(stats["designs"])[:20],
        })

    # Distance distribution histogram
    all_dists = []
    for stats in ic_stats.values():
        for cap in stats["caps"]:
            all_dists.append(cap["distance_mm"])

    histogram = {
        "0-2mm": sum(1 for d in all_dists if d < 2),
        "2-5mm": sum(1 for d in all_dists if 2 <= d < 5),
        "5-10mm": sum(1 for d in all_dists if 5 <= d < 10),
        "10-15mm": sum(1 for d in all_dists if 10 <= d < 15),
        "15-25mm": sum(1 for d in all_dists if 15 <= d < 25),
        "25mm+": sum(1 for d in all_dists if d >= 25),
    }

    # Cap value frequency
    all_cap_values = defaultdict(int)
    for stats in ic_stats.values():
        for cap in stats["caps"]:
            all_cap_values[cap["value"]] += 1

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "ics_with_decoupling": len(ic_stats),
            "patterns_found": len(patterns),
            "total_ic_cap_pairs": len(all_dists),
        },
        "distance_histogram": histogram,
        "cap_value_frequency": dict(sorted(all_cap_values.items(), key=lambda x: -x[1])[:20]),
        "patterns": patterns,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  ICs with decoupling: {len(ic_stats)}")
    print(f"  Patterns (≥2 occurrences): {len(patterns)}")
    print(f"  Total IC-cap pairs: {len(all_dists)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
