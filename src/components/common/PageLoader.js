import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';
import './PageLoader.css';

const PageLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={logo}
            alt="Loading..."
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;