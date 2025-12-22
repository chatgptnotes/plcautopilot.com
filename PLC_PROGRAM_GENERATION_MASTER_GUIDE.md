# PLC Program Generation - Master Guide
**Complete Process Flow and Logic Reference**

---

## Table of Contents
1. [Overview](#overview)
2. [Key Learnings](#key-learnings)
3. [Timer Format (Critical)](#timer-format-critical)
4. [Program Generation Workflow](#program-generation-workflow)
5. [Sequential Lights Logic](#sequential-lights-logic)
6. [XML Structure Reference](#xml-structure-reference)
7. [Code Generation Patterns](#code-generation-patterns)
8. [Future Use Guidelines](#future-use-guidelines)

---

## Overview

This document captures the complete process flow for generating PLC programs for Schneider Electric EcoStruxure Machine Expert - Basic.

**Session Date**: 2025-12-22
**Target PLC**: Schneider TM221 series (M221)
**Programming Languages**: Ladder Diagram (LD) and Instruction List (IL)

---

## Key Learnings

### 1. Initial Problem: File Corruption Error

**Issue**: Generated .smbp files showed error: "This is not an EcoStruxure Machine Expert - Basic file, or the file has been corrupted."

**Root Causes**:
- Generating XML from scratch didn't match EcoStruxure's exact format
- Ladder diagram elements were missing (empty `<LadderElements />`)
- Timer instruction format was incorrect

**Solution**: Use working template files and modify only the necessary sections.

### 2. Template-Based Approach (CORRECT METHOD)

```python
# Read working template
template_path = "convy_test_no_emergency.smbp"
with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Modify specific sections:
# 1. Project name
# 2. Rungs section
# 3. I/O symbols
# 4. Timer configuration

# Write to new file
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)
```

### 3. Critical Discovery: Timer Format

**WRONG Format** (Initially attempted):
```
LD    %M0
IN    %TM0         # ERROR: IN doesn't take parameters
LD    %TM0.Q
ST    %Q0.1
```

**CORRECT Format** (Function Block structure):
```
BLK   %TM0         # Begin timer block
LD    %M0          # Load condition
IN                 # Timer input (NO parameter!)
OUT_BLK            # Output from block
LD    Q            # Load timer Q output (just "Q", not %TM0.Q)
ST    %Q0.1        # Store to output
END_BLK            # End timer block
```

---

## Timer Format (Critical)

### Why This Format?

EcoStruxure uses **IEC 61131-3 Function Block** calling convention for timers. Timers are function blocks, not simple instructions.

### Complete Timer Block Structure

```
BLK   <timer_address>      # Declare which timer to use
LD    <enable_condition>   # Load the enable condition
IN                         # Enable input (parameterless)
OUT_BLK                    # Process timer and output
LD    Q                    # Load timer done bit
ST    <output_address>     # Store result
END_BLK                    # Close block
```

### Timer Configuration (XML)

Timers must be defined in the `<Timers>` section:

```xml
<Timer>
  <Address>%TM0</Address>
  <Index>0</Index>
  <Symbol>TIMER_1</Symbol>
  <Comment>3 Second Timer</Comment>
  <Type>TON</Type>              <!-- Timer On Delay -->
  <TimeBase>TimeBase1s</TimeBase> <!-- 1 second base -->
  <Preset>3</Preset>              <!-- 3 second preset -->
</Timer>
```

### Timer Types
- **TON**: Timer On Delay (delays turning on)
- **TOF**: Timer Off Delay (delays turning off)
- **TP**: Timer Pulse (one-shot pulse)

### Time Base Options
- `TimeBase1ms` - 1 millisecond
- `TimeBase10ms` - 10 milliseconds
- `TimeBase100ms` - 100 milliseconds
- `TimeBase1s` - 1 second (most common)

---

## Program Generation Workflow

### Step 1: Define Requirements

Example: Sequential Lights
- **Inputs**: START button, STOP button
- **Outputs**: Multiple lights (3, 4, or N lights)
- **Timing**: 3-second gaps between each light
- **Logic**: Start/stop with seal-in, cascaded timers

### Step 2: Choose Programming Language

**Instruction Logic (IL)**:
- Text-based programming
- More compact file size
- Easier to generate programmatically
- `<IsLadderSelected>false</IsLadderSelected>`

**Ladder Diagram (LD)**:
- Graphical representation
- Easier to visualize for end users
- Requires both ladder elements AND instruction lines
- `<IsLadderSelected>true</IsLadderSelected>`

### Step 3: Design Rung Structure

#### Basic Pattern for Sequential Lights (N lights)

**Rung 1**: Start/Stop Control
```
Input: START button, STOP button
Output: Sequence running flag (seal-in logic)
Logic: START OR SEAL_IN AND_NOT STOP
```

**Rung 2**: First Light (Immediate)
```
Input: Sequence running flag
Output: First light
Logic: Direct connection (no timer)
```

**Rung 3 to N+1**: Timer + Light (for lights 2 to N)
```
Input: Previous timer done (or sequence flag for first timer)
Timer: 3 seconds (or specified delay)
Output: Current light
Logic: Timer block with BLK/END_BLK structure
```

### Step 4: Generate XML Structure

#### For Instruction Logic (IL):

```xml
<RungEntity>
  <LadderElements />  <!-- Empty for IL -->
  <InstructionLines>
    <InstructionLineEntity>
      <InstructionLine>LD    %I0.0</InstructionLine>
      <Comment>Load START button</Comment>
    </InstructionLineEntity>
    <!-- More instructions -->
  </InstructionLines>
  <Name>Rung 1</Name>
  <MainComment>Description</MainComment>
  <Label />
  <IsLadderSelected>false</IsLadderSelected>
</RungEntity>
```

#### For Ladder Diagram (LD):

```xml
<RungEntity>
  <LadderElements>
    <LadderEntity>
      <ElementType>NormalContact</ElementType>
      <Descriptor>%I0.0</Descriptor>
      <Comment>Start Button</Comment>
      <Symbol>START_BTN</Symbol>
      <Row>0</Row>
      <Column>0</Column>
      <ChosenConnection>Left, Right</ChosenConnection>
    </LadderEntity>
    <!-- More ladder elements -->
  </LadderElements>
  <InstructionLines>
    <!-- Same as IL version -->
  </InstructionLines>
  <Name>Rung 1</Name>
  <MainComment>Description</MainComment>
  <Label />
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

### Step 5: Update I/O Symbols

```python
import re

# Add symbol to digital input
pattern = r'(<Address>%I0\.0</Address>\s+<Index>0</Index>)'
replacement = r'\1\n            <Symbol>START_BTN</Symbol>'
content = re.sub(pattern, replacement, content)

# Add symbol to digital output
pattern = r'(<Address>%Q0\.0</Address>\s+<Index>0</Index>)'
replacement = r'\1\n            <Symbol>LIGHT_1</Symbol>'
content = re.sub(pattern, replacement, content)
```

### Step 6: Configure Timers

```python
# Find timer section
timer_start = content.find('<Timers>')
timer_end = content.find('</Timers>') + len('</Timers>')

# Generate timer configuration
timer_config = '''<Timers>
  <Timer>
    <Address>%TM0</Address>
    <Index>0</Index>
    <Symbol>TIMER_1</Symbol>
    <Comment>3 Second Timer</Comment>
    <Type>TON</Type>
    <TimeBase>TimeBase1s</TimeBase>
    <Preset>3</Preset>
  </Timer>
</Timers>'''

# Replace section
content = content[:timer_start] + timer_config + content[timer_end:]

# Update timer memory allocation
pattern = r'(<TimersMemoryAllocation>.*?<ForcedCount>)\d+(</ForcedCount>)'
content = re.sub(pattern, r'\g<1>3\g<2>', content, flags=re.DOTALL)
```

### Step 7: Write Output File

```python
output_path = "Sequential_Lights.smbp"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)
```

---

## Sequential Lights Logic

### Architecture Overview

```
START/STOP Control → Sequence Flag → Light 1 (Immediate)
                                   → Timer 1 → Light 2
                                             → Timer 2 → Light 3
                                                       → Timer 3 → Light 4
                                                                 → ... → Light N
```

### I/O Mapping

**Standard Configuration**:
- `%I0.0` - START_BTN (Normally Open push button)
- `%I0.1` - STOP_BTN (Normally Closed push button or emergency stop)
- `%Q0.0` to `%Q0.N-1` - LIGHT_1 to LIGHT_N
- `%TM0` to `%TM(N-2)` - Timers (N-1 timers for N lights)
- `%M0` - SEQUENCE_RUN flag (internal memory for seal-in)

### Logic Flow

1. **Start Sequence**:
   - User presses START (%I0.0)
   - SEQUENCE_RUN flag (%M0) sets to TRUE
   - Seal-in maintains flag even after button release

2. **Stop Sequence**:
   - User presses STOP (%I0.1) or emergency stop
   - SEQUENCE_RUN flag (%M0) resets to FALSE
   - All outputs and timers reset

3. **Light Activation**:
   - Light 1: Activates immediately when sequence starts
   - Light 2: Activates when Timer 1 completes (3 sec)
   - Light 3: Activates when Timer 2 completes (6 sec total)
   - Light N: Activates when Timer N-1 completes

### Instruction Logic Code

#### Rung 1: Start/Stop Control
```
LD    %I0.0        ; Load START button
OR    %M0          ; OR with sequence flag (seal-in)
ANDN  %I0.1        ; AND NOT STOP button
ST    %M0          ; Store to sequence flag
```

#### Rung 2: Light 1 (Immediate)
```
LD    %M0          ; Load sequence flag
ST    %Q0.0        ; Turn ON Light 1
```

#### Rung 3: Timer 1 + Light 2
```
BLK   %TM0         ; Begin Timer 1 block
LD    %M0          ; Load sequence flag
IN                 ; Timer input
OUT_BLK            ; Output from timer
LD    Q            ; Load timer done bit
ST    %Q0.1        ; Turn ON Light 2
END_BLK            ; End timer block
```

#### Rung 4 to N+1: Timer N + Light N (Pattern)
```
BLK   %TM(N-2)     ; Begin Timer N-1 block
LD    %TM(N-3).Q   ; Load previous timer done bit
IN                 ; Timer input
OUT_BLK            ; Output from timer
LD    Q            ; Load timer done bit
ST    %Q0.(N-1)    ; Turn ON Light N
END_BLK            ; End timer block
```

### Ladder Diagram Representation

```
Rung 1: Start/Stop with Seal-in
  |--[START]--+--]/[STOP]--(SEQUENCE_RUN)--|
  |           |                             |
  |--[SEQ]----+                             |

Rung 2: Light 1
  |--[SEQUENCE_RUN]--(LIGHT_1)--|

Rung 3: Timer 1 + Light 2
  |--[SEQUENCE_RUN]--[TIMER_1 3s]--(LIGHT_2)--|

Rung 4: Timer 2 + Light 3
  |--[TIMER_1.Q]--[TIMER_2 3s]--(LIGHT_3)--|

Rung N: Timer N-1 + Light N
  |--[TIMER_(N-2).Q]--[TIMER_(N-1) 3s]--(LIGHT_N)--|
```

---

## XML Structure Reference

### Complete .smbp File Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor>
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>ProjectName</Name>
  <FullName>C:\Path\To\ProjectName.smbp</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>

  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Main Program</Name>
        <SectionNumber>1</SectionNumber>
        <Rungs>
          <!-- Rung entities here -->
        </Rungs>
      </ProgramOrganizationUnits>
    </Pous>

    <MemoryBits>
      <!-- Internal memory bits -->
    </MemoryBits>

    <Timers>
      <!-- Timer definitions -->
    </Timers>

    <SystemBits>
      <!-- System bits -->
    </SystemBits>

    <!-- Other configuration sections -->
  </SoftwareConfiguration>

  <HardwareConfiguration>
    <Plc>
      <Cpu>
        <Reference>TM221CE40T</Reference>
        <DigitalInputs>
          <!-- Input configuration -->
        </DigitalInputs>
        <DigitalOutputs>
          <!-- Output configuration -->
        </DigitalOutputs>
      </Cpu>
    </Plc>
  </HardwareConfiguration>

  <GlobalProperties>
    <!-- Project properties -->
  </GlobalProperties>
</ProjectDescriptor>
```

### Ladder Element Types

**Contacts** (Inputs):
- `NormalContact` - Normally Open contact `--[ ]--`
- `NegatedContact` - Normally Closed contact `--]/[--`

**Coils** (Outputs):
- `Coil` - Standard output coil `--( )--`
- `SetCoil` - Set coil (latching) `--(S)--`
- `ResetCoil` - Reset coil (unlatching) `--(R)--`

**Function Blocks**:
- `Timer` - Timer block (TON, TOF, TP)
- `Counter` - Counter block
- `CompareBlock` - Comparison block

**Connections**:
- `Line` - Horizontal connection line
- Connections defined by `ChosenConnection` property:
  - `Left, Right` - Horizontal through
  - `Up, Left` - Branch up and left
  - `Down, Left, Right` - Branch down with through
  - etc.

### Row and Column Grid

Ladder diagrams use a 11-column grid (0-10):
- **Column 0**: Left power rail (start)
- **Columns 1-9**: Logic elements
- **Column 10**: Right power rail (output coil)

Multiple rows (0, 1, 2, etc.) for parallel branches.

---

## Code Generation Patterns

### Pattern 1: N Sequential Lights

**Parameters**:
- `num_lights` - Number of lights (2 to unlimited)
- `delay_seconds` - Delay between each light
- `time_base` - TimeBase1ms, TimeBase100ms, TimeBase1s

**Formula**:
- Number of rungs: `num_lights + 1` (1 for control, 1 per light)
- Number of timers: `num_lights - 1`
- Number of outputs: `num_lights`

**Code Template**:
```python
def generate_sequential_lights(num_lights, delay_seconds, time_base="TimeBase1s"):
    rungs = []

    # Rung 1: Start/Stop control
    rungs.append(generate_control_rung())

    # Rung 2: First light (immediate)
    rungs.append(generate_immediate_light_rung(0))

    # Rungs 3 to N+1: Timer + Light
    for i in range(1, num_lights):
        timer_index = i - 1
        light_index = i
        prev_timer = timer_index - 1 if i > 1 else None

        rungs.append(generate_timer_light_rung(
            timer_index,
            light_index,
            prev_timer,
            delay_seconds,
            time_base
        ))

    return rungs
```

### Pattern 2: Alternating Lights

Two groups of lights that alternate on/off.

**Logic**:
- Group A: Lights 1, 3, 5, ...
- Group B: Lights 2, 4, 6, ...
- Timer switches between groups

### Pattern 3: Traffic Light Sequence

Red → Red+Yellow → Green → Yellow → Red

**Timing**:
- Red: 30 seconds
- Red+Yellow: 3 seconds
- Green: 25 seconds
- Yellow: 5 seconds

### Pattern 4: Running Lights (Chase Effect)

Lights turn on sequentially, then turn off sequentially, creating a chase effect.

---

## Future Use Guidelines

### When Creating New Programs

1. **Always use template-based approach**
   - Start with `convy_test_no_emergency.smbp` or other working file
   - Modify only necessary sections
   - Never generate XML from scratch

2. **Use correct timer format**
   - Always BLK/END_BLK structure
   - Never use `IN %TMx` format
   - Remember: `LD Q`, not `LD %TMx.Q` inside block

3. **Include both languages**
   - Even for IL programs, EcoStruxure stores both representations
   - Ladder elements can be empty for pure IL
   - Always include InstructionLines section

4. **Test incrementally**
   - Start with 2-3 lights
   - Verify it opens in EcoStruxure
   - Then scale to larger numbers

5. **Maintain consistency**
   - Use same naming conventions
   - Follow standard I/O mapping
   - Document all changes

### Common Pitfalls to Avoid

1. **Empty LadderElements without IsLadderSelected=false**
2. **Incorrect timer instruction format**
3. **Missing timer definitions in Timers section**
4. **Inconsistent timer memory allocation**
5. **Forgetting to update I/O symbols**
6. **Using relative paths instead of absolute**
7. **Wrong encoding (use utf-8)**
8. **Missing XML declaration**

### Debugging Checklist

If file won't open in EcoStruxure:

- [ ] Check file encoding (must be UTF-8)
- [ ] Verify XML declaration present
- [ ] Confirm all <Rungs> are closed
- [ ] Check timer format (BLK/END_BLK)
- [ ] Verify timer definitions exist
- [ ] Check I/O addresses are valid
- [ ] Ensure IsLadderSelected matches element presence
- [ ] Validate all XML tags are closed
- [ ] Check for special characters in comments
- [ ] Verify project paths are absolute

---

## Examples Generated in This Session

### 1. Sequential_Lights_IL.smbp
- **Lights**: 3
- **Language**: Instruction Logic
- **Status**: User-corrected (working template)

### 2. Sequential_4Lights_IL.smbp
- **Lights**: 4
- **Language**: Instruction Logic
- **File Size**: 87 KB
- **Timers**: 3 (TM0, TM1, TM2)

### 3. Sequential_4Lights_LD.smbp
- **Lights**: 4
- **Language**: Ladder Diagram
- **File Size**: 103 KB
- **Timers**: 3 (TM0, TM1, TM2)
- **Features**: Full graphical representation

---

## Python Script Templates

### Complete Generator Template

```python
import os
import re

def create_plc_program(
    template_path,
    output_path,
    project_name,
    num_lights,
    delay_seconds
):
    """
    Generate PLC program for sequential lights

    Args:
        template_path: Path to working template .smbp file
        output_path: Path for output .smbp file
        project_name: Name of new project
        num_lights: Number of sequential lights
        delay_seconds: Delay between lights in seconds
    """

    # Read template
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update project name
    content = update_project_name(content, project_name, output_path)

    # Generate and replace rungs
    rungs = generate_rungs(num_lights)
    content = replace_rungs(content, rungs)

    # Update I/O symbols
    content = update_io_symbols(content, num_lights)

    # Configure timers
    content = configure_timers(content, num_lights - 1, delay_seconds)

    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return output_path

def generate_rungs(num_lights):
    """Generate rung XML for N lights"""
    rungs = []

    # Rung 1: Control
    rungs.append(generate_control_rung())

    # Rung 2: First light
    rungs.append(generate_first_light_rung())

    # Rungs 3+: Timers + Lights
    for i in range(1, num_lights):
        rungs.append(generate_timer_light_rung(i))

    return '\n'.join(rungs)

# Additional helper functions...
```

---

## Conclusion

This document provides a complete reference for generating PLC programs for Schneider Electric EcoStruxure Machine Expert - Basic. The key discoveries were:

1. **Template-based approach** is essential for compatibility
2. **BLK/END_BLK timer format** is mandatory
3. **Both ladder and instruction** representations should be included
4. **Incremental testing** prevents wasted effort

All future PLC program generation should follow these patterns and guidelines.

---

**Document Version**: 1.0
**Last Updated**: 2025-12-22
**Author**: Claude Code Session
**Repository**: plcautopilot.com
