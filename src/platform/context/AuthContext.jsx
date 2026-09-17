import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  callsign: 'ApexOperator',
  email: 'operator@aegis.range',
  rank: 'Level 1 Cyber Cadet',
  role: 'Ethical Hacker Trainee',
  score: 0,
  completedChallenges: [],
  joinedDate: '2026-09-18'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aegis_auth_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('aegis_auth_status');
      return saved ? JSON.parse(saved) : true; // default logged in for smooth demo experience
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aegis_auth_user', JSON.stringify(user));
      localStorage.setItem('aegis_auth_status', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [user, isAuthenticated]);

  const login = (callsign, email = '') => {
    const newUser = {
      ...DEFAULT_USER,
      callsign: callsign || 'ApexOperator',
      email: email || `${(callsign || 'operator').toLowerCase()}@aegis.range`
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addScore = (points, challengeId) => {
    setUser(prev => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        score: prev.score + points,
        completedChallenges: [...prev.completedChallenges, challengeId]
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, addScore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
