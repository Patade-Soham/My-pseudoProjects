import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';
import { generateMorningBrief, generateSubjectTip } from '../services/geminiService';
import { replan } from '../logic/replanner';
import { detectAtRisk } from '../logic/atRiskDetector';
import { CONFIG } from '../../config';

function CountUp({ end, decimals = 2, duration = 1 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    let animationFrame;
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      if (progress < duration * 1000) {
        setCount((end * progress) / (duration * 1000));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return <span>{count.toFixed(decimals)}</span>;
}

const getScoreColor = (score) => {
  if (score < 4) return 'bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/30';
  if (score <= 6) return 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)] border-[var(--accent-amber)]/30';
  return 'bg-[var(--accent-red)]/20 text-[var(--accent-red)] border-[var(--accent-red)]/30';
};

export default function Dashboard() {
  const {
    subjects, plan, progress, atRisk, aiBrief, briefLoading,
    currentDay, setCurrentPage, setBriefLoading, setAiBrief,
    setProgress, setPlan, setAtRisk
  } = useStudyStore();

  const [tips, setTips] = useState({});
  const [loadingTip, setLoadingTip] = useState(null);
  const [sessionActionState, setSessionActionState] = useState(null); 

  const fetchBrief = async () => {
    setBriefLoading(true);
    const brief = await generateMorningBrief(subjects, atRisk, currentDay);
    setAiBrief(brief);
    setBriefLoading(false);
  };

  useEffect(() => {
    if (!aiBrief && !briefLoading) {
      const timer = setTimeout(() => {
        fetchBrief();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [aiBrief, briefLoading]);

  const handleHoverTip = async (subjectName, difficulty) => {
    if (tips[subjectName] || loadingTip === subjectName) return;
    setLoadingTip(subjectName);
    const tip = await generateSubjectTip(subjectName, difficulty);
    setTips(prev => ({ ...prev, [subjectName]: tip }));
    setLoadingTip(null);
  };

  const handleReplan = () => {
    const newPlan = replan(subjects, progress, CONFIG.DAILY_HOURS, CONFIG.BREAK_AFTER_HOURS);
    setPlan(newPlan);
    const updatedRisk = detectAtRisk(subjects, progress, CONFIG.AT_RISK_DAYS);
    setAtRisk(updatedRisk);
  };

  const handleSessionAction = (sessionId, subjectName, duration, isDone) => {
    const updatedPlan = plan.map(day => ({
      ...day,
      sessions: day.sessions.map(s => 
        s.id === sessionId ? { ...s, done: isDone, missed: !isDone } : s
      )
    }));
    setPlan(updatedPlan);

    const newProgress = [...progress, {
      subjectName,
      date: new Date().toISOString(),
      duration,
      completed: isDone
    }];
    setProgress(newProgress);

    const updatedRisk = detectAtRisk(subjects, newProgress, CONFIG.AT_RISK_DAYS);
    setAtRisk(updatedRisk);

    if (!isDone) {
      const regeneratedPlan = replan(subjects, newProgress, CONFIG.DAILY_HOURS, CONFIG.BREAK_AFTER_HOURS);
      setPlan(regeneratedPlan);
    }
  };

  const handleSessionActionWithDelay = (sessionId, subjectName, duration, isDone) => {
    setSessionActionState({ id: sessionId, isDone, success: false });
    
    setTimeout(() => {
      if (isDone) {
        setSessionActionState({ id: sessionId, isDone, success: true });
        setTimeout(() => {
          handleSessionAction(sessionId, subjectName, duration, isDone);
          setSessionActionState(null);
        }, 300);
      } else {
        handleSessionAction(sessionId, subjectName, duration, isDone);
        setSessionActionState(null);
      }
    }, 400); 
  };

  const todayData = plan.find(d => d.day === currentDay) || { sessions: [] };
  const allSessionsDone = todayData.sessions.length > 0 && todayData.sessions.every(s => s.done || s.missed || s.type === 'break');

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col overflow-x-hidden">
      <header className="flex flex-wrap items-center justify-between p-4 md:px-8 border-[var(--border)] gap-4">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setCurrentPage('onboarding')} className="min-h-[44px] text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-2 font-medium">
          ← Back
        </motion.button>
        <div className="flex-1 flex justify-center">
          <div className="bg-[var(--bg-hover)] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-[var(--border)]">
            Day {currentDay} of {plan.length || 1}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleReplan} className="min-h-[44px] text-[var(--accent-amber)] hover:opacity-80 text-sm font-semibold flex items-center gap-1.5 transition-opacity">
            🔄 Replan
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setCurrentPage('plan')} className="min-h-[44px] text-[var(--accent-blue)] hover:opacity-80 transition-opacity text-sm font-semibold hidden sm:block">
            View Full Schedule →
          </motion.button>
        </div>
      </header>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8 max-w-[1600px] mx-auto w-full"
      >
        <motion.div variants={cardVariant} className="flex flex-col gap-4">
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] shadow-xl flex-1 border-t-4 border-t-[var(--accent-purple)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">📊 Priority Ranking</h2>
            
            {subjects.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl min-h-[44px] flex items-center justify-center">
                No subjects added yet.
              </div>
            ) : (
              <div className="space-y-4">
              {subjects.map((sub, idx) => {
                const isRisk = atRisk.includes(sub.name);
                return (
                  <div key={sub.name} className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] flex flex-col relative group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--bg-hover)]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-muted)] text-sm font-mono font-bold">#{idx + 1}</span>
                        <span className="font-semibold text-[var(--text-primary)] truncate max-w-[120px]" title={sub.name}>{sub.name}</span>
                        {isRisk && (
                          <span className="pulse-badge w-2.5 h-2.5 rounded-full bg-[var(--accent-red)] shrink-0" title="At Risk! No recent completed sessions." />
                        )}
                      </div>
                      <div 
                        className={`px-2 py-0.5 rounded-md border text-xs font-bold font-mono cursor-help ${getScoreColor(sub.score)}`}
                        title="Score = (Difficulty × 0.7) + ((1 / Hours) × 3)"
                      >
                        <CountUp end={sub.score} />
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--bg-hover)] rounded-full overflow-hidden mt-1 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(sub.difficulty / 10) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-[var(--accent-purple)] absolute left-0"
                      />
                    </div>
                    <div 
                      className="absolute -right-3 -top-3 w-8 h-8 bg-[var(--bg-card)] rounded-full border border-[var(--border)] flex items-center justify-center cursor-help hover:bg-[var(--bg-hover)] hover:border-[var(--accent-amber)] transition-all text-sm shadow-md z-10"
                      onMouseEnter={() => handleHoverTip(sub.name, sub.difficulty)}
                    >
                      <span className="text-base text-center">💡</span>
                      {tips[sub.name] && (
                        <div className="absolute hidden group-hover:block bottom-full mb-2 right-0 w-64 p-3 bg-[var(--bg-card)] border border-[var(--accent-amber)]/50 rounded-xl shadow-2xl text-xs text-[var(--text-primary)] pointer-events-none z-50">
                          {tips[sub.name]}
                        </div>
                      )}
                      {loadingTip === sub.name && !tips[sub.name] && (
                        <div className="absolute hidden group-hover:block bottom-full mb-2 right-0 w-32 p-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl text-xs text-[var(--text-muted)] text-center z-50">
                          <span className="animate-pulse">Thinking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={cardVariant} className="flex flex-col gap-4">
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] shadow-xl flex-1 relative overflow-hidden border-t-4 border-t-[var(--accent-blue)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">📅 Today's Plan</h2>
            
            {allSessionsDone && todayData.sessions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-[var(--bg-card)]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-2xl font-bold text-[var(--accent-green)] mb-2">Day Complete!</h3>
                <p className="text-[var(--text-muted)] mb-6 text-sm">You successfully finished all scheduled blocks for today.</p>
                <motion.button 
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const store = useStudyStore.getState();
                    if (currentDay + 1 > plan.length) store.setCurrentPage('progress');
                    else store.setCurrentDay(currentDay + 1);
                  }}
                  className="min-h-[44px] bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[var(--accent-green)]/20 hover:opacity-90 transition-opacity"
                >
                  Move to Day {currentDay + 1} →
                </motion.button>
              </motion.div>
            )}

            <div className="space-y-3">
              {todayData.sessions.length === 0 ? (
                <div className="text-center py-12 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]/50 min-h-[44px] flex flex-col items-center justify-center">
                  <p className="text-3xl mb-3">🏖️</p>
                  <p>No active sessions today!</p>
                </div>
              ) : (
                todayData.sessions.map((session) => {
                  if (session.type === 'break') {
                    return (
                      <div key={session.id} className="bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/30 p-3 rounded-xl flex items-center justify-center gap-2 text-[var(--accent-amber)] font-medium text-sm">
                        ☕ Break — 15 min
                      </div>
                    );
                  }

                  const mins = Math.round(session.duration * 60);
                  const isLoadTarget = sessionActionState?.id === session.id;
                  const isSuccessFlash = isLoadTarget && sessionActionState?.success;
                  
                  return (
                    <motion.div 
                      key={session.id} 
                      animate={{ backgroundColor: isSuccessFlash ? 'rgba(34,197,94,0.1)' : 'var(--bg-secondary)' }}
                      transition={{ duration: 0.3 }}
                      className={`relative overflow-hidden pl-4 p-3.5 border border-[var(--border)] rounded-xl flex flex-col gap-3 transition-opacity ${
                        session.done ? 'opacity-60 saturate-50' : ''
                      }`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${session.done || isSuccessFlash ? 'bg-[var(--accent-green)]' : session.missed ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-blue)]'}`} />
                      
                      <div className="flex justify-between items-center pr-1">
                        <div>
                          <h4 className={`font-semibold ${session.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                            {session.subject}
                          </h4>
                          <span className="text-xs text-[var(--text-muted)]">{session.duration}h ({mins} min)</span>
                        </div>
                        <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-[var(--bg-card)] border ${
                          session.done ? 'text-[var(--accent-green)] border-[var(--accent-green)]/30' : 
                          session.missed ? 'text-[var(--accent-red)] border-[var(--accent-red)]/30' : 
                          'text-[var(--text-subtle)] border-[var(--border)]'
                        }`}>
                          {session.done ? '✅ Done' : session.missed ? '❌ Missed' : 'Pending'}
                        </div>
                      </div>

                      {!session.done && !session.missed && (
                        <div className="flex gap-2">
                          <motion.button 
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSessionActionWithDelay(session.id, session.subject, session.duration, true)}
                            disabled={isLoadTarget}
                            className="min-h-[44px] flex-1 bg-[var(--bg-hover)] hover:bg-[var(--accent-green)]/20 hover:text-[var(--accent-green)] hover:border-[var(--accent-green)]/40 border border-[var(--border)] py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center disabled:opacity-50"
                          >
                            {isLoadTarget && sessionActionState?.isDone ? (
                               <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            ) : 'Done ✓'}
                          </motion.button>
                          <motion.button 
                            whileTap={{ scale: 0.97, x: [-2, 2, -2, 2, 0] }}
                            onClick={() => handleSessionActionWithDelay(session.id, session.subject, session.duration, false)}
                            disabled={isLoadTarget}
                            className="min-h-[44px] flex-1 bg-[var(--bg-hover)] hover:bg-[var(--accent-red)]/20 hover:text-[var(--accent-red)] hover:border-[var(--accent-red)]/40 border border-[var(--border)] py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center disabled:opacity-50"
                          >
                            {isLoadTarget && !sessionActionState?.isDone ? (
                               <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            ) : 'Missed ✗'}
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariant} className="flex flex-col gap-4">
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] shadow-xl flex-1 flex flex-col border-t-4 border-t-[var(--accent-amber)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🤖 Morning Brief</h2>
            
            <div className="flex-1 bg-[var(--bg-secondary)] rounded-xl p-5 text-sm border border-[var(--border)] relative overflow-hidden flex flex-col justify-center">
              {briefLoading ? (
                <div className="space-y-4 animate-pulse w-full">
                  <div className="h-2 bg-[var(--border-hover)] rounded w-3/4"></div>
                  <div className="h-2 bg-[var(--border-hover)] rounded w-full"></div>
                  <div className="h-2 bg-[var(--border-hover)] rounded w-5/6"></div>
                  <div className="h-2 bg-[var(--border-hover)] rounded w-4/5 pt-4 mt-2"></div>
                </div>
              ) : aiBrief ? (
                <div className="space-y-4 text-sm leading-relaxed text-[var(--text-primary)]">
                  {aiBrief.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    let accentColor = 'border-[var(--border-hover)]';
                    if (trimmed.includes('🎯')) accentColor = 'border-[var(--accent-blue)]';
                    if (trimmed.includes('💡')) accentColor = 'border-[var(--accent-amber)]';
                    if (trimmed.includes('⚡')) accentColor = 'border-[var(--accent-purple)]';
                    if (trimmed.includes('⚠️')) accentColor = 'border-[var(--accent-red)]';

                    return (
                      <div key={i} className={`pl-3 border-l-2 ${accentColor} py-1`}>
                        {trimmed}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[var(--text-muted)] text-sm text-center">
                  {!CONFIG.GEMINI_API_KEY ? "Add your Gemini API key in config.js to enable the smart morning briefing." : "Start your day with a customized brief!"}
                </div>
              )}
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={fetchBrief}
              disabled={briefLoading}
              className="min-h-[44px] mt-4 w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-white transition-colors text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className={`w-4 h-4 ${briefLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {briefLoading ? 'Generating...' : 'Refresh Brief'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
