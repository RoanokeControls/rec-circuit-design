import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { referenceCircuits, powerSupplies, protectionCircuits } from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";

export function registerGenerateBom(server: McpServer) {
  server.tool(
    "generate-bom",
    "Generate a Bill of Materials from circuit block IDs. Includes part numbers, quantities, inventory status, unit cost, and Eagle library references. Output as CSV-ready format.",
    {
      circuitId: z.string().optional().describe("Reference circuit ID"),
      powerSupplyId: z.string().optional().describe("Power supply ID"),
      protectionIds: z.array(z.string()).optional().describe("Protection circuit IDs"),
      boardQty: z.number().optional().default(1).describe("Number of boards — multiplies quantities"),
    },
    async ({ circuitId, powerSupplyId, protectionIds, boardQty }) => {
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

      const totalCost = bomLines.reduce((sum, l) => sum + l.lineCost, 0);

      const csv = [
        "RefDes,Value,Description,PartNumber,Package,Qty/Board,QtyTotal,InStock,QtyOnHand,UnitCost,LineCost,EagleLib",
        ...bomLines.map(
          (l) =>
            `${l.refDes},${l.value},${l.description},${l.partNumber},${l.package},${l.qtyPerBoard},${l.qtyTotal},${l.inStock},${l.qtyOnHand},${l.unitCost.toFixed(4)},${l.lineCost.toFixed(4)},${l.eagleLib}`
        ),
        `,,,,,,,,,,Total:,$${totalCost.toFixed(2)}`,
      ].join("\n");

      return {
        content: [
          {
            type: "text" as const,
            text: `BOM for ${boardQty} boards — ${bomLines.length} line items — $${totalCost.toFixed(2)} total\n\n\`\`\`csv\n${csv}\n\`\`\``,
          },
        ],
      };
    }
  );
}
