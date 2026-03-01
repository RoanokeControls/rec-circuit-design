# Fusion 360 Script: Batch Export Electronics Designs
#
# Run from: Utilities → Scripts and Add-Ins → Scripts → BatchExportDesigns → Run
#
# Opens every Electronics design in a cloud project folder,
# runs export-schematic.ulp and export-board.ulp on each,
# generates master.json with REC library cross-references,
# and closes without saving. Completely non-destructive / read-only.

import adsk.core
import adsk.fusion
import os
import json
import time
import traceback

SCRIPT_NAME = "BatchExportDesigns"

# ULP scripts location — rec-circuit-design/ulp-scripts/
ULP_DIR = os.path.normpath(os.path.join(
    os.path.expanduser("~/development/rec-circuit-design"),
    "ulp-scripts"
))


def get_ulp_path(ulp_name):
    """Resolve the full path to a ULP script."""
    path = os.path.join(ULP_DIR, ulp_name)
    if os.path.exists(path):
        return path
    return None


def run_ulp_on_active_document(ulp_path, output_dir):
    """Execute a ULP script on the currently active Electronics document."""
    app = adsk.core.Application.get()
    cmd = 'RUN "{}";"{}"'.format(ulp_path.replace("\\", "/"),
                                  output_dir.replace("\\", "/"))
    app.executeTextCommand(cmd)
    return True


def collect_electronics_files(folder, files_list):
    """Recursively collect all data files from a project folder."""
    try:
        for file_idx in range(folder.dataFiles.count):
            data_file = folder.dataFiles.item(file_idx)
            files_list.append(data_file)
    except Exception:
        pass
    try:
        for folder_idx in range(folder.dataFolders.count):
            sub_folder = folder.dataFolders.item(folder_idx)
            collect_electronics_files(sub_folder, files_list)
    except Exception:
        pass


def strip_html(s):
    """Remove HTML tags from a string."""
    result = ""
    in_tag = False
    for ch in s:
        if ch == '<':
            in_tag = True
        elif ch == '>':
            in_tag = False
        elif not in_tag:
            result += ch
    return result.strip()


def match_rec_library(deviceset, value, package, rec_devicesets):
    """Match a part against the REC Standard Library.

    Strategy:
    1. Direct match: deviceset name matches a REC deviceset exactly
    2. Value+package match: search for REC deviceset containing both value and package size
    3. No match: return None
    """
    if not rec_devicesets:
        return None

    ds_upper = deviceset.upper()

    # 1. Direct match
    if ds_upper in rec_devicesets:
        ds = rec_devicesets[ds_upper]
        footprint = ""
        if ds.get("devices"):
            footprint = ds["devices"][0].get("footprint", "")
        headline = ds.get("headline", "") or strip_html(ds.get("description", ""))
        return {
            "deviceset": ds["name"],
            "description": headline,
            "footprint": footprint,
        }

    # 2. Value+package match
    if value and package:
        val_norm = value.upper().replace(" ", "")
        pkg_size = package.upper()
        for prefix in ("C", "R", "L"):
            if pkg_size.startswith(prefix) and len(pkg_size) > 1 and pkg_size[1:].isdigit():
                pkg_size = pkg_size[1:]
                break

        for name, ds in rec_devicesets.items():
            if val_norm in name and pkg_size in name:
                footprint = ""
                if ds.get("devices"):
                    footprint = ds["devices"][0].get("footprint", "")
                headline = ds.get("headline", "") or strip_html(
                    ds.get("description", "")
                )
                return {
                    "deviceset": ds["name"],
                    "description": headline,
                    "footprint": footprint,
                }

    return None


