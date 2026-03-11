import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateLayersXml } from "../knowledge/eagle-libraries.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── 3D URN lookup ──
// Maps footprint names to Autodesk cloud URNs from three sources:
// 1. Fusion 360 managed component libraries (urn:adsk.eagle:package:...)
// 2. Project-level 3D models from harvested designs (urn:adsk.wipprod:fs.file:...)
// 3. Original IPC package mappings from Autodesk's bundled libraries
let managedUrnMap: Record<string, string> | null = null;

function lookupManagedUrn(packageName: string): string | null {
  if (!managedUrnMap) {
    // Try dist/knowledge first (runtime), then src/knowledge (dev)
    const candidates = [
      join(__dirname, "..", "knowledge", "managed-3d-urns.json"),
      join(__dirname, "..", "..", "src", "knowledge", "managed-3d-urns.json"),
    ];
    for (const p of candidates) {
      if (existsSync(p)) {
        try {
          managedUrnMap = JSON.parse(readFileSync(p, "utf-8"));
          break;
        } catch { /* continue */ }
      }
    }
    if (!managedUrnMap) managedUrnMap = {};
  }
  return managedUrnMap[packageName] ?? null;
}

// ── Library data path ──
// The v2 JSON export from export-library-v2.ulp lives in the autodesk-coder project
const LIBRARY_DATA_DIR =
  process.env.REC_LIBRARY_DATA ??
  join(__dirname, "..", "..", "..", "autodesk-coder", "library-data");

// ── Eagle internal unit conversions ──
// Eagle internal units: 320000 units = 1 mm
const UNIT = 320000; // units per mm
function u2mm(u: number): number {
  return u / UNIT;
}

// ── XML escaping ──
function xmlEsc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Pin direction/function/length/visible Eagle constants → XML strings ──
const PIN_DIR_MAP: Record<number, string> = {
  0: "nc", 1: "in", 2: "out", 3: "io", 4: "oc", 5: "pwr", 6: "pas", 7: "hiz", 8: "sup",
};
const PIN_LENGTH_MAP: Record<number, string> = {
  0: "point", 1: "short", 2: "middle", 3: "long",
};
const PIN_VISIBLE_MAP: Record<number, string> = {
  0: "off", 1: "pad", 2: "pin", 3: "both",
};
const PIN_FUNCTION_MAP: Record<number, string> = {
  0: "none", 1: "dot", 2: "clk", 3: "dotclk",
};
const PAD_SHAPE_MAP: Record<number, string> = {
  0: "square", 1: "round", 2: "octagon", 3: "long", 4: "offset",
};
const TEXT_ALIGN_MAP: Record<number, string> = {
  0: "bottom-left", 1: "bottom-center", 2: "bottom-right",
  3: "center-left", 4: "center", 5: "center-right",
  6: "top-left", 7: "top-center", 8: "top-right",
};
const TEXT_FONT_MAP: Record<number, string> = {
  0: "vector", 1: "proportional", 2: "fixed",
};

// ── Type definitions for v2 library JSON ──
interface LibraryData {
  format_version: number;
  export_timestamp: number;
  library_name: string;
  library_headline: string;
  library_description: string;
  footprints: Footprint[];
  symbols: Symbol[];
  devicesets: Deviceset[];
}

interface Footprint {
  name: string;
  description: string;
  smds: { name: string; x: number; y: number; dx: number; dy: number; layer: number; roundness: number; angle: number }[];
  pads: { name: string; x: number; y: number; drill: number; diameter: number; shape: number; angle: number; elongation: number; flags: number }[];
  wires: Wire[];
  circles: Circle[];
  rectangles: Rect[];
  texts: Text[];
  holes: { x: number; y: number; drill: number }[];
}

interface Symbol {
  name: string;
  description: string;
  pins: { name: string; x: number; y: number; direction: number; function: number; length: number; visible: number; angle: number; swaplevel: number }[];
  wires: Wire[];
  circles: Circle[];
  rectangles: Rect[];
  texts: Text[];
}

