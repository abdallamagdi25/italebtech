import React from 'react';
import './Footer.css';
// 1. استيراد أيقونات جديدة
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FiInfo, FiGrid, FiHelpCircle } from 'react-icons/fi';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Section 1: About (Will appear on the Right in RTL) */}
        <div className="footer-section about">
          <img src={logo} alt="iTalebTech Logo" className="footer-logo-img" />
          <p>منصة تعليمية تهدف لبناء الأساس القوي للجيل القادم من التكنولوجيين في مصر عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
        </div>

        {/* Section 2: Quick Links (Will appear in the Middle) */}
        <div className="footer-section links">
          <h3>روابط سريعة</h3>
          <ul>
            <li>
              <a href="/about">
                <FiInfo className="footer-link-icon" />
                <span>عنّا</span>
              </a>
            </li>
            <li>
              <a href="/courses">
                <FiGrid className="footer-link-icon" />
                <span>الدورات</span>
              </a>
            </li>
            <li>
              <a href="/#faq">
                <FiHelpCircle className="footer-link-icon" />
                <span>الأسئلة الشائعة</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact (Will appear on the Left in RTL) */}
        <div className="footer-section contact">
          <h3>تواصل معنا</h3>
          <p className="contact-info">
            <strong>البريد الإلكتروني:</strong>
            <a href="mailto:italebtech@gmail.com">italebtech@gmail.com</a>
          </p>
          <div className="social-links">
            <a href="https://facebook.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com/italebtech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com/company/italebtech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com/@iTalebTech" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
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