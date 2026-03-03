import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { triacDesigns, triacModels, optoModels, snubberCapValues, gateResistorValues, mcuDriveParts } from "../knowledge/index.js";

export function registerLookupTriacCircuit(server: McpServer) {
  server.tool(
    "lookup-triac-circuit",
    "Deep lookup of triac drive circuits — triacs, opto-isolators (MOC3052/MOC3063), snubber R+C, gate resistors, varistors, fuses, MCU drive pins. Mined from 65 designs with 273 triacs.",
    {
      triacModel: z.string().optional().describe("Triac model to filter (e.g. 'BTA12', 'T1235')"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ triacModel, design }) => {
      let results = triacDesigns;

      if (triacModel) {
        const q = triacModel.toLowerCase();
        results = results.filter((d) =>
          d.triacModels.some((m) => m.toLowerCase().includes(q))
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
            triacModels,
            optoModels,
            snubberCapValues,
            gateResistorValues,
            mcuDriveParts,
            designs: results.slice(0, 10),
          }, null, 2),
        }],
      };
    }
  );
}
