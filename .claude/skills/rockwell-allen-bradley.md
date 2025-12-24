# Rockwell/Allen-Bradley PLC Programming Skill
## Expert Agent for ControlLogix and CompactLogix Controllers

---

## Overview

**Target Controllers**: ControlLogix, CompactLogix, MicroLogix
**Software**: Studio 5000 (formerly RSLogix 5000), Connected Components Workbench
**File Format**: .ACD (Archive File)
**Programming Languages**: Ladder Logic, Function Block, Structured Text, Sequential Function Chart
**Standards**: IEC 61131-3

**Market Share**: 25% global, **50%+ in North America**

---

## CRITICAL: Rockwell vs Schneider/Siemens Differences

### File Structure
**Rockwell**: .ACD files are **proprietary binary format**
- Requires FactoryTalk SDK or Logix Designer SDK
- No direct XML manipulation
- Must use RA SDK libraries

### Addressing System
| Element | Rockwell | Schneider M221 | Siemens S7 |
|---------|----------|----------------|------------|
| Inputs | Local:I.Data.0 | %I0.0 | %I0.0 |
| Outputs | Local:O.Data.0 | %Q0.0 | %Q0.0 |
| Tags | MyTag (tag-based) | %M0 | %M0.0 |
| Timers | TON (tag-based) | %TM0 | TON DB |

**KEY DIFFERENCE**: Rockwell uses **tag-based addressing**, not direct addresses!

---

## Tag-Based Addressing (Rockwell)

### Controller Tags
```
Tags are user-defined names, not fixed addresses

Examples:
Start_PB (BOOL)              - Start pushbutton
Stop_PB (BOOL)               - Stop pushbutton
Motor_Run (BOOL)             - Motor running flag
Motor_Speed (INT)            - Motor speed setpoint
Temperature_Setpoint (REAL)  - Temperature SP
```

### I/O Addressing
```
Format: [Location]:[Slot]:[Type].Data.[Bit/Word]

Digital Input Examples:
Local:1:I.Data.0  - Local chassis, slot 1, input, bit 0
Remote:3:I.Data.5 - Remote chassis 3, input, bit 5

Digital Output Examples:
Local:2:O.Data.0  - Local chassis, slot 2, output, bit 0

Analog Input Examples:
Local:3:I.Ch0Data - Analog input channel 0
```

### Alias Tags
```
Create human-readable names for I/O:

Start_PB := Local:1:I.Data.0
Stop_PB := Local:1:I.Data.1
Motor_Contactor := Local:2:O.Data.0

Then use tags in logic:
Start_PB, Stop_PB, Motor_Contactor (much cleaner!)
```

---

## MANDATORY Templates

### Primary Template (To Be Created)
**Location**: `/Users/murali/1backup/plcautopilot.com/plc_automation/create_sequential_compactlogix.py`

**Approach**: Use Rockwell FactoryTalk SDK (requires .NET)

```python
import clr
import sys

# Load Rockwell SDK DLLs
sys.path.append(r'C:\Program Files (x86)\Rockwell Software\RSLogix 5000\SDK')
clr.AddReference('RockwellAutomation.Logix')

from RockwellAutomation.Logix import LogixProject

def create_compactlogix_project(project_name):
    """Create CompactLogix project using FactoryTalk SDK"""

    # Create new project
    project = LogixProject.Create(
        project_name,
        processor_type="1769-L33ER"  # CompactLogix 5370 L3
    )

    # Create controller tags
    project.Controller.Tags.Add("Start_PB", "BOOL")
    project.Controller.Tags.Add("Stop_PB", "BOOL")
    project.Controller.Tags.Add("Motor_Run", "BOOL")
    project.Controller.Tags.Add("Timer_1", "TIMER")

    # Create main routine (MainRoutine in MainProgram)
    main_program = project.Controller.Programs["MainProgram"]
    main_routine = main_program.Routines["MainRoutine"]

    # Add ladder logic rungs
    main_routine.AddRung(
        "XIC(Start_PB) OTE(Motor_Run)",
        "Start motor when Start_PB pressed"
    )

    # Save project
    project.SaveAs(f"{project_name}.ACD")

    return project
```

---

## Ladder Logic Instructions (Rockwell)

### Bit Instructions
```
XIC - Examine If Closed (NO contact)
  Symbol: -| |-
  Example: XIC(Start_PB)

XIO - Examine If Open (NC contact)
  Symbol: -|/|-
  Example: XIO(Stop_PB)

OTE - Output Energize (coil)
  Symbol: -( )-
  Example: OTE(Motor_Run)

OTL - Output Latch
  Symbol: -(L)-
  Example: OTL(Alarm_Active)

OTU - Output Unlatch
  Symbol: -(U)-
  Example: OTU(Alarm_Active)
```

### Timer Instructions
```
TON - Timer On Delay
  Format:
    TON
      Timer: Timer_1
      Preset: 3000 (milliseconds)
      Accum: 0

  Use .DN (Done bit):
    XIC(Timer_1.DN)

  Use .TT (Timing bit):
    XIC(Timer_1.TT)

TOF - Timer Off Delay
RTO - Retentive Timer On
```

### Counter Instructions
```
CTU - Count Up
  Format:
    CTU
      Counter: Counter_1
      Preset: 100
      Accum: 0

  Use .DN (Done bit):
    XIC(Counter_1.DN)

CTD - Count Down
RES - Reset (timer or counter)
```

