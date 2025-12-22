'use client';

import React, { useState } from 'react';
import { Send, Code, FileText, TestTube, Upload, Sparkles, Zap, CheckCircle } from 'lucide-react';

export default function AICopilotPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain' | 'test'>('generate');
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  const examplePrompts = [
    "Write a PLC program to control two pumps in a water pump station. Pump 1 should go on when well is greater than 50%, pump 2 should go on when well is greater than 80%. Sound an alarm when well is greater than 90%. Pumps should go off when well is less than 20%. Well is 15 ft deep.",
    "Create a motor start/stop program with emergency stop and safety interlocks",
    "Generate a conveyor belt control system with multiple zones and sensors",
    "Build a temperature control system with PID loop for industrial oven"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setChatHistory([...chatHistory, { role: 'user', content: prompt }]);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response = generateMockResponse(prompt, activeTab);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
      if (activeTab === 'generate') {
        setGeneratedCode(response);
      }
      setIsLoading(false);
      setPrompt('');
    }, 2000);
  };

  const generateMockResponse = (userPrompt: string, tab: string) => {
    if (tab === 'generate') {
      return `(* Generated PLC Program *)
(* Based on your requirements *)

PROGRAM WaterPumpStation
VAR
    WellLevel: REAL;           (* Current well level in feet *)
    WellLevelPercent: REAL;    (* Well level as percentage *)
    Pump1_Run: BOOL := FALSE;  (* Pump 1 running status *)
    Pump2_Run: BOOL := FALSE;  (* Pump 2 running status *)
    HighLevelAlarm: BOOL := FALSE; (* High level alarm *)
    WellDepth: REAL := 15.0;   (* Total well depth in feet *)
END_VAR

(* Calculate well level percentage *)
WellLevelPercent := (WellLevel / WellDepth) * 100.0;

(* Pump 1 Control Logic *)
IF WellLevelPercent > 50.0 THEN
    Pump1_Run := TRUE;
ELSIF WellLevelPercent < 20.0 THEN
    Pump1_Run := FALSE;
END_IF;

(* Pump 2 Control Logic *)
IF WellLevelPercent > 80.0 THEN
    Pump2_Run := TRUE;
ELSIF WellLevelPercent < 20.0 THEN
    Pump2_Run := FALSE;
END_IF;

(* High Level Alarm *)
IF WellLevelPercent > 90.0 THEN
    HighLevelAlarm := TRUE;
ELSE
    HighLevelAlarm := FALSE;
END_IF;

END_PROGRAM`;
    } else if (tab === 'explain') {
      return `## Code Explanation

### Flow Diagram
\`\`\`
Start → Read Well Level → Calculate Percentage → Control Pumps → Check Alarm → End
\`\`\`

### Variable Declarations (Lines 1-9)
- **WellLevel**: Stores the current water level measurement
- **WellLevelPercent**: Calculated percentage of well capacity
- **Pump1_Run, Pump2_Run**: Control outputs for pump operations
- **HighLevelAlarm**: Safety alarm trigger
- **WellDepth**: Constant defining maximum well capacity

### Main Logic

**Percentage Calculation (Line 11)**
Converts raw level reading to percentage for easier threshold comparisons.

**Pump 1 Control (Lines 13-17)**
- Activates when level exceeds 50%
- Deactivates when level drops below 20%
- Uses hysteresis to prevent rapid cycling

**Pump 2 Control (Lines 19-23)**
- Provides additional pumping at 80% capacity
- Same shutdown logic as Pump 1

**Alarm Logic (Lines 25-29)**
- Triggers at 90% to warn of approaching overflow
- Clears automatically when level drops`;
    } else {
      return `## Generated Test Cases

### Test Case 1: Normal Operation - Low Level
**Scenario**: Well level at 10%
- Expected: Both pumps OFF
- Expected: Alarm OFF
- Status: ✓ PASS

### Test Case 2: Pump 1 Activation
**Scenario**: Well level rises to 55%
- Expected: Pump 1 ON, Pump 2 OFF
- Expected: Alarm OFF
- Status: ✓ PASS

### Test Case 3: Pump 2 Activation
**Scenario**: Well level rises to 85%
- Expected: Pump 1 ON, Pump 2 ON
- Expected: Alarm OFF
- Status: ✓ PASS

### Test Case 4: High Level Alarm
**Scenario**: Well level rises to 92%
- Expected: Pump 1 ON, Pump 2 ON
- Expected: Alarm ON
- Status: ✓ PASS

### Test Case 5: Pump Shutdown
**Scenario**: Well level drops to 18%
- Expected: Both pumps OFF
- Expected: Alarm OFF
- Status: ✓ PASS

### Troubleshooting Recommendations
- Verify sensor calibration for accurate level readings
- Check pump contactor wiring
- Test alarm notification system
- Validate hysteresis thresholds`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Sparkles className="text-blue-600" size={32} />
                AI Co-Pilot
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Your intelligent PLC programming assistant powered by generative AI
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Code className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Generate Code</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Convert natural language descriptions into production-ready PLC code
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Explain Code</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Understand existing programs with detailed explanations and flow diagrams
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TestTube className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Test & Debug</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Automatically generate test cases and identify potential issues
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Chat Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'generate'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Code className="inline mr-2" size={16} />
                  Generate
                </button>
                <button
                  onClick={() => setActiveTab('explain')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'explain'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FileText className="inline mr-2" size={16} />
                  Explain
                </button>
                <button
                  onClick={() => setActiveTab('test')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'test'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <TestTube className="inline mr-2" size={16} />
                  Test
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Describe what you want to build, and I'll help you create it
                  </p>
                  <div className="text-left max-w-md mx-auto space-y-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Example prompts:</p>
                    {examplePrompts.slice(0, 2).map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPrompt(example)}
                        className="block w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((message, idx) => (
                <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-3xl rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-mono text-sm">{message.content}</pre>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Generating response...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder={
                    activeTab === 'generate'
                      ? 'Describe the PLC program you want to create...'
                      : activeTab === 'explain'
                      ? 'Paste code to explain or ask a question...'
                      : 'Describe the test scenario...'
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Code/Output Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">Generated Output</h3>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Upload size={16} />
                </button>
              </div>
            </div>

            <div className="h-[calc(100%-4rem)] overflow-y-auto p-4">
              {generatedCode || chatHistory.filter(m => m.role === 'assistant').slice(-1)[0]?.content ? (
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                    {generatedCode || chatHistory.filter(m => m.role === 'assistant').slice(-1)[0]?.content}
                  </code>
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Zap className="text-gray-300 dark:text-gray-600 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No output yet
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start a conversation to see generated code and results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">40-50% Time Savings</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Reduce development time significantly</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Library Reuse</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Leverage tested and validated function blocks</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Comprehensive Testing</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Auto-generate test scenarios and cases</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Supported Capabilities</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Sparkles className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Code Generation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">IEC 61131-3 compliant ladder logic and ST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Documentation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Auto-generate comprehensive documentation</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Code Optimization</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Modernize legacy code automatically</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
