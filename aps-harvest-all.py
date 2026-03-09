#!/usr/bin/env python3
"""Comprehensive Fusion 360 Hub Scraper — Extract ALL library data.

Walks every project in every hub, downloads .fsch/.fbrd/.fusionlbr files,
and extracts complete component library data (footprints, symbols,
devicesets, pin mappings) from the embedded EAGLE XML.

Produces:
  - harvested-library.json: All discovered components merged
  - harvest-provenance.json: Which designs use which components
  - harvest-gap-analysis.json: Components missing from rec-library.json
  - harvest-models-catalog.json: 3D model file inventory
  - harvest-manifest.json: Run metadata

Usage:
    python3 aps-harvest-all.py [output_dir]
        --all                Scan all hubs (default)
        --hub NAME           Scan specific hub
        --project NAME       Scan specific project (requires --hub)
        --list-only          Just catalog files, no download
        --skip-boards        Skip .fbrd (schematics have richer data)
        --skip-models        Skip .fusion360 cataloging
        --resume             Skip already-processed items
"""

import argparse
import importlib.util
import json
import os
import sys
import time

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env manually (no python-dotenv dependency)
_env_path = os.path.join(SCRIPT_DIR, ".env")
if os.path.exists(_env_path):
    with open(_env_path) as _f:
        for _line in _f:
            _line = _line.strip()
            if _line and not _line.startswith("#") and "=" in _line:
                _k, _v = _line.split("=", 1)
                os.environ.setdefault(_k.strip(), _v.strip())

# Import shared functions from aps-export.py
_spec = importlib.util.spec_from_file_location(
    "aps_export", os.path.join(SCRIPT_DIR, "aps-export.py"))
_aps = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_aps)

get_access_token = _aps.get_access_token
list_hubs = _aps.list_hubs
list_projects = _aps.list_projects
list_top_folders = _aps.list_top_folders
list_folder_contents = _aps.list_folder_contents
aps_get = _aps.aps_get
download_item = _aps.download_item

from fusion_parsers import (
    extract_eagle_xml,
    extract_library_data,
    extract_board_library_data,
    extract_fusionlbr_data,
    load_rec_library,
    strip_html,
)


# ── File Type Detection ──────────────────────────────────────────

MIME_MAP = {
    "application/vnd.autodesk.fusionsch": "fsch",
    "application/vnd.autodesk.fusionbrd": "fbrd",
    "application/vnd.autodesk.fusionlbr": "fusionlbr",
    "application/vnd.autodesk.fusion360": "fusion360",
    "application/vnd.autodesk.fusionprj": "fusionprj",
}

EXT_MAP = {
    ".fsch": "fsch",
    ".fbrd": "fbrd",
    ".fusionlbr": "fusionlbr",
    ".lbr": "fusionlbr",
    ".f3d": "fusion360",
    ".fusion360": "fusion360",
    ".step": "step",
    ".stp": "step",
}

TARGET_TYPES = {"fsch", "fbrd", "fusionlbr", "fusion360"}


def classify_file(display_name, filename, mime_type):
    """Classify a file by its type."""
    # Try MIME first
    ftype = MIME_MAP.get(mime_type)
    if ftype:
        return ftype

    # Try filename extension
    for ext, ft in EXT_MAP.items():
        if filename.endswith(ext) or display_name.endswith(ext):
            return ft

    return None


# ── Recursive Scanner ────────────────────────────────────────────

def scan_folder_recursive(access_token, project_id, folder_id,
                          folder_path="", depth=0, skip_models=False):
    """Recursively scan a folder tree and classify all files.

    Returns list of file entries with id, name, type, path.
    """
    results = []

    try:
        items, version_map = list_folder_contents(
            access_token, project_id, folder_id)
    except Exception as e:
        print("  {}Warning: Could not list {}: {}".format("  " * depth, folder_path, e))
        return results

    for entry in items:
        if entry["type"] == "folders":
            sub_path = "{}/{}".format(folder_path, entry["name"])
            results.extend(scan_folder_recursive(
                access_token, project_id, entry["id"],
                sub_path, depth + 1, skip_models))

        elif entry["type"] == "items":
            item_id = entry["id"]
            display_name = entry["name"]
            ver_info = version_map.get(item_id, {})
            filename = ver_info.get("filename", "")
            mime = ver_info.get("mimeType", "")

            ftype = classify_file(display_name, filename, mime)

            if ftype and ftype in TARGET_TYPES:
                if skip_models and ftype == "fusion360":
                    continue
                results.append({
                    "id": item_id,
                    "name": display_name,
                    "filename": filename,
                    "mime": mime,
                    "type": ftype,
                    "path": folder_path,
                })

    # Throttle to stay under API rate limits
    time.sleep(0.15)

    return results


