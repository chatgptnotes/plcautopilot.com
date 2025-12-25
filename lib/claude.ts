import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude AI
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Claude model to use
// Using Claude 3 Haiku (fastest, most basic tier - should work with credit grants)
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-haiku-20240307';

// PLC Program Generation System Prompt
const PLC_SYSTEM_PROMPT = `You are an expert PLC programmer specializing in industrial automation.
You generate production-ready PLC programs following IEC 61131-3 standards.

IMPORTANT RULES:
1. Generate ONLY the program code in the requested JSON format, no explanations
2. Use proper I/O addressing for the specified PLC model
3. Include safety interlocks and emergency stop logic
4. Add meaningful comments for each rung/network
5. Follow the specific syntax for the target PLC platform
6. Include proper timer and counter configurations
7. Implement seal-in circuits for latching operations
8. Add overload protection where applicable

For Schneider M221 PLCs:
- Use %I0.x for digital inputs
- Use %Q0.x for digital outputs
- Use %M0-1023 for memory bits
- Use %TM0-254 for timers (TON, TOF, TP)
- Use %C0-254 for counters`;

export interface PLCGenerationRequest {
  description: string;
  plcModel: string;
  manufacturer: string;
  series?: string;
  inputs?: string[];
  outputs?: string[];
  timers?: number;
  counters?: number;
}

export interface PLCGenerationResponse {
  code: string;
  ioTable: {
    inputs: Array<{ address: string; symbol: string; description: string }>;
    outputs: Array<{ address: string; symbol: string; description: string }>;
    memory: Array<{ address: string; symbol: string; description: string }>;
    timers?: Array<{ address: string; symbol: string; preset: string; description: string }>;
  };
  ladder?: string;
  il?: string;
  explanation?: string;
}

// Generate PLC program using Claude AI
export async function generatePLCProgram(request: PLCGenerationRequest): Promise<PLCGenerationResponse> {
  const prompt = buildPrompt(request);

  try {
    console.log('Using Claude model:', CLAUDE_MODEL);
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system: PLC_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    return parseClaudeResponse(text, request);
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('Failed to generate PLC program with AI');
  }
}

function buildPrompt(request: PLCGenerationRequest): string {
  return `TARGET PLC:
- Manufacturer: ${request.manufacturer}
- Model: ${request.plcModel}
- Series: ${request.series || 'Standard'}

USER REQUIREMENTS:
${request.description}

Generate a complete PLC program with:
1. I/O Assignment Table (JSON format)
2. Ladder Logic rungs (with IL instructions)
3. Timer/Counter configurations if needed

Respond in this JSON format ONLY (no markdown, no explanation):
{
  "ioTable": {
    "inputs": [{"address": "%I0.0", "symbol": "START_BTN", "description": "Start button"}],
    "outputs": [{"address": "%Q0.0", "symbol": "MOTOR", "description": "Motor output"}],
    "memory": [{"address": "%M0", "symbol": "RUN_FLAG", "description": "Running flag"}],
    "timers": [{"address": "%TM0", "symbol": "DELAY_TMR", "preset": "3s", "description": "Delay timer"}]
  },
  "ladder": "Ladder logic description for each rung",
  "il": "IL instruction code",
  "code": "Complete program code in target format"
}`;
}

function parseClaudeResponse(text: string, request: PLCGenerationRequest): PLCGenerationResponse {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        code: parsed.code || generateFallbackCode(request, parsed),
        ioTable: parsed.ioTable || { inputs: [], outputs: [], memory: [] },
        ladder: parsed.ladder,
        il: parsed.il,
        explanation: parsed.explanation
      };
    }
  } catch {
    // If JSON parsing fails, use the raw text
  }

  // Fallback: return the raw text as code
  return {
    code: text,
    ioTable: { inputs: [], outputs: [], memory: [] },
    explanation: 'AI-generated program'
  };
}

function generateFallbackCode(request: PLCGenerationRequest, parsed: Partial<PLCGenerationResponse>): string {
  const { ioTable } = parsed;

  if (request.manufacturer.toLowerCase().includes('schneider')) {
    return generateSchneiderFallback(request, ioTable);
  }

  return generateGenericFallback(request, ioTable);
}

