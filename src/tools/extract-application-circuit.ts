import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { minedPowerSupplies, minedDecoupling } from "../knowledge/index.js";
import type { MinedPowerSupply, DecouplingPattern } from "../types/index.js";

// ── Curated (datasheet-derived) types and data ──

interface ComponentSpec {
  ref: string;
  type: string;
  value: string;
  notes: string;
  formula?: string;
}

interface Configuration {
  name: string;
  components: ComponentSpec[];
  layoutNotes: string[];
}

interface ApplicationCircuit {
  partFamily: string;
  matchPattern: RegExp;
  configurations: Configuration[];
}

const APPLICATION_CIRCUITS: ApplicationCircuit[] = [
  {
    partFamily: "LM2596",
    matchPattern: /lm2596/i,
    configurations: [
      {
        name: "adjustable output",
        components: [
          { ref: "CIN", type: "electrolytic capacitor", value: "680uF/50V", notes: "Low ESR. Place within 50mm of VIN pin. Required for stable operation." },
          { ref: "COUT", type: "electrolytic capacitor", value: "220uF/50V", notes: "Low ESR required. Output ripple directly affected by ESR." },
          { ref: "L1", type: "inductor", value: "33uH", notes: "Saturation current >= 3A. Use inductor selection guide in datasheet. 33uH for adjustable version." },
          { ref: "D1", type: "schottky diode", value: "1N5824 or SS34", notes: "Must be Schottky. 3A, 40V minimum. Do NOT use standard recovery diodes." },
          { ref: "R1", type: "resistor", value: "1K", notes: "Fixed resistor between FB pin and GND. Sets Vout minimum.", formula: "Vout = 1.235V * (1 + R2/R1)" },
          { ref: "R2/VR1", type: "potentiometer", value: "0-50K", notes: "For 1.2-37V range with R1=1K: use 50K pot. Vout = 1.235 * (1 + R2/1000)." },
          { ref: "CFF", type: "capacitor", value: "optional, ~10nF", notes: "Feedforward cap across R2. Improves transient response." },
        ],
        layoutNotes: [
          "Keep CIN within 50mm of VIN pin (pin 1)",
          "Minimize copper area on Output pin (pin 2) — this is the high-dV/dt switching node",
          "Keep the loop D1-cathode → L1 → COUT → GND → D1-anode as tight as possible",
          "Ground plane under IC recommended",
          "Route FB trace away from switching node — sensitive high-impedance signal",
          "ON/OFF pin: tie to GND for always-on, or pull above 1.3V to shutdown (max 25V)",
          "Thermal pad (pin 3 / tab) is GND — connect to ground plane with multiple vias",
        ],
      },
      {
        name: "5V fixed",
        components: [
          { ref: "CIN", type: "electrolytic capacitor", value: "680uF/50V", notes: "Low ESR. Place within 50mm of VIN pin." },
          { ref: "COUT", type: "electrolytic capacitor", value: "220uF/25V", notes: "Low ESR required." },
          { ref: "L1", type: "inductor", value: "33uH", notes: "Saturation current >= 3A." },
          { ref: "D1", type: "schottky diode", value: "1N5824", notes: "3A 40V Schottky required." },
        ],
        layoutNotes: [
          "Fixed output version — no feedback resistors needed",
          "Same layout rules as adjustable version",
          "Keep CIN within 50mm of VIN pin",
          "Minimize switching node copper area",
        ],
      },
      {
        name: "3.3V fixed",
        components: [
          { ref: "CIN", type: "electrolytic capacitor", value: "680uF/50V", notes: "Low ESR." },
          { ref: "COUT", type: "electrolytic capacitor", value: "220uF/10V", notes: "Low ESR required." },
          { ref: "L1", type: "inductor", value: "68uH", notes: "Higher inductance for lower output. Saturation >= 3A." },
          { ref: "D1", type: "schottky diode", value: "1N5824", notes: "3A 40V Schottky required." },
        ],
        layoutNotes: [
          "Fixed output version — no feedback resistors needed",
          "68uH inductor required for 3.3V output (not 33uH)",
        ],
      },
    ],
  },
  {
    partFamily: "LM317",
    matchPattern: /lm317/i,
    configurations: [
      {
        name: "adjustable output",
        components: [
          { ref: "CIN", type: "capacitor", value: "0.1uF", notes: "Required if LM317 is far from power supply filter." },
          { ref: "COUT", type: "capacitor", value: "1uF tantalum", notes: "Improves transient response." },
          { ref: "R1", type: "resistor", value: "240 ohm", notes: "Between OUT and ADJ pins.", formula: "Vout = 1.25V * (1 + R2/R1) + Iadj*R2" },
          { ref: "R2", type: "resistor or pot", value: "calculated", notes: "Between ADJ and GND. R2 = R1 * ((Vout/1.25) - 1)." },
          { ref: "D1", type: "diode", value: "1N4002", notes: "Protection diode, cathode to input. Required if CIN > 25uF." },
          { ref: "D2", type: "diode", value: "1N4002", notes: "Protection diode, cathode to output. Required if COUT > 25uF." },
        ],
        layoutNotes: [
          "ADJ pin is high impedance — keep trace short and away from noise",
          "Heatsink required for high Vin-Vout differential at load",
        ],
      },
    ],
  },
  {
    partFamily: "NCP1117",
    matchPattern: /ncp1117/i,
    configurations: [
      {
        name: "3.3V fixed",
        components: [
          { ref: "CIN", type: "ceramic capacitor", value: "10uF", notes: "X7R or X5R. Place close to input pin." },
          { ref: "COUT", type: "ceramic capacitor", value: "10uF", notes: "X7R or X5R. Required for stability." },
        ],
        layoutNotes: [
          "SOT-223 package — tab is output pin",
          "Route output trace from tab pad for best thermal performance",
          "Input and output caps must be within 10mm of IC",
        ],
      },
    ],
  },
  {
    partFamily: "AOZ6662",
    matchPattern: /aoz6662/i,
    configurations: [
      {
        name: "adjustable output",
        components: [
          { ref: "CIN", type: "ceramic capacitor", value: "22uF", notes: "X5R/X7R, voltage rating > Vin max." },
          { ref: "COUT", type: "ceramic capacitor", value: "22uF", notes: "X5R/X7R." },
          { ref: "L1", type: "inductor", value: "4.7uH", notes: "For 5V output. Saturation >= 2A." },
          { ref: "CBOOT", type: "capacitor", value: "0.1uF", notes: "Bootstrap cap. Place close to BOOT and SW pins." },
          { ref: "R1", type: "resistor", value: "calculated", notes: "Upper feedback. R1 = R2 * ((Vout/0.8) - 1)." },
          { ref: "R2", type: "resistor", value: "10K-100K", notes: "Lower feedback to GND." },
        ],
        layoutNotes: [
          "Minimize SW node copper area",
          "Input cap close to VIN and GND pins",
          "Feedback divider close to FB pin, away from SW node",
          "Exposed pad is GND — use multiple vias to ground plane",
        ],
      },
    ],
  },
];

