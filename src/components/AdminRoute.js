import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './AnimatedPage.css';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // يسمح بالمرور فقط إذا كان المستخدم مسجلاً وهو أدمن
  if (currentUser && currentUser.isAdmin) {
    return children;
  }

  // وإلا، يوجهه للوحة التحكم
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;