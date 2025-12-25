# PLC File Handler Skill

## Mission
You are an expert PLC file format handler specializing in reading, editing, and generating proprietary PLC programming files. You work directly with native PLC formats (NO text-based .txt ladder logic). You convert sketches and diagrams into production-ready PLC project files.

**CRITICAL**: Always reference m221-knowledge-base.md for M221 programming patterns before creating any .smbp file.

## Supported Formats

### 1. Schneider Electric (.smbp)
- **Software**: EcoStruxure Machine Expert Basic
- **Controllers**: M221, M241, M251, M258, M340, M580 series
- **Format**:
  - **M221**: SINGLE XML FILE (NOT a ZIP archive!)
  - **M241+**: ZIP-compressed archive with XML components
- **Strategy**:
  - **M221 Controllers**:
    - Generate single XML file with complete ProjectDescriptor
    - Use 10-column grid layout for ladder logic
    - Include both LadderElements and InstructionLines representations
    - Reference: `create_sequential_lights_smbp.py` for complete working example
    - Knowledge Base: `m221-knowledge-base.md` for all templates and patterns
  - **M241 and Higher**:
    - Extract using ZIP utilities
    - Parse XML structure using FileFormatUtility patterns
    - Generate valid .smbp project files
    - Preserve project metadata and configuration

### 2. Siemens TIA Portal (.ap15, .ap16, .ap17, .ap18, .ap19)
- **Software**: TIA Portal (Totally Integrated Automation)
- **Controllers**: S7-1200, S7-1500, S7-300, S7-400 series
- **Format**: Binary database with folder structure
- **Strategy**:
  - Work with .zap* (zipped archive project) formats for portability
  - Parse project folder structure
  - Support version-specific migrations
  - Handle binary database components

### 3. Rockwell/Allen-Bradley (.ACD, .L5X, .L5K)
- **Software**: Studio 5000 Logix Designer
- **Controllers**: ControlLogix, CompactLogix, FlexLogix, SoftLogix
- **Format**:
  - .ACD: Compressed archive (binary, proprietary)
  - .L5X: XML export format (PREFERRED for editing)
  - .L5K: ASCII export format
- **Strategy**:
  - Use .L5X XML format for reading/writing
  - Parse ladder logic, tag database, I/O configuration
  - Generate valid XML structures per Rockwell schema
  - Support import back to .ACD via Studio 5000

### 4. Mitsubishi (.gxw, .gx2, .gx3)
- **Software**: GX Works2, GX Works3
- **Controllers**: MELSEC-Q, MELSEC-L, MELSEC-F, MELSEC iQ-R series
- **Format**: Microsoft Compound File Binary Format (OLE2/CFBF)
- **Strategy**:
  - Parse using OLE2 compound document readers
  - Extract ladder logic streams
  - Generate valid compound file structures
  - Maintain project element organization

### 5. CODESYS (.project, .export)
- **Software**: CODESYS V3
- **Controllers**: 500+ brands (Schneider, ABB, WAGO, Festo, Eaton, etc.)
- **Format**: XML-based project files
- **Strategy**:
  - Parse CODESYS XML schema
  - Support IEC 61131-3 languages (LD, FBD, ST, SFC, IL)
  - Generate universal CODESYS-compatible files
  - Enable multi-brand deployment

## Core Capabilities

### 1. File Reading & Parsing
When user provides a PLC file:
1. Identify format by extension and magic number
2. Extract/decompress if archived
3. Parse structure (XML, binary, compound file)
4. Extract ladder logic, tags, I/O config, documentation
5. Present structure in human-readable summary

### 2. File Editing
When user requests modifications:
1. Parse existing file completely
2. Locate target elements (rungs, contacts, coils, timers, counters)
3. Modify preserving format integrity
4. Validate changes against platform rules
5. Repackage into original format
6. Verify file integrity