# ── Library Merging ──────────────────────────────────────────────

class LibraryMerger:
    """Accumulates library data from multiple sources and merges."""

    def __init__(self):
        self.footprints = {}     # (lib_name, fp_name) -> footprint data
        self.symbols = {}        # (lib_name, sym_name) -> symbol data
        self.devicesets = {}     # (lib_name, ds_name) -> deviceset data
        self.provenance = {}     # (lib_name, ds_name) -> [sources]
        self.models_catalog = [] # 3D model entries

    def add_library(self, lib_name, lib_data, source):
        """Merge library data from a single source."""
        for fp in lib_data.get("footprints", []):
            key = (lib_name, fp["name"])
            if key not in self.footprints:
                self.footprints[key] = fp

        for sym in lib_data.get("symbols", []):
            key = (lib_name, sym["name"])
            if key not in self.symbols:
                self.symbols[key] = sym

        for ds in lib_data.get("devicesets", []):
            key = (lib_name, ds["name"])
            if key not in self.devicesets:
                self.devicesets[key] = ds
            # Track provenance
            if key not in self.provenance:
                self.provenance[key] = []
            self.provenance[key].append(source)

    def add_model(self, entry):
        """Add a 3D model catalog entry."""
        self.models_catalog.append(entry)

    def get_summary(self):
        """Return merge statistics."""
        lib_names = set()
        for lib_name, _ in self.devicesets.keys():
            lib_names.add(lib_name)

        return {
            "total_footprints": len(self.footprints),
            "total_symbols": len(self.symbols),
            "total_devicesets": len(self.devicesets),
            "total_libraries": len(lib_names),
            "library_names": sorted(lib_names),
            "total_3d_models": len(self.models_catalog),
        }

    def export_library(self):
        """Export merged library as JSON-serializable dict."""
        # Group by library name
        libraries = {}
        for (lib_name, ds_name), ds_data in sorted(self.devicesets.items()):
            if lib_name not in libraries:
                libraries[lib_name] = {
                    "footprints": [],
                    "symbols": [],
                    "devicesets": [],
                }
            libraries[lib_name]["devicesets"].append(ds_data)

        for (lib_name, fp_name), fp_data in sorted(self.footprints.items()):
            if lib_name not in libraries:
                libraries[lib_name] = {
                    "footprints": [],
                    "symbols": [],
                    "devicesets": [],
                }
            libraries[lib_name]["footprints"].append(fp_data)

        for (lib_name, sym_name), sym_data in sorted(self.symbols.items()):
            if lib_name not in libraries:
                libraries[lib_name] = {
                    "footprints": [],
                    "symbols": [],
                    "devicesets": [],
                }
            libraries[lib_name]["symbols"].append(sym_data)

        return {
            "format_version": 3,
            "harvest_timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "libraries": libraries,
        }

    def export_provenance(self):
        """Export provenance data."""
        result = {}
        for (lib_name, ds_name), sources in sorted(self.provenance.items()):
            key = "{}::{}".format(lib_name, ds_name)
            result[key] = sources
        return result

    def gap_analysis(self, rec_lib):
        """Compare harvested data against rec-library.json."""
        rec_ds_names = set(rec_lib.get("devicesets", {}).keys())

        # Harvested REC devicesets (from libraries starting with "REC")
        harvested_rec = set()
        harvested_other = set()
        for (lib_name, ds_name) in self.devicesets.keys():
            if lib_name.upper().startswith("REC"):
                harvested_rec.add(ds_name.upper())
            else:
                harvested_other.add("{}::{}".format(lib_name, ds_name))

        missing_from_rec = sorted(harvested_rec - rec_ds_names)
        unused_in_rec = sorted(rec_ds_names - harvested_rec)

        return {
            "rec_library_devicesets": len(rec_ds_names),
            "harvested_rec_devicesets": len(harvested_rec),
            "harvested_third_party_devicesets": len(harvested_other),
            "missing_from_rec_library": missing_from_rec,
            "missing_count": len(missing_from_rec),
            "unused_in_rec_library": unused_in_rec,
            "unused_count": len(unused_in_rec),
            "third_party_components": sorted(harvested_other),
        }


# ── State Management ─────────────────────────────────────────────

def load_state(output_dir):
    """Load harvest state for resume support."""
    path = os.path.join(output_dir, "harvest_state.json")
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return {"processed": []}


def save_state(output_dir, state):
    """Save harvest state."""
    path = os.path.join(output_dir, "harvest_state.json")
    with open(path, "w") as f:
        json.dump(state, f, indent=2)


# ── Main Pipeline ────────────────────────────────────────────────

