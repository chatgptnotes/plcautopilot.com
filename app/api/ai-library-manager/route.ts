import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const SYSTEM_PROMPT = `You are an expert PLC library architect and manager.
Help users create, organize, and manage reusable PLC code libraries.

Capabilities:
1. Generate reusable function blocks
2. Create standardized library structures
3. Document library components
4. Suggest improvements to existing libraries
5. Convert code to library format
6. Generate test cases for library components

When creating libraries:
- Follow IEC 61131-3 standards
- Include comprehensive documentation
- Add version information
- Create test scaffolding
- Define clear interfaces`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, code, libraryName, description } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    let prompt = '';

    switch (action) {
      case 'create':
        prompt = `Create a reusable PLC library component:
Library Name: ${libraryName || 'CustomLibrary'}
Description: ${description}

Generate:
1. Function block definition
2. Interface documentation
3. Usage examples
4. Test cases`;
        break;

      case 'convert':
        prompt = `Convert the following code into a reusable library component:

\`\`\`
${code}
\`\`\`

Provide:
1. Refactored function block
2. Input/Output interface
3. Documentation
4. Usage example`;
        break;

      case 'document':
        prompt = `Generate comprehensive documentation for this library code:

\`\`\`
${code}
\`\`\`

Include:
1. Overview and purpose
2. Interface description
3. Usage examples
4. Error handling
5. Version history template`;
        break;

      case 'suggest':
        prompt = `Analyze this code and suggest library components that could be extracted:

\`\`\`
${code}
\`\`\`

Identify:
1. Reusable patterns
2. Common functionality
3. Suggested function blocks
4. Improvement recommendations`;
        break;

      default:
        prompt = description || 'Help me manage my PLC libraries';
    }

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
      action,
      model: CLAUDE_MODEL
    });

  } catch (error) {
    console.error('AI Library Manager Error:', error);
    return NextResponse.json(
      { error: 'Failed to process library request', details: String(error) },
      { status: 500 }
    );
  }
}
