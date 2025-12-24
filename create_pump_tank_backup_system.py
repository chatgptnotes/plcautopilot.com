"""
3-Pump 3-Tank Backup System for TM221CE40T
==========================================

System Description:
- 3 Pumps (PUMP_1, PUMP_2, PUMP_3), each connected to its own tank
- 3 Tanks (TANK_1, TANK_2, TANK_3), interconnected with valves
- Each pump has a zero speed sensor to detect motor failure
- If any pump fails, the backup pump starts and valves open to fill the affected tank

I/O Configuration (TM221CE40T: 24 DI / 16 DO):
----------------------------------------------
INPUTS:
  %I0.0  - START_BTN        System Start Button
  %I0.1  - STOP_BTN         System Stop Button (NC)
  %I0.2  - E_STOP           Emergency Stop (NC)
  %I0.3  - PUMP1_SPEED_OK   Pump 1 Zero Speed Sensor (NC - closed when running)
  %I0.4  - PUMP2_SPEED_OK   Pump 2 Zero Speed Sensor (NC)
  %I0.5  - PUMP3_SPEED_OK   Pump 3 Zero Speed Sensor (NC)
  %I0.6  - TANK1_LOW        Tank 1 Low Level Switch
  %I0.7  - TANK1_HIGH       Tank 1 High Level Switch
  %I0.8  - TANK2_LOW        Tank 2 Low Level Switch
  %I0.9  - TANK2_HIGH       Tank 2 High Level Switch
  %I0.10 - TANK3_LOW        Tank 3 Low Level Switch
  %I0.11 - TANK3_HIGH       Tank 3 High Level Switch
  %I0.12 - PUMP1_OL         Pump 1 Overload (NC)
  %I0.13 - PUMP2_OL         Pump 2 Overload (NC)
  %I0.14 - PUMP3_OL         Pump 3 Overload (NC)
  %I0.15 - FAULT_RESET      Fault Reset Button

OUTPUTS:
  %Q0.0  - PUMP1_RUN        Pump 1 Motor Contactor
  %Q0.1  - PUMP2_RUN        Pump 2 Motor Contactor
  %Q0.2  - PUMP3_RUN        Pump 3 Motor Contactor
  %Q0.3  - VALVE_12         Valve between Tank 1 and Tank 2
  %Q0.4  - VALVE_23         Valve between Tank 2 and Tank 3
  %Q0.5  - VALVE_13         Valve between Tank 1 and Tank 3
  %Q0.6  - PUMP1_FAULT_IND  Pump 1 Fault Indicator
  %Q0.7  - PUMP2_FAULT_IND  Pump 2 Fault Indicator
  %Q0.8  - PUMP3_FAULT_IND  Pump 3 Fault Indicator
  %Q0.9  - SYSTEM_RUN_IND   System Running Indicator
  %Q0.10 - ALARM_OUTPUT     General Alarm Horn

MEMORY BITS:
  %M0  - SYSTEM_RUN         System Running Flag
  %M1  - PUMP1_CMD          Pump 1 Command (before fault check)
  %M2  - PUMP2_CMD          Pump 2 Command
  %M3  - PUMP3_CMD          Pump 3 Command
  %M10 - PUMP1_FAULT        Pump 1 Fault (latched)
  %M11 - PUMP2_FAULT        Pump 2 Fault (latched)
  %M12 - PUMP3_FAULT        Pump 3 Fault (latched)
  %M20 - TANK1_NEEDS_BACKUP Tank 1 needs backup fill
  %M21 - TANK2_NEEDS_BACKUP Tank 2 needs backup fill
  %M22 - TANK3_NEEDS_BACKUP Tank 3 needs backup fill

TIMERS:
  %TM0 - PUMP1_START_DELAY  Pump 1 startup delay (2s before speed check)
  %TM1 - PUMP2_START_DELAY  Pump 2 startup delay
  %TM2 - PUMP3_START_DELAY  Pump 3 startup delay
"""

