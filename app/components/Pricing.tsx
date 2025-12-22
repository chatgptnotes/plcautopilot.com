import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$20',
      period: '/month',
      features: [
        { text: 'Up to 10 projects/year (no monthly restrictions)', included: true },
        { text: 'Machine Expert Basic support', included: true },
        { text: 'Email support', included: true },
        { text: 'Safety verification', included: true },
        { text: 'Custom libraries', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      name: 'Professional',
      price: '$60',
      period: '/month',
      popular: true,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'All EcoStruxure platforms', included: true },
        { text: 'Priority support (4hr response)', included: true },
        { text: 'Custom function blocks', included: true },
        { text: 'HMI screen generation', included: true },
        { text: 'Team collaboration (5 users)', included: true },
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Unlimited users', included: true },
        { text: 'On-premise deployment', included: true },
        { text: 'Custom AI training', included: true },
        { text: 'Dedicated support engineer', included: true },
        { text: 'SLA guarantee', included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Flexible pricing for teams of all sizes
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-50 p-8 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                plan.popular
                  ? 'border-blue-500 bg-gray-900 text-white transform scale-105'
                  : 'border-gray-200 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <div className="text-center pb-8 border-b border-gray-700/20 mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price === 'Custom' ? (
                    <div className="text-4xl font-extrabold text-blue-600">Custom</div>
                  ) : (
                    <>
                      <span className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>$</span>
                      <span className={`text-6xl font-extrabold ${plan.popular ? 'text-white' : 'text-blue-600'}`}>
                        {plan.price.replace('$', '')}
                      </span>
                      <span className={`text-lg ${plan.popular ? 'text-gray-400' : 'text-gray-600'}`}>{plan.period}</span>
                    </>
                  )}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {feature.included ? (
                      <svg className="w-5 h-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg'
                    : 'bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
