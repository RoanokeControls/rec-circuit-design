import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface CheckResult {
  check: string;
  expected: string | number;
  actual: string | number;
  delta: number | null;
  status: "PASS" | "WARN" | "FAIL";
}

interface ManifestEntry {
  partNumber?: string;
  packageType?: string;
  pinCount?: number;
  bodySize?: { width: number; length: number; height?: number };
  padSpan?: number;
  [key: string]: unknown;
}

function extractBlock(xml: string, tag: string, nameAttr: string): string | null {
  // Find the opening tag with the given name attribute
  const openPattern = new RegExp(`<${tag}\\s[^>]*name="${nameAttr}"[^>]*>`, "i");
  const openMatch = xml.match(openPattern);
  if (!openMatch || openMatch.index === undefined) return null;

  const startIdx = openMatch.index;
  // Find the matching closing tag by counting nesting
  const closingTag = `</${tag}>`;
  let depth = 1;
  let searchIdx = startIdx + openMatch[0].length;

  while (depth > 0 && searchIdx < xml.length) {
    const nextOpen = xml.indexOf(`<${tag}`, searchIdx);
    const nextClose = xml.indexOf(closingTag, searchIdx);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      searchIdx = nextOpen + tag.length + 1;
    } else {
      depth--;
      if (depth === 0) {
        return xml.substring(startIdx, nextClose + closingTag.length);
      }
      searchIdx = nextClose + closingTag.length;
    }
  }

  return null;
}

function extractAttr(element: string, attr: string): string | null {
  const match = element.match(new RegExp(`${attr}="([^"]*)"`, "i"));
  return match ? match[1] : null;
}

