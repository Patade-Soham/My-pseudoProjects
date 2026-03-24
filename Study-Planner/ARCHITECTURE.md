# Smart Study Planner — Architecture Document

**Version:** 1.0  
**Stack:** React + Vite + Tailwind + Framer Motion + Zustand + Gemini API  

---

## 1. Tech Stack Decisions

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React + Vite | Fast dev server, hot reload, competition-ready |
| Styling | Tailwind CSS | Utility-first, no custom config needed, fast to write |
| Animation | Framer Motion | Best-in-class page transitions + stagger animations |
| State | Zustand | Simpler than Redux, no boilerplate, easy persistence |
| Storage | localStorage | No DB needed, browser-native, works offline |
| AI | Gemini API (gemini-2.0-flash) | Free tier available, fast responses, good reasoning |
| Routing | None (currentPage state) | Simpler, no install needed, full control |

---

## 2. File Structure

```
smart-study-planner/
│
├── config.js                          ← API key + app constants (root level)
├── index.html                         ← Vite entry HTML
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── PRD.md                             ← Product requirements
├── ARCHITECTURE.md                    ← This file
├── PROMPTS.md                         ← All build prompts in order
│
└── src/
    ├── main.jsx                       ← App entry point
    ├── App.jsx                        ← Page router (currentPage switch)
    │
    ├── pages/
    │   ├── Onboarding.jsx             ← Page 1: Subject input
    │   ├── Dashboard.jsx              ← Page 2: Main hub
    │   ├── DailyPlan.jsx              ← Page 3: Full schedule
    │   ├── Progress.jsx               ← Page 4: Session history
    │   └── AIBrief.jsx                ← Page 5: Gemini coach
    │
    ├── components/
    │   ├── Navbar.jsx                 ← Desktop top nav
    │   ├── BottomNav.jsx              ← Mobile bottom tab bar
    │   ├── SubjectCard.jsx            ← Subject row in onboarding
    │   ├── StudyBlock.jsx             ← Session block in timeline
    │   ├── AtRiskBadge.jsx            ← Pulsing red badge
    │   ├── ProgressBar.jsx            ← Animated fill bar
    │   └── LoadingSkeleton.jsx        ← Shimmer placeholder
    │
    ├── logic/                         ← Pure functions, no React
    │   ├── priorityEngine.js          ← Score calculator + ranker
    │   ├── slotFiller.js              ← Day plan generator
    │   ├── atRiskDetector.js          ← At-risk subject detection
    │   └── replanner.js               ← Missed session rebuilder
    │
    ├── services/
    │   └── geminiService.js           ← All Gemini API calls
    │
    ├── store/
    │   └── useStudyStore.js           ← Zustand global state
    │
    └── styles/
        ├── globals.css                ← CSS variables + reset
        └── animations.css             ← Keyframe definitions
```

---

## 3. State Shape (Zustand)

```js
{
  // Core data
  subjects: [],          // {id, name, difficulty, hours, score}
  plan: [],              // [{day, sessions: [{id, subject, duration, type, done, missed}]}]
  progress: [],          // [{subjectName, date, duration, completed}]
  atRisk: [],            // string[] — subject names flagged as at-risk

  // UI state
  currentPage: "onboarding",   // controls which page renders
  currentDay: 1,               // which day of the plan is active

  // AI state
  aiBrief: "",                 // Gemini morning brief text
  briefLoading: false,         // skeleton shown while fetching
  briefTimestamp: null,        // when brief was last fetched

  // Actions
  setSubjects, setPlan, setProgress, setAtRisk,
  setCurrentPage, setCurrentDay,
  setAiBrief, setBriefLoading, setBriefTimestamp,
  loadFromStorage,             // called on app init
  saveToStorage,               // called on every state change
  clearAll                     // reset everything + clear localStorage
}
```

---

