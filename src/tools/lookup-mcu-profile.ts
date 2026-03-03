import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { mcuProfiles, mcuFamilySummary } from "../knowledge/index.js";

export function registerLookupMcuProfile(server: McpServer) {
  server.tool(
    "lookup-mcu-profile",
    "Look up MCU support circuits from 261 real REC designs. Shows crystals, decoupling caps, reset circuits, programming interfaces, USB bridges, and multi-MCU pairings.",
    {
      family: z.string().optional().describe("MCU family (e.g. 'PIC18', 'ESP32', 'STM32', 'RP2040', 'AVR/SAM')"),
      partNumber: z.string().optional().describe("Specific part number (e.g. 'PIC18F26', 'ESP32-WROVER')"),
    },
    async ({ family, partNumber }) => {
      let profiles = mcuProfiles;

      if (partNumber) {
        const q = partNumber.toLowerCase();
        profiles = profiles.filter(
          (p) =>
            p.partNumber.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
        );
      }

      if (family) {
        const q = family.toLowerCase();
        profiles = profiles.filter(
          (p) => p.family.toLowerCase().includes(q)
        );
      }

      if (profiles.length === 0) {
        const familyList = Object.entries(mcuFamilySummary)
          .map(([fam, data]) => `- ${fam}: ${data.instances} instances (${data.uniqueParts.join(", ")})`)
          .join("\n");
        return {
          content: [{
            type: "text" as const,
            text: `No MCU profiles found. Available families:\n${familyList}`,
          }],
        };
      }

      const result = profiles.map((p) => ({
        partNumber: p.partNumber,
        family: p.family,
        occurrences: p.occurrences,
        voltage: p.voltage,
        crystals: p.crystals,
        decouplingCaps: p.decouplingCaps.slice(0, 6),
        resetCircuit: p.resetCircuit,
        programmingInterface: p.programmingInterface,
        usbBridge: p.usbBridge,
        commonPairings: p.commonPairings,
        sourceDesigns: p.sourceDesigns.slice(0, 5),
      }));

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
