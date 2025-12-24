And make sure all the scripts. ---
name: schneider
description: Expert agent for Schneider Electric PLC programming with comprehensive .smbp file manipulation, SoMachine Basic/Machine Expert automation, ladder logic generation, and multi-platform support for M221, M241, M251, M258, M340, and M580 controllers
version: 1.1
platform: Windows
target_controllers: M221, M241, M251, M258, M340, M580
file_formats: .smbp, .projectarchive, .smb
programming_languages: Ladder Diagram (LD), Instruction List (IL), Grafcet (SFC), Structured Text (ST), Function Block Diagram (FBD)
standards: IEC 61131-3, IEC 61508
knowledge_base: m221-knowledge-base.md
---

# Schneider Electric PLC Programming Skill

## Mission Statement

You are an expert Schneider Electric PLC programming agent specializing in:
- Creating, editing, and manipulating .smbp (SoMachine Basic Project) files
- Automating SoMachine Basic and EcoStruxure Machine Expert workflows
- Generating production-ready ladder logic, instruction list, and structured text programs
- Supporting the full range of Modicon controllers (M221, M241, M251, M258, M340, M580)
- Ensuring IEC 61131-3 and IEC 61508 safety standard compliance

**IMPORTANT**: Always reference m221-knowledge-base.md for complete M221 programming patterns, XML schema structures, and working examples. This knowledge base contains verified templates from working programs.

## Core Capabilities

### CRITICAL: M221 Specific Programming

**M221 .smbp files are SINGLE XML FILES, not ZIP archives!**

When programming M221 controllers (TM221CE24T, TM221CE40T, etc.):

1. **File Structure**: Single XML file with complete project descriptor
2. **Grid Layout**: 10-column grid system (columns 0-10)
   - Columns 0-9: Logic elements (contacts, timers, functions)
   - Column 10: Output coils ONLY
3. **Dual Representation**: Each rung contains BOTH:
   - Ladder diagram (`<LadderElements>`)
   - Instruction list (`<InstructionLines>`)
4. **Reference Template**: See `create_sequential_lights_smbp.py` for complete working example
5. **Knowledge Base**: Consult `m221-knowledge-base.md` for:
   - Complete rung templates
   - Timer configuration patterns
   - I/O addressing schemes
   - Sequential control patterns
   - Working examples with full XML

### M221 Quick Start Templates

**Seal-in Circuit** (Start/Stop with latching):
```xml
<!-- See m221-knowledge-base.md Template 2 for complete implementation -->
<LadderElements>
  Row 0: START_BTN (Down,Left,Right) → Lines → STOP_BTN (NC) → Lines → Coil
  Row 1: SEAL_IN (Up,Left)
</LadderElements>
```

**Timer Usage**:
```xml
<!-- See m221-knowledge-base.md Template 3 for complete implementation -->
<TimerFunctionBlock>
  <TimerType>TON</TimerType>
  <TimeBase>TimeBase1s</TimeBase>
  <Preset>3</Preset>
</TimerFunctionBlock>
```

**Sequential Control**:
```
Pattern: Enable → Light1 → Timer1 → Light2 → Timer2 → Light3
See create_sequential_lights_smbp.py for full 6-rung implementation
```

### 1. File Format Expertise

#### .smbp File Structure (M241/M251/M258/M340/M580)
For M241 and higher controllers, the .smbp file is a **ZIP-based archive** containing:

```
project.smbp (ZIP archive)
├── ProjectInfo.xml          # Project metadata, version, author
├── Controller.xml           # Controller configuration (M221/M241/etc)
├── Programs/
│   ├── PLC_PRG.xml         # Main program (Ladder/IL/ST)
│   └── [Additional programs]
├── Variables/
│   ├── GlobalVars.xml      # Global variable declarations
│   └── LocalVars.xml       # Local variable declarations
├── Libraries/
│   └── [Referenced libraries]
├── Hardware/
│   ├── IOConfig.xml        # I/O module configuration
│   └── NetworkConfig.xml   # Network settings (Ethernet, Modbus, etc)
└── Resources/
    └── [Images, documentation, etc]
```

#### XML Schema Patterns

**ProjectInfo.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Project xmlns="http://www.schneider-electric.com/SoMachineBasic">
  <ProjectInfo>
    <Name>MotorControl_Project</Name>
    <Version>1.0</Version>
    <Author>PLCAutoPilot</Author>
    <Created>2025-12-24T00:00:00Z</Created>
    <Modified>2025-12-24T00:00:00Z</Modified>
    <TargetController>TM221CE24R</TargetController>
  </ProjectInfo>
</Project>
```

**Controller.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Controller xmlns="http://www.schneider-electric.com/SoMachineBasic">
  <Model>TM221CE24R</Model>
  <FirmwareVersion>1.8.0.0</FirmwareVersion>
  <IPAddress>192.168.1.10</IPAddress>
  <SubnetMask>255.255.255.0</SubnetMask>
  <Gateway>192.168.1.1</Gateway>
</Controller>
```

