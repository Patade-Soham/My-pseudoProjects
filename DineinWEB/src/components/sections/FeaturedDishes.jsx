import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { featuredDishes } from "../../data/menuData";

const cardVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function FeaturedDishes() {
  return (
    <section className="section-space">
      <div className="container">
        <SectionTitle
          subtitle="Featured Dishes"
          title="Evening Highlights"
          align="center"
        />
        <div className="card-grid">
          {featuredDishes.map((dish, index) => (
            <motion.article
              key={dish.id}
              className="menu-card"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="card-media" style={{ background: dish.image }} />
              <div className="card-content">
                <h3>{dish.name}</h3>
                <p className="price">{dish.price}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
