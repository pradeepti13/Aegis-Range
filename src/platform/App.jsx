import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlatformLayout } from './layout/PlatformLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SoloMode } from './pages/SoloMode';
import Challenge from '../features/challenge';
import './styles/platform.css';

const ChallengeContainer = () => {
  const { addScore } = useAuth();
  const navigate = useNavigate();

  const handleScoreUpdate = (points) => {
    if (points > 0) {
      addScore(points, 'SQL-001');
    }
  };

  const handleComplete = (payload) => {
    if (payload?.scoreAwarded > 0) {
      addScore(payload.scoreAwarded, payload.challengeId || 'SQL-001');
    }
  };

  const handleReturn = (e) => {
    if (e?.target?.textContent?.includes('Dashboard')) {
      navigate('/dashboard');
    } else {
      navigate('/solo');
    }
  };

  return (
    <Challenge
      onScoreUpdate={handleScoreUpdate}
      onComplete={handleComplete}
      onReturn={handleReturn}
    />
  );
};

// Route protection component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const PlatformApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Platform Shell Routes */}
          <Route element={<PlatformLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/solo" 
              element={
                <ProtectedRoute>
                  <SoloMode />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/challenge" 
              element={
                <ProtectedRoute>
                  <ChallengeContainer />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default PlatformApp;
