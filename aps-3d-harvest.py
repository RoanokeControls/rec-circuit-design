#!/usr/bin/env python3
"""APS 3D Model Harvester for rec-circuit-design.

Scans the Roanoke Controls Fusion 360 cloud for PCB designs (.f3d files),
converts them to STEP via the APS Model Derivative API, then parses the
STEP assembly to extract individual component 3D models.

The pipeline:
  1. Download F3D from Fusion Team (3-legged OAuth, data:read)
  2. Upload F3D to a temporary OSS bucket (2-legged OAuth, data:write)
  3. Submit Model Derivative job: F3D → STEP (2-legged OAuth)
  4. Download STEP assembly result
  5. Parse STEP to extract individual component bodies
  6. Upload each unique component STEP to the team API

This works around the limitation that Model Derivative can't access
Fusion Team hub files with 2-legged auth — we re-host via OSS first.

Also handles direct .step/.stp files found in the cloud.

Usage:
    python3 aps-3d-harvest.py [output_dir] [--hub NAME] [--project NAME]
                               [--upload] [--list-only] [--include-f3d]
                               [--all-projects]

Setup: Same as aps-export.py — needs APS_CLIENT_ID & APS_CLIENT_SECRET.
"""

import argparse
import base64
import gzip
import hashlib
import json
import os
import re
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: 'requests' package required. Install with:")
    print("  pip3 install requests")
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

def _load_env():
    """Load .env file manually (no python-dotenv dependency)."""
    env_path = os.path.join(SCRIPT_DIR, ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

_load_env()

# Reuse OAuth and APS helpers from aps-export.py
from importlib.util import spec_from_file_location, module_from_spec
_aps_spec = spec_from_file_location(
    "aps_export",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "aps-export.py"))
_aps_mod = module_from_spec(_aps_spec)
_aps_spec.loader.exec_module(_aps_mod)

get_access_token = _aps_mod.get_access_token
aps_get = _aps_mod.aps_get
list_hubs = _aps_mod.list_hubs
list_projects = _aps_mod.list_projects
list_top_folders = _aps_mod.list_top_folders
list_folder_contents = _aps_mod.list_folder_contents
get_item_tip = _aps_mod.get_item_tip
parse_storage_urn = _aps_mod.parse_storage_urn
download_file = _aps_mod.download_file
download_item = _aps_mod.download_item
interactive_select = _aps_mod.interactive_select
find_by_name = _aps_mod.find_by_name
APS_BASE = _aps_mod.APS_BASE
APS_TOKEN_URL = _aps_mod.APS_TOKEN_URL

# ── Config ──

MODELS_API_URL = os.environ.get(
    "REC_3D_MODELS_URL",
    "https://www.roanokecontrols.com/rec-admin/api/3d-models.php")

MODELS_API_KEY = os.environ.get("REC_3D_MODELS_KEY", "rec-3d-models-2026")

LOCAL_LIBRARY_DIR = os.environ.get(
    "REC_3D_LIBRARY",
    os.path.expanduser("~/.rec-circuit-design/3d-models"))

# File extensions we're looking for
STEP_EXTENSIONS = {".step", ".stp"}
F3D_EXTENSIONS = {".f3d"}
ALL_3D_EXTENSIONS = STEP_EXTENSIONS | F3D_EXTENSIONS

# Temporary OSS bucket for Model Derivative conversions
OSS_BUCKET_KEY = "rec-3d-harvest-temp"

# Tracking file: designs we've already extracted components from
EXTRACTED_TRACKER = os.path.join(
    os.path.expanduser("~/.rec-circuit-design"), "extracted-designs.json")


def load_extracted_tracker():
    """Load set of design names we've already extracted components from."""
    if os.path.exists(EXTRACTED_TRACKER):
        try:
            with open(EXTRACTED_TRACKER, "r") as f:
                data = json.load(f)
            return data
        except Exception:
            pass
    return {"designs": {}}


def save_extracted_tracker(tracker):
    """Save the extracted designs tracker."""
    os.makedirs(os.path.dirname(EXTRACTED_TRACKER), exist_ok=True)
    with open(EXTRACTED_TRACKER, "w") as f:
        json.dump(tracker, f, indent=2)


def mark_design_extracted(tracker, project_name, design_name, components):
    """Record that a design has been processed."""
    key = "{}/{}".format(project_name, design_name)
    tracker["designs"][key] = {
        "extracted_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "components": components,
    }
    save_extracted_tracker(tracker)


# ── 2-Legged OAuth (Client Credentials) ──

def get_2legged_token(client_id, client_secret):
    """Get a 2-legged access token for OSS and Model Derivative operations.

    2-legged auth (client_credentials) is needed because:
    - Model Derivative can't access Fusion Team hub files with 2-legged auth
    - But it CAN access files in OSS buckets with 2-legged auth
    - So we download from hub (3-legged) → upload to OSS (2-legged) → convert (2-legged)
    """
    resp = requests.post(APS_TOKEN_URL, data={
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "data:read data:write data:create bucket:create bucket:read",
    })

    if resp.status_code != 200:
        print("ERROR: 2-legged auth failed: {} {}".format(
            resp.status_code, resp.text[:200]))
        return None

    data = resp.json()
    return data["access_token"]


