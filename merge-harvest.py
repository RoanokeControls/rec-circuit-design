#!/usr/bin/env python3
"""Merge harvested library data into rec-library.json.

Converts harvested format (v3, mm coordinates, string enums) to
rec-library format (v2, Eagle internal units, integer enums).

Also creates:
  - third-party-library.json: Non-REC components for reference
  - scraped-documents.json: Tracker for all processed files

Usage:
    python3 merge-harvest.py [--dry-run] [--output DIR]
"""

import json
import os
import sys
import time
from collections import OrderedDict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HARVEST_DIR = os.path.join(SCRIPT_DIR, "harvest-output")
LIBRARY_DATA_DIR = os.path.expanduser(
    "~/development/autodesk-coder/library-data"
)

# ── Unit conversion ──────────────────────────────────────────
# rec-library.json: 320000 units = 1 mm (Eagle internal binary units)
UNITS_PER_MM = 320000

def mm2u(mm_val):
    """Convert mm (float) to Eagle internal units (int)."""
    if mm_val is None:
        return 0
    return round(float(mm_val) * UNITS_PER_MM)

# ── Enum mappings ────────────────────────────────────────────
# Pad shapes: Eagle XML string → rec-library integer
PAD_SHAPE_MAP = {
    "round": 0,
    "octagon": 1,
    "square": 2,
    "long": 3,
    "offset": 3,  # offset is a variant of long
    "slot": 3,
}

# Pin direction: Eagle XML string → rec-library integer
PIN_DIR_MAP = {
    "nc": 0,
    "in": 1,
    "out": 2,
    "io": 3,
    "oc": 4,
    "pwr": 5,
    "pas": 6,
    "hiz": 7,
    "sup": 8,
}

# Pin length: Eagle XML string → rec-library integer
PIN_LENGTH_MAP = {
    "point": 0,
    "short": 1,
    "middle": 2,
    "long": 3,
}

# Pin visible: Eagle XML string → rec-library integer
PIN_VISIBLE_MAP = {
    "both": 0,
    "pin": 1,
    "pad": 2,
    "off": 3,
}

# Rotation string → angle float
def rot_to_angle(rot_str):
    """Convert rotation string like 'R90', 'R270', 'MR90' to angle float."""
    if not rot_str:
        return 0.0
    s = rot_str.replace("M", "").replace("S", "")
    if s.startswith("R"):
        try:
            return float(s[1:])
        except ValueError:
            return 0.0
    return 0.0

def rot_is_mirror(rot_str):
    """Check if rotation string indicates mirroring."""
    return 1 if rot_str and "M" in rot_str else 0


# ── Format converters ────────────────────────────────────────

def convert_pad(pad):
    """Convert harvested pad (mm, strings) to rec-library format."""
    return {
        "name": pad.get("name", ""),
        "x": mm2u(pad.get("x", 0)),
        "y": mm2u(pad.get("y", 0)),
        "drill": mm2u(pad.get("drill", 0)),
        "diameter": mm2u(pad.get("diameter", 0)),
        "shape": PAD_SHAPE_MAP.get(pad.get("shape", "round"), 0),
        "angle": rot_to_angle(pad.get("rot", "")),
        "elongation": pad.get("elongation", 0) or 0,
        "flags": 5,  # default pad flags
    }

def convert_smd(smd):
    """Convert harvested SMD pad to rec-library format."""
    return {
        "name": smd.get("name", ""),
        "x": mm2u(smd.get("x", 0)),
        "y": mm2u(smd.get("y", 0)),
        "dx": mm2u(smd.get("dx", 0)),
        "dy": mm2u(smd.get("dy", 0)),
        "layer": smd.get("layer", 1),
        "roundness": smd.get("roundness", 0) or 0,
        "angle": rot_to_angle(smd.get("rot", "")),
    }

def convert_wire(wire):
    """Convert harvested wire to rec-library format."""
    return {
        "x1": mm2u(wire.get("x1", 0)),
        "y1": mm2u(wire.get("y1", 0)),
        "x2": mm2u(wire.get("x2", 0)),
        "y2": mm2u(wire.get("y2", 0)),
        "width": mm2u(wire.get("width", 0)),
        "layer": wire.get("layer", 0),
        "curve": float(wire.get("curve", 0) or 0),
    }

