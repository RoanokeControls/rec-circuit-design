import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as digikey from "../utils/digikey-client.js";
import * as octopart from "../utils/octopart-client.js";
import { getDesignBom, findDesign } from "../utils/design-loader.js";
import { getBomPricing } from "../utils/pricing-fetcher.js";

export function registerPriceBom(server: McpServer) {
  server.tool(
    "price-bom",
    "Price an entire design's BOM using live distributor data. Looks up every component on DigiKey, compares with inventory costs, and identifies the best-value sourcing. Works with any of the 261 REC designs.",
    {
      designName: z.string().describe("Design name (e.g. 'TouchMZ_In_Out_Board')"),
      boardQty: z.number().optional().default(1).describe("Number of boards to price"),
    },
    async ({ designName, boardQty }) => {
      // Check if any pricing API is configured
      if (!digikey.isConfigured() && !octopart.isConfigured()) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: "No pricing API configured",
              setup: "Set DIGIKEY_CLIENT_ID and DIGIKEY_CLIENT_SECRET env vars. Register at developer.digikey.com.",
            }, null, 2),
          }],
        };
      }

      try {
        const bom = await getDesignBom(designName);

        if (!bom) {
          const suggestions = await findDesign(designName);
          const suggList = suggestions.slice(0, 8).map((s) => `  - ${s.name}`).join("\n");
          return {
            content: [{
              type: "text" as const,
              text: `Design "${designName}" not found.\n\nDid you mean:\n${suggList}`,
            }],
          };
        }

        const result = await getBomPricing(bom, designName, boardQty);

        const summary = {
          designName: result.designName,
          boardQty: result.boardQty,
          uniqueParts: result.linesTotal,
          totalCostInventory: result.totalCostInventory,
          totalCostLive: result.totalCostLive,
          costPerBoardLive: result.costPerBoardLive,
          pricingCoverage: `${result.linesWithPricing}/${result.linesTotal} parts priced`,
          searchesRemaining: digikey.isConfigured() ? digikey.getRemainingSearches() : "N/A",
          lines: result.lines.map((l) => ({
            deviceset: l.deviceset,
            value: l.value,
            qtyPerBoard: l.qtyPerBoard,
            qtyTotal: l.qtyTotal,
            inventoryCost: l.inventoryCost,
            liveBestPrice: l.liveBestPrice,
            lineCostInventory: l.lineCostInventory,
            lineCostLive: l.lineCostLive,
            pricingSource: l.pricingSource,
            topOffer: l.offers[0]
              ? {
                  mpn: l.offers[0].mpn,
                  manufacturer: l.offers[0].manufacturer,
                  stock: l.offers[0].stock,
                  url: l.offers[0].url,
                }
              : null,
          })),
        };

        return { content: [{ type: "text" as const, text: JSON.stringify(summary, null, 2) }] };
      } catch (err) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "BOM pricing failed", detail: String(err) }, null, 2),
          }],
          isError: true,
        };
      }
    }
  );
}
