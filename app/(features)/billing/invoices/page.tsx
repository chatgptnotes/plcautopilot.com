'use client';

import React, { useState } from 'react';

export default function InvoicesPage() {
  const [invoices] = useState([
    {
      id: 'INV-2026-001',
      date: '2026-01-15',
      amount: 99.00,
      status: 'paid',
      period: 'Jan 15 - Feb 14, 2026',
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'INV-2025-012',
      date: '2025-12-15',
      amount: 99.00,
      status: 'paid',
      period: 'Dec 15 - Jan 14, 2026',
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'INV-2025-011',
      date: '2025-11-15',
      amount: 99.00,
      status: 'paid',
      period: 'Nov 15 - Dec 14, 2025',
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'INV-2025-010',
      date: '2025-10-15',
      amount: 99.00,
      status: 'paid',
      period: 'Oct 15 - Nov 14, 2025',
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'INV-2025-009',
      date: '2025-09-15',
      amount: 99.00,
      status: 'paid',
      period: 'Sep 15 - Oct 14, 2025',
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'INV-2025-008',
      date: '2025-08-15',
      amount: 99.00,
      status: 'paid',
      period: 'Aug 15 - Sep 14, 2025',
      paymentMethod: 'Visa ending in 4242'
    }
  ]);

  const [billingInfo] = useState({
    company: 'Acme Manufacturing Corp',
    address: '123 Industrial Parkway',
    city: 'Detroit',
    state: 'MI',
    zip: '48201',
    country: 'United States',
    taxId: 'US123456789'
  });

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`);
    alert(`Invoice ${invoiceId} download started`);
  };

  const handleDownloadAll = () => {
    console.log('Downloading all invoices');
    alert('All invoices download started');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
        <p className="text-gray-600">View and download your billing history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Paid</h3>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">${(invoices.length * 99).toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Invoices</h3>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
          <p className="text-sm text-gray-500 mt-1">Since Jan 2025</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Next Payment</h3>
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">$99.00</p>
          <p className="text-sm text-gray-500 mt-1">Due Feb 15, 2026</p>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>
            <p className="text-gray-600 mt-1">Details that appear on your invoices</p>
          </div>
          <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Edit Details
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company Name</p>
              <p className="text-base text-gray-900">{billingInfo.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Tax ID</p>
              <p className="text-base text-gray-900">{billingInfo.taxId}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 mb-1">Billing Address</p>
              <p className="text-base text-gray-900">
                {billingInfo.address}<br />
                {billingInfo.city}, {billingInfo.state} {billingInfo.zip}<br />
                {billingInfo.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
            <p className="text-gray-600 mt-1">Download invoices and receipts</p>
          </div>
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Download All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {invoice.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium mr-4"
                    >
                      Download
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {invoices.length} of {invoices.length} invoices
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Method</h3>
            <p className="text-sm text-gray-600">Manage your payment methods</p>
          </div>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Update Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}