def convert_circle(circle):
    """Convert harvested circle to rec-library format."""
    return {
        "x": mm2u(circle.get("x", 0)),
        "y": mm2u(circle.get("y", 0)),
        "radius": mm2u(circle.get("radius", 0)),
        "width": mm2u(circle.get("width", 0)),
        "layer": circle.get("layer", 0),
    }

def convert_rect(rect):
    """Convert harvested rectangle to rec-library format."""
    return {
        "x1": mm2u(rect.get("x1", 0)),
        "y1": mm2u(rect.get("y1", 0)),
        "x2": mm2u(rect.get("x2", 0)),
        "y2": mm2u(rect.get("y2", 0)),
        "layer": rect.get("layer", 0),
        "angle": rot_to_angle(rect.get("rot", "")),
    }

def convert_text(text):
    """Convert harvested text to rec-library format."""
    return {
        "value": text.get("value", ""),
        "x": mm2u(text.get("x", 0)),
        "y": mm2u(text.get("y", 0)),
        "size": mm2u(text.get("size", 0)),
        "layer": text.get("layer", 0),
        "font": text.get("font", 1) or 1,
        "ratio": text.get("ratio", 8) or 8,
        "angle": rot_to_angle(text.get("rot", "")),
        "mirror": rot_is_mirror(text.get("rot", "")),
        "align": text.get("align", 0) or 0,
    }

def convert_hole(hole):
    """Convert harvested hole to rec-library format."""
    return {
        "x": mm2u(hole.get("x", 0)),
        "y": mm2u(hole.get("y", 0)),
        "drill": mm2u(hole.get("drill", 0)),
    }

def convert_footprint(fp):
    """Convert a complete harvested footprint to rec-library format."""
    return {
        "name": fp["name"],
        "description": fp.get("description", ""),
        "smds": [convert_smd(s) for s in fp.get("smds", [])],
        "pads": [convert_pad(p) for p in fp.get("pads", [])],
        "wires": [convert_wire(w) for w in fp.get("wires", [])],
        "circles": [convert_circle(c) for c in fp.get("circles", [])],
        "rectangles": [convert_rect(r) for r in fp.get("rectangles", [])],
        "texts": [convert_text(t) for t in fp.get("texts", [])],
        "holes": [convert_hole(h) for h in fp.get("holes", [])],
    }

def convert_pin(pin):
    """Convert harvested symbol pin to rec-library format."""
    return {
        "name": pin.get("name", ""),
        "x": mm2u(pin.get("x", 0)),
        "y": mm2u(pin.get("y", 0)),
        "direction": PIN_DIR_MAP.get(pin.get("direction", "io"), 3),
        "function": 0,
        "length": PIN_LENGTH_MAP.get(pin.get("length", "middle"), 2),
        "visible": PIN_VISIBLE_MAP.get(pin.get("visible", "both"), 0),
        "angle": rot_to_angle(pin.get("rot", "")),
        "swaplevel": pin.get("swaplevel", 0) or 0,
    }

def convert_symbol(sym):
    """Convert a complete harvested symbol to rec-library format."""
    return {
        "name": sym["name"],
        "description": sym.get("description", ""),
        "pins": [convert_pin(p) for p in sym.get("pins", [])],
        "wires": [convert_wire(w) for w in sym.get("wires", [])],
        "circles": [convert_circle(c) for c in sym.get("circles", [])],
        "rectangles": [convert_rect(r) for r in sym.get("rectangles", [])],
        "texts": [convert_text(t) for t in sym.get("texts", [])],
    }

def convert_deviceset(ds):
    """Convert a complete harvested deviceset to rec-library format."""
    gates = []
    for g in ds.get("gates", []):
        gates.append({
            "name": g.get("name", ""),
            "symbol": g.get("symbol", ""),
            "x": mm2u(g.get("x", 0)),
            "y": mm2u(g.get("y", 0)),
            "addlevel": g.get("addlevel", 2) or 2,
            "swaplevel": g.get("swaplevel", 0) or 0,
        })

    devices = []
    for d in ds.get("devices", []):
        devices.append({
            "name": d.get("name", "") or "''",
            "footprint": d.get("footprint", ""),
            "technologies": d.get("technologies", "''") or "''",
            "connects": d.get("connects", []),
        })

    return {
        "name": ds["name"],
        "prefix": ds.get("prefix", ""),
        "description": ds.get("description", ""),
        "headline": ds.get("headline", ""),
        "value": "On" if ds.get("uservalue") else "Off",
        "urn": "",
        "library_urn": "",
        "library_version": 0,
        "gates": gates,
        "devices": devices,
    }