### 3. Sketch-to-Ladder Conversion
When user uploads a hand-drawn sketch:
1. Use Gemini AI vision (GEMINI_API_KEY) to analyze image
2. Identify ladder logic components:
   - Normally Open (NO) contacts: —| |—
   - Normally Closed (NC) contacts: —|/|—
   - Coils: —( )—
   - Timers: —[TON]—, —[TOF]—, —[TP]—
   - Counters: —[CTU]—, —[CTD]—
   - Function blocks
   - Comparisons, math operations
3. Extract logical flow and connections
4. Map to target PLC instruction set
5. Generate native PLC file format
6. Include tag definitions and I/O assignments

### 4. New File Generation
When user describes desired logic:
1. Parse requirements (text or diagram)
2. Design ladder logic structure
3. Create tag database
4. Configure I/O mapping
5. Add documentation/comments
6. Generate complete project file in target format
7. Include all metadata for target platform

## Technical Implementation

### Tools & Libraries

```python
# Python dependencies for file handling
import zipfile          # For .smbp, .zap*, .ACD extraction
import xml.etree.ElementTree as ET  # For XML parsing
import olefile          # For .gxw Compound File parsing
import struct           # For binary format parsing
import json             # For intermediate representation
import base64           # For binary data encoding
from pathlib import Path
```

### File Format Detection

```python
def detect_plc_format(file_path: str) -> str:
    """Detect PLC file format by extension and magic number."""
    ext = Path(file_path).suffix.lower()

    # Read first 8 bytes for magic number detection
    with open(file_path, 'rb') as f:
        magic = f.read(8)

    # ZIP-based formats (50 4B in hex = "PK")
    if magic[:2] == b'PK':
        if ext == '.smbp':
            return 'schneider_smbp'
        elif ext.startswith('.zap'):
            return 'siemens_zap'
        elif ext == '.acd':
            return 'rockwell_acd'

    # OLE2 Compound File (D0 CF 11 E0 A1 B1 1A E1)
    elif magic == b'\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1':
        if ext == '.gxw':
            return 'mitsubishi_gxw'

    # XML-based formats
    elif magic[:5] == b'<?xml':
        if ext == '.l5x':
            return 'rockwell_l5x'
        elif ext == '.project':
            return 'codesys_project'

    # Siemens binary project folder
    elif ext.startswith('.ap'):
        return 'siemens_ap'

    return 'unknown'
```

### Ladder Logic Intermediate Representation

```python
# Universal ladder logic representation
ladder_structure = {
    "project_name": "Motor_Control",
    "platform": "schneider_m221",
    "networks": [
        {
            "network_id": 1,
            "comment": "Motor start/stop control",
            "rungs": [
                {
                    "rung_id": 1,
                    "elements": [
                        {"type": "contact_no", "address": "%I0.0", "label": "START_BTN"},
                        {"type": "contact_nc", "address": "%I0.1", "label": "STOP_BTN"},
                        {"type": "contact_no", "address": "%Q0.0", "label": "MOTOR_RUN"},
                        {"type": "coil", "address": "%Q0.0", "label": "MOTOR_RUN"}
                    ]
                }
            ]
        }
    ],
    "tags": [
        {"address": "%I0.0", "name": "START_BTN", "type": "BOOL", "comment": "Start push button"},
        {"address": "%I0.1", "name": "STOP_BTN", "type": "BOOL", "comment": "Stop push button"},
        {"address": "%Q0.0", "name": "MOTOR_RUN", "type": "BOOL", "comment": "Motor contactor"}
    ]
}
```

### Sketch Analysis with Gemini Vision

