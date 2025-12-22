import { NextRequest, NextResponse } from 'next/server';
import { getModelById } from '../../data/plc-models';
import { generateSchneiderProgram } from './generators/schneider';
import { generateSiemensProgram } from './generators/siemens';
import { generateRockwellProgram } from './generators/rockwell';
import { generateGenericProgram } from './generators/generic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const logic = formData.get('logic') as string;
    const modelId = formData.get('modelId') as string;

    if (!logic || !modelId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plcModel = getModelById(modelId);
    if (!plcModel) {
      return NextResponse.json(
        { error: 'Invalid PLC model' },
        { status: 400 }
      );
    }

    // Process image if provided (for future vision integration)
    let imageAnalysis = null;
    if (image) {
      // TODO: Implement image analysis with vision AI
      // For now, we'll use the logic description
      imageAnalysis = {
        detected: 'Image uploaded but not yet processed',
        filename: image.name,
      };
    }

    // Generate program based on manufacturer
    let generatedProgram;
    const manufacturer = plcModel.manufacturer.toLowerCase();

    if (manufacturer.includes('schneider')) {
      generatedProgram = await generateSchneiderProgram(logic, plcModel);
    } else if (manufacturer.includes('siemens')) {
      generatedProgram = await generateSiemensProgram(logic, plcModel);
    } else if (manufacturer.includes('rockwell') || manufacturer.includes('allen-bradley')) {
      generatedProgram = await generateRockwellProgram(logic, plcModel);
    } else {
      generatedProgram = await generateGenericProgram(logic, plcModel);
    }

    return NextResponse.json({
      content: generatedProgram.content,
      filename: generatedProgram.filename,
      extension: plcModel.fileExtension,
      model: plcModel.model,
      manufacturer: plcModel.manufacturer,
    });
  } catch (error) {
    console.error('Error generating PLC program:', error);
    return NextResponse.json(
      { error: 'Failed to generate program' },
      { status: 500 }
    );
  }
}
