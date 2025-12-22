export default function Compliance() {
  const items = [
    { title: 'Human-in-the-Loop', desc: 'All generated code requires engineer review and approval before deployment' },
    { title: 'Safety Highlighting', desc: 'Critical safety rungs automatically flagged for mandatory verification' },
    { title: 'IEC 61508 Aware', desc: 'Trained on functional safety standards for SIL-rated applications' },
    { title: 'Audit Trail', desc: 'Complete version history and change logs for compliance documentation' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Safety & Compliance
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Built with industrial standards in mind
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <p className="text-gray-900">
            <strong>Important:</strong> PLCAutoPilot is a code drafting tool designed to accelerate development.
            All generated code must be reviewed, tested, and validated by certified engineers before deployment to production systems.
          </p>
        </div>
      </div>
    </section>
  );
}
