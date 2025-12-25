import Icon from './Icon';

export default function Solution() {
  const steps = [
    { num: '01', icon: 'description', title: 'Upload Specifications', desc: 'Provide your process description, I/O list, or functional specification document' },
    { num: '02', icon: 'smart_toy', title: 'AI Generates Code', desc: 'Our trained model writes ladder logic, configures I/O, and implements safety interlocks' },
    { num: '03', icon: 'verified', title: 'Review & Deploy', desc: 'Safety-critical sections highlighted for engineer review before deployment' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
            The Solution
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            AI That Writes Industrial Code Like a Senior Engineer
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Three simple steps to production-ready PLC programs
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-5xl font-extrabold text-white/10">{step.num}</div>
                <div className="mb-4">
                  <Icon name={step.icon} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4">
                  <Icon name="arrow_forward" className="text-3xl text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
