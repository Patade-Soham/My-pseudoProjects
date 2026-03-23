# 🎨 MULTI-CATEGORY QUIZ - DESIGN SYSTEM
## Complete Visual Identity & Component Library

---

## 🎯 DESIGN PHILOSOPHY

**Core Concept:** "Modern Code Editor meets Gaming Interface"

**Inspiration:**
- VS Code dark theme (professional, developer-friendly)
- Gaming UIs (engaging, rewarding)
- Quiz apps like Kahoot (fun, colorful)
- Educational platforms (clean, accessible)

**Mood Keywords:**
- Professional
- Engaging
- Rewarding
- Modern
- Accessible

---

## 🎨 COLOR SYSTEM

### **Base Colors**

```css
/* Backgrounds */
--bg-primary: #1a1d29;        /* Main background */
--bg-secondary: #22252f;      /* Card backgrounds */
--bg-elevated: #2a2d3a;       /* Elevated elements (buttons, inputs) */
--bg-hover: #32353f;          /* Hover states */

/* Text */
--text-primary: #e8eaed;      /* Main text */
--text-secondary: #9ca3af;    /* Secondary text */
--text-muted: #6b7280;        /* Muted text, labels */

/* Borders */
--border-default: rgba(255, 255, 255, 0.1);
--border-focus: rgba(255, 255, 255, 0.2);
```

---

### **Category Colors** (The Key Differentiator!)

```css
/* Python */
--python-primary: #3776AB;
--python-light: #4B8BBF;
--python-glow: rgba(55, 118, 171, 0.3);

/* Web Development */
--webdev-primary: #E34F26;
--webdev-light: #F16529;
--webdev-glow: rgba(227, 79, 38, 0.3);

/* Cybersecurity */
--security-primary: #FF0000;
--security-light: #FF3333;
--security-glow: rgba(255, 0, 0, 0.3);

/* AI & Machine Learning */
--ai-primary: #FF6F00;
--ai-light: #FF8F00;
--ai-glow: rgba(255, 111, 0, 0.3);

/* Networking */
--network-primary: #0078D4;
--network-light: #1E90FF;
--network-glow: rgba(0, 120, 212, 0.3);
```

**Usage:**
```css
.category-card.python {
  border-color: var(--python-primary);
}

.category-card.python:hover {
  box-shadow: 0 10px 40px var(--python-glow);
}

.progress-circle.python {
  stroke: var(--python-primary);
}
```

---

### **Semantic Colors**

```css
/* Feedback Colors */
--success: #00ff88;           /* Correct answers */
--success-bg: rgba(0, 255, 136, 0.1);
--success-border: rgba(0, 255, 136, 0.3);

--error: #ff3864;             /* Wrong answers */
--error-bg: rgba(255, 56, 100, 0.1);
--error-border: rgba(255, 56, 100, 0.3);

--warning: #ffd000;           /* Warnings, low time */
--warning-bg: rgba(255, 208, 0, 0.1);
--warning-border: rgba(255, 208, 0, 0.3);

--info: #00d4ff;              /* Info messages */
--info-bg: rgba(0, 212, 255, 0.1);
--info-border: rgba(0, 212, 255, 0.3);
```

---

### **Gradient System**

```css
/* Category Gradients */
--gradient-python: linear-gradient(135deg, #3776AB 0%, #4B8BBF 100%);
--gradient-webdev: linear-gradient(135deg, #E34F26 0%, #F16529 100%);
--gradient-security: linear-gradient(135deg, #FF0000 0%, #FF3333 100%);
--gradient-ai: linear-gradient(135deg, #FF6F00 0%, #FF8F00 100%);
--gradient-network: linear-gradient(135deg, #0078D4 0%, #1E90FF 100%);

/* Functional Gradients */
--gradient-success: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
--gradient-premium: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);

/* Background Mesh (for overlays) */
--gradient-mesh: radial-gradient(circle at 20% 30%, rgba(55, 118, 171, 0.15), transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(227, 79, 38, 0.12), transparent 50%);
```

---

## 📝 TYPOGRAPHY

### **Font Families**

