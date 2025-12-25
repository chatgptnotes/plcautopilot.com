/**
 * TM221 Models Database
 * Complete specifications for all Schneider Electric Modicon M221 PLC models
 *
 * PLCAutoPilot - Automating the Automation
 */

export interface TM221Model {
  id: string;
  name: string;
  description: string;
  category: 'compact' | 'compact-ethernet' | 'book';

  // I/O Specifications
  digitalInputs: number;
  digitalOutputs: number;
  analogInputs: number;
  analogOutputs: number;

  // Output Type
  outputType: 'relay' | 'transistor-sink' | 'transistor-source';

  // I/O Addressing
  inputRange: { start: string; end: string };
  outputRange: { start: string; end: string };
  analogInputRange?: { start: string; end: string };

  // Communication
  ethernet: boolean;
  serial: boolean;
  canOpen: boolean;

  // Power
  supplyVoltage: string;
  consumption24V: number; // mA
  consumption5V: number;  // mA

  // Physical
  expansionSlots: number;
  cartridgeSlots: number;

  // Memory
  maxMemoryBits: number;
  maxMemoryWords: number;
  maxTimers: number;
  maxCounters: number;
  maxHSC: number; // High Speed Counters
  maxPTO: number; // Pulse Train Outputs

  // Hardware ID for .smbp file
  hardwareId: number;
}

