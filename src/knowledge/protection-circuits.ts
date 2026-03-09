import { ProtectionCircuit } from "../types/index.js";

// ── REC standard protection circuit blocks ──
// Hand-curated entries preserved. Mined entries built from protection analysis across 261 designs.
// Component names match REC_Standard_Library.lbr devicesets.

export const protectionCircuits: ProtectionCircuit[] = [
  // ──────────────────────────────────────────────────
  // Hand-curated: 3.3V 4-line ESD protection
  // ──────────────────────────────────────────────────
  {
    id: "esd-3v3-4line",
    name: "3.3V 4-Line ESD Protection",
    type: "esd",
    interface: "GPIO / I2C / SPI",
    components: [
      {
        refDes: "D_ESD",
        eagleLibrary: "REC_Standard_Library",
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

  // ──────────────────────────────────────────────────
  // Hand-curated: 20V TVS power protection
  // ──────────────────────────────────────────────────
  {
    id: "tvs-20v-power",
    name: "20V TVS Power Protection",
    type: "tvs",
    interface: "Power Input",
    components: [
      {
        refDes: "D_TVS",
        eagleLibrary: "REC_Standard_Library",
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

  // ──────────────────────────────────────────────────
  // Hand-curated: Resettable polyfuse
  // ──────────────────────────────────────────────────
  {
    id: "polyfuse-input",
    name: "Resettable Fuse (Input Protection)",
    type: "fuse",
    interface: "Power Input",
    components: [
      {
        refDes: "F1",
        eagleLibrary: "REC_Standard_Library",
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

  // ──────────────────────────────────────────────────
  // Hand-curated: Schottky reverse polarity
  // ──────────────────────────────────────────────────
  {
    id: "schottky-reverse-polarity",
    name: "Reverse Polarity Protection (Schottky)",
    type: "polarity",
    interface: "Power Input",
    components: [
      {
        refDes: "D_REV",
        eagleLibrary: "REC_Standard_Library",
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
    notes: "Simple but lossy — 0.4V drop at full load. Acceptable for 5V+ inputs. For low-dropout designs, use P-MOSFET reverse protection instead (SI3455DV in library).",
  },

  // ──────────────────────────────────────────────────
  // Mined: 275V MOV varistor AC line protection
  // Found in 20+ designs — most common protection component
  // ──────────────────────────────────────────────────
  {
    id: "varistor-275v-ac-line",
    name: "275V MOV AC Line Protection",
    type: "surge",
    interface: "AC Mains Input",
    components: [
      {
        refDes: "V1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "275V_VARISTORB",
        eaglePackage: "VARISTORB",
        description: "275V metal oxide varistor — AC mains surge protection",
        critical: true,
      },
    ],
    nets: [
      { name: "AC_HOT", from: { refDes: "V1", pin: "1" }, to: [] },
      { name: "AC_NEUTRAL", from: { refDes: "V1", pin: "2" }, to: [] },
    ],
    rating: "275V RMS clamping, ~700V peak clamp",
    certRelevant: true,
    notes: "Mined from 20+ production designs. Most common AC protection at REC. Place across AC line and neutral, before fuse. 275V_VARISTORB is the standard — 150V_VARISTOR variant used for lower-voltage AC (3 designs). 47V_VARISTORB used for DC protection (1 design).",
  },

  // ──────────────────────────────────────────────────
  // Mined: AC line fuse (fuseclip style)
  // Found in 15+ designs for mains-powered products
  // ──────────────────────────────────────────────────
  {
    id: "fuseclip-ac-input",
    name: "AC Line Fuse (Fuseclip)",
    type: "fuse",
    interface: "AC Mains Input",
    components: [
      {
        refDes: "F1A",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "FUSECLIP",
        eaglePackage: "FUSECLIP",
        description: "PCB-mount fuse clip — hot side",
      },
      {
        refDes: "F1B",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "FUSECLIP",
        eaglePackage: "FUSECLIP",
        description: "PCB-mount fuse clip — hot side second contact",
      },
    ],
    nets: [
      { name: "AC_HOT", from: { refDes: "F1A", pin: "1" }, to: [] },
      { name: "AC_HOT_FUSED", from: { refDes: "F1B", pin: "1" }, to: [] },
    ],
    rating: "Depends on fuse installed — typically 1A-8A slow-blow",
    certRelevant: true,
    notes: "Mined from 15+ designs. Standard REC pattern uses dual fuseclip pads for through-hole glass fuse. Place on AC hot line before varistor and regulator. Some designs use up to 6 fuse pairs for multi-channel protection.",
  },

  // ──────────────────────────────────────────────────
  // Mined: AC input protection stack (varistor + fuse combo)
  // Common pattern seen across mains-powered designs
  // ──────────────────────────────────────────────────
  {
    id: "ac-input-protection-stack",
    name: "AC Input Protection Stack (Fuse + MOV)",
    type: "surge",
    interface: "AC Mains Input",
    components: [
      {
        refDes: "F1A",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "FUSECLIP",
        eaglePackage: "FUSECLIP",
        description: "PCB fuse clip — hot side input",
      },
      {
        refDes: "F1B",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "FUSECLIP",
        eaglePackage: "FUSECLIP",
        description: "PCB fuse clip — hot side output",
      },
      {
        refDes: "V1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "275V_VARISTORB",
        eaglePackage: "VARISTORB",
        description: "275V MOV across AC line — clamps surges",
        critical: true,
      },
      {
        refDes: "F2",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.75A_POLYSW",
        eaglePackage: "RESC1608X60",
        description: "DC-side polyfuse after rectification — protects downstream logic",
      },
    ],
    nets: [
      { name: "AC_HOT", from: { refDes: "F1A", pin: "1" }, to: [] },
      { name: "AC_HOT_FUSED", from: { refDes: "F1B", pin: "1" }, to: [{ refDes: "V1", pin: "1" }] },
      { name: "AC_NEUTRAL", from: { refDes: "V1", pin: "2" }, to: [] },
    ],
    rating: "275V MOV + fuse combination — UL/CE typical",
    certRelevant: true,
    notes: "Combined pattern mined from All-In-One_Schematic and similar designs. Fuse protects against MOV failure (short-circuit mode). Place fuse before MOV on hot line. DC-side polyfuse optional but common in REC designs.",
  },

  // ──────────────────────────────────────────────────
  // Mined: P-FET reverse polarity (low-drop alternative)
  // Found in 1 design but referenced in multiple contexts
  // ──────────────────────────────────────────────────
  {
    id: "pfet-reverse-polarity",
    name: "P-MOSFET Reverse Polarity Protection (Low Drop)",
    type: "polarity",
    interface: "Power Input (DC)",
    components: [
      {
        refDes: "Q1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "SI3455DV",
        eaglePackage: "SOT-23-3",
        description: "P-channel MOSFET — low Rds(on) reverse polarity protection",
        critical: true,
      },
    ],
    nets: [
      { name: "VIN_RAW", from: { refDes: "Q1", pin: "S" }, to: [] },
      { name: "VIN_PROTECTED", from: { refDes: "Q1", pin: "D" }, to: [] },
      { name: "GND", from: { refDes: "Q1", pin: "G" }, to: [] },
    ],
    rating: "~30V, ~3A continuous. Voltage drop: I × Rds(on), typically <50mV at 1A",
    notes: "Mined from Clamshell_Grill design. Much lower drop than Schottky (50mV vs 400mV). Gate tied to GND — when VIN is positive, Vgs exceeds threshold and MOSFET conducts. When VIN is reversed, Vgs=0 and body diode blocks. Preferred over Schottky for battery-powered or low-voltage designs.",
  },

  // ──────────────────────────────────────────────────
  // Mined: 15V zener overvoltage clamp
  // Found in triac/relay designs
  // ──────────────────────────────────────────────────
  {
    id: "zener-15v-overvoltage",
    name: "15V Zener Overvoltage Clamp",
    type: "overvoltage",
    interface: "DC Power Rail",
    components: [
      {
        refDes: "D_Z1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "ZENER_15V_SMA",
        eaglePackage: "SMA",
        description: "15V zener diode — clamps overvoltage on 12V rail",
      },
    ],
    nets: [
      { name: "GND", from: { refDes: "D_Z1", pin: "A" }, to: [] },
      { name: "+12V", from: { refDes: "D_Z1", pin: "K" }, to: [] },
    ],
    rating: "15V zener, SMA package — handles transient clamping on 12V rail",
    certRelevant: false,
    notes: "Mined from FGLF0623_Triac_Board designs. Used to clamp inductive kickback or overshoot on 12V supply rail. Zener placed cathode-to-rail, anode-to-ground. Conducts when rail exceeds 15V. Often paired with upstream fuse.",
  },

  // ──────────────────────────────────────────────────
  // Mined: 150V MOV for DC/low-voltage AC protection
  // Found in 3 designs
  // ──────────────────────────────────────────────────
  {
    id: "varistor-150v-dc",
    name: "150V MOV DC/Low-Voltage Protection",
    type: "surge",
    interface: "DC Power / Low-Voltage AC",
    components: [
      {
        refDes: "V1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "150V_VARISTOR",
        eaglePackage: "VARISTOR",
        description: "150V metal oxide varistor — DC or low-voltage AC surge protection",
      },
    ],
    nets: [
      { name: "VIN", from: { refDes: "V1", pin: "1" }, to: [] },
      { name: "GND", from: { refDes: "V1", pin: "2" }, to: [] },
    ],
    rating: "150V RMS clamping",
    certRelevant: true,
    notes: "Mined from 3 designs. Used on 24V-48V DC inputs or low-voltage AC. Smaller form factor than 275V variant. Place at power entry point.",
  },

  // ──────────────────────────────────────────────────
  // Mined: EMI filter (ferrite bead + bypass cap)
  // Common pattern on power and signal lines
  // ──────────────────────────────────────────────────
  {
    id: "emi-filter-ferrite-cap",
    name: "EMI Filter (Ferrite + Bypass Cap)",
    type: "surge",
    interface: "Power Rail / Signal Line",
    components: [
      {
        refDes: "FB1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "FERRITE_120^_1206",
        eaglePackage: "RESC3216X70",
        description: "120 ohm ferrite bead 1206 — attenuates high-frequency noise",
      },
      {
        refDes: "C_F1",
        eagleLibrary: "REC_Standard_Library",
        eagleDevice: "0.1UF_0603_5%_50V",
        eaglePackage: "CAPC1608X85",
        value: "0.1UF",
        description: "Bypass cap after ferrite — forms low-pass filter",
      },
    ],
    nets: [
      { name: "VIN_NOISY", from: { refDes: "FB1", pin: "1" }, to: [] },
      { name: "VIN_FILTERED", from: { refDes: "FB1", pin: "2" }, to: [{ refDes: "C_F1", pin: "1" }] },
      { name: "GND", from: { refDes: "C_F1", pin: "2" }, to: [] },
    ],
    rating: "120 ohm @ 100MHz, minimal DC resistance",
    certRelevant: false,
    notes: "Common EMI suppression pattern. Ferrite + cap forms pi or L filter depending on placement. Use 120 ohm for general purpose, 330 ohm (FERRITE_330^_0805) for more aggressive filtering. Place between noisy source (switching regulator, motor driver) and sensitive circuits (MCU, ADC).",
  },
];
