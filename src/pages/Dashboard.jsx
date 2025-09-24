import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    recentReports: []
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchUserStats();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchUserStats = async () => {
    try {
      // Mock data for now - replace with actual API call
      setTimeout(() => {
        setUserStats({
          totalReports: 12,
          pendingReports: 3,
          resolvedReports: 9,
          recentReports: [
            {
              id: 1,
              title: "Water Leak on Main Street",
              status: "PENDING",
              type: "LEAK",
              createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: 2,
              title: "Low Water Pressure",
              status: "IN_PROGRESS",
              type: "PRESSURE",
              createdAt: new Date(Date.now() - 172800000).toISOString()
            }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const StatCard = ({ title, value, icon, color, description, trend }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}>
            {value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
        <div className={`text-4xl text-${color}-500 opacity-80`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {trend > 0 ? '↗' : '→'} {Math.abs(trend)}%
          </span>
        </div>
      )}
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon, color, link, onClick }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={link} onClick={onClick} className="block">
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
      </Link>
    </motion.div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'RESOLVED': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'LEAK': return '💧';
      case 'OUTAGE': return '⚡';
      case 'PRESSURE': return '📏';
      case 'CONTAMINATION': return '☣️';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Navbar />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {getGreeting()}, {user?.firstName}! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Welcome back to your water management dashboard
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 md:mt-0"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🌊</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Reports"
            value={userStats.totalReports}
            icon="📊"
            color="blue"
            description="Reports submitted"
            trend={12}
          />
          <StatCard
            title="Pending Reports"
            value={userStats.pendingReports}
            icon="⏳"
            color="yellow"
            description="Awaiting review"
            trend={0}
          />
          <StatCard
            title="Resolved Reports"
            value={userStats.resolvedReports}
            icon="✅"
            color="green"
            description="Successfully completed"
            trend={25}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              title="Report Issue"
              description="Report a new water problem"
              icon="📝"
              color="blue"
              link="/report"
            />
            <QuickActionCard
              title="Track Reports"
              description="Check status of your reports"
              icon="🔍"
              color="green"
              link="/track"
            />
            <QuickActionCard
              title="Emergency"
              description="Report urgent water emergency"
              icon="🚨"
              color="red"
              link="/report?type=emergency"
            />
            <QuickActionCard
              title="View Map"
              description="See water issues in your area"
              icon="🗺️"
              color="purple"
              link="/map"
            />
          </div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Reports
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {userStats.recentReports.length > 0 ? (
                userStats.recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-4">
                          {getTypeIcon(report.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No reports yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start by reporting your first water issue
                  </p>
                  <Link
                    to="/report"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create First Report
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div variants={itemVariants} className="mt-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">💡 Water Conservation Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💧</span>
                <div>
                  <h3 className="font-semibold mb-1">Fix Leaks Quickly</h3>
                  <p className="text-blue-100 text-sm">A single dripping faucet can waste over 3,000 gallons per year.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🚿</span>
                <div>
                  <h3 className="font-semibold mb-1">Take Shorter Showers</h3>
                  <p className="text-blue-100 text-sm">Reducing shower time by 2 minutes can save 1,750 gallons per year.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
