# PLC File Handler

Multi-platform PLC file format parser, editor, and generator with AI-powered sketch analysis.

## Features

### Supported Platforms

1. **Schneider Electric** (.smbp)
   - EcoStruxure Machine Expert Basic
   - Controllers: M221, M241, M251, M258, M340, M580
   - Full read/write support

2. **Rockwell/Allen-Bradley** (.L5X, .L5K, .ACD)
   - Studio 5000 Logix Designer
   - Controllers: ControlLogix, CompactLogix, FlexLogix
   - L5X (XML) read/write, ACD (binary) read-only

3. **Siemens** (.ap*, .zap*)
   - TIA Portal
   - Controllers: S7-1200, S7-1500, S7-300, S7-400
   - Basic support (limited by proprietary format)

4. **Mitsubishi** (.gxw, .gx2, .gx3)
   - GX Works2/3
   - Controllers: MELSEC-Q, MELSEC-L, MELSEC-F, iQ-R
   - Basic support (OLE2 format)

5. **CODESYS** (.project)
   - Universal platform (500+ brands)
   - Basic XML support

### Core Capabilities

1. **File Parsing**
   - Automatic format detection
   - Extract ladder logic, tags, I/O configuration
   - Human-readable summaries
   - JSON export

2. **File Generation**
   - Create native PLC files from structured data
   - Support for ladder logic elements (contacts, coils, timers, counters)
   - Automatic tag management
   - I/O configuration

3. **Sketch-to-Ladder Conversion** (AI-Powered)
   - Analyze hand-drawn ladder logic diagrams
   - Extract logic elements and connections
   - Generate production-ready PLC files
   - Uses Google Gemini AI vision

4. **Platform Conversion**
   - Convert projects between platforms
   - Automatic address mapping
   - Instruction translation
   - Data type conversion

## Installation

### Requirements

- Python 3.7+
- pip package manager

### Install Dependencies

```bash
pip install -r requirements.txt
```

Required packages:
- `pillow` - Image processing
- `google-generativeai` - AI vision for sketch analysis
- `python-magic` (optional) - Enhanced file type detection
- `olefile` (future) - Mitsubishi OLE2 parsing

### Environment Setup

Create `.env` file or set environment variables:

```bash
# Required for sketch analysis
export GEMINI_API_KEY=your_gemini_api_key_here

# Optional
export OPENAI_API_KEY=your_openai_key_here
```

## Quick Start

### 1. Parse a PLC File

```python
from plc_file_handler import SchneiderParser

# Parse .smbp file
parser = SchneiderParser("Motor_Control.smbp")
project = parser.parse()

# Get summary
print(parser.get_summary())

# Export to JSON
parser.export_to_json("project_export.json")
```

### 2. Analyze a Sketch

```python
from plc_file_handler import SketchAnalyzer

# Initialize analyzer
analyzer = SketchAnalyzer(api_key="your_gemini_key")

# Analyze hand-drawn ladder diagram
analysis = analyzer.analyze_sketch(
    "motor_sketch.jpg",
    platform="schneider"
)

# Get summary
print(analyzer.get_summary(analysis))

# Export analysis
analyzer.export_analysis(analysis, "analysis.json")
```

### 3. Generate PLC File from Sketch

```python
from plc_file_handler import SketchAnalyzer, SchneiderGenerator

# Analyze sketch
analyzer = SketchAnalyzer()
analysis = analyzer.analyze_sketch("conveyor_sketch.jpg")

# Create generator
gen = SchneiderGenerator(
    project_name="Conveyor_Control",
    controller="TM221CE24R"
)

# Load from sketch analysis
gen.from_sketch_analysis(analysis)

# Generate .smbp file
gen.generate("Conveyor_Control.smbp")
```

### 4. Convert Between Platforms

```python
from plc_file_handler import SchneiderParser, PlatformConverter, RockwellGenerator

# Parse source file
parser = SchneiderParser("Motor_Control.smbp")
schneider_project = parser.parse()

# Convert to Rockwell
converter = PlatformConverter('schneider', 'rockwell')
rockwell_project = converter.convert_project(schneider_project)

# Generate Rockwell file
gen = RockwellGenerator()
# ... populate from rockwell_project ...
gen.generate("Motor_Control.L5X")
```

## Usage Examples

### Example 1: Create Simple Motor Control

