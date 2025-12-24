# PLC File Handler - Quick Start

Get started in 5 minutes!

## Installation

```bash
cd plc_file_handler
pip install -r requirements.txt
export GEMINI_API_KEY="your_gemini_api_key"
```

## 1. Generate Your First PLC File

```bash
cd examples
python example_generate_motor_control.py
```

**Output:** `Motor_StartStop_Control.smbp`

Open in **EcoStruxure Machine Expert Basic**

## 2. Analyze a Sketch

```bash
# Take a photo of your hand-drawn ladder diagram
python cli.py analyze my_ladder_sketch.jpg --platform schneider
```

## 3. Generate .smbp from Sketch

```bash
python cli.py generate \
    --platform schneider \
    --name "My_Control" \
    --from-sketch my_ladder_sketch.jpg \
    -o My_Control.smbp
```

## 4. Parse Existing File

```bash
python cli.py parse existing_project.smbp -o project_data.json
```

## 5. Convert Between Platforms

```bash
python cli.py convert schneider_project.smbp \
    --target rockwell \
    -o rockwell_project.L5X
```

## Python API

```python
from plc_file_handler import SketchAnalyzer, SchneiderGenerator

# Analyze sketch
analyzer = SketchAnalyzer()
analysis = analyzer.analyze_sketch("sketch.jpg", "schneider")

# Generate PLC file
gen = SchneiderGenerator("Project_Name", "TM221CE24R")
gen.from_sketch_analysis(analysis)
gen.generate("output.smbp")
```

## Common Commands

```bash
# List supported formats
python cli.py formats

# Help
python cli.py --help
python cli.py parse --help
python cli.py analyze --help
```

## Sketch Tips

For best AI recognition:
- Use **dark pen** on white paper
- Draw **standard symbols**: `—| |—` (NO), `—|/|—` (NC), `—( )—` (Coil)
- **Label everything** clearly
- **Number rungs** 0, 1, 2, ...

## Next Steps

- Read [USAGE_GUIDE.md](USAGE_GUIDE.md) for complete workflows
- See [README.md](README.md) for API reference
- Check `.claude/skills/plc-file-handler.md` for skill details

---

**Need help?** See troubleshooting in USAGE_GUIDE.md
