import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/app/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import OnboardingAssessment from './pages/OnboardingAssessment';
import OnboardingResult from './pages/OnboardingResult';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import Play from './pages/Play';
import GamePlaceholder from './pages/GamePlaceholder';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Onboarding Flow (Requires Auth, Allows Incomplete Onboarding) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute allowIncompleteOnboarding={true}>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/assessment"
            element={
              <ProtectedRoute allowIncompleteOnboarding={true}>
                <OnboardingAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/result"
            element={
              <ProtectedRoute allowIncompleteOnboarding={true}>
                <OnboardingResult />
              </ProtectedRoute>
            }
          />

          {/* Protected Application Routes (Requires Auth & Completed Onboarding) */}
          <Route
            path="/app/roadmap"
            element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/play"
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/game/:questId"
            element={
              <ProtectedRoute>
                <GamePlaceholder />
              </ProtectedRoute>
            }
          />


          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
