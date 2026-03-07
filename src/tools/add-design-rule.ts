import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PENDING_DIR = join(__dirname, "..", "knowledge", "pending");

export function registerAddDesignRule(server: McpServer) {
  server.tool(
    "add-design-rule",
    "Propose a new design rule or convention. Goes to the pending queue for team review.",
    {
      category: z.enum([
        "power-integrity", "signal-integrity", "thermal", "emc",
        "protection", "reliability", "component-selection", "layout",
        "manufacturing", "testability",
      ]).describe("Rule category"),
      rule: z.string().describe("The rule statement (e.g. 'Never use Y5V capacitors for decoupling')"),
      reasoning: z.string().describe("Why this rule exists — what goes wrong without it"),
      severity: z.enum(["must", "should", "prefer"]).describe("How strictly to enforce"),
      applies: z.array(z.string()).optional().describe("What components or circuits this applies to"),
      exceptions: z.string().optional().describe("When this rule can be ignored"),
      sourceProject: z.string().optional().describe("Project where this was established"),
      addedBy: z.string().optional().describe("Engineer name or initials"),
    },
    async ({ category, rule, reasoning, severity, applies, exceptions, sourceProject, addedBy }) => {
      const id = `dr-pending-${Date.now()}`;
      const entry = {
        id,
        category,
        rule,
        reasoning,
        severity,
        applies,
        exceptions,
        sourceProject,
        status: "pending" as const,
        addedBy,
        addedDate: new Date().toISOString().split("T")[0],
      };

      const pendingFile = join(PENDING_DIR, "design-rules.json");
      let existing: unknown[] = [];
      try {
        const raw = await readFile(pendingFile, "utf-8");
        existing = JSON.parse(raw);
      } catch {
        // Start fresh
      }
      existing.push(entry);
      await mkdir(PENDING_DIR, { recursive: true });
      await writeFile(pendingFile, JSON.stringify(existing, null, 2), "utf-8");

      return {
        content: [
          {
            type: "text" as const,
            text: `Design rule proposed (${id}).\n\nRule: ${rule}\nCategory: ${category}\nSeverity: ${severity}\n\nPending review — a lead engineer should approve before it becomes active.`,
          },
        ],
      };
    }
  );
}
