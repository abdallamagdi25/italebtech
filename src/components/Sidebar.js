import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './Sidebar.css';

const Sidebar = () => {
  const { articleId } = useParams(); // To exclude the current article
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(6));
      const snapshot = await getDocs(q);
      // Filter out the current article from the list
      const articles = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.id !== articleId)
        .slice(0, 5); // Ensure we have 5 articles
      setLatestArticles(articles);
    };
    fetchLatest();
  }, [articleId]);

  return (
    <aside className="article-sidebar">
      <h3>أحدث المقالات</h3>
      <div className="sidebar-articles-list">
        {latestArticles.map(article => (
          <Link to={`/articles/${article.id}`} key={article.id} className="sidebar-article-link">
            <img src={article.imageUrl} alt={article.title} />
            <h4>{article.title}</h4>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;