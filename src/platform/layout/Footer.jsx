import React from 'react';
import { ShieldIcon } from '../components/Icons';

export const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'rgba(8, 12, 20, 0.95)',
      padding: '20px 0',
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldIcon size={16} color="var(--cyan-primary)" />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            AEGIS RANGE v0.1.0-review1
          </span>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
            Phase 1 Shell Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <span>Architecture: Review 1 Vertical Slice</span>
          <span>•</span>
          <span style={{ color: 'var(--emerald-accent)' }}>● Simulated Telemetry Ready</span>
          <span>•</span>
          <span>Target: CTFd / Docker Lab in Phase 4</span>
        </div>
      </div>
    </footer>
  );
};