function generateSchneiderFallback(
  request: PLCGenerationRequest,
  ioTable?: PLCGenerationResponse['ioTable']
): string {
  const inputs = ioTable?.inputs || [];
  const outputs = ioTable?.outputs || [];

  return `(* Schneider M221 Program *)
(* Generated by PLCAutoPilot AI *)
(* ${request.description} *)

PROGRAM Main
VAR
  (* Inputs *)
${inputs.map(i => `  ${i.symbol} AT ${i.address} : BOOL; (* ${i.description} *)`).join('\n')}

  (* Outputs *)
${outputs.map(o => `  ${o.symbol} AT ${o.address} : BOOL; (* ${o.description} *)`).join('\n')}
END_VAR

(* Main Logic *)
${outputs.map(o => `${o.symbol} := FALSE; (* Initialize *)`).join('\n')}

END_PROGRAM`;
}

function generateGenericFallback(
  request: PLCGenerationRequest,
  ioTable?: PLCGenerationResponse['ioTable']
): string {
  const inputs = ioTable?.inputs || [];
  const outputs = ioTable?.outputs || [];

  return `(* IEC 61131-3 Structured Text *)
(* Generated by PLCAutoPilot AI *)
(* ${request.description} *)

PROGRAM Main
VAR
${inputs.map(i => `  ${i.symbol} : BOOL; (* ${i.description} *)`).join('\n')}
${outputs.map(o => `  ${o.symbol} : BOOL; (* ${o.description} *)`).join('\n')}
END_VAR

(* Main Logic *)

END_PROGRAM`;
}

// Generate M221 .smbp XML content with AI assistance
export async function generateM221Program(description: string, plcModel: string): Promise<string> {
  console.log('Using Claude model:', CLAUDE_MODEL);

  const prompt = `You are a Schneider Electric M221 PLC programming expert.
Generate a complete ladder logic program for the ${plcModel} PLC.

USER REQUIREMENT:
${description}

Generate the I/O assignment and ladder logic rungs in this exact JSON format (no markdown, no explanation, ONLY JSON):
{
  "projectName": "ProjectName",
  "inputs": [
    {"address": "%I0.0", "symbol": "START_BTN", "comment": "Start Button NO"},
    {"address": "%I0.1", "symbol": "STOP_BTN", "comment": "Stop Button NC"}
  ],
  "outputs": [
    {"address": "%Q0.0", "symbol": "MOTOR", "comment": "Motor Output"}
  ],
  "memory": [
    {"address": "%M0", "symbol": "RUN_FLAG", "comment": "Running Flag"}
  ],
  "timers": [
    {"address": "%TM0", "symbol": "TIMER1", "type": "TON", "preset": 3, "timebase": "1s", "comment": "3 Second Timer"}
  ],
  "rungs": [
    {
      "name": "Motor Start/Stop",
      "comment": "Seal-in circuit for motor control",
      "il": ["LD %I0.0", "OR %M0", "ANDN %I0.1", "ST %M0"],
      "ladder": "START_BTN OR RUN_FLAG AND NOT STOP_BTN -> RUN_FLAG"
    }
  ]
}

PLC Model ${plcModel} specifications:
- Use %I0.x for digital inputs
- Use %Q0.x for digital outputs
- Use %M0-1023 for memory bits
- Use %TM0-254 for timers (TON, TOF, TP)
Use proper IEC addressing. Include safety logic.`;

  try {
    console.log('Calling Claude API with model:', CLAUDE_MODEL);
    console.log('API Key configured:', !!process.env.ANTHROPIC_API_KEY);

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system: PLC_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    console.log('Claude API response received');
    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('Successfully extracted JSON from Claude response');
      return jsonMatch[0];
    }

    console.log('No JSON found in response, returning raw text');
    return text;
  } catch (error: any) {
    console.error('Claude M221 Generation Error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      error: error.error,
      apiKeySet: !!process.env.ANTHROPIC_API_KEY,
      modelUsed: CLAUDE_MODEL
    });
    throw new Error(`Claude API Error: ${error.message || error.type || 'Unknown error'}`);
  }
}

// Analyze control diagram image with Claude Vision
export async function analyzeControlDiagram(imageBase64: string): Promise<{
  description: string;
  components: string[];
  connections: string[];
}> {
  const prompt = `Analyze this control system diagram and identify:
1. All input devices (buttons, switches, sensors)
2. All output devices (motors, lights, valves)
3. Control logic flow
4. Any timers or counters needed

Respond in JSON format ONLY:
{
  "description": "Overall system description",
  "components": ["list of components"],
  "connections": ["list of I/O connections"]
}`;

  try {
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ]
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      description: text,
      components: [],
      connections: []
    };
  } catch (error) {
    console.error('Vision API Error:', error);
    throw new Error('Failed to analyze diagram');
  }
}
