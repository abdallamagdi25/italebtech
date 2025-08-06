import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ question, answer, isOpen, handleToggle }) => {
  return (
    <div className="faq-item">
      <motion.div
        className="faq-question"
        onClick={handleToggle}
        whileHover={{ backgroundColor: "#f0f0f0" }}
      >
        <span>{question}</span>
        <motion.span
          className="faq-icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;