// Complete TM221 Models Database
export const TM221_MODELS: TM221Model[] = [
  // ============================================
  // COMPACT MODELS WITH ETHERNET (CE Series)
  // ============================================

  // TM221CE16 Series - 16 I/O
  {
    id: 'TM221CE16R',
    name: 'TM221CE16R',
    description: 'Compact 16 I/O, Ethernet, Relay Outputs',
    category: 'compact-ethernet',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 200,
    consumption5V: 350,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1928,
  },
  {
    id: 'TM221CE16T',
    name: 'TM221CE16T',
    description: 'Compact 16 I/O, Ethernet, Transistor Sink Outputs',
    category: 'compact-ethernet',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 150,
    consumption5V: 300,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1929,
  },
  {
    id: 'TM221CE16U',
    name: 'TM221CE16U',
    description: 'Compact 16 I/O, Ethernet, Transistor Source Outputs',
    category: 'compact-ethernet',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 150,
    consumption5V: 300,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1930,
  },

  // TM221CE24 Series - 24 I/O
  {
    id: 'TM221CE24R',
    name: 'TM221CE24R',
    description: 'Compact 24 I/O, Ethernet, Relay Outputs',
    category: 'compact-ethernet',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 250,
    consumption5V: 400,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1931,
  },
  {
    id: 'TM221CE24T',
    name: 'TM221CE24T',
    description: 'Compact 24 I/O, Ethernet, Transistor Sink Outputs',
    category: 'compact-ethernet',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 200,
    consumption5V: 350,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1932,
  },
  {
    id: 'TM221CE24U',
    name: 'TM221CE24U',
    description: 'Compact 24 I/O, Ethernet, Transistor Source Outputs',
    category: 'compact-ethernet',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 200,
    consumption5V: 350,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1933,
  },

  // TM221CE40 Series - 40 I/O
  {
    id: 'TM221CE40R',
    name: 'TM221CE40R',
    description: 'Compact 40 I/O, Ethernet, Relay Outputs',
    category: 'compact-ethernet',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 350,
    consumption5V: 500,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1934,
  },
  {
    id: 'TM221CE40T',
    name: 'TM221CE40T',
    description: 'Compact 40 I/O, Ethernet, Transistor Sink Outputs',
    category: 'compact-ethernet',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 300,
    consumption5V: 450,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1935,
  },
  {
    id: 'TM221CE40U',
    name: 'TM221CE40U',
    description: 'Compact 40 I/O, Ethernet, Transistor Source Outputs',
    category: 'compact-ethernet',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: true,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 300,
    consumption5V: 450,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1936,
  },

  // ============================================
  // COMPACT MODELS WITHOUT ETHERNET (C Series)
  // ============================================

  // TM221C16 Series - 16 I/O
  {
    id: 'TM221C16R',
    name: 'TM221C16R',
    description: 'Compact 16 I/O, Relay Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 180,
    consumption5V: 320,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1910,
  },
  {
    id: 'TM221C16T',
    name: 'TM221C16T',
    description: 'Compact 16 I/O, Transistor Sink Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 130,
    consumption5V: 280,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1911,
  },
  {
    id: 'TM221C16U',
    name: 'TM221C16U',
    description: 'Compact 16 I/O, Transistor Source Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 9,
    digitalOutputs: 7,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.8' },
    outputRange: { start: '%Q0.0', end: '%Q0.6' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 130,
    consumption5V: 280,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1912,
  },

  // TM221C24 Series - 24 I/O
  {
    id: 'TM221C24R',
    name: 'TM221C24R',
    description: 'Compact 24 I/O, Relay Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 230,
    consumption5V: 380,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1913,
  },
  {
    id: 'TM221C24T',
    name: 'TM221C24T',
    description: 'Compact 24 I/O, Transistor Sink Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 180,
    consumption5V: 330,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1914,
  },
  {
    id: 'TM221C24U',
    name: 'TM221C24U',
    description: 'Compact 24 I/O, Transistor Source Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 14,
    digitalOutputs: 10,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.13' },
    outputRange: { start: '%Q0.0', end: '%Q0.9' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 180,
    consumption5V: 330,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1915,
  },

  // TM221C40 Series - 40 I/O
  {
    id: 'TM221C40R',
    name: 'TM221C40R',
    description: 'Compact 40 I/O, Relay Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 330,
    consumption5V: 480,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1916,
  },
  {
    id: 'TM221C40T',
    name: 'TM221C40T',
    description: 'Compact 40 I/O, Transistor Sink Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 280,
    consumption5V: 430,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1917,
  },
  {
    id: 'TM221C40U',
    name: 'TM221C40U',
    description: 'Compact 40 I/O, Transistor Source Outputs (No Ethernet)',
    category: 'compact',
    digitalInputs: 24,
    digitalOutputs: 16,
    analogInputs: 2,
    analogOutputs: 0,
    outputType: 'transistor-source',
    inputRange: { start: '%I0.0', end: '%I0.23' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    analogInputRange: { start: '%IW0.0', end: '%IW0.1' },
    ethernet: false,
    serial: true,
    canOpen: false,
    supplyVoltage: '24VDC',
    consumption24V: 280,
    consumption5V: 430,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1918,
  },

  // ============================================
  // BOOK/MODULAR MODELS (M Series)
  // ============================================

  {
    id: 'TM221M16R',
    name: 'TM221M16R',
    description: 'Book Format 16 I/O, Relay Outputs',
    category: 'book',
    digitalInputs: 8,
    digitalOutputs: 8,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'relay',
    inputRange: { start: '%I0.0', end: '%I0.7' },
    outputRange: { start: '%Q0.0', end: '%Q0.7' },
    ethernet: false,
    serial: true,
    canOpen: true,
    supplyVoltage: '24VDC',
    consumption24V: 200,
    consumption5V: 350,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1940,
  },
  {
    id: 'TM221M16T',
    name: 'TM221M16T',
    description: 'Book Format 16 I/O, Transistor Sink Outputs',
    category: 'book',
    digitalInputs: 8,
    digitalOutputs: 8,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.7' },
    outputRange: { start: '%Q0.0', end: '%Q0.7' },
    ethernet: false,
    serial: true,
    canOpen: true,
    supplyVoltage: '24VDC',
    consumption24V: 150,
    consumption5V: 300,
    expansionSlots: 7,
    cartridgeSlots: 1,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 4,
    maxPTO: 2,
    hardwareId: 1941,
  },
  {
    id: 'TM221M32TK',
    name: 'TM221M32TK',
    description: 'Book Format 32 I/O, Transistor Sink, CANopen',
    category: 'book',
    digitalInputs: 16,
    digitalOutputs: 16,
    analogInputs: 0,
    analogOutputs: 0,
    outputType: 'transistor-sink',
    inputRange: { start: '%I0.0', end: '%I0.15' },
    outputRange: { start: '%Q0.0', end: '%Q0.15' },
    ethernet: false,
    serial: true,
    canOpen: true,
    supplyVoltage: '24VDC',
    consumption24V: 250,
    consumption5V: 400,
    expansionSlots: 14,
    cartridgeSlots: 2,
    maxMemoryBits: 1024,
    maxMemoryWords: 8000,
    maxTimers: 255,
    maxCounters: 255,
    maxHSC: 8,
    maxPTO: 4,
    hardwareId: 1942,
  },
];

// Helper functions
export function getTM221Model(modelId: string): TM221Model | undefined {
  return TM221_MODELS.find(m => m.id === modelId || m.name === modelId);
}

export function getTM221ModelsByCategory(category: TM221Model['category']): TM221Model[] {
  return TM221_MODELS.filter(m => m.category === category);
}

export function getTM221ModelsByOutputType(outputType: TM221Model['outputType']): TM221Model[] {
  return TM221_MODELS.filter(m => m.outputType === outputType);
}

export function getModelsWithEthernet(): TM221Model[] {
  return TM221_MODELS.filter(m => m.ethernet);
}

export function getModelIOCount(modelId: string): { inputs: number; outputs: number } | undefined {
  const model = getTM221Model(modelId);
  if (!model) return undefined;
  return {
    inputs: model.digitalInputs,
    outputs: model.digitalOutputs,
  };
}

// For dropdown options in UI
export interface ModelOption {
  value: string;
  label: string;
  group: string;
  description: string;
}

export function getTM221ModelOptions(): ModelOption[] {
  const options: ModelOption[] = [];

  // Group by series
  const series16CE = TM221_MODELS.filter(m => m.id.includes('CE16'));
  const series24CE = TM221_MODELS.filter(m => m.id.includes('CE24'));
  const series40CE = TM221_MODELS.filter(m => m.id.includes('CE40'));
  const series16C = TM221_MODELS.filter(m => m.id.includes('C16') && !m.id.includes('CE16'));
  const series24C = TM221_MODELS.filter(m => m.id.includes('C24') && !m.id.includes('CE24'));
  const series40C = TM221_MODELS.filter(m => m.id.includes('C40') && !m.id.includes('CE40'));
  const seriesM = TM221_MODELS.filter(m => m.id.includes('M16') || m.id.includes('M32'));

  const addSeries = (models: TM221Model[], group: string) => {
    models.forEach(m => {
      options.push({
        value: m.id,
        label: `${m.name} (${m.digitalInputs} DI / ${m.digitalOutputs} DO)`,
        group,
        description: m.description,
      });
    });
  };

  addSeries(series16CE, 'Compact 16 I/O with Ethernet');
  addSeries(series24CE, 'Compact 24 I/O with Ethernet');
  addSeries(series40CE, 'Compact 40 I/O with Ethernet');
  addSeries(series16C, 'Compact 16 I/O (No Ethernet)');
  addSeries(series24C, 'Compact 24 I/O (No Ethernet)');
  addSeries(series40C, 'Compact 40 I/O (No Ethernet)');
  addSeries(seriesM, 'Book/Modular Format');

  return options;
}

// Output type suffix explanations
export const OUTPUT_TYPE_INFO = {
  'R': {
    name: 'Relay',
    description: 'Electromechanical relay outputs. Best for AC loads, higher current capacity (2A per point). Slower switching speed.',
    applications: ['AC motors', 'Solenoids', 'Heaters', 'Lights'],
  },
  'T': {
    name: 'Transistor Sink (NPN)',
    description: 'Solid-state transistor outputs, sinking current to 0V. Fast switching, long life. Use with PNP sensors.',
    applications: ['DC motors', 'LED indicators', 'High-speed applications', 'PWM control'],
  },
  'U': {
    name: 'Transistor Source (PNP)',
    description: 'Solid-state transistor outputs, sourcing current from 24V. Fast switching, long life. Use with NPN sensors.',
    applications: ['DC motors', 'LED indicators', 'High-speed applications', 'PWM control'],
  },
};

// Quick reference table
export const TM221_QUICK_REFERENCE = `
| Model         | DI  | DO  | AI | Ethernet | Output Type      |
|---------------|-----|-----|----| ---------|------------------|
| TM221CE16R    |  9  |  7  | 0  | Yes      | Relay            |
| TM221CE16T    |  9  |  7  | 0  | Yes      | Transistor Sink  |
| TM221CE16U    |  9  |  7  | 0  | Yes      | Transistor Source|
| TM221CE24R    | 14  | 10  | 0  | Yes      | Relay            |
| TM221CE24T    | 14  | 10  | 0  | Yes      | Transistor Sink  |
| TM221CE24U    | 14  | 10  | 0  | Yes      | Transistor Source|
| TM221CE40R    | 24  | 16  | 2  | Yes      | Relay            |
| TM221CE40T    | 24  | 16  | 2  | Yes      | Transistor Sink  |
| TM221CE40U    | 24  | 16  | 2  | Yes      | Transistor Source|
| TM221C16R     |  9  |  7  | 0  | No       | Relay            |
| TM221C16T     |  9  |  7  | 0  | No       | Transistor Sink  |
| TM221C16U     |  9  |  7  | 0  | No       | Transistor Source|
| TM221C24R     | 14  | 10  | 0  | No       | Relay            |
| TM221C24T     | 14  | 10  | 0  | No       | Transistor Sink  |
| TM221C24U     | 14  | 10  | 0  | No       | Transistor Source|
| TM221C40R     | 24  | 16  | 2  | No       | Relay            |
| TM221C40T     | 24  | 16  | 2  | No       | Transistor Sink  |
| TM221C40U     | 24  | 16  | 2  | No       | Transistor Source|
| TM221M16R     |  8  |  8  | 0  | No       | Relay            |
| TM221M16T     |  8  |  8  | 0  | No       | Transistor Sink  |
| TM221M32TK    | 16  | 16  | 0  | No       | Transistor Sink  |
`;
