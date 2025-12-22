'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currentPlan] = useState('professional');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 20,
      annualPrice: 200,
      features: [
        '25 PLC programs per year (no time restrictions)',
        '100 AI generation requests per year',
        'Single user account',
        '2 GB storage',
        'Basic support (email)',
        'Siemens & Rockwell support',
        'Standard templates',
        'Community forum access'
      ],
      limits: {
        programs: 25,
        ai: 100,
        users: 1,
        storage: 2
      },
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing teams and multiple projects',
      monthlyPrice: 60,
      annualPrice: 600,
      features: [
        '100 PLC programs per year (no time restrictions)',
        '500 AI generation requests per year',
        'Up to 5 team members',
        '10 GB storage',
        'Priority email support',
        'All platform support (Siemens, Rockwell, Mitsubishi, CODESYS)',
        'Advanced debugging tools',
        'Custom templates',
        'API access',
        'Version control integration'
      ],
      limits: {
        programs: 100,
        ai: 500,
        users: 5,
        storage: 10
      },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      monthlyPrice: 120,
      annualPrice: 1200,
      features: [
        'Unlimited PLC programs',
        'Unlimited AI generation',
        'Unlimited team members',
        '100 GB storage',
        '24/7 phone & email support',
        'All platform support + custom integrations',
        'Dedicated account manager',
        'On-premises deployment option',
        'Custom AI model training',
        'SLA guarantee (99.9% uptime)',
        'Advanced security & compliance',
        'Custom contract terms'
      ],
      limits: {
        programs: 'Unlimited',
        ai: 'Unlimited',
        users: 'Unlimited',
        storage: 100
      },
      popular: false
    }
  ];

  const addons = [
    {
      id: 'extra-storage',
      name: 'Additional Storage',
      description: '10 GB of extra storage for your projects',
      monthlyPrice: 10,
      annualPrice: 100
    },
    {
      id: 'extra-users',
      name: 'Additional Team Members',
      description: 'Add 5 more team members to your account',
      monthlyPrice: 20,
      annualPrice: 200
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 phone support with 1-hour response time',
      monthlyPrice: 50,
      annualPrice: 500
    },
    {
      id: 'custom-training',
      name: 'Custom AI Training',
      description: 'Train AI models on your specific PLC patterns',
      monthlyPrice: 100,
      annualPrice: 1000
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const annualTotal = plan.annualPrice;
    return monthlyTotal - annualTotal;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
        <p className="text-lg text-gray-600 mb-6">
          Upgrade or downgrade your plan at any time. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Save up to 17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg shadow-sm border-2 ${
              plan.popular ? 'border-blue-500' : 'border-gray-200'
            } ${currentPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            {currentPlan === plan.id && (
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${getPrice(plan)}</span>
                <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ${getSavings(plan)} per year
                  </p>
                )}
              </div>

              <button
                disabled={currentPlan === plan.id}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-6 ${
                  currentPlan === plan.id
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {currentPlan === plan.id ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'}
              </button>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-3">Includes:</p>
                {plan.features.map((feature, index) => (
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
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-12">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Add-ons</h2>
          <p className="text-gray-600">Enhance your plan with additional features</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addons.map((addon) => (
              <div
                key={addon.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{addon.name}</h3>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${billingCycle === 'monthly' ? addon.monthlyPrice : addon.annualPrice}
                    </span>
                    <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-12">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Comparison</h2>
          <p className="text-gray-600">Compare all features across plans</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Starter
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PLC Programs/Month</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Unlimited</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AI Requests</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Team Members</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Unlimited</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Storage</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">2 GB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">10 GB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">100 GB</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Support</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Email</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Priority Email</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">24/7 Phone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately,
              and we'll prorate any differences in cost.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I exceed my limits?</h3>
            <p className="text-gray-600">
              If you exceed your plan limits, we'll notify you and you can either upgrade your plan or
              purchase additional capacity through add-ons.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">
              Yes, all plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Need help choosing a plan?</p>
        <Link
          href="/support/contact"
          className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Contact Sales Team
        </Link>
      </div>
    </div>
  );
}
