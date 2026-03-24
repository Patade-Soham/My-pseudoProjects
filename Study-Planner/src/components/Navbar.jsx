import React, { useState, useEffect } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';

export default function Navbar() {
  const { currentPage, setCurrentPage, plan, currentDay } = useStudyStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentPage === 'onboarding') return null;

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'plan', label: 'Plan' },
    { id: 'progress', label: 'Progress' },
    { id: 'brief', label: 'AI Brief' },
  ];

  const totalDays = plan.length > 0 ? plan.length : 1;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm' 
          : 'bg-[var(--bg-primary)]/50 border-b border-transparent'
      } px-4 md:px-8 py-3 md:py-4 flex items-center justify-between`}
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => setCurrentPage('dashboard')}
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">🧠</span>
        <span className="font-extrabold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]" style={{ backgroundImage: 'var(--gradient-brand)' }}>
          SmartStudy
        </span>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="bg-[var(--bg-hover)]/80 backdrop-blur border border-[var(--border)] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-[var(--text-muted)] hover:border-[var(--text-muted)] transition-colors">
          Day {currentDay} of {totalDays}
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
        {navLinks.map(link => {
          const isActive = currentPage === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`relative transition-colors hover:text-[var(--text-primary)] px-1 py-1 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            >
              {link.label}
              {isActive && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[var(--accent-blue)] rounded-t-full shadow-[0_-2px_10px_rgba(59,130,246,0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="md:hidden flex items-center">
        <button className="text-[var(--text-muted)] p-2 hover:bg-[var(--bg-hover)] rounded-md transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
