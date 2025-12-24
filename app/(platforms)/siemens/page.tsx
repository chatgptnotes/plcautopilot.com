import Link from 'next/link';

export default function Siemens() {
  const plcModels = [
    {
      series: 'S7-1200',
      category: 'Basic Controller',
      power: 'Compact automation',
      io: 'Up to 1231 I/O',
      features: ['TIA Portal', 'Ethernet', 'Profinet', 'Integrated web server'],
      applications: ['Small machines', 'Building automation', 'Local control']
    },
    {
      series: 'S7-1500',
      category: 'Advanced Controller',
      power: 'High performance',
      io: 'Up to 32,768 I/O',
      features: ['Motion control', 'Safety integrated', 'OPC UA', 'Trace & diagnostics'],
      applications: ['Production lines', 'Process plants', 'Complex automation']
    },
    {
      series: 'S7-1500F',
      category: 'Failsafe Controller',
      power: 'Safety-critical',
      io: 'Safety I/O integrated',
      features: ['SIL 3 certified', 'F-Parameters', 'Safety program', 'PROFIsafe'],
      applications: ['Safety systems', 'Hazardous areas', 'Critical processes']
    },
    {
      series: 'S7-300',
      category: 'Modular Controller',
      power: 'Legacy systems',
      io: 'Modular expansion',
      features: ['STEP 7', 'Profibus', 'Multi-processor', 'Hot swap modules'],
      applications: ['Manufacturing', 'Water/wastewater', 'Legacy migration']
    },
    {
      series: 'S7-400',
      category: 'High-end PLC',
      power: 'Industrial-scale',
      io: 'Up to 65,536 I/O',
      features: ['Redundancy', 'Multi-computing', 'Process control', 'Communication'],
      applications: ['Oil & gas', 'Chemical plants', 'Large infrastructure']
    },
    {
      series: 'S7-1500T',
      category: 'Technology CPU',
      power: 'Motion & robotics',
      io: 'Integrated motion',
      features: ['Multi-axis control', 'Cam profiles', 'Servo control', 'Real-time sync'],
      applications: ['Packaging machines', 'Robotics', 'CNC systems']
    }
  ];

  const aiFeatures = [
    {
      icon: 'psychology',
      title: 'TIA Portal Integration',
      description: 'Direct export to TIA Portal V17/V18/V19 with full project structure',
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      icon: 'code',
      title: 'SCL Code Generation',
      description: 'Advanced Structured Control Language (SCL) code from natural language',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: 'memory',
      title: 'DB Management',
      description: 'Automatic data block (DB) creation and optimization',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: 'shield',
      title: 'Safety Programming',
      description: 'F-Program generation for S7-1500F failsafe controllers',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: 'settings',
      title: 'Motion Control',
      description: 'Servo positioning and multi-axis synchronization code',
      color: 'from-orange-500 to-orange-700'
    },
    {
      icon: 'network_check',
      title: 'Profinet & OPC UA',
      description: 'Communication setup for Industry 4.0 connectivity',
      color: 'from-teal-500 to-teal-700'
    }
  ];

  const programmingLanguages = [
    { name: 'Ladder Logic (LAD)', support: '100%', description: 'Traditional relay logic programming' },
    { name: 'Function Block Diagram (FBD)', support: '100%', description: 'Graphical function blocks' },
    { name: 'Structured Control Language (SCL)', support: '100%', description: 'Pascal-like high-level language' },
    { name: 'Statement List (STL)', support: '100%', description: 'Instruction-based programming' },
    { name: 'S7-Graph', support: '95%', description: 'Sequential control for S7-300/400/1500' },
    { name: 'S7-PLCSIM Advanced', support: '100%', description: 'Virtual commissioning support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold mb-4">
            SIEMENS - 35% GLOBAL MARKET LEADER
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Programming for
            <span className="block text-cyan-600">Siemens S7-1200, S7-1500, S7-300/400</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Europe's #1 PLC platform. Complete support for TIA Portal, STEP 7, WinCC, and all Simatic controllers.
            From basic automation to safety-critical industrial systems.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/generator" className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Generate Siemens Code
            </Link>
            <Link href="/hmi-generator" className="px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-all">
              Create WinCC HMI
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plcModels.map((model, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-cyan-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{model.series}</h3>
                  <p className="text-sm text-cyan-600 font-semibold">{model.category}</p>
                </div>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold">
                  {model.power}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">I/O:</span> {model.io}
              </p>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Features:</p>
                <div className="flex flex-wrap gap-2">
                  {model.features.map((feature, fIndex) => (
                    <span key={fIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Applications:</p>
                <ul className="space-y-1">
                  {model.applications.map((app, aIndex) => (
                    <li key={aIndex} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="material-icons text-cyan-600 text-sm mt-0.5">check_circle</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">PLCAutoPilot AI Features for Siemens</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <span className="material-icons text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-cyan-50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">TIA Portal Language Support</h2>
          <p className="text-gray-600 mb-8">
            Full support for all TIA Portal programming languages with AI-powered code generation.
            Compatible with TIA Portal V17, V18, and V19.
          </p>
          <div className="space-y-4">
            {programmingLanguages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{lang.name}</h3>
                  <p className="text-sm text-gray-600">{lang.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: lang.support }}></div>
                  </div>
                  <span className="text-cyan-600 font-bold">{lang.support}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <span className="material-icons text-blue-600 text-5xl mb-4 block">code</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Example: S7-1500 SCL Code</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`// S7-1500 Motor Control in SCL
FUNCTION_BLOCK FB_Motor
VAR_INPUT
    Start : BOOL;
    Stop : BOOL;
END_VAR
VAR_OUTPUT
    Running : BOOL;
    Motor_Q : BOOL;
END_VAR

// Start/Stop logic
IF Start AND NOT Running THEN
    Running := TRUE;
END_IF;

IF Stop THEN
    Running := FALSE;
END_IF;

// Motor output
Motor_Q := Running;

END_FUNCTION_BLOCK`}
            </pre>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
            <span className="material-icons text-purple-600 text-5xl mb-4 block">hub</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Communication Protocols</h3>
            <ul className="space-y-3">
              {['Profinet IO', 'Profibus DP', 'OPC UA Server/Client', 'Modbus TCP', 'Ethernet/IP', 'S7 Communication', 'MQTT Sparkplug'].map((protocol, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="font-semibold text-gray-900">{protocol}</span>
                  <span className="ml-auto px-3 py-1 bg-purple-600 text-white rounded-full text-xs">Supported</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dominate Europe with Siemens</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Siemens S7 holds 35% of the global PLC market and dominates Europe. Generate production-ready TIA Portal projects in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/generator" className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Start Generating Code
            </Link>
            <Link href="/" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all">
              View All Platforms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
