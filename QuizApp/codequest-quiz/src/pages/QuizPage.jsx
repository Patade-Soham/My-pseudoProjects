import React, { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/quizStore.js';
import { categories } from '../data/index.js';

function TimerRing({ timeLeft, timeLimit }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const pct = timeLimit > 0 ? timeLeft / timeLimit : 0;
  const offset = circ * (1 - pct);
  const color = pct > 0.5 ? '#7c3aed' : pct > 0.25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="timer-ring">
      <svg className="timer-svg" width="52" height="52" viewBox="0 0 52 52">
        <circle className="timer-circle-bg" cx="26" cy="26" r={r} />
        <circle
          className="timer-circle-fg"
          cx="26"
          cy="26"
          r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="timer-text" style={{ color }}>
        {timeLeft}
      </div>
    </div>
  );
}

export default function QuizPage() {
  const {
    categoryId,
    questions,
    currentIndex,
    selectedAnswer,
    showExplanation,
    timeLeft,
    timeLimit,
    timerActive,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    goHome,
    tickTimer,
  } = useQuizStore();

  const tickRef = useRef(null);

  useEffect(() => {
    if (timerActive) {
      tickRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(tickRef.current);
  }, [timerActive, tickTimer]);

  const category = categories.find((c) => c.id === categoryId);
  const question = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const optionKeys = ['A', 'B', 'C', 'D'];

  if (!question) return null;

  const getOptionClass = (idx) => {
    if (!showExplanation) return 'option-btn';
    if (idx === question.correct) return 'option-btn correct';
    if (idx === selectedAnswer && idx !== question.correct) return 'option-btn wrong';
    return 'option-btn dim';
  };

  const isLastQuestion = currentIndex + 1 >= questions.length;

  return (
    <div className="quiz-container">
      <div className="quiz-topbar">
        <button className="back-btn" onClick={goHome}>
          {'<- Back'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, marginLeft: 16 }}>
          <span className="quiz-progress-label">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <TimerRing timeLeft={timeLeft} timeLimit={timeLimit} />
      </div>

      <div className="question-card" key={question.id}>
        <div className="question-meta">
          <span className="q-category-badge">{category?.name ?? categoryId}</span>
          {question.topic && (
            <span
              className="q-category-badge"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}
            >
              {question.topic}
            </span>
          )}
          <span className={`q-difficulty-badge ${question.difficulty}`}>{question.difficulty}</span>
        </div>

        <div className="question-text">{question.question}</div>

        {question.code && (
          <div className="code-block">
            <pre>{question.code}</pre>
          </div>
        )}

        <div className="options-list">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={getOptionClass(idx)}
              onClick={() => selectAnswer(idx)}
              disabled={showExplanation}
            >
              <span className="option-key">{optionKeys[idx]}</span>
              <span className="option-text">{option}</span>
              {showExplanation && idx === question.correct && <span className="option-icon">OK</span>}
              {showExplanation && idx === selectedAnswer && idx !== question.correct && (
                <span className="option-icon">X</span>
              )}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation-box">
            <div className="explanation-title">Explanation</div>
            <div className="explanation-text">{question.explanation}</div>
          </div>
        )}
      </div>

      {!showExplanation && (
        <button className="btn-secondary quiz-skip-btn" onClick={() => submitAnswer(-1)}>
          Skip Question
        </button>
      )}

      {showExplanation && (
        <button className="next-btn" onClick={nextQuestion}>
          {isLastQuestion ? 'See Results' : 'Next Question ->'}
        </button>
      )}
    </div>
  );
}