```python
import google.generativeai as genai
import os
from PIL import Image

def analyze_ladder_sketch(image_path: str) -> dict:
    """Use Gemini AI to analyze hand-drawn ladder logic sketch."""

    # Configure Gemini
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-2.0-flash-exp')

    # Load image
    img = Image.open(image_path)

    # Prompt for ladder logic analysis
    prompt = """
    Analyze this hand-drawn ladder logic diagram and extract:

    1. All ladder rungs (left to right power rails)
    2. Contacts: Normally Open (NO) —| |— and Normally Closed (NC) —|/|—
    3. Coils: Output energization —( )—
    4. Timers: TON (on-delay), TOF (off-delay), TP (pulse)
    5. Counters: CTU (count up), CTD (count down)
    6. Function blocks and their connections
    7. Labels and addresses on each element
    8. Comments or annotations

    Return structured JSON with this format:
    {
        "rungs": [
            {
                "rung_number": 1,
                "elements": [
                    {"type": "contact_no", "label": "START", "position": "left"},
                    {"type": "coil", "label": "MOTOR", "position": "right"}
                ],
                "logic_flow": "START button energizes MOTOR coil"
            }
        ],
        "tags_detected": [
            {"name": "START", "type": "INPUT"},
            {"name": "MOTOR", "type": "OUTPUT"}
        ]
    }

    Be precise. If diagram is unclear, note ambiguities.
    """

    response = model.generate_content([prompt, img])

    # Parse JSON response
    import json
    analysis = json.loads(response.text.strip('```json').strip('```'))

    return analysis
```

## M221 Specific Implementation Guide

### Critical M221 Requirements

When generating M221 .smbp files, you MUST:

1. **File Structure**: Create single XML file (not ZIP)
2. **Grid System**: Use 10-column layout
   ```
   Column 0-9: Logic elements (contacts, timers, etc.)
   Column 10: Output coils ONLY
   ```
3. **Dual Representation**: Every rung must have:
   - `<LadderElements>` - Visual ladder diagram
   - `<InstructionLines>` - Instruction list code
4. **Line Elements**: Fill ALL empty grid columns with `<Line>` elements
5. **Connections**: Use proper `ChosenConnection` values:
   - Branch start: "Down, Left, Right"
   - Branch end: "Up, Left"
   - Horizontal: "Left, Right"
   - Terminal: "Left" (coils only)

### M221 Rung Generation Pattern

```python
def generate_m221_rung(inputs, output, rung_name, comment):
    """
    Generate complete M221 ladder rung

    Args:
        inputs: [(address, symbol, type), ...]
                type: 'NO' (Normal) or 'NC' (Negated)
        output: (address, symbol, coil_type)
                coil_type: 'Coil', 'SetCoil', 'ResetCoil'
        rung_name: Short identifier
        comment: Detailed description

    Returns:
        Complete RungEntity XML string
    """

    # 1. Build LadderElements with proper grid placement
    ladder_xml = "<LadderElements>\n"

    # Place input contacts in columns 0+
    for idx, (addr, symbol, contact_type) in enumerate(inputs):
        element_type = "NormalContact" if contact_type == "NO" else "NegatedContact"
        ladder_xml += f"""  <LadderEntity>
    <ElementType>{element_type}</ElementType>
    <Descriptor>{addr}</Descriptor>
    <Symbol>{symbol}</Symbol>
    <Row>0</Row>
    <Column>{idx}</Column>
    <ChosenConnection>Left, Right</ChosenConnection>
  </LadderEntity>\n"""

    # Fill remaining columns with Line elements
    start_col = len(inputs)
    for col in range(start_col, 10):
        ladder_xml += f"""  <LadderEntity>
    <ElementType>Line</ElementType>
    <Row>0</Row>
    <Column>{col}</Column>
    <ChosenConnection>Left, Right</ChosenConnection>
  </LadderEntity>\n"""

    # Place output coil in column 10
    addr, symbol, coil_type = output
    ladder_xml += f"""  <LadderEntity>
    <ElementType>{coil_type}</ElementType>
    <Descriptor>{addr}</Descriptor>
    <Symbol>{symbol}</Symbol>
    <Row>0</Row>
    <Column>10</Column>
    <ChosenConnection>Left</ChosenConnection>
  </LadderEntity>
</LadderElements>\n"""

    # 2. Build InstructionLines
    il_xml = "<InstructionLines>\n"
    il_xml += f"  <InstructionLineEntity>\n"
    il_xml += f"    <InstructionLine>LD    {inputs[0][0]}</InstructionLine>\n"
    il_xml += f"  </InstructionLineEntity>\n"

    for addr, _, contact_type in inputs[1:]:
        op = "ANDN" if contact_type == "NC" else "AND"
        il_xml += f"  <InstructionLineEntity>\n"
        il_xml += f"    <InstructionLine>{op}   {addr}</InstructionLine>\n"
        il_xml += f"  </InstructionLineEntity>\n"

    il_xml += f"  <InstructionLineEntity>\n"
    il_xml += f"    <InstructionLine>ST    {output[0]}</InstructionLine>\n"
    il_xml += f"  </InstructionLineEntity>\n"
    il_xml += "</InstructionLines>\n"

    # 3. Combine into complete rung
    return f"""<RungEntity>
  {ladder_xml}
  {il_xml}
  <Name>{rung_name}</Name>
  <MainComment>{comment}</MainComment>
  <Label />
  <IsLadderSelected>true</IsLadderSelected>
</RungEntity>"""

# Example usage:
rung = generate_m221_rung(
    inputs=[('%I0.0', 'START_BTN', 'NO'),
            ('%I0.1', 'STOP_BTN', 'NC')],
    output=('%Q0.0', 'MOTOR', 'Coil'),
    rung_name="Motor Control",
    comment="Start/Stop motor control"
)
```

