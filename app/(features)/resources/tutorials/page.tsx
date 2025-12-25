'use client';

import React, { useState } from 'react';

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const tutorials = [
    {
      id: '1',
      title: 'Getting Started with PLCAutoPilot',
      description: 'Complete beginner guide to your first PLC program',
      category: 'getting-started',
      difficulty: 'beginner',
      duration: '12:34',
      views: 15234,
      thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      completedUsers: 3421
    },
    {
      id: '2',
      title: 'Siemens S7-1500 Advanced Programming',
      description: 'Master advanced features of Siemens TIA Portal integration',
      category: 'plc-platforms',
      difficulty: 'advanced',
      duration: '28:15',
      views: 8934,
      thumbnail: 'bg-gradient-to-br from-green-500 to-teal-600',
      instructor: 'Michael Chen',
      rating: 4.9,
      completedUsers: 1823
    },
    {
      id: '3',
      title: 'AI Prompting for Better Code Generation',
      description: 'Learn techniques to get optimal results from AI',
      category: 'ai-features',
      difficulty: 'intermediate',
      duration: '18:42',
      views: 12456,
      thumbnail: 'bg-gradient-to-br from-orange-500 to-red-600',
      instructor: 'David Brown',
      rating: 4.7,
      completedUsers: 2987
    },
    {
      id: '4',
      title: 'Motor Control with Rockwell ControlLogix',
      description: 'Build motor start-stop programs for Allen-Bradley PLCs',
      category: 'plc-platforms',
      difficulty: 'intermediate',
      duration: '22:18',
      views: 10234,
      thumbnail: 'bg-gradient-to-br from-pink-500 to-rose-600',
      instructor: 'Sarah Johnson',
      rating: 4.6,
      completedUsers: 2145
    },
    {
      id: '5',
      title: 'CODESYS Platform Setup',
      description: 'Configure universal CODESYS integration for 500+ brands',
      category: 'plc-platforms',
      difficulty: 'beginner',
      duration: '15:30',
      views: 9876,
      thumbnail: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      instructor: 'Michael Chen',
      rating: 4.8,
      completedUsers: 2654
    },
    {
      id: '6',
      title: 'Safety Standards and IEC 61508 Compliance',
      description: 'Ensure your programs meet international safety standards',
      category: 'best-practices',
      difficulty: 'advanced',
      duration: '32:45',
      views: 7654,
      thumbnail: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      instructor: 'David Brown',
      rating: 4.9,
      completedUsers: 1532
    },
    {
      id: '7',
      title: 'Debugging Generated PLC Code',
      description: 'Tools and techniques for troubleshooting programs',
      category: 'troubleshooting',
      difficulty: 'intermediate',
      duration: '20:15',
      views: 11234,
      thumbnail: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      instructor: 'Sarah Johnson',
      rating: 4.7,
      completedUsers: 2876
    },
    {
      id: '8',
      title: 'API Integration Fundamentals',
      description: 'Connect PLCAutoPilot to your existing systems',
      category: 'api',
      difficulty: 'advanced',
      duration: '25:50',
      views: 6543,
      thumbnail: 'bg-gradient-to-br from-purple-500 to-pink-600',
      instructor: 'Michael Chen',
      rating: 4.8,
      completedUsers: 1687
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tutorials' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'plc-platforms', name: 'PLC Platforms' },
    { id: 'ai-features', name: 'AI Features' },
    { id: 'api', name: 'API Integration' },
    { id: 'best-practices', name: 'Best Practices' },
    { id: 'troubleshooting', name: 'Troubleshooting' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Tutorials</h1>
        <p className="text-gray-600">Learn PLCAutoPilot with step-by-step video guides</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Tutorials</h3>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">{tutorials.length}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">82K</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Rating</h3>
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">4.8</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Students</h3>
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">19K</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(diff => (
                <option key={diff.id} value={diff.id}>{diff.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Thumbnail */}
            <div className={`${tutorial.thumbnail} h-48 flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
                {tutorial.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                </span>
                <span className="text-xs text-gray-500">{tutorial.category.replace('-', ' ')}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {tutorial.description}
              </p>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>{tutorial.instructor}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{tutorial.rating}</span>
                  <span className="text-sm text-gray-500">({tutorial.completedUsers.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {tutorial.views.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Structured Learning Path</h2>
            <p className="text-blue-100 mb-4">
              Follow our curated curriculum from beginner to advanced topics
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              View Learning Path
            </button>
          </div>
          <svg className="w-32 h-32 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
    </div>
  );
}
