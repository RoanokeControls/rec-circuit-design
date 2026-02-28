import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PENDING_DIR = join(__dirname, "..", "knowledge", "pending");

export function registerAddLessonLearned(server: McpServer) {
  server.tool(
    "add-lesson-learned",
    "Log a lesson learned from the field, production, or design review. Entry goes to the pending queue for lead engineer review before it becomes active knowledge.",
    {
      title: z.string().describe("Short title (e.g. 'SHT40 reads high near ESP32 antenna')"),
      category: z.enum([
        "field-failure", "certification", "manufacturing", "assembly",
        "thermal", "emc", "supplier", "design-error", "component-issue",
      ]).describe("Category of the lesson"),
      whatHappened: z.string().describe("What went wrong or what was discovered"),
      rootCause: z.string().describe("Why it happened"),
      fix: z.string().describe("What fixed it or what to do differently"),
      severity: z.enum(["critical", "major", "minor"]).describe("How bad was the impact"),
      affectedComponents: z.array(z.string()).optional().describe("Part numbers or component types affected"),
      sourceProject: z.string().optional().describe("Project ID or name where this was found"),
      addedBy: z.string().optional().describe("Engineer name or initials"),
    },
    async ({ title, category, whatHappened, rootCause, fix, severity, affectedComponents, sourceProject, addedBy }) => {
      const id = `ll-pending-${Date.now()}`;
      const entry = {
        id,
        title,
        description: `${whatHappened} Root cause: ${rootCause}`,
        category,
        whatHappened,
        rootCause,
        fix,
        severity,
        affectedComponents,
        sourceProject,
        status: "pending" as const,
        addedBy,
        addedDate: new Date().toISOString().split("T")[0],
      };

      // Append to pending file
      const pendingFile = join(PENDING_DIR, "lessons-learned.json");
      let existing: unknown[] = [];
      try {
        const raw = await readFile(pendingFile, "utf-8");
        existing = JSON.parse(raw);
      } catch {
        // File doesn't exist yet — start fresh
      }
      existing.push(entry);
      await writeFile(pendingFile, JSON.stringify(existing, null, 2), "utf-8");

      return {
        content: [
          {
            type: "text" as const,
            text: `Lesson learned saved to pending queue (${id}).\n\nTitle: ${title}\nCategory: ${category}\nSeverity: ${severity}\n\nA lead engineer should review and promote this to the approved knowledge base.`,
          },
        ],
      };
    }
  );
}