import os
from datetime import datetime


def create_pump_tank_backup_system():
    """Create the 3-pump 3-tank backup system .smbp file"""

    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Pump_Tank_Backup_System.smbp"
    )

    # Generate complete .smbp content
    content = generate_smbp_content()

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_smbp_content():
    """Generate complete .smbp XML content"""

    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    return f'''<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>Pump_Tank_Backup_System</Name>
  <FullName>C:\\Users\\Documents\\Pump_Tank_Backup_System.smbp</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>
  <CreationDateTime>{timestamp}</CreationDateTime>
  <ModificationDateTime>{timestamp}</ModificationDateTime>

  <SoftwareConfiguration>
    <TaskConfiguration>
      <TaskName>MAST</TaskName>
      <TaskInterval>10</TaskInterval>
    </TaskConfiguration>

    <Pous>
      <PouDescriptor>
        <Name>Pump_Tank_Backup_Main</Name>
        <PouType>Program</PouType>
        {generate_rungs()}
      </PouDescriptor>
    </Pous>

    {generate_memory_config()}
    {generate_timer_config()}
    {generate_io_symbols()}

  </SoftwareConfiguration>

  {generate_hardware_config()}

  <GlobalProperties>
    <Author>PLCAutoPilot</Author>
    <Company>PLCAutoPilot.com</Company>
    <Description>3-Pump 3-Tank Backup System with Zero Speed Detection</Description>
  </GlobalProperties>

</ProjectDescriptor>'''


