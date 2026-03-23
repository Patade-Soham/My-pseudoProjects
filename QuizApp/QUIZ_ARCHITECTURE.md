# 🏗️ MULTI-CATEGORY QUIZ - SITE ARCHITECTURE
## Complete Page Structure & Component Specifications

---

## 🌐 SITE MAP OVERVIEW

```
CodeQuest Multi-Category Quiz Platform
│
├── 🏠 Dashboard (/)
├── 📋 Category Detail (/category/:categoryId)
├── 🎯 Quiz Screen (/quiz/:categoryId)
├── ✅ Results Screen (/results/:categoryId/:quizId)
└── 🏆 Achievements (/achievements)

Global Components (on all pages):
├── Navbar
└── PageTransition wrapper
```

---

## 📄 DETAILED PAGE SPECIFICATIONS

### 🏠 **DASHBOARD PAGE** (`/`)

**Purpose:** Main hub, category selection, progress overview

---

#### **1. Welcome Section**

```jsx
<div className="welcome-section">
  <div className="welcome-content">
    <h1 className="welcome-title">
      Welcome to CodeQuest
    </h1>
    <p className="welcome-subtitle">
      Test your programming knowledge across 5 categories
    </p>
  </div>
  
  <div className="quick-stats">
    <StatCard 
      icon="🎯"
      value="3/5"
      label="Categories Completed"
    />
    <StatCard 
      icon="⭐"
      value="12,450"
      label="Total Points"
    />
    <StatCard 
      icon="🏆"
      value="6/10"
      label="Achievements"
    />
  </div>
</div>
```

**Layout:**
- Max-width: 1280px, centered
- Padding: 80px vertical, 24px horizontal
- Background: Gradient mesh overlay

---

#### **2. Category Grid**

```jsx
<div className="category-grid">
  <CategoryCard category="python" />
  <CategoryCard category="webdev" />
  <CategoryCard category="cybersecurity" />
  <CategoryCard category="aiml" />
  <CategoryCard category="networking" />
</div>
```

**CategoryCard Component Structure:**

```jsx
<div 
  className="category-card"
  style={{ 
    borderColor: category.color,
    '--category-color': category.color,
    '--category-glow': category.glow 
  }}
  onClick={() => navigate(`/category/${category.id}`)}
>
  {/* Icon */}
  <div className="category-card-icon">
    {category.icon}
  </div>
  
  {/* Title */}
  <h3 className="category-card-title">
    {category.name}
  </h3>
  
  {/* Progress Circle */}
  <div className="category-card-progress">
    <CircularProgressbar
      value={progress.percentage}
      text={`${progress.percentage}%`}
      styles={{
        path: { stroke: category.color },
        text: { fill: category.color }
      }}
    />
  </div>
  
  {/* Stats */}
  <div className="category-card-stats">
    <div className="stat-item">
      <span>Completed</span>
      <span className="stat-value">
        {progress.completed}/{category.total}
      </span>
    </div>
    <div className="stat-item">
      <span>Best Score</span>
      <span className="stat-value">
        {progress.bestScore || '--'}
      </span>
    </div>
  </div>
  
  {/* Badge if completed */}
  {progress.percentage === 100 && (
    <div className="category-badge">
      <span className="badge-icon">🏆</span>
      <span>Master</span>
    </div>
  )}
  
  {/* Action Button */}
  <button 
    className="btn-category"
    style={{ 
      borderColor: category.color,
      color: category.color 
    }}
  >
    {progress.completed > 0 ? 'Continue' : 'Start Quiz'}
  </button>
</div>
```

**Grid Layout:**
- Desktop (1024px+): 3 columns
- Tablet (768px-1023px): 2 columns
- Mobile (<768px): 1 column
- Gap: 24px

---

#### **3. Overall Progress Section**

