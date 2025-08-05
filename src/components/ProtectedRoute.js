import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    return < Navigate to="/login" state={{ from: location}} replace/>
  }

  if (location.pathname !== '/subscribe' && currentUser.subscription?.status !== 'active') {
    return < Navigate to="/subscribe" />
  }

  return children;
};

export default ProtectedRoute;