# ✅ TODO — Midnight Bites: 1-Hour Build Checklist

## ⚡ Priority Order (Time-Optimized for 1 Hour)

---

## 🔧 Phase 1 — Setup (0:00 – 0:08) ⏱ 8 mins

- [ ] Run `npm create vite@latest midnight-bites -- --template react`
- [ ] `cd midnight-bites && npm install`
- [ ] Install dependencies: `npm install react-router-dom framer-motion lucide-react`
- [ ] Install Tailwind: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
- [ ] Configure `tailwind.config.js` (content paths)
- [ ] Add Tailwind directives to `index.css`
- [ ] Add Google Fonts to `index.html` (Cormorant Garamond, Bebas Neue, Jost)
- [ ] Add CSS variables (color palette) to `index.css`
- [ ] Set up folder structure (`pages/`, `components/`, `context/`, `data/`)
- [ ] Configure `App.jsx` with Router + ThemeProvider + AnimatePresence

---

## 🎨 Phase 2 — Layout Shell (0:08 – 0:18) ⏱ 10 mins

- [ ] **Navbar.jsx**
  - [ ] Logo (text-based, gold)
  - [ ] Nav links (Home, Menu, Reservations, About, Contact)
  - [ ] Scroll-triggered blur background
  - [ ] Theme toggle button (sun/moon icon)
  - [ ] Mobile hamburger icon
  - [ ] Mobile full-screen drawer with stagger animation

- [ ] **Footer.jsx**
  - [ ] 3-column layout (Brand, Links, Contact)
  - [ ] Social icons with gold hover
  - [ ] Copyright line
  - [ ] Gold divider line

---

## 🏠 Phase 3 — Home Page (0:18 – 0:33) ⏱ 15 mins

- [ ] **Hero Section**
  - [ ] Full viewport dark background image
  - [ ] Gradient overlay
  - [ ] Animated headline (stagger letter/word fade-up)
  - [ ] Subheadline fade-in
  - [ ] Two CTA buttons (Reserve a Table, View Menu)
  - [ ] Scroll indicator animation

- [ ] **Featured Dishes Strip** (3 cards)
  - [ ] Image, name, price
  - [ ] Hover glow + lift effect

- [ ] **Testimonials Section**
  - [ ] 3 review cards in horizontal layout
  - [ ] Gold quotation marks
  - [ ] Star ratings
  - [ ] Fade-in on scroll

---

## 🍽️ Phase 4 — Menu Page (0:33 – 0:42) ⏱ 9 mins

- [ ] Category tabs (Starters, Mains, Desserts, Drinks)
- [ ] Menu grid (3 columns desktop, 1 mobile)
- [ ] Menu cards with image, name, description, price, tag
- [ ] Hover: card lift + gold border glow
- [ ] Tab switch: fade transition between categories
- [ ] Populate `menuData.js` with 3–4 items per category

---

## 📅 Phase 5 — Reservations Page (0:42 – 0:48) ⏱ 6 mins

- [ ] Dark hero banner with title
- [ ] Reservation form:
  - [ ] Name input
  - [ ] Email input
  - [ ] Phone input
  - [ ] Date picker
  - [ ] Time selector
  - [ ] Number of guests
  - [ ] Special requests textarea
  - [ ] Submit button (gold gradient, full width)
- [ ] Floating label animation on focus
- [ ] Success state on submit (animated confirmation message)

---

## 👨‍🍳 Phase 6 — About Page (0:48 – 0:53) ⏱ 5 mins

- [ ] Story section (text + image side by side)
- [ ] Philosophy quote (large italic gold text)
- [ ] Chef Team Grid (3 cards: photo, name, role, specialty)
- [ ] Cards: hover lift + gold name highlight

---

## 📞 Phase 7 — Contact Page (0:53 – 0:57) ⏱ 4 mins

- [ ] Contact info (address, phone, email, hours)
- [ ] Contact form (name, email, message, submit)
- [ ] Gold accent icons for each info item
- [ ] Map placeholder (styled dark iframe or decorative block)

---

## 🚀 Phase 8 — Polish & QA (0:57 – 1:00) ⏱ 3 mins

- [ ] Test all page routes work
- [ ] Test mobile layout (Chrome DevTools → 375px)
- [ ] Test theme toggle works
- [ ] Test mobile drawer opens/closes
- [ ] Check all animations play on first load
- [ ] Fix any overflow/scroll issues on mobile
- [ ] Verify form inputs are functional
- [ ] Final visual check — consistency of gold accents

---

## 🏆 Judge Impression Checklist
- [ ] First 3 seconds of Home page look stunning
- [ ] Smooth page transitions visible when navigating
- [ ] Mobile drawer works flawlessly
- [ ] At least one scroll-triggered animation working
- [ ] Gold glow effects visible on hover
- [ ] Theme toggle changes colors site-wide
- [ ] All 9 required components present

---

## ⏰ Time Budget Summary

| Phase | Time |
|-------|------|
| Setup | 8 min |
| Layout Shell | 10 min |
| Home Page | 15 min |
| Menu Page | 9 min |
| Reservations | 6 min |
| About Page | 5 min |
| Contact Page | 4 min |
| Polish & QA | 3 min |
| **Total** | **60 min** |
