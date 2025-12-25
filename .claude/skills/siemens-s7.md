# Siemens S7 PLC Programming Skill
## Expert Agent for S7-1200 and S7-1500 Controllers

---

## Overview

**Target Controllers**: S7-1200, S7-1500, S7-300, S7-400
**Software**: TIA Portal (Totally Integrated Automation)
**File Format**: .ap15, .ap16, .ap17, .ap18, .ap19
**Programming Languages**: LAD (Ladder), FBD (Function Block), STL (Statement List), SCL (Structured Control Language), GRAPH
**Standards**: IEC 61131-3, IEC 61508

**Market Share**: 35% global, #1 in Europe

---

## CRITICAL: Siemens vs Schneider Differences

### File Structure
**Siemens TIA**: .apXX files are **compressed archives** with proprietary format
- Requires TIA Portal API or Openness API
- Direct XML manipulation not possible
- Must use Siemens Openness SDK

### Addressing System
| Element | Siemens | Schneider M221 |
|---------|---------|----------------|
| Inputs | %I0.0 | %I0.0 |
| Outputs | %Q0.0 | %Q0.0 |
| Memory | %M0.0 (bit), %MW0 (word) | %M0 (bit), %MW0 (word) |
| Timers | IEC Timer FB (TON, TOF, TP) | %TM0 |
| Counters | IEC Counter FB (CTU, CTD) | %C0 |

### Programming Philosophy
- **Siemens**: Object-oriented, function blocks, data blocks
- **Schneider**: Direct addressing, simpler structure

---

## Siemens Addressing Reference

### Digital Inputs (S7-1200/1500)
```
Format: %I[byte].[bit]
Example: %I0.0 = Input byte 0, bit 0

Input Byte Range:
- S7-1200: %I0.0 to %I127.7
- S7-1500: %I0.0 to %I16383.7
```

### Digital Outputs
```
Format: %Q[byte].[bit]
Example: %Q0.0 = Output byte 0, bit 0

Output Byte Range:
- S7-1200: %Q0.0 to %Q127.7
- S7-1500: %Q0.0 to %Q16383.7
```

### Memory Bits (Merkers)
```
Format: %M[byte].[bit]
Example: %M0.0 = Memory byte 0, bit 0

Memory Range:
- S7-1200: %M0.0 to %M4095.7
- S7-1500: %M0.0 to %M65535.7
```

### Memory Words
```
Format: %MW[number]
Example: %MW0 = Memory word 0 (16-bit)

%MD[number] = Memory double word (32-bit)
%ML[number] = Memory long word (64-bit)
```

### Data Blocks (DBs)
```
Format: DB[number].[element]
Example: DB1.Temperature = Data block 1, Temperature variable

Siemens uses Data Blocks extensively for structured data
```

---

## IEC Timers (Siemens)

### TON (On-Delay Timer)
```
TON Instance DB
Input: IN (BOOL)
Input: PT (TIME) - Preset time
Output: Q (BOOL)
Output: ET (TIME) - Elapsed time

Example:
CALL "TON_DB"
  IN := %I0.0
  PT := T#5S
  Q => %Q0.0
  ET => %MW10
```

### TOF (Off-Delay Timer)
```
TOF Instance DB
Input: IN (BOOL)
Input: PT (TIME)
Output: Q (BOOL)
Output: ET (TIME)

Stays ON for PT duration after input goes FALSE
```

### TP (Pulse Timer)
```
TP Instance DB
Input: IN (BOOL)
Input: PT (TIME)
Output: Q (BOOL)
Output: ET (TIME)

Generates pulse of PT duration on rising edge
```

---

## MANDATORY Templates

### Primary Template (To Be Created)
**Location**: `/Users/murali/1backup/plcautopilot.com/plc_automation/create_sequential_s7_1200.py`

**Approach**: Use Siemens TIA Portal Openness API

```python
import clr
import sys

# Load Siemens TIA Portal Openness DLL
sys.path.append(r'C:\Program Files\Siemens\Automation\Portal V17\PublicAPI\V17')
clr.AddReference('Siemens.Engineering')

from Siemens.Engineering import TiaPortal
from Siemens.Engineering.HW import DeviceItem

def create_s7_1200_project(project_name):
    """Create S7-1200 project using TIA Openness API"""

    # Connect to TIA Portal
    tia_portal = TiaPortal(TiaPortalMode.WithoutUserInterface)

    # Create new project
    project = tia_portal.Projects.Create(
        project_directory,
        project_name
    )

    # Add S7-1200 device
    device = project.Devices.CreateWithItem(
        "OrderNumber:6ES7 214-1AG40-0XB0",  # S7-1214C DC/DC/DC
        "S7-1200",
        "S7-1200 PLC"
    )

    # Get PLC software
    plc_software = device.DeviceItems[1].GetService[SoftwareContainer]()

    # Add program blocks
    plc_blocks = plc_software.BlockGroup.Blocks

    # Create main OB1 (Organization Block)
    ob1 = plc_blocks.CreateOB("Main", 1)

    # Add ladder logic
    # ... (Generate ladder networks)

    # Save project
    project.Save()
    project.Close()

    tia_portal.Dispose()
```

