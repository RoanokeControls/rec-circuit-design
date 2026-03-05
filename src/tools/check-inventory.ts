import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getInventory } from "../utils/inventory-fetcher.js";

export function registerCheckInventory(server: McpServer) {
  server.tool(
    "check-inventory",
    "Check if all parts in a design are in stock. Pass a list of part numbers and quantities needed. Returns availability status and flags shortages.",
    {
      parts: z
        .array(
          z.object({
            partNumber: z.string().describe("Component part number"),
            qtyNeeded: z.number().describe("Quantity needed for this production run"),
          })
        )
        .describe("List of parts and quantities to check"),
      boardQty: z.number().optional().default(1).describe("Number of boards in the run (multiplies all quantities)"),
    },
    async ({ parts, boardQty }) => {
      const inventory = await getInventory();
      const results = parts.map((part) => {
        const inv = inventory.find((i) => i.partNumber === part.partNumber);
        const totalNeeded = part.qtyNeeded * boardQty;

        if (!inv) {
          return {
            partNumber: part.partNumber,
            status: "NOT IN INVENTORY",
            qtyNeeded: totalNeeded,
            qtyOnHand: 0,
            shortage: totalNeeded,
            action: "Add to inventory or find substitute",
          };
        }

        const shortage = Math.max(0, totalNeeded - inv.qtyOnHand);
        return {
          partNumber: part.partNumber,
          description: inv.description,
          status: shortage > 0 ? "SHORTAGE" : inv.status,
          qtyNeeded: totalNeeded,
          qtyOnHand: inv.qtyOnHand,
          shortage,
          feederSlot: inv.feederSlot,
          action: shortage > 0 ? `Need ${shortage} more — check altParts: ${inv.altParts?.join(", ") || "none"}` : "OK",
        };
      });

      const shortages = results.filter((r) => r.shortage > 0);
      const summary = {
        boardQty,
        totalPartTypes: parts.length,
        allInStock: shortages.length === 0,
        shortageCount: shortages.length,
        parts: results,
      };

      return { content: [{ type: "text" as const, text: JSON.stringify(summary, null, 2) }] };
    }
  );
}