# ── OSS Bucket Operations ──

def ensure_oss_bucket(token_2leg, bucket_key):
    """Create an OSS bucket if it doesn't exist. Returns True on success."""
    # Check if bucket exists
    url = APS_BASE + "/oss/v2/buckets/{}/details".format(bucket_key)
    resp = requests.get(url, headers={"Authorization": "Bearer " + token_2leg})

    if resp.status_code == 200:
        return True

    # Create bucket
    url = APS_BASE + "/oss/v2/buckets"
    body = {
        "bucketKey": bucket_key,
        "policyKey": "transient",  # auto-deletes after 24h
    }
    resp = requests.post(url,
                         headers={
                             "Authorization": "Bearer " + token_2leg,
                             "Content-Type": "application/json",
                         },
                         json=body)

    if resp.status_code in (200, 409):  # 409 = already exists
        return True

    print("  ERROR: Failed to create OSS bucket: {} {}".format(
        resp.status_code, resp.text[:200]))
    return False


def upload_to_oss(token_2leg, bucket_key, object_key, data):
    """Upload file data to an OSS bucket via signed S3 URL.

    Uses the newer signeds3upload flow (the old direct PUT is deprecated).
    Returns the object URN or None.
    """
    # Step 1: Get signed upload URL
    sign_url = APS_BASE + "/oss/v2/buckets/{}/objects/{}/signeds3upload".format(
        bucket_key, object_key)
    resp = requests.get(sign_url,
                        headers={"Authorization": "Bearer " + token_2leg},
                        params={"minutesExpiration": 15})

    if resp.status_code != 200:
        print("  ERROR: OSS signed URL failed: {} {}".format(
            resp.status_code, resp.text[:200]))
        return None

    sign_data = resp.json()
    upload_url = sign_data.get("urls", [None])[0]
    upload_key = sign_data.get("uploadKey", "")

    if not upload_url:
        print("  ERROR: No signed upload URL returned")
        return None

    # Step 2: Upload to S3 via signed URL
    resp = requests.put(upload_url,
                        headers={"Content-Type": "application/octet-stream"},
                        data=data,
                        timeout=120)

    if resp.status_code not in (200, 201):
        print("  ERROR: S3 upload failed: {}".format(resp.status_code))
        return None

    # Step 3: Complete the upload (finalize in OSS)
    complete_url = APS_BASE + "/oss/v2/buckets/{}/objects/{}/signeds3upload".format(
        bucket_key, object_key)
    resp = requests.post(complete_url,
                         headers={
                             "Authorization": "Bearer " + token_2leg,
                             "Content-Type": "application/json",
                         },
                         json={"uploadKey": upload_key})

    if resp.status_code != 200:
        print("  ERROR: OSS upload finalize failed: {} {}".format(
            resp.status_code, resp.text[:200]))
        return None

    result = resp.json()
    return result.get("objectId", "")


def delete_from_oss(token_2leg, bucket_key, object_key):
    """Delete an object from OSS bucket."""
    url = APS_BASE + "/oss/v2/buckets/{}/objects/{}".format(
        bucket_key, object_key)
    requests.delete(url, headers={"Authorization": "Bearer " + token_2leg})


# ── Recursive folder scan for 3D files ──

def find_3d_files_recursive(access_token, project_id, folder_id,
                             folder_path="", include_f3d=False):
    """Recursively find 3D model files in a folder tree."""
    target_exts = STEP_EXTENSIONS | (F3D_EXTENSIONS if include_f3d else set())
    results = []

    contents, version_map = list_folder_contents(
        access_token, project_id, folder_id)

    for entry in contents:
        if entry["type"] == "folders":
            sub_path = "{}/{}".format(folder_path, entry["name"])
            results.extend(find_3d_files_recursive(
                access_token, project_id, entry["id"],
                sub_path, include_f3d))

        elif entry["type"] == "items":
            display_name = entry["name"]
            item_id = entry["id"]

            ver_info = version_map.get(item_id, {})
            fname = ver_info.get("filename", display_name)
            mime = ver_info.get("mimeType", "")

            name_lower = fname.lower()
            ext = None
            for e in target_exts:
                if name_lower.endswith(e):
                    ext = e
                    break

            if not ext and include_f3d:
                if "fusion" in mime.lower() or "f3d" in mime.lower():
                    ext = ".f3d"

            if ext:
                results.append({
                    "id": item_id,
                    "name": display_name,
                    "filename": fname,
                    "ext": ext,
                    "folder": folder_path,
                    "mime": mime,
                })

    return results


# ── Model Derivative API (via OSS bucket) ──

