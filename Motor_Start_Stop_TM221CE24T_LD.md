# Motor Start/Stop Program - TM221CE24T PLC
## EcoStruxure Machine Expert Basic - Ladder Diagram (LD)

---

## Project Overview

**Controller**: Modicon TM221CE24T (24 I/O Logic Controller)
**Programming Language**: Ladder Diagram (LD)
**Application**: Basic Motor Start/Stop Control with Safety Stop
**Software**: EcoStruxure Machine Expert Basic

---

## Hardware Specifications - TM221CE24T

- **14 Digital Inputs**: 24V DC
- **10 Digital Outputs**: Relay type
- **Power Supply**: 24V DC
- **Communication**: USB, Serial

---

## I/O Assignment

### Inputs
| Address | Symbol | Description | Type |
|---------|---------|-------------|------|
| %I0.0 | START_PB | Start Push Button (NO) | Digital Input |
| %I0.1 | STOP_PB | Stop Push Button (NC) | Digital Input |
| %I0.2 | MOTOR_OL | Motor Overload Relay (NC) | Digital Input |
| %I0.3 | E_STOP | Emergency Stop (NC) | Digital Input |

### Outputs
| Address | Symbol | Description | Type |
|---------|---------|-------------|------|
| %Q0.0 | MOTOR_RUN | Motor Contactor | Digital Output |
| %Q0.1 | RUN_LAMP | Running Indicator (Green) | Digital Output |
| %Q0.2 | STOP_LAMP | Stopped Indicator (Red) | Digital Output |

### Internal Memory
| Address | Symbol | Description | Type |
|---------|---------|-------------|------|
| %M0 | MOTOR_CMD | Motor Command Memory | Memory Bit |

---

## Program Logic Description

This program implements a standard motor start/stop control with the following features:

1. **Start Function**: Pressing START_PB starts the motor
2. **Seal-In (Latching)**: Motor continues running after START_PB is released
3. **Stop Function**: Pressing STOP_PB stops the motor
4. **Safety Interlocks**:
   - Emergency stop immediately stops motor
   - Motor overload protection trips motor
5. **Status Indication**:
   - Green lamp when motor is running
   - Red lamp when motor is stopped

### Control Philosophy
- **Stop has priority over Start** (safety requirement)
- All stop conditions are normally closed (NC) contacts
- Motor seal-in circuit maintains operation
- Any safety condition breaking stops the motor immediately

---

## Ladder Diagram Program

### Network 1: Motor Control Logic
```
(* Motor Start/Stop with Safety Interlocks *)

Rung 1: Motor Control
|
|  %I0.1      %I0.2       %I0.3      %I0.0        %M0        %Q0.0
|--] [--------] [---------] [---------| |---------] [---------( )--
|  STOP_PB    MOTOR_OL    E_STOP    START_PB    MOTOR_CMD   MOTOR_RUN
|                                       |                      |
|                                       |         %Q0.0        |
|                                       +---------] |---------+
|                                                 MOTOR_RUN
|                                              (Seal-in contact)
```

**Explanation**:
- **Series Contacts** (STOP_PB, MOTOR_OL, E_STOP): All safety conditions must be satisfied (closed)
- **Parallel Branch**: START_PB initiates, MOTOR_RUN seals in the circuit
- **Output Coil** (MOTOR_RUN): Energizes motor contactor when conditions are met

---

### Network 2: Motor Command Memory
```
Rung 2: Store Motor State in Memory
|
|  %Q0.0        %M0
|--] |---------( )--
|  MOTOR_RUN   MOTOR_CMD
|
```

**Explanation**:
- Stores motor running state in memory bit for additional logic use
- Can be used for monitoring, HMI display, or other control logic

---

### Network 3: Running Indicator (Green Lamp)
```
Rung 3: Green Running Lamp
|
|  %Q0.0        %Q0.1
|--] |---------( )--
|  MOTOR_RUN   RUN_LAMP
|
```

**Explanation**:
- Green lamp illuminates when motor is running
- Direct indication of motor contactor state

---

