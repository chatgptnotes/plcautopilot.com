'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    { label: 'Programs Generated', value: '24', change: '+12%', icon: '📄' },
    { label: 'PLCs Recommended', value: '8', change: '+5%', icon: '🎯' },
    { label: 'Errors Fixed', value: '16', change: '+8%', icon: '🔧' },
    { label: 'Downloads', value: '32', change: '+20%', icon: '⬇️' },
  ];

  const recentProjects = [
    { name: 'Motor Start/Stop Control', plc: 'Schneider TM221', date: '2025-12-20', status: 'Completed' },
    { name: 'Conveyor System', plc: 'Siemens S7-1200', date: '2025-12-19', status: 'In Progress' },
    { name: 'Tank Level Control', plc: 'Rockwell CompactLogix', date: '2025-12-18', status: 'Completed' },
  ];

  const quickActions = [
    { title: 'Generate PLC Program', link: '/generator', icon: '⚡', color: 'blue' },
    { title: 'Find Right PLC', link: '/plc-selector', icon: '🔍', color: 'green' },
    { title: 'Get Recommendation', link: '/solutions/recommend', icon: '💡', color: 'purple' },
    { title: 'Chat with Engineer', link: '/engineer-chat', icon: '💬', color: 'orange' },
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your automation projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={`bg-${action.color}-50 border-2 border-${action.color}-200 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1`}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              <Link href="/projects/active" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.plc}</p>
                      <p className="text-xs text-gray-500 mt-1">{project.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Usage Summary</h2>
              <Link href="/billing/usage" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Details →
              </Link>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Programs Generated</span>
                  <span className="text-sm font-semibold text-gray-900">24 / 50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">API Calls</span>
                  <span className="text-sm font-semibold text-gray-900">342 / 1000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Storage Used</span>
                  <span className="text-sm font-semibold text-gray-900">2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">Professional Plan</p>
                <p className="text-xs text-blue-700 mb-3">Next billing: January 20, 2026</p>
                <Link
                  href="/billing/upgrade"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/resources/docs" className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-gray-900 mb-1">Documentation</h3>
              <p className="text-sm text-gray-600">Complete guides and API docs</p>
            </Link>
            <Link href="/resources/tutorials" className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🎥</div>
              <h3 className="font-semibold text-gray-900 mb-1">Video Tutorials</h3>
              <p className="text-sm text-gray-600">Step-by-step walkthroughs</p>
            </Link>
            <Link href="/resources/examples" className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">💻</div>
              <h3 className="font-semibold text-gray-900 mb-1">Code Examples</h3>
              <p className="text-sm text-gray-600">Sample projects and templates</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
