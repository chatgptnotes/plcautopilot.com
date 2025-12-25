import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * API Route: AI Application Generator
 * Generates complete PLC applications from requirements
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert PLC application architect. Generate complete, production-ready PLC applications based on user requirements.

Your output must include:
1. Complete ladder logic or structured text program
2. I/O assignment table with addresses and descriptions
3. Variable declarations with data types and initial values
4. Program structure (main program + function blocks if needed)
5. Safety interlocks and emergency stop logic
6. Comments and documentation
7. Wiring recommendations
8. Testing procedure

Output Format (JSON):
{
  "application_name": "Descriptive name",
  "platform": "schneider|rockwell|siemens|mitsubishi",
  "controller": "Specific controller model",
  "program_code": "Complete PLC program with full syntax",
  "io_assignments": [
    {
      "address": "%I0.0",
      "type": "INPUT",
      "device": "Start button",
      "wiring": "NO contact, 24VDC"
    }
  ],
  "variables": [
    {
      "name": "MOTOR_RUN",
      "address": "%M0",
      "type": "BOOL",
      "initial_value": "FALSE",
      "description": "Motor running status"
    }
  ],
  "function_blocks": [
    {
      "name": "FB_MotorControl",
      "purpose": "Motor start/stop with safety",
      "code": "Function block code"
    }
  ],
  "safety_features": [
    "Emergency stop circuit",
    "Overload protection",
    "Safety interlocks"
  ],
  "testing_procedure": [
    "Step 1: Verify all inputs at rest position",
    "Step 2: Test emergency stop",
    "Step 3: Normal operation sequence"
  ],
  "documentation": "Complete application documentation"
}

Requirements:
- Generate IEC 61131-3 compliant code
- Include comprehensive safety features
- Provide detailed I/O assignments
- Use industry-standard naming conventions
- Add extensive comments
- Consider real-world operational scenarios`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      requirements,
      applicationType,
      platform = 'schneider',
      controller,
      ioCount,
      safetyLevel = 'standard'
    } = body;

    if (!requirements) {
      return NextResponse.json(
        { error: 'Application requirements required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Build detailed prompt
    const prompt = `Generate a complete PLC application with these specifications:

APPLICATION REQUIREMENTS:
${requirements}

TECHNICAL SPECIFICATIONS:
- Application Type: ${applicationType || 'Industrial Control'}
- Target Platform: ${platform}
- Controller Model: ${controller || 'Auto-select appropriate model'}
- Estimated I/O Count: ${ioCount || 'As needed'}
- Safety Level: ${safetyLevel} (standard/enhanced/SIL2)

DELIVERABLES REQUIRED:
1. Complete program code (Ladder Logic format preferred)
2. Full I/O assignment table
3. Variable declarations
4. Function blocks (if applicable)
5. Safety interlocks
6. Testing procedure
7. Documentation

Output the complete application as a JSON object following the specified format.`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 8192, // Larger for complete applications
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const assistantMessage = response.content[0].text;

    // Try to parse JSON response
    let applicationData;
    try {
      // Remove markdown code blocks if present
      let cleaned = assistantMessage.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.substring(7);
      }
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.substring(3);
      }
      if (cleaned.endsWith('```')) {
        cleaned = cleaned.substring(0, cleaned.length - 3);
      }

      applicationData = JSON.parse(cleaned.trim());
    } catch (parseError) {
      // If JSON parsing fails, return raw response
      applicationData = {
        raw_response: assistantMessage,
        parse_error: 'Could not parse as JSON',
      };
    }

    return NextResponse.json({
      success: true,
      application: applicationData,
      raw_output: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });

  } catch (error: any) {
    console.error('Application generation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });
    return NextResponse.json(
      {
        error: error.message || 'Application generation failed',
        details: error.toString(),
        errorType: error.name,
        apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
        modelConfigured: !!process.env.CLAUDE_MODEL
      },
      { status: 500 }
    );
  }
}
