import React, { useEffect, useState } from 'react';
import { useQuizStore } from '../store/quizStore.js';
import { categories } from '../data/index.js';

function getVerdict(pct) {
  if (pct >= 90) return { text: 'Legendary!', color: '#f59e0b' };
  if (pct >= 75) return { text: 'Excellent!', color: '#22c55e' };
  if (pct >= 60) return { text: 'Good Job!', color: '#60a5fa' };
  if (pct >= 40) return { text: 'Keep Studying', color: '#a78bfa' };
  return { text: 'Keep Practicing', color: '#f87171' };
}

function ScoreRing({ pct }) {
  const [displayed, setDisplayed] = useState(0);
  const r = 74;
  const circ = 2 * Math.PI * r;
  const color = pct >= 75 ? '#22c55e' : pct >= 50 ? '#7c3aed' : '#ef4444';

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const raf = (ts) => {
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(pct * ease));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [pct]);

  return (
    <div className="score-ring">
      <svg className="score-ring-svg" width="180" height="180" viewBox="0 0 180 180">
        <circle className="score-ring-bg" cx="90" cy="90" r={r} />
        <circle
          className="score-ring-fg"
          cx="90"
          cy="90"
          r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct / 100)}
        />
      </svg>
      <div className="score-ring-center">
        <div className="score-pct" style={{ color }}>{displayed}%</div>
        <div className="score-label">Score</div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const { answers, questions, categoryId, goHome, startQuiz, stats, lastResult } = useQuizStore();

  const hasLive = answers.length > 0 && questions.length > 0;
  const resultAnswers = hasLive ? answers : lastResult?.answers || [];
  const resultQuestions = hasLive ? questions : lastResult?.questions || [];
  const resultCategoryId = hasLive ? categoryId : lastResult?.categoryId || categoryId;

  const correct = resultAnswers.filter((a) => a.correct).length;
  const skipped = resultAnswers.filter((a) => a.selectedOption === null || a.selectedOption === -1).length;
  const wrong = resultAnswers.length - correct - skipped;
  const pct = resultAnswers.length ? Math.round((correct / resultAnswers.length) * 100) : 0;
  const verdict = getVerdict(pct);
  const category = categories.find((c) => c.id === resultCategoryId);
  const catStats = stats[resultCategoryId];
  const isNewBest = Boolean(lastResult?.isNewBest && lastResult?.categoryId === resultCategoryId);

  if (resultAnswers.length === 0) {
    return (
      <div className="results-container">
        <div className="result-verdict" style={{ color: '#f59e0b' }}>No results yet</div>
        <div className="result-summary">Finish a quiz to see your score, stats, and answer review here.</div>
        <div className="results-actions">
          <button className="btn-primary" onClick={goHome}>
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="score-ring-wrapper">
        <ScoreRing pct={pct} />
      </div>

      <div className="result-verdict" style={{ color: verdict.color }}>{verdict.text}</div>
      <div className="result-summary">
        You answered {correct} out of {resultAnswers.length} questions correctly in {category?.name ?? 'this category'}.
        {isNewBest && pct > 0 && (
          <span style={{ marginLeft: 8 }}>
            <span className="best-badge">New Best!</span>
          </span>
        )}
      </div>

      <div className="results-stats">
        <div className="result-stat">
          <div className="result-stat-val green">{correct}</div>
          <div className="result-stat-key">Correct</div>
        </div>
        <div className="result-stat">
          <div className="result-stat-val red">{wrong}</div>
          <div className="result-stat-key">Wrong</div>
        </div>
        <div className="result-stat">
          <div className="result-stat-val" style={{ color: '#f59e0b' }}>{skipped}</div>
          <div className="result-stat-key">Skipped</div>
        </div>
        {catStats && (
          <div className="result-stat">
            <div className="result-stat-val" style={{ color: '#a78bfa' }}>{catStats.best}%</div>
            <div className="result-stat-key">Best Ever</div>
          </div>
        )}
      </div>

      <p className="section-title" style={{ textAlign: 'left', marginBottom: 12 }}>Review Answers</p>
      <div className="review-list">
        {resultAnswers.map((ans, i) => {
          const q = resultQuestions[i];
          if (!q) return null;
          const isSkipped = ans.selectedOption === null || ans.selectedOption === -1;
          const cls = ans.correct ? 'correct' : isSkipped ? 'skipped' : 'wrong';
          const icon = ans.correct ? 'OK' : isSkipped ? 'SKIP' : 'X';
          return (
            <div key={i} className={`review-item ${cls}`}>
              <div className="review-icon">{icon}</div>
              <div>
                <div className="review-question">
                  {i + 1}. {q.question.length > 80 ? `${q.question.slice(0, 80)}...` : q.question}
                </div>
                <div className="review-answer">
                  {isSkipped
                    ? 'Time ran out - no answer selected'
                    : ans.correct
                    ? `Correct: ${q.options[q.correct]}`
                    : `Your answer: ${q.options[ans.selectedOption] ?? '?'} | Correct: ${q.options[q.correct]}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={() => startQuiz(resultCategoryId)}>
          Play Again
        </button>
        <button className="btn-secondary" onClick={goHome}>
          Back to Categories
        </button>
      </div>
    </div>
  );
}
