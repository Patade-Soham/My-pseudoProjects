# ✨ ANIMATIONS — Midnight Bites: Motion Design Playbook

## 1. Animation Philosophy
> "Motion should feel like smoke rising from a candle — effortless, deliberate, luxurious."

Every animation serves a purpose: **reveal**, **feedback**, or **atmosphere**. No bouncy or playful motion — everything is slow, smooth, and elegant. Easing curves should feel cinematic, not cartoonish.

**Rules:**
- Duration: 0.4s–0.9s for most transitions
- Easing: `easeInOut`, `anticipate`, or custom cubic-bezier
- Never animate more than 3 things simultaneously
- Mobile: reduce or disable heavy animations for performance

---

## 2. Page Transitions

### Slide + Fade (between pages)
```jsx
// PageWrapper.jsx — wrap every page
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -40 }
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
```

### AnimatePresence in App.jsx
```jsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    ...
  </Routes>
</AnimatePresence>
```

---

## 3. Hero Section Animations

### Staggered Word Reveal
```jsx
const heroTitle = "Where Darkness\nMeets Desire";
const words = heroTitle.split(" ");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const wordVariant = {
  hidden: { opacity: 0, y: 60, rotateX: -20 },
  show:   { opacity: 1, y: 0,  rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

// JSX
<motion.h1 variants={container} initial="hidden" animate="show">
  {words.map((word, i) => (
    <motion.span key={i} variants={wordVariant} style={{display:'inline-block', marginRight:'0.25em'}}>
      {word}
    </motion.span>
  ))}
</motion.h1>
```

### Scroll Indicator Bounce
```css
/* animations.css */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(10px); opacity: 0.5; }
}

.scroll-indicator {
  animation: scrollBounce 1.8s ease-in-out infinite;
}
```

---

## 4. Navbar Animations

### Scroll-triggered Background
```js
// Navbar.jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// className
className={`fixed w-full z-50 transition-all duration-500
  ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50' : 'bg-transparent'}`}
```

### Nav Link Underline Slide
```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: var(--gold-primary);
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-link:hover::after { width: 100%; }
```

### Mobile Drawer Stagger
```jsx
const drawerVariants = {
  closed: { x: '100%', opacity: 0 },
  open:   { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

const linkVariants = {
  closed: { opacity: 0, x: 40 },
  open: i => ({
    opacity: 1, x: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.4 }
  })
};
```

---

## 5. Card Animations

### Menu Card Hover (CSS)
```css
.menu-card {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.4s ease;
}
.menu-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(201, 168, 76, 0.25),
              0 0 0 1px rgba(201, 168, 76, 0.4);
}
```

### Framer Motion Scroll Reveal for Cards
```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

// In component
{menuItems.map((item, i) => (
  <motion.div
    key={item.id}
    custom={i}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
  >
    <MenuCard item={item} />
  </motion.div>
))}
```

---

## 6. Button Animations

```jsx
// Gold CTA Button
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  className="gold-button"
>
  Reserve a Table
</motion.button>
```

```css
.gold-button {
  border: 1px solid var(--gold-primary);
  color: var(--gold-primary);
  padding: 14px 36px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: background 0.35s ease, color 0.35s ease,
              box-shadow 0.35s ease;
}
.gold-button:hover {
  background: var(--gold-primary);
  color: #080808;
  box-shadow: 0 0 30px rgba(201, 168, 76, 0.5);
}
```

---

## 7. Section Title Animation

```jsx
const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">{subtitle}</p>
    <h2 className="font-cormorant text-5xl text-warm-white">{title}</h2>
    <div className="w-16 h-px bg-gold mt-4" />
  </motion.div>
);
```

---

## 8. Testimonials Carousel

```jsx
const [current, setCurrent] = useState(0);

// Auto-advance
useEffect(() => {
  const timer = setInterval(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, 4000);
  return () => clearInterval(timer);
}, []);

// Animate between slides
<AnimatePresence mode="wait">
  <motion.div
    key={current}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    <TestimonialCard data={testimonials[current]} />
  </motion.div>
</AnimatePresence>
```

---

## 9. Form Input Animations

```css
/* Floating label */
.form-group { position: relative; }

.form-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  color: var(--text-primary);
  padding: 16px 0 8px;
  width: 100%;
  transition: border-color 0.3s ease;
}
.form-input:focus {
  outline: none;
  border-bottom-color: var(--gold-primary);
}

.form-label {
  position: absolute;
  top: 16px; left: 0;
  color: var(--text-secondary);
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 0;
  font-size: 11px;
  color: var(--gold-primary);
  letter-spacing: 0.1em;
}
```

---

## 10. Gold Glow Pulse (Decorative)

```css
@keyframes goldPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(201, 168, 76, 0.3); }
  50%       { box-shadow: 0 0 40px rgba(201, 168, 76, 0.7); }
}

.gold-glow-pulse {
  animation: goldPulse 3s ease-in-out infinite;
}
```

---

## 11. Theme Toggle Transition

```css
/* Smooth global theme switch */
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease,
              border-color 0.3s ease;
}
```

---

## 12. Performance Notes
- Use `will-change: transform` only on actively animating elements
- Use `viewport={{ once: true }}` on scroll animations — don't repeat
- Disable heavy animations on `prefers-reduced-motion`
- On mobile (`< 640px`), reduce `staggerChildren` delays by 50%

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
