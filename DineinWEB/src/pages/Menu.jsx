import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuGrid from "../components/sections/MenuGrid";
import SectionTitle from "../components/ui/SectionTitle";
import { menuItems } from "../data/menuData";

export default function Menu() {
  const categories = useMemo(
    () => ["All", ...new Set(menuItems.map((item) => item.category))],
    []
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="page-banner menu-banner">
        <div className="container">
          <p className="hero-kicker">Our Menu</p>
          <h1>Curated Courses For Midnight Hours</h1>
          <p>
            Explore starters, mains, desserts, and drinks crafted with a modern
            luxury lens.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <SectionTitle
            subtitle="Dining Collection"
            title="Crafted With Fire, Smoke, and Gold"
          />

          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {categories.map((category) => (
              <button
                type="button"
                role="tab"
                key={category}
                className={`tab-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <MenuGrid items={filteredItems} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
