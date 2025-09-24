import React from 'react';
import { motion } from 'framer-motion';

const WavesDivider = ({ className = '', inverted = false, animated = true }) => {
  const pathVariants = {
    initial: {
      x: inverted ? '100%' : '-100%',
    },
    animate: {
      x: '0%',
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        className="w-[200%] text-white dark:text-gray-900 fill-current"
        viewBox="0 0 2880 200"
        preserveAspectRatio="none"
      >
        <motion.path
          variants={animated ? pathVariants : undefined}
          initial="initial"
          animate="animate"
          d="M0,64 C480,96 960,128 1440,128 C1920,128 2400,96 2880,64 L2880,200 L0,200 Z"
        />
      </svg>
    </div>
  );
};

export default WavesDivider;
