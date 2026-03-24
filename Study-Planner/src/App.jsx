import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStudyStore } from './store/useStudyStore';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyPlan from './pages/DailyPlan';
import Progress from './pages/Progress';
import AIBrief from './pages/AIBrief';

function App() {
  const { currentPage, loadFromStorage } = useStudyStore();
  const previousPage = useRef(currentPage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    previousPage.current = currentPage;
  }, [currentPage]);

  const pageVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className={`flex-1 relative w-full h-full pb-20 ${currentPage !== 'onboarding' ? 'pt-14 md:pt-16' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            {currentPage === 'onboarding' && <Onboarding />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'plan' && <DailyPlan />}
            {currentPage === 'progress' && <Progress />}
            {currentPage === 'brief' && <AIBrief />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}

export default App;
