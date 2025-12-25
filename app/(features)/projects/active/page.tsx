'use client';
export default function ActiveProjectsPage() {
  const projects = [
    { name: 'Motor Control System', status: 'In Progress', progress: 65 },
    { name: 'Conveyor Belt Automation', status: 'Testing', progress: 85 }
  ];
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Active Projects</h1>
        <div className="grid gap-4">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.status}</p>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${p.progress}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{p.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
