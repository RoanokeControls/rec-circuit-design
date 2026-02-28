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
