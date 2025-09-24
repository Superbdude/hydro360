import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { ArrowRight, Droplets, MapPin, Clock } from 'lucide-react';
import waterDropAnimation from '../assets/animations/water-drop.json';
import Button from '../components/ui/Button';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: <Droplets className="w-12 h-12 text-blue-500" />,
      title: 'Report Issues',
      description: 'Easily report water-related issues in your community'
    },
    {
      icon: <MapPin className="w-12 h-12 text-blue-500" />,
      title: 'Track Progress',
      description: 'Monitor the status of reported issues in real-time'
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: 'Quick Response',
      description: 'Get timely updates on issue resolution'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 relative inline-block"
            >
              <Lottie
                animationData={waterDropAnimation}
                className="w-32 h-32 mx-auto"
                loop={true}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Smart Water Resource
              <span className="text-blue-600 dark:text-blue-400"> Management</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Empowering communities to report and track water-related issues for a sustainable future.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/report">
                <Button size="lg" className="water-ripple">
                  Report an Issue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="outline" size="lg">
                  Track Issues
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full text-white dark:text-gray-900 fill-current"
            viewBox="0 0 1440 200"
          >
            <path
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              How It Works
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="glass-panel rounded-xl p-6 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Make a Difference?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl mb-8 opacity-90"
            >
              Join our community in maintaining sustainable water resources.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
