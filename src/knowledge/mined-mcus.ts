import { McuProfile } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const mcuProfiles: McuProfile[] = [
    {
      id: "mcu-pic18f26",
      family: "PIC18",
      partNumber: "PIC18F26",
      occurrences: 27,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 73
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 49
        },
        {
          value: "2.2UF_0603",
          count: 25
        },
        {
          value: "22UF_1206_10V1206",
          count: 18
        },
        {
          value: "100UF_35V_ALE",
          count: 17
        },
        {
          value: "100UF_1206_6.3V1206",
          count: 10
        }
      ],
      resetCircuit: {
        pullupValue: "1.2K_0603",
        capValue: "0.1UF_0603_10%_16V"
      },
      programmingInterface: "ICSP",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [
        "PIC18F26",
        "RP2040",
        "ESP32-WROVER"
      ],
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
      id: "mcu-esp32-wrover",
      family: "ESP32",
      partNumber: "ESP32-WROVER",
      occurrences: 16,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 120
        },
        {
          value: "100UF_1206_6.3V1206",
          count: 27
        },
        {
          value: "100UF_35V_ALE",
          count: 9
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 4
        },
        {
          value: "10UF_1206_10%_25V",
          count: 4
        },
        {
          value: "22UF_1206_10V1206",
          count: 2
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0603",
        capValue: ""
      },
      programmingInterface: "SPI-PROG",
      usbBridge: "FT232RL-REEL",
      busInterfaces: {},
      commonPairings: [
        "ESP32-WROVER",
        "PIC18F26",
        "RP2040"
      ],
      sourceDesigns: [
        "All-In-One_Schematic",
        "All-In-One_Schematic_IO_Board_w_ESP32",
        "ESP32_LCD_PCB",
        "LCD_Control",
        "PCBLF0658-1",
        "PCBLF0658-1_PIK",
        "PCBLF0658-1_Panel",
        "PCBLF0759_PIK",
        "PCBLF0827-0_PIK",
        "Pitts_LCD_Faceplate",
        "ProSmoker_PK100",
        "Quantum_NXP_Programmer",
        "TOP"
      ]
    },
    {
      id: "mcu-stm32g030",
      family: "STM32",
      partNumber: "STM32G030",
      occurrences: 10,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_50V_0603",
          count: 24
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 9
        },
        {
          value: "100UF_25V_ALE",
          count: 7
        },
        {
          value: "0.1UF_0603",
          count: 4
        },
        {
          value: "10UF_0805",
          count: 2
        },
        {
          value: "22UF_1206_25V",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0603",
        capValue: "0.1UF_50V_0603"
      },
      programmingInterface: "SPI-PROG",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
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
      id: "mcu-esp32-wroom",
      family: "ESP32",
      partNumber: "ESP32-WROOM",
      occurrences: 9,
      voltage: "3.3V",
      crystals: [
        {
          value: "ECX-_327-CDX-1293ECS_INTERNATIONAL_ECX-_327-CDX-1293_0_0",
          count: 2
        }
      ],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 28
        },
        {
          value: "100UF_1206_6.3V1206",
          count: 10
        },
        {
          value: "10UF_1206_10%_25V",
          count: 10
        },
        {
          value: "0.1UF_50V_0603",
          count: 8
        },
        {
          value: "1UF_0603",
          count: 6
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 4
        },
        {
          value: "22UF_1206_10V",
          count: 4
        },
        {
          value: "22UF_0805",
          count: 2
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0603",
        capValue: ""
      },
      programmingInterface: "JTAG",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "ESP32_LCD_Design_Touch",
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
      id: "mcu-rp2040",
      family: "RP2040",
      partNumber: "RP2040",
      occurrences: 6,
      voltage: "mixed",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 68
        },
        {
          value: "2.2UF_0603",
          count: 26
        },
        {
          value: "100UF_35V_ALE",
          count: 4
        },
        {
          value: "100UF_1206_6.3V1206",
          count: 2
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "SWD",
      usbBridge: null,
      busInterfaces: {
        i2c: 3,
        spi: 3,
        usb_native: 3
      },
      commonPairings: [
        "PIC18F26",
        "ESP32-WROVER"
      ],
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
      id: "mcu-atmega328",
      family: "AVR/SAM",
      partNumber: "ATMEGA328",
      occurrences: 6,
      voltage: "5V",
      crystals: [
        {
          value: "1K",
          count: 2
        },
        {
          value: "16MHz",
          count: 1
        }
      ],
      decouplingCaps: [
        {
          value: "0.1UF_50V_0603",
          count: 15
        },
        {
          value: "100UF_25V_ALE",
          count: 10
        },
        {
          value: "0.1UF_0603_5%_50V",
          count: 5
        },
        {
          value: "1uF",
          count: 3
        },
        {
          value: "4,7uF_16V",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0603",
        capValue: "0.1UF_50V_0603"
      },
      programmingInterface: "SPI-PROG",
      usbBridge: "FT232RL",
      busInterfaces: {
        i2c: 3,
        spi: 3
      },
      commonPairings: [],
      sourceDesigns: [
        "BGW_Fan_Control",
        "BGW_Fan_Control_PIK",
        "NanoV3.3",
        "PCBLF0804-2_PIK",
        "PCBLF0804-4_PIK",
        "Southbend_RTD_control"
      ]
    },
    {
      id: "mcu-stm32f103",
      family: "STM32",
      partNumber: "STM32F103",
      occurrences: 6,
      voltage: "3.3V",
      crystals: [
        {
          value: "XSM0017",
          count: 18
        }
      ],
      decouplingCaps: [
        {
          value: "100PF_0603",
          count: 6
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0603",
        capValue: "0.1UF_50V_0603"
      },
      programmingInterface: "SWD",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [
        "STM32F103"
      ],
      sourceDesigns: [
        "PCBLF0648-3",
        "PCBLF0648-3_PIK",
        "PCBLF0648-3_gerber_experiment"
      ]
    },
    {
      id: "mcu-esp32",
      family: "ESP32",
      partNumber: "ESP32",
      occurrences: 5,
      voltage: "unknown",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 8
        },
        {
          value: "22UF_0805",
          count: 4
        },
        {
          value: "1UF_0603",
          count: 3
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "SWD",
      usbBridge: "CH340C",
      busInterfaces: {},
      commonPairings: [
        "ESP32"
      ],
      sourceDesigns: [
        "ESP32_LoRa_1_Channel_Gateway",
        "Noah 2.0 WIP PCB",
        "Noah_2.0_WIP_PIK_PCB",
        "PCB Design Kairos Control"
      ]
    },
    {
      id: "mcu-pic18f46",
      family: "PIC18",
      partNumber: "PIC18F46",
      occurrences: 3,
      voltage: "5V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0805",
          count: 24
        },
        {
          value: "470  µF ",
          count: 3
        }
      ],
      resetCircuit: {
        pullupValue: "100^_0603",
        capValue: ""
      },
      programmingInterface: "ICSP",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "Main_Board",
        "Main_Board_PIK",
        "Main_Board_test_stand"
      ]
    },
    {
      id: "mcu-atsamd21",
      family: "AVR/SAM",
      partNumber: "ATSAMD21",
      occurrences: 2,
      voltage: "mixed",
      crystals: [
        {
          value: "ECX-_327-CDX-1293ECS_INTERNATIONAL_ECX-_327-CDX-1293_0_0",
          count: 2
        }
      ],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 25
        },
        {
          value: "10UF_1206_10%_25V",
          count: 10
        },
        {
          value: "1UF_0603",
          count: 8
        },
        {
          value: "1000PF_0402",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "100^_0603",
        capValue: ""
      },
      programmingInterface: "SWD",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [
        "NRF51822"
      ],
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "mcu-nrf51822",
      family: "nRF5x",
      partNumber: "NRF51822",
      occurrences: 2,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_10%_16V",
          count: 19
        },
        {
          value: "10UF_1206_10%_25V",
          count: 10
        },
        {
          value: "1UF_0603",
          count: 4
        },
        {
          value: "1000PF_0402",
          count: 2
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "unknown",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [
        "ATSAMD21"
      ],
      sourceDesigns: [
        "Derived2DPCB_fixoptolocators v1",
        "atsamd21_only"
      ]
    },
    {
      id: "mcu-stm32f4",
      family: "STM32",
      partNumber: "STM32F4",
      occurrences: 2,
      voltage: "mixed",
      crystals: [],
      decouplingCaps: [
        {
          value: "22UF_10V1206",
          count: 3
        },
        {
          value: "0.1UF_0805",
          count: 3
        },
        {
          value: "220UF_16V",
          count: 2
        },
        {
          value: "22UF_1206_10V",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "unknown",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "HDMI_Display",
        "PCB"
      ]
    },
    {
      id: "mcu-esp32-s3",
      family: "ESP32",
      partNumber: "ESP32-S3",
      occurrences: 2,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "100nF",
          count: 28
        },
        {
          value: "22uF",
          count: 4
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "JTAG",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "Noah 2.0 Beta Layout",
        "PCBLF0742-0_PIK_TOP"
      ]
    },
    {
      id: "mcu-stm32f411",
      family: "STM32",
      partNumber: "STM32F411",
      occurrences: 2,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0805",
          count: 18
        },
        {
          value: "1UF_0805_20%",
          count: 2
        },
        {
          value: "22UF_0805",
          count: 2
        }
      ],
      resetCircuit: {
        pullupValue: "10K_0805_1%",
        capValue: "0.1UF_0805"
      },
      programmingInterface: "unknown",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "TiltAudio_RE",
        "TiltAudio_RE_recovery"
      ]
    },
    {
      id: "mcu-pic16f1513",
      family: "PIC16",
      partNumber: "PIC16F1513",
      occurrences: 1,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "unknown",
      usbBridge: null,
      busInterfaces: {},
      commonPairings: [],
      sourceDesigns: [
        "CapSense"
      ]
    },
    {
      id: "mcu-pic18f24",
      family: "PIC18",
      partNumber: "PIC18F24",
      occurrences: 1,
      voltage: "3.3V",
      crystals: [],
      decouplingCaps: [
        {
          value: "0.1UF_0603_5%_50V",
          count: 3
        },
        {
          value: "100UF_25V_ALE",
          count: 1
        }
      ],
      resetCircuit: {
        pullupValue: "",
        capValue: ""
      },
      programmingInterface: "ICSP",
      usbBridge: "FT232RL-REEL",
      busInterfaces: {
        i2c: 1,
        spi: 1,
        uart: 1
      },
      commonPairings: [],
      sourceDesigns: [
        "TouchMZ_In_Out_Board"
      ]
    }
  ];

export const mcuFamilySummary: Record<string, { instances: number; uniqueParts: string[] }> = {
    ESP32: {
      instances: 32,
      uniqueParts: [
        "ESP32",
        "ESP32-S3",
        "ESP32-WROOM",
        "ESP32-WROVER"
      ]
    },
    PIC18: {
      instances: 31,
      uniqueParts: [
        "PIC18F24",
        "PIC18F26",
        "PIC18F46"
      ]
    },
    STM32: {
      instances: 20,
      uniqueParts: [
        "STM32F103",
        "STM32F4",
        "STM32F411",
        "STM32G030"
      ]
    },
    "AVR/SAM": {
      instances: 8,
      uniqueParts: [
        "ATMEGA328",
        "ATSAMD21"
      ]
    },
    RP2040: {
      instances: 6,
      uniqueParts: [
        "RP2040"
      ]
    },
    nRF5x: {
      instances: 2,
      uniqueParts: [
        "NRF51822"
      ]
    },
    PIC16: {
      instances: 1,
      uniqueParts: [
        "PIC16F1513"
      ]
    }
  };
