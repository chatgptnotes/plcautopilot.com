export default function Platforms() {
  const platforms = [
    { name: 'Machine Expert - Basic', badge: 'Modicon M221', desc: 'Compact PLCs for simple machines and small applications' },
    { name: 'Machine Expert', badge: 'M241/M251/M258', desc: 'Mid-range PLCs for complex machines and process control' },
    { name: 'Control Expert', badge: 'M580/M340', desc: 'High-performance PLCs for large-scale industrial systems' },
  ];

  return (
    <section id="platforms" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Supports All EcoStruxure Platforms
          </h2>
          <p className="text-xl text-gray-600">
            One unified solution for the entire Schneider Electric ecosystem
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{platform.name}</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-sm font-semibold">
                  {platform.badge}
                </span>
              </div>
              <p className="text-gray-600">{platform.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
