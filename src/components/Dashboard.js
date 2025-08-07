import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FiBookOpen, FiStar, FiCreditCard } from 'react-icons/fi';

const Dashboard = () => {
  const { currentUser } = useAuth();

  // We use the user's first name if it exists, otherwise we show their email.
  const displayName = currentUser?.firstName || currentUser?.email;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>مرحباً بعودتك، {displayName}!</h1>
        <p>مستعد لتبني مشروعك التالي؟ لننطلق.</p>
      </header>

      <div className="dashboard-widgets">
        {/* Widget 1: My Subscription */}
        <div className="widget-card">
          <FiCreditCard className="widget-icon" />
          <div className="widget-content">
            <h3>اشتراكك</h3>
            {currentUser?.subscription?.status === 'active' ? (
              <p className="status-active">فعال - {currentUser.subscription.plan}</p>
            ) : (
              <p className="status-inactive">غير فعال</p>
            )}
            <Link to="/subscribe" className="widget-link">إدارة الاشتراك</Link>
          </div>
        </div>

        {/* Widget 2: My Progress */}
        <div className="widget-card">
          <FiStar className="widget-icon" />
          <div className="widget-content">
            <h3>مستوى تقدمك</h3>
            <p>0 دورة مكتملة</p>
            <span className="widget-link-placeholder">عرض الإنجازات (قريباً)</span>
          </div>
        </div>
        
        {/* Widget 3: Start Learning */}
        <div className="widget-card cta-card">
          <FiBookOpen className="widget-icon" />
          <div className="widget-content">
            <h3>استكشف الدورات</h3>
            <p>ابدأ رحلتك التعليمية الآن وتصفح مكتبة المشاريع الكاملة.</p>
            <Link to="/courses" className="widget-link button-style">عرض كل الدورات</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;