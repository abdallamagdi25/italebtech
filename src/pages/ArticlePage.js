import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ArticlePage.css';
import Sidebar from '../components/Sidebar'; // استيراد الشريط الجانبي

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "articles", articleId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  if (loading) return <p>جاري تحميل المقال...</p>;
  if (!article) return <p>لم يتم العثور على المقال.</p>;

  return (
    <div className="article-page-container">
      <div className="article-main-content">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span>بواسطة: {article.authorName}</span>
          <span>بتاريخ: {new Date(article.createdAt?.toDate()).toLocaleDateString('ar-EG')}</span>
        </div>
        <img src={article.imageUrl} alt={article.title} className="article-hero-image" />
        <div className="article-body">
          {article.content.split('\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ArticlePage;