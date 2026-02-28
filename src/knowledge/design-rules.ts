import { DesignRule } from "../types/index.js";

// ── Your team's design rules and conventions ──
// These get checked automatically when planning schematics
// and flagged in the check-design-rules tool.

export const designRules: DesignRule[] = [
  // ── Power Integrity ──
  {
    id: "pwr-001",
    category: "power-integrity",
    rule: "Every IC VDD pin gets a 100nF X7R ceramic within 3mm and a 10uF bulk within 10mm",
    reasoning: "Standard decoupling practice. Y5V ceramics lose too much capacitance at operating voltage.",
    severity: "must",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "pwr-002",
    category: "power-integrity",
    rule: "Power trace width minimum 20mil for signals under 500mA, 40mil for up to 1A",
    reasoning: "Based on 1oz copper, 10°C rise. Our standard stack-up.",
    severity: "must",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Component Selection ──
  {
    id: "comp-001",
    category: "component-selection",
    rule: "0402 resistors: max 50mW dissipation in production designs, use 0603 for anything above",
    reasoning: "Our reflow profile on line 2 runs at upper end of spec. 0402 at full rated power showed 3% field return rate on PROJ-2024-017.",
    severity: "must",
    applies: ["resistor"],
    exceptions: "Pull-ups and pull-downs exempt — negligible power dissipation",
    sourceProject: "PROJ-2024-017",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "comp-002",
    category: "component-selection",
    rule: "Prefer inventory-abundant parts over exact-match spec when both meet requirements",
    reasoning: "Reduces cost, avoids procurement delays, keeps feeders loaded",
    severity: "should",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Layout ──
  {
    id: "lay-001",
    category: "layout",
    rule: "ESP32 antenna keep-out: 15mm ground-plane clearance, stitching vias every 2mm at boundary",
    reasoning: "Per Espressif hardware design guide. Violating this degrades WiFi by 6-10dBm.",
    applies: ["ESP32-S3", "ESP32-C3", "ESP32-C6", "ESP32-S2"],
    severity: "must",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── EMC ──
  {
    id: "emc-001",
    category: "emc",
    rule: "All external connectors must have ESD protection on signal lines",
    reasoning: "Required for CE/FCC certification. Failed on PROJ-2023-011 without it.",
    severity: "must",
    sourceProject: "PROJ-2023-011",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Manufacturing ──
  {
    id: "mfg-001",
    category: "manufacturing",
    rule: "Minimum 3 fiducials per board — 2 global + 1 local near fine-pitch components",
    reasoning: "Our pick-and-place requires 2 global fiducials minimum. Third local fiducial improves placement accuracy for QFN/BGA.",
    severity: "must",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "mfg-002",
    category: "manufacturing",
    rule: "Test points on all power rails and critical signals — 1mm pad minimum",
    reasoning: "Required for bed-of-nails testing on our ICT fixture",
    severity: "should",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // TODO: Add your rules here — this is the most valuable data in the whole server
];
