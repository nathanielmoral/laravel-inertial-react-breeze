import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Activity,
  Globe,
  Server,
  Cpu,
  Check,
  X,
  Filter,
  Download,
  ChevronDown,
  UserCheck,
  Eye,
  AlertCircle,
  LogIn,
  Settings,
  FileText
} from 'lucide-react';

export default function Analytics({ auth, users, activityLog, recentUsers }) {
  const [dateFilter, setDateFilter] = useState('30days');
  const [loading, setLoading] = useState(false);
  const [userActivityData, setUserActivityData] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    returningUsers: 0
  });


  useEffect(() => {
    if (users && users.length) {
      const total = users.length;
      const active = users.filter(user => user.last_login_at && 
        new Date(user.last_login_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
      const newUsers = users.filter(user => 
        new Date(user.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
      
      setUserStats({
        totalUsers: total,
        activeUsers: active,
        newUsers: newUsers,
        returningUsers: active - newUsers > 0 ? active - newUsers : 0
      });

      const last30Days = Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const dailyActivity = last30Days.map(day => {
        return {
          date: day,
          newUsers: users.filter(user => user.created_at.split('T')[0] === day).length,
          activeUsers: users.filter(user => user.last_login_at && user.last_login_at.split('T')[0] === day).length
        };
      });

      setUserActivityData(dailyActivity);
    }
  }, [users]);

  const handleDateFilterChange = (filter) => {
    setLoading(true);
    setDateFilter(filter);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return <LogIn size={16} className="text-blue-500" />;
      case 'logout': return <LogIn size={16} className="text-gray-500" />;
      case 'create': return <FileText size={16} className="text-green-500" />;
      case 'update': return <Settings size={16} className="text-orange-500" />;
      case 'delete': return <AlertCircle size={16} className="text-red-500" />;
      case 'view': return <Eye size={16} className="text-indigo-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };


  const deviceUsage = [
    { name: 'Desktop', value: 64, color: 'bg-blue-500' },
    { name: 'Mobile', value: 27, color: 'bg-indigo-500' },
    { name: 'Tablet', value: 9, color: 'bg-purple-500' }
  ];


  const topLocations = [
    { country: 'United States', users: 1245, percent: 42 },
    { country: 'United Kingdom', users: 532, percent: 18 },
    { country: 'Germany', users: 323, percent: 11 },
    { country: 'France', users: 276, percent: 9 },
    { country: 'Canada', users: 214, percent: 7 }
  ];


  const systemMetrics = [
    { name: 'Server Uptime', value: '99.98%', status: 'healthy', icon: <Server size={18} /> },
    { name: 'Average Response', value: '286ms', status: 'healthy', icon: <Clock size={18} /> },
    { name: 'CPU Usage', value: '24%', status: 'healthy', icon: <Cpu size={18} /> },
    { name: 'Memory Usage', value: '3.2/8GB', status: 'warning', icon: <Activity size={18} /> }
  ];

  return (
    <AdminLayout auth={auth}>
      <Head title="Analytics Dashboard" />
      
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Detailed insights into user engagement and system performance</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
            <div className="relative">
              <button className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 flex items-center">
                <Filter size={16} className="mr-2" />
                Filter Data
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDateFilterChange('7days')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                dateFilter === '7days' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              7 Days
            </button>
            <button 
              onClick={() => handleDateFilterChange('30days')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                dateFilter === '30days' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              30 Days
            </button>
            <button 
              onClick={() => handleDateFilterChange('90days')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                dateFilter === '90days' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              90 Days
            </button>
            <button 
              onClick={() => handleDateFilterChange('year')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                dateFilter === 'year' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Year
            </button>
            <button 
              onClick={() => handleDateFilterChange('custom')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                dateFilter === 'custom' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Custom
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">↑ 12%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Activity size={20} className="text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.activeUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">↑ 8%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp size={20} className="text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">New Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.newUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">↑ 16%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <BarChart2 size={20} className="text-orange-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Returning Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.returningUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-500">↓ 3%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <Activity size={20} className="text-gray-400" />
            </div>
            <div className="px-6 py-4 overflow-y-auto max-h-96">
              {activityLog && activityLog.length > 0 ? (
                <div className="space-y-4">
                  {activityLog.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-0">
                      <div className="p-2 rounded-full bg-gray-100">
                        {getActivityIcon(log.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-800">
                            {log.user ? log.user.name : 'System'}
                          </p>
                          <span className="text-xs text-gray-500">
                            {formatDate(log.created_at)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {log.description}
                        </p>
                        {log.properties && Object.keys(log.properties).length > 0 && (
                          <div className="mt-1 p-2 bg-gray-50 rounded-md">
                            <p className="text-xs text-gray-500 italic">
                              {log.properties.action || 'Performed action'} on {log.subject_type?.split('\\').pop() || 'resource'}
                              {log.properties.changes && ' (changed data)'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t border-gray-200 text-center">
              <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                View all activity
              </button>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recently Active Users</h3>
              <UserCheck size={20} className="text-gray-400" />
            </div>
            <div className="px-6 py-4 overflow-y-auto max-h-96">
              {recentUsers && recentUsers.length > 0 ? (
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-xs text-right">
                        <p className="text-gray-500">Last active</p>
                        <p className="font-medium text-gray-900">{formatDate(user.last_login_at || user.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p>No recent users to display</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t border-gray-200 text-center">
            <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
              <Link href={route('admin.users')}>
                  View all users
              </Link>
           </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Activity</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {userActivityData.slice(-15).map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center" style={{ width: '5%' }}>
                        <div className="flex flex-col h-48 w-full justify-end space-y-1">
                          <div 
                            className="bg-indigo-500 w-full rounded-t"
                            style={{ height: `${Math.min(100, day.activeUsers * 5)}%` }}
                          ></div>
                          <div 
                            className="bg-blue-300 w-full rounded-t"
                            style={{ height: `${Math.min(60, day.newUsers * 10)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 -rotate-45 origin-top-left">
                          {day.date.slice(-5)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 left-0 p-2 flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-500">Active Users</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-500">New Users</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Device Usage</h3>
            </div>
            <div className="p-6">
              <div className="h-48 relative flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 36 36" className="absolute inset-0">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      strokeDasharray="64, 100"
                      strokeDashoffset="25"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="4"
                      strokeDasharray="27, 100"
                      strokeDashoffset="64"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="4"
                      strokeDasharray="9, 100"
                      strokeDashoffset="91"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                {deviceUsage.map((device) => (
                  <div key={device.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${device.color} mr-2`}></div>
                      <span className="text-sm text-gray-600">{device.name}</span>
                    </div>
                    <span className="text-sm font-medium">{device.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Top User Locations</h3>
              <Globe size={20} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topLocations.map((location) => (
                  <div key={location.country} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{location.country}</span>
                      <span className="text-sm text-gray-500 ml-2">({location.users.toLocaleString()} users)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full" 
                          style={{ width: `${location.percent}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{location.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-500">
                  View detailed geography report
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">System Health</h3>
              <Server size={20} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        metric.status === 'healthy' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {metric.icon}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{metric.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{metric.value}</span>
                      {metric.status === 'healthy' ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Clock size={16} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-500">
                  View full system diagnostics
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">User Retention Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cohort
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week 1
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week 2
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week 3
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week 4
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    April 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    342
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        100%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        82%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        68%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        61%
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    March 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    289
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        100%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        78%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        63%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        57%
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    February 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    412
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        100%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        85%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        71%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        64%
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}