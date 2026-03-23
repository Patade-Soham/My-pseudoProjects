# Animations & Transitions Guide
## LearnSphere — Motion Design System
**Version:** 1.0 | **Date:** March 2026

---

## 1. Motion Philosophy

LearnSphere's animation language is built on three principles:

1. **Purposeful** — Every animation serves user understanding: confirming actions, guiding attention, or indicating state changes.
2. **Energetic but restrained** — Fast, punchy entrance animations. Smooth, eased exits. No gratuitous loops.
3. **Performance-first** — All animations use GPU-composited properties: `transform` and `opacity` only (no height/width/top animations that cause repaints).

---

## 2. Timing & Easing Reference

```css
:root {
  /* Durations */
  --dur-instant:  80ms;    /* Hover states, ripples */
  --dur-fast:     150ms;   /* Button presses, toggles */
  --dur-normal:   250ms;   /* Modals open, dropdowns */
  --dur-moderate: 400ms;   /* Page sections, cards */
  --dur-slow:     600ms;   /* Hero reveals, progress bars */
  --dur-dramatic: 900ms;   /* Page transitions, certificate */

  /* Easing curves */
  --ease-out:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in:       cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-out:   cubic-bezier(0.645, 0.045, 0.355, 1.0);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy */
  --ease-bounce:   cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-sharp:    cubic-bezier(0.4, 0, 0.6, 1);
}
```

---

## 3. Keyframe Library

