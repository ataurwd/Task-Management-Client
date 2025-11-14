import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in by reading the cookies
  const user = JSON.parse(Cookies.get('user') || '{}');

  // If no user data is found in cookies, redirect to login page with alert
  if (!user.email) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the protected content (children)
  return children;
};

export default ProtectedRoute;
