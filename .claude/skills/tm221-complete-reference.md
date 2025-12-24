# TM221 Complete Model Reference
## All 21 Schneider Electric Modicon M221 PLC Models

**PLCAutoPilot - Automating the Automation**
**Last Updated: 2025-12-25**

---

## Quick Reference Table

### Compact with Ethernet (CE Series) - 9 Models
| Model        | DI  | DO  | AI | Output Type       | Input Range      | Output Range     |
|--------------|-----|-----|----|--------------------|------------------|------------------|
| TM221CE16R   |  9  |  7  | 0  | Relay              | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221CE16T   |  9  |  7  | 0  | Transistor Sink    | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221CE16U   |  9  |  7  | 0  | Transistor Source  | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221CE24R   | 14  | 10  | 0  | Relay              | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221CE24T   | 14  | 10  | 0  | Transistor Sink    | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221CE24U   | 14  | 10  | 0  | Transistor Source  | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221CE40R   | 24  | 16  | 2  | Relay              | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |
| TM221CE40T   | 24  | 16  | 2  | Transistor Sink    | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |
| TM221CE40U   | 24  | 16  | 2  | Transistor Source  | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |

### Compact without Ethernet (C Series) - 9 Models
| Model        | DI  | DO  | AI | Output Type       | Input Range      | Output Range     |
|--------------|-----|-----|----|--------------------|------------------|------------------|
| TM221C16R    |  9  |  7  | 0  | Relay              | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221C16T    |  9  |  7  | 0  | Transistor Sink    | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221C16U    |  9  |  7  | 0  | Transistor Source  | %I0.0 - %I0.8    | %Q0.0 - %Q0.6   |
| TM221C24R    | 14  | 10  | 0  | Relay              | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221C24T    | 14  | 10  | 0  | Transistor Sink    | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221C24U    | 14  | 10  | 0  | Transistor Source  | %I0.0 - %I0.13   | %Q0.0 - %Q0.9   |
| TM221C40R    | 24  | 16  | 2  | Relay              | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |
| TM221C40T    | 24  | 16  | 2  | Transistor Sink    | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |
| TM221C40U    | 24  | 16  | 2  | Transistor Source  | %I0.0 - %I0.23   | %Q0.0 - %Q0.15  |

### Book/Modular (M Series) - 3 Models
| Model        | DI  | DO  | AI | Output Type       | Input Range      | Output Range     |
|--------------|-----|-----|----|--------------------|------------------|------------------|
| TM221M16R    |  8  |  8  | 0  | Relay              | %I0.0 - %I0.7    | %Q0.0 - %Q0.7   |
| TM221M16T    |  8  |  8  | 0  | Transistor Sink    | %I0.0 - %I0.7    | %Q0.0 - %Q0.7   |
| TM221M32TK   | 16  | 16  | 0  | Transistor Sink    | %I0.0 - %I0.15   | %Q0.0 - %Q0.15  |

---

## Model Naming Convention

```
TM221 CE 40 T
  |    |  |  |
  |    |  |  +-- Output Type: R=Relay, T=Sink, U=Source
  |    |  +---- I/O Count: 16, 24, 40 (or 32 for M series)
  |    +------- Form Factor: CE=Compact+Ethernet, C=Compact, M=Modular
  +------------ Controller Family: M221
```

### Output Type Details

| Suffix | Type             | Characteristics                                           |
|--------|------------------|----------------------------------------------------------|
| **R**  | Relay            | 2A per point, AC/DC loads, slower switching (10ms)      |
| **T**  | Transistor Sink  | 0.5A per point, DC only, fast switching, NPN output     |
| **U**  | Transistor Source| 0.5A per point, DC only, fast switching, PNP output     |

### Form Factor Details

| Prefix | Type                    | Features                                    |
|--------|-------------------------|---------------------------------------------|
| **CE** | Compact with Ethernet   | Built-in RJ45, Modbus TCP/IP, web server   |
| **C**  | Compact without Ethernet| Serial only (RS485/RS232)                   |
| **M**  | Book/Modular            | Slim profile, CANopen support, expandable  |

---

## Common Specifications (All Models)

### Memory Resources
```
Memory Bits (%M):    1024 addresses (%M0 to %M1023)
Memory Words (%MW):  8000 addresses (%MW0 to %MW7999)
Timers (%TM):        255 addresses (%TM0 to %TM254)
Counters (%C):       255 addresses (%C0 to %C254)
```

### System Resources
```
High Speed Counters: 4 (16-point) to 8 (40-point)
Pulse Train Outputs: 2 (16-point) to 4 (40-point)
Expansion Modules:   7 (16/24-point) to 14 (40-point)
Cartridge Slots:     1 (16/24-point) to 2 (40-point)
```

### Power Requirements
```
Supply Voltage:      24 VDC (20.4 to 28.8 VDC)
Consumption (24V):   130-350 mA depending on model
Consumption (5V):    280-500 mA depending on model
```

### Communication
```
Serial:              RS485 (Modbus RTU), up to 115.2 kbps
Ethernet (CE):       10/100 Mbps, Modbus TCP, EtherNet/IP
CANopen (M series):  125 kbps to 1 Mbps
```

---

## I/O Addressing Reference

