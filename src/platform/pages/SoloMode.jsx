import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldIcon, 
  TerminalIcon, 
  TargetIcon, 
  TrophyIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  PlayIcon,
  AlertTriangleIcon
} from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const SoloMode = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isCompleted = user.completedChallenges.includes('SQL-001');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Navigation Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          DASHBOARD
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--cyan-primary)' }}>SOLO RANGE</span>
      </div>

      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-mono)' }}>
              SOLO TRAINING SECTOR
            </h1>
            <span className="badge badge-cyan">Review 1 Mission</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Single-operator tactical arena. Complete the challenge to validate offensive security fundamentals.
          </p>
        </div>

        <Link to="/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Challenge Mission Briefing Card */}
      <div className="card card-glowing" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className="badge badge-purple">Web Security</span>
              <span className="badge badge-emerald">Difficulty: Beginner</span>
              <span className="badge badge-cyan">ID: SQL-001</span>
              {isCompleted && (
                <span className="badge badge-emerald">
                  <CheckCircleIcon size={12} /> Solved
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              SQL Injection — Login Bypass
            </h2>
          </div>

          <div style={{
            background: 'rgba(0, 240, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              CHALLENGE REWARD
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
              100 XP
            </span>
          </div>
        </div>

        {/* Mission Briefing Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Mission Objective
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              A legacy administrative login portal constructs raw SQL query strings by concatenating untrusted user input directly into authentication statements. 
              Exploit this vulnerability by crafting a classic boolean-based SQL injection payload to bypass credential validation, gain administrative access, and extract the secret flag.
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div style={{ background: 'rgba(10, 15, 26, 0.6)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                TARGET SURFACE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                Simulated Web Login Portal
              </span>
            </div>
            <div style={{ background: 'rgba(10, 15, 26, 0.6)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                FLAG SIGNATURE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--emerald-accent)' }}>
                AEGIS&#123;...&#125;
              </span>
            </div>
          </div>

          {/* Action Launch Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TerminalIcon size={18} color="var(--cyan-primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Route: <code style={{ color: 'var(--cyan-primary)' }}>/challenge</code>
              </span>
            </div>

            <button
              onClick={() => navigate('/challenge')}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              <PlayIcon size={16} />
              {isCompleted ? 'Replay Challenge' : 'Start Challenge (Launch /challenge)'}
            </button>
          </div>
        </div>
      </div>

      {/* Integration Contract Notice */}
      <div className="terminal-box" style={{ fontSize: '0.76rem' }}>
        <div style={{ color: 'var(--cyan-primary)', fontWeight: 600, marginBottom: '4px' }}>
          [PLATFORM INTEGRATION BOUNDARY]
        </div>
        Clicking &quot;Start Challenge&quot; routes the operator to <span style={{ color: 'var(--cyan-primary)' }}>/challenge</span>.
        In the integrated build, this renders Person B&apos;s Challenge component (<code style={{ color: 'var(--text-primary)' }}>src/features/challenge/</code>).
      </div>
    </div>
  );
};
