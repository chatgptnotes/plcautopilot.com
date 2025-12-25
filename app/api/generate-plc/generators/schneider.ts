import { PLCModel } from '../../../data/plc-models';

export async function generateSchneiderProgram(logic: string, model: PLCModel) {
  // Parse the logic description to extract requirements
  const requirements = parseLogicDescription(logic);

  // Generate the program content
  const content = generateSMBPContent(requirements, model);

  // Generate filename
  const filename = `${requirements.projectName || 'PLC_Program'}_${model.model}${model.fileExtension}`;

  return {
    content,
    filename,
  };
}

function parseLogicDescription(logic: string): any {
  // Simple parser - extract key information
  const lowerLogic = logic.toLowerCase();

  // Detect number of lights
  const lightMatch = logic.match(/(\d+)\s+(?:sequential\s+)?lights?/i);
  const numLights = lightMatch ? parseInt(lightMatch[1]) : 3;

  // Detect timing
  const timeMatch = logic.match(/(\d+)\s+seconds?/i);
  const delaySeconds = timeMatch ? parseInt(timeMatch[1]) : 3;

  // Detect inputs
  const hasStart = lowerLogic.includes('start');
  const hasStop = lowerLogic.includes('stop');
  const hasEmergency = lowerLogic.includes('emergency');

  // Detect program type
  let programType = 'sequential_lights';
  if (lowerLogic.includes('motor')) programType = 'motor_control';
  if (lowerLogic.includes('conveyor')) programType = 'conveyor';
  if (lowerLogic.includes('traffic')) programType = 'traffic_light';

  return {
    projectName: extractProjectName(logic),
    programType,
    numLights,
    delaySeconds,
    hasStart,
    hasStop,
    hasEmergency,
    rawLogic: logic,
  };
}

function extractProjectName(logic: string): string {
  // Try to extract a project name from the logic
  const nameMatch = logic.match(/(?:project|program|name):\s*([^\n.]+)/i);
  if (nameMatch) {
    return nameMatch[1].trim().replace(/[^a-zA-Z0-9_]/g, '_');
  }
  return 'Generated_Program';
}

function generateSMBPContent(requirements: any, model: PLCModel): string {
  // This is a simplified version - in production, this would use the
  // actual template-based generation from plc_program_generator.py

  const { numLights, delaySeconds, projectName } = requirements;

  // Generate XML content for Schneider .smbp file
  return `<?xml version="1.0" encoding="utf-8"?>
<ProjectDescriptor xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ProjectVersion>3.0.0.0</ProjectVersion>
  <ManagementLevel>FunctLevelMan21_0</ManagementLevel>
  <Name>${projectName}</Name>
  <FullName>${projectName}${model.fileExtension}</FullName>
  <CurrentCultureName>en-GB</CurrentCultureName>

  <SoftwareConfiguration>
    <Pous>
      <ProgramOrganizationUnits>
        <Name>Main_Program</Name>
        <SectionNumber>1</SectionNumber>
        <Rungs>
          ${generateRungs(requirements)}
        </Rungs>
      </ProgramOrganizationUnits>
    </Pous>

    <Timers>
      ${generateTimers(requirements)}
    </Timers>

    <MemoryBits>
      <MemoryBit>
        <Address>%M0</Address>
        <Index>0</Index>
        <Symbol>SEQUENCE_RUN</Symbol>
        <Comment>Sequence Running Flag</Comment>
      </MemoryBit>
    </MemoryBits>
  </SoftwareConfiguration>

  <HardwareConfiguration>
    <Plc>
      <Cpu>
        <Reference>${model.model}</Reference>
        <Comment>Auto-generated for ${model.manufacturer} ${model.model}</Comment>
      </Cpu>
    </Plc>
  </HardwareConfiguration>

  <GlobalProperties>
    <Author>PLCAutoPilot AI Generator</Author>
    <Comment>${requirements.rawLogic}</Comment>
    <GenerationDate>${new Date().toISOString()}</GenerationDate>
  </GlobalProperties>
</ProjectDescriptor>`;
}

function generateRungs(requirements: any): string {
  const { numLights, delaySeconds } = requirements;
  let rungs = '';

  // Rung 1: Start/Stop Control
  rungs += `
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>START button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M0</InstructionLine>
                <Comment>Seal-in</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>STOP button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Sequence running flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>Start/Stop Control</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>`;

  // Rung 2: First Light
  rungs += `
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Sequence running</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Light 1 ON</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Light 1 - Immediate</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>`;

  // Rungs 3+: Timers and Lights
  for (let i = 1; i < numLights; i++) {
    const timerIdx = i - 1;
    const lightIdx = i;
    const inputCond = timerIdx === 0 ? '%M0' : `%TM${timerIdx - 1}.Q`;

    rungs += `
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM${timerIdx}</InstructionLine>
                <Comment>Timer ${timerIdx + 1} block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    ${inputCond}</InstructionLine>
                <Comment>Load condition</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OUT_BLK</InstructionLine>
                <Comment>Timer output</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    Q</InstructionLine>
                <Comment>Load Q output</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.${lightIdx}</InstructionLine>
                <Comment>Light ${lightIdx + 1} ON</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung ${i + 2}</Name>
            <MainComment>Timer ${timerIdx + 1} + Light ${lightIdx + 1}</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>`;
  }

  return rungs;
}

function generateTimers(requirements: any): string {
  const { numLights, delaySeconds } = requirements;
  let timers = '';

  for (let i = 0; i < numLights - 1; i++) {
    timers += `
      <Timer>
        <Address>%TM${i}</Address>
        <Index>${i}</Index>
        <Symbol>TIMER_${i + 1}</Symbol>
        <Comment>${delaySeconds} second timer for Light ${i + 2}</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>${delaySeconds}</Preset>
      </Timer>`;
  }

  return timers;
}
