import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";

const server = new McpServer({
  name: "rec-circuit-design",
  version: "1.0.0",
  description:
    "Circuit design knowledge base with inventory-aware component selection and Eagle SCR script generation. " +
    "Encodes your team's reference circuits, design rules, lessons learned, DFM constraints, and component inventory. " +
    "Engineers can look up proven designs, plan new schematics, generate Fusion 360 Eagle scripts, and log knowledge from the floor.",
});

registerAllTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
