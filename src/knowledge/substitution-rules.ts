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

  // ── FullVision / Trackmaster Medical Treadmill Substitutions (from Slack archive 2019-2025) ──

  {
    id: "sub-006",
    originalPart: "IRLML6402",
    substitutePart: "BSS84P",
    conditions: "NOT a bidirectional substitution. BSS84P is the CORRECT part for the magnetic pull tether Q1 position. IRLML6402 causes safety-critical latch-up. Both are SOT-23 P-channel MOSFETs but Vgs(th) differs. BSS84P marked 'SP.'/'YBs', IRLML6402 marked 'EABN9'.",
    verified: true,
    verifiedOn: "FullVision Trackmaster Treadmill",
    limitations: "THIS IS A SAFETY-CRITICAL CORRECTION, not a substitution. IRLML6402 must ALWAYS be replaced with BSS84P in the tether circuit. 320 boards were affected. FDA-reportable.",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "sub-007",
    originalPart: "RL0015",
    substitutePart: "HATF901ASDC12-1",
    conditions: "Hasco relay, same coil voltage (12VDC) and footprint. Drop-in replacement for elevation relay during RL0015 shortage.",
    verified: true,
    verifiedOn: "FullVision Trackmaster Treadmill",
    limitations: "Verify contact isolation voltage meets application requirements. RL0015 and substitute both have limited isolation — insufficient for 4.3kV hipot without external contactor.",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "sub-008",
    originalPart: "FTDI-USB-TTL",
    substitutePart: "Cypress-USB-TTL",
    conditions: "Cypress USB-to-serial IC as substitute for FTDI during FTDI shortage. Same USB-serial functionality for treadmill RS-232 communication interface.",
    verified: true,
    verifiedOn: "FullVision Trackmaster Treadmill",
    limitations: "Requires different device driver on host side. Verify driver compatibility with GE CASE system before deployment. Windows driver installation may differ.",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── FullVision Quantum Drive Substitutions (from Slack archive quantum-guest-channel 2023) ──

  {
    id: "sub-009",
    originalPart: "MKV31F512",
    substitutePart: "MKV31F256",
    conditions: "ONLY on Rev C (R0C) drive boards which have rerouted traces for the missing timer peripheral. R0C boards support EITHER processor with the same firmware binary. Rev A/B (R0B) boards are 512KB ONLY.",
    verified: true,
    verifiedOn: "FullVision Quantum Treadmill (quantum-guest-channel)",
    limitations: "256KB variant missing one timer used for input capture — requires PCB trace change (R0C revision). Firmware version reporting differs: v4.x = 512KB, v5.x = 256KB. Calibration software reports 1026 for v4.2 (512KB) and 1280 for v5.0 (256KB). Must select correct target device (MKV31F256 vs MKV31F512) in J-Flash Lite when programming.",
    status: "approved",
    addedDate: "2026-02-28",
  },
];