### Digital Inputs
```
16-point models: %I0.0 to %I0.8   (9 inputs)
24-point models: %I0.0 to %I0.13  (14 inputs)
40-point models: %I0.0 to %I0.23  (24 inputs)
M16 models:      %I0.0 to %I0.7   (8 inputs)
M32 models:      %I0.0 to %I0.15  (16 inputs)
```

### Digital Outputs
```
16-point models: %Q0.0 to %Q0.6   (7 outputs)
24-point models: %Q0.0 to %Q0.9   (10 outputs)
40-point models: %Q0.0 to %Q0.15  (16 outputs)
M16 models:      %Q0.0 to %Q0.7   (8 outputs)
M32 models:      %Q0.0 to %Q0.15  (16 outputs)
```

### Analog Inputs (40-point models only)
```
%IW0.0 - Analog Input 0 (0-10V = 0-1000)
%IW0.1 - Analog Input 1 (0-10V = 0-1000)
```

---

## Model Selection Guide

### Decision Tree

```
START
  |
  +-- Need Ethernet connectivity?
  |     |
  |     +-- YES --> CE Series (TM221CE16/24/40)
  |     |             |
  |     |             +-- How many I/O?
  |     |                   |
  |     |                   +-- Up to 16 --> TM221CE16x
  |     |                   +-- Up to 24 --> TM221CE24x
  |     |                   +-- Up to 40 --> TM221CE40x
  |     |
  |     +-- NO --> Need CANopen?
  |                 |
  |                 +-- YES --> M Series (TM221M16/32)
  |                 |
  |                 +-- NO --> C Series (TM221C16/24/40)
  |
  +-- What output load type?
        |
        +-- AC loads, solenoids, contactors --> R (Relay)
        +-- DC loads, fast switching, PWM   --> T (Sink) or U (Source)
        +-- Mixed or uncertain              --> R (Relay - most versatile)
```

### Typical Applications

| Application                    | Recommended Model  | Reason                                    |
|--------------------------------|--------------------|-------------------------------------------|
| Small machine, basic control   | TM221C16T          | Compact, cost-effective                   |
| Conveyor system                | TM221CE24T         | Ethernet for SCADA, moderate I/O          |
| Packaging machine              | TM221CE40T         | High I/O count, analog inputs             |
| HVAC control                   | TM221CE24R         | Relay for AC loads, Ethernet for BMS      |
| Motor control panels           | TM221C40R          | Relay for contactors, high I/O            |
| Motion control                 | TM221M32TK         | CANopen for drives, high-speed I/O        |

---

## .smbp File Generation Reference

### Hardware IDs for XML
| Model        | Hardware ID |
|--------------|-------------|
| TM221CE16R   | 1928        |
| TM221CE16T   | 1929        |
| TM221CE16U   | 1930        |
| TM221CE24R   | 1931        |
| TM221CE24T   | 1932        |
| TM221CE24U   | 1933        |
| TM221CE40R   | 1934        |
| TM221CE40T   | 1935        |
| TM221CE40U   | 1936        |
| TM221C16R    | 1910        |
| TM221C16T    | 1911        |
| TM221C16U    | 1912        |
| TM221C24R    | 1913        |
| TM221C24T    | 1914        |
| TM221C24U    | 1915        |
| TM221C40R    | 1916        |
| TM221C40T    | 1917        |
| TM221C40U    | 1918        |
| TM221M16R    | 1940        |
| TM221M16T    | 1941        |
| TM221M32TK   | 1942        |

### XML Hardware Configuration Template
```xml
<Cpu>
  <Reference>TM221CE16T</Reference>
  <HardwareId>1929</HardwareId>
  <!-- Digital Inputs Configuration -->
  <DigitalInputs>
    <DiscretInput>
      <Address>%I0.0</Address>
      <Index>0</Index>
      <Symbol>INPUT_NAME</Symbol>
      <Comment>Description</Comment>
      <DIFiltering>DIFilterings4ms</DIFiltering>
    </DiscretInput>
    <!-- Repeat for all inputs up to model limit -->
  </DigitalInputs>
  <!-- Digital Outputs Configuration -->
  <DigitalOutputs>
    <DiscretOutput>
      <Address>%Q0.0</Address>
      <Index>0</Index>
      <Symbol>OUTPUT_NAME</Symbol>
      <Comment>Description</Comment>
    </DiscretOutput>
    <!-- Repeat for all outputs up to model limit -->
  </DigitalOutputs>
</Cpu>
```

---

## TypeScript/JavaScript Reference

```typescript
// lib/tm221-models.ts contains full model database
import { TM221_MODELS, getTM221Model } from '@/lib/tm221-models';

// Get model by ID
const model = getTM221Model('TM221CE16T');
console.log(model.digitalInputs);  // 9
console.log(model.digitalOutputs); // 7
console.log(model.inputRange);     // { start: '%I0.0', end: '%I0.8' }

// Check I/O limits before generating program
function validateIO(modelId: string, inputs: number, outputs: number): boolean {
  const model = getTM221Model(modelId);
  if (!model) return false;
  return inputs <= model.digitalInputs && outputs <= model.digitalOutputs;
}
```

---

## Version History

| Version | Date       | Changes                                          |
|---------|------------|--------------------------------------------------|
| 1.0     | 2025-12-25 | Initial complete reference with all 21 models   |

---

**PLCAutoPilot TM221 Complete Reference v1.0 | 2025-12-25**
