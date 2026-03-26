import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiBookOpen, FiClock, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import SectionTitle from '../components/common/SectionTitle';
import cert1 from '../assets/cert_ai_techies.jpg';
import cert2 from '../assets/cert_udemy_arduino.jpg';
import cert3 from '../assets/cert_swayam_data_science.jpg';
import cert4 from '../assets/cert_nptel_python.jpg';

const certifications = [
  { id: 1, name: "Python Using AI Workshop", platform: "AI FOR TECHIES", date: "Jul 2025", status: "Completed", desc: "Learnt how to write and debug Python code using AI, and create interactive visualizations.", image: cert1 },
  { id: 2, name: "Complete Arduino Course For Beginners", platform: "Udemy", date: "Jul 2025", status: "Completed", desc: "Mastered fundamental concepts of Arduino, circuits, and programming.", image: cert2 },
  { id: 3, name: "Data Science Using Python", platform: "SWAYAM", date: "Oct 2025", status: "Completed", desc: "Scored 84% consolidated. Covered comprehensive Python implementations in Data Science.", image: cert3 },
  { id: 4, name: "The Joy of Computing using Python", platform: "NPTEL", date: "Apr 2025", status: "Completed", desc: "Scored 71%. Deep dive into computational thinking with Python programming.", image: cert4 },
];

const currentLearning = [
  { name: "Deep Reinforcement Learning", progress: 65, expected: "Next Month" },
  { name: "CUDA & Parallel Programming", progress: 30, expected: "2 Months" },
  { name: "Advanced 3D Math for Robotics", progress: 80, expected: "Next Week" }
];

const roadmap = [
  {
    id: "m1",
    title: "Module 1: Foundations",
    status: "Completed",
    topics: ["Python & C++ Fundamentals", "Linear Algebra & Calculus", "Data Structures & Algorithms", "Basic ROS Navigation"]
  },
  {
    id: "m2",
    title: "Module 2: Core AI & Perception",
    status: "In Progress",
    topics: ["Machine Learning Models", "Deep Neural Networks", "Computer Vision (OpenCV)", "Sensor Fusion (LiDAR/Camera)"]
  },
  {
    id: "m3",
    title: "Module 3: Autonomous Systems",
    status: "Upcoming",
    topics: ["Reinforcement Learning", "Sim2Real Transfer", "Multi-Agent Systems", "Space-Grade Hardware Architecture"]
  }
];

