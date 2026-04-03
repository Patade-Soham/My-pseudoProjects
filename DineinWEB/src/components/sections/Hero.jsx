import { motion } from "framer-motion";
import Button from "../ui/Button";

const heroTitle = "Where Darkness Meets Desire";
const words = heroTitle.split(" ");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 58, rotateX: -22 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-atmosphere" />
      <div className="container hero-content">
        <div className="hero-copy">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Luxury Fine Dining
          </motion.p>

          <motion.h1
            className="hero-title"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {words.map((word, i) => (
              <motion.span key={`${word}-${i}`} variants={wordVariant}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            A candlelit world of smoke, fire, and gold. Curated courses, crafted
            cocktails, and an atmosphere built for unforgettable nights.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button to="/reservations">Reserve A Table</Button>
            <Button to="/menu" variant="secondary">
              View Menu
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