// ── Curated tier helpers ──

function findCuratedCircuit(partNumber: string): ApplicationCircuit | undefined {
  return APPLICATION_CIRCUITS.find((c) => c.matchPattern.test(partNumber));
}

function calculateR2ForLM317(outputVoltage: number): string {
  const r1 = 240;
  const r2 = r1 * ((outputVoltage / 1.25) - 1);
  return `${Math.round(r2)} ohm`;
}

function calculateR2ForLM2596(outputVoltage: number): string {
  const r1 = 1000;
  const r2 = r1 * ((outputVoltage / 1.235) - 1);
  return `${Math.round(r2)} ohm`;
}

function calculateFeedbackForAOZ6662(outputVoltage: number, r2: number = 10000): { r1: string; r2: string } {
  const r1 = r2 * ((outputVoltage / 0.8) - 1);
  return { r1: `${Math.round(r1)} ohm`, r2: `${r2} ohm` };
}

function applyCalculations(
  circuit: ApplicationCircuit,
  config: Configuration,
  outputVoltage?: number,
): Configuration {
  if (!outputVoltage) return config;

  const updatedComponents = config.components.map((comp) => {
    const updated = { ...comp };

    if (circuit.partFamily === "LM2596" && config.name === "adjustable output") {
      if (comp.ref === "R2/VR1" && outputVoltage) {
        const calculatedR2 = calculateR2ForLM2596(outputVoltage);
        updated.value = calculatedR2;
        updated.notes = `Calculated for Vout=${outputVoltage}V with R1=1K. ${comp.notes}`;
      }
    }

    if (circuit.partFamily === "LM317" && config.name === "adjustable output") {
      if (comp.ref === "R2" && outputVoltage) {
        const calculatedR2 = calculateR2ForLM317(outputVoltage);
        updated.value = calculatedR2;
        updated.notes = `Calculated for Vout=${outputVoltage}V with R1=240ohm. ${comp.notes}`;
      }
    }

    if (circuit.partFamily === "AOZ6662" && config.name === "adjustable output") {
      if (comp.ref === "R1" && outputVoltage) {
        const fb = calculateFeedbackForAOZ6662(outputVoltage);
        updated.value = fb.r1;
        updated.notes = `Calculated for Vout=${outputVoltage}V with R2=${fb.r2}. ${comp.notes}`;
      }
    }

    return updated;
  });

  return { ...config, components: updatedComponents };
}