```css
/* Primary Font - Inter (Clean, Modern, Professional) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Monospace - Fira Code (For code snippets) */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');

/* Accent Font - Poppins (For headings, bold statements) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');

--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-heading: 'Poppins', sans-serif;
--font-code: 'Fira Code', monospace;
```

---

### **Type Scale**

```css
/* Desktop Scale */
--text-9xl: 72px;     /* Hero headlines */
--text-8xl: 60px;     
--text-7xl: 48px;     /* Page titles */
--text-6xl: 36px;     /* Section headers */
--text-5xl: 30px;     
--text-4xl: 24px;     /* Card titles */
--text-3xl: 20px;     /* Question numbers */
--text-2xl: 18px;     
--text-xl: 16px;      /* Body large */
--text-base: 14px;    /* Body default */
--text-sm: 12px;      /* Captions, labels */
--text-xs: 10px;      /* Tiny text */

/* Mobile Scale (reduce by 30-40%) */
--text-9xl-mobile: 40px;
--text-7xl-mobile: 32px;
--text-6xl-mobile: 24px;
--text-4xl-mobile: 20px;
--text-base-mobile: 14px;
```

---

### **Typography Styles**

```css
/* Headings */
.heading-hero {
  font-family: var(--font-heading);
  font-size: var(--text-9xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-page {
  font-family: var(--font-heading);
  font-size: var(--text-7xl);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
}

.heading-section {
  font-family: var(--font-heading);
  font-size: var(--text-6xl);
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
}

.heading-card {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.body-large {
  font-family: var(--font-primary);
  font-size: var(--text-xl);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body-default {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-secondary);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-muted);
}

/* Special Text */
.text-code {
  font-family: var(--font-code);
  font-size: var(--text-sm);
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
  color: #ff6bcb;
}

.text-score {
  font-family: var(--font-heading);
  font-size: var(--text-9xl);
  font-weight: 800;
  background: var(--gradient-success);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 📏 SPACING SYSTEM

```css
/* Base: 4px */
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;

/* Component Spacing */
--spacing-card-padding: var(--space-6);
--spacing-section: var(--space-20);
--spacing-element-gap: var(--space-4);
```

**Usage:**
```css
.section {
  padding: var(--spacing-section) 0;
}

