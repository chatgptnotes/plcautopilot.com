'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GeneratedProgram {
  content: string;
  filename: string;
  extension: string;
  model: string;
  manufacturer: string;
  programData?: {
    projectName: string;
    inputs: Array<{ address: string; symbol: string; comment: string }>;
    outputs: Array<{ address: string; symbol: string; comment: string }>;
    memory: Array<{ address: string; symbol: string; comment: string }>;
    timers?: Array<{ address: string; symbol: string; preset: number; comment: string }>;
    rungs: Array<{ name: string; comment: string; il: string[]; ladder: string }>;
  };
  aiGenerated: boolean;
}

// TM221 Models organized by category
const TM221_MODELS = {
  'Compact with Ethernet (CE)': [
    { id: 'TM221CE16R', name: 'TM221CE16R', io: '9 DI / 7 DO', type: 'Relay' },
    { id: 'TM221CE16T', name: 'TM221CE16T', io: '9 DI / 7 DO', type: 'Transistor Sink' },
    { id: 'TM221CE16U', name: 'TM221CE16U', io: '9 DI / 7 DO', type: 'Transistor Source' },
    { id: 'TM221CE24R', name: 'TM221CE24R', io: '14 DI / 10 DO', type: 'Relay' },
    { id: 'TM221CE24T', name: 'TM221CE24T', io: '14 DI / 10 DO', type: 'Transistor Sink' },
    { id: 'TM221CE24U', name: 'TM221CE24U', io: '14 DI / 10 DO', type: 'Transistor Source' },
    { id: 'TM221CE40R', name: 'TM221CE40R', io: '24 DI / 16 DO / 2 AI', type: 'Relay' },
    { id: 'TM221CE40T', name: 'TM221CE40T', io: '24 DI / 16 DO / 2 AI', type: 'Transistor Sink' },
    { id: 'TM221CE40U', name: 'TM221CE40U', io: '24 DI / 16 DO / 2 AI', type: 'Transistor Source' },
  ],
  'Compact without Ethernet (C)': [
    { id: 'TM221C16R', name: 'TM221C16R', io: '9 DI / 7 DO', type: 'Relay' },
    { id: 'TM221C16T', name: 'TM221C16T', io: '9 DI / 7 DO', type: 'Transistor Sink' },
    { id: 'TM221C16U', name: 'TM221C16U', io: '9 DI / 7 DO', type: 'Transistor Source' },
    { id: 'TM221C24R', name: 'TM221C24R', io: '14 DI / 10 DO', type: 'Relay' },
    { id: 'TM221C24T', name: 'TM221C24T', io: '14 DI / 10 DO', type: 'Transistor Sink' },
    { id: 'TM221C24U', name: 'TM221C24U', io: '14 DI / 10 DO', type: 'Transistor Source' },
    { id: 'TM221C40R', name: 'TM221C40R', io: '24 DI / 16 DO / 2 AI', type: 'Relay' },
    { id: 'TM221C40T', name: 'TM221C40T', io: '24 DI / 16 DO / 2 AI', type: 'Transistor Sink' },
    { id: 'TM221C40U', name: 'TM221C40U', io: '24 DI / 16 DO / 2 AI', type: 'Transistor Source' },
  ],
  'Book/Modular (M)': [
    { id: 'TM221M16R', name: 'TM221M16R', io: '8 DI / 8 DO', type: 'Relay' },
    { id: 'TM221M16T', name: 'TM221M16T', io: '8 DI / 8 DO', type: 'Transistor Sink' },
    { id: 'TM221M32TK', name: 'TM221M32TK', io: '16 DI / 16 DO', type: 'Transistor Sink + CANopen' },
  ],
};

const examplePrompts = [
  {
    title: 'Motor Start/Stop',
    description: 'Motor start/stop with START button, STOP button, and overload protection. Include seal-in circuit and running indicator light.',
  },
  {
    title: 'Traffic Light',
    description: 'Traffic light controller with RED, YELLOW, GREEN lights. RED for 30 seconds, GREEN for 25 seconds, YELLOW for 5 seconds. Include pedestrian crossing button.',
  },
  {
    title: 'Tank Level Control',
    description: 'Dual tank level control. Pump 1 fills Tank 1 when low. Pump 2 transfers from Tank 1 to Tank 2 when Tank 2 is low AND Tank 1 is high. Include level switches and overload protection.',
  },
  {
    title: 'Conveyor System',
    description: 'Conveyor belt with 3 stations. Start button begins sequence. Sensor at each station stops conveyor for 5 seconds. Emergency stop halts everything.',
  },
];

