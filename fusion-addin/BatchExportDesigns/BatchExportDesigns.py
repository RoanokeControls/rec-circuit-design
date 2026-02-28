# Fusion 360 Add-In: Batch Export Electronics Designs
#
# Opens every Electronics design in a cloud project folder,
# runs export-schematic.ulp and export-board.ulp on each,
# and closes without saving. Completely non-destructive / read-only.
#
# Install: Copy this folder to ~/Library/Application Support/Autodesk/Autodesk Fusion 360/API/AddIns/

import adsk.core
import adsk.fusion
import os
import json
import time
import traceback

# Global references kept alive for the add-in lifetime
_app = None
_ui = None
_handlers = []

ADDIN_NAME = "BatchExportDesigns"
BUTTON_ID = "batchExportDesignsButton"

# Default ULP paths (relative to this add-in's parent directory)
DEFAULT_ULP_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "..", "ulp-scripts"
)


def get_ulp_path(ulp_name):
    """Resolve the full path to a ULP script."""
    path = os.path.normpath(os.path.join(DEFAULT_ULP_DIR, ulp_name))
    if os.path.exists(path):
        return path
    # Fallback: prompt user
    return None


def run_ulp_on_active_document(ulp_path, output_dir):
    """Execute a ULP script on the currently active Electronics document.

    Uses Fusion's executeTextCommand to invoke RUN on the ULP,
    passing the output directory as an argument.
    """
    app = adsk.core.Application.get()
    # Build the command string — quote paths to handle spaces
    cmd = 'RUN "{}";"{}"'.format(ulp_path.replace("\\", "/"),
                                  output_dir.replace("\\", "/"))
    try:
        app.executeTextCommand(cmd)
        return True
    except Exception:
        return False


def collect_electronics_files(folder, files_list):
    """Recursively collect all Electronics design files from a data folder."""
    try:
        for file_idx in range(folder.dataFiles.count):
            data_file = folder.dataFiles.item(file_idx)
            # Electronics designs have fileExtension '.fsch' or type
            # We check for Electronics document type when opening
            files_list.append(data_file)
    except Exception:
        pass

    # Recurse into subfolders
    try:
        for folder_idx in range(folder.dataFolders.count):
            sub_folder = folder.dataFolders.item(folder_idx)
            collect_electronics_files(sub_folder, files_list)
    except Exception:
        pass


