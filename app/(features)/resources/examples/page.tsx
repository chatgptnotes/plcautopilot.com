'use client';

import React, { useState } from 'react';

export default function ExamplesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const examples = [
    {
      id: '1',
      title: 'Motor Start-Stop Control',
      description: 'Basic motor control with start/stop buttons and safety interlocks',
      platform: 'siemens',
      type: 'motor-control',
      language: 'Ladder Logic',
      lines: 45,
      downloads: 2341,
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Conveyor Belt System',
      description: 'Multi-stage conveyor with sensors and emergency stop',
      platform: 'rockwell',
      type: 'automation',
      language: 'Structured Text',
      lines: 128,
      downloads: 1876,
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Temperature Control PID Loop',
      description: 'PID temperature controller with setpoint management',
      platform: 'mitsubishi',
      type: 'process-control',
      language: 'Ladder Logic',
      lines: 95,
      downloads: 1543,
      difficulty: 'advanced'
    },
    {
      id: '4',
      title: 'Traffic Light Controller',
      description: 'Intersection traffic light sequence with pedestrian crossing',
      platform: 'codesys',
      type: 'automation',
      language: 'Function Block',
      lines: 67,
      downloads: 3421,
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'Tank Level Control',
      description: 'Automated tank filling with level sensors and pump control',
      platform: 'siemens',
      type: 'process-control',
      language: 'Ladder Logic',
      lines: 82,
      downloads: 1987,
      difficulty: 'intermediate'
    },
    {
      id: '6',
      title: 'Bottle Filling Station',
      description: 'Automated filling station with counting and sorting',
      platform: 'rockwell',
      type: 'automation',
      language: 'Ladder Logic',
      lines: 156,
      downloads: 2156,
      difficulty: 'advanced'
    },
    {
      id: '7',
      title: 'HVAC System Control',
      description: 'Heating, ventilation, and air conditioning control logic',
      platform: 'siemens',
      type: 'building-automation',
      language: 'Structured Text',
      lines: 203,
      downloads: 1432,
      difficulty: 'advanced'
    },
    {
      id: '8',
      title: 'Alarm Management System',
      description: 'Comprehensive alarm handling with priorities and notifications',
      platform: 'codesys',
      type: 'safety',
      language: 'Function Block',
      lines: 112,
      downloads: 1765,
      difficulty: 'intermediate'
    }
  ];

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'siemens', name: 'Siemens' },
    { id: 'rockwell', name: 'Rockwell/Allen-Bradley' },
    { id: 'mitsubishi', name: 'Mitsubishi' },
    { id: 'codesys', name: 'CODESYS' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'motor-control', name: 'Motor Control' },
    { id: 'automation', name: 'Automation' },
    { id: 'process-control', name: 'Process Control' },
    { id: 'building-automation', name: 'Building Automation' },
    { id: 'safety', name: 'Safety Systems' }
  ];

  const filteredExamples = examples.filter(example => {
    const matchesPlatform = selectedPlatform === 'all' || example.platform === selectedPlatform;
    const matchesType = selectedType === 'all' || example.type === selectedType;
    return matchesPlatform && matchesType;
  });

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      siemens: 'bg-blue-100 text-blue-800',
      rockwell: 'bg-red-100 text-red-800',
      mitsubishi: 'bg-green-100 text-green-800',
      codesys: 'bg-purple-100 text-purple-800'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Examples</h1>
        <p className="text-gray-600">Ready-to-use PLC programs for common automation tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Examples</h3>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">{examples.length}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Platforms</h3>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">4</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Downloads</h3>
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">16.5K</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Categories</h3>
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {platforms.map(platform => (
                <option key={platform.id} value={platform.id}>{platform.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="space-y-4">
        {filteredExamples.map((example) => (
          <div
            key={example.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{example.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(example.difficulty)}`}>
                      {example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{example.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${getPlatformColor(example.platform)}`}>
                      {platforms.find(p => p.id === example.platform)?.name}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {example.language}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {example.lines} lines
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {example.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Code
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contribute CTA */}
      <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Share Your Examples</h2>
            <p className="text-green-100 mb-4">
              Help the community by contributing your PLC programs
            </p>
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
              Submit Example
            </button>
          </div>
          <svg className="w-32 h-32 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
