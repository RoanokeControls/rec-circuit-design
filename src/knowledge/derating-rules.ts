import { DeratingRule } from "../types/index.js";

// ── Component derating rules ──
// Your team's practical limits, not just datasheet maximums.

export const deratingRules: DeratingRule[] = [
  {
    id: "dr-001",
    componentType: "resistor",
    package: "0402",
    maxRatio: 0.5,
    description: "0402 resistors: max 50% of rated power (typically 50mW max)",
    reasoning: "Our reflow runs hot. 0402 at rated power showed 3% field return rate.",
    exceptions: "Pull-ups/pull-downs exempt — negligible dissipation",
  },
  {
    id: "dr-002",
    componentType: "resistor",
    package: "0603",
    maxRatio: 0.7,
    description: "0603 resistors: max 70% of rated power",
    reasoning: "Standard derating for production reliability",
  },
  {
    id: "dr-003",
    componentType: "capacitor",
    maxRatio: 0.6,
    description: "Ceramic capacitors: max 60% of rated voltage",
    reasoning: "X7R and X5R lose significant capacitance near rated voltage. At 80% rated, you may have lost 30-40% of actual capacitance.",
  },
  {
    id: "dr-004",
    componentType: "ic-regulator",
    maxRatio: 0.8,
    description: "Voltage regulators: max 80% of rated current in production",
    reasoning: "Thermal headroom. Ambient inside enclosures often 15-20°C above room temp.",
  },

  // TODO: Add your derating rules
];
