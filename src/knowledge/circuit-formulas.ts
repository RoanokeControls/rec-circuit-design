// ── Circuit Design Formulas ──
// Quick-reference formulas for common circuit design calculations.
// Sourced from Forrest Mims' Engineer's Notebooks and standard EE references.

export interface CircuitFormula {
  id: string;
  name: string;
  category: FormulaCategory;
  formula: string;
  variables: { symbol: string; name: string; unit: string }[];
  example?: { description: string; values: Record<string, number>; result: string };
  notes?: string;
}

export type FormulaCategory =
  | "resistor"
  | "capacitor"
  | "led"
  | "voltage-divider"
  | "zener-regulator"
  | "transistor-switch"
  | "555-timer"
  | "op-amp"
  | "rc-filter"
  | "power"
  | "relay-driver"
  | "sensor"
  | "solar"
  | "hall-sensor"
  | "cmos"
  | "active-filter"
  | "audio"
  | "antenna"
  | "rectifier"
  | "ujt"
  | "scr"
  | "triac"
  | "fet"
  | "mosfet"
  | "wheatstone-bridge"
  | "voltage-multiplier"
  | "amplifier"
  | "voltage-regulator"
  | "current-source"
  | "tone-decoder"
  | "vco";

export const circuitFormulas: CircuitFormula[] = [
  // ── Ohm's Law ──
  {
    id: "ohms-law",
    name: "Ohm's Law",
    category: "resistor",
    formula: "R = V / I  (or)  I = V / R  (or)  V = I * R",
    variables: [
      { symbol: "R", name: "Resistance", unit: "ohms" },
      { symbol: "V", name: "Voltage", unit: "volts" },
      { symbol: "I", name: "Current", unit: "amps" },
    ],
    example: {
      description: "Find current through 1K resistor with 5V across it",
      values: { V: 5, R: 1000 },
      result: "I = 5 / 1000 = 0.005A = 5mA",
    },
  },

  // ── Power ──
  {
    id: "power-dissipation",
    name: "Power Dissipation",
    category: "power",
    formula: "P = V * I  (or)  P = I^2 * R  (or)  P = V^2 / R",
    variables: [
      { symbol: "P", name: "Power", unit: "watts" },
      { symbol: "V", name: "Voltage", unit: "volts" },
      { symbol: "I", name: "Current", unit: "amps" },
      { symbol: "R", name: "Resistance", unit: "ohms" },
    ],
    example: {
      description: "Power dissipated by linear regulator dropping 12V to 5V at 500mA",
      values: { V: 7, I: 0.5 },
      result: "P = 7 * 0.5 = 3.5W — needs heatsink!",
    },
    notes: "Critical for regulator thermal calculations. REC's MC7805 in D2PAK dissipates (Vin - 5V) * Iload.",
  },

  // ── LED Series Resistor ──
  {
    id: "led-series-resistor",
    name: "LED Series Resistor",
    category: "led",
    formula: "Rs = (Vcc - Vled) / Iled",
    variables: [
      { symbol: "Rs", name: "Series resistance", unit: "ohms" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "Vled", name: "LED forward voltage", unit: "volts" },
      { symbol: "Iled", name: "LED forward current", unit: "amps" },
    ],
    example: {
      description: "Red LED (Vf=1.7V, If=20mA) on 3.3V supply",
      values: { Vcc: 3.3, Vled: 1.7, Iled: 0.02 },
      result: "Rs = (3.3 - 1.7) / 0.02 = 80 ohms — use 82 ohm standard value",
    },
    notes: "Typical Vf: Red=1.7V, Yellow=2.0V, Green=2.2V, Blue/White=3.0-3.3V. REC standard uses 1K for indicator LEDs on 3.3V (dim but long-life, ~1.6mA).",
  },

  // ── LED Power Dissipation ──
  {
    id: "led-resistor-power",
    name: "LED Resistor Power Rating",
    category: "led",
    formula: "P_resistor = (Vcc - Vled)^2 / Rs",
    variables: [
      { symbol: "P_resistor", name: "Resistor power dissipation", unit: "watts" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "Vled", name: "LED forward voltage", unit: "volts" },
      { symbol: "Rs", name: "Series resistance", unit: "ohms" },
    ],
    example: {
      description: "Check if 0402 (1/16W) resistor is OK for 12V supply, red LED, 1K resistor",
      values: { Vcc: 12, Vled: 1.7, Rs: 1000 },
      result: "P = (12 - 1.7)^2 / 1000 = 0.106W — needs 0603 (1/10W) minimum",
    },
    notes: "Common gotcha: 0402 resistors (1/16W = 62.5mW) can't handle LED circuits on 12V+ supplies. Use 0603 or larger.",
  },

  // ── Voltage Divider ──
  {
    id: "voltage-divider",
    name: "Voltage Divider",
    category: "voltage-divider",
    formula: "Vout = Vin * R2 / (R1 + R2)",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "R1", name: "Top resistor (to Vin)", unit: "ohms" },
      { symbol: "R2", name: "Bottom resistor (to GND)", unit: "ohms" },
    ],
    example: {
      description: "Divide 5V to 3.3V for ADC reference",
      values: { Vin: 5, R1: 5100, R2: 10000 },
      result: "Vout = 5 * 10000 / (5100 + 10000) = 3.31V",
    },
    notes: "Divider current I = Vin/(R1+R2). Keep low enough to avoid waste but high enough to source the load. Rule of thumb: divider current should be 10x the load current for <10% error.",
  },

  // ── Voltage Divider — solve for R2 ──
  {
    id: "voltage-divider-solve-r2",
    name: "Voltage Divider — Solve for R2",
    category: "voltage-divider",
    formula: "R2 = R1 * Vout / (Vin - Vout)",
    variables: [
      { symbol: "R2", name: "Bottom resistor", unit: "ohms" },
      { symbol: "R1", name: "Top resistor", unit: "ohms" },
      { symbol: "Vout", name: "Desired output voltage", unit: "volts" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
    ],
    example: {
      description: "Buck converter feedback: 3.3V output, R1=10K, Vref=0.8V",
      values: { R1: 10000, Vout: 0.8, Vin: 3.3 },
      result: "R2 = 10000 * 0.8 / (3.3 - 0.8) = 3200 ohms — use 3.3K",
    },
    notes: "Used constantly for regulator feedback dividers. REC's TPS54286 and AOZ6662 both use this for output voltage setting.",
  },

  // ── Zener Voltage Regulator ──
  {
    id: "zener-regulator",
    name: "Zener Voltage Regulator",
    category: "zener-regulator",
    formula: "Rs = (Vin - Vz) / (Iz + Iload)",
    variables: [
      { symbol: "Rs", name: "Series resistor", unit: "ohms" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "Vz", name: "Zener voltage", unit: "volts" },
      { symbol: "Iz", name: "Zener bias current", unit: "amps" },
      { symbol: "Iload", name: "Load current", unit: "amps" },
    ],
    example: {
      description: "5.1V zener from 12V input, 10mA load, 5mA zener bias",
      values: { Vin: 12, Vz: 5.1, Iz: 0.005, Iload: 0.01 },
      result: "Rs = (12 - 5.1) / (0.005 + 0.01) = 460 ohms — use 470 ohm",
    },
    notes: "Only for light loads (<50mA). Power in zener: Pz = Vz * Iz. Power in resistor: Pr = (Vin-Vz) * (Iz+Iload). REC uses zener clamps on 12V rails (15V zener, see protection-circuits).",
  },

  // ── RC Time Constant ──
  {
    id: "rc-time-constant",
    name: "RC Time Constant",
    category: "rc-filter",
    formula: "tau = R * C",
    variables: [
      { symbol: "tau", name: "Time constant", unit: "seconds" },
      { symbol: "R", name: "Resistance", unit: "ohms" },
      { symbol: "C", name: "Capacitance", unit: "farads" },
    ],
    example: {
      description: "10K resistor + 0.1uF capacitor (common debounce)",
      values: { R: 10000, C: 0.0000001 },
      result: "tau = 10000 * 0.0000001 = 0.001s = 1ms. Reaches 63% in 1ms, ~99% in 5ms.",
    },
    notes: "Voltage across cap: V(t) = Vfinal * (1 - e^(-t/tau)). Reaches 63% at 1*tau, 86% at 2*tau, 95% at 3*tau, 99% at 5*tau. Used for debounce, filters, and reset circuits. REC reset circuits use 10K + 0.1uF.",
  },

  // ── RC Low-Pass Filter Cutoff ──
  {
    id: "rc-lowpass-cutoff",
    name: "RC Low-Pass Filter Cutoff Frequency",
    category: "rc-filter",
    formula: "fc = 1 / (2 * pi * R * C)",
    variables: [
      { symbol: "fc", name: "Cutoff frequency (-3dB)", unit: "Hz" },
      { symbol: "R", name: "Resistance", unit: "ohms" },
      { symbol: "C", name: "Capacitance", unit: "farads" },
    ],
    example: {
      description: "Anti-alias filter for 1kHz ADC sampling: R=1.6K, C=0.1uF",
      values: { R: 1600, C: 0.0000001 },
      result: "fc = 1 / (2 * 3.14159 * 1600 * 0.0000001) = 995 Hz",
    },
    notes: "Place between sensor output and MCU ADC input. Choose fc at or below Nyquist frequency (half the sample rate).",
  },

  // ── 555 Timer — Monostable (one-shot) ──
  {
    id: "555-monostable",
    name: "555 Timer — Monostable Pulse Width",
    category: "555-timer",
    formula: "t = 1.1 * R1 * C1",
    variables: [
      { symbol: "t", name: "Pulse duration", unit: "seconds" },
      { symbol: "R1", name: "Timing resistor", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "1-second pulse: R1=910K, C1=1uF",
      values: { R1: 910000, C1: 0.000001 },
      result: "t = 1.1 * 910000 * 0.000001 = 1.001 seconds",
    },
    notes: "Trigger on falling edge of pin 2. Output (pin 3) goes HIGH for duration t, then returns LOW. Supply: 4.5-15V. Output can source/sink 200mA.",
  },

  // ── 555 Timer — Astable (oscillator) ──
  {
    id: "555-astable",
    name: "555 Timer — Astable Frequency",
    category: "555-timer",
    formula: "f = 1.44 / ((R1 + 2*R2) * C1)",
    variables: [
      { symbol: "f", name: "Frequency", unit: "Hz" },
      { symbol: "R1", name: "Resistor from Vcc to pin 7", unit: "ohms" },
      { symbol: "R2", name: "Resistor from pin 7 to pin 6", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor on pin 6", unit: "farads" },
    ],
    example: {
      description: "1 kHz oscillator: R1=1K, R2=6.8K, C1=0.1uF",
      values: { R1: 1000, R2: 6800, C1: 0.0000001 },
      result: "f = 1.44 / ((1000 + 2*6800) * 0.0000001) = 986 Hz",
    },
    notes: "Duty cycle = (R1 + R2) / (R1 + 2*R2). For 50% duty, use diode across R2 or make R1 << R2. HIGH time: 0.693*(R1+R2)*C1. LOW time: 0.693*R2*C1.",
  },

  // ── 555 Timer — Duty Cycle ──
  {
    id: "555-duty-cycle",
    name: "555 Timer — Astable Duty Cycle",
    category: "555-timer",
    formula: "duty = (R1 + R2) / (R1 + 2*R2) * 100%",
    variables: [
      { symbol: "duty", name: "Duty cycle (% HIGH)", unit: "%" },
      { symbol: "R1", name: "Resistor from Vcc to pin 7", unit: "ohms" },
      { symbol: "R2", name: "Resistor from pin 7 to pin 6", unit: "ohms" },
    ],
    example: {
      description: "R1=1K, R2=10K",
      values: { R1: 1000, R2: 10000 },
      result: "duty = (1000 + 10000) / (1000 + 20000) = 52.4% HIGH",
    },
    notes: "Always >50% in standard config because charge path includes R1+R2 but discharge is only R2. For <50% duty, add diode across R2 (cathode toward pin 7).",
  },

  // ── 555 Timer — VCO (Voltage-Controlled Oscillator) ──
  {
    id: "555-vco",
    name: "555 Timer — VCO Frequency vs Control Voltage",
    category: "555-timer",
    formula: "f ≈ 1.44 / ((R1 + 2*R2) * C1) — modulated by Vcontrol on pin 5",
    variables: [
      { symbol: "f", name: "Output frequency (modulated)", unit: "Hz" },
      { symbol: "R1", name: "Resistor from Vcc to pin 7", unit: "ohms" },
      { symbol: "R2", name: "Resistor from pin 7 to pin 6", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor on pin 6", unit: "farads" },
      { symbol: "Vcontrol", name: "Control voltage applied to pin 5", unit: "volts" },
    ],
    example: {
      description: "VCO with R1=220, R2=100K, C1=0.01uF, varying pin 5 voltage",
      values: { R1: 220, R2: 100000, C1: 0.00000001 },
      result: "Base f ≈ 720 Hz. Increasing Vcontrol decreases frequency; decreasing Vcontrol increases frequency.",
    },
    notes: "Pin 5 normally sits at 2/3 Vcc via internal resistor divider. Applying external voltage shifts the comparator thresholds. Higher Vcontrol → wider charge swing → lower frequency. Lower Vcontrol → narrower swing → higher frequency. Relationship is roughly inverse-linear over a limited range. Do not exceed Vcc on pin 5. For linear VCO, use dedicated ICs (LM566, CD4046).",
  },

  // ── 555 Timer — Relay Timer Delay Table ──
  {
    id: "555-relay-delay",
    name: "555 Timer — Relay Timer Typical Delays",
    category: "555-timer",
    formula: "t = 1.1 * R1 * C1 (seconds)",
    variables: [
      { symbol: "t", name: "Relay actuation time", unit: "seconds" },
      { symbol: "R1", name: "Timing resistor", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "Common relay delay values from Mims table",
      values: { R1: 1000000, C1: 0.00001 },
      result: "R1=100K,C1=10uF→2s; R1=220K→3s; R1=470K→6s; R1=1M→15s. With C1=100uF: R1=100K→16s; R1=220K→33s; R1=470K→70s; R1=1M→175s",
    },
    notes: "From Mims 555 Timer IC Circuits p9. Same monostable formula but with practical relay-driving values pre-calculated. Flyback diode across relay coil is MANDATORY. Relay coil must draw <200mA or use transistor driver. Electrolytic caps needed for >1uF — observe polarity.",
  },

  // ── Op-Amp Inverting Gain ──
  {
    id: "opamp-inverting-gain",
    name: "Op-Amp — Inverting Amplifier Gain",
    category: "op-amp",
    formula: "Gain = -Rf / Rin",
    variables: [
      { symbol: "Gain", name: "Voltage gain (inverted)", unit: "V/V" },
      { symbol: "Rf", name: "Feedback resistor", unit: "ohms" },
      { symbol: "Rin", name: "Input resistor", unit: "ohms" },
    ],
    example: {
      description: "Gain of -10: Rin=1K, Rf=10K",
      values: { Rf: 10000, Rin: 1000 },
      result: "Gain = -10000 / 1000 = -10 (inverts signal, amplifies 10x)",
    },
    notes: "Input impedance equals Rin. Output inverted. For single-supply op-amps, bias non-inverting input to Vcc/2.",
  },

  // ── Op-Amp Non-Inverting Gain ──
  {
    id: "opamp-noninverting-gain",
    name: "Op-Amp — Non-Inverting Amplifier Gain",
    category: "op-amp",
    formula: "Gain = 1 + (R2 / R1)",
    variables: [
      { symbol: "Gain", name: "Voltage gain", unit: "V/V" },
      { symbol: "R2", name: "Feedback resistor (output to inverting input)", unit: "ohms" },
      { symbol: "R1", name: "Ground resistor (inverting input to GND)", unit: "ohms" },
    ],
    example: {
      description: "Gain of 11: R1=1K, R2=10K",
      values: { R2: 10000, R1: 1000 },
      result: "Gain = 1 + (10000 / 1000) = 11",
    },
    notes: "Very high input impedance (op-amp input). Minimum gain is 1 (voltage follower, R2=0, R1=open). Good for buffering sensor outputs before ADC.",
  },

  // ── Transistor Switch Base Resistor ──
  {
    id: "transistor-switch-base-resistor",
    name: "NPN Transistor Switch — Base Resistor",
    category: "transistor-switch",
    formula: "Rb = (Vdrive - Vbe) / Ib,  where Ib = Ic / hfe_min * overdrive",
    variables: [
      { symbol: "Rb", name: "Base resistor", unit: "ohms" },
      { symbol: "Vdrive", name: "Drive voltage (MCU GPIO)", unit: "volts" },
      { symbol: "Vbe", name: "Base-emitter voltage (typ 0.7V)", unit: "volts" },
      { symbol: "Ic", name: "Collector current (load)", unit: "amps" },
      { symbol: "hfe_min", name: "Minimum transistor gain", unit: "" },
      { symbol: "overdrive", name: "Saturation overdrive factor (typ 3-10x)", unit: "" },
    ],
    example: {
      description: "Drive relay coil (50mA) from 3.3V MCU, 2N2222 (hfe_min=75), 5x overdrive",
      values: { Vdrive: 3.3, Vbe: 0.7, Ic: 0.05, hfe_min: 75, overdrive: 5 },
      result: "Ib = 0.05/75 * 5 = 3.33mA. Rb = (3.3-0.7)/0.00333 = 780 ohms — use 680 or 750",
    },
    notes: "Overdrive ensures transistor is in saturation (Vce_sat < 0.3V). 5-10x is typical for relay/LED switching. REC designs commonly use 2N2222/2N3904 for this. Always add flyback diode across relay coil!",
  },

  // ── Relay Flyback Diode ──
  {
    id: "relay-flyback",
    name: "Relay/Inductor Flyback Diode Selection",
    category: "relay-driver",
    formula: "Vr >= Vcoil_supply,  If >= Icoil",
    variables: [
      { symbol: "Vr", name: "Diode reverse voltage rating", unit: "volts" },
      { symbol: "Vcoil_supply", name: "Relay coil supply voltage", unit: "volts" },
      { symbol: "If", name: "Diode forward current rating", unit: "amps" },
      { symbol: "Icoil", name: "Relay coil current", unit: "amps" },
    ],
    example: {
      description: "12V relay coil drawing 80mA",
      values: { Vcoil_supply: 12, Icoil: 0.08 },
      result: "Need diode rated >= 12V reverse, >= 80mA forward. 1N4148 (100V, 200mA) works fine.",
    },
    notes: "ALWAYS place flyback diode across relay/solenoid coil (cathode to +V, anode to collector/drain). Without it, inductive kickback can be 10-100x supply voltage and destroy the driver transistor. REC uses 1N4148 for small relays, 1N4001 for larger ones.",
  },

  // ── Sensor Voltage Divider ──
  {
    id: "sensor-divider",
    name: "Resistive Sensor Voltage Divider",
    category: "sensor",
    formula: "Vout = Vcc * Rsensor / (Rfixed + Rsensor)  [sensor on bottom]\nVout = Vcc * Rfixed / (Rsensor + Rfixed)  [sensor on top]",
    variables: [
      { symbol: "Vout", name: "Voltage to ADC", unit: "volts" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "Rsensor", name: "Sensor resistance (varies)", unit: "ohms" },
      { symbol: "Rfixed", name: "Fixed reference resistor", unit: "ohms" },
    ],
    example: {
      description: "10K NTC thermistor (10K at 25C) with 10K fixed resistor, 3.3V supply",
      values: { Vcc: 3.3, Rsensor: 10000, Rfixed: 10000 },
      result: "Vout = 3.3 * 10000 / (10000 + 10000) = 1.65V at 25C. As temp rises, Rsensor drops, Vout drops.",
    },
    notes: "Choose Rfixed close to Rsensor's midrange for best sensitivity. Sensor on bottom: Vout increases as sensor resistance increases. Sensor on top: Vout increases as sensor resistance decreases. Add RC filter (1K + 0.1uF) before ADC for noise.",
  },

  // ── Comparator Threshold ──
  {
    id: "comparator-threshold",
    name: "Comparator Threshold Voltage",
    category: "op-amp",
    formula: "Vthreshold = Vcc * R2 / (R1 + R2)",
    variables: [
      { symbol: "Vthreshold", name: "Switching threshold", unit: "volts" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "R1", name: "Top resistor (Vcc to ref pin)", unit: "ohms" },
      { symbol: "R2", name: "Bottom resistor (ref pin to GND)", unit: "ohms" },
    ],
    example: {
      description: "Set threshold at 2.5V on 5V supply",
      values: { Vcc: 5, R1: 10000, R2: 10000 },
      result: "Vthreshold = 5 * 10000 / (10000 + 10000) = 2.5V",
    },
    notes: "Feed threshold to one comparator input, signal to the other. For hysteresis (Schmitt trigger), add positive feedback resistor from output to non-inverting input. Hysteresis prevents oscillation at threshold.",
  },

  // ── Comparator Hysteresis ──
  {
    id: "comparator-hysteresis",
    name: "Comparator Hysteresis (Schmitt Trigger)",
    category: "op-amp",
    formula: "Vhyst = Vout_swing * Rfeedback_bottom / (Rfeedback_top + Rfeedback_bottom)",
    variables: [
      { symbol: "Vhyst", name: "Hysteresis band width", unit: "volts" },
      { symbol: "Vout_swing", name: "Comparator output voltage swing", unit: "volts" },
      { symbol: "Rfeedback_bottom", name: "Resistor from non-inv input to GND", unit: "ohms" },
      { symbol: "Rfeedback_top", name: "Resistor from output to non-inv input", unit: "ohms" },
    ],
    example: {
      description: "Add 0.5V hysteresis with 5V output swing",
      values: { Vout_swing: 5, Rfeedback_top: 100000, Rfeedback_bottom: 10000 },
      result: "Vhyst = 5 * 10000 / (100000 + 10000) = 0.45V",
    },
    notes: "Prevents output chatter when input signal is near threshold. Essential for any comparator driving a relay or indicator where noise could cause rapid switching.",
  },

  // ── AC RMS / Peak Conversions ──
  {
    id: "ac-rms-peak",
    name: "AC Voltage Conversions",
    category: "power",
    formula: "Vrms = Vpeak * 0.707\nVpeak = Vrms * 1.414\nVavg = Vpeak * 0.637 (full-wave rectified)",
    variables: [
      { symbol: "Vrms", name: "RMS voltage", unit: "volts" },
      { symbol: "Vpeak", name: "Peak voltage", unit: "volts" },
      { symbol: "Vavg", name: "Average voltage (rectified)", unit: "volts" },
    ],
    example: {
      description: "120V AC mains",
      values: { Vrms: 120 },
      result: "Vpeak = 120 * 1.414 = 169.7V. This is why 200V caps are minimum for rectified mains!",
    },
    notes: "Critical for AC-powered REC designs. After bridge rectifier: Vdc ~= Vpeak - 2*Vdiode. For 120V mains with bridge: ~168V DC. For 240V mains: ~338V DC. Varistor rating (275V) is for 240V mains RMS.",
  },

  // ── Capacitor Charge/Discharge ──
  {
    id: "cap-charge-voltage",
    name: "Capacitor Charge Voltage Over Time",
    category: "capacitor",
    formula: "V(t) = Vfinal * (1 - e^(-t / (R*C)))  [charging]\nV(t) = Vinitial * e^(-t / (R*C))  [discharging]",
    variables: [
      { symbol: "V(t)", name: "Voltage at time t", unit: "volts" },
      { symbol: "Vfinal", name: "Supply/target voltage", unit: "volts" },
      { symbol: "t", name: "Time", unit: "seconds" },
      { symbol: "R", name: "Series resistance", unit: "ohms" },
      { symbol: "C", name: "Capacitance", unit: "farads" },
    ],
    example: {
      description: "MCU reset delay: 10K + 0.1uF charging to 3.3V. Time to reach 2.3V (70% = logic HIGH)?",
      values: { Vfinal: 3.3, R: 10000, C: 0.0000001 },
      result: "tau = 1ms. 2.3V/3.3V = 0.697, so t = -tau * ln(1 - 0.697) = 1.19ms",
    },
    notes: "Milestones: 1*tau=63%, 2*tau=86%, 3*tau=95%, 4*tau=98%, 5*tau=99.3%. Use for reset timing, debounce, and power-on delays.",
  },

  // ── Inductor Energy / Current Ripple ──
  {
    id: "inductor-ripple-current",
    name: "Buck Converter Inductor Ripple Current",
    category: "power",
    formula: "delta_IL = (Vin - Vout) * D / (f * L),  where D = Vout / Vin",
    variables: [
      { symbol: "delta_IL", name: "Peak-to-peak inductor ripple current", unit: "amps" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "D", name: "Duty cycle", unit: "" },
      { symbol: "f", name: "Switching frequency", unit: "Hz" },
      { symbol: "L", name: "Inductance", unit: "henries" },
    ],
    example: {
      description: "TPS54286: 5V to 3.3V, 500kHz, 10uH inductor",
      values: { Vin: 5, Vout: 3.3, f: 500000, L: 0.00001 },
      result: "D = 0.66, delta_IL = (5-3.3)*0.66/(500000*0.00001) = 0.224A = 224mA p-p",
    },
    notes: "Target ripple current 20-40% of max load current. Larger L = less ripple but slower transient response and bigger part. REC's TPS54286 uses 10uH inductors.",
  },

  // ── Decoupling Capacitor Impedance ──
  {
    id: "cap-impedance-at-freq",
    name: "Capacitor Impedance at Frequency",
    category: "capacitor",
    formula: "Xc = 1 / (2 * pi * f * C)",
    variables: [
      { symbol: "Xc", name: "Capacitive reactance", unit: "ohms" },
      { symbol: "f", name: "Frequency", unit: "Hz" },
      { symbol: "C", name: "Capacitance", unit: "farads" },
    ],
    example: {
      description: "0.1uF decoupling cap at 10MHz",
      values: { f: 10000000, C: 0.0000001 },
      result: "Xc = 1 / (6.283 * 10000000 * 0.0000001) = 0.16 ohms — excellent bypass",
    },
    notes: "This is why 0.1uF is the standard decoupling cap — low impedance at MCU clock frequencies. Add 10uF bulk cap for low-frequency bypassing. REC standard: 0.1uF per VCC pin + one 10uF per IC.",
  },

  // ── Pull-up Resistor for I2C ──
  {
    id: "i2c-pullup",
    name: "I2C Pull-up Resistor Range",
    category: "resistor",
    formula: "Rp_min = (Vcc - Vol_max) / Iol\nRp_max = tr / (0.8473 * Cb)",
    variables: [
      { symbol: "Rp_min", name: "Minimum pull-up resistance", unit: "ohms" },
      { symbol: "Rp_max", name: "Maximum pull-up resistance", unit: "ohms" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "Vol_max", name: "Max output low voltage (0.4V typical)", unit: "volts" },
      { symbol: "Iol", name: "Output sink current (3mA standard mode)", unit: "amps" },
      { symbol: "tr", name: "Max rise time (1us standard, 0.3us fast)", unit: "seconds" },
      { symbol: "Cb", name: "Bus capacitance", unit: "farads" },
    ],
    example: {
      description: "3.3V I2C standard mode, 50pF bus capacitance",
      values: { Vcc: 3.3, Vol_max: 0.4, Iol: 0.003, tr: 0.000001, Cb: 0.00000000005 },
      result: "Rp_min = (3.3-0.4)/0.003 = 967 ohms. Rp_max = 0.000001/(0.8473*50e-12) = 23.6K. Use 4.7K (REC standard).",
    },
    notes: "REC standard: 4.7K pull-ups on 3.3V I2C, 10K on 5V I2C. Short bus (<10cm): 4.7K-10K. Long bus (>30cm): 2.2K-4.7K. Mined from 261 designs: 4.7K is most common at 67% usage.",
  },

  // ── Solar Cell Array Voltage ──
  {
    id: "solar-series-voltage",
    name: "Solar Cell Array — Series Voltage",
    category: "solar",
    formula: "Vtotal = Vcell * N_series",
    variables: [
      { symbol: "Vtotal", name: "Total array open-circuit voltage", unit: "volts" },
      { symbol: "Vcell", name: "Single cell open-circuit voltage (typ 0.45-0.55V)", unit: "volts" },
      { symbol: "N_series", name: "Number of cells in series", unit: "" },
    ],
    example: {
      description: "How many cells to charge a 12V battery (need ~14.5V for charging)?",
      values: { Vcell: 0.5, N_series: 30 },
      result: "Vtotal = 0.5 * 30 = 15V open-circuit. Under load ~14.5V — suitable for 12V battery charging.",
    },
    notes: "Silicon solar cells produce 0.45-0.55V open-circuit regardless of size. Cell size determines current, not voltage. Typical residential panels use 60 or 72 cells in series (30-36V open-circuit). Account for voltage drop under load (~80-85% of Voc) and blocking diode drop (~0.4V Schottky).",
  },

  // ── Solar Cell Array Current ──
  {
    id: "solar-parallel-current",
    name: "Solar Cell Array — Parallel Current",
    category: "solar",
    formula: "Itotal = Icell * N_parallel",
    variables: [
      { symbol: "Itotal", name: "Total array short-circuit current", unit: "amps" },
      { symbol: "Icell", name: "Single cell short-circuit current", unit: "amps" },
      { symbol: "N_parallel", name: "Number of strings in parallel", unit: "" },
    ],
    example: {
      description: "4 strings of cells in parallel, each producing 8A",
      values: { Icell: 8, N_parallel: 4 },
      result: "Itotal = 8 * 4 = 32A total array current",
    },
    notes: "Cell current is proportional to cell area and light intensity. Standard 6-inch cells produce ~8-9A. Parallel strings increase current capacity. Each parallel string should have its own blocking diode to prevent reverse current through shaded strings.",
  },

  // ── Solar Panel Power ──
  {
    id: "solar-panel-power",
    name: "Solar Panel Power Output",
    category: "solar",
    formula: "P = Vmp * Imp  (or)  P = Voc * Isc * FF",
    variables: [
      { symbol: "P", name: "Maximum power output", unit: "watts" },
      { symbol: "Vmp", name: "Voltage at maximum power point", unit: "volts" },
      { symbol: "Imp", name: "Current at maximum power point", unit: "amps" },
      { symbol: "Voc", name: "Open-circuit voltage", unit: "volts" },
      { symbol: "Isc", name: "Short-circuit current", unit: "amps" },
      { symbol: "FF", name: "Fill factor (typ 0.7-0.8 for silicon)", unit: "" },
    ],
    example: {
      description: "Typical 300W residential panel",
      values: { Vmp: 32.5, Imp: 9.23, Voc: 39.7, Isc: 9.8, FF: 0.77 },
      result: "P = 32.5 * 9.23 = 300W. Cross-check: 39.7 * 9.8 * 0.77 = 299.5W",
    },
    notes: "Real-world output is typically 75-85% of rated power due to temperature, angle, soiling, and wiring losses. Solar irradiance constant: 136.8 mW/cm² (1368 W/m²) at top of atmosphere; ~1000 W/m² at earth's surface under ideal conditions (STC rating basis).",
  },

  // ── Solar Battery Charger — Blocking Diode ──
  {
    id: "solar-blocking-diode",
    name: "Solar Battery Charger — Blocking Diode",
    category: "solar",
    formula: "Vr >= Vbattery,  If >= Isc_panel,  Ploss = Vf * Icharge",
    variables: [
      { symbol: "Vr", name: "Diode reverse voltage rating", unit: "volts" },
      { symbol: "Vbattery", name: "Battery voltage", unit: "volts" },
      { symbol: "If", name: "Diode forward current rating", unit: "amps" },
      { symbol: "Isc_panel", name: "Panel short-circuit current", unit: "amps" },
      { symbol: "Vf", name: "Diode forward voltage drop", unit: "volts" },
      { symbol: "Icharge", name: "Charging current", unit: "amps" },
    ],
    example: {
      description: "12V battery with 5A solar panel",
      values: { Vbattery: 14.4, Isc_panel: 5, Vf: 0.4 },
      result: "Use Schottky rated >= 14.4V reverse, >= 5A forward. Power loss = 0.4V * 5A = 2W.",
    },
    notes: "ALWAYS use a blocking diode between solar panel and battery — without it, the battery will discharge back through the panel at night. Schottky diodes preferred (0.3-0.4V drop vs 0.7V for silicon). For high-current systems, use MOSFET-based ideal diode circuits to minimize losses. Panel Vmp must exceed Vbattery + Vf_diode for charging to occur.",
  },

  // ── Solar Charge Time Estimate ──
  {
    id: "solar-charge-time",
    name: "Solar Battery Charge Time Estimate",
    category: "solar",
    formula: "t_hours = (Ah_battery * depth_of_discharge) / (Ipanel_avg * sun_hours_factor)",
    variables: [
      { symbol: "t_hours", name: "Approximate charge time", unit: "hours of sunlight" },
      { symbol: "Ah_battery", name: "Battery capacity", unit: "amp-hours" },
      { symbol: "depth_of_discharge", name: "How deeply discharged (0-1)", unit: "" },
      { symbol: "Ipanel_avg", name: "Average panel current (typ 70% of Imp)", unit: "amps" },
      { symbol: "sun_hours_factor", name: "Effective sun-hours per day (typ 4-6)", unit: "hours" },
    ],
    example: {
      description: "Recharge a 100Ah battery from 50% discharge with a 5A panel",
      values: { Ah_battery: 100, depth_of_discharge: 0.5, Ipanel_avg: 3.5, sun_hours_factor: 5 },
      result: "t = (100 * 0.5) / (3.5 * 5) = 2.86 days of sunlight",
    },
    notes: "Very rough estimate — real charging is non-linear, especially as battery approaches full charge. MPPT charge controllers recover 15-30% more energy than direct connection. For home solar systems (like a 40-panel roof array), grid-tied inverters handle this automatically.",
  },

  // ── Hall Effect Sensor Voltage ──
  {
    id: "hall-sensor-voltage",
    name: "Hall Effect Sensor Output Voltage",
    category: "hall-sensor",
    formula: "Vh = Rh * (I / t) * B",
    variables: [
      { symbol: "Vh", name: "Hall voltage", unit: "volts" },
      { symbol: "Rh", name: "Hall effect coefficient (material dependent)", unit: "m³/C" },
      { symbol: "I", name: "Current through sensor", unit: "amps" },
      { symbol: "t", name: "Sensor thickness", unit: "meters" },
      { symbol: "B", name: "Perpendicular magnetic field", unit: "tesla" },
    ],
    example: {
      description: "Typical silicon Hall sensor: ~18 µV per gauss at 3V supply",
      values: { Rh: 0.000018 },
      result: "Raw Hall voltage is very small — practical sensors include built-in amplifiers (A3515 ratiometric) or Schmitt triggers (A3141 digital switch).",
    },
    notes: "Raw silicon Hall voltage is ~18 µV/gauss — too small for direct use. Integrated Hall sensors (A3515, A3141, UGN3132, UGX3132) include amplifiers and/or logic. Digital types (A3141) output HIGH/LOW based on magnetic threshold. Ratiometric types (A3515) output voltage proportional to field strength. Common uses: position detection, RPM sensing (gear tooth), contactless switching. Hall sensors are immune to dirt/dust that disables optical sensors.",
  },

  // ── CMOS Logic Oscillators (from Forrest Mims) ──
  {
    id: "cmos-nand-oscillator",
    name: "CMOS NAND Gate Oscillator (4011)",
    category: "cmos",
    formula: "F = 1 / (2.2 * R * C)",
    variables: [
      { symbol: "F", name: "Frequency", unit: "Hz" },
      { symbol: "R", name: "Feedback resistor", unit: "ohms" },
      { symbol: "C", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "1 kHz oscillator using CD4011 NAND gates",
      values: { R: 100000, C: 0.0000047 },
      result: "F = 1 / (2.2 * 100000 * 4.7e-6) = 967 Hz — use 100K + 4.7nF",
    },
    notes: "Uses two NAND gates from a CD4011. R between output of gate 2 and input of gate 1, C from junction to ground. Asymmetric duty cycle. Vdd = 3-15V. Tie ALL unused inputs to Vdd or Vss. Can also use 4001 NOR gates with same topology.",
  },
  {
    id: "cmos-inverter-oscillator",
    name: "CMOS Inverter Oscillator (4049)",
    category: "cmos",
    formula: "F = 1 / (1.4 * R * C)",
    variables: [
      { symbol: "F", name: "Pulse rate", unit: "Hz" },
      { symbol: "R", name: "Feedback resistor", unit: "ohms" },
      { symbol: "C", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "Clock pulse generator using CD4049",
      values: { R: 100000, C: 0.00000001 },
      result: "F = 1 / (1.4 * 100000 * 0.01e-6) = 714 Hz",
    },
    notes: "4049 hex inverting buffer. Pin 1 = Vdd, pin 8 = GND (unusual pinout!). 4049/4050 are the ONLY CMOS ICs whose inputs may exceed Vdd. Also produces triangle wave variant: F = 1/(1.4*R1*C1) with R1=100K, C1=0.05uF, R2=24K, C2=0.05uF for ~140 Hz triangle output.",
  },
  {
    id: "cmos-phase-shift-oscillator",
    name: "CMOS Phase Shift Oscillator (4049)",
    category: "cmos",
    formula: "F = 1 / (3.3 * R * C)",
    variables: [
      { symbol: "F", name: "Output frequency", unit: "Hz" },
      { symbol: "R", name: "Each stage feedback resistor (3 equal)", unit: "ohms" },
      { symbol: "C", name: "Each stage capacitor (3 equal)", unit: "farads" },
    ],
    example: {
      description: "Phase shift oscillator with three 4049 inverter stages",
      values: { R: 100000, C: 0.0000001 },
      result: "F = 1 / (3.3 * 100000 * 0.1e-6) = 30.3 Hz",
    },
    notes: "Three inverters in series, each with equal R and C in feedback. Produces a smoother waveform than the single-gate oscillator. Uses half of a CD4049.",
  },
  {
    id: "cmos-one-shot-4528",
    name: "CMOS One-Shot Pulse Width (4528)",
    category: "cmos",
    formula: "t = 0.5 * R * C",
    variables: [
      { symbol: "t", name: "Output pulse width", unit: "seconds" },
      { symbol: "R", name: "Timing resistor", unit: "ohms" },
      { symbol: "C", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "1ms pulse from CD4528 dual monostable",
      values: { R: 20000, C: 0.0000001 },
      result: "t = 0.5 * 20000 * 0.1e-6 = 1ms",
    },
    notes: "CD4528 is a dual retriggerable monostable. Vdd = 3-18V. Triggers on rising OR falling edge. Unused section: tie RST and +IN to Vss, -IN to Vdd. Use for pulse delay, debounce, and stepped tone generation. Can cascade both halves for pulse delayer circuit.",
  },
  {
    id: "cmos-xor-oscillator",
    name: "CMOS XOR Gate High-Frequency Oscillator (4070)",
    category: "cmos",
    formula: "F varies with Vdd: 2.4MHz at 5V, 9.4MHz at 10V, 11MHz at 15V",
    variables: [
      { symbol: "F", name: "Output frequency", unit: "Hz" },
      { symbol: "Vdd", name: "Supply voltage", unit: "volts" },
    ],
    example: {
      description: "10 MHz oscillator using CD4070 XOR gate",
      values: { Vdd: 10 },
      result: "F ≈ 9.4 MHz at Vdd = 10V with 100K feedback resistor",
    },
    notes: "Single XOR gate with 100K feedback resistor. Frequency increases with Vdd. Also works as square wave generator: add 1K series R + 0.001uF cap for ~2 MHz at 10V. CD4070 also useful as: controlled inverter, phase detector, binary comparator, and half-adder.",
  },

  // ── Active Filters (Sallen-Key from Mims Op-Amp) ──
  {
    id: "sallen-key-filter",
    name: "Sallen-Key Active Filter Cutoff",
    category: "active-filter",
    formula: "fc = 1 / (2 * pi * R * C)",
    variables: [
      { symbol: "fc", name: "Cutoff frequency (-3dB)", unit: "Hz" },
      { symbol: "R", name: "Equal resistors (R1 = R2)", unit: "ohms" },
      { symbol: "C", name: "Equal capacitors (C1 = C2)", unit: "farads" },
    ],
    example: {
      description: "3 kHz low-pass or high-pass Sallen-Key filter",
      values: { R: 4700, C: 0.00000001 },
      result: "fc = 1 / (6.283 * 4700 * 0.01e-6) = 3,386 Hz (measured: 3,000 Hz)",
    },
    notes: "Equal-component Sallen-Key topology. For proper Butterworth response, set gain resistors: R3 = 0.586 * R4 (e.g., R3=33K, R4=56K for gain ≈ 1.59). Same formula for both low-pass and high-pass — swap R and C positions to change filter type. 2nd-order rolloff (-12dB/octave).",
  },
  {
    id: "notch-filter-twin-tee",
    name: "Twin-Tee Notch Filter Frequency",
    category: "active-filter",
    formula: "fo = 1 / (2 * pi * R * C)",
    variables: [
      { symbol: "fo", name: "Notch frequency (maximum attenuation)", unit: "Hz" },
      { symbol: "R", name: "Resistor value (R1 = R2 = 2*R3)", unit: "ohms" },
      { symbol: "C", name: "Capacitor value (C1 = C2 = C3/2)", unit: "farads" },
    ],
    example: {
      description: "60 Hz hum rejection filter",
      values: { R: 470000, C: 0.000000005 },
      result: "fo = 1 / (6.283 * 470000 * 5e-9) = 67.7 Hz — adjust C for exact 60 Hz",
    },
    notes: "Twin-tee topology: R1=R2=470K, R3=220K, C1=C2=0.005uF, C3=0.01uF. Also available as Wien bridge variant: R1=R2=R3=R4=R5=27K, C1=C2=0.1uF. Essential for rejecting 60 Hz power line hum in audio and sensor circuits.",
  },
  {
    id: "bandpass-filter-tunable",
    name: "Tunable Bandpass Filter Center Frequency",
    category: "active-filter",
    formula: "fo ≈ 1 / (2 * pi * sqrt(R1 * R2) * C)",
    variables: [
      { symbol: "fo", name: "Center frequency", unit: "Hz" },
      { symbol: "R1", name: "Input resistor", unit: "ohms" },
      { symbol: "R2", name: "Tuning resistor (variable)", unit: "ohms" },
      { symbol: "C", name: "Equal capacitors", unit: "farads" },
    ],
    example: {
      description: "Tunable bandpass from 500 Hz to 3 kHz",
      values: { R1: 1500, R2: 930, C: 0.00000001 },
      result: "fo ≈ 1 kHz with R2=930 ohm. R2=350 → 1.5kHz. R2=130 → 2kHz.",
    },
    notes: "Op-amp active bandpass using 741 or similar. C1=C2=0.01uF, R3=100K, R4=220K. Adjust R2 (variable pot) to select narrow passband. Useful for isolating specific audio frequencies from sensor signals.",
  },

  // ── Op-Amp Advanced Configurations (from Mims Op-Amp) ──
  {
    id: "opamp-summing-amplifier",
    name: "Op-Amp Summing Amplifier",
    category: "op-amp",
    formula: "Vout = -(Rf/R) * (V1 + V2 + ... + Vn)",
    variables: [
      { symbol: "Vout", name: "Output voltage (inverted sum)", unit: "volts" },
      { symbol: "Rf", name: "Feedback resistor", unit: "ohms" },
      { symbol: "R", name: "Input resistors (all equal)", unit: "ohms" },
      { symbol: "V1...Vn", name: "Input voltages", unit: "volts" },
    ],
    example: {
      description: "Sum two signals: V1=4.0V, V2=0.8V with all R=10K",
      values: { Rf: 10000, R: 10000, V1: 4.0, V2: 0.8 },
      result: "Vout = -(10K/10K) * (4.0 + 0.8) = -4.8V",
    },
    notes: "All input resistors and feedback resistor typically equal (10K). Sum of inputs should not exceed supply voltage. Can add more inputs with additional resistors to inverting input. Use 1458 dual op-amp with second stage as inverter to restore polarity. Used for audio mixing (multiple microphones).",
  },
  {
    id: "opamp-difference-amplifier",
    name: "Op-Amp Difference Amplifier",
    category: "op-amp",
    formula: "Vout = (R2/R1) * (V2 - V1)",
    variables: [
      { symbol: "Vout", name: "Output voltage (difference)", unit: "volts" },
      { symbol: "R1", name: "Input resistors (matched pair)", unit: "ohms" },
      { symbol: "R2", name: "Feedback resistors (matched pair)", unit: "ohms" },
      { symbol: "V1", name: "Inverting input voltage", unit: "volts" },
      { symbol: "V2", name: "Non-inverting input voltage", unit: "volts" },
    ],
    example: {
      description: "Subtract two sensor signals with unity gain",
      values: { R1: 100000, R2: 100000, V1: 0.9, V2: 5.0 },
      result: "Vout = (100K/100K) * (5.0 - 0.9) = 4.1V",
    },
    notes: "All four resistors must be matched for accurate subtraction. R1=R2=R3=R4=100K for unity gain. Uses 1458 dual op-amp. Essential for differential sensor measurements — rejects common-mode noise. Used throughout Mims sensor projects for ambient rejection (dual thermistor IR sensor, dual photoresistor magnetic sensor).",
  },
  {
    id: "opamp-transimpedance",
    name: "Op-Amp Transimpedance Amplifier (Current to Voltage)",
    category: "op-amp",
    formula: "Vout = -Iin * Rf",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Iin", name: "Input current (from sensor)", unit: "amps" },
      { symbol: "Rf", name: "Feedback resistor", unit: "ohms" },
    ],
    example: {
      description: "Solar cell radiometer with Rf=1M",
      values: { Iin: 0.000001, Rf: 1000000 },
      result: "Vout = 1µA * 1M = 1V. Switchable Rf (10 ohm to 10M) provides decades of range.",
    },
    notes: "Current source (solar cell, photodiode, strain sensor) connects to inverting input. Rf sets gain — with Rf=1M, gain is 1,000,000 (1µA → 1V). Used for solar radiometers, strain sensors, and photodiode amplifiers. Reduce Rf to reduce gain. Dual supply (+/-9V) for bipolar output.",
  },

  // ── Op-Amp Integrator Time Constant ──
  {
    id: "opamp-integrator",
    name: "Op-Amp Integrator — Output vs Input",
    category: "op-amp",
    formula: "Vout = -(1/(R1×C1)) × ∫Vin dt  (time constant τ = R1×C1)",
    variables: [
      { symbol: "Vout", name: "Output voltage (triangle wave from square input)", unit: "volts" },
      { symbol: "R1", name: "Input resistor", unit: "ohms" },
      { symbol: "C1", name: "Integrating capacitor", unit: "farads" },
      { symbol: "R2", name: "DC stabilization feedback (R2 ≥ 10×R1)", unit: "ohms" },
    ],
    example: {
      description: "Integrator with R1=4.7K, C1=0.1uF, f=2000Hz square wave input",
      values: { R1: 4700, C1: 0.0000001 },
      result: "τ = 4700 × 0.1µF = 0.47ms. At f=2000Hz (T=0.5ms), ±2.5V square in → ±1.3V triangle out. R2=47K (≥10×R1) provides DC stability.",
    },
    notes: "From Mims Op Amp IC Circuits p20. C1=1/(f×R2). R2≥10×R1 prevents DC saturation. R3=R1×R2/(R1+R2) for offset minimization. Use as low-pass filter, square-to-triangle converter, or analog computer element. Single-supply version uses R3/R4 voltage divider to bias at 1/2 Vcc.",
  },

  // ── Op-Amp Differentiator Time Constant ──
  {
    id: "opamp-differentiator",
    name: "Op-Amp Differentiator — Output vs Input",
    category: "op-amp",
    formula: "Vout = -R2×C1 × (dVin/dt)  (C1 = 1/(f×R2) or R2 = 1/(f×C1))",
    variables: [
      { symbol: "Vout", name: "Output voltage (square wave from triangle input)", unit: "volts" },
      { symbol: "R2", name: "Feedback resistor", unit: "ohms" },
      { symbol: "C1", name: "Input capacitor", unit: "farads" },
      { symbol: "R1", name: "Input series resistor (limits HF gain)", unit: "ohms" },
    ],
    example: {
      description: "Differentiator with R1=470, R2=4.7K, C1=0.1uF, f=2000Hz triangle input",
      values: { R2: 4700, C1: 0.0000001 },
      result: "C1=1/(f×R2) = 1/(2000×4700) ≈ 0.1µF. ±2.5V triangle in → ±10V square out.",
    },
    notes: "From Mims Op Amp IC Circuits p21. R1 limits high-frequency gain to prevent oscillation. Triangle wave in → square wave out. Very sensitive to noise. Single-supply version biases at 1/2 Vcc with R3/R4 divider.",
  },

  // ── Sallen-Key Filter Cutoff Frequency ──
  {
    id: "sallen-key-cutoff",
    name: "Sallen-Key Active Filter — Cutoff Frequency",
    category: "op-amp",
    formula: "fc = 1 / (2π × R × C)  (equal-component: R1=R2=R, C1=C2=C)",
    variables: [
      { symbol: "fc", name: "Cutoff frequency (-3dB point)", unit: "Hz" },
      { symbol: "R", name: "Equal-value resistor (R1=R2)", unit: "ohms" },
      { symbol: "C", name: "Equal-value capacitor (C1=C2)", unit: "farads" },
    ],
    example: {
      description: "Low-pass or high-pass with R=4.7K, C=0.01uF",
      values: { R: 4700, C: 0.00000001 },
      result: "fc = 1/(2π × 4700 × 0.01µF) = 3,386 Hz (calculated). Measured: 3,000 Hz. Gain at passband ≈ 1.59 (R3=0.586×R4 for Butterworth).",
    },
    notes: "From Mims Op Amp IC Circuits p40-41. Same formula for both LPF and HPF — only the component placement differs (swap R and C positions). Second-order: -12dB/octave rolloff. R3≈0.586×R4 for maximally-flat (Butterworth) response. Gain = R4/R3 ≈ 1.59.",
  },

  // ── 60-Hz Notch Filter (Wien Bridge / Twin Tee) ──
  {
    id: "notch-filter-60hz",
    name: "60-Hz Notch Filter — Center Frequency",
    category: "op-amp",
    formula: "f₀ = 1 / (2π × R × C)  (Wien Bridge: R1=R2=R3=R4=R5=R, C1=C2=C)",
    variables: [
      { symbol: "f0", name: "Notch center frequency", unit: "Hz" },
      { symbol: "R", name: "Equal-value resistor", unit: "ohms" },
      { symbol: "C", name: "Equal-value capacitor", unit: "farads" },
    ],
    example: {
      description: "60-Hz notch: R=27K, C=0.1uF",
      values: { R: 27000, C: 0.0000001 },
      result: "f₀ = 1/(2π × 27K × 0.1µF) = 59 Hz ≈ 60 Hz. Deep null at 60Hz, passes all other frequencies.",
    },
    notes: "From Mims Op Amp IC Circuits p42. Wien Bridge uses 5 equal R and 2 equal C. Twin Tee uses R1=R2=2×R3, C1=C2=C3/2. Both provide deep null at f₀. Essential for removing 60Hz power line hum from analog sensor circuits.",
  },

  // ── Audio Amplifier (from Mims) ──
  {
    id: "lm386-audio-gain",
    name: "LM386 Audio Amplifier Gain",
    category: "audio",
    formula: "Gain = 20 (default)  or  Gain = 200 (with 10uF cap between pins 1 and 8)",
    variables: [
      { symbol: "Gain", name: "Voltage gain", unit: "V/V" },
    ],
    example: {
      description: "Standard audio output stage for sensor/communication circuits",
      values: {},
      result: "Default: Gain=20. With 10uF from pin 1(+) to pin 8: Gain=200. Supply +4V to +12V. Output power ~325mW into 8 ohm.",
    },
    notes: "LM386 is the standard Mims audio power amp. Supply: +4 to +12V. Input coupling: 1-10uF. Output coupling: 100-220uF to 8 ohm speaker. Volume control: 10K pot on input. 0.1uF bypass cap on supply pin (mandatory — prevents oscillation). Standby current: 4-8mA. Used throughout Mims for lightwave receivers, sensor alerters, and communication projects.",
  },

  // ── Antenna (from Mims Communications) ──
  {
    id: "antenna-quarter-wave",
    name: "Quarter-Wave Antenna Length",
    category: "antenna",
    formula: "L_feet = 234 / F_MHz",
    variables: [
      { symbol: "L_feet", name: "Antenna length", unit: "feet" },
      { symbol: "F_MHz", name: "Operating frequency", unit: "MHz" },
    ],
    example: {
      description: "CB radio antenna at 27 MHz",
      values: { F_MHz: 27 },
      result: "L = 234 / 27 = 8.67 feet",
    },
    notes: "Quarter-wave whip antenna. Dipole = two quarter-wave elements. For long-wire reception antennas: use standoff insulators, drip loop for rain, ground rod (8 ft minimum). Always connect outdoor antennas to a grounded static discharge unit. Disconnect antenna during electrical storms.",
  },

  // ── Solar Irradiance (from Mims Solar Cell) ──
  {
    id: "solar-air-mass",
    name: "Solar Air Mass Calculation",
    category: "solar",
    formula: "m = 1 / sin(theta)",
    variables: [
      { symbol: "m", name: "Air mass (multiples of atmosphere)", unit: "" },
      { symbol: "theta", name: "Sun angle above horizon", unit: "degrees" },
    ],
    example: {
      description: "Air mass at 30 degrees elevation",
      values: { theta: 30 },
      result: "m = 1 / sin(30°) = 1 / 0.5 = 2.0 air masses",
    },
    notes: "Used for solar cell characterization via Langley plot method. Solar constant at top of atmosphere: 136.8 mW/cm² (1368 W/m²). At sea level with clear sky: ~100 mW/cm² (75.6% of top-of-atmosphere). Monthly correction factors range from 0.9666 (July) to 1.0335 (January). Air mass 1.0 = sun directly overhead; AM1.5 is standard test condition for solar panels.",
  },

  // ── Wheatstone Bridge (from Mims Basic Semiconductor) ──
  {
    id: "wheatstone-bridge",
    name: "Wheatstone Bridge Balance",
    category: "wheatstone-bridge",
    formula: "R1/R3 = R2/R4 (at balance, meter reads zero)",
    variables: [
      { symbol: "R1", name: "Known resistor arm 1", unit: "ohms" },
      { symbol: "R2", name: "Known resistor arm 2", unit: "ohms" },
      { symbol: "R3", name: "Unknown resistance", unit: "ohms" },
      { symbol: "R4", name: "Calibrated variable resistor", unit: "ohms" },
    ],
    example: {
      description: "Measure unknown resistance with R1=R2=1K, adjust R4 until balance",
      values: { R1: 1000, R2: 1000, R4: 4700 },
      result: "R3 = (R1 * R4) / R2 = (1000 * 4700) / 1000 = 4700 ohms",
    },
    notes: "From Mims Basic Semiconductor Circuits. R1 and R2 should be 1% precision resistors. R4 is a potentiometer with calibrated dial. RS is a 5K pot to regulate current from power supply. S1 shunt protects meter M1 — adjust R4 until M1=0, then press S1 and repeat. For REC: useful for precision sensor calibration, thermistor measurement, strain gauge bridges.",
  },

  // ── RC Time Constant (from Mims Basic Semiconductor) ──
  {
    id: "rc-time-constant",
    name: "RC Time Constant",
    category: "rc-filter",
    formula: "tau = R * C (time to charge to 63.2% of Vcc)",
    variables: [
      { symbol: "tau", name: "Time constant", unit: "seconds" },
      { symbol: "R", name: "Resistance", unit: "ohms" },
      { symbol: "C", name: "Capacitance", unit: "farads" },
    ],
    example: {
      description: "10K resistor charging 100uF capacitor",
      values: { R: 10000, C: 0.0001 },
      result: "tau = 10000 * 0.0001 = 1 second. Full charge (~5 tau) = 5 seconds",
    },
    notes: "From Mims Basic Semiconductor Circuits. A capacitor charges to 63.2% in 1 tau, 86.5% in 2 tau, 95% in 3 tau, 98.2% in 4 tau, 99.3% in 5 tau. Discharge follows same curve in reverse. For integrator: RC must be at least 10x the period of input signal, else amplitude is reduced and acts as low-pass filter. For differentiator: RC should be 1/10 (or less) of incoming pulse duration. Used in debounce, timer, and filter circuits throughout REC designs.",
  },

  // ── Diode Voltage Dropper (from Mims Basic Semiconductor) ──
  {
    id: "diode-voltage-dropper",
    name: "Diode Voltage Dropper",
    category: "power",
    formula: "Vout = Vin - (n * 0.6) where n = number of silicon diodes",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "n", name: "Number of series diodes", unit: "" },
    ],
    example: {
      description: "Drop 6V to ~5.4V for TTL chip using 1N914 diode",
      values: { Vin: 6, n: 1 },
      result: "Vout = 6 - (1 * 0.6) = 5.4V",
    },
    notes: "From Mims Basic Semiconductor Circuits. Simple but effective for small voltage drops. Use 1N914/1N4148 for low current, 1N4001 for higher current. Example: 3 diodes drop 6V to 4.2V. For REC: quick way to drop battery voltage slightly without a regulator. Forward voltage varies with current and temperature — not precision, but good enough for many applications.",
  },

  // ── Diode Voltage Regulator (from Mims Basic Semiconductor) ──
  {
    id: "diode-string-regulator",
    name: "Diode String Voltage Regulator",
    category: "power",
    formula: "Vout = 0.6 * (D1 + D2 + ... + Dn); R1 = (Vin - Vout) / I",
    variables: [
      { symbol: "Vout", name: "Regulated output voltage", unit: "volts" },
      { symbol: "n", name: "Number of series diodes", unit: "" },
      { symbol: "R1", name: "Series current limiting resistor", unit: "ohms" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "I", name: "Load current", unit: "amps" },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Output equals sum of diode threshold voltages. CAUTION: D1 and R1 must have proper power rating — use Ohm's law. Not as stable as zener regulation but useful when exact voltage isn't critical.",
  },

  // ── Zener Regulator (from Mims Basic Semiconductor) ──
  {
    id: "zener-regulator-model",
    name: "Zener Voltage Regulator",
    category: "zener-regulator",
    formula: "R1 = (Vin - Vz) / I; Pz = Vz * Iz; IL_max = Iz - Iz_min",
    variables: [
      { symbol: "R1", name: "Series resistor", unit: "ohms" },
      { symbol: "Vin", name: "Input voltage (must be > Vz + 1V)", unit: "volts" },
      { symbol: "Vz", name: "Zener breakdown voltage", unit: "volts" },
      { symbol: "I", name: "Total current (Iz + IL)", unit: "amps" },
      { symbol: "Pz", name: "Zener power dissipation", unit: "watts" },
      { symbol: "Iz", name: "Zener current", unit: "amps" },
      { symbol: "IL_max", name: "Maximum load current", unit: "amps" },
    ],
    example: {
      description: "9V zener regulator from 12V supply, 50mA max load",
      values: { Vin: 12, Vz: 9, I: 0.05 },
      result: "R1 = (12 - 9) / 0.05 = 60 ohms. Pz = 9 * 0.05 = 0.45W — use 1/2W zener",
    },
    notes: "From Mims Basic Semiconductor Circuits. Vin must be at least 1V above Vz. Commercial zeners range 2-200V. Zener operates in reverse breakdown — current flows from cathode to anode. For REC: use for voltage reference more than power regulation. For power regulation, use LM7805/LM2596 instead.",
  },

  // ── Voltage Shifter (from Mims Basic Semiconductor) ──
  {
    id: "zener-voltage-shifter",
    name: "Zener Voltage Shifter",
    category: "zener-regulator",
    formula: "Vout = Vin - Vz (for Vin > Vz); Vout = 0 (for Vin <= Vz)",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Vin", name: "Input voltage", unit: "volts" },
      { symbol: "Vz", name: "Zener voltage (e.g. 6.2V)", unit: "volts" },
    ],
    example: {
      description: "6.2V zener shifting 9V input",
      values: { Vin: 9, Vz: 6.2 },
      result: "Vout = 9 - 6.2 = 2.8V. At 12V: Vout = 12 - 6.2 = 5.8V",
    },
    notes: "From Mims Basic Semiconductor Circuits. R1 (1K) in series. Output tracks input minus the zener voltage. Table: Vin=5→Vout=0, 6→0.36, 9→3.17, 12→6.37, 15→9.27. Useful for level-shifting signals that ride on a DC offset.",
  },

  // ── Cascade Voltage Doubler (from Mims Basic Semiconductor) ──
  {
    id: "cascade-voltage-doubler",
    name: "Cascade Voltage Doubler",
    category: "voltage-multiplier",
    formula: "Vout = 2 * Vin(peak)",
    variables: [
      { symbol: "Vout", name: "DC output voltage", unit: "volts" },
      { symbol: "Vin", name: "AC input peak voltage", unit: "volts" },
    ],
    notes: "From Mims Basic Semiconductor Circuits. Components must be rated for 2x Vin. Use large-value capacitors to reduce ripple. Also available as bridge doubler (uses 4 diodes + 2 caps) and quadrupler (4 diodes + 4 caps, Vout = 4 * Vin). CAUTION: voltage multiplication circuits can produce HIGH VOLTAGES — use care! For REC: useful for generating bias voltages from low-voltage AC sources.",
  },

  // ── Transistor Base Resistor (from Mims Basic Semiconductor) ──
  {
    id: "bjt-base-resistor",
    name: "BJT Base Resistor for Switching",
    category: "transistor-switch",
    formula: "Rb = (Vdrive - 0.7) / Ib; Ib = Ic / (hfe * overdrive_factor)",
    variables: [
      { symbol: "Rb", name: "Base resistor", unit: "ohms" },
      { symbol: "Vdrive", name: "Drive voltage (GPIO/logic level)", unit: "volts" },
      { symbol: "Ib", name: "Base current needed", unit: "amps" },
      { symbol: "Ic", name: "Collector (load) current", unit: "amps" },
      { symbol: "hfe", name: "Transistor current gain (typically 100-300 for 2N2222)", unit: "" },
    ],
    example: {
      description: "Drive 50mA relay from 3.3V GPIO using 2N2222 (hfe=100, 10x overdrive)",
      values: { Vdrive: 3.3, Ic: 0.05, hfe: 100 },
      result: "Ib = 0.05 / (100 * 10) = 50uA. Rb = (3.3 - 0.7) / 0.00005 = 52K. Use 47K or 1K for reliable saturation.",
    },
    notes: "From Mims Basic Semiconductor Circuits. For switching (not linear) applications, overdrive the base by 5-10x to ensure full saturation (Vce_sat < 0.2V). Mims uses 1K as a general-purpose value for most relay/LED driver circuits with 2N2222. For REC standard designs: 1K base resistor with 3.3V GPIO is the default pattern.",
  },

  // ── LED Constant Current Regulator (from Mims Basic Semiconductor) ──
  {
    id: "led-constant-current",
    name: "LED Constant Current Regulator (2-Transistor)",
    category: "led",
    formula: "I_led = 0.7 / R3; (R3 sets the LED current)",
    variables: [
      { symbol: "I_led", name: "LED current (constant)", unit: "amps" },
      { symbol: "R3", name: "Current sense resistor", unit: "ohms" },
    ],
    example: {
      description: "Set LED current to 7mA",
      values: { R3: 100 },
      result: "I_led = 0.7 / 100 = 7mA (constant regardless of supply voltage changes 5-15V)",
    },
    notes: "From Mims Basic Semiconductor Circuits. Uses Q1 (2N2907 PNP) and Q2 (2N2222 NPN) with R3 as sense resistor. Q2 monitors voltage across R3 and regulates Q1 to maintain constant current. Supply range 5-15V. REC application: constant-brightness LED indicators that work across varying supply voltages (battery-powered devices, automotive).",
  },

  // ── Transistor Amplifier Gain (from Mims Basic Semiconductor) ──
  {
    id: "bjt-amplifier-gain",
    name: "Common-Emitter Amplifier Voltage Gain",
    category: "transistor-switch",
    formula: "Av = Vout / Vin = -R2 / R1 (approximate, for bypassed emitter)",
    variables: [
      { symbol: "Av", name: "Voltage gain", unit: "" },
      { symbol: "R2", name: "Collector resistor", unit: "ohms" },
      { symbol: "R1", name: "Emitter resistor (or source impedance)", unit: "ohms" },
    ],
    example: {
      description: "Mims basic transistor amplifier: R2=1K collector, R1=5K input coupling",
      values: { R2: 1000 },
      result: "Test circuit gave Vout/Vin = 50 (34 dB gain)",
    },
    notes: "From Mims Basic Semiconductor Circuits. Basic common-emitter amplifier: 2N2222, +12V supply, 5K input coupling (C1=1uF), 1K collector load. Gain depends on transistor hfe and biasing. For audio preamp applications, add emitter resistor (100-470 ohm) for stability at cost of reduced gain.",
  },

  // ── FET Amplifier Gain (from Mims Basic Semiconductor) ──
  {
    id: "fet-amplifier-gain",
    name: "JFET Common-Source Amplifier Gain",
    category: "fet",
    formula: "Av = Vout / Vin (typically 2-20 for single-stage JFET)",
    variables: [
      { symbol: "Av", name: "Voltage gain", unit: "" },
      { symbol: "Vout", name: "Output voltage (AC component)", unit: "volts" },
      { symbol: "Vin", name: "Input voltage (AC component)", unit: "volts" },
    ],
    example: {
      description: "2N3819 N-FET amplifier, +9V supply, R1=1K drain",
      values: { R1: 1000 },
      result: "Test circuit gave Av = 2 (low gain but very high input impedance)",
    },
    notes: "From Mims Basic Semiconductor Circuits. JFET advantage is very high input impedance (megohms) — ideal for high-impedance sources like crystal microphones, piezo pickups, pH probes. 2N3819 is the standard N-channel JFET. For REC: use for buffering high-impedance sensors before ADC input.",
  },

  // ── UJT Oscillator Timing (from Mims Basic Semiconductor) ──
  {
    id: "ujt-oscillator-timing",
    name: "UJT Relaxation Oscillator Frequency",
    category: "ujt",
    formula: "f ≈ 1 / (R1 * C1) (approximate for 2N4891)",
    variables: [
      { symbol: "f", name: "Oscillation frequency", unit: "Hz" },
      { symbol: "R1", name: "Timing resistor", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "UJT oscillator with R1=1M, C1=0.001uF",
      values: { R1: 1000000, C1: 0.000000001 },
      result: "f ≈ 1 / (1M * 1nF) = 1000 Hz",
    },
    notes: "From Mims Basic Semiconductor Circuits. 2N4891 UJT, supply +5 to +18V. Increase R1 to reduce frequency. C1 range: 0.001uF for audio to 470uF for 1-minute timer. UJT fires when emitter voltage reaches ~0.6 * Vbb (intrinsic standoff ratio). For REC: UJTs largely replaced by 555 timers and MCU firmware, but the relaxation oscillator principle applies to many timing circuits. Used in SCR/triac trigger circuits.",
  },

  // ── SCR Holding Current (from Mims Basic Semiconductor) ──
  {
    id: "scr-operation",
    name: "SCR (Silicon Controlled Rectifier) Operation",
    category: "scr",
    formula: "Gate trigger: Ig > Igt; Stays on until: Ia < Ih (holding current)",
    variables: [
      { symbol: "Ig", name: "Gate current", unit: "amps" },
      { symbol: "Igt", name: "Gate trigger current (datasheet)", unit: "amps" },
      { symbol: "Ia", name: "Anode current", unit: "amps" },
      { symbol: "Ih", name: "Holding current (datasheet)", unit: "amps" },
    ],
    notes: "From Mims Basic Semiconductor Circuits. SCR is a solid-state ON-OFF switch. Once triggered by gate current, it stays ON until anode current falls below holding current (Ih). In DC circuits, must interrupt supply to turn off. In AC circuits, turns off naturally at each zero crossing. For REC: used in latching pushbutton switches, crowbar overvoltage protection, light-activated relays. Some SCRs require careful R2 adjustment for reliable operation.",
  },

  // ── Triac Operation (from Mims Basic Semiconductor) ──
  {
    id: "triac-basic-operation",
    name: "Triac Operation (AC Power Control)",
    category: "triac",
    formula: "I_triac = P_lamp / V_line; P = V^2 / R_load",
    variables: [
      { symbol: "I_triac", name: "Triac current rating needed", unit: "amps" },
      { symbol: "P_lamp", name: "Load power", unit: "watts" },
      { symbol: "V_line", name: "AC line voltage", unit: "volts" },
    ],
    example: {
      description: "Control a 100W lamp on 120V AC",
      values: { P_lamp: 100, V_line: 120 },
      result: "I_triac = 100 / 120 = 0.83A — use 1A or higher rated triac",
    },
    notes: "From Mims Basic Semiconductor Circuits. Triac = two SCRs in reverse-parallel. Controls AC power by triggering at variable phase angles. WARNING: triacs work on AC LINE VOLTAGE — all connections must be well insulated, never work on live circuit, use proper enclosure. For REC: used extensively in lamp dimmers, oven controllers, grill temperature controllers. UJT oscillator is classic trigger circuit (controls phase angle = controls power).",
  },

  // ── Pulse Generator Timing (from Mims Basic Semiconductor) ──
  {
    id: "pulse-generator-timing",
    name: "2-Transistor Pulse Generator",
    category: "transistor-switch",
    formula: "Pulse duration ≈ R4 * C1; C1=0.001→5µs, C1=0.01→22µs, C1=0.1→200µs",
    variables: [
      { symbol: "t_pulse", name: "Pulse duration", unit: "seconds" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
      { symbol: "R4", name: "Timing resistor (50 ohm)", unit: "ohms" },
    ],
    notes: "From Mims Basic Semiconductor Circuits. 2N2907 + 2N2222, supply +3 to +15V. R3 controls pulse rate. Amplitude ~10V at 12.5V supply. Risetime ~100nsec. For REC: useful for generating test pulses, trigger signals, and debounce one-shots.",
  },

  // ── Switch Debounce (from Mims Basic Semiconductor) ──
  {
    id: "switch-debounce-rc",
    name: "Transistor Switch Debouncer",
    category: "transistor-switch",
    formula: "Lock-out time ≈ R2 * C1; C1=0.14µF→1 second lock-out",
    variables: [
      { symbol: "t_lock", name: "Debounce lock-out time", unit: "seconds" },
      { symbol: "R2", name: "Timing resistor (4.7K)", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
    ],
    notes: "From Mims Basic Semiconductor Circuits. 2N2222 + 0.14µF + 4.7K. Supplies single clean trigger pulse to logic circuits. Switch alone will 'bounce' causing false pulses. For 220µF cap, lock-out time increases proportionally. For REC: critical for pinball switch inputs (rollover, bumper contacts), encoder inputs, any mechanical switch connected to MCU GPIO. Alternative: use MCU firmware debounce (20-50ms delay) when hardware debounce isn't practical.",
  },

  // ── Decibel Formulas ──
  // From Radio Shack Formulas Tables Basic Circuits, p.10-11

  {
    id: "decibel-power",
    name: "Decibel (Power)",
    category: "amplifier",
    formula: "dB = 10 × log₁₀(P2 / P1)",
    variables: [
      { symbol: "dB", name: "Decibel gain/loss", unit: "dB" },
      { symbol: "P2", name: "Output power", unit: "watts" },
      { symbol: "P1", name: "Input power", unit: "watts" },
    ],
    example: {
      description: "Amplifier with 1mW input and 100mW output",
      values: { P1: 0.001, P2: 0.1 },
      result: "dB = 10 × log₁₀(0.1 / 0.001) = 10 × log₁₀(100) = 10 × 2 = 20dB",
    },
    notes: "Decibels define the RATIO between two signal levels, not absolute value. 3dB = double power, 10dB = 10× power, 20dB = 100× power. Negative dB = attenuation/loss.",
  },
  {
    id: "decibel-voltage",
    name: "Decibel (Voltage/Current)",
    category: "amplifier",
    formula: "dB = 20 × log₁₀(V2 / V1)",
    variables: [
      { symbol: "dB", name: "Decibel gain/loss", unit: "dB" },
      { symbol: "V2", name: "Output voltage (or current)", unit: "volts (or amps)" },
      { symbol: "V1", name: "Input voltage (or current)", unit: "volts (or amps)" },
    ],
    example: {
      description: "Op-amp with R1=1KΩ, R2=1MΩ (gain = R2/R1 = 1000)",
      values: { V1: 1, V2: 1000 },
      result: "dB = 20 × log₁₀(1000/1) = 20 × 3 = 60dB",
    },
    notes: "Same formula applies for current ratio: dB = 20 × log₁₀(I2/I1). Uses factor of 20 (not 10) because power is proportional to voltage² (P = V²/R), so 20 × log(V) = 10 × log(V²) = 10 × log(P). For REC: useful when specifying amplifier gain in audio circuits, receiver sensitivity, and filter attenuation.",
  },
  {
    id: "dbm-power",
    name: "dBm (Power referenced to 1mW)",
    category: "amplifier",
    formula: "dBm = 10 × log₁₀(P / 0.001)",
    variables: [
      { symbol: "dBm", name: "Power level", unit: "dBm" },
      { symbol: "P", name: "Power", unit: "watts" },
    ],
    example: {
      description: "Express 10mW as dBm",
      values: { P: 0.01 },
      result: "dBm = 10 × log₁₀(0.01 / 0.001) = 10 × log₁₀(10) = 10dBm",
    },
    notes: "Absolute power measurement referenced to 1 milliwatt. 0dBm = 1mW, +10dBm = 10mW, -10dBm = 100µW, -30dBm = 1µW. Commonly used for receiver sensitivity specs and RF power levels.",
  },

  // ── Voltage Regulator Formulas ──
  // From Mims Engineer's Notebook

  {
    id: "78xx-current-reg-formula",
    name: "78xx Series Current Regulator",
    category: "current-source",
    formula: "I = Vreg / R1",
    variables: [
      { symbol: "I", name: "Output current", unit: "amps" },
      { symbol: "Vreg", name: "Regulator voltage (5V for 7805, 12V for 7812)", unit: "volts" },
      { symbol: "R1", name: "Current sense resistor", unit: "ohms" },
    ],
    example: {
      description: "7805 as 50mA constant current source",
      values: { Vreg: 5, R1: 100 },
      result: "I = 5V / 100Ω = 50mA",
    },
    notes: "From Mims Engineer's Notebook p.86. Uses fixed voltage regulator as constant current source. Vin must be at least 2V above Vreg + load voltage drop. Max current limited by regulator rating (typically 1.5A).",
  },
  {
    id: "723-low-range-formula",
    name: "723 Voltage Regulator — Low Range (2-7V)",
    category: "voltage-regulator",
    formula: "Vout = Vref × (R2 / (R1 + R2))",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Vref", name: "Internal reference voltage (measure at pin 6, typically 6.8-7.5V)", unit: "volts" },
      { symbol: "R1", name: "Upper divider resistor", unit: "ohms" },
      { symbol: "R2", name: "Lower divider resistor", unit: "ohms" },
    ],
    example: {
      description: "723 set for 5V output with Vref=7.15V",
      values: { Vref: 7.15, R1: 2150, R2: 4990 },
      result: "Vout = 7.15 × (4990 / (2150 + 4990)) = 7.15 × 0.699 = 5.0V",
    },
    notes: "From Mims Engineer's Notebook p.90. Low range configuration — Vref is divided DOWN to set output. R3 (optional) = R1×R2/(R1+R2) provides temperature stability. Max 150mA, extendable to 10A with external pass transistors.",
  },
  {
    id: "723-high-range-formula",
    name: "723 Voltage Regulator — High Range (7-37V)",
    category: "voltage-regulator",
    formula: "Vout = Vref × ((R1 + R2) / R2)",
    variables: [
      { symbol: "Vout", name: "Output voltage", unit: "volts" },
      { symbol: "Vref", name: "Internal reference voltage (measure at pin 6)", unit: "volts" },
      { symbol: "R1", name: "Gain resistor", unit: "ohms" },
      { symbol: "R2", name: "Feedback resistor", unit: "ohms" },
    ],
    example: {
      description: "723 set for 12V output with Vref=7.15V",
      values: { Vref: 7.15, R1: 4870, R2: 7150 },
      result: "Vout = 7.15 × ((4870 + 7150) / 7150) = 7.15 × 1.681 = 12.0V",
    },
    notes: "From Mims Engineer's Notebook p.90. High range configuration — Vref is multiplied UP. Vin must be Vout+5V. R3 optional for temperature stability. Typical high range values: 9V (R1=1.87K, R2=7.15K), 15V (R1=7.87K, R2=7.15K), 28V (R1=21.0K, R2=7.15K).",
  },
  {
    id: "337-negative-regulator-formula",
    name: "337T Adjustable Negative Regulator Output Voltage",
    category: "voltage-regulator",
    formula: "Vout = -1.25V × (1 + R2/120)",
    variables: [
      { symbol: "Vout", name: "Output voltage (negative)", unit: "volts" },
      { symbol: "R2", name: "Adjust resistor to ground", unit: "ohms" },
    ],
    example: {
      description: "337T set for -5V output",
      values: { R2: 360 },
      result: "Vout = -1.25 × (1 + 360/120) = -1.25 × 4 = -5.0V",
    },
    notes: "From Mims Engineer's Notebook p.89. Negative complement to LM317. R1=120Ω fixed from ADJ to OUT. R2 adjustable from ADJ to GND. Range: -1.2 to -37V at up to 1.5A. Pin 1=Adjust, 2=Output, 3=Input. Precision LED regulator: LED I = 1.5V/R1, R2 gives ±15% adjustment.",
  },
  {
    id: "tl431-timer-formula",
    name: "TL431 Timer Delay",
    category: "voltage-regulator",
    formula: "delay = R1 × C1 × ln(9 / (9 - Vref))",
    variables: [
      { symbol: "delay", name: "Time delay", unit: "seconds" },
      { symbol: "R1", name: "Timing resistor", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
      { symbol: "Vref", name: "Reference voltage of TL431 (2.5V)", unit: "volts" },
    ],
    example: {
      description: "TL431 timer with R1=1MΩ, C1=10µF",
      values: { R1: 1000000, C1: 0.00001, Vref: 2.5 },
      result: "delay = 1M × 10µF × ln(9/(9-2.5)) = 10 × ln(1.385) = 10 × 0.325 = 3.25 seconds",
    },
    notes: "From Mims Engineer's Notebook p.91. TL431 used as simple timer — LED glows after delay period. S1 (reset) shorts C1 to restart timing. Circuit operates from +9V. Vref is internal 2.5V reference.",
  },
  {
    id: "lm334-current-source-formula",
    name: "LM334 Adjustable Current Source",
    category: "current-source",
    formula: "Iset = 0.0677 / Rset (at 25°C)",
    variables: [
      { symbol: "Iset", name: "Set current", unit: "amps" },
      { symbol: "Rset", name: "Programming resistor", unit: "ohms" },
    ],
    example: {
      description: "LM334 set for 6.4mA constant current (for LED)",
      values: { Rset: 10 },
      result: "Iset = 0.0677 / 10 = 6.77mA ≈ 6.4mA (at 25°C)",
    },
    notes: "From Mims Engineer's Notebook p.134. Also functions as temperature sensor at 10mV/°K. For constant current LED driver: current is stable for any input between 3-20V. Max current = 10mA. Rset=15Ω gives 4.3mA.",
  },
  {
    id: "567-center-frequency",
    name: "567 Tone Decoder Center Frequency",
    category: "tone-decoder",
    formula: "f₀ = 1.1 / (R × C)",
    variables: [
      { symbol: "f₀", name: "Center frequency", unit: "Hz" },
      { symbol: "R", name: "Timing resistor (2K-20K range)", unit: "ohms" },
      { symbol: "C", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "567 tuned to 1kHz",
      values: { R: 10000, C: 0.00000011 },
      result: "f₀ = 1.1 / (10K × 0.11µF) = 1.1 / 0.0011 = 1000Hz",
    },
    notes: "From Mims Engineer's Notebook p.124. R must be between 2K and 20K. Detection bandwidth is 14% of f₀ (narrower with smaller low-pass cap — down to 2%). Low-pass capacitor should be n/f₀ µF where n=1300 for 14% BW. Supply: +4.75-9.0V. May need 1 second to lock on low frequencies.",
  },
  {
    id: "566-vco-frequency",
    name: "566 VCO Center Frequency",
    category: "vco",
    formula: "f = 2 × (Vcc - Vinput) / (R1 × C1 × Vcc)",
    variables: [
      { symbol: "f", name: "Center frequency", unit: "Hz" },
      { symbol: "Vcc", name: "Supply voltage", unit: "volts" },
      { symbol: "Vinput", name: "Control voltage at pin 5", unit: "volts" },
      { symbol: "R1", name: "Timing resistor", unit: "ohms" },
      { symbol: "C1", name: "Timing capacitor", unit: "farads" },
    ],
    example: {
      description: "566 VCO at Vcc=12V, Vinput=6V",
      values: { Vcc: 12, Vinput: 6, R1: 4700, C1: 0.00000005 },
      result: "f = 2 × (12-6) / (4.7K × 50nF × 12) = 12 / 0.00282 = 4,255Hz",
    },
    notes: "From Mims Engineer's Notebook p.130. IMPORTANT: triangle wave does NOT fall to 0V — at 12V Vcc it cycles between +4V and +6V. Square wave output cycles between +6V and +11.5V. Supply: +9-24V. R2 pot at voltage divider controls frequency via Vinput.",
  },
];
