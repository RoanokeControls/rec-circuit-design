"""Shared EAGLE XML parsing functions for Fusion 360 Electronics export.

Used by both batch-export.py (local cache) and aps-export.py (APS API).
"""

import io
import json
import os
import re
import time
import xml.etree.ElementTree as ET
import zipfile


# ── Constants ──────────────────────────────────────────────────────

# EAGLE internal unit: 1 unit = 1/320000 inch
EAGLE_UNIT_TO_MM = 25.4 / 320000.0


def u2mm(val):
    """Convert EAGLE internal units to mm."""
    return round(float(val) * EAGLE_UNIT_TO_MM, 4)


# ── EAGLE XML Extraction ──────────────────────────────────────────

def extract_eagle_xml(zip_source, target_ext):
    """Extract .sch or .brd EAGLE XML from a Fusion .fsch/.fbrd ZIP.

    Args:
        zip_source: Path string to the .fsch/.fbrd file, OR a bytes/BytesIO
                    object containing the ZIP data (for in-memory use).
        target_ext: '.sch' or '.brd'

    Returns:
        XML string, or None if not found
    """
    try:
        if isinstance(zip_source, (bytes, bytearray)):
            zip_source = io.BytesIO(zip_source)

        with zipfile.ZipFile(zip_source, 'r') as zf:
            for name in zf.namelist():
                if name.endswith(target_ext):
                    return zf.read(name).decode('utf-8')
    except (zipfile.BadZipFile, KeyError, IOError) as e:
        label = "<in-memory>" if isinstance(zip_source, io.BytesIO) else str(zip_source)
        print("  Warning: Could not extract from {}: {}".format(
            os.path.basename(label) if os.sep in str(label) else label, e))
    return None


# ── Schematic Parser ──────────────────────────────────────────────

