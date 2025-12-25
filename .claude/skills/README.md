# PLCAutoPilot Skills Library
## Complete Reference for All Supported PLC Platforms

---

## Overview

This directory contains expert AI skills for programming all major PLC platforms. Each skill provides templates, patterns, and automation for specific controller families.

**Total Coverage**: 500+ PLC brands through platform-specific and CODESYS universal skills

---

## Skill Index

### Schneider Electric Skills

**1. schneider.md** - M221 Controller Skill ⭐ **PRIMARY**
- **Controllers**: M221 series (TM221CE24T, TM221CE40T, etc.)
- **Version**: 1.2
- **File Format**: .smbp (single XML)
- **Mandatory Templates**:
  - `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_IL.py`
  - `/Users/murali/1backup/plcautopilot.com/create_sequential_4lights_LD.py`
  - `/Users/murali/1backup/plcautopilot.com/create_sequential_lights_IL.py`
- **Use For**: Simple sequential control, timers, basic I/O
- **Activation**: M221, TM221, sequential lights, ladder logic

**2. schneider-m241.md** - M241/M251/M258 Controller Skill
- **Controllers**: M241, M251, M258 series
- **Version**: 1.0
- **File Format**: .smbp (ZIP archive)
- **Features**: Ethernet, Modbus TCP, PID control, CANopen
- **Use For**: Network communication, analog control, distributed I/O
- **Activation**: M241, M251, M258, Modbus TCP, PID

**3. m221-knowledge-base.md** - M221 Complete Reference
- Complete XML schemas
- I/O addressing guide
- Timer patterns
- Grid layout system
- Working examples

**4. M221-AGENT-ACTIVATION.md** - Automation Rules
- Trigger keywords
- Script selection logic
- Validation checklists

---

### Siemens Skills

**5. siemens-s7.md** - S7-1200/S7-1500 Controller Skill
- **Controllers**: S7-1200, S7-1500, S7-300, S7-400
- **Version**: 1.0
- **File Format**: .ap15, .ap16, .ap17, .ap18, .ap19
- **Software**: TIA Portal with Openness API
- **Features**: PROFINET, PID, IEC timers, data blocks
- **Use For**: Industrial automation, PROFINET networks, complex control
- **Activation**: Siemens, S7-1200, S7-1500, TIA Portal, PROFINET
- **Market**: 35% global, #1 in Europe

---

### Rockwell/Allen-Bradley Skills

**6. rockwell-allen-bradley.md** - ControlLogix/CompactLogix Skill
- **Controllers**: ControlLogix, CompactLogix, MicroLogix
- **Version**: 1.0
- **File Format**: .ACD (Archive)
- **Software**: Studio 5000 with FactoryTalk SDK
- **Features**: Tag-based programming, EtherNet/IP, AOI
- **Use For**: North American plants, tag-based systems, EtherNet/IP
- **Activation**: ControlLogix, CompactLogix, Rockwell, Studio 5000
- **Market**: 25% global, **50%+ North America**

---

### PLC File Handler

**7. plc-file-handler.md** - Universal File Format Handler
- **Version**: 1.2
- **Supports**: All formats (.smbp, .apXX, .ACD, etc.)
- **Features**: Read, parse, generate, validate
- **M221 Integration**: Complete with mandatory script references
- **Use For**: File format conversion, validation, generation

---

### Project Management

**8. AUTONOMY.md** - Full Autonomy Configuration
- Auto-confirm settings
- /proceed command
- Approved operations
- Safety features

---

## Platform Comparison

### Market Share
| Platform | Global % | Regions |
|----------|----------|---------|
| Siemens | 35% | Europe (leader), Global |
| Rockwell | 25% | North America (50%+) |
| Schneider | 15% | Europe, Asia, Middle East |
| Mitsubishi | 15% | Asia (40%+), Global |
| CODESYS | N/A | 500+ brands |

### File Formats
| Platform | Format | Structure | SDK Required |
|----------|--------|-----------|--------------|
| Schneider M221 | .smbp | Single XML | No |
| Schneider M241+ | .smbp | ZIP archive | Optional |
| Siemens | .apXX | Proprietary ZIP | Yes (Openness) |
| Rockwell | .ACD | Proprietary binary | Yes (FactoryTalk) |
| Mitsubishi | .gx3 | Proprietary | Yes |
| CODESYS | .project | XML | No |

