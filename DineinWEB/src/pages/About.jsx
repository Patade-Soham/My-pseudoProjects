import { motion } from "framer-motion";
import ChefTeam from "../components/sections/ChefTeam";
import SectionTitle from "../components/ui/SectionTitle";

export default function About() {
  return (
    <>
      <section className="page-banner about-banner">
        <div className="container">
          <p className="hero-kicker">About Midnight Bites</p>
          <h1>Built On Atmosphere, Driven By Craft</h1>
          <p>
            We combine cinematic storytelling with precise culinary technique to
            turn dinner into an immersive ritual.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="container story-layout">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle subtitle="Our Story" title="Where Night Finds Flavor" />
            <p>
              Midnight Bites began with one idea: luxury should feel emotional,
              not just expensive. Our chefs choreograph each plate for contrast
              and depth, pairing familiar comfort with modern expression.
            </p>
            <p>
              From charcoal flame kitchens to low-lit service rituals, everything
              is designed to slow time and sharpen memory.
            </p>
          </motion.div>

          <motion.div
            className="story-media"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="section-space quote-section">
        <div className="container">
          <blockquote>
            "Luxury is not loud. It is precise, patient, and impossible to
            forget."
          </blockquote>
        </div>
      </section>

      <ChefTeam />
    </>
  );
}
