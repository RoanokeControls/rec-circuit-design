#!/usr/bin/env python3
"""Analyze communication interface circuits across all REC designs.

Finds RS-485/RS-232 transceivers, CAN transceivers, Ethernet, WiFi/BLE modules.
Maps complete interface circuits including termination, bias, ESD protection.

Output: analysis/comm_interface_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "comm_interface_patterns.json")

# Communication transceiver patterns
COMM_PATTERNS = [
    (re.compile(r"MAX485|SP3485|ADM485|SN75176|SN65\d+|LTC485|ISL3\d+", re.I), "rs485"),
    (re.compile(r"MAX232|MAX3232|SP3232|ICL3232|ADM3202", re.I), "rs232"),
    (re.compile(r"MCP2551|MCP2515|SN65HVD\d+|TJA\d+|ISO1050", re.I), "can"),
    (re.compile(r"ENC28J60|W5500|W5100|KSZ\d+|LAN\d+|DP83\d+", re.I), "ethernet"),
    (re.compile(r"RJ45|MAGJACK|HY9\d+|HR9\d+|J00-0\d+", re.I), "ethernet_connector"),
    (re.compile(r"RJ11|RJ12|RJ14|6P\d+C", re.I), "rj11_connector"),
    (re.compile(r"ESP32|ESP8266|ESP-WROOM|ESP-WROVER", re.I), "wifi_ble"),
    (re.compile(r"NRF\d+|NRF24|NRF52|BLE", re.I), "ble"),
    (re.compile(r"ZIGBEE|CC2530|CC2540|XBee|XBEE", re.I), "zigbee"),
    (re.compile(r"LORA|SX127\d|RFM9\d", re.I), "lora"),
    (re.compile(r"USB|FT232|CH340|CP210|MCP2221", re.I), "usb"),
    (re.compile(r"1WIRE|DS18|DS24|MAXIM", re.I), "onewire"),
]

# ESD/protection on communication lines
ESD_RE = re.compile(r"TVS|PESD|PRTR|CDSOT|USBLC|ESD\d|TPD\d", re.I)
TERMINATION_RE = re.compile(r"120|TERM", re.I)

MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing communication interfaces across {len(boards)} boards...")

    comm_designs = []
    interface_counts = defaultdict(int)
    transceiver_stats = defaultdict(lambda: {"count": 0, "designs": set()})
    esd_stats = defaultdict(int)

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

        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        # Find communication components
        interfaces = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            for pattern, iface_type in COMM_PATTERNS:
                if pattern.search(search):
                    m = pattern.search(search)
                    part = m.group(0)

                    # Get pin details from schematic
                    pin_details = []
                    if schematic:
                        pins = get_part_pins(schematic, elem["name"])
                        for p in pins:
                            pin_details.append({"pin": p["pin"], "net": p["net"]})

                    # Find associated components on same nets
                    e_nets = elem_nets.get(elem["name"], set())
                    associated = []
                    esd_protection = []
                    termination = []
                    bias_resistors = []

                    for net in e_nets:
                        for connected in net_elements.get(net, set()):
                            if connected == elem["name"]:
                                continue
                            ce = elem_map.get(connected)
                            if not ce:
                                continue

                            ce_val = ce.get("value", "") or ""
                            ce_search = f"{ce_val} {ce.get('package', '')}"

                            if ESD_RE.search(ce_search):
                                esd_protection.append({"name": connected, "value": ce_val, "net": net})
                                esd_stats[ce_val] += 1
                            elif ref_prefix(connected) == "R":
                                if TERMINATION_RE.search(ce_val):
                                    termination.append({"name": connected, "value": ce_val, "net": net})
                                else:
                                    bias_resistors.append({"name": connected, "value": ce_val, "net": net})

                    interfaces.append({
                        "type": iface_type,
                        "part": part,
                        "ref": elem["name"],
                        "pins": pin_details[:20],
                        "esdProtection": esd_protection,
                        "termination": termination,
                        "biasResistors": bias_resistors[:5],
                    })

                    interface_counts[iface_type] += 1
                    transceiver_stats[part]["count"] += 1
                    transceiver_stats[part]["designs"].add(design)
                    break

        if not interfaces:
            continue

        # Find MCUs in this design
        mcus = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"
            if MCU_RE.search(search):
                mcus.append({"name": elem["name"], "value": elem.get("value", "")})

        comm_designs.append({
            "design": design,
            "interfaces": interfaces,
            "mcus": mcus,
            "interfaceCount": len(interfaces),
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_comm": len(comm_designs),
            "total_interfaces": sum(d["interfaceCount"] for d in comm_designs),
        },
        "interface_types": dict(sorted(interface_counts.items(), key=lambda x: -x[1])),
        "transceiver_parts": {
            k: {"count": v["count"], "designs": len(v["designs"])}
            for k, v in sorted(transceiver_stats.items(), key=lambda x: -x[1]["count"])
        },
        "esd_protection": dict(sorted(esd_stats.items(), key=lambda x: -x[1])[:10]),
        "designs": comm_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with comm interfaces: {len(comm_designs)}")
    print(f"  Interface types: {dict(interface_counts)}")
    print(f"  Transceiver parts: {len(transceiver_stats)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
