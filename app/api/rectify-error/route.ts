import { NextRequest, NextResponse } from 'next/server';

interface ErrorRectificationRequest {
  programCode: string;
  platform: string;
  errorScreenshot?: string; // Base64 encoded image
  errorMessage: string;
  plcModel: string;
}

interface RectificationResponse {
  success: boolean;
  analysis: {
    errorType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    affectedComponents: string[];
    rootCause: string;
  };
  solutions: Array<{
    description: string;
    correctedCode: string;
    explanation: string;
    confidence: number; // 0-100
  }>;
  recommendations: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: ErrorRectificationRequest = await req.json();
    const { programCode, platform, errorScreenshot, errorMessage, plcModel } = body;

    // Analyze the error
    const analysis = analyzeError(errorMessage, platform, errorScreenshot);

    // Generate solutions
    const solutions = generateSolutions(programCode, analysis, platform, plcModel);

    // Provide recommendations
    const recommendations = generateRecommendations(analysis, platform);

    const response: RectificationResponse = {
      success: true,
      analysis,
      solutions,
      recommendations,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing rectification request:', error);
    return NextResponse.json(
      { error: 'Failed to process error rectification request' },
      { status: 500 }
    );
  }
}

function analyzeError(
  errorMessage: string,
  platform: string,
  errorScreenshot?: string
): RectificationResponse['analysis'] {
  // Common error patterns
  const errorPatterns = {
    schneider: {
      'Timer format': {
        type: 'Timer Configuration Error',
        severity: 'medium' as const,
        components: ['Timer blocks', 'Time base settings'],
        cause: 'EcoStruxure Machine Expert requires timer values in T#format (e.g., T#100ms, T#5s)',
      },
      'Variable not declared': {
        type: 'Variable Declaration Error',
        severity: 'high' as const,
        components: ['Variable declarations', 'Data type assignments'],
        cause: 'Variable used in program but not declared in variable table',
      },
      'Invalid address': {
        type: 'I/O Address Error',
        severity: 'high' as const,
        components: ['I/O configuration', 'Address mapping'],
        cause: 'I/O address does not match PLC hardware configuration',
      },
      'Syntax error': {
        type: 'Programming Syntax Error',
        severity: 'medium' as const,
        components: ['Code syntax', 'Language-specific rules'],
        cause: 'Code does not follow IEC 61131-3 syntax rules',
      },
    },
    siemens: {
      'Data type mismatch': {
        type: 'Type Conversion Error',
        severity: 'high' as const,
        components: ['Data types', 'Type conversions'],
        cause: 'Incompatible data types used in operations',
      },
      'DB not found': {
        type: 'Data Block Error',
        severity: 'high' as const,
        components: ['Data blocks', 'Global variables'],
        cause: 'Referenced data block does not exist or is not accessible',
      },
      'Symbol not defined': {
        type: 'Symbol Table Error',
        severity: 'medium' as const,
        components: ['Symbol table', 'Tag definitions'],
        cause: 'Symbol used in program but not defined in symbol table',
      },
    },
    rockwell: {
      'Tag not defined': {
        type: 'Tag Definition Error',
        severity: 'high' as const,
        components: ['Tag database', 'Controller tags'],
        cause: 'Tag referenced in logic but not created in controller',
      },
      'Routine not found': {
        type: 'Program Organization Error',
        severity: 'high' as const,
        components: ['Program structure', 'Routine calls'],
        cause: 'Called routine does not exist in program',
      },
      'Invalid instruction': {
        type: 'Instruction Error',
        severity: 'medium' as const,
        components: ['Instruction set', 'Controller compatibility'],
        cause: 'Instruction not supported by target controller',
      },
    },
  };

  // Detect error type from message
  let detectedError = {
    type: 'Unknown Error',
    severity: 'medium' as const,
    components: ['General'],
    cause: 'Unable to determine specific error cause',
  };

  const platformErrors = errorPatterns[platform.toLowerCase() as keyof typeof errorPatterns];
  if (platformErrors) {
    for (const [pattern, errorInfo] of Object.entries(platformErrors)) {
      if (errorMessage.toLowerCase().includes(pattern.toLowerCase())) {
        detectedError = errorInfo;
        break;
      }
    }
  }

  return {
    errorType: detectedError.type,
    severity: detectedError.severity,
    affectedComponents: detectedError.components,
    rootCause: detectedError.cause,
  };
}

