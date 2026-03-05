/**
 * Maps REC deviceset names to distributor-searchable queries.
 * Uses naming patterns + DBA crosswalk for manufacturer descriptions.
 */

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CROSSWALK_PATH = join(__dirname, "..", "..", "data", "dba_rec_crosswalk.json");

// ── Crosswalk (lazy-loaded) ──

interface CrosswalkEntry {
  dba_code: string;
  dba_description: string;
  category: string;
  parsed_value: string | null;
  parsed_package: string | null;
  rec_deviceset?: string;
  rec_package?: string;
}

let crosswalkByDeviceset: Map<string, CrosswalkEntry> | null = null;

async function loadCrosswalk(): Promise<Map<string, CrosswalkEntry>> {
  if (crosswalkByDeviceset) return crosswalkByDeviceset;

  crosswalkByDeviceset = new Map();
  try {
    const raw = await readFile(CROSSWALK_PATH, "utf-8");
    const entries = JSON.parse(raw) as CrosswalkEntry[];
    for (const entry of entries) {
      if (entry.rec_deviceset) {
        crosswalkByDeviceset.set(entry.rec_deviceset.toLowerCase(), entry);
      }
    }
  } catch {
    // Crosswalk file missing — proceed with pattern-based strategy only
  }
  return crosswalkByDeviceset;
}

// ── Category detection from deviceset name ──

type PartCategory = "resistor" | "capacitor" | "inductor" | "diode" | "led" | "ic" | "connector" | "crystal" | "fuse" | "relay" | "other";

function detectCategory(deviceset: string): PartCategory {
  const ds = deviceset.toUpperCase();

  // Resistor patterns: 10K_0805, 100R_0603, 4.7K_0402, 0OHM_0603
  if (/^\d+\.?\d*[KMR]?_\d{4}/.test(ds) && !ds.includes("UF") && !ds.includes("PF") && !ds.includes("NF")) {
    return "resistor";
  }
  if (/OHM/.test(ds)) return "resistor";

  // Capacitor patterns: 0.1UF_0805, 100NF_0603, 10PF_0402, 100UF_ELEC
  if (/\d+\.?\d*(UF|NF|PF)/.test(ds)) return "capacitor";

  // Inductor patterns: 10UH, 100NH
  if (/\d+\.?\d*(UH|NH|MH)/.test(ds)) return "inductor";

  // Crystal patterns: frequencies
  if (/\d+\.?\d*MHZ/.test(ds) || /\d+\.?\d*KHZ/.test(ds)) return "crystal";

  // LED patterns
  if (ds.startsWith("LED") || ds.includes("_LED")) return "led";

  // Diode patterns
  if (ds.startsWith("1N") || ds.startsWith("BAT") || ds.startsWith("SS") || ds.startsWith("PMBD")) return "diode";

  // Fuse
  if (ds.includes("FUSE") || ds.startsWith("PTC")) return "fuse";

  // Relay
  if (ds.includes("RELAY")) return "relay";

  // Connector patterns
  if (ds.includes("CONN") || ds.includes("HEADER") || ds.includes("TERMINAL") || ds.includes("JST")) return "connector";

  // IC patterns — anything with letters that looks like a part number
  if (/^[A-Z]{2,}/.test(ds) && /\d/.test(ds)) return "ic";

  return "other";
}

// ── Value extraction from deviceset name ──

function extractResistorValue(deviceset: string): string {
  // "10K_0805_1%" → "10K"
  const m = deviceset.match(/^(\d+\.?\d*[KMR]?)/i);
  if (m) {
    let v = m[1].toUpperCase();
    // "10K" → "10K ohm"
    if (v.endsWith("K") || v.endsWith("M")) return v + " ohm";
    if (v.endsWith("R")) return v.replace(/R$/, "") + " ohm";
    return v + " ohm";
  }
  return deviceset;
}

function extractPackageSize(deviceset: string): string | null {
  const m = deviceset.match(/(?:^|_)(\d{4})(?:_|$)/);
  return m ? m[1] : null;
}

/**
 * Build a search query suitable for DigiKey keyword search.
 */
export async function buildSearchQuery(deviceset: string, value?: string): Promise<string> {
  const crosswalk = await loadCrosswalk();

  // Check crosswalk first — DBA description is often a great search term
  const cwEntry = crosswalk.get(deviceset.toLowerCase());
  if (cwEntry?.dba_description && !cwEntry.dba_description.includes("CUSTOMER SUPPLIED")) {
    // Clean up DBA description: remove "LF" suffix, trim
    return cwEntry.dba_description.replace(/\s+LF$/i, "").trim();
  }

  const category = detectCategory(deviceset);
  const pkg = extractPackageSize(deviceset);

  switch (category) {
    case "resistor": {
      const val = extractResistorValue(deviceset);
      const parts = [val, pkg, "resistor SMD"].filter(Boolean);
      return parts.join(" ");
    }
    case "capacitor": {
      // "0.1UF_0805" → "0.1uF 0805 capacitor ceramic"
      const m = deviceset.match(/(\d+\.?\d*(?:UF|NF|PF))/i);
      const val = m ? m[1] : value ?? deviceset;
      const parts = [val, pkg, "capacitor ceramic"].filter(Boolean);
      return parts.join(" ");
    }
    case "inductor": {
      const m = deviceset.match(/(\d+\.?\d*(?:UH|NH|MH))/i);
      const val = m ? m[1] : value ?? deviceset;
      return [val, pkg, "inductor SMD"].filter(Boolean).join(" ");
    }
    case "crystal": {
      const m = deviceset.match(/(\d+\.?\d*(?:MHZ|KHZ))/i);
      const val = m ? m[1] : deviceset;
      return [val, "crystal"].join(" ");
    }
    case "diode":
      return deviceset.split("_")[0]; // Use part number directly
    case "led":
      return [deviceset.replace(/_/g, " "), "LED SMD"].join(" ");
    case "fuse":
      return [deviceset.replace(/_/g, " "), "fuse"].join(" ");
    case "ic":
      // ICs: use deviceset as MPN search (e.g., PIC18F46K22, LM7805)
      return deviceset.split("_")[0];
    case "connector":
      return deviceset.replace(/_/g, " ");
    default:
      // Fall back to value if available, otherwise deviceset
      return value || deviceset.replace(/_/g, " ");
  }
}
