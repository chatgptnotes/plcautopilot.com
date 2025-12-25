# PLC Program Generation - Quick Reference Card

## Critical Timer Format ⚠️

**CORRECT** (BLK/END_BLK):
```
BLK   %TM0
LD    %M0
IN
OUT_BLK
LD    Q
ST    %Q0.1
END_BLK
```

**WRONG** (Don't use):
```
LD    %M0
IN    %TM0    ❌ ERROR!
```

## Essential Commands

### Generate Sequential Lights (Any Number)
```python
from plc_automation.plc_program_generator import PLCProgramGenerator

# Initialize
generator = PLCProgramGenerator("template.smbp")

# Generate N lights
generator.generate_sequential_lights(
    output_path="output.smbp",
    num_lights=5,              # Any number 2+
    delay_seconds=3,           # Delay between lights
    use_ladder_diagram=True    # True=LD, False=IL
)
```

### Standard I/O Mapping
```
%I0.0 - START_BTN
%I0.1 - STOP_BTN
%Q0.0 to %Q0.N-1 - LIGHT_1 to LIGHT_N
%TM0 to %TM(N-2) - Timers
%M0 - SEQUENCE_RUN flag
```

## Sequential Lights Formula

For N lights:
- **Rungs**: N + 1
- **Timers**: N - 1
- **Outputs**: N

## File Structure
```
Template → Modify sections → Output
  ├── Project name
  ├── Rungs section
  ├── I/O symbols
  └── Timer config
```

## Timer Configuration
```xml
<Timer>
  <Address>%TM0</Address>
  <Type>TON</Type>
  <TimeBase>TimeBase1s</TimeBase>
  <Preset>3</Preset>
</Timer>
```

## Ladder Elements
- `NormalContact` - `--[ ]--` (NO)
- `NegatedContact` - `--]/[--` (NC)
- `Coil` - `--( )--`
- `Timer` - Timer block
- `Line` - Connection line

## Key Rules
1. Always use template files
2. Use BLK/END_BLK for timers
3. Include both LD and IL
4. Test with small numbers first
5. Verify in EcoStruxure

## Common Errors
❌ `IN %TM0` - Wrong timer format
❌ Missing timer definitions
❌ Empty LadderElements with IsLadderSelected=true
❌ Relative file paths
❌ Wrong file encoding

## Quick Test
```bash
python create_sequential_4lights_LD.py
```

---
**See**: PLC_PROGRAM_GENERATION_MASTER_GUIDE.md for complete details
