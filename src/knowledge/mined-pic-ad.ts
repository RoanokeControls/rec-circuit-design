import { PicAdDesign } from "../types/index.js";

// Auto-generated from analysis pipeline — do not edit manually

export const picAdDesigns: PicAdDesign[] = [
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R12:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R11:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R10:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R9:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R8:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R25:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "J12:1-2058703-2",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R36:10K_0603",
            "R35:10K_0603"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$48",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R29:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 16,
        communication: 3,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:504050-0691MOLEX_504050-0691_0_0",
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:504050-0691MOLEX_504050-0691_0_0",
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "R18:10K_0603"
          ]
        },
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R12:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R11:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R10:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R9:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R8:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "J6:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "N$13",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J6:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "N$15",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R20:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R25:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "J12:1-2058703-2",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R36:10K_0603",
            "R35:10K_0603"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$48",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R29:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        }
      ]
    },
    {
      design: "12_in_CD_Tmr_Ctrl_Small",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R12:10K_0603"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R11:10K_0603"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R10:10K_0603"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R9:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R8:10K_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:150^_0603"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1:PIC18F26K22-I/SS",
            "J12:1-2058703-2"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R36:10K_0603",
            "R35:10K_0603"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$48",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R29:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R6:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R26:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 16,
        communication: 3,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:504050-0691MOLEX_504050-0691_0_0",
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:504050-0691MOLEX_504050-0691_0_0",
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "R18:10K_0603",
            "J6:"
          ]
        },
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R12:10K_0603"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R11:10K_0603"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R10:10K_0603"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R9:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R8:10K_0603"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J16:PR20203VBNNMETZ_CONNECT_PR20203VBNN_0_0",
            "U1:PIC18F26K22-I/SS",
            "J6:"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "N$13",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J6:"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "N$15",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R20:150^_0603"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:150^_0603"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1:PIC18F26K22-I/SS",
            "J12:1-2058703-2"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R36:10K_0603",
            "R35:10K_0603"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$48",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R29:1K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R6:1K_0603"
          ]
        }
      ]
    },
    {
      design: "12_inch_CD_Timer_Control",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "R26:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 0,
        communication: 3,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 4,
        unconnected: 12
      },
      allPins: [
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V",
            "J3:5040500891MOLEX_5040500891_0_0"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V",
            "J3:5040500891MOLEX_5040500891_0_0"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "R18:10K_0603",
            "J6:",
            "R28:1K_0603"
          ]
        },
        {
          pin: "RB5",
          net: "N$7",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R12:10K_0603"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R11:10K_0603"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R10:10K_0603"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R9:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R8:10K_0603"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "N$12",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J6:"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "N$13",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J6:"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "N$15",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R20:150^_0603"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R13:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R25:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "R26:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R27:150^_0603"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R4:10K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "N$36",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R23:10K_0603",
            "Q3:NTR4501NT1G"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "J4:504050-0691MOLEX_504050-0691_0_0",
            "J5:504050-0691MOLEX_504050-0691_0_0"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "J4:504050-0691MOLEX_504050-0691_0_0",
            "J5:504050-0691MOLEX_504050-0691_0_0"
          ]
        },
        {
          pin: "RC3",
          net: "N$48",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "J4:504050-0691MOLEX_504050-0691_0_0",
            "J5:504050-0691MOLEX_504050-0691_0_0"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "Q4:NTR4501NT1G",
            "R30:10K_0603"
          ]
        }
      ]
    },
    {
      design: "All-In-One_Schematic_IO_Board",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "R45:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R3:470^_0603",
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R2:470^_0603",
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R1:470^_0603",
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C25:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R54:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R28:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R58:1K_AXIAL"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R25:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 17,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "R45:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R3:470^_0603",
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R2:470^_0603",
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R1:470^_0603",
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "R21:1.62K_0805_0.1%",
            "U1A:PIC18F26K226SP",
            "Q8:NTR4501NT1G",
            "C5:0.1UF_0603_10%_16V",
            "J3:"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R11:150^_0603",
            "U1A:PIC18F26K226SP",
            "R24:1.2K_0603",
            "C6:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "J1:"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "J1:"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C25:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R54:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R28:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R58:1K_AXIAL"
          ]
        }
      ]
    },
    {
      design: "All-In-One_Schematic_IO_Board",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "U1:PIC18F26K22-I/SS",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R3:470^_0603",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:470^_0603",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:470^_0603",
            "R42:100^_0603"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C25:0.1UF_0603_10%_16V",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R54:100^_0603"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R28:1.2K_0805"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:1.2K_0805"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R58:1K_AXIAL"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R25:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 17,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "U1:PIC18F26K22-I/SS",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R3:470^_0603",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:470^_0603",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:470^_0603",
            "R42:100^_0603"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "R21:1.62K_0805_0.1%",
            "Q8:NTR4501NT1G",
            "C5:0.1UF_0603_10%_16V",
            "J3:",
            "R18:1.62K_0805_0.1%"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R11:150^_0603",
            "R24:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C6:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J1:"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J1:"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C25:0.1UF_0603_10%_16V",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R54:100^_0603"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R28:1.2K_0805"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:1.2K_0805"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R58:1K_AXIAL"
          ]
        }
      ]
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "R45:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R3:470^_0603",
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R2:470^_0603",
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R1:470^_0603",
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C25:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R54:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R28:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R58:1K_AXIAL"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R25:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 17,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "R45:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R3:470^_0603",
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R2:470^_0603",
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R1:470^_0603",
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "R21:1.62K_0805_0.1%",
            "U1A:PIC18F26K226SP",
            "Q8:NTR4501NT1G",
            "C5:0.1UF_0603_10%_16V",
            "J3:"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R11:150^_0603",
            "U1A:PIC18F26K226SP",
            "R24:1.2K_0603",
            "C6:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "J1:"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "J1:"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C25:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R54:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R28:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:1.2K_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R58:1K_AXIAL"
          ]
        }
      ]
    },
    {
      design: "All-In-One_Schematic_IO_Board_w_ESP32",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "U1:PIC18F26K22-I/SS",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R3:470^_0603",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:470^_0603",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:470^_0603",
            "R42:100^_0603"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C25:0.1UF_0603_10%_16V",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R54:100^_0603"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R28:1.2K_0805"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:1.2K_0805"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R58:1K_AXIAL"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R25:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 17,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA4",
          net: "AUX_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:470^_0603",
            "U1:PIC18F26K22-I/SS",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R3:470^_0603",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:470^_0603",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:470^_0603",
            "R42:100^_0603"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-15-5",
            "D2:LTST-C193KRKT-5ALITE-ON_LTST-C193KRKT-5A_0_0",
            "C36:12PF_0603",
            "C12:0.1UF_0603_10%_16V",
            "C32:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "R21:1.62K_0805_0.1%",
            "Q8:NTR4501NT1G",
            "C5:0.1UF_0603_10%_16V",
            "J3:",
            "R18:1.62K_0805_0.1%"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R11:150^_0603",
            "R24:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C6:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J1:"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J1:"
          ]
        },
        {
          pin: "RB3",
          net: "LID_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R5:10K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "CHAMBER1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        },
        {
          pin: "RC2",
          net: "CHAMBER2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:1K_0603",
            "C10:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "PROBE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:1K_0603",
            "C23:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB4",
          net: "PROBE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:1K_0603",
            "C24:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RB0",
          net: "PROBE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C25:0.1UF_0603_10%_16V",
            "R22:1K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "AMBIENT_TEMP",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R54:100^_0603"
          ]
        },
        {
          pin: "RB1",
          net: "VIBRATOR2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R28:1.2K_0805"
          ]
        },
        {
          pin: "RB2",
          net: "VIBRATOR1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:1.2K_0805"
          ]
        },
        {
          pin: "RC5",
          net: "PELLET_WEIGHT_1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C12:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS",
            "R30:1K_0603"
          ]
        },
        {
          pin: "RC4",
          net: "PELLET_WEIGHT_2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R33:1K_0603",
            "C13:0.1UF_0603_10%_16V"
          ]
        },
        {
          pin: "RC7",
          net: "PIC_RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "PIC_TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RC1",
          net: "PIC_DEBUG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R58:1K_AXIAL"
          ]
        }
      ]
    },
    {
      design: "Alpha_sign_control",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R12:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R11:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R10:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R9:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R8:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R25:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R30:10K_0603"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R6:10K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "N$29",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R32:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 16,
        communication: 3,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "R18:10K_0603",
            "J6:"
          ]
        },
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R12:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R11:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R10:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R9:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R8:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J6:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "N$13",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J6:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "N$15",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R20:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R21:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R25:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R27:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R30:10K_0603"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R6:10K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "N$29",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R32:10K_0603",
            "U1A:PIC18F26K226SP"
          ]
        }
      ]
    },
    {
      design: "Alpha_sign_control",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 25,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R12:10K_0603"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R11:10K_0603"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R10:10K_0603"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R9:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R8:10K_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:150^_0603"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R30:10K_0603"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R6:10K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "N$29",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R32:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R26:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 16,
        communication: 3,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V",
            "J3:5040500891MOLEX_5040500891_0_0"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "C10:0.1UF_0603_5%_50V",
            "J3:5040500891MOLEX_5040500891_0_0"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "D2:PMBD7000",
            "C5:0.1UF_0603_5%_50V",
            "R18:10K_0603",
            "J6:",
            "R28:1K_0603"
          ]
        },
        {
          pin: "RB5",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R12:10K_0603"
          ]
        },
        {
          pin: "RB1",
          net: "N$8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R11:10K_0603"
          ]
        },
        {
          pin: "RB4",
          net: "N$9",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R10:10K_0603"
          ]
        },
        {
          pin: "RB2",
          net: "N$10",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R9:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "N$11",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R8:10K_0603"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J6:"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "N$13",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J6:"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "N$15",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R20:150^_0603"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R21:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R22:150^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "N$18",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:2.7K_0805"
          ]
        },
        {
          pin: "RA1",
          net: "EXTRA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:150^_0603"
          ]
        },
        {
          pin: "RA2",
          net: "DATA",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R25:150^_0603"
          ]
        },
        {
          pin: "RA4",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R26:150^_0603"
          ]
        },
        {
          pin: "RA5",
          net: "RCK",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R27:150^_0603"
          ]
        },
        {
          pin: "RA7",
          net: "START_SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC4",
          net: "COLON_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R23:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$46",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$47",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R30:10K_0603"
          ]
        },
        {
          pin: "RC5",
          net: "N$33",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R6:10K_0603"
          ]
        },
        {
          pin: "RC3",
          net: "N$29",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R32:10K_0603",
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ]
    },
    {
      design: "FGLF0623_Triac_Board_Original",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 22,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:330^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1A:PIC18F26K226SP",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "Q7:BSS670S2L",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        }
      ],
      communications: [
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "U1A:PIC18F26K226SP",
            "R2:1.2K_0603",
            "C7:0.1UF_0603_5%_50V"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 15,
        communication: 1,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R21:1.2K_0603",
            "U1A:PIC18F26K226SP",
            "C5:0.1UF_0603_5%_50V",
            "R3:150^_0805_1%"
          ]
        },
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:330^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "JP:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "JP:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "U1A:PIC18F26K226SP",
            "R2:1.2K_0603",
            "C7:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1A:PIC18F26K226SP",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "Q7:BSS670S2L",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C1:0.1UF_0603_5%_50V",
            "R21:1.2K_0603",
            "C9:0.1UF_0603_5%_50V",
            "VR1:MC7805CTGMC7805",
            "C4:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "U2:MOC3063SR2M",
            "C5:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23"
          ]
        },
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "U2:MOC3063SR2M",
            "C5:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        }
      ]
    },
    {
      design: "FGLF0623_Triac_Board_Original",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 22,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:330^_0805"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1:PIC18F26K22-I/SS",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "Q7:BSS670S2L"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ],
      communications: [
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "R2:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_5%_50V"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 15,
        communication: 1,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R21:1.2K_0603",
            "C5:0.1UF_0603_5%_50V",
            "R3:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:330^_0805"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "JP:"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "JP:"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "R2:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1:PIC18F26K22-I/SS",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "Q7:BSS670S2L"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C1:0.1UF_0603_5%_50V",
            "R21:1.2K_0603",
            "C9:0.1UF_0603_5%_50V",
            "VR1:MC7805CTGMC7805",
            "C4:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "C5:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23",
            "C12:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "C5:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23",
            "C12:22UF_1206_10V1206"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ]
    },
    {
      design: "FGLF0623_Triac_Board",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 22,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:330^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1A:PIC18F26K226SP",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "Q7:BSS670S2L",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        }
      ],
      communications: [
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "U1A:PIC18F26K226SP",
            "R2:1.2K_0603",
            "C7:0.1UF_0603_5%_50V"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 15,
        communication: 1,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R21:1.2K_0603",
            "U1A:PIC18F26K226SP",
            "C5:0.1UF_0603_5%_50V",
            "R3:150^_0805_1%"
          ]
        },
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:330^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "JP:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "JP:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "U1A:PIC18F26K226SP",
            "R2:1.2K_0603",
            "C7:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1A:PIC18F26K226SP",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "Q7:BSS670S2L",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C1:0.1UF_0603_5%_50V",
            "R21:1.2K_0603",
            "C9:0.1UF_0603_5%_50V",
            "VR1:MC7805CTGMC7805",
            "C4:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "Q8:MMBT3904LT1_SOT23",
            "C5:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M"
          ]
        },
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "U1A:PIC18F26K226SP",
            "Q8:MMBT3904LT1_SOT23",
            "C5:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "X1:ECS-SR1-8.00-B-TR",
            "U1A:PIC18F26K226SP",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP"
          ]
        }
      ]
    },
    {
      design: "FGLF0623_Triac_Board",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 22,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:330^_0805"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1:PIC18F26K22-I/SS",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "Q7:BSS670S2L"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ],
      communications: [
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "R2:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_5%_50V"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 15,
        communication: 1,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R21:1.2K_0603",
            "C5:0.1UF_0603_5%_50V",
            "R3:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RB5",
          net: "HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:330^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "MID_LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:330^_0805"
          ]
        },
        {
          pin: "RA0",
          net: "LO_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R24:330^_0805"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "JP:"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "JP:"
          ]
        },
        {
          pin: "RB4",
          net: "MID_HI_SIG",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:330^_0805"
          ]
        },
        {
          pin: "RB3",
          net: "EOUT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R5:150^_0805_1%"
          ]
        },
        {
          pin: "RB2",
          net: "OILBURNER",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:330^_0805"
          ]
        },
        {
          pin: "RB0",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U4:FOD817ASD",
            "R2:1.2K_0603",
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RC7",
          net: "MASTER_RECV",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R7:150^_0805_1%",
            "U1:PIC18F26K22-I/SS",
            "R19:4.7K_0805_1%_0.125W"
          ]
        },
        {
          pin: "RC6",
          net: "MASTER_XMIT",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "Q7:BSS670S2L"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C1:0.1UF_0603_5%_50V",
            "R21:1.2K_0603",
            "C9:0.1UF_0603_5%_50V",
            "VR1:MC7805CTGMC7805",
            "C4:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23",
            "C5:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "C12:22UF_1206_10V1206"
          ]
        },
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_5%_50V",
            "Q8:MMBT3904LT1_SOT23",
            "C5:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "C12:22UF_1206_10V1206"
          ]
        },
        {
          pin: "RA7",
          net: "N$1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA6",
          net: "N$2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "X1:ECS-SR1-8.00-B-TR",
            "R1:10M_0805_1%"
          ]
        },
        {
          pin: "RA5",
          net: "LO_MID_LO_PHASE_ANGLE_FIRE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R4:150^_0805_1%",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RA1",
          net: "N$7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "N$20",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC2",
          net: "N$21",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC3",
          net: "N$41",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS"
          ]
        }
      ]
    },
    {
      design: "Main_Board",
      partNumber: "PIC18F46",
      elementName: "U7",
      totalPins: 34,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RD5",
          net: "IC_BEEP",
          function: "digital_output",
          detail: "buzzer",
          connectedParts: [
            "R54:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC4",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "R4:27K_0805_0.125W",
            "U1:FOD817ASD",
            "C2:0.1UF_0805"
          ]
        },
        {
          pin: "RC6",
          net: "TX1",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R61:1K_0603"
          ]
        },
        {
          pin: "RD1",
          net: "SDA2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R56:27K_0805_0.125W",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RD0",
          net: "SCL2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R46:100^_0603",
            "R57:27K_0805_0.125W"
          ]
        },
        {
          pin: "RD6",
          net: "TX2",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R52:1K_0603"
          ]
        },
        {
          pin: "RD7",
          net: "RX2",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R53:1K_0603"
          ]
        },
        {
          pin: "RA0",
          net: "PRESSURE",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "C28:0.1UF_0805",
            "R25:10K_0603"
          ]
        },
        {
          pin: "RC7",
          net: "RX1",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R62:1K_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 1,
        communication: 8,
        programming: 3,
        power: 4,
        crystal: 0,
        digital_io: 16,
        unconnected: 2
      },
      allPins: [
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-10-12MEAN_WELL_IRM-10-12_0_0",
            "C29:0.1UF_0805",
            "C9:0.1UF_0805",
            "LED1:LED_RED_0805",
            "U2:FOD817ASD"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "PS1:IRM-10-12MEAN_WELL_IRM-10-12_0_0",
            "C29:0.1UF_0805",
            "C9:0.1UF_0805",
            "LED1:LED_RED_0805",
            "U2:FOD817ASD"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0805",
            "R37:1K_0603",
            "J3:440054-4",
            "C5:0.1UF_0805",
            "R10:150^_0603"
          ]
        },
        {
          pin: "VDD@2",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0805",
            "R37:1K_0603",
            "J3:440054-4",
            "C5:0.1UF_0805",
            "R10:150^_0603"
          ]
        },
        {
          pin: "RC4",
          net: "ZEROCROSS",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "R4:27K_0805_0.125W",
            "U1:FOD817ASD",
            "C2:0.1UF_0805"
          ]
        },
        {
          pin: "RC5",
          net: "ABOVE100",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "C3:0.1UF_0805",
            "R5:27K_0805_0.125W",
            "U2:FOD817ASD"
          ]
        },
        {
          pin: "RD3",
          net: "NITRO",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U3:VOT8024AB"
          ]
        },
        {
          pin: "RD2",
          net: "TORCH",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U4:VOT8024AB"
          ]
        },
        {
          pin: "RC3",
          net: "IRON",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U8:VOT8024AB"
          ]
        },
        {
          pin: "RC2",
          net: "TORQM",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R59:100^_0603"
          ]
        },
        {
          pin: "RC1",
          net: "TORQH",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R60:100^_0603"
          ]
        },
        {
          pin: "RA6",
          net: "MTR_FLT",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U9:MP6500GF",
            "R55:27K_0805_0.125W"
          ]
        },
        {
          pin: "RE2",
          net: "MTR_SLP",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U9:MP6500GF"
          ]
        },
        {
          pin: "RA7",
          net: "MTR_EN",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U9:MP6500GF"
          ]
        },
        {
          pin: "RE1",
          net: "MTR_DIR",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U9:MP6500GF"
          ]
        },
        {
          pin: "RE0",
          net: "MTR_STEP",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U9:MP6500GF"
          ]
        },
        {
          pin: "RC6",
          net: "TX1",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R61:1K_0603"
          ]
        },
        {
          pin: "RD1",
          net: "SDA2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R56:27K_0805_0.125W",
            "R45:100^_0603"
          ]
        },
        {
          pin: "RD0",
          net: "SCL2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R46:100^_0603",
            "R57:27K_0805_0.125W"
          ]
        },
        {
          pin: "RD6",
          net: "TX2",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R52:1K_0603"
          ]
        },
        {
          pin: "RD7",
          net: "RX2",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R53:1K_0603"
          ]
        },
        {
          pin: "RA1",
          net: "T_TIP",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "C29:0.1UF_0805",
            "R35:10K_0603"
          ]
        },
        {
          pin: "RA0",
          net: "PRESSURE",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "C28:0.1UF_0805",
            "R25:10K_0603"
          ]
        },
        {
          pin: "RA2",
          net: "T_HANDLE",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "C30:0.1UF_0805",
            "R36:10K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "ON_HOOK",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R48:10K_0603"
          ]
        },
        {
          pin: "RA3",
          net: "BOARD_TEMP",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R38:10K_0603",
            "C31:0.1UF_0805"
          ]
        },
        {
          pin: "RC7",
          net: "RX1",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R62:1K_0603"
          ]
        },
        {
          pin: "MCTRL/VPP/RE3",
          net: "N$47",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J2:",
            "R37:1K_0603"
          ]
        },
        {
          pin: "PGD/RB7",
          net: "N$52",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J2:"
          ]
        },
        {
          pin: "PGC/RB6",
          net: "N$53",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J2:"
          ]
        },
        {
          pin: "RA4",
          net: "N$49",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R39:1K_0603"
          ]
        },
        {
          pin: "RC0",
          net: "N$54",
          function: "unconnected",
          detail: null,
          connectedParts: [
            "R26:1K_0603",
            "J1:"
          ]
        },
        {
          pin: "RB2",
          net: "TOF_RESET",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R58:100^_0603"
          ]
        },
        {
          pin: "RD5",
          net: "IC_BEEP",
          function: "digital_output",
          detail: "buzzer",
          connectedParts: [
            "R54:1K_0603"
          ]
        }
      ]
    },
    {
      design: "TouchMZ_In_Out_Board",
      partNumber: "PIC18F24",
      elementName: "U9",
      totalPins: 27,
      analogPins: [
        {
          pin: "RA3/AN3/VREF+",
          net: "AN1",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R34:10K_0603",
            "C9:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB1/INT1/AN10",
          net: "AN8",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R48:10K_0603",
            "C16:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB2/INT2/AN8",
          net: "AN7",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R46:10K_0603",
            "C15:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB3/AN9/CCP2*",
          net: "AN6",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C14:0.1UF_0603_5%_50V",
            "R44:10K_0603"
          ]
        },
        {
          pin: "RB4/KBI0/AN11",
          net: "AN5",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R42:10K_0603",
            "C13:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RA0/AN0",
          net: "AN4",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C12:0.1UF_0603_5%_50V",
            "R40:10K_0603"
          ]
        },
        {
          pin: "RA1/AN1",
          net: "AN3",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R38:10K_0603",
            "C11:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RA2/AN2/VREF-/CVREF",
          net: "AN2",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C10:0.1UF_0603_5%_50V",
            "R36:10K_0603"
          ]
        },
        {
          pin: "RB0/INT0/FLT0/AN12",
          net: "SW4",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R51:10K_0603"
          ]
        }
      ],
      digitalOutputs: [
        {
          pin: "RB5/KBI1/T0CKI/C1OUT",
          net: "BEEP",
          function: "digital_output",
          detail: "buzzer",
          connectedParts: [
            "R59:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC6/TX/CK",
          net: "TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R68:150^_0603"
          ]
        },
        {
          pin: "RC7/RX/DT",
          net: "RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R67:150^_0603"
          ]
        },
        {
          pin: "RC3/SCK1/SCL1",
          net: "SHIFT_DATA",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "U11:MM74HC595MX"
          ]
        },
        {
          pin: "RC1/T1OSI/CCP2*",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U12:MM74HC595MX",
            "U11:MM74HC595MX"
          ]
        },
        {
          pin: "RC4/SDI1/SDA1",
          net: "SW2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R55:10K_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 9,
        digital_output: 1,
        communication: 5,
        programming: 3,
        power: 4,
        crystal: 2,
        digital_io: 3,
        unconnected: 0
      },
      allPins: [
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:2P_0.100_VERT_MALE_LATCH",
            "C29:0.1UF_0603_5%_50V",
            "C9:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "J3:2P_0.100_VERT_MALE_LATCH"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "J8:2P_0.100_VERT_MALE_LATCH",
            "C29:0.1UF_0603_5%_50V",
            "C9:0.1UF_0603_5%_50V",
            "U2:MOC3063SR2M",
            "J3:2P_0.100_VERT_MALE_LATCH"
          ]
        },
        {
          pin: "RA3/AN3/VREF+",
          net: "AN1",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R34:10K_0603",
            "C9:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB1/INT1/AN10",
          net: "AN8",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R48:10K_0603",
            "C16:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB2/INT2/AN8",
          net: "AN7",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R46:10K_0603",
            "C15:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB3/AN9/CCP2*",
          net: "AN6",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C14:0.1UF_0603_5%_50V",
            "R44:10K_0603"
          ]
        },
        {
          pin: "RB4/KBI0/AN11",
          net: "AN5",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R42:10K_0603",
            "C13:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RA0/AN0",
          net: "AN4",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C12:0.1UF_0603_5%_50V",
            "R40:10K_0603"
          ]
        },
        {
          pin: "RA1/AN1",
          net: "AN3",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R38:10K_0603",
            "C11:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RA2/AN2/VREF-/CVREF",
          net: "AN2",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "C10:0.1UF_0603_5%_50V",
            "R36:10K_0603"
          ]
        },
        {
          pin: "VDD",
          net: "+3.3V",
          function: "power",
          detail: null,
          connectedParts: [
            "R54:10K_0603",
            "R26:6.34K_0805",
            "C20:0.1UF_0603_5%_50V",
            "D16:PMBD7000",
            "D13:PMBD7000"
          ]
        },
        {
          pin: "MCLR",
          net: "N$65",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R49:1K_0603",
            "J9:",
            "C19:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RB6/KBI2/PGC",
          net: "N$66",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J9:"
          ]
        },
        {
          pin: "RB7/KBI3/PGD",
          net: "N$67",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J9:"
          ]
        },
        {
          pin: "OSC1/CLKI",
          net: "N$78",
          function: "crystal",
          detail: null,
          connectedParts: [
            "X1:CSTCE8M00G55-R0",
            "R50:10M_0805_5%"
          ]
        },
        {
          pin: "OSC2/CLKO",
          net: "N$79",
          function: "crystal",
          detail: null,
          connectedParts: [
            "X1:CSTCE8M00G55-R0",
            "R50:10M_0805_5%"
          ]
        },
        {
          pin: "VDDCORE/VCAP",
          net: "N$77",
          function: "power",
          detail: null,
          connectedParts: [
            "C28:22UF_1206_10V1206",
            "C24:0.1UF_0603_5%_50V"
          ]
        },
        {
          pin: "RC6/TX/CK",
          net: "TX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R68:150^_0603"
          ]
        },
        {
          pin: "RC7/RX/DT",
          net: "RX",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R67:150^_0603"
          ]
        },
        {
          pin: "RC3/SCK1/SCL1",
          net: "SHIFT_DATA",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "U11:MM74HC595MX"
          ]
        },
        {
          pin: "RC2/CCP1",
          net: "RCK",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "U12:MM74HC595MX",
            "U11:MM74HC595MX"
          ]
        },
        {
          pin: "RC1/T1OSI/CCP2*",
          net: "SCK",
          function: "communication",
          detail: "spi",
          connectedParts: [
            "U12:MM74HC595MX",
            "U11:MM74HC595MX"
          ]
        },
        {
          pin: "RC0/T1OSO/T1CKI",
          net: "SW1",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R57:10K_0603"
          ]
        },
        {
          pin: "RC4/SDI1/SDA1",
          net: "SW2",
          function: "communication",
          detail: "i2c",
          connectedParts: [
            "R55:10K_0603"
          ]
        },
        {
          pin: "RC5/SDO1",
          net: "SW3",
          function: "digital_io",
          detail: null,
          connectedParts: [
            "R53:10K_0603"
          ]
        },
        {
          pin: "RB0/INT0/FLT0/AN12",
          net: "SW4",
          function: "analog_input",
          detail: "general_adc",
          connectedParts: [
            "R51:10K_0603"
          ]
        },
        {
          pin: "RB5/KBI1/T0CKI/C1OUT",
          net: "BEEP",
          function: "digital_output",
          detail: "buzzer",
          connectedParts: [
            "R59:1K_0603"
          ]
        }
      ]
    },
    {
      design: "ZLF0053",
      partNumber: "PIC18F26",
      elementName: "U1",
      totalPins: 28,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RB5",
          net: "SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "R47:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "ANODE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R56:1K_0603",
            "D15:1N4148",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "ANODE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D14:1N4148",
            "R55:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB0",
          net: "ANODE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R51:1K_0603",
            "U1A:PIC18F26K226SP",
            "D13:1N4148"
          ]
        },
        {
          pin: "RC5",
          net: "ANODE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D12:1N4148",
            "R50:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "ANODE0",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R49:1K_0603",
            "D21:1N4148"
          ]
        },
        {
          pin: "RB4",
          net: "ANODE5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D22:1N4148",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA4",
          net: "CATH1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R48:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "CATH2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "CATH3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R14:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "CATH4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:75^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "CATH5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "CATH6",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:75^_0805"
          ]
        },
        {
          pin: "RA6",
          net: "CATH7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:75^_0805"
          ]
        },
        {
          pin: "RC3",
          net: "CATH8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:75^_0805"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA5",
          net: "TEMPERATURE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R2:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 20,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R42:100^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R43:100^_0603"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "J3:615004144021",
            "U$4:KEYSTONE_4881",
            "U7:MOC3052SM"
          ]
        },
        {
          pin: "VSS@2",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "J3:615004144021",
            "U$4:KEYSTONE_4881",
            "U7:MOC3052SM"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R32:1.2K_0603",
            "U1A:PIC18F26K226SP",
            "C21:0.1UF_0603_10%_16V",
            "R31:150^_0603"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "J5:",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB5",
          net: "SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C7:0.1UF_0603_10%_16V",
            "R47:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB2",
          net: "ANODE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R56:1K_0603",
            "D15:1N4148",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB1",
          net: "ANODE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D14:1N4148",
            "R55:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB0",
          net: "ANODE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R51:1K_0603",
            "U1A:PIC18F26K226SP",
            "D13:1N4148"
          ]
        },
        {
          pin: "RC5",
          net: "ANODE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D12:1N4148",
            "R50:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RB3",
          net: "ANODE0",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R49:1K_0603",
            "D21:1N4148"
          ]
        },
        {
          pin: "RB4",
          net: "ANODE5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D22:1N4148",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA4",
          net: "CATH1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R48:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC4",
          net: "CATH2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R13:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC2",
          net: "CATH3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R14:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RC1",
          net: "CATH4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R15:75^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "CATH5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R16:75^_0805",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA7",
          net: "CATH6",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R17:75^_0805"
          ]
        },
        {
          pin: "RA6",
          net: "CATH7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R18:75^_0805"
          ]
        },
        {
          pin: "RC3",
          net: "CATH8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R19:75^_0805"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603",
            "U1A:PIC18F26K226SP"
          ]
        },
        {
          pin: "RA5",
          net: "TEMPERATURE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "C8:0.1UF_0603_10%_16V",
            "U1A:PIC18F26K226SP",
            "R6:1K_0603"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "J3:615004144021",
            "Q8:MMBT3906LT1",
            "Q7:MMBT3906LT1",
            "D4:PMBD7000"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1A:PIC18F26K226SP",
            "R1:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "R2:150^_0603",
            "U1A:PIC18F26K226SP"
          ]
        }
      ]
    },
    {
      design: "ZLF0053",
      partNumber: "PIC18F26",
      elementName: "U1A",
      totalPins: 28,
      analogPins: [],
      digitalOutputs: [
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R42:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R43:100^_0603"
          ]
        },
        {
          pin: "RB5",
          net: "SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R47:150^_0603"
          ]
        },
        {
          pin: "RB2",
          net: "ANODE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R56:1K_0603",
            "D15:1N4148"
          ]
        },
        {
          pin: "RB1",
          net: "ANODE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "D14:1N4148",
            "R55:1K_0603"
          ]
        },
        {
          pin: "RB0",
          net: "ANODE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R51:1K_0603",
            "D13:1N4148"
          ]
        },
        {
          pin: "RC5",
          net: "ANODE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D12:1N4148",
            "U1:PIC18F26K22-I/SS",
            "R50:1K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "ANODE0",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R49:1K_0603",
            "D21:1N4148"
          ]
        },
        {
          pin: "RB4",
          net: "ANODE5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "D22:1N4148"
          ]
        },
        {
          pin: "RA4",
          net: "CATH1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R48:75^_0805"
          ]
        },
        {
          pin: "RC4",
          net: "CATH2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:75^_0805"
          ]
        },
        {
          pin: "RC2",
          net: "CATH3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R14:75^_0805",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "CATH4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:75^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "CATH5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:75^_0805"
          ]
        },
        {
          pin: "RA7",
          net: "CATH6",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:75^_0805"
          ]
        },
        {
          pin: "RA6",
          net: "CATH7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:75^_0805"
          ]
        },
        {
          pin: "RC3",
          net: "CATH8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:75^_0805"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "TEMPERATURE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        }
      ],
      communications: [
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:150^_0603"
          ]
        }
      ],
      pinSummary: {
        analog_input: 0,
        digital_output: 20,
        communication: 2,
        programming: 3,
        power: 3,
        crystal: 0,
        digital_io: 0,
        unconnected: 0
      },
      allPins: [
        {
          pin: "RA2",
          net: "IGNITOR_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R44:100^_0603"
          ]
        },
        {
          pin: "RA0",
          net: "EXHAUST_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R42:100^_0603"
          ]
        },
        {
          pin: "RA1",
          net: "AUGER_SIGNAL",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R43:100^_0603"
          ]
        },
        {
          pin: "VSS",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "J3:615004144021",
            "U$4:KEYSTONE_4881",
            "U7:MOC3052SM",
            "D4:PMBD7000"
          ]
        },
        {
          pin: "VSS1",
          net: "GND",
          function: "power",
          detail: null,
          connectedParts: [
            "C9:0.1UF_0603_10%_16V",
            "J3:615004144021",
            "U$4:KEYSTONE_4881",
            "U7:MOC3052SM",
            "D4:PMBD7000"
          ]
        },
        {
          pin: "MCLR/VPP/RE3",
          net: "MCLR",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "R32:1.2K_0603",
            "C21:0.1UF_0603_10%_16V",
            "U1:PIC18F26K22-I/SS",
            "R31:150^_0603"
          ]
        },
        {
          pin: "RB6/PGC",
          net: "PGC",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:"
          ]
        },
        {
          pin: "RB7/PGD",
          net: "PGD",
          function: "programming",
          detail: "ICSP",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "J5:"
          ]
        },
        {
          pin: "RB5",
          net: "SWITCH",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C7:0.1UF_0603_10%_16V",
            "R47:150^_0603"
          ]
        },
        {
          pin: "RB2",
          net: "ANODE4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R56:1K_0603",
            "D15:1N4148"
          ]
        },
        {
          pin: "RB1",
          net: "ANODE3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "D14:1N4148",
            "R55:1K_0603"
          ]
        },
        {
          pin: "RB0",
          net: "ANODE2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R51:1K_0603",
            "D13:1N4148"
          ]
        },
        {
          pin: "RC5",
          net: "ANODE1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "D12:1N4148",
            "U1:PIC18F26K22-I/SS",
            "R50:1K_0603"
          ]
        },
        {
          pin: "RB3",
          net: "ANODE0",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R49:1K_0603",
            "D21:1N4148"
          ]
        },
        {
          pin: "RB4",
          net: "ANODE5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "D22:1N4148"
          ]
        },
        {
          pin: "RA4",
          net: "CATH1",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R48:75^_0805"
          ]
        },
        {
          pin: "RC4",
          net: "CATH2",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R13:75^_0805"
          ]
        },
        {
          pin: "RC2",
          net: "CATH3",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "R14:75^_0805",
            "U1:PIC18F26K22-I/SS"
          ]
        },
        {
          pin: "RC1",
          net: "CATH4",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R15:75^_0805"
          ]
        },
        {
          pin: "RC0",
          net: "CATH5",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R16:75^_0805"
          ]
        },
        {
          pin: "RA7",
          net: "CATH6",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R17:75^_0805"
          ]
        },
        {
          pin: "RA6",
          net: "CATH7",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R18:75^_0805"
          ]
        },
        {
          pin: "RC3",
          net: "CATH8",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R19:75^_0805"
          ]
        },
        {
          pin: "RA3",
          net: "PROBE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C9:0.1UF_0603_10%_16V",
            "R9:1K_0603"
          ]
        },
        {
          pin: "RA5",
          net: "TEMPERATURE",
          function: "digital_output",
          detail: "relay_drive",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "C8:0.1UF_0603_10%_16V",
            "R6:1K_0603"
          ]
        },
        {
          pin: "VDD",
          net: "+5V",
          function: "power",
          detail: null,
          connectedParts: [
            "J3:615004144021",
            "Q8:MMBT3906LT1",
            "Q7:MMBT3906LT1",
            "D4:PMBD7000",
            "Q6:MMBT3906LT1"
          ]
        },
        {
          pin: "RC7",
          net: "RXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R1:150^_0603"
          ]
        },
        {
          pin: "RC6",
          net: "TXD",
          function: "communication",
          detail: "uart",
          connectedParts: [
            "U1:PIC18F26K22-I/SS",
            "R2:150^_0603"
          ]
        }
      ]
    }
  ];

export const picAdSummary = {
    boards_analyzed: 226,
    pic_designs_found: 17,
    unique_pics: 3
  };

export const analogSourceTypes = {
    general_adc: 9
  };

export const pinFunctionDistribution = {
    digital_output: 234,
    power: 53,
    programming: 51,
    communication: 44,
    digital_io: 23,
    unconnected: 14,
    analog_input: 9,
    crystal: 2
  };
