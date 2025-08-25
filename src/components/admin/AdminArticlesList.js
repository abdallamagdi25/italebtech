import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';

const AdminArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("فشل تحميل قائمة المقالات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.")) {
      try {
        await deleteDoc(doc(db, "articles", id));
        toast.success("تم حذف المقال بنجاح.");
        fetchArticles();
      } catch (error) {
        toast.error("حدث خطأ أثناء الحذف.");
      }
    }
  };

  if (loading) return <p>جاري تحميل المقالات...</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>إدارة المقالات</h2>
        <Link to="/admin/add-article" className="add-new-btn">إضافة مقال جديد +</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>عنوان المقال</th>
            <th>تاريخ الإنشاء</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.createdAt ? new Date(article.createdAt.toDate()).toLocaleDateString('ar-EG') : 'غير محدد'}</td>
              <td className="actions-cell">
                <Link to={`/admin/edit-article/${article.id}`} className="action-btn edit">
                  تعديل
                </Link>
                <button onClick={() => handleDelete(article.id)} className="action-btn delete">
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

export default AdminArticlesList;