### Programming Languages
| Platform | Primary | Secondary |
|----------|---------|-----------|
| Schneider | LD, IL | SFC, ST, FBD |
| Siemens | LAD | FBD, SCL, STL, GRAPH |
| Rockwell | Ladder | ST, FBD, SFC |
| Mitsubishi | LD | ST, SFC |
| CODESYS | All IEC 61131-3 | All 5 languages |

---

## Usage Guide

### Step 1: Identify PLC Platform
Determine which PLC the user is working with:
- Schneider M221 → `schneider.md` + M221 templates
- Schneider M241 → `schneider-m241.md`
- Siemens S7 → `siemens-s7.md`
- Rockwell → `rockwell-allen-bradley.md`

### Step 2: Load Appropriate Skill
Read the skill file for that platform to understand:
- File format structure
- Addressing system
- Programming patterns
- Required templates

### Step 3: Use Mandatory Templates
For M221, ALWAYS read one of the three primary Python scripts:
1. `create_sequential_4lights_IL.py` (IL version, 4 lights)
2. `create_sequential_4lights_LD.py` (Ladder version, 4 lights)
3. `create_sequential_lights_IL.py` (Simple 3-light version)

For other platforms, refer to skill-specific templates (to be created).

### Step 4: Generate PLC Program
Use templates and patterns to generate production-ready code.

### Step 5: Validate
Check against platform-specific validation checklist.

---

## Activation Keywords

### Schneider M221
- M221, TM221, TM221CE24T, TM221CE40T
- Sequential lights, timer control
- .smbp file, SoMachine Basic

### Schneider M241
- M241, M251, M258, TM241, TM251, TM258
- Modbus TCP, Ethernet PLC, PID control

### Siemens
- S7-1200, S7-1500, S7-300, S7-400
- TIA Portal, PROFINET, LAD, SCL
- .ap15, .ap16, .ap17

### Rockwell
- ControlLogix, CompactLogix, MicroLogix
- Studio 5000, RSLogix 5000
- .ACD, EtherNet/IP, tag-based

---

## Development Roadmap

### Completed (v1.0)
- ✅ Schneider M221 with 3 working Python templates
- ✅ Schneider M241/M251/M258 skill
- ✅ Siemens S7-1200/S7-1500 skill
- ✅ Rockwell ControlLogix/CompactLogix skill
- ✅ M221 knowledge base
- ✅ Agent activation rules

### In Progress
- 🔄 Mitsubishi skill (iQ-R, FX, Q series)
- 🔄 CODESYS universal skill (500+ brands)
- 🔄 Python template creation for M241
- 🔄 Python template creation for Siemens
- 🔄 Python template creation for Rockwell

### Planned (v2.0)
- ⏳ Omron skill (NJ/NX series)
- ⏳ ABB skill (AC500 series)
- ⏳ Beckhoff skill (TwinCAT)
- ⏳ WAGO skill (PFC series)
- ⏳ Phoenix Contact skill (PLCnext)

---

## Quick Reference

### Which Skill to Use?

| User Says | Use Skill | Load Template |
|-----------|-----------|---------------|
| "M221 sequential lights" | schneider.md | create_sequential_4lights_IL.py |
| "M221 ladder program" | schneider.md | create_sequential_4lights_LD.py |
| "M241 Modbus TCP" | schneider-m241.md | (to be created) |
| "S7-1200 program" | siemens-s7.md | (to be created) |
| "CompactLogix ladder" | rockwell-allen-bradley.md | (to be created) |
| "CODESYS project" | (to be created) | (to be created) |

---

## Contributing

To add a new skill:
1. Create `[platform-name].md` in this directory
2. Include: Overview, Addressing, Templates, Patterns, Activation Rules
3. Add Python template scripts to `/plc_automation/`
4. Update this README.md with new skill entry
5. Test with real PLC programming tasks

---

## Version History

- **v1.1** (2025-12-24): Added Schneider M241, Siemens S7, Rockwell skills
- **v1.0** (2025-12-24): Initial M221 skill with 3 Python templates

---

**PLCAutoPilot Skills Library v1.1 | 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
