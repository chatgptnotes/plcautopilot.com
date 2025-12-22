'use client';

import React, { useState } from 'react';
import { Upload, FileText, Settings, Code, TestTube, FileCheck, ChevronRight, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

type Step = 'upload' | 'analyze' | 'instantiate' | 'sequences' | 'hmi' | 'test' | 'document';

interface Artifact {
  name: string;
  type: 'spec' | 'io' | 'pnid' | 'narrative';
  uploaded: boolean;
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

  const steps = [
    { id: 'upload', label: 'Upload Artifacts', icon: Upload },
    { id: 'analyze', label: 'Analyze & Review', icon: FileCheck },
    { id: 'instantiate', label: 'Instantiate Assets', icon: Settings },
    { id: 'sequences', label: 'Generate Sequences', icon: Code },
    { id: 'hmi', label: 'Create HMI', icon: FileText },
    { id: 'test', label: 'Test & Debug', icon: TestTube },
    { id: 'document', label: 'Documentation', icon: FileText },
  ];

  const handleFileUpload = (artifactName: string) => {
    setArtifacts(artifacts.map(a =>
      a.name === artifactName ? { ...a, uploaded: true } : a
    ));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setCurrentStep('analyze');
    }, 3000);
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
                Upload Project Artifacts
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Upload your project documentation for AI analysis. The co-pilot will automatically extract requirements and generate the automation solution.
              </p>

              <div className="space-y-4">
                {artifacts.map((artifact) => (
                  <div
                    key={artifact.name}
                    className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                      artifact.uploaded
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText
                          className={artifact.uploaded ? 'text-green-600' : 'text-gray-400'}
                          size={24}
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {artifact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {artifact.type.toUpperCase()} Document
                          </p>
                        </div>
                      </div>
                      {artifact.uploaded ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <button
                          onClick={() => handleFileUpload(artifact.name)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!allArtifactsUploaded || isAnalyzing}
                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing Artifacts...
                  </span>
                ) : (
                  'Analyze & Generate Solution'
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

        {currentStep === 'analyze' && analysisComplete && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analysis Results
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Proposed Solution Structure
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Milk Reception System</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">3x Valves (V101, V102, V103)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">2x Pumps (P101, P102)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">4x Sensors (LT101, FT101, TT101, PS103)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Detected Issues
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Tag Mismatch</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        P&ID shows "PS13" but specification uses "PS103". Recommended: PS103
                      </p>
                      <button className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline">
                        Apply Correction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setCurrentStep('instantiate')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Proceed to Asset Instantiation
              </button>
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
