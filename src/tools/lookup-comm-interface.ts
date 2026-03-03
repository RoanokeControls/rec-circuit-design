import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { commInterfaceDesigns, commInterfaceTypes, commTransceiverParts } from "../knowledge/index.js";

export function registerLookupCommInterface(server: McpServer) {
  server.tool(
    "lookup-comm-interface",
    "Look up communication interface circuits — RS-485, USB, WiFi/BLE, LoRa, Ethernet, CAN, 1-Wire transceivers with ESD protection and termination. Mined from 45 designs with 95 interfaces.",
    {
      interfaceType: z.string().optional().describe("Interface type: 'rs485', 'usb', 'wifi_ble', 'ble', 'lora', 'ethernet', 'can', 'onewire'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ interfaceType, design }) => {
      let results = commInterfaceDesigns;

      if (interfaceType) {
        const q = interfaceType.toLowerCase();
        results = results.filter((d) =>
          d.interfaces.some((i) => i.type.toLowerCase().includes(q))
        );
      }

      if (design) {
        const q = design.toLowerCase();
        results = results.filter((d) => d.design.toLowerCase().includes(q));
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            matchCount: results.length,
            commInterfaceTypes,
            commTransceiverParts,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
