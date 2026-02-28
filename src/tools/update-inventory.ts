import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { inventory } from "../knowledge/index.js";

export function registerUpdateInventory(server: McpServer) {
  server.tool(
    "update-inventory",
    "Report inventory changes — parts used in a production run, new shipments received, or stock corrections. Returns updated status. Note: for full inventory sync, update the inventory.ts data file directly from your inventory system export.",
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
      const results = changes.map((change) => {
        const item = inventory.find((i) => i.partNumber === change.partNumber);
        if (!item) {
          return {
            partNumber: change.partNumber,
            status: "NOT FOUND",
            message: "Part not in inventory database. Add it to inventory.ts first.",
          };
        }

        const before = item.qtyOnHand;
        switch (change.action) {
          case "used":
            item.qtyOnHand = Math.max(0, item.qtyOnHand - change.qty);
            break;
          case "received":
            item.qtyOnHand += change.qty;
            break;
          case "set":
            item.qtyOnHand = change.qty;
            break;
        }

        // Update status
        if (item.qtyOnHand === 0) item.status = "out";
        else if (item.qtyOnHand < item.reelQty) item.status = "low";
        else if (item.qtyOnHand < item.reelQty * 3) item.status = "adequate";
        else item.status = "abundant";

        item.lastUpdated = new Date().toISOString().split("T")[0];

        return {
          partNumber: change.partNumber,
          description: item.description,
          action: change.action,
          qty: change.qty,
          before,
          after: item.qtyOnHand,
          status: item.status,
          note: change.note,
        };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `Inventory updated (in-memory for this session):\n\n${JSON.stringify(results, null, 2)}\n\nNote: These changes are in-memory only. For persistent updates, export and update inventory.ts.`,
          },
        ],
      };
    }
  );
}
