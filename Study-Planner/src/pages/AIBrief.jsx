import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';
import { generateMorningBrief, generateSubjectTip } from '../services/geminiService';
import { replan } from '../logic/replanner';
import { detectAtRisk } from '../logic/atRiskDetector';
import { CONFIG } from '../../config';

export default function AIBrief() {
  const { 
    subjects, atRisk, plan, progress, currentDay,
    aiBrief, briefLoading, briefTimestamp,
    setCurrentPage, setAiBrief, setBriefLoading, setBriefTimestamp, setPlan, setAtRisk
  } = useStudyStore();

  const [tipsCache, setTipsCache] = useState({});
  const [loadingTipFor, setLoadingTipFor] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [timeAgo, setTimeAgo] = useState('Just now');

  useEffect(() => {
    if (!briefTimestamp) {
      setTimeAgo('Never');
      return;
    }

    const calcTime = () => {
      const diffMins = Math.floor((Date.now() - briefTimestamp) / 60000);
      if (diffMins <= 0) setTimeAgo('Just now');
      else setTimeAgo(`${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`);
    };
    
    calcTime();
    const interval = setInterval(calcTime, 60000);
    return () => clearInterval(interval);
  }, [briefTimestamp]);

  const handleRefreshBrief = async () => {
    setBriefLoading(true);
    const brief = await generateMorningBrief(subjects, atRisk, currentDay);
    setAiBrief(brief);
    setBriefTimestamp(Date.now());
    setBriefLoading(false);
  };

  const toggleAccordion = async (subjectName, difficulty) => {
    if (expandedSubject === subjectName) {
      setExpandedSubject(null);
      return;
    }
    setExpandedSubject(subjectName);
    
    if (!tipsCache[subjectName]) {
      setLoadingTipFor(subjectName);
      try {
        const tip = await generateSubjectTip(subjectName, difficulty);
        setTipsCache(prev => ({ ...prev, [subjectName]: tip }));
      } catch (e) {
        setTipsCache(prev => ({ ...prev, [subjectName]: "Unable to reach Gemini for a tip at this time. Focus on reviewing core definitions first!" }));
      }
      setLoadingTipFor(null);
    }
  };

  const handleReplan = () => {
    const newPlan = replan(subjects, progress, CONFIG.DAILY_HOURS, CONFIG.BREAK_AFTER_HOURS);
    setPlan(newPlan);
    const updatedRisk = detectAtRisk(subjects, progress, CONFIG.AT_RISK_DAYS);
    setAtRisk(updatedRisk);
    setCurrentPage('dashboard');
  };

  const getSectionStyle = (line) => {
    if (line.includes('🎯')) return { bg: 'bg-[var(--accent-blue)]/10', border: 'border-[var(--accent-blue)]/40', icon: '🎯', label: 'FOCUS TODAY', text: line.split(/FOCUS TODAY:?/i)[1]?.trim() || line.replace('🎯', '').trim() };
    if (line.includes('💡')) return { bg: 'bg-[var(--accent-amber)]/10', border: 'border-[var(--accent-amber)]/40', icon: '💡', label: 'SMART TIP', text: line.split(/SMART TIP:?/i)[1]?.trim() || line.replace('💡', '').trim() };
    if (line.includes('⚡')) return { bg: 'bg-[var(--accent-purple)]/10', border: 'border-[var(--accent-purple)]/40', icon: '⚡', label: 'MOTIVATION', text: line.split(/MOTIVATION:?/i)[1]?.trim() || line.replace('⚡', '').trim() };
    if (line.includes('⚠️') || line.includes('WATCH OUT')) return { bg: 'bg-[var(--accent-red)]/10', border: 'border-[var(--accent-red)]/40', icon: '⚠️', label: 'WATCH OUT', text: line.split(/WATCH OUT:?/i)[1]?.trim() || line.replace('⚠️', '').trim() };
    return null;
  };

  const briefSections = aiBrief ? aiBrief.split('\n').map(line => line.trim()).filter(line => line.length > 0).map(getSectionStyle).filter(Boolean) : [];

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] pt-4 md:pt-8 flex flex-col items-center overflow-x-hidden">
      
      <div className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 space-y-10">
        
        {atRisk.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--accent-red)]/10 border-2 border-[var(--accent-red)]/30 rounded-2xl p-6 shadow-sm overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-red)]/20 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-[var(--accent-red)] mb-4 flex items-center gap-2">
              <span className="text-xl">⚠️</span> {atRisk.length} {atRisk.length === 1 ? 'Subject needs' : 'Subjects need'} attention
            </h3>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">You haven't completed tracking blocks recently for:</p>
            <ul className="list-disc pl-5 mb-6 text-sm text-[var(--text-muted)] font-medium">
              {atRisk.map(sub => <li key={sub}>{sub}</li>)}
            </ul>
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={handleReplan}
              className="min-h-[44px] w-full bg-[var(--accent-red)] hover:bg-[var(--accent-red)]/80 border border-[var(--accent-red)]/50 text-white font-bold py-3 rounded-xl shadow-lg shadow-[var(--accent-red)]/20 transition-all flex items-center justify-center gap-2"
            >
              Replan Now →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 rounded-2xl p-5 shadow-sm flex items-center gap-4 text-[var(--accent-green)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
          >
            <span className="text-2xl">✅</span>
            <p className="font-bold">You're on track! Keep going strong.</p>
          </motion.div>
        )}

        <motion.div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Morning Briefing</h2>
            <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-hover)] px-2 py-1 rounded border border-[var(--border)] shadow-sm">
              {timeAgo}
            </span>
          </div>

          <div className="min-h-[200px]">
            {briefLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-[var(--border-hover)] bg-[var(--bg-secondary)] min-h-[44px]">
                    <div className="w-8 h-8 rounded-full bg-[var(--border-hover)] shrink-0"></div>
                    <div className="space-y-2 flex-1 pt-1">
                      <div className="h-4 bg-[var(--border-hover)] rounded w-1/4"></div>
                      <div className="h-3 bg-[var(--border-hover)] rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : briefSections.length > 0 ? (
              <motion.div variants={staggerVariants} initial="hidden" animate="show" className="space-y-4">
                {briefSections.map((sec, idx) => (
                  <motion.div 
                    variants={itemVariant}
                    key={idx} 
                    className={`flex gap-4 p-4 rounded-xl border ${sec.bg} ${sec.border} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-opacity-80`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-card)] shadow-sm shrink-0 border border-[var(--border)] text-lg">
                      {sec.icon}
                    </div>
                    <div className="flex-1 py-0.5">
                      <h4 className="text-[10px] uppercase font-black tracking-wider text-[var(--text-muted)] mb-1">{sec.label}</h4>
                      <p className="text-sm md:text-base font-medium leading-relaxed">{sec.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center text-[var(--text-muted)]">
                <p className="mb-2">No brief gathered yet.</p>
                {!CONFIG.GEMINI_API_KEY && <p className="text-xs text-[var(--accent-red)]">Missing Gemini API Key.</p>}
              </div>
            )}
          </div>

          <div className="mt-8">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={handleRefreshBrief}
              disabled={briefLoading}
              className="min-h-[44px] w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)]/50 transition-all text-sm font-semibold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <svg className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] transition-transform group-hover:rotate-180 ${briefLoading ? 'animate-spin group-hover:rotate-0' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {briefLoading ? 'Generating...' : 'Refresh Morning Brief'}
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h2 className="text-xl font-bold mb-6">Quick Tips by Subject</h2>
          <div className="space-y-3">
            {subjects.length === 0 ? (
              <p className="text-center text-[var(--text-muted)] py-4 text-sm border-2 border-dashed border-[var(--border)] rounded-xl min-h-[44px] flex items-center justify-center">No subjects available.</p>
            ) : (
              subjects.map(sub => {
                const isExpanded = expandedSubject === sub.name;
                const isLoading = loadingTipFor === sub.name;
                const tip = tipsCache[sub.name];

                return (
                  <div key={sub.name} className={`border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[var(--accent-amber)] shadow-md' : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--border-hover)]'}`}>
                    <button 
                      onClick={() => toggleAccordion(sub.name, sub.difficulty)}
                      className="w-full flex items-center justify-between p-4 bg-transparent outline-none min-h-[44px]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-left">{sub.name}</span>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                          Diff {sub.difficulty}
                        </span>
                      </div>
                      <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[var(--text-muted)] text-sm">
                        ▼
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-[var(--bg-card)]/50"
                        >
                          <div className="p-4 pt-0 border-t border-[var(--border)]/50 mt-1">
                            {isLoading ? (
                              <div className="flex items-center gap-3 text-[var(--text-muted)] text-sm py-2">
                                <div className="w-4 h-4 border-2 border-[var(--border)] border-t-[var(--accent-amber)] rounded-full animate-spin"></div>
                                <span>Generating personalized tip...</span>
                              </div>
                            ) : (
                              <div className="flex gap-3 items-start py-2">
                                <span className="text-lg leading-none mt-0.5">💡</span>
                                <p className="text-sm font-medium leading-relaxed italic text-[var(--text-primary)]">
                                  {tip}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
