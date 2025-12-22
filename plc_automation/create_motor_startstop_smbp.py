"""
Create Motor Start/Stop .smbp File for TM221CE40T
Generates a complete EcoStruxure Machine Expert Basic project file

TM221CE40T Specifications:
- 24 digital inputs (%I0.0 to %I0.23)
- 16 digital outputs (%Q0.0 to %Q0.15) - Transistor
- 2 analog inputs (%IW0.0, %IW0.1)
- Ethernet port
- HardwareId: 1933 (TM221CE40T)

I/O Assignment for Motor Start/Stop:
- %I0.0: START_BTN (Start Push Button - NO)
- %I0.1: STOP_BTN (Stop Push Button - NC)
- %I0.2: OVERLOAD (Thermal Overload - NC)
- %M0: MOTOR_RUN (Internal memory bit for seal-in)
- %Q0.0: MOTOR (Motor Contactor Output)
- %Q0.1: RUN_LIGHT (Running Indicator)
"""

import os
from datetime import datetime

def generate_motor_startstop_smbp():
    """Generate a complete .smbp file for motor start/stop control"""

    project_name = "Motor_StartStop_v2"
    save_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        f"{project_name}.smbp"
    )

    # Generate the XML content
    xml_content = generate_xml_content(project_name, save_path)

    # Write to file
    with open(save_path, 'w', encoding='utf-8') as f:
        f.write(xml_content)

    print(f"Created: {save_path}")
    print(f"File size: {os.path.getsize(save_path)} bytes")

    return save_path

def generate_xml_content(project_name, full_path):
    """Generate the complete XML content for the .smbp file"""

    xml = f'''<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>{project_name}</Name>
  <FullName>{full_path}</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>
  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Main Program</Name>
        <SectionNumber>1</SectionNumber>
        <Rungs>
{generate_rung1_startstop()}
{generate_rung2_motor_output()}
{generate_rung3_run_light()}
        </Rungs>
      </ProgramOrganizationUnits>
    </Pous>
    <Subroutines />
    <WatchLists />
    <CustomSymbols />
    <ConstantWordsMemoryAllocation />
    <MemoryBitsMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>512</ForcedCount>
    </MemoryBitsMemoryAllocation>
    <MemoryWordsMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>2000</ForcedCount>
    </MemoryWordsMemoryAllocation>
    <TimersMemoryAllocation />
    <CountersMemoryAllocation />
    <RegistersMemoryAllocation />
    <DrumsMemoryAllocation />
    <SbrsMemoryAllocation />
    <ScsMemoryAllocation />
    <FcsMemoryAllocation />
    <SchsMemoryAllocation />
    <HscsMemoryAllocation />
    <PtosMemoryAllocation />
    <MemoryBits>
      <MemoryBit>
        <Address>%M0</Address>
        <Index>0</Index>
        <Symbol>MOTOR_RUN</Symbol>
        <Comment>Motor Run Status - Internal Seal-in Bit</Comment>
      </MemoryBit>
    </MemoryBits>
{generate_system_bits()}
{generate_system_words()}
    <MastTask>
      <ExecutionMode>FreeRun</ExecutionMode>
      <PeriodScan>100</PeriodScan>
    </MastTask>
    <CpuBehavior>
      <StartingMode>StartAsPreviousState</StartingMode>
      <RunStopAddress />
      <AutoSaveRamOnEeprom>true</AutoSaveRamOnEeprom>
      <WatchdogPeriod>250</WatchdogPeriod>
    </CpuBehavior>
    <TraceTimeBase>Time5Sec</TraceTimeBase>
    <UserFunctionPous />
    <UserFunctionBlockPous />
    <UserDefineFunctionBlocks />
  </SoftwareConfiguration>
  <HardwareConfiguration>
    <Plc>
      <Cpu>
        <Index>0</Index>
        <InputNb>0</InputNb>
        <OutputNb>0</OutputNb>
        <Kind>0</Kind>
        <Reference>TM221CE40T</Reference>
        <Name>MyController</Name>
        <Consumption5V>520</Consumption5V>
        <Consumption24V>200</Consumption24V>
{generate_technical_configuration()}
{generate_digital_inputs()}
{generate_digital_outputs()}
{generate_analog_inputs()}
        <AnalogInputsStatus />
        <AnalogOutputs />
        <AnalogOutputsStatus />
{generate_high_speed_counters()}
{generate_pulse_train_outputs()}
        <HardwareId>1933</HardwareId>
        <IsExpander>false</IsExpander>
{generate_ethernet_configuration()}
        <MaxCartridge>1</MaxCartridge>
        <C1TranslationX>170</C1TranslationX>
        <C1TranslationY>110</C1TranslationY>
        <C2TranslationX>0</C2TranslationX>
        <C2TranslationY>0</C2TranslationY>
        <C1SizeX>155</C1SizeX>
        <C1SizeY>190</C1SizeY>
        <C2SizeX>0</C2SizeX>
        <C2SizeY>0</C2SizeY>
        <InputAssemblys />
        <OutputAssemblys />
        <InputRegisters />
        <HoldingRegisters />
      </Cpu>
      <Extensions />
{generate_serial_line_configuration()}
    </Plc>
  </HardwareConfiguration>
{generate_display_configuration()}
{generate_global_properties(project_name)}
{generate_report_configuration()}
</ProjectDescriptor>'''

    return xml

