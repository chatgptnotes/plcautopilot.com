# Schneider M241 PLC Programming Skill
## Expert Agent for M241/M251/M258 Controllers

---

## Overview

**Target Controllers**: M241, M251, M258 (Modicon M2xx series)
**Software**: EcoStruxure Machine Expert Basic
**File Format**: .smbp (ZIP-based archive, different from M221!)
**Programming Languages**: LD, IL, SFC, ST, FBD
**Standards**: IEC 61131-3, IEC 61508

---

## CRITICAL: M241 vs M221 Differences

### File Structure
**M221**: Single XML file
**M241/M251/M258**: ZIP archive containing multiple files

```
M241_Project.smbp (ZIP archive)
├── ProjectInfo.xml
├── Application/
│   ├── Program.xml
│   ├── Tasks.xml
│   └── Variables.xml
├── Hardware/
│   ├── Configuration.xml
│   └── IOMapping.xml
└── Libraries/
    └── References.xml
```

### Memory Differences
| Feature | M221 | M241/M251/M258 |
|---------|------|----------------|
| Memory Bits | %M0-%M511 | %M0-%M2047 |
| Memory Words | %MW0-%MW1999 | %MW0-%MW4999 |
| Timers | 255 | 512 |
| Digital I/O | 40 max | 264 max |
| Analog I/O | 2 | 14 |

### Programming Differences
- M241+ supports **Ethernet communication** (Modbus TCP/IP)
- M241+ supports **IEC 61850** protocol
- M241+ has **PID control** built-in
- M241+ supports **CANopen** communication

---

## MANDATORY Templates

**IMPORTANT**: M241 requires ZIP manipulation. Python scripts must:
1. Create temp directory
2. Generate XML files
3. ZIP into .smbp archive

### Primary Template (To Be Created)
**Location**: `/Users/murali/1backup/plcautopilot.com/plc_automation/create_sequential_m241.py`

**Pattern**:
```python
import zipfile
import os
from pathlib import Path

def create_m241_project(project_name, output_path):
    """Generate M241 .smbp project (ZIP archive)"""

    # Create temp directory
    temp_dir = Path(f"temp_{project_name}")
    temp_dir.mkdir(exist_ok=True)

    # Generate XML files
    create_project_info_xml(temp_dir)
    create_program_xml(temp_dir)
    create_hardware_xml(temp_dir)
    create_variables_xml(temp_dir)

    # Create ZIP archive
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, temp_dir)
                zipf.write(file_path, arcname)

    # Cleanup
    shutil.rmtree(temp_dir)

    return output_path
```

---

## I/O Addressing (M241/M251/M258)

### Digital Inputs
```
Format: %I0.0.x or %IX0.0.x
Range: %I0.0.0 to %I0.3.15 (up to 64 inputs per module)

Examples:
%I0.0.0 - Module 0, Channel 0, Bit 0
%I0.1.5 - Module 0, Channel 1, Bit 5
```

### Digital Outputs
```
Format: %Q0.0.x or %QX0.0.x
Range: %Q0.0.0 to %Q0.3.15

Examples:
%Q0.0.0 - Module 0, Channel 0, Bit 0
%Q0.1.7 - Module 0, Channel 1, Bit 7
```

### Analog Inputs
```
Format: %IW0.0.x
Range: 0-10000 (representing -10V to +10V or 4-20mA)

Examples:
%IW0.0.0 - First analog input
%IW0.0.1 - Second analog input
```

### Analog Outputs
```
Format: %QW0.0.x
Range: 0-10000

Examples:
%QW0.0.0 - First analog output
```

---

## Ethernet Communication (M241+)

### Modbus TCP/IP Master
```python
# M241 supports Modbus TCP/IP natively

# Configuration in XML:
<EthernetConfiguration>
  <IPAddress>192.168.1.10</IPAddress>
  <SubnetMask>255.255.255.0</SubnetMask>
  <Gateway>192.168.1.1</Gateway>
  <ModbusTCP>
    <Enabled>true</Enabled>
    <Port>502</Port>
  </ModbusTCP>
</EthernetConfiguration>
```

### Example: Modbus TCP Read
```
Function Block: READ_VAR
Connection: Modbus TCP
Slave Address: 1
Register: 40001
Data Type: INT
Destination: %MW100
```

---

## PID Control (M241+)

### PID Function Block
```xml
<FunctionBlock>
  <Type>PID</Type>
  <Instance>PID_TEMP_CTRL</Instance>
  <Parameters>
    <Setpoint>%MW100</Setpoint>
    <ProcessVariable>%IW0.0.0</ProcessVariable>
    <Output>%QW0.0.0</Output>
    <Kp>1.5</Kp>
    <Ki>0.1</Ki>
    <Kd>0.05</Kd>
  </Parameters>
</FunctionBlock>
```

---

## Working Examples (To Be Created)

### 1. Sequential Control with Ethernet
**File**: `create_sequential_m241_ethernet.py`
- Modbus TCP communication
- Remote I/O control
- Network diagnostics

### 2. Analog Control with PID
**File**: `create_pid_control_m241.py`
- Temperature control
- PID tuning
- Analog I/O scaling

### 3. CANopen Master
**File**: `create_canopen_m241.py`
- CANopen network setup
- Remote device configuration
- PDO mapping

---

## Activation Rules

**Trigger Keywords**:
- M241, M251, M258
- TM241, TM251, TM258
- Modbus TCP
- PID control
- CANopen
- Ethernet PLC

**Action**: Read appropriate M241 template script

---

## M241 Programming Checklist

- [ ] Use ZIP-based .smbp format (not single XML)
- [ ] Include all required XML files
- [ ] Configure Ethernet if needed
- [ ] Map I/O correctly (module.channel.bit format)
- [ ] Set up Modbus TCP if remote I/O
- [ ] Configure PID parameters if analog control
- [ ] Test network connectivity
- [ ] Verify CANopen configuration if used

---

## Version History

- **v1.0** (2025-12-24): Initial M241/M251/M258 skill creation

---

**PLCAutoPilot Schneider M241 Skill v1.0 | 2025-12-24 | github.com/chatgptnotes/plcautopilot.com**