# ── Library source priority ─────────────────────────────────
# Prefer components from official REC libraries in this order
REC_LIB_PRIORITY = [
    "REC_Standard_Library",
    "REC_Standard_Library_Copy_v162",
    "REC_Eng_Proto_Library",
    "REC_Pogo_Array",
    "REC_Library",
    "TestREC_Library",
]
# Then REC_STDLIB_* (section libraries)
# Then REC_Temp_Library*
# Then unnamed "" library as fallback


def get_lib_priority(lib_name):
    """Lower number = higher priority."""
    if lib_name in REC_LIB_PRIORITY:
        return REC_LIB_PRIORITY.index(lib_name)
    if lib_name.startswith("REC_STDLIB_"):
        return 100
    if lib_name.startswith("REC_Temp_"):
        return 200
    if lib_name.startswith("_REC_"):
        return 250
    if lib_name == "":
        return 300
    return 500  # third-party


def is_rec_library(lib_name):
    """Check if a library is REC-owned."""
    if lib_name == "":
        return True  # unnamed = embedded in REC designs
    name_upper = lib_name.upper()
    return (
        name_upper.startswith("REC_")
        or name_upper.startswith("_REC_")
        or name_upper == "TESTREC_LIBRARY"
        or name_upper == "RECTIFIER"
    )