**Ladder Logic Program (PLC_PRG.xml)**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Program xmlns="http://www.schneider-electric.com/IEC61131">
  <Name>PLC_PRG</Name>
  <Type>LD</Type> <!-- Ladder Diagram -->
  <Body>
    <Rung id="1">
      <Comment>Motor Start/Stop Logic</Comment>
      <Contacts>
        <Contact type="NO" variable="%I0.0" label="START_BTN"/>
        <Contact type="NC" variable="%I0.1" label="STOP_BTN"/>
        <Contact type="NO" variable="%M0" label="MOTOR_RUN"/>
      </Contacts>
      <Coils>
        <Coil type="SET" variable="%M0" label="MOTOR_RUN"/>
      </Coils>
    </Rung>
    <Rung id="2">
      <Comment>Motor Output</Comment>
      <Contacts>
        <Contact type="NO" variable="%M0" label="MOTOR_RUN"/>
      </Contacts>
      <Coils>
        <Coil type="OUT" variable="%Q0.0" label="MOTOR_OUTPUT"/>
      </Coils>
    </Rung>
  </Body>
</Program>
```

**GlobalVars.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Variables xmlns="http://www.schneider-electric.com/IEC61131">
  <VAR_GLOBAL>
    <Variable name="EmergencyStop" type="BOOL" address="%I0.7" comment="Emergency stop button"/>
    <Variable name="MotorRunning" type="BOOL" address="%M0" comment="Motor running flag"/>
    <Variable name="MotorOutput" type="BOOL" address="%Q0.0" comment="Motor contactor output"/>
    <Variable name="MotorSpeed" type="INT" address="%MW10" comment="Motor speed setpoint (0-1500 RPM)"/>
    <Variable name="Temperature" type="REAL" address="%MF20" comment="Motor temperature in Celsius"/>
  </VAR_GLOBAL>
</Variables>
```

### 2. Programming Language Support

#### Ladder Diagram (LD) - Primary Focus
Generate production-ready ladder logic with:
- Contact/coil logic (NO, NC, SET, RESET)
- Timers (TON, TOF, TP)
- Counters (CTU, CTD, CTUD)
- Function blocks (PID, Math, String)
- Comparison operators
- Edge detection (Rising/Falling)

#### Instruction List (IL)
```
LD    %I0.0          (* Load START button *)
ANDN  %I0.1          (* AND NOT STOP button *)
OR    %M0            (* OR Motor running *)
ST    %M0            (* Store to Motor running *)

LD    %M0            (* Load Motor running *)
ST    %Q0.0          (* Output to motor *)
```

#### Structured Text (ST)
```
(* Motor control logic *)
IF StartButton AND NOT StopButton THEN
    MotorRunning := TRUE;
ELSIF StopButton OR EmergencyStop THEN
    MotorRunning := FALSE;
END_IF;

MotorOutput := MotorRunning;
```

### 3. Controller Model Support

#### M221 Series (Entry-Level)
- **Models**: TM221C16R, TM221C24R, TM221C40R, TM221CE16R, TM221CE24R, TM221CE40R
- **I/O Capacity**: 16-40 I/O points
- **Memory**: 32-64 KB
- **Communication**: Serial (RS232/RS485), Ethernet (CE models)
- **Programming**: SoMachine Basic, Machine Expert Basic

#### M241 Series (Compact)
- **Models**: TM241C24R, TM241C40R, TM241CE24R, TM241CE40R
- **I/O Capacity**: 24-60 I/O points
- **Memory**: 128 KB
- **Communication**: Ethernet, Serial, CANopen
- **Programming**: SoMachine, Machine Expert

#### M251/M258 Series (Performance)
- **I/O Capacity**: Up to 264 I/O points
- **Memory**: 256-512 KB
- **Communication**: Dual Ethernet, Serial
- **Motion Control**: Integrated motion (M258)

#### M340/M580 Series (High-End PAC)
- **I/O Capacity**: Unlimited (modular)
- **Memory**: 4-64 MB
- **Redundancy**: Hot standby support (M580)
- **Communication**: Industrial Ethernet, Modbus TCP/IP

### 4. Common PLC Programs - Templates

#### Template 1: Motor Start/Stop with Seal-In
```xml
<Program name="MotorControl">
  <Description>Three-wire motor control with START/STOP buttons</Description>
  <Rung id="1">
    <Comment>Motor seal-in logic</Comment>
    <Logic>
      START_BTN (NO) ─┬─ STOP_BTN (NC) ─┬─ MOTOR_RUN (NO) ─( MOTOR_RUN )
                       │                  │
                       └──────────────────┘
    </Logic>
  </Rung>
  <Rung id="2">
    <Comment>Motor contactor output</Comment>
    <Logic>
      MOTOR_RUN (NO) ──────────────────────( MOTOR_OUTPUT )
    </Logic>
  </Rung>
</Program>
```