export function registerVerifyFootprint(server: McpServer) {
  server.tool(
    "verify-footprint",
    "Cross-check a library footprint against a downloaded datasheet. Reads the datasheet manifest for extracted specs and compares against the .lbr XML file's package dimensions. Flags pad size mismatches, wrong package types, incorrect pin counts, and body outline errors. Run this AFTER generate-custom-library to catch footprint errors before board fabrication.",
    {
      libraryPath: z.string().describe("Path to the Eagle .lbr XML file"),
      devicesetName: z.string().describe("Deviceset name to verify (e.g., 'SS34')"),
      datasheetDirectory: z.string().describe("Path to datasheets/ directory containing manifest.json"),
      toleranceMm: z.number().optional().default(0.15).describe("Acceptable tolerance in mm for dimensional checks"),
    },
    async ({ libraryPath, devicesetName, datasheetDirectory, toleranceMm }) => {
      // Validate inputs exist
      if (!existsSync(libraryPath)) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Library file not found: ${libraryPath}`,
            }, null, 2),
          }],
        };
      }

      const manifestPath = join(datasheetDirectory, "manifest.json");
      if (!existsSync(manifestPath)) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Manifest not found: ${manifestPath}`,
            }, null, 2),
          }],
        };
      }

      // Read manifest
      let manifest: Record<string, ManifestEntry>;
      try {
        manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
      } catch (e) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Failed to parse manifest.json: ${(e as Error).message}`,
            }, null, 2),
          }],
        };
      }

      // Find the part in the manifest (case-insensitive search)
      const manifestKey = Object.keys(manifest).find(
        (k) => k.toUpperCase() === devicesetName.toUpperCase()
      );

      if (!manifestKey) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Part '${devicesetName}' not found in manifest.json`,
              availableParts: Object.keys(manifest),
            }, null, 2),
          }],
        };
      }

      const specs = manifest[manifestKey];

      // Read and parse the .lbr XML
      const lbrXml = readFileSync(libraryPath, "utf-8");

      // Find the deviceset block
      const devicesetBlock = extractBlock(lbrXml, "deviceset", devicesetName);
      if (!devicesetBlock) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Deviceset '${devicesetName}' not found in library`,
            }, null, 2),
          }],
        };
      }

      // Extract package name from the device element
      const deviceMatch = devicesetBlock.match(/<device\s[^>]*package="([^"]*)"[^>]*>/i);
      if (!deviceMatch) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `No device with package found in deviceset '${devicesetName}'`,
            }, null, 2),
          }],
        };
      }

      const packageName = deviceMatch[1];

      // Find the package block
      const packageBlock = extractBlock(lbrXml, "package", packageName);
      if (!packageBlock) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              error: `Package '${packageName}' not found in library`,
            }, null, 2),
          }],
        };
      }

      // Extract SMD pads
      const smdPattern = /<smd\s[^/>]*\/>/gi;
      const smdElements = packageBlock.match(smdPattern) || [];
      const smdPads = smdElements.map((el) => ({
        x: parseFloat(extractAttr(el, "x") || "0"),
        y: parseFloat(extractAttr(el, "y") || "0"),
        dx: parseFloat(extractAttr(el, "dx") || "0"),
        dy: parseFloat(extractAttr(el, "dy") || "0"),
      }));

      // Extract THT pads
      const padPattern = /<pad\s[^/>]*\/>/gi;
      const padElements = packageBlock.match(padPattern) || [];
      const thtPads = padElements.map((el) => ({
        x: parseFloat(extractAttr(el, "x") || "0"),
        y: parseFloat(extractAttr(el, "y") || "0"),
        drill: parseFloat(extractAttr(el, "drill") || "0"),
      }));

      const totalPadCount = smdPads.length + thtPads.length;

      // Extract wire outlines (layer 21 = tPlace, layer 51 = tDocu are common outline layers)
      const wirePattern = /<wire\s[^/>]*\/>/gi;
      const wireElements = packageBlock.match(wirePattern) || [];
      const outlineWires = wireElements
        .filter((el) => {
          const layer = extractAttr(el, "layer");
          return layer === "21" || layer === "51";
        })
        .map((el) => ({
          x1: parseFloat(extractAttr(el, "x1") || "0"),
          y1: parseFloat(extractAttr(el, "y1") || "0"),
          x2: parseFloat(extractAttr(el, "x2") || "0"),
          y2: parseFloat(extractAttr(el, "y2") || "0"),
        }));

      // Calculate body outline extents from wires
      let outlineWidth = 0;
      let outlineLength = 0;
      if (outlineWires.length > 0) {
        const allX = outlineWires.flatMap((w) => [w.x1, w.x2]);
        const allY = outlineWires.flatMap((w) => [w.y1, w.y2]);
        outlineWidth = Math.max(...allX) - Math.min(...allX);
        outlineLength = Math.max(...allY) - Math.min(...allY);
      }

      // Calculate pad span (distance between pad centers)
      let padSpan = 0;
      const allPadPositions = [
        ...smdPads.map((p) => ({ x: p.x, y: p.y })),
        ...thtPads.map((p) => ({ x: p.x, y: p.y })),
      ];
      if (allPadPositions.length >= 2) {
        // Find maximum span across both axes
        const xCoords = allPadPositions.map((p) => p.x);
        const yCoords = allPadPositions.map((p) => p.y);
        const xSpan = Math.max(...xCoords) - Math.min(...xCoords);
        const ySpan = Math.max(...yCoords) - Math.min(...yCoords);
        padSpan = Math.max(xSpan, ySpan);
      }

      // Run checks
      const checks: CheckResult[] = [];

      // Check 1: Package type
      if (specs.packageType) {
        const expectedType = specs.packageType.toUpperCase();
        const actualType = packageName.toUpperCase();
        const match = actualType.includes(expectedType) || expectedType.includes(actualType);
        checks.push({
          check: "package_type",
          expected: specs.packageType,
          actual: packageName,
          delta: null,
          status: match ? "PASS" : "FAIL",
        });
      }

      // Check 2: Pin count
      if (specs.pinCount !== undefined) {
        const delta = Math.abs(specs.pinCount - totalPadCount);
        checks.push({
          check: "pad_count",
          expected: specs.pinCount,
          actual: totalPadCount,
          delta,
          status: delta === 0 ? "PASS" : "FAIL",
        });
      }

      // Check 3: Pad span
      if (specs.padSpan !== undefined) {
        const delta = Math.abs(specs.padSpan - padSpan);
        checks.push({
          check: "pad_span",
          expected: specs.padSpan,
          actual: Math.round(padSpan * 1000) / 1000,
          delta: Math.round(delta * 1000) / 1000,
          status: delta <= toleranceMm ? "PASS" : "FAIL",
        });
      }

      // Check 4: Body dimensions
      if (specs.bodySize) {
        const expectedWidth = specs.bodySize.width;
        const expectedLength = specs.bodySize.length;

        // Compare outline to body size (try both orientations)
        const deltaW1 = Math.abs(expectedWidth - outlineWidth);
        const deltaL1 = Math.abs(expectedLength - outlineLength);
        const deltaW2 = Math.abs(expectedWidth - outlineLength);
        const deltaL2 = Math.abs(expectedLength - outlineWidth);

        const bestDeltaW = Math.min(deltaW1, deltaW2);
        const bestDeltaL = Math.min(deltaL1, deltaL2);
        const maxDelta = Math.max(bestDeltaW, bestDeltaL);

        let status: "PASS" | "WARN" | "FAIL";
        if (outlineWires.length === 0) {
          status = "WARN";
        } else if (maxDelta <= toleranceMm) {
          status = "PASS";
        } else {
          status = "WARN";
        }

        checks.push({
          check: "body_dimensions",
          expected: `${expectedWidth} x ${expectedLength} mm`,
          actual: outlineWires.length > 0
            ? `${Math.round(outlineWidth * 1000) / 1000} x ${Math.round(outlineLength * 1000) / 1000} mm`
            : "no outline wires found",
          delta: outlineWires.length > 0 ? Math.round(maxDelta * 1000) / 1000 : null,
          status,
        });
      }

      // Determine overall status
      const hasFailure = checks.some((c) => c.status === "FAIL");
      const hasWarning = checks.some((c) => c.status === "WARN");
      const overallStatus = hasFailure ? "FAIL" : hasWarning ? "WARN" : "PASS";

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            deviceset: devicesetName,
            package: packageName,
            libraryPath,
            toleranceMm,
            overallStatus,
            checks,
            libraryDetails: {
              smdPadCount: smdPads.length,
              thtPadCount: thtPads.length,
              totalPadCount,
              padSpan: Math.round(padSpan * 1000) / 1000,
              outlineWidth: Math.round(outlineWidth * 1000) / 1000,
              outlineLength: Math.round(outlineLength * 1000) / 1000,
              outlineWireCount: outlineWires.length,
            },
            manifestSpecs: specs,
          }, null, 2),
        }],
      };
    }
  );
}