def generate_rung1_startstop():
    """
    Rung 1: Motor Start/Stop with Seal-in

    Ladder Logic:
    |--[START_BTN]--+--]/[STOP_BTN]--]/[OVERLOAD]--(MOTOR_RUN)--|
    |               |                                            |
    |--[MOTOR_RUN]--+                                            |

    IL Code:
    LD    %I0.0     (START_BTN)
    OR    %M0      (MOTOR_RUN seal-in)
    ANDN  %I0.1    (STOP_BTN - NC)
    ANDN  %I0.2    (OVERLOAD - NC)
    ST    %M0      (MOTOR_RUN)
    """
    return '''          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.0</Descriptor>
                <Comment>Start Push Button (Normally Open)</Comment>
                <Symbol>START_BTN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Seal-in Contact</Comment>
                <Symbol>MOTOR_RUN</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Stop Push Button (Normally Closed - Fail Safe)</Comment>
                <Symbol>STOP_BTN</Symbol>
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
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.2</Descriptor>
                <Comment>Thermal Overload (Normally Closed - Fail Safe)</Comment>
                <Symbol>OVERLOAD</Symbol>
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
                <Comment>Motor Run Status Bit</Comment>
                <Symbol>MOTOR_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load START_BTN</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M0</InstructionLine>
                <Comment>OR with MOTOR_RUN (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT STOP_BTN (NC contact)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.2</InstructionLine>
                <Comment>AND NOT OVERLOAD (NC contact)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to MOTOR_RUN</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Motor Start/Stop</Name>
            <MainComment>Motor Start/Stop Circuit with Seal-in and Safety Interlocks</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>'''

def generate_rung2_motor_output():
    """
    Rung 2: Motor Output

    Ladder Logic:
    |--[MOTOR_RUN]--(MOTOR)--|

    IL Code:
    LD    %M0      (MOTOR_RUN)
    ST    %Q0.0    (MOTOR)
    """
    return '''          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Motor Run Status</Comment>
                <Symbol>MOTOR_RUN</Symbol>
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
                <Comment>Motor Contactor Output</Comment>
                <Symbol>MOTOR</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load MOTOR_RUN status</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Output to MOTOR contactor</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Motor Output</Name>
            <MainComment>Drive Motor Contactor from Run Status</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>'''

def generate_rung3_run_light():
    """
    Rung 3: Run Indicator Light

    Ladder Logic:
    |--[MOTOR_RUN]--(RUN_LIGHT)--|

    IL Code:
    LD    %M0      (MOTOR_RUN)
    ST    %Q0.1    (RUN_LIGHT)
    """
    return '''          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Motor Run Status</Comment>
                <Symbol>MOTOR_RUN</Symbol>
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
                <Comment>Motor Running Indicator Light</Comment>
                <Symbol>RUN_LIGHT</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load MOTOR_RUN status</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.1</InstructionLine>
                <Comment>Output to RUN_LIGHT</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Run Indicator</Name>
            <MainComment>Motor Running Indicator Light Output</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>'''

