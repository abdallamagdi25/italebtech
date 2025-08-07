import React from 'react';
import { useAuth } from '../context/AuthContext';
import './LoadingOverlay.css';
import { FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = () => {
  const { isProcessing } = useAuth();

  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div 
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FiLoader className="loading-spinner" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;