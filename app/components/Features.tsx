export default function Features() {
  const features = [
    { icon: '🎯', title: 'Ladder Logic Expert', desc: 'Understands relay logic, timers, counters, and industrial control patterns' },
    { icon: '🛡️', title: 'Safety First', desc: 'Automatically implements emergency stops, light curtains, and safety interlocks per IEC 61508' },
    { icon: '🔌', title: 'Hardware Configuration', desc: 'Automatically configures I/O modules for Modicon M221, M241, M251, M258, and M580' },
    { icon: '📊', title: 'HMI Integration', desc: 'Generates variable tags and screens for Vijeo Designer' },
    { icon: '🔍', title: 'Code Review Assistant', desc: 'Highlights safety-critical sections for mandatory human verification' },
    { icon: '📚', title: 'Documentation Generator', desc: 'Creates I/O lists, function block descriptions, and commissioning guides' },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Built for Industrial Automation
          </h2>
          <p className="text-xl text-gray-600">
            Deep domain knowledge meets cutting-edge AI
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