.card {
  padding: var(--spacing-card-padding);
  gap: var(--spacing-element-gap);
}
```

---

## 🎭 COMPONENT LIBRARY

### **1. BUTTONS**

#### **Primary Button**
```css
.btn-primary {
  background: var(--gradient-success);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 255, 136, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### **Secondary Button**
```css
.btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  padding: 14px 28px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border-default);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-focus);
}
```

#### **Category Button** (Dynamic color based on category)
```css
.btn-category {
  background: transparent;
  color: var(--category-color);
  padding: 14px 28px;
  border-radius: 12px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  border: 2px solid var(--category-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-category:hover {
  background: var(--category-color);
  color: white;
  box-shadow: 0 0 20px var(--category-glow);
}

/* Usage with inline styles */
<button 
  className="btn-category"
  style={{ 
    '--category-color': category.color,
    '--category-glow': category.glow 
  }}
>
  Start Quiz
</button>
```

#### **Icon Button**
```css
.btn-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: var(--bg-hover);
  transform: scale(1.1);
}
```

---

### **2. CARDS**

#### **Category Card**
```css
.category-card {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: var(--space-8);
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-8px);
  border-color: var(--category-color);
  box-shadow: 0 20px 40px var(--category-glow);
}

/* Glow effect on hover */
.category-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--category-color), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}

.category-card:hover::before {
  opacity: 0.1;
}

/* Icon */
.category-card-icon {
  font-size: 60px;
  text-align: center;
  margin-bottom: var(--space-4);
  transition: transform 0.4s;
}

.category-card:hover .category-card-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Title */
.category-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

/* Progress Section */
.category-card-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-6);
}

/* Stats */
.category-card-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.stat-value {
  font-weight: 600;
  color: var(--text-primary);
}
```

#### **Question Card**
```css
.question-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: var(--space-8);
  border: 1px solid var(--border-default);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.question-number {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
}

.question-text {
  font-size: var(--text-xl);
  font-weight: 500;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

/* Code Block */
.question-code {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: var(--space-4);
  margin: var(--space-6) 0;
  overflow-x: auto;
}
```

#### **Answer Option Card**
```css
.answer-option {
  background: var(--bg-elevated);
  border: 2px solid var(--border-default);
  border-radius: 12px;
  padding: var(--space-4) var(--space-6);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.answer-option:hover {
  background: var(--bg-hover);
  border-color: var(--border-focus);
  transform: translateX(4px);
}

.answer-option.selected {
  background: rgba(0, 212, 255, 0.1);
  border-color: var(--info);
}

.answer-option.correct {
  background: var(--success-bg);
  border-color: var(--success);
}

.answer-option.wrong {
  background: var(--error-bg);
  border-color: var(--error);
}

.answer-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.answer-option-letter {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-base);
}

.answer-option.selected .answer-option-letter {
  background: var(--info);
  color: white;
}

.answer-option-text {
  flex: 1;
  font-size: var(--text-base);
  color: var(--text-primary);
}
```

---

### **3. BADGES**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-family: var(--font-code);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Difficulty Badges */
.badge-easy {
  background: rgba(0, 255, 136, 0.15);
  color: var(--success);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.badge-medium {
  background: rgba(255, 208, 0, 0.15);
  color: var(--warning);
  border: 1px solid rgba(255, 208, 0, 0.3);
}

.badge-hard {
  background: rgba(255, 56, 100, 0.15);
  color: var(--error);
  border: 1px solid rgba(255, 56, 100, 0.3);
}

/* Category Badges */
.badge-category {
  background: var(--category-bg);
  color: var(--category-color);
  border: 1px solid var(--category-border);
}

/* Status Badges */
.badge-correct {
  background: var(--success-bg);
  color: var(--success);
  border: 1px solid var(--success-border);
}

.badge-wrong {
  background: var(--error-bg);
  color: var(--error);
  border: 1px solid var(--error-border);
}

/* Achievement Badge (Special) */
.badge-achievement {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: var(--text-sm);
}
```

---

### **4. PROGRESS INDICATORS**

#### **Progress Bar**
```css
.progress-bar-container {
  width: 100%;
  height: 8px;
  background: var(--bg-elevated);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--gradient-success);
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Category-specific */
.progress-bar-fill.python {
  background: var(--gradient-python);
}

.progress-bar-fill.webdev {
  background: var(--gradient-webdev);
}

/* And so on... */
```

#### **Circular Progress**
```css
/* Using react-circular-progressbar */
.circular-progress {
  width: 150px;
  height: 150px;
}

.circular-progress .CircularProgressbar-path {
  stroke: var(--category-color);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.circular-progress .CircularProgressbar-trail {
  stroke: var(--bg-elevated);
}

.circular-progress .CircularProgressbar-text {
  fill: var(--category-color);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 24px;
}
```

---

### **5. TIMER DISPLAY**

```css
.timer {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-elevated);
  border-radius: 12px;
  border: 1px solid var(--border-default);
  transition: all 0.3s ease;
}

.timer-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.timer-text {
  font-family: var(--font-code);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
}

/* Urgent state (< 10 seconds) */
.timer.urgent {
  background: var(--error-bg);
  border-color: var(--error);
  animation: timerPulse 1s infinite;
}

.timer.urgent .timer-icon,
.timer.urgent .timer-text {
  color: var(--error);
}

@keyframes timerPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}
```

---

### **6. FEEDBACK MESSAGES**

```css
.feedback {
  padding: var(--space-4);
  border-radius: 12px;
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.feedback.correct {
  background: var(--success-bg);
  border: 2px solid var(--success);
}

.feedback.wrong {
  background: var(--error-bg);
  border: 2px solid var(--error);
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
}

.feedback.correct .feedback-header {
  color: var(--success);
}

.feedback.wrong .feedback-header {
  color: var(--error);
}

.feedback-bonus {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.feedback-explanation {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-default);
}
```

---

### **7. HINTS BUTTONS**

```css
.hint-button {
  padding: var(--space-3) var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.hint-button:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--info);
  transform: translateY(-2px);
}

.hint-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.hint-count {
  background: var(--bg-primary);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: var(--text-xs);
  color: var(--text-muted);
}

/* 50/50 specific */
.hint-fifty-fifty {
  border-color: rgba(255, 208, 0, 0.3);
}

.hint-fifty-fifty:hover:not(:disabled) {
  border-color: var(--warning);
  box-shadow: 0 0 15px rgba(255, 208, 0, 0.2);
}

/* Skip specific */
.hint-skip {
  border-color: rgba(0, 212, 255, 0.3);
}

.hint-skip:hover:not(:disabled) {
  border-color: var(--info);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
}
```

---

### **8. ACHIEVEMENT CARDS**

```css
.achievement-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: var(--space-6);
  border: 2px solid var(--border-default);
  text-align: center;
  transition: all 0.3s ease;
}

