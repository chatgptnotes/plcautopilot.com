# 3-Pump 3-Tank Backup System - Program Documentation

## Overview

This PLC program controls a water distribution system with 3 pumps and 3 tanks. Each pump is dedicated to filling one tank, but the system includes backup logic so that if a pump fails, a neighboring pump can take over and fill the affected tank through interconnecting valves.

**Controller:** Schneider Electric TM221CE24T (Modicon M221)
**Software:** EcoStruxure Machine Expert - Basic
**File:** Pump_Tank_TM221.smbp

---

## System Architecture

```
                    WATER SOURCE
                         |
         +---------------+---------------+
         |               |               |
     [PUMP 1]        [PUMP 2]        [PUMP 3]
         |               |               |
         v               v               v
     +-------+       +-------+       +-------+
     |       |       |       |       |       |
     |TANK 1 |<----->|TANK 2 |<----->|TANK 3 |
     |       |VALVE12|       |VALVE23|       |
     +-------+       +-------+       +-------+
         |               |               |
      [LOW/HIGH]     [LOW/HIGH]     [LOW/HIGH]
       SENSORS        SENSORS        SENSORS
```

### Normal Operation
- Pump 1 fills Tank 1
- Pump 2 fills Tank 2
- Pump 3 fills Tank 3
- Valves between tanks remain CLOSED

### Backup Operation
- If Pump 1 fails: Pump 2 takes over Tank 1, Valve 1-2 OPENS
- If Pump 2 fails: Pump 3 takes over Tank 2, Valve 2-3 OPENS

---

## I/O Assignment

### Digital Inputs (12 of 14 used)

| Address  | Symbol         | Description                          | Type |
|----------|----------------|--------------------------------------|------|
| %I0.0    | START_BTN      | System Start Button                  | NO   |
| %I0.1    | STOP_BTN       | System Stop Button                   | NC   |
| %I0.2    | PUMP1_SPEED_OK | Pump 1 Zero Speed Sensor             | NC   |
| %I0.3    | PUMP2_SPEED_OK | Pump 2 Zero Speed Sensor             | NC   |
| %I0.4    | PUMP3_SPEED_OK | Pump 3 Zero Speed Sensor             | NC   |
| %I0.5    | TANK1_LOW      | Tank 1 Low Level Switch              | NO   |
| %I0.6    | TANK1_HIGH     | Tank 1 High Level Switch             | NO   |
| %I0.7    | TANK2_LOW      | Tank 2 Low Level Switch              | NO   |
| %I0.8    | TANK2_HIGH     | Tank 2 High Level Switch             | NO   |
| %I0.9    | TANK3_LOW      | Tank 3 Low Level Switch              | NO   |
| %I0.10   | TANK3_HIGH     | Tank 3 High Level Switch             | NO   |
| %I0.11   | FAULT_RESET    | Fault Reset Button                   | NO   |

**Note:** Zero speed sensors are wired NC (Normally Closed). When the motor is running at speed, the contact is CLOSED (signal = 1). When motor stops or fails, contact OPENS (signal = 0).

### Digital Outputs (10 of 10 used)

| Address | Symbol          | Description              | Load Type   |
|---------|-----------------|--------------------------|-------------|
| %Q0.0   | PUMP1_RUN       | Pump 1 Motor Contactor   | Relay/24VDC |
| %Q0.1   | PUMP2_RUN       | Pump 2 Motor Contactor   | Relay/24VDC |
| %Q0.2   | PUMP3_RUN       | Pump 3 Motor Contactor   | Relay/24VDC |
| %Q0.3   | VALVE_12        | Valve between Tank 1-2   | Solenoid    |
| %Q0.4   | VALVE_23        | Valve between Tank 2-3   | Solenoid    |
| %Q0.5   | PUMP1_FAULT_IND | Pump 1 Fault Indicator   | Lamp        |
| %Q0.6   | PUMP2_FAULT_IND | Pump 2 Fault Indicator   | Lamp        |
| %Q0.7   | PUMP3_FAULT_IND | Pump 3 Fault Indicator   | Lamp        |
| %Q0.8   | SYSTEM_RUN_IND  | System Running Indicator | Lamp        |
| %Q0.9   | ALARM_OUTPUT    | Alarm Horn/Buzzer        | Horn        |

### Memory Bits

