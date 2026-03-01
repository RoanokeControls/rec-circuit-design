#!/usr/bin/env python3
"""APS API Downloader for Fusion 360 Electronics Batch Export.

Downloads .fsch/.fbrd files directly from Autodesk Platform Services
(APS) Data Management API, parses EAGLE XML, and produces JSON exports
identical to batch-export.py.

This bypasses the local Fusion 360 cache — exports ALL electronics
designs across a hub, including ones never opened on this Mac.

Usage:
    python3 aps-export.py [output_dir] [--hub NAME] [--project NAME]
                          [--folder PATH] [--filter NAME]

Setup:
    1. Create app at https://aps.autodesk.com
    2. Enable Data Management API
    3. Set callback URL: http://localhost:8080/callback
    4. Create .env file with APS_CLIENT_ID and APS_CLIENT_SECRET
    5. pip3 install requests python-dotenv
"""

import argparse
import base64
import json
import os
import sys
import threading
import time
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlencode, urlparse, parse_qs

try:
    import requests
except ImportError:
    print("ERROR: 'requests' package required. Install with:")
    print("  pip3 install requests")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass  # python-dotenv is optional; fall back to env vars

from fusion_parsers import (
    extract_eagle_xml,
    generate_master_json,
    load_rec_library,
    parse_board,
    parse_schematic,
)

# ── Constants ──────────────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN_CACHE = os.path.expanduser("~/.aps-token.json")

APS_AUTH_URL = "https://developer.api.autodesk.com/authentication/v2/authorize"
APS_TOKEN_URL = "https://developer.api.autodesk.com/authentication/v2/token"
APS_BASE = "https://developer.api.autodesk.com"

CALLBACK_PORT = 8080
CALLBACK_PATH = "/callback"
REDIRECT_URI = "http://localhost:{}{}" .format(CALLBACK_PORT, CALLBACK_PATH)

SCOPES = "data:read"


# ── OAuth 3-Legged Flow ──────────────────────────────────────────

class OAuthCallbackHandler(BaseHTTPRequestHandler):
    """HTTP handler that captures the OAuth callback code."""

    auth_code = None
    error = None

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == CALLBACK_PATH:
            params = parse_qs(parsed.query)
            if "code" in params:
                OAuthCallbackHandler.auth_code = params["code"][0]
                self.send_response(200)
                self.send_header("Content-Type", "text/html")
                self.end_headers()
                self.wfile.write(
                    b"<html><body><h2>Authorization successful!</h2>"
                    b"<p>You can close this tab and return to the terminal.</p>"
                    b"</body></html>"
                )
            elif "error" in params:
                OAuthCallbackHandler.error = params.get(
                    "error_description", params["error"])[0]
                self.send_response(400)
                self.send_header("Content-Type", "text/html")
                self.end_headers()
                self.wfile.write(
                    "<html><body><h2>Authorization failed</h2>"
                    "<p>{}</p></body></html>".format(
                        OAuthCallbackHandler.error).encode()
                )
            else:
                self.send_response(404)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress default logging


def load_cached_tokens():
    """Load tokens from cache file."""
    if os.path.exists(TOKEN_CACHE):
        try:
            with open(TOKEN_CACHE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return None


def save_tokens(tokens):
    """Save tokens to cache file."""
    with open(TOKEN_CACHE, "w") as f:
        json.dump(tokens, f, indent=2)
    os.chmod(TOKEN_CACHE, 0o600)


def refresh_access_token(client_id, client_secret, refresh_token):
    """Refresh an expired access token."""
    resp = requests.post(APS_TOKEN_URL, data={
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": SCOPES,
    })

    if resp.status_code != 200:
        return None

    data = resp.json()
    tokens = {
        "access_token": data["access_token"],
        "refresh_token": data.get("refresh_token", refresh_token),
        "expires_at": time.time() + data.get("expires_in", 3600) - 60,
    }
    save_tokens(tokens)
    return tokens


def do_oauth_flow(client_id, client_secret):
    """Run the full 3-legged OAuth flow (opens browser)."""
    # Build authorize URL
    params = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPES,
    }
    auth_url = "{}?{}".format(APS_AUTH_URL, urlencode(params))

    # Reset handler state
    OAuthCallbackHandler.auth_code = None
    OAuthCallbackHandler.error = None

    # Start callback server
    server = HTTPServer(("localhost", CALLBACK_PORT), OAuthCallbackHandler)
    server_thread = threading.Thread(target=server.handle_request)
    server_thread.daemon = True
    server_thread.start()

    print("Opening browser for Autodesk login...")
    print("  (if browser doesn't open, visit this URL manually:)")
    print("  {}".format(auth_url))
    print()
    webbrowser.open(auth_url)

    # Wait for callback
    print("Waiting for authorization callback...")
    server_thread.join(timeout=120)
    server.server_close()

    if OAuthCallbackHandler.error:
        print("ERROR: OAuth failed: {}".format(OAuthCallbackHandler.error))
        sys.exit(1)

    if not OAuthCallbackHandler.auth_code:
        print("ERROR: No authorization code received (timed out).")
        sys.exit(1)

    auth_code = OAuthCallbackHandler.auth_code
    print("Authorization code received. Exchanging for tokens...")

    # Exchange code for tokens
    resp = requests.post(APS_TOKEN_URL, data={
        "grant_type": "authorization_code",
        "code": auth_code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": REDIRECT_URI,
    })

    if resp.status_code != 200:
        print("ERROR: Token exchange failed: {} {}".format(
            resp.status_code, resp.text))
        sys.exit(1)

    data = resp.json()
    tokens = {
        "access_token": data["access_token"],
        "refresh_token": data.get("refresh_token", ""),
        "expires_at": time.time() + data.get("expires_in", 3600) - 60,
    }
    save_tokens(tokens)
    print("Tokens saved to {}".format(TOKEN_CACHE))
    return tokens


