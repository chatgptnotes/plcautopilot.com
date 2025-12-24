# Schneider Electric PLC Programming Skill

## Overview
This skill contains knowledge for generating PLC programs for Schneider Electric controllers, including M221, M241, M251, M258, M340, and M580 series.

---

## M221 Program Generation (EcoStruxure Machine Expert - Basic)

### Template File
**ALWAYS use this template when creating M221 programs:**
```
C:\Users\Hp\plcautopilot.com\plcautopilot.com\create_sequential_4lights_LD.py
```

### File Format
M221 programs use `.smbp` files (Schneider Machine Basic Project), which are XML-based files that can be read as plain text.

### Key Structure Elements

#### 1. Ladder Element Types
```xml
<ElementType>NormalContact</ElementType>    <!-- NO Contact [ ] -->
<ElementType>NegatedContact</ElementType>   <!-- NC Contact [/] -->
<ElementType>Coil</ElementType>             <!-- Output Coil ( ) -->
<ElementType>Timer</ElementType>            <!-- Timer Block %TM -->
<ElementType>Line</ElementType>             <!-- Connecting Line -->
```

#### 2. Ladder Entity Structure
```xml
<LadderEntity>
  <ElementType>NormalContact</ElementType>
  <Descriptor>%I0.0</Descriptor>
  <Comment>Start Button</Comment>
  <Symbol>START_BTN</Symbol>
  <Row>0</Row>
  <Column>0</Column>
  <ChosenConnection>Down, Left, Right</ChosenConnection>
</LadderEntity>
```

#### 3. Rung Structure
```xml
<RungEntity>
  <LadderElements>
    <!-- Ladder graphical elements -->
  </LadderElements>
  <InstructionLines>
    <!-- IL instruction equivalent -->
  </InstructionLines>
  <Name>Rung 1</Name>
  <MainComment>Description</MainComment>
  <Label />
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>
```

#### 4. Timer Configuration
```xml
<Timer>
  <Address>%TM0</Address>
  <Index>0</Index>
  <Symbol>TIMER_1</Symbol>
  <Comment>3 Second Timer</Comment>
  <Type>TON</Type>
  <TimeBase>TimeBase1s</TimeBase>
  <Preset>3</Preset>
</Timer>
```

### I/O Addressing (M221)

| Type | Address Format | Example |
|------|----------------|---------|
| Digital Input | %I0.x | %I0.0, %I0.1 |
| Digital Output | %Q0.x | %Q0.0, %Q0.1 |
| Memory Bit | %M | %M0, %M1 |
| Timer | %TM | %TM0, %TM1 |
| Counter | %C | %C0, %C1 |
| Memory Word | %MW | %MW0, %MW1 |

### Connection Types
- `Left` - Connect to left element
- `Right` - Connect to right element
- `Up` - Connect to element above (parallel branch)
- `Down` - Connect to element below (parallel branch)

### Template Usage Pattern

```python
# 1. Read base template
with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 2. Replace project name
content = content.replace('<Name>OldName</Name>', '<Name>NewName</Name>')

# 3. Find and replace Rungs section
rungs_start = content.find('<Rungs>')
rungs_end = content.find('</Rungs>') + len('</Rungs>')
content = content[:rungs_start] + new_rungs + content[rungs_end:]

# 4. Update I/O symbols
content = update_io_symbols(content)

# 5. Update timer configuration
content = update_timers(content)

# 6. Write output file
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)
```

---

## M241/M251/M258 Program Generation (EcoStruxure Machine Expert)

### File Format
These controllers use `.project` files which are ZIP archives containing:
- GUID-based `.meta` and `.object` files
- UTF-16 encoded XML content
- `__shared_data_storage_string_table__.auxiliary` (large string table)
- Precompile information files

### Recommended Approach
For M241/M251/M258, generate **PLCopen XML** format instead of native `.project` files.

### PLCopen XML Template Location
```
C:\Users\Hp\plcautopilot.com\TankControl_TM241CE40T_Ladder.xml
```

### PLCopen XML Ladder Structure
```xml
<LD>
  <leftPowerRail localId="1">
    <position x="0" y="60"/>
    <connectionPointOut/>
  </leftPowerRail>

  <contact localId="2" negated="false">
    <position x="80" y="60"/>
    <connectionPointIn>
      <connection refLocalId="1"/>
    </connectionPointIn>
    <connectionPointOut/>
    <variable>PB_Start</variable>
  </contact>

  <coil localId="3" storage="set">
    <position x="400" y="60"/>
    <connectionPointIn>
      <connection refLocalId="2"/>
    </connectionPointIn>
    <variable>System_Running</variable>
  </coil>

  <rightPowerRail localId="4">
    <position x="480" y="60"/>
    <connectionPointIn>
      <connection refLocalId="3"/>
    </connectionPointIn>
  </rightPowerRail>
</LD>
```

### I/O Addressing (M241/M251/M258)

| Type | Address Format | Example |
|------|----------------|---------|
| Digital Input | %IX0.x | %IX0.0 to %IX0.23 |
| Digital Output | %QX0.x | %QX0.0 to %QX0.15 |
| Memory Bit | %MX | %MX0, %MX1 |
| Memory Word | %MW | %MW0, %MW100 |

---

## Controller Specifications Quick Reference

### M221 (TM221CE16T)
- 9 DI / 7 DO
- Software: EcoStruxure Machine Expert - Basic
- File: .smbp (XML-based)

### M241 (TM241CE24T)
- 14 DI / 10 DO
- Software: EcoStruxure Machine Expert
- File: .project (ZIP with XML)

### M241 (TM241CE40T)
- 24 DI / 16 DO
- Software: EcoStruxure Machine Expert
- File: .project (ZIP with XML)

---

## Code Generation Workflow

### For M221:
1. Use `create_sequential_4lights_LD.py` as template
2. Modify rungs for specific application
3. Update I/O symbols and timers
4. Save as .smbp file
5. Open in EcoStruxure Machine Expert - Basic

### For M241/M251/M258:
1. Generate PLCopen XML with LD body
2. Include all variables with addresses
3. Define task configuration (MAST)
4. Import via Project > Import PLCopen XML
5. Assign to MAST task

---

## Example Applications

### Sequential Lights (M221)
- Template: `create_sequential_4lights_LD.py`
- Timers: %TM0, %TM1, %TM2 (TON, 3s each)
- Outputs: %Q0.0 to %Q0.3

### Tank Level Control (M241)
- Template: `TankControl_TM241CE40T_Ladder.xml`
- Inputs: Level switches, buttons, overloads
- Outputs: Pumps, indicators, alarms
- Features: Auto/Manual mode, fault handling

---

## Important Notes

1. **M221 files are directly editable** - They are plain XML text files
2. **M241+ files are complex** - Use PLCopen XML import instead of direct editing
3. **Always include IL equivalent** - M221 rungs should have InstructionLines section
4. **Timer blocks span 2 columns** - Account for this in ladder layout
5. **Use symbols** - Always define symbolic names for addresses

---

*Last Updated: 2025-12-25*
*Skill Version: 1.0*
