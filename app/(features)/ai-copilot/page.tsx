'use client';

import React, { useState, useEffect } from 'react';
import { Send, Code, FileText, TestTube, Upload, Sparkles, Zap, CheckCircle, Clock, Loader2 } from 'lucide-react';

interface ProgressStage {
  name: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function AICopilotPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain' | 'test'>('generate');
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  // Progress tracking state
  const [progressStages, setProgressStages] = useState<ProgressStage[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const examplePrompts = [
    "Write a PLC program to control two pumps in a water pump station. Pump 1 should go on when well is greater than 50%, pump 2 should go on when well is greater than 80%. Sound an alarm when well is greater than 90%. Pumps should go off when well is less than 20%. Well is 15 ft deep.",
    "Create a motor start/stop program with emergency stop and safety interlocks",
    "Generate a conveyor belt control system with multiple zones and sensors",
    "Build a temperature control system with PID loop for industrial oven"
  ];

  // Define stages based on active tab
  const getStagesForTab = (tab: string): ProgressStage[] => {
    if (tab === 'generate') {
      return [
        { name: 'Analyzing Requirements', duration: 2000, status: 'pending' },
        { name: 'Selecting Libraries', duration: 1500, status: 'pending' },
        { name: 'Generating Code', duration: 3000, status: 'pending' },
        { name: 'Validating Syntax', duration: 1000, status: 'pending' },
        { name: 'Creating Documentation', duration: 1500, status: 'pending' }
      ];
    } else if (tab === 'explain') {
      return [
        { name: 'Parsing Code Structure', duration: 1500, status: 'pending' },
        { name: 'Analyzing Logic Flow', duration: 2000, status: 'pending' },
        { name: 'Identifying Variables', duration: 1000, status: 'pending' },
        { name: 'Generating Diagrams', duration: 2000, status: 'pending' },
        { name: 'Writing Explanation', duration: 2500, status: 'pending' }
      ];
    } else {
      return [
        { name: 'Understanding Code', duration: 1500, status: 'pending' },
        { name: 'Identifying Test Cases', duration: 2000, status: 'pending' },
        { name: 'Generating Scenarios', duration: 2500, status: 'pending' },
        { name: 'Creating Validation', duration: 1500, status: 'pending' },
        { name: 'Building Test Report', duration: 1500, status: 'pending' }
      ];
    }
  };

  // Timer effect for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, startTime]);

  // Progress simulation effect
  useEffect(() => {
    if (!isLoading || progressStages.length === 0) return;

    const stages = [...progressStages];
    let stageIndex = 0;
    let stageProgress = 0;

    const interval = setInterval(() => {
      if (stageIndex >= stages.length) {
        clearInterval(interval);
        return;
      }

      const currentStageDuration = stages[stageIndex].duration;
      const increment = 100 / (currentStageDuration / 100);

      stageProgress += increment;

      if (stageProgress >= 100) {
        stages[stageIndex].status = 'completed';
        stageIndex++;
        stageProgress = 0;

        if (stageIndex < stages.length) {
          stages[stageIndex].status = 'in-progress';
        }
      } else {
        stages[stageIndex].status = 'in-progress';
      }

      setProgressStages([...stages]);
      setCurrentStage(stageIndex);

      // Calculate overall progress
      const completedStages = stages.filter(s => s.status === 'completed').length;
      const totalProgress = (completedStages / stages.length) * 100 +
                          (stageProgress / stages.length);
      setProgress(Math.min(totalProgress, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, progressStages.length]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Analyze image with PLC File Handler skill
    setIsAnalyzingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('platform', 'schneider'); // Default platform

      const response = await fetch('/api/analyze-sketch', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const analysis = await response.json();

        // Add analysis to chat
        const analysisMessage = `I've analyzed your P&ID/ladder logic diagram:

**Detected Elements:**
${analysis.summary || 'Image uploaded successfully. Please describe what you'd like me to do with this diagram.'}

What would you like me to do with this diagram? I can:
- Generate PLC code from this logic
- Explain the control sequence
- Create test scenarios
- Convert to a different PLC platform`;

        setChatHistory([...chatHistory, {
          role: 'assistant',
          content: analysisMessage
        }]);
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      setChatHistory([...chatHistory, {
        role: 'assistant',
        content: 'I received your diagram. Please describe what you\'d like me to do with it.'
      }]);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) return;

    setIsLoading(true);

    const userMessage = uploadedImage
      ? `${prompt}\n[Attached: ${uploadedImage.name}]`
      : prompt;

    setChatHistory([...chatHistory, { role: 'user', content: userMessage }]);

    // Initialize progress tracking
    const stages = getStagesForTab(activeTab);
    const totalTime = stages.reduce((sum, stage) => sum + stage.duration, 0);

    setProgressStages(stages.map(s => ({ ...s, status: 'pending' })));
    setCurrentStage(0);
    setProgress(0);
    setElapsedTime(0);
    setEstimatedTime(totalTime);
    setStartTime(Date.now());

    // Simulate AI response with stages
    setTimeout(() => {
      const response = generateMockResponse(prompt, activeTab);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
      if (activeTab === 'generate') {
        setGeneratedCode(response);
      }
      setIsLoading(false);
      setPrompt('');
      setStartTime(null);
    }, totalTime);
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

  // Format time helper
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Transparent Status Bar Overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin text-white" size={20} />
                <div>
                  <div className="text-white font-medium text-sm">
                    {progressStages[currentStage]?.name || 'Processing...'}
                  </div>
                  <div className="text-blue-100 text-xs">
                    Step {currentStage + 1} of {progressStages.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Progress percentage */}
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{progress.toFixed(0)}%</div>
                  <div className="text-blue-100 text-xs">Complete</div>
                </div>

                {/* Time tracking */}
                <div className="text-right border-l border-blue-400/50 pl-6">
                  <div className="text-white font-medium text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="text-blue-100 text-xs">
                    {estimatedTime - elapsedTime > 0
                      ? `${formatTime(estimatedTime - elapsedTime)} remaining`
                      : 'Finalizing...'}
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="w-32">
                  <div className="h-1.5 bg-blue-400/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stages progress dots */}
            <div className="mt-2 flex items-center gap-1">
              {progressStages.map((stage, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    stage.status === 'completed'
                      ? 'bg-green-400'
                      : stage.status === 'in-progress'
                      ? 'bg-white animate-pulse'
                      : 'bg-blue-400/30'
                  }`}
                  title={stage.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${isLoading ? 'mt-20' : ''}`}>
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
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-full max-w-2xl">
                    <div className="space-y-4">
                      {/* Header with spinner */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin text-blue-600" size={20} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {progressStages[currentStage]?.name || 'Processing...'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Clock size={14} />
                          <span>{(elapsedTime / 1000).toFixed(1)}s / {(estimatedTime / 1000).toFixed(1)}s</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">{progress.toFixed(0)}% Complete</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {estimatedTime - elapsedTime > 0
                              ? `~${((estimatedTime - elapsedTime) / 1000).toFixed(0)}s remaining`
                              : 'Finalizing...'}
                          </span>
                        </div>
                      </div>

                      {/* Stage indicators */}
                      <div className="flex items-center justify-between gap-1">
                        {progressStages.map((stage, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className={`w-full h-1 rounded-full transition-colors duration-300 ${
                                stage.status === 'completed'
                                  ? 'bg-green-500'
                                  : stage.status === 'in-progress'
                                  ? 'bg-blue-500 animate-pulse'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                            <div
                              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                                stage.status === 'completed'
                                  ? 'bg-green-500 border-green-500'
                                  : stage.status === 'in-progress'
                                  ? 'bg-blue-500 border-blue-500 scale-125'
                                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                              }`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Stage names */}
                      <div className="grid grid-cols-5 gap-1 text-xs">
                        {progressStages.map((stage, idx) => (
                          <div
                            key={idx}
                            className={`text-center transition-colors duration-300 ${
                              stage.status === 'completed'
                                ? 'text-green-600 dark:text-green-400 font-medium'
                                : stage.status === 'in-progress'
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-500 dark:text-gray-500'
                            }`}
                          >
                            {stage.status === 'completed' && '✓ '}
                            {stage.name.split(' ')[0]}
                          </div>
                        ))}
                      </div>
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
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {imagePreview ? 'Uploaded Diagram' : 'Generated Output'}
              </h3>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="diagram-upload"
                />
                <label
                  htmlFor="diagram-upload"
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  title="Upload P&ID or ladder logic diagram"
                >
                  <Upload size={16} />
                  <span className="text-sm hidden sm:inline">Upload Diagram</span>
                </label>
                {imagePreview && (
                  <button
                    onClick={() => {
                      setImagePreview('');
                      setUploadedImage(null);
                    }}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="h-[calc(100%-4rem)] overflow-y-auto p-4">
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-2">
                      <Upload size={16} />
                      <span className="font-semibold">P&ID / Ladder Logic Diagram Uploaded</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {uploadedImage?.name} ({(uploadedImage?.size || 0 / 1024).toFixed(1)} KB)
                    </p>
                    {isAnalyzingImage && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Loader2 className="animate-spin" size={14} />
                        Analyzing diagram with AI...
                      </div>
                    )}
                  </div>
                  <img
                    src={imagePreview}
                    alt="Uploaded diagram"
                    className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
                  />
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      💡 <strong>Tip:</strong> Describe what you'd like me to do with this diagram in the chat below.
                      I can generate code, explain the logic, create tests, or convert to different PLC platforms.
                    </p>
                  </div>
                </div>
              ) : generatedCode || chatHistory.filter(m => m.role === 'assistant').slice(-1)[0]?.content ? (
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Start a conversation to see generated code and results
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Upload size={16} />
                    <span>Or upload a P&ID/ladder logic diagram to get started</span>
                  </div>
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
