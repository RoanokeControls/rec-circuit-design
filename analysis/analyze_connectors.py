#!/usr/bin/env python3
"""Analyze connector and adapter placement patterns.

Connector types, edge placement, orientation, distances to MCU,
adapter/module placements.

Output: analysis/connector_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "connector_patterns.json")

# Connector type classification
CONNECTOR_TYPES = [
    (re.compile(r"JST.?S[HM]|JST.?XH|JST.?PH|JST.?VH|JST.?EH|JST", re.I), "JST"),
    (re.compile(r"RJ11|RJ12|6P[46]C", re.I), "RJ11"),
    (re.compile(r"RJ45|8P8C", re.I), "RJ45"),
    (re.compile(r"USB.?[ABC]|USB.?MICRO|USB.?MINI|USB.?TYPE|MUSB", re.I), "USB"),
    (re.compile(r"TERMINAL|SCREW.?TERM|PHOENIX|WURTH|WAGO|TB\d", re.I), "terminal-block"),
    (re.compile(r"HEADER|HDR|PIN.?HEAD|PINHD|1X\d|2X\d", re.I), "pin-header"),
    (re.compile(r"IDC|RIBBON|FLAT", re.I), "IDC"),
    (re.compile(r"MOLEX|MINI.?FIT|MICRO.?FIT", re.I), "Molex"),
    (re.compile(r"DB\d|DSUB|D-SUB", re.I), "D-sub"),
    (re.compile(r"BNC|SMA|ANTENNA|ANT|UFL|U\.FL", re.I), "RF"),
    (re.compile(r"BARREL|JACK|DC.?JACK|POWER.?JACK", re.I), "barrel-jack"),
    (re.compile(r"M8|M12|CIRCULAR", re.I), "circular"),
]

# Module/adapter patterns
MODULE_PATTERNS = [
    (re.compile(r"ESP32.?WROVER|ESP32.?WROOM|ESP.?MODULE", re.I), "ESP32-module"),
    (re.compile(r"IRM.?\d+|MEAN.?WELL|AC.?DC.?MODULE", re.I), "AC-DC-module"),
    (re.compile(r"DISPLAY|LCD|TFT|OLED|SSD1306|ST7789", re.I), "display"),
    (re.compile(r"RELAY.?MODULE|RELAY.?BOARD", re.I), "relay-module"),
    (re.compile(r"STEPPER|MOTOR.?DRIVER|DRV\d|A4988|TMC", re.I), "motor-driver"),
]

CONNECTOR_PREFIXES = {"J", "P", "X", "CON"}

MCU_PATTERNS = [
    re.compile(r"PIC1[268]", re.I),
    re.compile(r"ESP32", re.I),
    re.compile(r"STM32", re.I),
    re.compile(r"RP2040", re.I),
    re.compile(r"ATMEGA|ATSAMD", re.I),
]


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
    return any(p.search(search) for p, _ in CONNECTOR_TYPES)


def classify_connector(elem):
    search = f"{elem.get('value', '')} {elem.get('package', '')} {elem['name']}"
    for pattern, label in CONNECTOR_TYPES:
        if pattern.search(search):
            return label
    if ref_prefix(elem["name"]) in CONNECTOR_PREFIXES:
        return "generic"
    return "unknown"


def classify_module(elem):
    search = f"{elem.get('value', '')} {elem.get('package', '')}"
    for pattern, label in MODULE_PATTERNS:
        if pattern.search(search):
            return label
    return None


def is_mcu(elem):
    search = f"{elem.get('value', '')} {elem.get('package', '')}"
    return any(p.search(search) for p in MCU_PATTERNS)


def distance(a, b):
    return math.sqrt((a["x"] - b["x"]) ** 2 + (a["y"] - b["y"]) ** 2)


def board_dims(board):
    area = board.get("area", {})
    return area.get("x1", 0), area.get("y1", 0), area.get("x2", 0), area.get("y2", 0)


def nearest_edge(elem, x1, y1, x2, y2):
    ex, ey = elem["x"], elem["y"]
    dists = {"left": ex - x1, "right": x2 - ex, "bottom": ey - y1, "top": y2 - ey}
    return min(dists, key=dists.get)


def edge_distance(elem, x1, y1, x2, y2):
    ex, ey = elem["x"], elem["y"]
    return min(ex - x1, x2 - ex, ey - y1, y2 - ey)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing connectors across {len(boards)} boards...")

    # Connector type counts
    type_counts = defaultdict(int)
    type_edge_counts = defaultdict(lambda: defaultdict(int))
    type_angles = defaultdict(list)
    type_distances_to_edge = defaultdict(list)
    type_distances_to_mcu = defaultdict(list)

    # Module counts
    module_counts = defaultdict(int)
    module_edge_dists = defaultdict(list)

    total_connectors = 0

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])

        if not elements:
            continue

        x1, y1, x2, y2 = board_dims(board)
        w = x2 - x1
        h = y2 - y1
        if w <= 0 or h <= 0:
            continue

        mcus = [e for e in elements if is_mcu(e)]

        for elem in elements:
            # Check for module
            mod_type = classify_module(elem)
            if mod_type:
                module_counts[mod_type] += 1
                d_edge = edge_distance(elem, x1, y1, x2, y2)
                module_edge_dists[mod_type].append(round(d_edge, 2))

            # Check for connector
            if not is_connector(elem):
                continue

            total_connectors += 1
            conn_type = classify_connector(elem)
            type_counts[conn_type] += 1

            # Edge analysis
            edge = nearest_edge(elem, x1, y1, x2, y2)
            type_edge_counts[conn_type][edge] += 1

            d_edge = edge_distance(elem, x1, y1, x2, y2)
            type_distances_to_edge[conn_type].append(round(d_edge, 2))

            # Rotation
            angle = elem.get("angle", 0)
            type_angles[conn_type].append(angle)

            # Distance to nearest MCU
            if mcus:
                min_d = min(distance(elem, m) for m in mcus)
                type_distances_to_mcu[conn_type].append(round(min_d, 2))

    # Build output
    connector_summary = []
    for ctype in sorted(type_counts.keys(), key=lambda x: -type_counts[x]):
        count = type_counts[ctype]
        edges = dict(type_edge_counts[ctype])
        dists = sorted(type_distances_to_edge.get(ctype, []))
        mcu_dists = sorted(type_distances_to_mcu.get(ctype, []))
        angles = type_angles.get(ctype, [])

        # Most common rotation angles
        angle_counts = defaultdict(int)
        for a in angles:
            angle_counts[a] += 1
        top_angles = sorted(angle_counts.items(), key=lambda x: -x[1])[:4]

        close_to_edge = sum(1 for d in dists if d < 5)
        edge_pct = round(100 * close_to_edge / len(dists), 1) if dists else 0

        connector_summary.append({
            "type": ctype,
            "count": count,
            "edgeDistribution": edges,
            "within5mmOfEdgePct": edge_pct,
            "medianEdgeDistanceMm": round(dists[len(dists) // 2], 2) if dists else 0,
            "medianMcuDistanceMm": round(mcu_dists[len(mcu_dists) // 2], 2) if mcu_dists else 0,
            "commonRotations": [{"angle": a, "count": c} for a, c in top_angles],
        })

    # Module summary
    module_summary = []
    for mtype in sorted(module_counts.keys(), key=lambda x: -module_counts[x]):
        dists = sorted(module_edge_dists.get(mtype, []))
        module_summary.append({
            "type": mtype,
            "count": module_counts[mtype],
            "medianEdgeDistanceMm": round(dists[len(dists) // 2], 2) if dists else 0,
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "total_connectors": total_connectors,
            "connector_types": len(type_counts),
            "module_types": len(module_counts),
        },
        "connector_types": connector_summary,
        "module_types": module_summary,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Total connectors: {total_connectors}")
    print(f"  Connector types: {len(type_counts)}")
    print(f"  Module types: {len(module_counts)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