def generate_system_bits():
    """Generate system bits section"""
    system_bits = [
        ("%S0", 0, "SB_COLDSTART", "Indicates or executes a cold start"),
        ("%S1", 1, "SB_WARMSTART", "Indicates warm start with data backup"),
        ("%S4", 4, "SB_TB10MS", "Time base of 10 ms"),
        ("%S5", 5, "SB_TB100MS", "Time base of 100 ms"),
        ("%S6", 6, "SB_TB1S", "Time base of 1 s"),
        ("%S7", 7, "SB_TB1MIN", "Time base of 1 min"),
        ("%S12", 12, "SB_RUNMODE", "Controller is running"),
        ("%S13", 13, "SB_FIRSTRUN", "First controller cycle in RUN mode"),
    ]

    xml = "    <SystemBits>\n"
    for addr, idx, symbol, comment in system_bits:
        xml += f'''      <MemoryBit>
        <Address>{addr}</Address>
        <Index>{idx}</Index>
        <Symbol>{symbol}</Symbol>
        <Comment>{comment}</Comment>
      </MemoryBit>
'''
    xml += "    </SystemBits>\n"
    return xml

def generate_system_words():
    """Generate system words section"""
    return '''    <SystemWords>
      <MemoryWord>
        <Address>%SW0</Address>
        <Index>0</Index>
        <Symbol>SW_SCANTIME</Symbol>
        <Comment>Scan time in ms</Comment>
      </MemoryWord>
    </SystemWords>
'''