const CertCard = ({ cert }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-64 relative cursor-pointer group" style={{ perspective: '1000px' }} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full absolute transition-all duration-500"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 bg-bg-nebula border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-center hover:border-accent-cyan shadow-lg transition-colors overflow-hidden group-hover:-translate-y-2"
          style={{ backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMWExZjNhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDA4OEwwIDh6IiBmaWxsPSIjMTMxODMwIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
           <FiAward className="text-4xl text-accent-cyan mb-4 relative z-10" />
           <h3 className="text-xl font-heading font-bold text-white mb-2 relative z-10">{cert.name}</h3>
           <p className="text-text-secondary mb-2 relative z-10">{cert.platform}</p>
           <span className={`text-xs px-3 py-1 rounded-full relative z-10 ${cert.status === 'Completed' ? 'bg-success/10 text-success border border-success/20' : 'bg-warning/10 text-warning border border-warning/20'}`}>
             {cert.status === 'Completed' ? cert.date : 'In Progress'}
           </span>
           <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-text-muted font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Click to flip
           </div>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-bg-nebula to-[#171c36] border border-accent-cyan/30 rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(0,212,255,0.1)] overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {cert.image && (
             <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
               <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-bg-space/80"></div>
             </div>
          )}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <h3 className="text-lg font-heading font-bold text-accent-cyan mb-4">{cert.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{cert.desc}</p>
            {cert.image && (
              <a href={cert.image} target="_blank" rel="noreferrer" className="mt-auto inline-block text-xs uppercase tracking-widest text-white hover:text-accent-cyan border border-white/20 hover:border-accent-cyan px-4 py-2 rounded-full transition-colors z-20">
                View Certificate
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Learning = () => {
  const [expandedModule, setExpandedModule] = useState("m2");

  return (
    <div className="min-h-screen pt-24 pb-24 bg-bg-space">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Page Hero */}
        <section className="py-12 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-page mb-4">Learning Journey</h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light">
              Continuously expanding knowledge in AI, Robotics, & Space-Tech.
            </p>
          </motion.div>
        </section>

        {/* Current Learning */}
        <section className="mb-32">
          <SectionTitle 
            title="Currently Learning" 
            subtitle="Active focus areas and their progress."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {currentLearning.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-bg-nebula border border-white/5 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-accent-cyan">
                  <FiBookOpen size={20} className="shrink-0" />
                  <h3 className="font-heading font-semibold text-white text-lg leading-tight">{item.name}</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary font-medium">Progress</span>
                    <span className="text-accent-cyan font-mono">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-space rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-text-muted text-sm font-light">
                  <FiClock /> Expected: <span className="text-white font-medium">{item.expected}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="mb-32">
          <SectionTitle 
            title="Certifications & Courses" 
            subtitle="Formal education and online achievements."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap Visualization */}
        <section className="mb-12">
          <SectionTitle 
            title="AI & Data Science Mastery Roadmap" 
            subtitle="My structured path towards becoming a multi-disciplinary robotics researcher."
          />
          
          <div className="mt-16 flex flex-col md:flex-row gap-8 relative items-start md:items-stretch">
            {/* Desktop Path Line */}
            <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-[2px] bg-white/10 z-0">
               <motion.div 
                 className="h-full bg-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                 initial={{ width: 0 }}
                 whileInView={{ width: "66%" }} // 2/3 complete
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
            </div>

            {/* Mobile Path Line */}
            <div className="md:hidden absolute left-[28px] top-[50px] bottom-[50px] w-[2px] bg-white/10 z-0">
               <motion.div 
                 className="w-full bg-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                 initial={{ height: 0 }}
                 whileInView={{ height: "66%" }} // 2/3 complete
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
            </div>

            {roadmap.map((module, idx) => {
              const isCompleted = module.status === "Completed";
              const isInProgress = module.status === "In Progress";
              const isExpanded = expandedModule === module.id;
              
              const statusColor = isCompleted ? "bg-success border-success text-bg-space" : isInProgress ? "bg-warning border-warning text-bg-space animate-pulse" : "bg-bg-space border-white/20 text-white/50";
              const textColor = isCompleted ? "text-success" : isInProgress ? "text-warning" : "text-text-muted";

              return (
                <div key={module.id} className="w-full md:w-1/3 flex flex-col relative z-10 pl-16 md:pl-0">
                  {/* Node */}
                  <div className={`absolute md:relative left-0 md:left-auto top-2 md:top-0 w-14 h-14 md:mx-auto rounded-full border-4 border-bg-space flex items-center justify-center mb-6 shadow-xl ${statusColor} transition-colors duration-500`}>
                    {isCompleted ? <FiCheckCircle className="text-2xl" /> : <span className="font-heading font-bold">{idx + 1}</span>}
                  </div>
                  
                  {/* Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className={`bg-bg-nebula border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl ${isExpanded ? (isInProgress ? 'border-warning/50' : 'border-white/20 bg-[#161b36]') : 'border-white/5 hover:border-white/20'}`}
                  >
                    <button 
                      onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                    >
                      <div>
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 block ${textColor}`}>{module.status}</span>
                        <h4 className="text-xl font-heading font-bold text-white">{module.title}</h4>
                      </div>
                      <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-white/10' : ''}`}>
                        <FiChevronDown className={isExpanded ? "text-white" : "text-text-secondary"} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 border-t border-white/5 text-base">
                            <ul className="space-y-3 mt-4">
                              {module.topics.map((topic, i) => (
                                <li key={i} className="flex items-start gap-3 text-text-secondary">
                                  <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isCompleted ? 'bg-success shadow-[0_0_5px_#00ff88]' : isInProgress ? 'bg-warning shadow-[0_0_5px_#ffd000]' : 'bg-white/20'}`}></div>
                                  <span className={isCompleted ? 'text-white' : ''}>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Learning;