class BatchExportCommandExecuteHandler(adsk.core.CommandEventHandler):
    """Handler for the command execute event — runs the batch export."""

    def __init__(self):
        super().__init__()

    def notify(self, args):
        try:
            app = adsk.core.Application.get()
            ui = app.userInterface

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
                        os.path.normpath(DEFAULT_ULP_DIR)
                    ),
                    ADDIN_NAME,
                    adsk.core.MessageBoxButtonTypes.OKButtonType,
                    adsk.core.MessageBoxIconTypes.CriticalIconType,
                )
                return

            # ── Collect all data files from active project ─────────────
            active_project = app.data.activeProject
            if not active_project:
                ui.messageBox(
                    "No active project. Please open a project first.",
                    ADDIN_NAME,
                )
                return

            all_files = []
            collect_electronics_files(active_project.rootFolder, all_files)

            if not all_files:
                ui.messageBox(
                    "No files found in project '{}'.".format(active_project.name),
                    ADDIN_NAME,
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
                ADDIN_NAME,
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
            progress.show(ADDIN_NAME, "Exporting designs...", 0, len(all_files), 0)

            manifest = {
                "project": active_project.name,
                "output_directory": output_dir,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "exports": [],
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

                doc = None
                try:
                    # Attempt to open the document
                    doc = app.documents.open(data_file)
                    if not doc:
                        manifest["errors"].append({
                            "file": data_file.name,
                            "error": "Failed to open document",
                        })
                        error_count += 1
                        continue

                    # Check if this is an Electronics document
                    # Electronics docs have a schematic or board workspace
                    is_electronics = False
                    export_entry = {
                        "file": data_file.name,
                        "schematic_exported": False,
                        "board_exported": False,
                    }

                    # Try schematic export
                    try:
                        schematic_ok = run_ulp_on_active_document(
                            schematic_ulp, output_dir
                        )
                        if schematic_ok:
                            export_entry["schematic_exported"] = True
                            is_electronics = True
                    except Exception:
                        pass

                    # Try board export — switch to board workspace if available
                    try:
                        board_ok = run_ulp_on_active_document(
                            board_ulp, output_dir
                        )
                        if board_ok:
                            export_entry["board_exported"] = True
                            is_electronics = True
                    except Exception:
                        pass

                    if is_electronics:
                        manifest["exports"].append(export_entry)
                        exported_count += 1
                    else:
                        # Not an Electronics design — skip silently
                        pass

                except Exception as e:
                    manifest["errors"].append({
                        "file": data_file.name,
                        "error": str(e),
                        "traceback": traceback.format_exc(),
                    })
                    error_count += 1

                finally:
                    # Close document WITHOUT saving — False = don't save
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

            # ── Done ───────────────────────────────────────────────────
            ui.messageBox(
                "Batch export complete.\n\n"
                "Designs exported: {}\n"
                "Errors: {}\n\n"
                "Output: {}\n"
                "Manifest: {}".format(
                    exported_count, error_count, output_dir, manifest_path
                ),
                ADDIN_NAME,
            )

        except Exception:
            if _ui:
                _ui.messageBox(
                    "Batch export failed:\n\n{}".format(traceback.format_exc()),
                    ADDIN_NAME,
                )


class BatchExportCommandCreatedHandler(adsk.core.CommandCreatedEventHandler):
    """Handler for command creation — wires up the execute handler."""

    def __init__(self):
        super().__init__()

    def notify(self, args):
        try:
            cmd = args.command
            on_execute = BatchExportCommandExecuteHandler()
            cmd.execute.add(on_execute)
            _handlers.append(on_execute)
        except Exception:
            if _ui:
                _ui.messageBox(traceback.format_exc(), ADDIN_NAME)


def run(context):
    """Entry point — called when the add-in is started."""
    try:
        global _app, _ui
        _app = adsk.core.Application.get()
        _ui = _app.userInterface

        # Create a command definition
        cmd_defs = _ui.commandDefinitions
        existing = cmd_defs.itemById(BUTTON_ID)
        if existing:
            existing.deleteMe()

        cmd_def = cmd_defs.addButtonDefinition(
            BUTTON_ID,
            "Batch Export Electronics",
            "Export all Electronics designs in the active project to JSON.\n"
            "Read-only — no designs are modified.",
            "",
        )

        on_created = BatchExportCommandCreatedHandler()
        cmd_def.commandCreated.add(on_created)
        _handlers.append(on_created)

        # Add to the ADD-INS panel in the toolbar
        addins_panel = _ui.allToolbarPanels.itemById("SolidScriptsAddinsPanel")
        if addins_panel:
            existing_ctrl = addins_panel.controls.itemById(BUTTON_ID)
            if existing_ctrl:
                existing_ctrl.deleteMe()
            addins_panel.controls.addCommand(cmd_def)

    except Exception:
        if _ui:
            _ui.messageBox(traceback.format_exc(), ADDIN_NAME)


def stop(context):
    """Called when the add-in is stopped."""
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface

        # Clean up the button
        cmd_def = ui.commandDefinitions.itemById(BUTTON_ID)
        if cmd_def:
            cmd_def.deleteMe()

        addins_panel = ui.allToolbarPanels.itemById("SolidScriptsAddinsPanel")
        if addins_panel:
            ctrl = addins_panel.controls.itemById(BUTTON_ID)
            if ctrl:
                ctrl.deleteMe()

    except Exception:
        if _ui:
            _ui.messageBox(traceback.format_exc(), ADDIN_NAME)