## 4. Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INPUT                              │
│              (Onboarding — subjects array)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   LOGIC LAYER                                 │
│                                                              │
│  priorityEngine.js                                           │
│    calculateScore(subject) → score                           │
│    rankSubjects(subjects) → sorted array                     │
│                    │                                         │
│                    ▼                                         │
│  slotFiller.js                                               │
│    generatePlan(ranked, dailyHours, breakAfter) → plan[]     │
│                    │                                         │
│  atRiskDetector.js │                                         │
│    detectAtRisk(subjects, progress) → atRisk[]               │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   ZUSTAND STORE                               │
│         subjects, plan, progress, atRisk, aiBrief            │
│                    │                                         │
│                    ▼                                         │
│              localStorage (auto-sync)                        │
└──────────────────────────┬───────────────────────────────────┘
                           │
              ┌────────────┴───────────┐
              ▼                        ▼
┌─────────────────────┐    ┌──────────────────────┐
│   PAGES / UI         │    │   GEMINI SERVICE      │
│                     │    │                      │
│ Dashboard           │    │ generateMorningBrief  │
│ DailyPlan           │◄───│ generateSubjectTip    │
│ Progress            │    │                      │
│ AIBrief             │    │ ← called from pages  │
└─────────────────────┘    └──────────────────────┘
```

### Missed Session Flow
```
User clicks "Missed" on a session
        │
        ▼
Mark session.missed = true in plan
Add {completed: false} entry to progress[]
        │
        ▼
replanner.js
  calculateRemainingHours per subject
  filter out completed subjects
  re-run rankSubjects + generatePlan
        │
        ▼
New plan saved to store + localStorage
Dashboard re-renders with new plan
```

---

## 5. Page Navigation Flow

```
[Onboarding]
     │
     │ "Generate Plan" clicked
     ▼
[Dashboard]  ←──────────────────────────┐
     │                                  │
     ├──→ "View Full Schedule"          │
     │         [DailyPlan]              │
     │                                  │
     ├──→ "View Progress"               │
     │         [Progress]               │
     │                                  │
     └──→ "AI Coach"              Replan triggers
              [AIBrief] ──────────────→─┘
```

All navigation: `setCurrentPage("pageName")` in Zustand.  
All transitions: Framer Motion AnimatePresence (slide left/right).

---

## 6. Gemini API Integration

```
src/services/geminiService.js

Endpoint:
  POST https://generativelanguage.googleapis.com/v1beta/models/
       gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}

Request body:
  {
    contents: [{
      parts: [{ text: "<dynamic prompt>" }]
    }]
  }

Response parse:
  data.candidates[0].content.parts[0].text

Error handling:
  try/catch → return fallback string (never throw to UI)

Functions:
  generateMorningBrief(subjects, atRisk, currentDay) → string
  generateSubjectTip(subjectName, difficulty) → string
```

**Prompt template for Morning Brief:**
```
You are an encouraging, smart study coach.
Today is Day {currentDay} of their study plan.

Subjects by priority:
{subjects.map(s => `${s.name} — score ${s.score} — difficulty ${s.difficulty}/10 — ${s.hours}hrs`)}

At-risk subjects: {atRisk.join(', ') || 'None'}