def get_access_token(client_id, client_secret):
    """Get a valid access token, refreshing or re-authing as needed."""
    cached = load_cached_tokens()

    if cached:
        # Token still valid?
        if cached.get("expires_at", 0) > time.time():
            return cached["access_token"]

        # Try refresh
        if cached.get("refresh_token"):
            print("Access token expired, refreshing...")
            refreshed = refresh_access_token(
                client_id, client_secret, cached["refresh_token"])
            if refreshed:
                print("Token refreshed.")
                return refreshed["access_token"]
            print("Refresh failed, starting new auth flow...")

    # Full OAuth flow
    tokens = do_oauth_flow(client_id, client_secret)
    return tokens["access_token"]


# ── APS Data Management API ──────────────────────────────────────

def aps_get(access_token, url, params=None):
    """Make an authenticated GET request to the APS API."""
    headers = {"Authorization": "Bearer " + access_token}
    resp = requests.get(url, headers=headers, params=params)

    if resp.status_code == 401:
        print("ERROR: Access token expired or invalid.")
        print("Delete {} and re-run to re-authenticate.".format(TOKEN_CACHE))
        sys.exit(1)

    if resp.status_code != 200:
        print("ERROR: API request failed: {} {}".format(
            resp.status_code, resp.text[:200]))
        return None

    return resp.json()


def list_hubs(access_token):
    """List all accessible hubs."""
    data = aps_get(access_token, APS_BASE + "/project/v1/hubs")
    if not data:
        return []
    return [
        {
            "id": h["id"],
            "name": h["attributes"]["name"],
            "type": h["attributes"].get("extension", {}).get("type", ""),
        }
        for h in data.get("data", [])
    ]


def list_projects(access_token, hub_id):
    """List all projects in a hub."""
    projects = []
    url = APS_BASE + "/project/v1/hubs/{}/projects".format(hub_id)

    while url:
        data = aps_get(access_token, url)
        if not data:
            break
        for p in data.get("data", []):
            projects.append({
                "id": p["id"],
                "name": p["attributes"]["name"],
            })
        # Handle pagination
        url = data.get("links", {}).get("next", {})
        if isinstance(url, dict):
            url = url.get("href")

    return projects


def list_top_folders(access_token, hub_id, project_id):
    """List top-level folders in a project."""
    data = aps_get(
        access_token,
        APS_BASE + "/project/v1/hubs/{}/projects/{}/topFolders".format(
            hub_id, project_id))
    if not data:
        return []
    return [
        {
            "id": f["id"],
            "name": f["attributes"]["name"],
        }
        for f in data.get("data", [])
    ]


def list_folder_contents(access_token, project_id, folder_id):
    """List contents of a folder (items + subfolders), with pagination."""
    items = []
    url = APS_BASE + "/data/v1/projects/{}/folders/{}/contents".format(
        project_id, folder_id)

    while url:
        data = aps_get(access_token, url)
        if not data:
            break
        for entry in data.get("data", []):
            entry_type = entry.get("type", "")
            name = entry.get("attributes", {}).get("displayName", "")
            items.append({
                "id": entry["id"],
                "type": entry_type,
                "name": name,
            })
        # Handle pagination
        url = data.get("links", {}).get("next", {})
        if isinstance(url, dict):
            url = url.get("href")

    return items


