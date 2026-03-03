import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { boardSummaries, boardSummarySummary } from "../knowledge/index.js";

export function registerLookupBoardDesign(server: McpServer) {
  server.tool(
    "lookup-board-design",
    "Look up comprehensive board design summaries — dimensions, component counts, MCU family, power supplies, complexity rating, comm interfaces, display/triac/relay presence. Master catalog of 206 REC designs.",
    {
      design: z.string().optional().describe("Design name to search"),
      mcuFamily: z.string().optional().describe("MCU family: 'PIC18', 'ESP32', 'STM32', 'RP2040', 'AVR/SAM'"),
      hasTriacs: z.boolean().optional().describe("Filter for boards with triacs"),
      hasDisplay: z.boolean().optional().describe("Filter for boards with displays"),
      minComplexity: z.number().optional().describe("Minimum complexity rating (1-5)"),
    },
    async ({ design, mcuFamily, hasTriacs, hasDisplay, minComplexity }) => {
      let results = boardSummaries;

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((b) => b.design.toLowerCase().includes(q));
      }

      if (mcuFamily) {
        const q = mcuFamily.toLowerCase();
        results = results.filter((b) =>
          b.mcuFamilies.some((f) => f.toLowerCase().includes(q))
        );
      }

      if (hasTriacs !== undefined) {
        results = results.filter((b) => b.hasTriacs === hasTriacs);
      }

      if (hasDisplay !== undefined) {
        results = results.filter((b) => b.hasDisplay === hasDisplay);
      }

      if (minComplexity !== undefined) {
        results = results.filter((b) => b.complexity >= minComplexity);
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            overallSummary: boardSummarySummary,
            boards: results.slice(0, 20),
          }, null, 2),
        }],
      };
    }
  );
}
