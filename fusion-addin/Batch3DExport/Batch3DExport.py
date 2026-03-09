# Fusion 360 Add-In: Extract 3D Component Models from ALL Projects
#
# Iterates every project across all hubs, opens each design, extracts
# unique component 3D bodies as STEP files, and uploads to the team API.
# Tracks progress in a persistent state file so it can resume across runs.
#
# Flow: Click button → pick output dir → confirm → walks every project,
# opens each design invisibly, exports new components, uploads, moves on.
#
# Install: Copy folder to ~/Library/Application Support/Autodesk/Autodesk Fusion 360/API/AddIns/

import adsk.core
import adsk.fusion
import base64
import gzip
import json
import os
import re
import time
import traceback

try:
    import urllib.request
    import urllib.error
except ImportError:
    pass

_app = None
_ui = None
_handlers = []

ADDIN_NAME = "Batch3DExport"
BUTTON_ID = "batch3dExportButton"

MODELS_API_URL = os.environ.get(
    "REC_3D_MODELS_URL",
    "https://www.roanokecontrols.com/rec-admin/api/3d-models.php")
MODELS_API_KEY = os.environ.get("REC_3D_MODELS_KEY", "rec-3d-models-2026")

# Persistent state directory
STATE_DIR = os.path.join(os.path.expanduser("~"), ".rec-circuit-design")
STATE_FILE = os.path.join(STATE_DIR, "3d-export-state.json")
LOG_FILE = os.path.join(STATE_DIR, "3d-export-log.txt")
GAP_REPORT_FILE = os.path.join(STATE_DIR, "3d-model-coverage.json")

# Library data location (exported from Fusion via ULP)
LIBRARY_DIR = os.path.join(
    os.path.expanduser("~"), "development", "autodesk-coder", "library-data")


# ── State persistence ──────────────────────────────────────────────────

def load_state():
    """Load export state (which designs have been processed)."""
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "processed_designs": {},  # "hub/project/design_name" → timestamp
        "exported_keys": [],      # component keys we've exported
        "stats": {
            "total_designs": 0,
            "total_exported": 0,
            "total_uploaded": 0,
            "total_skipped": 0,
            "total_errors": 0,
        },
    }


def save_state(state):
    """Save export state."""
    if not os.path.exists(STATE_DIR):
        os.makedirs(STATE_DIR)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def log(msg):
    """Append a timestamped line to the log file."""
    if not os.path.exists(STATE_DIR):
        os.makedirs(STATE_DIR)
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    line = "[{}] {}\n".format(ts, msg)
    try:
        with open(LOG_FILE, "a") as f:
            f.write(line)
    except Exception:
        pass


def generate_gap_report(api_keys):
    """Cross-reference library footprints against API models.

    Reads rec-library.json and third-party-library.json, checks each
    footprint against the API model keys, and writes a coverage report
    to ~/.rec-circuit-design/3d-model-coverage.json
    """
    report = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "api_model_count": len(api_keys),
        "libraries": {},
    }

    for lib_file, lib_label in [
        ("rec-library.json", "rec"),
        ("third-party-library.json", "third-party"),
    ]:
        lib_path = os.path.join(LIBRARY_DIR, lib_file)
        if not os.path.exists(lib_path):
            continue

        try:
            with open(lib_path, "r") as f:
                lib = json.load(f)
        except Exception:
            continue

        footprints = []
        for fp in lib.get("footprints", []):
            name = fp.get("name", "")
            if name:
                footprints.append(name)

        have = []
        missing = []
        for name in sorted(footprints):
            k = safe_key(name)
            if k in api_keys or name in api_keys:
                have.append(name)
            else:
                missing.append(name)

        report["libraries"][lib_label] = {
            "total_footprints": len(footprints),
            "have_3d_model": len(have),
            "missing_3d_model": len(missing),
            "coverage_pct": round(100.0 * len(have) / max(len(footprints), 1), 1),
            "have": have,
            "missing": missing,
        }

    try:
        if not os.path.exists(STATE_DIR):
            os.makedirs(STATE_DIR)
        with open(GAP_REPORT_FILE, "w") as f:
            json.dump(report, f, indent=2)
        log("Gap report: {}".format(GAP_REPORT_FILE))
        for lib_label, info in report.get("libraries", {}).items():
            log("  {}: {}/{} footprints have 3D models ({}%)".format(
                lib_label, info["have_3d_model"],
                info["total_footprints"], info["coverage_pct"]))
    except Exception as e:
        log("WARNING: Could not write gap report: {}".format(e))

    return report


# ── API helpers ────────────────────────────────────────────────────────

def safe_key(name):
    """Sanitize a name for use as an API/file key."""
    return re.sub(r'[^a-zA-Z0-9._-]', '_', name)


