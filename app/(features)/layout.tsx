'use client';

import Sidebar from '../components/Sidebar';

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        {children}
      </div>
    </div>
  );
}
