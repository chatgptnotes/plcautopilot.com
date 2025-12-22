'use client';

import { useState } from 'react';

interface PLCComparison {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  ioPoints: number;
  memory: number;
  protocols: string[];
  motionControl: boolean;
  safetyRated: boolean;
  scanTime: string;
  pros: string[];
  cons: string[];
}

const plcDatabase: PLCComparison[] = [
  {
    id: '1',
    name: 'TM221C16R',
    manufacturer: 'Schneider Electric',
    price: 600,
    ioPoints: 16,
    memory: 256,
    protocols: ['Modbus', 'Ethernet'],
    motionControl: false,
    safetyRated: false,
    scanTime: '5ms',
    pros: ['Very affordable', 'Easy to program', 'Compact design'],
    cons: ['Limited I/O', 'No motion control', 'Basic features only']
  },
  {
    id: '2',
    name: 'S7-1200',
    manufacturer: 'Siemens',
    price: 2050,
    ioPoints: 24,
    memory: 512,
    protocols: ['PROFINET', 'Modbus TCP', 'Ethernet/IP'],
    motionControl: true,
    safetyRated: false,
    scanTime: '2ms',
    pros: ['Industry standard', 'Excellent connectivity', 'Expandable'],
    cons: ['Higher cost', 'Steeper learning curve', 'Requires TIA Portal']
  },
  {
    id: '3',
    name: 'CompactLogix 5380',
    manufacturer: 'Rockwell Automation',
    price: 5200,
    ioPoints: 32,
    memory: 1024,
    protocols: ['EtherNet/IP', 'ControlNet', 'DeviceNet'],
    motionControl: true,
    safetyRated: true,
    scanTime: '1ms',
    pros: ['High performance', 'Safety rated', 'Robust design', 'Excellent support'],
    cons: ['Expensive', 'Vendor lock-in', 'Larger footprint']
  },
  {
    id: '4',
    name: 'FX5U',
    manufacturer: 'Mitsubishi',
    price: 1280,
    ioPoints: 20,
    memory: 400,
    protocols: ['CC-Link IE', 'Ethernet', 'Modbus'],
    motionControl: true,
    safetyRated: false,
    scanTime: '3ms',
    pros: ['Cost-effective', 'Good performance', 'Motion capable'],
    cons: ['Less common in US', 'Limited third-party support']
  }
];

export default function CompareSolutionsPage() {
  const [selectedPLCs, setSelectedPLCs] = useState<string[]>([]);

  const togglePLC = (id: string) => {
    if (selectedPLCs.includes(id)) {
      setSelectedPLCs(selectedPLCs.filter(plcId => plcId !== id));
    } else if (selectedPLCs.length < 3) {
      setSelectedPLCs([...selectedPLCs, id]);
    } else {
      alert('You can compare up to 3 PLCs at a time');
    }
  };

  const selectedPLCData = plcDatabase.filter(plc => selectedPLCs.includes(plc.id));

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Compare PLC Solutions
          </h1>
          <p className="text-gray-600">
            Select up to 3 PLCs to compare specifications, features, and pricing side-by-side
          </p>
        </div>

        {/* PLC Selection */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Select PLCs to Compare ({selectedPLCs.length}/3)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plcDatabase.map(plc => (
              <button
                key={plc.id}
                onClick={() => togglePLC(plc.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedPLCs.includes(plc.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{plc.name}</h3>
                  {selectedPLCs.includes(plc.id) && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{plc.manufacturer}</p>
                <p className="text-lg font-bold text-blue-600">${plc.price.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedPLCData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50">Feature</th>
                  {selectedPLCData.map(plc => (
                    <th key={plc.id} className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">
                      <div className="mb-1">{plc.name}</div>
                      <div className="text-sm font-normal text-gray-600">{plc.manufacturer}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Price</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4 text-gray-900 font-semibold">
                      ${plc.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">I/O Points</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4 text-gray-900">{plc.ioPoints}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Memory (KB)</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4 text-gray-900">{plc.memory} KB</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Scan Time</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4 text-gray-900">{plc.scanTime}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Motion Control</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4">
                      {plc.motionControl ? (
                        <span className="flex items-center gap-2 text-green-600 font-semibold">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          No
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Safety Rated</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4">
                      {plc.safetyRated ? (
                        <span className="flex items-center gap-2 text-green-600 font-semibold">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          No
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Protocols</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {plc.protocols.map(protocol => (
                          <span key={protocol} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">Pros</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4">
                      <ul className="space-y-1">
                        {plc.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start">
                            <span className="mr-2">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-700">Cons</td>
                  {selectedPLCData.map(plc => (
                    <td key={plc.id} className="p-4">
                      <ul className="space-y-1">
                        {plc.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-red-700 flex items-start">
                            <span className="mr-2">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedPLCData.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 text-lg">Select PLCs above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
}
