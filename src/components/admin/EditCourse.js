import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        toast.error("لم يتم العثور على الدورة!");
        navigate('/admin/courses');
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, {
      ...formData,
      updatedAt: serverTimestamp()
    });
    toast.success("تم تحديث الدورة بنجاح!");
    navigate('/admin/courses');
  };

  return (
    <div className="admin-container">
      <h2>تعديل الدورة</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>عنوان الدورة</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>الوصف</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>المستوى</label>
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">مبتدئ</option>
            <option value="Intermediate">متوسط</option>
            <option value="Advanced">متقدم</option>
          </select>
        </div>
        <div className="form-group">
          <label>رابط صورة الدورة</label>
          <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">حفظ التعديلات</button>
      </form>
    </div>
  );
};

export default EditCourse;