// ── Mined data tier helpers ──

/**
 * Fuzzy-match a part number against the mined power supply regulator names.
 * Strips common suffixes (-ADJ, -3.3, -5.0, package codes) and does
 * case-insensitive substring matching in both directions.
 */
function findMinedSupply(partNumber: string): MinedPowerSupply | undefined {
  const needle = partNumber.toUpperCase().replace(/[-_]/g, "");

  // Exact match first
  const exact = minedPowerSupplies.find(
    (s) => s.regulator.toUpperCase().replace(/[-_]/g, "") === needle,
  );
  if (exact) return exact;

  // Needle contains regulator name (e.g. "LM2596S-ADJ" contains "LM2596")
  const containsMatch = minedPowerSupplies.find((s) => {
    const reg = s.regulator.toUpperCase().replace(/[-_]/g, "");
    return needle.includes(reg) || reg.includes(needle);
  });
  if (containsMatch) return containsMatch;

  // Strip trailing package/variant suffixes and retry
  const stripped = needle.replace(/(ADJ|33|50|12|S|T|D|P|N|SMT)$/g, "");
  if (stripped.length >= 3) {
    return minedPowerSupplies.find((s) => {
      const reg = s.regulator.toUpperCase().replace(/[-_]/g, "");
      return stripped.includes(reg) || reg.includes(stripped);
    });
  }

  return undefined;
}

/**
 * Find decoupling patterns for a given IC. Tries exact match first,
 * then fuzzy substring matching.
 */
function findMinedDecoupling(partNumber: string): DecouplingPattern | undefined {
  const needle = partNumber.toUpperCase().replace(/[-_]/g, "");

  const exact = minedDecoupling.find(
    (d) => d.icValue.toUpperCase().replace(/[-_]/g, "") === needle,
  );
  if (exact) return exact;

  return minedDecoupling.find((d) => {
    const ic = d.icValue.toUpperCase().replace(/[-_]/g, "");
    return needle.includes(ic) || ic.includes(needle);
  });
}

/**
 * Sort a Record<string, number> by count descending, return as array of {name, count}.
 */
function sortedNets(nets: Record<string, number>): { name: string; count: number }[] {
  return Object.entries(nets)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, count }));
}

/**
 * Build a mined application circuit response from real design data.
 */
