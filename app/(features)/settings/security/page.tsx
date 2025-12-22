'use client';

import React, { useState } from 'react';

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Detroit, Michigan',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Detroit, Michigan',
      ip: '192.168.1.101',
      lastActive: '2 hours ago',
      current: false
    }
  ]);

  const handleChangePassword = () => {
    alert('Password change functionality');
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
        <p className="text-gray-600">Manage your account security and authentication</p>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
          <p className="text-gray-600 mb-4">Change your password regularly to keep your account secure</p>
          <button
            onClick={handleChangePassword}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
              <p className="text-gray-600 mb-4">
                Add an extra layer of security to your account
              </p>
              {twoFactorEnabled && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    Two-factor authentication is enabled. You will be required to enter a code from your authenticator app when logging in.
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleEnable2FA}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                twoFactorEnabled
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Sessions</h3>
            <p className="text-gray-600">Manage devices where you're currently logged in</p>
          </div>
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <p className="text-sm text-gray-500">IP: {session.ip} • {session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Log */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Successful login</p>
                <p className="text-sm text-gray-600">2 minutes ago from Detroit, Michigan</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Password changed</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">API key created</p>
                <p className="text-sm text-gray-600">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
