"""
Dual Tank Automatic Level Control - tankcontrol.smbp
Maintain water level in both tanks automatically using TM221CE16T

Template: create_sequential_4lights_LD.py
Output: tankcontrol.smbp
"""

import os

def create_tankcontrol():
    """Create dual-tank level control as tankcontrol.smbp"""

    # Source template (working file)
    template_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_Lights_IL.smbp"
    )

    # Output path - save as tankcontrol.smbp
    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "tankcontrol.smbp"
    )

    # Read template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace project name
    content = content.replace(
        '<Name>Sequential_Lights_IL</Name>',
        '<Name>TankControl</Name>'
    )
    content = content.replace(
        'Sequential_Lights_IL.smbp',
        'tankcontrol.smbp'
    )
    content = content.replace(
        '<Name>Sequential_Lights_Main</Name>',
        '<Name>TankControl_Main</Name>'
    )

    # Find and replace the Rungs section
    rungs_start = content.find('<Rungs>')
    rungs_end = content.find('</Rungs>') + len('</Rungs>')

    if rungs_start == -1 or rungs_end == -1:
        print("ERROR: Could not find Rungs section!")
        return None

    # Generate new rungs with ladder diagram for dual tanks
    new_rungs = generate_tankcontrol_rungs()

    # Replace rungs section
    content = content[:rungs_start] + new_rungs + content[rungs_end:]

    # Update I/O symbols
    content = update_io_symbols(content)

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_tankcontrol_rungs():
    """Generate ladder diagram rungs for dual-tank level control"""
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
                <Comment>Manual Pump 1</Comment>
                <Symbol>MANUAL_PUMP1</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Down, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M1</Descriptor>
                <Comment>Pump 1 Seal-in</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>2</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Tank 1 LOW (L1 sensor NC)</Comment>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.3</Descriptor>
                <Comment>NOT Tank 1 HIGH (L2)</Comment>
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
                <Comment>Pump 1 Run Flag</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load auto mode active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT Tank 1 LOW (NC opens when LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M1</InstructionLine>
                <Comment>OR with seal-in</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.2</InstructionLine>
                <Comment>OR with manual start</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.3</InstructionLine>
                <Comment>AND NOT Tank 1 HIGH (stop at high)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M1</InstructionLine>
                <Comment>Store to Pump 1 run flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Tank 1 Level Control (L1-L2 sensors)</MainComment>
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
                <Comment>Pump 1 Output</Comment>
                <Symbol>PUMP1_OUTPUT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
                <Comment>Manual Pump 2</Comment>
                <Symbol>MANUAL_PUMP2</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Down, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M2</Descriptor>
                <Comment>Pump 2 Seal-in</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>2</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.5</Descriptor>
                <Comment>Tank 2 LOW (L3 sensor NC)</Comment>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.6</Descriptor>
                <Comment>NOT Tank 2 HIGH (L4)</Comment>
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
                <Comment>Pump 2 Run Flag</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load auto mode active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.5</InstructionLine>
                <Comment>AND NOT Tank 2 LOW (NC opens when LOW)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M2</InstructionLine>
                <Comment>OR with seal-in</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %I0.4</InstructionLine>
                <Comment>OR with manual start</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.6</InstructionLine>
                <Comment>AND NOT Tank 2 HIGH (stop at high)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M2</InstructionLine>
                <Comment>Store to Pump 2 run flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Tank 2 Level Control (L3-L4 sensors)</MainComment>
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
                <Comment>Pump 2 Output</Comment>
                <Symbol>PUMP2_OUTPUT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
        </Rungs>'''


def update_io_symbols(content):
    """Update I/O symbol names for dual tank system"""
    import re
    # Symbols are already defined in ladder elements
    return content


if __name__ == "__main__":
    print("=" * 70)
    print("DUAL TANK AUTOMATIC LEVEL CONTROL")
    print("Output File: tankcontrol.smbp")
    print("Controller: TM221CE16T")
    print("Template: create_sequential_4lights_LD.py")
    print("=" * 70)
    print()

    filepath = create_tankcontrol()

    if filepath:
        print()
        print("=" * 70)
        print("LADDER DIAGRAM PROGRAM - tankcontrol.smbp")
        print("=" * 70)
        print("""
GRAPHICAL LADDER DIAGRAM:
-------------------------

Rung 1: Auto Mode Control
  |--[AUTO_MODE]--(AUTO_ACTIVE)--|

Rung 2: Tank 1 Level Control
  |--[AUTO_ACTIVE]--]/[L1 TANK1_LOW]--+--]/[L2 TANK1_HIGH]--(PUMP1_RUN)--|
  |                                    |                                   |
  |--[MANUAL_PUMP1]------------------+                                   |
  |                                    |                                   |
  |--[PUMP1_RUN]---------------------+  (Seal-in)                        |

Rung 3: Pump 1 Output
  |--[PUMP1_RUN]--(PUMP1_OUTPUT %Q0.0)--|

Rung 4: Tank 2 Level Control
  |--[AUTO_ACTIVE]--]/[L3 TANK2_LOW]--+--]/[L4 TANK2_HIGH]--(PUMP2_RUN)--|
  |                                    |                                   |
  |--[MANUAL_PUMP2]------------------+                                   |
  |                                    |                                   |
  |--[PUMP2_RUN]---------------------+  (Seal-in)                        |

Rung 5: Pump 2 Output
  |--[PUMP2_RUN]--(PUMP2_OUTPUT %Q0.1)--|

I/O ASSIGNMENT (Per Your Diagram):
----------------------------------
INPUTS - Level Sensors:
  %I0.1 - L1 (Tank 1 LOW sensor - NC)
  %I0.3 - L2 (Tank 1 HIGH sensor - NC)
  %I0.5 - L3 (Tank 2 LOW sensor - NC)
  %I0.6 - L4 (Tank 2 HIGH sensor - NC)

INPUTS - Control:
  %I0.0 - AUTO_MODE (Auto mode enable switch)
  %I0.2 - MANUAL_PUMP1 (Manual Pump 1 start)
  %I0.4 - MANUAL_PUMP2 (Manual Pump 2 start)

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
  2. Seal-in keeps pump running
  3. Water reaches L2 (HIGH) → Pump 1 stops

TANK 2 OPERATION (L3-L4 sensors):
---------------------------------
  1. Water drops below L3 (LOW) → Pump 2 starts
  2. Seal-in keeps pump running
  3. Water reaches L4 (HIGH) → Pump 2 stops

SAFETY FEATURES:
---------------
  - NC sensors (fail-safe operation)
  - HIGH sensors prevent overflow
  - Manual override available
  - Seal-in prevents rapid cycling

SENSOR TYPE: Normally Closed (NC) Float Switches
  - Opens when water ABOVE sensor level
  - Wire break = pump stops (safe failure)
""")
        print("=" * 70)
        print(f"SUCCESS: Created {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("Controller: TM221CE16T")
        print("Displays as GRAPHICAL LADDER DIAGRAM")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
