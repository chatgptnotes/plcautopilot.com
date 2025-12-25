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
