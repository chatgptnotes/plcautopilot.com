import { NextRequest, NextResponse } from 'next/server';
import { generateM221Program } from '@/lib/claude';

interface M221ProgramData {
  projectName: string;
  inputs: Array<{ address: string; symbol: string; comment: string }>;
  outputs: Array<{ address: string; symbol: string; comment: string }>;
  memory: Array<{ address: string; symbol: string; comment: string }>;
  timers?: Array<{
    address: string;
    symbol: string;
    type: string;
    preset: number;
    timebase: string;
    comment: string;
  }>;
  rungs: Array<{
    name: string;
    comment: string;
    il: string[];
    ladder: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, plcModel, manufacturer } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Check if Claude API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please set ANTHROPIC_API_KEY.' },
        { status: 500 }
      );
    }

    // Generate program using Claude AI
    const aiResponse = await generateM221Program(description, plcModel || 'TM221CE16T');

    // Parse AI response
    let programData: M221ProgramData;
    try {
      programData = JSON.parse(aiResponse);
    } catch {
      // If parsing fails, create a basic structure
      programData = {
        projectName: 'AI_Generated_Program',
        inputs: [
          { address: '%I0.0', symbol: 'START_BTN', comment: 'Start Button' },
          { address: '%I0.1', symbol: 'STOP_BTN', comment: 'Stop Button' }
        ],
        outputs: [
          { address: '%Q0.0', symbol: 'OUTPUT1', comment: 'Output 1' }
        ],
        memory: [
          { address: '%M0', symbol: 'RUN_FLAG', comment: 'Running Flag' }
        ],
        rungs: [
          {
            name: 'Basic Control',
            comment: 'Generated from description',
            il: ['LD %I0.0', 'OR %M0', 'ANDN %I0.1', 'ST %M0'],
            ladder: 'Basic start/stop logic'
          }
        ]
      };
    }

    // Generate the .smbp XML content
    const smbpContent = generateSmbpXml(programData, plcModel || 'TM221CE16T');

    return NextResponse.json({
      success: true,
      content: smbpContent,
      filename: `${programData.projectName}.smbp`,
      extension: '.smbp',
      model: plcModel || 'TM221CE16T',
      manufacturer: manufacturer || 'Schneider Electric',
      programData: programData,
      aiGenerated: true
    });

  } catch (error: any) {
    console.error('AI Generation Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause,
      apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
      modelConfigured: !!process.env.CLAUDE_MODEL
    });
    return NextResponse.json(
      {
        error: 'Failed to generate program with AI',
        details: error.message || String(error),
        errorType: error.name,
        apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
        modelConfigured: !!process.env.CLAUDE_MODEL,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}

function generateSmbpXml(data: M221ProgramData, plcModel: string): string {
  const projectName = data.projectName || 'AI_Generated';
  const fullPath = `C:\\Users\\Documents\\${projectName}.smbp`;

  // Generate rungs XML
  const rungsXml = data.rungs.map((rung, index) => generateRungXml(rung, index)).join('\n');

  // Generate memory bits XML
  const memoryBitsXml = data.memory.map((mem, index) => `
      <MemoryBit>
        <Address>${mem.address}</Address>
        <Index>${index}</Index>
        <Symbol>${mem.symbol}</Symbol>
        <Comment>${mem.comment}</Comment>
      </MemoryBit>`).join('');

  // Generate timers XML
  const timersXml = data.timers?.map((timer, index) => `
      <Timer>
        <Address>${timer.address}</Address>
        <Index>${index}</Index>
        <Symbol>${timer.symbol}</Symbol>
        <Comment>${timer.comment}</Comment>
        <Type>${timer.type}</Type>
        <TimeBase>TimeBase${timer.timebase}</TimeBase>
        <Preset>${timer.preset}</Preset>
      </Timer>`).join('') || '';

  // Generate digital inputs XML
  const digitalInputsXml = generateDigitalInputsXml(data.inputs, plcModel);

  // Generate digital outputs XML
  const digitalOutputsXml = generateDigitalOutputsXml(data.outputs, plcModel);

  return `<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>${projectName}</Name>
  <FullName>${fullPath}</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>
  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Main Program</Name>
        <SectionNumber>1</SectionNumber>
        <Rungs>
${rungsXml}
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
    <TimersMemoryAllocation>
      <Allocation>Manual</Allocation>
      <ForcedCount>${data.timers?.length || 0}</ForcedCount>
    </TimersMemoryAllocation>
    <CountersMemoryAllocation />
    <RegistersMemoryAllocation />
    <DrumsMemoryAllocation />
    <SbrsMemoryAllocation />
    <ScsMemoryAllocation />
    <FcsMemoryAllocation />
    <SchsMemoryAllocation />
    <HscsMemoryAllocation />
    <PtosMemoryAllocation />
    <MemoryBits>${memoryBitsXml}
    </MemoryBits>
    <Timers>${timersXml}
    </Timers>
    ${generateSystemBits()}
    ${generateSystemWords()}
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
        <Reference>${plcModel}</Reference>
        <Name>MyController</Name>
        <Consumption5V>300</Consumption5V>
        <Consumption24V>150</Consumption24V>
        ${generateTechnicalConfiguration()}
        ${digitalInputsXml}
        ${digitalOutputsXml}
        <AnalogInputs />
        <AnalogInputsStatus />
        <AnalogOutputs />
        <AnalogOutputsStatus />
        ${generateHighSpeedCounters()}
        ${generatePulseTrainOutputs()}
        <HardwareId>1929</HardwareId>
        <IsExpander>false</IsExpander>
        ${generateEthernetConfiguration()}
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
      ${generateSerialLineConfiguration()}
    </Plc>
  </HardwareConfiguration>
  ${generateDisplayConfiguration()}
  ${generateGlobalProperties(projectName)}
  ${generateReportConfiguration()}
</ProjectDescriptor>`;
}

function generateRungXml(rung: M221ProgramData['rungs'][0], index: number): string {
  // Generate ladder elements from IL instructions
  const ladderElements = generateLadderElements(rung.il);
  const instructionLines = rung.il.map(il => `
              <InstructionLineEntity>
                <InstructionLine>${il}</InstructionLine>
                <Comment></Comment>
              </InstructionLineEntity>`).join('');

  return `          <RungEntity>
            <LadderElements>
${ladderElements}
            </LadderElements>
            <InstructionLines>${instructionLines}
            </InstructionLines>
            <Name>${rung.name}</Name>
            <MainComment>${rung.comment}</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>`;
}

function generateLadderElements(ilInstructions: string[]): string {
  const elements: string[] = [];
  let column = 0;

  for (const il of ilInstructions) {
    const parts = il.trim().split(/\s+/);
    const instruction = parts[0].toUpperCase();
    const operand = parts[1] || '';

    let elementType = 'Line';
    let descriptor = operand;

    switch (instruction) {
      case 'LD':
        elementType = 'NormalContact';
        break;
      case 'LDN':
        elementType = 'NegatedContact';
        break;
      case 'AND':
        elementType = 'NormalContact';
        break;
      case 'ANDN':
        elementType = 'NegatedContact';
        break;
      case 'OR':
        elementType = 'NormalContact';
        break;
      case 'ORN':
        elementType = 'NegatedContact';
        break;
      case 'ST':
        elementType = 'Coil';
        break;
      case 'S':
        elementType = 'SetCoil';
        break;
      case 'R':
        elementType = 'ResetCoil';
        break;
      case 'IN':
        elementType = 'TimerFunctionBlock';
        break;
      default:
        continue;
    }

    elements.push(`              <LadderEntity>
                <ElementType>${elementType}</ElementType>
                <Descriptor>${descriptor}</Descriptor>
                <Comment>${instruction} ${operand}</Comment>
                <Symbol></Symbol>
                <Row>0</Row>
                <Column>${column}</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>`);

    column++;
  }

  // Add connecting lines if needed
  while (column < 10) {
    elements.push(`              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>${column}</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>`);
    column++;
  }

  return elements.join('\n');
}

function generateDigitalInputsXml(
  inputs: Array<{ address: string; symbol: string; comment: string }>,
  plcModel: string
): string {
  const maxInputs = plcModel.includes('CE16T') ? 9 : plcModel.includes('CE24T') ? 14 : 24;
  const inputsXml: string[] = [];

  for (let i = 0; i < maxInputs; i++) {
    const input = inputs.find(inp => inp.address === `%I0.${i}`);
    const symbolXml = input ? `\n            <Symbol>${input.symbol}</Symbol>` : '';
    const commentXml = input ? `\n            <Comment>${input.comment}</Comment>` : '';

    inputsXml.push(`          <DiscretInput>
            <Address>%I0.${i}</Address>
            <Index>${i}</Index>${symbolXml}${commentXml}
            <DIFiltering>DIFilterings4ms</DIFiltering>
            <DILatch>DILatchNo</DILatch>
          </DiscretInput>`);
  }

  return `<DigitalInputs>\n${inputsXml.join('\n')}\n        </DigitalInputs>`;
}

function generateDigitalOutputsXml(
  outputs: Array<{ address: string; symbol: string; comment: string }>,
  plcModel: string
): string {
  const maxOutputs = plcModel.includes('CE16T') ? 7 : plcModel.includes('CE24T') ? 10 : 16;
  const outputsXml: string[] = [];

  for (let i = 0; i < maxOutputs; i++) {
    const output = outputs.find(out => out.address === `%Q0.${i}`);
    const symbolXml = output ? `\n            <Symbol>${output.symbol}</Symbol>` : '';
    const commentXml = output ? `\n            <Comment>${output.comment}</Comment>` : '';

    outputsXml.push(`          <DiscretOutput>
            <Address>%Q0.${i}</Address>
            <Index>${i}</Index>${symbolXml}${commentXml}
          </DiscretOutput>`);
  }

  return `<DigitalOutputs>\n${outputsXml.join('\n')}\n        </DigitalOutputs>`;
}

function generateSystemBits(): string {
  return `<SystemBits>
      <MemoryBit>
        <Address>%S0</Address>
        <Index>0</Index>
        <Symbol>SB_COLDSTART</Symbol>
        <Comment>Indicates or executes a cold start</Comment>
      </MemoryBit>
      <MemoryBit>
        <Address>%S1</Address>
        <Index>1</Index>
        <Symbol>SB_WARMSTART</Symbol>
        <Comment>Indicates warm start with data backup</Comment>
      </MemoryBit>
      <MemoryBit>
        <Address>%S6</Address>
        <Index>6</Index>
        <Symbol>SB_TB1S</Symbol>
        <Comment>Time base of 1 s</Comment>
      </MemoryBit>
      <MemoryBit>
        <Address>%S12</Address>
        <Index>12</Index>
        <Symbol>SB_RUNMODE</Symbol>
        <Comment>Controller is running</Comment>
      </MemoryBit>
    </SystemBits>`;
}

function generateSystemWords(): string {
  return `<SystemWords>
      <MemoryWord>
        <Address>%SW0</Address>
        <Index>0</Index>
        <Symbol>SW_SCANTIME</Symbol>
        <Comment>Scan time in ms</Comment>
      </MemoryWord>
    </SystemWords>`;
}

function generateTechnicalConfiguration(): string {
  return `<TechnicalConfiguration>
          <PtoConfiguration>
            <McPowerPtoMax>86</McPowerPtoMax>
            <McMoveVelPtoMax>86</McMoveVelPtoMax>
            <McMotionTaskPtoMax>2</McMotionTaskPtoMax>
          </PtoConfiguration>
          <ComConfiguration>
            <ReadVarBasicMax>32</ReadVarBasicMax>
            <WriteVarBasicMax>32</WriteVarBasicMax>
            <SendRecvMsgBasicMax>16</SendRecvMsgBasicMax>
          </ComConfiguration>
          <TimersMax>255</TimersMax>
          <CountersMax>255</CountersMax>
          <InternalBitsMax>1024</InternalBitsMax>
          <MemoryWordsMax>8000</MemoryWordsMax>
        </TechnicalConfiguration>`;
}

function generateHighSpeedCounters(): string {
  return `<HighSpeedCounters>
          <HighSpeedCounter>
            <Address>%HSC0</Address>
            <Index>0</Index>
            <Preset>0</Preset>
            <TimeWindow>OneSecond</TimeWindow>
          </HighSpeedCounter>
        </HighSpeedCounters>`;
}

function generatePulseTrainOutputs(): string {
  return `<PulseTrainOutputs>
          <PulseTrainOutput>
            <Address>%PLS0/%PWM0/%PTO0/%FREQGEN0</Address>
            <Index>0</Index>
            <GlobalIndex>0</GlobalIndex>
            <Preset>1</Preset>
          </PulseTrainOutput>
        </PulseTrainOutputs>`;
}

function generateEthernetConfiguration(): string {
  return `<EthernetConfiguration>
          <NetworkName>M221</NetworkName>
          <IpAllocationMode>FixedAddress</IpAllocationMode>
          <IpAddress>0.0.0.0</IpAddress>
          <SubnetMask>0.0.0.0</SubnetMask>
          <GatewayAddress>0.0.0.0</GatewayAddress>
          <TransfertRate>TransfertRateAuto</TransfertRate>
          <EthernetProtocol>ProtocolEthernet2</EthernetProtocol>
          <ModbusTcpSlave>
            <SlavePort>502</SlavePort>
            <ModbusServerEnabled>false</ModbusServerEnabled>
          </ModbusTcpSlave>
        </EthernetConfiguration>`;
}

function generateSerialLineConfiguration(): string {
  return `<SerialLineConfiguration>
        <Baud>Baud19200</Baud>
        <Parity>ParityEven</Parity>
        <DataBits>DataBits8</DataBits>
        <StopBits>StopBits1</StopBits>
        <PhysicalMedium>PhysicalMediumRs485</PhysicalMedium>
        <TransmissionMode>TransmissionModeModbusRtu</TransmissionMode>
        <SlaveId>1</SlaveId>
      </SerialLineConfiguration>`;
}

function generateDisplayConfiguration(): string {
  return `<DisplayUserLabelsConfiguration>
    <Languages>
      <UserLabelLanguage>
        <Code>English</Code>
        <Name>English</Name>
      </UserLabelLanguage>
    </Languages>
    <Translations />
  </DisplayUserLabelsConfiguration>`;
}

function generateGlobalProperties(projectName: string): string {
  return `<GlobalProperties>
    <UserInformations />
    <CompanyInformations />
    <ProjectInformations>
      <Name>${projectName}</Name>
    </ProjectInformations>
    <ProjectProtection>
      <Active>false</Active>
      <Password />
      <CanView>true</CanView>
    </ProjectProtection>
    <ApplicationProtection>
      <Active>false</Active>
      <Password />
    </ApplicationProtection>
    <DownloadSettings>
      <ResetMemories>true</ResetMemories>
      <DownloadSymbolsComments>true</DownloadSymbolsComments>
    </DownloadSettings>
  </GlobalProperties>`;
}

function generateReportConfiguration(): string {
  return `<ReportConfiguration>
    <PageSetup>
      <PaperKind>A4</PaperKind>
      <IsLandscape>false</IsLandscape>
    </PageSetup>
  </ReportConfiguration>`;
}