def generate_rungs():
    """Generate all ladder rungs for the pump/tank backup system"""

    return '''<Rungs>
          <!-- ============================================ -->
          <!-- RUNG 1: System Start/Stop Control            -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.0</Descriptor>
                <Comment>System Start Button</Comment>
                <Symbol>START_BTN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>System Running Seal-in</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Stop Button (NC)</Comment>
                <Symbol>STOP_BTN</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.2</Descriptor>
                <Comment>Emergency Stop (NC)</Comment>
                <Symbol>E_STOP</Symbol>
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
                <Comment>System Running Flag</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load START button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M0</InstructionLine>
                <Comment>OR with system run flag (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT STOP button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.2</InstructionLine>
                <Comment>AND NOT E-STOP</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to SYSTEM_RUN</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>System Start/Stop with Emergency Stop</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 2: Pump 1 Command - Fill Tank 1         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>System Running</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.6</Descriptor>
                <Comment>Tank 1 Low Level</Comment>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.7</Descriptor>
                <Comment>Tank 1 High Level (NC)</Comment>
                <Symbol>TANK1_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Comment>No Pump 1 Fault</Comment>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.12</Descriptor>
                <Comment>No Overload (NC)</Comment>
                <Symbol>PUMP1_OL</Symbol>
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
                <Comment>Pump 1 Command</Comment>
                <Symbol>PUMP1_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>System running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.6</InstructionLine>
                <Comment>Tank 1 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.7</InstructionLine>
                <Comment>Not high level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M10</InstructionLine>
                <Comment>No pump fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.12</InstructionLine>
                <Comment>No overload</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M1</InstructionLine>
                <Comment>Pump 1 command</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Pump 1 Command - Fill Tank 1 when low, stop at high</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 3: Pump 2 Command - Fill Tank 2         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>System Running</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.8</Descriptor>
                <Comment>Tank 2 Low Level</Comment>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.9</Descriptor>
                <Comment>Tank 2 High Level (NC)</Comment>
                <Symbol>TANK2_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Comment>No Pump 2 Fault</Comment>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.13</Descriptor>
                <Comment>No Overload (NC)</Comment>
                <Symbol>PUMP2_OL</Symbol>
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
                <Comment>Pump 2 Command</Comment>
                <Symbol>PUMP2_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.8</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.9</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M11</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.13</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M2</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Pump 2 Command - Fill Tank 2</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 4: Pump 3 Command - Fill Tank 3         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>System Running</Comment>
                <Symbol>SYSTEM_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.10</Descriptor>
                <Comment>Tank 3 Low Level</Comment>
                <Symbol>TANK3_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.11</Descriptor>
                <Comment>Tank 3 High Level (NC)</Comment>
                <Symbol>TANK3_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Comment>No Pump 3 Fault</Comment>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.14</Descriptor>
                <Comment>No Overload (NC)</Comment>
                <Symbol>PUMP3_OL</Symbol>
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
                <Descriptor>%M3</Descriptor>
                <Comment>Pump 3 Command</Comment>
                <Symbol>PUMP3_CMD</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.10</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.11</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M12</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.14</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M3</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Pump 3 Command - Fill Tank 3</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 5: Pump 1 Startup Delay Timer           -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M1</Descriptor>
                <Comment>Pump 1 Command Active</Comment>
                <Symbol>PUMP1_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM0</Descriptor>
                <Comment>2 Second Startup Delay</Comment>
                <Symbol>PUMP1_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
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
                <Comment>Pump 1 Motor Output</Comment>
                <Symbol>PUMP1_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM0</InstructionLine>
                <Comment>Begin Timer block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
                <Comment>Pump 1 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Pump 1 output</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Pump 1 Output with Startup Delay Timer</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 6: Pump 1 Zero Speed Fault Detection    -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM0.Q</Descriptor>
                <Comment>Startup Delay Done</Comment>
                <Symbol>PUMP1_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Comment>Fault Seal-in</Comment>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.3</Descriptor>
                <Comment>Speed NOT OK (zero speed)</Comment>
                <Symbol>PUMP1_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.15</Descriptor>
                <Comment>Fault Not Reset</Comment>
                <Symbol>FAULT_RESET</Symbol>
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
                <Descriptor>%M10</Descriptor>
                <Comment>Pump 1 Fault Latched</Comment>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM0.Q</InstructionLine>
                <Comment>Startup delay done</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.3</InstructionLine>
                <Comment>Speed not OK</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M10</InstructionLine>
                <Comment>OR with fault latch</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
                <Comment>Not reset</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M10</InstructionLine>
                <Comment>Latch fault</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 6</Name>
            <MainComment>Pump 1 Zero Speed Fault Detection - Latching</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 7: Pump 2 Output with Timer             -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M2</Descriptor>
                <Comment>Pump 2 Command</Comment>
                <Symbol>PUMP2_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M20</Descriptor>
                <Comment>Tank 1 Needs Backup</Comment>
                <Symbol>TANK1_NEEDS_BACKUP</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM1</Descriptor>
                <Comment>2 Second Startup Delay</Comment>
                <Symbol>PUMP2_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
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
                <Comment>Pump 2 Motor Output</Comment>
                <Symbol>PUMP2_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M2</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M20</InstructionLine>
                <Comment>OR backup mode for Tank 1</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.1</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 7</Name>
            <MainComment>Pump 2 Output - Normal or Backup for Tank 1</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 8: Pump 2 Zero Speed Fault Detection    -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM1.Q</Descriptor>
                <Comment>Startup Delay Done</Comment>
                <Symbol>PUMP2_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Comment>Fault Seal-in</Comment>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.4</Descriptor>
                <Comment>Speed NOT OK</Comment>
                <Symbol>PUMP2_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.15</Descriptor>
                <Comment>Fault Not Reset</Comment>
                <Symbol>FAULT_RESET</Symbol>
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
                <Descriptor>%M11</Descriptor>
                <Comment>Pump 2 Fault Latched</Comment>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM1.Q</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.4</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M11</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M11</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 8</Name>
            <MainComment>Pump 2 Zero Speed Fault Detection</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 9: Pump 3 Output with Backup            -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M3</Descriptor>
                <Comment>Pump 3 Command</Comment>
                <Symbol>PUMP3_CMD</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M21</Descriptor>
                <Comment>Tank 2 Needs Backup</Comment>
                <Symbol>TANK2_NEEDS_BACKUP</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM2</Descriptor>
                <Comment>2 Second Startup Delay</Comment>
                <Symbol>PUMP3_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>1</Column>
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
                <Descriptor>%Q0.2</Descriptor>
                <Comment>Pump 3 Motor Output</Comment>
                <Symbol>PUMP3_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M3</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M21</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.2</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 9</Name>
            <MainComment>Pump 3 Output - Normal or Backup for Tank 2</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 10: Pump 3 Zero Speed Fault Detection   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM2.Q</Descriptor>
                <Comment>Startup Delay Done</Comment>
                <Symbol>PUMP3_START_DELAY</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Comment>Fault Seal-in</Comment>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.5</Descriptor>
                <Comment>Speed NOT OK</Comment>
                <Symbol>PUMP3_SPEED_OK</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.15</Descriptor>
                <Comment>Fault Not Reset</Comment>
                <Symbol>FAULT_RESET</Symbol>
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
                <Descriptor>%M12</Descriptor>
                <Comment>Pump 3 Fault Latched</Comment>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM2.Q</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.5</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M12</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M12</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 10</Name>
            <MainComment>Pump 3 Zero Speed Fault Detection</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 11: Tank 1 Needs Backup (Pump 1 Failed) -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Comment>Pump 1 Fault Active</Comment>
                <Symbol>PUMP1_FAULT</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.6</Descriptor>
                <Comment>Tank 1 Low Level</Comment>
                <Symbol>TANK1_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.7</Descriptor>
                <Comment>Tank 1 Not High</Comment>
                <Symbol>TANK1_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Comment>Pump 2 Not Faulted</Comment>
                <Symbol>PUMP2_FAULT</Symbol>
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
                <Descriptor>%M20</Descriptor>
                <Comment>Tank 1 Needs Backup Fill</Comment>
                <Symbol>TANK1_NEEDS_BACKUP</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M10</InstructionLine>
                <Comment>Pump 1 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.6</InstructionLine>
                <Comment>Tank 1 low</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.7</InstructionLine>
                <Comment>Not high</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M11</InstructionLine>
                <Comment>Pump 2 available</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M20</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 11</Name>
            <MainComment>Tank 1 Backup Request - Use Pump 2 when Pump 1 fails</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 12: Tank 2 Needs Backup (Pump 2 Failed) -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M11</Descriptor>
                <Comment>Pump 2 Fault Active</Comment>
                <Symbol>PUMP2_FAULT</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.8</Descriptor>
                <Comment>Tank 2 Low Level</Comment>
                <Symbol>TANK2_LOW</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.9</Descriptor>
                <Comment>Tank 2 Not High</Comment>
                <Symbol>TANK2_HIGH</Symbol>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Comment>Pump 3 Not Faulted</Comment>
                <Symbol>PUMP3_FAULT</Symbol>
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
                <Descriptor>%M21</Descriptor>
                <Comment>Tank 2 Needs Backup Fill</Comment>
                <Symbol>TANK2_NEEDS_BACKUP</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M11</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.8</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.9</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M12</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M21</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 12</Name>
            <MainComment>Tank 2 Backup Request - Use Pump 3 when Pump 2 fails</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 13: Valve 1-2 Control (Between Tanks)   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M20</Descriptor>
                <Comment>Tank 1 Needs Backup</Comment>
                <Symbol>TANK1_NEEDS_BACKUP</Symbol>
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
                <Descriptor>%Q0.3</Descriptor>
                <Comment>Valve Between Tank 1 and 2</Comment>
                <Symbol>VALVE_12</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M20</InstructionLine>
                <Comment>Tank 1 backup mode</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.3</InstructionLine>
                <Comment>Open valve 1-2</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 13</Name>
            <MainComment>Valve 1-2 Opens when Tank 1 in Backup Mode</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 14: Valve 2-3 Control                   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M21</Descriptor>
                <Comment>Tank 2 Needs Backup</Comment>
                <Symbol>TANK2_NEEDS_BACKUP</Symbol>
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
                <Descriptor>%Q0.4</Descriptor>
                <Comment>Valve Between Tank 2 and 3</Comment>
                <Symbol>VALVE_23</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M21</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.4</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 14</Name>
            <MainComment>Valve 2-3 Opens when Tank 2 in Backup Mode</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 15: Pump Fault Indicators               -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Comment>Pump 1 Fault</Comment>
                <Symbol>PUMP1_FAULT</Symbol>
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
                <Descriptor>%Q0.6</Descriptor>
                <Comment>Pump 1 Fault Indicator</Comment>
                <Symbol>PUMP1_FAULT_IND</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M10</InstructionLine>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.6</InstructionLine>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 15</Name>
            <MainComment>Pump 1 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 16: Pump 2 Fault Indicator -->
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
                <Descriptor>%Q0.7</Descriptor>
                <Symbol>PUMP2_FAULT_IND</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.7</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 16</Name>
            <MainComment>Pump 2 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 17: Pump 3 Fault Indicator -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
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
                <Descriptor>%Q0.8</Descriptor>
                <Symbol>PUMP3_FAULT_IND</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.8</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 17</Name>
            <MainComment>Pump 3 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 18: System Running Indicator -->
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
                <Descriptor>%Q0.9</Descriptor>
                <Symbol>SYSTEM_RUN_IND</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M0</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.9</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 18</Name>
            <MainComment>System Running Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

          <!-- RUNG 19: General Alarm (Any Fault) -->
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M10</Descriptor>
                <Symbol>PUMP1_FAULT</Symbol>
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
                <ChosenConnection>Down, Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M12</Descriptor>
                <Symbol>PUMP3_FAULT</Symbol>
                <Row>2</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
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
                <Descriptor>%Q0.10</Descriptor>
                <Symbol>ALARM_OUTPUT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity><InstructionLine>LD    %M10</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M11</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>OR    %M12</InstructionLine></InstructionLineEntity>
              <InstructionLineEntity><InstructionLine>ST    %Q0.10</InstructionLine></InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 19</Name>
            <MainComment>General Alarm - Any Pump Fault</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>

        </Rungs>'''