def parse_schematic(xml_str, design_name):
    """Parse EAGLE schematic XML and return JSON-compatible dict.

    Output format matches export-schematic.ulp output.
    """
    root = ET.fromstring(xml_str)
    drawing = root.find("drawing")
    schematic = drawing.find("schematic") if drawing is not None else None

    if schematic is None:
        return None

    # Grid
    grid_elem = drawing.find("grid")
    grid = {}
    if grid_elem is not None:
        grid["distance"] = float(grid_elem.get("distance", "0"))
        unit_map = {"mic": 0, "mm": 1, "mil": 2, "inch": 3}
        grid["unit"] = unit_map.get(grid_elem.get("unit", ""), 0)

    # Global attributes
    global_attrs = {}
    attrs_elem = schematic.find("attributes")
    if attrs_elem is not None:
        for attr in attrs_elem.findall("attribute"):
            name = attr.get("name", "")
            value = attr.get("value", "")
            if name:
                global_attrs[name] = value

    # Libraries
    libraries = []
    libs_elem = schematic.find("libraries")
    if libs_elem is not None:
        for lib in libs_elem.findall("library"):
            libraries.append(lib.get("name", ""))

    # Build deviceset/device lookup from libraries for package resolution
    lib_lookup = {}  # (library, deviceset, device) -> package_name
    if libs_elem is not None:
        for lib in libs_elem.findall("library"):
            lib_name = lib.get("name", "")
            dsets = lib.find("devicesets")
            if dsets is None:
                continue
            for ds in dsets.findall("deviceset"):
                ds_name = ds.get("name", "")
                devices = ds.find("devices")
                if devices is None:
                    continue
                for dev in devices.findall("device"):
                    dev_name = dev.get("name", "")
                    pkg_name = dev.get("package", "")
                    lib_lookup[(lib_name, ds_name, dev_name)] = pkg_name

    # Parts
    parts = []
    parts_elem = schematic.find("parts")
    if parts_elem is not None:
        for part in parts_elem.findall("part"):
            p_name = part.get("name", "")
            p_library = part.get("library", "")
            p_deviceset = part.get("deviceset", "")
            p_device = part.get("device", "")
            p_value = part.get("value", "")
            p_technology = part.get("technology", "")

            # Resolve package from library lookup
            package = lib_lookup.get(
                (p_library, p_deviceset, p_device), "")

            # Part attributes
            part_attrs = {}
            for attr in part.findall("attribute"):
                aname = attr.get("name", "")
                aval = attr.get("value", "")
                if aname:
                    part_attrs[aname] = aval

            # Headline from deviceset (we don't have it directly,
            # but the ULP uses P.deviceset.headline)
            headline = ""

            parts.append({
                "name": p_name,
                "value": p_value,
                "deviceset": p_deviceset,
                "device": p_device,
                "package": package,
                "library": p_library,
                "technology": p_technology,
                "headline": headline,
                "attributes": part_attrs,
            })

    # Sheets
    sheets_data = []
    sheets_elem = schematic.find("sheets")
    sheet_count = 0
    if sheets_elem is not None:
        for sheet in sheets_elem.findall("sheet"):
            sheet_count += 1
            sheet_num = sheet_count

            description = sheet.get("description", "")

            # Instances (parts on this sheet)
            sheet_parts = []
            instances = sheet.find("instances")
            if instances is not None:
                for inst in instances.findall("instance"):
                    sheet_parts.append(inst.get("part", ""))

            # Nets
            sheet_nets = []
            nets_elem = sheet.find("nets")
            if nets_elem is not None:
                for net in nets_elem.findall("net"):
                    net_name = net.get("name", "")
                    net_class = int(net.get("class", "0"))

                    pinrefs = []
                    for seg in net.findall("segment"):
                        for pref in seg.findall("pinref"):
                            pinrefs.append({
                                "part": pref.get("part", ""),
                                "pin": pref.get("pin", ""),
                                "gate": pref.get("gate", ""),
                                "pad": "",
                                "x": 0,
                                "y": 0,
                            })

                    sheet_nets.append({
                        "name": net_name,
                        "class_index": net_class,
                        "class_name": "",
                        "pinrefs": pinrefs,
                    })

            # Buses
            buses = []
            busses_elem = sheet.find("busses")
            if busses_elem is not None:
                for bus in busses_elem.findall("bus"):
                    buses.append(bus.get("name", ""))

            sheets_data.append({
                "number": sheet_num,
                "description": description,
                "headline": "",
                "parts": sheet_parts,
                "nets": sheet_nets,
                "buses": buses,
            })

    # Net class names from schematic classes
    classes_elem = schematic.find("classes")
    class_map = {}
    if classes_elem is not None:
        for cl in classes_elem.findall("class"):
            class_map[int(cl.get("number", "0"))] = cl.get("name", "")

    # Backfill class names into nets
    for sheet in sheets_data:
        for net in sheet["nets"]:
            net["class_name"] = class_map.get(net["class_index"], "")

    return {
        "export_type": "schematic",
        "design_name": design_name,
        "filename": design_name + ".sch",
        "grid": grid,
        "sheet_count": sheet_count,
        "global_attributes": global_attrs,
        "libraries": libraries,
        "parts": parts,
        "sheets": sheets_data,
    }


# ── Board Parser ──────────────────────────────────────────────────

