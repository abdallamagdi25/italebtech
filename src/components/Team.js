import React from 'react';
import './Team.css';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../utils/animations';
import abdalla from '../assets/images/abdalla.jpg';
import ali from '../assets/images/ali.jpg';
import yousef from '../assets/images/yousef.jpg';
import { FiChevronDown } from 'react-icons/fi';

const Team = () => {

  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <motion.section
      id="team"
      className="team-container"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 variants={itemVariants}>الفريق خلف iTalebTech</motion.h2>
      <div className="team-grid">
        <motion.div className="team-member" variants={itemVariants}>
          <img src={abdalla} alt="صورة المؤسس الأول" />
          <h3>Abdalla Magdy</h3>
          <h4>Co-Founder & CTO</h4>
          <div className="team-member-social">
            <a href="linkedin.com">LinkedIn</a>
            <a href="github.com">GitHub</a>
          </div>
        </motion.div>
        <motion.div className="team-member" variants={itemVariants}>
          <img src={ali} alt="صورة المؤسس الثانى" />
          <h3>Aly Hossam</h3>
          <h4>Co-Founder & CEO</h4>
          <div className="team-member-social">
            <a href="linkedin.com">LinkedIn</a>
            <a href="github.com">GitHub</a>
          </div>
        </motion.div>
        <motion.div className="team-member" variants={itemVariants}>
          <img src={yousef} alt="صورة المؤسس الثالث" />
          <h3>Yousef Emad</h3>
          <h4>Co-Founder & CMO</h4>
          <div className="team-member-social">
            <a href="linkedin.com">LinkedIn</a>
            <a href="github.com">GitHub</a>
          </div>
        </motion.div>
      </div>
      <motion.a
        href="#faq"
        className="scroll-arrow-container"
        variants={arrowVariants}
        animate="animate"
      >
        <FiChevronDown className="scroll-arrow" />
      </motion.a>
    </motion.section>
  );
};

export default Team;