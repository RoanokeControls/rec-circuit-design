import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { circuitFormulas, FormulaCategory } from "../knowledge/circuit-formulas.js";

export function registerLookupFormula(server: McpServer) {
  server.tool(
    "lookup-formula",
    "Look up circuit design formulas — Ohm's law, LED resistor sizing, voltage dividers, 555 timer, op-amp gain/summing/difference/transimpedance, transistor switch, I2C pull-ups, solar cell arrays, Hall sensors, CMOS oscillators (4011/4049/4070), active filters (Sallen-Key, notch, bandpass), LM386 audio amp, antenna sizing, and more. 41 formulas with worked examples and REC-specific notes.",
    {
      query: z.string().optional().describe("Search term — matches formula name, category, id, or notes"),
      category: z.string().optional().describe("Filter by category: resistor, capacitor, led, voltage-divider, zener-regulator, transistor-switch, 555-timer, op-amp, rc-filter, power, relay-driver, sensor, solar, hall-sensor, cmos, active-filter, audio, antenna"),
    },
    async ({ query, category }) => {
      let results = circuitFormulas;

      if (category) {
        const cat = category.toLowerCase() as FormulaCategory;
        results = results.filter((f) => f.category === cat);
      }

      if (query) {
        const q = query.toLowerCase();
        results = results.filter((f) =>
          f.name.toLowerCase().includes(q) ||
          f.id.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          (f.notes && f.notes.toLowerCase().includes(q))
        );
      }

      if (results.length === 0) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              matchCount: 0,
              hint: "No formulas matched. Available categories: " +
                [...new Set(circuitFormulas.map((f) => f.category))].join(", "),
              allFormulas: circuitFormulas.map((f) => ({ id: f.id, name: f.name, category: f.category })),
            }, null, 2),
          }],
        };
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            formulas: results,
          }, null, 2),
        }],
      };
    }
  );
}
