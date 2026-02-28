import { ComponentNote } from "../types/index.js";

// ── Notes about specific components ──
// Warnings, tips, EOL notices, quality issues, etc.

export const componentNotes: ComponentNote[] = [
  {
    id: "cn-001",
    partNumber: "AMS1117-3.3",
    note: "Reliable and cheap but quiescent current is 5mA — do not use for battery-powered designs. Use AP2112K-3.3 (Iq=55uA) or ME6211 (Iq=40uA) instead.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-002",
    partNumber: "CH340G",
    note: "Requires external 12MHz crystal. CH340C is crystal-less drop-in if you want to reduce BOM count. Both work but C version is easier for small boards.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Carter-Hoffmann Slack Archive Notes ──

  {
    id: "cn-003",
    partNumber: "BTA12-600BWRG",
    note: "Supply-constrained since 2021. Verified drop-in replacements: BTA12-700BWRG and BTA12-800BWRG (same package, higher voltage rating). Requires UL file update when substituting. Derate to 5A max in production despite 12A datasheet rating.",
    type: "substitute",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-004",
    partNumber: "T1235-600G-TR",
    note: "12A/600V TRIAC used in M-Series triac boards. Derate to 5A for production use. Heatsink required — used with heat-sinked bottom heater outputs on 15-output triac board. UL listed for Carter-Hoffmann applications.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-005",
    partNumber: "HC08",
    note: "WARNING: HC08 quad AND gate has slower propagation delay than HCS08. On M-Series display boards, this slower speed is actually REQUIRED for proper button detection on single-window displays daisy-chained downstream of dual-window masters. Do not blindly upgrade to HCS08 without full regression testing across all display configurations.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-006",
    partNumber: "HCS08",
    note: "Faster AND gate that fixes display flicker caused by cable capacitance on shift register lines. However, this speed change breaks button detection on downstream single-window displays (FGLF0626/0627) when chained after dual-window masters (FGLF0598/0599). Must stock both HC08 and HCS08 variants depending on display configuration.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-007",
    partNumber: "JST_S3B-PH-SM4-TB_LF_SN",
    note: "JST PH series used extensively in Carter-Hoffmann designs. DigiKey cable: 455-3143-ND, header: 455-1751-1-ND. Small, inexpensive, tight locking. Good for 4-wire comm+power connections as alternative to telco cables.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-008",
    partNumber: "RJ11-6P",
    note: "DO NOT USE for digital communication in new designs. Years of field failures on Carter-Hoffmann M-Series traced to 6-pin telco cable quality variations — crimping inconsistency, no shielding, no twisted pairs, variable capacitance. Use RJ45 CAT-5e instead. If forced to use RJ11, specify Assmann WSW A-MO-6-6-F50 plugs with documented crimping procedure.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Devon-REC / Nidek Battery Pack Notes (from Slack archive 2019-2025) ──

  {
    id: "cn-009",
    partNumber: "BQ40Z60",
    note: "1MHz synchronous buck charger with integrated fuel gauge. Internal FET temperature can reach 66°C+ during charging. A marginal IC can cause FET overheating — check BQ IC temp before replacing FETs. SREC file contains chemistry, parameters, AND lifetime data. Correct programming order: firmware first, then chemistry.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-010",
    partNumber: "BQ40Z50",
    note: "All hardware revisions (base, R1, R2, R3, R4) are the same silicon die. Upgrade between revisions by flashing firmware only. R4 firmware file is v4.02build79. Place the .BQZ file in BQStudio config folder for R4 to appear as device option. TI app note SLUAAE2 confirms hardware compatibility. This opens up supply chain significantly — accept any revision.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-011",
    partNumber: "BQ294700",
    note: "WARNING: Floating cell sense inputs when IC is powered WILL trigger fuse blow output and latch active. Route power supply for this IC through the final cell connection switch so it only powers on after all cells are present. For existing boards: open all dip switches, solder B- through B3 first, close dip switches, THEN solder B4. Verify FUSE flag in BQStudio before enabling. BQ294711 is a drop-in with wider threshold options.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-012",
    partNumber: "BQ24610",
    note: "600kHz synchronous buck battery charger. Good efficiency (~100% at 46W through-put). TS pin controls charge enable — must drive to ~1.8V (50% of 3.3V VREF) or use 10KΩ to GND. TS can't be left floating — needs explicit biasing. Eval board has no snubber populated — add RC snubber (10Ω + 2200pF) to output FETs for EMI compliance. Input voltage must be > battery voltage for charging to start.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-013",
    partNumber: "BQ771605DPJR",
    note: "External overvoltage detector with 3.85V per-cell trip point. Used alongside BQ40Z50/BQ40Z60 in battery pack designs as hardware safety backup. Set software COV threshold below 3.85V (recommend 3750mV) to ensure software catches overvoltage before this hardware detector fires.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-014",
    partNumber: "INR18650MJ1",
    note: "Samsung 18650 Li-ion cell used in Nidek O2 concentrator battery packs. TI Chemistry ID 0x2059. Be careful: TI auto-analysis sometimes mis-identifies as Panasonic 18650 if current calibration is off. Available in TI GAUGECHEM software Chemistry Version 997+.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-015",
    partNumber: "EV2400",
    note: "TI evaluation interface board for BQStudio communication with BQ fuel gauge ICs. BQStudio runs on Windows only and is prone to random reboots from Windows updates during long learning cycles. Disable automatic updates on the test machine. Use version 1.3.101+ with Chemistry version 997+. Headless machines need network access for remote monitoring.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // ── Polyvance Plastic Welder Notes (from Slack archive 2019-2025) ──

  {
    id: "cn-016",
    partNumber: "4118L-07P",
    note: "Lin Engineering 4118L-07P bipolar stepper motor used for nitrogen flow control valve. 1.8°/step (200 steps/rev), 2000 steps for full valve range. Requires 300mA drive current. Must rewind-to-home on every power cycle — no absolute position feedback. Pair with MAC valve body for gas flow control. Hysteresis in valve means always approach setpoints from same direction.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-017",
    partNumber: "PTS0603",
    note: "Vishay PTS0603 platinum RTD thin-film sensor. Used for handle temperature measurement in plastic welder. Mount on small custom PCB (~8mm x 12mm) with JST PH connector for easy replacement. Better accuracy than NTC for temperature control loops. Use 4-wire measurement or Kelvin connection for precision; 2-wire acceptable for safety cutoff applications where ±2°C is sufficient.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-018",
    partNumber: "IRM-05-5",
    note: "Meanwell IRM-05-5 board-mount AC-DC module. 5V/1A output, 85-264VAC universal input, fully enclosed/potted. UL/CE certified. Smaller and cheaper than discrete transformer + regulator for low-power embedded systems. Pin-compatible IRM series covers 5V, 12V, 15V, 24V at 5-20W. Replaces traditional power supply approach in industrial controllers.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-019",
    partNumber: "BTA12-600BW",
    note: "Same TRIAC as BTA12-600BWRG but non-RoHS variant. UL listed under UL1557, file reference 81734, for Polyvance plastic welder applications. Used for heater element control with zero-crossing detection. Derate to 5A max (same rule as Carter-Hoffmann). Zero-crossing detection circuit must be routed away from shift register or other fast digital signals — capacitive coupling causes false triggering.",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-020",
    partNumber: "RPi-Zero-W",
    note: "Raspberry Pi Zero W used as display controller in plastic welder (Bugatti variant). FCC ID: 2ABCB-RPI0W. 1024x600 IPS display via HDMI. BOM with display: ~$107 vs $49 for ESP32+7\" capacitive touch. Main risk: SD card corruption from power loss — expect ~5% annual failure rate without mitigation. Requires advance power-down circuit for reliable operation. Consider read-only rootfs with tmpfs overlays. Production touchscreen fallout ~10% (19/200 units).",
    type: "warning",
    status: "approved",
    addedDate: "2026-02-28",
  },
  {
    id: "cn-021",
    partNumber: "LD15-23B12R2",
    note: "Mornsun 12V/1.25A board-mount AC-DC module. Needed UL test report (not just UL certificate) for Polyvance welder safety certification. UL test reports are harder to obtain than certificates — request early in design phase. Had to consider Vigortronix as pin-compatible second source due to availability concerns. Always qualify 2+ sources for safety-critical power supplies.",
    type: "tip",
    status: "approved",
    addedDate: "2026-02-28",
  },
];
