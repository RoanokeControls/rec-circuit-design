// ── Component & Inventory ──

export interface Component {
  partNumber: string;
  description: string;
  category: ComponentCategory;
  value?: string;
  package: string;
  manufacturer: string;
  eagleLibrary: string;
  eagleDevice: string;
  eaglePackage: string;
  datasheet?: string;
  unitCost?: number;
  altParts?: string[];
  notes?: string;
}

export type ComponentCategory =
  | "resistor"
  | "capacitor"
  | "inductor"
  | "diode"
  | "led"
  | "transistor"
  | "mosfet"
  | "ic-mcu"
  | "ic-regulator"
  | "ic-interface"
  | "ic-sensor"
  | "ic-driver"
  | "ic-protection"
  | "connector"
  | "crystal"
  | "switch"
  | "relay"
  | "fuse"
  | "antenna"
  | "test-point"
  | "mechanical";

export type StockStatus = "abundant" | "adequate" | "low" | "out" | "on-order";

export interface InventoryItem {
  partNumber: string;
  description: string;
  category: ComponentCategory;
  value?: string;
  package: string;
  qtyOnHand: number;
  reelQty: number;
  status: StockStatus;
  feederSlot?: number;
  eagleLibrary: string;
  eagleDevice: string;
  eaglePackage: string;
  unitCost: number;
  altParts?: string[];
  lastUpdated: string;
}

// ── Reference Circuits ──

export interface ReferenceCircuit {
  id: string;
  name: string;
  description: string;
  mcu?: string;
  category: CircuitCategory;
  blocks: CircuitBlock[];
  designRules?: string[];
  sourceProject?: string;
  revision?: string;
  notes?: string;
}

export type CircuitCategory =
  | "mcu-system"
  | "power-supply"
  | "sensor-interface"
  | "communication"
  | "motor-driver"
  | "audio"
  | "display"
  | "wireless"
  | "protection"
  | "custom";

export interface CircuitBlock {
  id: string;
  name: string;
  type: BlockType;
  components: BlockComponent[];
  nets: NetConnection[];
  placementNotes?: string;
  designRules?: string[];
}

export type BlockType =
  | "power-regulation"
  | "usb-interface"
  | "programming-header"
  | "decoupling"
  | "reset"
  | "boot-select"
  | "clock"
  | "antenna"
  | "esd-protection"
  | "level-shifting"
  | "i2c-bus"
  | "spi-bus"
  | "uart"
  | "gpio-header"
  | "adc-input"
  | "dac-output"
  | "motor-driver"
  | "led-driver"
  | "sensor"
  | "connector"
  | "debug"
  | "custom";

export interface BlockComponent {
  refDes: string;
  partNumber?: string;
  eagleLibrary: string;
  eagleDevice: string;
  eaglePackage: string;
  value?: string;
  description: string;
  critical?: boolean;
  inventoryPreferred?: boolean;
}

export interface NetConnection {
  name: string;
  from: PinRef;
  to: PinRef[];
  traceWidth?: string;
  notes?: string;
}

export interface PinRef {
  refDes: string;
  pin: string;
}

// ── Power Supply ──

export interface PowerSupplyDesign {
  id: string;
  name: string;
  topology: "ldo" | "buck" | "boost" | "buck-boost" | "charge-pump" | "battery-charger";
  inputVoltage: VoltageRange;
  outputVoltage: number;
  outputCurrent: number;
  components: BlockComponent[];
  nets: NetConnection[];
  thermalNotes?: string;
  efficiency?: string;
  notes?: string;
}

export interface VoltageRange {
  min: number;
  typ: number;
  max: number;
}

// ── Protection ──

export interface ProtectionCircuit {
  id: string;
  name: string;
  type: "esd" | "tvs" | "fuse" | "polarity" | "overvoltage" | "overcurrent" | "surge";
  interface: string;
  components: BlockComponent[];
  nets: NetConnection[];
  rating?: string;
  certRelevant?: boolean;
  notes?: string;
}

// ── Design Rules ──

export interface DesignRule {
  id: string;
  category: DesignRuleCategory;
  rule: string;
  reasoning: string;
  applies?: string[];
  exceptions?: string;
  sourceProject?: string;
  severity: "must" | "should" | "prefer";
  status: "approved" | "pending";
  addedBy?: string;
  addedDate: string;
}

export type DesignRuleCategory =
  | "power-integrity"
  | "signal-integrity"
  | "thermal"
  | "emc"
  | "protection"
  | "reliability"
  | "component-selection"
  | "layout"
  | "manufacturing"
  | "testability";

// ── Lessons Learned ──

export interface LessonLearned {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  whatHappened: string;
  rootCause: string;
  fix: string;
  affectedComponents?: string[];
  affectedCircuits?: string[];
  sourceProject?: string;
  severity: "critical" | "major" | "minor";
  status: "approved" | "pending";
  addedBy?: string;
  addedDate: string;
}