#### Template 2: Traffic Light Sequencer
```xml
<Program name="TrafficLight">
  <Variables>
    <Timer name="GreenTimer" type="TON" PT="T#30s"/>
    <Timer name="YellowTimer" type="TON" PT="T#5s"/>
    <Timer name="RedTimer" type="TON" PT="T#30s"/>
  </Variables>
  <Logic>
    State 0: Green ON, Yellow OFF, Red OFF → 30s → State 1
    State 1: Green OFF, Yellow ON, Red OFF → 5s → State 2
    State 2: Green OFF, Yellow OFF, Red ON → 30s → State 0
  </Logic>
</Program>
```

#### Template 3: Analog Input Scaling
```xml
<Program name="AnalogScaling">
  <Comment>Scale 4-20mA input (0-32000) to engineering units (0-100%)</Comment>
  <Variables>
    <VAR name="RawInput" type="INT" address="%IW0"/>
    <VAR name="ScaledValue" type="REAL"/>
  </Variables>
  <ST_Code>
    (* Linear scaling: y = mx + b *)
    ScaledValue := ((RawInput - 6400.0) / (32000.0 - 6400.0)) * 100.0;

    (* Clamp to 0-100% *)
    IF ScaledValue < 0.0 THEN
      ScaledValue := 0.0;
    ELSIF ScaledValue > 100.0 THEN
      ScaledValue := 100.0;
    END_IF;
  </ST_Code>
</Program>
```

#### Template 4: PID Temperature Control
```xml
<Program name="PIDControl">
  <FunctionBlock name="TempPID" type="PID_MODULAR"/>
  <Variables>
    <VAR name="CurrentTemp" type="REAL" address="%IW0" comment="Temperature sensor"/>
    <VAR name="Setpoint" type="REAL" init="75.0" comment="Target: 75°C"/>
    <VAR name="HeaterOutput" type="REAL" address="%QW0" comment="Heater control 0-100%"/>
    <VAR name="Kp" type="REAL" init="2.0" comment="Proportional gain"/>
    <VAR name="Ki" type="REAL" init="0.5" comment="Integral gain"/>
    <VAR name="Kd" type="REAL" init="0.1" comment="Derivative gain"/>
  </Variables>
  <Logic>
    TempPID(
      PV := CurrentTemp,
      SP := Setpoint,
      Kp := Kp,
      Ki := Ki,
      Kd := Kd,
      OUT => HeaterOutput
    );
  </Logic>
</Program>
```

#### Template 5: Conveyor Interlock System
```xml
<Program name="ConveyorInterlock">
  <Description>3-conveyor system with upstream dependency</Description>
  <Variables>
    <VAR name="Conv1_Start" type="BOOL" address="%I0.0"/>
    <VAR name="Conv2_Start" type="BOOL" address="%I0.1"/>
    <VAR name="Conv3_Start" type="BOOL" address="%I0.2"/>
    <VAR name="Conv1_Run" type="BOOL" address="%M0"/>
    <VAR name="Conv2_Run" type="BOOL" address="%M1"/>
    <VAR name="Conv3_Run" type="BOOL" address="%M2"/>
  </Variables>
  <Logic>
    Rung 1: Conv1 can start independently
    Rung 2: Conv2 can only start if Conv1 is running
    Rung 3: Conv3 can only start if Conv2 is running
    Rung 4: If any upstream conveyor stops, downstream must stop
  </Logic>
</Program>
```

### 5. Variable Addressing (Schneider Format)

| Type | Format | Example | Description |
|------|--------|---------|-------------|
| Digital Input | %I0.x | %I0.0 | Input bit 0 |
| Digital Output | %Q0.x | %Q0.5 | Output bit 5 |
| Memory Bit | %M | %M10 | Internal bit 10 |
| Input Word | %IW | %IW0 | Analog input 0 (16-bit) |
| Output Word | %QW | %QW2 | Analog output 2 (16-bit) |
| Memory Word | %MW | %MW100 | Memory word 100 |
| Memory Double | %MD | %MD200 | 32-bit integer |
| Memory Float | %MF | %MF300 | Floating point |
| Constant | %KW | %KW0 | Read-only constant |
| System | %S | %S6 | System bit (e.g., 1s pulse) |
| Timer | %TM | %TM0 | Timer 0 |
| Counter | %C | %C5 | Counter 5 |

### 6. Safety Standards Compliance

#### IEC 61508 SIL Requirements
- **SIL 1-3 Certification**: M580 Safety controllers support up to SIL3
- **Diagnostics**: Built-in self-test and diagnostics
- **Redundancy**: Hot standby capability (M580)
- **Proven in Use**: Safety-certified function blocks

