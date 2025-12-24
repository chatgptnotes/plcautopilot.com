"""
3-Pump 3-Tank Backup System - INSTRUCTION LIST (IL) Version
============================================================
TM221CE40T Controller

Same logic as Ladder version but using pure Instruction List programming.
IL is a low-level text-based language similar to assembly.

I/O Configuration (TM221CE40T: 24 DI / 16 DO):
----------------------------------------------
INPUTS:
  %I0.0  - START_BTN        System Start Button
  %I0.1  - STOP_BTN         System Stop Button (NC)
  %I0.2  - E_STOP           Emergency Stop (NC)
  %I0.3  - PUMP1_SPEED_OK   Pump 1 Zero Speed Sensor (NC)
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
  %M1  - PUMP1_CMD          Pump 1 Command
  %M2  - PUMP2_CMD          Pump 2 Command
  %M3  - PUMP3_CMD          Pump 3 Command
  %M10 - PUMP1_FAULT        Pump 1 Fault (latched)
  %M11 - PUMP2_FAULT        Pump 2 Fault (latched)
  %M12 - PUMP3_FAULT        Pump 3 Fault (latched)
  %M20 - TANK1_NEEDS_BACKUP Tank 1 needs backup fill
  %M21 - TANK2_NEEDS_BACKUP Tank 2 needs backup fill

TIMERS:
  %TM0 - PUMP1_START_DELAY  Pump 1 startup delay (2s)
  %TM1 - PUMP2_START_DELAY  Pump 2 startup delay (2s)
  %TM2 - PUMP3_START_DELAY  Pump 3 startup delay (2s)
"""

import os
from datetime import datetime


def create_pump_tank_backup_IL():
    """Create the 3-pump 3-tank backup system .smbp file in IL format"""

    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Pump_Tank_Backup_System_IL.smbp"
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
    """Generate complete .smbp XML content with IL programming"""

    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    return f'''<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>Pump_Tank_Backup_System_IL</Name>
  <FullName>C:\\Users\\Documents\\Pump_Tank_Backup_System_IL.smbp</FullName>
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
        <Name>Pump_Tank_Backup_IL_Main</Name>
        <PouType>Program</PouType>
        {generate_il_rungs()}
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
    <Description>3-Pump 3-Tank Backup System - Instruction List Version</Description>
  </GlobalProperties>

</ProjectDescriptor>'''


