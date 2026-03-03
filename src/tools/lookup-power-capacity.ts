import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { powerCapacityBoards, powerCapacitySummary } from "../knowledge/index.js";

export function registerLookupPowerCapacity(server: McpServer) {
  server.tool(
    "lookup-power-capacity",
    "Look up power supply capacity and load budgets per board — regulator ratings, topology, estimated current draw by load type (MCU, relays, LEDs, displays). Mined from 87 boards.",
    {
      design: z.string().optional().describe("Design name to look up"),
      topology: z.string().optional().describe("Filter by topology: 'ldo', 'linear', 'buck', 'ac-dc'"),
      minCapacityMa: z.number().optional().describe("Minimum supply capacity in mA"),
    },
    async ({ design, topology, minCapacityMa }) => {
      let results = powerCapacityBoards;

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((b) => b.design.toLowerCase().includes(q));
      }

      if (topology) {
        const q = topology.toLowerCase();
        results = results.filter((b) =>
          b.regulators.some((r) => r.topology.toLowerCase() === q)
        );
      }

      if (minCapacityMa) {
        results = results.filter((b) => b.totalSupplyCapacityMa >= minCapacityMa);
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            summary: powerCapacitySummary,
            boards: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
