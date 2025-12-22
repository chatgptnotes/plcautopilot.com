'use client';

import { useState } from 'react';

interface Solution {
  name: string;
  platform: string;
  model: string;
  description: string;
  cost: {
    hardware: number;
    software: number;
    installation: number;
    maintenance: number;
    total: number;
  };
  complexity: {
    score: number;
    setupTime: string;
    programmingDifficulty: string;
    maintenanceLevel: string;
  };
  robustness: {
    score: number;
    reliability: string;
    safetyRating: string;
    environmentalRating: string;
    mtbf: string;
  };
  pros: string[];
  cons: string[];
  bestFor: string[];
  specifications: {
    ioPoints: number;
    memoryKb: number;
    scanTime: string;
    communicationProtocols: string[];
    expandability: string;
  };
}

interface RecommendationResponse {
  recommended: Solution;
  alternatives: Solution[];
  comparison: {
    criteria: string;
    reasoning: string;
    tradeoffs: string[];
  };
}

export default function SolutionRecommend() {
  const [projectDescription, setProjectDescription] = useState('');
  const [criteria, setCriteria] = useState<'cheapest' | 'simplest' | 'robust' | 'balanced'>('balanced');
  const [maxBudget, setMaxBudget] = useState('');
  const [safetyLevel, setSafetyLevel] = useState<'basic' | 'standard' | 'sil1' | 'sil2' | 'sil3'>('standard');
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'harsh'>('indoor');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/recommend-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription,
          criteria,
          constraints: {
            maxBudget: maxBudget ? parseInt(maxBudget) : undefined,
            safetyLevel,
            environment,
          },
        }),
      });

      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Solution Recommendation</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Find the perfect PLC solution for your project</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Project Requirements</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your automation project..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Optimization Criteria
                    </label>
                    <select
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="cheapest">Minimize Cost</option>
                      <option value="simplest">Minimize Complexity</option>
                      <option value="robust">Maximize Reliability</option>
                      <option value="balanced">Balanced Approach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Budget (optional)
                    </label>
                    <input
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter budget in USD"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safety Level Required
                    </label>
                    <select
                      value={safetyLevel}
                      onChange={(e) => setSafetyLevel(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="basic">Basic (Category 1)</option>
                      <option value="standard">Standard (Category 3)</option>
                      <option value="sil1">SIL 1</option>
                      <option value="sil2">SIL 2</option>
                      <option value="sil3">SIL 3 / PLe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Environment
                    </label>
                    <select
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="indoor">Indoor / Clean</option>
                      <option value="outdoor">Outdoor / Industrial</option>
                      <option value="harsh">Harsh / Extreme</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Analyzing...' : 'Get Recommendation'}
                  </button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {loading && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing solutions...</p>
                </div>
              )}

              {recommendation && (
                <>
                  {/* Recommended Solution */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md border-2 border-green-500 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                          RECOMMENDED
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{recommendation.recommended.name}</h2>
                        <p className="text-sm text-gray-600">{recommendation.recommended.platform} - {recommendation.recommended.model}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">
                          ${recommendation.recommended.cost.total.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Total Cost</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{recommendation.recommended.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">{recommendation.recommended.complexity.score}/10</div>
                        <div className="text-xs text-gray-600">Complexity</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">{recommendation.recommended.robustness.score}/10</div>
                        <div className="text-xs text-gray-600">Robustness</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-purple-600">{recommendation.recommended.robustness.reliability}</div>
                        <div className="text-xs text-gray-600">Reliability</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Why This Solution?</h3>
                      <p className="text-sm text-gray-700">{recommendation.comparison.reasoning}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-green-700 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Pros
                        </h3>
                        <ul className="space-y-1">
                          {recommendation.recommended.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Cons
                        </h3>
                        <ul className="space-y-1">
                          {recommendation.recommended.cons.map((con, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-red-600 mr-2">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">I/O Points:</span>
                          <span className="ml-2 font-medium">{recommendation.recommended.specifications.ioPoints}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Memory:</span>
                          <span className="ml-2 font-medium">{recommendation.recommended.specifications.memoryKb} KB</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Scan Time:</span>
                          <span className="ml-2 font-medium">{recommendation.recommended.specifications.scanTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">MTBF:</span>
                          <span className="ml-2 font-medium">{recommendation.recommended.robustness.mtbf}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trade-offs */}
                  {recommendation.comparison.tradeoffs.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold mb-4">Trade-offs to Consider</h3>
                      <ul className="space-y-2">
                        {recommendation.comparison.tradeoffs.map((tradeoff, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {tradeoff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Alternative Solutions */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Alternative Solutions</h3>
                    {recommendation.alternatives.map((solution, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{solution.name}</h4>
                            <p className="text-sm text-gray-600">{solution.platform} - {solution.model}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">${solution.cost.total.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total Cost</div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4">{solution.description}</p>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{solution.complexity.score}/10</div>
                            <div className="text-xs text-gray-600">Complexity</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{solution.robustness.score}/10</div>
                            <div className="text-xs text-gray-600">Robustness</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-purple-600">{solution.robustness.reliability}</div>
                            <div className="text-xs text-gray-600">Reliability</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {solution.bestFor.slice(0, 3).map((use, useIdx) => (
                            <span key={useIdx} className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {!loading && !recommendation && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendation Yet</h3>
                  <p className="text-gray-600">Fill out the form to get AI-powered solution recommendations</p>
                </div>
              )}
            </div>
          </div>
        </main>
    </>
  );
}
