#!/usr/bin/env python3
"""Explore ALL files in a Fusion 360 Team project via APS API.

Lists every file with its MIME type, so we can discover component
library files, 3D models, and other assets beyond .fsch/.fbrd.

Usage:
    python3 explore-project.py [--hub NAME] [--project NAME]
"""

import json
import os
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: pip3 install requests")
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

# Import from aps-export.py (hyphenated filename requires importlib)
import importlib.util
_spec = importlib.util.spec_from_file_location(
    "aps_export",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "aps-export.py"))
_aps = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_aps)

get_access_token = _aps.get_access_token
list_hubs = _aps.list_hubs
list_projects = _aps.list_projects
list_top_folders = _aps.list_top_folders
find_by_name = _aps.find_by_name
aps_get = _aps.aps_get

APS_BASE = "https://developer.api.autodesk.com"


def list_folder_contents_full(access_token, project_id, folder_id):
    """List ALL contents of a folder with full metadata."""
    items = []
    url = APS_BASE + "/data/v1/projects/{}/folders/{}/contents".format(
        project_id, folder_id)

    while url:
        data = aps_get(access_token, url)
        if not data:
            break

        # Build version map from included data
        version_map = {}
        for inc in data.get("included", []):
            if inc.get("type") == "versions":
                attrs = inc.get("attributes", {})
                item_rel = (inc.get("relationships", {})
                            .get("item", {}).get("data", {}))
                item_id = item_rel.get("id", "")
                if item_id:
                    version_map[item_id] = {
                        "filename": attrs.get("name", ""),
                        "mimeType": attrs.get("mimeType", ""),
                        "fileType": attrs.get("fileType", ""),
                        "createTime": attrs.get("createTime", ""),
                        "lastModifiedTime": attrs.get("lastModifiedTime", ""),
                        "versionNumber": attrs.get("versionNumber", 0),
                        "storageSize": attrs.get("storageSize", 0),
                    }

        for entry in data.get("data", []):
            entry_type = entry.get("type", "")
            name = entry.get("attributes", {}).get("displayName", "")
            entry_id = entry["id"]

            ver = version_map.get(entry_id, {})

            items.append({
                "id": entry_id,
                "type": entry_type,
                "name": name,
                "filename": ver.get("filename", ""),
                "mimeType": ver.get("mimeType", ""),
                "fileType": ver.get("fileType", ""),
                "version": ver.get("versionNumber", ""),
                "size": ver.get("storageSize", 0),
                "lastModified": ver.get("lastModifiedTime", ""),
            })

        url = data.get("links", {}).get("next", {})
        if isinstance(url, dict):
            url = url.get("href")

    return items


def explore_recursive(access_token, project_id, folder_id, path="", depth=0):
    """Recursively list all files in a project."""
    contents = list_folder_contents_full(access_token, project_id, folder_id)

    for entry in contents:
        indent = "  " * depth
        if entry["type"] == "folders":
            print("{}📁 {}".format(indent, entry["name"]))
            explore_recursive(
                access_token, project_id, entry["id"],
                "{}/{}".format(path, entry["name"]), depth + 1)
        else:
            mime = entry.get("mimeType", "?")
            size_kb = entry.get("size", 0) / 1024
            version = entry.get("version", "")
            print("{}  {} [v{}] ({}) {:.0f}KB".format(
                indent, entry["name"], version, mime, size_kb))


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Explore Fusion 360 project files")
    parser.add_argument("--hub", default=None)
    parser.add_argument("--project", default=None)
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    args = parser.parse_args()

    client_id = os.environ.get("APS_CLIENT_ID", "")
    client_secret = os.environ.get("APS_CLIENT_SECRET", "")
    if not client_id or not client_secret:
        print("ERROR: APS_CLIENT_ID and APS_CLIENT_SECRET required")
        sys.exit(1)

    access_token = get_access_token(client_id, client_secret)

    # Select hub
    hubs = list_hubs(access_token)
    if args.hub:
        hub = find_by_name(hubs, args.hub)
    else:
        print("Hubs:")
        for h in hubs:
            print("  - {}".format(h["name"]))
        sys.exit(0)

    # Select project
    projects = list_projects(access_token, hub["id"])
    if args.project:
        project = find_by_name(projects, args.project)
    else:
        print("Projects in {}:".format(hub["name"]))
        for p in projects:
            print("  - {}".format(p["name"]))
        sys.exit(0)

    print("=== {} / {} ===".format(hub["name"], project["name"]))
    print()

    top_folders = list_top_folders(access_token, hub["id"], project["id"])
    for folder in top_folders:
        print("📁 {}".format(folder["name"]))
        explore_recursive(
            access_token, project["id"], folder["id"],
            folder["name"], 1)
    print()
    print("Done.")


if __name__ == "__main__":
    main()
