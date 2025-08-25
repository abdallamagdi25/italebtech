import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './Sidebar.css';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { articleId } = useParams();
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(6));
      const snapshot = await getDocs(q);
      const articles = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.id !== articleId)
        .slice(0, 5);
      setLatestArticles(articles);
    };
    fetchLatest();
  }, [articleId]);

  return (
    <motion.aside 
      className="article-sidebar"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3>أحدث المقالات</h3>
      <div className="sidebar-articles-list">
        {latestArticles.map(article => (
          <Link to={`/articles/${article.id}`} key={article.id} className="sidebar-article-link">
            <img src={article.imageUrl} alt={article.title} />
            <h4>{article.title}</h4>
          </Link>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;