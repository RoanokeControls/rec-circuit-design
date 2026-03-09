import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

const DESIGN_LOGS_DIR =
  process.env.REC_DESIGN_LOGS ??
  join(process.env.HOME ?? "/tmp", ".rec-circuit-design", "design-logs");

interface LogEntry {
  timestamp: string;
  category: string;
  prompt: string;
  decision: string;
  rationale?: string;
  components?: string[];
  toolsUsed?: string[];
}

interface DesignLog {
  board: string;
  revision: string;
  created: string;
  lastUpdated: string;
  entries: LogEntry[];
}

export function registerReviewDesignHistory(server: McpServer) {
  server.tool(
    "review-design-history",
    "Review the design decision history for a board. Shows how and why the board was designed, filterable by category or keyword.",
    {
      board: z.string().optional().describe("Board name to review. Omit to list all boards with logs."),
      revision: z.string().optional().describe("Specific revision. Omit to show all revisions for the board."),
      category: z.string().optional().describe("Filter entries by category (e.g. 'topology', 'component-selection')"),
      search: z.string().optional().describe("Search keyword across prompts, decisions, and rationale"),
      last: z.number().optional().describe("Show only the last N entries"),
    },
    async ({ board, revision, category, search, last }) => {
      // No board specified — list all available logs
      if (!board) {
        try {
          const files = await readdir(DESIGN_LOGS_DIR);
          const logs = files.filter(f => f.endsWith(".json"));
          if (logs.length === 0) {
            return { content: [{ type: "text" as const, text: "No design logs found yet. Use log-design-decision to start recording." }] };
          }

          const summaries: string[] = [];
          for (const file of logs) {
            try {
              const raw = await readFile(join(DESIGN_LOGS_DIR, file), "utf-8");
              const log: DesignLog = JSON.parse(raw);
              const categories = [...new Set(log.entries.map(e => e.category))];
              summaries.push(
                `**${log.board} ${log.revision}** — ${log.entries.length} entries (${categories.join(", ")})\n` +
                `  Created: ${log.created.split("T")[0]}  Last updated: ${log.lastUpdated.split("T")[0]}`
              );
            } catch { /* skip corrupt files */ }
          }

          return { content: [{ type: "text" as const, text: `Design logs on file:\n\n${summaries.join("\n\n")}` }] };
        } catch {
          return { content: [{ type: "text" as const, text: "No design logs directory found. Use log-design-decision to start recording." }] };
        }
      }

      // Board specified — find matching logs
      let files: string[];
      try {
        files = await readdir(DESIGN_LOGS_DIR);
      } catch {
        return { content: [{ type: "text" as const, text: "No design logs directory found." }] };
      }

      const boardLower = board.toLowerCase();
      const matchingFiles = files.filter(f => {
        const name = f.toLowerCase();
        return name.includes(boardLower) && f.endsWith(".json") &&
          (!revision || name.includes(revision.toLowerCase()));
      });

      if (matchingFiles.length === 0) {
        return { content: [{ type: "text" as const, text: `No design logs found for "${board}"${revision ? ` ${revision}` : ""}.` }] };
      }

      const results: string[] = [];
      for (const file of matchingFiles) {
        const raw = await readFile(join(DESIGN_LOGS_DIR, file), "utf-8");
        const log: DesignLog = JSON.parse(raw);

        let entries = log.entries;

        // Filter by category
        if (category) {
          const catLower = category.toLowerCase();
          entries = entries.filter(e => e.category.toLowerCase() === catLower);
        }

        // Filter by search keyword
        if (search) {
          const searchLower = search.toLowerCase();
          entries = entries.filter(e =>
            e.prompt.toLowerCase().includes(searchLower) ||
            e.decision.toLowerCase().includes(searchLower) ||
            (e.rationale?.toLowerCase().includes(searchLower) ?? false) ||
            (e.components?.some(c => c.toLowerCase().includes(searchLower)) ?? false)
          );
        }

        // Limit to last N
        if (last && last > 0) {
          entries = entries.slice(-last);
        }

        if (entries.length === 0) {
          results.push(`**${log.board} ${log.revision}** — no matching entries`);
          continue;
        }

        const header = `**${log.board} ${log.revision}** — ${entries.length} entries` +
          (entries.length < log.entries.length ? ` (filtered from ${log.entries.length} total)` : "");

        const entryTexts = entries.map((e, i) => {
          const date = e.timestamp.split("T")[0];
          const time = e.timestamp.split("T")[1]?.split(".")[0] ?? "";
          let text = `### ${date} ${time} [${e.category}]\n` +
            `**Prompt:** ${e.prompt}\n` +
            `**Decision:** ${e.decision}`;
          if (e.rationale) text += `\n**Rationale:** ${e.rationale}`;
          if (e.components?.length) text += `\n**Components:** ${e.components.join(", ")}`;
          if (e.toolsUsed?.length) text += `\n**Tools used:** ${e.toolsUsed.join(", ")}`;
          return text;
        });

        results.push(`${header}\n\n${entryTexts.join("\n\n---\n\n")}`);
      }

      return { content: [{ type: "text" as const, text: results.join("\n\n---\n\n") }] };
    }
  );
}
