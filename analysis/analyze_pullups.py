#!/usr/bin/env python3
"""Analyze pull-up resistor practices across all REC designs.

Finds resistors connected to power nets, infers bus type from net names,
computes distance from pull-up to nearest MCU on same signal net.

Output: analysis/pullup_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "pullup_patterns.json")

POWER_NET_RE = re.compile(
    r"^\+?\d+\.?\d*V|^VCC|^VDD|^VBUS|^V_|^\+\d|^3\.3V|^3V3|^AVCC|^DVCC",
    re.IGNORECASE,
)

# Bus type inference from net names
BUS_PATTERNS = [
    (re.compile(r"SDA|SCL|I2C|TWI", re.I), "i2c"),
    (re.compile(r"MOSI|MISO|SCK|SS|SPI|SCLK", re.I), "spi"),
    (re.compile(r"TX|RX|UART|SERIAL|TXD|RXD", re.I), "uart"),
    (re.compile(r"RST|RESET|MCLR|NRST", re.I), "reset"),
    (re.compile(r"INT|IRQ|INTERRUPT", re.I), "interrupt"),
    (re.compile(r"CS|CE|CHIP.?SELECT|EN|ENABLE", re.I), "chip-select"),
    (re.compile(r"CAN_H|CAN_L|CANH|CANL", re.I), "can"),
    (re.compile(r"RS485|RS232|DE|RE", re.I), "rs485"),
]

MCU_PATTERNS = [
    re.compile(r"PIC1[268]", re.I),
    re.compile(r"ESP32", re.I),
    re.compile(r"STM32", re.I),
    re.compile(r"RP2040", re.I),
    re.compile(r"ATMEGA|ATSAMD", re.I),
    re.compile(r"NRF5", re.I),
]

# Common pull-up values
PULLUP_VALUES_RE = re.compile(r"^(1[0K]?|1\.?\d*K|2\.2K|4\.7K|10K|22K|47K|100K|470|1K|2K2|4K7)$", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def is_mcu(elem):
    search = f"{elem.get('value', '')} {elem.get('package', '')}"
    return any(p.search(search) for p in MCU_PATTERNS)


def infer_bus_type(net_names):
    """Infer bus type from a set of net names."""
    for net in net_names:
        for pattern, bus_type in BUS_PATTERNS:
            if pattern.search(net):
                return bus_type
    return "general"


def distance(a, b):
    return math.sqrt((a["x"] - b["x"]) ** 2 + (a["y"] - b["y"]) ** 2)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing pull-up resistors across {len(boards)} boards...")

    # Accumulate: (bus_type, value) -> stats
    pullup_stats = defaultdict(lambda: {
        "occurrences": 0,
        "distances_to_mcu": [],
        "power_nets": defaultdict(int),
        "signal_nets": [],
        "designs": set(),
    })

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements or not signals:
            continue

        elem_map = {e["name"]: e for e in elements}
        elem_nets = defaultdict(set)
        net_elements = defaultdict(set)

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)
                net_elements[net_name].add(e_name)

        # Find MCUs for distance calculation
        mcu_elems = [e for e in elements if is_mcu(e)]

        # Find resistors connected to power nets (pull-ups)
        for elem in elements:
            if ref_prefix(elem["name"]) != "R":
                continue

            r_value = elem.get("value", "")
            if not r_value:
                continue

            nets = elem_nets.get(elem["name"], set())
            power_nets = {n for n in nets if POWER_NET_RE.match(n)}
            signal_nets = nets - power_nets

            if not power_nets:
                continue  # Not a pull-up (not connected to power)

            if not signal_nets:
                continue  # No signal net — likely just a load

            # Infer bus type from signal net names
            bus_type = infer_bus_type(signal_nets)

            key = (bus_type, r_value)
            pullup_stats[key]["occurrences"] += 1
            pullup_stats[key]["designs"].add(design)
            pullup_stats[key]["signal_nets"].extend(list(signal_nets)[:3])

            for pn in power_nets:
                pullup_stats[key]["power_nets"][pn] += 1

            # Distance to nearest MCU on same signal net
            min_dist = float("inf")
            for snet in signal_nets:
                for mcu in mcu_elems:
                    if mcu["name"] in net_elements.get(snet, set()):
                        d = distance(elem, mcu)
                        if d < min_dist:
                            min_dist = d

            if min_dist < float("inf"):
                pullup_stats[key]["distances_to_mcu"].append(round(min_dist, 2))

    # Build output patterns
    patterns = []
    for (bus_type, r_value), stats in sorted(pullup_stats.items(), key=lambda x: -x[1]["occurrences"]):
        if stats["occurrences"] < 2:
            continue

        dists = sorted(stats["distances_to_mcu"])
        median_dist = dists[len(dists) // 2] if dists else 0

        # Placement note
        if median_dist == 0:
            placement = "no MCU distance data"
        elif median_dist < 10:
            placement = "near MCU"
        elif median_dist < 25:
            placement = "moderate distance from MCU"
        else:
            placement = "near peripheral"

        # Most common power net
        top_power = max(stats["power_nets"].items(), key=lambda x: x[1])[0] if stats["power_nets"] else ""

        patterns.append({
            "id": f"pullup-{bus_type}-{r_value.lower().replace(' ', '')}",
            "busType": bus_type,
            "resistorValue": r_value,
            "occurrences": stats["occurrences"],
            "medianDistanceToMcuMm": round(median_dist, 2),
            "placementNote": placement,
            "powerNet": top_power,
            "sourceDesigns": sorted(stats["designs"])[:15],
        })

    # Summary by bus type
    bus_summary = defaultdict(lambda: {"count": 0, "values": defaultdict(int)})
    for (bus_type, r_value), stats in pullup_stats.items():
        bus_summary[bus_type]["count"] += stats["occurrences"]
        bus_summary[bus_type]["values"][r_value] += stats["occurrences"]

    bus_output = {}
    for bus, data in sorted(bus_summary.items(), key=lambda x: -x[1]["count"]):
        top_values = sorted(data["values"].items(), key=lambda x: -x[1])[:5]
        bus_output[bus] = {
            "totalPullups": data["count"],
            "preferredValues": [{"value": v, "count": c} for v, c in top_values],
        }

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "pullup_combinations": len(pullup_stats),
            "patterns_found": len(patterns),
            "total_pullups": sum(s["occurrences"] for s in pullup_stats.values()),
        },
        "bus_type_summary": bus_output,
        "patterns": patterns,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Pull-up combinations: {len(pullup_stats)}")
    print(f"  Patterns (≥2 occurrences): {len(patterns)}")
    print(f"  Total pull-ups: {sum(s['occurrences'] for s in pullup_stats.values())}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
