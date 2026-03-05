import { PowerSupplyDesign } from "../types/index.js";

// ── Your team's standard power supply designs ──
// Component names match REC_Standard_Library.lbr devicesets.

export const powerSupplies: PowerSupplyDesign[] = [
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

  // TODO: Add more power supplies using REC library parts:
  // - TPS54286PWPR dual buck converter
  // - MC33063ADR buck/boost
  // - MAX1672EEE+ step-up
  // - LM317DCYR adjustable
];
