import React from 'react';

export const StatsCard = ({ title, value, subtitle, icon: Icon, badge, accent = 'cyan' }) => {
  const accentColors = {
    cyan: 'var(--cyan-primary)',
    emerald: 'var(--emerald-accent)',
    amber: 'var(--amber-warning)',
    purple: 'var(--purple-accent)'
  };

  const currentColor = accentColors[accent] || accentColors.cyan;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
          {title}
        </span>
        {Icon && (
          <div style={{ 
            padding: '8px', 
            borderRadius: 'var(--radius-sm)', 
            background: `rgba(255,255,255,0.03)`,
            border: `1px solid rgba(255,255,255,0.06)`,
            color: currentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={18} color={currentColor} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {badge && (
          <span className={`badge badge-${accent}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
};
