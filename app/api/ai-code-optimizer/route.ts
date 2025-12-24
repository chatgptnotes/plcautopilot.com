import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const SYSTEM_PROMPT = `You are an expert PLC code optimizer specializing in industrial automation.
Analyze and optimize PLC code for better performance, readability, and maintainability.

When optimizing code, consider:
1. Scan time optimization - reduce unnecessary operations
2. Memory usage optimization - efficient variable usage
3. Code readability - clear structure and naming
4. Safety improvements - add missing interlocks
5. Modernization - update legacy patterns
6. Documentation - add meaningful comments

Provide:
1. Original code analysis with identified issues
2. Optimized code with improvements
3. List of changes made with explanations
4. Performance improvement estimates
5. Safety recommendations`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, optimizationType } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const prompt = `Please optimize the following PLC code.
Optimization focus: ${optimizationType || 'general'}

Code to optimize:
\`\`\`
${code}
\`\`\`

Provide the optimized code along with a detailed explanation of improvements made.`;

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
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
    console.error('AI Code Optimizer Error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize code', details: String(error) },
      { status: 500 }
    );
  }
}
