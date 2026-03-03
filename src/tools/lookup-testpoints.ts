import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { testPointDesigns, testPointCategories, debugHeaders } from "../knowledge/index.js";

export function registerLookupTestpoints(server: McpServer) {
  server.tool(
    "lookup-testpoints",
    "Look up test point and debug interface practices — test point categories (signal/power/programming/I2C/SPI/UART/CAN), ICSP connectors, debug headers. Mined from 42 designs with 172 test points (avg 4.1/board).",
    {
      category: z.string().optional().describe("Test point category: 'signal', 'power', 'ground', 'programming', 'uart', 'i2c', 'spi', 'can'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ category, design }) => {
      let results = testPointDesigns;

      if (category) {
        const q = category.toLowerCase();
        results = results.filter((d) =>
          d.testPoints.some((tp) => tp.category.toLowerCase() === q)
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
            testPointCategories,
            debugHeaders,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
