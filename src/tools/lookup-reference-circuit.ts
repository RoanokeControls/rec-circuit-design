import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { referenceCircuits } from "../knowledge/index.js";

export function registerLookupReferenceCircuit(server: McpServer) {
  server.tool(
    "lookup-reference-circuit",
    "Look up a standard reference circuit design by MCU, category, or keyword. Returns your team's proven designs with components, nets, and design rules.",
    {
      query: z.string().describe("MCU name, category, or keyword (e.g. 'ESP32-S3', 'power-supply', 'USB')"),
    },
    async ({ query }) => {
      const q = query.toLowerCase();
      const matches = referenceCircuits.filter(
        (rc) =>
          rc.id.toLowerCase().includes(q) ||
          rc.name.toLowerCase().includes(q) ||
          rc.description.toLowerCase().includes(q) ||
          rc.mcu?.toLowerCase().includes(q) ||
          rc.category.toLowerCase().includes(q) ||
          rc.blocks.some((b) => b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q))
      );

      if (matches.length === 0) {
        const categories = [...new Set(referenceCircuits.map((rc) => rc.category))].sort();
        return {
          content: [
            {
              type: "text" as const,
              text: `No reference circuits found for "${query}". ${referenceCircuits.length} circuits available.\n\nTry searching by category:\n${categories.map((c) => `- ${c}`).join("\n")}`,
            },
          ],
        };
      }

      const result = matches.map((rc) => ({
        id: rc.id,
        name: rc.name,
        description: rc.description,
        mcu: rc.mcu,
        category: rc.category,
        blockCount: rc.blocks.length,
        blocks: rc.blocks.map((b) => ({
          name: b.name,
          type: b.type,
          componentCount: b.components.length,
          components: b.components.map((c) => ({
            refDes: c.refDes,
            value: c.value,
            description: c.description,
            critical: c.critical,
          })),
          designRules: b.designRules,
        })),
        designRules: rc.designRules,
        sourceProject: rc.sourceProject,
        notes: rc.notes,
      }));

      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