| Address | Symbol          | Description                    |
|---------|-----------------|--------------------------------|
| %M0     | SYSTEM_RUN      | System Running Status          |
| %M1     | PUMP1_CMD       | Pump 1 Fill Command            |
| %M2     | PUMP2_CMD       | Pump 2 Fill Command            |
| %M3     | PUMP3_CMD       | Pump 3 Fill Command            |
| %M10    | PUMP1_FAULT     | Pump 1 Fault Latch             |
| %M11    | PUMP2_FAULT     | Pump 2 Fault Latch             |
| %M12    | PUMP3_FAULT     | Pump 3 Fault Latch             |
| %M20    | TANK1_BACKUP    | Tank 1 Needs Backup (Pump 2)   |
| %M21    | TANK2_BACKUP    | Tank 2 Needs Backup (Pump 3)   |

### Timers

| Address | Symbol       | Type | Time Base | Preset | Description              |
|---------|--------------|------|-----------|--------|--------------------------|
| %TM0    | PUMP1_DELAY  | TON  | 1 second  | 2      | Pump 1 startup delay     |
| %TM1    | PUMP2_DELAY  | TON  | 1 second  | 2      | Pump 2 startup delay     |
| %TM2    | PUMP3_DELAY  | TON  | 1 second  | 2      | Pump 3 startup delay     |

---

## Program Logic (19 Rungs)

### Rung 1: System Start/Stop Control

```
     START_BTN        STOP_BTN(NC)
--+----[/I0.0]----+----[\/I0.1]-------------------(M0)---
  |               |                              SYSTEM_RUN
  +----[/M0]------+
      SEAL-IN
```

**Logic:**
- Press START button to energize SYSTEM_RUN
- SYSTEM_RUN seals in (latches) through parallel contact
- Press STOP button (NC) to de-energize and stop system

---

### Rungs 2-4: Pump Command Logic

Each pump command follows this pattern:

```
   SYSTEM_RUN    TANK_LOW     TANK_HIGH(NC)  PUMP_FAULT(NC)
----[/M0]-------[/I0.x]-------[\/I0.y]-------[\/M1x]-------(Mx)---
                                                          PUMP_CMD
```

**Conditions for pump to command ON:**
1. System must be running (%M0 = 1)
2. Tank low level switch active (tank needs water)
3. Tank high level switch NOT active (tank not full)
4. No fault on this pump

---

### Rungs 5, 7, 9: Pump Output with Timer

```
   PUMP_CMD
----[/Mx]-----[TM%]---------------------------------------(%Q0.x)---
              DELAY                                       PUMP_RUN
```

The timer provides a 2-second delay for speed monitoring. The pump output energizes immediately when commanded.

---

### Rungs 6, 8, 10: Zero Speed Fault Detection

```
   TIMER.Q       SPEED_OK(NC)   FAULT_RESET(NC)
--+---[/TMx.Q]-----[\/I0.x]---+----[\/I0.11]------------(M1x)---
  |                           |                        PUMP_FAULT
  +--------[/M1x]-------------+
           LATCH
```

**Fault Detection Logic:**
1. After timer expires (pump has had 2 seconds to reach speed)
2. If SPEED_OK signal is FALSE (motor not spinning)
3. Then FAULT is SET and LATCHED
4. Fault remains latched until FAULT_RESET button is pressed

**Why 2-second delay?** Motors need time to accelerate. The delay prevents false fault detection during startup.

---

### Rungs 11-12: Backup Request Logic

**Tank 1 Backup (Rung 11):**
```
   PUMP1_FAULT   TANK1_LOW    PUMP2_FAULT(NC)
----[/M10]-------[/I0.5]-------[\/M11]-------------------(M20)---
                                                      TANK1_BACKUP
```

If Pump 1 has faulted AND Tank 1 needs water AND Pump 2 is healthy, request backup.

**Tank 2 Backup (Rung 12):**
```
   PUMP2_FAULT   TANK2_LOW    PUMP3_FAULT(NC)
----[/M11]-------[/I0.7]-------[\/M12]-------------------(M21)---
                                                      TANK2_BACKUP
```

If Pump 2 has faulted AND Tank 2 needs water AND Pump 3 is healthy, request backup.

---

### Rungs 7 & 9 (Backup Path): Pump Output with Backup OR

```
   PUMP2_CMD
--+---[/M2]---+----[TMx]------------------------------------(%Q0.1)---
  |           |                                             PUMP2_RUN
  +--[/M20]---+
   TANK1_BACKUP
```

Pump 2 runs if:
- Normal: Pump 2 command is active (Tank 2 needs filling), OR
- Backup: Tank 1 needs backup (Pump 1 failed)

Same logic applies to Pump 3 backing up Tank 2.

---

### Rungs 13-14: Valve Control

```
   TANK1_BACKUP
----[/M20]------------------------------------------------(%Q0.3)---
                                                          VALVE_12
```

