import { PullupPattern } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const minedPullups: PullupPattern[] = [
    {
      id: "pullup-general-10k_0603",
      busType: "general",
      resistorValue: "10K_0603",
      occurrences: 228,
      medianDistanceToMcuMm: 16.91,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Alpha_sign_control",
        "Alpha_sign_control_PIK",
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "Bottom",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "FGLF0788-01_PIK"
      ]
    },
    {
      id: "pullup-general-220^_1206",
      busType: "general",
      resistorValue: "220^_1206",
      occurrences: 56,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "21in_Digit",
        "30_inch_Segment",
        "30_inch_period",
        "PCBLF0813-0_PIK"
      ]
    },
    {
      id: "pullup-general-1.62k_0805_0.1%",
      busType: "general",
      resistorValue: "1.62K_0805_0.1%",
      occurrences: 52,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "Bottom",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "PCBLF0827-0_PIK",
        "ProSmoker_PK100",
        "Southbend_RTD_control",
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "pullup-general-1k_axial",
      busType: "general",
      resistorValue: "1K_AXIAL",
      occurrences: 46,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "pullup-general-10k_axial",
      busType: "general",
      resistorValue: "10K_AXIAL",
      occurrences: 26,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VCC",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "pullup-general-1m_0603_1%",
      busType: "general",
      resistorValue: "1M_0603_1%",
      occurrences: 25,
      medianDistanceToMcuMm: 11.57,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "DC-DC_IO_expansion_board",
        "Derived2DPCB_fixoptolocators v1",
        "Livewell Schematic",
        "PCB Design Kairos Control",
        "PCBLF0717-1_PIK",
        "PCBLF0738-0_PIK",
        "PCBLF0827-0_PIK",
        "PCB_Connectware",
        "UM0017PCB",
        "UM0017PCB_2nd_Round",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-reset-10k_0603",
      busType: "reset",
      resistorValue: "10K_0603",
      occurrences: 24,
      medianDistanceToMcuMm: 16.93,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "Bottom",
        "CarterHoffmann485DisplayAlternate",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "Livewell Schematic",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "PCBLF0759_PIK"
      ]
    },
    {
      id: "pullup-general-jumper_0805_2.5a",
      busType: "general",
      resistorValue: "JUMPER_0805_2.5A",
      occurrences: 20,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Chevy_Test_IC",
        "Derived2DPCB_fixoptolocators v1",
        "ESP32_Programming_board",
        "LCD_Control",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0717-1_PIK",
        "PCBLF0759_PIK",
        "PCB_Connectware",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "Quantum_NXP_Programmer"
      ]
    },
    {
      id: "pullup-i2c-10k_0603",
      busType: "i2c",
      resistorValue: "10K_0603",
      occurrences: 19,
      medianDistanceToMcuMm: 32.1,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Handle_Sensor",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0690-1_Panel",
        "PCBLF0759_PIK",
        "ProSmoker_PK100",
        "Quantum_NXP_Programmer"
      ]
    },
    {
      id: "pullup-reset-1.2k_0603",
      busType: "reset",
      resistorValue: "1.2K_0603",
      occurrences: 18,
      medianDistanceToMcuMm: 12.51,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Bottom",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0827-0_PIK",
        "ProSmoker_PK100",
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "pullup-general-6.34k_0805",
      busType: "general",
      resistorValue: "6.34K_0805",
      occurrences: 18,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "PCBLF0714-1_PIK",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "pullup-i2c-100k_0603",
      busType: "i2c",
      resistorValue: "100K_0603",
      occurrences: 17,
      medianDistanceToMcuMm: 31.05,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "LCD_Control",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0717-1_PIK",
        "PCBLF0827-0_PIK",
        "PCB_Connectware",
        "Pitts_LCD_Faceplate",
        "TOP"
      ]
    },
    {
      id: "pullup-general-1k_0603",
      busType: "general",
      resistorValue: "1K_0603",
      occurrences: 17,
      medianDistanceToMcuMm: 11.65,
      placementNote: "moderate distance from MCU",
      powerNet: "+5V",
      sourceDesigns: [
        "Alpha_sign_control_PIK",
        "FGLF0788-01_PIK",
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment",
        "PCBLF0706-1_PIK"
      ]
    },
    {
      id: "pullup-chip-select-10k_0603",
      busType: "chip-select",
      resistorValue: "10K_0603",
      occurrences: 16,
      medianDistanceToMcuMm: 11.83,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Bottom",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0759_PIK",
        "PCBLF0827-0_PIK",
        "Quantum_NXP_Programmer"
      ]
    },
    {
      id: "pullup-general-100k_0603",
      busType: "general",
      resistorValue: "100K_0603",
      occurrences: 15,
      medianDistanceToMcuMm: 55.86,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "SMBus_Auto-Disconnect",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-general-ferrite_330^_0805",
      busType: "general",
      resistorValue: "FERRITE_330^_0805",
      occurrences: 14,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCB TI TOF Serial",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-general-75^_0805",
      busType: "general",
      resistorValue: "75^_0805",
      occurrences: 13,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "Derived2DPCB_fixoptolocators v1",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-general-jumper_1206_1/4w",
      busType: "general",
      resistorValue: "JUMPER_1206_1/4W",
      occurrences: 13,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "Chevy_Test_IC",
        "RD-A-16920",
        "RD-A-17012",
        "RD-A-17013",
        "RD-A-17014",
        "RD-A-17356",
        "STLink_Adapter"
      ]
    },
    {
      id: "pullup-spi-10k_0603",
      busType: "spi",
      resistorValue: "10K_0603",
      occurrences: 12,
      medianDistanceToMcuMm: 30.49,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "LCD_Control",
        "Pitts_LCD_Faceplate",
        "ProSmoker_PK100"
      ]
    },
    {
      id: "pullup-general-jumper_0805",
      busType: "general",
      resistorValue: "JUMPER_0805",
      occurrences: 11,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0717-1_PIK",
        "PCB_Connectware",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-general-1.62k_0805_1%",
      busType: "general",
      resistorValue: "1.62K_0805_1%",
      occurrences: 11,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0717-1_PIK",
        "PCB_Connectware",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "pullup-general-27k_0805_0.125w",
      busType: "general",
      resistorValue: "27K_0805_0.125W",
      occurrences: 9,
      medianDistanceToMcuMm: 41.59,
      placementNote: "near peripheral",
      powerNet: "+5V",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "PCBLF0752-0_PIK"
      ]
    },
    {
      id: "pullup-general-10k_0805_1%",
      busType: "general",
      resistorValue: "10K_0805_1%",
      occurrences: 9,
      medianDistanceToMcuMm: 27.0,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "HDMI_Display",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0717-1_PIK",
        "PCB_Connectware",
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-150^_0603",
      busType: "general",
      resistorValue: "150^_0603",
      occurrences: 9,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "pullup-general-3306f-1-103",
      busType: "general",
      resistorValue: "3306F-1-103",
      occurrences: 8,
      medianDistanceToMcuMm: 33.92,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "AllInOne test board",
        "BGW_Fan_Control_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control"
      ]
    },
    {
      id: "pullup-chip-select-100k_0603",
      busType: "chip-select",
      resistorValue: "100K_0603",
      occurrences: 8,
      medianDistanceToMcuMm: 58.69,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-i2c-8.2k",
      busType: "i2c",
      resistorValue: "8.2k",
      occurrences: 8,
      medianDistanceToMcuMm: 41.7,
      placementNote: "near peripheral",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "pullup-general-180^_0603",
      busType: "general",
      resistorValue: "180^_0603",
      occurrences: 8,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0759_PIK",
        "Quantum_NXP_Programmer"
      ]
    },
    {
      id: "pullup-general-2.7k_0603",
      busType: "general",
      resistorValue: "2.7K_0603",
      occurrences: 7,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "12_inch_CD_Timer_Control",
        "DC-DC_IO_expansion_board",
        "PCBLF0738-0_PIK",
        "SMT_Control_Board"
      ]
    },
    {
      id: "pullup-general-2.7k_5w_fusible",
      busType: "general",
      resistorValue: "2.7K_5W_FUSIBLE",
      occurrences: 7,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "7_Switch_Opto"
      ]
    },
    {
      id: "pullup-spi-27k_0805_0.125w",
      busType: "spi",
      resistorValue: "27K_0805_0.125W",
      occurrences: 6,
      medianDistanceToMcuMm: 45.33,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "PCBLF0752-0_PIK"
      ]
    },
    {
      id: "pullup-reset-47k_0603",
      busType: "reset",
      resistorValue: "47K_0603",
      occurrences: 6,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCB TI TOF Serial",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-general-1k_0805_0.1%",
      busType: "general",
      resistorValue: "1K_0805_0.1%",
      occurrences: 6,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "pullup-i2c-27k_0805_0.125w",
      busType: "i2c",
      resistorValue: "27K_0805_0.125W",
      occurrences: 6,
      medianDistanceToMcuMm: 36.87,
      placementNote: "near peripheral",
      powerNet: "+5V",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "pullup-general-100k",
      busType: "general",
      resistorValue: "100k",
      occurrences: 6,
      medianDistanceToMcuMm: 31.92,
      placementNote: "near peripheral",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "pullup-general-18.7k_0603",
      busType: "general",
      resistorValue: "18.7K_0603",
      occurrences: 6,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "12V_CHECK",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "pullup-reset-1k_0603",
      busType: "reset",
      resistorValue: "1K_0603",
      occurrences: 5,
      medianDistanceToMcuMm: 15.19,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "Alpha_sign_control",
        "Main_Board",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "pullup-chip-select-10k_0805_1%",
      busType: "chip-select",
      resistorValue: "10K_0805_1%",
      occurrences: 5,
      medianDistanceToMcuMm: 7.5,
      placementNote: "near MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0717-1_PIK",
        "PCB_Connectware"
      ]
    },
    {
      id: "pullup-general-680^_2512",
      busType: "general",
      resistorValue: "680^_2512",
      occurrences: 5,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+36V",
      sourceDesigns: [
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original"
      ]
    },
    {
      id: "pullup-general-53.6k_0603",
      busType: "general",
      resistorValue: "53.6K_0603",
      occurrences: 5,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment",
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-jumper_0603_1/10w",
      busType: "general",
      resistorValue: "JUMPER_0603_1/10W",
      occurrences: 5,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "RG0026_replacement",
        "TOP"
      ]
    },
    {
      id: "pullup-general-100k_axial",
      busType: "general",
      resistorValue: "100K_AXIAL",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "7_Switch_Opto",
        "PBB080"
      ]
    },
    {
      id: "pullup-spi-jumper_0603_1/10w",
      busType: "spi",
      resistorValue: "JUMPER_0603_1/10W",
      occurrences: 4,
      medianDistanceToMcuMm: 65.21,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "All-In-One_Schematic"
      ]
    },
    {
      id: "pullup-general-1.2k_0603",
      busType: "general",
      resistorValue: "1.2K_0603",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "ESP32_LCD_Design_Touch",
        "ESP32_LCD_PCB",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "pullup-general-4.7k_0603",
      busType: "general",
      resistorValue: "4.7K_0603",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VCC",
      sourceDesigns: [
        "Handle_Sensor",
        "PCBLF0690-1_Panel",
        "PCBLF0717-1_PIK",
        "PCB_Connectware"
      ]
    },
    {
      id: "pullup-general-470k",
      busType: "general",
      resistorValue: "470k",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "pullup-chip-select-100k",
      busType: "chip-select",
      resistorValue: "100k",
      occurrences: 4,
      medianDistanceToMcuMm: 14.27,
      placementNote: "moderate distance from MCU",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "pullup-reset-100k",
      busType: "reset",
      resistorValue: "100k",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB"
      ]
    },
    {
      id: "pullup-general-270^_0805",
      busType: "general",
      resistorValue: "270^_0805",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "pullup-general-1k_1206",
      busType: "general",
      resistorValue: "1K_1206",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+11V",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "pullup-uart-100k_0603",
      busType: "uart",
      resistorValue: "100K_0603",
      occurrences: 4,
      medianDistanceToMcuMm: 41.48,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "pullup-general-1.2k_0805",
      busType: "general",
      resistorValue: "1.2K_0805",
      occurrences: 4,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-3.3k_0805_1%",
      busType: "general",
      resistorValue: "3.3K_0805_1%",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "PCBLF0706-1_PIK"
      ]
    },
    {
      id: "pullup-interrupt-1m_0603_1%",
      busType: "interrupt",
      resistorValue: "1M_0603_1%",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V_ESP",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "LCD_Control",
        "Pitts_LCD_Faceplate"
      ]
    },
    {
      id: "pullup-general-68k_0603",
      busType: "general",
      resistorValue: "68K_0603",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "DC-DC_IO_expansion_board",
        "ESP32_Programming_board",
        "PCBLF0738-0_PIK"
      ]
    },
    {
      id: "pullup-rs485-4.7k_0805_1%_0.125w",
      busType: "rs485",
      resistorValue: "4.7K_0805_1%_0.125W",
      occurrences: 3,
      medianDistanceToMcuMm: 19.78,
      placementNote: "moderate distance from MCU",
      powerNet: "+5V",
      sourceDesigns: [
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original"
      ]
    },
    {
      id: "pullup-general-4.7k_0805_1%_0.125w",
      busType: "general",
      resistorValue: "4.7K_0805_1%_0.125W",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original"
      ]
    },
    {
      id: "pullup-spi-1.2k_0603",
      busType: "spi",
      resistorValue: "1.2K_0603",
      occurrences: 3,
      medianDistanceToMcuMm: 8.69,
      placementNote: "near MCU",
      powerNet: "+5V",
      sourceDesigns: [
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original"
      ]
    },
    {
      id: "pullup-general-75k_0603",
      busType: "general",
      resistorValue: "75K_0603",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "3.3V_CHECK",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "pullup-general-100^_0603",
      busType: "general",
      resistorValue: "100^_0603",
      occurrences: 3,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "pullup-general-mfr-25fbf52-191r",
      busType: "general",
      resistorValue: "MFR-25FBF52-191R",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+68V",
      sourceDesigns: [
        "520-5047(DPS005)",
        "8345(WDP3211A)"
      ]
    },
    {
      id: "pullup-interrupt-1k_axial",
      busType: "interrupt",
      resistorValue: "1K_AXIAL",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VCC",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "pullup-uart-10k_0603",
      busType: "uart",
      resistorValue: "10K_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 119.55,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "CarterHoffmann485DisplayAlternate",
        "PCBLF0714-1_PIK"
      ]
    },
    {
      id: "pullup-general-10m_0603",
      busType: "general",
      resistorValue: "10M_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 6.19,
      placementNote: "near MCU",
      powerNet: "+3.3V_BLE",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "pullup-reset-10k",
      busType: "reset",
      resistorValue: "10k",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "3.3V",
      sourceDesigns: [
        "ESP32_LoRa_1_Channel_Gateway"
      ]
    },
    {
      id: "pullup-i2c-2.2k",
      busType: "i2c",
      resistorValue: "2.2k",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "3.3V",
      sourceDesigns: [
        "ESP32_LoRa_1_Channel_Gateway"
      ]
    },
    {
      id: "pullup-i2c-4.7k_0603",
      busType: "i2c",
      resistorValue: "4.7K_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Field Updater"
      ]
    },
    {
      id: "pullup-general-1m",
      busType: "general",
      resistorValue: "1M",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VDD",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "pullup-general-22k_0603",
      busType: "general",
      resistorValue: "22K_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "PCBLF0827-0_PIK"
      ]
    },
    {
      id: "pullup-spi-100k_0603",
      busType: "spi",
      resistorValue: "100K_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 42.01,
      placementNote: "near peripheral",
      powerNet: "+3.3V",
      sourceDesigns: [
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "pullup-i2c-1m_0603_1%",
      busType: "i2c",
      resistorValue: "1M_0603_1%",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "VCC",
      sourceDesigns: [
        "SMBus_Auto-Disconnect"
      ]
    },
    {
      id: "pullup-general-825k_0805_1%",
      busType: "general",
      resistorValue: "825K_0805_1%",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+24V",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-140k_0603",
      busType: "general",
      resistorValue: "140K_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-4.7k_0805_5%_0.125w",
      busType: "general",
      resistorValue: "4.7K_0805_5%_0.125W",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+24V",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-reset-10k_0805_1%",
      busType: "reset",
      resistorValue: "10K_0805_1%",
      occurrences: 2,
      medianDistanceToMcuMm: 13.09,
      placementNote: "moderate distance from MCU",
      powerNet: "+3.3V",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "pullup-general-5m_0603",
      busType: "general",
      resistorValue: "5M_0603",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+5V",
      sourceDesigns: [
        "UM0017PCB",
        "UM0017PCB_2nd_Round"
      ]
    },
    {
      id: "pullup-general-470^_axial",
      busType: "general",
      resistorValue: "470^_AXIAL",
      occurrences: 2,
      medianDistanceToMcuMm: 0,
      placementNote: "no MCU distance data",
      powerNet: "+12V",
      sourceDesigns: [
        "Williams_Dual_Opto"
      ]
    }
  ];
