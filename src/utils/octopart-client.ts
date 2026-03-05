/**
 * Nexar/Octopart GraphQL API client (optional).
 * Only used if NEXAR_CLIENT_ID and NEXAR_CLIENT_SECRET are set.
 * Free tier: 100 parts lifetime — useful only with a paid plan.
 */

import { PricingResult, PartOffer, PriceBreak } from "../types/index.js";

const TOKEN_URL = "https://identity.nexar.com/connect/token";
const GRAPHQL_URL = "https://api.nexar.com/graphql";

const TOKEN_TTL_MS = 23 * 60 * 60 * 1000; // refresh 1 hr before 24-hr expiry

let cachedToken: string | null = null;
let tokenExpiry = 0;

export function isConfigured(): boolean {
  return !!(process.env.NEXAR_CLIENT_ID && process.env.NEXAR_CLIENT_SECRET);
}

async function getToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId = process.env.NEXAR_CLIENT_ID;
  const clientSecret = process.env.NEXAR_CLIENT_SECRET;
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

    const data = await res.json() as { access_token: string };
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + TOKEN_TTL_MS;
    return cachedToken;
  } catch {
    return null;
  }
}

const SEARCH_QUERY = `
  query SearchMpn($mpn: String!) {
    supSearchMpn(q: $mpn, limit: 5) {
      results {
        part {
          mpn
          manufacturer { name }
          shortDescription
          sellers {
            company { name }
            offers {
              inventoryLevel
              moq
              prices { quantity price currency }
              url
            }
          }
        }
      }
    }
  }
`;

interface NexarPrice { quantity: number; price: number; currency: string }
interface NexarOffer { inventoryLevel: number; moq: number; prices: NexarPrice[]; url: string }
interface NexarSeller { company: { name: string }; offers: NexarOffer[] }
interface NexarPart { mpn: string; manufacturer: { name: string }; shortDescription: string; sellers: NexarSeller[] }
interface NexarResult { part: NexarPart }
interface NexarResponse { data: { supSearchMpn: { results: NexarResult[] } } }

/**
 * Search Octopart by MPN. Returns PricingResult or null.
 */
export async function searchMpn(mpn: string): Promise<PricingResult | null> {
  if (!isConfigured()) return null;

  const token = await getToken();
  if (!token) return null;

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: SEARCH_QUERY, variables: { mpn } }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;

    const json = await res.json() as NexarResponse;
    const results = json.data?.supSearchMpn?.results;
    if (!results || results.length === 0) return null;

    const offers: PartOffer[] = [];

    for (const result of results) {
      const part = result.part;
      for (const seller of part.sellers ?? []) {
        for (const offer of seller.offers ?? []) {
          const priceBreaks: PriceBreak[] = (offer.prices ?? []).map((p) => ({
            qty: p.quantity,
            unitPrice: p.price,
            currency: p.currency,
          }));

          offers.push({
            distributor: seller.company.name,
            mpn: part.mpn,
            manufacturer: part.manufacturer.name,
            description: part.shortDescription ?? "",
            stock: offer.inventoryLevel,
            priceBreaks,
            moq: offer.moq,
            leadTimeDays: null,
            url: offer.url ?? "",
          });
        }
      }
    }

    let bestPrice: number | null = null;
    let bestPriceQty100: number | null = null;

    for (const offer of offers) {
      for (const pb of offer.priceBreaks) {
        if (pb.qty <= 1 && (bestPrice === null || pb.unitPrice < bestPrice)) {
          bestPrice = pb.unitPrice;
        }
        if (pb.qty <= 100 && (bestPriceQty100 === null || pb.unitPrice < bestPriceQty100)) {
          bestPriceQty100 = pb.unitPrice;
        }
      }
    }

    const totalStock = offers.reduce((sum, o) => sum + o.stock, 0);

    return {
      query: mpn,
      source: "octopart",
      offers: offers.slice(0, 10),
      bestPrice,
      bestPriceQty100,
      totalStock,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