def generate_il_rungs():
    """Generate all IL rungs for the pump/tank backup system"""

    return '''<Rungs>
          <!-- ============================================ -->
          <!-- RUNG 1: System Start/Stop Control            -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load START button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M0</InstructionLine>
                <Comment>OR with SYSTEM_RUN (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT STOP button (NC)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.2</InstructionLine>
                <Comment>AND NOT E_STOP (NC)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to SYSTEM_RUN flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>System Start/Stop with Emergency Stop - Seal-in Circuit</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 2: Pump 1 Command - Fill Tank 1         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>System running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.6</InstructionLine>
                <Comment>AND Tank 1 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.7</InstructionLine>
                <Comment>AND NOT Tank 1 high level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M10</InstructionLine>
                <Comment>AND NOT Pump 1 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.12</InstructionLine>
                <Comment>AND NOT Pump 1 overload</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M1</InstructionLine>
                <Comment>Store to PUMP1_CMD</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Pump 1 Command - Fill Tank 1 when low, stop at high</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 3: Pump 2 Command - Fill Tank 2         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>System running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.8</InstructionLine>
                <Comment>AND Tank 2 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.9</InstructionLine>
                <Comment>AND NOT Tank 2 high level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M11</InstructionLine>
                <Comment>AND NOT Pump 2 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.13</InstructionLine>
                <Comment>AND NOT Pump 2 overload</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M2</InstructionLine>
                <Comment>Store to PUMP2_CMD</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Pump 2 Command - Fill Tank 2 when low, stop at high</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 4: Pump 3 Command - Fill Tank 3         -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>System running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.10</InstructionLine>
                <Comment>AND Tank 3 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.11</InstructionLine>
                <Comment>AND NOT Tank 3 high level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M12</InstructionLine>
                <Comment>AND NOT Pump 3 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.14</InstructionLine>
                <Comment>AND NOT Pump 3 overload</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M3</InstructionLine>
                <Comment>Store to PUMP3_CMD</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Pump 3 Command - Fill Tank 3 when low, stop at high</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 5: Pump 1 Timer and Output              -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM0</InstructionLine>
                <Comment>Begin Timer 0 block (PUMP1_START_DELAY)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
                <Comment>Load Pump 1 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input - starts 2s delay</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M1</InstructionLine>
                <Comment>Load Pump 1 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Output to PUMP1_RUN contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Pump 1 Startup Timer and Motor Output</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 6: Pump 1 Zero Speed Fault Detection    -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM0.Q</InstructionLine>
                <Comment>Timer done (2s elapsed)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.3</InstructionLine>
                <Comment>AND NOT speed OK (zero speed detected)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M10</InstructionLine>
                <Comment>OR with fault latch (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
                <Comment>AND NOT fault reset button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M10</InstructionLine>
                <Comment>Store to PUMP1_FAULT (latched)</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 6</Name>
            <MainComment>Pump 1 Zero Speed Fault - Latching with Reset</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 7: Pump 2 Timer and Output with Backup  -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM1</InstructionLine>
                <Comment>Begin Timer 1 block (PUMP2_START_DELAY)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M2</InstructionLine>
                <Comment>Load Pump 2 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M20</InstructionLine>
                <Comment>OR Tank 1 needs backup</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M2</InstructionLine>
                <Comment>Load Pump 2 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M20</InstructionLine>
                <Comment>OR Tank 1 backup mode</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.1</InstructionLine>
                <Comment>Output to PUMP2_RUN contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 7</Name>
            <MainComment>Pump 2 Output - Normal Operation or Backup for Tank 1</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 8: Pump 2 Zero Speed Fault Detection    -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM1.Q</InstructionLine>
                <Comment>Timer done (2s elapsed)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.4</InstructionLine>
                <Comment>AND NOT speed OK (zero speed)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M11</InstructionLine>
                <Comment>OR with fault latch</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
                <Comment>AND NOT fault reset</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M11</InstructionLine>
                <Comment>Store to PUMP2_FAULT</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 8</Name>
            <MainComment>Pump 2 Zero Speed Fault Detection</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 9: Pump 3 Timer and Output with Backup  -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM2</InstructionLine>
                <Comment>Begin Timer 2 block (PUMP3_START_DELAY)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M3</InstructionLine>
                <Comment>Load Pump 3 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M21</InstructionLine>
                <Comment>OR Tank 2 needs backup</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M3</InstructionLine>
                <Comment>Load Pump 3 command</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M21</InstructionLine>
                <Comment>OR Tank 2 backup mode</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.2</InstructionLine>
                <Comment>Output to PUMP3_RUN contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 9</Name>
            <MainComment>Pump 3 Output - Normal Operation or Backup for Tank 2</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 10: Pump 3 Zero Speed Fault Detection   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM2.Q</InstructionLine>
                <Comment>Timer done (2s elapsed)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.5</InstructionLine>
                <Comment>AND NOT speed OK</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M12</InstructionLine>
                <Comment>OR with fault latch</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.15</InstructionLine>
                <Comment>AND NOT fault reset</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M12</InstructionLine>
                <Comment>Store to PUMP3_FAULT</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 10</Name>
            <MainComment>Pump 3 Zero Speed Fault Detection</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 11: Tank 1 Backup Request               -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M10</InstructionLine>
                <Comment>Pump 1 fault active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.6</InstructionLine>
                <Comment>AND Tank 1 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.7</InstructionLine>
                <Comment>AND NOT Tank 1 high</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M11</InstructionLine>
                <Comment>AND NOT Pump 2 fault (backup available)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M20</InstructionLine>
                <Comment>Store to TANK1_NEEDS_BACKUP</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 11</Name>
            <MainComment>Tank 1 Backup Request - Pump 2 takes over when Pump 1 fails</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 12: Tank 2 Backup Request               -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M11</InstructionLine>
                <Comment>Pump 2 fault active</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>AND   %I0.8</InstructionLine>
                <Comment>AND Tank 2 low level</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.9</InstructionLine>
                <Comment>AND NOT Tank 2 high</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %M12</InstructionLine>
                <Comment>AND NOT Pump 3 fault (backup available)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M21</InstructionLine>
                <Comment>Store to TANK2_NEEDS_BACKUP</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 12</Name>
            <MainComment>Tank 2 Backup Request - Pump 3 takes over when Pump 2 fails</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 13: Valve 1-2 Control                   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M20</InstructionLine>
                <Comment>Tank 1 needs backup</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.3</InstructionLine>
                <Comment>Open VALVE_12 (between Tank 1 and 2)</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 13</Name>
            <MainComment>Valve 1-2 Opens when Tank 1 in Backup Mode</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 14: Valve 2-3 Control                   -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M21</InstructionLine>
                <Comment>Tank 2 needs backup</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.4</InstructionLine>
                <Comment>Open VALVE_23 (between Tank 2 and 3)</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 14</Name>
            <MainComment>Valve 2-3 Opens when Tank 2 in Backup Mode</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 15: Pump 1 Fault Indicator              -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M10</InstructionLine>
                <Comment>Pump 1 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.6</InstructionLine>
                <Comment>PUMP1_FAULT_IND light</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 15</Name>
            <MainComment>Pump 1 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 16: Pump 2 Fault Indicator              -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M11</InstructionLine>
                <Comment>Pump 2 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.7</InstructionLine>
                <Comment>PUMP2_FAULT_IND light</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 16</Name>
            <MainComment>Pump 2 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 17: Pump 3 Fault Indicator              -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M12</InstructionLine>
                <Comment>Pump 3 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.8</InstructionLine>
                <Comment>PUMP3_FAULT_IND light</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 17</Name>
            <MainComment>Pump 3 Fault Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 18: System Running Indicator            -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>System running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.9</InstructionLine>
                <Comment>SYSTEM_RUN_IND light</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 18</Name>
            <MainComment>System Running Indicator Light</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>

          <!-- ============================================ -->
          <!-- RUNG 19: General Alarm (Any Fault)           -->
          <!-- ============================================ -->
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M10</InstructionLine>
                <Comment>Pump 1 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M11</InstructionLine>
                <Comment>OR Pump 2 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M12</InstructionLine>
                <Comment>OR Pump 3 fault</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.10</InstructionLine>
                <Comment>ALARM_OUTPUT horn</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 19</Name>
            <MainComment>General Alarm - Any Pump Fault Activates Horn</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
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


def print_il_program():
    """Print the complete IL program listing"""
    print("""
INSTRUCTION LIST (IL) PROGRAM LISTING
=====================================

(* RUNG 1: System Start/Stop Control *)
LD    %I0.0         (* Load START button *)
OR    %M0           (* OR with SYSTEM_RUN seal-in *)
ANDN  %I0.1         (* AND NOT STOP button *)
ANDN  %I0.2         (* AND NOT E_STOP *)
ST    %M0           (* Store to SYSTEM_RUN *)

(* RUNG 2: Pump 1 Command *)
LD    %M0           (* System running *)
AND   %I0.6         (* AND Tank 1 low *)
ANDN  %I0.7         (* AND NOT Tank 1 high *)
ANDN  %M10          (* AND NOT Pump 1 fault *)
ANDN  %I0.12        (* AND NOT Pump 1 overload *)
ST    %M1           (* Store to PUMP1_CMD *)

(* RUNG 3: Pump 2 Command *)
LD    %M0
AND   %I0.8
ANDN  %I0.9
ANDN  %M11
ANDN  %I0.13
ST    %M2

(* RUNG 4: Pump 3 Command *)
LD    %M0
AND   %I0.10
ANDN  %I0.11
ANDN  %M12
ANDN  %I0.14
ST    %M3

(* RUNG 5: Pump 1 Timer and Output *)
BLK   %TM0          (* Begin Timer block *)
LD    %M1           (* Pump 1 command *)
IN                  (* Timer input *)
END_BLK
LD    %M1
ST    %Q0.0         (* PUMP1_RUN output *)

(* RUNG 6: Pump 1 Zero Speed Fault *)
LD    %TM0.Q        (* Timer done - 2s elapsed *)
ANDN  %I0.3         (* AND NOT speed OK = fault *)
OR    %M10          (* OR fault latch *)
ANDN  %I0.15        (* AND NOT reset *)
ST    %M10          (* PUMP1_FAULT latched *)

(* RUNG 7: Pump 2 Timer and Output *)
BLK   %TM1
LD    %M2
OR    %M20          (* OR Tank 1 backup *)
IN
END_BLK
LD    %M2
OR    %M20
ST    %Q0.1         (* PUMP2_RUN *)

(* RUNG 8: Pump 2 Zero Speed Fault *)
LD    %TM1.Q
ANDN  %I0.4
OR    %M11
ANDN  %I0.15
ST    %M11

(* RUNG 9: Pump 3 Timer and Output *)
BLK   %TM2
LD    %M3
OR    %M21          (* OR Tank 2 backup *)
IN
END_BLK
LD    %M3
OR    %M21
ST    %Q0.2         (* PUMP3_RUN *)

(* RUNG 10: Pump 3 Zero Speed Fault *)
LD    %TM2.Q
ANDN  %I0.5
OR    %M12
ANDN  %I0.15
ST    %M12

(* RUNG 11: Tank 1 Backup Request *)
LD    %M10          (* Pump 1 fault *)
AND   %I0.6         (* Tank 1 low *)
ANDN  %I0.7         (* Not high *)
ANDN  %M11          (* Pump 2 OK *)
ST    %M20          (* TANK1_NEEDS_BACKUP *)

(* RUNG 12: Tank 2 Backup Request *)
LD    %M11
AND   %I0.8
ANDN  %I0.9
ANDN  %M12
ST    %M21

(* RUNG 13: Valve 1-2 Control *)
LD    %M20
ST    %Q0.3         (* VALVE_12 *)

(* RUNG 14: Valve 2-3 Control *)
LD    %M21
ST    %Q0.4         (* VALVE_23 *)

(* RUNG 15-17: Fault Indicators *)
LD    %M10
ST    %Q0.6         (* PUMP1_FAULT_IND *)

LD    %M11
ST    %Q0.7         (* PUMP2_FAULT_IND *)

LD    %M12
ST    %Q0.8         (* PUMP3_FAULT_IND *)

(* RUNG 18: System Running Indicator *)
LD    %M0
ST    %Q0.9         (* SYSTEM_RUN_IND *)

(* RUNG 19: General Alarm *)
LD    %M10
OR    %M11
OR    %M12
ST    %Q0.10        (* ALARM_OUTPUT *)
""")


if __name__ == "__main__":
    print("=" * 70)
    print("3-PUMP 3-TANK BACKUP SYSTEM - INSTRUCTION LIST (IL) VERSION")
    print("TM221CE40T Controller")
    print("=" * 70)
    print()

    filepath = create_pump_tank_backup_IL()

    if filepath:
        print()
        print_il_program()
        print()
        print("=" * 70)
        print("IL INSTRUCTION REFERENCE")
        print("=" * 70)
        print("""
IL INSTRUCTION SET USED:
------------------------
LD    - Load (start new logic line)
ST    - Store (output result)
AND   - Logical AND
OR    - Logical OR
ANDN  - AND NOT (inverted AND)
ORN   - OR NOT (inverted OR)
BLK   - Begin function block (timer/counter)
IN    - Function block input
END_BLK - End function block

ADDRESSING:
-----------
%I0.x  - Digital Input x
%Q0.x  - Digital Output x
%M     - Memory bit
%TM    - Timer
%TM.Q  - Timer done bit

19 RUNGS TOTAL:
---------------
Rungs 1-4:   System control and pump commands
Rungs 5-10:  Pump outputs and fault detection
Rungs 11-12: Backup request logic
Rungs 13-14: Valve control
Rungs 15-17: Fault indicators
Rung 18:     System running indicator
Rung 19:     General alarm
""")
        print("=" * 70)
        print(f"File created: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("Select IL view to see Instruction List code")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
