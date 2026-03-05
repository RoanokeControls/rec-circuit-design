import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getInventory } from "../utils/inventory-fetcher.js";
import { getDesignBom, findDesign } from "../utils/design-loader.js";
import { DesignPart } from "../types/index.js";

export function registerPlanProductionRun(server: McpServer) {
  server.tool(
    "plan-production-run",
    "Plan a multi-board production run. Aggregates material requirements across all boards, checks inventory, optimizes run order to minimize reel swaps on the pick-and-place machine, and flags shortages.",
    {
      boards: z
        .array(
          z.object({
            designName: z.string().describe("Design name"),
            qty: z.number().describe("Number of boards to build"),
          })
        )
        .describe("List of boards and quantities for this production run"),
    },
    async ({ boards }) => {
      const inventory = await getInventory();

      // Load all BOMs
      const boardBoms: Array<{
        designName: string;
        qty: number;
        bom: DesignPart[];
        devicesets: Set<string>;
      }> = [];

      const notFound: string[] = [];

      for (const board of boards) {
        const bom = await getDesignBom(board.designName);
        if (!bom) {
          notFound.push(board.designName);
          continue;
        }
        const devicesets = new Set(bom.map((p) => p.deviceset));
        boardBoms.push({ designName: board.designName, qty: board.qty, bom, devicesets });
      }

      if (notFound.length > 0) {
        const suggestions = [];
        for (const name of notFound) {
          const matches = await findDesign(name);
          suggestions.push({ query: name, suggestions: matches.slice(0, 5).map((m) => m.name) });
        }
        return {
          content: [{
            type: "text" as const,
            text: `Designs not found: ${notFound.join(", ")}\n\n${JSON.stringify(suggestions, null, 2)}`,
          }],
        };
      }

      // Aggregate total material requirements
      const materialMap = new Map<string, { deviceset: string; totalQty: number; boards: string[] }>();

      for (const bb of boardBoms) {
        const partCounts = new Map<string, number>();
        for (const part of bb.bom) {
          partCounts.set(part.deviceset, (partCounts.get(part.deviceset) ?? 0) + 1);
        }
        for (const [ds, count] of partCounts) {
          const existing = materialMap.get(ds);
          if (existing) {
            existing.totalQty += count * bb.qty;
            existing.boards.push(bb.designName);
          } else {
            materialMap.set(ds, { deviceset: ds, totalQty: count * bb.qty, boards: [bb.designName] });
          }
        }
      }

      // Check inventory for all materials
      let totalCost = 0;
      const materials: Array<{
        deviceset: string;
        totalQty: number;
        usedBy: string[];
        inStock: string;
        qtyOnHand: number;
        shortage: number;
        unitCost: number;
        lineCost: number;
        feederSlot: number | undefined;
      }> = [];

      for (const [, mat] of materialMap) {
        const inv = inventory.find(
          (i) => i.eagleDevice === mat.deviceset || i.partNumber === mat.deviceset
        );

        const unitCost = inv?.unitCost ?? 0;
        const lineCost = unitCost * mat.totalQty;
        const shortage = inv ? Math.max(0, mat.totalQty - inv.qtyOnHand) : mat.totalQty;
        totalCost += lineCost;

        materials.push({
          deviceset: mat.deviceset,
          totalQty: mat.totalQty,
          usedBy: mat.boards,
          inStock: inv?.status ?? "not-in-inventory",
          qtyOnHand: inv?.qtyOnHand ?? 0,
          shortage,
          unitCost,
          lineCost,
          feederSlot: inv?.feederSlot,
        });
      }

      // ── Reel swap optimization ──
      // Greedy nearest-neighbor: start with board using most feeder slots,
      // pick next board that shares the most components with current.

      const remaining = new Set(boardBoms.map((_, i) => i));

      // Start with board that uses the most feeder slots
      let currentIdx = 0;
      let maxSlots = 0;
      for (const [i, bb] of boardBoms.entries()) {
        if (bb.devicesets.size > maxSlots) {
          maxSlots = bb.devicesets.size;
          currentIdx = i;
        }
      }
      remaining.delete(currentIdx);

      const runOrder: Array<{
        designName: string;
        qty: number;
        uniqueParts: number;
        sharedWithPrevious: number;
        swaps: number;
      }> = [{
        designName: boardBoms[currentIdx].designName,
        qty: boardBoms[currentIdx].qty,
        uniqueParts: boardBoms[currentIdx].devicesets.size,
        sharedWithPrevious: 0,
        swaps: 0,
      }];

      let totalSwaps = 0;

      while (remaining.size > 0) {
        const currentDs = boardBoms[currentIdx].devicesets;

        let bestIdx = -1;
        let bestOverlap = -1;

        for (const i of remaining) {
          let overlap = 0;
          for (const ds of boardBoms[i].devicesets) {
            if (currentDs.has(ds)) overlap++;
          }
          if (overlap > bestOverlap) {
            bestOverlap = overlap;
            bestIdx = i;
          }
        }

        const nextBb = boardBoms[bestIdx];
        const swaps = nextBb.devicesets.size - bestOverlap;
        totalSwaps += swaps;

        runOrder.push({
          designName: nextBb.designName,
          qty: nextBb.qty,
          uniqueParts: nextBb.devicesets.size,
          sharedWithPrevious: bestOverlap,
          swaps,
        });

        remaining.delete(bestIdx);
        currentIdx = bestIdx;
      }

      const shortages = materials.filter((m) => m.shortage > 0);

      const result = {
        totalBoards: boards.reduce((s, b) => s + b.qty, 0),
        totalDesigns: boards.length,
        totalUniqueParts: materialMap.size,
        totalCost: +totalCost.toFixed(2),
        canBuildAll: shortages.length === 0,
        shortageCount: shortages.length,
        totalReelSwaps: totalSwaps,
        suggestedRunOrder: runOrder,
        shortages: shortages.length > 0
          ? shortages.map((s) => ({
              deviceset: s.deviceset,
              totalQty: s.totalQty,
              qtyOnHand: s.qtyOnHand,
              shortage: s.shortage,
              usedBy: s.usedBy,
            }))
          : undefined,
        materialList: materials.sort((a, b) => b.lineCost - a.lineCost),
      };

      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