---

## Ladder Logic Patterns (LAD)

### Pattern 1: Simple Contact/Coil
```
Network 1: "Start Motor"
    |  %I0.0    %I0.1    %M0.0  |
    |---| |-------| |------( )---|
    |  START     RUN            |
```

### Pattern 2: Seal-in Circuit
```
Network 1: "Motor Control"
    |  %I0.0         %M0.0  |
    |---| |-------+----( )---|
    |  START      |  MOTOR  |
    |  %M0.0      |         |
    |---| |-------+         |
    |  SEAL-IN              |
    |  %I0.1                |
    |---|/|----------------+
    |  STOP                 |
```

### Pattern 3: Timer Usage
```
Network 1: "Delay Timer"
    |  %I0.0        TON        %Q0.0  |
    |---| |------+--TON_DB--+---( )---|
    |  START     | IN    Q  |  OUTPUT |
    |            | PT:=T#3S |         |
    |            | ET=>     |         |
    |            +----------+         |
```

---

## SCL (Structured Text) Patterns

### Pattern 1: Sequential Control
```scl
// Sequential Lights in SCL (Siemens Structured Control Language)

IF Start AND NOT Stop THEN
    SequenceRun := TRUE;
END_IF;

IF Stop THEN
    SequenceRun := FALSE;
END_IF;

// Light 1 - Immediate
Output1 := SequenceRun;

// Light 2 - After 3 seconds
Timer1(IN := SequenceRun, PT := T#3S);
Output2 := Timer1.Q;

// Light 3 - After 6 seconds
Timer2(IN := Timer1.Q, PT := T#3S);
Output3 := Timer2.Q;
```

---

## PROFINET Communication (S7-1200/1500)

### Configuration
```xml
<PROFINETConfiguration>
  <DeviceName>PLC_Station_1</DeviceName>
  <IPAddress>192.168.0.10</IPAddress>
  <SubnetMask>255.255.255.0</SubnetMask>
  <Gateway>192.168.0.1</Gateway>
  <IODevices>
    <Device>
      <Name>ET200SP_1</Name>
      <IPAddress>192.168.0.20</IPAddress>
      <Modules>
        <Module Type="DI16x24VDC" Slot="1"/>
        <Module Type="DQ16x24VDC" Slot="2"/>
      </Modules>
    </Device>
  </IODevices>
</PROFINETConfiguration>
```

---

## Working Examples (To Be Created)

### 1. S7-1200 Sequential Control
**File**: `create_sequential_s7_1200.py`
- LAD programming
- IEC timers
- Basic I/O control

### 2. S7-1500 PROFINET Master
**File**: `create_profinet_s7_1500.py`
- PROFINET IO configuration
- Remote I/O control
- Distributed peripherals

### 3. S7-1200 PID Control
**File**: `create_pid_s7_1200.py`
- PID_Compact function block
- Analog scaling
- Auto-tuning

---

## TIA Portal Openness API Reference

### Key Classes
```csharp
// Project Management
TiaPortal.Projects.Create()
TiaPortal.Projects.Open()

// Device Management
Project.Devices.CreateWithItem()

// Software Container
DeviceItem.GetService<SoftwareContainer>()

// Block Programming
PlcBlockGroup.Blocks.CreateOB()
PlcBlockGroup.Blocks.CreateFC()
PlcBlockGroup.Blocks.CreateFB()
PlcBlockGroup.Blocks.CreateDB()
```

---

## Activation Rules

**Trigger Keywords**:
- S7-1200, S7-1500, S7-300, S7-400
- Siemens, Siemens PLC
- TIA Portal
- PROFINET
- LAD, FBD, SCL, STL
- .ap15, .ap16, .ap17, .ap18, .ap19

**Action**: Use TIA Portal Openness API or generate SCL code

---

## S7 Programming Checklist

- [ ] Install TIA Portal Openness SDK
- [ ] Reference Siemens.Engineering DLL
- [ ] Select correct CPU (S7-1200 vs S7-1500)
- [ ] Configure I/O addressing
- [ ] Create instance DBs for timers/counters
- [ ] Set up PROFINET if distributed I/O
- [ ] Configure safety functions if needed
- [ ] Test with PLCSIM (simulator)

---

## Resources

- **TIA Portal Openness API**: https://support.industry.siemens.com/cs/document/109773018
- **S7-1200 Manual**: https://support.industry.siemens.com/cs/document/36932465
- **S7-1500 Manual**: https://support.industry.siemens.com/cs/document/59191792

---

## Version History

- **v1.0** (2025-12-24): Initial Siemens S7 skill creation

---

**PLCAutoPilot Siemens S7 Skill v1.0 | 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
