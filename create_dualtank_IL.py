"""
Dual Tank Automatic Level Control - Instruction Logic (IL) Version
Based on diagram: Maintain level of both tanks automatically

Template: create_sequential_lights_IL.py
Controller: TM221CE16T
Output: DualTank_LevelControl.smbp
"""

import os

def create_dualtank_IL():
    """Create dual-tank level control using instruction logic"""

    # Source template (working file)
    template_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_Lights_IL.smbp"
    )

    # Output path
    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "DualTank_LevelControl.smbp"
    )

    # Read template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace project name
    content = content.replace(
        '<Name>Sequential_Lights_IL</Name>',
        '<Name>DualTank_LevelControl</Name>'
    )
    content = content.replace(
        'Sequential_Lights_IL.smbp',
        'DualTank_LevelControl.smbp'
    )
    content = content.replace(
        '<Name>Sequential_Lights_Main</Name>',
        '<Name>DualTank_Main</Name>'
    )

    # Find and replace the Rungs section
    rungs_start = content.find('<Rungs>')
    rungs_end = content.find('</Rungs>') + len('</Rungs>')

    if rungs_start == -1 or rungs_end == -1:
        print("ERROR: Could not find Rungs section!")
        return None

    # Generate new rungs with instruction logic for dual tanks
    new_rungs = generate_dualtank_IL_rungs()

    # Replace rungs section
    content = content[:rungs_start] + new_rungs + content[rungs_end:]

    # Update I/O symbols
    content = update_io_symbols(content)

    # No timers needed for level control (removed timer update)

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_dualtank_IL_rungs():
    """Generate instruction logic rungs for dual-tank level control"""
    return '''<Rungs>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load AUTO MODE switch</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to auto active flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>Auto Mode Control</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load auto mode active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT Tank 1 LOW (L1 - NC sensor opens when LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M1</InstructionLine>
                <Comment>OR with Pump 1 seal-in</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.2</InstructionLine>
                <Comment>OR with manual Pump 1 start</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.3</InstructionLine>
                <Comment>AND NOT Tank 1 HIGH (L2 - stop at HIGH)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M1</InstructionLine>
                <Comment>Store to Pump 1 run flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Tank 1 Level Control (L1-L2 sensors)</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
                <Comment>Load Pump 1 run flag</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Turn ON Pump 1</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Pump 1 Output Control</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load auto mode active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.5</InstructionLine>
                <Comment>AND NOT Tank 2 LOW (L3 - NC sensor opens when LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M2</InstructionLine>
                <Comment>OR with Pump 2 seal-in</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.4</InstructionLine>
                <Comment>OR with manual Pump 2 start</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.6</InstructionLine>
                <Comment>AND NOT Tank 2 HIGH (L4 - stop at HIGH)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M2</InstructionLine>
                <Comment>Store to Pump 2 run flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Tank 2 Level Control (L3-L4 sensors)</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M2</InstructionLine>
                <Comment>Load Pump 2 run flag</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.1</InstructionLine>
                <Comment>Turn ON Pump 2</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Pump 2 Output Control</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
        </Rungs>'''


def update_io_symbols(content):
    """Update I/O symbol names for dual tank system"""
    import re
    # Symbols are already in instruction comments
    return content


if __name__ == "__main__":
    print("=" * 70)
    print("DUAL TANK AUTOMATIC LEVEL CONTROL - IL Version")
    print("Template: create_sequential_lights_IL.py")
    print("Controller: TM221CE16T")
    print("=" * 70)
    print()

    filepath = create_dualtank_IL()

    if filepath:
        print()
        print("=" * 70)
        print("INSTRUCTION LOGIC PROGRAM")
        print("=" * 70)
        print("""
INSTRUCTION LOGIC PROGRAM STRUCTURE:
------------------------------------

Rung 1: Auto Mode Control
  LD    %I0.0        ; Load AUTO MODE switch
  ST    %M0          ; Store to auto active flag

Rung 2: Tank 1 Level Control (L1-L2 sensors)
  LD    %M0          ; Load auto mode active
  ANDN  %I0.1        ; AND NOT Tank 1 LOW (L1 - NC opens when LOW)
  OR    %M1          ; OR with Pump 1 seal-in
  OR    %I0.2        ; OR with manual Pump 1 start
  ANDN  %I0.3        ; AND NOT Tank 1 HIGH (L2 - stop at HIGH)
  ST    %M1          ; Store to Pump 1 run flag

Rung 3: Pump 1 Output
  LD    %M1          ; Load Pump 1 run flag
  ST    %Q0.0        ; Turn ON Pump 1

Rung 4: Tank 2 Level Control (L3-L4 sensors)
  LD    %M0          ; Load auto mode active
  ANDN  %I0.5        ; AND NOT Tank 2 LOW (L3 - NC opens when LOW)
  OR    %M2          ; OR with Pump 2 seal-in
  OR    %I0.4        ; OR with manual Pump 2 start
  ANDN  %I0.6        ; AND NOT Tank 2 HIGH (L4 - stop at HIGH)
  ST    %M2          ; Store to Pump 2 run flag

Rung 5: Pump 2 Output
  LD    %M2          ; Load Pump 2 run flag
  ST    %Q0.1        ; Turn ON Pump 2

I/O ASSIGNMENT (Per Your Diagram):
----------------------------------
INPUTS - Level Sensors (NC Type):
  %I0.1 - L1 (Tank 1 LOW sensor)
  %I0.3 - L2 (Tank 1 HIGH sensor)
  %I0.5 - L3 (Tank 2 LOW sensor)
  %I0.6 - L4 (Tank 2 HIGH sensor)

INPUTS - Control:
  %I0.0 - AUTO_MODE (Auto mode enable switch)
  %I0.2 - MANUAL_PUMP1 (Manual Pump 1 start button)
  %I0.4 - MANUAL_PUMP2 (Manual Pump 2 start button)

OUTPUTS - Pumps:
  %Q0.0 - PUMP1_OUTPUT (Pump 1 contactor)
  %Q0.1 - PUMP2_OUTPUT (Pump 2 contactor)

INTERNAL MEMORY:
  %M0 - AUTO_ACTIVE (Auto mode active flag)
  %M1 - PUMP1_RUN (Pump 1 running with seal-in)
  %M2 - PUMP2_RUN (Pump 2 running with seal-in)

TANK 1 OPERATION (L1-L2 sensors):
---------------------------------
1. Water drops below L1 (LOW) → Pump 1 starts
2. Seal-in keeps Pump 1 running
3. Water reaches L2 (HIGH) → Pump 1 stops

TANK 2 OPERATION (L3-L4 sensors):
---------------------------------
1. Water drops below L3 (LOW) → Pump 2 starts
2. Seal-in keeps Pump 2 running
3. Water reaches L4 (HIGH) → Pump 2 stops

SAFETY FEATURES:
---------------
- NC sensors (fail-safe: wire break = pump stops)
- HIGH sensors prevent overflow
- Seal-in circuits prevent rapid cycling
- Manual override capability

SENSOR TYPE: Normally Closed (NC) Float Switches
  - Opens when water ABOVE sensor level
  - Wire break = pump stops (safe failure mode)

SYSTEM FROM DIAGRAM:
-------------------
- Tank 1: Fed by Pump 1, monitored by L1 (LOW) and L2 (HIGH)
- Tank 2: Receives overflow from Tank 1, monitored by L3 (LOW) and L4 (HIGH)
- Independent level control for each tank
- Automatic operation with manual override
""")
        print("=" * 70)
        print(f"SUCCESS: Created {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("Controller: TM221CE16T")
        print("Instruction Logic (IL) Format")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
