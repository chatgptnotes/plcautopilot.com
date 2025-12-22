#!/bin/bash

# Solution Calculator
cat > "app/(features)/solutions/calculator/page.tsx" << 'EOF'
'use client';
import { useState } from 'react';
export default function CostCalculatorPage() {
  const [costs, setCosts] = useState({ hardware: 0, software: 0, installation: 0, maintenance: 0 });
  const total = Object.values(costs).reduce((a, b) => a + b, 0);
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cost Calculator</h1>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {Object.keys(costs).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
              <input type="number" value={costs[key as keyof typeof costs]} onChange={(e) => setCosts({...costs, [key]: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          ))}
          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold">Total: ${total.toLocaleString()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

# Projects - Active
cat > "app/(features)/projects/active/page.tsx" << 'EOF'
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
EOF

# Projects - Completed
cat > "app/(features)/projects/completed/page.tsx" << 'EOF'
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
EOF

# Projects - Templates
cat > "app/(features)/projects/templates/page.tsx" << 'EOF'
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
EOF

# Platform pages (create similar structure for all)
for platform in schneider siemens rockwell mitsubishi codesys; do
  cat > "app/(features)/platforms/$platform/page.tsx" << EOF
'use client';
export default function ${platform^}Page() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">${platform^} Electric PLCs</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Comprehensive support for ${platform^} PLCs</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Supported Models</h3>
              <p className="text-sm text-gray-600">All current ${platform^} PLC series</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Programming Languages</h3>
              <p className="text-sm text-gray-600">Ladder Logic, ST, FBD, IL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF
done

echo "All pages created successfully!"
