'use client';

import React, { useState } from 'react';
import { BookOpen, Package, Star, Download, Upload, Search, Filter, Tag, Code, Zap } from 'lucide-react';

interface LibraryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  platform: string[];
  verified: boolean;
  downloads: number;
  rating: number;
  lastUpdated: string;
}

export default function AILibraryManagerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const libraries: LibraryItem[] = [
    {
      id: '1',
      name: 'Pump Control Station',
      category: 'Process Control',
      description: 'Complete pump station control with dual pump operation, level control, and safety interlocks',
      platform: ['Schneider M580', 'Schneider M340', 'Siemens S7'],
      verified: true,
      downloads: 1247,
      rating: 4.8,
      lastUpdated: '2025-12-20'
    },
    {
      id: '2',
      name: 'Motor Start/Stop with VFD',
      category: 'Motor Control',
      description: 'Variable frequency drive motor control with ramping, fault detection, and energy optimization',
      platform: ['Schneider M221', 'Rockwell CompactLogix'],
      verified: true,
      downloads: 2103,
      rating: 4.9,
      lastUpdated: '2025-12-18'
    },
    {
      id: '3',
      name: 'Valve Sequencing',
      category: 'Process Control',
      description: 'Multi-valve sequencing with timing control and position feedback',
      platform: ['Schneider M580', 'Mitsubishi iQ-R'],
      verified: true,
      downloads: 876,
      rating: 4.7,
      lastUpdated: '2025-12-15'
    },
    {
      id: '4',
      name: 'Temperature PID Control',
      category: 'Process Control',
      description: 'Advanced PID temperature control with auto-tuning and cascade options',
      platform: ['Schneider M580', 'Siemens S7', 'CODESYS'],
      verified: true,
      downloads: 1654,
      rating: 4.9,
      lastUpdated: '2025-12-22'
    },
    {
      id: '5',
      name: 'Conveyor Belt System',
      category: 'Material Handling',
      description: 'Multi-zone conveyor control with accumulation, tracking, and emergency stop',
      platform: ['Rockwell ControlLogix', 'Schneider M340'],
      verified: true,
      downloads: 1432,
      rating: 4.6,
      lastUpdated: '2025-12-10'
    },
    {
      id: '6',
      name: 'Tank Level Control',
      category: 'Process Control',
      description: 'Automated tank filling and draining with overflow protection and pump control',
      platform: ['Schneider M221', 'Schneider M241', 'CODESYS'],
      verified: true,
      downloads: 1989,
      rating: 4.8,
      lastUpdated: '2025-12-19'
    }
  ];

  const categories = ['all', 'Process Control', 'Motor Control', 'Material Handling', 'Safety Systems'];
  const platforms = ['all', 'Schneider M580', 'Schneider M340', 'Schneider M221', 'Siemens S7', 'Rockwell ControlLogix', 'CODESYS'];

  const filteredLibraries = libraries.filter(lib => {
    const matchesSearch = lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lib.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lib.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || lib.platform.includes(selectedPlatform);

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BookOpen className="text-blue-600" size={32} />
                AI Library Manager
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Reuse tested and validated function blocks across all platforms
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Upload size={20} />
              Upload Library
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Libraries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              </div>
              <Package className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">142</p>
              </div>
              <Star className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45.2K</p>
              </div>
              <Download className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
              </div>
              <Star className="text-yellow-600 fill-yellow-600" size={32} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search libraries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {platforms.map(plat => (
                  <option key={plat} value={plat}>
                    {plat === 'all' ? 'All Platforms' : plat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibraries.map((lib) => (
            <div
              key={lib.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{lib.name}</h3>
                      {lib.verified && (
                        <Star className="text-yellow-600 fill-yellow-600" size={16} />
                      )}
                    </div>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {lib.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {lib.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Tag size={14} />
                    <span className="line-clamp-1">{lib.platform.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={14} />
                      <span>{lib.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>{lib.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                    <Download size={16} />
                    Use Library
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <Code size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} />
            <h2 className="text-xl font-semibold">AI Recommendations</h2>
          </div>
          <p className="mb-4">
            Based on your recent projects, the AI suggests these libraries:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-medium mb-2">Pump Control Station</h3>
              <p className="text-sm opacity-90">Matches 3 of your active projects</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-medium mb-2">Temperature PID Control</h3>
              <p className="text-sm opacity-90">Used in similar applications</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-medium mb-2">Safety Interlock System</h3>
              <p className="text-sm opacity-90">Recommended for your platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
