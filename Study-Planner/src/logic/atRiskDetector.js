/**
 * Detects subjects that are "at risk" due to neglect.
 * A subject is at risk if it has 0 completed sessions in the last 'atRiskDays' days.
 * 
 * @param {Array<Object>} subjects - The total list of subjects [{name, ...}].
 * @param {Array<Object>} progress - The progress log [{subjectName, date, completed}].
 * @param {number} atRiskDays - Number of days threshold.
 * @returns {Array<string>} Array of at-risk subject names.
 */
export function detectAtRisk(subjects, progress, atRiskDays) {
  if (!Array.isArray(subjects) || subjects.length === 0) return [];
  const subjectNames = subjects.map(s => s.name);

  if (!Array.isArray(progress) || progress.length === 0) {
    return subjectNames; // All dynamically at risk if absolutely no progress
  }

  const now = new Date();
  const thresholdTime = now.getTime() - (atRiskDays * 24 * 60 * 60 * 1000);

  // Consider progress entries that were officially completed at least within threshold
  const recentCompletedProgress = progress.filter(p => {
    return p.completed && new Date(p.date).getTime() >= thresholdTime;
  });

  const recentCompletedNames = new Set(recentCompletedProgress.map(p => p.subjectName));

  const atRisk = subjectNames.filter(name => !recentCompletedNames.has(name));
  return atRisk;
}
