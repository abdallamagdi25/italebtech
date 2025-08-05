import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
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
<div className="courses-page">
  <h1>الدورات المتاحة</h1>
  {loading ? (
    <h2>جاري تحميل الدورات...</h2>
  ) : (
    <div className="courses-grid">
      {courses.map(course => (
        <div key={course.id} className="course-card">
          <div className="course-card-content">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <span className="course-level-badge">{course.level}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )

};

export default Courses;