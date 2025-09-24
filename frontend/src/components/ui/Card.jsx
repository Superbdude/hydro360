import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  animate = true,
  ...props 
}) => {
  const baseStyles = 'rounded-lg backdrop-blur-sm shadow-lg';
  
  const variants = {
    default: 'bg-white/80 dark:bg-gray-800/80',
    glass: 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-md',
    solid: 'bg-white dark:bg-gray-800',
  };

  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export default Card;
