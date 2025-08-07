import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // الفحص الأول: هل المستخدم مسجل دخوله؟
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // الفحص الثاني (الذكي): هل اشتراك المستخدم فعال؟
  const isSubscriptionActive = currentUser.subscription?.status === 'active';

  // صفحة الدورات هي الوحيدة التي تتطلب اشتراكًا فعالاً
  if (location.pathname === '/courses' && !isSubscriptionActive) {
    return <Navigate to="/subscribe" />;
  }
  
  // إذا نجح في كل الفحوصات، اسمح له بالمرور
  return children;
};

export default ProtectedRoute;