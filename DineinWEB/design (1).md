# 🎨 DESIGN — Midnight Bites: Visual Language & Design System

## 1. Design Philosophy
> "Where darkness meets desire."

Midnight Bites is not just a restaurant — it's an *experience*. The design language is **dark opulence** — think candlelit black marble, gold cutlery, whiskey in crystal glass. Every pixel should feel expensive, intentional, and cinematic.

**Aesthetic Direction:** Retro-Futuristic Luxury Dark  
**Mood Board Keywords:** Black marble, molten gold, candlelight, velvet, smoke, stars

---

## 2. Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #080808;        /* Deep black */
  --bg-secondary: #0f0f0f;      /* Soft black */
  --bg-card: #141414;           /* Card surface */
  --bg-overlay: rgba(0,0,0,0.7);

  /* Accent — Gold Neon */
  --gold-primary: #C9A84C;      /* Rich gold */
  --gold-light: #F0C060;        /* Bright gold */
  --gold-glow: #FFD700;         /* Neon glow gold */
  --amber: #E8A020;             /* Warm amber */

  /* Text */
  --text-primary: #F5F0E8;      /* Warm white */
  --text-secondary: #A09080;    /* Muted warm gray */
  --text-accent: #C9A84C;       /* Gold text */

  /* Borders & Dividers */
  --border: rgba(201, 168, 76, 0.2);
  --border-bright: rgba(201, 168, 76, 0.6);

  /* Alternate theme (Gold mode) */
  --theme-alt-bg: #1A1200;
  --theme-alt-accent: #FFD700;
}
```

---

## 3. Typography

```css
/* Display / Hero Headlines */
font-family: 'Cormorant Garamond', serif;
/* → Elegant, high-contrast, luxury editorial feel */

/* Navigation & Labels */
font-family: 'Bebas Neue', sans-serif;
/* → Bold, cinematic, uppercase impact */

/* Body Text */
font-family: 'Jost', sans-serif;
/* → Clean, modern, highly readable */

/* Accent / Price / Quotes */
font-family: 'Playfair Display', serif;
/* → Classic luxury, italic quotes */
```

### Type Scale
| Role | Size | Weight |
|------|------|--------|
| Hero Title | 96px / 6rem | 300 (thin) |
| Section Title | 48px / 3rem | 400 |
| Card Title | 24px / 1.5rem | 600 |
| Body | 16px / 1rem | 400 |
| Caption | 12px / 0.75rem | 400 |
| Nav Label | 14px / 0.875rem | uppercase tracked |

---

## 4. Layout Grid
- **Desktop:** 12-column grid, max-width 1440px, 80px gutters
- **Tablet:** 8-column, 40px gutters
- **Mobile:** 4-column, 16px gutters
- Use **asymmetric layouts** — avoid perfectly centered grids
- Embrace **negative space** — sections should breathe

---

## 5. Component Styles

### Navbar
- Fixed, transparent on scroll-top → dark blur (`backdrop-filter: blur(20px)`) on scroll
- Logo: Gold wordmark left-aligned
- Links: uppercase tracked, hover → gold underline slide-in
- Mobile: Full-screen overlay drawer, links stagger in from left

### Hero Section
- Full viewport height (`100vh`)
- Background: Dark cinematic image with `overlay` gradient
- Animated headline: Letters fade+slide up staggered
- Subtext fades in with delay
- CTA button: Gold border, fill on hover with glow shadow
- Scroll indicator: Animated bouncing arrow

### Menu Cards
- Dark card with subtle gold border
- On hover: card lifts (`translateY(-8px)`), gold glow spreads
- Price in gold accent color
- Category tags in small caps

### Reservation Form
- Full-width dark panel
- Inputs: borderless bottom-line style, gold focus ring
- Submit button: Full-width gold gradient

### Testimonials
- Horizontal scroll snap or Framer Motion carousel
- Quote in italic Playfair Display
- Gold quotation marks decorative

### Footer
- Multi-column, dark bg
- Social icons with gold hover glow
- Divider: thin gold line

---

## 6. Iconography
- Use **Lucide React** icons
- Style: outline, stroke 1.5px, colored gold on interaction

---

## 7. Micro-interactions
- All buttons: scale(0.97) on press
- Nav links: underline slide from left
- Cards: lift + glow on hover
- Form inputs: label float on focus
- Page load: staggered fade-in of sections

---

## 8. Responsive Behavior
| Breakpoint | Behavior |
|------------|----------|
| `< 640px` (mobile) | Single column, drawer nav, stacked cards |
| `640–1024px` (tablet) | 2-column grid, condensed nav |
| `> 1024px` (desktop) | Full multi-column, all animations active |

---

## 9. Theme Toggle
- **Dark Mode (default):** Black + Gold
- **Gold Mode (alternate):** Very deep amber-black + brighter gold
- Toggle in header: sun/moon icon with smooth color transition (300ms)
