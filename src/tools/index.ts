import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// ── Lookup & Reference Tools ──
import { registerLookupReferenceCircuit } from "./lookup-reference-circuit.js";
import { registerLookupComponent } from "./lookup-component.js";
import { registerSuggestPowerSupply } from "./suggest-power-supply.js";
import { registerSuggestSubstitution } from "./suggest-substitution.js";
import { registerCheckDesignRules } from "./check-design-rules.js";
import { registerCheckInventory } from "./check-inventory.js";

// ── Planning & Optimization Tools ──
import { registerPlanSchematic } from "./plan-schematic.js";
import { registerOptimizeForInventory } from "./optimize-for-inventory.js";

// ── Generation Tools ──
import { registerGenerateSchematicScript } from "./generate-schematic-script.js";
import { registerGenerateBom } from "./generate-bom.js";
import { registerGenerateCustomLibrary } from "./generate-custom-library.js";

// ── Production & Costing Tools ──
import { registerEstimateBoardCost } from "./estimate-board-cost.js";
import { registerPlanProductionRun } from "./plan-production-run.js";

// ── Pricing Tools ──
import { registerLookupPricing } from "./lookup-pricing.js";
import { registerPriceBom } from "./price-bom.js";

// ── Mined Knowledge Tools ──
import { registerLookupDecouplingPattern } from "./lookup-decoupling-pattern.js";
import { registerLookupPowerTopology } from "./lookup-power-topology.js";
import { registerLookupMcuProfile } from "./lookup-mcu-profile.js";
import { registerLookupPullupPractice } from "./lookup-pullup-practice.js";
import { registerLookupRoutingPractice } from "./lookup-routing-practice.js";
import { registerCheckPlacementDensity } from "./check-placement-density.js";
import { registerLookupBoardConvention } from "./lookup-board-convention.js";

// ── Extended Mined Knowledge Tools ──
import { registerLookupPicConnections } from "./lookup-pic-connections.js";
import { registerLookupTriacCircuit } from "./lookup-triac-circuit.js";
import { registerLookupDisplayCircuit } from "./lookup-display-circuit.js";
import { registerLookupPowerCapacity } from "./lookup-power-capacity.js";
import { registerLookupRelayCircuit } from "./lookup-relay-circuit.js";
import { registerLookupCommInterface } from "./lookup-comm-interface.js";
import { registerLookupSensorCircuit } from "./lookup-sensor-circuit.js";
import { registerLookupLedCircuit } from "./lookup-led-circuit.js";
import { registerLookupProtectionCircuit } from "./lookup-protection-circuit.js";
import { registerLookupTestpoints } from "./lookup-testpoints.js";
import { registerLookupBoardDesign } from "./lookup-board-design.js";
import { registerLookupProgrammingInterface } from "./lookup-programming-interface.js";

// ── Knowledge Input Tools (for engineers on the floor) ──
import { registerAddLessonLearned } from "./add-lesson-learned.js";
import { registerAddDesignRule } from "./add-design-rule.js";
import { registerAddComponentNote } from "./add-component-note.js";
import { registerFlagComponent } from "./flag-component.js";
import { registerAddSubstitutionRule } from "./add-substitution-rule.js";
import { registerUpdateInventory } from "./update-inventory.js";

export function registerAllTools(server: McpServer) {
  // Lookup & Reference (6)
  registerLookupReferenceCircuit(server);
  registerLookupComponent(server);
  registerSuggestPowerSupply(server);
  registerSuggestSubstitution(server);
  registerCheckDesignRules(server);
  registerCheckInventory(server);

  // Planning & Optimization (2)
  registerPlanSchematic(server);
  registerOptimizeForInventory(server);

  // Generation (3)
  registerGenerateSchematicScript(server);
  registerGenerateBom(server);
  registerGenerateCustomLibrary(server);

  // Production & Costing (2)
  registerEstimateBoardCost(server);
  registerPlanProductionRun(server);

  // Pricing (2)
  registerLookupPricing(server);
  registerPriceBom(server);

  // Mined Knowledge — Core (7)
  registerLookupDecouplingPattern(server);
  registerLookupPowerTopology(server);
  registerLookupMcuProfile(server);
  registerLookupPullupPractice(server);
  registerLookupRoutingPractice(server);
  registerCheckPlacementDensity(server);
  registerLookupBoardConvention(server);

  // Mined Knowledge — Extended (12)
  registerLookupPicConnections(server);
  registerLookupTriacCircuit(server);
  registerLookupDisplayCircuit(server);
  registerLookupPowerCapacity(server);
  registerLookupRelayCircuit(server);
  registerLookupCommInterface(server);
  registerLookupSensorCircuit(server);
  registerLookupLedCircuit(server);
  registerLookupProtectionCircuit(server);
  registerLookupTestpoints(server);
  registerLookupBoardDesign(server);
  registerLookupProgrammingInterface(server);

  // Knowledge Input (6)
  registerAddLessonLearned(server);
  registerAddDesignRule(server);
  registerAddComponentNote(server);
  registerFlagComponent(server);
  registerAddSubstitutionRule(server);
  registerUpdateInventory(server);
}