def fetch_existing_keys():
    """Fetch the set of existing model keys from the API."""
    try:
        url = MODELS_API_URL + "?list=1"
        req = urllib.request.Request(url)
        req.add_header("Authorization", "Bearer " + MODELS_API_KEY)
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read().decode("utf-8"))
        return set(m.get("key", "") for m in data.get("models", []))
    except Exception as e:
        log("WARNING: Could not fetch existing keys: {}".format(e))
        return set()


def upload_to_api(key, step_bytes, metadata):
    """Upload a STEP file to the team API (gzip+base64)."""
    try:
        compressed = gzip.compress(step_bytes, compresslevel=9)
        body = json.dumps({
            "key": key,
            "partNumber": metadata.get("partNumber", key),
            "manufacturer": metadata.get("manufacturer"),
            "packageName": metadata.get("packageName"),
            "category": metadata.get("category"),
            "tags": metadata.get("tags", []),
            "sourceUrl": metadata.get("sourceUrl", "fusion360-batch-export"),
            "usedInDesigns": metadata.get("usedInDesigns", []),
            "encoding": "gzip+base64",
            "stepData": base64.b64encode(compressed).decode(),
        }).encode("utf-8")

        req = urllib.request.Request(MODELS_API_URL, data=body, method="PUT")
        req.add_header("Authorization", "Bearer " + MODELS_API_KEY)
        req.add_header("Content-Type", "application/json")
        resp = urllib.request.urlopen(req, timeout=60)
        return resp.status == 200
    except Exception as e:
        log("  Upload failed for {}: {}".format(key, e))
        return False


# ── File collection ────────────────────────────────────────────────────

def collect_all_files(folder, files_list, folder_path=""):
    """Recursively collect all files from a data folder."""
    try:
        count = folder.dataFiles.count
        log("    Folder '{}': {} files".format(folder_path or "(root)", count))
        for i in range(count):
            df = folder.dataFiles.item(i)
            files_list.append({
                "data_file": df,
                "name": df.name,
                "folder_path": folder_path,
            })
    except Exception as e:
        log("    ERROR reading files in '{}': {}".format(folder_path, e))
    try:
        sub_count = folder.dataFolders.count
        for i in range(sub_count):
            sf = folder.dataFolders.item(i)
            sp = "{}/{}".format(folder_path, sf.name) if folder_path else sf.name
            collect_all_files(sf, files_list, sp)
    except Exception as e:
        log("    ERROR reading subfolders in '{}': {}".format(folder_path, e))


# ── Component extraction ──────────────────────────────────────────────

def extract_components_from_design(design, output_dir, existing_keys,
                                   hub_name, project_name, design_name):
    """Extract individual component 3D models from a Fusion Design.

    For each component occurrence in the root, exports its bodies as an
    individual STEP file.  Deduplicates by component definition name.

    Returns list of result dicts.
    """
    results = []
    root = design.rootComponent
    if not root:
        return results

    exported_definitions = set()
    design_tag = "{}/{}".format(project_name, design_name)

    for i in range(root.occurrences.count):
        occ = root.occurrences.item(i)
        comp = occ.component
        if not comp:
            continue

        comp_name = comp.name
        if not comp_name:
            continue

        # Skip board body
        name_lower = comp_name.lower()
        if name_lower in ("board", "pcb", "board_outline", "boardoutline",
                          "board:1", "pcb:1"):
            continue

        # Deduplicate within this design
        if comp_name in exported_definitions:
            continue

        # Skip components with no bodies
        if comp.bRepBodies.count == 0:
            continue

        key = safe_key(comp_name)

        # Skip if already on API
        if key in existing_keys:
            exported_definitions.add(comp_name)
            results.append({
                "component": comp_name, "key": key,
                "status": "already_on_api",
            })
            continue

        # Export this component to STEP
        step_path = os.path.join(output_dir, key + ".step")

        # Skip if already exported locally (from a previous design)
        if os.path.exists(step_path) and os.path.getsize(step_path) > 50:
            exported_definitions.add(comp_name)
            # Still upload if not on API yet
            try:
                with open(step_path, "rb") as f:
                    step_bytes = f.read()
                package_name = re.sub(r'_[A-Z]+\d+$', '', comp_name)
                ok = upload_to_api(key, step_bytes, {
                    "partNumber": comp_name,
                    "packageName": package_name,
                    "sourceUrl": "fusion360://{}".format(design_tag),
                    "usedInDesigns": [design_tag],
                    "tags": ["pcb-component", "extracted"],
                })
                existing_keys.add(key)
                results.append({
                    "component": comp_name, "key": key,
                    "status": "uploaded_existing",
                    "uploaded": ok,
                })
            except Exception:
                results.append({
                    "component": comp_name, "key": key,
                    "status": "already_exported",
                })
            continue

        try:
            export_mgr = design.exportManager
            step_options = export_mgr.createSTEPExportOptions(step_path, comp)
            export_ok = export_mgr.execute(step_options)

            if export_ok and os.path.exists(step_path) and os.path.getsize(step_path) > 50:
                exported_definitions.add(comp_name)
                file_size = os.path.getsize(step_path)

                package_name = comp_name
                package_name = re.sub(r'_[A-Z]+\d+$', '', package_name)

                entry = {
                    "component": comp_name,
                    "key": key,
                    "status": "exported",
                    "size": file_size,
                    "packageName": package_name,
                    "bodies": comp.bRepBodies.count,
                }

                with open(step_path, "rb") as f:
                    step_bytes = f.read()

                ok = upload_to_api(key, step_bytes, {
                    "partNumber": comp_name,
                    "packageName": package_name,
                    "sourceUrl": "fusion360://{}".format(design_tag),
                    "usedInDesigns": [design_tag],
                    "tags": ["pcb-component", "extracted"],
                })
                entry["uploaded"] = ok
                existing_keys.add(key)
                results.append(entry)
                log("  EXPORTED: {} ({} bytes, uploaded={})".format(
                    key, file_size, ok))
            else:
                results.append({
                    "component": comp_name, "key": key,
                    "status": "export_failed",
                })
        except Exception as e:
            results.append({
                "component": comp_name, "key": key,
                "status": "error", "error": str(e),
            })

    return results


