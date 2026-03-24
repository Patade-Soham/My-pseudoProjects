import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';
import { detectAtRisk } from '../logic/atRiskDetector';
import { CONFIG } from '../../config';

function CountUp({ end, decimals = 0, duration = 0.7 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    let animationFrame;
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progressAmount = timestamp - startTime;
      if (progressAmount < duration * 1000) {
        setCount((end * progressAmount) / (duration * 1000));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return <span>{decimals === 0 ? Math.floor(count) : count.toFixed(decimals)}</span>;
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Today at ${timeStr}`;
  if (isYesterday) return `Yesterday at ${timeStr}`;
  return `${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${timeStr}`;
};

const calculateStreak = (progressList) => {
  if (!progressList || progressList.length === 0) return 0;
  
  const completedDates = [...new Set(progressList.filter(p => p.completed).map(p => {
    const d = new Date(p.date);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }))].sort((a,b) => b.localeCompare(a)); 

  if (completedDates.length === 0) return 0;

  const getLocalDateStr = (dateObj) => {
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
  };

  const todayStr = getLocalDateStr(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = getLocalDateStr(yesterdayDate);

  if (completedDates[0] !== todayStr && completedDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(completedDates[0]);
  
  for (let i = 1; i < completedDates.length; i++) {
    const expectedPrev = new Date(currentDate);
    expectedPrev.setDate(currentDate.getDate() - 1);
    const expectedStr = getLocalDateStr(expectedPrev);
    
    if (completedDates[i] === expectedStr) {
      streak++;
      currentDate = expectedPrev;
    } else {
      break;
    }
  }
  return streak;
};

export default function Progress() {
  const { subjects, progress, atRisk, setProgress, setAtRisk, setCurrentPage, currentDay } = useStudyStore();
  const [showModal, setShowModal] = useState(false);

  const totalHours = progress.filter(p => p.completed).reduce((acc, p) => acc + p.duration, 0);
  const sessionsCompleted = progress.filter(p => p.completed).length;
  const currentStreak = calculateStreak(progress);
  const subjectsOnTrack = subjects.length > 0 ? subjects.length - atRisk.length : 0;

  const subjectCards = subjects.map(sub => {
    const hoursNum = Number(sub.hours) || 0;
    const subHistory = progress.filter(p => p.subjectName === sub.name);
    const completedHours = subHistory.filter(p => p.completed).reduce((acc, p) => acc + Number(p.duration), 0);
    const safeTotalHours = hoursNum > 0 ? hoursNum : 1; 
    const percent = Math.min(100, Math.round((completedHours / safeTotalHours) * 100));
    
    let statusText = '🟡 In Progress';
    if (completedHours >= hoursNum) statusText = '✅ Complete';
    else if (atRisk?.includes(sub.name)) statusText = '🔴 At Risk';

    const subStreak = calculateStreak(subHistory);

    return { ...sub, hoursNum, completedHours, percent, statusText, subStreak };
  });

  const handleReset = () => {
    useStudyStore.getState().clearAll();
    setShowModal(false);
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] pt-4 md:pt-8 flex flex-col overflow-x-hidden">

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 space-y-12">
        
        <motion.div variants={staggerVariants} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl shadow-sm text-center transition-all hover:shadow-md hover:border-[var(--accent-blue)]/50">
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--accent-blue)] mb-2">
              <CountUp end={totalHours} decimals={1} />h
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Hours Studied</div>
          </motion.div>
          <motion.div variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl shadow-sm text-center transition-all hover:shadow-md hover:border-[var(--accent-purple)]/50">
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--accent-purple)] mb-2">
              <CountUp end={sessionsCompleted} />
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Sessions Comp.</div>
          </motion.div>
          <motion.div variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl shadow-sm text-center transition-all hover:shadow-md hover:border-[var(--accent-amber)]/50">
            <div className={`text-3xl md:text-4xl font-extrabold mb-2 transition-colors ${currentStreak > 0 ? 'text-[var(--accent-amber)]' : 'text-[var(--text-muted)]'}`}>
              <CountUp end={currentStreak} /> <span className="text-lg">🔥</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Day Streak</div>
          </motion.div>
          <motion.div variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border)] p-5 rounded-2xl shadow-sm text-center transition-all hover:shadow-md hover:border-[var(--accent-green)]/50">
            <div className={`text-3xl md:text-4xl font-extrabold mb-2 transition-colors ${subjectsOnTrack === subjects.length && subjects.length>0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
              <CountUp end={subjectsOnTrack} />
              <span className="text-xl md:text-2xl text-[var(--text-subtle)]">/{subjects.length}</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Subjects On Track</div>
          </motion.div>
        </motion.div>

        <motion.section variants={staggerVariants} initial="hidden" animate="show">
          <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">🎯 Subject Mastery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectCards.map((sub, idx) => (
              <motion.div variants={itemVariant} key={`${sub.name}-${idx}`} className="bg-[var(--bg-secondary)] border border-[var(--border)] p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{sub.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                      Lvl {sub.difficulty}
                    </span>
                  </div>
                  <div className={`text-xs font-bold bg-[var(--bg-card)] border px-2 py-1 rounded-md ${
                    sub.statusText.includes('Complete') ? 'border-[var(--accent-green)]/30 text-[var(--accent-green)]' :
                    sub.statusText.includes('Risk') ? 'border-[var(--accent-red)]/30 text-[var(--accent-red)]' :
                    'border-[var(--border)] text-[var(--text-primary)]'
                  }`}>
                    {sub.statusText}
                  </div>
                </div>

                <div className="space-y-2 flex-col flex-1 pb-4">
                  <div className="flex justify-between text-xs font-medium text-[var(--text-muted)]">
                    <span>Progress</span>
                    <span>{sub.completedHours.toFixed(1)}h / {sub.hoursNum.toFixed(1)}h completed</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border)] shadow-inner">
                    <motion.div 
                      className={`h-full ${sub.percent >= 100 ? 'bg-[var(--accent-green)]' : 'bg-[var(--accent-blue)]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${sub.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-medium bg-[var(--bg-card)] px-3 py-2 rounded-lg border border-[var(--border)] absolute bottom-0 left-0 right-0 border-t border-[var(--border)] rounded-t-none">
                  <span className="text-sm">🔥</span> 
                  {sub.subStreak} {sub.subStreak === 1 ? 'session' : 'sessions'} completed consecutively
                </div>
              </motion.div>
            ))}
            {subjects.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center p-12 border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] rounded-2xl bg-[var(--bg-secondary)]/50 min-h-[44px] flex flex-col items-center justify-center">
                <p className="text-3xl mb-3">📚</p>
                No subjects defined yet.
              </div>
            )}
          </div>
        </motion.section>

        <motion.section variants={staggerVariants} initial="hidden" animate="show">
          <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">🕒 Session History</h2>
          
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
            {progress.length === 0 ? (
              <div className="py-16 px-6 flex flex-col items-center justify-center text-center border border-dashed border-[var(--border)] m-4 rounded-xl min-h-[44px]">
                <div className="w-24 h-24 mb-6 mx-auto bg-gradient-to-br from-[var(--border)] to-[var(--bg-hover)] rounded-xl relative flex items-center justify-center border-4 border-[var(--bg-secondary)] shadow-inner transform -rotate-6">
                  <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-[var(--bg-secondary)] opacity-50 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                  <div className="absolute right-3 top-4 w-6 h-1 bg-[var(--text-muted)] rounded-full opacity-30"></div>
                  <div className="absolute right-3 top-7 w-8 h-1 bg-[var(--text-muted)] rounded-full opacity-30"></div>
                  <span className="text-4xl relative z-10 drop-shadow-lg opacity-80">📖</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No sessions yet</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-xs">Start your first session from the Dashboard to build your history.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--border-hover)]">
                {[...progress].sort((a,b) => new Date(b.date) - new Date(a.date)).map((entry, idx) => (
                  <motion.li variants={itemVariant} key={`${entry.date}-${idx}`} className="flex items-center justify-between p-4 md:px-6 hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm md:text-base text-[var(--text-primary)]">{entry.subjectName}</span>
                      <span className="text-xs text-[var(--text-subtle)] font-medium">{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8 text-sm">
                      <span className="text-[var(--text-muted)] font-mono font-medium">{entry.duration}h</span>
                      {entry.completed ? (
                        <div className="bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20 px-3 py-1 rounded-md flex items-center gap-1.5 font-bold tracking-wide text-xs">
                          <span className="text-sm">✅</span> <span className="hidden sm:inline">Done</span>
                        </div>
                      ) : (
                        <div className="bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/20 px-3 py-1 rounded-md flex items-center gap-1.5 font-bold tracking-wide text-xs">
                          <span className="text-sm">❌</span> <span className="hidden sm:inline">Missed</span>
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {progress.length > 0 && (
          <div className="flex justify-center pt-8">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              className="min-h-[44px] px-6 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--accent-red)] hover:border-[var(--accent-red)]/50 text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
            >
               <span className="text-lg">🗑️</span> Reset All Progress
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6 md:p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-red)]"></div>
              <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Clear Progress?</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">
                This will delete your entire session history, rebuild the 'at-risk' list, and reset your streaks to 0. It will <strong className="text-[var(--text-primary)]">not</strong> delete your subjects or your plan structure.
              </p>
              <div className="flex gap-3 w-full">
                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowModal(false)}
                  className="min-h-[44px] flex-1 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] font-medium transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                  className="min-h-[44px] flex-1 py-2.5 rounded-xl bg-[var(--accent-red)] text-white hover:opacity-90 font-bold shadow-lg shadow-[var(--accent-red)]/20 transition-all flex items-center justify-center gap-1.5"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