### Network 4: Stopped Indicator (Red Lamp)
```
Rung 4: Red Stopped Lamp
|
|  %Q0.0        %Q0.2
|--]/[---------( )--
|  MOTOR_RUN   STOP_LAMP
|
```

**Explanation**:
- Red lamp illuminates when motor is NOT running
- Uses normally closed (NC) contact of MOTOR_RUN
- Provides clear visual indication of motor state

---

## Complete Ladder Diagram (Compact Format)

```
(*=================================================================*)
(* Program: Motor_Start_Stop                                       *)
(* Controller: TM221CE24T                                          *)
(* Language: Ladder Diagram (LD)                                   *)
(* Description: Basic motor control with safety interlocks         *)
(*=================================================================*)

PROGRAM Motor_Start_Stop
VAR
    START_PB    AT %I0.0 : BOOL;  (* Start Push Button *)
    STOP_PB     AT %I0.1 : BOOL;  (* Stop Push Button *)
    MOTOR_OL    AT %I0.2 : BOOL;  (* Motor Overload *)
    E_STOP      AT %I0.3 : BOOL;  (* Emergency Stop *)

    MOTOR_RUN   AT %Q0.0 : BOOL;  (* Motor Contactor *)
    RUN_LAMP    AT %Q0.1 : BOOL;  (* Green Indicator *)
    STOP_LAMP   AT %Q0.2 : BOOL;  (* Red Indicator *)

    MOTOR_CMD   AT %M0   : BOOL;  (* Motor Command Memory *)
END_VAR

(* Network 1: Motor Control with Safety Interlocks *)
|
|  STOP_PB  MOTOR_OL  E_STOP    START_PB      MOTOR_RUN        MOTOR_RUN
|---] [------] [------] [----------| |-----------] |--------------( )----
|                                   |
|                                   |  MOTOR_RUN
|                                   +----] [------+
|

(* Network 2: Motor State Memory *)
|
|  MOTOR_RUN      MOTOR_CMD
|----] [-----------( )----
|

(* Network 3: Running Indicator *)
|
|  MOTOR_RUN      RUN_LAMP
|----] [-----------( )----
|

(* Network 4: Stopped Indicator *)
|
|  MOTOR_RUN      STOP_LAMP
|----]/[-----------( )----
|

END_PROGRAM
```

---

## Implementation Steps in EcoStruxure Machine Expert Basic

### Step 1: Create New Project
1. Launch **EcoStruxure Machine Expert Basic**
2. Click **File → New Project**
3. Enter project name: `Motor_Start_Stop`
4. Select controller: **TM221CE24T**
5. Click **OK**

### Step 2: Configure Hardware
1. In **Devices** tree, expand your controller
2. Right-click → **Properties**
3. Verify I/O configuration matches TM221CE24T specifications
4. Configure any expansion modules if needed

### Step 3: Create Variable List
1. In **Programming** tab, open **Application**
2. Double-click **Variables** to open variable editor
3. Add variables as shown below:

| Name | Address | Type | Comment |
|------|---------|------|---------|
| START_PB | %I0.0 | BOOL | Start Push Button |
| STOP_PB | %I0.1 | BOOL | Stop Push Button |
| MOTOR_OL | %I0.2 | BOOL | Motor Overload |
| E_STOP | %I0.3 | BOOL | Emergency Stop |
| MOTOR_RUN | %Q0.0 | BOOL | Motor Contactor |
| RUN_LAMP | %Q0.1 | BOOL | Green Indicator |
| STOP_LAMP | %Q0.2 | BOOL | Red Indicator |
| MOTOR_CMD | %M0 | BOOL | Motor Command Memory |

### Step 4: Create Ladder Program
1. In **Application** tree, right-click **Programs**
2. Select **Add Object → POU**
3. Enter name: `MAIN` (or `Motor_Control`)
4. Select language: **LD (Ladder Diagram)**
5. Click **OK**

### Step 5: Build Network 1 (Motor Control)
1. From the **Toolbox** on the left, drag components to the ladder:
   - Drag **Contact (NO)** for STOP_PB → assign variable `STOP_PB`
   - Drag **Contact (NO)** in series → assign `MOTOR_OL`
   - Drag **Contact (NO)** in series → assign `E_STOP`
   - Create parallel branch:
     - Drag **Contact (NO)** → assign `START_PB`
     - Below it, drag another **Contact (NO)** → assign `MOTOR_RUN` (seal-in)
   - At the end, drag **Coil** → assign `MOTOR_RUN`

