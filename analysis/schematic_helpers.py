"""Shared helpers for cross-referencing schematic data with board data.

Provides pin-level net connectivity from schematics to enrich board analysis.
"""

import glob
import json
import os
import re

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")


def load_schematic_for_board(board_path):
    """Load the matching schematic JSON for a board JSON file.

    Returns schematic dict or None if no matching schematic exists.
    """
    base = os.path.basename(board_path)
    design_name = base.replace("_board.json", "")
    sch_path = os.path.join(os.path.dirname(board_path), f"{design_name}_schematic.json")
    if os.path.exists(sch_path):
        with open(sch_path) as f:
            return json.load(f)
    return None


def build_pin_net_map(schematic):
    """Build a mapping from (part_name, pin_name) -> net_name from schematic.

    Returns dict: {("U1", "VIN"): "+5V", ("U1", "GND"): "GND", ...}
    """
    pin_map = {}
    if not schematic:
        return pin_map

    for sheet in schematic.get("sheets", []):
        for net in sheet.get("nets", []):
            net_name = net.get("name", "")
            for pr in net.get("pinrefs", []):
                part = pr.get("part", "")
                pin = pr.get("pin", "")
                if part and pin:
                    pin_map[(part, pin)] = net_name
    return pin_map


def build_part_info_map(schematic):
    """Build a mapping from part name -> rich part info from schematic.

    Returns dict: {"U1": {"deviceset": "PIC18F26K22-I/SS", "package": "...", ...}, ...}
    """
    part_map = {}
    if not schematic:
        return part_map

    for part in schematic.get("parts", []):
        name = part.get("name", "")
        if name:
            part_map[name] = {
                "deviceset": part.get("deviceset", ""),
                "device": part.get("device", ""),
                "package": part.get("package", ""),
                "library": part.get("library", ""),
                "value": part.get("value", ""),
                "technology": part.get("technology", ""),
                "attributes": part.get("attributes", {}),
            }
    return part_map


def get_part_pins(schematic, part_name):
    """Get all pin connections for a specific part from schematic.

    Returns list of {"pin": "VIN", "net": "+5V", "gate": "G$1"}.
    """
    pins = []
    if not schematic:
        return pins

    for sheet in schematic.get("sheets", []):
        for net in sheet.get("nets", []):
            net_name = net.get("name", "")
            for pr in net.get("pinrefs", []):
                if pr.get("part") == part_name:
                    pins.append({
                        "pin": pr.get("pin", ""),
                        "net": net_name,
                        "gate": pr.get("gate", ""),
                    })
    return pins


def classify_regulator_pins(part_name, schematic):
    """Classify regulator pins as input/output/ground using pin names.

    Returns {"input_nets": [...], "output_nets": [...], "gnd_nets": [...]}.
    """
    pins = get_part_pins(schematic, part_name)
    result = {"input_nets": [], "output_nets": [], "gnd_nets": []}

    for p in pins:
        pin_upper = p["pin"].upper()
        net = p["net"]

        if any(k in pin_upper for k in ("VIN", "IN", "INPUT", "ANODE", "A")):
            if pin_upper not in ("GND", "INHIBIT") and net:
                result["input_nets"].append(net)
        elif any(k in pin_upper for k in ("VOUT", "OUT", "OUTPUT", "CATHODE", "K")):
            if net:
                result["output_nets"].append(net)
        elif any(k in pin_upper for k in ("GND", "VSS", "PAD", "TAB", "EP")):
            if net:
                result["gnd_nets"].append(net)

    return result


def classify_mcu_pins(part_name, schematic):
    """Classify MCU pins by function using pin names.

    Returns dict with programming, bus, power, reset pin groups.
    """
    pins = get_part_pins(schematic, part_name)
    result = {
        "programming": [],   # ICSP, SWD, JTAG pins
        "i2c": [],
        "spi": [],
        "uart": [],
        "reset": [],
        "power": [],
        "crystal": [],
        "usb": [],
    }

    for p in pins:
        pin = p["pin"].upper()
        net = p["net"]

        # Programming
        if any(k in pin for k in ("PGC", "PGD", "MCLR", "VPP")):
            result["programming"].append({"pin": p["pin"], "net": net, "type": "ICSP"})
        elif any(k in pin for k in ("SWDIO", "SWCLK", "SWO")):
            result["programming"].append({"pin": p["pin"], "net": net, "type": "SWD"})
        elif any(k in pin for k in ("TCK", "TMS", "TDI", "TDO")):
            result["programming"].append({"pin": p["pin"], "net": net, "type": "JTAG"})

        # I2C
        if any(k in pin for k in ("SDA", "SCL")):
            result["i2c"].append({"pin": p["pin"], "net": net})
        # SPI
        if any(k in pin for k in ("MOSI", "MISO", "SCK", "SCLK")) and "USB" not in pin:
            result["spi"].append({"pin": p["pin"], "net": net})
        # UART
        if pin in ("TX", "RX", "TXD", "RXD") or any(k in pin for k in ("TX/", "RX/")):
            result["uart"].append({"pin": p["pin"], "net": net})
        # Reset
        if any(k in pin for k in ("RST", "RESET", "MCLR", "NRST")):
            result["reset"].append({"pin": p["pin"], "net": net})
        # Crystal
        if any(k in pin for k in ("OSC", "XTAL", "XI", "XO", "CLKIN", "CLKOUT")):
            result["crystal"].append({"pin": p["pin"], "net": net})
        # USB
        if any(k in pin for k in ("USB", "D+", "D-", "USBDP", "USBDM", "DP", "DM")):
            result["usb"].append({"pin": p["pin"], "net": net})
        # Power
        if any(k in pin for k in ("VDD", "VCC", "AVDD", "DVDD", "VBUS")):
            result["power"].append({"pin": p["pin"], "net": net})

    return result


def infer_bus_type_from_pins(part_name, pin_name, schematic):
    """Infer bus type from the pin name of a pull-up's signal connection.

    More accurate than net name regex since it uses the actual pin name
    from the schematic symbol.
    """
    pin_upper = pin_name.upper()

    if any(k in pin_upper for k in ("SDA", "SCL")):
        return "i2c"
    if any(k in pin_upper for k in ("MOSI", "MISO", "SCK", "SCLK", "SS", "CS")):
        return "spi"
    if pin_upper in ("TX", "RX", "TXD", "RXD"):
        return "uart"
    if any(k in pin_upper for k in ("RST", "RESET", "MCLR", "NRST")):
        return "reset"
    if any(k in pin_upper for k in ("INT", "IRQ")):
        return "interrupt"
    if any(k in pin_upper for k in ("CAN_H", "CAN_L", "CANH", "CANL")):
        return "can"
    if any(k in pin_upper for k in ("DE", "RE", "A", "B")) and "RS485" in pin_upper:
        return "rs485"

    return None
