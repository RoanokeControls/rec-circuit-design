import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { mkdirSync, writeFileSync, existsSync, statSync, readFileSync } from "fs";
import { join, basename } from "path";
import { gunzipSync, gzipSync } from "zlib";

// ── Config ──

const MODELS_API_URL =
  process.env.REC_3D_MODELS_URL ??
  "https://www.roanokecontrols.com/rec-admin/api/3d-models.php";

const MODELS_API_KEY =
  process.env.REC_3D_MODELS_KEY ?? "rec-3d-models-2026";

const LOCAL_LIBRARY_DIR =
  process.env.REC_3D_LIBRARY ??
  join(process.env.HOME ?? "/tmp", ".rec-circuit-design", "3d-models");

// ── Manufacturer STEP URL patterns ──

const MANUFACTURER_STEP_URLS: Record<string, (part: string) => string[]> = {
  "Texas Instruments": (p) => [
    `https://www.ti.com/lit/ml/${p.toLowerCase()}.step`,
    `https://www.ti.com/lit/ml/${p.toLowerCase().replace(/[^a-z0-9]/g, '')}.step`,
  ],
  "TI": (p) => [
    `https://www.ti.com/lit/ml/${p.toLowerCase()}.step`,
    `https://www.ti.com/lit/ml/${p.toLowerCase().replace(/[^a-z0-9]/g, '')}.step`,
  ],
  "STMicroelectronics": (p) => [
    `https://www.st.com/content/ccc/resource/technical/layouts_and_diagrams/package_3d_model/group0/${p.toLowerCase()}.step`,
  ],
  "Microchip": (p) => [
    `https://ww1.microchip.com/downloads/en/PackagingSpec/${p}.step`,
  ],
  "ON Semiconductor": (p) => [
    `https://www.onsemi.com/download/3d-model/${p}.step`,
  ],
  "Vishay": (p) => [
    `https://www.vishay.com/docs/3dmodel/${p.toLowerCase()}.step`,
  ],
  "Bourns": (p) => {
    const series = p.replace(/[-_].*/, '');
    return [`https://www.bourns.com/docs/3D-Models/${series}.step`];
  },
  "Wurth": (p) => [
    `https://www.we-online.com/katalog/datasheet/${p}.step`,
  ],
};

const CATEGORY_MANUFACTURERS: Record<string, string[]> = {
  ic: ["Texas Instruments", "Microchip", "STMicroelectronics", "ON Semiconductor"],
  diode: ["Vishay", "ON Semiconductor"],
  inductor: ["Bourns", "Wurth"],
  capacitor: ["Vishay", "Wurth"],
  resistor: ["Vishay", "Bourns"],
  connector: ["Wurth"],
  switch: [],
  potentiometer: ["Bourns"],
  transistor: ["ON Semiconductor", "STMicroelectronics"],
  relay: [],
  fuse: [],
  other: [],
};

// ── File key: normalized part number used for filenames and API lookups ──

function fileKey(partNumber: string, packageName?: string): string {
  const safe = partNumber.replace(/[/\\:*?"<>|#%&{}$!'@+`=]/g, '_');
  if (packageName) {
    const safePkg = packageName.replace(/[/\\:*?"<>|#%&{}$!'@+`=]/g, '_');
    return `${safe}__${safePkg}`;
  }
  return safe;
}

// ── Download helpers ──

async function downloadBinary(url: string, maxRedirects = 5): Promise<Buffer | null> {
  const https = await import('https');
  const http = await import('http');

  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location) {
        if (maxRedirects <= 0) { resolve(null); return; }
        downloadBinary(res.headers.location, maxRedirects - 1).then(resolve);
        return;
      }

      if (res.statusCode !== 200) {
        res.resume();
        resolve(null);
        return;
      }

      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length < 50) { resolve(null); return; }
        resolve(buffer);
      });
      res.on('error', () => resolve(null));
    });

    request.on('error', () => resolve(null));
    request.setTimeout(30000, () => { request.destroy(); resolve(null); });
  });
}

function isStepFile(buf: Buffer): boolean {
  const header = buf.slice(0, 200).toString('ascii');
  return header.includes('ISO-10303-21') || header.includes('STEP');
}

// ── Layer 1: Local shared library ──

function checkLocalLibrary(key: string): string | null {
  const stepPath = join(LOCAL_LIBRARY_DIR, `${key}.step`);
  if (existsSync(stepPath)) return stepPath;
  const stpPath = join(LOCAL_LIBRARY_DIR, `${key}.stp`);
  if (existsSync(stpPath)) return stpPath;
  return null;
}

function saveToLocalLibrary(key: string, data: Buffer): string {
  mkdirSync(LOCAL_LIBRARY_DIR, { recursive: true });
  const destPath = join(LOCAL_LIBRARY_DIR, `${key}.step`);
  writeFileSync(destPath, data);
  return destPath;
}

