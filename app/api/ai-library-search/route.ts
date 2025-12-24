import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * API Route: AI Library Manager
 * Intelligent search and recommendation of function blocks and libraries
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert PLC function block library manager. Your role is to help users find, understand, and utilize reusable PLC code components.

You have knowledge of:
- Standard IEC 61131-3 function blocks
- Platform-specific libraries (Schneider, Siemens, Rockwell, Mitsubishi)
- Common industrial automation patterns
- Motion control libraries
- Communication protocol libraries
- PID control implementations
- Safety function blocks
- Custom reusable components

Your capabilities:
1. SEARCH: Find relevant function blocks based on descriptions
2. RECOMMEND: Suggest appropriate libraries for specific applications
3. EXPLAIN: Describe function block usage and parameters
4. GENERATE: Create custom function blocks when needed
5. INTEGRATE: Show how to incorporate libraries into programs

Output Format (JSON):
{
  "search_results": [
    {
      "name": "FB_MotorControl",
      "category": "Motor Control",
      "platform": "Universal|Schneider|Siemens|Rockwell",
      "description": "Detailed description",
      "inputs": [
        {"name": "START", "type": "BOOL", "description": "Start command"}
      ],
      "outputs": [
        {"name": "RUNNING", "type": "BOOL", "description": "Motor running status"}
      ],
      "usage_example": "Code example showing usage",
      "compatibility": ["M221", "M241", "S7-1200"],
      "documentation_link": "Link to docs if available"
    }
  ],
  "recommendations": [
    {
      "reason": "Why this library is recommended",
      "library_name": "Library name",
      "benefits": ["Benefit 1", "Benefit 2"]
    }
  ],
  "integration_guide": "How to integrate selected libraries",
  "custom_blocks": [
    {
      "name": "Custom FB name",
      "code": "Complete function block code",
      "reason": "Why this custom block was created"
    }
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      platform = 'schneider',
      applicationType,
      requirements = [],
      generateCustom = false
    } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Search query required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Build search prompt
    const prompt = `Search for PLC function blocks and libraries:

SEARCH QUERY: ${query}

TARGET PLATFORM: ${platform}
${applicationType ? `APPLICATION TYPE: ${applicationType}` : ''}

${requirements.length > 0 ? `SPECIFIC REQUIREMENTS:\n${requirements.map((req: string) => `- ${req}`).join('\n')}` : ''}

${generateCustom ? 'If standard libraries are insufficient, generate custom function blocks to meet the requirements.' : ''}

Provide:
1. Relevant function blocks from standard libraries
2. Platform-specific libraries that match the query
3. Recommendations based on application type
4. Usage examples with parameter descriptions
5. Integration guidance
${generateCustom ? '6. Custom function block implementations if needed' : ''}

Output as JSON following the specified format.`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 6144,
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
    let libraryData;
    try {
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

      libraryData = JSON.parse(cleaned.trim());
    } catch (parseError) {
      libraryData = {
        raw_response: assistantMessage,
        parse_error: 'Could not parse as JSON',
      };
    }

    return NextResponse.json({
      success: true,
      libraries: libraryData,
      raw_output: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });

  } catch (error: any) {
    console.error('Library search error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Library search failed',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
