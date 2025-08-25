import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { FiChevronDown } from 'react-icons/fi'; // فقط هذه الأيقونة
import heroImage from '../assets/images/full-logo.png';

const Hero = () => {
  const navigate = useNavigate(); // 3. تهيئة أداة التوجيه
  const { currentUser } = useAuth(); // 4. الحصول على حالة المستخدم الحالية

  const handleButtonClick = () => {
    if (currentUser) {
      // 5. إذا كان المستخدم مسجلاً، اذهب إلى الدورات
      navigate('/courses');
    } else {
      // 6. إذا لم يكن مسجلاً، اذهب لإنشاء حساب
      navigate('/signup');
    }
  };

  // تعريف متغيرات الأنيميشن لتنظيم الكود
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // التأخير بين ظهور كل عنصر والآخر
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // // تعريف حركة السهم
  // const arrowVariants = {
  //   animate: {
  //     y: [0, 10, 0], // حركة للأعلى والأسفل
  //     transition: {
  //       duration: 1.5,
  //       ease: "easeInOut",
  //       repeat: Infinity,
  //     }
  //   }
  // };

  return (
    <motion.section
      className="hero-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="hero-content">
        <motion.h1 variants={itemVariants}>
          ابنِ أساسًا صلبًا بمشاريع حقيقية، وليس مجرد نظريات.
        </motion.h1>
        <motion.p variants={itemVariants}>
          منصة iTalebTech مصممة لطلاب الجامعات التكنولوجية لمساعدتك على تحويل معرفتك إلى خبرة عملية.
        </motion.p>
        <motion.div variants={itemVariants}>
          <button className="hero-button" onClick={handleButtonClick}>
            ابدأ التعلم الآن
          </button>
        </motion.div>
      </div>
      <motion.div className="hero-image" variants={itemVariants}>
        <img src={heroImage} alt="خلفية تقنية لمشروع iTalebTech" />
      </motion.div>

      {/* سهم التمرير (النسخة المصححة) */}
      {/* <motion.a
        href="#why-us"
        className="scroll-arrow-container"
        variants={arrowVariants}
        animate="animate"
      >
        <FiChevronDown className="scroll-arrow" />
      </motion.a> */}
    </motion.section>
  );
};

export default Hero;