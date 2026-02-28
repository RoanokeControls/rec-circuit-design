# BatchExportDesigns — Fusion 360 Add-In

Batch exports all Electronics designs in a Fusion 360 cloud project to structured JSON files for the rec-circuit-design MCP knowledge base.

**This is a completely read-only, non-destructive tool.** No designs are modified.

## Installation

1. Copy the entire `BatchExportDesigns` folder to your Fusion 360 add-ins directory:

   **macOS:**
   ```
   ~/Library/Application Support/Autodesk/Autodesk Fusion 360/API/AddIns/
   ```

   **Windows:**
   ```
   %APPDATA%\Autodesk\Autodesk Fusion 360\API\AddIns\
   ```

2. In Fusion 360, go to **Utilities → Add-Ins** (or press Shift+S).
3. Click the **Add-Ins** tab, find **BatchExportDesigns**, and click **Run**.
4. A "Batch Export Electronics" button will appear in the **Add-Ins** toolbar panel.

## ULP Script Location

The add-in expects the ULP scripts to be located at:
```
rec-circuit-design/ulp-scripts/export-schematic.ulp
rec-circuit-design/ulp-scripts/export-board.ulp
```

The add-in resolves these paths relative to its own install location. If the ULP scripts are not found, you'll be prompted with the expected path.

## Usage

1. Open a Fusion 360 project containing Electronics designs.
2. Click **Batch Export Electronics** in the toolbar.
3. Select an output directory for the JSON files.
4. Confirm the batch operation.
5. The add-in will:
   - Open each design in the project
   - Run `export-schematic.ulp` to extract schematic data
   - Run `export-board.ulp` to extract board/layout data
   - Close each design **without saving**
   - Write an `export_manifest.json` summarizing all exports

## Output

For each Electronics design, you'll get up to two JSON files:
- `{designname}_schematic.json` — parts, nets, buses, attributes, sheets
- `{designname}_board.json` — elements, signals, routing, vias, polygons, layers

Plus a manifest file:
- `export_manifest.json` — lists all exports with timestamps and any errors

## Safety

- ULP scripts use `schematic(SCH)` and `board(B)` read-only data contexts
- ULP scripts only use `output()` + `printf()` for file I/O — no editor commands
- Documents are closed with `doc.close(False)` — the `False` parameter explicitly prevents saving
- The Python add-in never calls any design modification APIs
- A confirmation dialog is shown before starting the batch operation
