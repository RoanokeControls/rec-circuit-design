#!/usr/bin/env python3
"""Generate TypeScript knowledge files from analysis JSON outputs.

Reads analysis/*.json → writes src/knowledge/mined-*.ts
Also updates src/knowledge/index.ts barrel export.
"""

import json
import os
import sys

ANALYSIS_DIR = os.path.dirname(__file__)
KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "knowledge")
BARREL_FILE = os.path.join(KNOWLEDGE_DIR, "index.ts")


def json_to_ts_value(val, indent=2, level=1):
    """Convert a Python/JSON value to TypeScript literal string."""
    prefix = "  " * level

    if val is None:
        return "null"
    elif isinstance(val, bool):
        return "true" if val else "false"
    elif isinstance(val, (int, float)):
        return str(val)
    elif isinstance(val, str):
        # Escape for TypeScript string
        escaped = val.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'"{escaped}"'
    elif isinstance(val, list):
        if not val:
            return "[]"
        items = []
        for item in val:
            items.append(f"{prefix}  {json_to_ts_value(item, indent, level + 1)}")
        return "[\n" + ",\n".join(items) + f"\n{prefix}]"
    elif isinstance(val, dict):
        if not val:
            return "{}"
        items = []
        for k, v in val.items():
            # Use valid JS key format
            key = k if k.isidentifier() and not k.startswith("_") else f'"{k}"'
            items.append(f"{prefix}  {key}: {json_to_ts_value(v, indent, level + 1)}")
        return "{\n" + ",\n".join(items) + f"\n{prefix}}}"
    return str(val)


def write_ts_array(filepath, type_name, import_path, var_name, data):
    """Write a TypeScript file exporting a typed array."""
    items_str = json_to_ts_value(data)

    content = f'import {{ {type_name} }} from "../types/index.js";\n\n'
    content += f"// Auto-generated from analysis pipeline — do not edit manually\n\n"
    content += f"export const {var_name}: {type_name}[] = {items_str};\n"

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  Wrote {filepath} ({len(data)} items)")


def write_ts_multi_export(filepath, exports):
    """Write a TS file with multiple named exports of different types."""
    content = ""
    imports = set()
    for type_name, _, _ in exports:
        imports.add(type_name)

    content += f'import {{ {", ".join(sorted(imports))} }} from "../types/index.js";\n\n'
    content += f"// Auto-generated from analysis pipeline — do not edit manually\n\n"

    for type_name, var_name, data in exports:
        items_str = json_to_ts_value(data)
        content += f"export const {var_name}: {type_name}[] = {items_str};\n\n"

    with open(filepath, "w") as f:
        f.write(content)
    total = sum(len(d) for _, _, d in exports)
    print(f"  Wrote {filepath} ({total} total items)")


def generate_decoupling():
    """Generate mined-decoupling.ts from decoupling_patterns.json."""
    with open(os.path.join(ANALYSIS_DIR, "decoupling_patterns.json")) as f:
        data = json.load(f)

    patterns = data["patterns"]
    write_ts_array(
        os.path.join(KNOWLEDGE_DIR, "mined-decoupling.ts"),
        "DecouplingPattern",
        "../types/index.js",
        "minedDecoupling",
        patterns,
    )


def generate_power_supplies():
    """Generate mined-power-supplies.ts."""
    with open(os.path.join(ANALYSIS_DIR, "power_supply_patterns.json")) as f:
        data = json.load(f)

    filepath = os.path.join(KNOWLEDGE_DIR, "mined-power-supplies.ts")

    content = 'import { MinedPowerSupply, TriacCircuit, EmcComponent } from "../types/index.js";\n\n'
    content += "// Auto-generated from analysis pipeline — do not edit manually\n\n"

    content += f"export const minedPowerSupplies: MinedPowerSupply[] = {json_to_ts_value(data['supply_patterns'])};\n\n"
    content += f"export const triacCircuits: TriacCircuit[] = {json_to_ts_value(data['triac_circuits'])};\n\n"
    content += f"export const emcComponents: EmcComponent[] = {json_to_ts_value(data['emc_components'])};\n\n"

    fuse_data = data.get("fuse_ratings", [])
    content += f"export const fuseRatings: {{ rating: string; count: number; designCount: number }}[] = {json_to_ts_value(fuse_data)};\n"

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  Wrote {filepath} ({len(data['supply_patterns'])} supplies, {len(data['triac_circuits'])} triacs, {len(data['emc_components'])} EMC types)")


