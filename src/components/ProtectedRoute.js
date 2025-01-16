import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem('role');
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    alert('Access denied!');
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;