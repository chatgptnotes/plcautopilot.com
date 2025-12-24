import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * API Route: AI Code Optimizer
 * Analyzes and optimizes existing PLC code
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert PLC code optimization specialist. Analyze PLC programs and provide comprehensive optimization recommendations.

Your analysis should cover:

1. PERFORMANCE OPTIMIZATION
   - Scan time reduction
   - Memory usage optimization
   - Execution efficiency
   - Network communication optimization

2. CODE QUALITY
   - Naming conventions
   - Code structure and organization
   - Maintainability improvements
   - Documentation quality

3. SAFETY & RELIABILITY
   - Safety interlocks verification
   - Fault handling
   - Edge case coverage
   - Fail-safe mechanisms

4. BEST PRACTICES
   - IEC 61131-3 compliance
   - Industry standards adherence
   - Reusability opportunities
   - Modularity improvements

5. MODERNIZATION
   - Legacy code patterns
   - Outdated instructions
   - Modern alternatives
   - Platform-specific optimizations

Output Format (JSON):
{
  "analysis_summary": {
    "overall_quality": "Excellent|Good|Fair|Poor",
    "scan_time_estimate": "5ms (estimated)",
    "complexity_score": 7.5,
    "maintainability_score": 8.0,
    "safety_score": 9.0
  },
  "issues_found": [
    {
      "severity": "Critical|High|Medium|Low",
      "category": "Performance|Safety|Quality|Standards",
      "location": "Rung 5, Line 23",
      "issue": "Description of the issue",
      "impact": "Potential impact on system",
      "recommendation": "Specific fix"
    }
  ],
  "optimizations": [
    {
      "type": "Performance|Refactoring|Safety|Modernization",
      "description": "What to optimize",
      "before_code": "Current code snippet",
      "after_code": "Optimized code snippet",
      "benefit": "Expected improvement",
      "effort": "Low|Medium|High"
    }
  ],
  "refactored_code": "Complete optimized program",
  "summary": "Executive summary of improvements"
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      code,
      platform = 'schneider',
      optimizationGoals = ['performance', 'safety', 'maintainability'],
      currentIssues = ''
    } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'PLC code required for analysis' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Build analysis prompt
    const prompt = `Analyze and optimize this PLC program:

PLATFORM: ${platform}

OPTIMIZATION GOALS:
${optimizationGoals.map((goal: string) => `- ${goal}`).join('\n')}

${currentIssues ? `KNOWN ISSUES:\n${currentIssues}\n` : ''}

PLC CODE TO ANALYZE:
\`\`\`
${code}
\`\`\`

Provide:
1. Comprehensive analysis of code quality, performance, and safety
2. Specific issues found with severity ratings
3. Detailed optimization recommendations with before/after code examples
4. Complete refactored code incorporating all improvements
5. Summary of expected benefits

Output as JSON following the specified format.`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 8192,
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
    let analysisData;
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

      analysisData = JSON.parse(cleaned.trim());
    } catch (parseError) {
      analysisData = {
        raw_response: assistantMessage,
        parse_error: 'Could not parse as JSON',
      };
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
      raw_output: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });

  } catch (error: any) {
    console.error('Code optimization error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Code optimization failed',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
