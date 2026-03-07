#!/usr/bin/env python3
"""
Mine board layout patterns from 226 APS-exported board JSON files.
Extracts placement conventions, design rule preferences, via patterns,
board dimensions, component zoning, and orientation habits.
"""

import json
import os
import math
import sys
from collections import defaultdict, Counter
from pathlib import Path

BOARD_DIR = Path(os.path.expanduser("~/development/rec-circuit-design/aps-export-output"))
OUTPUT_FILE = Path(__file__).parent / "src" / "knowledge" / "mined-layout.ts"

# ── Accumulators ──

board_dims = []  # (width, height, area, design)
design_rules_all = []  # collected DRC settings
grid_settings = Counter()
mounting_hole_patterns = []  # (count, positions_relative_to_corners, design)
via_drills = Counter()
via_extents = Counter()
component_orientations = Counter()  # angle -> count
top_bottom = {"top": 0, "bottom": 0}  # mirror=0 vs mirror=1
component_zones = defaultdict(list)  # category -> list of (normalized_x, normalized_y)
trace_widths_by_layer = defaultdict(list)
net_class_configs = []
clearances = {"wire_wire": [], "wire_pad": [], "pad_pad": [], "smd_pad": [], "smd_smd": []}
min_widths = []
min_drills = []
pad_ratios = {"top": [], "via": []}
copper_pours_per_board = []
board_shapes = Counter()  # "rectangular", "irregular"
aspect_ratios = []
component_spacing = []  # min distance between adjacent components per board
regulator_positions = []  # normalized position of voltage regulators
mcu_positions = []  # normalized position of MCUs
connector_edge_distances = []  # distance to nearest board edge

# Categories for component zoning
def categorize_ref(name, value):
    """Categorize a component by its reference designator and value."""
    prefix = name.rstrip("0123456789").upper()
    val_lower = (value or "").lower()

    if prefix in ("U", "IC", "CR"):
        if any(k in val_lower for k in ("pic1", "pic18", "stm32", "esp32", "atm", "sam", "rp2040", "attiny")):
            return "mcu"
        if any(k in val_lower for k in ("ncp1117", "lm317", "lm2596", "ams1117", "spx", "irm", "aoz", "tps", "mc33", "lm78")):
            return "regulator"
        if any(k in val_lower for k in ("ft232", "ch340", "max485", "max232", "sp3485", "sn65")):
            return "interface-ic"
        return "ic-other"
    if prefix in ("J", "X", "P", "CON"):
        return "connector"
    if prefix in ("R",):
        return "resistor"
    if prefix in ("C",):
        return "capacitor"
    if prefix in ("D", "LED"):
        return "diode-led"
    if prefix in ("Q", "T"):
        return "transistor"
    if prefix in ("L", "FL"):
        return "inductor"
    if prefix in ("K", "RL"):
        return "relay"
    if prefix in ("F",):
        return "fuse"
    if prefix in ("Y", "OSC"):
        return "crystal"
    if prefix in ("VR",):
        return "regulator"
    if prefix in ("TP",):
        return "testpoint"
    if prefix in ("S", "SW"):
        return "switch"
    if prefix in ("A",):
        # Module (ESP32, etc.)
        if any(k in val_lower for k in ("esp32", "wrover", "wroom")):
            return "mcu"
        return "module"
    return "other"


def parse_mil(val):
    """Parse a design rule value like '9mil' or '0.2mm' to mm."""
    if isinstance(val, (int, float)):
        return val
    s = str(val).strip().lower()
    if s.endswith("mil"):
        return float(s[:-3]) * 0.0254
    if s.endswith("mm"):
        return float(s[:-2])
    try:
        return float(s)
    except ValueError:
        return None


def board_extents(outline, area_dict):
    """Get board width/height from outline or area dict."""
    if area_dict:
        w = abs(area_dict.get("x2", 0) - area_dict.get("x1", 0))
        h = abs(area_dict.get("y2", 0) - area_dict.get("y1", 0))
        return w, h
    if outline:
        xs = [p.get("x1", 0) for p in outline] + [p.get("x2", 0) for p in outline]
        ys = [p.get("y1", 0) for p in outline] + [p.get("y2", 0) for p in outline]
        return max(xs) - min(xs), max(ys) - min(ys)
    return None, None


