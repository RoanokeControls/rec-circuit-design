#!/usr/bin/env python3
"""Batch Export Electronics Designs from Fusion 360 Cache.

Extracts EAGLE XML (.sch/.brd) from Fusion 360's local cache of
.fsch/.fbrd files, parses them, and produces JSON exports + master.json
with REC library cross-references.

Runs outside Fusion 360 — no editor interaction needed.

Usage:
    python3 batch-export.py [output_dir] [--cache-dir PATH] [--filter NAME]

If output_dir is omitted, writes to ./export-output/
"""

import argparse
import json
import os
import re
import sys
import time

from fusion_parsers import (
    extract_eagle_xml,
    generate_master_json,
    load_rec_library,
    parse_board,
    parse_schematic,
)

# ── Constants ──────────────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Default Fusion 360 cache location (macOS)
DEFAULT_CACHE_DIR = os.path.expanduser(
    "~/Library/Application Support/Autodesk/"
    "Autodesk Fusion 360"
)


# ── Cache Discovery ───────────────────────────────────────────────

def find_cache_dir(base_dir=None):
    """Find the Fusion 360 file cache directory."""
    if base_dir and os.path.isdir(base_dir):
        # If it already ends with /F, use it directly
        if base_dir.endswith("/F") or base_dir.endswith("\\F"):
            return base_dir
        # Look for the F subdirectory
        for root, dirs, files in os.walk(base_dir):
            if os.path.basename(root) == "F" and "W.login" in root:
                return root
            # Don't recurse too deep
            if root.count(os.sep) - base_dir.count(os.sep) > 3:
                break

    # Auto-discover from default location
    base = DEFAULT_CACHE_DIR
    if not os.path.isdir(base):
        return None

    # Pattern: {base}/{user_id}/W.login/F/
    for user_dir in os.listdir(base):
        candidate = os.path.join(base, user_dir, "W.login", "F")
        if os.path.isdir(candidate):
            return candidate
    return None


def find_electronics_files(cache_dir, name_filter=None):
    """Find all .fsch/.fbrd files in the cache directory.

    Returns dict keyed by design name, with 'fsch' and 'fbrd' paths.
    """
    designs = {}

    for fname in os.listdir(cache_dir):
        # Pattern: _designname.uuid.fsch or _designname.uuid.fbrd
        if not (fname.endswith(".fsch") or fname.endswith(".fbrd")):
            continue

        fpath = os.path.join(cache_dir, fname)
        if not os.path.isfile(fpath):
            continue

        # Extract design name: strip leading _, strip .uuid.ext
        # e.g. "_bme280-breakout.75e5e236-c560-4456-aa0d-efc2fbbad6d5.fsch"
        base = fname
        if base.startswith("_"):
            base = base[1:]

        # Split off extension
        if base.endswith(".fsch"):
            ext = "fsch"
            base = base[:-5]  # remove .fsch
        elif base.endswith(".fbrd"):
            ext = "fbrd"
            base = base[:-5]  # remove .fbrd
        else:
            continue

        # Remove UUID suffix (last .xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
        uuid_pattern = r'\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        design_name = re.sub(uuid_pattern, '', base)

        if name_filter and name_filter.lower() not in design_name.lower():
            continue

        if design_name not in designs:
            designs[design_name] = {"fsch": None, "fbrd": None}

        # Use the most recently modified file if duplicates exist
        existing = designs[design_name][ext]
        if existing is None or os.path.getmtime(fpath) > os.path.getmtime(existing):
            designs[design_name][ext] = fpath

    return designs


