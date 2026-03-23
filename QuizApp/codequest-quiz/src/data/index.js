import { pythonQuestions } from './questions/python.js';
import { webdevQuestions } from './questions/webdev.js';
import { cybersecurityQuestions } from './questions/cybersecurity.js';
import { aimlQuestions } from './questions/aiml.js';
import { networkingQuestions } from './questions/networking.js';

export const categories = [
  {
    id: 'python',
    name: 'Python',
    icon: 'PY',
    description: 'Variables, data structures, OOP, decorators, and more',
    color: '#3776AB',
    gradient: 'from-blue-600 to-cyan-500',
    questions: pythonQuestions,
    topics: ['Basics', 'Data Structures', 'OOP', 'Functional', 'Libraries'],
  },
  {
    id: 'webdev',
    name: 'Web Dev',
    icon: 'WEB',
    description: 'HTML, CSS, JavaScript, and React fundamentals',
    color: '#F7DF1E',
    gradient: 'from-yellow-500 to-orange-500',
    questions: webdevQuestions,
    topics: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'SEC',
    description: 'Web security, network defense, and ethical hacking',
    color: '#EF4444',
    gradient: 'from-red-600 to-rose-500',
    questions: cybersecurityQuestions,
    topics: ['Web Security', 'Network Security', 'Threats', 'Auth'],
  },
  {
    id: 'aiml',
    name: 'AI / ML',
    icon: 'AI',
    description: 'Machine learning, neural networks, and deep learning',
    color: '#8B5CF6',
    gradient: 'from-violet-600 to-purple-500',
    questions: aimlQuestions,
    topics: ['ML Basics', 'Neural Networks', 'Algorithms', 'Concepts'],
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'NET',
    description: 'OSI model, TCP/IP, protocols, and subnetting',
    color: '#10B981',
    gradient: 'from-emerald-600 to-teal-500',
    questions: networkingQuestions,
    topics: ['OSI Model', 'TCP/IP', 'Protocols', 'IP Addressing'],
  },
];

export const allQuestions = [
  ...pythonQuestions,
  ...webdevQuestions,
  ...cybersecurityQuestions,
  ...aimlQuestions,
  ...networkingQuestions,
];

export function getQuestionsByCategory(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? category.questions : [];
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleQuestionOptions(question) {
  const indexed = question.options.map((option, idx) => ({ option, originalIndex: idx }));
  const shuffled = shuffleArray(indexed);
  const newCorrect = shuffled.findIndex((item) => item.originalIndex === question.correct);

  return {
    ...question,
    options: shuffled.map((item) => item.option),
    correct: newCorrect,
  };
}

export function getShuffledQuestions(categoryId, count = 10) {
  const questions = getQuestionsByCategory(categoryId);
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions
    .slice(0, Math.min(count, shuffledQuestions.length))
    .map((question) => shuffleQuestionOptions(question));
}