export type LessonCategory =
  | "field-failure"
  | "certification"
  | "manufacturing"
  | "assembly"
  | "thermal"
  | "emc"
  | "supplier"
  | "design-error"
  | "component-issue";

// ── Component Notes ──

export interface ComponentNote {
  id: string;
  partNumber: string;
  note: string;
  type: "warning" | "tip" | "eol" | "substitute" | "quality" | "lead-time";
  addedBy?: string;
  addedDate: string;
  status: "approved" | "pending";
}

// ── Substitution Rules ──

export interface SubstitutionRule {
  id: string;
  originalPart: string;
  substitutePart: string;
  conditions: string;
  verified: boolean;
  verifiedOn?: string;
  limitations?: string;
  status: "approved" | "pending";
  addedBy?: string;
  addedDate: string;
}

// ── DFM (Design for Manufacturing) ──

export interface DfmRule {
  id: string;
  category: "pick-and-place" | "reflow" | "wave" | "panelization" | "stencil" | "inspection" | "test";
  rule: string;
  reasoning: string;
  machineSpecific?: string;
  packageAffected?: string[];
  severity: "must" | "should" | "prefer";
}

// ── Derating ──

export interface DeratingRule {
  id: string;
  componentType: ComponentCategory;
  package?: string;
  maxRatio: number;
  description: string;
  reasoning: string;
  exceptions?: string;
}

// ── Vendor Preferences ──

export interface VendorPreference {
  manufacturer: string;
  category: ComponentCategory;
  tier: "preferred" | "acceptable" | "avoid";
  reasoning: string;
  leadTime?: string;
}

// ── Mined Design Knowledge ──

export interface DecouplingPattern {
  id: string;
  icValue: string;
  icCategory: "regulator" | "mcu" | "interface" | "driver" | "other";
  occurrences: number;
  caps: {
    role: string;
    preferredValue: string;
    values: string[];
    medianDistanceMm: number;
    p25Mm: number;
    p75Mm: number;
    count: number;
  }[];
  designRule: string;
  sourceDesigns: string[];
}

export interface MinedPowerSupply {
  id: string;
  regulator: string;
  topology: "ldo" | "buck" | "boost" | "ac-dc" | "linear";
  occurrences: number;
  inputNets: Record<string, number>;
  outputNets: Record<string, number>;
  components: {
    role: string;
    preferredValue: string;
    values: string[];
    count: number;
  }[];
  sourceDesigns: string[];
}

export interface TriacCircuit {
  design: string;
  triacs: { name: string; value: string }[];
  optos: { name: string; value: string }[];
  snubber_caps: number;
}

export interface EmcComponent {
  type: string;
  count: number;
  values: Record<string, number>;
  designCount: number;
}

export interface McuProfile {
  id: string;
  family: string;
  partNumber: string;
  occurrences: number;
  voltage: string;
  crystals: { value: string; count: number }[];
  decouplingCaps: { value: string; count: number }[];
  resetCircuit: { pullupValue: string; capValue: string };
  programmingInterface: string;
  usbBridge: string | null;
  commonPairings: string[];
  busInterfaces?: Record<string, number>;
  sourceDesigns: string[];
}

export interface PullupPattern {
  id: string;
  busType: string;
  resistorValue: string;
  occurrences: number;
  medianDistanceToMcuMm: number;
  placementNote: string;
  powerNet: string;
  sourceDesigns: string[];
}

export interface RoutingPractice {
  id: string;
  category: "trace-width" | "via-stitching" | "net-class" | "layer-usage";
  netName: string;
  description: string;
  metric: number;
  unit: string;
  sampleSize: number;
  percentiles?: { p25: number; p50: number; p75: number; p90: number };
}

export interface PlacementConvention {
  id: string;
  category: "density" | "connector-edge" | "mounting-hole" | "spacing" | "adapter";
  description: string;
  metric: number;
  unit: string;
  sampleSize: number;
}

export interface SilkscreenConvention {
  id: string;
  category: "text-size" | "font" | "part-number" | "smash-rate" | "layer-usage";
  description: string;
  value: string;
  layer?: number;
  occurrences: number;
}

// ── Extended Mined Knowledge ──

export interface PicAdDesign {
  design: string;
  partNumber: string;
  elementName: string;
  totalPins: number;
  pinSummary: Record<string, number>;
  allPins?: { pin: string; net: string; function: string; detail: string | null; connectedParts?: string[] }[];
  analogPins: { pin: string; net: string; function: string; detail: string | null; connectedParts?: string[] }[];
  digitalOutputs: { pin: string; net: string; function: string; detail: string | null; connectedParts?: string[] }[];
  communications: { pin: string; net: string; function: string; detail: string | null; connectedParts?: string[] }[];
}

