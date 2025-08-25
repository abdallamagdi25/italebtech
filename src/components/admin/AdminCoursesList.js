import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';

const AdminCoursesList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const coursesRef = collection(db, 'courses');
    const q = query(coursesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذه الدورة؟")) {
      await deleteDoc(doc(db, "courses", id));
      toast.success("تم حذف الدورة بنجاح.");
      fetchCourses();
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>إدارة الدورات</h2>
        <Link to="/admin/add-course" className="add-new-btn">إضافة دورة جديدة +</Link>
      </div>
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
              <td className="actions-cell">
                <Link to={`/admin/edit-course/${course.id}`} className="action-btn edit">
                  تعديل
                </Link>
                <Link to={`/admin/course/${course.id}/lessons`} className="action-btn">
                  إدارة الدروس
                </Link>
                <button onClick={() => handleDelete(course.id)} className="action-btn delete">
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoursesList;