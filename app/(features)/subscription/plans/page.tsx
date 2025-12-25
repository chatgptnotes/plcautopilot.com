'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  features: string[];
  limits: {
    programsPerMonth: number | 'unlimited';
    plcModelsSupported: number | 'all';
    errorRectifications: number | 'unlimited';
    engineerSupport: string;
    apiCalls: number | 'unlimited';
    teamMembers: number;
    projectStorage: string;
  };
  recommended?: boolean;
}

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Starter',
      tagline: 'Perfect for learning and small projects',
      price: 0,
      billingCycle: 'monthly',
      features: [
        '5 program generations per year (no time restrictions)',
        'Basic PLC models (Schneider M221, TM221)',
        '2 error rectification requests per year',
        'Community forum support',
        'Standard scan time programs',
        'Ladder Logic (LD) only',
        'Email support (48h response)',
      ],
      limits: {
        programsPerMonth: 5,
        plcModelsSupported: 10,
        errorRectifications: 2,
        engineerSupport: 'Community Forum',
        apiCalls: 100,
        teamMembers: 1,
        projectStorage: '500 MB',
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      tagline: 'Automating the Automation for professionals',
      price: billingCycle === 'monthly' ? 20 : 200,
      billingCycle,
      features: [
        '50 program generations per year (no time restrictions)',
        'All standard PLC models (100+ models)',
        '20 error rectification requests per year',
        'Email + chat support (4h response)',
        'All IEC 61131-3 languages (LD, ST, IL, FBD)',
        'Motion control programs',
        'SCADA integration templates',
        'Advanced diagnostics',
        'Priority program generation',
      ],
      limits: {
        programsPerMonth: 50,
        plcModelsSupported: 100,
        errorRectifications: 20,
        engineerSupport: 'Email + Chat',
        apiCalls: 5000,
        teamMembers: 5,
        projectStorage: '10 GB',
      },
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Complete automation solutions for mass production',
      price: billingCycle === 'monthly' ? 80 : 800,
      billingCycle,
      features: [
        'Unlimited program generations',
        'All PLC models (500+ via CODESYS)',
        'Unlimited error rectifications',
        '24/7 engineer support (< 1h response)',
        'Custom program templates',
        'Safety-rated programs (SIL 1-3)',
        'Multi-site deployment',
        'API access for automation',
        'Dedicated account manager',
        'Training sessions included',
        'White-label options',
        'Custom integrations',
      ],
      limits: {
        programsPerMonth: 'unlimited',
        plcModelsSupported: 'all',
        errorRectifications: 'unlimited',
        engineerSupport: '24/7 Priority',
        apiCalls: 'unlimited',
        teamMembers: 50,
        projectStorage: '100 GB',
      },
    },
  ];

  const addons = [
    {
      name: 'Additional Team Member',
      price: 9,
      description: 'Add more engineers to your team',
    },
    {
      name: 'Extra Storage (10 GB)',
      price: 5,
      description: 'Expand your project storage',
    },
    {
      name: 'Priority Support Upgrade',
      price: 29,
      description: 'Get 1-hour response time guarantee',
    },
    {
      name: 'Custom Training Session',
      price: 299,
      description: '2-hour personalized training with expert',
    },
  ];

  const displayPrice = (plan: Plan) => {
    if (plan.price === 0) return 'Free';
    const savings = billingCycle === 'annual' ? ' (Save 20%)' : '';
    return `$${plan.price}${savings}`;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Automating the Automation - Choose your plan</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
          {/* Billing Toggle */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-center items-center space-x-4">
              <span
                className={`text-lg ${
                  billingCycle === 'monthly' ? 'font-bold text-gray-900' : 'text-gray-600'
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-green-600"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                    billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-lg ${
                  billingCycle === 'annual' ? 'font-bold text-gray-900' : 'text-gray-600'
                }`}
              >
                Annual <span className="text-green-600 text-sm">(Save 20%)</span>
              </span>
            </div>
          </div>

          {/* Plans */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  plan.recommended ? 'ring-2 ring-green-500 relative' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.tagline}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{displayPrice(plan)}</div>
                  {plan.price > 0 && (
                    <div className="text-gray-600 text-sm">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <svg
                        className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.price === 0 ? 'Start Free' : 'Subscribe Now'}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Plan Limits:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Programs: {plan.limits.programsPerMonth} /mo</p>
                    <p>
                      Models:{' '}
                      {plan.limits.plcModelsSupported === 'all'
                        ? 'All (500+)'
                        : plan.limits.plcModelsSupported}
                    </p>
                    <p>Team: {plan.limits.teamMembers} members</p>
                    <p>Storage: {plan.limits.projectStorage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add-ons & Extras</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((addon, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">${addon.price}</div>
                      <div className="text-xs text-gray-600">/month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-900">Feature</th>
                      {plans.map(plan => (
                        <th key={plan.id} className="text-center py-3 px-4 text-gray-900">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Programs per month</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.programsPerMonth}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">PLC Models</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.plcModelsSupported === 'all'
                            ? '500+'
                            : plan.limits.plcModelsSupported}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Error Rectifications</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.errorRectifications}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Engineer Support</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.engineerSupport}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">API Calls</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.apiCalls}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Team Members</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.teamMembers}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Project Storage</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.limits.projectStorage}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I switch plans at any time?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                    immediately, and we'll prorate any charges.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We accept all major credit cards (Visa, MasterCard, American Express), PayPal,
                    and wire transfer for Enterprise plans.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is there a free trial for paid plans?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes! Professional and Enterprise plans come with a 14-day free trial. No credit
                    card required to start.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What happens if I exceed my plan limits?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll notify you when you're approaching your limits. You can either upgrade
                    your plan or purchase add-ons to continue using the service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}
