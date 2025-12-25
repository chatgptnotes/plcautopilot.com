export default function OnPremises() {
  const features = [
    {
      title: "Air-Gapped Networks",
      description: "Works in facilities with zero internet access. Perfect for defense, aerospace, and critical infrastructure.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Local AI Models",
      description: "CodeLlama 34B, DeepSeek Coder, or Mistral 7B running on your hardware. No cloud dependency.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Complete IP Protection",
      description: "Your code and designs never leave your network. Perfect for proprietary processes and trade secrets.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Unlimited Usage",
      description: "No per-use fees. No API rate limits. Generate as many programs as you need, 24/7.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Compliance Ready",
      description: "ITAR, EAR, ISO 27001, IEC 62443 compliant. Audit logs and security features built-in.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Predictable Performance",
      description: "Dedicated hardware ensures consistent response times. No network latency or cloud outages.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const models = [
    {
      name: "CodeLlama 34B",
      type: "Recommended",
      performance: "Best balance of quality and speed",
      hardware: "64GB RAM, RTX 4090 (24GB VRAM)",
      useCase: "Production environments"
    },
    {
      name: "DeepSeek Coder 33B",
      type: "Advanced",
      performance: "94% effectiveness (vs Copilot 89%)",
      hardware: "64GB RAM, RTX 4090 (24GB VRAM)",
      useCase: "Complex algorithms"
    },
    {
      name: "Mistral 7B",
      type: "Budget",
      performance: "Good for simple programs",
      hardware: "16GB RAM, RTX 3060 (8GB VRAM)",
      useCase: "Small facilities"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-4">
            Enterprise On-Premises Deployment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Your Network. Your AI. Your Data.
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Run PLCAutoPilot completely offline with local AI models. No internet required. No data leaving your facility.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors border border-gray-700"
            >
              <div className="text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Models */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Choose Your Local AI Model
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 ${
                  model.type === 'Recommended'
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                {model.type === 'Recommended' && (
                  <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold mb-3">
                    RECOMMENDED
                  </div>
                )}
                <h4 className="text-xl font-bold mb-2">{model.name}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="font-semibold">Performance:</span> {model.performance}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Hardware:</span> {model.hardware}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Best for:</span> {model.useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Steps */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Simple Installation Process
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Install Ollama", desc: "One-click installer for Windows, Linux, or macOS" },
              { step: "2", title: "Pull AI Model", desc: "Download CodeLlama 34B or your preferred model" },
              { step: "3", title: "Install PLCAutoPilot", desc: "Enterprise installer with offline activation" },
              { step: "4", title: "Start Generating", desc: "Create PLC programs without internet" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/docs/ON_PREMISES_DEPLOYMENT.md"
              target="_blank"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Complete Installation Guide
            </a>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">On-premises deployment included in Enterprise Plan</p>
          <div className="inline-block bg-gray-800 rounded-xl px-8 py-6 border border-gray-700">
            <div className="text-4xl font-bold mb-2">$120<span className="text-lg text-gray-400">/month</span></div>
            <div className="text-gray-400 mb-4">or $1,200/year</div>
            <ul className="text-left space-y-2 text-sm mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited offline program generation
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All PLC platforms (500+ brands)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated support engineer
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom AI model training
              </li>
            </ul>
            <a
              href="/subscription/plans"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Get Started with Enterprise
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
