import './FeedbackMessage.css';

export const FeedbackMessage = ({ feedback, onClose }) => {
  const hasMessage = Boolean(feedback && feedback.message);
  const type = feedback?.type || 'info';

  return (
    <div
      id="feedback-message"
      data-testid="form-feedback"
      aria-live="polite"
      className={`feedback-container ${hasMessage ? `feedback-${type}` : 'hidden'}`}
    >
      {hasMessage && (
        <div className="feedback-inner">
          <span className="feedback-icon" aria-hidden="true">
            {type === 'error' ? '⚠️' : type === 'success' ? '✓' : 'ℹ️'}
          </span>
          <span className="feedback-text">{feedback.message}</span>
          {onClose && (
            <button
              type="button"
              id="btnCloseFeedback"
              name="btnCloseFeedback"
              className="feedback-close-btn"
              onClick={onClose}
              aria-label="Fechar mensagem de feedback"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
};

