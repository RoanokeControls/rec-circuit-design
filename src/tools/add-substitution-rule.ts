import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PENDING_DIR = join(__dirname, "..", "knowledge", "pending");

export function registerAddSubstitutionRule(server: McpServer) {
  server.tool(
    "add-substitution-rule",
    "Register a verified component substitution. Once approved, this substitution will be suggested when the original part is out of stock.",
    {
      originalPart: z.string().describe("Original part number"),
      substitutePart: z.string().describe("Verified substitute part number"),
      conditions: z.string().describe("Under what conditions this swap is valid"),
      limitations: z.string().optional().describe("Any limitations or gotchas"),
      verifiedOn: z.string().optional().describe("Project where this was tested"),
      addedBy: z.string().optional().describe("Engineer name or initials"),
    },
    async ({ originalPart, substitutePart, conditions, limitations, verifiedOn, addedBy }) => {
      const id = `sub-pending-${Date.now()}`;
      const entry = {
        id,
        originalPart,
        substitutePart,
        conditions,
        limitations,
        verified: !!verifiedOn,
        verifiedOn,
        status: "pending" as const,
        addedBy,
        addedDate: new Date().toISOString().split("T")[0],
      };

      const pendingFile = join(PENDING_DIR, "substitution-rules.json");
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
            text: `Substitution rule saved (${id}).\n\n${originalPart} → ${substitutePart}\nConditions: ${conditions}${limitations ? `\nLimitations: ${limitations}` : ""}${verifiedOn ? `\nVerified on: ${verifiedOn}` : ""}\n\nPending review.`,
          },
        ],
      };
    }
  );
}