def parse_board(xml_str, design_name):
    """Parse EAGLE board XML and return JSON-compatible dict.

    Output format matches export-board.ulp output.
    """
    root = ET.fromstring(xml_str)
    drawing = root.find("drawing")
    board = drawing.find("board") if drawing is not None else None

    if board is None:
        return None

    # Grid
    grid_elem = drawing.find("grid")
    grid = {}
    if grid_elem is not None:
        grid["distance"] = float(grid_elem.get("distance", "0"))
        unit_map = {"mic": 0, "mm": 1, "mil": 2, "inch": 3}
        grid["unit"] = unit_map.get(grid_elem.get("unit", ""), 0)

    # Board outline (wires on layer 20 = Dimension)
    board_outline = []
    plain = board.find("plain")
    if plain is not None:
        for wire in plain.findall("wire"):
            if wire.get("layer") == "20":
                board_outline.append({
                    "x1": float(wire.get("x1", "0")),
                    "y1": float(wire.get("y1", "0")),
                    "x2": float(wire.get("x2", "0")),
                    "y2": float(wire.get("y2", "0")),
                    "width": float(wire.get("width", "0")),
                })

    # Layers
    layers = []
    layers_elem = drawing.find("layers")
    if layers_elem is not None:
        for layer in layers_elem.findall("layer"):
            layers.append({
                "number": int(layer.get("number", "0")),
                "name": layer.get("name", ""),
                "visible": 1 if layer.get("visible", "yes") == "yes" else 0,
                "color": int(layer.get("color", "0")) if layer.get("color", "").isdigit() else 0,
            })

    # Net classes
    net_classes = []
    class_map = {}
    classes_elem = board.find("classes")
    if classes_elem is not None:
        for cl in classes_elem.findall("class"):
            cl_num = int(cl.get("number", "0"))
            cl_name = cl.get("name", "")
            class_map[cl_num] = cl_name
            net_classes.append({
                "number": cl_num,
                "name": cl_name,
                "width": float(cl.get("width", "0")),
                "drill": float(cl.get("drill", "0")),
                "clearance": float(cl.get("clearance", "0")),
            })

    # Build package lookup: SMD flag + pad definitions
    pkg_smd_lookup = {}  # (library, package) -> bool
    pkg_pads_lookup = {}  # (library, package) -> list of pad dicts
    libs_elem = board.find("libraries")
    if libs_elem is not None:
        for lib in libs_elem.findall("library"):
            lib_name = lib.get("name", "")
            pkgs = lib.find("packages")
            if pkgs is None:
                continue
            for pkg in pkgs.findall("package"):
                pkg_name = pkg.get("name", "")
                has_smd = len(pkg.findall("smd")) > 0
                pkg_smd_lookup[(lib_name, pkg_name)] = has_smd
                # Collect pad definitions for distance calculations
                pads = []
                for smd in pkg.findall("smd"):
                    pads.append({
                        "name": smd.get("name", ""),
                        "type": "smd",
                        "x": float(smd.get("x", "0")),
                        "y": float(smd.get("y", "0")),
                        "dx": float(smd.get("dx", "0")),
                        "dy": float(smd.get("dy", "0")),
                        "layer": int(smd.get("layer", "1")),
                    })
                for pad in pkg.findall("pad"):
                    pads.append({
                        "name": pad.get("name", ""),
                        "type": "through-hole",
                        "x": float(pad.get("x", "0")),
                        "y": float(pad.get("y", "0")),
                        "drill": float(pad.get("drill", "0")),
                    })
                pkg_pads_lookup[(lib_name, pkg_name)] = pads

    # Elements (components on board)
    elements = []
    elements_elem = board.find("elements")
    if elements_elem is not None:
        for elem in elements_elem.findall("element"):
            e_name = elem.get("name", "")
            e_library = elem.get("library", "")
            e_package = elem.get("package", "")
            e_value = elem.get("value", "")

            is_smd = 1 if pkg_smd_lookup.get(
                (e_library, e_package), False) else 0

            # Populate flag (DNP detection)
            populate = 0 if elem.get("populate") == "no" else 1

            # Smashed flag (manually-placed text)
            smashed = 1 if elem.get("smashed") == "yes" else 0

            # Element attributes
            elem_attrs = {}
            for attr in elem.findall("attribute"):
                aname = attr.get("name", "")
                aval = attr.get("value", "")
                if aname:
                    elem_attrs[aname] = aval

            rot_str = elem.get("rot", "R0")
            mirror = 1 if "M" in rot_str else 0
            # Strip R, M, S flags to get numeric angle
            angle_str = rot_str.replace("R", "").replace("M", "").replace("S", "")
            try:
                angle = float(angle_str) if angle_str else 0.0
            except ValueError:
                angle = 0.0

            # Resolve pad definitions from package library
            pads = pkg_pads_lookup.get((e_library, e_package), [])

            elem_dict = {
                "name": e_name,
                "value": e_value,
                "package": e_package,
                "library": e_library,
                "x": float(elem.get("x", "0")),
                "y": float(elem.get("y", "0")),
                "angle": angle,
                "mirror": mirror,
                "smd": is_smd,
                "populate": populate,
                "smashed": smashed,
                "attributes": elem_attrs,
            }
            if pads:
                elem_dict["pads"] = pads
            elements.append(elem_dict)

    # Signals (nets with routing)
    signals = []
    signals_elem = board.find("signals")
    if signals_elem is not None:
        for sig in signals_elem.findall("signal"):
            s_name = sig.get("name", "")
            s_class = int(sig.get("class", "0"))

            contactrefs = []
            for cr in sig.findall("contactref"):
                contactrefs.append({
                    "element": cr.get("element", ""),
                    "pad": cr.get("pad", ""),
                })

            wires = []
            for wire in sig.findall("wire"):
                wires.append({
                    "x1": float(wire.get("x1", "0")),
                    "y1": float(wire.get("y1", "0")),
                    "x2": float(wire.get("x2", "0")),
                    "y2": float(wire.get("y2", "0")),
                    "width": float(wire.get("width", "0")),
                    "layer": int(wire.get("layer", "0")),
                    "style": 0,
                })

            vias = []
            for via in sig.findall("via"):
                via_dict = {
                    "x": float(via.get("x", "0")),
                    "y": float(via.get("y", "0")),
                    "drill": float(via.get("drill", "0")),
                }
                extent = via.get("extent", "")
                if extent:
                    via_dict["extent"] = extent
                vias.append(via_dict)

            polygons = []
            for poly in sig.findall("polygon"):
                vertices = []
                poly_wires = poly.findall("vertex")
                for i in range(len(poly_wires)):
                    v1 = poly_wires[i]
                    v2 = poly_wires[(i + 1) % len(poly_wires)]
                    vertices.append({
                        "x1": float(v1.get("x", "0")),
                        "y1": float(v1.get("y", "0")),
                        "x2": float(v2.get("x", "0")),
                        "y2": float(v2.get("y", "0")),
                    })

                polygons.append({
                    "width": float(poly.get("width", "0")),
                    "layer": int(poly.get("layer", "0")),
                    "isolate": float(poly.get("isolate", "0")),
                    "rank": int(poly.get("rank", "0")),
                    "orphans": 1 if poly.get("orphans") == "yes" else 0,
                    "thermals": 1 if poly.get("thermals", "yes") == "yes" else 0,
                    "vertices": vertices,
                })

            signals.append({
                "name": s_name,
                "class_index": s_class,
                "class_name": class_map.get(s_class, ""),
                "airwiresHidden": 0,
                "contactrefs": contactrefs,
                "wires": wires,
                "vias": vias,
                "polygons": polygons,
            })

    # Board area (bounding box from board outline or elements)
    all_x = []
    all_y = []
    for w in board_outline:
        all_x.extend([w["x1"], w["x2"]])
        all_y.extend([w["y1"], w["y2"]])
    for e in elements:
        all_x.append(e["x"])
        all_y.append(e["y"])

    area = {}
    if all_x and all_y:
        area = {
            "x1": round(min(all_x), 2),
            "y1": round(min(all_y), 2),
            "x2": round(max(all_x), 2),
            "y2": round(max(all_y), 2),
        }

    # Holes (legacy location — also captured in plain_elements below)
    holes = []
    if plain is not None:
        for hole in plain.findall("hole"):
            holes.append({
                "x": float(hole.get("x", "0")),
                "y": float(hole.get("y", "0")),
                "drill": float(hole.get("drill", "0")),
            })

    # Texts on silkscreen/documentation layers
    # Layers: 21=tPlace, 22=bPlace, 25=tNames, 26=bNames, 51=tDocu, 52=bDocu
    silk_layers = {"21", "22", "25", "26", "51", "52"}
    texts = []
    if plain is not None:
        for text in plain.findall("text"):
            layer = text.get("layer", "")
            if layer in silk_layers:
                content = text.text or ""
                rot_str = text.get("rot", "R0")
                angle_str = rot_str.replace("R", "").replace("M", "").replace("S", "")
                try:
                    t_angle = float(angle_str) if angle_str else 0.0
                except ValueError:
                    t_angle = 0.0
                texts.append({
                    "content": content.strip(),
                    "x": float(text.get("x", "0")),
                    "y": float(text.get("y", "0")),
                    "size": float(text.get("size", "1.27")),
                    "layer": int(layer),
                    "font": text.get("font", "proportional"),
                    "angle": t_angle,
                    "align": text.get("align", "bottom-left"),
                })

    # Plain elements: circles, rectangles, holes (mounting holes, fiducials, keepouts)
    plain_elements = []
    if plain is not None:
        for circle in plain.findall("circle"):
            plain_elements.append({
                "type": "circle",
                "x": float(circle.get("x", "0")),
                "y": float(circle.get("y", "0")),
                "radius": float(circle.get("radius", "0")),
                "width": float(circle.get("width", "0")),
                "layer": int(circle.get("layer", "0")),
            })
        for rect in plain.findall("rectangle"):
            plain_elements.append({
                "type": "rectangle",
                "x1": float(rect.get("x1", "0")),
                "y1": float(rect.get("y1", "0")),
                "x2": float(rect.get("x2", "0")),
                "y2": float(rect.get("y2", "0")),
                "layer": int(rect.get("layer", "0")),
            })
        for hole in plain.findall("hole"):
            plain_elements.append({
                "type": "hole",
                "x": float(hole.get("x", "0")),
                "y": float(hole.get("y", "0")),
                "drill": float(hole.get("drill", "0")),
            })

    # Design rules
    design_rules = {}
    rules_elem = board.find("designrules")
    if rules_elem is not None:
        for param in rules_elem.findall("param"):
            p_name = param.get("name", "")
            p_value = param.get("value", "")
            if p_name:
                design_rules[p_name] = p_value

    return {
        "export_type": "board",
        "design_name": design_name,
        "filename": design_name + ".brd",
        "grid": grid,
        "board_outline": board_outline,
        "area": area,
        "layers": layers,
        "net_classes": net_classes,
        "elements": elements,
        "signals": signals,
        "holes": holes,
        "texts": texts,
        "plain_elements": plain_elements,
        "design_rules": design_rules,
    }


