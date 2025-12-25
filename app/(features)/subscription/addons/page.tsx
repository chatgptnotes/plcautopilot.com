'use client';

import React, { useState } from 'react';

export default function AddonsPage() {
  const [activeAddons, setActiveAddons] = useState<string[]>(['extra-storage']);

  const addons = [
    {
      id: 'extra-storage',
      name: 'Additional Storage',
      description: 'Add 10 GB of extra storage for your PLC projects and templates',
      price: 10,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        '10 GB additional storage',
        'Store more PLC programs',
        'Archive old projects',
        'Upload larger files'
      ],
      category: 'storage'
    },
    {
      id: 'extra-users',
      name: 'Additional Team Members',
      description: 'Add 5 more team members to collaborate on your projects',
      price: 20,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        'Add 5 more team members',
        'Role-based permissions',
        'Shared project workspaces',
        'Team activity tracking'
      ],
      category: 'team'
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 phone and email support with 1-hour response time',
      price: 50,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      features: [
        '24/7 phone support',
        '1-hour response time',
        'Dedicated support engineer',
        'Priority ticket queue'
      ],
      category: 'support'
    },
    {
      id: 'custom-training',
      name: 'Custom AI Training',
      description: 'Train AI models on your specific PLC patterns and conventions',
      price: 100,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        'Custom AI model training',
        'Your coding patterns',
        'Company-specific standards',
        'Improved accuracy'
      ],
      category: 'ai'
    },
    {
      id: 'api-premium',
      name: 'Premium API Access',
      description: 'Higher rate limits and advanced API features for integrations',
      price: 40,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '10,000 API calls/hour',
        'Webhook support',
        'Advanced endpoints',
        'Priority API queue'
      ],
      category: 'development'
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed insights into your PLC development workflow and team performance',
      price: 30,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Usage analytics dashboard',
        'Team performance metrics',
        'Custom reports',
        'Export to CSV/PDF'
      ],
      category: 'analytics'
    }
  ];

  const handleToggleAddon = (addonId: string) => {
    if (activeAddons.includes(addonId)) {
      setActiveAddons(activeAddons.filter(id => id !== addonId));
      console.log(`Removing addon: ${addonId}`);
    } else {
      setActiveAddons([...activeAddons, addonId]);
      console.log(`Adding addon: ${addonId}`);
    }
  };

  const totalAddonCost = addons
    .filter(addon => activeAddons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add-ons</h1>
        <p className="text-gray-600">Enhance your plan with additional features and capabilities</p>
      </div>

      {/* Current Add-ons Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Active Add-ons</h2>
            <p className="text-blue-100">
              You have {activeAddons.length} add-on{activeAddons.length !== 1 ? 's' : ''} active
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Total Add-ons Cost</p>
            <p className="text-4xl font-bold">${totalAddonCost}/mo</p>
          </div>
        </div>
      </div>

      {/* Add-ons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {addons.map((addon) => {
          const isActive = activeAddons.includes(addon.id);
          return (
            <div
              key={addon.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                isActive
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="p-6">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {addon.icon}
                  </div>
                  {isActive && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </span>
                  )}
                </div>

                {/* Name and Description */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{addon.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">${addon.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {addon.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleToggleAddon(addon.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isActive ? 'Remove Add-on' : 'Add to Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Add-ons Summary</h3>
              <p className="text-sm text-gray-600">Review your selected add-ons</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalAddonCost}/mo</p>
            </div>
          </div>

          {activeAddons.length > 0 ? (
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
                {addons
                  .filter(addon => activeAddons.includes(addon.id))
                  .map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          {addon.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{addon.name}</p>
                          <p className="text-xs text-gray-500">{addon.category}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">${addon.price}/mo</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-center text-gray-500 py-8">
                No add-ons selected. Choose add-ons above to enhance your plan.
              </p>
            </div>
          )}

          {activeAddons.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-3">
              Not sure which add-ons are right for your team? Our sales team can help you find the perfect combination.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