---

## Sequential Lights Pattern (Rockwell Style)

### Tag Definitions
```
Controller Tags:
- Start_PB (BOOL)
- Stop_PB (BOOL)
- Sequence_Run (BOOL)
- Timer_1 (TIMER)
- Timer_2 (TIMER)
- Light_1 (BOOL) := Local:2:O.Data.0
- Light_2 (BOOL) := Local:2:O.Data.1
- Light_3 (BOOL) := Local:2:O.Data.2
```

### Rung 0: Start/Stop Control
```
[XIC Start_PB]--+--[XIO Stop_PB]--[OTE Sequence_Run]
                |
[XIC Sequence_Run]--+
```

### Rung 1: Light 1 (Immediate)
```
[XIC Sequence_Run]--[OTE Light_1]
```

### Rung 2: Timer 1 for Light 2
```
[XIC Sequence_Run]--[TON Timer_1 Preset:3000 Accum:0]
```

### Rung 3: Light 2 (After 3s)
```
[XIC Timer_1.DN]--[OTE Light_2]
```

### Rung 4: Timer 2 for Light 3
```
[XIC Timer_1.DN]--[TON Timer_2 Preset:3000 Accum:0]
```

### Rung 5: Light 3 (After 6s)
```
[XIC Timer_2.DN]--[OTE Light_3]
```

---

## Structured Text (ST) - Rockwell Version

### Sequential Lights in ST
```
// Rockwell Structured Text

IF Start_PB AND NOT Stop_PB THEN
    Sequence_Run := TRUE;
END_IF;

IF Stop_PB THEN
    Sequence_Run := FALSE;
END_IF;

// Light 1 - Immediate
Light_1 := Sequence_Run;

// Timer 1 for Light 2
Timer_1.PRE := 3000;  // 3 seconds
Timer_1.EN := Sequence_Run;
IF Sequence_Run THEN
    Timer_1(TimerEnable := TRUE);
END_IF;

// Light 2 - After Timer 1
Light_2 := Timer_1.DN;

// Timer 2 for Light 3
Timer_2.PRE := 3000;
Timer_2.EN := Timer_1.DN;
IF Timer_1.DN THEN
    Timer_2(TimerEnable := TRUE);
END_IF;

// Light 3 - After Timer 2
Light_3 := Timer_2.DN;
```

---

## EtherNet/IP Communication (Rockwell)

### Configuration
```
Rockwell uses EtherNet/IP (Industrial Protocol)

Advantages:
- Real-time messaging
- CIP (Common Industrial Protocol) based
- Seamless integration with SCADA (FactoryTalk)
- Distributed I/O (POINT I/O, Flex I/O)

Configuration in Studio 5000:
1. Add Ethernet module to I/O tree
2. Configure IP address
3. Add remote I/O modules
4. Map tags to I/O
```

---

## Add-On Instructions (AOI)

### Custom Function Block
```
Rockwell allows creating reusable logic blocks

Example: Motor Starter AOI
Inputs:
  - Start_Cmd (BOOL)
  - Stop_Cmd (BOOL)
  - Fault_Reset (BOOL)

Outputs:
  - Motor_Run (BOOL)
  - Motor_Fault (BOOL)

Logic:
  // Seal-in circuit
  // Overload protection
  // Fault handling
```

---

## Working Examples (To Be Created)

### 1. CompactLogix Sequential Control
**File**: `create_sequential_compactlogix.py`
- Tag-based programming
- Ladder logic generation
- Timer usage

### 2. ControlLogix EtherNet/IP
**File**: `create_ethernet_ip_controllogix.py`
- Distributed I/O
- Remote rack configuration
- Tag aliasing

### 3. CompactLogix PID Control
**File**: `create_pid_compactlogix.py`
- PIDE (Enhanced PID) instruction
- Analog I/O scaling
- Auto-tuning

---

## Activation Rules

**Trigger Keywords**:
- ControlLogix, CompactLogix, MicroLogix
- Allen-Bradley, Rockwell
- Studio 5000, RSLogix 5000
- .ACD file
- EtherNet/IP
- FactoryTalk
- Tag-based programming

**Action**: Use Rockwell SDK or generate Structured Text

---

## Rockwell Programming Checklist

- [ ] Install Studio 5000 SDK
- [ ] Select processor type (1769-L33ER, 5069-L320ER, etc.)
- [ ] Create controller tags (not direct addresses!)
- [ ] Create alias tags for I/O
- [ ] Add Main Program and Main Routine
- [ ] Program in Ladder or Structured Text
- [ ] Configure EtherNet/IP if distributed I/O
- [ ] Test with Emulate 5000 (soft PLC)
- [ ] Document tag descriptions

---

## Resources

- **Studio 5000 Logix Designer**: https://www.rockwellautomation.com/en-us/products/software/factorytalk/designsuite/studio-5000.html
- **FactoryTalk SDK**: https://rockwellautomation.custhelp.com/
- **KB Article**: https://rockwellautomation.custhelp.com/app/answers/answer_view/a_id/1086275

---

## Version History

- **v1.0** (2025-12-24): Initial Rockwell/Allen-Bradley skill creation

---

**PLCAutoPilot Rockwell Skill v1.0 | 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
