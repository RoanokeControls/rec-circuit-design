import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { referenceCircuits, powerSupplies, protectionCircuits } from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";
import { getDesignBom, findDesign } from "../utils/design-loader.js";

export function registerGenerateBom(server: McpServer) {
  server.tool(
    "generate-bom",
    "Generate a Bill of Materials. Either provide a designName to load BOM from any of the 261 REC designs, or use circuit block IDs (circuitId/powerSupplyId/protectionIds). Includes part numbers, quantities, inventory status, unit cost, and Eagle library references. Output as CSV-ready format.",
    {
      designName: z.string().optional().describe("Design name from REC library (e.g. 'TouchMZ_In_Out_Board'). Use this to generate a BOM from any of the 261 existing designs."),
      circuitId: z.string().optional().describe("Reference circuit ID"),
      powerSupplyId: z.string().optional().describe("Power supply ID"),
      protectionIds: z.array(z.string()).optional().describe("Protection circuit IDs"),
      boardQty: z.number().optional().default(1).describe("Number of boards — multiplies quantities"),
    },
    async ({ designName, circuitId, powerSupplyId, protectionIds, boardQty }) => {
      const inventory = await getInventory();
      const bomLines: Array<{
        refDes: string;
        value: string;
        description: string;
        partNumber: string;
        package: string;
        qtyPerBoard: number;
        qtyTotal: number;
        inStock: string;
        qtyOnHand: number;
        unitCost: number;
        lineCost: number;
        eagleLib: string;
      }> = [];

      // --- Path 1: designName from master.json ---
      if (designName) {
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

        // Aggregate parts by deviceset (same component used multiple times)
        const partCounts = new Map<string, { deviceset: string; value: string; pkg: string; library: string; refs: string[]; count: number }>();
        for (const part of bom) {
          const key = part.deviceset;
          const existing = partCounts.get(key);
          if (existing) {
            existing.refs.push(part.ref);
            existing.count++;
          } else {
            partCounts.set(key, {
              deviceset: part.deviceset,
              value: part.value,
              pkg: part.package,
              library: part.library,
              refs: [part.ref],
              count: 1,
            });
          }
        }

        for (const [, part] of partCounts) {
          const inv = inventory.find(
            (i) => i.eagleDevice === part.deviceset || i.partNumber === part.deviceset
          );
          const qtyTotal = part.count * boardQty;
          const unitCost = inv?.unitCost ?? 0;

          bomLines.push({
            refDes: part.refs.join(" "),
            value: part.value,
            description: inv?.description ?? "",
            partNumber: inv?.partNumber ?? "TBD",
            package: part.pkg,
            qtyPerBoard: part.count,
            qtyTotal,
            inStock: inv?.status ?? "not-in-inventory",
            qtyOnHand: inv?.qtyOnHand ?? 0,
            unitCost,
            lineCost: unitCost * qtyTotal,
            eagleLib: `${part.library}:${part.deviceset}`,
          });
        }
      } else {
        // --- Path 2: circuit block IDs (original flow) ---
        const addComponent = (comp: { refDes: string; value?: string; description: string; eagleDevice: string; eaglePackage: string; eagleLibrary: string; partNumber?: string }) => {
          const inv = inventory.find((i) => i.eagleDevice === comp.eagleDevice);
          bomLines.push({
            refDes: comp.refDes,
            value: comp.value ?? "",
            description: comp.description,
            partNumber: inv?.partNumber ?? comp.partNumber ?? "TBD",
            package: comp.eaglePackage,
            qtyPerBoard: 1,
            qtyTotal: boardQty,
            inStock: inv?.status ?? "not-in-inventory",
            qtyOnHand: inv?.qtyOnHand ?? 0,
            unitCost: inv?.unitCost ?? 0,
            lineCost: (inv?.unitCost ?? 0) * boardQty,
            eagleLib: `${comp.eagleLibrary}:${comp.eagleDevice}`,
          });
        };

        if (circuitId) {
          const circuit = referenceCircuits.find((rc) => rc.id === circuitId);
          circuit?.blocks.forEach((b) => b.components.forEach(addComponent));
        }

        if (powerSupplyId) {
          const power = powerSupplies.find((ps) => ps.id === powerSupplyId);
          power?.components.forEach(addComponent);
        }

        protectionIds?.forEach((id) => {
          const prot = protectionCircuits.find((pc) => pc.id === id);
          prot?.components.forEach(addComponent);
        });
      }

      const totalCost = bomLines.reduce((sum, l) => sum + l.lineCost, 0);

      const csv = [
        "RefDes,Value,Description,PartNumber,Package,Qty/Board,QtyTotal,InStock,QtyOnHand,UnitCost,LineCost,EagleLib",
        ...bomLines.map(
          (l) =>
            `${l.refDes},${l.value},${l.description},${l.partNumber},${l.package},${l.qtyPerBoard},${l.qtyTotal},${l.inStock},${l.qtyOnHand},${l.unitCost.toFixed(4)},${l.lineCost.toFixed(4)},${l.eagleLib}`
        ),
        `,,,,,,,,,,Total:,$${totalCost.toFixed(2)}`,
      ].join("\n");

      const source = designName ? `design "${designName}"` : "circuit blocks";
      return {
        content: [
          {
            type: "text" as const,
            text: `BOM for ${boardQty} board${boardQty === 1 ? "" : "s"} from ${source} — ${bomLines.length} line items — $${totalCost.toFixed(2)} total\n\n\`\`\`csv\n${csv}\n\`\`\``,
          },
        ],
      };
    }
  );
}