interface Deviceset {
  name: string;
  prefix: string;
  description: string;
  headline: string;
  value: string;
  urn: string;
  library_urn: string;
  library_version: number;
  gates: { name: string; symbol: string; x: number; y: number; addlevel: number; swaplevel: number }[];
  devices: Device[];
}

interface Device {
  name: string;
  footprint: string;
  technologies: string;
  connects: { gate: string; pin: string; pad: string }[];
}

interface Wire { x1: number; y1: number; x2: number; y2: number; width: number; layer: number; curve: number }
interface Circle { x: number; y: number; radius: number; width: number; layer: number }
interface Rect { x1: number; y1: number; x2: number; y2: number; layer: number; angle: number }
interface Text { value: string; x: number; y: number; size: number; layer: number; font: number; ratio: number; angle: number; mirror: number; align: number }

// ── Load library data ──
function loadLibraryData(filename: string): LibraryData | null {
  const path = join(LIBRARY_DATA_DIR, filename);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8"));
}

function findLibraryFiles(): string[] {
  const fs = require("fs");
  if (!existsSync(LIBRARY_DATA_DIR)) return [];
  return fs.readdirSync(LIBRARY_DATA_DIR).filter((f: string) => f.endsWith(".json"));
}

// ── XML generation helpers ──
function formatMm(u: number): string {
  return u2mm(u).toFixed(4);
}

function generateFootprintXml(fp: Footprint): string {
  const lines: string[] = [];
  lines.push(`<package name="${xmlEsc(fp.name)}">`);
  if (fp.description) {
    lines.push(`<description>${xmlEsc(fp.description)}</description>`);
  }

  // SMD pads
  for (const s of fp.smds) {
    const attrs: string[] = [
      `name="${xmlEsc(s.name)}"`,
      `x="${formatMm(s.x)}"`,
      `y="${formatMm(s.y)}"`,
      `dx="${formatMm(s.dx)}"`,
      `dy="${formatMm(s.dy)}"`,
      `layer="${s.layer}"`,
    ];
    if (s.roundness) attrs.push(`roundness="${s.roundness}"`);
    if (s.angle) attrs.push(`rot="R${s.angle}"`);
    lines.push(`<smd ${attrs.join(" ")}/>`);
  }

  // THT pads
  for (const p of fp.pads) {
    const attrs: string[] = [
      `name="${xmlEsc(p.name)}"`,
      `x="${formatMm(p.x)}"`,
      `y="${formatMm(p.y)}"`,
      `drill="${formatMm(p.drill)}"`,
    ];
    if (p.diameter) attrs.push(`diameter="${formatMm(p.diameter)}"`);
    const shape = PAD_SHAPE_MAP[p.shape] || "round";
    if (shape !== "round") attrs.push(`shape="${shape}"`);
    if (p.angle) attrs.push(`rot="R${p.angle}"`);
    if (p.elongation) attrs.push(`elongation="${p.elongation}"`);
    lines.push(`<pad ${attrs.join(" ")}/>`);
  }

  // Wires
  for (const w of fp.wires) {
    const attrs: string[] = [
      `x1="${formatMm(w.x1)}"`,
      `y1="${formatMm(w.y1)}"`,
      `x2="${formatMm(w.x2)}"`,
      `y2="${formatMm(w.y2)}"`,
      `width="${formatMm(w.width)}"`,
      `layer="${w.layer}"`,
    ];
    if (w.curve) attrs.push(`curve="${w.curve.toFixed(1)}"`);
    lines.push(`<wire ${attrs.join(" ")}/>`);
  }

  // Circles
  for (const c of fp.circles) {
    lines.push(`<circle x="${formatMm(c.x)}" y="${formatMm(c.y)}" radius="${formatMm(c.radius)}" width="${formatMm(c.width)}" layer="${c.layer}"/>`);
  }

  // Rectangles
  for (const r of fp.rectangles) {
    const attrs = [
      `x1="${formatMm(r.x1)}"`,
      `y1="${formatMm(r.y1)}"`,
      `x2="${formatMm(r.x2)}"`,
      `y2="${formatMm(r.y2)}"`,
      `layer="${r.layer}"`,
    ];
    if (r.angle) attrs.push(`rot="R${r.angle}"`);
    lines.push(`<rectangle ${attrs.join(" ")}/>`);
  }

  // Texts
  for (const t of fp.texts) {
    const attrs: string[] = [
      `x="${formatMm(t.x)}"`,
      `y="${formatMm(t.y)}"`,
      `size="${formatMm(t.size)}"`,
      `layer="${t.layer}"`,
    ];
    if (t.ratio) attrs.push(`ratio="${t.ratio}"`);
    if (t.angle) attrs.push(`rot="R${t.angle}"`);
    if (t.mirror) attrs.push(`rot="MR${t.angle}"`);
    const font = TEXT_FONT_MAP[t.font];
    if (font && font !== "proportional") attrs.push(`font="${font}"`);
    const align = TEXT_ALIGN_MAP[t.align];
    if (align && align !== "bottom-left") attrs.push(`align="${align}"`);
    lines.push(`<text ${attrs.join(" ")}>${xmlEsc(t.value)}</text>`);
  }

  // Holes
  for (const h of (fp.holes || [])) {
    lines.push(`<hole x="${formatMm(h.x)}" y="${formatMm(h.y)}" drill="${formatMm(h.drill)}"/>`);
  }

  lines.push(`</package>`);
  return lines.join("\n");
}

