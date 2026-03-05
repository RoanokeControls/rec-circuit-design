import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { substitutionRules } from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";

export function registerSuggestSubstitution(server: McpServer) {
  server.tool(
    "suggest-substitution",
    "Find verified substitute components for a given part number. Shows stock availability of both original and substitutes.",
    {
      partNumber: z.string().describe("The part number to find substitutes for"),
    },
    async ({ partNumber }) => {
      const inventory = await getInventory();
      const pn = partNumber.toUpperCase();

      const asOriginal = substitutionRules.filter(
        (sr) => sr.originalPart.toUpperCase().includes(pn) || pn.includes(sr.originalPart.toUpperCase())
      );

      const asSubstitute = substitutionRules.filter(
        (sr) => sr.substitutePart.toUpperCase().includes(pn) || pn.includes(sr.substitutePart.toUpperCase())
      );

      const results = [
        ...asOriginal.map((sr) => ({
          direction: "original → substitute" as const,
          originalPart: sr.originalPart,
          substitutePart: sr.substitutePart,
          conditions: sr.conditions,
          limitations: sr.limitations,
          verified: sr.verified,
          verifiedOn: sr.verifiedOn,
          originalStock: inventory.find((i) => i.partNumber === sr.originalPart)?.status ?? "unknown",
          substituteStock: inventory.find((i) => i.partNumber === sr.substitutePart)?.status ?? "unknown",
        })),
        ...asSubstitute.map((sr) => ({
          direction: "substitute → original" as const,
          originalPart: sr.originalPart,
          substitutePart: sr.substitutePart,
          conditions: sr.conditions,
          limitations: sr.limitations,
          verified: sr.verified,
          verifiedOn: sr.verifiedOn,
          originalStock: inventory.find((i) => i.partNumber === sr.originalPart)?.status ?? "unknown",
          substituteStock: inventory.find((i) => i.partNumber === sr.substitutePart)?.status ?? "unknown",
        })),
      ];

      const text =
        results.length > 0
          ? JSON.stringify(results, null, 2)
          : `No verified substitutions found for "${partNumber}". Consider adding one via add-substitution-rule if you've tested an alternative.`;

      return { content: [{ type: "text" as const, text }] };
    }
  );
}
