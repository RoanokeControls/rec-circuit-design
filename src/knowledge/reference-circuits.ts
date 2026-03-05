import { ReferenceCircuit } from "../types/index.js";

// ── Your team's standard reference circuit designs ──
// Component names use REC_Standard_Library.lbr deviceset names.
// See eagle-libraries.ts for naming conventions and footprint mappings.
//
// To look up a part in the library, use the autodesk-coder MCP:
//   search_api("ESP32", type_filter: "library_part")

export const referenceCircuits: ReferenceCircuit[] = [
  {
    id: "esp32-wrover-base",
    name: "ESP32-WROVER Base System",
    description: "Standard ESP32-WROVER with decoupling, programming header, and power indicator LED",
    mcu: "ESP32-WROVER",
    category: "mcu-system",
    blocks: [
      {
        id: "esp32-wrover-decoupling",
        name: "ESP32-WROVER Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDD3P3 bypass — place within 3mm of pin",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10UF_0805",
            eaglePackage: "CAPC2012X110",
            value: "10UF",
            description: "VDD3P3 bulk — place within 10mm",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            value: "0.1UF",
            description: "VDD_SDIO bypass",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "A1", pin: "VDD3P3" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "A1", pin: "GND" }] },
        ],
        designRules: [
          "Use 0.1UF_0603 X7R or C0G — no Y5V for bypass",
          "Place decoupling caps on same layer as module, not on back side",
        ],
      },
      {
        id: "esp32-wrover-programming",
        name: "ESP32 Tag-Connect Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "ESP32_TAG",
            eaglePackage: "TC2030-MCP-NL",
            description: "Tag-Connect 6-pin programming header for ESP32",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            value: "10K",
            description: "GPIO0 pull-up — boot mode select",
          },
          {
            refDes: "C4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10UF_0805",
            eaglePackage: "CAPC2012X110",
            value: "10UF",
            description: "EN auto-reset cap — DTR line",
          },
        ],
        nets: [
          { name: "GPIO0", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "A1", pin: "GPIO0" }] },
          { name: "EN", from: { refDes: "C4", pin: "1" }, to: [{ refDes: "A1", pin: "EN" }] },
        ],
        designRules: [
          "10uF on EN line provides auto-reset via DTR — do not reduce below 4.7uF",
          "ESP32_TAG footprint is TC2030-MCP-NL — no-legs variant, uses pogo pads",
        ],
      },
      {
        id: "esp32-wrover-power-led",
        name: "Power Indicator LED",
        type: "led-driver",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "LED_RED_0805",
            eaglePackage: "LEDC2012X110N_B",
            description: "Power indicator LED",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            value: "1K",
            description: "LED current limiter — ~2mA at 3.3V",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R2", pin: "1" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "GND", from: { refDes: "D1", pin: "K" }, to: [] },
        ],
        designRules: [],
      },
    ],
    designRules: [
      "15mm ground-plane clearance under antenna — no traces, no copper pour",
      "Ground stitching vias every 2mm along antenna keep-out boundary",
      "ESP32-WROVER has two footprint variants: default and ALT — check pin count (39 vs 38 pads)",
    ],
    sourceProject: "TEMPLATE-ESP32-WROVER-V1",
    notes: "Base template — add power supply and peripheral blocks as needed. Use ALT variant footprint if standard doesn't match your module revision.",
  },

  // TODO: Add more reference circuits:
  // - STM32F103C8T6 base (use -M footprint variant for production)
  // - STM32F103RCT6 base (use -M footprint variant for production)
  // - ATtiny404 minimal
  // - MSP430G2755 system
  // - Sensor hub designs
  // - Motor driver boards (DRV8308)
];
