# Dual Tank Automatic Level Control System
## I/O Assignment and Wiring Guide

**Controller**: Schneider Electric TM221CE16T
**Program File**: Dual_Tank_Level_Control_TM221CE16T.smbp
**Date**: 2025-12-24
**Version**: 1.0

---

## System Overview

Automatic water level control system for two independent tanks using submersible or centrifugal pumps. Each tank operates independently with its own pump, LOW level sensor, and HIGH level sensor.

### Key Features
- Automatic mode with manual override
- Independent control for each tank
- Fail-safe NC (Normally Closed) sensor design
- Seal-in circuit prevents pump cycling
- Overflow protection via HIGH level sensors
- Manual pump control capability

---

## I/O Configuration

### Digital Inputs (8 total)

| Address | Symbol | Description | Device Type | Wiring |
|---------|--------|-------------|-------------|--------|
| %I0.0 | AUTO_MODE | Auto Mode Enable Switch | Toggle Switch (NO) | COM -> %I0.0, 24VDC |
| %I0.1 | TANK1_LOW | Tank 1 LOW Level Sensor | Float Switch (NC) | COM -> %I0.1, 24VDC |
| %I0.2 | MANUAL_PUMP1 | Manual Pump 1 Start | Pushbutton (NO) | COM -> %I0.2, 24VDC |
| %I0.3 | TANK1_HIGH | Tank 1 HIGH Level Sensor | Float Switch (NC) | COM -> %I0.3, 24VDC |
| %I0.4 | MANUAL_PUMP2 | Manual Pump 2 Start | Pushbutton (NO) | COM -> %I0.4, 24VDC |
| %I0.5 | TANK2_LOW | Tank 2 LOW Level Sensor | Float Switch (NC) | COM -> %I0.5, 24VDC |
| %I0.6 | TANK2_HIGH | Tank 2 HIGH Level Sensor | Float Switch (NC) | COM -> %I0.6, 24VDC |
| %I0.7 | (Reserved) | Future expansion | - | - |

### Digital Outputs (2 total)

| Address | Symbol | Description | Device Type | Load Rating |
|---------|--------|-------------|-------------|-------------|
| %Q0.0 | PUMP1_OUTPUT | Pump 1 Contactor Coil | Contactor 24VDC | 0.5A @ 24VDC |
| %Q0.1 | PUMP2_OUTPUT | Pump 2 Contactor Coil | Contactor 24VDC | 0.5A @ 24VDC |

### Internal Memory Bits

| Address | Symbol | Description | Type |
|---------|--------|-------------|------|
| %M0 | AUTO_ACTIVE | Auto Mode Active Flag | BOOL |
| %M1 | PUMP1_RUN | Pump 1 Running Flag (with seal-in) | BOOL |
| %M2 | PUMP2_RUN | Pump 2 Running Flag (with seal-in) | BOOL |

---

## Wiring Diagrams

### Input Wiring (24VDC)

```
TM221CE16T Input Module
========================

   24VDC(+)          Device              PLC Input
   --------          ------              ---------
      |                |                     |
      +--- [AUTO_MODE Switch] ---+--- %I0.0 (COM)
      |                          |
      +--- [TANK1_LOW NC] -------+--- %I0.1 (COM)
      |                          |
      +--- [MANUAL_PUMP1 NO] ----+--- %I0.2 (COM)
      |                          |
      +--- [TANK1_HIGH NC] ------+--- %I0.3 (COM)
      |                          |
      +--- [MANUAL_PUMP2 NO] ----+--- %I0.4 (COM)
      |                          |
      +--- [TANK2_LOW NC] -------+--- %I0.5 (COM)
      |                          |
      +--- [TANK2_HIGH NC] ------+--- %I0.6 (COM)
      |
    GND (-)
```

### Output Wiring (Pump Contactors)

