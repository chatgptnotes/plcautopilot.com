import { NextRequest, NextResponse } from 'next/server';

interface RecommendationRequest {
  projectDescription: string;
  criteria: 'cheapest' | 'simplest' | 'robust' | 'balanced';
  constraints?: {
    maxBudget?: number;
    timeline?: string;
    safetyLevel?: 'basic' | 'standard' | 'sil1' | 'sil2' | 'sil3';
    environment?: 'indoor' | 'outdoor' | 'harsh';
  };
}

interface Solution {
  name: string;
  platform: string;
  model: string;
  description: string;
  cost: {
    hardware: number;
    software: number;
    installation: number;
    maintenance: number;
    total: number;
  };
  complexity: {
    score: number; // 1-10
    setupTime: string;
    programmingDifficulty: string;
    maintenanceLevel: string;
  };
  robustness: {
    score: number; // 1-10
    reliability: string;
    safetyRating: string;
    environmentalRating: string;
    mtbf: string; // Mean Time Between Failures
  };
  pros: string[];
  cons: string[];
  bestFor: string[];
  specifications: {
    ioPoints: number;
    memoryKb: number;
    scanTime: string;
    communicationProtocols: string[];
    expandability: string;
  };
}

interface RecommendationResponse {
  recommended: Solution;
  alternatives: Solution[];
  comparison: {
    criteria: string;
    reasoning: string;
    tradeoffs: string[];
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: RecommendationRequest = await req.json();
    const { projectDescription, criteria, constraints } = body;

    // Generate solutions based on criteria
    const solutions = generateSolutions(projectDescription, constraints);

    // Rank solutions based on criteria
    const ranked = rankSolutions(solutions, criteria);

    // Build recommendation response
    const response: RecommendationResponse = {
      recommended: ranked[0],
      alternatives: ranked.slice(1, 4),
      comparison: {
        criteria: getCriteriaDescription(criteria),
        reasoning: generateReasoning(ranked[0], criteria),
        tradeoffs: generateTradeoffs(ranked[0], ranked.slice(1)),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendation' },
      { status: 500 }
    );
  }
}

function generateSolutions(
  projectDescription: string,
  constraints?: RecommendationRequest['constraints']
): Solution[] {
  // Solution 1: Schneider TM221C16R (Cheapest)
  const schneiderBudget: Solution = {
    name: 'Schneider Modicon M221 Basic',
    platform: 'Schneider Electric',
    model: 'TM221C16R',
    description: 'Compact PLC ideal for simple automation tasks with basic I/O requirements',
    cost: {
      hardware: 250,
      software: 0, // EcoStruxure Machine Expert Basic is free
      installation: 300,
      maintenance: 50,
      total: 600,
    },
    complexity: {
      score: 3,
      setupTime: '2-4 hours',
      programmingDifficulty: 'Beginner friendly',
      maintenanceLevel: 'Low',
    },
    robustness: {
      score: 6,
      reliability: '99.5%',
      safetyRating: 'Basic (Category 1)',
      environmentalRating: 'IP20 (indoor)',
      mtbf: '250,000 hours',
    },
    pros: [
      'Lowest upfront cost',
      'Free programming software',
      'Easy to learn and program',
      'Quick setup and deployment',
      'Low maintenance requirements',
      'Compact footprint',
    ],
    cons: [
      'Limited I/O expansion',
      'Basic safety features only',
      'Not suitable for harsh environments',
      'Limited communication protocols',
      'Slower scan times',
      'Cannot meet SIL ratings',
    ],
    bestFor: [
      'Small machines and simple processes',
      'Budget-conscious projects',
      'Quick prototyping',
      'Educational purposes',
      'Basic automation tasks',
    ],
    specifications: {
      ioPoints: 16,
      memoryKb: 32,
      scanTime: '0.5ms per kInstruction',
      communicationProtocols: ['Modbus', 'Ethernet'],
      expandability: 'Limited (up to 7 expansion modules)',
    },
  };

  // Solution 2: Schneider TM241 (Balanced)
  const schneiderBalanced: Solution = {
    name: 'Schneider Modicon M241 Standard',
    platform: 'Schneider Electric',
    model: 'TM241CE40T',
    description: 'Mid-range PLC with excellent balance of features, cost, and performance',
    cost: {
      hardware: 650,
      software: 0,
      installation: 500,
      maintenance: 100,
      total: 1250,
    },
    complexity: {
      score: 5,
      setupTime: '4-8 hours',
      programmingDifficulty: 'Intermediate',
      maintenanceLevel: 'Medium',
    },
    robustness: {
      score: 8,
      reliability: '99.8%',
      safetyRating: 'Category 3 capable',
      environmentalRating: 'IP20 (industrial indoor)',
      mtbf: '350,000 hours',
    },
    pros: [
      'Good price-to-performance ratio',
      'Excellent I/O expansion options',
      'Motion control capabilities',
      'Industrial-grade reliability',
      'Wide protocol support',
      'Future-proof with upgradability',
    ],
    cons: [
      'Higher cost than basic models',
      'Requires more programming knowledge',
      'Larger physical footprint',
      'More complex configuration',
      'Higher power consumption',
    ],
    bestFor: [
      'Medium-sized machines',
      'Applications requiring expansion',
      'Motion control needs',
      'Industrial environments',
      'Long-term deployments',
    ],
    specifications: {
      ioPoints: 40,
      memoryKb: 256,
      scanTime: '0.2ms per kInstruction',
      communicationProtocols: ['Modbus', 'Ethernet/IP', 'CANopen', 'Profibus'],
      expandability: 'High (up to 14 expansion modules)',
    },
  };

  // Solution 3: Siemens S7-1200 (Mid-range)
  const siemensMidRange: Solution = {
    name: 'Siemens SIMATIC S7-1200',
    platform: 'Siemens',
    model: 'CPU 1214C DC/DC/DC',
    description: 'Versatile compact controller with advanced diagnostics and security',
    cost: {
      hardware: 850,
      software: 450, // TIA Portal license
      installation: 600,
      maintenance: 150,
      total: 2050,
    },
    complexity: {
      score: 6,
      setupTime: '6-12 hours',
      programmingDifficulty: 'Intermediate to Advanced',
      maintenanceLevel: 'Medium',
    },
    robustness: {
      score: 9,
      reliability: '99.9%',
      safetyRating: 'SIL 2 capable',
      environmentalRating: 'IP20 (harsh industrial)',
      mtbf: '450,000 hours',
    },
    pros: [
      'Excellent diagnostics and troubleshooting',
      'High reliability and performance',
      'Advanced security features',
      'Integrated web server',
      'Superior motion control',
      'Global service network',
    ],
    cons: [
      'Higher software licensing cost',
      'Steeper learning curve',
      'More expensive hardware',
      'Requires TIA Portal training',
      'Complex initial setup',
    ],
    bestFor: [
      'Critical industrial processes',
      'Applications requiring diagnostics',
      'Multi-site deployments',
      'High-security environments',
      'Complex automation systems',
    ],
    specifications: {
      ioPoints: 14,
      memoryKb: 125,
      scanTime: '0.1ms per kInstruction',
      communicationProtocols: ['Profinet', 'Profibus', 'Modbus TCP', 'Ethernet/IP'],
      expandability: 'Very High (signal boards and modules)',
    },
  };

  // Solution 4: Allen-Bradley CompactLogix (Robust)
  const rockwellRobust: Solution = {
    name: 'Allen-Bradley CompactLogix 5380',
    platform: 'Rockwell Automation',
    model: '5069-L306ER',
    description: 'Enterprise-grade controller with maximum reliability and scalability',
    cost: {
      hardware: 2500,
      software: 1200, // Studio 5000 license
      installation: 1200,
      maintenance: 300,
      total: 5200,
    },
    complexity: {
      score: 8,
      setupTime: '12-24 hours',
      programmingDifficulty: 'Advanced',
      maintenanceLevel: 'High',
    },
    robustness: {
      score: 10,
      reliability: '99.99%',
      safetyRating: 'SIL 3 / PLe capable',
      environmentalRating: 'IP20 (extreme industrial)',
      mtbf: '600,000 hours',
    },
    pros: [
      'Highest reliability and uptime',
      'SIL 3 safety certification',
      'Extensive I/O and expansion',
      'Advanced motion and drive integration',
      'Best-in-class diagnostics',
      'Redundancy options available',
      'Industry-leading support',
    ],
    cons: [
      'Premium pricing',
      'High software licensing costs',
      'Requires specialized expertise',
      'Complex programming environment',
      'Vendor lock-in concerns',
      'Expensive spare parts',
    ],
    bestFor: [
      'Mission-critical systems',
      'Safety-rated applications',
      'Large-scale industrial plants',
      'High-availability requirements',
      'Complex process control',
      'Automotive and pharmaceutical',
    ],
    specifications: {
      ioPoints: 32,
      memoryKb: 3000,
      scanTime: '0.02ms per kInstruction',
      communicationProtocols: ['EtherNet/IP', 'ControlNet', 'DeviceNet', 'Modbus TCP'],
      expandability: 'Maximum (30+ local modules, distributed I/O)',
    },
  };

  // Solution 5: Mitsubishi FX5U (Cost-effective alternative)
  const mitsubishiEfficient: Solution = {
    name: 'Mitsubishi MELSEC FX5U',
    platform: 'Mitsubishi Electric',
    model: 'FX5U-32M',
    description: 'High-performance compact PLC with excellent cost-performance ratio',
    cost: {
      hardware: 550,
      software: 200, // GX Works3 license
      installation: 450,
      maintenance: 80,
      total: 1280,
    },
    complexity: {
      score: 5,
      setupTime: '4-8 hours',
      programmingDifficulty: 'Intermediate',
      maintenanceLevel: 'Low-Medium',
    },
    robustness: {
      score: 8,
      reliability: '99.7%',
      safetyRating: 'Category 3',
      environmentalRating: 'IP20 (industrial)',
      mtbf: '380,000 hours',
    },
    pros: [
      'Excellent value for money',
      'Fast scan times',
      'Good motion control',
      'User-friendly programming',
      'Compact design',
      'Strong in Asian markets',
    ],
    cons: [
      'Less common in Western markets',
      'Limited training resources in US/EU',
      'Smaller service network',
      'Documentation primarily Japanese',
      'Fewer integrators familiar with platform',
    ],
    bestFor: [
      'Manufacturing equipment',
      'Asian market deployments',
      'Cost-sensitive projects',
      'Motion control applications',
      'OEM machine builders',
    ],
    specifications: {
      ioPoints: 32,
      memoryKb: 200,
      scanTime: '0.15ms per kInstruction',
      communicationProtocols: ['CC-Link', 'Ethernet', 'Modbus TCP', 'Profinet'],
      expandability: 'High (8 expansion modules)',
    },
  };

  return [schneiderBudget, schneiderBalanced, siemensMidRange, rockwellRobust, mitsubishiEfficient];
}

function rankSolutions(solutions: Solution[], criteria: string): Solution[] {
  const sorted = [...solutions];

  switch (criteria) {
    case 'cheapest':
      return sorted.sort((a, b) => a.cost.total - b.cost.total);

    case 'simplest':
      return sorted.sort((a, b) => a.complexity.score - b.complexity.score);

    case 'robust':
      return sorted.sort((a, b) => b.robustness.score - a.robustness.score);

    case 'balanced':
      return sorted.sort((a, b) => {
        const scoreA = calculateBalancedScore(a);
        const scoreB = calculateBalancedScore(b);
        return scoreB - scoreA;
      });

    default:
      return sorted;
  }
}

function calculateBalancedScore(solution: Solution): number {
  const costScore = 10 - (solution.cost.total / 1000); // Lower cost = higher score
  const complexityScore = 10 - solution.complexity.score; // Lower complexity = higher score
  const robustnessScore = solution.robustness.score; // Higher robustness = higher score

  return (costScore * 0.3 + complexityScore * 0.3 + robustnessScore * 0.4);
}

function getCriteriaDescription(criteria: string): string {
  const descriptions = {
    cheapest: 'Minimize Total Cost of Ownership',
    simplest: 'Minimize Complexity and Setup Time',
    robust: 'Maximize Reliability and Safety',
    balanced: 'Optimize Cost, Complexity, and Reliability',
  };
  return descriptions[criteria as keyof typeof descriptions] || 'Balanced Approach';
}

function generateReasoning(solution: Solution, criteria: string): string {
  const reasoningMap = {
    cheapest: `The ${solution.name} offers the lowest total cost of ownership at $${solution.cost.total.toLocaleString()}, making it ideal for budget-conscious projects. With free programming software and minimal maintenance requirements, ongoing costs remain low.`,

    simplest: `With a complexity score of ${solution.complexity.score}/10 and setup time of ${solution.complexity.setupTime}, the ${solution.name} provides the quickest path to deployment. Its ${solution.complexity.programmingDifficulty.toLowerCase()} programming environment minimizes training requirements.`,

    robust: `The ${solution.name} achieves a robustness score of ${solution.robustness.score}/10 with ${solution.robustness.reliability} reliability and ${solution.robustness.safetyRating} safety rating. With an MTBF of ${solution.robustness.mtbf}, it ensures maximum uptime for critical applications.`,

    balanced: `The ${solution.name} provides an optimal balance with moderate cost ($${solution.cost.total.toLocaleString()}), manageable complexity (${solution.complexity.score}/10), and strong reliability (${solution.robustness.score}/10). This solution offers the best overall value for most industrial applications.`,
  };

  return reasoningMap[criteria as keyof typeof reasoningMap] || reasoningMap.balanced;
}

function generateTradeoffs(recommended: Solution, alternatives: Solution[]): string[] {
  const tradeoffs: string[] = [];

  alternatives.forEach((alt) => {
    if (alt.cost.total < recommended.cost.total) {
      tradeoffs.push(
        `${alt.name} costs $${(recommended.cost.total - alt.cost.total).toLocaleString()} less but has lower robustness (${alt.robustness.score}/10 vs ${recommended.robustness.score}/10)`
      );
    }

    if (alt.complexity.score < recommended.complexity.score) {
      tradeoffs.push(
        `${alt.name} is simpler to implement (${alt.complexity.score}/10 vs ${recommended.complexity.score}/10) but may lack advanced features`
      );
    }

    if (alt.robustness.score > recommended.robustness.score) {
      tradeoffs.push(
        `${alt.name} offers higher reliability (${alt.robustness.score}/10 vs ${recommended.robustness.score}/10) but costs $${(alt.cost.total - recommended.cost.total).toLocaleString()} more`
      );
    }
  });

  return tradeoffs.slice(0, 5); // Return top 5 tradeoffs
}
