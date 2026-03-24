import { rankSubjects } from './priorityEngine.js';
import { generatePlan } from './slotFiller.js';

/**
 * Replans the schedule by calculating remaining hours based on progress log.
 * Excludes fully completed subjects and generates a fresh plan from day 1.
 * 
 * @param {Array<Object>} subjects - Original array of subjects {name, difficulty, hours}.
 * @param {Array<Object>} progress - Progress log [{subjectName, duration, completed}].
 * @param {number} dailyHours - Maximum hours allowed per day.
 * @param {number} breakAfter - Maximum consecutive hours before a break.
 * @returns {Array<Object>} New plan array starting from day 1.
 */
export function replan(subjects, progress, dailyHours, breakAfter) {
  if (!Array.isArray(subjects) || subjects.length === 0) return [];

  // Calculate globally completed hours per subject
  const completedStats = {};
  if (Array.isArray(progress)) {
    progress.forEach(p => {
      if (p.completed && p.duration) {
        completedStats[p.subjectName] = (completedStats[p.subjectName] || 0) + p.duration;
      }
    });
  }

  // Calculate remaining hours and dynamically filter out fully completed
  const updatedSubjects = subjects.map(sub => {
    const comp = completedStats[sub.name] || 0;
    const remainingHours = Math.round((sub.hours - comp) * 100) / 100;
    return { ...sub, hours: remainingHours }; 
  }).filter(sub => sub.hours > 0);

  if (updatedSubjects.length === 0) return [];

  // Re-rank heavily adjusted partial subjects
  const ranked = rankSubjects(updatedSubjects);
  
  // Unroll deterministic replan entirely from day 1 mapping
  return generatePlan(ranked, dailyHours, breakAfter);
}
