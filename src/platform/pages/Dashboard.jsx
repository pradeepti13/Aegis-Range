import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldIcon, 
  TerminalIcon, 
  TargetIcon, 
  TrophyIcon, 
  UserIcon, 
  LockIcon, 
  ArrowRightIcon, 
  PlayIcon,
  ActivityIcon,
  CheckCircleIcon,
  LayersIcon
} from '../components/Icons';
import { StatsCard } from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isChallengeSolved = user.completedChallenges.includes('SQL-001');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Learner Welcome Header */}
      <div className="card card-glowing" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px',
        padding: '28px 32px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(2, 132, 199, 0.3) 100%)',
            border: '1px solid var(--cyan-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--cyan-glow)'
          }}>
            <UserIcon size={32} color="var(--cyan-primary)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-mono)' }}>
                Welcome, {user.callsign}
              </h1>
              <span className="badge badge-emerald">
                <span className="pulse-dot" /> ACTIVE SESSION
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              Rank: <strong style={{ color: 'var(--text-primary)' }}>{user.rank}</strong> • Security Clearance: <span style={{ color: 'var(--cyan-primary)' }}>Level 1 Cadet</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/solo')} className="btn btn-primary">
            <PlayIcon size={14} /> Launch Solo Range
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-4">
        <StatsCard
          title="Current Score"
          value={`${user.score} XP`}
          subtitle={isChallengeSolved ? "First blood achieved" : "Earn +100 XP in Solo Challenge"}
          icon={TrophyIcon}
          badge={user.score > 0 ? "Rank Up!" : "Beginner"}
          accent="cyan"
        />
        <StatsCard
          title="Missions Completed"
          value={`${user.completedChallenges.length} / 1`}
          subtitle="Review 1 Vertical Slice target"
          icon={TargetIcon}
          badge={isChallengeSolved ? "100%" : "In Progress"}
          accent={isChallengeSolved ? "emerald" : "amber"}
        />
        <StatsCard
          title="Active Track"
          value="Web Exploitation"
          subtitle="SQL Injection & Auth Bypass"
          icon={TerminalIcon}
          badge="Module 01"
          accent="purple"
        />
        <StatsCard
          title="Range Engine"
          value="Simulated"
          subtitle="Targeting CTFd / Docker (Phase 4)"
          icon={ActivityIcon}
          badge="Ready"
          accent="emerald"
        />
      </div>

      {/* Main Sections: Training Modes */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}>
              RANGE OPERATION MODES
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Select an exercise format to begin tactical cyber training
            </p>
          </div>
          <span className="badge badge-cyan">Review 1 Active: Solo Mode</span>
        </div>

        <div className="grid grid-cols-3">
          {/* Active: Solo Mode */}
          <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--border-bright)',
            background: 'linear-gradient(180deg, rgba(16, 24, 42, 0.9) 0%, rgba(12, 19, 34, 0.9) 100%)',
            boxShadow: 'var(--border-glow)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-cyan">
                  READY • REVIEW 1 FOCUS
                </span>
                <TargetIcon size={20} color="var(--cyan-primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Solo Tactical Mode</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Single-player simulated sandbox. Analyze web application flaws, test SQL injection payloads, discover the hidden flag, and earn XP.
              </p>

              <div style={{ marginTop: '16px', padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(0, 240, 255, 0.04)', border: '1px solid rgba(0, 240, 255, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                  <span>PRIMARY MISSION:</span>
                  <span>100 XP</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-primary)' }}>
                  SQL Injection — Login Bypass
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/solo" className="btn btn-primary" style={{ width: '100%' }}>
                Enter Solo Mode <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>

          {/* Locked: Team Cyber Range */}
          <div className="card" style={{ opacity: 0.7, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-muted">
                  <LockIcon size={12} /> PHASE 8 ROADMAP
                </span>
                <LayersIcon size={20} color="var(--text-muted)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Multiplayer / Team Range</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Collaborative red and blue team exercises. Multi-container networked environments with real-time defense, network pivoting, and CTF scoreboard.
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button disabled className="btn btn-secondary" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}>
                <LockIcon size={14} /> Locked (Phase 8)
              </button>
            </div>
          </div>

          {/* Locked: Cyber Twin & Adaptive AI */}
          <div className="card" style={{ opacity: 0.7, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-muted">
                  <LockIcon size={12} /> PHASE 6 ROADMAP
                </span>
                <ActivityIcon size={20} color="var(--text-muted)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Cyber Twin Intelligence</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Structured cognitive learner modeling. Behavioral telemetry tracks recon, stealth, and exploitation efficiency to provide automated coaching.
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button disabled className="btn btn-secondary" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}>
                <LockIcon size={14} /> Locked (Phase 6)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Mission Entry Point Card */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">CHALLENGE ENTRY POINT</span>
            <span className="badge badge-purple">Web Security</span>
            <span className="badge badge-emerald">Beginner</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
            SQL Injection — Login Bypass
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Bypass an insecure administrative authentication gate using standard SQL injection syntax to retrieve the flag.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontFamily: 'var(--font-mono)' }}>REWARD</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>100 XP</span>
          </div>
          <Link to="/solo" className="btn btn-primary">
            Review Mission Briefing <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
