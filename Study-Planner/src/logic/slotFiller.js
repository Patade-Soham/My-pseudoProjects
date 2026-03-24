/**
 * Generates a multi-day study plan from ranked subjects.
 * Uses a greedy algorithm to fill slots up to dailyHours per day,
 * inserting a break of 0.25h after 'breakAfter' continuous study hours.
 * 
 * @param {Array<Object>} rankedSubjects - Array of subjects with {name, hours}.
 * @param {number} dailyHours - Maximum hours allowed per day.
 * @param {number} breakAfter - Maximum consecutive hours before a break is strictly inserted.
 * @returns {Array<Object>} Array of day objects containing session lists.
 */
export function generatePlan(rankedSubjects, dailyHours, breakAfter) {
  if (!Array.isArray(rankedSubjects) || rankedSubjects.length === 0) return [];

  const plan = [];
  let currentDay = 1;
  let currentDayHours = 0;
  let continuousStudyHours = 0;
  let currentSessions = [];
  let sessionIndex = 0;

  // Clone subject hours to safely mutate remaining hours
  let subjectsQueue = rankedSubjects.map(s => ({ ...s, remaining: s.hours }));
  subjectsQueue = subjectsQueue.filter(s => s.remaining > 0);

  if (subjectsQueue.length === 0) return [];

  let currentSubjectIdx = 0;

  while (currentSubjectIdx < subjectsQueue.length) {
    const subject = subjectsQueue[currentSubjectIdx];

    // Check if we need to insert a mandatory break
    if (continuousStudyHours > 0 && continuousStudyHours >= breakAfter) {
      if (currentDayHours + 0.25 <= dailyHours) {
        currentSessions.push({
          id: `break_day${currentDay}_${sessionIndex++}`,
          subject: "Break",
          duration: 0.25,
          type: "break",
          done: false,
          missed: false
        });
        currentDayHours = Math.round((currentDayHours + 0.25) * 100) / 100;
        continuousStudyHours = 0; // Reset after break
      } else {
        // Break doesn't fit today, step to the next day
        plan.push({ day: currentDay, sessions: currentSessions });
        currentDay++;
        currentSessions = [];
        currentDayHours = 0;
        continuousStudyHours = 0;
        sessionIndex = 0;
        continue;
      }
    }

    const availableToday = Math.round((dailyHours - currentDayHours) * 100) / 100;
    
    // Day strictly full? Go to next day
    if (availableToday <= 0) {
      plan.push({ day: currentDay, sessions: currentSessions });
      currentDay++;
      currentSessions = [];
      currentDayHours = 0;
      continuousStudyHours = 0;
      sessionIndex = 0;
      continue;
    }

    const availableBeforeBreak = Math.round((breakAfter - continuousStudyHours) * 100) / 100;

    // Minimum chunk between actual remaining capability, space before break, and today's limit.
    let allocation = Math.min(
      subject.remaining,
      availableToday,
      availableBeforeBreak > 0 ? availableBeforeBreak : breakAfter
    );

    allocation = Math.round(allocation * 100) / 100;

    if (allocation > 0) {
      currentSessions.push({
        id: `${subject.name.replace(/\\s+/g, '_').toLowerCase()}_day${currentDay}_${sessionIndex++}`,
        subject: subject.name,
        duration: allocation,
        type: "study",
        done: false,
        missed: false
      });

      subject.remaining = Math.round((subject.remaining - allocation) * 100) / 100;
      currentDayHours = Math.round((currentDayHours + allocation) * 100) / 100;
      continuousStudyHours = Math.round((continuousStudyHours + allocation) * 100) / 100;
    }

    if (subject.remaining <= 0) {
      currentSubjectIdx++;
    }
  }

  // Push final leftover day if any sessions exist
  if (currentSessions.length > 0) {
    plan.push({ day: currentDay, sessions: currentSessions });
  }

  return plan;
}
