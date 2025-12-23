// Comprehensive PLC Models Database
// Parent-Child relationship: Manufacturer > Series > Model

export interface PLCModel {
  id: string;
  name: string;
  partNumber?: string;
  specifications?: {
    memory?: string;
    io?: string;
    scanTime?: string;
    price?: string;
    [key: string]: string | undefined;
  };
}

export interface PLCSeries {
  id: string;
  name: string;
  description: string;
  software: string;
  models: PLCModel[];
}

export interface PLCManufacturer {
  id: string;
  name: string;
  logo?: string;
  series: PLCSeries[];
}

export const plcDatabase: PLCManufacturer[] = [
  {
    id: 'schneider',
    name: 'Schneider Electric',
    series: [
      {
        id: 'modicon-m221',
        name: 'Modicon M221',
        description: 'Compact logic controller for small machines',
        software: 'EcoStruxure Machine Expert Basic',
        models: [
          { id: 'm221-16io', name: 'TM221C16R', partNumber: 'TM221C16R', specifications: { io: '16 I/O', memory: '100 KB', price: '$200-400' } },
          { id: 'm221-24io', name: 'TM221C24R', partNumber: 'TM221C24R', specifications: { io: '24 I/O', memory: '100 KB', price: '$250-450' } },
          { id: 'm221-40io', name: 'TM221C40R', partNumber: 'TM221C40R', specifications: { io: '40 I/O', memory: '100 KB', price: '$300-500' } },
          { id: 'm221-16t', name: 'TM221C16T', partNumber: 'TM221C16T', specifications: { io: '16 I/O Transistor', memory: '100 KB', price: '$220-420' } },
          { id: 'm221-24t', name: 'TM221C24T', partNumber: 'TM221C24T', specifications: { io: '24 I/O Transistor', memory: '100 KB', price: '$270-470' } },
          { id: 'm221-40t', name: 'TM221C40T', partNumber: 'TM221C40T', specifications: { io: '40 I/O Transistor', memory: '100 KB', price: '$320-520' } },
        ],
      },
      {
        id: 'modicon-m241',
        name: 'Modicon M241',
        description: 'High-performance compact controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          { id: 'm241-24io', name: 'TM241C24R', partNumber: 'TM241C24R', specifications: { io: '24 I/O', memory: '100-256 KB', scanTime: '0.6 ms', price: '$400-600' } },
          { id: 'm241-40io', name: 'TM241C40R', partNumber: 'TM241C40R', specifications: { io: '40 I/O', memory: '100-256 KB', scanTime: '0.6 ms', price: '$500-700' } },
          { id: 'm241-24t', name: 'TM241C24T', partNumber: 'TM241C24T', specifications: { io: '24 I/O Transistor', memory: '100-256 KB', scanTime: '0.6 ms', price: '$420-620' } },
          { id: 'm241-40t', name: 'TM241C40T', partNumber: 'TM241C40T', specifications: { io: '40 I/O Transistor', memory: '100-256 KB', scanTime: '0.6 ms', price: '$520-720' } },
          { id: 'm241-eth', name: 'TM241CE24R', partNumber: 'TM241CE24R', specifications: { io: '24 I/O + Ethernet', memory: '100-256 KB', scanTime: '0.6 ms', price: '$450-650' } },
        ],
      },
      {
        id: 'modicon-m251',
        name: 'Modicon M251',
        description: 'Advanced compact logic controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          { id: 'm251-24io', name: 'TM251MESE', partNumber: 'TM251MESE', specifications: { io: '24 I/O', memory: '256 KB', scanTime: '0.4 ms', price: '$800-1000' } },
          { id: 'm251-40io', name: 'TM251MESC', partNumber: 'TM251MESC', specifications: { io: '40 I/O', memory: '256 KB', scanTime: '0.4 ms', price: '$900-1100' } },
          { id: 'm251-eth', name: 'TM251MESE-Ethernet', partNumber: 'TM251MESE', specifications: { io: 'Ethernet + Serial', memory: '256 KB', scanTime: '0.4 ms', price: '$850-1050' } },
        ],
      },
      {
        id: 'modicon-m258',
        name: 'Modicon M258',
        description: 'High-end compact controller with motion',
        software: 'EcoStruxure Machine Expert',
        models: [
          { id: 'm258-standard', name: 'TM258LF42DT4L', partNumber: 'TM258LF42DT4L', specifications: { io: '42 I/O', memory: '1 MB', scanTime: '0.2 ms', motion: '16 axes', price: '$1400-1800' } },
          { id: 'm258-safety', name: 'TM258LF42DS4LS', partNumber: 'TM258LF42DS4LS', specifications: { io: '42 I/O', memory: '1 MB', scanTime: '0.2 ms', safety: 'SIL 3', price: '$1800-2200' } },
          { id: 'm258-advanced', name: 'TM258LD42DT4L', partNumber: 'TM258LD42DT4L', specifications: { io: '42 I/O', memory: '1 MB', scanTime: '0.2 ms', motion: '16 axes', price: '$1500-1900' } },
        ],
      },
      {
        id: 'modicon-m262',
        name: 'Modicon M262',
        description: 'Modular motion controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          { id: 'm262-motion', name: 'TM262L10MESE8T', partNumber: 'TM262L10MESE8T', specifications: { memory: '10 MB', motion: '32 axes', io: 'Modular', price: '$2000-2500' } },
          { id: 'm262-advanced', name: 'TM262M15MESS8T', partNumber: 'TM262M15MESS8T', specifications: { memory: '15 MB', motion: '64 axes', io: 'Modular', price: '$2500-3000' } },
        ],
      },
      {
        id: 'modicon-m340',
        name: 'Modicon M340',
        description: 'Modular PLC for process and infrastructure',
        software: 'EcoStruxure Control Expert',
        models: [
          { id: 'm340-cpu-27', name: 'BMXP342020', partNumber: 'BMXP342020', specifications: { memory: '256 KB RAM', io: 'Max 1024 I/O', scanTime: '0.2 ms/K', price: '$1500-2000' } },
          { id: 'm340-cpu-30', name: 'BMXP3420302', partNumber: 'BMXP3420302', specifications: { memory: '1 MB RAM', io: 'Max 1024 I/O', scanTime: '0.15 ms/K', price: '$2000-2500' } },
          { id: 'm340-cpu-hot', name: 'BMXP342020H', partNumber: 'BMXP342020H', specifications: { memory: '256 KB RAM', hotStandby: 'Yes', io: 'Max 1024 I/O', price: '$2500-3000' } },
        ],
      },
      {
        id: 'modicon-m580',
        name: 'Modicon M580',
        description: 'Ethernet PAC for process control and safety',
        software: 'EcoStruxure Control Expert',
        models: [
          { id: 'm580-standard', name: 'BMEP582020', partNumber: 'BMEP582020', specifications: { memory: '2 MB RAM', ethernet: 'Dual', io: 'Max 3072 I/O', price: '$3000-4000' } },
          { id: 'm580-advanced', name: 'BMEP583020', partNumber: 'BMEP583020', specifications: { memory: '4 MB RAM', ethernet: 'Dual', io: 'Max 7168 I/O', price: '$4000-5000' } },
          { id: 'm580-safety', name: 'BMEP585040S', partNumber: 'BMEP585040S', specifications: { memory: '8 MB RAM', ethernet: 'Dual', safety: 'SIL 3', io: 'Max 7168 I/O', price: '$6000-8000' } },
          { id: 'm580-hot', name: 'BMEP582040H', partNumber: 'BMEP582040H', specifications: { memory: '4 MB RAM', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$5000-7000' } },
        ],
      },
    ],
  },
  {
    id: 'siemens',
    name: 'Siemens',
    series: [
      {
        id: 's7-1200',
        name: 'SIMATIC S7-1200',
        description: 'Compact controller for small to medium automation',
        software: 'TIA Portal',
        models: [
          { id: 's7-1211c', name: 'CPU 1211C', partNumber: '6ES7211-1AE40-0XB0', specifications: { memory: '50 KB', io: '14 DI/10 DO', scanTime: '0.1 μs/instruction', price: '$300-500' } },
          { id: 's7-1212c', name: 'CPU 1212C', partNumber: '6ES7212-1AE40-0XB0', specifications: { memory: '75 KB', io: '14 DI/10 DO/2 AI', scanTime: '0.1 μs/instruction', price: '$400-600' } },
          { id: 's7-1214c', name: 'CPU 1214C', partNumber: '6ES7214-1AG40-0XB0', specifications: { memory: '100 KB', io: '14 DI/10 DO/2 AI', scanTime: '0.1 μs/instruction', price: '$500-700' } },
          { id: 's7-1215c', name: 'CPU 1215C', partNumber: '6ES7215-1AG40-0XB0', specifications: { memory: '125 KB', io: '14 DI/10 DO/2 AI', scanTime: '0.1 μs/instruction', price: '$600-800' } },
          { id: 's7-1217c', name: 'CPU 1217C', partNumber: '6ES7217-1AG40-0XB0', specifications: { memory: '150 KB', io: '14 DI/10 DO/2 AI', scanTime: '0.1 μs/instruction', price: '$700-900' } },
        ],
      },
      {
        id: 's7-1500',
        name: 'SIMATIC S7-1500',
        description: 'Advanced modular controller for complex automation',
        software: 'TIA Portal',
        models: [
          { id: 's7-1511-1', name: 'CPU 1511-1 PN', partNumber: '6ES7511-1AK02-0AB0', specifications: { memory: '175 KB', io: 'Max 2048 I/O', scanTime: '1 ns/instruction', price: '$1500-2000' } },
          { id: 's7-1513-1', name: 'CPU 1513-1 PN', partNumber: '6ES7513-1AL02-0AB0', specifications: { memory: '300 KB', io: 'Max 4096 I/O', scanTime: '1 ns/instruction', price: '$2000-2500' } },
          { id: 's7-1515-2', name: 'CPU 1515-2 PN', partNumber: '6ES7515-2AM02-0AB0', specifications: { memory: '500 KB', io: 'Max 8192 I/O', scanTime: '1 ns/instruction', price: '$2500-3500' } },
          { id: 's7-1516-3', name: 'CPU 1516-3 PN/DP', partNumber: '6ES7516-3AN02-0AB0', specifications: { memory: '1 MB', io: 'Max 12672 I/O', scanTime: '1 ns/instruction', price: '$3500-4500' } },
          { id: 's7-1518-4', name: 'CPU 1518-4 PN/DP', partNumber: '6ES7518-4AP00-0AB0', specifications: { memory: '2 MB', io: 'Max 12672 I/O', scanTime: '1 ns/instruction', price: '$4500-6000' } },
        ],
      },
      {
        id: 's7-300',
        name: 'SIMATIC S7-300',
        description: 'Proven modular controller (legacy)',
        software: 'STEP 7',
        models: [
          { id: 's7-312', name: 'CPU 312', partNumber: '6ES7312-1AE14-0AB0', specifications: { memory: '32 KB', io: 'Max 1024 I/O', scanTime: '0.3 ms/K', price: '$800-1200' } },
          { id: 's7-314', name: 'CPU 314', partNumber: '6ES7314-1AG14-0AB0', specifications: { memory: '128 KB', io: 'Max 1024 I/O', scanTime: '0.3 ms/K', price: '$1000-1500' } },
          { id: 's7-315-2', name: 'CPU 315-2 PN/DP', partNumber: '6ES7315-2EH14-0AB0', specifications: { memory: '256 KB', io: 'Max 2048 I/O', scanTime: '0.3 ms/K', price: '$1500-2000' } },
          { id: 's7-317-2', name: 'CPU 317-2 PN/DP', partNumber: '6ES7317-2EK14-0AB0', specifications: { memory: '1 MB', io: 'Max 4096 I/O', scanTime: '0.3 ms/K', price: '$2000-2500' } },
        ],
      },
      {
        id: 's7-400',
        name: 'SIMATIC S7-400',
        description: 'High-end modular controller (legacy)',
        software: 'STEP 7',
        models: [
          { id: 's7-412', name: 'CPU 412-2', partNumber: '6ES7412-2XK07-0AB0', specifications: { memory: '512 KB', io: 'Max 12672 I/O', scanTime: '0.1 ms/K', price: '$3000-4000' } },
          { id: 's7-414', name: 'CPU 414-3', partNumber: '6ES7414-3XM07-0AB0', specifications: { memory: '1.4 MB', io: 'Max 12672 I/O', scanTime: '0.1 ms/K', price: '$4000-5000' } },
          { id: 's7-417', name: 'CPU 417-4', partNumber: '6ES7417-4XT07-0AB0', specifications: { memory: '20 MB', io: 'Max 12672 I/O', scanTime: '0.1 ms/K', price: '$6000-8000' } },
        ],
      },
    ],
  },
  {
    id: 'rockwell',
    name: 'Rockwell Automation / Allen-Bradley',
    series: [
      {
        id: 'controllogix-5580',
        name: 'ControlLogix 5580',
        description: 'High-performance PAC for large applications',
        software: 'Studio 5000 Logix Designer',
        models: [
          { id: '5580-l82e', name: '1756-L82E', partNumber: '1756-L82E', specifications: { memory: '10 MB', io: 'Max 128K I/O', performance: '20x faster', price: '$8000-12000' } },
          { id: '5580-l83e', name: '1756-L83E', partNumber: '1756-L83E', specifications: { memory: '20 MB', io: 'Max 128K I/O', performance: '20x faster', price: '$10000-15000' } },
          { id: '5580-l85e', name: '1756-L85E', partNumber: '1756-L85E', specifications: { memory: '40 MB', io: 'Max 128K I/O', performance: '20x faster', price: '$15000-20000' } },
        ],
      },
      {
        id: 'controllogix-5570',
        name: 'ControlLogix 5570',
        description: 'Standard ControlLogix controllers',
        software: 'Studio 5000 Logix Designer',
        models: [
          { id: '5570-l71', name: '1756-L71', partNumber: '1756-L71', specifications: { memory: '2 MB', io: 'Max 128K I/O', price: '$5000-7000' } },
          { id: '5570-l72', name: '1756-L72', partNumber: '1756-L72', specifications: { memory: '4 MB', io: 'Max 128K I/O', price: '$6000-8000' } },
          { id: '5570-l73', name: '1756-L73', partNumber: '1756-L73', specifications: { memory: '8 MB', io: 'Max 128K I/O', price: '$7000-9000' } },
          { id: '5570-l75', name: '1756-L75', partNumber: '1756-L75', specifications: { memory: '16 MB', io: 'Max 128K I/O', price: '$9000-12000' } },
        ],
      },
      {
        id: 'compactlogix-5380',
        name: 'CompactLogix 5380',
        description: 'High-performance compact controller',
        software: 'Studio 5000 Logix Designer',
        models: [
          { id: '5380-l310er', name: '5069-L310ER', partNumber: '5069-L310ER', specifications: { memory: '1 MB', io: 'Max 3072 I/O', motion: '32 axes', price: '$2000-3000' } },
          { id: '5380-l320er', name: '5069-L320ER', partNumber: '5069-L320ER', specifications: { memory: '3 MB', io: 'Max 3072 I/O', motion: '32 axes', price: '$3000-4000' } },
          { id: '5380-l330er', name: '5069-L330ER', partNumber: '5069-L330ER', specifications: { memory: '5 MB', io: 'Max 3072 I/O', motion: '32 axes', price: '$4000-5000' } },
          { id: '5380-l340er', name: '5069-L340ER', partNumber: '5069-L340ER', specifications: { memory: '10 MB', io: 'Max 3072 I/O', motion: '32 axes', price: '$5000-6000' } },
        ],
      },
      {
        id: 'compactlogix-5370',
        name: 'CompactLogix 5370',
        description: 'Standard compact controller (legacy)',
        software: 'Studio 5000 Logix Designer',
        models: [
          { id: '5370-l1', name: '1769-L16ER-BB1B', partNumber: '1769-L16ER-BB1B', specifications: { memory: '384 KB', io: 'Max 384 I/O', price: '$1500-2000' } },
          { id: '5370-l2', name: '1769-L18ER-BB1B', partNumber: '1769-L18ER-BB1B', specifications: { memory: '750 KB', io: 'Max 512 I/O', price: '$2000-2500' } },
          { id: '5370-l3', name: '1769-L33ER', partNumber: '1769-L33ER', specifications: { memory: '1.5 MB', io: 'Max 2048 I/O', price: '$3000-3500' } },
        ],
      },
      {
        id: 'micro800',
        name: 'Micro800',
        description: 'Compact controller for small machines',
        software: 'Connected Components Workbench',
        models: [
          { id: 'micro820', name: '2080-LC20-20QBB', partNumber: '2080-LC20-20QBB', specifications: { io: '20 I/O', memory: '64 KB', price: '$200-400' } },
          { id: 'micro850', name: '2080-LC50-48QBB', partNumber: '2080-LC50-48QBB', specifications: { io: '48 I/O', memory: '256 KB', price: '$400-600' } },
          { id: 'micro870', name: '2080-LC70-24QBB', partNumber: '2080-LC70-24QBB', specifications: { io: '100 I/O', memory: '512 KB', price: '$600-800' } },
        ],
      },
    ],
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi Electric',
    series: [
      {
        id: 'fx5u',
        name: 'MELSEC iQ-F FX5U',
        description: 'Next-generation compact PLC',
        software: 'GX Works3',
        models: [
          { id: 'fx5u-32m', name: 'FX5U-32MT/ES', partNumber: 'FX5U-32MT/ES', specifications: { io: '32 I/O', memory: '128 KB', scanTime: '0.04 μs', price: '$400-600' } },
          { id: 'fx5u-64m', name: 'FX5U-64MT/ES', partNumber: 'FX5U-64MT/ES', specifications: { io: '64 I/O', memory: '256 KB', scanTime: '0.04 μs', price: '$600-800' } },
          { id: 'fx5u-80m', name: 'FX5U-80MT/ES', partNumber: 'FX5U-80MT/ES', specifications: { io: '80 I/O', memory: '384 KB', scanTime: '0.04 μs', price: '$700-900' } },
        ],
      },
      {
        id: 'fx3u',
        name: 'MELSEC-F FX3U',
        description: 'Standard compact PLC',
        software: 'GX Works2',
        models: [
          { id: 'fx3u-16m', name: 'FX3U-16MT/ES', partNumber: 'FX3U-16MT/ES', specifications: { io: '16 I/O', memory: '64 KB', price: '$300-500' } },
          { id: 'fx3u-32m', name: 'FX3U-32MT/ES', partNumber: 'FX3U-32MT/ES', specifications: { io: '32 I/O', memory: '64 KB', price: '$400-600' } },
          { id: 'fx3u-64m', name: 'FX3U-64MT/ES', partNumber: 'FX3U-64MT/ES', specifications: { io: '64 I/O', memory: '128 KB', price: '$500-700' } },
          { id: 'fx3u-128m', name: 'FX3U-128MT/ES', partNumber: 'FX3U-128MT/ES', specifications: { io: '128 I/O', memory: '256 KB', price: '$700-900' } },
        ],
      },
      {
        id: 'iq-r',
        name: 'MELSEC iQ-R Series',
        description: 'Advanced modular controller',
        software: 'GX Works3',
        models: [
          { id: 'r04cpu', name: 'R04CPU', partNumber: 'R04CPU', specifications: { memory: '80 KB', io: 'Max 8192 I/O', scanTime: '0.98 ns', price: '$2000-3000' } },
          { id: 'r08cpu', name: 'R08CPU', partNumber: 'R08CPU', specifications: { memory: '160 KB', io: 'Max 8192 I/O', scanTime: '0.98 ns', price: '$3000-4000' } },
          { id: 'r16cpu', name: 'R16CPU', partNumber: 'R16CPU', specifications: { memory: '320 KB', io: 'Max 8192 I/O', scanTime: '0.98 ns', price: '$4000-5000' } },
          { id: 'r32cpu', name: 'R32CPU', partNumber: 'R32CPU', specifications: { memory: '1.2 MB', io: 'Max 8192 I/O', scanTime: '0.98 ns', price: '$5000-6000' } },
          { id: 'r120cpu', name: 'R120CPU', partNumber: 'R120CPU', specifications: { memory: '10 MB', io: 'Max 8192 I/O', scanTime: '0.98 ns', price: '$8000-10000' } },
        ],
      },
      {
        id: 'q-series',
        name: 'MELSEC-Q Series',
        description: 'Proven modular controller',
        software: 'GX Works2',
        models: [
          { id: 'q03ud', name: 'Q03UDVCPU', partNumber: 'Q03UDVCPU', specifications: { memory: '124 KB', io: 'Max 4096 I/O', price: '$1500-2000' } },
          { id: 'q04ud', name: 'Q04UDVCPU', partNumber: 'Q04UDVCPU', specifications: { memory: '250 KB', io: 'Max 4096 I/O', price: '$2000-2500' } },
          { id: 'q06ud', name: 'Q06UDVCPU', partNumber: 'Q06UDVCPU', specifications: { memory: '500 KB', io: 'Max 8192 I/O', price: '$2500-3000' } },
          { id: 'q13ud', name: 'Q13UDVCPU', partNumber: 'Q13UDVCPU', specifications: { memory: '1.3 MB', io: 'Max 8192 I/O', price: '$3000-4000' } },
        ],
      },
      {
        id: 'l-series',
        name: 'MELSEC-L Series',
        description: 'High-performance for mid-range applications',
        software: 'GX Works2',
        models: [
          { id: 'l02cpu', name: 'L02CPU', partNumber: 'L02CPU', specifications: { memory: '40 KB', io: 'Max 2048 I/O', price: '$800-1200' } },
          { id: 'l06cpu', name: 'L06CPU', partNumber: 'L06CPU', specifications: { memory: '120 KB', io: 'Max 4096 I/O', price: '$1200-1600' } },
          { id: 'l26cpu', name: 'L26CPU', partNumber: 'L26CPU', specifications: { memory: '250 KB', io: 'Max 8192 I/O', price: '$1600-2000' } },
        ],
      },
    ],
  },
  {
    id: 'codesys',
    name: 'CODESYS (500+ Brands)',
    series: [
      {
        id: 'wago',
        name: 'WAGO PFC Controllers',
        description: 'CODESYS-based compact controllers',
        software: 'CODESYS V3',
        models: [
          { id: 'pfc100', name: '750-8100', partNumber: '750-8100', specifications: { memory: '256 MB RAM', io: 'Modular', price: '$400-600' } },
          { id: 'pfc200', name: '750-8202', partNumber: '750-8202', specifications: { memory: '512 MB RAM', io: 'Modular', ethernet: '2 ports', price: '$600-800' } },
        ],
      },
      {
        id: 'beckhoff',
        name: 'Beckhoff CX Controllers',
        description: 'Industrial PC with CODESYS',
        software: 'TwinCAT 3',
        models: [
          { id: 'cx5020', name: 'CX5020', partNumber: 'CX5020-0120', specifications: { cpu: 'ARM Cortex-A8', memory: '1 GB', price: '$800-1200' } },
          { id: 'cx5140', name: 'CX5140', partNumber: 'CX5140-0125', specifications: { cpu: 'Intel Atom', memory: '4 GB', price: '$1500-2000' } },
        ],
      },
      {
        id: 'abb',
        name: 'ABB AC500 PLCs',
        description: 'Modular CODESYS PLC',
        software: 'CODESYS V3',
        models: [
          { id: 'ac500-pm554', name: 'PM554-TP', partNumber: 'PM554-TP', specifications: { memory: '256 KB', io: 'Modular', price: '$500-700' } },
          { id: 'ac500-pm564', name: 'PM564-TP', partNumber: 'PM564-TP', specifications: { memory: '512 KB', io: 'Modular', price: '$700-900' } },
        ],
      },
      {
        id: 'eaton',
        name: 'Eaton XC Controllers',
        description: 'CODESYS-based controllers',
        software: 'CODESYS V3',
        models: [
          { id: 'xc100', name: 'XC-CPU101', partNumber: 'XC-CPU101', specifications: { memory: '64 KB', io: 'Max 512 I/O', price: '$300-500' } },
          { id: 'xc200', name: 'XC-CPU201', partNumber: 'XC-CPU201', specifications: { memory: '256 KB', io: 'Max 2048 I/O', price: '$600-800' } },
        ],
      },
    ],
  },
];

