# rec-circuit-design

An MCP server that encodes your team's circuit design knowledge — reference circuits, component inventory, design rules, lessons learned, and manufacturing constraints — and generates Fusion 360 Electronics (Eagle) SCR scripts from it.

Instead of digging through old projects or asking senior engineers, your team asks Claude. It pulls from your proven designs, checks what's in stock, applies your rules, and outputs a script you can run directly in Fusion 360.

## What It Does

**Design from proven patterns, not from scratch.**

Tell Claude what you need:
> "Plan an ESP32-WROVER board with USB power, an I2C sensor header, and a status LED"

It queries the MCP server to:
1. Pull your team's standard ESP32-WROVER reference circuit
2. Select the NCP1117 or SPX3819 power supply block based on current needs
3. Add ESD protection on external connectors (your rule, not optional)
4. Check that every part is in stock for your production quantity
5. Flag any relevant lessons learned ("WiFi drops if bulk cap is >10mm from VDD")
6. Generate an Eagle `.scr` script with real part names from your library

Open the script in Fusion 360 Electronics, run it, and your schematic is placed — components, values, nets, all following your conventions.

## Tools

### Lookup & Reference

| Tool | Description |
|------|-------------|
| `lookup-reference-circuit` | Find proven designs by MCU, category, or keyword |
| `lookup-component` | Search inventory by part number, value, category, or description |
| `suggest-power-supply` | Recommend a power topology based on voltage, current, and stock |
| `suggest-substitution` | Find verified drop-in replacements with stock availability |
| `check-design-rules` | Pull all rules, DFM constraints, derating limits, and lessons for a topic |
| `check-inventory` | Verify every part in a BOM is in stock for a given production run |

### Planning & Optimization

| Tool | Description |
|------|-------------|
| `plan-schematic` | Assemble standard blocks from high-level requirements, check inventory, flag warnings |
| `optimize-for-inventory` | Rework a BOM to maximize use of abundant stock and avoid procurement delays |

### Generation

| Tool | Description |
|------|-------------|
| `generate-schematic-script` | Output a Fusion 360 Eagle `.scr` file from circuit blocks using REC library parts |
| `generate-bom` | Output a CSV BOM with part numbers, inventory status, and cost rollup |

### Knowledge Input

These tools let engineers log knowledge from the production floor, the lab, or design reviews. New entries go to a pending queue for lead engineer review before becoming active.

| Tool | Description |
|------|-------------|
| `add-lesson-learned` | Log a field failure, certification issue, or design gotcha |
| `add-design-rule` | Propose a new convention or constraint |
| `add-component-note` | Add a warning, tip, EOL notice, or quality flag about a specific part |
| `flag-component` | Mark a part as problematic, obsolete, or do-not-use |
| `add-substitution-rule` | Register a verified component swap with conditions |
| `update-inventory` | Report stock changes from production runs or shipments |

## Knowledge Base

The server's value comes from your team's actual data, not generic electronics knowledge. Each file is typed TypeScript — version controlled, reviewable, and easy to update.

| File | What It Encodes |
|------|-----------------|
| `reference-circuits.ts` | Proven circuit designs broken into composable blocks |
| `inventory.ts` | Component stock levels, feeder slots, costs, alternates |
| `power-supplies.ts` | Standard power supply topologies with component lists |
| `protection-circuits.ts` | ESD, TVS, fuse, and polarity protection blocks |
| `design-rules.ts` | Your conventions with severity (must/should/prefer) and reasoning |
| `lessons-learned.ts` | Field failures, root causes, and fixes — the most valuable file |
| `component-notes.ts` | Per-part warnings, tips, EOL notices, quality issues |
| `substitution-rules.ts` | Verified part swaps with conditions and limitations |
| `dfm-rules.ts` | Pick-and-place, reflow, stencil, and panelization constraints |
| `derating-rules.ts` | Practical stress limits by component type and package |
| `vendor-preferences.ts` | Preferred manufacturers by category with lead time notes |
| `eagle-libraries.ts` | REC Standard Library mappings — deviceset names, footprints, naming conventions |