def distance_to_edge(x, y, x_min, y_min, x_max, y_max):
    """Shortest distance from point to board rectangle edges."""
    return min(x - x_min, x_max - x, y - y_min, y_max - y)


def percentiles(data, ps=(25, 50, 75, 90)):
    """Calculate percentiles from a list of numbers."""
    if not data:
        return {}
    s = sorted(data)
    n = len(s)
    result = {}
    for p in ps:
        k = (n - 1) * p / 100
        f = math.floor(k)
        c = math.ceil(k)
        if f == c:
            result[f"p{p}"] = round(s[int(k)], 4)
        else:
            result[f"p{p}"] = round(s[f] + (s[c] - s[f]) * (k - f), 4)
    return result


# ── Process each board file ──

board_files = sorted(BOARD_DIR.glob("*_board.json"))
print(f"Processing {len(board_files)} board files...")

skipped = 0
processed = 0

for bf in board_files:
    try:
        with open(bf) as f:
            board = json.load(f)
    except Exception:
        skipped += 1
        continue

    design = board.get("design_name", bf.stem)
    elements = board.get("elements", [])
    signals = board.get("signals", [])
    holes = board.get("holes", [])
    area_dict = board.get("area", {})
    outline = board.get("board_outline", [])
    drc = board.get("design_rules", {})
    nc = board.get("net_classes", [])

    if not elements:
        skipped += 1
        continue

    processed += 1

    # ── Board dimensions ──
    w, h = board_extents(outline, area_dict)
    if w and h and w > 1 and h > 1:  # Filter out degenerate boards
        # Normalize so width >= height
        w_norm, h_norm = max(w, h), min(w, h)
        board_dims.append({
            "design": design,
            "width": round(w_norm, 2),
            "height": round(h_norm, 2),
            "area": round(w_norm * h_norm, 1),
            "aspectRatio": round(w_norm / h_norm, 2) if h_norm > 0 else 1,
        })
        aspect_ratios.append(round(w_norm / h_norm, 2))

        # Check if rectangular vs irregular
        if len(outline) <= 6:
            board_shapes["rectangular"] += 1
        else:
            board_shapes["non-rectangular"] += 1

    # ── Grid ──
    grid = board.get("grid", {})
    if grid:
        dist = grid.get("distance")
        unit = grid.get("unit")
        if dist:
            grid_settings[f"{dist} (unit={unit})"] += 1

    # ── Design rules ──
    if drc:
        for key, label in [
            ("mdWireWire", "wire_wire"),
            ("mdWirePad", "wire_pad"),
            ("mdPadPad", "pad_pad"),
            ("mdSmdPad", "smd_pad"),
            ("mdSmdSmd", "smd_smd"),
        ]:
            val = parse_mil(drc.get(key, ""))
            if val is not None and val > 0:
                clearances[label].append(val)

        mw = parse_mil(drc.get("msWidth", ""))
        if mw is not None and mw > 0:
            min_widths.append(mw)

        md = parse_mil(drc.get("msDrill", ""))
        if md is not None and md > 0:
            min_drills.append(md)

        for key, label in [("rvPadTop", "top"), ("rvViaOuter", "via")]:
            val = drc.get(key)
            if val is not None:
                try:
                    pad_ratios[label].append(float(val))
                except (ValueError, TypeError):
                    pass

    # ── Net classes ──
    for nc_item in nc:
        if nc_item.get("width") or nc_item.get("clearance"):
            net_class_configs.append({
                "name": nc_item.get("name", "?"),
                "width": nc_item.get("width", 0),
                "clearance": nc_item.get("clearance", 0),
                "drill": nc_item.get("drill", 0),
            })

    # ── Mounting holes ──
    if holes:
        mounting_hole_patterns.append({
            "design": design,
            "count": len(holes),
            "drills": [h.get("drill", 0) for h in holes],
        })

    # ── Elements: placement, orientation, zoning ──
    x_min = area_dict.get("x1", 0)
    y_min = area_dict.get("y1", 0)
    x_max = area_dict.get("x2", 0)
    y_max = area_dict.get("y2", 0)
    bw = x_max - x_min
    bh = y_max - y_min

    for el in elements:
        if not el.get("populate", 1):
            continue

        angle = el.get("angle", 0) or 0
        # Normalize to 0-359
        angle = round(angle % 360)
        component_orientations[angle] += 1

        mirror = el.get("mirror", 0)
        if mirror:
            top_bottom["bottom"] += 1
        else:
            top_bottom["top"] += 1

        # Zoning: normalize position to 0-1 relative to board
        if bw > 1 and bh > 1:
            nx = (el.get("x", 0) - x_min) / bw
            ny = (el.get("y", 0) - y_min) / bh
            cat = categorize_ref(el.get("name", ""), el.get("value", ""))
            component_zones[cat].append((round(nx, 3), round(ny, 3)))

            # Track specific categories for deeper analysis
            if cat == "mcu":
                mcu_positions.append({"design": design, "nx": round(nx, 3), "ny": round(ny, 3)})
            elif cat == "regulator":
                regulator_positions.append({"design": design, "nx": round(nx, 3), "ny": round(ny, 3)})
            elif cat == "connector":
                edge_dist = distance_to_edge(el["x"], el["y"], x_min, y_min, x_max, y_max)
                connector_edge_distances.append(round(edge_dist, 2))

    # ── Signals: vias and copper pours ──
    pour_count = 0
    for sig in signals:
        for via in sig.get("vias", []):
            drill = via.get("drill", 0)
            if drill:
                via_drills[round(drill, 3)] += 1
            extent = via.get("extent", "1-16")
            via_extents[extent] += 1

        for poly in sig.get("polygons", []):
            pour_count += 1

    copper_pours_per_board.append(pour_count)

