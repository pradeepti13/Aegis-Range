import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, TerminalIcon, UserIcon, ArrowRightIcon, LockIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [callsign, setCallsign] = useState('ApexOperator');
  const [password, setPassword] = useState('demo-pass-2026');
  const [role, setRole] = useState('Red Cadet');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!callsign.trim()) return;
    login(callsign.trim(), `${callsign.toLowerCase().replace(/\s+/g, '')}@aegis.range`);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    login('ApexOperator', 'operator@aegis.range');
    navigate('/dashboard');
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '40px auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%)',
          border: '1px solid var(--cyan-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--cyan-glow)'
        }}>
          <ShieldIcon size={28} color="var(--cyan-primary)" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AEGIS <span style={{ color: 'var(--cyan-primary)' }}>RANGE</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            Operator Authentication Terminal
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="card card-glowing">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <LockIcon size={16} color="var(--cyan-primary)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Access Protocol // Review 1 Mock Auth
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              OPERATOR CALLSIGN
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. ApexOperator, Cipher, Ghost"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              ACCESS CREDENTIAL / KEY
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              * Review 1 mode accepts any simulated security key
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              ASSIGNED DISCIPLINE
            </label>
            <select
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="Red Cadet">Offensive Security / Web Exploitation (Solo)</option>
              <option value="Blue Guardian">Defensive Ops / Blue Team (Locked - Phase 8)</option>
              <option value="Purple Analyst">Full-Spectrum Cyber Analyst</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px', padding: '12px' }}>
            Initialize Terminal <ArrowRightIcon size={16} />
          </button>
        </form>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.8rem' }}
          >
            <TerminalIcon size={14} color="var(--cyan-primary)" />
            Quick Demo Auto-Login (Reviewer)
          </button>
        </div>
      </div>

      {/* Terminal Footer Info */}
      <div className="terminal-box" style={{ textAlign: 'center', fontSize: '0.74rem' }}>
        [SYSTEM STATUS]: Review 1 Shell Ready | Local Session Active
        <br />
        Next step: Login → Dashboard → Solo Mode → /challenge
      </div>
    </div>
  );
};