# ── Main ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Batch export Fusion 360 Electronics designs from cache")
    parser.add_argument(
        "output_dir", nargs="?", default=None,
        help="Output directory (default: ./export-output/)")
    parser.add_argument(
        "--cache-dir", default=None,
        help="Fusion 360 cache directory (auto-detected if omitted)")
    parser.add_argument(
        "--filter", default=None,
        help="Only export designs matching this name substring")
    args = parser.parse_args()

    output_dir = args.output_dir or os.path.join(os.getcwd(), "export-output")
    os.makedirs(output_dir, exist_ok=True)

    # Find cache
    cache_dir = find_cache_dir(args.cache_dir)
    if not cache_dir:
        print("ERROR: Could not find Fusion 360 cache directory.")
        print("Specify with --cache-dir PATH")
        sys.exit(1)

    print("Cache directory: {}".format(cache_dir))
    print("Output directory: {}".format(output_dir))
    print()

    # Discover electronics files
    designs = find_electronics_files(cache_dir, args.filter)

    if not designs:
        print("No electronics designs found in cache.")
        if args.filter:
            print("(filter: '{}')".format(args.filter))
        sys.exit(1)

    print("Found {} electronics designs:".format(len(designs)))
    for name, files in sorted(designs.items()):
        sch = "sch" if files["fsch"] else "---"
        brd = "brd" if files["fbrd"] else "---"
        print("  {} [{}|{}]".format(name, sch, brd))
    print()

    # Load REC library
    rec_lib = load_rec_library()
    if rec_lib["devicesets"]:
        print("REC library loaded: {} devicesets".format(
            len(rec_lib["devicesets"])))
    else:
        print("REC library not found (skipping cross-references)")
    print()

    # Process each design
    exported = 0
    errors = 0
    manifest = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "cache_directory": cache_dir,
        "output_directory": output_dir,
        "exports": [],
    }

    for design_name in sorted(designs.keys()):
        files = designs[design_name]
        print("Exporting: {} ...".format(design_name))

        export_entry = {
            "design": design_name,
            "schematic_exported": False,
            "board_exported": False,
        }

        # Export schematic
        if files["fsch"]:
            xml = extract_eagle_xml(files["fsch"], ".sch")
            if xml:
                try:
                    sch_data = parse_schematic(xml, design_name)
                    if sch_data:
                        out_path = os.path.join(
                            output_dir,
                            "{}_schematic.json".format(design_name))
                        with open(out_path, "w") as f:
                            json.dump(sch_data, f, indent=2)
                        export_entry["schematic_exported"] = True
                        print("  Schematic: OK ({} parts)".format(
                            len(sch_data.get("parts", []))))
                    else:
                        print("  Schematic: No schematic data found in XML")
                except Exception as e:
                    print("  Schematic: ERROR - {}".format(e))
                    export_entry["schematic_error"] = str(e)
            else:
                print("  Schematic: Could not extract .sch from .fsch")

        # Export board
        if files["fbrd"]:
            xml = extract_eagle_xml(files["fbrd"], ".brd")
            if xml:
                try:
                    brd_data = parse_board(xml, design_name)
                    if brd_data:
                        out_path = os.path.join(
                            output_dir,
                            "{}_board.json".format(design_name))
                        with open(out_path, "w") as f:
                            json.dump(brd_data, f, indent=2)
                        export_entry["board_exported"] = True
                        print("  Board: OK ({} elements, {} signals)".format(
                            len(brd_data.get("elements", [])),
                            len(brd_data.get("signals", []))))
                    else:
                        print("  Board: No board data found in XML")
                except Exception as e:
                    print("  Board: ERROR - {}".format(e))
                    export_entry["board_error"] = str(e)
            else:
                print("  Board: Could not extract .brd from .fbrd")

        manifest["exports"].append(export_entry)

        if export_entry["schematic_exported"] or export_entry["board_exported"]:
            exported += 1
        else:
            errors += 1

    print()

    # Generate master.json
    master_path = None
    if exported > 0:
        try:
            master_path = generate_master_json(output_dir, rec_lib)
            print("Master JSON: {}".format(master_path))
        except Exception as e:
            print("Master JSON generation failed: {}".format(e))

    # Write manifest
    manifest["summary"] = {
        "designs_found": len(designs),
        "designs_exported": exported,
        "errors": errors,
    }
    manifest_path = os.path.join(output_dir, "export_manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print()
    print("Done! {} designs exported, {} errors".format(exported, errors))
    print("Output: {}".format(output_dir))


if __name__ == "__main__":
    main()