```jsx
<div className="overall-progress">
  <h2>Your Overall Progress</h2>
  
  <div className="progress-stats">
    {/* Total Progress Bar */}
    <div className="total-progress">
      <div className="progress-header">
        <span>Total Questions Answered</span>
        <span className="progress-count">75/125</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: '60%' }}
        />
      </div>
    </div>
    
    {/* Categories Breakdown */}
    <div className="categories-breakdown">
      {categories.map(cat => (
        <div key={cat.id} className="category-mini">
          <span className="category-mini-icon">{cat.icon}</span>
          <span className="category-mini-name">{cat.name}</span>
          <div className="category-mini-bar">
            <div 
              style={{ 
                width: `${progress[cat.id].percentage}%`,
                background: cat.color
              }}
            />
          </div>
          <span className="category-mini-percent">
            {progress[cat.id].percentage}%
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

#### **4. Recent Activity**

```jsx
<div className="recent-activity">
  <h2>Recent Quiz Attempts</h2>
  
  <div className="activity-list">
    {recentQuizzes.slice(0, 5).map(quiz => (
      <div key={quiz.id} className="activity-item">
        <span className="activity-icon">{quiz.category.icon}</span>
        <div className="activity-details">
          <span className="activity-category">
            {quiz.category.name}
          </span>
          <span className="activity-date">
            {formatDate(quiz.completedAt)}
          </span>
        </div>
        <span className="activity-score">
          {quiz.score} pts
        </span>
        <span className={`activity-percentage ${
          quiz.percentage >= 80 ? 'excellent' : 
          quiz.percentage >= 60 ? 'good' : 'fair'
        }`}>
          {quiz.percentage}%
        </span>
      </div>
    ))}
  </div>
  
  {recentQuizzes.length === 0 && (
    <div className="empty-state">
      <p>No quizzes attempted yet. Start your first quiz!</p>
    </div>
  )}
</div>
```

---

### 📋 **CATEGORY DETAIL PAGE** (`/category/:categoryId`)

**Purpose:** Configure quiz, view category stats, start quiz

---

#### **1. Category Header**

```jsx
<div className="category-detail-header">
  <button 
    onClick={() => navigate('/')}
    className="back-button"
  >
    ← Back to Dashboard
  </button>
  
  <div className="category-hero">
    <div 
      className="category-hero-icon"
      style={{ color: category.color }}
    >
      {category.icon}
    </div>
    <div>
      <h1 className="category-hero-title">
        {category.name}
      </h1>
      <p className="category-hero-description">
        {category.description}
      </p>
    </div>
  </div>
</div>
```

---

#### **2. Quiz Configuration**

```jsx
<div className="quiz-config">
  <h2>Configure Your Quiz</h2>
  
  {/* Difficulty Selection */}
  <div className="config-section">
    <h3>Select Difficulty</h3>
    <div className="difficulty-options">
      <button 
        className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
        onClick={() => setDifficulty('easy')}
      >
        <span className="difficulty-icon">🌱</span>
        <span className="difficulty-label">Easy</span>
        <span className="difficulty-info">10 questions, 15s each</span>
      </button>
      
      <button 
        className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
        onClick={() => setDifficulty('medium')}
      >
        <span className="difficulty-icon">⚡</span>
        <span className="difficulty-label">Medium</span>
        <span className="difficulty-info">10 questions, 20s each</span>
      </button>
      
      <button 
        className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
        onClick={() => setDifficulty('hard')}
      >
        <span className="difficulty-icon">🔥</span>
        <span className="difficulty-label">Hard</span>
        <span className="difficulty-info">5 questions, 30s each</span>
      </button>
      
      <button 
        className={`difficulty-btn ${difficulty === 'all' ? 'active' : ''}`}
        onClick={() => setDifficulty('all')}
      >
        <span className="difficulty-icon">🎯</span>
        <span className="difficulty-label">All Mixed</span>
        <span className="difficulty-info">25 questions, varied time</span>
      </button>
    </div>
  </div>
  
  {/* Mode Selection */}
  <div className="config-section">
    <h3>Select Mode</h3>
    <div className="mode-options">
      <div 
        className={`mode-card ${mode === 'practice' ? 'active' : ''}`}
        onClick={() => setMode('practice')}
      >
        <span className="mode-icon">📚</span>
        <h4>Practice Mode</h4>
        <p>No timer, review answers after each question</p>
      </div>
      
      <div 
        className={`mode-card ${mode === 'timed' ? 'active' : ''}`}
        onClick={() => setMode('timed')}
      >
        <span className="mode-icon">⏱️</span>
        <h4>Timed Challenge</h4>
        <p>Beat the clock, earn time bonuses</p>
      </div>
      
      <div 
        className={`mode-card ${mode === 'speedrun' ? 'active' : ''}`}
        onClick={() => setMode('speedrun')}
      >
        <span className="mode-icon">⚡</span>
        <h4>Speed Run</h4>
        <p>Race against time, maximum bonuses</p>
      </div>
    </div>
  </div>
  
  {/* Start Button */}
  <button 
    className="btn-start-quiz"
    style={{ background: category.color }}
    onClick={handleStartQuiz}
  >
    Start Quiz ({getQuestionCount(difficulty)} questions)
  </button>