def find_electronics_recursive(access_token, project_id, folder_id,
                                folder_path="", name_filter=None):
    """Recursively find .fsch/.fbrd items in a folder tree.

    Returns list of dicts with id, name, extension, folder_path.
    """
    results = []
    contents = list_folder_contents(access_token, project_id, folder_id)

    for entry in contents:
        if entry["type"] == "folders":
            # Recurse into subfolders
            sub_path = "{}/{}".format(folder_path, entry["name"])
            results.extend(find_electronics_recursive(
                access_token, project_id, entry["id"],
                sub_path, name_filter))

        elif entry["type"] == "items":
            name = entry["name"]
            if name.endswith(".fsch") or name.endswith(".fbrd"):
                if name_filter and name_filter.lower() not in name.lower():
                    continue
                ext = name[-4:]  # .fsch or .fbrd (but these are 5 chars)
                if name.endswith(".fsch"):
                    ext = "fsch"
                elif name.endswith(".fbrd"):
                    ext = "fbrd"
                results.append({
                    "id": entry["id"],
                    "name": name,
                    "ext": ext,
                    "folder": folder_path,
                })

    return results


# ── File Download ─────────────────────────────────────────────────

def get_item_tip(access_token, project_id, item_id):
    """Get the latest version (tip) of an item, including storage URN."""
    data = aps_get(
        access_token,
        APS_BASE + "/data/v1/projects/{}/items/{}/tip".format(
            project_id, item_id))
    if not data:
        return None

    storage = (data.get("data", {})
               .get("relationships", {})
               .get("storage", {})
               .get("data", {}))

    return {
        "version_id": data.get("data", {}).get("id", ""),
        "storage_id": storage.get("id", ""),
    }


def parse_storage_urn(storage_id):
    """Parse an OSS storage URN into bucket key and object key.

    Format: urn:adsk.objects:os.object:bucket_key/object_key
    """
    if not storage_id or not storage_id.startswith("urn:adsk.objects:os.object:"):
        return None, None

    path = storage_id[len("urn:adsk.objects:os.object:"):]
    slash_idx = path.find("/")
    if slash_idx < 0:
        return None, None

    bucket_key = path[:slash_idx]
    object_key = path[slash_idx + 1:]
    return bucket_key, object_key


def download_file(access_token, bucket_key, object_key):
    """Download a file from OSS via signed S3 URL.

    Returns raw bytes of the file.
    """
    # Get signed S3 download URL
    url = APS_BASE + "/oss/v2/buckets/{}/objects/{}/signeds3download".format(
        bucket_key, object_key)
    data = aps_get(access_token, url)
    if not data:
        return None

    signed_url = data.get("url")
    if not signed_url:
        print("  Warning: No signed URL returned for {}/{}".format(
            bucket_key, object_key))
        return None

    # Download the actual file
    resp = requests.get(signed_url)
    if resp.status_code != 200:
        print("  Warning: Download failed ({}) for {}".format(
            resp.status_code, object_key))
        return None

    return resp.content


def download_item(access_token, project_id, item_id):
    """Download the latest version of an item. Returns raw bytes."""
    tip = get_item_tip(access_token, project_id, item_id)
    if not tip or not tip["storage_id"]:
        print("  Warning: Could not resolve storage for item {}".format(item_id))
        return None

    bucket_key, object_key = parse_storage_urn(tip["storage_id"])
    if not bucket_key:
        print("  Warning: Could not parse storage URN: {}".format(
            tip["storage_id"]))
        return None

    return download_file(access_token, bucket_key, object_key)


# ── Interactive Selection ─────────────────────────────────────────

def interactive_select(items, label, name_key="name"):
    """Let user pick from a numbered list. Returns selected item."""
    if not items:
        print("No {} found.".format(label))
        sys.exit(1)

    if len(items) == 1:
        print("Using {}: {}".format(label, items[0][name_key]))
        return items[0]

    print()
    print("Available {}:".format(label))
    for i, item in enumerate(items, 1):
        print("  {}. {}".format(i, item[name_key]))
    print()

    while True:
        try:
            choice = input("Select {} (1-{}): ".format(label, len(items)))
            idx = int(choice) - 1
            if 0 <= idx < len(items):
                return items[idx]
        except (ValueError, EOFError):
            pass
        print("Invalid choice.")


