import { SensorDesign } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const sensorDesigns: SensorDesign[] = [
    {
      design: "All-In-One_Schematic_IO_Board",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS",
          net: "GND",
          mcu: "PIC18F26K22-I/SS"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS@2",
          net: "GND",
          mcu: "PIC18F26K22-I/SS"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS",
          net: "GND",
          mcu: "PIC18F26K226SP"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS1",
          net: "GND",
          mcu: "PIC18F26K226SP"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND",
          net: "GND",
          mcu: "RP2040"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "TESTEN",
          net: "GND",
          mcu: "RP2040"
        }
      ],
      sensorCount: 1
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS",
          net: "GND",
          mcu: "PIC18F26K22-I/SS"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS@2",
          net: "GND",
          mcu: "PIC18F26K22-I/SS"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS",
          net: "GND",
          mcu: "PIC18F26K226SP"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "VSS1",
          net: "GND",
          mcu: "PIC18F26K226SP"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND",
          net: "GND",
          mcu: "RP2040"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "TESTEN",
          net: "GND",
          mcu: "RP2040"
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND1",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND15",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND38",
          net: "GND",
          mcu: ""
        }
      ],
      sensorCount: 1
    },
    {
      design: "All-In-One_Schematic",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND1",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND15",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND38",
          net: "GND",
          mcu: ""
        }
      ],
      sensorCount: 1
    },
    {
      design: "Auto_Test_Circuit",
      sensors: [
        {
          name: "U9",
          value: "LM358",
          type: "temp_sensor"
        },
        {
          name: "U$1",
          value: "LM350-10B24",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 2
    },
    {
      design: "Bottom",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "CapSense",
      sensors: [
        {
          name: "R11",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        },
        {
          name: "R14",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 2
    },
    {
      design: "Livewell Schematic",
      sensors: [
        {
          name: "R7",
          value: "0.03^_2512",
          type: "current_sense_resistor"
        },
        {
          name: "R42",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "R7",
          sensorType: "current_sense_resistor",
          mcuPin: "VSS/VSSA",
          net: "GND",
          mcu: "STM32G030F6P6"
        },
        {
          sensor: "R42",
          sensorType: "thermistor",
          mcuPin: "VSS/VSSA",
          net: "GND",
          mcu: "STM32G030F6P6"
        }
      ],
      sensorCount: 2
    },
    {
      design: "Main_Board_PIK",
      sensors: [
        {
          name: "U12",
          value: "MCP9701T-E/TT",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U10",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        },
        {
          name: "U6",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        },
        {
          name: "U11",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "Main_Board",
      sensors: [
        {
          name: "U12",
          value: "MCP9701T-E/TT",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U10",
          value: "MCP6061-E-SN"
        },
        {
          name: "U6",
          value: "MCP6061-E-SN"
        },
        {
          name: "U11",
          value: "MCP6061-E-SN"
        }
      ],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "U12",
          sensorType: "temp_sensor",
          mcuPin: "VSS@2",
          net: "GND",
          mcu: "PIC18F46K22-I/PT"
        },
        {
          sensor: "U12",
          sensorType: "temp_sensor",
          mcuPin: "VSS",
          net: "GND",
          mcu: "PIC18F46K22-I/PT"
        },
        {
          sensor: "U12",
          sensorType: "temp_sensor",
          mcuPin: "VDD",
          net: "+5V",
          mcu: "PIC18F46K22-I/PT"
        },
        {
          sensor: "U12",
          sensorType: "temp_sensor",
          mcuPin: "VDD@2",
          net: "+5V",
          mcu: "PIC18F46K22-I/PT"
        }
      ],
      sensorCount: 1
    },
    {
      design: "Main_Board_test_stand",
      sensors: [
        {
          name: "U12",
          value: "MCP9701T-E/TT",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U10",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        },
        {
          name: "U6",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        },
        {
          name: "U11",
          value: "MCP6061-E-SNMICROCHIP_MCP6061-E-SN_0_2"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "NanoV3.3",
      sensors: [
        {
          name: "F1",
          value: "MFFSMF050",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "Noah 2.0 Beta Layout",
      sensors: [
        {
          name: "U2",
          value: "BOSCH_BME688",
          type: "temp_sensor"
        },
        {
          name: "divider_ID_SCAN3",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN3"
        },
        {
          name: "divider_ID_SCAN0",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN0"
        },
        {
          name: "divider_ID_SCAN1",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN1"
        },
        {
          name: "divider_ID_SCAN2",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN2"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U6",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U12",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U14",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U15",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U17",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U18",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U19",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U20",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U21",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 5
    },
    {
      design: "Noah 2.0 WIP PCB",
      sensors: [
        {
          name: "AE1",
          value: "AH316",
          type: "hall_sensor"
        },
        {
          name: "U$9",
          value: "BOSCH_BME688",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 2
    },
    {
      design: "Noah_2.0_WIP_PIK_PCB",
      sensors: [
        {
          name: "U4",
          value: "BOSCH_BME688",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "NuvoLiteBrick_PCB",
      sensors: [
        {
          name: "R42",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "NuvoLite_PCB_PIK_Bottom",
      sensors: [
        {
          name: "R42",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "NuvoLite_PCB_PIK_Top",
      sensors: [
        {
          name: "R42",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "NuvoLite_PCB",
      sensors: [
        {
          name: "R42",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "PCBLF0648-3_PIK",
      sensors: [
        {
          name: "U13",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U14",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U7",
          value: "DRV8860PWRPW_16_TEX-M",
          type: "hall_sensor"
        },
        {
          name: "U17",
          value: "DRV8308RHAT",
          type: "hall_sensor"
        },
        {
          name: "R7",
          value: "0.01^_1206",
          type: "current_sense_resistor"
        },
        {
          name: "R53",
          value: "0.03^_2512",
          type: "current_sense_resistor"
        },
        {
          name: "U13A",
          value: "TMP75AIDGKRTEXAS_INSTRUMENTS_TMP75AIDGKR_0_0",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 7
    },
    {
      design: "PCBLF0648-3",
      sensors: [
        {
          name: "U13",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U14",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U7",
          value: "DRV8860PWRPW_16_TEX-M",
          type: "hall_sensor"
        },
        {
          name: "U17",
          value: "DRV8308RHAT",
          type: "hall_sensor"
        },
        {
          name: "R7",
          value: "0.01^_1206",
          type: "current_sense_resistor"
        },
        {
          name: "R53",
          value: "0.03^_2512",
          type: "current_sense_resistor"
        },
        {
          name: "U13A",
          value: "TMP75AIDGKRTEXAS_INSTRUMENTS_TMP75AIDGKR_0_0",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 7
    },
    {
      design: "PCBLF0648-3_gerber_experiment",
      sensors: [
        {
          name: "U13",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U14",
          value: "TMP102AIDRLRTEXAS_INSTRUMENTS_TMP102AIDRLR_0_0",
          type: "temp_sensor"
        },
        {
          name: "U7",
          value: "DRV8860PWRPW_16_TEX-M",
          type: "hall_sensor"
        },
        {
          name: "U17",
          value: "DRV8308RHAT",
          type: "hall_sensor"
        },
        {
          name: "R7",
          value: "0.01^_1206",
          type: "current_sense_resistor"
        },
        {
          name: "R53",
          value: "0.03^_2512",
          type: "current_sense_resistor"
        },
        {
          name: "U13A",
          value: "TMP75AIDGKRTEXAS_INSTRUMENTS_TMP75AIDGKR_0_0",
          type: "temp_sensor"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U18",
          value: "MCP6022-I/SNSOIC8-N_MC_MCH-M"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 7
    },
    {
      design: "PCBLF0660-7_PIK",
      sensors: [
        {
          name: "R51",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "PCBLF0660-7",
      sensors: [
        {
          name: "R51",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "PCBLF0742-0_PIK_TOP",
      sensors: [
        {
          name: "U2",
          value: "BOSCH_BME688",
          type: "temp_sensor"
        },
        {
          name: "divider_ID_SCAN3",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN3"
        },
        {
          name: "divider_ID_SCAN0",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN0"
        },
        {
          name: "divider_ID_SCAN1",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN1"
        },
        {
          name: "divider_ID_SCAN2",
          value: "1k, 1k",
          type: "voltage_divider",
          net: "ID_SCAN2"
        }
      ],
      optoInputs: [],
      opamps: [
        {
          name: "U6",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U12",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U14",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U15",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U17",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U18",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U19",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U20",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        },
        {
          name: "U21",
          value: "OPAMP_MCP6051-E/OT_SLOTTED"
        }
      ],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 5
    },
    {
      design: "PCBLF0827-0_PIK",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 1
    },
    {
      design: "PCB",
      sensors: [],
      optoInputs: [
        {
          name: "J1",
          value: "SBH11-PBPC-D08-ST-BKCONN16_SBH11-PBPC-D08-ST-BK_SU"
        },
        {
          name: "J2",
          value: "SBH11-PBPC-D07-ST-BKCONN_SBH11-PBPC-D07-ST-BK_SUL"
        }
      ],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [],
      sensorCount: 0
    },
    {
      design: "ProSmoker_PK100",
      sensors: [
        {
          name: "R52",
          value: "NTCS0805E3103JMTVISHAY_BC_COMPONENTS_NTCS0805E3103JMT_0_0",
          type: "thermistor"
        }
      ],
      optoInputs: [],
      opamps: [],
      voltageRefs: [],
      mcuConnections: [
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND1",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND15",
          net: "GND",
          mcu: ""
        },
        {
          sensor: "R52",
          sensorType: "thermistor",
          mcuPin: "GND38",
          net: "GND",
          mcu: ""
        }
      ],
      sensorCount: 1
    }
  ];

export const sensorTypes = {
    temp_sensor: 18,
    thermistor: 16,
    voltage_divider: 8,
    current_sense_resistor: 7,
    hall_sensor: 7,
    optocoupler_input: 2
  };

export const conditioningComponents = {
    opamp: 37
  };
