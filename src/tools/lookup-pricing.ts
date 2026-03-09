import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as digikey from "../utils/digikey-client.js";
import * as octopart from "../utils/octopart-client.js";
import { getPartPricing } from "../utils/pricing-fetcher.js";

export function registerLookupPricing(server: McpServer) {
  server.tool(
    "lookup-pricing",
    "Look up current distributor pricing for a component. Searches DigiKey (and optionally Octopart) for real-time pricing, stock availability, and price breaks. Accepts REC deviceset names (e.g. '10K_0805') or manufacturer part numbers.",
    {
      partNumber: z.string().describe("REC deviceset name or manufacturer part number"),
      qty: z.number().optional().default(1).describe("Quantity needed (affects price break selection)"),
    },
    async ({ partNumber, qty }) => {
      // Check if any pricing API is configured
      if (!digikey.isConfigured() && !octopart.isConfigured()) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: "No pricing API configured",
              setup: {
                digikey: "Set DIGIKEY_CLIENT_ID and DIGIKEY_CLIENT_SECRET env vars. Register at developer.digikey.com → create Organization → create Production App with ProductInformation V4.",
                octopart: "Set NEXAR_CLIENT_ID and NEXAR_CLIENT_SECRET env vars (optional, requires paid Nexar plan for useful volume).",
              },
            }, null, 2),
          }],
        };
      }

      try {
        const result = await getPartPricing(partNumber, undefined, qty);

        if (!result) {
          return {
            content: [{
              type: "text" as const,
              text: JSON.stringify({
                partNumber,
                qty,
                result: "No pricing found",
                searchesRemaining: digikey.isConfigured() ? digikey.getRemainingSearches() : "N/A (not configured)",
              }, null, 2),
            }],
          };
        }

        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              partNumber,
              qty,
              source: result.source,
              bestPrice: result.bestPrice,
              bestPriceQty100: result.bestPriceQty100,
              totalStock: result.totalStock,
              offersCount: result.offers.length,
              searchesRemaining: digikey.isConfigured() ? digikey.getRemainingSearches() : "N/A",
              offers: result.offers.map((o) => ({
                distributor: o.distributor,
                mpn: o.mpn,
                manufacturer: o.manufacturer,
                description: o.description,
                stock: o.stock,
                moq: o.moq,
                priceBreaks: o.priceBreaks,
                url: o.url,
              })),
            }, null, 2),
          }],
        };
      } catch (err) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "Pricing lookup failed", detail: String(err) }, null, 2),
          }],
          isError: true,
        };
      }
    }
  );
}
