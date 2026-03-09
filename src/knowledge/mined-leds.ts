import { LedDesign } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const ledDesigns: LedDesign[] = [
    {
      design: "AllInOne test board",
      ledCount: 4,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "1.2K_0805"
            },
            {
              name: "R11",
              value: "3306F-1-103"
            },
            {
              name: "R12",
              value: "3306F-1-103"
            },
            {
              name: "R10",
              value: "3306F-1-103"
            },
            {
              name: "R9",
              value: "3306F-1-103"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "1.2K_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R4",
              value: "1.2K_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R3",
              value: "1.2K_0805"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Astrodyne_chevy_replacement_BBU",
      ledCount: 5,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R2",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R5",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D15",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R24",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D16",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R26",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Astrodyne_chevy_replacement",
      ledCount: 5,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R2",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R5",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D15",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R24",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D16",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R26",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "BGW_Fan_Control_PIK",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "BGW_Fan_Control",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: {
            mcu: "ATMEGA328-AUR",
            pin: "PD2(INT0/PCINT18)"
          }
        }
      ],
      drivers: []
    },
    {
      design: "CPU-95",
      ledCount: 3,
      leds: [
        {
          ref: "LED201",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R18",
              value: "10K_AXIAL"
            },
            {
              name: "R107",
              value: "1K_AXIAL"
            },
            {
              name: "R28",
              value: "10K_AXIAL"
            },
            {
              name: "R108",
              value: "1K_AXIAL"
            },
            {
              name: "R29",
              value: "10K_AXIAL"
            },
            {
              name: "R4",
              value: "1K_AXIAL"
            },
            {
              name: "R41",
              value: "10K_AXIAL"
            },
            {
              name: "R117",
              value: "1K_AXIAL"
            },
            {
              name: "R1",
              value: "1K_AXIAL"
            },
            {
              name: "R40",
              value: "10K_AXIAL"
            },
            {
              name: "R21",
              value: "10K_AXIAL"
            },
            {
              name: "R94",
              value: "10K_AXIAL"
            },
            {
              name: "R22",
              value: "10K_AXIAL"
            },
            {
              name: "R2",
              value: "1K_AXIAL"
            },
            {
              name: "R34",
              value: "10K_AXIAL"
            },
            {
              name: "R32",
              value: "10K_AXIAL"
            },
            {
              name: "R17",
              value: "10K_AXIAL"
            },
            {
              name: "R86",
              value: "10K_AXIAL"
            },
            {
              name: "R84",
              value: "1K_AXIAL"
            },
            {
              name: "R37",
              value: "10K_AXIAL"
            },
            {
              name: "R42",
              value: "10K_AXIAL"
            },
            {
              name: "R15",
              value: "10K_AXIAL"
            },
            {
              name: "R39",
              value: "10K_AXIAL"
            },
            {
              name: "R106",
              value: "1K_AXIAL"
            },
            {
              name: "R27",
              value: "10K_AXIAL"
            },
            {
              name: "R38",
              value: "10K_AXIAL"
            },
            {
              name: "R19",
              value: "10K_AXIAL"
            },
            {
              name: "R31",
              value: "10K_AXIAL"
            },
            {
              name: "R114",
              value: "1K_AXIAL"
            },
            {
              name: "R33",
              value: "10K_AXIAL"
            },
            {
              name: "R35",
              value: "10K_AXIAL"
            },
            {
              name: "R110",
              value: "1K_AXIAL"
            },
            {
              name: "R20",
              value: "10K_AXIAL"
            },
            {
              name: "R113",
              value: "1K_AXIAL"
            },
            {
              name: "R97",
              value: "1K_AXIAL"
            },
            {
              name: "R112",
              value: "1K_AXIAL"
            },
            {
              name: "R36",
              value: "10K_AXIAL"
            },
            {
              name: "R14",
              value: "10K_AXIAL"
            },
            {
              name: "R16",
              value: "10K_AXIAL"
            },
            {
              name: "R30",
              value: "10K_AXIAL"
            },
            {
              name: "R111",
              value: "1K_AXIAL"
            },
            {
              name: "R109",
              value: "1K_AXIAL"
            },
            {
              name: "R3",
              value: "1K_AXIAL"
            },
            {
              name: "R96",
              value: "1K_AXIAL"
            },
            {
              name: "R6",
              value: "470^_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED202",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R8",
              value: "470^_AXIAL"
            },
            {
              name: "R18",
              value: "10K_AXIAL"
            },
            {
              name: "R107",
              value: "1K_AXIAL"
            },
            {
              name: "R28",
              value: "10K_AXIAL"
            },
            {
              name: "R108",
              value: "1K_AXIAL"
            },
            {
              name: "R29",
              value: "10K_AXIAL"
            },
            {
              name: "R4",
              value: "1K_AXIAL"
            },
            {
              name: "R41",
              value: "10K_AXIAL"
            },
            {
              name: "R117",
              value: "1K_AXIAL"
            },
            {
              name: "R1",
              value: "1K_AXIAL"
            },
            {
              name: "R40",
              value: "10K_AXIAL"
            },
            {
              name: "R21",
              value: "10K_AXIAL"
            },
            {
              name: "R94",
              value: "10K_AXIAL"
            },
            {
              name: "R22",
              value: "10K_AXIAL"
            },
            {
              name: "R2",
              value: "1K_AXIAL"
            },
            {
              name: "R34",
              value: "10K_AXIAL"
            },
            {
              name: "R32",
              value: "10K_AXIAL"
            },
            {
              name: "R17",
              value: "10K_AXIAL"
            },
            {
              name: "R86",
              value: "10K_AXIAL"
            },
            {
              name: "R84",
              value: "1K_AXIAL"
            },
            {
              name: "R37",
              value: "10K_AXIAL"
            },
            {
              name: "R42",
              value: "10K_AXIAL"
            },
            {
              name: "R15",
              value: "10K_AXIAL"
            },
            {
              name: "R39",
              value: "10K_AXIAL"
            },
            {
              name: "R106",
              value: "1K_AXIAL"
            },
            {
              name: "R27",
              value: "10K_AXIAL"
            },
            {
              name: "R38",
              value: "10K_AXIAL"
            },
            {
              name: "R19",
              value: "10K_AXIAL"
            },
            {
              name: "R31",
              value: "10K_AXIAL"
            },
            {
              name: "R114",
              value: "1K_AXIAL"
            },
            {
              name: "R33",
              value: "10K_AXIAL"
            },
            {
              name: "R35",
              value: "10K_AXIAL"
            },
            {
              name: "R110",
              value: "1K_AXIAL"
            },
            {
              name: "R20",
              value: "10K_AXIAL"
            },
            {
              name: "R113",
              value: "1K_AXIAL"
            },
            {
              name: "R97",
              value: "1K_AXIAL"
            },
            {
              name: "R112",
              value: "1K_AXIAL"
            },
            {
              name: "R36",
              value: "10K_AXIAL"
            },
            {
              name: "R14",
              value: "10K_AXIAL"
            },
            {
              name: "R16",
              value: "10K_AXIAL"
            },
            {
              name: "R30",
              value: "10K_AXIAL"
            },
            {
              name: "R111",
              value: "1K_AXIAL"
            },
            {
              name: "R109",
              value: "1K_AXIAL"
            },
            {
              name: "R3",
              value: "1K_AXIAL"
            },
            {
              name: "R96",
              value: "1K_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED203",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "470^_AXIAL"
            },
            {
              name: "R18",
              value: "10K_AXIAL"
            },
            {
              name: "R107",
              value: "1K_AXIAL"
            },
            {
              name: "R28",
              value: "10K_AXIAL"
            },
            {
              name: "R108",
              value: "1K_AXIAL"
            },
            {
              name: "R29",
              value: "10K_AXIAL"
            },
            {
              name: "R4",
              value: "1K_AXIAL"
            },
            {
              name: "R41",
              value: "10K_AXIAL"
            },
            {
              name: "R117",
              value: "1K_AXIAL"
            },
            {
              name: "R1",
              value: "1K_AXIAL"
            },
            {
              name: "R40",
              value: "10K_AXIAL"
            },
            {
              name: "R21",
              value: "10K_AXIAL"
            },
            {
              name: "R94",
              value: "10K_AXIAL"
            },
            {
              name: "R22",
              value: "10K_AXIAL"
            },
            {
              name: "R2",
              value: "1K_AXIAL"
            },
            {
              name: "R34",
              value: "10K_AXIAL"
            },
            {
              name: "R32",
              value: "10K_AXIAL"
            },
            {
              name: "R17",
              value: "10K_AXIAL"
            },
            {
              name: "R86",
              value: "10K_AXIAL"
            },
            {
              name: "R84",
              value: "1K_AXIAL"
            },
            {
              name: "R37",
              value: "10K_AXIAL"
            },
            {
              name: "R42",
              value: "10K_AXIAL"
            },
            {
              name: "R15",
              value: "10K_AXIAL"
            },
            {
              name: "R39",
              value: "10K_AXIAL"
            },
            {
              name: "R106",
              value: "1K_AXIAL"
            },
            {
              name: "R27",
              value: "10K_AXIAL"
            },
            {
              name: "R38",
              value: "10K_AXIAL"
            },
            {
              name: "R19",
              value: "10K_AXIAL"
            },
            {
              name: "R31",
              value: "10K_AXIAL"
            },
            {
              name: "R114",
              value: "1K_AXIAL"
            },
            {
              name: "R33",
              value: "10K_AXIAL"
            },
            {
              name: "R35",
              value: "10K_AXIAL"
            },
            {
              name: "R110",
              value: "1K_AXIAL"
            },
            {
              name: "R20",
              value: "10K_AXIAL"
            },
            {
              name: "R113",
              value: "1K_AXIAL"
            },
            {
              name: "R97",
              value: "1K_AXIAL"
            },
            {
              name: "R112",
              value: "1K_AXIAL"
            },
            {
              name: "R36",
              value: "10K_AXIAL"
            },
            {
              name: "R14",
              value: "10K_AXIAL"
            },
            {
              name: "R16",
              value: "10K_AXIAL"
            },
            {
              name: "R30",
              value: "10K_AXIAL"
            },
            {
              name: "R111",
              value: "1K_AXIAL"
            },
            {
              name: "R109",
              value: "1K_AXIAL"
            },
            {
              name: "R3",
              value: "1K_AXIAL"
            },
            {
              name: "R96",
              value: "1K_AXIAL"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "CarterHoffmann485DisplayAlternate",
      ledCount: 4,
      leds: [
        {
          ref: "D5",
          value: "LED_RADIAL",
          color: "blue",
          limitingResistors: [
            {
              name: "R15",
              value: "220^_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RADIAL",
          color: "blue",
          limitingResistors: [
            {
              name: "R31",
              value: "220^_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RADIAL",
          color: "blue",
          limitingResistors: [
            {
              name: "R31",
              value: "220^_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RADIAL",
          color: "blue",
          limitingResistors: [
            {
              name: "R15",
              value: "220^_0805"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "DC-DC_IO_expansion_board",
      ledCount: 2,
      leds: [
        {
          ref: "LED1",
          value: "ASMB-TTF2-0B20B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R42",
              value: "4.7K_0603"
            },
            {
              name: "R25",
              value: "JUMPER_0603_1/10W"
            },
            {
              name: "R41",
              value: "4.7K_0603"
            },
            {
              name: "R40",
              value: "4.7K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED2",
          value: "ASMB-TTF2-0B20B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R42",
              value: "4.7K_0603"
            },
            {
              name: "R25",
              value: "JUMPER_0603_1/10W"
            },
            {
              name: "R41",
              value: "4.7K_0603"
            },
            {
              name: "R40",
              value: "4.7K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: [
        {
          name: "U8",
          value: "AL6408"
        }
      ]
    },
    {
      design: "DISDMD",
      ledCount: 16,
      leds: [
        {
          ref: "LED1",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED2",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED9",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED3",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED4",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED5",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED6",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED7",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED8",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED10",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED11",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED12",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED13",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED14",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED15",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED16",
          value: "FYM-15FF1B",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "ESP32_LoRa_1_Channel_Gateway",
      ledCount: 2,
      leds: [
        {
          ref: "D2",
          value: "LED-BLUE",
          color: "blue",
          limitingResistors: [
            {
              name: "R2",
              value: "1k"
            },
            {
              name: "R3",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D1",
          value: "LED-RED",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "10k"
            },
            {
              name: "R4",
              value: "10k"
            },
            {
              name: "R9",
              value: "2.2k"
            },
            {
              name: "R5",
              value: "10k"
            },
            {
              name: "R6",
              value: "2.2k"
            },
            {
              name: "R2",
              value: "1k"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "MPU080_PCB",
      ledCount: 2,
      leds: [
        {
          ref: "LED1",
          value: "HLMP6",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED2",
          value: "HLMP6",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Main_Board_PIK",
      ledCount: 7,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R6",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R37",
              value: "1K_0603"
            },
            {
              name: "R10",
              value: "150^_0603"
            },
            {
              name: "R57",
              value: "27K_0805_0.125W"
            },
            {
              name: "R26",
              value: "1K_0603"
            },
            {
              name: "R28",
              value: "1K_0805_0.1%"
            },
            {
              name: "R49",
              value: "1K_0805_0.1%"
            },
            {
              name: "R5",
              value: "27K_0805_0.125W"
            },
            {
              name: "R27",
              value: "150^_0603"
            },
            {
              name: "R4",
              value: "27K_0805_0.125W"
            },
            {
              name: "R56",
              value: "27K_0805_0.125W"
            },
            {
              name: "R55",
              value: "27K_0805_0.125W"
            },
            {
              name: "R9",
              value: "150^_0603"
            },
            {
              name: "R47",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D10",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R39",
              value: "1K_0603"
            },
            {
              name: "R42",
              value: "140K_0603"
            },
            {
              name: "R43",
              value: "220K_0805"
            },
            {
              name: "R50",
              value: "10.5K_0805_0.1%"
            },
            {
              name: "R22",
              value: "1M_0805_1%"
            },
            {
              name: "R32",
              value: "1M_0805_1%"
            },
            {
              name: "R33",
              value: "1K_0805_0.1%"
            },
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R8",
              value: "3.3K_0603"
            },
            {
              name: "R6",
              value: "10K_0603"
            },
            {
              name: "R1",
              value: "1M_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "3.3K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Main_Board",
      ledCount: 7,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R6",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R37",
              value: "1K_0603"
            },
            {
              name: "R10",
              value: "150^_0603"
            },
            {
              name: "R57",
              value: "27K_0805_0.125W"
            },
            {
              name: "R26",
              value: "1K_0603"
            },
            {
              name: "R28",
              value: "1K_0805_0.1%"
            },
            {
              name: "R49",
              value: "1K_0805_0.1%"
            },
            {
              name: "R5",
              value: "27K_0805_0.125W"
            },
            {
              name: "R27",
              value: "150^_0603"
            },
            {
              name: "R4",
              value: "27K_0805_0.125W"
            },
            {
              name: "R56",
              value: "27K_0805_0.125W"
            },
            {
              name: "R55",
              value: "27K_0805_0.125W"
            },
            {
              name: "R9",
              value: "150^_0603"
            },
            {
              name: "R47",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D10",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R39",
              value: "1K_0603"
            },
            {
              name: "R42",
              value: "140K_0603"
            },
            {
              name: "R43",
              value: "220K_0805"
            },
            {
              name: "R50",
              value: "10.5K_0805_0.1%"
            },
            {
              name: "R22",
              value: "1M_0805_1%"
            },
            {
              name: "R32",
              value: "1M_0805_1%"
            },
            {
              name: "R33",
              value: "1K_0805_0.1%"
            },
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R8",
              value: "3.3K_0603"
            },
            {
              name: "R6",
              value: "10K_0603"
            },
            {
              name: "R1",
              value: "1M_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "3.3K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Main_Board_test_stand",
      ledCount: 7,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R6",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R37",
              value: "1K_0603"
            },
            {
              name: "R10",
              value: "150^_0603"
            },
            {
              name: "R57",
              value: "27K_0805_0.125W"
            },
            {
              name: "R26",
              value: "1K_0603"
            },
            {
              name: "R28",
              value: "1K_0805_0.1%"
            },
            {
              name: "R49",
              value: "1K_0805_0.1%"
            },
            {
              name: "R5",
              value: "27K_0805_0.125W"
            },
            {
              name: "R27",
              value: "150^_0603"
            },
            {
              name: "R4",
              value: "27K_0805_0.125W"
            },
            {
              name: "R56",
              value: "27K_0805_0.125W"
            },
            {
              name: "R55",
              value: "27K_0805_0.125W"
            },
            {
              name: "R9",
              value: "150^_0603"
            },
            {
              name: "R47",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "D10",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R39",
              value: "1K_0603"
            },
            {
              name: "R42",
              value: "140K_0603"
            },
            {
              name: "R43",
              value: "220K_0805"
            },
            {
              name: "R50",
              value: "10.5K_0805_0.1%"
            },
            {
              name: "R22",
              value: "1M_0805_1%"
            },
            {
              name: "R32",
              value: "1M_0805_1%"
            },
            {
              name: "R33",
              value: "1K_0805_0.1%"
            },
            {
              name: "R7",
              value: "3.3K_0603"
            },
            {
              name: "R8",
              value: "3.3K_0603"
            },
            {
              name: "R6",
              value: "10K_0603"
            },
            {
              name: "R1",
              value: "1M_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "3.3K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Noah 2.0 Beta Layout",
      ledCount: 1,
      leds: [
        {
          ref: "D18",
          value: "LTST-C19HE1WT",
          color: "unknown",
          limitingResistors: [
            {
              name: "R18",
              value: "470k"
            },
            {
              name: "R112",
              value: "10M"
            },
            {
              name: "R106",
              value: "1M"
            },
            {
              name: "R44",
              value: "1M"
            },
            {
              name: "R103",
              value: "DNP"
            },
            {
              name: "R32",
              value: "DNP"
            },
            {
              name: "R26",
              value: "100"
            },
            {
              name: "R27",
              value: "100"
            },
            {
              name: "R25",
              value: "100"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Noah 2.0 WIP PCB",
      ledCount: 3,
      leds: [
        {
          ref: "D11",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R27",
              value: "100"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D12",
          value: "G",
          color: "unknown",
          limitingResistors: [
            {
              name: "R26",
              value: "100"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D13",
          value: "B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R25",
              value: "100"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Noah_2.0_WIP_PIK_PCB",
      ledCount: 22,
      leds: [
        {
          ref: "D11",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R27",
              value: "100"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D12",
          value: "G",
          color: "unknown",
          limitingResistors: [
            {
              name: "R26",
              value: "100"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D13",
          value: "B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R25",
              value: "100"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D14",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R28",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D15",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R29",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D16",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R43",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D17",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R44",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D18",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R45",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D19",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R46",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D20",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R47",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D21",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R48",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D22",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R49",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D23",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R50",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D24",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R51",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D25",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R52",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D26",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R53",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D27",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R54",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D28",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R55",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D29",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R56",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D30",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R57",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D31",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R58",
              value: "1k"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D32",
          value: "R",
          color: "unknown",
          limitingResistors: [
            {
              name: "R59",
              value: "1k"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "NuvoLiteBrick_PCB",
      ledCount: 1,
      leds: [
        {
          ref: "D21",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R133",
              value: "10^_0603"
            },
            {
              name: "R42",
              value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
            },
            {
              name: "R26",
              value: "10K_0603"
            },
            {
              name: "R107",
              value: "10K_0603"
            },
            {
              name: "R28",
              value: "10K_0603"
            },
            {
              name: "R14",
              value: "10K_0603"
            },
            {
              name: "R76",
              value: "8.66K_0603"
            },
            {
              name: "R122",
              value: "10K_0603"
            },
            {
              name: "R99",
              value: "4.02K_0603"
            },
            {
              name: "R121",
              value: "10K_0603"
            },
            {
              name: "R19",
              value: "10K_0603"
            },
            {
              name: "R119",
              value: "8.66K_0603"
            },
            {
              name: "R23",
              value: "2.2K_0805"
            },
            {
              name: "R30",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "NuvoLite_PCB_PIK_Bottom",
      ledCount: 1,
      leds: [
        {
          ref: "D21",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R133",
              value: "10^_0603"
            },
            {
              name: "R42",
              value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
            },
            {
              name: "R26",
              value: "10K_0603"
            },
            {
              name: "R107",
              value: "10K_0603"
            },
            {
              name: "R28",
              value: "10K_0603"
            },
            {
              name: "R14",
              value: "10K_0603"
            },
            {
              name: "R76",
              value: "8.66K_0603"
            },
            {
              name: "R122",
              value: "10K_0603"
            },
            {
              name: "R99",
              value: "4.02K_0603"
            },
            {
              name: "R121",
              value: "10K_0603"
            },
            {
              name: "R19",
              value: "10K_0603"
            },
            {
              name: "R119",
              value: "8.66K_0603"
            },
            {
              name: "R23",
              value: "2.2K_0805"
            },
            {
              name: "R30",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "NuvoLite_PCB_PIK_Top",
      ledCount: 1,
      leds: [
        {
          ref: "D21",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R133",
              value: "10^_0603"
            },
            {
              name: "R42",
              value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
            },
            {
              name: "R26",
              value: "10K_0603"
            },
            {
              name: "R107",
              value: "10K_0603"
            },
            {
              name: "R28",
              value: "10K_0603"
            },
            {
              name: "R14",
              value: "10K_0603"
            },
            {
              name: "R76",
              value: "8.66K_0603"
            },
            {
              name: "R122",
              value: "10K_0603"
            },
            {
              name: "R99",
              value: "4.02K_0603"
            },
            {
              name: "R121",
              value: "10K_0603"
            },
            {
              name: "R19",
              value: "10K_0603"
            },
            {
              name: "R119",
              value: "8.66K_0603"
            },
            {
              name: "R23",
              value: "2.2K_0805"
            },
            {
              name: "R30",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "NuvoLite_PCB",
      ledCount: 1,
      leds: [
        {
          ref: "D21",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R133",
              value: "10^_0603"
            },
            {
              name: "R42",
              value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0"
            },
            {
              name: "R26",
              value: "10K_0603"
            },
            {
              name: "R107",
              value: "10K_0603"
            },
            {
              name: "R28",
              value: "10K_0603"
            },
            {
              name: "R14",
              value: "10K_0603"
            },
            {
              name: "R76",
              value: "8.66K_0603"
            },
            {
              name: "R122",
              value: "10K_0603"
            },
            {
              name: "R99",
              value: "4.02K_0603"
            },
            {
              name: "R121",
              value: "10K_0603"
            },
            {
              name: "R19",
              value: "10K_0603"
            },
            {
              name: "R119",
              value: "8.66K_0603"
            },
            {
              name: "R23",
              value: "2.2K_0805"
            },
            {
              name: "R30",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0660-7_PIK",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LTST-C19HE1WT",
          color: "unknown",
          limitingResistors: [
            {
              name: "R1",
              value: "180^_0603"
            },
            {
              name: "R15",
              value: "180^_0603"
            },
            {
              name: "R21",
              value: "75^_0805"
            },
            {
              name: "R20",
              value: "10K_0603"
            },
            {
              name: "R10",
              value: "10K_0805_1%"
            },
            {
              name: "R26",
              value: "100K_0603"
            },
            {
              name: "R2",
              value: "FERRITE_330^_0805"
            },
            {
              name: "R14",
              value: "100K_0603"
            },
            {
              name: "R34",
              value: "10K_0603"
            },
            {
              name: "R16",
              value: "10K_0603"
            },
            {
              name: "R62",
              value: "JUMPER_0805"
            },
            {
              name: "R63",
              value: "JUMPER_0805"
            },
            {
              name: "R11",
              value: "JUMPER_0805"
            },
            {
              name: "R13",
              value: "100K_0603"
            },
            {
              name: "R24",
              value: "100K_0603"
            },
            {
              name: "R12",
              value: "100K_0603"
            },
            {
              name: "R7",
              value: "47K_0603"
            },
            {
              name: "R3",
              value: "FERRITE_330^_0805"
            },
            {
              name: "R9",
              value: "10K_0805_1%"
            },
            {
              name: "R52",
              value: "10K_0603"
            },
            {
              name: "R17",
              value: "75^_0805"
            },
            {
              name: "R27",
              value: "180^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0660-7",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LTST-C19HE1WT",
          color: "unknown",
          limitingResistors: [
            {
              name: "R1",
              value: "180^_0603"
            },
            {
              name: "R15",
              value: "180^_0603"
            },
            {
              name: "R21",
              value: "75^_0805"
            },
            {
              name: "R20",
              value: "10K_0603"
            },
            {
              name: "R10",
              value: "10K_0805_1%"
            },
            {
              name: "R26",
              value: "100K_0603"
            },
            {
              name: "R2",
              value: "FERRITE_330^_0805"
            },
            {
              name: "R14",
              value: "100K_0603"
            },
            {
              name: "R34",
              value: "10K_0603"
            },
            {
              name: "R16",
              value: "10K_0603"
            },
            {
              name: "R62",
              value: "JUMPER_0805"
            },
            {
              name: "R63",
              value: "JUMPER_0805"
            },
            {
              name: "R11",
              value: "JUMPER_0805"
            },
            {
              name: "R13",
              value: "100K_0603"
            },
            {
              name: "R24",
              value: "100K_0603"
            },
            {
              name: "R12",
              value: "100K_0603"
            },
            {
              name: "R7",
              value: "47K_0603"
            },
            {
              name: "R3",
              value: "FERRITE_330^_0805"
            },
            {
              name: "R9",
              value: "10K_0805_1%"
            },
            {
              name: "R52",
              value: "10K_0603"
            },
            {
              name: "R17",
              value: "75^_0805"
            },
            {
              name: "R27",
              value: "180^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0714-1_PIK",
      ledCount: 8,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R2",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R3",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R4",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R5",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R6",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0738-0_PIK",
      ledCount: 2,
      leds: [
        {
          ref: "LED1",
          value: "ASMB-TTF2-0B20B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R42",
              value: "4.7K_0603"
            },
            {
              name: "R25",
              value: "JUMPER_0603_1/10W"
            },
            {
              name: "R41",
              value: "4.7K_0603"
            },
            {
              name: "R40",
              value: "4.7K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED2",
          value: "ASMB-TTF2-0B20B",
          color: "unknown",
          limitingResistors: [
            {
              name: "R42",
              value: "4.7K_0603"
            },
            {
              name: "R25",
              value: "JUMPER_0603_1/10W"
            },
            {
              name: "R41",
              value: "4.7K_0603"
            },
            {
              name: "R40",
              value: "4.7K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: [
        {
          name: "U8",
          value: "AL6408"
        }
      ]
    },
    {
      design: "PCBLF0742-0_PIK_TOP",
      ledCount: 1,
      leds: [
        {
          ref: "D18",
          value: "LTST-C19HE1WT",
          color: "unknown",
          limitingResistors: [
            {
              name: "R18",
              value: "470k"
            },
            {
              name: "R112",
              value: "10M"
            },
            {
              name: "R106",
              value: "1M"
            },
            {
              name: "R44",
              value: "1M"
            },
            {
              name: "R103",
              value: "DNP"
            },
            {
              name: "R32",
              value: "DNP"
            },
            {
              name: "R26",
              value: "100"
            },
            {
              name: "R27",
              value: "100"
            },
            {
              name: "R25",
              value: "100"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0752-0_PIK",
      ledCount: 5,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R2",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R5",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D15",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R24",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D16",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R26",
              value: "1.2K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0804-2_PIK",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "PCBLF0804-4_PIK",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "ProSmoker_PK100",
      ledCount: 1,
      leds: [
        {
          ref: "D16",
          value: "SUNLED_XZMDKCBDDG45S-9",
          color: "unknown",
          limitingResistors: [
            {
              name: "R25",
              value: "180^_0603"
            },
            {
              name: "R24",
              value: "180^_0603"
            },
            {
              name: "R75",
              value: "180^_0603"
            },
            {
              name: "R26",
              value: "10K_0603"
            },
            {
              name: "R28",
              value: "10K_0603"
            },
            {
              name: "R27",
              value: "10K_0603"
            },
            {
              name: "R11",
              value: "10K_0603"
            },
            {
              name: "R29",
              value: "10K_0603"
            },
            {
              name: "R30",
              value: "10K_0603"
            },
            {
              name: "R32",
              value: "1.2K_0603"
            },
            {
              name: "R12",
              value: "1.62K_0805_0.1%"
            },
            {
              name: "R53",
              value: "10K_0603"
            },
            {
              name: "R8",
              value: "1.62K_0805_0.1%"
            },
            {
              name: "R23",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-16514",
      ledCount: 2,
      leds: [
        {
          ref: "D1",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "165^_1206"
            },
            {
              name: "R5",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R6",
              value: "50^_1206"
            },
            {
              name: "R1",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "165^_1206"
            },
            {
              name: "R5",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R6",
              value: "50^_1206"
            },
            {
              name: "R4",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-16515",
      ledCount: 1,
      leds: [
        {
          ref: "D1",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R4",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R5",
              value: "50^_1206"
            },
            {
              name: "R6",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-16920",
      ledCount: 1,
      leds: [
        {
          ref: "D6",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R6",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R11",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R12",
              value: "50^_1206"
            },
            {
              name: "R13",
              value: "165^_1206"
            },
            {
              name: "R14",
              value: "JUMPER_1206_1/4W"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-17012",
      ledCount: 2,
      leds: [
        {
          ref: "D1",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R10",
              value: "165^_1206"
            },
            {
              name: "R7",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R8",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R9",
              value: "50^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R11",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R12",
              value: "50^_1206"
            },
            {
              name: "R13",
              value: "165^_1206"
            },
            {
              name: "R14",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R4",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-17013",
      ledCount: 2,
      leds: [
        {
          ref: "D5",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R8",
              value: "50^_1206"
            },
            {
              name: "R9",
              value: "165^_1206"
            },
            {
              name: "R6",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R5",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R8",
              value: "50^_1206"
            },
            {
              name: "R9",
              value: "165^_1206"
            },
            {
              name: "R6",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R3",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "RD-A-17356",
      ledCount: 14,
      leds: [
        {
          ref: "D1",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R26",
              value: "50^_1206"
            },
            {
              name: "R25",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R24",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R27",
              value: "165^_1206"
            },
            {
              name: "R1",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R26",
              value: "50^_1206"
            },
            {
              name: "R25",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R24",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R27",
              value: "165^_1206"
            },
            {
              name: "R2",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R26",
              value: "50^_1206"
            },
            {
              name: "R25",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R24",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R27",
              value: "165^_1206"
            },
            {
              name: "R3",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R4",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            },
            {
              name: "R5",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R6",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R7",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            },
            {
              name: "R8",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D9",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R9",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R32",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R33",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R34",
              value: "50^_1206"
            },
            {
              name: "R35",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D10",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R10",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R29",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R30",
              value: "50^_1206"
            },
            {
              name: "R28",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R31",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D11",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R29",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R30",
              value: "50^_1206"
            },
            {
              name: "R28",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R31",
              value: "165^_1206"
            },
            {
              name: "R11",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D12",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R12",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R29",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R30",
              value: "50^_1206"
            },
            {
              name: "R28",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R31",
              value: "165^_1206"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D22",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R22",
              value: "100^_1206_1%_0.5W"
            },
            {
              name: "R42",
              value: "50^_1206"
            },
            {
              name: "R41",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R43",
              value: "165^_1206"
            },
            {
              name: "R40",
              value: "JUMPER_1206_1/4W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D23",
          value: "LTW-006DCG-E2",
          color: "unknown",
          limitingResistors: [
            {
              name: "R42",
              value: "50^_1206"
            },
            {
              name: "R41",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R43",
              value: "165^_1206"
            },
            {
              name: "R40",
              value: "JUMPER_1206_1/4W"
            },
            {
              name: "R23",
              value: "100^_1206_1%_0.5W"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "SMT_Control_Board",
      ledCount: 1,
      leds: [
        {
          ref: "LED1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R30",
              value: "120^_0603"
            },
            {
              name: "R13",
              value: "2.7K_0603"
            },
            {
              name: "R14",
              value: "2.7K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "SSC",
      ledCount: 8,
      leds: [
        {
          ref: "LED1",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED2",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R4",
              value: "120^_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED3",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED4",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R3",
              value: "120^_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED5",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R2",
              value: "120^_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED6",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        },
        {
          ref: "LED7",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [
            {
              name: "R1",
              value: "120^_AXIAL"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "LED8",
          value: "HLMP-3301-F00DD",
          color: "unknown",
          limitingResistors: [],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Southbend_RTD_control",
      ledCount: 1,
      leds: [
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: {
            mcu: "ATMEGA328-AUR",
            pin: "PD2(INT0/PCINT18)"
          }
        }
      ],
      drivers: []
    },
    {
      design: "TSC1500_WiFi_Relay_Board",
      ledCount: 1,
      leds: [
        {
          ref: "LED1",
          value: "7SEG-CK",
          color: "unknown",
          limitingResistors: [
            {
              name: "R31",
              value: "10K_AXIAL"
            },
            {
              name: "R28",
              value: "10K_AXIAL"
            },
            {
              name: "R29",
              value: "10K_AXIAL"
            },
            {
              name: "R27",
              value: "10K_AXIAL"
            },
            {
              name: "R30",
              value: "10K_AXIAL"
            },
            {
              name: "R25",
              value: "10K_AXIAL"
            },
            {
              name: "R26",
              value: "10K_AXIAL"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "Test_Set",
      ledCount: 15,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R1",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R2",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R3",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R4",
              value: "620^_1210"
            },
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R5",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R6",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R7",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R8",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D9",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R9",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D10",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R10",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D11",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R11",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D12",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R12",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D13",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R13",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D14",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R14",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D15",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R16",
              value: "JUMPER_1206_1/2W"
            },
            {
              name: "R15",
              value: "620^_1210"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "TiltAudio_RE",
      ledCount: 5,
      leds: [
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R34",
              value: "1.2K_0805"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R7",
              value: "10K_0805_1%"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R33",
              value: "1.2K_0805"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R7",
              value: "10K_0805_1%"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R7",
              value: "10K_0805_1%"
            },
            {
              name: "R25",
              value: "10K_0603"
            },
            {
              name: "R32",
              value: "4.7K_0805_5%_0.125W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R7",
              value: "10K_0805_1%"
            },
            {
              name: "R25",
              value: "10K_0603"
            },
            {
              name: "R3",
              value: "1.2K_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "ZENER_3.3V",
          color: "unknown",
          limitingResistors: [
            {
              name: "R4",
              value: "10K_0805_1%"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R7",
              value: "10K_0805_1%"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "TiltAudio_RE_recovery",
      ledCount: 5,
      leds: [
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R34",
              value: "1.2K_0805"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R33",
              value: "1.2K_0805"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R25",
              value: "10K_0603"
            },
            {
              name: "R32",
              value: "4.7K_0805_5%_0.125W"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D1",
          value: "ZENER_3.3V",
          color: "red",
          limitingResistors: [
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R25",
              value: "10K_0603"
            },
            {
              name: "R3",
              value: "1.2K_0805"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "ZENER_3.3V",
          color: "unknown",
          limitingResistors: [
            {
              name: "R4",
              value: "10K_0805_1%"
            },
            {
              name: "R23",
              value: "10K_0603"
            },
            {
              name: "R21",
              value: "100K_0805"
            },
            {
              name: "R2",
              value: "10K_0805_1%"
            },
            {
              name: "R19",
              value: "100K_0805"
            },
            {
              name: "R25",
              value: "10K_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    },
    {
      design: "TouchMZ_In_Out_Board",
      ledCount: 8,
      leds: [
        {
          ref: "D1",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R1",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D2",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R2",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D3",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R3",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D4",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R4",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D5",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R5",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D6",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R6",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D7",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R7",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        },
        {
          ref: "D8",
          value: "LED_RED_0805",
          color: "red",
          limitingResistors: [
            {
              name: "R8",
              value: "100^_0603"
            }
          ],
          mcuDrive: null
        }
      ],
      drivers: []
    }
  ];

export const ledColorDistribution = {
    red: 90,
    unknown: 88,
    blue: 5
  };

export const ledCurrentLimitingResistors = {
    "10K_AXIAL": 88,
    "10K_0603": 73,
    "1K_AXIAL": 51,
    "JUMPER_1206_1/4W": 41,
    "100^_0603": 34,
    "1k": 22,
    "165^_1206": 22,
    "50^_1206": 22,
    "100^_1206_1%_0.5W": 22,
    "10K_0805_1%": 21,
    "100K_0805": 20,
    "27K_0805_0.125W": 15,
    "JUMPER_1206_1/2W": 15,
    "620^_1210": 15,
    "4.7K_0603": 12
  };
