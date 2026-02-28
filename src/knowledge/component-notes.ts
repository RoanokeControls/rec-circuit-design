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

  // ── Carter-Hoffmann Slack Archive Notes ──

  {
    id: "cn-003",
    partNumber: "BTA12-600BWRG",
    note: "Supply-constrained since 2021. Verified drop-in replacements: BTA12-700BWRG and BTA12-800BWRG (same package, higher voltage rating). Requires UL file update when substituting. Derate to 5A max in production despite 12A datasheet rating.",
    type: "substitute",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-004",
    partNumber: "T1235-600G-TR",
    note: "12A/600V TRIAC used in M-Series triac boards. Derate to 5A for production use. Heatsink required — used with heat-sinked bottom heater outputs on 15-output triac board. UL listed for Carter-Hoffmann applications.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-005",
    partNumber: "HC08",
    note: "WARNING: HC08 quad AND gate has slower propagation delay than HCS08. On M-Series display boards, this slower speed is actually REQUIRED for proper button detection on single-window displays daisy-chained downstream of dual-window masters. Do not blindly upgrade to HCS08 without full regression testing across all display configurations.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-006",
    partNumber: "HCS08",
    note: "Faster AND gate that fixes display flicker caused by cable capacitance on shift register lines. However, this speed change breaks button detection on downstream single-window displays (FGLF0626/0627) when chained after dual-window masters (FGLF0598/0599). Must stock both HC08 and HCS08 variants depending on display configuration.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-007",
    partNumber: "JST_S3B-PH-SM4-TB_LF_SN",
    note: "JST PH series used extensively in Carter-Hoffmann designs. DigiKey cable: 455-3143-ND, header: 455-1751-1-ND. Small, inexpensive, tight locking. Good for 4-wire comm+power connections as alternative to telco cables.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-008",
    partNumber: "RJ11-6P",
    note: "DO NOT USE for digital communication in new designs. Years of field failures on Carter-Hoffmann M-Series traced to 6-pin telco cable quality variations — crimping inconsistency, no shielding, no twisted pairs, variable capacitance. Use RJ45 CAT-5e instead. If forced to use RJ11, specify Assmann WSW A-MO-6-6-F50 plugs with documented crimping procedure.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
];
