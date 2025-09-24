import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  MapPin, 
  Shield, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Star,
  Globe,
  Heart,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { number: '10,000+', label: 'Reports Processed', icon: '📊' },
    { number: '95%', label: 'Issues Resolved', icon: '✅' },
    { number: '50+', label: 'Communities Served', icon: '🏘️' },
    { number: '24/7', label: 'Monitoring', icon: '⏰' }
  ];

  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'Real-time Water Monitoring',
      description: 'Track water quality, pressure, and flow in real-time across your entire network.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Interactive Mapping',
      description: 'Visualize water infrastructure and incidents on detailed interactive maps.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Emergency Response',
      description: 'Rapid emergency response system for critical water infrastructure issues.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Smart Analytics',
      description: 'AI-powered analytics to predict and prevent water system failures.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(statInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute top-40 right-20 w-24 h-24 bg-cyan-200 dark:bg-cyan-800 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-40 left-1/3 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 blur-xl"
        />
        
        {/* Interactive Mouse Follower */}
        <motion.div
          className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 blur-sm pointer-events-none"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="inline-block p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6"
                >
                  <Droplets className="w-16 h-16 text-white" />
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6"
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
                  Hydro360
                </motion.h1>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8"
                >
                  🌊 Revolutionizing Water Management 🌊
                </motion.div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Join the future of water infrastructure management. Monitor, report, and resolve water issues 
                with cutting-edge technology that keeps communities safe and hydrated.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link to="/login">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-2xl transition-all duration-300"
                  >
                    <motion.div
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform skew-x-12 group-hover:animate-none"
                    />
                    <span className="relative z-10 flex items-center">
                      Get Started Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-lg font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Animated Stats */}
              <motion.div 
                variants={itemVariants}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className={`text-center p-6 rounded-2xl ${
                      currentStat === index 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl' 
                        : 'bg-white dark:bg-gray-800 shadow-lg'
                    } transition-all duration-500`}
                  >
                    <motion.div
                      animate={{ 
                        rotate: currentStat === index ? [0, 360] : 0,
                        scale: currentStat === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 1 }}
                      className="text-4xl mb-2"
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className="text-3xl font-bold mb-2"
                      animate={{ 
                        scale: currentStat === index ? [1, 1.1, 1] : 1
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  style={{
                    background: "linear-gradient(-45deg, #3B82F6, #06B6D4, #8B5CF6)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Powerful Features
                </motion.span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to manage water infrastructure efficiently and effectively
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 10
                  }}
                  className="group relative"
                >
                  <div className="h-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"
              />
              
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
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
                  Ready to Transform Water Management?
                </motion.h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                  Join thousands of communities already using Hydro360 to create safer, 
                  more efficient water systems. Start your journey today!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-2xl transition-all duration-300"
                    >
                      <motion.div
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform skew-x-12 group-hover:animate-none"
                      />
                      <span className="relative z-10">Start Free Trial</span>
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-xl font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                  >
                    Contact Sales
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
