import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProfilePage.css';
import { FiGrid, FiSettings, FiLogOut, FiCreditCard } from 'react-icons/fi';
import ProfileFooter from './ProfileFooter';

const ProfilePage = () => {
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

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h2>ملفي الشخصي</h2>
        <p>{currentUser?.email}</p>
      </div>
      <div className="profile-menu">
        <Link to="/dashboard" className="profile-menu-item">
          <FiGrid className="profile-menu-icon" />
          <span>لوحة التحكم</span>
        </Link>
        <div className="profile-menu-item">
          <FiCreditCard className="profile-menu-icon" />
          <span>إدارة الاشتراك (قريباً)</span>
        </div>
        <div className="profile-menu-item">
          <FiSettings className="profile-menu-icon" />
          <span>الإعدادات (قريباً)</span>
        </div>
        <button onClick={handleLogout} className="profile-menu-item logout-btn">
          <FiLogOut className="profile-menu-icon" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
      <ProfileFooter />
    </div>
  );
};

export default ProfilePage;