import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const SYSTEM_PROMPT = `You are an expert industrial automation application architect.
Generate complete PLC application structures based on requirements.

When generating applications, include:
1. Project structure with multiple POUs (Program Organization Units)
2. Main program with proper initialization
3. Function blocks for reusable components
4. Data types and structures
5. I/O configuration recommendations
6. Safety program structure
7. HMI tag recommendations

Output format:
- Project overview
- File/module structure
- Complete code for each module
- Configuration files
- Documentation`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, plcPlatform, applicationSize } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const prompt = `Generate a complete PLC application for the following requirements:

Application Description: ${description}
Target PLC Platform: ${plcPlatform || 'IEC 61131-3 compatible'}
Application Size: ${applicationSize || 'medium'}

Please provide:
1. Complete project structure
2. All necessary program modules with full code
3. Function blocks for reusable logic
4. Data type definitions
5. I/O mapping recommendations
6. HMI tag list`;

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      success: true,
      response: responseText,
      model: CLAUDE_MODEL
    });

  } catch (error) {
    console.error('AI Application Generator Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate application', details: String(error) },
      { status: 500 }
    );
  }
}
