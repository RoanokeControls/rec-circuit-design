// ── REC Standard Library Mappings ──
// Sourced from autodesk-coder MCP: library-data/rec-library.json
// Library: REC_Standard_Library v365.lbr (454 devicesets, 175 footprints, 112 symbols)
//
// REFERENCE: Use the autodesk-coder MCP tools to look up exact part details:
//   - search_api(query, type_filter: "library_part") — find parts by keyword
//   - get_ecad("Schematic Editor Commands") — Eagle SCR command reference
//
// ADD command format for SCR scripts:
//   USE 'REC_Standard_Library v365.lbr';
//   ADD 'DEVICESET_NAME' REFDES (X Y);
//
// For multi-variant devices (e.g. STM32 with -L/-M footprint variants):
//   ADD 'STM32F103C8T6-M' REFDES (X Y);

export const REC_LIBRARY_NAME = "REC_Standard_Library v365.lbr";

// ── Naming Conventions ──
// Resistors:  {VALUE}{UNIT}_{PACKAGE}[_{TOLERANCE}][_{POWER}]
//   Units: ^ = ohms, K = kilohms, M = megohms
//   Examples: 10K_0805, 100^_1206_1%_0.5W, 4.7K_0603
//
// Capacitors: {VALUE}{UNIT}_{PACKAGE}[_{TOLERANCE}][_{VOLTAGE}]
//   Units: PF, NF, UF
//   Examples: 0.1UF_0603_5%_50V, 10UF_1206_10%_25V, 22PF_0603
//
// Ferrites:   FERRITE_{IMPEDANCE}^_{PACKAGE}
//   Examples: FERRITE_120^_1206, FERRITE_330^_0805
//
// Jumpers:    JUMPER_{PACKAGE}[_{POWER_OR_CURRENT}]
//   Examples: JUMPER_0805_2.5A, JUMPER_1206_2A
//
// ICs/Modules: Manufacturer part number directly
//   Examples: ESP32-WROVER, STM32F103C8T6, TPS54286PWPR
//
// Connectors: Mix of part numbers and descriptive names
//   Examples: 440054-4, 3P_0.1"PITCH, JST_2MM_3P_RA

// ── IPC-7351 Footprint to Imperial Size Mapping ──
export const footprintSizeMap: Record<string, { imperial: string; resistor: string; capacitor: string }> = {
  "0402": { imperial: "0402", resistor: "RESC1005X40", capacitor: "" },
  "0603": { imperial: "0603", resistor: "RESC1608X60", capacitor: "CAPC1608X85" },
  "0805": { imperial: "0805", resistor: "RESC2012X65", capacitor: "CAPC2012X110" },
  "1206": { imperial: "1206", resistor: "RESC3216X70", capacitor: "CAPC3216X135" },
  "1210": { imperial: "1210", resistor: "RESC3225X70N", capacitor: "CAPC3225X135" },
  "2512": { imperial: "2512", resistor: "RESC6332X71", capacitor: "" },
};

// ── Supply Symbols ──
export const supplySymbols = [
  "+3.3V", "+5V_SUPPLY", "+12V", "+V", "GND",
  "AVDD", "DC_SWITCHED",
] as const;

// ── Prefix Reference ──
// R  = Resistors, ferrites, jumpers, varistors (242 parts)
// C  = Capacitors (91 parts)
// U  = ICs — regulators, drivers, op-amps, sensors (25 parts)
// V  = Supply symbols (14 parts)
// J  = Connectors (14 parts)
// D  = Diodes, LEDs, TVS, Schottky (13 parts)
// F  = Fuses, polyswitches (10 parts)
// Q  = Transistors, MOSFETs, TRIACs (7 parts)
// L  = Inductors (3 parts)
// JP = Pin headers (2 parts)
// BT = Battery holders (2 parts)
// VR = Voltage regulators — LM317, NCP1117 (2 parts)
// CR = STM32 microcontrollers (2 parts)
// X  = Crystal oscillator (1 part)
// A  = ESP32-WROVER module (1 part)

// ── Key Deviceset Quick Reference ──
// Use these exact names in ADD commands

export interface RecLibraryPart {
  deviceset: string;
  prefix: string;
  footprint: string;
  description: string;
  category: string;
  variants?: string[];
}

