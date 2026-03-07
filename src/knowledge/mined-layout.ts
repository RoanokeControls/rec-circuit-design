// Auto-generated from mine-layout-patterns.py — do not edit manually
// Mined from 206 board layouts in the REC design library

export interface LayoutPattern {
  id: string;
  category: string;
  description: string;
  data: unknown;
  sampleSize: number;
}

export const layoutPatterns: LayoutPattern[] = [
  {
    "id": "layout-board-dimensions",
    "category": "board-size",
    "description": "Board dimensions across 206 boards",
    "data": {
        "widthMm": {
            "count": 206,
            "min": 14.61,
            "max": 2139.95,
            "mean": 138.8308,
            "p25": 63.125,
            "p50": 107.63,
            "p75": 177.8,
            "p90": 228.51
        },
        "heightMm": {
            "count": 206,
            "min": 8.4,
            "max": 294.62,
            "mean": 69.029,
            "p25": 31.8125,
            "p50": 58.42,
            "p75": 82.55,
            "p90": 133.35
        },
        "areaMm2": {
            "count": 206,
            "min": 139.2,
            "max": 508216.7,
            "mean": 15487.9529,
            "p25": 2125.9,
            "p50": 7277.25,
            "p75": 13069.05,
            "p90": 28161.0
        },
        "aspectRatio": {
            "count": 206,
            "min": 1.0,
            "max": 9.01,
            "mean": 2.0842,
            "p25": 1.4125,
            "p50": 1.805,
            "p75": 2.38,
            "p90": 3.195
        },
        "shapes": {
            "rectangular": 155,
            "non-rectangular": 51
        },
        "commonSizes": [
            {
                "size": "190x135mm",
                "count": 8
            },
            {
                "size": "15x10mm",
                "count": 6
            },
            {
                "size": "75x45mm",
                "count": 4
            },
            {
                "size": "100x75mm",
                "count": 4
            },
            {
                "size": "205x75mm",
                "count": 4
            },
            {
                "size": "25x15mm",
                "count": 4
            },
            {
                "size": "160x60mm",
                "count": 4
            },
            {
                "size": "75x50mm",
                "count": 3
            },
            {
                "size": "65x65mm",
                "count": 3
            },
            {
                "size": "255x185mm",
                "count": 3
            },
            {
                "size": "130x70mm",
                "count": 3
            },
            {
                "size": "160x70mm",
                "count": 3
            },
            {
                "size": "30x20mm",
                "count": 3
            },
            {
                "size": "60x30mm",
                "count": 3
            },
            {
                "size": "30x15mm",
                "count": 3
            }
        ]
    },
    "sampleSize": 206
},
  {
    "id": "layout-design-rules",
    "category": "design-rules",
    "description": "DRC settings across 206 boards",
    "data": {
        "clearances": {
            "wire_wire": {
                "count": 206,
                "min": 0.15,
                "max": 1.27,
                "mean": 0.1754,
                "p25": 0.1524,
                "p50": 0.1524,
                "p75": 0.1524,
                "p90": 0.2032
            },
            "wire_pad": {
                "count": 206,
                "min": 0.15,
                "max": 1.27,
                "mean": 0.1818,
                "p25": 0.1524,
                "p50": 0.1524,
                "p75": 0.1524,
                "p90": 0.2032
            },
            "pad_pad": {
                "count": 206,
                "min": 0.15,
                "max": 0.762,
                "mean": 0.1593,
                "p25": 0.1524,
                "p50": 0.1524,
                "p75": 0.1524,
                "p90": 0.1778
            },
            "smd_pad": {
                "count": 206,
                "min": 0.05,
                "max": 0.2032,
                "mean": 0.1407,
                "p25": 0.1524,
                "p50": 0.1524,
                "p75": 0.1524,
                "p90": 0.1524
            },
            "smd_smd": {
                "count": 206,
                "min": 0.05,
                "max": 0.2032,
                "mean": 0.141,
                "p25": 0.1524,
                "p50": 0.1524,
                "p75": 0.1524,
                "p90": 0.1524
            }
        },
        "minTraceWidth": {
            "count": 206,
            "min": 0.15,
            "max": 0.254,
            "mean": 0.153,
            "p25": 0.1524,
            "p50": 0.1524,
            "p75": 0.1524,
            "p90": 0.1524
        },
        "minDrill": {
            "count": 206,
            "min": 0.2,
            "max": 0.4064,
            "mean": 0.3406,
            "p25": 0.35,
            "p50": 0.35,
            "p75": 0.35,
            "p90": 0.35
        },
        "padAnnularRing": {
            "top": {
                "count": 206,
                "min": 0.1,
                "max": 0.25,
                "mean": 0.2439,
                "p25": 0.25,
                "p50": 0.25,
                "p75": 0.25,
                "p90": 0.25
            },
            "via": {
                "count": 206,
                "min": 0.25,
                "max": 0.25,
                "mean": 0.25,
                "p25": 0.25,
                "p50": 0.25,
                "p75": 0.25,
                "p90": 0.25
            }
        }
    },
    "sampleSize": 206
},
  {
    "id": "layout-orientations",
    "category": "orientation",
    "description": "Component rotation angles across 14044 placements",
    "data": {
        "cardinalAlignedPct": 99.7,
        "distribution": [
            {
                "value": 0,
                "count": 5112
            },
            {
                "value": 270,
                "count": 3342
            },
            {
                "value": 180,
                "count": 2777
            },
            {
                "value": 90,
                "count": 2772
            },
            {
                "value": 45,
                "count": 7
            },
            {
                "value": 315,
                "count": 5
            },
            {
                "value": 225,
                "count": 3
            },
            {
                "value": 41,
                "count": 3
            },
            {
                "value": 316,
                "count": 3
            },
            {
                "value": 300,
                "count": 2
            },
            {
                "value": 135,
                "count": 2
            },
            {
                "value": 2,
                "count": 2
            }
        ],
        "topSidePct": 86.0,
        "bottomSidePct": 14.0,
        "topCount": 12075,
        "bottomCount": 1969
    },
    "sampleSize": 14044
},
  {
    "id": "layout-component-zones",
    "category": "placement-zones",
    "description": "Normalized component placement zones (0,0=bottom-left, 1,1=top-right)",
    "data": {
        "capacitor": {
            "count": 2650,
            "meanX": 0.494,
            "meanY": 0.476,
            "atEdgePct": 33.9,
            "xSpread": 0.98,
            "ySpread": 0.986
        },
        "connector": {
            "count": 873,
            "meanX": 0.471,
            "meanY": 0.496,
            "atEdgePct": 65.5,
            "xSpread": 0.993,
            "ySpread": 0.99
        },
        "crystal": {
            "count": 27,
            "meanX": 0.46,
            "meanY": 0.417,
            "atEdgePct": 29.6,
            "xSpread": 0.724,
            "ySpread": 0.683
        },
        "diode-led": {
            "count": 1941,
            "meanX": 0.487,
            "meanY": 0.485,
            "atEdgePct": 38.2,
            "xSpread": 1.0,
            "ySpread": 1.0
        },
        "fuse": {
            "count": 143,
            "meanX": 0.578,
            "meanY": 0.461,
            "atEdgePct": 62.2,
            "xSpread": 0.95,
            "ySpread": 0.948
        },
        "ic-other": {
            "count": 699,
            "meanX": 0.483,
            "meanY": 0.503,
            "atEdgePct": 34.5,
            "xSpread": 0.952,
            "ySpread": 0.948
        },
        "inductor": {
            "count": 38,
            "meanX": 0.442,
            "meanY": 0.501,
            "atEdgePct": 31.6,
            "xSpread": 0.912,
            "ySpread": 0.882
        },
        "interface-ic": {
            "count": 13,
            "meanX": 0.549,
            "meanY": 0.471,
            "atEdgePct": 15.4,
            "xSpread": 0.61,
            "ySpread": 0.746
        },
        "mcu": {
            "count": 54,
            "meanX": 0.462,
            "meanY": 0.458,
            "atEdgePct": 9.3,
            "xSpread": 0.858,
            "ySpread": 0.661
        },
        "module": {
            "count": 1,
            "meanX": 0.369,
            "meanY": 0.812,
            "atEdgePct": 0.0,
            "xSpread": 0.0,
            "ySpread": 0.0
        },
        "other": {
            "count": 2112,
            "meanX": 0.46,
            "meanY": 0.486,
            "atEdgePct": 70.7,
            "xSpread": 1.0,
            "ySpread": 1.0
        },
        "regulator": {
            "count": 124,
            "meanX": 0.527,
            "meanY": 0.463,
            "atEdgePct": 42.7,
            "xSpread": 0.936,
            "ySpread": 0.931
        },
        "relay": {
            "count": 28,
            "meanX": 0.668,
            "meanY": 0.513,
            "atEdgePct": 46.4,
            "xSpread": 0.673,
            "ySpread": 0.864
        },
        "resistor": {
            "count": 4603,
            "meanX": 0.492,
            "meanY": 0.515,
            "atEdgePct": 40.7,
            "xSpread": 0.99,
            "ySpread": 0.992
        },
        "switch": {
            "count": 100,
            "meanX": 0.535,
            "meanY": 0.429,
            "atEdgePct": 22.0,
            "xSpread": 0.949,
            "ySpread": 0.914
        },
        "testpoint": {
            "count": 126,
            "meanX": 0.464,
            "meanY": 0.545,
            "atEdgePct": 31.0,
            "xSpread": 0.973,
            "ySpread": 0.973
        },
        "transistor": {
            "count": 512,
            "meanX": 0.492,
            "meanY": 0.523,
            "atEdgePct": 38.3,
            "xSpread": 0.975,
            "ySpread": 0.991
        }
    },
    "sampleSize": 14044
},
  {
    "id": "layout-mcu-placement",
    "category": "mcu-placement",
    "description": "MCU/module placement across 54 instances",
    "data": {
        "zone": {
            "count": 54,
            "meanX": 0.462,
            "meanY": 0.458,
            "atEdgePct": 9.3,
            "xSpread": 0.858,
            "ySpread": 0.661
        },
        "note": "MCUs tend toward center of board"
    },
    "sampleSize": 54
},
  {
    "id": "layout-regulator-placement",
    "category": "regulator-placement",
    "description": "Voltage regulator placement across 124 instances",
    "data": {
        "zone": {
            "count": 124,
            "meanX": 0.527,
            "meanY": 0.463,
            "atEdgePct": 42.7,
            "xSpread": 0.936,
            "ySpread": 0.931
        },
        "note": "Regulators placed near board edge for thermal/input access"
    },
    "sampleSize": 124
},
  {
    "id": "layout-connector-edge-proximity",
    "category": "connector-placement",
    "description": "Connector distance to nearest board edge across 873 instances",
    "data": {
        "distanceMm": {
            "count": 873,
            "min": 0.0,
            "max": 137.26,
            "mean": 12.8989,
            "p25": 4.06,
            "p50": 8.25,
            "p75": 16.51,
            "p90": 31.7
        },
        "within5mmPct": 32.0,
        "within10mmPct": 58.2
    },
    "sampleSize": 873
},
  {
    "id": "layout-via-patterns",
    "category": "via-patterns",
    "description": "Via drill sizes and extents across 8351 vias",
    "data": {
        "drillSizes": [
            {
                "value": 0.35,
                "count": 4940
            },
            {
                "value": 0.4,
                "count": 991
            },
            {
                "value": 0.3,
                "count": 623
            },
            {
                "value": 0.6,
                "count": 316
            },
            {
                "value": 0.7,
                "count": 271
            },
            {
                "value": 0.45,
                "count": 222
            },
            {
                "value": 0.65,
                "count": 197
            },
            {
                "value": 0.356,
                "count": 197
            },
            {
                "value": 0.5,
                "count": 106
            },
            {
                "value": 0.381,
                "count": 99
            }
        ],
        "extents": [
            {
                "value": "1-16",
                "count": 8154
            },
            {
                "value": "1-64",
                "count": 197
            }
        ],
        "totalVias": 8351
    },
    "sampleSize": 8351
},
  {
    "id": "layout-mounting-holes",
    "category": "mounting-holes",
    "description": "Mounting hole patterns across 117 boards",
    "data": {
        "boardsWithHoles": 117,
        "boardsWithoutHoles": 89,
        "holeCountDistribution": [
            {
                "count": 1,
                "boards": 8
            },
            {
                "count": 2,
                "boards": 19
            },
            {
                "count": 3,
                "boards": 8
            },
            {
                "count": 4,
                "boards": 40
            },
            {
                "count": 5,
                "boards": 13
            },
            {
                "count": 6,
                "boards": 12
            },
            {
                "count": 7,
                "boards": 3
            },
            {
                "count": 8,
                "boards": 7
            },
            {
                "count": 10,
                "boards": 2
            },
            {
                "count": 11,
                "boards": 1
            },
            {
                "count": 12,
                "boards": 1
            },
            {
                "count": 13,
                "boards": 1
            },
            {
                "count": 16,
                "boards": 1
            },
            {
                "count": 24,
                "boards": 1
            }
        ],
        "commonDrills": [
            {
                "value": 3.17,
                "count": 136
            },
            {
                "value": 5.08,
                "count": 58
            },
            {
                "value": 3.96,
                "count": 48
            },
            {
                "value": 4.19,
                "count": 28
            },
            {
                "value": 3.3,
                "count": 27
            }
        ]
    },
    "sampleSize": 117
},
  {
    "id": "layout-grid-preferences",
    "category": "grid",
    "description": "Grid settings across 206 boards",
    "data": {
        "settings": [
            {
                "value": "5.0 (unit=2)",
                "count": 144
            },
            {
                "value": "1.0 (unit=2)",
                "count": 16
            },
            {
                "value": "50.0 (unit=2)",
                "count": 12
            },
            {
                "value": "25.0 (unit=2)",
                "count": 7
            },
            {
                "value": "10.0 (unit=2)",
                "count": 7
            },
            {
                "value": "100.0 (unit=2)",
                "count": 3
            },
            {
                "value": "0.1 (unit=1)",
                "count": 2
            },
            {
                "value": "1.0 (unit=1)",
                "count": 2
            },
            {
                "value": "0.5 (unit=2)",
                "count": 2
            },
            {
                "value": "0.6 (unit=2)",
                "count": 1
            }
        ]
    },
    "sampleSize": 206
},
  {
    "id": "layout-copper-pours",
    "category": "copper-pour",
    "description": "Copper pour usage across 206 boards",
    "data": {
        "boardsWithPours": 0,
        "boardsWithoutPours": 206,
        "poursPerBoard": {
            "count": 206,
            "min": 0,
            "max": 0,
            "mean": 0.0,
            "p25": 0.0,
            "p50": 0.0,
            "p75": 0.0,
            "p90": 0.0
        }
    },
    "sampleSize": 206
}
];

// ── Convenience accessors ──

export function getLayoutPattern(id: string): LayoutPattern | undefined {
  return layoutPatterns.find(p => p.id === id);
}

export function getLayoutsByCategory(category: string): LayoutPattern[] {
  return layoutPatterns.filter(p => p.category === category);
}
