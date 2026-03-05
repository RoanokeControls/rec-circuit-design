import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { DesignPart } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MASTER_JSON = join(__dirname, "..", "..", "aps-export-output", "master.json");

// Power/frame symbols to filter out of BOMs
const SUPPLY_SYMBOLS = new Set([
  "GND", "AGND", "DGND", "+5V", "+3.3V", "+12V", "+24V",
  "VCC", "VDD", "VSS", "V+", "V-",
  "FRAME-A4", "FRAME-A3", "FRAME-LETTER", "FRAME-TABLOID",
]);

// ── Lazy-loaded cache ──

interface MasterDesign {
  design_name: string;
  parts: {
    ref: string;
    value: string;
    deviceset: string;
    package: string;
    library: string;
    smd: boolean;
  }[];
  parts_summary?: {
    total: number;
    smd: number;
    through_hole: number;
  };
}

let designMap: Map<string, MasterDesign> | null = null;

async function loadMaster(): Promise<Map<string, MasterDesign>> {
  if (designMap) return designMap;

  const raw = await readFile(MASTER_JSON, "utf-8");
  const data = JSON.parse(raw) as { designs: MasterDesign[] };

  designMap = new Map();
  for (const d of data.designs) {
    designMap.set(d.design_name.toLowerCase(), d);
  }
  return designMap;
}

/**
 * Get the BOM for a specific design, filtering out power/frame symbols.
 */
export async function getDesignBom(designName: string): Promise<DesignPart[] | null> {
  const map = await loadMaster();

  // Exact match first
  let design = map.get(designName.toLowerCase());

  // Fuzzy match: try partial
  if (!design) {
    const q = designName.toLowerCase();
    for (const [key, val] of map) {
      if (key.includes(q) || q.includes(key)) {
        design = val;
        break;
      }
    }
  }

  if (!design) return null;

  return design.parts
    .filter((p) => !SUPPLY_SYMBOLS.has(p.deviceset) && !SUPPLY_SYMBOLS.has(p.value))
    .map((p) => ({
      ref: p.ref,
      value: p.value,
      deviceset: p.deviceset,
      package: p.package,
      library: p.library,
      smd: p.smd,
    }));
}

/**
 * Get all 261 design names.
 */
export async function getDesignNames(): Promise<string[]> {
  const map = await loadMaster();
  // Return original-case names
  return Array.from(map.values()).map((d) => d.design_name).sort();
}

/**
 * Fuzzy-match a design name and return suggestions if no exact match.
 */
export async function findDesign(query: string): Promise<{ name: string; score: number }[]> {
  const map = await loadMaster();
  const q = query.toLowerCase();

  const results: { name: string; score: number }[] = [];
  for (const design of map.values()) {
    const name = design.design_name.toLowerCase();
    if (name === q) {
      results.push({ name: design.design_name, score: 1.0 });
    } else if (name.includes(q) || q.includes(name)) {
      results.push({ name: design.design_name, score: 0.7 });
    } else {
      // Token overlap
      const qTokens = q.split(/[_\-\s]+/);
      const nTokens = name.split(/[_\-\s]+/);
      const overlap = qTokens.filter((t) => nTokens.some((n) => n.includes(t) || t.includes(n)));
      if (overlap.length > 0) {
        results.push({ name: design.design_name, score: overlap.length / Math.max(qTokens.length, nTokens.length) });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
