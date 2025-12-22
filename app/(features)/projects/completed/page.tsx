'use client';
import Link from 'next/link';

export default function CompletedProjectsPage() {
  const projects = [
    { id: '1', name: 'Tank Level Control', date: '2025-12-15', plc: 'Schneider TM221', type: 'Process Control' },
    { id: '2', name: 'Packaging Line', date: '2025-12-10', plc: 'Siemens S7-1200', type: 'Manufacturing' },
    { id: '3', name: 'Motor Start/Stop Control', date: '2025-12-08', plc: 'Rockwell CompactLogix', type: 'Basic Control' },
    { id: '4', name: 'Conveyor System', date: '2025-12-05', plc: 'Mitsubishi FX5U', type: 'Sequential Control' }
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Completed Projects</h1>
            <p className="text-gray-600 mt-1">View and export your finished PLC projects</p>
          </div>
          <Link
            href="/sap/export"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Export to SAP
          </Link>
        </div>
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Type: {p.type}</p>
                  <p className="text-sm text-gray-600 mt-1">PLC: {p.plc}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed: {p.date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                    Download
                  </button>
                  <Link
                    href={`/sap/export?project=${p.id}`}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors text-center"
                  >
                    Export to SAP
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
