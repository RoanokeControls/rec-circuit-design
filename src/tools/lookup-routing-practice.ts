import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedRouting } from "../knowledge/index.js";

export function registerLookupRoutingPractice(server: McpServer) {
  server.tool(
    "lookup-routing-practice",
    "Look up trace widths, via stitching density, and net class conventions from 261 real REC designs. Shows percentile distributions for power and signal nets.",
    {
      netName: z.string().optional().describe("Net name to search (e.g. 'GND', '+5V', '+3.3V', 'signal')"),
      category: z.enum(["trace-width", "via-stitching", "net-class", "layer-usage"]).optional().describe("Practice category"),
    },
    async ({ netName, category }) => {
      let practices = minedRouting;

      if (netName) {
        const q = netName.toLowerCase();
        practices = practices.filter(
          (p) =>
            p.netName.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      if (category) {
        practices = practices.filter((p) => p.category === category);
      }

      if (practices.length === 0) {
        const available = minedRouting.map(
          (p) => `- ${p.netName} (${p.category}): ${p.description}`
        );
        return {
          content: [{
            type: "text" as const,
            text: `No routing practices found. Available:\n${available.join("\n")}`,
          }],
        };
      }

      const result = practices.map((p) => ({
        netName: p.netName,
        category: p.category,
        description: p.description,
        metric: p.metric,
        unit: p.unit,
        sampleSize: p.sampleSize,
        percentiles: p.percentiles,
      }));

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
