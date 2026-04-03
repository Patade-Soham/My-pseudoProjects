import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle, align = "left" }) {
  return (
    <motion.div
      className={`section-title ${align === "center" ? "center" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {subtitle ? <p className="section-kicker">{subtitle}</p> : null}
      <h2>{title}</h2>
      <div className="gold-line" />
    </motion.div>
  );
}
