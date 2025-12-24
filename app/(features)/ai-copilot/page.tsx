'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Code, FileText, TestTube, Upload, Sparkles, Zap, CheckCircle, Clock, Loader2, Image as ImageIcon, X, FileImage } from 'lucide-react';

interface ProgressStage {
  name: string;
  duration: number;
  status: 'pending' | 'in-progress' | 'completed';
}

interface UploadedImage {
  file: File;
  preview: string;
  type: 'logic' | 'pid' | 'general';
}

export default function AICopilotPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain' | 'test'>('generate');
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string, images?: UploadedImage[]}>>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [showImageQuestions, setShowImageQuestions] = useState(false);
  const [imageQuestions, setImageQuestions] = useState({
    projectType: '',
    plcBrand: 'schneider',
    controllerModel: '',
    purpose: '',
    specialRequirements: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        // Auto-detect image type based on filename or prompt user
        const type = file.name.toLowerCase().includes('pid') ? 'pid' :
                     file.name.toLowerCase().includes('logic') || file.name.toLowerCase().includes('ladder') ? 'logic' :
                     'general';

        newImages.push({ file, preview, type });
      }
    });

    setUploadedImages(prev => [...prev, ...newImages]);

    // Show questions modal when images are uploaded
    if (newImages.length > 0) {
      setShowImageQuestions(true);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && uploadedImages.length === 0) return;

    setIsLoading(true);

    // Create enhanced chat history with images
    const userMessage = {
      role: 'user' as const,
      content: uploadedImages.length > 0
        ? `${prompt}\n\n[Uploaded ${uploadedImages.length} image(s): ${uploadedImages.map(img => `${img.type} diagram`).join(', ')}]`
        : prompt,
      images: uploadedImages.length > 0 ? [...uploadedImages] : undefined
    };

    setChatHistory([...chatHistory, userMessage]);

    // Initialize progress tracking - add image analysis stage if images present
    let stages = getStagesForTab(activeTab);

    if (uploadedImages.length > 0) {
      stages = [
        { name: 'Analyzing Images', duration: 2500, status: 'pending' as const },
        { name: 'Extracting Diagram Info', duration: 2000, status: 'pending' as const },
        ...stages
      ];
    }

    setProgressStages(stages.map(s => ({ ...s, status: 'pending' })));
    setCurrentStage(0);
    setProgress(0);
    setElapsedTime(0);
    setStartTime(Date.now());

    try {
      // Prepare images for API if present
      const imagesToSend = await Promise.all(uploadedImages.map(async (img) => {
        const base64 = await fileToBase64(img.file);
        return {
          data: base64.split(',')[1], // Remove data:image/jpeg;base64, prefix
          mediaType: img.file.type,
          type: img.type
        };
      }));

      // Call real Claude API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatHistory, userMessage].map(m => ({
            sender: m.role,
            content: m.content
          })),
          mode: activeTab,
          uploadedImages: imagesToSend
        }),
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const data = await response.json();
      const assistantResponse = data.message;

      setChatHistory(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      if (activeTab === 'generate') {
        setGeneratedCode(assistantResponse);
      }
      setIsLoading(false);
      setPrompt('');
      setUploadedImages([]);
      setStartTime(null);
    } catch (error) {
      console.error('AI generation error:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again or contact support if the issue persists.'
      }]);
      setIsLoading(false);
      setStartTime(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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
      {/* Image Questions Modal */}
      {showImageQuestions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    Understanding Your Requirements
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Help the AI better understand your uploaded diagrams
                  </p>
                </div>
                <button
                  onClick={() => setShowImageQuestions(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  What type of project is this?
                </label>
                <select
                  value={imageQuestions.projectType}
                  onChange={(e) => setImageQuestions({...imageQuestions, projectType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select project type...</option>
                  <option value="motor-control">Motor Control System</option>
                  <option value="process-control">Process Control</option>
                  <option value="conveyor">Conveyor System</option>
                  <option value="pump-station">Pump Station</option>
                  <option value="hvac">HVAC Control</option>
                  <option value="packaging">Packaging Machine</option>
                  <option value="custom">Custom Application</option>
                </select>
              </div>

              {/* PLC Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Target PLC Brand
                </label>
                <select
                  value={imageQuestions.plcBrand}
                  onChange={(e) => setImageQuestions({...imageQuestions, plcBrand: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="schneider">Schneider Electric (M221, M241, M251, M258)</option>
                  <option value="siemens">Siemens (S7-1200, S7-1500)</option>
                  <option value="rockwell">Rockwell/Allen-Bradley</option>
                  <option value="mitsubishi">Mitsubishi</option>
                  <option value="codesys">CODESYS (500+ brands)</option>
                </select>
              </div>

              {/* Controller Model */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Specific Controller Model (Optional)
                </label>
                <input
                  type="text"
                  value={imageQuestions.controllerModel}
                  onChange={(e) => setImageQuestions({...imageQuestions, controllerModel: e.target.value})}
                  placeholder="e.g., TM221CE24R, S7-1200, ControlLogix"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  What do you want the AI to do?
                </label>
                <select
                  value={imageQuestions.purpose}
                  onChange={(e) => setImageQuestions({...imageQuestions, purpose: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select purpose...</option>
                  <option value="generate-from-pid">Generate PLC code from P&ID</option>
                  <option value="convert-logic">Convert/migrate existing ladder logic</option>
                  <option value="analyze-diagram">Analyze and explain diagram</option>
                  <option value="optimize">Optimize existing code</option>
                  <option value="add-features">Add new features to existing project</option>
                  <option value="documentation">Generate documentation</option>
                </select>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Special Requirements or Notes
                </label>
                <textarea
                  value={imageQuestions.specialRequirements}
                  onChange={(e) => setImageQuestions({...imageQuestions, specialRequirements: e.target.value})}
                  placeholder="Any specific requirements, safety considerations, or notes about the diagrams..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Uploaded Images Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Uploaded Images ({uploadedImages.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-500">
                        <img src={img.preview} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 text-center">
                        {img.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowImageQuestions(false);
                  setUploadedImages([]);
                }}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowImageQuestions(false);
                  // Auto-populate prompt with question answers
                  const autoPrompt = `Project: ${imageQuestions.projectType || 'Custom'}
PLC: ${imageQuestions.plcBrand}${imageQuestions.controllerModel ? ` (${imageQuestions.controllerModel})` : ''}
Task: ${imageQuestions.purpose || 'Generate code'}
${imageQuestions.specialRequirements ? `\nRequirements: ${imageQuestions.specialRequirements}` : ''}

Please analyze the uploaded ${uploadedImages.length} diagram(s) and help me with this project.`;
                  setPrompt(autoPrompt);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} />
                Continue with AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}

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
                    {/* Display uploaded images for user messages */}
                    {message.role === 'user' && message.images && message.images.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {message.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative">
                            <div className="w-16 h-16 rounded border-2 border-blue-300 overflow-hidden">
                              <img
                                src={img.preview}
                                alt={`Uploaded ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 text-center">
                              {img.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
              {/* Image Previews */}
              {uploadedImages.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-500 dark:border-blue-400">
                        <img
                          src={img.preview}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 text-center">
                        {img.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image upload button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 dark:border-gray-600"
                  title="Upload P&ID or Logic Diagrams"
                >
                  <ImageIcon size={20} />
                </button>

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
                  disabled={isLoading || (!prompt.trim() && uploadedImages.length === 0)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  Send
                </button>
              </div>

              {/* Helper text */}
              {uploadedImages.length === 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <FileImage size={12} />
                  <span>Upload P&ID diagrams or ladder logic images to help AI understand your requirements</span>
                </div>
              )}
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
