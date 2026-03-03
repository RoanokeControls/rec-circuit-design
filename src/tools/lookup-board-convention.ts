import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedSilkscreen, minedPlacement } from "../knowledge/index.js";

export function registerLookupBoardConvention(server: McpServer) {
  server.tool(
    "lookup-board-convention",
    "Look up REC board conventions: silkscreen text sizes, fonts, smash rates, part number formats, mounting holes, connector placement, and adapter modules — all mined from 261 real designs.",
    {
      query: z.string().describe("What to look up (e.g. 'silkscreen', 'text size', 'mounting holes', 'connector', 'font', 'smash', 'part number')"),
    },
    async ({ query }) => {
      const q = query.toLowerCase();

      const silkMatches = minedSilkscreen.filter(
        (s) =>
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.value.toLowerCase().includes(q)
      );

      const placeMatches = minedPlacement.filter(
        (p) =>
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );

      if (silkMatches.length === 0 && placeMatches.length === 0) {
        // Return everything
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              message: `No exact match for "${query}". Showing all conventions.`,
              silkscreen: minedSilkscreen.map((s) => ({
                category: s.category,
                description: s.description,
                value: s.value,
                occurrences: s.occurrences,
              })),
              placement: minedPlacement.map((p) => ({
                category: p.category,
                description: p.description,
                metric: p.metric,
                unit: p.unit,
              })),
            }, null, 2),
          }],
        };
      }

      const result: Record<string, unknown> = {};

      if (silkMatches.length > 0) {
        result.silkscreen = silkMatches.map((s) => ({
          category: s.category,
          description: s.description,
          value: s.value,
          layer: s.layer,
          occurrences: s.occurrences,
        }));
      }

      if (placeMatches.length > 0) {
        result.placement = placeMatches.map((p) => ({
          category: p.category,
          description: p.description,
          metric: p.metric,
          unit: p.unit,
          sampleSize: p.sampleSize,
        }));
      }

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
