#!/usr/bin/env python3
"""Analyze MCU usage patterns across all REC designs.

Catalogs MCU families, crystals, decoupling, reset circuits,
USB bridges, programming interfaces, voltage domains.

Output: analysis/mcu_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
SCHEM_DIR = BOARD_DIR
OUTPUT = os.path.join(os.path.dirname(__file__), "mcu_patterns.json")

# MCU family patterns: (regex, family_name)
MCU_PATTERNS = [
    (re.compile(r"PIC18F?\d+", re.I), "PIC18"),
    (re.compile(r"PIC16F?\d+", re.I), "PIC16"),
    (re.compile(r"PIC12F?\d+", re.I), "PIC12"),
    (re.compile(r"ESP32.?WROVER|ESP32.?WROOM|ESP32.?S\d|ESP32.?C\d|ESP32", re.I), "ESP32"),
    (re.compile(r"STM32[FGHL]\d+", re.I), "STM32"),
    (re.compile(r"RP2040", re.I), "RP2040"),
    (re.compile(r"ATMEGA\d+|ATSAMD\d+|ATMEL", re.I), "AVR/SAM"),
    (re.compile(r"NRF5\d+", re.I), "nRF5x"),
    (re.compile(r"CY8C\d+|CYPRESS", re.I), "Cypress"),
    (re.compile(r"CC\d{4}|CC26\d{2}|CC32\d{2}", re.I), "TI-CC"),
]

# Crystal patterns
CRYSTAL_RE = re.compile(r"Y\d|XTAL|CRYSTAL", re.I)
CRYSTAL_VALUE_RE = re.compile(r"(\d+\.?\d*)\s*(MHZ|KHZ|M|K)", re.I)

# USB bridge patterns
USB_BRIDGE_RE = re.compile(r"FT232|FT2232|CH340|CP210[24]|MCP2221|FTDI", re.I)

# Level shifter patterns
LEVEL_SHIFT_RE = re.compile(r"SN74HC\d+|MM74HC\d+|TXB0\d+|TXS0\d+|BSS138", re.I)

# Programming interface net patterns
PROG_NETS = {
    "ICSP": re.compile(r"PGC|PGD|MCLR|VPP", re.I),
    "SWD": re.compile(r"SWDIO|SWCLK|SWO", re.I),
    "JTAG": re.compile(r"TCK|TMS|TDI|TDO|TRST", re.I),
    "USB": re.compile(r"USB_D[PM]|D\+|D-|USBDP|USBDM", re.I),
    "SPI-PROG": re.compile(r"MOSI|MISO|SCK.*PROG|PROG.*SCK", re.I),
}

POWER_NET_RE = re.compile(r"^\+?\d+\.?\d*V|^VCC|^VDD|^VBUS|^V_|^\+\d|^3\.3V|^3V3", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def detect_voltage(nets):
    """Infer voltage domain from net names."""
    has_3v3 = any(re.search(r"3\.3|3V3|VDD", n, re.I) for n in nets)
    has_5v = any(re.search(r"\+?5V|VCC.*5|USB", n, re.I) for n in nets)
    if has_3v3 and has_5v:
        return "mixed"
    elif has_3v3:
        return "3.3V"
    elif has_5v:
        return "5V"
    return "unknown"


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    schematics = sorted(glob.glob(os.path.join(SCHEM_DIR, "*_schematic.json")))
    print(f"Analyzing MCUs across {len(boards)} boards, {len(schematics)} schematics...")

    # Per MCU part number stats
    mcu_profiles = defaultdict(lambda: {
        "family": "",
        "occurrences": 0,
        "crystals": defaultdict(int),
        "decoupling_caps": defaultdict(int),
        "reset_pullups": [],
        "reset_caps": [],
        "usb_bridges": defaultdict(int),
        "prog_interfaces": defaultdict(int),
        "level_shifters": defaultdict(int),
        "voltage": [],
        "paired_mcus": defaultdict(int),
        "designs": set(),
    })

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        elements = board.get("elements", [])
        signals = board.get("signals", [])

        if not elements:
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

        # Find MCUs
        mcus_in_design = []
        for elem in elements:
            search = f"{elem.get('value', '')} {elem.get('package', '')}"
            for pattern, family in MCU_PATTERNS:
                if pattern.search(search):
                    m = pattern.search(search)
                    part_number = m.group(0)
                    mcus_in_design.append((elem, part_number, family))
                    break

        # Find support components in this design
        crystals = []
        usb_bridges = []
        level_shifters = []

        for elem in elements:
            search = f"{elem.get('value', '')} {elem.get('package', '')} {elem['name']}"
            if CRYSTAL_RE.search(search) or ref_prefix(elem["name"]) == "Y":
                val = elem.get("value", "")
                crystals.append({"name": elem["name"], "value": val})
            if USB_BRIDGE_RE.search(search):
                usb_bridges.append({"name": elem["name"], "value": elem.get("value", "")})
            if LEVEL_SHIFT_RE.search(search):
                level_shifters.append({"name": elem["name"], "value": elem.get("value", "")})

        for mcu_elem, part_number, family in mcus_in_design:
            profile = mcu_profiles[part_number]
            profile["family"] = family
            profile["occurrences"] += 1
            profile["designs"].add(design)

            # Voltage domain
            mcu_nets = elem_nets.get(mcu_elem["name"], set())
            profile["voltage"].append(detect_voltage(mcu_nets))

            # Programming interface
            all_nets = set()
            for n in mcu_nets:
                all_nets.add(n)
            for prog_type, pattern in PROG_NETS.items():
                if any(pattern.search(n) for n in all_nets):
                    profile["prog_interfaces"][prog_type] += 1

            # Find caps on same power nets (decoupling)
            power_nets = {n for n in mcu_nets if POWER_NET_RE.match(n)}
            for pnet in power_nets:
                for connected in net_elements.get(pnet, set()):
                    if connected == mcu_elem["name"]:
                        continue
                    ce = elem_map.get(connected)
                    if ce and ref_prefix(connected) == "C":
                        profile["decoupling_caps"][ce.get("value", "")] += 1

            # Find reset circuit components
            reset_nets = {n for n in mcu_nets if re.search(r"MCLR|RST|RESET|NRST", n, re.I)}
            for rnet in reset_nets:
                for connected in net_elements.get(rnet, set()):
                    if connected == mcu_elem["name"]:
                        continue
                    ce = elem_map.get(connected)
                    if not ce:
                        continue
                    if ref_prefix(connected) == "R":
                        profile["reset_pullups"].append(ce.get("value", ""))
                    elif ref_prefix(connected) == "C":
                        profile["reset_caps"].append(ce.get("value", ""))

            # Crystals connected to this MCU
            for crystal in crystals:
                shared_nets = elem_nets.get(crystal["name"], set()) & mcu_nets
                if shared_nets:
                    profile["crystals"][crystal["value"]] += 1

            # USB bridges
            for bridge in usb_bridges:
                profile["usb_bridges"][bridge["value"]] += 1

            # Level shifters
            for ls in level_shifters:
                profile["level_shifters"][ls["value"]] += 1

            # Multi-MCU pairings
            for other_elem, other_part, other_family in mcus_in_design:
                if other_elem["name"] != mcu_elem["name"]:
                    profile["paired_mcus"][other_part] += 1

    # Build output
    profiles = []
    for part_number, data in sorted(mcu_profiles.items(), key=lambda x: -x[1]["occurrences"]):
        # Determine most common voltage
        voltage_counts = defaultdict(int)
        for v in data["voltage"]:
            voltage_counts[v] += 1
        voltage = max(voltage_counts.items(), key=lambda x: x[1])[0] if voltage_counts else "unknown"

        # Most common crystal
        crystal_list = []
        for val, count in sorted(data["crystals"].items(), key=lambda x: -x[1]):
            crystal_list.append({"value": val, "count": count})

        # Decoupling caps
        decoupling_list = []
        for val, count in sorted(data["decoupling_caps"].items(), key=lambda x: -x[1]):
            decoupling_list.append({"value": val, "count": count})

        # Reset circuit
        pullup_counts = defaultdict(int)
        for v in data["reset_pullups"]:
            pullup_counts[v] += 1
        cap_counts = defaultdict(int)
        for v in data["reset_caps"]:
            cap_counts[v] += 1

        reset_circuit = {}
        if pullup_counts:
            reset_circuit["pullupValue"] = max(pullup_counts.items(), key=lambda x: x[1])[0]
        if cap_counts:
            reset_circuit["capValue"] = max(cap_counts.items(), key=lambda x: x[1])[0]

        # Programming interface
        prog = max(data["prog_interfaces"].items(), key=lambda x: x[1])[0] if data["prog_interfaces"] else "unknown"

        # USB bridge
        usb_bridge = max(data["usb_bridges"].items(), key=lambda x: x[1])[0] if data["usb_bridges"] else None

        # Pairings
        pairings = [k for k, v in sorted(data["paired_mcus"].items(), key=lambda x: -x[1])[:5]]

        profiles.append({
            "id": f"mcu-{part_number.lower().replace(' ', '-').replace('/', '-')[:40]}",
            "family": data["family"],
            "partNumber": part_number,
            "occurrences": data["occurrences"],
            "voltage": voltage,
            "crystals": crystal_list[:5],
            "decouplingCaps": decoupling_list[:10],
            "resetCircuit": reset_circuit if reset_circuit else {"pullupValue": "", "capValue": ""},
            "programmingInterface": prog,
            "usbBridge": usb_bridge,
            "commonPairings": pairings,
            "sourceDesigns": sorted(data["designs"])[:20],
        })

    # Family summary
    family_summary = defaultdict(lambda: {"count": 0, "parts": set()})
    for part, data in mcu_profiles.items():
        family_summary[data["family"]]["count"] += data["occurrences"]
        family_summary[data["family"]]["parts"].add(part)

    family_output = {}
    for fam, data in sorted(family_summary.items(), key=lambda x: -x[1]["count"]):
        family_output[fam] = {"instances": data["count"], "uniqueParts": sorted(data["parts"])}

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "mcu_types": len(mcu_profiles),
            "total_mcu_instances": sum(d["occurrences"] for d in mcu_profiles.values()),
            "families": len(family_summary),
        },
        "family_summary": family_output,
        "profiles": profiles,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  MCU types: {len(mcu_profiles)}")
    print(f"  Total instances: {sum(d['occurrences'] for d in mcu_profiles.values())}")
    print(f"  Families: {dict((k, v['count']) for k, v in family_summary.items())}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