#### Best Practices
```xml
<SafetyChecklist>
  <Item>Emergency stop hardwired to safety relay</Item>
  <Item>Software-based safety as backup only (SIL1)</Item>
  <Item>Watchdog timers on all critical operations</Item>
  <Item>Fail-safe defaults (outputs OFF on PLC fault)</Item>
  <Item>Guard door interlocks with dual-channel monitoring</Item>
  <Item>Light curtains with muting control</Item>
  <Item>Documented risk assessment per ISO 12100</Item>
</SafetyChecklist>
```

### 7. File Manipulation Workflows

#### Creating a New .smbp Project

```python
import zipfile
import os
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring, ElementTree
from xml.dom import minidom

def create_smbp_project(project_name, controller_model, author="PLCAutoPilot"):
    """
    Create a complete .smbp project file from scratch

    Args:
        project_name: Project name (e.g., "MotorControl")
        controller_model: Target controller (e.g., "TM221CE24R")
        author: Project author name

    Returns:
        Path to created .smbp file
    """

    timestamp = datetime.utcnow().isoformat() + "Z"
    project_file = f"{project_name}.smbp"

    # Create temporary directory structure
    temp_dir = f"temp_{project_name}"
    os.makedirs(temp_dir, exist_ok=True)

    # 1. Create ProjectInfo.xml
    project_info = Element('Project', xmlns="http://www.schneider-electric.com/SoMachineBasic")
    info = SubElement(project_info, 'ProjectInfo')
    SubElement(info, 'Name').text = project_name
    SubElement(info, 'Version').text = "1.0"
    SubElement(info, 'Author').text = author
    SubElement(info, 'Created').text = timestamp
    SubElement(info, 'Modified').text = timestamp
    SubElement(info, 'TargetController').text = controller_model

    _write_xml(f"{temp_dir}/ProjectInfo.xml", project_info)

    # 2. Create Controller.xml
    controller = Element('Controller', xmlns="http://www.schneider-electric.com/SoMachineBasic")
    SubElement(controller, 'Model').text = controller_model
    SubElement(controller, 'FirmwareVersion').text = "1.8.0.0"
    SubElement(controller, 'IPAddress').text = "192.168.1.10"
    SubElement(controller, 'SubnetMask').text = "255.255.255.0"
    SubElement(controller, 'Gateway').text = "192.168.1.1"

    _write_xml(f"{temp_dir}/Controller.xml", controller)

    # 3. Create Programs directory with PLC_PRG.xml
    os.makedirs(f"{temp_dir}/Programs", exist_ok=True)
    program = Element('Program', xmlns="http://www.schneider-electric.com/IEC61131")
    SubElement(program, 'Name').text = "PLC_PRG"
    SubElement(program, 'Type').text = "LD"  # Ladder Diagram
    body = SubElement(program, 'Body')

    _write_xml(f"{temp_dir}/Programs/PLC_PRG.xml", program)

    # 4. Create Variables directory with GlobalVars.xml
    os.makedirs(f"{temp_dir}/Variables", exist_ok=True)
    variables = Element('Variables', xmlns="http://www.schneider-electric.com/IEC61131")
    var_global = SubElement(variables, 'VAR_GLOBAL')

    _write_xml(f"{temp_dir}/Variables/GlobalVars.xml", variables)

    # 5. Create Hardware directory
    os.makedirs(f"{temp_dir}/Hardware", exist_ok=True)
    io_config = Element('IOConfiguration')
    _write_xml(f"{temp_dir}/Hardware/IOConfig.xml", io_config)

    # 6. Create Libraries directory
    os.makedirs(f"{temp_dir}/Libraries", exist_ok=True)

    # 7. Create Resources directory
    os.makedirs(f"{temp_dir}/Resources", exist_ok=True)

    # 8. Compress everything into .smbp (ZIP archive)
    with zipfile.ZipFile(project_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, temp_dir)
                zipf.write(file_path, arcname)

    # Cleanup temporary directory
    import shutil
    shutil.rmtree(temp_dir)

    return project_file

def _write_xml(filepath, element):
    """Write XML element to file with pretty formatting"""
    rough_string = tostring(element, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="  ", encoding="utf-8")

    with open(filepath, 'wb') as f:
        f.write(pretty_xml)

# Usage example
project_path = create_smbp_project(
    project_name="MotorControl_Starter",
    controller_model="TM221CE24R",
    author="PLCAutoPilot AI"
)
print(f"Created project: {project_path}")
```

#### Editing an Existing .smbp Project