print(f"\nProcessed {processed} boards, skipped {skipped}")

# ── Analyze and build output ──

def top_n(counter, n=10):
    return [{"value": k, "count": v} for k, v in counter.most_common(n)]


def stats(data):
    if not data:
        return {}
    return {
        "count": len(data),
        "min": round(min(data), 4),
        "max": round(max(data), 4),
        "mean": round(sum(data) / len(data), 4),
        **percentiles(data),
    }


def zone_summary(positions):
    """Summarize where components tend to be placed."""
    if not positions:
        return None
    xs = [p[0] for p in positions]
    ys = [p[1] for p in positions]

    # Quadrant distribution
    center_x = sum(xs) / len(xs)
    center_y = sum(ys) / len(ys)

    # Edge vs center
    edge_threshold = 0.15
    at_edge = sum(1 for x, y in positions if x < edge_threshold or x > (1 - edge_threshold) or y < edge_threshold or y > (1 - edge_threshold))

    return {
        "count": len(positions),
        "meanX": round(center_x, 3),
        "meanY": round(center_y, 3),
        "atEdgePct": round(100 * at_edge / len(positions), 1),
        "xSpread": round(max(xs) - min(xs), 3) if xs else 0,
        "ySpread": round(max(ys) - min(ys), 3) if ys else 0,
    }


# ── Board dimension clusters ──
print("Analyzing board dimensions...")
dim_areas = [d["area"] for d in board_dims]
dim_widths = [d["width"] for d in board_dims]
dim_heights = [d["height"] for d in board_dims]

# Common board sizes (cluster by rounding to nearest 5mm)
size_clusters = Counter()
for d in board_dims:
    w5 = round(d["width"] / 5) * 5
    h5 = round(d["height"] / 5) * 5
    size_clusters[f"{w5}x{h5}mm"] += 1

# ── Orientation analysis ──
print("Analyzing orientations...")
total_components = sum(component_orientations.values())
cardinal_count = sum(component_orientations.get(a, 0) for a in [0, 90, 180, 270])

# ── MCU placement analysis ──
print("Analyzing MCU placement...")
mcu_zone = zone_summary([(p["nx"], p["ny"]) for p in mcu_positions])
reg_zone = zone_summary([(p["nx"], p["ny"]) for p in regulator_positions])

# ── Build TypeScript output ──
print("Generating TypeScript...")

