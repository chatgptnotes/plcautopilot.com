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
    {
      label: 'Programs Generated',
      value: '24',
      change: '+12%',
      iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      label: 'PLCs Recommended',
      value: '8',
      change: '+5%',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    },
    {
      label: 'Errors Fixed',
      value: '16',
      change: '+8%',
      iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      label: 'Downloads',
      value: '32',
      change: '+20%',
      iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
    },
  ];

  const recentProjects = [
    { name: 'Motor Start/Stop Control', plc: 'Schneider TM221', date: '2025-12-20', status: 'Completed' },
    { name: 'Conveyor System', plc: 'Siemens S7-1200', date: '2025-12-19', status: 'In Progress' },
    { name: 'Tank Level Control', plc: 'Rockwell CompactLogix', date: '2025-12-18', status: 'Completed' },
  ];

  const quickActions = [
    {
      title: 'Generate PLC Program',
      link: '/generator',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'blue'
    },
    {
      title: 'Find Right PLC',
      link: '/plc-selector',
      iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      color: 'green'
    },
    {
      title: 'Get Recommendation',
      link: '/solutions/recommend',
      iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      color: 'purple'
    },
    {
      title: 'Chat with Engineer',
      link: '/engineer-chat',
      iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      color: 'orange'
    },
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
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.iconPath} />
                </svg>
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
                <svg className={`w-10 h-10 mb-3 text-${action.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.iconPath} />
                </svg>
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
