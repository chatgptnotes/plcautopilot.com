'use client';
export default function TemplatesPage() {
  const templates = [
    { name: 'Motor Start/Stop', industry: 'General', complexity: 'Simple' },
    { name: 'Sequential Lights', industry: 'Manufacturing', complexity: 'Medium' },
    { name: 'SCADA Integration', industry: 'Industrial', complexity: 'Advanced' }
  ];
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Project Templates</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{t.industry}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{t.complexity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