# ── Main merge logic ────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Merge harvested library into rec-library.json")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be merged without writing")
    parser.add_argument("--output", default=LIBRARY_DATA_DIR, help="Output directory")
    parser.add_argument("--include-third-party", action="store_true", help="Also write third-party-library.json")
    args = parser.parse_args()

    # ── Load existing rec-library.json ──
    rec_path = os.path.join(LIBRARY_DATA_DIR, "rec-library.json")
    print(f"Loading {rec_path}...")
    with open(rec_path) as f:
        rec = json.load(f)

    existing_ds = {ds["name"] for ds in rec["devicesets"]}
    existing_fp = {fp["name"] for fp in rec["footprints"]}
    existing_sym = {sym["name"] for sym in rec["symbols"]}
    print(f"  Existing: {len(existing_ds)} devicesets, {len(existing_fp)} footprints, {len(existing_sym)} symbols")

    # ── Load harvested library ──
    harvest_path = os.path.join(HARVEST_DIR, "harvested-library.json")
    print(f"Loading {harvest_path}...")
    with open(harvest_path) as f:
        harvested = json.load(f)

    # ── Load gap analysis for missing list ──
    gap_path = os.path.join(HARVEST_DIR, "harvest-gap-analysis.json")
    with open(gap_path) as f:
        gap = json.load(f)
    missing_names = set(gap["missing_from_rec_library"])
    print(f"  Missing devicesets to merge: {len(missing_names)}")

    # ── Build lookup: for each missing deviceset, find best source ──
    # Collect all candidates with their library priority
    candidates = {}  # ds_name -> (priority, lib_name, ds_data)
    for lib_name, lib_data in harvested["libraries"].items():
        if not is_rec_library(lib_name):
            continue
        priority = get_lib_priority(lib_name)
        for ds in lib_data.get("devicesets", []):
            if ds["name"] in missing_names:
                existing_priority = candidates.get(ds["name"], (999,))[0]
                if priority < existing_priority:
                    candidates[ds["name"]] = (priority, lib_name, ds)

    print(f"  Found candidates for {len(candidates)} of {len(missing_names)} missing devicesets")

    # ── Also check non-REC libraries for remaining missing ──
    still_missing = missing_names - set(candidates.keys())
    if still_missing:
        for lib_name, lib_data in harvested["libraries"].items():
            for ds in lib_data.get("devicesets", []):
                if ds["name"] in still_missing and ds["name"] not in candidates:
                    candidates[ds["name"]] = (600, lib_name, ds)
        found_extra = len(candidates) - (len(missing_names) - len(still_missing))
        if found_extra:
            print(f"  Found {found_extra} more in non-REC libraries")

    unfound = missing_names - set(candidates.keys())
    if unfound:
        print(f"  WARNING: {len(unfound)} devicesets not found in any library:")
        for name in sorted(unfound)[:10]:
            print(f"    - {name}")

    # ── Build footprint and symbol lookup across ALL harvested libs ──
    all_footprints = {}  # name -> (priority, fp_data)
    all_symbols = {}     # name -> (priority, sym_data)
    for lib_name, lib_data in harvested["libraries"].items():
        priority = get_lib_priority(lib_name)
        for fp in lib_data.get("footprints", []):
            existing_p = all_footprints.get(fp["name"], (999,))[0]
            if priority < existing_p:
                all_footprints[fp["name"]] = (priority, fp)
        for sym in lib_data.get("symbols", []):
            existing_p = all_symbols.get(sym["name"], (999,))[0]
            if priority < existing_p:
                all_symbols[sym["name"]] = (priority, sym)

    # ── Determine needed footprints and symbols ──
    needed_fp = set()
    needed_sym = set()
    for ds_name, (_, _, ds) in candidates.items():
        for dev in ds.get("devices", []):
            fp_name = dev.get("footprint", "")
            if fp_name and fp_name not in existing_fp:
                needed_fp.add(fp_name)
        for gate in ds.get("gates", []):
            sym_name = gate.get("symbol", "")
            if sym_name and sym_name not in existing_sym:
                needed_sym.add(sym_name)

    print(f"\n=== MERGE PLAN ===")
    print(f"  Devicesets to add:  {len(candidates)}")
    print(f"  Footprints to add:  {len(needed_fp)}")
    print(f"  Symbols to add:     {len(needed_sym)}")

    # Check for missing dependencies
    missing_fp = needed_fp - set(all_footprints.keys())
    missing_sym = needed_sym - set(all_symbols.keys())
    if missing_fp:
        print(f"  WARNING: {len(missing_fp)} footprints not found in harvest:")
        for name in sorted(missing_fp)[:5]:
            print(f"    - {name}")
    if missing_sym:
        print(f"  WARNING: {len(missing_sym)} symbols not found in harvest:")
        for name in sorted(missing_sym)[:5]:
            print(f"    - {name}")

    if args.dry_run:
        print("\n--- DRY RUN: No files written ---")
        print("\nDevicesets by source library:")
        by_lib = {}
        for ds_name, (_, lib_name, _) in sorted(candidates.items()):
            by_lib.setdefault(lib_name, []).append(ds_name)
        for lib_name, names in sorted(by_lib.items()):
            print(f"  {lib_name or '(embedded)'}: {len(names)} devicesets")
        return

    # ── Convert and merge ──
    print("\nConverting formats...")
    new_footprints = []
    for fp_name in sorted(needed_fp):
        if fp_name in all_footprints:
            _, fp_data = all_footprints[fp_name]
            new_footprints.append(convert_footprint(fp_data))

    new_symbols = []
    for sym_name in sorted(needed_sym):
        if sym_name in all_symbols:
            _, sym_data = all_symbols[sym_name]
            new_symbols.append(convert_symbol(sym_data))

    new_devicesets = []
    source_log = {}
    for ds_name in sorted(candidates.keys()):
        _, lib_name, ds_data = candidates[ds_name]
        new_devicesets.append(convert_deviceset(ds_data))
        source_log[ds_name] = lib_name or "(embedded)"

    # ── Write merged rec-library.json ──
    rec["footprints"].extend(new_footprints)
    rec["symbols"].extend(new_symbols)
    rec["devicesets"].extend(new_devicesets)
    rec["export_timestamp"] = int(time.time())

    output_path = os.path.join(args.output, "rec-library.json")
    print(f"\nWriting {output_path}...")
    print(f"  Total: {len(rec['devicesets'])} devicesets, {len(rec['footprints'])} footprints, {len(rec['symbols'])} symbols")
    with open(output_path, "w") as f:
        json.dump(rec, f, separators=(",", ":"))
    size_mb = os.path.getsize(output_path) / 1024 / 1024
    print(f"  File size: {size_mb:.1f} MB")

    # ── Write merge log ──
    log_path = os.path.join(HARVEST_DIR, "merge-log.json")
    merge_log = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "devicesets_added": len(new_devicesets),
        "footprints_added": len(new_footprints),
        "symbols_added": len(new_symbols),
        "missing_footprints": sorted(missing_fp),
        "missing_symbols": sorted(missing_sym),
        "unfound_devicesets": sorted(unfound),
        "sources": source_log,
    }
    with open(log_path, "w") as f:
        json.dump(merge_log, f, indent=2)
    print(f"Merge log: {log_path}")

    # ── Third-party library (optional) ──
    if args.include_third_party:
        print("\nBuilding third-party library...")
        tp_lib = {
            "format_version": 2,
            "export_timestamp": int(time.time()),
            "library_name": "third-party-harvested",
            "library_headline": "Third-party components harvested from Fusion 360 designs",
            "library_description": "",
            "footprints": [],
            "symbols": [],
            "devicesets": [],
        }
        tp_ds_names = set()
        tp_fp_names = set()
        tp_sym_names = set()
        for lib_name, lib_data in harvested["libraries"].items():
            if is_rec_library(lib_name):
                continue
            for ds in lib_data.get("devicesets", []):
                if ds["name"] not in existing_ds and ds["name"] not in tp_ds_names:
                    tp_lib["devicesets"].append(convert_deviceset(ds))
                    tp_ds_names.add(ds["name"])
                    for dev in ds.get("devices", []):
                        tp_fp_names.add(dev.get("footprint", ""))
                    for gate in ds.get("gates", []):
                        tp_sym_names.add(gate.get("symbol", ""))

        for lib_name, lib_data in harvested["libraries"].items():
            for fp in lib_data.get("footprints", []):
                if fp["name"] in tp_fp_names and fp["name"] not in existing_fp:
                    tp_lib["footprints"].append(convert_footprint(fp))
                    tp_fp_names.discard(fp["name"])  # only add once
            for sym in lib_data.get("symbols", []):
                if sym["name"] in tp_sym_names and sym["name"] not in existing_sym:
                    tp_lib["symbols"].append(convert_symbol(sym))
                    tp_sym_names.discard(sym["name"])

        tp_path = os.path.join(args.output, "third-party-library.json")
        print(f"Writing {tp_path}...")
        print(f"  {len(tp_lib['devicesets'])} devicesets, {len(tp_lib['footprints'])} footprints, {len(tp_lib['symbols'])} symbols")
        with open(tp_path, "w") as f:
            json.dump(tp_lib, f, separators=(",", ":"))
        tp_size = os.path.getsize(tp_path) / 1024 / 1024
        print(f"  File size: {tp_size:.1f} MB")

    # ── Scraped documents tracker ──
    print("\nBuilding scraped documents tracker...")
    state_path = os.path.join(HARVEST_DIR, "harvest_state.json")
    with open(state_path) as f:
        state = json.load(f)

    tracker = {
        "format_version": 1,
        "last_scan": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "hubs": {},
        "files": [],
        "stats": {
            "total_files": 0,
            "schematics": 0,
            "boards": 0,
            "libraries": 0,
            "models_3d": 0,
        }
    }

    for hub_name, hub_data in state.items():
        if not isinstance(hub_data, dict):
            continue
        for project_name, project_data in hub_data.items():
            if not isinstance(project_data, dict):
                continue
            for file_key, file_info in project_data.items():
                if not isinstance(file_info, dict):
                    continue
                file_type = file_info.get("type", "unknown")
                entry = {
                    "hub": hub_name,
                    "project": project_name,
                    "file_id": file_key,
                    "name": file_info.get("name", ""),
                    "type": file_type,
                    "version": file_info.get("version", ""),
                    "processed": file_info.get("processed", False),
                    "timestamp": file_info.get("timestamp", ""),
                }
                tracker["files"].append(entry)
                tracker["stats"]["total_files"] += 1
                if file_type == "fsch":
                    tracker["stats"]["schematics"] += 1
                elif file_type == "fbrd":
                    tracker["stats"]["boards"] += 1
                elif file_type == "fusionlbr":
                    tracker["stats"]["libraries"] += 1
                elif file_type == "fusion360":
                    tracker["stats"]["models_3d"] += 1

    tracker_path = os.path.join(HARVEST_DIR, "scraped-documents.json")
    with open(tracker_path, "w") as f:
        json.dump(tracker, f, indent=2)
    print(f"Tracker: {tracker_path}")
    print(f"  {tracker['stats']['total_files']} files tracked")
    print(f"  {tracker['stats']['schematics']} schematics, {tracker['stats']['boards']} boards")
    print(f"  {tracker['stats']['libraries']} libraries, {tracker['stats']['models_3d']} 3D models")

    print("\nDone!")


if __name__ == "__main__":
    main()