```
   TANK2_BACKUP
----[/M21]------------------------------------------------(%Q0.4)---
                                                          VALVE_23
```

Valves open automatically when backup mode is active, allowing the backup pump to fill the affected tank through the interconnection.

---

### Rungs 15-17: Fault Indicators

Each fault indicator lamp directly reflects the fault latch status:

```
   PUMP1_FAULT
----[/M10]------------------------------------------------(%Q0.5)---
                                                     PUMP1_FAULT_IND
```

---

### Rung 18: System Running Indicator

```
   SYSTEM_RUN
----[/M0]-------------------------------------------------(%Q0.8)---
                                                      SYSTEM_RUN_IND
```

---

### Rung 19: Alarm Output

```
   PUMP1_FAULT
--+---[/M10]---+
  |            |
  +---[/M11]---+-----------------------------------------(%Q0.9)---
  |            |                                        ALARM_OUTPUT
  +---[/M12]---+
   PUMP3_FAULT
```

Alarm sounds if ANY pump has a fault.

---

## Operating Procedures

### System Startup

1. Verify all tanks have correct level sensor readings
2. Verify all pumps are ready (no mechanical issues)
3. Verify zero speed sensors are functional
4. Press START button
5. System Running indicator illuminates
6. Pumps will automatically start filling low tanks

### Normal Operation

The system operates automatically:
- When tank level drops below LOW switch, pump starts
- When tank level reaches HIGH switch, pump stops
- Each pump only serves its designated tank

### Fault Handling

When a pump fault occurs:
1. Fault indicator lamp illuminates
2. Alarm sounds
3. Backup pump (if available) takes over
4. Interconnecting valve opens

To clear a fault:
1. Fix the mechanical issue with the pump
2. Verify motor can spin freely
3. Press FAULT_RESET button
4. Fault indicator extinguishes
5. Normal operation resumes

### System Shutdown

1. Press STOP button
2. All pumps stop immediately
3. All valves close
4. System Running indicator extinguishes

---

## Wiring Diagrams

### Input Wiring (24VDC Sink/Source)

```
24VDC +  ----+----[START BTN NO]-----> %I0.0
             |
             +----[STOP BTN NC]------> %I0.1
             |
             +----[SPEED1 NC]--------> %I0.2
             |
             +----[SPEED2 NC]--------> %I0.3
             |
             +----[SPEED3 NC]--------> %I0.4
             |
             +----[TANK1 LOW NO]-----> %I0.5
             ...

24VDC COM ----------------------------> COM
```

### Output Wiring

```
%Q0.0 ----[RELAY]----[PUMP1 CONTACTOR COIL]----+
%Q0.1 ----[RELAY]----[PUMP2 CONTACTOR COIL]----+
%Q0.2 ----[RELAY]----[PUMP3 CONTACTOR COIL]----+
%Q0.3 ----[SOLENOID VALVE 1-2]----------------+
%Q0.4 ----[SOLENOID VALVE 2-3]----------------+
%Q0.5 ----[FAULT LAMP 1]----------------------+
%Q0.6 ----[FAULT LAMP 2]----------------------+
%Q0.7 ----[FAULT LAMP 3]----------------------+
%Q0.8 ----[SYSTEM RUN LAMP]-------------------+
%Q0.9 ----[ALARM HORN]------------------------+
                                              |
24VDC COM ------------------------------------+
```

---

## Troubleshooting

| Symptom | Possible Cause | Solution |
|---------|---------------|----------|
| Pump won't start | Tank high level active | Check level sensors |
| Pump won't start | Pump fault latched | Reset fault, check motor |
| False fault alarm | Zero speed sensor failed | Replace sensor |
| False fault alarm | Timer too short | Increase preset (currently 2s) |
| Backup not working | Backup pump also faulted | Repair backup pump |
| Valve stuck closed | Solenoid failed | Check solenoid coil |

---

## Maintenance Schedule

| Task | Frequency |
|------|-----------|
| Test START/STOP buttons | Weekly |
| Test FAULT_RESET button | Weekly |
| Verify level sensor operation | Monthly |
| Test zero speed sensors | Monthly |
| Exercise all valves | Monthly |
| Full system test (simulate faults) | Quarterly |

---

## Document Information

| Item | Value |
|------|-------|
| Program Version | 1.0 |
| Created | December 2024 |
| Controller | TM221CE24T |
| Total Rungs | 19 |
| Inputs Used | 12 of 14 |
| Outputs Used | 10 of 10 |
| Timers Used | 3 |
| Memory Bits Used | 9 |
