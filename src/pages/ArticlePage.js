import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ArticlePage.css';
import Sidebar from '../components/Sidebar';
import ReactMarkdown from 'react-markdown'; // 1. استيراد المكتبة

const ArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "articles", articleId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/not-found', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate('/not-found', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId, navigate]);

  if (loading) {
    return null; // ❌ مفيش PageLoader هنا، App.js هو اللي بيعرضه
  }

  if (!article) {
    return <p>المقال غير موجود</p>;
  }

  return (
    <div className="article-page-container">
      <div className="article-main-content">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span>بواسطة: {article.authorName}</span>
          <span>بتاريخ: {new Date(article.createdAt?.toDate()).toLocaleDateString('ar-EG')}</span>
        </div>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="article-hero-image"
        />
        <div className="article-body">
          {/* 2. هنا نستخدم ReactMarkdown بدلاً من تقسيم النص */}
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ArticlePage;
