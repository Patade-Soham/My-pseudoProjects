import React from 'react';
import { useQuizStore } from './store/quizStore.js';
import HomePage from './pages/HomePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';

export default function App() {
  const page = useQuizStore((s) => s.page);
  const goHome = useQuizStore((s) => s.goHome);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={goHome}>
          <span className="logo-icon">CQ</span>
          <div className="logo-text">
            Code<span>Quest</span>
          </div>
        </div>
        {page !== 'home' && (
          <button className="back-btn" onClick={goHome}>
            {'<- Home'}
          </button>
        )}
      </header>

      {page === 'home' && <HomePage />}
      {page === 'quiz' && <QuizPage />}
      {page === 'results' && <ResultsPage />}
    </div>
  );
}