function generateSymbolXml(sym: Symbol): string {
  const lines: string[] = [];
  lines.push(`<symbol name="${xmlEsc(sym.name)}">`);
  if (sym.description) {
    lines.push(`<description>${xmlEsc(sym.description)}</description>`);
  }

  // Wires (symbol graphics)
  for (const w of sym.wires) {
    const attrs: string[] = [
      `x1="${formatMm(w.x1)}"`,
      `y1="${formatMm(w.y1)}"`,
      `x2="${formatMm(w.x2)}"`,
      `y2="${formatMm(w.y2)}"`,
      `width="${formatMm(w.width)}"`,
      `layer="${w.layer}"`,
    ];
    if (w.curve) attrs.push(`curve="${w.curve.toFixed(1)}"`);
    lines.push(`<wire ${attrs.join(" ")}/>`);
  }

  // Circles
  for (const c of sym.circles) {
    lines.push(`<circle x="${formatMm(c.x)}" y="${formatMm(c.y)}" radius="${formatMm(c.radius)}" width="${formatMm(c.width)}" layer="${c.layer}"/>`);
  }

  // Rectangles
  for (const r of sym.rectangles) {
    const attrs = [
      `x1="${formatMm(r.x1)}"`,
      `y1="${formatMm(r.y1)}"`,
      `x2="${formatMm(r.x2)}"`,
      `y2="${formatMm(r.y2)}"`,
      `layer="${r.layer}"`,
    ];
    if (r.angle) attrs.push(`rot="R${r.angle}"`);
    lines.push(`<rectangle ${attrs.join(" ")}/>`);
  }

  // Texts
  for (const t of sym.texts) {
    const attrs: string[] = [
      `x="${formatMm(t.x)}"`,
      `y="${formatMm(t.y)}"`,
      `size="${formatMm(t.size)}"`,
      `layer="${t.layer}"`,
    ];
    if (t.ratio) attrs.push(`ratio="${t.ratio}"`);
    if (t.angle) attrs.push(`rot="R${t.angle}"`);
    const font = TEXT_FONT_MAP[t.font];
    if (font && font !== "proportional") attrs.push(`font="${font}"`);
    const align = TEXT_ALIGN_MAP[t.align];
    if (align && align !== "bottom-left") attrs.push(`align="${align}"`);
    lines.push(`<text ${attrs.join(" ")}>${xmlEsc(t.value)}</text>`);
  }

  // Pins
  for (const p of sym.pins) {
    const attrs: string[] = [
      `name="${xmlEsc(p.name)}"`,
      `x="${formatMm(p.x)}"`,
      `y="${formatMm(p.y)}"`,
    ];
    const len = PIN_LENGTH_MAP[p.length] || "middle";
    attrs.push(`length="${len}"`);
    const dir = PIN_DIR_MAP[p.direction] || "pas";
    attrs.push(`direction="${dir}"`);
    const func = PIN_FUNCTION_MAP[p.function] || "none";
    if (func !== "none") attrs.push(`function="${func}"`);
    const vis = PIN_VISIBLE_MAP[p.visible] || "both";
    if (vis !== "both") attrs.push(`visible="${vis}"`);
    if (p.angle) attrs.push(`rot="R${p.angle}"`);
    if (p.swaplevel) attrs.push(`swaplevel="${p.swaplevel}"`);
    lines.push(`<pin ${attrs.join(" ")}/>`);
  }

  lines.push(`</symbol>`);
  return lines.join("\n");
}

