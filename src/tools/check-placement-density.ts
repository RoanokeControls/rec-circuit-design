import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { minedPlacement } from "../knowledge/index.js";

export function registerCheckPlacementDensity(server: McpServer) {
  server.tool(
    "check-placement-density",
    "Compare a proposed board's component density against REC's historical distribution from 261 designs. Also reports connector edge placement and mounting hole conventions.",
    {
      boardWidthMm: z.number().describe("Board width in mm"),
      boardHeightMm: z.number().describe("Board height in mm"),
      componentCount: z.number().describe("Total component count"),
    },
    async ({ boardWidthMm, boardHeightMm, componentCount }) => {
      const areaCm2 = (boardWidthMm * boardHeightMm) / 100;
      const proposedDensity = componentCount / areaCm2;

      // Find density convention
      const densityConv = minedPlacement.find((p) => p.id === "placement-density");

      let assessment: string;
      const medianDensity = densityConv?.metric ?? 0;

      if (proposedDensity < medianDensity * 0.5) {
        assessment = "Low density — well below REC median. Plenty of routing space.";
      } else if (proposedDensity < medianDensity * 1.5) {
        assessment = "Typical density — in line with REC's historical designs.";
      } else if (proposedDensity < medianDensity * 3) {
        assessment = "High density — above most REC designs. Consider routing constraints.";
      } else {
        assessment = "Very high density — significantly above REC norms. May need more layers or smaller packages.";
      }

      // Gather other placement conventions
      const conventions = minedPlacement.map((p) => ({
        id: p.id,
        category: p.category,
        description: p.description,
        metric: p.metric,
        unit: p.unit,
      }));

      const result = {
        proposed: {
          boardWidthMm,
          boardHeightMm,
          areaCm2: Math.round(areaCm2 * 100) / 100,
          componentCount,
          densityPerCm2: Math.round(proposedDensity * 100) / 100,
        },
        recHistorical: {
          medianDensityPerCm2: medianDensity,
          sampleSize: densityConv?.sampleSize ?? 0,
        },
        assessment,
        conventions,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