export const keyParts: RecLibraryPart[] = [
  // ── MCUs / Modules ──
  { deviceset: "ESP32-WROVER", prefix: "A", footprint: "XCVR_ESP32-WROVER-I", description: "ESP32-WROVER WiFi+BT module", category: "mcu", variants: ["", "ALT"] },
  { deviceset: "STM32F103C8T6", prefix: "CR", footprint: "LQFP-48_STM", description: "STM32F103 48-pin", category: "mcu", variants: ["", "-L", "-M"] },
  { deviceset: "STM32F103RCT6", prefix: "CR", footprint: "LQFP-64", description: "STM32F103 64-pin", category: "mcu", variants: ["", "-L", "-M"] },
  { deviceset: "MSP430G2755IRHA40R", prefix: "U", footprint: "RHA40_4P15X4P15", description: "MSP430 40-pin QFN", category: "mcu" },
  { deviceset: "ATTINY404", prefix: "", footprint: "SOIC127P600X175-14N", description: "ATtiny404 14-SOIC", category: "mcu" },

  // ── Voltage Regulators ──
  { deviceset: "NCP1117ST33T3G", prefix: "VR", footprint: "SOT230P700X170-4", description: "3.3V LDO 1A SOT-223", category: "regulator" },
  { deviceset: "SPX3819M5-L-3-3/TR", prefix: "U", footprint: "SOT-23-5", description: "3.3V LDO 500mA SOT-23-5", category: "regulator", variants: ["", "-L", "-M"] },
  { deviceset: "SPX3819M5-L-5-0/TR", prefix: "U", footprint: "SOT-23-5", description: "5.0V LDO 500mA SOT-23-5", category: "regulator", variants: ["", "-L", "-M"] },
  { deviceset: "LM317DCYR", prefix: "VR", footprint: "SOT-23-5", description: "Adjustable LDO SOT-23-5", category: "regulator", variants: ["", "-L", "-M"] },
  { deviceset: "LM317_DPAK", prefix: "VR", footprint: "D2PAK", description: "Adjustable LDO D2PAK", category: "regulator" },

  // ── Power ICs ──
  { deviceset: "TPS54286PWPR", prefix: "U", footprint: "PWP14_2P31X2P46_TEX", description: "Dual buck converter", category: "power", variants: ["", "-L", "-M"] },
  { deviceset: "MC33063ADR", prefix: "U", footprint: "SOIC8-N_MC_MCH", description: "Buck/boost/inverting converter", category: "power", variants: ["", "-L", "-M"] },
  { deviceset: "MAX1672EEE+", prefix: "U", footprint: "SOP50P490X120-10N", description: "Step-up DC-DC converter", category: "power" },
  { deviceset: "TPS22918DBVR", prefix: "U", footprint: "DBV6_TEX", description: "Load switch", category: "power", variants: ["", "-L", "-M"] },

  // ── Protection ──
  { deviceset: "PESD3V3L4UG,115", prefix: "D", footprint: "SOT95P270X145-6N", description: "4-line 3.3V ESD protection", category: "protection" },
  { deviceset: "SMCJ20CA", prefix: "D", footprint: "DIOM6859X262N", description: "20V TVS bidirectional", category: "protection" },

  // ── Common Passives (examples — full list is 333+ parts) ──
  { deviceset: "10K_0805", prefix: "R", footprint: "RESC2012X65", description: "10K 0805 resistor", category: "resistor" },
  { deviceset: "10K_0603", prefix: "R", footprint: "RESC1608X60", description: "10K 0603 resistor", category: "resistor" },
  { deviceset: "4.7K_0805", prefix: "R", footprint: "RESC2012X65", description: "4.7K 0805 resistor", category: "resistor" },
  { deviceset: "100^_1206_1%_0.5W", prefix: "R", footprint: "RESC3216X70", description: "100 ohm 1206 1% 0.5W", category: "resistor" },
  { deviceset: "0.1UF_0603_5%_50V", prefix: "C", footprint: "CAPC1608X85", description: "100nF 0603 ceramic", category: "capacitor" },
  { deviceset: "0.1UF_0805", prefix: "C", footprint: "CAPC2012X110", description: "100nF 0805 ceramic", category: "capacitor" },
  { deviceset: "10UF_0805", prefix: "C", footprint: "CAPC2012X110", description: "10uF 0805 ceramic", category: "capacitor" },
  { deviceset: "10UF_1206_10%_25V", prefix: "C", footprint: "CAPC3216X135", description: "10uF 1206 ceramic 25V", category: "capacitor" },
  { deviceset: "22PF_0603", prefix: "C", footprint: "CAPC1608X85", description: "22pF 0603 ceramic", category: "capacitor" },

  // ── Connectors ──
  { deviceset: "3P_0.1\"PITCH", prefix: "JP", footprint: "1X03", description: "3-pin header 0.1\" pitch", category: "connector" },
  { deviceset: "8P_0.1\"PITCH", prefix: "JP", footprint: "1X08", description: "8-pin header 0.1\" pitch", category: "connector" },
  { deviceset: "JST_2MM_3P_RA", prefix: "J", footprint: "JST_S3B-PH-SM4-TB_LF_SN_0", description: "JST PH 3-pin right angle", category: "connector" },
  { deviceset: "10104111-0001LF", prefix: "J", footprint: "FRAMATOME_10104111-0001LF", description: "Micro USB connector", category: "connector" },
  { deviceset: "ESP32_TAG", prefix: "", footprint: "TC2030-MCP-NL", description: "ESP32 Tag-Connect programming header", category: "connector" },
  { deviceset: "TC2030_ICSP", prefix: "J", footprint: "TC2030-MCP-NL-CP", description: "Tag-Connect 6-pin ICSP", category: "connector" },

  // ── Diodes / LEDs ──
  { deviceset: "1N5819HW-7-F", prefix: "D", footprint: "SOD2512X110N", description: "Schottky 40V 1A", category: "diode" },
  { deviceset: "LED_RED_0805", prefix: "D", footprint: "LEDC2012X110N_B", description: "Red LED 0805 SMD", category: "led" },

  // ── Transistors ──
  { deviceset: "MMBF170", prefix: "Q", footprint: "SOT23", description: "N-MOSFET SOT-23", category: "transistor" },

  // ── Fuses ──
  { deviceset: "0.75A_POLYSW", prefix: "F", footprint: "RESC1608X60", description: "750mA polyswitch 0603", category: "fuse" },

  // ── Crystal ──
  { deviceset: "ABS07-32.768KHZ-T", prefix: "X", footprint: "ABRACON_ABS07-32.768KHZ-T_0", description: "32.768kHz crystal", category: "crystal" },

  // ── Inductors ──
  { deviceset: "10UH_2.3A", prefix: "L", footprint: "IND_IHLP-2020CZ", description: "10uH 2.3A power inductor", category: "inductor", variants: ["", "-L", "-M"] },
  { deviceset: "22UH_1.9A", prefix: "L", footprint: "IND_IHLP-2020CZ", description: "22uH 1.9A power inductor", category: "inductor", variants: ["", "-L", "-M"] },
];

