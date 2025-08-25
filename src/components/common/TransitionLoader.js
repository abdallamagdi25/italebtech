import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';
import './TransitionLoader.css';

const TransitionLoader = () => {
  return (
    <motion.div
      className="transition-loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
    >
      <motion.img
        src={logo}
        alt="Loading..."
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: [0.9, 1.0, 0.9], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default TransitionLoader;