export default function AIGeneratorPage() {
  const [description, setDescription] = useState('');
  const [plcModel, setPlcModel] = useState('TM221CE16T');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProgram, setGeneratedProgram] = useState<GeneratedProgram | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'io' | 'ladder'>('io');

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe your control logic');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedProgram(null);

    try {
      const response = await fetch('/api/generate-plc-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          plcModel,
          manufacturer: 'Schneider Electric',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await response.json();
      setGeneratedProgram(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate program');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedProgram) return;

    const blob = new Blob([generatedProgram.content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedProgram.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const useExample = (example: typeof examplePrompts[0]) => {
    setDescription(example.description);
    setGeneratedProgram(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-white font-bold text-xl">PLCAutoPilot</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/generator" className="text-gray-300 hover:text-white transition">
              Standard Generator
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            AI-Powered PLC Generator
          </h1>
          <p className="text-gray-400 text-lg">
            Describe your control logic in plain English. Gemini AI generates production-ready PLC code.
          </p>
          <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-green-400 text-sm">Powered by Google Gemini AI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Description Input */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Describe Your Control Logic
              </h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: Create a motor start/stop circuit with a START button, STOP button, and overload relay protection. Include a seal-in circuit and running indicator light."
                className="w-full h-40 bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* PLC Model Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Select TM221 PLC Model
              </h2>
              <select
                value={plcModel}
                onChange={(e) => setPlcModel(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(TM221_MODELS).map(([category, models]) => (
                  <optgroup key={category} label={category}>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.io}) - {model.type}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="mt-3 p-3 bg-black/20 rounded-lg">
                <p className="text-gray-400 text-sm">
                  <span className="text-green-400 font-medium">21 TM221 models</span> supported:
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">R = Relay</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded">T = Transistor Sink</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">U = Transistor Source</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">CE = Ethernet</span>
                </div>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Example Templates
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => useExample(example)}
                    className="text-left p-3 bg-black/20 rounded-lg border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition"
                  >
                    <span className="text-white font-medium text-sm">{example.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI is Generating Your Program...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate with AI
                </span>
              )}
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 min-h-[600px]">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Generated Program
                </span>
                {generatedProgram && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    AI Generated
                  </span>
                )}
              </h2>

              {generatedProgram ? (
                <div className="space-y-4">
                  {/* Success Banner */}
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400 font-medium">Program Generated Successfully</span>
                    </div>
                    <p className="text-green-300/70 text-sm mt-1">
                      {generatedProgram.filename} for {generatedProgram.model}
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-2 border-b border-white/10 pb-2">
                    {(['io', 'ladder', 'code'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
                          activeTab === tab
                            ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab === 'io' ? 'I/O Table' : tab === 'ladder' ? 'Ladder Logic' : 'XML Code'}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="bg-black/30 rounded-lg p-4 max-h-80 overflow-auto">
                    {activeTab === 'io' && generatedProgram.programData && (
                      <div className="space-y-4">
                        {/* Inputs */}
                        <div>
                          <h4 className="text-blue-400 font-medium mb-2">Digital Inputs</h4>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-gray-500">
                                <th className="text-left py-1">Address</th>
                                <th className="text-left py-1">Symbol</th>
                                <th className="text-left py-1">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {generatedProgram.programData.inputs.map((input, i) => (
                                <tr key={i} className="text-gray-300 border-t border-white/5">
                                  <td className="py-1 font-mono text-green-400">{input.address}</td>
                                  <td className="py-1 font-mono">{input.symbol}</td>
                                  <td className="py-1 text-gray-400">{input.comment}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Outputs */}
                        <div>
                          <h4 className="text-orange-400 font-medium mb-2">Digital Outputs</h4>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-gray-500">
                                <th className="text-left py-1">Address</th>
                                <th className="text-left py-1">Symbol</th>
                                <th className="text-left py-1">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {generatedProgram.programData.outputs.map((output, i) => (
                                <tr key={i} className="text-gray-300 border-t border-white/5">
                                  <td className="py-1 font-mono text-orange-400">{output.address}</td>
                                  <td className="py-1 font-mono">{output.symbol}</td>
                                  <td className="py-1 text-gray-400">{output.comment}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Memory */}
                        {generatedProgram.programData.memory.length > 0 && (
                          <div>
                            <h4 className="text-purple-400 font-medium mb-2">Memory Bits</h4>
                            <table className="w-full text-sm">
                              <tbody>
                                {generatedProgram.programData.memory.map((mem, i) => (
                                  <tr key={i} className="text-gray-300 border-t border-white/5">
                                    <td className="py-1 font-mono text-purple-400">{mem.address}</td>
                                    <td className="py-1 font-mono">{mem.symbol}</td>
                                    <td className="py-1 text-gray-400">{mem.comment}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Timers */}
                        {generatedProgram.programData.timers && generatedProgram.programData.timers.length > 0 && (
                          <div>
                            <h4 className="text-yellow-400 font-medium mb-2">Timers</h4>
                            <table className="w-full text-sm">
                              <tbody>
                                {generatedProgram.programData.timers.map((timer, i) => (
                                  <tr key={i} className="text-gray-300 border-t border-white/5">
                                    <td className="py-1 font-mono text-yellow-400">{timer.address}</td>
                                    <td className="py-1 font-mono">{timer.symbol}</td>
                                    <td className="py-1 text-gray-400">{timer.preset}s - {timer.comment}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'ladder' && generatedProgram.programData && (
                      <div className="space-y-4">
                        {generatedProgram.programData.rungs.map((rung, i) => (
                          <div key={i} className="border border-white/10 rounded-lg p-3">
                            <h4 className="text-white font-medium mb-2">
                              Rung {i + 1}: {rung.name}
                            </h4>
                            <p className="text-gray-400 text-sm mb-2">{rung.comment}</p>
                            <div className="bg-black/50 rounded p-2 font-mono text-xs">
                              {rung.il.map((instruction, j) => (
                                <div key={j} className="text-green-400">{instruction}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'code' && (
                      <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                        {generatedProgram.content.substring(0, 3000)}
                        {generatedProgram.content.length > 3000 && '\n\n... (truncated for display)'}
                      </pre>
                    )}
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download {generatedProgram.extension} File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg mb-2">Your AI-generated program will appear here</p>
                  <p className="text-gray-500 text-sm">Describe your logic and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-xs text-gray-500 text-center py-8 mt-8 border-t border-white/10">
          PLCAutoPilot v1.5 | AI-Powered PLC Programming | Last Updated: 2025-12-25 | github.com/chatgptnotes/plcautopilot.com
        </footer>
      </main>
    </div>
  );
}
