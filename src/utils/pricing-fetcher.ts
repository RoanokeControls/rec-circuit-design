/**
 * Main pricing entry point.
 * Orchestrates cache → search strategy → DigiKey → Octopart fallback.
 */

import { PricingResult, BomPricingLine, BomPricingResult, DesignPart } from "../types/index.js";
import { PricingCache } from "./pricing-cache.js";
import { buildSearchQuery } from "./part-search-strategy.js";
import * as digikey from "./digikey-client.js";
import * as octopart from "./octopart-client.js";
import { getInventory } from "./inventory-fetcher.js";

const cache = new PricingCache<PricingResult>(60 * 60 * 1000); // 1-hour TTL

/**
 * Get live pricing for a single part.
 */
export async function getPartPricing(
  deviceset: string,
  value?: string,
  qty = 1
): Promise<PricingResult | null> {
  const cacheKey = `${deviceset}:${value ?? ""}:${qty}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return { ...cached, source: "cache" };
  }

  // Build search query from deviceset name
  const query = await buildSearchQuery(deviceset, value);

  // Try DigiKey
  if (digikey.isConfigured()) {
    const result = await digikey.searchKeyword(query, qty);
    if (result && result.offers.length > 0) {
      cache.set(cacheKey, result);
      return result;
    }
  }

  // Try Octopart (fallback)
  if (octopart.isConfigured()) {
    const result = await octopart.searchMpn(query);
    if (result && result.offers.length > 0) {
      cache.set(cacheKey, result);
      return result;
    }
  }

  return null;
}

/**
 * Price an entire BOM using live distributor data.
 * Deduplicates by deviceset, merges with inventory cost data.
 */
export async function getBomPricing(
  bom: DesignPart[],
  designName: string,
  boardQty = 1
): Promise<BomPricingResult> {
  const inventory = await getInventory();

  // Aggregate parts by deviceset
  const partCounts = new Map<string, { deviceset: string; value: string; count: number }>();
  for (const part of bom) {
    const existing = partCounts.get(part.deviceset);
    if (existing) {
      existing.count++;
    } else {
      partCounts.set(part.deviceset, { deviceset: part.deviceset, value: part.value, count: 1 });
    }
  }

  const lines: BomPricingLine[] = [];
  let totalCostInventory = 0;
  let totalCostLive = 0;
  let linesWithPricing = 0;
  let hasAnyLivePricing = false;

  for (const [, part] of partCounts) {
    const qtyTotal = part.count * boardQty;

    // Inventory cost
    const inv = inventory.find(
      (i) => i.eagleDevice === part.deviceset || i.partNumber === part.deviceset
    );
    const inventoryCost = inv?.unitCost ?? 0;
    const lineCostInventory = inventoryCost * qtyTotal;
    totalCostInventory += lineCostInventory;

    // Live pricing (sequential to respect rate limits)
    const pricing = await getPartPricing(part.deviceset, part.value, qtyTotal);

    let liveBestPrice: number | null = null;
    let lineCostLive: number | null = null;
    let pricingSource: BomPricingLine["pricingSource"] = "not-found";

    if (pricing && pricing.bestPrice !== null) {
      // Find best price at the actual quantity we need
      liveBestPrice = pricing.bestPrice;
      for (const offer of pricing.offers) {
        for (const pb of offer.priceBreaks) {
          if (pb.qty <= qtyTotal && (liveBestPrice === null || pb.unitPrice < liveBestPrice)) {
            liveBestPrice = pb.unitPrice;
          }
        }
      }
      lineCostLive = liveBestPrice * qtyTotal;
      totalCostLive += lineCostLive;
      hasAnyLivePricing = true;
      linesWithPricing++;
      pricingSource = pricing.source === "cache" ? "digikey" : pricing.source;
    } else if (inventoryCost > 0) {
      // Fall back to inventory cost for the live total
      totalCostLive += lineCostInventory;
      pricingSource = "inventory";
      linesWithPricing++;
    }

    lines.push({
      deviceset: part.deviceset,
      value: part.value,
      qtyPerBoard: part.count,
      qtyTotal,
      inventoryCost,
      liveBestPrice,
      lineCostInventory,
      lineCostLive,
      offers: pricing?.offers ?? [],
      pricingSource,
    });
  }

  // Sort: not-found first, then by live cost descending
  lines.sort((a, b) => {
    if (a.pricingSource === "not-found" && b.pricingSource !== "not-found") return -1;
    if (a.pricingSource !== "not-found" && b.pricingSource === "not-found") return 1;
    return (b.lineCostLive ?? 0) - (a.lineCostLive ?? 0);
  });

  return {
    designName,
    boardQty,
    totalCostInventory: +totalCostInventory.toFixed(4),
    totalCostLive: hasAnyLivePricing ? +totalCostLive.toFixed(4) : null,
    costPerBoardLive: hasAnyLivePricing ? +(totalCostLive / boardQty).toFixed(4) : null,
    linesWithPricing,
    linesTotal: lines.length,
    lines,
  };
}
