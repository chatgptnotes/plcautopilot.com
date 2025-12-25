'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'getting-started', name: 'Getting Started', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'billing', name: 'Billing & Plans', iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'technical', name: 'Technical', iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'account', name: 'Account', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I get started with PLCAutoPilot?',
      answer: 'Start by creating an account, selecting your PLC platform, and describing your automation requirements. Our AI will generate ladder logic code tailored to your specifications.',
      category: 'getting-started',
      popular: true
    },
    {
      id: '2',
      question: 'Which PLC platforms are supported?',
      answer: 'We support Siemens (TIA Portal), Rockwell/Allen-Bradley (Studio 5000), Mitsubishi (GX Works), and 500+ brands through CODESYS integration.',
      category: 'getting-started',
      popular: true
    },
    {
      id: '3',
      question: 'How is billing calculated?',
      answer: 'Billing is based on your chosen plan (Starter, Professional, or Enterprise) and is charged monthly or annually. Each plan includes a set number of PLC programs and AI generation requests.',
      category: 'billing',
      popular: true
    },
    {
      id: '4',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your current billing period.',
      category: 'billing',
      popular: false
    },
    {
      id: '5',
      question: 'What if the AI generates incorrect code?',
      answer: 'Our AI is highly accurate, but you can always review and modify the generated code. We also offer debugging tools and support to help troubleshoot any issues.',
      category: 'technical',
      popular: true
    },
    {
      id: '6',
      question: 'Is my PLC code secure?',
      answer: 'Yes, all code is encrypted in transit and at rest. We follow industry-standard security practices and comply with IEC 61508 safety standards.',
      category: 'technical',
      popular: false
    },
    {
      id: '7',
      question: 'How do I add team members?',
      answer: 'Go to Settings > Team Management and click "Invite Member". Enter their email and assign a role (Admin, Member, or Viewer).',
      category: 'account',
      popular: false
    },
    {
      id: '8',
      question: 'Can I export my PLC programs?',
      answer: 'Yes, you can export programs in formats compatible with your PLC platform, including .s7p for Siemens, .ACD for Rockwell, and more.',
      category: 'technical',
      popular: true
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <p className="text-lg text-gray-600 mb-8">Search our knowledge base or browse categories below</p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          href="/support/contact"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-gray-600">Get help from our support team</p>
        </Link>

        <Link
          href="/resources/docs"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-gray-600">Browse our comprehensive guides</p>
        </Link>

        <Link
          href="/resources/forum"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all text-center"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Forum</h3>
          <p className="text-gray-600">Connect with other users</p>
        </Link>
      </div>

      {/* Popular Questions */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.iconPath} />
              </svg>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{faq.question}</h3>
                  {faq.popular && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full ml-4">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
        <p className="text-blue-100 mb-6">Our support team is here to assist you</p>
        <Link
          href="/support/contact"
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
