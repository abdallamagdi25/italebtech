import React, { useState } from 'react';
import './Faq.css';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../utils/animations';
import AccordionItem from './AccordionItem'; // استيراد المكون الجديد

const faqData = [
  {
    question: 'هل أحتاج إلى أي خبرة سابقة في البرمجة أو الإلكترونيات؟',
    answer: 'لا على الإطلاق! دوراتنا الأساسية مصممة خصيصًا للطلاب الذين يبدأون من الصفر. كل ما تحتاجه هو الشغف والرغبة في التعلم.'
  },
  {
    question: 'ماذا سأستفيد من هذه الدورات عمليًا؟',
    answer: 'ستخرج من كل دورة بمشروع عملي حقيقي يمكنك إضافته إلى معرض أعمالك (Portfolio). هذه المشاريع هي الدليل على مهارتك، وهي ما يبحث عنه سوق العمل.'
  },
  {
    question: 'هل المحتوى مسجل أم مباشر؟',
    answer: 'مزيج من الاثنين! المحتوى الأساسي مسجل لتتمكن من مشاهدته في أي وقت يناسبك. بالإضافة إلى ذلك، نقدم جلسات مباشرة أسبوعية للإجابة على أسئلتك والتفاعل مع المدربين والطلاب الآخرين.'
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null); // حالة لتتبع السؤال النشط
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="faq-container"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 variants={itemVariants}>أسئلة شائعة</motion.h2>
      <motion.div className="faq-grid" variants={itemVariants}>
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={activeIndex === index}
            handleToggle={() => handleToggle(index)}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Faq;