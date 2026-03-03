#!/usr/bin/env python3
"""Run all analysis scripts and validate outputs.

Orchestrates the 8 analysis scripts, validates JSON output structure,
and reports summary statistics.
"""

import json
import os
import sys
import time

# Add parent directory to path for shared imports
sys.path.insert(0, os.path.dirname(__file__))

from analyze_decoupling import analyze as analyze_decoupling
from analyze_power_supplies import analyze as analyze_power_supplies
from analyze_mcus import analyze as analyze_mcus
from analyze_pullups import analyze as analyze_pullups
from analyze_ground_routing import analyze as analyze_ground_routing
from analyze_placement import analyze as analyze_placement
from analyze_silkscreen import analyze as analyze_silkscreen
from analyze_connectors import analyze as analyze_connectors

ANALYSIS_DIR = os.path.dirname(__file__)


def validate_json(filepath, required_keys):
    """Validate that a JSON file exists and has expected top-level keys."""
    if not os.path.exists(filepath):
        return False, f"File not found: {filepath}"

    with open(filepath) as f:
        data = json.load(f)

    missing = [k for k in required_keys if k not in data]
    if missing:
        return False, f"Missing keys in {os.path.basename(filepath)}: {missing}"

    summary = data.get("summary", {})
    return True, summary


def run_all():
    print("=" * 60)
    print("REC Design Analysis Pipeline")
    print("=" * 60)
    print()

    analyses = [
        ("1. Decoupling Patterns", analyze_decoupling,
         "decoupling_patterns.json", ["summary", "patterns", "distance_histogram"]),
        ("2. Power Supply Patterns", analyze_power_supplies,
         "power_supply_patterns.json", ["summary", "supply_patterns", "triac_circuits", "emc_components"]),
        ("3. MCU Patterns", analyze_mcus,
         "mcu_patterns.json", ["summary", "profiles", "family_summary"]),
        ("4. Pull-up Patterns", analyze_pullups,
         "pullup_patterns.json", ["summary", "patterns", "bus_type_summary"]),
        ("5. Ground Routing", analyze_ground_routing,
         "ground_routing_patterns.json", ["summary", "power_net_trace_widths", "via_stitching"]),
        ("6. Placement Patterns", analyze_placement,
         "placement_patterns.json", ["summary", "density_stats", "connector_placement", "mounting_holes"]),
        ("7. Silkscreen Conventions", analyze_silkscreen,
         "silkscreen_patterns.json", ["summary", "layer_summaries", "font_usage"]),
        ("8. Connector Patterns", analyze_connectors,
         "connector_patterns.json", ["summary", "connector_types"]),
    ]

    results = {}
    errors = []
    total_start = time.time()

    for name, func, output_file, required_keys in analyses:
        print(f"\n{'─' * 50}")
        print(f"Running: {name}")
        print(f"{'─' * 50}")

        start = time.time()
        try:
            func()
            elapsed = time.time() - start
            print(f"  ✓ Completed in {elapsed:.1f}s")

            # Validate
            filepath = os.path.join(ANALYSIS_DIR, output_file)
            valid, info = validate_json(filepath, required_keys)
            if valid:
                results[name] = {"status": "OK", "summary": info, "time": round(elapsed, 1)}
                print(f"  ✓ Validated: {output_file}")
            else:
                results[name] = {"status": "VALIDATION_FAILED", "error": info}
                errors.append(f"{name}: {info}")
                print(f"  ✗ Validation failed: {info}")

        except Exception as e:
            elapsed = time.time() - start
            results[name] = {"status": "ERROR", "error": str(e)}
            errors.append(f"{name}: {e}")
            print(f"  ✗ Error after {elapsed:.1f}s: {e}")
            import traceback
            traceback.print_exc()

    total_elapsed = time.time() - total_start

    # Summary
    print()
    print("=" * 60)
    print("ANALYSIS SUMMARY")
    print("=" * 60)
    print()

    ok_count = sum(1 for r in results.values() if r["status"] == "OK")
    print(f"Completed: {ok_count}/{len(analyses)} analyses")
    print(f"Total time: {total_elapsed:.1f}s")
    print()

    for name, result in results.items():
        status = "✓" if result["status"] == "OK" else "✗"
        print(f"  {status} {name}")
        if result["status"] == "OK" and "summary" in result:
            summary = result["summary"]
            if isinstance(summary, dict):
                for k, v in summary.items():
                    print(f"      {k}: {v}")

    if errors:
        print()
        print("ERRORS:")
        for err in errors:
            print(f"  - {err}")

    # Write combined summary
    summary_path = os.path.join(ANALYSIS_DIR, "analysis_summary.json")
    with open(summary_path, "w") as f:
        json.dump({
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "total_time_seconds": round(total_elapsed, 1),
            "results": {k: {"status": v["status"], "summary": v.get("summary", {})} for k, v in results.items()},
            "errors": errors,
        }, f, indent=2)

    print()
    print(f"Summary written to: {summary_path}")
    print()

    return len(errors) == 0


if __name__ == "__main__":
    success = run_all()
    sys.exit(0 if success else 1)
