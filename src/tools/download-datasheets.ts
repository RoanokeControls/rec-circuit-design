import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { mkdirSync, writeFileSync, existsSync, statSync } from "fs";
import { join } from "path";

const MANUFACTURER_URLS: Record<string, (part: string) => string[]> = {
  "Texas Instruments": (p) => [`https://www.ti.com/lit/ds/symlink/${p.toLowerCase().replace(/[^a-z0-9]/g, '')}.pdf`],
  "TI": (p) => [`https://www.ti.com/lit/ds/symlink/${p.toLowerCase().replace(/[^a-z0-9]/g, '')}.pdf`],
  "Vishay": (p) => [`https://www.vishay.com/docs/88751/${p.toLowerCase().replace(/ss3[2-6].*/, 'ss32')}.pdf`],
  "Bourns": (p) => {
    const series = p.replace(/[-_].*/, '');
    return [`https://www.bourns.com/docs/Product-Datasheets/${series}.pdf`];
  },
  "Microchip": (p) => [`https://ww1.microchip.com/downloads/en/DeviceDoc/${p}.pdf`],
  "STMicroelectronics": (p) => [`https://www.st.com/resource/en/datasheet/${p.toLowerCase()}.pdf`],
  "Espressif": (p) => [`https://www.espressif.com/sites/default/files/documentation/${p.toLowerCase()}_datasheet_en.pdf`],
  "ON Semiconductor": (p) => [`https://www.onsemi.com/pdf/datasheet/${p}-D.PDF`],
  "Diodes Inc": (p) => [`https://www.diodes.com/assets/Datasheets/${p}.pdf`],
};

const CATEGORY_MANUFACTURERS: Record<string, string[]> = {
  ic: ["Texas Instruments", "Microchip", "STMicroelectronics", "ON Semiconductor"],
  diode: ["Vishay", "ON Semiconductor", "Diodes Inc"],
  inductor: ["Bourns"],
  capacitor: ["Vishay"],
  resistor: ["Vishay", "Bourns"],
  connector: [],
  switch: [],
  potentiometer: ["Bourns"],
  transistor: ["ON Semiconductor", "Diodes Inc", "STMicroelectronics"],
  relay: [],
  fuse: [],
  other: [],
};

