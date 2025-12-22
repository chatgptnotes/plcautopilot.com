export default function SimulationTesting() {
  const features = [
    {
      title: "Virtual PLC Runtime",
      description: "Test your programs without physical hardware. Run simulations entirely in your browser with our IEC 61131-3 compliant virtual PLC.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      benefit: "Reduce commissioning time by 60-80%"
    },
    {
      title: "AI Test Generation",
      description: "Our AI automatically generates 20-50 test cases from your program specification, covering edge cases you might miss.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefit: "Find bugs before production deployment"
    },
    {
      title: "Physics-Based Process Simulation",
      description: "Simulate motors, conveyors, tanks, and real-world physics to validate your control logic under realistic conditions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      benefit: "Eliminate costly hardware errors"
    },
    {
      title: "Safety Validation (SIL)",
      description: "Verify IEC 61508 safety integrity levels automatically. Ensure dual-channel safety circuits and response times meet requirements.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      benefit: "Meet safety standards with confidence"
    },
    {
      title: "Real-Time Debugging",
      description: "Step through ladder logic line-by-line. Watch variables change in real-time. Set breakpoints and inspect memory.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      benefit: "Debug 10x faster than on hardware"
    },
    {
      title: "Digital Twin Integration",
      description: "Create 3D virtual factories. Visualize your entire production line. Test multi-PLC coordination before building.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      benefit: "Visualize before you build"
    }
  ];

  const workflow = [
    {
      step: "1",
      title: "Generate Code",
      description: "AI creates your PLC program from specifications",
      time: "30 seconds"
    },
    {
      step: "2",
      title: "One-Click Simulate",
      description: "Launch virtual PLC in your browser",
      time: "Instant"
    },
    {
      step: "3",
      title: "Interactive Testing",
      description: "Toggle inputs, watch outputs, verify logic",
      time: "5 minutes"
    },
    {
      step: "4",
      title: "Auto Test Generation",
      description: "AI creates comprehensive test suite",
      time: "1 minute"
    },
    {
      step: "5",
      title: "Download Validated Code",
      description: "Production-ready, tested code for your PLC",
      time: "Instant"
    }
  ];

  const competitorComparison = [
    {
      competitor: "Siemens PLCSIM",
      price: "$2,500/license",
      platform: "Siemens only",
      deployment: "Windows desktop only",
      testing: "Manual",
      physics: "No"
    },
    {
      competitor: "Schneider EcoStruxure",
      price: "$1,500/year",
      platform: "Schneider only",
      deployment: "Desktop only",
      testing: "Manual",
      physics: "No"
    },
    {
      competitor: "Rockwell Emulate",
      price: "$3,000/license",
      platform: "Rockwell only",
      deployment: "Windows only",
      testing: "Manual",
      physics: "Limited"
    },
    {
      competitor: "PLCAutoPilot",
      price: "$0 extra (included)",
      platform: "500+ brands",
      deployment: "Web + Desktop",
      testing: "AI-automated",
      physics: "Full physics engine"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
            Industry-First Feature
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Test Before You Build
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            The only AI PLC platform with built-in simulation and automated testing. Eliminate costly errors before deployment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature.benefit}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            From Code to Confidence in Minutes
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-purple-200 dark:bg-purple-800" />
                )}
                <h4 className="font-bold text-gray-900 dark:text-white text-center mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-1">
                  {item.description}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 text-center font-semibold">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why PLCAutoPilot Simulation Leads the Market
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Product</th>
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Price</th>
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Platform Support</th>
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Deployment</th>
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Testing</th>
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Physics</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      item.competitor === 'PLCAutoPilot'
                        ? 'bg-purple-50 dark:bg-purple-900/20 font-semibold'
                        : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-gray-900 dark:text-white">{item.competitor}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.price}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.platform}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.deployment}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.testing}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.physics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Demo Preview */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                See It In Action
              </h3>
              <p className="text-purple-100 mb-6 text-lg">
                Watch our simulation engine run a complete conveyor system with sensors, motors, and safety interlocks. All in your browser, no downloads required.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time I/O monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interactive control panel</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visual trend charts</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated test results</span>
                </li>
              </ul>
              <a
                href="/generator"
                className="inline-block px-6 py-3 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-50 transition-colors"
              >
                Try Simulator Now
              </a>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border-4 border-purple-400">
              <div className="bg-gray-800 rounded p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-2 text-sm text-gray-400">PLCAutoPilot Simulator</span>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-blue-400">START_BUTTON</span>
                    <span className="text-green-400">TRUE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-blue-400">MOTOR_RUNNING</span>
                    <span className="text-green-400">TRUE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-blue-400">CONVEYOR_SPEED</span>
                    <span className="text-yellow-400">1750 RPM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-blue-400">SENSOR_COUNT</span>
                    <span className="text-yellow-400">42 parts</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">
                Live simulation running at 10Hz scan rate
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Test Your PLC Programs Risk-Free?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of engineers who are shipping better code faster with PLCAutoPilot simulation and testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/generator"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Start Free Simulation
            </a>
            <a
              href="/docs/SIMULATION_AND_TESTING.md"
              target="_blank"
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Read Technical Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
