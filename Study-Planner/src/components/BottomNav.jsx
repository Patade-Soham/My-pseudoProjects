import React from 'react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';

export default function BottomNav() {
  const { currentPage, setCurrentPage } = useStudyStore();

  if (currentPage === 'onboarding') return null;

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠', activeColor: 'var(--accent-blue)' },
    { id: 'plan', label: 'Plan', icon: '📅', activeColor: 'var(--accent-amber)' },
    { id: 'progress', label: 'Progress', icon: '📈', activeColor: 'var(--accent-green)' },
    { id: 'brief', label: 'AI', icon: '🤖', activeColor: 'var(--accent-purple)' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)]/90 backdrop-blur-xl border-t border-[var(--border)] z-[60] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center px-2 py-2">
        {tabs.map(tab => {
          const isActive = currentPage === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => setCurrentPage(tab.id)}
              className="relative flex flex-col items-center justify-center w-16 h-[52px] transition-colors z-10 rounded-xl"
              style={{ color: isActive ? tab.activeColor : 'var(--text-muted)' }}
            >
              <span className={`text-[22px] transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1 mb-0.5' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] tracking-wide transition-all duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70 font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-[var(--bg-secondary)] rounded-xl -z-10 shadow-sm border border-[var(--border)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
