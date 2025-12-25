'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlanPage() {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 99,
    billingCycle: 'monthly',
    startDate: '2025-01-15',
    nextBillingDate: '2026-01-15',
    status: 'active'
  });

  const [usage] = useState({
    plcPrograms: { used: 47, limit: 100, percentage: 47 },
    aiGeneration: { used: 312, limit: 500, percentage: 62.4 },
    teamMembers: { used: 3, limit: 5, percentage: 60 },
    storage: { used: 2.3, limit: 10, percentage: 23, unit: 'GB' }
  });

  const features = [
    { name: 'AI-Powered PLC Code Generation', included: true },
    { name: 'Multi-Platform Support (Siemens, Rockwell, Mitsubishi)', included: true },
    { name: 'Advanced Debugging Tools', included: true },
    { name: 'IEC 61131-3 Compliance', included: true },
    { name: 'Version Control Integration', included: true },
    { name: 'Team Collaboration (Up to 5 members)', included: true },
    { name: 'Priority Email Support', included: true },
    { name: 'API Access', included: true },
    { name: 'Custom Templates', included: true },
    { name: '24/7 Phone Support', included: false },
    { name: 'Dedicated Account Manager', included: false },
    { name: 'On-Premises Deployment', included: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Plan</h1>
        <p className="text-gray-600">Manage your subscription and view plan details</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {currentPlan.status.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600">
                <span className="text-3xl font-bold text-gray-900">${currentPlan.price}</span>
                <span className="text-lg">/{currentPlan.billingCycle}</span>
              </p>
            </div>
            <div className="text-right">
              <Link
                href="/billing/upgrade"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-2"
              >
                Upgrade Plan
              </Link>
              <p className="text-sm text-gray-500">Next billing: {currentPlan.nextBillingDate}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Plan Started</p>
              <p className="text-base font-medium text-gray-900">{currentPlan.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Billing Cycle</p>
              <p className="text-base font-medium text-gray-900 capitalize">{currentPlan.billingCycle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Current Usage</h2>
          <p className="text-gray-600 mt-1">Your usage for this billing period</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* PLC Programs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">PLC Programs Generated</span>
                <span className="text-sm text-gray-600">
                  {usage.plcPrograms.used} / {usage.plcPrograms.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${usage.plcPrograms.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* AI Generation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">AI Generation Requests</span>
                <span className="text-sm text-gray-600">
                  {usage.aiGeneration.used} / {usage.aiGeneration.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${usage.aiGeneration.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Team Members</span>
                <span className="text-sm text-gray-600">
                  {usage.teamMembers.used} / {usage.teamMembers.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${usage.teamMembers.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Storage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Storage Used</span>
                <span className="text-sm text-gray-600">
                  {usage.storage.used} {usage.storage.unit} / {usage.storage.limit} {usage.storage.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-600 h-2.5 rounded-full"
                  style={{ width: `${usage.storage.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/billing/usage"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View Detailed Usage Report
            </Link>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Plan Features</h2>
          <p className="text-gray-600 mt-1">What is included in your plan</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <span
                  className={`text-sm ${
                    feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                  }`}
                >
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/subscription/manage"
          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">Manage Subscription</h3>
          <p className="text-sm text-gray-600">Change or cancel your subscription</p>
        </Link>
        <Link
          href="/billing/invoices"
          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">View Invoices</h3>
          <p className="text-sm text-gray-600">Download past invoices and receipts</p>
        </Link>
        <Link
          href="/subscription/addons"
          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">Add-ons</h3>
          <p className="text-sm text-gray-600">Extend your plan with add-ons</p>
        </Link>
      </div>
    </div>
  );
}
