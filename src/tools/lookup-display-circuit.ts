import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { displayDesigns, displayTypes, displayDriverTypes, displayInterfaceTypes } from "../knowledge/index.js";

export function registerLookupDisplayCircuit(server: McpServer) {
  server.tool(
    "lookup-display-circuit",
    "Look up display circuits — seven-segment (185), LCD character (36), OLED. Includes drivers (74HC595, SN75ALS192), interfaces (parallel/I2C/SPI), contrast pots, backlight. Mined from 49 designs with 222 displays.",
    {
      displayType: z.string().optional().describe("Display type: 'seven_segment', 'lcd_character', 'oled', 'tft'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ displayType, design }) => {
      let results = displayDesigns;

      if (displayType) {
        const q = displayType.toLowerCase();
        results = results.filter((d) =>
          d.displays.some((disp) => disp.type.toLowerCase().includes(q))
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
            displayTypes,
            displayDriverTypes,
            displayInterfaceTypes,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
