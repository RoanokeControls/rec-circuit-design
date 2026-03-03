import { CommInterfaceDesign } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const commInterfaceDesigns: CommInterfaceDesign[] = [
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J9",
          pins: [
            {
              pin: "1",
              net: "N$43"
            },
            {
              pin: "MNT_2",
              net: "N$44"
            },
            {
              pin: "4",
              net: "N$44"
            },
            {
              pin: "MNT_1",
              net: "N$44"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        },
        {
          name: "U1A",
          value: "PIC18F26K226SP"
        }
      ],
      interfaceCount: 1
    },
    {
      design: "12_inch_CD_Timer_Control",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J9",
          pins: [
            {
              pin: "1",
              net: "N$43"
            },
            {
              pin: "MNT_2",
              net: "N$44"
            },
            {
              pin: "4",
              net: "N$44"
            },
            {
              pin: "MNT_1",
              net: "N$44"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "usb",
          part: "USB",
          ref: "J8",
          pins: [
            {
              pin: "1",
              net: "N$41"
            },
            {
              pin: "4",
              net: "N$31"
            },
            {
              pin: "MNT_1",
              net: "N$31"
            },
            {
              pin: "MNT_2",
              net: "N$31"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "usb",
          part: "USB",
          ref: "J7",
          pins: [
            {
              pin: "1",
              net: "N$38"
            },
            {
              pin: "4",
              net: "N$26"
            },
            {
              pin: "MNT_1",
              net: "N$26"
            },
            {
              pin: "MNT_2",
              net: "N$26"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        }
      ],
      interfaceCount: 3
    },
    {
      design: "30in_segment_driver",
      interfaces: [
        {
          type: "rs485",
          part: "ISL32173",
          ref: "U2",
          pins: [
            {
              pin: "EN@2",
              net: "+5V"
            },
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "EN@1",
              net: "+5V"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "B1",
              net: "N$15"
            },
            {
              pin: "A1",
              net: "N$17"
            },
            {
              pin: "B2",
              net: "N$18"
            },
            {
              pin: "A2",
              net: "N$19"
            },
            {
              pin: "A3",
              net: "N$20"
            },
            {
              pin: "B3",
              net: "N$21"
            },
            {
              pin: "B4",
              net: "N$22"
            },
            {
              pin: "A4",
              net: "N$23"
            },
            {
              pin: "Z1",
              net: "N$24"
            },
            {
              pin: "RO2",
              net: "N$25"
            },
            {
              pin: "RO3",
              net: "N$26"
            },
            {
              pin: "RO4",
              net: "N$28"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R27",
              value: "220^_0603",
              net: "N$18"
            },
            {
              name: "R25",
              value: "220^_0603",
              net: "N$23"
            },
            {
              name: "R26",
              value: "220^_0603",
              net: "N$21"
            },
            {
              name: "R24",
              value: "220^_0603",
              net: "N$15"
            },
            {
              name: "R27",
              value: "220^_0603",
              net: "N$19"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 1
    },
    {
      design: "7_Switch_Opto",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "R15",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$41"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R16",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$40"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R18",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R17",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$39"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R18",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$38"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R19",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$37"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R20",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$36"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R18",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R21",
          pins: [
            {
              pin: "1",
              net: "+12V"
            },
            {
              pin: "2",
              net: "N$35"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "100K_AXIAL",
              net: "+12V"
            },
            {
              name: "R29",
              value: "1.2K_1W_AXIAL",
              net: "+12V"
            },
            {
              name: "R16",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R20",
              value: "2.7K_5W_FUSIBLE",
              net: "+12V"
            },
            {
              name: "R23",
              value: "100K_AXIAL",
              net: "+12V"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 7
    },
    {
      design: "A-16116",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "R5",
          pins: [
            {
              pin: "1",
              net: "N$1"
            },
            {
              pin: "2",
              net: "N$2"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R1",
          pins: [
            {
              pin: "2",
              net: "N$11"
            },
            {
              pin: "1",
              net: "N$12"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R2",
          pins: [
            {
              pin: "1",
              net: "N$9"
            },
            {
              pin: "2",
              net: "N$10"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R3",
          pins: [
            {
              pin: "1",
              net: "N$6"
            },
            {
              pin: "2",
              net: "N$8"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R4",
          pins: [
            {
              pin: "2",
              net: "N$4"
            },
            {
              pin: "1",
              net: "N$20"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R6",
          pins: [
            {
              pin: "1",
              net: "N$3"
            },
            {
              pin: "2",
              net: "N$18"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R7",
          pins: [
            {
              pin: "1",
              net: "N$14"
            },
            {
              pin: "2",
              net: "N$15"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "ble",
          part: "BLE",
          ref: "R8",
          pins: [
            {
              pin: "2",
              net: "N$13"
            },
            {
              pin: "1",
              net: "N$17"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [],
      interfaceCount: 8
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "IO18",
              net: "ESP_SCK"
            },
            {
              pin: "IO19",
              net: "ESP_MISO"
            },
            {
              pin: "IO32",
              net: "ESP_CS"
            },
            {
              pin: "IO23",
              net: "ESP_MOSI"
            },
            {
              pin: "IO25",
              net: "ESP_TX"
            },
            {
              pin: "IO26",
              net: "ESP_RX"
            },
            {
              pin: "IO33",
              net: "RP2040_RST"
            },
            {
              pin: "EN",
              net: "ESP_EN"
            },
            {
              pin: "IO0",
              net: "ESP32A_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32A_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32A_PGM_TX"
            },
            {
              pin: "IO2",
              net: "RTC_SCL"
            },
            {
              pin: "IO4",
              net: "RTC_SDA"
            },
            {
              pin: "IO22",
              net: "FLASH_RST"
            },
            {
              pin: "IO21",
              net: "FLASH_WP"
            },
            {
              pin: "IO5",
              net: "FLASH_CS"
            },
            {
              pin: "VDD3V3",
              net: "+3.3V_ESP"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R63",
              value: "10K_0603",
              net: "ESP_EN"
            },
            {
              name: "R69",
              value: "1.2K_0603",
              net: "ESP_EN"
            },
            {
              name: "R62",
              value: "10K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R59",
              value: "1.2K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R60",
              value: "1.2K_0603",
              net: "ESP32A_PGM_TX"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        },
        {
          name: "U1A",
          value: "PIC18F26K226SP"
        },
        {
          name: "U4",
          value: "RP2040"
        },
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "All-In-One_Schematic",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "VDD3V3",
              net: "+3.3V"
            },
            {
              pin: "EN",
              net: "ESP32_EN"
            },
            {
              pin: "IO0",
              net: "ESP32_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32_PGM_TX"
            },
            {
              pin: "IO4",
              net: "LCD_CS"
            },
            {
              pin: "IO15",
              net: "PROBE4_LED"
            },
            {
              pin: "IO21",
              net: "PROBE3_LED"
            },
            {
              pin: "IO22",
              net: "PROBE2_LED"
            },
            {
              pin: "IO23",
              net: "PROBE1_LED"
            },
            {
              pin: "IO12",
              net: "LCD_BL"
            },
            {
              pin: "IO5",
              net: "LCD_DC"
            },
            {
              pin: "IO14",
              net: "LCD_MOSI"
            },
            {
              pin: "IO18",
              net: "LCD_RESET"
            },
            {
              pin: "IO19",
              net: "LCD_SCL"
            },
            {
              pin: "IO25",
              net: "RTPINT_CTPSDA"
            },
            {
              pin: "IO26",
              net: "RTPCS_CTPSCL"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R49",
              value: "180^_0603",
              net: "PROBE2_LED"
            },
            {
              name: "R48",
              value: "180^_0603",
              net: "PROBE1_LED"
            },
            {
              name: "R50",
              value: "180^_0603",
              net: "PROBE3_LED"
            },
            {
              name: "R30",
              value: "10K_0603",
              net: "ESP32_EN"
            },
            {
              name: "R47",
              value: "1.62K_0805_0.1%",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "CPU-95",
      interfaces: [
        {
          type: "onewire",
          part: "DS18",
          ref: "U10",
          pins: [
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "VCC",
              net: "VCC"
            },
            {
              pin: "RST",
              net: "N$105"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R22",
              value: "10K_AXIAL",
              net: "N$105"
            },
            {
              name: "R86",
              value: "10K_AXIAL",
              net: "VCC"
            },
            {
              name: "R108",
              value: "1K_AXIAL",
              net: "VCC"
            },
            {
              name: "R32",
              value: "10K_AXIAL",
              net: "VCC"
            },
            {
              name: "R27",
              value: "10K_AXIAL",
              net: "VCC"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 1
    },
    {
      design: "CarterHoffmann485DisplayAlternate",
      interfaces: [
        {
          type: "ethernet_connector",
          part: "RJ45",
          ref: "J1",
          pins: [
            {
              pin: "5",
              net: "GND"
            },
            {
              pin: "8",
              net: "GND"
            },
            {
              pin: "1",
              net: "RS485A"
            },
            {
              pin: "2",
              net: "RS485B"
            },
            {
              pin: "4",
              net: "+8.5V"
            },
            {
              pin: "7",
              net: "+8.5V"
            },
            {
              pin: "6",
              net: "USDS_SEL"
            },
            {
              pin: "3",
              net: "USDS_SEL"
            }
          ],
          esdProtection: [],
          termination: [
            {
              name: "R34",
              value: "100^_1206_1%_0.5W",
              net: "USDS_SEL"
            },
            {
              name: "R34",
              value: "100^_1206_1%_0.5W",
              net: "GND"
            }
          ],
          biasResistors: [
            {
              name: "R56",
              value: "10K_0603",
              net: "RS485B"
            },
            {
              name: "R57",
              value: "220^_0603",
              net: "RS485B"
            },
            {
              name: "R47",
              value: "10K_0603",
              net: "GND"
            },
            {
              name: "R43",
              value: "10K_0603_.1%",
              net: "GND"
            },
            {
              name: "R48",
              value: "10K_0603",
              net: "GND"
            }
          ]
        },
        {
          type: "ethernet_connector",
          part: "RJ45",
          ref: "J2",
          pins: [
            {
              pin: "5",
              net: "GND"
            },
            {
              pin: "8",
              net: "GND"
            },
            {
              pin: "1",
              net: "RS485A"
            },
            {
              pin: "2",
              net: "RS485B"
            },
            {
              pin: "4",
              net: "+8.5V"
            },
            {
              pin: "7",
              net: "+8.5V"
            },
            {
              pin: "6",
              net: "USDS_SEL"
            },
            {
              pin: "3",
              net: "USDS_SEL"
            }
          ],
          esdProtection: [],
          termination: [
            {
              name: "R34",
              value: "100^_1206_1%_0.5W",
              net: "USDS_SEL"
            },
            {
              name: "R34",
              value: "100^_1206_1%_0.5W",
              net: "GND"
            }
          ],
          biasResistors: [
            {
              name: "R56",
              value: "10K_0603",
              net: "RS485B"
            },
            {
              name: "R57",
              value: "220^_0603",
              net: "RS485B"
            },
            {
              name: "R47",
              value: "10K_0603",
              net: "GND"
            },
            {
              name: "R43",
              value: "10K_0603_.1%",
              net: "GND"
            },
            {
              name: "R48",
              value: "10K_0603",
              net: "GND"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "IC1",
          value: "STM32G030F6P6"
        }
      ],
      interfaceCount: 2
    },
    {
      design: "Chevy_Test_IC",
      interfaces: [
        {
          type: "usb",
          part: "FT232",
          ref: "U1",
          pins: [
            {
              pin: "TEST",
              net: "GND"
            },
            {
              pin: "AGND",
              net: "GND"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "USBDP",
              net: "N$1"
            },
            {
              pin: "USBDM",
              net: "N$2"
            },
            {
              pin: "RXD",
              net: "N$3"
            },
            {
              pin: "TXD",
              net: "N$5"
            },
            {
              pin: "VCCIO",
              net: "VARIABLE_SOURCE"
            },
            {
              pin: "3V3OUT",
              net: "VARIABLE_SOURCE"
            },
            {
              pin: "!DSR",
              net: "N$6"
            },
            {
              pin: "!DTR",
              net: "N$6"
            },
            {
              pin: "!RTS",
              net: "N$7"
            },
            {
              pin: "!CTS",
              net: "N$7"
            }
          ],
          esdProtection: [],
          termination: [
            {
              name: "R3",
              value: "JUMPER_1206_1/4W",
              net: "GND"
            }
          ],
          biasResistors: [
            {
              name: "R10",
              value: "1.2K_0805",
              net: "N$5"
            },
            {
              name: "R20",
              value: "JUMPER_0805_2.5A",
              net: "+5V"
            },
            {
              name: "R11",
              value: "1.2K_0805",
              net: "N$3"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 1
    },
    {
      design: "DISDMD",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "D3",
          pins: [
            {
              pin: "C",
              net: "VCC"
            },
            {
              pin: "A@2",
              net: "N$33"
            },
            {
              pin: "A@1",
              net: "N$33"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R11",
              value: "10K_0805",
              net: "N$33"
            },
            {
              name: "R11",
              value: "10K_0805",
              net: "VCC"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 1
    },
    {
      design: "Derived2DPCB_fixoptolocators v1",
      interfaces: [
        {
          type: "lora",
          part: "RFM97",
          ref: "U5",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R10",
              value: "1M_0603_1%",
              net: "GND"
            },
            {
              name: "R25",
              value: "10K_0603",
              net: "GND"
            },
            {
              name: "R13",
              value: "10K_0603",
              net: "GND"
            },
            {
              name: "R1",
              value: "180^_0603",
              net: "GND"
            },
            {
              name: "R23",
              value: "10K_0603",
              net: "GND"
            }
          ]
        },
        {
          type: "ble",
          part: "NRF51822",
          ref: "IC2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "10K_0603",
              net: "N$26"
            },
            {
              name: "R24",
              value: "10M_0603",
              net: "+3.3V_BLE"
            },
            {
              name: "R24",
              value: "10M_0603",
              net: "N$20"
            },
            {
              name: "R18",
              value: "100^_0603",
              net: "N$20"
            },
            {
              name: "R10",
              value: "1M_0603_1%",
              net: "GND"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 2
    },
    {
      design: "ESP32_LCD_Design_Touch",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U1",
          pins: [
            {
              pin: "SENSOR_VN",
              net: "YP"
            },
            {
              pin: "SENSOR_VP",
              net: "XM"
            },
            {
              pin: "IO34",
              net: "YM"
            },
            {
              pin: "IO35",
              net: "XP"
            },
            {
              pin: "IO21",
              net: "TOUCHDRV"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "ESP32_LCD_PCB",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "A1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R1",
              value: "180^_0603",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R12",
              value: "10K_0805_1%",
              net: "ESP32_EN"
            },
            {
              name: "R19",
              value: "1.2K_0603",
              net: "+3.3V"
            },
            {
              name: "R12",
              value: "10K_0805_1%",
              net: "+3.3V"
            },
            {
              name: "R5",
              value: "1.62K_0805_1%",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "A1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "ESP32_LoRa_1_Channel_Gateway",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP-WROOM",
          ref: "U2",
          pins: [
            {
              pin: "3V3",
              net: "3.3V"
            },
            {
              pin: "EN",
              net: "RESET"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "GND@38",
              net: "GND"
            },
            {
              pin: "GND@15",
              net: "GND"
            },
            {
              pin: "GND@1",
              net: "GND"
            },
            {
              pin: "TXD",
              net: "TXO"
            },
            {
              pin: "RXD",
              net: "RXI"
            },
            {
              pin: "IO0",
              net: "0"
            },
            {
              pin: "IO21",
              net: "SDA"
            },
            {
              pin: "IO22",
              net: "SCL"
            },
            {
              pin: "IO26",
              net: "RFM_INT/26"
            },
            {
              pin: "XTAL_P/IO32",
              net: "RFM_DIO2/32"
            },
            {
              pin: "XTAL_N/IO33",
              net: "RFM_DIO1/33"
            },
            {
              pin: "MISO_H/IO12",
              net: "MISO"
            },
            {
              pin: "MOSI_H/IO13",
              net: "MOSI"
            },
            {
              pin: "SCK_H/IO14",
              net: "SCK"
            },
            {
              pin: "IO16",
              net: "RFM_CS"
            },
            {
              pin: "IO25",
              net: "IO25"
            },
            {
              pin: "IO27",
              net: "IO27"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R5",
              value: "10k",
              net: "0"
            },
            {
              name: "R6",
              value: "2.2k",
              net: "SDA"
            },
            {
              name: "R9",
              value: "2.2k",
              net: "3.3V"
            },
            {
              name: "R1",
              value: "10k",
              net: "3.3V"
            },
            {
              name: "R5",
              value: "10k",
              net: "3.3V"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM95",
          ref: "U4",
          pins: [
            {
              pin: "3.3V",
              net: "3.3V"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "DIO0",
              net: "RFM_INT/26"
            },
            {
              pin: "DIO2",
              net: "RFM_DIO2/32"
            },
            {
              pin: "DIO1",
              net: "RFM_DIO1/33"
            },
            {
              pin: "MISO",
              net: "MISO"
            },
            {
              pin: "MOSI",
              net: "MOSI"
            },
            {
              pin: "SCK",
              net: "SCK"
            },
            {
              pin: "NSS",
              net: "RFM_CS"
            },
            {
              pin: "!RESET",
              net: "RFM_RST"
            },
            {
              pin: "ANT",
              net: "ANT"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R4",
              value: "10k",
              net: "RFM_RST"
            },
            {
              name: "R9",
              value: "2.2k",
              net: "3.3V"
            },
            {
              name: "R1",
              value: "10k",
              net: "3.3V"
            },
            {
              name: "R5",
              value: "10k",
              net: "3.3V"
            },
            {
              name: "R6",
              value: "2.2k",
              net: "3.3V"
            }
          ]
        },
        {
          type: "usb",
          part: "USB",
          ref: "J1",
          pins: [
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "D-",
              net: "D-"
            },
            {
              pin: "D+",
              net: "D+"
            },
            {
              pin: "VBUS",
              net: "V_USB"
            },
            {
              pin: "SHIELD",
              net: "SHIELD"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "1k",
              net: "GND"
            }
          ]
        },
        {
          type: "usb",
          part: "CH340",
          ref: "U3",
          pins: [
            {
              pin: "VCC",
              net: "3.3V"
            },
            {
              pin: "V3",
              net: "3.3V"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "RXI",
              net: "TXO"
            },
            {
              pin: "TXO",
              net: "RXI"
            },
            {
              pin: "!DTR",
              net: "!DTR"
            },
            {
              pin: "UD-",
              net: "D-"
            },
            {
              pin: "UD+",
              net: "D+"
            },
            {
              pin: "!RTS",
              net: "!RTS"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R8",
              value: "10k",
              net: "!RTS"
            },
            {
              name: "R9",
              value: "2.2k",
              net: "3.3V"
            },
            {
              name: "R1",
              value: "10k",
              net: "3.3V"
            },
            {
              name: "R5",
              value: "10k",
              net: "3.3V"
            },
            {
              name: "R6",
              value: "2.2k",
              net: "3.3V"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U$25",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U$45",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U$25",
          value: ""
        },
        {
          name: "U$45",
          value: ""
        }
      ],
      interfaceCount: 6
    },
    {
      design: "ESP32_Programming_board",
      interfaces: [
        {
          type: "usb",
          part: "FT232",
          ref: "U1",
          pins: [
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "TEST",
              net: "GND"
            },
            {
              pin: "AGND",
              net: "GND"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "USBDP",
              net: "N$1"
            },
            {
              pin: "USBDM",
              net: "N$2"
            },
            {
              pin: "RXD",
              net: "N$3"
            },
            {
              pin: "TXD",
              net: "N$5"
            },
            {
              pin: "!RTS",
              net: "N$6"
            },
            {
              pin: "!DTR",
              net: "N$8"
            },
            {
              pin: "VCCIO",
              net: "VARIABLE_SOURCE"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "10K_0603",
              net: "N$8"
            },
            {
              name: "R10",
              value: "1.2K_0805",
              net: "N$5"
            },
            {
              name: "R1",
              value: "10K_0603",
              net: "N$6"
            },
            {
              name: "R20",
              value: "JUMPER_0805_2.5A",
              net: "+5V"
            },
            {
              name: "R11",
              value: "1.2K_0805",
              net: "N$3"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 1
    },
    {
      design: "HDMI_Display",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J6",
          pins: [
            {
              pin: "4",
              net: "GND"
            },
            {
              pin: "1",
              net: "+5V"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R5",
              value: "1K_0805_1%_0.125W",
              net: "+5V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "DB1",
          value: "STM32F4DISCOVERY"
        }
      ],
      interfaceCount: 1
    },
    {
      design: "LCD_Control",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "IO18",
              net: "ESP_SCK"
            },
            {
              pin: "IO19",
              net: "ESP_MISO"
            },
            {
              pin: "IO32",
              net: "ESP_CS"
            },
            {
              pin: "IO23",
              net: "ESP_MOSI"
            },
            {
              pin: "IO25",
              net: "ESP_TX"
            },
            {
              pin: "IO26",
              net: "ESP_RX"
            },
            {
              pin: "IO33",
              net: "RP2040_RST"
            },
            {
              pin: "EN",
              net: "ESP_EN"
            },
            {
              pin: "IO0",
              net: "ESP32A_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32A_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32A_PGM_TX"
            },
            {
              pin: "IO2",
              net: "RTC_SCL"
            },
            {
              pin: "IO4",
              net: "RTC_SDA"
            },
            {
              pin: "IO22",
              net: "FLASH_RST"
            },
            {
              pin: "IO21",
              net: "FLASH_WP"
            },
            {
              pin: "IO5",
              net: "FLASH_CS"
            },
            {
              pin: "VDD3V3",
              net: "+3.3V_ESP"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R63",
              value: "10K_0603",
              net: "ESP_EN"
            },
            {
              name: "R69",
              value: "1.2K_0603",
              net: "ESP_EN"
            },
            {
              name: "R62",
              value: "10K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R59",
              value: "1.2K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R60",
              value: "1.2K_0603",
              net: "ESP32A_PGM_TX"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U4",
          value: "RP2040"
        },
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "NanoV3.3",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J3",
          pins: [
            {
              pin: "GND",
              net: "COM"
            },
            {
              pin: "SH2",
              net: "COM"
            },
            {
              pin: "SH4",
              net: "COM"
            },
            {
              pin: "SH3",
              net: "COM"
            },
            {
              pin: "SH1",
              net: "COM"
            },
            {
              pin: "D+",
              net: "N$5"
            },
            {
              pin: "D-",
              net: "N$6"
            },
            {
              pin: "VBUS",
              net: "N$26"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "usb",
          part: "FT232",
          ref: "IC1",
          pins: [
            {
              pin: "AGND",
              net: "COM"
            },
            {
              pin: "GND1",
              net: "COM"
            },
            {
              pin: "GND2",
              net: "COM"
            },
            {
              pin: "GND3",
              net: "COM"
            },
            {
              pin: "TEST",
              net: "COM"
            },
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "VCCIO",
              net: "+5V"
            },
            {
              pin: "3V3OUT",
              net: "3V3"
            },
            {
              pin: "DTR#",
              net: "N$4"
            },
            {
              pin: "TXD",
              net: "RX"
            },
            {
              pin: "RXD",
              net: "TX"
            },
            {
              pin: "USBDP",
              net: "N$5"
            },
            {
              pin: "USBDM",
              net: "N$6"
            },
            {
              pin: "CBUS0",
              net: "N$8"
            },
            {
              pin: "CBUS1",
              net: "N$9"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "IC3",
          value: "328P-MUR"
        }
      ],
      interfaceCount: 2
    },
    {
      design: "Noah 2.0 Beta Layout",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R87",
              value: "0",
              net: "USB_VBUS1"
            },
            {
              name: "R93",
              value: "0",
              net: "USB_VBUS1"
            },
            {
              name: "R90",
              value: "0",
              net: "USB_VBUS2"
            },
            {
              name: "R96",
              value: "0",
              net: "USB_VBUS2"
            },
            {
              name: "R92",
              value: "0",
              net: "USB_GND1"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM97",
          ref: "U4",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R43",
              value: "33k",
              net: "GND"
            },
            {
              name: "R20",
              value: "470k",
              net: "GND"
            },
            {
              name: "R16",
              value: "100k",
              net: "GND"
            },
            {
              name: "R99",
              value: "5.1k",
              net: "GND"
            },
            {
              name: "R78",
              value: "100k",
              net: "GND"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U22",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R22",
              value: "1k",
              net: "BLUE"
            },
            {
              name: "R125",
              value: "100",
              net: "RXD"
            },
            {
              name: "R6",
              value: "100k",
              net: "COM_EN2"
            },
            {
              name: "R21",
              value: "1k",
              net: "BUZZER"
            },
            {
              name: "R113",
              value: "100",
              net: "TXD"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U22",
          value: "ESP32-S3-MINI-1-N8"
        }
      ],
      interfaceCount: 3
    },
    {
      design: "Noah 2.0 WIP PCB",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U$1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R54",
              value: "1k",
              net: "GND"
            },
            {
              name: "R53",
              value: "1k",
              net: "GND"
            },
            {
              name: "R49",
              value: "1k",
              net: "GND"
            },
            {
              name: "R43",
              value: "1k",
              net: "GND"
            },
            {
              name: "R45",
              value: "1k",
              net: "GND"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM97",
          ref: "U$2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "usb",
          part: "USB",
          ref: "J2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U$1",
          value: "ESP32-MINI-1-N4"
        }
      ],
      interfaceCount: 3
    },
    {
      design: "Noah_2.0_WIP_PIK_PCB",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R54",
              value: "1k",
              net: "GND"
            },
            {
              name: "R53",
              value: "1k",
              net: "GND"
            },
            {
              name: "R49",
              value: "1k",
              net: "GND"
            },
            {
              name: "R43",
              value: "1k",
              net: "GND"
            },
            {
              name: "R45",
              value: "1k",
              net: "GND"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM97",
          ref: "U2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        },
        {
          type: "usb",
          part: "USB",
          ref: "J3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "ESPRESSIF_ESP32-MINI-1-N4"
        }
      ],
      interfaceCount: 3
    },
    {
      design: "NuvoLiteBrick_PCB",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "75^_0805",
              net: "SOL2"
            },
            {
              name: "R12",
              value: "100^_0603",
              net: "N$24"
            },
            {
              name: "R15",
              value: "10K_0603",
              net: "PRES_SDA"
            },
            {
              name: "R13",
              value: "75^_0805",
              net: "SOL3"
            },
            {
              name: "R6",
              value: "75^_0805",
              net: "SOL1"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U3",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "NuvoLite_PCB_PIK_Bottom",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "R7",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R29",
              value: "100K_0805",
              net: "N$1"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "75^_0805",
              net: "SOL2"
            },
            {
              name: "R12",
              value: "100^_0603",
              net: "N$24"
            },
            {
              name: "R15",
              value: "10K_0603",
              net: "PRES_SDA"
            },
            {
              name: "R13",
              value: "75^_0805",
              net: "SOL3"
            },
            {
              name: "R6",
              value: "75^_0805",
              net: "SOL1"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U3",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "NuvoLite_PCB_PIK_Top",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "R7",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R29",
              value: "100K_0805",
              net: "N$1"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "75^_0805",
              net: "SOL2"
            },
            {
              name: "R12",
              value: "100^_0603",
              net: "N$24"
            },
            {
              name: "R15",
              value: "10K_0603",
              net: "PRES_SDA"
            },
            {
              name: "R13",
              value: "75^_0805",
              net: "SOL3"
            },
            {
              name: "R6",
              value: "75^_0805",
              net: "SOL1"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U3",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "NuvoLite_PCB",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "R7",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R29",
              value: "100K_0805",
              net: "N$1"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "75^_0805",
              net: "SOL2"
            },
            {
              name: "R12",
              value: "100^_0603",
              net: "N$24"
            },
            {
              name: "R15",
              value: "10K_0603",
              net: "PRES_SDA"
            },
            {
              name: "R13",
              value: "75^_0805",
              net: "SOL3"
            },
            {
              name: "R6",
              value: "75^_0805",
              net: "SOL1"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U3",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCB Design Kairos Control",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U$1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R8",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R9",
              value: "1M_0603_1%",
              net: "+3.3V"
            },
            {
              name: "R2",
              value: "FERRITE_330^_0805",
              net: "+3.3V"
            },
            {
              name: "R4",
              value: "100K_0603",
              net: "+3.3V"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM97",
          ref: "U5",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R8",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R9",
              value: "1M_0603_1%",
              net: "+3.3V"
            },
            {
              name: "R2",
              value: "FERRITE_330^_0805",
              net: "+3.3V"
            },
            {
              name: "R4",
              value: "100K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U$1",
          value: "ESP32_TAG"
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0658-1_PIK",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R22",
              value: "1.2K_0805",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R7",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R8",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "ESP32_PGM_RX"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "4.7K_0603",
              net: "EMITTER_OUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "N$21"
            },
            {
              name: "R18",
              value: "10K_0603",
              net: "N$24"
            },
            {
              name: "R29",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R28",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0658-1_Panel",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R22",
              value: "1.2K_0805",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R7",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R8",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "ESP32_PGM_RX"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "4.7K_0603",
              net: "EMITTER_OUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "N$21"
            },
            {
              name: "R18",
              value: "10K_0603",
              net: "N$24"
            },
            {
              name: "R29",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R28",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R36",
              value: "180^_0603",
              net: "N$18"
            },
            {
              name: "R58",
              value: "JUMPER_0603_1/10W",
              net: "EE_DAT_ESP1"
            },
            {
              name: "R45",
              value: "10K_0603",
              net: "VALVE_CLOSED1"
            },
            {
              name: "R47",
              value: "10K_0603",
              net: "GND1"
            },
            {
              name: "R38",
              value: "2.7K_0603",
              net: "GND1"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U9",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R52",
              value: "10K_0603",
              net: "N$48"
            },
            {
              name: "R47",
              value: "10K_0603",
              net: "GND1"
            },
            {
              name: "R38",
              value: "2.7K_0603",
              net: "GND1"
            },
            {
              name: "R43",
              value: "4.7K_0603",
              net: "GND1"
            },
            {
              name: "R46",
              value: "10K_0603",
              net: "GND1"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R67",
              value: "180^_0603",
              net: "N$55"
            },
            {
              name: "R69",
              value: "180^_0603",
              net: "N$56"
            },
            {
              name: "R71",
              value: "2.7K_0603",
              net: "GND2"
            },
            {
              name: "R80",
              value: "10K_0603",
              net: "GND2"
            },
            {
              name: "R79",
              value: "10K_0603",
              net: "GND2"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U15",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R68",
              value: "4.7K_0603",
              net: "COLLECTOR_OUT2"
            },
            {
              name: "R84",
              value: "JUMPER_0805_2.5A",
              net: "+5V2"
            },
            {
              name: "R71",
              value: "2.7K_0603",
              net: "GND2"
            },
            {
              name: "R80",
              value: "10K_0603",
              net: "GND2"
            },
            {
              name: "R79",
              value: "10K_0603",
              net: "GND2"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC4",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R100",
              value: "180^_0603",
              net: "N$82"
            },
            {
              name: "R103",
              value: "180^_0603",
              net: "N$84"
            },
            {
              name: "R106",
              value: "180^_0603",
              net: "+3.3V3"
            },
            {
              name: "R125",
              value: "10K_0603",
              net: "+3.3V3"
            },
            {
              name: "R128",
              value: "10K_0603",
              net: "+3.3V3"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U21",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R106",
              value: "180^_0603",
              net: "+3.3V3"
            },
            {
              name: "R125",
              value: "10K_0603",
              net: "+3.3V3"
            },
            {
              name: "R128",
              value: "10K_0603",
              net: "+3.3V3"
            },
            {
              name: "R127",
              value: "10K_0603",
              net: "+3.3V3"
            },
            {
              name: "R105",
              value: "1.62K_0805_1%",
              net: "+3.3V3"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        },
        {
          name: "HC2",
          value: ""
        },
        {
          name: "HC3",
          value: ""
        },
        {
          name: "HC4",
          value: ""
        }
      ],
      interfaceCount: 8
    },
    {
      design: "PCBLF0658-1",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R22",
              value: "1.2K_0805",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R7",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R8",
              value: "180^_0603",
              net: "OUTPUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "ESP32_PGM_RX"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R9",
              value: "4.7K_0603",
              net: "EMITTER_OUT"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "N$21"
            },
            {
              name: "R18",
              value: "10K_0603",
              net: "N$24"
            },
            {
              name: "R29",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R28",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0660-7_PIK",
      interfaces: [
        {
          type: "lora",
          part: "RFM97",
          ref: "U5",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R13",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R24",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R63",
              value: "JUMPER_0805",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R20",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R18",
              value: "10M_0603",
              net: "N$13"
            },
            {
              name: "R34",
              value: "10K_0603",
              net: "LORA_RST"
            },
            {
              name: "R19",
              value: "100K_0603",
              net: "N$21"
            },
            {
              name: "R48",
              value: "180^_0603",
              net: "ESP32_LED2"
            },
            {
              name: "R10",
              value: "10K_0805_1%",
              net: "ESP32_EN"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U2",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0660-7",
      interfaces: [
        {
          type: "lora",
          part: "RFM97",
          ref: "U5",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R13",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R24",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R63",
              value: "JUMPER_0805",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R20",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R18",
              value: "10M_0603",
              net: "N$13"
            },
            {
              name: "R34",
              value: "10K_0603",
              net: "LORA_RST"
            },
            {
              name: "R19",
              value: "100K_0603",
              net: "N$21"
            },
            {
              name: "R48",
              value: "180^_0603",
              net: "ESP32_LED2"
            },
            {
              name: "R10",
              value: "10K_0805_1%",
              net: "ESP32_EN"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U2",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0706-1_PIK",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J9",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: []
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        }
      ],
      interfaceCount: 1
    },
    {
      design: "PCBLF0717-1_PIK",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R3",
              value: "4.7K_0603",
              net: "N$7"
            },
            {
              name: "R7",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R9",
              value: "180^_0603",
              net: "N$4"
            },
            {
              name: "R12",
              value: "10K_0805_1%",
              net: "ESP32_EN"
            },
            {
              name: "R16",
              value: "100K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "PCBLF0742-0_PIK_TOP",
      interfaces: [
        {
          type: "usb",
          part: "USB",
          ref: "J3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R87",
              value: "0",
              net: "USB_VBUS1"
            },
            {
              name: "R93",
              value: "0",
              net: "USB_VBUS1"
            },
            {
              name: "R90",
              value: "0",
              net: "USB_VBUS2"
            },
            {
              name: "R96",
              value: "0",
              net: "USB_VBUS2"
            },
            {
              name: "R92",
              value: "0",
              net: "USB_GND1"
            }
          ]
        },
        {
          type: "lora",
          part: "RFM97",
          ref: "U4",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R43",
              value: "33k",
              net: "GND"
            },
            {
              name: "R20",
              value: "470k",
              net: "GND"
            },
            {
              name: "R16",
              value: "100k",
              net: "GND"
            },
            {
              name: "R99",
              value: "5.1k",
              net: "GND"
            },
            {
              name: "R78",
              value: "100k",
              net: "GND"
            }
          ]
        },
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U22",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R22",
              value: "1k",
              net: "BLUE"
            },
            {
              name: "R125",
              value: "100",
              net: "RXD"
            },
            {
              name: "R6",
              value: "100k",
              net: "COM_EN2"
            },
            {
              name: "R21",
              value: "1k",
              net: "BUZZER"
            },
            {
              name: "R113",
              value: "100",
              net: "TXD"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U22",
          value: "ESP32-S3-MINI-1-N8"
        }
      ],
      interfaceCount: 3
    },
    {
      design: "PCBLF0759_PIK",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R22",
              value: "1.2K_0805",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "ESP32_PGM_RX"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "SCL"
            },
            {
              name: "R9",
              value: "10K_0603",
              net: "ESP32_EN"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U3",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R18",
              value: "10K_0603",
              net: "N$24"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "N$21"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R11",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R9",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "PCBLF0827-0_PIK",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R62",
              value: "10K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R59",
              value: "1.2K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R61",
              value: "1.2K_0603",
              net: "ESP32A_PGM_RX"
            },
            {
              name: "R72",
              value: "100K_0603",
              net: "RTC_SCL"
            },
            {
              name: "R49",
              value: "10K_0603",
              net: "GND"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        },
        {
          name: "U4",
          value: "RP2040"
        },
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "PCB_Connectware",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "U1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R3",
              value: "4.7K_0603",
              net: "N$7"
            },
            {
              name: "R7",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R9",
              value: "180^_0603",
              net: "N$4"
            },
            {
              name: "R12",
              value: "10K_0805_1%",
              net: "ESP32_EN"
            },
            {
              name: "R16",
              value: "100K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "Pitts_LCD_Faceplate",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "VDD3V3",
              net: "+3.3V"
            },
            {
              pin: "EN",
              net: "ESP32A_EN"
            },
            {
              pin: "IO0",
              net: "ESP32A_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32A_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32A_PGM_TX"
            },
            {
              pin: "IO2",
              net: "RTC_SCL"
            },
            {
              pin: "IO4",
              net: "RTC_SDA"
            },
            {
              pin: "IO22",
              net: "FLASH_RST"
            },
            {
              pin: "IO18",
              net: "FLASH_CLK"
            },
            {
              pin: "IO23",
              net: "FLASH_MOSI"
            },
            {
              pin: "IO19",
              net: "FLASH_MISO"
            },
            {
              pin: "IO21",
              net: "FLASH_WP"
            },
            {
              pin: "IO5",
              net: "FLASH_CS"
            },
            {
              pin: "IO32",
              net: "RP2040_CS"
            },
            {
              pin: "IO25",
              net: "RP2040_RX"
            },
            {
              pin: "IO26",
              net: "RP2040_TX"
            },
            {
              pin: "IO33",
              net: "RP2040_RST"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R4",
              value: "1.2K_0603",
              net: "ESP32A_EN"
            },
            {
              name: "R6",
              value: "10K_0603",
              net: "ESP32A_EN"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R1",
              value: "1.2K_0603",
              net: "ESP32A_IO0"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "ProSmoker_PK100",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "VDD3V3",
              net: "+3.3V"
            },
            {
              pin: "EN",
              net: "ESP32_EN"
            },
            {
              pin: "IO0",
              net: "ESP32_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32_PGM_TX"
            },
            {
              pin: "IO23",
              net: "N$5"
            },
            {
              pin: "IO22",
              net: "N$6"
            },
            {
              pin: "IO21",
              net: "N$7"
            },
            {
              pin: "IO32",
              net: "ESP_COM1"
            },
            {
              pin: "IO33",
              net: "ESP_COM2"
            },
            {
              pin: "IO15",
              net: "RED_INDICATOR"
            },
            {
              pin: "IO27",
              net: "GREEN_INDICATOR"
            },
            {
              pin: "IO13",
              net: "BLUE_INDICATOR"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R3",
              value: "180^_0603",
              net: "N$7"
            },
            {
              name: "R75",
              value: "180^_0603",
              net: "BLUE_INDICATOR"
            },
            {
              name: "R25",
              value: "180^_0603",
              net: "GREEN_INDICATOR"
            },
            {
              name: "R30",
              value: "10K_0603",
              net: "ESP32_EN"
            },
            {
              name: "R29",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "Quantum_NXP_Programmer",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [
            {
              pin: "VDD3V3",
              net: "+3.3V"
            },
            {
              pin: "GND1",
              net: "GND"
            },
            {
              pin: "GND15",
              net: "GND"
            },
            {
              pin: "GND38",
              net: "GND"
            },
            {
              pin: "IO25",
              net: "N$1"
            },
            {
              pin: "IO14",
              net: "N$2"
            },
            {
              pin: "EN",
              net: "ESP32_EN"
            },
            {
              pin: "IO0",
              net: "ESP32_IO0"
            },
            {
              pin: "RXD0",
              net: "ESP32_PGM_RX"
            },
            {
              pin: "TXD0",
              net: "ESP32_PGM_TX"
            },
            {
              pin: "IO21",
              net: "SDA"
            },
            {
              pin: "IO22",
              net: "SCL"
            },
            {
              pin: "IO32",
              net: "RST"
            },
            {
              pin: "IO34",
              net: "N$9"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R2",
              value: "180^_0603",
              net: "N$2"
            },
            {
              name: "R22",
              value: "1.2K_0805",
              net: "ESP32_PGM_TX"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "ESP32_PGM_RX"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "SCL"
            },
            {
              name: "R9",
              value: "10K_0603",
              net: "ESP32_EN"
            }
          ]
        },
        {
          type: "usb",
          part: "FT232",
          ref: "U3",
          pins: [
            {
              pin: "3V3OUT",
              net: "+3.3V"
            },
            {
              pin: "VCCIO",
              net: "+3.3V"
            },
            {
              pin: "TEST",
              net: "GND"
            },
            {
              pin: "AGND",
              net: "GND"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "USBDP",
              net: "D+"
            },
            {
              pin: "USBDM",
              net: "D-"
            },
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "RXD",
              net: "N$20"
            },
            {
              pin: "TXD",
              net: "N$21"
            },
            {
              pin: "!RTS",
              net: "N$22"
            },
            {
              pin: "!DTR",
              net: "N$24"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R18",
              value: "10K_0603",
              net: "N$24"
            },
            {
              name: "R21",
              value: "1.2K_0805",
              net: "N$21"
            },
            {
              name: "R7",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R11",
              value: "10K_0603",
              net: "+3.3V"
            },
            {
              name: "R9",
              value: "10K_0603",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 2
    },
    {
      design: "TOP",
      interfaces: [
        {
          type: "wifi_ble",
          part: "ESP32",
          ref: "HC1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "180^_0603",
              net: "GREEN_INDICATOR"
            },
            {
              name: "R24",
              value: "180^_0603",
              net: "RED_INDICATOR"
            },
            {
              name: "R58",
              value: "JUMPER_0603_1/10W",
              net: "+3.3V"
            },
            {
              name: "R66",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R62",
              value: "JUMPER_0603_1/10W",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "HC1",
          value: ""
        }
      ],
      interfaceCount: 1
    },
    {
      design: "TouchMZ_In_Out_Board",
      interfaces: [
        {
          type: "usb",
          part: "FT232",
          ref: "U10",
          pins: [
            {
              pin: "TEST",
              net: "GND"
            },
            {
              pin: "AGND",
              net: "GND"
            },
            {
              pin: "GND",
              net: "GND"
            },
            {
              pin: "VCC",
              net: "+5V"
            },
            {
              pin: "VCCIO",
              net: "+5V"
            },
            {
              pin: "USBDP",
              net: "N$93"
            },
            {
              pin: "USBDM",
              net: "N$94"
            },
            {
              pin: "!RESET",
              net: "N$96"
            },
            {
              pin: "!DTR",
              net: "N$97"
            },
            {
              pin: "!DSR",
              net: "N$97"
            },
            {
              pin: "!RTS",
              net: "N$98"
            },
            {
              pin: "!CTS",
              net: "N$98"
            },
            {
              pin: "RXD",
              net: "N$100"
            },
            {
              pin: "TXD",
              net: "N$99"
            },
            {
              pin: "3V3OUT",
              net: "N$101"
            }
          ],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R67",
              value: "150^_0603",
              net: "N$99"
            },
            {
              name: "R69",
              value: "10K_0603",
              net: "N$96"
            },
            {
              name: "R70",
              value: "4.7K_0603",
              net: "N$96"
            },
            {
              name: "R68",
              value: "150^_0603",
              net: "N$100"
            },
            {
              name: "R70",
              value: "4.7K_0603",
              net: "+5V"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U9",
          value: "PIC18F24J10-I/SS"
        }
      ],
      interfaceCount: 1
    },
    {
      design: "ZLF0053_PIK",
      interfaces: [
        {
          type: "ble",
          part: "BLE",
          ref: "CA1",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R18",
              value: "75^_0805",
              net: "C7"
            },
            {
              name: "R17",
              value: "75^_0805",
              net: "C6"
            },
            {
              name: "R48",
              value: "75^_0805",
              net: "C1"
            },
            {
              name: "R13",
              value: "75^_0805",
              net: "C2"
            }
          ]
        },
        {
          type: "ble",
          part: "BLE",
          ref: "CA2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R19",
              value: "75^_0805",
              net: "C8"
            },
            {
              name: "R15",
              value: "75^_0805",
              net: "C4"
            },
            {
              name: "R16",
              value: "75^_0805",
              net: "C5"
            },
            {
              name: "R14",
              value: "75^_0805",
              net: "C3"
            }
          ]
        }
      ],
      mcus: [
        {
          name: "U1",
          value: "PIC18F26K22-I/SS"
        },
        {
          name: "U1A",
          value: "PIC18F26K226SP"
        }
      ],
      interfaceCount: 2
    },
    {
      design: "atsamd21_only",
      interfaces: [
        {
          type: "lora",
          part: "RFM97",
          ref: "U5",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R24",
              value: "10M_0603",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R20",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R17",
              value: "75^_0805",
              net: "+3.3V"
            },
            {
              name: "R16",
              value: "100K_0603",
              net: "+3.3V"
            }
          ]
        },
        {
          type: "ble",
          part: "NRF51822",
          ref: "IC2",
          pins: [],
          esdProtection: [],
          termination: [],
          biasResistors: [
            {
              name: "R25",
              value: "10K_0603",
              net: "N$26"
            },
            {
              name: "R24",
              value: "10M_0603",
              net: "+3.3V"
            },
            {
              name: "R7",
              value: "47K_0603",
              net: "+3.3V"
            },
            {
              name: "R20",
              value: "100K_0603",
              net: "+3.3V"
            },
            {
              name: "R17",
              value: "75^_0805",
              net: "+3.3V"
            }
          ]
        }
      ],
      mcus: [],
      interfaceCount: 2
    }
  ];

export const commInterfaceTypes = {
    wifi_ble: 33,
    usb: 25,
    ble: 23,
    lora: 10,
    ethernet_connector: 2,
    rs485: 1,
    onewire: 1
  };

export const commTransceiverParts = {
    ESP32: {
      count: 32,
      designs: 28
    },
    BLE: {
      count: 21,
      designs: 7
    },
    USB: {
      count: 12,
      designs: 10
    },
    FT232: {
      count: 12,
      designs: 9
    },
    RFM97: {
      count: 9,
      designs: 9
    },
    RJ45: {
      count: 2,
      designs: 1
    },
    NRF51822: {
      count: 2,
      designs: 2
    },
    ISL32173: {
      count: 1,
      designs: 1
    },
    DS18: {
      count: 1,
      designs: 1
    },
    "ESP-WROOM": {
      count: 1,
      designs: 1
    },
    RFM95: {
      count: 1,
      designs: 1
    },
    CH340: {
      count: 1,
      designs: 1
    }
  };
