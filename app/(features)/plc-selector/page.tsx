'use client';

import { useState } from 'react';
import Link from 'next/link';
import PLCCascadingSelector from '@/app/components/PLCCascadingSelector';
import type { PLCManufacturer, PLCSeries, PLCModel } from '@/lib/plc-models-database';

interface ProjectRequirements {
  applicationName: string;
  applicationType: string;
  ioRequirements: {
    digitalInputs: number;
    digitalOutputs: number;
    analogInputs: number;
    analogOutputs: number;
  };
  budget: string;
  environment: string;
  safetyRequirements: string;
  expansionNeeded: boolean;
  motionControl: boolean;
  communicationProtocols: string[];
  scanTimeRequirement: string;
}

interface RecommendedPLC {
  manufacturer: string;
  model: string;
  series: string;
  score: number;
  matchPercentage: number;
  price: number;
  reasons: string[];
  specifications: {
    ioPoints: number;
    memory: string;
    scanTime: string;
    protocols: string[];
  };
  pros: string[];
  cons: string[];
}

export default function PLCSelector() {
  const [mode, setMode] = useState<'browse' | 'wizard'>('browse');
  const [step, setStep] = useState(1);
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    applicationName: '',
    applicationType: '',
    ioRequirements: {
      digitalInputs: 0,
      digitalOutputs: 0,
      analogInputs: 0,
      analogOutputs: 0,
    },
    budget: '',
    environment: '',
    safetyRequirements: '',
    expansionNeeded: false,
    motionControl: false,
    communicationProtocols: [],
    scanTimeRequirement: '',
  });
  const [recommendations, setRecommendations] = useState<RecommendedPLC[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPLC, setSelectedPLC] = useState<{
    manufacturer: PLCManufacturer | null;
    series: PLCSeries | null;
    model: PLCModel | null;
  }>({
    manufacturer: null,
    series: null,
    model: null,
  });

  const applicationTypes = [
    'Manufacturing/Assembly Line',
    'Material Handling',
    'Packaging Machine',
    'Water Treatment',
    'HVAC Control',
    'Building Automation',
    'Food & Beverage',
    'Pharmaceutical',
    'Oil & Gas',
    'Robotics',
    'Custom Machine',
    'Other',
  ];

  const environments = [
    'Clean Room / Indoor',
    'Standard Industrial',
    'Outdoor / Weather Exposed',
    'Hazardous / Explosive Atmosphere',
    'High Temperature',
    'High Humidity',
  ];

  const safetyLevels = [
    'None / Basic',
    'Category 1 (EN ISO 13849-1)',
    'Category 3 (EN ISO 13849-1)',
    'SIL 1 (IEC 61508)',
    'SIL 2 (IEC 61508)',
    'SIL 3 / PLe (IEC 61508)',
  ];

  const protocols = [
    'Modbus TCP/RTU',
    'Ethernet/IP',
    'Profinet',
    'Profibus',
    'CANopen',
    'EtherCAT',
    'DeviceNet',
    'OPC UA',
  ];

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/recommend-plc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requirements),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
      setStep(4);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Failed to get PLC recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleProtocolToggle = (protocol: string) => {
    setRequirements(prev => ({
      ...prev,
      communicationProtocols: prev.communicationProtocols.includes(protocol)
        ? prev.communicationProtocols.filter(p => p !== protocol)
        : [...prev.communicationProtocols, protocol],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PLC Selector & Recommender
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect PLC for your automation project
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode('browse')}
              className={`p-6 rounded-lg border-2 transition-all ${
                mode === 'browse'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Browse All Models</h3>
                <p className="text-sm text-gray-600 text-center">
                  Select from all available PLC manufacturers, series, and models
                </p>
              </div>
            </button>

            <button
              onClick={() => setMode('wizard')}
              className={`p-6 rounded-lg border-2 transition-all ${
                mode === 'wizard'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Recommendation Wizard</h3>
                <p className="text-sm text-gray-600 text-center">
                  Answer questions to get AI-powered PLC recommendations
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Browse Mode */}
        {mode === 'browse' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Browse PLC Models</h2>

            <PLCCascadingSelector
              onSelectionChange={setSelectedPLC}
            />

            {selectedPLC.model && (
              <div className="mt-8 flex gap-3">
                <Link
                  href={`/generator?manufacturer=${selectedPLC.manufacturer?.id}&series=${selectedPLC.series?.id}&model=${selectedPLC.model.id}`}
                  className="flex-1 px-6 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 font-medium"
                >
                  Generate Program for {selectedPLC.model.name}
                </Link>
                <Link
                  href={`/platforms/${selectedPLC.manufacturer?.id}`}
                  className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium"
                >
                  Platform Details
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Wizard Mode */}
        {mode === 'wizard' && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Application</span>
                <span>I/O Requirements</span>
                <span>Specifications</span>
                <span>Recommendations</span>
              </div>
            </div>

            {/* Step 1: Application Details */}
            {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Step 1: Application Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Name
                </label>
                <input
                  type="text"
                  value={requirements.applicationName}
                  onChange={e =>
                    setRequirements({ ...requirements, applicationName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Motor Control System, Conveyor Belt Controller"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Type
                </label>
                <select
                  value={requirements.applicationType}
                  onChange={e =>
                    setRequirements({ ...requirements, applicationType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select application type...</option>
                  {applicationTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Environment
                </label>
                <select
                  value={requirements.environment}
                  onChange={e =>
                    setRequirements({ ...requirements, environment: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select environment...</option>
                  {environments.map(env => (
                    <option key={env} value={env}>
                      {env}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Requirements
                </label>
                <select
                  value={requirements.safetyRequirements}
                  onChange={e =>
                    setRequirements({ ...requirements, safetyRequirements: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select safety level...</option>
                  {safetyLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={
                  !requirements.applicationName ||
                  !requirements.applicationType ||
                  !requirements.environment
                }
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next: I/O Requirements
              </button>
            </div>
          </div>
        )}

        {/* Step 2: I/O Requirements */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Step 2: I/O Requirements</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Inputs
                </label>
                <input
                  type="number"
                  min="0"
                  value={requirements.ioRequirements.digitalInputs}
                  onChange={e =>
                    setRequirements({
                      ...requirements,
                      ioRequirements: {
                        ...requirements.ioRequirements,
                        digitalInputs: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Outputs
                </label>
                <input
                  type="number"
                  min="0"
                  value={requirements.ioRequirements.digitalOutputs}
                  onChange={e =>
                    setRequirements({
                      ...requirements,
                      ioRequirements: {
                        ...requirements.ioRequirements,
                        digitalOutputs: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analog Inputs
                </label>
                <input
                  type="number"
                  min="0"
                  value={requirements.ioRequirements.analogInputs}
                  onChange={e =>
                    setRequirements({
                      ...requirements,
                      ioRequirements: {
                        ...requirements.ioRequirements,
                        analogInputs: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analog Outputs
                </label>
                <input
                  type="number"
                  min="0"
                  value={requirements.ioRequirements.analogOutputs}
                  onChange={e =>
                    setRequirements({
                      ...requirements,
                      ioRequirements: {
                        ...requirements.ioRequirements,
                        analogOutputs: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Total I/O Points:</strong>{' '}
                {requirements.ioRequirements.digitalInputs +
                  requirements.ioRequirements.digitalOutputs +
                  requirements.ioRequirements.analogInputs +
                  requirements.ioRequirements.analogOutputs}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="expansion"
                  checked={requirements.expansionNeeded}
                  onChange={e =>
                    setRequirements({ ...requirements, expansionNeeded: e.target.checked })
                  }
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="expansion" className="ml-3 text-gray-700">
                  Future expansion expected (20%+ more I/O in future)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="motion"
                  checked={requirements.motionControl}
                  onChange={e =>
                    setRequirements({ ...requirements, motionControl: e.target.checked })
                  }
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="motion" className="ml-3 text-gray-700">
                  Motion control required (servo/stepper motors)
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Next: Specifications
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Specifications */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Step 3: Additional Specifications</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (USD)
                </label>
                <select
                  value={requirements.budget}
                  onChange={e => setRequirements({ ...requirements, budget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select budget range...</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="over-5000">Over $5,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Scan Time
                </label>
                <select
                  value={requirements.scanTimeRequirement}
                  onChange={e =>
                    setRequirements({ ...requirements, scanTimeRequirement: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select scan time...</option>
                  <option value="standard">Standard (10-50ms) - General automation</option>
                  <option value="fast">Fast (1-10ms) - Motion control</option>
                  <option value="ultra-fast">Ultra Fast (&lt;1ms) - High-speed applications</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Communication Protocols
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {protocols.map(protocol => (
                    <div key={protocol} className="flex items-center">
                      <input
                        type="checkbox"
                        id={protocol}
                        checked={requirements.communicationProtocols.includes(protocol)}
                        onChange={() => handleProtocolToggle(protocol)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor={protocol} className="ml-2 text-sm text-gray-700">
                        {protocol}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !requirements.budget}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'Analyzing...' : 'Get Recommendations'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Recommendations */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Recommended PLCs for Your Project</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Your Requirements Summary:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Application:</strong> {requirements.applicationType}</li>
                  <li><strong>Total I/O Points:</strong> {' '}
                    {requirements.ioRequirements.digitalInputs +
                      requirements.ioRequirements.digitalOutputs +
                      requirements.ioRequirements.analogInputs +
                      requirements.ioRequirements.analogOutputs}
                  </li>
                  <li><strong>Environment:</strong> {requirements.environment}</li>
                  <li><strong>Safety Level:</strong> {requirements.safetyRequirements}</li>
                </ul>
              </div>
            </div>

            {recommendations.map((plc, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                  idx === 0 ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                {idx === 0 && (
                  <div className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    BEST MATCH - {plc.matchPercentage}%
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {plc.manufacturer} {plc.model}
                    </h3>
                    <p className="text-gray-600">{plc.series}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${plc.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Estimated Price</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Why This PLC?</h4>
                  <ul className="space-y-1">
                    {plc.reasons.map((reason, rIdx) => (
                      <li key={rIdx} className="text-sm text-gray-700 flex items-start">
                        <svg
                          className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {plc.pros.map((pro, pIdx) => (
                        <li key={pIdx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {plc.cons.map((con, cIdx) => (
                        <li key={cIdx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">I/O Points:</span>
                      <span className="ml-2 font-medium">{plc.specifications.ioPoints}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Memory:</span>
                      <span className="ml-2 font-medium">{plc.specifications.memory}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Scan Time:</span>
                      <span className="ml-2 font-medium">{plc.specifications.scanTime}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Protocols:</span>
                      <span className="ml-2 font-medium">
                        {plc.specifications.protocols.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/generator?model=${plc.model}`}
                    className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700"
                  >
                    Generate Program for This PLC
                  </Link>
                  <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                    Learn More
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need Expert Advice?
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with our PLC engineers for personalized guidance
                </p>
                <Link
                  href="/engineer-chat"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Chat with an Engineer
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setRecommendations([]);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Start New Selection
              </button>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
