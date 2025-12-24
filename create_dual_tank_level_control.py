"""
Dual Tank Automatic Level Control - TM221CE16T
Automatic control of water level in two tanks using pumps

System Description:
- Tank 1: Level controlled by Pump 1
- Tank 2: Level controlled by Pump 2
- Each tank has HIGH and LOW level sensors
- Pumps start when level is LOW, stop when level is HIGH
- Automatic mode with manual override capability

Controller: Schneider TM221CE16T
Date: 2025-12-24
"""

import os

def create_dual_tank_control():
    """Create dual-tank automatic level control program"""

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
        "Dual_Tank_Level_Control_TM221CE16T.smbp"
    )

    # Read template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace project name
    content = content.replace(
        '<Name>Sequential_Lights_IL</Name>',
        '<Name>Dual_Tank_Level_Control</Name>'
    )
    content = content.replace(
        'Sequential_Lights_IL.smbp',
        'Dual_Tank_Level_Control_TM221CE16T.smbp'
    )
    content = content.replace(
        '<Name>Sequential_Lights_Main</Name>',
        '<Name>Tank_Control_Main</Name>'
    )

    # Find and replace the Rungs section
    rungs_start = content.find('<Rungs>')
    rungs_end = content.find('</Rungs>') + len('</Rungs>')

    if rungs_start == -1 or rungs_end == -1:
        print("ERROR: Could not find Rungs section!")
        return None

    # Generate new rungs for dual tank control
    new_rungs = generate_dual_tank_rungs()

    # Replace rungs section
    content = content[:rungs_start] + new_rungs + content[rungs_end:]

    # Update I/O symbols
    content = update_io_symbols(content)

    # Update timer configuration (if needed)
    content = update_timers(content)

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_dual_tank_rungs():
    """Generate rungs for dual tank automatic level control"""
    return '''<Rungs>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.0</Descriptor>
                <Comment>Auto Mode Enable</Comment>
                <Symbol>AUTO_MODE</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Auto Mode Active Flag</Comment>
                <Symbol>AUTO_ACTIVE</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load AUTO_MODE switch</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to AUTO_ACTIVE flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>Automatic Mode Enable Control</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Auto Mode Active</Comment>
                <Symbol>AUTO_ACTIVE</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.2</Descriptor>
                <Comment>Manual Pump 1 Start</Comment>
                <Symbol>MANUAL_PUMP1</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Tank 1 LOW Level Sensor</Comment>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M1</Descriptor>
                <Comment>Pump 1 Running (Seal-in)</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>1</Row>
                <Column>1</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.3</Descriptor>
                <Comment>Tank 1 HIGH Level Sensor</Comment>
                <Symbol>TANK1_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M1</Descriptor>
                <Comment>Pump 1 Running Flag</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load AUTO_ACTIVE</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT TANK1_LOW (level is LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M1</InstructionLine>
                <Comment>OR PUMP1_RUN (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.2</InstructionLine>
                <Comment>OR MANUAL_PUMP1</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.3</InstructionLine>
                <Comment>AND NOT TANK1_HIGH (stop when HIGH)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M1</InstructionLine>
                <Comment>Store to PUMP1_RUN</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Tank 1 Level Control - Pump 1</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M1</Descriptor>
                <Comment>Pump 1 Running</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.0</Descriptor>
                <Comment>Pump 1 Contactor Output</Comment>
                <Symbol>PUMP1_OUTPUT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
                <Comment>Load PUMP1_RUN</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Energize Pump 1 Contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Pump 1 Output Control</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Auto Mode Active</Comment>
                <Symbol>AUTO_ACTIVE</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.4</Descriptor>
                <Comment>Manual Pump 2 Start</Comment>
                <Symbol>MANUAL_PUMP2</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.5</Descriptor>
                <Comment>Tank 2 LOW Level Sensor</Comment>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M2</Descriptor>
                <Comment>Pump 2 Running (Seal-in)</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>1</Row>
                <Column>1</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.6</Descriptor>
                <Comment>Tank 2 HIGH Level Sensor</Comment>
                <Symbol>TANK2_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M2</Descriptor>
                <Comment>Pump 2 Running Flag</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load AUTO_ACTIVE</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.5</InstructionLine>
                <Comment>AND NOT TANK2_LOW (level is LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M2</InstructionLine>
                <Comment>OR PUMP2_RUN (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.4</InstructionLine>
                <Comment>OR MANUAL_PUMP2</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.6</InstructionLine>
                <Comment>AND NOT TANK2_HIGH (stop when HIGH)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M2</InstructionLine>
                <Comment>Store to PUMP2_RUN</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Tank 2 Level Control - Pump 2</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M2</Descriptor>
                <Comment>Pump 2 Running</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.1</Descriptor>
                <Comment>Pump 2 Contactor Output</Comment>
                <Symbol>PUMP2_OUTPUT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M2</InstructionLine>
                <Comment>Load PUMP2_RUN</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.1</InstructionLine>
                <Comment>Energize Pump 2 Contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Pump 2 Output Control</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
        </Rungs>'''


