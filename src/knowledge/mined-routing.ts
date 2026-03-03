import { RoutingPractice } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const minedRouting: RoutingPractice[] = [
    {
      id: "routing-trace-12v",
      category: "trace-width",
      netName: "+12V",
      description: "+12V trace width across 1589 segments",
      metric: 1.016,
      unit: "mm",
      sampleSize: 1589,
      percentiles: {
        p25: 0.635,
        p50: 1.016,
        p75: 1.905,
        p90: 2.54
      }
    },
    {
      id: "routing-trace-24v",
      category: "trace-width",
      netName: "+24V",
      description: "+24V trace width across 378 segments",
      metric: 1.27,
      unit: "mm",
      sampleSize: 378,
      percentiles: {
        p25: 1.016,
        p50: 1.27,
        p75: 1.905,
        p90: 2.54
      }
    },
    {
      id: "routing-trace-33v",
      category: "trace-width",
      netName: "+3.3V",
      description: "+3.3V trace width across 8061 segments",
      metric: 0.635,
      unit: "mm",
      sampleSize: 8061,
      percentiles: {
        p25: 0.508,
        p50: 0.635,
        p75: 0.8128,
        p90: 1.016
      }
    },
    {
      id: "routing-trace-5v",
      category: "trace-width",
      netName: "+5V",
      description: "+5V trace width across 5703 segments",
      metric: 0.762,
      unit: "mm",
      sampleSize: 5703,
      percentiles: {
        p25: 0.508,
        p50: 0.762,
        p75: 1.016,
        p90: 1.27
      }
    },
    {
      id: "routing-trace-gnd",
      category: "trace-width",
      netName: "GND",
      description: "GND trace width across 22985 segments",
      metric: 0.762,
      unit: "mm",
      sampleSize: 22985,
      percentiles: {
        p25: 0.508,
        p50: 0.762,
        p75: 1.016,
        p90: 1.27
      }
    },
    {
      id: "routing-trace-signal",
      category: "trace-width",
      netName: "signal",
      description: "Signal trace width across 284627 segments",
      metric: 0.1524,
      unit: "mm",
      sampleSize: 284627,
      percentiles: {
        p25: 0.0508,
        p50: 0.1524,
        p75: 0.381,
        p90: 0.762
      }
    },
    {
      id: "routing-via-stitching",
      category: "via-stitching",
      netName: "GND",
      description: "GND via stitching density across 104 boards",
      metric: 0.2,
      unit: "vias/cm²",
      sampleSize: 104,
      percentiles: {
        p25: 0.1,
        p50: 0.2,
        p75: 0.31,
        p90: 0.87
      }
    },
    {
      id: "routing-netclass-default",
      category: "net-class",
      netName: "default",
      description: "Net class 'default' used in 205 boards",
      metric: 205,
      unit: "boards",
      sampleSize: 205
    },
    {
      id: "routing-netclass-ground",
      category: "net-class",
      netName: "Ground",
      description: "Net class 'Ground' used in 2 boards",
      metric: 2,
      unit: "boards",
      sampleSize: 2
    },
    {
      id: "routing-netclass-power",
      category: "net-class",
      netName: "power",
      description: "Net class 'power' used in 1 boards",
      metric: 1,
      unit: "boards",
      sampleSize: 1
    }
  ];
