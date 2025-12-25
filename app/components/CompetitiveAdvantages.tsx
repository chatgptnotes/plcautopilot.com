export default function CompetitiveAdvantages() {
  const advantages = [
    {
      title: "One Tool for All PLCs",
      subtitle: "500+ PLC Brands Supported",
      description: "Not just Siemens. Not just Schneider. Support for 500+ PLC brands via CODESYS, plus direct integration with Schneider, Siemens, Rockwell, and Mitsubishi.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      comparison: "Competitors lock you into a single vendor",
      savings: "No vendor lock-in"
    },
    {
      title: "Your Data Stays Yours",
      subtitle: "On-Premises AI Deployment",
      description: "Run PLCAutoPilot completely offline with local AI models. Perfect for air-gapped networks, defense contractors, and companies with strict data sovereignty requirements.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      comparison: "Competitors require cloud connectivity",
      savings: "100% data privacy"
    },
    {
      title: "20-50x More Affordable",
      subtitle: "Professional Tools at Startup Prices",
      description: "Starting at just $20/month vs. $5,000-10,000/year from major vendors. Get the same AI-powered automation without the enterprise price tag.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      comparison: "Siemens: $5K-10K/year, Schneider: Similar",
      savings: "Save $4,780-9,880/year"
    },
    {
      title: "Complete End-to-End Solution",
      subtitle: "From Idea to Running Machine",
      description: "Not just code generation. Get ladder logic, HMI screens, safety interlocks, motion control, and testing - all in one platform.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      comparison: "Competitors offer code generation only",
      savings: "80% time reduction"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            Why PLCAutoPilot Leads the Market
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Built Different. Built Better.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            While others lock you into their ecosystem, we give you freedom, flexibility, and massive cost savings
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white">
                    {advantage.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {advantage.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {advantage.description}
                  </p>

                  {/* Comparison */}
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-medium">{advantage.comparison}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">PLCAutoPilot: {advantage.savings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">500+</div>
              <div className="text-blue-200 font-medium">PLC Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">20-50x</div>
              <div className="text-blue-200 font-medium">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">80%</div>
              <div className="text-blue-200 font-medium">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">100%</div>
              <div className="text-blue-200 font-medium">Data Privacy</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/generator"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Try PLCAutoPilot Free
          </a>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            No credit card required. Start generating PLC code in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