def generate_technical_configuration():
    """Generate technical configuration for TM221CE40T"""
    return '''        <TechnicalConfiguration>
          <PtoConfiguration>
            <McPowerPtoMax>86</McPowerPtoMax>
            <McMoveVelPtoMax>86</McMoveVelPtoMax>
            <McMoveRelPtoMax>86</McMoveRelPtoMax>
            <McMoveAbsPtoMax>86</McMoveAbsPtoMax>
            <McHomePtoMax>86</McHomePtoMax>
            <McSetPosPtoMax>86</McSetPosPtoMax>
            <McStopPtoMax>86</McStopPtoMax>
            <McHaltPtoMax>86</McHaltPtoMax>
            <McReadActVelPtoMax>40</McReadActVelPtoMax>
            <McReadActPosPtoMax>40</McReadActPosPtoMax>
            <McReadStsPtoMax>40</McReadStsPtoMax>
            <McReadMotionStatePtoMax>40</McReadMotionStatePtoMax>
            <McReadAxisErrorPtoMax>40</McReadAxisErrorPtoMax>
            <McResetPtoMax>40</McResetPtoMax>
            <McTouchProbePtoMax>40</McTouchProbePtoMax>
            <McAbortTriggerPtoMax>40</McAbortTriggerPtoMax>
            <McReadParPtoMax>40</McReadParPtoMax>
            <McWriteParPtoMax>40</McWriteParPtoMax>
            <McMotionTaskPtoMax>2</McMotionTaskPtoMax>
          </PtoConfiguration>
          <ComConfiguration>
            <ReadVarBasicMax>32</ReadVarBasicMax>
            <WriteVarBasicMax>32</WriteVarBasicMax>
            <WriteReadVarBasicMax>32</WriteReadVarBasicMax>
            <SendRecvMsgBasicMax>16</SendRecvMsgBasicMax>
            <SendRecvSmsMax>1</SendRecvSmsMax>
          </ComConfiguration>
          <Compatibility>0</Compatibility>
          <FastCounterMax>4</FastCounterMax>
          <FourInputsEventTask>84148994</FourInputsEventTask>
          <GrafcetBitsMax>200</GrafcetBitsMax>
          <InternalRamStart>0</InternalRamStart>
          <LabelsMax>64</LabelsMax>
          <LfRegistersMax>4</LfRegistersMax>
          <MemoryConstantWordsMax>512</MemoryConstantWordsMax>
          <MemoryWordsMax>8000</MemoryWordsMax>
          <NumRelays>0</NumRelays>
          <NumRelaysMax>9999</NumRelaysMax>
          <NumTransistors>16</NumTransistors>
          <NumTransistorsMax>9999</NumTransistorsMax>
          <PidAmountMax>14</PidAmountMax>
          <PlcNumberSysBits>160</PlcNumberSysBits>
          <PlcNumberSysWords>234</PlcNumberSysWords>
          <PlcStartAddrSysBits>16</PlcStartAddrSysBits>
          <PlcType>0</PlcType>
          <TimersMax>255</TimersMax>
          <AnalogInputPrecision>0</AnalogInputPrecision>
          <AnalogOutputPrecision>0</AnalogOutputPrecision>
          <StepCountersMax>8</StepCountersMax>
          <CountersMax>255</CountersMax>
          <DrumsMax>8</DrumsMax>
          <ExternalRamSize>184320</ExternalRamSize>
          <ExternalRamSizeWithDisplay>221776</ExternalRamSizeWithDisplay>
          <ExternalRamStart>117538816</ExternalRamStart>
          <InternalRamAppStart>512</InternalRamAppStart>
          <InternalRamSize>130560</InternalRamSize>
          <InternalBitsMax>1024</InternalBitsMax>
          <InternalEepromSize>32</InternalEepromSize>
          <MetadataAreaSize>45056</MetadataAreaSize>
          <ScheduleBlocksMax>16</ScheduleBlocksMax>
          <ShiftBitRegistersMax>8</ShiftBitRegistersMax>
          <SubroutinesMax>64</SubroutinesMax>
          <SupportDoubleWord>true</SupportDoubleWord>
          <SupportEvents>true</SupportEvents>
          <SupportFloatingPoint>true</SupportFloatingPoint>
          <NumberOf1MsTimerBase>6</NumberOf1MsTimerBase>
          <UdfbInstanceMax>32</UdfbInstanceMax>
          <UdfMax>64</UdfMax>
          <UdfObjectsMax>4096</UdfObjectsMax>
        </TechnicalConfiguration>'''

def generate_digital_inputs():
    """Generate digital inputs for TM221CE40T (24 inputs)"""
    # Define symbols for our motor start/stop program
    symbols = {
        0: "START_BTN",
        1: "STOP_BTN",
        2: "OVERLOAD"
    }

    xml = "        <DigitalInputs>\n"
    for i in range(24):  # TM221CE40T has 24 digital inputs
        symbol = symbols.get(i, "")
        symbol_xml = f"\n            <Symbol>{symbol}</Symbol>" if symbol else ""
        xml += f'''          <DiscretInput>
            <Address>%I0.{i}</Address>
            <Index>{i}</Index>{symbol_xml}
            <DIFiltering>DIFilterings4ms</DIFiltering>
            <DILatch>DILatchNo</DILatch>
          </DiscretInput>
'''
    xml += "        </DigitalInputs>\n"
    return xml

def generate_digital_outputs():
    """Generate digital outputs for TM221CE40T (16 outputs)"""
    # Define symbols for our motor start/stop program
    symbols = {
        0: "MOTOR",
        1: "RUN_LIGHT"
    }

    xml = "        <DigitalOutputs>\n"
    for i in range(16):  # TM221CE40T has 16 digital outputs
        symbol = symbols.get(i, "")
        symbol_xml = f"\n            <Symbol>{symbol}</Symbol>" if symbol else ""
        xml += f'''          <DiscretOutput>
            <Address>%Q0.{i}</Address>
            <Index>{i}</Index>{symbol_xml}
          </DiscretOutput>
'''
    xml += "        </DigitalOutputs>\n"
    return xml

