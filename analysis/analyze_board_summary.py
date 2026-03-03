#!/usr/bin/env python3
"""Create a comprehensive per-board design summary for all 261 REC designs.

Per-board: dimensions, layer count, component count by type, power supply,
MCU family, communication interfaces, I/O count, complexity rating.

Output: analysis/board_summary.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "board_summary.json")

MCU_PATTERNS = [
    (re.compile(r"PIC18F?\d+", re.I), "PIC18"),
    (re.compile(r"PIC16F?\d+", re.I), "PIC16"),
    (re.compile(r"PIC12F?\d+", re.I), "PIC12"),
    (re.compile(r"ESP32", re.I), "ESP32"),
    (re.compile(r"STM32", re.I), "STM32"),
    (re.compile(r"RP2040", re.I), "RP2040"),
    (re.compile(r"ATMEGA|ATSAMD", re.I), "AVR/SAM"),
    (re.compile(r"NRF5", re.I), "nRF5x"),
]

REGULATOR_RE = re.compile(
    r"NCP1117|SPX3819|AP2112|LM317|MC78\d{2}|LM78\d{2}|AOZ\d+|TPS5\d+|MC33063|MAX1672|IRM.?\d+",
    re.I,
)
TRIAC_RE = re.compile(r"BTA\d+|BTB\d+", re.I)
RELAY_RE = re.compile(r"RELAY|RLY|G5V|G2R|HF\d{2}|SRD|JQC", re.I)
DISPLAY_RE = re.compile(r"LCD|OLED|7.?SEG|DISPLAY|NHD|SSD1306", re.I)
COMM_RE = re.compile(r"MAX485|SP3485|MAX232|MCP2551|FT232|CH340|CP210|ENC28J60|W5500", re.I)
SENSOR_RE = re.compile(r"NTC|THERMIST|DS18|LM35|TMP\d+|BME\d+|ACS\d+|INA\d+", re.I)
LED_RE = re.compile(r"LED", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def compute_board_dimensions(elements, plain_elements=None):
    """Estimate board dimensions from element positions or plain elements."""
    # Try plain elements first (board outline)
    if plain_elements:
        outline_xs = []
        outline_ys = []
        for pe in plain_elements:
            if pe.get("type") == "wire" and pe.get("layer") in (20, 46):  # Dimension or Milling
                outline_xs.extend([pe.get("x1", 0), pe.get("x2", 0)])
                outline_ys.extend([pe.get("y1", 0), pe.get("y2", 0)])
        if outline_xs and outline_ys:
            return {
                "widthMm": round(max(outline_xs) - min(outline_xs), 2),
                "heightMm": round(max(outline_ys) - min(outline_ys), 2),
            }

    # Fallback: use element bounding box
    if elements:
        xs = [e.get("x", 0) for e in elements]
        ys = [e.get("y", 0) for e in elements]
        if xs and ys:
            return {
                "widthMm": round(max(xs) - min(xs) + 10, 2),  # Add margins
                "heightMm": round(max(ys) - min(ys) + 10, 2),
            }
    return {"widthMm": 0, "heightMm": 0}


def classify_complexity(component_count, mcu_count, comm_count, has_triacs):
    """Rate board complexity from 1 (simple) to 5 (very complex)."""
    score = 0
    if component_count > 100:
        score += 2
    elif component_count > 50:
        score += 1

    score += min(mcu_count, 2)
    score += min(comm_count, 2)
    if has_triacs:
        score += 1

    return min(max(score, 1), 5)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Creating board summaries for {len(boards)} boards...")

    summaries = []
    complexity_counts = defaultdict(int)
    mcu_family_counts = defaultdict(int)

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])
        plain_elements = board.get("plain_elements", [])

        if not elements:
            continue

        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        # Count components by type
        type_counts = defaultdict(int)
        for elem in elements:
            prefix = ref_prefix(elem["name"])
            type_counts[prefix] += 1

        # Find MCUs
        mcu_families = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"
            for pattern, family in MCU_PATTERNS:
                if pattern.search(search):
                    mcu_families.append(family)
                    mcu_family_counts[family] += 1
                    break

        # Find regulators
        regulators = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"
            if REGULATOR_RE.search(search):
                m = REGULATOR_RE.search(search)
                regulators.append(m.group(0))

        # Find other key components
        has_triacs = False
        has_relays = False
        has_display = False
        comm_interfaces = []
        has_sensors = False

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            if TRIAC_RE.search(search):
                has_triacs = True
            if RELAY_RE.search(search) or ref_prefix(elem["name"]) == "K":
                has_relays = True
            if DISPLAY_RE.search(search):
                has_display = True
            if COMM_RE.search(search):
                m = COMM_RE.search(search)
                comm_interfaces.append(m.group(0))
            if SENSOR_RE.search(search):
                has_sensors = True

        # LED count
        led_count = sum(1 for e in elements if ref_prefix(e["name"]) == "LED" or
                        (ref_prefix(e["name"]) == "D" and LED_RE.search(e.get("value", "") or "")))

        # Dimensions
        dims = compute_board_dimensions(elements, plain_elements)
        area = dims["widthMm"] * dims["heightMm"]
        density = round(len(elements) / (area / 100) if area > 0 else 0, 2)  # parts/cm²

        # Layer count from signals
        layers_used = set()
        for sig in signals:
            for cr in sig.get("contactrefs", []):
                pass  # contactrefs don't have layer info
            for wire in sig.get("wires", []):
                layers_used.add(wire.get("layer", 0))
        copper_layers = {l for l in layers_used if l in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)}

        # SMD ratio
        smd_count = sum(1 for e in elements if any(
            p.get("type") == "smd" for p in e.get("pads", [])
        ))
        tht_count = sum(1 for e in elements if any(
            p.get("type") == "through-hole" for p in e.get("pads", [])
        ))

        complexity = classify_complexity(
            len(elements), len(mcu_families), len(comm_interfaces), has_triacs
        )
        complexity_counts[complexity] += 1

        # Count signal nets
        signal_count = len([s for s in signals if s.get("name", "") and not s["name"].startswith("N$")])

        # Has schematic
        has_schematic = schematic is not None

        # Pin count from schematic
        total_io_pins = 0
        if schematic and mcu_families:
            for elem in elements:
                for pattern, family in MCU_PATTERNS:
                    search = f"{elem.get('value', '')} {elem.get('package', '')}"
                    if pattern.search(search):
                        pins = get_part_pins(schematic, elem["name"])
                        total_io_pins += len(pins)
                        break

        summaries.append({
            "design": design,
            "dimensions": dims,
            "areaMm2": round(area, 2),
            "componentCount": len(elements),
            "densityPartsCm2": density,
            "copperLayers": len(copper_layers) if copper_layers else 1,
            "smdCount": smd_count,
            "thtCount": tht_count,
            "smdRatio": round(smd_count / max(smd_count + tht_count, 1), 2),
            "signalNets": signal_count,
            "mcuFamilies": list(set(mcu_families)),
            "mcuCount": len(mcu_families),
            "regulators": list(set(regulators)),
            "hasTriacs": has_triacs,
            "hasRelays": has_relays,
            "hasDisplay": has_display,
            "hasSensors": has_sensors,
            "commInterfaces": list(set(comm_interfaces)),
            "ledCount": led_count,
            "totalIoPins": total_io_pins,
            "complexity": complexity,
            "hasSchematic": has_schematic,
            "componentTypes": dict(sorted(type_counts.items(), key=lambda x: -x[1])),
        })

    # Sort by complexity
    summaries.sort(key=lambda x: (-x["complexity"], -x["componentCount"]))

    result = {
        "summary": {
            "total_boards": len(boards),
            "boards_analyzed": len(summaries),
            "complexity_distribution": dict(sorted(complexity_counts.items())),
            "mcu_family_counts": dict(sorted(mcu_family_counts.items(), key=lambda x: -x[1])),
            "avg_component_count": round(sum(s["componentCount"] for s in summaries) / max(len(summaries), 1), 1),
            "boards_with_schematics": sum(1 for s in summaries if s["hasSchematic"]),
            "boards_with_triacs": sum(1 for s in summaries if s["hasTriacs"]),
            "boards_with_displays": sum(1 for s in summaries if s["hasDisplay"]),
            "boards_with_relays": sum(1 for s in summaries if s["hasRelays"]),
        },
        "boards": summaries,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Boards analyzed: {len(summaries)}")
    print(f"  Complexity: {dict(complexity_counts)}")
    print(f"  MCU families: {dict(mcu_family_counts)}")
    print(f"  Avg components: {result['summary']['avg_component_count']}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