2. To create the parallel branch:
   - Right-click on the rung after E_STOP contact
   - Select **Insert → Parallel Branch**
   - Add contacts as described above

### Step 6: Build Network 2 (Memory)
1. Click **New Rung** button or press **Enter**
2. Drag **Contact (NO)** → assign `MOTOR_RUN`
3. Drag **Coil** → assign `MOTOR_CMD`

### Step 7: Build Network 3 (Green Lamp)
1. Click **New Rung**
2. Drag **Contact (NO)** → assign `MOTOR_RUN`
3. Drag **Coil** → assign `RUN_LAMP`

### Step 8: Build Network 4 (Red Lamp)
1. Click **New Rung**
2. Drag **Contact (NC)** → assign `MOTOR_RUN`
3. Drag **Coil** → assign `STOP_LAMP`

### Step 9: Add Comments
1. Right-click each network → **Properties**
2. Add descriptive comments for each rung
3. Use meaningful network titles

### Step 10: Build and Check
1. Click **Build → Build Project** (or press **F7**)
2. Check **Messages** window for errors
3. Resolve any compilation errors

### Step 11: Download to PLC
1. Connect PLC via USB cable
2. Click **Online → Connect** (or press **F5**)
3. Select connection type: **USB**
4. Click **Download to Device**
5. Confirm download when prompted

### Step 12: Test and Commission
1. Put PLC in **RUN** mode
2. Click **Online → Start** (or press **F8**)
3. Enable **Watch Mode** to monitor variables
4. Test each function:
   - Press START button → Motor should start, Green lamp ON
   - Release START button → Motor stays running (seal-in working)
   - Press STOP button → Motor stops, Red lamp ON
   - Test E_STOP → Motor should stop immediately
   - Test MOTOR_OL → Motor should stop

---

## Wiring Diagram

### Input Wiring (24V DC Common)
```
24V DC Supply
    |
    +----[START_PB]----+---- %I0.0 (Start)
    |                  |
    +----[STOP_PB]-----+---- %I0.1 (Stop)
    |                  |
    +----[MOTOR_OL]----+---- %I0.2 (Overload)
    |                  |
    +----[E_STOP]------+---- %I0.3 (E-Stop)
    |
   COM (0V)
```

**Notes**:
- STOP_PB, MOTOR_OL, and E_STOP use NC (Normally Closed) contacts
- When closed (normal state), signal is HIGH (24V)
- When opened (activated), signal is LOW (0V)
- START_PB uses NO (Normally Open) contact

### Output Wiring (Relay Outputs)
```
Motor Contactor Coil (24V DC or 230V AC)
    |
    +----[ %Q0.0 ]---- Motor Contactor
    |
    +----[ %Q0.1 ]---- Green Lamp (RUN)
    |
    +----[ %Q0.2 ]---- Red Lamp (STOP)
    |
   Common
```

---

## Safety Considerations

### Electrical Safety
1. **Lockout/Tagout**: Follow proper LOTO procedures before working on equipment
2. **Wire Sizing**: Use appropriate wire gauge for motor current
3. **Overload Protection**: Install proper thermal overload relay
4. **Emergency Stop**: Must be hardwired and easily accessible
5. **Grounding**: Ensure proper grounding of all equipment

### Programming Safety
1. **Stop Priority**: STOP always has priority over START
2. **NC Contacts**: All safety devices use NC contacts for fail-safe operation
3. **No Auto-Restart**: Motor should not restart after power interruption
4. **Clear Indication**: Always provide visual/audible indication of motor state

### Compliance
- Follow local electrical codes and standards
- Comply with machine safety standards (ISO 13849, IEC 60204)
- Perform risk assessment before deployment
- Document all safety features

---

## Troubleshooting Guide

