import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, onChange, variant = 'default' }) => {
  const variants = {
    default: {
      tabList: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'px-4 py-2 text-sm font-medium',
      activeTab: 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400',
      inactiveTab: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    },
    pills: {
      tabList: 'space-x-2',
      tab: 'px-4 py-2 text-sm font-medium rounded-full',
      activeTab: 'bg-blue-600 text-white dark:bg-blue-500',
      inactiveTab: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    },
    underline: {
      tabList: 'border-b border-gray-200 dark:border-gray-700 space-x-8',
      tab: 'px-1 py-4 text-sm font-medium whitespace-nowrap',
      activeTab: 'text-blue-600 dark:text-blue-400 relative before:absolute before:bottom-[-1px] before:left-0 before:w-full before:h-0.5 before:bg-blue-600 dark:before:bg-blue-400',
      inactiveTab: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div>
      <div className={`flex ${currentVariant.tabList}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`${currentVariant.tab} ${
              activeTab === tab.id
                ? currentVariant.activeTab
                : currentVariant.inactiveTab
            } relative transition-all duration-200`}
          >
            <span className="flex items-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </span>
            {variant === 'pills' && activeTab === tab.id && (
              <motion.div
                layoutId="pill-active"
                className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full -z-10"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
