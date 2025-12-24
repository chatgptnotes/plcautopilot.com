import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const SYSTEM_PROMPTS = {
  generate: `You are an expert PLC programmer specializing in industrial automation.
Generate production-ready IEC 61131-3 compliant PLC code based on user requirements.

Rules:
1. Use proper variable declarations with appropriate data types
2. Include safety interlocks and emergency stop logic
3. Add meaningful comments explaining each section
4. Follow best practices for industrial control systems
5. Include timer and counter configurations when needed
6. Implement seal-in circuits for latching operations

Output the code in Structured Text (ST) format unless specifically asked for Ladder Logic.`,

  explain: `You are an expert PLC code analyst.
Analyze and explain PLC code in a clear, educational manner.

Provide:
1. A brief overview of what the code does
2. Variable declarations explanation
3. Logic flow description with a simple text diagram
4. Key control strategies used
5. Safety considerations
6. Potential improvements or issues`,

  test: `You are a PLC testing specialist.
Generate comprehensive test cases for PLC programs.

For each test case, provide:
1. Test case name and ID
2. Pre-conditions
3. Test steps
4. Expected results
5. Pass/Fail criteria

Also include:
- Edge case scenarios
- Safety-critical test cases
- Timing-related tests
- Failure mode tests`
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, mode, images } = body;

    if (!prompt && (!images || images.length === 0)) {
      return NextResponse.json(
        { error: 'Prompt or images required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.generate;

    // Build message content
    const messageContent: Anthropic.MessageParam['content'] = [];

    // Add images if present
    if (images && images.length > 0) {
      for (const image of images) {
        if (image.base64) {
          messageContent.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: image.mimeType || 'image/jpeg',
              data: image.base64
            }
          });
        }
      }
    }

    // Add text prompt
    messageContent.push({
      type: 'text',
      text: prompt || 'Please analyze the uploaded image(s) and generate appropriate PLC code.'
    });

    console.log('AI Co-Pilot request:', { mode, hasImages: images?.length > 0 });

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: messageContent
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      success: true,
      response: responseText,
      mode,
      model: CLAUDE_MODEL
    });

  } catch (error) {
    console.error('AI Co-Pilot Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