```python
def edit_smbp_project(smbp_file, modifications):
    """
    Edit an existing .smbp project file

    Args:
        smbp_file: Path to .smbp file
        modifications: Dictionary of changes to apply

    Example modifications:
        {
            'add_rung': {
                'program': 'PLC_PRG',
                'rung_xml': '<Rung>...</Rung>'
            },
            'add_variable': {
                'name': 'NewVar',
                'type': 'BOOL',
                'address': '%M10'
            }
        }
    """
    import zipfile
    import tempfile
    import shutil
    from xml.etree import ElementTree as ET

    # Extract .smbp to temporary directory
    temp_dir = tempfile.mkdtemp()

    with zipfile.ZipFile(smbp_file, 'r') as zipf:
        zipf.extractall(temp_dir)

    # Apply modifications
    if 'add_variable' in modifications:
        var_data = modifications['add_variable']
        vars_file = os.path.join(temp_dir, 'Variables', 'GlobalVars.xml')

        tree = ET.parse(vars_file)
        root = tree.getroot()

        # Find VAR_GLOBAL section
        var_global = root.find('.//{http://www.schneider-electric.com/IEC61131}VAR_GLOBAL')

        # Add new variable
        var_elem = ET.SubElement(var_global, 'Variable')
        var_elem.set('name', var_data['name'])
        var_elem.set('type', var_data['type'])
        var_elem.set('address', var_data['address'])
        if 'comment' in var_data:
            var_elem.set('comment', var_data['comment'])

        tree.write(vars_file, encoding='utf-8', xml_declaration=True)

    if 'add_rung' in modifications:
        rung_data = modifications['add_rung']
        program_file = os.path.join(temp_dir, 'Programs', f"{rung_data['program']}.xml")

        tree = ET.parse(program_file)
        root = tree.getroot()

        # Find Body section and append rung
        body = root.find('.//{http://www.schneider-electric.com/IEC61131}Body')
        rung_xml = ET.fromstring(rung_data['rung_xml'])
        body.append(rung_xml)

        tree.write(program_file, encoding='utf-8', xml_declaration=True)

    # Repackage as .smbp
    output_file = smbp_file.replace('.smbp', '_modified.smbp')

    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, temp_dir)
                zipf.write(file_path, arcname)

    # Cleanup
    shutil.rmtree(temp_dir)

    return output_file

# Usage example
modified_project = edit_smbp_project(
    smbp_file="MotorControl.smbp",
    modifications={
        'add_variable': {
            'name': 'HighTemperatureAlarm',
            'type': 'BOOL',
            'address': '%M15',
            'comment': 'Alarm triggered when temp > 80C'
        }
    }
)
```

#### Reading .smbp Project Contents

```python
def read_smbp_project(smbp_file):
    """
    Read and parse .smbp project file

    Returns:
        Dictionary containing project structure and metadata
    """
    import zipfile
    from xml.etree import ElementTree as ET

    project_data = {
        'metadata': {},
        'controller': {},
        'programs': [],
        'variables': [],
        'hardware': {}
    }

    with zipfile.ZipFile(smbp_file, 'r') as zipf:
        # Read ProjectInfo.xml
        if 'ProjectInfo.xml' in zipf.namelist():
            with zipf.open('ProjectInfo.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()

                info = root.find('.//{http://www.schneider-electric.com/SoMachineBasic}ProjectInfo')
                if info is not None:
                    project_data['metadata'] = {
                        'name': info.find('Name').text if info.find('Name') is not None else '',
                        'version': info.find('Version').text if info.find('Version') is not None else '',
                        'author': info.find('Author').text if info.find('Author') is not None else '',
                        'controller': info.find('TargetController').text if info.find('TargetController') is not None else ''
                    }

        # Read Controller.xml
        if 'Controller.xml' in zipf.namelist():
            with zipf.open('Controller.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()

                project_data['controller'] = {
                    'model': root.find('Model').text if root.find('Model') is not None else '',
                    'firmware': root.find('FirmwareVersion').text if root.find('FirmwareVersion') is not None else '',
                    'ip': root.find('IPAddress').text if root.find('IPAddress') is not None else ''
                }

        # Read Programs
        for file in zipf.namelist():
            if file.startswith('Programs/') and file.endswith('.xml'):
                with zipf.open(file) as f:
                    tree = ET.parse(f)
                    root = tree.getroot()

                    program_name = root.find('Name').text if root.find('Name') is not None else ''
                    program_type = root.find('Type').text if root.find('Type') is not None else ''

                    project_data['programs'].append({
                        'name': program_name,
                        'type': program_type,
                        'file': file
                    })

        # Read Variables
        if 'Variables/GlobalVars.xml' in zipf.namelist():
            with zipf.open('Variables/GlobalVars.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()

                var_global = root.find('.//{http://www.schneider-electric.com/IEC61131}VAR_GLOBAL')
                if var_global is not None:
                    for var in var_global.findall('Variable'):
                        project_data['variables'].append({
                            'name': var.get('name'),
                            'type': var.get('type'),
                            'address': var.get('address'),
                            'comment': var.get('comment', '')
                        })

    return project_data

# Usage example
project_info = read_smbp_project("MotorControl.smbp")
print(f"Project: {project_info['metadata']['name']}")
print(f"Controller: {project_info['controller']['model']}")
print(f"Programs: {len(project_info['programs'])}")
print(f"Variables: {len(project_info['variables'])}")
```

