import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Navbar.css';
import { FiHome, FiGrid, FiUser, FiLogIn, FiSearch, FiBell } from 'react-icons/fi'; // استيراد الأيقونات الجديدة

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.info("تم تسجيل الخروج بنجاح.");
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الخروج.");
    }
  };

  const handleFeatureSoon = () => {
    toast.info("هذه الميزة ستكون متاحة قريباً!");
  };

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <nav className="navbar-desktop">
        {/* Section 1: Logo */}
        <div className="nav-left">
          <Link to="/" className="navbar-logo">iTalebTech</Link>
        </div>

        {/* Section 2: Main Links */}
        <div className="nav-center">
          <ul className="desktop-links">
            <li><NavLink to="/">الرئيسية</NavLink></li>
            <li><NavLink to="/courses">الدورات</NavLink></li>
            {currentUser && <li><NavLink to="/dashboard">لوحة التحكم</NavLink></li>}
          </ul>
        </div>

        {/* Section 3: Actions */}
        <div className="nav-right">
          <div className="navbar-icons">
            <button onClick={handleFeatureSoon} className="icon-btn"><FiSearch /></button>
            <button onClick={handleFeatureSoon} className="icon-btn"><FiBell /></button>
          </div>
          {currentUser ? (
            <button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button>
          ) : (
            <Link to="/login" className="login-btn">تسجيل الدخول</Link>
          )}
        </div>
      </nav>

      {/* --- Mobile Top & Bottom Bars (no changes here) --- */}
      <header className="mobile-top-bar">
        <Link to="/" className="navbar-logo">iTalebTech</Link>
        <div className="navbar-icons">
          <button onClick={handleFeatureSoon} className="icon-btn"><FiSearch /></button>
          <button onClick={handleFeatureSoon} className="icon-btn"><FiBell /></button>
        </div>
      </header>

      <nav className="navbar-mobile">
        <NavLink to="/" className="mobile-nav-link"><FiHome /><span>الرئيسية</span></NavLink>
        <NavLink to="/courses" className="mobile-nav-link"><FiGrid /><span>الدورات</span></NavLink>
        {currentUser ? (
          <NavLink to="/profile" className="mobile-nav-link"><FiUser /><span>حسابي</span></NavLink>
        ) : (
          <NavLink to="/login" className="mobile-nav-link"><FiLogIn /><span>الدخول</span></NavLink>
        )}
      </nav>
    </>
  );
};

export default Navbar;