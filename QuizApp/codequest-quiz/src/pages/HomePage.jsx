import React from 'react';
import { categories } from '../data/index.js';
import { useQuizStore } from '../store/quizStore.js';

export default function HomePage() {
  const {
    startQuiz,
    stats,
    questionCount,
    timeLimit,
    setQuestionCount,
    setTimeLimit,
    resetProgress,
  } = useQuizStore();

  const totalQuestions = categories.reduce((sum, category) => sum + category.questions.length, 0);
  const totalPlayed = Object.values(stats).reduce((sum, item) => sum + item.played, 0);
  const bestScore = Object.values(stats).reduce((maxScore, item) => Math.max(maxScore, item.best), 0);
  const aggregate = Object.values(stats).reduce(
    (acc, item) => ({
      totalCorrect: acc.totalCorrect + item.totalCorrect,
      totalQuestions: acc.totalQuestions + item.totalQuestions,
    }),
    { totalCorrect: 0, totalQuestions: 0 }
  );
  const overallAccuracy = aggregate.totalQuestions
    ? Math.round((aggregate.totalCorrect / aggregate.totalQuestions) * 100)
    : 0;

  return (
    <div>
      <div className="home-hero">
        <div className="hero-badge">
          <span>Practice</span> Master CS Fundamentals
        </div>
        <h1 className="hero-title">
          Level up your
          <br />
          <span className="gradient-text">coding knowledge</span>
        </h1>
        <p className="hero-subtitle">
          125+ expert-crafted questions across 5 categories. Track your progress, beat your scores, and become unstoppable.
        </p>

        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-value">{totalQuestions}+</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalPlayed}</div>
            <div className="stat-label">Quizzes Taken</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{overallAccuracy}%</div>
            <div className="stat-label">Overall Accuracy</div>
          </div>
          {bestScore > 0 && (
            <div className="stat-item">
              <div className="stat-value">{bestScore}%</div>
              <div className="stat-label">Best Score</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <p className="section-title" style={{ marginBottom: 0 }}>Quiz Settings</p>
        {totalPlayed > 0 && (
          <button className="btn-secondary" onClick={resetProgress}>
            Reset Progress
          </button>
        )}
      </div>
      <div className="settings-row" style={{ marginBottom: 36 }}>
        <div className="setting-box">
          <div className="setting-label">Questions per quiz</div>
          <div className="setting-options">
            {[5, 10, 15, 25].map((count) => (
              <button
                key={count}
                className={`setting-btn${questionCount === count ? ' active' : ''}`}
                onClick={() => setQuestionCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
        <div className="setting-box">
          <div className="setting-label">Seconds per question</div>
          <div className="setting-options">
            {[15, 20, 30, 60].map((seconds) => (
              <button
                key={seconds}
                className={`setting-btn${timeLimit === seconds ? ' active' : ''}`}
                onClick={() => setTimeLimit(seconds)}
              >
                {seconds}s
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="section-title">Choose a category</p>
      <div className="category-grid">
        {categories.map((category) => {
          const categoryStats = stats[category.id];
          return (
            <div
              key={category.id}
              className="category-card"
              data-cat={category.id}
              onClick={() => startQuiz(category.id)}
            >
              <div className="card-header">
                <div className="card-icon">{category.icon}</div>
                <div className="card-badge">{category.questions.length} Q</div>
              </div>
              <div className="card-name">{category.name}</div>
              <div className="card-desc">{category.description}</div>
              <div className="card-topics">
                {category.topics.map((topic) => (
                  <span key={topic} className="topic-chip">{topic}</span>
                ))}
              </div>
              <div className="card-footer">
                <div className="card-stat">
                  {categoryStats ? (
                    <>
                      Best: <strong>{categoryStats.best}%</strong> | {categoryStats.played}x
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Not played yet</span>
                  )}
                </div>
                <div className="card-play-btn">
                  Play <span>{'->'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