```
TM221CE16T Output Module
=========================

    %Q0.0 -----> [K1 Coil] -----> GND     (Pump 1 Contactor)
    %Q0.1 -----> [K2 Coil] -----> GND     (Pump 2 Contactor)

Power Circuit (Example for Pump 1):

    L1 ------> [K1 Main Contacts] ------> [Overload Relay] ------> Pump 1 Motor
    L2 ------> [K1 Main Contacts] ------> [Overload Relay] ------> Pump 1 Motor
    L3 ------> [K1 Main Contacts] ------> [Overload Relay] ------> Pump 1 Motor
```

---

## Level Sensor Installation

### NC (Normally Closed) Float Switch Wiring

**Important**: Use NC contacts for fail-safe operation!

```
Tank Level Sensors (NC Type)
==============================

TANK 1:
               HIGH Level (80-90% full)
               |
      +--------+--------+
      |                 |
      |                 |  TANK1_HIGH sensor (NC)
      |                 |  Opens when water ABOVE HIGH
      |                 |
      |                 |
      |                 |
      |                 |
      |                 |
               LOW Level (20-30% full)
               |
      +--------+--------+
      |                 |  TANK1_LOW sensor (NC)
      |                 |  Opens when water ABOVE LOW
      |                 |
      +--------+--------+
           Tank Bottom


Sensor States:
--------------
Tank Empty:        TANK1_LOW = CLOSED (1)   TANK1_HIGH = CLOSED (1)
Below LOW:         TANK1_LOW = CLOSED (1)   TANK1_HIGH = CLOSED (1)
Between LOW-HIGH:  TANK1_LOW = OPEN (0)     TANK1_HIGH = CLOSED (1)
Above HIGH:        TANK1_LOW = OPEN (0)     TANK1_HIGH = OPEN (0)
```

### Recommended Sensor Positions

| Sensor | Position | Purpose |
|--------|----------|---------|
| LOW | 20-30% tank height | Start pump when level drops |
| HIGH | 80-90% tank height | Stop pump to prevent overflow |

