import React from 'react';
import './ProfileFooter.css';

const ProfileFooter = () => {
  return (
    <div className="profile-footer">
      <div className="profile-footer-section">
        <h4>عن iTalebTech</h4>
        <p>منصتنا تهدف لبناء أساس هندسي صلب عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
      </div>
      <div className="profile-footer-section">
        <h4>تواصل معنا</h4>
        <div className="social-links-profile">
          <a href="facebook.com">Facebook</a>
          <a href="linkedin.com">LinkedIn</a>
          <a href="youtube.com">YouTube</a>
        </div>
      </div>
      <div className="profile-footer-bottom">
        <p>&copy; 2025 iTalebTech. كل الحقوق محفوظة.</p>
      </div>
    </div>
  );
};

export default ProfileFooter;