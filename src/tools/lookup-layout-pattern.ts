import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { layoutPatterns, getLayoutPattern, getLayoutsByCategory } from "../knowledge/index.js";

export function registerLookupLayoutPattern(server: McpServer) {
  server.tool(
    "lookup-layout-pattern",
    "Look up REC board layout conventions mined from 206 real board designs. " +
    "Returns data on board dimensions, design rules (clearances, trace widths), " +
    "component placement zones (where MCUs, regulators, connectors go), " +
    "orientation habits, via patterns, mounting holes, and grid preferences. " +
    "Use this before starting a board layout to match your team's conventions.",
    {
      category: z.enum([
        "board-size",
        "design-rules",
        "orientation",
        "placement-zones",
        "mcu-placement",
        "regulator-placement",
        "connector-placement",
        "via-patterns",
        "mounting-holes",
        "grid",
        "copper-pour",
        "all",
      ]).optional().default("all").describe(
        "Category to look up. 'all' returns a summary of every category."
      ),
      query: z.string().optional().describe(
        "Free-text search within pattern descriptions (e.g. 'clearance', 'drill', 'mcu')"
      ),
    },
    async ({ category, query }) => {
      let results = category === "all"
        ? layoutPatterns
        : getLayoutsByCategory(category);

      if (query) {
        const q = query.toLowerCase();
        results = results.filter(p =>
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          JSON.stringify(p.data).toLowerCase().includes(q)
        );
      }

      if (results.length === 0) {
        const categories = [...new Set(layoutPatterns.map(p => p.category))];
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: "No matching layout patterns found",
              availableCategories: categories,
              totalPatterns: layoutPatterns.length,
            }, null, 2),
          }],
        };
      }

      // For "all" category, return a summary rather than full data
      if (category === "all" && !query) {
        const summary = results.map(p => ({
          id: p.id,
          category: p.category,
          description: p.description,
          sampleSize: p.sampleSize,
        }));
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              note: "Summary of all layout patterns. Use category parameter for full data.",
              patterns: summary,
            }, null, 2),
          }],
        };
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify(results.length === 1 ? results[0] : results, null, 2),
        }],
      };
    }
  );
}