def generate_master_json(output_dir):
    """Generate a unified master.json from all exported design JSONs."""
    # ── Locate REC library ──────────────────────────────────────────
    candidates = [
        os.environ.get("REC_LIBRARY_PATH", ""),
        os.path.expanduser(
            "~/development/autodesk-coder/library-data/rec-library.json"
        ),
    ]
    rec_library_path = ""
    for candidate in candidates:
        if candidate and os.path.exists(candidate):
            rec_library_path = candidate
            break

    rec_devicesets = {}
    rec_library_version = None
    if rec_library_path:
        try:
            with open(rec_library_path, "r") as f:
                rec_data = json.load(f)
            rec_library_version = rec_data.get("library_name", "")
            for ds in rec_data.get("devicesets", []):
                rec_devicesets[ds["name"].upper()] = ds
        except Exception:
            pass

    # ── Discover exported JSONs ─────────────────────────────────────
    schematic_files = {}
    board_files = {}

    for fname in os.listdir(output_dir):
        if fname == "master.json" or fname == "export_manifest.json":
            continue
        if fname.endswith("_schematic.json"):
            design_key = fname[: -len("_schematic.json")]
            schematic_files[design_key] = os.path.join(output_dir, fname)
        elif fname.endswith("_board.json"):
            design_key = fname[: -len("_board.json")]
            board_files[design_key] = os.path.join(output_dir, fname)

    all_designs = sorted(set(list(schematic_files.keys()) + list(board_files.keys())))

    if not all_designs:
        return None

    # ── Process each design ─────────────────────────────────────────
    designs = []

    for design_key in all_designs:
        sch_data = None
        brd_data = None

        if design_key in schematic_files:
            try:
                with open(schematic_files[design_key], "r") as f:
                    sch_data = json.load(f)
            except Exception:
                pass

        if design_key in board_files:
            try:
                with open(board_files[design_key], "r") as f:
                    brd_data = json.load(f)
            except Exception:
                pass

        design_name = design_key
        if sch_data:
            design_name = sch_data.get("design_name", design_key)
        elif brd_data:
            design_name = brd_data.get("design_name", design_key)

        # ── Board summary ───────────────────────────────────────────
        board_summary = None
        board_elements = {}
        net_names = []

        if brd_data:
            area = brd_data.get("area", {})
            width = round(area.get("x2", 0) - area.get("x1", 0), 2)
            height = round(area.get("y2", 0) - area.get("y1", 0), 2)

            layers = brd_data.get("layers", [])
            layer_count = sum(
                1 for ly in layers if 1 <= ly.get("number", 0) <= 16
            )

            signals = brd_data.get("signals", [])
            net_count = len(signals)
            net_names = [s.get("name", "") for s in signals]

            holes = brd_data.get("holes", [])
            hole_count = len(holes)

            board_summary = {
                "width_mm": width,
                "height_mm": height,
                "layer_count": layer_count,
                "net_count": net_count,
                "hole_count": hole_count,
            }

            for elem in brd_data.get("elements", []):
                board_elements[elem.get("name", "")] = elem

        # ── Parts ───────────────────────────────────────────────────
        parts = []
        smd_count = 0
        th_count = 0
        rec_match_count = 0

        if sch_data:
            for part in sch_data.get("parts", []):
                ref = part.get("name", "")
                value = part.get("value", "")
                deviceset = part.get("deviceset", "")
                package = part.get("package", "")
                library = part.get("library", "")

                board_elem = board_elements.get(ref, {})
                is_smd = bool(board_elem.get("smd", 0))

                if is_smd:
                    smd_count += 1
                elif board_elem:
                    th_count += 1

                position = None
                if board_elem:
                    position = {
                        "x": board_elem.get("x", 0.0),
                        "y": board_elem.get("y", 0.0),
                        "angle": board_elem.get("angle", 0.0),
                        "mirror": bool(board_elem.get("mirror", 0)),
                    }

                rec_match = match_rec_library(
                    deviceset, value, package, rec_devicesets
                )
                if rec_match:
                    rec_match_count += 1

                part_entry = {
                    "ref": ref,
                    "value": value,
                    "deviceset": deviceset,
                    "package": package,
                    "library": library,
                    "smd": is_smd,
                }
                if position:
                    part_entry["position"] = position
                part_entry["rec_match"] = rec_match

                parts.append(part_entry)

        total_parts = len(parts)

        design_entry = {
            "design_name": design_name,
            "schematic_file": (
                os.path.basename(schematic_files[design_key])
                if design_key in schematic_files
                else None
            ),
            "board_file": (
                os.path.basename(board_files[design_key])
                if design_key in board_files
                else None
            ),
        }

        if board_summary:
            design_entry["board"] = board_summary

        design_entry["parts_summary"] = {
            "total": total_parts,
            "smd": smd_count,
            "through_hole": th_count,
            "rec_library_matches": rec_match_count,
            "non_rec_parts": total_parts - rec_match_count,
        }
        design_entry["parts"] = parts
        if net_names:
            design_entry["nets"] = net_names

        designs.append(design_entry)

    # ── Derive library version string ───────────────────────────────
    version_str = None
    if rec_library_version:
        basename = os.path.basename(rec_library_version)
        if basename.endswith(".lbr"):
            version_str = basename[:-4]
        else:
            version_str = basename

    # ── Write master.json ───────────────────────────────────────────
    master = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "rec_library_version": version_str,
        "designs": designs,
    }

    master_path = os.path.join(output_dir, "master.json")
    with open(master_path, "w") as f:
        json.dump(master, f, indent=2)

    return master_path