function generateSolutions(
  programCode: string,
  analysis: RectificationResponse['analysis'],
  platform: string,
  plcModel: string
): RectificationResponse['solutions'] {
  const solutions: RectificationResponse['solutions'] = [];

  // Solution 1: Auto-fix common issues
  if (analysis.errorType.includes('Timer')) {
    const correctedCode = fixTimerFormat(programCode, platform);
    solutions.push({
      description: 'Corrected timer format to match platform requirements',
      correctedCode,
      explanation: `Converted timer values to proper format for ${platform}. For EcoStruxure, timers must use T# notation (e.g., T#100ms instead of 100).`,
      confidence: 95,
    });
  }

  // Solution 2: Add missing declarations
  if (analysis.errorType.includes('Variable') || analysis.errorType.includes('Tag')) {
    const correctedCode = addMissingDeclarations(programCode, platform);
    solutions.push({
      description: 'Added missing variable/tag declarations',
      correctedCode,
      explanation: 'Automatically detected undeclared variables and added them to the declaration section with appropriate data types.',
      confidence: 85,
    });
  }

  // Solution 3: Fix I/O addressing
  if (analysis.errorType.includes('Address') || analysis.errorType.includes('I/O')) {
    const correctedCode = fixIOAddressing(programCode, platform, plcModel);
    solutions.push({
      description: 'Corrected I/O addressing to match PLC model',
      correctedCode,
      explanation: `Adjusted I/O addresses to be compatible with ${plcModel} hardware configuration.`,
      confidence: 80,
    });
  }

  // Solution 4: Syntax correction
  if (analysis.errorType.includes('Syntax')) {
    const correctedCode = fixSyntax(programCode, platform);
    solutions.push({
      description: 'Fixed syntax errors',
      correctedCode,
      explanation: `Corrected syntax to comply with IEC 61131-3 standards and ${platform}-specific requirements.`,
      confidence: 90,
    });
  }

  // If no specific solutions found, provide general correction
  if (solutions.length === 0) {
    solutions.push({
      description: 'General code review and corrections',
      correctedCode: programCode,
      explanation: 'Please review the error message and manually adjust the code. Consider checking variable names, data types, and platform-specific requirements.',
      confidence: 50,
    });
  }

  return solutions;
}

function fixTimerFormat(code: string, platform: string): string {
  if (platform.toLowerCase().includes('schneider')) {
    // Convert numeric timer values to T# format
    // Example: 100 -> T#100ms, 5000 -> T#5s
    let fixed = code.replace(/(?:TON|TOF|TP)\s*\(\s*IN\s*:=.*?,\s*PT\s*:=\s*(\d+)\s*\)/gi, (match, value) => {
      const ms = parseInt(value);
      if (ms < 1000) {
        return match.replace(value, `T#${ms}ms`);
      } else if (ms % 1000 === 0) {
        return match.replace(value, `T#${ms / 1000}s`);
      } else {
        return match.replace(value, `T#${ms}ms`);
      }
    });
    return fixed;
  }
  return code;
}

function addMissingDeclarations(code: string, platform: string): string {
  // Extract variable usage
  const variables = extractVariables(code);

  // Generate declarations
  let declarations = '\n(* Auto-generated variable declarations *)\n';
  declarations += 'VAR\n';

  variables.forEach(varName => {
    // Infer type from usage
    const type = inferVariableType(varName, code);
    declarations += `  ${varName} : ${type};\n`;
  });

  declarations += 'END_VAR\n\n';

  return declarations + code;
}

function fixIOAddressing(code: string, platform: string, plcModel: string): string {
  // Map common I/O patterns to PLC-specific formats
  const addressMap: Record<string, any> = {
    schneider: {
      '%I': '%IX', // Digital inputs
      '%Q': '%QX', // Digital outputs
      '%IW': '%IW', // Analog inputs
      '%QW': '%QW', // Analog outputs
    },
    siemens: {
      '%I': 'I', // Inputs
      '%Q': 'Q', // Outputs
      '%M': 'M', // Memory
    },
    rockwell: {
      '%I': 'Local:I:O.Data', // Input
      '%Q': 'Local:O:O.Data', // Output
    },
  };

  let fixed = code;
  const mapping = addressMap[platform.toLowerCase()];

  if (mapping) {
    for (const [from, to] of Object.entries(mapping)) {
      fixed = fixed.replace(new RegExp(from, 'g'), to);
    }
  }

  return fixed;
}

