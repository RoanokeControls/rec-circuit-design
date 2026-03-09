import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const DESIGN_LOGS_DIR =
  process.env.REC_DESIGN_LOGS ??
  join(process.env.HOME ?? "/tmp", ".rec-circuit-design", "design-logs");

const CATEGORIES = [
  "requirements",
  "component-selection",
  "topology",
  "schematic",
  "layout",
  "power",
  "protection",
  "firmware",
  "cost",
  "review",
  "change-order",
  "other",
] as const;

type Category = typeof CATEGORIES[number];

interface LogEntry {
  timestamp: string;
  category: Category;
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

function logFilePath(board: string, revision: string): string {
  const safe = `${board}-${revision}`.replace(/[/\\:*?"<>|#%&{}$!'@+`=\s]/g, "_");
  return join(DESIGN_LOGS_DIR, `${safe}.json`);
}

async function loadLog(board: string, revision: string): Promise<DesignLog> {
  const path = logFilePath(board, revision);
  try {
    const raw = await readFile(path, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      board,
      revision,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      entries: [],
    };
  }
}

async function saveLog(log: DesignLog): Promise<void> {
  await mkdir(DESIGN_LOGS_DIR, { recursive: true });
  const path = logFilePath(log.board, log.revision);
  log.lastUpdated = new Date().toISOString();
  await writeFile(path, JSON.stringify(log, null, 2), "utf-8");
}

export function registerLogDesignDecision(server: McpServer) {
  server.tool(
    "log-design-decision",
    "Log a design decision, prompt, or rationale to a per-board design journal. Creates a searchable record of how and why the board was designed.",
    {
      board: z.string().describe("Board name (e.g. 'env-sensor-main')"),
      revision: z.string().describe("Board revision (e.g. 'v9', 'proto-1')"),
      category: z.enum(CATEGORIES).describe("Decision category"),
      prompt: z.string().describe("What was asked or requested — the design prompt/question"),
      decision: z.string().describe("What was decided or done in response"),
      rationale: z.string().optional().describe("Why this approach was chosen over alternatives"),
      components: z.array(z.string()).optional().describe("Part numbers or component types involved"),
      toolsUsed: z.array(z.string()).optional().describe("MCP tools used during this decision (e.g. plan-schematic, suggest-power-supply)"),
    },
    async ({ board, revision, category, prompt, decision, rationale, components, toolsUsed }) => {
      const log = await loadLog(board, revision);

      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        category,
        prompt,
        decision,
        rationale,
        components,
        toolsUsed,
      };

      log.entries.push(entry);
      await saveLog(log);

      const entryNum = log.entries.length;
      return {
        content: [
          {
            type: "text" as const,
            text: `Design decision #${entryNum} logged for ${board} ${revision}.\n\n` +
              `Category: ${category}\n` +
              `Prompt: ${prompt}\n` +
              `Decision: ${decision}` +
              (rationale ? `\nRationale: ${rationale}` : "") +
              `\n\nTotal entries in log: ${entryNum}`,
          },
        ],
      };
    }
  );
}