def run(context):
    """Entry point — called when the script is run."""
    app = adsk.core.Application.get()
    ui = app.userInterface

    try:
        # ── Get output directory from user ─────────────────────────
        folder_dlg = ui.createFolderDialog()
        folder_dlg.title = "Select Output Directory for JSON Exports"
        result = folder_dlg.showDialog()
        if result != adsk.core.DialogResults.DialogOK:
            return
        output_dir = folder_dlg.folder

        # ── Locate ULP scripts ─────────────────────────────────────
        schematic_ulp = get_ulp_path("export-schematic.ulp")
        board_ulp = get_ulp_path("export-board.ulp")

        if not schematic_ulp or not board_ulp:
            ui.messageBox(
                "Could not find ULP scripts.\n\n"
                "Expected location:\n{}\n\n"
                "Ensure export-schematic.ulp and export-board.ulp exist.".format(
                    ULP_DIR
                ),
                SCRIPT_NAME,
                adsk.core.MessageBoxButtonTypes.OKButtonType,
                adsk.core.MessageBoxIconTypes.CriticalIconType,
            )
            return

        # ── Collect all data files from active project ─────────────
        active_project = app.data.activeProject
        if not active_project:
            ui.messageBox(
                "No active project. Please open a project first.",
                SCRIPT_NAME,
            )
            return

        all_files = []
        collect_electronics_files(active_project.rootFolder, all_files)

        if not all_files:
            ui.messageBox(
                "No files found in project '{}'.".format(active_project.name),
                SCRIPT_NAME,
            )
            return

        # ── Confirmation ───────────────────────────────────────────
        confirm = ui.messageBox(
            "Batch Export — Read-Only Operation\n\n"
            "Project: {}\n"
            "Files found: {}\n"
            "Output: {}\n\n"
            "This will open each Electronics design, export data to JSON, "
            "and close WITHOUT saving. No designs will be modified.\n\n"
            "Continue?".format(
                active_project.name, len(all_files), output_dir
            ),
            SCRIPT_NAME,
            adsk.core.MessageBoxButtonTypes.YesNoButtonType,
            adsk.core.MessageBoxIconTypes.QuestionIconType,
        )
        if confirm != adsk.core.DialogResults.DialogYes:
            return

        # ── Process each file ──────────────────────────────────────
        progress = ui.createProgressDialog()
        progress.cancelButtonText = "Cancel"
        progress.isBackgroundTranslucent = False
        progress.isCancelButtonShown = True
        progress.show(SCRIPT_NAME, "Exporting designs...", 0, len(all_files), 0)

        manifest = {
            "project": active_project.name,
            "output_directory": output_dir,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "exports": [],
            "skipped": [],
            "errors": [],
        }

        exported_count = 0
        error_count = 0

        for file_idx, data_file in enumerate(all_files):
            if progress.wasCancelled:
                break

            progress.progressValue = file_idx
            progress.message = "Processing: {} ({}/{})".format(
                data_file.name, file_idx + 1, len(all_files)
            )
            adsk.doEvents()

            # Get file extension to check if this is Electronics
            file_ext = ""
            try:
                file_ext = data_file.fileExtension
            except Exception:
                pass

            # Skip non-Electronics files without opening them
            # Electronics: .fsch (schematic), .fbrd (board)
            # Also try opening files with no extension (cloud-only)
            if file_ext and file_ext.lower() not in (
                "fsch", "fbrd", ".fsch", ".fbrd",
                "sch", "brd", ".sch", ".brd",
            ):
                manifest["skipped"].append({
                    "file": data_file.name,
                    "extension": file_ext,
                })
                continue

            doc = None
            try:
                doc = app.documents.open(data_file)
                if not doc:
                    manifest["errors"].append({
                        "file": data_file.name,
                        "error": "Failed to open document",
                    })
                    error_count += 1
                    continue

                doc_type = "unknown"
                try:
                    doc_type = type(doc).__name__
                except Exception:
                    pass

                # If this opened as a FusionDocument (3D), skip it
                if doc_type == "FusionDocument":
                    manifest["skipped"].append({
                        "file": data_file.name,
                        "extension": file_ext,
                        "doc_type": doc_type,
                    })
                    continue

                is_electronics = False
                export_entry = {
                    "file": data_file.name,
                    "extension": file_ext,
                    "doc_type": doc_type,
                    "schematic_exported": False,
                    "board_exported": False,
                    "schematic_error": None,
                    "board_error": None,
                }

                try:
                    run_ulp_on_active_document(schematic_ulp, output_dir)
                    export_entry["schematic_exported"] = True
                    is_electronics = True
                except Exception as e:
                    export_entry["schematic_error"] = str(e)

                try:
                    run_ulp_on_active_document(board_ulp, output_dir)
                    export_entry["board_exported"] = True
                    is_electronics = True
                except Exception as e:
                    export_entry["board_error"] = str(e)

                manifest["exports"].append(export_entry)
                if is_electronics:
                    exported_count += 1

            except Exception as e:
                manifest["errors"].append({
                    "file": data_file.name,
                    "extension": file_ext,
                    "error": str(e),
                    "traceback": traceback.format_exc(),
                })
                error_count += 1

            finally:
                if doc:
                    try:
                        doc.close(False)
                    except Exception:
                        pass

        progress.hide()

        # ── Write manifest ─────────────────────────────────────────
        manifest["summary"] = {
            "total_files_scanned": len(all_files),
            "electronics_exported": exported_count,
            "errors": error_count,
        }

        manifest_path = os.path.join(output_dir, "export_manifest.json")
        with open(manifest_path, "w") as f:
            json.dump(manifest, f, indent=2)

        # ── Generate master JSON with REC cross-references ─────────
        master_path = None
        try:
            master_path = generate_master_json(output_dir)
        except Exception:
            pass

        # ── Done ───────────────────────────────────────────────────
        master_msg = ""
        if master_path:
            master_msg = "\nMaster JSON: {}".format(master_path)

        ui.messageBox(
            "Batch export complete.\n\n"
            "Designs exported: {}\n"
            "Errors: {}\n\n"
            "Output: {}\n"
            "Manifest: {}{}".format(
                exported_count, error_count, output_dir,
                manifest_path, master_msg
            ),
            SCRIPT_NAME,
        )

    except Exception:
        ui.messageBox(
            "Batch export failed:\n\n{}".format(traceback.format_exc()),
            SCRIPT_NAME,
        )
