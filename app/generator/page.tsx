'use client';

import { useState } from 'react';
import PLCCascadingSelector from '@/app/components/PLCCascadingSelector';
import type { PLCManufacturer, PLCSeries, PLCModel } from '@/lib/plc-models-database';

export default function GeneratorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [logicDescription, setLogicDescription] = useState('');
  const [selectedPLC, setSelectedPLC] = useState<{
    manufacturer: PLCManufacturer | null;
    series: PLCSeries | null;
    model: PLCModel | null;
  }>({
    manufacturer: null,
    series: null,
    model: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<{
    content: string;
    filename: string;
    extension: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedPLC.model || !logicDescription) {
      alert('Please select a PLC model and provide logic description');
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      formData.append('logic', logicDescription);
      formData.append('modelId', selectedPLC.model.id);
      formData.append('manufacturer', selectedPLC.manufacturer?.name || '');
      formData.append('series', selectedPLC.series?.name || '');
      formData.append('modelName', selectedPLC.model.name);

      const response = await fetch('/api/generate-plc', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setGeneratedFile(data);
    } catch (error) {
      console.error('Error generating PLC program:', error);
      alert('Failed to generate PLC program');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedFile || !selectedPLC.model || !selectedPLC.manufacturer) return;

    try {
      const response = await fetch('/api/download-program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programCode: generatedFile.content,
          platform: selectedPLC.manufacturer.name,
          plcModel: selectedPLC.model.name,
          language: 'LD',
          projectName: 'PLCAutoProgram',
        }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : generatedFile.filename;

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PLC Program Generator
          </h1>
          <p className="text-xl text-gray-600">
            Upload a sketch, describe your logic, and generate ready-to-use PLC programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Upload Control Diagram (Optional)
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {imagePreview ? (
                    <div className="w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="mt-4 text-sm text-gray-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-lg font-medium text-gray-700">
                        Click to upload diagram
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG up to 10MB
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Logic Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Describe Your Logic
              </h2>
              <textarea
                value={logicDescription}
                onChange={(e) => setLogicDescription(e.target.value)}
                placeholder="Example: 3 sequential lights with 3-second delays. START button to begin, STOP button to interrupt. Light 1 turns on immediately, Light 2 after 3 seconds, Light 3 after 6 seconds total."
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
              />
              <p className="mt-2 text-sm text-gray-500">
                Describe inputs, outputs, timers, and sequence logic
              </p>
            </div>

            {/* PLC Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Select PLC Model
              </h2>

              <PLCCascadingSelector
                onSelectionChange={setSelectedPLC}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedPLC.model || !logicDescription || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Program...
                </span>
              ) : (
                'Generate PLC Program'
              )}
            </button>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Generated Program
              </h2>

              {generatedFile ? (
                <div className="space-y-4">
                  {/* File Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Program Generated Successfully!
                    </h3>
                    <p className="text-sm text-green-700">
                      <strong>Filename:</strong> {generatedFile.filename}
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Format:</strong> {generatedFile.extension}
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Program Preview
                    </h4>
                    <pre className="text-xs text-gray-700 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap font-mono">
                      {generatedFile.content.substring(0, 2000)}
                      {generatedFile.content.length > 2000 && '\n\n... (truncated)'}
                    </pre>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download {generatedFile.extension} File
                  </button>

                  {/* Generate Another */}
                  <button
                    onClick={() => setGeneratedFile(null)}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Generate Another Program
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <svg
                    className="w-24 h-24 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">
                    Your generated PLC program will appear here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Fill in the details and click &quot;Generate PLC Program&quot;
                  </p>
                </div>
              )}
            </div>

            {/* Help & Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Tips</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Upload a clear sketch or wiring diagram for better results</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Describe all inputs, outputs, and timing requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Specify if you need special functions (counters, comparisons, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Different PLC models have different programming capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-xs text-gray-400 text-center py-4 mt-8">
          PLCAutoPilot v1.4 | Last Updated: 2025-12-24 | github.com/chatgptnotes/plcautopilot.com
        </footer>
      </div>
    </div>
  );
}
