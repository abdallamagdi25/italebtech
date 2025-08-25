import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // Added for isProcessing
import './Admin.css';

const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { setIsProcessing } = useAuth(); // Added for isProcessing
  const [formData, setFormData] = useState({
    title: '', summary: '', content: '', imageUrl: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", articleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        toast.error("لم يتم العثور على المقال!");
        navigate('/articles', { replace: true });
      }
      setLoading(false);
    };
    fetchArticle();
  }, [articleId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const articleRef = doc(db, "articles", articleId);
      await updateDoc(articleRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });
      toast.success("تم تحديث المقال بنجاح!");
      navigate('/articles');
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث.");
      console.error("Error updating article: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <p>جاري تحميل بيانات المقال...</p>;

  return (
    <div className="admin-container">
      <h2>تعديل المقال: {formData.title}</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>عنوان المقال</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>ملخص قصير</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>المحتوى الكامل للمقال</label>
          <textarea name="content" value={formData.content} onChange={handleChange} style={{ minHeight: '250px' }} />
        </div>
        <div className="form-group">
          <label>رابط صورة المقال</label>
          <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">حفظ التعديلات</button>
      </form>
    </div>
  );
};

export default EditArticle;