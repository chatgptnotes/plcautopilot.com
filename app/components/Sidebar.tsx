'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  link: string;
  items: Array<{ title: string; link: string }>;
  badge?: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuSections = [
    {
      id: 'home',
      title: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      link: '/',
      items: [],
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
        </svg>
      ),
      link: '/dashboard',
      items: [],
    },
    {
      id: 'ai-copilot',
      title: 'AI Co-Pilot',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      link: '/ai-copilot',
      items: [
        { title: 'AI Co-Pilot', link: '/ai-copilot' },
        { title: 'Application Generator', link: '/ai-application-generator' },
        { title: 'Code Optimizer', link: '/ai-code-optimizer' },
        { title: 'Library Manager', link: '/ai-library-manager' },
      ],
      badge: 'AI',
    },
    {
      id: 'generator',
      title: 'PLC Generator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      link: '/generator',
      items: [],
      badge: 'Popular',
    },
    {
      id: 'm221-generator',
      title: 'M221 Generator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      link: '/m221-generator',
      items: [],
      badge: 'AI',
    },
    {
      id: 'plc-selector',
      title: 'PLC Selector',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      link: '/plc-selector',
      items: [],
      badge: 'New',
    },
    {
      id: 'hmi-generator',
      title: 'HMI Generator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/hmi-generator',
      items: [],
      badge: 'Popular',
    },
    {
      id: 'solutions',
      title: 'Solution Finder',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      link: '/solutions',
      items: [
        { title: 'Recommendation Engine', link: '/solutions/recommend' },
        { title: 'Compare Solutions', link: '/solutions/compare' },
        { title: 'Cost Calculator', link: '/solutions/calculator' },
      ],
    },
    {
      id: 'projects',
      title: 'My Projects',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/projects',
      items: [
        { title: 'Active Projects', link: '/projects/active' },
        { title: 'Completed', link: '/projects/completed' },
        { title: 'Templates', link: '/projects/templates' },
      ],
    },
    {
      id: 'platforms',
      title: 'PLC Platforms',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/platforms',
      items: [
        { title: 'Schneider Electric', link: '/platforms/schneider' },
        { title: 'Siemens', link: '/platforms/siemens' },
        { title: 'Rockwell', link: '/platforms/rockwell' },
        { title: 'Mitsubishi', link: '/platforms/mitsubishi' },
        { title: 'CODESYS (500+ brands)', link: '/platforms/codesys' },
      ],
    },
    {
      id: 'sap',
      title: 'SAP Integration',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      link: '/sap',
      items: [
        { title: 'Export to SAP', link: '/sap/export' },
        { title: 'SAP Configuration', link: '/sap/config' },
      ],
      badge: 'New',
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      link: '/billing',
      items: [
        { title: 'Current Plan', link: '/billing/plan' },
        { title: 'Usage & Credits', link: '/billing/usage' },
        { title: 'Payment Methods', link: '/billing/payment' },
        { title: 'Invoices', link: '/billing/invoices' },
        { title: 'Upgrade Plan', link: '/billing/upgrade' },
      ],
    },
    {
      id: 'subscription',
      title: 'Subscription',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/subscription',
      items: [
        { title: 'Plans & Pricing', link: '/subscription/plans' },
        { title: 'Manage Subscription', link: '/subscription/manage' },
        { title: 'Add-ons', link: '/subscription/addons' },
        { title: 'Team Members', link: '/subscription/team' },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: '/resources',
      items: [
        { title: 'Documentation', link: '/resources/docs' },
        { title: 'Video Tutorials', link: '/resources/tutorials' },
        { title: 'Code Examples', link: '/resources/examples' },
        { title: 'Community Forum', link: '/resources/forum' },
      ],
    },
    {
      id: 'engineer-chat',
      title: 'Engineer Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      link: '/engineer-chat',
      items: [],
      badge: 'Live',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/settings',
      items: [
        { title: 'Profile', link: '/settings/profile' },
        { title: 'Preferences', link: '/settings/preferences' },
        { title: 'API Keys', link: '/settings/api' },
        { title: 'Notifications', link: '/settings/notifications' },
        { title: 'Security', link: '/settings/security' },
      ],
    },
    {
      id: 'support',
      title: 'Help & Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      link: '/support',
      items: [
        { title: 'Help Center', link: '/support/help' },
        { title: 'Contact Us', link: '/support/contact' },
        { title: 'Submit Ticket', link: '/support/ticket' },
        { title: 'Documentation', link: '/resources/docs' },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const isActive = (link: string) => pathname === link;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-bold text-xl">PLCAutoPilot</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuSections.map((section) => (
                <li key={section.id}>
                  {section.items.length === 0 ? (
                    <Link
                      href={section.link}
                      className={`
                        flex items-center justify-between px-3 py-2 rounded-lg
                        transition-colors duration-150
                        ${
                          isActive(section.link)
                            ? 'bg-green-50 text-green-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => onClose()}
                    >
                      <div className="flex items-center space-x-3">
                        {section.icon}
                        <span className="font-medium">{section.title}</span>
                      </div>
                      {section.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          section.badge === 'AI' ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' :
                          section.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
                          section.badge === 'New' ? 'bg-green-100 text-green-700' :
                          section.badge === 'Live' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {section.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg
                          transition-colors duration-150
                          ${
                            isActive(section.link)
                              ? 'bg-green-50 text-green-600'
                              : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          {section.icon}
                          <span className="font-medium">{section.title}</span>
                          {section.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              section.badge === 'AI' ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700' :
                              section.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
                              section.badge === 'New' ? 'bg-green-100 text-green-700' :
                              section.badge === 'Live' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {section.badge}
                            </span>
                          )}
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedSection === section.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Submenu */}
                      <ul
                        className={`
                          mt-1 space-y-1 ml-8 overflow-hidden transition-all duration-200
                          ${expandedSection === section.id ? 'max-h-96' : 'max-h-0'}
                        `}
                      >
                        {section.items.map((item) => (
                          <li key={item.link}>
                            <Link
                              href={item.link}
                              className={`
                                block px-3 py-2 text-sm rounded-lg
                                transition-colors duration-150
                                ${
                                  isActive(item.link)
                                    ? 'bg-green-50 text-green-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }
                              `}
                              onClick={() => onClose()}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">User Account</p>
                <p className="text-xs text-gray-500 truncate">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
