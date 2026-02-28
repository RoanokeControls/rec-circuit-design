import { ComponentNote } from "../types/index.js";

// ── Notes about specific components ──
// Warnings, tips, EOL notices, quality issues, etc.

export const componentNotes: ComponentNote[] = [
  {
    id: "cn-001",
    partNumber: "AMS1117-3.3",
    note: "Reliable and cheap but quiescent current is 5mA — do not use for battery-powered designs. Use AP2112K-3.3 (Iq=55uA) or ME6211 (Iq=40uA) instead.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-002",
    partNumber: "CH340G",
    note: "Requires external 12MHz crystal. CH340C is crystal-less drop-in if you want to reduce BOM count. Both work but C version is easier for small boards.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // TODO: Add notes as your team discovers them
];