def generate_mcus():
    """Generate mined-mcus.ts."""
    with open(os.path.join(ANALYSIS_DIR, "mcu_patterns.json")) as f:
        data = json.load(f)

    # Ensure resetCircuit always has both keys
    for profile in data["profiles"]:
        rc = profile.get("resetCircuit", {})
        if "pullupValue" not in rc:
            rc["pullupValue"] = ""
        if "capValue" not in rc:
            rc["capValue"] = ""
        profile["resetCircuit"] = rc

    filepath = os.path.join(KNOWLEDGE_DIR, "mined-mcus.ts")

    content = 'import { McuProfile } from "../types/index.js";\n\n'
    content += "// Auto-generated from analysis pipeline — do not edit manually\n\n"
    content += f"export const mcuProfiles: McuProfile[] = {json_to_ts_value(data['profiles'])};\n\n"

    content += f"export const mcuFamilySummary: Record<string, {{ instances: number; uniqueParts: string[] }}> = {json_to_ts_value(data['family_summary'])};\n"

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  Wrote {filepath} ({len(data['profiles'])} MCU profiles)")


def generate_pullups():
    """Generate mined-pullups.ts."""
    with open(os.path.join(ANALYSIS_DIR, "pullup_patterns.json")) as f:
        data = json.load(f)

    write_ts_array(
        os.path.join(KNOWLEDGE_DIR, "mined-pullups.ts"),
        "PullupPattern",
        "../types/index.js",
        "minedPullups",
        data["patterns"],
    )


def generate_routing():
    """Generate mined-routing.ts."""
    with open(os.path.join(ANALYSIS_DIR, "ground_routing_patterns.json")) as f:
        data = json.load(f)

    practices = []

    # Power net trace widths
    for net_name, stats in data.get("power_net_trace_widths", {}).items():
        pcts = stats.get("percentiles", {})
        practices.append({
            "id": f"routing-trace-{net_name.lower().replace('+', '').replace('.', '')}",
            "category": "trace-width",
            "netName": net_name,
            "description": f"{net_name} trace width across {stats['sampleCount']} segments",
            "metric": pcts.get("p50", 0),
            "unit": "mm",
            "sampleSize": stats["sampleCount"],
            "percentiles": pcts,
        })

    # Signal trace widths
    sig_stats = data.get("signal_trace_widths", {})
    if sig_stats:
        pcts = sig_stats.get("percentiles", {})
        practices.append({
            "id": "routing-trace-signal",
            "category": "trace-width",
            "netName": "signal",
            "description": f"Signal trace width across {sig_stats['sampleCount']} segments",
            "metric": pcts.get("p50", 0),
            "unit": "mm",
            "sampleSize": sig_stats["sampleCount"],
            "percentiles": pcts,
        })

    # Via stitching
    via_stats = data.get("via_stitching", {})
    if via_stats:
        pcts = via_stats.get("percentiles", {})
        practices.append({
            "id": "routing-via-stitching",
            "category": "via-stitching",
            "netName": "GND",
            "description": f"GND via stitching density across {via_stats.get('boardsWithGndVias', 0)} boards",
            "metric": pcts.get("p50", 0),
            "unit": "vias/cm²",
            "sampleSize": via_stats.get("boardsWithGndVias", 0),
            "percentiles": pcts,
        })

    # Net class usage
    net_classes = data.get("summary", {}).get("net_classes_found", {})
    for nc_name, count in net_classes.items():
        practices.append({
            "id": f"routing-netclass-{nc_name.lower()}",
            "category": "net-class",
            "netName": nc_name,
            "description": f"Net class '{nc_name}' used in {count} boards",
            "metric": count,
            "unit": "boards",
            "sampleSize": count,
        })

    write_ts_array(
        os.path.join(KNOWLEDGE_DIR, "mined-routing.ts"),
        "RoutingPractice",
        "../types/index.js",
        "minedRouting",
        practices,
    )


