/**
 * Calculates the priority score for a subject.
 * Score = (difficulty * 0.7) + ((1 / hours) * 3)
 * @param {Object} subject - The subject object.
 * @param {string} subject.name - The name of the subject.
 * @param {number} subject.difficulty - Difficulty rating (1-10).
 * @param {number} subject.hours - Hours required.
 * @returns {number} The calculated score rounded to 2 decimal places.
 */
export function calculateScore(subject) {
  if (!subject.hours || subject.hours <= 0) return 0;
  const score = (subject.difficulty * 0.7) + ((1 / subject.hours) * 3);
  return Math.round(score * 100) / 100;
}

/**
 * Ranks subjects based on their priority score.
 * Skip subjects with hours <= 0.
 * @param {Array<Object>} subjects - Array of subject objects.
 * @returns {Array<Object>} New array of subjects sorted by score descending, with 'score' added.
 */
export function rankSubjects(subjects) {
  if (!Array.isArray(subjects) || subjects.length === 0) return [];
  
  return subjects
    .filter(sub => sub.hours > 0)
    .map(sub => ({
      ...sub,
      score: calculateScore(sub)
    }))
    .sort((a, b) => b.score - a.score);
}
