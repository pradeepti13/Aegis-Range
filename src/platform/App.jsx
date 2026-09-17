import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlatformLayout } from './layout/PlatformLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SoloMode } from './pages/SoloMode';
import { ChallengePlaceholder } from './components/ChallengePlaceholder';
import './styles/platform.css';

// Dynamic resolver for Person B's Challenge module
// Checks if src/features/challenge/ exists without causing Vite build errors
const challengeModuleMap = import.meta.glob('../features/challenge/**/*.{jsx,tsx,js,ts}');

const getChallengeComponent = () => {
  const keys = Object.keys(challengeModuleMap);
  if (keys.length === 0) {
    return null;
  }
  // Look for Challenge.jsx, index.jsx, or first available module
  const matchKey = keys.find(k => k.includes('Challenge') || k.includes('index')) || keys[0];
  return lazy(challengeModuleMap[matchKey]);
};

const ChallengeContainer = () => {
  const [ChallengeComponent, setChallengeComponent] = useState(null);

  useEffect(() => {
    const comp = getChallengeComponent();
    if (comp) {
      setChallengeComponent(() => comp);
    }
  }, []);

  if (ChallengeComponent) {
    return (
      <Suspense fallback={
        <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
          [INITIALIZING CHALLENGE SANDBOX ENVIRONMENT...]
        </div>
      }>
        <ChallengeComponent />
      </Suspense>
    );
  }

  return <ChallengePlaceholder />;
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
