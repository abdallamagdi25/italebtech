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
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 variants={itemVariants}>الفريق خلف iTalebTech</motion.h2>
      <div className="team-grid">
        <motion.div className="team-member" variants={itemVariants}>
          <img src={abdalla} alt="صورة المؤسس الأول" />
          <h3>عبد الله مجدي</h3>
          <h4>مؤسس وقائد المنتج</h4>
          <p className="team-member-bio">
            طالب ميكاترونكس بجامعة بني سويف التكنولوجية. شغوف ببناء الأشياء من الصفر وتحويل الأفكار إلى واقع ملموس. أسس iTalebTech إيمانًا منه بأن التطبيق العملي هو الجسر الوحيد بين الدراسة الأكاديمية وسوق العمل الحقيقي.
          </p>
          <div className="team-member-social">
            <a href="linkedin.com">LinkedIn</a>
            <a href="github.com">GitHub</a>
          </div>
        </motion.div>
        <motion.div className="team-member" variants={itemVariants}>
          <img src={ali} alt="صورة المؤسس الثانى" />
          <h3>على حسام</h3>
          <h4>شريك مؤسس ومدير النمو</h4>
          <p className="team-member-bio">
            خبير في استراتيجيات التسويق الرقمي وبناء المجتمعات. مهمته هي إيصال صوت iTalebTech لكل طالب طموح، وبناء شبكة قوية من المبدعين والمطورين في مصر.
          </p>
          <div className="team-member-social">
            <a href="linkedin.com">LinkedIn</a>
            <a href="github.com">GitHub</a>
          </div>
        </motion.div>
        <motion.div className="team-member" variants={itemVariants}>
          <img src={yousef} alt="صورة المؤسس الثالث" />
          <h3>يوسف عماد</h3>
          <h4>شريك مؤسس وقائد المحتوى</h4>
          <p className="team-member-bio">
            مطور متخصص في الانظمة المدمجة . يؤمن بأن تبسيط المفاهيم المعقدة هو مفتاح الإبداع. يعمل على توسيع مكتبة دورات iTalebTech لتشمل كل ما يحتاجه المطور الحديث.
          </p>
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