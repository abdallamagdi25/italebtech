import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay'; // سنستخدم شاشة التحميل

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // We get the initial loading state

  // If the initial authentication check is still running, show a loader
  if (loading) {
    return <LoadingOverlay />;
  }

  // After initial load, if there is no user, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, allow them to see the content
  return children;
};

export default ProtectedRoute;