// Helper functions
export function getManufacturer(manufacturerId: string): PLCManufacturer | undefined {
  return plcDatabase.find(m => m.id === manufacturerId);
}

export function getSeries(manufacturerId: string, seriesId: string): PLCSeries | undefined {
  const manufacturer = getManufacturer(manufacturerId);
  return manufacturer?.series.find(s => s.id === seriesId);
}

export function getModel(manufacturerId: string, seriesId: string, modelId: string): PLCModel | undefined {
  const series = getSeries(manufacturerId, seriesId);
  return series?.models.find(m => m.id === modelId);
}

export function getAllManufacturers(): PLCManufacturer[] {
  return plcDatabase;
}

export function searchModels(query: string): Array<{
  manufacturer: PLCManufacturer;
  series: PLCSeries;
  model: PLCModel;
}> {
  const results: Array<{
    manufacturer: PLCManufacturer;
    series: PLCSeries;
    model: PLCModel;
  }> = [];

  const lowerQuery = query.toLowerCase();

  plcDatabase.forEach(manufacturer => {
    manufacturer.series.forEach(series => {
      series.models.forEach(model => {
        if (
          model.name.toLowerCase().includes(lowerQuery) ||
          model.partNumber?.toLowerCase().includes(lowerQuery) ||
          series.name.toLowerCase().includes(lowerQuery) ||
          manufacturer.name.toLowerCase().includes(lowerQuery)
        ) {
          results.push({ manufacturer, series, model });
        }
      });
    });
  });

  return results;
}
