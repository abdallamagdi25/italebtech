import React from 'react';
import './Preloader.css';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png'; // استيراد اللوجو

const Preloader = () => {
  return (
    <div className="preloader-container">
      <motion.img 
        src={logo} 
        alt="iTalebTech Loading..."
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default Preloader;