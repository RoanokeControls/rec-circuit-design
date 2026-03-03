import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedPullups } from "../knowledge/index.js";

export function registerLookupPullupPractice(server: McpServer) {
  server.tool(
    "lookup-pullup-practice",
    "Look up pull-up resistor values and placement distances by bus type from 261 real REC designs. Covers I2C, SPI, UART, reset, CAN, RS-485, and more.",
    {
      busType: z.string().optional().describe("Bus type (e.g. 'i2c', 'spi', 'uart', 'reset', 'can', 'rs485', 'general')"),
      resistorValue: z.string().optional().describe("Resistor value to search for (e.g. '10K', '4.7K', '1K')"),
    },
    async ({ busType, resistorValue }) => {
      let patterns = minedPullups;

      if (busType) {
        const q = busType.toLowerCase();
        patterns = patterns.filter((p) => p.busType.toLowerCase().includes(q));
      }

      if (resistorValue) {
        const q = resistorValue.toLowerCase().replace(/\s/g, "");
        patterns = patterns.filter((p) =>
          p.resistorValue.toLowerCase().replace(/\s/g, "").includes(q)
        );
      }

      if (patterns.length === 0) {
        const busTypes = [...new Set(minedPullups.map((p) => p.busType))];
        const topValues = [...new Set(minedPullups.map((p) => p.resistorValue))].slice(0, 15);
        return {
          content: [{
            type: "text" as const,
            text: `No pull-up patterns found. Available bus types: ${busTypes.join(", ")}\nCommon values: ${topValues.join(", ")}`,
          }],
        };
      }

      // Sort by occurrences
      patterns = patterns.sort((a, b) => b.occurrences - a.occurrences);

      const result = patterns.map((p) => ({
        busType: p.busType,
        resistorValue: p.resistorValue,
        occurrences: p.occurrences,
        medianDistanceToMcuMm: p.medianDistanceToMcuMm,
        placementNote: p.placementNote,
        powerNet: p.powerNet,
        sourceDesigns: p.sourceDesigns.slice(0, 5),
      }));

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
