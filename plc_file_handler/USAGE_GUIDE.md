# PLC File Handler - Complete Usage Guide

## Table of Contents
1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Command Line Interface](#command-line-interface)
4. [Python API](#python-api)
5. [Workflow Examples](#workflow-examples)
6. [Advanced Usage](#advanced-usage)
7. [Troubleshooting](#troubleshooting)

---

## Installation

### Step 1: Install Python Dependencies

```bash
cd plc_file_handler
pip install -r requirements.txt
```

### Step 2: Set Environment Variables

```bash
# Required for sketch analysis
export GEMINI_API_KEY="your_gemini_api_key_here"

# Optional (for future features)
export OPENAI_API_KEY="your_openai_key_here"
```

Add to your `~/.bashrc` or `~/.zshrc` for persistence:

```bash
echo 'export GEMINI_API_KEY="your_key"' >> ~/.bashrc
source ~/.bashrc
```

### Step 3: Verify Installation

```bash
python cli.py formats
```

---

## Quick Start

### Generate Your First PLC File (5 minutes)

```bash
# Run the example motor control generator
cd examples
python example_generate_motor_control.py

# Output: Motor_StartStop_Control.smbp
```

Open the generated `.smbp` file in **EcoStruxure Machine Expert Basic**.

---

## Command Line Interface

### 1. Parse PLC Files

Extract and analyze existing PLC project files.

#### Parse Schneider .smbp File

```bash
python cli.py parse Motor_Control.smbp
```

**Output:**
```
Detected Format: schneider - machine_expert_basic

Schneider Electric Project Analysis
====================================
Project: Motor_Control
Platform: schneider_m221
Controller: TM221CE24R
Version: 1.0

Tags/Variables: 5
I/O Modules: 2
Ladder Logic Files: 1

Tag Summary:
  - %I0.0: START_BTN (BOOL) - Start push button
  - %I0.1: STOP_BTN (BOOL) - Stop push button
  - %Q0.0: MOTOR_RUN (BOOL) - Motor contactor
```

#### Export to JSON

```bash
python cli.py parse Motor_Control.smbp -o motor_project.json
```

#### Parse Rockwell .L5X File

```bash
python cli.py parse Motor_Control.L5X -o rockwell_project.json
```

---

### 2. Analyze Sketches (AI-Powered)

Convert hand-drawn ladder logic diagrams to structured data.

#### Basic Analysis

```bash
python cli.py analyze motor_sketch.jpg --platform schneider
```

**Requirements:**
- Clear sketch with visible ladder symbols
- Labeled elements (START, STOP, MOTOR, etc.)
- Good lighting/contrast

#### Save Analysis

```bash
python cli.py analyze conveyor_diagram.png \\
    --platform rockwell \\
    -o conveyor_analysis.json
```

#### Sketch Quality Tips

For best results:
1. Use dark pen/pencil (black recommended)
2. Draw standard symbols:
   - NO contact: `—| |—`
   - NC contact: `—|/|—`
   - Coil: `—( )—`
3. Label all elements clearly
4. Separate rungs with horizontal lines
5. Number rungs 0, 1, 2, ...

---

### 3. Generate PLC Files

Create production-ready PLC project files.

#### From Sketch

```bash
python cli.py generate \\
    --platform schneider \\
    --name "Conveyor_Control" \\
    --controller "TM221CE24R" \\
    --from-sketch conveyor_sketch.jpg \\
    -o Conveyor_Control.smbp
```

#### From JSON

```bash
python cli.py generate \\
    --platform schneider \\
    --name "Tank_Control" \\
    --from-json tank_logic.json \\
    -o Tank_Control.smbp
```

#### Rockwell Platform

```bash
python cli.py generate \\
    --platform rockwell \\
    --name "Motor_Control" \\
    --controller "1769-L33ER" \\
    --from-sketch motor_sketch.jpg \\
    -o Motor_Control.L5X
```

---

### 4. Convert Between Platforms

Translate projects between different PLC vendors.

#### Schneider → Rockwell

```bash
python cli.py convert Motor_Control.smbp \\
    --target rockwell \\
    -o Motor_Control.L5X
```

**Conversion Notes:**
- Address mapping: `%I0.0` → `Local:1:I.Data[0].0`
- Timer format: `T#5s` → `5000` (milliseconds)
- Memory bits: `%M0` → `Memory_Bit_0`

#### Rockwell → Schneider

```bash
python cli.py convert Pump_Control.L5X \\
    --target schneider \\
    -o Pump_Control.smbp
```

---

### 5. List Supported Formats

```bash
python cli.py formats
```

**Output:**
```
Supported PLC File Formats:
============================================================

SCHNEIDER:
  - .smbp
  - .xml

ROCKWELL:
  - .acd
  - .l5x
  - .l5k

SIEMENS:
  - .ap15, .ap16, .ap17, .ap18, .ap19
  - .zap15, .zap16, .zap17
  - .scl

MITSUBISHI:
  - .gxw
  - .gx2
  - .gx3
```

---

## Python API

### Example 1: Parse and Analyze

```python
from plc_file_handler import SchneiderParser

# Parse file
parser = SchneiderParser("Motor_Control.smbp")
project = parser.parse()

# Display summary
print(parser.get_summary())

# Access data
print(f"Project name: {project['project_name']}")
print(f"Controller: {project['controller']}")

# Get specific tags
bool_tags = parser.get_tags_by_type('BOOL')
print(f"Found {len(bool_tags)} BOOL tags")

# Export
parser.export_to_json("export.json")
```

---

### Example 2: AI Sketch Analysis

```python
from plc_file_handler import SketchAnalyzer
import os

# Initialize (uses GEMINI_API_KEY from environment)
analyzer = SketchAnalyzer()

# Analyze sketch
analysis = analyzer.analyze_sketch(
    image_path="conveyor_sketch.jpg",
    platform="schneider"
)

# Check confidence
confidence = analysis.get('confidence', 0)
print(f"Analysis confidence: {confidence:.1%}")

if confidence > 0.7:
    print("High confidence - ready for generation")

    # Get summary
    print(analyzer.get_summary(analysis))

    # Validate
    errors = analyzer.validate_analysis(analysis)
    if errors:
        print("Validation errors:", errors)
    else:
        print("Validation passed!")

    # Export
    analyzer.export_analysis(analysis, "conveyor_analysis.json")
else:
    print("Low confidence - review sketch quality")
```

---

### Example 3: Generate from Scratch

```python
from plc_file_handler import SchneiderGenerator

# Create generator
gen = SchneiderGenerator(
    project_name="Traffic_Light_Control",
    controller="TM221CE24R"
)

# Add tags
gen.add_tag("RED_LIGHT", "%Q0.0", "BOOL", "Red traffic light")
gen.add_tag("YELLOW_LIGHT", "%Q0.1", "BOOL", "Yellow traffic light")
gen.add_tag("GREEN_LIGHT", "%Q0.2", "BOOL", "Green traffic light")
gen.add_tag("RED_TIMER", "%TM0", "TON", "Red light timer")
gen.add_tag("GREEN_TIMER", "%TM1", "TON", "Green light timer")

# Add ladder logic
# Rung 0: Red light with timer
gen.add_rung(
    rung_number=0,
    comment="Red light on for 30 seconds",
    elements=[
        {"type": "contact_no", "address": "%Q0.0", "label": "RED_LIGHT"},
        {"type": "timer_ton", "address": "%TM0", "preset": "T#30s"},
        {"type": "contact_no", "address": "%TM0.Q", "label": "RED_DONE"},
        {"type": "coil_reset", "address": "%Q0.0"},
        {"type": "coil_set", "address": "%Q0.2"}
    ]
)

# Add I/O
gen.add_io_module("DO", "%Q0", 8)

# Generate
gen.generate("Traffic_Light_Control.smbp")
```

---

### Example 4: Sketch to PLC (Complete Workflow)

```python
from plc_file_handler import SketchAnalyzer, SchneiderGenerator

# Step 1: Analyze sketch
analyzer = SketchAnalyzer()
analysis = analyzer.analyze_sketch(
    "pump_control_sketch.jpg",
    platform="schneider"
)

# Step 2: Validate
errors = analyzer.validate_analysis(analysis)
if errors:
    print("Errors found:", errors)
    exit(1)

# Step 3: Generate PLC file
gen = SchneiderGenerator(
    project_name="Pump_Control",
    controller="TM241CE24R"
)

gen.from_sketch_analysis(analysis)

gen.generate("Pump_Control.smbp")

print("Success! Sketch converted to .smbp file")
```

---

### Example 5: Platform Conversion

```python
from plc_file_handler import (
    SchneiderParser,
    PlatformConverter,
    RockwellGenerator
)

# Parse Schneider project
parser = SchneiderParser("Motor_Control.smbp")
schneider_project = parser.parse()

# Convert to Rockwell
converter = PlatformConverter('schneider', 'rockwell')
rockwell_project = converter.convert_project(schneider_project)

# Show conversion notes
notes = converter.get_conversion_notes()
print("Conversion notes:")
for note in notes:
    print(f"  - {note}")

# Would generate Rockwell file here
# (RockwellGenerator.from_project() needs implementation)
```

---

## Workflow Examples

### Workflow 1: Rapid Prototyping

**Goal:** Quickly test a control idea

1. **Sketch** your logic on paper
2. **Photo** the sketch with phone
3. **Analyze**:
   ```bash
   python cli.py analyze my_sketch.jpg --platform schneider -o analysis.json
   ```
4. **Review** the analysis JSON
5. **Generate**:
   ```bash
   python cli.py generate --platform schneider --name "MyTest" \\
       --from-sketch my_sketch.jpg -o MyTest.smbp
   ```
6. **Test** in PLC software simulator

**Time saved:** From hours to minutes!

---

### Workflow 2: Legacy System Migration

**Goal:** Move from Schneider to Rockwell

1. **Export** existing project (if needed)
2. **Convert**:
   ```bash
   python cli.py convert OldSystem.smbp --target rockwell -o NewSystem.L5X
   ```
3. **Import** to Studio 5000
4. **Review** conversion notes
5. **Test** thoroughly
6. **Adjust** platform-specific features

---

### Workflow 3: Documentation and Archiving

**Goal:** Create searchable PLC project database

1. **Parse** all projects:
   ```bash
   for file in *.smbp; do
       python cli.py parse "$file" -o "${file%.smbp}.json"
   done
   ```
2. **Index** JSON files in database
3. **Search** by tags, rungs, I/O configuration
4. **Version control** with Git

---

### Workflow 4: Multi-Platform Development

**Goal:** Deploy same logic to different PLCs

1. **Design** in neutral format (JSON)
2. **Generate** for each platform:
   ```python
   from plc_file_handler import SchneiderGenerator, RockwellGenerator

   # Load common logic
   import json
   with open('common_logic.json') as f:
       logic = json.load(f)

   # Generate Schneider
   gen_sch = SchneiderGenerator()
   gen_sch.from_json('common_logic.json')
   gen_sch.generate('Project_Schneider.smbp')

   # Generate Rockwell
   gen_rock = RockwellGenerator()
   # ... load and generate ...
   ```
3. **Test** on each platform
4. **Maintain** single source of truth

---

## Advanced Usage

### Custom Ladder Elements

```python
gen = SchneiderGenerator("Advanced_Example", "TM221CE24R")

# Complex rung with multiple branches
gen.add_rung(
    rung_number=0,
    comment="Multi-condition safety interlock",
    elements=[
        # Main path
        {"type": "contact_no", "address": "%I0.0", "label": "START"},
        {"type": "contact_nc", "address": "%I0.1", "label": "ESTOP"},

        # Parallel branch (OR condition)
        {"type": "contact_no", "address": "%I0.2", "label": "AUTO_MODE", "branch": 1},
        {"type": "contact_no", "address": "%I0.3", "label": "MANUAL_MODE", "branch": 1},

        # Timer
        {"type": "timer_ton", "address": "%TM0", "preset": "T#5s"},

        # Output
        {"type": "coil", "address": "%Q0.0", "label": "SYSTEM_RUN"}
    ]
)
```

### Batch Processing

```python
import os
from plc_file_handler import SchneiderParser

# Parse all .smbp files in directory
for filename in os.listdir('.'):
    if filename.endswith('.smbp'):
        try:
            parser = SchneiderParser(filename)
            project = parser.parse()

            # Extract stats
            tag_count = len(project['tags'])
            rung_count = len(project.get('ladder_logic', []))

            print(f"{filename}: {tag_count} tags, {rung_count} rungs")

        except Exception as e:
            print(f"Error parsing {filename}: {e}")
```

---

## Troubleshooting

### Issue: "GEMINI_API_KEY not found"

**Solution:**
```bash
export GEMINI_API_KEY="your_actual_key_here"

# Verify
echo $GEMINI_API_KEY
```

### Issue: Low Sketch Analysis Confidence

**Problem:** Confidence < 50%

**Solutions:**
1. Improve sketch quality:
   - Use darker pen (black Sharpie ideal)
   - Draw on white paper
   - Ensure good lighting

2. Use standard symbols exactly:
   ```
   NO contact:  —| |—
   NC contact:  —|/|—
   Coil:        —( )—
   ```

3. Label everything clearly

4. Redraw and re-analyze

### Issue: "Module not found" Error

**Solution:**
```bash
# Install missing dependencies
pip install google-generativeai pillow

# If using system Python, might need
pip3 install google-generativeai pillow
```

### Issue: Generated File Won't Open

**Possible Causes:**
1. File format not fully compatible (proprietary formats are complex)
2. Missing required project elements

**Solution:**
1. Try re-generating with more complete data
2. Check error messages in PLC software
3. Manually adjust in vendor software

### Issue: Platform Conversion Incomplete

**Problem:** Some features don't translate

**Solution:**
1. Review conversion notes:
   ```python
   notes = converter.get_conversion_notes()
   ```
2. Manually adjust platform-specific features
3. Test in simulation before deployment

---

## Best Practices

### 1. Always Test in Simulation First

Never deploy generated code directly to production.

```
Sketch → Generate → Import → Simulate → Test → Deploy
```

### 2. Version Control Your Projects

```bash
git init
git add *.smbp *.json
git commit -m "Initial PLC project"
```

### 3. Document Conversion Notes

When converting platforms:
```python
notes = converter.get_conversion_notes()

with open('conversion_notes.txt', 'w') as f:
    for note in notes:
        f.write(f"{note}\n")
```

### 4. Validate Before Deployment

```python
# Always validate sketch analysis
errors = analyzer.validate_analysis(analysis)
assert len(errors) == 0, f"Validation failed: {errors}"
```

### 5. Back Up Original Files

```bash
cp original.smbp original.smbp.backup
```

---

## Support and Resources

- **Skill Documentation:** `.claude/skills/plc-file-handler.md`
- **API Reference:** `README.md`
- **Examples:** `examples/` directory
- **Issues:** https://github.com/chatgptnotes/plcautopilot.com/issues

---

**Version:** 1.0.0
**Last Updated:** 2025-12-24
**Maintainer:** PLCAutoPilot Team
