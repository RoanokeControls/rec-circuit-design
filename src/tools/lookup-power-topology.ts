import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedPowerSupplies, triacCircuits, emcComponents, fuseRatings } from "../knowledge/index.js";

export function registerLookupPowerTopology(server: McpServer) {
  server.tool(
    "lookup-power-topology",
    "Look up power supply recipes from 261 real REC designs. Includes regulator topologies, triac circuits, EMC/protection components, and fuse ratings.",
    {
      regulator: z.string().optional().describe("Regulator part number (e.g. 'NCP1117', 'LM317', 'AOZ')"),
      topology: z.enum(["ldo", "buck", "boost", "ac-dc", "linear"]).optional().describe("Power topology type"),
      includeTriacs: z.boolean().optional().describe("Include triac circuit patterns (default: false)"),
      includeEmc: z.boolean().optional().describe("Include EMC component summary (default: false)"),
    },
    async ({ regulator, topology, includeTriacs, includeEmc }) => {
      let supplies = minedPowerSupplies;

      if (regulator) {
        const q = regulator.toLowerCase();
        supplies = supplies.filter(
          (s) =>
            s.regulator.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q)
        );
      }

      if (topology) {
        supplies = supplies.filter((s) => s.topology === topology);
      }

      const result: Record<string, unknown> = {};

      if (supplies.length > 0) {
        result.supplyPatterns = supplies.map((s) => ({
          regulator: s.regulator,
          topology: s.topology,
          occurrences: s.occurrences,
          inputNets: s.inputNets,
          outputNets: s.outputNets,
          components: s.components,
          sourceDesigns: s.sourceDesigns.slice(0, 5),
        }));
      } else {
        const available = minedPowerSupplies.map(
          (s) => `- ${s.regulator} (${s.topology}, ${s.occurrences}×)`
        );
        result.message = `No matches found. Available regulators:\n${available.join("\n")}`;
      }

      if (includeTriacs) {
        result.triacCircuits = {
          totalDesigns: triacCircuits.length,
          samples: triacCircuits.slice(0, 10),
        };
      }

      if (includeEmc) {
        result.emcComponents = emcComponents;
        result.fuseRatings = fuseRatings;
      }

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
