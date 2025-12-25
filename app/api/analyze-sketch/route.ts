import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

/**
 * API Route: Analyze hand-drawn PLC ladder logic sketches
 * Uses the PLC File Handler skill's SketchAnalyzer
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const platform = formData.get('platform') as string || 'schneider';

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Save uploaded image to temporary file
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join(tmpdir(), `sketch_${Date.now()}.${imageFile.name.split('.').pop()}`);
    await writeFile(tempPath, buffer);

    // Call Python skill's SketchAnalyzer
    const pythonProcess = spawn('python3', [
      join(process.cwd(), 'plc_file_handler', 'cli.py'),
      'analyze',
      tempPath,
      '--platform',
      platform,
      '-o',
      join(tmpdir(), `analysis_${Date.now()}.json`)
    ]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    const result = await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          try {
            // Parse the analysis output
            const analysisMatch = stdoutData.match(/Analysis exported to: (.+\.json)/);
            if (analysisMatch) {
              // Success - return analysis summary
              resolve({
                success: true,
                summary: stdoutData,
                platform,
              });
            } else {
              // Return raw output
              resolve({
                success: true,
                output: stdoutData,
                platform,
              });
            }
          } catch (error) {
            reject(new Error(`Failed to parse analysis: ${error}`));
          }
        } else {
          reject(new Error(`Analysis failed: ${stderrData}`));
        }
      });
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Sketch analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
