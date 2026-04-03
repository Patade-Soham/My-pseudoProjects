import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function MenuGrid({ items }) {
  return (
    <div className="menu-grid">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          className="menu-card"
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-35px" }}
        >
          <div className="card-media" style={{ background: item.image }} />
          <div className="card-content">
            <div className="card-top">
              <h3>{item.name}</h3>
              <span className="price">{item.price}</span>
            </div>
            <p>{item.description}</p>
            <span className="tag">{item.tag}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
