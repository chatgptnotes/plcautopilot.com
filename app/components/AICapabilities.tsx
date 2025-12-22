'use client';

import Link from 'next/link';
import { Sparkles, Code, FileText, TestTube, Zap, BookOpen, TrendingUp, CheckCircle } from 'lucide-react';

export default function AICapabilities() {
  const capabilities = [
    {
      icon: Code,
      title: 'AI Code Generation',
      description: 'Convert natural language descriptions into production-ready PLC code in seconds',
      link: '/ai-copilot',
      color: 'blue',
      stats: '40-50% faster development',
      features: [
        'IEC 61131-3 compliant code',
        'Multi-platform support',
        'Instant code generation',
        'Context-aware suggestions'
      ]
    },
    {
      icon: FileText,
      title: 'Code Explanation',
      description: 'Understand legacy code with detailed explanations and flow diagrams',
      link: '/ai-copilot',
      color: 'purple',
      stats: '10x faster understanding',
      features: [
        'Line-by-line explanations',
        'Flow diagram generation',
        'Variable documentation',
        'Logic breakdown'
      ]
    },
    {
      icon: TestTube,
      title: 'Test Generation',
      description: 'Auto-generate comprehensive test cases and validate your programs',
      link: '/ai-copilot',
      color: 'green',
      stats: '100% test coverage',
      features: [
        'Automated test scenarios',
        'Bug detection',
        'Validation testing',
        'Troubleshooting guides'
      ]
    },
    {
      icon: Sparkles,
      title: 'Application Generator',
      description: 'Build complete automation solutions from specifications and P&IDs',
      link: '/ai-application-generator',
      color: 'orange',
      stats: '80% time savings',
      features: [
        'Document analysis',
        'Asset instantiation',
        'Sequence generation',
        'HMI creation'
      ]
    },
    {
      icon: Zap,
      title: 'Code Optimization',
      description: 'Modernize legacy code and improve performance automatically',
      link: '/ai-code-optimizer',
      color: 'yellow',
      stats: '70% performance boost',
      features: [
        'Legacy code modernization',
        'Performance optimization',
        'Bug detection & fixes',
        'Best practices applied'
      ]
    },
    {
      icon: BookOpen,
      title: 'Library Management',
      description: 'Reuse tested and validated function blocks across all platforms',
      link: '/ai-library-manager',
      color: 'indigo',
      stats: '156+ verified libraries',
      features: [
        'Multi-platform libraries',
        'AI recommendations',
        'Version control',
        'Instant integration'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-700' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-700' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-700' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-700' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200', gradient: 'from-yellow-500 to-yellow-700' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', gradient: 'from-indigo-500 to-indigo-700' },
    };
    return colors[color];
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
            <Sparkles className="text-purple-600" size={20} />
            <span className="text-purple-700 font-semibold text-sm">Powered by Generative AI</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Co-Pilot for{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PLC Programming
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Experience the future of industrial automation with AI-powered tools that understand your requirements,
            generate code, optimize performance, and accelerate your development process.
          </p>
        </div>

        {/* Key Benefits Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">40-50%</div>
            <div className="text-sm text-gray-600">Development Time Saved</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Engineering Automation</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">10x</div>
            <div className="text-sm text-gray-600">Faster Documentation</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">AI Assistant Available</div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const colors = getColorClasses(capability.color);

            return (
              <Link
                key={index}
                href={capability.link}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 ${colors.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                      <Icon className={colors.text} size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                        {capability.title}
                      </h3>
                      <div className={`inline-block px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full font-semibold`}>
                        {capability.stats}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-4">
                    {capability.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className={`flex items-center justify-between pt-4 border-t ${colors.border}`}>
                    <span className={`text-sm font-semibold ${colors.text}`}>
                      Explore Feature
                    </span>
                    <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <svg className={colors.text} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">How the AI Co-Pilot Works</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Describe Your Need</h4>
              <p className="text-sm opacity-90">
                Simply describe what you want to build in natural language
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-sm opacity-90">
                AI analyzes your requirements and selects optimal libraries
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Code Generation</h4>
              <p className="text-sm opacity-90">
                Production-ready code generated with documentation and tests
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Review & Deploy</h4>
              <p className="text-sm opacity-90">
                Review, refine with AI chat, and deploy with confidence
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/ai-copilot"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Try AI Co-Pilot Now
            </Link>
          </div>
        </div>

        {/* Comparison: Before vs After AI */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Before AI vs. With AI Co-Pilot
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before AI */}
            <div className="bg-gray-100 rounded-2xl p-8 border-2 border-gray-300">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-red-500">×</span> Traditional Development
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Manual coding of repetitive tasks (hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Difficult to understand legacy code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Time-consuming testing and debugging</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Manual documentation writing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Hard to maintain coding standards</span>
                </li>
              </ul>
            </div>

            {/* With AI */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-300">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={28} />
                With AI Co-Pilot
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Instant code generation</strong> from descriptions (seconds)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Automatic code explanation</strong> with flow diagrams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Auto-generated test cases</strong> and validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Comprehensive documentation</strong> created automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Enforced best practices</strong> and standards compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
