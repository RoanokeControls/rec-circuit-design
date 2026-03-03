import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { programmingInterfaces } from "../knowledge/index.js";

export function registerLookupProgrammingInterface(server: McpServer) {
  server.tool(
    "lookup-programming-interface",
    "Look up programming/debug interfaces — POGO array (16-pin, 4x4, 1.27mm, replaces TagConnect), Tag-Connect TC2030 (6-pin legacy), ICSP (PIC18), SWD (RP2040/STM32), UART boot (ESP32). Pin assignments, protocols, footprints.",
    {
      mcuFamily: z.string().optional().describe("MCU family: 'ESP32', 'RP2040', 'PIC18', 'STM32'"),
      interfaceType: z.string().optional().describe("Interface type: 'pogo', 'tag-connect', 'icsp', 'swd', 'uart-boot'"),
    },
    async ({ mcuFamily, interfaceType }) => {
      let results = programmingInterfaces;

      if (mcuFamily) {
        const q = mcuFamily.toUpperCase();
        results = results.filter((p) =>
          p.mcuFamilies.some((f) => f.toUpperCase().includes(q))
        );
      }

      if (interfaceType) {
        const q = interfaceType.toLowerCase();
        results = results.filter((p) => p.type.toLowerCase().includes(q));
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            interfaces: results,
          }, null, 2),
        }],
      };
    }
  );
}