### What Goes In Each Lesson Learned

Not textbook knowledge. Your team's scars:

```typescript
{
  title: "ESP32 WiFi drops with distant decoupling",
  whatHappened: "Asset tracker rev A had intermittent WiFi disconnects under load",
  rootCause: "10uF bulk cap was 25mm from VDD pins — too far for high-frequency switching noise",
  fix: "Moved 10uF within 10mm of VDD pins, added 100nF at VDD3P3_RTC. Rev B fixed it.",
  affectedComponents: ["ESP32-WROVER"],
  sourceProject: "PROJ-2024-017 Asset Tracker",
  severity: "major"
}
```

Next time someone designs a board with an ESP32, this warning surfaces automatically.

## REC Standard Library Integration

All component references use actual deviceset names from **REC_Standard_Library v365.lbr** (454 parts, 175 footprints, 112 symbols). The SCR scripts generate valid `ADD` commands that work in Fusion 360 Electronics without modification.

### Naming Conventions

**Resistors** — `{VALUE}{UNIT}_{PACKAGE}[_{TOLERANCE}][_{POWER}]`
```
10K_0805          4.7K_0603          100^_1206_1%_0.5W
```
Units: `^` = ohms, `K` = kilohms, `M` = megohms

**Capacitors** — `{VALUE}{UNIT}_{PACKAGE}[_{TOLERANCE}][_{VOLTAGE}]`
```
0.1UF_0603_5%_50V     10UF_1206_10%_25V     22PF_0603
```

**ICs / Modules** — manufacturer part number directly
```
ESP32-WROVER     STM32F103C8T6     NCP1117ST33T3G     TPS54286PWPR
```

### Footprint Mapping (IPC-7351)

| Imperial | Resistor | Capacitor |
|----------|----------|-----------|
| 0402 | RESC1005X40 | — |
| 0603 | RESC1608X60 | CAPC1608X85 |
| 0805 | RESC2012X65 | CAPC2012X110 |
| 1206 | RESC3216X70 | CAPC3216X135 |
| 1210 | RESC3225X70N | CAPC3225X135 |
| 2512 | RESC6332X71 | — |

## Eagle SCR Script Output

The `generate-schematic-script` tool outputs `.scr` files that Fusion 360 Electronics executes directly. Example output:

```eagle
# Eagle SCR Script — Fusion 360 Electronics
# Generated by rec-circuit-design MCP
# Library: REC_Standard_Library v365.lbr
#
# Run: Fusion 360 > Electronics > Automate > Script

USE 'REC_Standard_Library v365.lbr';  # Load component library
GRID mil 100;  # Set grid
EDIT .s1;  # Switch to sheet 1

# ── ESP32-WROVER Decoupling ──
ADD '0.1UF_0603_5%_50V' C1 R0 (500 2000);  # Place C1 — 0.1UF_0603_5%_50V
VALUE C1 '0.1UF';  # Set C1 = 0.1UF
ADD '10UF_0805' C2 R0 (700 2000);  # Place C2 — 10UF_0805
VALUE C2 '10UF';  # Set C2 = 10UF

# ── Power Supply: USB 5V to 3.3V LDO (NCP1117) ──
ADD 'NCP1117ST33T3G' VR1 R0 (500 1400);  # Place VR1
ADD '10UF_1206_10%_25V' C_IN R0 (700 1400);  # Place C_IN
VALUE C_IN '10UF';  # Set C_IN = 10UF

WINDOW FIT;  # Zoom to fit all components
```

## Autodesk Coder MCP Integration

