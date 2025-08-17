import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css'; // سنعيد استخدام نفس التصميم

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !summary || !imageUrl) {
      return toast.error("يرجى ملء جميع الحقول.");
    }
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        summary,
        imageUrl,
        createdAt: serverTimestamp()
      });
      toast.success("تمت إضافة المقال بنجاح!");
      setTitle('');
      setSummary('');
      setImageUrl('');
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
          <label>رابط صورة المقال</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
        </div>
        <button type="submit" className="submit-btn">إضافة المقال</button>
      </form>
    </div>
  );
};

export default AddArticle;