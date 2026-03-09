import { ReferenceCircuit } from "../types/index.js";

// ── REC standard reference circuit designs ──
// Component names use REC_Standard_Library.lbr deviceset names.
// Hand-curated entries are marked with sourceProject.
// Auto-generated entries are built from mined MCU profiles across 261 designs.

export const referenceCircuits: ReferenceCircuit[] = [
  // ──────────────────────────────────────────────────
  // Hand-curated: ESP32-WROVER (16 designs)
  // ──────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────
  // Mined: PIC18F26 (27 designs — most used MCU)
  // ──────────────────────────────────────────────────
  {
    id: "pic18f26-base",
    name: "PIC18F26 Base System",
    description: "PIC18F26 with ICSP programming, decoupling, and MCLR reset. Mined from 27 production designs.",
    mcu: "PIC18F26",
    category: "mcu-system",
    blocks: [
      {
        id: "pic18f26-decoupling",
        name: "PIC18F26 Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_10%_16V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDD bypass — most common across 27 designs (73 instances)",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2.2UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "2.2UF",
            description: "VDD bulk decoupling (25 instances across designs)",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_1206_10V1206",
            eaglePackage: "CAPC3216X135",
            value: "22UF",
            description: "Rail bulk capacitor (18 instances)",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "U1", pin: "VDD" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "VSS" }] },
        ],
        designRules: [
          "Place 0.1UF bypass within 3mm of each VDD pin",
          "PIC18F26 has 2 VDD/VSS pairs — each needs its own 0.1UF",
        ],
      },
      {
        id: "pic18f26-reset",
        name: "PIC18F26 MCLR Reset",
        type: "reset",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1.2K_0603",
            eaglePackage: "RESC1608X60",
            value: "1.2K",
            description: "MCLR pull-up — 1.2K standard per mined data (not 10K like other MCUs)",
            critical: true,
          },
          {
            refDes: "C4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_10%_16V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "MCLR filter cap",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "MCLR", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C4", pin: "1" }, { refDes: "U1", pin: "MCLR" }] },
          { name: "GND", from: { refDes: "C4", pin: "2" }, to: [] },
        ],
        designRules: [
          "PIC18F26 uses 1.2K MCLR pull-up — different from 10K used on STM32/ESP32",
        ],
      },
      {
        id: "pic18f26-programming",
        name: "PIC18F26 ICSP Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "TC2030_ICSP",
            eaglePackage: "TC2030-MCP-NL-CP",
            description: "Tag-Connect 6-pin ICSP header",
          },
        ],
        nets: [
          { name: "MCLR", from: { refDes: "J1", pin: "1" }, to: [{ refDes: "U1", pin: "MCLR" }] },
          { name: "PGD", from: { refDes: "J1", pin: "4" }, to: [{ refDes: "U1", pin: "PGD" }] },
          { name: "PGC", from: { refDes: "J1", pin: "5" }, to: [{ refDes: "U1", pin: "PGC" }] },
          { name: "+3.3V", from: { refDes: "J1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "J1", pin: "3" }, to: [] },
        ],
        designRules: [
          "Do not share PGD/PGC with high-capacitance loads — keep programming lines clean",
          "Tag-Connect ICSP uses TC2030-MCP-NL-CP footprint (with alignment pins)",
        ],
      },
    ],
    designRules: [
      "PIC18F26 runs at 3.3V — verify all peripherals are 3.3V-compatible",
      "Commonly paired with RP2040 and ESP32-WROVER in multi-MCU designs",
    ],
    sourceProject: "MINED-27-DESIGNS",
    notes: "Auto-generated from 27 production designs including 12_in_CD_Tmr_Ctrl_Small, FGLF0623_Triac_Board, ZLF0053, and others. Most common MCU at REC.",
  },

  // ──────────────────────────────────────────────────
  // Mined: STM32G030 (10 designs)
  // ──────────────────────────────────────────────────
  {
    id: "stm32g030-base",
    name: "STM32G030 Base System",
    description: "STM32G030 with SWD programming, decoupling, and reset. Mined from 10 production designs.",
    mcu: "STM32G030",
    category: "mcu-system",
    blocks: [
      {
        id: "stm32g030-decoupling",
        name: "STM32G030 Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDD bypass — 50V rating preferred for STM32G (33 instances across designs)",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10UF_0805",
            eaglePackage: "CAPC2012X110",
            value: "10UF",
            description: "VDD bulk capacitor",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "U1", pin: "VDD" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "VSS" }] },
        ],
        designRules: [
          "STM32G030 has single VDD/VSS pair — one 0.1UF bypass minimum",
          "50V-rated caps preferred even on 3.3V rail for noise immunity",
        ],
      },
      {
        id: "stm32g030-reset",
        name: "STM32G030 NRST Reset",
        type: "reset",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "NRST pull-up",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "NRST filter cap — prevents noise resets",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "NRST", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C3", pin: "1" }, { refDes: "U1", pin: "NRST" }] },
          { name: "GND", from: { refDes: "C3", pin: "2" }, to: [] },
        ],
        designRules: [
          "100nF on NRST recommended by ST for noise-prone environments",
        ],
      },
      {
        id: "stm32g030-programming",
        name: "STM32G030 SWD Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "TC2030_ICSP",
            eaglePackage: "TC2030-MCP-NL-CP",
            description: "Tag-Connect 6-pin SWD header (shared footprint with ICSP)",
          },
        ],
        nets: [
          { name: "SWDIO", from: { refDes: "J1", pin: "4" }, to: [{ refDes: "U1", pin: "PA13" }] },
          { name: "SWCLK", from: { refDes: "J1", pin: "5" }, to: [{ refDes: "U1", pin: "PA14" }] },
          { name: "NRST", from: { refDes: "J1", pin: "1" }, to: [{ refDes: "U1", pin: "NRST" }] },
          { name: "+3.3V", from: { refDes: "J1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "J1", pin: "3" }, to: [] },
        ],
        designRules: [
          "PA13/PA14 default to SWD — do not reassign in firmware until programming is verified",
        ],
      },
    ],
    designRules: [
      "STM32G030 is 3.3V only — no 5V-tolerant pins",
      "Cost-effective choice for simple control boards — used in Clamshell_Grill, Livewell, UM0017PCB",
    ],
    sourceProject: "MINED-10-DESIGNS",
    notes: "Auto-generated from 10 production designs. STM32G030 is the go-to for new low-pin-count 3.3V designs at REC.",
  },

  // ──────────────────────────────────────────────────
  // Mined: ESP32-WROOM (9 designs)
  // ──────────────────────────────────────────────────
  {
    id: "esp32-wroom-base",
    name: "ESP32-WROOM Base System",
    description: "ESP32-WROOM module with decoupling and programming. Mined from 9 production designs.",
    mcu: "ESP32-WROOM",
    category: "mcu-system",
    blocks: [
      {
        id: "esp32-wroom-decoupling",
        name: "ESP32-WROOM Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_10%_16V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDD3P3 bypass (28 instances across 9 designs)",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10UF_1206_10%_25V",
            eaglePackage: "CAPC3216X135",
            value: "10UF",
            description: "VDD3P3 bulk (10 instances)",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "1UF",
            description: "VDD_SDIO decoupling (6 instances)",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "A1", pin: "VDD3P3" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "A1", pin: "GND" }] },
        ],
        designRules: [
          "WROOM uses same decoupling strategy as WROVER — 0.1UF close + bulk",
          "1UF on VDD_SDIO is WROOM-specific (WROVER uses 0.1UF)",
        ],
      },
      {
        id: "esp32-wroom-reset",
        name: "ESP32-WROOM Reset",
        type: "reset",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "EN pull-up",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "EN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "A1", pin: "EN" }] },
        ],
      },
      {
        id: "esp32-wroom-programming",
        name: "ESP32-WROOM Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "ESP32_TAG",
            eaglePackage: "TC2030-MCP-NL",
            description: "Tag-Connect programming header for ESP32",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "GPIO0 pull-up — boot mode select",
          },
        ],
        nets: [
          { name: "GPIO0", from: { refDes: "R2", pin: "1" }, to: [{ refDes: "A1", pin: "GPIO0" }] },
          { name: "EN", from: { refDes: "J1", pin: "1" }, to: [{ refDes: "A1", pin: "EN" }] },
        ],
        designRules: [
          "WROOM and WROVER share the same programming pinout",
        ],
      },
    ],
    designRules: [
      "WROOM has PCB antenna — same 15mm keep-out as WROVER",
      "WROOM pinout differs from WROVER — verify footprint matches module variant",
      "Some WROOM designs use JTAG instead of UART boot (2 designs)",
    ],
    sourceProject: "MINED-9-DESIGNS",
    notes: "Auto-generated from 9 designs including NuvoLite_PCB, ESP32_LCD_Design_Touch, PCB_Connectware. WROOM is the lower-cost alternative to WROVER (no PSRAM).",
  },

  // ──────────────────────────────────────────────────
  // Mined: RP2040 (6 designs)
  // ──────────────────────────────────────────────────
  {
    id: "rp2040-base",
    name: "RP2040 Base System",
    description: "RP2040 with SWD programming and decoupling. Mined from 6 production designs.",
    mcu: "RP2040",
    category: "mcu-system",
    blocks: [
      {
        id: "rp2040-decoupling",
        name: "RP2040 Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_10%_16V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "DVDD bypass — RP2040 needs one per DVDD pin (68 total across 6 designs)",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2.2UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "2.2UF",
            description: "USB PHY decoupling — required per RP2040 datasheet (26 instances)",
            critical: true,
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "U1", pin: "DVDD" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "GND" }] },
          { name: "USB_VDD", from: { refDes: "C2", pin: "1" }, to: [{ refDes: "U1", pin: "USB_VDD" }] },
        ],
        designRules: [
          "RP2040 has 6 power pins — each DVDD needs its own 0.1UF bypass",
          "2.2UF on USB_VDD is mandatory even if USB not used",
        ],
      },
      {
        id: "rp2040-programming",
        name: "RP2040 SWD Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "TC2030_ICSP",
            eaglePackage: "TC2030-MCP-NL-CP",
            description: "Tag-Connect 6-pin SWD header",
          },
        ],
        nets: [
          { name: "SWDIO", from: { refDes: "J1", pin: "4" }, to: [{ refDes: "U1", pin: "SWDIO" }] },
          { name: "SWCLK", from: { refDes: "J1", pin: "5" }, to: [{ refDes: "U1", pin: "SWCLK" }] },
          { name: "+3.3V", from: { refDes: "J1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "J1", pin: "3" }, to: [] },
        ],
        designRules: [
          "RP2040 also supports USB bootloader — hold BOOTSEL during reset for UF2 flashing",
        ],
      },
    ],
    designRules: [
      "RP2040 runs dual voltage: 1.1V core (internal regulator) + 3.3V IO",
      "Commonly paired with PIC18F26 and ESP32-WROVER in multi-MCU boards",
      "Native USB — no bridge IC needed (unlike ATMEGA328/PIC18F26)",
      "I2C, SPI, and USB interfaces confirmed across 3 designs each",
    ],
    sourceProject: "MINED-6-DESIGNS",
    notes: "Auto-generated from 6 designs including All-In-One_Schematic_IO_Board, LCD_Control, Pico_LCD_PCB.",
  },

  // ──────────────────────────────────────────────────
  // Mined: ATMEGA328 (6 designs)
  // ──────────────────────────────────────────────────
  {
    id: "atmega328-base",
    name: "ATMEGA328 Base System",
    description: "ATMEGA328 with ISP programming, decoupling, reset, and optional 16MHz crystal. Mined from 6 designs.",
    mcu: "ATMEGA328",
    category: "mcu-system",
    blocks: [
      {
        id: "atmega328-decoupling",
        name: "ATMEGA328 Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VCC bypass (20 instances across 6 designs)",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "AVCC bypass — separate from VCC",
          },
        ],
        nets: [
          { name: "+5V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "U1", pin: "VCC" }] },
          { name: "+5V", from: { refDes: "C2", pin: "1" }, to: [{ refDes: "U1", pin: "AVCC" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "GND" }] },
        ],
        designRules: [
          "ATMEGA328 runs at 5V — ensure all peripherals are 5V-tolerant",
          "AVCC needs its own bypass even if ADC not used",
        ],
      },
      {
        id: "atmega328-reset",
        name: "ATMEGA328 Reset",
        type: "reset",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "RESET pull-up",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "RESET filter cap",
          },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "RESET", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C3", pin: "1" }, { refDes: "U1", pin: "PC6" }] },
          { name: "GND", from: { refDes: "C3", pin: "2" }, to: [] },
        ],
      },
      {
        id: "atmega328-crystal",
        name: "ATMEGA328 16MHz Crystal",
        type: "clock",
        components: [
          {
            refDes: "Y1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "16MHz",
            eaglePackage: "HC49",
            value: "16MHz",
            description: "16MHz crystal — found in 1 of 6 designs (others use internal RC)",
          },
          {
            refDes: "C4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22PF_0603",
            eaglePackage: "CAPC1608X85",
            value: "22PF",
            description: "Crystal load cap",
          },
          {
            refDes: "C5",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22PF_0603",
            eaglePackage: "CAPC1608X85",
            value: "22PF",
            description: "Crystal load cap",
          },
        ],
        nets: [
          { name: "XTAL1", from: { refDes: "Y1", pin: "1" }, to: [{ refDes: "C4", pin: "1" }, { refDes: "U1", pin: "PB6" }] },
          { name: "XTAL2", from: { refDes: "Y1", pin: "2" }, to: [{ refDes: "C5", pin: "1" }, { refDes: "U1", pin: "PB7" }] },
          { name: "GND", from: { refDes: "C4", pin: "2" }, to: [{ refDes: "C5", pin: "2" }] },
        ],
        designRules: [
          "Optional — most REC designs use internal 8MHz RC oscillator",
          "If used, keep crystal traces short and guard with ground pour",
        ],
      },
      {
        id: "atmega328-programming",
        name: "ATMEGA328 ISP Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "TC2030_ICSP",
            eaglePackage: "TC2030-MCP-NL-CP",
            description: "Tag-Connect 6-pin ISP header",
          },
        ],
        nets: [
          { name: "RESET", from: { refDes: "J1", pin: "1" }, to: [{ refDes: "U1", pin: "PC6" }] },
          { name: "MOSI", from: { refDes: "J1", pin: "4" }, to: [{ refDes: "U1", pin: "PB3" }] },
          { name: "MISO", from: { refDes: "J1", pin: "5" }, to: [{ refDes: "U1", pin: "PB4" }] },
          { name: "+5V", from: { refDes: "J1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "J1", pin: "3" }, to: [] },
        ],
      },
    ],
    designRules: [
      "ATMEGA328 is 5V — level shifting needed for 3.3V peripherals",
      "FT232RL USB bridge used in designs needing serial communication",
      "I2C and SPI buses confirmed across 3 designs each",
    ],
    sourceProject: "MINED-6-DESIGNS",
    notes: "Auto-generated from 6 designs including BGW_Fan_Control, NanoV3.3, Southbend_RTD_control. Legacy MCU — consider STM32G030 for new designs.",
  },

  // ──────────────────────────────────────────────────
  // Mined: STM32F103 (6 designs)
  // ──────────────────────────────────────────────────
  {
    id: "stm32f103-base",
    name: "STM32F103 Base System",
    description: "STM32F103 with SWD programming, decoupling, reset, and 32.768kHz crystal. Mined from 6 designs.",
    mcu: "STM32F103",
    category: "mcu-system",
    blocks: [
      {
        id: "stm32f103-decoupling",
        name: "STM32F103 Decoupling",
        type: "decoupling",
        components: [
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDD bypass — one per VDD pin",
            critical: true,
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "VDDA bypass",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C1", pin: "1" }, to: [{ refDes: "CR1", pin: "VDD" }] },
          { name: "+3.3V", from: { refDes: "C2", pin: "1" }, to: [{ refDes: "CR1", pin: "VDDA" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "CR1", pin: "VSS" }] },
        ],
        designRules: [
          "STM32F103C8T6 has 3 VDD pins + VDDA — each needs 0.1UF bypass",
          "VBAT gets separate 0.1UF if RTC used",
        ],
      },
      {
        id: "stm32f103-reset",
        name: "STM32F103 NRST Reset",
        type: "reset",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "NRST pull-up",
          },
          {
            refDes: "C3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "NRST filter cap",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "NRST", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C3", pin: "1" }, { refDes: "CR1", pin: "NRST" }] },
          { name: "GND", from: { refDes: "C3", pin: "2" }, to: [] },
        ],
      },
      {
        id: "stm32f103-crystal",
        name: "STM32F103 Crystal",
        type: "clock",
        components: [
          {
            refDes: "Y1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "XSM0017",
            eaglePackage: "XSM0017",
            value: "8MHz",
            description: "HSE crystal (18 instances across designs) — XSM0017 is REC standard",
          },
          {
            refDes: "C4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22PF_0603",
            eaglePackage: "CAPC1608X85",
            value: "22PF",
            description: "HSE load cap",
          },
          {
            refDes: "C5",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22PF_0603",
            eaglePackage: "CAPC1608X85",
            value: "22PF",
            description: "HSE load cap",
          },
        ],
        nets: [
          { name: "OSC_IN", from: { refDes: "Y1", pin: "1" }, to: [{ refDes: "C4", pin: "1" }, { refDes: "CR1", pin: "OSC_IN" }] },
          { name: "OSC_OUT", from: { refDes: "Y1", pin: "2" }, to: [{ refDes: "C5", pin: "1" }, { refDes: "CR1", pin: "OSC_OUT" }] },
          { name: "GND", from: { refDes: "C4", pin: "2" }, to: [{ refDes: "C5", pin: "2" }] },
        ],
        designRules: [
          "XSM0017 is the standard crystal for STM32F103 at REC — 18 instances across designs",
          "Place crystal within 5mm of MCU OSC pins, guard with ground pour",
        ],
      },
      {
        id: "stm32f103-programming",
        name: "STM32F103 SWD Programming",
        type: "programming-header",
        components: [
          {
            refDes: "J1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "TC2030_ICSP",
            eaglePackage: "TC2030-MCP-NL-CP",
            description: "Tag-Connect 6-pin SWD header",
          },
        ],
        nets: [
          { name: "SWDIO", from: { refDes: "J1", pin: "4" }, to: [{ refDes: "CR1", pin: "PA13" }] },
          { name: "SWCLK", from: { refDes: "J1", pin: "5" }, to: [{ refDes: "CR1", pin: "PA14" }] },
          { name: "NRST", from: { refDes: "J1", pin: "1" }, to: [{ refDes: "CR1", pin: "NRST" }] },
          { name: "+3.3V", from: { refDes: "J1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "J1", pin: "3" }, to: [] },
        ],
      },
    ],
    designRules: [
      "Use -M footprint variant for production (machine-optimized pad sizes)",
      "STM32F103 uses CR prefix in REC library (not U)",
      "Commonly appears in pairs (main + backup) in redundant designs",
    ],
    sourceProject: "MINED-6-DESIGNS",
    notes: "Auto-generated from 6 designs including PCBLF0648-3 variants. STM32F103 available as C8T6 (48-pin) or RCT6 (64-pin) in REC library.",
  },

  // ══════════════════════════════════════════════════
  // Mims-sourced general-purpose reference circuits
  // Extracted from Forrest Mims Engineer's Notebooks
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // NPN Transistor Relay Driver
  // ──────────────────────────────────────────────────
  {
    id: "npn-relay-driver",
    name: "NPN Transistor Relay Driver",
    description: "Standard NPN relay driver with flyback diode. Drives relay coil from MCU GPIO pin. Used in 20+ REC designs for solenoids, relays, and other inductive loads.",
    category: "relay-driver",
    blocks: [
      {
        id: "npn-relay-driver-block",
        name: "NPN Relay Driver",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN switching transistor — drives relay coil from collector",
            critical: true,
          },
          {
            refDes: "R_B",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X60",
            value: "1K",
            description: "Base resistor — limits base current. 1K for 3.3V drive / ~50mA relay. Scale per formula: Rb = (Vdrive - 0.7) / (Ic / hfe * overdrive)",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Flyback protection diode — MANDATORY for inductive loads. Cathode to +V, anode to collector.",
            critical: true,
          },
        ],
        nets: [
          { name: "MCU_GPIO", from: { refDes: "R_B", pin: "1" }, to: [] },
          { name: "BASE", from: { refDes: "R_B", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY_COIL+", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "RELAY_COIL-", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "ALWAYS include flyback diode — inductive kickback WILL destroy the transistor without it",
          "1K base resistor works for 3.3V GPIO driving up to ~100mA relay coil",
          "For 5V GPIO or higher-current relays, recalculate: Rb = (Vdrive - 0.7V) / Ib_needed",
          "Use 2N2222 for loads up to 600mA. For higher current, use TIP120 Darlington or MOSFET",
        ],
      },
    ],
    designRules: [
      "Place flyback diode as close to relay as possible — not near the transistor",
      "Route collector trace wide enough for relay coil current",
      "For pinball solenoids: use N-MOSFET (IRF510 or similar) instead of BJT for high-current loads",
    ],
    notes: "The most common discrete circuit in REC designs. Mims pattern: 2N2222 + 1N914 flyback + base resistor. REC uses 2N2222 in SOT-23 + 1N4148. For solenoids drawing >500mA, switch to N-channel MOSFET with logic-level gate threshold.",
  },

  // ──────────────────────────────────────────────────
  // N-MOSFET High-Current Switch (solenoid/motor)
  // ──────────────────────────────────────────────────
  {
    id: "nfet-high-current-switch",
    name: "N-MOSFET High-Current Switch",
    description: "Logic-level N-MOSFET for high-current loads — solenoids, motors, high-power LEDs. Gate driven directly from MCU GPIO.",
    category: "relay-driver",
    blocks: [
      {
        id: "nfet-switch-block",
        name: "N-MOSFET Switch",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "IRF510",
            eaglePackage: "TO220",
            description: "N-channel MOSFET — logic-level gate, Rds(on) < 0.5 ohm at Vgs=5V",
            critical: true,
          },
          {
            refDes: "R_G",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0603",
            eaglePackage: "RESC1608X60",
            value: "100",
            description: "Gate resistor — limits inrush current to gate capacitance, prevents ringing",
          },
          {
            refDes: "R_GD",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Gate pull-down — ensures MOSFET is OFF when MCU pin is floating (during reset/boot)",
            critical: true,
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Flyback diode — use 1N4001 for higher-current inductive loads",
            critical: true,
          },
        ],
        nets: [
          { name: "MCU_GPIO", from: { refDes: "R_G", pin: "1" }, to: [] },
          { name: "GATE", from: { refDes: "R_G", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }, { refDes: "R_GD", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [{ refDes: "R_GD", pin: "2" }] },
          { name: "LOAD+", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "LOAD-", from: { refDes: "Q1", pin: "D" }, to: [{ refDes: "D1", pin: "A" }] },
        ],
        designRules: [
          "10K gate pull-down is CRITICAL — without it, gate floats high during MCU reset and load fires unexpectedly",
          "100 ohm gate resistor prevents oscillation from gate capacitance + trace inductance",
          "IRF510 needs Vgs >= 4V for full enhancement — works with 5V GPIO, marginal at 3.3V",
          "For 3.3V GPIO: use logic-level MOSFET (IRLZ44N or similar) with Vgs(th) < 2V",
        ],
      },
    ],
    designRules: [
      "For pinball solenoids: size MOSFET for 2x expected peak current (inrush)",
      "Place Schottky flyback diode (vs 1N4001) for faster recovery in PWM applications",
      "Heatsink required if continuous current > 2A or if PWM duty cycle > 50%",
    ],
    notes: "From Mims Solar Cell Projects (FET actuators with IRF510). Preferred over BJT for loads > 500mA. Gate pull-down resistor pattern mined from REC triac board designs. For general high-current switching. See 'pinball-solenoid-driver' for the Rottendog-proven pinball-specific variant using IRL530.",
  },

  // ──────────────────────────────────────────────────
  // Pinball Solenoid Driver (Rottendog-proven)
  // ──────────────────────────────────────────────────
  {
    id: "pinball-solenoid-driver",
    name: "Pinball Solenoid Driver (IRL530 — Rottendog Proven)",
    description: "Logic-level N-MOSFET solenoid driver proven in REC Rottendog pinball production. Uses IRL530 specifically — do NOT substitute IRL540 (Vgs(th) mismatch causes misfiring).",
    category: "relay-driver",
    blocks: [
      {
        id: "pinball-solenoid-block",
        name: "IRL530 Solenoid Driver",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "IRL530",
            eaglePackage: "TO220",
            description: "Logic-level N-MOSFET — Vgs(th) ~1.0V, Rds(on) < 0.1 ohm. CRITICAL: do NOT substitute IRL540 (Vgs(th) ~2.0V causes solenoid misfiring)",
            critical: true,
          },
          {
            refDes: "R_G",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0603",
            eaglePackage: "RESC1608X60",
            value: "100",
            description: "Gate resistor — limits gate inrush, prevents oscillation from TO-220 lead inductance",
          },
          {
            refDes: "R_GD",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Gate pull-down — keeps solenoid OFF during MCU boot/reset. CRITICAL for player safety.",
            critical: true,
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N5819HW-7-F",
            eaglePackage: "SOD2512X110N",
            description: "Schottky flyback diode — fast recovery for PWM solenoid drive. 1N5819 preferred over 1N4001 for faster commutation.",
            critical: true,
          },
        ],
        nets: [
          { name: "MCU_GPIO", from: { refDes: "R_G", pin: "1" }, to: [] },
          { name: "GATE", from: { refDes: "R_G", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }, { refDes: "R_GD", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [{ refDes: "R_GD", pin: "2" }] },
          { name: "SOLENOID_V+", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "SOLENOID-", from: { refDes: "Q1", pin: "D" }, to: [{ refDes: "D1", pin: "A" }] },
        ],
        designRules: [
          "IRL530 ONLY — do NOT substitute IRL540. Rottendog production failure: IRL540 Vgs(th)=2.0V vs IRL530 Vgs(th)=1.0V caused intermittent solenoid misfiring.",
          "10K gate pull-down is SAFETY CRITICAL — prevents solenoid firing during MCU reset (pinball solenoid can injure player)",
          "Schottky flyback (1N5819) preferred — faster recovery than 1N4001 for PWM drive patterns",
          "Size drain trace for peak solenoid current (can be 3-10A for pop bumpers and flippers)",
          "IRL530 works reliably at 3.3V gate drive due to low Vgs(th) ~1.0V",
        ],
      },
    ],
    designRules: [
      "Pinball solenoids draw HIGH peak current (5-15A) for short durations — heatsinking usually not needed for pulsed operation",
      "Use PWM 'hold' pattern: full power pulse (20-50ms) then reduce to ~30% duty to prevent coil burnout",
      "Always implement firmware solenoid timeout (200ms max) to protect against stuck-on failures",
      "Flipper coils need dual-winding support: high-power pull-in winding + low-power hold winding",
      "Route solenoid power traces on separate copper from logic — high di/dt causes ground bounce",
      "Separate solenoid power supply from logic supply — solenoid switching causes massive supply noise",
    ],
    sourceProject: "REC Rottendog Pinball",
    notes: "Production-proven in Rottendog pinball machines at REC. The IRL530 was specifically selected for its low Vgs(th) (~1.0V) which ensures reliable turn-on with logic-level gate drive. Lesson learned: IRL540 substitution caused field failures — see lessons-learned ll-103 and design-rule comp-004. For pinball scanner project: this is the pattern for driving pop bumpers, slingshots, ball launcher, knocker, and other solenoid actuators.",
  },

  // ──────────────────────────────────────────────────
  // Phototransistor Sensor (break-beam / ambient light)
  // ──────────────────────────────────────────────────
  {
    id: "phototransistor-sensor",
    name: "Phototransistor Sensor Interface",
    description: "Phototransistor with load resistor for break-beam detection or ambient light sensing. Output goes to MCU ADC or digital input with comparator.",
    category: "sensor-interface",
    blocks: [
      {
        id: "phototransistor-divider",
        name: "Phototransistor Voltage Divider",
        type: "sensor",
        components: [
          {
            refDes: "Q_PT",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PHOTOTRANSISTOR",
            eaglePackage: "LED_0805",
            description: "NPN phototransistor — collector current proportional to light intensity",
          },
          {
            refDes: "R_LOAD",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Collector load resistor — 10K for fast response (break-beam). Use 100K-1M for high sensitivity (ambient light).",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R_LOAD", pin: "1" }, to: [] },
          { name: "SENSOR_OUT", from: { refDes: "R_LOAD", pin: "2" }, to: [{ refDes: "Q_PT", pin: "C" }] },
          { name: "GND", from: { refDes: "Q_PT", pin: "E" }, to: [] },
        ],
        designRules: [
          "Output is HIGH in dark (no current through transistor), LOW in light (transistor conducts)",
          "10K: fast response, lower sensitivity — good for break-beam with IR LED",
          "100K-1M: high sensitivity, slower response — good for ambient light detection",
          "Add 0.1UF cap from SENSOR_OUT to GND for noise filtering if using ADC",
        ],
      },
      {
        id: "phototransistor-ir-emitter",
        name: "IR LED Emitter (break-beam pair)",
        type: "led-driver",
        components: [
          {
            refDes: "D_IR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "IR_LED_0805",
            eaglePackage: "LED_0805",
            description: "IR LED emitter — paired with phototransistor for break-beam",
          },
          {
            refDes: "R_IR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0603",
            eaglePackage: "RESC1608X60",
            value: "100",
            description: "IR LED current limiter — 100 ohm for ~20mA at 3.3V (Vf_IR ~1.3V)",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R_IR", pin: "1" }, to: [] },
          { name: "IR_ANODE", from: { refDes: "R_IR", pin: "2" }, to: [{ refDes: "D_IR", pin: "A" }] },
          { name: "GND", from: { refDes: "D_IR", pin: "K" }, to: [] },
        ],
        designRules: [
          "IR LED Vf is ~1.3V (lower than visible LEDs)",
          "Align IR LED and phototransistor with clear line of sight",
          "For pinball: mount emitter/sensor pair across ball path, ~20mm gap typical",
        ],
      },
    ],
    designRules: [
      "Phototransistors are collector-up, emitter-down (like NPN with light as base input)",
      "Shield from ambient light interference with opaque tubing or recessed mounting",
      "For pinball ball detection: IR break-beam is standard — ball interrupts beam, output goes HIGH",
      "Multiple sensors can share a single MCU ADC via analog mux, or use digital comparators",
    ],
    notes: "From Mims Optoelectronics. The break-beam pattern is the standard for pinball opto switches. REC sensor circuits use this topology extensively. For the pinball scanner: array of phototransistor/IR LED pairs across the playfield for real-time ball tracking.",
  },

  // ──────────────────────────────────────────────────
  // Photoresistor (LDR) Sensor Interface
  // ──────────────────────────────────────────────────
  {
    id: "photoresistor-sensor",
    name: "Photoresistor (LDR) Voltage Divider",
    description: "Cadmium sulfide photoresistor in voltage divider configuration for ambient light level measurement. Output to MCU ADC.",
    category: "sensor-interface",
    blocks: [
      {
        id: "ldr-divider",
        name: "LDR Voltage Divider",
        type: "sensor",
        components: [
          {
            refDes: "R_LDR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PHOTORESISTOR",
            eaglePackage: "PHOTORESISTOR",
            description: "CdS photoresistor — resistance varies: ~1K in bright light, ~1M in dark",
          },
          {
            refDes: "R_REF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Reference resistor — choose near midpoint of LDR range for best sensitivity",
          },
          {
            refDes: "C_F",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Filter cap — 10K + 0.1UF = ~1kHz cutoff, removes noise before ADC",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R_REF", pin: "1" }, to: [] },
          { name: "LIGHT_LEVEL", from: { refDes: "R_REF", pin: "2" }, to: [{ refDes: "R_LDR", pin: "1" }, { refDes: "C_F", pin: "1" }] },
          { name: "GND", from: { refDes: "R_LDR", pin: "2" }, to: [{ refDes: "C_F", pin: "2" }] },
        ],
        designRules: [
          "LDR on bottom: Vout increases as light increases (LDR resistance drops)",
          "LDR on top: Vout increases as light decreases — use for dark-detection",
          "Choose R_REF close to LDR resistance at your target light level for maximum sensitivity",
          "Response time is slow (~10-100ms) — not suitable for fast switching, use phototransistor instead",
        ],
      },
    ],
    designRules: [
      "CdS photoresistors contain cadmium — restricted under RoHS in EU for new designs",
      "Modern alternative: TEMT6000 ambient light sensor (phototransistor with built-in lens)",
      "For pinball playfield light monitoring: acceptable since it's not a consumer product constraint",
    ],
    notes: "From Mims Optoelectronics and Sensor Projects. Simple ambient light measurement. For pinball: could monitor playfield lighting levels, detect cabinet open/closed, or measure GI brightness for auto-dimming.",
  },

  // ──────────────────────────────────────────────────
  // Hall Effect Sensor Interface
  // ──────────────────────────────────────────────────
  {
    id: "hall-sensor-interface",
    name: "Hall Effect Sensor Interface",
    description: "Digital Hall effect sensor for contactless position/proximity detection. Immune to dirt and vibration — ideal for mechanical environments.",
    category: "sensor-interface",
    blocks: [
      {
        id: "hall-digital-block",
        name: "Digital Hall Sensor (Bipolar Switch)",
        type: "sensor",
        components: [
          {
            refDes: "U_HALL",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "HALL_SENSOR",
            eaglePackage: "SOT-23-3",
            description: "Integrated digital Hall sensor (A3141/UGX3132 type) — open-collector output, Schmitt trigger built in",
          },
          {
            refDes: "R_PU",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Output pull-up resistor — open-collector sensors need external pull-up",
            critical: true,
          },
          {
            refDes: "C_BYPASS",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Supply bypass cap — place within 5mm of sensor",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C_BYPASS", pin: "1" }, to: [{ refDes: "U_HALL", pin: "VCC" }, { refDes: "R_PU", pin: "1" }] },
          { name: "HALL_OUT", from: { refDes: "R_PU", pin: "2" }, to: [{ refDes: "U_HALL", pin: "OUT" }] },
          { name: "GND", from: { refDes: "C_BYPASS", pin: "2" }, to: [{ refDes: "U_HALL", pin: "GND" }] },
        ],
        designRules: [
          "Output is open-collector — MUST have pull-up resistor (10K typical)",
          "Output goes LOW when south pole of magnet faces sensor's branded side",
          "Bypass cap is critical — Hall sensors are sensitive to supply noise",
          "Pin order varies by manufacturer — ALWAYS verify: typically 1=VCC, 2=GND, 3=OUT",
        ],
      },
    ],
    designRules: [
      "Mount sensor with branded/marked face toward magnet path",
      "Effective detection range: 5-15mm for small rare-earth magnets",
      "Use epoxy (NOT cyanoacrylate) for mounting — CA glue shrinkage affects output",
      "Operating temp range: -40°C to +85°C typical — unaffected by dirt, oil, vibration",
      "Hall sensors are immune to contamination that disables optical sensors",
    ],
    notes: "From Mims Magnet & Sensor Projects. Hall sensors excel in harsh environments where optical sensors fail (dust, oil, vibration). For pinball: detect spinner rotations, detect ball in shooter lane (magnet on ball trough), position sensing for moving targets. Key advantage over reed switches: no mechanical contacts to wear out, solid-state, bounce-free output.",
  },

  // ──────────────────────────────────────────────────
  // Ratiometric Hall Sensor (analog position)
  // ──────────────────────────────────────────────────
  {
    id: "hall-sensor-analog",
    name: "Ratiometric Hall Sensor (Analog Output)",
    description: "Linear/ratiometric Hall sensor (A3515 type) for analog position measurement. Output voltage proportional to magnetic field strength.",
    category: "sensor-interface",
    blocks: [
      {
        id: "hall-analog-block",
        name: "Ratiometric Hall Sensor + ADC Filter",
        type: "adc-input",
        components: [
          {
            refDes: "U_HALL",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "HALL_SENSOR",
            eaglePackage: "SOT-23-3",
            description: "Ratiometric Hall sensor (A3515 type) — output = Vcc/2 at zero field, varies ±with field",
          },
          {
            refDes: "R_F",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X60",
            value: "1K",
            description: "ADC input filter resistor",
          },
          {
            refDes: "C_F",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "ADC input filter cap — 1K + 0.1UF = ~1.6kHz cutoff",
          },
          {
            refDes: "C_BYPASS",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Supply bypass — place within 5mm of sensor",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "C_BYPASS", pin: "1" }, to: [{ refDes: "U_HALL", pin: "VCC" }] },
          { name: "HALL_OUT", from: { refDes: "U_HALL", pin: "OUT" }, to: [{ refDes: "R_F", pin: "1" }] },
          { name: "ADC_IN", from: { refDes: "R_F", pin: "2" }, to: [{ refDes: "C_F", pin: "1" }] },
          { name: "GND", from: { refDes: "C_BYPASS", pin: "2" }, to: [{ refDes: "U_HALL", pin: "GND" }, { refDes: "C_F", pin: "2" }] },
        ],
        designRules: [
          "Ratiometric output: Vout = Vcc/2 at zero field, ~2.5 mV/gauss sensitivity",
          "A3515 output saturates at ~0.2V and Vcc-0.2V — don't expect full rail-to-rail",
          "Power sensor from same rail as ADC reference for ratiometric accuracy",
          "RC filter before ADC removes high-frequency noise — critical for clean readings",
        ],
      },
    ],
    designRules: [
      "Use steel flux concentrator (nail/pin touching sensor) to extend detection range",
      "Effective range: ~20mm with rare-earth magnet, less with ferrite",
      "Field strength follows inverse-square law with distance: B ∝ 1/d²",
    ],
    notes: "From Mims Magnet & Sensor Projects. A3515 changes ~2.5mV per gauss. For pinball: measure ball position with magnet embedded in ball (some specialty games), detect lever/arm positions with magnets, or build a contactless joystick for nudge detection.",
  },

  // ──────────────────────────────────────────────────
  // Optocoupler Isolation
  // ──────────────────────────────────────────────────
  {
    id: "optocoupler-isolation",
    name: "Optocoupler Signal Isolation",
    description: "Optocoupler for galvanic isolation between high-voltage and logic circuits. Provides electrical isolation of 2500-5000V.",
    category: "communication",
    blocks: [
      {
        id: "opto-input-side",
        name: "Optocoupler Input (LED Side)",
        type: "optocoupler",
        components: [
          {
            refDes: "U_OPTO",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4N35",
            eaglePackage: "DIP-6",
            description: "Optocoupler — LED + phototransistor in DIP-6 package",
            critical: true,
          },
          {
            refDes: "R_LED",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "330R_0603",
            eaglePackage: "RESC1608X60",
            value: "330",
            description: "LED current limit — 330 ohm for ~10mA from 5V input, ~8mA from 3.3V",
          },
        ],
        nets: [
          { name: "INPUT_SIGNAL", from: { refDes: "R_LED", pin: "1" }, to: [] },
          { name: "OPTO_ANODE", from: { refDes: "R_LED", pin: "2" }, to: [{ refDes: "U_OPTO", pin: "1" }] },
          { name: "INPUT_GND", from: { refDes: "U_OPTO", pin: "2" }, to: [] },
        ],
        designRules: [
          "LED forward current: 10-20mA typical. Check CTR (current transfer ratio) at your operating point",
          "Pin 1 = Anode, Pin 2 = Cathode (input LED side)",
        ],
      },
      {
        id: "opto-output-side",
        name: "Optocoupler Output (Transistor Side)",
        type: "optocoupler",
        components: [
          {
            refDes: "R_PU",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Collector pull-up on isolated side",
          },
        ],
        nets: [
          { name: "+3.3V_ISO", from: { refDes: "R_PU", pin: "1" }, to: [] },
          { name: "OUTPUT_SIGNAL", from: { refDes: "R_PU", pin: "2" }, to: [{ refDes: "U_OPTO", pin: "5" }] },
          { name: "OUTPUT_GND", from: { refDes: "U_OPTO", pin: "4" }, to: [] },
        ],
        designRules: [
          "Pin 4 = Emitter, Pin 5 = Collector (output phototransistor side)",
          "Pin 6 = Base (usually left unconnected, but can be used for bias)",
          "Output is inverted: input HIGH → LED on → transistor conducts → output LOW",
          "10K pull-up suitable for logic-speed signals. Use 1K-4.7K for faster switching.",
        ],
      },
    ],
    designRules: [
      "Maintain creepage distance between input and output traces per isolation rating",
      "Route input-side and output-side grounds separately — they must NOT connect",
      "CTR (current transfer ratio) degrades over time and temperature — design with margin",
      "For AC mains sensing: add series resistor (100K+) to limit current from mains",
      "4N35 is general purpose. For faster signals: 6N137 (10Mbit). For AC detection: MOC3021 (triac output).",
    ],
    notes: "From Mims Optoelectronics. Optocouplers are essential for isolating MCU logic from mains-voltage circuits. REC uses them in triac designs and AC-powered products. For pinball: isolate scoring switches and high-voltage solenoid feedback from logic board. 4N35 is fine for switch sensing; 6N137 for fast data like serial comms across isolation barrier.",
  },

  // ──────────────────────────────────────────────────
  // 555 Astable Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "555-astable-oscillator",
    name: "555 Timer Astable Oscillator",
    description: "Standard 555 timer in astable (free-running) configuration. Generates continuous square wave output.",
    category: "timer",
    blocks: [
      {
        id: "555-astable-block",
        name: "555 Astable Circuit",
        type: "timer",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "555",
            eaglePackage: "DIP-8",
            description: "555 timer IC — CMOS version (TLC555/LMC555) recommended for 3.3V operation",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X60",
            value: "1K",
            description: "Timing resistor R1 — Vcc to pin 7 (discharge). Affects HIGH time.",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "6.8K_0603",
            eaglePackage: "RESC1608X60",
            value: "6.8K",
            description: "Timing resistor R2 — pin 7 to pin 6 (threshold). Affects both HIGH and LOW time.",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Timing capacitor — pin 6 to GND. With R1=1K, R2=6.8K: f ≈ 986 Hz",
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Supply bypass cap — pin 5 (control voltage) to GND",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "DISCHARGE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "U1", pin: "7" }] },
          { name: "THRESHOLD", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "CTRL", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "Pin 4 (RESET) tied to Vcc for free-running operation",
          "Pin 2 (TRIGGER) and Pin 6 (THRESHOLD) connected together for astable mode",
          "f = 1.44 / ((R1 + 2×R2) × C1). Duty cycle = (R1+R2)/(R1+2×R2)",
          "0.1UF on pin 5 prevents noise-induced frequency jitter — always include it",
          "Use CMOS 555 (LMC555) for 3.3V supply — original NE555 needs >= 4.5V",
        ],
      },
    ],
    designRules: [
      "Output can source/sink 200mA — can drive LEDs, buzzers, or small relays directly",
      "For 50% duty cycle: add diode across R2 (cathode toward pin 7)",
      "Timer is very noise-sensitive — keep timing components close to IC",
    ],
    notes: "From Mims 555 Timer IC Circuits. The 555 is the most produced IC in history. Useful for: tone generation, LED flashers, debounce timers, PWM generation. For pinball: flasher timing, sound effects generation, or timeout circuits for game logic. MCU-based designs often replace 555 with firmware timers, but standalone 555 is useful for always-on functions that shouldn't depend on MCU state.",
  },

  // ──────────────────────────────────────────────────
  // 555 Monostable (One-Shot)
  // ──────────────────────────────────────────────────
  {
    id: "555-monostable-oneshot",
    name: "555 Timer Monostable (One-Shot Pulse)",
    description: "555 timer in monostable configuration. Generates a single timed pulse in response to a trigger. Useful for debouncing, pulse stretching, and timed events.",
    category: "timer",
    blocks: [
      {
        id: "555-monostable-block",
        name: "555 Monostable Circuit",
        type: "timer",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "555",
            eaglePackage: "DIP-8",
            description: "555 timer IC in monostable mode",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Timing resistor — Vcc to pin 7. Pulse width = 1.1 × R1 × C1",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10UF_0805",
            eaglePackage: "CAPC2012X110",
            value: "10UF",
            description: "Timing cap — with R1=10K: pulse = 1.1 × 10K × 10uF = 0.11 seconds",
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Pin 5 bypass cap",
          },
          {
            refDes: "R_TRIG",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Trigger pull-up — keeps pin 2 HIGH until triggered LOW",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R_TRIG", pin: "1" }] },
          { name: "TRIGGER", from: { refDes: "R_TRIG", pin: "2" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "TIMING", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "U1", pin: "6" }, { refDes: "U1", pin: "7" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "CTRL", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "Triggers on FALLING edge of pin 2 (must drop below 1/3 Vcc)",
          "Output goes HIGH for t = 1.1 × R1 × C1 seconds, then returns LOW",
          "Re-triggering during pulse has no effect — pulse always completes full duration",
          "Pin 4 (RESET) to Vcc for normal operation. Pull LOW to force output LOW.",
        ],
      },
    ],
    designRules: [
      "Use for: switch debouncing, pulse stretching short sensor signals, timed enable windows",
      "Ceramic caps for sub-millisecond timing, electrolytic for seconds-range timing",
    ],
    notes: "From Mims 555 Timer IC Circuits. For pinball: debounce mechanical switch inputs (rollover switches, bumper contacts), create timed solenoid pulses (prevents coil burnout from stuck switches), or generate fixed-duration scoring windows.",
  },

  // ──────────────────────────────────────────────────
  // Op-Amp Comparator with Hysteresis (Schmitt Trigger)
  // ──────────────────────────────────────────────────
  {
    id: "opamp-comparator-hysteresis",
    name: "Op-Amp Comparator with Hysteresis (Schmitt Trigger)",
    description: "Op-amp or comparator configured as Schmitt trigger. Converts noisy analog signals to clean digital output with adjustable threshold and hysteresis band.",
    category: "sensor-interface",
    blocks: [
      {
        id: "schmitt-trigger-block",
        name: "Comparator + Hysteresis",
        type: "comparator",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "LM339",
            eaglePackage: "SOIC-14",
            description: "Quad comparator — open-collector output. One of 4 comparators in package.",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0603",
            eaglePackage: "RESC1608X60",
            value: "100K",
            description: "Threshold divider top — sets reference voltage with R2",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0603",
            eaglePackage: "RESC1608X60",
            value: "100K",
            description: "Threshold divider bottom — R1=R2=100K sets threshold at Vcc/2",
          },
          {
            refDes: "R_FB",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0603",
            eaglePackage: "RESC1608X60",
            value: "1M",
            description: "Positive feedback for hysteresis — 1M gives ~3.3mV hysteresis band at 3.3V",
          },
          {
            refDes: "R_PU",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Output pull-up — LM339 has open-collector output, needs pull-up to Vcc",
            critical: true,
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R_PU", pin: "1" }] },
          { name: "THRESHOLD", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "R_FB", pin: "1" }, { refDes: "U1", pin: "NON_INV" }] },
          { name: "SENSOR_IN", from: { refDes: "U1", pin: "INV" }, to: [] },
          { name: "COMP_OUT", from: { refDes: "R_PU", pin: "2" }, to: [{ refDes: "U1", pin: "OUT" }, { refDes: "R_FB", pin: "2" }] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [] },
        ],
        designRules: [
          "LM339 output is open-collector — MUST have pull-up resistor",
          "Hysteresis band: Vhyst = Vswing × R2 / (R_FB + R2). With 1M feedback: very narrow band.",
          "For wider hysteresis (prevent relay chatter): reduce R_FB to 100K-470K",
          "Sensor signal goes to inverting input (-). Reference goes to non-inverting input (+).",
          "Output LOW when sensor voltage > threshold. HIGH when below.",
        ],
      },
    ],
    designRules: [
      "LM339 quad package has 4 independent comparators — use all 4 for multiple sensor channels",
      "Hysteresis prevents output oscillation when input signal is near threshold",
      "For relay driving: chain comparator output into NPN relay driver circuit",
      "LM339 works from single supply (3.3V or 5V) — no negative rail needed",
    ],
    notes: "From Mims Op Amp IC Circuits. Combines the sensor divider + comparator + hysteresis patterns. For pinball: convert analog sensor signals (phototransistors, Hall sensors) to clean digital for MCU input. LM339 quad comparator can handle 4 sensor channels in one IC. Essential for noisy environments where raw sensor signals would cause false triggers.",
  },

  // ──────────────────────────────────────────────────
  // Solar Battery Charger
  // ──────────────────────────────────────────────────
  {
    id: "solar-battery-charger",
    name: "Solar Panel Battery Charger",
    description: "Simple solar battery charger with blocking diode to prevent reverse discharge. For small panels charging lead-acid or LiFePO4 batteries.",
    category: "solar",
    blocks: [
      {
        id: "solar-charger-block",
        name: "Solar Charger with Blocking Diode",
        type: "solar-charger",
        components: [
          {
            refDes: "D_BLOCK",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N5819HW-7-F",
            eaglePackage: "SOD2512X110N",
            description: "Schottky blocking diode — prevents battery from discharging back through panel at night. Low Vf (~0.3V).",
            critical: true,
          },
          {
            refDes: "C_BULK",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100UF_ELECT",
            eaglePackage: "CAPAE660X610N",
            value: "100UF",
            description: "Bulk capacitor — smooths solar panel output ripple",
          },
          {
            refDes: "D_TVS",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "SMCJ20CA",
            eaglePackage: "DIOM6859X262N",
            description: "TVS diode — protects battery and downstream circuit from panel overvoltage surges",
          },
        ],
        nets: [
          { name: "SOLAR+", from: { refDes: "D_BLOCK", pin: "A" }, to: [] },
          { name: "VBAT+", from: { refDes: "D_BLOCK", pin: "K" }, to: [{ refDes: "C_BULK", pin: "+" }, { refDes: "D_TVS", pin: "A" }] },
          { name: "GND", from: { refDes: "C_BULK", pin: "-" }, to: [{ refDes: "D_TVS", pin: "K" }] },
        ],
        designRules: [
          "Schottky diode (1N5819) has ~0.3V drop — less than silicon diode's 0.7V",
          "Panel Vmp must exceed Vbattery + Vf_diode for charging to occur",
          "For panels > 5A: use higher-rated Schottky (SB540 or similar) or MOSFET ideal diode",
          "TVS diode protects against panel open-circuit voltage spikes (can be 1.5× rated voltage)",
        ],
      },
    ],
    designRules: [
      "This is a direct-connect charger — no regulation. Only suitable for lead-acid or LiFePO4 batteries that can tolerate trickle overcharge",
      "For Li-ion batteries: MUST use a proper charge controller IC (e.g., TP4056) — direct connection risks fire",
      "Size panel so Isc < C/10 (battery capacity / 10) for safe trickle charging without regulation",
      "For production solar systems: use MPPT charge controller for 15-30% more energy recovery",
    ],
    notes: "From Mims Solar Cell Projects. Simple but effective for small-scale solar charging. The blocking Schottky diode is the same 1N5819HW-7-F already in the REC library (used for reverse polarity protection). For home solar (40 panels): grid-tied inverters handle all charging/regulation, but this pattern applies to small auxiliary batteries, garden lights, or backup systems.",
  },

  // ──────────────────────────────────────────────────
  // Light-Activated Relay (sensor → action)
  // ──────────────────────────────────────────────────
  {
    id: "light-activated-relay",
    name: "Light-Activated Relay Driver",
    description: "Photocell + transistor relay driver. Triggers relay when light level crosses threshold. Combines sensor divider and relay driver patterns.",
    category: "sensor-interface",
    blocks: [
      {
        id: "light-sensor-block",
        name: "Light Sensor Divider",
        type: "sensor",
        components: [
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "47K_0603",
            eaglePackage: "RESC1608X60",
            value: "47K",
            description: "Fixed reference resistor — adjust value to set light threshold. 47K for moderate light levels.",
          },
          {
            refDes: "Q_PT",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PHOTOTRANSISTOR",
            eaglePackage: "LED_0805",
            description: "Phototransistor sensor — current increases with light intensity",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SENSOR_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q_PT", pin: "C" }] },
          { name: "GND", from: { refDes: "Q_PT", pin: "E" }, to: [] },
        ],
      },
      {
        id: "light-relay-driver-block",
        name: "Transistor Relay Driver",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN relay driver transistor",
          },
          {
            refDes: "R_B",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X60",
            value: "1K",
            description: "Base resistor from sensor output to transistor base",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Flyback diode — across relay coil",
            critical: true,
          },
        ],
        nets: [
          { name: "SENSOR_OUT", from: { refDes: "R_B", pin: "1" }, to: [] },
          { name: "BASE", from: { refDes: "R_B", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY+", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "RELAY-", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Light activates phototransistor → voltage drops → transistor base driven → relay triggers",
          "For dark-activated: swap photocell position (put on top of divider instead of bottom)",
          "Add comparator between sensor and relay driver for precise threshold control",
        ],
      },
    ],
    designRules: [
      "Test with actual ambient light conditions before finalizing R1 value",
      "For hysteresis (prevent relay chatter at threshold): add Schmitt trigger between sensor and driver",
      "This is the 'light → action' primitive pattern — works with any resistive sensor (thermistor, pressure, etc.)",
    ],
    notes: "From Mims Optoelectronics and Magnet/Sensor Projects. The classic sensor-to-actuator chain. For pinball: use as ball-detection trigger (IR break-beam interrupts → relay fires solenoid), or ambient light detector for auto-dimming playfield lights.",
  },

  // ──────────────────────────────────────────────────
  // Pinball Opto Switch (dedicated pattern)
  // ──────────────────────────────────────────────────
  {
    id: "pinball-opto-switch",
    name: "Pinball Opto Switch (IR Break-Beam Pair)",
    description: "IR LED + phototransistor break-beam pair for ball detection. The standard non-contact switch in modern pinball machines. Ball passing through beam triggers state change on MCU input.",
    category: "sensor-interface",
    blocks: [
      {
        id: "pinball-opto-emitter",
        name: "IR Emitter (always-on or strobed)",
        type: "led-driver",
        components: [
          {
            refDes: "D_IR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "IR_LED_0805",
            eaglePackage: "LED_0805",
            description: "IR LED emitter — 940nm typical for pinball (invisible, avoids playfield light interference)",
          },
          {
            refDes: "R_IR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0603",
            eaglePackage: "RESC1608X60",
            value: "100",
            description: "LED current limit — 100 ohm for ~16mA at 5V (Vf_IR ~1.3V), ~20mA with lower Vf parts",
          },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R_IR", pin: "1" }, to: [] },
          { name: "IR_ANODE", from: { refDes: "R_IR", pin: "2" }, to: [{ refDes: "D_IR", pin: "A" }] },
          { name: "GND", from: { refDes: "D_IR", pin: "K" }, to: [] },
        ],
        designRules: [
          "5V supply preferred for IR emitters — gives brighter beam and longer detection range",
          "940nm wavelength avoids interference from playfield incandescent/LED lighting",
          "For strobed operation: drive from MCU GPIO to reduce power consumption in battery-operated boards",
        ],
      },
      {
        id: "pinball-opto-receiver",
        name: "IR Receiver with Pull-up",
        type: "sensor",
        components: [
          {
            refDes: "Q_PT",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PHOTOTRANSISTOR",
            eaglePackage: "LED_0805",
            description: "IR phototransistor — collector current proportional to received IR light",
          },
          {
            refDes: "R_LOAD",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Collector pull-up — 10K for fast response. Output: HIGH = beam blocked (ball present), LOW = beam clear.",
          },
          {
            refDes: "C_DEBOUNCE",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1NF_0603",
            eaglePackage: "CAPC1608X85",
            value: "1nF",
            description: "Optional debounce cap — 10K + 1nF = 10µs time constant. Removes noise without slowing ball detection.",
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R_LOAD", pin: "1" }, to: [] },
          { name: "OPTO_OUT", from: { refDes: "R_LOAD", pin: "2" }, to: [{ refDes: "Q_PT", pin: "C" }, { refDes: "C_DEBOUNCE", pin: "1" }] },
          { name: "GND", from: { refDes: "Q_PT", pin: "E" }, to: [{ refDes: "C_DEBOUNCE", pin: "2" }] },
        ],
        designRules: [
          "Output HIGH when beam is blocked (ball present) — phototransistor OFF, pull-up holds line HIGH",
          "Output LOW when beam is clear — phototransistor ON, pulls line LOW",
          "10K gives ~0.3ms response time — fast enough to detect ball at pinball speeds (~1-3 m/s)",
          "Connect directly to MCU GPIO configured as digital input with interrupt-on-change",
        ],
      },
    ],
    designRules: [
      "Align emitter and receiver across ball path with 20-30mm gap (standard pinball ball is 27mm / 1-1/16 inch)",
      "Mount in opaque housings or recessed slots to shield from playfield lighting",
      "Multiple opto pairs can share a single MCU interrupt by OR-ing outputs, or scan individually via mux",
      "For the pinball scanner: array of 8-16 opto pairs across playfield gives real-time ball position tracking",
      "Emitter and receiver can be on different voltage rails (5V emitter, 3.3V receiver) — they're optically coupled",
      "Test with actual pinball under playfield lighting to verify no false triggers from GI or flasher interference",
    ],
    notes: "This is the fundamental sensing element in modern pinball machines. Williams/Bally machines from the 1990s onward use this pattern extensively for trough switches, VUK (vertical up-kicker) detection, ramp entry/exit, orbit switches, and spinner counting. The Rottendog replacement boards at REC interface with these existing opto switches. For the pinball scanner project: this is your primary ball-tracking sensor.",
  },

  // ──────────────────────────────────────────────────
  // Pinball Switch Matrix Input (mechanical switches)
  // ──────────────────────────────────────────────────
  {
    id: "pinball-switch-matrix-input",
    name: "Pinball Switch Matrix Column Input",
    description: "Debounced switch input with ESD protection for scanning pinball switch matrices. Handles the electrical noise from solenoid switching in the same cabinet.",
    category: "sensor-interface",
    blocks: [
      {
        id: "switch-input-block",
        name: "Switch Input with Debounce + ESD",
        type: "sensor",
        components: [
          {
            refDes: "R_PU",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X60",
            value: "10K",
            description: "Column pull-up — holds line HIGH when no switch closed in this column",
          },
          {
            refDes: "R_SERIES",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X60",
            value: "1K",
            description: "Series resistor — limits ESD current and forms RC filter with C_DEB",
          },
          {
            refDes: "C_DEB",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Debounce cap — 1K + 0.1UF = 0.1ms time constant. Handles mechanical bounce from leaf switches.",
          },
          {
            refDes: "D_ESD",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PESD3V3L4UG,115",
            eaglePackage: "SOT95P270X145-6N",
            description: "4-channel ESD clamp — protects MCU from solenoid-induced transients on switch wiring",
            critical: true,
          },
        ],
        nets: [
          { name: "+3.3V", from: { refDes: "R_PU", pin: "1" }, to: [] },
          { name: "COL_IN", from: { refDes: "R_PU", pin: "2" }, to: [{ refDes: "R_SERIES", pin: "1" }] },
          { name: "MCU_GPIO", from: { refDes: "R_SERIES", pin: "2" }, to: [{ refDes: "C_DEB", pin: "1" }, { refDes: "D_ESD", pin: "IO1" }] },
          { name: "GND", from: { refDes: "C_DEB", pin: "2" }, to: [{ refDes: "D_ESD", pin: "GND" }] },
        ],
        designRules: [
          "ESD protection is CRITICAL — pinball switch wiring runs near high-current solenoid wiring in the cabinet",
          "PESD3V3L4UG covers 4 switch lines — use multiple for larger matrices",
          "1K series resistor + 0.1UF gives ~0.5ms debounce — sufficient for leaf switches at pinball scan rates",
          "Scan matrix at 1-2ms per row — fast enough to catch rapid switch closures (slingshots, bumpers)",
        ],
      },
    ],
    designRules: [
      "Pinball switch matrix is typically 8×8 (64 switches) or 8×16 (128 switches)",
      "Row drivers are open-drain outputs, column inputs are pulled HIGH — closure pulls column LOW",
      "Scan one row at a time: drive row LOW, read all columns, advance to next row",
      "Solenoid switching causes massive EMI — ESD protection on every switch input is mandatory",
      "Use firmware debounce (2-3 consecutive reads) in addition to hardware RC filter",
      "Wire switch matrix wiring separately from solenoid power — twisted pair or ribbon cable preferred",
    ],
    notes: "Pinball machines use a scanning switch matrix to read many switches with few MCU pins. Williams/Bally WPC uses 8×8 matrix (64 switches). The Rottendog replacement boards at REC must be compatible with existing switch matrix wiring. ESD protection is the #1 reliability issue — solenoid transients couple into switch wiring and destroy unprotected MCU pins. The PESD3V3L4UG from the REC library is ideal here (same part used in REC's standard ESD protection circuit).",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: 555 Missing Pulse Detector
  // ──────────────────────────────────────────────────
  {
    id: "555-missing-pulse-detector",
    name: "555 Missing Pulse Detector",
    description: "Detects when an expected periodic signal stops arriving. Output changes state when a pulse is missed. Ideal for monitoring opto switches, heartbeat signals, and sensor watchdog circuits.",
    category: "timer",
    blocks: [
      {
        id: "missing-pulse-block",
        name: "Missing Pulse Detector",
        type: "missing-pulse-detector",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "NE555",
            eaglePackage: "SOIC-8",
            description: "555 timer in monostable mode — continuously retriggered by incoming pulses",
          },
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3906",
            eaglePackage: "SOT23",
            description: "PNP transistor — couples incoming signal pulses to 555 trigger pin",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0603",
            eaglePackage: "RESC1608X55",
            value: "4.7K",
            description: "PNP base resistor — limits base current from signal source",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0603",
            eaglePackage: "RESC1608X55",
            value: "1M",
            description: "Timing resistor — R2*C1 must slightly exceed expected pulse interval",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Timing capacitor — with R2=1M gives 0.11s timeout (good for ~5-10 Hz signals)",
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.01UF",
            description: "Control voltage bypass — prevents false triggering",
            critical: true,
          },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "VCC", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R2", pin: "1" }, { refDes: "Q1", pin: "E" }] },
          { name: "TRIGGER", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "TIMING", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "6" }, { refDes: "U1", pin: "7" }, { refDes: "C1", pin: "1" }] },
          { name: "CTRL", from: { refDes: "C2", pin: "1" }, to: [{ refDes: "U1", pin: "5" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
          { name: "ALARM_OUT", from: { refDes: "U1", pin: "3" }, to: [] },
        ],
        designRules: [
          "Set R2*C1 timeout slightly longer than expected interval between incoming pulses",
          "Each incoming pulse resets the timing cycle via Q1 — if a pulse is missed, output changes state",
          "C2 on pin 5 is critical — prevents false triggering from supply noise",
          "For pinball opto monitoring: set timeout to 2x expected ball transit time",
        ],
      },
    ],
    designRules: [
      "Formula: timeout = 1.1 * R2 * C1 (standard 555 monostable)",
      "Signal source must produce negative-going pulses to trigger via PNP transistor",
      "Output is normally HIGH while pulses are arriving; goes LOW when pulse is missed",
      "Can drive relay, LED, or MCU interrupt pin from output (pin 3)",
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits. The missing pulse detector is extremely useful for pinball: monitors opto switch signals and alarms if the expected ball detection signal stops. Also used for event failure alarms, equipment monitoring, and heartbeat watchdog circuits. Supply: 5-15V.",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: Pulsed IR Break-Beam Detection
  // ──────────────────────────────────────────────────
  {
    id: "pulsed-ir-break-beam",
    name: "Pulsed IR Break-Beam Detection System",
    description: "High-sensitivity break-beam detector using pulsed IR LED transmitter and 555 missing-pulse receiver. Much better noise immunity than DC opto sensors. Detects objects interrupting the IR beam.",
    category: "sensor-interface",
    blocks: [
      {
        id: "ir-pulse-transmitter",
        name: "Pulsed IR Transmitter",
        type: "ir-transmitter",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT23",
            description: "PNP transistor — drives IR LED with 400mA pulses (high current, short duty cycle)",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT23",
            description: "NPN transistor — timing oscillator with Q1",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22K_0603",
            eaglePackage: "RESC1608X55",
            value: "22K",
            description: "Timing resistor",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2.2M_0603",
            eaglePackage: "RESC1608X55",
            value: "2.2M",
            description: "Timing resistor — sets pulse rate (~240 Hz)",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.02UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.02UF",
            description: "Timing capacitor — 400 µs pulse duration at 400 mA",
          },
          {
            refDes: "LED_IR",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "IR_LED_5MM",
            eaglePackage: "LED5MM",
            description: "High-output near-infrared LED — use with optional lens for long range",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "OSC_BASE", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q2", pin: "B" }, { refDes: "C1", pin: "1" }] },
          { name: "OSC_COLL", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "Q1", pin: "B" }] },
          { name: "IR_DRIVE", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "LED_IR", pin: "A" }] },
          { name: "GND", from: { refDes: "LED_IR", pin: "K" }, to: [{ refDes: "Q2", pin: "E" }, { refDes: "C1", pin: "2" }] },
        ],
        placementNotes: "Mount IR LED facing phototransistor across gap. Use lens or collimator tube for long-range detection.",
      },
      {
        id: "ir-pulse-receiver",
        name: "Pulsed IR Receiver with Missing-Pulse Detector",
        type: "ir-receiver",
        components: [
          {
            refDes: "Q_PHOTO",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "PHOTOTRANSISTOR",
            eaglePackage: "LED5MM",
            description: "Phototransistor — shield from ambient light with collimator tube",
          },
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1458",
            eaglePackage: "SOIC-8",
            description: "Dual op-amp — amplifies phototransistor signal (can substitute two 741s)",
          },
          {
            refDes: "U2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "NE555",
            eaglePackage: "SOIC-8",
            description: "555 timer as missing-pulse detector — relay actuates when beam is broken",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0603",
            eaglePackage: "RESC1608X55",
            value: "1M",
            description: "Op-amp feedback — high gain for weak IR signals",
          },
          {
            refDes: "R_THRESH",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X55",
            value: "10K",
            description: "Threshold adjustment — set for reliable detection",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD-323",
            description: "Flyback diode across relay coil — MANDATORY",
            critical: true,
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "PHOTO_OUT", from: { refDes: "Q_PHOTO", pin: "C" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R_THRESH", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "1" }] },
        ],
        designRules: [
          "Shield phototransistor from ambient light — use collimator tube painted flat black inside",
          "Flyback diode on relay coil is MANDATORY — without it, relay back-EMF destroys the 555",
          "0.1uF bypass cap on both U1 and U2 power pins — prevents oscillation",
          "If circuit is erratic, power relay from separate supply (isolate from logic)",
        ],
      },
    ],
    designRules: [
      "Pulsed IR has much better noise immunity than DC — rejects ambient light",
      "Transmitter generates ~240 pulses/sec, each 400µs at 400mA — high peak current, low average power",
      "Receiver: 555 missing-pulse detector provides clean digital output when beam is broken",
      "Use lens on both transmitter and receiver for maximum range",
    ],
    notes: "From Forrest Mims Optoelectronics Circuits. This pulsed break-beam system is far superior to the simple DC opto switches for pinball ball detection. The pulsed design rejects ambient light interference and provides clean digital output via the 555 missing-pulse detector. Directly applicable to: ball detection through playfield slots, target sensing, spinner counting, and lane detection. For pinball use, the 240 Hz pulse rate is fast enough to detect balls traveling at typical playfield speeds.",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: Audio Preamp + Power Amp (741 + LM386)
  // ──────────────────────────────────────────────────
  {
    id: "audio-preamp-power-amp",
    name: "Audio Preamplifier + Power Amplifier (741 + LM386)",
    description: "Standard audio signal chain: 741 op-amp preamp for gain + LM386 power amp for speaker drive. The most common audio building block across all Mims projects.",
    category: "audio",
    blocks: [
      {
        id: "audio-preamp",
        name: "741 Preamplifier",
        type: "audio-amplifier",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "LM741",
            eaglePackage: "SOIC-8",
            description: "General-purpose op-amp — gain set by Rf/Rin",
          },
          {
            refDes: "C_IN",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "1UF",
            description: "AC coupling capacitor — blocks DC, passes audio",
          },
          {
            refDes: "R_IN",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X55",
            value: "1K",
            description: "Input resistor — sets gain with Rf (gain = -Rf/Rin)",
          },
          {
            refDes: "R_F",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0603",
            eaglePackage: "RESC1608X55",
            value: "100K",
            description: "Feedback resistor — 100K/1K = gain of 100. Reduce if circuit oscillates.",
          },
          {
            refDes: "C_BYPASS",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Power supply bypass — MANDATORY to prevent oscillation",
            critical: true,
          },
        ],
        nets: [
          { name: "AUDIO_IN", from: { refDes: "C_IN", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "C_IN", pin: "2" }, to: [{ refDes: "R_IN", pin: "1" }] },
          { name: "PIN2", from: { refDes: "R_IN", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R_F", pin: "1" }] },
          { name: "PREAMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R_F", pin: "2" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "C_BYPASS", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "C_BYPASS", pin: "2" }] },
        ],
        designRules: [
          "0.1uF bypass cap on both supply pins, physically close to IC — prevents oscillation",
          "Keep power leads short — #1 cause of op-amp oscillation in Mims circuits",
          "Gain = Rf/Rin = 100K/1K = 100. Reduce Rf to 10K for gain of 10 if clipping occurs",
          "For single supply: bias pin 3 to Vcc/2 with equal resistors (47K/47K)",
        ],
      },
      {
        id: "audio-power-amp",
        name: "LM386 Power Amplifier",
        type: "audio-amplifier",
        components: [
          {
            refDes: "U2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "LM386",
            eaglePackage: "SOIC-8",
            description: "Audio power amplifier — 325mW into 8 ohm. Default gain=20, 200 with cap on pins 1-8.",
          },
          {
            refDes: "R_VOL",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0603",
            eaglePackage: "RESC1608X55",
            value: "10K",
            description: "Volume control potentiometer on input",
          },
          {
            refDes: "C_OUT",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "220UF_ELEC",
            eaglePackage: "CAPPRD500W60D1000H1050",
            value: "220UF",
            description: "Output coupling capacitor to speaker",
          },
          {
            refDes: "C_BYPASS2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0603_5%_50V",
            eaglePackage: "CAPC1608X85",
            value: "0.1UF",
            description: "Power supply bypass — MANDATORY for LM386 stability",
            critical: true,
          },
        ],
        nets: [
          { name: "AMP_IN", from: { refDes: "R_VOL", pin: "WIPER" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "AMP_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C_OUT", pin: "+" }] },
          { name: "SPEAKER", from: { refDes: "C_OUT", pin: "-" }, to: [] },
          { name: "+9V", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "C_BYPASS2", pin: "1" }] },
          { name: "GND", from: { refDes: "U2", pin: "4" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "C_BYPASS2", pin: "2" }] },
        ],
        designRules: [
          "0.1uF bypass cap on pin 6 (Vcc) is MANDATORY — LM386 oscillates without it",
          "For gain of 200: add 10uF cap between pins 1(+) and 8",
          "Supply range: +4V to +12V single supply",
          "Output power: ~325mW into 8 ohm speaker",
        ],
      },
    ],
    designRules: [
      "This is the standard Mims audio chain — used in every lightwave receiver, sensor alerter, and communication project",
      "Both ICs require 0.1uF bypass caps on supply pins, placed physically close to the IC",
      "If circuit oscillates: (1) check bypass caps, (2) shorten power leads, (3) reduce preamp gain",
      "For electret microphone input: add 1K resistor from mic to Vcc for bias current",
    ],
    notes: "From Forrest Mims Op Amp and Communications books. This 741+LM386 combination appears in over a dozen Mims circuits: lightwave receivers (AM and PFM), sensor alerters, sound-level meters, percussion synthesizers, and mini color organs. The 741 provides adjustable voltage gain (typically 10-100x) while the LM386 drives an 8-ohm speaker at up to 325mW. Supply: +9V single supply (741 can use +/-9V for dual supply when available).",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: Sallen-Key Active Low-Pass Filter
  // ──────────────────────────────────────────────────
  {
    id: "sallen-key-lowpass",
    name: "Sallen-Key Active Low-Pass Filter (2nd Order)",
    description: "Second-order active low-pass filter with -12dB/octave rolloff. Equal-component Sallen-Key topology using a single op-amp. Essential for anti-aliasing before ADC and noise rejection on sensor signals.",
    category: "filter",
    blocks: [
      {
        id: "lowpass-filter-block",
        name: "2nd-Order Low-Pass Filter",
        type: "active-filter",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "LM741",
            eaglePackage: "SOIC-8",
            description: "Op-amp — configured as unity-gain or low-gain Sallen-Key filter",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0603",
            eaglePackage: "RESC1608X55",
            value: "4.7K",
            description: "Filter resistor R1 — equal to R2. fc = 1/(2*pi*R*C) ≈ 3.4kHz with 0.01uF",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0603",
            eaglePackage: "RESC1608X55",
            value: "4.7K",
            description: "Filter resistor R2 — must match R1",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.01UF",
            description: "Filter capacitor C1 — equal to C2",
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.01UF",
            description: "Filter capacitor C2 — must match C1",
          },
          {
            refDes: "R3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "33K_0603",
            eaglePackage: "RESC1608X55",
            value: "33K",
            description: "Gain-setting resistor — R3 = 0.586 * R4 for Butterworth response",
          },
          {
            refDes: "R4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "56K_0603",
            eaglePackage: "RESC1608X55",
            value: "56K",
            description: "Gain-setting resistor — gain = 1 + R4/R3 ≈ 1.59 for proper Butterworth damping",
          },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "R1_R2_JUNCTION", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "NONINV_IN", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C2", pin: "1" }, { refDes: "U1", pin: "3" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R3", pin: "2" }, { refDes: "R4", pin: "1" }] },
          { name: "FILTER_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "R4", pin: "2" }] },
          { name: "GND", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "R3", pin: "1" }] },
        ],
        designRules: [
          "fc = 1/(2*pi*R*C). With R=4.7K, C=0.01uF: fc ≈ 3.4kHz (measured ~3kHz)",
          "For Butterworth (maximally flat) response: R3 = 0.586 * R4",
          "Use matched components — 1% resistors and 5% capacitors minimum",
          "At cutoff frequency, output is 0.707x (-3dB) of passband level",
          "Rolloff is -12dB/octave (2nd order) — much steeper than passive RC (-6dB/octave)",
        ],
      },
    ],
    designRules: [
      "To change cutoff: keep R1=R2 and C1=C2 equal, use fc = 1/(2*pi*R*C)",
      "For high-pass: swap R1/R2 and C1/C2 positions (same formula, same component values)",
      "Place between sensor output and MCU ADC input for anti-aliasing",
      "Choose fc at or below Nyquist frequency (half the ADC sample rate)",
    ],
    notes: "From Forrest Mims Op Amp IC Circuits. The Sallen-Key topology provides 2nd-order filtering with a single op-amp — much better than a passive RC filter. Tested by Mims: R=4.7K, C=0.01uF → calculated 3,386 Hz, measured 3,000 Hz. For the REC engineer: use this between analog sensors and MCU ADC pins. Common cutoff frequencies: 100 Hz (temperature/pressure), 1 kHz (audio), 10 kHz (vibration). Supply: +/-5V to +/-15V.",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: CMOS 4011 Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "cmos-4011-oscillator",
    name: "CMOS 4011 NAND Gate Oscillator",
    description: "Simple clock/oscillator using two NAND gates from a CD4011. Works on 3-15V supply. Frequency set by one resistor and one capacitor. The simplest CMOS clock source.",
    category: "oscillator",
    blocks: [
      {
        id: "cmos-clock-block",
        name: "4011 NAND Oscillator",
        type: "cmos-oscillator",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CD4011",
            eaglePackage: "SOIC-14",
            description: "Quad NAND gate — uses 2 of 4 gates. Tie unused inputs to Vdd or Vss!",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0603",
            eaglePackage: "RESC1608X55",
            value: "100K",
            description: "Timing resistor — F = 1/(2.2*R*C)",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.01UF",
            description: "Timing capacitor — with R=100K gives ~455 Hz",
          },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "VSS", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "GATE1_IN", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "1" }, { refDes: "U1", pin: "2" }] },
          { name: "GATE1_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "U1", pin: "5" }, { refDes: "U1", pin: "6" }] },
          { name: "OSC_OUT", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "C1", pin: "1" }] },
        ],
        designRules: [
          "F = 1/(2.2*R*C). With R=100K, C=0.01uF: F ≈ 455 Hz",
          "ALL unused CMOS inputs MUST be tied to Vdd or Vss — no exceptions",
          "Asymmetric duty cycle — not 50/50",
          "0.1uF + 1uF bypass caps across Vdd/Vss, close to IC",
          "Works with 4001 NOR gates using same topology",
        ],
      },
    ],
    designRules: [
      "Supply: 3V to 15V (CMOS operating range)",
      "Never apply input signal when power is off",
      "Never let input voltage exceed Vdd (except 4049/4050)",
      "For gated oscillator: use pin 1 as enable input (HIGH = run, LOW = stop)",
      "For LED flasher: increase C1 to 4.7uF, add LED + 1K on output",
    ],
    notes: "From Forrest Mims Engineer's Notebooks I & II. The CD4011 NAND oscillator is the simplest CMOS clock. Used throughout Mims for driving counters (4017, 4518), shift registers (4021), and tone generators. Gated variant: enable input on pin 1 allows external logic to start/stop the oscillator. Touch switch variant: 22M resistors to touch pads for body-capacitance triggering (battery power only!).",
  },

  // ──────────────────────────────────────────────────
  // Mims-sourced: 555 DC-DC Boost Converter
  // ──────────────────────────────────────────────────
  {
    id: "555-dc-dc-converter",
    name: "555 DC-DC Boost Converter",
    description: "Simple boost converter using 555 timer driving a miniature transformer. Converts 5-9V input to ~100-120V output for neon indicators, plasma displays, or high-voltage test circuits.",
    category: "power-supply",
    blocks: [
      {
        id: "dc-dc-boost-block",
        name: "555 Transformer Driver",
        type: "dc-dc-converter",
        components: [
          {
            refDes: "U1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "NE555",
            eaglePackage: "SOIC-8",
            description: "555 timer in astable mode — drives transformer primary with pulsed current",
          },
          {
            refDes: "R1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "47K_0603",
            eaglePackage: "RESC1608X55",
            value: "47K",
            description: "Timing resistor R1",
          },
          {
            refDes: "R2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0603",
            eaglePackage: "RESC1608X55",
            value: "1K",
            description: "Timing resistor R2",
          },
          {
            refDes: "C1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0603",
            eaglePackage: "CAPC1608X85",
            value: "0.01UF",
            description: "Timing capacitor",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4004",
            eaglePackage: "SOD-123",
            description: "Rectifier diode — rectifies transformer secondary output",
          },
          {
            refDes: "C2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_250V",
            eaglePackage: "CAP_FILM",
            value: "0.1UF",
            description: "Output filter cap — MUST be rated 250V minimum!",
            critical: true,
          },
          {
            refDes: "R_BLEED",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0603",
            eaglePackage: "RESC1608X55",
            value: "1M",
            description: "Bleeder resistor — slowly discharges C2 when input is removed. SAFETY!",
            critical: true,
          },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "TIMING", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "7" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "HV_OUT_RAW", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "C2", pin: "1" }, { refDes: "R_BLEED", pin: "1" }] },
          { name: "HV_OUT", from: { refDes: "C2", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "D1", pin: "A" }, { refDes: "C2", pin: "2" }, { refDes: "R_BLEED", pin: "2" }] },
        ],
        designRules: [
          "CAUTION: Output is HIGH VOLTAGE (~100-120V from 9V input). Do not touch output leads!",
          "C2 MUST be rated for at least 250V — standard 50V caps WILL fail catastrophically",
          "R_BLEED (1M) slowly discharges C2 when input is removed — SAFETY feature",
          "Transformer: miniature 6.3V:120V power transformer (primary driven by 555, secondary is HV output)",
          "Output varies: Vin=3V→~40V, Vin=5V→~80V, Vin=9V→~120V (approximate, load-dependent)",
        ],
      },
    ],
    designRules: [
      "This is a HIGH VOLTAGE circuit — observe all HV safety precautions",
      "Only for neon indicators, plasma displays, or test equipment — not for power supply use",
      "Low output current capability — do not use for loads exceeding a few milliamps",
      "Keep output wiring short and well-insulated",
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits. A surprisingly simple boost converter — the 555 applies pulsating current to the transformer primary, and the secondary produces stepped-up voltage. The 6.3V:120V transformer ratio provides ~19x voltage multiplication. Useful for powering neon lamp indicators, plasma display elements, or Geiger-Müller tubes. Not suitable for high-current loads. ALWAYS include the bleeder resistor for safety.",
  },

  // ══════════════════════════════════════════════════
  // Mims 555 Timer IC Circuits — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // 555 Bouncefree Switch
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-bouncefree-switch",
    name: "555 Bouncefree Switch",
    description: "555 timer in monostable mode produces a clean, bounce-free output pulse when a mechanical switch is closed. Eliminates contact bounce that causes multiple false triggers in digital circuits.",
    category: "debounce",
    blocks: [
      {
        id: "555-bouncefree-block",
        name: "555 Bouncefree Circuit",
        type: "debounce",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in monostable mode" },
          { refDes: "R1", value: "100K", description: "Timing resistor — Vcc to pin 7" },
          { refDes: "R2", value: "100K", description: "Optional pull-up for switch input — open for variable delay" },
          { refDes: "C1", value: "0.01-10uF", description: "Timing capacitor — sets debounce delay. 0.01uF=short, 10uF=1sec" },
          { refDes: "C2", value: "0.01uF", description: "Bypass cap — pin 5 to GND" },
          { refDes: "S1", description: "Mechanical switch — momentary, connects pin 2 to GND" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "TRIGGER", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "S1", pin: "1" }] },
          { name: "DISCHARGE", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "THRESHOLD", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "S1", pin: "2" }] },
        ],
        designRules: [
          "Delay table: C1=0.01uF→0.01s, 0.1uF→0.1s, 1uF→1s, 10uF→10s (with R1=100K)",
          "Switch closes → pin 2 goes LOW → output goes HIGH for t = 1.1 × R1 × C1",
          "During timing cycle, additional switch bounces are ignored",
          "0.1uF bypass on pin 5 prevents noise-triggered false outputs",
        ],
      },
    ],
    designRules: [
      "Use for pinball switch inputs — eliminates false scoring from contact bounce",
      "For very fast switches (opto sensors), reduce C1 to 0.001uF for microsecond debounce",
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p8. Essential for any mechanical switch input in digital/MCU systems. For pinball: rollover switches, pop bumper contacts, drop target banks all benefit from hardware debounce. MCU firmware debounce is often preferred in modern designs, but hardware debounce is more reliable for critical safety switches (e.g., coin door interlock).",
  },

  // ──────────────────────────────────────────────────
  // 555 Touch-Activated Switch
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-touch-switch",
    name: "555 Touch-Activated Switch",
    description: "555 timer triggered by body capacitance through a touch plate. Touching a metal contact couples enough 60Hz hum or body charge to trigger pin 2, producing a timed output pulse.",
    category: "sensor",
    blocks: [
      {
        id: "555-touch-block",
        name: "555 Touch Switch Circuit",
        type: "sensor-interface",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in monostable mode" },
          { refDes: "R1", value: "100K", description: "Timing resistor" },
          { refDes: "C1", value: "0.01-10uF", description: "Timing capacitor — sets output pulse duration" },
          { refDes: "C2", value: "0.01uF", description: "Bypass cap — pin 5 to GND" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "TOUCH_IN", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "Touch plate connects to pin 2 — body capacitance couples enough signal to trigger",
          "May also work when only pin 2 lead is touched (no separate plate needed)",
          "Output pulse duration: t = 1.1 × R1 × C1",
          "Very sensitive — may need shielded wiring in noisy environments",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p8. For pinball: touch-sensitive playfield elements, novelty start buttons. Body capacitance (~100pF) couples 60Hz mains hum to pin 2, pulling it below 1/3 Vcc threshold. CMOS 555 (TLC555) is more sensitive for this application. Supply: 5-15V.",
  },

  // ──────────────────────────────────────────────────
  // 555 Timer Plus Relay
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-timer-relay",
    name: "555 Timer Plus Relay",
    description: "555 monostable timer that actuates a relay for a preset delay period when triggered by a momentary switch. Flyback diodes protect the 555 from relay coil back-EMF.",
    category: "timer",
    blocks: [
      {
        id: "555-relay-block",
        name: "555 Relay Timer",
        type: "timer",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in monostable mode — drives relay" },
          { refDes: "R1", value: "1M", description: "Timing resistor — sets delay with C1" },
          { refDes: "R2", value: "10K", description: "Pull-up resistor on trigger input" },
          { refDes: "C1", value: "10uF", description: "Timing capacitor — electrolytic, observe polarity" },
          { refDes: "C2", value: "0.01uF", description: "Bypass cap — pin 5 to GND" },
          { refDes: "D1", description: "1N914 flyback diode — across relay coil, cathode to +V" },
          { refDes: "D2", description: "1N914 flyback diode — additional protection" },
          { refDes: "S1", description: "Momentary trigger switch — connects pin 2 to GND" },
          { refDes: "K1", description: "Relay — 5 to 9V coil, 150-500 ohm, SPDT or DPDT" },
        ],
        nets: [
          { name: "+12V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }, { refDes: "D1", pin: "K" }] },
          { name: "TRIGGER", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "S1", pin: "1" }, { refDes: "R2", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "K1", pin: "COIL+" }, { refDes: "D1", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "S1", pin: "2" }, { refDes: "K1", pin: "COIL-" }] },
        ],
        designRules: [
          "Typical delays: R1=100K,C1=10uF→2s; R1=220K→3s; R1=470K→6s; R1=1M→15s (with C1=10uF)",
          "With C1=100uF: R1=100K→16s; R1=220K→33s; R1=470K→70s; R1=1M→175s",
          "D1/D2 flyback diodes are MANDATORY — relay back-EMF will destroy the 555 without them",
          "Use CAUTION when connecting line-powered devices to relay contacts",
          "C2 on pin 5 prevents false triggering from relay switching noise",
        ],
      },
    ],
    designRules: [
      "Relay coil current must not exceed 200mA (555 output limit)",
      "For higher-current relays, add transistor driver between pin 3 and relay",
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p9. Supply: +12V. Extremely useful for pinball: timed solenoid hold (ball trough kicker stays energized for set time), timed flasher sequences, cooling fan delay-off timers. For grill controller: delayed igniter shutoff, fan post-purge timer. The flyback diode lesson is critical — relay back-EMF can be 10-100x supply voltage.",
  },

  // ──────────────────────────────────────────────────
  // 556 Cascaded Timer
  // ──────────────────────────────────────────────────
  {
    id: "mims-556-cascaded-timer",
    name: "556 Cascaded Timer (Sequential One-Shots)",
    description: "556 dual timer with both halves in monostable mode, cascaded so timer 1 output triggers timer 2. Creates a sequential delay: trigger → delay 1 → delay 2.",
    category: "timer",
    blocks: [
      {
        id: "556-cascaded-block",
        name: "556 Cascaded Monostable",
        type: "timer",
        components: [
          { refDes: "U1", description: "556 dual timer IC (two 555s in 14-pin DIP)" },
          { refDes: "R1", value: "1M", description: "Timer 1 timing resistor" },
          { refDes: "R2", value: "22K", description: "Timer 1 timing resistor (fine adjust)" },
          { refDes: "R3", value: "22K", description: "Timer 2 timing resistor" },
          { refDes: "R4", value: "1M", description: "Timer 2 timing resistor" },
          { refDes: "R5", value: "1M", description: "Timer 2 timing resistor" },
          { refDes: "C1", value: "1-100uF", description: "Timer 1 timing capacitor" },
          { refDes: "C2", value: "0.05uF", description: "Timer 1 bypass cap" },
          { refDes: "C3", value: "0.05uF", description: "Coupling cap — timer 1 output to timer 2 trigger" },
          { refDes: "C4", value: "0.05uF", description: "Timer 2 bypass cap" },
          { refDes: "C5", value: "0.05uF", description: "Timer 2 bypass cap" },
          { refDes: "C6", value: "1-100uF", description: "Timer 2 timing capacitor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "10" }, { refDes: "R1", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "TRIG_IN", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "OUT1", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "C3", pin: "1" }] },
          { name: "TRIG2", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "C3", pin: "2" }] },
          { name: "OUT2", from: { refDes: "U1", pin: "9" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Both timers in monostable (one-shot) mode",
          "Grounding the trigger input starts timer 1, which then starts timer 2",
          "Coupling cap C3 differentiates the falling edge of OUT1 to trigger timer 2",
          "Total sequence time = delay1 + delay2",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p10. The 556 contains two 555 timers in a 14-pin DIP. Pin mapping: 555 pins 1-7 → 556 pins 7,1,2,6,3,5,14 (timer 1), 556 pins 7,13,12,8,11,9,14 (timer 2). For pinball: sequential event timing (score → delay → eject ball), two-stage flasher effects, staged solenoid firing sequences.",
  },

  // ──────────────────────────────────────────────────
  // 556 Intervalometer
  // ──────────────────────────────────────────────────
  {
    id: "mims-556-intervalometer",
    name: "556 Intervalometer (Periodic Relay Pulser)",
    description: "556 dual timer: timer 1 in astable mode oscillates at a set rate, triggering timer 2 in monostable mode which drives a relay for 3-5 seconds each cycle. Creates periodic relay actuation.",
    category: "timer",
    blocks: [
      {
        id: "556-intervalometer-block",
        name: "556 Intervalometer",
        type: "timer",
        components: [
          { refDes: "U1", description: "556 dual timer IC" },
          { refDes: "R1", value: "1M", description: "Timer 1 (astable) timing resistor — sets interval rate" },
          { refDes: "R2", value: "1K", description: "Timer 1 astable R2" },
          { refDes: "R3", value: "100K", description: "Timer 2 (monostable) timing resistor — sets relay on-time" },
          { refDes: "C1", value: "100uF", description: "Timer 1 timing cap — large value for slow interval" },
          { refDes: "C2", value: "0.05uF", description: "Timer 2 timing capacitor" },
          { refDes: "C3", value: "0.05uF", description: "Timer 1 bypass" },
          { refDes: "C4", value: "0.05uF", description: "Timer 2 bypass" },
          { refDes: "D1", description: "1N914 flyback diode — across relay coil" },
          { refDes: "D2", description: "1N914 additional protection diode" },
          { refDes: "K1", description: "Relay — 5 to 9V coil, 250-500 ohm" },
        ],
        nets: [
          { name: "+12V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "10" }, { refDes: "R1", pin: "1" }] },
          { name: "OUT2", from: { refDes: "U1", pin: "9" }, to: [{ refDes: "K1", pin: "COIL+" }, { refDes: "D1", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "K1", pin: "COIL-" }] },
        ],
        designRules: [
          "Timer 1 (astable) oscillates, each cycle triggers timer 2 (monostable)",
          "Timer 2 drives relay for 3-5 seconds per actuation",
          "Adjust R1 and C1 to set interval between relay pulses",
          "Flyback diodes D1/D2 mandatory on relay coil",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p11. For pinball: periodic ball-save kicker, timed multiball release, periodic GI flasher patterns. For grill: periodic damper actuation, timed fuel valve cycling. Timer 1 waveform shown: short high pulses at long intervals. Timer 2: relay pulled in for duration of each pulse.",
  },

  // ──────────────────────────────────────────────────
  // 555 Event Failure Alarm
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-event-failure-alarm",
    name: "555 Event Failure Alarm",
    description: "555 monostable with piezo buzzer output. When power is applied, C1 charges through R2. Unless switch S1 is closed before the timing cycle completes, the buzzer sounds. Useful as a reminder or equipment monitoring alarm.",
    category: "alarm",
    blocks: [
      {
        id: "555-event-failure-block",
        name: "555 Event Failure Alarm",
        type: "timer",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer — output drives piezo buzzer" },
          { refDes: "R1", value: "4.7K", description: "Timing resistor" },
          { refDes: "R2", value: "1M", description: "Timing resistor — sets alarm delay" },
          { refDes: "C1", value: "2.2-47uF", description: "Timing capacitor — C1 and R2 control delay before alarm" },
          { refDes: "C2", value: "0.01uF", description: "Bypass cap — pin 5 to GND" },
          { refDes: "Q1", description: "2N3906 PNP transistor — couples trigger signal" },
          { refDes: "S1", description: "External switch — closing before timeout prevents alarm" },
          { refDes: "BZ1", description: "Piezo buzzer — alarm output" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "BZ1", pin: "+" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "BZ1", pin: "-" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "On power-up, C1 charges through R2 — if S1 not closed in time, buzzer sounds",
          "S1 can be any external switch — door sensor, limit switch, etc.",
          "Alarm delay set by t = 1.1 × R2 × C1",
          "Piezo buzzer driven from pin 3 output (HIGH = buzzer off, LOW = buzzer on in this config)",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p13. Supply: +9V. Variation of the missing pulse detector concept. For pinball: alarm if ball not detected within timeout (stuck ball), alarm if coin door left open, maintenance reminder timers. For grill/oven: alarm if temperature sensor doesn't respond within expected time, ignition failure alarm.",
  },

  // ──────────────────────────────────────────────────
  // 555 Frequency Divider
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-frequency-divider",
    name: "555 Frequency Divider (÷2)",
    description: "555 in monostable mode acts as a frequency divider. Input pulses trigger the timer, and the output frequency is half the input frequency. Also squares slowly rising input pulses.",
    category: "timer",
    blocks: [
      {
        id: "555-freq-divider-block",
        name: "555 Frequency Divider",
        type: "timer",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in monostable mode" },
          { refDes: "R1", value: "1M", description: "Timing resistor" },
          { refDes: "C1", value: "0.001-10uF", description: "Timing capacitor — sets pulse width (must be > half input period)" },
          { refDes: "C2", value: "0.047uF", description: "Bypass/coupling capacitor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "INPUT", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "DISCHARGE", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "THRESHOLD", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "Output frequency = 1/2 input frequency",
          "Set monostable pulse width slightly longer than one input period",
          "During the HIGH output, additional trigger pulses are ignored — this creates the divide-by-2",
          "Also useful for squaring slow-rise signals (sine waves, triangle waves)",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p14. Supply: 5-15V. Simple ÷2 divider without needing a flip-flop. For pinball: divide high-speed sensor pulses for slower MCU inputs. For test equipment: sub-harmonic generator.",
  },

  // ──────────────────────────────────────────────────
  // 555 Voltage-Controlled Oscillator (VCO)
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-vco",
    name: "555 Voltage-Controlled Oscillator (VCO)",
    description: "555 astable oscillator whose frequency is controlled by a voltage applied to pin 5 (control voltage). As input voltage increases, oscillation frequency decreases. Can be driven by sensors, pots, or other analog signals.",
    category: "oscillator",
    blocks: [
      {
        id: "555-vco-block",
        name: "555 VCO Circuit",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode with pin 5 voltage control" },
          { refDes: "R1", value: "220", description: "Timing resistor — Vcc to pin 7 (also drives speaker on pin 3)" },
          { refDes: "R2", value: "100K", description: "Timing resistor — pin 7 to pin 6" },
          { refDes: "R3", value: "1K", description: "Current limit resistor for speaker" },
          { refDes: "C1", value: "0.01uF", description: "Timing capacitor" },
          { refDes: "SPKR", description: "8 ohm speaker — connected from pin 3 via R1" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "DISCHARGE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "U1", pin: "7" }] },
          { name: "THRESHOLD", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "CONTROL_V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SPKR", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "Control voltage on pin 5 modulates the internal comparator thresholds",
          "As control voltage increases, frequency DECREASES (inverse relationship)",
          "Input voltage range: ~2.5V to ~5V (at 5V supply). Do not exceed Vcc.",
          "For more volume, omit R1 and connect speaker to ground through 4.7uF cap",
          "Use pot as voltage divider on pin 5 for manual frequency control",
          "Can replace pot with photoresistor, thermistor, or other variable-resistance sensor",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p15. Supply: 5-15V. The VCO is one of the most versatile 555 configurations. For pinball: score-dependent pitch effects, proximity sound effects (ball position → tone). For grill/oven: audible temperature indicator (pitch rises/falls with temp). The 555 VCO has limited linearity — for precision VCO, use dedicated VCO ICs (LM566, CD4046).",
  },

  // ──────────────────────────────────────────────────
  // 555 Pulse Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-pulse-generator",
    name: "555 Pulse Generator (Variable Frequency)",
    description: "555 astable oscillator with selectable R1 and C1 for wide frequency range. Use frequency table to select components. Output on pin 3 is +V level square wave. Connect to GND for constant-low output.",
    category: "oscillator",
    blocks: [
      {
        id: "555-pulse-gen-block",
        name: "555 Pulse Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "R1", value: "1M", description: "Timing resistor — selectable per frequency table" },
          { refDes: "R2", value: "1K", description: "Timing resistor R2" },
          { refDes: "C1", value: "0.002-1uF", description: "Timing capacitor — selectable per frequency table" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "DISCHARGE", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESHOLD", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }, { refDes: "U1", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
        ],
        designRules: [
          "Frequency table (R1=10K): C1=0.0022→42,470Hz; 0.0033→30,490; 0.0047→21,522; 0.0068→16,300; 0.01→11,622; 0.015→7,210; 0.022→4,959; 0.033→3,530; 0.047→2,351; 0.068→1,137; 0.1→1,139; 0.15→804; 0.22→540Hz",
          "Frequency table (R1=100K): same C1 values give ~10× lower frequencies",
          "Frequency table (R1=1M): same C1 values give ~100× lower frequencies (0.22uF→6Hz)",
          "Connect pin 3 to GND for constant-low output (clock disable)",
          "Use as digital logic clock, signal generator, or test pulse source",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p16. Supply: 5-15V. The frequency table is invaluable for quick component selection. For pinball: clock source for discrete logic scoring circuits, test signal for opto sensor debugging. Connect output to frequency counter to verify.",
  },

  // ──────────────────────────────────────────────────
  // 555 Frequency Meter
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-frequency-meter",
    name: "555 Frequency Meter (Audio Range)",
    description: "Ultra-simple frequency meter using 555 astable oscillator driving a 0-1mA meter through an RC integrator network. Measures audio frequency signals from 2.5 to 5 volts input. Non-linear response but useful for relative measurements.",
    category: "test-equipment",
    blocks: [
      {
        id: "555-freq-meter-block",
        name: "555 Frequency Meter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer — converts frequency to DC current for meter" },
          { refDes: "R1", value: "4.7K", description: "Input coupling resistor" },
          { refDes: "R2", value: "4.7K", description: "Input coupling resistor" },
          { refDes: "R3", value: "2.2-10K", description: "Calibration resistor — sets meter range (2.2K or 10K)" },
          { refDes: "R4", value: "4.7K", description: "Meter series resistor" },
          { refDes: "R5", value: "10K", description: "Calibration pot" },
          { refDes: "R6", value: "100", description: "Meter protection resistor" },
          { refDes: "C1", value: "0.01uF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "0.1uF", description: "Bypass/filter capacitor" },
          { refDes: "C3", value: "0.01-0.1uF", description: "Integrator capacitor — sets range. 0.1uF for 0-1kHz, 0.01uF for higher" },
          { refDes: "M1", description: "0-1mA panel meter" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R3", pin: "1" }] },
          { name: "INPUT", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "METER+", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "M1", pin: "-" }] },
        ],
        designRules: [
          "Input signal range: 2.5 to 5 volts audio",
          "NOTE: non-linear response above ~1kHz — response curve flattens",
          "With R3=10K, C3=0.1uF: approximately 0-1kHz range",
          "With R3=2.2K, C3=0.1uF: different scale factor",
          "Calibrate: apply known-frequency signal, adjust R5 until meter reads correctly",
          "Connect pulse generator on facing page to pin 2 (omit C1) — R3 and C3 determine range",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p17. Supply: 5-15V. The 555 output drives an RC integrator that converts pulse frequency to average DC current, displayed on an analog meter. Non-linear above 1kHz. For REC test bench: quick audio frequency check, motor RPM indication (with tach sensor), fan speed monitoring.",
  },

  // ──────────────────────────────────────────────────
  // 555 Toy Organ
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-toy-organ",
    name: "555 Toy Organ (Switched-Capacitor Keyboard)",
    description: "555 astable oscillator with pushbutton-selectable capacitors to produce different musical notes. Each switch connects a different capacitor value, changing the oscillation frequency. 7 switches give roughly one octave.",
    category: "audio",
    blocks: [
      {
        id: "555-organ-block",
        name: "555 Toy Organ",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "R1", value: "100K", description: "Timing resistor" },
          { refDes: "R2", value: "10K", description: "Timing resistor" },
          { refDes: "S1-S7", description: "7 momentary pushbutton switches — each selects a capacitor" },
          { refDes: "C1-C7", description: "7 capacitors for different notes — see frequency table" },
          { refDes: "C8", value: "4.7uF", description: "Output coupling capacitor to speaker" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "4" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SPKR", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "Frequency table (R1=100K): C=0.22uF→52Hz, 0.15→78, 0.1→111, 0.068→170, 0.047→230, 0.033→348, 0.022→490, 0.015→718, 0.01→1175, 0.0068→1670, 0.0047→2240, 0.0033→3152, 0.0022→4671, 0.0015→6336, 0.001→9137Hz",
          "Insert 1K potentiometer between C8 and speaker to control volume",
          "OK to add additional switch/capacitor pairs for more notes",
          "Pressing multiple switches simultaneously produces chord-like effects",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p19. Supply: +9V. A fun demonstration circuit. For pinball: different score events trigger different tones (each solenoid switch could connect a different cap). The switched-capacitor concept is useful any time you need selectable frequencies from a single oscillator.",
  },

  // ──────────────────────────────────────────────────
  // 555 Gated Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-gated-oscillator",
    name: "555 Gated Oscillator (Logic-Controlled Tone)",
    description: "555 astable oscillator gated on/off by an external logic signal through a power MOSFET. When logic input is HIGH, MOSFET turns on, powering the 555. When LOW, oscillator is off. Allows any logic gate to control an audio tone.",
    category: "audio",
    blocks: [
      {
        id: "555-gated-osc-block",
        name: "555 Gated Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "Q1", description: "Power MOSFET (Radio Shack 276-2073 or similar N-channel) — gates 555 power" },
          { refDes: "R1", value: "1M", description: "Timing resistor" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "C1", value: "0.01uF", description: "Timing capacitor" },
          { refDes: "C2", value: "4.7uF", description: "Output coupling cap to speaker" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+V", from: { refDes: "Q1", pin: "D" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "LOGIC_IN", from: { refDes: "Q1", pin: "G" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "SPKR+", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "SPKR", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "Q1", pin: "S" }, { refDes: "C1", pin: "2" }, { refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "Logic HIGH on Q1 gate → MOSFET conducts → 555 powered → tone on",
          "Logic LOW → MOSFET off → silence",
          "Any triangular logic gate symbol means any gate type works (AND, OR, NOT, etc.)",
          "Can also gate by connecting Q1 to +V/GND through 1M resistor for touch control",
          "CAUTION: Q1 can be destroyed by static electricity — follow handling precautions",
          "R1 and C1 control tone frequency: f = 1.44 / ((R1 + 2×R2) × C1)",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p20. Supply: 5-15V. For pinball: logic-controlled sound effects (score events, alarms, end-of-ball tones). Gating via MOSFET power switch is cleaner than using the 555 reset pin, which can leave the output in an undefined state.",
  },

  // ──────────────────────────────────────────────────
  // 556 Chirp Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-556-chirp-generator",
    name: "556 Chirp Generator",
    description: "556 dual timer where timer 1 (astable) modulates timer 2 (astable) via a transistor, producing attention-getting chirp sounds from a piezo buzzer. Rate of chirps controlled by R1, chirp duration by C3.",
    category: "audio",
    blocks: [
      {
        id: "556-chirp-block",
        name: "556 Chirp Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "556 dual timer IC" },
          { refDes: "Q1", description: "2N3904 NPN transistor — gates timer 2 oscillation" },
          { refDes: "R1", value: "1M", description: "Timer 1 timing resistor — controls chirp rate" },
          { refDes: "R2", value: "1K", description: "Timer 1 R2" },
          { refDes: "R3", value: "10K", description: "Timer 2 timing resistor" },
          { refDes: "R4", value: "10K", description: "Timer 2 R2 / transistor bias" },
          { refDes: "C1", value: "4.7uF", description: "Timer 1 timing cap" },
          { refDes: "C2", value: "0.01uF", description: "Timer 2 bypass" },
          { refDes: "C3", value: "0.01uF", description: "Timer 2 timing cap — controls chirp tone frequency" },
          { refDes: "BZ1", description: "Piezo buzzer — chirp output" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "10" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "R1 controls rate of chirps — use 100K for 2-3 chirps/sec, 1M for slow chirps",
          "C3 controls duration of each chirp pulse",
          "Use CdS photoresistor for R1 to make light-sensitive chirp rate",
          "Timer 1 output gates Q1, which enables/disables timer 2 oscillation",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p21. Supply: +9V. Produces attention-getting chirp sounds similar to smoke detectors. For pinball: alert sounds, bonus countdown chirps, multiball ready notification. For grill: timer alert chirps. Using CdS for R1 creates a light-sensitive alarm.",
  },

  // ──────────────────────────────────────────────────
  // 556 Stepped-Tone Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-556-stepped-tone",
    name: "556 Stepped-Tone Generator",
    description: "556 dual timer producing sounds resembling plucked violin strings or drums. Timer 1 astable output charges capacitor C3, which slowly discharges through R3, causing the frequency of timer 2 to decrease in steps. Produces descending-pitch sound effects.",
    category: "audio",
    blocks: [
      {
        id: "556-stepped-tone-block",
        name: "556 Stepped-Tone Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "556 dual timer IC" },
          { refDes: "R1", value: "500K", description: "Timer 1 timing resistor" },
          { refDes: "R2", value: "1K", description: "Timer 1 R2" },
          { refDes: "R3", value: "500K", description: "Frequency-stepping resistor — controls rate of descent" },
          { refDes: "R4", value: "5K", description: "Timer 2 timing resistor" },
          { refDes: "C1", value: "0.01uF", description: "Timer 1 timing cap" },
          { refDes: "C2", value: "0.1uF", description: "Timer 2 bypass" },
          { refDes: "C3", value: "10uF", description: "Stepping capacitor — charges from timer 1, controls timer 2 frequency" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "10" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Frequency falls as R3 is reduced — produces plucked string / drum sounds",
          "Graph shows frequency descent from ~2kHz to 3.1kHz range as R3 goes from 43K to full",
          "OK to change C1, C2, and R1 to alter the effect",
          "Experiment with C3 value for different decay rates",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p22. Supply: 5-15V. Interesting sound effects generator. For pinball: descending-pitch scoring sounds, ball-drain sound, bonus countdown tones. The stepped-frequency descent is more interesting than a simple linear sweep.",
  },

  // ──────────────────────────────────────────────────
  // 556 3-State Tone Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-556-3state-tone",
    name: "556 3-State Tone Generator",
    description: "556 dual timer with 3-position switch S1 selecting: (1) tone burst, (2) steady tone, or (3) two-tone warble. Timer 1 modulates timer 2 through various switched configurations.",
    category: "audio",
    blocks: [
      {
        id: "556-3state-block",
        name: "556 3-State Tone Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "556 dual timer IC" },
          { refDes: "R1", value: "2.2K", description: "Timer 1 timing resistor" },
          { refDes: "R2", value: "100K", description: "Timer 1 R2" },
          { refDes: "R3", value: "100K", description: "Timer 2 timing resistor" },
          { refDes: "R4", value: "5K", description: "Timer 2 R2" },
          { refDes: "R5", value: "5K", description: "Additional timing resistor" },
          { refDes: "R6", value: "270", description: "Speaker current limit" },
          { refDes: "C1", value: "3.3uF", description: "Timer 1 timing cap" },
          { refDes: "C2", value: "0.1uF", description: "Timer 2 coupling/filter" },
          { refDes: "C3", value: "0.1uF", description: "Timer 2 timing cap" },
          { refDes: "S1", description: "3-position switch: 1=tone burst, 2=steady, 3=two-tone" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "10" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Position 1: Tone burst — periodic beeps",
          "Position 2: Steady tone — continuous output",
          "Position 3: Two-tone — alternating frequencies (warble/siren)",
          "Experiment with R1, C1, R4, and C2 values to vary effects",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p23. Supply: +9V. Versatile sound module — one circuit, three distinct alarm/notification sounds. For pinball: different game states produce different sounds (attract mode=warble, scoring=burst, tilt=steady). For grill: different alarm severities.",
  },

  // ──────────────────────────────────────────────────
  // 555 Tone Burst Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-tone-burst",
    name: "555 Tone Burst Generator",
    description: "555 astable oscillator with transistor-switched speaker output. When S1 is closed, speaker emits tone whose frequency is set by R1 and C1. When S1 is opened, tone continues for several seconds as C2 discharges through R4/R5.",
    category: "audio",
    blocks: [
      {
        id: "555-tone-burst-block",
        name: "555 Tone Burst",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "Q1", description: "2N2222 NPN transistor — speaker driver" },
          { refDes: "R1", value: "1K", description: "Timing resistor" },
          { refDes: "R2", value: "22K", description: "Timing resistor" },
          { refDes: "R3", value: "4.7K", description: "Vcc pull-up" },
          { refDes: "R4", value: "10K", description: "Discharge resistor for C2" },
          { refDes: "R5", value: "10K", description: "Base bias resistor for Q1" },
          { refDes: "R6", value: "100", description: "Speaker current limit / emitter resistor" },
          { refDes: "C1", value: "0.1uF", description: "Timing capacitor" },
          { refDes: "C2", value: "100uF", description: "Burst duration cap — stores energy for tone decay" },
          { refDes: "S1", description: "Momentary switch — closes to start tone burst" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "Q1_BASE", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "S1 closed: C2 charges, Q1 conducts, speaker sounds at f = 1.44/((R1+2R2)×C1)",
          "S1 opened: tone continues for time = R4 × C2 (several seconds with 100uF)",
          "Increase C2 to increase burst duration after switch release",
          "Q1 drives speaker with more current than 555 pin 3 alone",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p24. Supply: +9V. The lingering tone after switch release is a nice effect. For pinball: score event sounds that fade naturally, bumper hit tones, bonus collect sounds. The transistor speaker driver allows louder output than direct 555 drive.",
  },

  // ──────────────────────────────────────────────────
  // 555 Dual Sound Effects Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-sound-effects",
    name: "555 Dual Sound Effects Generator (Warble)",
    description: "Two separate 555 timers: the first oscillates at a low frequency determined by R1 and C1, its output charges C2 through R3, and this varying voltage modulates the second 555's frequency via pin 5. Creates warble, siren, and sci-fi sound effects.",
    category: "audio",
    blocks: [
      {
        id: "555-sound-fx-block",
        name: "Dual 555 Sound Effects",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer #1 — low-frequency modulator (astable)" },
          { refDes: "U2", eagleDevice: "NE555", description: "555 timer #2 — audio oscillator (astable), frequency modulated by U1" },
          { refDes: "R1", value: "100K", description: "U1 timing resistor — controls modulation rate" },
          { refDes: "R2", value: "1K", description: "U1 R2" },
          { refDes: "R3", value: "22K", description: "Modulation coupling resistor" },
          { refDes: "R4", value: "220", description: "U2 speaker drive / timing" },
          { refDes: "R5", value: "22K", description: "U2 timing resistor" },
          { refDes: "R6", value: "1K", description: "U2 R2" },
          { refDes: "R7", value: "100K", description: "U2 additional timing" },
          { refDes: "C1", value: "4.7uF", description: "U1 timing cap — large for slow modulation" },
          { refDes: "C2", value: "2.2uF", description: "Modulation filter cap — smooths voltage ramp to U2 pin 5" },
          { refDes: "C3", value: "0.047uF", description: "U2 timing cap" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "MOD_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "CTRL_V", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "C2", pin: "1" }, { refDes: "U2", pin: "5" }] },
          { name: "AUDIO_OUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "SPKR", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U2", pin: "1" }, { refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "C3", pin: "2" }, { refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "U1 (modulator): low frequency oscillation charges/discharges C2 through R3",
          "C2 voltage ramps up and down, modulating U2's control voltage (pin 5)",
          "U2 (audio): frequency sweeps up and down following C2 voltage → warble effect",
          "Experiment with R1/R7 and C2 values to get siren, warble, or sci-fi effects",
          "Charge on C2 creates the signature frequency sweep shape",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p25. Supply: +9V. Two 555s create rich sound effects. For pinball: siren for jackpot, warble for multiball, alien sounds for themed games. The voltage-on-C2 modulation technique produces smooth frequency sweeps rather than abrupt changes. Same principle used in analog synthesizers.",
  },

  // ──────────────────────────────────────────────────
  // 555 LED Flasher
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-led-flasher",
    name: "555 LED Flasher",
    description: "555 astable oscillator driving an LED through a transistor for higher current capability. Flash rate adjustable from 0.2 Hz to 8.3 Hz by changing R1. Also drives both visible and infrared LEDs simultaneously for optical communication.",
    category: "flasher",
    blocks: [
      {
        id: "555-led-flasher-block",
        name: "555 LED Flasher",
        type: "oscillator",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "Q1", description: "2N2222 NPN transistor — LED driver (more current than pin 3 alone)" },
          { refDes: "R1", value: "100K", description: "Timing resistor — adjustable for flash rate" },
          { refDes: "R2", value: "1K", description: "Timing resistor R2" },
          { refDes: "R3", value: "1K", description: "Base resistor for Q1" },
          { refDes: "R4", value: "270", description: "LED current limit resistor" },
          { refDes: "C1", value: "47uF", description: "Timing capacitor — electrolytic" },
          { refDes: "LED1", description: "LED — visible (red/green/yellow) or infrared" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "R4", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "Q1_BASE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "LED_ANODE", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "LED_CATHODE", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "C1", pin: "2" }] },
        ],
        designRules: [
          "Flash rate table: R1=100K→0.2Hz, 47K→0.6, 22K→1.1, 10K→2.1, 4.7K→3.6, 2.2K→6.1, 1K→8.3Hz",
          "Connect piezo buzzer across LED for combined light/sound darkroom timer",
          "Use infrared emitter LED for powerful IR transmitter",
          "Connect solar cell + phototransistor on receiver end for IR communication",
          "Reduce C1 for faster rates — use frequency formula to calculate",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p26. Supply: +9V. For pinball: GI flasher timing, insert lamp effects, attract-mode flasher patterns. The transistor driver allows driving high-current LEDs or multiple LEDs in parallel. IR variant useful for optical communication between boards.",
  },

  // ──────────────────────────────────────────────────
  // 555 Power FET Lamp Dimmer
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-fet-lamp-dimmer",
    name: "555 Power FET Lamp Dimmer (PWM)",
    description: "555 astable oscillator driving a power MOSFET to PWM-dim an incandescent lamp. The 555 switches the FET on/off at a rate determined by R1+R2 and C1. When switching is fast enough, the lamp appears to glow continuously at reduced brightness.",
    category: "power-control",
    blocks: [
      {
        id: "555-dimmer-block",
        name: "555 FET Lamp Dimmer",
        type: "power-supply",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode — generates PWM" },
          { refDes: "Q1", description: "IRFS11 or similar power MOSFET (N-channel, logic-level gate)" },
          { refDes: "R1", value: "100", description: "Timing resistor R1" },
          { refDes: "R2", value: "1K-5K", description: "Timing pot — adjusts duty cycle (brightness)" },
          { refDes: "R3", value: "1K", description: "Timing R3" },
          { refDes: "R4", value: "10K", description: "Gate pull-down resistor" },
          { refDes: "C1", value: "0.047uF", description: "Timing capacitor" },
          { refDes: "L1", description: "Incandescent lamp — 6V, up to 3W (or more with proper FET)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "Q1", pin: "G" }] },
          { name: "+6V_LAMP", from: { refDes: "L1", pin: "+" }, to: [] },
          { name: "LAMP_SW", from: { refDes: "L1", pin: "-" }, to: [{ refDes: "Q1", pin: "D" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "Q1", pin: "S" }, { refDes: "C1", pin: "2" }, { refDes: "R4", pin: "2" }] },
        ],
        designRules: [
          "Linear dimming — as switching rate increases, lamp appears to glow continuously",
          "Q1 MUST be properly rated: 6V lamp at 0.5A = IRFS11 or similar",
          "For higher-power lamps, use higher-rated MOSFET and add heatsink (TO-220)",
          "Some 555 versions may operate with +6V on pin 8 — others need separate 9V",
          "Lamp supply can be separate from 555 supply (share GND only)",
          "R4 ensures Q1 gate is pulled LOW when 555 output is LOW",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p27. The 555 PWM + power FET is a fundamental power control pattern. For pinball: incandescent flasher dimming, backbox lamp effects, playfield lighting control. For grill: heating element PWM (with appropriate relay/SSR instead of FET for high power). The MOSFET switches with near-zero loss — much more efficient than linear dimming with a resistor.",
  },

  // ──────────────────────────────────────────────────
  // 555 Light/Dark Detector
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-light-dark-detector",
    name: "555 Light/Dark Detector",
    description: "555 astable oscillator with CdS photoresistor controlling the timing. DPDT switch S1 selects light-activated (tone when lit) or dark-activated (tone when dark) mode. Useful as a light-level alarm or optical sensor.",
    category: "sensor",
    blocks: [
      {
        id: "555-light-dark-block",
        name: "555 Light/Dark Detector",
        type: "sensor-interface",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode" },
          { refDes: "R1", value: "47K", description: "Timing resistor" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "R3", value: "10K", description: "Sensitivity adjustment pot" },
          { refDes: "C1", value: "0.047uF", description: "Timing capacitor" },
          { refDes: "C2", value: "4.7uF", description: "Output coupling cap to speaker" },
          { refDes: "S1", description: "DPDT switch — selects L (light) or D (dark) activated mode" },
          { refDes: "LDR1", description: "CdS photoresistor — light sensor" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "SPKR+", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "SPKR", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "SPKR", pin: "-" }] },
        ],
        designRules: [
          "S1 in L position: tone sounds when photoresistor is illuminated",
          "S1 in D position: tone sounds when photoresistor is in darkness",
          "R3 adjusts sensitivity threshold — when boundary between light and dark triggers",
          "OK to alter R1 and C1 to change frequency of the alarm tone",
          "CdS photoresistor resistance: ~1K in bright light, ~1M in dark",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p28. Supply: +9V. For pinball: under-playfield light sensors for ball detection (dark-activated mode when ball blocks light), ambient light level auto-adjust for display brightness. For general use: dawn/dusk alarm, open-door light detector, dark-room safe light monitor.",
  },

  // ──────────────────────────────────────────────────
  // 555 Infrared Security Alarm
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-ir-security-alarm",
    name: "555 Infrared Security Alarm",
    description: "555 astable oscillator with IR LED transmitter and phototransistor receiver creating an invisible beam. When beam is broken, the 555 oscillates and drives a piezo buzzer alarm. Attach to door, window, etc.",
    category: "alarm",
    blocks: [
      {
        id: "555-ir-alarm-block",
        name: "555 IR Security Alarm",
        type: "sensor-interface",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer — drives piezo buzzer when beam broken" },
          { refDes: "Q1", description: "Phototransistor — IR receiver, aimed at LED" },
          { refDes: "Q2", description: "2N3906 PNP transistor — amplifies phototransistor signal" },
          { refDes: "R1", value: "47K", description: "Timing/bias resistor" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "R3", value: "220", description: "IR LED current limit" },
          { refDes: "R4", value: "10K", description: "Phototransistor load resistor" },
          { refDes: "R5", value: "1M", description: "Sensitivity/bias resistor" },
          { refDes: "C1", value: "0.047uF", description: "Timing capacitor" },
          { refDes: "C2", value: "0.047uF", description: "Coupling/filter capacitor" },
          { refDes: "C3", value: "0.01uF", description: "Bypass cap" },
          { refDes: "LED1", description: "Infrared LED — transmitter, aimed at Q1 (~1 inch gap)" },
          { refDes: "BZ1", description: "Piezo buzzer — alarm output" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "IR_LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "BZ1", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "LED1", pin: "K" }, { refDes: "C1", pin: "2" }, { refDes: "BZ1", pin: "-" }] },
        ],
        designRules: [
          "IR LED and phototransistor face each other ~1 inch apart",
          "Shield Q1 from external light — use opaque insert with small hole",
          "Alarm sounds when opaque object breaks the IR beam between LED and Q1",
          "Mount on door/window — attach insert to moving part, LED+Q1 to frame",
          "Use for monitoring doors, windows, drawers, or any opening",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p29. Supply: 5-15V. Simple but effective break-beam security sensor. For pinball: ball detection using IR break-beam (much more reliable than mechanical switches for ball troughs and lanes), lane detection for combo scoring. The invisible IR beam is unobtrusive.",
  },

  // ──────────────────────────────────────────────────
  // 555 Analog Lightwave Transmitter
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-lightwave-tx",
    name: "555 Analog Lightwave Transmitter",
    description: "555 VCO that transmits analog sensor data as a frequency-modulated infrared light beam. A CdS photoresistor (or any variable-resistance sensor) modulates the 555 frequency, which is transmitted via an infrared LED. The receiver on facing page demodulates the signal.",
    category: "communication",
    blocks: [
      {
        id: "555-lightwave-tx-block",
        name: "555 IR Transmitter (PFM)",
        type: "communication",
        components: [
          { refDes: "U1", eagleDevice: "NE555", description: "555 timer in astable mode — VCO modulated by sensor" },
          { refDes: "R1", description: "CdS photoresistor or any variable-resistance sensor — modulates frequency" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "R3", value: "220", description: "IR LED current limit" },
          { refDes: "C1", value: "0.22uF", description: "Timing capacitor" },
          { refDes: "LED1", description: "Infrared LED — transmits modulated light beam" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "DISCHARGE", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESHOLD", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "IR_LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "LED1", pin: "K" }] },
        ],
        designRules: [
          "R1 can be ANY variable-resistance sensor: CdS photoresistor, thermistor, etc.",
          "When R1 is CdS: frequency rises with light level (resistance drops → freq rises)",
          "Use lens on IR LED to focus beam for longer range",
          "Pairs with Analog Lightwave Receiver (mims-555-lightwave-rx) on the receiving end",
          "PFM (pulse frequency modulation) — more noise-immune than amplitude modulation",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p30. Supply: +9V. Transmits analog data over an infrared light beam using pulse-frequency modulation. For REC: wireless sensor data link between boards (no wiring needed across moving/rotating parts), or isolated signal coupling across high-voltage boundaries. Replace R1 with thermistor for wireless temperature transmission.",
  },

  // ──────────────────────────────────────────────────
  // 555 Analog Lightwave Receiver
  // ──────────────────────────────────────────────────
  {
    id: "mims-555-lightwave-rx",
    name: "555 Analog Lightwave Receiver",
    description: "Receives PFM signals from the 555 Lightwave Transmitter. A phototransistor detects the modulated IR beam, a 1458 dual op-amp amplifies and conditions the signal, and a 555 frequency meter converts it to a DC current displayed on a 0-1mA meter.",
    category: "communication",
    blocks: [
      {
        id: "555-lightwave-rx-block",
        name: "555 IR Receiver (PFM Demodulator)",
        type: "communication",
        components: [
          { refDes: "U1", description: "1458 dual op-amp — amplifies phototransistor signal" },
          { refDes: "U2", eagleDevice: "NE555", description: "555 timer — frequency-to-DC converter for meter" },
          { refDes: "Q1", description: "Phototransistor — detects modulated IR light" },
          { refDes: "R1", value: "100K", description: "Phototransistor load resistor" },
          { refDes: "R2", value: "100", description: "Op-amp input coupling" },
          { refDes: "R3", value: "1M", description: "Op-amp feedback resistor" },
          { refDes: "R4", value: "10K", description: "Op-amp output coupling" },
          { refDes: "R5", value: "47K", description: "555 timing resistor" },
          { refDes: "R6", value: "4.7K", description: "555 timing R2" },
          { refDes: "R7", value: "47K", description: "Meter calibration" },
          { refDes: "R8", value: "47K", description: "Meter bias" },
          { refDes: "R9", value: "10K", description: "Calibration pot" },
          { refDes: "R10", value: "220", description: "Meter series resistor" },
          { refDes: "C1", value: "0.1uF", description: "Input coupling cap" },
          { refDes: "C2", value: "0.1uF", description: "Op-amp coupling" },
          { refDes: "C3", value: "0.1uF", description: "Filter cap" },
          { refDes: "C4", value: "0.1uF", description: "555 timing cap" },
          { refDes: "C5", value: "0.05uF", description: "Meter filter cap" },
          { refDes: "M1", description: "0-1mA panel meter" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "1" }, { refDes: "M1", pin: "-" }] },
        ],
        designRules: [
          "Phototransistor Q1 receives modulated IR from transmitter",
          "1458 op-amp amplifies and conditions the signal for the 555",
          "555 converts pulse frequency to DC meter reading",
          "C2 connects directly across pins 8 and 4 of the 1458 (bypass)",
          "Calibrate: adjust R9 until meter reads correctly for known transmitter frequency",
          "OK to use two 741 op-amps in place of the 1458 dual",
          "Non-linear response when transmitter frequency exceeds ~1.3kHz",
        ],
      },
    ],
    notes: "From Forrest Mims 555 Timer IC Circuits p31. Supply: +9V. Pairs with mims-555-lightwave-tx. Complete PFM lightwave communication link — transmitter sends sensor data as frequency-modulated IR light, receiver demodulates to analog meter reading. For REC: demonstrates the principle of optical isolation — useful for crossing high-voltage boundaries in grill/oven controllers.",
  },

  // ══════════════════════════════════════════════════
  // Mims Op Amp IC Circuits — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Basic Inverting Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-inverting",
    name: "Op-Amp Basic Inverting Amplifier",
    description: "Fundamental inverting amplifier using 741 op-amp. Gain = -R2/R1 (inverted output). R3 = R1||R2 minimizes offset. The most common op-amp configuration.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-inverting-block",
        name: "Inverting Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp (or any general-purpose op-amp)" },
          { refDes: "R1", value: "1K", description: "Input resistor — sets gain with R2" },
          { refDes: "R2", value: "10K", description: "Feedback resistor — Gain = -R2/R1 = -10" },
          { refDes: "R3", value: "1K", description: "Bias resistor = R1×R2/(R1+R2) — minimizes offset" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "R3", pin: "2" }, to: [] },
        ],
        designRules: [
          "Gain = -(R2/R1). Example: R1=1K, R2=10K → gain = -10",
          "R3 = (R1×R2)/(R1+R2) minimizes input offset voltage errors",
          "Non-inverting input (pin 3) grounded through R3",
          "Supply: ±3V to ±15V (dual supply required for standard 741)",
          "Output swings to within ~2V of supply rails (741 limitation)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p12. The inverting amplifier is a differential amplifier — it amplifies the difference between the input (Vin) and ground (0V). The unused input is grounded. This is the most fundamental op-amp circuit and the basis for summing amplifiers, integrators, and active filters.",
  },

  // ──────────────────────────────────────────────────
  // Unity-Gain Inverter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-unity-inverter",
    name: "Op-Amp Unity-Gain Inverter (Phase Inverter)",
    description: "Inverting amplifier with gain of exactly -1 (unity). Inverts the signal phase without changing amplitude. Use as a buffer or to convert -Vout to +Vout. R1=R2=R3=1K.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-unity-inv-block",
        name: "Unity-Gain Inverter",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Input resistor" },
          { refDes: "R2", value: "1K", description: "Feedback resistor — R2=R1 for gain of -1" },
          { refDes: "R3", value: "1K", description: "Bias resistor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "R3", pin: "2" }, to: [] },
        ],
        designRules: [
          "Vout = -Vin (exact inversion, no gain)",
          "Supply: ±3V to ±15V",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p12. Use as a phase inverter or signal buffer. For non-inverted output, use the non-inverting amplifier instead.",
  },

  // ──────────────────────────────────────────────────
  // Non-Inverting Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-noninverting",
    name: "Op-Amp Non-Inverting Amplifier",
    description: "Non-inverting amplifier with gain = 1 + (R2/R1). Output preserves input polarity. Very high input impedance since signal connects to non-inverting input.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-noninv-block",
        name: "Non-Inverting Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Ground-to-inverting input resistor" },
          { refDes: "R2", value: "10K", description: "Feedback resistor — Gain = 1 + R2/R1 = 11" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "R1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Gain = 1 + (R2/R1). Example: R1=1K, R2=10K → gain = 11",
          "Vout is amplified but NOT inverted version of Vin",
          "Very high input impedance (op-amp input impedance, not R1)",
          "Supply: ±3V to ±15V",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p13. Preferred over inverting amp when high input impedance is needed (sensor buffering, high-impedance sources). For unity gain (buffer), see unity-gain follower.",
  },

  // ──────────────────────────────────────────────────
  // Unity-Gain Follower (Voltage Follower)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-follower",
    name: "Op-Amp Unity-Gain Follower (Voltage Buffer)",
    description: "Simplest op-amp circuit: output directly connected to inverting input. Gain = 1, no inversion. Extremely high input impedance, low output impedance. Use to buffer signals between circuit stages.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-follower-block",
        name: "Unity-Gain Follower",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "FEEDBACK", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "Vout = Vin exactly (unity gain, no inversion)",
          "100% negative feedback — output connects directly to inverting input",
          "Input impedance: ~2 megohms (741). Use CMOS op-amp for even higher.",
          "Use to buffer high-impedance sources (sensors, voltage dividers)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p13. The voltage follower is essential for impedance matching. For REC: buffer thermocouple/thermistor signals before ADC input, isolate voltage dividers from loading effects. No external resistors needed.",
  },

  // ──────────────────────────────────────────────────
  // Transconductance Amplifier (Voltage-to-Current)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-transconductance",
    name: "Op-Amp Transconductance Amplifier (V-to-I Converter)",
    description: "Converts input voltage to proportional output current through a load. Iout = Vin/(R1+R2). Useful for driving LEDs at a brightness proportional to input voltage, or for current-loop signaling.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-gm-block",
        name: "Transconductance Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", description: "Load (e.g., LED)" },
          { refDes: "R2", value: "4.7K", description: "Current-sensing resistor" },
          { refDes: "R3", value: "10K", description: "Input control pot — varies Vin to alter Iout" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R3", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "SENSE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "FEEDBACK", from: { refDes: "R2", pin: "1" }, to: [{ refDes: "U1", pin: "3" }] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [] },
        ],
        designRules: [
          "Vout = [Vin(R1+R2)] / R2",
          "Iout = Vout / (R1+R2) = Vin / R2",
          "R3 controls Vin, hence controls LED brightness or load current",
          "Supply: ±3V to ±15V (example uses ±9V)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p14. Voltage-to-current converter. For REC: control LED brightness proportional to a control voltage, drive 4-20mA current loops for industrial sensors, or create a programmable current source for testing.",
  },

  // ──────────────────────────────────────────────────
  // Transimpedance Amplifier (Current-to-Voltage)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-transimpedance",
    name: "Op-Amp Transimpedance Amplifier (I-to-V Converter)",
    description: "Converts input current to proportional output voltage. Gain = -R1 (in ohms, giving V/A). Ideal for amplifying photodiode/solar cell current into a measurable voltage. Can also amplify signals from thermistors and photoresistors.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-tia-block",
        name: "Transimpedance Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1M", description: "Feedback resistor — sets transimpedance gain. Use 1M for high gain." },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "CURRENT_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "Gain = Vout/Iin = -R1. If R1=1K, gain = -1000 V/A (i.e., 1mA in → 1V out)",
          "Connect current source (solar cell, photodiode) between pin 2 and ground, pin 3 grounded",
          "Can amplify signals from thermistors and photoresistors by connecting device to +V and the other end to pin 2",
          "Use R1 pot to vary gain",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p15. The TIA is fundamental for optical sensors. For REC: amplify photodiode current for optical position sensing, convert solar cell current to voltage for light metering, interface current-output sensors. Supply: ±3V to ±15V.",
  },

  // ──────────────────────────────────────────────────
  // Single-Supply Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-single-supply",
    name: "Op-Amp Single-Supply Inverting Amplifier",
    description: "Inverting amplifier designed for single-supply operation (+5 to +15V only, no negative rail). R3/R4 voltage divider biases the non-inverting input at 1/2 Vcc. AC-coupled input and output via C1 and C2. Amplifies AC signals only (not DC).",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-single-supply-block",
        name: "Single-Supply Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Input resistor" },
          { refDes: "R2", value: "100K", description: "Feedback resistor — gain = -R2/R1 = -100" },
          { refDes: "R3", value: "47K", description: "Bias divider upper — sets midpoint at 1/2 +V" },
          { refDes: "R4", value: "47K", description: "Bias divider lower" },
          { refDes: "C1", value: "0.47uF", description: "Input coupling cap — blocks DC, passes AC" },
          { refDes: "C2", value: "0.47uF", description: "Output coupling cap" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "INPUT", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "BIAS", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "U1", pin: "3" }] },
          { name: "OUTPUT_RAW", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "C2", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "R4", pin: "2" }, to: [] },
        ],
        designRules: [
          "Output floats at 1/2 +V (above and below ground) — AC signal rides on this DC bias",
          "C1 ≈ 1/(2π × f_low × R1) — sets low-frequency cutoff",
          "C2 ≈ 1/(2π × f_low × R_load) — sets output coupling cutoff",
          "Will amplify AC signal but NOT DC — suitable for audio, sensor AC components",
          "Supply: +5 to +15V single supply (pin 4 to GND)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p16. Essential for battery-operated and microcontroller-based designs where only a single supply is available. For REC: audio amplification from single 5V or 9V supply, sensor signal conditioning on single-rail MCU boards.",
  },

  // ──────────────────────────────────────────────────
  // Op-Amp Audio Mixer
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-audio-mixer",
    name: "Op-Amp Audio Mixer (Multiple Input Summing)",
    description: "741 inverting amplifier configured as an audio mixer with 3 equal-value input resistors. Each input is mixed at unity gain. Use with audio amplifier (741+386) for speaker output. Add more 10K input resistors for more channels.",
    category: "audio",
    blocks: [
      {
        id: "opamp-mixer-block",
        name: "Op-Amp Audio Mixer",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "10K", description: "Input 1 resistor" },
          { refDes: "R2", value: "10K", description: "Input 2 resistor" },
          { refDes: "R3", value: "10K", description: "Input 3 resistor" },
          { refDes: "R4", value: "10K", description: "Feedback resistor — unity gain per channel" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "IN1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "IN2", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "IN3", from: { refDes: "R3", pin: "1" }, to: [] },
          { name: "SUM_NODE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R3", pin: "2" }, { refDes: "U1", pin: "2" }, { refDes: "R4", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R4", pin: "2" }] },
        ],
        designRules: [
          "Vout = -(Vin1 + Vin2 + Vin3) when all input resistors equal feedback resistor",
          "Add more 10K input resistors to pin 2 for more channels",
          "Use with multiple microphones for multi-source audio mixing",
          "Sum of inputs should not exceed ±V supply to avoid clipping",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p17. For pinball: mix multiple sound sources (different oscillators for different events). For grill: combine multiple sensor signals. The summing amplifier is also the basis for DAC circuits (R-2R ladder).",
  },

  // ──────────────────────────────────────────────────
  // Summing Amplifier (1458 dual)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-summing",
    name: "Op-Amp Summing Amplifier (1458)",
    description: "1458 dual op-amp summing amplifier. Output = -(Vin1 + Vin2). Sum of input voltages should not exceed ±V. Preserves polarity of the sum. Also shows expanded version with more inputs.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-summing-block",
        name: "Summing Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "1458 dual op-amp" },
          { refDes: "R1", value: "10K", description: "Vin1 input resistor" },
          { refDes: "R2", value: "10K", description: "Vin2 input resistor" },
          { refDes: "R3", value: "10K", description: "Feedback resistor" },
          { refDes: "R4", value: "1K", description: "Output current limit" },
          { refDes: "R5", value: "1K", description: "Second stage feedback" },
          { refDes: "R6", value: "1K", description: "Second stage gain" },
          { refDes: "R7", value: "1K", description: "Bias" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "VIN1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VIN2", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Vout = -(Vin1 + Vin2) when R1=R2=R3",
          "Test: Vin1=+4.0V, Vin2=+0.8V → Vout = -4.8V",
          "Sum should not exceed ±V supply",
          "Add more equal-value input resistors for more channels",
          "Second op-amp stage can re-invert to restore polarity",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p18. Supply: ±5V to ±15V. For REC: combine multiple sensor readings, create weighted averages of analog signals, basis for simple DAC circuits.",
  },

  // ──────────────────────────────────────────────────
  // Difference Amplifier (1458 dual)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-difference",
    name: "Op-Amp Difference Amplifier (1458)",
    description: "1458 dual op-amp difference amplifier. Output = Vin2 - Vin1. Uses matched resistors (R1=R2=R3=R4=100K) for unity differential gain. Essential for measuring voltage differences between two points.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-diff-block",
        name: "Difference Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "1458 dual op-amp" },
          { refDes: "R1", value: "100K", description: "Vin1 input resistor" },
          { refDes: "R2", value: "100K", description: "Vin2 input resistor" },
          { refDes: "R3", value: "100K", description: "Feedback resistor" },
          { refDes: "R4", value: "100K", description: "Non-inverting bias resistor" },
          { refDes: "R5", value: "1K", description: "Second stage feedback" },
          { refDes: "R6", value: "1K", description: "Output resistor" },
          { refDes: "R7", value: "1K", description: "Bias" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "VIN1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VIN2", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Vout = Vin2 - Vin1 (when R1=R2=R3=R4)",
          "Test: Vin1=0.9V, Vin2=5.0V → Vout=4.1V",
          "Input voltages should not exceed ±V supply",
          "Resistor matching is critical — use 1% tolerance for accuracy",
          "Second stage can reverse polarity: Vout = -(Vin2 - Vin1) = Vin1 - Vin2",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p19. Supply: ±5V to ±15V. For REC: measure voltage across a shunt resistor (current sensing), Wheatstone bridge output amplification, differential temperature measurement between two thermistors.",
  },

  // ──────────────────────────────────────────────────
  // Dual-Supply Integrator
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-integrator-dual",
    name: "Op-Amp Dual-Supply Integrator",
    description: "Integrator circuit — output is proportional to the time integral of the input. Converts square wave to triangle wave. C1 = 1/(f×R2) where R2 >= 10×R1. Low-pass filter behavior.",
    category: "filter",
    blocks: [
      {
        id: "opamp-integrator-block",
        name: "Dual-Supply Integrator",
        type: "filter",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "4.7K", description: "Input resistor" },
          { refDes: "R2", value: "47K", description: "DC feedback stabilization — R2 >= 10×R1" },
          { refDes: "R3", value: "4.7K", description: "Bias resistor = R1×R2/(R1+R2)" },
          { refDes: "C1", value: "0.1uF", description: "Integrating capacitor — C1 = 1/(f×R2)" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C1", pin: "2" }] },
          { name: "GND", from: { refDes: "R3", pin: "2" }, to: [] },
        ],
        designRules: [
          "Square wave in → triangle wave out",
          "For f=2000Hz, ±2.5V square wave → ±1.3V triangle wave",
          "R2 provides DC feedback to prevent saturation (without it, output drifts to rail)",
          "Use as low-pass filter, waveform converter, or analog computer element",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p20. Supply: ±5V to ±15V. The integrator is a key building block for analog signal processing. For REC: convert PWM to analog voltage (DAC), smooth sensor signals, build ramp generators for timing circuits.",
  },

  // ──────────────────────────────────────────────────
  // Dual-Supply Differentiator
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-differentiator-dual",
    name: "Op-Amp Dual-Supply Differentiator",
    description: "Differentiator circuit — output is proportional to the rate of change of the input. Converts triangle wave to square wave. High-pass filter behavior. C1 = 1/(f×R2).",
    category: "filter",
    blocks: [
      {
        id: "opamp-differentiator-block",
        name: "Dual-Supply Differentiator",
        type: "filter",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "470", description: "Input series resistor — limits high-frequency gain" },
          { refDes: "R2", value: "4.7K", description: "Feedback resistor" },
          { refDes: "C1", value: "0.1uF", description: "Differentiating capacitor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "CAP_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "INV_IN", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
        ],
        designRules: [
          "Triangle wave in → square wave out",
          "For f=2000Hz, ±2.5V triangle in → ±10V square out",
          "C1 = 1/(f × R2) or R2 = 1/(f × C1)",
          "R1 limits high-frequency gain to prevent oscillation",
          "Very sensitive to noise — use in clean signal environments",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p21. Supply: ±5V to ±15V. The differentiator detects rate of change. For REC: edge detection on sensor signals, convert ramp to pulse, detect sudden temperature changes in grill/oven controller.",
  },

  // ──────────────────────────────────────────────────
  // Peak Detector
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-peak-detector",
    name: "Op-Amp Peak Detector (Sample and Hold)",
    description: "1458 dual op-amp peak detector. First half is a voltage follower that charges C1 through D1 to the peak input voltage. C1 holds the peak value. Press S1 to reset (discharge C1). Connect voltmeter to output to read stored peak.",
    category: "test-equipment",
    blocks: [
      {
        id: "opamp-peak-block",
        name: "Peak Detector",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "1458 dual op-amp" },
          { refDes: "D1", description: "1N914 signal diode — peak charging diode" },
          { refDes: "R1", value: "10K", description: "Input resistor" },
          { refDes: "R2", value: "10K", description: "Feedback resistor" },
          { refDes: "C1", value: "1-10uF", description: "Peak hold capacitor — larger = longer hold time" },
          { refDes: "S1", description: "Reset switch — momentary, shorts C1 to discharge" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "DIODE_OUT", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "HOLD", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "C1", pin: "+" }, { refDes: "U1", pin: "5" }, { refDes: "S1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "S1", pin: "2" }] },
        ],
        designRules: [
          "Output follows input peak — holds highest voltage seen",
          "C1 charge leaks ~10 millivolts/second — use low-leakage cap for longer hold",
          "S1 resets by discharging C1",
          "Second op-amp half buffers C1 voltage for measurement (high-Z output)",
          "Supply: ±5V to ±15V",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p22. For REC: capture peak temperature readings, detect maximum sensor excursion, audio peak metering. The drift (~10mV/sec) limits long-term hold accuracy but is fine for real-time peak indication.",
  },

  // ──────────────────────────────────────────────────
  // Inverting Clipper (Zener)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-inverting-clipper",
    name: "Op-Amp Inverting Clipper (Zener Limiter)",
    description: "Inverting amplifier with back-to-back zener diodes in the feedback path. Output is clipped at ±Vz (zener breakdown voltage). Converts sine waves to square waves. Useful for limiting audio overloads.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-inv-clipper-block",
        name: "Inverting Clipper",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Input resistor" },
          { refDes: "R2", value: "10K", description: "Feedback resistor — gain = -R2/R1 = -10" },
          { refDes: "R3", value: "1K", description: "Bias resistor" },
          { refDes: "D1", description: "Zener diode — breakdown voltage sets + clip level" },
          { refDes: "D2", description: "Zener diode — breakdown voltage sets - clip level" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INV_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
        ],
        designRules: [
          "D1 and D2 are zener diodes — their breakdown voltage determines clip level",
          "D1=D2=5.1V zener → output clips at ±5V",
          "Gain = -R2/R1 below clipping threshold, then hard limit at Vz",
          "Use to limit audio amplifier overloads and protect downstream circuits",
          "Converts sine waves to approximate square waves",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p23. Supply: ±5V to ±15V. For REC: protect ADC inputs from over-voltage, create square waves from sine waves, audio limiter for speaker protection.",
  },

  // ──────────────────────────────────────────────────
  // Non-Inverting Clipper
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-noninverting-clipper",
    name: "Op-Amp Non-Inverting Clipper",
    description: "Non-inverting amplifier with back-to-back zener diodes between output and inverting input. Gain = 1 + R2/R1 below clip threshold. Output clips at ±(Vz + Vf) where Vf is forward diode drop.",
    category: "amplifier",
    blocks: [
      {
        id: "opamp-noninv-clipper-block",
        name: "Non-Inverting Clipper",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Ground resistor" },
          { refDes: "R2", value: "10K", description: "Feedback resistor — gain = 1+R2/R1 = 11" },
          { refDes: "D1", description: "Zener diode — clip level D1=D2=5V → ±5V clip" },
          { refDes: "D2", description: "Zener diode" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "R1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Gain = 1 + R2/R1 = 11 (with values shown)",
          "Output clips at ±(Vz) — non-inverted",
          "Supply: ±5V to ±15V",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p23. Non-inverting version preserves signal polarity while clipping peaks.",
  },

  // ──────────────────────────────────────────────────
  // Bistable RS Flip-Flop (Op-Amp)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-rs-flipflop",
    name: "Op-Amp Bistable RS Flip-Flop",
    description: "741 op-amp as a bistable latch with two LED indicators. Positive feedback creates two stable states. Input R (reset) and S (set) control the state. Demonstrates that an analog op-amp can perform digital logic. Has memory — holds state even when input floats.",
    category: "logic",
    blocks: [
      {
        id: "opamp-rs-block",
        name: "Op-Amp RS Flip-Flop",
        type: "logic",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "Q1", description: "2N2222 NPN transistor — LED1 driver" },
          { refDes: "Q2", description: "2N2222 NPN transistor — LED2 driver" },
          { refDes: "R1", value: "4.7K", description: "R input resistor" },
          { refDes: "R2", value: "4.7K", description: "S input resistor" },
          { refDes: "R3", value: "10K", description: "Positive feedback resistor (to pin 3)" },
          { refDes: "R4", value: "1K", description: "LED1 series resistor" },
          { refDes: "R5", value: "47K", description: "Bias" },
          { refDes: "R6", value: "1K", description: "Base resistor" },
          { refDes: "R7", value: "1K", description: "LED2 series resistor" },
          { refDes: "R8", value: "470", description: "LED2 series" },
          { refDes: "R9", value: "1K", description: "Base resistor" },
          { refDes: "LED1", description: "LED — indicates SET state" },
          { refDes: "LED2", description: "LED — indicates RESET state" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "R_INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "S_INPUT", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "Truth table: R=GND,S=+V → LED1 ON; R=GND,S=-V → LED2 ON; R=+V,S=GND → LED1 OFF,LED2 ON",
          "Has MEMORY — holds state even when inputs float",
          "Use optional D1/D2 (5.1V zeners) to limit output level",
          "Positive feedback (output to pin 3 via R3) creates bistable behavior",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p24. Supply: ±5V to ±15V. Demonstrates op-amp as digital element. For REC: simple latch for alarm states, toggle between two modes. In practice, use dedicated flip-flop ICs for digital logic.",
  },

  // ──────────────────────────────────────────────────
  // Monostable Multivibrator (Op-Amp One-Shot)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-monostable",
    name: "Op-Amp Monostable Multivibrator (One-Shot)",
    description: "741 op-amp as a monostable (one-shot) pulse generator. A negative trigger pulse causes output to swing HIGH for a time approximately equal to R2 × C2. Use to divide frequency or convert irregular pulses to uniform ones.",
    category: "timer",
    blocks: [
      {
        id: "opamp-monostable-block",
        name: "Op-Amp One-Shot",
        type: "timer",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "22K", description: "Timing/feedback resistor" },
          { refDes: "R2", value: "50K", description: "Timing resistor — adjustable for pulse width" },
          { refDes: "R3", value: "10K", description: "Bias resistor" },
          { refDes: "C1", value: "0.01uF", description: "Trigger coupling capacitor" },
          { refDes: "C2", value: "0.001-1uF", description: "Timing capacitor — pulse width ≈ R2 × C2" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "TRIGGER", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "Negative trigger pulse causes output to go HIGH for t ≈ R2 × C2",
          "Divide-by-1: C2=0.001uF, R2=25K → 0.1msec pulse",
          "Divide-by-2: C2=0.01uF, R2=18.2K → 0.3msec pulse",
          "Use 555 timer for more versatile one-shot operation",
          "Supply: ±9V (±5 to ±15V)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p25. The op-amp monostable is simpler than a 555 but less versatile. For REC: pulse standardization, frequency division, trigger-to-pulse conversion. Note: Mims recommends the 555 for more versatility.",
  },

  // ──────────────────────────────────────────────────
  // Basic Comparator
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-comparator",
    name: "Op-Amp Basic Comparator (Inverting and Non-Inverting)",
    description: "741 used as a voltage comparator (no feedback resistor = open-loop mode). When Vin exceeds Vref, output switches from one rail to the other. Non-inverting: Vin > Vref → HIGH. Inverting: Vin > Vref → LOW. Drives LED through transistor.",
    category: "sensor",
    blocks: [
      {
        id: "opamp-comparator-block",
        name: "Basic Comparator",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp (or 339 dedicated comparator)" },
          { refDes: "Q1", description: "2N2222 NPN transistor — LED driver" },
          { refDes: "R1", value: "10K", description: "Vref voltage divider upper" },
          { refDes: "R2", value: "10K", description: "Vref voltage divider lower (pot for adjustable threshold)" },
          { refDes: "R3", value: "4.7K", description: "LED/transistor series resistor" },
          { refDes: "R4", value: "470", description: "LED current limit" },
          { refDes: "LED1", description: "Indicator LED" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "VREF", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "VIN", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R2", pin: "2" }] },
        ],
        designRules: [
          "Non-inverting: Vref on pin 2, Vin on pin 3 → Vin > Vref = output HIGH",
          "Inverting: Vref on pin 3, Vin on pin 2 → Vin > Vref = output LOW",
          "R1/R2 voltage divider sets Vref. With R2 as pot: adjustable threshold",
          "Example: +9V supply, R2 centered → Vref=4.5V, LED on when Vin>4.5V",
          "Output: Vout=8.2V (HIGH) or Vout=1.9V (LOW) with 741 on +9V",
          "For faster switching and open-collector output, use 339 comparator IC",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p26-27. Supply: +9V (single) or ±9V (dual). The comparator is essential for threshold detection. For REC: over-temperature alarm (thermistor vs reference), low-battery indicator, fill-level sensor, any go/no-go measurement. Dedicated 339 comparator preferred for production — faster, open-collector output.",
  },

  // ──────────────────────────────────────────────────
  // Window Comparator (1458 dual)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-window-comparator",
    name: "Op-Amp Window Comparator (1458)",
    description: "1458 dual op-amp window comparator with 3 LED indicators. Detects whether input voltage is above, within, or below a defined voltage window. Vref(HIGH) and Vref(LOW) set the window boundaries. LED1=above, LED2=within window, LED3=below.",
    category: "sensor",
    blocks: [
      {
        id: "opamp-window-block",
        name: "Window Comparator",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "1458 dual op-amp" },
          { refDes: "Q1", description: "2N2222 NPN transistor — LED driver" },
          { refDes: "R1-R3", value: "100K", description: "Voltage divider resistors — set window boundaries" },
          { refDes: "R4", value: "1K", description: "LED1 series resistor" },
          { refDes: "R5", value: "1K", description: "LED2 series resistor" },
          { refDes: "R6", value: "10K", description: "Base resistor" },
          { refDes: "R7", value: "470", description: "LED3 series resistor" },
          { refDes: "D1", description: "1N914 — OR-gate diode for LED2 drive" },
          { refDes: "D2", description: "1N914 — OR-gate diode" },
          { refDes: "LED1", description: "LED — Vin above window" },
          { refDes: "LED2", description: "LED — Vin within window" },
          { refDes: "LED3", description: "LED — Vin below window" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "VIN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "U1", pin: "6" }] },
          { name: "VREF_HIGH", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "VREF_LOW", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Vref(HIGH)=5.5V, Vref(LOW)=2.5V example: window is 2.5V to 5.5V",
          "Vin above Vref(HIGH): LED1 ON",
          "Vin within window: LED2 ON",
          "Vin below Vref(LOW): LED3 ON",
          "When Vin below 0.6V: BOTH LED1 and LED3 switch on",
          "Use R1=R2=R3=100K voltage divider chain for equal-spaced thresholds",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p28-29. Supply: +9V. Extremely useful for REC: temperature in-range indicator (green=good, red=too hot/cold), battery voltage monitor (full/ok/low), process control band detection. For grill: temperature within safe cooking range.",
  },

  // ──────────────────────────────────────────────────
  // 3-Step Sequencer
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-3step-sequencer",
    name: "Op-Amp 3-Step Sequencer",
    description: "Window comparator that supplies a 3-step sequence of output signals. Pressing S1 discharges C1 (and LED2 briefly). C1 then charges through R4, passing through 3V and 6V thresholds, lighting LEDs in sequence. Adjustable timing via R4/C1.",
    category: "timer",
    blocks: [
      {
        id: "opamp-sequencer-block",
        name: "3-Step Sequencer",
        type: "timer",
        components: [
          { refDes: "U1", description: "1458 dual op-amp as window comparator" },
          { refDes: "Q1", description: "2N2222 NPN transistor — output driver" },
          { refDes: "R1", value: "4.7K", description: "Upper threshold divider" },
          { refDes: "R2", value: "4.7K", description: "Lower threshold divider" },
          { refDes: "R4", value: "10K-1M", description: "Charge resistor — sets timing. Delay table: 10K→2s, 100K→6s, 1M→14-177s" },
          { refDes: "R5", value: "1K", description: "LED1 series" },
          { refDes: "R6", value: "1K", description: "LED2 series" },
          { refDes: "R7", value: "10K", description: "Base resistor" },
          { refDes: "R8", value: "470", description: "Output LED3" },
          { refDes: "D1", description: "1N914" },
          { refDes: "D2", description: "1N914" },
          { refDes: "C1", value: "100uF", description: "Timing capacitor" },
          { refDes: "S1", description: "Reset switch — press to start sequence" },
          { refDes: "LED1-LED3", description: "3 LEDs — sequence indicators" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Press S1 → C1 discharges → LED2 flashes briefly → LED1 on → LED2 on → LED3 on",
          "Timing set by R4 × C1",
          "Output 2 (pin 1) can drive external circuit via transistor",
          "Delay tolerance varies with C1 tolerance (electrolytics = ±20%)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p30. For pinball: sequential light effects, staged scoring display. For grill: multi-stage cooking timer with visual indicators.",
  },

  // ──────────────────────────────────────────────────
  // Bargraph Voltmeter (339 Quad Comparator)
  // ──────────────────────────────────────────────────
  {
    id: "mims-339-bargraph-voltmeter",
    name: "339 Quad Comparator Bargraph Voltmeter",
    description: "339 quad comparator drives 4 LEDs in a bargraph display. As input voltage rises, LEDs light in sequence. R1-R5 resistor ladder creates 4 threshold voltages. R1 controls sensitivity. Connect CdS cell inputs to make a light meter.",
    category: "test-equipment",
    blocks: [
      {
        id: "339-bargraph-block",
        name: "339 Bargraph Voltmeter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "339 quad comparator IC" },
          { refDes: "R1", value: "100K", description: "Sensitivity control — adjustable" },
          { refDes: "R2-R5", value: "1K", description: "Resistor ladder — creates 4 threshold levels" },
          { refDes: "R6-R9", value: "1K", description: "LED current limit resistors" },
          { refDes: "LED1-LED4", description: "4 LEDs — bargraph display" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "12" }, to: [] },
        ],
        designRules: [
          "LEDs glow in sequence as input voltage rises",
          "LEDs respond to changes in resistance at input — touch inputs with finger to observe",
          "Connect CdS cell across inputs to make light meter",
          "R1 controls overall sensitivity",
          "339 has open-collector outputs — LEDs connect from +V through resistor to output",
          "OK to use 741 op-amps instead of 339 (but 339 is more economical for 4 channels)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p31. Supply: +9V. The 339 quad comparator is the most economical approach to multi-threshold detection. For REC: battery level indicator (4-LED bargraph), temperature zone display, audio level meter, any multi-level analog indicator.",
  },

  // ──────────────────────────────────────────────────
  // Light-Activated Relay (Op-Amp)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-light-relay",
    name: "Op-Amp Light-Activated Relay (Photo + CdS versions)",
    description: "741 op-amp comparator that activates a relay when light is detected. Two versions: phototransistor input (very fast response) and CdS photoresistor input (adjustable sensitivity via R2). Reverse 741 inputs for dark-activated operation.",
    category: "relay-driver",
    blocks: [
      {
        id: "opamp-light-relay-block",
        name: "Light-Activated Relay",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp as comparator" },
          { refDes: "Q1", description: "Phototransistor (fast version) or omit for CdS version" },
          { refDes: "Q2", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "R1", value: "1M", description: "Phototransistor load / CdS photoresistor (100K)" },
          { refDes: "R2", value: "1K", description: "Feedback / sensitivity adjustment (CdS: 1M pot)" },
          { refDes: "R3", value: "47", description: "Relay coil series resistor" },
          { refDes: "R4", value: "47K", description: "CdS version bias" },
          { refDes: "K1", description: "Relay — Radio Shack 275-004 or similar" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "RELAY", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q2", pin: "C" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Phototransistor version: very fast response and recovery time",
          "CdS version: adjustable sensitivity via R2 pot",
          "Reverse 741 inputs (swap pins 2 and 3) for dark-activated operation",
          "Always use flyback diode across relay coil",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p32. Supply: +9V. For REC: dawn/dusk automated switching, optical position detection with relay output, light-triggered game events in pinball.",
  },

  // ──────────────────────────────────────────────────
  // Light/Dark-Activated Alerters
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-light-dark-alerter",
    name: "Op-Amp Light/Dark-Activated Alerter (Piezo Output)",
    description: "741 comparator with CdS photoresistor input driving a piezo buzzer via 2N2222 transistor. Light-activated version: buzzer sounds when photocell illuminated. Dark-activated: reversed inputs, buzzer sounds in dark. R2 controls sensitivity.",
    category: "alarm",
    blocks: [
      {
        id: "opamp-alerter-block",
        name: "Light/Dark Alerter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp as comparator" },
          { refDes: "Q1", description: "2N2222 NPN transistor — buzzer driver" },
          { refDes: "R1", value: "100K", description: "CdS photoresistor — light sensor" },
          { refDes: "R2", value: "100K", description: "Sensitivity adjustment" },
          { refDes: "R3", value: "10K", description: "Output/base resistor" },
          { refDes: "R4", value: "4.7K", description: "Bias" },
          { refDes: "BZ1", description: "Piezo buzzer" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "BZ1", pin: "+" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "BUZZER", from: { refDes: "BZ1", pin: "-" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }] },
        ],
        designRules: [
          "Light-activated: CdS on pin 3 (non-inv), R2 divider on pin 2",
          "Dark-activated: CdS on pin 2 (inv), R2 divider on pin 3 — identical circuit, inputs reversed",
          "R2 controls sensitivity — adjust until buzzer just turns off at desired light level",
          "R4 keeps Q1 off until 741 output goes HIGH",
          "Use as sunrise alarm, open-refrigerator-door alarm, etc.",
          "OK to replace piezo buzzer with relay (add flyback diode)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p33. Supply: +9V. For REC: open-door alarms (light detected = door open), darkness-triggered backup lighting, light-level monitoring for display brightness auto-adjust.",
  },

  // ──────────────────────────────────────────────────
  // Light-Sensitive Oscillators
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-light-oscillators",
    name: "Op-Amp Light-Sensitive Oscillators (Dual CdS)",
    description: "741 oscillator whose frequency varies with light level on a CdS photoresistor. Two CdS cells create a balanced bridge — illuminate CdS1 to increase frequency, CdS2 to decrease. Adjust R5 for balance. Drives piezo speaker or 8-ohm speaker.",
    category: "oscillator",
    blocks: [
      {
        id: "opamp-light-osc-block",
        name: "Light-Sensitive Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Timing/output resistor" },
          { refDes: "R2", value: "10K", description: "Feedback" },
          { refDes: "R3", value: "10K", description: "Bias" },
          { refDes: "R4", value: "15K", description: "CdS bias" },
          { refDes: "R5", value: "50K", description: "Balance pot" },
          { refDes: "C1", value: "1uF", description: "Timing capacitor" },
          { refDes: "CdS1", description: "CdS photoresistor — illuminate to increase frequency" },
          { refDes: "CdS2", description: "CdS photoresistor — illuminate to decrease frequency" },
          { refDes: "SPKR", description: "Piezo speaker or 8-ohm speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "Illuminate CdS1 → frequency increases",
          "Illuminate CdS2 → frequency decreases",
          "Adjust R5 for balance point between CdS cells",
          "Connect speaker or piezo across output and ground",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p34. Supply: ±9V. For REC: light-to-frequency converter for optical sensing, light-level-dependent alarm pitch, educational demonstration of analog oscillation.",
  },

  // ──────────────────────────────────────────────────
  // High-Sensitivity Light Meter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-light-meter",
    name: "Op-Amp High-Sensitivity Light Meter (Solar Cell Input)",
    description: "741 op-amp transimpedance amplifier with silicon solar cell input and 0-1mA analog meter output. Switchable sensitivity: 3 ranges via S1 (0-10uA, 0-1mA, 0-1mA). C1/C2/C3 provide AC filtering for stable readings. Laboratory-quality precision possible with good meter.",
    category: "test-equipment",
    blocks: [
      {
        id: "opamp-light-meter-block",
        name: "High-Sensitivity Light Meter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp — transimpedance configuration" },
          { refDes: "R1", value: "1M", description: "Range 1 feedback — highest sensitivity" },
          { refDes: "R2", value: "100K", description: "Range 2 feedback" },
          { refDes: "R3", value: "10K", description: "Range 3 feedback — lowest sensitivity" },
          { refDes: "R4", value: "5K", description: "Sensitivity trim pot" },
          { refDes: "R5", value: "5K", description: "Offset trim pot" },
          { refDes: "C1", value: "0.02uF", description: "Feedback filter cap — range 1" },
          { refDes: "C2", value: "0.2uF", description: "Feedback filter cap — range 2" },
          { refDes: "C3", value: "2uF", description: "Feedback filter cap — range 3" },
          { refDes: "S1", description: "3-position range switch" },
          { refDes: "SC1", description: "Silicon solar cell — light sensor" },
          { refDes: "M1", description: "0-1mA panel meter (or VOM on mA range)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "SOLAR_IN", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SC1", pin: "-" }, { refDes: "M1", pin: "-" }] },
        ],
        designRules: [
          "CAUTION: Very sensitive — too much light will slam meter needle",
          "To zero: connect pin 2 to ground, adjust R5 until meter reads 0",
          "Then disconnect pin 2 from ground — ready to measure",
          "R4 adjusts sensitivity within selected range",
          "C1-C3 filter 60Hz hum from fluorescent lights — essential for stable readings",
          "Solar cell can be replaced with photodiode for faster response",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p35. Supply: ±9V. Laboratory-quality light measurement. For REC: calibrated light intensity measurement, optical sensor characterization, quality control testing of LED outputs. The multi-range switching provides 3 decades of sensitivity.",
  },

  // ──────────────────────────────────────────────────
  // Sound-Level Meter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-sound-level-meter",
    name: "Op-Amp Sound-Level Meter",
    description: "741 op-amp amplifies electret microphone signal, 2N2222 transistor drives 0-1mA meter. R1 pot controls gain/sensitivity. Effective for measuring sound pressure levels — tested at 90dB/6.5kHz, meter deflected 1mA full scale at 2 inches.",
    category: "test-equipment",
    blocks: [
      {
        id: "opamp-spl-block",
        name: "Sound-Level Meter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp — audio amplifier" },
          { refDes: "Q1", description: "2N2222 NPN transistor — meter driver" },
          { refDes: "MIC1", description: "Electret microphone (Radio Shack 270-092 or similar)" },
          { refDes: "R1", value: "50K", description: "Gain control pot — controls sensitivity" },
          { refDes: "R2", value: "4.7K", description: "Mic bias resistor" },
          { refDes: "R3", value: "4.7K", description: "Non-inverting input bias" },
          { refDes: "R4", value: "1K", description: "Feedback" },
          { refDes: "R5", value: "1M", description: "High-value feedback for AC gain" },
          { refDes: "R6", value: "22K", description: "Meter calibration" },
          { refDes: "R7", value: "1K", description: "Base resistor" },
          { refDes: "C1", value: "0.47uF", description: "Input coupling cap" },
          { refDes: "C2", value: "0.47uF", description: "Output coupling cap" },
          { refDes: "M1", description: "0-1mA panel meter" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "M1", pin: "+" }] },
          { name: "MIC_OUT", from: { refDes: "MIC1", pin: "OUT" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "R1 controls gain — hence sensitivity of meter",
          "CAUTION: use ear protection when measuring loud sounds",
          "Can use panel meter or multimeter set to read current",
          "At max gain, normal speech at 12 inches gave 10µA fluctuating reading",
          "Piezo buzzer at 90dB/6.5kHz from 2 inches gave 0.4-1mA",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p36. Supply: +9V single supply. For REC: monitor machine noise levels, acoustic feedback detection in pinball (cabinet vibration monitoring), quality control audio testing.",
  },

  // ──────────────────────────────────────────────────
  // Sound-Activated Relay
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-sound-relay",
    name: "Op-Amp Sound-Activated Relay (Clap Switch)",
    description: "741 op-amp amplifies electret mic signal, which triggers a 555 monostable that holds a relay in for ~12 seconds. Responds to loud sounds (voice, clap, etc.). R3 and R5 control sensitivity. Bypass power supply pins of both ICs with 0.1uF.",
    category: "relay-driver",
    blocks: [
      {
        id: "opamp-sound-relay-block",
        name: "Sound-Activated Relay",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "741 op-amp — mic amplifier" },
          { refDes: "U2", eagleDevice: "NE555", description: "555 timer — monostable, holds relay for timed period" },
          { refDes: "Q1", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "MIC1", description: "Electret microphone" },
          { refDes: "R1", value: "4.7K", description: "Mic bias" },
          { refDes: "R2", value: "4.7K", description: "Op-amp bias" },
          { refDes: "R3", value: "1M", description: "Sensitivity control" },
          { refDes: "R4", value: "1K", description: "Coupling resistor" },
          { refDes: "R5", value: "1M", description: "555 timing resistor" },
          { refDes: "C1", value: "0.47uF", description: "Mic coupling cap" },
          { refDes: "C2", value: "0.47uF", description: "Op-amp coupling" },
          { refDes: "C3", value: "10uF", description: "555 timing cap — 10uF gives ~12sec hold" },
          { refDes: "C4", value: "0.01uF", description: "555 bypass" },
          { refDes: "K1", description: "Relay — 275-004 or similar" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "1" }] },
        ],
        designRules: [
          "R5 and C3 control relay hold time: t = 1.1 × R5 × C3 ≈ 12 seconds",
          "R3 controls sensitivity — reduce R3 to reduce sensitivity",
          "IMPORTANT: bypass power supply pins of both 741 and 555 with 0.1µF caps",
          "Loud sound → 741 amplifies → triggers 555 → relay pulls in for ~12 seconds",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p37. Supply: +9V. Classic clap-switch circuit. For pinball: sound-activated game effects, voice-controlled features. For general: hands-free light switch, acoustic trigger for remote devices. The 741+555 combination is very common — 741 for analog conditioning, 555 for timed digital output.",
  },

  // ──────────────────────────────────────────────────
  // Percussion Synthesizer
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-percussion-synth",
    name: "Op-Amp Percussion Synthesizer (1458 + 386)",
    description: "1458 dual op-amp oscillator producing percussion sounds (bell, drum) at a rate controlled by R1. D1 shapes the amplitude envelope. 386 audio amplifier drives speaker. R2-R4 control pitch. C2-C5 and R5 control volume and tone.",
    category: "audio",
    blocks: [
      {
        id: "opamp-percussion-block",
        name: "Percussion Synthesizer",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "1458 dual op-amp — oscillator + envelope shaper" },
          { refDes: "U2", description: "386 audio power amplifier — speaker driver" },
          { refDes: "R1", value: "1M", description: "Rate control — sets percussion repeat rate" },
          { refDes: "R2", value: "1M", description: "Pitch control" },
          { refDes: "R3", value: "1M", description: "Pitch fine adjust" },
          { refDes: "R4", value: "1M", description: "Pitch vernier" },
          { refDes: "R5", value: "10K", description: "Volume control" },
          { refDes: "R6", value: "1.5K", description: "Bias" },
          { refDes: "R7", value: "1K", description: "Manual trigger — remove R7 and ground pin 1 for manual mode" },
          { refDes: "R8", value: "100K", description: "386 gain set" },
          { refDes: "D1", description: "1N914 — envelope shaping diode" },
          { refDes: "C1", value: "2.2uF", description: "Rate timing cap" },
          { refDes: "C2-C4", value: "0.001uF", description: "Pitch/tone filter caps" },
          { refDes: "C5", value: "0.1uF", description: "Output coupling" },
          { refDes: "C6", value: "100uF", description: "Speaker coupling cap" },
          { refDes: "C7", value: "100uF", description: "386 output cap" },
          { refDes: "SPKR", description: "8 ohm speaker" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "-6V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U2", pin: "4" }, to: [] },
        ],
        designRules: [
          "Set R1, R2, R3 to center positions, then adjust R1 until 2-3 clicks/sec from speaker",
          "Now adjust R3 until speaker emits a tone",
          "Back off R3 until tone just stops — R2 and R4 now control pitch",
          "Bell and drum sounds can be produced depending on settings",
          "R5 controls volume. CAUTION: protect ears — keep sound level low",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p38-39. Supply: ±6V. A creative sound synthesis circuit. For pinball: electronic percussion for score events, attract-mode rhythmic patterns. The envelope-shaped oscillation produces more natural-sounding percussion than a simple 555 tone.",
  },

  // ──────────────────────────────────────────────────
  // Sallen-Key High-Pass Filter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-highpass-filter",
    name: "Op-Amp Sallen-Key High-Pass Filter (2nd Order)",
    description: "Second-order active high-pass filter with -12dB/octave rolloff below cutoff. Equal-component Sallen-Key topology — identical to the low-pass but with R1/R2 and C1/C2 interchanged. fc = 1/(2π×R×C).",
    category: "filter",
    blocks: [
      {
        id: "opamp-hpf-block",
        name: "Sallen-Key High-Pass Filter",
        type: "filter",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "4.7K", description: "Equal-value resistor (R1=R2=R)" },
          { refDes: "R2", value: "4.7K", description: "Equal-value resistor" },
          { refDes: "R3", value: "33K", description: "Non-inverting bias — should be ~0.586 × R4" },
          { refDes: "R4", value: "56K", description: "Feedback resistor — gain = R4/R3 ≈ 1.59" },
          { refDes: "C1", value: "0.01uF", description: "Equal-value capacitor (C1=C2=C)" },
          { refDes: "C2", value: "0.01uF", description: "Equal-value capacitor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "C1_OUT", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "C2", pin: "1" }, { refDes: "R1", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "U1", pin: "3" }, { refDes: "R2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R4", pin: "2" }] },
          { name: "FEEDBACK", from: { refDes: "R4", pin: "1" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "GND", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R3", pin: "2" }] },
        ],
        designRules: [
          "fc = 1/(2π × R × C). With R=4.7K, C=0.01uF: fc = 3,386 Hz (calc), 3,000 Hz (measured)",
          "Gain at passband: R4/R3 ≈ 1.59 (about 1.59×)",
          "R3 should be ≈ 0.586 × R4 for Butterworth (maximally flat) response",
          "-12dB/octave rolloff below cutoff (second-order)",
          "Identical topology to low-pass but R and C positions swapped",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p41. Supply: ±5V to ±15V. For REC: remove DC offset and low-frequency noise from sensor signals, audio bass cut filter, anti-hum filter for audio circuits. Pair with the Sallen-Key LPF for bandpass behavior.",
  },

  // ──────────────────────────────────────────────────
  // 60-Hz Notch Filters (Wien Bridge + Twin Tee)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-60hz-notch",
    name: "Op-Amp 60-Hz Notch Filters (Wien Bridge + Twin Tee)",
    description: "Two 60-Hz notch filter topologies for removing power line hum. Wien Bridge uses 5 equal-value resistors and 2 equal-value caps. Twin Tee uses R1=R2=2×R3 and C1=C2=C3/2. Both null the 60Hz component while passing other frequencies.",
    category: "filter",
    blocks: [
      {
        id: "opamp-notch-wien-block",
        name: "Wien Bridge 60Hz Notch",
        type: "filter",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1-R5", value: "27K", description: "All 5 resistors equal: R1=R2=R3=R4=R5=27K" },
          { refDes: "C1", value: "0.1uF", description: "Equal-value caps: C1=C2=0.1uF" },
          { refDes: "C2", value: "0.1uF", description: "Equal-value caps" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "f₀ = 1/(2π × R × C). With R=27K, C=0.1uF: f₀ = 59 Hz (≈60 Hz)",
          "Both Wien Bridge and Twin Tee provide deep null at 60Hz",
          "Graph shows both filters have similar response — near zero output at 60Hz",
          "Wien Bridge: simpler (equal-value components), Twin Tee: deeper notch",
          "1-volt peak-to-peak sine wave input test: output drops to near 0 at 60Hz",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p42. Supply: ±V dual. Essential for removing 60Hz power line hum from analog signals. For REC: clean up thermocouple readings near mains wiring, remove hum from audio circuits, improve accuracy of analog sensor measurements in electrically noisy environments. Use these filters to block power line interference from sensitive analog front-ends.",
  },

  // ──────────────────────────────────────────────────
  // Tunable Bandpass Filter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-tunable-bandpass",
    name: "Op-Amp Tunable Bandpass Filter",
    description: "741 active bandpass filter tunable by adjusting R2. Passes a narrow frequency band between a few hundred Hz and ~3kHz. Use to detect presence of a specific tone in a signal. Shows measured response curves for 3 R2 values.",
    category: "filter",
    blocks: [
      {
        id: "opamp-bandpass-block",
        name: "Tunable Bandpass Filter",
        type: "filter",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1.5K", description: "Input resistor" },
          { refDes: "R2", value: "1K-5K", description: "Tuning resistor — variable pot to tune center frequency" },
          { refDes: "R3", value: "100K", description: "Feedback upper" },
          { refDes: "R4", value: "220K", description: "Feedback lower" },
          { refDes: "C1", value: "0.01uF", description: "Input cap" },
          { refDes: "C2", value: "0.01uF", description: "Feedback cap" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "R2=930 ohm → f₀ = 1kHz; R2=350 → f₀ = 1.5kHz; R2=130 → f₀ = 2kHz",
          "Adjust R2 to tune center frequency — lower R2 = higher frequency",
          "Bandwidth is a few hundred Hz — narrow enough to detect specific tones",
          "Use 1-volt sine wave input for testing response",
          "Peak output at center frequency is ~5-7V (high gain at resonance)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p43. Supply: ±V dual. For REC: DTMF tone detection, selective frequency measurement, audio spectrum analysis channel, or narrow-band noise filter. Pair multiple filters at different frequencies for a spectrum analyzer or color organ.",
  },

  // ──────────────────────────────────────────────────
  // Mini-Color Organ (3-channel)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-color-organ",
    name: "Op-Amp Mini-Color Organ (3-Channel Audio-to-Light)",
    description: "Three active filters (low/mid/high) using 1458 dual op-amps split audio input into 3 frequency bands, each driving an LED. Low=yellow, Mid=red, High=green. Input from radio/tape player through audio transformer. R2 controls overall gain.",
    category: "audio",
    blocks: [
      {
        id: "opamp-color-organ-block",
        name: "3-Channel Color Organ",
        type: "filter",
        components: [
          { refDes: "U1", description: "1458 dual op-amp — input buffer + low channel" },
          { refDes: "U2", description: "1458 dual op-amp — mid + high channels" },
          { refDes: "R1", value: "10K", description: "Input from transformer" },
          { refDes: "R2", value: "100K", description: "Gain control" },
          { refDes: "R3", value: "1K", description: "Buffer output" },
          { refDes: "R4-R12", description: "Channel filter and LED resistors — various values per channel" },
          { refDes: "C1", value: "10uF", description: "Input coupling" },
          { refDes: "C2-C5", description: "Filter capacitors — set channel crossover frequencies" },
          { refDes: "T1", description: "Audio transformer — Radio Shack 273-1380, matches speaker impedance to circuit" },
          { refDes: "LED1", description: "Yellow LED — LOW frequencies" },
          { refDes: "LED2", description: "Red LED — MID frequencies" },
          { refDes: "LED3", description: "Green LED — HIGH frequencies" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "8" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "4" }] },
        ],
        designRules: [
          "Input via audio transformer — phone plug into tape/radio headphone jack",
          "R2 adjusts overall LED intensity (gain of input amplifier)",
          "LED brightness graph: Yellow(low) peaks at ~10-100Hz, Red(mid) at ~100-1000Hz, Green(high) at ~1000-10000Hz",
          "Reduce R4 and R7 to increase red and yellow LED brightness",
          "Increase R11 to increase green LED brightness",
          "Insert phone plug part-way in jack so speaker is not switched off",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p44-45. Supply: ±9V. Classic audio visualization circuit. For pinball: music-reactive lighting effects, attract-mode audio visualization, per-channel sound-to-light for different game events. The 3-channel filter bank is also the basis for audio spectrum analyzers and crossover networks.",
  },

  // ──────────────────────────────────────────────────
  // Square Wave Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-square-wave",
    name: "Op-Amp Square Wave Generator (Relaxation Oscillator)",
    description: "741 op-amp relaxation oscillator generates adjustable square waves. C1 charges/discharges through R1-R3, with positive feedback through R4-R7 setting the hysteresis. R2 adjusts duty cycle symmetry. Frequency table from 24Hz to 11,480Hz.",
    category: "oscillator",
    blocks: [
      {
        id: "opamp-square-block",
        name: "Square Wave Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "10K", description: "Timing resistor" },
          { refDes: "R2", value: "10K", description: "Symmetry adjust (pot) — controls duty cycle" },
          { refDes: "R3", value: "10K", description: "Timing resistor" },
          { refDes: "R4", value: "1K", description: "Positive feedback — sets hysteresis" },
          { refDes: "R5", value: "100K", description: "Positive feedback" },
          { refDes: "R6", value: "1K", description: "Positive feedback" },
          { refDes: "R7", value: "1M", description: "Positive feedback — adjustable for frequency fine-tune" },
          { refDes: "C1", value: "0.1uF", description: "Timing capacitor — select per frequency table" },
          { refDes: "C2", value: "0.1uF", description: "Output coupling cap" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "1" }] },
        ],
        designRules: [
          "Frequency table (R1-R3 replaced by 4.7K from pin 3 to +V, 4.7K to ground): C1=0.001→11,480Hz; 0.0047→3,848; 0.01→2,155; 0.047→462; 0.1→227; 0.47→45; 1.0→24Hz",
          "When R2 is at center position, pulses are symmetrical (50% duty cycle)",
          "OK to connect R2 directly to +V and eliminate R1 and R3",
          "Add follower stage to buffer output if driving other circuits",
          "Supply: +5V to +15V dual supply (+V = ±12V shown)",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p46. The op-amp square wave generator is simpler than a 555 for basic oscillation but less versatile. For REC: clock source for digital circuits, test signal generator, audio tone source. Frequency can be varied over a wide range by changing C1.",
  },

  // ──────────────────────────────────────────────────
  // Sine Wave Oscillator (Twin-Tee)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-sine-oscillator",
    name: "Op-Amp Sine Wave Oscillator (Twin-Tee Feedback)",
    description: "741 op-amp with twin-tee RC network in feedback loop generates clean sine wave output. R3=R4 and C1=C2=C3=C4 form the frequency-selective network. f = 1/(2π×R×C). Adjust R5 until circuit just oscillates for cleanest sine wave.",
    category: "oscillator",
    blocks: [
      {
        id: "opamp-sine-block",
        name: "Sine Wave Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "741 op-amp" },
          { refDes: "R1", value: "1K", description: "Input bias" },
          { refDes: "R2", value: "10K", description: "Feedback" },
          { refDes: "R3", description: "Twin-tee resistor — R3=R4 (matched pair)" },
          { refDes: "R4", description: "Twin-tee resistor — R3=R4" },
          { refDes: "R5", value: "100K", description: "Amplitude adjust pot — critical: adjust until circuit JUST oscillates" },
          { refDes: "C1-C4", value: "0.01uF", description: "Twin-tee capacitors — all equal, C1=C2=C3=C4" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "6" }, to: [] },
        ],
        designRules: [
          "f = 1/(2π × R × C) where R=R3=R4 and C=C1=C2=C3=C4",
          "R3=R4=4.7K, C=0.01uF → f = 2,926 Hz; R3=R4=10K → f = 1,356 Hz; R3=R4=1.5K → f = 927 Hz",
          "Adjust R5 until circuit JUST oscillates — too much gain = distorted/clipped output",
          "Twin-tee network provides frequency-selective positive feedback",
          "Output is a clean sine wave when properly adjusted",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p47. Supply: ±9V. Clean sine wave generation without complex Wien bridge. For REC: test signal source, audio reference tone, carrier for modulation. The twin-tee is less common than Wien bridge but produces a very clean sine at a single frequency.",
  },

  // ──────────────────────────────────────────────────
  // Function Generator (Square + Triangle + Sine)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opamp-function-generator",
    name: "Op-Amp Function Generator (Square + Triangle + Sine)",
    description: "1458 dual op-amp function generator producing simultaneous square wave, triangle wave, and sine wave outputs. First op-amp is a square wave oscillator, second integrates the square wave into a triangle. The same twin-tee network converts triangle to sine. Rate controlled by R9 pot.",
    category: "oscillator",
    blocks: [
      {
        id: "opamp-funcgen-block",
        name: "Function Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "1458 dual op-amp — square wave oscillator + integrator" },
          { refDes: "U2", description: "1458 dual op-amp — sine wave shaper + buffer" },
          { refDes: "R1", value: "27K", description: "Square wave timing" },
          { refDes: "R2", value: "10K", description: "Square wave feedback" },
          { refDes: "R3", value: "100K", description: "Integrator input" },
          { refDes: "R4", value: "10K", description: "Integrator feedback" },
          { refDes: "R5", value: "100K", description: "Integrator bias" },
          { refDes: "R6", value: "100K", description: "Sine shaper" },
          { refDes: "R7", value: "10K", description: "Sine shaper feedback" },
          { refDes: "R8", value: "10K", description: "Sine shaper" },
          { refDes: "R9", value: "100K", description: "Rate control pot — varies frequency" },
          { refDes: "R10", value: "100K", description: "Output buffer" },
          { refDes: "R11", value: "27K", description: "Amplitude adjust" },
          { refDes: "C1", value: "0.001uF", description: "Square wave timing cap" },
          { refDes: "C2", value: "0.1uF", description: "Integrator cap" },
          { refDes: "C3", value: "0.01uF", description: "Sine shaper coupling" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "8" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "4" }] },
          { name: "SQUARE_OUT", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "TRIANGLE_OUT", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "SINE_OUT", from: { refDes: "U2", pin: "1" }, to: [] },
        ],
        designRules: [
          "Circuit operates at ~1kHz as shown — use 1M pot for R9 to vary rate, increase C3 for slower",
          "Three simultaneous outputs: square wave (pin 1), triangle wave (pin 7), sine wave (U2 pin 1)",
          "First half of U1 = square wave oscillator (relaxation oscillator)",
          "Second half of U1 = integrator (converts square to triangle)",
          "U2 = twin-tee sine shaper (converts triangle to sine) + output buffer",
          "Adjust R5 for cleanest sine output — should just oscillate",
        ],
      },
    ],
    notes: "From Forrest Mims Op Amp IC Circuits p47-48. Supply: ±9V. A complete 3-output function generator from 2 cheap ICs. For REC: bench test signal source, audio waveform generator, waveform demonstration. The function generator is the most complex and capable circuit in this book — it combines oscillator, integrator, and filter techniques.",
  },

  // ══════════════════════════════════════════════════
  // Mims Optoelectronics Circuits — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // AC/DC Polarity Indicator
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-polarity-indicator",
    name: "AC/DC Polarity Indicator",
    description: "Two anti-parallel LEDs indicate DC polarity or AC presence. On DC: one LED lights for positive, the other for negative. On AC: both LEDs appear lit (alternating at line frequency).",
    category: "test-equipment",
    blocks: [
      {
        id: "polarity-indicator-block",
        name: "Anti-Parallel LED Pair",
        type: "led-driver",
        components: [
          { refDes: "R1", value: "220", description: "Current-limiting resistor — select for LED current at expected voltage" },
          { refDes: "LED1", description: "LED 1 — lights on positive polarity" },
          { refDes: "LED2", description: "LED 2 — lights on negative polarity (anti-parallel to LED1)" },
        ],
        nets: [
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "LED_NODE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }, { refDes: "LED2", pin: "K" }] },
          { name: "GND", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "LED2", pin: "A" }] },
        ],
        designRules: [
          "Rs = (Vin - Vled) / Iled — calculate for each polarity",
          "Use different color LEDs (e.g. red=positive, green=negative) for easy identification",
          "On AC: both LEDs alternate at line frequency — appears as both lit",
        ],
      },
    ],
    designRules: [
      "Each LED is reverse-biased when the other conducts — the conducting LED clamps reverse voltage to ~Vf",
      "For AC mains testing: use appropriate high-voltage Rs and rated LEDs",
    ],
    notes: "From Mims Optoelectronics Circuits p12. Simple but effective for quick polarity checks. For REC: useful on test jigs, power input connectors, and battery-powered products. A red/green pair instantly shows if power is connected correctly.",
  },

  // ──────────────────────────────────────────────────
  // Voltage-Level Indicator (LED + Zener)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-voltage-level-indicator",
    name: "Voltage-Level Indicator (LED + Zener)",
    description: "LED glows only when input voltage exceeds the zener diode's breakdown voltage. Simple go/no-go voltage monitor.",
    category: "test-equipment",
    blocks: [
      {
        id: "voltage-indicator-block",
        name: "Zener Threshold LED",
        type: "led-driver",
        components: [
          { refDes: "R1", value: "220", description: "Current-limiting resistor for LED" },
          { refDes: "D1", description: "Zener diode — sets voltage threshold (e.g. 5.1V, 9.1V, 12V)" },
          { refDes: "LED1", description: "Indicator LED — lights when V > Vz + Vled" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "ZENER_LED", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "K" }] },
          { name: "LED_ANODE", from: { refDes: "D1", pin: "A" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "GND", from: { refDes: "LED1", pin: "K" }, to: [] },
        ],
        designRules: [
          "LED turns on when Vin > Vz + Vled (typically Vz + 1.7V for red LED)",
          "Rs = (Vin - Vz - Vled) / Iled",
          "Choose zener voltage slightly below the threshold you want to indicate",
        ],
      },
    ],
    designRules: [
      "Can chain multiple stages with different zener values for a bargraph-style display",
      "Zener must be reverse-biased — cathode toward positive input",
    ],
    notes: "From Mims Optoelectronics Circuits p12. For REC: add to power supplies as 'power good' indicator, or use multiple stages for battery level display. Pinball: indicate when a supply rail is within operating range.",
  },

  // ──────────────────────────────────────────────────
  // Tri-Color LED Driver
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-tricolor-led",
    name: "Tri-Color LED Driver",
    description: "Drives a bi-color (red/green) LED package where the two chips are connected in reverse-parallel. Applying +V gives red, -V gives green, AC gives yellow (both lit). Separate current-limiting resistors for each color.",
    category: "led",
    blocks: [
      {
        id: "tricolor-driver-block",
        name: "Bi-Color LED Driver",
        type: "led-driver",
        components: [
          { refDes: "R1", value: "120", description: "Red LED current limiter — RT = R1 + R2" },
          { refDes: "R2", value: "30", description: "Additional resistance for red (RT = 150Ω at 5V, 20mA)" },
          { refDes: "D1", description: "1N914 silicon diode — compensates for green LED higher Vf" },
          { refDes: "LED1", description: "Bi-color LED (red/green reverse-parallel in same package)" },
        ],
        nets: [
          { name: "INPUT+", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "RED_PATH", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "LED_NODE", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "LED1", pin: "1" }] },
          { name: "GND", from: { refDes: "LED1", pin: "2" }, to: [] },
        ],
        designRules: [
          "RT (red path) = (+/-V - VR) / IR where VR ≈ 2V (red LED forward voltage)",
          "R1 (green path) = (+/-V - (VG + VD)) / IG where VG ≈ 2V, VD ≈ 0.6V",
          "D1 compensates for the ~0.6V difference between red and green Vf",
          "Example at 5V, 20mA: RT = (5 - 2) / 0.02 = 150Ω, R1 = (5 - 2.6) / 0.02 = 120Ω",
        ],
      },
    ],
    designRules: [
      "+V → Red, -V → Green, AC → Yellow (both alternating)",
      "For DC applications: use SPDT switch or H-bridge to select color",
    ],
    notes: "From Mims Optoelectronics Circuits p13. For REC: bi-color LEDs are perfect for status indicators — red=fault, green=OK, yellow=warning. Pinball: playfield inserts that change color based on game state.",
  },

  // ──────────────────────────────────────────────────
  // LM3909 LED Flasher
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-lm3909-flasher",
    name: "LM3909 LED Flasher",
    description: "Ultra-low-power LED flasher using the LM3909 IC. Drives an LED from as little as 1.5V (single cell). Flash rate controlled by external capacitor and switch. The IC boosts voltage above the supply to forward-bias the LED even when supply < Vled.",
    category: "flasher",
    blocks: [
      {
        id: "lm3909-flasher-block",
        name: "LM3909 Flasher Circuit",
        type: "led-driver",
        components: [
          { refDes: "U1", description: "LM3909 LED flasher/oscillator IC — DIP-8" },
          { refDes: "C1", value: "47uF", description: "Timing capacitor — larger = slower flash rate" },
          { refDes: "LED1", description: "Red LED — cathode to pin 6, anode to pin 2" },
          { refDes: "S1", description: "SPST switch — open = 2 Hz, closed = 5.5 Hz flash rate" },
        ],
        nets: [
          { name: "+V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "TIMING", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "LED_K", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "LED1", pin: "K" }] },
          { name: "LED_A", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "RATE", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "S1", pin: "1" }] },
        ],
        designRules: [
          "Supply: 1.5V (single cell) — IC boosts voltage to drive LED",
          "Pin 5 = V+, Pin 4 = GND, Pin 1 = timing cap, Pin 2 = LED anode, Pin 6 = LED cathode",
          "S1 between pins 8 and 5: open = ~2 Hz, closed = ~5.5 Hz",
          "Works with supply as low as 1.1V — ideal for battery-powered indicators",
          "Current draw: ~0.5mA average — single AA cell lasts months",
        ],
      },
    ],
    designRules: [
      "LED must be connected between pins 2 and 6 (not to ground)",
      "Up to 60 LEDs can be flashed by cascading with flasher LEDs (COX21)",
      "Can drive standard LED even though supply is below Vled",
    ],
    notes: "From Mims Optoelectronics Circuits p16. The LM3909 is a dedicated LED flasher IC that works from a single 1.5V cell. For REC: ultra-low-power status indicators, battery-powered warning flashers, equipment 'heartbeat' LEDs. Pinball: coin door indicator that runs for months on a single cell. Note: LM3909 is discontinued but available from surplus suppliers and has direct clones.",
  },

  // ──────────────────────────────────────────────────
  // Power Flasher (Relay-Driven)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-power-flasher",
    name: "Power Flasher (Relay-Driven)",
    description: "A flasher LED controls a transistor that drives a relay, allowing high-power loads (lamps, solenoids) to flash at the LED's built-in rate. The flasher LED provides the timing; the relay handles the power.",
    category: "flasher",
    blocks: [
      {
        id: "power-flasher-block",
        name: "Flasher LED + Relay Driver",
        type: "led-driver",
        components: [
          { refDes: "LED1", description: "Flasher LED — built-in IC flashes 2-4 Hz" },
          { refDes: "Q1", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V (use separate supply for load)" },
          { refDes: "B1", description: "6V battery for relay/lamp supply" },
          { refDes: "LAMP", description: "6V lamp — load driven by relay contacts" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "LED1", pin: "A" }, to: [] },
          { name: "FLASH_DRIVE", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY_COIL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Use separate power supplies for flasher circuit and lamp load",
          "Do not exceed relay contact current rating",
          "Add flyback diode across relay coil (1N4148 or 1N4001)",
          "LED flasher rate is fixed by internal IC — not adjustable",
        ],
      },
    ],
    designRules: [
      "CAUTION: Do not use with line-powered lamps — relay contacts may arc",
      "For higher current loads, use a power MOSFET instead of relay",
    ],
    notes: "From Mims Optoelectronics Circuits p15. Clever use of a flasher LED as a timing source for power loads. For REC: flash warning lamps, strobe indicators, or high-power LEDs at a fixed rate without a 555 or MCU. Pinball: flash incandescent playfield inserts using cheap flasher LEDs as the clock source.",
  },

  // ──────────────────────────────────────────────────
  // Neon Lamp Flasher (555 + Step-Up Transformer)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-neon-flasher",
    name: "Neon Lamp Flasher (555 + Step-Up Transformer)",
    description: "555 astable oscillator drives a miniature step-up transformer (6.3V to 120V) to flash a neon lamp from a 9V supply. The 555 output charges C2 through D1, and the transformer steps up the voltage to fire the neon lamp.",
    category: "flasher",
    blocks: [
      {
        id: "neon-flasher-block",
        name: "555 Neon Driver",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "555 timer IC — astable oscillator" },
          { refDes: "T1", description: "Miniature transformer — 6.3V primary, 120V secondary (center tap)" },
          { refDes: "D1", description: "1N914 silicon diode — rectifier for charge pump" },
          { refDes: "R1", value: "47K", description: "555 timing resistor (pin 7 to +V)" },
          { refDes: "R2", value: "1K", description: "555 timing resistor (pin 7 to pin 6)" },
          { refDes: "R3", value: "470K", description: "Neon lamp current limiter" },
          { refDes: "R4", value: "1M", description: "Neon lamp bias resistor" },
          { refDes: "C1", value: "0.01uF", description: "555 timing capacitor" },
          { refDes: "C2", value: "0.1uF 250V", description: "High-voltage charge capacitor" },
          { refDes: "C3", value: "0.047uF 150V", description: "Neon lamp coupling capacitor" },
          { refDes: "NE1", description: "Neon lamp (NE-2 or similar)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U1", pin: "8" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
        ],
        designRules: [
          "CAUTION: Do not touch output leads from T1 — 120V+ present",
          "T1 is wired backwards: 6.3V winding is primary, 120V winding is secondary",
          "C2 and C3 must be rated for high voltage (250V and 150V minimum)",
          "Neon lamps fire at ~65-70V and extinguish at ~55V",
        ],
      },
    ],
    designRules: [
      "Supply: +9V",
      "Keep high-voltage components well separated on PCB",
    ],
    notes: "From Mims Optoelectronics Circuits p17. Demonstrates voltage step-up using a small transformer driven by a 555. For REC: neon indicators for high-voltage presence, novelty displays. The step-up transformer technique is also used in EL wire drivers and cold-cathode displays.",
  },

  // ──────────────────────────────────────────────────
  // Simple Light Meters (3 variants)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-simple-light-meters",
    name: "Simple Light Meters",
    description: "Three simple light meter circuits using different sensors: CdS photoresistor, solar cell, or phototransistor. Each drives a 0-1mA analog meter directly through a load resistor. Very sensitive despite simplicity.",
    category: "sensor",
    blocks: [
      {
        id: "light-meter-photoresistor",
        name: "Photoresistor Light Meter",
        type: "sensor-interface",
        components: [
          { refDes: "PC1", description: "CdS photoresistor — resistance drops with light" },
          { refDes: "R1", value: "100K", description: "Series resistor — limits meter current" },
          { refDes: "M1", description: "0-1mA analog panel meter" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "PC1", pin: "1" }, to: [] },
          { name: "METER", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "METER_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "M1", pin: "-" }, to: [] },
        ],
        designRules: [
          "Avoid rapid increases in light intensity — may damage meter",
          "OK to try other battery voltages — increase R1 if meter pegs",
        ],
      },
      {
        id: "light-meter-solar-cell",
        name: "Solar Cell Light Meter",
        type: "sensor-interface",
        components: [
          { refDes: "SC1", description: "Silicon solar cell — generates current proportional to light" },
          { refDes: "R1", value: "1K", description: "Series resistor — limits meter current" },
          { refDes: "M1", description: "0-1mA analog panel meter" },
        ],
        nets: [
          { name: "SOLAR+", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "METER", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "M1", pin: "-" }, to: [{ refDes: "SC1", pin: "-" }] },
        ],
        designRules: [
          "No battery required — solar cell generates its own current",
          "Two or more solar cells in parallel increase sensitivity",
        ],
      },
      {
        id: "light-meter-phototransistor",
        name: "Phototransistor Light Meter",
        type: "sensor-interface",
        components: [
          { refDes: "Q1", description: "Phototransistor — base-collector junction forms photodiode" },
          { refDes: "R1", value: "1K", description: "Series resistor — limits meter current" },
          { refDes: "M1", description: "0-1mA analog panel meter" },
        ],
        nets: [
          { name: "PHOTOTRANSISTOR+", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "METER", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "M1", pin: "-" }, to: [{ refDes: "Q1", pin: "E" }] },
        ],
        designRules: [
          "No battery required — phototransistor base-collector junction acts as photodiode/solar cell",
          "Base lead is unused — leave disconnected",
        ],
      },
    ],
    designRules: [
      "All three variants are very sensitive — start with meter in dim light",
      "For MCU integration: replace meter with ADC input through voltage divider",
    ],
    notes: "From Mims Optoelectronics Circuits p22. Three ways to measure light with minimal components. The solar cell and phototransistor versions need no battery at all. For REC: quick bench light measurements, sensor testing, ambient light monitoring. Pinball: calibrate opto sensor sensitivity during assembly.",
  },

  // ──────────────────────────────────────────────────
  // Ultra-Sensitive Light Meter (741 Op-Amp)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-ultra-sensitive-light-meter",
    name: "Ultra-Sensitive Light Meter (741 Op-Amp, 5-Range)",
    description: "741 op-amp amplifies solar cell photocurrent across 5 decades of sensitivity (0.01µA to 100µA full scale) selected by a rotary switch with RC filter networks. Drives 0-1mA meter.",
    category: "sensor",
    blocks: [
      {
        id: "sensitive-meter-block",
        name: "Op-Amp Light Meter",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "741 op-amp — transimpedance configuration" },
          { refDes: "SC1", description: "Silicon solar cell — photocurrent source" },
          { refDes: "S1", description: "5-position rotary switch — range selector" },
          { refDes: "R1", value: "5K", description: "Zero adjust pot — set meter to 0 with solar cell dark" },
          { refDes: "R2", value: "10K", description: "Gain adjust pot — set for full-scale calibration" },
          { refDes: "M1", description: "0-1mA analog panel meter" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "SOLAR_INPUT", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "U1", pin: "2" }] },
        ],
        designRules: [
          "Range switch selects feedback RC network: 0.002µF/10M, 0.02µF/1M, 0.2µF/100K, 2.2µF/10K, 22µF/1K",
          "Full-scale readings per range: 1=100µA, 2=10µA, 3=1µA, 4=0.1µA, 5=0.01µA",
          "ALWAYS set S1 to position 1 (least sensitive) before switching on",
          "CAUTION: Excessive light will 'slam' the meter needle — protect it",
          "R1 zeros the meter, R2 calibrates full-scale reading",
          "Supply: ±9V (two 9V batteries)",
        ],
      },
    ],
    designRules: [
      "Keep battery leads short to prevent oscillation",
      "Solar cell photocurrent is proportional to light intensity — very linear",
    ],
    notes: "From Mims Optoelectronics Circuits p23. Extremely sensitive — can detect starlight on the most sensitive range. For REC: precision light measurements for opto sensor calibration, quality control of LED brightness, ambient light logging. The 5-decade range makes it versatile from bright sunlight to near-darkness.",
  },

  // ──────────────────────────────────────────────────
  // Solar Battery Charger
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-solar-battery-charger",
    name: "Solar Battery Charger",
    description: "Array of solar cells charges NiCd storage cells through a blocking diode. The diode prevents cells from discharging through the solar array during darkness.",
    category: "power-supply",
    blocks: [
      {
        id: "solar-charger-block",
        name: "Solar Array + Blocking Diode",
        type: "power-supply",
        components: [
          { refDes: "SC1", description: "Solar cell array — 9 cells in series for 2x NiCd charging" },
          { refDes: "D1", description: "1N914 blocking diode — prevents discharge through solar cells in dark" },
          { refDes: "B1", description: "NiCd rechargeable cells (2 in series = 2.4V nominal)" },
        ],
        nets: [
          { name: "SOLAR+", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "CHARGE", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "B1", pin: "+" }] },
          { name: "GND", from: { refDes: "B1", pin: "-" }, to: [{ refDes: "SC1", pin: "-" }] },
        ],
        designRules: [
          "Solar cell current must NOT exceed safe charging rate of NiCd cells",
          "Output voltage of solar array must exceed battery voltage + diode drop",
          "Single silicon solar cell: 0.45V open-circuit — series cells add voltages",
          "9 cells in series ≈ 4V — enough to charge 2 NiCd cells (2.4V + margin)",
          "Use Schottky diode (1N5819) to reduce voltage drop from 0.6V to 0.3V",
        ],
      },
    ],
    designRules: [
      "Mount solar cells with silicone sealant — they are fragile",
      "Connect solar cells with wrapping wire — solder carefully with low heat",
    ],
    notes: "From Mims Optoelectronics Circuits p24. Basic solar charging circuit. For REC: solar-powered outdoor sensors, remote monitoring stations, emergency backup power. The blocking diode is essential — without it, batteries discharge through solar cells at night.",
  },

  // ──────────────────────────────────────────────────
  // Sun-Powered Oscillator (LM3909)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-sun-powered-oscillator",
    name: "Sun-Powered Oscillator (LM3909)",
    description: "LM3909 oscillator powered directly by a solar cell. No battery needed. Drives an 8Ω speaker with an audible tone that increases in pitch and volume with light intensity.",
    category: "oscillator",
    blocks: [
      {
        id: "sun-oscillator-block",
        name: "Solar LM3909 Audio",
        type: "oscillator",
        components: [
          { refDes: "SC1", description: "Silicon solar cell — power source" },
          { refDes: "U1", description: "LM3909 LED flasher/oscillator IC" },
          { refDes: "R1", value: "10K", description: "Frequency adjust resistor" },
          { refDes: "R2", value: "100", description: "Output coupling resistor" },
          { refDes: "SPKR", description: "8Ω miniature speaker" },
        ],
        nets: [
          { name: "SOLAR+", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "U1", pin: "5" }] },
          { name: "GND", from: { refDes: "SC1", pin: "-" }, to: [{ refDes: "U1", pin: "4" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SPEAKER", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "SPKR", pin: "1" }] },
        ],
        designRules: [
          "No battery — runs entirely from solar cell",
          "Tone pitch and volume increase with light intensity",
          "LM3909 operates from as low as 1.1V",
        ],
      },
    ],
    designRules: [
      "Use in sunlight or bright artificial light for best results",
    ],
    notes: "From Mims Optoelectronics Circuits p25. A solar-powered audio oscillator — makes sound only when illuminated. For REC: solar-powered alarms, light-to-sound demonstration, novelty projects. Could be adapted as an audible light meter.",
  },

  // ──────────────────────────────────────────────────
  // Light-Sensitive Oscillators (Transistor + LM3909)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-light-sensitive-oscillators",
    name: "Light-Sensitive Oscillators",
    description: "Audible light probes — tone frequency changes with light intensity. Three versions: single-transistor (simplest), LM3909 with speaker, and LM3909 with piezo. Sometimes called 'audible light probes' — detect candle flame from 100+ feet.",
    category: "sensor",
    blocks: [
      {
        id: "light-osc-transistor",
        name: "Transistor Light Oscillator",
        type: "oscillator",
        components: [
          { refDes: "Q1", description: "2N2907 PNP transistor — oscillator" },
          { refDes: "PC1", description: "CdS photoresistor — light sensor (controls frequency)" },
          { refDes: "R1", value: "1K", description: "Collector resistor" },
          { refDes: "R3", value: "1K", description: "Base bias resistor" },
          { refDes: "SPKR", description: "Piezo buzzer element — audio output" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R3", pin: "1" }, to: [] },
          { name: "BASE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "SPKR", pin: "1" }] },
          { name: "COLLECTOR", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "SENSOR", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "PC1", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "PC1", pin: "2" }] },
        ],
        designRules: [
          "Tone frequency increases with light intensity",
          "Oscillation stops in darkness — adjustable via component values",
          "Can detect candle flame from 100+ feet away",
        ],
      },
      {
        id: "light-osc-lm3909",
        name: "LM3909 Light Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "LM3909 — oscillator/flasher IC" },
          { refDes: "PC1", description: "CdS photoresistor — connected to pin 2 (frequency control)" },
          { refDes: "Q2", description: "2N2222 NPN transistor — speaker driver (for louder output)" },
          { refDes: "R2", value: "100K", description: "Pull-down resistor" },
          { refDes: "SPKR", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "SENSOR", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "PC1", pin: "1" }] },
        ],
        designRules: [
          "Two variants: with and without transistor buffer for speaker",
          "Supply: +1.5V (LM3909 only) or +9V (with Q2 buffer)",
          "Tone frequency increases with light intensity",
        ],
      },
    ],
    designRules: [
      "All variants: tone pitch proportional to light level",
      "Install in small enclosure with pinhole aperture for directional sensing",
    ],
    notes: "From Mims Optoelectronics Circuits p26. Audible light probes are extremely useful for aligning opto sensors — you can hear the signal strength without looking at a meter. For REC: alignment tool for pinball opto switches during assembly. Sweep the probe across the IR beam to find the optimal position by ear.",
  },

  // ──────────────────────────────────────────────────
  // 555 Light-Controlled VCO
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-555-light-vco",
    name: "555 Light-Controlled VCO",
    description: "555 astable oscillator with a CdS photoresistor as the timing element. Tone frequency changes with light intensity. Two operating modes depending on photocell placement: frequency increases or decreases with light.",
    category: "oscillator",
    blocks: [
      {
        id: "light-vco-block",
        name: "555 Photocell Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "555 timer IC — astable mode" },
          { refDes: "PC1", description: "CdS photoresistor — light-dependent timing element" },
          { refDes: "R1", value: "10K", description: "Fixed timing resistor" },
          { refDes: "R2", value: "100K", description: "Base frequency adjust" },
          { refDes: "R3", value: "1K", description: "Discharge path resistor" },
          { refDes: "C1", value: "0.01uF", description: "Timing capacitor — increase for lower frequency" },
          { refDes: "SPKR", description: "Piezo buzzer or 8Ω speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SPKR", pin: "1" }] },
        ],
        designRules: [
          "Mode 1: PC replaces R1 → frequency increases with light",
          "Mode 2: Exchange R1 and PC positions → frequency decreases with light",
          "Adjust base frequency via R2",
          "Increase C1 to reduce frequency range",
          "Supply: +9V",
        ],
      },
    ],
    designRules: [
      "The 555 basic oscillator (p27) uses the same circuit without the photocell",
      "Can substitute phototransistor for CdS cell for faster response",
    ],
    notes: "From Mims Optoelectronics Circuits p27. Combines the 555 astable with light sensing. For REC: audible light level indicator, solar tracker feedback, light-to-frequency converter for MCU input (measure frequency with timer capture). Pinball: playfield ambient light sensor with audible feedback for setup.",
  },

  // ──────────────────────────────────────────────────
  // Light/Dark-Activated Relays (4 variants)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-light-dark-relays",
    name: "Light/Dark-Activated Relays (Transistor)",
    description: "Four relay driver circuits activated by light or darkness, using either CdS photoresistors or phototransistors. Simpler than op-amp versions — just sensor + transistor + relay. Two trigger on light, two trigger on darkness.",
    category: "sensor",
    blocks: [
      {
        id: "light-relay-cds",
        name: "Light-Activated Relay (CdS)",
        type: "sensor-interface",
        components: [
          { refDes: "PC1", description: "CdS photoresistor — resistance drops in light" },
          { refDes: "Q1", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "R1", value: "1K", description: "Base bias resistor (adjust for sensitivity)" },
          { refDes: "R2", value: "4.7K", description: "Base-emitter pull-down" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "PC1", pin: "1" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "SENSOR", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "R2", pin: "1" }] },
          { name: "RELAY", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "RY1", pin: "2" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R2", pin: "2" }] },
        ],
        designRules: [
          "Light strikes PC1 → resistance drops → Q1 base current flows → relay pulls in",
          "Adjust R1 to change sensitivity threshold",
          "Photoresistors have slow response — relay stays briefly after light removed",
          "Add flyback diode across relay coil",
        ],
      },
      {
        id: "dark-relay-cds",
        name: "Dark-Activated Relay (CdS)",
        type: "sensor-interface",
        components: [
          { refDes: "PC1", description: "CdS photoresistor — resistance increases in dark" },
          { refDes: "Q1", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "R1", value: "100K", description: "Pull-up / sensitivity adjust" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "SENSOR_GND", from: { refDes: "PC1", pin: "1" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "RY1", pin: "2" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "PC1", pin: "2" }] },
        ],
        designRules: [
          "CdS between base and ground: dark = high R = Q1 turns ON (pulled up by R1)",
          "Adjust R1 to change darkness threshold",
          "Relay actuates when photoresistor is dark",
        ],
      },
      {
        id: "light-relay-phototransistor",
        name: "Light-Activated Relay (Phototransistor)",
        type: "sensor-interface",
        components: [
          { refDes: "Q1", description: "Phototransistor — light sensor" },
          { refDes: "Q2", description: "2N2222 NPN transistor — relay driver (amplifies phototransistor current)" },
          { refDes: "R1", value: "100K", description: "Phototransistor load / sensitivity adjust" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "SENSOR", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "Q2", pin: "B" }] },
          { name: "RELAY", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "RY1", pin: "2" }] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "Responds much faster than CdS version",
          "Adjust R1 to change sensitivity — higher R1 = more sensitive",
          "Use light shield around phototransistor to prevent false triggering",
        ],
      },
      {
        id: "dark-relay-phototransistor",
        name: "Dark-Activated Relay (Phototransistor)",
        type: "sensor-interface",
        components: [
          { refDes: "Q1", description: "Phototransistor — light sensor (directly drives relay when dark)" },
          { refDes: "R1", value: "100K", description: "Pull-up resistor to +V — provides base drive when Q1 is dark" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "BASE_DRIVE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "RELAY", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "RY1", pin: "2" }] },
          { name: "GND", from: { refDes: "Q1", pin: "C" }, to: [] },
        ],
        designRules: [
          "Phototransistor is wired so relay activates when Q1 is dark (no light)",
          "Adjust R1 to change darkness sensitivity",
          "Faster response than CdS version",
        ],
      },
    ],
    designRules: [
      "All variants: add flyback diode (1N4148) across relay coil",
      "Supply: +9V",
      "Use light shields on sensors to prevent false triggering from ambient light",
    ],
    notes: "From Mims Optoelectronics Circuits p28-29. Four basic light/dark relay circuits — simpler than the op-amp versions but less precise threshold control. For REC: automatic lighting control, dusk/dawn switches, light-triggered events. Pinball: auto-dim playfield lights based on room lighting, or light-triggered features.",
  },

  // ──────────────────────────────────────────────────
  // Dark-Activated LED Flashers (LM3909)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-dark-activated-flashers",
    name: "Dark-Activated LED Flashers (LM3909)",
    description: "LM3909-based LED flashers that activate only in darkness. CdS photoresistor or phototransistor controls the LM3909 power. Two variants: CdS version flashes when dark, phototransistor version flashes when dark.",
    category: "flasher",
    blocks: [
      {
        id: "dark-flasher-cds",
        name: "CdS Dark Flasher",
        type: "led-driver",
        components: [
          { refDes: "U1", description: "LM3909 LED flasher IC" },
          { refDes: "PC1", description: "CdS photoresistor — controls power to LM3909" },
          { refDes: "C1", value: "22uF", description: "Timing capacitor" },
          { refDes: "LED1", description: "Red LED" },
        ],
        nets: [
          { name: "+1.5V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "LED flashes when CdS photoresistor is dark (high resistance)",
          "More light-sensitive than phototransistor version",
          "Supply: 1.5V (single cell)",
        ],
      },
      {
        id: "dark-flasher-phototransistor",
        name: "Phototransistor Dark Flasher",
        type: "led-driver",
        components: [
          { refDes: "U1", description: "LM3909 LED flasher IC" },
          { refDes: "Q1", description: "Phototransistor — controls LM3909 operation" },
          { refDes: "C1", value: "22uF", description: "Timing capacitor" },
          { refDes: "LED1", description: "Red LED" },
        ],
        nets: [
          { name: "+1.5V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "LED flashes when phototransistor Q1 is in darkness",
          "Faster response than CdS version",
        ],
      },
    ],
    designRules: [
      "Both run from 1.5V — single cell lasts months",
      "Flasher LED variant: use photoresistor or phototransistor to switch flasher LED on/off with transistor buffer",
    ],
    notes: "From Mims Optoelectronics Circuits p30. LED flashers that only operate in darkness — great for nighttime warning markers, dusk-activated indicators, or energy-saving status LEDs. For REC: power indicators that only flash when room lights are off (saves battery). Pinball: coin door 'attract mode' flasher.",
  },

  // ──────────────────────────────────────────────────
  // Light/Dark-Activated Alerter
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-light-dark-alerter",
    name: "Light/Dark-Activated Alerter",
    description: "Piezo buzzer sounds when light condition changes. SPDT switch selects light-activated (position L) or dark-activated (position D) mode. Uses CdS photoresistor and single transistor. Can detect opening of cash drawers, refrigerator doors, etc.",
    category: "alarm",
    blocks: [
      {
        id: "alerter-block",
        name: "Photo-Activated Buzzer",
        type: "sensor-interface",
        components: [
          { refDes: "PC1", description: "CdS photoresistor — light sensor" },
          { refDes: "Q1", description: "2N2222 NPN transistor — buzzer driver" },
          { refDes: "S1", description: "SPDT switch — L=light-activated, D=dark-activated" },
          { refDes: "R1", value: "1K", description: "Base/collector resistor" },
          { refDes: "BZ1", description: "Piezo buzzer — self-oscillating type" },
        ],
        nets: [
          { name: "+6V_TO_9V", from: { refDes: "BZ1", pin: "+" }, to: [] },
          { name: "BUZZER_DRIVE", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "BZ1", pin: "-" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "S1 position L: buzzer sounds when light strikes PC1",
          "S1 position D: buzzer sounds when PC1 is in darkness",
          "Supply: +6V to +9V",
          "Place PC1 where light change occurs (drawer, door, etc.)",
        ],
      },
    ],
    designRules: [
      "Use self-oscillating piezo buzzer — no external oscillator needed",
      "Can substitute phototransistor for faster response",
    ],
    notes: "From Mims Optoelectronics Circuits p31. Simple security/monitoring circuit. For REC: enclosure tamper detection (light enters when opened), refrigerator door alarm, equipment cabinet monitoring. Pinball: detect when coin door is opened during play.",
  },

  // ──────────────────────────────────────────────────
  // Light-Activated Tone Generator (LM3909)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-light-activated-tone",
    name: "Light-Activated Tone Generator (LM3909)",
    description: "LM3909 drives a speaker with a tone whose frequency depends on the CdS photoresistor. Higher light = higher tone frequency. Runs from 1.5V. R1 gives high-frequency tone when present, omit R1 for lower frequency.",
    category: "sensor",
    blocks: [
      {
        id: "light-tone-block",
        name: "LM3909 Photo-Tone",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "LM3909 — oscillator IC" },
          { refDes: "PC1", description: "CdS photoresistor — controls oscillation frequency" },
          { refDes: "R1", value: "1M", description: "Optional — increases base frequency (omit for lower tone)" },
          { refDes: "R2", value: "100", description: "Speaker coupling resistor" },
          { refDes: "SPKR", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+1.5V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "R1 present: high-frequency tone that varies with light",
          "R1 omitted: lower frequency tone",
          "Supply: +1.5V",
        ],
      },
    ],
    designRules: [
      "Good for audible alignment of optical sensors",
    ],
    notes: "From Mims Optoelectronics Circuits p31. Another audible light probe variant using the LM3909. For REC: sensor alignment aid — listen for the tone to peak while positioning IR LEDs and phototransistors during PCB assembly.",
  },

  // ──────────────────────────────────────────────────
  // Lightwave Tone Transmitters (555 + LM3909)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-lightwave-tone-tx",
    name: "Lightwave Tone Transmitters",
    description: "Two IR LED tone transmitters for testing lightwave receivers and remote control. The 555 version gives higher power output at 9V. The LM3909 version runs from 1.5V-3V and is ultra-compact.",
    category: "communication",
    blocks: [
      {
        id: "tone-tx-555",
        name: "555 IR Tone Transmitter",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "555 timer IC — astable mode" },
          { refDes: "R1", value: "100K", description: "Pulse rate control" },
          { refDes: "R2", value: "10K", description: "Timing resistor" },
          { refDes: "R3", value: "220", description: "IR LED current limiter" },
          { refDes: "R4", value: "5K", description: "Fine frequency adjust pot" },
          { refDes: "C1", value: "0.01uF", description: "Timing capacitor" },
          { refDes: "LED1", description: "IR LED — use high-output near-infrared type for best range" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R4", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        designRules: [
          "R1 controls pulse rate, R2/C1 set frequency",
          "Duty cycle ~50% for best LED output",
          "Use IR-emitting diode for best results (invisible to eye)",
          "Supply: +9V",
        ],
      },
      {
        id: "tone-tx-lm3909",
        name: "LM3909 IR Transmitter",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "LM3909 — low-voltage oscillator IC" },
          { refDes: "R1", value: "100K", description: "Frequency adjust" },
          { refDes: "C1", value: "2.2uF", description: "Timing capacitor" },
          { refDes: "D1", description: "1N914 — omit if using red LED instead of IR" },
          { refDes: "LED1", description: "IR LED — use infrared-emitting diode for best results" },
        ],
        nets: [
          { name: "+1.5V_TO_3V", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Omit D1 if using red LED instead of IR",
          "Supply: 1.5V to 3V",
          "Lower power than 555 version but ultra-compact and low-current",
        ],
      },
    ],
    designRules: [
      "Both transmitters can be used with the break-beam receiver or lightwave receivers",
      "Use with lens to collimate beam for longer range",
    ],
    notes: "From Mims Optoelectronics Circuits p34. Two approaches to IR transmission — the 555 for power/range, the LM3909 for size/battery life. For REC: test IR receivers during development, prototype remote control links, verify opto sensor alignment at distance.",
  },

  // ──────────────────────────────────────────────────
  // Two-Transistor Lightwave Receiver
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-two-transistor-receiver",
    name: "Two-Transistor Lightwave Receiver",
    description: "Simple lightwave receiver using a phototransistor sensor and a 2-transistor amplifier driving a piezo buzzer. Can monitor tone or voice lightwave transmitters. Compact enough to fit in a small plastic box.",
    category: "communication",
    blocks: [
      {
        id: "two-transistor-rx-block",
        name: "Phototransistor + 2-Stage Amp",
        type: "amplifier",
        components: [
          { refDes: "Q1", description: "Phototransistor — IR light detector" },
          { refDes: "Q2", description: "2N2222 NPN transistor — amplifier/driver" },
          { refDes: "R1", value: "47K", description: "Phototransistor load resistor" },
          { refDes: "R2", value: "4.7K", description: "First stage collector resistor" },
          { refDes: "R3", value: "4.7K", description: "Coupling/bias resistor" },
          { refDes: "R4", value: "22K", description: "Second stage bias resistor" },
          { refDes: "C1", value: "0.1uF", description: "AC coupling capacitor" },
          { refDes: "BZ1", description: "Piezo buzzer element (not self-oscillating)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "SENSOR_OUT", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "COUPLING", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "AMP_BASE", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R3", pin: "1" }, { refDes: "Q2", pin: "B" }] },
          { name: "OUTPUT", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "R4", pin: "2" }, { refDes: "BZ1", pin: "+" }] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "BZ1", pin: "-" }] },
        ],
        designRules: [
          "Shield phototransistor from ambient light with collimator tube",
          "For speaker output: replace piezo with 1K:8Ω audio transformer + 8Ω speaker",
          "Supply: +9V",
          "Adjust R1 for sensitivity — higher R = more sensitive but slower",
        ],
      },
    ],
    designRules: [
      "Can receive tone, voice, or data-modulated light signals",
      "Use IR filter over phototransistor to reject visible ambient light",
    ],
    notes: "From Mims Optoelectronics Circuits p35. Minimal-component lightwave receiver. For REC: test and verify IR communication links, prototype wireless optical data links, receive signals from lightwave transmitters. Pinball: could receive IR remote control signals for game setup/testing.",
  },

  // ──────────────────────────────────────────────────
  // Photophone (Voice over Sunlight)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-photophone",
    name: "Photophone (Voice over Reflected Sunlight)",
    description: "Recreates Alexander Graham Bell's 1880 photophone experiment. Transmitter: voice vibrates aluminum foil reflector, modulating reflected sunlight. Receiver: solar cell + 741 op-amp + 386 audio amplifier. No batteries needed on transmitter side.",
    category: "communication",
    blocks: [
      {
        id: "photophone-tx",
        name: "Photophone Transmitter",
        type: "communication",
        components: [
          { refDes: "REFLECTOR", description: "Aluminum foil or aluminized mylar stretched over tin can/tube (open both ends)" },
        ],
        nets: [],
        designRules: [
          "Stretch foil TIGHT over one end of tube — tape or rubber band",
          "Shiny side faces outward toward receiver",
          "Speak into open end — voice vibrates foil, modulating reflected sunlight",
          "Aim reflected sunlight spot at receiver's solar cell",
          "Mount on photographer's tripod for best results",
          "CAUTION: Wear dark sunglasses — avoid staring at reflected sunlight",
        ],
      },
      {
        id: "photophone-rx",
        name: "Photophone Receiver",
        type: "amplifier",
        components: [
          { refDes: "SC1", description: "Silicon solar cell — detects modulated sunlight" },
          { refDes: "U1", description: "741 op-amp — first gain stage (R1 = gain control)" },
          { refDes: "U2", description: "386 audio power amplifier — drives speaker (R2 = volume)" },
          { refDes: "C1", value: "0.1uF", description: "Solar cell to op-amp coupling capacitor" },
          { refDes: "C2", value: "0.1uF", description: "Op-amp to 386 coupling / oscillation prevention" },
          { refDes: "C3", value: "100uF", description: "386 output coupling capacitor" },
          { refDes: "R1", value: "1M", description: "741 gain control (feedback resistor)" },
          { refDes: "R2", value: "10K", description: "Volume control pot" },
          { refDes: "SPKR", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "2" }] },
          { name: "SOLAR_IN", from: { refDes: "SC1", pin: "+" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "OPAMP_IN", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "3" }] },
        ],
        designRules: [
          "Use light shield around solar cell — only reflected beam should reach it",
          "C2 prevents oscillation — keep battery leads short",
          "Speaker may produce VERY loud sounds — don't place close to ear",
          "R1 controls gain, R2 controls volume",
          "Supply: +9V",
        ],
      },
    ],
    designRules: [
      "Both operator and receiver must wear dark sunglasses",
      "Best in direct sunlight — won't work indoors or on cloudy days",
      "To use phototransistor instead of solar cell, see p39",
    ],
    notes: "From Mims Optoelectronics Circuits p36-37. Bell's photophone (1880) was the world's first wireless voice communication. This version uses modern components but the same principle. For REC: educational demonstration, science fair project. The 741 + 386 amplifier chain is reusable for any high-gain audio amplification.",
  },

  // ──────────────────────────────────────────────────
  // AM Lightwave Transmitter (741 Op-Amp)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-am-lightwave-tx",
    name: "AM Lightwave Transmitter (741 Op-Amp)",
    description: "Voice-modulated IR LED transmitter using a 741 op-amp. Microphone signal is amplified by the 741, which modulates the LED brightness (amplitude modulation). Range: up to 1,000 feet at night with lens. Can also drive optical fiber.",
    category: "communication",
    blocks: [
      {
        id: "am-lightwave-tx-block",
        name: "741 AM Modulator + IR LED",
        type: "amplifier",
        components: [
          { refDes: "MIC", description: "Crystal microphone or electret unit (connect red lead to +9V)" },
          { refDes: "U1", description: "741 op-amp — amplifies microphone signal" },
          { refDes: "Q1", description: "2N2222 NPN transistor — LED modulator/driver" },
          { refDes: "R1", value: "50K", description: "Gain control pot" },
          { refDes: "R2", value: "1M", description: "Op-amp feedback resistor" },
          { refDes: "R3", value: "5.6K", description: "Inverting input bias" },
          { refDes: "R4", value: "5.6K", description: "Non-inverting input bias" },
          { refDes: "R5", value: "50K", description: "LED bias pot — adjust for best sound quality" },
          { refDes: "R6", value: "50K", description: "LED DC bias pot" },
          { refDes: "R7", value: "1K", description: "LED current limiter" },
          { refDes: "R8", value: "220", description: "LED maximum current limiter" },
          { refDes: "C1", value: "0.1uF", description: "Mic coupling capacitor" },
          { refDes: "C2", value: "10uF", description: "741 to transistor coupling capacitor" },
          { refDes: "LED1", description: "High-output IR LED — or high-brightness red LED" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "R5 = LED bias control — adjust for best sound quality",
          "R6 = LED DC operating point — set so LED has slight glow",
          "R8 limits maximum LED current — do not reduce below 220Ω",
          "Use high-output IR LED for best free-space range",
          "For optical fiber: aim LED directly into fiber end",
          "Range: up to 1,000 feet at night with collimating lens",
          "Supply: +9V",
        ],
      },
    ],
    designRules: [
      "Pair with AM Lightwave Receiver for full audio communication link",
      "Use lens to collimate LED beam for longer range",
    ],
    notes: "From Mims Optoelectronics Circuits p38. A proper AM optical transmitter using 741 op-amp modulation — much better quality than the simple 555 tone transmitter. For REC: prototype secure optical communication links, fiber optic audio systems. The 741 + transistor modulator pattern is reusable for any analog LED modulation application.",
  },

  // ──────────────────────────────────────────────────
  // AM Lightwave Receiver (741 + 386)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-am-lightwave-rx",
    name: "AM Lightwave Receiver (741 + 386)",
    description: "Receives AM-modulated lightwave signals. Phototransistor detects modulated IR light, 741 op-amp provides gain, 386 audio amplifier drives speaker. Works best in subdued light or at night for free-space links.",
    category: "communication",
    blocks: [
      {
        id: "am-lightwave-rx-block",
        name: "Phototransistor + 741 + 386 Receiver",
        type: "amplifier",
        components: [
          { refDes: "Q1", description: "Phototransistor — IR light detector" },
          { refDes: "U1", description: "741 op-amp — first gain stage" },
          { refDes: "U2", description: "386 audio power amplifier — speaker driver" },
          { refDes: "R1", value: "100K", description: "Phototransistor load resistor" },
          { refDes: "R2", value: "100K", description: "741 gain control pot" },
          { refDes: "R3", value: "10K", description: "386 volume control pot" },
          { refDes: "C1", value: "0.1uF", description: "Phototransistor to 741 coupling capacitor" },
          { refDes: "C2", value: "0.1uF", description: "741 to 386 coupling / oscillation prevention" },
          { refDes: "C3", value: "100uF", description: "386 output coupling capacitor" },
          { refDes: "SPKR", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "U1", pin: "7" }, { refDes: "U2", pin: "6" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "2" }] },
          { name: "SENSOR", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "COUPLING", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "C1", pin: "1" }] },
        ],
        designRules: [
          "Shield phototransistor from ambient light — use collimator tube",
          "Use IR filter (developed color film) over phototransistor unless TX emits visible light",
          "CAUTION: Can produce LOUD sounds — don't place speaker close to ear",
          "C2 prevents oscillation — keep battery leads short",
          "R2 = gain control, R3 = volume control",
          "Supply: +9V",
          "For more range: add lens in front of phototransistor, use 2N2907 + second phototransistor",
        ],
      },
    ],
    designRules: [
      "Pair with AM Lightwave Transmitter for full duplex-capable optical link",
      "Works best in subdued light or at night",
    ],
    notes: "From Mims Optoelectronics Circuits p39. The receiver half of the AM lightwave communication system. The 741 + 386 amplifier chain provides very high gain. For REC: optical communication receiver, fiber optic audio receiver. The dual-IC amplifier pattern (preamp + power amp) is standard for any high-gain audio application.",
  },

  // ──────────────────────────────────────────────────
  // Break-Beam Detection System (Pulsed IR)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-break-beam-system",
    name: "Break-Beam Detection System (Pulsed IR + 1458 + 555)",
    description: "High-sensitivity pulsed IR break-beam detector. Transmitter: 2-transistor multivibrator generates 240 pulses/sec of 400µsec IR pulses at 400mA peak. Receiver: phototransistor + 1458 dual op-amp + 555 missing-pulse detector + relay + LED indicator. Much better noise immunity than DC opto sensors.",
    category: "alarm",
    blocks: [
      {
        id: "break-beam-tx",
        name: "Pulsed IR Transmitter",
        type: "oscillator",
        components: [
          { refDes: "Q1", description: "2N2907 PNP transistor — oscillator" },
          { refDes: "Q2", description: "2N2222 NPN transistor — LED driver (400mA pulse)" },
          { refDes: "R1", value: "22K", description: "Timing resistor" },
          { refDes: "R2", value: "2.2M", description: "Timing resistor" },
          { refDes: "C1", value: "0.02uF", description: "Timing capacitor (optional lens coupling)" },
          { refDes: "LED1", description: "High-output IR LED — pulsed at 400mA peak" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "Generates ~240 pulses/sec, each ~400µsec duration",
          "Peak LED current: 400mA — much brighter than DC drive",
          "Average current is low — good battery life",
          "Use optional lens to collimate beam for longer range",
          "C1: OK to use two 0.01µF capacitors in parallel",
          "Supply: +6V",
        ],
      },
      {
        id: "break-beam-rx",
        name: "Pulsed IR Receiver + Missing Pulse Detector",
        type: "sensor-interface",
        components: [
          { refDes: "Q1", description: "Phototransistor — IR pulse detector (use light shield)" },
          { refDes: "U1", description: "1458 dual op-amp — amplifies and conditions phototransistor signal" },
          { refDes: "U2", description: "555 timer — missing pulse detector mode" },
          { refDes: "R1", value: "1M", description: "1458 first stage gain" },
          { refDes: "R2", value: "100K", description: "1458 second stage gain" },
          { refDes: "R3", value: "10K", description: "Threshold adjust pot" },
          { refDes: "R4", value: "4.7K", description: "555 timing resistor" },
          { refDes: "R5", value: "1M", description: "555 timing resistor" },
          { refDes: "RS", value: "1K", description: "LED current limiter" },
          { refDes: "C1", value: "0.01uF", description: "Phototransistor coupling capacitor" },
          { refDes: "C2", value: "0.1uF", description: "1458 interstage coupling" },
          { refDes: "C3", value: "0.1uF", description: "1458 to 555 coupling" },
          { refDes: "C4", value: "0.01uF", description: "555 timing capacitor" },
          { refDes: "C5", value: "10uF", description: "555 output filter" },
          { refDes: "D1", description: "1N914 — relay flyback diode" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
          { refDes: "LED1", description: "Indicator LED — lights when beam intact" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "1" }] },
        ],
        designRules: [
          "Shield Q1 from ambient light — use collimator tube painted flat black inside",
          "Adjust R3 to set threshold — optimum relay operation",
          "RS limits LED indicator current",
          "Test circuit in subdued light to avoid false triggering",
          "IMPORTANT: Battery must be fresh — erratic operation if low",
          "If erratic: connect relay to separate +9V supply (arrow on schematic)",
          "For more range: add lens at Q1, use 2N2907 + second phototransistor at Q1",
          "Supply: +9V (receiver)",
        ],
      },
    ],
    designRules: [
      "Range without lenses: several feet. With lenses: much greater",
      "Pulsed operation provides excellent ambient light rejection",
      "The 555 missing-pulse detector latches relay when beam is interrupted",
    ],
    notes: "From Mims Optoelectronics Circuits p40-41. The most sophisticated break-beam system in the book. Pulsed IR gives much better noise immunity than DC — essential for reliable operation in varying ambient light. For REC: this is the pattern for high-reliability pinball opto sensors. The pulsed TX + AC-coupled amplifier + missing-pulse detector chain rejects DC ambient light completely. Pinball: use for long-range ball detection across playfield, ramp entry/exit detection in bright environments.",
  },

  // ──────────────────────────────────────────────────
  // Optoelectronic Logic Gates
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-logic-gates",
    name: "Optoelectronic Logic Gates",
    description: "Logic gate functions implemented with LEDs and light sensors (CdS photoresistors or phototransistors). Buffer (YES), inverter (NOT), AND, and OR gates. Can be used independently, with optoisolators, or as computing elements.",
    category: "logic",
    blocks: [
      {
        id: "opto-buffer",
        name: "Opto Buffer (YES Gate)",
        type: "logic",
        components: [
          { refDes: "R1", value: "220", description: "LED current limiter / output pull-up" },
          { refDes: "LED1", description: "Input LED" },
          { refDes: "PC1", description: "CdS photoresistor or phototransistor — sensor" },
          { refDes: "LED2", description: "Output LED — follows input state" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "PC1", pin: "1" }] },
          { name: "OUT_LED", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "LED2", pin: "A" }] },
          { name: "GND", from: { refDes: "LED2", pin: "K" }, to: [] },
        ],
        designRules: [
          "Input HIGH → LED1 on → sensor illuminated → output HIGH",
          "Input LOW → LED1 off → sensor dark → output LOW",
          "Truth table: IN=L→OUT=L, IN=H→OUT=H",
        ],
      },
      {
        id: "opto-inverter",
        name: "Opto Inverter (NOT Gate)",
        type: "logic",
        components: [
          { refDes: "R1", value: "220", description: "Pull-up resistor" },
          { refDes: "LED1", description: "Input LED" },
          { refDes: "PC1", description: "CdS photoresistor or phototransistor" },
          { refDes: "LED2", description: "Output LED — inverted from input" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R1", pin: "1" }, to: [] },
        ],
        designRules: [
          "Sensor wired so output is inverted from input",
          "Input HIGH → LED1 on → sensor pulls output LOW",
          "Input LOW → LED1 off → sensor dark → output pulled HIGH",
          "Truth table: IN=L→OUT=H, IN=H→OUT=L",
        ],
      },
      {
        id: "opto-and-gate",
        name: "Opto AND Gate",
        type: "logic",
        components: [
          { refDes: "R1", value: "47", description: "Pull-up resistor (lower value for AND = series)" },
          { refDes: "LED_A", description: "Input A LED" },
          { refDes: "LED_B", description: "Input B LED" },
          { refDes: "PC_A", description: "Sensor A — CdS or phototransistor" },
          { refDes: "PC_B", description: "Sensor B — CdS or phototransistor" },
          { refDes: "LED_OUT", description: "Output LED" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R1", pin: "1" }, to: [] },
        ],
        designRules: [
          "Both sensors in SERIES — both must be illuminated for output HIGH",
          "Truth table: A=L,B=L→L | A=L,B=H→L | A=H,B=L→L | A=H,B=H→H",
          "Use CdS cells or phototransistors — same truth table either way",
        ],
      },
      {
        id: "opto-or-gate",
        name: "Opto OR Gate",
        type: "logic",
        components: [
          { refDes: "R1", value: "220", description: "Pull-up resistor" },
          { refDes: "LED_A", description: "Input A LED" },
          { refDes: "LED_B", description: "Input B LED" },
          { refDes: "PC_A", description: "Sensor A — CdS or phototransistor" },
          { refDes: "PC_B", description: "Sensor B — CdS or phototransistor" },
          { refDes: "LED_OUT", description: "Output LED" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "R1", pin: "1" }, to: [] },
        ],
        designRules: [
          "Both sensors in PARALLEL — either illuminated gives output HIGH",
          "Truth table: A=L,B=L→L | A=L,B=H→H | A=H,B=L→H | A=H,B=H→H",
        ],
      },
    ],
    designRules: [
      "All gates: +5V supply, R1 values depend on sensor type",
      "CdS cells: R1 = 47-220Ω. Phototransistors: R1 = 220Ω",
      "Completely galvanically isolated — no electrical connection between input and output",
      "Can be combined to build more complex logic (NAND, NOR, XOR)",
    ],
    notes: "From Mims Optoelectronics Circuits p42-43. Logic gates using light — completely isolated inputs and outputs. For REC: useful concept for understanding optocoupler-based logic. The AND (series) and OR (parallel) patterns apply directly to optocoupler arrays. Pinball: isolated logic for high-voltage switch sensing without direct electrical connection to game logic.",
  },

  // ──────────────────────────────────────────────────
  // Optocoupler Level Shifters and Isolators
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-level-shifters",
    name: "Optocoupler Level Shifters and Isolators",
    description: "Optocoupler circuits for voltage level shifting and galvanic isolation between different logic families and voltage domains. Basic isolator, TTL-to-TTL, TTL-to-CMOS, and boosted output versions.",
    category: "optocoupler",
    blocks: [
      {
        id: "basic-isolator",
        name: "Basic Optocoupler Isolator",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "Optocoupler (4N35 or similar — LED + phototransistor)" },
          { refDes: "R1", value: "220-1K", description: "Input LED current limiter (Vcc1 side)" },
          { refDes: "R2", value: "4.7K", description: "Output pull-up resistor (Vcc2 side)" },
          { refDes: "R3", value: "1K", description: "Output load resistor (optional)" },
        ],
        nets: [
          { name: "VCC1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INPUT", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "VCC2", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "5" }] },
        ],
        designRules: [
          "Vcc1 = input side supply (+5V), Vcc2 = output side supply (+5V to +12V)",
          "Complete galvanic isolation between input and output sides",
          "Output is INVERTED from input (input HIGH → LED on → output LOW)",
          "R1 = (Vcc1 - Vled) / Iled — typically 220Ω for 5V/15mA",
        ],
      },
      {
        id: "ttl-to-ttl-isolator",
        name: "TTL-to-TTL Isolator",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "Optocoupler (4N35 or similar)" },
          { refDes: "R1", value: "220", description: "Input LED current limiter" },
          { refDes: "R2", value: "4.7K", description: "Output pull-up to Vcc2" },
        ],
        nets: [
          { name: "VCC1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VCC2", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "TTL_IN", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "TTL_OUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "5" }] },
        ],
        designRules: [
          "Vcc1 = +5V (input TTL), Vcc2 = +5V (output TTL) — may be different supplies",
          "R1 = 220Ω (standard), R2 = 4.7K pull-up",
          "Output is inverted — add second stage or inverting gate if non-inverted output needed",
          "1K resistor between output and Vcc2 for faster switching (optional)",
        ],
      },
      {
        id: "ttl-to-cmos-isolator",
        name: "TTL-to-CMOS Coupler/Isolator",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "Optocoupler (4N35 or similar)" },
          { refDes: "R1", value: "220-1K", description: "Input LED current limiter (TTL side)" },
          { refDes: "R2", value: "4.7K", description: "Output pull-up to VDD (CMOS side)" },
          { refDes: "R3", value: "1K", description: "Phototransistor emitter resistor (typical — adjusts drive)" },
        ],
        nets: [
          { name: "VCC_TTL", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VDD_CMOS", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "TTL_IN", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "CMOS_OUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "5" }] },
        ],
        designRules: [
          "Vcc (TTL) = +5V, VDD (CMOS) = +5V to +15V",
          "Level shifts AND isolates between voltage domains",
          "R3 in emitter sets switching threshold — typical 1K",
          "For higher VDD: increase R2 proportionally",
        ],
      },
      {
        id: "opto-booster",
        name: "Optocoupler with Booster Transistor",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "Optocoupler (4N35 or similar)" },
          { refDes: "Q1", description: "2N2222 NPN transistor — booster for higher current output" },
          { refDes: "R1", value: "220-1K", description: "Input LED current limiter" },
          { refDes: "R2", value: "4.7K", description: "Phototransistor pull-up" },
          { refDes: "R3", value: "4.7K", description: "Booster transistor output load" },
        ],
        nets: [
          { name: "VCC1", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VCC2", from: { refDes: "R2", pin: "1" }, to: [{ refDes: "R3", pin: "1" }] },
        ],
        designRules: [
          "Inverted output: optocoupler phototransistor drives Q1 base",
          "Non-inverted output: connect Q1 collector to R3, emitter to ground",
          "Booster Q1 provides more current than phototransistor alone — can drive relay, R3 can be replaced with relay coil",
          "Vcc2 = +5V to +12V",
        ],
      },
    ],
    designRules: [
      "All circuits provide complete galvanic isolation — typically 2500-5000V",
      "Speed limited by optocoupler CTR and load capacitance — typically ~10kHz max for 4N35",
      "For faster speeds: use 6N137 (10 Mbps) or similar high-speed optocoupler",
    ],
    notes: "From Mims Optoelectronics Circuits p47-48. Essential patterns for interfacing between different voltage domains with complete isolation. For REC: standard approach for triac gate drives, mains sensing, and any circuit where MCU logic must be isolated from high voltage. Pinball: isolate switch matrix sensing from solenoid driver board, protect game logic from voltage spikes on playfield wiring.",
  },

  // ──────────────────────────────────────────────────
  // Optocoupler Relay Driver (Isolated)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-relay-driver",
    name: "Optocoupler Relay Driver (Isolated)",
    description: "Drives a relay from an isolated input using an optocoupler. Input side is +5V logic; output side is +9V relay power. Demonstrates both isolation and level shifting in a single practical circuit.",
    category: "optocoupler",
    blocks: [
      {
        id: "opto-relay-block",
        name: "Isolated Relay Driver",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "Optocoupler (4N35 or similar)" },
          { refDes: "Q1", description: "2N2222 NPN transistor — relay driver" },
          { refDes: "R1", value: "1K", description: "Input LED current limiter (+5V side)" },
          { refDes: "R2", value: "4.7K", description: "Phototransistor pull-up" },
          { refDes: "D1", description: "1N914 flyback diode across relay coil" },
          { refDes: "RY1", description: "Relay — 500Ω coil, 6-9V" },
        ],
        nets: [
          { name: "+5V_INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "INPUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "1" }] },
          { name: "+9V_RELAY", from: { refDes: "R2", pin: "1" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "OPTO_OUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "5" }, { refDes: "Q1", pin: "B" }] },
          { name: "RELAY_COIL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "RY1", pin: "2" }, { refDes: "D1", pin: "A" }] },
          { name: "GND_RELAY", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Input LOW (+5V logic) → relay pulled in",
          "Complete isolation between +5V logic and +9V relay supply",
          "Use high-output IR or red LED in optocoupler for lowest R1",
          "If R1 too high (reduces to 270Ω minimum), output may not switch cleanly",
          "Always include D1 flyback diode across relay coil",
        ],
      },
    ],
    designRules: [
      "Separate power supplies for input and output sides",
      "Ground planes must NOT be connected between input and output sides",
    ],
    notes: "From Mims Optoelectronics Circuits p46. The standard isolated relay driver — one of the most useful circuits in the book. For REC: this is the basis for all triac/relay driver boards. Isolate MCU GPIO from relay coil voltage spikes. Pinball: drive solenoids and flashers from game logic with complete isolation.",
  },

  // ──────────────────────────────────────────────────
  // Demonstration Source/Sensor Circuit (555 + Opto)
  // ──────────────────────────────────────────────────
  {
    id: "mims-opto-demo-source-sensor",
    name: "Demonstration Source/Sensor Circuit",
    description: "555 oscillator flashes LED1 (visible indicator), while phototransistor Q1 detects the flash and lights LED2 (output indicator). R1 adjusts flash rate until LED1 flashes 1-2 times/sec, then LED1 switches off — demonstrating that Q1 detects the IR component even without visible indication.",
    category: "sensor",
    blocks: [
      {
        id: "demo-opto-block",
        name: "555 LED + Phototransistor Demo",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "555 timer IC — astable mode" },
          { refDes: "Q1", description: "Phototransistor — detects LED1 flash" },
          { refDes: "Q2", description: "2N2222 NPN transistor — LED2 driver" },
          { refDes: "R1", value: "100K", description: "555 frequency adjust pot" },
          { refDes: "R2", value: "1K", description: "555 timing resistor" },
          { refDes: "R3", value: "1K", description: "555 discharge resistor" },
          { refDes: "R4", value: "4.7K", description: "Phototransistor load" },
          { refDes: "R5", value: "1K", description: "LED2 current limiter" },
          { refDes: "C1", value: "220uF", description: "555 timing capacitor" },
          { refDes: "LED1", description: "Red LED — visible flash indicator (TX)" },
          { refDes: "LED2", description: "Red LED — phototransistor output indicator (RX)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
        ],
        designRules: [
          "Adjust R1 until LED1 flashes 1-2 times per second",
          "LED2 should follow LED1 — confirms opto coupling",
          "LED2 switches off when LED1 is disconnected (teaching demo)",
          "Supply: +9V (TX side), +5V to +9V (RX side)",
        ],
      },
    ],
    designRules: [
      "Position LED1 facing Q1 — short distance for demo purposes",
    ],
    notes: "From Mims Optoelectronics Circuits p46. Teaching circuit for understanding opto-isolation. For REC: useful as a test fixture for verifying optocoupler assemblies — flash an LED and confirm the phototransistor responds. Quick go/no-go test during production.",
  },

  // ══════════════════════════════════════════════════
  // Mims Magnet and Sensor Projects — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Reed Switch Interface (Magnet Switch)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-reed-switch-interface",
    name: "Reed Switch Interface (Dual LED Indicator)",
    description: "Reed switch (magnet-activated) with transistor driver and dual LED indicator. LED2 glows green when magnet is present (switch closed), LED1 glows red when magnet is removed (switch open). Responds to either north or south pole.",
    category: "sensor",
    blocks: [
      {
        id: "reed-interface-block",
        name: "Reed Switch + Transistor Driver",
        type: "sensor-interface",
        components: [
          { refDes: "SW1", description: "Reed switch (magnet-activated, SPST normally open)" },
          { refDes: "Q1", description: "2N2222 or MPS2222 NPN transistor — LED driver" },
          { refDes: "R1", value: "47K", description: "Base pull-up resistor to +V" },
          { refDes: "R2", value: "1K", description: "Base current limiter" },
          { refDes: "R3", value: "470", description: "LED2 current limiter" },
          { refDes: "LED1", description: "Red LED — glows when magnet absent (Q1 off, current through R1/LED1)" },
          { refDes: "LED2", description: "Green LED — glows when magnet present (Q1 on)" },
        ],
        nets: [
          { name: "+6V_TO_9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SWITCH", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "SW1", pin: "1" }] },
          { name: "LED2_DRIVE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED2", pin: "A" }] },
          { name: "COLLECTOR", from: { refDes: "LED2", pin: "K" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "SW1", pin: "2" }] },
        ],
        designRules: [
          "Magnet present: SW1 closes → Q1 base pulled to GND → Q1 off → LED1 on (red)",
          "Wait — actually: Magnet near → SW1 closes → base grounded → Q1 off → current flows through R1/LED1 to ground",
          "Magnet removed: SW1 opens → R1 pulls base high → Q1 on → LED2 on (green)",
          "Reed switches respond to either north or south pole",
          "Supply: +6V to +9V",
        ],
      },
    ],
    designRules: [
      "Reed switch in glass envelope — handle carefully, do not bend leads close to glass",
      "Magnet must be within ~1-2cm of reed switch to activate",
      "For security: mount switch on window frame, magnet on window",
    ],
    notes: "From Mims Magnet and Sensor Projects p18-19. Reed switches are the classic door/window sensors used in security systems. For REC: coin door detection on pinball machines, tilt bob sensor (magnet on pendulum, reed switch on frame), cabinet door open detection. Extremely reliable — no moving contacts to wear out.",
  },

  // ──────────────────────────────────────────────────
  // Magnet-Actuated Tone
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-actuated-tone",
    name: "Magnet-Actuated Tone (Reed Switch + Piezo)",
    description: "Simplest magnetic alarm — reed switch directly connects battery to self-oscillating piezo buzzer. Place magnet near switch to activate tone. Can substitute lamp for buzzer.",
    category: "alarm",
    blocks: [
      {
        id: "magnet-tone-block",
        name: "Reed Switch Buzzer",
        type: "sensor-interface",
        components: [
          { refDes: "SW1", description: "Reed switch — magnet-activated" },
          { refDes: "BZ1", description: "Piezo buzzer (self-oscillating type)" },
          { refDes: "B1", description: "9V battery" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "B1", pin: "+" }, to: [{ refDes: "SW1", pin: "1" }] },
          { name: "BUZZER", from: { refDes: "SW1", pin: "2" }, to: [{ refDes: "BZ1", pin: "+" }] },
          { name: "GND", from: { refDes: "BZ1", pin: "-" }, to: [{ refDes: "B1", pin: "-" }] },
        ],
        designRules: [
          "Use self-oscillating piezo buzzer — no external circuit needed",
          "Place magnet near switch to activate tone",
          "OK to substitute lamp for buzzer",
        ],
      },
    ],
    designRules: [
      "Simplest possible magnetic alarm — 3 components total",
    ],
    notes: "From Mims Magnet and Sensor Projects p19. The simplest magnetic sensor circuit possible. For REC: magnetic proximity alarm, pinball tilt detection tone, door alarm.",
  },

  // ──────────────────────────────────────────────────
  // Hall Sensor Digital Interfaces (LED, Transistor, TTL, CMOS)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-hall-digital-interfaces",
    name: "Hall Sensor Digital Interfaces",
    description: "Four standard ways to interface a digital Hall effect sensor (UGX3132 bipolar switch type) to external circuits: direct LED drive, transistor buffered output, TTL logic interface, and CMOS logic interface. All use the open-collector output of the Hall sensor.",
    category: "sensor",
    blocks: [
      {
        id: "hall-led-interface",
        name: "Hall Sensor LED Interface",
        type: "led-driver",
        components: [
          { refDes: "U1", description: "UGX3132 bipolar Hall sensor (or A3141, A3187)" },
          { refDes: "R1", value: "330", description: "LED series resistor — Rs = (V2 - Vled) / Iled" },
          { refDes: "LED1", description: "Indicator LED — glows when south pole near sensor" },
        ],
        nets: [
          { name: "+V_HALL", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "+V2", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "LED1", pin: "K" }] },
          { name: "LED_ANODE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [] },
        ],
        designRules: [
          "LED glows when south pole of magnet is near sensor",
          "LED switches off when north pole is near (or no magnet)",
          "Rs = (V2 - Vled) / Iled — for 6V: (6-3)/0.01 = 300Ω, use 330Ω",
          "V_HALL and V2 can be same or different supplies",
        ],
      },
      {
        id: "hall-transistor-interface",
        name: "Hall Sensor Transistor Interface",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "UGX3132 bipolar Hall sensor" },
          { refDes: "Q1", description: "2N2222 NPN transistor — load driver (lamp, relay, etc.)" },
          { refDes: "R1", value: "100", description: "Base current limiter" },
          { refDes: "R2", value: "33K", description: "Base bias resistor" },
          { refDes: "RS", description: "Load-specific series resistor" },
        ],
        nets: [
          { name: "+V_HALL", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "+V_LOAD", from: { refDes: "RS", pin: "1" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "R2", pin: "1" }] },
          { name: "LOAD", from: { refDes: "RS", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "U1", pin: "2" }] },
        ],
        designRules: [
          "Load is ON when south pole at Hall sensor, OFF when north pole",
          "Rs limits current through Q1 to below maximum allowable",
          "Can drive lamp, relay (add flyback diode), solenoid, etc.",
        ],
      },
      {
        id: "hall-ttl-interface",
        name: "Hall Sensor TTL Interface",
        type: "logic",
        components: [
          { refDes: "U1", description: "UGX3132 bipolar Hall sensor" },
          { refDes: "R1", value: "10K", description: "Pull-up resistor to +5V" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "TTL_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [] },
        ],
        designRules: [
          "South pole at sensor: pin 3 LOW → TTL logic low",
          "North pole at sensor: pin 3 HIGH (pulled up) → TTL logic high",
          "Hall sensor supply voltage should match TTL supply (+5V)",
          "Works with older and newer TTL families",
        ],
      },
      {
        id: "hall-cmos-interface",
        name: "Hall Sensor CMOS Interface",
        type: "logic",
        components: [
          { refDes: "U1", description: "UGX3132 bipolar Hall sensor" },
          { refDes: "R1", value: "47K", description: "Pull-up resistor to V_CMOS" },
        ],
        nets: [
          { name: "+V_HALL", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "+V_CMOS", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "CMOS_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Best to power Hall sensor and CMOS from same supply",
          "If different supplies: keep Hall supply at or below CMOS supply",
          "Follow CMOS handling precautions (static sensitive)",
        ],
      },
    ],
    designRules: [
      "All digital Hall sensors: Pin 1 = +supply, Pin 2 = GND, Pin 3 = output (open collector)",
      "Always add 0.1uF bypass capacitor between pin 1 and pin 2",
      "Works with UGX3132, A3141, A3187, and similar bipolar switch Hall sensors",
    ],
    notes: "From Mims Magnet and Sensor Projects p32-33. The four standard interface patterns for digital Hall sensors. For REC: Hall sensors are used in pinball for non-contact position detection (flipper home position, spinner counting, ball detection near magnets). The TTL/CMOS interface connects directly to MCU GPIO with just a pull-up resistor.",
  },

  // ──────────────────────────────────────────────────
  // Power Hall Sensor (UGR5140 Lamp Driver)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-power-hall-sensor",
    name: "Power Hall Sensor (UGR5140 Lamp/Relay Driver)",
    description: "The UGR5140 Hall sensor has a built-in driver transistor that can continuously sink up to 300mA (briefly 900mA). Can directly drive lamps, small relays, and solenoids without external transistor. Includes optional lamp test function.",
    category: "sensor",
    blocks: [
      {
        id: "power-hall-block",
        name: "UGR5140 Direct Load Driver",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "UGR5140 power Hall sensor — Pin 1=supply, Pin 2=output, Pin 3=diode(optional), Pin 4=GND" },
          { refDes: "R1", value: "1K", description: "Optional lamp test current limiter" },
          { refDes: "S1", description: "Optional momentary switch — lamp test" },
          { refDes: "L1", description: "Incandescent lamp — must not consume more than 300mA" },
        ],
        nets: [
          { name: "+4.5V_TO_28V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "L1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "L1", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Supply: +4.5V to +28V (wide range)",
          "Maximum continuous output: 300mA, brief: 900mA",
          "Pin 3 (diode) can be used for optional lamp test function",
          "Allow warm-up time for rated operating current",
          "No external transistor needed — built-in driver",
        ],
      },
    ],
    designRules: [
      "UGR5140 will warm up during operation — normal behavior",
      "For inductive loads (relay/solenoid): add flyback diode",
    ],
    notes: "From Mims Magnet and Sensor Projects p27. A power Hall sensor that eliminates the need for external driver transistors. For REC: direct-drive magnetic switches for lamps and small loads. Useful where space is tight and a separate driver circuit is unwanted.",
  },

  // ──────────────────────────────────────────────────
  // Basic Gauss Meter (Hall Sensor + Multimeter)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-gauss-meter",
    name: "Basic Gauss Meter (A3515 Ratiometric Hall Sensor)",
    description: "Simple magnetic field strength meter using an A3515 ratiometric (linear) Hall sensor and a digital multimeter. Output is 2.5 millivolts per Gauss with 6V supply. With no magnet, output is half the supply voltage. N pole increases output, S pole decreases output.",
    category: "test-equipment",
    blocks: [
      {
        id: "gauss-meter-block",
        name: "A3515 + Multimeter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor — linear output proportional to field" },
          { refDes: "R1", description: "Current-limiting resistor — restricts battery current to safe level" },
          { refDes: "B1", description: "Battery (6V recommended for 2.5 mV/Gauss sensitivity)" },
          { refDes: "M1", description: "Digital multimeter — set to millivolts DC" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "B1", pin: "+" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "SUPPLY", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "M1", pin: "-" }, { refDes: "B1", pin: "-" }] },
        ],
        designRules: [
          "A3515 ratiometric: output = Vsupply/2 with no field",
          "Sensitivity: ~2.5 mV/Gauss at 6V supply",
          "N pole (toward branded face) increases output above Vsupply/2",
          "S pole decreases output below Vsupply/2",
          "Sensor saturates at ~3.0V and ~4.5V (at 6V supply) — about ±600 Gauss",
          "Set multimeter to millivolts DC for best resolution",
        ],
      },
    ],
    designRules: [
      "Use digital multimeter for millivolt resolution",
      "Sensitivity: output changes 2.5 mV per Gauss at 6V supply",
      "A3515 pinout: 1=+supply, 2=GND, 3=output (branded face = label side)",
    ],
    notes: "From Mims Magnet and Sensor Projects p26. Simple but effective magnetic field measurement. For REC: verify magnet strength during assembly, test Hall sensor circuits, measure residual magnetism in steel parts. Earth's field is ~0.3-0.7 Gauss — detectable with this circuit and a sensitive multimeter.",
  },

  // ──────────────────────────────────────────────────
  // Ferrous Metal Indicator (Hall + Op-Amp Comparator)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-ferrous-metal-indicator",
    name: "Ferrous Metal Indicator (Hall + 741 Comparator)",
    description: "Detects ferrous metal within ~1cm of a Hall sensor backed by a bias magnet. The metal concentrates the magnetic flux, changing the Hall sensor output. A 741 op-amp comparator switches dual LEDs: green=metal present, red=no metal. Adjustable sensitivity via R1.",
    category: "sensor",
    blocks: [
      {
        id: "ferrous-indicator-block",
        name: "A3515 + 741 Metal Detector",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor — mounted in enclosure" },
          { refDes: "IC1", description: "741 op-amp — wired as comparator" },
          { refDes: "R1", value: "100K", description: "Sensitivity/threshold adjust pot" },
          { refDes: "R2", value: "470", description: "LED1 (green) current limiter" },
          { refDes: "R3", value: "470", description: "LED2 (red) current limiter" },
          { refDes: "LED1", description: "Green LED — metal detected" },
          { refDes: "LED2", description: "Red LED — no metal" },
          { refDes: "MAGNET", description: "Small bias magnet — S pole facing Hall sensor labeled side" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "IC1", pin: "7" }, { refDes: "R2", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "HALL_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "IC1", pin: "2" }] },
          { name: "THRESHOLD", from: { refDes: "R1", pin: "W" }, to: [{ refDes: "IC1", pin: "3" }] },
          { name: "COMPARATOR_OUT", from: { refDes: "IC1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "IC1", pin: "4" }] },
        ],
        designRules: [
          "Place bias magnet ~1cm behind Hall sensor, S pole facing sensor",
          "Adjust R1 until LED1 just stops glowing and LED2 is on",
          "Now when ferrous metal approaches, LED1 glows (green = metal)",
          "Sensitivity: detects ferrous objects within ~1cm",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "Only detects FERROUS metals (iron, steel, nickel) — not aluminum, copper, brass",
      "Bias magnet strength affects detection range",
    ],
    notes: "From Mims Magnet and Sensor Projects p34. A simple metal detector for ferrous metals. For REC: detect steel balls in pinball troughs/guides (Hall sensor + magnet beneath playfield), verify ferrous content of incoming parts, detect metal contamination in products.",
  },

  // ──────────────────────────────────────────────────
  // Hall Sensor Relay (A3515 + 741 + Relay)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-hall-relay",
    name: "Hall Sensor Relay (A3515 + 741 Comparator)",
    description: "Ratiometric Hall sensor drives a 741 comparator that actuates a relay when magnetic field exceeds an adjustable threshold. The Hall sensor is bonded to the relay core with epoxy — replaces mechanical relay contacts with solid-state sensing. No contact bounce, wear, or contamination.",
    category: "relay-driver",
    blocks: [
      {
        id: "hall-relay-block",
        name: "Hall Sensor Solid-State Relay",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor — epoxied to relay core" },
          { refDes: "IC1", description: "741 op-amp — comparator mode" },
          { refDes: "R1", value: "100K", description: "Threshold adjust pot" },
          { refDes: "RY1", description: "Relay — coil driven by 741 output" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "IC1", pin: "7" }] },
          { name: "HALL_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "IC1", pin: "2" }] },
          { name: "THRESHOLD", from: { refDes: "R1", pin: "W" }, to: [{ refDes: "IC1", pin: "3" }] },
          { name: "RELAY_DRIVE", from: { refDes: "IC1", pin: "6" }, to: [{ refDes: "RY1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "IC1", pin: "4" }, { refDes: "RY1", pin: "2" }] },
        ],
        designRules: [
          "Bond Hall sensor to relay core with filled epoxy — NOT cyanoacrylate (causes drift)",
          "Adjust R1 until pin 6 just goes low when relay coil is energized",
          "Relay's own steel core changes the magnetic field detected by Hall sensor",
          "Residual core magnetism may require occasional R1 readjustment",
          "Reverse 741 input connections if output goes high instead of low",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "OK to use other op-amps and comparators (LM339, LM311, etc.)",
      "The Hall sensor replaces the mechanical relay contact — no bounce, no wear",
    ],
    notes: "From Mims Magnet and Sensor Projects p35. Clever technique: mount Hall sensor on a relay core to get a solid-state contact sensor. For REC: eliminate relay contact problems in harsh environments. Pinball: sense solenoid/relay activation without wiring to the contacts — just sense the magnetic field from the coil.",
  },

  // ──────────────────────────────────────────────────
  // Magnet Position Detector (Dual Comparator)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-position-detector",
    name: "Magnet Position Detector (Hall + Dual 741 Comparator)",
    description: "Indicates magnet position relative to a ratiometric Hall sensor using two 741 comparators and two LEDs. LED1 lights when south pole approaches (position 1), LED2 lights when north pole approaches (position 3), both light for intermediate (position 2). Uses a window comparator technique.",
    category: "sensor",
    blocks: [
      {
        id: "position-detector-block",
        name: "A3515 + Dual 741 Window Comparator",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor" },
          { refDes: "IC1", description: "741 op-amp — upper threshold comparator" },
          { refDes: "IC2", description: "741 op-amp — lower threshold comparator" },
          { refDes: "R1", value: "100K", description: "IC1 threshold adjust pot" },
          { refDes: "R2", value: "100K", description: "IC2 threshold adjust pot" },
          { refDes: "R3", value: "470", description: "LED1 current limiter" },
          { refDes: "R4", value: "470", description: "LED2 current limiter" },
          { refDes: "LED1", description: "LED — lights for south pole position" },
          { refDes: "LED2", description: "LED — lights for north pole position" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "IC1", pin: "7" }, { refDes: "IC2", pin: "7" }, { refDes: "R3", pin: "1" }, { refDes: "R4", pin: "1" }] },
          { name: "HALL_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "IC1", pin: "3" }, { refDes: "IC2", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "IC1", pin: "4" }, { refDes: "IC2", pin: "4" }] },
        ],
        designRules: [
          "Place south pole 1-2cm from sensor, adjust R1 and R2 until LED1 just glows",
          "Position table: South→LED1 on/LED2 off, Middle→both on, North→LED1 off/LED2 on, Away→both on",
          "Use different color LEDs for easy identification",
          "Can substitute bicolor LED for single-package indicator",
          "IC1, IC2: 741 or other op-amp/comparator",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "Window comparator technique — two thresholds define three zones",
      "Mount Hall sensors back-to-back (front numbers closest to magnet) for higher sensitivity",
    ],
    notes: "From Mims Magnet and Sensor Projects p37. A window comparator for magnetic field position detection. For REC: detect magnet position in 3 zones — useful for multi-position magnetic switches, rotary position sensing, or joystick-style magnetic controls. Pinball: detect flipper position (up/middle/down) using magnet on flipper shaft.",
  },

  // ──────────────────────────────────────────────────
  // Field Strength Bargraph (Stacked Digital Hall Sensors)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-field-bargraph",
    name: "Field Strength Bargraph (Stacked Hall Sensors)",
    description: "Three digital Hall sensors (A3141) stacked in a line, each with its own LED. As a magnet approaches, the nearest sensor triggers first, then the middle, then the farthest — creating a 3-level bargraph display of magnetic field strength.",
    category: "sensor",
    blocks: [
      {
        id: "field-bargraph-block",
        name: "3x A3141 Stacked Bargraph",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3141 digital Hall sensor — closest to magnet (most sensitive position)" },
          { refDes: "U2", description: "A3141 digital Hall sensor — middle" },
          { refDes: "U3", description: "A3141 digital Hall sensor — farthest from magnet" },
          { refDes: "R1", value: "470", description: "LED1 current limiter" },
          { refDes: "R2", value: "470", description: "LED2 current limiter" },
          { refDes: "R3", value: "470", description: "LED3 current limiter" },
          { refDes: "LED1", description: "LED — weak field (nearest sensor)" },
          { refDes: "LED2", description: "LED — medium field" },
          { refDes: "LED3", description: "LED — strong field (farthest sensor)" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U2", pin: "1" }, { refDes: "U3", pin: "1" }, { refDes: "R1", pin: "1" }, { refDes: "R2", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "U3", pin: "2" }] },
        ],
        designRules: [
          "Stack sensors in a line — each successive sensor is farther from the magnet approach direction",
          "Position 1 (far): LED1 on, LED2 on, LED3 on (3 LEDs = strong field)",
          "Position 2: LED1 on, LED2 on, LED3 off",
          "Position 3: LED1 on, LED2 off, LED3 off",
          "Position 4 (no magnet): all off",
          "OK to use any color LEDs — red/green/blue looks great",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "More sensors = more resolution — extend to 4, 5, or more levels",
      "Each sensor triggers independently based on distance from magnet",
    ],
    notes: "From Mims Magnet and Sensor Projects p39. A magnetic field strength bargraph using stacked Hall sensors. For REC: visual magnetic field strength display for magnet testing and characterization. Pinball: visual indicator showing how close a steel ball is to a magnet (under-playfield magnet strength display for setup).",
  },

  // ──────────────────────────────────────────────────
  // Ultra-Sensitive Magnet Switch (Dual Hall + 741)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-ultra-sensitive-switch",
    name: "Ultra-Sensitive Magnet Switch (Dual Hall + 741 Comparator)",
    description: "Very sensitive magnet detector using two back-to-back ratiometric Hall sensors (A3515) connected to a 741 comparator. Detects a magnet at ~15cm (6 inches). The dual sensor configuration doubles the sensitivity compared to a single sensor.",
    category: "sensor",
    blocks: [
      {
        id: "ultra-switch-block",
        name: "Dual A3515 + 741 Comparator",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor #1" },
          { refDes: "U2", description: "A3515 ratiometric Hall sensor #2 (back-to-back with U1)" },
          { refDes: "IC1", description: "741 op-amp — comparator mode" },
          { refDes: "R1", value: "470", description: "LED1 current limiter" },
          { refDes: "R2", value: "470", description: "LED2 current limiter" },
          { refDes: "R3", value: "1M", description: "741 feedback/hysteresis resistor" },
          { refDes: "LED1", description: "LED — indicates field detected" },
          { refDes: "LED2", description: "LED — indicates no field" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U2", pin: "1" }, { refDes: "IC1", pin: "7" }, { refDes: "R1", pin: "1" }] },
          { name: "HALL1_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "IC1", pin: "2" }] },
          { name: "HALL2_OUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "IC1", pin: "3" }] },
          { name: "COMP_OUT", from: { refDes: "IC1", pin: "6" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "IC1", pin: "4" }] },
        ],
        designRules: [
          "Mount two A3515 sensors back-to-back (front sides facing outward)",
          "The 741 compares outputs — differential measurement doubles sensitivity",
          "Detects magnet at ~15cm (6 inches)",
          "Use different color LEDs for LED1 and LED2",
          "Can substitute bicolor LED",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "The differential configuration cancels out temperature drift",
      "R3 provides hysteresis to prevent oscillation at threshold",
    ],
    notes: "From Mims Magnet and Sensor Projects p41. The most sensitive magnet detector in the book. For REC: long-range magnetic proximity detection, hidden magnet detection, sensitive position sensing. Pinball: detect the position of a steel ball from a distance using a bias magnet under the playfield — the ball disrupts the field and triggers the comparator.",
  },

  // ──────────────────────────────────────────────────
  // Magnet Music (Hall Sensor + 555 VCO)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-music",
    name: "Magnet Music (Hall Sensor + 555 VCO)",
    description: "Ratiometric Hall sensor output controls a 555 voltage-controlled oscillator. Moving a magnet near the sensor produces musical tones whose frequency changes with magnetic field strength. Frequency response: 200-2000 Hz depending on magnet distance.",
    category: "oscillator",
    blocks: [
      {
        id: "magnet-music-block",
        name: "A3515 Hall + 555 VCO",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor — magnetic field to voltage" },
          { refDes: "U2", description: "555 timer IC — VCO mode" },
          { refDes: "R1", value: "220", description: "555 output to speaker coupling" },
          { refDes: "R2", value: "100K", description: "555 timing resistor — adjust for base frequency" },
          { refDes: "R3", value: "1K", description: "555 discharge resistor" },
          { refDes: "C1", value: "0.01uF-0.1uF", description: "555 timing capacitor — larger = lower base frequency" },
          { refDes: "SPKR", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }] },
          { name: "HALL_TO_VCO", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "U2", pin: "5" }] },
          { name: "OUTPUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "SPEAKER", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "SPKR", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "U2", pin: "1" }, { refDes: "SPKR", pin: "2" }] },
        ],
        designRules: [
          "Hall sensor output (pin 3) feeds 555 control voltage (pin 5)",
          "Reduce R2 to raise base frequency, increase R2 to lower it",
          "R2 can be a fixed resistor or pot for adjustability",
          "Frequency graph: South pole 0mm=saturated(~1800Hz), 5mm=~1200Hz, 10mm=~600Hz. North pole reverses.",
          "C1 = 0.047uF gives good response; C1 = 0.01uF for higher frequencies",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "Applications: musical pendulum (magnet on string), damped oscillating tone (dropped magnet), pressure-sensitive tone (magnet on flexible strip)",
      "Hang magnet from string and swing past Hall sensor for musical pendulum effect",
    ],
    notes: "From Mims Magnet and Sensor Projects p42-43. A magnetic field to audio frequency converter. For REC: audible magnetic field probe for testing/alignment, musical toys, magnetic proximity audio indicator. Pinball: audible feedback when steel ball passes near a sensor — tone pitch indicates proximity. The pendulum application could make an interesting game mechanic.",
  },

  // ──────────────────────────────────────────────────
  // Hall Sensor North Compass (Dual 741 Direction Detector)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-north-compass",
    name: "Hall Sensor North Compass (A3515 + Dual 741)",
    description: "Electronic compass using a ratiometric Hall sensor (A3515) and two 741 comparators. Detects magnetic north by sensing the Earth's weak magnetic field. LED1 lights when facing east/west, LED2 lights when facing north. Rotate the circuit board to find north — when LED1 turns off and LED2 turns on, you're pointing north.",
    category: "sensor",
    blocks: [
      {
        id: "compass-block",
        name: "A3515 + Dual 741 Compass",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "A3515 ratiometric Hall sensor — mounted on compass or PCB edge" },
          { refDes: "IC1", description: "741 op-amp — first comparator (east/west threshold)" },
          { refDes: "IC2", description: "741 op-amp — second comparator (north threshold)" },
          { refDes: "R1", value: "100K", description: "IC1 sensitivity adjust pot" },
          { refDes: "R2", value: "100K", description: "IC2 sensitivity adjust pot (unused in simple version)" },
          { refDes: "R3", value: "10K", description: "LED pull-up / feedback" },
          { refDes: "R4", value: "100K", description: "Second comparator threshold" },
          { refDes: "R5", value: "1K", description: "LED1 current limiter" },
          { refDes: "R6", value: "1K", description: "LED2 current limiter" },
          { refDes: "LED1", description: "LED — general direction indicator" },
          { refDes: "LED2", description: "LED — north indicator" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "IC1", pin: "7" }, { refDes: "IC2", pin: "7" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "IC1", pin: "4" }, { refDes: "IC2", pin: "4" }] },
        ],
        designRules: [
          "Use optional nail flux concentrator at Hall sensor for better sensitivity",
          "Go outdoors away from power lines, large metal objects, and printed faces",
          "Adjust R1 until LED1 is between highest and lowest output values",
          "Rotate board toward east or west — adjust R4 until LED1 on, LED2 off",
          "When board points north, LED1 off, LED2 on",
          "Watch for very subtle brightness changes — Earth's field is only ~0.3-0.7 Gauss",
          "Supply: +6V",
        ],
      },
    ],
    designRules: [
      "Earth's magnetic field is very weak — ~0.3 Gauss equator, ~0.7 Gauss poles",
      "The A3515 can detect this because its output changes ~2.5 mV per Gauss",
      "Flux concentrator (steel nail) dramatically improves sensitivity",
    ],
    notes: "From Mims Magnet and Sensor Projects p47. An electronic compass using Hall sensors — detects Earth's magnetic field. For REC: educational demonstration of Hall effect sensitivity, orientation sensing for products. The dual-comparator approach creates a crude but functional 2-axis compass. Modern alternative: use an I2C magnetometer (HMC5883L/QMC5883L) for precise digital compass heading.",
  },

  // ──────────────────────────────────────────────────
  // Gear Tooth Sensor (ATS610)
  // ──────────────────────────────────────────────────
  {
    id: "mims-magnet-gear-tooth-sensor",
    name: "Gear Tooth Sensor (ATS610)",
    description: "The ATS610 is a specialized Hall sensor with a built-in bias magnet and two Hall elements designed to detect gear teeth and other ferrous metal targets. Also works as a general-purpose ferrous metal proximity detector. LED indicator shows detection.",
    category: "sensor",
    blocks: [
      {
        id: "gear-tooth-block",
        name: "ATS610 Ferrous Metal Detector",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "ATS610 gear tooth sensor — built-in bias magnet + dual Hall sensors" },
          { refDes: "R1", value: "1K", description: "LED current limiter" },
          { refDes: "LED1", description: "Indicator LED — stops glowing when ferrous metal is close" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "LED1", pin: "K" }] },
          { name: "LED_ANODE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "Pin 1 = supply (+16V max), Pin 2 = output, Pin 3 = capacitor, Pin 4 = ground",
          "LED stops glowing when ferrous metal is close to sensor",
          "Built-in bias magnet — no external magnet required",
          "Detects gear teeth, ferrous metal objects, shaft position",
          "Supply: +9V (maximum +16V)",
        ],
      },
    ],
    designRules: [
      "Designed for rotating gear tooth counting — RPM measurement",
      "Gap between sensor face and gear teeth should be minimal (~1-2mm)",
    ],
    notes: "From Mims Magnet and Sensor Projects p48. A self-contained ferrous metal detector — no external magnet needed. For REC: RPM/speed measurement for motors and rotating assemblies, position detection for ferrous targets. Pinball: detect spinner rotation speed, measure motor RPM, count mechanism cycles.",
  },

  // ══════════════════════════════════════════════════
  // Mims Sensor Projects — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Pendulum Quadrant Switch (555 Tilt Direction Indicator)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-pendulum-quadrant",
    name: "Pendulum Quadrant Switch — 555 Tilt Direction Indicator",
    description: "Pendulum switch with 4 copper wire segments in a circular array. Each quadrant has a different capacitor value, producing a distinct 555 tone indicating tilt direction. Pendulum makes contact with segments as device tilts.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-pendulum-quadrant-main",
        name: "555 Quadrant Tone Generator",
        type: "timer",
        components: [
          { refDes: "U1", value: "555", description: "555 timer — astable oscillator" },
          { refDes: "R1", value: "100K", description: "Timing resistor" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "C1", value: "4.7µF", description: "Output coupling capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "THRESHOLD", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "7" }, { refDes: "U1", pin: "2" }, { refDes: "R1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "SPKR1", pin: "1" }] },
        ],
        placementNotes: "Use #18 copper wire segments on non-conductive board in circular pattern. Different C values per quadrant: 0.22µF=50Hz, 0.10µF=110Hz, 0.047µF=230Hz, 0.022µF=490Hz, 0.010µF=1200Hz.",
      },
    ],
    designRules: [
      "Each quadrant uses different capacitor for distinct tone",
      "C values: 0.22µF (50Hz), 0.10µF (110Hz), 0.047µF (230Hz), 0.022µF (490Hz)",
      "Pendulum is copper wire suspended from center making contact with quadrant segments",
    ],
    notes: "From Mims Sensor Projects p17. A clever way to indicate tilt direction with audio feedback. For REC: multi-directional tilt alarm for pinball machines, orientation indicator for leveling equipment, vibration direction sensor for machinery monitoring. Could adapt to use 4 separate reed switches or Hall sensors instead of mechanical pendulum.",
  },

  // ──────────────────────────────────────────────────
  // Security Alarm Systems (Open/Closed/Intelligent)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-alarm-systems",
    name: "Switch-Type Security Alarm Systems",
    description: "Three alarm topologies: (1) Basic open-circuit — any sensor closing triggers alarm, easily defeated by cutting wire. (2) Improved open-circuit — relay latches alarm on until reset, normally-open sensors. (3) Closed-circuit — normally-closed sensor loop, relay draws current continuously, cutting any wire triggers alarm (more secure).",
    category: "alarm",
    blocks: [
      {
        id: "mims-sensor-alarm-open",
        name: "Improved Open-Circuit Alarm",
        type: "relay-driver",
        components: [
          { refDes: "S1", description: "Sensor switch (normally open)" },
          { refDes: "S2", description: "Sensor switch (normally open)" },
          { refDes: "S3", description: "Sensor switch (normally open)" },
          { refDes: "S4", description: "Reset switch — opens to reset latched alarm" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω — latches alarm" },
          { refDes: "B1", description: "Alarm (bell, siren, buzzer, or lamp)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "K1", pin: "coil+" }, to: [{ refDes: "B1", pin: "+" }] },
          { name: "GND", from: { refDes: "S4", pin: "2" }, to: [{ refDes: "B1", pin: "-" }] },
          { name: "SENSOR_BUS", from: { refDes: "S1", pin: "1" }, to: [{ refDes: "S2", pin: "1" }, { refDes: "S3", pin: "1" }, { refDes: "K1", pin: "coil-" }] },
        ],
        placementNotes: "Sensor switches in parallel — any one closing completes relay circuit. Relay latches via its own contacts. S4 reset switch breaks latch. Add more sensor switches as needed.",
      },
      {
        id: "mims-sensor-alarm-closed",
        name: "Closed-Circuit Alarm",
        type: "relay-driver",
        components: [
          { refDes: "S1", description: "Sensor switch (normally closed)" },
          { refDes: "S2", description: "Sensor switch (normally closed)" },
          { refDes: "S3", description: "Sensor switch (normally closed)" },
          { refDes: "S4", description: "Arm switch — press to activate system" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω — energized when loop intact" },
          { refDes: "B1", description: "Alarm (bell, siren, buzzer)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "S1", pin: "1" }, to: [{ refDes: "B1", pin: "+" }] },
          { name: "GND", from: { refDes: "K1", pin: "coil-" }, to: [{ refDes: "B1", pin: "-" }] },
          { name: "SENSOR_LOOP", from: { refDes: "S1", pin: "2" }, to: [{ refDes: "S2", pin: "1" }, { refDes: "S3", pin: "1" }, { refDes: "K1", pin: "coil+" }] },
        ],
        placementNotes: "NC sensor switches in series form continuous loop. Relay energized normally. Cutting any wire or opening any switch drops relay, triggering alarm. More secure than open-circuit design.",
      },
    ],
    designRules: [
      "Closed-circuit is more secure — cutting wire triggers alarm",
      "Open-circuit is simpler but easily defeated by cutting sensor wire",
      "Relay latching provides memory — alarm stays on until manually reset",
      "Use 9V relay with ~500Ω coil for battery-powered operation",
    ],
    notes: "From Mims Sensor Projects p18-19. Classic security alarm topologies. For REC: pinball machine tamper detection (closed-circuit on coin door, backbox), equipment security. The closed-circuit approach is standard in commercial alarm systems because it's fail-safe — any wiring failure triggers the alarm.",
  },

  // ──────────────────────────────────────────────────
  // Intelligent Security Alarm (Resistor Ladder Zone ID)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-intelligent-alarm",
    name: "Intelligent Security Alarm — Resistor Ladder Zone Identification",
    description: "5 normally-closed magnet switches in series, each with a parallel resistor of different value (10K to 100K). When a switch opens, the corresponding resistance appears in the circuit. A relay and ohm meter identify which zone was triggered. Piezo buzzer confirms alarm state.",
    category: "alarm",
    blocks: [
      {
        id: "mims-sensor-intelligent-alarm-main",
        name: "Resistor Ladder Zone Sensor",
        type: "sensor-interface",
        components: [
          { refDes: "S1", description: "Magnet switch (NC) — zone 1" },
          { refDes: "S2", description: "Magnet switch (NC) — zone 2" },
          { refDes: "S3", description: "Magnet switch (NC) — zone 3" },
          { refDes: "S4", description: "Magnet switch (NC) — zone 4" },
          { refDes: "S5", description: "Magnet switch (NC) — zone 5" },
          { refDes: "R1", value: "10K", description: "Zone 1 ID resistor (1/4W)" },
          { refDes: "R2", value: "22K", description: "Zone 2 ID resistor (1/4W)" },
          { refDes: "R3", value: "33K", description: "Zone 3 ID resistor (1/4W)" },
          { refDes: "R4", value: "47K", description: "Zone 4 ID resistor (1/4W)" },
          { refDes: "R5", value: "100K", description: "Zone 5 ID resistor (1/4W)" },
          { refDes: "R6", value: "470Ω", description: "Relay coil current limiter (1/2W)" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω" },
          { refDes: "S6", description: "NC pushbutton — test/arm" },
          { refDes: "S7", description: "SPDT switch — operate/readout mode" },
          { refDes: "S8", description: "Momentary pushbutton — arm system" },
          { refDes: "PZ1", description: "Piezo buzzer — alarm indicator" },
        ],
        nets: [
          { name: "+12V", from: { refDes: "R6", pin: "1" }, to: [{ refDes: "K1", pin: "coil+" }] },
          { name: "GND", from: { refDes: "S8", pin: "2" }, to: [{ refDes: "PZ1", pin: "-" }] },
        ],
        placementNotes: "Each NC switch has its resistor in parallel. R values chosen so meter reading uniquely identifies which zone(s) opened. R6 limits relay coil current. S7 toggles between operate (alarm active) and readout (meter shows zone resistance). Multiple open switches produce combined resistance.",
      },
    ],
    designRules: [
      "Resistor values: R1=10K, R2=22K, R3=33K, R4=47K, R5=100K",
      "Combined resistance uniquely identifies which switch(es) opened",
      "If output is 5.5K, then switches 2 and 3 are open (2.2K + 3.3K)",
      "R6 (470Ω 1/2W) limits relay current",
      "S7 SPDT toggles between alarm mode and diagnostic readout mode",
    ],
    notes: "From Mims Sensor Projects p20-21. A clever analog zone identification system — no MCU required. For REC: multi-zone security with single wire pair, diagnostic capability to identify which sensor triggered. Modern equivalent: use ADC on MCU to read voltage divider and decode zone. Pinball: identify which target/lane was hit using single analog input.",
  },

  // ──────────────────────────────────────────────────
  // Zener Diode Voltage Sensor
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-zener-voltage",
    name: "Zener Diode Voltage Sensor",
    description: "Simple go/no-go voltage indicator. LED glows when input voltage exceeds the zener breakdown voltage of D1. R1 limits LED current. Formula: R1 = (Vin - Vled) / Iled. For 10mA LED current, Iled = 0.01A.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-zener-voltage-main",
        name: "Zener LED Threshold Indicator",
        type: "sensor",
        components: [
          { refDes: "R1", value: "calculated", description: "Current limiter — R1=(Vin-Vled)/Iled" },
          { refDes: "D1", description: "Zener diode — select Vz for desired threshold" },
          { refDes: "LED1", description: "LED indicator — glows when Vin > Vz" },
        ],
        nets: [
          { name: "VIN+", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VIN-", from: { refDes: "LED1", pin: "K" }, to: [] },
          { name: "MID", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "K" }, { refDes: "LED1", pin: "A" }] },
        ],
        placementNotes: "R1 in series, then zener (reverse-biased) in parallel with LED. LED forward drop ~2.0-2.7V.",
      },
    ],
    designRules: [
      "R1 = (Vin - Vled) / Iled — for 10mA: R1 = (Vin - 2.0) / 0.01",
      "Select zener voltage for desired threshold",
      "OK to use zener diodes with other breakdown voltages for different thresholds",
    ],
    notes: "From Mims Sensor Projects p24. Simplest possible voltage threshold indicator. For REC: battery low indicator, power rail monitor, over-voltage warning. Pinball: indicate when specific voltage rails are present during power-up sequence.",
  },

  // ──────────────────────────────────────────────────
  // Bargraph Voltage Sensor (Zener Ladder)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-bargraph-voltage",
    name: "Bargraph Voltage Sensor — Zener Diode Ladder",
    description: "5 zener diodes at increasing breakdown voltages (5.1V to 15V), each with a series resistor and LED. As input voltage rises from 1V to 15V, LEDs light in sequence creating a bargraph display. Uses 1/2W resistors.",
    category: "test-equipment",
    blocks: [
      {
        id: "mims-sensor-bargraph-voltage-main",
        name: "5-LED Zener Bargraph",
        type: "sensor-interface",
        components: [
          { refDes: "R1", value: "330Ω", description: "5.1V channel current limiter (1/2W)" },
          { refDes: "R2", value: "470Ω", description: "6.2V channel current limiter (1/2W)" },
          { refDes: "R3", value: "680Ω", description: "9.1V channel current limiter (1/2W)" },
          { refDes: "R4", value: "1K", description: "12V channel current limiter (1/2W)" },
          { refDes: "R5", value: "1.1K", description: "15V channel current limiter (1/2W)" },
          { refDes: "D1", value: "5.1V", description: "Zener diode — 5.1V threshold" },
          { refDes: "D2", value: "6.2V", description: "Zener diode — 6.2V threshold" },
          { refDes: "D3", value: "9.1V", description: "Zener diode — 9.1V threshold" },
          { refDes: "D4", value: "12V", description: "Zener diode — 12V threshold" },
          { refDes: "D5", value: "15V", description: "Zener diode — 15V threshold" },
          { refDes: "LED1", description: "LED — lights at 5.1V" },
          { refDes: "LED2", description: "LED — lights at 6.2V" },
          { refDes: "LED3", description: "LED — lights at 9.1V" },
          { refDes: "LED4", description: "LED — lights at 12V" },
          { refDes: "LED5", description: "LED — lights at 15V" },
        ],
        nets: [
          { name: "VIN+", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "R3", pin: "1" }, { refDes: "R4", pin: "1" }, { refDes: "R5", pin: "1" }] },
          { name: "VIN-", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "LED2", pin: "K" }, { refDes: "LED3", pin: "K" }, { refDes: "LED4", pin: "K" }, { refDes: "LED5", pin: "K" }] },
        ],
        placementNotes: "Each channel: resistor → zener (reverse) → LED. All channels in parallel across input. LEDs light when input exceeds respective zener voltage.",
      },
    ],
    designRules: [
      "Zener voltages set threshold: 5.1V, 6.2V, 9.1V, 12V, 15V",
      "Use 1/2W resistors to handle current when measuring higher voltages",
      "OK to substitute different zener voltages for custom voltage ranges",
    ],
    notes: "From Mims Sensor Projects p24. A simple discrete bargraph voltmeter — no IC required. For REC: quick visual voltage check during testing, battery charge indicator, power supply monitor. Compare with 339-based bargraph (mims-339-bargraph-voltmeter) which uses a single IC for cleaner thresholds.",
  },

  // ──────────────────────────────────────────────────
  // Comparator Voltage Sensor (741)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-comparator-voltage",
    name: "741 Comparator Voltage Sensor",
    description: "741 op-amp as comparator detects voltage above or below an adjustable reference. Reference voltage set by R1 (10K pot) at inverting input. Sensed voltage at non-inverting input. LED driven via 2N2222 indicates threshold crossed. Swapping inputs reverses polarity (above vs below reference).",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-comparator-voltage-main",
        name: "741 Threshold Comparator",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp as comparator" },
          { refDes: "R1", value: "10K pot", description: "Reference voltage adjust" },
          { refDes: "R2", value: "4.7K", description: "Pull-up for Q1 base drive" },
          { refDes: "R3", value: "470Ω", description: "LED current limiter" },
          { refDes: "Q1", value: "2N2222", description: "NPN LED driver" },
          { refDes: "LED1", description: "Threshold indicator LED" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }] },
          { name: "REF", from: { refDes: "R1", pin: "W" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "SENSE", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "DRIVE", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "Q1", pin: "B" }] },
          { name: "LED_OUT", from: { refDes: "R3", pin: "1" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "LED_CATHODE", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "Q1", pin: "C" }] },
        ],
        placementNotes: "R1 pot sets reference voltage. Input A (pin 3 non-inverting) — LED on when input > reference. Input B (pin 2 inverting) — LED on when input < reference. R2 provides pull-up for output driving Q1 base.",
      },
    ],
    designRules: [
      "Adjust R1 pot to set desired voltage threshold",
      "Input to pin 3 (non-inv): LED on when input > reference",
      "Input to pin 2 (inv): LED on when input < reference",
      "R2 (4.7K) pull-up ensures clean switching of Q1",
    ],
    notes: "From Mims Sensor Projects p25. The fundamental comparator building block — usable with any analog sensor. For REC: threshold detection for temperature, light, pressure, voltage monitoring. Reference graphs show sharp switching characteristic. Pinball: detect specific playfield conditions (temperature, ball presence via IR sensor threshold).",
  },

  // ──────────────────────────────────────────────────
  // Pressure-to-Voltage Converter (741)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-pressure-to-voltage",
    name: "Pressure-to-Voltage Converter — 741 Op-Amp",
    description: "741 inverting amplifier converts resistive pressure sensor (conductive foam sandwich or potentiometer-type) to voltage output. Rs (sensor) and R1 form voltage divider. R3 (10K-100K) sets gain. Adjust R1 to calibrate. Dual-supply (±9V) for negative voltage output.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-pressure-to-voltage-main",
        name: "741 Pressure Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp inverting amplifier" },
          { refDes: "Rs", description: "Pressure sensor (variable resistance)" },
          { refDes: "R1", value: "10K", description: "Calibration resistor — sets zero point" },
          { refDes: "R2", value: "1K", description: "Non-inverting input bias" },
          { refDes: "R3", value: "10K-100K", description: "Feedback resistor — sets gain" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "Rs", pin: "1" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "Rs", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "2" }] },
        ],
        placementNotes: "Rs and R1 form voltage divider reducing Rs resistance → increased voltage at R2 → negative output voltage. Connect Rs to -9V for positive output. R3 sets gain.",
      },
    ],
    designRules: [
      "Sensor (Rs) resistance decreases with pressure → output voltage changes",
      "R1 calibrates zero point, R3 sets gain",
      "Use dual supply (±9V) for bipolar output capability",
      "Conductive foam sensor: sandwich between two copper-clad PCBs",
    ],
    notes: "From Mims Sensor Projects p27. Generic resistive-sensor-to-voltage converter — works with any variable-resistance sensor (pressure, strain, flex, FSR). For REC: force-sensitive resistor readout for grill lid pressure, weight measurement, pinball ball detection via force pad under playfield lane.",
  },

  // ──────────────────────────────────────────────────
  // Strain Sensor Circuits (Relay + Tone + Amplifier)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-strain-circuits",
    name: "Strain Sensor Circuits — Relay, Tone Generator, and Amplifier",
    description: "Three circuits for graphite-on-plastic strain gauges: (1) Relay — 741 comparator triggers 2N2222+relay when strain exceeds threshold. (2) Tone generator — 555 timer frequency varies with strain (sensor replaces timing resistor). (3) Amplifier — 741 transimpedance amplifier with 1M feedback, converts micro-current changes to voltage (gain of 1,000,000). Output: flat=1.48V, bend out=1.32V, bend in=2.25V.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-strain-relay",
        name: "Strain Sensor Relay (741 Comparator)",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp comparator" },
          { refDes: "Rs", description: "Graphite strain sensor" },
          { refDes: "R1", value: "100K", description: "Threshold set — non-inverting divider" },
          { refDes: "R2", value: "1M", description: "Hysteresis feedback" },
          { refDes: "R3", value: "1K", description: "Base current limiter for Q1" },
          { refDes: "R4", value: "47Ω", description: "Relay coil series resistor" },
          { refDes: "Q1", value: "2N2222", description: "NPN relay driver" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "Rs", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "BASE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "K1", pin: "coil-" }] },
          { name: "RELAY_VCC", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "K1", pin: "coil+" }] },
        ],
        placementNotes: "R1 sets threshold. R2 provides hysteresis feedback. Adjust R1 until relay just activates at desired strain level.",
      },
      {
        id: "mims-sensor-strain-tone",
        name: "Strain Sensor Tone Generator (555)",
        type: "timer",
        components: [
          { refDes: "U1", value: "555", partNumber: "NE555", description: "555 timer — astable" },
          { refDes: "Rs", description: "Strain sensor — replaces timing resistor" },
          { refDes: "R1", value: "1K", description: "Timing resistor" },
          { refDes: "R2", value: "220Ω", description: "Speaker series resistor" },
          { refDes: "C1", value: "0.01-1µF", description: "Timing capacitor — increase to lower frequency" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "Rs", pin: "1" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "TIMING", from: { refDes: "Rs", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "7" }] },
          { name: "THRESH", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SPKR", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "SPKR1", pin: "1" }] },
        ],
        placementNotes: "Strain sensor replaces one timing resistor. Bending sensor changes frequency. Increase C1 to reduce frequency. OK to use external audio amplifier instead of direct speaker drive.",
      },
      {
        id: "mims-sensor-strain-amplifier",
        name: "Strain Sensor Transimpedance Amplifier (741)",
        type: "amplifier",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp transimpedance amplifier" },
          { refDes: "Rs", description: "Graphite strain sensor" },
          { refDes: "R1", value: "1M", description: "Feedback resistor — sets gain (Vout = Iin × R1)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "Rs", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "SENSOR_DRIVE", from: { refDes: "Rs", pin: "1" }, to: [] },
          { name: "VOUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        placementNotes: "Vout = Iin × R1. With R1=1M, gain is 1,000,000. Reduce R1 to reduce gain. Typical outputs with graphite strain sensor: flat=1.48V, bend out=1.32V, bend in=2.25V. Use narrow meter range when gain is high.",
      },
    ],
    designRules: [
      "DIY strain gauge: graphite pencil on roughened flexible plastic",
      "Protect graphite coating with thin layer of paint to prevent unwanted resistance changes",
      "Mylar, overhead transparency film, or product packaging work as flexible substrate",
      "Applications: accelerometer (weight on one end), scale, vibration/movement detection",
    ],
    notes: "From Mims Sensor Projects p28-31. Graphite strain gauges are trivially easy to make and surprisingly sensitive. For REC: vibration detection in pinball playfields, weight/force measurement for grill lid sensors, flex detection in cable assemblies. The transimpedance amplifier approach gives extremely high sensitivity — small resistance changes produce large voltage swings.",
  },

  // ──────────────────────────────────────────────────
  // Video Monitor Tone Generator (555 + Photoresistor)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-video-monitor-tone",
    name: "Video Monitor Tone Generator — 555 + CdS Photoresistor",
    description: "CdS photoresistor (cadmium sulfide) taped to video monitor screen controls 555 oscillator frequency. Tone changes when screen image changes at sensor location. Use to audibly monitor computer activity, drive access, or any screen event without watching.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-video-monitor-tone-main",
        name: "555 Screen-Light Oscillator",
        type: "timer",
        components: [
          { refDes: "U1", value: "555", partNumber: "NE555", description: "555 timer — astable, frequency varies with light" },
          { refDes: "PC1", description: "CdS photoresistor — taped to monitor screen" },
          { refDes: "R1", value: "1K", description: "Timing resistor" },
          { refDes: "R2", value: "220Ω", description: "Speaker series resistor" },
          { refDes: "C1", value: "0.1µF", description: "Timing capacitor — increase to lower frequency" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker or piezo buzzer" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "PC1", pin: "1" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "TIMING", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "7" }] },
          { name: "THRESH", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SPKR", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "SPKR1", pin: "1" }] },
        ],
        placementNotes: "Tape CdS cell to monitor screen where activity occurs (cursor area, indicator, etc.). PC means photocell. Increase C1 to reduce frequency. OK to replace speaker with piezoelectric buzzer.",
      },
    ],
    notes: "From Mims Sensor Projects p35. A simple screen activity monitor. For REC: monitor status LEDs on equipment without visual attention, detect indicator state changes. Modern adaptation: tape photoresistor over status LED on any device to get audio feedback of its state.",
  },

  // ──────────────────────────────────────────────────
  // Video Monitor Relay Circuits (Light/Dark Activated)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-video-monitor-relays",
    name: "Video Monitor Relay Circuits — Light and Dark Activated",
    description: "Three variants of screen-light-to-relay circuits: (1) Light-activated — relay drops when screen is bright at PC1. (2) Dark-activated — relay pulls when screen is dark at PC1. (3) Improved differential — dual photoresistors cancel ambient light changes, only screen-specific brightness difference triggers relay. All use 741 + 2N2222 + relay.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-video-relay-light",
        name: "Light-Activated Screen Relay",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp comparator" },
          { refDes: "PC1", description: "CdS photoresistor — taped to screen" },
          { refDes: "R1", value: "100K", description: "Threshold divider" },
          { refDes: "R2", value: "1M", description: "Sensitivity adjust" },
          { refDes: "R3", value: "1K", description: "Base current limiter" },
          { refDes: "R4", value: "47Ω", description: "Relay coil series resistor" },
          { refDes: "Q1", value: "2N2222", description: "NPN relay driver" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "R2", pin: "2" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "PC1", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "SCREEN", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
        ],
        placementNotes: "PC1 taped to screen with black tape masking. R2 adjusts sensitivity. Relay drops out when screen area is bright.",
      },
      {
        id: "mims-sensor-video-relay-diff",
        name: "Improved Differential Screen Relay",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp differential comparator" },
          { refDes: "PC1", description: "CdS photoresistor — sense (on target screen area)" },
          { refDes: "PC2", description: "CdS photoresistor — reference (ambient)" },
          { refDes: "R1", value: "100K", description: "Sense divider" },
          { refDes: "R2", value: "100K", description: "Reference divider — adjust for threshold" },
          { refDes: "R3", value: "1K", description: "Base current limiter" },
          { refDes: "R4", value: "47Ω", description: "Relay coil series resistor" },
          { refDes: "Q1", value: "2N2222", description: "NPN relay driver" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "PC1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "R2", pin: "2" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "PC2", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "PC1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "REF_DIV", from: { refDes: "PC2", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
        ],
        placementNotes: "PC1 on target screen area, PC2 nearby as ambient reference. Both photoresistors experience same room lighting changes (cancel out). Only screen-specific brightness change at PC1 triggers relay. Adjust R2 for threshold.",
      },
    ],
    designRules: [
      "Differential version cancels ambient light changes — much more reliable",
      "Place PC2 reference sensor near PC1 but not over active screen area",
      "Use black tape to mask photoresistors so only screen light reaches them",
      "Adjust R2 to control switching threshold",
    ],
    notes: "From Mims Sensor Projects p36-37. The differential approach is the key insight — single-sensor designs false-trigger from room lights. For REC: non-invasive monitoring of any device with a display or indicator LED. The differential photoresistor technique applies broadly to any optical sensing where ambient rejection is needed. Paint program cursor detection demonstrated as practical example.",
  },

  // ──────────────────────────────────────────────────
  // Lightning Sensor (Solar Cell + 741 + 386)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-lightning",
    name: "Lightning Sensor — Solar Cell + 741 Amplifier + 386 Audio Output",
    description: "Solar cell behind Fresnel lens detects distant lightning flashes. 741 amplifies the transient light pulse, optional LED flashes in response. 386 audio amplifier stage provides audible click/pop for each flash. Directional version uses 4 solar cells facing N/S/E/W with colored LEDs to indicate lightning direction.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-lightning-detector",
        name: "741 Lightning Flash Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp — amplifies solar cell transient" },
          { refDes: "SC1", description: "Solar cell — behind Fresnel lens for sensitivity" },
          { refDes: "R1", value: "1M", description: "Feedback resistor — high gain" },
          { refDes: "R3", value: "1K", description: "LED current limiter" },
          { refDes: "C1", value: "10µF", description: "Non-inverting input stabilizer" },
          { refDes: "C2", value: "0.1µF", description: "AC coupling — passes fast transients" },
          { refDes: "LED1", description: "Flash indicator LED (optional)" },
          { refDes: "S1", description: "SPDT switch — enable/test mode" },
        ],
        nets: [
          { name: "+9V_A", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "GND_A", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "SC1", pin: "-" }, { refDes: "C1", pin: "-" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "SC1", pin: "+" }, { refDes: "R1", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "OUT_741", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        placementNotes: "Mount solar cell behind large Fresnel lens (page magnifier) for increased sensitivity. S1(a) connects solar cell for operation, S1(b) points at TV remote for testing. C2 (0.1µF) AC-couples fast transients. R1 (1M) sets high gain. C1 (10µF) stabilizes non-inverting input.",
      },
      {
        id: "mims-sensor-lightning-audio",
        name: "386 Audio Output Stage",
        type: "audio-amplifier",
        components: [
          { refDes: "U2", value: "386", partNumber: "LM386", description: "Audio power amplifier" },
          { refDes: "R2", value: "10K", description: "Input attenuator" },
          { refDes: "C3", value: "10µF", description: "Input coupling capacitor" },
          { refDes: "C4", value: "100µF", description: "Output coupling capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — pops for each lightning flash" },
        ],
        nets: [
          { name: "+9V_B", from: { refDes: "U2", pin: "6" }, to: [] },
          { name: "GND_B", from: { refDes: "U2", pin: "4" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "C3", pin: "-" }] },
          { name: "AUDIO_IN", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "386_IN", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U2", pin: "3" }, { refDes: "C3", pin: "+" }] },
          { name: "AUDIO_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C4", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C4", pin: "-" }, to: [{ refDes: "SPKR1", pin: "1" }] },
        ],
        placementNotes: "Feed 741 output through R2 to 386 input. C4 AC-couples speaker output. Each lightning flash produces audible pop/click from speaker.",
      },
    ],
    designRules: [
      "Use large Fresnel lens (page magnifier) to concentrate light on solar cell",
      "At night, can detect lightning flashes too faint to see with naked eye",
      "During day, may be too bright — works best at twilight and night",
      "For directional version: 4 solar cells facing N/S/E/W in clear box with 4 colored LEDs",
      "Test with TV/stereo IR remote control pointed at solar cell",
    ],
    notes: "From Mims Sensor Projects p40-41. Lightning is a giant radio transmitter — the optical flash is detectable at great distances with amplification. For REC: weather monitoring for outdoor equipment, automated storm warning system. The directional version is a particularly clever application — separate sensor boards per direction indicate which way the storm is. Modern adaptation: replace solar cell with fast photodiode for better transient response.",
  },

  // ──────────────────────────────────────────────────
  // Infrared Sensor Circuits (Thermistor-Based)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-infrared-thermistor",
    name: "Infrared Sensor Circuits — Thermistor + Reflector",
    description: "Thermal IR detection using thermistor at focal point of flashlight reflector. (1) Switch — dual thermistors + 741 comparator, LED lights when IR source (hand, flame, soldering iron) is detected within ~1 meter. (2) Amplifier — dual thermistors + 741 with 1M feedback, output to multimeter for quantitative IR measurement. Dual thermistors cancel ambient temperature drift.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-ir-switch",
        name: "Infrared Switch (741 Comparator)",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp comparator" },
          { refDes: "T1", description: "Thermistor — sense (at reflector focal point)" },
          { refDes: "T2", description: "Thermistor — reference (shielded from IR)" },
          { refDes: "R1", value: "33K", description: "Sense divider" },
          { refDes: "R2", value: "50K pot", description: "Sensitivity/threshold adjust" },
          { refDes: "R3", value: "1K", description: "LED current limiter" },
          { refDes: "LED1", description: "IR detection indicator" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "T1", pin: "1" }, { refDes: "T2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "T1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "T2", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        placementNotes: "T1 at reflector focal point, T2 shielded as ambient reference. Wait several seconds after power-on for thermistors to stabilize. Adjust R2 until LED just turns off, then IR source triggers LED on. Detection range ~1 meter for body heat.",
      },
      {
        id: "mims-sensor-ir-amplifier",
        name: "Infrared Amplifier (741)",
        type: "amplifier",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp differential amplifier" },
          { refDes: "T1", description: "Thermistor — sense (at reflector focal point)" },
          { refDes: "T2", description: "Thermistor — reference (ambient)" },
          { refDes: "R1", value: "50K pot", description: "Zero-point calibration" },
          { refDes: "R2", value: "33K", description: "Reference divider" },
          { refDes: "R3", value: "1M", description: "Feedback — high gain for weak IR signals" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "T1", pin: "1" }, { refDes: "T2", pin: "1" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "T1", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "T2", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "GND", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "2" }] },
        ],
        placementNotes: "Set multimeter to 0-5 or 0-10V DC. Adjust R1 until meter reads center scale. IR source within reflector field of view causes upward deflection. Correct alignment of thermistor at reflector focal point is critical.",
      },
    ],
    designRules: [
      "Thermistor must be at exact focal point of reflector for maximum sensitivity",
      "Use flashlight reflector — the focal point is where the filament would be",
      "Dual thermistors provide ambient temperature rejection (differential operation)",
      "Allow several seconds warm-up for thermal stabilization",
      "Detection range: ~1m for body heat (hand), further for hotter sources (flame, soldering iron)",
    ],
    notes: "From Mims Sensor Projects p42-43. Thermal IR detection is fundamentally different from photo-IR (phototransistor/photodiode). Thermistors respond to actual heat radiation, not reflected/emitted near-IR light. For REC: non-contact temperature monitoring in ovens/grills (detect hot spots through window), presence detection for humans/animals, flame detection for safety systems.",
  },

  // ──────────────────────────────────────────────────
  // Polarized Light Sensor
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-polarized-light",
    name: "Polarized Light Sensor — Crossed Polarizers + 741 Comparator",
    description: "Two photoresistors behind crossed polarizing filters feed a 741 comparator. Ordinary (unpolarized) light affects both sensors equally — no output. Polarized light (reflected from water, glass, ice, metal) affects them differently, triggering LED. Applications: remote control, glare detection, ice/water detection.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-polarized-light-main",
        name: "Polarized Light Comparator",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp comparator" },
          { refDes: "PC1", description: "CdS photoresistor behind Polarizer A" },
          { refDes: "PC2", description: "CdS photoresistor behind Polarizer B (crossed 90° to A)" },
          { refDes: "R1", value: "100K", description: "Sense divider" },
          { refDes: "R2", value: "1M pot", description: "Sensitivity adjust" },
          { refDes: "R3", value: "1K", description: "LED current limiter" },
          { refDes: "LED1", description: "Polarization detection indicator" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "PC1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "PC1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "PC2", pin: "1" }] },
          { name: "REF", from: { refDes: "PC2", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        placementNotes: "PC1 and PC2 both face the same light source. Polarizing filters crossed at 90°. Unpolarized light balanced = LED off. Polarized light unbalances sensors = LED on. Add polarizer to flashlight for remote control application.",
      },
    ],
    designRules: [
      "Polarizers must be oriented 90° to each other (crossed)",
      "Use polarizing film from camera stores or polarized sunglasses lenses",
      "Adjust R2 sensitivity until LED is just off with ambient light",
      "Reflected sunlight from water, ice, glass, and metal is partially polarized",
      "Sky at 90° from sun is most polarized — dark band through polarized sunglasses",
    ],
    notes: "From Mims Sensor Projects p44-45. Polarization detection enables rejection of ordinary light while responding to specific reflected light. For REC: ice detection on outdoor equipment, glare-free light measurement, optical remote control (add polarizer to flashlight). The crossed-polarizer technique naturally rejects ambient light changes — similar in principle to the differential photoresistor approach but detecting polarization state rather than brightness.",
  },

  // ──────────────────────────────────────────────────
  // Integrated Light Sensors (TSL235 / TSL250)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-integrated-light",
    name: "Integrated Light Sensor Circuits — TSL235 Light-to-Frequency and TSL250 Light-to-Voltage",
    description: "Circuits using TI integrated light sensor ICs. (1) TSL235 light-to-tone — frequency output directly drives piezo buzzer for audible light level indication. (2) TSL250 IR remote sensor — LED/piezo indicates IR remote transmitter activity. (3) TSL250 light-activated relay — 2N2222 driver for relay control based on light level.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-tsl235-tone",
        name: "TSL235 Light-to-Tone Sensor",
        type: "sensor-interface",
        components: [
          { refDes: "U1", value: "TSL235", partNumber: "TSL235", description: "Light-to-frequency converter — output proportional to irradiance" },
          { refDes: "PZ1", description: "Piezoelectric buzzer element (not self-oscillating type)" },
        ],
        nets: [
          { name: "+3_TO_9V", from: { refDes: "U1", pin: "VDD" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "GND" }, to: [{ refDes: "PZ1", pin: "-" }] },
          { name: "OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "PZ1", pin: "+" }] },
        ],
        placementNotes: "Ultra-simple: TSL235 output frequency is proportional to light intensity. Connect directly to piezo buzzer element (not a buzzer with built-in oscillator). Bright light = high pitch, dim = low pitch. Dark tape reduces sensitivity if needed. Power: 3V to 9V.",
      },
      {
        id: "mims-sensor-tsl250-ir-detect",
        name: "TSL250 IR Remote Control Sensor",
        type: "sensor-interface",
        components: [
          { refDes: "U1", value: "TSL250", partNumber: "TSL250", description: "Light-to-voltage converter" },
          { refDes: "R1", value: "1K", description: "LED current limiter" },
          { refDes: "LED1", description: "IR activity indicator" },
        ],
        nets: [
          { name: "+3_TO_9V", from: { refDes: "U1", pin: "VDD" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "GND" }, to: [{ refDes: "LED1", pin: "K" }] },
          { name: "OUT", from: { refDes: "U1", pin: "OUT" }, to: [] },
          { name: "LED", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        placementNotes: "TSL250 is light-to-voltage. Output goes high when IR remote transmits (pulsed IR). LED glows/pulses in response. OK to replace LED with piezoelectric buzzer for audible indication. Use in subdued light for best results.",
      },
      {
        id: "mims-sensor-tsl250-relay",
        name: "TSL250 Light-Activated Relay",
        type: "relay-driver",
        components: [
          { refDes: "U1", value: "TSL250", partNumber: "TSL250", description: "Light-to-voltage converter" },
          { refDes: "R1", value: "1K", description: "Base current limiter for Q1" },
          { refDes: "R2", value: "47Ω", description: "Relay coil series resistor" },
          { refDes: "Q1", value: "2N2222", description: "NPN relay driver" },
          { refDes: "K1", value: "500Ω", description: "Relay 9V 500Ω" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "VDD" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "GND" }, to: [{ refDes: "Q1", pin: "E" }] },
          { name: "TSL_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "K1", pin: "coil-" }] },
          { name: "RELAY_VCC", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "K1", pin: "coil+" }] },
        ],
        placementNotes: "TSL250 output drives 2N2222 base through R1. Use color print film over TSL250 as IR filter for visible-light rejection. Mount in tube for directional sensitivity. Sense people, cars, objects in subdued light or at night.",
      },
    ],
    designRules: [
      "TSL235: light-to-frequency, output is square wave proportional to irradiance",
      "TSL250: light-to-voltage, analog output proportional to irradiance",
      "Both accept 3V to 9V supply",
      "Dark tape over sensor reduces sensitivity",
      "Color print film acts as IR-pass filter (blocks visible, passes IR)",
    ],
    notes: "From Mims Sensor Projects p46-47. Integrated light sensors eliminate the need for external op-amps. TSL235 is especially useful with MCUs — just count pulses for digital light measurement. For REC: ambient light detection for display brightness control, IR beam-break sensing, production line object detection. The TSL235 frequency output connects directly to MCU timer/counter input.",
  },

  // ──────────────────────────────────────────────────
  // Optical Level Sensors (Bubble Level + Light)
  // ──────────────────────────────────────────────────
  {
    id: "mims-sensor-optical-level",
    name: "Optical Level Sensors — Variable Tone and Switched Tone",
    description: "LED illuminates side of bubble level vial, photoresistor on opposite side detects bubble position. (1) Variable tone — 555 frequency changes as bubble moves, distinct tone when centered. (2) Switched tone — 741 comparator + 2N2222 drives piezo buzzer only when bubble is centered (level). Both in light-tight enclosure.",
    category: "sensor-interface",
    blocks: [
      {
        id: "mims-sensor-level-variable-tone",
        name: "Variable Tone Level Sensor (555)",
        type: "timer",
        components: [
          { refDes: "U1", value: "555", partNumber: "NE555", description: "555 timer — frequency varies with light through vial" },
          { refDes: "LED1", description: "Super-bright LED — illuminates bubble level vial" },
          { refDes: "PC1", description: "CdS photoresistor — opposite side of vial from LED" },
          { refDes: "R1", value: "33K", description: "Timing resistor" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "R3", value: "100Ω", description: "Speaker series resistor" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor — increase to lower frequency" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "LED1", pin: "K" }] },
          { name: "TIMING", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "PC1", pin: "1" }] },
          { name: "THRESH", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "U1", pin: "7" }, { refDes: "U1", pin: "6" }, { refDes: "U1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "SPKR", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "SPKR1", pin: "1" }] },
        ],
        placementNotes: "LED on one side of bubble level vial, PC1 on opposite side. When bubble is centered, it passes less light — tone changes distinctly. Increase C1 to reduce frequency. Light-tight box essential.",
      },
      {
        id: "mims-sensor-level-switched-tone",
        name: "Switched Tone Level Sensor (741 + Buzzer)",
        type: "comparator",
        components: [
          { refDes: "U1", value: "741", partNumber: "LM741", description: "Op-amp comparator" },
          { refDes: "LED1", description: "Super-bright LED — illuminates bubble level vial" },
          { refDes: "PC1", description: "CdS photoresistor — opposite side of vial from LED" },
          { refDes: "R1", value: "33K", description: "Sense divider pull-up" },
          { refDes: "R2", value: "100K", description: "Reference divider" },
          { refDes: "R3", value: "100K", description: "Reference divider to GND — adjust for threshold" },
          { refDes: "R4", value: "10K", description: "Base current limiter" },
          { refDes: "R5", value: "4.7K", description: "Buzzer pull-up" },
          { refDes: "Q1", value: "2N2222", description: "NPN buzzer driver" },
          { refDes: "PZ1", description: "Piezo buzzer — sounds when level" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "R3", pin: "2" }, { refDes: "LED1", pin: "K" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "PC1", pin: "1" }] },
          { name: "INV_IN", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "REF", from: { refDes: "PC1", pin: "2" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "BASE", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "BUZZER", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "PZ1", pin: "+" }, { refDes: "R5", pin: "1" }] },
          { name: "BUZZER_VCC", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "PZ1", pin: "-" }] },
        ],
        placementNotes: "Adjust R3 until piezo buzzer sounds when bubble is centered in vial. Buzzer falls silent when tilted. Use super-bright LED for best optical coupling through vial. Light-tight enclosure required.",
      },
    ],
    designRules: [
      "Must be in light-tight enclosure — ambient light will interfere",
      "Use super-bright LED for adequate light through bubble level vial",
      "LED and photoresistor must be aligned across narrowest part of vial",
      "Bubble blocks more light when centered — this is the detection mechanism",
    ],
    notes: "From Mims Sensor Projects p48. Clever use of standard bubble level as a precision tilt sensor. For REC: automated leveling feedback for equipment installation, tilt detection with audio feedback for visually impaired setup. The variable tone version gives continuous feedback, while the switched version gives a clear on/off indication of level. Modern alternative: MEMS accelerometer, but this optical approach requires no special ICs.",
  },

  // ══════════════════════════════════════════════════
  // Mims Solar Cell Projects — new circuits only
  // (solar-battery-charger & sun-powered-oscillator already in Optoelectronics section)
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Solar Radiometer (TL082 + Rotary Gain Switch)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-radiometer",
    name: "Solar Radiometer (TL082 Op-Amp)",
    description: "Precision solar radiometer using TL082 JFET op-amp in non-inverting configuration with 7-position rotary gain switch (R1-R7). Solar cell photocurrent produces voltage across R8, amplified to drive 0-1mA meter. Gain ranges from 1× to ~100× for measuring different light levels from dim indoor to full sun.",
    category: "sensor-interface",
    blocks: [
      {
        id: "solar-radiometer-block",
        name: "Op-Amp Radiometer",
        type: "amplifier",
        components: [
          { refDes: "U1", partNumber: "TL082", description: "TL082 JFET input dual op-amp — high input impedance preserves solar cell voltage" },
          { refDes: "PC1", description: "Silicon solar cell — generates photocurrent proportional to light intensity" },
          { refDes: "R1", value: "100", description: "Gain resistor position 1 — lowest gain (brightest light)" },
          { refDes: "R2", value: "1K", description: "Gain resistor position 2" },
          { refDes: "R3", value: "10K", description: "Gain resistor position 3" },
          { refDes: "R4", value: "100K", description: "Gain resistor position 4" },
          { refDes: "R5", value: "1M", description: "Gain resistor position 5" },
          { refDes: "R6", value: "4.7M", description: "Gain resistor position 6" },
          { refDes: "R7", value: "10M", description: "Gain resistor position 7 — highest gain (dimmest light)" },
          { refDes: "R8", value: "100K", description: "Input load resistor — converts solar cell photocurrent to voltage" },
          { refDes: "SW1", description: "7-position rotary switch — selects feedback resistor for gain range" },
          { refDes: "M1", description: "0-1mA panel meter — displays relative light intensity" },
          { refDes: "R9", value: "10K", description: "Zero-adjust potentiometer — nulls offset in dark" },
        ],
        nets: [
          { name: "SOLAR_POS", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "R8", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "R8", pin: "2" }, to: [{ refDes: "U1", pin: "3" }] },
          { name: "SOLAR_NEG", from: { refDes: "PC1", pin: "-" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "FB", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "SW1", pin: "COM" }] },
          { name: "OUT", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "M1", pin: "+" }] },
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "M1", pin: "-" }, to: [{ refDes: "R9", pin: "2" }] },
        ],
        designRules: [
          "Calibrate against known solar irradiance source or commercial meter",
          "Switch gain range so meter reads mid-scale for best accuracy",
          "Shield solar cell from stray light when zeroing with R9",
          "TL082 JFET input essential — bipolar op-amp input bias current would cause errors",
        ],
      },
    ],
    designRules: [
      "Use dual-supply (±9V) for full output swing including zero-crossing",
      "Solar cell must be temperature-stable for repeatable measurements",
      "Shield wiring from electromagnetic interference — high-impedance input is noise-sensitive",
    ],
    notes: "From Mims Solar Cell Projects p35. Multi-range light meter using solar cell as sensor. For REC: light level monitoring for grill controller displays, ambient light measurement for automatic backlight control, solar panel performance testing. The 7-position rotary switch gives enormous dynamic range — from dim room light to direct sunlight. Modern alternative: TSL2591 digital light sensor, but this analog approach gives direct meter readings without any digital processing.",
  },

  // ──────────────────────────────────────────────────
  // Light-Actuated Relay (TL082 + 2N2222)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-light-relay",
    name: "Light-Actuated Relay (TL082 Op-Amp)",
    description: "Solar cell drives TL082 comparator that trips a relay via 2N2222 transistor when light exceeds threshold. Dual LED status indicators show relay state. Adjustable threshold via potentiometer.",
    category: "sensor-interface",
    blocks: [
      {
        id: "solar-light-relay-block",
        name: "Op-Amp Comparator Relay Driver",
        type: "relay-driver",
        components: [
          { refDes: "U1", partNumber: "TL082", description: "TL082 JFET op-amp as comparator — high input impedance for solar cell" },
          { refDes: "PC1", description: "Silicon solar cell — light sensor" },
          { refDes: "Q1", partNumber: "2N2222", description: "NPN relay driver transistor" },
          { refDes: "K1", description: "SPDT relay — switches external load" },
          { refDes: "D1", partNumber: "1N4148", description: "Flyback diode across relay coil" },
          { refDes: "R1", value: "10K", description: "Threshold adjust potentiometer" },
          { refDes: "R2", value: "10K", description: "Feedback/hysteresis resistor" },
          { refDes: "R3", value: "1K", description: "Base current limiting resistor" },
          { refDes: "R4", value: "470", description: "LED current limiting — green ON indicator" },
          { refDes: "R5", value: "470", description: "LED current limiting — red OFF indicator" },
          { refDes: "LED1", description: "Green LED — relay energized (light above threshold)" },
          { refDes: "LED2", description: "Red LED — relay de-energized (light below threshold)" },
        ],
        nets: [
          { name: "SOLAR_IN", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "U1", pin: "3" }] },
          { name: "THRESHOLD", from: { refDes: "R1", pin: "W" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R3", pin: "1" }, { refDes: "R4", pin: "1" }] },
          { name: "BASE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "RELAY_COIL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "K1", pin: "COIL1" }, { refDes: "D1", pin: "A" }] },
          { name: "+9V", from: { refDes: "K1", pin: "COIL2" }, to: [{ refDes: "D1", pin: "K" }, { refDes: "R5", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "PC1", pin: "-" }] },
        ],
        designRules: [
          "Flyback diode D1 is mandatory — relay coil will destroy transistor without it",
          "Adjust R1 to set light threshold — relay should snap on/off cleanly",
          "R2 provides positive feedback hysteresis to prevent relay chatter near threshold",
        ],
      },
    ],
    designRules: [
      "Mount solar cell facing expected light source",
      "Keep relay away from solar cell to prevent vibration affecting measurement",
    ],
    notes: "From Mims Solar Cell Projects p37. Light-threshold relay with visual status indicators. For REC: dusk/dawn switching for outdoor equipment, automatic lighting control, solar panel sun-tracking relay. The dual LED indicators make setup and debugging easy — you can see the relay state at a glance without measuring. Pinball: could trigger events at specific light levels.",
  },

  // ──────────────────────────────────────────────────
  // Steady-State Break-Beam Relay (TL082 + IRF510)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-steady-breakbeam",
    name: "Steady-State Break-Beam Relay (TL082 + IRF510)",
    description: "Continuous IR beam from LED to solar cell sensor. TL082 comparator detects beam interruption. IRF510 power MOSFET drives relay for high-current load switching. Simpler than pulsed version but susceptible to ambient light.",
    category: "sensor-interface",
    blocks: [
      {
        id: "steady-breakbeam-tx",
        name: "IR Transmitter",
        type: "sensor",
        components: [
          { refDes: "LED1", description: "IR LED — continuous beam source" },
          { refDes: "R1", value: "100", description: "IR LED current limiting resistor" },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "IR_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "GND", from: { refDes: "LED1", pin: "K" }, to: [] },
        ],
      },
      {
        id: "steady-breakbeam-rx",
        name: "Receiver + Relay Driver",
        type: "relay-driver",
        components: [
          { refDes: "U1", partNumber: "TL082", description: "TL082 JFET op-amp as comparator — detects beam interruption" },
          { refDes: "PC1", description: "Silicon solar cell — IR beam receiver" },
          { refDes: "Q1", partNumber: "IRF510", description: "IRF510 N-channel power MOSFET — drives relay" },
          { refDes: "K1", description: "SPDT relay — switches high-current load" },
          { refDes: "D1", partNumber: "1N4001", description: "Flyback diode across relay coil" },
          { refDes: "R2", value: "10K", description: "Threshold adjust potentiometer" },
          { refDes: "R3", value: "100K", description: "Solar cell load resistor" },
        ],
        nets: [
          { name: "SOLAR_IN", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "R3", pin: "1" }, { refDes: "U1", pin: "3" }] },
          { name: "THRESHOLD", from: { refDes: "R2", pin: "W" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "GATE", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "Q1", pin: "G" }] },
          { name: "RELAY_COIL", from: { refDes: "Q1", pin: "D" }, to: [{ refDes: "K1", pin: "COIL1" }, { refDes: "D1", pin: "A" }] },
          { name: "+V", from: { refDes: "K1", pin: "COIL2" }, to: [{ refDes: "D1", pin: "K" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [{ refDes: "PC1", pin: "-" }, { refDes: "R3", pin: "2" }] },
        ],
        designRules: [
          "IRF510 gate driven directly from op-amp — no base resistor needed (voltage-controlled)",
          "Align IR LED and solar cell precisely — beam must hit cell directly",
          "Shield from ambient IR (sunlight) or use pulsed version for outdoor use",
          "Flyback diode mandatory across relay coil",
        ],
      },
    ],
    designRules: [
      "For indoor use only — ambient sunlight will cause false triggers",
      "Use tubes/shrouds on both TX and RX to reduce ambient light sensitivity",
      "For outdoor or high-ambient use, switch to pulsed break-beam design",
    ],
    notes: "From Mims Solar Cell Projects p39. Steady-state version is simpler than pulsed break-beam (fewer components, no 555 timers) but limited to indoor/controlled lighting. For REC: pinball ball detection in enclosed playfield, parts counter on assembly line (indoor), door/gate monitoring. The IRF510 MOSFET can switch relays up to several amps without a heat sink.",
  },

  // ──────────────────────────────────────────────────
  // Solar-Powered CMOS Oscillator (4011B)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-cmos-oscillator",
    name: "Solar-Powered CMOS Oscillator (4011B)",
    description: "Two NAND gates from a 4011B wired as a simple astable oscillator, powered directly by solar cells. Ultra-low power consumption allows operation from small solar panel. Drives piezo buzzer for audible output.",
    category: "oscillator",
    blocks: [
      {
        id: "solar-cmos-osc-block",
        name: "Dual-Gate CMOS Oscillator",
        type: "oscillator",
        components: [
          { refDes: "U1", partNumber: "CD4011B", description: "CMOS quad NAND gate — two gates used as oscillator" },
          { refDes: "PC1", description: "Solar cell array — power source (3-6V depending on cells)" },
          { refDes: "R1", value: "1M", description: "Timing resistor — sets oscillation frequency with C1" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "PZ1", description: "Piezo buzzer — audio output" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "U1", pin: "14" }] },
          { name: "VSS", from: { refDes: "PC1", pin: "-" }, to: [{ refDes: "U1", pin: "7" }] },
          { name: "GATE1_IN", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "GATE1_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "U1", pin: "5" }, { refDes: "U1", pin: "6" }, { refDes: "C1", pin: "1" }] },
          { name: "FB", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "OUT", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "PZ1", pin: "+" }] },
          { name: "PZ_GND", from: { refDes: "PZ1", pin: "-" }, to: [{ refDes: "U1", pin: "7" }] },
        ],
        designRules: [
          "CMOS 4011B operates from 3V to 15V — ideal for variable solar voltage",
          "Tie unused gate inputs to VDD or VSS to prevent oscillation and excess current draw",
          "f ≈ 1 / (2.2 × R1 × C1) — approximately 45Hz with values shown",
        ],
      },
    ],
    designRules: [
      "Solar cell must provide at least 3V for reliable CMOS operation",
      "Add 10µF bypass capacitor across VDD-VSS for stability",
      "CMOS draws almost no quiescent current — only power is output drive",
    ],
    notes: "From Mims Solar Cell Projects p42. Ultra-low power oscillator runs from small solar cell with no battery. For REC: solar-powered alarms, continuity testers powered by ambient light, educational demonstrations. The 4011B CMOS draws microamps at idle — only the piezo output consumes significant power. Frequency and volume increase with brighter light (higher solar voltage).",
  },

  // ──────────────────────────────────────────────────
  // Solar-Powered 555 Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-555-oscillator",
    name: "Solar-Powered 555 Oscillator",
    description: "Standard 555 astable oscillator powered by solar cells. Frequency and duty cycle set by R1, R2, C1. Higher solar illumination increases supply voltage, raising frequency slightly and increasing output volume.",
    category: "oscillator",
    blocks: [
      {
        id: "solar-555-osc-block",
        name: "555 Astable Oscillator",
        type: "timer",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 timer IC in astable mode" },
          { refDes: "PC1", description: "Solar cell array — provides 4.5-9V depending on illumination and cell count" },
          { refDes: "R1", value: "10K", description: "Timing resistor — charge path" },
          { refDes: "R2", value: "100K", description: "Timing resistor — charge/discharge path" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "C2", value: "0.01µF", description: "Control voltage bypass capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Miniature speaker — audio output" },
        ],
        nets: [
          { name: "+V", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "PC1", pin: "-" }, to: [{ refDes: "U1", pin: "1" }, { refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "CV", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "SPKR_GND", from: { refDes: "SPKR1", pin: "-" }, to: [{ refDes: "U1", pin: "1" }] },
        ],
        designRules: [
          "555 needs minimum ~4.5V — requires multiple solar cells in series",
          "f ≈ 1.44 / ((R1 + 2×R2) × C1) ≈ 686 Hz with values shown",
          "CMOS 555 (TLC555) works down to 2V if lower solar voltage expected",
        ],
      },
    ],
    designRules: [
      "Use CMOS TLC555 for operation at lower voltages (2V minimum)",
      "Standard NE555 draws ~10mA — needs bright sunlight or large solar panel",
    ],
    notes: "From Mims Solar Cell Projects p43. Standard 555 circuit but solar-powered. For REC: solar-powered signaling, light-level audio indicator (pitch varies with light). Consider TLC555 CMOS version for lower power and lower voltage operation. The classic NE555 needs more current than the CMOS 4011B version but produces louder output.",
  },

  // ──────────────────────────────────────────────────
  // Light-Controlled 555 Oscillator (Multi-Cell Input)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-light-controlled-555",
    name: "Light-Controlled 555 Oscillator (7 Solar Cell Inputs)",
    description: "555 astable oscillator with 7 solar cells connected to a selector switch that feeds the control voltage pin (pin 5). Each cell produces different voltage under light, giving 7 discrete tone selections based on illumination angle and intensity.",
    category: "oscillator",
    blocks: [
      {
        id: "light-controlled-555-block",
        name: "CV-Modulated 555 Oscillator",
        type: "timer",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 timer — frequency modulated via control voltage pin 5" },
          { refDes: "R1", value: "10K", description: "Timing resistor" },
          { refDes: "R2", value: "100K", description: "Timing resistor" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "SW1", description: "7-position rotary switch — selects solar cell input" },
          { refDes: "PC1", description: "Solar cell 1 — control voltage source" },
          { refDes: "PC2", description: "Solar cell 2 — different angle/filter" },
          { refDes: "PC3", description: "Solar cell 3" },
          { refDes: "PC4", description: "Solar cell 4" },
          { refDes: "PC5", description: "Solar cell 5" },
          { refDes: "PC6", description: "Solar cell 6" },
          { refDes: "PC7", description: "Solar cell 7" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — audio output" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "CV", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "SW1", pin: "COM" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "SPKR_GND", from: { refDes: "SPKR1", pin: "-" }, to: [{ refDes: "U1", pin: "1" }] },
        ],
        designRules: [
          "Pin 5 CV voltage directly sets comparator thresholds — lower CV = higher frequency",
          "Solar cells at different angles give different voltages = different tones",
          "Can also use colored filters over cells for wavelength-selective tone mapping",
        ],
      },
    ],
    designRules: [
      "Battery-powered oscillator circuit — solar cells are sensors only, not power",
      "CV pin accepts 0 to +VCC — solar cell voltage in this range gives full tone sweep",
    ],
    notes: "From Mims Solar Cell Projects p44. Creative use of pin 5 control voltage input — each solar cell acts as a light-angle sensor producing different modulation. For REC: multi-point light monitoring with audio feedback, educational demonstration of 555 VCO operation. Could be adapted for REC products: 7 solar cells at different angles around a grill dome could indicate sun position via tone.",
  },

  // ──────────────────────────────────────────────────
  // High-Gain Light-Controlled Tone (741 + 555)
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-highgain-tone",
    name: "High-Gain Light-Controlled Tone (741 + 555)",
    description: "Two-stage circuit: 741 op-amp amplifies solar cell signal, output controls 555 VCO via pin 5. Extremely sensitive — responds to very dim light changes. Speaker output tone varies continuously with light intensity.",
    category: "sensor-interface",
    blocks: [
      {
        id: "highgain-tone-amplifier",
        name: "741 Light Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — amplifies solar cell photovoltage" },
          { refDes: "PC1", description: "Silicon solar cell — light sensor" },
          { refDes: "R1", value: "1M", description: "Feedback resistor — sets high gain" },
          { refDes: "R2", value: "100K", description: "Input resistor" },
          { refDes: "R3", value: "10K", description: "Gain adjustment potentiometer" },
        ],
        nets: [
          { name: "SOLAR_IN", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "INV_IN", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "W" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "PC1", pin: "-" }, to: [] },
        ],
      },
      {
        id: "highgain-tone-vco",
        name: "555 VCO Tone Generator",
        type: "timer",
        components: [
          { refDes: "U2", partNumber: "NE555", description: "555 timer as VCO — frequency set by pin 5 control voltage" },
          { refDes: "R4", value: "10K", description: "Timing resistor" },
          { refDes: "R5", value: "100K", description: "Timing resistor" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "C2", value: "0.01µF", description: "Output coupling capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — tone output" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U2", pin: "8" }, to: [{ refDes: "U2", pin: "4" }, { refDes: "R4", pin: "1" }] },
          { name: "GND", from: { refDes: "U2", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U2", pin: "7" }, to: [{ refDes: "R4", pin: "2" }, { refDes: "R5", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "R5", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "CV_IN", from: { refDes: "U2", pin: "5" }, to: [] },
          { name: "OUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "SPKR", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "SPKR_GND", from: { refDes: "SPKR1", pin: "-" }, to: [{ refDes: "U2", pin: "1" }] },
        ],
        placementNotes: "Connect U1 pin 6 (AMP_OUT) to U2 pin 5 (CV_IN) to modulate tone with light level.",
      },
    ],
    designRules: [
      "Dual-supply ±9V for 741 stage, +9V for 555 stage",
      "Adjust R3 to center 741 output in mid-range for best VCO modulation",
      "Shield solar cell from artificial light flicker (fluorescent/LED) which causes audible hum",
    ],
    notes: "From Mims Solar Cell Projects p45. High-sensitivity light-to-tone converter — the 741 preamplifier stage gives much greater sensitivity than driving the 555 directly. For REC: precision light monitoring with audio feedback, detecting very small light changes (cloud shadows, partial beam interruption). Pinball: ultra-sensitive opto sensor with audio debugging output.",
  },

  // ──────────────────────────────────────────────────
  // IR Remote Control Testers
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-ir-testers",
    name: "IR Remote Control Testers",
    description: "Two simple circuits for testing whether an IR remote control is transmitting. Transistor version: phototransistor drives piezo buzzer directly — buzzes when IR detected. Op-amp version: 741 amplifies photodiode signal to drive both piezo and LED indicator.",
    category: "test-equipment",
    blocks: [
      {
        id: "ir-tester-transistor",
        name: "Simple Transistor IR Tester",
        type: "sensor-interface",
        components: [
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — amplifies phototransistor signal" },
          { refDes: "Q2", description: "IR phototransistor — detects IR pulses from remote" },
          { refDes: "R1", value: "100K", description: "Phototransistor load resistor" },
          { refDes: "R2", value: "10K", description: "Base bias resistor" },
          { refDes: "PZ1", description: "Piezo buzzer — sounds when IR detected" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "PZ1", pin: "+" }] },
          { name: "SENSE", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R2", pin: "1" }] },
          { name: "BASE", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "BUZZER", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "PZ1", pin: "-" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "Point remote directly at phototransistor from close range",
          "Buzzer should produce modulated tone matching remote's carrier frequency (~38kHz)",
          "Works with any IR remote — just detects presence of IR, not protocol",
        ],
      },
      {
        id: "ir-tester-opamp",
        name: "Op-Amp IR Tester with LED",
        type: "sensor-interface",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — amplifies IR photodiode signal" },
          { refDes: "D1", description: "IR photodiode — detects IR pulses" },
          { refDes: "R1", value: "10M", description: "Transimpedance feedback resistor — high gain" },
          { refDes: "R2", value: "10K", description: "Offset adjust potentiometer" },
          { refDes: "R3", value: "470", description: "LED current limiting resistor" },
          { refDes: "LED1", description: "Visible LED — lights when IR detected" },
          { refDes: "PZ1", description: "Piezo buzzer — sounds when IR detected" },
          { refDes: "C1", value: "0.1µF", description: "AC coupling capacitor — blocks DC, passes IR pulses" },
        ],
        nets: [
          { name: "IR_IN", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "FB", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "6" }] },
          { name: "REF", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R2", pin: "W" }] },
          { name: "OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "AC_OUT", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "PZ1", pin: "+" }, { refDes: "R3", pin: "1" }] },
          { name: "LED_K", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "D1", pin: "A" }, to: [{ refDes: "LED1", pin: "K" }, { refDes: "PZ1", pin: "-" }] },
        ],
        designRules: [
          "10M feedback resistor gives very high transimpedance gain",
          "C1 AC coupling ensures only pulsed IR signals are detected, not ambient IR",
          "Adjust R2 to null output in absence of IR signal",
          "Op-amp version is more sensitive and has visual + audio indication",
        ],
      },
    ],
    designRules: [
      "Both circuits detect any IR remote regardless of protocol (NEC, RC5, etc.)",
      "Transistor version: simpler, fewer parts, audio only",
      "Op-amp version: more sensitive, dual indication (LED + piezo), better ambient rejection",
    ],
    notes: "From Mims Solar Cell Projects p46-47. Essential bench tool for debugging IR systems. For REC: testing IR remotes for pinball machines, verifying IR LED output on custom boards, quick go/no-go check for any IR transmitter. The op-amp version with AC coupling is particularly useful — it rejects ambient IR from sunlight and fluorescent lights, only responding to modulated IR from remotes.",
  },

  // ──────────────────────────────────────────────────
  // Solar-Powered Night Light
  // ──────────────────────────────────────────────────
  {
    id: "mims-solar-night-light",
    name: "Solar-Powered Night Light",
    description: "Self-contained solar night light: solar panel charges NiCd battery during day, CdS photoresistor detects darkness and triggers 2N2222 to turn on LED. Fully automatic — charges by day, lights at night.",
    category: "led",
    blocks: [
      {
        id: "solar-night-light-block",
        name: "Solar Charger + Dark Detector + LED",
        type: "sensor-interface",
        components: [
          { refDes: "PC1", description: "Solar panel — charges battery during daylight" },
          { refDes: "D1", partNumber: "1N4148", description: "Blocking diode — prevents battery discharge through solar cell at night" },
          { refDes: "B1", value: "2×AA NiCd", description: "Rechargeable NiCd battery pack — 2.4V" },
          { refDes: "R1", description: "CdS photoresistor — high resistance in dark, low in light" },
          { refDes: "R2", value: "10K", description: "Voltage divider with CdS — sets light/dark threshold" },
          { refDes: "Q1", partNumber: "2N2222", description: "NPN switch — turns on LED when dark" },
          { refDes: "R3", value: "100", description: "LED current limiting resistor" },
          { refDes: "LED1", description: "White or warm-white LED — night light output" },
        ],
        nets: [
          { name: "SOLAR_OUT", from: { refDes: "PC1", pin: "+" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "BATT_POS", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "B1", pin: "+" }, { refDes: "R1", pin: "1" }, { refDes: "R3", pin: "1" }] },
          { name: "DIVIDER", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "Q1", pin: "B" }] },
          { name: "LED_A", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "LED_SW", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "B1", pin: "-" }, { refDes: "PC1", pin: "-" }] },
        ],
        designRules: [
          "Blocking diode D1 is essential — without it, battery discharges through solar cell at night",
          "CdS resistance: ~1KΩ in bright light, >1MΩ in dark — voltage divider swings Q1 base",
          "Adjust R2 to set desired darkness threshold for LED turn-on",
          "NiCd cells only — NiMH or Li-ion need proper charge controllers",
          "Solar panel must produce higher voltage than battery + diode drop for charging",
        ],
      },
    ],
    designRules: [
      "Solar panel voltage must exceed battery voltage + 0.6V diode drop",
      "Limit charge current to C/10 of battery capacity for NiCd safety",
      "CdS cell must be shielded from LED output to prevent feedback oscillation",
      "For outdoor use, conformal coat or pot the circuit",
    ],
    notes: "From Mims Solar Cell Projects p48. Classic garden solar light circuit — the fundamental design behind billions of commercial solar garden lights. For REC: solar-powered status indicators for outdoor equipment, emergency lighting for grill controllers during power outage, prototype solar garden light. The CdS photoresistor is the key — it acts as both the light sensor AND the day/night switch. Important: mount CdS cell away from LED to prevent optical feedback loop.",
  },

  // ══════════════════════════════════════════════════
  // Mims Communications Projects — new circuits only
  // (AM lightwave TX/RX, photophone, 555 PFM lightwave already in other sections)
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Code Practice Oscillator (555)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-code-practice-osc",
    name: "Code Practice Oscillator (555)",
    description: "555 astable oscillator with telegraph key. Pressing key completes circuit, generating audio tone through speaker. R1 controls frequency (use potentiometer). Standard Morse code trainer.",
    category: "oscillator",
    blocks: [
      {
        id: "cpo-555-block",
        name: "555 Code Practice Oscillator",
        type: "timer",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 timer in astable mode — generates audio tone" },
          { refDes: "R1", value: "100K", description: "Frequency control potentiometer" },
          { refDes: "R2", value: "1K", description: "Timing resistor — sets duty cycle" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "C2", value: "4.7µF", description: "Output coupling capacitor to speaker" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — audio output" },
          { refDes: "SW1", description: "Telegraph key or pushbutton — completes circuit to sound tone" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "SW1", pin: "1" }, to: [] },
          { name: "VCC", from: { refDes: "SW1", pin: "2" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "SPKR_GND", from: { refDes: "SPKR1", pin: "-" }, to: [{ refDes: "U1", pin: "1" }] },
        ],
        designRules: [
          "Insert additional resistor in series with speaker to reduce volume",
          "Use potentiometer for R1 to adjust frequency to comfortable listening tone",
          "Telegraph key preferred over pushbutton for authentic Morse code practice",
        ],
      },
    ],
    designRules: [
      "Output ~950Hz with values shown — adjust R1 for preferred pitch",
      "Key switches power to entire circuit — no quiescent draw when idle",
    ],
    notes: "From Mims Communications Projects p11. Standard Morse code practice oscillator. For REC: educational tool, audio continuity tester (replace key with test probes), alarm tone generator. The key-in-power-rail design means zero battery drain when not in use. Can also connect two units via wire for 2-person practice.",
  },

  // ──────────────────────────────────────────────────
  // Solid-State Telegraph System (555 Sender + Sounders)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-telegraph-system",
    name: "Solid-State Telegraph System",
    description: "Complete telegraph system: 555 tone sender transmits over 1 or 2 wires, received by 741+386 amplifier sounder (1-wire with earth return) or 386-only sounder (2-wire). Range of hundreds of feet.",
    category: "communication",
    blocks: [
      {
        id: "telegraph-sender",
        name: "555 Telegraph Sender",
        type: "timer",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 astable — generates ~950Hz tone when key pressed" },
          { refDes: "R1", value: "10K", description: "Frequency control — use potentiometer to change frequency" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
          { refDes: "SW1", description: "Telegraph key or pushbutton" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "KEY", from: { refDes: "SW1", pin: "1" }, to: [{ refDes: "U1", pin: "8" }] },
          { name: "WIRE_OUT", from: { refDes: "U1", pin: "3" }, to: [] },
        ],
        placementNotes: "Output pin 3 connects to wire(s) running to sounder. For 1-wire operation, use earth ground at both ends (metal stake several feet in moist earth).",
      },
      {
        id: "telegraph-sounder-1wire",
        name: "1-Wire Telegraph Sounder (741+386)",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — preamplifier with adjustable gain" },
          { refDes: "U2", partNumber: "LM386", description: "386 audio power amplifier — drives speaker" },
          { refDes: "R1", value: "1K", description: "741 input resistor" },
          { refDes: "R2", value: "100K", description: "741 feedback resistor — gain = R2/R1 = 100" },
          { refDes: "R3", value: "10K", description: "386 volume control potentiometer" },
          { refDes: "R4", value: "1K", description: "741 inverting input bias resistor" },
          { refDes: "C1", value: "1µF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "10µF", description: "741 to 386 coupling capacitor" },
          { refDes: "C3", value: "100µF", description: "386 output coupling capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — can be very loud" },
        ],
        nets: [
          { name: "WIRE_IN", from: { refDes: "C1", pin: "+" }, to: [] },
          { name: "INV_IN", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C2", pin: "+" }] },
          { name: "VOL", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "386_IN", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "386_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C3", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C3", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "R4", pin: "2" }, { refDes: "R1", pin: "1" }, { refDes: "SPKR1", pin: "-" }] },
        ],
        placementNotes: "1-wire version uses earth ground return. Metal stake several feet in moist earth at each end. 10+ feet apart. Volume can be very loud — do not use earphone.",
      },
      {
        id: "telegraph-sounder-2wire",
        name: "2-Wire Telegraph Sounder (386 only)",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", partNumber: "LM386", description: "386 audio power amplifier — simpler than 1-wire version" },
          { refDes: "R1", value: "10K", description: "Volume control potentiometer" },
          { refDes: "C1", value: "1µF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "100µF", description: "Output coupling capacitor" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "WIRE_IN", from: { refDes: "C1", pin: "+" }, to: [] },
          { name: "VOL_IN", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "386_IN", from: { refDes: "R1", pin: "W" }, to: [{ refDes: "U1", pin: "3" }] },
          { name: "+9V", from: { refDes: "U1", pin: "6" }, to: [] },
          { name: "386_OUT", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "SPKR1", pin: "-" }] },
        ],
        placementNotes: "2-wire version: signal wire + ground wire. Simpler, no earth ground needed. For more gain, add 10µF from pin 1 to pin 8 of 386. Do not use earphone — volume can be very loud.",
      },
    ],
    designRules: [
      "CAUTION: Never install telegraph wires near outdoor power lines",
      "1-wire earth-return version needs moist soil — won't work in dry/frozen ground",
      "2-wire version is more reliable — use shielded cable for long runs to reduce hum",
      "Bypass power supply pins of ICs with 0.1µF capacitors to ground",
    ],
    notes: "From Mims Communications Projects p14-15. Complete wired telegraph system with sender and two sounder options. For REC: wired intercom between buildings, long-distance signaling in factories/warehouses, educational Morse code system. The 1-wire earth-return version is historically interesting — early telegraphs used this same technique. The 2-wire version using just a 386 is the simplest practical intercom amplifier.",
  },

  // ──────────────────────────────────────────────────
  // Push-to-Talk Intercom (741 + 386)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-intercom",
    name: "Push-to-Talk Intercom (741 + 386)",
    description: "Two-station intercom using 741 preamplifier and 386 power amplifier at each station. DPDT switch selects talk/listen mode — speaker doubles as microphone in talk mode. Shielded cable between stations.",
    category: "communication",
    blocks: [
      {
        id: "intercom-base-station",
        name: "Base Station (741 + 386)",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — microphone/speaker preamplifier" },
          { refDes: "U2", partNumber: "LM386", description: "386 audio power amplifier" },
          { refDes: "R1", value: "1K", description: "741 input resistor" },
          { refDes: "R2", value: "100K", description: "741 feedback resistor — gain = 100" },
          { refDes: "R3", value: "10K", description: "Volume control potentiometer" },
          { refDes: "R4", value: "1K", description: "741 bias resistor" },
          { refDes: "C1", value: "1µF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "100µF", description: "Output coupling capacitor" },
          { refDes: "SW1", description: "DPDT switch — position 1: talk, position 2: listen" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — also functions as microphone in talk mode" },
        ],
        nets: [
          { name: "SPKR_A", from: { refDes: "SPKR1", pin: "+" }, to: [{ refDes: "SW1", pin: "1A" }] },
          { name: "TALK_IN", from: { refDes: "SW1", pin: "COM_A" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "AMP_IN", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "TO_LINE", from: { refDes: "SW1", pin: "COM_B" }, to: [] },
          { name: "386_IN", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "386_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R4", pin: "2" }] },
        ],
        designRules: [
          "DPDT switch routes speaker to either 741 input (talk) or 386 output (listen)",
          "Speaker works as dynamic microphone when connected to 741 input — low output, needs high gain",
          "Use electret microphone instead of speaker-as-mic for better voice quality",
          "R2 controls 741 gain — OK to use fixed resistor instead of potentiometer",
          "R3 controls volume",
        ],
      },
    ],
    designRules: [
      "Use shielded cable between stations to reduce power line hum — ground the shield",
      "Each station needs its own 9V battery (or ±9V for 741 dual supply)",
      "Bypass all IC power pins with 0.1µF to ground",
      "Add on/off switch to save battery life",
      "Remote station circuit is identical to base station",
    ],
    notes: "From Mims Communications Projects p17. Simple 2-station intercom — each station is identical with DPDT talk/listen switch. For REC: wired intercom between workshop areas, communication between control room and equipment location, voice monitoring. The speaker-as-microphone trick works because dynamic speakers are structurally identical to dynamic microphones — just less sensitive. Upgrade: use electret mic with bias resistor for better TX quality.",
  },

  // ──────────────────────────────────────────────────
  // PFM Lightwave Voice TX/RX
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-pfm-lightwave-voice",
    name: "PFM Lightwave Voice Communicator",
    description: "Pulse-frequency modulated lightwave voice link. Transmitter: 741 amplifies mic signal, modulates 555 pulse rate driving IR LED. Receiver: phototransistor + 741 amplifier + 741 comparator (pulse regeneration) + RC low-pass filter + 386 speaker amp. PFM gives uniform volume over entire reception range — unlike AM which fades with distance.",
    category: "communication",
    blocks: [
      {
        id: "pfm-voice-tx",
        name: "PFM Lightwave Voice Transmitter",
        type: "communication",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — microphone preamplifier" },
          { refDes: "U2", partNumber: "NE555", description: "555 VCO — pulse rate modulated by audio" },
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — LED driver for higher current" },
          { refDes: "R1", value: "1K", description: "741 input resistor" },
          { refDes: "R2", value: "100K", description: "741 feedback resistor" },
          { refDes: "R3", value: "1K", description: "741 bias" },
          { refDes: "R4", value: "1K", description: "555 timing resistor" },
          { refDes: "R5", value: "100K", description: "555 frequency adjust — set so tone not heard at receiver" },
          { refDes: "R6", value: "1K", description: "555 timing resistor" },
          { refDes: "R7", value: "10", description: "LED current limiting resistor" },
          { refDes: "C1", value: "0.1µF", description: "Mic input coupling capacitor" },
          { refDes: "C2", value: "0.01µF", description: "741 to 555 coupling" },
          { refDes: "C3", value: "10µF", description: "Audio coupling capacitor" },
          { refDes: "LED1", description: "IR LED — pulsed by 555 output via Q1" },
          { refDes: "MIC1", description: "Electret microphone" },
        ],
        nets: [
          { name: "MIC_OUT", from: { refDes: "MIC1", pin: "+" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "INV_IN", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C3", pin: "+" }] },
          { name: "CV_MOD", from: { refDes: "C3", pin: "-" }, to: [{ refDes: "U2", pin: "5" }] },
          { name: "555_OUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "R5", pin: "2" }] },
          { name: "BASE", from: { refDes: "R5", pin: "1" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "LED_DRIVE", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R7", pin: "1" }] },
          { name: "LED_OUT", from: { refDes: "R7", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }, { refDes: "LED1", pin: "K" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U2", pin: "1" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "R1", pin: "1" }, { refDes: "R3", pin: "2" }] },
        ],
        placementNotes: "Use super-bright IR LED with lens for maximum range. Keep battery leads short. R5 controls 555 carrier frequency — adjust so carrier tone is not audible at receiver.",
      },
      {
        id: "pfm-voice-rx",
        name: "PFM Lightwave Voice Receiver",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp #1 — pulse amplifier" },
          { refDes: "U2", partNumber: "LM741", description: "741 op-amp #2 — comparator (pulse regeneration)" },
          { refDes: "U3", partNumber: "LM386", description: "386 audio power amplifier" },
          { refDes: "Q1", description: "Phototransistor — IR pulse detector" },
          { refDes: "R1", value: "100K", description: "Phototransistor load resistor" },
          { refDes: "R2", value: "1M", description: "741 #1 feedback — high gain" },
          { refDes: "R3", value: "1K", description: "741 #1 bias" },
          { refDes: "R4", value: "10K", description: "Comparator threshold adjust" },
          { refDes: "R5", value: "1K", description: "Low-pass filter resistor" },
          { refDes: "R6", value: "10K", description: "386 volume control" },
          { refDes: "C1", value: "0.1µF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "100µF", description: "386 output coupling" },
          { refDes: "C3", value: "1µF", description: "Low-pass filter capacitor — with R5 demodulates PFM to audio" },
          { refDes: "C4", value: "0.1µF", description: "Power supply bypass" },
          { refDes: "C5", value: "0.1µF", description: "Power supply bypass" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — can be very loud, do not use earphone" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "7" }, { refDes: "U3", pin: "6" }, { refDes: "R1", pin: "1" }] },
          { name: "SENSE", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "C1", pin: "+" }] },
          { name: "AMP1_IN", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP1_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "U2", pin: "3" }] },
          { name: "COMP_REF", from: { refDes: "R4", pin: "W" }, to: [{ refDes: "U2", pin: "2" }] },
          { name: "COMP_OUT", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "DEMOD", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "C3", pin: "+" }, { refDes: "R6", pin: "1" }] },
          { name: "VOL", from: { refDes: "R6", pin: "W" }, to: [{ refDes: "U3", pin: "3" }] },
          { name: "386_OUT", from: { refDes: "U3", pin: "5" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "4" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "U3", pin: "2" }, { refDes: "R3", pin: "2" }, { refDes: "C3", pin: "-" }, { refDes: "SPKR1", pin: "-" }] },
        ],
        designRules: [
          "Shield phototransistor from ambient light — use collimator tube",
          "Use developed color film as IR filter if transmitter uses IR LED",
          "R5+C3 form low-pass filter that demodulates PFM back to audio",
          "Increase C3 from 1µF to 10µF to change emphasis from high to low frequencies",
          "R4 sets comparator threshold — adjusts to clean up noisy pulses",
          "Keep C4 and C5 bypass caps close to ICs to prevent oscillation",
        ],
      },
    ],
    designRules: [
      "PFM advantage: uniform volume regardless of distance (unlike AM which fades)",
      "PFM disadvantage: more complex receiver than AM",
      "Use lenses on both TX and RX for maximum range (several hundred feet possible)",
      "At night with lenses, range of several hundred or more feet is possible",
    ],
    notes: "From Mims Communications Projects p30-31. Superior to AM lightwave for voice because volume stays constant — only signal quality degrades at extreme range. For REC: optical voice link across electrically isolated areas, communication through high-voltage barriers, secure point-to-point voice link (can't be intercepted without being in the beam path). The dual-741 receiver with comparator pulse regeneration is the key innovation — it restores pulse shape regardless of signal strength.",
  },

  // ──────────────────────────────────────────────────
  // Simple Diode Receiver (Crystal Radio)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-diode-receiver",
    name: "Simple Diode Receiver (Crystal Radio)",
    description: "Classic crystal radio: antenna signal is tuned by L1+C1 LC tank, rectified by germanium diode D1, audio heard through crystal earphone. No battery needed — powered entirely by radio waves. Add 741+386 amplifier for speaker output.",
    category: "communication",
    blocks: [
      {
        id: "diode-rx-basic",
        name: "Basic Diode Receiver",
        type: "sensor-interface",
        components: [
          { refDes: "L1", description: "RF tuning coil — 30ga magnet wire on plastic film can, slider tunes inductance" },
          { refDes: "D1", description: "Germanium diode (1N34A) — rectifies RF to extract audio envelope" },
          { refDes: "C1", value: "470pF", description: "Tuning capacitor — resonates with L1 to select station" },
        ],
        nets: [
          { name: "ANT", from: { refDes: "L1", pin: "1" }, to: [] },
          { name: "TUNED", from: { refDes: "L1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }, { refDes: "C1", pin: "1" }] },
          { name: "AUDIO", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Must use germanium diode (1N34A) — silicon diodes have too high forward voltage to rectify weak RF",
          "Antenna: 10 feet or longer wire, indoor or outdoor",
          "Output: crystal earphone (high impedance) or connect to amplifier",
          "Slide wire across coil to tune — some stations will coincide with one winding",
        ],
      },
      {
        id: "diode-rx-amplified",
        name: "Amplified Receiver (741 + 386)",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — RF audio preamplifier" },
          { refDes: "U2", partNumber: "LM386", description: "386 audio power amplifier" },
          { refDes: "C2", value: "1µF", description: "Diode to 741 coupling capacitor" },
          { refDes: "R1", value: "1K", description: "741 input resistor" },
          { refDes: "R2", value: "100K", description: "741 feedback — gain control" },
          { refDes: "R3", value: "10K", description: "386 volume control" },
          { refDes: "R4", value: "1K", description: "741 bias resistor" },
          { refDes: "C3", value: "10µF", description: "741 to 386 coupling" },
          { refDes: "C4", value: "100µF", description: "386 output coupling" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker — loud pops when tuning, do not use earphone" },
        ],
        nets: [
          { name: "AUDIO_IN", from: { refDes: "C2", pin: "+" }, to: [] },
          { name: "INV_IN", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C3", pin: "+" }] },
          { name: "VOL", from: { refDes: "C3", pin: "-" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "386_IN", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "386_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C4", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C4", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R4", pin: "2" }, { refDes: "SPKR1", pin: "-" }] },
        ],
        placementNotes: "Connect D1 cathode (AUDIO output from basic receiver) to C2+ input. CAUTION: Volume can be very loud when slider is moved — do not use earphones.",
      },
    ],
    designRules: [
      "Antenna length determines which stations can be received",
      "Tuning is sensitive — slide wire slowly across coil",
      "R2 on 741 controls gain — R3 on 386 controls volume",
    ],
    notes: "From Mims Communications Projects p34-35. The crystal radio is the simplest possible radio receiver — no batteries needed for basic version. For REC: AM radio reception for weather monitoring, educational demonstration of radio principles, RF signal detector for EMI testing. The amplified version with 741+386 drives a speaker and is surprisingly sensitive — Mims reports receiving shortwave stations from Asia, Europe, South America on a 14-foot indoor antenna.",
  },

  // ──────────────────────────────────────────────────
  // Shortwave Receiver (741 + 386)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-shortwave-receiver",
    name: "Shortwave Receiver (741 + 386)",
    description: "Simple shortwave receiver covering 1-6 MHz. Antenna signal tuned by L1 coil (slider) and variable capacitor C1, rectified by germanium diode, amplified by 741 preamplifier and 386 speaker amplifier. Receives international broadcasts, amateur radio, CB, and utility stations.",
    category: "communication",
    blocks: [
      {
        id: "shortwave-rx-block",
        name: "Shortwave Receiver",
        type: "audio-amplifier",
        components: [
          { refDes: "L1", description: "RF tuning coil — 25-50 turns of 30ga magnet wire on plastic film can" },
          { refDes: "D1", description: "Germanium diode (1N34A) — AM envelope detector" },
          { refDes: "C1", value: "10-365pF", description: "Variable tuning capacitor — fine frequency selection" },
          { refDes: "C2", value: "1µF", description: "RF to audio coupling capacitor" },
          { refDes: "R1", value: "1K", description: "741 input resistor" },
          { refDes: "R2", value: "100K", description: "741 feedback — gain/volume control" },
          { refDes: "R3", value: "10K", description: "386 volume control" },
          { refDes: "R4", value: "1K", description: "741 bias resistor" },
          { refDes: "C3", value: "10µF", description: "741 to 386 coupling" },
          { refDes: "C4", value: "100µF", description: "386 output coupling" },
          { refDes: "U1", partNumber: "LM741", description: "741 op-amp — audio preamplifier" },
          { refDes: "U2", partNumber: "LM386", description: "386 power amplifier — drives speaker" },
          { refDes: "SPKR1", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "ANT", from: { refDes: "L1", pin: "1" }, to: [] },
          { name: "TUNED", from: { refDes: "L1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }, { refDes: "C1", pin: "1" }] },
          { name: "DETECTED", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "INV_IN", from: { refDes: "C2", pin: "-" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "C3", pin: "+" }] },
          { name: "VOL", from: { refDes: "C3", pin: "-" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "386_IN", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "386_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C4", pin: "+" }] },
          { name: "SPKR", from: { refDes: "C4", pin: "-" }, to: [{ refDes: "SPKR1", pin: "+" }] },
          { name: "+9V", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "6" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "R1", pin: "1" }, { refDes: "R4", pin: "2" }, { refDes: "SPKR1", pin: "-" }] },
        ],
        designRules: [
          "Tune by adjusting both L1 slider position AND C1 variable capacitor",
          "L1 slider selects frequency range, C1 fine-tunes within that range",
          "Antenna: 10 feet or longer wire — indoor works for strong stations",
          "L1: 25-50 turns of 30ga on plastic film can — see tuning coil construction on p34",
          "C1: 10-365pF variable from salvaged radio, or 10-40pF crystal oscillator tuning cap",
          "CAUTION: Volume can be very loud, especially near local stations — no earphones",
        ],
      },
    ],
    designRules: [
      "Does not separate stations as well as commercial receiver — some overlap expected",
      "Best results in evening when shortwave propagation is strongest",
      "Longer antenna = more stations but more interference between them",
    ],
    notes: "From Mims Communications Projects p37. Surprisingly capable shortwave receiver — Mims reports receiving stations from Asia, Europe, South America, and North America in one evening with a 14-foot indoor antenna. For REC: weather band reception for outdoor equipment, educational radio project, RF signal monitoring. Frequency range 1-6 MHz covers AM broadcast band, 160m/80m/60m/49m amateur/shortwave bands.",
  },

  // ──────────────────────────────────────────────────
  // AM Band Code Transmitter (555 + 2N2222 + LC)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-code-transmitter",
    name: "AM Band Code Transmitter (555 + LC Tank)",
    description: "Low-power AM band transmitter (~700 kHz) for sending Morse code. 555 generates audio tone, 2N2222 transistor oscillator with LC tank radiates RF. Pressing key transmits tone to any nearby AM radio. FCC Part 15 compliant at 3V.",
    category: "communication",
    blocks: [
      {
        id: "code-tx-block",
        name: "555 Code Transmitter",
        type: "oscillator",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 astable — generates audio tone modulating RF oscillator" },
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — RF Hartley oscillator" },
          { refDes: "R1", value: "100K", description: "555 timing resistor" },
          { refDes: "R2", value: "1K", description: "555 timing resistor" },
          { refDes: "R3", value: "50K", description: "RF oscillator bias potentiometer — adjust for clear tone" },
          { refDes: "R4", value: "100", description: "RF emitter resistor" },
          { refDes: "C1", value: "0.01µF", description: "Tap coupling capacitor" },
          { refDes: "C2", value: "0.01µF", description: "555 timing capacitor" },
          { refDes: "C3", value: "470pF", description: "RF feedback capacitor" },
          { refDes: "C4", value: "1µF", description: "555 to RF oscillator coupling" },
          { refDes: "C5", value: "0.005µF", description: "RF tank capacitor — resonates with L1 near 700kHz" },
          { refDes: "L1", description: "Air-core RF coil — 8 feet of 30ga magnet wire on soda straw, center tap" },
          { refDes: "SW1", description: "Telegraph key — press to transmit tone" },
        ],
        nets: [
          { name: "+3V", from: { refDes: "SW1", pin: "1" }, to: [] },
          { name: "VCC", from: { refDes: "SW1", pin: "2" }, to: [{ refDes: "U1", pin: "8" }, { refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "L1", pin: "TAP" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C2", pin: "2" }, { refDes: "R4", pin: "2" }, { refDes: "C5", pin: "2" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C2", pin: "1" }] },
          { name: "555_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "BASE", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "C3", pin: "1" }] },
          { name: "COLLECTOR", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "C3", pin: "2" }, { refDes: "L1", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "EMITTER", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "ANT", from: { refDes: "C5", pin: "1" }, to: [{ refDes: "L1", pin: "2" }] },
        ],
        designRules: [
          "L1: form 1.5 inch loop at center of 8 feet of wire, wind on soda straw with loop through center hole",
          "RF output is clean sine wave near 700kHz — tune nearby AM radio to receive",
          "Adjust R3 for clearest, loudest tone at receiver",
          "Insert small steel nail inside L1 to lower transmission frequency",
          "Use during daytime for maximum AM band range",
          "3V supply + antenna < 3 meters = FCC Part 15 compliant",
        ],
      },
    ],
    designRules: [
      "Maximum antenna length 9 feet 9 inches for FCC Part 15 compliance",
      "3V battery only — higher voltage may exceed FCC Part 15 field strength limits",
      "Keep all wires short for stable oscillation",
      "Transmitting range: several feet to nearby AM radio",
    ],
    notes: "From Mims Communications Projects p44. Low-power AM band transmitter for Morse code practice or short-range signaling. For REC: wireless signaling between workstations, educational RF demonstration, short-range paging. FCC Part 15 compliant when operated at 3V with short antenna. Can also modulate with sensor data — replace R1 with thermistor or CdS photoresistor to transmit temperature or light level as variable tone.",
  },

  // ──────────────────────────────────────────────────
  // AM Band Voice Transmitter (Mic + 2×2N2222 + LC)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-voice-transmitter",
    name: "AM Band Voice Transmitter (Mic + LC Tank)",
    description: "Low-power AM band voice transmitter (~700 kHz). Electret microphone feeds two-stage 2N2222 amplifier that amplitude-modulates a Hartley LC oscillator. Received on any nearby AM radio. FCC Part 15 compliant at 3V with short antenna.",
    category: "communication",
    blocks: [
      {
        id: "voice-tx-block",
        name: "Voice RF Transmitter",
        type: "communication",
        components: [
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — RF Hartley oscillator" },
          { refDes: "Q2", partNumber: "2N2222", description: "NPN transistor — microphone preamplifier" },
          { refDes: "R1", value: "4.7K", description: "Mic bias resistor" },
          { refDes: "R2", value: "150", description: "Q2 emitter resistor" },
          { refDes: "R3", value: "50K", description: "RF oscillator bias — adjust for best sound quality" },
          { refDes: "R4", value: "100", description: "RF emitter resistor" },
          { refDes: "R5", value: "4.7K", description: "Q2 collector load" },
          { refDes: "R6", value: "1K", description: "Q2 base bias" },
          { refDes: "C1", value: "1µF", description: "Mic to Q2 coupling" },
          { refDes: "C2", value: "47µF", description: "Q2 emitter bypass" },
          { refDes: "C3", value: "470pF", description: "RF feedback capacitor" },
          { refDes: "C4", value: "0.1µF", description: "Audio to RF oscillator coupling" },
          { refDes: "C5", value: "0.005µF", description: "RF tank capacitor" },
          { refDes: "L1", description: "Air-core RF coil — 8 feet of 30ga wire on soda straw, center tap" },
          { refDes: "MIC1", description: "Electret microphone" },
        ],
        nets: [
          { name: "+3V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R5", pin: "1" }, { refDes: "L1", pin: "TAP" }] },
          { name: "MIC_OUT", from: { refDes: "MIC1", pin: "+" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "BASE_Q2", from: { refDes: "C1", pin: "-" }, to: [{ refDes: "R6", pin: "1" }, { refDes: "Q2", pin: "B" }] },
          { name: "Q2_COLL", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "R5", pin: "2" }, { refDes: "C4", pin: "+" }] },
          { name: "Q2_EMIT", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C2", pin: "+" }] },
          { name: "RF_BIAS", from: { refDes: "C4", pin: "-" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "RF_BASE", from: { refDes: "R3", pin: "W" }, to: [{ refDes: "Q1", pin: "B" }, { refDes: "C3", pin: "1" }] },
          { name: "RF_COLL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "C3", pin: "2" }, { refDes: "L1", pin: "1" }] },
          { name: "RF_EMIT", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "ANT", from: { refDes: "C5", pin: "1" }, to: [{ refDes: "L1", pin: "2" }] },
          { name: "GND", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "C5", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C2", pin: "-" }, { refDes: "R6", pin: "2" }, { refDes: "MIC1", pin: "-" }] },
        ],
        designRules: [
          "Adjust R3 for best sound quality — retune AM radio as necessary",
          "Use electret microphone — OK to connect 1K:8Ω transformer to use 8Ω speaker jack input",
          "RF output is clean sine wave near 700kHz",
          "Keep all wires short for stable RF oscillation",
          "Maximum antenna 9 feet 9 inches for FCC compliance at 3V",
        ],
      },
    ],
    designRules: [
      "FCC Part 15 compliant at 3V with antenna < 3 meters",
      "Sound quality is good — intelligible speech",
      "Place microphone close to tape recorder earphone to retransmit recordings",
    ],
    notes: "From Mims Communications Projects p45. Low-power AM voice transmitter — speak into mic and hear on nearby AM radio. For REC: wireless audio monitoring, short-range voice announcements, baby monitor, educational AM radio demonstration. The two-transistor design is efficient — Q2 amplifies mic signal, which modulates Q1's RF oscillator bias. Same LC tank and coil construction as code transmitter.",
  },

  // ──────────────────────────────────────────────────
  // Automatic Tone Transmitter (Dual 555 + FM Band)
  // ──────────────────────────────────────────────────
  {
    id: "mims-comm-auto-tone-tx",
    name: "Automatic Tone Transmitter (Dual 555 + FM Band)",
    description: "Transmits brief 1/4 second tone burst every 10 seconds to an FM band receiver up to a few hundred feet away. Dual 555 timers: one generates audio tone, other controls burst interval. 2N3906 PNP gates tone to 2N2222 Hartley RF oscillator near 100 MHz. FCC Part 15 compliant. For paging, tracking, remote notification.",
    category: "communication",
    blocks: [
      {
        id: "auto-tone-tx-block",
        name: "FM Band Tone Burst Transmitter",
        type: "oscillator",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 #1 — audio tone source" },
          { refDes: "U2", partNumber: "NE555", description: "555 #2 — interval timer (10 second period, 1/4 sec burst)" },
          { refDes: "Q1", partNumber: "2N3906", description: "PNP transistor — gates tone to RF oscillator during burst" },
          { refDes: "Q2", partNumber: "2N2222", description: "NPN transistor — RF Hartley oscillator near 100 MHz" },
          { refDes: "R1", value: "100K", description: "555 #1 timing — tone frequency" },
          { refDes: "R2", value: "1K", description: "555 #1 timing" },
          { refDes: "R3", value: "100K", description: "555 #2 timing — interval (with R4, C2)" },
          { refDes: "R4", value: "3.9M", description: "555 #2 timing — sets 10 second interval (2× 2.2M in series)" },
          { refDes: "R5", value: "1K", description: "555 #2 timing" },
          { refDes: "R6", value: "4.7K", description: "PNP base resistor" },
          { refDes: "R7", value: "4.7K", description: "RF oscillator bias" },
          { refDes: "R8", value: "100", description: "RF emitter resistor" },
          { refDes: "C1", value: "0.02µF", description: "555 #1 timing capacitor" },
          { refDes: "C2", value: "3.3µF", description: "555 #2 timing capacitor — interval" },
          { refDes: "C3", value: "0.005µF", description: "Tone coupling capacitor" },
          { refDes: "C4", value: "47pF", description: "RF tank capacitor — use variable cap to tune frequency" },
          { refDes: "C5", value: "4.7pF", description: "RF feedback capacitor" },
          { refDes: "L1", description: "RF coil — 5 turns bare solid hookup wire on 3/8 inch dowel, tap at 1.5 turns" },
          { refDes: "LED1", description: "Red LED — blinks during tone burst transmission" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }, { refDes: "U2", pin: "8" }, { refDes: "U2", pin: "4" }, { refDes: "R3", pin: "1" }, { refDes: "Q1", pin: "E" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "U2", pin: "1" }, { refDes: "C2", pin: "2" }, { refDes: "R8", pin: "2" }] },
          { name: "TONE_DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "TONE_THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "TONE_OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R6", pin: "1" }, { refDes: "C3", pin: "1" }] },
          { name: "INT_DISCH", from: { refDes: "U2", pin: "7" }, to: [{ refDes: "R3", pin: "2" }, { refDes: "R4", pin: "1" }] },
          { name: "INT_THRESH", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "R4", pin: "2" }, { refDes: "R5", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "INT_OUT", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "LED_GATE", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "R6", pin: "2" }] },
          { name: "PNP_COLL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R7", pin: "1" }] },
          { name: "PNP_BASE", from: { refDes: "Q1", pin: "B" }, to: [{ refDes: "C3", pin: "2" }] },
          { name: "RF_BASE", from: { refDes: "R7", pin: "2" }, to: [{ refDes: "Q2", pin: "B" }, { refDes: "C5", pin: "1" }] },
          { name: "RF_COLL", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "C5", pin: "2" }, { refDes: "L1", pin: "1" }] },
          { name: "RF_EMIT", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R8", pin: "1" }] },
          { name: "RF_VCC", from: { refDes: "L1", pin: "TAP" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "ANT", from: { refDes: "L1", pin: "2" }, to: [{ refDes: "C4", pin: "1" }] },
          { name: "ANT_GND", from: { refDes: "C4", pin: "2" }, to: [{ refDes: "U1", pin: "1" }] },
        ],
        designRules: [
          "To adjust: disconnect Q2 collector from C3, tune FM radio until steady tone heard, reconnect",
          "Do NOT operate in continuous tone mode except during adjustment — FCC requires interval operation",
          "FCC 47 CFR 15.113: transmission ≤1 second, silent period ≥30× transmission, minimum 10 sec between",
          "Field strength at 3 meters must be <500 µV/m",
          "Use variable capacitor for C4 to tune frequency",
          "Both 555s can be CMOS/low-power types, but not all CMOS 555s will work",
          "Mount L1 securely — vibration shifts frequency",
          "Install in aluminum box for shielding",
        ],
      },
    ],
    designRules: [
      "Antenna maximum 7 feet for FCC compliance",
      "5V supply — field strength at 3m is <500 µV/m",
      "Replace R1 with photoresistor or thermistor to transmit sensor data as variable tone",
      "Range: up to a few hundred feet to FM radio",
    ],
    notes: "From Mims Communications Projects p46-47. Periodic tone burst transmitter for FM band — useful for tracking, paging, remote notification. For REC: equipment status beacon (put in grill controller to find it), periodic temperature/light telemetry (replace R1 with sensor), asset tracking. The FCC interval rules (47 CFR 15.113) are built into the design — 1/4 second burst every 10 seconds. LED blinks during each transmission for visual confirmation.",
  },

  // ══════════════════════════════════════════════════
  // Mims Schematic Symbols, Device Packages, Design And Testing
  // (test equipment circuits from pp.46-47)
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // 555 Signal Injector (Analog Troubleshooting)
  // ──────────────────────────────────────────────────
  {
    id: "mims-test-signal-injector",
    name: "555 Signal Injector (Analog Troubleshooting)",
    description: "555 timer in astable mode generates a test signal for injecting into audio amplifiers and analog circuits. R1 controls frequency, R3 controls amplitude. Connect output to input of circuit being tested, then use signal tracer to follow signal through each stage to find where distortion or signal loss occurs. +6V (4 AA cells).",
    category: "test-equipment",
    blocks: [
      {
        id: "signal-injector-block",
        name: "555 Signal Injector",
        type: "oscillator",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 timer — astable oscillator signal source" },
          { refDes: "R1", value: "1M", description: "Timing resistor — controls frequency" },
          { refDes: "R2", value: "1K", description: "Timing resistor" },
          { refDes: "R3", value: "10K", description: "Output attenuator — controls signal amplitude" },
          { refDes: "C1", value: "0.01µF", description: "Timing capacitor" },
        ],
        nets: [
          { name: "+6V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "R1", pin: "1" }] },
          { name: "DISCH", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "R2", pin: "1" }] },
          { name: "THRESH", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U1", pin: "2" }, { refDes: "R2", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "OUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "SIGNAL_OUT", from: { refDes: "R3", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "2" }] },
        ],
        designRules: [
          "R1 controls frequency — lower R1 = higher frequency",
          "R3 controls output amplitude — do not exceed tested circuit's supply voltage",
          "Connect output to input of circuit being tested",
          "Use signal tracer to follow injected signal through each stage",
          "Distortion in sound from tracer indicates problem at that stage",
        ],
      },
    ],
    designRules: [
      "Use with signal tracer circuit for systematic analog troubleshooting",
      "Can also test continuity of multi-conductor wire and cable",
    ],
    notes: "From Mims Schematic Symbols, Device Packages, Design And Testing p47. Essential analog troubleshooting tool — inject a known signal at the input and trace it through each stage. Where the signal degrades or disappears is the problem area. For REC: debugging audio amplifier stages in pinball sound boards, testing signal paths in sensor conditioning circuits.",
  },

  // ──────────────────────────────────────────────────
  // Signal Tracer (2-Stage Amplifier)
  // ──────────────────────────────────────────────────
  {
    id: "mims-test-signal-tracer",
    name: "Signal Tracer (2-Stage Transistor Amplifier with Speaker)",
    description: "Two-stage common-emitter amplifier with speaker output for tracing audio-frequency signals through circuits. Probe the input of each stage while injecting a test signal — listen for signal quality and level changes. R1 controls volume. Capacitor-coupled stages with transformer-driven speaker. +9V.",
    category: "test-equipment",
    blocks: [
      {
        id: "signal-tracer-block",
        name: "2-Stage Signal Tracer",
        type: "amplifier",
        components: [
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — first amplifier stage" },
          { refDes: "Q2", partNumber: "2N2222", description: "NPN transistor — second amplifier stage (speaker driver)" },
          { refDes: "R1", value: "10K", description: "Input volume control potentiometer" },
          { refDes: "R2", value: "15K", description: "Q1 base bias" },
          { refDes: "R3", value: "15K", description: "Q1 collector load" },
          { refDes: "R4", value: "100", description: "Q1 emitter resistor" },
          { refDes: "R5", value: "1K", description: "Q2 base bias" },
          { refDes: "R6", value: "15K", description: "Q2 collector load" },
          { refDes: "R7", value: "15K", description: "Q2 bias" },
          { refDes: "R8", value: "100", description: "Q2 emitter resistor" },
          { refDes: "C1", value: "4.7µF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "47µF", description: "Q1 emitter bypass" },
          { refDes: "C3", value: "4.7µF", description: "Interstage coupling capacitor" },
          { refDes: "C4", value: "0.1µF", description: "Output coupling capacitor" },
          { refDes: "C5", value: "47µF", description: "Q2 emitter bypass" },
          { refDes: "T1", description: "Audio output transformer — 1K:8Ω" },
          { refDes: "SPKR1", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R3", pin: "1" }, to: [{ refDes: "R6", pin: "1" }, { refDes: "T1", pin: "PRI_CT" }] },
          { name: "PROBE_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VOL_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "Q1_BASE", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "Q1", pin: "B" }] },
          { name: "Q1_COLL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R3", pin: "2" }, { refDes: "C3", pin: "1" }] },
          { name: "Q1_EMIT", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R4", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "Q2_BASE", from: { refDes: "C3", pin: "2" }, to: [{ refDes: "R5", pin: "1" }, { refDes: "R7", pin: "1" }, { refDes: "Q2", pin: "B" }] },
          { name: "Q2_COLL", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "R6", pin: "2" }, { refDes: "C4", pin: "1" }] },
          { name: "Q2_EMIT", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R8", pin: "1" }, { refDes: "C5", pin: "1" }] },
          { name: "XFMR_IN", from: { refDes: "C4", pin: "2" }, to: [{ refDes: "T1", pin: "PRI_1" }] },
          { name: "SPKR_1", from: { refDes: "T1", pin: "SEC_1" }, to: [{ refDes: "SPKR1", pin: "1" }] },
          { name: "SPKR_2", from: { refDes: "T1", pin: "SEC_2" }, to: [{ refDes: "SPKR1", pin: "2" }] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "R4", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "R7", pin: "2" }, { refDes: "R8", pin: "2" }, { refDes: "C5", pin: "2" }] },
        ],
        designRules: [
          "R1 controls volume from speaker",
          "Touch probe to various points in circuit being tested",
          "Listen for signal quality — distortion indicates problem stage",
          "Signal getting weaker at a stage indicates gain problem",
          "No signal at a stage indicates open connection or dead component",
          "Use with signal injector for systematic troubleshooting",
        ],
      },
    ],
    designRules: [
      "Can substitute LM386 for Q2 + transformer for simpler build",
      "Probe tip should be a short wire or test clip",
    ],
    notes: "From Mims Schematic Symbols, Device Packages, Design And Testing p47. Companion to the signal injector — together they form a complete analog troubleshooting kit. Inject signal at input, probe each stage with tracer, listen for where signal degrades. For REC: debugging audio paths in pinball sound boards, testing amplifier stages in intercom/PA circuits. The 2-stage discrete design can also serve as a general-purpose audio amplifier.",
  },

  // ══════════════════════════════════════════════════
  // Mims Getting Started in Electronics — new circuits only
  // (Chapter 9 "100 Electronic Circuits", pp.100-127)
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // UJT Organ (with note frequency table)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-ujt-organ",
    name: "UJT Organ with Note Frequency Table",
    description: "8-key organ using UJT oscillator with resistor-per-key to set musical note frequencies. 2N4891 UJT drives speaker through 2N2222 amplifier stage. Includes complete resistor-to-frequency mapping table. +9 to +12V.",
    category: "oscillator",
    blocks: [
      {
        id: "ujt-organ-block",
        name: "UJT Organ",
        type: "oscillator",
        components: [
          { refDes: "Q1", partNumber: "2N4891", description: "UJT oscillator — frequency set by selected key resistor" },
          { refDes: "Q2", partNumber: "2N2222", description: "NPN amplifier — boosts UJT output to drive speaker" },
          { refDes: "R1", value: "10K", description: "Key 1 — 5806 Hz" },
          { refDes: "R2", value: "15K", description: "Key 2 — 3988 Hz" },
          { refDes: "R3", value: "22K", description: "Key 3 — 2956 Hz" },
          { refDes: "R4", value: "33K", description: "Key 4 — 1984 Hz" },
          { refDes: "R5", value: "47K", description: "Key 5 — 1393 Hz" },
          { refDes: "R6", value: "68K", description: "Key 6 — 941 Hz" },
          { refDes: "R7", value: "100K", description: "Key 7 — 583 Hz" },
          { refDes: "R8", value: "150K", description: "Key 8 — 430 Hz" },
          { refDes: "R9", value: "100", description: "UJT B1 resistor" },
          { refDes: "R10", value: "10K", description: "UJT B2 resistor" },
          { refDes: "R11", value: "220", description: "Speaker current limiter" },
          { refDes: "R12", value: "100", description: "Amplifier emitter resistor" },
          { refDes: "R13", value: "5K", description: "Volume control potentiometer" },
          { refDes: "C1", value: "0.01µF", description: "UJT timing capacitor — sets frequency range" },
          { refDes: "C2", value: "0.1µF", description: "Coupling capacitor to amplifier" },
          { refDes: "S1", description: "Key switch 1 (momentary)" },
          { refDes: "S2", description: "Key switch 2 (momentary)" },
          { refDes: "S3", description: "Key switch 3 (momentary)" },
          { refDes: "S4", description: "Key switch 4 (momentary)" },
          { refDes: "S5", description: "Key switch 5 (momentary)" },
          { refDes: "S6", description: "Key switch 6 (momentary)" },
          { refDes: "S7", description: "Key switch 7 (momentary)" },
          { refDes: "S8", description: "Key switch 8 (momentary)" },
          { refDes: "SPKR1", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+V", from: { refDes: "R10", pin: "1" }, to: [{ refDes: "R11", pin: "1" }] },
          { name: "UJT_E", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "UJT_B1", from: { refDes: "Q1", pin: "B1" }, to: [{ refDes: "R9", pin: "1" }] },
          { name: "UJT_B2", from: { refDes: "Q1", pin: "B2" }, to: [{ refDes: "R10", pin: "2" }] },
          { name: "GND", from: { refDes: "R9", pin: "2" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "R12", pin: "2" }, { refDes: "SPKR1", pin: "2" }] },
        ],
        designRules: [
          "Each key switch connects its resistor between +V and UJT emitter",
          "Change C1 to alter overall frequency range",
          "R13 controls volume — adjust to taste",
          "Note frequency table (with C1=0.01µF): 10K=5806Hz, 15K=3988Hz, 22K=2956Hz, 33K=1984Hz, 47K=1393Hz, 68K=941Hz, 100K=583Hz, 150K=430Hz",
        ],
      },
    ],
    designRules: [
      "Use momentary pushbutton switches for keys",
      "Add more keys by adding more resistor/switch pairs",
      "Resistor values approximate standard musical intervals",
    ],
    notes: "From Mims Getting Started in Electronics p108. UJT oscillator with selectable timing resistors creates a simple electronic organ. The frequency table provides a practical reference for UJT oscillator design. For REC pinball: score/event sound effects using specific frequencies. The 2N2222 amplifier stage boosts the UJT output for adequate speaker volume.",
  },

  // ──────────────────────────────────────────────────
  // UJT Ramp/Sawtooth Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-ujt-ramp-generator",
    name: "UJT Ramp/Sawtooth Generator",
    description: "UJT relaxation oscillator with 2N2222 emitter follower buffer outputs a ramp (sawtooth) waveform. R3 controls ramp rate. Output is gradually increasing voltage that resets when UJT fires. +9V.",
    category: "oscillator",
    blocks: [
      {
        id: "ujt-ramp-block",
        name: "Ramp Generator",
        type: "oscillator",
        components: [
          { refDes: "Q1", partNumber: "2N4891", description: "UJT — generates ramp timing" },
          { refDes: "Q2", partNumber: "2N2222", description: "NPN emitter follower — buffers ramp voltage from C1" },
          { refDes: "R1", value: "100", description: "UJT B1 resistor" },
          { refDes: "R2", value: "47", description: "UJT B2 resistor" },
          { refDes: "R3", value: "100K", description: "Timing resistor — controls ramp rate" },
          { refDes: "R4", value: "10K", description: "Emitter follower base bias" },
          { refDes: "R5", value: "1K", description: "Emitter follower output resistor" },
          { refDes: "C1", value: "0.001-22µF", description: "Timing capacitor — larger values = slower ramps" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R3", pin: "1" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "RAMP", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "R3", pin: "2" }, { refDes: "R4", pin: "1" }] },
          { name: "UJT_B1", from: { refDes: "Q1", pin: "B1" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "UJT_B2", from: { refDes: "Q1", pin: "B2" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "BUFFER_IN", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "Q2", pin: "B" }] },
          { name: "OUT", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "GND", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "R5", pin: "2" }] },
        ],
        designRules: [
          "Q2 samples voltage on C1 and outputs as buffered ramp waveform",
          "R3 controls rate at which ramps are produced",
          "Output swings from ~0V to ~5.4V (60% of Vbb) before resetting",
          "C1 range: 0.001µF for fast ramps, 22µF for very slow ramps",
        ],
      },
    ],
    designRules: [
      "Use as voltage ramp source for VCOs, ADCs, or sweep generators",
      "Output impedance is low thanks to emitter follower buffer",
    ],
    notes: "From Mims Getting Started in Electronics p109. Classic UJT ramp generator with emitter follower buffer. Ramps supply gradually increasing voltage — useful for sweep generators, motor ramp-up circuits, LED fading effects. For REC: use as slow-rise voltage source for lighting effects, or as timebase for analog measurements.",
  },

  // ──────────────────────────────────────────────────
  // High Voltage Power Supply (9V → 220V DC)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-high-voltage-supply",
    name: "High Voltage DC Power Supply (9V to 220V)",
    description: "Blocking oscillator using 2N2222 and 2N2907 complementary pair drives a 120V-to-6.3V transformer in reverse, producing 220V DC pulses from a 9V battery. Powers neon lamps through 1M series resistor. CAUTION: lethal voltage.",
    category: "power-supply",
    blocks: [
      {
        id: "hv-supply-block",
        name: "High Voltage Blocking Oscillator",
        type: "power-supply",
        components: [
          { refDes: "Q1", partNumber: "2N2222", description: "NPN transistor — oscillator driver" },
          { refDes: "Q2", partNumber: "2N2907", description: "PNP transistor — complementary oscillator" },
          { refDes: "R1", value: "27K", description: "Oscillator bias resistor" },
          { refDes: "C1", value: "0.1µF", description: "Timing/feedback capacitor — experiment with value" },
          { refDes: "T1", description: "120V-to-6.3V transformer — driven in reverse (6.3V winding is primary)" },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "T1", pin: "GREEN" }] },
          { name: "Q1_BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "Q1_COLL", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "Q2", pin: "B" }] },
          { name: "Q2_COLL", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "T1", pin: "BLACK" }] },
          { name: "Q2_EMIT", from: { refDes: "Q2", pin: "E" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "C1", pin: "2" }] },
        ],
        designRules: [
          "DANGER: Output is 220V DC — can cause serious injury or death",
          "T1 may hum in use — this is normal",
          "9V battery produces 220V; 1.5V flashlight cell produces ~170V",
          "Use 1M series resistor when powering neon lamps",
          "Do NOT touch output connections while powered",
          "Experiment with C1 value for optimal operation",
        ],
      },
    ],
    designRules: [
      "CAUTION: This circuit produces dangerous high voltage",
      "Never operate without proper insulation and enclosure",
      "Use only for powering neon indicator lamps or similar high-impedance loads",
    ],
    notes: "From Mims Getting Started in Electronics p105. Complementary blocking oscillator drives transformer in reverse to step up voltage ~35×. For REC: useful for powering neon indicators, Geiger tubes, or nixie tube displays from battery supply. The circuit will power one or more neon lamps through a 1M series resistor. Always enclose and insulate — 220V is lethal.",
  },

  // ──────────────────────────────────────────────────
  // LASCR Light-Activated Latching Circuits
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-lascr-latching",
    name: "LASCR Light-Activated Latching Circuits (Relay/LED/Buzzer)",
    description: "Three variants of light-activated SCR (LASCR) latching circuits. When light strikes the LASCR, it latches on and remains on until power is removed via S1. Variants drive relay (500Ω, 6-9V), LED with 1K resistor, or piezo buzzer with 1K resistor. R1=47K gate-to-cathode stabilizer. +9V.",
    category: "scr",
    blocks: [
      {
        id: "lascr-relay-block",
        name: "LASCR Relay Latch",
        type: "protection",
        components: [
          { refDes: "SCR1", description: "LASCR — light-activated SCR (CAG pinout)" },
          { refDes: "R1", value: "47K", description: "Gate-to-cathode stabilizer — prevents false triggering" },
          { refDes: "K1", description: "Relay — 500Ω coil, 6-9V" },
          { refDes: "S1", description: "Normally closed momentary — reset switch (breaks power to unlatch LASCR)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "S1", pin: "1" }, to: [] },
          { name: "LOAD", from: { refDes: "S1", pin: "2" }, to: [{ refDes: "K1", pin: "1" }] },
          { name: "SCR_A", from: { refDes: "K1", pin: "2" }, to: [{ refDes: "SCR1", pin: "A" }] },
          { name: "SCR_G", from: { refDes: "SCR1", pin: "G" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "SCR1", pin: "C" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "LASCR latches on when light exceeds threshold — stays on until S1 opened",
          "R1 prevents ambient light or noise from false-triggering",
          "Some LASCRs more sensitive than others — most trigger from camera strobe flash",
          "For LED variant: replace relay with LED + 1K series resistor",
          "For buzzer variant: replace relay with piezo buzzer + 1K series resistor",
        ],
      },
    ],
    designRules: [
      "Open S1 momentarily to reset (breaks anode current below holding current)",
      "Shield LASCR from ambient light with tube or shroud if needed",
      "May need to experiment with R1 value for sensitivity vs. noise rejection",
    ],
    notes: "From Mims Getting Started in Electronics p115. LASCR is essentially an SCR with a light-sensitive gate — when photons hit the junction, it triggers and latches like a normal SCR. For REC pinball: light-triggered latching events (ball detection, optical target hits). For security: flash-triggered alarm latch. The three variants (relay/LED/buzzer) show how to interface with different output loads.",
  },

  // ──────────────────────────────────────────────────
  // 120V Triac Dimmer with Diac Trigger
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-120v-diac-dimmer",
    name: "120V Triac Lamp Dimmer with Diac Trigger",
    description: "Standard household dimmer circuit: RC phase-shift network with diac triggers triac at adjustable phase angle to control AC lamp brightness. Up to 100W load. R2 (500K pot) controls brightness. Must be fully enclosed — operates at 120V AC line voltage.",
    category: "triac",
    blocks: [
      {
        id: "diac-dimmer-block",
        name: "120V Diac-Triggered Triac Dimmer",
        type: "power-supply",
        components: [
          { refDes: "A1", description: "Triac — rated for load current, use heat sink if needed" },
          { refDes: "D1", description: "Diac — bidirectional trigger diode (typically 28-36V breakover)" },
          { refDes: "R1", value: "2.2K", description: "Fixed series resistor — limits current and sets minimum phase angle" },
          { refDes: "R2", value: "500K", description: "Potentiometer — brightness control (DIM adjustment)" },
          { refDes: "C1", value: "0.1µF/50V", description: "Phase-shift capacitor — charges through R1+R2 each half cycle" },
          { refDes: "L1", description: "Lamp — up to 100W (120V)" },
        ],
        nets: [
          { name: "AC_LINE", from: { refDes: "L1", pin: "1" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "RC_NODE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "DIAC_IN", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "D1", pin: "1" }] },
          { name: "TRIAC_GATE", from: { refDes: "D1", pin: "2" }, to: [{ refDes: "A1", pin: "G" }] },
          { name: "TRIAC_A1", from: { refDes: "A1", pin: "A1" }, to: [{ refDes: "C1", pin: "2" }] },
          { name: "AC_NEUTRAL", from: { refDes: "A1", pin: "A2" }, to: [{ refDes: "L1", pin: "2" }] },
        ],
        designRules: [
          "CAUTION: This circuit operates at 120V AC — lethal voltage",
          "Must be fully enclosed in insulated enclosure at all times",
          "Use heat sink on triac if it becomes hot",
          "L1 can be up to 100W lamp",
          "Diac fires when C1 voltage reaches breakover (~30V), triggering triac",
          "R2 controls phase angle — more resistance = dimmer, less = brighter",
          "This is how standard household dimmer switches work",
        ],
      },
    ],
    designRules: [
      "All connections to AC line must be insulated or enclosed",
      "Triac must be rated for the load current",
      "Do not exceed 100W without upgrading triac and adding proper heat sinking",
    ],
    notes: "From Mims Getting Started in Electronics p111. Standard diac-triggered triac dimmer — the basis for all household dimmer switches. Different from the UJT-triggered version already extracted (mims-triac-lamp-dimmer). For REC: oven heater control, grill element power control, lighting control. The diac provides symmetric triggering on both AC half-cycles without needing a separate oscillator circuit.",
  },

  // ──────────────────────────────────────────────────
  // Electronic Coin Tosser (4011 + 4017)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-coin-tosser",
    name: "Electronic Coin Tosser (4011 + 4017)",
    description: "Fast CMOS oscillator (4011 NAND gates) clocks 4017 decade counter. Pressing S1 momentarily stops oscillator and one of two LEDs (heads/tails) lights — 4017 outputs 3 and 2 drive the LEDs. Statistical results: approximately 50/50 heads vs tails. +9V.",
    category: "logic",
    blocks: [
      {
        id: "coin-tosser-block",
        name: "CMOS Coin Tosser",
        type: "logic",
        components: [
          { refDes: "U1", partNumber: "CD4011", description: "Quad NAND gate — two gates form oscillator" },
          { refDes: "U2", partNumber: "CD4017", description: "Decade counter — outputs 2 and 3 drive heads/tails LEDs" },
          { refDes: "R1", value: "4.7K", description: "Oscillator timing resistor" },
          { refDes: "R2", value: "1K", description: "LED current limiter (heads)" },
          { refDes: "R3", value: "4.7K", description: "LED current limiter (tails)" },
          { refDes: "C1", value: "470pF", description: "Oscillator timing capacitor — very fast oscillation" },
          { refDes: "LED1", description: "Heads LED" },
          { refDes: "LED2", description: "Tails LED" },
          { refDes: "S1", description: "Momentary pushbutton — press to 'toss'" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U2", pin: "16" }, { refDes: "R2", pin: "1" }] },
          { name: "OSC_OUT", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U1", pin: "5" }] },
          { name: "OSC_FB", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "U2", pin: "14" }] },
          { name: "HEADS", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "TAILS", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "LED2", pin: "A" }] },
          { name: "LED1_K", from: { refDes: "LED1", pin: "K" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "LED2_K", from: { refDes: "LED2", pin: "K" }, to: [{ refDes: "R3", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "R3", pin: "2" }] },
        ],
        designRules: [
          "S1 connects to oscillator NAND gate input — stops clock when pressed",
          "4017 outputs cycle through 0-9 continuously at high speed",
          "When S1 stops clock, whichever output is active stays lit",
          "Oscillator runs too fast to predict — result is effectively random",
          "Typical test results: ~23 heads / 27 tails (statistically 50/50)",
        ],
      },
    ],
    designRules: [
      "Use CMOS 4011 and 4017 — TTL will not work with 9V supply",
      "All unused 4011 inputs must go to VDD or GND",
    ],
    notes: "From Mims Getting Started in Electronics p120. Simple random binary selector using high-speed CMOS oscillator + decade counter. For REC pinball: random event selection (which target to light, random bonus award). The oscillator frequency is high enough that human reaction time cannot predict the outcome.",
  },

  // ──────────────────────────────────────────────────
  // Random Number Generator (4011 + 4017 + 10 LEDs)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-random-number-generator",
    name: "Random Number Generator (4011 + 4017 + 10 LEDs)",
    description: "10-output random selector: 4011 NAND oscillator clocks 4017 decade counter with 10 LEDs on outputs 0-9. Close S1 and all LEDs glow dimly (fast scanning). Open S1 and a randomly selected LED stays lit. Increase C1 to 4.7µF and leave S1 closed for sequential flasher mode. +9V.",
    category: "logic",
    blocks: [
      {
        id: "random-gen-block",
        name: "10-Output Random Selector",
        type: "logic",
        components: [
          { refDes: "U1", partNumber: "CD4011", description: "Quad NAND gate — two gates form oscillator" },
          { refDes: "U2", partNumber: "CD4017", description: "Decade counter — 10 decoded outputs" },
          { refDes: "R1", value: "4.7K", description: "Oscillator timing resistor" },
          { refDes: "R2", value: "1K", description: "Common LED current limiter" },
          { refDes: "C1", value: "470pF", description: "Oscillator timing capacitor (4.7µF for sequential flasher)" },
          { refDes: "LED0", description: "LED output 0" },
          { refDes: "LED1", description: "LED output 1" },
          { refDes: "LED2", description: "LED output 2" },
          { refDes: "LED3", description: "LED output 3" },
          { refDes: "LED4", description: "LED output 4" },
          { refDes: "LED5", description: "LED output 5" },
          { refDes: "LED6", description: "LED output 6" },
          { refDes: "LED7", description: "LED output 7" },
          { refDes: "LED8", description: "LED output 8" },
          { refDes: "LED9", description: "LED output 9" },
          { refDes: "S1", description: "SPST switch — close to run oscillator, open to stop (select)" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U2", pin: "16" }] },
          { name: "CLK", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "14" }] },
          { name: "OUT0", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "LED0", pin: "A" }] },
          { name: "OUT1", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "OUT2", from: { refDes: "U2", pin: "4" }, to: [{ refDes: "LED2", pin: "A" }] },
          { name: "OUT3", from: { refDes: "U2", pin: "7" }, to: [{ refDes: "LED3", pin: "A" }] },
          { name: "OUT4", from: { refDes: "U2", pin: "10" }, to: [{ refDes: "LED4", pin: "A" }] },
          { name: "OUT5", from: { refDes: "U2", pin: "1" }, to: [{ refDes: "LED5", pin: "A" }] },
          { name: "OUT6", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "LED6", pin: "A" }] },
          { name: "OUT7", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "LED7", pin: "A" }] },
          { name: "OUT8", from: { refDes: "U2", pin: "9" }, to: [{ refDes: "LED8", pin: "A" }] },
          { name: "OUT9", from: { refDes: "U2", pin: "11" }, to: [{ refDes: "LED9", pin: "A" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "8" }, { refDes: "U2", pin: "13" }, { refDes: "U2", pin: "15" }, { refDes: "R2", pin: "2" }] },
        ],
        designRules: [
          "All LED cathodes connect through common R2 to GND",
          "S1 in oscillator path — close to run, open to freeze count",
          "With C1=470pF: oscillator too fast to see, appears random",
          "With C1=4.7µF and S1 closed: visible sequential LED scanning (chaser/flasher mode)",
          "4017 pin 13 (enable) and pin 15 (reset) tied to GND for free-running",
        ],
      },
    ],
    designRules: [
      "Use CMOS 4011 and 4017 — TTL will not work with 9V supply",
      "All unused 4011 inputs must go to VDD or GND",
    ],
    notes: "From Mims Getting Started in Electronics p120. Dual-purpose circuit: random number generator OR sequential LED chaser depending on C1 value. For REC pinball: random target selection (which bumper/target to activate), sequential light chase effects around playfield. The 4017 provides 10 decoded outputs — no additional logic needed.",
  },

  // ──────────────────────────────────────────────────
  // 1-of-4 Sequencer (4011 + 4013 + 4001)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-1of4-sequencer",
    name: "1-of-4 Sequencer (4011 + 4013 + 4001)",
    description: "Four-output sequencer using 4011 NAND oscillator clocking a 4013 dual D flip-flop, with 4001 NOR gates decoding four sequential output states. Each output turns on in sequence — use to drive LEDs, relays, etc. Variable speed via R1/C1. +9V.",
    category: "logic",
    blocks: [
      {
        id: "sequencer-block",
        name: "4-Output Sequencer",
        type: "logic",
        components: [
          { refDes: "U1", partNumber: "CD4011", description: "Quad NAND gate — two gates form clock oscillator" },
          { refDes: "U2", partNumber: "CD4013", description: "Dual D flip-flop — divides clock into 4 phases" },
          { refDes: "U3", partNumber: "CD4001", description: "Quad NOR gate — decodes 4 sequential states" },
          { refDes: "R1", value: "4.7K-1M", description: "Oscillator timing resistor — controls sequence speed" },
          { refDes: "R2", value: "1K", description: "Output A current limiter" },
          { refDes: "R3", value: "1K", description: "Output B current limiter" },
          { refDes: "R4", value: "1K", description: "Output C current limiter" },
          { refDes: "R5", value: "1K", description: "Output D current limiter" },
          { refDes: "C1", value: "0.001-100µF", description: "Oscillator timing capacitor" },
          { refDes: "LED1", description: "Output A LED" },
          { refDes: "LED2", description: "Output B LED" },
          { refDes: "LED3", description: "Output C LED" },
          { refDes: "LED4", description: "Output D LED" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U2", pin: "14" }, { refDes: "U3", pin: "14" }] },
          { name: "CLK", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "U2", pin: "3" }] },
          { name: "FF1_Q", from: { refDes: "U2", pin: "1" }, to: [{ refDes: "U2", pin: "5" }, { refDes: "U3", pin: "1" }, { refDes: "U3", pin: "5" }] },
          { name: "FF2_Q", from: { refDes: "U2", pin: "13" }, to: [{ refDes: "U3", pin: "2" }, { refDes: "U3", pin: "9" }] },
          { name: "A_OUT", from: { refDes: "U3", pin: "3" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "B_OUT", from: { refDes: "U3", pin: "4" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "C_OUT", from: { refDes: "U3", pin: "10" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "D_OUT", from: { refDes: "U3", pin: "11" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "7" }, { refDes: "U3", pin: "7" }] },
        ],
        designRules: [
          "Each LED turns on in sequence: A→B→C→D→A→...",
          "R1 and C1 control sequence speed",
          "4013 pins 4,6,7,8,10 must be tied to GND (resets, sets, GND)",
          "All unused 4011 and 4001 inputs must go to VDD or GND",
          "Use with relays instead of LEDs to sequence motors, solenoids, etc.",
        ],
      },
    ],
    designRules: [
      "For 'bucket brigade' operation: connect pin 5 of first 4013 to pin 13 (not 12) of second 4013",
      "All CMOS ICs — handle with ESD precautions",
    ],
    notes: "From Mims Getting Started in Electronics p120. Four-phase sequencer using flip-flop division + NOR gate decoding. For REC pinball: sequential light effects, 4-step animation patterns on playfield. For grill: multi-zone heater sequencing. The circuit can drive relays or transistor switches for higher-power loads.",
  },

  // ──────────────────────────────────────────────────
  // All-On/All-Off Sequencer (Dual 4013)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-all-on-off-sequencer",
    name: "All-On/All-Off 4-Output Sequencer (Dual 4013)",
    description: "Four outputs go low in sequence (A, B, C, D), then high in sequence (A, B, C, D). Uses two 4013 dual D flip-flops with external clock. Eye-catching LED display pattern. For bucket-brigade mode, connect pin 5 of first 4013 to pin 13 of second. +9V.",
    category: "logic",
    blocks: [
      {
        id: "all-on-off-block",
        name: "All-On/All-Off Sequencer",
        type: "logic",
        components: [
          { refDes: "U1", partNumber: "CD4013", description: "Dual D flip-flop #1 — outputs A and B" },
          { refDes: "U2", partNumber: "CD4013", description: "Dual D flip-flop #2 — outputs C and D" },
          { refDes: "LED1", description: "Output A LED" },
          { refDes: "LED2", description: "Output B LED" },
          { refDes: "LED3", description: "Output C LED" },
          { refDes: "LED4", description: "Output D LED" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "U2", pin: "14" }] },
          { name: "CLK_IN", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "A", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "LED1", pin: "A" }] },
          { name: "B", from: { refDes: "U1", pin: "13" }, to: [{ refDes: "LED2", pin: "A" }] },
          { name: "C", from: { refDes: "U2", pin: "1" }, to: [{ refDes: "LED3", pin: "A" }] },
          { name: "D", from: { refDes: "U2", pin: "13" }, to: [{ refDes: "LED4", pin: "A" }] },
          { name: "CASCADE", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U1", pin: "11" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "U2", pin: "7" }] },
        ],
        designRules: [
          "All outputs go low in sequence, then high in sequence",
          "Pattern: A→B→C→D all off, then A→B→C→D all on, repeat",
          "For bucket-brigade: connect pin 5 of U1 to pin 13 (not 12) of U2",
          "Needs external clock source — use 4011 oscillator or 555",
          "Unused set/reset pins must go to GND",
        ],
      },
    ],
    designRules: [
      "Combine with 4011 oscillator for self-contained display",
      "Use with transistor drivers for higher-current LED strings",
    ],
    notes: "From Mims Getting Started in Electronics p121. Sequential fill/empty LED display effect using cascaded D flip-flops. For REC pinball: attractive 'wipe' lighting effects, progressive bonus displays, countdown indicators.",
  },

  // ──────────────────────────────────────────────────
  // 0-9 Second Timer with 7-Segment Display
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-7segment-timer",
    name: "0-9 Second Timer with 7-Segment Display (555 + 7490 + 7448)",
    description: "555 timer generates 1 Hz pulses that clock a 7490 decade counter. 7448 BCD-to-7-segment decoder drives a common cathode LED display showing 0-9. Adjust R1 and C1 for desired pulse rate. Add additional 7490+7448+display stages for multi-digit counting. +5V TTL.",
    category: "logic",
    blocks: [
      {
        id: "7seg-timer-block",
        name: "Single Digit Timer/Counter",
        type: "logic",
        components: [
          { refDes: "U1", partNumber: "NE555", description: "555 timer — astable mode, 1 Hz clock source" },
          { refDes: "U2", partNumber: "7490", description: "TTL decade counter (or 74LS90)" },
          { refDes: "U3", partNumber: "7448", description: "TTL BCD-to-7-segment decoder (or 74LS48)" },
          { refDes: "R1", value: "1M", description: "555 timing resistor" },
          { refDes: "R2", value: "1K", description: "555 timing resistor" },
          { refDes: "R3", value: "470", description: "Segment a current limiter" },
          { refDes: "R4", value: "470", description: "Segment b current limiter" },
          { refDes: "R5", value: "470", description: "Segment c current limiter" },
          { refDes: "R6", value: "470", description: "Segment d current limiter" },
          { refDes: "R7", value: "470", description: "Segment e current limiter" },
          { refDes: "R8", value: "470", description: "Segment f current limiter" },
          { refDes: "R9", value: "470", description: "Segment g current limiter" },
          { refDes: "C1", value: "0.1-100µF", description: "555 timing capacitor — adjust for desired count rate" },
          { refDes: "DISP1", description: "Common cathode 7-segment LED display" },
          { refDes: "S1", description: "SPST switch — start/stop counter" },
        ],
        nets: [
          { name: "+5V", from: { refDes: "U1", pin: "8" }, to: [{ refDes: "U1", pin: "4" }, { refDes: "U2", pin: "5" }, { refDes: "U3", pin: "16" }] },
          { name: "CLK", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "S1", pin: "1" }] },
          { name: "COUNT_IN", from: { refDes: "S1", pin: "2" }, to: [{ refDes: "U2", pin: "14" }] },
          { name: "BCD_A", from: { refDes: "U2", pin: "12" }, to: [{ refDes: "U3", pin: "7" }] },
          { name: "BCD_B", from: { refDes: "U2", pin: "9" }, to: [{ refDes: "U3", pin: "1" }] },
          { name: "BCD_C", from: { refDes: "U2", pin: "8" }, to: [{ refDes: "U3", pin: "2" }] },
          { name: "BCD_D", from: { refDes: "U2", pin: "11" }, to: [{ refDes: "U3", pin: "6" }] },
          { name: "SEG_A", from: { refDes: "U3", pin: "13" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "SEG_B", from: { refDes: "U3", pin: "12" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "SEG_C", from: { refDes: "U3", pin: "11" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "SEG_D", from: { refDes: "U3", pin: "10" }, to: [{ refDes: "R6", pin: "1" }] },
          { name: "SEG_E", from: { refDes: "U3", pin: "9" }, to: [{ refDes: "R7", pin: "1" }] },
          { name: "SEG_F", from: { refDes: "U3", pin: "15" }, to: [{ refDes: "R8", pin: "1" }] },
          { name: "SEG_G", from: { refDes: "U3", pin: "14" }, to: [{ refDes: "R9", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "U2", pin: "2" }, { refDes: "U2", pin: "3" }, { refDes: "U2", pin: "6" }, { refDes: "U2", pin: "7" }, { refDes: "U2", pin: "10" }, { refDes: "U3", pin: "8" }] },
        ],
        designRules: [
          "7490 pins 2,3,6,7 must go to GND for normal decade counting",
          "7490 pin 14 is clock input A, pin 1 is input B — connect A to clock, B to QA for ÷10",
          "For divide-by-5: input on pin 1, output on pin 11; pins 2,3,6,7 to GND",
          "For divide-by-10: input on pin 14, output on pin 12; connect pin 12 to pin 1",
          "Add more 7490+7448+display stages for multi-digit counting",
          "Cascade by connecting QD output of first 7490 to clock input of next",
          "Adjust R1 and C1 for desired count rate — 1M + 1µF ≈ 1 Hz",
          "TTL: power supply must not exceed 5.25V",
          "Connect 0.1µF bypass capacitor across power pins of each TTL chip",
        ],
      },
    ],
    designRules: [
      "Use 5V regulated supply — TTL is sensitive to over-voltage",
      "7448 has active-high outputs with internal pullups — use current-limiting resistors",
      "Can count pulses from any source — eliminate 555 and apply TTL-level pulses to 7490",
    ],
    notes: "From Mims Getting Started in Electronics p117. Classic TTL counter/display circuit — the basis for digital scoreboards, frequency counters, and event counters. For REC pinball: score display digits, ball count, bonus multiplier display. Cascading multiple stages creates multi-digit displays. The hint about counting external pulses makes this a general-purpose event counter.",
  },

  // ──────────────────────────────────────────────────
  // Model Railroad Crossing Flasher Lights
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-railroad-crossing-flasher",
    name: "Model Railroad Crossing Flasher Lights",
    description: "Phototransistor break-beam detection triggers alternating LED flasher for model railroad crossing signals. Two phototransistors (Q1, Q2) detect train over track. 4011 NAND gates form oscillator that drives power MOSFET (Q3) to flash LEDs alternately. Infrared LEDs (L1, L2) illuminate phototransistors. +9V.",
    category: "flasher",
    blocks: [
      {
        id: "rr-crossing-block",
        name: "Break-Beam Crossing Flasher",
        type: "oscillator",
        components: [
          { refDes: "Q1", description: "NPN phototransistor — track sensor #1" },
          { refDes: "Q2", description: "NPN phototransistor — track sensor #2" },
          { refDes: "Q3", description: "Power MOSFET — drives LED pair" },
          { refDes: "U1", partNumber: "CD4011", description: "Quad NAND gate — oscillator for alternating flash" },
          { refDes: "R1", value: "100K", description: "Phototransistor Q1 pull-up" },
          { refDes: "R2", value: "1K", description: "Phototransistor Q2 pull-up" },
          { refDes: "R3", value: "10K", description: "Oscillator timing resistor" },
          { refDes: "R4", value: "10K", description: "MOSFET gate resistor" },
          { refDes: "C1", value: "4.7µF", description: "Oscillator timing capacitor — sets flash rate" },
          { refDes: "L1", description: "Infrared LED or small lamp — illuminates Q1" },
          { refDes: "L2", description: "Infrared LED or small lamp — illuminates Q2" },
          { refDes: "LED1", description: "Crossing signal LED #1" },
          { refDes: "LED2", description: "Crossing signal LED #2" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "R2", pin: "1" }] },
          { name: "SENSE1", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "SENSE2", from: { refDes: "Q2", pin: "C" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "OSC_OUT", from: { refDes: "U1", pin: "4" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "MOSFET_GATE", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "Q3", pin: "G" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "Q1", pin: "E" }, { refDes: "Q2", pin: "E" }] },
        ],
        designRules: [
          "LEDs flash alternately when train breaks light beam to either Q1 or Q2",
          "LEDs continue flashing until train passes and beam is restored",
          "Shield phototransistors from room lights with 1-inch heat shrink tubing",
          "Use infrared LEDs and series resistor for L1/L2",
          "Adjust C1 for desired flash rate",
        ],
      },
    ],
    designRules: [
      "Position L1/Q1 and L2/Q2 across track at crossing point",
      "Space sensors apart by more than train length for reliable detection",
    ],
    notes: "From Mims Getting Started in Electronics p121. Combines break-beam detection with alternating flasher — useful pattern for any beam-interruption triggered alert. For REC pinball: ball path detection triggering alternating flasher effects. The phototransistor + MOSFET + CMOS oscillator combination is a general-purpose pattern for detect-and-flash applications.",
  },

  // ──────────────────────────────────────────────────
  // Programmable Gain Op-Amp (4066 + 741)
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-programmable-gain-opamp",
    name: "Programmable Gain Operational Amplifier (4066 + 741)",
    description: "4066 quad analog switch selects feedback resistor network for 741 inverting amplifier, providing digitally-controllable gain. 4-bit binary control (DCBA) selects Rin from R to R/15, giving gain from 1× to 15× with Rf=R. Typical R=Rf=10K. ±9V dual supply.",
    category: "amplifier",
    blocks: [
      {
        id: "prog-gain-block",
        name: "4-Bit Programmable Gain Amplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", partNumber: "CD4066", description: "Quad analog switch — selects input resistor combination" },
          { refDes: "U2", partNumber: "LM741", description: "Op-amp — inverting amplifier configuration" },
          { refDes: "R_IN", value: "10K", description: "Input resistor R (connects through switch A)" },
          { refDes: "R_IN2", value: "10K", description: "Input resistor R/2 (connects through switch B — two R in parallel)" },
          { refDes: "R_IN4", value: "10K", description: "Input resistor R/4 (connects through switch C)" },
          { refDes: "R_IN8", value: "10K", description: "Input resistor R/8 (connects through switch D)" },
          { refDes: "Rf", value: "10K", description: "Feedback resistor — Vout = -Vin × (Rf/Rin)" },
          { refDes: "R_PULL", value: "4.7K", description: "Pull-down resistors on control inputs (4 needed)" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "+9V", from: { refDes: "U2", pin: "7" }, to: [] },
          { name: "-9V", from: { refDes: "U2", pin: "4" }, to: [] },
          { name: "VIN", from: { refDes: "R_IN", pin: "1" }, to: [{ refDes: "R_IN2", pin: "1" }, { refDes: "R_IN4", pin: "1" }, { refDes: "R_IN8", pin: "1" }] },
          { name: "SUMMING", from: { refDes: "U2", pin: "2" }, to: [{ refDes: "Rf", pin: "1" }] },
          { name: "VOUT", from: { refDes: "U2", pin: "6" }, to: [{ refDes: "Rf", pin: "2" }] },
          { name: "GND", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "U1", pin: "7" }] },
        ],
        designRules: [
          "4066 switches connect input resistors to summing junction",
          "Binary control DCBA (0001 to 1111) varies Rin from R to R/15",
          "Gain = Rf/Rin — with all switches on, Rin = R/15, gain = 15×",
          "Apply control signals at 4066 inputs (pins 13, 5, 6, 12 for A, B, C, D)",
          "Connect each control input to VDD via 4.7K pulldown and switch/logic for manual control",
          "4066 VDD connects to op-amp positive supply",
          "Output is inverted (inverting amplifier configuration)",
        ],
      },
    ],
    designRules: [
      "Typical R and Rf = 10K",
      "4066 analog switch has ~100Ω on-resistance — adds small error at low Rin values",
      "For details see The Forrest Mims Circuit Scrapbook pp.21-23",
    ],
    notes: "From Mims Getting Started in Electronics p121. Digitally-controlled gain amplifier — fundamental building block for programmable signal conditioning. For REC: automatic gain control in sensor circuits, programmable attenuation for audio mixing, MCU-controlled amplifier gain selection. The 4-bit binary weighting provides 15 discrete gain steps from a single feedback resistor.",
  },

  // ──────────────────────────────────────────────────
  // Light-Sensitive Up-Down Tone Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-light-updown-tone",
    name: "Light-Sensitive Up-Down Tone Generator (741 + 386)",
    description: "Two photoresistors on opposite inputs of a 741 op-amp oscillator create a tone that changes frequency based on differential light levels. R3 (50K pot) sets balance point. 386 power amplifier drives speaker. Take into a dark room with a flashlight for dramatic effect. ±9V for 741, +9V for 386.",
    category: "oscillator",
    blocks: [
      {
        id: "updown-tone-block",
        name: "Dual Photoresistor Tone Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", partNumber: "LM741", description: "Op-amp oscillator — frequency controlled by photoresistor ratio" },
          { refDes: "U2", partNumber: "LM386", description: "Audio power amplifier — drives speaker" },
          { refDes: "R1", value: "1K", description: "Photoresistor #1 series resistor (non-inverting input)" },
          { refDes: "R2", value: "100K", description: "Feedback resistor" },
          { refDes: "R3", value: "50K", description: "Balance potentiometer — sets light level center point" },
          { refDes: "R4", value: "10K", description: "Photoresistor #2 series/bias resistor" },
          { refDes: "CdS1", description: "CdS photoresistor #1 — on non-inverting input" },
          { refDes: "CdS2", description: "CdS photoresistor #2 — on inverting input feedback path" },
          { refDes: "C1", value: "0.1µF", description: "741 oscillator timing capacitor" },
          { refDes: "C2", value: "100pF", description: "Coupling capacitor 741 to 386" },
          { refDes: "C3", value: "100µF", description: "386 output coupling capacitor" },
          { refDes: "C4", value: "1µF", description: "386 bypass capacitor" },
          { refDes: "SPKR1", description: "8Ω speaker" },
        ],
        nets: [
          { name: "+9V_AMP", from: { refDes: "U2", pin: "6" }, to: [] },
          { name: "+9V_OP", from: { refDes: "U1", pin: "7" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "-9V", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "NON_INV", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "CdS1", pin: "1" }] },
          { name: "INV", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "OP_OUT", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R3", pin: "1" }] },
          { name: "BALANCE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "AMP_IN", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "U2", pin: "3" }, { refDes: "R4", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U2", pin: "5" }, to: [{ refDes: "C3", pin: "1" }] },
          { name: "SPKR", from: { refDes: "C3", pin: "2" }, to: [{ refDes: "SPKR1", pin: "1" }] },
          { name: "GND", from: { refDes: "CdS1", pin: "2" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "U2", pin: "2" }, { refDes: "R4", pin: "2" }, { refDes: "SPKR1", pin: "2" }] },
        ],
        designRules: [
          "CdS1 on non-inverting input, CdS2 in feedback path",
          "R3 adjusts balance — set so tone is at mid-frequency in ambient light",
          "Light on CdS1 raises pitch, light on CdS2 lowers pitch",
          "Differential response creates dramatic up-down sweeping tones",
          "Best demonstrated in dark room with flashlight",
        ],
      },
    ],
    designRules: [
      "Position photoresistors facing different directions for stereo light response",
      "741 needs dual supply (±9V), 386 needs single supply (+9V)",
    ],
    notes: "From Mims Getting Started in Electronics p123. Dual-photoresistor oscillator creates interactive light-to-sound instrument. The differential configuration produces tone changes that sweep up AND down depending on which sensor is illuminated. For REC: interactive sound effects driven by hand position (shadow puppet audio), ambient light sonification, or as an electronic theremin-like instrument.",
  },

  // ──────────────────────────────────────────────────
  // LM317 Variable Output Power Supply
  // ──────────────────────────────────────────────────
  {
    id: "mims-gse-lm317-variable-supply",
    name: "LM317 Variable Output Power Supply (1.2V to 37V)",
    description: "AC line powered variable DC supply using LM317 adjustable voltage regulator. Transformer + bridge rectifier provides unregulated DC. R1 (5K pot) controls output from 1.2V to 37V at up to 1.5A. C3 (0.1µF) for output stability. CAUTION: AC line circuit — must be insulated/enclosed.",
    category: "power-supply",
    blocks: [
      {
        id: "lm317-supply-block",
        name: "LM317 Adjustable Regulator",
        type: "voltage-regulator",
        components: [
          { refDes: "U1", partNumber: "LM317", description: "Adjustable voltage regulator — 1.2V to 37V, 1.5A" },
          { refDes: "B1", description: "Bridge rectifier — PIV > 2× secondary voltage" },
          { refDes: "T1", description: "120V-to-25V+ transformer — secondary must be rated for 2A+" },
          { refDes: "R1", value: "5K", description: "Output voltage adjust potentiometer" },
          { refDes: "R2", value: "240", description: "Programming resistor — sets reference current (5mA)" },
          { refDes: "C1", value: "2000µF/50V", description: "Filter capacitor #1" },
          { refDes: "C2", value: "2000µF/50V", description: "Filter capacitor #2" },
          { refDes: "C3", value: "0.1µF", description: "Output stability capacitor" },
          { refDes: "S1", description: "SPST power switch" },
        ],
        nets: [
          { name: "AC_IN", from: { refDes: "T1", pin: "PRI_1" }, to: [{ refDes: "S1", pin: "1" }] },
          { name: "AC_LINE", from: { refDes: "S1", pin: "2" }, to: [] },
          { name: "SEC_1", from: { refDes: "T1", pin: "SEC_1" }, to: [{ refDes: "B1", pin: "AC1" }] },
          { name: "SEC_2", from: { refDes: "T1", pin: "SEC_2" }, to: [{ refDes: "B1", pin: "AC2" }] },
          { name: "UNREG", from: { refDes: "B1", pin: "+" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "C2", pin: "1" }, { refDes: "U1", pin: "IN" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C3", pin: "1" }] },
          { name: "ADJ", from: { refDes: "U1", pin: "ADJ" }, to: [{ refDes: "R2", pin: "2" }, { refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "B1", pin: "-" }, to: [{ refDes: "C1", pin: "2" }, { refDes: "C2", pin: "2" }, { refDes: "R1", pin: "2" }, { refDes: "C3", pin: "2" }] },
        ],
        designRules: [
          "Vout = 1.25V × (1 + R1/R2) — R2=240Ω sets 5mA reference current",
          "With R1=5K: Vout ranges from 1.2V (R1=0) to ~27V (R1=5K)",
          "For full 37V range, use higher secondary voltage transformer",
          "If Vout doesn't reach minimum 1.2V, R1 may not achieve low enough resistance",
          "LM317 requires minimum 3V input-output differential",
          "Apply silicone compound and heat sink to LM317 — it will get hot at high current",
          "T1 secondary should be 25V or higher, rated for 2A+",
          "All AC line connections must be insulated or enclosed",
          "C1,C2 must have DC working voltage ≥ 50V",
        ],
      },
    ],
    designRules: [
      "CAUTION: AC line operated — insulate or enclose all connections",
      "LM317 will shut down if overheated — this is thermal protection, not a fault",
      "For fixed 5V/12V/15V outputs, use 7805/7812/7815 instead (see fixed supply circuit)",
    ],
    notes: "From Mims Getting Started in Electronics p125. Standard LM317 adjustable bench supply — essential for any electronics lab. Vout = 1.25 × (1 + R1/R2). For REC: bench power supply for testing boards, adjustable supply for motor/solenoid testing, prototype power rail. The 317 has built-in overcurrent and thermal protection. Always use with heat sink when delivering >500mA.",
  },

  // ══════════════════════════════════════════════════
  // Mims Basic Semiconductor Circuits — full extraction
  // ══════════════════════════════════════════════════

  // ──────────────────────────────────────────────────
  // Reverse Polarity Protector
  // ──────────────────────────────────────────────────
  {
    id: "mims-reverse-polarity-protector",
    name: "Reverse Polarity Protector",
    description: "Series diode protects circuit if battery is installed backwards. Drops 0.6V but prevents damage.",
    category: "protection",
    blocks: [
      {
        id: "reverse-polarity-block",
        name: "Series Diode Protection",
        type: "protection",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Series protection diode — blocks reverse current",
            critical: true,
          },
        ],
        nets: [
          { name: "B1+", from: { refDes: "D1", pin: "A" }, to: [] },
          { name: "+V_PROTECTED", from: { refDes: "D1", pin: "K" }, to: [] },
        ],
        designRules: [
          "Use 1N4148 for low-current circuits (up to 200mA)",
          "Use 1N4001 or 1N5819 Schottky for higher current — Schottky drops only 0.3V",
          "Place as close to power input connector as possible",
        ],
      },
    ],
    designRules: [
      "Always include on battery-powered products",
      "For REC boards: 1N5819HW-7-F Schottky is the standard reverse-polarity diode",
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest protection circuit. Output is Vin minus one diode drop (0.6V silicon, 0.3V Schottky). For 3-12V battery circuits. REC standard uses 1N5819HW-7-F Schottky in all battery-powered designs.",
  },

  // ──────────────────────────────────────────────────
  // Transient/Spike Protector (Inductive Flyback)
  // ──────────────────────────────────────────────────
  {
    id: "mims-transient-protector",
    name: "Inductive Transient Protector",
    description: "Flyback diode across inductive load (relay coil, solenoid) shorts the voltage spike when current is interrupted.",
    category: "protection",
    blocks: [
      {
        id: "transient-protector-block",
        name: "Flyback Diode",
        type: "protection",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Flyback diode — cathode to +V side of inductor, anode to switch side. Ineffective during turn-on, shorts the spike during turn-off.",
            critical: true,
          },
        ],
        nets: [
          { name: "COIL+", from: { refDes: "D1", pin: "K" }, to: [] },
          { name: "COIL-", from: { refDes: "D1", pin: "A" }, to: [] },
        ],
        designRules: [
          "MANDATORY for all relay and solenoid drivers — spike can be hundreds of volts",
          "Place diode physically close to the inductive load, not near the driver transistor",
          "For high-current loads use 1N4001 or higher rated diode",
        ],
      },
    ],
    designRules: [
      "Every relay, solenoid, and motor driver in REC designs MUST have a flyback diode",
      "For pinball solenoids: use 1N4001 minimum, fast-recovery for high-speed coils",
    ],
    notes: "From Mims Basic Semiconductor Circuits. When current through an inductor is suddenly interrupted, the collapsing magnetic field generates a voltage spike that can reach hundreds or thousands of volts. The flyback diode provides a path for the inductor's stored energy to dissipate safely. Critical for all REC relay/solenoid designs including pinball flippers, bumpers, and grill valve solenoids.",
  },

  // ──────────────────────────────────────────────────
  // Adjustable Waveform Clipper
  // ──────────────────────────────────────────────────
  {
    id: "mims-waveform-clipper",
    name: "Adjustable Waveform Clipper",
    description: "Clips AC signal amplitude at an adjustable level set by R2 potentiometer. Uses diode + resistor divider.",
    category: "protection",
    blocks: [
      {
        id: "clipper-block",
        name: "Adjustable Clipper",
        type: "protection",
        components: [
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Series input resistor",
          },
          {
            refDes: "R2",
            value: "5K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "5K_POT",
            eaglePackage: "POT_3PIN",
            description: "Adjustable clipping level — sets +V bias for diode conduction point",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Clipping diode — conducts when signal exceeds bias voltage",
          },
        ],
        nets: [
          { name: "IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "+V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "CLIP_REF", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "D1", pin: "K" }] },
        ],
        designRules: [
          "R2 should be higher than peak input voltage — sets the clipping threshold",
          "For bipolar clipping: add second diode + divider for negative half",
          "Use back-to-back diodes (D1=D2) for equal clipping of both halves → pop filter for speakers",
        ],
      },
    ],
    designRules: [
      "Single diode clips one polarity; dual matched diodes clip both equally",
      "When D1=D2 matched, output approaches square wave — useful as pop filter for speakers and headphones",
    ],
    notes: "From Mims Basic Semiconductor Circuits. Three variants: (1) single-sided clip with adjustable level, (2) bipolar adjustable attenuator with dual diodes, (3) audio limiter with coupling cap + back-to-back diodes to speaker. For REC: audio limiter version protects speakers from pops and static. Bipolar clipper useful for converting sine to near-square wave.",
  },

  // ──────────────────────────────────────────────────
  // Diode Voltage Regulator (String)
  // ──────────────────────────────────────────────────
  {
    id: "mims-diode-voltage-regulator",
    name: "Diode String Voltage Regulator",
    description: "Series diodes provide a regulated output equal to the sum of their forward voltage drops. Simple but effective for low-current applications.",
    category: "voltage-regulator",
    blocks: [
      {
        id: "diode-reg-block",
        name: "Diode String Regulator",
        type: "voltage-regulator",
        components: [
          {
            refDes: "R1",
            value: "varies",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "RESISTOR",
            eaglePackage: "RESC2012X65",
            description: "Series current-limiting resistor. R1 = (Vin - Vout) / I",
            critical: true,
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Regulation diode — each drops ~0.6V (silicon)",
          },
          {
            refDes: "D2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Second regulation diode",
          },
        ],
        nets: [
          { name: "+VIN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "D_CHAIN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "VOUT", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "D2", pin: "A" }] },
        ],
        designRules: [
          "Vout = n * 0.6V where n = number of diodes",
          "R1 and diodes must have proper power rating — use Ohm's law",
          "Not precision — Vf varies with current and temperature",
          "Example: 6V supply, 1 diode → 5.4V output for TTL chips",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Vout = n * 0.6V. Typical: 1N914/1N4148. For REC: quick-and-dirty voltage drop for non-critical applications. For precision regulation, use LM7805 or LM1117. Useful for dropping battery voltage by small amounts (e.g., 4.8V NiMH pack → 3.6V for 3.3V-tolerant circuits).",
  },

  // ──────────────────────────────────────────────────
  // Triangle-to-Sine Wave Converter
  // ──────────────────────────────────────────────────
  {
    id: "mims-triangle-to-sine",
    name: "Triangle-to-Sine Wave Converter",
    description: "Converts triangle wave to approximate sine wave using diode nonlinearity. R1=10K, D1/D2=1N914.",
    category: "filter",
    blocks: [
      {
        id: "tri-sine-block",
        name: "Diode Waveshaper",
        type: "filter",
        components: [
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Series resistor",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Positive half shaper",
          },
          {
            refDes: "D2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Negative half shaper",
          },
        ],
        nets: [
          { name: "TRI_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SINE_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }, { refDes: "D2", pin: "K" }] },
        ],
        designRules: [
          "Input: ±2.5V triangle wave → output: ±0.5V approximate sine wave",
          "D1 anode to output, cathode to ground; D2 cathode to output, anode to ground",
          "Amplitude is reduced significantly — follow with amplifier if needed",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Exploits the exponential I-V curve of silicon diodes to round off triangle wave peaks into approximate sine shape. For REC: useful for generating sine-ish audio tones from 555/CMOS oscillator triangle/square outputs without needing a dedicated sine oscillator.",
  },

  // ──────────────────────────────────────────────────
  // Peak-Reading Voltmeter
  // ──────────────────────────────────────────────────
  {
    id: "mims-peak-voltmeter",
    name: "Peak-Reading Voltmeter",
    description: "Diode + capacitor peak detector allows a DC meter to read the peak voltage of an AC signal.",
    category: "test-equipment",
    blocks: [
      {
        id: "peak-voltmeter-block",
        name: "Peak Detector",
        type: "sensor-interface",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Peak rectifier diode",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Current limiting resistor",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Peak hold capacitor — charges to peak value through D1",
          },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "D1", pin: "A" }, to: [] },
          { name: "PEAK_OUT", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Use digital multimeter on DC voltage to read the peak",
          "Signal frequency must be high enough to keep C1 charged between peaks",
          "Larger C1 = slower response but more stable reading",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. D1 conducts on positive peaks, charging C1 to the peak voltage minus one diode drop. M1 (0-1mA meter or digital multimeter) reads the DC value. For REC: useful for measuring peak sensor signals, audio peak levels, or AC signal amplitudes with a simple DC ADC input on MCU.",
  },

  // ──────────────────────────────────────────────────
  // Half-Wave Rectifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-half-wave-rectifier",
    name: "Half-Wave Rectifier",
    description: "Single diode passes only positive half of AC wave, producing pulsating DC. Simplest AC-to-DC conversion.",
    category: "rectifier",
    blocks: [
      {
        id: "half-wave-block",
        name: "Half-Wave Rectifier",
        type: "power-supply",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Rectifier diode — rated for peak inverse voltage of transformer secondary",
            critical: true,
          },
        ],
        nets: [
          { name: "AC_IN", from: { refDes: "D1", pin: "A" }, to: [] },
          { name: "DC_OUT", from: { refDes: "D1", pin: "K" }, to: [] },
        ],
        designRules: [
          "Output is pulsating DC — add filter capacitor for smoother DC",
          "Diode must be rated for peak inverse voltage (PIV = Vpeak of transformer)",
          "Also used to detect AM modulated radio signals (envelope detector)",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest rectifier — one diode converts AC to pulsating DC. Follow with large electrolytic cap (100-1000uF) for filtering. For REC power supplies: always use full-wave bridge instead for better efficiency and lower ripple.",
  },

  // ──────────────────────────────────────────────────
  // Full-Wave Bridge Rectifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-bridge-rectifier",
    name: "Full-Wave Bridge Rectifier",
    description: "Four-diode bridge rectifies both halves of AC wave into DC. Most common AC-to-DC conversion method.",
    category: "rectifier",
    blocks: [
      {
        id: "bridge-rect-block",
        name: "Bridge Rectifier",
        type: "power-supply",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Bridge diode 1",
          },
          {
            refDes: "D2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Bridge diode 2",
          },
          {
            refDes: "D3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Bridge diode 3",
          },
          {
            refDes: "D4",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Bridge diode 4",
          },
        ],
        nets: [
          { name: "AC1", from: { refDes: "D1", pin: "A" }, to: [{ refDes: "D2", pin: "K" }] },
          { name: "AC2", from: { refDes: "D3", pin: "A" }, to: [{ refDes: "D4", pin: "K" }] },
          { name: "DC+", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "D3", pin: "K" }] },
          { name: "DC-", from: { refDes: "D2", pin: "A" }, to: [{ refDes: "D4", pin: "A" }] },
        ],
        designRules: [
          "Available as single 4-pin module (saves board space) or 4 discrete diodes",
          "Output drops ~1.2V (two diode drops) from AC peak",
          "Follow with large filter capacitor: C >= 10000 * Iload / Vripple (uF, A, V)",
          "All diodes must be rated for full PIV and load current",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Transforms both halves of AC wave to DC. Also called bridge rectifier. D1-D4 available as single module. For REC: used in all AC-powered products (grill controllers, oven boards). Follow with 470-1000uF electrolytic + 0.1uF ceramic for clean DC. For higher efficiency, use Schottky bridge (drops only 0.6V total vs 1.2V silicon).",
  },

  // ──────────────────────────────────────────────────
  // Cascade Voltage Doubler
  // ──────────────────────────────────────────────────
  {
    id: "mims-voltage-doubler",
    name: "Cascade Voltage Doubler",
    description: "Produces DC output of approximately 2x the AC input peak voltage using 2 diodes and 2 capacitors.",
    category: "rectifier",
    blocks: [
      {
        id: "doubler-block",
        name: "Voltage Doubler",
        type: "power-supply",
        components: [
          {
            refDes: "C1",
            value: "100uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100UF",
            eaglePackage: "CAPPRD500W60D1000H1200",
            description: "Charge capacitor — rated for 2x Vin peak",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "First stage rectifier",
          },
          {
            refDes: "C2",
            value: "100uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100UF",
            eaglePackage: "CAPPRD500W60D1000H1200",
            description: "Output filter capacitor — rated for 2x Vin peak",
          },
          {
            refDes: "D2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Second stage rectifier",
          },
        ],
        nets: [
          { name: "AC_IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "STAGE1", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "D1", pin: "A" }, { refDes: "D2", pin: "K" }] },
          { name: "DC_OUT", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "GND", from: { refDes: "D2", pin: "A" }, to: [{ refDes: "C2", pin: "2" }] },
        ],
        designRules: [
          "All components rated for 2x Vin peak minimum",
          "Use large capacitors to reduce output ripple",
          "Low current capability — not for high-power loads",
          "CAUTION: output voltage can be dangerous — use care!",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Also describes bridge voltage doubler (4 diodes, 2 caps) and voltage quadrupler (4 diodes, 4 caps → Vout = 4 * Vin_peak). CAUTION: voltage multiplier circuits produce HIGH VOLTAGES. For REC: rarely needed since switching regulators are more efficient, but useful for generating bias voltages for neon indicators, Nixie tubes, or test equipment.",
  },

  // ──────────────────────────────────────────────────
  // Zener Voltage Indicator (LED Bar)
  // ──────────────────────────────────────────────────
  {
    id: "mims-zener-voltage-indicator",
    name: "Zener Voltage Indicator (LED Bar)",
    description: "Series zener diodes with LEDs create a voltage-level indicator. LEDs light in sequence as input voltage rises.",
    category: "voltage-regulator",
    blocks: [
      {
        id: "voltage-indicator-block",
        name: "Zener LED Bar",
        type: "led-driver",
        components: [
          {
            refDes: "R1",
            value: "330",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "330R_0805",
            eaglePackage: "RESC2012X65",
            description: "Current limiter for first LED stage",
          },
          {
            refDes: "D1",
            value: "5V",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "ZENER_5V",
            eaglePackage: "SOD3716X135N",
            description: "5V zener — LED1 lights above 5V",
          },
          {
            refDes: "D2",
            value: "9V",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "ZENER_9V",
            eaglePackage: "SOD3716X135N",
            description: "9V zener — LED2 lights above 9V",
          },
        ],
        nets: [
          { name: "INPUT", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "STAGE1", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "K" }] },
        ],
        designRules: [
          "Choose zener voltages to match desired threshold levels",
          "Series resistors limit LED current — choose for desired brightness",
          "Can use different zener values or same zeners for equal voltage increments",
          "Input range 0-15V shown — scale resistors for higher voltages",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. LEDs glow in sequence as input voltage rises past each zener threshold. R1-R5 values: 330, 470, 680, 1K, 1.2K. D1-D5 zener values: 5V, 9V, 12V, 15V. Alternative: use same-value zeners with series current-limiting resistors for equal steps. For REC: useful for battery level indicators, power supply voltage monitors. Modern alternative: LM3914 dot/bar driver IC.",
  },

  // ──────────────────────────────────────────────────
  // Zener Waveform Clipper
  // ──────────────────────────────────────────────────
  {
    id: "mims-zener-waveform-clipper",
    name: "Zener Waveform Clipper",
    description: "Zener diode clips signal at breakdown voltage. Single zener clips one polarity; back-to-back zeners clip both halves symmetrically.",
    category: "protection",
    blocks: [
      {
        id: "zener-clipper-block",
        name: "Zener Clipper",
        type: "protection",
        components: [
          {
            refDes: "R1",
            value: "varies",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "RESISTOR",
            eaglePackage: "RESC2012X65",
            description: "Series input resistor — see p.22 for values",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "ZENER",
            eaglePackage: "SOD3716X135N",
            description: "Clipping zener — clips at Vz in reverse, 0.6V in forward",
          },
        ],
        nets: [
          { name: "IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "D1", pin: "K" }] },
          { name: "GND", from: { refDes: "D1", pin: "A" }, to: [] },
        ],
        designRules: [
          "Single zener: clips positive at Vz, negative at 0.6V",
          "Back-to-back (cathodes tied): clips both halves at Vz + 0.6V",
          "Also converts sine to near-square wave — useful as pop filter for speakers",
          "Choose R1 to limit current through zener to within power rating",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Two variants: (1) single zener clips one polarity at Vz, reduces amplitude and also converts to near-square wave; (2) back-to-back zeners (D1=D2, cathodes tied together) clip both halves symmetrically at Vz+0.6V. For REC: use back-to-back 5.1V zeners for ESD/overvoltage protection on MCU GPIO pins. Use as pop filter: D1=D2 across speaker to clip noise spikes.",
  },

  // ──────────────────────────────────────────────────
  // Diode Logic Gates (OR, AND, NOR, NAND)
  // ──────────────────────────────────────────────────
  {
    id: "mims-diode-logic-gates",
    name: "Diode Logic Gates",
    description: "Simple logic gates built from diodes and resistors. OR gate: diodes from inputs to output with pull-down. AND gate: diodes from inputs with pull-up.",
    category: "logic",
    blocks: [
      {
        id: "diode-or-gate",
        name: "Diode OR Gate",
        type: "logic",
        components: [
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Input A diode",
          },
          {
            refDes: "D2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Input B diode",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-down / LED current limiter",
          },
        ],
        nets: [
          { name: "A", from: { refDes: "D1", pin: "A" }, to: [] },
          { name: "B", from: { refDes: "D2", pin: "A" }, to: [] },
          { name: "OUT", from: { refDes: "D1", pin: "K" }, to: [{ refDes: "D2", pin: "K" }, { refDes: "R1", pin: "1" }] },
        ],
        designRules: [
          "OR: Any high input → output high. Both low → output low.",
          "AND: Both inputs high → output high. Either low → output low.",
          "NOR/NAND: Add transistor inverter after OR/AND gate",
          "0 = Ground, 1 = +6V in Mims circuits",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Four gate types shown: OR (diodes anodes from inputs, cathodes to output+pulldown), AND (diodes cathodes from inputs, anodes to output+pullup), NOR (OR + transistor inverter), NAND (AND + transistor inverter). Use 1N914/1N4148 for input diodes. For REC: these are educational — real designs use CMOS 74HC series or MCU firmware. But diode OR gates are still useful for power supply ORing (combine two supply sources).",
  },

  // ──────────────────────────────────────────────────
  // Decimal-to-Binary Encoder (Diode ROM)
  // ──────────────────────────────────────────────────
  {
    id: "mims-decimal-binary-encoder",
    name: "Decimal-to-Binary Encoder (Diode ROM)",
    description: "Programmable read-only memory using diode matrix. 10 decimal input switches produce 4-bit binary output.",
    category: "logic",
    blocks: [
      {
        id: "diode-rom-block",
        name: "Diode Matrix Encoder",
        type: "logic",
        components: [
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-up resistor for bit D (MSB)",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-up resistor for bit C",
          },
          {
            refDes: "R3",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-up resistor for bit B",
          },
          {
            refDes: "R4",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-up resistor for bit A (LSB)",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "R3", pin: "1" }, { refDes: "R4", pin: "1" }] },
        ],
        designRules: [
          "Diodes connect each switch line to the appropriate bit outputs per truth table",
          "Switch 0 = 0000, Switch 1 = 0001, ..., Switch 9 = 1001",
          "Use 1N914/1N4148 for all matrix diodes",
          "LEDs on output lines show binary value (OFF=0, ON=1)",
          "This is a hardware lookup table — same principle as early ROM chips",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. A 10-input, 4-output diode matrix that converts decimal switch positions to BCD binary. Each diode connects a switch line to a bit output where that bit should be '1'. For REC: educational — demonstrates the fundamental principle behind ROM, PROM, and lookup tables. Same concept used in keyboard matrix scanning.",
  },

  // ──────────────────────────────────────────────────
  // Basic Transistor Switches (3 variants)
  // ──────────────────────────────────────────────────
  {
    id: "mims-transistor-switches",
    name: "Basic Transistor Switches",
    description: "Three NPN switch configurations: (1) toggle on with S1=HI, (2) toggle on with S1=LO, (3) inverted output. All use 2N2222 with 1K base and collector resistors.",
    category: "relay-driver",
    blocks: [
      {
        id: "npn-switch-hi-on",
        name: "NPN Switch — HI=ON",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN switch transistor",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base resistor — input to base",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector load resistor / LED current limiter",
          },
        ],
        nets: [
          { name: "IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "BASE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "+9V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "S1=HI (connected to +9V through R1): LED ON. S1=LO: LED OFF.",
          "Variant 2: S1 between base and +V — HI input turns ON",
          "Variant 3: Inverted — collector output is LOW when input is HIGH",
          "Replace LED+R2 with relay coil + flyback diode for relay driver",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. The three most fundamental BJT switch configurations. Variant 1: input to base through 1K, LED+1K from +9V to collector. Variant 2: SPDT switch selects +9V or GND to base. Variant 3: adds pull-up to collector for logic-level output inversion. For REC: these are the building blocks for all transistor driver circuits. Standard pattern: 2N2222 + 1K base resistor from 3.3V GPIO.",
  },

  // ──────────────────────────────────────────────────
  // Basic Transistor Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-basic-transistor-amplifier",
    name: "Basic Transistor Amplifier",
    description: "Single-stage common-emitter amplifier. 2N2222, +12V supply, gain ~50 (adjustable via R1).",
    category: "amplifier",
    blocks: [
      {
        id: "bjt-amp-block",
        name: "Common-Emitter Amplifier",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN amplifier transistor",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling capacitor — blocks DC, passes AC signal",
          },
          {
            refDes: "R1",
            value: "5K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "5K_POT",
            eaglePackage: "POT_3PIN",
            description: "Adjust R1 for best gain — sets bias point",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector load resistor",
          },
        ],
        nets: [
          { name: "IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "BASE", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "Q1", pin: "B" }] },
          { name: "+12V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "OUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Adjust R1 to give best results — sets the DC bias point of Q1",
          "Test circuit gave gain (Vout/Vin) = 50",
          "Output is inverted (180° phase shift) — common-emitter characteristic",
          "Add emitter resistor (100-470 ohm) for temperature stability at cost of lower gain",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest single-transistor audio amplifier. +12V supply, 2N2222. Input coupling cap blocks DC. R1 pot adjusts bias for optimal operating point. For REC: useful as a quick preamp for sensor signals. For audio: feed into LM386 power amp for speaker output. Many NPN transistors can substitute for 2N2222.",
  },

  // ──────────────────────────────────────────────────
  // Relay Controller (Timed Pulse)
  // ──────────────────────────────────────────────────
  {
    id: "mims-relay-controller",
    name: "Relay Controller (Timed Pulse Driver)",
    description: "Two-transistor circuit drives relay with adjustable pulse rate and duration. R1 controls rate, C1 controls on-time per pulse.",
    category: "relay-driver",
    blocks: [
      {
        id: "relay-controller-block",
        name: "Pulsed Relay Driver",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP oscillator transistor — generates timing pulses",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN relay driver transistor",
          },
          {
            refDes: "R1",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Controls pulse rate",
          },
          {
            refDes: "R2",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Q1 base bias resistor",
          },
          {
            refDes: "C1",
            value: "0.1-1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CAPACITOR",
            eaglePackage: "CAPC2012X110",
            description: "Timing cap — controls pulse duration. 0.1uF to 1uF.",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Flyback protection diode across relay coil",
            critical: true,
          },
          {
            refDes: "R4",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "R4 controls flash rate when used with flash lamps",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "R1 controls pulse rate, C1 controls on-time per pulse",
          "Use for flash lamps and motor control — pulsed relay operation",
          "ALWAYS include D1 flyback diode across relay coil",
          "Relay must be low-voltage type (275-004 or equivalent)",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Supplies sequence of drive pulses to relay. R1 and C1 control pulse rate and time relay is closed per pulse. For REC: useful for pulsed solenoid drivers in pinball (prevents coil burnout from stuck switches), flash lamp controllers, and timed valve actuators in grill controllers.",
  },

  // ──────────────────────────────────────────────────
  // LED Constant Current Regulator
  // ──────────────────────────────────────────────────
  {
    id: "mims-led-constant-current",
    name: "LED Constant Current Regulator",
    description: "Two-transistor current regulator supplies constant current to LED regardless of supply voltage changes (5-15V). I_led = 0.7V / R3.",
    category: "voltage-regulator",
    blocks: [
      {
        id: "led-cc-block",
        name: "Constant Current Source",
        type: "led-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP pass transistor — controls current to LED",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN sense transistor — monitors voltage across R3",
          },
          {
            refDes: "R1",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Q1 base pull-up",
          },
          {
            refDes: "R2",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Q2 collector to Q1 base — feedback path",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Current sense resistor — I_led = 0.7V / R3. 100 ohm → 7mA.",
            critical: true,
          },
        ],
        nets: [
          { name: "+5-15V", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "LED_ANODE", from: { refDes: "Q1", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "I_led = 0.7 / R3. For 7mA: R3=100. For 20mA: R3=35 (use 33 ohm).",
          "Works across 5-15V supply range — current stays constant",
          "Q2 turns on when voltage across R3 reaches 0.7V, limiting Q1 current",
          "Excellent for battery-powered LED indicators where voltage sags over time",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Two-transistor current mirror/regulator. R3 is the current programming resistor: I = 0.7 / R3. Supply voltage can vary 5-15V and LED current remains constant. For REC: excellent for battery-powered products where supply voltage decreases as battery drains — LED brightness stays constant. Also useful for driving laser diodes where current control is critical.",
  },

  // ──────────────────────────────────────────────────
  // 3-Volt Speaker Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-3v-speaker-amp",
    name: "3-Volt Speaker Amplifier",
    description: "Single-transistor speaker driver for low-power audio. Uses transformer coupling to 8-ohm speaker. +3V supply, 2N2222.",
    category: "audio",
    blocks: [
      {
        id: "3v-amp-block",
        name: "Transformer-Coupled Speaker Amp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Amplifier transistor",
          },
          {
            refDes: "C1",
            value: "4.7uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling capacitor",
          },
          {
            refDes: "R1",
            value: "15K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "15K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base bias resistor from +3V",
          },
          {
            refDes: "R2",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base-to-ground bias",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Emitter resistor — stabilizes bias",
          },
          {
            refDes: "T1",
            description: "Audio transformer: 8 ohm primary to 8 ohm speaker secondary",
          },
        ],
        nets: [
          { name: "+3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "R3", pin: "2" }] },
        ],
        designRules: [
          "Use transformer coupling for impedance matching to 8-ohm speaker",
          "Runs on 2 AA batteries — very low power consumption",
          "Good for adding speaker output to radios and tape players without built-in speakers",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Low-power speaker amp using transformer coupling. Good for coin-cell or 2xAA battery projects. For REC: modern alternative is LM386 (no transformer needed, direct speaker drive). But this circuit is useful when LM386 isn't available or when you need absolute minimum component count from 3V.",
  },

  // ──────────────────────────────────────────────────
  // 2-Stage Speaker Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-2stage-speaker-amp",
    name: "2-Stage Speaker Amplifier",
    description: "Two-transistor amplifier with transformer-coupled output. Higher gain than single stage. +3V supply.",
    category: "audio",
    blocks: [
      {
        id: "2stage-amp-block",
        name: "2-Stage Transformer Amp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "First stage (preamp) transistor",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Second stage (driver) transistor — drives transformer",
          },
          {
            refDes: "T1",
            description: "Input transformer: 8 ohm to 1K center-tapped",
          },
          {
            refDes: "C1",
            value: "4.7uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Interstage coupling capacitor",
          },
        ],
        nets: [
          { name: "+3V", from: { refDes: "Q2", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Requires input transformer for impedance matching",
          "Higher gain than single-stage — suitable for weaker signals",
          "No input transformer needed if driven from high-impedance source",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Two-stage gives more gain for weaker input signals. Uses input transformer. R1-R9 provide bias: R1=15K, R2=15K, R3=1K, R4=100, R5=15K, R7=15K, R8=100, R9=15K. C1-C5 for coupling: 4.7uF interstage. For REC: again, LM386 is the modern go-to, but understanding 2-stage discrete amps helps when debugging audio signal chains.",
  },

  // ──────────────────────────────────────────────────
  // Microphone Preamplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-mic-preamp",
    name: "Microphone Preamplifier",
    description: "Single-transistor preamp for electret microphone elements. +9V supply, 2N2222. Output feeds into power amplifier.",
    category: "audio",
    blocks: [
      {
        id: "mic-preamp-block",
        name: "Electret Mic Preamp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Preamp transistor",
          },
          {
            refDes: "R1",
            value: "15K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "15K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base bias from +9V",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Emitter resistor — sets gain and stabilizes bias",
          },
          {
            refDes: "R4",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector load",
          },
          {
            refDes: "R5",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Gain control potentiometer (or fixed resistor)",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling from microphone",
          },
          {
            refDes: "C2",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Output coupling to amplifier",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "MIC", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "C2", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "R2", pin: "2" }, to: [] },
        ],
        designRules: [
          "Keep microphone leads SHORT or use shielded cable — picks up hum easily",
          "Use with electret microphone element (has built-in FET preamp)",
          "Output feeds into LM386 or similar power amplifier",
          "For tape recorders, public address systems, portable amplifiers",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Standard electret mic preamp pattern. R1=15K, R2=1K, R4=1K, R5=10K (gain). C1=C2=0.1uF, C3=1uF bypass. For REC: useful for sound-level detection in pinball (player voice triggers), grill temperature alert (audible alarm), or intercom systems. Keep mic leads short — #1 cause of noise problems.",
  },

  // ──────────────────────────────────────────────────
  // Audio Mixer (2-Channel)
  // ──────────────────────────────────────────────────
  {
    id: "mims-audio-mixer",
    name: "Audio Mixer (2-Channel BJT)",
    description: "Combines two audio signals into one output using a single 2N2222 mixing stage. +9V supply. Expandable to more inputs.",
    category: "audio",
    blocks: [
      {
        id: "mixer-block",
        name: "2-Channel Mixer",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Mixing amplifier transistor",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input A coupling capacitor",
          },
          {
            refDes: "C2",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input B coupling capacitor",
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input A level control",
          },
          {
            refDes: "R2",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input B level control",
          },
          {
            refDes: "R3",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Mixing node to base",
          },
          {
            refDes: "R5",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector load — feeds amplifier stage",
          },
        ],
        nets: [
          { name: "A", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "B", from: { refDes: "C2", pin: "1" }, to: [] },
          { name: "+9V", from: { refDes: "R5", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Add more input networks (C, R, R) for additional channels",
          "R1 and R2 can be potentiometers for individual volume control",
          "Output to amplifier (LM386) for speaker drive",
          "Use to combine signals from two or more microphones, preamps, etc.",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=R2=100K, R3=10K, R4=1K, R5=10K, R7=15K, R8=1K. C1=C2=0.1uF, C3=0.1uF output, C4=1uF bypass. Add more (C, R1, R3) input networks for additional channels. For REC: useful for mixing multiple audio sources in pinball sound systems. Modern alternative: op-amp summing amplifier or dedicated audio mixer IC.",
  },

  // ──────────────────────────────────────────────────
  // Audio Oscillator (2-Transistor)
  // ──────────────────────────────────────────────────
  {
    id: "mims-audio-oscillator",
    name: "Audio Oscillator (2-Transistor)",
    description: "Generates audio tones from a few Hz to several kHz. Frequency controlled by R3 pot. Direct speaker drive. +1.5V to +12V.",
    category: "oscillator",
    blocks: [
      {
        id: "audio-osc-block",
        name: "BJT Audio Oscillator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP oscillator transistor",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN oscillator transistor",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Q1 base bias",
          },
          {
            refDes: "R3",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Frequency control — adjusts oscillation rate",
          },
          {
            refDes: "C1",
            value: "0.01uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.01UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — determines base frequency",
          },
          {
            refDes: "R4",
            value: "10",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10R_0805",
            eaglePackage: "RESC2012X65",
            description: "Speaker series resistor",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "R4", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "Supply: +1.5V to +12V — very versatile supply range",
          "R3 controls frequency, C1 sets range",
          "For very slow frequencies, increase C1",
          "Use many different transistor types for Q1 and Q2",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Complementary-pair (PNP+NPN) oscillator. R1=10K, R2=68K, R3=50K pot (freq), R4=10 ohm speaker. C1=0.01uF. Frequency range up to several thousand Hz. For REC: useful for audible alerts in grill controllers (temperature alarm), pinball sound effects, or continuity testers. Very low component count — good for space-constrained boards.",
  },

  // ──────────────────────────────────────────────────
  // Metronome
  // ──────────────────────────────────────────────────
  {
    id: "mims-metronome",
    name: "Metronome (2-Transistor Click Generator)",
    description: "Produces rhythmic clicks at adjustable rate. R2 controls click rate. 2N2222 + 2N2907, +9V, 8-ohm speaker.",
    category: "oscillator",
    blocks: [
      {
        id: "metronome-block",
        name: "Click-Rate Oscillator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Timing transistor",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "Speaker driver transistor",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Bias resistor",
          },
          {
            refDes: "R2",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Click rate control",
          },
          {
            refDes: "C1",
            value: "22uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — large value for slow clicks",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "Q2", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Variation of the audio oscillator — R2 controls the click rate",
          "OK to use various transistors for Q1 and Q2",
          "Large C1 (22uF) produces slow, distinct clicks",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Same complementary-pair topology as audio oscillator but with larger timing cap for slow clicks. For REC: same circuit principle used for low-frequency alert beepers, heartbeat indicators, and status blinkers.",
  },

  // ──────────────────────────────────────────────────
  // Logic Probe
  // ──────────────────────────────────────────────────
  {
    id: "mims-logic-probe",
    name: "Logic Probe (LED Indicator)",
    description: "Simple logic state indicator — LED lights when input is logic HIGH. 2N2222, +5V supply.",
    category: "test-equipment",
    blocks: [
      {
        id: "logic-probe-block",
        name: "Logic Level Detector",
        type: "sensor-interface",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Switch transistor — turns on when probe sees logic HIGH",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Probe input resistor — limits current from circuit under test",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "LED current limiter",
          },
        ],
        nets: [
          { name: "PROBE", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "+5V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Logic LO = LED OFF, Logic HI = LED ON",
          "Power from circuit under test (+5V and GND)",
          "10K input resistor prevents loading the circuit",
          "For REC bench testing: quick way to trace signals on prototype boards",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest possible logic probe — one transistor, two resistors, one LED. For REC: useful for quick debugging of GPIO outputs, clock signals, and communication lines during prototyping. Modern alternative: use oscilloscope or logic analyzer, but this is handy when those aren't available.",
  },

  // ──────────────────────────────────────────────────
  // Adjustable Siren
  // ──────────────────────────────────────────────────
  {
    id: "mims-adjustable-siren",
    name: "Adjustable Siren (Rising/Falling Tone)",
    description: "Two-transistor siren generates rising tone when S1 closed, falling tone when opened. S2 selects tone range. +3V to +9V.",
    category: "audio",
    blocks: [
      {
        id: "siren-block",
        name: "Siren Generator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor 1",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor 2",
          },
          {
            refDes: "R1",
            value: "22K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22K_0805",
            eaglePackage: "RESC2012X65",
            description: "Timing resistor",
          },
          {
            refDes: "C1",
            value: "22uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Sweep capacitor — charges/discharges to create rising/falling tone",
          },
          {
            refDes: "R4",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Frequency adjustment",
          },
        ],
        nets: [
          { name: "+3-9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "Q2", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "S1 closes to start rising tone (C1 charges), opens for falling tone (C1 discharges)",
          "S2 and R4 select/adjust tone range",
          "C3=0.022 and C4=0.1 set audio frequency range",
          "R2=39K, R3=15K for standard siren sound",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. C1 (22uF) charges through R1 (22K) when S1 closed → rising pitch. C1 discharges when S1 opens → falling pitch. R2=39K, R3=15K, R4=50K pot. C3=0.022, C4=0.1. For REC: ideal for audible alarms — temperature over-limit in grill controller, or warning siren in pinball. The rising/falling tone is more attention-getting than a steady beep.",
  },

  // ──────────────────────────────────────────────────
  // Audio Noise Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-noise-generator",
    name: "Audio Noise Generator",
    description: "Generates white noise using reverse-biased transistor junction as noise source. Use for sound effects, acoustic testing.",
    category: "audio",
    blocks: [
      {
        id: "noise-gen-block",
        name: "Transistor Noise Source",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Noise source — reverse-biased base-emitter junction generates broadband noise",
            critical: true,
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Bias resistor for noise source",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector load",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Output coupling — noise signal to amplifier",
          },
        ],
        nets: [
          { name: "+6-12V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "NOISE_OUT", from: { refDes: "C1", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Q1 base-emitter junction is reverse-biased — operates in avalanche/zener mode",
          "Output is broadband white noise — feed into amplifier (LM386) for speaker",
          "Use to create fuzz sound, explosion effects, rain/wind sounds",
          "Also useful as noise source for testing room acoustics with sound meter",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Reverse-biased B-E junction of 2N2222 generates avalanche noise. R1=100K, R2=1K, C1=0.1uF coupling to amplifier. For REC: white noise useful for pinball sound effects (explosions, crowd noise). Also useful for testing audio equipment frequency response. Supply +6 to +12V.",
  },

  // ──────────────────────────────────────────────────
  // Light-Activated Flasher
  // ──────────────────────────────────────────────────
  {
    id: "mims-light-activated-flasher",
    name: "Light-Activated LED Flasher",
    description: "LED flashes when phototransistor is illuminated. Disabled in dark. C1 controls flash rate. +4.5 to +6V.",
    category: "flasher",
    blocks: [
      {
        id: "light-flasher-block",
        name: "Phototransistor-Controlled Flasher",
        type: "led-driver",
        components: [
          {
            refDes: "Q1",
            description: "Phototransistor — light sensor input",
            critical: true,
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP oscillator transistor",
          },
          {
            refDes: "Q3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN LED driver transistor",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Flash rate timing capacitor",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Phototransistor load resistor",
          },
          {
            refDes: "R2",
            value: "2M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2.2M_0805",
            eaglePackage: "RESC2012X65",
            description: "Oscillator timing resistor",
          },
        ],
        nets: [
          { name: "+4.5-6V", from: { refDes: "Q1", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q3", pin: "E" }, to: [] },
        ],
        designRules: [
          "LED flashes when Q1 (phototransistor) is illuminated by sunlight or artificial light",
          "When Q1 is dark, the flasher is disabled (saves battery)",
          "C1 controls the flash rate",
          "Can be used as a warning flasher that activates at night (reverse Q1 logic)",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Three-transistor circuit: Q1=phototransistor, Q2=2N2907 (oscillator), Q3=2N2222 (LED driver). R1=1K, R2=2M. For REC: useful for light-responsive indicators — flash only when light is present (or reversed: dark-activated flasher for nighttime warnings). Pinball application: playfield flashers that respond to ambient lighting conditions.",
  },

  // ──────────────────────────────────────────────────
  // Dark-Activated Flasher
  // ──────────────────────────────────────────────────
  {
    id: "mims-dark-activated-flasher",
    name: "Dark-Activated LED Flasher",
    description: "LED flashes when ambient light drops below threshold. Warning flasher that turns on at night. +4.5 to +6V.",
    category: "flasher",
    blocks: [
      {
        id: "dark-flasher-block",
        name: "Dark-Sensing Flasher",
        type: "led-driver",
        components: [
          {
            refDes: "Q1",
            description: "Phototransistor — detects darkness when NOT illuminated",
            critical: true,
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP timing transistor",
          },
          {
            refDes: "Q3",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN LED driver",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Flash rate capacitor",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Phototransistor load",
          },
          {
            refDes: "R2",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "Oscillator timing",
          },
        ],
        nets: [
          { name: "+4.5-6V", from: { refDes: "Q2", pin: "E" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Flasher activates when Q1 phototransistor is in darkness",
          "C1 controls flash rate",
          "Can be used as a warning flasher that turns on at night",
          "For pinball: auto-activate attract-mode flashers when room lights are dimmed",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Inverse of light-activated flasher. R1=1K, R2=1M. When Q1 is dark, Q2+Q3 oscillate and flash the LED. For REC: dark-sensing circuits useful for auto-dimming displays, nighttime warning flashers, and power-saving features that disable indicators in bright environments.",
  },

  // ──────────────────────────────────────────────────
  // High-Brightness Flasher (Lamp Driver)
  // ──────────────────────────────────────────────────
  {
    id: "mims-high-brightness-flasher",
    name: "High-Brightness Flasher (Lamp Driver)",
    description: "Drives incandescent lamp with high-current pulses. 4-transistor circuit. R1 controls flash rate. +6V.",
    category: "flasher",
    blocks: [
      {
        id: "hb-flasher-block",
        name: "High-Current Lamp Flasher",
        type: "led-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor 1",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor 2",
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Flash rate control — adjust for desired flash frequency",
          },
          {
            refDes: "R5",
            value: "10",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10R_0805",
            eaglePackage: "RESC2012X65",
            description: "Current limiting for lamp — adjust with care",
          },
          {
            refDes: "C1",
            value: "22uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — controls flash rate with R1",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "Q2", pin: "E" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Sends high-current pulse to lamp about once per second",
          "R1 controls flash rate — do NOT allow lamp to stay ON continuously",
          "L1 is a #14 or #243 lamp — do not exceed rated current",
          "R1 should be adjusted with care — R1 too low = lamp stays on and burns out",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. 4-transistor circuit: Q1=2N2222, Q2=2N2907, plus driver pair. R1=100K, R2=1K, R3=5.6K, R4=1K, R5=10 ohm. C1=22uF. Lamp is #14 or #243. For REC pinball: direct application for playfield flasher lamps. Modern version: replace lamp with high-power LED and adjust R5. Same timing principle used in pinball flasher control boards.",
  },

  // ──────────────────────────────────────────────────
  // LED Transmitter/Receiver
  // ──────────────────────────────────────────────────
  {
    id: "mims-led-transmitter-receiver",
    name: "LED Transmitter/Receiver (Tone-Modulated)",
    description: "Sends audio tone over IR LED beam to phototransistor receiver with piezo alerter output. Optical communication link.",
    category: "communication",
    blocks: [
      {
        id: "led-tx-block",
        name: "IR LED Transmitter",
        type: "led-driver",
        components: [
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "LED driver transistor",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Steering diode",
          },
          {
            refDes: "R1",
            value: "22K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22K_0805",
            eaglePackage: "RESC2012X65",
            description: "Oscillator timing resistor",
          },
          {
            refDes: "C1",
            value: "0.02uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.022UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Oscillator timing capacitor — sets tone frequency",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "Use high-output infrared LED for maximum range",
          "Lenses on LED and phototransistor increase range significantly",
          "Sends tone-modulated light beam — receiver detects tone, not just light level",
        ],
      },
      {
        id: "led-rx-block",
        name: "Phototransistor Receiver",
        type: "sensor-interface",
        components: [
          {
            refDes: "Q1",
            description: "Phototransistor — detects modulated IR beam",
            critical: true,
          },
          {
            refDes: "R1",
            value: "47K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "47K_0805",
            eaglePackage: "RESC2012X65",
            description: "Phototransistor load — sets sensitivity",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Amplifier transistor",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Coupling capacitor — passes AC tone, blocks DC",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "Tone modulation rejects ambient light interference",
          "R5=22K output to piezo alerter element",
          "Add lens to phototransistor for longer range",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. TX: 2-transistor oscillator drives IR LED with tone-modulated signal. RX: phototransistor + amplifier + piezo output. R2=2.2M, R3=4.7K, R4=4.7K, R5=22K. C1=0.1uF. For REC: basis for optical break-beam sensors used in pinball (ball detection). Tone modulation makes it immune to ambient light changes — much more reliable than DC-level detection.",
  },

  // ──────────────────────────────────────────────────
  // Resistor-Transistor Logic Gates (RTL)
  // ──────────────────────────────────────────────────
  {
    id: "mims-rtl-logic-gates",
    name: "Resistor-Transistor Logic Gates (RTL)",
    description: "Discrete transistor logic gates: OR, NOR, AND, NAND, Inverter. Built from 2N2222 transistors and resistors. +6V supply.",
    category: "logic",
    blocks: [
      {
        id: "rtl-or-gate",
        name: "RTL OR Gate",
        type: "logic",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Input A transistor — parallel with Q2",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Input B transistor — parallel with Q1",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input A base resistor",
          },
          {
            refDes: "R2",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input B base resistor",
          },
          {
            refDes: "R3",
            value: "4.7K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector pull-up — also drives LED indicator",
          },
          {
            refDes: "R4",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "LED current limiter",
          },
        ],
        nets: [
          { name: "A", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "B", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "+6V", from: { refDes: "R3", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q1", pin: "C" }, { refDes: "Q2", pin: "C" }] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [{ refDes: "Q2", pin: "E" }] },
        ],
        designRules: [
          "OR: Q1 and Q2 collectors tied together (parallel). Either input HIGH → output LOW (inverted at collector), LED ON.",
          "NOR: Same as OR but output taken from collector — naturally inverted. A=0,B=0→LED ON; else LED OFF.",
          "AND: Q1 and Q2 collectors in series. Both must be ON for LED to light.",
          "NAND: AND with inverted output. Both HIGH → LED OFF; else LED ON.",
          "INVERTER: Single transistor with collector pull-up. A=0→LED OFF, A=1→LED ON.",
          "0 = Ground, 1 = +6V. All use 2N2222, R1=R2=10K base, R3=4.7K pull-up, R4=1K LED.",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Five RTL gate types using 2N2222. OR: parallel collectors (either on → current flows). AND: series collectors (both must be on). NOR/NAND: add inverting stage. Inverter: single transistor with R1=4.7K pull-up, R3=1K LED. For REC: educational — real designs use 74HC CMOS gates. But understanding discrete transistor logic helps debug and design custom gate circuits for special applications.",
  },

  // ──────────────────────────────────────────────────
  // Switch Debouncer
  // ──────────────────────────────────────────────────
  {
    id: "mims-switch-debouncer",
    name: "Switch Debouncer (One-Shot)",
    description: "Single clean output pulse from bouncy mechanical switch. 2N2222, C1 sets lock-out time. +3 to +15V.",
    category: "debounce",
    blocks: [
      {
        id: "debounce-block",
        name: "Transistor Debouncer",
        type: "debounce",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Debounce transistor — locks out retriggering during C1 charge",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Pull-up resistor",
          },
          {
            refDes: "R2",
            value: "4.7K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0805",
            eaglePackage: "RESC2012X65",
            description: "Timing resistor — with C1 sets lock-out period",
          },
          {
            refDes: "C1",
            value: "0.14uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Lock-out capacitor. 0.14uF = ~1 second. 220uF for longer.",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SWITCH", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "Q1", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Switch closure charges C1, which holds Q1 on for lock-out period",
          "Lock-out time ≈ R2 * C1. 4.7K * 0.14uF ≈ 0.66ms (adjust C1 for longer)",
          "For 1 second lock-out: C1 = 220uF",
          "Supplies single trigger pulse to logic circuits",
          "Supply: +3 to +15V",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Mechanical switches bounce for 1-50ms causing multiple false triggers. This circuit provides a single clean pulse. For REC: CRITICAL for pinball switch inputs — rollover switches, bumper contacts, and target switches all bounce. Hardware debounce is more reliable than firmware debounce for fast game events. Also essential for encoder inputs on grill controller knobs.",
  },

  // ──────────────────────────────────────────────────
  // JFET Switches (N-Channel)
  // ──────────────────────────────────────────────────
  {
    id: "mims-jfet-switches",
    name: "JFET Switches (N-Channel 2N3819)",
    description: "FET analog switches: SPST and SPDT configurations. Very high input impedance (megohms). +9V, gate controls on/off.",
    category: "fet",
    blocks: [
      {
        id: "jfet-switch-block",
        name: "N-FET Analog Switch",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3819",
            eaglePackage: "SOT-23-3",
            description: "N-channel JFET — drain-source acts as voltage-controlled resistor",
          },
          {
            refDes: "R1",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "Gate bias resistor",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Load/indicator resistor",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "CONTROL", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GATE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }] },
          { name: "DRAIN", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "Q1", pin: "D" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [] },
        ],
        designRules: [
          "NOTE: +9V, LO=-9V for N-FET. S1=HI → LED OFF. S1=LO → LED ON.",
          "SPDT variant: two FETs with complementary gate drives",
          "FETs draw zero gate current — ideal for high-impedance signal switching",
          "2N3819 is the standard N-channel JFET for signal-level switching",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. JFET switches have zero gate current (unlike BJT which draws base current). Three variants shown: (1) SPST with LO=ON, (2) SPST with HI=ON using two supplies, (3) SPDT using two complementary FETs. For REC: use for analog signal multiplexing where loading the source is unacceptable (sensor inputs, high-impedance audio). Modern alternative: CD4066 CMOS analog switch.",
  },

  // ──────────────────────────────────────────────────
  // Basic FET Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-basic-fet-amplifier",
    name: "Basic JFET Amplifier (Common Source)",
    description: "Single-stage JFET amplifier with very high input impedance. 2N3819, +9V. Gain ~2. Input impedance in megohms.",
    category: "fet",
    blocks: [
      {
        id: "fet-amp-block",
        name: "Common-Source JFET Amp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3819",
            eaglePackage: "SOT-23-3",
            description: "N-channel JFET amplifier — SGD pinout",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling capacitor",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Drain load resistor",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "GATE", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }] },
          { name: "OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "D" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [] },
        ],
        designRules: [
          "Very high input impedance — ideal for crystal mics, piezo pickups, pH probes",
          "Low gain (~2) but zero input loading",
          "Test circuit: R1=1K drain, Av = Vout/Vin = 2",
          "Self-biasing — no bias resistor network needed (gate-source is zero-biased)",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest JFET amplifier — just one FET, one resistor, one cap. Gain is low (~2x) but input impedance is extremely high (megohms). For REC: use as buffer between high-impedance sensors and low-impedance loads or ADC inputs. Essential for pH probes, crystal microphones, and capacitive sensors.",
  },

  // ──────────────────────────────────────────────────
  // Hi-Z Microphone Preamplifier (FET)
  // ──────────────────────────────────────────────────
  {
    id: "mims-hiz-mic-preamp",
    name: "Hi-Z Microphone Preamplifier (FET)",
    description: "JFET preamp for high-impedance crystal/ceramic microphones. 2N3819, +9V. R2 is gain control.",
    category: "audio",
    blocks: [
      {
        id: "hiz-preamp-block",
        name: "FET Mic Preamp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3819",
            eaglePackage: "SOT-23-3",
            description: "N-FET preamp — high impedance input matches crystal mics",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling",
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Gate bias resistor",
          },
          {
            refDes: "R2",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Gain control — adjustable or pot",
          },
          {
            refDes: "R4",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Source resistor — bias stabilization",
          },
          {
            refDes: "C3",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Output coupling to amplifier",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "MIC", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "C3", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "R4", pin: "2" }, to: [] },
        ],
        designRules: [
          "Keep microphone leads SHORT or use shielded cable",
          "R2 is gain control — can be pot for adjustable gain",
          "C2=47uF source bypass cap for full gain",
          "Output feeds into LM386 or similar power amp",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=100K, R2=470 (gain), R3=1M, R4=470. C1=1uF, C2=47uF, C3=1uF. FET preamp doesn't load high-impedance crystal microphones (unlike BJT which would attenuate the signal). For REC: use for piezo pickup amplification (vibration sensors, acoustic pickups), or any high-impedance transducer interface.",
  },

  // ──────────────────────────────────────────────────
  // Hi-Z Audio Mixer (FET)
  // ──────────────────────────────────────────────────
  {
    id: "mims-hiz-audio-mixer",
    name: "Hi-Z Audio Mixer (2-Channel FET)",
    description: "FET-based 2-channel audio mixer with individual gain controls. High input impedance. 2N3819, +9V.",
    category: "audio",
    blocks: [
      {
        id: "hiz-mixer-block",
        name: "FET 2-Channel Mixer",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3819",
            eaglePackage: "SOT-23-3",
            description: "FET mixing amplifier",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input A coupling",
          },
          {
            refDes: "C2",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input B coupling",
          },
          {
            refDes: "R1",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "Input A gain control (R1 and R2 control gain for A and B)",
          },
          {
            refDes: "R5",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Drain load — output to amplifier",
          },
        ],
        nets: [
          { name: "A", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "B", from: { refDes: "C2", pin: "1" }, to: [] },
          { name: "+9V", from: { refDes: "R5", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "R5", pin: "2" }, to: [{ refDes: "Q1", pin: "D" }] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [] },
        ],
        designRules: [
          "R1 and R2 control gain for inputs A and B independently",
          "Input can be high-impedance microphone, radio, etc.",
          "C4=1uF output coupling to amplifier",
          "Add more input networks for additional channels",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=R2=1M (gain), R3=R4=100K, R5=470, R6=100. C1=C2=1uF, C3=47uF, C4=1uF. High-impedance inputs won't load crystal mics or other hi-Z sources. For REC: use when mixing signals from piezo sensors or other high-impedance transducers.",
  },

  // ──────────────────────────────────────────────────
  // Power MOSFET Timers (On-After-Delay, On-During-Delay)
  // ──────────────────────────────────────────────────
  {
    id: "mims-mosfet-delay-timers",
    name: "Power MOSFET Delay Timers",
    description: "Two MOSFET timer variants: (1) On-after-delay — buzzer sounds after C1 charges. (2) On-during-delay — buzzer sounds until C1 discharges. Power MOSFET output.",
    category: "timer",
    blocks: [
      {
        id: "on-after-delay",
        name: "On-After-Delay Timer",
        type: "timer",
        components: [
          {
            refDes: "Q1",
            description: "Power MOSFET — drives piezo buzzer or load",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN timing transistor",
          },
          {
            refDes: "C1",
            value: "1-100uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CAPACITOR",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — larger = longer delay",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Charge resistor — with C1 sets delay time",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Q2 base bias",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "On-after-delay: press S1 to start. C1 charges through R1. After delay, buzzer sounds.",
          "On-during-delay: press S1 to start. Buzzer sounds immediately, stops when C1 charges.",
          "Delay ≈ R1 * C1. Large C1 = longer delay.",
          "Place large resistor across C1 to reduce delay. Q1 = power MOSFET, Q2 = 2N2222.",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Two complementary timer circuits using power MOSFET output stage. On-after-delay: useful for delayed alarms, turn-on delays for equipment warmup. On-during-delay: useful for timed alerts, reminder buzzers. For REC: oven preheat timer (buzzer after delay), grill ignition timer (gas valve on for X seconds during light-off sequence).",
  },

  // ──────────────────────────────────────────────────
  // Hi-Z Speaker Amplifier (FET + MOSFET)
  // ──────────────────────────────────────────────────
  {
    id: "mims-hiz-speaker-amp",
    name: "Hi-Z Speaker Amplifier (FET + Power MOSFET)",
    description: "High-impedance input speaker amplifier using JFET preamp + power MOSFET output. No transformer needed. +9V.",
    category: "audio",
    blocks: [
      {
        id: "hiz-spkr-block",
        name: "FET/MOSFET Speaker Amp",
        type: "amplifier",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3819",
            eaglePackage: "SOT-23-3",
            description: "JFET preamp — high impedance input",
          },
          {
            refDes: "Q2",
            description: "Power MOSFET — drives speaker through transformer T1",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling capacitor",
          },
          {
            refDes: "R1",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Gain control — R1 adjustable",
          },
          {
            refDes: "T1",
            description: "Audio output transformer to 8-ohm speaker",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "T1", pin: "SEC" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [] },
        ],
        designRules: [
          "R1 controls gain — can be pot for volume control",
          "R2=100K, R3=470, R4=100, R5=1M, R6=110K, R7=100",
          "C1=1uF, C2=1uF, C3=47uF, C4=47uF",
          "High-impedance input suitable for crystal mics and piezo pickups",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. JFET front-end for high-Z input + power MOSFET for speaker drive. More modern topology than BJT amp — FET input doesn't load the source. For REC: useful pattern for amplifying piezo vibration sensors into audible output (e.g., contact mic on grill detecting flame sounds for ignition confirmation).",
  },

  // ──────────────────────────────────────────────────
  // Dual LED Flasher (MOSFET)
  // ──────────────────────────────────────────────────
  {
    id: "mims-dual-led-flasher",
    name: "Dual LED Flasher (Power MOSFET)",
    description: "Two LEDs flash alternately. Power MOSFET outputs can drive high-current LEDs. R3 controls flash rate. +9V.",
    category: "flasher",
    blocks: [
      {
        id: "dual-flasher-block",
        name: "Alternating LED Flasher",
        type: "led-driver",
        components: [
          {
            refDes: "Q1",
            description: "Power MOSFET — drives LED 1",
          },
          {
            refDes: "Q2",
            description: "Power MOSFET — drives LED 2",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Bias resistor for Q1",
          },
          {
            refDes: "R3",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Flash rate control — adjustable",
          },
          {
            refDes: "C1",
            value: "22uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — with C2 sets flash rate",
          },
          {
            refDes: "C2",
            value: "22uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor",
          },
          {
            refDes: "R4",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "LED 1 current limiter",
          },
          {
            refDes: "R5",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "LED 2 current limiter",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "S" }, to: [{ refDes: "Q2", pin: "S" }] },
        ],
        designRules: [
          "LEDs flash alternately — classic astable multivibrator topology",
          "R3 controls flash rate quickly — short C1 or C2 if circuit fails to flash",
          "Q1, Q2 are power MOSFETs — can drive high-current LEDs or small lamps",
          "For faster flashing: reduce C1 and C2 values",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Classic astable multivibrator using power MOSFETs. R1=R2=10K, R3=10K, R4=R5=1K (LED). C1=C2=22uF. For REC pinball: alternating flasher for playfield features. Replace LEDs with high-power LEDs or small lamps. Flash rate adjustable via C1/C2 values.",
  },

  // ──────────────────────────────────────────────────
  // UJT Relaxation Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "mims-ujt-oscillator",
    name: "UJT Relaxation Oscillator",
    description: "Basic unijunction transistor oscillator. Frequency controlled by R1 and C1. Outputs sawtooth + spike waveforms. +5 to +18V.",
    category: "oscillator",
    blocks: [
      {
        id: "ujt-osc-block",
        name: "UJT Oscillator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            description: "2N4891 unijunction transistor (or equivalent UJT)",
            critical: true,
          },
          {
            refDes: "R1",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "Timing resistor — increase to reduce frequency",
          },
          {
            refDes: "R2",
            value: "2.2K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2.2K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base 2 resistor",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Base 1 resistor — spike output across this",
          },
          {
            refDes: "C1",
            value: "0.001uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1NF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — 0.001uF for audio, 470uF for ~1 minute",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "EMITTER", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "1" }, { refDes: "Q1", pin: "E" }] },
          { name: "B1_OUT", from: { refDes: "Q1", pin: "B1" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "GND", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "C1", pin: "2" }] },
        ],
        designRules: [
          "f ≈ 1 / (R1 * C1) approximately",
          "C1 charges through R1 until emitter voltage reaches firing point (~0.6 * Vbb)",
          "Then C1 rapidly discharges through B1 — producing spike output",
          "Sawtooth available at emitter, spike at B1",
          "Supply: +5V to +18V",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. 2N4891 UJT (or 2N2646). R1=1M, R2=2.2K, R3=100. C1 range: 0.001uF for audio tones → 470uF for ~1 minute timer cycle. UJT fires when emitter reaches ~60% of Vbb. For REC: UJTs are classic trigger sources for SCR/triac phase-angle control in lamp dimmers and motor controllers. Also the basis for the 1-minute timer circuit.",
  },

  // ──────────────────────────────────────────────────
  // UJT Low-Voltage Indicator
  // ──────────────────────────────────────────────────
  {
    id: "mims-ujt-low-voltage",
    name: "UJT Low-Voltage Indicator",
    description: "Sounds alarm tone when supply voltage drops below threshold. Select zener D1 for desired voltage. +3 to +18V.",
    category: "protection",
    blocks: [
      {
        id: "low-voltage-block",
        name: "Low-Voltage Alarm",
        type: "protection",
        components: [
          {
            refDes: "Q1",
            description: "2N4891 UJT — oscillates when supply is below threshold",
          },
          {
            refDes: "D1",
            description: "Zener diode — select voltage for desired alarm threshold",
            critical: true,
          },
          {
            refDes: "R1",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Frequency/threshold adjust",
          },
          {
            refDes: "C1",
            value: "0.047uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.047UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor",
          },
        ],
        nets: [
          { name: "+V_MONITOR", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Sounds warning tone when supply voltage falls below D1's zener voltage + UJT threshold",
          "Select D1 for desired voltage threshold — e.g., 6.2V zener for 7V alarm point",
          "OK to use single fixed capacitor for R1 and R2 (4.7K) gives 2.8 kHz tone",
          "8-ohm speaker on B1 output",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=50K pot, R2=4.7K, R3=100. C1=0.047uF. D1 zener selects threshold voltage. For REC: low-battery alarm for battery-powered products, undervoltage protection alert for grill controllers, or brownout warning for AC-powered equipment.",
  },

  // ──────────────────────────────────────────────────
  // UJT Sound Effects Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-sound-effects-generator",
    name: "UJT Sound Effects Generator",
    description: "Two UJTs generate chirps with frequency controlled by R4. R3 controls chirp rate. Great for bird calls, sci-fi effects. +6 to +12V.",
    category: "audio",
    blocks: [
      {
        id: "sfx-gen-block",
        name: "Dual-UJT Sound Generator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            description: "2N4891 UJT — low-frequency modulator (chirp rate)",
          },
          {
            refDes: "Q2",
            description: "2N4891 UJT — audio frequency oscillator (tone)",
          },
          {
            refDes: "R3",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Chirp rate control (Q1 timing)",
          },
          {
            refDes: "R4",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Tone frequency control (Q2 timing)",
          },
          {
            refDes: "C1",
            value: "4.7uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Modulator timing capacitor",
          },
          {
            refDes: "C2",
            value: "0.001uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1NF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Audio frequency timing capacitor",
          },
        ],
        nets: [
          { name: "+6-12V", from: { refDes: "R3", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Q1 modulates Q2's supply — creates chirping/warbling effect",
          "R3 (Q1 timing) controls chirp rate",
          "R4 (Q2 timing) controls tone frequency",
          "R7 (47 ohm) to speaker/amplifier output",
          "Generates chirps having frequency controlled by R4, rate controlled by R3",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=R5=100, R2=47, R3=R4=100K, R6=100K, R7=47. C1=4.7uF, C2=0.001uF. Two cascaded UJT oscillators — one modulates the other. For REC pinball: sound effects generation. Adjusting R3/R4 produces bird chirps, laser zaps, and other sci-fi sounds. Feed into LM386 for speaker output.",
  },

  // ──────────────────────────────────────────────────
  // UJT 1-Minute Timer
  // ──────────────────────────────────────────────────
  {
    id: "mims-1-minute-timer",
    name: "UJT 1-Minute Timer (Relay Output)",
    description: "UJT oscillator with large timing cap pulls relay at repeating cycle. R1 controls timing from 7 to 68 seconds. +9V.",
    category: "timer",
    blocks: [
      {
        id: "minute-timer-block",
        name: "Long-Period UJT Timer",
        type: "timer",
        components: [
          {
            refDes: "Q1",
            description: "2N4891 UJT — timing oscillator",
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Timing resistor — with C1 sets cycle period",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "B1 output resistor",
          },
          {
            refDes: "C1",
            value: "470uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470UF",
            eaglePackage: "CAPPRD500W60D1000H1200",
            description: "Large timing capacitor — 470uF for long periods",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Flyback diode for relay",
            critical: true,
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Relay must be low-voltage type (275-004 or equivalent)",
          "R1+R2 total controls period: 10K→7s, 15K→10s, 22K→12s, 47K→27s, 100K→68s",
          "D1 flyback diode across relay coil is MANDATORY",
          "UJT fires when C1 charges to threshold — relay pulls momentarily",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=100K, R2=4.7K, R3=100. C1=470uF. Relay=275-004. Timing table: R1+R2=10K→7s, 15K→10s, 22K→12s, 47K→27s, 100K→68s. For REC: periodic relay actuation for test equipment, timed sampling in environmental monitors, or periodic valve cycling in grill controller smoke generation.",
  },

  // ──────────────────────────────────────────────────
  // Piezoelectric Bell and Drivers
  // ──────────────────────────────────────────────────
  {
    id: "mims-piezo-drivers",
    name: "Piezoelectric Buzzer/Bell and Tone Drivers",
    description: "Multiple piezo drive circuits: bell (simple pulse), volume control, fixed-tone driver, adjustable-frequency driver. +3 to +15V.",
    category: "piezo",
    blocks: [
      {
        id: "piezo-bell-block",
        name: "Piezo Bell (Simple Pulse)",
        type: "piezo",
        components: [
          {
            refDes: "C1",
            value: "47uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "47UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Energy storage — discharges through buzzer on switch press",
          },
        ],
        nets: [
          { name: "+3-12V", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "BUZZER", from: { refDes: "C1", pin: "2" }, to: [] },
        ],
        designRules: [
          "Press and release S1 to simulate bell — C1 discharge creates 'ding' sound",
          "R1 (10K-50K pot) controls volume by limiting discharge current",
          "CAUTION: use ear protectors when experimenting at close range",
        ],
      },
      {
        id: "piezo-fixed-tone",
        name: "Fixed-Tone Piezo Driver",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor — drives piezo at fixed frequency",
          },
          {
            refDes: "R1",
            value: "220K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "220K_0805",
            eaglePackage: "RESC2012X65",
            description: "Feedback resistor — sets oscillation frequency with piezo element",
          },
          {
            refDes: "R2",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Base bias resistor",
          },
          {
            refDes: "R3",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Collector resistor",
          },
        ],
        nets: [
          { name: "+3-15V", from: { refDes: "R3", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Piezo element is 3-wire (red, black, blue) — blue is feedback",
          "Frequency determined by piezo element's resonant frequency",
          "Connect CdS cell across R1 for dark-activated or light-activated tone",
          "Supply: +3 to +15V",
        ],
      },
      {
        id: "piezo-adjustable-freq",
        name: "Adjustable-Frequency Piezo Driver",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP oscillator — with Q2 forms adjustable tone generator",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN oscillator — complementary pair with Q1",
          },
          {
            refDes: "R1",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Frequency control pot",
          },
          {
            refDes: "R2",
            value: "4.7K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7K_0805",
            eaglePackage: "RESC2012X65",
            description: "Bias resistor",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — sets frequency range",
          },
          {
            refDes: "T1",
            description: "Center-tapped audio transformer (Radio Shack 273-1380)",
          },
        ],
        nets: [
          { name: "+0.5-15V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "R1 controls frequency — full range sweep",
          "R2 controls frequency fine adjustment",
          "T1 is center-tapped audio transformer — primary of transformer drives piezo/speaker",
          "Can be easily miniaturized — small component count",
          "Supply: +0.5 to +15V — extremely wide range",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Also covers logic interface circuits: (1) NPN driver — input LO=tone ON, HI=tone OFF. (2) NPN inverted — input LO=tone OFF, HI=tone ON. Both use 2N2222, R1=1K, R2=1K, +5 to +12V supply. For REC: piezo buzzers used in all products for user alerts — grill done alarm, oven timer, pinball scoring sounds. Fixed-tone for simple alerts, adjustable for variable pitch effects.",
  },

  // ──────────────────────────────────────────────────
  // SCR Latching Pushbutton Switch
  // ──────────────────────────────────────────────────
  {
    id: "mims-scr-latching-switch",
    name: "SCR Latching Pushbutton Switch",
    description: "Press S1 to turn on (latches), press S2 to turn off. SCR stays on after trigger pulse. Solid-state latch.",
    category: "scr",
    blocks: [
      {
        id: "scr-latch-block",
        name: "SCR Latch Circuit",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            description: "SCR — gate-triggered solid-state latch",
            critical: true,
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Gate trigger resistor",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "Q1", pin: "A" }, to: [] },
          { name: "LOAD", from: { refDes: "Q1", pin: "K" }, to: [] },
          { name: "TRIGGER", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GATE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }] },
        ],
        designRules: [
          "S1 (NO) — push to trigger ON. S2 (NC) — push to interrupt anode current → OFF.",
          "SCR stays ON until anode current falls below holding current (Ih)",
          "In DC circuit, must break the anode circuit to turn off",
          "RL = load (lamp, relay, etc.). SCR terminal pinouts vary — check datasheet",
          "SCR typical pinout: A (anode), G (gate), C (cathode) — varies by package",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. The SCR is a solid-state ON-OFF switch. Once triggered, stays ON until current interrupted. For REC: useful for crowbar overvoltage protection (SCR shorts supply through fuse if voltage exceeds threshold), latching alarm circuits, and emergency shutdown circuits. In AC circuits, SCR turns off naturally at each zero crossing — basis for phase-angle power control.",
  },

  // ──────────────────────────────────────────────────
  // SCR Light-Activated Relay
  // ──────────────────────────────────────────────────
  {
    id: "mims-scr-light-relay",
    name: "SCR Light-Activated Relay",
    description: "Relay latches ON when phototransistor is illuminated. Stays latched until S1 is pressed. +9 to +12V.",
    category: "scr",
    blocks: [
      {
        id: "light-relay-block",
        name: "Light-Triggered SCR Latch",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            description: "Phototransistor — light sensor triggers SCR gate",
            critical: true,
          },
          {
            refDes: "Q2",
            description: "SCR — latches relay ON when triggered",
            critical: true,
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Phototransistor load / SCR gate drive",
          },
        ],
        nets: [
          { name: "+V", from: { refDes: "Q2", pin: "A" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Relay pulls in when Q1 (phototransistor) illuminated — latches via SCR",
          "Relay remains latched until S1 (NC, push-to-reset) is pressed",
          "Works with flashlights and photo strobe units",
          "S1 interrupts anode current to reset the SCR",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Phototransistor Q1 triggers SCR Q2 gate when illuminated. SCR latches, relay stays pulled. S1 (NC) breaks circuit to reset. For REC: light-beam trigger for pinball features (break-beam with latch), security/alarm applications, or photo-triggered events.",
  },

  // ──────────────────────────────────────────────────
  // SCR Relaxation Oscillator
  // ──────────────────────────────────────────────────
  {
    id: "mims-scr-relaxation-oscillator",
    name: "SCR Relaxation Oscillator",
    description: "C1 charges through R1, fires SCR when threshold reached, discharges through SCR and speaker. Repeating cycle. +9V.",
    category: "oscillator",
    blocks: [
      {
        id: "scr-osc-block",
        name: "SCR Oscillator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            description: "SCR — fires when C1 charges to gate threshold",
            critical: true,
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Charge resistor — R1 controls repetition rate",
          },
          {
            refDes: "R2",
            value: "1M",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1M_0805",
            eaglePackage: "RESC2012X65",
            description: "Gate bias resistor",
          },
          {
            refDes: "C1",
            value: "1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing/energy storage capacitor",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "Q1", pin: "A" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "K" }, to: [] },
        ],
        designRules: [
          "C1 charges through R1 until SCR gate threshold is reached",
          "SCR fires, C1 discharges through SCR and speaker — produces click/tone",
          "R1 controls repetition rate",
          "NOTE: Some SCRs require careful adjustment of R2 for reliable operation",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. R1=100K, R2=1M. C1=1uF. SCR fires when C1 voltage reaches gate trigger level, then C1 discharges through speaker producing a click. Cycle repeats. For REC: demonstrates the fundamental SCR timing principle used in phase-angle controllers for triac lamp dimmers and motor controllers.",
  },

  // ──────────────────────────────────────────────────
  // DC Motor Speed Controller (UJT + SCR)
  // ──────────────────────────────────────────────────
  {
    id: "mims-dc-motor-speed-controller",
    name: "DC Motor Speed Controller (UJT + SCR)",
    description: "UJT oscillator triggers SCR at variable rate to control DC motor speed. Separate power supply for motor recommended. +3 to +6V motor, +9V logic.",
    category: "motor-driver",
    blocks: [
      {
        id: "motor-speed-block",
        name: "UJT/SCR Motor Controller",
        type: "motor-driver",
        components: [
          {
            refDes: "Q1",
            description: "2N4891 UJT — variable-rate trigger generator",
          },
          {
            refDes: "Q2",
            description: "SCR — switches motor current at rate set by UJT",
            critical: true,
          },
          {
            refDes: "R1",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "UJT B2 resistor",
          },
          {
            refDes: "R2",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "UJT B1 resistor — trigger pulse to SCR gate",
          },
          {
            refDes: "R4",
            value: "varies",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "RESISTOR",
            eaglePackage: "RESC2012X65",
            description: "Speed control — controls UJT firing rate",
          },
          {
            refDes: "C1",
            value: "4.7uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "4.7UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "UJT timing capacitor",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "SCR gate resistor",
          },
        ],
        nets: [
          { name: "+9V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "+MOTOR", from: { refDes: "Q2", pin: "A" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "K" }, to: [] },
        ],
        designRules: [
          "At slow speed from UJT oscillator, motor will rotate in bursts",
          "For best results, use separate power supply for motor",
          "Check motor with this circuit: if LED flashes on/off when shaft rotated, it will work",
          "R4 controls speed — adjustable pot recommended",
          "1K LED+resistor in parallel with motor for speed indication",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. UJT generates variable-rate trigger pulses that fire the SCR, which switches motor current. At low rates, motor turns in bursts (PWM-like). For REC: foundation for variable-speed motor control. Modern approach uses MCU PWM + MOSFET, but understanding SCR switching helps with AC motor control (phase-angle) used in oven fan motors and grill rotisserie motors.",
  },

  // ──────────────────────────────────────────────────
  // Triac Switch Buffer
  // ──────────────────────────────────────────────────
  {
    id: "mims-triac-switch-buffer",
    name: "Triac Switch Buffer (AC Load Control)",
    description: "Simple triac circuit for switching AC loads. R1 limits gate current. WARNING: AC LINE VOLTAGE — use extreme caution.",
    category: "triac",
    blocks: [
      {
        id: "triac-switch-block",
        name: "Triac AC Switch",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            description: "Triac — AC power switch rated for load current",
            critical: true,
          },
          {
            refDes: "R1",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Gate current limiter. I = Triac current, P = Lamp power, V = 120V AC.",
          },
        ],
        nets: [
          { name: "AC_LINE", from: { refDes: "Q1", pin: "MT2" }, to: [] },
          { name: "AC_LOAD", from: { refDes: "Q1", pin: "MT1" }, to: [] },
          { name: "GATE", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "Q1", pin: "G" }] },
        ],
        designRules: [
          "WARNING: AC LINE VOLTAGE — all connections must be well insulated",
          "NEVER work on AC circuit when power cord is plugged in",
          "All wiring must be properly insulated — use approved enclosure",
          "R1 limits gate current — 100 ohm for 200V triac (100/200 = 0.5A gate)",
          "Triac current = lamp power / line voltage",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplest triac circuit — R1 on gate, triac in series with AC load. For REC: this is the basic building block for all triac designs. REC triac boards use optocoupler isolation between MCU logic and triac gate for safety. Used in lamp dimmers, oven heater control, and grill igniter circuits.",
  },

  // ──────────────────────────────────────────────────
  // Triac Lamp Dimmer (UJT Phase Control)
  // ──────────────────────────────────────────────────
  {
    id: "mims-triac-lamp-dimmer",
    name: "Triac Lamp Dimmer (UJT Phase-Angle Control)",
    description: "Full lamp dimmer circuit: UJT oscillator triggers triac at variable phase angle to control AC lamp brightness. R1 controls brightness.",
    category: "triac",
    blocks: [
      {
        id: "dimmer-block",
        name: "Phase-Angle Lamp Dimmer",
        type: "relay-driver",
        components: [
          {
            refDes: "Q1",
            description: "2N4819 JFET or similar — timing element",
          },
          {
            refDes: "Q2",
            description: "Triac — switches AC lamp at controlled phase angle",
            critical: true,
          },
          {
            refDes: "R1",
            value: "100K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100K_0805",
            eaglePackage: "RESC2012X65",
            description: "Brightness control — variable resistor (pot)",
            critical: true,
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4001",
            eaglePackage: "SOD3716X135N",
            description: "Half-wave rectifier for UJT DC supply",
          },
          {
            refDes: "C1",
            value: "0.047uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.047UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Timing capacitor — with R1 sets trigger phase angle",
          },
          {
            refDes: "R2",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "UJT B1 output to triac gate",
          },
          {
            refDes: "R3",
            value: "100",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "100R_0805",
            eaglePackage: "RESC2012X65",
            description: "Triac gate current limiter",
          },
          {
            refDes: "T1",
            description: "Isolation transformer primary: 120V AC line. SEC: 6.3V for UJT supply.",
          },
        ],
        nets: [
          { name: "AC_LINE", from: { refDes: "Q2", pin: "MT2" }, to: [] },
          { name: "LAMP", from: { refDes: "Q2", pin: "MT1" }, to: [] },
          { name: "GATE", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "Q2", pin: "G" }] },
        ],
        designRules: [
          "WARNING: AC LINE VOLTAGE — EXTREME CAUTION REQUIRED",
          "READ WARNING on Mims p.48 before building this circuit",
          "Never work on circuit when plugged in — ALWAYS disconnect AC first",
          "All connections must be well insulated — use approved enclosure",
          "R1 controls lamp brightness by varying the phase angle at which triac fires",
          "UJT oscillator syncs to AC line frequency via T1",
          "L1 = No.47 lamp or equivalent — do not exceed triac current rating",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. The complete lamp dimmer: T1 isolator provides UJT supply synced to AC line. R1 controls C1 charge rate → varies when UJT fires → varies triac phase angle → controls power to lamp. R1=100K (SEC), R2=100, R3=100. C1=0.047uF. For REC: DIRECTLY applicable to grill heater control, oven element dimming, and any AC power control application. REC triac boards use this same phase-angle principle with optocoupler isolation and MCU control replacing the R1 pot.",
  },

  // ──────────────────────────────────────────────────
  // Miniature RF Transmitter
  // ──────────────────────────────────────────────────
  {
    id: "mims-miniature-rf-transmitter",
    name: "Miniature RF Transmitter",
    description: "Tiny AM/SW radio transmitter patterned after pill-sized biotelemetry transmitter. Single transistor, coil antenna. Range: a few feet. Battery: 1-1.5V.",
    category: "communication",
    blocks: [
      {
        id: "rf-tx-block",
        name: "1-Transistor RF Transmitter",
        type: "communication",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "RF oscillator transistor",
          },
          {
            refDes: "R1",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Frequency control — tunes to receiver",
          },
          {
            refDes: "R2",
            value: "22K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22K_0805",
            eaglePackage: "RESC2012X65",
            description: "RF harmonics control",
          },
          {
            refDes: "C1",
            value: "0.1-10uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CAPACITOR",
            eaglePackage: "CAPC2012X110",
            description: "Optional antenna coupling / frequency shift cap",
          },
        ],
        nets: [
          { name: "+1.5V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Coil: 50 turns on soda straw (1/4 inch), 25 turns + 25 turns with tap",
          "Antenna coil: 12 inches, 25 turns (optional — increases range)",
          "Uses only 100-200 microamperes from single 1-1.5V cell",
          "Sends AM or SW radio signal a few feet to nearby receiver",
          "R1 (and R2) controls frequency — tune to match receiver",
          "B1: Use penlight cell or silver oxide button cell ONLY",
          "WARNING: Never solder leads to miniature cells — they WILL EXPLODE",
          "C1: 0.1uF gives audio clicks, 10uF gives audible clicks on radio",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Based on Dr. R. Stewart Mackay's biotelemetry transmitter from the 1950s — one of the smallest ever made. Coil wound on soda straw, powered by single button cell. Sends signal to AM/SW radio a few feet away. For REC: educational — demonstrates RF oscillator fundamentals. Could be adapted as a simple proximity beacon or part test signal generator. OK to use CdS cell or thermistor for R1/R2 to make it a wireless sensor transmitter.",
  },

  // ──────────────────────────────────────────────────
  // 1-Transistor Oscillator (Hartley)
  // ──────────────────────────────────────────────────
  {
    id: "mims-1transistor-oscillator",
    name: "1-Transistor Hartley Oscillator",
    description: "Simplified Hartley oscillator — generates audio tone using coil and transistor. 3V battery, 8-ohm speaker. Consumes only 100-200 microamperes.",
    category: "oscillator",
    blocks: [
      {
        id: "hartley-osc-block",
        name: "Hartley Audio Oscillator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Oscillator transistor",
          },
          {
            refDes: "R1",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Adjust R1 to change tone frequency",
          },
          {
            refDes: "R2",
            value: "22K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "22K_0805",
            eaglePackage: "RESC2012X65",
            description: "Feedback bias",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Coupling capacitor — also affects frequency",
          },
        ],
        nets: [
          { name: "+3V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "SPKR", from: { refDes: "Q1", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Coil: 25+50 turns on 1/4 inch soda straw with center tap",
          "TAP: punch 2 holes 1/8 inch apart in straw, wind 50 turns in first hole, back 25 turns, out second hole",
          "R1 adjusts frequency — insulated 30 ga. wrapping wire",
          "Only 100-200 microamperes — excellent battery life",
          "8-ohm speaker connected to collector",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Simplified Hartley topology — coil feedback sustains oscillation. Hand-wound coil on soda straw. Very low power consumption. For REC: demonstrates LC oscillator principle. Practical use: ultra-low-power audio alert for battery devices. Coil winding details: 50 turns first hole → 25 turns back through second hole → twist exposed wires for tap.",
  },

  // ──────────────────────────────────────────────────
  // Frequency Meter
  // ──────────────────────────────────────────────────
  {
    id: "mims-frequency-meter",
    name: "Frequency Meter (Analog)",
    description: "Converts frequency of input square wave to DC voltage readable on a meter. 2N2222, +6V, 0-1 kHz range. Calibration procedure included.",
    category: "test-equipment",
    blocks: [
      {
        id: "freq-meter-block",
        name: "Frequency-to-Voltage Converter",
        type: "sensor-interface",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "Squaring/switching transistor — converts input to fixed-amplitude pulses",
          },
          {
            refDes: "R1",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input coupling",
          },
          {
            refDes: "R2",
            value: "50K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "50K_POT",
            eaglePackage: "POT_3PIN",
            description: "Calibration pot — adjust for 1kHz = full scale",
          },
          {
            refDes: "C1",
            value: "0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "0.1UF_0805",
            eaglePackage: "CAPC2012X110",
            description: "Input coupling capacitor",
          },
          {
            refDes: "C2",
            value: "varies",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CAPACITOR",
            eaglePackage: "CAPC2012X110",
            description: "Averaging filter capacitor",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "METER", from: { refDes: "R2", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Input: 1V square wave. Recalibrate if input is not 1V square.",
          "B1 = rectifier bridge module or 4x 1N914 diodes",
          "R4=100, R5=1K, R6=varies (cal). C2=filter cap.",
          "Calibration: set R2/R5 mid, apply 1kHz 1V, adjust R2 until M1=1mA",
          "Then adjust R5 at 0Hz (no signal) until M1=0",
          "Typical results table: 0Hz→0.02mA, 100Hz→0.1mA, 500Hz→0.55mA, 1000Hz→1.00mA",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Frequency-to-voltage converter using pulse averaging through bridge rectifier and filter. For REC: useful for RPM measurement (tachometer), frequency monitoring of oscillator circuits, or as a simple spectrum analyzer front-end. Modern: MCU timer/counter is more accurate, but this gives analog output directly.",
  },

  // ──────────────────────────────────────────────────
  // Pulse Generator
  // ──────────────────────────────────────────────────
  {
    id: "mims-pulse-generator",
    name: "Pulse Generator (2-Transistor)",
    description: "Generates clean pulses with adjustable rate and duration. R3 controls rate, C1 controls width. +3 to +15V. Risetime ~100ns.",
    category: "test-equipment",
    blocks: [
      {
        id: "pulse-gen-block",
        name: "Variable Pulse Generator",
        type: "oscillator",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2907",
            eaglePackage: "SOT-23-3",
            description: "PNP pulse-forming transistor",
          },
          {
            refDes: "Q2",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N2222",
            eaglePackage: "SOT-23-3",
            description: "NPN output driver",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Steering diode",
          },
          {
            refDes: "R1",
            value: "470",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "470R_0805",
            eaglePackage: "RESC2012X65",
            description: "Q1 emitter resistor",
          },
          {
            refDes: "R3",
            value: "varies",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "RESISTOR",
            eaglePackage: "RESC2012X65",
            description: "Pulse rate control",
          },
          {
            refDes: "C1",
            value: "0.001-0.1uF",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "CAPACITOR",
            eaglePackage: "CAPC2012X110",
            description: "Pulse width: 0.001uF→5µs, 0.01uF→22µs, 0.1uF→200µs",
          },
        ],
        nets: [
          { name: "+3-15V", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "OUT", from: { refDes: "Q2", pin: "C" }, to: [] },
          { name: "GND", from: { refDes: "Q2", pin: "E" }, to: [] },
        ],
        designRules: [
          "Pulse duration set by C1: 0.001uF→5µs, 0.01uF→22µs, 0.1uF→200µs",
          "Amplitude ~10V when supply is 12.5V",
          "Risetime ~100ns — fast enough for most digital logic testing",
          "R3 controls pulse repetition rate",
          "R2=1M, R4=50 ohm in original circuit",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Q1=2N2907, Q2=2N2222, D1=1N914. R1=470, R2=1M, R3=varies (rate), R4=50. Clean 100ns risetime pulses. For REC: useful bench test equipment for triggering digital circuits, testing debounce circuits, and generating timing signals. C1 selects pulse width across 3 decades (5µs to 200µs).",
  },

  // ──────────────────────────────────────────────────
  // DC Meter Amplifier
  // ──────────────────────────────────────────────────
  {
    id: "mims-dc-meter-amplifier",
    name: "DC Meter Amplifier (Microamp to Milliamp)",
    description: "Amplifies small DC currents for display on a standard milliamp meter. 2N3904, +6V. Adjustable range.",
    category: "test-equipment",
    blocks: [
      {
        id: "meter-amp-block",
        name: "DC Current Amplifier",
        type: "sensor-interface",
        components: [
          {
            refDes: "Q1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "2N3904",
            eaglePackage: "SOT-23-3",
            description: "Amplifier transistor — amplifies microamp input to milliamp meter range",
          },
          {
            refDes: "D1",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1N4148",
            eaglePackage: "SOD3716X135N",
            description: "Temperature compensation diode — tracks Q1 Vbe drift",
          },
          {
            refDes: "R1",
            value: "10K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "10K_0805",
            eaglePackage: "RESC2012X65",
            description: "Input range resistor",
          },
          {
            refDes: "R2",
            value: "1K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "1K_0805",
            eaglePackage: "RESC2012X65",
            description: "Calibration/bias resistor",
          },
          {
            refDes: "R3",
            value: "5K",
            eagleLibrary: "REC_Standard_Library",
            eagleDevice: "5K_POT",
            eaglePackage: "POT_3PIN",
            description: "Full-scale calibration pot",
          },
        ],
        nets: [
          { name: "+6V", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "DC_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "METER", from: { refDes: "R3", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "Q1", pin: "E" }, to: [] },
        ],
        designRules: [
          "Calibration: 1) Set 1M pot for desired current, 2) Adjust R3 until M1=1mA",
          "3) Repeat steps 1 and 2. 4) Adjust R2 until M1=1mA at full input.",
          "D1 provides temperature compensation — tracks Q1 Vbe changes",
          "Input up to 0.5 microamps full scale — very sensitive",
          "First connect input through 1M pot and digital multimeter set to milliamperes",
        ],
      },
    ],
    notes: "From Mims Basic Semiconductor Circuits. 2N3904 (high hfe), D1=1N914 (temp compensation). R1=10K, R2=1K, R3=5K pot (cal). Amplifies microamp-level DC to drive 0-1mA meter. For REC: useful for measuring very small sensor currents (photodiode dark current, leakage testing, electrometer-style measurements). D1 compensates for Q1's Vbe temperature drift — essential for stable readings.",
  },

  // ══════════════════════════════════════════════════════════════
  // From: The Forrest Mims Engineer's Notebook
  // ══════════════════════════════════════════════════════════════

  // ── Voltage Regulators ──

  {
    id: "78xx-current-regulator",
    name: "78xx Series Current Regulator",
    category: "voltage-regulator",
    description: "Uses a 78xx fixed voltage regulator as a constant current source. Output current equals the regulator voltage divided by the sense resistor. Stable current for LEDs, lamps, and other constant-current loads.",
    blocks: [
      {
        id: "78xx-current-reg-block",
        name: "78xx Current Regulator",
        type: "current-source",
        components: [
          { refDes: "U1", description: "78xx voltage regulator (7805/7812/7815)", value: "7805" },
          { refDes: "C1", description: "Input bypass capacitor", value: "0.33µF" },
          { refDes: "R1", description: "Current sense resistor — sets output current", value: "varies" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "LOAD", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "3" }] },
        ],
        designRules: [
          "Output current I = regulator voltage / R1",
          "For 7805: I = 5V / R1 (e.g., R1=100Ω gives 50mA)",
          "Vin must be at least 2V above regulator voltage + load voltage",
          "Uses include stable biasing for LEDs, lamps, etc.",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.86. Simple constant current source using fixed voltage regulator. For REC: useful for driving LED strings at precise current levels in pinball backboxes and grill controller indicator panels.",
  },
  {
    id: "7905-negative-regulator",
    name: "7905 Negative Voltage Regulator",
    category: "voltage-regulator",
    description: "Fixed -5V regulator and adjustable negative power supply using 7905. Note reversed pinout compared to 78xx: pin 1=GND, pin 2=output, pin 3=input.",
    blocks: [
      {
        id: "7905-fixed-block",
        name: "Fixed -5V Regulator",
        type: "voltage-regulator",
        components: [
          { refDes: "U1", description: "7905 negative voltage regulator", value: "7905" },
          { refDes: "C1", description: "Input capacitor — working voltage must exceed Vin", value: "2.2µF" },
          { refDes: "C2", description: "Output capacitor", value: "1µF" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "C1", pin: "+" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "C2", pin: "+" }] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
        ],
        designRules: [
          "Input: -5.5 to -35V",
          "Output: -5V fixed",
          "CAUTION: Pinout is DIFFERENT from 78xx — pin 1=GND, 2=OUT, 3=IN",
          "For adjustable output: add resistor from output to ground — Vout = -5 to -30V",
          "Adjustable: Radj table: 33Ω=-5.74V, 100Ω=-6.99V, 330Ω=-11.03V, 680Ω=-18.20V",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.87. Negative complement to 7805. For REC: needed when op-amp circuits require dual-polarity supply rails (e.g., precision sensor interfaces in grill controllers).",
  },
  {
    id: "723-precision-regulator",
    name: "723 Precision Voltage Regulator",
    category: "voltage-regulator",
    description: "Very versatile series regulator IC with 2-37V output range, internal reference, current limiting capability. Two configurations: low range (2-7V) and high range (7-37V).",
    blocks: [
      {
        id: "723-low-range",
        name: "723 Low Range (2-7V)",
        type: "voltage-regulator",
        components: [
          { refDes: "U1", description: "LM723 precision voltage regulator", value: "723" },
          { refDes: "R1", description: "Upper divider resistor", value: "varies" },
          { refDes: "R2", description: "Lower divider resistor", value: "varies" },
          { refDes: "R3", description: "Current sense / temperature compensation", value: "varies" },
          { refDes: "Rsc", description: "Current limit sense resistor", value: "22Ω" },
          { refDes: "C1", description: "Frequency compensation", value: "100pF" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "11" }, to: [{ refDes: "U1", pin: "12" }] },
          { name: "VOUT", from: { refDes: "U1", pin: "10" }, to: [{ refDes: "Rsc", pin: "1" }] },
          { name: "VREF", from: { refDes: "U1", pin: "6" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Low range formula: Vout = Vref × (R2 / (R + R2))",
          "Vref = 6.8-7.5V (measure at pin 6)",
          "High range formula: Vout = Vref × ((R1 + R2) / R2)",
          "R3 optional — gives temperature stability, R3 = R1×R2/(R1+R2)",
          "Max output current: 150mA (extend to 10A with external power transistors)",
          "Typical values for 3V out: R1=4.12K, R2=3.01K, R3=1.74K",
          "Typical values for 5V out: R1=2.15K, R2=4.99K, R3=1.50K",
          "Typical values for 12V out: R1=4.87K, R2=7.15K, R3=2.90K",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.90. For REC: precision regulation for analog sensor conditioning circuits. Current limiting protects against shorts — important for field-deployed grill controllers.",
  },
  {
    id: "tl431-shunt-regulator",
    name: "TL431 Adjustable Shunt (Zener) Regulator",
    category: "voltage-regulator",
    description: "Three-terminal precision shunt regulator. Output adjustable from 2.5 to 36V. Also usable as voltage detector, simple timer, and precision reference.",
    blocks: [
      {
        id: "tl431-adjustable",
        name: "TL431 Adjustable Regulator",
        type: "voltage-reference",
        components: [
          { refDes: "U1", description: "TL431 adjustable shunt regulator", value: "TL431" },
          { refDes: "R1", description: "Ballast resistor (must dissipate power)", value: "47Ω 1/2W" },
          { refDes: "R2", description: "Upper divider — sets output voltage", value: "10K" },
          { refDes: "R3", description: "Lower divider — 470Ω to reference", value: "470" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "VOUT", from: { refDes: "U1", pin: "K" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "REF", from: { refDes: "U1", pin: "R" }, to: [{ refDes: "R2", pin: "2" }] },
          { name: "GND", from: { refDes: "U1", pin: "A" }, to: [] },
        ],
        designRules: [
          "Vout = (1 + R1/R2) × Vref where Vref = 2.5V",
          "As voltage detector: output switches when Vin exceeds threshold — use for TTL level detect",
          "As timer: delay = R1×C1 × ln(9/(9-Vref)) — connect R/C to reference pin",
          "Typical timer: R1=1M, C1=10µF gives long delays",
          "As 1.5-5V power supply: combine with 7805 for split regulation",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.91. Extremely versatile IC — zener replacement, voltage reference, timer, detector. For REC: ideal for low-cost voltage monitoring in oven controllers (over/under voltage protection) and as precision reference for ADC circuits.",
  },
  {
    id: "350t-power-regulator",
    name: "LM350T Power Voltage Regulator (1.2-33V, 3A)",
    category: "voltage-regulator",
    description: "High-current adjustable regulator supplying up to 3A over 1.2-33V. Heat sink required for full power. Combined with 555 for power pulse generator.",
    blocks: [
      {
        id: "350t-regulator",
        name: "350T Adjustable Regulator",
        type: "voltage-regulator",
        components: [
          { refDes: "U1", description: "LM350T adjustable voltage regulator (3A)", value: "LM350T" },
          { refDes: "R1", description: "Adjust pot — controls output voltage", value: "50K pot" },
          { refDes: "R2", description: "Program resistor", value: "1.2K" },
          { refDes: "C1", description: "Input filter", value: "0.1µF" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "VOUT", from: { refDes: "U1", pin: "3" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "ADJ", from: { refDes: "U1", pin: "1" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "Pin 1=Adjust, Pin 2=Input, Pin 3=Output",
          "Output: 1.2 to 33V adjustable via R1",
          "Max current: 3A with proper heat sinking",
          "Vin must be 2-35V and at least 3V above Vout",
          "Heat sink REQUIRED for full power output",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.92. For REC: high-current regulation for motors, solenoids, and LED arrays in pinball machines. Power pulse generator variant (555+350T+2N2222) useful for lamp flashing and DC motor speed control.",
  },

  // ── Temperature Sensor / Current Source ──

  {
    id: "lm334-temperature-sensor",
    name: "LM334 Temperature Sensor and Adjustable Current Source",
    category: "sensor-interface",
    description: "Versatile 3-lead component used as temperature sensor (10mV/°K), constant current source for LEDs, voltage reference, and light meter. Rset = 0.0677/Iset at 25°C.",
    blocks: [
      {
        id: "lm334-thermometer",
        name: "Basic Thermometer",
        type: "sensor",
        components: [
          { refDes: "U1", description: "LM334 adjustable current source / temperature sensor", value: "LM334" },
          { refDes: "R1", description: "Set resistor — 680Ω gives ~10mV/°Kelvin output", value: "680" },
        ],
        nets: [
          { name: "V+", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "TEMP_OUT", from: { refDes: "R1", pin: "1" }, to: [{ refDes: "U1", pin: "1" }] },
          { name: "GND", from: { refDes: "U1", pin: "3" }, to: [] },
        ],
        designRules: [
          "Output varies ~10 millivolts per degree Kelvin",
          "Works from +5-20V supply",
          "As current source: Iset = 0.0677 / Rset at 25°C",
          "Max current output = 10mA",
          "Calibrated LED: R=10Ω gives 6.4mA, R=15Ω gives 4.3mA — constant for 3-20V input",
          "As voltage reference: 68K + 1N914 + divider gives 0.8-5.0V adjustable output",
          "As ramp generator: input 1kHz pulse, get sawtooth via 0.001µF + 1K discharge path",
          "As light meter: use CdS photocell as Rset, drive 0-1mA meter",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.134. For REC: direct application in grill controllers and oven temperature monitoring. 10mV/°K output connects directly to ADC. Current source mode useful for precision LED indicators. Much simpler than thermistor + lookup table approach.",
  },

  // ── Op-Amp Circuits (LF353N, TL084C, LM324N, LM3900N) ──

  {
    id: "lf353-sample-and-hold",
    name: "LF353N Sample-and-Hold Circuit",
    category: "sensor-interface",
    description: "JFET-input dual op-amp used for sample-and-hold. High impedance (10^12 ohm) inputs with high slew rate (13V/µsec). Stores peak voltage in capacitor.",
    blocks: [
      {
        id: "lf353-sample-hold",
        name: "Sample and Hold",
        type: "sensor-interface",
        components: [
          { refDes: "U1", description: "LF353N dual JFET-input op-amp", value: "LF353N" },
          { refDes: "U2", description: "4066 bilateral switch (sample gate)", value: "4066" },
          { refDes: "D1", description: "Rectifier diode", value: "1N914" },
          { refDes: "C1", description: "Hold capacitor — stores sampled voltage", value: "1µF" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "13" }, to: [] },
          { name: "S/H", from: { refDes: "U2", pin: "13" }, to: [] },
          { name: "V+", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "V-", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "VOUT", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "S/H pin: H=Sample, L=Hold",
          "C1 stores the peak voltage at Vin",
          "Reduce C1 for faster response to changing Vin",
          "Pin-compatible with 1458 but much better performance",
          "Supply: ±4-18V",
          "Also works as peak detector (omit 4066, add diode) — C1 tracks and stores peak Vin",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.98. For REC: sample-and-hold useful for ADC interfacing in pinball scoring systems and sensor data acquisition in grill controllers. Peak detector variant monitors max temperature.",
  },
  {
    id: "tl084-microphone-preamp",
    name: "TL084C Microphone Preamplifiers",
    category: "amplifier",
    description: "Quad JFET-input op-amp used for microphone preamplifiers. High impedance (10^12 ohm), high slew rate (12V/µsec), low noise. Two configurations: dynamic mic preamp and low-Z preamp.",
    blocks: [
      {
        id: "tl084-mic-preamp",
        name: "Dynamic Microphone Preamplifier",
        type: "amplifier",
        components: [
          { refDes: "U1", description: "TL084C quad JFET-input op-amp (1/4 used)", value: "TL084C" },
          { refDes: "R1", description: "Input resistor", value: "10K" },
          { refDes: "R2", description: "Gain control (adjustable)", value: "1M pot" },
          { refDes: "R3", description: "Feedback bias", value: "100K" },
          { refDes: "R4", description: "Output load / bias", value: "100K" },
          { refDes: "C1", description: "Input coupling capacitor", value: "1µF" },
          { refDes: "C2", description: "Input DC blocking", value: "1µF" },
          { refDes: "C3", description: "Output coupling", value: "1µF" },
        ],
        nets: [
          { name: "MIC_IN", from: { refDes: "C2", pin: "1" }, to: [] },
          { name: "V+", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "V-", from: { refDes: "U1", pin: "11" }, to: [] },
          { name: "VOUT", from: { refDes: "C3", pin: "2" }, to: [] },
        ],
        designRules: [
          "Gain = R2/R1 (1M/10K = 100 at max)",
          "Single polarity power supply works (AC coupled via R3/R4)",
          "Pin-compatible with LM324 (same pinout)",
          "Low-Z preamp: R1=1K, R2=100K, direct-couple low-impedance mic",
          "OK to use 8Ω speaker as microphone (poor to fair quality) or use transformer (good quality)",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.99. For REC: microphone preamp for intercom systems in grill controller setups, or for sound-activated features in pinball machines. TL084 quad package gives 4 channels in one IC.",
  },
  {
    id: "tl084-ir-voice-communicator",
    name: "TL084C Infrared Voice Communicator",
    category: "communication",
    description: "Full infrared voice communication system using TL084C op-amps. Transmitter modulates IR LED with voice signal, receiver demodulates with phototransistor + amplifier. Range hundreds of feet at night with lenses.",
    blocks: [
      {
        id: "ir-voice-tx",
        name: "IR Voice Transmitter",
        type: "ir-transmitter",
        components: [
          { refDes: "U1", description: "TL084C quad op-amp (1/4 used as preamp)", value: "TL084C" },
          { refDes: "R1", description: "Mic bias", value: "1K" },
          { refDes: "R2", description: "Gain control", value: "100K" },
          { refDes: "R3", description: "LED current limit", value: "1K" },
          { refDes: "R4", description: "Bias adjust — controls LED quiescent current", value: "10K pot" },
          { refDes: "R5", description: "LED series resistor", value: "1K" },
          { refDes: "R6", description: "Current limit", value: "220" },
          { refDes: "Q1", description: "LED driver transistor", value: "2N2222" },
          { refDes: "C1", description: "Input coupling", value: "0.1µF" },
          { refDes: "LED1", description: "Infrared LED", value: "IR LED" },
        ],
        nets: [
          { name: "MIC", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "+9V", from: { refDes: "R6", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "11" }, to: [] },
        ],
        designRules: [
          "Adjust R4 until best voice quality (R4 applies prebias to LED)",
          "R6 limits maximum LED current to safe 40mA",
          "For initial tests: remove mic, connect transistor radio phone output to R3 via 4.7µF and GND",
          "Maximum range: hundreds of feet at night with lenses at Q1 and LED",
        ],
      },
      {
        id: "ir-voice-rx",
        name: "IR Voice Receiver",
        type: "ir-receiver",
        components: [
          { refDes: "U2", description: "TL084C quad op-amp (1/4 used as preamp)", value: "TL084C" },
          { refDes: "Q1", description: "Phototransistor (receiver)", value: "phototransistor" },
          { refDes: "R1", description: "Transimpedance feedback", value: "220K" },
          { refDes: "R2", description: "Gain setting", value: "1K" },
          { refDes: "R3", description: "Adjustable gain", value: "100K-1M pot" },
          { refDes: "C1", description: "DC blocking", value: "0.1µF" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U2", pin: "4" }, to: [] },
          { name: "-9V", from: { refDes: "U2", pin: "11" }, to: [] },
          { name: "AUDIO_OUT", from: { refDes: "R3", pin: "2" }, to: [] },
        ],
        designRules: [
          "Connect audio output to power amplifier (LM386)",
          "Use low gain (R5) when adjusting transmitter",
          "Shield Q1 with tube to block external light",
          "Keep power leads short at chips — use 0.1µF bypass across supply if oscillation occurs",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.99. For REC: could be adapted for short-range optical data links in electrically noisy pinball machine environments where RF interference is a problem.",
  },
  {
    id: "lm3900-function-generator",
    name: "LM3900N Quad Norton Op-Amp Circuits",
    category: "oscillator",
    description: "Single-polarity quad op-amp with Norton (current-differencing) inputs. Operates from +4-36V. Circuits include astable multivibrator, toggle flip-flop, function generator, and x10 amplifier.",
    blocks: [
      {
        id: "lm3900-astable",
        name: "LM3900 Astable Multivibrator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "LM3900N quad Norton op-amp (1/4 used)", value: "LM3900N" },
          { refDes: "R1", description: "Frequency control", value: "500K" },
          { refDes: "R2", description: "Bias resistor", value: "1K" },
          { refDes: "R3", description: "Feedback", value: "10K" },
          { refDes: "C1", description: "Timing capacitor", value: "10µF" },
        ],
        nets: [
          { name: "+9V", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "OUT", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
        ],
        designRules: [
          "Single polarity supply: +4-36V",
          "Use as clock, pulse generator, or dual LED flasher",
          "NOTE: Do NOT substitute LM3900 for other op-amps — Norton inputs are fundamentally different",
          "Toggle flip-flop: add C2=0.001 to input, R3/R4=1M feedback — toggle on negative pulse",
          "Function generator: 1/4 as integrator + 1/4 as comparator gives 1.2kHz pulse+ramp output",
          "x10 amplifier: Vout = -Vin × (R2/R1) where R1=100K, R2=1M",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.101. Norton (current-differencing) op-amp — NOT a standard voltage-mode op-amp. Single supply operation makes it useful for battery-powered circuits. For REC: single-supply oscillator for 9V battery-powered field test equipment.",
  },

  // ── Comparator Circuits (LM339) ──

  {
    id: "lm339-comparator-circuits",
    name: "LM339 Quad Comparator Application Circuits",
    category: "sensor-interface",
    description: "Four independent voltage comparators in a single package. Single polarity power supply (+2-32V). Open collector outputs — can drive TTL, CMOS, LEDs, relays. Circuits include LED bargraph, window comparator, squarewave oscillator, and programmable light meter.",
    blocks: [
      {
        id: "lm339-led-bargraph",
        name: "LM339 5-LED Bargraph Readout",
        type: "display-driver",
        components: [
          { refDes: "U1", description: "LM339 quad comparator", value: "LM339" },
          { refDes: "R1", description: "Input scaling", value: "100K" },
          { refDes: "R2-R5", description: "Divider chain — sets threshold levels", value: "1K each" },
          { refDes: "R6-R9", description: "LED pull-up resistors", value: "1K each" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "+V", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "12" }, to: [] },
        ],
        designRules: [
          "R1-R5 divider sets comparison thresholds at each comparator input",
          "Adjust R1 to achieve sensitivity up to a few millivolts per LED",
          "Outputs are open-collector — LEDs need pull-up resistors to V+",
          "Window comparator: two comparators detect if input is within a voltage range (4-8mV wide)",
          "Squarewave oscillator: positive feedback creates hysteresis oscillation",
          "Freq table: C1=0.0001→22,078Hz, 0.001→2,724Hz, 0.01→309Hz, 0.1→30Hz, 1.0→4Hz",
          "TTL driver: output drives TTL directly via 10K pull-up to +5V",
          "CMOS driver: output drives CMOS via 100K pull-up to +3-15V",
          "3-state output: combine with 74LS367 for Hi-Z capability",
          "Programmable light meter: CdS photocell + two comparators set light threshold, LED indicates above/below",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.102-103. For REC: voltage level monitoring in power supplies, temperature threshold detection with multiple alarm points. Window comparator useful for detecting out-of-range conditions in oven controllers.",
  },

  // ── Display Drivers (LM3914, LM3915, NSM3916) ──

  {
    id: "lm3914-dot-bar-driver",
    name: "LM3914 Dot/Bar Display Driver",
    category: "display",
    description: "Drives up to 10 LEDs in dot or bar mode proportional to input voltage. Contains voltage divider with 10 comparators. Cascadable for 20+ LED displays. Applications include solid-state oscilloscope, relay/optical coupling controllers.",
    blocks: [
      {
        id: "lm3914-basic",
        name: "LM3914 Basic Dot/Bar Display",
        type: "display-driver",
        components: [
          { refDes: "U1", description: "LM3914N dot/bar display driver", value: "LM3914N" },
          { refDes: "R1", description: "LED current set — 1K gives ~10mA per LED", value: "1K" },
          { refDes: "R2", description: "Full-scale adjust", value: "100K" },
        ],
        nets: [
          { name: "VIN", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "V+", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "MODE", from: { refDes: "U1", pin: "9" }, to: [] },
        ],
        designRules: [
          "Pin 9 to V+ = bar mode, pin 9 floating = dot mode",
          "R1 at pin 2 controls LED current (I through R1 = LED current)",
          "Default range: 0.13-1.30V (at +V=+3-18V)",
          "For 0.1-1.0V range: add 5K pot between pins 6 and 7, adjust R2",
          "For 1V at pin 5: adjust 1K pot at R1 until LED 10 glows",
          "20-element: cascade two LM3914s — pin 9 connects mode, pin 1 cascades",
          "Anti-flicker: 0.05-2.2µF from LED anode line to pin 2",
          "Solid-state oscilloscope: 100 red LEDs in 10×10 grid, LM3914 drives vertical, 4017+4011 sweeps horizontal",
          "Relay controller: any LED output can drive relay via transistor + diode",
          "Optical coupling: phototransistor + 7404 detects specific LED output level",
          "Flashing bar: add 100µF cap to pin 3 — all 10 LEDs flash when full, otherwise no flash",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.106-108. For REC: ideal for visual temperature display on grill controllers (10-segment readout). Solid-state oscilloscope application useful for debugging analog signals in the field without test equipment. Relay controller enables setpoint-based switching.",
  },
  {
    id: "lm3915-log-display",
    name: "LM3915 Logarithmic Dot/Bar Display (-27dB range)",
    category: "display",
    description: "Logarithmic version of LM3914. Each LED represents -3dB step. Ideal for audio VU meters and signal level monitoring. Input can be AC or DC without rectification.",
    blocks: [
      {
        id: "lm3915-db-display",
        name: "LM3915 dB Dot/Bar Display",
        type: "display-driver",
        components: [
          { refDes: "U1", description: "LM3915N logarithmic dot/bar display driver", value: "LM3915N" },
          { refDes: "R1", description: "LED current set", value: "1K" },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "V+", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "BAR_DOT", from: { refDes: "U1", pin: "9" }, to: [] },
        ],
        designRules: [
          "Each output step = -3dB (0.707× voltage)",
          "Display range: 0dB (full scale) to -27dB (0.044× full scale)",
          "OK to use dot mode (pin 9 floating)",
          "Input signal can be connected to pin 5 without rectification or AC coupling",
          "See LM3914 for explanation of pin functions — same pinout",
          "For REC audio monitoring: full scale at 0dB, each LED down = -3dB",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.109. For REC: audio level monitoring for pinball sound systems. Each LED = -3dB makes it easy to set levels during setup. Can directly display AC signals without external rectifier.",
  },

  // ── Timer Circuits (558 Quad Timer) ──

  {
    id: "558-quad-timer-circuits",
    name: "558 Quad Timer Application Circuits",
    category: "timer",
    description: "Four independent monostable timers on one chip. Each timer similar to 555 one-shot mode. Vcc=4.5-18V. Common control and reset pins. Applications include adjustable pulse generator, programmable sequencer, and long-duration timer.",
    blocks: [
      {
        id: "558-pulse-generator",
        name: "558 Fully Adjustable Pulse Generator",
        type: "timer",
        components: [
          { refDes: "U1", description: "558 quad timer (2 of 4 sections used)", value: "558" },
          { refDes: "R1", description: "Rate control", value: "pot" },
          { refDes: "R2", description: "Width control", value: "pot" },
          { refDes: "R3", description: "Pull-up", value: "1.5-4.7K" },
          { refDes: "R4", description: "Pull-up", value: "1.5-4.7K" },
          { refDes: "C1", description: "Rate timing", value: "varies" },
          { refDes: "C2", description: "Width timing", value: "varies" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "12" }, to: [] },
          { name: "OUT", from: { refDes: "U1", pin: "8" }, to: [] },
        ],
        designRules: [
          "R1 controls pulse rate, R2 controls pulse width — totally independent",
          "R3=R4=1.5 to 4.7K pull-up resistors",
          "Very useful circuit — pulse rate and width are totally independent",
          "Timer A oscillates, triggers Timer B for adjustable one-shot output",
          "Simple oscillator: one section with R1=50K, R2=56K, C1=0.1, C2=0.01",
          "Fixed duty cycle pulser: add voltage divider to keep duty cycle constant when rate changes",
          "Fixed duty cycle drives LED via 220Ω + 2N2222",
          "Long duration timer: cascade all 4 sections — total delay = sum of all R×C stages",
          "Programmable sequencer: cascade A→B→C→D with individual R/C timing — outputs go high sequentially",
          "R6-R9=1.5 to 4.7K, R5 controls retrigger rate",
          "t = 1.1 × R × C per section",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.118-119. For REC: programmable sequencer ideal for multi-stage timing in pinball machines (ball launch delay → playfield enable → timer start → game over sequence). Long duration timer useful for oven cooking cycles.",
  },

  // ── Phase-Locked Loop Circuits ──

  {
    id: "4046-pll-circuits",
    name: "CD4046 CMOS Phase-Locked Loop Circuits",
    category: "pll",
    description: "Versatile CMOS PLL with two phase comparators and VCO. Used as VCO alone or as full PLL. Circuits include tunable oscillator (0.5Hz-18.5kHz), chirp burst sequencer, siren, sound effects generator, frequency synthesizer, and tone burst generator.",
    blocks: [
      {
        id: "4046-vco",
        name: "4046 Tunable Oscillator (VCO only)",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "CD4046 CMOS PLL (VCO section only)", value: "CD4046" },
          { refDes: "R1", description: "Frequency adjust", value: "500K pot" },
          { refDes: "R2", description: "Frequency range set", value: "100K" },
          { refDes: "C1", description: "VCO timing capacitor", value: "0.001µF" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "16" }, to: [] },
          { name: "VSS", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "VCO_OUT", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "VCO only: use pins 4 (VCO out), 5 (VCO in), 6/7 (R1/R2), 11 (C1)",
          "Adjust R1 to vary frequency (0.5Hz → 18.5kHz with values shown)",
          "Siren: 4011 LFO modulates VCO input — R1/C1 set cycle rate, R4/C3 set wall frequency",
          "Chirp burst: 4011 oscillator gates 4066 switch to chop VCO — R2 sets chirps/cycle, R3 sets pitch",
          "Sound effects: 4049 oscillators modulate VCO — R1=cycle time, R2=delay, R4=freq range, R5=chopping rate",
          "Frequency synthesizer: 4046 PLL locks to 4017-divided timebase — select ×2 through ×9 multiplication",
          "Timebase: set to ~100Hz using 4049 oscillator + 4017 divider",
          "Lock indicator: 4001 + 1N914 — LED glows/flickers when 4046 is out of lock in PLL mode",
          "Tone burst generator: VCO + 4049 LFO — R1 sets tone, R3 sets burst rate",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.122-123. For REC: frequency synthesizer application useful for generating precise timing signals. Siren and sound effects circuits directly applicable to pinball machine sound generation. VCO useful as variable-frequency clock source.",
  },

  // ── Tone Decoder ──

  {
    id: "567-tone-decoder-circuits",
    name: "567 Tone Decoder Application Circuits",
    category: "communication",
    description: "Contains PLL that locks to specific input frequency. Pin 8 goes low when input matches center frequency. f₀ = 1.1/(RC). Adjustable 0.01Hz-500kHz detection range. Applications include IR remote control, touch-tone decoding, and narrow-band frequency detection.",
    blocks: [
      {
        id: "567-basic-decoder",
        name: "567 Basic Tone Detector",
        type: "tone-decoder",
        components: [
          { refDes: "U1", description: "567 tone decoder PLL", value: "567" },
          { refDes: "R1", description: "Timing resistor (2K-20K)", value: "10K" },
          { refDes: "C1", description: "Timing capacitor — sets center frequency", value: "0.1µF" },
          { refDes: "C2", description: "Low-pass filter", value: "0.1µF" },
          { refDes: "C3", description: "Output filter", value: "2.2µF" },
          { refDes: "C4", description: "Output capacitor", value: "1µF" },
          { refDes: "R2", description: "Optional tone source (adjustable oscillator)", value: "100K pot" },
        ],
        nets: [
          { name: "INPUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "V+", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "7" }, to: [] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "8" }, to: [] },
        ],
        designRules: [
          "Center frequency: f₀ = 1.1 / (R × C) where R is timing resistor, C is timing capacitor",
          "R should be between 2K and 20K",
          "Detection bandwidth: 14% of f₀ (up to 2% possible with smaller low-pass cap)",
          "Low-pass capacitor should be n/f₀ in microfarads where n=1300 (for up to 14% BW) or 62,000 (for 2%)",
          "Output capacitor should be about 2× the low-pass capacitor",
          "Supply: +4.75 to 9.0V",
          "May need 1 second or more to lock on low frequency inputs",
          "2-frequency oscillator: pin 3 and pin 8 give two different frequencies",
          "2-phase oscillator: pin 3=square wave, with phase shift on pin 5",
          "Latching output: add 1N914 + 22K from pin 8 to hold output — stays on after tone removed",
          "Logic reset for latch: add 4066 switch across 22K latch resistor",
          "Narrow-band detector: two 567s tuned to closely spaced frequencies — 3 LEDs show high/centered/low",
          "IR remote TX: 555 (10K, 1.2K, 0.33µF) drives IR LED at 567's center frequency",
          "IR remote RX: phototransistor → 741 preamp → 567 detector → relay output",
          "Touch-Tone decoder: seven 567s tuned to 697/770/852/941/1209/1336/1477Hz + 7402 NOR logic → 12 outputs",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.124-126. For REC: tone-coded remote control for industrial equipment. IR remote control for grill controllers (simple on/off/temperature commands). Touch-tone decoder could enable phone-based remote monitoring of oven status.",
  },

  // ── Voltage-to-Frequency / Frequency-to-Voltage Converter ──

  {
    id: "9400-vf-converter",
    name: "9400 Voltage-to-Frequency / Frequency-to-Voltage Converter",
    category: "data-conversion",
    description: "Bidirectional converter IC. In V/F mode, input voltage produces proportional frequency output. In F/V mode, input frequency produces proportional voltage. Applications include audio frequency meter, FSK data transmitter, and analog data transmission.",
    blocks: [
      {
        id: "9400-vf-basic",
        name: "9400 Basic V/F Converter",
        type: "data-converter",
        components: [
          { refDes: "U1", description: "9400 V/F-F/V converter IC", value: "9400" },
          { refDes: "R1", description: "Input voltage / calibration", value: "100K" },
          { refDes: "R2", description: "Gain / full scale", value: "1M" },
          { refDes: "R3", description: "Frequency range", value: "1M" },
          { refDes: "R4", description: "Timing", value: "33K" },
          { refDes: "R5", description: "Timing", value: "33K" },
          { refDes: "R6", description: "Output load", value: "100K" },
          { refDes: "C1", description: "Integration capacitor", value: "0.001µF" },
          { refDes: "C2", description: "Timing capacitor", value: "47pF" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "VSS", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "FREQ_OUT", from: { refDes: "U1", pin: "10" }, to: [] },
          { name: "VIN", from: { refDes: "R1", pin: "1" }, to: [] },
        ],
        designRules: [
          "V/F mode: input voltage at pin 3 → proportional frequency at pin 10",
          "F/V mode: input frequency at pin 11 → proportional voltage at pin 12",
          "CAUTION: both bipolar AND CMOS circuitry — follow CMOS handling procedures",
          "Supply: +9-15V",
          "V/F output: frequency proportional to input voltage (0-10V → 0-10kHz typical)",
          "Audio frequency meter: F/V mode + 0-1mA meter — works up to 2.5kHz with values shown",
          "FSK data transmitter: binary input shifts between two frequencies — C2=47pF gives 3943/17671Hz, 0.1µF gives 1000/16625Hz",
          "Analog data transmission: V/F TX sends proportional frequency over wire/IR, F/V RX recovers voltage",
          "R2 controls output frequency in TX, R1 is optional input voltage source for testing",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.128-129. For REC: V/F converter enables sending analog temperature/sensor data over simple wire pairs without ADC — useful for remote sensor placement in large ovens. F/V converter recovers the measurement at the controller. FSK variant enables digital data over same link.",
  },

  // ── VCO / Function Generator ──

  {
    id: "566-vco-function-generator",
    name: "566 Voltage-Controlled Oscillator",
    category: "oscillator",
    description: "Very stable VCO with simultaneous triangle and square wave outputs. Center frequency set by R1 and C1, varied by voltage at pin 5. Used for function generators, FSK, and two-tone warbler circuits.",
    blocks: [
      {
        id: "566-function-gen",
        name: "566 Function Generator",
        type: "oscillator",
        components: [
          { refDes: "U1", description: "566 voltage-controlled oscillator", value: "566" },
          { refDes: "R1", description: "Frequency set resistor", value: "4.7K" },
          { refDes: "R2", description: "Frequency adjust", value: "10K pot" },
          { refDes: "C1", description: "Timing capacitor", value: "0.05µF" },
          { refDes: "C2", description: "Bypass / coupling", value: "0.005µF" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "U1", pin: "8" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "1" }, to: [] },
          { name: "SQ_OUT", from: { refDes: "U1", pin: "3" }, to: [] },
          { name: "TRI_OUT", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "MOD_IN", from: { refDes: "U1", pin: "5" }, to: [] },
        ],
        designRules: [
          "Center frequency = 2 × (Vcc - Vinput) / (R1 × C1 × Vcc)",
          "IMPORTANT: triangle wave output does NOT fall to 0 volts — at 12V Vcc, cycles between +4 and +6V",
          "Square wave output cycles between +6 and +11.5V at 12V Vcc",
          "R2 controls frequency via voltage divider to pin 5",
          "Vcc = +9-24V",
          "FSK generator: binary input switches between two frequencies — use for data transmission over telephone/wire/tape",
          "FSK frequencies: L=1.5kHz, H=3.0kHz typical (at Vcc=9V)",
          "Two-tone warbler: 4049 LFO modulates pin 5 — R1 controls warble rate, R3 controls tone frequency",
          "Output to 386 audio amp via 4049 buffer and speaker driver circuit",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.130. For REC: precision VCO for frequency-based sensor interfacing. FSK generator for serial data links in noisy environments (alternative to RS-232). Warbler useful for distinctive alarm tones in grill controllers.",
  },

  // ── Sound Effects Generators ──

  {
    id: "sn76477-sound-generator",
    name: "SN76477 Complex Sound Generator",
    category: "sound-effects",
    description: "Incorporates SLF oscillator, VCO, noise generator, mixer, envelope generators, and amplitude modulator on one chip. External R/C components control all parameters. Produces percussion, explosions, sirens, and many other sound effects.",
    blocks: [
      {
        id: "sn76477-percussion",
        name: "SN76477 Percussion Synthesizer",
        type: "sound-generator",
        components: [
          { refDes: "U1", description: "SN76477N complex sound generator", value: "SN76477N" },
          { refDes: "R1", description: "Decay control (VCO bias)", value: "47K" },
          { refDes: "R2", description: "VCO frequency", value: "100K pot" },
          { refDes: "R3", description: "Noise filter", value: "100" },
          { refDes: "R4", description: "Amplitude", value: "100K" },
          { refDes: "R5", description: "Sound duration", value: "47K" },
          { refDes: "C1", description: "SLF timing", value: "1-10M" },
          { refDes: "C2", description: "VCO timing", value: "0.33" },
          { refDes: "C3", description: "Noise filter cap", value: "100K" },
          { refDes: "C4", description: "Attack/decay shaping", value: "0.47" },
          { refDes: "C5", description: "Output coupling", value: "0.1" },
          { refDes: "S1", description: "Trigger switch — press to activate sound", value: "pushbutton NO" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "28" }, to: [] },
          { name: "AUDIO_OUT", from: { refDes: "U1", pin: "13" }, to: [] },
        ],
        designRules: [
          "Supply: +4.5-12V (9V best)",
          "Pin 9: system enable — ground to start",
          "Controls: R1=decay, R2=VCO freq, R3/C3=noise filter, R4=amplitude, R5=duration",
          "Add exponential decay by adding capacitor from pins 7-8",
          "Use 270K for slow attack (simulates drum hit)",
          "Frequency control: low frequency = drum-like, high = chirp",
          "Noise generator: steady hiss — add speaker in series with pushbutton for snare drum",
          "Add SLF oscillator to modulate noise for steam/aircraft/propeller sounds",
          "Mixer select pins 25/26/27: combine SLF, VCO, and noise in 8 different ways",
          "Envelope select pins 1/28: 4 attack/decay envelope shapes",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.138-139. For REC: DIRECTLY applicable to pinball machine sound effects. One chip generates percussion hits, explosions, sirens, and engine sounds. The SN76488N variant includes built-in speaker amplifier and has different pinout.",
  },
  {
    id: "sn76488-sound-generator",
    name: "SN76488N Complex Sound Generator (with built-in amplifier)",
    category: "sound-effects",
    description: "Modified version of SN76477 with built-in speaker amplifier for direct 8Ω speaker drive. Different pinout from SN76477. Circuits include bomb drop plus explosion, improved steam engine with whistle, and ultimate siren.",
    blocks: [
      {
        id: "sn76488-bomb-drop",
        name: "SN76488N Bomb Drop Plus Explosion",
        type: "sound-generator",
        components: [
          { refDes: "U1", description: "SN76488N sound generator with amplifier", value: "SN76488N" },
          { refDes: "R1", description: "SLF frequency", value: "680K" },
          { refDes: "R2", description: "Explosion duration control", value: "500K pot" },
          { refDes: "R3", description: "VCO frequency", value: "470K" },
          { refDes: "R4", description: "SLF envelope", value: "1M" },
          { refDes: "R5", description: "Altitude control", value: "100K pot" },
          { refDes: "C1", description: "SLF timing", value: "470pF" },
          { refDes: "C2", description: "VCO timing", value: "4.7µF" },
          { refDes: "C3", description: "Noise filter", value: "0.005µF" },
          { refDes: "C4", description: "Envelope", value: "22µF" },
          { refDes: "C5", description: "Feedback", value: "33µF" },
          { refDes: "C6", description: "Output coupling", value: "100µF" },
          { refDes: "SPKR", description: "8-ohm speaker", value: "8Ω" },
          { refDes: "S1", description: "Press to start — bomb drop begins, explosion follows", value: "pushbutton NO" },
        ],
        nets: [
          { name: "+6-9V", from: { refDes: "U1", pin: "12" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "TRIGGER", from: { refDes: "S1", pin: "1" }, to: [{ refDes: "U1", pin: "9" }] },
          { name: "SPKR_OUT", from: { refDes: "U1", pin: "13" }, to: [{ refDes: "C6", pin: "1" }] },
        ],
        designRules: [
          "R2 controls duration of explosion, R5 controls altitude (drop time)",
          "SN76488 has built-in amplifier — drives 8Ω speaker directly via pin 13",
          "NOTE: SN76488N and SN76477N have DIFFERENT pinouts — do not interchange",
          "Supply: +6-9V",
          "Steam engine: R1=1K, C1=470pF, R2=500K, R3=470K, C3=470pF, R4=100K — use 741 for whistle (0.0047µF for raspy, 0.01 for pure tone)",
          "Ultimate siren: R1=500K (cycle rate), R2=100K (frequency), C1=47µF, C2=0.01µF — adjust R1 for ultra-slow siren effect",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.140-141. For REC: pinball machine sound effects — bomb drop for target hits, steam engine for mechanical themes, siren for jackpot/bonus. Built-in amplifier simplifies circuit (no external LM386 needed). Direct 8Ω speaker drive.",
  },

  // ── Rhythm Pattern Generator ──

  {
    id: "mm5871-rhythm-generator",
    name: "MM5871 Rhythm Pattern Generator with Percussion Synthesizers",
    category: "sound-effects",
    description: "Complete rhythm box IC producing six patterns (rock, latin, march, waltz, country/western, swing) with five percussion instrument triggers (bass drum, block, bongo, snare, brush). Requires ±15V and +27V supplies. Complex but impressive circuit.",
    blocks: [
      {
        id: "mm5871-rhythm-box",
        name: "MM5871 Rhythm Box",
        type: "sound-generator",
        components: [
          { refDes: "U1", description: "MM5871N rhythm pattern generator", value: "MM5871N" },
          { refDes: "U2", description: "S2688/MM5837N noise generator", value: "S2688" },
          { refDes: "U3", description: "TL084C quad op-amp (percussion synthesizers)", value: "TL084C" },
          { refDes: "U4", description: "LM324 quad op-amp (percussion synthesizers)", value: "LM324" },
          { refDes: "U5", description: "TL084C summing preamp", value: "TL084C" },
          { refDes: "U6", description: "LM386 audio power amplifier", value: "LM386" },
          { refDes: "T1", description: "Power transformer 120V to 24V", value: "120V/24V" },
          { refDes: "B1", description: "Full wave bridge rectifier", value: "bridge" },
          { refDes: "U7", description: "7815 +15V regulator", value: "7815" },
          { refDes: "U8", description: "LM317 adjustable regulator (set to +27V)", value: "LM317" },
        ],
        nets: [
          { name: "+27V", from: { refDes: "U8", pin: "2" }, to: [] },
          { name: "+15V", from: { refDes: "U7", pin: "2" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "SPKR", from: { refDes: "U6", pin: "5" }, to: [] },
        ],
        designRules: [
          "Power supply: needs +27V (Vgg), +15V, and ground (Vss=0V, Vdd=-14V±2V)",
          "CAUTION: CMOS — follow handling procedures",
          "Pattern select: pin 6=rock, 7=latin, 8=march, 14=waltz, 15=C/W, 16=swing",
          "Trigger outputs: pin 9=bass, 10=block, 11=bongo, 13=snare, 12=brush",
          "Tempo: R5=1M pot + R7=100K + R6/C4/C5 RC network at pin 2",
          "Percussion synthesizers use TL084C/LM324 op-amps with RC decay networks",
          "Bass drum: R15=10K, R16=33K, C7/C8 timing, R17=1M decay, R18=1M, TL084 1/4",
          "Block: R19=220K, C9/R22=1M, TL084 1/4",
          "Bongo: R24=22K, C11/R26=4.7M, LM324 1/4, R25=1.5K",
          "Snare: R27=3.9K, C13/R29=8.2K, LM324 1/4, R28=1K",
          "Brush: R30=3.3K, C15/R32=6.2K, LM324 1/4, R31=100K",
          "Volume pots R10-R14 (5K each) control each instrument independently",
          "Summing preamp: TL084 mixes all percussion + optional noise, feeds LM386 power amp",
          "OK to use LM324 for TL084; TL084 works better",
          "D3=12V zener provides regulated power for percussion op-amps",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.142-143. For REC: complete rhythm/percussion system for pinball machine background music and game events. Six selectable patterns give variety. Individual instrument volume controls allow custom mixing. Complex build but well-documented. OK to select multiple patterns simultaneously.",
  },

  // ── Analog Delay / Effects ──

  {
    id: "sad1024-analog-delay",
    name: "SAD-1024A Dual Analog Delay Line (Flanger/Phaser/Reverberator)",
    category: "audio",
    description: "Contains two independent 512-stage serial analog delay lines. Delays up to 1/2 second. Requires 2-phase clock. Applications include adjustable flanger/phaser, echo, and reverberator effects.",
    blocks: [
      {
        id: "sad1024-flanger",
        name: "SAD-1024A Adjustable Flanger or Phaser",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", description: "SAD-1024A dual analog delay (sections A+B in series)", value: "SAD-1024A" },
          { refDes: "U2", description: "TL084C quad op-amp (preamp + filters + mixer)", value: "TL084C" },
          { refDes: "U3", description: "CD4011 quad NAND (2-phase clock generator)", value: "CD4011" },
          { refDes: "R1", description: "Audio input level", value: "10K" },
          { refDes: "R2", description: "Clock rate (sweep speed) — main balance control", value: "1M pot" },
          { refDes: "R7", description: "Balance — relative amplitudes of original vs delayed", value: "5K pot" },
          { refDes: "R9", description: "Output level / SAD balance", value: "500Ω pot" },
          { refDes: "C1", description: "Clock timing — sets clock frequency range", value: "100pF-0.001µF" },
        ],
        nets: [
          { name: "+12V", from: { refDes: "U2", pin: "4" }, to: [] },
          { name: "AUDIO_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "AUDIO_OUT", from: { refDes: "R9", pin: "2" }, to: [] },
        ],
        designRules: [
          "CAUTION: NMOS chip — vulnerable to static discharge! Follow CMOS handling",
          "Connect Vbb to Vdd (pin 7) or set to 1V below Vdd for optimum results",
          "Both sections A and B can be used separately or in series (1024 stages total)",
          "Two outputs appear after passing through all stages on alternating clock pulses",
          "R2 controls clock rate — main control for sweep speed",
          "R7 is the main balance control (mix of original and delayed signals)",
          "R9 balances the SAD output (the two alternating outputs)",
          "For single echo: set R2 for 3-8kHz clock frequency",
          "For hollow/swishy sounds: use 20-100kHz clock",
          "Low-pass filters (TL084) at input and output remove clock noise",
          "R13/R7 set bias to sections A and B — connect scope to pin 5 for setup",
          "Reverberator: feed delayed output back to input via 10µF + 1M resistor",
          "Slow clock (5-20kHz): single echo effect",
          "Fast clock (20-100kHz): hollow sound, careful adjustment needed",
          "Most striking reverberations at 5-20kHz clock, robot-like at 20-100kHz",
          "C7=0.001µF for standard operation, use 0.01µF for low clock rates",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.144-145. For REC: audio effects processing for pinball machine sounds — flanger/echo on callout voices, reverb on impact sounds. The SAD-1024 is an NMOS analog chip (bucket brigade) — handle with care. Digital delay lines (PT2399) are modern alternatives but this circuit teaches the principles.",
  },

  // ── Optocoupler Application Circuits ──

  {
    id: "moc3010-triac-optocoupler",
    name: "MOC3010 Triac Output Optocoupler — AC Power Control",
    category: "optocoupler",
    description: "Infrared LED switches triac (MOC3010) or SCR (SCS11C3) for isolated AC/DC power control. MOC3010 switches 120V AC at 100mA. SCS11C3 switches 200V DC at 300mA. Used for computer/calculator output ports.",
    blocks: [
      {
        id: "moc3010-ac-port",
        name: "MOC3010 Triac AC Output Port",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "MOC3010 triac output optocoupler", value: "MOC3010" },
          { refDes: "R1", description: "LED current limit — sets drive current", value: "470" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "CONTROL", from: { refDes: "U1", pin: "2" }, to: [] },
          { name: "AC_LOAD", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "AC_LINE", from: { refDes: "U1", pin: "4" }, to: [] },
        ],
        designRules: [
          "MOC3010: triac output, switches 120V AC at 100mA max",
          "SCS11C3: SCR output, switches 200V DC at 300mA max — observe polarity!",
          "Load (lamp, motor, etc.) must not exceed optocoupler rating",
          "For higher power: use optocoupler to trigger external power triac/SCR",
          "470Ω resistor at LED limits current from TTL/CMOS bus",
          "DC port (SCS11C3): pin 2=anode (bus), pin 3=cathode (GND), pin 4=load+, pin 5=load to V+, pin 6=reset (NC normally closed)",
          "Connect pins 1 and 2 to decimal point of lowest order readout digit for calculator output port",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.148-149. For REC: essential for isolated AC power switching in oven controllers and grill igniters. MOC3010 provides galvanic isolation between low-voltage control logic and 120V AC loads. Use external power triac for loads >100mA.",
  },
  {
    id: "moc5010-linear-optocoupler",
    name: "MOC5010 Linear Optocoupler Circuits",
    category: "optocoupler",
    description: "Converts LED current flow into proportional output voltage. Ideal for telephone line coupling, isolated analog data links, and AC signal isolation. Also used as SCR driver and TTL interface.",
    blocks: [
      {
        id: "moc5010-analog-link",
        name: "MOC5010 Isolated Analog Data Link",
        type: "optocoupler",
        components: [
          { refDes: "U1", description: "MOC5010 linear optocoupler", value: "MOC5010" },
          { refDes: "U2", description: "741 op-amp (output amplifier)", value: "741" },
          { refDes: "R1", description: "LED current set — 1K minimum", value: "1K" },
          { refDes: "R2", description: "Bias adjust — controls output level", value: "1M pot" },
          { refDes: "R3", description: "Output gain", value: "100K" },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "R1", pin: "1" }, to: [] },
          { name: "+9V_TX", from: { refDes: "R2", pin: "1" }, to: [] },
          { name: "+9V_RX", from: { refDes: "U2", pin: "7" }, to: [] },
          { name: "SIGNAL_OUT", from: { refDes: "U2", pin: "6" }, to: [] },
        ],
        designRules: [
          "Very sensitive: +0.0025V input gives full output of +8V",
          "Reduce R1 or R2 to reduce sensitivity",
          "Pin 1=anode, pin 2=cathode, pin 3=NC, pin 4=GND (out), pin 5=output, pin 6=Vcc (out)",
          "SCR driver: drive MOC5010 LED → output triggers SCR via pin 5 → SCR latches load",
          "SCR reset: normally closed pushbutton at SCR gate",
          "TTL interface: 7400 NAND gate drives LED via 470Ω → MOC5010 → output drives external circuit",
          "AC signal isolator: Rs=signal voltage/0.025 sets LED current, 741 op-amp output with 100K-1M gain pot",
          "Output: IN=4V square → OUT=2V square; IN=sine → OUT=sine (proportional)",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.149. For REC: isolated analog signal path for temperature sensor data in oven controllers where mains voltage is present. AC signal isolator useful for monitoring AC line voltage safely. SCR driver with isolation for high-voltage switching.",
  },

  // ── Audio Power Amplifiers ──

  {
    id: "lm383-power-amplifier",
    name: "LM383/TDA2002 8-Watt and 16-Watt Power Amplifiers",
    category: "amplifier",
    description: "Power amplifier designed for automotive and audio applications. Drives 4Ω load directly. 8-watt single-ended, 16-watt bridge configuration. Built-in thermal shutdown protection.",
    blocks: [
      {
        id: "lm383-8w-amp",
        name: "LM383 8-Watt Amplifier",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", description: "LM383/TDA2002 8-watt power amplifier", value: "LM383" },
          { refDes: "R1", description: "Gain set", value: "220" },
          { refDes: "R2", description: "Zobel network", value: "2.2Ω" },
          { refDes: "C1", description: "Input coupling", value: "0.2µF" },
          { refDes: "C2", description: "Input bypass", value: "10µF" },
          { refDes: "C3", description: "Bootstrap", value: "470µF" },
          { refDes: "C4", description: "Output coupling — place close to IC", value: "0.2µF" },
          { refDes: "C5", description: "Output filter", value: "1000-2000µF" },
          { refDes: "SPKR", description: "1-4Ω speaker or two 8Ω in parallel", value: "4Ω" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "AUDIO_IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "SPKR_OUT", from: { refDes: "C5", pin: "+" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "3" }, to: [] },
        ],
        designRules: [
          "Supply: +5-20V, 8W output at 14V into 4Ω",
          "Pin 1=+IN, Pin 2=-IN, Pin 3=GND, Pin 4=OUT, Pin 5=Vcc",
          "NOTE: preformed leads — pin locations are unusual",
          "GND pins 3,4,5,10,11,12 should be heat sunk for maximum power",
          "MUST use heat sink — thermal shutdown protects against overload but causes severe distortion",
          "If distortion occurs: reduce supply to 6-9V",
          "C4 must be placed close as possible to IC",
          "R2 can use 4-10Ω resistors in parallel",
          "16-watt bridge: two LM383s — first drives speaker directly, second inverted, connected to other speaker terminal",
          "Bridge mode: +12-14V supply, 1-4Ω speaker or 2×8Ω speakers",
          "Bridge R4=220Ω bias, R5/C5=2.2Ω/470µF zobel on second amp, R6=1M offset, R7=100K feedback",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.136. For REC: powerful audio amplifier for pinball machine speakers. 8W into 4Ω is plenty for playfield sound effects. Bridge mode doubles power for backbox speakers. Built-in thermal protection prevents damage from sustained high-volume play.",
  },
  {
    id: "lm1877-stereo-amplifier",
    name: "LM1877/LM377 Dual 2-Watt Stereo Amplifier and Public Address System",
    category: "amplifier",
    description: "High quality dual power amplifier. 70dB channel separation, 3µV noise input, thermal shutdown. Pin 3,4,5,10,11,12 should be connected together and heat sunk. Circuits include stereo amp, 4-watt mono, and public address system.",
    blocks: [
      {
        id: "lm1877-stereo",
        name: "LM1877 Stereo Amplifier",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", description: "LM1877/LM377 dual 2-watt amplifier", value: "LM1877" },
          { refDes: "R1", description: "Input coupling / volume (per channel)", value: "100K pot" },
          { refDes: "R2", description: "Gain set (per channel)", value: "1.8K" },
          { refDes: "R3", description: "Feedback (per channel)", value: "100K" },
          { refDes: "C1", description: "Input coupling (per channel)", value: "0.1µF" },
          { refDes: "C2", description: "Input coupling (per channel)", value: "4.7µF" },
          { refDes: "C3", description: "Output coupling (per channel)", value: "470µF" },
          { refDes: "SPKR", description: "8Ω speakers (one per channel)", value: "8Ω" },
        ],
        nets: [
          { name: "VCC", from: { refDes: "U1", pin: "14" }, to: [] },
          { name: "IN_L", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "IN_R", from: { refDes: "C2", pin: "1" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "3" }, to: [] },
        ],
        designRules: [
          "Supply: +10-26V",
          "Pins 3,4,5,10,11,12 should be connected to ground and heat sunk",
          "Channel separation: 70dB — virtually no crosstalk",
          "If load exceeds device rating: thermal shutdown engages (causes distortion, not damage)",
          "Use copper foil on PC board (up to 10 sq inches) or metal fin for heatsinking",
          "4-watt mono: bridge the two channels — 1 speaker gets 4W from single IC",
          "Public address: dynamic mic → 741C preamp → LM377 power amp → 8Ω speaker",
          "PA uses fewer parts than LM1877 version — split supply from ±12V",
          "Volume control: 100K pot at preamp input",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.137. For REC: stereo amplifier for pinball machine — separate playfield and backbox speaker channels with independent volume. PA system useful for outdoor grill controller installations. 4-watt bridge mode packs more power from single IC.",
  },

  // ── ADC / DAC Converters ──

  {
    id: "dac801-digital-to-analog",
    name: "DAC801 8-Bit Digital-to-Analog Converter",
    category: "data-conversion",
    description: "Fast 8-bit DAC accepting TTL-level inputs. Provides ±output. Used with op-amp output stage. Applications include 256-step staircase generator and tone generator.",
    blocks: [
      {
        id: "dac801-basic",
        name: "DAC801 8-Bit DAC with Op-Amp Output",
        type: "data-converter",
        components: [
          { refDes: "U1", description: "DAC801 8-bit digital-to-analog converter", value: "DAC801" },
          { refDes: "U2", description: "741 op-amp (output buffer/amplifier)", value: "741" },
          { refDes: "R1", description: "Full scale adjust", value: "4.7K" },
          { refDes: "R2", description: "Reference divider", value: "33K" },
        ],
        nets: [
          { name: "V+", from: { refDes: "U1", pin: "15" }, to: [] },
          { name: "V-", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "B1_MSB", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "B8_LSB", from: { refDes: "U1", pin: "12" }, to: [] },
          { name: "IOUT", from: { refDes: "U1", pin: "2" }, to: [{ refDes: "U2", pin: "2" }] },
          { name: "ANALOG_OUT", from: { refDes: "U2", pin: "6" }, to: [] },
        ],
        designRules: [
          "Supply: V± = ±4.5 to ±18V",
          "B1 = most significant bit, B8 = least significant bit",
          "Threshold control at pin 3",
          "Compensation pins 15/16",
          "R1 at pin 14/15 provides reference — 4.7K to +10V",
          "R2 at pin 15 provides full-scale adjust — 33K",
          "741 op-amp converts current output to voltage",
          "256-step staircase: two 74LS193 counters feed DAC, 555 clock drives counters",
          "S1 switches unipolar (0-5V ramp) or bipolar (±5V triangle) output",
          "DAC801 tone generator: 555 oscillator (100K/10K/0.01µF) clocks 74LS193 counters",
          "Modify binary inputs to DAC to create unique waveforms",
          "+10V reference can be +5 to +10V for non-precision applications",
          "Power supply: 350T (+10V adj), 7805 (+5V), 7905 (-5V) from 120VAC/25.2VAC transformer",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook pp.132-133. For REC: 8-bit DAC useful for generating analog control signals from microcontroller — motor speed control, display brightness, analog setpoints in grill controllers. Staircase generator useful for testing analog circuits.",
  },
  {
    id: "tl507-analog-to-digital",
    name: "TL507 Analog-to-Digital Converter with Pulse Width Modulator",
    category: "data-conversion",
    description: "Provides 4-bit or 8-bit analog-to-digital conversion using external counter and steering logic. Also functions as pulse width modulator. Good PWM output for motor/lamp control.",
    blocks: [
      {
        id: "tl507-pwm",
        name: "TL507 Pulse Width Modulator",
        type: "data-converter",
        components: [
          { refDes: "U1", description: "TL507 analog-to-digital converter", value: "TL507" },
          { refDes: "U2", description: "555 timer (clock source)", value: "NE555" },
          { refDes: "R1", description: "555 timing", value: "220" },
          { refDes: "R2", description: "555 timing", value: "10K" },
          { refDes: "C1", description: "555 timing", value: "470pF" },
        ],
        nets: [
          { name: "VCC1", from: { refDes: "U1", pin: "6" }, to: [] },
          { name: "ANALOG_IN", from: { refDes: "U1", pin: "5" }, to: [] },
          { name: "PWM_OUT", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "CLOCK", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "U1", pin: "2" }] },
        ],
        designRules: [
          "Vcc1 = 3.5-6V, Vcc2 = 8-18V",
          "NOTE: use Vcc1 OR Vcc2, not both",
          "Clock: 100kHz typical (555 with R1=220, R2=10K, C1=470pF)",
          "PWM output: 0.75×Vcc1 to 0.25×Vcc1",
          "1.5V analog in gives 4.5V PWM pulses at clock=100kHz (783Hz modulation)",
          "3.0V analog in gives wider PWM pulses",
          "8-bit ADC: TL507 PWM output → 74LS00 gate → two 74LS193 counters → 74LS374 latch → 8-bit data bus",
          "Omit second 74LS193 for 4-bit ADC (works better)",
          "555 at 100kHz provides clock to TL507 and counters",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.131. For REC: PWM output directly useful for motor speed control and LED dimming in pinball machines. 8-bit ADC variant enables reading analog sensors (temperature, voltage) with simple TTL counters — useful for legacy digital designs without microcontroller ADC.",
  },

  // ── Top Octave Synthesizer ──

  {
    id: "s50240-top-octave-synthesizer",
    name: "S50240 Top Octave Synthesizer",
    category: "audio",
    description: "PMOS chip that divides a single clock frequency into a full equally-tempered octave of 13 notes plus one note (C8 to C9). Input 2.00024MHz gives top octave. Lower octaves obtained by halving clock frequency with flip-flops.",
    blocks: [
      {
        id: "s50240-octave",
        name: "S50240 Adjustable Octave Synthesizer",
        type: "sound-generator",
        components: [
          { refDes: "U1", description: "S50240 top octave synthesizer (PMOS)", value: "S50240" },
          { refDes: "U2", description: "CD4011 quad NAND gate (clock oscillator)", value: "CD4011" },
          { refDes: "U3", description: "741C op-amp (summing mixer)", value: "741C" },
          { refDes: "R1", description: "Clock frequency adjust", value: "10K pot" },
          { refDes: "C1", description: "Clock timing", value: "100pF" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "16" }, to: [] },
          { name: "GND", from: { refDes: "U1", pin: "4" }, to: [] },
          { name: "CLOCK", from: { refDes: "U2", pin: "3" }, to: [{ refDes: "U1", pin: "2" }] },
          { name: "AUDIO_OUT", from: { refDes: "U3", pin: "6" }, to: [] },
        ],
        designRules: [
          "For top octave: clock = 2.00024MHz",
          "For next lower octave: clock = 1.00012MHz (halve with flip-flop)",
          "Each lower octave = half the clock frequency",
          "13 outputs: ÷478 through ÷338 give C through C (one full octave + semitones)",
          "Divider ratios: 478,451,426,402,379,358,338,319,301,284,268,253,239",
          "Supply: +11-16V (PMOS)",
          "IMPORTANT: press only ONE switch at a time for clean tones",
          "For simultaneous notes (chords): use op-amp mixer or summing amplifier",
          "100K resistors from each output to 741 summing junction",
          "741 with 33K feedback → audio amplifier",
          "Special effects: 4011 oscillator modulates clock for bagpipe/unusual sounds — R1 varies interruption rate",
          "Chip number may be inverted on some packages",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook p.146. For REC: electronic organ / musical note generation for pinball machines — play musical jingles on scoring events. Each output is a precise musical note. Multiple S50240s at different clock rates give multi-octave range.",
  },

  // ──────────────────────────────────────────────────
  // Mims Engineer's Notebook II — new circuits
  // ──────────────────────────────────────────────────

  {
    id: "mc14553-event-counter",
    name: "MC14553 3-Digit BCD Counter / Frequency Counter",
    description: "3-digit BCD counter with multiplexed 7-segment display output. Can count events (pulse input) or measure frequency (gated count with known timebase). MC14553 includes internal oscillator for display multiplexing.",
    category: "counter",
    blocks: [
      {
        id: "mc14553-counter-block",
        name: "MC14553 Counter + Display",
        type: "counter",
        components: [
          { refDes: "U1", value: "MC14553", description: "3-digit BCD counter with multiplexed output" },
          { refDes: "U2", value: "4511", description: "BCD-to-7-segment latch/decoder/driver" },
          { refDes: "DISP1", description: "3-digit common-cathode 7-segment LED display" },
          { refDes: "R1", value: "100K", description: "Display multiplex oscillator resistor" },
          { refDes: "C1", value: "100pF", description: "Display multiplex oscillator capacitor" },
          { refDes: "R2", value: "1M", description: "Clock input pull-up" },
          { refDes: "R3-R9", value: "150", description: "Segment current limiting resistors (7×)" },
          { refDes: "Q1", value: "2N2907", description: "Digit 1 PNP driver" },
          { refDes: "Q2", value: "2N2907", description: "Digit 2 PNP driver" },
          { refDes: "Q3", value: "2N2907", description: "Digit 3 PNP driver" },
        ],
        nets: [
          { name: "CLOCK_IN", from: { refDes: "U1", pin: "CLOCK" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "BCD_A", from: { refDes: "U1", pin: "QA" }, to: [{ refDes: "U2", pin: "A" }] },
          { name: "BCD_B", from: { refDes: "U1", pin: "QB" }, to: [{ refDes: "U2", pin: "B" }] },
          { name: "BCD_C", from: { refDes: "U1", pin: "QC" }, to: [{ refDes: "U2", pin: "C" }] },
          { name: "BCD_D", from: { refDes: "U1", pin: "QD" }, to: [{ refDes: "U2", pin: "D" }] },
          { name: "DS1", from: { refDes: "U1", pin: "DS1" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "DS2", from: { refDes: "U1", pin: "DS2" }, to: [{ refDes: "Q2", pin: "B" }] },
          { name: "DS3", from: { refDes: "U1", pin: "DS3" }, to: [{ refDes: "Q3", pin: "B" }] },
        ],
        designRules: [
          "MC14553 counts 000-999 with auto-rollover",
          "MASTER RESET (pin 13) HIGH resets to 000",
          "LATCH ENABLE (pin 4) LOW latches display, HIGH updates continuously",
          "For event counting: feed pulses to CLOCK input",
          "For frequency counting: gate CLOCK input with known-period enable signal",
          "Multiplex oscillator: f ≈ 1/(2.2×R1×C1), aim for ~1kHz for flicker-free display",
          "DISABLE input (pin 3) HIGH disables clock — use for gated counting",
          "OVERFLOW output (pin 5) goes HIGH when count exceeds 999",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II pp.34-35. For REC: score display for pinball machines, event counting for grill cycle monitors. MC14553 replaces discrete counter chains with single IC. Overflow output chains to additional counters for 4+ digits.",
  },

  {
    id: "mm5369-timebase-stopwatch",
    name: "MM5369 Timebase / Digital Stopwatch",
    description: "MM5369 17-stage frequency divider takes 3.579545 MHz TV colorburst crystal and divides to 60Hz (or 50Hz selectable). Combined with counters for digital stopwatch or precision clock timebase.",
    category: "timer",
    blocks: [
      {
        id: "mm5369-timebase-block",
        name: "MM5369 Timebase",
        type: "clock",
        components: [
          { refDes: "U1", value: "MM5369", description: "17-stage frequency divider (3.58MHz → 60Hz)" },
          { refDes: "Y1", value: "3.579545MHz", description: "TV colorburst crystal" },
          { refDes: "C1", value: "33pF", description: "Crystal load capacitor" },
          { refDes: "C2", value: "33pF", description: "Crystal load capacitor" },
          { refDes: "R1", value: "10M", description: "Oscillator feedback resistor" },
        ],
        nets: [
          { name: "XTAL1", from: { refDes: "U1", pin: "OSC_IN" }, to: [{ refDes: "Y1", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "XTAL2", from: { refDes: "U1", pin: "OSC_OUT" }, to: [{ refDes: "Y1", pin: "2" }, { refDes: "C2", pin: "1" }, { refDes: "R1", pin: "1" }] },
          { name: "60HZ_OUT", from: { refDes: "U1", pin: "OUT" }, to: [] },
        ],
        designRules: [
          "3.579545MHz ÷ 59659 = 60.0006Hz (0.001% accuracy)",
          "Pin 2 selects 50Hz (HIGH) or 60Hz (LOW)",
          "Crystal MUST be 3.579545MHz TV colorburst type",
          "Supply: 5V CMOS",
          "Output drives 4017 decade counter for 0.1s/1s/10s timing",
          "For stopwatch: cascade 4017s with 4553 BCD display driver",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.37. For REC: precision timebase for grill/oven controller timing, stopwatch for service diagnostics. Much more accurate than RC-based 555 timers for long-duration timing.",
  },

  {
    id: "mm5837n-noise-generator",
    name: "MM5837N Digital Noise Generator",
    description: "MM5837N pseudo-random noise generator IC produces white noise from digital shift register feedback. Simple 3-pin device. Used for white noise, pink noise (with RC filter), snare drum sounds, and random coin tosser.",
    category: "sound-effects",
    blocks: [
      {
        id: "mm5837n-white-noise",
        name: "MM5837N White Noise Source",
        type: "sound-generator",
        components: [
          { refDes: "U1", value: "MM5837N", description: "Digital noise generator (3-pin)" },
          { refDes: "C1", value: "0.1uF", description: "Supply bypass" },
          { refDes: "R1", value: "100K", description: "Output load resistor" },
          { refDes: "C2", value: "0.1uF", description: "AC coupling capacitor" },
        ],
        nets: [
          { name: "VDD", from: { refDes: "U1", pin: "VDD" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "NOISE_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "C2", pin: "1" }] },
        ],
        designRules: [
          "Supply: +10 to +15V (do NOT use 5V — insufficient noise amplitude)",
          "Output is digital pseudo-random noise, flat spectrum (white)",
          "For pink noise: add RC low-pass filter (10K + 0.047uF = -3dB/octave rolloff)",
          "For snare drum: feed into 555 VCO control voltage — noise modulates pitch",
          "For coin tosser: feed into comparator — output randomly toggles high/low",
          "S2688 is equivalent/compatible part",
          "Keep leads short, bypass VDD close to pin",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.38. For REC: random sound effects in pinball machines (crowd noise, explosion textures), white noise masking for grill environments. Also useful as randomness source for game logic.",
  },

  {
    id: "74154-back-forth-flasher",
    name: "74154 Back-and-Forth LED Flasher (Knight Rider)",
    description: "4-to-16 line decoder (74154) driven by up/down counter creates a scanning LED display that sweeps back and forth. 10 LEDs connected to outputs 0-9. Counter counts 0-9-0-9... with direction flip at endpoints.",
    category: "flasher",
    blocks: [
      {
        id: "74154-scanner-block",
        name: "74154 LED Scanner",
        type: "display-driver",
        components: [
          { refDes: "U1", value: "74154", description: "4-to-16 line decoder (active LOW outputs)" },
          { refDes: "U2", value: "74LS193", description: "4-bit up/down counter" },
          { refDes: "U3", value: "NE555", description: "Clock oscillator" },
          { refDes: "LED1-LED10", description: "LEDs connected to 74154 outputs 0-9" },
          { refDes: "R1-R10", value: "330", description: "LED current limiting resistors (10×)" },
          { refDes: "R11", value: "47K", description: "555 timing resistor" },
          { refDes: "C1", value: "10uF", description: "555 timing capacitor" },
          { refDes: "R12", value: "1K", description: "555 discharge resistor" },
        ],
        nets: [
          { name: "CLOCK", from: { refDes: "U3", pin: "OUT" }, to: [{ refDes: "U2", pin: "COUNT_UP" }] },
          { name: "QA", from: { refDes: "U2", pin: "QA" }, to: [{ refDes: "U1", pin: "A" }] },
          { name: "QB", from: { refDes: "U2", pin: "QB" }, to: [{ refDes: "U1", pin: "B" }] },
          { name: "QC", from: { refDes: "U2", pin: "QC" }, to: [{ refDes: "U1", pin: "C" }] },
          { name: "QD", from: { refDes: "U2", pin: "QD" }, to: [{ refDes: "U1", pin: "D" }] },
        ],
        designRules: [
          "74154 outputs are ACTIVE LOW — LEDs connect from Vcc through R to output pin",
          "Use 74LS193 up/down counter with direction flip logic",
          "At count=9: flip to count-down mode; at count=0: flip to count-up mode",
          "Direction flip: decode 0 and 9 with NAND gate to toggle a flip-flop driving UP/DOWN select",
          "Clock speed ~2-10 Hz for visible scanning effect",
          "For faster scanning: reduce R11 or C1 in 555 circuit",
          "Outputs 10-15 unused — tie enable pins G1,G2 LOW to enable decoder",
          "Supply: 5V TTL",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.51. For REC: CRITICAL for pinball machines — scanning LED chase lights, bonus multiplier indicators, back-and-forth attract mode displays. Also useful for status indication on grill controllers.",
  },

  {
    id: "74ls161-ramp-synthesizer",
    name: "74LS161 Ramp Synthesizer with R-2R DAC",
    description: "4-bit binary counter (74LS161) drives an R-2R resistor ladder to generate a staircase/ramp waveform. Counter clocked by 555, outputs feed weighted resistor network creating 16-step analog staircase. Output fed to op-amp for buffering.",
    category: "data-conversion",
    blocks: [
      {
        id: "74ls161-ramp-block",
        name: "74LS161 Counter + R-2R DAC",
        type: "dac",
        components: [
          { refDes: "U1", value: "74LS161", description: "4-bit synchronous binary counter" },
          { refDes: "U2", value: "NE555", description: "Clock oscillator" },
          { refDes: "R1", value: "10K", description: "R-2R ladder: R value (4×)" },
          { refDes: "R2", value: "20K", description: "R-2R ladder: 2R value (5×)" },
          { refDes: "R3", value: "47K", description: "555 timing resistor" },
          { refDes: "C1", value: "0.01uF", description: "555 timing capacitor" },
        ],
        nets: [
          { name: "CLOCK", from: { refDes: "U2", pin: "OUT" }, to: [{ refDes: "U1", pin: "CLK" }] },
          { name: "QA", from: { refDes: "U1", pin: "QA" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "QB", from: { refDes: "U1", pin: "QB" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "QC", from: { refDes: "U1", pin: "QC" }, to: [{ refDes: "R1", pin: "2" }] },
          { name: "QD", from: { refDes: "U1", pin: "QD" }, to: [{ refDes: "R1", pin: "3" }] },
        ],
        designRules: [
          "R-2R ladder: use 1% tolerance resistors for best linearity",
          "R values: 10K, 2R values: 20K (or any 1:2 ratio)",
          "Output voltage: 0 to ~4.5V in 16 steps (at 5V supply)",
          "Step size: ~0.3V per count",
          "74LS161 has synchronous load and clear — CLR LOW resets to 0",
          "ENT and ENP both HIGH to enable counting",
          "RCO (ripple carry out) goes HIGH at count 15 — chain to next counter for 8-bit",
          "For sawtooth: let counter free-run (auto-wraps 15→0)",
          "For triangle: use up/down counter (74LS193) instead",
          "Clock frequency = output ramp frequency × 16",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.61. For REC: simple DAC for analog test signals, ramp generator for servo testing, staircase waveform for display brightness ramping in pinball machines.",
  },

  {
    id: "lm317-nicad-charger",
    name: "LM317 NiCad Battery Charger",
    description: "LM317 configured as constant-current source for NiCad battery charging. Current set by single resistor. Charges at C/10 rate for overnight trickle charging.",
    category: "power-supply",
    blocks: [
      {
        id: "lm317-charger-block",
        name: "LM317 Constant Current Charger",
        type: "current-source",
        components: [
          { refDes: "U1", value: "LM317", description: "Adjustable positive voltage regulator (as current source)" },
          { refDes: "R1", value: "12", description: "Current set resistor: I = 1.25V/R1 = ~100mA for AA NiCad" },
          { refDes: "D1", value: "1N4001", description: "Reverse polarity protection diode" },
          { refDes: "LED1", description: "Charging indicator LED" },
          { refDes: "R2", value: "330", description: "LED current limiting resistor" },
        ],
        nets: [
          { name: "INPUT", from: { refDes: "U1", pin: "IN" }, to: [{ refDes: "D1", pin: "A" }] },
          { name: "CURRENT_SET", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "BATTERY_POS", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "ADJ" }] },
        ],
        designRules: [
          "Charge current I = 1.25V / R1",
          "For 100mA: R1 = 12Ω (1.25/0.1 = 12.5Ω, use 12Ω)",
          "For 50mA: R1 = 25Ω",
          "For C/10 trickle charge: charge time = 14-16 hours",
          "Input voltage must be at least 3V above total battery stack voltage",
          "LM317 dropout: ~2V minimum",
          "R1 power: P = 1.25V × I (1.25V × 0.1A = 0.125W, 1/4W resistor OK)",
          "Add heatsink to LM317 if charging at >200mA",
          "IMPORTANT: NiCad only — do NOT use for NiMH without timer cutoff",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.72. For REC: battery backup charging for pinball score memory, portable grill controller battery maintenance. Simple and reliable constant-current source.",
  },

  {
    id: "337t-precision-led-regulator",
    name: "LM337T Precision LED Current Regulator",
    description: "LM337T negative voltage regulator configured as precision constant-current source for high-power LED strings. Provides very stable current regulation independent of LED forward voltage variations.",
    category: "led",
    blocks: [
      {
        id: "337t-led-reg-block",
        name: "337T LED Constant Current",
        type: "current-source",
        components: [
          { refDes: "U1", value: "LM337T", description: "Negative adjustable voltage regulator (as current sink)" },
          { refDes: "R1", value: "25", description: "Current set resistor: I = 1.25V/R1 = 50mA" },
          { refDes: "C1", value: "1uF", description: "Input bypass capacitor (tantalum)" },
          { refDes: "C2", value: "1uF", description: "Output bypass capacitor" },
        ],
        nets: [
          { name: "LED_CATHODE", from: { refDes: "U1", pin: "IN" }, to: [] },
          { name: "CURRENT_SET", from: { refDes: "U1", pin: "ADJ" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "GND_RETURN", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "Current I = 1.25V / R1",
          "For 50mA: R1 = 25Ω",
          "For 20mA: R1 = 62Ω",
          "337T wired 'backwards' — OUT to ground, IN from LED cathode",
          "LED string connects from V+ through LEDs to 337T IN pin",
          "Maximum LED string: limited by (Vsupply - 3V dropout) / Vf_per_LED",
          "Much better regulation than simple resistor — current stays constant as LED heats up",
          "Add heatsink for currents above 100mA",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.73. For REC: precision LED lighting for pinball playfield inserts (consistent brightness), indicator LED strings on grill controllers. Superior to resistor-based limiting for multiple LEDs in series.",
  },

  {
    id: "556-4051-4state-tone",
    name: "556+4051 Programmable 4-State Tone Generator",
    description: "556 dual timer as oscillator with 4051 8-channel analog multiplexer selecting between 4 different RC combinations. Two mode-select inputs choose output: two-tone, steady, burst, or metronome patterns.",
    category: "sound-effects",
    blocks: [
      {
        id: "556-4051-tone-block",
        name: "556 Oscillator + 4051 Mode Select",
        type: "sound-generator",
        components: [
          { refDes: "U1", value: "NE556", description: "Dual timer — oscillator section" },
          { refDes: "U2", value: "4051", description: "8-channel analog multiplexer" },
          { refDes: "R1", value: "2.2K", description: "556 timing resistor A" },
          { refDes: "R2", value: "100K", description: "556 timing resistor B" },
          { refDes: "R3", value: "100K", description: "Feedback resistor" },
          { refDes: "R4", value: "5K", description: "Mode frequency adjust pot" },
          { refDes: "R5", value: "5K", description: "Output tone adjust pot" },
          { refDes: "R6", value: "270", description: "Speaker series resistor" },
          { refDes: "C1", value: "3.3uF", description: "Main timing capacitor" },
          { refDes: "C4", value: "0.1uF", description: "Output coupling capacitor" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "MODE_A", from: { refDes: "U2", pin: "A" }, to: [] },
          { name: "MODE_B", from: { refDes: "U2", pin: "B" }, to: [] },
          { name: "MUX_OUT", from: { refDes: "U2", pin: "COM" }, to: [{ refDes: "U1", pin: "CV" }] },
          { name: "AUDIO_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R6", pin: "1" }] },
        ],
        designRules: [
          "Mode select: BA=LL→two-tone, LH→steady, HL→burst, HH→metronome",
          "L=GND, H=+5-15V (Vdd)",
          "4051 channels 0-3 connect to different RC networks",
          "Change C1 and C4 to alter output tones",
          "Supply: +5 to +15V",
          "R4 adjusts rate, R5 adjusts output frequency range",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.101. For REC: multi-mode alert tones for grill controllers (different sounds for different alerts), pinball machine sound effects with logic-selectable patterns.",
  },

  {
    id: "558-programmable-sequencer",
    name: "558 Quad Timer Programmable 4-Stage Sequencer",
    description: "All four sections of 558 quad timer cascaded as sequential one-shots. Trigger input starts sequence — outputs A,B,C,D go high then low in order. Each stage's timing independently set by its own RC pair. R5 controls overall rate.",
    category: "timer",
    blocks: [
      {
        id: "558-sequencer-block",
        name: "558 4-Stage Sequencer",
        type: "sequencer",
        components: [
          { refDes: "U1", value: "558", description: "Quad timer IC" },
          { refDes: "R1", value: "variable", description: "Stage A timing resistor" },
          { refDes: "R2", value: "variable", description: "Stage B timing resistor" },
          { refDes: "R3", value: "variable", description: "Stage C timing resistor" },
          { refDes: "R4", value: "variable", description: "Stage D timing resistor" },
          { refDes: "R5", value: "10K", description: "Rate control / end-of-sequence pull-down" },
          { refDes: "R6-R9", value: "4.7K", description: "Coupling resistors between stages (4×)" },
          { refDes: "C1", value: "variable", description: "Stage A timing capacitor" },
          { refDes: "C2", value: "variable", description: "Stage B timing capacitor" },
          { refDes: "C3", value: "variable", description: "Stage C timing capacitor" },
          { refDes: "C4", value: "variable", description: "Stage D timing capacitor" },
        ],
        nets: [
          { name: "TRIGGER", from: { refDes: "U1", pin: "TR_A" }, to: [] },
          { name: "A_TO_B", from: { refDes: "U1", pin: "OUT_A" }, to: [{ refDes: "R6", pin: "1" }] },
          { name: "B_TRIG", from: { refDes: "R6", pin: "2" }, to: [{ refDes: "U1", pin: "TR_B" }] },
          { name: "B_TO_C", from: { refDes: "U1", pin: "OUT_B" }, to: [{ refDes: "R7", pin: "1" }] },
          { name: "C_TRIG", from: { refDes: "R7", pin: "2" }, to: [{ refDes: "U1", pin: "TR_C" }] },
          { name: "C_TO_D", from: { refDes: "U1", pin: "OUT_C" }, to: [{ refDes: "R8", pin: "1" }] },
          { name: "D_TRIG", from: { refDes: "R8", pin: "2" }, to: [{ refDes: "U1", pin: "TR_D" }] },
          { name: "OUT_D", from: { refDes: "U1", pin: "OUT_D" }, to: [{ refDes: "R5", pin: "1" }] },
        ],
        designRules: [
          "Outputs A,B,C,D go HIGH then LOW sequentially",
          "Each stage delay t = 1.1 × R × C",
          "R1-R4 and C1-C4 independently set each stage duration",
          "Coupling resistors (R6-R9) should be 1.5K to 4.7K",
          "R5 controls rate of final stage reset",
          "Trigger input: momentary LOW pulse starts sequence",
          "CONTROL and RESET pins are common to all four timers",
          "Vcc = +4.5 to +18V",
          "Can loop by connecting OUT_D back to TR_A through coupling network",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.102. For REC: sequential activation of pinball playfield elements (pop bumpers, slingshots in timed sequence), staged power-up sequences for grill controller subsystems, wash cycle sequencing.",
  },

  {
    id: "558-long-duration-timer",
    name: "558 Quad Timer Long Duration Timer (4-Stage Cascade)",
    description: "All four 558 timer sections cascaded in series for extremely long time delays. Each stage's output triggers the next. Total delay = sum of all four stage delays. LED turns off after delay, then turns on again.",
    category: "timer",
    blocks: [
      {
        id: "558-long-timer-block",
        name: "558 4-Stage Cascade Timer",
        type: "timer",
        components: [
          { refDes: "U1", value: "558", description: "Quad timer IC" },
          { refDes: "R1", value: "variable", description: "Stage 1 timing resistor" },
          { refDes: "R2", value: "variable", description: "Stage 2 timing resistor" },
          { refDes: "R3", value: "variable", description: "Stage 3 timing resistor" },
          { refDes: "R4", value: "variable", description: "Stage 4 timing resistor" },
          { refDes: "R5", value: "1K", description: "LED series resistor" },
          { refDes: "R6-R7", value: "4.7K", description: "Inter-stage coupling resistors" },
          { refDes: "C1-C4", value: "variable", description: "Stage timing capacitors (4×)" },
          { refDes: "LED1", description: "Timer status indicator LED" },
          { refDes: "SW1", description: "Push-to-start momentary switch" },
        ],
        nets: [
          { name: "START", from: { refDes: "SW1", pin: "1" }, to: [{ refDes: "U1", pin: "TR_A" }] },
          { name: "STAGE_1_OUT", from: { refDes: "U1", pin: "OUT_A" }, to: [{ refDes: "U1", pin: "TR_B" }] },
          { name: "STAGE_2_OUT", from: { refDes: "U1", pin: "OUT_B" }, to: [{ refDes: "U1", pin: "TR_C" }] },
          { name: "STAGE_3_OUT", from: { refDes: "U1", pin: "OUT_C" }, to: [{ refDes: "U1", pin: "TR_D" }] },
          { name: "FINAL_OUT", from: { refDes: "U1", pin: "OUT_D" }, to: [{ refDes: "R5", pin: "1" }] },
        ],
        designRules: [
          "Total delay = sum of all 4 stages: t_total = 1.1×(R1C1 + R2C2 + R3C3 + R4C4)",
          "Maximum practical per stage: R=10M, C=100uF → ~1100 seconds (~18 min)",
          "Maximum total: ~72 minutes with all 4 stages maxed",
          "LED turns OFF during timing, ON when delay complete (inverts at output)",
          "Push-to-start initiates first stage",
          "RESET pin (common) LOW cancels all timing",
          "For longer times: use CMOS version or cascade multiple 558s",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.103. For REC: long cook timers for grill controllers, extended soak/rest periods in oven profiles, pinball timed modes (hurry-up countdown).",
  },

  {
    id: "7555-light-probe-blind",
    name: "7555 Light Probe for the Blind (Audio Light Meter)",
    description: "CMOS 7555 timer configured as VCO with CdS photocell controlling frequency. Brighter light = higher pitched tone from speaker. Very low power consumption allows battery operation.",
    category: "sensor",
    blocks: [
      {
        id: "7555-light-probe-block",
        name: "7555 Light-to-Audio Converter",
        type: "sensor-interface",
        components: [
          { refDes: "U1", value: "7555", description: "CMOS 555 timer (low power)" },
          { refDes: "PC1", value: "CdS", description: "CdS photocell (Radio Shack 276-116)" },
          { refDes: "R1", value: "22K", description: "Frequency range resistor" },
          { refDes: "R2", value: "1K", description: "Volume control pot" },
          { refDes: "C1", value: "0.01uF", description: "Timing capacitor" },
          { refDes: "C2", value: "4.7uF", description: "Output coupling capacitor" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "LIGHT_SENSE", from: { refDes: "PC1", pin: "1" }, to: [{ refDes: "U1", pin: "THRESH" }, { refDes: "U1", pin: "TRIGGER" }] },
          { name: "TIMING", from: { refDes: "U1", pin: "DISCHARGE" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "AUDIO_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SPEAKER", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C2", pin: "1" }] },
        ],
        designRules: [
          "7555 draws only ~60uA quiescent — ideal for battery operation",
          "CdS cell resistance: ~1K in bright light, ~1M in darkness",
          "Frequency range: ~100Hz (dark) to ~10kHz (bright light)",
          "Supply: 2-18V (7555 wider range than bipolar 555)",
          "CAUTION: apply power to 7555 BEFORE connecting external circuit",
          "R2 pot controls volume, not frequency",
          "For more sensitivity: increase R1 or C1",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.104. For REC: audio feedback for light-level sensing in ovens/grills (door-open detection), diagnostic tool for testing phototransistor circuits. 7555 CMOS version much better than bipolar 555 for battery-powered applications.",
  },

  {
    id: "555-ultra-long-delay-4017",
    name: "555 Ultra-Long Time Delay with Cascaded 4017s",
    description: "555 timer generates slow clock (adjustable period), feeding cascaded 4017 decade counters. First 4017 divides by 10, second 4017 divides by 10 again. Total division up to ÷100, enabling extremely long delays from relatively fast clock.",
    category: "timer",
    blocks: [
      {
        id: "555-4017-delay-block",
        name: "555 + Cascaded 4017 Ultra-Long Timer",
        type: "timer",
        components: [
          { refDes: "U1", value: "NE555", description: "Clock oscillator" },
          { refDes: "U2", value: "CD4017", description: "First decade counter (÷10)" },
          { refDes: "U3", value: "CD4017", description: "Second decade counter (÷10)" },
          { refDes: "R1", value: "1M", description: "555 timing resistor (adjustable)" },
          { refDes: "R2", value: "10K", description: "555 discharge resistor" },
          { refDes: "C1", value: "100uF", description: "555 timing capacitor" },
          { refDes: "C2", value: "0.01uF", description: "555 control voltage bypass" },
        ],
        nets: [
          { name: "CLOCK", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "U2", pin: "CLK" }] },
          { name: "CARRY_1", from: { refDes: "U2", pin: "CO" }, to: [{ refDes: "U3", pin: "CLK" }] },
          { name: "FINAL_OUT", from: { refDes: "U3", pin: "Q5" }, to: [] },
        ],
        designRules: [
          "555 period ≈ 0.693 × (R1 + 2×R2) × C1",
          "With R1=1M, R2=10K, C1=100uF: period ≈ 70 seconds per tick",
          "First 4017 ÷10: 700 seconds (~12 min) between carry pulses",
          "Second 4017 ÷10: output at any Q pin = 7000 seconds (~2 hours)",
          "Use Q5 of second 4017 for ~5 hour delay (5 × 700s × 10)",
          "RESET both 4017s with momentary HIGH pulse to restart",
          "4017 carry output (pin 12) goes HIGH for one clock period at count 0",
          "Can cascade additional 4017s for even longer delays",
          "For precise timing: replace 555 with crystal-based MM5369 timebase",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.98. For REC: very long cook timers for slow-cooking grills (brisket 8-12 hours), extended process timers for oven curing cycles. Much cheaper than microcontroller for simple long-delay applications.",
  },

  {
    id: "lm324-bandpass-filter",
    name: "LM324 Active Bandpass Filter",
    description: "Single op-amp section of LM324 configured as active bandpass filter. Single-supply operation. Center frequency set by RC values, bandwidth adjustable via feedback resistor ratio.",
    category: "filter",
    blocks: [
      {
        id: "lm324-bandpass-block",
        name: "LM324 Bandpass Filter",
        type: "active-filter",
        components: [
          { refDes: "U1", value: "LM324", description: "Quad op-amp (1/4 used)" },
          { refDes: "R1", value: "10K", description: "Input resistor" },
          { refDes: "R2", value: "100K", description: "Feedback resistor (sets Q/bandwidth)" },
          { refDes: "R3", value: "10K", description: "Bias resistor to Vcc/2" },
          { refDes: "R4", value: "10K", description: "Bias resistor to ground" },
          { refDes: "C1", value: "0.01uF", description: "Input coupling / frequency-setting capacitor" },
          { refDes: "C2", value: "0.01uF", description: "Feedback / frequency-setting capacitor" },
        ],
        nets: [
          { name: "INPUT", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "INV_INPUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "IN-" }, { refDes: "C1", pin: "2" }] },
          { name: "FEEDBACK", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "BIAS", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "U1", pin: "IN+" }, { refDes: "R4", pin: "1" }] },
        ],
        designRules: [
          "Center frequency f₀ = 1 / (2π × √(R1×R2×C1×C2))",
          "Q (selectivity) ≈ √(R2/R1) / 2",
          "Higher R2/R1 ratio = narrower bandwidth (higher Q)",
          "LM324 single supply: bias non-inverting input to Vcc/2",
          "Supply: +5 to +32V single supply (LM324 advantage)",
          "Gain at center frequency ≈ R2/(2×R1)",
          "For 1kHz center: R1=10K, R2=100K, C1=C2=0.01uF",
          "LM324 output swings to within ~20mV of ground — true single-supply",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.84. For REC: signal conditioning for sensor inputs (filter out 60Hz noise on thermocouples), audio frequency selection for tone-based communication, IR receiver bandpass filtering.",
  },

  {
    id: "lm3916-vu-meter",
    name: "LM3916 VU Meter / Back-and-Forth Display",
    description: "LM3916 logarithmic LED display driver configured as audio VU meter. 10-LED bar or dot display with logarithmic response matching human hearing. Also configurable as back-and-forth scanning display.",
    category: "display",
    blocks: [
      {
        id: "lm3916-vu-block",
        name: "LM3916 VU Meter",
        type: "display-driver",
        components: [
          { refDes: "U1", value: "LM3916", description: "Dot/bar display driver (log VU scale)" },
          { refDes: "LED1-LED10", description: "Bar graph LEDs (10×)" },
          { refDes: "R1", value: "1.2K", description: "Reference current set / LED brightness" },
          { refDes: "R2", value: "10K", description: "Input voltage divider (sensitivity adjust)" },
          { refDes: "C1", value: "2.2uF", description: "Input coupling capacitor" },
          { refDes: "C2", value: "0.1uF", description: "Reference pin bypass" },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "INPUT", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "U1", pin: "SIG" }] },
          { name: "REF_OUT", from: { refDes: "U1", pin: "REF_OUT" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "REF_ADJ", from: { refDes: "U1", pin: "REF_ADJ" }, to: [{ refDes: "R1", pin: "2" }] },
        ],
        designRules: [
          "LM3916 has built-in log taper: 3dB per step (30dB total range)",
          "Pin 9: MODE — HIGH=bar, FLOAT=dot display",
          "LED current set by R1: I_LED ≈ 12.5V/R1 (for 10mA: R1=1.2K)",
          "Input range: 0 to 1.25V full scale (use R2 divider for higher signals)",
          "For audio: AC couple input through C1",
          "For VU meter accuracy: add peak detector (diode + RC) before input",
          "Supply: 3-25V",
          "LM3916 (log/VU) vs LM3915 (log/dB) vs LM3914 (linear) — same pinout",
          "For back-and-forth: drive input with triangle wave from oscillator",
          "Can cascade multiple LM3916s for 20+ LED displays",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.94. For REC: audio level display for pinball sound systems, back-and-forth attract mode for pinball playfield, temperature bar display on grill controllers (use LM3914 linear for temperature).",
  },

  {
    id: "565-pfm-ir-communicator",
    name: "565 PLL PFM Infrared Communicator",
    description: "Voice communicator using pulse-frequency modulation over infrared. Transmitter: 741 op-amp mic preamp drives 555 VCO which modulates IR LED carrier frequency. Receiver: phototransistor feeds 741 preamp into 565 PLL which demodulates the PFM signal, output through 386 speaker amp.",
    category: "communication",
    blocks: [
      {
        id: "565-pfm-tx-block",
        name: "PFM IR Transmitter",
        type: "ir-transmitter",
        components: [
          { refDes: "U1", value: "LM741", description: "Mic preamp op-amp" },
          { refDes: "U2", value: "NE555", description: "VCO — frequency modulated by audio" },
          { refDes: "MIC1", description: "Electret microphone (270-092)" },
          { refDes: "LED1", description: "Infrared LED (276-143)" },
          { refDes: "R1", value: "5.6K", description: "Mic bias resistor" },
          { refDes: "R2", value: "5.6K", description: "Op-amp feedback resistor" },
          { refDes: "R3", value: "100K", description: "Gain control pot" },
          { refDes: "R4", value: "100K", description: "VCO frequency adjust (carrier ~40kHz)" },
          { refDes: "R5", value: "10K", description: "555 discharge resistor" },
          { refDes: "C1", value: "470pF", description: "555 timing capacitor" },
          { refDes: "C2", value: "470pF", description: "Speed-up capacitor" },
          { refDes: "C3", value: "10uF", description: "Audio coupling capacitor" },
        ],
        nets: [
          { name: "MIC_OUT", from: { refDes: "MIC1", pin: "OUT" }, to: [{ refDes: "U1", pin: "IN+" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "C3", pin: "1" }] },
          { name: "VCO_CV", from: { refDes: "C3", pin: "2" }, to: [{ refDes: "U2", pin: "CV" }] },
          { name: "IR_DRIVE", from: { refDes: "U2", pin: "OUT" }, to: [{ refDes: "LED1", pin: "A" }] },
        ],
        designRules: [
          "Carrier frequency ~40kHz (set by R4+R5 and C1)",
          "Audio modulates carrier via 555 control voltage pin",
          "R3 controls transmitter gain — start at 100K, reduce for more",
          "Point IR LED at receiver — range: hundreds of feet at night with lenses",
          "For initial testing: remove mic, connect radio phone output to R3 via 4.7uF cap",
        ],
      },
      {
        id: "565-pfm-rx-block",
        name: "PFM IR Receiver (565 PLL Demodulator)",
        type: "ir-receiver",
        components: [
          { refDes: "U3", value: "LM741", description: "Phototransistor preamp" },
          { refDes: "U4", value: "NE565", description: "Phase-locked loop — PFM demodulator" },
          { refDes: "U5", value: "LM386", description: "Audio power amplifier" },
          { refDes: "Q1", description: "Phototransistor (276-130)" },
          { refDes: "R6", value: "220K", description: "Phototransistor load resistor" },
          { refDes: "R7", value: "1K", description: "Preamp feedback" },
          { refDes: "R8", value: "1M", description: "Preamp gain" },
          { refDes: "R9", value: "3.9K", description: "565 VCO timing resistor" },
          { refDes: "R10", value: "10K", description: "Demodulated output filter" },
          { refDes: "C4", value: "0.001uF", description: "565 VCO timing capacitor" },
          { refDes: "C5", value: "0.047uF", description: "Low-pass filter capacitor" },
          { refDes: "C6", value: "10uF", description: "565 filter capacitor" },
          { refDes: "C7", value: "100uF", description: "386 output coupling" },
          { refDes: "C8", value: "2.2uF", description: "386 bypass" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "PHOTO_IN", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R6", pin: "1" }, { refDes: "U3", pin: "IN+" }] },
          { name: "PREAMP_OUT", from: { refDes: "U3", pin: "OUT" }, to: [{ refDes: "U4", pin: "IN" }] },
          { name: "PLL_DEMOD", from: { refDes: "U4", pin: "DEMOD_OUT" }, to: [{ refDes: "R10", pin: "1" }] },
          { name: "AUDIO_OUT", from: { refDes: "C5", pin: "2" }, to: [{ refDes: "U5", pin: "IN+" }] },
          { name: "SPEAKER", from: { refDes: "U5", pin: "OUT" }, to: [{ refDes: "C7", pin: "1" }] },
        ],
        designRules: [
          "565 VCO center frequency = 0.3/(R9×C4) ≈ 40.6kHz",
          "Must match transmitter carrier frequency (±5%)",
          "565 lock range: ±6% of center frequency typical",
          "R10+C5 low-pass filter removes carrier, passes audio",
          "Shield phototransistor Q1 with opaque tube to block ambient light",
          "Use low gain (R10) when adjusting transmitter to prevent feedback",
          "Keep power leads short on both units, bypass with 0.1uF at chips",
          "Lenses on both TX and RX dramatically increase range",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.105. For REC: wireless IR communication between grill controller zones (no RF interference near food/metal), secure point-to-point data link for pinball score reporting. 565 PLL demodulation much more robust than simple envelope detection.",
  },

  {
    id: "lm334-voltage-reference",
    name: "LM334 Precision Voltage Reference",
    description: "LM334 adjustable current source configured as precision voltage reference. Diode-filtered current through precision resistor network produces stable 0.8-5V reference output.",
    category: "voltage-regulator",
    blocks: [
      {
        id: "lm334-vref-block",
        name: "LM334 Voltage Reference",
        type: "voltage-reference",
        components: [
          { refDes: "U1", value: "LM334", description: "3-terminal adjustable current source" },
          { refDes: "D1", value: "1N914", description: "Temperature compensation diode" },
          { refDes: "R1", value: "1K-3.3K", description: "Output voltage adjust (lower R = higher V)" },
          { refDes: "R2", value: "10K", description: "Load resistor" },
          { refDes: "C1", value: "0.001uF", description: "Noise filter capacitor" },
        ],
        nets: [
          { name: "V_PLUS", from: { refDes: "U1", pin: "V+" }, to: [{ refDes: "D1", pin: "K" }] },
          { name: "ISET", from: { refDes: "U1", pin: "R" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "REF_OUT", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "V-" }, { refDes: "R2", pin: "1" }] },
        ],
        designRules: [
          "LM334 Rset = 0.0677V / Iset at 25°C",
          "Output voltage = Iset × R2 (adjustable with R1/R2)",
          "Output range: 0.8V to ~5V practical",
          "Must have at least 1V across LM334 (V+ to V-) for regulation",
          "1N914 diode compensates for temperature coefficient",
          "Without diode: ~+0.33%/°C temperature drift",
          "With diode: drift reduced to ~0.02%/°C",
          "Maximum output current: 10mA",
          "Input voltage range: +2.5V to +20V",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.116. For REC: precision reference voltage for ADC calibration on grill controllers, stable reference for comparator-based temperature thresholds.",
  },

  {
    id: "lm334-ramp-generator",
    name: "LM334 Ramp Generator",
    description: "LM334 constant current source charges capacitor through precision current to generate linear ramp waveform. Input pulse gates the charging. Very linear ramp compared to RC charging curve.",
    category: "oscillator",
    blocks: [
      {
        id: "lm334-ramp-block",
        name: "LM334 Linear Ramp Generator",
        type: "current-source",
        components: [
          { refDes: "U1", value: "LM334", description: "Constant current source" },
          { refDes: "R1", value: "68K", description: "Current set resistor: I = 0.0677/R1 ≈ 1uA" },
          { refDes: "C1", value: "0.001uF", description: "Ramp capacitor" },
          { refDes: "R2", value: "1K", description: "Input coupling resistor" },
          { refDes: "D1", value: "RS2009", description: "Reset Schottky diode" },
        ],
        nets: [
          { name: "V_PLUS", from: { refDes: "U1", pin: "V+" }, to: [] },
          { name: "CURRENT_SET", from: { refDes: "U1", pin: "R" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "RAMP_OUT", from: { refDes: "U1", pin: "V-" }, to: [{ refDes: "R1", pin: "2" }, { refDes: "C1", pin: "1" }] },
          { name: "RESET_IN", from: { refDes: "R2", pin: "1" }, to: [] },
        ],
        designRules: [
          "Ramp rate: dV/dt = I/C = (0.0677/R1)/C1 V/s",
          "With R1=68K, C1=0.001uF: ~1V/ms ramp rate",
          "Input pulse (1kHz square wave) resets ramp via Schottky diode",
          "Ramp linearity: excellent — constant current makes V=It (not exponential RC curve)",
          "Top flattens if input pulse rate too slow (capacitor charges to supply rail)",
          "For slower ramp: increase C1 or R1",
          "For faster ramp: decrease C1 or R1",
          "Supply: +3 to +20V",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.116. For REC: linear sweep generator for testing analog circuits, sawtooth waveform for PWM generation, calibration ramp for ADC testing on grill controllers.",
  },

  {
    id: "lm386-bass-booster",
    name: "LM386 Bass Booster Amplifier",
    description: "LM386 audio power amplifier with frequency-selective feedback network that boosts bass frequencies. Gain rises at low frequencies: 25dB at 100Hz vs 19dB at 2kHz. Simple mod to standard 386 circuit.",
    category: "audio",
    blocks: [
      {
        id: "lm386-bass-block",
        name: "LM386 Bass Boost",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", value: "LM386", description: "Low-voltage audio power amplifier" },
          { refDes: "R1", value: "10K", description: "Input level pot" },
          { refDes: "R2", value: "10K", description: "Bass boost feedback resistor" },
          { refDes: "C1", value: "220uF", description: "Output coupling capacitor" },
          { refDes: "C2", value: "0.033uF", description: "Bass boost capacitor (sets boost frequency)" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "U1", pin: "IN+" }] },
          { name: "BASS_FB", from: { refDes: "U1", pin: "BYPASS" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "BASS_GND", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "OUTPUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "C1", pin: "1" }] },
        ],
        designRules: [
          "R2+C2 across pin 1 and 8 creates frequency-dependent gain",
          "Bass boost corner frequency = 1/(2π×R2×C2)",
          "With R2=10K, C2=0.033uF: corner ≈ 480Hz",
          "Gain at 100Hz: ~25dB; gain at 2kHz: ~19dB (6dB boost)",
          "For more bass: increase C2 (0.047-0.1uF)",
          "For less bass: decrease C2 (0.01-0.022uF)",
          "Supply: +4 to +12V",
          "Maximum power: ~1W at 12V into 8Ω",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.117. For REC: improved bass response for pinball machine speaker systems (deeper impact sounds), enhanced audio feedback on grill alert tones.",
  },

  {
    id: "lm386-audible-alarm",
    name: "LM386 Audible Alarm (Self-Oscillating)",
    description: "LM386 configured as self-oscillating alarm tone generator. Positive feedback from output to input creates ~2.1kHz alarm tone. No external oscillator needed. Very loud with minimal components.",
    category: "alarm",
    blocks: [
      {
        id: "lm386-alarm-block",
        name: "LM386 Self-Oscillating Alarm",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", value: "LM386", description: "Audio amplifier (self-oscillating mode)" },
          { refDes: "R1", value: "1K", description: "Input feedback resistor" },
          { refDes: "R2", value: "10K", description: "Frequency adjust resistor" },
          { refDes: "R3", value: "10K", description: "Feedback bias" },
          { refDes: "C1", value: "0.22uF", description: "Oscillation frequency-setting capacitor" },
          { refDes: "C2", value: "22uF", description: "Output coupling capacitor" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "FEEDBACK", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "FB_TO_INPUT", from: { refDes: "R2", pin: "2" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "INPUT", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "U1", pin: "IN+" }] },
          { name: "SPEAKER", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "SPKR", pin: "1" }] },
        ],
        designRules: [
          "Tone frequency ≈ 2.1kHz (set by C1 and R2)",
          "Reduce C1 to increase frequency (more piercing)",
          "CAUTION: output is VERY LOUD — add series resistor to reduce if needed",
          "Supply: +4 to +12V",
          "Total parts count: 6 + speaker",
          "Enable/disable by switching supply or grounding input",
          "For warble: modulate supply or add second RC feedback path",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.117. For REC: minimal-parts alarm for grill over-temperature, door-open alert. Also useful for pinball tilt alarm. Fewer components than 555-based alarm.",
  },

  {
    id: "lm383-16w-bridge-amp",
    name: "LM383 16-Watt Bridge Amplifier",
    description: "Two LM383 power amplifiers in bridge-tied-load (BTL) configuration for 16 watts into 4Ω speaker. One amplifier inverts the other's input. Speaker connected between the two outputs (no ground reference). Doubles available power from single supply.",
    category: "audio",
    blocks: [
      {
        id: "lm383-bridge-block",
        name: "LM383 BTL Bridge Amplifier",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", value: "LM383", description: "8-watt power amplifier (non-inverting channel)" },
          { refDes: "U2", value: "LM383", description: "8-watt power amplifier (inverting channel)" },
          { refDes: "R1", value: "220", description: "Input gain resistor" },
          { refDes: "R2", value: "2.2", description: "U1 feedback resistor" },
          { refDes: "R3", value: "220", description: "U2 input gain resistor" },
          { refDes: "R4", value: "220", description: "U2 inverting feedback" },
          { refDes: "R5", value: "2.2", description: "U2 ground feedback" },
          { refDes: "R6", value: "1M", description: "U2 DC offset adjust" },
          { refDes: "R7", value: "100K", description: "U2 offset trim" },
          { refDes: "C1", value: "10uF", description: "Input coupling" },
          { refDes: "C2", value: "0.2uF", description: "U1 supply bypass" },
          { refDes: "C3", value: "470uF", description: "U1 power bypass" },
          { refDes: "C4", value: "0.2uF", description: "U2 supply bypass" },
          { refDes: "C5", value: "0.2uF", description: "U2 compensation" },
          { refDes: "C6", value: "470uF", description: "U2 power bypass" },
          { refDes: "C7", value: "10uF", description: "DC blocking between stages" },
          { refDes: "C8", value: "0.2uF", description: "U1 compensation" },
          { refDes: "SPKR", value: "4Ω", description: "Speaker (1-4Ω or 2×8Ω parallel)" },
        ],
        nets: [
          { name: "AUDIO_IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "U1_INPUT", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "IN+" }] },
          { name: "U1_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "SPKR", pin: "1" }, { refDes: "R2", pin: "1" }, { refDes: "C7", pin: "1" }] },
          { name: "U2_INPUT", from: { refDes: "C7", pin: "2" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "U2_INV", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "U2", pin: "IN-" }, { refDes: "R4", pin: "1" }] },
          { name: "U2_OUT", from: { refDes: "U2", pin: "OUT" }, to: [{ refDes: "SPKR", pin: "2" }, { refDes: "R4", pin: "2" }, { refDes: "R5", pin: "1" }] },
        ],
        designRules: [
          "Bridge mode: speaker between U1 OUT and U2 OUT (floating, no ground)",
          "Power = 4× single amplifier: 16W from +12-14V supply",
          "Speaker impedance: 1-4Ω (or two 8Ω speakers in parallel)",
          "R2 feedback sets U1 gain, R4/R5 set U2 gain — match for balanced drive",
          "MUST use heatsink on both LM383s (TO-220 package)",
          "Thermal shutdown protects against overload but causes distortion",
          "C2,C4 (0.2uF) must be physically close to IC supply pins",
          "Offset trim (R7): adjust for zero DC across speaker at idle",
          "Supply: +12-14V at 2A minimum for full power",
          "R2 can use 4-10Ω resistors in parallel for better power handling",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.118. For REC: high-power audio for pinball machines (backbox speakers, subwoofer channel). 16W is enough for loud game room environments. Single +12V supply works with existing pinball power supplies.",
  },

  {
    id: "lm1877-stereo-pa-system",
    name: "LM1877/LM377 Public Address System",
    description: "741 op-amp mic preamp feeding LM377/LM1877 dual power amplifier. Dynamic microphone input with volume control. Split ±12V supply eliminates large coupling capacitors. Fewer parts than typical PA due to dual-supply operation.",
    category: "audio",
    blocks: [
      {
        id: "lm1877-pa-block",
        name: "741 Preamp + LM377 Power Amp PA",
        type: "audio-amplifier",
        components: [
          { refDes: "U1", value: "LM741C", description: "Microphone preamplifier" },
          { refDes: "U2", value: "LM1877", description: "Dual 2-watt power amplifier (one channel used)" },
          { refDes: "MIC1", description: "Dynamic microphone (200-600Ω impedance)" },
          { refDes: "R1", value: "10K", description: "Mic input resistor" },
          { refDes: "R2", value: "100K", description: "Preamp gain (adjustable — volume)" },
          { refDes: "R3", value: "10K", description: "Preamp feedback" },
          { refDes: "R4", value: "1.8K", description: "Power amp input resistor" },
          { refDes: "R5", value: "100K", description: "Power amp feedback" },
          { refDes: "C1", value: "220uF", description: "Input coupling" },
          { refDes: "C2", value: "4.7uF", description: "Inter-stage coupling" },
          { refDes: "C3", value: "0.1uF", description: "Power amp input coupling" },
          { refDes: "C4", value: "470uF", description: "Power supply bypass" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "MIC_IN", from: { refDes: "MIC1", pin: "OUT" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "PREAMP_IN", from: { refDes: "R1", pin: "2" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "741_IN", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "U1", pin: "IN-" }] },
          { name: "PREAMP_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "R2", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "POWER_IN", from: { refDes: "C2", pin: "2" }, to: [{ refDes: "R4", pin: "1" }] },
          { name: "AMP_IN", from: { refDes: "R4", pin: "2" }, to: [{ refDes: "U2", pin: "IN+" }] },
          { name: "AMP_OUT", from: { refDes: "U2", pin: "OUT" }, to: [{ refDes: "R5", pin: "1" }, { refDes: "SPKR", pin: "1" }] },
        ],
        designRules: [
          "Supply: ±10 to ±26V (dual supply — note fewer coupling caps needed)",
          "LM1877 pins 3,4,5,10,11,12 ALL connect to ground (heatsink)",
          "70dB channel separation on LM1877 — virtually no crosstalk",
          "Second channel available for stereo or monitor speaker",
          "Preamp gain = R3/R1 × (1 + R2/R3) — adjust R2 pot for volume",
          "For low-impedance mic (200-600Ω): use as shown",
          "LM377 = LM1877 with different package (14-pin DIP)",
          "Maximum output: ~2W per channel at ±12V",
          "Use 220uF+ on power supply rails close to LM1877",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.119. For REC: announcer/PA system for pinball tournaments, paging system for commercial kitchen/grill area. Dual supply from existing ±12V rails simplifies design.",
  },

  {
    id: "sn76488n-steam-engine-whistle",
    name: "SN76488N Improved Steam Engine and Whistle",
    description: "SN76488N complex sound generator configured for steam engine chuffing sounds with whistle on demand. 741 op-amp provides additional whistle tone mixed into SN76488N audio input. Pushbutton triggers whistle overlay.",
    category: "sound-effects",
    blocks: [
      {
        id: "sn76488n-steam-block",
        name: "SN76488N Steam Engine + Whistle",
        type: "sound-generator",
        components: [
          { refDes: "U1", value: "SN76488N", description: "Complex sound generator with built-in amplifier" },
          { refDes: "U2", value: "LM741", description: "Whistle tone oscillator" },
          { refDes: "R1", value: "1K", description: "Noise filter resistor" },
          { refDes: "R2", value: "500K", description: "Engine speed control (VCO frequency)" },
          { refDes: "R3", value: "470K", description: "SLF frequency" },
          { refDes: "R4", value: "100K", description: "Mixer/whistle frequency" },
          { refDes: "R5", value: "1K", description: "741 feedback" },
          { refDes: "R6", value: "4.7K", description: "741 supply decoupling" },
          { refDes: "C1", value: "470pF", description: "Noise filter capacitor" },
          { refDes: "C2", value: "1uF", description: "SLF capacitor" },
          { refDes: "C3", value: "470pF", description: "VCO capacitor" },
          { refDes: "C4", value: "100uF", description: "Output coupling capacitor" },
          { refDes: "C5", value: "variable", description: "Whistle tone cap (0.0047=raspy, 0.01=pure)" },
          { refDes: "SW1", description: "Whistle pushbutton (momentary)" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "NOISE_FILT", from: { refDes: "U1", pin: "5" }, to: [{ refDes: "R1", pin: "1" }, { refDes: "C1", pin: "1" }] },
          { name: "VCO_FREQ", from: { refDes: "U1", pin: "17" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "SLF", from: { refDes: "U1", pin: "18" }, to: [{ refDes: "R3", pin: "1" }, { refDes: "C2", pin: "1" }] },
          { name: "AUDIO_IN", from: { refDes: "U1", pin: "10" }, to: [{ refDes: "U2", pin: "OUT" }] },
          { name: "WHISTLE_SW", from: { refDes: "SW1", pin: "1" }, to: [{ refDes: "U2", pin: "IN+" }] },
          { name: "SPKR_OUT", from: { refDes: "U1", pin: "13" }, to: [{ refDes: "C4", pin: "1" }] },
        ],
        designRules: [
          "R2 controls engine speed (chuff rate) — connect to pot for variable speed",
          "R4 controls whistle frequency — adjust for desired pitch",
          "C5 sets whistle tone character: 0.0047uF=raspy, 0.01uF=pure tone",
          "SN76488N includes built-in speaker amplifier — direct drive",
          "741 whistle oscillator feeds into SN76488N audio input (pin 10)",
          "Press SW1 for whistle overlay on engine sound",
          "Supply: +6 to +9V",
          "SN76488N and SN76477N have DIFFERENT pinouts — do not interchange",
          "For steam train + propeller aircraft sounds: add 1M pot from pin 20 to GND and 1uF from pin 21 to GND",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.123. For REC: model railroad sound effects for pinball machines (train/whistle themes), novelty sound effects. SN76488N built-in amplifier saves external amp IC.",
  },

  {
    id: "sn76488n-ultimate-siren",
    name: "SN76488N Ultimate Siren",
    description: "SN76488N configured for realistic siren sound using SLF (super low frequency) oscillator to sweep VCO up and down. Minimal external components. R1 controls cycle rate (siren sweep speed), R2 controls base frequency.",
    category: "sound-effects",
    blocks: [
      {
        id: "sn76488n-siren-block",
        name: "SN76488N Siren Generator",
        type: "sound-generator",
        components: [
          { refDes: "U1", value: "SN76488N", description: "Complex sound generator with built-in amplifier" },
          { refDes: "R1", value: "500K", description: "Cycle rate control (SLF frequency)" },
          { refDes: "R2", value: "100K", description: "Base frequency control (VCO)" },
          { refDes: "R3", value: "10K", description: "Volume control pot (optional)" },
          { refDes: "C1", value: "47uF", description: "SLF capacitor (sets sweep speed)" },
          { refDes: "C2", value: "0.01uF", description: "VCO capacitor" },
          { refDes: "C3", value: "100uF", description: "Output coupling capacitor" },
          { refDes: "SPKR", value: "8Ω", description: "Speaker" },
        ],
        nets: [
          { name: "SLF_RC", from: { refDes: "U1", pin: "18" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "SLF_CAP", from: { refDes: "U1", pin: "19" }, to: [{ refDes: "C1", pin: "1" }] },
          { name: "VCO_RC", from: { refDes: "U1", pin: "17" }, to: [{ refDes: "R2", pin: "1" }] },
          { name: "VCO_CAP", from: { refDes: "U1", pin: "16" }, to: [{ refDes: "C2", pin: "1" }] },
          { name: "SPKR_OUT", from: { refDes: "U1", pin: "13" }, to: [{ refDes: "C3", pin: "1" }] },
        ],
        designRules: [
          "R1 controls siren sweep rate — high R = ultra slow siren",
          "R2 controls siren frequency range",
          "SLF sweeps VCO input: internal connection via VCO SELECT pin (20)",
          "Pin 20 to Vdd selects SLF-controlled VCO",
          "Supply: +6 to +9V",
          "For continuous siren: ground pin 9 (system enable)",
          "For push-to-activate: connect pin 9 through momentary switch to Vdd",
          "Built-in amplifier drives speaker directly",
          "Adjust R1 for slow (police) or fast (European) siren style",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.123. For REC: alarm/siren for pinball tilt warning, over-temperature alert for grills/ovens. Minimal component count — just IC + 2 resistors + 2 caps + speaker.",
  },

  {
    id: "moc5010-isolated-analog-link",
    name: "MOC5010 Isolated Analog Data Link",
    description: "MOC5010 linear optocoupler transfers analog signals across 1.5kV isolation barrier. 741 op-amp on transmit side converts voltage to LED current. Another 741 on receive side amplifies phototransistor output. Very sensitive — 0.0025V input gives full +8V output.",
    category: "optocoupler",
    blocks: [
      {
        id: "moc5010-analog-tx-block",
        name: "MOC5010 Analog Transmitter",
        type: "optocoupler",
        components: [
          { refDes: "U1", value: "LM741", description: "Voltage-to-current converter (transmit side)" },
          { refDes: "U2", value: "MOC5010", description: "Linear optocoupler (1.5kV isolation)" },
          { refDes: "Q1", value: "2N2222", description: "LED driver transistor" },
          { refDes: "R1", value: "1M", description: "Op-amp input resistor" },
          { refDes: "R2", value: "1K", description: "Bias adjust pot" },
          { refDes: "R3", value: "220", description: "LED current limiting" },
          { refDes: "R4", value: "10K", description: "Op-amp feedback" },
          { refDes: "C1", value: "0.1uF", description: "Input coupling" },
          { refDes: "C2", value: "0.1uF", description: "Supply bypass" },
        ],
        nets: [
          { name: "SIGNAL_IN", from: { refDes: "C1", pin: "1" }, to: [] },
          { name: "AMP_IN", from: { refDes: "C1", pin: "2" }, to: [{ refDes: "R1", pin: "1" }] },
          { name: "AMP_OUT", from: { refDes: "U1", pin: "OUT" }, to: [{ refDes: "Q1", pin: "B" }] },
          { name: "LED_DRIVE", from: { refDes: "Q1", pin: "C" }, to: [{ refDes: "R3", pin: "1" }] },
          { name: "OPTO_LED", from: { refDes: "R3", pin: "2" }, to: [{ refDes: "U2", pin: "A" }] },
        ],
        designRules: [
          "MOC5010 provides 1.5kV isolation between input and output",
          "Bias adjust (R2): set for optimum LED operating point",
          "Very sensitive: 0.0025V input → full +8V output",
          "Reduce R1 or R2 to reduce sensitivity if needed",
          "Supply: +9V (separate supplies for TX and RX sides)",
          "Keep TX and RX ground planes completely separate (that's the point of isolation)",
        ],
      },
      {
        id: "moc5010-analog-rx-block",
        name: "MOC5010 Analog Receiver",
        type: "optocoupler",
        components: [
          { refDes: "U3", value: "LM741", description: "Transimpedance amplifier (receive side)" },
          { refDes: "R5", value: "100K", description: "Feedback resistor (gain control)" },
          { refDes: "R6", value: "1K", description: "Collector load" },
          { refDes: "C3", value: "0.1uF", description: "Feedback bypass" },
        ],
        nets: [
          { name: "PHOTO_OUT", from: { refDes: "U2", pin: "OUT" }, to: [{ refDes: "R6", pin: "1" }, { refDes: "U3", pin: "IN-" }] },
          { name: "AMP_FB", from: { refDes: "U3", pin: "OUT" }, to: [{ refDes: "R5", pin: "1" }] },
          { name: "SIGNAL_OUT", from: { refDes: "U3", pin: "OUT" }, to: [] },
        ],
        designRules: [
          "R5 sets receive gain — increase for more sensitivity",
          "Bandwidth limited by optocoupler response (~50kHz typical)",
          "Output linearity depends on bias point — adjust R2 on TX side",
          "For audio: bandwidth is more than adequate (20Hz-20kHz)",
          "For data: suitable for low-speed analog telemetry",
        ],
      },
    ],
    notes: "From Mims Engineer's Notebook II p.128. For REC: isolated analog signal path for thermocouple/RTD sensors near AC heating elements in grills and ovens, ground-loop elimination between pinball playfield sensors and main controller. MOC5010 linear response critical — standard digital optocouplers (4N35) won't work for analog.",
  },
];
