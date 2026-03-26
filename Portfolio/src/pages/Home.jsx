import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { FiArrowDown, FiArrowRight, FiCode, FiLayers, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';

// Custom CountUp hook for stats
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp = null;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return { count, ref };
};

const StatCard = ({ icon: Icon, value, label, delay }) => {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 rounded-full bg-bg-constellation flex items-center justify-center mb-6 group-hover:bg-accent-cyan transition-colors duration-300">
        <Icon className="text-accent-cyan group-hover:text-bg-space text-2xl" />
      </div>
      <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{count}+</h3>
      <p className="text-text-secondary text-sm md:text-base uppercase tracking-wider font-medium">{label}</p>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 bg-gradient-mesh opacity-40 animate-gradientShift mix-blend-screen" style={{ backgroundSize: '200% 200%' }}></div>
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="container relative z-10 px-6 mx-auto flex w-full flex-col items-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent-cyan font-mono tracking-widest uppercase mb-4 text-sm md:text-base">Welcome to my universe</p>
            <h1 className="heading-hero mb-6 h-28 md:h-32 lg:h-36 flex items-center justify-center">
              <span className="sr-only">Soham Patade</span>
              <ReactTyped
                strings={["Soham Patade", "AI Researcher", "Robotics Dev", "Space Tech"]}
                typeSpeed={80}
                backSpeed={50}
                backDelay={1500}
                loop
                className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-purple"
              />
            </h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl font-light"
          >
            AI • Machine Learning • Robotics • Space-Tech 🚀
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-6"
          >
            <Link to="/projects" className="w-full sm:w-auto">
              <Button className="w-full">Explore Work</Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">Contact Me</Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-text-muted text-xs font-mono mb-3 uppercase tracking-[0.2em] opacity-80">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-cyan animate-[bounce_2s_infinite]"></div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-24 bg-bg-space relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={FiCode} value={12} label="Projects Built" delay={0.1} />
            <StatCard icon={FiLayers} value={15} label="Technologies" delay={0.2} />
            <StatCard icon={FiClock} value={2} label="Years Learning" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Featured Project Showcase */}
      <section className="py-24 bg-bg-nebula relative z-10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Featured Work" 
            subtitle="My flagship project demonstrating complex system integration."
          />
          
          <motion.div
            whileHover={{ y: -8 }}
            className="max-w-6xl mx-auto rounded-3xl p-[1px] bg-gradient-to-br from-accent-cyan/60 via-accent-purple/40 to-accent-magenta/20 transition-all duration-500 shadow-[0_0_40px_rgba(0,212,255,0.1)] hover:shadow-[0_0_60px_rgba(0,212,255,0.2)]"
          >
            <div className="bg-bg-space rounded-3xl p-8 lg:p-12 xl:p-16 flex flex-col lg:flex-row gap-12 items-center h-full w-full">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block bg-accent-cyan/10 text-accent-cyan px-4 py-2 rounded-full font-mono text-sm font-semibold border border-accent-cyan/30 uppercase tracking-widest leading-none">
                  🚀 Flagship Project
                </div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Mars Rover Simulation</h3>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-light">
                  A comprehensive autonomous rover simulation implementing pathfinding, terrain analysis, and obstacle avoidance using advanced machine learning algorithms.
                </p>
                
                <div className="flex flex-wrap gap-3 py-2">
                  <span className="tag">Python</span>
                  <span className="tag">OpenCV</span>
                  <span className="tag">AI/ML</span>
                  <span className="tag">ROS</span>
                  <span className="tag">3D Modeling</span>
                </div>
                
                <div className="pt-6">
                  <Link to="/projects/mars-rover">
                    <Button className="flex items-center justify-center gap-3 group px-8">
                      View Full Project
                      <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 relative h-72 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden border border-white/10 group bg-[#0e122a]">
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-space/90 via-transparent to-transparent z-10"></div>
                
                {/* Simulated Grid / 3D area placeholder */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(3)' }}></div>
                
                <div className="w-full h-full flex flex-col items-center justify-center relative z-20">
                  <div className="w-40 h-40 rounded-full border-2 border-accent-cyan/30 border-dashed relative flex items-center justify-center animate-[spin_20s_linear_infinite] mb-8">
                    <div className="absolute w-full h-full border-2 border-accent-magenta/20 border-t-accent-purple rounded-full animate-[spin_10s_linear_infinite_reverse] scale-125"></div>
                    <div className="w-24 h-24 bg-accent-cyan/10 rounded-full blur-xl absolute"></div>
                    <FiLayers className="text-accent-cyan text-5xl opacity-80 animate-[spin_20s_linear_infinite_reverse]" />
                  </div>
                  <div className="bg-bg-space/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-xl shadow-2xl">
                    <span className="text-accent-cyan font-mono text-sm tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                       SYSTEM PREVIEW ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-bg-space relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link to="/about">
              <Card className="text-center group cursor-pointer h-full flex flex-col justify-center items-center py-12">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-cyan/20 group-hover:text-accent-cyan transition-all duration-300">
                  <FiClock className="text-2xl text-text-secondary group-hover:text-accent-cyan" />
                </div>
                <h4 className="text-2xl font-heading font-semibold text-white mb-3 group-hover:text-accent-cyan transition-colors">Explore My Skills</h4>
                <p className="text-text-muted text-base">Discover my journey and technical arsenal</p>
              </Card>
            </Link>
            <Link to="/projects">
              <Card className="text-center group cursor-pointer h-full flex flex-col justify-center items-center py-12">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-purple/20 group-hover:text-accent-purple transition-all duration-300">
                  <FiCode className="text-2xl text-text-secondary group-hover:text-accent-purple" />
                </div>
                <h4 className="text-2xl font-heading font-semibold text-white mb-3 group-hover:text-accent-purple transition-colors">View All Projects</h4>
                <p className="text-text-muted text-base">Browse my AI, Robotics & Web creations</p>
              </Card>
            </Link>
            <Link to="/learning">
              <Card className="text-center group cursor-pointer h-full flex flex-col justify-center items-center py-12">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-magenta/20 group-hover:text-accent-magenta transition-all duration-300">
                  <FiLayers className="text-2xl text-text-secondary group-hover:text-accent-magenta" />
                </div>
                <h4 className="text-2xl font-heading font-semibold text-white mb-3 group-hover:text-accent-magenta transition-colors">Learning Journey</h4>
                <p className="text-text-muted text-base">My continuous path in mastering technology</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