### Motor Won't Start
**Possible Causes**:
1. STOP_PB not closed → Check wiring, button may be stuck
2. E_STOP activated → Reset emergency stop
3. MOTOR_OL tripped → Check overload relay, motor current
4. No power to inputs → Check 24V DC supply
5. Output relay failed → Check %Q0.0 output

**Diagnostic Steps**:
1. Put PLC in **Watch Mode**
2. Monitor input states: %I0.0, %I0.1, %I0.2, %I0.3
3. Check output state: %Q0.0
4. Verify all NC contacts show TRUE when closed

### Motor Won't Stop
**Possible Causes**:
1. Output relay stuck closed → Replace output module
2. External contactor welded → Replace motor contactor
3. STOP_PB wiring fault → Check wiring continuity

**Diagnostic Steps**:
1. Press STOP_PB and check %I0.1 goes FALSE
2. Check %Q0.0 turns OFF when STOP pressed
3. If %Q0.0 OFF but motor runs, issue is external to PLC

### Motor Starts but Won't Seal In
**Possible Causes**:
1. Seal-in contact missing → Check ladder logic Network 1
2. START_PB stuck closed → Replace button
3. Scan time too long → Check PLC performance

### Indicators Not Working
**Possible Causes**:
1. Lamp burned out → Replace lamp
2. Output wiring fault → Check connections
3. Output relay failed → Test with multimeter

---

## Advanced Enhancements (Optional)

### 1. Add Run Timer
Track total motor running hours for maintenance:

```
(* Network 5: Running Time Counter *)
|
|  MOTOR_RUN    TON_RUNTIME
|----] [----------[TON]----
|                 IN    Q
|                 PT    ET---> %MW10 (Running Hours)
```

### 2. Add Start Delay
Prevent rapid start/stop cycles:

```
(* Modify Network 1: Add start delay *)
|  STOP_PB  MOTOR_OL  E_STOP    START_DELAY.Q  MOTOR_RUN    MOTOR_RUN
|---] [------] [------] [----------] [------------] [-----------( )----
|                                                    |
|                                    MOTOR_RUN       |
|                                    ---]/[----------+
|
(* Network for Start Delay Timer *)
|  START_PB     TON_START_DELAY
|----| |---------[TON]-----------
|                IN  Q--> START_DELAY.Q
|                PT = T#2s
```

### 3. Add Alarm for Overload Trip
```
(* Network: Overload Alarm *)
|  MOTOR_OL      %M10           %Q0.3
|----]/[---------| |-----------( )----  (Alarm Buzzer)
|                 |  %M10       |
|                 +---] [-------+
```

### 4. Add Hour Meter
Display running hours on HMI:
- Use %MW registers to store elapsed time
- Increment counter every scan when motor is running
- Convert to hours for display

---

## Testing Checklist

- [ ] All inputs respond correctly in Watch Mode
- [ ] START button starts motor
- [ ] Motor seals in after START release
- [ ] STOP button stops motor
- [ ] Emergency stop immediately stops motor
- [ ] Overload protection stops motor
- [ ] Green lamp illuminates when running
- [ ] Red lamp illuminates when stopped
- [ ] Motor does not auto-restart after power cycle
- [ ] All safety interlocks tested and functional
- [ ] Wiring verified against schematic
- [ ] Documentation completed

---

## Project Files

**Save your project as**: `Motor_Start_Stop.smbe`

**Backup Files**:
- Export ladder diagram as PDF for documentation
- Save project with version number (e.g., Motor_Start_Stop_v1.0.smbe)
- Keep backup copies in separate location

---

## Summary

This motor start/stop program demonstrates:
- Basic ladder logic programming in Machine Expert Basic
- Proper use of NO and NC contacts
- Seal-in (latching) circuit implementation
- Safety interlock integration
- Status indication
- Standard industrial motor control practices

The program is ready for deployment on TM221CE24T controller and can be easily modified for additional features or specific application requirements.

---

**Document Version**: 1.0
**Created**: December 2024
**Controller**: TM221CE24T
**Software**: EcoStruxure Machine Expert Basic
**Language**: Ladder Diagram (LD)

---

*Always test thoroughly in a safe environment before deploying to production equipment. Follow all applicable safety standards and regulations.*
