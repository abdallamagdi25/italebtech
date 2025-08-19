import React from 'react';
import './Footer.css';
// 1. استيراد الأيقونات
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';


const ProfileFooter = () => {
  return (
    <div className="profile-footer">
      <div className="profile-footer-section">
        <h4>عن iTalebTech</h4>
        <p>منصتنا تهدف لبناء أساس هندسي صلب عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
      </div>
      <div className="profile-footer-section">
        <h4>تواصل معنا</h4>
          <div className="social-links">
            <a href="facebook.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="instagram.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="linkedin.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="youtube.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
      </div>
      <div className="profile-footer-bottom">
        <p>&copy; 2025 iTalebTech. كل الحقوق محفوظة.</p>
      </div>
    </div>
  );
};

export default ProfileFooter;