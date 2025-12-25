'use client';

import { useState } from 'react';

// All 21 TM221 Models
const TM221_MODELS = {
  'Compact with Ethernet (CE)': [
    { id: 'TM221CE16R', di: 9, do: 7, ai: 0, type: 'Relay' },
    { id: 'TM221CE16T', di: 9, do: 7, ai: 0, type: 'Transistor Sink' },
    { id: 'TM221CE16U', di: 9, do: 7, ai: 0, type: 'Transistor Source' },
    { id: 'TM221CE24R', di: 14, do: 10, ai: 0, type: 'Relay' },
    { id: 'TM221CE24T', di: 14, do: 10, ai: 0, type: 'Transistor Sink' },
    { id: 'TM221CE24U', di: 14, do: 10, ai: 0, type: 'Transistor Source' },
    { id: 'TM221CE40R', di: 24, do: 16, ai: 2, type: 'Relay' },
    { id: 'TM221CE40T', di: 24, do: 16, ai: 2, type: 'Transistor Sink' },
    { id: 'TM221CE40U', di: 24, do: 16, ai: 2, type: 'Transistor Source' },
  ],
  'Compact without Ethernet (C)': [
    { id: 'TM221C16R', di: 9, do: 7, ai: 0, type: 'Relay' },
    { id: 'TM221C16T', di: 9, do: 7, ai: 0, type: 'Transistor Sink' },
    { id: 'TM221C16U', di: 9, do: 7, ai: 0, type: 'Transistor Source' },
    { id: 'TM221C24R', di: 14, do: 10, ai: 0, type: 'Relay' },
    { id: 'TM221C24T', di: 14, do: 10, ai: 0, type: 'Transistor Sink' },
    { id: 'TM221C24U', di: 14, do: 10, ai: 0, type: 'Transistor Source' },
    { id: 'TM221C40R', di: 24, do: 16, ai: 2, type: 'Relay' },
    { id: 'TM221C40T', di: 24, do: 16, ai: 2, type: 'Transistor Sink' },
    { id: 'TM221C40U', di: 24, do: 16, ai: 2, type: 'Transistor Source' },
  ],
  'Book/Modular (M)': [
    { id: 'TM221M16R', di: 8, do: 8, ai: 0, type: 'Relay' },
    { id: 'TM221M16T', di: 8, do: 8, ai: 0, type: 'Transistor Sink' },
    { id: 'TM221M32TK', di: 16, do: 16, ai: 0, type: 'Transistor Sink + CANopen' },
  ],
};

// Get model specs
function getModelSpecs(modelId: string) {
  for (const category of Object.values(TM221_MODELS)) {
    const model = category.find(m => m.id === modelId);
    if (model) return model;
  }
  return null;
}

// Example templates
const TEMPLATES = [
  {
    name: 'Motor Start/Stop',
    description: 'Motor control with START, STOP buttons, overload protection, and running indicator',
    logic: `Motor Start/Stop Control:
- START button (%I0.0) - Normally Open
- STOP button (%I0.1) - Normally Closed
- Overload relay (%I0.2) - Normally Closed
- Motor output (%Q0.0)
- Running light (%Q0.1)
Include seal-in circuit for latching operation.`,
  },
  {
    name: 'Sequential Lights',
    description: '3 lights turning on sequentially with time delays',
    logic: `Sequential Light Control:
- START button (%I0.0)
- STOP button (%I0.1)
- Light 1 (%Q0.0) - ON immediately when started
- Light 2 (%Q0.1) - ON after 3 seconds
- Light 3 (%Q0.2) - ON after 6 seconds
Use TON timers for delays.`,
  },
  {
    name: 'Tank Level Control',
    description: 'Dual tank level control with pumps',
    logic: `Dual Tank Level Control:
- Tank 1 Level Switch (%I0.0) - 0=Low, 1=High
- Tank 2 Level Switch (%I0.1) - 0=Low, 1=High
- Pump 1 (%Q0.0) - Fills Tank 1 when low
- Pump 2 (%Q0.1) - Transfers from Tank 1 to Tank 2
Pump 2 only runs when Tank 2 is LOW AND Tank 1 is HIGH (dry-run protection).`,
  },
  {
    name: 'Traffic Light',
    description: 'Traffic light sequence with pedestrian crossing',
    logic: `Traffic Light Controller:
- Pedestrian button (%I0.0)
- RED light (%Q0.0) - 30 seconds
- YELLOW light (%Q0.1) - 5 seconds
- GREEN light (%Q0.2) - 25 seconds
Normal sequence: GREEN -> YELLOW -> RED -> GREEN
Pedestrian request interrupts green phase.`,
  },
  {
    name: 'Conveyor Control',
    description: 'Conveyor with stations and sensors',
    logic: `Conveyor Belt Control:
- Start button (%I0.0)
- Stop button (%I0.1)
- Sensor 1 (%I0.2) - Station 1 detector
- Sensor 2 (%I0.3) - Station 2 detector
- Conveyor motor (%Q0.0)
- Station 1 indicator (%Q0.1)
- Station 2 indicator (%Q0.2)
Stop conveyor for 5 seconds at each station when sensor detects item.`,
  },
  {
    name: 'Star-Delta Starter',
    description: 'Motor star-delta starting sequence',
    logic: `Star-Delta Motor Starter:
- START button (%I0.0) - NO
- STOP button (%I0.1) - NC
- Overload (%I0.2) - NC
- Main contactor (%Q0.0)
- Star contactor (%Q0.1)
- Delta contactor (%Q0.2)
- Running light (%Q0.3)
Sequence: Start in STAR for 5 seconds, then switch to DELTA.
Interlock: Star and Delta cannot be ON simultaneously.`,
  },
];