// ── Standard Fusion 360 Electronics Layer Definitions ──
// Use in all .lbr library files and board scripts.
// Matches Fusion 360 Electronics layer panel structure.
// Layer numbers are Eagle-compatible; Fusion renames them in the UI.

export interface EagleLayer {
  number: number;
  name: string;
  fusionName: string;
  group: string;
  color: number;
  fill: number;
  visible: boolean;
}

export const standardLayers: EagleLayer[] = [
  // ── Copper ──
  { number: 1,  name: "Top",       fusionName: "Top",              group: "Copper",     color: 4,  fill: 1,  visible: true },
  { number: 16, name: "Bottom",    fusionName: "Bottom",           group: "Copper",     color: 1,  fill: 1,  visible: false },
  { number: 17, name: "Pads",      fusionName: "Pads",             group: "Copper",     color: 2,  fill: 1,  visible: false },
  { number: 18, name: "Vias",      fusionName: "Vias",             group: "Copper",     color: 2,  fill: 1,  visible: false },
  { number: 19, name: "Unrouted",  fusionName: "Unrouted",         group: "Copper",     color: 6,  fill: 1,  visible: false },
  // ── Mechanical ──
  { number: 20, name: "Dimension", fusionName: "BoardOutline",     group: "Mechanical", color: 15, fill: 1,  visible: false },
  { number: 44, name: "Drills",    fusionName: "Drills",           group: "Mechanical", color: 7,  fill: 1,  visible: false },
  { number: 45, name: "Holes",     fusionName: "Holes",            group: "Mechanical", color: 7,  fill: 1,  visible: false },
  { number: 46, name: "Milling",   fusionName: "Milling",          group: "Mechanical", color: 3,  fill: 1,  visible: false },
  // ── Silkscreen ──
  { number: 21, name: "tPlace",    fusionName: "SilkscreenTop",    group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  { number: 22, name: "bPlace",    fusionName: "SilkscreenBottom", group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  { number: 25, name: "tNames",    fusionName: "NamesTop",         group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  { number: 26, name: "bNames",    fusionName: "NamesBottom",      group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  { number: 27, name: "tValues",   fusionName: "ValuesTop",        group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  { number: 28, name: "bValues",   fusionName: "ValuesBottom",     group: "Silkscreen", color: 7,  fill: 1,  visible: false },
  // ── Mask Openings ──
  { number: 29, name: "tStop",     fusionName: "SolderMaskTop",    group: "Mask",       color: 7,  fill: 3,  visible: false },
  { number: 30, name: "bStop",     fusionName: "SolderMaskBottom", group: "Mask",       color: 7,  fill: 3,  visible: false },
  { number: 31, name: "tCream",    fusionName: "StencilTop",       group: "Mask",       color: 7,  fill: 4,  visible: false },
  { number: 32, name: "bCream",    fusionName: "StencilBottom",    group: "Mask",       color: 7,  fill: 4,  visible: false },
  { number: 35, name: "tGlue",     fusionName: "GlueTop",          group: "Mask",       color: 7,  fill: 4,  visible: false },
  { number: 36, name: "bGlue",     fusionName: "GlueBottom",       group: "Mask",       color: 7,  fill: 4,  visible: false },
  // ── Exclusions ──
  { number: 39, name: "tKeepout",  fusionName: "ComponentExcludeTop", group: "Exclusions", color: 4, fill: 11, visible: false },
  { number: 41, name: "tRestrict", fusionName: "RestrictTop",      group: "Exclusions", color: 4,  fill: 10, visible: false },
  { number: 42, name: "bRestrict", fusionName: "RestrictBottom",   group: "Exclusions", color: 1,  fill: 10, visible: false },
  { number: 43, name: "vRestrict", fusionName: "RestrictVias",     group: "Exclusions", color: 2,  fill: 10, visible: false },
  // ── Documentation ──
  { number: 47, name: "Measures",  fusionName: "Measures",         group: "Documentation", color: 7, fill: 1, visible: false },
  { number: 48, name: "Document",  fusionName: "Document",         group: "Documentation", color: 7, fill: 1, visible: false },
  { number: 49, name: "Reference", fusionName: "Reference",        group: "Documentation", color: 7, fill: 1, visible: false },
  { number: 51, name: "tDocu",     fusionName: "DocumentTop",      group: "Documentation", color: 7, fill: 1, visible: false },
  { number: 52, name: "bDocu",     fusionName: "DocumentBottom",   group: "Documentation", color: 7, fill: 1, visible: false },
  // ── Schematic ──
  { number: 91, name: "Nets",      fusionName: "Nets",             group: "Schematic",  color: 2,  fill: 1,  visible: true },
  { number: 92, name: "Busses",    fusionName: "Busses",           group: "Schematic",  color: 1,  fill: 1,  visible: true },
  { number: 93, name: "Pins",      fusionName: "Pins",             group: "Schematic",  color: 2,  fill: 1,  visible: false },
  { number: 94, name: "Symbols",   fusionName: "Symbols",          group: "Schematic",  color: 4,  fill: 1,  visible: true },
  { number: 95, name: "Names",     fusionName: "Names",            group: "Schematic",  color: 7,  fill: 1,  visible: true },
  { number: 96, name: "Values",    fusionName: "Values",           group: "Schematic",  color: 7,  fill: 1,  visible: true },
  { number: 97, name: "Info",      fusionName: "Info",             group: "Schematic",  color: 7,  fill: 1,  visible: true },
  { number: 98, name: "Guide",     fusionName: "Guide",            group: "Schematic",  color: 6,  fill: 1,  visible: true },
];

/** Generate XML <layers> block for .lbr files */
export function generateLayersXml(): string {
  const groups = new Map<string, EagleLayer[]>();
  for (const layer of standardLayers) {
    if (!groups.has(layer.group)) groups.set(layer.group, []);
    groups.get(layer.group)!.push(layer);
  }
  const lines: string[] = ["<layers>"];
  for (const [group, layers] of groups) {
    lines.push(`<!-- ${group} -->`);
    for (const l of layers) {
      lines.push(`<layer number="${l.number}" name="${l.name}" color="${l.color}" fill="${l.fill}" visible="${l.visible ? "yes" : "no"}" active="yes"/>`);
    }
  }
  lines.push("</layers>");
  return lines.join("\n");
}