def generate_analog_inputs():
    """Generate analog inputs for TM221CE40T (2 inputs)"""
    xml = "        <AnalogInputs>\n"
    for i in range(2):
        xml += f'''          <AnalogIO>
            <Address>%IW0.{i}</Address>
            <Index>{i}</Index>
            <Type>
              <Value>0</Value>
              <Name>Type_0_10V</Name>
            </Type>
            <Scope>
              <Value>0</Value>
              <Name>Scope_Normal</Name>
            </Scope>
            <Minimum>0</Minimum>
            <Maximum>1000</Maximum>
            <IsInput>true</IsInput>
            <R>1</R>
            <B>1</B>
            <T>1</T>
            <Activation>3100</Activation>
            <Reactivation>1500</Reactivation>
            <InputFilter>0</InputFilter>
            <R1>8700</R1>
            <R2>200</R2>
            <T1>234.15</T1>
            <T2>311.15</T2>
            <ChartCalculation>false</ChartCalculation>
          </AnalogIO>
'''
    xml += "        </AnalogInputs>\n"
    return xml

def generate_high_speed_counters():
    """Generate high speed counter configuration"""
    xml = "        <HighSpeedCounters>\n"
    for hsc_idx in [0, 1, 2, 3]:
        xml += f'''          <HighSpeedCounter>
            <Address>%HSC{hsc_idx}</Address>
            <Index>{hsc_idx}</Index>
            <Preset>0</Preset>
            <DedicatedInputs>
              <DedicatedInput><Index>0</Index></DedicatedInput>
              <DedicatedInput><Index>1</Index></DedicatedInput>
              <DedicatedInput><Index>2</Index></DedicatedInput>
              <DedicatedInput><Index>3</Index></DedicatedInput>
            </DedicatedInputs>
            <ReflexOutputs>
              <ReflexOutput>
                <Index>0</Index>
                <Activated>false</Activated>
                <LessThanS0>false</LessThanS0>
                <GreaterOrEqualThanS0>false</GreaterOrEqualThanS0>
                <GreaterOrEqualThanS1>false</GreaterOrEqualThanS1>
              </ReflexOutput>
              <ReflexOutput>
                <Index>1</Index>
                <Activated>false</Activated>
                <LessThanS0>false</LessThanS0>
                <GreaterOrEqualThanS0>false</GreaterOrEqualThanS0>
                <GreaterOrEqualThanS1>false</GreaterOrEqualThanS1>
              </ReflexOutput>
            </ReflexOutputs>
            <Thresholds>
              <Threshold>
                <Index>0</Index>
                <ThresholdType>NotUsed</ThresholdType>
                <Priority>7</Priority>
                <SubroutineNumber />
              </Threshold>
              <Threshold>
                <Index>1</Index>
                <ThresholdType>NotUsed</ThresholdType>
                <Priority>7</Priority>
                <SubroutineNumber />
              </Threshold>
            </Thresholds>
            <TimeWindow>OneSecond</TimeWindow>
          </HighSpeedCounter>
'''
    xml += "        </HighSpeedCounters>\n"
    return xml

def generate_pulse_train_outputs():
    """Generate pulse train outputs configuration"""
    xml = "        <PulseTrainOutputs>\n"
    for i in range(2):
        xml += f'''          <PulseTrainOutput>
            <Address>%PLS{i}/%PWM{i}/%PTO{i}/%FREQGEN{i}</Address>
            <Index>{i}</Index>
            <PtoObject>
              <RefInput>NotUsed</RefInput>
              <ZPhaseInput>NotUsed</ZPhaseInput>
              <ProbeInput>NotUsed</ProbeInput>
            </PtoObject>
            <GlobalIndex>{i}</GlobalIndex>
            <Preset>1</Preset>
          </PulseTrainOutput>
'''
    xml += "        </PulseTrainOutputs>\n"
    return xml