</div>
```

---

#### **3. Category Stats**

```jsx
<div className="category-stats">
  <h2>Your Statistics</h2>
  
  <div className="stats-grid">
    <div className="stat-box">
      <span className="stat-value">{categoryProgress.completed}</span>
      <span className="stat-label">Questions Completed</span>
    </div>
    
    <div className="stat-box">
      <span className="stat-value">{categoryProgress.bestScore || '--'}</span>
      <span className="stat-label">Best Score</span>
    </div>
    
    <div className="stat-box">
      <span className="stat-value">{categoryProgress.avgScore || '--'}</span>
      <span className="stat-label">Average Score</span>
    </div>
    
    <div className="stat-box">
      <span className="stat-value">{categoryProgress.totalAttempts}</span>
      <span className="stat-label">Total Attempts</span>
    </div>
  </div>
</div>
```

---

### 🎯 **QUIZ SCREEN** (`/quiz/:categoryId`)

**Purpose:** Display questions, capture answers, track progress

---

#### **1. Quiz Header**

```jsx
<div className="quiz-header">
  {/* Left: Category Badge */}
  <div 
    className="category-badge"
    style={{ 
      background: category.color,
      boxShadow: `0 0 20px ${category.glow}`
    }}
  >
    <span>{category.icon}</span>
    <span>{category.name}</span>
  </div>
  
  {/* Center: Progress */}
  <div className="quiz-progress-text">
    Question {currentQuestion + 1} of {totalQuestions}
  </div>
  
  {/* Right: Score & Timer */}
  <div className="quiz-header-right">
    {mode !== 'practice' && (
      <div className={`timer ${timeRemaining < 10 ? 'urgent' : ''}`}>
        <TimerIcon />
        <span>{formatTime(timeRemaining)}</span>
      </div>
    )}
    
    <div className="current-score">
      <span className="score-label">Score</span>
      <span className="score-value">{score}</span>
    </div>
    
    <button 
      onClick={handleQuit}
      className="quit-button"
      title="Quit Quiz"
    >
      ✕
    </button>
  </div>
</div>
```

---

#### **2. Question Card**

```jsx
<div className="question-container">
  <div className="question-card">
    {/* Question Header */}
    <div className="question-header">
      <span className="question-number">
        Question {currentQuestion + 1}
      </span>
      <Badge difficulty={question.difficulty} />
    </div>
    
    {/* Question Text */}
    <h2 className="question-text">
      {question.question}
    </h2>
    
    {/* Code Snippet (if applicable) */}
    {question.code && (
      <div className="question-code">
        <SyntaxHighlighter 
          language="python"
          style={vscDarkPlus}
        >
          {question.code}
        </SyntaxHighlighter>
      </div>
    )}
    
    {/* Answer Options */}
    <div className="options-grid">
      {question.options.map((option, index) => (
        <div
          key={index}
          className={`answer-option ${
            selectedAnswer === index ? 'selected' : ''
          } ${
            answered && index === question.correctAnswer ? 'correct' : ''
          } ${
            answered && selectedAnswer === index && index !== question.correctAnswer ? 'wrong' : ''
          } ${
            removedOptions.includes(index) ? 'removed' : ''
          } ${
            answered ? 'disabled' : ''
          }`}
          onClick={() => !answered && !removedOptions.includes(index) && setSelectedAnswer(index)}
        >
          <div className="answer-option-letter">
            {String.fromCharCode(65 + index)}
          </div>
          <div className="answer-option-text">
            {option}
          </div>
          {answered && index === question.correctAnswer && (
            <span className="answer-check">✓</span>
          )}
          {answered && selectedAnswer === index && index !== question.correctAnswer && (
            <span className="answer-cross">✗</span>
          )}
        </div>
      ))}
    </div>
    
    {/* Feedback (shown after answer) */}
    {answered && (
      <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
        <div className="feedback-header">
          {isCorrect ? '✅ CORRECT!' : '❌ WRONG!'}
          {isCorrect && ` +${pointsEarned} points`}
        </div>
        
        {isCorrect && timeBonus > 0 && (
          <div className="feedback-bonus">
            ⚡ Speed Bonus: +{timeBonus}
          </div>
        )}
        
        {isCorrect && streakBonus > 0 && (
          <div className="feedback-bonus">
            🔥 Streak {currentStreak}! +{streakBonus}
          </div>
        )}
        
        {!isCorrect && (
          <div className="feedback-correct-answer">
            Correct answer: {question.options[question.correctAnswer]}
          </div>
        )}
        
        <div className="feedback-explanation">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      </div>
    )}
  </div>