def update_io_symbols(content):
    """Update I/O symbol names for dual tank system"""
    import re

    # Replace input symbols for tank system
    replacements = [
        ('<Symbol>SENSOR_1</Symbol>', '<Symbol>AUTO_MODE</Symbol>'),
        ('<Symbol>SENSOR_2</Symbol>', '<Symbol>TANK1_LOW</Symbol>'),
        ('<Symbol>CONVYER_1</Symbol>', '<Symbol>PUMP1_OUTPUT</Symbol>'),
        ('<Symbol>CONVYER_2</Symbol>', '<Symbol>PUMP2_OUTPUT</Symbol>'),
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    # Add symbols for additional inputs
    io_additions = [
        (r'(<Address>%I0\.2</Address>\s+<Index>2</Index>)',
         r'\1\n            <Symbol>MANUAL_PUMP1</Symbol>\n            <Comment>Manual Pump 1 Start Button</Comment>'),
        (r'(<Address>%I0\.3</Address>\s+<Index>3</Index>)',
         r'\1\n            <Symbol>TANK1_HIGH</Symbol>\n            <Comment>Tank 1 HIGH Level Sensor</Comment>'),
        (r'(<Address>%I0\.4</Address>\s+<Index>4</Index>)',
         r'\1\n            <Symbol>MANUAL_PUMP2</Symbol>\n            <Comment>Manual Pump 2 Start Button</Comment>'),
        (r'(<Address>%I0\.5</Address>\s+<Index>5</Index>)',
         r'\1\n            <Symbol>TANK2_LOW</Symbol>\n            <Comment>Tank 2 LOW Level Sensor</Comment>'),
        (r'(<Address>%I0\.6</Address>\s+<Index>6</Index>)',
         r'\1\n            <Symbol>TANK2_HIGH</Symbol>\n            <Comment>Tank 2 HIGH Level Sensor</Comment>'),
    ]

    for pattern, replacement in io_additions:
        content = re.sub(pattern, replacement, content)

    # Add memory bit symbols
    if '<Address>%M0</Address>' in content:
        pattern = r'(<Address>%M0</Address>\s+<Index>0</Index>)'
        replacement = r'\1\n        <Symbol>AUTO_ACTIVE</Symbol>\n        <Comment>Auto Mode Active Flag</Comment>'
        content = re.sub(pattern, replacement, content)

    if '<Address>%M1</Address>' in content:
        pattern = r'(<Address>%M1</Address>\s+<Index>1</Index>)'
        replacement = r'\1\n        <Symbol>PUMP1_RUN</Symbol>\n        <Comment>Pump 1 Running Flag</Comment>'
        content = re.sub(pattern, replacement, content)
    elif '<MemoryBits>' in content:
        # Add %M1 if not exists
        mb_section = content.find('</MemoryBits>')
        if mb_section != -1:
            new_mb = '''    <MemoryBit>
        <Address>%M1</Address>
        <Index>1</Index>
        <Symbol>PUMP1_RUN</Symbol>
        <Comment>Pump 1 Running Flag</Comment>
      </MemoryBit>
'''
            content = content[:mb_section] + new_mb + content[mb_section:]

    return content


def update_timers(content):
    """Update timer configuration - no timers needed for level control"""
    import re

    # Set timer count to 0 since we don't use timers
    pattern = r'(<TimersMemoryAllocation>.*?<ForcedCount>)\d+(</ForcedCount>)'
    content = re.sub(pattern, r'\g<1>0\g<2>', content, flags=re.DOTALL)

    return content


if __name__ == "__main__":
    print("=" * 70)
    print("Dual Tank Automatic Level Control - TM221CE16T")
    print("=" * 70)
    print()

    filepath = create_dual_tank_control()

    if filepath:
        print()
        print("=" * 70)
        print("PROGRAM SUMMARY")
        print("=" * 70)
        print("""
DUAL TANK AUTOMATIC LEVEL CONTROL SYSTEM
==========================================

SYSTEM DESCRIPTION:
-------------------
Two independent tanks with automatic level control.
Each tank has a LOW and HIGH level sensor.
Pumps start automatically when level drops below LOW sensor.
Pumps stop automatically when level reaches HIGH sensor.
Manual override buttons available for both pumps.

CONTROLLER: Schneider TM221CE16T

I/O ASSIGNMENT:
--------------
INPUTS:
  %I0.0 - AUTO_MODE          (Auto Mode Enable Switch)
  %I0.1 - TANK1_LOW          (Tank 1 LOW Level Sensor - NC)
  %I0.2 - MANUAL_PUMP1       (Manual Pump 1 Start Button - NO)
  %I0.3 - TANK1_HIGH         (Tank 1 HIGH Level Sensor - NC)
  %I0.4 - MANUAL_PUMP2       (Manual Pump 2 Start Button - NO)
  %I0.5 - TANK2_LOW          (Tank 2 LOW Level Sensor - NC)
  %I0.6 - TANK2_HIGH         (Tank 2 HIGH Level Sensor - NC)

OUTPUTS:
  %Q0.0 - PUMP1_OUTPUT       (Pump 1 Contactor)
  %Q0.1 - PUMP2_OUTPUT       (Pump 2 Contactor)

INTERNAL MEMORY:
  %M0 - AUTO_ACTIVE          (Auto Mode Active Flag)
  %M1 - PUMP1_RUN            (Pump 1 Running Flag with Seal-in)
  %M2 - PUMP2_RUN            (Pump 2 Running Flag with Seal-in)

LADDER LOGIC STRUCTURE:
-----------------------

Rung 1: Auto Mode Control
  |--[AUTO_MODE]--(AUTO_ACTIVE)--|

Rung 2: Tank 1 Level Control
  |--[AUTO_ACTIVE]--]/[TANK1_LOW]--+--]/[TANK1_HIGH]--(PUMP1_RUN)--|
  |                                 |                                |
  |--[MANUAL_PUMP1]----------------+                                |
  |                                 |                                |
  |--[PUMP1_RUN]-------------------+  (Seal-in)                     |

Rung 3: Pump 1 Output
  |--[PUMP1_RUN]--(PUMP1_OUTPUT)--|

Rung 4: Tank 2 Level Control
  |--[AUTO_ACTIVE]--]/[TANK2_LOW]--+--]/[TANK2_HIGH]--(PUMP2_RUN)--|
  |                                 |                                |
  |--[MANUAL_PUMP2]----------------+                                |
  |                                 |                                |
  |--[PUMP2_RUN]-------------------+  (Seal-in)                     |

Rung 5: Pump 2 Output
  |--[PUMP2_RUN]--(PUMP2_OUTPUT)--|

OPERATION SEQUENCE:
------------------
AUTOMATIC MODE (AUTO_MODE = ON):
  Tank 1:
    1. Water level drops below LOW sensor -> TANK1_LOW contact opens
    2. Pump 1 starts automatically
    3. Pump 1 continues running (seal-in circuit)
    4. Water level reaches HIGH sensor -> TANK1_HIGH contact opens
    5. Pump 1 stops

  Tank 2:
    1. Water level drops below LOW sensor -> TANK2_LOW contact opens
    2. Pump 2 starts automatically
    3. Pump 2 continues running (seal-in circuit)
    4. Water level reaches HIGH sensor -> TANK2_HIGH contact opens
    5. Pump 2 stops

MANUAL MODE (AUTO_MODE = OFF):
  - Press MANUAL_PUMP1 button to start Pump 1
  - Press MANUAL_PUMP2 button to start Pump 2
  - Pumps still stop at HIGH level for safety
  - Independent control of each pump

SAFETY FEATURES:
---------------
  - NC (Normally Closed) contacts for level sensors (fail-safe)
  - HIGH level sensor always stops pump (prevents overflow)
  - Seal-in circuit maintains pump operation during filling
  - Independent control for each tank
  - Manual override capability

SENSOR WIRING:
-------------
  - LOW sensors: Normally Closed (NC) - Opens when water ABOVE LOW level
  - HIGH sensors: Normally Closed (NC) - Opens when water ABOVE HIGH level
  - When tank is empty: Both sensors CLOSED
  - When tank between LOW and HIGH: LOW sensor OPEN, HIGH sensor CLOSED
  - When tank is full: Both sensors OPEN

TYPICAL OPERATION:
-----------------
  Tank Empty:
    - TANK_LOW: CLOSED (1)
    - TANK_HIGH: CLOSED (1)
    - Pump: OFF

  Tank Below LOW:
    - TANK_LOW: CLOSED (1)
    - TANK_HIGH: CLOSED (1)
    - Pump: ON (Auto mode)

  Tank Between LOW and HIGH:
    - TANK_LOW: OPEN (0)
    - TANK_HIGH: CLOSED (1)
    - Pump: ON (Continues via seal-in)

  Tank Above HIGH:
    - TANK_LOW: OPEN (0)
    - TANK_HIGH: OPEN (0)
    - Pump: OFF (Stopped by HIGH sensor)

INSTALLATION NOTES:
------------------
1. Install LOW level sensor about 20-30% tank height
2. Install HIGH level sensor about 80-90% tank height
3. Ensure adequate hysteresis between LOW and HIGH levels
4. Connect level sensors as Normally Closed (NC) contacts
5. Wire pump contactors to %Q0.0 (Pump 1) and %Q0.1 (Pump 2)
6. Add overload protection on each pump circuit
7. Install emergency stop button if required

TESTING PROCEDURE:
-----------------
1. Turn on AUTO_MODE switch
2. Manually drain Tank 1 below LOW level
3. Verify Pump 1 starts automatically
4. Observe Pump 1 continues running as level rises
5. Verify Pump 1 stops when HIGH level reached
6. Repeat test for Tank 2
7. Test manual override buttons
8. Test emergency stop (if installed)
""")
        print("=" * 70)
        print(f"File created: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("Controller: TM221CE16T")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
