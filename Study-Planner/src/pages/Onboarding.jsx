import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../store/useStudyStore';
import { rankSubjects } from '../logic/priorityEngine';
import { generatePlan } from '../logic/slotFiller';
import { detectAtRisk } from '../logic/atRiskDetector';
import { CONFIG } from '../../config';

const getDifficultyColor = (diff) => {
  if (diff <= 3) return 'text-[var(--accent-green)]';
  if (diff <= 6) return 'text-[var(--accent-amber)]';
  return 'text-[var(--accent-red)]';
};

export default function Onboarding() {
  const { setSubjects, setPlan, setAtRisk, setCurrentPage } = useStudyStore();
  
  const [rows, setRows] = useState([
    { id: '1', name: '', difficulty: 5, hours: '' },
    { id: '2', name: '', difficulty: 5, hours: '' },
    { id: '3', name: '', difficulty: 5, hours: '' },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validRows = rows.filter(r => r.name.trim() !== '' && Number(r.hours) > 0);
  const canGenerate = validRows.length >= 2;

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), name: '', difficulty: 5, hours: '' }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
    const newErrs = { ...errors };
    delete newErrs[id];
    setErrors(newErrs);
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
    if (errors[id]) {
      setErrors({ ...errors, [id]: null });
    }
  };

  const handleGenerate = () => {
    let newErrors = {};
    let hasError = false;
    
    const filledRows = rows.filter(r => r.name.trim() !== '' || r.hours !== '');
    
    filledRows.forEach(r => {
      if (r.name.trim() === '') {
        newErrors[r.id] = 'Name required';
        hasError = true;
      } else if (!r.hours || Number(r.hours) <= 0) {
        newErrors[r.id] = 'Hours > 0 required';
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (!canGenerate) return;

    setLoading(true);
    
    setTimeout(() => {
      const ranked = rankSubjects(validRows);
      const plan = generatePlan(ranked, CONFIG.DAILY_HOURS, CONFIG.BREAK_AFTER_HOURS);
      const atRisk = detectAtRisk(validRows, [], CONFIG.AT_RISK_DAYS);

      setSubjects(ranked);
      setPlan(plan);
      setAtRisk(atRisk);
      
      setLoading(false);
      setCurrentPage('dashboard');
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4 md:p-8 flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-4xl pt-8 pb-12">
        <header className="mb-12 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3">
              <span className="text-4xl md:text-5xl">🧠</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]" style={{ backgroundImage: 'var(--gradient-brand)' }}>
                SmartStudy
              </span>
            </h1>
            <p className="mt-3 text-lg text-[var(--text-muted)] tracking-wide">Study smarter, not longer</p>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent-blue)] opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none -z-10" />
        </header>

        <div className="bg-[var(--bg-card)] rounded-2xl p-6 md:p-8 border border-[var(--border)] shadow-xl relative overflow-hidden z-20">
          
          {rows.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)] flex items-center justify-center min-h-[44px]">
              <p>Add at least 2 subjects to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full pb-2">
              <div className="min-w-[600px] grid grid-cols-12 gap-4 text-sm font-semibold text-[var(--text-muted)] pb-4 border-b border-[var(--border)]">
                <div className="col-span-5 pl-2">Subject Name</div>
                <div className="col-span-4 text-center">Difficulty (1-10)</div>
                <div className="col-span-2 text-center">Hours</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mt-4 space-y-4 min-w-[600px]"
              >
                <AnimatePresence mode="popLayout">
                  {rows.map((row) => (
                    <motion.div 
                      key={row.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-12 gap-4 items-center bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                    >
                      <div className="col-span-5 relative">
                        <input
                          type="text"
                          placeholder="e.g. Mathematics"
                          value={row.name}
                          onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                          className="w-full min-h-[44px] bg-transparent text-[var(--text-primary)] border-b border-[var(--border)] focus:border-[var(--accent-blue)] outline-none px-2 py-2 transition-colors placeholder:text-[var(--text-subtle)]"
                        />
                        {errors[row.id] && row.name.trim() === '' && (
                          <span className="absolute -bottom-5 left-2 text-xs text-[var(--accent-red)]">{errors[row.id]}</span>
                        )}
                      </div>

                      <div className="col-span-4 flex items-center justify-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={row.difficulty}
                          onChange={(e) => updateRow(row.id, 'difficulty', parseInt(e.target.value))}
                          className="w-full h-2 md:h-3 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-blue)] outline-none min-h-[44px]"
                        />
                        <span className={`font-bold w-6 text-center ${getDifficultyColor(row.difficulty)} transition-colors`}>
                          {row.difficulty}
                        </span>
                      </div>

                      <div className="col-span-2 relative flex justify-center">
                        <input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={row.hours}
                          onChange={(e) => updateRow(row.id, 'hours', e.target.value)}
                          className="w-full max-w-[80px] min-h-[44px] text-center bg-transparent border-b border-[var(--border)] focus:border-[var(--accent-blue)] outline-none py-2 transition-colors"
                          placeholder="0.0"
                        />
                         {errors[row.id] && (!row.hours || Number(row.hours) <= 0) && row.name.trim() !== '' && (
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-[var(--accent-red)] w-full text-center whitespace-nowrap">{errors[row.id]}</span>
                        )}
                      </div>

                      <div className="col-span-1 flex justify-center">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeRow(row.id)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors rounded-full hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Delete subject"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={addRow}
              className="min-h-[44px] py-2 px-6 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] border-2 border-dashed border-[var(--border)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-all font-medium flex items-center gap-2"
            >
              <span>+</span> Add Subject
            </motion.button>
          </div>
        </div>

        <div className="mt-10 flex justify-center w-full relative z-20">
          <motion.div 
            animate={canGenerate && !loading ? { scale: [1, 1.02, 1] } : {}} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
            className="w-full md:w-auto"
          >
            <motion.button
              whileTap={{ scale: canGenerate && !loading ? 0.97 : 1 }}
              onClick={handleGenerate}
              disabled={!canGenerate || loading}
              className={`min-h-[60px] w-full md:w-auto py-4 px-12 rounded-xl text-white font-bold text-lg md:text-xl transition-all shadow-lg flex items-center justify-center gap-3 relative overflow-hidden group ${
                !canGenerate || loading
                  ? 'bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed shadow-none border border-[var(--border)]'
                  : 'hover:opacity-95 hover:shadow-[var(--accent-blue)]/20 border-none'
              }`}
              style={{
                backgroundImage: canGenerate && !loading ? 'var(--gradient-brand)' : 'none'
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Plan...</span>
                </>
              ) : (
                <>
                  <span>Generate My Plan</span>
                  <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