</div>
```

---

#### **3. Quiz Controls**

```jsx
<div className="quiz-controls">
  {/* Hints */}
  <div className="hints-section">
    <button
      className="hint-button hint-fifty-fifty"
      onClick={useFiftyFifty}
      disabled={fiftyFiftyUsed >= 3 || answered}
    >
      <span>50/50</span>
      <span className="hint-count">{3 - fiftyFiftyUsed} left</span>
    </button>
    
    <button
      className="hint-button hint-skip"
      onClick={skipQuestion}
      disabled={skipsUsed >= 2 || answered}
    >
      <span>Skip</span>
      <span className="hint-count">{2 - skipsUsed} left</span>
    </button>
  </div>
  
  {/* Submit Button */}
  {!answered && (
    <button
      className="btn-submit-answer"
      onClick={handleSubmitAnswer}
      disabled={selectedAnswer === null}
    >
      Submit Answer
    </button>
  )}
</div>
```

---

#### **4. Progress Bar (Footer)**

```jsx
<div className="quiz-footer">
  <div className="progress-bar-container">
    <div 
      className="progress-bar-fill"
      style={{ 
        width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
        background: category.color
      }}
    />
  </div>
  <div className="progress-text">
    {currentQuestion + 1} / {totalQuestions} questions completed
  </div>
</div>
```

---

### ✅ **RESULTS SCREEN** (`/results/:categoryId/:quizId`)

**Purpose:** Show score, celebrate completion, review answers

---

#### **1. Celebration Animations**

```jsx
{/* Confetti (auto-triggers on mount) */}
<ConfettiCelebration percentage={percentage} />

{/* Trophy animation for perfect score */}
{percentage === 100 && (
  <motion.div
    className="trophy-animation"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", delay: 0.5 }}
  >
    🏆
  </motion.div>
)}
```

---

#### **2. Score Summary**

```jsx
<div className="results-summary">
  <h1>Quiz Complete! 🎉</h1>
  
  {/* Animated Score Count-Up */}
  <div className="score-display">
    <ScoreCountUp 
      finalScore={totalScore}
      maxScore={maxPossibleScore}
      duration={2000}
    />
  </div>
  
  {/* Progress Circle */}
  <div className="percentage-display">
    <ProgressCircle 
      percentage={percentage}
      color={category.color}
      size={200}
    />
  </div>
  
  {/* Performance Rating */}
  <div className={`performance-rating ${rating}`}>
    {rating === 'excellent' && '🌟 Outstanding! You\'re a coding master!'}
    {rating === 'good' && '🎯 Great job! Solid performance!'}
    {rating === 'fair' && '👍 Good effort! Keep practicing!'}
  </div>
  
  {/* Stats Grid */}
  <div className="results-stats-grid">
    <div className="result-stat">
      <span className="stat-icon">✓</span>
      <span className="stat-value">{correctCount}</span>
      <span className="stat-label">Correct</span>
    </div>
    
    <div className="result-stat">
      <span className="stat-icon">✗</span>
      <span className="stat-value">{wrongCount}</span>
      <span className="stat-label">Wrong</span>
    </div>
    
    <div className="result-stat">
      <span className="stat-icon">⏱️</span>
      <span className="stat-value">{formatTime(totalTime)}</span>
      <span className="stat-label">Time</span>
    </div>
    
    <div className="result-stat">
      <span className="stat-icon">🔥</span>
      <span className="stat-value">{maxStreak}</span>
      <span className="stat-label">Best Streak</span>
    </div>
  </div>