// ── Layer 2: Remote API ──

async function fetchFromApi(key: string): Promise<Buffer | null> {
  try {
    const url = `${MODELS_API_URL}?part=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${MODELS_API_KEY}`,
        'Accept-Encoding': 'gzip',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('json')) {
      return null;
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 50) return null;

    // Decompress if server sent gzip
    const contentEncoding = res.headers.get('content-encoding') ?? '';
    if (contentEncoding.includes('gzip')) {
      try {
        return gunzipSync(buf);
      } catch {
        // If decompression fails, it might already be decompressed
        return buf;
      }
    }

    return buf;
  } catch {
    return null;
  }
}

async function searchApi(query: string, field?: string): Promise<Array<{
  key: string;
  partNumber: string;
  manufacturer?: string;
  packageName?: string;
  category?: string;
}>> {
  try {
    let url = `${MODELS_API_URL}?search=${encodeURIComponent(query)}`;
    if (field) url += `&field=${encodeURIComponent(field)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${MODELS_API_KEY}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const data = await res.json() as { models?: Array<Record<string, unknown>> };
    return (data.models ?? []).map((m) => ({
      key: m.key as string,
      partNumber: m.partNumber as string,
      manufacturer: m.manufacturer as string | undefined,
      packageName: m.packageName as string | undefined,
      category: m.category as string | undefined,
    }));
  } catch {
    return [];
  }
}

async function uploadToApi(key: string, data: Buffer, metadata: {
  partNumber: string;
  manufacturer?: string;
  packageName?: string;
  category?: string;
  tags?: string[];
  sourceUrl?: string;
}): Promise<boolean> {
  try {
    const compressed = gzipSync(data);
    const body = JSON.stringify({
      key,
      partNumber: metadata.partNumber,
      manufacturer: metadata.manufacturer ?? null,
      packageName: metadata.packageName ?? null,
      category: metadata.category ?? null,
      tags: metadata.tags ?? [],
      sourceUrl: metadata.sourceUrl ?? null,
      encoding: 'gzip+base64',
      stepData: compressed.toString('base64'),
    });

    const res = await fetch(MODELS_API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${MODELS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: AbortSignal.timeout(30000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Layer 3: Manufacturer download ──

async function downloadFromManufacturer(
  partNumber: string,
  manufacturer?: string,
  category?: string
): Promise<{ data: Buffer; url: string } | null> {
  let manufacturersToTry: string[] = [];

  if (manufacturer && MANUFACTURER_STEP_URLS[manufacturer]) {
    manufacturersToTry = [manufacturer];
  } else if (manufacturer) {
    manufacturersToTry = Object.keys(MANUFACTURER_STEP_URLS);
  } else if (category && CATEGORY_MANUFACTURERS[category]?.length) {
    manufacturersToTry = CATEGORY_MANUFACTURERS[category];
  } else {
    manufacturersToTry = Object.keys(MANUFACTURER_STEP_URLS);
  }

  for (const mfr of manufacturersToTry) {
    const urlFn = MANUFACTURER_STEP_URLS[mfr];
    if (!urlFn) continue;

    const urls = urlFn(partNumber);
    for (const url of urls) {
      const buf = await downloadBinary(url);
      if (buf && isStepFile(buf)) {
        return { data: buf, url };
      }
    }
  }
  return null;
}

// ── Tool registration ──

export function registerDownload3dModels(server: McpServer) {
  server.tool(
    "download-3d-models",
    "Download 3D STEP models for components. Checks local shared library first, " +
    "then the team's remote 3D model API (by exact key and by package search), " +
    "then manufacturer websites. " +
    "Downloaded models are cached locally and uploaded to the team API for future use. " +
    "Saves STEP files to {projectPath}/3d-models/.",
    {
      projectPath: z.string().describe("Project directory path. Models saved to {projectPath}/3d-models/"),
      components: z.array(z.object({
        partNumber: z.string().describe("Manufacturer part number"),
        manufacturer: z.string().optional().describe("Manufacturer name"),
        packageName: z.string().optional().describe("Package name (e.g. SOIC-8, SOT-23, 0603)"),
        category: z.enum([
          "ic", "diode", "inductor", "capacitor", "resistor",
          "connector", "switch", "potentiometer", "transistor",
          "relay", "fuse", "other"
        ]).optional().describe("Component category to narrow manufacturer search"),
      })).describe("List of components to get 3D models for"),
    },
    async ({ projectPath, components }) => {
      const modelsDir = join(projectPath, "3d-models");
      mkdirSync(modelsDir, { recursive: true });

      const results: Array<{
        partNumber: string;
        key: string;
        source: "local_library" | "remote_api" | "remote_api_package_match" | "manufacturer" | "already_in_project" | "not_found";
        filePath: string | null;
        fileSize: number | null;
        url: string | null;
        uploadedToApi: boolean;
        matchedKey?: string;
        error: string | null;
      }> = [];

      for (const component of components) {
        const { partNumber, manufacturer, packageName, category } = component;
        const key = fileKey(partNumber, packageName);
        const projectDest = join(modelsDir, `${key}.step`);

        // Already in this project?
        if (existsSync(projectDest)) {
          const stat = statSync(projectDest);
          results.push({
            partNumber, key,
            source: "already_in_project",
            filePath: projectDest,
            fileSize: stat.size,
            url: null,
            uploadedToApi: false,
            error: null,
          });
          continue;
        }

        // Layer 1: Local shared library
        const localPath = checkLocalLibrary(key);
        if (localPath) {
          const data = readFileSync(localPath);
          writeFileSync(projectDest, data);
          results.push({
            partNumber, key,
            source: "local_library",
            filePath: projectDest,
            fileSize: data.length,
            url: null,
            uploadedToApi: false,
            error: null,
          });
          continue;
        }

        // Layer 2a: Remote API — exact key match
        const apiData = await fetchFromApi(key);
        if (apiData) {
          writeFileSync(projectDest, apiData);
          saveToLocalLibrary(key, apiData);
          results.push({
            partNumber, key,
            source: "remote_api",
            filePath: projectDest,
            fileSize: apiData.length,
            url: null,
            uploadedToApi: false,
            error: null,
          });
          continue;
        }

        // Layer 2b: Remote API — search by package name (same 3D body)
        if (packageName) {
          const packageMatches = await searchApi(packageName, 'packageName');
          if (packageMatches.length > 0) {
            const matchKey = packageMatches[0].key;
            const matchData = await fetchFromApi(matchKey);
            if (matchData) {
              writeFileSync(projectDest, matchData);
              saveToLocalLibrary(key, matchData);
              results.push({
                partNumber, key,
                source: "remote_api_package_match",
                filePath: projectDest,
                fileSize: matchData.length,
                url: null,
                uploadedToApi: false,
                matchedKey: matchKey,
                error: null,
              });
              continue;
            }
          }
        }

        // Layer 3: Manufacturer download
        const mfrResult = await downloadFromManufacturer(partNumber, manufacturer, category);
        if (mfrResult) {
          writeFileSync(projectDest, mfrResult.data);
          saveToLocalLibrary(key, mfrResult.data);

          // Upload to team API for next time
          const uploaded = await uploadToApi(key, mfrResult.data, {
            partNumber, manufacturer, packageName, category,
            sourceUrl: mfrResult.url,
          });

          results.push({
            partNumber, key,
            source: "manufacturer",
            filePath: projectDest,
            fileSize: mfrResult.data.length,
            url: mfrResult.url,
            uploadedToApi: uploaded,
            error: null,
          });
          continue;
        }

        // Not found anywhere
        results.push({
          partNumber, key,
          source: "not_found",
          filePath: null,
          fileSize: null,
          url: null,
          uploadedToApi: false,
          error: `No STEP model found. Checked: local library, team API (exact + package search), manufacturer URLs (${
            manufacturer ?? category ?? 'all'
          }). Options: 1) Run aps-3d-harvest.py to pull models from Fusion 360 cloud. 2) Manually add a STEP file to ${LOCAL_LIBRARY_DIR}/${key}.step`,
        });
      }

      // Write manifest
      const manifest = {
        generatedAt: new Date().toISOString(),
        modelsDir,
        localLibrary: LOCAL_LIBRARY_DIR,
        components: results.map((r) => ({
          partNumber: r.partNumber,
          key: r.key,
          source: r.source,
          fileName: r.filePath ? basename(r.filePath) : null,
          fileSize: r.fileSize,
          url: r.url,
          uploadedToApi: r.uploadedToApi,
          matchedKey: r.matchedKey,
        })),
      };
      writeFileSync(join(modelsDir, "manifest.json"), JSON.stringify(manifest, null, 2));

      const found = results.filter((r) => r.source !== "not_found").length;
      const notFound = results.filter((r) => r.source === "not_found").length;
      const uploaded = results.filter((r) => r.uploadedToApi).length;

      const bySource = {
        alreadyInProject: results.filter((r) => r.source === "already_in_project").length,
        localLibrary: results.filter((r) => r.source === "local_library").length,
        remoteApi: results.filter((r) => r.source === "remote_api").length,
        remoteApiPackageMatch: results.filter((r) => r.source === "remote_api_package_match").length,
        manufacturer: results.filter((r) => r.source === "manufacturer").length,
        notFound,
      };

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            summary: {
              total: components.length,
              found,
              notFound,
              uploadedToApi: uploaded,
              modelsDir,
              localLibrary: LOCAL_LIBRARY_DIR,
            },
            bySource,
            results,
          }, null, 2),
        }],
      };
    }
  );
}