.achievement-card.unlocked {
  border-color: var(--success);
  background: linear-gradient(135deg, 
    var(--bg-secondary) 0%, 
    rgba(0, 255, 136, 0.05) 100%
  );
}

.achievement-card.locked {
  opacity: 0.5;
}

.achievement-icon {
  font-size: 48px;
  margin-bottom: var(--space-3);
}

.achievement-card.locked .achievement-icon {
  filter: grayscale(100%);
}

.achievement-name {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.achievement-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.achievement-unlocked-date {
  font-size: var(--text-xs);
  color: var(--success);
  margin-top: var(--space-2);
}
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints**

```css
/* Mobile First Approach */
--breakpoint-xs: 375px;   /* Small phone */
--breakpoint-sm: 640px;   /* Large phone */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### **Grid Layouts**

```css
/* Category Grid */
.category-grid {
  display: grid;
  gap: var(--space-6);
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 2 columns */
@media (min-width: 768px) and (max-width: 1023px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Answer Options Grid */
.options-grid {
  display: grid;
  gap: var(--space-4);
}

@media (max-width: 767px) {
  .options-grid {
    grid-template-columns: 1fr; /* Stack vertically */
  }
}

@media (min-width: 768px) {
  .options-grid {
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid */
  }
}
```

---

## ✨ ANIMATION TOKENS

```css
/* Durations */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;

/* Easing */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);

/* Usage */
.card {
  transition: transform var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth);
}
```

---

## 🎯 ACCESSIBILITY

### **Focus States**

```css
*:focus-visible {
  outline: 2px solid var(--info);
  outline-offset: 2px;
}

button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.3);
}
```

### **Color Contrast**

All text meets WCAG AA standards:
- Primary text on dark background: 14:1 ratio
- Secondary text on dark background: 7:1 ratio
- Interactive elements have clear visual feedback

### **Reduced Motion**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📦 LAYOUT UTILITIES

```css
/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}

/* Flexbox Utilities */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* Spacing Utilities */
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

.mt-4 { margin-top: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
```

---

## ✅ DESIGN CHECKLIST

Before implementing any component:

- [ ] Uses design system colors (category colors where applicable)
- [ ] Follows spacing scale (multiples of 4px)
- [ ] Typography hierarchy correct (heading vs body)
- [ ] Has hover state (interactive elements)
- [ ] Has focus state (keyboard accessibility)
- [ ] Has disabled state (when applicable)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animation smooth (60fps)
- [ ] Meets WCAG AA contrast standards
- [ ] Category-specific styling applied

---

## 🎨 CATEGORY STYLING QUICK REFERENCE

```javascript
// In components, apply category-specific styles:
const categoryStyles = {
  python: {
    color: '#3776AB',
    gradient: 'linear-gradient(135deg, #3776AB 0%, #4B8BBF 100%)',
    glow: 'rgba(55, 118, 171, 0.3)'
  },
  webdev: {
    color: '#E34F26',
    gradient: 'linear-gradient(135deg, #E34F26 0%, #F16529 100%)',
    glow: 'rgba(227, 79, 38, 0.3)'
  },
  // ... etc
};

// Usage
<div 
  className="category-card"
  style={{
    borderColor: categoryStyles[category].color,
    boxShadow: `0 20px 40px ${categoryStyles[category].glow}`
  }}
>
```

---

**Design System Version:** 1.0  
**Last Updated:** March 2026  
**Total Components:** 15+  
**Color Variables:** 50+  
**Typography Styles:** 12+