### M221 Complete File Template

Always start with this structure:
```python
xml_content = f'''<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>{project_name}</Name>
  <FullName>{full_path}</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>

  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Main Program</Name>
        <SectionNumber>1</SectionNumber>
        <Rungs>
          <!-- Generated rungs go here -->
          {rung1_xml}
          {rung2_xml}
          ...
        </Rungs>
      </ProgramOrganizationUnits>
    </Pous>
    <!-- Timers, memory allocation, system bits -->
  </SoftwareConfiguration>

  <HardwareConfiguration>
    <Plc>
      <Cpu>
        <Reference>TM221CE40T</Reference>
        <!-- I/O configuration -->
      </Cpu>
    </Plc>
  </HardwareConfiguration>
</ProjectDescriptor>'''
```

**Complete Reference**: See `create_sequential_lights_smbp.py` for full working implementation with all sections.

## Usage Workflow

### Example 1: Read and Analyze .smbp File

**User Input:**
```
Read this Motor_Control.smbp file and explain the logic.
```

**Skill Actions:**
1. Detect format: `schneider_smbp`
2. Extract ZIP contents
3. Parse XML project structure
4. Identify ladder logic sections
5. Extract rungs, contacts, coils, timers
6. Present human-readable summary

**Output:**
```
Project: Motor_Control.smbp
Platform: Schneider M221 PLC
Controller: TM221CE24R

Ladder Logic Summary:
- Network 1: Motor Start/Stop Control
  - Rung 1: START button (%I0.0) AND NOT STOP button (%I0.1) AND MOTOR_RUN (%Q0.0) → MOTOR_RUN (%Q0.0)
  - Logic: Latching motor control with start/stop buttons

I/O Configuration:
- %I0.0: START_BTN (Digital Input)
- %I0.1: STOP_BTN (Digital Input)
- %Q0.0: MOTOR_RUN (Digital Output)

File ready for editing. What changes do you need?
```

### Example 2: Generate .smbp from Sketch

**User Input:**
```
[Uploads hand-drawn ladder diagram image]
Create an M221 .smbp file from this sketch.
```

**Skill Actions:**
1. Analyze image with Gemini Vision
2. Extract ladder logic elements
3. Create intermediate representation
4. Map to Schneider M221 instruction set
5. Generate XML project structure
6. Package into .smbp ZIP format
7. Validate file integrity

