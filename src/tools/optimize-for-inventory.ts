import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { inventory, substitutionRules, componentNotes } from "../knowledge/index.js";

export function registerOptimizeForInventory(server: McpServer) {
  server.tool(
    "optimize-for-inventory",
    "Analyze a BOM and suggest substitutions to maximize use of abundant inventory. Reduces cost and avoids procurement delays by preferring in-stock parts.",
    {
      bom: z
        .array(
          z.object({
            refDes: z.string(),
            partNumber: z.string(),
            value: z.string().optional(),
            qty: z.number().optional().default(1),
          })
        )
        .describe("Current BOM — list of components with reference designators and part numbers"),
    },
    async ({ bom }) => {
      const suggestions = bom.map((item) => {
        const currentPart = inventory.find((i) => i.partNumber === item.partNumber);
        const notes = componentNotes.filter((n) => n.partNumber === item.partNumber);

        // Check if we have this part
        if (!currentPart) {
          // Look for value-compatible parts in inventory
          const valueParts = item.value
            ? inventory.filter(
                (i) =>
                  i.value?.toLowerCase() === item.value?.toLowerCase() && (i.status === "abundant" || i.status === "adequate")
              )
            : [];

          return {
            refDes: item.refDes,
            currentPart: item.partNumber,
            status: "NOT IN INVENTORY",
            suggestion: valueParts.length > 0
              ? `Consider: ${valueParts.map((p) => `${p.partNumber} (${p.status}, qty: ${p.qtyOnHand})`).join(", ")}`
              : "No in-stock alternatives found — needs procurement",
            valueParts: valueParts.map((p) => p.partNumber),
          };
        }

        // Part is in stock but low — suggest substitute
        if (currentPart.status === "low" || currentPart.status === "out") {
          const subs = substitutionRules.filter(
            (sr) => sr.originalPart === item.partNumber && sr.status === "approved"
          );
          const subParts = subs
            .map((sr) => {
              const inv = inventory.find((i) => i.partNumber === sr.substitutePart);
              return inv ? { ...sr, stock: inv.status, qtyOnHand: inv.qtyOnHand } : null;
            })
            .filter((s) => s && (s.stock === "abundant" || s.stock === "adequate"));

          return {
            refDes: item.refDes,
            currentPart: item.partNumber,
            status: currentPart.status,
            qtyOnHand: currentPart.qtyOnHand,
            suggestion: subParts.length > 0
              ? `Swap to ${subParts[0]!.substitutePart} (${subParts[0]!.stock}) — ${subParts[0]!.conditions}`
              : `Low stock, no verified substitute. Consider testing an alternative.`,
            notes: notes.map((n) => n.note),
          };
        }

        return {
          refDes: item.refDes,
          currentPart: item.partNumber,
          status: currentPart.status,
          qtyOnHand: currentPart.qtyOnHand,
          feederSlot: currentPart.feederSlot,
          suggestion: "OK — in stock",
          notes: notes.length > 0 ? notes.map((n) => n.note) : undefined,
        };
      });

      const needsAttention = suggestions.filter((s) => s.status !== "abundant" && s.status !== "adequate");

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                totalParts: bom.length,
                needsAttention: needsAttention.length,
                allGood: needsAttention.length === 0,
                parts: suggestions,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
