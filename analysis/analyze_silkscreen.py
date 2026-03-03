#!/usr/bin/env python3
"""Analyze silkscreen and documentation text conventions.

Text sizes, fonts, layer usage, smash rate, part number format patterns.

Output: analysis/silkscreen_patterns.json
"""

import glob
import json
import os
import re
from collections import defaultdict

BOARD_DIR = os.path.join(os.path.dirname(__file__), "..", "aps-export-output")
OUTPUT = os.path.join(os.path.dirname(__file__), "silkscreen_patterns.json")

# Layer names for reference
LAYER_NAMES = {
    21: "tPlace",
    22: "bPlace",
    25: "tNames",
    26: "bNames",
    51: "tDocu",
    52: "bDocu",
}

# Part number format patterns
PN_PATTERNS = [
    (re.compile(r"^[A-Z]{2,4}\d{4,6}[A-Z]?$"), "XXNNNN (e.g. PCBLF0648)"),
    (re.compile(r"^[A-Z]-\d{5}$"), "X-NNNNN (e.g. A-15111)"),
    (re.compile(r"^\d{4}\([A-Z]{3}\d+\)$"), "NNNN(XXXNN) (e.g. 8345(WDP3211A))"),
    (re.compile(r"^RD-[A-Z]-\d{5}$"), "RD-X-NNNNN (e.g. RD-A-16327)"),
    (re.compile(r"^[A-Z]{2}\d{4}$"), "XXNNNN (e.g. SK30051)"),
    (re.compile(r"^v\d+\.?\d*$", re.I), "vN.N (version)"),
    (re.compile(r"^\d+\.\d+\"?$"), "N.N (dimension)"),
]


def analyze():
    boards = sorted(glob.glob(os.path.join(BOARD_DIR, "*_board.json")))
    print(f"Analyzing silkscreen across {len(boards)} boards...")

    text_sizes = defaultdict(lambda: defaultdict(int))  # layer -> size -> count
    font_usage = defaultdict(int)
    layer_text_counts = defaultdict(int)
    smash_counts = {"smashed": 0, "not_smashed": 0}
    total_elements = 0
    total_texts = 0
    boards_with_texts = 0
    part_number_formats = defaultdict(int)
    text_content_samples = defaultdict(list)  # layer -> list of sample contents
    align_usage = defaultdict(int)

    for bpath in boards:
        with open(bpath) as f:
            board = json.load(f)

        design = board.get("design_name", "")
        texts = board.get("texts", [])
        elements = board.get("elements", [])

        if texts:
            boards_with_texts += 1

        total_texts += len(texts)

        for text in texts:
            layer = text.get("layer", 0)
            size = text.get("size", 1.27)
            font = text.get("font", "proportional")
            align = text.get("align", "bottom-left")
            content = text.get("content", "")

            layer_text_counts[layer] += 1
            text_sizes[layer][round(size, 3)] += 1
            font_usage[font] += 1
            align_usage[align] += 1

            # Sample content (first 5 per layer)
            if len(text_content_samples[layer]) < 5:
                text_content_samples[layer].append({"content": content, "design": design})

            # Check for part number patterns
            for pattern, label in PN_PATTERNS:
                if pattern.match(content):
                    part_number_formats[label] += 1
                    break

        # Smash rate
        for elem in elements:
            total_elements += 1
            if elem.get("smashed"):
                smash_counts["smashed"] += 1
            else:
                smash_counts["not_smashed"] += 1

    # Build layer summaries
    layer_summaries = []
    for layer in sorted(layer_text_counts.keys()):
        sizes = text_sizes[layer]
        top_sizes = sorted(sizes.items(), key=lambda x: -x[1])[:5]
        most_common_size = top_sizes[0][0] if top_sizes else 0

        layer_summaries.append({
            "layer": layer,
            "layerName": LAYER_NAMES.get(layer, f"Layer {layer}"),
            "textCount": layer_text_counts[layer],
            "mostCommonSize": most_common_size,
            "sizeDistribution": {str(s): c for s, c in top_sizes},
            "samples": text_content_samples.get(layer, []),
        })

    # Smash rate
    smash_rate = round(
        100 * smash_counts["smashed"] / total_elements, 1
    ) if total_elements > 0 else 0

    result = {
        "summary": {
            "boards_analyzed": len(boards),
            "boards_with_texts": boards_with_texts,
            "total_text_elements": total_texts,
            "total_board_elements": total_elements,
            "smash_rate_pct": smash_rate,
        },
        "layer_summaries": layer_summaries,
        "font_usage": dict(sorted(font_usage.items(), key=lambda x: -x[1])),
        "alignment_usage": dict(sorted(align_usage.items(), key=lambda x: -x[1])),
        "part_number_formats": dict(sorted(part_number_formats.items(), key=lambda x: -x[1])),
        "smash_details": {
            "smashed_elements": smash_counts["smashed"],
            "not_smashed": smash_counts["not_smashed"],
            "smash_rate_pct": smash_rate,
        },
    }

    with open(OUTPUT, "w") as f:
        json.dump(result, f, indent=2)

    print(f"  Boards with texts: {boards_with_texts}")
    print(f"  Total text elements: {total_texts}")
    print(f"  Smash rate: {smash_rate}%")
    print(f"  Font usage: {dict(font_usage)}")
    print(f"  Output: {OUTPUT}")
    return result


if __name__ == "__main__":
    analyze()
