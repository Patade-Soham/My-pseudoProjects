import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-text-muted text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Soham Patade. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/Patade-Soham" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-cyan transition-colors">
            <FiGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/soham-patade" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-cyan transition-colors">
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:contact@example.com" className="text-text-muted hover:text-accent-cyan transition-colors">
            <FiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
