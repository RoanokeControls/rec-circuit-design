import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { protectionDesigns, protectionTypes, tvsToConnectorDistance } from "../knowledge/index.js";

export function registerLookupProtectionCircuit(server: McpServer) {
  server.tool(
    "lookup-protection-circuit",
    "Look up protection circuits — TVS diodes (median 8.7mm from connector), Zener clamps, varistors, fuses, polarity protection (Schottky/P-FET). Mined from 60 designs.",
    {
      protectionType: z.string().optional().describe("Protection type: 'tvs_diode', 'zener_clamp', 'varistor', 'fuse', 'polarity_schottky', 'polarity_pfet'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ protectionType, design }) => {
      let results = protectionDesigns;

      if (protectionType) {
        const q = protectionType.toLowerCase();
        results = results.filter((d) => {
          if (q.includes("tvs")) return d.tvsDiodes.length > 0;
          if (q.includes("zener")) return d.zeners.length > 0;
          if (q.includes("varistor")) return d.varistors.length > 0;
          if (q.includes("fuse")) return d.fuses.length > 0;
          if (q.includes("polarity")) return d.polarityProtection.length > 0;
          return true;
        });
      }

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((d) => d.design.toLowerCase().includes(q));
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            protectionTypes,
            tvsToConnectorDistance,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
