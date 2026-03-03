import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ledDesigns, ledColorDistribution, ledCurrentLimitingResistors } from "../knowledge/index.js";

export function registerLookupLedCircuit(server: McpServer) {
  server.tool(
    "lookup-led-circuit",
    "Look up LED and indicator circuits — colors (red/green/blue), current limiting resistors, LED drivers (WS2812, PCA9685), MCU pin connections. Mined from 44 designs with 183 LEDs (avg 4.2/board).",
    {
      color: z.string().optional().describe("LED color: 'red', 'green', 'blue', 'yellow', 'white', 'rgb'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ color, design }) => {
      let results = ledDesigns;

      if (color) {
        const q = color.toLowerCase();
        results = results.filter((d) =>
          d.leds.some((led) => led.color.toLowerCase() === q)
        );
      }

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((d) => d.design.toLowerCase().includes(q));
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            ledColorDistribution,
            ledCurrentLimitingResistors,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
