#!/usr/bin/env python3
"""Analyze ground routing and power distribution practices.

GND net wire/via stats, power net trace widths, via stitching density,
net class usage, signal vs power trace width comparison.

Output: analysis/ground_routing_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "ground_routing_patterns.json")

GND_NET_RE = re.compile(r"^GND$|^VSS$|^AGND$|^DGND$|^PGND$|^EARTH$", re.IGNORECASE)
POWER_NET_PATTERNS = [
    (re.compile(r"^\+5V$|^5V$|^VCC$", re.I), "+5V"),
    (re.compile(r"^\+3\.3V$|^3\.3V$|^3V3$|^VDD$", re.I), "+3.3V"),
    (re.compile(r"^\+12V$|^12V$", re.I), "+12V"),
    (re.compile(r"^\+24V$|^24V$", re.I), "+24V"),
]


def wire_length(w):
    return math.sqrt((w["x2"] - w["x1"]) ** 2 + (w["y2"] - w["y1"]) ** 2)


def percentiles(values):
    if not values:
        return {"p25": 0, "p50": 0, "p75": 0, "p90": 0}
    s = sorted(values)
    n = len(s)
    return {
        "p25": round(s[max(0, n // 4)], 4),
        "p50": round(s[n // 2], 4),
        "p75": round(s[min(n - 1, 3 * n // 4)], 4),
        "p90": round(s[min(n - 1, int(n * 0.9))], 4),
    }


def board_area_cm2(board):
    area = board.get("area", {})
    w_mm = area.get("x2", 0) - area.get("x1", 0)
    h_mm = area.get("y2", 0) - area.get("y1", 0)
    if w_mm <= 0 or h_mm <= 0:
        return 0
    return (w_mm * h_mm) / 100.0


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing ground routing across {len(boards)} boards...")

    # Accumulate
    gnd_stats = []
    power_trace_widths = defaultdict(list)  # net_category -> list of widths
    signal_trace_widths = []
    via_stitching = []  # (gnd_vias, board_area_cm2, design)
    net_class_usage = defaultdict(int)
    designs_with_custom_classes = 0

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        signals = board.get("signals", [])
        area_cm2 = board_area_cm2(board)

        if not signals:
            continue

        # Net class analysis
        classes = board.get("net_classes", [])
        has_custom = False
        for nc in classes:
            net_class_usage[nc.get("name", "default")] += 1
            if nc.get("number", 0) > 0:
                has_custom = True
        if has_custom:
            designs_with_custom_classes += 1

        gnd_wire_count = 0
        gnd_total_length = 0
        gnd_via_count = 0
        gnd_via_drills = []
        gnd_layer_dist = defaultdict(int)

        for sig in signals:
            net_name = sig.get("name", "")
            wires = sig.get("wires", [])
            vias = sig.get("vias", [])

            is_gnd = bool(GND_NET_RE.match(net_name))

            # Classify net
            power_category = None
            for pattern, label in POWER_NET_PATTERNS:
                if pattern.match(net_name):
                    power_category = label
                    break

            if is_gnd:
                gnd_wire_count += len(wires)
                for w in wires:
                    gnd_total_length += wire_length(w)
                    gnd_layer_dist[w.get("layer", 0)] += 1
                gnd_via_count += len(vias)
                for v in vias:
                    gnd_via_drills.append(v.get("drill", 0))

            # Trace widths
            for w in wires:
                width = w.get("width", 0)
                if width <= 0:
                    continue
                if is_gnd:
                    power_trace_widths["GND"].append(width)
                elif power_category:
                    power_trace_widths[power_category].append(width)
                else:
                    signal_trace_widths.append(width)

        if gnd_wire_count > 0:
            gnd_stats.append({
                "design": design,
                "wireCount": gnd_wire_count,
                "totalLengthMm": round(gnd_total_length, 2),
                "viaCount": gnd_via_count,
                "viaDrills": sorted(set(round(d, 3) for d in gnd_via_drills)),
                "layerDistribution": dict(gnd_layer_dist),
            })

        if area_cm2 > 0 and gnd_via_count > 0:
            via_stitching.append({
                "design": design,
                "gndVias": gnd_via_count,
                "boardAreaCm2": round(area_cm2, 2),
                "viasPerCm2": round(gnd_via_count / area_cm2, 2),
            })

    # Build summary per power net
    power_net_summary = {}
    for net_cat, widths in sorted(power_trace_widths.items()):
        if not widths:
            continue
        power_net_summary[net_cat] = {
            "sampleCount": len(widths),
            "percentiles": percentiles(widths),
        }

    signal_summary = {}
    if signal_trace_widths:
        signal_summary = {
            "sampleCount": len(signal_trace_widths),
            "percentiles": percentiles(signal_trace_widths),
        }

    # Via stitching stats
    via_densities = [v["viasPerCm2"] for v in via_stitching]
    via_stitch_summary = {}
    if via_densities:
        via_stitch_summary = {
            "boardsWithGndVias": len(via_stitching),
            "percentiles": percentiles(via_densities),
        }

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "boards_with_gnd_routing": len(gnd_stats),
            "designs_with_custom_net_classes": designs_with_custom_classes,
            "net_classes_found": dict(sorted(net_class_usage.items(), key=lambda x: -x[1])[:10]),
        },
        "power_net_trace_widths": power_net_summary,
        "signal_trace_widths": signal_summary,
        "via_stitching": via_stitch_summary,
        "gnd_routing_per_design": sorted(gnd_stats, key=lambda x: -x["wireCount"])[:30],
        "via_density_top_designs": sorted(via_stitching, key=lambda x: -x["viasPerCm2"])[:20],
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Boards with GND routing: {len(gnd_stats)}")
    print(f"  Power net categories: {list(power_net_summary.keys())}")
    print(f"  Signal trace samples: {len(signal_trace_widths)}")
    print(f"  Via stitching data: {len(via_stitching)} boards")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
