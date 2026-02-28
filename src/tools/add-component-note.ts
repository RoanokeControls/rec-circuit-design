import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PENDING_DIR = join(__dirname, "..", "knowledge", "pending");

export function registerAddComponentNote(server: McpServer) {
  server.tool(
    "add-component-note",
    "Add a note about a specific component — warnings, tips, EOL notices, quality issues, or lead time info. Goes to pending queue.",
    {
      partNumber: z.string().describe("Part number this note is about"),
      note: z.string().describe("The note content"),
      type: z.enum(["warning", "tip", "eol", "substitute", "quality", "lead-time"]).describe("Type of note"),
      addedBy: z.string().optional().describe("Engineer name or initials"),
    },
    async ({ partNumber, note, type, addedBy }) => {
      const id = `cn-pending-${Date.now()}`;
      const entry = { id, partNumber, note, type, status: "pending" as const, addedBy, addedDate: new Date().toISOString().split("T")[0] };

      const pendingFile = join(PENDING_DIR, "component-notes.json");
      let existing: unknown[] = [];
      try {
        const raw = await readFile(pendingFile, "utf-8");
        existing = JSON.parse(raw);
      } catch {
        // Start fresh
      }
      existing.push(entry);
      await writeFile(pendingFile, JSON.stringify(existing, null, 2), "utf-8");

      return {
        content: [
          {
            type: "text" as const,
            text: `Component note saved (${id}).\n\nPart: ${partNumber}\nType: ${type}\nNote: ${note}\n\nPending review.`,
          },
        ],
      };
    }
  );
}