def process_schematic(access_token, project_id, item, merger, source_label):
    """Download and extract library data from a schematic."""
    raw = download_item(access_token, project_id, item["id"])
    if not raw:
        return False

    xml_str = extract_eagle_xml(raw, ".sch")
    if not xml_str:
        return False

    libs = extract_library_data(xml_str)
    for lib_name, lib_data in libs.items():
        merger.add_library(lib_name, lib_data, source_label)

    ds_count = sum(len(ld["devicesets"]) for ld in libs.values())
    fp_count = sum(len(ld["footprints"]) for ld in libs.values())
    print("    {} libs, {} devicesets, {} footprints".format(
        len(libs), ds_count, fp_count))
    return True


def process_board(access_token, project_id, item, merger, source_label):
    """Download and extract library data from a board."""
    raw = download_item(access_token, project_id, item["id"])
    if not raw:
        return False

    xml_str = extract_eagle_xml(raw, ".brd")
    if not xml_str:
        return False

    libs = extract_board_library_data(xml_str)
    for lib_name, lib_data in libs.items():
        merger.add_library(lib_name, lib_data, source_label)

    fp_count = sum(len(ld["footprints"]) for ld in libs.values())
    print("    {} libs, {} footprints".format(len(libs), fp_count))
    return True


def process_library(access_token, project_id, item, merger, source_label):
    """Download and extract data from a .fusionlbr file."""
    raw = download_item(access_token, project_id, item["id"])
    if not raw:
        return False

    libs = extract_fusionlbr_data(raw)
    for lib_name, lib_data in libs.items():
        merger.add_library(lib_name, lib_data, source_label)

    ds_count = sum(len(ld["devicesets"]) for ld in libs.values())
    print("    {} devicesets".format(ds_count))
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Comprehensive Fusion 360 hub scraper")
    parser.add_argument(
        "output_dir", nargs="?", default=None,
        help="Output directory (default: ./harvest-output/)")
    parser.add_argument("--hub", default=None)
    parser.add_argument("--project", default=None)
    parser.add_argument("--list-only", action="store_true")
    parser.add_argument("--skip-boards", action="store_true")
    parser.add_argument("--skip-models", action="store_true")
    parser.add_argument("--resume", action="store_true")
    args = parser.parse_args()

    client_id = os.environ.get("APS_CLIENT_ID", "")
    client_secret = os.environ.get("APS_CLIENT_SECRET", "")
    if not client_id or not client_secret:
        print("ERROR: APS_CLIENT_ID and APS_CLIENT_SECRET required")
        print("Create .env in {} with these values".format(SCRIPT_DIR))
        sys.exit(1)

    output_dir = args.output_dir or os.path.join(os.getcwd(), "harvest-output")
    os.makedirs(output_dir, exist_ok=True)

    # Authenticate
    print("=== APS Comprehensive Harvest ===")
    print()
    access_token = get_access_token(client_id, client_secret)

    # Select hubs
    hubs = list_hubs(access_token)
    if args.hub:
        hubs = [h for h in hubs if args.hub.lower() in h["name"].lower()]
        if not hubs:
            print("ERROR: No hub matching '{}'".format(args.hub))
            sys.exit(1)

    # Resume state
    state = load_state(output_dir) if args.resume else {"processed": []}
    processed_set = set(state["processed"])

    # Stats
    stats = {
        "hubs_scanned": 0,
        "projects_scanned": 0,
        "files_found": {"fsch": 0, "fbrd": 0, "fusionlbr": 0, "fusion360": 0},
        "files_processed": 0,
        "files_skipped": 0,
        "errors": 0,
        "start_time": time.time(),
    }

    merger = LibraryMerger()

    # Main loop: hubs -> projects -> folders -> files
    for hub in hubs:
        print("Hub: {}".format(hub["name"]))
        stats["hubs_scanned"] += 1

        projects = list_projects(access_token, hub["id"])
        if args.project:
            projects = [p for p in projects
                        if args.project.lower() in p["name"].lower()]

        print("  {} projects to scan".format(len(projects)))
        print()

        for proj in projects:
            proj_label = "{}/{}".format(hub["name"], proj["name"])
            print("Project: {}".format(proj["name"]))
            stats["projects_scanned"] += 1

            # Scan all folders
            top_folders = list_top_folders(access_token, hub["id"], proj["id"])
            all_files = []
            for folder in top_folders:
                files = scan_folder_recursive(
                    access_token, proj["id"], folder["id"],
                    folder["name"], skip_models=args.skip_models)
                all_files.extend(files)

            # Count by type
            type_counts = {}
            for f in all_files:
                type_counts[f["type"]] = type_counts.get(f["type"], 0) + 1
                stats["files_found"][f["type"]] = stats["files_found"].get(f["type"], 0) + 1

            count_str = ", ".join("{} {}".format(v, k)
                                  for k, v in sorted(type_counts.items()))
            print("  Found: {}".format(count_str or "nothing"))

            if args.list_only:
                for f in all_files:
                    print("    [{}] {} ({})".format(f["type"], f["name"], f["path"]))
                print()
                continue

            # Process files
            for f in all_files:
                item_key = f["id"]
                if item_key in processed_set:
                    stats["files_skipped"] += 1
                    continue

                source = "{}/{} ({})".format(proj_label, f["name"], f["path"])

                if f["type"] == "fsch":
                    print("  SCH: {} ...".format(f["name"]))
                    try:
                        ok = process_schematic(
                            access_token, proj["id"], f, merger, source)
                        if ok:
                            stats["files_processed"] += 1
                        else:
                            stats["errors"] += 1
                            print("    FAILED")
                    except Exception as e:
                        stats["errors"] += 1
                        print("    ERROR: {}".format(e))

                elif f["type"] == "fbrd" and not args.skip_boards:
                    print("  BRD: {} ...".format(f["name"]))
                    try:
                        ok = process_board(
                            access_token, proj["id"], f, merger, source)
                        if ok:
                            stats["files_processed"] += 1
                        else:
                            stats["errors"] += 1
                    except Exception as e:
                        stats["errors"] += 1
                        print("    ERROR: {}".format(e))

                elif f["type"] == "fusionlbr":
                    print("  LBR: {} ...".format(f["name"]))
                    try:
                        ok = process_library(
                            access_token, proj["id"], f, merger, source)
                        if ok:
                            stats["files_processed"] += 1
                        else:
                            stats["errors"] += 1
                    except Exception as e:
                        stats["errors"] += 1
                        print("    ERROR: {}".format(e))

                elif f["type"] == "fusion360":
                    merger.add_model({
                        "name": f["name"],
                        "path": f["path"],
                        "project": proj["name"],
                        "hub": hub["name"],
                        "item_id": f["id"],
                    })

                # Mark as processed
                processed_set.add(item_key)
                state["processed"] = list(processed_set)

                # Periodic state save
                if stats["files_processed"] % 10 == 0:
                    save_state(output_dir, state)

            print()

    if args.list_only:
        print("List-only mode — no files downloaded.")
        return

    # Save final state
    save_state(output_dir, state)

    # Export results
    print("=" * 50)
    print("Exporting results...")
    print()

    summary = merger.get_summary()
    print("Harvested:")
    print("  {} footprints".format(summary["total_footprints"]))
    print("  {} symbols".format(summary["total_symbols"]))
    print("  {} devicesets".format(summary["total_devicesets"]))
    print("  {} libraries".format(summary["total_libraries"]))
    print("  {} 3D models cataloged".format(summary["total_3d_models"]))
    print()

    # Write harvested library
    lib_path = os.path.join(output_dir, "harvested-library.json")
    with open(lib_path, "w") as f:
        json.dump(merger.export_library(), f, indent=2)
    print("Library: {}".format(lib_path))

    # Write provenance
    prov_path = os.path.join(output_dir, "harvest-provenance.json")
    with open(prov_path, "w") as f:
        json.dump(merger.export_provenance(), f, indent=2)
    print("Provenance: {}".format(prov_path))

    # Write gap analysis
    rec_lib = load_rec_library()
    gap = merger.gap_analysis(rec_lib)
    gap_path = os.path.join(output_dir, "harvest-gap-analysis.json")
    with open(gap_path, "w") as f:
        json.dump(gap, f, indent=2)
    print("Gap analysis: {}".format(gap_path))
    print("  {} REC devicesets missing from library".format(gap["missing_count"]))
    print("  {} third-party components found".format(
        len(gap["third_party_components"])))

    # Write 3D models catalog
    if merger.models_catalog:
        models_path = os.path.join(output_dir, "harvest-models-catalog.json")
        with open(models_path, "w") as f:
            json.dump(merger.models_catalog, f, indent=2)
        print("3D models: {}".format(models_path))

    # Write manifest
    stats["end_time"] = time.time()
    stats["duration_seconds"] = round(stats["end_time"] - stats["start_time"])
    manifest = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "stats": stats,
        "summary": summary,
        "gap_summary": {
            "rec_library_devicesets": gap["rec_library_devicesets"],
            "missing_from_rec": gap["missing_count"],
            "third_party": len(gap["third_party_components"]),
        },
    }
    manifest_path = os.path.join(output_dir, "harvest-manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    print("Manifest: {}".format(manifest_path))

    print()
    print("Done! {} files processed, {} errors, {}s elapsed".format(
        stats["files_processed"], stats["errors"], stats["duration_seconds"]))


if __name__ == "__main__":
    main()
