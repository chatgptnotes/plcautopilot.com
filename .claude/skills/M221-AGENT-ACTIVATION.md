# M221 Agent Activation Rules
## Automatic Template Loading for Schneider M221 Tasks

---

## Purpose

This document defines when and how to automatically activate M221 Python script templates for any M221-related task.

---

## Activation Triggers

### IMMEDIATELY read one of the three primary Python scripts when ANY of these keywords appear:

**PLC Models**:
- M221
- TM221
- TM221CE24T
- TM221CE40T
- TM221CE16R
- TM221C24R
- TM221C40R

**Software/Formats**:
- .smbp
- .smbp file
- EcoStruxure
- EcoStruxure Machine Expert
- SoMachine Basic
- Machine Expert Basic

**Programming Types**:
- Sequential lights
- Sequential control
- Ladder logic
- Ladder diagram
- Instruction List
- IL programming
- LD programming
- Timer control
- Cascaded timers

**Hardware**:
- Schneider
- Schneider Electric
- Modicon
- M221 controller
- TM221 controller

**Project Types**:
- Sequential program
- Light sequence
- Timer sequence
- Start/Stop control
- Seal-in circuit

---

## Mandatory Python Scripts

### PRIMARY TEMPLATES (Choose one based on task):

**1. create_sequential_4lights_IL.py**
- **Path**: `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py`
- **Use When**: User wants Instruction List (IL) programming
- **Use When**: User wants pure text-based logic
- **Use When**: User mentions "IL" or "instruction list"
- **Features**: 4 lights, 5 rungs, 3 timers, template modification

**2. create_sequential_4lights_LD.py**
- **Path**: `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py`
- **Use When**: User wants Ladder Diagram (LD)
- **Use When**: User wants visual representation
- **Use When**: User mentions "ladder" or "LD"
- **Features**: Dual representation (Ladder + IL), 10-column grid, 4 lights

**3. create_sequential_lights_IL.py**
- **Path**: `/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py`
- **Use When**: User wants simpler version
- **Use When**: User has 3 or fewer outputs
- **Use When**: Learning or basic examples needed
- **Features**: 3 lights, 4 rungs, 2 timers, simpler structure

---

## Activation Workflow

### Step 1: Detect Trigger
Monitor user input for any of the keywords listed above.

### Step 2: Select Template
```
IF user mentions "ladder" OR "LD" OR "graphical" OR "visual":
    → Read create_sequential_4lights_LD.py
ELSE IF user mentions "3 lights" OR "simple" OR "basic":
    → Read create_sequential_lights_IL.py
ELSE:
    → Read create_sequential_4lights_IL.py (default)
```

### Step 3: Load Template
Use the Read tool to load the entire selected Python script.

### Step 4: Extract Patterns
Copy the exact structure, functions, and patterns from the script:
- Rung generation functions
- I/O symbol update functions
- Timer configuration functions
- Template modification approach

