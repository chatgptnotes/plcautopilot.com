"""
3-Pump 3-Tank Backup System for TM221CE24T
===========================================
Using template-based approach as per schneider.md skill

Controller: TM221CE24T (14 DI / 10 DO)

I/O ASSIGNMENT:
---------------
INPUTS (12 used of 14):
  %I0.0  - START_BTN       System Start
  %I0.1  - STOP_BTN        System Stop (NC)
  %I0.2  - PUMP1_SPEED_OK  Pump 1 Zero Speed (NC)
  %I0.3  - PUMP2_SPEED_OK  Pump 2 Zero Speed (NC)
  %I0.4  - PUMP3_SPEED_OK  Pump 3 Zero Speed (NC)
  %I0.5  - TANK1_LOW       Tank 1 Low Level
  %I0.6  - TANK1_HIGH      Tank 1 High Level
  %I0.7  - TANK2_LOW       Tank 2 Low Level
  %I0.8  - TANK2_HIGH      Tank 2 High Level
  %I0.9  - TANK3_LOW       Tank 3 Low Level
  %I0.10 - TANK3_HIGH      Tank 3 High Level
  %I0.11 - FAULT_RESET     Fault Reset Button

OUTPUTS (10 used of 10):
  %Q0.0 - PUMP1_RUN        Pump 1 Motor
  %Q0.1 - PUMP2_RUN        Pump 2 Motor
  %Q0.2 - PUMP3_RUN        Pump 3 Motor
  %Q0.3 - VALVE_12         Valve Tank 1-2
  %Q0.4 - VALVE_23         Valve Tank 2-3
  %Q0.5 - PUMP1_FAULT_IND  Pump 1 Fault Light
  %Q0.6 - PUMP2_FAULT_IND  Pump 2 Fault Light
  %Q0.7 - PUMP3_FAULT_IND  Pump 3 Fault Light
  %Q0.8 - SYSTEM_RUN_IND   System Running Light
  %Q0.9 - ALARM_OUTPUT     Alarm Horn

MEMORY BITS:
  %M0  - SYSTEM_RUN
  %M1  - PUMP1_CMD
  %M2  - PUMP2_CMD
  %M3  - PUMP3_CMD
  %M10 - PUMP1_FAULT (latched)
  %M11 - PUMP2_FAULT (latched)
  %M12 - PUMP3_FAULT (latched)
  %M20 - TANK1_NEEDS_BACKUP
  %M21 - TANK2_NEEDS_BACKUP

TIMERS:
  %TM0 - PUMP1_START_DELAY (2s)
  %TM1 - PUMP2_START_DELAY (2s)
  %TM2 - PUMP3_START_DELAY (2s)
"""

import os
from datetime import datetime


