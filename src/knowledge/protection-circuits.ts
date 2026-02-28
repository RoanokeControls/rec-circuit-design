import { ProtectionCircuit } from "../types/index.js";

// ── Your team's standard protection circuit blocks ──
// Component names match REC_Standard_Library v365.lbr devicesets.

export const protectionCircuits: ProtectionCircuit[] = [
  {
    id: "esd-3v3-4line",
    name: "3.3V 4-Line ESD Protection",
    type: "esd",
    interface: "GPIO / I2C / SPI",
    components: [
      {
        refDes: "D_ESD",
        eagleLibrary: "REC_Standard_Library v365",
        eagleDevice: "PESD3V3L4UG,115",
        eaglePackage: "SOT95P270X145-6N",
        description: "4-channel 3.3V ESD clamp — protects up to 4 signal lines",
        critical: true,
      },
    ],
    nets: [
      { name: "SIG1", from: { refDes: "D_ESD", pin: "IO1" }, to: [] },
      { name: "SIG2", from: { refDes: "D_ESD", pin: "IO2" }, to: [] },
      { name: "SIG3", from: { refDes: "D_ESD", pin: "IO3" }, to: [] },
      { name: "SIG4", from: { refDes: "D_ESD", pin: "IO4" }, to: [] },
      { name: "GND", from: { refDes: "D_ESD", pin: "GND" }, to: [] },
    ],
    rating: "IEC 61000-4-2 compliant",
    certRelevant: true,
    notes: "Place between external connector and MCU. Route signals through protection IC pads, don't stub. Covers 4 lines — use multiple for more.",
  },
  {
    id: "tvs-20v-power",
    name: "20V TVS Power Protection",
    type: "tvs",
    interface: "Power Input",
    components: [
      {
        refDes: "D_TVS",
        eagleLibrary: "REC_Standard_Library v365",
        eagleDevice: "SMCJ20CA",
        eaglePackage: "DIOM6859X262N",
        description: "20V bidirectional TVS — power line surge protection",
        critical: true,
      },
    ],
    nets: [
      { name: "VIN", from: { refDes: "D_TVS", pin: "A" }, to: [] },
      { name: "GND", from: { refDes: "D_TVS", pin: "K" }, to: [] },
    ],
    rating: "20V standoff, 1500W peak pulse",
    certRelevant: true,
    notes: "Place at power input, before regulator. Bidirectional (CA suffix) for AC or reverse polarity scenarios.",
  },
  {
    id: "polyfuse-input",
    name: "Resettable Fuse (Input Protection)",
    type: "fuse",
    interface: "Power Input",
    components: [
      {
        refDes: "F1",
        eagleLibrary: "REC_Standard_Library v365",
        eagleDevice: "0.75A_POLYSW",
        eaglePackage: "RESC1608X60",
        description: "750mA resettable polyswitch fuse — 0603",
      },
    ],
    nets: [
      { name: "VIN_RAW", from: { refDes: "F1", pin: "1" }, to: [] },
      { name: "VIN_FUSED", from: { refDes: "F1", pin: "2" }, to: [] },
    ],
    rating: "750mA hold, ~1.5A trip",
    certRelevant: false,
    notes: "Self-resetting after fault clears. Use on USB input or low-current power inputs. For higher current designs, use the SB fuse parts (0.5A-8A range in library).",
  },
  {
    id: "schottky-reverse-polarity",
    name: "Reverse Polarity Protection (Schottky)",
    type: "polarity",
    interface: "Power Input",
    components: [
      {
        refDes: "D_REV",
        eagleLibrary: "REC_Standard_Library v365",
        eagleDevice: "1N5819HW-7-F",
        eaglePackage: "SOD2512X110N",
        description: "40V 1A Schottky — series reverse polarity protection",
      },
    ],
    nets: [
      { name: "VIN_RAW", from: { refDes: "D_REV", pin: "A" }, to: [] },
      { name: "VIN_PROTECTED", from: { refDes: "D_REV", pin: "K" }, to: [] },
    ],
    rating: "40V, 1A, ~0.4V forward drop",
    notes: "Simple but lossy — 0.4V drop at full load. Acceptable for 5V+ inputs. For low-dropout designs, use P-MOSFET reverse protection instead (SI7149ADP in library).",
  },

  // TODO: Add more:
  // - SI7149ADP P-MOSFET reverse polarity (lower drop than Schottky)
  // - Ferrite + cap EMI filter (FERRITE_120^_1206 + 0.1UF)
  // - Full input protection stack: polyfuse + TVS + Schottky
];