**Hysteresis**: Minimum 30cm (12") between LOW and HIGH sensors to prevent rapid cycling.

---

## Control Logic Explanation

### Automatic Mode Operation

#### Tank 1 Control (Rung 2)

```
Ladder Logic:
|--[AUTO_ACTIVE]--]/[TANK1_LOW]--+--]/[TANK1_HIGH]--(PUMP1_RUN)--|
|                                 |                                |
|--[MANUAL_PUMP1]----------------+                                |
|                                 |                                |
|--[PUMP1_RUN]-------------------+  (Seal-in)                     |

Instruction List:
LD    %M0          # Auto mode active
ANDN  %I0.1        # Tank LOW (sensor opens when LOW)
OR    %M1          # Seal-in
OR    %I0.2        # Manual start
ANDN  %I0.3        # NOT Tank HIGH (stop at HIGH)
ST    %M1          # Store pump run flag
```

**Logic Explanation**:
1. When AUTO_MODE is ON and water drops BELOW LOW sensor:
   - TANK1_LOW opens (NC contact)
   - Pump 1 starts

2. Seal-in circuit keeps pump running as water rises past LOW sensor

3. When water reaches HIGH sensor:
   - TANK1_HIGH opens (NC contact)
   - Pump 1 stops

4. Manual override: MANUAL_PUMP1 button can start pump anytime

5. Safety: HIGH sensor always stops pump regardless of mode

### Manual Mode Operation

When AUTO_MODE switch is OFF:
- Press MANUAL_PUMP1 to start Pump 1
- Press MANUAL_PUMP2 to start Pump 2
- Pumps still stop at HIGH level (safety feature)
- No automatic LOW level control

---

## Bill of Materials (BOM)

### Core Components

| Qty | Part Number | Description | Specs |
|-----|-------------|-------------|-------|
| 1 | TM221CE16T | Schneider M221 PLC | 16 I/O, 100-240VAC |
| 1 | TMTCA2T | Programming Cable | USB to Mini-USB |
| 2 | LC1D09BD | Contactor | 9A, 24VDC coil |
| 2 | LRD10 | Overload Relay | 4-6A |
| 2 | - | Float Switch NC | 24VDC rated, NC type |
| 2 | - | Pushbutton NO | Green, illuminated |
| 1 | - | Toggle Switch | Auto/Manual selector |
| 1 | - | Power Supply | 24VDC, 5A minimum |
| 1 | - | DIN Rail Enclosure | IP55 rated |

### Wiring Materials

| Qty | Description | Specs |
|-----|-------------|-------|
| 50m | Control Wire | 18 AWG, stranded |
| 20m | Power Cable | 14 AWG, 3-phase |
| 1 | Terminal Blocks | DIN rail mount |
| 1 | Cable Glands | PG13.5 |
| 1 | Labels | Wire markers |

---

## Installation Steps

### 1. Mechanical Installation

1. Mount PLC on DIN rail inside control panel
2. Install contactors K1 and K2
3. Mount overload relays
4. Install power supply (24VDC)
5. Install AUTO/MANUAL selector switch
6. Install manual pushbuttons

### 2. Sensor Installation

**LOW Level Sensor (Both Tanks)**:
```
Height: 20-30% of tank height from bottom
Position: Side-mounted or top-mounted with weight
Type: NC float switch rated for water
```

**HIGH Level Sensor (Both Tanks)**:
```
Height: 80-90% of tank height from bottom
Position: Side-mounted or top-mounted with weight
Type: NC float switch rated for water
Clearance: Minimum 30cm above LOW sensor
```

### 3. Wiring

**Step 1**: Wire 24VDC power supply to PLC
```
24VDC(+) -> PLC terminal 1
GND(-)   -> PLC terminal 2
```

**Step 2**: Wire input devices
```
Connect all input devices to 24VDC common
Connect switch/sensor outputs to input terminals
```

**Step 3**: Wire output contactors
```
%Q0.0 -> K1 coil -> GND
%Q0.1 -> K2 coil -> GND
```

**Step 4**: Wire pump power circuits
```
L1/L2/L3 -> Contactor main contacts -> Overload -> Motor
Include emergency stop in series
```

### 4. Software Upload

1. Connect laptop to PLC via TMTCA2T cable
2. Open `Dual_Tank_Level_Control_TM221CE16T.smbp` in EcoStruxure Machine Expert - Basic
3. Build project (Ctrl+F7)
4. Connect to PLC
5. Download program to PLC
6. Set PLC to RUN mode

### 5. Commissioning

**Pre-checks**:
- [ ] Verify all wiring per schematic
- [ ] Check 24VDC supply voltage (23.5-24.5VDC)
- [ ] Confirm NC sensor wiring (continuity test)
- [ ] Test contactor operation manually
- [ ] Verify overload relay settings

**Functional Testing**:
1. Turn AUTO_MODE switch ON
2. Manually drain Tank 1 below LOW sensor
3. Verify Pump 1 starts (PUMP1_OUTPUT ON)
4. Observe continued operation as level rises
5. Verify Pump 1 stops at HIGH sensor
6. Repeat for Tank 2
7. Test manual override buttons
8. Test AUTO/MANUAL mode switching

---

## Troubleshooting Guide

### Pump Does Not Start in Auto Mode

**Symptom**: Water level below LOW, but pump does not run

**Checks**:
1. Verify AUTO_MODE switch is ON (%I0.0 = 1)
2. Check TANK_LOW sensor wiring (should be NC type)
3. Verify sensor continuity when water below LOW
4. Check %M1 or %M2 status in PLC (should be 1)
5. Confirm contactor coil energized (%Q0.0 or %Q0.1 = 1)
6. Test contactor manually (apply 24VDC directly)

### Pump Does Not Stop at HIGH Level

**Symptom**: Water above HIGH sensor, pump still running

**Checks**:
1. Verify HIGH sensor is NC type
2. Check sensor opens when water above HIGH
3. Confirm wiring: %I0.3 (Tank 1) or %I0.6 (Tank 2)
4. Replace faulty sensor
5. Review ladder logic (HIGH sensor should break circuit)

### Pump Cycles Rapidly

**Symptom**: Pump starts and stops repeatedly

**Causes**:
1. Insufficient hysteresis between LOW and HIGH sensors
2. LOW and HIGH sensors too close together
3. Defective sensor (intermittent contact)

**Solutions**:
1. Increase distance between sensors (minimum 30cm)
2. Replace faulty sensors
3. Add time delay if cycling persists

### Manual Override Not Working

**Symptom**: Manual pushbutton does not start pump

**Checks**:
1. Verify pushbutton wiring to %I0.2 or %I0.4
2. Check pushbutton continuity when pressed
3. Confirm 24VDC supply to pushbutton
4. Review ladder logic (manual start OR branch)

---

## Safety Considerations

### Electrical Safety

1. **Isolation**: Install main disconnect switch
2. **GFCI**: Use ground fault protection on pump circuits
3. **Overload Protection**: Size overload relays correctly
4. **Grounding**: Ground all metal enclosures
5. **Lockout/Tagout**: Implement LOTO procedures

### Process Safety

1. **Overflow Prevention**: HIGH sensors provide primary protection
2. **Fail-Safe Design**: NC sensors ensure safe failure mode
3. **Manual Override**: Allows operator intervention
4. **Emergency Stop**: Add E-stop button if required
5. **Leak Detection**: Consider adding leak sensors

### Sensor Failure Modes

| Failure | Sensor Type | Result | Risk |
|---------|-------------|--------|------|
| LOW sensor fails OPEN | NC | Pump runs continuously | Overflow (mitigated by HIGH sensor) |
| LOW sensor fails CLOSED | NC | Pump never starts | Tank runs dry |
| HIGH sensor fails OPEN | NC | Pump stops prematurely | Reduced capacity |
| HIGH sensor fails CLOSED | NC | Pump ignores HIGH level | Overflow risk (CRITICAL) |

**Recommendation**: Use NC sensors and add HIGH-HIGH alarm for critical applications.

---

## Maintenance Schedule

### Daily
- [ ] Visual inspection of water levels
- [ ] Check pump operation (sound, vibration)
- [ ] Verify no alarms on PLC

### Weekly
- [ ] Test manual override buttons
- [ ] Clean float switch debris
- [ ] Check sensor alignment

### Monthly
- [ ] Test AUTO/MANUAL mode switching
- [ ] Verify sensor operation at LOW and HIGH levels
- [ ] Inspect contactor contacts
- [ ] Check wiring connections (tightness)

### Quarterly
- [ ] Clean tank sensors
- [ ] Calibrate sensor positions if needed
- [ ] Test overload relay trip
- [ ] Review PLC program backup

### Annually
- [ ] Replace float switches (preventive)
- [ ] Inspect contactor main contacts
- [ ] Test emergency stop circuit
- [ ] Full system commissioning test

---

## Modifications and Upgrades

### Adding High-High Alarm

Add to inputs:
```
%I0.7 - TANK1_HIGH_HIGH (NC float switch at 95% level)
```

Add alarm output:
```
%Q0.2 - ALARM_HORN (24VDC horn/beacon)
```

Ladder logic:
```
Rung 6: High-High Alarm
|--]/[TANK1_HIGH_HIGH]--(ALARM_OUTPUT)--|
```

### Adding Low-Low Alarm

Add to inputs:
```
%I0.8 - TANK1_LOW_LOW (NC float switch at 10% level)
```

Prevent pump dry-run:
```
Modify Rung 2 to include LOW_LOW interlock
```

### Pump Alternation

Modify logic to alternate pumps for even wear:
- Add hour meter counters
- Implement lead/lag logic
- Swap pump duties based on runtime

---

## Program Backup and Version Control

### Backup Procedure

1. Connect to PLC via USB
2. Menu: Tools > Upload from PLC
3. Save as: `Dual_Tank_vX.X_YYYY-MM-DD.smbp`
4. Store on network drive
5. Create backup documentation

### Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-24 | PLCAutoPilot | Initial release |

---

## Contact and Support

**Generated by**: PLCAutoPilot v1.2
**Project Repository**: github.com/chatgptnotes/plcautopilot.com
**Documentation Date**: 2025-12-24

For technical support or modifications, contact your automation engineer.

---

**END OF DOCUMENT**
