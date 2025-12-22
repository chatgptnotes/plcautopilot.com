# Motor Start/Stop PLC Application - TM221CE24T

## Automation Complete!

The AI agent has automatically programmed a **Motor Start/Stop Application** for your **Schneider Electric TM221CE24T PLC** using EcoStruxure Machine Expert Basic.

---

## What Was Automated

### 1. Software Launch
- Opened EcoStruxure Machine Expert Basic

### 2. Project Creation
- Created new project: **"MotorStartStop"**
- Selected PLC model: **TM221CE24T**

### 3. Ladder Logic Programming
- Programmed complete motor start/stop logic with seal-in circuit
- Compiled the program
- Saved the project

---

## Program Details

### I/O Configuration

| Address | Type | Description | Contact Type |
|---------|------|-------------|--------------|
| %I0.0 | Digital Input | Start Button | Normally Open (NO) |
| %I0.1 | Digital Input | Stop Button | Normally Closed (NC) |
| %Q0.0 | Digital Output | Motor Contactor | Coil |

### Ladder Logic Diagram

```
Rung 1: Motor Start/Stop Control with Seal-in
┌─────────────────────────────────────────────────┐
│                                                 │
│  %I0.0    %I0.1                         %Q0.0   │
│ ─┤ ├───────┤/├─────────────────────────( )─    │
│  Start    Stop                          Motor   │
│                                           │     │
│  %Q0.0                                    │     │
│ ─┤ ├─────────────────────────────────────┘     │
│  Motor                                          │
│  (Seal-in)                                      │
│                                                 │
└─────────────────────────────────────────────────┘

Legend:
─┤ ├─   = Normally Open Contact
─┤/├─   = Normally Closed Contact
─( )─   = Output Coil
```

---

## How It Works

### Operation Sequence

1. **Motor Start**
   - Press the Start button (%I0.0)
   - Current flows through Start contact and Stop contact (NC)
   - Motor contactor (%Q0.0) energizes
   - Motor starts running

2. **Self-Holding (Seal-in)**
   - When motor output %Q0.0 is ON
   - The seal-in contact %Q0.0 (parallel to Start) closes
   - Motor remains running even after Start button is released

3. **Motor Stop**
   - Press the Stop button (%I0.1)
   - Stop contact (NC) opens
   - Motor contactor (%Q0.0) de-energizes
   - Motor stops

4. **Safety Feature**
   - Stop button has priority (NC contact in series)
   - If Stop is pressed, motor cannot start
   - Ensures safe operation

---

## Wiring Diagram

### Field Wiring to TM221CE24T

```
┌─────────────────────────────────────────┐
│      TM221CE24T PLC                     │
├─────────────────────────────────────────┤
│                                         │
│  Digital Inputs:                        │
│  ┌────────┐                             │
│  │ %I0.0  ├─── Start Button (NO) ───┐  │
│  ├────────┤                          │  │
│  │ %I0.1  ├─── Stop Button (NC) ────┤  │
│  ├────────┤                          │  │
│  │  COM   ├──────────────────────────┘  │
│  └────────┘                             │
│                                         │
│  Digital Outputs:                       │
│  ┌────────┐                             │
│  │ %Q0.0  ├─── Motor Contactor Coil    │
│  ├────────┤                             │
│  │  COM   ├─── Common                   │
│  └────────┘                             │
│                                         │
│  Power Supply: 24VDC                    │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Note: Always follow electrical safety standards and
local regulations when wiring PLCs and motors.
```

---

## Next Steps

### 1. Verify the Program
- Open EcoStruxure Machine Expert Basic
- Review the ladder logic in the project
- Check for any compilation errors

### 2. Download to PLC
- Connect your PC to the TM221CE24T PLC
- Use the communication cable (USB or Serial)
- Click **Download** or **Transfer** in the software
- Select your connection type
- Download the program to PLC

### 3. Test the Application
- Connect start button to %I0.0
- Connect stop button to %I0.1
- Connect motor contactor to %Q0.0
- Power on the PLC
- Test start/stop operation

### 4. Safety Considerations
- Install emergency stop button (separate from normal stop)
- Add motor overload protection
- Ensure proper grounding
- Follow NEC/IEC standards

---

## Program Enhancements (Optional)

You can enhance this basic program by adding:

### 1. Indicator Lights
```
%Q0.1 = Motor Running Indicator (Green LED)
%Q0.2 = Motor Stopped Indicator (Red LED)
```

### 2. Overload Protection
```
%I0.2 = Thermal Overload Contact (NC)
Add in series with Stop button
```

### 3. Timer for Auto-Stop
```
Use TON (Timer On Delay)
Auto-stop motor after specified time
```

### 4. Fault Detection
```
%M0 = Fault Memory Bit
%I0.3 = Fault Reset Button
```

---

## Troubleshooting

### Motor Won't Start
- Check Start button wiring to %I0.0
- Verify Stop button is not pressed
- Check PLC power supply
- Verify program downloaded successfully

### Motor Won't Stop
- Check Stop button wiring to %I0.1
- Verify NC (Normally Closed) wiring
- Check motor contactor operation

### Program Compilation Errors
- Verify I/O addresses match your PLC model
- Check ladder logic syntax
- Review error messages in output window

---

## Technical Specifications

**PLC Model:** Schneider Electric TM221CE24T

**Key Features:**
- 14 Digital Inputs (24VDC)
- 10 Relay Outputs
- 2 Analog Inputs
- Compact design
- Built-in Ethernet port

**Programming Software:**
- EcoStruxure Machine Expert Basic (formerly SoMachine Basic)

---

## Files Created

1. `program_motor_startstop.py` - Automation script
2. `open_ecostruxure.py` - Software launcher
3. `desktop_ai_agent.py` - Core automation agent
4. `MotorStartStop.smbp` - PLC project file (in software)

---

## Re-run the Automation

To run the automation again:

```bash
python program_motor_startstop.py
```

Or to just open the software:

```bash
python open_ecostruxure.py
```

---

## Support & Resources

**Schneider Electric Resources:**
- TM221CE24T User Manual
- EcoStruxure Machine Expert Basic Help
- Schneider Electric Support Portal

**Ladder Logic Reference:**
- IEC 61131-3 Standard
- PLC Programming Basics

---

## Safety Warning

This is an automated program for educational and development purposes.
Always:
- Follow electrical safety standards
- Test thoroughly before production use
- Add proper safety circuits (E-stops, interlocks)
- Comply with local electrical codes
- Have qualified personnel review the installation

---

**Programmed by:** Desktop AI Agent
**Date:** 2025-12-21
**PLC:** TM221CE24T
**Application:** Motor Start/Stop Control

---
