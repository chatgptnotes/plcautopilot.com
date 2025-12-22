# EcoStruxure Machine Expert - Timer Instruction Logic Format

## Correct Timer Format (BLK/END_BLK Structure)

In EcoStruxure Machine Expert - Basic, timers in Instruction Logic (IL) use a **function block** format with BLK/END_BLK structure.

### Timer with Output in Same Rung

```
BLK   %TMx         ; Begin timer block (specify timer address)
LD    <condition>  ; Load the condition to start/enable timer
IN                 ; Timer input (no parameter)
OUT_BLK            ; Output from timer block
LD    Q            ; Load the Q output of the timer (done bit)
ST    <output>     ; Store to output address
END_BLK            ; End timer block
```

### Example 1: Timer with Direct Input

**Rung 3: Timer 1 controlled by %M0, output to Light 2**
```
BLK   %TM0         ; Begin Timer 1 block
LD    %M0          ; Load memory bit M0 (sequence run flag)
IN                 ; Timer input
OUT_BLK            ; Output from timer block
LD    Q            ; Load timer Q output (done bit)
ST    %Q0.1        ; Store to output Q0.1 (Light 2)
END_BLK            ; End timer block
```

**Result:** When %M0 = TRUE, Timer 1 starts. After 3 seconds, Q output becomes TRUE and Light 2 (%Q0.1) turns ON.

### Example 2: Cascaded Timers

**Rung 4: Timer 2 triggered by Timer 1, output to Light 3**
```
BLK   %TM1         ; Begin Timer 2 block
LD    %TM0.Q       ; Load Timer 1 done bit
IN                 ; Timer input
OUT_BLK            ; Output from timer block
LD    Q            ; Load timer Q output
ST    %Q0.2        ; Store to output Q0.2 (Light 3)
END_BLK            ; End timer block
```

**Result:** When Timer 1 completes (%TM0.Q = TRUE), Timer 2 starts. After 3 more seconds, Light 3 (%Q0.2) turns ON.

---

## WRONG Format (Don't Use)

### ❌ Incorrect - Direct IN command with timer address
```
LD    %M0
IN    %TM0         ; WRONG! This will cause errors
LD    %TM0.Q
ST    %Q0.1
```

### ❌ Incorrect - Missing BLK/END_BLK
```
LD    %M0
ST    %TM0.IN      ; WRONG! Not the correct syntax
LD    %TM0.Q
ST    %Q0.1
```

---

## Timer Configuration Requirements

### Timer Object Definition (in XML)

Timers must be defined in the `<Timers>` section:

```xml
<Timer>
  <Address>%TM0</Address>
  <Index>0</Index>
  <Symbol>TIMER_1</Symbol>
  <Comment>3 Second Timer for Light 2</Comment>
  <Type>TON</Type>              <!-- Timer On Delay -->
  <TimeBase>TimeBase1s</TimeBase> <!-- 1 second time base -->
  <Preset>3</Preset>              <!-- 3 second preset value -->
</Timer>
```

### Timer Types
- **TON**: Timer On Delay (most common)
- **TOF**: Timer Off Delay
- **TP**: Timer Pulse

### Time Base Options
- `TimeBase1ms` - 1 millisecond
- `TimeBase10ms` - 10 milliseconds
- `TimeBase100ms` - 100 milliseconds
- `TimeBase1s` - 1 second (most common)

---

## Complete Sequential Lights Example

### Program: 3 Lights with 3-second gaps

**Rung 1: Start/Stop Control**
```
LD    %I0.0        ; START button
OR    %M0          ; Seal-in
ANDN  %I0.1        ; STOP button
ST    %M0          ; Sequence run flag
```

**Rung 2: Light 1 (Immediate)**
```
LD    %M0          ; Sequence running?
ST    %Q0.0        ; Light 1 ON
```

**Rung 3: Timer 1 + Light 2**
```
BLK   %TM0         ; Begin Timer 1
LD    %M0          ; Load sequence flag
IN                 ; Timer input
OUT_BLK            ; Timer output
LD    Q            ; Load done bit
ST    %Q0.1        ; Light 2 ON
END_BLK            ; End block
```

**Rung 4: Timer 2 + Light 3**
```
BLK   %TM1         ; Begin Timer 2
LD    %TM0.Q       ; Load Timer 1 done
IN                 ; Timer input
OUT_BLK            ; Timer output
LD    Q            ; Load done bit
ST    %Q0.2        ; Light 3 ON
END_BLK            ; End block
```

---

## Key Points

1. **Always use BLK/END_BLK** for timer function blocks
2. **IN has no parameter** - it's just `IN`, not `IN %TMx`
3. **LD Q** loads the timer output - it's `Q`, not `%TMx.Q`
4. **Timer address** is specified in the BLK command
5. **Timers must be pre-configured** in the timer objects section with Type, TimeBase, and Preset
6. **Each timer block** combines the timer logic and output in one rung

---

## References

- EcoStruxure Machine Expert - Basic User Guide
- IEC 61131-3 Instruction List Programming
- Schneider Electric TM221 Programming Guide

**Last Updated**: 2025-12-22
**Source**: User-corrected Sequential_Lights_IL.smbp
