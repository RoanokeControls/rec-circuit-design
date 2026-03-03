#!/usr/bin/env python3
"""Analyze test points and debug interfaces across all REC designs.

Finds test points, debug headers, ICSP connectors, UART debug ports.
Maps DFT (design for test) practices.

Output: analysis/testpoint_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "testpoint_patterns.json")

TP_RE = re.compile(r"^TP\d|TEST.?POINT|TESTPAD|T_P", re.I)
ICSP_RE = re.compile(r"ICSP|ISP|PROG|PGM|JTAG|SWD|DEBUG", re.I)
HEADER_RE = re.compile(r"HEADER|HDR|PIN.?HEADER|JP\d", re.I)
UART_DEBUG_RE = re.compile(r"UART|SERIAL|DEBUG|CONSOLE|TTL", re.I)

POWER_NET_RE = re.compile(r"^\+?\d+\.?\d*V|^VCC|^VDD|^VBUS|^V_|^\+\d|^GND|^VSS", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def classify_testpoint_net(net_name):
    """Classify what a test point is monitoring."""
    if not net_name or net_name.startswith("N$"):
        return "unlabeled"
    n = net_name.upper()

    if re.match(r"^\+?\d+\.?\d*V|^VCC|^VDD|^AVCC|^DVCC", n):
        return "power"
    if re.match(r"^GND|^VSS|^AGND|^DGND", n):
        return "ground"
    if re.search(r"SDA|SCL|I2C", n):
        return "i2c"
    if re.search(r"MOSI|MISO|SCK|SPI", n):
        return "spi"
    if re.search(r"TX|RX|UART", n):
        return "uart"
    if re.search(r"RS485|RS232", n):
        return "serial_bus"
    if re.search(r"CAN", n):
        return "can"
    if re.search(r"USB", n):
        return "usb"
    if re.search(r"PGC|PGD|MCLR|SWDIO|SWCLK|TCK|TMS", n):
        return "programming"
    if re.search(r"AN\d|ADC|ANALOG|SENSE|THERM", n):
        return "analog"
    if re.search(r"CLK|CLOCK|OSC", n):
        return "clock"
    if re.search(r"RST|RESET|NRST", n):
        return "reset"
    if re.search(r"INT|IRQ", n):
        return "interrupt"
    if re.search(r"LED|STATUS", n):
        return "status"
    return "signal"


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing test points across {len(boards)} boards...")

    tp_designs = []
    tp_category_stats = defaultdict(int)
    debug_header_stats = defaultdict(int)
    tp_count_per_board = []

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

        for sig in signals:
            net_name = sig.get("name", "")
            for cr in sig.get("contactrefs", []):
                e_name = cr.get("element", "")
                elem_nets[e_name].add(net_name)

        schematic = load_schematic_for_board(bpath)
        part_info = build_part_info_map(schematic) if schematic else {}

        test_points = []
        debug_headers = []
        icsp_connectors = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            val = elem.get("value", "") or ""
            search = f"{val} {elem.get('package', '')} {deviceset} {elem['name']}"

            if ref_prefix(elem["name"]) == "TP" or TP_RE.search(search):
                nets = elem_nets.get(elem["name"], set())
                for net in nets:
                    if net:
                        category = classify_testpoint_net(net)
                        test_points.append({
                            "name": elem["name"],
                            "net": net,
                            "category": category,
                        })
                        tp_category_stats[category] += 1

            elif ICSP_RE.search(search):
                nets = list(elem_nets.get(elem["name"], set()))
                icsp_connectors.append({
                    "name": elem["name"],
                    "value": deviceset or val,
                    "nets": nets[:10],
                    "pinCount": len(nets),
                })
                debug_header_stats["ICSP/programming"] += 1

            elif HEADER_RE.search(search) and ref_prefix(elem["name"]) in ("JP", "J"):
                nets = list(elem_nets.get(elem["name"], set()))
                # Check if it's a debug/UART header
                has_uart = any(re.search(r"TX|RX", n, re.I) for n in nets)
                has_debug = any(re.search(r"DEBUG|SWD|JTAG", n, re.I) for n in nets)
                if has_uart or has_debug:
                    header_type = "uart_debug" if has_uart else "debug"
                    debug_headers.append({
                        "name": elem["name"],
                        "value": deviceset or val,
                        "type": header_type,
                        "nets": nets[:10],
                    })
                    debug_header_stats[header_type] += 1

        if not test_points and not debug_headers and not icsp_connectors:
            continue

        tp_count_per_board.append(len(test_points))

        tp_designs.append({
            "design": design,
            "testPoints": test_points,
            "debugHeaders": debug_headers,
            "icspConnectors": icsp_connectors,
            "testPointCount": len(test_points),
        })

    avg_tp = round(sum(tp_count_per_board) / len(tp_count_per_board), 1) if tp_count_per_board else 0

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_testpoints": len(tp_designs),
            "total_test_points": sum(d["testPointCount"] for d in tp_designs),
            "avg_testpoints_per_board": avg_tp,
        },
        "testpoint_categories": dict(sorted(tp_category_stats.items(), key=lambda x: -x[1])),
        "debug_headers": dict(sorted(debug_header_stats.items(), key=lambda x: -x[1])),
        "designs": tp_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with test points: {len(tp_designs)}")
    print(f"  Total test points: {sum(d['testPointCount'] for d in tp_designs)}")
    print(f"  Categories: {dict(tp_category_stats)}")
    print(f"  Debug headers: {dict(debug_header_stats)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
