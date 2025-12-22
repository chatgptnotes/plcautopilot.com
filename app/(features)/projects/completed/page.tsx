'use client';
export default function CompletedProjectsPage() {
  const projects = [
    { name: 'Tank Level Control', date: '2025-12-15', plc: 'Schneider TM221' },
    { name: 'Packaging Line', date: '2025-12-10', plc: 'Siemens S7-1200' }
  ];
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Completed Projects</h1>
        <div className="grid gap-4">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">PLC: {p.plc}</p>
              <p className="text-xs text-gray-500 mt-1">Completed: {p.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
