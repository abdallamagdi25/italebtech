import React from 'react';
import './InfoPage.css';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import logo from '../assets/images/full-logo.png';

const InfoPage = () => {
  return (
    <div className="info-page-container">
      <img src={logo} alt="iTalebTech Logo" className="info-page-logo" />
      <div className="info-section">
        <h3>عن iTalebTech</h3>
        <p>منصتنا تهدف لبناء أساس هندسي صلب عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
      </div>
      <div className="info-section">
        <h3>تواصل معنا</h3>
        <p className="contact-info">
          <strong>البريد الإلكتروني:</strong>
          <a href="mailto:italebtech@gmail.com">italebtech@gmail.com</a>
        </p>
        <div className="social-links-info">
            <a href="https://facebook.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com/company/italebtech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com/@iTalebTech" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>
      <div className="info-footer">
        <p>&copy; 2025 iTalebTech. كل الحقوق محفوظة.</p>
      </div>
    </div>
  );
};

export default InfoPage;