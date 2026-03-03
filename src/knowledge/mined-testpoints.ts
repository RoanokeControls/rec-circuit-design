import { TestPointDesign } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const testPointDesigns: TestPointDesign[] = [
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      testPoints: [
        {
          name: "J15",
          net: "COLON",
          category: "signal"
        },
        {
          name: "J15",
          net: "COLON_12V",
          category: "signal"
        },
        {
          name: "J15",
          net: "COLON_5V",
          category: "signal"
        },
        {
          name: "J16",
          net: "PGD",
          category: "programming"
        },
        {
          name: "J16",
          net: "+3.3V",
          category: "power"
        },
        {
          name: "J16",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J6",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "N$14",
            "+3.3V",
            "N$13",
            "GND"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 6
    },
    {
      design: "12_inch_CD_Timer_Control",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J6",
          value: "TC2030_ICSP",
          nets: [
            "N$14",
            "+3.3V",
            "N$13",
            "GND",
            "N$12"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "520-5047(DPS005)",
      testPoints: [
        {
          name: "TP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "TP2",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP3",
          net: "+12V",
          category: "power"
        },
        {
          name: "TP4",
          net: "-12V",
          category: "signal"
        },
        {
          name: "TP5",
          net: "-110V",
          category: "signal"
        },
        {
          name: "TP6",
          net: "+68V",
          category: "power"
        },
        {
          name: "TP7",
          net: "-100V",
          category: "signal"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 7
    },
    {
      design: "8345(WDP3211A)",
      testPoints: [
        {
          name: "TP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "TP2",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP3",
          net: "+12V",
          category: "power"
        },
        {
          name: "TP4",
          net: "-12V",
          category: "signal"
        },
        {
          name: "TP6",
          net: "+100V",
          category: "power"
        },
        {
          name: "TP7",
          net: "-100V",
          category: "signal"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 6
    },
    {
      design: "All-In-One_Schematic_IO_Board",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J1",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+3.3V",
            "N$9",
            "GND",
            "PGC"
          ],
          pinCount: 5
        },
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PIC_TX",
            "DEBUG_SCL",
            "+3.3V",
            "PIC_RX",
            "GND",
            "DEBUG_SDA"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J1",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+3.3V",
            "N$9",
            "GND",
            "PGC"
          ],
          pinCount: 5
        },
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PIC_TX",
            "DEBUG_SCL",
            "+3.3V",
            "PIC_RX",
            "GND",
            "DEBUG_SDA"
          ],
          pinCount: 6
        },
        {
          name: "J17",
          value: "TC2030_ICSP",
          nets: [
            "ESP_EN",
            "ESP32A_IO0",
            "ESP32A_PGM_TX",
            "+3.3V_ESP",
            "GND",
            "ESP32A_PGM_RX"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "All-In-One_Schematic",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+3.3V",
            "N$3",
            "GND",
            "PGC"
          ],
          pinCount: 5
        },
        {
          name: "J3",
          value: "TC2030_ICSP",
          nets: [
            "ESP32_PGM_TX",
            "ESP32_PGM_RX",
            "ESP32_EN",
            "+3.3V",
            "ESP32_IO0",
            "GND"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "Alpha_sign_control",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J6",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "N$14",
            "+3.3V",
            "N$13",
            "GND"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "Astrodyne_chevy_replacement_BBU",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "TAG",
          value: "TC2030_ICSP",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "Astrodyne_chevy_replacement",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "TAG",
          value: "TC2030_ICSP",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "CapSense",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J3",
          value: "TC2030_ICSP",
          nets: [
            "VDD",
            "VSS(GND)"
          ],
          pinCount: 2
        }
      ],
      testPointCount: 0
    },
    {
      design: "CarterHoffmann485DisplayAlternate",
      testPoints: [
        {
          name: "TP1",
          net: "RS485A",
          category: "serial_bus"
        },
        {
          name: "TP2",
          net: "RS485B",
          category: "serial_bus"
        },
        {
          name: "TP3",
          net: "USDS_SEL",
          category: "signal"
        },
        {
          name: "TP4",
          net: "+8.5V",
          category: "power"
        },
        {
          name: "TP5",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP6",
          net: "SWITCH1",
          category: "signal"
        },
        {
          name: "TP7",
          net: "SWITCH2",
          category: "signal"
        }
      ],
      debugHeaders: [
        {
          name: "JP1",
          value: "6P_0.1_VERT",
          type: "debug",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ]
        }
      ],
      icspConnectors: [
        {
          name: "J10",
          value: "TC2030_ICSP",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 7
    },
    {
      design: "Clamshell_Grill",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J10",
          value: "TC2030_ICSP",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "FGLF0623_Triac_Board_Original",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "JP",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+5V",
            "N$3",
            "GND",
            "PGC"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "FGLF0623_Triac_Board",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "JP",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+5V",
            "N$3",
            "GND",
            "PGC"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "Field Updater",
      testPoints: [],
      debugHeaders: [
        {
          name: "JP2",
          value: "6130XX21121_61300621121",
          type: "uart_debug",
          nets: [
            "PROG_DATA",
            "+3.3V",
            "SERIAL_RX",
            "PROG_EN",
            "SERIAL_TX",
            "PROG_RST"
          ]
        },
        {
          name: "JP3",
          value: "PINHD-2X8",
          type: "uart_debug",
          nets: [
            "POGO_ADDR1",
            "POGO_ADDR2",
            "PROG_DATA",
            "POGO_ID0",
            "+3.3V",
            "POGO_ADDR0",
            "SERIAL_RX",
            "PROG_EN",
            "POGO_ID2",
            "POGO_ID3"
          ]
        }
      ],
      icspConnectors: [],
      testPointCount: 0
    },
    {
      design: "Jumper_config",
      testPoints: [
        {
          name: "J1",
          net: "N$4",
          category: "unlabeled"
        },
        {
          name: "J1",
          net: "N$3",
          category: "unlabeled"
        },
        {
          name: "J2",
          net: "N$2",
          category: "unlabeled"
        },
        {
          name: "J2",
          net: "N$1",
          category: "unlabeled"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 4
    },
    {
      design: "LCD_Control",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PIC_TX",
            "DEBUG_SCL",
            "+3.3V",
            "PIC_RX",
            "GND",
            "DEBUG_SDA"
          ],
          pinCount: 6
        },
        {
          name: "J17",
          value: "TC2030_ICSP",
          nets: [
            "ESP_EN",
            "ESP32A_IO0",
            "ESP32A_PGM_TX",
            "+3.3V_ESP",
            "GND",
            "ESP32A_PGM_RX"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "LED1_PIK_FID",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "LED1",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "LED2_PIK_FID",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "LED2",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "Lid_Neo",
      testPoints: [
        {
          name: "J5",
          net: "+3.3V",
          category: "power"
        },
        {
          name: "J5",
          net: "N$1",
          category: "unlabeled"
        },
        {
          name: "J5",
          net: "+5V",
          category: "power"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 3
    },
    {
      design: "Livewell Schematic",
      testPoints: [],
      debugHeaders: [
        {
          name: "JP1",
          value: "6P_0.1_VERT",
          type: "debug",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ]
        }
      ],
      icspConnectors: [
        {
          name: "J7",
          value: "TC2030_ICSP",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "Main_Board",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J2",
          value: "TC2030_ICSP",
          nets: [
            "N$53",
            "N$47",
            "N$52",
            "+5V",
            "GND"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "Noah 2.0 Beta Layout",
      testPoints: [
        {
          name: "TP1",
          net: "N$30_BAT_PROT_SUPPLY",
          category: "unlabeled"
        },
        {
          name: "TP2",
          net: "+V",
          category: "signal"
        },
        {
          name: "TP3",
          net: "N$18_BAT_COMMON",
          category: "unlabeled"
        },
        {
          name: "TP4",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP6",
          net: "GND_B",
          category: "ground"
        },
        {
          name: "TP7",
          net: "GND_A",
          category: "ground"
        },
        {
          name: "TP8",
          net: "EN",
          category: "signal"
        },
        {
          name: "TP9",
          net: "IO0/RESERVED",
          category: "signal"
        },
        {
          name: "TP10",
          net: "VBAT",
          category: "signal"
        },
        {
          name: "TP11",
          net: "VMB_PU",
          category: "signal"
        },
        {
          name: "TP5",
          net: "GND_C",
          category: "ground"
        },
        {
          name: "TP12",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP13",
          net: "COM_EN1",
          category: "signal"
        },
        {
          name: "TP14",
          net: "COM_EN2",
          category: "signal"
        },
        {
          name: "TP15",
          net: "VZONE1",
          category: "signal"
        },
        {
          name: "TP16",
          net: "VZONE2",
          category: "signal"
        },
        {
          name: "TP17",
          net: "VID1",
          category: "signal"
        },
        {
          name: "TP18",
          net: "VID2",
          category: "signal"
        },
        {
          name: "TP19",
          net: "VGAS",
          category: "signal"
        },
        {
          name: "TP20",
          net: "VPROBE",
          category: "signal"
        },
        {
          name: "TP21",
          net: "USR_SW/!NTAMPER",
          category: "signal"
        },
        {
          name: "TP22",
          net: "FILT_EN",
          category: "signal"
        },
        {
          name: "TP23",
          net: "NRST",
          category: "reset"
        },
        {
          name: "TP24",
          net: "BLUE",
          category: "signal"
        },
        {
          name: "TP25",
          net: "GREEN",
          category: "signal"
        },
        {
          name: "TP26",
          net: "RED",
          category: "signal"
        },
        {
          name: "TP27",
          net: "BUZZER",
          category: "signal"
        },
        {
          name: "TP28",
          net: "VDD",
          category: "power"
        },
        {
          name: "TP29",
          net: "TXD",
          category: "uart"
        },
        {
          name: "TP30",
          net: "RXD",
          category: "uart"
        },
        {
          name: "TP31",
          net: "SCL",
          category: "i2c"
        },
        {
          name: "TP32",
          net: "SDA",
          category: "i2c"
        },
        {
          name: "TP33",
          net: "MISO",
          category: "spi"
        },
        {
          name: "TP34",
          net: "MOSI",
          category: "spi"
        },
        {
          name: "TP35",
          net: "SPI_CLK",
          category: "spi"
        },
        {
          name: "TP36",
          net: "NSS",
          category: "signal"
        },
        {
          name: "TP37",
          net: "DIO1",
          category: "signal"
        },
        {
          name: "TP38",
          net: "DIO0",
          category: "signal"
        },
        {
          name: "TP39",
          net: "PCB_ID2",
          category: "signal"
        },
        {
          name: "TP40",
          net: "PCB_ID1",
          category: "signal"
        },
        {
          name: "TP41",
          net: "TCK",
          category: "programming"
        },
        {
          name: "TP42",
          net: "TDO",
          category: "signal"
        },
        {
          name: "TP43",
          net: "TDI",
          category: "signal"
        },
        {
          name: "TP44",
          net: "TMS",
          category: "programming"
        },
        {
          name: "TP45",
          net: "ID_SCAN0",
          category: "can"
        },
        {
          name: "TP46",
          net: "ID_SCAN1",
          category: "can"
        },
        {
          name: "TP47",
          net: "ID_SCAN2",
          category: "can"
        },
        {
          name: "TP48",
          net: "ID_SCAN3",
          category: "can"
        },
        {
          name: "TP49",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 49
    },
    {
      design: "Noah 2.0 WIP PCB",
      testPoints: [],
      debugHeaders: [
        {
          name: "JP104",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$152",
            "IN_DEBUG8"
          ]
        },
        {
          name: "JP105",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "IN_DEBUG7",
            "N$151"
          ]
        },
        {
          name: "JP106",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$150",
            "IN_DEBUG6"
          ]
        },
        {
          name: "JP107",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$149",
            "IN_DEBUG5"
          ]
        },
        {
          name: "JP108",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "IN_DEBUG4",
            "N$148"
          ]
        },
        {
          name: "JP109",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$147",
            "IN_DEBUG3"
          ]
        },
        {
          name: "JP110",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$146",
            "IN_DEBUG2"
          ]
        },
        {
          name: "JP111",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$145",
            "IN_DEBUG1"
          ]
        },
        {
          name: "JP130",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG8",
            "N$169"
          ]
        },
        {
          name: "JP131",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG7",
            "N$170"
          ]
        },
        {
          name: "JP132",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$171",
            "OUT_DEBUG6"
          ]
        },
        {
          name: "JP133",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG5",
            "N$172"
          ]
        },
        {
          name: "JP134",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "N$173",
            "OUT_DEBUG4"
          ]
        },
        {
          name: "JP135",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG3",
            "N$174"
          ]
        },
        {
          name: "JP136",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG2",
            "N$175"
          ]
        },
        {
          name: "JP137",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG1",
            "N$176"
          ]
        },
        {
          name: "JP145",
          value: "TEST_LINK4_SPST",
          type: "debug",
          nets: [
            "OUT_DEBUG0",
            "N$184"
          ]
        },
        {
          name: "JP179",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$77",
            "VDD",
            "IN_DEBUG1",
            "GND"
          ]
        },
        {
          name: "JP180",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "VDD",
            "N$89",
            "IN_DEBUG2",
            "GND"
          ]
        },
        {
          name: "JP181",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$204",
            "VDD",
            "IN_DEBUG3",
            "GND"
          ]
        },
        {
          name: "JP182",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG4",
            "VDD",
            "N$207",
            "GND"
          ]
        },
        {
          name: "JP183",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG5",
            "VDD",
            "N$210",
            "GND"
          ]
        },
        {
          name: "JP184",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$213",
            "IN_DEBUG6",
            "VDD",
            "GND"
          ]
        },
        {
          name: "JP185",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG7",
            "N$216",
            "VDD",
            "GND"
          ]
        },
        {
          name: "JP186",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$219",
            "VDD",
            "IN_DEBUG8",
            "GND"
          ]
        }
      ],
      icspConnectors: [],
      testPointCount: 0
    },
    {
      design: "Noah_2.0_WIP_PIK_PCB",
      testPoints: [],
      debugHeaders: [
        {
          name: "JP179",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$77",
            "IN_DEBUG1",
            "VDD",
            "GND"
          ]
        },
        {
          name: "JP180",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "VDD",
            "N$89",
            "IN_DEBUG2",
            "GND"
          ]
        },
        {
          name: "JP181",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "GND",
            "IN_DEBUG3",
            "VDD",
            "N$204"
          ]
        },
        {
          name: "JP182",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG4",
            "VDD",
            "N$207",
            "GND"
          ]
        },
        {
          name: "JP183",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG5",
            "VDD",
            "N$210",
            "GND"
          ]
        },
        {
          name: "JP184",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "N$213",
            "IN_DEBUG6",
            "VDD",
            "GND"
          ]
        },
        {
          name: "JP185",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "IN_DEBUG7",
            "N$216",
            "VDD",
            "GND"
          ]
        },
        {
          name: "JP186",
          value: "TEST_LINK5_SPST_SPDT",
          type: "debug",
          nets: [
            "GND",
            "VDD",
            "IN_DEBUG8",
            "N$219"
          ]
        },
        {
          name: "JP106",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$145",
            "IN_DEBUG1"
          ]
        },
        {
          name: "JP107",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$146",
            "IN_DEBUG2"
          ]
        },
        {
          name: "JP108",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$147",
            "IN_DEBUG3"
          ]
        },
        {
          name: "JP109",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "IN_DEBUG4",
            "N$148"
          ]
        },
        {
          name: "JP110",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "IN_DEBUG5",
            "N$149"
          ]
        },
        {
          name: "JP111",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "IN_DEBUG6",
            "N$150"
          ]
        },
        {
          name: "JP112",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "IN_DEBUG7",
            "N$151"
          ]
        },
        {
          name: "JP113",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$152",
            "IN_DEBUG8"
          ]
        },
        {
          name: "JP130",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$169",
            "OUT_DEBUG1"
          ]
        },
        {
          name: "JP131",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG2",
            "N$170"
          ]
        },
        {
          name: "JP132",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$171",
            "OUT_DEBUG3"
          ]
        },
        {
          name: "JP133",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG4",
            "N$172"
          ]
        },
        {
          name: "JP134",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$173",
            "OUT_DEBUG5"
          ]
        },
        {
          name: "JP135",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG6",
            "N$174"
          ]
        },
        {
          name: "JP136",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$175",
            "OUT_DEBUG7"
          ]
        },
        {
          name: "JP137",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG8",
            "N$176"
          ]
        },
        {
          name: "JP138",
          value: "TEST_LINK_SPST4PIN",
          type: "debug",
          nets: [
            "N$177",
            "OUT_DEBUG0"
          ]
        },
        {
          name: "JP189",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "N$228",
            "OUT_DEBUG0"
          ]
        },
        {
          name: "JP190",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG1",
            "N$239"
          ]
        },
        {
          name: "JP191",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG2",
            "N$242"
          ]
        },
        {
          name: "JP192",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG3",
            "N$245"
          ]
        },
        {
          name: "JP193",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "N$248",
            "OUT_DEBUG4"
          ]
        },
        {
          name: "JP194",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG5",
            "N$251"
          ]
        },
        {
          name: "JP195",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "OUT_DEBUG6",
            "N$254"
          ]
        },
        {
          name: "JP196",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "N$257",
            "OUT_DEBUG7"
          ]
        },
        {
          name: "JP197",
          value: "TEST_LINK_SPST2PIN",
          type: "debug",
          nets: [
            "N$260",
            "OUT_DEBUG8"
          ]
        }
      ],
      icspConnectors: [],
      testPointCount: 0
    },
    {
      design: "PCBLF0714-1_PIK",
      testPoints: [],
      debugHeaders: [
        {
          name: "JP1",
          value: "6P_0.1_VERT",
          type: "debug",
          nets: [
            "+3.3V",
            "GND",
            "SWD_CLK",
            "RST",
            "SWD_IO"
          ]
        }
      ],
      icspConnectors: [],
      testPointCount: 0
    },
    {
      design: "PCBLF0742-0_PIK_TOP",
      testPoints: [
        {
          name: "TP1",
          net: "N$30_BAT_PROT_SUPPLY",
          category: "unlabeled"
        },
        {
          name: "TP2",
          net: "+V",
          category: "signal"
        },
        {
          name: "TP3",
          net: "N$18_BAT_COMMON",
          category: "unlabeled"
        },
        {
          name: "TP4",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP6",
          net: "GND_B",
          category: "ground"
        },
        {
          name: "TP7",
          net: "GND_A",
          category: "ground"
        },
        {
          name: "TP8",
          net: "EN",
          category: "signal"
        },
        {
          name: "TP9",
          net: "IO0/RESERVED",
          category: "signal"
        },
        {
          name: "TP10",
          net: "VBAT",
          category: "signal"
        },
        {
          name: "TP11",
          net: "VMB_PU",
          category: "signal"
        },
        {
          name: "TP5",
          net: "GND_C",
          category: "ground"
        },
        {
          name: "TP12",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP13",
          net: "COM_EN1",
          category: "signal"
        },
        {
          name: "TP14",
          net: "COM_EN2",
          category: "signal"
        },
        {
          name: "TP15",
          net: "VZONE1",
          category: "signal"
        },
        {
          name: "TP16",
          net: "VZONE2",
          category: "signal"
        },
        {
          name: "TP17",
          net: "VID1",
          category: "signal"
        },
        {
          name: "TP18",
          net: "VID2",
          category: "signal"
        },
        {
          name: "TP19",
          net: "VGAS",
          category: "signal"
        },
        {
          name: "TP20",
          net: "VPROBE",
          category: "signal"
        },
        {
          name: "TP21",
          net: "USR_SW/!NTAMPER",
          category: "signal"
        },
        {
          name: "TP22",
          net: "FILT_EN",
          category: "signal"
        },
        {
          name: "TP23",
          net: "NRST",
          category: "reset"
        },
        {
          name: "TP24",
          net: "BLUE",
          category: "signal"
        },
        {
          name: "TP25",
          net: "GREEN",
          category: "signal"
        },
        {
          name: "TP26",
          net: "RED",
          category: "signal"
        },
        {
          name: "TP27",
          net: "BUZZER",
          category: "signal"
        },
        {
          name: "TP28",
          net: "VDD",
          category: "power"
        },
        {
          name: "TP29",
          net: "TXD",
          category: "uart"
        },
        {
          name: "TP30",
          net: "RXD",
          category: "uart"
        },
        {
          name: "TP31",
          net: "SCL",
          category: "i2c"
        },
        {
          name: "TP32",
          net: "SDA",
          category: "i2c"
        },
        {
          name: "TP33",
          net: "MISO",
          category: "spi"
        },
        {
          name: "TP34",
          net: "MOSI",
          category: "spi"
        },
        {
          name: "TP35",
          net: "SPI_CLK",
          category: "spi"
        },
        {
          name: "TP36",
          net: "NSS",
          category: "signal"
        },
        {
          name: "TP37",
          net: "DIO1",
          category: "signal"
        },
        {
          name: "TP38",
          net: "DIO0",
          category: "signal"
        },
        {
          name: "TP39",
          net: "PCB_ID2",
          category: "signal"
        },
        {
          name: "TP40",
          net: "PCB_ID1",
          category: "signal"
        },
        {
          name: "TP41",
          net: "TCK",
          category: "programming"
        },
        {
          name: "TP42",
          net: "TDO",
          category: "signal"
        },
        {
          name: "TP43",
          net: "TDI",
          category: "signal"
        },
        {
          name: "TP44",
          net: "TMS",
          category: "programming"
        },
        {
          name: "TP45",
          net: "ID_SCAN0",
          category: "can"
        },
        {
          name: "TP46",
          net: "ID_SCAN1",
          category: "can"
        },
        {
          name: "TP47",
          net: "ID_SCAN2",
          category: "can"
        },
        {
          name: "TP48",
          net: "ID_SCAN3",
          category: "can"
        },
        {
          name: "TP49",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 49
    },
    {
      design: "PCBLF0768-0_Panel",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "Pitts_LCD_Faceplate",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J3",
          value: "TC2030_ICSP",
          nets: [
            "ESP32A_EN",
            "ESP32A_IO0",
            "+3.3V",
            "ESP32A_PGM_TX",
            "GND",
            "ESP32A_PGM_RX"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "ProSmoker_PK100",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+3.3V",
            "N$3",
            "GND",
            "PGC"
          ],
          pinCount: 5
        },
        {
          name: "J3",
          value: "TC2030_ICSP",
          nets: [
            "ESP32_PGM_TX",
            "ESP32_PGM_RX",
            "ESP32_EN",
            "+3.3V",
            "ESP32_IO0",
            "GND"
          ],
          pinCount: 6
        }
      ],
      testPointCount: 0
    },
    {
      design: "RD-5768-12312-00",
      testPoints: [
        {
          name: "MP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "MP2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 2
    },
    {
      design: "RD-A-16327",
      testPoints: [
        {
          name: "J2",
          net: "N$48",
          category: "unlabeled"
        },
        {
          name: "J2",
          net: "N$44",
          category: "unlabeled"
        },
        {
          name: "J2",
          net: "N$35",
          category: "unlabeled"
        },
        {
          name: "J3",
          net: "N$43",
          category: "unlabeled"
        },
        {
          name: "J3",
          net: "N$51",
          category: "unlabeled"
        },
        {
          name: "J3",
          net: "N$27",
          category: "unlabeled"
        },
        {
          name: "MP1",
          net: "N$56",
          category: "unlabeled"
        },
        {
          name: "MP2",
          net: "N$57",
          category: "unlabeled"
        },
        {
          name: "MP3",
          net: "N$53",
          category: "unlabeled"
        },
        {
          name: "MP4",
          net: "N$55",
          category: "unlabeled"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 10
    },
    {
      design: "RG0026_Tester",
      testPoints: [
        {
          name: "J2",
          net: "+12V",
          category: "power"
        },
        {
          name: "J2",
          net: "+5V",
          category: "power"
        },
        {
          name: "J2",
          net: "GND",
          category: "ground"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 3
    },
    {
      design: "TiltAudio_Import",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "DISPLAY",
          value: "DM-OLED096-636",
          nets: [
            "N$2",
            "VCC_IN",
            "N$1",
            "GND"
          ],
          pinCount: 4
        }
      ],
      testPointCount: 0
    },
    {
      design: "TiltAudio_RE",
      testPoints: [
        {
          name: "L1",
          net: "+12V",
          category: "power"
        },
        {
          name: "L1",
          net: "N$5",
          category: "unlabeled"
        },
        {
          name: "L2",
          net: "N$9",
          category: "unlabeled"
        },
        {
          name: "L2",
          net: "+5V",
          category: "power"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 4
    },
    {
      design: "TiltAudio_RE_recovery",
      testPoints: [
        {
          name: "L1",
          net: "+12V",
          category: "power"
        },
        {
          name: "L1",
          net: "N$5",
          category: "unlabeled"
        },
        {
          name: "L2",
          net: "N$9",
          category: "unlabeled"
        },
        {
          name: "L2",
          net: "+5V",
          category: "power"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 4
    },
    {
      design: "TouchMZ_In_Out_Board",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J9",
          value: "TC2030_ICSP",
          nets: [
            "N$66",
            "N$67",
            "+3.3V",
            "N$65",
            "GND"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    },
    {
      design: "WDP3211A_new",
      testPoints: [
        {
          name: "TP1",
          net: "+5V",
          category: "power"
        },
        {
          name: "TP2",
          net: "GND",
          category: "ground"
        },
        {
          name: "TP3",
          net: "+12V",
          category: "power"
        },
        {
          name: "TP4",
          net: "-12V",
          category: "signal"
        },
        {
          name: "TP7",
          net: "+100V",
          category: "power"
        },
        {
          name: "TP8",
          net: "-100V",
          category: "signal"
        },
        {
          name: "TP6",
          net: "+18V",
          category: "power"
        },
        {
          name: "TP5",
          net: "+34V",
          category: "power"
        }
      ],
      debugHeaders: [],
      icspConnectors: [],
      testPointCount: 8
    },
    {
      design: "ZLF0053",
      testPoints: [],
      debugHeaders: [],
      icspConnectors: [
        {
          name: "J5",
          value: "TC2030_ICSP",
          nets: [
            "PGD",
            "+5V",
            "N$3",
            "GND",
            "PGC"
          ],
          pinCount: 5
        }
      ],
      testPointCount: 0
    }
  ];

export const testPointCategories = {
    signal: 65,
    power: 29,
    ground: 24,
    unlabeled: 23,
    can: 8,
    spi: 6,
    programming: 5,
    uart: 4,
    i2c: 4,
    serial_bus: 2,
    reset: 2
  };

export const debugHeaders = {
    debug: 62,
    "ICSP/programming": 27,
    uart_debug: 2
  };
