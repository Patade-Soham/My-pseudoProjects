import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiGithub, FiLinkedin, FiCheck, FiBriefcase, FiUsers, FiZap } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import emailjs from 'emailjs-com';

const ContactInfoCard = ({ icon: Icon, title, link, linkText, delay }) => (
  <motion.a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-bg-nebula border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-accent-cyan hover:-translate-y-1 transition-all shadow-lg"
  >
    <div className="w-14 h-14 rounded-full bg-white/5 flex shrink-0 items-center justify-center group-hover:bg-accent-cyan/10 group-hover:scale-110 transition-all duration-300">
      <Icon className="text-2xl text-text-muted group-hover:text-accent-cyan transition-colors duration-300" />
    </div>
    <div>
      <h4 className="font-heading font-bold text-white text-xl mb-1">{title}</h4>
      <p className="text-text-secondary group-hover:text-white transition-colors">{linkText}</p>
    </div>
  </motion.a>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate Network Request / EmailJS send
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#ff006e', '#7b2ff7', '#00ff88']
      });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-bg-space overflow-hidden relative">
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-purple/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Page Hero */}
        <section className="py-12 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-page mb-4">Let's Connect</h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light">
              Open to internships, collaborations, and innovative projects.
            </p>
          </motion.div>
        </section>

        <section className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start mt-4">
          
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-5/12 space-y-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-8">Reach Out</h2>
              <div className="space-y-4">
                <ContactInfoCard 
                  icon={FiMail} 
                  title="Email" 
                  link="mailto:soham.patade@example.com" 
                  linkText="soham.patade@example.com" 
                  delay={0.1}
                />
                <ContactInfoCard 
                  icon={FiLinkedin} 
                  title="LinkedIn" 
                  link="https://linkedin.com/in/soham-patade" 
                  linkText="Soham Patade" 
                  delay={0.2}
                />
                <ContactInfoCard 
                  icon={FiGithub} 
                  title="GitHub" 
                  link="https://github.com/Patade-Soham" 
                  linkText="Patade-Soham" 
                  delay={0.3}
                />
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-bg-nebula border border-white/5 rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-xl font-heading font-bold text-accent-cyan mb-6">I'm Open To</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors">
                  <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent-cyan shrink-0">
                    <FiBriefcase size={18} />
                  </span>
                  Full-stack & AI/ML Internships
                </li>
                <li className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors">
                  <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent-magenta shrink-0">
                    <FiUsers size={18} />
                  </span>
                  Research Collaborations
                </li>
                <li className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors">
                  <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent-purple shrink-0">
                    <FiZap size={18} />
                  </span>
                  Innovative Open Source Projects
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 bg-bg-nebula border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[80px]"></div>
            
            <h2 className="text-3xl font-heading font-bold text-white mb-2 relative z-10">Send a Message</h2>
            <p className="text-text-secondary mb-10 relative z-10">Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/50 text-error flex items-center gap-3 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-error shrink-0"></span>
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent-cyan transition-colors">
                    <FiUser size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-14 bg-bg-space/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent-cyan transition-colors">
                    <FiMail size={18} />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-14 bg-bg-space/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute top-5 left-0 pl-5 pointer-events-none text-text-muted group-focus-within:text-accent-cyan transition-colors">
                    <FiMessageSquare size={18} />
                  </div>
                  <textarea 
                    name="message" 
                    placeholder="Your Message..." 
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field pl-14 bg-bg-space/80 backdrop-blur-sm h-40 resize-none py-5"
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-xl font-bold font-heading text-lg flex items-center justify-center gap-3 transition-all duration-300 group ${
                    isSuccess 
                      ? 'bg-success text-bg-space shadow-[0_0_20px_rgba(0,255,136,0.5)]' 
                      : 'bg-gradient-primary text-white shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <FiCheck size={24} /> Message Sent!
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 group-hover:gap-4 transition-all"
                      >
                        Send Message <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>

        </section>
      </div>
    </div>
  );
};

export default Contact;