output = '''// Auto-generated from mine-layout-patterns.py — do not edit manually
// Mined from {board_count} board layouts in the REC design library

export interface LayoutPattern {{
  id: string;
  category: string;
  description: string;
  data: unknown;
  sampleSize: number;
}}

export const layoutPatterns: LayoutPattern[] = [
'''.format(board_count=processed)

patterns = []

# 1. Board dimensions
patterns.append({
    "id": "layout-board-dimensions",
    "category": "board-size",
    "description": f"Board dimensions across {len(board_dims)} boards",
    "data": {
        "widthMm": stats(dim_widths),
        "heightMm": stats(dim_heights),
        "areaMm2": stats(dim_areas),
        "aspectRatio": stats(aspect_ratios),
        "shapes": dict(board_shapes),
        "commonSizes": [{"size": k, "count": v} for k, v in size_clusters.most_common(15)],
    },
    "sampleSize": len(board_dims),
})

# 2. Design rule preferences
patterns.append({
    "id": "layout-design-rules",
    "category": "design-rules",
    "description": f"DRC settings across {processed} boards",
    "data": {
        "clearances": {k: stats(v) for k, v in clearances.items() if v},
        "minTraceWidth": stats(min_widths),
        "minDrill": stats(min_drills),
        "padAnnularRing": {k: stats(v) for k, v in pad_ratios.items() if v},
    },
    "sampleSize": processed,
})

# 3. Component orientation
patterns.append({
    "id": "layout-orientations",
    "category": "orientation",
    "description": f"Component rotation angles across {total_components} placements",
    "data": {
        "cardinalAlignedPct": round(100 * cardinal_count / total_components, 1) if total_components else 0,
        "distribution": top_n(component_orientations, 12),
        "topSidePct": round(100 * top_bottom["top"] / (top_bottom["top"] + top_bottom["bottom"]), 1) if (top_bottom["top"] + top_bottom["bottom"]) else 0,
        "bottomSidePct": round(100 * top_bottom["bottom"] / (top_bottom["top"] + top_bottom["bottom"]), 1) if (top_bottom["top"] + top_bottom["bottom"]) else 0,
        "topCount": top_bottom["top"],
        "bottomCount": top_bottom["bottom"],
    },
    "sampleSize": total_components,
})

# 4. Component zoning
zone_data = {}
for cat in sorted(component_zones.keys()):
    zs = zone_summary(component_zones[cat])
    if zs:
        zone_data[cat] = zs
patterns.append({
    "id": "layout-component-zones",
    "category": "placement-zones",
    "description": "Normalized component placement zones (0,0=bottom-left, 1,1=top-right)",
    "data": zone_data,
    "sampleSize": sum(len(v) for v in component_zones.values()),
})

# 5. MCU placement
if mcu_zone:
    patterns.append({
        "id": "layout-mcu-placement",
        "category": "mcu-placement",
        "description": f"MCU/module placement across {mcu_zone['count']} instances",
        "data": {
            "zone": mcu_zone,
            "note": "MCUs tend toward center of board" if 0.3 < mcu_zone["meanX"] < 0.7 and 0.3 < mcu_zone["meanY"] < 0.7 else "MCU placement varies",
        },
        "sampleSize": mcu_zone["count"],
    })

# 6. Regulator placement
if reg_zone:
    patterns.append({
        "id": "layout-regulator-placement",
        "category": "regulator-placement",
        "description": f"Voltage regulator placement across {reg_zone['count']} instances",
        "data": {
            "zone": reg_zone,
            "note": "Regulators placed near board edge for thermal/input access" if reg_zone["atEdgePct"] > 40 else "Regulators distributed across board",
        },
        "sampleSize": reg_zone["count"],
    })

# 7. Connector edge proximity
if connector_edge_distances:
    patterns.append({
        "id": "layout-connector-edge-proximity",
        "category": "connector-placement",
        "description": f"Connector distance to nearest board edge across {len(connector_edge_distances)} instances",
        "data": {
            "distanceMm": stats(connector_edge_distances),
            "within5mmPct": round(100 * sum(1 for d in connector_edge_distances if d < 5) / len(connector_edge_distances), 1),
            "within10mmPct": round(100 * sum(1 for d in connector_edge_distances if d < 10) / len(connector_edge_distances), 1),
        },
        "sampleSize": len(connector_edge_distances),
    })

