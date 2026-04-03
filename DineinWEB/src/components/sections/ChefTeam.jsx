import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { chefs } from "../../data/chefData";

export default function ChefTeam() {
  return (
    <section className="section-space">
      <div className="container">
        <SectionTitle
          subtitle="The Team"
          title="Chefs Behind The Flame"
          align="center"
        />
        <div className="chef-grid">
          {chefs.map((chef, index) => (
            <motion.article
              key={chef.id}
              className="chef-card"
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="chef-media" style={{ background: chef.image }} />
              <div className="chef-body">
                <h3>{chef.name}</h3>
                <p className="chef-role">{chef.role}</p>
                <p>{chef.specialty}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