function buildMinedResponse(
  partNumber: string,
  supply: MinedPowerSupply,
  decoupling: DecouplingPattern | undefined,
  manifest: Record<string, unknown> | null,
  manifestPath: string,
  parameters: Record<string, unknown>,
) {
  const inputRails = sortedNets(supply.inputNets);
  const outputRails = sortedNets(supply.outputNets);

  const supportComponents = supply.components.map((comp) => ({
    role: comp.role,
    preferredValue: comp.preferredValue,
    allObservedValues: comp.values,
    observedCount: comp.count,
  }));

  const decouplingInfo = decoupling
    ? {
        icValue: decoupling.icValue,
        icCategory: decoupling.icCategory,
        occurrences: decoupling.occurrences,
        designRule: decoupling.designRule,
        caps: decoupling.caps.map((cap) => ({
          role: cap.role,
          preferredValue: cap.preferredValue,
          allObservedValues: cap.values,
          placementDistance: {
            medianMm: cap.medianDistanceMm,
            p25Mm: cap.p25Mm,
            p75Mm: cap.p75Mm,
          },
          observedCount: cap.count,
        })),
        sourceDesigns: decoupling.sourceDesigns,
      }
    : null;

  return {
    partNumber,
    regulator: supply.regulator,
    dataSource: `mined (from ${supply.occurrences} production designs)`,
    topology: supply.topology,
    occurrences: supply.occurrences,
    manifestFound: manifest !== null,
    manifestPath,
    parameters,
    inputRails,
    outputRails,
    supportComponents,
    decoupling: decouplingInfo,
    sourceDesigns: supply.sourceDesigns,
    note: "This circuit data was mined from real production designs, not from a datasheet. "
      + "Preferred values reflect the most commonly used parts across designs. "
      + "Always verify critical values (feedback resistors, inductors) against the datasheet.",
  };
}

// ── Tool registration ──

