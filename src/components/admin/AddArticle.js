import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AddArticle = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState(''); // New field for full content
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !summary || !imageUrl || !content) {
      return toast.error("يرجى ملء جميع الحقول.");
    }
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        summary,
        content, // Add content to database
        imageUrl,
        authorName: currentUser.firstName || currentUser.email, // Use author's name
        authorId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success("تمت إضافة المقال بنجاح!");
      // Clear fields
      setTitle(''); setSummary(''); setContent(''); setImageUrl('');
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة المقال.");
      console.error("Error adding article: ", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>إضافة مقال جديد</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>عنوان المقال</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>ملخص قصير (سيظهر في الصفحة الرئيسية)</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>
        <div className="form-group">
          <label>المحتوى الكامل للمقال</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ minHeight: '250px' }} />
        </div>
        <div className="form-group">
          <label>رابط صورة المقال</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn">إضافة المقال</button>
      </form>
    </div>
  );
};

export default AddArticle;