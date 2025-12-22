import React from 'react';
import { 
  Users, 
  FileText, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewTab = ({ clinic, patients = [], reports = [], usage = {}, onRefresh }) => {
  const usagePercentage = clinic?.reportsUsed && clinic?.reportsAllowed 
    ? (clinic.reportsUsed / clinic.reportsAllowed) * 100 
    : 0;

  const stats = [
    {
      name: 'Total Patients',
      value: patients.length,
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Reports Generated',
      value: reports.length,
      change: '+8%',
      changeType: 'increase',
      icon: FileText,
      color: 'green'
    },
    {
      name: 'Reports Used',
      value: clinic?.reportsUsed || 0,
      total: clinic?.reportsAllowed || 10,
      icon: Activity,
      color: 'purple'
    },
    {
      name: 'System Status',
      value: 'Operational',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  // Helper function to format time ago
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Generate dynamic recent activities from real data
  const recentActivities = React.useMemo(() => {
    const activities = [];

    // Add recent patients (last 5)
    const recentPatients = [...patients]
      .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
      .slice(0, 5);

    recentPatients.forEach(patient => {
      activities.push({
        id: `patient-${patient.id}`,
        type: 'patient',
        message: `New patient ${patient.full_name || patient.fullName || patient.name || 'Unknown'} registered`,
        time: getTimeAgo(patient.created_at || patient.createdAt),
        timestamp: new Date(patient.created_at || patient.createdAt),
        icon: Users,
        color: 'blue'
      });
    });

    // Add recent reports (last 5)
    const recentReports = [...reports]
      .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
      .slice(0, 5);

    recentReports.forEach(report => {
      const patientName = report.patient_name || report.patientName || 'Unknown Patient';
      activities.push({
        id: `report-${report.id}`,
        type: 'report',
        message: `Report generated for ${patientName}`,
        time: getTimeAgo(report.created_at || report.createdAt),
        timestamp: new Date(report.created_at || report.createdAt),
        icon: FileText,
        color: 'green'
      });
    });

    // Add usage warning if approaching limit
    if (clinic?.reportsUsed && clinic?.reportsAllowed) {
      const usagePercent = (clinic.reportsUsed / clinic.reportsAllowed) * 100;
      if (usagePercent >= 80) {
        activities.push({
          id: 'usage-warning',
          type: 'alert',
          message: 'Approaching report usage limit',
          time: 'Active',
          timestamp: new Date(),
          icon: AlertTriangle,
          color: 'yellow'
        });
      }
    }

    // Sort by timestamp (most recent first) and return top 10
    return activities
      .sort((a, b) => (b.timestamp || new Date()) - (a.timestamp || new Date()))
      .slice(0, 10);
  }, [patients, reports, clinic]);

  const getIconColor = (color) => {
    const colors = {
      blue: 'bg-[#323956]',
      green: 'bg-[#323956]',
      purple: 'bg-[#323956]',
      yellow: 'bg-[#F5D05D]',
      red: 'bg-red-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#323956] to-[#232D3C] rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {clinic?.name || 'Clinic'}</h1>
            <p className="text-[#E4EFFF] mt-2">
              Manage your patients and EEG reports efficiently
            </p>
          </div>
          <div className="hidden md:block">
            <Activity className="h-16 w-16 text-[#F5D05D]" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-gray-900/20 transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getIconColor(stat.color)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              {stat.change && (
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-[#323956] dark:text-blue-400 mr-1" />
                  <span className="text-sm font-medium text-[#323956] dark:text-blue-400">{stat.change}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Overview</h3>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Report Usage</span>
              <span>{clinic?.reportsUsed || 0} / {clinic?.reportsAllowed || 10}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  usagePercentage >= 90 ? 'bg-red-500' :
                  usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-[#323956] dark:bg-blue-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {usagePercentage >= 90 ? 'Critical: Approaching limit' :
               usagePercentage >= 70 ? 'Warning: Usage high' :
               'Good: Within normal range'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Remaining Reports</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {Math.max(0, (clinic?.reportsAllowed || 10) - (clinic?.reportsUsed || 0))}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Subscription Status</span>
              <span className="text-sm text-[#323956] dark:text-blue-400 font-medium">Active</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/clinic/subscription"
              className="w-full bg-primary-600 dark:bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-blue-700 transition-colors text-center block"
            >
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
            <button
              onClick={onRefresh}
              className="text-sm text-primary-600 dark:text-blue-400 hover:text-primary-500 dark:hover:text-blue-300 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getIconColor(activity.color)}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 dark:text-gray-500 mr-1" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Activities will appear here as you add patients and generate reports</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/clinic/patients"
            className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus className="h-8 w-8 text-[#323956] dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Add Patient</span>
          </Link>

          <Link
            to="/clinic/reports"
            className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FileText className="h-8 w-8 text-[#323956] dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">View Reports</span>
          </Link>

          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-8 w-8 text-[#323956] dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Export Data</span>
          </button>

          <Link
            to="/clinic/usage"
            className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye className="h-8 w-8 text-[#F5D05D] dark:text-yellow-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Usage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;