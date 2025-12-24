'use client';

import React, { useState } from 'react';
import { Upload, FileText, Settings, Code, TestTube, FileCheck, ChevronRight, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

type Step = 'upload' | 'analyze' | 'instantiate' | 'sequences' | 'hmi' | 'test' | 'document';

interface Artifact {
  name: string;
  type: 'spec' | 'io' | 'pnid' | 'narrative';
  uploaded: boolean;
  file?: File;
}

interface GeneratedApplication {
  application_name: string;
  platform: string;
  controller: string;
  program_code: string;
  io_assignments: any[];
  variables: any[];
  function_blocks: any[];
  safety_features: any[];
  testing_procedure: any[];
}

export default function AIApplicationGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [artifacts, setArtifacts] = useState<Artifact[]>([
    { name: 'Process Specification.pdf', type: 'spec', uploaded: false },
    { name: 'IO List.xlsx', type: 'io', uploaded: false },
    { name: 'P&ID Drawing.pdf', type: 'pnid', uploaded: false },
    { name: 'Control Narrative.docx', type: 'narrative', uploaded: false },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [generatedApp, setGeneratedApp] = useState<GeneratedApplication | null>(null);
  const [requirements, setRequirements] = useState('');
  const [platform, setPlatform] = useState('schneider');
  const [controller, setController] = useState('TM221CE24R');
  const [safetyLevel, setSafetyLevel] = useState('standard');
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { id: 'upload', label: 'Upload Artifacts', icon: Upload },
    { id: 'analyze', label: 'Analyze & Review', icon: FileCheck },
    { id: 'instantiate', label: 'Instantiate Assets', icon: Settings },
    { id: 'sequences', label: 'Generate Sequences', icon: Code },
    { id: 'hmi', label: 'Create HMI', icon: FileText },
    { id: 'test', label: 'Test & Debug', icon: TestTube },
    { id: 'document', label: 'Documentation', icon: FileText },
  ];

  const handleFileUpload = (artifactName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArtifacts(artifacts.map(a =>
        a.name === artifactName ? { ...a, uploaded: true, file } : a
      ));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Build requirements from uploaded artifacts
      let combinedRequirements = requirements || 'Generate a PLC application based on the uploaded specifications.';

      // Call Claude API to generate application
      const response = await fetch('/api/ai-generate-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirements: combinedRequirements,
          applicationType: 'Industrial Control',
          platform,
          controller,
          ioCount: '24 I/O',
          safetyLevel
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        const errorMsg = errorData.error || 'Failed to generate application';
        const details = errorData.details ? `\n\nDetails: ${errorData.details}` : '';
        const debugInfo = errorData.apiKeyConfigured !== undefined
          ? `\n\nDebug: API Key=${errorData.apiKeyConfigured}, Model=${errorData.modelConfigured}`
          : '';
        throw new Error(errorMsg + details + debugInfo);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Check if we got a valid response
      if (!data.success || !data.application) {
        throw new Error('Invalid response from API: Missing application data');
      }

      // Parse the generated application
      let appData: GeneratedApplication;
      if (typeof data.application === 'string') {
        try {
          appData = JSON.parse(data.application);
        } catch (parseErr) {
          console.error('Failed to parse application string:', data.application);
          throw new Error('Failed to parse application data from API response');
        }
      } else if (data.application.raw_response) {
        // Handle case where Claude didn't return valid JSON
        throw new Error('AI returned invalid format. Raw response available in console.');
      } else {
        appData = data.application;
      }

      setGeneratedApp(appData);
      setAnalysisComplete(true);
      setCurrentStep('analyze');
    } catch (err: any) {
      console.error('Application generation error:', err);
      setError(err.message || 'Failed to generate application. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const allArtifactsUploaded = artifacts.every(a => a.uploaded);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Sparkles className="text-purple-600" size={32} />
                AI Application Generator
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Build complete automation solutions from specifications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > idx;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isActive
                          ? 'bg-purple-600 text-white'
                          : isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle size={24} /> : <Icon size={24} />}
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <ChevronRight
                      className={`mx-2 ${
                        isCompleted ? 'text-green-600' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      size={20}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Application Requirements
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Describe your automation requirements and configuration. The AI will generate a complete PLC application.
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-red-600 mt-0.5" size={16} />
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application Requirements *
                  </label>
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Describe your PLC application requirements (e.g., 'Control two water pumps with alternating duty based on tank level sensors...')"
                    className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="schneider">Schneider Electric</option>
                      <option value="siemens">Siemens</option>
                      <option value="rockwell">Rockwell/Allen-Bradley</option>
                      <option value="mitsubishi">Mitsubishi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Controller Model
                    </label>
                    <input
                      type="text"
                      value={controller}
                      onChange={(e) => setController(e.target.value)}
                      placeholder="e.g., TM221CE24R"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Safety Level
                  </label>
                  <select
                    value={safetyLevel}
                    onChange={(e) => setSafetyLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="enhanced">Enhanced</option>
                    <option value="SIL2">SIL2 (Safety Integrity Level 2)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!requirements.trim() || isAnalyzing}
                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Generating PLC Application with Claude AI...
                  </span>
                ) : (
                  'Generate Application with AI'
                )}
              </button>
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What Happens Next?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FileCheck className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Document Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      AI analyzes your specifications, IO lists, P&IDs, and control narratives
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Settings className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Asset Instantiation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatically creates and configures valves, motors, sensors, and other assets
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Code className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Control Sequences</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Generates complete control logic including start, stop, hold, and abort sequences
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <FileText className="text-yellow-600 dark:text-yellow-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">HMI Creation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Builds process supervision pages with symbols from P&ID drawings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <TestTube className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Testing & Validation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Auto-generates test cases and validates against specifications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'analyze' && analysisComplete && generatedApp && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated Application: {generatedApp.application_name}
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Platform: {generatedApp.platform} | Controller: {generatedApp.controller}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Code className="text-purple-600" size={20} />
                    Program Code
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                      {generatedApp.program_code}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Settings className="text-blue-600" size={20} />
                    I/O Assignments ({generatedApp.io_assignments?.length || 0})
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 space-y-2">
                    {generatedApp.io_assignments?.slice(0, 10).map((io: any, idx: number) => (
                      <div key={idx} className="text-xs border-b border-gray-200 dark:border-gray-700 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-purple-600">{io.address}</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                            {io.type}
                          </span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mt-1">{io.device}</div>
                        <div className="text-gray-500 dark:text-gray-400">{io.wiring}</div>
                      </div>
                    ))}
                    {generatedApp.io_assignments && generatedApp.io_assignments.length > 10 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        ... and {generatedApp.io_assignments.length - 10} more
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    Safety Features
                  </h4>
                  <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    {generatedApp.safety_features?.slice(0, 5).map((feature: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>{typeof feature === 'string' ? feature : feature.description || JSON.stringify(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="text-blue-600" size={16} />
                    Variables
                  </h4>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    {generatedApp.variables?.length || 0} variables declared
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <TestTube className="text-yellow-600" size={16} />
                    Testing Procedure
                  </h4>
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    {generatedApp.testing_procedure?.length || 0} test cases generated
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    const blob = new Blob([generatedApp.program_code], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${generatedApp.application_name.replace(/\s+/g, '_')}.st`;
                    a.click();
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download Program
                </button>
                <button
                  onClick={() => {
                    setCurrentStep('upload');
                    setAnalysisComplete(false);
                    setGeneratedApp(null);
                    setRequirements('');
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Another Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Time Savings Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">40-50%</div>
              <div className="text-sm opacity-90">Development Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Engineering Automation</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10x</div>
              <div className="text-sm opacity-90">Faster Documentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