### Step 5: Adapt to Task
Modify ONLY:
- I/O addresses (%I, %Q, %M, %TM)
- Symbol names (START_BTN → user's symbols)
- Timer presets (3s → user's delays)
- Number of outputs (adapt rung count)

NEVER modify:
- XML structure
- Grid layout (10 columns)
- Connection types
- Element hierarchy
- Dual representation pattern

---

## Example Activation Scenarios

### Scenario 1: User Requests Ladder Diagram
**User Input**: "Create a ladder program for M221 with 4 sequential outputs"

**Agent Action**:
```
1. Detect triggers: "ladder", "M221", "sequential"
2. Select: create_sequential_4lights_LD.py
3. Read script using Read tool
4. Extract ladder generation pattern
5. Adapt for 4 outputs (already matches)
6. Generate .smbp file
```

### Scenario 2: User Requests IL Program
**User Input**: "Generate .smbp file with instruction list for TM221CE40T"

**Agent Action**:
```
1. Detect triggers: ".smbp", "instruction list", "TM221CE40T"
2. Select: create_sequential_4lights_IL.py
3. Read script
4. Extract IL rung pattern
5. Adapt as needed
6. Generate .smbp file
```

### Scenario 3: Simple Sequential Control
**User Input**: "Make a program for 3 lights with Schneider PLC"

**Agent Action**:
```
1. Detect triggers: "3 lights", "Schneider PLC"
2. Select: create_sequential_lights_IL.py (3-light version)
3. Read script
4. Use existing 3-light pattern
5. Adapt symbols/addresses if needed
6. Generate .smbp file
```

### Scenario 4: Motor Control
**User Input**: "Create motor start/stop for M221"

**Agent Action**:
```
1. Detect triggers: "M221"
2. Select: create_sequential_4lights_IL.py (for seal-in pattern)
3. Read script
4. Extract Rung 1 (START/STOP with seal-in)
5. Adapt for motor control
6. Generate .smbp file
```

---

## Required Actions After Reading Script

### 1. Validate Understanding
- Confirm script contains complete working example
- Verify XML structure is complete
- Check for template file dependencies

### 2. Extract Key Functions
```python
# Always extract these functions:
- generate_xxx_rungs()         # Rung generation
- update_io_symbols()           # Symbol configuration
- update_timers()               # Timer setup
```

### 3. Copy Exact Patterns
- DO NOT improvise XML structure
- DO NOT guess element positions
- DO NOT skip grid columns
- ALWAYS maintain dual representation

### 4. Document Adaptations
Add comments explaining what was changed from template:
```python
# Adapted from create_sequential_4lights_IL.py
# Changed: 4 lights → 5 lights (added 1 more timer)
# Changed: Symbols adapted for pump control
```

---

## Error Prevention

### Common Mistakes to AVOID:

1. **Not Reading the Script**
   - ❌ Wrong: Generating from memory
   - ✅ Right: Always Read the script first

2. **Guessing XML Structure**
   - ❌ Wrong: Creating elements without reference
   - ✅ Right: Copy exact structure from script

3. **Skipping Grid Layout**
   - ❌ Wrong: Placing elements without columns
   - ✅ Right: Fill all columns 0-10 with elements

4. **Missing Dual Representation**
   - ❌ Wrong: Only LadderElements OR only InstructionLines
   - ✅ Right: BOTH LadderElements AND InstructionLines

5. **Incorrect Connections**
   - ❌ Wrong: Random ChosenConnection values
   - ✅ Right: Copy from template (Branch start: "Down, Left, Right")

---

## Validation Checklist

After generating M221 program, verify:

- [ ] Read one of the three primary Python scripts
- [ ] Copied exact XML structure
- [ ] Used 10-column grid layout (0-10)
- [ ] Included both Ladder and IL representations
- [ ] Filled all empty grid columns with Line elements
- [ ] Placed coils ONLY in column 10
- [ ] Declared timers in <Timers> section
- [ ] Used proper ChosenConnection values
- [ ] Added descriptive symbols and comments
- [ ] Configured hardware section (TM221CE40T)
- [ ] Included system bits configuration
- [ ] Set memory allocation limits

---

## Quick Reference

### Which Script to Use?

| User Wants | Use Script | Reason |
|------------|------------|--------|
| Ladder diagram | create_sequential_4lights_LD.py | Visual representation |
| Instruction list | create_sequential_4lights_IL.py | Text-based logic |
| Simple/3 outputs | create_sequential_lights_IL.py | Simpler structure |
| 4+ outputs | create_sequential_4lights_IL.py or LD | More rungs/timers |
| Motor control | create_sequential_4lights_IL.py | Seal-in pattern in Rung 1 |
| Learning example | create_sequential_lights_IL.py | Easier to understand |

### Script Locations (Memorize These):

```
/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py
/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py
/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py
```

---

## Integration with Other Skills

### Schneider Skill (schneider.md)
- Uses these scripts for ALL M221 tasks
- References M221 knowledge base
- Calls appropriate script based on task

### PLC File Handler Skill (plc-file-handler.md)
- Uses these scripts for .smbp generation
- Validates output against script patterns
- Ensures compliance with M221 standards

### M221 Knowledge Base (m221-knowledge-base.md)
- Provides theoretical background
- Documents XML schema
- Explains patterns used in scripts

---

## Version History

- **v1.0** (2025-12-24): Initial agent activation rules creation

---

**PLCAutoPilot M221 Agent Activation v1.0 | 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
