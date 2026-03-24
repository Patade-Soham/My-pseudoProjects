import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';

const formatTime = (startHourOffset) => {
  const startObj = new Date();
  startObj.setHours(9, 0, 0, 0); 
  startObj.setMinutes(startObj.getMinutes() + (startHourOffset * 60));
  return startObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function DailyPlan() {
  const { plan, subjects } = useStudyStore();
  const currentDay = useStudyStore(state => state.currentDay);
  
  const [selectedDay, setSelectedDay] = useState(
    plan.length === 0 ? 1 : (currentDay > plan.length ? plan.length : currentDay)
  );
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState(0);
  
  const tabsRef = useRef(null);

  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector('[data-active="true"]');
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDay]);

  const handleTabClick = (dayNum) => {
    if (dayNum === selectedDay) return;
    setDirection(dayNum > selectedDay ? 1 : -1);
    setSelectedDay(dayNum);
  };

  const getDayStatus = (dayNum) => {
    if (dayNum < currentDay) return 'completed';
    if (dayNum === currentDay) return 'current';
    return 'upcoming';
  };

  const getSubjectScore = (subName) => {
    const s = subjects.find(s => s.name === subName);
    return s ? s.score : null;
  };

  const totalDays = plan.length;
  const totalHours = plan.reduce((acc, d) => {
    return acc + d.sessions.reduce((sAcc, s) => s.type === 'study' ? sAcc + s.duration : sAcc, 0);
  }, 0);

  const selectedDayData = plan.find(d => d.day === selectedDay) || { sessions: [] };
  
  const dailyStudyHours = selectedDayData.sessions.filter(s => s.type !== 'break').reduce((acc, s) => acc + s.duration, 0);
  const dailyBreaks = selectedDayData.sessions.filter(s => s.type === 'break').length;
  const uniqueSubjects = new Set(selectedDayData.sessions.filter(s => s.type !== 'break').map(s => s.subject)).size;
  
  const completedCount = selectedDayData.sessions.filter(s => s.type !== 'break' && s.done).length;
  const studyCount = selectedDayData.sessions.filter(s => s.type !== 'break').length;
  const completionPercent = studyCount === 0 ? 0 : Math.round((completedCount / studyCount) * 100);

  const generatePlanText = () => {
    let text = `📅 SmartStudy Plan - ${totalDays} Days | ${totalHours.toFixed(1)} Hours\n\n`;
    plan.forEach(d => {
      text += `--- Day ${d.day} ---\n`;
      let timeOffset = 0;
      d.sessions.forEach(s => {
        const timeStr = formatTime(timeOffset);
        if (s.type === 'break') {
          text += `[${timeStr}] ☕ Break (${Math.round(s.duration * 60)}m)\n`;
        } else {
          text += `[${timeStr}] 📚 ${s.subject} (${s.duration}h)\n`;
        }
        timeOffset += s.duration;
      });
      text += '\n';
    });
    return text;
  };

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(generatePlanText());
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = generatePlanText();
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {}
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { staggerChildren: 0.1, duration: 0.3 } },
    exit: (dir) => ({ x: dir < 0 ? 40 : -40, opacity: 0, transition: { duration: 0.2 } })
  };

  const itemVariant = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
  };

  let currentOffset = 0;

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col pt-0 md:pt-4 overflow-x-hidden">
      
      <div className="w-full border-b border-[var(--border)] bg-[var(--bg-secondary)] overflow-x-auto custom-scrollbar">
        <div ref={tabsRef} className="flex px-4 md:px-8 py-4 gap-3 min-w-max">
          {plan.map((dayData) => {
            const status = getDayStatus(dayData.day);
            const isActive = selectedDay === dayData.day;
            
            let tabStyle = "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]";
            if (isActive) tabStyle = "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-[0_0_15px_rgba(59,130,246,0.3)]";
            else if (status === 'completed') tabStyle = "bg-[var(--bg-hover)] border-[var(--accent-green)]/30 text-[var(--text-muted)]";
            else if (status === 'current') tabStyle = "bg-[var(--bg-card)] border-[var(--accent-amber)] shadow-[0_0_8px_rgba(245,158,11,0.2)]";

            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={dayData.day}
                data-active={isActive}
                onClick={() => handleTabClick(dayData.day)}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border transition-all duration-300 font-semibold min-w-[120px] min-h-[44px] ${tabStyle}`}
              >
                {status === 'completed' && !isActive && <span className="text-[var(--accent-green)] font-extrabold">✓</span>}
                Day {dayData.day}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedDay}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="relative border-l-2 border-[var(--border-hover)] ml-[4.5rem] md:ml-32 mt-4 space-y-10 pb-4">
              {plan.length === 0 && (
                <div className="ml-8 text-[var(--text-muted)] flex items-center min-h-[44px]">No plan generated yet.</div>
              )}
              {selectedDayData.sessions.length === 0 && plan.length > 0 && (
                <div className="ml-8 text-[var(--text-muted)] flex items-center min-h-[44px]">No sessions scheduled for this day.</div>
              )}
              {selectedDayData.sessions.map((session) => {
                const timeStr = formatTime(currentOffset);
                currentOffset += session.duration;

                const isBreak = session.type === 'break';
                const isCompleted = session.done;
                const isMissed = session.missed;
                
                let dotColor = "bg-[var(--accent-blue)]";
                if (isBreak) dotColor = "bg-[var(--accent-amber)]";
                if (isCompleted) dotColor = "bg-[var(--accent-green)]";
                if (isMissed) dotColor = "bg-[var(--accent-red)]";

                const score = getSubjectScore(session.subject);
                
                return (
                  <motion.div variants={itemVariant} key={session.id} className="relative flex items-center group">
                    <div className="absolute -left-[5.5rem] md:-left-36 w-[4rem] md:w-28 text-right pr-2 mt-1">
                      <span className="text-xs md:text-sm font-mono font-bold text-[var(--text-subtle)] group-hover:text-[var(--text-muted)] transition-colors">{timeStr}</span>
                    </div>

                    <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-[3px] border-[var(--bg-primary)] shadow-sm ${dotColor} z-10 transition-transform group-hover:scale-125`} />

                    <div className="ml-6 md:ml-10 w-full max-w-xl">
                      {isBreak ? (
                        <div className="bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 p-4 rounded-2xl flex items-center gap-3 text-[var(--accent-amber)] font-medium text-sm transition-all hover:bg-[var(--accent-amber)]/20 hover:shadow-sm">
                           <span className="text-xl">☕</span> Rest — {Math.round(session.duration * 60)} mins
                        </div>
                      ) : (
                        <div className={`relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] p-4 md:p-5 rounded-2xl transition-all duration-300 ${
                          isCompleted ? 'opacity-50 saturate-50' : 
                          isMissed ? 'border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5' : 
                          'hover:border-[var(--accent-blue)]/40 hover:shadow-lg hover:shadow-[var(--accent-blue)]/5 hover:-translate-y-0.5'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-bold text-lg ${isCompleted ? 'line-through text-[var(--text-subtle)]' : 'text-[var(--text-primary)]'}`}>
                              {session.subject}
                            </h3>
                            {score !== null && (
                              <div title="Formula: (Difficulty × 0.7) + ((1 / Hours) × 3)" className="cursor-help text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] shadow-sm hover:border-[var(--accent-amber)] transition-colors">
                                ★ {score.toFixed(2)}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-[var(--accent-blue)]">{session.duration}h ({Math.round(session.duration * 60)}m)</span>
                            {isCompleted && <span className="text-[var(--accent-green)] flex items-center gap-1">✅ Done</span>}
                            {isMissed && <span className="text-[var(--accent-red)] flex items-center gap-1">❌ Missed</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariant} className="mt-8 ml-6 md:ml-[5.5rem] max-w-xl grid grid-cols-2 md:grid-cols-4 gap-0 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--border)] hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <span className="text-2xl font-black text-[var(--accent-blue)]">{dailyStudyHours.toFixed(1)}h</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase tracking-wider">Study Time</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <span className="text-2xl font-black text-[var(--accent-amber)]">{dailyBreaks}</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase tracking-wider">Breaks</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <span className="text-2xl font-black text-[var(--accent-purple)]">{uniqueSubjects}</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase tracking-wider">Subjects</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <span className="text-2xl font-black text-[var(--accent-green)]">{completionPercent}%</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] mt-1 uppercase tracking-wider">Completed</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="mt-12 ml-6 md:ml-[5.5rem] max-w-xl flex flex-col items-center md:items-start pb-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className="relative overflow-hidden group px-6 py-3 min-h-[44px] bg-[var(--bg-card)] border border-[var(--border)] rounded-xl font-bold text-[var(--text-muted)] hover:text-white hover:border-[var(--text-subtle)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto shadow-sm"
              >
                {copied ? (
                  <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[var(--accent-green)] flex items-center gap-2">
                    <span className="text-xl">✓</span> Plan Copied!
                  </motion.span>
                ) : (
                  <>
                    <span className="text-xl group-hover:scale-110 transition-transform">📋</span> 
                    <span>Copy Plan to Clipboard</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
