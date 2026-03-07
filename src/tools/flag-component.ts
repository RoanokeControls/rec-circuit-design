import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PENDING_DIR = join(__dirname, "..", "knowledge", "pending");

export function registerFlagComponent(server: McpServer) {
  server.tool(
    "flag-component",
    "Flag a component as problematic, end-of-life, or requiring attention. Creates a high-visibility warning that will appear in future designs using this part.",
    {
      partNumber: z.string().describe("Part number to flag"),
      reason: z.enum(["eol", "quality-issue", "reliability", "obsolete", "counterfeit-risk", "do-not-use"]).describe("Reason for flagging"),
      details: z.string().describe("Explain the issue"),
      suggestedReplacement: z.string().optional().describe("Recommended replacement part number"),
      addedBy: z.string().optional().describe("Engineer name or initials"),
    },
    async ({ partNumber, reason, details, suggestedReplacement, addedBy }) => {
      const id = `flag-${Date.now()}`;
      const entry = {
        id,
        partNumber,
        reason,
        details,
        suggestedReplacement,
        addedBy,
        addedDate: new Date().toISOString().split("T")[0],
      };

      const pendingFile = join(PENDING_DIR, "flagged-components.json");
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
            text: `COMPONENT FLAGGED (${id}).\n\nPart: ${partNumber}\nReason: ${reason}\nDetails: ${details}${suggestedReplacement ? `\nSuggested replacement: ${suggestedReplacement}` : ""}\n\nThis flag will be visible in future design checks after review.`,
          },
        ],
      };
    }
  );
}