function generateDevicesetXml(ds: Deviceset, urnMap: Map<string, string>): string {
  const lines: string[] = [];
  const uservalue = ds.value === "On" ? ` uservalue="yes"` : "";
  lines.push(`<deviceset name="${xmlEsc(ds.name)}" prefix="${xmlEsc(ds.prefix)}"${uservalue}>`);
  if (ds.description) {
    lines.push(`<description>${xmlEsc(ds.description)}</description>`);
  }

  // Gates
  lines.push(`<gates>`);
  for (const g of ds.gates) {
    lines.push(`<gate name="${xmlEsc(g.name)}" symbol="${xmlEsc(g.symbol)}" x="${formatMm(g.x)}" y="${formatMm(g.y)}"/>`);
  }
  lines.push(`</gates>`);

  // Devices
  lines.push(`<devices>`);
  for (const d of ds.devices) {
    const devName = d.name === "''" ? "" : d.name;
    if (d.footprint) {
      lines.push(`<device name="${xmlEsc(devName)}" package="${xmlEsc(d.footprint)}">`);
      // Connects
      if (d.connects && d.connects.length > 0) {
        lines.push(`<connects>`);
        for (const c of d.connects) {
          lines.push(`<connect gate="${xmlEsc(c.gate)}" pin="${xmlEsc(c.pin)}" pad="${xmlEsc(c.pad)}"/>`);
        }
        lines.push(`</connects>`);
      }
      // 3D model reference (real Autodesk managed URN)
      const urn = urnMap.get(d.footprint);
      if (urn) {
        lines.push(`<package3dinstances>`);
        lines.push(`<package3dinstance package3d_urn="${xmlEsc(urn)}"/>`);
        lines.push(`</package3dinstances>`);
      }
      // Technologies
      const techs = d.technologies === "''" ? [""] : d.technologies.split(" ").filter(Boolean);
      lines.push(`<technologies>`);
      for (const t of techs) {
        lines.push(`<technology name="${xmlEsc(t)}"/>`);
      }
      lines.push(`</technologies>`);
      lines.push(`</device>`);
    } else {
      // Supply symbols / no-package devices
      lines.push(`<device name="${xmlEsc(devName)}">`);
      lines.push(`<technologies><technology name=""/></technologies>`);
      lines.push(`</device>`);
    }
  }
  lines.push(`</devices>`);
  lines.push(`</deviceset>`);
  return lines.join("\n");
}