</div>
```

---

#### **3. Progress Update Animation**

```jsx
<ProgressUpdate
  oldProgress={oldProgress}
  newProgress={newProgress}
  category={category}
  questionsAdded={questionsCompleted}
/>

// Component renders:
// Before: 40% → After: 60%
// "+5 questions added to your progress!"
```

---

#### **4. Badge Unlock (if earned)**

```jsx
{newAchievements.length > 0 && (
  <BadgeUnlockModal
    badge={ACHIEVEMENTS[newAchievements[0]]}
    onClose={() => setShowBadge(false)}
  />
)}

// Shows full-screen modal with:
// - Spotlight effect
// - Badge zoom animation
// - "Achievement Unlocked!" text
// - Badge name and description
// - Particle effects
```

---

#### **5. Question Review**

```jsx
<div className="question-review">
  <h2>Review Your Answers</h2>
  
  {questions.map((question, index) => {
    const answer = userAnswers[index];
    const isCorrect = answer.correct;
    
    return (
      <div 
        key={question.id}
        className={`review-item ${isCorrect ? 'correct' : 'wrong'}`}
      >
        {/* Header */}
        <div className="review-header">
          <span>Question {index + 1}</span>
          <Badge className={isCorrect ? 'success' : 'error'}>
            {isCorrect ? '✓ Correct' : '✗ Wrong'}
          </Badge>
        </div>
        
        {/* Question */}
        <p className="review-question">{question.question}</p>
        
        {/* Code if applicable */}
        {question.code && (
          <SyntaxHighlighter language="python">
            {question.code}
          </SyntaxHighlighter>
        )}
        
        {/* Answers */}
        <div className="review-answers">
          <div className="review-answer-row">
            <strong>Your Answer:</strong>
            <span className={isCorrect ? 'correct-text' : 'wrong-text'}>
              {answer.userAnswer >= 0 
                ? question.options[answer.userAnswer] 
                : 'Skipped'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="review-answer-row">
              <strong>Correct Answer:</strong>
              <span className="correct-text">
                {question.options[question.correctAnswer]}
              </span>
            </div>
          )}
        </div>
        
        {/* Explanation */}
        <div className="review-explanation">
          <strong>Explanation:</strong>
          <p>{question.explanation}</p>
        </div>
      </div>
    );
  })}
</div>
```

---

#### **6. Result Actions**

```jsx
<div className="result-actions">
  <button 
    onClick={() => navigate('/')}
    className="btn-primary"
  >
    🏠 Return to Dashboard
  </button>
  
  <button 
    onClick={retryQuiz}
    className="btn-secondary"
  >
    🔄 Retry Same Quiz
  </button>
  
  <button 
    onClick={() => navigate('/category/' + category.id)}
    className="btn-secondary"
  >
    🎯 Configure New Quiz
  </button>
  
  <button 
    onClick={shareResults}
    className="btn-outline"
  >
    📤 Share Results
  </button>
