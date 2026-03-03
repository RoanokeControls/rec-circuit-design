import { PowerCapacityBoard } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const powerCapacityBoards: PowerCapacityBoard[] = [
    {
      design: "Auto_Test_Circuit",
      regulators: [
        {
          name: "VR1",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "5V"
        },
        {
          name: "VR2",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "12V"
        },
        {
          name: "VR3",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "12V"
        }
      ],
      totalSupplyCapacityMa: 3000,
      loads: {
        relay: 32
      },
      estimatedLoadMa: 2240,
      headroomMa: 760,
      componentCount: 179
    },
    {
      design: "PCBLF0658-1_Panel",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "VR2",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "VR3",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "VR4",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 6000,
      loads: {
        mcu_esp32: 4,
        usb_bridge: 4
      },
      estimatedLoadMa: 1060,
      headroomMa: 4940,
      componentCount: 368
    },
    {
      design: "DISDMD",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        shift_register: 6,
        led: 16
      },
      estimatedLoadMa: 570,
      headroomMa: null,
      componentCount: 206
    },
    {
      design: "ESP32_LoRa_1_Channel_Gateway",
      regulators: [
        {
          name: "U1",
          part: "AP2112",
          currentMa: 600,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 600,
      loads: {
        usb_bridge: 1,
        mcu_esp32: 2
      },
      estimatedLoadMa: 505,
      headroomMa: 95,
      componentCount: 86
    },
    {
      design: "FGLF0623-03_PIK",
      regulators: [
        {
          name: "VR1",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2,
        relay: 5,
        opto: 2
      },
      estimatedLoadMa: 420,
      headroomMa: 580,
      componentCount: 87
    },
    {
      design: "FGLF0623_Triac_Board_Original",
      regulators: [
        {
          name: "VR1",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2,
        relay: 5,
        opto: 2
      },
      estimatedLoadMa: 420,
      headroomMa: 580,
      componentCount: 87
    },
    {
      design: "FGLF0623_Triac_Board",
      regulators: [
        {
          name: "VR1",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2,
        relay: 5,
        opto: 2
      },
      estimatedLoadMa: 420,
      headroomMa: 580,
      componentCount: 87
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR3",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: null
        },
        {
          name: "PS1",
          part: "IRM-15",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        },
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 3000,
      loads: {
        opto: 4,
        mcu_pic: 2,
        mcu_rp2040: 1,
        display_lcd: 1,
        mcu_esp32: 1
      },
      estimatedLoadMa: 378,
      headroomMa: 2622,
      componentCount: 204
    },
    {
      design: "PCBLF0827-0_PIK",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "PS1",
          part: "IRM-15",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        },
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        opto: 4,
        mcu_pic: 1,
        mcu_rp2040: 1,
        display_lcd: 1,
        mcu_esp32: 1
      },
      estimatedLoadMa: 353,
      headroomMa: 1647,
      componentCount: 200
    },
    {
      design: "NuvoLiteBrick_PCB",
      regulators: [
        {
          name: "U11",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "+5V"
        },
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "U7",
          part: "IRM-10",
          currentMa: 2000,
          topology: "ac-dc",
          outputVoltage: "+24V"
        }
      ],
      totalSupplyCapacityMa: 4000,
      loads: {
        mcu_esp32: 1,
        relay: 1
      },
      estimatedLoadMa: 310,
      headroomMa: 3690,
      componentCount: 125
    },
    {
      design: "NuvoLite_PCB_PIK_Bottom",
      regulators: [
        {
          name: "U11",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "+5V"
        },
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_esp32: 1,
        relay: 1
      },
      estimatedLoadMa: 310,
      headroomMa: 1690,
      componentCount: 148
    },
    {
      design: "NuvoLite_PCB_PIK_Top",
      regulators: [
        {
          name: "U11",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "+5V"
        },
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_esp32: 1,
        relay: 1
      },
      estimatedLoadMa: 310,
      headroomMa: 1690,
      componentCount: 148
    },
    {
      design: "NuvoLite_PCB",
      regulators: [
        {
          name: "U11",
          part: "MC7805",
          currentMa: 1000,
          topology: "linear",
          outputVoltage: "+5V"
        },
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_esp32: 1,
        relay: 1
      },
      estimatedLoadMa: 310,
      headroomMa: 1690,
      componentCount: 148
    },
    {
      design: "LCD_Control",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_rp2040: 1,
        display_lcd: 1,
        mcu_esp32: 1
      },
      estimatedLoadMa: 288,
      headroomMa: 1712,
      componentCount: 81
    },
    {
      design: "All-In-One_Schematic",
      regulators: [
        {
          name: "VR1",
          part: "IRM_03",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 4,
        mcu_esp32: 1,
        display_lcd: 1
      },
      estimatedLoadMa: 283,
      headroomMa: null,
      componentCount: 180
    },
    {
      design: "ProSmoker_PK100",
      regulators: [
        {
          name: "VR1",
          part: "IRM_03",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 3,
        mcu_esp32: 1,
        display_lcd: 4
      },
      estimatedLoadMa: 282,
      headroomMa: null,
      componentCount: 141
    },
    {
      design: "Noah 2.0 WIP PCB",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        mcu_esp32: 1,
        shift_register: 2,
        display_lcd: 3
      },
      estimatedLoadMa: 279,
      headroomMa: null,
      componentCount: 329
    },
    {
      design: "Noah_2.0_WIP_PIK_PCB",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 3,
        shift_register: 2,
        mcu_esp32: 1
      },
      estimatedLoadMa: 279,
      headroomMa: null,
      componentCount: 356
    },
    {
      design: "ESP32_LCD_PCB",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        shift_register: 2,
        mcu_esp32: 1
      },
      estimatedLoadMa: 270,
      headroomMa: 1230,
      componentCount: 53
    },
    {
      design: "PCBLF0658-1_PIK",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_esp32: 1,
        usb_bridge: 1
      },
      estimatedLoadMa: 265,
      headroomMa: 1235,
      componentCount: 91
    },
    {
      design: "PCBLF0658-1",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_esp32: 1,
        usb_bridge: 1
      },
      estimatedLoadMa: 265,
      headroomMa: 1235,
      componentCount: 91
    },
    {
      design: "PCBLF0759_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_esp32: 1,
        usb_bridge: 1
      },
      estimatedLoadMa: 265,
      headroomMa: 735,
      componentCount: 36
    },
    {
      design: "Quantum_NXP_Programmer",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_esp32: 1,
        usb_bridge: 1
      },
      estimatedLoadMa: 265,
      headroomMa: 735,
      componentCount: 36
    },
    {
      design: "CPU-95",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        darlington_driver: 1,
        led: 3,
        shift_register: 11
      },
      estimatedLoadMa: 260,
      headroomMa: null,
      componentCount: 278
    },
    {
      design: "Noah 2.0 Beta Layout",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 2,
        mcu_esp32: 1
      },
      estimatedLoadMa: 246,
      headroomMa: null,
      componentCount: 273
    },
    {
      design: "PCBLF0742-0_PIK_TOP",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 2,
        mcu_esp32: 1
      },
      estimatedLoadMa: 246,
      headroomMa: null,
      componentCount: 273
    },
    {
      design: "PCBLF0717-1_PIK",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_esp32: 1
      },
      estimatedLoadMa: 240,
      headroomMa: 1260,
      componentCount: 42
    },
    {
      design: "PCB_Connectware",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_esp32: 1
      },
      estimatedLoadMa: 240,
      headroomMa: 1260,
      componentCount: 42
    },
    {
      design: "Pitts_LCD_Faceplate",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_esp32: 1
      },
      estimatedLoadMa: 240,
      headroomMa: 760,
      componentCount: 50
    },
    {
      design: "SSC",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        led: 8
      },
      estimatedLoadMa: 240,
      headroomMa: null,
      componentCount: 17
    },
    {
      design: "PCBLF0714-1_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "U9",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        opto: 8,
        display_lcd: 1,
        shift_register: 2,
        mcu_stm32: 1
      },
      estimatedLoadMa: 163,
      headroomMa: 837,
      componentCount: 168
    },
    {
      design: "TouchMZ_In_Out_Board",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        opto: 8,
        display_lcd: 1,
        mcu_pic: 1,
        usb_bridge: 1,
        shift_register: 2
      },
      estimatedLoadMa: 163,
      headroomMa: 837,
      componentCount: 175
    },
    {
      design: "HDMI_Display",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "U8",
          part: "IRM-10",
          currentMa: 2000,
          topology: "ac-dc",
          outputVoltage: "+12V"
        },
        {
          name: "PS1",
          part: "IRM-15",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 3000,
      loads: {
        mcu_stm32: 1,
        shift_register: 7
      },
      estimatedLoadMa: 155,
      headroomMa: 2845,
      componentCount: 62
    },
    {
      design: "All-In-One_Schematic_IO_Board",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR3",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: null
        },
        {
          name: "PS1",
          part: "IRM-15",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        opto: 4,
        mcu_pic: 2,
        mcu_rp2040: 1,
        display_lcd: 1
      },
      estimatedLoadMa: 138,
      headroomMa: 1862,
      componentCount: 173
    },
    {
      design: "Operator_Display_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        shift_register: 9
      },
      estimatedLoadMa: 135,
      headroomMa: 865,
      componentCount: 131
    },
    {
      design: "Operator_Display",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        shift_register: 9
      },
      estimatedLoadMa: 135,
      headroomMa: 865,
      componentCount: 122
    },
    {
      design: "Astrodyne_chevy_replacement_BBU",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        opto: 3,
        mcu_stm32: 1,
        shift_register: 3
      },
      estimatedLoadMa: 125,
      headroomMa: 875,
      componentCount: 106
    },
    {
      design: "Astrodyne_chevy_replacement",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        opto: 3,
        mcu_stm32: 1,
        shift_register: 3
      },
      estimatedLoadMa: 125,
      headroomMa: 875,
      componentCount: 106
    },
    {
      design: "PCBLF0752-0_PIK",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        opto: 3,
        mcu_stm32: 1,
        shift_register: 3
      },
      estimatedLoadMa: 125,
      headroomMa: 875,
      componentCount: 106
    },
    {
      design: "Clamshell_Grill_PIK",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        display_lcd: 4,
        shift_register: 4,
        mcu_stm32: 1
      },
      estimatedLoadMa: 122,
      headroomMa: 878,
      componentCount: 113
    },
    {
      design: "Clamshell_Grill",
      regulators: [
        {
          name: "VR2",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        display_lcd: 4,
        shift_register: 4,
        mcu_stm32: 1
      },
      estimatedLoadMa: 122,
      headroomMa: 878,
      componentCount: 113
    },
    {
      design: "CarterHoffmann485DisplayAlternate",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_stm32: 1,
        shift_register: 4
      },
      estimatedLoadMa: 110,
      headroomMa: 890,
      componentCount: 128
    },
    {
      design: "PCBLF0648-3_PIK",
      regulators: [
        {
          name: "U11",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "U3",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "U5",
          part: "TPS54286",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_stm32: 2
      },
      estimatedLoadMa: 100,
      headroomMa: 900,
      componentCount: 352
    },
    {
      design: "PCBLF0648-3",
      regulators: [
        {
          name: "U11",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "U3",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "U5",
          part: "TPS54286",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_stm32: 2
      },
      estimatedLoadMa: 100,
      headroomMa: 900,
      componentCount: 352
    },
    {
      design: "PCBLF0648-3_gerber_experiment",
      regulators: [
        {
          name: "U11",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+3.3V"
        },
        {
          name: "U3",
          part: "SPX3819",
          currentMa: 500,
          topology: "ldo",
          outputVoltage: "+5V"
        },
        {
          name: "U5",
          part: "TPS54286",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_stm32: 2
      },
      estimatedLoadMa: 100,
      headroomMa: 900,
      componentCount: 352
    },
    {
      design: "TiltAudio_RE",
      regulators: [
        {
          name: "U4",
          part: "TPS54332",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+24V"
        },
        {
          name: "U5",
          part: "TPS54332",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        shift_register: 3,
        mcu_stm32: 1
      },
      estimatedLoadMa: 95,
      headroomMa: null,
      componentCount: 119
    },
    {
      design: "TiltAudio_RE_recovery",
      regulators: [
        {
          name: "U4",
          part: "TPS54332",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+24V"
        },
        {
          name: "U5",
          part: "TPS54332",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        shift_register: 3,
        mcu_stm32: 1
      },
      estimatedLoadMa: 95,
      headroomMa: null,
      componentCount: 116
    },
    {
      design: "FGLF0623_triac_overheat_fix_mock",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 8
      },
      estimatedLoadMa: 80,
      headroomMa: null,
      componentCount: 24
    },
    {
      design: "ZLF0053_PIK",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 3,
        mcu_pic: 2
      },
      estimatedLoadMa: 80,
      headroomMa: null,
      componentCount: 102
    },
    {
      design: "ZLF0053",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 3,
        mcu_pic: 2
      },
      estimatedLoadMa: 80,
      headroomMa: null,
      componentCount: 101
    },
    {
      design: "ZLF0053_v44_PIK",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 3,
        mcu_pic: 2
      },
      estimatedLoadMa: 80,
      headroomMa: null,
      componentCount: 101
    },
    {
      design: "DC-DC_IO_expansion_board",
      regulators: [
        {
          name: "VR1",
          part: "AOZ6662",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        led: 2
      },
      estimatedLoadMa: 60,
      headroomMa: null,
      componentCount: 165
    },
    {
      design: "PCBLF0738-0_PIK",
      regulators: [
        {
          name: "VR1",
          part: "AOZ6662",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        led: 2
      },
      estimatedLoadMa: 60,
      headroomMa: null,
      componentCount: 165
    },
    {
      design: "Main_Board_PIK",
      regulators: [
        {
          name: "PS1",
          part: "IRM-10",
          currentMa: 2000,
          topology: "ac-dc",
          outputVoltage: "+12V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_pic: 1,
        led: 1
      },
      estimatedLoadMa: 55,
      headroomMa: 1945,
      componentCount: 169
    },
    {
      design: "Main_Board",
      regulators: [
        {
          name: "PS1",
          part: "IRM-10",
          currentMa: 2000,
          topology: "ac-dc",
          outputVoltage: "+12V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_pic: 1,
        led: 1
      },
      estimatedLoadMa: 55,
      headroomMa: 1945,
      componentCount: 169
    },
    {
      design: "Main_Board_test_stand",
      regulators: [
        {
          name: "PS1",
          part: "IRM-10",
          currentMa: 2000,
          topology: "ac-dc",
          outputVoltage: "+12V"
        }
      ],
      totalSupplyCapacityMa: 2000,
      loads: {
        mcu_pic: 1,
        led: 1
      },
      estimatedLoadMa: 55,
      headroomMa: 1945,
      componentCount: 169
    },
    {
      design: "Williams_Sys_11_Master",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        shift_register: 3,
        darlington_driver: 2
      },
      estimatedLoadMa: 55,
      headroomMa: null,
      componentCount: 49
    },
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        },
        {
          name: "U2",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        }
      ],
      totalSupplyCapacityMa: 2500,
      loads: {
        mcu_pic: 2
      },
      estimatedLoadMa: 50,
      headroomMa: 2450,
      componentCount: 84
    },
    {
      design: "Alpha_sign_control_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2
      },
      estimatedLoadMa: 50,
      headroomMa: 950,
      componentCount: 81
    },
    {
      design: "Alpha_sign_control",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2
      },
      estimatedLoadMa: 50,
      headroomMa: 950,
      componentCount: 79
    },
    {
      design: "FGLF0788-01_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 2
      },
      estimatedLoadMa: 50,
      headroomMa: 950,
      componentCount: 79
    },
    {
      design: "Livewell Schematic",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_stm32: 1
      },
      estimatedLoadMa: 50,
      headroomMa: 950,
      componentCount: 117
    },
    {
      design: "Pico_LCD_PCB_PIK",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_rp2040: 1
      },
      estimatedLoadMa: 45,
      headroomMa: 1455,
      componentCount: 83
    },
    {
      design: "Pico_LCD_PCB",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {
        mcu_rp2040: 1
      },
      estimatedLoadMa: 45,
      headroomMa: 1455,
      componentCount: 83
    },
    {
      design: "Bottom",
      regulators: [
        {
          name: "VR1",
          part: "IRM_03",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 4
      },
      estimatedLoadMa: 40,
      headroomMa: null,
      componentCount: 140
    },
    {
      design: "BGW_Fan_Control_PIK",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 1,
        opto: 1,
        mcu_atmega: 1
      },
      estimatedLoadMa: 33,
      headroomMa: null,
      componentCount: 72
    },
    {
      design: "BGW_Fan_Control",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 1,
        opto: 1,
        mcu_atmega: 1
      },
      estimatedLoadMa: 33,
      headroomMa: null,
      componentCount: 72
    },
    {
      design: "PCBLF0804-2_PIK",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 1,
        mcu_atmega: 1,
        display_lcd: 1
      },
      estimatedLoadMa: 33,
      headroomMa: null,
      componentCount: 84
    },
    {
      design: "PCBLF0804-4_PIK",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 1,
        mcu_atmega: 1,
        display_lcd: 1
      },
      estimatedLoadMa: 33,
      headroomMa: null,
      componentCount: 83
    },
    {
      design: "Southbend_RTD_control",
      regulators: [
        {
          name: "VR1",
          part: "IRM-02",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        opto: 1,
        mcu_atmega: 1,
        display_lcd: 1
      },
      estimatedLoadMa: 33,
      headroomMa: null,
      componentCount: 83
    },
    {
      design: "Alpha_Digit_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        shift_register: 2
      },
      estimatedLoadMa: 30,
      headroomMa: 970,
      componentCount: 473
    },
    {
      design: "Alpha_Digit",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        shift_register: 2
      },
      estimatedLoadMa: 30,
      headroomMa: 970,
      componentCount: 473
    },
    {
      design: "SMT_Control_Board",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        led: 1
      },
      estimatedLoadMa: 30,
      headroomMa: 970,
      componentCount: 65
    },
    {
      design: "Field Updater",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 2,
        display_oled: 1
      },
      estimatedLoadMa: 26,
      headroomMa: null,
      componentCount: 30
    },
    {
      design: "12_inch_CD_Timer_Control",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 1
      },
      estimatedLoadMa: 25,
      headroomMa: 975,
      componentCount: 79
    },
    {
      design: "Chevy_Test_IC",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "3.3V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        usb_bridge: 1
      },
      estimatedLoadMa: 25,
      headroomMa: 975,
      componentCount: 21
    },
    {
      design: "ESP32_Programming_board",
      regulators: [
        {
          name: "VR1",
          part: "AOZ6662",
          currentMa: null,
          topology: "unknown",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {
        usb_bridge: 1
      },
      estimatedLoadMa: 25,
      headroomMa: null,
      componentCount: 46
    },
    {
      design: "PCBLF0706-1_PIK",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_pic: 1
      },
      estimatedLoadMa: 25,
      headroomMa: 975,
      componentCount: 79
    },
    {
      design: "Astrodyne_replacement",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 3,
        shift_register: 1
      },
      estimatedLoadMa: 24,
      headroomMa: null,
      componentCount: 17
    },
    {
      design: "PCBLF0739-0_PIK",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 3,
        shift_register: 1
      },
      estimatedLoadMa: 24,
      headroomMa: null,
      componentCount: 17
    },
    {
      design: "Derived2DPCB_fixoptolocators v1",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_atmega: 1
      },
      estimatedLoadMa: 20,
      headroomMa: 980,
      componentCount: 133
    },
    {
      design: "atsamd21_only",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {
        mcu_atmega: 1
      },
      estimatedLoadMa: 20,
      headroomMa: 980,
      componentCount: 126
    },
    {
      design: "ZLF0119",
      regulators: [],
      totalSupplyCapacityMa: 0,
      loads: {
        display_lcd: 4
      },
      estimatedLoadMa: 12,
      headroomMa: null,
      componentCount: 9
    },
    {
      design: "30in_segment_driver",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR2",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR3",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR4",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR5",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR6",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR7",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        },
        {
          name: "VR8",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "5V"
        }
      ],
      totalSupplyCapacityMa: 12000,
      loads: {},
      estimatedLoadMa: 0,
      headroomMa: 12000,
      componentCount: 83
    },
    {
      design: "Grill_remote_lid",
      regulators: [
        {
          name: "U1",
          part: "IRM-30",
          currentMa: null,
          topology: "unknown",
          outputVoltage: null
        }
      ],
      totalSupplyCapacityMa: 0,
      loads: {},
      estimatedLoadMa: 0,
      headroomMa: null,
      componentCount: 26
    },
    {
      design: "RG0026_Adapter_RGSM0010",
      regulators: [
        {
          name: "VR1",
          part: "LM317",
          currentMa: 1500,
          topology: "ldo",
          outputVoltage: "+5V"
        }
      ],
      totalSupplyCapacityMa: 1500,
      loads: {},
      estimatedLoadMa: 0,
      headroomMa: 1500,
      componentCount: 6
    },
    {
      design: "RG0026_Adapter",
      regulators: [
        {
          name: "VR1",
          part: "NCP1117",
          currentMa: 1000,
          topology: "ldo",
          outputVoltage: "5V"
        }
      ],
      totalSupplyCapacityMa: 1000,
      loads: {},
      estimatedLoadMa: 0,
      headroomMa: 1000,
      componentCount: 4
    }
  ];

export const powerCapacitySummary = {
    boards_analyzed: 226,
    boards_with_power_data: 87,
    topology_distribution: {
      ldo: 69,
      linear: 10,
      "ac-dc": 5
    },
    supply_voltages: {
      "+5V": 46,
      "3.3V": 22,
      "+3.3V": 16,
      "5V": 13,
      "+12V": 4,
      "+24V": 3,
      "12V": 2
    }
  };
