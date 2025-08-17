import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // 1. تجميع كل الاستيرادات هنا
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// 2. استيراد ملفات التصميم الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import './ArticlesSlider.css';

const ArticlesSlider = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = collection(db, 'articles');
        // 3. بناء الـ Query بالطريقة الحديثة
        const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        setArticles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // لا تعرض القسم إذا لم تكن هناك مقالات أو لا يزال التحميل جاريًا
  if (loading || articles.length === 0) {
    return null; 
  }

  return (
    <div className="articles-slider-container">
      <h2>أحدث المقالات والدروس</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={'auto'}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {articles.map(article => (
          <SwiperSlide key={article.id}>
            <div className="article-card">
              <img src={article.imageUrl} alt={article.title} />
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                {/* 4. الرابط سيشير إلى صفحة المقال مستقبلاً */}
                <a href={`/articles/${article.id}`}>اقرأ المزيد</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArticlesSlider;