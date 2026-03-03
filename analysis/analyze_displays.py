#!/usr/bin/env python3
"""Analyze display circuits across all REC designs.

Finds boards with LCD, LED display, OLED, 7-segment components.
Studies all associated components: driver ICs, backlight circuits,
contrast pots, connectors, communication bus, MCU connections.

Output: analysis/display_patterns.json
"""

import glob
import json
import math
import os
import re
from collections import defaultdict
from schematic_helpers import load_schematic_for_board, build_part_info_map, get_part_pins

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "display_patterns.json")

# Display component patterns
DISPLAY_PATTERNS = [
    (re.compile(r"LCD|LIQUID.?CRYSTAL|LCM\d|NHD|HITACHI|HD44780", re.I), "lcd_character"),
    (re.compile(r"OLED|SSD1306|SSD1309|SH1106", re.I), "oled"),
    (re.compile(r"7.?SEG|SEVEN.?SEG|DISPLAY.?\d|LTS|SA\d{2}", re.I), "seven_segment"),
    (re.compile(r"TFT|ILI\d+|ST7735|ST7789|SPI.?DISPLAY", re.I), "tft"),
    (re.compile(r"LED.?MATRIX|MAX7219|HT16K33", re.I), "led_matrix"),
    (re.compile(r"NIXIE|VFD|VACUUM", re.I), "vfd_nixie"),
    (re.compile(r"E.?INK|E.?PAPER|EPD", re.I), "e_ink"),
]

# Display driver patterns
DRIVER_PATTERNS = [
    (re.compile(r"HD44780|KS0066|SPLC780", re.I), "hd44780_parallel"),
    (re.compile(r"PCF8574|MCP23008|MCP23017", re.I), "i2c_expander"),
    (re.compile(r"MAX7219|MAX7221", re.I), "max7219_spi"),
    (re.compile(r"SSD1306|SSD1309|SH1106", re.I), "oled_driver"),
    (re.compile(r"HT16K33", re.I), "ht16k33_i2c"),
    (re.compile(r"TM1637|TM1638", re.I), "tm16xx"),
    (re.compile(r"74HC595|74HC164|SN74", re.I), "shift_register"),
    (re.compile(r"CD4511|CD4543|BCD", re.I), "bcd_decoder"),
    (re.compile(r"ULN2003|ULN2803|UDN2981|TD62783", re.I), "darlington_driver"),
]

MCU_RE = re.compile(r"PIC1[268]|ESP32|STM32|RP2040|ATMEGA", re.I)


def ref_prefix(name):
    prefix = ""
    for ch in name:
        if ch.isalpha():
            prefix += ch
        else:
            break
    return prefix.upper()


def distance(a, b):
    return math.sqrt((a.get("x", 0) - b.get("x", 0)) ** 2 + (a.get("y", 0) - b.get("y", 0)) ** 2)


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing display circuits across {len(boards)} boards...")

    display_designs = []
    display_type_stats = defaultdict(int)
    driver_stats = defaultdict(int)
    interface_stats = defaultdict(int)

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

        # Find displays
        displays = []
        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset} {elem['name']}"

            for pattern, display_type in DISPLAY_PATTERNS:
                if pattern.search(search):
                    displays.append({
                        "element": elem,
                        "type": display_type,
                        "value": deviceset or elem.get("value", ""),
                    })
                    display_type_stats[display_type] += 1
                    break

        if not displays:
            continue

        # Find drivers, MCUs, support components
        drivers = []
        mcus = []
        pots = []
        backlight_components = []

        for elem in elements:
            sch_info = part_info.get(elem["name"], {})
            deviceset = sch_info.get("deviceset", "")
            search = f"{elem.get('value', '')} {elem.get('package', '')} {deviceset}"

            for pattern, driver_type in DRIVER_PATTERNS:
                if pattern.search(search):
                    drivers.append({
                        "name": elem["name"],
                        "value": deviceset or elem.get("value", ""),
                        "type": driver_type,
                    })
                    driver_stats[driver_type] += 1
                    break

            if MCU_RE.search(search):
                mcus.append(elem)

            # Potentiometers (contrast adjustment)
            if ref_prefix(elem["name"]) in ("RV", "VR", "POT") or \
               re.search(r"POT|TRIM|ADJUST|10K.*POT", search, re.I):
                pots.append({"name": elem["name"], "value": elem.get("value", "")})

        # Determine interface type for each display
        display_details = []
        for disp in displays:
            d_elem = disp["element"]
            d_nets = elem_nets.get(d_elem["name"], set())

            # Check interface type from net names
            interface = "unknown"
            if any(re.search(r"SDA|SCL|I2C", n, re.I) for n in d_nets):
                interface = "i2c"
            elif any(re.search(r"MOSI|MISO|SCK|SPI", n, re.I) for n in d_nets):
                interface = "spi"
            elif any(re.search(r"DB\d|D\d|E|RS|RW", n, re.I) for n in d_nets):
                interface = "parallel"

            # Check from schematic pins
            if schematic and interface == "unknown":
                pins = get_part_pins(schematic, d_elem["name"])
                for p in pins:
                    pn = p["pin"].upper()
                    if any(k in pn for k in ("SDA", "SCL")):
                        interface = "i2c"
                        break
                    elif any(k in pn for k in ("MOSI", "MISO", "SCK", "SCLK")):
                        interface = "spi"
                        break
                    elif any(k in pn for k in ("DB0", "DB1", "DB4", "DB7", "RS", "RW")):
                        interface = "parallel"
                        break

            interface_stats[interface] += 1

            # Find which MCU drives this display
            drive_mcu = None
            shared_net_count = 0
            for mcu in mcus:
                mcu_nets = elem_nets.get(mcu["name"], set())
                shared = d_nets & mcu_nets
                # Exclude power/ground nets
                signal_shared = {n for n in shared if not re.match(r"GND|VCC|VDD|\+\d", n, re.I)}
                if len(signal_shared) > shared_net_count:
                    shared_net_count = len(signal_shared)
                    drive_mcu = mcu

            # Find backlight components (LEDs on display nets, R for current limiting)
            for net in d_nets:
                if re.search(r"BL|BACKLIGHT|LED|ANODE|CATHODE", net, re.I):
                    for connected in net_elements.get(net, set()):
                        ce = elem_map.get(connected)
                        if ce and connected != d_elem["name"]:
                            backlight_components.append({
                                "name": connected,
                                "value": ce.get("value", ""),
                                "net": net,
                            })

            display_details.append({
                "type": disp["type"],
                "value": disp["value"],
                "ref": d_elem["name"],
                "interface": interface,
                "driveMcu": drive_mcu.get("value", "") if drive_mcu else None,
                "connectedNets": len(d_nets),
            })

        display_designs.append({
            "design": design,
            "displays": display_details,
            "drivers": drivers,
            "contrastPots": pots,
            "backlightComponents": backlight_components[:5],
            "mcuCount": len(mcus),
        })

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "designs_with_displays": len(display_designs),
            "total_displays": sum(len(d["displays"]) for d in display_designs),
        },
        "display_types": dict(sorted(display_type_stats.items(), key=lambda x: -x[1])),
        "driver_types": dict(sorted(driver_stats.items(), key=lambda x: -x[1])),
        "interface_types": dict(sorted(interface_stats.items(), key=lambda x: -x[1])),
        "designs": display_designs,
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Designs with displays: {len(display_designs)}")
    print(f"  Display types: {dict(display_type_stats)}")
    print(f"  Driver types: {dict(driver_stats)}")
    print(f"  Interface types: {dict(interface_stats)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
