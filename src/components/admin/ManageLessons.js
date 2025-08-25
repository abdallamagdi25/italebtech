import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';
import EditLessonModal from './EditLessonModal'; // <-- The new component

const ManageLessons = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchCourse = useCallback(async () => {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCourse({ id: docSnap.id, ...docSnap.data() });
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!lessonTitle || !lessonDesc) return toast.error("يرجى ملء كل الحقول");
    
    const courseRef = doc(db, "courses", courseId);
    try {
      await updateDoc(courseRef, {
        lessons: arrayUnion({
          title: lessonTitle,
          description: lessonDesc
        })
      });
      toast.success("تمت إضافة الدرس بنجاح!");
      setLessonTitle('');
      setLessonDesc('');
      fetchCourse();
    } catch (error) {
      toast.error("حدث خطأ.");
    }
  };

  const handleEditClick = (lesson, index) => {
    setSelectedLesson({ ...lesson, index });
    setShowEditModal(true);
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedLesson(null);
  };

  if (!course) return <p>جاري تحميل الدورة...</p>;

  return (
    <div className="admin-container">
      <h2>إدارة دروس: {course.title}</h2>
      
      <div className="current-lessons">
        <h3>الدروس الحالية ({course.lessons?.length || 0})</h3>
        <ul>
          {course.lessons?.map((lesson, index) => (
            <li key={index} className="lesson-item-admin">
              <span>{index + 1}. {lesson.title}</span>
              <div className="lesson-actions">
                <button onClick={() => handleEditClick(lesson, index)} className="action-btn edit-lesson">
                  تعديل
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form className="admin-form" onSubmit={handleAddLesson}>
        <h3>إضافة درس جديد</h3>
        <div className="form-group">
          <label>عنوان الدرس</label>
          <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>وصف الدرس</label>
          <textarea value={lessonDesc} onChange={(e) => setLessonDesc(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn">إضافة الدرس</button>
      </form>

      {showEditModal && (
        <EditLessonModal
          onClose={handleCloseModal}
          courseId={courseId}
          lesson={selectedLesson}
          onUpdate={fetchCourse}
        />
      )}
    </div>
  );
};
export default ManageLessons;