Respond in EXACTLY this format (4 lines only):
🎯 FOCUS TODAY: [subject + 1-sentence reason]
💡 SMART TIP: [specific technique for hardest subject]
⚡ MOTIVATION: [original, powerful, non-cliche line]
⚠️ WATCH OUT: [at-risk warning or general advice]
```

---

## 7. localStorage Strategy

```
Key              │ Value              │ Updated when
─────────────────┼────────────────────┼──────────────────────
ssp_subjects     │ JSON subjects[]    │ subjects state changes
ssp_plan         │ JSON plan[]        │ plan state changes
ssp_progress     │ JSON progress[]    │ progress state changes
ssp_atRisk       │ JSON string[]      │ atRisk state changes
ssp_currentDay   │ number string      │ currentDay changes
```

**Pattern:** Zustand `subscribe()` on each field → calls `saveToStorage()`.  
**On init:** `loadFromStorage()` called in `App.jsx` useEffect once.  
**On reset:** `clearAll()` removes all `ssp_*` keys + resets store to defaults.

---

## 8. Animation Architecture

### Page Transitions (Framer Motion)
```js
const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -60 }
}
const pageTransition = { duration: 0.3, ease: "easeInOut" }
```

Exception: AIBrief page slides UP from bottom (y: 60 → 0).

### Stagger Children
```js
const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}
```

### Special Animations
| Element | Animation |
|---------|-----------|
| At-risk badge | Continuous pulse (CSS keyframe) |
| Score badges | Count up from 0 on mount |
| Progress bars | Width 0 → final on mount |
| Stat numbers | Count up (700ms) |
| Done button | Green flash + scale |
| Missed button | Red shake |
| Row add | Fade up |
| Row delete | Shrink + fade |
| Day complete | CSS confetti burst |

---

## 9. CSS Variables (Dark Theme)

```css
:root {
  --bg-primary:    #0f1117;
  --bg-secondary:  #1a1d27;
  --bg-card:       #1e2130;
  --bg-hover:      #252839;

  --accent-blue:   #3b82f6;
  --accent-purple: #8b5cf6;
  --accent-amber:  #f59e0b;
  --accent-red:    #ef4444;
  --accent-green:  #22c55e;

  --text-primary:  #f1f5f9;
  --text-muted:    #64748b;
  --text-subtle:   #334155;

  --border:        #2d3347;
  --border-hover:  #3d4563;

  --gradient-brand: linear-gradient(135deg, #3b82f6, #8b5cf6);
}
```

---

## 10. Component Responsibilities

| Component | Reads from store | Writes to store |
|-----------|-----------------|-----------------|
| Onboarding | — | subjects, plan, atRisk, currentPage |
| Dashboard | subjects, plan, progress, atRisk, aiBrief | progress, plan, atRisk, currentDay, currentPage |
| DailyPlan | plan, progress, currentDay | — (read-only view) |
| Progress | subjects, progress, atRisk | progress (reset), currentPage |
| AIBrief | subjects, atRisk, aiBrief, currentDay | aiBrief, plan (replan), currentPage |
| Navbar | currentPage | currentPage |
| BottomNav | currentPage | currentPage |

---

## 11. Priority Formula Reference

```
score = (difficulty × 0.7) + ((1 / hours) × 3)

Examples:
  Mathematics: difficulty=9, hours=4  → (9×0.7) + (1/4×3) = 6.3 + 0.75 = 7.05
  Physics:     difficulty=8, hours=3  → (8×0.7) + (1/3×3) = 5.6 + 1.0  = 6.60
  History:     difficulty=4, hours=2  → (4×0.7) + (1/2×3) = 2.8 + 1.5  = 4.30
  English:     difficulty=3, hours=1.5→ (3×0.7) + (1/1.5×3)= 2.1 + 2.0 = 4.10

Insight: Short subjects get a boost from the (1/hours) term,
         capturing urgency even at lower difficulty.
```

---

## 12. Edge Cases to Handle

| Case | Handling |
|------|---------|
| 0 subjects | Disable generate button, show prompt |
| Subject hours = 0 | Filter out before plan generation |
| All sessions done | Show Day Complete screen, increment day |
| Day exceeds plan length | Show "Plan Complete 🎉" screen |
| Gemini API key missing | Show setup card, not an error |
| Gemini API fails | Return fallback string silently |
| localStorage unavailable | Graceful degradation to in-memory only |
| All subjects completed | Show completion screen, offer replan |
| Single subject | Valid — plan generates normally |

---

## 13. MCP Servers

**Turn OFF all MCP servers in Antigravity.**  
MCP is for Claude tool use. This app uses Gemini API directly via `fetch()`.  
No MCP, no backend proxy, no external services except Gemini API.

---

## 14. External Dependencies (What You Need)

| Dependency | Where to get | Where it goes |
|-----------|-------------|---------------|
| Gemini API Key | aistudio.google.com → Get API Key | `config.js` → GEMINI_API_KEY |
| Node.js | Pre-installed | — |
| npm packages | `npm install` | auto |

**npm packages to install:**
```
npm install react react-dom
npm install framer-motion
npm install zustand
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**No database. No server to start. One terminal command:**
```
npm run dev
```
