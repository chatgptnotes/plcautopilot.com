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
          // TM221C Series - Compact without Ethernet
          { id: 'm221-c16r', name: 'TM221C16R', partNumber: 'TM221C16R', specifications: { io: '9DI+7DO Relay', memory: '100 KB', comm: 'Serial', price: '$200-400' } },
          { id: 'm221-c16t', name: 'TM221C16T', partNumber: 'TM221C16T', specifications: { io: '9DI+7DO Transistor NPN', memory: '100 KB', comm: 'Serial', price: '$220-420' } },
          { id: 'm221-c16u', name: 'TM221C16U', partNumber: 'TM221C16U', specifications: { io: '9DI+7DO Transistor PNP', memory: '100 KB', comm: 'Serial', price: '$230-430' } },
          { id: 'm221-c24r', name: 'TM221C24R', partNumber: 'TM221C24R', specifications: { io: '14DI+10DO Relay', memory: '100 KB', comm: 'Serial', price: '$250-450' } },
          { id: 'm221-c24t', name: 'TM221C24T', partNumber: 'TM221C24T', specifications: { io: '14DI+10DO Transistor NPN', memory: '100 KB', comm: 'Serial', price: '$270-470' } },
          { id: 'm221-c24u', name: 'TM221C24U', partNumber: 'TM221C24U', specifications: { io: '14DI+10DO Transistor PNP', memory: '100 KB', comm: 'Serial', price: '$280-480' } },
          { id: 'm221-c40r', name: 'TM221C40R', partNumber: 'TM221C40R', specifications: { io: '24DI+16DO Relay', memory: '100 KB', comm: 'Serial', price: '$300-500' } },
          { id: 'm221-c40t', name: 'TM221C40T', partNumber: 'TM221C40T', specifications: { io: '24DI+16DO Transistor NPN', memory: '100 KB', comm: 'Serial', price: '$320-520' } },
          { id: 'm221-c40u', name: 'TM221C40U', partNumber: 'TM221C40U', specifications: { io: '24DI+16DO Transistor PNP', memory: '100 KB', comm: 'Serial', price: '$330-530' } },

          // TM221CE Series - Compact with Ethernet
          { id: 'm221-ce16r', name: 'TM221CE16R', partNumber: 'TM221CE16R', specifications: { io: '9DI+7DO Relay', memory: '100 KB', comm: 'Ethernet+Serial', price: '$350-550' } },
          { id: 'm221-ce16t', name: 'TM221CE16T', partNumber: 'TM221CE16T', specifications: { io: '9DI+7DO Transistor NPN', memory: '100 KB', comm: 'Ethernet+Serial', price: '$370-570' } },
          { id: 'm221-ce16u', name: 'TM221CE16U', partNumber: 'TM221CE16U', specifications: { io: '9DI+7DO Transistor PNP', memory: '100 KB', comm: 'Ethernet+Serial', price: '$380-580' } },
          { id: 'm221-ce24r', name: 'TM221CE24R', partNumber: 'TM221CE24R', specifications: { io: '14DI+10DO Relay', memory: '100 KB', comm: 'Ethernet+Serial', price: '$400-600' } },
          { id: 'm221-ce24t', name: 'TM221CE24T', partNumber: 'TM221CE24T', specifications: { io: '14DI+10DO Transistor NPN', memory: '100 KB', comm: 'Ethernet+Serial', price: '$420-620' } },
          { id: 'm221-ce24u', name: 'TM221CE24U', partNumber: 'TM221CE24U', specifications: { io: '14DI+10DO Transistor PNP', memory: '100 KB', comm: 'Ethernet+Serial', price: '$430-630' } },
          { id: 'm221-ce40r', name: 'TM221CE40R', partNumber: 'TM221CE40R', specifications: { io: '24DI+16DO Relay', memory: '100 KB', comm: 'Ethernet+Serial', price: '$450-650' } },
          { id: 'm221-ce40t', name: 'TM221CE40T', partNumber: 'TM221CE40T', specifications: { io: '24DI+16DO Transistor NPN', memory: '100 KB', comm: 'Ethernet+Serial', price: '$470-670' } },
          { id: 'm221-ce40u', name: 'TM221CE40U', partNumber: 'TM221CE40U', specifications: { io: '24DI+16DO Transistor PNP', memory: '100 KB', comm: 'Ethernet+Serial', price: '$480-680' } },

          // TM221M Series - Modular with Expansion
          { id: 'm221-m16r', name: 'TM221M16R', partNumber: 'TM221M16R', specifications: { io: '9DI+7DO Relay + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Serial', price: '$280-480' } },
          { id: 'm221-m16rg', name: 'TM221M16RG', partNumber: 'TM221M16RG', specifications: { io: '9DI+7DO Relay + Spring', memory: '100 KB', expansion: '7 modules', comm: 'Serial', price: '$290-490' } },
          { id: 'm221-m16t', name: 'TM221M16T', partNumber: 'TM221M16T', specifications: { io: '9DI+7DO Transistor NPN + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Serial', price: '$300-500' } },
          { id: 'm221-m16tg', name: 'TM221M16TG', partNumber: 'TM221M16TG', specifications: { io: '9DI+7DO Transistor NPN + Spring', memory: '100 KB', expansion: '7 modules', comm: 'Serial', price: '$310-510' } },
          { id: 'm221-m32tx', name: 'TM221M32TK', partNumber: 'TM221M32TK', specifications: { io: '18DI+14DO Transistor + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Serial', price: '$400-600' } },

          // TM221ME Series - Modular with Ethernet
          { id: 'm221-me16r', name: 'TM221ME16R', partNumber: 'TM221ME16R', specifications: { io: '9DI+7DO Relay + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Ethernet+Serial', price: '$430-630' } },
          { id: 'm221-me16rg', name: 'TM221ME16RG', partNumber: 'TM221ME16RG', specifications: { io: '9DI+7DO Relay + Spring', memory: '100 KB', expansion: '7 modules', comm: 'Ethernet+Serial', price: '$440-640' } },
          { id: 'm221-me16t', name: 'TM221ME16T', partNumber: 'TM221ME16T', specifications: { io: '9DI+7DO Transistor NPN + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Ethernet+Serial', price: '$450-650' } },
          { id: 'm221-me16tg', name: 'TM221ME16TG', partNumber: 'TM221ME16TG', specifications: { io: '9DI+7DO Transistor NPN + Spring', memory: '100 KB', expansion: '7 modules', comm: 'Ethernet+Serial', price: '$460-660' } },
          { id: 'm221-me32tk', name: 'TM221ME32TK', partNumber: 'TM221ME32TK', specifications: { io: '18DI+14DO Transistor + Expansion', memory: '100 KB', expansion: '7 modules', comm: 'Ethernet+Serial', price: '$550-750' } },
        ],
      },
      {
        id: 'modicon-m241',
        name: 'Modicon M241',
        description: 'High-performance compact controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          // TM241C Series - Compact
          { id: 'm241-c24r', name: 'TM241C24R', partNumber: 'TM241C24R', specifications: { io: '14DI+10DO Relay', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$400-600' } },
          { id: 'm241-c24t', name: 'TM241C24T', partNumber: 'TM241C24T', specifications: { io: '14DI+10DO Transistor', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$420-620' } },
          { id: 'm241-c24u', name: 'TM241C24U', partNumber: 'TM241C24U', specifications: { io: '14DI+10DO Transistor PNP', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$430-630' } },
          { id: 'm241-c40r', name: 'TM241C40R', partNumber: 'TM241C40R', specifications: { io: '24DI+16DO Relay', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$500-700' } },
          { id: 'm241-c40t', name: 'TM241C40T', partNumber: 'TM241C40T', specifications: { io: '24DI+16DO Transistor', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$520-720' } },
          { id: 'm241-c40u', name: 'TM241C40U', partNumber: 'TM241C40U', specifications: { io: '24DI+16DO Transistor PNP', memory: '256 KB', scanTime: '0.6 ms', comm: 'CANopen', price: '$530-730' } },

          // TM241CE Series - With Ethernet
          { id: 'm241-ce24r', name: 'TM241CE24R', partNumber: 'TM241CE24R', specifications: { io: '14DI+10DO Relay', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$550-750' } },
          { id: 'm241-ce24t', name: 'TM241CE24T', partNumber: 'TM241CE24T', specifications: { io: '14DI+10DO Transistor', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$570-770' } },
          { id: 'm241-ce24u', name: 'TM241CE24U', partNumber: 'TM241CE24U', specifications: { io: '14DI+10DO Transistor PNP', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$580-780' } },
          { id: 'm241-ce40r', name: 'TM241CE40R', partNumber: 'TM241CE40R', specifications: { io: '24DI+16DO Relay', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$650-850' } },
          { id: 'm241-ce40t', name: 'TM241CE40T', partNumber: 'TM241CE40T', specifications: { io: '24DI+16DO Transistor', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$670-870' } },
          { id: 'm241-ce40u', name: 'TM241CE40U', partNumber: 'TM241CE40U', specifications: { io: '24DI+16DO Transistor PNP', memory: '256 KB', scanTime: '0.6 ms', comm: 'Ethernet+CANopen', price: '$680-880' } },

          // TM241CEC Series - With 2x Ethernet ports
          { id: 'm241-cec24t', name: 'TM241CEC24T', partNumber: 'TM241CEC24T', specifications: { io: '14DI+10DO Transistor', memory: '256 KB', scanTime: '0.6 ms', comm: '2x Ethernet+CANopen', price: '$620-820' } },
          { id: 'm241-cec24u', name: 'TM241CEC24U', partNumber: 'TM241CEC24U', specifications: { io: '14DI+10DO Transistor PNP', memory: '256 KB', scanTime: '0.6 ms', comm: '2x Ethernet+CANopen', price: '$630-830' } },
        ],
      },
      {
        id: 'modicon-m251',
        name: 'Modicon M251',
        description: 'Advanced compact logic controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          // TM251M Series - Compact Logic Controllers
          { id: 'm251-mese', name: 'TM251MESE', partNumber: 'TM251MESE', specifications: { io: '14DI+10DO', memory: '256 KB', comm: 'Ethernet+Serial', canopen: 'Yes', price: '$800-1000' } },
          { id: 'm251-mesc', name: 'TM251MESC', partNumber: 'TM251MESC', specifications: { io: '24DI+16DO', memory: '256 KB', comm: 'Ethernet+Serial+CANopen', canopen: 'Yes', price: '$900-1100' } },

          // TM251MEC Series - With Motion and CANopen
          { id: 'm251-mec5e', name: 'TM251MEC5E', partNumber: 'TM251MEC5E', specifications: { io: '14DI+10DO', memory: '256 KB', motion: '5 axes', comm: 'Ethernet+Serial+CANopen', price: '$1200-1400' } },
          { id: 'm251-mec10e', name: 'TM251MEC10E', partNumber: 'TM251MEC10E', specifications: { io: '14DI+10DO', memory: '256 KB', motion: '10 axes', comm: 'Ethernet+Serial+CANopen', price: '$1400-1600' } },

          // TM251MESE and MESC variants with different I/O configs
          { id: 'm251-mese8t', name: 'TM251MESE8T', partNumber: 'TM251MESE8T', specifications: { io: '8DI+8DO Transistor', memory: '256 KB', comm: 'Ethernet+Serial', price: '$750-950' } },
          { id: 'm251-mese16t', name: 'TM251MESE16T', partNumber: 'TM251MESE16T', specifications: { io: '16DI+16DO Transistor', memory: '256 KB', comm: 'Ethernet+Serial', price: '$850-1050' } },

          // TM251MESC variants with CANopen
          { id: 'm251-mesc16t', name: 'TM251MESC16T', partNumber: 'TM251MESC16T', specifications: { io: '16DI+16DO Transistor', memory: '256 KB', comm: 'Ethernet+Serial+CANopen', price: '$950-1150' } },
          { id: 'm251-mesc24t', name: 'TM251MESC24T', partNumber: 'TM251MESC24T', specifications: { io: '24DI+24DO Transistor', memory: '256 KB', comm: 'Ethernet+Serial+CANopen', price: '$1000-1200' } },
        ],
      },
      {
        id: 'modicon-m258',
        name: 'Modicon M258',
        description: 'High-end compact controller with motion',
        software: 'EcoStruxure Machine Expert',
        models: [
          // TM258LF Series - High Performance Motion Controllers
          { id: 'm258-lf42dt4l', name: 'TM258LF42DT4L', partNumber: 'TM258LF42DT4L', specifications: { io: '42 I/O', memory: '1 MB', motion: '16 axes', comm: 'Ethernet+CANopen', price: '$1400-1800' } },
          { id: 'm258-lf66dt4l', name: 'TM258LF66DT4L', partNumber: 'TM258LF66DT4L', specifications: { io: '66 I/O', memory: '1 MB', motion: '16 axes', comm: 'Ethernet+CANopen', price: '$1600-2000' } },

          // TM258LD Series - Standard Motion Controllers
          { id: 'm258-ld42dt4l', name: 'TM258LD42DT4L', partNumber: 'TM258LD42DT4L', specifications: { io: '42 I/O', memory: '1 MB', motion: '12 axes', comm: 'Ethernet+CANopen', price: '$1300-1700' } },
          { id: 'm258-ld66dt4l', name: 'TM258LD66DT4L', partNumber: 'TM258LD66DT4L', specifications: { io: '66 I/O', memory: '1 MB', motion: '12 axes', comm: 'Ethernet+CANopen', price: '$1500-1900' } },

          // TM258LF/LD with Safety (SIL 3)
          { id: 'm258-lf42ds4ls', name: 'TM258LF42DS4LS', partNumber: 'TM258LF42DS4LS', specifications: { io: '42 I/O', memory: '1 MB', motion: '16 axes', safety: 'SIL 3', comm: 'Ethernet+CANopen', price: '$1800-2200' } },
          { id: 'm258-lf66ds4ls', name: 'TM258LF66DS4LS', partNumber: 'TM258LF66DS4LS', specifications: { io: '66 I/O', memory: '1 MB', motion: '16 axes', safety: 'SIL 3', comm: 'Ethernet+CANopen', price: '$2000-2400' } },
          { id: 'm258-ld42ds4ls', name: 'TM258LD42DS4LS', partNumber: 'TM258LD42DS4LS', specifications: { io: '42 I/O', memory: '1 MB', motion: '12 axes', safety: 'SIL 3', comm: 'Ethernet+CANopen', price: '$1700-2100' } },
          { id: 'm258-ld66ds4ls', name: 'TM258LD66DS4LS', partNumber: 'TM258LD66DS4LS', specifications: { io: '66 I/O', memory: '1 MB', motion: '12 axes', safety: 'SIL 3', comm: 'Ethernet+CANopen', price: '$1900-2300' } },

          // TM258LF/LD Compact versions
          { id: 'm258-lf10c4dt', name: 'TM258LF10C4DT', partNumber: 'TM258LF10C4DT', specifications: { io: '10 I/O Compact', memory: '1 MB', motion: '16 axes', comm: 'Ethernet+CANopen', price: '$1200-1600' } },
          { id: 'm258-ld10c4dt', name: 'TM258LD10C4DT', partNumber: 'TM258LD10C4DT', specifications: { io: '10 I/O Compact', memory: '1 MB', motion: '12 axes', comm: 'Ethernet+CANopen', price: '$1100-1500' } },
        ],
      },
      {
        id: 'modicon-m262',
        name: 'Modicon M262',
        description: 'Modular motion controller',
        software: 'EcoStruxure Machine Expert',
        models: [
          // TM262L Series - Logic & Motion Controllers (10 MB)
          { id: 'm262-l10mese8t', name: 'TM262L10MESE8T', partNumber: 'TM262L10MESE8T', specifications: { memory: '10 MB', motion: '32 axes', io: 'Modular', comm: 'Ethernet+Serial+CANopen', price: '$2000-2500' } },
          { id: 'm262-l10mes48t', name: 'TM262L10MES48T', partNumber: 'TM262L10MES48T', specifications: { memory: '10 MB', motion: '32 axes', io: '48 I/O Modular', comm: 'Ethernet+Serial+CANopen', price: '$2200-2700' } },

          // TM262M Series - Medium Performance (15 MB)
          { id: 'm262-m15mess8t', name: 'TM262M15MESS8T', partNumber: 'TM262M15MESS8T', specifications: { memory: '15 MB', motion: '64 axes', io: 'Modular', comm: 'Ethernet+Serial+CANopen', price: '$2500-3000' } },
          { id: 'm262-m15mes48t', name: 'TM262M15MES48T', partNumber: 'TM262M15MES48T', specifications: { memory: '15 MB', motion: '64 axes', io: '48 I/O Modular', comm: 'Ethernet+Serial+CANopen', price: '$2700-3200' } },

          // TM262H Series - High Performance (20 MB)
          { id: 'm262-h20mess8t', name: 'TM262H20MESS8T', partNumber: 'TM262H20MESS8T', specifications: { memory: '20 MB', motion: '128 axes', io: 'Modular', comm: 'Ethernet+Serial+CANopen', price: '$3000-3500' } },
          { id: 'm262-h20mes48t', name: 'TM262H20MES48T', partNumber: 'TM262H20MES48T', specifications: { memory: '20 MB', motion: '128 axes', io: '48 I/O Modular', comm: 'Ethernet+Serial+CANopen', price: '$3200-3700' } },

          // TM262 with Safety (SIL 3)
          { id: 'm262-l10meses8t', name: 'TM262L10MESES8T', partNumber: 'TM262L10MESES8T', specifications: { memory: '10 MB', motion: '32 axes', safety: 'SIL 3', io: 'Modular', comm: 'Ethernet+Serial+CANopen', price: '$2500-3000' } },
          { id: 'm262-m15meses8t', name: 'TM262M15MESES8T', partNumber: 'TM262M15MESES8T', specifications: { memory: '15 MB', motion: '64 axes', safety: 'SIL 3', io: 'Modular', comm: 'Ethernet+Serial+CANopen', price: '$3000-3500' } },
        ],
      },
      {
        id: 'modicon-m340',
        name: 'Modicon M340',
        description: 'Modular PLC for process and infrastructure',
        software: 'EcoStruxure Control Expert',
        models: [
          // BMXP341000 Series - Entry Level
          { id: 'm340-p341000', name: 'BMXP341000', partNumber: 'BMXP341000', specifications: { memory: '64 KB RAM + 128 KB FLASH', io: 'Max 256 I/O', scanTime: '0.2 ms/K', comm: 'RS-232/485', price: '$1000-1400' } },
          { id: 'm340-p3415200', name: 'BMXP3415200', partNumber: 'BMXP3415200', specifications: { memory: '128 KB RAM + 256 KB FLASH', io: 'Max 512 I/O', scanTime: '0.2 ms/K', comm: 'RS-232/485', price: '$1200-1600' } },

          // BMXP342000 Series - Standard Performance
          { id: 'm340-p342000', name: 'BMXP342000', partNumber: 'BMXP342000', specifications: { memory: '128 KB RAM + 256 KB FLASH', io: 'Max 1024 I/O', scanTime: '0.2 ms/K', comm: 'Ethernet', price: '$1400-1800' } },
          { id: 'm340-p342020', name: 'BMXP342020', partNumber: 'BMXP342020', specifications: { memory: '256 KB RAM + 512 KB FLASH', io: 'Max 1024 I/O', scanTime: '0.2 ms/K', comm: 'Ethernet', price: '$1500-2000' } },
          { id: 'm340-p3420302', name: 'BMXP3420302', partNumber: 'BMXP3420302', specifications: { memory: '1 MB RAM + 4 MB FLASH', io: 'Max 1024 I/O', scanTime: '0.15 ms/K', comm: 'Ethernet', price: '$2000-2500' } },

          // BMXP3420302H Series - Hot Standby
          { id: 'm340-p342020h', name: 'BMXP342020H', partNumber: 'BMXP342020H', specifications: { memory: '256 KB RAM + 512 KB FLASH', hotStandby: 'Yes', io: 'Max 1024 I/O', scanTime: '0.2 ms/K', price: '$2500-3000' } },
          { id: 'm340-p3420302h', name: 'BMXP3420302H', partNumber: 'BMXP3420302H', specifications: { memory: '1 MB RAM + 4 MB FLASH', hotStandby: 'Yes', io: 'Max 1024 I/O', scanTime: '0.15 ms/K', price: '$3000-3500' } },

          // BMXP342030 Series - High Performance
          { id: 'm340-p342030', name: 'BMXP342030', partNumber: 'BMXP342030', specifications: { memory: '2 MB RAM + 8 MB FLASH', io: 'Max 1024 I/O', scanTime: '0.12 ms/K', comm: 'Ethernet', price: '$2500-3000' } },
          { id: 'm340-p342030h', name: 'BMXP342030H', partNumber: 'BMXP342030H', specifications: { memory: '2 MB RAM + 8 MB FLASH', hotStandby: 'Yes', io: 'Max 1024 I/O', scanTime: '0.12 ms/K', price: '$3500-4000' } },

          // Legacy Models
          { id: 'm340-p3415020', name: 'BMXP3415020', partNumber: 'BMXP3415020', specifications: { memory: '160 KB RAM + 384 KB FLASH', io: 'Max 512 I/O', scanTime: '0.2 ms/K', comm: 'Ethernet', price: '$1300-1700' } },
        ],
      },
      {
        id: 'modicon-m580',
        name: 'Modicon M580',
        description: 'Ethernet PAC for process control and safety',
        software: 'EcoStruxure Control Expert',
        models: [
          // BMEP58 Series - Standard Performance CPUs
          { id: 'm580-ep582010', name: 'BMEP582010', partNumber: 'BMEP582010', specifications: { memory: '1 MB RAM + 16 MB FLASH', ethernet: 'Dual', io: 'Max 3072 I/O', scanTime: '0.04 ms/K', price: '$2500-3500' } },
          { id: 'm580-ep582020', name: 'BMEP582020', partNumber: 'BMEP582020', specifications: { memory: '2 MB RAM + 32 MB FLASH', ethernet: 'Dual', io: 'Max 3072 I/O', scanTime: '0.04 ms/K', price: '$3000-4000' } },
          { id: 'm580-ep582040', name: 'BMEP582040', partNumber: 'BMEP582040', specifications: { memory: '4 MB RAM + 64 MB FLASH', ethernet: 'Dual', io: 'Max 7168 I/O', scanTime: '0.04 ms/K', price: '$3500-4500' } },

          // BMEP58 Hot Standby CPUs
          { id: 'm580-ep582010h', name: 'BMEP582010H', partNumber: 'BMEP582010H', specifications: { memory: '1 MB RAM + 16 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 3072 I/O', price: '$4000-5000' } },
          { id: 'm580-ep582020h', name: 'BMEP582020H', partNumber: 'BMEP582020H', specifications: { memory: '2 MB RAM + 32 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 3072 I/O', price: '$4500-5500' } },
          { id: 'm580-ep582040h', name: 'BMEP582040H', partNumber: 'BMEP582040H', specifications: { memory: '4 MB RAM + 64 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$5000-7000' } },

          // BMEP583 Series - Advanced Performance
          { id: 'm580-ep583020', name: 'BMEP583020', partNumber: 'BMEP583020', specifications: { memory: '4 MB RAM + 64 MB FLASH', ethernet: 'Dual', io: 'Max 7168 I/O', scanTime: '0.03 ms/K', price: '$4000-5000' } },
          { id: 'm580-ep583040', name: 'BMEP583040', partNumber: 'BMEP583040', specifications: { memory: '8 MB RAM + 128 MB FLASH', ethernet: 'Dual', io: 'Max 7168 I/O', scanTime: '0.03 ms/K', price: '$4500-5500' } },

          // BMEP583 Hot Standby CPUs
          { id: 'm580-ep583020h', name: 'BMEP583020H', partNumber: 'BMEP583020H', specifications: { memory: '4 MB RAM + 64 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$5500-6500' } },
          { id: 'm580-ep583040h', name: 'BMEP583040H', partNumber: 'BMEP583040H', specifications: { memory: '8 MB RAM + 128 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$6000-7000' } },

          // BMEP585 Series - Safety CPUs (SIL 3)
          { id: 'm580-ep585040s', name: 'BMEP585040S', partNumber: 'BMEP585040S', specifications: { memory: '8 MB RAM + 128 MB FLASH', ethernet: 'Dual', safety: 'SIL 3', io: 'Max 7168 I/O', price: '$6000-8000' } },
          { id: 'm580-ep585040hs', name: 'BMEP585040HS', partNumber: 'BMEP585040HS', specifications: { memory: '8 MB RAM + 128 MB FLASH', ethernet: 'Dual', safety: 'SIL 3', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$8000-10000' } },

          // BMEP586 Series - High Performance
          { id: 'm580-ep586040', name: 'BMEP586040', partNumber: 'BMEP586040', specifications: { memory: '16 MB RAM + 256 MB FLASH', ethernet: 'Dual', io: 'Max 7168 I/O', scanTime: '0.02 ms/K', price: '$5000-6000' } },
          { id: 'm580-ep586040h', name: 'BMEP586040H', partNumber: 'BMEP586040H', specifications: { memory: '16 MB RAM + 256 MB FLASH', ethernet: 'Dual', hotStandby: 'Yes', io: 'Max 7168 I/O', price: '$7000-8000' } },
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
          // CPU 1211C Series
          { id: 's7-1211c-dc', name: 'CPU 1211C DC/DC/DC', partNumber: '6ES7211-1AE40-0XB0', specifications: { memory: '50 KB', io: '6DI/4DO/2AI', scanTime: '0.1 μs', price: '$300-500' } },
          { id: 's7-1211c-ac', name: 'CPU 1211C AC/DC/Relay', partNumber: '6ES7211-1BE40-0XB0', specifications: { memory: '50 KB', io: '6DI/4DO/2AI', scanTime: '0.1 μs', price: '$320-520' } },
          { id: 's7-1211c-rly', name: 'CPU 1211C DC/DC/Relay', partNumber: '6ES7211-1HE40-0XB0', specifications: { memory: '50 KB', io: '6DI/4DO/2AI', scanTime: '0.1 μs', price: '$310-510' } },
          // CPU 1212C Series
          { id: 's7-1212c-dc', name: 'CPU 1212C DC/DC/DC', partNumber: '6ES7212-1AE40-0XB0', specifications: { memory: '75 KB', io: '8DI/6DO/2AI', scanTime: '0.1 μs', price: '$400-600' } },
          { id: 's7-1212c-ac', name: 'CPU 1212C AC/DC/Relay', partNumber: '6ES7212-1BE40-0XB0', specifications: { memory: '75 KB', io: '8DI/6DO/2AI', scanTime: '0.1 μs', price: '$420-620' } },
          { id: 's7-1212c-rly', name: 'CPU 1212C DC/DC/Relay', partNumber: '6ES7212-1HE40-0XB0', specifications: { memory: '75 KB', io: '8DI/6DO/2AI', scanTime: '0.1 μs', price: '$410-610' } },
          { id: 's7-1212fc-dc', name: 'CPU 1212FC DC/DC/DC', partNumber: '6ES7212-1AF40-0XB0', specifications: { memory: '75 KB', io: '8DI/6DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$550-750' } },
          { id: 's7-1212fc-rly', name: 'CPU 1212FC DC/DC/Relay', partNumber: '6ES7212-1HF40-0XB0', specifications: { memory: '75 KB', io: '8DI/6DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$540-740' } },
          // CPU 1214C Series
          { id: 's7-1214c-dc', name: 'CPU 1214C DC/DC/DC', partNumber: '6ES7214-1AG40-0XB0', specifications: { memory: '100 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$500-700' } },
          { id: 's7-1214c-ac', name: 'CPU 1214C AC/DC/Relay', partNumber: '6ES7214-1BG40-0XB0', specifications: { memory: '100 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$520-720' } },
          { id: 's7-1214c-rly', name: 'CPU 1214C DC/DC/Relay', partNumber: '6ES7214-1HG40-0XB0', specifications: { memory: '100 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$510-710' } },
          { id: 's7-1214fc-dc', name: 'CPU 1214FC DC/DC/DC', partNumber: '6ES7214-1AF40-0XB0', specifications: { memory: '100 KB', io: '14DI/10DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$650-850' } },
          { id: 's7-1214fc-rly', name: 'CPU 1214FC DC/DC/Relay', partNumber: '6ES7214-1HF40-0XB0', specifications: { memory: '100 KB', io: '14DI/10DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$640-840' } },
          // CPU 1215C Series
          { id: 's7-1215c-dc', name: 'CPU 1215C DC/DC/DC', partNumber: '6ES7215-1AG40-0XB0', specifications: { memory: '125 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$600-800' } },
          { id: 's7-1215c-ac', name: 'CPU 1215C AC/DC/Relay', partNumber: '6ES7215-1BG40-0XB0', specifications: { memory: '125 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$620-820' } },
          { id: 's7-1215c-rly', name: 'CPU 1215C DC/DC/Relay', partNumber: '6ES7215-1HG40-0XB0', specifications: { memory: '125 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$610-810' } },
          { id: 's7-1215fc-dc', name: 'CPU 1215FC DC/DC/DC', partNumber: '6ES7215-1AF40-0XB0', specifications: { memory: '125 KB', io: '14DI/10DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$750-950' } },
          { id: 's7-1215fc-rly', name: 'CPU 1215FC DC/DC/Relay', partNumber: '6ES7215-1HF40-0XB0', specifications: { memory: '125 KB', io: '14DI/10DO/2AI', failsafe: 'Yes', scanTime: '0.1 μs', price: '$740-940' } },
          // CPU 1217C Series
          { id: 's7-1217c-dc', name: 'CPU 1217C DC/DC/DC', partNumber: '6ES7217-1AG40-0XB0', specifications: { memory: '150 KB', io: '14DI/10DO/2AI', scanTime: '0.1 μs', price: '$700-900' } },
        ],
      },
      {
        id: 's7-1500',
        name: 'SIMATIC S7-1500',
        description: 'Advanced modular controller for complex automation',
        software: 'TIA Portal',
        models: [
          // Standard CPUs
          { id: 's7-1511-1pn', name: 'CPU 1511-1 PN', partNumber: '6ES7511-1AL03-0AB0', specifications: { memory: '300 KB Work/1.5 MB Load', io: 'Max 2048 I/O', scanTime: '1 ns', price: '$1500-2000' } },
          { id: 's7-1511f-1pn', name: 'CPU 1511F-1 PN', partNumber: '6ES7511-1FL03-0AB0', specifications: { memory: '450 KB Work/1.5 MB Load', io: 'Max 2048 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$2000-2500' } },
          { id: 's7-1513-1pn', name: 'CPU 1513-1 PN', partNumber: '6ES7513-1AM03-0AB0', specifications: { memory: '600 KB Work/2.5 MB Load', io: 'Max 4096 I/O', scanTime: '1 ns', price: '$2000-2500' } },
          { id: 's7-1513f-1pn', name: 'CPU 1513F-1 PN', partNumber: '6ES7513-1FM03-0AB0', specifications: { memory: '900 KB Work/2.5 MB Load', io: 'Max 4096 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$2500-3000' } },
          { id: 's7-1515-2pn', name: 'CPU 1515-2 PN', partNumber: '6ES7515-2AN03-0AB0', specifications: { memory: '1 MB Work/4.5 MB Load', io: 'Max 8192 I/O', scanTime: '1 ns', price: '$2500-3500' } },
          { id: 's7-1515f-2pn', name: 'CPU 1515F-2 PN', partNumber: '6ES7515-2FN03-0AB0', specifications: { memory: '1.5 MB Work/4.5 MB Load', io: 'Max 8192 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$3000-4000' } },
          { id: 's7-1516-3pn', name: 'CPU 1516-3 PN/DP', partNumber: '6ES7516-3AP03-0AB0', specifications: { memory: '2 MB Work/7.5 MB Load', io: 'Max 12672 I/O', scanTime: '1 ns', price: '$3500-4500' } },
          { id: 's7-1516f-3pn', name: 'CPU 1516F-3 PN/DP', partNumber: '6ES7516-3FP03-0AB0', specifications: { memory: '3 MB Work/7.5 MB Load', io: 'Max 12672 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$4000-5000' } },
          { id: 's7-1517-3pn', name: 'CPU 1517-3 PN/DP', partNumber: '6ES7517-3AQ10-0AB0', specifications: { memory: '4 MB Work/50 MB Load', io: 'Max 12672 I/O', scanTime: '1 ns', price: '$4500-6000' } },
          { id: 's7-1517f-3pn', name: 'CPU 1517F-3 PN/DP', partNumber: '6ES7517-3FQ10-0AB0', specifications: { memory: '6 MB Work/50 MB Load', io: 'Max 12672 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$5000-6500' } },
          { id: 's7-1518-4pn', name: 'CPU 1518-4 PN/DP', partNumber: '6ES7518-4AP00-0AB0', specifications: { memory: '8 MB Work/60 MB Load', io: 'Max 12672 I/O', scanTime: '1 ns', price: '$5500-7000' } },
          { id: 's7-1518f-4pn', name: 'CPU 1518F-4 PN/DP', partNumber: '6ES7518-4FP00-0AB0', specifications: { memory: '12 MB Work/60 MB Load', io: 'Max 12672 I/O', failsafe: 'Yes', scanTime: '1 ns', price: '$6000-7500' } },
          // Compact CPUs
          { id: 's7-1511c-1pn', name: 'CPU 1511C-1 PN', partNumber: '6ES7511-1CL03-0AB0', specifications: { memory: '300 KB Work/1.5 MB Load', io: '30 DI/26 DO', scanTime: '1 ns', price: '$1800-2300' } },
          { id: 's7-1512c-1pn', name: 'CPU 1512C-1 PN', partNumber: '6ES7512-1CM03-0AB0', specifications: { memory: '400 KB Work/2 MB Load', io: '32 DI/32 DO', scanTime: '1 ns', price: '$2000-2500' } },
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

// Helper function to get model by ID with full context
export function getModelWithContext(modelId: string): {
  manufacturer: PLCManufacturer;
  series: PLCSeries;
  model: PLCModel;
} | null {
  for (const manufacturer of plcDatabase) {
    for (const series of manufacturer.series) {
      const model = series.models.find(m => m.id === modelId);
      if (model) {
        return { manufacturer, series, model };
      }
    }
  }
  return null;
}

// Convert new database format to legacy format for API compatibility
export function convertToLegacyFormat(
  manufacturer: PLCManufacturer,
  series: PLCSeries,
  model: PLCModel
) {
  return {
    id: model.id,
    model: model.name,
    manufacturer: manufacturer.name,
    series: series.name,
    description: series.description,
    fileExtension: getFileExtension(manufacturer.name, series.name),
    programmingLanguages: getProgrammingLanguages(series.software),
    communication: getCommunicationProtocols(manufacturer.name),
    ioPoints: model.specifications?.io || 'Modular',
    category: getCategory(series.name),
  };
}

function getFileExtension(manufacturer: string, series: string): string {
  if (manufacturer.includes('Schneider')) return '.smbp';
  if (manufacturer.includes('Siemens')) return '.xml';
  if (manufacturer.includes('Rockwell') || manufacturer.includes('Allen-Bradley')) return '.L5X';
  if (manufacturer.includes('Mitsubishi')) return '.gxw';
  if (manufacturer.includes('CODESYS')) return '.export';
  return '.plc';
}

function getProgrammingLanguages(software: string): string[] {
  if (software.includes('Machine Expert') || software.includes('SoMachine'))
    return ['Ladder Logic (LD)', 'Function Block (FBD)', 'Structured Text (ST)'];
  if (software.includes('TIA Portal') || software.includes('STEP 7'))
    return ['Ladder Logic (LAD)', 'Function Block (FBD)', 'Structured Control Language (SCL)'];
  if (software.includes('Studio 5000') || software.includes('RSLogix'))
    return ['Ladder Logic', 'Function Block', 'Structured Text'];
  if (software.includes('GX Works'))
    return ['Ladder Logic', 'Structured Text (ST)', 'Function Block'];
  return ['Ladder Logic (LD)', 'Structured Text (ST)'];
}

function getCommunicationProtocols(manufacturer: string): string[] {
  if (manufacturer.includes('Schneider'))
    return ['Modbus TCP/RTU', 'Ethernet/IP', 'CANopen'];
  if (manufacturer.includes('Siemens'))
    return ['Profinet', 'Profibus', 'Ethernet/IP', 'Modbus TCP'];
  if (manufacturer.includes('Rockwell') || manufacturer.includes('Allen-Bradley'))
    return ['Ethernet/IP', 'DeviceNet', 'ControlNet'];
  if (manufacturer.includes('Mitsubishi'))
    return ['CC-Link', 'Ethernet/IP', 'Modbus TCP'];
  return ['Ethernet', 'Modbus TCP', 'OPC UA'];
}

function getCategory(series: string): string {
  if (series.includes('M221') || series.includes('M241') || series.includes('1211') || series.includes('1212') || series.includes('FX3'))
    return 'Small';
  if (series.includes('M251') || series.includes('M258') || series.includes('1214') || series.includes('1215') || series.includes('FX5'))
    return 'Medium';
  if (series.includes('M340') || series.includes('M580') || series.includes('1500') || series.includes('ControlLogix') || series.includes('iQ-R'))
    return 'Large';
  return 'Medium';
}