# ── Main execution handler ─────────────────────────────────────────────

class Batch3DExportCommandExecuteHandler(adsk.core.CommandEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        """Diagnostic mode: open ONE file from the first PCB project,
        log everything about its product type, workspaces, documents,
        then close and show results."""
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface

            log("=== DIAGNOSTIC RUN ===")

            # Find first PCB project
            hubs = app.data.dataHubs
            target_proj = None
            hub_name = ""
            for hi in range(hubs.count):
                hub = hubs.item(hi)
                hub_name = hub.name if hasattr(hub, 'name') else "Hub_{}".format(hi)
                for pi in range(hub.dataProjects.count):
                    proj = hub.dataProjects.item(pi)
                    pname = proj.name
                    if pname.startswith("PCBLF") or pname.startswith("PCB0"):
                        target_proj = proj
                        break
                if target_proj:
                    break

            if not target_proj:
                ui.messageBox("No PCB project found", ADDIN_NAME)
                return

            log("Target project: {} / {}".format(hub_name, target_proj.name))

            # Collect files
            files = []
            collect_all_files(target_proj.rootFolder, files)
            log("Files in project: {}".format(len(files)))
            for f in files:
                log("  - {}".format(f["name"]))

            # Find first non-zip, non-pdf file to open
            target_file = None
            for f in files:
                name_lower = f["name"].lower()
                if name_lower.endswith((".zip", ".pdf", ".png", ".jpg")):
                    continue
                target_file = f
                break

            if not target_file:
                ui.messageBox(
                    "No openable files in {}".format(target_proj.name),
                    ADDIN_NAME)
                return

            diag_lines = []
            diag_lines.append("Project: {}".format(target_proj.name))
            diag_lines.append("File: {}".format(target_file["name"]))

            # Log state BEFORE opening
            diag_lines.append("")
            diag_lines.append("-- BEFORE OPEN --")
            prod_before = app.activeProduct
            if prod_before:
                diag_lines.append("Active product type: {}".format(
                    prod_before.productType))
            else:
                diag_lines.append("Active product: None")
            diag_lines.append("Open documents: {}".format(
                app.documents.count))

            # Open the file
            doc = None
            try:
                log("Opening: {}...".format(target_file["name"]))
                doc = app.documents.open(target_file["data_file"], False)
            except Exception as e:
                diag_lines.append("OPEN ERROR: {}".format(e))
                log("OPEN ERROR: {}".format(e))

            if not doc:
                diag_lines.append("doc is None after open")
                for line in diag_lines:
                    log(line)
                ui.messageBox("\n".join(diag_lines), ADDIN_NAME)
                return

            diag_lines.append("")
            diag_lines.append("-- AFTER OPEN --")
            diag_lines.append("doc.name: {}".format(doc.name))

            # Document type info
            try:
                diag_lines.append("doc.documentType: {}".format(
                    doc.documentType))
            except Exception as e:
                diag_lines.append("doc.documentType error: {}".format(e))

            # Active product
            prod = app.activeProduct
            if prod:
                diag_lines.append("activeProduct.productType: {}".format(
                    prod.productType))
                try:
                    diag_lines.append("activeProduct.objectType: {}".format(
                        prod.objectType))
                except Exception:
                    pass
                # List all products in the document
                try:
                    diag_lines.append("doc.products count: {}".format(
                        doc.products.count))
                    for pi in range(doc.products.count):
                        p = doc.products.item(pi)
                        diag_lines.append("  product[{}]: type={}, objType={}".format(
                            pi, p.productType,
                            p.objectType if hasattr(p, 'objectType') else '?'))
                except Exception as e:
                    diag_lines.append("doc.products error: {}".format(e))
            else:
                diag_lines.append("activeProduct: None")

            # Fusion Design cast
            design = adsk.fusion.Design.cast(prod)
            diag_lines.append("Design.cast: {}".format(
                "SUCCESS" if design else "None"))

            # List all workspaces
            diag_lines.append("")
            diag_lines.append("-- WORKSPACES --")
            try:
                for wi in range(ui.workspaces.count):
                    ws = ui.workspaces.item(wi)
                    active = " (ACTIVE)" if ws.isActive else ""
                    diag_lines.append("  {}: {}{}".format(
                        ws.id, ws.name, active))
            except Exception as e:
                diag_lines.append("  Error listing: {}".format(e))

            # Try workspace switch if not already a Design
            if not design:
                diag_lines.append("")
                diag_lines.append("-- WORKSPACE SWITCH ATTEMPT --")

                # Try FusionSolidEnvironment
                try:
                    ws = ui.workspaces.itemById('FusionSolidEnvironment')
                    if ws:
                        diag_lines.append(
                            "Activating FusionSolidEnvironment...")
                        ws.activate()
                        adsk.doEvents()
                        time.sleep(2)
                        prod2 = app.activeProduct
                        if prod2:
                            diag_lines.append(
                                "After switch productType: {}".format(
                                    prod2.productType))
                        design = adsk.fusion.Design.cast(app.activeProduct)
                        diag_lines.append("Design.cast after switch: {}".format(
                            "SUCCESS" if design else "None"))
                    else:
                        diag_lines.append(
                            "FusionSolidEnvironment workspace not found")
                except Exception as e:
                    diag_lines.append("Switch error: {}".format(e))

            # If we got a design, log component info
            if design:
                diag_lines.append("")
                diag_lines.append("-- DESIGN INFO --")
                root = design.rootComponent
                diag_lines.append("Root component: {}".format(
                    root.name if root else "None"))
                if root:
                    diag_lines.append("Occurrences: {}".format(
                        root.occurrences.count))
                    diag_lines.append("bRepBodies: {}".format(
                        root.bRepBodies.count))
                    for oi in range(min(root.occurrences.count, 10)):
                        occ = root.occurrences.item(oi)
                        diag_lines.append("  occ[{}]: {} (bodies={})".format(
                            oi, occ.component.name,
                            occ.component.bRepBodies.count))
                    if root.occurrences.count > 10:
                        diag_lines.append("  ... and {} more".format(
                            root.occurrences.count - 10))

            # Close
            try:
                doc.close(False)
                diag_lines.append("")
                diag_lines.append("Closed successfully")
            except Exception as e:
                diag_lines.append("Close error: {}".format(e))

            # Log everything
            for line in diag_lines:
                log(line)
            log("=== DIAGNOSTIC DONE ===")

            # Show to user
            ui.messageBox("\n".join(diag_lines), ADDIN_NAME)

        except Exception:
            msg = traceback.format_exc()
            log("DIAGNOSTIC EXCEPTION: {}".format(msg))
            if _ui:
                _ui.messageBox(
                    "Diagnostic failed:\n\n{}".format(msg),
                    ADDIN_NAME,
                )


class Batch3DExportCommandCreatedHandler(adsk.core.CommandCreatedEventHandler):
    def __init__(self):
        super().__init__()

    def notify(self, args):
        try:
            cmd = args.command
            on_execute = Batch3DExportCommandExecuteHandler()
            cmd.execute.add(on_execute)
            _handlers.append(on_execute)
        except Exception:
            if _ui:
                _ui.messageBox(traceback.format_exc(), ADDIN_NAME)


def run(context):
    """Entry point — runs the export immediately when the add-in is started.

    Toggle the add-in ON in Scripts & Add-Ins to launch.
    """
    try:
        global _app, _ui
        _app = adsk.core.Application.get()
        _ui = _app.userInterface

        # Run the export directly — no toolbar button needed
        handler = Batch3DExportCommandExecuteHandler()
        handler.notify(None)

    except Exception:
        if _ui:
            _ui.messageBox(
                "Batch3DExport failed:\n\n{}".format(
                    traceback.format_exc()),
                ADDIN_NAME,
            )


def stop(context):
    """Called when the add-in is stopped."""
    pass