def convert_f3d_via_oss(token_3leg, token_2leg, project_id, item_id,
                         file_name, bucket_key):
    """Convert an F3D file to STEP via OSS bucket + Model Derivative.

    Pipeline:
      1. Download F3D from Fusion Team (3-legged token)
      2. Upload to OSS bucket (2-legged token)
      3. Submit Model Derivative translation job (2-legged token)
      4. Poll for completion
      5. Download STEP result
      6. Clean up OSS object

    Returns STEP file bytes on success, None on failure.
    """
    # Step 1: Download F3D from Fusion Team
    print("    Downloading F3D from Fusion Team...")
    f3d_data = download_item(token_3leg, project_id, item_id)
    if not f3d_data or len(f3d_data) < 100:
        print("    FAILED: Could not download F3D file")
        return None
    print("    Downloaded {:,} bytes".format(len(f3d_data)))

    # Step 2: Upload to OSS bucket
    # Use a unique object key to avoid collisions
    obj_hash = hashlib.md5(f3d_data[:1024]).hexdigest()[:8]
    safe_name = re.sub(r'[^a-zA-Z0-9._-]', '_', file_name)
    if not safe_name.lower().endswith('.f3d'):
        safe_name += '.f3d'
    object_key = "harvest_{}__{}".format(obj_hash, safe_name)

    print("    Uploading to OSS bucket...")
    object_urn = upload_to_oss(token_2leg, bucket_key, object_key, f3d_data)
    if not object_urn:
        print("    FAILED: Could not upload to OSS")
        return None
    print("    Uploaded to OSS: {}".format(object_key))

    # Step 3: Submit Model Derivative translation job
    # Encode the OSS URN for Model Derivative (base64url, no padding)
    encoded_urn = base64.urlsafe_b64encode(
        object_urn.encode()).decode().rstrip("=")

    translate_url = APS_BASE + "/modelderivative/v2/designdata/job"
    payload = {
        "input": {
            "urn": encoded_urn,
            "compressedUrn": False,
            "rootFilename": safe_name,
        },
        "output": {
            "formats": [{
                "type": "step",
            }],
            "destination": {
                "region": "us",
            },
        },
    }

    print("    Submitting Model Derivative job (F3D → STEP)...")
    resp = requests.post(translate_url,
                         headers={
                             "Authorization": "Bearer " + token_2leg,
                             "Content-Type": "application/json",
                             "x-ads-force": "true",
                         },
                         json=payload)

    if resp.status_code not in (200, 201):
        print("    FAILED: Translation job failed: {} {}".format(
            resp.status_code, resp.text[:300]))
        delete_from_oss(token_2leg, bucket_key, object_key)
        return None

    result = resp.json()
    print("    Job submitted: {}".format(result.get("result", "unknown")))

    # Step 4: Poll for completion
    manifest_url = APS_BASE + "/modelderivative/v2/designdata/{}/manifest".format(
        encoded_urn)

    step_data = None
    for attempt in range(90):  # Up to ~7.5 minutes
        time.sleep(5)
        mresp = requests.get(manifest_url,
                             headers={"Authorization": "Bearer " + token_2leg})

        if mresp.status_code != 200:
            if attempt < 3:
                continue  # May not be ready yet
            print("    FAILED: Manifest check returned {}".format(mresp.status_code))
            break

        manifest = mresp.json()
        status = manifest.get("status", "")
        progress = manifest.get("progress", "")

        if status == "success":
            print("    Translation complete!")
            # Find the STEP derivative
            step_data = _download_step_derivative(
                token_2leg, encoded_urn, manifest)
            break

        elif status == "failed":
            print("    FAILED: Translation failed")
            # Print failure details
            for deriv in manifest.get("derivatives", []):
                for msg in deriv.get("messages", []):
                    print("      {}: {}".format(
                        msg.get("type", ""), msg.get("message", "")))
            break

        elif status in ("inprogress", "pending"):
            if attempt % 6 == 0:
                print("    Converting... ({})".format(progress))

    # Step 6: Clean up OSS object
    delete_from_oss(token_2leg, bucket_key, object_key)

    return step_data


def _download_step_derivative(token_2leg, encoded_urn, manifest):
    """Find and download the STEP derivative from a completed manifest."""
    for deriv in manifest.get("derivatives", []):
        output_type = deriv.get("outputType", "").lower()

        # Check children for STEP files
        for child in deriv.get("children", []):
            role = child.get("role", "").lower()
            child_type = child.get("type", "").lower()
            urn = child.get("urn", "")

            if role == "step" or child_type in ("step", "stp") or \
               urn.lower().endswith(".step") or urn.lower().endswith(".stp"):
                if urn:
                    dl_url = APS_BASE + \
                        "/modelderivative/v2/designdata/{}/manifest/{}".format(
                            encoded_urn, requests.utils.quote(urn, safe=""))
                    dl_resp = requests.get(
                        dl_url,
                        headers={"Authorization": "Bearer " + token_2leg})
                    if dl_resp.status_code == 200 and len(dl_resp.content) > 50:
                        print("    Downloaded STEP: {:,} bytes".format(
                            len(dl_resp.content)))
                        return dl_resp.content
                    else:
                        print("    WARNING: STEP download returned {}".format(
                            dl_resp.status_code))

        # Also check if the derivative itself is STEP
        if output_type in ("step", "stp"):
            for child in deriv.get("children", []):
                urn = child.get("urn", "")
                if urn:
                    dl_url = APS_BASE + \
                        "/modelderivative/v2/designdata/{}/manifest/{}".format(
                            encoded_urn, requests.utils.quote(urn, safe=""))
                    dl_resp = requests.get(
                        dl_url,
                        headers={"Authorization": "Bearer " + token_2leg})
                    if dl_resp.status_code == 200 and len(dl_resp.content) > 50:
                        print("    Downloaded STEP: {:,} bytes".format(
                            len(dl_resp.content)))
                        return dl_resp.content

    print("    WARNING: Translation succeeded but no STEP output found in manifest")
    # Dump derivative tree for debugging
    for deriv in manifest.get("derivatives", []):
        print("      Derivative: outputType={}, children={}".format(
            deriv.get("outputType"), len(deriv.get("children", []))))
        for child in deriv.get("children", []):
            print("        Child: role={}, type={}, urn={}".format(
                child.get("role"), child.get("type"),
                child.get("urn", "")[:80]))
    return None


