'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ManageSubscriptionPage() {
  const [subscription] = useState({
    plan: 'Professional',
    status: 'active',
    price: 99,
    billingCycle: 'monthly',
    startDate: '2025-01-15',
    nextBillingDate: '2026-01-15',
    autoRenew: true,
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2027'
    }
  });

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const handleChangePlan = () => {
    setShowChangeModal(true);
  };

  const handleToggleAutoRenew = () => {
    console.log('Toggle auto-renew');
    alert('Auto-renew settings updated');
  };

  const confirmCancellation = () => {
    console.log('Subscription cancelled');
    alert('Your subscription has been cancelled. You will have access until the end of your billing period.');
    setShowCancelModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Subscription</h1>
        <p className="text-gray-600">View and modify your subscription settings</p>
      </div>

      {/* Subscription Overview */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Current Subscription</h2>
              <p className="text-gray-600">{subscription.plan} Plan</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-medium ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : subscription.status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Billing Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Plan Price</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${subscription.price}/{subscription.billingCycle}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Billing Date</p>
                  <p className="text-lg font-semibold text-gray-900">{subscription.nextBillingDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscription Started</p>
                  <p className="text-lg font-semibold text-gray-900">{subscription.startDate}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Payment Method</h3>
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{subscription.paymentMethod.type}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {subscription.paymentMethod.expiryMonth}/{subscription.paymentMethod.expiryYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Update Payment Method
              </button>
            </div>
          </div>

          {/* Auto-Renew Toggle */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Auto-Renewal</h3>
                <p className="text-sm text-gray-600">
                  Automatically renew your subscription at the end of each billing period
                </p>
              </div>
              <button
                onClick={handleToggleAutoRenew}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  subscription.autoRenew ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    subscription.autoRenew ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={handleChangePlan}
          className="p-6 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-left"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Change Plan</h3>
          <p className="text-sm text-gray-600">Upgrade or downgrade your subscription</p>
        </button>

        <button
          onClick={() => window.location.href = '/subscription/addons'}
          className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Add-ons</h3>
          <p className="text-sm text-gray-600">Enhance your plan with additional features</p>
        </button>
      </div>

      {/* Billing History */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Billing History</h2>
            <p className="text-gray-600">Your latest subscription charges</p>
          </div>
          <Link
            href="/billing/invoices"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View All Invoices
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2026-01-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Professional Plan - Monthly</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$99.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-12-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Professional Plan - Monthly</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$99.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-11-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Professional Plan - Monthly</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$99.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border-2 border-red-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-red-200 bg-red-50">
          <h2 className="text-xl font-bold text-red-900 mb-1">Danger Zone</h2>
          <p className="text-red-700">Irreversible actions for your subscription</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Cancel Subscription</h3>
              <p className="text-sm text-gray-600">
                You will continue to have access until the end of your current billing period
              </p>
            </div>
            <button
              onClick={handleCancelSubscription}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Subscription?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You will continue to have access until {subscription.nextBillingDate}.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={confirmCancellation}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Plan</h3>
            <p className="text-gray-600 mb-6">
              Would you like to upgrade or downgrade your plan?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/billing/upgrade"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                View Available Plans
              </Link>
              <button
                onClick={() => setShowChangeModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
