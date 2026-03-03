import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedDecoupling } from "../knowledge/index.js";

export function registerLookupDecouplingPattern(server: McpServer) {
  server.tool(
    "lookup-decoupling-pattern",
    "Look up how REC decouples a specific IC, with measured pad-to-pad distances from 261 real designs. Shows bypass cap values, placement distances, and design rules.",
    {
      icValue: z.string().describe("IC value or part number to search for (e.g. 'NCP1117', 'PIC18F26', 'ESP32')"),
      capValue: z.string().optional().describe("Optional: filter by specific cap value (e.g. '0.1UF', '10UF')"),
    },
    async ({ icValue, capValue }) => {
      const q = icValue.toLowerCase();
      let matches = minedDecoupling.filter(
        (p) =>
          p.icValue.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.icCategory.toLowerCase().includes(q)
      );

      if (capValue) {
        const cv = capValue.toLowerCase();
        matches = matches.filter((p) =>
          p.caps.some((c) => c.preferredValue.toLowerCase().includes(cv))
        );
      }

      if (matches.length === 0) {
        const categories = [...new Set(minedDecoupling.map((p) => p.icCategory))];
        const topICs = minedDecoupling
          .sort((a, b) => b.occurrences - a.occurrences)
          .slice(0, 15)
          .map((p) => `- ${p.icValue} (${p.occurrences}× in ${p.icCategory})`);
        return {
          content: [{
            type: "text" as const,
            text: `No decoupling patterns found for "${icValue}". Available categories: ${categories.join(", ")}\n\nTop ICs with decoupling data:\n${topICs.join("\n")}`,
          }],
        };
      }

      const result = matches.map((p) => ({
        icValue: p.icValue,
        icCategory: p.icCategory,
        occurrences: p.occurrences,
        designRule: p.designRule,
        caps: p.caps.map((c) => ({
          role: c.role,
          preferredValue: c.preferredValue,
          medianDistanceMm: c.medianDistanceMm,
          p25Mm: c.p25Mm,
          p75Mm: c.p75Mm,
          count: c.count,
        })),
        sourceDesigns: p.sourceDesigns.slice(0, 5),
      }));

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
