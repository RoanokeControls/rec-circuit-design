import { InventoryItem, InventoryEnvelope, StockStatus } from "../types/index.js";
import { inventory as staticInventory } from "../knowledge/index.js";

const INVENTORY_URL =
  process.env.REC_INVENTORY_URL ??
  "https://www.roanokecontrols.com/rec-admin/api/inventory.php";

const INVENTORY_KEY =
  process.env.REC_INVENTORY_KEY ?? "rec-inventory-2026";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// ── In-memory cache ──

let cachedItems: InventoryItem[] | null = null;
let cacheTime = 0;
let lastModified: string | null = null;

// ── Session-scoped mutations (from update-inventory tool) ──

const mutations: Map<string, Partial<InventoryItem>> = new Map();

function computeStatus(qtyOnHand: number, reelQty: number): StockStatus {
  if (qtyOnHand === 0) return "out";
  if (qtyOnHand < reelQty) return "low";
  if (qtyOnHand < reelQty * 3) return "adequate";
  return "abundant";
}

async function fetchFromServer(): Promise<InventoryItem[] | null> {
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${INVENTORY_KEY}`,
      Accept: "application/json",
    };
    if (lastModified) {
      headers["If-Modified-Since"] = lastModified;
    }

    const res = await fetch(INVENTORY_URL, { headers, signal: AbortSignal.timeout(8000) });

    if (res.status === 304) {
      // Not modified — cached data is still valid
      cacheTime = Date.now();
      return cachedItems;
    }

    if (!res.ok) {
      return null;
    }

    const lm = res.headers.get("Last-Modified");
    if (lm) lastModified = lm;

    const envelope: InventoryEnvelope = await res.json();
    return envelope.items;
  } catch {
    return null;
  }
}

function applyMutations(items: InventoryItem[]): InventoryItem[] {
  if (mutations.size === 0) return items;

  return items.map((item) => {
    const mut = mutations.get(item.partNumber);
    if (!mut) return item;
    return { ...item, ...mut };
  });
}

/**
 * Main entry point — all tools call this.
 * Fetches live data from server, falls back to cache, then to static inventory.
 */
export async function getInventory(): Promise<InventoryItem[]> {
  const now = Date.now();

  // Return cache if still fresh
  if (cachedItems && now - cacheTime < CACHE_TTL_MS) {
    return applyMutations(cachedItems);
  }

  // Try live fetch
  const live = await fetchFromServer();
  if (live) {
    cachedItems = live;
    cacheTime = now;
    return applyMutations(live);
  }

  // Fallback: stale cache
  if (cachedItems) {
    return applyMutations(cachedItems);
  }

  // Fallback: static inventory.ts
  cachedItems = [...staticInventory];
  cacheTime = now;
  return applyMutations(cachedItems);
}

/**
 * Apply a session-scoped mutation (from update-inventory tool).
 * Changes persist in memory until the MCP process restarts.
 */
export function mutateInventory(
  partNumber: string,
  action: "used" | "received" | "set",
  qty: number
): { before: number; after: number; status: StockStatus } | null {
  // Find the part in current cache or static data
  const items = cachedItems ?? staticInventory;
  const item = items.find((i) => i.partNumber === partNumber);
  if (!item) return null;

  const existing = mutations.get(partNumber);
  const currentQty = existing?.qtyOnHand ?? item.qtyOnHand;
  const before = currentQty;

  let after: number;
  switch (action) {
    case "used":
      after = Math.max(0, currentQty - qty);
      break;
    case "received":
      after = currentQty + qty;
      break;
    case "set":
      after = qty;
      break;
  }

  const status = computeStatus(after, item.reelQty);
  const today = new Date().toISOString().split("T")[0];

  mutations.set(partNumber, {
    qtyOnHand: after,
    status,
    lastUpdated: today,
  });

  return { before, after, status };
}