```python
from plc_file_handler import SchneiderGenerator

gen = SchneiderGenerator("Motor_StartStop", "TM221CE24R")

# Add tags
gen.add_tag("START_BTN", "%I0.0", "BOOL", "Start push button")
gen.add_tag("STOP_BTN", "%I0.1", "BOOL", "Stop push button")
gen.add_tag("MOTOR_RUN", "%Q0.0", "BOOL", "Motor contactor")

# Add ladder rung (latching logic)
gen.add_rung(
    rung_number=0,
    comment="Motor start/stop with latching",
    elements=[
        {"type": "contact_no", "address": "%I0.0", "label": "START_BTN"},
        {"type": "contact_nc", "address": "%I0.1", "label": "STOP_BTN"},
        {"type": "contact_no", "address": "%Q0.0", "label": "MOTOR_RUN"},
        {"type": "coil", "address": "%Q0.0", "label": "MOTOR_RUN"}
    ]
)

# Add I/O configuration
gen.add_io_module("DI", "%I0", 8)
gen.add_io_module("DO", "%Q0", 4)

# Generate file
gen.generate("Motor_StartStop.smbp")
```

### Example 2: Timer-Based Control

```python
gen = SchneiderGenerator("Timer_Example", "TM221CE24R")

# Tags
gen.add_tag("INPUT_SENSOR", "%I0.0", "BOOL", "Input sensor")
gen.add_tag("DELAY_TIMER", "%TM0", "TON", "5-second delay")
gen.add_tag("OUTPUT_VALVE", "%Q0.0", "BOOL", "Output valve")

# Rung with timer
gen.add_rung(
    rung_number=0,
    comment="Activate valve 5 seconds after sensor detects",
    elements=[
        {"type": "contact_no", "address": "%I0.0", "label": "INPUT_SENSOR"},
        {"type": "timer_ton", "address": "%TM0", "preset": "T#5s"},
        {"type": "contact_no", "address": "%TM0.Q", "label": "TIMER_DONE"},
        {"type": "coil", "address": "%Q0.0", "label": "OUTPUT_VALVE"}
    ]
)

gen.generate("Timer_Example.smbp")
```

### Example 3: Rockwell L5X Generation

```python
from plc_file_handler import RockwellGenerator

gen = RockwellGenerator("Motor_Control", "1769-L33ER")

# Add tags
gen.add_tag("START_BTN", "BOOL", "Controller", "Start button")
gen.add_tag("MOTOR_RUN", "BOOL", "Controller", "Motor output")

# Create logic text
logic = gen.from_elements([
    {"type": "contact_no", "label": "START_BTN"},
    {"type": "coil", "label": "MOTOR_RUN"}
])

gen.add_rung(0, logic, "Simple motor control")

gen.generate("Motor_Control.L5X")
```

## API Reference

### Parsers

#### SchneiderParser

```python
parser = SchneiderParser(file_path: str)
project = parser.parse() -> Dict
summary = parser.get_summary() -> str
parser.export_to_json(output_path: str)
tags = parser.get_tags_by_type(tag_type: str) -> List[Dict]
```

#### RockwellParser

```python
parser = RockwellParser(file_path: str)
project = parser.parse() -> Dict
summary = parser.get_summary() -> str
logic = parser.get_ladder_logic_text(program_name: str, routine_name: str) -> str
tag = parser.find_tag(tag_name: str) -> Optional[Dict]
```

### Generators

#### SchneiderGenerator

```python
gen = SchneiderGenerator(project_name: str, controller: str)
gen.add_tag(name: str, address: str, data_type: str, comment: str)
gen.add_rung(rung_number: int, elements: List[Dict], comment: str)
gen.add_io_module(module_type: str, address: str, channels: int)
gen.generate(output_path: str)
gen.from_sketch_analysis(analysis: Dict)
gen.from_json(json_path: str)
```

#### RockwellGenerator

```python
gen = RockwellGenerator(project_name: str, processor_type: str)
gen.add_tag(name: str, data_type: str, scope: str, comment: str, value: str)
gen.add_rung(rung_number: int, logic_text: str, comment: str)
gen.generate(output_path: str)
logic_text = gen.from_elements(elements: List[Dict]) -> str
```

### Analyzers

#### SketchAnalyzer

```python
analyzer = SketchAnalyzer(api_key: str, model: str)
analysis = analyzer.analyze_sketch(image_path: str, platform: str) -> Dict
summary = analyzer.get_summary(analysis: Dict) -> str
errors = analyzer.validate_analysis(analysis: Dict) -> List[str]
analyzer.export_analysis(analysis: Dict, output_path: str)
```

### Converters

#### PlatformConverter

```python
converter = PlatformConverter(source_platform: str, target_platform: str)
converted = converter.convert_project(project_data: Dict) -> Dict
tags = converter.convert_tags(tags: List[Dict]) -> List[Dict]
address = converter.convert_address(address: str) -> str
notes = converter.get_conversion_notes() -> List[str]
```

### Utilities

#### Format Detection

```python
from plc_file_handler.utils import detect_plc_format, get_supported_formats, is_supported_format

# Detect format
format_info = detect_plc_format("project.smbp")
print(f"Platform: {format_info.platform}")
print(f"Format: {format_info.format_type}")

# Check support
if is_supported_format("project.smbp"):
    print("Format supported!")

# List all supported formats
formats = get_supported_formats()
print(formats)
```

## Ladder Logic Element Types

