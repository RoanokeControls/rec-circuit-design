import { LessonLearned } from "../types/index.js";

// ── Hard-won knowledge from real projects ──
// This is the most valuable file in the server.
// Every entry here prevents a future engineer from repeating a mistake.

export const lessonsLearned: LessonLearned[] = [
  {
    id: "ll-001",
    title: "ESP32 WiFi drops with distant decoupling",
    category: "design-error",
    description: "WiFi TX power drops and connection instability when bulk decoupling cap is too far from VDD pins",
    whatHappened: "Asset tracker rev A had intermittent WiFi disconnects under load. Signal strength measured 8dBm below expected.",
    rootCause: "10uF bulk capacitor was placed 25mm from ESP32 VDD3P3 pins due to layout constraints. High-frequency switching noise on the 3.3V rail during WiFi TX.",
    fix: "Moved 10uF bulk cap within 10mm of VDD pins. Added second 100nF directly at VDD3P3_RTC pin. Rev B fixed the issue completely.",
    affectedComponents: ["ESP32-S3-WROOM-1"],
    affectedCircuits: ["esp32-s3-base"],
    sourceProject: "PROJ-2024-017 Asset Tracker",
    severity: "major",
    status: "approved",
    addedDate: "2026-02-28",
  },

  // TODO: Add your lessons here
  // Brain dump format works — describe what happened, why, and what fixed it.
  // Engineers can add these via the add-lesson-learned tool.
];