// ── Main library generation ──
function generateLibraryXml(
  libraryName: string,
  devicesets: Deviceset[],
  footprints: Footprint[],
  symbols: Symbol[],
  urnMap: Map<string, string>,
): string {
  const lines: string[] = [];
  lines.push(`<?xml version="1.0" encoding="utf-8"?>`);
  lines.push(`<!DOCTYPE eagle SYSTEM "eagle.dtd">`);
  lines.push(`<eagle version="9.6.2">`);
  lines.push(`<drawing>`);
  lines.push(`<settings>`);
  lines.push(`<setting alwaysvectorfont="no"/>`);
  lines.push(`<setting verticaltext="up"/>`);
  lines.push(`</settings>`);
  lines.push(`<grid distance="0.1" unitdist="inch" unit="inch" style="lines" multiple="1" display="no" altdistance="0.01" altunitdist="inch" altunit="inch"/>`);
  lines.push(generateLayersXml());
  lines.push(`<library name="${xmlEsc(libraryName)}">`);

  // Packages (2D footprints only — no 3D references here)
  lines.push(`<packages>`);
  for (const fp of footprints) {
    lines.push(generateFootprintXml(fp));
  }
  lines.push(`</packages>`);

  // Packages3d — references to real Autodesk managed library 3D assets
  // These URNs point to existing 3D models on Autodesk's cloud servers
  // that Fusion 360 can resolve and render in the 3D PCB view.
  const matchedFootprints = footprints.filter(fp => urnMap.has(fp.name));
  if (matchedFootprints.length > 0) {
    lines.push(`<packages3d>`);
    for (const fp of matchedFootprints) {
      const urn = urnMap.get(fp.name)!;
      lines.push(`<package3d name="${xmlEsc(fp.name)}" urn="${xmlEsc(urn)}" type="model">`);
      lines.push(`<packageinstances>`);
      lines.push(`<packageinstance name="${xmlEsc(fp.name)}"/>`);
      lines.push(`</packageinstances>`);
      lines.push(`</package3d>`);
    }
    lines.push(`</packages3d>`);
  }

  // Symbols
  lines.push(`<symbols>`);
  for (const sym of symbols) {
    lines.push(generateSymbolXml(sym));
  }
  lines.push(`</symbols>`);

  // Devicesets (with package3dinstances inside each device)
  lines.push(`<devicesets>`);
  for (const ds of devicesets) {
    lines.push(generateDevicesetXml(ds, urnMap));
  }
  lines.push(`</devicesets>`);

  lines.push(`</library>`);
  lines.push(`</drawing>`);
  lines.push(`</eagle>`);
  return lines.join("\n");
}

