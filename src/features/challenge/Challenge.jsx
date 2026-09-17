import React, { useState } from 'react';
import { CHALLENGE_DATA, validateFlag, simulateSqlQuery } from './challengeData';
import Hint from './Hint';
import ChallengeResult from './ChallengeResult';
import './challenge.css';

/**
 * Challenge Component
 * 
 * Main cybersecurity challenge interface for Review 1.
 * Provides a self-contained learning flow:
 * Challenge Details -> Simulated Exploitation -> Flag Submission -> Validation -> Result State
 * 
 * @param {Object} props
 * @param {Object} [props.challenge] - Challenge metadata override (defaults to CHALLENGE_DATA)
 * @param {Function} [props.onComplete] - Callback triggered upon successful completion with result payload
 * @param {Function} [props.onReturn] - Callback to return to dashboard or solo mode
 * @param {Function} [props.onScoreUpdate] - Callback to update parent/platform global score
 */
export default function Challenge({
  challenge = CHALLENGE_DATA,
  onComplete,
  onReturn,
  onScoreUpdate
}) {
  // Flag Submission State
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'correct' | 'incorrect'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Simulated Lab State
  const [simUsername, setSimUsername] = useState("admin' --");
  const [simPassword, setSimPassword] = useState('');
  const [simOutput, setSimOutput] = useState(null);

  // Handle Simulated SQL Injection Attempt in the mini-sandbox
  const handleSimulateExploit = (e) => {
    if (e) e.preventDefault();
    const result = simulateSqlQuery(simUsername, simPassword);
    setSimOutput(result);
  };

  // Handle Flag Submission
  const handleSubmitFlag = (e) => {
    if (e) e.preventDefault();

    const nextAttemptCount = attemptsCount + 1;
    setAttemptsCount(nextAttemptCount);

    const validation = validateFlag(flagInput);

    if (validation.isValid) {
      setSubmissionStatus('correct');
      setFeedbackMessage(validation.feedback);
      setScore(validation.scoreAwarded);
      setIsCompleted(true);

      if (typeof onScoreUpdate === 'function') {
        onScoreUpdate(validation.scoreAwarded);
      }

      if (typeof onComplete === 'function') {
        onComplete({
          challengeId: challenge.id,
          title: challenge.title,
          scoreAwarded: validation.scoreAwarded,
          attempts: nextAttemptCount,
          flag: challenge.flag,
          completedAt: new Date().toISOString()
        });
      }
    } else {
      setSubmissionStatus('incorrect');
      setFeedbackMessage(validation.feedback);
    }
  };

  // Reset/Retry Challenge
  const handleResetChallenge = () => {
    setFlagInput('');
    setSubmissionStatus(null);
    setFeedbackMessage('');
    setAttemptsCount(0);
    setScore(0);
    setIsCompleted(false);
    setSimOutput(null);
    setSimUsername("admin' --");
    setSimPassword('');
  };

  // If completed, show completion result view
  if (isCompleted) {
    return (
      <div className="aegis-challenge-page">
        <div className="aegis-challenge-container">
          <ChallengeResult
            score={score}
            pointsAwarded={challenge.points}
            attemptsCount={attemptsCount}
            challenge={challenge}
            onRetry={handleResetChallenge}
            onReturn={onReturn}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="aegis-challenge-page">
      <div className="aegis-challenge-container">
        
        {/* Navigation / Header Bar */}
        <header className="aegis-challenge-nav-bar">
          {typeof onReturn === 'function' ? (
            <button
              type="button"
              className="aegis-challenge-back-btn"
              onClick={onReturn}
              aria-label="Back to Dashboard or Solo Mode"
            >
              ← Back to Solo Mode
            </button>
          ) : (
            <div className="aegis-challenge-badge id">
              <span>{challenge.id}</span>
            </div>
          )}

          <div className="aegis-challenge-user-score-badge">
            <span>Challenge Score:</span>
            <span className="aegis-challenge-score-num">{score} PTS</span>
          </div>
        </header>

        {/* Main Challenge Details Card */}
        <section className="aegis-challenge-card" aria-labelledby="challenge-title">
          
          {/* Metadata Badges */}
          <div className="aegis-challenge-meta-row">
            <span className="aegis-challenge-badge id">{challenge.id}</span>
            <span className="aegis-challenge-badge category">{challenge.category}</span>
            <span className="aegis-challenge-badge difficulty">{challenge.difficulty}</span>
            <span className="aegis-challenge-badge points">★ {challenge.points} XP</span>
          </div>

          {/* Title & Description */}
          <h1 id="challenge-title" className="aegis-challenge-title">
            {challenge.title}
          </h1>
          
          <p className="aegis-challenge-desc">
            {challenge.description}
          </p>

          {/* Objective Box */}
          <div className="aegis-challenge-objective-box">
            <h3 className="aegis-challenge-objective-heading">Mission Objective</h3>
            <p className="aegis-challenge-objective-text">{challenge.objective}</p>
          </div>

          {/* Interactive Simulated Target / Lab Section */}
          <div className="aegis-challenge-lab-section">
            <div className="aegis-challenge-lab-header">
              <span className="aegis-challenge-lab-header-title">
                <span aria-hidden="true">🖥️</span> Target Simulation: Vulnerable Authentication Portal
              </span>
              <span className="aegis-challenge-lab-status">● LIVE SIMULATION</span>
            </div>

            <div className="aegis-challenge-lab-content">
              {/* Vulnerable Code Preview */}
              <div className="aegis-challenge-code-snippet">
                <span className="aegis-challenge-code-label">Backend SQL Construction:</span>
                <code>{challenge.scenario?.vulnerableCode || "SELECT * FROM users WHERE username = '$user' AND password = '$password';"}</code>
              </div>

              {/* Simulated Attack Form */}
              <form onSubmit={handleSimulateExploit} className="aegis-challenge-sim-form">
                <div className="aegis-challenge-field-group">
                  <label htmlFor="sim-user-input" className="aegis-challenge-field-label">
                    Username Payload
                  </label>
                  <input
                    id="sim-user-input"
                    type="text"
                    className="aegis-challenge-input"
                    value={simUsername}
                    onChange={(e) => setSimUsername(e.target.value)}
                    placeholder="e.g. admin' --"
                  />
                </div>

                <div className="aegis-challenge-field-group">
                  <label htmlFor="sim-pass-input" className="aegis-challenge-field-label">
                    Password
                  </label>
                  <input
                    id="sim-pass-input"
                    type="text"
                    className="aegis-challenge-input"
                    value={simPassword}
                    onChange={(e) => setSimPassword(e.target.value)}
                    placeholder="e.g. anything"
                  />
                </div>

                <button type="submit" className="aegis-challenge-btn aegis-challenge-btn-secondary">
                  Test Query
                </button>
              </form>

              {/* Simulation Result Box */}
              {simOutput && (
                <div className={`aegis-challenge-sim-result-box ${simOutput.bypassed ? 'success' : 'failure'}`}>
                  <div><strong>Constructed Query:</strong> <code>{simOutput.query}</code></div>
                  <div style={{ marginTop: '6px' }}><strong>Server Response:</strong> {simOutput.message}</div>
                  
                  {simOutput.bypassed && simOutput.retrievedFlag && (
                    <div className="aegis-challenge-flag-discovered">
                      <span><strong>Flag Discovered:</strong> <code className="aegis-challenge-flag-discovered-text">{simOutput.retrievedFlag}</code></span>
                      <button
                        type="button"
                        className="aegis-challenge-btn-copy"
                        onClick={() => setFlagInput(simOutput.retrievedFlag)}
                        title="Copy flag to submission field"
                      >
                        Insert into Flag Box ↵
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Predefined Hint Component */}
          <Hint hint={challenge.hint} />

          {/* Flag Submission Area */}
          <div className="aegis-challenge-submission-section">
            <h3 className="aegis-challenge-submission-title">
              <span aria-hidden="true">🚩</span> Submit Flag
            </h3>

            <form onSubmit={handleSubmitFlag} className="aegis-challenge-form">
              <input
                type="text"
                className="aegis-challenge-flag-input"
                placeholder="AEGIS{flag_here}"
                value={flagInput}
                onChange={(e) => {
                  setFlagInput(e.target.value);
                  if (submissionStatus === 'incorrect') {
                    setSubmissionStatus(null);
                  }
                }}
                aria-label="Flag Input"
                required
              />
              <button
                type="submit"
                className="aegis-challenge-btn aegis-challenge-btn-primary"
              >
                Submit Flag
              </button>
            </form>

            {/* Submission Status Alert */}
            {submissionStatus === 'incorrect' && (
              <div className="aegis-challenge-alert error" role="alert">
                <span aria-hidden="true">❌</span>
                <div>
                  <strong>Submission Failed:</strong> {feedbackMessage} (Attempt {attemptsCount})
                </div>
              </div>
            )}

            {submissionStatus === 'correct' && (
              <div className="aegis-challenge-alert success" role="alert">
                <span aria-hidden="true">✅</span>
                <div>
                  <strong>Success:</strong> {feedbackMessage}
                </div>
              </div>
            )}
          </div>

        </section>
      </div>
    </div>
  );
}
