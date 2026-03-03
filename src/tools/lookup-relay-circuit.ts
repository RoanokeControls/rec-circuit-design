import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { relayDesigns, relayTypes, relayDriverICs, relayCoilVoltages } from "../knowledge/index.js";

export function registerLookupRelayCircuit(server: McpServer) {
  server.tool(
    "lookup-relay-circuit",
    "Look up relay and driver circuits — relay types, flyback diodes, driver ICs (ULN2803), transistors, coil voltages, MCU connections. Mined from 16 designs with 51 relays.",
    {
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ design }) => {
      let results = relayDesigns;

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((d) => d.design.toLowerCase().includes(q));
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            relayTypes,
            relayDriverICs,
            relayCoilVoltages,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
