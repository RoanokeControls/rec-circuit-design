import { PowerSupplyDesign } from "../types/index.js";

// ── REC standard power supply designs ──
// Hand-curated entries preserved. Mined entries built from 261 design analysis.
// Component names match REC_Standard_Library.lbr devicesets.

export const powerSupplies: PowerSupplyDesign[] = [
  // ──────────────────────────────────────────────────
  // Hand-curated: NCP1117 3.3V LDO (41 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "usb-5v-to-3v3-ldo-ncp1117",
    name: "USB 5V to 3.3V LDO (NCP1117)",
    topology: "ldo",
    inputVoltage: { min: 4.5, typ: 5.0, max: 5.5 },
    outputVoltage: 3.3,
    outputCurrent: 1.0,
    components: [
      {
        refDes: "VR1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "NCP1117ST33T3G",
        eaglePackage: "SOT230P700X170-4",
        description: "3.3V LDO regulator 1A SOT-223",
        critical: true,
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_1206_10%_25V",
        eaglePackage: "CAPC3216X135",
        value: "10UF",
        description: "Input capacitor — 10uF ceramic",
      },
      {
        refDes: "C_INB",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Input bypass ceramic — place adjacent to VIN",
      },
      {
        refDes: "C_OUT",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_0805",
        eaglePackage: "CAPC2012X110",
        value: "10UF",
        description: "Output capacitor — ESR critical for stability",
        critical: true,
      },
      {
        refDes: "C_OUTB",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Output bypass ceramic",
      },
    ],
    nets: [
      { name: "+5V_SUPPLY", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "VR1", pin: "VIN" }, { refDes: "C_INB", pin: "1" }] },
      { name: "+3.3V", from: { refDes: "VR1", pin: "VOUT" }, to: [{ refDes: "C_OUT", pin: "1" }, { refDes: "C_OUTB", pin: "1" }] },
      { name: "GND", from: { refDes: "VR1", pin: "GND" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT", pin: "2" }] },
    ],
    thermalNotes: "At 500mA load, dissipates ~850mW. SOT-223 tab needs 200mm² copper pour minimum. Above 700mA continuous, consider switching regulator.",
    efficiency: "~66% at 5V in, 3.3V/500mA out — acceptable for USB-powered, avoid for battery",
    notes: "Workhorse design. NCP1117 is in REC library as SOT-223. For lower power designs, use SPX3819M5-L-3-3/TR (SOT-23-5, 500mA, much lower Iq).",
  },

  // ──────────────────────────────────────────────────
  // Hand-curated: SPX3819 3.3V low-Iq LDO (6 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "usb-5v-to-3v3-ldo-spx3819",
    name: "USB 5V to 3.3V LDO (SPX3819 — low Iq)",
    topology: "ldo",
    inputVoltage: { min: 4.5, typ: 5.0, max: 5.5 },
    outputVoltage: 3.3,
    outputCurrent: 0.5,
    components: [
      {
        refDes: "U1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "SPX3819M5-L-3-3/TR",
        eaglePackage: "SOT-23-5",
        description: "3.3V LDO 500mA SOT-23-5 — low quiescent current",
        critical: true,
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_0805",
        eaglePackage: "CAPC2012X110",
        value: "10UF",
        description: "Input capacitor",
      },
      {
        refDes: "C_OUT",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_0805",
        eaglePackage: "CAPC2012X110",
        value: "10UF",
        description: "Output capacitor",
        critical: true,
      },
      {
        refDes: "C_BYP",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.01UF_0603",
        eaglePackage: "CAPC1608X85",
        value: "0.01UF",
        description: "Bypass/noise cap on BP pin — per datasheet",
      },
    ],
    nets: [
      { name: "+5V_SUPPLY", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "U1", pin: "IN" }] },
      { name: "+3.3V", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "C_OUT", pin: "1" }] },
      { name: "GND", from: { refDes: "U1", pin: "GND" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT", pin: "2" }] },
    ],
    thermalNotes: "SOT-23-5 limits thermal dissipation. Keep load under 400mA for reliable operation without extra copper.",
    efficiency: "~66% at 5V in, 3.3V out — same as any LDO at this dropout",
    notes: "Better than NCP1117 for lower power designs. Quiescent current ~10uA vs NCP1117's ~5mA. Use for battery-adjacent designs or sleep-mode-heavy firmware.",
  },

  // ──────────────────────────────────────────────────
  // Mined: LM317 adjustable LDO (21 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "lm317-adjustable-ldo",
    name: "LM317 Adjustable LDO (SOT-23-5)",
    topology: "ldo",
    inputVoltage: { min: 4.5, typ: 12.0, max: 37.0 },
    outputVoltage: 1.25, // adjustable via R1/R2 divider: Vout = 1.25V * (1 + R2/R1)
    outputCurrent: 0.5,
    components: [
      {
        refDes: "VR1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "LM317DCYR",
        eaglePackage: "SOT-23-5",
        description: "Adjustable LDO regulator SOT-23-5 — Vout set by resistor divider",
        critical: true,
      },
      {
        refDes: "R1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "240^_0603",
        eaglePackage: "RESC1608X60",
        value: "240",
        description: "LM317 program resistor (ADJ to OUT) — 240 ohm standard",
        critical: true,
      },
      {
        refDes: "R2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "390^_0603",
        eaglePackage: "RESC1608X60",
        value: "390",
        description: "LM317 set resistor — 390 ohm gives ~3.3V output. Change for other voltages.",
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Input bypass — place close to VIN pin",
      },
      {
        refDes: "C_OUT",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_0805",
        eaglePackage: "CAPC2012X110",
        value: "10UF",
        description: "Output capacitor — improves transient response",
      },
      {
        refDes: "D1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "1N5819HW-7-F",
        eaglePackage: "SOD2512X110N",
        description: "Output-to-input protection diode — prevents reverse current during power-down",
      },
    ],
    nets: [
      { name: "VIN", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "VR1", pin: "IN" }] },
      { name: "VOUT", from: { refDes: "VR1", pin: "OUT" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "C_OUT", pin: "1" }, { refDes: "D1", pin: "A" }] },
      { name: "ADJ", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "VR1", pin: "ADJ" }] },
      { name: "GND", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT", pin: "2" }] },
    ],
    thermalNotes: "SOT-23-5 variant limits to ~500mA. For higher current, use LM317_DPAK (D2PAK) which handles 1.5A with adequate heatsinking.",
    efficiency: "Linear regulator — efficiency = Vout/Vin. At 12V→3.3V only ~28%. Use buck converter for wide Vin range.",
    notes: "Mined from 21 designs. Most common input: +5V (10 designs), +12V (6 designs). Most common output: +5V (10 designs), +3.3V (8 designs). Vout formula: 1.25V × (1 + R2/R1). D2PAK variant available for >500mA.",
  },

  // ──────────────────────────────────────────────────
  // Mined: MC7805 5V linear regulator (10 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "mc7805-5v-linear",
    name: "MC7805 5V Fixed Linear Regulator",
    topology: "linear",
    inputVoltage: { min: 7.0, typ: 12.0, max: 35.0 },
    outputVoltage: 5.0,
    outputCurrent: 1.0,
    components: [
      {
        refDes: "VR1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "MC7805",
        eaglePackage: "D2PAK",
        description: "5V fixed linear regulator 1A D2PAK",
        critical: true,
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Input bypass — required if regulator is >6 inches from filter caps",
      },
      {
        refDes: "C_OUT",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_0805",
        eaglePackage: "CAPC2012X110",
        value: "10UF",
        description: "Output capacitor — improves transient response",
      },
    ],
    nets: [
      { name: "+24V", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "VR1", pin: "IN" }] },
      { name: "+5V", from: { refDes: "VR1", pin: "OUT" }, to: [{ refDes: "C_OUT", pin: "1" }] },
      { name: "GND", from: { refDes: "VR1", pin: "GND" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT", pin: "2" }] },
    ],
    thermalNotes: "At 24V→5V, 500mA = 9.5W dissipation! Needs large copper pour or heatsink. At 12V→5V, 500mA = 3.5W — still hot. Consider buck converter for >200mA from 24V.",
    efficiency: "~21% at 24V in, ~42% at 12V in. Linear topology, very inefficient for high Vin.",
    notes: "Mined from 10 designs. Most common input: +24V (6 designs), +12V (4 designs). Used in industrial controls where noise rejection matters more than efficiency. For new designs, consider TPS54286PWPR buck converter.",
  },

  // ──────────────────────────────────────────────────
  // Mined: TPS54286PWPR dual buck converter (7 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "tps54286-dual-buck",
    name: "TPS54286PWPR Dual Buck Converter",
    topology: "buck",
    inputVoltage: { min: 4.5, typ: 5.0, max: 18.0 },
    outputVoltage: 3.3, // Channel 1 typically 3.3V, Channel 2 configurable
    outputCurrent: 1.0,
    components: [
      {
        refDes: "U1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "TPS54286PWPR",
        eaglePackage: "PWP14_2P31X2P46_TEX",
        description: "Dual 1A output buck converter — high efficiency",
        critical: true,
      },
      {
        refDes: "L1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UH_2.3A",
        eaglePackage: "IND_IHLP-2020CZ",
        description: "Channel 1 inductor — 10uH for 3.3V output",
        critical: true,
      },
      {
        refDes: "L2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "22UH_1.9A",
        eaglePackage: "IND_IHLP-2020CZ",
        description: "Channel 2 inductor — 22uH for lower voltage output",
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_1206_10%_25V",
        eaglePackage: "CAPC3216X135",
        value: "10UF",
        description: "Input capacitor — low ESR ceramic required",
        critical: true,
      },
      {
        refDes: "C_OUT1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "22UF_1206_10V1206",
        eaglePackage: "CAPC3216X135",
        value: "22UF",
        description: "Channel 1 output capacitor",
      },
      {
        refDes: "C_OUT2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "22UF_1206_10V1206",
        eaglePackage: "CAPC3216X135",
        value: "22UF",
        description: "Channel 2 output capacitor",
      },
      {
        refDes: "R_FB1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10K_0603",
        eaglePackage: "RESC1608X60",
        value: "10K",
        description: "Channel 1 feedback top resistor",
      },
      {
        refDes: "R_FB2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "4.7K_0603",
        eaglePackage: "RESC1608X60",
        value: "4.7K",
        description: "Channel 1 feedback bottom resistor — sets 3.3V output",
      },
    ],
    nets: [
      { name: "VIN", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "U1", pin: "VIN" }] },
      { name: "SW1", from: { refDes: "U1", pin: "SW1" }, to: [{ refDes: "L1", pin: "1" }] },
      { name: "+3.3V", from: { refDes: "L1", pin: "2" }, to: [{ refDes: "C_OUT1", pin: "1" }, { refDes: "R_FB1", pin: "1" }] },
      { name: "FB1", from: { refDes: "R_FB1", pin: "2" }, to: [{ refDes: "R_FB2", pin: "1" }, { refDes: "U1", pin: "FB1" }] },
      { name: "GND", from: { refDes: "R_FB2", pin: "2" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT1", pin: "2" }] },
    ],
    thermalNotes: "TSSOP-14 with exposed pad — solder pad to ground plane for thermal performance. >85% efficiency typical.",
    efficiency: "~88% at 5V→3.3V/500mA, ~85% at 12V→3.3V/500mA — far better than LDO",
    notes: "Mined from 7 designs. Dual output replaces two separate LDOs. Layout-critical: keep input cap, inductor, and output cap loop areas minimal. IHLP-2020CZ inductors are shielded — preferred for EMI.",
  },

  // ──────────────────────────────────────────────────
  // Mined: AOZ6662 buck converter (3 occurrences)
  // ──────────────────────────────────────────────────
  {
    id: "aoz6662-buck",
    name: "AOZ6662 Synchronous Buck Converter",
    topology: "buck",
    inputVoltage: { min: 4.5, typ: 12.0, max: 18.0 },
    outputVoltage: 3.3,
    outputCurrent: 2.0,
    components: [
      {
        refDes: "U1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "AOZ6662",
        eaglePackage: "SOT-23-6",
        description: "2A synchronous buck converter SOT-23-6 — high efficiency, tiny footprint",
        critical: true,
      },
      {
        refDes: "L1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UH_2.3A",
        eaglePackage: "IND_IHLP-2020CZ",
        description: "Buck inductor — 10uH for 3.3V output from 12V",
        critical: true,
      },
      {
        refDes: "C_IN",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "10UF_1206_10%_25V",
        eaglePackage: "CAPC3216X135",
        value: "10UF",
        description: "Input capacitor — low ESR ceramic",
        critical: true,
      },
      {
        refDes: "C_BST",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Bootstrap capacitor",
      },
      {
        refDes: "C_OUT",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "22UF_1206_10V1206",
        eaglePackage: "CAPC3216X135",
        value: "22UF",
        description: "Output capacitor",
      },
      {
        refDes: "R_FB1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "100K_0603",
        eaglePackage: "RESC1608X60",
        value: "100K",
        description: "Feedback top resistor",
      },
      {
        refDes: "R_FB2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "47K_0603",
        eaglePackage: "RESC1608X60",
        value: "47K",
        description: "Feedback bottom resistor — sets output voltage",
      },
    ],
    nets: [
      { name: "VIN", from: { refDes: "C_IN", pin: "1" }, to: [{ refDes: "U1", pin: "VIN" }] },
      { name: "SW", from: { refDes: "U1", pin: "LX" }, to: [{ refDes: "L1", pin: "1" }] },
      { name: "+3.3V", from: { refDes: "L1", pin: "2" }, to: [{ refDes: "C_OUT", pin: "1" }, { refDes: "R_FB1", pin: "1" }] },
      { name: "FB", from: { refDes: "R_FB1", pin: "2" }, to: [{ refDes: "R_FB2", pin: "1" }, { refDes: "U1", pin: "FB" }] },
      { name: "GND", from: { refDes: "R_FB2", pin: "2" }, to: [{ refDes: "C_IN", pin: "2" }, { refDes: "C_OUT", pin: "2" }] },
    ],
    thermalNotes: "SOT-23-6 with synchronous rectification — efficient enough to avoid heatsinking at most loads.",
    efficiency: "~90% typical at 12V→3.3V/1A — excellent for battery and high-current designs",
    notes: "Mined from 3 designs. Compact SOT-23-6 alternative to TPS54. Good for single-output designs needing up to 2A. Application circuit data available from extract-application-circuit tool.",
  },
];