# 8. Via patterns
if via_drills:
    patterns.append({
        "id": "layout-via-patterns",
        "category": "via-patterns",
        "description": f"Via drill sizes and extents across {sum(via_drills.values())} vias",
        "data": {
            "drillSizes": top_n(via_drills, 10),
            "extents": top_n(via_extents, 5),
            "totalVias": sum(via_drills.values()),
        },
        "sampleSize": sum(via_drills.values()),
    })

# 9. Mounting holes
hole_counts = Counter(p["count"] for p in mounting_hole_patterns)
hole_drills = Counter()
for p in mounting_hole_patterns:
    for d in p["drills"]:
        hole_drills[round(d, 2)] += 1
patterns.append({
    "id": "layout-mounting-holes",
    "category": "mounting-holes",
    "description": f"Mounting hole patterns across {len(mounting_hole_patterns)} boards",
    "data": {
        "boardsWithHoles": len(mounting_hole_patterns),
        "boardsWithoutHoles": processed - len(mounting_hole_patterns),
        "holeCountDistribution": [{"count": k, "boards": v} for k, v in sorted(hole_counts.items())],
        "commonDrills": top_n(hole_drills, 5),
    },
    "sampleSize": len(mounting_hole_patterns),
})

# 10. Grid preferences
patterns.append({
    "id": "layout-grid-preferences",
    "category": "grid",
    "description": f"Grid settings across {sum(grid_settings.values())} boards",
    "data": {
        "settings": top_n(grid_settings, 10),
    },
    "sampleSize": sum(grid_settings.values()),
})

# 11. Copper pour usage
patterns.append({
    "id": "layout-copper-pours",
    "category": "copper-pour",
    "description": f"Copper pour usage across {processed} boards",
    "data": {
        "boardsWithPours": sum(1 for c in copper_pours_per_board if c > 0),
        "boardsWithoutPours": sum(1 for c in copper_pours_per_board if c == 0),
        "poursPerBoard": stats(copper_pours_per_board),
    },
    "sampleSize": processed,
})

# Write TypeScript
for i, p in enumerate(patterns):
    comma = "," if i < len(patterns) - 1 else ""
    output += f"  {json.dumps(p, indent=4)}{comma}\n"

output += "];\n"

# Also export typed accessors
output += """
// ── Convenience accessors ──

export function getLayoutPattern(id: string): LayoutPattern | undefined {
  return layoutPatterns.find(p => p.id === id);
}

export function getLayoutsByCategory(category: string): LayoutPattern[] {
  return layoutPatterns.filter(p => p.category === category);
}
"""

with open(OUTPUT_FILE, "w") as f:
    f.write(output)

print(f"\nWrote {len(patterns)} layout patterns to {OUTPUT_FILE}")
print(f"File size: {os.path.getsize(OUTPUT_FILE)} bytes")

# Print summary
print("\n=== HIGHLIGHTS ===")
if board_dims:
    print(f"Board sizes: median {stats(dim_widths).get('p50')}x{stats(dim_heights).get('p50')}mm")
    top5 = [f"{k} ({v})" for k, v in size_clusters.most_common(5)]
    print(f"Common sizes: {', '.join(top5)}")
print(f"Orientation: {round(100 * cardinal_count / total_components, 1)}% cardinal (0/90/180/270)")
print(f"Top/bottom: {round(100 * top_bottom['top'] / (top_bottom['top'] + top_bottom['bottom']), 1)}% top side")
if mcu_zone:
    print(f"MCU placement: center ({mcu_zone['meanX']:.2f}, {mcu_zone['meanY']:.2f}), {mcu_zone['atEdgePct']}% at edge")
if via_drills:
    print(f"Most common via drill: {via_drills.most_common(1)[0][0]}mm ({via_drills.most_common(1)[0][1]} vias)")
print(f"Mounting holes: {len(mounting_hole_patterns)}/{processed} boards have them")
