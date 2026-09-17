import React from 'react';

/**
 * ChallengeResult Component
 * 
 * Renders the completion state and debrief after a successful flag submission.
 * 
 * @param {Object} props
 * @param {number} props.score - Total score earned
 * @param {number} props.pointsAwarded - Points awarded for this challenge
 * @param {number} props.attemptsCount - Number of attempts made
 * @param {Object} props.challenge - Challenge metadata
 * @param {Function} [props.onRetry] - Callback to replay/reset the challenge
 * @param {Function} [props.onReturn] - Callback to return to dashboard/solo mode
 */
export default function ChallengeResult({
  score = 100,
  pointsAwarded = 100,
  attemptsCount = 1,
  challenge = {},
  onRetry,
  onReturn
}) {
  const challengeTitle = challenge.title || 'SQL Injection — Login Bypass';
  const challengeCategory = challenge.category || 'Web Security';
  const challengeFlag = challenge.flag || 'AEGIS{sql_injection_basic}';

  return (
    <div className="aegis-challenge-result-container">
      <div className="aegis-challenge-result-card">
        {/* Header Badge */}
        <div className="aegis-challenge-result-header">
          <div className="aegis-challenge-result-icon-glow">
            <span className="aegis-challenge-result-icon" aria-hidden="true">🛡️</span>
          </div>
          <span className="aegis-challenge-result-status-badge">MISSION ACCOMPLISHED</span>
          <h2 className="aegis-challenge-result-title">Challenge Completed!</h2>
          <p className="aegis-challenge-result-subtitle">
            You successfully exploited the SQL injection vulnerability and recovered the target flag.
          </p>
        </div>

        {/* Score & Rewards Overview */}
        <div className="aegis-challenge-result-score-banner">
          <div className="aegis-challenge-result-score-item primary">
            <span className="aegis-challenge-result-score-label">Points Awarded</span>
            <span className="aegis-challenge-result-score-val">+{pointsAwarded} XP</span>
          </div>
          <div className="aegis-challenge-result-score-item">
            <span className="aegis-challenge-result-score-label">Total Module Score</span>
            <span className="aegis-challenge-result-score-val">{score} PTS</span>
          </div>
          <div className="aegis-challenge-result-score-item">
            <span className="aegis-challenge-result-score-label">Total Attempts</span>
            <span className="aegis-challenge-result-score-val">{attemptsCount}</span>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="aegis-challenge-result-details-grid">
          <div className="aegis-challenge-result-detail-box">
            <span className="aegis-challenge-result-detail-label">Challenge Title</span>
            <span className="aegis-challenge-result-detail-value">{challengeTitle}</span>
          </div>
          <div className="aegis-challenge-result-detail-box">
            <span className="aegis-challenge-result-detail-label">Category</span>
            <span className="aegis-challenge-result-detail-value">{challengeCategory}</span>
          </div>
          <div className="aegis-challenge-result-detail-box full-width">
            <span className="aegis-challenge-result-detail-label">Captured Flag</span>
            <code className="aegis-challenge-result-flag-code">{challengeFlag}</code>
          </div>
        </div>

        {/* Key Educational Takeaway */}
        <div className="aegis-challenge-result-takeaway">
          <h4 className="aegis-challenge-takeaway-title">
            <span aria-hidden="true">🔒</span> Security Takeaway & Remediation
          </h4>
          <p className="aegis-challenge-takeaway-text">
            Dynamic string concatenation allows user-supplied data to modify SQL query logic. 
            To remediate this vulnerability, developers must always use <strong>Parameterized Queries (Prepared Statements)</strong> 
            or an Object-Relational Mapper (ORM) that treats user input strictly as data parameters rather than executable SQL syntax.
          </p>
        </div>

        {/* Action Controls */}
        <div className="aegis-challenge-result-actions">
          {typeof onReturn === 'function' ? (
            <button
              type="button"
              className="aegis-challenge-btn aegis-challenge-btn-primary"
              onClick={onReturn}
            >
              Return to Dashboard
            </button>
          ) : (
            <button
              type="button"
              className="aegis-challenge-btn aegis-challenge-btn-primary"
              onClick={() => {
                if (window.history && window.history.length > 1) {
                  window.history.back();
                } else {
                  alert('Return navigation callback not provided. Challenge completed successfully!');
                }
              }}
            >
              Return to Dashboard
            </button>
          )}

          {typeof onRetry === 'function' && (
            <button
              type="button"
              className="aegis-challenge-btn aegis-challenge-btn-secondary"
              onClick={onRetry}
            >
              Replay Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