def create_pump_tank_TM221():
    """Create 3-pump 3-tank backup system for TM221CE24T"""

    # Use template file if it exists
    template_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_Lights_IL.smbp"
    )

    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Pump_Tank_TM221.smbp"
    )

    print(f"Creating TM221 Pump/Tank Backup System...")
    print(f"Controller: TM221CE24T (14 DI / 10 DO)")
    print()

    # Check if template exists
    if os.path.exists(template_path):
        print(f"Using template: {template_path}")
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace project name
        content = content.replace('Sequential_Lights_IL', 'Pump_Tank_TM221')
        content = content.replace('Sequential_Lights_Main', 'Pump_Tank_Main')

        # Find and replace Rungs section
        rungs_start = content.find('<Rungs>')
        rungs_end = content.find('</Rungs>') + len('</Rungs>')

        if rungs_start != -1 and rungs_end != -1:
            new_rungs = generate_pump_tank_rungs()
            content = content[:rungs_start] + new_rungs + content[rungs_end:]
            print("Replaced Rungs section with pump/tank logic")
        else:
            print("ERROR: Could not find Rungs section in template!")
            return None

        # Update timers section
        content = update_timers_section(content)

        # Update I/O symbols
        content = update_io_section(content)

    else:
        print(f"Template not found, generating from scratch...")
        content = generate_full_smbp()

    # Write output
    print(f"Writing: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_pump_tank_rungs():
    """Generate all ladder rungs for pump/tank backup system"""

    return '''<Rungs>
          <!-- RUNG 1: System Start/Stop -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.0</Descriptor>
                <Comment>Start Button</Comment>
                <Symbol>START_BTN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Seal-in</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Stop Button NC</Comment>
                <Symbol>STOP_BTN</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>System Running</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %I0.0</InstructionLine><Comment>Load START</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M0</InstructionLine><Comment>Seal-in</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.1</InstructionLine><Comment>AND NOT STOP</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M0</InstructionLine><Comment>SYSTEM_RUN</Comment></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>System Start/Stop Control</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 2: Pump 1 Command -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.5</Descriptor>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.6</Descriptor>
                <Symbol>TANK1_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M1</Descriptor>
                <Symbol>PUMP1_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>AND   %I0.5</InstructionLine><Comment>Tank 1 low</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.6</InstructionLine><Comment>Not high</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %M10</InstructionLine><Comment>No fault</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M1</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Pump 1 Command - Fill Tank 1</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 3: Pump 2 Command -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.7</Descriptor>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.8</Descriptor>
                <Symbol>TANK2_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M2</Descriptor>
                <Symbol>PUMP2_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>AND   %I0.7</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.8</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M2</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Pump 2 Command - Fill Tank 2</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 4: Pump 3 Command -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.9</Descriptor>
                <Symbol>TANK3_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.10</Descriptor>
                <Symbol>TANK3_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M3</Descriptor>
                <Symbol>PUMP3_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>AND   %I0.9</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.10</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M3</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Pump 3 Command - Fill Tank 3</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 5: Pump 1 Timer + Output -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M1</Descriptor>
                <Symbol>PUMP1_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM0</Descriptor>
                <Symbol>PUMP1_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.0</Descriptor>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>BLK   %TM0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>LD    %M1</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>IN</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>END_BLK</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>LD    %M1</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.0</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Pump 1 Timer + Output</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 6: Pump 1 Fault Detection -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM0.Q</Descriptor>
                <Symbol>PUMP1_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.2</Descriptor>
                <Symbol>PUMP1_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.11</Descriptor>
                <Symbol>FAULT_RESET</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M10</Descriptor>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %TM0.Q</InstructionLine><Comment>Timer done</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.2</InstructionLine><Comment>No speed</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M10</InstructionLine><Comment>Latch</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.11</InstructionLine><Comment>Not reset</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M10</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 6</Name>
            <MainComment>Pump 1 Zero Speed Fault - Latching</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 7: Pump 2 Timer + Output + Backup -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M2</Descriptor>
                <Symbol>PUMP2_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M20</Descriptor>
                <Symbol>TANK1_BACKUP</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM1</Descriptor>
                <Symbol>PUMP2_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.1</Descriptor>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M2</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M20</InstructionLine><Comment>Backup Tank1</Comment></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.1</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 7</Name>
            <MainComment>Pump 2 Output + Backup for Tank 1</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 8: Pump 2 Fault Detection -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM1.Q</Descriptor>
                <Symbol>PUMP2_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.3</Descriptor>
                <Symbol>PUMP2_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.11</Descriptor>
                <Symbol>FAULT_RESET</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M11</Descriptor>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %TM1.Q</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.3</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M11</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 8</Name>
            <MainComment>Pump 2 Zero Speed Fault</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 9: Pump 3 Output + Backup -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M3</Descriptor>
                <Symbol>PUMP3_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M21</Descriptor>
                <Symbol>TANK2_BACKUP</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM2</Descriptor>
                <Symbol>PUMP3_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.2</Descriptor>
                <Symbol>PUMP3_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M3</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M21</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.2</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 9</Name>
            <MainComment>Pump 3 Output + Backup for Tank 2</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 10: Pump 3 Fault Detection -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM2.Q</Descriptor>
                <Symbol>PUMP3_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.4</Descriptor>
                <Symbol>PUMP3_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.11</Descriptor>
                <Symbol>FAULT_RESET</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %TM2.Q</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.4</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %I0.11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M12</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 10</Name>
            <MainComment>Pump 3 Zero Speed Fault</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 11: Tank 1 Backup Request -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.5</Descriptor>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M20</Descriptor>
                <Symbol>TANK1_BACKUP</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M10</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>AND   %I0.5</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M20</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 11</Name>
            <MainComment>Tank 1 Backup - Pump 2 takes over</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 12: Tank 2 Backup Request -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.7</Descriptor>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M21</Descriptor>
                <Symbol>TANK2_BACKUP</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>AND   %I0.7</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ANDN  %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %M21</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 12</Name>
            <MainComment>Tank 2 Backup - Pump 3 takes over</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 13: Valve 1-2 -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M20</Descriptor>
                <Symbol>TANK1_BACKUP</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.3</Descriptor>
                <Symbol>VALVE_12</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M20</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.3</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 13</Name>
            <MainComment>Valve 1-2 Opens in Backup</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 14: Valve 2-3 -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M21</Descriptor>
                <Symbol>TANK2_BACKUP</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.4</Descriptor>
                <Symbol>VALVE_23</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M21</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.4</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 14</Name>
            <MainComment>Valve 2-3 Opens in Backup</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 15-17: Fault Indicators -->
          <RungEntity>
            <LadderElements>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M10</Descriptor><Symbol>PUMP1_FAULT</Symbol><Row>0</Row><Column>0</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Coil</ElementType><Descriptor>%Q0.5</Descriptor><Symbol>PUMP1_FAULT_IND</Symbol><Row>0</Row><Column>10</Column><ChosenConnection>Left</ChosenConnection></LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M10</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.5</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 15</Name>
            <MainComment>Pump 1 Fault Indicator</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <RungEntity>
            <LadderElements>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M11</Descriptor><Symbol>PUMP2_FAULT</Symbol><Row>0</Row><Column>0</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Coil</ElementType><Descriptor>%Q0.6</Descriptor><Symbol>PUMP2_FAULT_IND</Symbol><Row>0</Row><Column>10</Column><ChosenConnection>Left</ChosenConnection></LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.6</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 16</Name>
            <MainComment>Pump 2 Fault Indicator</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <RungEntity>
            <LadderElements>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M12</Descriptor><Symbol>PUMP3_FAULT</Symbol><Row>0</Row><Column>0</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Coil</ElementType><Descriptor>%Q0.7</Descriptor><Symbol>PUMP3_FAULT_IND</Symbol><Row>0</Row><Column>10</Column><ChosenConnection>Left</ChosenConnection></LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.7</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 17</Name>
            <MainComment>Pump 3 Fault Indicator</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 18: System Running -->
          <RungEntity>
            <LadderElements>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M0</Descriptor><Symbol>SYSTEM_RUN</Symbol><Row>0</Row><Column>0</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Coil</ElementType><Descriptor>%Q0.8</Descriptor><Symbol>SYSTEM_RUN_IND</Symbol><Row>0</Row><Column>10</Column><ChosenConnection>Left</ChosenConnection></LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.8</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 18</Name>
            <MainComment>System Running Indicator</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 19: Alarm -->
          <RungEntity>
            <LadderElements>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M10</Descriptor><Symbol>PUMP1_FAULT</Symbol><Row>0</Row><Column>0</Column><ChosenConnection>Down, Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M11</Descriptor><Symbol>PUMP2_FAULT</Symbol><Row>1</Row><Column>0</Column><ChosenConnection>Down, Up, Left</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>NormalContact</ElementType><Descriptor>%M12</Descriptor><Symbol>PUMP3_FAULT</Symbol><Row>2</Row><Column>0</Column><ChosenConnection>Up, Left</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>1</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>2</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>3</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>4</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>5</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>6</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>7</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>8</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Line</ElementType><Row>0</Row><Column>9</Column><ChosenConnection>Left, Right</ChosenConnection></LadderEntity>
              <LadderEntity><ElementType>Coil</ElementType><Descriptor>%Q0.9</Descriptor><Symbol>ALARM_OUTPUT</Symbol><Row>0</Row><Column>10</Column><ChosenConnection>Left</ChosenConnection></LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M10</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.9</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 19</Name>
            <MainComment>Alarm - Any Fault</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

        </Rungs>'''


def update_timers_section(content):
    """Update timers configuration"""
    # Find and replace timer section
    if '<Timers>' in content:
        timer_start = content.find('<Timers>')
        timer_end = content.find('</Timers>') + len('</Timers>')

        new_timers = '''<Timers>
      <Timer>
        <Address>%TM0</Address>
        <Index>0</Index>
        <Symbol>PUMP1_DELAY</Symbol>
        <Comment>Pump 1 Startup Delay 2s</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
      <Timer>
        <Address>%TM1</Address>
        <Index>1</Index>
        <Symbol>PUMP2_DELAY</Symbol>
        <Comment>Pump 2 Startup Delay 2s</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
      <Timer>
        <Address>%TM2</Address>
        <Index>2</Index>
        <Symbol>PUMP3_DELAY</Symbol>
        <Comment>Pump 3 Startup Delay 2s</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
    </Timers>'''

        content = content[:timer_start] + new_timers + content[timer_end:]

    return content


def update_io_section(content):
    """Update I/O symbol definitions"""
    # This would update the DigitalInputs and DigitalOutputs sections
    # For simplicity, we'll leave the template symbols and add new ones via rungs
    return content


def generate_full_smbp():
    """Generate complete .smbp file from scratch"""
    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    return f'''<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>Pump_Tank_TM221</Name>
  <FullName>C:\\Users\\Documents\\Pump_Tank_TM221.smbp</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>
  <CreationDateTime>{timestamp}</CreationDateTime>
  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Pump_Tank_Main</Name>
        <SectionNumber>1</SectionNumber>
        {generate_pump_tank_rungs()}
      </ProgramOrganizationUnits>
    </Pous>
    <Timers>
      <Timer><Address>%TM0</Address><Index>0</Index><Symbol>PUMP1_DELAY</Symbol><Type>TON</Type><TimeBase>TimeBase1s</TimeBase><Preset>2</Preset></Timer>
      <Timer><Address>%TM1</Address><Index>1</Index><Symbol>PUMP2_DELAY</Symbol><Type>TON</Type><TimeBase>TimeBase1s</TimeBase><Preset>2</Preset></Timer>
      <Timer><Address>%TM2</Address><Index>2</Index><Symbol>PUMP3_DELAY</Symbol><Type>TON</Type><TimeBase>TimeBase1s</TimeBase><Preset>2</Preset></Timer>
    </Timers>
  </SoftwareConfiguration>
  <HardwareConfiguration>
    <CpuConfiguration>
      <Model>TM221CE24T</Model>
      <DigitalInputCount>14</DigitalInputCount>
      <DigitalOutputCount>10</DigitalOutputCount>
    </CpuConfiguration>
  </HardwareConfiguration>
  <GlobalProperties>
    <Author>PLCAutoPilot</Author>
    <Description>3-Pump 3-Tank Backup System for TM221CE24T</Description>
  </GlobalProperties>
</ProjectDescriptor>'''


if __name__ == "__main__":
    print("=" * 70)
    print("3-PUMP 3-TANK BACKUP SYSTEM FOR TM221")
    print("Using template-based approach per schneider.md skill")
    print("=" * 70)
    print()

    filepath = create_pump_tank_TM221()

    if filepath:
        print()
        print("=" * 70)
        print("I/O ASSIGNMENT (TM221CE24T: 14 DI / 10 DO)")
        print("=" * 70)
        print("""
INPUTS (12 of 14 used):
  %I0.0  - START_BTN
  %I0.1  - STOP_BTN (NC)
  %I0.2  - PUMP1_SPEED_OK (zero speed NC)
  %I0.3  - PUMP2_SPEED_OK
  %I0.4  - PUMP3_SPEED_OK
  %I0.5  - TANK1_LOW
  %I0.6  - TANK1_HIGH
  %I0.7  - TANK2_LOW
  %I0.8  - TANK2_HIGH
  %I0.9  - TANK3_LOW
  %I0.10 - TANK3_HIGH
  %I0.11 - FAULT_RESET

OUTPUTS (10 of 10 used):
  %Q0.0  - PUMP1_RUN
  %Q0.1  - PUMP2_RUN
  %Q0.2  - PUMP3_RUN
  %Q0.3  - VALVE_12
  %Q0.4  - VALVE_23
  %Q0.5  - PUMP1_FAULT_IND
  %Q0.6  - PUMP2_FAULT_IND
  %Q0.7  - PUMP3_FAULT_IND
  %Q0.8  - SYSTEM_RUN_IND
  %Q0.9  - ALARM_OUTPUT

TIMERS:
  %TM0 - PUMP1_DELAY (2s)
  %TM1 - PUMP2_DELAY (2s)
  %TM2 - PUMP3_DELAY (2s)

19 RUNGS:
  1:  System Start/Stop
  2-4: Pump 1/2/3 Commands
  5-6: Pump 1 Timer + Fault
  7-8: Pump 2 Output + Fault
  9-10: Pump 3 Output + Fault
  11-12: Backup Requests
  13-14: Valve Control
  15-17: Fault Indicators
  18: System Running
  19: Alarm
""")
        print("=" * 70)
        print(f"File: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("=" * 70)