This server is designed to work alongside the [autodesk-coder](https://github.com/RoanokeControls/autodesk-coder) MCP server. When Claude needs to look up a part that isn't in the knowledge files, or needs the exact Eagle command syntax, it can query autodesk-coder:

- `search_api("capacitor 10uF", type_filter: "library_part")` — find parts in the full 454-part REC library
- `get_ecad("Schematic Editor Commands")` — Eagle SCR command reference
- `get_ecad("UL_SCHEMATIC")` — ULP object types for advanced automation

## Inventory-Aware Design

Every recommendation factors in what you actually have on the shelf:

- **Component selection** prefers abundant stock over exact-match specs when both work
- **Substitution suggestions** show stock levels for both original and alternate parts
- **BOM generation** flags shortages and suggests in-stock alternatives
- **Production planning** checks if you can build N boards with current inventory
- **Feeder slot tracking** knows which parts are already loaded on your pick-and-place

An engineer can say:
> "We just used 2,000 of the 10K_0805 on the sensor board run. And we got 50,000 0.1UF_0603 in today."

The `update-inventory` tool adjusts quantities in the session. For persistent updates, sync from your inventory system export.

## Setup

### Prerequisites

- Node.js 18+
- [Claude Code](https://claude.ai/code) CLI
- Fusion 360 with Electronics workspace (for running generated scripts)

### Install

```bash
git clone https://github.com/RoanokeControls/rec-circuit-design.git
cd rec-circuit-design
npm install
npm run build
```

### Register with Claude Code

```bash
claude mcp add -s user --transport stdio rec-circuit-design -- node /path/to/rec-circuit-design/dist/index.js
```

Restart Claude Code to connect.

## Populating Your Data

The server ships with sample data to demonstrate the structure. Replace it with your team's actual knowledge:

1. **Reference circuits** — Export schematics as images, have Claude read them and structure the data, then review
2. **Inventory** — Export CSV from your inventory system, convert to the TypeScript format
3. **Design rules** — Brain dump from senior engineers, or add them over time via `add-design-rule`
4. **Lessons learned** — Start logging them via `add-lesson-learned` as issues come up
5. **Eagle library mappings** — Run the `export-library.ulp` script from autodesk-coder to export your current library

New entries from the input tools go to `src/knowledge/pending/` as JSON files. A lead engineer reviews and promotes them to the main knowledge files.

## Project Structure

```
rec-circuit-design/
├── src/
│   ├── index.ts                    # MCP server entry point
│   ├── types/
│   │   └── index.ts                # 22 core type definitions
│   ├── tools/                      # 16 tools, one per file
│   │   ├── lookup-reference-circuit.ts
│   │   ├── lookup-component.ts
│   │   ├── suggest-power-supply.ts
│   │   ├── suggest-substitution.ts
│   │   ├── check-design-rules.ts
│   │   ├── check-inventory.ts
│   │   ├── plan-schematic.ts
│   │   ├── optimize-for-inventory.ts
│   │   ├── generate-schematic-script.ts
│   │   ├── generate-bom.ts
│   │   ├── add-lesson-learned.ts
│   │   ├── add-design-rule.ts
│   │   ├── add-component-note.ts
│   │   ├── flag-component.ts
│   │   ├── add-substitution-rule.ts
│   │   ├── update-inventory.ts
│   │   └── index.ts
│   ├── knowledge/                  # Your team's data
│   │   ├── reference-circuits.ts
│   │   ├── inventory.ts
│   │   ├── power-supplies.ts
│   │   ├── protection-circuits.ts
│   │   ├── design-rules.ts
│   │   ├── lessons-learned.ts
│   │   ├── component-notes.ts
│   │   ├── substitution-rules.ts
│   │   ├── dfm-rules.ts
│   │   ├── derating-rules.ts
│   │   ├── vendor-preferences.ts
│   │   ├── eagle-libraries.ts
│   │   ├── pending/                # Incoming entries awaiting review
│   │   └── index.ts
│   └── generators/
│       └── scr-builder.ts          # Eagle SCR script generation engine
├── package.json
└── tsconfig.json
```

## Stats

- **16 tools** — 6 lookup, 2 planning, 2 generation, 6 knowledge input
- **12 knowledge files** — reference circuits through vendor preferences
- **22 TypeScript types** — fully typed knowledge schema
- **~2,900 lines** — TypeScript, zero build errors
- **454 parts** — REC Standard Library integration (devicesets, footprints, symbols)

## License

MIT
