# 🏗️ ARCHITECTURE — Midnight Bites: Technical Structure

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Fonts | Google Fonts (CDN) |
| State | React useState / useContext |
| Forms | Controlled components (no backend) |

---

## 2. Project Structure

```
midnight-bites/
├── public/
│   └── assets/
│       ├── hero-bg.jpg
│       ├── chef1.jpg
│       ├── chef2.jpg
│       ├── chef3.jpg
│       └── food/
│           ├── starter1.jpg
│           ├── main1.jpg
│           └── dessert1.jpg
│
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Router + ThemeProvider
│   │
│   ├── context/
│   │   └── ThemeContext.jsx      # Dark/Gold theme toggle
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Fixed nav + mobile drawer
│   │   │   └── Footer.jsx        # Multi-column footer
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx        # Gold CTA button variants
│   │   │   ├── Card.jsx          # Menu / chef cards
│   │   │   ├── SectionTitle.jsx  # Animated section headings
│   │   │   └── Divider.jsx       # Gold decorative divider
│   │   │
│   │   └── sections/
│   │       ├── Hero.jsx          # Home hero
│   │       ├── FeaturedDishes.jsx
│   │       ├── Testimonials.jsx
│   │       ├── MenuGrid.jsx
│   │       ├── ChefTeam.jsx
│   │       ├── ReservationForm.jsx
│   │       └── ContactMap.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Reservations.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   │
│   ├── data/
│   │   ├── menuData.js           # Menu items array
│   │   ├── chefData.js           # Chef profiles array
│   │   └── testimonialData.js    # Reviews array
│   │
│   └── styles/
│       ├── index.css             # Tailwind directives + CSS vars
│       └── animations.css        # Custom keyframe animations
│
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 3. Routing

```jsx
// App.jsx
<BrowserRouter>
  <ThemeProvider>
    <Navbar />
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/menu"         element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<Contact />} />
      </Routes>
    </AnimatePresence>
    <Footer />
  </ThemeProvider>
</BrowserRouter>
```

---

## 4. Theme System

```jsx
// context/ThemeContext.jsx
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'gold'
  const toggleTheme = () =>
    setTheme(prev => prev === 'dark' ? 'gold' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

---

## 5. Page Transition Wrapper

```jsx
// Wrap every page with this
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);
```

---

## 6. Data Models

```js
// menuData.js
export const menuItems = [
  {
    id: 1,
    category: 'Starters',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and parmesan',
    price: '₹1,200',
    tag: 'Chef Special',
    image: '/assets/food/starter1.jpg'
  },
  // ...
];

// chefData.js
export const chefs = [
  {
    id: 1,
    name: 'Chef Aryan Mehta',
    role: 'Executive Chef',
    specialty: 'Modern Indian Fusion',
    image: '/assets/chef1.jpg'
  },
  // ...
];
```

---

## 7. Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 8. Setup Commands

```bash
npm create vite@latest midnight-bites -- --template react
cd midnight-bites
npm install
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```
