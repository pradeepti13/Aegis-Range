import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldIcon, UserIcon, TrophyIcon, LogOutIcon, TerminalIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/dashboard')) return true;
    return location.pathname === path;
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'rgba(8, 12, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%)',
            border: '1px solid var(--cyan-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--cyan-glow)'
          }}>
            <ShieldIcon size={20} color="var(--cyan-primary)" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              AEGIS <span style={{ color: 'var(--cyan-primary)' }}>RANGE</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Adaptive Cyber Training
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to="/dashboard"
            className="btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              color: isActive('/dashboard') ? 'var(--cyan-primary)' : 'var(--text-secondary)',
              borderBottom: isActive('/dashboard') ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              borderRadius: '0',
              background: 'transparent'
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/solo"
            className="btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              color: isActive('/solo') ? 'var(--cyan-primary)' : 'var(--text-secondary)',
              borderBottom: isActive('/solo') ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              borderRadius: '0',
              background: 'transparent'
            }}
          >
            Solo Mode
          </Link>
          <Link
            to="/challenge"
            className="btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              color: isActive('/challenge') ? 'var(--cyan-primary)' : 'var(--text-secondary)',
              borderBottom: isActive('/challenge') ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              borderRadius: '0',
              background: 'transparent'
            }}
          >
            <TerminalIcon size={14} />
            Challenge Point
          </Link>
        </nav>

        {/* User / Learner Session Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated ? (
            <>
              {/* Score / XP Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--cyan-primary)'
              }}>
                <TrophyIcon size={14} color="var(--cyan-primary)" />
                <span>{user.score} XP</span>
              </div>

              {/* Callsign Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div className="pulse-dot" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {user.callsign}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Disconnect / Logout"
                className="btn btn-secondary"
                style={{ padding: '6px 10px' }}
              >
                <LogOutIcon size={14} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
              <UserIcon size={14} />
              Operator Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
