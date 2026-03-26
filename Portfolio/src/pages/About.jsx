import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiCpu, FiGlobe, FiTool, FiAward, FiBookOpen, FiSend, FiTerminal } from 'react-icons/fi';
import SectionTitle from '../components/common/SectionTitle';
import pfpImage from '../assets/soham_pfp.jpg';

const skillsData = [
  {
    category: "Programming",
    icon: FiTerminal,
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "C / C++", level: 75 },
      { name: "Java", level: 70 },
    ]
  },
  {
    category: "AI & Data Science",
    icon: FiCpu,
    skills: [
      { name: "Machine Learning", level: 88 },
      { name: "Computer Vision (OpenCV)", level: 85 },
      { name: "Data Science", level: 84 },
    ]
  },
  {
    category: "Web Development",
    icon: FiGlobe,
    skills: [
      { name: "React & Node.js", level: 80 },
      { name: "HTML & CSS", level: 90 },
      { name: "Flask", level: 75 },
    ]
  },
  {
    category: "Tools & Others",
    icon: FiTool,
    skills: [
      { name: "Data Structures", level: 80 },
      { name: "Arduino", level: 75 },
      { name: "Git & GitHub", level: 85 },
    ]
  }
];

const timelineData = [
  {
    year: "2023",
    title: "Started Python Programming",
    icon: FiBookOpen,
    desc: "Began my journey into code, completely enamored by the potential of writing scripts to automate tasks."
  },
  {
    year: "2024",
    title: "First ML Course & Competitions",
    icon: FiTarget,
    desc: "Dived deep into Machine Learning, participating in introductory hackathons and learning fundamental predictive models."
  },
  {
    year: "2024",
    title: "Mars Rover Project Initiated",
    icon: FiSend,
    desc: "Started working on the flagship autonomous rover simulation combining CV, pathfinding, and ROS concepts."
  },
  {
    year: "2025",
    title: "Advanced AI Certifications",
    icon: FiAward,
    desc: "Completed several rigorous courses in Deep Learning and advanced Data Science."
  },
  {
    year: "2026",
    title: "Portfolio & Final Year",
    icon: FiGlobe,
    desc: "Showcasing my consolidated skills while seeking opportunities in research and innovative engineering roles."
  }
];

const SkillBar = ({ name, level, delay }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-text-secondary font-medium">{name}</span>
      <span className="text-accent-cyan text-sm">{level}%</span>
    </div>
    <div className="h-2 w-full bg-bg-space rounded-full overflow-hidden border border-white/5">
      <motion.div 
        className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple relative"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut", delay }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]"></div>
      </motion.div>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Page Hero */}
      <section className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-page mb-4">About Me</h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light">
              Building the future of AI & Robotics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 bg-bg-space border-y border-white/5 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/3 flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-accent-cyan via-accent-purple to-accent-magenta group">
                <div className="w-full h-full rounded-full bg-bg-nebula border-4 border-bg-space overflow-hidden relative z-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#1a1f3a]"></div>
                  <img src={pfpImage} alt="Soham Patade" className="w-full h-full object-cover relative z-20 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 rounded-full bg-accent-cyan blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-2/3 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Current Computer Engineering Student</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                I am a passionate technologist heavily invested in the interception of Artificial Intelligence, Robotics, and Aerospace technologies. My journey revolves around not just learning, but building robust systems that solve practical problems. With extreme enthusiasm for autonomous systems, I thrive in environments where software meets the physical world.
              </p>
              
              <div className="bg-bg-nebula border border-white/10 rounded-2xl p-6 mt-6 shadow-lg">
                <h3 className="text-xl font-heading font-semibold text-accent-cyan mb-4 flex items-center gap-2">
                  <FiTarget /> My Vision
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-white">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex shrink-0 items-center justify-center text-accent-cyan"><FiSend /></span>
                    <span className="mt-1">Contribute to space exploration technologies at an organization like ISRO.</span>
                  </li>
                  <li className="flex items-start gap-4 text-white">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex shrink-0 items-center justify-center text-accent-cyan"><FiCpu /></span>
                    <span className="mt-1">Pioneer research in fully autonomous robotics systems.</span>
                  </li>
                  <li className="flex items-start gap-4 text-white">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex shrink-0 items-center justify-center text-accent-cyan"><FiTerminal /></span>
                    <span className="mt-1">Develop reliable AI models that can operate safely in the physical realm.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionTitle 
            title="Technical Arsenal" 
            subtitle="The tools and technologies I use to forge solutions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-nebula border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="text-3xl text-accent-cyan" />
                  <h3 className="text-2xl font-heading font-semibold text-white">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.2 + (sIdx * 0.1)} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32 bg-bg-space relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionTitle 
            title="My Journey" 
            subtitle="A timeline of continuous learning and milestone achievements."
          />
          
          <div className="relative mt-16 pb-12">
            {/* Center Line Desktop */}
            <div className="hidden md:block absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-white/10">
              <motion.div 
                className="w-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-magenta origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 2, ease: "easeOut" }}
              ></motion.div>
            </div>
            
            {/* Left Line Mobile */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-[2px] bg-white/10">
              <motion.div 
                className="w-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-magenta origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              ></motion.div>
            </div>

            <div className="space-y-12 md:space-y-24">
              {timelineData.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex items-center md:justify-between flex-col md:flex-row w-full group pt-2 md:pt-0">
                    
                    {/* Icon Node */}
                    <div className="absolute left-8 md:left-1/2 -ml-6 md:-ml-6 w-12 h-12 rounded-full border-4 border-bg-space bg-accent-cyan z-20 flex items-center justify-center text-bg-space shadow-[0_0_15px_rgba(0,212,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} />
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`w-full md:w-5/12 pl-20 md:pl-0 ${!isEven ? 'md:order-last' : 'md:text-right md:pr-12 lg:pr-16'} ${isEven ? 'md:text-right' : 'md:text-left md:pl-12 lg:pl-16'}`}
                    >
                      <div className="bg-bg-nebula border border-white/10 p-6 rounded-2xl group-hover:border-accent-cyan/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                        <span className="text-accent-cyan font-mono text-sm font-semibold mb-2 block">{item.year}</span>
                        <h4 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-text-secondary text-base">{item.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
