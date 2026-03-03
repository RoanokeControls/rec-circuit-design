import { MinedPowerSupply, TriacCircuit, EmcComponent } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const minedPowerSupplies: MinedPowerSupply[] = [
    {
      id: "supply-ncp1117",
      regulator: "NCP1117",
      topology: "ldo",
      occurrences: 41,
      inputNets: {
        "+3.3V": 35,
        "+5V": 29,
        "+3.3V_ESP": 3,
        "+12V": 3,
        "+8.5V": 1
      },
      outputNets: {
        "+3.3V": 35,
        "+5V": 29,
        "+3.3V_ESP": 3,
        "+12V": 3,
        "+8.5V": 1
      },
      components: [
        {
          role: "D",
          preferredValue: "PMBD7000",
          values: [
            "1N4007SMT",
            "1N5819HW-7-F",
            "BAT54HT1G",
            "GP_1000V_1A_SMASMA",
            "GP_1000V_1A_SOD-123F",
            "GP_200V_3A",
            "HLMP-3301-F00DD",
            "LED_RED_0805",
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "LTST-C193KSKT-5ALITE-ON_LTST-C193KSKT-5A_0_0",
            "LTST-C193TBKT-5ALITE-ON_LTST-C193TBKT-5A_0_0",
            "MURA120T3G",
            "PMBD7000",
            "SBD_20V_500MA",
            "ZENER_15V_SMA",
            "ZENER_22V"
          ],
          count: 472
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.022UF_0603",
            "0.1UF_0603",
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "0.1UF_0805",
            "0.1UF_50V_0603",
            "0.33F-5.5V-SUPERCAP",
            "1.5PF_0402",
            "1000PF_0402",
            "1000PF_0603",
            "100NF_0805",
            "100UF_1206_6.3V1206",
            "100UF_25V_ALE",
            "100UF_35V_ALE",
            "100UF_35V_RAD",
            "10NF_0805",
            "10UF_1206_10%_25V",
            "12PF_0402",
            "12PF_0603",
            "150PF_2KV",
            "1F_2.7V_RAD",
            "1PF_0402",
            "1UF_0603",
            "2.2UF_0603",
            "2200PF_0402",
            "2200PF_0603",
            "220UF_16V",
            "22PF_0603",
            "22UF_10V1206",
            "22UF_1206_10V",
            "22UF_1206_10V1206",
            "22UF_1206_25V",
            "4.7UF_0805",
            "47NF_0402",
            "680UF_35V_ALE"
          ],
          count: 1429
        },
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "0.03^_2512",
            "1.2K_0603",
            "1.62K_0805_0.1%",
            "100K_0603",
            "100^_1206_1%_0.5W",
            "10K_0603",
            "10K_0603_.1%",
            "10K_0805_1%",
            "10M_0603",
            "10^_0603",
            "180^_0603",
            "1K_0603",
            "1K_0805_1%_0.125W",
            "1M_0603_1%",
            "2.2K_0805",
            "2.7K_0603",
            "2.7K_0805",
            "22K_0603",
            "27K_0805_0.125W",
            "3.3K_0805_1%",
            "4.02K_0603",
            "4.7K_0603",
            "43^_0805",
            "470^_0603",
            "47K_0603",
            "5.1K_0603",
            "5.2K_0805",
            "6.34K_0805",
            "75^_0805",
            "8.66K_0603",
            "FERRITE_330^_0805",
            "JUMPER_0805",
            "JUMPER_0805_2.5A",
            "JUMPER_1206_1/4W",
            "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
          ],
          count: 728
        },
        {
          role: "L",
          preferredValue: "10NH_250MA",
          values: [
            "10NH_250MA"
          ],
          count: 2
        }
      ],
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "12_inch_CD_Timer_Control",
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "Alpha_Digit",
        "Alpha_Digit_PIK",
        "Alpha_sign_control",
        "Alpha_sign_control_PIK",
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "CarterHoffmann485DisplayAlternate",
        "Chevy_Test_IC",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "Derived2DPCB_fixoptolocators v1",
        "FGLF0788-01_PIK",
        "HDMI_Display",
        "LCD_Control",
        "Livewell Schematic",
        "NuvoLiteBrick_PCB"
      ]
    },
    {
      id: "supply-lm317",
      regulator: "LM317",
      topology: "ldo",
      occurrences: 21,
      inputNets: {
        "+3.3V": 8,
        "+5V": 6,
        "+3.3V1": 1,
        "+3.3V2": 1,
        "+3.3V3": 1
      },
      outputNets: {
        "+3.3V": 8,
        "+5V": 6,
        "+3.3V1": 1,
        "+3.3V2": 1,
        "+3.3V3": 1
      },
      components: [
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "1.2K_0603",
            "1.62K_0805_1%",
            "100K_0603",
            "10K_0603",
            "10K_0805_1%",
            "180^_0603",
            "1K_0805_1%_0.125W",
            "1M_0603_1%",
            "2.7K_0603",
            "3.3K_0805_1%",
            "3.6^_2512",
            "30^_1206",
            "4.7K_0603",
            "JUMPER_0805",
            "JUMPER_0805_2.5A",
            "JUMPER_1206_1/2W"
          ],
          count: 159
        },
        {
          role: "D",
          preferredValue: "GP_1000V_1A_SMASMA",
          values: [
            "GP_1000V_1A_SMASMA",
            "GP_200V_3A",
            "SBD_20V_500MA"
          ],
          count: 6
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "100UF_1206_6.3V1206",
            "2.2UF_0603",
            "22UF_1206_10V1206"
          ],
          count: 167
        }
      ],
      sourceDesigns: [
        "12_in_CD_Tmr_Ctrl_Small",
        "30in_segment_driver",
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
      id: "supply-irm-02",
      regulator: "IRM-02",
      topology: "ac-dc",
      occurrences: 14,
      inputNets: {
        "+5V": 14,
        AC_COM: 11,
        AC_IN: 6,
        AC_HOT: 5,
        AC_HOT_FUSED: 3
      },
      outputNets: {
        "+5V": 14,
        AC_COM: 11,
        AC_IN: 6,
        AC_HOT: 5,
        AC_HOT_FUSED: 3
      },
      components: [
        {
          role: "D",
          preferredValue: "PMBD7000",
          values: [
            "1N4007SMT",
            "GP_1000V_1A_SMASMA",
            "GP_1000V_1A_SOD-123F",
            "HLMP-3301-F00DD",
            "LED_RED_0805",
            "PMBD7000"
          ],
          count: 144
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_50V_0603",
          values: [
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "0.1UF_0805",
            "0.1UF_50V_0603",
            "100NF_0805",
            "100UF_25V_ALE",
            "100UF_35V_ALE"
          ],
          count: 286
        },
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "1.2K_0603",
            "1.62K_0805_0.1%",
            "100^_1210_5%_0.5W",
            "10K_0603",
            "150^_0603",
            "3306F-1-103",
            "620^_1210",
            "75^_0805",
            "JUMPER_0805_2.5A"
          ],
          count: 115
        }
      ],
      sourceDesigns: [
        "Astrodyne_chevy_replacement",
        "Astrodyne_chevy_replacement_BBU",
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "Clamshell_Grill",
        "Clamshell_Grill_PIK",
        "PCBLF0714-1_PIK",
        "PCBLF0752-0_PIK",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control",
        "ZLF0053",
        "ZLF0053_PIK",
        "ZLF0053_v44_PIK"
      ]
    },
    {
      id: "supply-mc7805",
      regulator: "MC7805",
      topology: "linear",
      occurrences: 10,
      inputNets: {
        "+5V": 8,
        "+24V": 7,
        "+36V": 3,
        "+12V": 1
      },
      outputNets: {
        "+5V": 8,
        "+24V": 7,
        "+36V": 3,
        "+12V": 1
      },
      components: [
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_5%_50V",
          values: [
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "0.1UF_0805",
            "0.1UF_50V_0603",
            "0.33F-5.5V-SUPERCAP",
            "1000UF_50V_RAD",
            "100UF_1206_6.3V1206",
            "100UF_35V_ALE",
            "100UF_35V_RAD",
            "10NF_0805",
            "10UF_1210",
            "12PF_0603",
            "150PF_2KV",
            "2200PF_0603",
            "220UF_16V",
            "22UF_1206_10V",
            "22UF_1206_10V1206",
            "4.7UF_0805",
            "680UF_35V_ALE"
          ],
          count: 321
        },
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "0^_AXIAL",
            "1.2K_0603",
            "100K_0603",
            "10K_0603",
            "10^_0603",
            "2.2K_0805",
            "4.02K_0603",
            "4.7K_0805_1%_0.125W",
            "680^_2512",
            "8.66K_0603",
            "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
            "SQMR5220RJ"
          ],
          count: 88
        },
        {
          role: "D",
          preferredValue: "MURA120T3G",
          values: [
            "1N4007SMT",
            "BAT54HT1G",
            "LED_RED_0805",
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "MURA120T3G",
            "SBD_40V_3A",
            "ZENER_22V"
          ],
          count: 37
        },
        {
          role: "L",
          preferredValue: "3.3UH_3.2ASRN6045",
          values: [
            "3.3UH_3.2ASRN6045"
          ],
          count: 3
        }
      ],
      sourceDesigns: [
        "Auto_Test_Circuit",
        "FGLF0623-03_PIK",
        "FGLF0623_Triac_Board",
        "FGLF0623_Triac_Board_Original",
        "NuvoLiteBrick_PCB",
        "NuvoLite_PCB",
        "NuvoLite_PCB_PIK_Bottom",
        "NuvoLite_PCB_PIK_Top"
      ]
    },
    {
      id: "supply-tps54",
      regulator: "TPS54",
      topology: "buck",
      occurrences: 7,
      inputNets: {
        AVDD: 3,
        "+24V": 2
      },
      outputNets: {
        AVDD: 3,
        "+24V": 2
      },
      components: [
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "0.01^_1206",
            "100K_0805",
            "10K_0603",
            "10K_0805_1%",
            "10^_0603",
            "140K_0603",
            "18.7K_0603",
            "2.7K_0603",
            "2^_0603",
            "4.02K_0603",
            "4.7K_0805_5%_0.125W",
            "47K_0603",
            "49.9K_0603",
            "53.6K_0603",
            "75K_0603",
            "8.66K_0603",
            "825K_0805_1%"
          ],
          count: 99
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0805",
            "0.1UF_50V_0603",
            "0.33UF_0805",
            "100PF_0603",
            "100UF_25V_ALE",
            "100UF_35V_ALE",
            "10NF_0805",
            "150PF_0805",
            "18pF",
            "1UF_0603",
            "1UF_0805_20%",
            "2.2UF_0805_10%_50V",
            "2200PF_0603",
            "2200UF_50V_RAD",
            "220UF_50V",
            "22UF_0805",
            "22UF_1206_25V",
            "3300PF_1206",
            "4.7UF_0805",
            "470PF_0603"
          ],
          count: 331
        },
        {
          role: "L",
          preferredValue: "22UH_1.9AIND_IHLP-2020CZ-M",
          values: [
            "22UH_1.9AIND_IHLP-2020CZ-M",
            "PA4342.103ANLT",
            "PA4342.153NLTIND_PA4342.153NLT_PUL"
          ],
          count: 10
        },
        {
          role: "D",
          preferredValue: "SBD_60V_3A",
          values: [
            "B140-13-F",
            "LED_RED_0805",
            "MBR230S1F-7",
            "SBD_60V_3A",
            "TVS_25V_3ASOD-523F/0603",
            "ZENER_3.3V"
          ],
          count: 61
        }
      ],
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment",
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "supply-spx3819",
      regulator: "SPX3819",
      topology: "ldo",
      occurrences: 6,
      inputNets: {
        "+3.3V": 3,
        "+5V_SUPPLY": 3,
        "+5V": 3
      },
      outputNets: {
        "+3.3V": 3,
        "+5V_SUPPLY": 3,
        "+5V": 3
      },
      components: [
        {
          role: "R",
          preferredValue: "18.7K_0603",
          values: [
            "0.01^_1206",
            "100^_0603",
            "10K_0603",
            "10^_0603",
            "18.7K_0603",
            "1K_0603",
            "2.7K_0603",
            "4.02K_0603",
            "75K_0603",
            "8.66K_0603"
          ],
          count: 57
        },
        {
          role: "input_cap",
          preferredValue: "4.7UF_0805",
          values: [
            "0.1UF_50V_0603",
            "100PF_0603",
            "100UF_50V",
            "10NF_0805",
            "1UF_0603",
            "2200PF_0603",
            "220UF_16V",
            "220UF_50V",
            "4.7UF_0805"
          ],
          count: 183
        },
        {
          role: "D",
          preferredValue: "B140-13-F",
          values: [
            "B140-13-F"
          ],
          count: 6
        },
        {
          role: "L",
          preferredValue: "22UH_1.9AIND_IHLP-2020CZ-M",
          values: [
            "22UH_1.9AIND_IHLP-2020CZ-M"
          ],
          count: 3
        }
      ],
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "supply-irm-10",
      regulator: "IRM-10",
      topology: "ac-dc",
      occurrences: 5,
      inputNets: {
        "+12V": 4,
        "+24V": 1
      },
      outputNets: {
        "+12V": 4,
        "+24V": 1
      },
      components: [
        {
          role: "input_cap",
          preferredValue: "0.1UF_0805",
          values: [
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "0.1UF_0805",
            "0.1UF_50V_0603",
            "0.33F-5.5V-SUPERCAP",
            "100UF_1206_6.3V1206",
            "100UF_35V_ALE",
            "100UF_35V_RAD",
            "10NF_0805",
            "12PF_0603",
            "1UF_0603_10%_25V",
            "2200PF_0603",
            "220UF_16V",
            "22UF_10V1206",
            "22UF_1206_10V",
            "22UF_1206_25V",
            "4.7UF_0805",
            "470  µF "
          ],
          count: 187
        },
        {
          role: "D",
          preferredValue: "LED_RED_0805",
          values: [
            "1N4007SMT",
            "74LVC1G17SE-7DIODES_74LVC1G17SE-7_0_0",
            "BAT54HT1G",
            "LED_RED_0805",
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "MURA120T3G",
            "SBD_40V_3A",
            "ZENER_100V_SMA"
          ],
          count: 19
        },
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "10.5K_0805_0.1%",
            "100K_0603",
            "10K_0603",
            "10^_0603",
            "140K_0603",
            "1K_0805_0.1%",
            "1M_0805_1%",
            "1M_AXIAL",
            "2.2K_0805",
            "220K_0805",
            "3.3K_0603",
            "4.02K_0603",
            "620^_1210",
            "8.66K_0603",
            "86.6K_0.4W",
            "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
          ],
          count: 62
        }
      ],
      sourceDesigns: [
        "HDMI_Display",
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand",
        "NuvoLiteBrick_PCB"
      ]
    },
    {
      id: "supply-irm-15",
      regulator: "IRM-15",
      topology: "ac-dc",
      occurrences: 4,
      inputNets: {
        "+5V": 4,
        AC_COMMON: 3,
        AC_HOT_FUSED: 3
      },
      outputNets: {
        "+5V": 4,
        AC_COMMON: 3,
        AC_HOT_FUSED: 3
      },
      components: [
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V",
            "0.1UF_0603_5%_50V",
            "0.1UF_0805",
            "100UF_1206_6.3V1206",
            "100UF_35V_ALE",
            "10UF_1206_10%_25V",
            "12PF_0603",
            "1F_2.7V_RAD",
            "2.2UF_0603",
            "220UF_16V",
            "22UF_10V1206",
            "22UF_1206_10V",
            "22UF_1206_10V1206",
            "22UF_1206_25V"
          ],
          count: 197
        },
        {
          role: "R",
          preferredValue: "620^_1210",
          values: [
            "10K_0603",
            "1K_0805_1%_0.125W",
            "1M_0603_1%",
            "22K_0603",
            "5.1K_0603",
            "620^_1210",
            "FERRITE_330^_0805",
            "JUMPER_0805_2.5A",
            "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
          ],
          count: 34
        },
        {
          role: "D",
          preferredValue: "PMBD7000",
          values: [
            "1N5819HW-7-F",
            "GP_1000V_1A_SMASMA",
            "HLMP-3301-F00DD",
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "LTST-C193TBKT-5ALITE-ON_LTST-C193TBKT-5A_0_0",
            "PMBD7000"
          ],
          count: 47
        }
      ],
      sourceDesigns: [
        "All-In-One_Schematic_IO_Board",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "HDMI_Display",
        "PCBLF0827-0_PIK"
      ]
    },
    {
      id: "supply-irm_03",
      regulator: "IRM_03",
      topology: "ac-dc",
      occurrences: 3,
      inputNets: {
        "+3.3V": 3,
        AC_HOT_FUSED: 3
      },
      outputNets: {
        "+3.3V": 3,
        AC_HOT_FUSED: 3
      },
      components: [
        {
          role: "R",
          preferredValue: "10K_0603",
          values: [
            "1.2K_0603",
            "1.62K_0805_0.1%",
            "100K_0603",
            "10K_0603",
            "150^_0603",
            "620^_1210",
            "JUMPER_0603_1/10W",
            "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
          ],
          count: 75
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.1UF_0603_10%_16V",
            "100UF_1206_6.3V1206",
            "100UF_35V_ALE",
            "22UF_1206_10V1206"
          ],
          count: 123
        },
        {
          role: "D",
          preferredValue: "PMBD7000",
          values: [
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "LTST-C193TBKT-5ALITE-ON_LTST-C193TBKT-5A_0_0",
            "PMBD7000",
            "SBD_40V_1A_SMAH",
            "SUNLED_XZMDKCBDDG45S-9SUNLED_XZMDKCBDDG45S-9_0_0"
          ],
          count: 62
        }
      ],
      sourceDesigns: [
        "All-In-One_Schematic",
        "Bottom",
        "ProSmoker_PK100"
      ]
    },
    {
      id: "supply-aoz6662",
      regulator: "AOZ6662",
      topology: "buck",
      occurrences: 3,
      inputNets: {
        "+5V": 1
      },
      outputNets: {
        "+5V": 1
      },
      components: [
        {
          role: "R",
          preferredValue: "30K_0603",
          values: [
            "100K_0603",
            "10K_0603",
            "150^_0603",
            "15K_0805_0.1%",
            "26.1K_0603",
            "27K_0805_0.125W",
            "30K_0603",
            "68K_0603",
            "86.6K_0805",
            "JUMPER_0805_2.5A"
          ],
          count: 66
        },
        {
          role: "input_cap",
          preferredValue: "0.1UF_0603_10%_16V",
          values: [
            "0.022UF_0603",
            "0.1UF_0603_10%_16V",
            "1000PF_0603",
            "1UF_0603_10%_25V",
            "22UF_1206_10V1206"
          ],
          count: 81
        },
        {
          role: "D",
          preferredValue: "PMBD7000",
          values: [
            "LTST-C193KGKT-5ALITE-ON_LTST-C193KGKT-5A_0_0",
            "LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "PMBD7000",
            "ZENER_15V_SMA"
          ],
          count: 32
        },
        {
          role: "L",
          preferredValue: "3.3UH_3.2ASRN6045",
          values: [
            "3.3UH_3.2ASRN6045"
          ],
          count: 3
        }
      ],
      sourceDesigns: [
        "DC-DC_IO_expansion_board",
        "ESP32_Programming_board",
        "PCBLF0738-0_PIK"
      ]
    },
    {
      id: "supply-irm-30",
      regulator: "IRM-30",
      topology: "ac-dc",
      occurrences: 1,
      inputNets: {},
      outputNets: {},
      components: [],
      sourceDesigns: [
        "Grill_remote_lid"
      ]
    }
  ];