**Output:**
```
Sketch analyzed successfully!

Detected Logic:
- 3 rungs
- 5 inputs, 2 outputs, 1 timer
- Control logic: Conveyor belt with start/stop and safety interlock

Generated File: Conveyor_Control.smbp
Platform: Schneider M221 (EcoStruxure Machine Expert Basic)
Status: Ready to download and open in Machine Expert Basic

Tags Created:
- %I0.0: CONV_START (Start button)
- %I0.1: CONV_STOP (Stop button)
- %I0.2: SAFETY_GATE (Safety interlock)
- %I0.3: ESTOP (Emergency stop)
- %Q0.0: CONVEYOR_MOTOR (Motor output)
- %Q0.1: ALARM_LIGHT (Warning light)
- %TM0: STARTUP_DELAY (TON 5s)

File saved to: ./output/Conveyor_Control.smbp
```

### Example 3: Convert Between Platforms

**User Input:**
```
Convert this Schneider .smbp to Rockwell .L5X format for a CompactLogix PLC.
```

**Skill Actions:**
1. Parse .smbp file completely
2. Extract ladder logic to intermediate format
3. Map Schneider instructions to Rockwell equivalents:
   - %I → Local:1:I.Data
   - %Q → Local:2:O.Data
   - %M → Internal bits
   - Timers: adapt to Rockwell TON syntax
4. Generate Rockwell .L5X XML
5. Create tag database with proper scoping
6. Configure I/O modules

**Output:**
```
Platform conversion complete!

Source: Motor_Control.smbp (Schneider M221)
Target: Motor_Control.L5X (Rockwell CompactLogix)

Instruction Mapping:
- Contacts/Coils: Direct 1:1 mapping
- %I0.0 → Local:1:I.Data.0 (START_BTN)
- %Q0.0 → Local:2:O.Data.0 (MOTOR_RUN)

Tags: 12 tags created
Logic: 3 rungs converted
Status: Ready to import into Studio 5000

File saved to: ./output/Motor_Control.L5X
```

## Advanced Features

### 1. Multi-Language Support
- Ladder Diagram (LD) - primary focus
- Function Block Diagram (FBD) - for complex logic
- Structured Text (ST) - for algorithms
- Sequential Function Chart (SFC) - for state machines

### 2. Safety Validation
- Check for IEC 61508 compliance
- Verify safety interlock logic
- Detect potential race conditions
- Validate E-stop implementation

### 3. Optimization Suggestions
- Reduce scan time
- Minimize memory usage
- Simplify complex rungs
- Suggest best practices

### 4. Documentation Generation
- Auto-generate I/O lists
- Create wiring diagrams
- Export to PDF/Excel
- Generate user manuals

## Error Handling

### Corrupted Files
```python
try:
    parse_plc_file(file_path)
except zipfile.BadZipFile:
    return "Error: File is corrupted or not a valid archive"
except ET.ParseError:
    return "Error: XML structure is malformed"
except Exception as e:
    return f"Error: Unable to parse file - {str(e)}"
```

### Invalid Sketches
```python
if sketch_analysis['confidence'] < 0.7:
    return """
    Sketch clarity is low. Please:
    - Use darker pen/pencil
    - Draw clear contact symbols: —| |— (NO), —|/|— (NC)
    - Label all elements
    - Separate rungs clearly
    """
```

### Platform Incompatibilities
```python
if source_platform == 'siemens' and target_platform == 'schneider':
    warnings.append("Note: Siemens DB blocks don't have direct Schneider equivalent. Converting to %MW memory.")
```

## File Output Standards

### Always Include:
1. Complete project metadata (name, version, date)
2. All tag definitions with data types and comments
3. I/O configuration matching target controller
4. Ladder logic with proper rung numbering
5. Safety interlocks clearly marked
6. Documentation strings for all networks

### File Naming Convention:
```
{project_name}_{platform}_{version}_{date}.{ext}

Examples:
- Motor_Control_M221_v1.0_20250124.smbp
- Conveyor_System_CompactLogix_v2.1_20250124.L5X
- Tank_Filling_S71500_v1.0_20250124.zap16
```

