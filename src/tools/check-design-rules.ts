import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { designRules, dfmRules, deratingRules, lessonsLearned } from "../knowledge/index.js";

export function registerCheckDesignRules(server: McpServer) {
  server.tool(
    "check-design-rules",
    "Retrieve all design rules, DFM rules, derating rules, and lessons learned relevant to a specific component, category, or design area. Use this to check conventions before finalizing a design.",
    {
      query: z.string().describe("Component, category, or area to check (e.g. 'ESP32', 'power', '0402', 'manufacturing', 'USB')"),
    },
    async ({ query }) => {
      const q = query.toLowerCase();

      const matchedDesignRules = designRules.filter(
        (dr) =>
          dr.rule.toLowerCase().includes(q) ||
          dr.category.toLowerCase().includes(q) ||
          dr.reasoning.toLowerCase().includes(q) ||
          dr.applies?.some((a) => a.toLowerCase().includes(q))
      );

      const matchedDfm = dfmRules.filter(
        (dr) =>
          dr.rule.toLowerCase().includes(q) ||
          dr.category.toLowerCase().includes(q) ||
          dr.reasoning.toLowerCase().includes(q) ||
          dr.packageAffected?.some((p) => p.toLowerCase().includes(q))
      );

      const matchedDerating = deratingRules.filter(
        (dr) =>
          dr.componentType.toLowerCase().includes(q) ||
          dr.package?.toLowerCase().includes(q) ||
          dr.description.toLowerCase().includes(q)
      );

      const matchedLessons = lessonsLearned.filter(
        (ll) =>
          ll.title.toLowerCase().includes(q) ||
          ll.description.toLowerCase().includes(q) ||
          ll.affectedComponents?.some((c) => c.toLowerCase().includes(q)) ||
          ll.affectedCircuits?.some((c) => c.toLowerCase().includes(q)) ||
          ll.category.toLowerCase().includes(q)
      );

      const result = {
        designRules: matchedDesignRules.map((dr) => ({
          id: dr.id,
          severity: dr.severity,
          rule: dr.rule,
          reasoning: dr.reasoning,
          exceptions: dr.exceptions,
        })),
        dfmRules: matchedDfm.map((dr) => ({
          id: dr.id,
          severity: dr.severity,
          category: dr.category,
          rule: dr.rule,
          reasoning: dr.reasoning,
        })),
        deratingRules: matchedDerating.map((dr) => ({
          id: dr.id,
          maxRatio: dr.maxRatio,
          description: dr.description,
          exceptions: dr.exceptions,
        })),
        lessonsLearned: matchedLessons.map((ll) => ({
          id: ll.id,
          severity: ll.severity,
          title: ll.title,
          whatHappened: ll.whatHappened,
          fix: ll.fix,
        })),
        totalMatches:
          matchedDesignRules.length + matchedDfm.length + matchedDerating.length + matchedLessons.length,
      };

      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