def generate_ethernet_configuration():
    """Generate Ethernet configuration"""
    return '''        <EthernetConfiguration>
          <NetworkName>M221</NetworkName>
          <IpAllocationMode>FixedAddress</IpAllocationMode>
          <IpAddress>0.0.0.0</IpAddress>
          <SubnetMask>0.0.0.0</SubnetMask>
          <GatewayAddress>0.0.0.0</GatewayAddress>
          <TransfertRate>TransfertRateAuto</TransfertRate>
          <EthernetProtocol>ProtocolEthernet2</EthernetProtocol>
          <ModbusTcpSlave>
            <IpMasterAddress>0.0.0.0</IpMasterAddress>
            <UseTimeout>true</UseTimeout>
            <Timeout>2</Timeout>
            <SlavePort>502</SlavePort>
            <UnitId xsi:nil="true" />
            <HoldingRegister>0</HoldingRegister>
            <InputRegister>0</InputRegister>
            <ModbusServerEnabled>false</ModbusServerEnabled>
            <Devices />
            <DigitalInputsIoScanner />
            <DigitalOutputsIoScanner />
            <RegisterInputsIoScanner />
            <RegisterOutputsIoScanner />
            <RegisterDeviceStatusIoScanner />
            <RegisterInputsStatusIoScanner />
            <Drives />
            <IsIoScanner>false</IsIoScanner>
          </ModbusTcpSlave>
          <EthernetIpEntity>
            <EthernetIpEnabled>false</EthernetIpEnabled>
            <OutputAssemblyInstance>0</OutputAssemblyInstance>
            <OutputAssemblySize>0</OutputAssemblySize>
            <InputAssemblySize>0</InputAssemblySize>
            <InputAssemblyInstance>0</InputAssemblyInstance>
          </EthernetIpEntity>
          <ProgrammingProtocolEnabled>false</ProgrammingProtocolEnabled>
          <EthernetIpAdapterEnabled>false</EthernetIpAdapterEnabled>
          <ModbusServerEnabled>false</ModbusServerEnabled>
          <AutoDiscoveryProtocolEnabled>false</AutoDiscoveryProtocolEnabled>
        </EthernetConfiguration>'''

def generate_serial_line_configuration():
    """Generate serial line configuration"""
    return '''      <SerialLineConfiguration>
        <Baud>Baud19200</Baud>
        <ModemReference>No Modem</ModemReference>
        <Parity>ParityEven</Parity>
        <DataBits>DataBits8</DataBits>
        <StopBits>StopBits1</StopBits>
        <TimeBetweenFrames>10</TimeBetweenFrames>
        <ResponseTime>10</ResponseTime>
        <StartCharacterEnabled>false</StartCharacterEnabled>
        <FirstEndCharacterEnabled>true</FirstEndCharacterEnabled>
        <SecondEndCharacterEnabled>false</SecondEndCharacterEnabled>
        <FrameLengthReceivedAvailable>false</FrameLengthReceivedAvailable>
        <FrameReceivedTimeoutAvailable>false</FrameReceivedTimeoutAvailable>
        <InitCommand />
        <SendFrameCharacter>false</SendFrameCharacter>
        <StartCharacter>0</StartCharacter>
        <FirstEndCharacter>10</FirstEndCharacter>
        <FrameLengthReceived>0</FrameLengthReceived>
        <FrameReceivedTimeout>0</FrameReceivedTimeout>
        <SecondEndCharacter>0</SecondEndCharacter>
        <PhysicalMedium>PhysicalMediumRs485</PhysicalMedium>
        <TransmissionMode>TransmissionModeModbusRtu</TransmissionMode>
        <SlaveId>1</SlaveId>
        <Addressing>SlaveAddressing</Addressing>
        <Polarization>
          <Value>0</Value>
          <Name>No</Name>
        </Polarization>
      </SerialLineConfiguration>
      <SerialLineIoScannerConfiguration>
        <TransmissionMode>TransmissionModeRtu</TransmissionMode>
        <Devices />
        <DigitalInputsIoScanner />
        <DigitalOutputsIoScanner />
        <RegisterInputsIoScanner />
        <RegisterOutputsIoScanner />
        <RegisterDeviceStatusIoScanner />
        <RegisterInputsStatusIoScanner />
        <Drives />
      </SerialLineIoScannerConfiguration>'''

