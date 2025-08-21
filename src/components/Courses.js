import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './Courses.css';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import PageLoader from './common/PageLoader';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, "courses"));
        const coursesList = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCourses(coursesList);
      }
      catch (error) {
        console.error("error fetching courses: ", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return <h2>جاري تحميل الدورات...</h2>
  }

  return (
    <>
      <PageLoader isLoading={loading} />
      {!loading && (
        <motion.div
          id="courses"
          className="courses-page"
          variants={sectionVariants}
          initial="hidden"
          animate="visible" // animate بدلاً من whileInView لأننا نريدها أن تعمل عند تحميل الصفحة
        >
          <motion.h1 variants={itemVariants}>الدورات المتاحة</motion.h1>
          {loading ? (
            <p>جاري تحميل الدورات...</p>
          ) : (
            <motion.div className="courses-grid" variants={sectionVariants}>
              {courses.map(course => (
                <Link to={`/courses/${course.id}`} key={course.id} className="course-card-link">
                  <motion.div key={course.id} className="course-card" variants={itemVariants}>
                    <div className="course-card-content">
                      <h2>{course.title}</h2>
                      <p>{course.description}</p>
                      <span className="course-level-badge">{course.level}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}

            </motion.div>
          )}
        </motion.div>

      )}
    </>
  )

};

export default Courses;