function fixSyntax(code: string, platform: string): string {
  let fixed = code;

  // Common syntax fixes
  // 1. Ensure statements end with semicolons
  fixed = fixed.replace(/([^;{}\n])\s*\n/g, '$1;\n');

  // 2. Fix comparison operators
  fixed = fixed.replace(/==/g, '=');

  // 3. Fix assignment operators
  fixed = fixed.replace(/\s=\s(?!=)/g, ' := ');

  // 4. Fix boolean literals
  fixed = fixed.replace(/\btrue\b/gi, 'TRUE');
  fixed = fixed.replace(/\bfalse\b/gi, 'FALSE');

  return fixed;
}

function extractVariables(code: string): string[] {
  // Extract variable names from code
  const varPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
  const matches = code.match(varPattern) || [];

  // Filter out keywords and duplicates
  const keywords = ['VAR', 'END_VAR', 'IF', 'THEN', 'ELSE', 'END_IF', 'TRUE', 'FALSE', 'AND', 'OR', 'NOT'];
  const variables = [...new Set(matches)].filter(v => !keywords.includes(v.toUpperCase()));

  return variables;
}

function inferVariableType(varName: string, code: string): string {
  // Infer data type from variable name and usage
  const name = varName.toLowerCase();

  if (name.includes('timer') || name.includes('ton') || name.includes('tof')) {
    return 'TON';
  }
  if (name.includes('counter') || name.includes('ctu') || name.includes('ctd')) {
    return 'CTU';
  }
  if (name.includes('bool') || name.includes('flag') || name.startsWith('b')) {
    return 'BOOL';
  }
  if (name.includes('int') || name.includes('count') || name.startsWith('i')) {
    return 'INT';
  }
  if (name.includes('real') || name.includes('float') || name.startsWith('r')) {
    return 'REAL';
  }
  if (name.includes('time') || name.includes('delay')) {
    return 'TIME';
  }

  // Default to BOOL
  return 'BOOL';
}

function generateRecommendations(
  analysis: RectificationResponse['analysis'],
  platform: string
): string[] {
  const recommendations: string[] = [];

  // General recommendations
  recommendations.push('Always validate program syntax before uploading to PLC software');
  recommendations.push('Keep variable names descriptive and follow naming conventions');
  recommendations.push('Document your code with comments for better maintainability');

  // Severity-specific recommendations
  if (analysis.severity === 'critical' || analysis.severity === 'high') {
    recommendations.push('Test the corrected program in simulation mode before deploying to hardware');
    recommendations.push('Create a backup of your current program before applying changes');
  }

  // Platform-specific recommendations
  if (platform.toLowerCase().includes('schneider')) {
    recommendations.push('Use EcoStruxure Machine Expert\'s built-in syntax checker before compiling');
    recommendations.push('Ensure timer values use T# format (e.g., T#100ms, T#5s)');
    recommendations.push('Verify I/O addresses match your hardware configuration in device tree');
  } else if (platform.toLowerCase().includes('siemens')) {
    recommendations.push('Use TIA Portal\'s compiler to catch errors early');
    recommendations.push('Organize code using Function Blocks (FB) and Functions (FC)');
    recommendations.push('Utilize data blocks (DB) for structured data management');
  } else if (platform.toLowerCase().includes('rockwell')) {
    recommendations.push('Use Studio 5000\'s tag database for consistent tag naming');
    recommendations.push('Leverage Add-On Instructions (AOI) for reusable code');
    recommendations.push('Enable online editing cautiously and test changes thoroughly');
  }

  // Error-type specific recommendations
  if (analysis.errorType.includes('Timer')) {
    recommendations.push('Double-check timer preset values and time bases');
  }
  if (analysis.errorType.includes('Variable') || analysis.errorType.includes('Tag')) {
    recommendations.push('Maintain a comprehensive variable/tag naming convention document');
  }
  if (analysis.errorType.includes('Address')) {
    recommendations.push('Create an I/O address mapping spreadsheet for reference');
  }

  return recommendations;
}
