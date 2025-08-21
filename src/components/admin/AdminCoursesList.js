import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './Admin.css';

const AdminCoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCourses();
  }, []);

  return (
    <div className="admin-container">
      <h2>إدارة الدورات</h2>
      <Link to="/admin/add-course" className="add-new-btn">إضافة دورة جديدة +</Link>
      <table className="admin-table">
        <thead>
          <tr>
            <th>عنوان الدورة</th>
            <th>عدد الدروس</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.lessons?.length || 0}</td>
              <td>
                <Link to={`/admin/course/${course.id}/lessons`} className="action-btn">
                  إدارة الدروس
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoursesList;