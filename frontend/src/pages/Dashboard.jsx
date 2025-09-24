import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, CheckCircle, Clock, BarChart2, Droplets, Zap, Sparkles, TrendingUp, Award } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Map from '../components/maps/Map';
import { useAuth } from '../context/AuthContext';
import { getReportsByUser } from '../services/reportService';
import { ISSUE_TYPES, ISSUE_STATUS } from '../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCelebration, setShowCelebration] = useState(false);
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    pendingReports: 0,
    recentReports: []
  });

  useEffect(() => {
    fetchDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getReportsByUser();

      const totalReports = response.total;
      const resolvedReports = response.data.filter(
        report => report.status === ISSUE_STATUS.RESOLVED
      ).length;
      const pendingReports = response.data.filter(
        report => report.status === ISSUE_STATUS.PENDING
      ).length;

      setStats({
        totalReports,
        resolvedReports,
        pendingReports,
        recentReports: response.data
      });

      // Show celebration if user has good stats
      if (resolvedReports > 0 && resolvedReports >= pendingReports) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "You're making waves in water conservation! 🌊",
      "Every report helps keep our water safe! 💧",
      "Your community impact is growing! 🌱",
      "Together, we're protecting our water future! 🚀"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-blue-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
          >
            <Droplets className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h3 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xl font-semibold text-gray-800 dark:text-white mb-2"
          >
            Loading your water world...
          </motion.h3>
          <div className="flex space-x-1 justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  backgroundColor: ["#3B82F6", "#06B6D4", "#3B82F6"]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Super Dynamic Animated Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #feca57 100%)',
            'radial-gradient(circle at 50% 20%, #4ecdc4 0%, #45b7d1 25%, #96ceb4 50%, #feca57 75%, #ff6b6b 100%)',
            'radial-gradient(circle at 80% 50%, #45b7d1 0%, #96ceb4 25%, #feca57 50%, #ff6b6b 75%, #4ecdc4 100%)',
            'radial-gradient(circle at 50% 80%, #96ceb4 0%, #feca57 25%, #ff6b6b 50%, #4ecdc4 75%, #45b7d1 100%)',
            'radial-gradient(circle at 20% 20%, #feca57 0%, #ff6b6b 25%, #4ecdc4 50%, #45b7d1 75%, #96ceb4 100%)',
            'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
            'linear-gradient(90deg, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)',
            'linear-gradient(135deg, #45b7d1, #96ceb4, #feca57, #ff6b6b, #4ecdc4)',
            'conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)',
            'conic-gradient(from 90deg, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b, #4ecdc4)',
            'conic-gradient(from 180deg, #45b7d1, #96ceb4, #feca57, #ff6b6b, #4ecdc4, #45b7d1)',
            'conic-gradient(from 270deg, #96ceb4, #feca57, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Multiple Animated Wave Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-full h-32 opacity-${30 - i * 5}`}
            style={{
              top: `${i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.${3 - i}), transparent)`
            }}
            animate={{
              x: ['-100%', '100%'],
              skewX: [0, 15, -15, 0],
              scaleY: [1, 1.5, 1]
            }}
            transition={{
              x: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
              skewX: { duration: 3 + i, repeat: Infinity },
              scaleY: { duration: 2 + i, repeat: Infinity }
            }}
          />
        ))}
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl"
            >
              🏆
            </motion.div>
            <div className="absolute">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: i * 30 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    y: [-50, -100, -50],
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 100, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                  className="absolute text-2xl"
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {/* Enhanced Welcome Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="inline-block p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4"
            >
              <Droplets className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {getGreeting()}, {user.firstName}! 🌊
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-2"
            >
              {getMotivationalMessage()}
            </motion.p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </motion.div>
          </motion.div>

        {/* Ultra Dynamic Stats Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              y: -15,
              rotateY: 10,
              rotateX: 5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group"
            animate={{
              boxShadow: [
                '0 10px 40px rgba(255, 107, 107, 0.3)',
                '0 15px 50px rgba(78, 205, 196, 0.4)',
                '0 20px 60px rgba(69, 183, 209, 0.5)',
                '0 15px 50px rgba(150, 206, 180, 0.4)',
                '0 10px 40px rgba(254, 202, 87, 0.3)'
              ]
            }}
            transition={{ 
              boxShadow: { duration: 3, repeat: Infinity },
              hover: { type: "spring", stiffness: 300 }
            }}
          >
            <Card>
              <motion.div 
                className="p-6 relative overflow-hidden"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))',
                    'linear-gradient(90deg, rgba(78, 205, 196, 0.1), rgba(69, 183, 209, 0.1))',
                    'linear-gradient(135deg, rgba(69, 183, 209, 0.1), rgba(150, 206, 180, 0.1))',
                    'linear-gradient(180deg, rgba(150, 206, 180, 0.1), rgba(254, 202, 87, 0.1))',
                    'linear-gradient(225deg, rgba(254, 202, 87, 0.1), rgba(255, 107, 107, 0.1))'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Swirling Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      'conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
                      'conic-gradient(from 72deg, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)',
                      'conic-gradient(from 144deg, #45b7d1, #96ceb4, #feca57, #ff6b6b, #4ecdc4)',
                      'conic-gradient(from 216deg, #96ceb4, #feca57, #ff6b6b, #4ecdc4, #45b7d1)',
                      'conic-gradient(from 288deg, #feca57, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)'
                    ],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    background: { duration: 2, repeat: Infinity },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <motion.h3 
                    className="text-lg font-bold"
                    animate={{
                      backgroundImage: [
                        'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        'linear-gradient(90deg, #4ecdc4, #45b7d1)',
                        'linear-gradient(135deg, #45b7d1, #96ceb4)',
                        'linear-gradient(180deg, #96ceb4, #feca57)',
                        'linear-gradient(225deg, #feca57, #ff6b6b)'
                      ]
                    }}
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Total Reports
                  </motion.h3>
                  <motion.div
                    className="p-3 rounded-full relative overflow-hidden"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        'linear-gradient(90deg, #4ecdc4, #45b7d1)',
                        'linear-gradient(135deg, #45b7d1, #96ceb4)',
                        'linear-gradient(180deg, #96ceb4, #feca57)',
                        'linear-gradient(225deg, #feca57, #ff6b6b)'
                      ],
                      scale: [1, 1.3, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      background: { duration: 2, repeat: Infinity },
                      scale: { duration: 1.5, repeat: Infinity },
                      rotate: { duration: 4, repeat: Infinity }
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -360]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <BarChart2 className="w-6 h-6 text-white relative z-10" />
                    </motion.div>
                    
                    {/* Spinning Rim */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    backgroundImage: [
                      'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      'linear-gradient(90deg, #4ecdc4, #45b7d1)',
                      'linear-gradient(135deg, #45b7d1, #96ceb4)',
                      'linear-gradient(180deg, #96ceb4, #feca57)',
                      'linear-gradient(225deg, #feca57, #ff6b6b)'
                    ]
                  }}
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 200, delay: 0.2 },
                    backgroundImage: { duration: 3, repeat: Infinity }
                  }}
                  className="text-5xl font-bold mb-2"
                >
                  {stats.totalReports}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-sm"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    animate={{
                      color: ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#10b981']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Making Impact! 🌊
                  </motion.span>
                </motion.div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full opacity-40"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        scale: [0, 1, 0],
                        backgroundColor: [
                          '#ff6b6b',
                          '#4ecdc4',
                          '#45b7d1',
                          '#96ceb4',
                          '#feca57'
                        ]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Resolved Issues Card - Ultra Dynamic */}
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              y: -15,
              rotateY: -10,
              rotateX: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group"
            animate={{
              boxShadow: [
                '0 10px 40px rgba(34, 197, 94, 0.3)',
                '0 15px 50px rgba(16, 185, 129, 0.4)',
                '0 20px 60px rgba(5, 150, 105, 0.5)',
                '0 15px 50px rgba(4, 120, 87, 0.4)',
                '0 10px 40px rgba(6, 95, 70, 0.3)'
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2.5, repeat: Infinity },
              hover: { type: "spring", stiffness: 300 }
            }}
          >
            <Card>
              <motion.div 
                className="p-6 relative overflow-hidden"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))',
                    'radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
                    'radial-gradient(circle at 50% 20%, rgba(5, 150, 105, 0.15), rgba(4, 120, 87, 0.1))',
                    'radial-gradient(circle at 20% 80%, rgba(4, 120, 87, 0.15), rgba(34, 197, 94, 0.1))'
                  ]
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                {/* Pulsing Success Rings */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{
                    background: [
                      'repeating-conic-gradient(from 0deg, #22c55e 0deg 45deg, #10b981 45deg 90deg, #059669 90deg 135deg, #047857 135deg 180deg)',
                      'repeating-conic-gradient(from 90deg, #22c55e 0deg 45deg, #10b981 45deg 90deg, #059669 90deg 135deg, #047857 135deg 180deg)',
                      'repeating-conic-gradient(from 180deg, #22c55e 0deg 45deg, #10b981 45deg 90deg, #059669 90deg 135deg, #047857 135deg 180deg)',
                      'repeating-conic-gradient(from 270deg, #22c55e 0deg 45deg, #10b981 45deg 90deg, #059669 90deg 135deg, #047857 135deg 180deg)'
                    ],
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    background: { duration: 1.5, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <motion.h3 
                    className="text-lg font-bold"
                    animate={{
                      backgroundImage: [
                        'linear-gradient(45deg, #22c55e, #10b981)',
                        'linear-gradient(90deg, #10b981, #059669)',
                        'linear-gradient(135deg, #059669, #047857)',
                        'linear-gradient(180deg, #047857, #065f46)',
                        'linear-gradient(225deg, #065f46, #22c55e)'
                      ],
                      scale: [1, 1.05, 1]
                    }}
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    transition={{ 
                      backgroundImage: { duration: 2, repeat: Infinity },
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  >
                    Resolved Issues
                  </motion.h3>
                  <motion.div
                    className="p-3 rounded-full relative overflow-hidden"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #22c55e, #10b981)',
                        'linear-gradient(90deg, #10b981, #059669)',
                        'linear-gradient(135deg, #059669, #047857)',
                        'linear-gradient(180deg, #047857, #22c55e)'
                      ],
                      scale: [1, 1.4, 1],
                      rotate: [0, 360, 720, 1080]
                    }}
                    transition={{ 
                      background: { duration: 2, repeat: Infinity },
                      scale: { duration: 1.5, repeat: Infinity },
                      rotate: { duration: 6, repeat: Infinity }
                    }}
                  >
                    <CheckCircle className="w-6 h-6 text-white relative z-10" />
                    
                    {/* Success Burst Effect */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-4 bg-white/50 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${i * 45}deg) translateX(15px)`
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
                
                <motion.p 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    backgroundImage: [
                      'linear-gradient(45deg, #22c55e, #10b981)',
                      'linear-gradient(90deg, #10b981, #059669)',
                      'linear-gradient(135deg, #059669, #047857)',
                      'linear-gradient(180deg, #047857, #22c55e)'
                    ]
                  }}
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  transition={{ 
                    scale: { duration: 1.5, repeat: Infinity },
                    backgroundImage: { duration: 2.5, repeat: Infinity }
                  }}
                  className="text-5xl font-bold mb-2"
                >
                  {stats.resolvedReports}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center text-sm"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Award className="w-4 h-4 text-yellow-500 mr-1" />
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    animate={{
                      color: ['#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#eab308']
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Great Progress! 🏆
                  </motion.span>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Pending Issues Card - Ultra Dynamic */}
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              y: -15,
              rotateY: 10,
              rotateX: 5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group"
            animate={{
              boxShadow: [
                '0 10px 40px rgba(234, 179, 8, 0.3)',
                '0 15px 50px rgba(245, 158, 11, 0.4)',
                '0 20px 60px rgba(217, 119, 6, 0.5)',
                '0 15px 50px rgba(180, 83, 9, 0.4)',
                '0 10px 40px rgba(146, 64, 14, 0.3)'
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              hover: { type: "spring", stiffness: 300 }
            }}
          >
            <Card>
              <motion.div 
                className="p-6 relative overflow-hidden"
                animate={{
                  background: [
                    'linear-gradient(60deg, rgba(234, 179, 8, 0.1), rgba(245, 158, 11, 0.05))',
                    'linear-gradient(120deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05))',
                    'linear-gradient(180deg, rgba(217, 119, 6, 0.1), rgba(180, 83, 9, 0.05))',
                    'linear-gradient(240deg, rgba(180, 83, 9, 0.1), rgba(234, 179, 8, 0.05))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Lightning Bolt Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{
                    background: [
                      'repeating-linear-gradient(45deg, #eab308 0px 10px, #f59e0b 10px 20px, #d97706 20px 30px, #b45309 30px 40px)',
                      'repeating-linear-gradient(90deg, #eab308 0px 10px, #f59e0b 10px 20px, #d97706 20px 30px, #b45309 30px 40px)',
                      'repeating-linear-gradient(135deg, #eab308 0px 10px, #f59e0b 10px 20px, #d97706 20px 30px, #b45309 30px 40px)',
                      'repeating-linear-gradient(180deg, #eab308 0px 10px, #f59e0b 10px 20px, #d97706 20px 30px, #b45309 30px 40px)'
                    ],
                    x: [0, 40, -40, 0],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ 
                    background: { duration: 1, repeat: Infinity },
                    x: { duration: 4, repeat: Infinity },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <motion.h3 
                    className="text-lg font-bold"
                    animate={{
                      backgroundImage: [
                        'linear-gradient(45deg, #eab308, #f59e0b)',
                        'linear-gradient(90deg, #f59e0b, #d97706)',
                        'linear-gradient(135deg, #d97706, #b45309)',
                        'linear-gradient(180deg, #b45309, #92400e)',
                        'linear-gradient(225deg, #92400e, #eab308)'
                      ],
                      textShadow: [
                        '0 0 5px rgba(234, 179, 8, 0.5)',
                        '0 0 10px rgba(245, 158, 11, 0.5)',
                        '0 0 5px rgba(217, 119, 6, 0.5)'
                      ]
                    }}
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    transition={{ 
                      backgroundImage: { duration: 2, repeat: Infinity },
                      textShadow: { duration: 1.5, repeat: Infinity }
                    }}
                  >
                    Pending Issues
                  </motion.h3>
                  <motion.div
                    className="p-3 rounded-full relative overflow-hidden"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #eab308, #f59e0b)',
                        'linear-gradient(90deg, #f59e0b, #d97706)',
                        'linear-gradient(135deg, #d97706, #b45309)',
                        'linear-gradient(180deg, #b45309, #eab308)'
                      ],
                      scale: [1, 1.2, 1.4, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      background: { duration: 1.5, repeat: Infinity },
                      scale: { duration: 2, repeat: Infinity },
                      opacity: { duration: 1.5, repeat: Infinity }
                    }}
                  >
                    <Clock className="w-6 h-6 text-white relative z-10" />
                    
                    {/* Pulsing Clock Hands */}
                    <motion.div
                      className="absolute inset-0 border border-white/50 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.3, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-1 border border-white/30 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.1, 0.5]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                  </motion.div>
                </div>
                
                <motion.p 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    backgroundImage: [
                      'linear-gradient(45deg, #eab308, #f59e0b)',
                      'linear-gradient(90deg, #f59e0b, #d97706)',
                      'linear-gradient(135deg, #d97706, #b45309)',
                      'linear-gradient(180deg, #b45309, #eab308)'
                    ]
                  }}
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  transition={{ 
                    scale: { duration: 1, repeat: Infinity },
                    backgroundImage: { duration: 2, repeat: Infinity }
                  }}
                  className="text-5xl font-bold mb-2"
                >
                  {stats.pendingReports}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center text-sm"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-yellow-500 mr-1" />
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    animate={{
                      color: ['#eab308', '#f59e0b', '#d97706', '#b45309', '#eab308']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stats.pendingReports === 0 ? "All Clear! ✨" : "In Progress ⚡"}
                  </motion.span>
                </motion.div>

                {/* Lightning Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-8 bg-yellow-400 opacity-60"
                      style={{
                        left: `${25 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                        transform: `rotate(${15 + i * 30}deg)`,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Reports and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Reports
                </h2>
                <div className="space-y-4">
                  {stats.recentReports.map((report) => (
                    <Link
                      key={report.id}
                      to={`/track/${report.id}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-800 -mx-6 px-6 py-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {report.title}
                          </h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center">
                                <Droplets className="w-4 h-4 mr-1" />
                                {ISSUE_TYPES[report.type]}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {report.location.lat.toFixed(2)}, {report.location.lng.toFixed(2)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatDate(report.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge color={report.status === 'resolved' ? 'green' : 'yellow'}>
                          {report.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/track"
                  className="block text-center text-blue-600 hover:text-blue-500 mt-4"
                >
                  View All Reports
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Map View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Issue Locations
                </h2>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <Map
                    markers={stats.recentReports.map(report => ({
                      lat: report.location.lat,
                      lng: report.location.lng
                    }))}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <Card>
            <div className="p-6">
              <motion.h2 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                style={{
                  background: "linear-gradient(-45deg, #3B82F6, #06B6D4, #8B5CF6, #EF4444)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🚀 Ready for Action?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/report">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-6 h-6" />
                    </motion.div>
                    <span className="text-lg">Report New Issue</span>
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      initial={false}
                      whileHover={{ opacity: 0.2 }}
                    />
                    <motion.div
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform skew-x-12 group-hover:animate-none"
                    />
                  </motion.button>
                </Link>
                <Link to="/track">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <MapPin className="w-6 h-6" />
                    </motion.div>
                    <span className="text-lg">View All Issues</span>
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      initial={false}
                      whileHover={{ opacity: 0.2 }}
                    />
                    <motion.div
                      animate={{ x: [100, -100] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform skew-x-12 group-hover:animate-none"
                    />
                  </motion.button>
                </Link>
              </div>
              
              {/* Fun Achievement Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700"
              >
                <div className="flex items-center justify-center space-x-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    🏆
                  </motion.div>
                  <div className="text-center">
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-300">
                      Community Hero Level: {Math.min(Math.floor(stats.totalReports / 2) + 1, 10)}
                    </h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      {stats.totalReports === 0 
                        ? "Report your first issue to start your journey!" 
                        : `${Math.max(0, (Math.floor(stats.totalReports / 2) + 1) * 2 - stats.totalReports)} more reports to level up!`
                      }
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl"
                  >
                    💧
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;