import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getShuffledQuestions } from '../data/index.js';

const initialState = {
  // Navigation
  page: 'home', // 'home' | 'quiz' | 'results'

  // Current quiz
  categoryId: null,
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  showExplanation: false,
  answers: [], // {questionId, selectedOption, correct, timeMs}

  // Timer
  timeLeft: 30,
  timerActive: false,

  // Settings
  questionCount: 10,
  timeLimit: 30,

  // Persisted stats
  stats: {}, // { categoryId: { best: number, played: number, totalCorrect: number, totalQuestions: number } }

  // Last completed quiz (persisted for results page refresh)
  lastResult: null, // { categoryId, questions, answers, score, correct, total, isNewBest, finishedAt }
};

export const useQuizStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      goHome: () => set({ page: 'home', categoryId: null, questions: [], currentIndex: 0, answers: [], selectedAnswer: null, showExplanation: false, timerActive: false }),
      resetProgress: () =>
        set({
          ...initialState,
          questionCount: get().questionCount,
          timeLimit: get().timeLimit,
          page: 'home',
        }),

      // Start quiz
      startQuiz: (categoryId) => {
        const { questionCount, timeLimit } = get();
        const questions = getShuffledQuestions(categoryId, questionCount);
        set({
          page: 'quiz',
          categoryId,
          questions,
          currentIndex: 0,
          answers: [],
          selectedAnswer: null,
          showExplanation: false,
          timeLeft: timeLimit,
          timerActive: true,
        });
      },

      // Timer
      tickTimer: () => {
        const { timeLeft, timerActive } = get();
        if (!timerActive) return;
        if (timeLeft <= 1) {
          // Time up — auto-submit with no answer
          get().submitAnswer(-1);
        } else {
          set({ timeLeft: timeLeft - 1 });
        }
      },

      resetTimer: () => {
        set({ timeLeft: get().timeLimit, timerActive: true });
      },

      // Answer handling
      selectAnswer: (optionIndex) => {
        // Route all answer recording through submitAnswer so scoring stays consistent.
        get().submitAnswer(optionIndex);
      },

      submitAnswer: (optionIndex) => {
        const { questions, currentIndex, answers, timeLeft, timeLimit, selectedAnswer, showExplanation } = get();
        if (selectedAnswer !== null || showExplanation) return; // guard against double submit

        const question = questions[currentIndex];
        if (!question) return;
        const chosen = optionIndex === -1 ? null : optionIndex;
        const correct = chosen === question.correct;

        const answerRecord = {
          questionId: question.id,
          selectedOption: chosen,
          correct,
          timeMs: (timeLimit - timeLeft) * 1000,
        };

        set({
          selectedAnswer: chosen ?? -1,
          showExplanation: true,
          timerActive: false,
          answers: [...answers, answerRecord],
        });
      },

      // Next question or finish
      nextQuestion: () => {
        const { questions, currentIndex, timeLimit } = get();
        if (currentIndex + 1 >= questions.length) {
          // Quiz finished
          get().finishQuiz();
        } else {
          set({
            currentIndex: currentIndex + 1,
            selectedAnswer: null,
            showExplanation: false,
            timeLeft: timeLimit,
            timerActive: true,
          });
        }
      },

      finishQuiz: () => {
        const { categoryId, answers, questions, stats } = get();
        const correct = answers.filter((a) => a.correct).length;
        const total = answers.length;
        const score = total ? Math.round((correct / total) * 100) : 0;

        const prev = stats[categoryId] || { best: 0, played: 0, totalCorrect: 0, totalQuestions: 0 };
        const isNewBest = score > prev.best;
        const newStats = {
          ...stats,
          [categoryId]: {
            best: Math.max(prev.best, score),
            played: prev.played + 1,
            totalCorrect: prev.totalCorrect + correct,
            totalQuestions: prev.totalQuestions + total,
          },
        };

        set({
          page: 'results',
          timerActive: false,
          stats: newStats,
          lastResult: {
            categoryId,
            questions,
            answers,
            score,
            correct,
            total,
            isNewBest,
            finishedAt: Date.now(),
          },
        });
      },

      // Settings
      setQuestionCount: (n) => set({ questionCount: n }),
      setTimeLimit: (t) => set({ timeLimit: t }),

      // Computed helpers
      getScore: () => {
        const { answers } = get();
        const correct = answers.filter((a) => a.correct).length;
        return { correct, total: answers.length, pct: answers.length ? Math.round((correct / answers.length) * 100) : 0 };
      },
    }),
    {
      name: 'codequest-storage',
      partialize: (state) => ({
        stats: state.stats,
        questionCount: state.questionCount,
        timeLimit: state.timeLimit,
        lastResult: state.lastResult,
      }),
    }
  )
);
