/**
 * DigiKey Product Information V4 API client.
 * OAuth2 client credentials flow + keyword search.
 */

import { PricingResult, PartOffer, PriceBreak } from "../types/index.js";

const TOKEN_URL = "https://api.digikey.com/v1/oauth2/token";
const SEARCH_URL = "https://api.digikey.com/products/v4/search/keyword";

const TOKEN_TTL_MS = 9 * 60 * 1000; // refresh 1 min before 10-min expiry
const DAILY_LIMIT = 950; // buffer below 1,000/day free tier

// ── Token cache ──

let cachedToken: string | null = null;
let tokenExpiry = 0;

// ── Daily rate tracking (resets on date change) ──

let dailyCount = 0;
let dailyDate = "";

function checkRateLimit(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dailyDate) {
    dailyDate = today;
    dailyCount = 0;
  }
  return dailyCount < DAILY_LIMIT;
}

// ── Public API ──

export function isConfigured(): boolean {
  return !!(process.env.DIGIKEY_CLIENT_ID && process.env.DIGIKEY_CLIENT_SECRET);
}

export function getRemainingSearches(): number {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dailyDate) return DAILY_LIMIT;
  return Math.max(0, DAILY_LIMIT - dailyCount);
}

async function getToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId = process.env.DIGIKEY_CLIENT_ID;
  const clientSecret = process.env.DIGIKEY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;

    const data = await res.json() as { access_token: string; expires_in: number };
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + TOKEN_TTL_MS;
    return cachedToken;
  } catch {
    return null;
  }
}

// ── DigiKey response types ──

interface DKProduct {
  Description: { ProductDescription: string; DetailedDescription: string };
  Manufacturer: { Id: number; Name: string };
  ManufacturerProductNumber: string;
  UnitPrice: number;
  ProductUrl: string;
  QuantityAvailable: number;
  ProductVariations: {
    DigiKeyProductNumber: string;
    PackageType: { Id: number; Name: string };
    StandardPricing: { BreakQuantity: number; UnitPrice: number; TotalPrice: number }[];
    MinimumOrderQuantity: number;
    QuantityAvailableforPackageType: number;
  }[];
}

interface DKSearchResponse {
  Products: DKProduct[];
  ProductsCount: number;
}

/**
 * Search DigiKey by keyword. Returns a PricingResult or null on failure.
 */
export async function searchKeyword(query: string, qty = 1): Promise<PricingResult | null> {
  if (!isConfigured()) return null;
  if (!checkRateLimit()) return null;

  const token = await getToken();
  if (!token) return null;

  try {
    const res = await fetch(SEARCH_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-DIGIKEY-Client-Id": process.env.DIGIKEY_CLIENT_ID!,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        Keywords: query,
        Limit: 10,
      }),
      signal: AbortSignal.timeout(8000),
    });

    dailyCount++;

    if (!res.ok) return null;

    const data = await res.json() as DKSearchResponse;
    if (!data.Products || data.Products.length === 0) return null;

    const offers: PartOffer[] = data.Products.slice(0, 10).map((p) => {
      // Collect price breaks from the first variation (most common packaging)
      const variation = p.ProductVariations?.[0];
      const priceBreaks: PriceBreak[] = (variation?.StandardPricing ?? []).map((sp) => ({
        qty: sp.BreakQuantity,
        unitPrice: sp.UnitPrice,
        currency: "USD",
      }));

      return {
        distributor: "DigiKey",
        mpn: p.ManufacturerProductNumber,
        manufacturer: p.Manufacturer.Name,
        description: p.Description.ProductDescription,
        stock: p.QuantityAvailable,
        priceBreaks,
        moq: variation?.MinimumOrderQuantity ?? 1,
        leadTimeDays: null,
        url: p.ProductUrl,
      };
    });

    // Best price at qty 1 and qty 100
    let bestPrice: number | null = null;
    let bestPriceQty100: number | null = null;

    for (const offer of offers) {
      for (const pb of offer.priceBreaks) {
        if (pb.qty <= qty && (bestPrice === null || pb.unitPrice < bestPrice)) {
          bestPrice = pb.unitPrice;
        }
        if (pb.qty <= 100 && (bestPriceQty100 === null || pb.unitPrice < bestPriceQty100)) {
          bestPriceQty100 = pb.unitPrice;
        }
      }
    }

    const totalStock = offers.reduce((sum, o) => sum + o.stock, 0);

    return {
      query,
      source: "digikey",
      offers,
      bestPrice,
      bestPriceQty100,
      totalStock,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