def generate_placement():
    """Generate mined-placement.ts from placement + connector analysis."""
    with open(os.path.join(ANALYSIS_DIR, "placement_patterns.json")) as f:
        placement = json.load(f)

    with open(os.path.join(ANALYSIS_DIR, "connector_patterns.json")) as f:
        connectors = json.load(f)

    conventions = []

    # Density stats
    density = placement.get("density_stats", {})
    conventions.append({
        "id": "placement-density",
        "category": "density",
        "description": f"Board component density across {density.get('sampleSize', 0)} boards",
        "metric": density.get("p50", 0),
        "unit": "parts/cm²",
        "sampleSize": density.get("sampleSize", 0),
    })

    # Connector edge placement
    conn_placement = placement.get("connector_placement", {})
    conventions.append({
        "id": "placement-connector-edge",
        "category": "connector-edge",
        "description": f"{conn_placement.get('within_5mm_of_edge_pct', 0)}% of connectors within 5mm of board edge",
        "metric": conn_placement.get("within_5mm_of_edge_pct", 0),
        "unit": "percent",
        "sampleSize": conn_placement.get("total_connectors", 0),
    })

    # Mounting holes
    holes = placement.get("mounting_holes", {})
    conventions.append({
        "id": "placement-mounting-holes",
        "category": "mounting-hole",
        "description": f"{holes.get('boards_with_holes', 0)} boards use mounting holes",
        "metric": holes.get("boards_with_holes", 0),
        "unit": "boards",
        "sampleSize": placement.get("summary", {}).get("boards_with_components", 0),
    })

    # Per connector type
    for ct in connectors.get("connector_types", []):
        conventions.append({
            "id": f"placement-conn-{ct['type'].lower()}",
            "category": "connector-edge",
            "description": f"{ct['type']}: {ct['count']} instances, {ct.get('within5mmOfEdgePct', 0)}% at edge, median {ct.get('medianEdgeDistanceMm', 0)}mm from edge",
            "metric": ct.get("medianEdgeDistanceMm", 0),
            "unit": "mm from edge",
            "sampleSize": ct["count"],
        })

    # Modules/adapters
    for mt in connectors.get("module_types", []):
        conventions.append({
            "id": f"placement-mod-{mt['type'].lower()}",
            "category": "adapter",
            "description": f"{mt['type']}: {mt['count']} instances, median {mt.get('medianEdgeDistanceMm', 0)}mm from edge",
            "metric": mt.get("medianEdgeDistanceMm", 0),
            "unit": "mm from edge",
            "sampleSize": mt["count"],
        })

    write_ts_array(
        os.path.join(KNOWLEDGE_DIR, "mined-placement.ts"),
        "PlacementConvention",
        "../types/index.js",
        "minedPlacement",
        conventions,
    )


def generate_silkscreen():
    """Generate mined-silkscreen.ts."""
    with open(os.path.join(ANALYSIS_DIR, "silkscreen_patterns.json")) as f:
        data = json.load(f)

    conventions = []

    # Layer summaries
    for ls in data.get("layer_summaries", []):
        conventions.append({
            "id": f"silk-layer-{ls['layer']}",
            "category": "layer-usage",
            "description": f"{ls['layerName']} (layer {ls['layer']}): {ls['textCount']} texts, most common size {ls['mostCommonSize']}mm",
            "value": str(ls["mostCommonSize"]),
            "layer": ls["layer"],
            "occurrences": ls["textCount"],
        })

    # Font usage
    for font, count in data.get("font_usage", {}).items():
        conventions.append({
            "id": f"silk-font-{font}",
            "category": "font",
            "description": f"Font '{font}' used in {count} text elements",
            "value": font,
            "occurrences": count,
        })

    # Smash rate
    smash = data.get("smash_details", {})
    conventions.append({
        "id": "silk-smash-rate",
        "category": "smash-rate",
        "description": f"{smash.get('smash_rate_pct', 0)}% of elements have smashed (manually-placed) text",
        "value": f"{smash.get('smash_rate_pct', 0)}%",
        "occurrences": smash.get("smashed_elements", 0),
    })

    # Part number formats
    for fmt, count in data.get("part_number_formats", {}).items():
        conventions.append({
            "id": f"silk-pn-{fmt.replace(' ', '-').lower()[:30]}",
            "category": "part-number",
            "description": f"Part number format: {fmt}",
            "value": fmt,
            "occurrences": count,
        })

    write_ts_array(
        os.path.join(KNOWLEDGE_DIR, "mined-silkscreen.ts"),
        "SilkscreenConvention",
        "../types/index.js",
        "minedSilkscreen",
        conventions,
    )


def update_barrel_export():
    """Update src/knowledge/index.ts with new mined exports."""
    new_exports = [
        'export { minedDecoupling } from "./mined-decoupling.js";',
        'export { minedPowerSupplies, triacCircuits, emcComponents, fuseRatings } from "./mined-power-supplies.js";',
        'export { mcuProfiles, mcuFamilySummary } from "./mined-mcus.js";',
        'export { minedPullups } from "./mined-pullups.js";',
        'export { minedRouting } from "./mined-routing.js";',
        'export { minedPlacement } from "./mined-placement.js";',
        'export { minedSilkscreen } from "./mined-silkscreen.js";',
    ]

    with open(BARREL_FILE) as f:
        content = f.read()

    # Check if already added
    if "mined-decoupling" in content:
        print("  Barrel exports already present — skipping update")
        return

    content += "\n// ── Mined Design Knowledge ──\n"
    for exp in new_exports:
        content += exp + "\n"

    with open(BARREL_FILE, "w") as f:
        f.write(content)

    print(f"  Updated {BARREL_FILE} with {len(new_exports)} new exports")


def main():
    print("Generating TypeScript knowledge files from analysis data...")
    print()

    generate_decoupling()
    generate_power_supplies()
    generate_mcus()
    generate_pullups()
    generate_routing()
    generate_placement()
    generate_silkscreen()
    update_barrel_export()

    print()
    print("Done! All knowledge files generated.")


if __name__ == "__main__":
    main()