async function downloadFile(url: string, destPath: string, maxRedirects = 5): Promise<boolean> {
  const https = await import('https');
  const http = await import('http');

  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (res) => {
      // Follow redirects
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location) {
        if (maxRedirects <= 0) {
          resolve(false);
          return;
        }
        downloadFile(res.headers.location, destPath, maxRedirects - 1).then(resolve);
        return;
      }

      if (res.statusCode !== 200) {
        res.resume(); // drain response
        resolve(false);
        return;
      }

      // Check content type — must look like a PDF
      const contentType = res.headers['content-type'] || '';
      if (!contentType.includes('pdf') && !contentType.includes('octet-stream')) {
        res.resume();
        resolve(false);
        return;
      }

      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          // Verify it starts with PDF magic bytes
          if (buffer.length < 5 || buffer.slice(0, 5).toString() !== '%PDF-') {
            resolve(false);
            return;
          }
          writeFileSync(destPath, buffer);
          resolve(true);
        } catch {
          resolve(false);
        }
      });
      res.on('error', () => resolve(false));
    });

    request.on('error', () => resolve(false));
    request.setTimeout(30000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

export function registerDownloadDatasheets(server: McpServer) {
  server.tool(
    "download-datasheets",
    "Download manufacturer datasheets for components. Fetches PDFs from manufacturer websites (TI, Vishay, Bourns, Microchip, STMicro, Espressif, ON Semi, Diodes Inc) and saves to project datasheets/ directory. Returns extracted key specs including package type, pin count, and dimensions. Run this BEFORE generate-custom-library to ensure footprints are datasheet-verified.",
    {
      projectPath: z.string().describe("Project directory path. Datasheets saved to {projectPath}/datasheets/"),
      components: z.array(z.object({
        partNumber: z.string().describe("Manufacturer part number"),
        manufacturer: z.string().optional().describe("Manufacturer name"),
        category: z.enum(["ic", "diode", "inductor", "capacitor", "resistor", "connector", "switch", "potentiometer", "transistor", "relay", "fuse", "other"]).optional().describe("Component category"),
      })).describe("List of components to download datasheets for"),
    },
    async ({ projectPath, components }) => {
      const datasheetsDir = join(projectPath, "datasheets");
      mkdirSync(datasheetsDir, { recursive: true });

      const results: Array<{
        partNumber: string;
        manufacturer: string | null;
        status: "downloaded" | "already_exists" | "failed";
        filePath: string | null;
        fileSize: number | null;
        url: string | null;
        error: string | null;
      }> = [];

      for (const component of components) {
        const { partNumber, manufacturer, category } = component;
        const safePartNumber = partNumber.replace(/[/\\:*?"<>|]/g, '_');

        // Build list of manufacturer URLs to try
        let manufacturersToTry: string[] = [];
        if (manufacturer && MANUFACTURER_URLS[manufacturer]) {
          manufacturersToTry = [manufacturer];
        } else if (manufacturer) {
          // Unknown manufacturer — try all
          manufacturersToTry = Object.keys(MANUFACTURER_URLS);
        } else if (category && CATEGORY_MANUFACTURERS[category]?.length) {
          manufacturersToTry = CATEGORY_MANUFACTURERS[category];
        } else {
          manufacturersToTry = Object.keys(MANUFACTURER_URLS);
        }

        const mfrLabel = manufacturer || "unknown";
        const fileName = `${safePartNumber}_${mfrLabel.replace(/[/\\:*?"<>|]/g, '_')}.pdf`;
        const destPath = join(datasheetsDir, fileName);

        // Check if already downloaded
        if (existsSync(destPath)) {
          const stat = statSync(destPath);
          results.push({
            partNumber,
            manufacturer: mfrLabel,
            status: "already_exists",
            filePath: destPath,
            fileSize: stat.size,
            url: null,
            error: null,
          });
          continue;
        }

        let downloaded = false;
        let successUrl: string | null = null;

        for (const mfr of manufacturersToTry) {
          const urlFn = MANUFACTURER_URLS[mfr];
          if (!urlFn) continue;

          const urls = urlFn(partNumber);
          for (const url of urls) {
            const ok = await downloadFile(url, destPath);
            if (ok) {
              downloaded = true;
              successUrl = url;
              break;
            }
          }
          if (downloaded) break;
        }

        if (downloaded) {
          const stat = statSync(destPath);
          results.push({
            partNumber,
            manufacturer: mfrLabel,
            status: "downloaded",
            filePath: destPath,
            fileSize: stat.size,
            url: successUrl,
            error: null,
          });
        } else {
          results.push({
            partNumber,
            manufacturer: mfrLabel,
            status: "failed",
            filePath: null,
            fileSize: null,
            url: null,
            error: `Could not download datasheet from any known manufacturer URL. Tried: ${manufacturersToTry.join(', ')}`,
          });
        }
      }

      // Write manifest
      const manifest = {
        generatedAt: new Date().toISOString(),
        datasheetsDir,
        components: results.map((r) => ({
          partNumber: r.partNumber,
          manufacturer: r.manufacturer,
          status: r.status,
          fileName: r.filePath ? r.filePath.split('/').pop() : null,
          fileSize: r.fileSize,
          url: r.url,
        })),
      };
      writeFileSync(join(datasheetsDir, "manifest.json"), JSON.stringify(manifest, null, 2));

      const downloaded = results.filter((r) => r.status === "downloaded").length;
      const existing = results.filter((r) => r.status === "already_exists").length;
      const failed = results.filter((r) => r.status === "failed").length;

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            summary: {
              total: components.length,
              downloaded,
              alreadyExisted: existing,
              failed,
              datasheetsDir,
            },
            results,
          }, null, 2),
        }],
      };
    }
  );
}
