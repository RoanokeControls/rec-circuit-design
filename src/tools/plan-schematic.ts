import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { referenceCircuits, powerSupplies, protectionCircuits, inventory, designRules, lessonsLearned } from "../knowledge/index.js";

export function registerPlanSchematic(server: McpServer) {
  server.tool(
    "plan-schematic",
    "Plan a complete schematic from high-level requirements. Assembles standard circuit blocks, checks inventory, applies design rules, and flags relevant lessons learned. Use this as the starting point for a new design.",
    {
      mcu: z.string().describe("MCU or module (e.g. 'ESP32-S3', 'STM32F411')"),
      powerSource: z.string().describe("Power source (e.g. 'USB 5V', 'LiPo 3.7V', '12V barrel jack')"),
      interfaces: z.array(z.string()).describe("Required interfaces (e.g. ['USB-C', 'I2C', 'SPI display', '3x GPIO header'])"),
      features: z.array(z.string()).optional().describe("Additional features (e.g. ['battery charging', 'motor driver', 'RS485'])"),
      boardQty: z.number().optional().default(100).describe("Expected production quantity — affects inventory check"),
    },
    async ({ mcu, powerSource, interfaces, features, boardQty }) => {
      const mcuLower = mcu.toLowerCase();

      // Find matching reference circuit
      const refCircuit = referenceCircuits.find(
        (rc) => rc.mcu?.toLowerCase().includes(mcuLower) || rc.id.toLowerCase().includes(mcuLower)
      );

      // Find relevant power supply
      const isUsb = powerSource.toLowerCase().includes("usb");
      const isBattery = powerSource.toLowerCase().includes("lipo") || powerSource.toLowerCase().includes("battery");
      const relevantPower = powerSupplies.filter((ps) => {
        if (isUsb) return ps.inputVoltage.typ === 5.0;
        if (isBattery) return ps.topology !== "ldo";
        return true;
      });

      // Find relevant protection circuits
      const relevantProtection = protectionCircuits.filter((pc) =>
        interfaces.some((iface) => pc.interface.toLowerCase().includes(iface.toLowerCase().split(" ")[0]))
      );

      // Collect all components from the plan
      const allComponents: string[] = [];
      if (refCircuit) {
        refCircuit.blocks.forEach((b) => b.components.forEach((c) => allComponents.push(c.eagleDevice)));
      }
      relevantPower.forEach((ps) => ps.components.forEach((c) => allComponents.push(c.eagleDevice)));

      // Check inventory for all planned components
      const inventoryStatus = allComponents.map((device) => {
        const inv = inventory.find((i) => i.eagleDevice === device);
        return {
          device,
          inStock: inv ? inv.status : "not-in-inventory",
          qtyOnHand: inv?.qtyOnHand ?? 0,
          sufficient: inv ? inv.qtyOnHand >= boardQty : false,
        };
      });

      // Find relevant design rules
      const relevantRules = designRules.filter(
        (dr) =>
          dr.applies?.some((a) => a.toLowerCase().includes(mcuLower)) ||
          dr.category === "power-integrity" ||
          dr.category === "manufacturing"
      );

      // Find relevant lessons learned
      const relevantLessons = lessonsLearned.filter(
        (ll) =>
          ll.affectedComponents?.some((c) => c.toLowerCase().includes(mcuLower)) ||
          ll.category === "design-error" ||
          ll.category === "field-failure"
      );

      const plan = {
        summary: `${mcu} board with ${powerSource} power, ${interfaces.length} interfaces`,
        referenceCircuit: refCircuit
          ? {
              id: refCircuit.id,
              name: refCircuit.name,
              blocks: refCircuit.blocks.map((b) => b.name),
              notes: refCircuit.notes,
            }
          : `No reference circuit found for ${mcu} — will need custom design`,
        powerSupply: relevantPower.map((ps) => ({
          id: ps.id,
          name: ps.name,
          topology: ps.topology,
          notes: ps.notes,
        })),
        protection: relevantProtection.map((pc) => ({
          id: pc.id,
          name: pc.name,
          interface: pc.interface,
          certRelevant: pc.certRelevant,
        })),
        requestedInterfaces: interfaces,
        additionalFeatures: features ?? [],
        inventoryCheck: {
          boardQty,
          allSufficient: inventoryStatus.every((is) => is.sufficient),
          shortages: inventoryStatus.filter((is) => !is.sufficient),
        },
        applicableRules: relevantRules.map((dr) => ({
          severity: dr.severity,
          rule: dr.rule,
        })),
        warnings: relevantLessons.map((ll) => ({
          severity: ll.severity,
          title: ll.title,
          fix: ll.fix,
        })),
        nextSteps: [
          "Review this plan and adjust interfaces/features as needed",
          "Use generate-schematic-script to create the Eagle SCR file",
          "Run check-design-rules on the final component list",
          "Use check-inventory for final BOM verification before production",
        ],
      };

      return { content: [{ type: "text" as const, text: JSON.stringify(plan, null, 2) }] };
    }
  );
}
