import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';

const EditLessonModal = ({ onClose, courseId, lesson, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: lesson.title,
    description: lesson.description
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return toast.error("يرجى ملء كل الحقول");

    const courseRef = doc(db, "courses", courseId);
    try {
      const docSnap = await getDoc(courseRef);
      const lessons = docSnap.data().lessons;
      lessons[lesson.index] = formData;

      await updateDoc(courseRef, { lessons });
      toast.success("تم تحديث الدرس بنجاح!");
      onUpdate(); // Refresh the parent component
      onClose();
    } catch (error) {
      toast.error("حدث خطأ.");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>تعديل الدرس: {lesson.title}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>عنوان الدرس</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>وصف الدرس</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">حفظ التعديلات</button>
          <button type="button" onClick={onClose} className="cancel-btn">إلغاء</button>
        </form>
      </div>
    </div>
  );
};

export default EditLessonModal;