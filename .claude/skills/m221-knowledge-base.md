# M221 PLC Programming Knowledge Base
## Complete Reference for Schneider Electric M221 Controller Programming

**MANDATORY**: For ANY M221 task, read one of these three primary Python scripts first:
1. `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py` - IL version, 4 lights
2. `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py` - Ladder version, 4 lights
3. `/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py` - IL version, 3 lights

These scripts contain working, tested code that you MUST use as templates.

---

## Table of Contents
1. [.smbp File Structure](#smbp-file-structure)
2. [XML Schema Patterns](#xml-schema-patterns)
3. [Ladder Logic Templates](#ladder-logic-templates)
4. [I/O Addressing](#io-addressing)
5. [Timer Configuration](#timer-configuration)
6. [Common Programming Patterns](#common-programming-patterns)
7. [Complete Working Examples](#complete-working-examples)

---

## 1. .smbp File Structure

### Overview
The .smbp (SoMachine Basic Project) file for M221 is a **single XML file** (not a ZIP archive like other Schneider controllers).

```
project.smbp
└── Single XML file containing:
    ├── ProjectDescriptor (root element)
    ├── SoftwareConfiguration
    │   ├── Pous (Program Organization Units)
    │   │   └── Rungs (Ladder Logic)
    │   ├── Memory Allocation
    │   ├── Timers Configuration
    │   ├── System Bits/Words
    │   └── Task Configuration
    └── HardwareConfiguration
        ├── CPU Configuration (TM221CE40T)
        ├── I/O Configuration
        ├── Ethernet Settings
        └── Serial Line Settings
```

### Root Element Structure
```xml
<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>Sequential_Lights</Name>
  <FullName>C:\Path\To\Sequential_Lights.smbp</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>

  <SoftwareConfiguration>
    <!-- Program logic, timers, memory -->
  </SoftwareConfiguration>

  <HardwareConfiguration>
    <!-- PLC hardware, I/O, communications -->
  </HardwareConfiguration>

  <DisplayUserLabelsConfiguration>
    <!-- Multi-language support -->
  </DisplayUserLabelsConfiguration>

  <GlobalProperties>
    <!-- Project metadata, protection -->
  </GlobalProperties>

  <ReportConfiguration>
    <!-- Documentation settings -->
  </ReportConfiguration>
</ProjectDescriptor>
```

---

## 2. XML Schema Patterns

### Ladder Rung Structure (Dual Representation)
Each rung contains **BOTH** ladder diagram AND instruction list representations:

```xml
<RungEntity>
  <!-- Ladder Diagram Representation -->
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%I0.0</Descriptor>
      <Comment>Start Button</Comment>
      <Symbol>START_BTN</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Down, Left, Right</ChosenConnection>
    </LadderEntity>
    <!-- More elements... -->
  </LadderElements>

  <!-- Instruction List Representation -->
  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %I0.0</InstructionLine>
      <Comment>Load START_BTN</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %Q0.0</InstructionLine>
      <Comment>Store to output</Comment>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Motor Control</Name>
  <MainComment>Motor start/stop logic</MainComment>
  <Label />
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

### Grid Layout System
M221 uses a **10-column grid** (columns 0-10) for ladder elements:
- Columns 0-9: Logic elements (contacts, timers, etc.)
- Column 10: **Output coils only** (rightmost position)

### Connection Types
```
ChosenConnection values:
- "Left, Right" - Horizontal line
- "Down, Left, Right" - Branch start
- "Up, Left" - Branch end
- "Left" - Terminal element (coil)
```

---

## 3. Ladder Logic Templates

### Template 1: Simple Output Control
```xml
<!-- Pattern: Single input drives single output -->
<RungEntity>
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%I0.0</Descriptor>
      <Symbol>INPUT_1</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <!-- Fill columns 1-9 with Line elements -->
    <LadderEntity>
      <ElementType>Coil</ElementType>
      <Descriptor>%Q0.0</Descriptor>
      <Symbol>OUTPUT_1</Symbol>
      <Row>0</Row>
      <Column>10</Column>
      <ChosenConnection>Left</ChosenConnection>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %I0.0</InstructionLine>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %Q0.0</InstructionLine>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Simple Control</Name>
  <MainComment>Direct input to output</MainComment>
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

### Template 2: Seal-in Circuit (Latching Logic)
```xml
<!-- Pattern: Start/Stop with memory seal-in -->
<RungEntity>
  <LadderElements>
    <!-- Row 0: START button branch -->
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%I0.0</Descriptor>
      <Symbol>START_BTN</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Down, Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Row 1: Seal-in branch -->
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%M0</Descriptor>
      <Symbol>RUN_FLAG</Symbol>
      <Row>1</Row>
      <Column>0</Column>
      <ChosenConnection>Up, Left</ChosenConnection>
    </LadderEntity>

    <!-- Row 0 continues: STOP button -->
    <LadderEntity>
      <ElementType>NegatedContact</ElementType>
      <Descriptor>%I0.1</Descriptor>
      <Symbol>STOP_BTN</Symbol>
      <Row>0</Row>
      <Column>2</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Fill remaining columns with Line elements... -->

    <!-- Output coil at column 10 -->
    <LadderEntity>
      <ElementType>Coil</ElementType>
      <Descriptor>%M0</Descriptor>
      <Symbol>RUN_FLAG</Symbol>
      <Row>0</Row>
      <Column>10</Column>
      <ChosenConnection>Left</ChosenConnection>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %I0.0</InstructionLine>
      <Comment>Load START button</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>OR    %M0</InstructionLine>
      <Comment>OR with seal-in memory</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ANDN  %I0.1</InstructionLine>
      <Comment>AND NOT STOP button</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %M0</InstructionLine>
      <Comment>Store to memory bit</Comment>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Start Stop Control</Name>
  <MainComment>Latching start/stop with seal-in</MainComment>
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

### Template 3: Timer Implementation
```xml
<!-- Pattern: Timer with output control -->
<RungEntity>
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%M0</Descriptor>
      <Symbol>ENABLE</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Fill columns 1-8 with Line elements -->

    <LadderEntity>
      <ElementType>TimerFunctionBlock</ElementType>
      <Descriptor>%TM0</Descriptor>
      <Symbol>DELAY_TIMER</Symbol>
      <Comment>3 Second Delay</Comment>
      <Row>0</Row>
      <Column>9</Column>
      <ChosenConnection>Left</ChosenConnection>
      <TimerType>TON</TimerType>
      <TimeBase>TimeBase1s</TimeBase>
      <Preset>3</Preset>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %M0</InstructionLine>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>IN    %TM0</InstructionLine>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Timer Control</Name>
  <MainComment>3 second on-delay timer</MainComment>
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>

<!-- Next rung: Use timer output -->
<RungEntity>
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%TM0.Q</Descriptor>
      <Symbol>DELAY_TIMER</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Fill columns 1-9 -->

    <LadderEntity>
      <ElementType>Coil</ElementType>
      <Descriptor>%Q0.0</Descriptor>
      <Symbol>DELAYED_OUTPUT</Symbol>
      <Row>0</Row>
      <Column>10</Column>
      <ChosenConnection>Left</ChosenConnection>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %TM0.Q</InstructionLine>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %Q0.0</InstructionLine>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Delayed Output</Name>
  <MainComment>Output ON after timer expires</MainComment>
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

---

## 4. I/O Addressing

### Digital Inputs
```
Format: %I0.x where x = 0 to 23 (TM221CE40T has 24 digital inputs)

Examples:
%I0.0  - Digital Input 0 (START button)
%I0.1  - Digital Input 1 (STOP button)
%I0.23 - Digital Input 23 (last input)
```

### Digital Outputs
```
Format: %Q0.x where x = 0 to 15 (TM221CE40T has 16 digital outputs)

Examples:
%Q0.0  - Digital Output 0 (Motor contactor)
%Q0.15 - Digital Output 15 (last output)
```

### Memory Bits (Internal Relays)
```
Format: %M<n> where n = 0 to 511

Examples:
%M0   - General purpose memory bit
%M100 - Flag for sequence control
%M511 - Last memory bit
```

### Memory Words
```
Format: %MW<n> where n = 0 to 1999

Examples:
%MW0    - Word for counter value
%MW100  - Setpoint storage
%MW1999 - Last memory word
```

### Timers
```
Format: %TM<n> where n = 0 to 254

Timer properties:
- %TM0.Q   - Timer done bit (output)
- %TM0.V   - Current value
- %TM0.P   - Preset value

Types:
- TON: On-delay timer
- TOF: Off-delay timer
- TP:  Pulse timer

Time Bases:
- TimeBase1ms  - 1 millisecond
- TimeBase10ms - 10 milliseconds
- TimeBase100ms - 100 milliseconds
- TimeBase1s   - 1 second
- TimeBase1min - 1 minute
```

### Analog Inputs
```
Format: %IW0.x where x = 0 to 1 (TM221CE40T has 2 analog inputs)

Values: 0-1000 (representing 0-10V)
```

### System Bits (Read-Only)
```
%S0  - Cold start indicator
%S1  - Warm start indicator
%S4  - 10ms time base pulse
%S5  - 100ms time base pulse
%S6  - 1 second time base pulse
%S7  - 1 minute time base pulse
%S12 - Controller running mode
%S13 - First scan in RUN mode
```

---

## 5. Timer Configuration

### Timer Declaration in XML
```xml
<Timers>
  <Timer>
    <Address>%TM0</Address>
    <Index>0</Index>
    <Symbol>DELAY_TIMER</Symbol>
    <Comment>3 Second On-Delay Timer</Comment>
    <Type>TON</Type>
    <TimeBase>TimeBase1s</TimeBase>
    <Preset>3</Preset>
  </Timer>
</Timers>
```

### Timer Types Explained

#### TON (On-Delay Timer)
```
Operation:
- Input TRUE → Timer starts counting
- When Current Value >= Preset → Output (%TM.Q) = TRUE
- Input FALSE → Timer resets, Output = FALSE

Use case: Delay before turning ON (motor soft-start delay)
```

#### TOF (Off-Delay Timer)
```
Operation:
- Input TRUE → Output (%TM.Q) = TRUE immediately
- Input FALSE → Timer starts counting
- When Current Value >= Preset → Output = FALSE

Use case: Delay before turning OFF (fan run-on after stop)
```

#### TP (Pulse Timer)
```
Operation:
- Rising edge on input → Output TRUE for Preset duration
- Output automatically goes FALSE after Preset time
- Ignores input changes during pulse

Use case: Generate fixed-duration pulse (alarm pulse)
```

---

## 6. Common Programming Patterns

### Pattern 1: Sequential Control (Multiple Steps)
```
Description: Turn on outputs sequentially with time delays

Structure:
Rung 1: Master enable control (START/STOP)
Rung 2: Step 1 output (immediate)
Rung 3: Timer 1 (delay for step 2)
Rung 4: Step 2 output (after timer 1)
Rung 5: Timer 2 (delay for step 3)
Rung 6: Step 3 output (after timer 2)

Key Points:
- Use seal-in circuit for master enable
- Chain timers using previous timer's .Q output
- Each step driven by corresponding timer done bit
```

### Pattern 2: Interlock Logic
```
Description: Prevent conflicting operations

Example: Forward/Reverse motor control
Rung 1: FORWARD command AND NOT REVERSE_RUNNING → FORWARD_RUNNING
Rung 2: REVERSE command AND NOT FORWARD_RUNNING → REVERSE_RUNNING

Key Points:
- Each direction checks opposite is NOT active
- Ensures mutual exclusion
- Add time delay between reversals for safety
```

### Pattern 3: Alarm with Reset
```
Description: Latch alarm, require manual reset

Rung 1: ALARM_CONDITION OR ALARM_LATCHED AND NOT RESET → ALARM_LATCHED
Rung 2: ALARM_LATCHED → ALARM_OUTPUT

Key Points:
- Alarm latches when condition occurs
- Remains latched even if condition clears
- Requires explicit RESET button press
- Use NC contact for RESET (fail-safe)
```

### Pattern 4: Edge Detection
```
Description: Detect rising edge (OFF→ON transition)

Rung 1: INPUT AND NOT INPUT_OLD → PULSE_OUTPUT
Rung 2: INPUT → INPUT_OLD

Key Points:
- PULSE_OUTPUT is TRUE for one scan only
- INPUT_OLD stores previous state
- Useful for counting, triggering one-shot actions
```

---

## 7. Complete Working Examples

### Example 1: Motor Start/Stop Control
```xml
<!-- Full implementation with all elements -->
<RungEntity>
  <LadderElements>
    <!-- START button (NO) -->
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%I0.0</Descriptor>
      <Comment>Start Push Button (Normally Open)</Comment>
      <Symbol>START_BTN</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Down, Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Seal-in contact -->
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%M0</Descriptor>
      <Comment>Motor Run Seal-in</Comment>
      <Symbol>MOTOR_RUN</Symbol>
      <Row>1</Row>
      <Column>0</Column>
      <ChosenConnection>Up, Left</ChosenConnection>
    </LadderEntity>

    <!-- Horizontal line -->
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>1</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- STOP button (NC) -->
    <LadderEntity>
      <ElementType>NegatedContact</ElementType>
      <Descriptor>%I0.1</Descriptor>
      <Comment>Stop Push Button (Normally Closed)</Comment>
      <Symbol>STOP_BTN</Symbol>
      <Row>0</Row>
      <Column>2</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Lines for columns 3-9 -->
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>3</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>4</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>5</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>6</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>7</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>8</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <LadderEntity>
      <ElementType>Line</ElementType>
      <Row>0</Row>
      <Column>9</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>

    <!-- Output coil -->
    <LadderEntity>
      <ElementType>Coil</ElementType>
      <Descriptor>%M0</Descriptor>
      <Comment>Motor Running Flag</Comment>
      <Symbol>MOTOR_RUN</Symbol>
      <Row>0</Row>
      <Column>10</Column>
      <ChosenConnection>Left</ChosenConnection>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %I0.0</InstructionLine>
      <Comment>Load START button</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>OR    %M0</InstructionLine>
      <Comment>OR with MOTOR_RUN (seal-in)</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ANDN  %I0.1</InstructionLine>
      <Comment>AND NOT STOP button</Comment>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %M0</InstructionLine>
      <Comment>Store to MOTOR_RUN flag</Comment>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Motor Control Logic</Name>
  <MainComment>Three-wire motor control with seal-in</MainComment>
  <Label />
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>

<!-- Rung 2: Drive motor output -->
<RungEntity>
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%M0</Descriptor>
      <Symbol>MOTOR_RUN</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <!-- Lines for columns 1-9... -->
    <LadderEntity>
      <ElementType>Coil</ElementType>
      <Descriptor>%Q0.0</Descriptor>
      <Symbol>MOTOR_OUTPUT</Symbol>
      <Row>0</Row>
      <Column>10</Column>
      <ChosenConnection>Left</ChosenConnection>
    </LadderEntity>
  </LadderElements>

  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %M0</InstructionLine>
    </InstructionLineEntity>
    <InstructionLineEntity>
      <InstructionLine>ST    %Q0.0</InstructionLine>
    </InstructionLineEntity>
  </InstructionLines>

  <Name>Motor Output</Name>
  <MainComment>Drive motor contactor</MainComment>
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

### Example 2: Sequential Lights (Complete 6 Rungs)
See create_sequential_lights_smbp.py for full implementation with:
- Seal-in control rung
- 3 light outputs
- 2 cascaded timers (3s each)
- Total sequence: 0s, 3s, 6s activation

---

## Memory Allocation Configuration

### Always Include These Sections
```xml
<MemoryBitsMemoryAllocation>
  <Allocation>Manual</Allocation>
  <ForcedCount>512</ForcedCount>
</MemoryBitsMemoryAllocation>

<MemoryWordsMemoryAllocation>
  <Allocation>Manual</Allocation>
  <ForcedCount>2000</ForcedCount>
</MemoryWordsMemoryAllocation>

<TimersMemoryAllocation>
  <Allocation>Manual</Allocation>
  <ForcedCount>N</ForcedCount> <!-- N = number of timers used -->
</TimersMemoryAllocation>
```

---

## Best Practices for M221 Programming

### 1. File Generation
- Always include full path in `<FullName>` element
- Set encoding to UTF-8
- Include both ladder and IL representations
- Fill all grid columns (0-10) with elements

### 2. Symbol Naming
- Use UPPERCASE_WITH_UNDERSCORES
- Make symbols descriptive (START_BTN not BTN1)
- Keep symbols under 32 characters
- Avoid special characters except underscore

### 3. Comment Everything
- Rung name: Brief description
- MainComment: Detailed explanation
- Element comments: Purpose of each I/O
- InstructionLine comments: Logic explanation

### 4. Ladder Grid Layout
- Always use 10-column grid
- Place coils ONLY in column 10
- Fill empty columns with Line elements
- Maintain proper ChosenConnection values

### 5. Branching Logic
- Use Row 0 for main logic path
- Use Row 1, 2, etc. for parallel branches
- Connect branches with proper "Down" and "Up" connections
- Branch start: "Down, Left, Right"
- Branch end: "Up, Left"

### 6. Timer Usage
- Declare timers in <Timers> section first
- Use descriptive symbols
- Match Preset value to application needs
- Use appropriate TimeBase (1s for most applications)
- Access done bit with %TMn.Q notation

### 7. Safety Considerations
- Use NC (Negated) contacts for STOP buttons
- Use NC contacts for safety interlocks
- Implement watchdog timers
- Add emergency stop logic in every motor control
- Test all stop conditions thoroughly

---

## Quick Reference: Element Types

```
Contact Elements:
- NormalContact       - Normally Open (NO)  —| |—
- NegatedContact      - Normally Closed (NC) —|/|—

Coil Elements:
- Coil                - Standard output      —( )—
- SetCoil             - Set (latch)          —(S)—
- ResetCoil           - Reset (unlatch)      —(R)—

Special Elements:
- TimerFunctionBlock  - Timer (TON/TOF/TP)
- Line                - Horizontal connection
- CounterFunctionBlock - Counter (CTU/CTD)
- CompareBlock        - Comparison operation
```

---

## Common Instruction List Commands

```
LD    - Load
ST    - Store
AND   - Logical AND
OR    - Logical OR
ANDN  - AND NOT
ORN   - OR NOT
IN    - Timer/Counter input
OUT   - Function block output
S     - Set coil
R     - Reset coil
```

---

## Hardware Configuration Reference

### TM221CE40T Specifications
```
Controller: TM221CE40T
Digital Inputs: 24 (%I0.0 to %I0.23)
Digital Outputs: 16 (%Q0.0 to %Q0.15)
Analog Inputs: 2 (%IW0.0 to %IW0.1)
Memory Bits: 512 (%M0 to %M511)
Memory Words: 2000 (%MW0 to %MW1999)
Timers: 255 (%TM0 to %TM254)
Ethernet: Built-in (CE models)
Serial: RS485 (Modbus RTU)
```

---

## Template Generation Function

```python
def create_m221_rung_template(
    inputs: list,           # [('%I0.0', 'START_BTN', 'NO'), ...]
    output: tuple,          # ('%Q0.0', 'MOTOR', 'Coil')
    rung_name: str,
    comment: str
) -> str:
    """
    Generate a complete M221 ladder rung with proper formatting

    Args:
        inputs: List of (address, symbol, type) tuples
                type can be 'NO' or 'NC'
        output: (address, symbol, coil_type) tuple
                coil_type can be 'Coil', 'SetCoil', 'ResetCoil'
        rung_name: Short rung identifier
        comment: Detailed rung description

    Returns:
        XML string for complete rung
    """
    # Implementation would build ladder elements
    # with proper grid layout, connections, and IL
    pass
```

---

## Version History
- v1.0 (2025-12-24): Initial knowledge base creation from working sequential_lights_smbp.py

---

**Reference Files**:
- create_sequential_lights_smbp.py (complete working example)
- create_sequential_lights_simple.py (template-based approach)
- motor_startstop_tm221ce40t.py (API-based approach)

---

**PLCAutoPilot M221 Knowledge Base v1.0 | 2025-12-24**
