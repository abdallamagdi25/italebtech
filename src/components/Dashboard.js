import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () =>  {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>مرحباً بعودتك، {currentUser?.email}!</h1>
        <p>هنا يمكنك متابعة رحلتك التعليمية.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>حالة الاشتراك</h3>
          {currentUser?.subscription?.status === 'active' ? (
            <p className="status-active">فعال</p>
          ) : (
            <p className="status-inactive">غير فعال</p>
          )}
          <p>الباقة الحالية: {currentUser?.subscription?.plan || 'لا يوجد'}</p>
        </div>

        <div className="dashboard-card">
          <h3>الدورات التي بدأتها</h3>
          <p>قريباً... هنا ستظهر الدورات التي تتابعها حالياً.</p>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;