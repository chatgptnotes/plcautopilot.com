import { NextRequest, NextResponse } from 'next/server';

interface ProjectRequirements {
  applicationName: string;
  applicationType: string;
  ioRequirements: {
    digitalInputs: number;
    digitalOutputs: number;
    analogInputs: number;
    analogOutputs: number;
  };
  budget: string;
  environment: string;
  safetyRequirements: string;
  expansionNeeded: boolean;
  motionControl: boolean;
  communicationProtocols: string[];
  scanTimeRequirement: string;
}

interface RecommendedPLC {
  manufacturer: string;
  model: string;
  series: string;
  score: number;
  matchPercentage: number;
  price: number;
  reasons: string[];
  specifications: {
    ioPoints: number;
    memory: string;
    scanTime: string;
    protocols: string[];
  };
  pros: string[];
  cons: string[];
}

export async function POST(req: NextRequest) {
  try {
    const requirements: ProjectRequirements = await req.json();

    // Calculate total I/O needed
    const totalIO =
      requirements.ioRequirements.digitalInputs +
      requirements.ioRequirements.digitalOutputs +
      requirements.ioRequirements.analogInputs +
      requirements.ioRequirements.analogOutputs;

    // Add 20% buffer if expansion needed
    const requiredIO = requirements.expansionNeeded ? Math.ceil(totalIO * 1.2) : totalIO;

    // Generate recommendations based on requirements
    const recommendations = generateRecommendations(requirements, requiredIO);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error generating PLC recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

function generateRecommendations(
  requirements: ProjectRequirements,
  requiredIO: number
): RecommendedPLC[] {
  const allPLCs: RecommendedPLC[] = [];

  // Schneider Electric Options
  if (requiredIO <= 20) {
    allPLCs.push({
      manufacturer: 'Schneider Electric',
      model: 'TM221C16R',
      series: 'Modicon M221',
      score: 0,
      matchPercentage: 0,
      price: 350,
      reasons: [
        'Optimal for applications with up to 20 I/O points',
        'Free EcoStruxure Machine Expert Basic software',
        'Compact design perfect for space-constrained installations',
        'Excellent cost-performance ratio for small applications',
      ],
      specifications: {
        ioPoints: 16,
        memory: '32 KB',
        scanTime: '0.5 ms/kInstruction',
        protocols: ['Modbus TCP', 'Ethernet'],
      },
      pros: [
        'Lowest initial investment',
        'Easy programming interface',
        'Quick commissioning time',
        'Low maintenance costs',
      ],
      cons: [
        'Limited expansion capabilities',
        'Basic safety features only',
        'Not suitable for high-speed applications',
      ],
    });
  }

  if (requiredIO <= 40) {
    allPLCs.push({
      manufacturer: 'Schneider Electric',
      model: 'TM241CE40T',
      series: 'Modicon M241',
      score: 0,
      matchPercentage: 0,
      price: 750,
      reasons: [
        'Ideal for medium-sized applications up to 40 I/O',
        'Excellent expansion possibilities',
        'Integrated motion control capabilities',
        'Industrial-grade reliability',
      ],
      specifications: {
        ioPoints: 40,
        memory: '256 KB',
        scanTime: '0.2 ms/kInstruction',
        protocols: ['Modbus TCP', 'Ethernet/IP', 'CANopen'],
      },
      pros: [
        'Great expansion options (14 modules)',
        'Motion control support',
        'Wide protocol compatibility',
        'Future-proof solution',
      ],
      cons: [
        'Higher upfront cost',
        'Requires programming knowledge',
        'Larger physical footprint',
      ],
    });
  }

  // Siemens Options
  if (requiredIO <= 30) {
    allPLCs.push({
      manufacturer: 'Siemens',
      model: 'S7-1200 CPU 1214C',
      series: 'SIMATIC S7-1200',
      score: 0,
      matchPercentage: 0,
      price: 950,
      reasons: [
        'Industry-leading diagnostics and troubleshooting',
        'Integrated web server for remote monitoring',
        'Superior motion control capabilities',
        'Global support and extensive ecosystem',
      ],
      specifications: {
        ioPoints: 14,
        memory: '125 KB',
        scanTime: '0.1 ms/kInstruction',
        protocols: ['Profinet', 'Profibus', 'Modbus TCP', 'Ethernet/IP'],
      },
      pros: [
        'Excellent diagnostic tools',
        'TIA Portal integration',
        'High reliability (99.9%)',
        'Advanced security features',
      ],
      cons: [
        'TIA Portal license required ($450)',
        'Steeper learning curve',
        'Higher total cost',
      ],
    });
  }

  // Rockwell Options
  if (requiredIO >= 30 && (requirements.safetyRequirements.includes('SIL') || requirements.budget.includes('over'))) {
    allPLCs.push({
      manufacturer: 'Allen-Bradley',
      model: 'CompactLogix 5380',
      series: 'CompactLogix 5000',
      score: 0,
      matchPercentage: 0,
      price: 2800,
      reasons: [
        'Maximum reliability for mission-critical applications',
        'SIL 3 safety certification available',
        'Best-in-class motion and drive integration',
        'Extensive I/O and expansion capabilities',
      ],
      specifications: {
        ioPoints: 32,
        memory: '3 MB',
        scanTime: '0.02 ms/kInstruction',
        protocols: ['EtherNet/IP', 'ControlNet', 'DeviceNet', 'Modbus TCP'],
      },
      pros: [
        'Highest reliability (99.99%)',
        'SIL 3 / PLe capable',
        'Advanced diagnostics',
        'Redundancy options',
      ],
      cons: [
        'Premium pricing',
        'Studio 5000 license required ($1200)',
        'Complex programming',
      ],
    });
  }

  // Mitsubishi Options
  if (requiredIO <= 32) {
    allPLCs.push({
      manufacturer: 'Mitsubishi Electric',
      model: 'FX5U-32M',
      series: 'MELSEC FX5U',
      score: 0,
      matchPercentage: 0,
      price: 650,
      reasons: [
        'Excellent value for money',
        'Fast scan times for responsive control',
        'Good motion control capabilities',
        'Compact and efficient design',
      ],
      specifications: {
        ioPoints: 32,
        memory: '200 KB',
        scanTime: '0.15 ms/kInstruction',
        protocols: ['CC-Link', 'Ethernet', 'Modbus TCP'],
      },
      pros: [
        'Competitive pricing',
        'High-speed processing',
        'User-friendly software',
        'Reliable performance',
      ],
      cons: [
        'Less common in Western markets',
        'Limited local support in some regions',
        'Documentation primarily Japanese',
      ],
    });
  }

  // Score each PLC based on requirements
  allPLCs.forEach(plc => {
    let score = 0;

    // I/O capacity match (30 points)
    if (plc.specifications.ioPoints >= requiredIO) {
      const excess = plc.specifications.ioPoints - requiredIO;
      if (excess < 10) {
        score += 30; // Perfect match
      } else if (excess < 20) {
        score += 25; // Good match
      } else {
        score += 20; // Over-specified
      }
    } else {
      score += 10; // Under-specified (still possible with expansion)
    }

    // Budget match (25 points)
    const budgetMap: Record<string, number> = {
      'under-500': 500,
      '500-1000': 1000,
      '1000-2500': 2500,
      '2500-5000': 5000,
      'over-5000': 10000,
    };
    const maxBudget = budgetMap[requirements.budget] || 5000;
    if (plc.price <= maxBudget) {
      score += 25;
    } else {
      score += Math.max(0, 25 - ((plc.price - maxBudget) / maxBudget) * 25);
    }

    // Protocol support (20 points)
    if (requirements.communicationProtocols.length > 0) {
      const matchedProtocols = requirements.communicationProtocols.filter(p =>
        plc.specifications.protocols.some(plcProto => plcProto.toLowerCase().includes(p.toLowerCase()))
      );
      score += (matchedProtocols.length / requirements.communicationProtocols.length) * 20;
    } else {
      score += 15; // Default points if no specific protocol required
    }

    // Motion control (10 points)
    if (requirements.motionControl) {
      if (plc.model.includes('M241') || plc.manufacturer.includes('Siemens') || plc.manufacturer.includes('Rockwell')) {
        score += 10;
      } else {
        score += 5;
      }
    } else {
      score += 8;
    }

    // Safety requirements (10 points)
    if (requirements.safetyRequirements.includes('SIL')) {
      if (plc.manufacturer.includes('Rockwell') || plc.manufacturer.includes('Siemens')) {
        score += 10;
      } else {
        score += 3;
      }
    } else {
      score += 8;
    }

    // Scan time requirement (5 points)
    if (requirements.scanTimeRequirement === 'ultra-fast') {
      if (plc.manufacturer.includes('Rockwell') || plc.manufacturer.includes('Siemens')) {
        score += 5;
      }
    } else if (requirements.scanTimeRequirement === 'fast') {
      if (!plc.model.includes('TM221')) {
        score += 5;
      }
    } else {
      score += 5;
    }

    plc.score = score;
    plc.matchPercentage = Math.round((score / 100) * 100);
  });

  // Sort by score and return top 3
  return allPLCs.sort((a, b) => b.score - a.score).slice(0, 3);
}
