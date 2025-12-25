'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documentation', count: 47 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'plc-platforms', name: 'PLC Platforms', count: 12 },
    { id: 'ai-features', name: 'AI Features', count: 9 },
    { id: 'api', name: 'API Reference', count: 15 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 3 }
  ];

  const docs = [
    {
      id: '1',
      title: 'Quick Start Guide',
      description: 'Get up and running with PLCAutoPilot in 5 minutes',
      category: 'getting-started',
      readTime: '5 min',
      updated: '2026-02-10',
      popular: true
    },
    {
      id: '2',
      title: 'Understanding IEC 61131-3 Standards',
      description: 'Learn about the international standard for PLC programming languages',
      category: 'getting-started',
      readTime: '12 min',
      updated: '2026-02-05',
      popular: true
    },
    {
      id: '3',
      title: 'Siemens TIA Portal Integration',
      description: 'Complete guide to working with Siemens S7-1200 and S7-1500 series',
      category: 'plc-platforms',
      readTime: '18 min',
      updated: '2026-02-12',
      popular: true
    },
    {
      id: '4',
      title: 'Rockwell Studio 5000 Setup',
      description: 'Configure PLCAutoPilot for Allen-Bradley ControlLogix and CompactLogix',
      category: 'plc-platforms',
      readTime: '15 min',
      updated: '2026-02-08',
      popular: false
    },
    {
      id: '5',
      title: 'Mitsubishi GX Works Configuration',
      description: 'Working with Mitsubishi FX and Q series PLCs',
      category: 'plc-platforms',
      readTime: '14 min',
      updated: '2026-02-06',
      popular: false
    },
    {
      id: '6',
      title: 'CODESYS Universal Platform',
      description: 'Access 500+ PLC brands through CODESYS integration',
      category: 'plc-platforms',
      readTime: '20 min',
      updated: '2026-02-11',
      popular: true
    },
    {
      id: '7',
      title: 'AI Code Generation Basics',
      description: 'Learn how to use AI to generate ladder logic from specifications',
      category: 'ai-features',
      readTime: '10 min',
      updated: '2026-02-09',
      popular: true
    },
    {
      id: '8',
      title: 'Advanced AI Prompting Techniques',
      description: 'Get better results with optimized prompts and context',
      category: 'ai-features',
      readTime: '16 min',
      updated: '2026-02-07',
      popular: false
    },
    {
      id: '9',
      title: 'Custom AI Model Training',
      description: 'Train AI on your company-specific coding patterns',
      category: 'ai-features',
      readTime: '25 min',
      updated: '2026-02-04',
      popular: false
    },
    {
      id: '10',
      title: 'REST API Overview',
      description: 'Introduction to the PLCAutoPilot REST API',
      category: 'api',
      readTime: '8 min',
      updated: '2026-02-13',
      popular: true
    },
    {
      id: '11',
      title: 'Authentication and API Keys',
      description: 'Secure your API integrations with proper authentication',
      category: 'api',
      readTime: '7 min',
      updated: '2026-02-12',
      popular: false
    },
    {
      id: '12',
      title: 'Webhook Integration Guide',
      description: 'Set up real-time notifications for program generation events',
      category: 'api',
      readTime: '12 min',
      updated: '2026-02-10',
      popular: false
    },
    {
      id: '13',
      title: 'Common Error Messages',
      description: 'Solutions to frequently encountered errors',
      category: 'troubleshooting',
      readTime: '6 min',
      updated: '2026-02-11',
      popular: true
    },
    {
      id: '14',
      title: 'Debugging Generated Code',
      description: 'Tools and techniques for troubleshooting PLC programs',
      category: 'troubleshooting',
      readTime: '15 min',
      updated: '2026-02-09',
      popular: false
    }
  ];

  const filteredDocs = docs.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularDocs = docs.filter(doc => doc.popular).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
        <p className="text-gray-600">Comprehensive guides and references for PLCAutoPilot</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Popular Docs */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularDocs.map((doc) => (
            <Link
              key={doc.id}
              href={`/resources/docs/${doc.id}`}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all"
            >
              <h3 className="font-semibold mb-2">{doc.title}</h3>
              <p className="text-sm text-blue-100">{doc.readTime} read</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Documentation List */}
        <div className="lg:col-span-3">
          {filteredDocs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documentation found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/resources/docs/${doc.id}`}
                  className="block bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                        {doc.popular && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {doc.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Updated {doc.updated}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {categories.find(c => c.id === doc.category)?.name}
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/resources/tutorials"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
          <p className="text-gray-600">Watch step-by-step guides</p>
        </Link>

        <Link
          href="/resources/examples"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Examples</h3>
          <p className="text-gray-600">Browse sample programs</p>
        </Link>

        <Link
          href="/support/help"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Help</h3>
          <p className="text-gray-600">Contact support team</p>
        </Link>
      </div>
    </div>
  );
}