# ── STEP Assembly Component Extraction ──

def extract_components_from_step(step_text, design_name=""):
    """Parse a STEP assembly and extract individual component STEP files.

    Finds component packages (CAPC2012X110, SOIC127P600X175-14N, etc.)
    in the assembly, traces their geometry references, and produces
    standalone STEP files for each unique component.

    Args:
        step_text: The STEP file content as a string.
        design_name: The source design name (used to filter out root assembly).

    Returns a list of dicts: {name, key, step_bytes}
    """
    components = []

    # ── Parse all entities ──
    data_start = step_text.find('DATA;')
    if data_start < 0:
        print("    No DATA section found in STEP file")
        return components

    header = step_text[:data_start]
    data_section = step_text[data_start:]
    end_data = data_section.find('END-ISO-10303-21;')
    if end_data > 0:
        data_section = data_section[:end_data]

    entities = {}
    for m in re.finditer(r'#(\d+)\s*=\s*', data_section):
        eid = int(m.group(1))
        semi = data_section.find(';', m.end())
        if semi < 0:
            continue
        entities[eid] = data_section[m.start():semi + 1]

    # ── Find PRODUCT entities ──
    products = {}
    for eid, txt in entities.items():
        pm = re.match(r"#\d+\s*=\s*PRODUCT\s*\(\s*'([^']*)'", txt)
        if pm:
            products[eid] = pm.group(1).strip()

    if len(products) <= 1:
        print("    Only {} PRODUCT entities (no assembly)".format(len(products)))
        return components

    # ── Build component → ABSR mapping via SHAPE_REPRESENTATION_RELATIONSHIP ──
    # Chain: PRODUCT_DEFINITION → PRODUCT_DEFINITION_SHAPE →
    #        SHAPE_DEFINITION_REPRESENTATION → SHAPE_REPRESENTATION →
    #        SHAPE_REPRESENTATION_RELATIONSHIP → ADVANCED_BREP_SHAPE_REPRESENTATION

    # PD name lookup
    pd_names = {}
    for eid, txt in entities.items():
        pm = re.match(r"#\d+\s*=\s*PRODUCT_DEFINITION\s*\(\s*'([^']*)'", txt)
        if pm:
            pd_names[eid] = pm.group(1).strip()

    # PDS → PD
    pds_to_pd = {}
    for eid, txt in entities.items():
        pm = re.match(r"#\d+\s*=\s*PRODUCT_DEFINITION_SHAPE\s*\(", txt)
        if pm:
            refs = re.findall(r'#(\d+)', txt)
            if len(refs) >= 2:
                pds_to_pd[eid] = int(refs[-1])

    # SDR → (PDS, SHAPE_REP)
    sdr_map = {}
    for eid, txt in entities.items():
        if 'SHAPE_DEFINITION_REPRESENTATION' in txt:
            refs = [int(x) for x in re.findall(r'#(\d+)', txt)]
            if len(refs) >= 3:
                sdr_map[eid] = (refs[1], refs[2])  # (PDS, SHAPE_REP)

    # SRR → (SHAPE_REP, ABSR)
    srr_targets = {}  # shape_rep_id → absr_id
    for eid, txt in entities.items():
        if 'SHAPE_REPRESENTATION_RELATIONSHIP' in txt:
            refs = [int(x) for x in re.findall(r'#(\d+)', txt)]
            if len(refs) >= 3:
                srr_targets[refs[1]] = refs[2]  # src_rep → tgt_rep

    # Now map: PD name → ABSR entity ID
    comp_to_absr = {}
    for sdr_id, (pds_id, shape_rep_id) in sdr_map.items():
        pd_id = pds_to_pd.get(pds_id)
        if pd_id and pd_id in pd_names:
            absr_id = srr_targets.get(shape_rep_id)
            if absr_id:
                name = pd_names[pd_id]
                comp_to_absr[name] = absr_id

    # ── Filter to IPC-7351 package names (whitelist approach) ──
    # Only extract components whose names match known IPC package prefixes.
    # This avoids all the noise (Model, Component2, BODY-SO, pins, layers, etc.)
    ipc_prefixes = [
        # Capacitors
        'CAPC', 'CAPMP', 'CAPE', 'CAPPRD',
        # Resistors
        'RESC', 'RESP',
        # Inductors
        'INDC', 'INDM', 'INDP',
        # Diodes
        'DIOM', 'DIOC', 'DIOMELF', 'DO-', 'SOD',
        # Transistors / SOT
        'SOT', 'SOTFL', 'SOT23', 'SOT89', 'SOT223', 'SOT363',
        'DPAK', 'D2PAK', 'TO-', 'TO252', 'TO263',
        # ICs - small outline
        'SOIC', 'SOP', 'SSOP', 'TSSOP', 'MSOP', 'TSOP',
        # ICs - quad
        'QFP', 'TQFP', 'LQFP', 'MQFP', 'QFN', 'DFN',
        # ICs - BGA/LGA
        'BGA', 'LGA', 'CSP',
        # ICs - DIP/leadless
        'DIP', 'PDIP', 'PLCC',
        # Connectors
        'CONN', 'HDR', 'SHDR',
        # Crystals / Oscillators
        'XTAL', 'OSCCC',
        # Fuses
        'FUSC', 'FUSL',
        # LEDs
        'LEDC', 'LED_',
        # Electromechanical
        'SW_', 'RELAY',
    ]

    # Also accept common manufacturer package names
    package_patterns = [
        r'^[A-Z]{2,5}\d{3,4}P\d+',   # e.g. SOIC127P600X175-14N
        r'^[A-Z]{3,4}\d{4}X\d+',      # e.g. CAPC2012X110, RESC1608X60
        r'^\d{4}-\d{2}',               # e.g. 0402-02, 0603-04
        r'^0[2468]\d{2}$',             # e.g. 0402, 0603, 0805, 1206
    ]
    package_re = re.compile('|'.join(package_patterns))

    def is_ipc_name(name):
        """Check if a component name matches IPC package naming conventions."""
        upper = name.upper()
        for prefix in ipc_prefixes:
            if upper.startswith(prefix.upper()):
                return True
        if package_re.match(name):
            return True
        return False

    # Also skip names that are clearly sub-components of a parent
    # (e.g. "440054-4_2", "440054-4_3" — individual pins of a connector)
    # Group by base name, skip if there are >3 numbered variants
    name_groups = {}
    for name in comp_to_absr:
        base = re.sub(r'[_\s]+\d+$', '', name)
        base = re.sub(r'\s*\(\d+\)$', '', base)
        if base not in name_groups:
            name_groups[base] = []
        name_groups[base].append(name)

    sub_part_names = set()
    for base, variants in name_groups.items():
        if len(variants) > 3:
            sub_part_names.update(variants)

    # ── Extract each component's geometry into a standalone STEP ──
    sys.setrecursionlimit(20000)

    def collect_refs(eid, collected):
        if eid in collected or eid not in entities:
            return
        collected.add(eid)
        for ref in re.findall(r'#(\d+)', entities[eid]):
            ref_id = int(ref)
            if ref_id != eid:
                collect_refs(ref_id, collected)

    # Build set of root/design names to skip
    design_skip = set()
    if design_name:
        # Strip extension and sanitize for matching
        dn = re.sub(r'\.(f3d|step|stp)$', '', design_name, flags=re.IGNORECASE)
        design_skip.add(dn.lower())
        design_skip.add(re.sub(r'[^a-zA-Z0-9]', '_', dn).lower())

    seen_names = set()
    for name, absr_id in sorted(comp_to_absr.items()):
        if not is_ipc_name(name):
            continue
        if name in sub_part_names:
            continue
        # Strip instance suffixes: "SOT23-FET (1)" → "SOT23-FET", "CAPC1608X85-2" → "CAPC1608X85"
        base_name = re.sub(r'\s*\(\d+\)\s*$', '', name)
        base_name = re.sub(r'\s+v\d+$', '', base_name)
        # Strip trailing -N or _N instance numbers (but not IPC dimension suffixes like -14N, -64N)
        base_name = re.sub(r'-(\d{1,2})$', lambda m: '' if int(m.group(1)) < 10 and not re.search(r'\d[NM]$', name) else m.group(0), base_name)
        base_name = re.sub(r'__(\d+)__(\d+)$', '', base_name)  # "__1__1" suffixes
        if base_name in seen_names:
            continue
        # Skip root assembly name
        if base_name.lower() in design_skip:
            continue
        if re.sub(r'[^a-zA-Z0-9]', '_', base_name).lower() in design_skip:
            continue
        seen_names.add(base_name)

        # Collect all referenced entities
        ref_set = set()
        collect_refs(absr_id, ref_set)

        # Skip tiny extractions (< 100 entities = just placement, no real geometry)
        if len(ref_set) < 100:
            continue

        # Build standalone STEP with renumbered entities
        old_to_new = {eid: i for i, eid in enumerate(sorted(ref_set), 1)}

        def renumber(match):
            old_id = int(match.group(1))
            new_id = old_to_new.get(old_id)
            return '#' + str(new_id) if new_id else match.group(0)

        body_lines = []
        for eid in sorted(ref_set):
            line = entities[eid]
            line = re.sub(r'#(\d+)', renumber, line)
            line = re.sub(r'^#\d+', '#' + str(old_to_new[eid]), line)
            body_lines.append(line)

        step_out = header + "DATA;\n" + "\n".join(body_lines) + \
            "\nENDSEC;\nEND-ISO-10303-21;\n"

        key = re.sub(r'[^a-zA-Z0-9._-]', '_', base_name)
        components.append({
            "name": base_name,
            "key": key,
            "step_bytes": step_out.encode("utf-8"),
            "entity_count": len(ref_set),
        })

    print("    STEP assembly: {} products, {} extractable components".format(
        len(products), len(components)))
    for c in components[:15]:
        print("      - {} ({} entities, {:,} bytes)".format(
            c["name"], c["entity_count"], len(c["step_bytes"])))
    if len(components) > 15:
        print("      ... and {} more".format(len(components) - 15))

    return components


