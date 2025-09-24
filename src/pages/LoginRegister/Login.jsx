import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Droplets, User, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginAs: 'user' // 'user' or 'admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });

      // Check if user role matches selected login type
      if (formData.loginAs === 'admin' && !['admin', 'superadmin'].includes(response.user.role)) {
        setError('You do not have admin privileges. Please login as a user.');
        setLoading(false);
        return;
      }

      if (formData.loginAs === 'user' && ['admin', 'superadmin'].includes(response.user.role)) {
        setError('Admin users should login through the admin portal.');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (response.user.role === 'admin' || response.user.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const roleCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Hydro360
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
            Login as:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              variants={roleCardVariants}
              whileHover="hover"
              onClick={() => setFormData({ ...formData, loginAs: 'user' })}
              className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                formData.loginAs === 'user'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">👤</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">User</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Report and track issues
                </p>
              </div>
              {formData.loginAs === 'user' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={roleCardVariants}
              whileHover="hover"
              onClick={() => setFormData({ ...formData, loginAs: 'admin' })}
              className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                formData.loginAs === 'admin'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">👑</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Admin</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Manage system & users
                </p>
              </div>
              {formData.loginAs === 'admin' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.form 
          variants={itemVariants}
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-300 ${
                formData.loginAs === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                `Sign in as ${formData.loginAs === 'admin' ? 'Admin' : 'User'}`
              )}
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.form>

        {/* Demo Accounts */}
        <motion.div variants={itemVariants} className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo Accounts:</h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>User:</strong> user@demo.com / password123</p>
            <p><strong>Admin:</strong> admin@demo.com / admin123</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
