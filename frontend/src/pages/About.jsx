import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Shield, Globe, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const About = () => {
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

  const values = [
    {
      icon: Shield,
      title: 'Reliability',
      description: 'We ensure accurate and timely water management services.'
    },
    {
      icon: Users,
      title: 'Community-Focused',
      description: 'Working together with communities for better water resources.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Promoting sustainable water usage and conservation.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing excellent water management solutions.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Mission Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About Hydro360
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          >
            We are dedicated to revolutionizing water resource management through community engagement and technological innovation.
          </motion.p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg"
              >
                <value.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Join Our Mission
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Be part of the solution in making water resources more accessible and sustainable for everyone.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center gap-4"
        >
          <Link to="/register">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;