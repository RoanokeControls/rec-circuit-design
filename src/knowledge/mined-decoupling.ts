import { DecouplingPattern } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const minedDecoupling: DecouplingPattern[] = [
    {
      id: "decoupling-mm74hc595mx",
      icValue: "MM74HC595MX",
      icCategory: "interface",
      occurrences: 43,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 41.91,
          p25Mm: 15.24,
          p75Mm: 60.73,
          count: 220
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 27.73,
          p25Mm: 16.26,
          p75Mm: 61.97,
          count: 138
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 22.36,
          p25Mm: 15.41,
          p75Mm: 35.99,
          count: 96
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 70.39,
          p25Mm: 44.63,
          p75Mm: 97.94,
          count: 44
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 23.79,
          p25Mm: 18.09,
          p75Mm: 36.97,
          count: 43
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603",
          values: [
            "0.1UF_0603"
          ],
          medianDistanceMm: 76.05,
          p25Mm: 66.76,
          p75Mm: 89.08,
          count: 20
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 52.17,
          p25Mm: 40.29,
          p75Mm: 58.12,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_25V",
          values: [
            "22UF_1206_25V"
          ],
          medianDistanceMm: 160.99,
          p25Mm: 156.41,
          p75Mm: 169.04,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 16.63,
          p25Mm: 12.19,
          p75Mm: 16.63,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 62.22,
          p25Mm: 48.31,
          p75Mm: 107.47,
          count: 4
        }
      ],
      designRule: "Caps for MM74HC595MX tend to be distant (35.94mm median) — consider closer placement",
      sourceDesigns: [
        "Alpha_Digit",
        "Alpha_Digit_PIK",
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "CarterHoffmann485DisplayAlternate",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "Operator_Display",
        "Operator_Display_PIK",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "SMT_Digit_Test",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "decoupling-moc3052sm",
      icValue: "MOC3052SM",
      icCategory: "driver",
      occurrences: 35,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 71.36,
          p25Mm: 46.75,
          p75Mm: 92.97,
          count: 658
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 74.58,
          p25Mm: 45.23,
          p75Mm: 115.6,
          count: 100
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 48.18,
          p25Mm: 42.47,
          p75Mm: 52.29,
          count: 96
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 52.21,
          p25Mm: 38.79,
          p75Mm: 80.64,
          count: 38
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 62.99,
          p25Mm: 41.16,
          p75Mm: 80.76,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 29.91,
          p25Mm: 27.5,
          p75Mm: 33.38,
          count: 24
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 84.95,
          p25Mm: 69.94,
          p75Mm: 94.7,
          count: 19
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 81.22,
          p25Mm: 74.85,
          p75Mm: 86.33,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 86.83,
          p25Mm: 80.52,
          p75Mm: 87.22,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 44.14,
          p25Mm: 44.14,
          p75Mm: 44.14,
          count: 3
        }
      ],
      designRule: "Caps for MOC3052SM tend to be distant (63.5mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Bottom",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "PCBLF0827-0_PIK",
        "ProSmoker_PK100",
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "decoupling-moc3063sr2m",
      icValue: "MOC3063SR2M",
      icCategory: "driver",
      occurrences: 33,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 57.61,
          p25Mm: 35.21,
          p75Mm: 95.07,
          count: 307
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 37.06,
          p25Mm: 21.25,
          p75Mm: 52.51,
          count: 118
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 47.94,
          p25Mm: 28.86,
          p75Mm: 70.34,
          count: 77
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 28.66,
          p25Mm: 19.06,
          p75Mm: 68.01,
          count: 54
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 82.24,
          p25Mm: 43.96,
          p75Mm: 117.53,
          count: 25
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 41.92,
          p25Mm: 20.18,
          p75Mm: 43.67,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 31.78,
          p25Mm: 31.78,
          p75Mm: 31.78,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 68.36,
          p25Mm: 68.36,
          p75Mm: 68.66,
          count: 3
        }
      ],
      designRule: "Caps for MOC3063SR2M tend to be distant (48.13mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "decoupling-ncp1117st33t3g",
      icValue: "NCP1117ST33T3G",
      icCategory: "regulator",
      occurrences: 27,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 62.74,
          p25Mm: 30.68,
          p75Mm: 99.04,
          count: 205
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 30.71,
          p25Mm: 16.42,
          p75Mm: 50.77,
          count: 97
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 115.35,
          p25Mm: 81.01,
          p75Mm: 136.22,
          count: 43
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 34.76,
          p25Mm: 15.18,
          p75Mm: 47.71,
          count: 35
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 6.1,
          p25Mm: 5.31,
          p75Mm: 29.38,
          count: 31
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 49.13,
          p25Mm: 14.05,
          p75Mm: 71.24,
          count: 25
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 7.94,
          p25Mm: 4.2,
          p75Mm: 36.91,
          count: 19
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 89.49,
          p25Mm: 39.86,
          p75Mm: 132.48,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 7.3,
          p25Mm: 4.95,
          p75Mm: 7.85,
          count: 17
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 25.14,
          p25Mm: 17.73,
          p75Mm: 47.68,
          count: 17
        }
      ],
      designRule: "Caps for NCP1117ST33T3G tend to be distant (45.51mm median) — consider closer placement",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Alpha_Digit",
        "Alpha_sign_control",
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "CarterHoffmann485DisplayAlternate",
        "Chevy_Test_IC",
        "Clamshell_Grill",
        "Derived2DPCB_fixoptolocators v1",
        "HDMI_Display",
        "LCD_Control",
        "Livewell Schematic",
        "Operator_Display",
        "PCBLF0759_PIK",
        "Pitts_LCD_Faceplate",
        "Quantum_NXP_Programmer",
        "RG0026_Adapter"
      ]
    },
    {
      id: "decoupling-opamp_mcp6051-e-ot_slotted",
      icValue: "OPAMP_MCP6051-E/OT_SLOTTED",
      icCategory: "other",
      occurrences: 18,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 25.33,
          p25Mm: 10.02,
          p75Mm: 60.36,
          count: 284
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 34.38,
          p25Mm: 25.63,
          p75Mm: 43.17,
          count: 36
        }
      ],
      designRule: "Caps for OPAMP_MCP6051-E/OT_SLOTTED tend to be distant (26.97mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-pic18f26k22-i-ss",
      icValue: "PIC18F26K22-I/SS",
      icCategory: "mcu",
      occurrences: 15,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 17.6,
          p25Mm: 13.22,
          p75Mm: 22.42,
          count: 107
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 34.92,
          p25Mm: 17.05,
          p75Mm: 72.14,
          count: 106
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 62.87,
          p25Mm: 38.51,
          p75Mm: 86.13,
          count: 24
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 52.82,
          p25Mm: 33.18,
          p75Mm: 80.28,
          count: 19
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 32.13,
          p25Mm: 12.43,
          p75Mm: 36.67,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 20.19,
          p25Mm: 7.09,
          p75Mm: 68.22,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 81.38,
          p25Mm: 19.72,
          p75Mm: 84.9,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 33.77,
          p25Mm: 33.57,
          p75Mm: 33.77,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 72.11,
          p25Mm: 72.11,
          p75Mm: 72.11,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 58.66,
          p25Mm: 42.37,
          p75Mm: 58.66,
          count: 2
        }
      ],
      designRule: "Caps for PIC18F26K22-I/SS tend to be distant (25.01mm median) — consider closer placement",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Alpha_sign_control",
        "Alpha_sign_control_PIK",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "FGLF0788-01_PIK",
        "PCBLF0706-1_PIK",
        "PCBLF0827-0_PIK",
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "decoupling-fod817asd",
      icValue: "FOD817ASD",
      icCategory: "other",
      occurrences: 15,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 54.99,
          p25Mm: 28.51,
          p75Mm: 71.05,
          count: 156
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 37.46,
          p25Mm: 26.47,
          p75Mm: 43.89,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 63.87,
          p25Mm: 54.87,
          p75Mm: 72.53,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 31.36,
          p25Mm: 18.61,
          p75Mm: 39.49,
          count: 30
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 33.13,
          p25Mm: 22.02,
          p75Mm: 38.03,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 77.48,
          p25Mm: 76.15,
          p75Mm: 81.6,
          count: 21
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 31.17,
          p25Mm: 20.29,
          p75Mm: 33.49,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 36.35,
          p25Mm: 15.56,
          p75Mm: 49.64,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 49.94,
          p25Mm: 47.36,
          p75Mm: 49.94,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 6.13,
          p25Mm: 5.18,
          p75Mm: 6.13,
          count: 3
        }
      ],
      designRule: "Caps for FOD817ASD tend to be distant (46.3mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "PCBLF0752-0_PIK"
      ]
    },
    {
      id: "decoupling-w25q32jwbyiqtr",
      icValue: "W25Q32JWBYIQTR",
      icCategory: "other",
      occurrences: 14,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 33.12,
          p25Mm: 14.3,
          p75Mm: 72.26,
          count: 269
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 18.03,
          p25Mm: 7.78,
          p75Mm: 29.17,
          count: 64
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 114.76,
          p25Mm: 88.84,
          p75Mm: 129.42,
          count: 35
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 24.47,
          p25Mm: 5.84,
          p75Mm: 34.56,
          count: 27
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 19.6,
          p25Mm: 18.26,
          p75Mm: 44.42,
          count: 22
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 36.39,
          p25Mm: 26.58,
          p75Mm: 57.45,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 19.69,
          p25Mm: 13.76,
          p75Mm: 29.4,
          count: 15
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 59.29,
          p25Mm: 26.06,
          p75Mm: 135.94,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 25.65,
          p25Mm: 25.02,
          p75Mm: 73.51,
          count: 11
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 30.41,
          p25Mm: 27.82,
          p75Mm: 35.46,
          count: 7
        }
      ],
      designRule: "Caps for W25Q32JWBYIQTR tend to be distant (29.61mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Derived2DPCB_fixoptolocators v1",
        "LCD_Control",
        "PCB Design Kairos Control",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0827-0_PIK",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "Pitts_LCD_Faceplate"
      ]
    },
    {
      id: "decoupling-ncp1117st33t3gsot-223",
      icValue: "NCP1117ST33T3GSOT-223",
      icCategory: "regulator",
      occurrences: 14,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 33.78,
          p25Mm: 17.13,
          p75Mm: 43.94,
          count: 84
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 59.63,
          p25Mm: 31.46,
          p75Mm: 103.73,
          count: 75
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 44.97,
          p25Mm: 27.89,
          p75Mm: 66.13,
          count: 41
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 78.23,
          p25Mm: 72.18,
          p75Mm: 85.07,
          count: 32
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 12.04,
          p25Mm: 10.61,
          p75Mm: 15.56,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 4.86,
          p25Mm: 3.16,
          p75Mm: 39.53,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 98.29,
          p25Mm: 42.41,
          p75Mm: 115.67,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 79.37,
          p25Mm: 5.84,
          p75Mm: 91.56,
          count: 10
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 5.35,
          p25Mm: 4.83,
          p75Mm: 8.48,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 94.45,
          p25Mm: 89.09,
          p75Mm: 94.45,
          count: 8
        }
      ],
      designRule: "Caps for NCP1117ST33T3GSOT-223 tend to be distant (43.94mm median) — consider closer placement",
      sourceDesigns: [
        "Alpha_Digit_PIK",
        "Alpha_sign_control_PIK",
        "Clamshell_Grill_PIK",
        "FGLF0788-01_PIK",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "Operator_Display_PIK",
        "PCBLF0706-1_PIK",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "PCBLF0827-0_PIK"
      ]
    },
    {
      id: "decoupling-mc74hc08adtr2g",
      icValue: "MC74HC08ADTR2G",
      icCategory: "other",
      occurrences: 12,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 38.24,
          p25Mm: 15.32,
          p75Mm: 66.63,
          count: 99
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 37.19,
          p25Mm: 21.46,
          p75Mm: 86.07,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 104.43,
          p25Mm: 54.48,
          p75Mm: 197.1,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 27.48,
          p25Mm: 24.06,
          p75Mm: 31.54,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 8.78,
          p25Mm: 7.79,
          p75Mm: 16.5,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 26.29,
          p25Mm: 24.27,
          p75Mm: 26.29,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 41.37,
          p25Mm: 37.64,
          p75Mm: 41.37,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 202.07,
          p25Mm: 202.07,
          p75Mm: 202.07,
          count: 1
        }
      ],
      designRule: "Caps for MC74HC08ADTR2G tend to be distant (37.62mm median) — consider closer placement",
      sourceDesigns: [
        "Alpha_Digit",
        "Alpha_Digit_PIK",
        "DISDMD",
        "Operator_Display",
        "Operator_Display_PIK",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "SMT_Digit_Test"
      ]
    },
    {
      id: "decoupling-lm317dcyrtexas_instruments_lm317dcyr_0_0",
      icValue: "LM317DCYRTEXAS_INSTRUMENTS_LM317DCYR_0_0",
      icCategory: "regulator",
      occurrences: 12,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 24.29,
          p25Mm: 12.49,
          p75Mm: 32.99,
          count: 118
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 5.36,
          p25Mm: 2.66,
          p75Mm: 65.72,
          count: 20
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 5.36,
          p25Mm: 2.82,
          p75Mm: 8.51,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 35.3,
          p25Mm: 25.07,
          p75Mm: 36.83,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 2.7,
          p25Mm: 2.65,
          p75Mm: 2.7,
          count: 2
        }
      ],
      designRule: "Caps for LM317DCYRTEXAS_INSTRUMENTS_LM317DCYR_0_0 tend to be distant (20.65mm median) — consider closer placement",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0717-1_PIK",
        "PCB_Connectware",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK",
        "RG0026_Adapter_RGSM0010"
      ]
    },
    {
      id: "decoupling-ft232rl-reel",
      icValue: "FT232RL-REEL",
      icCategory: "interface",
      occurrences: 11,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 20.43,
          p25Mm: 11.63,
          p75Mm: 25.48,
          count: 139
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 14.05,
          p25Mm: 10.41,
          p75Mm: 16.37,
          count: 27
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 76.75,
          p25Mm: 44.44,
          p75Mm: 98.76,
          count: 21
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 30.57,
          p25Mm: 14.56,
          p75Mm: 37.05,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 77.34,
          p25Mm: 33.71,
          p75Mm: 77.34,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 18.21,
          p25Mm: 18.21,
          p75Mm: 18.21,
          count: 1
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 14.53,
          p25Mm: 14.53,
          p75Mm: 14.53,
          count: 1
        }
      ],
      designRule: "Caps for FT232RL-REEL tend to be distant (18.95mm median) — consider closer placement",
      sourceDesigns: [
        "Chevy_Test_IC",
        "ESP32_Programming_board",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0759_PIK",
        "Quantum_NXP_Programmer",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "decoupling-mp6513l",
      icValue: "MP6513L",
      icCategory: "other",
      occurrences: 11,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 31.62,
          p25Mm: 18.25,
          p75Mm: 51.09,
          count: 204
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 42.63,
          p25Mm: 36.32,
          p75Mm: 68.38,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 47.81,
          p25Mm: 33.22,
          p75Mm: 53.8,
          count: 23
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 24.36,
          p25Mm: 19.5,
          p75Mm: 26.79,
          count: 20
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 64.19,
          p25Mm: 23.17,
          p75Mm: 64.19,
          count: 14
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 41.7,
          p25Mm: 30.85,
          p75Mm: 75.19,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 46.85,
          p25Mm: 31.57,
          p75Mm: 50.03,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "22UF_0805",
          values: [
            "22UF_0805"
          ],
          medianDistanceMm: 39.29,
          p25Mm: 37.66,
          p75Mm: 53.31,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 58.33,
          p25Mm: 37.63,
          p75Mm: 59.37,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 86.16,
          p25Mm: 84.65,
          p75Mm: 86.16,
          count: 4
        }
      ],
      designRule: "Caps for MP6513L tend to be distant (36.32mm median) — consider closer placement",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "atsamd21_only"
      ]
    },
    {
      id: "decoupling-stm32g030f6p6",
      icValue: "STM32G030F6P6",
      icCategory: "mcu",
      occurrences: 10,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 5.69,
          p25Mm: 3.03,
          p75Mm: 20.58,
          count: 62
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 32.89,
          p25Mm: 17.8,
          p75Mm: 51.96,
          count: 36
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 44.02,
          p25Mm: 37.33,
          p75Mm: 54.21,
          count: 20
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 29.66,
          p25Mm: 17.94,
          p75Mm: 35.58,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 38.81,
          p25Mm: 25.18,
          p75Mm: 38.81,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603",
          values: [
            "0.1UF_0603"
          ],
          medianDistanceMm: 66.89,
          p25Mm: 65.71,
          p75Mm: 69.99,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "10UF_0805",
          values: [
            "10UF_0805"
          ],
          medianDistanceMm: 20.01,
          p25Mm: 18.17,
          p75Mm: 20.01,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 44.87,
          p25Mm: 37.23,
          p75Mm: 49.92,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 30.64,
          p25Mm: 25.09,
          p75Mm: 39.24,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_25V",
          values: [
            "22UF_1206_25V"
          ],
          medianDistanceMm: 154.66,
          p25Mm: 146.97,
          p75Mm: 154.66,
          count: 2
        }
      ],
      designRule: "Caps for STM32G030F6P6 tend to be distant (24.51mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "CarterHoffmann485DisplayAlternate",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "Livewell Schematic",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "UM0017PCB",
        "UM0017PCB_2nd_Round"
      ]
    },
    {
      id: "decoupling-sa56-21srwa",
      icValue: "SA56-21SRWA",
      icCategory: "other",
      occurrences: 10,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 20.48,
          p25Mm: 13.33,
          p75Mm: 33.49,
          count: 47
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 38.85,
          p25Mm: 31.05,
          p75Mm: 54.26,
          count: 19
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 14.4,
          p25Mm: 14.4,
          p75Mm: 14.4,
          count: 1
        }
      ],
      designRule: "Caps for SA56-21SRWA tend to be distant (29.66mm median) — consider closer placement",
      sourceDesigns: [
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "PCBLF0714-1_PIK",
        "TouchMZ_In_Out_Board"
      ]
    },
    {
      id: "decoupling-sn74lvc245apwr",
      icValue: "SN74LVC245APWR",
      icCategory: "interface",
      occurrences: 10,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 58.08,
          p25Mm: 32.61,
          p75Mm: 98.62,
          count: 160
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_25V",
          values: [
            "22UF_1206_25V"
          ],
          medianDistanceMm: 94.41,
          p25Mm: 59.55,
          p75Mm: 117.09,
          count: 28
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 123.42,
          p25Mm: 92.43,
          p75Mm: 147.81,
          count: 24
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 82.7,
          p25Mm: 44.43,
          p75Mm: 108.84,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "22UF_10V1206",
          values: [
            "22UF_10V1206"
          ],
          medianDistanceMm: 55.29,
          p25Mm: 38.28,
          p75Mm: 69.63,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 73.89,
          p25Mm: 35.54,
          p75Mm: 88.72,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0805_10%_50V",
          values: [
            "2.2UF_0805_10%_50V"
          ],
          medianDistanceMm: 106.24,
          p25Mm: 46.11,
          p75Mm: 116.1,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "1UF_0805_20%",
          values: [
            "1UF_0805_20%"
          ],
          medianDistanceMm: 39.28,
          p25Mm: 31.22,
          p75Mm: 90.56,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "18pF",
          values: [
            "18pF"
          ],
          medianDistanceMm: 49.9,
          p25Mm: 43.26,
          p75Mm: 106.0,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "3300PF_1206",
          values: [
            "3300PF_1206"
          ],
          medianDistanceMm: 111.16,
          p25Mm: 52.32,
          p75Mm: 121.0,
          count: 12
        }
      ],
      designRule: "Caps for SN74LVC245APWR tend to be distant (70.8mm median) — consider closer placement",
      sourceDesigns: [
        "HDMI_Display",
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "decoupling-lmv331idckrdck5-m",
      icValue: "LMV331IDCKRDCK5-M",
      icCategory: "other",
      occurrences: 9,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 32.8,
          p25Mm: 20.73,
          p75Mm: 50.92,
          count: 52
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 12.84,
          p25Mm: 1.83,
          p75Mm: 34.15,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 31.13,
          p25Mm: 12.09,
          p75Mm: 34.37,
          count: 17
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 52.04,
          p25Mm: 49.69,
          p75Mm: 54.63,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 7.34,
          p25Mm: 7.34,
          p75Mm: 10.96,
          count: 7
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 25.9,
          p25Mm: 11.23,
          p75Mm: 33.01,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 75.29,
          p25Mm: 75.29,
          p75Mm: 75.29,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 21.65,
          p25Mm: 21.65,
          p75Mm: 21.65,
          count: 2
        }
      ],
      designRule: "Caps for LMV331IDCKRDCK5-M tend to be distant (30.11mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-lm339an",
      icValue: "LM339AN",
      icCategory: "other",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "470PF_100V_AXIALWIDE",
          values: [
            "470PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 64.68,
          p25Mm: 48.05,
          p75Mm: 76.37,
          count: 192
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 86.69,
          p25Mm: 41.86,
          p75Mm: 139.85,
          count: 178
        },
        {
          role: "bypass",
          preferredValue: "22PF_100V_AXIALWIDE",
          values: [
            "22PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 86.74,
          p25Mm: 76.69,
          p75Mm: 94.58,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_50V_RAD",
          values: [
            "4.7UF_50V_RAD"
          ],
          medianDistanceMm: 50.65,
          p25Mm: 41.82,
          p75Mm: 51.34,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "100PF_50V_AXIALWIDE",
          values: [
            "100PF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 99.3,
          p25Mm: 86.67,
          p75Mm: 107.92,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 118.17,
          p25Mm: 100.86,
          p75Mm: 127.36,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_RAD",
          values: [
            "100UF_35V_RAD"
          ],
          medianDistanceMm: 47.89,
          p25Mm: 17.61,
          p75Mm: 47.89,
          count: 2
        }
      ],
      designRule: "Caps for LM339AN tend to be distant (71.18mm median) — consider closer placement",
      sourceDesigns: [
        "7_Switch_Opto",
        "CPU-95"
      ]
    },
    {
      id: "decoupling-ltv-847",
      icValue: "LTV-847",
      icCategory: "other",
      occurrences: 8,
      caps: [
        {
          role: "bulk",
          preferredValue: "10UF_1210",
          values: [
            "10UF_1210"
          ],
          medianDistanceMm: 141.35,
          p25Mm: 120.4,
          p75Mm: 163.35,
          count: 48
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 147.4,
          p25Mm: 126.49,
          p75Mm: 168.1,
          count: 48
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 137.89,
          p25Mm: 116.56,
          p75Mm: 160.43,
          count: 48
        }
      ],
      designRule: "Caps for LTV-847 tend to be distant (141.35mm median) — consider closer placement",
      sourceDesigns: [
        "Auto_Test_Circuit"
      ]
    },
    {
      id: "decoupling-irm-02-5mean_well_irm-02-5_0_0",
      icValue: "IRM-02-5MEAN_WELL_IRM-02-5_0_0",
      icCategory: "regulator",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 36.86,
          p25Mm: 31.19,
          p75Mm: 55.75,
          count: 41
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 44.6,
          p25Mm: 37.89,
          p75Mm: 89.62,
          count: 31
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 12.84,
          p25Mm: 8.37,
          p75Mm: 30.96,
          count: 15
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 47.26,
          p25Mm: 29.51,
          p75Mm: 54.06,
          count: 14
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 90.88,
          p25Mm: 79.02,
          p75Mm: 96.81,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 15.86,
          p25Mm: 8.82,
          p75Mm: 15.86,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 32.89,
          p25Mm: 19.53,
          p75Mm: 32.89,
          count: 2
        }
      ],
      designRule: "Caps for IRM-02-5MEAN_WELL_IRM-02-5_0_0 tend to be distant (40.84mm median) — consider closer placement",
      sourceDesigns: [
        "BGW_Fan_Control_PIK",
        "Clamshell_Grill_PIK",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "decoupling-stp16cps05ttr",
      icValue: "STP16CPS05TTR",
      icCategory: "other",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 108.22,
          p25Mm: 48.64,
          p75Mm: 168.14,
          count: 128
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 90.51,
          p25Mm: 39.15,
          p75Mm: 164.0,
          count: 64
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 140.56,
          p25Mm: 59.54,
          p75Mm: 221.77,
          count: 8
        }
      ],
      designRule: "Caps for STP16CPS05TTR tend to be distant (103.06mm median) — consider closer placement",
      sourceDesigns: [
        "DISDMD"
      ]
    },
    {
      id: "decoupling-esp32-wroom-32e",
      icValue: "ESP32-WROOM-32E",
      icCategory: "mcu",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 35.54,
          p25Mm: 18.02,
          p75Mm: 59.27,
          count: 42
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 24.41,
          p25Mm: 13.0,
          p75Mm: 31.2,
          count: 40
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 15.79,
          p25Mm: 7.34,
          p75Mm: 17.18,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 51.99,
          p25Mm: 41.19,
          p75Mm: 55.55,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 2.15,
          p25Mm: 1.81,
          p75Mm: 2.57,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 2.32,
          p25Mm: 2.32,
          p75Mm: 2.77,
          count: 10
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 50.96,
          p25Mm: 49.14,
          p75Mm: 75.13,
          count: 10
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 45.18,
          p25Mm: 41.33,
          p75Mm: 45.18,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 32.31,
          p25Mm: 15.23,
          p75Mm: 32.31,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 50.64,
          p25Mm: 38.69,
          p75Mm: 50.64,
          count: 8
        }
      ],
      designRule: "Caps for ESP32-WROOM-32E tend to be distant (33.31mm median) — consider closer placement",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "PCBLF0717-1_PIK",
        "PCB_Connectware"
      ]
    },
    {
      id: "decoupling-hp209-200g-t",
      icValue: "HP209-200G-T",
      icCategory: "other",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 57.23,
          p25Mm: 50.13,
          p75Mm: 61.92,
          count: 56
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 44.39,
          p25Mm: 10.63,
          p75Mm: 54.63,
          count: 48
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 25.64,
          p25Mm: 15.04,
          p75Mm: 29.14,
          count: 32
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 18.96,
          p25Mm: 16.17,
          p75Mm: 22.3,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 75.96,
          p25Mm: 74.86,
          p75Mm: 80.74,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 63.52,
          p25Mm: 52.69,
          p75Mm: 68.56,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 24.22,
          p25Mm: 17.3,
          p75Mm: 24.93,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 15.57,
          p25Mm: 9.04,
          p75Mm: 15.57,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 18.28,
          p25Mm: 14.14,
          p75Mm: 18.28,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "0.33F-5.5V-SUPERCAP",
          values: [
            "0.33F-5.5V-SUPERCAP"
          ],
          medianDistanceMm: 19.56,
          p25Mm: 16.13,
          p75Mm: 19.56,
          count: 8
        }
      ],
      designRule: "Caps for HP209-200G-T tend to be distant (38.96mm median) — consider closer placement",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "decoupling-a-1001sq12rd",
      icValue: "A-1001SQ12RD",
      icCategory: "other",
      occurrences: 8,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 32.37,
          p25Mm: 16.22,
          p75Mm: 56.37,
          count: 88
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 86.2,
          p25Mm: 62.89,
          p75Mm: 109.86,
          count: 16
        }
      ],
      designRule: "Caps for A-1001SQ12RD tend to be distant (41.17mm median) — consider closer placement",
      sourceDesigns: [
        "Operator_Display",
        "Operator_Display_PIK"
      ]
    },
    {
      id: "decoupling-pic18f26k22",
      icValue: "PIC18F26K22",
      icCategory: "mcu",
      occurrences: 7,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 31.41,
          p25Mm: 14.17,
          p75Mm: 90.14,
          count: 64
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 14.98,
          p25Mm: 7.62,
          p75Mm: 19.16,
          count: 42
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 86.23,
          p25Mm: 74.01,
          p75Mm: 102.4,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 55.65,
          p25Mm: 35.54,
          p75Mm: 63.94,
          count: 10
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 10.49,
          p25Mm: 9.4,
          p75Mm: 48.58,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 28.96,
          p25Mm: 27.43,
          p75Mm: 32.87,
          count: 5
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 96.29,
          p25Mm: 92.89,
          p75Mm: 96.29,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 24.02,
          p25Mm: 23.76,
          p75Mm: 24.02,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 62.37,
          p25Mm: 62.37,
          p75Mm: 62.37,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 58.42,
          p25Mm: 58.42,
          p75Mm: 58.42,
          count: 1
        }
      ],
      designRule: "Caps for PIC18F26K22 tend to be distant (24.64mm median) — consider closer placement",
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Alpha_sign_control",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "ZLF0053"
      ]
    },
    {
      id: "decoupling-soic127p1032x265-16n",
      icValue: "SOIC127P1032X265-16N",
      icCategory: "other",
      occurrences: 7,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 19.24,
          p25Mm: 10.0,
          p75Mm: 23.78,
          count: 144
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 20.49,
          p25Mm: 5.25,
          p75Mm: 24.88,
          count: 19
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 30.12,
          p25Mm: 23.27,
          p75Mm: 30.12,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 58.24,
          p25Mm: 50.41,
          p75Mm: 66.08,
          count: 3
        }
      ],
      designRule: "Caps for SOIC127P1032X265-16N tend to be distant (19.97mm median) — consider closer placement",
      sourceDesigns: [
        "Bottom",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel"
      ]
    },
    {
      id: "decoupling-pic24fj64ga30664",
      icValue: "PIC24FJ64GA30664",
      icCategory: "other",
      occurrences: 7,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 7.93,
          p25Mm: 2.86,
          p75Mm: 22.14,
          count: 144
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 10.7,
          p25Mm: 1.68,
          p75Mm: 13.59,
          count: 19
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 44.74,
          p25Mm: 11.09,
          p75Mm: 44.74,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 71.32,
          p25Mm: 63.63,
          p75Mm: 79.05,
          count: 3
        }
      ],
      designRule: "Bypass caps for PIC24FJ64GA30664 typically 5-15mm away (median: 9.82mm)",
      sourceDesigns: [
        "Bottom",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel"
      ]
    },
    {
      id: "decoupling-mcp6022-i-snsoic8-n_mc_mch-m",
      icValue: "MCP6022-I/SNSOIC8-N_MC_MCH-M",
      icCategory: "other",
      occurrences: 7,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 8.48,
          p25Mm: 3.52,
          p75Mm: 33.9,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 27.07,
          p25Mm: 5.8,
          p75Mm: 33.8,
          count: 17
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 5.95,
          p25Mm: 2.67,
          p75Mm: 5.95,
          count: 7
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 86.92,
          p25Mm: 86.92,
          p75Mm: 86.92,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 85.46,
          p25Mm: 85.46,
          p75Mm: 85.46,
          count: 4
        }
      ],
      designRule: "Caps for MCP6022-I/SNSOIC8-N_MC_MCH-M tend to be distant (24.79mm median) — consider closer placement",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-sgm3005xms",
      icValue: "SGM3005XMS",
      icCategory: "other",
      occurrences: 7,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 29.26,
          p25Mm: 6.72,
          p75Mm: 31.46,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 35.41,
          p25Mm: 30.67,
          p75Mm: 39.42,
          count: 28
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 8.25,
          p25Mm: 4.69,
          p75Mm: 27.04,
          count: 17
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 99.71,
          p25Mm: 88.29,
          p75Mm: 100.39,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 57.0,
          p25Mm: 41.8,
          p75Mm: 57.96,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 7.42,
          p25Mm: 3.54,
          p75Mm: 7.42,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 95.69,
          p25Mm: 81.62,
          p75Mm: 95.69,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 39.19,
          p25Mm: 33.09,
          p75Mm: 39.19,
          count: 7
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 78.77,
          p25Mm: 78.77,
          p75Mm: 78.77,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 59.47,
          p25Mm: 59.47,
          p75Mm: 59.47,
          count: 4
        }
      ],
      designRule: "Caps for SGM3005XMS tend to be distant (39.19mm median) — consider closer placement",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top",
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-rp2040",
      icValue: "RP2040",
      icCategory: "mcu",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 24.28,
          p25Mm: 3.28,
          p75Mm: 93.72,
          count: 138
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 12.35,
          p25Mm: 2.66,
          p75Mm: 21.18,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 128.08,
          p25Mm: 105.46,
          p75Mm: 131.24,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 7.08,
          p25Mm: 6.13,
          p75Mm: 8.13,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 34.64,
          p25Mm: 26.01,
          p75Mm: 137.03,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 47.64,
          p25Mm: 34.49,
          p75Mm: 63.75,
          count: 7
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 30.41,
          p25Mm: 25.34,
          p75Mm: 63.82,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 42.22,
          p25Mm: 42.22,
          p75Mm: 47.15,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 46.41,
          p25Mm: 33.93,
          p75Mm: 46.41,
          count: 3
        }
      ],
      designRule: "Caps for RP2040 tend to be distant (23.39mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "LCD_Control",
        "PCBLF0827-0_PIK",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "decoupling-w25q16jvssiq",
      icValue: "W25Q16JVSSIQ",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 25.26,
          p25Mm: 10.85,
          p75Mm: 90.16,
          count: 138
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 8.82,
          p25Mm: 5.88,
          p75Mm: 18.22,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 129.28,
          p25Mm: 105.22,
          p75Mm: 131.37,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 18.48,
          p25Mm: 16.97,
          p75Mm: 18.74,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 35.46,
          p25Mm: 25.4,
          p75Mm: 135.87,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 36.09,
          p25Mm: 26.52,
          p75Mm: 57.39,
          count: 7
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 25.55,
          p25Mm: 22.06,
          p75Mm: 57.07,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 34.47,
          p25Mm: 34.47,
          p75Mm: 37.23,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 35.16,
          p25Mm: 23.33,
          p75Mm: 35.16,
          count: 3
        }
      ],
      designRule: "Caps for W25Q16JVSSIQ tend to be distant (22.06mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "LCD_Control",
        "PCBLF0827-0_PIK",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "decoupling-irm-02-5",
      icValue: "IRM-02-5",
      icCategory: "regulator",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 43.39,
          p25Mm: 31.19,
          p75Mm: 60.31,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 42.25,
          p25Mm: 23.95,
          p75Mm: 53.0,
          count: 17
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 9.89,
          p25Mm: 8.37,
          p75Mm: 19.48,
          count: 13
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 90.88,
          p25Mm: 79.02,
          p75Mm: 96.81,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 44.8,
          p25Mm: 29.51,
          p75Mm: 54.06,
          count: 7
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 32.89,
          p25Mm: 19.53,
          p75Mm: 32.89,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 15.86,
          p25Mm: 8.82,
          p75Mm: 15.86,
          count: 2
        }
      ],
      designRule: "Caps for IRM-02-5 tend to be distant (41.47mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "BGW_Fan_Control",
        "Clamshell_Grill",
        "Southbend_RTD_control",
        "ZLF0053"
      ]
    },
    {
      id: "decoupling-sn74hct08dre4",
      icValue: "SN74HCT08DRE4",
      icCategory: "interface",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 28.97,
          p25Mm: 13.72,
          p75Mm: 40.62,
          count: 36
        },
        {
          role: "bypass",
          preferredValue: "100NF_0805",
          values: [
            "100NF_0805"
          ],
          medianDistanceMm: 25.81,
          p25Mm: 7.1,
          p75Mm: 42.82,
          count: 36
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 73.25,
          p25Mm: 29.54,
          p75Mm: 79.58,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 59.28,
          p25Mm: 29.13,
          p75Mm: 73.79,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 68.8,
          p25Mm: 37.43,
          p75Mm: 87.47,
          count: 12
        }
      ],
      designRule: "Caps for SN74HCT08DRE4 tend to be distant (31.37mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "PCBLF0752-0_PIK"
      ]
    },
    {
      id: "decoupling-msp430fr6005ipzr",
      icValue: "MSP430FR6005IPZR",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 20.15,
          p25Mm: 6.74,
          p75Mm: 42.73,
          count: 96
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 28.74,
          p25Mm: 9.31,
          p75Mm: 39.67,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 3.14,
          p25Mm: 2.5,
          p75Mm: 5.71,
          count: 29
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 5.15,
          p25Mm: 3.32,
          p75Mm: 7.94,
          count: 28
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 4.88,
          p25Mm: 3.56,
          p75Mm: 6.55,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 27.42,
          p25Mm: 7.32,
          p75Mm: 31.54,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "22UF_0805",
          values: [
            "22UF_0805"
          ],
          medianDistanceMm: 14.64,
          p25Mm: 3.73,
          p75Mm: 25.5,
          count: 11
        },
        {
          role: "bypass",
          preferredValue: "0.01UF_1210_500V",
          values: [
            "0.01UF_1210_500V"
          ],
          medianDistanceMm: 41.54,
          p25Mm: 26.13,
          p75Mm: 44.09,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 47.85,
          p25Mm: 44.59,
          p75Mm: 47.85,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 6.45,
          p25Mm: 4.8,
          p75Mm: 6.45,
          count: 4
        }
      ],
      designRule: "Bypass caps for MSP430FR6005IPZR typically 5-15mm away (median: 13.42mm)",
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
      id: "decoupling-mcp6061-e-snmicrochip_mcp6061-e-sn_0_2",
      icValue: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 38.81,
          p25Mm: 20.83,
          p75Mm: 53.58,
          count: 144
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 52.77,
          p25Mm: 47.88,
          p75Mm: 58.68,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 25.11,
          p25Mm: 6.03,
          p75Mm: 30.49,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 24.84,
          p25Mm: 21.25,
          p75Mm: 36.16,
          count: 6
        }
      ],
      designRule: "Caps for MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2 tend to be distant (38.81mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-hcpl-817-500e",
      icValue: "HCPL-817-500E",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 28.9,
          p25Mm: 22.37,
          p75Mm: 34.36,
          count: 120
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 25.2,
          p25Mm: 24.2,
          p75Mm: 28.72,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 29.35,
          p25Mm: 29.01,
          p75Mm: 29.35,
          count: 12
        }
      ],
      designRule: "Caps for HCPL-817-500E tend to be distant (28.72mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel"
      ]
    },
    {
      id: "decoupling-24aa02e48-i-snmicrochip_24aa02e48-i-sn_0",
      icValue: "24AA02E48-I-SNMICROCHIP_24AA02E48-I-SN_0_0",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 15.1,
          p25Mm: 7.37,
          p75Mm: 39.81,
          count: 120
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 10.22,
          p25Mm: 7.56,
          p75Mm: 15.65,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 57.86,
          p25Mm: 7.64,
          p75Mm: 57.86,
          count: 12
        }
      ],
      designRule: "Bypass caps for 24AA02E48-I-SNMICROCHIP_24AA02E48-I-SN_0_0 typically 5-15mm away (median: 14.99mm)",
      sourceDesigns: [
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel"
      ]
    },
    {
      id: "decoupling-keystone_4881",
      icValue: "KEYSTONE_4881",
      icCategory: "other",
      occurrences: 6,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 54.82,
          p25Mm: 22.42,
          p75Mm: 72.07,
          count: 42
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 49.89,
          p25Mm: 49.5,
          p75Mm: 52.03,
          count: 12
        }
      ],
      designRule: "Caps for KEYSTONE_4881 tend to be distant (50.11mm median) — consider closer placement",
      sourceDesigns: [
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "decoupling-pic18f26k226sp",
      icValue: "PIC18F26K226SP",
      icCategory: "mcu",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 15.01,
          p25Mm: 8.62,
          p75Mm: 18.74,
          count: 38
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 7.37,
          p25Mm: 4.49,
          p75Mm: 21.46,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 28.96,
          p25Mm: 27.43,
          p75Mm: 33.02,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 33.2,
          p25Mm: 32.19,
          p75Mm: 33.2,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 9.4,
          p25Mm: 8.54,
          p75Mm: 10.49,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 24.02,
          p25Mm: 24.02,
          p75Mm: 24.02,
          count: 1
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 62.37,
          p25Mm: 62.37,
          p75Mm: 62.37,
          count: 1
        }
      ],
      designRule: "Caps for PIC18F26K226SP tend to be distant (15.01mm median) — consider closer placement",
      sourceDesigns: [
        "Alpha_sign_control_PIK",
        "FGLF0623-03_PIK",
        "FGLF0788-01_PIK",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "decoupling-mc7805ctg",
      icValue: "MC7805CTG",
      icCategory: "regulator",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 19.19,
          p25Mm: 8.4,
          p75Mm: 161.68,
          count: 30
        },
        {
          role: "bulk",
          preferredValue: "10UF_1210",
          values: [
            "10UF_1210"
          ],
          medianDistanceMm: 15.15,
          p25Mm: 10.6,
          p75Mm: 170.09,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 16.13,
          p25Mm: 8.89,
          p75Mm: 169.73,
          count: 18
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 25.68,
          p25Mm: 4.2,
          p75Mm: 38.73,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 47.75,
          p25Mm: 47.75,
          p75Mm: 47.75,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "1000UF_50V_RAD",
          values: [
            "1000UF_50V_RAD"
          ],
          medianDistanceMm: 9.43,
          p25Mm: 9.15,
          p75Mm: 9.43,
          count: 2
        }
      ],
      designRule: "Caps for MC7805CTG tend to be distant (18.3mm median) — consider closer placement",
      sourceDesigns: [
        "Auto_Test_Circuit",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original"
      ]
    },
    {
      id: "decoupling-atmega328-aur",
      icValue: "ATMEGA328-AUR",
      icCategory: "mcu",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 38.94,
          p25Mm: 4.02,
          p75Mm: 41.35,
          count: 40
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 38.41,
          p25Mm: 28.71,
          p75Mm: 40.13,
          count: 15
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 24.67,
          p25Mm: 13.56,
          p75Mm: 24.67,
          count: 10
        }
      ],
      designRule: "Caps for ATMEGA328-AUR tend to be distant (28.71mm median) — consider closer placement",
      sourceDesigns: [
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control"
      ]
    },
    {
      id: "decoupling-rfm97cw-915s2",
      icValue: "RFM97CW-915S2",
      icCategory: "other",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 52.08,
          p25Mm: 31.86,
          p75Mm: 77.85,
          count: 90
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 59.32,
          p25Mm: 35.12,
          p75Mm: 77.39,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 60.38,
          p25Mm: 52.47,
          p75Mm: 68.59,
          count: 25
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 72.65,
          p25Mm: 51.0,
          p75Mm: 81.37,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 66.66,
          p25Mm: 64.85,
          p75Mm: 90.03,
          count: 15
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 53.89,
          p25Mm: 39.37,
          p75Mm: 79.7,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "22UF_0805",
          values: [
            "22UF_0805"
          ],
          medianDistanceMm: 56.57,
          p25Mm: 36.25,
          p75Mm: 66.34,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "0.01UF_1210_500V",
          values: [
            "0.01UF_1210_500V"
          ],
          medianDistanceMm: 80.13,
          p25Mm: 46.26,
          p75Mm: 84.89,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 17.67,
          p25Mm: 14.79,
          p75Mm: 17.67,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 89.98,
          p25Mm: 65.24,
          p75Mm: 89.98,
          count: 4
        }
      ],
      designRule: "Caps for RFM97CW-915S2 tend to be distant (57.22mm median) — consider closer placement",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "PCB Design Kairos Control",
        "PCBLF0660-7",
        "PCBLF0660-7_PIK",
        "atsamd21_only"
      ]
    },
    {
      id: "decoupling-sn74hc573adbr",
      icValue: "SN74HC573ADBR",
      icCategory: "interface",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 44.18,
          p25Mm: 13.77,
          p75Mm: 63.16,
          count: 39
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 25.84,
          p25Mm: 13.63,
          p75Mm: 31.79,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "22UF_10V1206",
          values: [
            "22UF_10V1206"
          ],
          medianDistanceMm: 51.86,
          p25Mm: 39.94,
          p75Mm: 67.06,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 79.41,
          p25Mm: 46.34,
          p75Mm: 94.01,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 32.85,
          p25Mm: 32.2,
          p75Mm: 44.31,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_25V",
          values: [
            "22UF_1206_25V"
          ],
          medianDistanceMm: 94.65,
          p25Mm: 53.99,
          p75Mm: 109.77,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 86.48,
          p25Mm: 45.45,
          p75Mm: 101.7,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 43.55,
          p25Mm: 30.43,
          p75Mm: 43.55,
          count: 2
        }
      ],
      designRule: "Caps for SN74HC573ADBR tend to be distant (43.56mm median) — consider closer placement",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "HDMI_Display"
      ]
    },
    {
      id: "decoupling-mc7805ctgmc7805",
      icValue: "MC7805CTGMC7805",
      icCategory: "regulator",
      occurrences: 5,
      caps: [
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 88.68,
          p25Mm: 81.84,
          p75Mm: 94.03,
          count: 28
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 76.34,
          p25Mm: 36.49,
          p75Mm: 86.19,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 48.44,
          p25Mm: 35.55,
          p75Mm: 48.47,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 10.16,
          p25Mm: 4.16,
          p75Mm: 10.42,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 103.22,
          p25Mm: 103.22,
          p75Mm: 108.43,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 97.16,
          p25Mm: 84.24,
          p75Mm: 97.16,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V",
          values: [
            "22UF_1206_10V"
          ],
          medianDistanceMm: 16.45,
          p25Mm: 4.08,
          p75Mm: 16.45,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 19.27,
          p25Mm: 19.27,
          p75Mm: 19.27,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 46.69,
          p25Mm: 46.69,
          p75Mm: 46.69,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "0.33F-5.5V-SUPERCAP",
          values: [
            "0.33F-5.5V-SUPERCAP"
          ],
          medianDistanceMm: 8.78,
          p25Mm: 8.78,
          p75Mm: 8.78,
          count: 4
        }
      ],
      designRule: "Caps for MC7805CTGMC7805 tend to be distant (48.47mm median) — consider closer placement",
      sourceDesigns: [
        "FGLF0623-03_PIK",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "decoupling-sn74hct240n",
      icValue: "SN74HCT240N",
      icCategory: "interface",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "470PF_100V_AXIALWIDE",
          values: [
            "470PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 124.19,
          p25Mm: 107.71,
          p75Mm: 140.97,
          count: 128
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 70.1,
          p25Mm: 39.76,
          p75Mm: 89.46,
          count: 116
        },
        {
          role: "bypass",
          preferredValue: "22PF_100V_AXIALWIDE",
          values: [
            "22PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 46.86,
          p25Mm: 26.63,
          p75Mm: 52.21,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_50V_RAD",
          values: [
            "4.7UF_50V_RAD"
          ],
          medianDistanceMm: 117.6,
          p25Mm: 95.19,
          p75Mm: 129.07,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "100PF_50V_AXIALWIDE",
          values: [
            "100PF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 64.64,
          p25Mm: 36.46,
          p75Mm: 73.93,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 80.62,
          p25Mm: 48.96,
          p75Mm: 93.36,
          count: 4
        }
      ],
      designRule: "Caps for SN74HCT240N tend to be distant (92.22mm median) — consider closer placement",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "decoupling-74hc164d,653",
      icValue: "74HC164D,653",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 173.59,
          p25Mm: 113.11,
          p75Mm: 250.53,
          count: 64
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 197.13,
          p25Mm: 109.94,
          p75Mm: 263.28,
          count: 32
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 266.86,
          p25Mm: 106.43,
          p75Mm: 281.01,
          count: 4
        }
      ],
      designRule: "Caps for 74HC164D,653 tend to be distant (173.59mm median) — consider closer placement",
      sourceDesigns: [
        "DISDMD"
      ]
    },
    {
      id: "decoupling-gp1s094hcz0f",
      icValue: "GP1S094HCZ0F",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 62.29,
          p25Mm: 44.93,
          p75Mm: 81.4,
          count: 100
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 64.04,
          p25Mm: 53.35,
          p75Mm: 85.59,
          count: 40
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 64.04,
          p25Mm: 53.27,
          p75Mm: 73.85,
          count: 24
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 55.24,
          p25Mm: 47.8,
          p75Mm: 63.36,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 63.4,
          p25Mm: 62.87,
          p75Mm: 82.82,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 54.59,
          p25Mm: 44.78,
          p75Mm: 56.28,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 109.57,
          p25Mm: 90.96,
          p75Mm: 110.86,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "1.5PF_0402",
          values: [
            "1.5PF_0402"
          ],
          medianDistanceMm: 107.33,
          p25Mm: 86.94,
          p75Mm: 107.33,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0402",
          values: [
            "1000PF_0402"
          ],
          medianDistanceMm: 108.55,
          p25Mm: 88.67,
          p75Mm: 108.55,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0402",
          values: [
            "2200PF_0402"
          ],
          medianDistanceMm: 105.47,
          p25Mm: 85.3,
          p75Mm: 105.47,
          count: 4
        }
      ],
      designRule: "Caps for GP1S094HCZ0F tend to be distant (63.4mm median) — consider closer placement",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "decoupling-tps22993rlwr",
      icValue: "TPS22993RLWR",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 12.57,
          p25Mm: 3.55,
          p75Mm: 27.76,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 67.95,
          p25Mm: 40.4,
          p75Mm: 76.67,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "10UF_0603",
          values: [
            "10UF_0603"
          ],
          medianDistanceMm: 79.11,
          p25Mm: 77.23,
          p75Mm: 81.72,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 75.8,
          p25Mm: 73.85,
          p75Mm: 78.52,
          count: 4
        }
      ],
      designRule: "Caps for TPS22993RLWR tend to be distant (37.66mm median) — consider closer placement",
      sourceDesigns: [
        "Field Updater"
      ]
    },
    {
      id: "decoupling-r-78e5.0-0.5recom_r-78e5.0-1.0_0_0",
      icValue: "R-78E5.0-0.5RECOM_R-78E5.0-1.0_0_0",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 39.33,
          p25Mm: 22.32,
          p75Mm: 50.59,
          count: 96
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 15.33,
          p25Mm: 10.27,
          p75Mm: 20.68,
          count: 16
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 55.77,
          p25Mm: 52.16,
          p75Mm: 60.39,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 21.39,
          p25Mm: 21.17,
          p75Mm: 21.39,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 38.42,
          p25Mm: 22.96,
          p75Mm: 38.42,
          count: 4
        }
      ],
      designRule: "Caps for R-78E5.0-0.5RECOM_R-78E5.0-1.0_0_0 tend to be distant (38.82mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-317ts",
      icValue: "317TS",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 15.49,
          p25Mm: 14.67,
          p75Mm: 15.49,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_RAD",
          values: [
            "100UF_35V_RAD"
          ],
          medianDistanceMm: 18.77,
          p25Mm: 18.77,
          p75Mm: 18.77,
          count: 4
        }
      ],
      designRule: "Caps for 317TS tend to be distant (15.49mm median) — consider closer placement",
      sourceDesigns: [
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "decoupling-tps54332ddar",
      icValue: "TPS54332DDAR",
      icCategory: "other",
      occurrences: 4,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 89.02,
          p25Mm: 30.23,
          p75Mm: 119.76,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 37.06,
          p25Mm: 20.36,
          p75Mm: 62.09,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_25V",
          values: [
            "22UF_1206_25V"
          ],
          medianDistanceMm: 24.11,
          p25Mm: 17.12,
          p75Mm: 25.93,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 19.53,
          p25Mm: 9.08,
          p75Mm: 20.62,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0805_10%_50V",
          values: [
            "2.2UF_0805_10%_50V"
          ],
          medianDistanceMm: 19.31,
          p25Mm: 4.52,
          p75Mm: 19.34,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "1UF_0805_20%",
          values: [
            "1UF_0805_20%"
          ],
          medianDistanceMm: 126.97,
          p25Mm: 118.63,
          p75Mm: 139.92,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "18pF",
          values: [
            "18pF"
          ],
          medianDistanceMm: 141.55,
          p25Mm: 122.05,
          p75Mm: 142.87,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "3300PF_1206",
          values: [
            "3300PF_1206"
          ],
          medianDistanceMm: 15.61,
          p25Mm: 2.17,
          p75Mm: 23.76,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "2200UF_50V_RAD",
          values: [
            "2200UF_50V_RAD"
          ],
          medianDistanceMm: 28.29,
          p25Mm: 23.89,
          p75Mm: 31.89,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "150PF_0805",
          values: [
            "150PF_0805"
          ],
          medianDistanceMm: 13.95,
          p25Mm: 2.24,
          p75Mm: 23.27,
          count: 8
        }
      ],
      designRule: "Caps for TPS54332DDAR tend to be distant (28.96mm median) — consider closer placement",
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "decoupling-pcf85063att-aj",
      icValue: "PCF85063ATT/AJ",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 51.98,
          p25Mm: 43.2,
          p75Mm: 113.57,
          count: 50
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 42.8,
          p25Mm: 38.18,
          p75Mm: 57.79,
          count: 16
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 157.76,
          p25Mm: 116.3,
          p75Mm: 158.3,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 69.95,
          p25Mm: 13.93,
          p75Mm: 98.05,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 57.17,
          p25Mm: 55.7,
          p75Mm: 57.17,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 47.46,
          p25Mm: 38.53,
          p75Mm: 47.46,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 9.42,
          p25Mm: 9.42,
          p75Mm: 23.61,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 68.67,
          p25Mm: 68.67,
          p75Mm: 99.33,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 158.67,
          p25Mm: 158.67,
          p75Mm: 158.67,
          count: 2
        }
      ],
      designRule: "Caps for PCF85063ATT/AJ tend to be distant (57.17mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "LCD_Control",
        "Pitts_LCD_Faceplate"
      ]
    },
    {
      id: "decoupling-irm_03",
      icValue: "IRM_03",
      icCategory: "regulator",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 79.64,
          p25Mm: 45.47,
          p75Mm: 99.53,
          count: 68
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 16.2,
          p25Mm: 9.4,
          p75Mm: 23.67,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 76.49,
          p25Mm: 76.46,
          p75Mm: 80.57,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 95.17,
          p25Mm: 44.28,
          p75Mm: 106.31,
          count: 3
        }
      ],
      designRule: "Caps for IRM_03 tend to be distant (76.49mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic",
        "Bottom",
        "ProSmoker_PK100"
      ]
    },
    {
      id: "decoupling-sn74hct244n",
      icValue: "SN74HCT244N",
      icCategory: "interface",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "470PF_100V_AXIALWIDE",
          values: [
            "470PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 232.39,
          p25Mm: 118.77,
          p75Mm: 240.14,
          count: 96
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 84.15,
          p25Mm: 53.29,
          p75Mm: 132.54,
          count: 87
        },
        {
          role: "bypass",
          preferredValue: "22PF_100V_AXIALWIDE",
          values: [
            "22PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 75.27,
          p25Mm: 72.16,
          p75Mm: 89.15,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_50V_RAD",
          values: [
            "4.7UF_50V_RAD"
          ],
          medianDistanceMm: 223.91,
          p25Mm: 87.44,
          p75Mm: 227.56,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "100PF_50V_AXIALWIDE",
          values: [
            "100PF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 82.54,
          p25Mm: 70.82,
          p75Mm: 88.03,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 87.14,
          p25Mm: 66.4,
          p75Mm: 107.09,
          count: 3
        }
      ],
      designRule: "Caps for SN74HCT244N tend to be distant (120.43mm median) — consider closer placement",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "decoupling-aoz6662di",
      icValue: "AOZ6662DI",
      icCategory: "regulator",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 40.58,
          p25Mm: 23.98,
          p75Mm: 51.32,
          count: 47
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 5.15,
          p25Mm: 5.12,
          p75Mm: 7.15,
          count: 7
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 2.99,
          p25Mm: 2.06,
          p75Mm: 2.99,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 3.07,
          p25Mm: 3.07,
          p75Mm: 4.14,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "0.022UF_0603",
          values: [
            "0.022UF_0603"
          ],
          medianDistanceMm: 23.15,
          p25Mm: 23.15,
          p75Mm: 23.15,
          count: 2
        }
      ],
      designRule: "Caps for AOZ6662DI tend to be distant (25.8mm median) — consider closer placement",
      sourceDesigns: [
        "DC-DC_IO_expansion_board",
        "ESP32_Programming_board",
        "PCBLF0738-0_PIK"
      ]
    },
    {
      id: "decoupling-kwh028q02",
      icValue: "KWH028Q02",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 24.91,
          p25Mm: 17.26,
          p75Mm: 39.03,
          count: 44
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 28.88,
          p25Mm: 26.63,
          p75Mm: 39.03,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 30.59,
          p25Mm: 19.72,
          p75Mm: 47.64,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 47.26,
          p25Mm: 25.61,
          p75Mm: 50.37,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 18.57,
          p25Mm: 10.21,
          p75Mm: 22.4,
          count: 4
        }
      ],
      designRule: "Caps for KWH028Q02 tend to be distant (26.58mm median) — consider closer placement",
      sourceDesigns: [
        "ESP32_LCD_PCB",
        "Pico_LCD_PCB",
        "Pico_LCD_PCB_PIK"
      ]
    },
    {
      id: "decoupling-mp6500gf",
      icValue: "MP6500GF",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 30.2,
          p25Mm: 19.27,
          p75Mm: 49.09,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 26.46,
          p25Mm: 25.41,
          p75Mm: 40.07,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 35.95,
          p25Mm: 22.78,
          p75Mm: 54.78,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 8.35,
          p25Mm: 8.35,
          p75Mm: 8.35,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 3.91,
          p25Mm: 3.91,
          p75Mm: 3.91,
          count: 3
        }
      ],
      designRule: "Caps for MP6500GF tend to be distant (28.72mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-mcp9701t-e-tt",
      icValue: "MCP9701T-E/TT",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 52.25,
          p25Mm: 26.94,
          p75Mm: 65.73,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 67.36,
          p25Mm: 56.18,
          p75Mm: 76.88,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 23.9,
          p25Mm: 4.43,
          p75Mm: 61.53,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 44.87,
          p25Mm: 44.87,
          p75Mm: 44.87,
          count: 3
        }
      ],
      designRule: "Caps for MCP9701T-E/TT tend to be distant (53.05mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-pic18f46k22-i-pt",
      icValue: "PIC18F46K22-I/PT",
      icCategory: "mcu",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 37.73,
          p25Mm: 20.02,
          p75Mm: 48.09,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 41.11,
          p25Mm: 32.99,
          p75Mm: 51.68,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 26.04,
          p25Mm: 22.1,
          p75Mm: 54.45,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 25.96,
          p25Mm: 25.96,
          p75Mm: 25.96,
          count: 3
        }
      ],
      designRule: "Caps for PIC18F46K22-I/PT tend to be distant (33.78mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-tbpdans150pgucv",
      icValue: "TBPDANS150PGUCV",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 42.7,
          p25Mm: 18.76,
          p75Mm: 64.02,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 49.05,
          p25Mm: 45.1,
          p75Mm: 64.66,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 42.51,
          p25Mm: 6.13,
          p75Mm: 65.55,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 29.2,
          p25Mm: 29.2,
          p75Mm: 29.2,
          count: 3
        }
      ],
      designRule: "Caps for TBPDANS150PGUCV tend to be distant (42.7mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "decoupling-mcp6061-e-sn",
      icValue: "MCP6061-E-SN",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 38.81,
          p25Mm: 20.83,
          p75Mm: 53.58,
          count: 72
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 52.77,
          p25Mm: 47.88,
          p75Mm: 58.68,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 25.11,
          p25Mm: 6.03,
          p75Mm: 30.49,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 24.84,
          p25Mm: 21.25,
          p75Mm: 36.16,
          count: 3
        }
      ],
      designRule: "Caps for MCP6061-E-SN tend to be distant (38.81mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board"
      ]
    },
    {
      id: "decoupling-stm32f103rct6lqfp-64-m",
      icValue: "STM32F103RCT6LQFP-64-M",
      icCategory: "mcu",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 27.73,
          p25Mm: 16.67,
          p75Mm: 27.73,
          count: 6
        }
      ],
      designRule: "Caps for STM32F103RCT6LQFP-64-M tend to be distant (27.73mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-spx3819m5-l-3-3-trsot-23-5-m",
      icValue: "SPX3819M5-L-3-3/TRSOT-23-5-M",
      icCategory: "regulator",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 21.49,
          p25Mm: 4.89,
          p75Mm: 29.68,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 24.71,
          p25Mm: 10.03,
          p75Mm: 36.77,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 22.7,
          p25Mm: 17.93,
          p75Mm: 27.83,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_50V",
          values: [
            "220UF_50V"
          ],
          medianDistanceMm: 16.51,
          p25Mm: 10.28,
          p75Mm: 43.43,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0603",
          values: [
            "2200PF_0603"
          ],
          medianDistanceMm: 5.79,
          p25Mm: 3.59,
          p75Mm: 40.43,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 33.49,
          p25Mm: 33.49,
          p75Mm: 33.49,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 1.77,
          p25Mm: 1.77,
          p75Mm: 1.77,
          count: 3
        }
      ],
      designRule: "Caps for SPX3819M5-L-3-3/TRSOT-23-5-M tend to be distant (17.93mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-spx3819m5-l-5-0-trsot-23-5-m",
      icValue: "SPX3819M5-L-5-0/TRSOT-23-5-M",
      icCategory: "regulator",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 29.38,
          p25Mm: 8.29,
          p75Mm: 36.31,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 6.89,
          p25Mm: 3.32,
          p75Mm: 30.89,
          count: 9
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 35.26,
          p25Mm: 35.26,
          p75Mm: 35.26,
          count: 3
        }
      ],
      designRule: "Caps for SPX3819M5-L-5-0/TRSOT-23-5-M tend to be distant (29.38mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-tps54286pwprpwp14_2p31x2p46_tex-m",
      icValue: "TPS54286PWPRPWP14_2P31X2P46_TEX-M",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 10.44,
          p25Mm: 7.5,
          p75Mm: 18.98,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 16.17,
          p25Mm: 3.0,
          p75Mm: 22.94,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 10.49,
          p25Mm: 8.09,
          p75Mm: 17.38,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_50V",
          values: [
            "220UF_50V"
          ],
          medianDistanceMm: 7.84,
          p25Mm: 6.01,
          p75Mm: 29.96,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0603",
          values: [
            "2200PF_0603"
          ],
          medianDistanceMm: 6.04,
          p25Mm: 5.08,
          p75Mm: 26.56,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 19.53,
          p25Mm: 19.53,
          p75Mm: 19.53,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 11.94,
          p25Mm: 11.94,
          p75Mm: 11.94,
          count: 3
        }
      ],
      designRule: "Bypass caps for TPS54286PWPRPWP14_2P31X2P46_TEX-M typically 5-15mm away (median: 10.44mm)",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-value",
      icValue: "Value",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 14.52,
          p25Mm: 11.52,
          p75Mm: 27.19,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 20.26,
          p25Mm: 4.21,
          p75Mm: 21.42,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 13.55,
          p25Mm: 12.93,
          p75Mm: 31.06,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_50V",
          values: [
            "220UF_50V"
          ],
          medianDistanceMm: 25.91,
          p25Mm: 9.03,
          p75Mm: 27.66,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0603",
          values: [
            "2200PF_0603"
          ],
          medianDistanceMm: 25.74,
          p25Mm: 6.1,
          p75Mm: 26.12,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 2.47,
          p25Mm: 2.47,
          p75Mm: 2.47,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 32.36,
          p25Mm: 32.36,
          p75Mm: 32.36,
          count: 3
        }
      ],
      designRule: "Bypass caps for Value typically 5-15mm away (median: 14.52mm)",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-ltc2955cts8-1#trmpbf",
      icValue: "LTC2955CTS8-1#TRMPBF",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 22.02,
          p25Mm: 13.46,
          p75Mm: 39.54,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 31.66,
          p25Mm: 11.27,
          p75Mm: 34.72,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 23.67,
          p25Mm: 23.39,
          p75Mm: 43.47,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_50V",
          values: [
            "220UF_50V"
          ],
          medianDistanceMm: 38.69,
          p25Mm: 19.39,
          p75Mm: 39.68,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0603",
          values: [
            "2200PF_0603"
          ],
          medianDistanceMm: 38.02,
          p25Mm: 10.34,
          p75Mm: 39.14,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 13.48,
          p25Mm: 13.48,
          p75Mm: 13.48,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 43.65,
          p25Mm: 43.65,
          p75Mm: 43.65,
          count: 3
        }
      ],
      designRule: "Caps for LTC2955CTS8-1#TRMPBF tend to be distant (23.39mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-ltc2955iddb-2#trmpbflinear_technology_lt",
      icValue: "LTC2955IDDB-2#TRMPBFLINEAR_TECHNOLOGY_LTC2955IDDB-2#TRMPBF_0_0",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "4.7UF_0805",
          values: [
            "4.7UF_0805"
          ],
          medianDistanceMm: 21.87,
          p25Mm: 15.73,
          p75Mm: 39.48,
          count: 30
        },
        {
          role: "bypass",
          preferredValue: "100PF_0603",
          values: [
            "100PF_0603"
          ],
          medianDistanceMm: 31.56,
          p25Mm: 14.62,
          p75Mm: 35.45,
          count: 18
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 25.11,
          p25Mm: 23.53,
          p75Mm: 43.55,
          count: 12
        },
        {
          role: "bulk",
          preferredValue: "220UF_50V",
          values: [
            "220UF_50V"
          ],
          medianDistanceMm: 38.5,
          p25Mm: 20.43,
          p75Mm: 40.61,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0603",
          values: [
            "2200PF_0603"
          ],
          medianDistanceMm: 37.96,
          p25Mm: 14.22,
          p75Mm: 39.61,
          count: 9
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 16.36,
          p25Mm: 16.36,
          p75Mm: 16.36,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 43.47,
          p25Mm: 43.47,
          p75Mm: 43.47,
          count: 3
        }
      ],
      designRule: "Caps for LTC2955IDDB-2#TRMPBFLINEAR_TECHNOLOGY_LTC2955IDDB-2#TRMPBF_0_0 tend to be distant (23.53mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "decoupling-pcf85063att-ajtssop8",
      icValue: "PCF85063ATT/AJTSSOP8",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 43.12,
          p25Mm: 29.73,
          p75Mm: 68.85,
          count: 40
        },
        {
          role: "bypass",
          preferredValue: "2.2UF_0603",
          values: [
            "2.2UF_0603"
          ],
          medianDistanceMm: 27.11,
          p25Mm: 24.71,
          p75Mm: 42.2,
          count: 8
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 47.73,
          p25Mm: 47.73,
          p75Mm: 54.52,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 34.49,
          p25Mm: 27.6,
          p75Mm: 44.01,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 128.37,
          p25Mm: 58.26,
          p75Mm: 142.38,
          count: 5
        },
        {
          role: "bypass",
          preferredValue: "1F_2.7V_RAD",
          values: [
            "1F_2.7V_RAD"
          ],
          medianDistanceMm: 28.17,
          p25Mm: 3.76,
          p75Mm: 28.17,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 36.26,
          p25Mm: 6.05,
          p75Mm: 69.35,
          count: 3
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 42.99,
          p25Mm: 41.32,
          p75Mm: 42.99,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 34.7,
          p25Mm: 34.7,
          p75Mm: 34.7,
          count: 1
        }
      ],
      designRule: "Caps for PCF85063ATT/AJTSSOP8 tend to be distant (41.64mm median) — consider closer placement",
      sourceDesigns: [
        "PCBLF0717-1_PIK",
        "PCBLF0827-0_PIK",
        "PCB_Connectware"
      ]
    },
    {
      id: "decoupling-74hct04",
      icValue: "74HCT04",
      icCategory: "other",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 41.34,
          p25Mm: 27.01,
          p75Mm: 78.42,
          count: 24
        }
      ],
      designRule: "Caps for 74HCT04 tend to be distant (41.34mm median) — consider closer placement",
      sourceDesigns: [
        "Williams_Sys_11_Master"
      ]
    },
    {
      id: "decoupling-sn74als541",
      icValue: "SN74ALS541",
      icCategory: "interface",
      occurrences: 3,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 82.83,
          p25Mm: 38.97,
          p75Mm: 123.13,
          count: 24
        }
      ],
      designRule: "Caps for SN74ALS541 tend to be distant (82.83mm median) — consider closer placement",
      sourceDesigns: [
        "Williams_Sys_11_Master"
      ]
    },
    {
      id: "decoupling-sn75als192dr",
      icValue: "SN75ALS192DR",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 19.37,
          p25Mm: 7.62,
          p75Mm: 23.5,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 16.84,
          p25Mm: 11.63,
          p75Mm: 18.47,
          count: 6
        }
      ],
      designRule: "Caps for SN75ALS192DR tend to be distant (18.41mm median) — consider closer placement",
      sourceDesigns: [
        "30in_segment_driver",
        "SMT_Control_Board"
      ]
    },
    {
      id: "decoupling-ld1117s50ctr",
      icValue: "LD1117S50CTR",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 19.4,
          p25Mm: 10.29,
          p75Mm: 30.24,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "100UF_25V_ALE",
          values: [
            "100UF_25V_ALE"
          ],
          medianDistanceMm: 6.86,
          p25Mm: 5.57,
          p75Mm: 7.35,
          count: 6
        }
      ],
      designRule: "Bypass caps for LD1117S50CTR typically 5-15mm away (median: 10.34mm)",
      sourceDesigns: [
        "30in_segment_driver",
        "SMT_Control_Board"
      ]
    },
    {
      id: "decoupling-pic24fj64ga306",
      icValue: "PIC24FJ64GA306",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 15.54,
          p25Mm: 5.22,
          p75Mm: 29.18,
          count: 44
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 63.63,
          p25Mm: 24.23,
          p75Mm: 71.32,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 8.52,
          p25Mm: 5.07,
          p75Mm: 38.65,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 75.6,
          p25Mm: 19.32,
          p75Mm: 88.3,
          count: 3
        }
      ],
      designRule: "Caps for PIC24FJ64GA306 tend to be distant (17.82mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic",
        "ProSmoker_PK100"
      ]
    },
    {
      id: "decoupling-tsc2046eipwr",
      icValue: "TSC2046EIPWR",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 48.96,
          p25Mm: 29.85,
          p75Mm: 65.53,
          count: 32
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 31.79,
          p25Mm: 18.89,
          p75Mm: 31.79,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 13.03,
          p25Mm: 13.03,
          p75Mm: 54.39,
          count: 3
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 66.62,
          p25Mm: 59.89,
          p75Mm: 73.57,
          count: 3
        }
      ],
      designRule: "Caps for TSC2046EIPWR tend to be distant (48.19mm median) — consider closer placement",
      sourceDesigns: [
        "All-In-One_Schematic",
        "TOP"
      ]
    },
    {
      id: "decoupling-sn74hc175dr",
      icValue: "SN74HC175DR",
      icCategory: "interface",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_5%_50V"
          ],
          medianDistanceMm: 46.21,
          p25Mm: 2.5,
          p75Mm: 46.21,
          count: 4
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 45.81,
          p25Mm: 45.81,
          p75Mm: 45.81,
          count: 2
        }
      ],
      designRule: "Caps for SN74HC175DR tend to be distant (45.81mm median) — consider closer placement",
      sourceDesigns: [
        "Astrodyne_replacement",
        "PCBLF0739-0_PIK"
      ]
    },
    {
      id: "decoupling-24aa02e48t-i-ot",
      icValue: "24AA02E48T-I/OT",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 20.85,
          p25Mm: 10.61,
          p75Mm: 31.31,
          count: 41
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 79.38,
          p25Mm: 29.91,
          p75Mm: 87.23,
          count: 5
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 26.36,
          p25Mm: 19.7,
          p75Mm: 26.36,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "100UF_1206_6.3V1206",
          values: [
            "100UF_1206_6.3V1206"
          ],
          medianDistanceMm: 12.71,
          p25Mm: 12.71,
          p75Mm: 12.71,
          count: 1
        }
      ],
      designRule: "Caps for 24AA02E48T-I/OT tend to be distant (21.16mm median) — consider closer placement",
      sourceDesigns: [
        "Bottom",
        "ProSmoker_PK100"
      ]
    },
    {
      id: "decoupling-sn74hc574n",
      icValue: "SN74HC574N",
      icCategory: "interface",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "470PF_100V_AXIALWIDE",
          values: [
            "470PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 100.51,
          p25Mm: 90.4,
          p75Mm: 107.43,
          count: 64
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 58.79,
          p25Mm: 34.82,
          p75Mm: 92.27,
          count: 58
        },
        {
          role: "bypass",
          preferredValue: "22PF_100V_AXIALWIDE",
          values: [
            "22PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 35.88,
          p25Mm: 19.38,
          p75Mm: 36.22,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_50V_RAD",
          values: [
            "4.7UF_50V_RAD"
          ],
          medianDistanceMm: 87.84,
          p25Mm: 82.87,
          p75Mm: 87.84,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "100PF_50V_AXIALWIDE",
          values: [
            "100PF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 39.87,
          p25Mm: 35.92,
          p75Mm: 39.87,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 58.62,
          p25Mm: 51.66,
          p75Mm: 58.62,
          count: 2
        }
      ],
      designRule: "Caps for SN74HC574N tend to be distant (89.45mm median) — consider closer placement",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "decoupling-cd74hct14e",
      icValue: "CD74HCT14E",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "470PF_100V_AXIALWIDE",
          values: [
            "470PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 199.07,
          p25Mm: 138.56,
          p75Mm: 212.26,
          count: 64
        },
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_AXIALWIDE",
          values: [
            "0.1UF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 76.93,
          p25Mm: 50.83,
          p75Mm: 106.18,
          count: 58
        },
        {
          role: "bypass",
          preferredValue: "22PF_100V_AXIALWIDE",
          values: [
            "22PF_100V_AXIALWIDE"
          ],
          medianDistanceMm: 71.95,
          p25Mm: 7.33,
          p75Mm: 83.71,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "4.7UF_50V_RAD",
          values: [
            "4.7UF_50V_RAD"
          ],
          medianDistanceMm: 193.8,
          p25Mm: 123.75,
          p75Mm: 193.8,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "100PF_50V_AXIALWIDE",
          values: [
            "100PF_50V_AXIALWIDE"
          ],
          medianDistanceMm: 87.5,
          p25Mm: 5.64,
          p75Mm: 87.5,
          count: 2
        },
        {
          role: "bulk",
          preferredValue: "220UF_16V",
          values: [
            "220UF_16V"
          ],
          medianDistanceMm: 99.28,
          p25Mm: 24.77,
          p75Mm: 99.28,
          count: 2
        }
      ],
      designRule: "Caps for CD74HCT14E tend to be distant (126.84mm median) — consider closer placement",
      sourceDesigns: [
        "CPU-95"
      ]
    },
    {
      id: "decoupling-pcal6408ahkx",
      icValue: "PCAL6408AHKX",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 19.15,
          p25Mm: 11.11,
          p75Mm: 22.68,
          count: 42
        },
        {
          role: "bulk",
          preferredValue: "22UF_1206_10V1206",
          values: [
            "22UF_1206_10V1206"
          ],
          medianDistanceMm: 48.33,
          p25Mm: 37.57,
          p75Mm: 48.33,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "0.022UF_0603",
          values: [
            "0.022UF_0603"
          ],
          medianDistanceMm: 40.96,
          p25Mm: 40.96,
          p75Mm: 40.96,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 45.6,
          p25Mm: 45.6,
          p75Mm: 45.6,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 42.67,
          p25Mm: 42.67,
          p75Mm: 42.67,
          count: 2
        }
      ],
      designRule: "Caps for PCAL6408AHKX tend to be distant (19.86mm median) — consider closer placement",
      sourceDesigns: [
        "DC-DC_IO_expansion_board",
        "PCBLF0738-0_PIK"
      ]
    },
    {
      id: "decoupling-atsamd21j18a-aut",
      icValue: "ATSAMD21J18A-AUT",
      icCategory: "mcu",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 27.82,
          p25Mm: 15.98,
          p75Mm: 36.08,
          count: 50
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 21.37,
          p25Mm: 6.83,
          p75Mm: 27.52,
          count: 20
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 21.3,
          p25Mm: 2.89,
          p75Mm: 36.93,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 19.04,
          p25Mm: 15.38,
          p75Mm: 24.36,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 4.89,
          p25Mm: 3.98,
          p75Mm: 11.78,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 27.13,
          p25Mm: 15.33,
          p75Mm: 30.97,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 32.06,
          p25Mm: 31.32,
          p75Mm: 32.06,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "1.5PF_0402",
          values: [
            "1.5PF_0402"
          ],
          medianDistanceMm: 28.46,
          p25Mm: 28.46,
          p75Mm: 28.46,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0402",
          values: [
            "1000PF_0402"
          ],
          medianDistanceMm: 29.77,
          p25Mm: 29.77,
          p75Mm: 29.77,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0402",
          values: [
            "2200PF_0402"
          ],
          medianDistanceMm: 26.53,
          p25Mm: 26.53,
          p75Mm: 26.53,
          count: 2
        }
      ],
      designRule: "Caps for ATSAMD21J18A-AUT tend to be distant (24.36mm median) — consider closer placement",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "decoupling-nrf51822-qfaa-t",
      icValue: "NRF51822-QFAA-T",
      icCategory: "mcu",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V"
          ],
          medianDistanceMm: 41.06,
          p25Mm: 29.25,
          p75Mm: 57.09,
          count: 50
        },
        {
          role: "bulk",
          preferredValue: "10UF_1206_10%_25V",
          values: [
            "10UF_1206_10%_25V"
          ],
          medianDistanceMm: 40.98,
          p25Mm: 29.24,
          p75Mm: 53.19,
          count: 20
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603",
          values: [
            "1UF_0603"
          ],
          medianDistanceMm: 46.02,
          p25Mm: 33.29,
          p75Mm: 52.42,
          count: 12
        },
        {
          role: "bypass",
          preferredValue: "12PF_0603",
          values: [
            "12PF_0603"
          ],
          medianDistanceMm: 48.85,
          p25Mm: 39.8,
          p75Mm: 52.24,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "22PF_0603",
          values: [
            "22PF_0603"
          ],
          medianDistanceMm: 17.23,
          p25Mm: 17.23,
          p75Mm: 39.03,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0603",
          values: [
            "1000PF_0603"
          ],
          medianDistanceMm: 54.92,
          p25Mm: 35.91,
          p75Mm: 57.6,
          count: 6
        },
        {
          role: "bypass",
          preferredValue: "12PF_0402",
          values: [
            "12PF_0402"
          ],
          medianDistanceMm: 3.32,
          p25Mm: 2.55,
          p75Mm: 3.32,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "1.5PF_0402",
          values: [
            "1.5PF_0402"
          ],
          medianDistanceMm: 5.5,
          p25Mm: 5.5,
          p75Mm: 5.5,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1000PF_0402",
          values: [
            "1000PF_0402"
          ],
          medianDistanceMm: 1.28,
          p25Mm: 1.28,
          p75Mm: 1.28,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "2200PF_0402",
          values: [
            "2200PF_0402"
          ],
          medianDistanceMm: 2.64,
          p25Mm: 2.64,
          p75Mm: 2.64,
          count: 2
        }
      ],
      designRule: "Caps for NRF51822-QFAA-T tend to be distant (36.73mm median) — consider closer placement",
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "decoupling-r-78e5.0-0.5",
      icValue: "R-78E5.0-0.5",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805"
          ],
          medianDistanceMm: 39.33,
          p25Mm: 22.32,
          p75Mm: 50.59,
          count: 48
        },
        {
          role: "bulk",
          preferredValue: "470  µF ",
          values: [
            "470  µF "
          ],
          medianDistanceMm: 15.33,
          p25Mm: 10.27,
          p75Mm: 20.68,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 55.77,
          p25Mm: 52.16,
          p75Mm: 60.39,
          count: 6
        },
        {
          role: "bulk",
          preferredValue: "100UF_35V_ALE",
          values: [
            "100UF_35V_ALE"
          ],
          medianDistanceMm: 21.39,
          p25Mm: 21.17,
          p75Mm: 21.39,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "1UF_0603_10%_25V",
          values: [
            "1UF_0603_10%_25V"
          ],
          medianDistanceMm: 38.42,
          p25Mm: 22.96,
          p75Mm: 38.42,
          count: 2
        }
      ],
      designRule: "Caps for R-78E5.0-0.5 tend to be distant (38.82mm median) — consider closer placement",
      sourceDesigns: [
        "Main_Board"
      ]
    },
    {
      id: "decoupling-pmic_linear_ap2139sot23-5",
      icValue: "PMIC_LINEAR_AP2139SOT23-5",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 57.08,
          p25Mm: 19.71,
          p75Mm: 78.81,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 33.32,
          p25Mm: 12.06,
          p75Mm: 49.85,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 62.4,
          p25Mm: 57.54,
          p75Mm: 62.4,
          count: 4
        }
      ],
      designRule: "Caps for PMIC_LINEAR_AP2139SOT23-5 tend to be distant (49.85mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-charger_fm4057",
      icValue: "CHARGER_FM4057",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 39.33,
          p25Mm: 12.15,
          p75Mm: 68.32,
          count: 22
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 24.22,
          p25Mm: 3.93,
          p75Mm: 39.33,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 52.52,
          p25Mm: 47.74,
          p75Mm: 52.52,
          count: 4
        }
      ],
      designRule: "Caps for CHARGER_FM4057 tend to be distant (39.33mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-bosch_bme688",
      icValue: "BOSCH_BME688",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 33.63,
          p25Mm: 24.39,
          p75Mm: 68.88,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 70.1,
          p25Mm: 52.28,
          p75Mm: 79.69,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 38.46,
          p25Mm: 35.34,
          p75Mm: 38.46,
          count: 4
        }
      ],
      designRule: "Caps for BOSCH_BME688 tend to be distant (38.46mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-memsic_mc3630",
      icValue: "MEMSIC_MC3630",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 30.17,
          p25Mm: 22.86,
          p75Mm: 64.64,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 64.9,
          p25Mm: 46.4,
          p75Mm: 74.49,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 37.18,
          p25Mm: 34.79,
          p75Mm: 37.18,
          count: 4
        }
      ],
      designRule: "Caps for MEMSIC_MC3630 tend to be distant (37.18mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-hoperf_rfm97cwipc",
      icValue: "HOPERF_RFM97CWIPC",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 24.91,
          p25Mm: 18.18,
          p75Mm: 31.15,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 26.43,
          p25Mm: 19.72,
          p75Mm: 35.65,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 7.79,
          p25Mm: 2.95,
          p75Mm: 7.79,
          count: 4
        }
      ],
      designRule: "Caps for HOPERF_RFM97CWIPC tend to be distant (24.8mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-pmic_linear_ap2138sot23",
      icValue: "PMIC_LINEAR_AP2138SOT23",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 61.03,
          p25Mm: 23.08,
          p75Mm: 82.87,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 36.9,
          p25Mm: 16.09,
          p75Mm: 53.98,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 66.98,
          p25Mm: 62.15,
          p75Mm: 66.98,
          count: 4
        }
      ],
      designRule: "Caps for PMIC_LINEAR_AP2138SOT23 tend to be distant (53.98mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-esp32-s3-mini-1-n8",
      icValue: "ESP32-S3-MINI-1-N8",
      icCategory: "mcu",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "100nF",
          values: [
            "100nF"
          ],
          medianDistanceMm: 23.64,
          p25Mm: 16.7,
          p75Mm: 32.97,
          count: 40
        },
        {
          role: "bulk",
          preferredValue: "22uF",
          values: [
            "22uF"
          ],
          medianDistanceMm: 18.85,
          p25Mm: 3.45,
          p75Mm: 28.36,
          count: 8
        },
        {
          role: "bypass",
          preferredValue: "TBD",
          values: [
            "TBD"
          ],
          medianDistanceMm: 23.11,
          p25Mm: 20.18,
          p75Mm: 23.11,
          count: 4
        }
      ],
      designRule: "Caps for ESP32-S3-MINI-1-N8 tend to be distant (21.07mm median) — consider closer placement",
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "decoupling-tdc1000pw",
      icValue: "TDC1000PW",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 6.39,
          p25Mm: 2.89,
          p75Mm: 14.28,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "10UF_0805",
          values: [
            "10UF_0805"
          ],
          medianDistanceMm: 5.48,
          p25Mm: 5.34,
          p75Mm: 5.48,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 4.31,
          p25Mm: 4.27,
          p75Mm: 4.31,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "47PF_0603",
          values: [
            "47PF_0603"
          ],
          medianDistanceMm: 6.0,
          p25Mm: 6.0,
          p75Mm: 6.0,
          count: 2
        }
      ],
      designRule: "Bypass caps for TDC1000PW typically 5-15mm away (median: 6.0mm)",
      sourceDesigns: [
        "UM0017PCB",
        "UM0017PCB_2nd_Round"
      ]
    },
    {
      id: "decoupling-ap2138n-3.3trg1sot-23",
      icValue: "AP2138N-3.3TRG1SOT-23",
      icCategory: "other",
      occurrences: 2,
      caps: [
        {
          role: "bypass",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_50V_0603"
          ],
          medianDistanceMm: 17.6,
          p25Mm: 1.6,
          p75Mm: 28.74,
          count: 14
        },
        {
          role: "bulk",
          preferredValue: "10UF_0805",
          values: [
            "10UF_0805"
          ],
          medianDistanceMm: 3.62,
          p25Mm: 3.49,
          p75Mm: 3.62,
          count: 4
        },
        {
          role: "bypass",
          preferredValue: "10NF_0805",
          values: [
            "10NF_0805"
          ],
          medianDistanceMm: 16.97,
          p25Mm: 16.91,
          p75Mm: 16.97,
          count: 2
        },
        {
          role: "bypass",
          preferredValue: "47PF_0603",
          values: [
            "47PF_0603"
          ],
          medianDistanceMm: 7.13,
          p25Mm: 7.13,
          p75Mm: 7.13,
          count: 2
        }
      ],
      designRule: "Caps for AP2138N-3.3TRG1SOT-23 tend to be distant (16.77mm median) — consider closer placement",
      sourceDesigns: [
        "UM0017PCB",
        "UM0017PCB_2nd_Round"
      ]
    }
  ];
