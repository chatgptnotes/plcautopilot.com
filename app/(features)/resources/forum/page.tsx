'use client';

import React, { useState } from 'react';

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 347, color: 'bg-gray-100 text-gray-800' },
    { id: 'general', name: 'General Discussion', count: 142, color: 'bg-blue-100 text-blue-800' },
    { id: 'help', name: 'Help & Support', count: 89, color: 'bg-green-100 text-green-800' },
    { id: 'feature-requests', name: 'Feature Requests', count: 56, color: 'bg-purple-100 text-purple-800' },
    { id: 'bug-reports', name: 'Bug Reports', count: 34, color: 'bg-red-100 text-red-800' },
    { id: 'showcase', name: 'Showcase', count: 26, color: 'bg-orange-100 text-orange-800' }
  ];

  const threads = [
    {
      id: '1',
      title: 'Best practices for Siemens S7-1500 integration?',
      category: 'help',
      author: 'John Smith',
      authorAvatar: 'JS',
      replies: 23,
      views: 456,
      lastActivity: '2 hours ago',
      isPinned: true,
      hasAcceptedAnswer: true
    },
    {
      id: '2',
      title: 'Feature Request: Support for Beckhoff TwinCAT',
      category: 'feature-requests',
      author: 'Sarah Johnson',
      authorAvatar: 'SJ',
      replies: 15,
      views: 289,
      lastActivity: '5 hours ago',
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: '3',
      title: 'Showcase: Automated warehouse system with 50+ PLCs',
      category: 'showcase',
      author: 'Michael Chen',
      authorAvatar: 'MC',
      replies: 41,
      views: 1234,
      lastActivity: '1 day ago',
      isPinned: true,
      hasAcceptedAnswer: false
    },
    {
      id: '4',
      title: 'Bug: AI generates incorrect ladder logic for timer sequences',
      category: 'bug-reports',
      author: 'David Brown',
      authorAvatar: 'DB',
      replies: 8,
      views: 167,
      lastActivity: '3 hours ago',
      isPinned: false,
      hasAcceptedAnswer: true
    },
    {
      id: '5',
      title: 'How to optimize AI prompts for complex PLC programs?',
      category: 'help',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      replies: 32,
      views: 723,
      lastActivity: '6 hours ago',
      isPinned: false,
      hasAcceptedAnswer: true
    },
    {
      id: '6',
      title: 'Rockwell ControlLogix vs CompactLogix: Which to choose?',
      category: 'general',
      author: 'Tom Anderson',
      authorAvatar: 'TA',
      replies: 19,
      views: 512,
      lastActivity: '12 hours ago',
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: '7',
      title: 'Request: Add support for custom ladder logic libraries',
      category: 'feature-requests',
      author: 'Lisa Martinez',
      authorAvatar: 'LM',
      replies: 27,
      views: 634,
      lastActivity: '1 day ago',
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: '8',
      title: 'Welcome to the PLCAutoPilot Community!',
      category: 'general',
      author: 'PLCAutoPilot Team',
      authorAvatar: 'PT',
      replies: 156,
      views: 4523,
      lastActivity: '2 days ago',
      isPinned: true,
      hasAcceptedAnswer: false
    }
  ];

  const filteredThreads = selectedCategory === 'all'
    ? threads
    : threads.filter(thread => thread.category === selectedCategory);

  const pinnedThreads = filteredThreads.filter(t => t.isPinned);
  const regularThreads = filteredThreads.filter(t => !t.isPinned);

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
            <p className="text-gray-600">Connect with other PLC developers and get help</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            New Topic
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Topics</h3>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">347</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Posts</h3>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">1.2K</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Members</h3>
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">4.3K</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Solved</h3>
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">89%</p>
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

        {/* Threads List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Pinned Threads */}
          {pinnedThreads.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pinned Topics</h2>
              <div className="space-y-3">
                {pinnedThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                        {thread.authorAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 5h2v3h10V5h2v5h2V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-2H5V5zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-900">{thread.title}</h3>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span>{thread.author}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(thread.category)}`}>
                                {categories.find(c => c.id === thread.category)?.name}
                              </span>
                              {thread.hasAcceptedAnswer && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                  </svg>
                                  Solved
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {thread.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {thread.views} views
                          </span>
                          <span className="ml-auto">{thread.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Threads */}
          <div>
            {pinnedThreads.length > 0 && <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Topics</h2>}
            <div className="space-y-3">
              {regularThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      {thread.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{thread.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{thread.author}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(thread.category)}`}>
                              {categories.find(c => c.id === thread.category)?.name}
                            </span>
                            {thread.hasAcceptedAnswer && (
                              <span className="flex items-center gap-1 text-green-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Solved
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {thread.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {thread.views} views
                        </span>
                        <span className="ml-auto">{thread.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
