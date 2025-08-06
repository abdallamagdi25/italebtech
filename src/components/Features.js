import React from 'react';
import './Features.css';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../utils/animations';

const Features = () => {
  return (
    <motion.section 
      className="features-container"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="feature-card" variants={itemVariants}>
        <h2>لماذا يشعر الطلاب بالضياع؟</h2>
        <p>المحاضرات النظرية وحدها لا تكفي لبناء مهندس حقيقي. أنت تحتاج إلى تطبيق ما تتعلمه لكي تفهمه بعمق.</p>
      </motion.div>
      <motion.div className="feature-card" variants={itemVariants}>
        <h2>الحل في iTalebTech</h2>
        <p>نحن نحول النظريات إلى مشاريع عملية. معنا، ستتعلم عن طريق البناء، وتتخرج وبحوزتك خبرة حقيقية.</p>
      </motion.div>
    </motion.section>
  );
};

export default Features;