### 3.1 Page & Section Reveals
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeRight {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
```

### 3.2 Hero Animations
```css
@keyframes heroTitleReveal {
  0%   { opacity: 0; transform: translateY(40px) skewY(2deg); }
  100% { opacity: 1; transform: translateY(0) skewY(0deg); }
}

@keyframes heroSubtitleReveal {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes heroBadgeFloat {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50%       { transform: translateY(-8px) rotate(1deg); }
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 3.3 Progress & Achievement
```css
@keyframes progressFill {
  from { width: 0%; }
  to   { width: var(--progress); }
}

@keyframes progressShimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes progressRingDraw {
  from { stroke-dashoffset: var(--circumference); }
  to   { stroke-dashoffset: var(--offset); }
}

@keyframes badgeUnlock {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
  80%  { transform: scale(0.95) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes xpPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,71,0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(255,107,71,0); }
}
```

### 3.4 Streak & Gamification
```css
@keyframes flameDance {
  0%, 100% { transform: scaleY(1) rotate(-2deg); }
  25%       { transform: scaleY(1.1) rotate(2deg); }
  50%       { transform: scaleY(0.95) rotate(-1deg); }
  75%       { transform: scaleY(1.05) rotate(1deg); }
}

@keyframes streakCounter {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-100%); }
  51%  { transform: translateY(100%); opacity: 0; }
  52%  { opacity: 1; }
  100% { transform: translateY(0); }
}

@keyframes confettiBurst {
  0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0); opacity: 0; }
}

@keyframes countUp {
  from { content: "0"; }
  to   { content: var(--target); }
}
```

### 3.5 UI State Transitions
```css
@keyframes toastSlide {
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes toastExit {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(120%); opacity: 0; }
}

@keyframes modalOverlay {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes modalContent {
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
}

@keyframes spinnerRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 3.6 Navbar & Navigation
```css
@keyframes navbarShrink {
  /* Applied via JS class toggle on scroll */
  to { height: 52px; backdrop-filter: blur(24px); }
}

@keyframes activeIndicator {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes mobileMenuOpen {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
```

---

## 4. Component Animation Specs

### 4.1 Course Card
| Trigger | Property | Duration | Easing |
|---------|----------|----------|--------|
| Page load (stagger) | `fadeUp` | 400ms | ease-out |
| Hover enter | `translateY(-6px)` + glow shadow | 200ms | ease-spring |
| Hover exit | `translateY(0)` | 250ms | ease-out |
| Image hover | `scale(1.05)` | 300ms | ease-out |
| Enroll click | Button scale bounce | 150ms | ease-bounce |
| Progress ring fill | SVG stroke-dashoffset | 800ms | ease-out |

**Stagger delay formula:**
```css
.course-card:nth-child(1) { animation-delay: 0ms; }
.course-card:nth-child(2) { animation-delay: 80ms; }
.course-card:nth-child(3) { animation-delay: 160ms; }
/* +80ms per card, max 480ms */
```

### 4.2 Progress Bar
```css
.progress-bar__fill {
  animation: progressFill 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  background: linear-gradient(90deg, #ff6b47, #6c63ff);
  background-size: 200% 100%;
  animation: progressFill 0.8s ease-spring forwards,
             progressShimmer 2s linear 0.8s 3;
}
```

### 4.3 Enroll Button
```javascript
// On click: 
// 1. Scale down (80ms)
// 2. Scale up with bounce (200ms)
// 3. Background color transition (300ms)
// 4. Text crossfade (200ms)
// 5. If first enrollment: confetti burst from button center

const enrollButton = {
  click: [
    { scale: 0.95 },          // 80ms
    { scale: 1.05 },          // 200ms (spring)
    { scale: 1 },             // 100ms
  ],
  stateChange: {
    background: '300ms ease-in-out',
    borderColor: '300ms ease-in-out',
    color: '200ms ease-in-out',
  }
}
```

### 4.4 Dashboard Progress Rings
```css
.progress-ring__circle {
  stroke-dasharray: var(--circumference); /* 2π × r */
  stroke-dashoffset: var(--circumference);
  animation: progressRingDraw 1.2s ease-out 0.3s forwards;
  transform-origin: center;
  transform: rotate(-90deg);
}

/* Ring glow on 100% */
.progress-ring--complete .progress-ring__circle {
  stroke: var(--color-accent-tertiary);
  filter: drop-shadow(0 0 6px rgba(0, 217, 166, 0.6));
  animation: progressRingDraw 1.2s ease-out 0.3s forwards,
             xpPulse 2s ease-in-out 1.5s infinite;
}
```

### 4.5 Hero Section
```css
/* Staggered headline reveal */
.hero__title span:nth-child(1) { animation: heroTitleReveal 0.7s ease-out 0.1s both; }
.hero__title span:nth-child(2) { animation: heroTitleReveal 0.7s ease-out 0.25s both; }
.hero__subtitle                { animation: heroSubtitleReveal 0.6s ease-out 0.5s both; }
.hero__cta                     { animation: fadeUp 0.5s ease-out 0.7s both; }
.hero__stats                   { animation: fadeUp 0.5s ease-out 0.9s both; }

/* Animated gradient mesh background */
.hero__bg {
  background: linear-gradient(-45deg, #0a0e1a, #1a0a2e, #0e1a2a, #1a0e14);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

/* Floating course cards in hero */
.hero__float-card {
  animation: heroBadgeFloat 4s ease-in-out infinite;
}
.hero__float-card:nth-child(2) { animation-delay: -1.3s; }
.hero__float-card:nth-child(3) { animation-delay: -2.6s; }
```

---

## 5. Page Transition System

```javascript
// Route change animation sequence:
// 1. Current page: fadeOut (150ms, ease-in)
// 2. Scroll to top (instant)
// 3. New page enters: fadeUp (300ms, ease-out)
// 4. Stagger child elements

async function pageTransition(newPageFn) {
  const app = document.getElementById('app');
  
  // Exit current page
  app.style.animation = `fadeOut 150ms ease-in forwards`;
  await delay(150);
  
  // Render new page
  app.innerHTML = await newPageFn();
  app.style.animation = `fadeUp 300ms ease-out forwards`;
  
  // Trigger stagger on cards
  const cards = app.querySelectorAll('.course-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 80}ms`;
    card.classList.add('animate-in');
  });
}
```

---

## 6. Scroll Animations (IntersectionObserver)

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after first reveal for performance
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

// Elements observed:
// .course-card, .section-header, .stats-item,
// .achievement-badge, .curriculum-section
```

```css
/* Pre-reveal state */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

/* Post-reveal state */
.animate-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Micro-interactions Catalog

| Element | Interaction | Animation |
|---------|-------------|-----------|
| Bookmark icon | Toggle on/off | Scale 1→1.3→1 + fill color transition |
| Rating stars | Hover preview | Each star lights up sequentially (20ms delay) |
| Category pill | Select | Background fill slides in from left |
| Search input | Focus | Border glow expands outward |
| Theme toggle | Switch | Moon/sun icon rotates 180° and morphs |
| XP badge | New XP earned | Number flip animation (slot machine style) |
| Streak counter | Day milestone | Flame grows 20% then returns |
| Lecture row | Check complete | Checkmark draws with path animation |
| Toast | Appear/dismiss | Slide from right, auto-dismiss after 3s |
| Modal | Open/close | Scale + fade, overlay blur |
| Navbar links | Hover | Underline draws left to right |
| Mobile menu | Open | Slide from left, stagger nav items |

---

## 8. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep essential state transitions but remove decorative motion */
  .progress-bar__fill {
    transition: width 0.01ms !important;
  }
  
  .hero__bg {
    animation: none !important;
    background: var(--color-bg-primary) !important;
  }
  
  .hero__float-card {
    animation: none !important;
  }
}
```

---

## 9. GPU Optimization Rules

**Always use (GPU composited):**
- `transform: translate/scale/rotate`
- `opacity`
- `filter` (with caution — expensive on large areas)

**Never animate (triggers layout):**
- `width`, `height`, `top`, `left`, `bottom`, `right`
- `margin`, `padding`
- `font-size` (use `transform: scale` instead)
- `display` (use `opacity` + `pointer-events: none`)

**Will-change hint (use sparingly):**
```css
.course-card { will-change: transform; }
.progress-ring__circle { will-change: stroke-dashoffset; }
.hero__bg { will-change: background-position; }
```

---

## 10. Animation Testing Checklist

- [ ] All animations run at 60fps (Chrome Performance tab)
- [ ] No jank on initial page load (no layout shift > 0.1 CLS)
- [ ] Stagger animations don't block interaction during play
- [ ] Progress animations trigger correctly from localStorage values
- [ ] `prefers-reduced-motion` disables all decorative animations
- [ ] Animations complete before next user interaction is available
- [ ] No infinite animations running in background tabs
- [ ] Mobile: test on real device (not just emulator) for performance
