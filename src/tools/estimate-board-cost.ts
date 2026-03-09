import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getInventory } from "../utils/inventory-fetcher.js";
import { getDesignBom, findDesign } from "../utils/design-loader.js";
import { getPartPricing } from "../utils/pricing-fetcher.js";
import * as digikey from "../utils/digikey-client.js";

export function registerEstimateBoardCost(server: McpServer) {
  server.tool(
    "estimate-board-cost",
    "Estimate the component cost for any of the 261 REC designs. Loads the BOM from design data, looks up each component in live inventory, and returns per-line cost, total cost, stock status, shortages, and feeder slots.",
    {
      designName: z.string().describe("Design name (e.g. 'TouchMZ_In_Out_Board')"),
      boardQty: z.number().optional().default(1).describe("Number of boards to cost"),
      useLivePricing: z.boolean().optional().default(false).describe("When true, also fetches live DigiKey pricing for each component"),
    },
    async ({ designName, boardQty, useLivePricing }) => {
      try {
      const bom = await getDesignBom(designName);

      if (!bom) {
        const suggestions = await findDesign(designName);
        const suggList = suggestions.slice(0, 8).map((s) => `  - ${s.name}`).join("\n");
        return {
          content: [{
            type: "text" as const,
            text: `Design "${designName}" not found.\n\nDid you mean:\n${suggList}`,
          }],
        };
      }

      const inventory = await getInventory();

      // Aggregate parts by deviceset (same component used multiple times)
      const partCounts = new Map<string, { deviceset: string; value: string; refs: string[]; count: number }>();
      for (const part of bom) {
        const key = part.deviceset;
        const existing = partCounts.get(key);
        if (existing) {
          existing.refs.push(part.ref);
          existing.count++;
        } else {
          partCounts.set(key, { deviceset: part.deviceset, value: part.value, refs: [part.ref], count: 1 });
        }
      }

      const lines: Array<{
        deviceset: string;
        value: string;
        refs: string;
        qtyPerBoard: number;
        qtyTotal: number;
        unitCost: number;
        lineCost: number;
        liveBestPrice?: number | null;
        lineCostLive?: number | null;
        inStock: string;
        qtyOnHand: number;
        shortage: number;
        feederSlot: number | undefined;
      }> = [];

      let totalCost = 0;
      let totalCostLive = 0;
      let totalShortages = 0;
      let hasAnyLivePricing = false;

      for (const [, part] of partCounts) {
        const inv = inventory.find(
          (i) => i.eagleDevice === part.deviceset || i.partNumber === part.deviceset
        );

        const qtyTotal = part.count * boardQty;
        const unitCost = inv?.unitCost ?? 0;
        const lineCost = unitCost * qtyTotal;
        const shortage = inv ? Math.max(0, qtyTotal - inv.qtyOnHand) : qtyTotal;

        totalCost += lineCost;
        if (shortage > 0) totalShortages++;

        let liveBestPrice: number | null | undefined;
        let lineCostLive: number | null | undefined;

        if (useLivePricing && (digikey.isConfigured())) {
          const pricing = await getPartPricing(part.deviceset, part.value, qtyTotal);
          if (pricing?.bestPrice != null) {
            liveBestPrice = pricing.bestPrice;
            // Find best price at actual quantity
            for (const offer of pricing.offers) {
              for (const pb of offer.priceBreaks) {
                if (pb.qty <= qtyTotal && (liveBestPrice === null || pb.unitPrice < liveBestPrice)) {
                  liveBestPrice = pb.unitPrice;
                }
              }
            }
            lineCostLive = liveBestPrice! * qtyTotal;
            totalCostLive += lineCostLive;
            hasAnyLivePricing = true;
          } else {
            liveBestPrice = null;
            lineCostLive = null;
            totalCostLive += lineCost; // fall back to inventory cost
          }
        }

        lines.push({
          deviceset: part.deviceset,
          value: part.value,
          refs: part.refs.join(", "),
          qtyPerBoard: part.count,
          qtyTotal,
          unitCost,
          lineCost,
          ...(useLivePricing ? { liveBestPrice, lineCostLive } : {}),
          inStock: inv?.status ?? "not-in-inventory",
          qtyOnHand: inv?.qtyOnHand ?? 0,
          shortage,
          feederSlot: inv?.feederSlot,
        });
      }

      // Sort: shortages first, then by line cost descending
      lines.sort((a, b) => {
        if (a.shortage > 0 && b.shortage === 0) return -1;
        if (a.shortage === 0 && b.shortage > 0) return 1;
        return b.lineCost - a.lineCost;
      });

      const shortageLines = lines.filter((l) => l.shortage > 0);
      const inInventory = lines.filter((l) => l.inStock !== "not-in-inventory");

      const result = {
        designName,
        boardQty,
        uniqueParts: lines.length,
        totalPlacements: bom.length,
        totalCost: +totalCost.toFixed(4),
        costPerBoard: +(totalCost / boardQty).toFixed(4),
        ...(useLivePricing && hasAnyLivePricing ? {
          totalCostLive: +totalCostLive.toFixed(4),
          costPerBoardLive: +(totalCostLive / boardQty).toFixed(4),
        } : {}),
        inventoryCoverage: `${inInventory.length}/${lines.length} parts in inventory`,
        shortages: totalShortages,
        canBuild: totalShortages === 0,
        shortageList: shortageLines.length > 0
          ? shortageLines.map((l) => ({
              deviceset: l.deviceset,
              qtyNeeded: l.qtyTotal,
              qtyOnHand: l.qtyOnHand,
              shortage: l.shortage,
            }))
          : undefined,
        lines,
      };

      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
      } catch (err) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "Board cost estimate failed", detail: String(err) }, null, 2),
          }],
          isError: true,
        };
      }
    }
  );
}