export function registerExtractApplicationCircuit(server: McpServer) {
  server.tool(
    "extract-application-circuit",
    "Extract recommended application circuit for a part. Returns component values, formulas, and layout notes. "
      + "Curated datasheet data available for: " + APPLICATION_CIRCUITS.map((c) => c.partFamily).join(", ")
      + ". Mined production data available for " + minedPowerSupplies.length + " additional regulators from "
      + minedPowerSupplies.reduce((sum, s) => sum + s.occurrences, 0) + " real board designs.",
    {
      datasheetDirectory: z.string().describe("Path to datasheets/ directory containing manifest.json"),
      partNumber: z.string().describe("Part number to look up (e.g., 'LM2596S-ADJ')"),
      configuration: z.string().optional().describe("Target configuration (e.g., 'adjustable output', '5V fixed', '3.3V fixed')"),
      inputVoltage: z.number().optional().describe("Expected input voltage in volts"),
      outputVoltage: z.number().optional().describe("Desired output voltage in volts"),
      outputCurrent: z.number().optional().describe("Expected output current in amps"),
    },
    async ({ datasheetDirectory, partNumber, configuration, inputVoltage, outputVoltage, outputCurrent }) => {
      // Read manifest if available
      const manifestPath = join(datasheetDirectory, "manifest.json");
      let manifest: Record<string, unknown> | null = null;

      if (existsSync(manifestPath)) {
        try {
          manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
        } catch {
          // manifest unreadable — continue with knowledge base only
        }
      }

      const parameters = {
        configuration: configuration || "all",
        inputVoltage: inputVoltage || "not specified",
        outputVoltage: outputVoltage || "not specified",
        outputCurrent: outputCurrent || "not specified",
      };

      // ── Tier 1: Curated datasheet circuits ──
      const curatedCircuit = findCuratedCircuit(partNumber);

      if (curatedCircuit) {
        let configs = curatedCircuit.configurations;
        if (configuration) {
          const match = configs.filter((c) =>
            c.name.toLowerCase().includes(configuration.toLowerCase())
          );
          if (match.length > 0) {
            configs = match;
          }
        }

        const processedConfigs = configs.map((config) =>
          applyCalculations(curatedCircuit, config, outputVoltage)
        );

        // Also check if mined data can supplement the curated data
        const minedSupply = findMinedSupply(partNumber);
        const minedDecouplingMatch = findMinedDecoupling(partNumber);

        const supplementary: Record<string, unknown> = {};
        if (minedSupply) {
          supplementary.minedUsageData = {
            note: `Also found in ${minedSupply.occurrences} production designs — showing real-world usage alongside datasheet recommendations`,
            topology: minedSupply.topology,
            occurrences: minedSupply.occurrences,
            commonInputRails: sortedNets(minedSupply.inputNets).slice(0, 5),
            commonOutputRails: sortedNets(minedSupply.outputNets).slice(0, 5),
            observedSupportComponents: minedSupply.components.map((comp) => ({
              role: comp.role,
              preferredValue: comp.preferredValue,
              observedCount: comp.count,
            })),
            sourceDesigns: minedSupply.sourceDesigns,
          };
        }
        if (minedDecouplingMatch) {
          supplementary.minedDecoupling = {
            note: `Decoupling data from ${minedDecouplingMatch.occurrences} production designs`,
            caps: minedDecouplingMatch.caps.map((cap) => ({
              role: cap.role,
              preferredValue: cap.preferredValue,
              placementDistance: {
                medianMm: cap.medianDistanceMm,
                p25Mm: cap.p25Mm,
                p75Mm: cap.p75Mm,
              },
              observedCount: cap.count,
            })),
          };
        }

        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              partNumber,
              partFamily: curatedCircuit.partFamily,
              dataSource: "curated (from datasheet)",
              manifestFound: manifest !== null,
              manifestPath: existsSync(manifestPath) ? manifestPath : "not found",
              parameters,
              configurations: processedConfigs.map((config) => ({
                name: config.name,
                components: config.components,
                layoutNotes: config.layoutNotes,
              })),
              ...supplementary,
            }, null, 2),
          }],
        };
      }

      // ── Tier 2: Mined production design data ──
      const minedSupply = findMinedSupply(partNumber);

      if (minedSupply) {
        const decoupling = findMinedDecoupling(partNumber);
        const result = buildMinedResponse(
          partNumber,
          minedSupply,
          decoupling,
          manifest,
          existsSync(manifestPath) ? manifestPath : "not found",
          parameters,
        );

        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          }],
        };
      }

      // ── Tier 3: Check decoupling only (non-power-supply ICs) ──
      const decouplingOnly = findMinedDecoupling(partNumber);

      if (decouplingOnly) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              partNumber,
              dataSource: `mined decoupling (from ${decouplingOnly.occurrences} production designs)`,
              manifestFound: manifest !== null,
              manifestPath: existsSync(manifestPath) ? manifestPath : "not found",
              parameters,
              note: "No power supply circuit data found for this part, but decoupling patterns are available from production designs.",
              decoupling: {
                icValue: decouplingOnly.icValue,
                icCategory: decouplingOnly.icCategory,
                occurrences: decouplingOnly.occurrences,
                designRule: decouplingOnly.designRule,
                caps: decouplingOnly.caps.map((cap) => ({
                  role: cap.role,
                  preferredValue: cap.preferredValue,
                  allObservedValues: cap.values,
                  placementDistance: {
                    medianMm: cap.medianDistanceMm,
                    p25Mm: cap.p25Mm,
                    p75Mm: cap.p75Mm,
                  },
                  observedCount: cap.count,
                })),
                sourceDesigns: decouplingOnly.sourceDesigns,
              },
            }, null, 2),
          }],
        };
      }

      // ── No match in any tier ──
      const allKnown = [
        ...APPLICATION_CIRCUITS.map((c) => `${c.partFamily} (curated)`),
        ...minedPowerSupplies.map((s) => `${s.regulator} (mined, ${s.occurrences} designs)`),
      ];

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            partNumber,
            error: "Part not found in application circuit database",
            message: `No application circuit data for '${partNumber}'.`,
            availableParts: allKnown,
            decouplingPatternsAvailable: minedDecoupling.length,
            manifestFound: manifest !== null,
            manifestPath: existsSync(manifestPath) ? manifestPath : "not found",
          }, null, 2),
        }],
      };
    }
  );
}