# ── REC Library Matching ──────────────────────────────────────────

def load_rec_library():
    """Load the REC Standard Library for cross-referencing."""
    candidates = [
        os.environ.get("REC_LIBRARY_PATH", ""),
        os.path.expanduser(
            "~/development/autodesk-coder/library-data/rec-library.json"
        ),
    ]

    for path in candidates:
        if path and os.path.exists(path):
            try:
                with open(path, "r") as f:
                    data = json.load(f)
                devicesets = {}
                for ds in data.get("devicesets", []):
                    devicesets[ds["name"].upper()] = ds
                return {
                    "version": data.get("library_name", ""),
                    "devicesets": devicesets,
                }
            except Exception:
                pass

    return {"version": None, "devicesets": {}}


def strip_html(s):
    """Remove HTML tags."""
    result = ""
    in_tag = False
    for ch in s:
        if ch == '<':
            in_tag = True
        elif ch == '>':
            in_tag = False
        elif not in_tag:
            result += ch
    return result.strip()


def match_rec_library(deviceset, value, package, rec_devicesets):
    """Match a part against the REC Standard Library."""
    if not rec_devicesets:
        return None

    ds_upper = deviceset.upper()

    if ds_upper in rec_devicesets:
        ds = rec_devicesets[ds_upper]
        footprint = ""
        if ds.get("devices"):
            footprint = ds["devices"][0].get("footprint", "")
        headline = ds.get("headline", "") or strip_html(
            ds.get("description", ""))
        return {
            "deviceset": ds["name"],
            "description": headline,
            "footprint": footprint,
        }

    if value and package:
        val_norm = value.upper().replace(" ", "")
        pkg_size = package.upper()
        for prefix in ("C", "R", "L"):
            if (pkg_size.startswith(prefix) and len(pkg_size) > 1
                    and pkg_size[1:].isdigit()):
                pkg_size = pkg_size[1:]
                break

        for name, ds in rec_devicesets.items():
            if val_norm in name and pkg_size in name:
                footprint = ""
                if ds.get("devices"):
                    footprint = ds["devices"][0].get("footprint", "")
                headline = ds.get("headline", "") or strip_html(
                    ds.get("description", ""))
                return {
                    "deviceset": ds["name"],
                    "description": headline,
                    "footprint": footprint,
                }

    return None


