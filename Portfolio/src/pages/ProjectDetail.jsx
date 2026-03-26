import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/common/Button';

// Mock data fetcher
const getProjectDetails = (id) => {
  return {
    id: id,
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    tagline: "Autonomous systems integration mapping unknown terrain in real-time.",
    category: "Robotics & AI",
    date: "Fall 2024",
    overview: "This project presents a robust control architecture for an autonomous rover tasked with navigating and mapping unknown, potentially hazardous terrain. Utilizing a combination of Computer Vision for obstacle detection and ROS (Robot Operating System) for underlying communication, the system can dynamically adjust its path and report findings back to a central hub.",
    problem: "Real-world rovers face immense latency communicating with Earth, necessitating a high degree of autonomy to avoid hazards, map environments, and select sample sites without human intervention.",
    solution: "I implemented a layered software stack combining a local reactive planner with a global A* search algorithm running on a generated occupancy grid. Deep learning models process incoming camera feeds to classify terrain passability.",
    impact: "Achieved a 45% increase in navigation autonomy efficiency compared to baseline algorithms in simulation, successfully avoiding dynamic obstacles 98% of the time.",
    features: [
      "Real-time Occupancy Grid Mapping",
      "Dynamic Obstacle Avoidance",
      "Terrain Classification CNN",
      "ROS-based Distributed Architecture"
    ],
    techStack: ["Python", "C++", "ROS Noetic", "OpenCV", "PyTorch", "Gazebo"],
    githubUrl: "https://github.com/Patade-Soham",
    demoUrl: "#"
  };
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = getProjectDetails(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen pt-24 pb-24 bg-bg-space">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link to="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-10 font-mono text-sm uppercase tracking-widest hover:-translate-x-1 duration-300">
          <FiArrowLeft /> Back to Projects
        </Link>
        
        {/* Project Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-accent-purple font-mono text-sm uppercase tracking-widest">{project.category}</span>
            <span className="text-text-muted font-mono text-sm">— {project.date}</span>
          </div>
          <h1 className="heading-page mb-6 text-4xl md:text-5xl lg:text-5xl">{project.title}</h1>
          <p className="text-xl md:text-2xl text-text-secondary font-light border-l-4 border-accent-cyan pl-6 mb-8 max-w-3xl">
            {project.tagline}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="flex items-center gap-2 px-6">
                  <FiGithub /> Source Code
                </Button>
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 px-6">
                  <FiExternalLink /> Live Demo
                </Button>
              </a>
            )}
          </div>
        </motion.div>
        
        {/* Banner Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-64 md:h-96 bg-[#0e122a] rounded-3xl border border-white/10 mb-20 overflow-hidden relative flex items-center justify-center group shadow-2xl"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 to-accent-cyan/20"></div>
           <div className="w-full h-full absolute opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           <span className="text-3xl lg:text-5xl font-heading font-bold text-white/30 z-10 uppercase tracking-widest mix-blend-overlay">System Visualization</span>
        </motion.div>
        
        {/* Content Details */}
        <div className="space-y-24">
          
          {/* Overview */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-none"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-6">Overview</h2>
            <p className="text-text-secondary text-lg leading-relaxed">{project.overview}</p>
          </motion.section>
          
          {/* Problem & Solution */}
          <section className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-nebula border border-white/5 p-8 md:p-10 rounded-3xl relative"
            >
              <h3 className="text-2xl font-heading font-bold text-accent-magenta mb-4">The Challenge</h3>
              <p className="text-text-secondary text-lg leading-relaxed">{project.problem}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-nebula border border-accent-cyan/20 p-8 md:p-10 rounded-3xl shadow-[0_0_30px_rgba(0,212,255,0.05)] relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full blur-3xl rounded-bl-full"></div>
              <h3 className="text-2xl font-heading font-bold text-accent-cyan mb-4">The Solution</h3>
              <p className="text-text-secondary text-lg leading-relaxed relative z-10">{project.solution}</p>
            </motion.div>
          </section>
          
          {/* Impact */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-purple/10 to-transparent p-8 md:p-10 rounded-3xl border-l-4 border-accent-purple"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Impact & Results</h2>
            <p className="text-xl text-white font-light leading-relaxed">{project.impact}</p>
          </motion.section>
          
          {/* Features & Tech */}
          <section className="grid md:grid-cols-2 gap-12 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-heading font-bold text-white mb-8">Key Features</h2>
              <ul className="space-y-6">
                {project.features.map((feature, idx) => (
                  <motion.li 
                    key={feature} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-accent-cyan/20 p-1.5 rounded-full text-accent-cyan shrink-0">
                      <FiCheckCircle size={16} />
                    </div>
                    <span className="text-text-secondary text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-nebula p-8 rounded-3xl border border-white/5"
            >
              <h2 className="text-2xl font-heading font-bold text-white mb-8">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-mono text-sm hover:bg-white/10 hover:border-accent-cyan/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