def find_by_name(items, name, name_key="name"):
    """Find an item by name (case-insensitive substring match)."""
    exact = [i for i in items if i[name_key].lower() == name.lower()]
    if exact:
        return exact[0]

    partial = [i for i in items if name.lower() in i[name_key].lower()]
    if len(partial) == 1:
        return partial[0]
    if len(partial) > 1:
        print("Multiple matches for '{}':".format(name))
        for i in partial:
            print("  - {}".format(i[name_key]))
        print("Please be more specific.")
        sys.exit(1)

    print("No {} matching '{}'.".format(name_key, name))
    sys.exit(1)


# ── Export Orchestration ──────────────────────────────────────────

def group_designs(electronics_files):
    """Group .fsch/.fbrd files into designs by base name.

    Returns dict keyed by design name with fsch/fbrd item entries.
    """
    designs = {}

    for item in electronics_files:
        name = item["name"]
        # Strip extension
        if name.endswith(".fsch"):
            base = name[:-5]
            ext = "fsch"
        elif name.endswith(".fbrd"):
            base = name[:-5]
            ext = "fbrd"
        else:
            continue

        if base not in designs:
            designs[base] = {"fsch": None, "fbrd": None}

        designs[base][ext] = item

    return designs


def export_designs(access_token, project_id, designs, output_dir, rec_lib):
    """Download and export all designs."""
    exported = 0
    errors = 0
    manifest = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "source": "aps-api",
        "project_id": project_id,
        "output_directory": output_dir,
        "exports": [],
    }

    for design_name in sorted(designs.keys()):
        files = designs[design_name]
        print("Exporting: {} ...".format(design_name))

        export_entry = {
            "design": design_name,
            "schematic_exported": False,
            "board_exported": False,
        }

        # Export schematic
        if files["fsch"]:
            item = files["fsch"]
            print("  Downloading schematic...")
            raw_bytes = download_item(access_token, project_id, item["id"])
            if raw_bytes:
                xml = extract_eagle_xml(raw_bytes, ".sch")
                if xml:
                    try:
                        sch_data = parse_schematic(xml, design_name)
                        if sch_data:
                            out_path = os.path.join(
                                output_dir,
                                "{}_schematic.json".format(design_name))
                            with open(out_path, "w") as f:
                                json.dump(sch_data, f, indent=2)
                            export_entry["schematic_exported"] = True
                            print("  Schematic: OK ({} parts)".format(
                                len(sch_data.get("parts", []))))
                        else:
                            print("  Schematic: No schematic data found in XML")
                    except Exception as e:
                        print("  Schematic: ERROR - {}".format(e))
                        export_entry["schematic_error"] = str(e)
                else:
                    print("  Schematic: Could not extract .sch from downloaded data")
            else:
                print("  Schematic: Download failed")

        # Export board
        if files["fbrd"]:
            item = files["fbrd"]
            print("  Downloading board...")
            raw_bytes = download_item(access_token, project_id, item["id"])
            if raw_bytes:
                xml = extract_eagle_xml(raw_bytes, ".brd")
                if xml:
                    try:
                        brd_data = parse_board(xml, design_name)
                        if brd_data:
                            out_path = os.path.join(
                                output_dir,
                                "{}_board.json".format(design_name))
                            with open(out_path, "w") as f:
                                json.dump(brd_data, f, indent=2)
                            export_entry["board_exported"] = True
                            print("  Board: OK ({} elements, {} signals)".format(
                                len(brd_data.get("elements", [])),
                                len(brd_data.get("signals", []))))
                        else:
                            print("  Board: No board data found in XML")
                    except Exception as e:
                        print("  Board: ERROR - {}".format(e))
                        export_entry["board_error"] = str(e)
                else:
                    print("  Board: Could not extract .brd from downloaded data")
            else:
                print("  Board: Download failed")

        manifest["exports"].append(export_entry)

        if export_entry["schematic_exported"] or export_entry["board_exported"]:
            exported += 1
        else:
            errors += 1

    return exported, errors, manifest