</div>
```

---

### 🏆 **ACHIEVEMENTS PAGE** (`/achievements`)

**Purpose:** Display all achievements, locked/unlocked status

---

```jsx
<div className="achievements-page">
  <h1>Your Achievements</h1>
  <p className="achievements-subtitle">
    Unlock all 10 badges to become a Grand Master
  </p>
  
  {/* Progress */}
  <div className="achievements-progress">
    <div className="progress-bar-container">
      <div 
        className="progress-bar-fill"
        style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
      />
    </div>
    <span>{unlockedCount} / {totalCount} unlocked</span>
  </div>
  
  {/* Achievements Grid */}
  <div className="achievements-grid">
    {Object.values(ACHIEVEMENTS).map(achievement => {
      const unlocked = hasAchievement(achievement.id);
      
      return (
        <div 
          key={achievement.id}
          className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
        >
          <div className="achievement-icon">
            {unlocked ? achievement.icon : '🔒'}
          </div>
          
          <h3 className="achievement-name">
            {achievement.name}
          </h3>
          
          <p className="achievement-description">
            {achievement.description}
          </p>
          
          {unlocked && (
            <span className="unlocked-date">
              Unlocked {formatDate(getUnlockDate(achievement.id))}
            </span>
          )}
          
          {!unlocked && (
            <div className="unlock-progress">
              {getUnlockProgress(achievement)}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
```

---

## 🧩 **GLOBAL COMPONENTS**

### **Navbar**

```jsx
<nav className="navbar">
  <div className="container">
    <div className="nav-content">
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <span className="logo-icon">🎯</span>
        <span className="logo-text">CodeQuest</span>
      </Link>
      
      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/achievements" className="nav-link">
          Achievements
        </NavLink>
      </div>
    </div>
  </div>
</nav>
```

---

## 📊 STATE MANAGEMENT STRUCTURE

```javascript
// Using Zustand
const useQuizStore = create((set, get) => ({
  // User Progress
  categoryProgress: {
    python: { completed: 0, bestScore: 0, avgScore: 0, totalAttempts: 0 },
    webdev: { completed: 0, bestScore: 0, avgScore: 0, totalAttempts: 0 },
    cybersecurity: { completed: 0, bestScore: 0, avgScore: 0, totalAttempts: 0 },
    aiml: { completed: 0, bestScore: 0, avgScore: 0, totalAttempts: 0 },
    networking: { completed: 0, bestScore: 0, avgScore: 0, totalAttempts: 0 }
  },
  
  // Current Quiz State
  currentQuiz: {
    category: null,
    difficulty: 'medium',
    mode: 'timed',
    questions: [],
    currentQuestion: 0,
    score: 0,
    streak: 0,
    userAnswers: [],
    fiftyFiftyUsed: 0,
    skipsUsed: 0,
    startTime: null,
    timeRemaining: 600
  },
  
  // Achievements
  achievements: [],
  
  // Actions
  startQuiz: (category, difficulty, mode) => { /* ... */ },
  answerQuestion: (selectedIndex) => { /* ... */ },
  nextQuestion: () => { /* ... */ },
  endQuiz: () => { /* ... */ },
  updateProgress: (category, results) => { /* ... */ },
  unlockAchievement: (achievementId) => { /* ... */ }
}));
```

---

## 🔄 NAVIGATION FLOW

```
User Journey:

1. Land on Dashboard
   ↓
2. Click Category Card
   ↓
3. Category Detail Page
   ↓
4. Select Difficulty & Mode
   ↓
5. Click "Start Quiz"
   ↓
6. Quiz Screen (answer questions)
   ↓
7. Results Screen (celebration!)
   ↓
8. Options:
   - Return to Dashboard (see updated progress)
   - Retry Quiz
   - Try Another Category
   - View Achievements
```

---

## 📱 RESPONSIVE BEHAVIOR

### **Dashboard**
- Desktop: 3-column category grid
- Tablet: 2-column category grid
- Mobile: 1-column category grid

### **Quiz Screen**
- Desktop: 2x2 answer options grid
- Mobile: Stacked answer options (1 column)

### **Results**
- Desktop: Side-by-side score summary & stats
- Mobile: Stacked vertically

---

## ✅ ARCHITECTURE CHECKLIST

**Every page must have:**
- [ ] Proper routing (React Router)
- [ ] Page title (document.title)
- [ ] Loading state (while fetching data)
- [ ] Error state (if data fails to load)
- [ ] Empty state (if no data available)
- [ ] Mobile-responsive layout
- [ ] Smooth page transitions
- [ ] Accessibility (ARIA labels, keyboard nav)

---

**Architecture Version:** 1.0  
**Total Pages:** 5  
**Total Components:** 30+  
**Total Routes:** 5 main routes
