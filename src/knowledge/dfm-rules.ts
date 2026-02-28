import { DfmRule } from "../types/index.js";

// ── Design for Manufacturing rules ──
// Specific to YOUR pick-and-place line, reflow ovens, and assembly process.

export const dfmRules: DfmRule[] = [
  {
    id: "dfm-001",
    category: "pick-and-place",
    rule: "Minimum component size 0402 for standard runs, 0201 requires setup fee and slower placement",
    reasoning: "Our Juki machine handles 0402 at full speed. 0201 requires nozzle change and 40% speed reduction.",
    machineSpecific: "Juki RS-1",
    packageAffected: ["0201"],
    severity: "prefer",
  },
  {
    id: "dfm-002",
    category: "pick-and-place",
    rule: "Maximum 60 unique part numbers per board to avoid excessive feeder changes",
    reasoning: "We have 80 feeder slots. Over 60 unique parts means a second pass which doubles placement time.",
    machineSpecific: "Juki RS-1",
    severity: "should",
  },
  {
    id: "dfm-003",
    category: "reflow",
    rule: "No mixing of lead-free and leaded components without explicit approval",
    reasoning: "Different reflow profiles. Lead-free runs at 245°C peak, leaded at 225°C. Mixed assemblies risk cold joints or damaged components.",
    severity: "must",
  },
  {
    id: "dfm-004",
    category: "panelization",
    rule: "V-score preferred over tab-route for rectangular boards. 2mm rail on two sides minimum.",
    reasoning: "V-score is faster to depanelize and leaves cleaner edges. Tab-route needed only for irregular board shapes.",
    severity: "prefer",
  },
  {
    id: "dfm-005",
    category: "stencil",
    rule: "QFN center pad aperture reduced to 60% with 4x4 grid pattern",
    reasoning: "Full aperture causes tombstoning from solder migration. Grid pattern gives better void performance.",
    packageAffected: ["QFN"],
    severity: "must",
  },
  {
    id: "dfm-006",
    category: "inspection",
    rule: "BGA and QFN packages require X-ray inspection sample on first article",
    reasoning: "Can't visually inspect joints under these packages. First article X-ray catches profile issues before full run.",
    packageAffected: ["BGA", "QFN"],
    severity: "must",
  },

  // TODO: Add rules specific to your line
];