# ── Main ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Export Fusion 360 Electronics designs via APS API")
    parser.add_argument(
        "output_dir", nargs="?", default=None,
        help="Output directory (default: ./aps-export-output/)")
    parser.add_argument(
        "--hub", default=None,
        help="Hub name (interactive selection if omitted)")
    parser.add_argument(
        "--project", default=None,
        help="Project name (interactive selection if omitted)")
    parser.add_argument(
        "--folder", default=None,
        help="Folder path to search (searches all folders if omitted)")
    parser.add_argument(
        "--filter", default=None,
        help="Only export designs matching this name substring")
    args = parser.parse_args()

    # Check credentials
    client_id = os.environ.get("APS_CLIENT_ID", "")
    client_secret = os.environ.get("APS_CLIENT_SECRET", "")

    if not client_id or not client_secret:
        print("ERROR: APS_CLIENT_ID and APS_CLIENT_SECRET must be set.")
        print()
        print("Either create a .env file in {}:".format(SCRIPT_DIR))
        print("  APS_CLIENT_ID=your_client_id")
        print("  APS_CLIENT_SECRET=your_client_secret")
        print()
        print("Or set environment variables:")
        print("  export APS_CLIENT_ID=your_client_id")
        print("  export APS_CLIENT_SECRET=your_client_secret")
        sys.exit(1)

    output_dir = args.output_dir or os.path.join(
        os.getcwd(), "aps-export-output")
    os.makedirs(output_dir, exist_ok=True)

    # Authenticate
    print("=== APS Electronics Export ===")
    print()
    access_token = get_access_token(client_id, client_secret)
    print()

    # Select hub
    print("Listing hubs...")
    hubs = list_hubs(access_token)
    if not hubs:
        print("ERROR: No hubs accessible with this account.")
        sys.exit(1)

    if args.hub:
        hub = find_by_name(hubs, args.hub)
    else:
        hub = interactive_select(hubs, "hub")

    print("Hub: {} ({})".format(hub["name"], hub["id"]))
    print()

    # Select project
    print("Listing projects...")
    projects = list_projects(access_token, hub["id"])
    if not projects:
        print("ERROR: No projects found in hub '{}'.".format(hub["name"]))
        sys.exit(1)

    if args.project:
        project = find_by_name(projects, args.project)
    else:
        project = interactive_select(projects, "project")

    print("Project: {} ({})".format(project["name"], project["id"]))
    print()

    # Find electronics files
    print("Scanning for electronics files (.fsch / .fbrd)...")
    top_folders = list_top_folders(access_token, hub["id"], project["id"])

    if args.folder:
        # Find matching top folder
        folder = find_by_name(top_folders, args.folder)
        electronics = find_electronics_recursive(
            access_token, project["id"], folder["id"],
            folder["name"], args.filter)
    else:
        # Search all top-level folders
        electronics = []
        for folder in top_folders:
            print("  Scanning: {} ...".format(folder["name"]))
            found = find_electronics_recursive(
                access_token, project["id"], folder["id"],
                folder["name"], args.filter)
            electronics.extend(found)

    if not electronics:
        print("No electronics files found.")
        if args.filter:
            print("(filter: '{}')".format(args.filter))
        sys.exit(1)

    # Group by design
    designs = group_designs(electronics)

    print()
    print("Found {} electronics designs ({} files):".format(
        len(designs), len(electronics)))
    for name, files in sorted(designs.items()):
        sch = "sch" if files["fsch"] else "---"
        brd = "brd" if files["fbrd"] else "---"
        folder = ""
        for f in (files["fsch"], files["fbrd"]):
            if f and f.get("folder"):
                folder = " ({})".format(f["folder"])
                break
        print("  {} [{}|{}]{}".format(name, sch, brd, folder))
    print()

    # Load REC library
    rec_lib = load_rec_library()
    if rec_lib["devicesets"]:
        print("REC library loaded: {} devicesets".format(
            len(rec_lib["devicesets"])))
    else:
        print("REC library not found (skipping cross-references)")
    print()

    # Export
    print("Output directory: {}".format(output_dir))
    print()
    exported, errors, manifest = export_designs(
        access_token, project["id"], designs, output_dir, rec_lib)
    print()

    # Generate master.json
    if exported > 0:
        try:
            master_path = generate_master_json(output_dir, rec_lib)
            print("Master JSON: {}".format(master_path))
        except Exception as e:
            print("Master JSON generation failed: {}".format(e))

    # Write manifest
    manifest["summary"] = {
        "designs_found": len(designs),
        "designs_exported": exported,
        "errors": errors,
        "hub": hub["name"],
        "project": project["name"],
    }
    manifest_path = os.path.join(output_dir, "export_manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print()
    print("Done! {} designs exported, {} errors".format(exported, errors))
    print("Output: {}".format(output_dir))


if __name__ == "__main__":
    main()
