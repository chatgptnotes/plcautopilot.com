export default function Services() {
  const services = [
    {
      icon: 'handshake',
      title: 'Dealing',
      description: 'Hardware & Software Sales, Multi-Platform Partnerships',
      features: [
        'All major PLC brands (Siemens, Rockwell, Mitsubishi)',
        'Volume discounts across 500+ brands',
        'Multi-platform software licensing',
        'Technical pre-sales for all platforms'
      ]
    },
    {
      icon: 'code',
      title: 'Development',
      description: 'Custom Programming Across All Major PLC Platforms',
      features: [
        'Multi-brand PLC programming (any platform)',
        'Universal SCADA/HMI development',
        'Cross-platform system integration',
        'Legacy system migration (any brand to any brand)'
      ]
    },
    {
      icon: 'psychology',
      title: 'Consulting',
      description: 'Platform-Agnostic Automation Solutions',
      features: [
        'Multi-vendor automation strategy',
        'Platform selection and comparison',
        'Cross-brand technology guidance',
        'Universal compliance support (IEC 61131-3, IEC 61508)'
      ]
    },
    {
      icon: 'construction',
      title: 'Custom Solutions',
      description: 'Tailored Multi-Platform Integration',
      features: [
        'Hybrid systems (multiple PLC brands)',
        'Industry-specific multi-vendor solutions',
        'Universal proof-of-concept development',
        'Ongoing support for all platforms'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            COMPREHENSIVE SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            More Than Just Software
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From hardware procurement to custom development, consulting, and ongoing support. We are your complete automation partner.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <span className="material-icons text-white text-2xl sm:text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="material-icons text-blue-600 text-base mt-0.5">check</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Need a Multi-Platform Solution?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every industrial automation project is unique. Whether you work with Siemens, Rockwell, Mitsubishi, or any of 500+ brands, let us design a solution tailored to your multi-vendor environment, timeline, and budget.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
