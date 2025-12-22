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

export default function AICodeOptimizerPage() {
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  const optimizationResults: OptimizationResult[] = [
    { category: 'Lines of Code', before: 45, after: 23, improvement: 49, color: 'blue' },
    { category: 'IF Statements', before: 12, after: 0, improvement: 100, color: 'green' },
    { category: 'Scan Time (ms)', before: 2.4, after: 0.8, improvement: 67, color: 'purple' },
    { category: 'Memory Usage (KB)', before: 5.2, after: 2.1, improvement: 60, color: 'yellow' },
    { category: 'Cyclomatic Complexity', before: 8, after: 2, improvement: 75, color: 'red' },
  ];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizedCode(optimizedCodeExample);
      setIsOptimizing(false);
      setShowResults(true);
    }, 3000);
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
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Upload size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={originalCode}
                onChange={(e) => setOriginalCode(e.target.value)}
                placeholder="Paste your legacy PLC code here..."
                className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white resize-none"
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
                    Optimizing Code...
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
        {showResults && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart className="text-orange-600" size={24} />
              Optimization Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {optimizationResults.map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {result.category}
                    </div>
                    <div className="flex justify-center items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.improvement}%
                      </span>
                      <TrendingUp className="text-green-600" size={20} />
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Before</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{result.before}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">After</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{result.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Improvements List */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Code Improvements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Eliminated Nested IF Statements</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Replaced 12 nested IF statements with efficient boolean logic
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Removed Unnecessary Loops</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Eliminated redundant FOR loop that added no functionality
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Added Configuration Constants</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Improved maintainability with named constants
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Best Practices Applied</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Variable Documentation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Added descriptive comments for all variables
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Hysteresis Logic</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Implemented proper hysteresis to prevent pump cycling
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">IEC 61131-3 Compliance</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ensured code follows international standards
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
