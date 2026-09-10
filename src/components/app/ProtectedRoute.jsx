import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowIncompleteOnboarding = false }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user has not completed onboarding and is trying to access /app/*
  const onboardingCompleted = user?.onboarding?.completed;
  if (!onboardingCompleted && !allowIncompleteOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