# ── Master JSON Generation ────────────────────────────────────────

def generate_master_json(output_dir, rec_lib):
    """Generate master.json from exported schematic/board JSONs."""
    rec_devicesets = rec_lib["devicesets"]

    schematic_files = {}
    board_files = {}

    for fname in os.listdir(output_dir):
        if fname in ("master.json", "export_manifest.json"):
            continue
        if fname.endswith("_schematic.json"):
            key = fname[:-len("_schematic.json")]
            schematic_files[key] = os.path.join(output_dir, fname)
        elif fname.endswith("_board.json"):
            key = fname[:-len("_board.json")]
            board_files[key] = os.path.join(output_dir, fname)

    all_designs = sorted(set(
        list(schematic_files.keys()) + list(board_files.keys())))

    if not all_designs:
        return None

    designs = []

    for design_key in all_designs:
        sch_data = None
        brd_data = None

        if design_key in schematic_files:
            with open(schematic_files[design_key]) as f:
                sch_data = json.load(f)
        if design_key in board_files:
            with open(board_files[design_key]) as f:
                brd_data = json.load(f)

        design_name = design_key
        if sch_data:
            design_name = sch_data.get("design_name", design_key)
        elif brd_data:
            design_name = brd_data.get("design_name", design_key)

        # Board summary
        board_summary = None
        board_elements = {}
        net_names = []

        if brd_data:
            area = brd_data.get("area", {})
            width = round(area.get("x2", 0) - area.get("x1", 0), 2)
            height = round(area.get("y2", 0) - area.get("y1", 0), 2)

            brd_layers = brd_data.get("layers", [])
            layer_count = sum(
                1 for ly in brd_layers if 1 <= ly.get("number", 0) <= 16)

            sigs = brd_data.get("signals", [])
            net_names = [s.get("name", "") for s in sigs]

            board_summary = {
                "width_mm": width,
                "height_mm": height,
                "layer_count": layer_count,
                "net_count": len(sigs),
                "hole_count": len(brd_data.get("holes", [])),
            }

            for elem in brd_data.get("elements", []):
                board_elements[elem.get("name", "")] = elem

        # Parts with REC matching
        parts = []
        smd_count = 0
        th_count = 0
        rec_match_count = 0

        if sch_data:
            for part in sch_data.get("parts", []):
                ref = part.get("name", "")
                value = part.get("value", "")
                deviceset = part.get("deviceset", "")
                package = part.get("package", "")
                library = part.get("library", "")

                board_elem = board_elements.get(ref, {})
                is_smd = bool(board_elem.get("smd", 0))

                if is_smd:
                    smd_count += 1
                elif board_elem:
                    th_count += 1

                position = None
                if board_elem:
                    position = {
                        "x": board_elem.get("x", 0.0),
                        "y": board_elem.get("y", 0.0),
                        "angle": board_elem.get("angle", 0.0),
                        "mirror": bool(board_elem.get("mirror", 0)),
                    }

                rec_match = match_rec_library(
                    deviceset, value, package, rec_devicesets)
                if rec_match:
                    rec_match_count += 1

                part_entry = {
                    "ref": ref,
                    "value": value,
                    "deviceset": deviceset,
                    "package": package,
                    "library": library,
                    "smd": is_smd,
                }
                if position:
                    part_entry["position"] = position
                part_entry["rec_match"] = rec_match

                parts.append(part_entry)

        total_parts = len(parts)

        design_entry = {
            "design_name": design_name,
            "schematic_file": (
                os.path.basename(schematic_files[design_key])
                if design_key in schematic_files else None
            ),
            "board_file": (
                os.path.basename(board_files[design_key])
                if design_key in board_files else None
            ),
        }

        if board_summary:
            design_entry["board"] = board_summary

        design_entry["parts_summary"] = {
            "total": total_parts,
            "smd": smd_count,
            "through_hole": th_count,
            "rec_library_matches": rec_match_count,
            "non_rec_parts": total_parts - rec_match_count,
        }
        design_entry["parts"] = parts
        if net_names:
            design_entry["nets"] = net_names

        designs.append(design_entry)

    # Library version
    version_str = None
    if rec_lib["version"]:
        basename = os.path.basename(rec_lib["version"])
        version_str = basename[:-4] if basename.endswith(".lbr") else basename

    master = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "rec_library_version": version_str,
        "designs": designs,
    }

    master_path = os.path.join(output_dir, "master.json")
    with open(master_path, "w") as f:
        json.dump(master, f, indent=2)

    return master_path
