import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NotFound.css';
import { FiCompass } from 'react-icons/fi'; // أيقونة البوصلة

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // مؤقت لإنقاص العداد كل ثانية
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // مؤقت لإعادة التوجيه بعد 10 ثوانٍ
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);

    // دالة التنظيف: مهمة جدًا لإلغاء المؤقتات إذا غادر المستخدم الصفحة
    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="not-found-container">
      <FiCompass className="not-found-icon" />
      <h1>404</h1>
      <h2>يبدو أنك تائه!</h2>
      <p>الصفحة التي تبحث عنها غير موجودة. لا تقلق.</p>
      <p>سيتم إعادة توجيهك إلى الصفحة الرئيسية خلال {countdown} ثوانٍ...</p>
      <Link to="/" className="not-found-button">
        العودة إلى الصفحة الرئيسية الآن
      </Link>
    </div>
  );
};

export default NotFound;