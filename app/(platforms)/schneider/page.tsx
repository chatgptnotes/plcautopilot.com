import Link from 'next/link';

export default function SchneiderElectric() {
  const plcModels = [
    {
      series: 'Modicon M221',
      category: 'Compact PLCs',
      power: 'Entry-level',
      io: 'Up to 38 I/O',
      features: ['Machine Expert Basic', 'Ethernet', 'Modbus', 'Web Server'],
      applications: ['Simple machines', 'Small OEM equipment', 'Basic automation']
    },
    {
      series: 'Modicon M241/M251',
      category: 'Mid-range PLCs',
      power: 'Advanced control',
      io: 'Up to 264 I/O',
      features: ['Machine Expert', 'Motion control', 'IIoT ready', 'Cybersecurity'],
      applications: ['Packaging machines', 'Material handling', 'Process control']
    },
    {
      series: 'Modicon M258',
      category: 'High-performance',
      power: 'Complex automation',
      io: 'Up to 504 I/O',
      features: ['CAN/CANopen', 'Ethernet/IP', 'OPC UA', 'Advanced motion'],
      applications: ['Complex machines', 'Multi-axis systems', 'Industrial robots']
    },
    {
      series: 'Modicon M340',
      category: 'Process automation',
      power: 'Process control',
      io: 'Modular up to 1024 I/O',
      features: ['Hot swap', 'Redundancy', 'Unity Pro', 'HART protocol'],
      applications: ['Water treatment', 'Energy management', 'Building automation']
    },
    {
      series: 'Modicon M580',
      category: 'High-end PAC',
      power: 'Industrial-scale',
      io: 'Up to 3000 I/O',
      features: ['Cybersecurity certified', 'Hot standby', 'OPC UA server', 'EtherNet/IP'],
      applications: ['Oil & gas', 'Power generation', 'Large manufacturing']
    },
    {
      series: 'Modicon M580 ePAC',
      category: 'Embedded PAC',
      power: 'Edge computing',
      io: 'Integrated I/O',
      features: ['Docker containers', 'IT/OT convergence', 'Edge analytics', 'Cloud connectivity'],
      applications: ['IIoT applications', 'Edge computing', 'Smart manufacturing']
    }
  ];

  const aiFeatures = [
    {
      icon: 'smart_toy',
      title: 'AI Code Generation',
      description: 'Natural language to ladder logic, structured text, and function blocks for all Modicon PLCs',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: 'integration_instructions',
      title: 'EcoStruxure Integration',
      description: 'Seamless integration with EcoStruxure Automation Expert and Machine Expert',
      color: 'from-green-500 to-green-700'
    },
    {
      icon: 'sync',
      title: 'Modbus Master/Slave',
      description: 'Automatic Modbus TCP/RTU code generation for all Schneider PLCs',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: 'security',
      title: 'Cybersecurity Ready',
      description: 'Built-in security features compliant with IEC 62443 standards',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: 'cloud_upload',
      title: 'Cloud Connectivity',
      description: 'IoT gateway integration for cloud-based monitoring and analytics',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      icon: 'speed',
      title: 'Motion Control',
      description: 'Advanced motion control code generation for servo and stepper motors',
      color: 'from-orange-500 to-orange-700'
    }
  ];

  const programmingLanguages = [
    { name: 'Ladder Logic (LD)', support: '100%', description: 'Full graphical ladder programming' },
    { name: 'Structured Text (ST)', support: '100%', description: 'High-level text-based programming' },
    { name: 'Function Block (FBD)', support: '100%', description: 'Graphical function block diagrams' },
    { name: 'Sequential Function Chart (SFC)', support: '100%', description: 'Step-based control logic' },
    { name: 'Instruction List (IL)', support: '100%', description: 'Low-level assembler-like code' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            SCHNEIDER ELECTRIC
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Programming for
            <span className="block text-green-600">Schneider Electric Modicon PLCs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive support for the entire Modicon family: M221, M241, M251, M258, M340, M580, and M580 ePAC.
            From compact machines to industrial-scale process control.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/generator" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Generate Schneider Code
            </Link>
            <Link href="/hmi-generator" className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all">
              Create Vijeo HMI
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plcModels.map((model, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-green-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{model.series}</h3>
                  <p className="text-sm text-green-600 font-semibold">{model.category}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {model.power}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">I/O Capacity:</span> {model.io}
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
                      <span className="material-icons text-green-600 text-sm mt-0.5">check_circle</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">PLCAutoPilot AI Features for Schneider Electric</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <span className="material-icons text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-green-50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">IEC 61131-3 Language Support</h2>
          <p className="text-gray-600 mb-8">
            PLCAutoPilot supports all five IEC 61131-3 programming languages for Schneider Electric PLCs,
            with AI-powered code generation for Machine Expert and Unity Pro.
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
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: lang.support }}></div>
                  </div>
                  <span className="text-green-600 font-bold">{lang.support}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <span className="material-icons text-blue-600 text-5xl mb-4 block">code</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Example: Motor Control</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`(* Schneider M241 Motor Control *)
PROGRAM Motor_StartStop
VAR
    Start_Button: BOOL;
    Stop_Button: BOOL;
    Motor_Running: BOOL;
    Motor_Output: BOOL;
END_VAR

(* Start/Stop Logic *)
IF Start_Button AND NOT Motor_Running THEN
    Motor_Running := TRUE;
END_IF;

IF Stop_Button THEN
    Motor_Running := FALSE;
END_IF;

(* Output to motor *)
Motor_Output := Motor_Running;
END_PROGRAM`}
            </pre>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
            <span className="material-icons text-purple-600 text-5xl mb-4 block">device_hub</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Supported Protocols</h3>
            <ul className="space-y-3">
              {['Modbus TCP/RTU', 'Ethernet/IP', 'CANopen', 'OPC UA', 'MQTT', 'BACnet', 'Profinet'].map((protocol, index) => (
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Automate Your Schneider PLC Programming?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate production-ready code for any Modicon PLC in seconds. Support for Machine Expert, Unity Pro, and all EcoStruxure platforms.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/generator" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
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
