import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-space-black min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-star-white uppercase mb-6 tracking-wider">
            Our <span className="text-transparent bg-clip-text bg-gradient-cosmic">Mission</span>
          </h1>
          <p className="text-moon-silver text-lg leading-relaxed">
            We are dedicated to bringing the wonders of the universe into your hands. From museum-quality replicas to educational kits, Space Tech Store is the ultimate destination for space enthusiasts.
          </p>
        </section>

        {/* Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24 animate-fade-in-up">
          <div className="rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,212,255,0.15)] relative aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" alt="Space" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-tr from-space-black/80 to-transparent pointer-events-none" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-3xl text-star-white uppercase mb-8 tracking-wider border-b border-white/10 pb-4 inline-block">Our Story</h2>
            <p className="text-moon-silver/90 leading-relaxed mb-6 text-lg">
              Founded in 2024 by an avid astronomer and space history buff, Space Tech Store was born out of a frustration with the lack of high-quality, realistic space memorabilia available to the public.
            </p>
            <p className="text-moon-silver/90 leading-relaxed text-lg">
              What started as a small personal collection has grown into a global operation, partnering with leading manufacturers to produce spacecraft models, genuine astronaut gear replicas, and stunning astrophysics art that meets our exacting standards.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="font-heading font-bold text-3xl text-star-white uppercase text-center mb-16 tracking-wider">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Precision", desc: "Every replica we sell must pass a rigorous accuracy check against actual NASA blueprints and mission photographs." },
              { icon: Users, title: "Community", desc: "We support aspiring astronauts by donating 5% of all proceeds to STEM education programs worldwide." },
              { icon: Rocket, title: "Innovation", desc: "We constantly search the galaxy for the newest and most exciting space-related technologies to share with you." }
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }} className="bg-deep-space border border-white/5 rounded-2xl p-10 text-center hover:border-cosmic-cyan/50 hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)] transition-all group">
                <div className="w-20 h-20 rounded-full bg-nebula-blue/30 border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-cosmic-cyan/20 transition-all">
                  <v.icon size={32} className="text-cosmic-cyan" />
                </div>
                <h3 className="font-heading font-bold text-xl text-star-white uppercase tracking-widest mb-4 group-hover:text-cosmic-cyan transition-colors">{v.title}</h3>
                <p className="text-moon-silver/80 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default About;
