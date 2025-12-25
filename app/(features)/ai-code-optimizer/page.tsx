'use client';

import React, { useState } from 'react';
import { Zap, Code, TrendingUp, AlertTriangle, CheckCircle, BarChart, Upload, Download } from 'lucide-react';

interface OptimizationResult {
  category: string;
  before: number;
  after: number;
  improvement: number;
  color: string;
}

interface AnalysisData {
  analysis_summary?: {
    overall_quality?: string;
    scan_time_estimate?: string;
    complexity_score?: number;
    maintainability_score?: number;
    safety_score?: number;
  };
  issues_found?: any[];
  optimizations?: any[];
  refactored_code?: string;
  summary?: string;
}

export default function AICodeOptimizerPage() {
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [platform, setPlatform] = useState('schneider');
  const [error, setError] = useState<string | null>(null);

  const exampleCode = `PROGRAM OldPumpControl
VAR
    Level1: REAL;
    Level2: REAL;
    Pump1: BOOL;
    Pump2: BOOL;
    Counter: INT;
END_VAR

(* Old inefficient code *)
IF Level1 > 50.0 THEN
    IF Pump1 = FALSE THEN
        Pump1 := TRUE;
    END_IF;
END_IF;

IF Level1 < 20.0 THEN
    IF Pump1 = TRUE THEN
        Pump1 := FALSE;
    END_IF;
END_IF;

IF Level2 > 80.0 THEN
    IF Pump2 = FALSE THEN
        Pump2 := TRUE;
    END_IF;
END_IF;

IF Level2 < 20.0 THEN
    IF Pump2 = TRUE THEN
        Pump2 := FALSE;
    END_IF;
END_IF;

(* Unnecessary loop *)
FOR Counter := 1 TO 10 DO
    IF Counter = 5 THEN
        (* Do nothing *)
    END_IF;
END_FOR;

END_PROGRAM`;

  const optimizedCodeExample = `PROGRAM OptimizedPumpControl
VAR
    Level1: REAL;              (* Primary tank level *)
    Level2: REAL;              (* Secondary tank level *)
    Pump1: BOOL := FALSE;      (* Primary pump status *)
    Pump2: BOOL := FALSE;      (* Secondary pump status *)

    (* Configuration constants *)
    PUMP_START_LEVEL: REAL := 50.0;
    PUMP_STOP_LEVEL: REAL := 20.0;
    PUMP2_START_LEVEL: REAL := 80.0;
END_VAR

(* Optimized pump control logic with hysteresis *)
Pump1 := (Level1 > PUMP_START_LEVEL) OR
         (Pump1 AND (Level1 > PUMP_STOP_LEVEL));

Pump2 := (Level2 > PUMP2_START_LEVEL) OR
         (Pump2 AND (Level2 > PUMP_STOP_LEVEL));

(* Removed unnecessary loop and redundant checks *)

END_PROGRAM`;

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch('/api/ai-optimize-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: originalCode,
          platform,
          optimizationGoals: ['performance', 'safety', 'maintainability'],
          currentIssues: ''
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to optimize code');
      }

      const data = await response.json();

      // Parse analysis data
      let analysis: AnalysisData;
      if (typeof data.analysis === 'string') {
        analysis = JSON.parse(data.analysis);
      } else {
        analysis = data.analysis;
      }

      setAnalysisData(analysis);
      setOptimizedCode(analysis.refactored_code || 'No refactored code available');
      setShowResults(true);
    } catch (err: any) {
      console.error('Code optimization error:', err);
      setError(err.message || 'Failed to optimize code. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleUseExample = () => {
    setOriginalCode(exampleCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Zap className="text-orange-600" size={32} />
                AI Code Optimizer
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Modernize legacy code and improve performance automatically
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Performance</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Reduce scan time by up to 70%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Code className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Modernize</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use latest libraries and best practices
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-yellow-600" size={24} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Bug Detection</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Identify and fix potential issues
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-purple-600" size={24} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Standards</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              IEC 61131-3 compliant code
            </p>
          </div>
        </div>

        {/* Main Code Editor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Code */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">Original Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleUseExample}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Use Example
                </button>
              </div>
            </div>
            <div className="p-4">
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-red-600 mt-0.5" size={16} />
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="schneider">Schneider Electric</option>
                  <option value="siemens">Siemens</option>
                  <option value="rockwell">Rockwell/Allen-Bradley</option>
                  <option value="mitsubishi">Mitsubishi</option>
                </select>
              </div>
              <textarea
                value={originalCode}
                onChange={(e) => setOriginalCode(e.target.value)}
                placeholder="Paste your legacy PLC code here..."
                className="w-full h-80 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white resize-none"
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                onClick={handleOptimize}
                disabled={!originalCode || isOptimizing}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                {isOptimizing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Optimizing Code with Claude AI...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Optimize with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optimized Code */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">Optimized Code</h3>
              <button
                disabled={!optimizedCode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <Download size={16} />
              </button>
            </div>
            <div className="p-4">
              <pre className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto">
                <code className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre">
                  {optimizedCode || 'Optimized code will appear here...'}
                </code>
              </pre>
            </div>
            {optimizedCode && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle size={20} />
                  <span className="font-medium">Optimization Complete!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {showResults && analysisData && (
          <div className="mt-8 space-y-6">
            {/* Analysis Summary */}
            {analysisData.analysis_summary && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BarChart className="text-orange-600" size={24} />
                  Code Analysis Summary
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analysisData.analysis_summary.overall_quality || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Overall Quality</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {analysisData.analysis_summary.complexity_score?.toFixed(1) || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complexity Score</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analysisData.analysis_summary.safety_score?.toFixed(1) || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Safety Score</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {analysisData.analysis_summary.scan_time_estimate || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Scan Time</div>
                  </div>
                </div>
              </div>
            )}

            {/* Issues Found */}
            {analysisData.issues_found && analysisData.issues_found.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  Issues Found ({analysisData.issues_found.length})
                </h3>
                <div className="space-y-3">
                  {analysisData.issues_found.slice(0, 5).map((issue: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          issue.severity === 'Critical' || issue.severity === 'High'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {issue.severity}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{issue.issue}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{issue.recommendation}</p>
                          {issue.location && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Location: {issue.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimizations Applied */}
            {analysisData.optimizations && analysisData.optimizations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  Optimizations Applied ({analysisData.optimizations.length})
                </h3>
                <div className="space-y-4">
                  {analysisData.optimizations.slice(0, 5).map((opt: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{opt.description}</p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">{opt.benefit}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                          {opt.type}
                        </span>
                      </div>
                      {opt.before_code && opt.after_code && (
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Before:</p>
                            <pre className="text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-x-auto">
                              <code className="text-gray-800 dark:text-gray-200">{opt.before_code}</code>
                            </pre>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">After:</p>
                            <pre className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded overflow-x-auto">
                              <code className="text-gray-800 dark:text-gray-200">{opt.after_code}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {analysisData.summary && (
              <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Optimization Summary</h3>
                <p className="text-sm opacity-90">{analysisData.summary}</p>
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-8 bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">What the AI Optimizer Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Modernize Legacy Code</h3>
              <p className="text-sm opacity-90">
                Convert programs from 10-20 years ago to use latest libraries and function blocks
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Reduce Complexity</h3>
              <p className="text-sm opacity-90">
                Streamline algorithms and eliminate unnecessary loops and conditions
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Improve Performance</h3>
              <p className="text-sm opacity-90">
                Reduce scan time and memory usage for better controller performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
