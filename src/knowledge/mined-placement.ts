import { PlacementConvention } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const minedPlacement: PlacementConvention[] = [
    {
      id: "placement-density",
      category: "density",
      description: "Board component density across 206 boards",
      metric: 0.63,
      unit: "parts/cm²",
      sampleSize: 206
    },
    {
      id: "placement-connector-edge",
      category: "connector-edge",
      description: "30.8% of connectors within 5mm of board edge",
      metric: 30.8,
      unit: "percent",
      sampleSize: 909
    },
    {
      id: "placement-mounting-holes",
      category: "mounting-hole",
      description: "117 boards use mounting holes",
      metric: 117,
      unit: "boards",
      sampleSize: 206
    },
    {
      id: "placement-conn-pin-header",
      category: "connector-edge",
      description: "pin-header: 2229 instances, 8.2% at edge, median 20.87mm from edge",
      metric: 20.87,
      unit: "mm from edge",
      sampleSize: 2229
    },
    {
      id: "placement-conn-generic",
      category: "connector-edge",
      description: "generic: 659 instances, 22.8% at edge, median 9.01mm from edge",
      metric: 9.01,
      unit: "mm from edge",
      sampleSize: 659
    },
    {
      id: "placement-conn-rf",
      category: "connector-edge",
      description: "RF: 87 instances, 17.2% at edge, median 8.89mm from edge",
      metric: 8.89,
      unit: "mm from edge",
      sampleSize: 87
    },
    {
      id: "placement-conn-jst",
      category: "connector-edge",
      description: "JST: 53 instances, 60.4% at edge, median 3.23mm from edge",
      metric: 3.23,
      unit: "mm from edge",
      sampleSize: 53
    },
    {
      id: "placement-conn-molex",
      category: "connector-edge",
      description: "Molex: 52 instances, 88.5% at edge, median 3.56mm from edge",
      metric: 3.56,
      unit: "mm from edge",
      sampleSize: 52
    },
    {
      id: "placement-conn-terminal-block",
      category: "connector-edge",
      description: "terminal-block: 31 instances, 3.2% at edge, median 12.13mm from edge",
      metric: 12.13,
      unit: "mm from edge",
      sampleSize: 31
    },
    {
      id: "placement-conn-usb",
      category: "connector-edge",
      description: "USB: 12 instances, 16.7% at edge, median 7.62mm from edge",
      metric: 7.62,
      unit: "mm from edge",
      sampleSize: 12
    },
    {
      id: "placement-conn-idc",
      category: "connector-edge",
      description: "IDC: 10 instances, 0.0% at edge, median 19.09mm from edge",
      metric: 19.09,
      unit: "mm from edge",
      sampleSize: 10
    },
    {
      id: "placement-conn-circular",
      category: "connector-edge",
      description: "circular: 7 instances, 0.0% at edge, median 33.45mm from edge",
      metric: 33.45,
      unit: "mm from edge",
      sampleSize: 7
    },
    {
      id: "placement-conn-rj45",
      category: "connector-edge",
      description: "RJ45: 2 instances, 0.0% at edge, median 137.26mm from edge",
      metric: 137.26,
      unit: "mm from edge",
      sampleSize: 2
    },
    {
      id: "placement-conn-barrel-jack",
      category: "connector-edge",
      description: "barrel-jack: 2 instances, 0.0% at edge, median 13.97mm from edge",
      metric: 13.97,
      unit: "mm from edge",
      sampleSize: 2
    },
    {
      id: "placement-mod-ac-dc-module",
      category: "adapter",
      description: "AC-DC-module: 27 instances, median 20.57mm from edge",
      metric: 20.57,
      unit: "mm from edge",
      sampleSize: 27
    },
    {
      id: "placement-mod-esp32-module",
      category: "adapter",
      description: "ESP32-module: 25 instances, median 16.03mm from edge",
      metric: 16.03,
      unit: "mm from edge",
      sampleSize: 25
    },
    {
      id: "placement-mod-display",
      category: "adapter",
      description: "display: 13 instances, median 34.04mm from edge",
      metric: 34.04,
      unit: "mm from edge",
      sampleSize: 13
    },
    {
      id: "placement-mod-motor-driver",
      category: "adapter",
      description: "motor-driver: 6 instances, median 20.74mm from edge",
      metric: 20.74,
      unit: "mm from edge",
      sampleSize: 6
    }
  ];
