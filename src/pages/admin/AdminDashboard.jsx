import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    overview: {
      totalReports: 0,
      pendingReports: 0,
      inProgressReports: 0,
      resolvedReports: 0,
      criticalReports: 0,
      reportsThisWeek: 0,
      reportsThisMonth: 0,
      totalUsers: 0,
      activeUsers: 0,
      avgResolutionDays: 0
    },
    reportsByType: [],
    criticalReportsDetails: []
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchDashboardStats();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // For now, we'll use mock data
      setTimeout(() => {
        setStats({
          overview: {
            totalReports: 1247,
            pendingReports: 23,
            inProgressReports: 15,
            resolvedReports: 1209,
            criticalReports: 3,
            reportsThisWeek: 47,
            reportsThisMonth: 189,
            totalUsers: 5634,
            activeUsers: 2341,
            avgResolutionDays: 2.3
          },
          reportsByType: [
            { _id: 'LEAK', count: 456 },
            { _id: 'OUTAGE', count: 234 },
            { _id: 'CONTAMINATION', count: 178 },
            { _id: 'PRESSURE', count: 289 },
            { _id: 'EMERGENCY', count: 45 },
            { _id: 'MAINTENANCE', count: 45 }
          ],
          criticalReportsDetails: [
            {
              _id: '1',
              title: 'Major Water Leak on Main Street',
              type: 'LEAK',
              priority: 'CRITICAL',
              createdAt: new Date().toISOString(),
              reportedBy: { firstName: 'John', lastName: 'Doe' }
            },
            {
              _id: '2',
              title: 'Water Contamination Alert',
              type: 'CONTAMINATION',
              priority: 'CRITICAL',
              createdAt: new Date().toISOString(),
              reportedBy: { firstName: 'Jane', lastName: 'Smith' }
            }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const StatCard = ({ title, value, icon, color, change, trend, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <motion.p 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}
          >
            {value.toLocaleString()}
          </motion.p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {change}
          </p>
        </div>
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`text-4xl text-${color}-500`}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center">
        <div className={`text-4xl text-${color}-500 mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.overview.totalReports,
      icon: '📊',
      color: 'blue',
      change: `+${stats.overview.reportsThisWeek} this week`,
      trend: 12,
      onClick: () => window.location.href = '/admin/reports'
    },
    {
      title: 'Pending Reports',
      value: stats.overview.pendingReports,
      icon: '⏳',
      color: 'yellow',
      change: 'Awaiting review',
      trend: -5,
      onClick: () => window.location.href = '/admin/reports?status=PENDING'
    },
    {
      title: 'Critical Issues',
      value: stats.overview.criticalReports,
      icon: '🚨',
      color: 'red',
      change: 'Needs immediate attention',
      trend: 0,
      onClick: () => window.location.href = '/admin/emergency'
    },
    {
      title: 'Resolved Reports',
      value: stats.overview.resolvedReports,
      icon: '✅',
      color: 'green',
      change: `${stats.overview.avgResolutionDays.toFixed(1)} avg days`,
      trend: 8,
      onClick: () => window.location.href = '/admin/reports?status=RESOLVED'
    },
    {
      title: 'Total Users',
      value: stats.overview.totalUsers,
      icon: '👥',
      color: 'purple',
      change: `${stats.overview.activeUsers} active`,
      trend: 15,
      onClick: () => window.location.href = '/admin/users'
    },
    {
      title: 'In Progress',
      value: stats.overview.inProgressReports,
      icon: '🔄',
      color: 'orange',
      change: 'Currently being handled',
      trend: 3,
      onClick: () => window.location.href = '/admin/reports?status=IN_PROGRESS'
    }
  ];

  const quickActions = [
    {
      title: 'Emergency Response',
      description: 'Handle critical water issues',
      icon: '🚨',
      color: 'red',
      onClick: () => window.location.href = '/admin/emergency'
    },
    {
      title: 'Assign Reports',
      description: 'Distribute work to team members',
      icon: '📋',
      color: 'blue',
      onClick: () => window.location.href = '/admin/reports'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and roles',
      icon: '👤',
      color: 'green',
      onClick: () => window.location.href = '/admin/users'
    },
    {
      title: 'System Analytics',
      description: 'View performance metrics',
      icon: '📈',
      color: 'purple',
      onClick: () => window.location.href = '/admin/analytics'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, Admin! 👑
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your water management system.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              📊 Generate Report
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              ➕ Quick Action
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Critical Reports Alert */}
        {stats.criticalReportsDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🚨</span>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-400">
                Critical Issues Requiring Immediate Attention
              </h2>
            </div>
            <div className="space-y-3">
              {stats.criticalReportsDetails.map((report) => (
                <div key={report._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reported by {report.reportedBy.firstName} {report.reportedBy.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(report.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">
                      {report.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Reports by Type Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Reports by Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.reportsByType.map((type) => (
              <div key={type._id} className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">
                    {type._id === 'LEAK' ? '💧' : 
                     type._id === 'OUTAGE' ? '⚡' : 
                     type._id === 'CONTAMINATION' ? '☣️' : 
                     type._id === 'PRESSURE' ? '📏' : 
                     type._id === 'EMERGENCY' ? '🚨' : '🔧'}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {type.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {type._id.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
