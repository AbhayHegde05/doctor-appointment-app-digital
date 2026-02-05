import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Check for specific role (e.g., only 'admin' can see AdminDashboard)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Redirect unauthorized users home
  }

  return children;
};

export default PrivateRoute;