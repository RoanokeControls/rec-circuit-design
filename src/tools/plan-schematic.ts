import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  referenceCircuits, powerSupplies, protectionCircuits, designRules, lessonsLearned,
  mcuProfiles, minedPowerSupplies, boardSummaries, minedDecoupling,
  programmingInterfaces, protectionDesigns, commInterfaceDesigns,
  displayDesigns, sensorDesigns, relayDesigns, ledDesigns,
  getLayoutPattern,
} from "../knowledge/index.js";
import { getInventory } from "../utils/inventory-fetcher.js";
import type {
  McuProfile, MinedPowerSupply, BoardSummary, InventoryItem,
} from "../types/index.js";

// ── Helpers ──

function fuzzyMatch(needle: string, haystack: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function findMcuProfile(mcu: string): McuProfile | undefined {
  const lower = mcu.toLowerCase();
  // Try exact part number first, then family match
  return mcuProfiles.find(p => fuzzyMatch(lower, p.partNumber))
    ?? mcuProfiles.find(p => fuzzyMatch(lower, p.family))
    ?? mcuProfiles.find(p => lower.includes(p.family.toLowerCase()));
}

function findMinedPower(powerSource: string, targetVoltage?: number): MinedPowerSupply[] {
  const lower = powerSource.toLowerCase();
  const isHighVoltage = lower.includes("12v") || lower.includes("24v") || lower.includes("barrel");
  const isUsb = lower.includes("usb");
  const isBattery = lower.includes("lipo") || lower.includes("battery");

  return minedPowerSupplies
    .filter(ps => {
      if (isHighVoltage) return ps.topology === "buck" || ps.topology === "linear";
      if (isUsb) return ps.outputNets["+3.3V"] || ps.outputNets["+5V"];
      if (isBattery) return ps.topology === "buck" || ps.topology === "ldo";
      return true;
    })
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, 3);
}

function scoreBoardSimilarity(
  board: BoardSummary,
  mcuFamily: string,
  interfaces: string[],
  features: string[],
): number {
  let score = 0;

  // MCU family match (strongest signal)
  if (board.mcuFamilies.some(f => fuzzyMatch(mcuFamily, f))) score += 40;

  // Interface matches
  const ifaceLower = interfaces.map(i => i.toLowerCase());
  for (const iface of ifaceLower) {
    if (board.commInterfaces.some(ci => fuzzyMatch(iface.split(" ")[0], ci))) score += 10;
    if (iface.includes("display") && board.hasDisplay) score += 10;
    if (iface.includes("sensor") && board.hasSensors) score += 5;
    if (iface.includes("relay") && board.hasRelays) score += 10;
    if (iface.includes("led") && board.ledCount > 0) score += 5;
  }

  // Feature matches
  const featLower = (features ?? []).map(f => f.toLowerCase());
  for (const feat of featLower) {
    if (feat.includes("rs485") && board.commInterfaces.includes("RS485")) score += 15;
    if (feat.includes("rs232") && board.commInterfaces.includes("RS232")) score += 15;
    if (feat.includes("triac") && board.hasTriacs) score += 15;
    if (feat.includes("relay") && board.hasRelays) score += 15;
    if (feat.includes("display") && board.hasDisplay) score += 10;
    if (feat.includes("sensor") && board.hasSensors) score += 5;
    if (feat.includes("motor") && board.componentTypes?.["ic-driver"]) score += 10;
  }

  // Slight bonus for boards with schematics (more useful as references)
  if (board.hasSchematic) score += 3;

  return score;
}

