import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { powerSupplies, deratingRules } from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";

export function registerSuggestPowerSupply(server: McpServer) {
  server.tool(
    "suggest-power-supply",
    "Recommend a power supply design based on input voltage, output requirements, and inventory. Returns your team's proven topologies with component availability.",
    {
      inputVoltage: z.number().describe("Input voltage in volts (e.g. 5, 12, 3.7 for LiPo)"),
      outputVoltage: z.number().describe("Required output voltage in volts"),
      outputCurrentMa: z.number().describe("Required output current in milliamps"),
      batteryPowered: z.boolean().optional().default(false).describe("True if efficiency matters (battery operation)"),
    },
    async ({ inputVoltage, outputVoltage, outputCurrentMa, batteryPowered }) => {
      const inventory = await getInventory();
      const outputCurrentA = outputCurrentMa / 1000;

      const candidates = powerSupplies.filter((ps) => {
        const voltageMatch = inputVoltage >= ps.inputVoltage.min && inputVoltage <= ps.inputVoltage.max;
        const outputMatch = Math.abs(ps.outputVoltage - outputVoltage) < 0.1;
        const currentMatch = ps.outputCurrent >= outputCurrentA;
        return voltageMatch && outputMatch && currentMatch;
      });

      if (batteryPowered) {
        candidates.sort((a, b) => {
          if (a.topology === "ldo" && b.topology !== "ldo") return 1;
          if (a.topology !== "ldo" && b.topology === "ldo") return -1;
          return 0;
        });
      }

      const results = candidates.map((ps) => {
        const componentAvailability = ps.components.map((comp) => {
          const inv = inventory.find(
            (i) => i.eagleDevice === comp.eagleDevice && i.eaglePackage === comp.eaglePackage
          );
          return {
            refDes: comp.refDes,
            description: comp.description,
            value: comp.value,
            inStock: inv ? inv.status : "not-in-inventory",
            qtyOnHand: inv?.qtyOnHand ?? 0,
          };
        });

        const derating = deratingRules.find((dr) => dr.componentType === "ic-regulator");

        return {
          id: ps.id,
          name: ps.name,
          topology: ps.topology,
          efficiency: ps.efficiency,
          thermalNotes: ps.thermalNotes,
          componentAvailability,
          deratingNote: derating
            ? `Regulator derating: max ${derating.maxRatio * 100}% of rated current (${ps.outputCurrent * derating.maxRatio}A usable)`
            : undefined,
          notes: ps.notes,
        };
      });

      const text =
        results.length > 0
          ? JSON.stringify(results, null, 2)
          : `No matching power supply design found for ${inputVoltage}V → ${outputVoltage}V @ ${outputCurrentMa}mA. Consider adding a new topology to power-supplies.ts.`;

      return { content: [{ type: "text" as const, text }] };
    }
  );
}
