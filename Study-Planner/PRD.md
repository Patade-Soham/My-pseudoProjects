# Smart Study Planner — Product Requirements Document (PRD)

**Version:** 1.0  
**Platform:** Antigravity (React + Vite, Browser-only)  
**AI Layer:** Google Gemini API (gemini-2.0-flash)  
**Date:** 2026  

---

## 1. Problem Statement

Students waste study time on the wrong subjects. They study what feels comfortable rather than what needs the most attention. There is no system that combines subject difficulty, remaining time, and recent study history to generate a personalized, adaptive plan.

**Core Pain:** A student with 5 subjects and 3 exam days has no smart way to decide what to study first, for how long, and when to take breaks.

---

## 2. Goal

Build a browser-based Smart Study Planner that:
- Ranks subjects by urgency using a priority algorithm
- Generates a multi-day, Pomodoro-style study schedule
- Detects neglected subjects and flags them as At Risk
- Uses Gemini AI to deliver personalized daily coaching briefs
- Replans automatically when sessions are missed
- Persists all data in localStorage (no backend, no login)

---

## 3. Target Users

- College and school students preparing for exams
- Students managing 3–10 subjects simultaneously
- Users who want structure without complexity

---

## 4. Pages (Multi-Page App)

| Page | Route Key | Purpose |
|------|-----------|---------|
| Onboarding | `onboarding` | Add subjects with difficulty + hours |
| Dashboard | `dashboard` | Today's plan, rankings, AI brief |
| Daily Plan | `plan` | Full multi-day schedule timeline |
| Progress | `progress` | Session log, streaks, completion stats |
| AI Brief | `brief` | Full-screen Gemini coaching panel |

Navigation is handled via a `currentPage` state in Zustand (no router library).

---

## 5. Core Features

### 5.1 Subject Input
- User adds N subjects (minimum 2)
- Each subject has: Name, Difficulty (1–10 slider), Hours Required (number)
- Subjects can be added/deleted dynamically
- Validation: name not empty, hours > 0, min 2 subjects to generate plan

### 5.2 Priority Engine
**Formula (never changes):**
```
score = (difficulty × 0.7) + ((1 / hours) × 3)
```
- High difficulty + fewer hours = higher urgency score
- Subjects ranked descending by score
- Score displayed as color-coded badge (green < 4, amber 4–6, red > 6)

### 5.3 Schedule Generator
- Greedy slot-filling algorithm
- Daily cap: 6 hours of study (configurable in config.js)
- Session max before break: 1.5 hours
- Break duration: 15 minutes (0.25h)
- Subjects split across days if hours exceed daily cap
- Output: array of Day objects with sessions

### 5.4 At-Risk Detection
- A subject is "At Risk" if it has zero completed sessions in the last 2 days
- At-risk badge is red and pulsing
- At start (no progress): all subjects are flagged at-risk
- Threshold configurable in config.js

### 5.5 Session Tracking
- Each session can be marked Done ✅ or Missed ❌
- Done: adds entry to progress log, updates completion stats
- Missed: adds missed entry, triggers auto-replan

### 5.6 Auto-Replan
- Triggered when a session is marked Missed
- Calculates remaining hours per subject (total − completed)
- Excludes fully completed subjects
- Re-runs priority engine + slot filler with updated data
- New plan replaces old plan in store and localStorage

### 5.7 AI Morning Brief (Gemini)
- Calls Gemini API on Dashboard mount
- Dynamic prompt includes: ranked subjects, at-risk list, current day
- Response formatted in 4 lines: 🎯 Focus | 💡 Tip | ⚡ Motivation | ⚠️ Warning
- Cached in store, refreshable on demand
- Graceful fallback if API key missing or call fails

### 5.8 Subject Tips (Gemini)
- One-sentence actionable tip per subject
- Fetched on-demand (accordion expand on AI Brief page)
- Cached in component state to avoid repeat API calls

---

## 6. Data Model

### Subject
```json
{
  "id": "math_001",
  "name": "Mathematics",
  "difficulty": 9,
  "hours": 4,
  "score": 6.38
}
```

### Session (in Plan)
```json
{
  "id": "math_day1_0",
  "subject": "Mathematics",
  "duration": 1.5,
  "type": "study",
  "done": false,
  "missed": false
}
```

### Progress Entry
```json
{
  "subjectName": "Mathematics",
  "date": "2026-03-24T09:00:00Z",
  "duration": 1.5,
  "completed": true
}
```

### Day Object
```json
{
  "day": 1,
  "sessions": [ /* array of Session objects */ ]
}
```

---

## 7. Storage

| Key | Contents |
|-----|---------|
| `ssp_subjects` | subjects array |
| `ssp_plan` | full plan array |
| `ssp_progress` | progress log array |
| `ssp_atRisk` | at-risk subject names |
| `ssp_currentDay` | current day number |

- All stored as JSON strings in localStorage
- Auto-saved on every state change via Zustand subscribe
- Loaded on app init
- Cleared via Reset button (with confirmation modal)

---

## 8. API

**Provider:** Google Gemini  
**Model:** gemini-2.0-flash  
**Key location:** `config.js` at project root  
**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={KEY}`  
**Method:** POST  
**No backend proxy needed** — called directly from browser for demo

### API Functions
1. `generateMorningBrief(subjects, atRisk, currentDay)` → string
2. `generateSubjectTip(subjectName, difficulty)` → string

---

## 9. Configuration (config.js)

```js
GEMINI_API_KEY: ""        // User fills in from aistudio.google.com
GEMINI_MODEL: "gemini-2.0-flash"
DAILY_HOURS: 6
BREAK_AFTER_HOURS: 1.5
AT_RISK_DAYS: 2
```

---

## 10. Design Requirements

- **Theme:** Dark throughout, CSS variables for all colors
- **Animations:** Framer Motion on every page (mount, exit, stagger)
- **Responsive:** Mobile-first, breakpoints at 375px / 768px / 1280px
- **Typography:** Clean sans-serif, clear hierarchy
- **No inline styles** — Tailwind utility classes only
- **Loading states:** Skeleton shimmer on all async operations
- **Empty states:** Designed for every list/section
- **Error states:** Friendly cards (no raw error messages to user)

---

## 11. Constraints

- No backend server
- No database
- No authentication / login
- Must run entirely in browser
- No routing library (currentPage state only)
- No form tags (onClick/onChange handlers only)
- Network dependency only: Gemini API calls

---

## 12. Out of Scope (v1)

- User accounts / cloud sync
- Collaborative planning
- Calendar integration
- Notifications / reminders
- Multiple study plans
- Import from timetable

---

## 13. Success Criteria (Competition)

| Criterion | Target |
|-----------|--------|
| Functionality | All 5 pages work, plan generates, sessions trackable |
| Innovation | AI brief + auto-replan + at-risk detection |
| UI/UX | Polished dark theme, smooth animations, mobile-ready |
| Code Quality | Modular logic, clean components, no console errors |
| Responsiveness | Works at 375px and 1280px |
| Performance | No lag, Gemini calls have loading states |

**Target Score: 85%+**
