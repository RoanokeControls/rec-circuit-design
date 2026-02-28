import { SubstitutionRule } from "../types/index.js";

// ── Verified component substitutions ──
// When a part is out of stock, these tell the system what's safe to swap in.

export const substitutionRules: SubstitutionRule[] = [
  {
    id: "sub-001",
    originalPart: "RC0402FR-0710KL",
    substitutePart: "CRCW040210K0FKED",
    conditions: "Direct drop-in. Same value, tolerance, package. Vishay instead of Yageo.",
    verified: true,
    verifiedOn: "PROJ-2025-003",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "sub-002",
    originalPart: "AMS1117-3.3",
    substitutePart: "AP2112K-3.3TRG1",
    conditions: "Pin-compatible 3.3V LDO. Lower current (600mA vs 1A) but lower quiescent current. OK for designs under 500mA.",
    verified: true,
    verifiedOn: "PROJ-2025-008",
    limitations: "Max output 600mA vs 1A. Check load requirements.",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // TODO: Add verified substitutions as you validate them
];
