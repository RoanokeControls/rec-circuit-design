import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { sensorDesigns, sensorTypes, conditioningComponents } from "../knowledge/index.js";

export function registerLookupSensorCircuit(server: McpServer) {
  server.tool(
    "lookup-sensor-circuit",
    "Look up sensor and input circuits — thermistors, current sense, voltage dividers, optocouplers, temperature sensors, hall effect, op-amp conditioning, voltage references. Mined from 27 designs with 56 sensors.",
    {
      sensorType: z.string().optional().describe("Sensor type: 'thermistor', 'current_sense_resistor', 'temp_sensor', 'hall_sensor', 'voltage_divider', 'optocoupler_input'"),
      design: z.string().optional().describe("Design name to look up"),
    },
    async ({ sensorType, design }) => {
      let results = sensorDesigns;

      if (sensorType) {
        const q = sensorType.toLowerCase();
        results = results.filter((d) =>
          d.sensors.some((s) => s.type.toLowerCase().includes(q))
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
            sensorTypes,
            conditioningComponents,
            designs: results.slice(0, 15),
          }, null, 2),
        }],
      };
    }
  );
}
