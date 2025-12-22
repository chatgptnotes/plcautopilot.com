/**
 * Comprehensive PLC Models Database
 * All major manufacturers and their models
 */

export interface PLCModel {
  id: string;
  manufacturer: string;
  series: string;
  model: string;
  description: string;
  fileExtension: string;
  programmingLanguages: string[];
  ioPoints: string;
  communication: string[];
  category: 'Micro' | 'Compact' | 'Modular' | 'Safety';
}

export const plcManufacturers = [
  'Schneider Electric',
  'Siemens',
  'Rockwell Automation (Allen-Bradley)',
  'Mitsubishi Electric',
  'ABB',
  'Omron',
  'Delta Electronics',
  'WAGO',
  'Phoenix Contact',
  'Beckhoff',
  'B&R Automation',
  'Panasonic',
  'Keyence',
  'Automation Direct',
  'CODESYS'
] as const;

export const plcModels: PLCModel[] = [
  // ========== SCHNEIDER ELECTRIC ==========
  {
    id: 'schneider-tm221ce16r',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M221',
    model: 'TM221CE16R',
    description: 'Compact PLC, 16 I/O, Relay outputs',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Grafcet'],
    ioPoints: '16 I/O (9 DI, 7 DO)',
    communication: ['Ethernet', 'Serial'],
    category: 'Compact'
  },
  {
    id: 'schneider-tm221ce24r',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M221',
    model: 'TM221CE24R',
    description: 'Compact PLC, 24 I/O, Relay outputs',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Grafcet'],
    ioPoints: '24 I/O (14 DI, 10 DO)',
    communication: ['Ethernet', 'Serial'],
    category: 'Compact'
  },
  {
    id: 'schneider-tm221ce40r',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M221',
    model: 'TM221CE40R',
    description: 'Compact PLC, 40 I/O, Relay outputs',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Grafcet'],
    ioPoints: '40 I/O (24 DI, 16 DO)',
    communication: ['Ethernet', 'Serial'],
    category: 'Compact'
  },
  {
    id: 'schneider-tm221ce40t',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M221',
    model: 'TM221CE40T',
    description: 'Compact PLC, 40 I/O, Transistor outputs',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Grafcet'],
    ioPoints: '40 I/O (24 DI, 16 DO)',
    communication: ['Ethernet', 'Serial'],
    category: 'Compact'
  },
  {
    id: 'schneider-m241-24io',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M241',
    model: 'TM241C24R',
    description: 'Logic controller, 24 I/O',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Structured Text', 'Function Block'],
    ioPoints: '24 I/O (14 DI, 10 DO)',
    communication: ['Ethernet', 'CANopen', 'Serial'],
    category: 'Compact'
  },
  {
    id: 'schneider-m258',
    manufacturer: 'Schneider Electric',
    series: 'Modicon M258',
    model: 'TM258LF42DT4L',
    description: 'Logic controller with motion',
    fileExtension: '.smbp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'Structured Text', 'Function Block'],
    ioPoints: '42 I/O',
    communication: ['Ethernet', 'CANopen', 'Serial'],
    category: 'Modular'
  },

  // ========== SIEMENS ==========
  {
    id: 'siemens-s7-1200-1211c',
    manufacturer: 'Siemens',
    series: 'S7-1200',
    model: 'CPU 1211C',
    description: 'Compact CPU, 6 DI/4 DO',
    fileExtension: '.zap15_1',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'SCL'],
    ioPoints: '10 I/O (6 DI, 4 DO)',
    communication: ['PROFINET', 'Ethernet'],
    category: 'Compact'
  },
  {
    id: 'siemens-s7-1200-1212c',
    manufacturer: 'Siemens',
    series: 'S7-1200',
    model: 'CPU 1212C',
    description: 'Compact CPU, 8 DI/6 DO',
    fileExtension: '.zap15_1',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'SCL'],
    ioPoints: '14 I/O (8 DI, 6 DO)',
    communication: ['PROFINET', 'Ethernet'],
    category: 'Compact'
  },
  {
    id: 'siemens-s7-1200-1214c',
    manufacturer: 'Siemens',
    series: 'S7-1200',
    model: 'CPU 1214C',
    description: 'Compact CPU, 14 DI/10 DO',
    fileExtension: '.zap15_1',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'SCL'],
    ioPoints: '24 I/O (14 DI, 10 DO)',
    communication: ['PROFINET', 'Ethernet'],
    category: 'Compact'
  },
  {
    id: 'siemens-s7-1500-1511',
    manufacturer: 'Siemens',
    series: 'S7-1500',
    model: 'CPU 1511-1 PN',
    description: 'Advanced controller',
    fileExtension: '.zap15_1',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'SCL', 'Graph'],
    ioPoints: 'Expandable',
    communication: ['PROFINET', 'PROFIBUS', 'Ethernet'],
    category: 'Modular'
  },
  {
    id: 'siemens-s7-1500-1515',
    manufacturer: 'Siemens',
    series: 'S7-1500',
    model: 'CPU 1515-2 PN',
    description: 'High-performance controller',
    fileExtension: '.zap15_1',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'SCL', 'Graph'],
    ioPoints: 'Expandable',
    communication: ['PROFINET', 'PROFIBUS', 'Ethernet'],
    category: 'Modular'
  },

  // ========== ROCKWELL AUTOMATION (ALLEN-BRADLEY) ==========
  {
    id: 'ab-micrologix-1100',
    manufacturer: 'Rockwell Automation (Allen-Bradley)',
    series: 'MicroLogix 1100',
    model: '1763-L16BBB',
    description: 'Micro controller, 16 I/O',
    fileExtension: '.RSS',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text'],
    ioPoints: '16 I/O (10 DI, 6 DO)',
    communication: ['Ethernet/IP', 'RS-232'],
    category: 'Micro'
  },
  {
    id: 'ab-micrologix-1400',
    manufacturer: 'Rockwell Automation (Allen-Bradley)',
    series: 'MicroLogix 1400',
    model: '1766-L32BWA',
    description: 'Micro controller, 32 I/O',
    fileExtension: '.RSS',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text'],
    ioPoints: '32 I/O (20 DI, 12 DO)',
    communication: ['Ethernet/IP', 'RS-232'],
    category: 'Micro'
  },
  {
    id: 'ab-compactlogix-5370',
    manufacturer: 'Rockwell Automation (Allen-Bradley)',
    series: 'CompactLogix 5370',
    model: '1769-L33ER',
    description: 'Compact controller with EtherNet/IP',
    fileExtension: '.ACD',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'Sequential Function Chart'],
    ioPoints: 'Expandable',
    communication: ['Ethernet/IP', 'ControlNet', 'DeviceNet'],
    category: 'Compact'
  },
  {
    id: 'ab-controllogix-5580',
    manufacturer: 'Rockwell Automation (Allen-Bradley)',
    series: 'ControlLogix 5580',
    model: '1756-L85E',
    description: 'High-performance controller',
    fileExtension: '.ACD',
    programmingLanguages: ['Ladder Logic', 'Function Block Diagram', 'Structured Text', 'Sequential Function Chart'],
    ioPoints: 'Expandable',
    communication: ['Ethernet/IP', 'ControlNet', 'DeviceNet'],
    category: 'Modular'
  },

  // ========== MITSUBISHI ELECTRIC ==========
  {
    id: 'mitsubishi-fx3u-16',
    manufacturer: 'Mitsubishi Electric',
    series: 'MELSEC FX3U',
    model: 'FX3U-16MR/ES',
    description: 'Compact PLC, 16 I/O',
    fileExtension: '.gxw',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'SFC', 'Structured Text'],
    ioPoints: '16 I/O (8 DI, 8 DO)',
    communication: ['RS-232', 'RS-485'],
    category: 'Compact'
  },
  {
    id: 'mitsubishi-fx5u-32',
    manufacturer: 'Mitsubishi Electric',
    series: 'MELSEC FX5U',
    model: 'FX5U-32MR/ES',
    description: 'Compact PLC, 32 I/O',
    fileExtension: '.gx3',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'SFC', 'Structured Text'],
    ioPoints: '32 I/O (16 DI, 16 DO)',
    communication: ['Ethernet', 'RS-232', 'USB'],
    category: 'Compact'
  },
  {
    id: 'mitsubishi-iq-r',
    manufacturer: 'Mitsubishi Electric',
    series: 'MELSEC iQ-R',
    model: 'R08ENCPU',
    description: 'High-performance controller',
    fileExtension: '.gx3',
    programmingLanguages: ['Ladder Diagram', 'Instruction List', 'SFC', 'Structured Text', 'Function Block'],
    ioPoints: 'Expandable',
    communication: ['Ethernet', 'CC-Link IE', 'PROFINET'],
    category: 'Modular'
  },

  // ========== ABB ==========
  {
    id: 'abb-ac500',
    manufacturer: 'ABB',
    series: 'AC500',
    model: 'PM554-TP-ETH',
    description: 'Modular PLC with touchscreen',
    fileExtension: '.pro',
    programmingLanguages: ['Ladder Diagram', 'Function Block', 'Structured Text', 'Instruction List', 'SFC'],
    ioPoints: 'Expandable',
    communication: ['Ethernet', 'PROFIBUS', 'CANopen'],
    category: 'Modular'
  },

  // ========== OMRON ==========
  {
    id: 'omron-cp1l',
    manufacturer: 'Omron',
    series: 'CP1L',
    model: 'CP1L-M30DR-D',
    description: 'Compact PLC, 30 I/O',
    fileExtension: '.cxp',
    programmingLanguages: ['Ladder Diagram', 'Structured Text', 'Function Block'],
    ioPoints: '30 I/O (18 DI, 12 DO)',
    communication: ['RS-232', 'USB'],
    category: 'Compact'
  },
  {
    id: 'omron-nx102',
    manufacturer: 'Omron',
    series: 'NX Series',
    model: 'NX102-1200',
    description: 'Machine automation controller',
    fileExtension: '.cxp',
    programmingLanguages: ['Ladder Diagram', 'Structured Text', 'Function Block', 'SFC'],
    ioPoints: 'Expandable',
    communication: ['EtherNet/IP', 'EtherCAT'],
    category: 'Modular'
  },

  // ========== DELTA ELECTRONICS ==========
  {
    id: 'delta-dvp-14ss',
    manufacturer: 'Delta Electronics',
    series: 'DVP-SS2',
    model: 'DVP14SS211R',
    description: 'Micro PLC, 14 I/O',
    fileExtension: '.dvp',
    programmingLanguages: ['Ladder Diagram', 'Instruction List'],
    ioPoints: '14 I/O (8 DI, 6 DO)',
    communication: ['RS-232', 'RS-485'],
    category: 'Micro'
  },
  {
    id: 'delta-ah500',
    manufacturer: 'Delta Electronics',
    series: 'AH500',
    model: 'AH10PM21R-5A',
    description: 'Motion control PLC',
    fileExtension: '.dvp',
    programmingLanguages: ['Ladder Diagram', 'Structured Text', 'Function Block', 'SFC'],
    ioPoints: 'Expandable',
    communication: ['Ethernet', 'CANopen', 'Modbus'],
    category: 'Modular'
  },

  // ========== WAGO ==========
  {
    id: 'wago-pfc200',
    manufacturer: 'WAGO',
    series: 'PFC200',
    model: '750-8212',
    description: 'Compact controller',
    fileExtension: '.pro',
    programmingLanguages: ['Ladder Diagram', 'Function Block', 'Structured Text', 'Instruction List', 'SFC'],
    ioPoints: 'Expandable (modular)',
    communication: ['Ethernet', 'PROFIBUS', 'CANopen', 'Modbus'],
    category: 'Compact'
  },

  // ========== CODESYS (Universal) ==========
  {
    id: 'codesys-generic',
    manufacturer: 'CODESYS',
    series: 'Generic',
    model: 'CODESYS V3',
    description: 'Universal PLC runtime (500+ brands)',
    fileExtension: '.project',
    programmingLanguages: ['Ladder Diagram', 'Function Block', 'Structured Text', 'Instruction List', 'SFC', 'CFC'],
    ioPoints: 'Depends on hardware',
    communication: ['Ethernet', 'CANopen', 'Modbus', 'EtherCAT'],
    category: 'Modular'
  }
];

// Helper functions
export function getManufacturers(): string[] {
  return Array.from(new Set(plcModels.map(m => m.manufacturer))).sort();
}

export function getModelsByManufacturer(manufacturer: string): PLCModel[] {
  return plcModels.filter(m => m.manufacturer === manufacturer);
}

export function searchModels(query: string): PLCModel[] {
  const lowerQuery = query.toLowerCase();
  return plcModels.filter(m =>
    m.model.toLowerCase().includes(lowerQuery) ||
    m.series.toLowerCase().includes(lowerQuery) ||
    m.manufacturer.toLowerCase().includes(lowerQuery) ||
    m.description.toLowerCase().includes(lowerQuery)
  );
}

export function getModelById(id: string): PLCModel | undefined {
  return plcModels.find(m => m.id === id);
}
