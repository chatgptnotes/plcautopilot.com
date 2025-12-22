'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function UsagePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const usageData = {
    current: {
      period: 'Jan 15 - Feb 14, 2026',
      plcPrograms: [
        { date: '2026-02-14', count: 5, type: 'Siemens S7-1200' },
        { date: '2026-02-13', count: 3, type: 'Rockwell ControlLogix' },
        { date: '2026-02-12', count: 7, type: 'Mitsubishi FX5' },
        { date: '2026-02-11', count: 4, type: 'Schneider M241' },
        { date: '2026-02-10', count: 6, type: 'Siemens S7-1500' }
      ],
      aiRequests: [
        { date: '2026-02-14', count: 23, category: 'Code Generation' },
        { date: '2026-02-13', count: 18, category: 'Debug Assistance' },
        { date: '2026-02-12', count: 31, category: 'Code Optimization' },
        { date: '2026-02-11', count: 15, category: 'Documentation' },
        { date: '2026-02-10', count: 27, category: 'Code Review' }
      ],
      totalPrograms: 47,
      totalAI: 312,
      totalStorage: 2.3
    }
  };

  const currentUsage = usageData.current;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Usage Details</h1>
        <p className="text-gray-600">Track your monthly usage and activity</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Billing Period</h2>
            <p className="text-gray-600">{currentUsage.period}</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">Current Period</option>
            <option value="last">Last Period</option>
            <option value="2months">2 Months Ago</option>
            <option value="3months">3 Months Ago</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">PLC Programs</h3>
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{currentUsage.totalPrograms}</p>
          <p className="text-sm text-gray-500">of 100 limit</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '47%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">AI Requests</h3>
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{currentUsage.totalAI}</p>
          <p className="text-sm text-gray-500">of 500 limit</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '62.4%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Storage Used</h3>
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{currentUsage.totalStorage} GB</p>
          <p className="text-sm text-gray-500">of 10 GB limit</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* PLC Programs Activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">PLC Programs Generated</h2>
          <p className="text-gray-600 mt-1">Recent program generation activity</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsage.plcPrograms.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {item.count} programs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Requests Activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">AI Generation Requests</h2>
          <p className="text-gray-600 mt-1">AI assistance usage breakdown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Response Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsage.aiRequests.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {item.count} requests
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {(Math.random() * 2 + 0.5).toFixed(2)}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export and Actions */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Export Usage Data</h3>
          <p className="text-sm text-gray-600">Download your usage data for analysis</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/billing/plan"
          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">View Plan Details</h3>
          <p className="text-sm text-gray-600">Check your current plan and limits</p>
        </Link>
        <Link
          href="/billing/upgrade"
          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">Upgrade Plan</h3>
          <p className="text-sm text-gray-600">Increase your limits and features</p>
        </Link>
      </div>
    </div>
  );
}