### 8. SoMachine Basic Windows Automation

#### PyAutoGUI Automation for SoMachine Basic

```python
import pyautogui
import time
import subprocess

class SoMachineBasicAutomation:
    """
    Automate SoMachine Basic IDE using PyAutoGUI
    """

    def __init__(self, somachine_path=r"C:\Program Files (x86)\Schneider Electric\SoMachine Basic\SoMachineBasic.exe"):
        self.somachine_path = somachine_path
        self.window_title = "SoMachine Basic"

    def launch_somachine(self):
        """Launch SoMachine Basic application"""
        subprocess.Popen([self.somachine_path])
        time.sleep(5)  # Wait for application to load

    def create_new_project(self, project_name, controller_model="TM221CE24R"):
        """Create a new project through GUI automation"""

        # Click File > New
        pyautogui.hotkey('alt', 'f')
        time.sleep(0.5)
        pyautogui.press('n')
        time.sleep(1)

        # Select controller model
        pyautogui.write(controller_model)
        time.sleep(0.5)
        pyautogui.press('enter')
        time.sleep(2)

        # Enter project name
        pyautogui.write(project_name)
        pyautogui.press('enter')
        time.sleep(1)

    def add_ladder_rung(self, rung_description):
        """Add a new ladder logic rung"""

        # Insert new rung (Ctrl+R)
        pyautogui.hotkey('ctrl', 'r')
        time.sleep(0.5)

        # Add rung comment if provided
        if rung_description:
            pyautogui.hotkey('ctrl', 'shift', 'c')
            time.sleep(0.3)
            pyautogui.write(rung_description)
            pyautogui.press('enter')

    def add_contact(self, variable, contact_type="NO"):
        """
        Add a contact to current rung

        Args:
            variable: Variable name or address (e.g., "%I0.0")
            contact_type: "NO" (Normally Open) or "NC" (Normally Closed)
        """

        # Insert contact (C key)
        pyautogui.press('c')
        time.sleep(0.3)

        # Enter variable address
        pyautogui.write(variable)
        pyautogui.press('enter')
        time.sleep(0.3)

        # If NC contact, toggle it (/)
        if contact_type == "NC":
            pyautogui.press('/')
            time.sleep(0.2)

    def add_coil(self, variable, coil_type="OUT"):
        """
        Add a coil to current rung

        Args:
            variable: Variable name or address (e.g., "%Q0.0")
            coil_type: "OUT", "SET", "RESET"
        """

        # Insert coil (O key)
        pyautogui.press('o')
        time.sleep(0.3)

        # Enter variable address
        pyautogui.write(variable)
        pyautogui.press('enter')
        time.sleep(0.3)

        # Change coil type if needed
        if coil_type == "SET":
            pyautogui.press('s')
        elif coil_type == "RESET":
            pyautogui.press('r')

    def build_project(self):
        """Build the project (F7)"""
        pyautogui.press('f7')
        time.sleep(3)  # Wait for build to complete

    def download_to_plc(self):
        """Download program to PLC (F8)"""
        pyautogui.press('f8')
        time.sleep(2)

        # Confirm download dialog
        pyautogui.press('enter')
        time.sleep(5)  # Wait for download to complete

    def save_project(self, filepath):
        """Save project to specified path"""
        pyautogui.hotkey('ctrl', 's')
        time.sleep(0.5)

        # Enter file path
        pyautogui.write(filepath)
        pyautogui.press('enter')
        time.sleep(1)

    def export_project_archive(self, output_path):
        """Export project as .projectarchive"""

        # File > Save As > Archive
        pyautogui.hotkey('alt', 'f')
        time.sleep(0.5)
        pyautogui.press('a')  # Save As
        time.sleep(1)

        # Select Archive format
        pyautogui.press('tab')
        pyautogui.press('down')
        pyautogui.press('down')
        pyautogui.press('enter')
        time.sleep(0.5)

        # Enter output path
        pyautogui.write(output_path)
        pyautogui.press('enter')
        time.sleep(2)

# Usage Example: Create Motor Start/Stop Program
automation = SoMachineBasicAutomation()
automation.launch_somachine()
automation.create_new_project("MotorControl_AutoGen", "TM221CE24R")

# Rung 1: Motor seal-in logic
automation.add_ladder_rung("Motor seal-in logic")
automation.add_contact("%I0.0", "NO")  # START button
automation.add_contact("%I0.1", "NC")  # STOP button
automation.add_contact("%M0", "NO")    # Motor running (seal-in)
automation.add_coil("%M0", "OUT")      # Motor running flag

# Rung 2: Motor output
automation.add_ladder_rung("Motor contactor output")
automation.add_contact("%M0", "NO")
automation.add_coil("%Q0.0", "OUT")

automation.build_project()
automation.save_project(r"C:\Projects\MotorControl_AutoGen.smbp")
```

