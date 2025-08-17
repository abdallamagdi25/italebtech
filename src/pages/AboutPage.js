import React from 'react';
import './AboutPage.css';
import Team from '../components/Team'; // سنقوم باستيراد مكون الفريق الجاهز
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div 
      className="about-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-header">
        <h1>قصتنا</h1>
        <p>منصة iTalebTech لم تولد في غرفة اجتماعات، بل ولدت من قلب احتياج حقيقي عشناه كطلاب.</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>رؤيتنا</h2>
          <p>أن نكون المنصة الأولى في مصر التي تبني الأساس القوي للجيل القادم من التكنولوجيين، وتصنع منهم مبدعين مطلوبين في سوق العمل.</p>
        </div>
        <div className="about-section">
          <h2>رسالتنا</h2>
          <p>مهمتنا هي تحقيق هذه الرؤية عن طريق بناء مسارات تعليمية قائمة على المشاريع، وتوفير إرشاد ودعم مستمر، وبناء مجتمع قوي يتبادل فيه الطلاب الخبرات وينطلقون منه نحو مستقبلهم.</p>
        </div>
      </div>
      {/* هنا نقوم بعرض مكون الفريق */}
      <Team />
    </motion.div>
  );
};

export default AboutPage;