export interface TriacDeepDesign {
  design: string;
  triacCount: number;
  mcuCount?: number;
  triacModels: string[];
  circuits: {
    triac: string;
    triacRef: string;
    gateNet: string | null;
    loadNet?: string | null;
    lineNet?: string | null;
    gateComponents: { name: string; value: string; role: string }[];
    snubbers: { name: string; value: string }[];
    optos: { name: string; value: string }[];
    driveMcu: string | null;
    drivePin: string | null;
  }[];
  optos: { name: string; value: string }[];
  snubberCaps: { name: string; value: string }[];
  diodes?: { name: string; value: string }[];
  inductors?: { name: string; value: string }[];
  varistors: { name: string; value: string }[];
  fuses: { name: string; value: string }[];
}

export interface DisplayDesign {
  design: string;
  displays: {
    type: string;
    value: string;
    ref: string;
    interface: string;
    driveMcu: string | null;
    connectedNets: number;
  }[];
  drivers: { name: string; value: string; type: string }[];
  contrastPots: { name: string; value: string }[];
  backlightComponents?: unknown[];
  mcuCount?: number;
}

export interface PowerCapacityBoard {
  design: string;
  regulators: {
    name: string;
    part: string;
    currentMa: number | null;
    topology: string;
    outputVoltage: string | null;
  }[];
  totalSupplyCapacityMa: number;
  loads: Record<string, number>;
  estimatedLoadMa: number;
  headroomMa: number | null;
  componentCount: number;
}

export interface RelayDesign {
  design: string;
  relayCount: number;
  solenoidCount?: number;
  motorCount?: number;
  relays: {
    relay: string;
    value: string;
    driverChain: { type: string; value?: string; mcu?: string; pin?: string | null }[];
    hasFlyback: boolean;
  }[];
  driverICs: { name: string; value: string }[];
  transistors?: { name: string; value: string }[];
  flybackDiodes?: { name: string; value: string }[];
}

export interface CommInterfaceDesign {
  design: string;
  interfaceCount?: number;
  interfaces: {
    type: string;
    part: string;
    ref: string;
    pins?: { pin: string; net: string }[];
    biasResistors?: { name: string; value: string; net: string }[];
    esdProtection: { name: string; value: string; net: string }[];
    termination: { name: string; value: string; net: string }[];
  }[];
  mcus: { name: string; value: string }[];
}

export interface SensorDesign {
  design: string;
  sensorCount?: number;
  sensors: { name: string; value: string; type: string; net?: string }[];
  optoInputs: { name: string; value: string }[];
  opamps: { name: string; value: string }[];
  voltageRefs: { name: string; value: string }[];
  mcuConnections: {
    sensor: string;
    sensorType: string;
    mcuPin: string;
    net: string;
    mcu: string;
  }[];
}

export interface LedDesign {
  design: string;
  ledCount: number;
  leds: {
    ref: string;
    value: string;
    color: string;
    limitingResistors: { name: string; value: string }[];
    mcuDrive: { mcu: string; pin: string } | null;
  }[];
  drivers: { name: string; value: string }[];
}

export interface ProtectionDesign {
  design: string;
  tvsDiodes: {
    ref: string;
    value: string;
    protectedSignal: string;
    distanceToConnectorMm: number | null;
    nearestConnector: string | null;
  }[];
  zeners: { name: string; value: string }[];
  varistors: { name: string; value: string }[];
  fuses: { name: string; value: string }[];
  polarityProtection: { name: string; value: string; type: string }[];
}

export interface TestPointDesign {
  design: string;
  testPointCount?: number;
  testPoints: { name: string; net: string; category: string }[];
  debugHeaders: { name: string; value: string; type: string; nets: string[] }[];
  icspConnectors: { name: string; value: string; nets: string[]; pinCount: number }[];
}

export interface BoardSummary {
  design: string;
  dimensions: { widthMm: number; heightMm: number };
  areaMm2: number;
  componentCount: number;
  densityPartsCm2: number;
  copperLayers: number;
  smdCount: number;
  thtCount: number;
  smdRatio: number;
  signalNets: number;
  mcuFamilies: string[];
  mcuCount: number;
  regulators: string[];
  hasTriacs: boolean;
  hasRelays: boolean;
  hasDisplay: boolean;
  hasSensors: boolean;
  commInterfaces: string[];
  ledCount: number;
  totalIoPins: number;
  complexity: number;
  hasSchematic: boolean;
  componentTypes: Record<string, number>;
}

export interface ProgrammingInterface {
  id: string;
  name: string;
  type: "pogo" | "tag-connect" | "icsp" | "swd" | "jtag" | "uart-boot";
  mcuFamilies: string[];
  pinCount: number;
  pitch?: number;
  pins: {
    pin: number;
    function: string;
    mcuPin: string;
    notes?: string;
  }[];
  footprint?: string;
  libraryFile?: string;
  description: string;
  protocol: string;
  notes?: string;
}

// ── Eagle SCR Generation ──

export interface ScrCommand {
  command: string;
  comment?: string;
}

export interface SchematicLayout {
  blocks: PlacedBlock[];
  globalNets: NetConnection[];
  sheetSize: "A4" | "A3" | "A2" | "letter" | "tabloid";
}

export interface PlacedBlock {
  block: CircuitBlock;
  originX: number;
  originY: number;
  label?: string;
}