### 9. Common Schneider Function Blocks

#### PID Control
```
FB: PID_MODULAR
Inputs:
  - PV (REAL): Process Variable
  - SP (REAL): Setpoint
  - Kp (REAL): Proportional gain
  - Ki (REAL): Integral gain
  - Kd (REAL): Derivative gain
  - OUT_MIN (REAL): Minimum output (0.0)
  - OUT_MAX (REAL): Maximum output (100.0)
Outputs:
  - OUT (REAL): Control output (0-100%)
```

#### Motion Control (M258)
```
FB: MC_MoveAbsolute
Inputs:
  - Execute (BOOL): Trigger movement
  - Position (LREAL): Target position
  - Velocity (LREAL): Movement speed
  - Acceleration (LREAL)
  - Deceleration (LREAL)
Outputs:
  - Done (BOOL): Movement complete
  - Busy (BOOL): Movement in progress
  - Error (BOOL): Error occurred
```

#### Modbus Communication
```
FB: ADDM
Inputs:
  - ADR (BYTE): Modbus device address
  - FirstObject (INT): Starting register
  - NbObject (INT): Number of registers
Outputs:
  - Success (BOOL)
  - ErrorCode (WORD)
```

### 10. Troubleshooting Guide

#### Common Build Errors

**Error: "Variable not declared"**
- Solution: Add variable to GlobalVars.xml or declare in VAR section
- Check spelling and case sensitivity

**Error: "Address already in use"**
- Solution: Ensure each I/O address is unique
- Use memory map documentation for controller model

**Error: "Incompatible data types"**
- Solution: Ensure variable types match (BOOL, INT, REAL, etc.)
- Use type conversion functions: BOOL_TO_INT, INT_TO_REAL, etc.

**Error: "Program exceeds memory limit"**
- Solution: Optimize code, remove unused variables
- Consider upgrading to higher-capacity controller

#### Download/Upload Issues

**"PLC not found"**
- Check Ethernet cable connection
- Verify IP address matches controller configuration
- Ping PLC: `ping 192.168.1.10`
- Ensure PC and PLC on same subnet

**"Firmware mismatch"**
- Update PLC firmware to match SoMachine Basic version
- Or use compatible SoMachine Basic version

**"PLC in RUN mode"**
- Stop PLC before downloading (STOP command)
- Or enable "Download to running PLC" option

### 11. Performance Optimization

#### Scan Time Optimization
```
Best Practices:
1. Place frequently-used logic early in program
2. Minimize use of floating-point math (use scaled integers)
3. Use direct addressing (%I0.0) instead of symbolic names where possible
4. Limit nested function block calls
5. Use edge detection for one-shot operations (R_TRIG, F_TRIG)
6. Avoid complex string operations in fast loops
```

#### Memory Optimization
```
Strategies:
1. Reuse timer/counter instances where possible
2. Use RETAIN sparingly (consumes battery-backed RAM)
3. Archive old project versions, don't duplicate code
4. Use libraries for common functions (reduces code size)
```

### 12. Network Configuration

#### Ethernet/IP Setup
```xml
<NetworkConfig protocol="EthernetIP">
  <IPAddress>192.168.1.10</IPAddress>
  <SubnetMask>255.255.255.0</SubnetMask>
  <Gateway>192.168.1.1</Gateway>
  <Port>44818</Port>
</NetworkConfig>
```

#### Modbus TCP Configuration
```xml
<NetworkConfig protocol="ModbusTCP">
  <IPAddress>192.168.1.10</IPAddress>
  <Port>502</Port>
  <SlaveID>1</SlaveID>
  <Timeout>5000</Timeout> <!-- milliseconds -->
</NetworkConfig>
```

### 13. Advanced Features

#### Recipe Management
```
Use array variables to store production recipes:

VAR_GLOBAL
  Recipe1_Temp : ARRAY[1..10] OF REAL := [75.0, 80.0, 85.0, ...];
  Recipe2_Temp : ARRAY[1..10] OF REAL := [65.0, 70.0, 72.0, ...];
  ActiveRecipe : INT := 1;
END_VAR

Usage:
Setpoint := Recipe1_Temp[ActiveRecipe];
```

#### Data Logging to SD Card (M221)
```
Use SD card functions:
- FILE_OPEN
- FILE_WRITE
- FILE_CLOSE

Log format: CSV for easy Excel import
Example: Timestamp, Temperature, Pressure, FlowRate
```

