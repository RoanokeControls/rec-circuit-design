import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { picAdDesigns, analogSourceTypes, pinFunctionDistribution } from "../knowledge/index.js";

export function registerLookupPicConnections(server: McpServer) {
  server.tool(
    "lookup-pic-connections",
    "Look up PIC MCU pin connections, A/D channel usage, communication interfaces, and digital outputs — mined from 17 real PIC designs across 3 PIC variants.",
    {
      partNumber: z.string().optional().describe("PIC part number to filter (e.g. 'PIC18F26K22')"),
      pinFunction: z.string().optional().describe("Filter by pin function: 'analog_input', 'digital_output', 'communication', 'programming'"),
    },
    async ({ partNumber, pinFunction }) => {
      let results = picAdDesigns;

      if (partNumber) {
        const q = partNumber.toLowerCase();
        results = results.filter((d) => d.partNumber.toLowerCase().includes(q));
      }

      if (pinFunction) {
        const q = pinFunction.toLowerCase();
        results = results.filter((d) => {
          if (q === "analog_input") return d.analogPins.length > 0;
          if (q === "digital_output") return d.digitalOutputs.length > 0;
          if (q === "communication") return d.communications.length > 0;
          return d.pinSummary[q] > 0;
        });
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            analogSourceTypes,
            pinFunctionDistribution,
            designs: results.slice(0, 10),
          }, null, 2),
        }],
      };
    }
  );
}
