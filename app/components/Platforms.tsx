export default function Platforms() {
  const platforms = [
    {
      name: 'Siemens',
      badge: '35% Global',
      region: 'Europe Leader',
      desc: 'TIA Portal, STEP 7, S7-1200/1500 series',
      tools: ['TIA Portal', 'STEP 7', 'WinCC'],
      color: 'from-teal-500 to-teal-700'
    },
    {
      name: 'Rockwell/Allen-Bradley',
      badge: '50%+ North America',
      region: '25% Global Market',
      desc: 'Studio 5000, CCW, ControlLogix, CompactLogix',
      tools: ['Studio 5000', 'Connected Components', 'FactoryTalk'],
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Mitsubishi',
      badge: '40%+ Asia',
      region: '15% Global Market',
      desc: 'GX Works, iQ-R series, FX/Q series',
      tools: ['GX Works', 'iQ Works', 'GT Designer'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Schneider Electric',
      badge: 'CODESYS',
      region: 'EcoStruxure Platform',
      desc: 'M221, M241, M251, M258, M340, M580',
      tools: ['Machine Expert', 'Control Expert', 'SoMachine'],
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'ABB',
      badge: 'CODESYS',
      region: 'Global Automation',
      desc: 'AC500, AC800M, System 800xA integration',
      tools: ['Automation Builder', 'Control Builder', 'Drive Composer'],
      color: 'from-purple-500 to-purple-700'
    },
    {
      name: '500+ More Brands',
      badge: 'CODESYS Platform',
      region: 'Universal Support',
      desc: 'WAGO, Festo, Eaton, Phoenix Contact, Beckhoff, and more',
      tools: ['IEC 61131-3', 'Universal Adapter', 'Multi-Brand'],
      color: 'from-indigo-500 to-indigo-700'
    },
  ];

  return (
    <section id="platforms" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            MULTI-PLATFORM SUPPORT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            All Major PLC Platforms, One Solution
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Support for Siemens, Rockwell, Mitsubishi, Schneider, ABB, and 500+ brands via CODESYS
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{platform.name}</h3>
                <span className={`px-3 py-1 bg-gradient-to-r ${platform.color} text-white rounded-lg text-xs font-semibold`}>
                  {platform.badge}
                </span>
              </div>
              <p className="text-sm text-blue-600 font-semibold mb-2">{platform.region}</p>
              <p className="text-gray-600 mb-4">{platform.desc}</p>
              <div className="flex flex-wrap gap-2">
                {platform.tools.map((tool, tIndex) => (
                  <span key={tIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            95%+ Global PLC Market Coverage
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Stop being limited to one brand. Work with any client, anywhere in the world. Support their existing hardware investments with our universal multi-platform AI solution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className="text-sm text-blue-100">Brands Supported</p>
              <p className="text-3xl font-bold">500+</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className="text-sm text-blue-100">Market Coverage</p>
              <p className="text-3xl font-bold">95%+</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className="text-sm text-blue-100">Development Time</p>
              <p className="text-3xl font-bold">-80%</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className="text-sm text-blue-100">Standards</p>
              <p className="text-3xl font-bold">IEC 61131-3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