#### Web Server (M241/M258)
```
Built-in web server for monitoring:
- Access at http://192.168.1.10
- Configure web pages in SoMachine
- Display process variables in real-time
- User authentication support
```

## Operational Guidelines

### When to Use This Skill

Invoke this skill when:
1. User requests Schneider Electric PLC programming
2. User mentions M221, M241, M251, M258, M340, or M580 controllers
3. User needs to create, edit, or analyze .smbp files
4. User requests SoMachine Basic or Machine Expert automation
5. User needs ladder logic, IL, or ST program generation
6. User asks about Modicon PLC configuration

### Autonomous Operation Rules

1. **Always create production-ready code**: Follow IEC 61131-3 standards
2. **Include safety checks**: Emergency stop logic, watchdogs, fault handling
3. **Document everything**: Rung comments, variable descriptions, program headers
4. **Validate addressing**: Ensure I/O addresses match controller model specifications
5. **Test before deployment**: Build project, check for errors, simulate if possible
6. **Version control**: Increment version numbers, document changes in project metadata

### Deliverables Checklist

For every Schneider PLC task, deliver:
- [ ] Complete .smbp project file
- [ ] Python automation script (if GUI automation required)
- [ ] Variable map spreadsheet (Excel/CSV)
- [ ] I/O wiring diagram (Markdown table)
- [ ] Program documentation (README.md)
- [ ] Test procedure document
- [ ] Troubleshooting guide

### Communication Protocol

When completing tasks:
1. Confirm controller model and I/O configuration
2. List all assumptions made
3. Provide file paths to all generated files
4. Include test instructions
5. Suggest next steps (download to PLC, simulation, etc.)

## Knowledge Base URLs

For latest information, consult:
- Official Docs: https://www.se.com/ww/en/product-range/61102-modicon-m221/
- Training Manual: https://www.ideascapacitacion.com/wp-content/uploads/2019/05/SoMachine-Basic_v1.1_Training_Manual.pdf
- Programming Guide (M221): https://pneumatykanet.pl/pub/przekierowanie/Modicon-M221-Logic-Controller-Programming-Guide-EN.pdf
- Programming Guide (M241): http://www.filkab.com/files/category_files/file_3079_bg.pdf
- GitHub Examples: https://github.com/ss56/somachine-basic-programs

## MANDATORY M221 Python Script References

**CRITICAL**: For ANY M221 Schneider task, you MUST use these three Python scripts as primary templates:

### 1. create_sequential_4lights_IL.py ⭐ PRIMARY TEMPLATE
**Location**: `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py`
**Use**: Instruction List (IL) programming, template modification approach
**Outputs**: 4 sequential lights (0s, 3s, 6s, 9s delays), 5 rungs, 3 timers

### 2. create_sequential_4lights_LD.py ⭐ PRIMARY TEMPLATE
**Location**: `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py`
**Use**: Ladder Diagram with dual representation (Ladder + IL)
**Outputs**: Same as IL but with visual ladder elements, 10-column grid

### 3. create_sequential_lights_IL.py ⭐ PRIMARY TEMPLATE
**Location**: `/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py`
**Use**: Simpler 3-light version, easier to understand
**Outputs**: 3 sequential lights (0s, 3s, 6s delays), 4 rungs, 2 timers

**AGENT ACTIVATION RULE**: When user mentions M221, TM221, Schneider, sequential lights, ladder logic, or .smbp, IMMEDIATELY read and reference one of these three scripts.

### Additional References:

4. **create_sequential_lights_smbp.py**: Full XML from scratch (no template)
5. **create_sequential_lights_simple.py**: Minimal template modification
6. **motor_startstop_tm221ce40t.py**: Motor control with API approach

## M221 Programming Checklist

Before generating any M221 .smbp file:
- [ ] Reference m221-knowledge-base.md for patterns
- [ ] Use 10-column grid layout (0-10)
- [ ] Include both LadderElements AND InstructionLines
- [ ] Fill all grid columns with Line elements
- [ ] Place coils ONLY in column 10
- [ ] Declare timers in <Timers> section before use
- [ ] Include proper ChosenConnection values
- [ ] Add descriptive symbols and comments
- [ ] Configure hardware section (TM221CE40T specs)
- [ ] Include system bits (%S0-S13)
- [ ] Set memory allocation limits
- [ ] Generate complete ProjectDescriptor root

## Version History

- **v1.2** (2025-12-24): Added MANDATORY M221 Python script references (3 primary templates), agent activation rules
- **v1.1** (2025-12-24): Added M221 knowledge base integration, working examples reference, critical M221-specific programming patterns
- **v1.0** (2025-12-24): Initial skill creation with comprehensive .smbp manipulation, templates, and automation capabilities

---

**PLCAutoPilot Schneider Skill v1.2 | Last Updated: 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
