import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldIcon, 
  TerminalIcon, 
  TargetIcon, 
  TrophyIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  AlertTriangleIcon
} from './Icons';
import { useAuth } from '../context/AuthContext';

export const ChallengePlaceholder = () => {
  const { user, addScore } = useAuth();
  const navigate = useNavigate();
  const [simulatedComplete, setSimulatedComplete] = useState(
    user.completedChallenges.includes('SQL-001')
  );

  const handleSimulateWin = () => {
    addScore(100, 'SQL-001');
    setSimulatedComplete(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px', margin: '0 auto' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          DASHBOARD
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <Link to="/solo" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          SOLO RANGE
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--cyan-primary)' }}>/challenge (INTEGRATION POINT)</span>
      </div>

      {/* Main Integration Boundary Card */}
      <div className="card card-glowing" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            color: 'var(--cyan-primary)'
          }}>
            <TerminalIcon size={24} />
          </div>
          <div>
            <div className="badge badge-amber" style={{ marginBottom: '4px' }}>
              Person A / Person B Integration Point
            </div>
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              Route: /challenge
            </h1>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
          This is the designated mounting point for <strong>Person B's Challenge module</strong> (<code style={{ color: 'var(--cyan-primary)' }}>src/features/challenge/</code>). 
          Person A's platform shell has routed the operator through <strong>Login → Dashboard → Solo Mode → /challenge</strong>.
        </p>

        {/* Integration Contract Box */}
        <div style={{
          backgroundColor: 'rgba(10, 15, 26, 0.85)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon size={16} color="var(--cyan-primary)" />
            Challenge Module Contract Specification
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Target Directory:</span>
              <div style={{ color: 'var(--text-primary)' }}>src/features/challenge/</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Challenge Title:</span>
              <div style={{ color: 'var(--text-primary)' }}>SQL Injection — Login Bypass</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Target Flag:</span>
              <div style={{ color: 'var(--emerald-accent)' }}>AEGIS&#123;sql_injection_basic&#125;</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Award:</span>
              <div style={{ color: 'var(--cyan-primary)' }}>100 XP</div>
            </div>
          </div>
        </div>

        {/* Optional Reviewer Simulation Button */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          background: simulatedComplete ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
          border: `1px solid ${simulatedComplete ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: simulatedComplete ? 'var(--emerald-accent)' : 'var(--amber-warning)' }}>
                {simulatedComplete ? '✓ Challenge Completed (100 XP Awarded)' : 'Platform Session Test Hook'}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {simulatedComplete 
                  ? 'Score and completion state updated in local platform state. Return to Dashboard to verify.'
                  : 'Simulate flag solve to verify that score propagates back to the Dashboard.'}
              </p>
            </div>

            {!simulatedComplete && (
              <button onClick={handleSimulateWin} className="btn btn-outline" style={{ fontSize: '0.78rem' }}>
                <TrophyIcon size={14} /> Test Score Award (+100 XP)
              </button>
            )}
          </div>
        </div>

        {/* Navigation Return Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/solo')} className="btn btn-secondary">
            ← Return to Solo Mode
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Return to Dashboard <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
