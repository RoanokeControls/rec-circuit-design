import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { componentNotes, vendorPreferences } from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";

export function registerLookupComponent(server: McpServer) {
  server.tool(
    "lookup-component",
    "Search inventory for components by part number, value, category, or description. Returns stock levels, Eagle library names, and any component notes.",
    {
      query: z.string().describe("Part number, value, category, or description (e.g. '10K 0402', 'ESP32', 'LDO')"),
      preferInStock: z.boolean().optional().default(true).describe("Prioritize in-stock items in results"),
    },
    async ({ query, preferInStock }) => {
      const inventory = await getInventory();
      const q = query.toLowerCase();
      let matches = inventory.filter(
        (item) =>
          item.partNumber.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.value?.toLowerCase().includes(q) ||
          item.package.toLowerCase().includes(q)
      );

      if (preferInStock) {
        const statusOrder = { abundant: 0, adequate: 1, "on-order": 2, low: 3, out: 4 };
        matches.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      }

      const results = matches.map((item) => {
        const notes = componentNotes.filter((n) => n.partNumber === item.partNumber);
        const vendor = vendorPreferences.find(
          (v) => item.description.toLowerCase().includes(v.manufacturer.toLowerCase()) && v.category === item.category
        );

        return {
          ...item,
          notes: notes.length > 0 ? notes.map((n) => ({ type: n.type, note: n.note })) : undefined,
          vendorTier: vendor?.tier,
        };
      });

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No inventory matches for "${query}". Try a broader search or check if the part needs to be added to inventory.`,
            },
          ],
        };
      }

      return {
        content: [{ type: "text" as const, text: JSON.stringify(results, null, 2) }],
      };
    }
  );
}