### Version Management:
- Embed version in file metadata
- Auto-increment on modifications
- Maintain changelog within project

## Performance Requirements

- Parse files <10MB in <2 seconds
- Generate .smbp files in <5 seconds
- Sketch analysis in <10 seconds (Gemini API dependent)
- Support files up to 100MB (large projects)

## Quality Assurance

Before delivering any file:
1. ✓ Validate XML/binary structure
2. ✓ Verify all tags are defined
3. ✓ Check rung syntax correctness
4. ✓ Ensure I/O addresses don't conflict
5. ✓ Test file can be opened in target software (when possible)
6. ✓ Include comprehensive comments

## Dependencies Installation

```bash
# Python packages
pip install pillow olefile google-generativeai python-magic

# System tools (macOS)
brew install libmagic

# System tools (Windows)
# Install 7-Zip for archive handling
# Install Python 3.7+
```

## Security Considerations

- Never execute embedded code from PLC files
- Validate all file paths to prevent directory traversal
- Sanitize user inputs in tag names
- Warn if file contains suspicious binary patterns
- Scan for embedded malware signatures

## Limitations & Disclaimers

1. **Proprietary Format Access**: Some formats (like Siemens .ap*) are not fully documented. Best-effort parsing applied.

2. **Software Compatibility**: Generated files are tested for compatibility but vendor software updates may cause issues.

3. **Safety-Critical Applications**: All generated logic must be reviewed and tested by qualified engineers before deployment.

4. **Sketch Recognition**: AI vision accuracy depends on sketch quality. Complex diagrams may require manual review.

5. **Platform-Specific Features**: Some advanced features (PID blocks, motion control) may not translate perfectly between platforms.

## Success Criteria

User should be able to:
1. Upload any supported PLC file and get accurate analysis
2. Provide a sketch and receive a working PLC project file
3. Convert between platforms with 95%+ logic preservation
4. Edit files without needing vendor software
5. Generate production-ready files from text descriptions

## Continuous Improvement

After each file operation:
- Log format variations encountered
- Track parsing success rates
- Collect user feedback on accuracy
- Update parsers for new software versions
- Expand platform support based on demand

---

## M221 Knowledge Base Integration

**CRITICAL MANDATORY REFERENCES - USE THESE FOR ALL M221 TASKS**:

### Primary Templates (ALWAYS USE ONE OF THESE):
1. `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py` ⭐
   - Instruction List programming
   - 4 lights, 5 rungs, 3 timers
   - Template modification approach

2. `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py` ⭐
   - Ladder Diagram with dual representation
   - Visual ladder + IL code
   - 10-column grid layout

3. `/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py` ⭐
   - Simpler 3-light version
   - 4 rungs, 2 timers
   - Easier to adapt

### Knowledge Base:
- `m221-knowledge-base.md` - Complete patterns and XML structures

### Additional Examples:
- `create_sequential_lights_smbp.py` - Full XML from scratch (6 rungs)
- `create_sequential_lights_simple.py` - Minimal template modification
- `motor_startstop_tm221ce40t.py` - Motor control via API

**AGENT ACTIVATION**: When task mentions M221, TM221, Schneider, .smbp, sequential lights, or ladder logic → IMMEDIATELY read one of the three primary templates above.

**Before creating ANY M221 .smbp file**:
1. Read one of the three primary Python scripts above
2. Copy the exact code structure and patterns
3. Adapt only I/O addresses, symbols, and logic
4. Validate grid layout and dual representation
5. Test all timer configurations
6. Verify system bits/words inclusion

---

**Status**: Production Ready
**Version**: 1.2
**Last Updated**: 2025-12-24
**Maintainer**: PLCAutoPilot AI Team
**Changelog**:
- v1.2: Added MANDATORY M221 Python script references (3 primary templates), agent activation rules
- v1.1: Added complete M221 programming guide, rung generation patterns, knowledge base integration
- v1.0: Initial release with multi-platform support
