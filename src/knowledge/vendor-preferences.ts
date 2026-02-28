import { VendorPreference } from "../types/index.js";

// ── Preferred component manufacturers ──

export const vendorPreferences: VendorPreference[] = [
  { manufacturer: "Yageo", category: "resistor", tier: "preferred", reasoning: "Reliable, good pricing, consistent stock", leadTime: "4-6 weeks" },
  { manufacturer: "Vishay", category: "resistor", tier: "preferred", reasoning: "Excellent precision parts", leadTime: "6-8 weeks" },
  { manufacturer: "Samsung Electro-Mechanics", category: "capacitor", tier: "preferred", reasoning: "Best MLCC availability and pricing", leadTime: "4-6 weeks" },
  { manufacturer: "Murata", category: "capacitor", tier: "preferred", reasoning: "Premium quality, good for RF bypass", leadTime: "6-10 weeks" },
  { manufacturer: "TDK", category: "inductor", tier: "preferred", reasoning: "Reliable power inductors", leadTime: "6-8 weeks" },
  { manufacturer: "Espressif", category: "ic-mcu", tier: "preferred", reasoning: "Direct relationship, good support", leadTime: "8-12 weeks" },
  { manufacturer: "Texas Instruments", category: "ic-regulator", tier: "preferred", reasoning: "Excellent documentation and app notes", leadTime: "8-16 weeks" },
  { manufacturer: "STMicroelectronics", category: "ic-protection", tier: "preferred", reasoning: "USBLC6 is our standard, good TVS line", leadTime: "6-10 weeks" },

  // TODO: Add your vendor preferences and avoid-list entries
];
