import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: '📊',
      description: 'Overview and statistics'
    },
    { 
      name: 'Reports Management', 
      href: '/admin/reports', 
      icon: '📋',
      description: 'Manage water reports'
    },
    { 
      name: 'Users Management', 
      href: '/admin/users', 
      icon: '👥',
      description: 'Manage system users'
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: '📈',
      description: 'Performance analytics'
    },
    { 
      name: 'Emergency Alerts', 
      href: '/admin/emergency', 
      icon: '🚨',
      description: 'Critical issues'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: '⚙️',
      description: 'System configuration'
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if user has admin role
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have permission to access the admin panel.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
            {/* Header */}
            <div className="flex items-center flex-shrink-0 px-4 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Hydro360
                  </h1>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/50 border-r-2 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } group flex flex-col p-3 text-sm font-medium rounded-md transition-all duration-200`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} text-xs mt-1 ml-8`}>
                      {item.description}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* User info */}
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Logout"
                >
                  🚪
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top bar for mobile */}
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Hydro360 Admin
              </h1>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