### Contacts (Inputs)
- `contact_no` - Normally Open
- `contact_nc` - Normally Closed
- `contact_p` - Rising Edge
- `contact_n` - Falling Edge

### Coils (Outputs)
- `coil` - Standard coil
- `coil_neg` - Negated coil
- `coil_set` - Set (latch on)
- `coil_reset` - Reset (latch off)

### Timers
- `timer_ton` - On-Delay Timer
- `timer_tof` - Off-Delay Timer
- `timer_tp` - Pulse Timer
- `timer_rto` - Retentive Timer

### Counters
- `counter_ctu` - Count Up
- `counter_ctd` - Count Down
- `counter_ctud` - Count Up/Down

### Comparisons
- `compare_equ` - Equal
- `compare_neq` - Not Equal
- `compare_grt` - Greater Than
- `compare_les` - Less Than

### Math Operations
- `math_add` - Addition
- `math_sub` - Subtraction
- `math_mul` - Multiplication
- `math_div` - Division

## Platform-Specific Addressing

### Schneider Electric (IEC 61131-3)
- `%I` - Digital Inputs (%I0.0, %I0.1, ...)
- `%Q` - Digital Outputs (%Q0.0, %Q0.1, ...)
- `%M` - Memory Bits (%M0, %M1, ...)
- `%MW` - Memory Words (%MW0, %MW1, ...)
- `%TM` - Timers (%TM0, %TM1, ...)
- `%C` - Counters (%C0, %C1, ...)

### Rockwell/Allen-Bradley (Tag-Based)
- Tag names (no fixed addresses)
- `Local:1:I.Data[n]` - Local input
- `Local:2:O.Data[n]` - Local output
- User-defined tags

### Siemens (Absolute Addressing)
- `I` - Inputs (I0.0, I0.1, ...)
- `Q` - Outputs (Q0.0, Q0.1, ...)
- `M` - Memory (M0.0, M0.1, ...)
- `DB` - Data Blocks (DB1.DBX0.0, ...)
- `T` - Timers (T0, T1, ...)
- `C` - Counters (C0, C1, ...)

### Mitsubishi (Device Notation)
- `X` - Inputs (X0, X1, ...)
- `Y` - Outputs (Y0, Y1, ...)
- `M` - Memory (M0, M1, ...)
- `T` - Timers (T0, T1, ...)
- `C` - Counters (C0, C1, ...)

## Error Handling

All functions include comprehensive error handling:

```python
try:
    parser = SchneiderParser("project.smbp")
    project = parser.parse()
except FileNotFoundError:
    print("File not found")
except ValueError as e:
    print(f"Invalid format: {e}")
except Exception as e:
    print(f"Error: {e}")
```

## Limitations

1. **Proprietary Formats**
   - Siemens .ap* files are binary and not fully documented
   - Mitsubishi .gxw files require OLE2 parsing (partial support)
   - Some advanced features may not translate between platforms

2. **Sketch Analysis**
   - Accuracy depends on sketch quality
   - Complex diagrams may require manual review
   - AI confidence scores provided for validation

3. **Platform Conversion**
   - Some platform-specific features don't have equivalents
   - Manual review recommended for safety-critical applications
   - Advanced features (PID, motion control) may need adjustment

## Best Practices

1. **Always validate generated files** in target PLC software
2. **Review AI-analyzed sketches** before deployment
3. **Test ladder logic** in simulation before production
4. **Keep backups** of original files
5. **Document platform conversions** with notes
6. **Use version control** for PLC projects

## Troubleshooting

### Issue: Gemini API Error

```
Error: GEMINI_API_KEY not found
```

**Solution:** Set environment variable:
```bash
export GEMINI_API_KEY=your_key_here
```

### Issue: Import Error

```
ImportError: No module named 'google.generativeai'
```

**Solution:** Install dependencies:
```bash
pip install google-generativeai pillow
```

### Issue: File Format Not Recognized

```
ValueError: Unknown PLC file format
```

**Solution:** Check file extension and verify file is not corrupted.

### Issue: Low Sketch Analysis Confidence

**Solution:**
- Use darker pen/pencil
- Draw clear symbols
- Label all elements
- Separate rungs clearly
- Provide better lighting when photographing

## Contributing

Contributions welcome! Areas for improvement:

1. Enhanced Siemens parser (TIA Portal Openness integration)
2. Complete Mitsubishi OLE2 parsing
3. CODESYS full implementation
4. Additional platform support (Omron, ABB, etc.)
5. Improved sketch recognition accuracy

## License

MIT License - See LICENSE file

## Support

For issues, questions, or contributions:
- GitHub: https://github.com/chatgptnotes/plcautopilot.com
- Documentation: See `.claude/skills/plc-file-handler.md`

---

**Version:** 1.0.0
**Last Updated:** 2025-12-24
**Maintainer:** PLCAutoPilot Team