# ── Upload to team API ──

def upload_to_api(key, data, metadata):
    """Upload a STEP file to the team's 3D model API."""
    try:
        compressed = gzip.compress(data, compresslevel=9)
        body = json.dumps({
            "key": key,
            "partNumber": metadata.get("partNumber", key),
            "manufacturer": metadata.get("manufacturer"),
            "packageName": metadata.get("packageName"),
            "category": metadata.get("category"),
            "tags": metadata.get("tags", []),
            "sourceUrl": metadata.get("sourceUrl", "fusion360-cloud"),
            "usedInDesigns": metadata.get("usedInDesigns", []),
            "encoding": "gzip+base64",
            "stepData": base64.b64encode(compressed).decode(),
        })

        resp = requests.put(
            MODELS_API_URL,
            headers={
                "Authorization": "Bearer " + MODELS_API_KEY,
                "Content-Type": "application/json",
            },
            data=body,
            timeout=30)
        return resp.ok
    except Exception as e:
        print("    Upload failed: {}".format(e))
        return False


def safe_filename(name):
    """Sanitize a filename for local storage."""
    return name.replace("/", "_").replace("\\", "_").replace(":", "_") \
               .replace("*", "_").replace("?", "_").replace('"', "_") \
               .replace("<", "_").replace(">", "_").replace("|", "_")


