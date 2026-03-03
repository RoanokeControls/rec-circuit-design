#!/usr/bin/env python3
"""Analyze LED and indicator circuits across all REC designs.

Finds LEDs, LED arrays, current limiting resistors per LED, LED driver ICs,
indicator placement patterns, colors, MCU pin connections.

Output: analysis/led_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "led_patterns.json")

LED_RE = re.compile(r"LED", re.I)
LED_DRIVER_RE = re.compile(r"WS2812|SK6812|PCA9685|TLC\d+|CAT4\d+|AL\d{4}|LM3914|MAX6954", re.I)
MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)

# LED color inference from part value
COLOR_PATTERNS = [
    (re.compile(r"RED|R$|RA$", re.I), "red"),
    (re.compile(r"GREEN|GRN|GR$|GA$", re.I), "green"),
    (re.compile(r"YELLOW|YEL|YLW|AMBER", re.I), "yellow"),
    (re.compile(r"BLUE|BLU|BL$", re.I), "blue"),
    (re.compile(r"WHITE|WHT|WH$", re.I), "white"),
    (re.compile(r"ORANGE|ORG|OR$", re.I), "orange"),
    (re.compile(r"RGB|WS2812|NEOPIXEL", re.I), "rgb"),
]


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def infer_color(value):
    for pattern, color in COLOR_PATTERNS:
        if pattern.search(value):
            return color
    return "unknown"


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing LED circuits across {len(boards)} boards...")

    led_designs = []
    color_stats = defaultdict(int)
    resistor_value_stats = defaultdict(int)
    led_count_per_board = []
    driver_stats = defaultdict(int)

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

        # Find LEDs
        leds = []
        drivers = []
        mcus = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            val = elem.get("value", "") or ""
            search = f"{val} {elem.get('package', '')} {deviceset}"

            if ref_prefix(elem["name"]) == "LED" or (ref_prefix(elem["name"]) == "D" and LED_RE.search(search)):
                color = infer_color(f"{val} {deviceset}")
                leds.append({
                    "name": elem["name"],
                    "value": deviceset or val,
                    "color": color,
                    "x": elem.get("x", 0),
                    "y": elem.get("y", 0),
                })
                color_stats[color] += 1

            if LED_DRIVER_RE.search(search):
                m = LED_DRIVER_RE.search(search)
                drivers.append({"name": elem["name"], "value": m.group(0)})
                driver_stats[m.group(0)] += 1

            if MCU_RE.search(search):
                mcus.append(elem)

        if not leds:
            continue

        led_count_per_board.append(len(leds))

        # Find current limiting resistors for each LED
        led_details = []
        for led in leds:
            led_nets = elem_nets.get(led["name"], set())

            # Find resistors on LED nets (current limiting)
            limiting_resistors = []
            for net in led_nets:
                for connected in net_elements.get(net, set()):
                    if connected == led["name"]:
                        continue
                    ce = elem_map.get(connected)
                    if ce and ref_prefix(connected) == "R":
                        limiting_resistors.append({
                            "name": connected,
                            "value": ce.get("value", ""),
                        })
                        resistor_value_stats[ce.get("value", "")] += 1

            # Find MCU pin driving this LED
            drive_mcu_pin = None
            if schematic:
                for mcu in mcus:
                    mcu_nets = elem_nets.get(mcu["name"], set())
                    shared_signal = led_nets & mcu_nets
                    # Exclude power/ground
                    shared_signal = {n for n in shared_signal if not re.match(r"GND|VCC|VDD|\+\d", n, re.I)}
                    if shared_signal:
                        mcu_pins = get_part_pins(schematic, mcu["name"])
                        for mp in mcu_pins:
                            if mp["net"] in shared_signal:
                                drive_mcu_pin = {"mcu": mcu.get("value", ""), "pin": mp["pin"]}
                                break

            led_details.append({
                "ref": led["name"],
                "value": led["value"],
                "color": led["color"],
                "limitingResistors": limiting_resistors,
                "mcuDrive": drive_mcu_pin,
            })

        led_designs.append({
            "design": design,
            "ledCount": len(leds),
            "leds": led_details,
            "drivers": drivers,
        })

    # Stats
    avg_leds = round(sum(led_count_per_board) / len(led_count_per_board), 1) if led_count_per_board else 0

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_leds": len(led_designs),
            "total_leds": sum(d["ledCount"] for d in led_designs),
            "avg_leds_per_board": avg_leds,
        },
        "color_distribution": dict(sorted(color_stats.items(), key=lambda x: -x[1])),
        "current_limiting_resistors": dict(sorted(resistor_value_stats.items(), key=lambda x: -x[1])[:15]),
        "led_drivers": dict(sorted(driver_stats.items(), key=lambda x: -x[1])),
        "designs": led_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with LEDs: {len(led_designs)}")
    print(f"  Total LEDs: {sum(d['ledCount'] for d in led_designs)}")
    print(f"  Colors: {dict(color_stats)}")
    print(f"  Avg LEDs/board: {avg_leds}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
