import { CONFIG } from '../../config.js';

/**
 * Generates a personalized morning briefing using Gemini API.
 * @param {Array<Object>} subjects - Array of ranked subjects {name, score, difficulty, hours}.
 * @param {Array<string>} atRisk - Array of at-risk subject names.
 * @param {number} currentDay - The current day number.
 * @returns {Promise<string>} The generated brief or a fallback string on error.
 */
export async function generateMorningBrief(subjects, atRisk, currentDay) {
  // If no key is set yet, return the fallback immediately (don't break the app)
  if (!CONFIG.GEMINI_API_KEY) {
    return "Stay focused. Prioritize your hardest subject first. You've got this.";
  }

  // Format subjects list
  const subjectsList = subjects
    .map(s => `${s.name} - score ${s.score} - ${s.difficulty}/10 difficulty - ${s.hours} hrs`)
    .join('\n');
  
  // Format atRisk list
  const atRiskList = atRisk && atRisk.length > 0 ? atRisk.join(', ') : 'None';

  const prompt = `You are an encouraging, smart study coach for a student.
Today is Day ${currentDay} of their study plan.

Their subjects ranked by priority:
${subjectsList}

At-risk subjects (not studied recently): ${atRiskList}

Give a personalized morning briefing in exactly this format:
🎯 FOCUS TODAY: [which subject and why - 1 sentence]
💡 SMART TIP: [one specific study technique for their hardest subject]
⚡ MOTIVATION: [one powerful, original motivational line - not cliche]
⚠️ WATCH OUT: [one warning about their at-risk subjects, or general advice if none]

Be specific, not generic. Max 4 lines total.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Gemini API Error in generateMorningBrief:", error);
    return "Stay focused. Prioritize your hardest subject first. You've got this.";
  }
}

/**
 * Generates a quick 1-sentence actionable study tip for a specific subject.
 * @param {string} subjectName - Name of the subject.
 * @param {number} difficulty - Difficulty rating of the subject (1-10).
 * @returns {Promise<string>} One specific actionable tip.
 */
export async function generateSubjectTip(subjectName, difficulty) {
  // Graceful fallback for missing config
  if (!CONFIG.GEMINI_API_KEY) {
    return `Break down your ${subjectName} study sessions into shorter intervals, using active recall.`;
  }

  const prompt = `Give one specific, actionable study tip for ${subjectName} with difficulty ${difficulty}/10. One sentence only. Be practical.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Gemini API Error in generateSubjectTip:", error);
    return `Use active recall flashcards for your ${subjectName} topics to improve memory retention.`;
  }
}