# ── Main ──

def main():
    parser = argparse.ArgumentParser(
        description="Harvest 3D models from Fusion 360 cloud via APS API")
    parser.add_argument(
        "output_dir", nargs="?", default=None,
        help="Output directory (default: ~/.rec-circuit-design/3d-models/)")
    parser.add_argument(
        "--hub", default=None,
        help="Hub name (interactive if omitted)")
    parser.add_argument(
        "--project", default=None,
        help="Project name (interactive if omitted)")
    parser.add_argument(
        "--all-projects", action="store_true",
        help="Scan all projects in the hub")
    parser.add_argument(
        "--include-f3d", action="store_true",
        help="Also find .f3d files and convert to STEP via Model Derivative API")
    parser.add_argument(
        "--upload", action="store_true",
        help="Upload found models to the team 3D model API")
    parser.add_argument(
        "--filter", default=None,
        help="Only process projects matching this pattern (e.g. 'PCB' for PCB projects)")
    parser.add_argument(
        "--list-only", action="store_true",
        help="List found 3D files without downloading")
    args = parser.parse_args()

    # Check credentials
    client_id = os.environ.get("APS_CLIENT_ID", "")
    client_secret = os.environ.get("APS_CLIENT_SECRET", "")

    if not client_id or not client_secret:
        print("ERROR: APS_CLIENT_ID and APS_CLIENT_SECRET must be set.")
        print("Same setup as aps-export.py — see .env file.")
        sys.exit(1)

    output_dir = args.output_dir or LOCAL_LIBRARY_DIR
    os.makedirs(output_dir, exist_ok=True)

    # Authenticate
    print("=== APS 3D Model Harvester ===")
    print()

    # 3-legged token for Fusion Team data access
    print("Getting 3-legged token (Fusion Team access)...")
    token_3leg = get_access_token(client_id, client_secret)
    print()

    # 2-legged token for OSS + Model Derivative
    token_2leg = None
    if args.include_f3d:
        print("Getting 2-legged token (OSS + Model Derivative)...")
        token_2leg = get_2legged_token(client_id, client_secret)
        if not token_2leg:
            print("WARNING: 2-legged auth failed. F3D conversion won't work.")
            print("Continue with STEP-only scanning? (y/n)")
            if input().strip().lower() != "y":
                sys.exit(1)
        else:
            print("2-legged token acquired.")
            # Ensure OSS bucket exists
            if not ensure_oss_bucket(token_2leg, OSS_BUCKET_KEY):
                print("WARNING: Could not create OSS bucket. F3D conversion won't work.")
                token_2leg = None
            else:
                print("OSS bucket ready: {}".format(OSS_BUCKET_KEY))
        print()

    # Select hub
    print("Listing hubs...")
    hubs = list_hubs(token_3leg)
    if not hubs:
        print("ERROR: No hubs accessible.")
        sys.exit(1)

    if args.hub:
        hub = find_by_name(hubs, args.hub)
    else:
        hub = interactive_select(hubs, "hub")

    print("Hub: {}".format(hub["name"]))
    print()

    # Select project(s)
    print("Listing projects...")
    all_projects = list_projects(token_3leg, hub["id"])
    if not all_projects:
        print("ERROR: No projects found.")
        sys.exit(1)

    if args.all_projects:
        projects_to_scan = all_projects
        if args.filter:
            projects_to_scan = [p for p in projects_to_scan
                                if args.filter.lower() in p["name"].lower()]
        print("Scanning {} projects{}...".format(
            len(projects_to_scan),
            " (filtered: '{}')".format(args.filter) if args.filter else ""))
    elif args.project:
        projects_to_scan = [find_by_name(all_projects, args.project)]
    else:
        projects_to_scan = [interactive_select(all_projects, "project")]

    # Scan for 3D files
    all_3d_files = []

    for project in projects_to_scan:
        print()
        print("Project: {}".format(project["name"]))
        top_folders = list_top_folders(token_3leg, hub["id"], project["id"])

        for folder in top_folders:
            print("  Scanning: {} ...".format(folder["name"]))
            found = find_3d_files_recursive(
                token_3leg, project["id"], folder["id"],
                folder["name"], args.include_f3d)
            for f in found:
                f["project"] = project["name"]
                f["project_id"] = project["id"]
            all_3d_files.extend(found)

    if not all_3d_files:
        print()
        print("No 3D model files found.")
        exts = ".step/.stp"
        if args.include_f3d:
            exts += "/.f3d"
        print("(searched for: {})".format(exts))
        sys.exit(0)

    # Group duplicates by name within each project — keep all versions
    # but process them together (try each until one converts)
    deduped = {}
    for f in all_3d_files:
        key = f["project"] + "/" + f["name"]
        if key not in deduped:
            deduped[key] = []
        deduped[key].append(f)
    total_before = len(all_3d_files)
    # Flatten: keep first entry but attach all versions for fallback
    all_3d_files = []
    for key, versions in deduped.items():
        entry = versions[0]
        entry["_all_versions"] = versions
        all_3d_files.append(entry)
    if total_before > len(all_3d_files):
        print("(Deduplicated: {} → {} unique files)".format(
            total_before, len(all_3d_files)))

    # Report findings
    step_files = [f for f in all_3d_files if f["ext"] in STEP_EXTENSIONS]
    f3d_files = [f for f in all_3d_files if f["ext"] in F3D_EXTENSIONS]

    print()
    print("Found {} 3D files:".format(len(all_3d_files)))
    print("  STEP files: {}".format(len(step_files)))
    if args.include_f3d:
        print("  F3D files:  {} (will convert to STEP)".format(len(f3d_files)))
    print()

    for f in all_3d_files:
        print("  {} [{}] {}".format(
            f["name"], f["ext"], f["folder"]))
    print()

    if args.list_only:
        print("(--list-only mode, skipping download)")
        sys.exit(0)

    # Fetch existing models from API to avoid re-uploading
    existing_keys = set()
    if args.upload:
        print()
        print("Checking existing models on API...")
        try:
            resp = requests.get(
                MODELS_API_URL + "?list=1",
                headers={"Authorization": "Bearer " + MODELS_API_KEY},
                timeout=15)
            if resp.ok:
                data = resp.json()
                existing_keys = set(m.get("key", "") for m in data.get("models", []))
                print("  {} models already on API".format(len(existing_keys)))
        except Exception as e:
            print("  WARNING: Could not check API: {}".format(e))

    # Load tracker of previously extracted designs
    tracker = load_extracted_tracker()
    already_extracted = set(tracker.get("designs", {}).keys())
    if already_extracted:
        print("  {} designs previously extracted".format(len(already_extracted)))

    # Download and process
    downloaded = 0
    converted = 0
    uploaded = 0
    skipped_existing = 0
    skipped_extracted = 0
    failed = 0
    components_found = 0
    manifest_entries = []

    for f in all_3d_files:
        name = f["name"]
        safe_name = safe_filename(name)
        ext = f["ext"]

        # Determine output filename
        if ext in STEP_EXTENSIONS:
            out_name = safe_name if safe_name.lower().endswith((".step", ".stp")) \
                else safe_name + ".step"
        else:
            base = safe_name
            for e in (".f3d", ".F3D"):
                if base.endswith(e):
                    base = base[:-len(e)]
            out_name = base + ".step"

        out_path = os.path.join(output_dir, out_name)

        # Skip if already extracted components from this design
        tracker_key = "{}/{}".format(f["project"], name)
        if tracker_key in already_extracted:
            print("  [skip] {} (already extracted)".format(name))
            skipped_extracted += 1
            manifest_entries.append({
                "name": name, "file": out_name,
                "status": "already_extracted",
            })
            continue

        # Skip if STEP already exists locally
        if os.path.exists(out_path) and os.path.getsize(out_path) > 50:
            print("  [skip] {} (already exists)".format(out_name))
            manifest_entries.append({
                "name": name, "file": out_name,
                "status": "already_exists", "source": "local",
            })
            continue

        print()
        print("  Processing: {} ...".format(name))

        if ext in STEP_EXTENSIONS:
            # Direct download
            raw = download_item(token_3leg, f["project_id"], f["id"])
            if raw and len(raw) > 50:
                with open(out_path, "wb") as fh:
                    fh.write(raw)
                downloaded += 1
                print("    Saved: {} ({:,} bytes)".format(out_name, len(raw)))

                entry = {
                    "name": name, "file": out_name,
                    "status": "downloaded", "size": len(raw),
                    "project": f["project"], "folder": f["folder"],
                }

                if args.upload:
                    key = os.path.splitext(out_name)[0]
                    ok = upload_to_api(key, raw, {
                        "partNumber": name,
                        "sourceUrl": "fusion360://{}{}".format(
                            f["project"], f["folder"]),
                    })
                    if ok:
                        uploaded += 1
                        entry["uploaded"] = True
                        print("    Uploaded to team API")

                manifest_entries.append(entry)
            else:
                failed += 1
                print("    FAILED: Download returned no data")
                manifest_entries.append({
                    "name": name, "file": out_name,
                    "status": "failed", "error": "download returned no data",
                })

        elif ext in F3D_EXTENSIONS and token_2leg:
            # Convert F3D → STEP via OSS + Model Derivative pipeline
            # Try all versions (some may be too small/incomplete to convert)
            versions = f.get("_all_versions", [f])
            step_data = None
            for vi, ver in enumerate(versions):
                if vi > 0:
                    print("    Trying version {}/{}...".format(
                        vi + 1, len(versions)))
                step_data = convert_f3d_via_oss(
                    token_3leg, token_2leg, ver["project_id"], ver["id"],
                    name, OSS_BUCKET_KEY)
                if step_data and len(step_data) > 50:
                    break

            if step_data and len(step_data) > 50:
                with open(out_path, "wb") as fh:
                    fh.write(step_data)
                converted += 1
                print("    Converted & saved: {} ({:,} bytes)".format(
                    out_name, len(step_data)))

                entry = {
                    "name": name, "file": out_name,
                    "status": "converted", "size": len(step_data),
                    "project": f["project"], "folder": f["folder"],
                }

                # Parse STEP assembly and extract individual component STEPs
                try:
                    step_text = step_data.decode("utf-8", errors="replace")
                    comp_list = extract_components_from_step(step_text, name)
                    entry["components"] = [c["name"] for c in comp_list]
                    components_found += len(comp_list)

                    if args.upload and comp_list:
                        comp_uploaded = 0
                        comp_skipped = 0
                        for comp in comp_list:
                            if comp["key"] in existing_keys:
                                comp_skipped += 1
                                continue
                            ok = upload_to_api(comp["key"], comp["step_bytes"], {
                                "partNumber": comp["name"],
                                "packageName": comp["name"],
                                "category": "pcb-component",
                                "tags": ["pcb-component", "extracted",
                                         f["project"]],
                                "sourceUrl": "fusion360://{}{}".format(
                                    f["project"], f["folder"]),
                                "usedInDesigns": ["{}/{}".format(
                                    f["project"], name)],
                            })
                            if ok:
                                comp_uploaded += 1
                                uploaded += 1
                                existing_keys.add(comp["key"])
                        if comp_skipped:
                            skipped_existing += comp_skipped
                            print("    Skipped {} (already on API)".format(
                                comp_skipped))
                        if comp_uploaded:
                            print("    Uploaded {} component models".format(
                                comp_uploaded))
                        entry["uploaded_components"] = comp_uploaded
                        entry["skipped_components"] = comp_skipped
                    # Mark this design as extracted in tracker
                    mark_design_extracted(
                        tracker, f["project"], name,
                        [c["name"] for c in comp_list])
                except Exception as e:
                    print("    WARNING: STEP parsing/upload failed: {}".format(e))
                    import traceback
                    traceback.print_exc()

                manifest_entries.append(entry)
            else:
                failed += 1
                print("    FAILED: F3D → STEP conversion produced no output")
                manifest_entries.append({
                    "name": name, "file": out_name,
                    "status": "failed", "error": "conversion failed",
                })

        elif ext in F3D_EXTENSIONS and not token_2leg:
            print("    SKIPPED: No 2-legged token for F3D conversion")
            manifest_entries.append({
                "name": name, "file": out_name,
                "status": "skipped", "error": "no 2-legged token",
            })

    # Write harvest manifest
    manifest = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "source": "aps-3d-harvest",
        "hub": hub["name"],
        "projects_scanned": [p["name"] for p in projects_to_scan],
        "output_dir": output_dir,
        "summary": {
            "total_found": len(all_3d_files),
            "step_downloaded": downloaded,
            "f3d_converted": converted,
            "uploaded_to_api": uploaded,
            "components_found": components_found,
            "skipped_existing": skipped_existing,
            "skipped_already_extracted": skipped_extracted,
            "failed": failed,
        },
        "files": manifest_entries,
    }

    manifest_path = os.path.join(output_dir, "harvest_manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print()
    print("=== Harvest Complete ===")
    print("  STEP downloaded:    {}".format(downloaded))
    if args.include_f3d:
        print("  F3D converted:      {}".format(converted))
        print("  Components found:   {}".format(components_found))
    if args.upload:
        print("  Uploaded to API:    {}".format(uploaded))
        print("  Skipped (existing): {}".format(skipped_existing))
    if skipped_extracted:
        print("  Skipped (extracted):{}".format(skipped_extracted))
    print("  Failed:             {}".format(failed))
    print("  Tracker:            {}".format(EXTRACTED_TRACKER))
    print("  Output:             {}".format(output_dir))
    print("  Manifest:           {}".format(manifest_path))


if __name__ == "__main__":
    main()
