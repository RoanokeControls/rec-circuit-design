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

  // ── Carter-Hoffmann TRIAC Substitutions (from Slack archive) ──

  {
    id: "sub-003",
    originalPart: "BTA12-600BWRG",
    substitutePart: "BTA12-700BWRG",
    conditions: "Same package and pinout. Higher voltage rating (700V vs 600V). Verified drop-in replacement for M-Series triac boards.",
    verified: true,
    verifiedOn: "Carter-Hoffmann M-Series",
    limitations: "Requires UL file update when substituting. Derate to 5A max in production.",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "sub-004",
    originalPart: "BTA12-600BWRG",
    substitutePart: "BTA12-800BWRG",
    conditions: "Same package and pinout. Higher voltage rating (800V vs 600V). Verified drop-in replacement for M-Series triac boards.",
    verified: true,
    verifiedOn: "Carter-Hoffmann M-Series",
    limitations: "Requires UL file update when substituting. Derate to 5A max in production.",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "sub-005",
    originalPart: "CH340G",
    substitutePart: "CH340C",
    conditions: "Crystal-less variant — eliminates external 12MHz crystal. Same USB-serial functionality, easier layout for small boards.",
    verified: true,
    verifiedOn: "REC internal",
    limitations: "Internal oscillator slightly less accurate than crystal — acceptable for UART communication, not for precision timing.",
    status: "approved",
    addedDate: "2026-02-28",
  },
];