def generate_memory_config():
    """Generate memory allocation configuration"""
    return '''<MemoryBitsMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>512</ForcedCount>
    </MemoryBitsMemoryAllocation>

    <MemoryWordsMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>2000</ForcedCount>
    </MemoryWordsMemoryAllocation>

    <TimersMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>3</ForcedCount>
    </TimersMemoryAllocation>'''


def generate_timer_config():
    """Generate timer configuration for startup delays"""
    return '''<Timers>
      <Timer>
        <Address>%TM0</Address>
        <Index>0</Index>
        <Symbol>PUMP1_START_DELAY</Symbol>
        <Comment>Pump 1 Startup Delay - 2 seconds before speed check</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
      <Timer>
        <Address>%TM1</Address>
        <Index>1</Index>
        <Symbol>PUMP2_START_DELAY</Symbol>
        <Comment>Pump 2 Startup Delay - 2 seconds before speed check</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
      <Timer>
        <Address>%TM2</Address>
        <Index>2</Index>
        <Symbol>PUMP3_START_DELAY</Symbol>
        <Comment>Pump 3 Startup Delay - 2 seconds before speed check</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>2</Preset>
      </Timer>
    </Timers>'''


def generate_io_symbols():
    """Generate I/O symbol definitions"""
    return '''<DigitalInputs>
      <DigitalInput><Address>%I0.0</Address><Index>0</Index><Symbol>START_BTN</Symbol><Comment>System Start Button</Comment></DigitalInput>
      <DigitalInput><Address>%I0.1</Address><Index>1</Index><Symbol>STOP_BTN</Symbol><Comment>System Stop Button (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.2</Address><Index>2</Index><Symbol>E_STOP</Symbol><Comment>Emergency Stop (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.3</Address><Index>3</Index><Symbol>PUMP1_SPEED_OK</Symbol><Comment>Pump 1 Zero Speed Sensor (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.4</Address><Index>4</Index><Symbol>PUMP2_SPEED_OK</Symbol><Comment>Pump 2 Zero Speed Sensor (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.5</Address><Index>5</Index><Symbol>PUMP3_SPEED_OK</Symbol><Comment>Pump 3 Zero Speed Sensor (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.6</Address><Index>6</Index><Symbol>TANK1_LOW</Symbol><Comment>Tank 1 Low Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.7</Address><Index>7</Index><Symbol>TANK1_HIGH</Symbol><Comment>Tank 1 High Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.8</Address><Index>8</Index><Symbol>TANK2_LOW</Symbol><Comment>Tank 2 Low Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.9</Address><Index>9</Index><Symbol>TANK2_HIGH</Symbol><Comment>Tank 2 High Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.10</Address><Index>10</Index><Symbol>TANK3_LOW</Symbol><Comment>Tank 3 Low Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.11</Address><Index>11</Index><Symbol>TANK3_HIGH</Symbol><Comment>Tank 3 High Level Switch</Comment></DigitalInput>
      <DigitalInput><Address>%I0.12</Address><Index>12</Index><Symbol>PUMP1_OL</Symbol><Comment>Pump 1 Overload (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.13</Address><Index>13</Index><Symbol>PUMP2_OL</Symbol><Comment>Pump 2 Overload (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.14</Address><Index>14</Index><Symbol>PUMP3_OL</Symbol><Comment>Pump 3 Overload (NC)</Comment></DigitalInput>
      <DigitalInput><Address>%I0.15</Address><Index>15</Index><Symbol>FAULT_RESET</Symbol><Comment>Fault Reset Button</Comment></DigitalInput>
    </DigitalInputs>

    <DigitalOutputs>
      <DigitalOutput><Address>%Q0.0</Address><Index>0</Index><Symbol>PUMP1_RUN</Symbol><Comment>Pump 1 Motor Contactor</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.1</Address><Index>1</Index><Symbol>PUMP2_RUN</Symbol><Comment>Pump 2 Motor Contactor</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.2</Address><Index>2</Index><Symbol>PUMP3_RUN</Symbol><Comment>Pump 3 Motor Contactor</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.3</Address><Index>3</Index><Symbol>VALVE_12</Symbol><Comment>Valve Between Tank 1-2</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.4</Address><Index>4</Index><Symbol>VALVE_23</Symbol><Comment>Valve Between Tank 2-3</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.5</Address><Index>5</Index><Symbol>VALVE_13</Symbol><Comment>Valve Between Tank 1-3</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.6</Address><Index>6</Index><Symbol>PUMP1_FAULT_IND</Symbol><Comment>Pump 1 Fault Indicator</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.7</Address><Index>7</Index><Symbol>PUMP2_FAULT_IND</Symbol><Comment>Pump 2 Fault Indicator</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.8</Address><Index>8</Index><Symbol>PUMP3_FAULT_IND</Symbol><Comment>Pump 3 Fault Indicator</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.9</Address><Index>9</Index><Symbol>SYSTEM_RUN_IND</Symbol><Comment>System Running Indicator</Comment></DigitalOutput>
      <DigitalOutput><Address>%Q0.10</Address><Index>10</Index><Symbol>ALARM_OUTPUT</Symbol><Comment>General Alarm Horn</Comment></DigitalOutput>
    </DigitalOutputs>

    <MemoryBits>
      <MemoryBit><Address>%M0</Address><Index>0</Index><Symbol>SYSTEM_RUN</Symbol><Comment>System Running Flag</Comment></MemoryBit>
      <MemoryBit><Address>%M1</Address><Index>1</Index><Symbol>PUMP1_CMD</Symbol><Comment>Pump 1 Command</Comment></MemoryBit>
      <MemoryBit><Address>%M2</Address><Index>2</Index><Symbol>PUMP2_CMD</Symbol><Comment>Pump 2 Command</Comment></MemoryBit>
      <MemoryBit><Address>%M3</Address><Index>3</Index><Symbol>PUMP3_CMD</Symbol><Comment>Pump 3 Command</Comment></MemoryBit>
      <MemoryBit><Address>%M10</Address><Index>10</Index><Symbol>PUMP1_FAULT</Symbol><Comment>Pump 1 Fault (Latched)</Comment></MemoryBit>
      <MemoryBit><Address>%M11</Address><Index>11</Index><Symbol>PUMP2_FAULT</Symbol><Comment>Pump 2 Fault (Latched)</Comment></MemoryBit>
      <MemoryBit><Address>%M12</Address><Index>12</Index><Symbol>PUMP3_FAULT</Symbol><Comment>Pump 3 Fault (Latched)</Comment></MemoryBit>
      <MemoryBit><Address>%M20</Address><Index>20</Index><Symbol>TANK1_NEEDS_BACKUP</Symbol><Comment>Tank 1 Backup Mode</Comment></MemoryBit>
      <MemoryBit><Address>%M21</Address><Index>21</Index><Symbol>TANK2_NEEDS_BACKUP</Symbol><Comment>Tank 2 Backup Mode</Comment></MemoryBit>
      <MemoryBit><Address>%M22</Address><Index>22</Index><Symbol>TANK3_NEEDS_BACKUP</Symbol><Comment>Tank 3 Backup Mode</Comment></MemoryBit>
    </MemoryBits>'''