def generate_display_configuration():
    """Generate display configuration"""
    return '''  <DisplayUserLabelsConfiguration>
    <Languages>
      <UserLabelLanguage>
        <Code>English</Code>
        <Name>English</Name>
      </UserLabelLanguage>
    </Languages>
    <Translations />
  </DisplayUserLabelsConfiguration>'''

def generate_global_properties(project_name):
    """Generate global properties"""
    return f'''  <GlobalProperties>
    <UserInformations />
    <CompanyInformations />
    <ProjectInformations>
      <Name>{project_name}</Name>
    </ProjectInformations>
    <ProjectProtection>
      <Active>false</Active>
      <Password />
      <CanView>true</CanView>
    </ProjectProtection>
    <ApplicationProtection>
      <Active>false</Active>
      <Password />
      <DownloadActive>false</DownloadActive>
      <DownloadPassword />
    </ApplicationProtection>
    <RemoteIpAddresses>
      <IpAddresses />
    </RemoteIpAddresses>
    <ModemConfigurations>
      <ModemConfigurationEntities />
    </ModemConfigurations>
    <KeepModbusParameters>false</KeepModbusParameters>
    <UnitId>1</UnitId>
    <DownloadSettings>
      <ResetMemories>true</ResetMemories>
      <DownloadSymbolsComments>true</DownloadSymbolsComments>
      <DownloadWatchLists>true</DownloadWatchLists>
      <DownloadPouNamesComments>true</DownloadPouNamesComments>
      <DownloadRungNamesComments>true</DownloadRungNamesComments>
      <DownloadIlComments>true</DownloadIlComments>
      <DownloadFrontPageProperties>true</DownloadFrontPageProperties>
      <DownloadCompanyProperties>true</DownloadCompanyProperties>
      <DownloadProjectInfo>true</DownloadProjectInfo>
    </DownloadSettings>
  </GlobalProperties>'''

def generate_report_configuration():
    """Generate report configuration"""
    return '''  <ReportConfiguration>
    <PageSetup>
      <PaperKind>A4</PaperKind>
      <IsLandscape>false</IsLandscape>
      <ReportUnit>HundredthsOfAnInch</ReportUnit>
      <Top>100</Top>
      <Bottom>100</Bottom>
      <Left>100</Left>
      <Right>100</Right>
    </PageSetup>
    <SubReportConfigurations />
  </ReportConfiguration>'''


if __name__ == "__main__":
    print("=" * 60)
    print("Motor Start/Stop .smbp File Generator")
    print("Target PLC: TM221CE40T")
    print("=" * 60)

    filepath = generate_motor_startstop_smbp()

    print("\n" + "=" * 60)
    print("PROGRAM SUMMARY")
    print("=" * 60)
    print("""
I/O ASSIGNMENT:
--------------
INPUTS:
  %I0.0 - START_BTN    (Start Push Button - NO)
  %I0.1 - STOP_BTN     (Stop Push Button - NC)
  %I0.2 - OVERLOAD     (Thermal Overload - NC)

OUTPUTS:
  %Q0.0 - MOTOR        (Motor Contactor)
  %Q0.1 - RUN_LIGHT    (Running Indicator)

INTERNAL:
  %M0   - MOTOR_RUN    (Seal-in Memory Bit)

LADDER LOGIC:
-------------
Rung 1: Motor Start/Stop with Seal-in
  |--[START_BTN]--+--]/[STOP_BTN]--]/[OVERLOAD]--(MOTOR_RUN)--|
  |               |                                            |
  |--[MOTOR_RUN]--+                                            |

Rung 2: Motor Output
  |--[MOTOR_RUN]--(MOTOR)--|

Rung 3: Run Indicator
  |--[MOTOR_RUN]--(RUN_LIGHT)--|
""")
    print("=" * 60)
    print(f"File created: {filepath}")
    print("Open this file with EcoStruxure Machine Expert - Basic")
    print("=" * 60)
