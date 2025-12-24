import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * API Route: AI Co-Pilot Chat
 * Real-time PLC programming assistance using Claude AI
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert PLC (Programmable Logic Controller) programming assistant specializing in industrial automation. You have deep expertise in:

- IEC 61131-3 programming languages (Ladder Logic, Structured Text, Function Block, Sequential Function Chart)
- Major PLC platforms: Schneider Electric (M221, M241, M251, M258), Siemens (S7-1200, S7-1500), Rockwell/Allen-Bradley, Mitsubishi
- Industrial control systems, sensors, actuators, and field devices
- Safety standards (IEC 61508, ISO 13849)
- HMI/SCADA integration
- Industrial networking (Modbus, Profibus, EtherNet/IP)

Your role:
1. GENERATE CODE: Create production-ready PLC programs in Ladder Logic or Structured Text
2. EXPLAIN CODE: Provide detailed explanations of PLC logic and control sequences
3. TEST & DEBUG: Generate comprehensive test cases and identify potential issues
4. OPTIMIZE: Suggest improvements for performance, safety, and maintainability

Output Format Guidelines:
- For code generation: Return complete, syntactically correct programs with comments
- For explanations: Use clear structure with diagrams, variable lists, and logic flow
- For testing: Provide numbered test cases with expected results
- Always include I/O assignments, variable declarations, and safety considerations

Be precise, professional, and safety-conscious in all responses.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, mode = 'generate', uploadedImages = [] } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Build message content with images if provided
    const lastMessage = messages[messages.length - 1];
    const messageContent: any[] = [];

    // Add images if present
    if (uploadedImages && uploadedImages.length > 0) {
      for (const img of uploadedImages) {
        messageContent.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: img.mediaType || 'image/jpeg',
            data: img.data,
          },
        });
      }
    }

    // Add text prompt
    messageContent.push({
      type: 'text',
      text: lastMessage.content,
    });

    // Customize system prompt based on mode
    let modeSpecificPrompt = SYSTEM_PROMPT;

    if (mode === 'explain') {
      modeSpecificPrompt += '\n\nFOCUS: Provide detailed explanations of PLC code. Include flow diagrams, variable descriptions, and logic analysis.';
    } else if (mode === 'test') {
      modeSpecificPrompt += '\n\nFOCUS: Generate comprehensive test cases. Include normal operation, edge cases, error conditions, and safety scenarios.';
    } else {
      modeSpecificPrompt += '\n\nFOCUS: Generate production-ready PLC code. Include complete programs with proper structure, comments, and documentation.';
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: modeSpecificPrompt,
      messages: [
        {
          role: 'user',
          content: messageContent,
        },
      ],
    });

    const assistantMessage = response.content[0].text;

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });

  } catch (error: any) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      {
        error: error.message || 'AI chat failed',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
