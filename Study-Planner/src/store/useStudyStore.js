import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStudyStore = create(subscribeWithSelector((set, get) => ({
  subjects: [],
  plan: [],
  progress: [],
  atRisk: [],
  aiBrief: "",
  briefTimestamp: null,
  briefLoading: false,
  currentDay: 1,
  currentPage: "onboarding",

  setSubjects: (subjects) => set({ subjects }),
  setPlan: (plan) => set({ plan }),
  setProgress: (progress) => set({ progress }),
  setAtRisk: (atRisk) => set({ atRisk }),
  setAiBrief: (aiBrief) => set({ aiBrief }),
  setBriefTimestamp: (briefTimestamp) => set({ briefTimestamp }),
  setBriefLoading: (briefLoading) => set({ briefLoading }),
  setCurrentDay: (currentDay) => set({ currentDay }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  saveToStorage: () => {
    try {
      if (typeof window !== 'undefined') {
        const state = get();
        localStorage.setItem('ssp_subjects', JSON.stringify(state.subjects));
        localStorage.setItem('ssp_plan', JSON.stringify(state.plan));
        localStorage.setItem('ssp_progress', JSON.stringify(state.progress));
        localStorage.setItem('ssp_atRisk', JSON.stringify(state.atRisk));
        localStorage.setItem('ssp_currentDay', JSON.stringify(state.currentDay));
        localStorage.setItem('ssp_aiBrief', JSON.stringify(state.aiBrief));
        localStorage.setItem('ssp_briefTimestamp', JSON.stringify(state.briefTimestamp));
      }
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  },

  loadFromStorage: () => {
    if (typeof window === 'undefined') return;

    const safeParse = (key, fallback) => {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error(`Failed to parse ${key} from localStorage:`, e);
        return fallback;
      }
    };

    const loadedState = {};
    
    const subjects = safeParse('ssp_subjects', null);
    if (subjects !== null) loadedState.subjects = subjects;

    const plan = safeParse('ssp_plan', null);
    if (plan !== null) loadedState.plan = plan;

    const progress = safeParse('ssp_progress', null);
    if (progress !== null) loadedState.progress = progress;

    const atRisk = safeParse('ssp_atRisk', null);
    if (atRisk !== null) loadedState.atRisk = atRisk;

    const currentDay = safeParse('ssp_currentDay', null);
    if (currentDay !== null) loadedState.currentDay = currentDay;

    const aiBrief = safeParse('ssp_aiBrief', null);
    if (aiBrief !== null) loadedState.aiBrief = aiBrief;

    const briefTimestamp = safeParse('ssp_briefTimestamp', null);
    if (briefTimestamp !== null) loadedState.briefTimestamp = briefTimestamp;

    if (Object.keys(loadedState).length > 0) {
      set(loadedState);
    }
  },

  clearAll: () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ssp_subjects');
        localStorage.removeItem('ssp_plan');
        localStorage.removeItem('ssp_progress');
        localStorage.removeItem('ssp_atRisk');
        localStorage.removeItem('ssp_currentDay');
        localStorage.removeItem('ssp_aiBrief');
        localStorage.removeItem('ssp_briefTimestamp');
      }
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }

    set({
      subjects: [],
      plan: [],
      progress: [],
      atRisk: [],
      aiBrief: "",
      briefTimestamp: null,
      briefLoading: false,
      currentDay: 1,
      currentPage: "onboarding"
    });
  }
})));

if (typeof window !== 'undefined') {
  const store = useStudyStore;
  const saveCmd = () => store.getState().saveToStorage();

  // Set up auto-saving triggers via Zustand's subscribeWithSelector hooks
  store.subscribe(state => state.subjects, saveCmd);
  store.subscribe(state => state.plan, saveCmd);
  store.subscribe(state => state.progress, saveCmd);
  store.subscribe(state => state.atRisk, saveCmd);
  store.subscribe(state => state.currentDay, saveCmd);
  store.subscribe(state => state.aiBrief, saveCmd);
  store.subscribe(state => state.briefTimestamp, saveCmd);
}