// ── Tool registration ──
export function registerGenerateCustomLibrary(server: McpServer) {
  server.tool(
    "generate-custom-library",
    "Generate a complete Eagle .lbr XML library file from REC Standard Library parts. " +
    "Takes a list of deviceset names (BOM), extracts their full definitions (footprints, symbols, " +
    "pin-to-pad connects, graphics) from the REC library export, and produces a self-contained " +
    "custom library. This avoids Fusion 360 managed library versioning issues — one library, " +
    "one version, no USE command needed in scripts. " +
    "PREREQUISITE: Run export-library-v2.ulp on REC_Standard_Library in Fusion first. " +
    "IMPORTANT: Run download-datasheets BEFORE this tool to ensure custom component footprints are datasheet-verified.",
    {
      libraryName: z.string().describe("Name for the custom library (e.g. 'PCBLF0846_Custom')"),
      components: z.array(z.string()).describe(
        "List of REC deviceset names to include (e.g. ['10K_0805', '0.1UF_0805', 'ESP32-WROVER'])"
      ),
      customComponents: z.array(z.object({
        name: z.string().describe("Deviceset name"),
        description: z.string().optional(),
      })).optional().describe(
        "Names of custom components NOT in REC that you'll add manually to the library. " +
        "These are listed in output as placeholders you must define."
      ),
      sourceLibrary: z.string().optional().default("rec-library.json").describe(
        "Library JSON file name in library-data/ (default: rec-library.json)"
      ),
      checkVersion: z.boolean().optional().default(true).describe(
        "Check if library data is current (warns if export is old)"
      ),
      datasheetDirectory: z.string().optional().describe(
        "Path to datasheets/ directory. When provided with requireDatasheets=true, " +
        "verifies that datasheets exist for all custom components before generating."
      ),
      requireDatasheets: z.boolean().optional().default(true).describe(
        "When true and datasheetDirectory is set, refuse to generate if custom components " +
        "are missing datasheets. Set false to skip this check."
      ),
      include3dModels: z.boolean().optional().default(true).describe(
        "When true, queries the team 3D model API for STEP models matching each footprint " +
        "and embeds <packages3d> references in the library. Set false to skip."
      ),
    },
    async ({ libraryName, components, customComponents, sourceLibrary, checkVersion, datasheetDirectory, requireDatasheets, include3dModels }) => {
      // Load library data
      const lib = loadLibraryData(sourceLibrary);
      if (!lib) {
        const available = findLibraryFiles();
        return {
          content: [{
            type: "text" as const,
            text: `Library data file "${sourceLibrary}" not found in ${LIBRARY_DATA_DIR}.\n\n` +
              (available.length
                ? `Available files: ${available.join(", ")}\n\n`
                : "No library JSON files found.\n\n") +
              "To export: Open REC_Standard_Library in Fusion Library Editor, run export-library-v2.ulp, " +
              "save to ~/development/autodesk-coder/library-data/",
          }],
        };
      }

      // Version check
      const warnings: string[] = [];
      const isV2 = lib.format_version === 2;

      if (!isV2) {
        warnings.push(
          "WARNING: Library data is v1 format (missing pad sizes, graphics, connect mappings). " +
          "Run export-library-v2.ulp to get full data. Falling back to v1 with limited detail."
        );
      }

      if (checkVersion && lib.export_timestamp) {
        const exportDate = new Date(lib.export_timestamp * 1000);
        const ageMs = Date.now() - exportDate.getTime();
        const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
        if (ageDays > 30) {
          warnings.push(
            `WARNING: Library data is ${ageDays} days old (exported ${exportDate.toISOString().split("T")[0]}). ` +
            "Consider re-exporting with export-library-v2.ulp to capture any library updates."
          );
        }
      }

      // ── Datasheet gate: check custom components have datasheets ──
      if (customComponents?.length && datasheetDirectory && requireDatasheets) {
        let manifest: { datasheets?: { partNumber: string }[] } | null = null;
        const manifestPath = join(datasheetDirectory, "manifest.json");
        if (existsSync(manifestPath)) {
          try {
            manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
          } catch { /* ignore parse errors */ }
        }

        const manifestParts = new Set(
          (manifest?.datasheets || []).map((d) => d.partNumber.toLowerCase())
        );
        const missingDatasheets: string[] = [];
        for (const cc of customComponents) {
          if (!manifestParts.has(cc.name.toLowerCase())) {
            missingDatasheets.push(cc.name);
          }
        }

        if (missingDatasheets.length > 0) {
          return {
            content: [{
              type: "text" as const,
              text:
                `# Datasheet Gate — BLOCKED\n\n` +
                `${missingDatasheets.length} custom component(s) are missing datasheets:\n` +
                missingDatasheets.map((n) => `- **${n}**`).join("\n") +
                `\n\n` +
                `## Why this matters\n` +
                `Generating footprints without datasheets leads to incorrect pad dimensions, ` +
                `wrong package types, and board respins. All three footprint errors on the ` +
                `LM2596S buck converter project were caught by reviewing datasheets.\n\n` +
                `## How to fix\n` +
                `Run \`download-datasheets\` first:\n` +
                `\`\`\`\n` +
                `download-datasheets(\n` +
                `  projectPath: "${datasheetDirectory.replace(/\/datasheets\/?$/, "")}",\n` +
                `  components: [\n` +
                missingDatasheets.map((n) => `    { partNumber: "${n}" }`).join(",\n") +
                `\n  ]\n` +
                `)\n` +
                `\`\`\`\n\n` +
                `Or set \`requireDatasheets: false\` to skip this check (not recommended).`,
            }],
          };
        }

        // Datasheets present — add a verification note
        warnings.push(
          `Datasheet verification: ${customComponents.length} custom component(s) have datasheets in ${datasheetDirectory}. ` +
          `Run verify-footprint after generating to cross-check pad dimensions.`
        );
      }

      // Build lookup maps
      const dsMap = new Map<string, Deviceset>();
      for (const ds of lib.devicesets) dsMap.set(ds.name, ds);

      const fpMap = new Map<string, Footprint>();
      for (const fp of lib.footprints) fpMap.set(fp.name, fp);

      const symMap = new Map<string, Symbol>();
      for (const sym of lib.symbols) symMap.set(sym.name, sym);

      // Resolve requested components
      const foundDevicesets: Deviceset[] = [];
      const neededFootprints = new Set<string>();
      const neededSymbols = new Set<string>();
      const notFound: string[] = [];
      const resolved: string[] = [];

      for (const compName of components) {
        const ds = dsMap.get(compName);
        if (!ds) {
          notFound.push(compName);
          continue;
        }
        foundDevicesets.push(ds);
        resolved.push(compName);

        // Collect needed footprints
        for (const dev of ds.devices) {
          if (dev.footprint) neededFootprints.add(dev.footprint);
        }
        // Collect needed symbols
        for (const gate of ds.gates) {
          neededSymbols.add(gate.symbol);
        }
      }

      // Gather footprints and symbols
      const usedFootprints: Footprint[] = [];
      const missingFootprints: string[] = [];
      for (const fpName of neededFootprints) {
        const fp = fpMap.get(fpName);
        if (fp) usedFootprints.push(fp);
        else missingFootprints.push(fpName);
      }

      const usedSymbols: Symbol[] = [];
      const missingSymbols: string[] = [];
      for (const symName of neededSymbols) {
        const sym = symMap.get(symName);
        if (sym) usedSymbols.push(sym);
        else missingSymbols.push(symName);
      }

      if (missingFootprints.length) {
        warnings.push(`Missing footprints in export: ${missingFootprints.join(", ")}`);
      }
      if (missingSymbols.length) {
        warnings.push(`Missing symbols in export: ${missingSymbols.join(", ")}`);
      }

      // ── 3D model URN lookup for each unique footprint ──
      // Match footprint names against Autodesk's managed library URNs
      // (extracted from Fusion 360's bundled component libraries)
      const urnMap = new Map<string, string>();
      const models3dNotFound: string[] = [];

      if (include3dModels && usedFootprints.length > 0) {
        for (const fp of usedFootprints) {
          const urn = lookupManagedUrn(fp.name);
          if (urn) {
            urnMap.set(fp.name, urn);
          } else {
            models3dNotFound.push(fp.name);
          }
        }

        if (urnMap.size > 0) {
          warnings.push(
            `3D models: ${urnMap.size}/${usedFootprints.length} footprints matched Autodesk managed library URNs.`
          );
        }
      }

      // Generate the library XML
      const xml = generateLibraryXml(libraryName, foundDevicesets, usedFootprints, usedSymbols, urnMap);

      // Build report
      let report = `# Custom Library: ${libraryName}\n\n`;

      if (warnings.length) {
        report += `## Warnings\n${warnings.map(w => `- ${w}`).join("\n")}\n\n`;
      }

      report += `## Resolved from REC (${resolved.length})\n`;
      for (const name of resolved) {
        const ds = dsMap.get(name)!;
        const fp = ds.devices[0]?.footprint || "none";
        report += `- ${name} → ${fp}\n`;
      }

      if (notFound.length) {
        report += `\n## NOT FOUND in REC (${notFound.length})\n`;
        report += notFound.map(n => `- ${n}`).join("\n") + "\n";
        report += "\nThese must be created manually in the library.\n";
      }

      if (customComponents?.length) {
        report += `\n## Custom Components (manual)\n`;
        for (const cc of customComponents) {
          report += `- ${cc.name}${cc.description ? ` — ${cc.description}` : ""}\n`;
        }
        report += "\nAdd these to the generated .lbr XML with their own package/symbol/deviceset.\n";
      }

      // Library data version info
      report += `\n## Source Library\n`;
      report += `- File: ${sourceLibrary}\n`;
      report += `- Format: v${lib.format_version || 1}\n`;
      if (lib.export_timestamp) {
        const d = new Date(lib.export_timestamp * 1000);
        report += `- Exported: ${d.toISOString().split("T")[0]}\n`;
      }
      const libName = lib.library_name.split("/").pop()?.replace(/\s*v\d+\.lbr$/, "") || lib.library_name;
      report += `- Source: ${libName}\n`;
      report += `- Total parts available: ${lib.devicesets.length}\n`;

      // 3D model coverage
      if (include3dModels) {
        report += `\n## 3D Models (Autodesk Managed URNs)\n`;
        if (urnMap.size > 0) {
          report += `Matched ${urnMap.size} of ${usedFootprints.length} footprints to Autodesk cloud 3D assets:\n`;
          for (const [fpName, urn] of urnMap) {
            report += `- ${fpName} → ${urn}\n`;
          }
          report += `\nThese use real Autodesk managed library URNs — Fusion 360 will resolve and render them automatically in 3D view.\n`;
        }
        if (models3dNotFound.length > 0) {
          report += `\nNo managed URN found (${models3dNotFound.length}):\n`;
          for (const name of models3dNotFound) {
            report += `- ${name}\n`;
          }
          report += `\nThese packages are not in Autodesk's managed libraries. ` +
            `To add 3D models: open the footprint in Fusion Package Editor and use "Assign 3D Package" to upload a STEP file.\n`;
        }
      }

      report += `\n## Summary\n`;
      report += `- Devicesets: ${foundDevicesets.length}\n`;
      report += `- Footprints: ${usedFootprints.length}\n`;
      report += `- Symbols: ${usedSymbols.length}\n`;
      if (include3dModels) {
        report += `- 3D Models: ${urnMap.size}/${usedFootprints.length}\n`;
      }

      report += `\n## Usage\n`;
      report += `1. Save the XML below as \`${libraryName}.lbr\`\n`;
      report += `2. Import into Fusion 360 Library Manager (drag & drop or File > Import)\n`;
      report += `3. Toggle Active in Library Manager\n`;
      report += `4. In SCR scripts: no USE command needed — just plain ADD commands\n`;

      report += `\n---\n\n\`\`\`xml\n${xml}\n\`\`\``;

      return { content: [{ type: "text" as const, text: report }] };
    }
  );

  // ── Companion tool: check library data freshness ──
  server.tool(
    "check-library-version",
    "Check the freshness of the REC Standard Library export data. Reports version, " +
    "export date, and whether a re-export is recommended. Use before generate-custom-library " +
    "to ensure you're working with current data.",
    {
      sourceLibrary: z.string().optional().default("rec-library.json").describe(
        "Library JSON file name in library-data/"
      ),
    },
    async ({ sourceLibrary }) => {
      const files = findLibraryFiles();
      if (files.length === 0) {
        return {
          content: [{
            type: "text" as const,
            text: `No library data files found in ${LIBRARY_DATA_DIR}.\n\n` +
              "To export: Open REC_Standard_Library in Fusion Library Editor, " +
              "run export-library-v2.ulp, save to the library-data directory.",
          }],
        };
      }

      let report = "# Library Data Status\n\n";

      for (const file of files) {
        const lib = loadLibraryData(file);
        if (!lib) continue;

        const libName = lib.library_name.split("/").pop()?.replace(/\s*v\d+\.lbr$/, "") || lib.library_name;
        const version = lib.format_version || 1;
        const isV2 = version === 2;

        report += `## ${file}\n`;
        report += `- Library: ${libName}\n`;
        report += `- Format: v${version}${isV2 ? " (full detail)" : " (basic — missing pad sizes, graphics)"}\n`;

        if (lib.export_timestamp) {
          const exportDate = new Date(lib.export_timestamp * 1000);
          const ageMs = Date.now() - exportDate.getTime();
          const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
          report += `- Exported: ${exportDate.toISOString().split("T")[0]} (${ageDays} days ago)\n`;

          if (ageDays > 30) {
            report += `- **STALE** — recommend re-export\n`;
          } else {
            report += `- Current\n`;
          }
        } else {
          report += `- Export date: unknown (v1 format — no timestamp)\n`;
          report += `- **NEEDS RE-EXPORT** with export-library-v2.ulp\n`;
        }

        report += `- Devicesets: ${lib.devicesets?.length || 0}\n`;
        report += `- Footprints: ${lib.footprints?.length || 0}\n`;
        report += `- Symbols: ${lib.symbols?.length || 0}\n\n`;
      }

      report += `## Recommended Action\n`;
      const hasV2 = files.some(f => {
        const d = loadLibraryData(f);
        return d && d.format_version === 2;
      });

      if (!hasV2) {
        report += "No v2 exports found. Run export-library-v2.ulp on REC_Standard_Library " +
          "in Fusion Library Editor to get full detail (pad sizes, graphics, connect mappings).\n";
      } else {
        report += "v2 data available. Use generate-custom-library to build project-specific libraries.\n";
      }

      return { content: [{ type: "text" as const, text: report }] };
    }
  );
}
