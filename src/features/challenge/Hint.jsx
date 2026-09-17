import React, { useState } from 'react';

/**
 * Hint Component
 * 
 * Provides an on-demand, collapsible hint for the cybersecurity challenge.
 * 
 * @param {Object} props
 * @param {Object|string} [props.hint] - Hint object or string
 * @param {Function} [props.onHintRevealed] - Optional callback when hint is first viewed
 */
export default function Hint({ hint, onHintRevealed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && !hasBeenRevealed) {
      setHasBeenRevealed(true);
      if (typeof onHintRevealed === 'function') {
        onHintRevealed();
      }
    }
  };

  const hintTitle = (typeof hint === 'object' && hint?.title) ? hint.title : 'Challenge Hint';
  const hintContent = (typeof hint === 'object' && hint?.content) ? hint.content : (typeof hint === 'string' ? hint : 'No hint available.');
  const examplePayloads = (typeof hint === 'object' && Array.isArray(hint?.examplePayloads)) ? hint.examplePayloads : [];

  return (
    <div className="aegis-challenge-hint-wrapper">
      <div className="aegis-challenge-hint-header">
        <button
          type="button"
          className={`aegis-challenge-hint-btn ${isOpen ? 'active' : ''}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span className="aegis-challenge-hint-icon" aria-hidden="true">💡</span>
          <span>{isOpen ? 'Hide Predefined Hint' : 'Reveal Predefined Hint'}</span>
          <span className="aegis-challenge-hint-tag">{hasBeenRevealed ? 'Revealed' : 'Available'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="aegis-challenge-hint-body" role="region" aria-label="Challenge Hint Details">
          <div className="aegis-challenge-hint-title-row">
            <span className="aegis-challenge-hint-badge">CLUE</span>
            <h4 className="aegis-challenge-hint-title">{hintTitle}</h4>
          </div>
          
          <p className="aegis-challenge-hint-text">{hintContent}</p>

          {examplePayloads.length > 0 && (
            <div className="aegis-challenge-hint-examples">
              <span className="aegis-challenge-hint-examples-label">Conceptual Payloads:</span>
              <div className="aegis-challenge-hint-payload-list">
                {examplePayloads.map((payload, index) => (
                  <code key={index} className="aegis-challenge-hint-code-tag">
                    {payload}
                  </code>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