interface GeneratedProgram {
  content: string;
  filename: string;
  programData?: {
    inputs: Array<{ address: string; symbol: string; comment: string }>;
    outputs: Array<{ address: string; symbol: string; comment: string }>;
    memory: Array<{ address: string; symbol: string; comment: string }>;
    timers?: Array<{ address: string; symbol: string; preset: number; comment: string }>;
    rungs: Array<{ name: string; comment: string; il: string[] }>;
  };
}

export default function M221GeneratorPage() {
  const [selectedModel, setSelectedModel] = useState('TM221CE16T');
  const [logic, setLogic] = useState('');
  const [projectName, setProjectName] = useState('M221_Program');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProgram, setGeneratedProgram] = useState<GeneratedProgram | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'io' | 'ladder' | 'il' | 'xml'>('io');

  const modelSpecs = getModelSpecs(selectedModel);

  const handleGenerate = async () => {
    if (!logic.trim()) {
      setError('Please enter your control logic description');
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
          description: logic,
          plcModel: selectedModel,
          manufacturer: 'Schneider Electric',
          projectName: projectName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Generation failed');
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
    a.download = generatedProgram.filename || `${projectName}.smbp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const useTemplate = (template: typeof TEMPLATES[0]) => {
    setLogic(template.logic);
    setProjectName(template.name.replace(/\s+/g, '_'));
    setGeneratedProgram(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">M221 Program Generator</h1>
              <p className="text-sm text-gray-500">Schneider Electric Modicon M221 - All 21 Models Supported</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                AI Powered
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Model & Project Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Select PLC Model</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TM221 Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(TM221_MODELS).map(([category, models]) => (
                      <optgroup key={category} label={category}>
                        {models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.id} ({model.di} DI / {model.do} DO{model.ai > 0 ? ` / ${model.ai} AI` : ''})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value.replace(/\s+/g, '_'))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
              </div>

              {/* Model Specs Display */}
              {modelSpecs && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-blue-800">
                      <strong>Inputs:</strong> %I0.0 - %I0.{modelSpecs.di - 1}
                    </span>
                    <span className="text-blue-800">
                      <strong>Outputs:</strong> %Q0.0 - %Q0.{modelSpecs.do - 1}
                    </span>
                    <span className="text-blue-800">
                      <strong>Type:</strong> {modelSpecs.type}
                    </span>
                    {modelSpecs.ai > 0 && (
                      <span className="text-blue-800">
                        <strong>Analog:</strong> %IW0.0 - %IW0.{modelSpecs.ai - 1}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logic Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Describe Your Control Logic</h2>
              <textarea
                value={logic}
                onChange={(e) => setLogic(e.target.value)}
                className="w-full h-64 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder={`Describe your control logic in detail. Include:
- Input devices (buttons, switches, sensors) with addresses
- Output devices (motors, lights, valves) with addresses
- Timing requirements (delays, sequences)
- Safety interlocks and emergency stop logic
- Any special conditions or logic rules

Example:
Motor Start/Stop Control:
- START button (%I0.0) - Normally Open
- STOP button (%I0.1) - Normally Closed
- Motor output (%Q0.0)
Include seal-in circuit for latching.`}
              />
              <p className="mt-2 text-sm text-gray-500">
                Be specific about I/O addresses, timing, and logic conditions for best results.
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !logic.trim()}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Program...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate M221 Program
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Templates */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h2>
              <div className="space-y-3">
                {TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => useTemplate(template)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h2>
              <div className="text-sm space-y-3">
                <div>
                  <div className="font-medium text-gray-700">Addressing</div>
                  <div className="text-gray-500 font-mono text-xs mt-1">
                    %I0.x - Digital Inputs<br/>
                    %Q0.x - Digital Outputs<br/>
                    %M0-1023 - Memory Bits<br/>
                    %TM0-254 - Timers<br/>
                    %C0-254 - Counters
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Timer Types</div>
                  <div className="text-gray-500 text-xs mt-1">
                    TON - On-Delay Timer<br/>
                    TOF - Off-Delay Timer<br/>
                    TP - Pulse Timer
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Contact Types</div>
                  <div className="text-gray-500 text-xs mt-1">
                    NO - Normally Open<br/>
                    NC - Normally Closed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Program Output */}
        {generatedProgram && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generated Program</h2>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .smbp
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <nav className="flex space-x-4">
                {(['io', 'ladder', 'il', 'xml'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 font-medium text-sm border-b-2 transition ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'io' ? 'I/O Table' : tab === 'ladder' ? 'Ladder Logic' : tab === 'il' ? 'IL Code' : 'XML Code'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
              {activeTab === 'io' && generatedProgram.programData && (
                <div className="space-y-6">
                  {/* Inputs Table */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Digital Inputs</h3>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left py-2 px-3">Address</th>
                          <th className="text-left py-2 px-3">Symbol</th>
                          <th className="text-left py-2 px-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedProgram.programData.inputs.map((input, i) => (
                          <tr key={i} className="border-t border-gray-200">
                            <td className="py-2 px-3 font-mono text-blue-600">{input.address}</td>
                            <td className="py-2 px-3 font-mono">{input.symbol}</td>
                            <td className="py-2 px-3 text-gray-600">{input.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Outputs Table */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Digital Outputs</h3>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left py-2 px-3">Address</th>
                          <th className="text-left py-2 px-3">Symbol</th>
                          <th className="text-left py-2 px-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedProgram.programData.outputs.map((output, i) => (
                          <tr key={i} className="border-t border-gray-200">
                            <td className="py-2 px-3 font-mono text-orange-600">{output.address}</td>
                            <td className="py-2 px-3 font-mono">{output.symbol}</td>
                            <td className="py-2 px-3 text-gray-600">{output.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Memory Bits */}
                  {generatedProgram.programData.memory.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Memory Bits</h3>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left py-2 px-3">Address</th>
                            <th className="text-left py-2 px-3">Symbol</th>
                            <th className="text-left py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedProgram.programData.memory.map((mem, i) => (
                            <tr key={i} className="border-t border-gray-200">
                              <td className="py-2 px-3 font-mono text-purple-600">{mem.address}</td>
                              <td className="py-2 px-3 font-mono">{mem.symbol}</td>
                              <td className="py-2 px-3 text-gray-600">{mem.comment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Timers */}
                  {generatedProgram.programData.timers && generatedProgram.programData.timers.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Timers</h3>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left py-2 px-3">Address</th>
                            <th className="text-left py-2 px-3">Symbol</th>
                            <th className="text-left py-2 px-3">Preset</th>
                            <th className="text-left py-2 px-3">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedProgram.programData.timers.map((timer, i) => (
                            <tr key={i} className="border-t border-gray-200">
                              <td className="py-2 px-3 font-mono text-yellow-600">{timer.address}</td>
                              <td className="py-2 px-3 font-mono">{timer.symbol}</td>
                              <td className="py-2 px-3">{timer.preset}s</td>
                              <td className="py-2 px-3 text-gray-600">{timer.comment}</td>
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
                    <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="font-medium text-gray-900 mb-1">Rung {i + 1}: {rung.name}</div>
                      <div className="text-sm text-gray-500 mb-3">{rung.comment}</div>
                      <div className="bg-gray-900 rounded p-3 font-mono text-xs">
                        {rung.il.map((line, j) => (
                          <div key={j} className="text-green-400">{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'il' && generatedProgram.programData && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Instruction List (IL) Code</h3>
                      <span className="text-xs text-gray-500">IEC 61131-3 Standard</span>
                    </div>
                    <div className="bg-gray-900 rounded p-4 font-mono text-sm space-y-4">
                      {generatedProgram.programData.rungs.map((rung, i) => (
                        <div key={i} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                          <div className="text-yellow-400 mb-2">
                            (* ===== {rung.name} ===== *)
                          </div>
                          <div className="text-gray-400 text-xs mb-2">
                            (* {rung.comment} *)
                          </div>
                          {rung.il.map((line, j) => (
                            <div key={j} className="text-green-400 pl-2">
                              {line}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <div className="text-xs text-blue-800">
                        <strong>IL Instructions:</strong> LD (Load), ST (Store), AND, OR, ANDN (AND NOT),
                        ORN (OR NOT), TON (Timer On-Delay), TOF (Timer Off-Delay), CTU (Count Up)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'xml' && (
                <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">
                  {generatedProgram.content.substring(0, 5000)}
                  {generatedProgram.content.length > 5000 && '\n\n... (truncated)'}
                </pre>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recommended: Use IL Code Tab
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  For best compatibility with EcoStruxure Machine Expert:
                </p>
                <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1 ml-2">
                  <li>Click the <strong>"IL Code"</strong> tab above</li>
                  <li>Copy the Instruction List code</li>
                  <li>Create a new project in EcoStruxure Machine Expert - Basic</li>
                  <li>Paste the IL code into your program</li>
                  <li>The software will automatically convert to ladder logic</li>
                </ol>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Alternative: Direct .smbp Import</h3>
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Download the .smbp file using the button above</li>
                  <li>Open EcoStruxure Machine Expert - Basic</li>
                  <li>File → Open → Select the downloaded file</li>
                  <li>If file error occurs, use the IL Code method instead</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2 italic">
                  Note: Due to Schneider's proprietary format, some files may require the IL Code import method.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-400 py-4">
          PLCAutoPilot M221 Generator v1.0 | All 21 TM221 Models Supported | 2025-12-25
        </footer>
      </main>
    </div>
  );
}
