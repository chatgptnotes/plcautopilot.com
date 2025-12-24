import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

/**
 * API Route: Generate PLC files from sketches
 * Uses the PLC File Handler skill to create native PLC project files
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const platform = formData.get('platform') as string || 'schneider';
    const projectName = formData.get('projectName') as string || 'SketchProject';
    const controller = formData.get('controller') as string;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Save uploaded image to temporary file
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const tempImagePath = join(tmpdir(), `sketch_${timestamp}.${imageFile.name.split('.').pop()}`);
    await writeFile(tempImagePath, buffer);

    // Determine output file extension
    const extensions: Record<string, string> = {
      'schneider': '.smbp',
      'rockwell': '.L5X',
      'siemens': '.zap16',
      'mitsubishi': '.gxw',
    };

    const extension = extensions[platform] || '.smbp';
    const outputPath = join(tmpdir(), `${projectName}${extension}`);

    // Determine controller default
    const defaultControllers: Record<string, string> = {
      'schneider': 'TM221CE24R',
      'rockwell': '1769-L33ER',
      'siemens': 'S7-1200',
      'mitsubishi': 'FX5U',
    };

    const controllerModel = controller || defaultControllers[platform];

    // Call Python skill's generator
    const pythonProcess = spawn('python3', [
      join(process.cwd(), 'plc_file_handler', 'cli.py'),
      'generate',
      '--platform',
      platform,
      '--name',
      projectName,
      '--controller',
      controllerModel,
      '--from-sketch',
      tempImagePath,
      '-o',
      outputPath
    ]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          reject(new Error(`Generation failed: ${stderrData}`));
        }
      });
    });

    // Read generated file
    const fileContent = await readFile(outputPath);

    // Clean up temporary files
    await unlink(tempImagePath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    // Return file as download
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${projectName}${extension}"`,
      },
    });

  } catch (error) {
    console.error('Sketch-to-PLC generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
