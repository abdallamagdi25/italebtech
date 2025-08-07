import React from 'react';
import './WhyUs.css';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../utils/animations';
import { FaProjectDiagram, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const WhyUs = () => {

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
      id="why-us"
      className="whyus-container"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 variants={itemVariants}>لماذا iTalebTech هي وجهتك الأولى؟</motion.h2>
      <div className="whyus-grid">
        <motion.div className="whyus-card" variants={itemVariants}>
          <FaProjectDiagram className="whyus-icon" />
          <h3>تعلم ببناء المشاريع</h3>
          <p>نحن نؤمن بأن أفضل طريقة للتعلم هي التطبيق. ستبني مشاريع حقيقية تضاف مباشرة إلى معرض أعمالك.</p>
        </motion.div>
        <motion.div className="whyus-card" variants={itemVariants}>
          <FaChalkboardTeacher className="whyus-icon" />
          <h3>إرشاد ودعم مستمر</h3>
          <p>من خلال الجلسات المباشرة ومجتمعنا، لن تشعر أبدًا بأنك تائه. نحن هنا لمساعدتك في كل خطوة.</p>
        </motion.div>
        <motion.div className="whyus-card" variants={itemVariants}>
          <FaUsers className="whyus-icon" />
          <h3>مجتمع من المبدعين</h3>
          <p>انضم إلى شبكة من الطلاب والمطورين الطموحين مثلك تمامًا لتبادل الخبرات والتعاون في المشاريع.</p>
        </motion.div>
      </div>
      <motion.a
        href="#team"
        className="scroll-arrow-container"
        variants={arrowVariants}
        animate="animate"
      >
        <FiChevronDown className="scroll-arrow" />
      </motion.a>
    </motion.section>
  );
};

export default WhyUs;