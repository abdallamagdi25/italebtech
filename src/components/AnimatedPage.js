import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPage = ({ children }) => {
  const pageReveal = {
    initial: {
      y: "100%", // ابدأ من الأسفل
    },
    animate: {
      y: "0%", // اصعد لتغطية الشاشة
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      y: "-100%", // اخرج من الأعلى
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  return (
    // هذا هو محتوى الصفحة نفسه، سنجعله يظهر بتلاشي بسيط
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }} // تأخير بسيط ليظهر بعد الستارة
      >
        {children}
      </motion.div>

      {/* هذه هي الستارة التي تقوم بالكشف عن المحتوى */}
      <motion.div
        className="page-reveal-cover"
        variants={pageReveal}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </div>
  );
};

export default AnimatedPage;