import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';

const allProjects = [
  {
    id: "biological-age",
    title: "Biological Age Detection",
    category: "AI/ML",
    description: "Machine learning model to estimate biological age based on health data.",
    tags: ["Python", "AI", "Machine Learning"],
    githubUrl: "https://github.com/Patade-Soham/BiologicalAgeDetection",
    featured: true
  },
  {
    id: "ai-drugs",
    title: "AI Drugs Detection",
    category: "AI/ML",
    description: "AI-based solution for identifying and classifying pharmaceutical drugs.",
    tags: ["Computer Vision", "Deep Learning", "Python"],
    githubUrl: "https://github.com/Patade-Soham/AI-Drugs-detection",
    featured: true
  },
  {
    id: "hms",
    title: "Hospital Management System",
    category: "Web Dev",
    description: "Comprehensive system for managing hospital operations and patient records.",
    tags: ["Web", "Development"],
    githubUrl: "https://github.com/Patade-Soham/hms",
    featured: false
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Tools",
    category: "AI/ML",
    description: "Development of AI agents and exploration of autonomous systems.",
    tags: ["AI Agents", "Python", "LLM"],
    githubUrl: "https://github.com/Patade-Soham/Agentic-AI-",
    featured: false
  },
  {
    id: "study-sync",
    title: "StudySync Platform",
    category: "Web Dev",
    description: "A synchronized platform for managing study resources and collaborative learning.",
    tags: ["React", "JavaScript", "Web"],
    githubUrl: "https://github.com/Patade-Soham/StudySync",
    featured: false
  },
  {
    id: "public-apis",
    title: "Public APIs Collection",
    category: "Web Dev",
    description: "A collective list of free APIs integrated and explored for web applications.",
    tags: ["API", "Integration", "Web"],
    githubUrl: "https://github.com/Patade-Soham/public-apis",
    featured: false
  }
];

const categories = ["All", "AI/ML", "Robotics", "Web Dev"];

const ProjectCard = ({ project }) => {
  return (
    <div className={`group relative h-full bg-bg-nebula border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent-cyan shadow-lg ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl z-0">
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        {project.featured && (
          <span className="inline-block self-start mb-4 bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full font-mono text-xs font-semibold border border-accent-cyan/30 uppercase tracking-widest">
            🚀 Flagship
          </span>
        )}
        
        {/* Thumbnail Placeholder */}
        <div className="w-full h-48 md:h-56 bg-[#0e122a] rounded-xl border border-white/10 mb-6 overflow-hidden relative group-hover:border-accent-cyan/30 transition-colors">
           <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 to-accent-cyan/10 group-hover:opacity-70 transition-opacity"></div>
           <div className="w-full h-full flex items-center justify-center opacity-50 group-hover:scale-110 transition-transform duration-700">
             <span className="text-4xl font-heading font-bold text-white/20 uppercase tracking-widest">{project.category}</span>
           </div>
        </div>
        
        <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
        <p className="text-text-secondary mb-6 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="tag text-xs py-1 px-2 border-white/10 text-text-muted bg-white/5">{tag}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to={`/projects/${project.id}`} className="text-accent-cyan font-medium flex items-center gap-2 hover:text-white transition-colors group/link">
            View Details <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <div className="flex gap-3 text-text-muted">
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiGithub size={20} /></a>}
            <a href="#" className="hover:text-white transition-colors"><FiExternalLink size={20} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredProjects = activeFilter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <section className="py-12 md:py-20">
          <SectionTitle 
            title="My Projects" 
            subtitle="Building real-world AI, ML, and Web solutions."
          />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-mono text-sm md:text-base font-medium transition-all duration-300 border ${
                  activeFilter === cat 
                    ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)]' 
                    : 'bg-transparent text-text-muted border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
        </section>
      </div>
    </div>
  );
};

export default Projects;
