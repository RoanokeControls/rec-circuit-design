#!/usr/bin/env python3
"""Analyze component placement patterns across all REC designs.

Board metrics, density, connector edge placement, component clustering,
package spacing, mounting holes.

Output: analysis/placement_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "placement_patterns.json")

CONNECTOR_PREFIXES = {"J", "P", "X", "CON"}
CONNECTOR_PKG_RE = re.compile(r"JST|RJ\d|USB|HDR|HEADER|MOLEX|TERMINAL|PHOENIX|IDC|DB\d|DSUB", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def is_connector(elem):
    if ref_prefix(elem["name"]) in CONNECTOR_PREFIXES:
        return True
    search = f"{elem.get('value', '')} {elem.get('package', '')}"
    return bool(CONNECTOR_PKG_RE.search(search))


def board_dims(board):
    area = board.get("area", {})
    x1 = area.get("x1", 0)
    y1 = area.get("y1", 0)
    x2 = area.get("x2", 0)
    y2 = area.get("y2", 0)
    return x1, y1, x2, y2, x2 - x1, y2 - y1


def edge_distance(elem, x1, y1, x2, y2):
    """Distance from element center to nearest board edge."""
    ex, ey = elem["x"], elem["y"]
    return min(ex - x1, x2 - ex, ey - y1, y2 - ey)


def nearest_edge(elem, x1, y1, x2, y2):
    """Which edge is closest: top/bottom/left/right."""
    ex, ey = elem["x"], elem["y"]
    dists = {
        "left": ex - x1,
        "right": x2 - ex,
        "bottom": ey - y1,
        "top": y2 - ey,
    }
    return min(dists, key=dists.get)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing placement across {len(boards)} boards...")

    board_metrics = []
    connector_edges = defaultdict(int)
    connector_distances = []
    mounting_holes = []
    density_data = []

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])

        if not elements:
            continue

        bx1, by1, bx2, by2, w_mm, h_mm = board_dims(board)
        if w_mm <= 0 or h_mm <= 0:
            continue

        area_mm2 = w_mm * h_mm
        area_cm2 = area_mm2 / 100.0

        smd_count = sum(1 for e in elements if e.get("smd"))
        th_count = sum(1 for e in elements if not e.get("smd"))
        total = len(elements)
        smd_ratio = round(smd_count / total, 3) if total else 0
        density = round(total / area_cm2, 2) if area_cm2 > 0 else 0

        board_metrics.append({
            "design": design,
            "widthMm": round(w_mm, 2),
            "heightMm": round(h_mm, 2),
            "areaCm2": round(area_cm2, 2),
            "componentCount": total,
            "smdCount": smd_count,
            "throughHoleCount": th_count,
            "smdRatio": smd_ratio,
            "densityPerCm2": density,
        })

        density_data.append(density)

        # Connector edge placement
        connectors = [e for e in elements if is_connector(e)]
        for conn in connectors:
            d = edge_distance(conn, bx1, by1, bx2, by2)
            connector_distances.append(d)
            edge = nearest_edge(conn, bx1, by1, bx2, by2)
            connector_edges[edge] += 1

        # Mounting holes
        holes = board.get("holes", [])
        plain_holes = [pe for pe in board.get("plain_elements", []) if pe.get("type") == "hole"]

        all_holes = []
        for h in holes:
            all_holes.append(h)
        for ph in plain_holes:
            # Deduplicate with existing holes
            is_dup = False
            for h in holes:
                if abs(h["x"] - ph["x"]) < 0.01 and abs(h["y"] - ph["y"]) < 0.01:
                    is_dup = True
                    break
            if not is_dup:
                all_holes.append(ph)

        if all_holes:
            hole_sizes = sorted(set(round(h.get("drill", 0), 2) for h in all_holes if h.get("drill", 0) > 0))
            # Classify position
            positions = []
            for h in all_holes:
                hx, hy = h.get("x", 0), h.get("y", 0)
                d_edge = min(hx - bx1, bx2 - hx, hy - by1, by2 - hy)
                # Corner detection: close to two edges
                near_left = (hx - bx1) < w_mm * 0.15
                near_right = (bx2 - hx) < w_mm * 0.15
                near_bottom = (hy - by1) < h_mm * 0.15
                near_top = (by2 - hy) < h_mm * 0.15

                if (near_left or near_right) and (near_top or near_bottom):
                    positions.append("corner")
                elif near_left or near_right or near_top or near_bottom:
                    positions.append("edge")
                else:
                    positions.append("interior")

            mounting_holes.append({
                "design": design,
                "count": len(all_holes),
                "sizes": hole_sizes,
                "positions": positions,
            })

    # Summary statistics
    densities = sorted(density_data)
    n = len(densities)

    # Connector edge analysis
    close_threshold = 5.0  # mm
    connectors_within_5mm = sum(1 for d in connector_distances if d < close_threshold)
    connector_edge_pct = round(100 * connectors_within_5mm / len(connector_distances), 1) if connector_distances else 0

    # Mounting hole summary
    all_hole_sizes = defaultdict(int)
    all_hole_positions = defaultdict(int)
    hole_counts = defaultdict(int)
    for mh in mounting_holes:
        hole_counts[mh["count"]] += 1
        for s in mh["sizes"]:
            all_hole_sizes[s] += 1
        for p in mh["positions"]:
            all_hole_positions[p] += 1

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "boards_with_components": len(board_metrics),
        },
        "density_stats": {
            "sampleSize": n,
            "p25": round(densities[n // 4], 2) if n > 3 else 0,
            "p50": round(densities[n // 2], 2) if n else 0,
            "p75": round(densities[3 * n // 4], 2) if n > 3 else 0,
            "p90": round(densities[int(n * 0.9)], 2) if n > 3 else 0,
            "max": round(densities[-1], 2) if n else 0,
        },
        "smd_ratio_stats": {
            "boards_all_smd": sum(1 for m in board_metrics if m["smdRatio"] == 1.0),
            "boards_mixed": sum(1 for m in board_metrics if 0 < m["smdRatio"] < 1.0),
            "boards_all_th": sum(1 for m in board_metrics if m["smdRatio"] == 0),
            "median_smd_ratio": round(sorted(m["smdRatio"] for m in board_metrics)[len(board_metrics) // 2], 3) if board_metrics else 0,
        },
        "connector_placement": {
            "total_connectors": len(connector_distances),
            "within_5mm_of_edge_pct": connector_edge_pct,
            "edge_distribution": dict(connector_edges),
        },
        "mounting_holes": {
            "boards_with_holes": len(mounting_holes),
            "hole_count_distribution": dict(sorted(hole_counts.items())),
            "hole_sizes": dict(sorted(all_hole_sizes.items(), key=lambda x: -x[1])),
            "position_distribution": dict(all_hole_positions),
        },
        "top_density_boards": sorted(board_metrics, key=lambda x: -x["densityPerCm2"])[:20],
        "board_metrics": sorted(board_metrics, key=lambda x: -x["componentCount"])[:30],
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Boards with components: {len(board_metrics)}")
    print(f"  Median density: {result['density_stats']['p50']} parts/cm²")
    print(f"  Connectors within 5mm of edge: {connector_edge_pct}%")
    print(f"  Boards with mounting holes: {len(mounting_holes)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