def generate_hardware_config():
    """Generate hardware configuration for TM221CE40T"""
    return '''<HardwareConfiguration>
    <CpuConfiguration>
      <Model>TM221CE40T</Model>
      <FirmwareVersion>1.8.0.0</FirmwareVersion>
      <DigitalInputCount>24</DigitalInputCount>
      <DigitalOutputCount>16</DigitalOutputCount>
      <AnalogInputCount>2</AnalogInputCount>
    </CpuConfiguration>

    <EthernetConfiguration>
      <IPAddress>192.168.1.10</IPAddress>
      <SubnetMask>255.255.255.0</SubnetMask>
      <Gateway>192.168.1.1</Gateway>
      <ModbusTCPEnabled>true</ModbusTCPEnabled>
      <ModbusTCPPort>502</ModbusTCPPort>
    </EthernetConfiguration>

    <SerialLineConfiguration>
      <Protocol>Modbus RTU</Protocol>
      <BaudRate>19200</BaudRate>
      <Parity>Even</Parity>
      <DataBits>8</DataBits>
      <StopBits>1</StopBits>
    </SerialLineConfiguration>
  </HardwareConfiguration>'''


if __name__ == "__main__":
    print("=" * 70)
    print("3-PUMP 3-TANK BACKUP SYSTEM")
    print("TM221CE40T Controller")
    print("=" * 70)
    print()

    filepath = create_pump_tank_backup_system()

    if filepath:
        print()
        print("=" * 70)
        print("SYSTEM DESCRIPTION")
        print("=" * 70)
        print("""
SYSTEM OVERVIEW:
----------------
3 Pumps, 3 Tanks with automatic backup on pump failure

NORMAL OPERATION:
- Each pump fills its own tank based on level switches
- Pump runs when LOW level active, stops at HIGH level
- Zero speed sensors monitor motor rotation

FAULT DETECTION:
- 2-second startup delay before speed check
- If motor commanded but zero speed detected = FAULT
- Fault is latched until manual reset

BACKUP OPERATION:
- If Pump 1 fails: Pump 2 backs up Tank 1, Valve 1-2 opens
- If Pump 2 fails: Pump 3 backs up Tank 2, Valve 2-3 opens
- Tanks equalize through open valves

I/O ASSIGNMENT (TM221CE40T):
----------------------------
INPUTS (16 used of 24):
  %I0.0  - START_BTN        System Start
  %I0.1  - STOP_BTN         System Stop (NC)
  %I0.2  - E_STOP           Emergency Stop (NC)
  %I0.3  - PUMP1_SPEED_OK   Pump 1 Speed Sensor (NC)
  %I0.4  - PUMP2_SPEED_OK   Pump 2 Speed Sensor (NC)
  %I0.5  - PUMP3_SPEED_OK   Pump 3 Speed Sensor (NC)
  %I0.6  - TANK1_LOW        Tank 1 Low Level
  %I0.7  - TANK1_HIGH       Tank 1 High Level
  %I0.8  - TANK2_LOW        Tank 2 Low Level
  %I0.9  - TANK2_HIGH       Tank 2 High Level
  %I0.10 - TANK3_LOW        Tank 3 Low Level
  %I0.11 - TANK3_HIGH       Tank 3 High Level
  %I0.12 - PUMP1_OL         Pump 1 Overload (NC)
  %I0.13 - PUMP2_OL         Pump 2 Overload (NC)
  %I0.14 - PUMP3_OL         Pump 3 Overload (NC)
  %I0.15 - FAULT_RESET      Fault Reset Button

OUTPUTS (11 used of 16):
  %Q0.0  - PUMP1_RUN        Pump 1 Motor
  %Q0.1  - PUMP2_RUN        Pump 2 Motor
  %Q0.2  - PUMP3_RUN        Pump 3 Motor
  %Q0.3  - VALVE_12         Valve Tank 1-2
  %Q0.4  - VALVE_23         Valve Tank 2-3
  %Q0.5  - VALVE_13         Valve Tank 1-3
  %Q0.6  - PUMP1_FAULT_IND  Pump 1 Fault Light
  %Q0.7  - PUMP2_FAULT_IND  Pump 2 Fault Light
  %Q0.8  - PUMP3_FAULT_IND  Pump 3 Fault Light
  %Q0.9  - SYSTEM_RUN_IND   System Running Light
  %Q0.10 - ALARM_OUTPUT     Alarm Horn

TIMERS:
  %TM0 - PUMP1_START_DELAY  (2 seconds)
  %TM1 - PUMP2_START_DELAY  (2 seconds)
  %TM2 - PUMP3_START_DELAY  (2 seconds)

LADDER RUNGS (19 Total):
------------------------
Rung 1:  System Start/Stop Control
Rung 2:  Pump 1 Command (Tank 1 Level)
Rung 3:  Pump 2 Command (Tank 2 Level)
Rung 4:  Pump 3 Command (Tank 3 Level)
Rung 5:  Pump 1 Output + Timer
Rung 6:  Pump 1 Zero Speed Fault Detection
Rung 7:  Pump 2 Output + Backup Logic
Rung 8:  Pump 2 Zero Speed Fault Detection
Rung 9:  Pump 3 Output + Backup Logic
Rung 10: Pump 3 Zero Speed Fault Detection
Rung 11: Tank 1 Backup Request
Rung 12: Tank 2 Backup Request
Rung 13: Valve 1-2 Control
Rung 14: Valve 2-3 Control
Rung 15: Pump 1 Fault Indicator
Rung 16: Pump 2 Fault Indicator
Rung 17: Pump 3 Fault Indicator
Rung 18: System Running Indicator
Rung 19: General Alarm Output
""")
        print("=" * 70)
        print(f"File created: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
