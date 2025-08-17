import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>iTalebTech</h3>
          <p>بناء أساس هندسي صلب عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
        </div>
        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul>
            <li><a href="/">الرئيسية</a></li>
            <li><a href="/courses">الدورات</a></li>
            <li><a href="/subscribe">الاشتراك</a></li>
            <li><a href="/about">عنّا</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <p>البريد الإلكتروني: contact@italeb.tech</p>
          <div className="social-links">
            <a href="facebook.com">Facebook</a>
            <a href="linkedin.com">LinkedIn</a>
            <a href="youtube.com">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 iTalebTech. كل الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;