export const triacCircuits: TriacCircuit[] = [
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q3",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q4",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q5",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [],
      snubber_caps: 12
    },
    {
      design: "12_inch_CD_Timer_Control",
      triacs: [
        {
          name: "Q1",
          value: "MMBT3906LT1"
        },
        {
          name: "Q2",
          value: "MMBT3906LT1"
        },
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 12
    },
    {
      design: "30in_segment_driver",
      triacs: [
        {
          name: "U1",
          value: "74HCT4094D,112"
        },
        {
          name: "VR9",
          value: "LD1117S50CTRSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 5
    },
    {
      design: "3_Bank_Opto",
      triacs: [
        {
          name: "U1",
          value: "TCST1103"
        },
        {
          name: "U2",
          value: "TCST1103"
        },
        {
          name: "U3",
          value: "TCST1103"
        }
      ],
      optos: [],
      snubber_caps: 0
    },
    {
      design: "All-In-One_Schematic_IO_Board",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q2",
          value: "T1235-600G-TR"
        },
        {
          name: "Q3",
          value: "T1235-600G-TR"
        },
        {
          name: "Q4",
          value: "T1235-600G-TR"
        },
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q6",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q5",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q7",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "VR3",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [
        {
          name: "U5",
          value: "MOC3052SM"
        },
        {
          name: "U7",
          value: "MOC3052SM"
        },
        {
          name: "U8",
          value: "MOC3052SM"
        },
        {
          name: "U6",
          value: "MOC3052SM"
        }
      ],
      snubber_caps: 28
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q2",
          value: "T1235-600G-TR"
        },
        {
          name: "Q3",
          value: "T1235-600G-TR"
        },
        {
          name: "Q4",
          value: "T1235-600G-TR"
        },
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q6",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q5",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q7",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "VR3",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [
        {
          name: "U5",
          value: "MOC3052SM"
        },
        {
          name: "U7",
          value: "MOC3052SM"
        },
        {
          name: "U8",
          value: "MOC3052SM"
        },
        {
          name: "U6",
          value: "MOC3052SM"
        }
      ],
      snubber_caps: 33
    },
    {
      design: "All-In-One_Schematic",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q2",
          value: "T1235-600G-TR"
        },
        {
          name: "Q3",
          value: "T1235-600G-TR"
        },
        {
          name: "Q4",
          value: "T1235-600G-TR"
        },
        {
          name: "Q3A",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q2A",
          value: "BTA12-600BWRG"
        }
      ],
      optos: [
        {
          name: "U5",
          value: "MOC3052SM"
        },
        {
          name: "U7",
          value: "MOC3052SM"
        },
        {
          name: "U8",
          value: "MOC3052SM"
        },
        {
          name: "U6",
          value: "MOC3052SM"
        }
      ],
      snubber_caps: 27
    },
    {
      design: "Alpha_Digit_PIK",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 4
    },
    {
      design: "Alpha_Digit",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 4
    },
    {
      design: "Alpha_sign_control_PIK",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 16
    },
    {
      design: "Alpha_sign_control",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        }
      ],
      optos: [],
      snubber_caps: 16
    },
    {
      design: "Astrodyne_chevy_replacement_BBU",
      triacs: [
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q1",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q3",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q2",
          value: "BTA12-600BWRG"
        }
      ],
      optos: [
        {
          name: "U1",
          value: "MOC3063SR2M"
        },
        {
          name: "U2",
          value: "MOC3063SR2M"
        },
        {
          name: "U4",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 16
    },
    {
      design: "Astrodyne_chevy_replacement",
      triacs: [
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q1",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q3",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q2",
          value: "BTA12-600BWRG"
        }
      ],
      optos: [
        {
          name: "U1",
          value: "MOC3063SR2M"
        },
        {
          name: "U2",
          value: "MOC3063SR2M"
        },
        {
          name: "U4",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 16
    },
    {
      design: "Astrodyne_replacement",
      triacs: [
        {
          name: "Q1",
          value: "MMBT3906LT1"
        },
        {
          name: "Q2",
          value: "MMBT3906LT1"
        },
        {
          name: "Q3",
          value: "MMBT3906LT1"
        }
      ],
      optos: [],
      snubber_caps: 2
    },
    {
      design: "BGW_Fan_Control_PIK",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q6",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [
        {
          name: "U1",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 12
    },
    {
      design: "BGW_Fan_Control",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q6",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [
        {
          name: "U1",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 12
    },
    {
      design: "Bottom",
      triacs: [
        {
          name: "Q1",
          value: "T1235-600G-TR"
        },
        {
          name: "Q2",
          value: "T1235-600G-TR"
        },
        {
          name: "Q3",
          value: "T1235-600G-TR"
        },
        {
          name: "Q4",
          value: "T1235-600G-TR"
        }
      ],
      optos: [
        {
          name: "U5",
          value: "MOC3052SM"
        },
        {
          name: "U7",
          value: "MOC3052SM"
        },
        {
          name: "U8",
          value: "MOC3052SM"
        },
        {
          name: "U6",
          value: "MOC3052SM"
        }
      ],
      snubber_caps: 24
    },
    {
      design: "CPU-95",
      triacs: [
        {
          name: "U13",
          value: "SN74HCT240N"
        },
        {
          name: "U12",
          value: "SN74HCT240N"
        },
        {
          name: "U15",
          value: "SN74HCT240N"
        },
        {
          name: "U11",
          value: "SN74HCT240N"
        },
        {
          name: "U7",
          value: "SN74HCT244N"
        },
        {
          name: "U2",
          value: "SN74HCT244N"
        },
        {
          name: "U1",
          value: "SN74HCT244N"
        }
      ],
      optos: [],
      snubber_caps: 29
    },
    {
      design: "CarterHoffmann485DisplayAlternate",
      triacs: [
        {
          name: "Q5",
          value: "MMBT3906LT1"
        },
        {
          name: "Q6",
          value: "MMBT3906LT1"
        },
        {
          name: "Q7",
          value: "MMBT3906LT1"
        },
        {
          name: "Q8",
          value: "MMBT3906LT1"
        },
        {
          name: "VR1",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "U14",
          value: "ST3485EBDRSTMICROELECTRONICS_ST3485EBDR_0_0"
        }
      ],
      optos: [],
      snubber_caps: 10
    },
    {
      design: "Chevy_Test_IC",
      triacs: [
        {
          name: "U1",
          value: "FT232RL-REEL"
        },
        {
          name: "VR1",
          value: "NCP1117ST33T3G"
        }
      ],
      optos: [],
      snubber_caps: 4
    },
    {
      design: "Clamshell_Grill_PIK",
      triacs: [
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [],
      snubber_caps: 15
    },
    {
      design: "Clamshell_Grill",
      triacs: [
        {
          name: "VR2",
          value: "NCP1117ST33T3GSOT-223"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [],
      snubber_caps: 15
    },
    {
      design: "DC-DC_IO_expansion_board",
      triacs: [
        {
          name: "Q1",
          value: "MMBT2907ALT1"
        }
      ],
      optos: [],
      snubber_caps: 23
    },
    {
      design: "Derived2DPCB_fixoptolocators v1",
      triacs: [
        {
          name: "VR1",
          value: "NCP1117ST33T3G"
        },
        {
          name: "IC2",
          value: "NRF51822-QFAA-T"
        }
      ],
      optos: [],
      snubber_caps: 26
    },
    {
      design: "ESP32_LCD_Design_Touch",
      triacs: [
        {
          name: "Q3",
          value: "MMBT3906LT1"
        },
        {
          name: "Q6",
          value: "MMBT3906LT1"
        }
      ],
      optos: [],
      snubber_caps: 0
    },
    {
      design: "ESP32_LCD_PCB",
      triacs: [
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q3",
          value: "MMBT3906LT1"
        },
        {
          name: "Q6",
          value: "MMBT3906LT1"
        }
      ],
      optos: [],
      snubber_caps: 8
    },
    {
      design: "ESP32_LoRa_1_Channel_Gateway",
      triacs: [
        {
          name: "Q1",
          value: "MBT3904DW1T1"
        }
      ],
      optos: [],
      snubber_caps: 3
    },
    {
      design: "ESP32_Programming_board",
      triacs: [
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "U1",
          value: "FT232RL-REEL"
        }
      ],
      optos: [],
      snubber_caps: 6
    },
    {
      design: "FGLF0623-03_PIK",
      triacs: [
        {
          name: "Q3",
          value: "BTA12-600BWRG_RIGHT_ANGLE"
        },
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q4",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q5",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q9",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q8",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [
        {
          name: "U3",
          value: "MOC3052SM"
        },
        {
          name: "U2",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 7
    },
    {
      design: "FGLF0623_Triac_Board_Original",
      triacs: [
        {
          name: "Q3",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q1",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q2",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q4",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q5",
          value: "MMBT3904LT1_SOT23"
        },
        {
          name: "Q9",
          value: "BTA12-600BWRG"
        },
        {
          name: "Q8",
          value: "MMBT3904LT1_SOT23"
        }
      ],
      optos: [
        {
          name: "U3",
          value: "MOC3052SM"
        },
        {
          name: "U2",
          value: "MOC3063SR2M"
        }
      ],
      snubber_caps: 7
    }
  ];

export const emcComponents: EmcComponent[] = [
    {
      type: "varistor",
      count: 22,
      values: {
        "275V_VARISTORB": 15,
        "150V_VARISTOR": 3,
        "275V_10MM_VARISTOR": 3,
        "47V_VARISTORB": 1
      },
      designCount: 22
    },
    {
      type: "ferrite_bead",
      count: 116,
      values: {
        "FERRITE_330^_0805": 98,
        "FERRITE_60^_0805": 18
      },
      designCount: 15
    },
    {
      type: "tvs_diode",
      count: 9,
      values: {
        "TVS_300V_1.3A": 3,
        SMCJ20CA: 3,
        "TVS_25V_3ASOD-523F/0603": 2,
        SBD_40V_2A_SMBJSMBJ: 1
      },
      designCount: 9
    }
  ];

export const fuseRatings: { rating: string; count: number; designCount: number }[] = [
    {
      rating: "FUSECLIP",
      count: 82,
      designCount: 22
    },
    {
      rating: "2.4MMX3.5MM_BOTTOM_PAD",
      count: 65,
      designCount: 6
    },
    {
      rating: "unknown",
      count: 46,
      designCount: 25
    },
    {
      rating: "0.75A_POLYSWB",
      count: 9,
      designCount: 9
    },
    {
      rating: "63969-1",
      count: 8,
      designCount: 2
    },
    {
      rating: "3A_POLYSW",
      count: 4,
      designCount: 4
    },
    {
      rating: "0685T1000-01FUSE_0685T_BEL",
      count: 4,
      designCount: 2
    },
    {
      rating: "LTW-006DCG-E2LED_LTW-006DCG-E2_LTO",
      count: 3,
      designCount: 1
    },
    {
      rating: "LITTELFUSE_INC_0PTF0078PLITTELFUSE_INC_0PTF0078P_0_0",
      count: 2,
      designCount: 1
    },
    {
      rating: "1812L200/16",
      count: 1,
      designCount: 1
    },
    {
      rating: "MFFSMF050",
      count: 1,
      designCount: 1
    }
  ];
