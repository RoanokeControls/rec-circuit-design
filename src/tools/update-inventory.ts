import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getInventory, mutateInventory } from "../utils/inventory-fetcher.js";

export function registerUpdateInventory(server: McpServer) {
  server.tool(
    "update-inventory",
    "Report inventory changes — parts used in a production run, new shipments received, or stock corrections. Changes persist in memory for this session and are reflected in all subsequent inventory queries.",
    {
      changes: z
        .array(
          z.object({
            partNumber: z.string().describe("Part number"),
            action: z.enum(["used", "received", "set"]).describe("'used' subtracts, 'received' adds, 'set' overrides"),
            qty: z.number().describe("Quantity"),
            note: z.string().optional().describe("Reason for change (e.g. 'sensor board run #47')"),
          })
        )
        .describe("List of inventory changes"),
    },
    async ({ changes }) => {
      // Ensure inventory is loaded before mutating
      await getInventory();

      const results = changes.map((change) => {
        const result = mutateInventory(change.partNumber, change.action, change.qty);
        if (!result) {
          return {
            partNumber: change.partNumber,
            status: "NOT FOUND",
            message: "Part not in inventory. Upload updated CSV to the server.",
          };
        }

        return {
          partNumber: change.partNumber,
          action: change.action,
          qty: change.qty,
          before: result.before,
          after: result.after,
          status: result.status,
          note: change.note,
        };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Inventory updated (session-scoped):\n\n${JSON.stringify(results, null, 2)}\n\nNote: These changes are in-memory for this session. For persistent updates, update the CSV on the server.`,
          },
        ],
      };
    }
  );
}
