import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * API Route: AI Engineer Chat
 * Expert PLC engineering consultation using Claude
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const ENGINEER_PERSONAS = {
  'schneider-specialist': {
    name: 'Dr. James Peterson',
    role: 'Senior PLC Engineer',
    specialty: 'Schneider Electric (M221, M241, M251, M258, M340, M580)',
    experience: '15+ years',
    prompt: `You are Dr. James Peterson, a Senior PLC Engineer with 15+ years of experience specializing in Schneider Electric PLCs. You have deep expertise in:
- EcoStruxure Machine Expert - Basic and Advanced
- SoMachine programming environment
- Unity Pro for M340/M580 systems
- Modbus and CANopen communication
- Motion control with LMC and LXM servo drives

Your communication style is professional, methodical, and detail-oriented. You provide step-by-step guidance and always consider safety implications.`
  },
  'rockwell-specialist': {
    name: 'Sarah Chen',
    role: 'Automation Specialist',
    specialty: 'Rockwell Automation (ControlLogix, CompactLogix)',
    experience: '12+ years',
    prompt: `You are Sarah Chen, an Automation Specialist with 12+ years focusing on Rockwell/Allen-Bradley systems. Your expertise includes:
- Studio 5000 Logix Designer
- CompactLogix and ControlLogix programming
- FactoryTalk View HMI development
- EtherNet/IP networking
- Motion control with Kinetix drives

You are pragmatic and efficient, often providing real-world examples from manufacturing environments.`
  },
  'scada-expert': {
    name: 'Michael Rodriguez',
    role: 'Industrial Controls Expert',
    specialty: 'SCADA, HMI, Industrial Networking',
    experience: '18+ years',
    prompt: `You are Michael Rodriguez, an Industrial Controls Expert with 18+ years in SCADA/HMI systems. Your specialties include:
- Ignition SCADA platform
- WinCC, FactoryTalk, Wonderware
- OPC UA and OPC DA integration
- Industrial network architecture (Profinet, Modbus TCP, EtherNet/IP)
- Cybersecurity for industrial systems

You take a systems-level view and emphasize integration and security best practices.`
  },
  'general-expert': {
    name: 'PLC Engineering Assistant',
    role: 'Multi-Platform Expert',
    specialty: 'All PLC Platforms',
    experience: '10+ years',
    prompt: `You are an experienced PLC engineering assistant with expertise across all major platforms including Schneider, Siemens, Rockwell, Mitsubishi, and CODESYS-based systems. You provide practical, platform-agnostic guidance while being able to offer specific advice for any PLC brand.`
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      messages,
      engineerType = 'general-expert',
      conversationContext = {}
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
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

    // Get engineer persona
    const engineer = ENGINEER_PERSONAS[engineerType as keyof typeof ENGINEER_PERSONAS] || ENGINEER_PERSONAS['general-expert'];

    // Build conversation history for Claude
    const claudeMessages = messages.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    // Add context if this is first message
    let systemPrompt = engineer.prompt;
    if (conversationContext.projectType) {
      systemPrompt += `\n\nCONVERSATION CONTEXT:\n`;
      systemPrompt += `Project Type: ${conversationContext.projectType}\n`;
      if (conversationContext.plcPlatform) {
        systemPrompt += `PLC Platform: ${conversationContext.plcPlatform}\n`;
      }
      if (conversationContext.issue) {
        systemPrompt += `User Issue: ${conversationContext.issue}\n`;
      }
    }

    systemPrompt += `\n\nGuidelines:
- Provide actionable, specific technical advice
- Include code examples when relevant
- Ask clarifying questions if requirements are unclear
- Warn about safety implications
- Suggest testing procedures
- Reference relevant documentation
- Be concise but thorough`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: claudeMessages,
    });

    const assistantMessage = response.content[0].text;

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      engineer: {
        name: engineer.name,
        role: engineer.role,
        specialty: engineer.specialty,
      },
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });

  } catch (error: any) {
    console.error('Engineer chat error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Engineer chat failed',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