function findSimilarDesigns(
  mcu: string,
  interfaces: string[],
  features: string[],
): { design: string; score: number; mcuFamilies: string[]; regulators: string[]; commInterfaces: string[]; complexity: number; componentCount: number }[] {
  const mcuFamily = mcu.replace(/[-_]\w+$/, ""); // e.g. "PIC18F46K22" -> "PIC18F46K22", "ESP32-S3" -> "ESP32"
  return boardSummaries
    .map(b => ({
      design: b.design,
      score: scoreBoardSimilarity(b, mcuFamily, interfaces, features),
      mcuFamilies: b.mcuFamilies,
      regulators: b.regulators,
      commInterfaces: b.commInterfaces,
      complexity: b.complexity,
      componentCount: b.componentCount,
    }))
    .filter(b => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function findCommInterfaces(interfaces: string[], features: string[]): typeof commInterfaceDesigns {
  const allTerms = [...interfaces, ...(features ?? [])].map(s => s.toLowerCase());
  const commKeywords = ["rs485", "rs232", "can", "modbus", "uart", "spi", "i2c", "usb"];
  const matched = allTerms.filter(t => commKeywords.some(k => t.includes(k)));
  if (!matched.length) return [];

  return commInterfaceDesigns.filter(d =>
    d.interfaces.some(iface =>
      matched.some(m => fuzzyMatch(m, iface.type))
    )
  ).slice(0, 5);
}

function findDisplayCircuits(interfaces: string[], features: string[]) {
  const allTerms = [...interfaces, ...(features ?? [])].map(s => s.toLowerCase());
  if (!allTerms.some(t => t.includes("display") || t.includes("lcd") || t.includes("oled"))) return [];
  return displayDesigns.slice(0, 3);
}

function findSensorCircuits(interfaces: string[], features: string[]) {
  const allTerms = [...interfaces, ...(features ?? [])].map(s => s.toLowerCase());
  if (!allTerms.some(t => t.includes("sensor") || t.includes("temperature") || t.includes("humidity") || t.includes("adc"))) return [];
  return sensorDesigns.slice(0, 3);
}

function findRelayCircuits(features: string[]) {
  const terms = (features ?? []).map(s => s.toLowerCase());
  if (!terms.some(t => t.includes("relay") || t.includes("solenoid"))) return [];
  return relayDesigns.slice(0, 3);
}

function findLedCircuits(interfaces: string[], features: string[]) {
  const allTerms = [...interfaces, ...(features ?? [])].map(s => s.toLowerCase());
  if (!allTerms.some(t => t.includes("led") || t.includes("indicator"))) return [];
  return ledDesigns.slice(0, 3);
}

function findProtectionPatterns(interfaces: string[], features: string[]) {
  const allTerms = [...interfaces, ...(features ?? [])].map(s => s.toLowerCase());
  const hasComm = allTerms.some(t => ["rs485", "rs232", "can", "usb"].some(k => t.includes(k)));
  const hasHighVoltage = allTerms.some(t => ["12v", "24v", "mains", "ac", "triac"].some(k => t.includes(k)));
  if (!hasComm && !hasHighVoltage) return [];
  return protectionDesigns
    .filter(d => d.tvsDiodes.length > 0 || d.fuses.length > 0 || d.varistors.length > 0)
    .slice(0, 5);
}

function buildMcuSection(profile: McuProfile) {
  // Find programming interface details
  const progIface = programmingInterfaces.find(p =>
    fuzzyMatch(profile.programmingInterface, p.name) ||
    fuzzyMatch(profile.programmingInterface, p.type)
  );

  // Find MCU-specific decoupling from mined data
  const mcuDecoupling = minedDecoupling.find(d =>
    fuzzyMatch(profile.partNumber, d.icValue) ||
    fuzzyMatch(profile.family, d.icValue)
  );

  return {
    partNumber: profile.partNumber,
    family: profile.family,
    usedIn: `${profile.occurrences} deployed designs`,
    voltage: profile.voltage,
    decouplingCaps: profile.decouplingCaps,
    detailedDecoupling: mcuDecoupling ? mcuDecoupling.caps.map(c => ({
      role: c.role,
      preferredValue: c.preferredValue,
      placementMm: c.medianDistanceMm,
    })) : undefined,
    resetCircuit: profile.resetCircuit,
    crystals: profile.crystals.length > 0 ? profile.crystals : "no crystal (internal oscillator)",
    programmingInterface: {
      type: profile.programmingInterface,
      ...(progIface ? {
        connector: progIface.footprint ?? progIface.type,
        pinCount: progIface.pinCount,
        pins: progIface.pins,
        protocol: progIface.protocol,
      } : {}),
    },
    usbBridge: profile.usbBridge,
    commonPairings: profile.commonPairings,
    busInterfaces: profile.busInterfaces,
    sourceDesigns: profile.sourceDesigns,
  };
}

function buildMinedPowerSection(supplies: MinedPowerSupply[]) {
  return supplies.map(ps => ({
    regulator: ps.regulator,
    topology: ps.topology,
    usedIn: `${ps.occurrences} designs`,
    inputNets: ps.inputNets,
    outputNets: ps.outputNets,
    components: ps.components.map(c => ({
      role: c.role,
      preferredValue: c.preferredValue,
      alternatives: c.values.length > 1 ? c.values : undefined,
    })),
    sourceDesigns: ps.sourceDesigns.slice(0, 3),
  }));
}

// ── Tool Registration ──

export function registerPlanSchematic(server: McpServer) {
  server.tool(
    "plan-schematic",
    "Plan a complete schematic from high-level requirements. Matches against 261 real deployed designs to recommend proven MCU support circuits, power supplies, interfaces, and protection. Returns actionable guidance with specific component values from production boards.",
    {
      mcu: z.string().describe("MCU or module (e.g. 'PIC18F46K22', 'ESP32-S3', 'STM32F411')"),
      powerSource: z.string().describe("Power source (e.g. 'USB 5V', 'LiPo 3.7V', '12V barrel jack', '24V industrial')"),
      interfaces: z.array(z.string()).describe("Required interfaces (e.g. ['USB-C', 'I2C', 'SPI display', 'RS485', '3x GPIO header'])"),
      features: z.array(z.string()).optional().describe("Additional features (e.g. ['battery charging', 'relay outputs', 'RS485', 'triac', 'display'])"),
      boardQty: z.number().optional().default(100).describe("Expected production quantity for inventory check"),
    },
    async ({ mcu, powerSource, interfaces, features = [], boardQty }) => {
      const inventory = await getInventory();
      const mcuLower = mcu.toLowerCase();

      // ── 1. Hand-curated reference circuit (primary) ──
      const refCircuit = referenceCircuits.find(
        rc => rc.mcu?.toLowerCase().includes(mcuLower) || rc.id.toLowerCase().includes(mcuLower)
      );

      // ── 2. Hand-curated power supply ──
      const isUsb = powerSource.toLowerCase().includes("usb");
      const isBattery = powerSource.toLowerCase().includes("lipo") || powerSource.toLowerCase().includes("battery");
      const curatedPower = powerSupplies.filter(ps => {
        if (isUsb) return ps.inputVoltage.typ === 5.0;
        if (isBattery) return ps.topology !== "ldo";
        return true;
      });

      // ── 3. Hand-curated protection ──
      const curatedProtection = protectionCircuits.filter(pc =>
        interfaces.some(iface => pc.interface.toLowerCase().includes(iface.toLowerCase().split(" ")[0]))
      );

      // ── 4. Mined MCU profile ──
      const mcuProfile = findMcuProfile(mcu);

      // ── 5. Mined power supplies (fallback when curated is empty) ──
      const minedPower = findMinedPower(powerSource);

      // ── 6. Similar existing designs from 261 boards ──
      const similarDesigns = findSimilarDesigns(mcu, interfaces, features);

      // ── 7. Interface-specific mined data ──
      const commCircuits = findCommInterfaces(interfaces, features);
      const displayCircuits = findDisplayCircuits(interfaces, features);
      const sensorCircuits = findSensorCircuits(interfaces, features);
      const relayCircuits = findRelayCircuits(features);
      const ledCircuits = findLedCircuits(interfaces, features);
      const protectionPatterns = findProtectionPatterns(interfaces, features);

      // ── 8. Design rules and lessons learned ──
      const relevantRules = designRules.filter(dr =>
        dr.applies?.some(a => fuzzyMatch(mcuLower, a)) ||
        dr.category === "power-integrity" ||
        dr.category === "manufacturing"
      );

      const relevantLessons = lessonsLearned.filter(ll =>
        ll.affectedComponents?.some(c => fuzzyMatch(mcuLower, c)) ||
        ll.category === "design-error" ||
        ll.category === "field-failure"
      );

      // ── 9. Inventory check for curated components ──
      const allCuratedDevices: string[] = [];
      if (refCircuit) {
        refCircuit.blocks.forEach(b => b.components.forEach(c => { if (c.eagleDevice) allCuratedDevices.push(c.eagleDevice); }));
      }
      curatedPower.forEach(ps => ps.components.forEach(c => { if (c.eagleDevice) allCuratedDevices.push(c.eagleDevice); }));

      const inventoryStatus = allCuratedDevices.map(device => {
        const inv = inventory.find((i: InventoryItem) => i.eagleDevice === device);
        return {
          device,
          inStock: inv ? inv.status : "not-in-inventory",
          qtyOnHand: inv?.qtyOnHand ?? 0,
          sufficient: inv ? inv.qtyOnHand >= boardQty : false,
        };
      });

      // ── Build plan ──

      const plan: Record<string, unknown> = {
        summary: `${mcu} board with ${powerSource} power, ${interfaces.length} interfaces, ${features.length} features`,

        // MCU support circuit
        mcuSupport: refCircuit
          ? {
              source: "hand-curated reference circuit",
              id: refCircuit.id,
              name: refCircuit.name,
              blocks: refCircuit.blocks.map(b => ({ name: b.name, type: b.type, components: b.components.length })),
              notes: refCircuit.notes,
            }
          : mcuProfile
            ? {
                source: `mined from ${mcuProfile.occurrences} deployed designs`,
                ...buildMcuSection(mcuProfile),
              }
            : { source: "none", note: `No reference circuit or mined profile for ${mcu}. Check mcuProfiles with lookup-mcu-profile.` },

        // Power supply
        powerSupply: curatedPower.length > 0
          ? {
              source: "hand-curated",
              options: curatedPower.map(ps => ({
                id: ps.id, name: ps.name, topology: ps.topology, notes: ps.notes,
              })),
            }
          : minedPower.length > 0
            ? {
                source: `mined from 261 designs`,
                proven: buildMinedPowerSection(minedPower),
              }
            : { source: "none", note: "No matching power supply found. Specify voltage requirements." },

        // Protection
        protection: curatedProtection.length > 0
          ? {
              source: "hand-curated",
              circuits: curatedProtection.map(pc => ({
                id: pc.id, name: pc.name, interface: pc.interface, certRelevant: pc.certRelevant,
              })),
            }
          : protectionPatterns.length > 0
            ? {
                source: "mined from real designs",
                patterns: protectionPatterns.map(d => ({
                  design: d.design,
                  tvsDiodes: d.tvsDiodes.map(t => ({ value: t.value, protects: t.protectedSignal })),
                  fuses: d.fuses.map(f => f.value),
                  varistors: d.varistors.map(v => v.value),
                })),
              }
            : undefined,

        // Similar existing designs
        similarDesigns: similarDesigns.length > 0
          ? {
              note: "These deployed boards have similar requirements. Use lookup-board-design for full details.",
              matches: similarDesigns.map(d => ({
                design: d.design,
                similarityScore: d.score,
                mcuFamilies: d.mcuFamilies,
                regulators: d.regulators,
                commInterfaces: d.commInterfaces,
                componentCount: d.componentCount,
                complexity: d.complexity,
              })),
            }
          : undefined,

        // Interface recommendations from mined data
        interfaceCircuits: (() => {
          const section: Record<string, unknown> = {};
          if (commCircuits.length > 0) {
            section.communication = commCircuits.map(d => ({
              design: d.design,
              interfaces: d.interfaces.map(i => ({
                type: i.type,
                transceiver: i.part,
                esdProtection: i.esdProtection.map(e => e.value),
                termination: i.termination.map(t => t.value),
                biasResistors: i.biasResistors?.map(b => ({ value: b.value, net: b.net })),
              })),
            }));
          }
          if (displayCircuits.length > 0) {
            section.displays = displayCircuits.map(d => ({
              design: d.design,
              displays: d.displays.map(disp => ({
                type: disp.type, value: disp.value, interface: disp.interface, driveMcu: disp.driveMcu,
              })),
              drivers: d.drivers.map(dr => ({ value: dr.value, type: dr.type })),
            }));
          }
          if (sensorCircuits.length > 0) {
            section.sensors = sensorCircuits.map(d => ({
              design: d.design,
              sensors: d.sensors.map(s => ({ value: s.value, type: s.type })),
              conditioning: d.opamps.length > 0 ? d.opamps.map(o => o.value) : undefined,
            }));
          }
          if (relayCircuits.length > 0) {
            section.relays = relayCircuits.map(d => ({
              design: d.design,
              relayCount: d.relayCount,
              relays: d.relays.map(r => ({
                value: r.value, hasFlyback: r.hasFlyback,
                driverChain: r.driverChain.map(dc => ({ type: dc.type, value: dc.value })),
              })),
              driverICs: d.driverICs.map(ic => ic.value),
            }));
          }
          if (ledCircuits.length > 0) {
            section.leds = ledCircuits.map(d => ({
              design: d.design,
              ledCount: d.ledCount,
              leds: d.leds.slice(0, 5).map(l => ({
                color: l.color, value: l.value,
                resistor: l.limitingResistors[0]?.value,
              })),
            }));
          }
          return Object.keys(section).length > 0 ? section : undefined;
        })(),

        // Inventory status
        inventoryCheck: {
          boardQty,
          allSufficient: inventoryStatus.every(is => is.sufficient),
          shortages: inventoryStatus.filter(is => !is.sufficient),
          note: inventoryStatus.length === 0
            ? "No curated components to check. Use check-inventory on final BOM."
            : undefined,
        },

        // Design rules and warnings
        applicableRules: relevantRules.map(dr => ({
          severity: dr.severity, rule: dr.rule,
        })),
        warnings: relevantLessons.map(ll => ({
          severity: ll.severity, title: ll.title, fix: ll.fix,
        })),

        // Board layout guidance from 206 real boards
        layoutGuidance: (() => {
          const dims = getLayoutPattern("layout-board-dimensions");
          const drc = getLayoutPattern("layout-design-rules");
          const orient = getLayoutPattern("layout-orientations");
          const mcuZone = getLayoutPattern("layout-mcu-placement");
          const regZone = getLayoutPattern("layout-regulator-placement");
          const connZone = getLayoutPattern("layout-connector-edge-proximity");
          const vias = getLayoutPattern("layout-via-patterns");
          const holes = getLayoutPattern("layout-mounting-holes");
          const d = dims?.data as Record<string, unknown> | undefined;
          const dr = drc?.data as Record<string, unknown> | undefined;
          const o = orient?.data as Record<string, unknown> | undefined;
          return {
            boardSize: d ? {
              medianWidthMm: (d.widthMm as Record<string, number>)?.p50,
              medianHeightMm: (d.heightMm as Record<string, number>)?.p50,
              medianAspectRatio: (d.aspectRatio as Record<string, number>)?.p50,
            } : undefined,
            designRuleDefaults: dr ? {
              clearanceWireWireMm: (dr.clearances as Record<string, Record<string, number>>)?.wire_wire?.p50,
              minTraceWidthMm: (dr.minTraceWidth as Record<string, number>)?.p50,
              minDrillMm: (dr.minDrill as Record<string, number>)?.p50,
            } : undefined,
            placementConventions: {
              componentOrientation: o ? `${(o as Record<string, unknown>).cardinalAlignedPct}% use 0/90/180/270° only` : undefined,
              topSidePlacement: o ? `${(o as Record<string, unknown>).topSidePct}% of components on top` : undefined,
              mcuPlacement: (mcuZone?.data as Record<string, unknown>)?.note,
              regulatorPlacement: (regZone?.data as Record<string, unknown>)?.note,
              connectorEdge: connZone ? `${((connZone.data as Record<string, unknown>).within10mmPct)}% of connectors within 10mm of board edge` : undefined,
            },
            viaDrill: ((vias?.data as Record<string, unknown>)?.drillSizes as {value: number}[])?.[0]?.value
              ? `Standard via drill: ${((vias?.data as Record<string, unknown>).drillSizes as {value: number}[])[0].value}mm`
              : undefined,
            mountingHoles: holes
              ? `${(holes.data as Record<string, unknown>).boardsWithHoles}/${holes.sampleSize} boards use mounting holes (4 holes most common)`
              : undefined,
          };
        })(),

        nextSteps: [
          ...(similarDesigns.length > 0
            ? [`Review similar design "${similarDesigns[0].design}" with lookup-board-design for proven component choices`]
            : []),
          "Use generate-schematic-script to create the Eagle SCR file",
          "Use lookup-layout-pattern for detailed board layout conventions",
          "Run check-design-rules on the final component list",
          "Use check-inventory or price-bom for final BOM verification before production",
        ],
      };

      // Strip undefined keys for clean output
      const cleanPlan = JSON.parse(JSON.stringify(plan));

      return { content: [{ type: "text" as const, text: JSON.stringify(cleanPlan, null, 2) }] };
    }
  );
}
