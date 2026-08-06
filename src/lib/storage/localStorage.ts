import { ProgressMetrics } from '../../types/assessment';
import { LearnerMisconceptionState } from '../../types/adaptive';
import { INITIAL_MISCONCEPTION_STATE } from '../adaptive/engine';

const PROGRESS_STORAGE_KEY = 'qubitpath_learner_progress_v1';
const MISCONCEPTION_STORAGE_KEY = 'qubitpath_misconception_state_v1';

export const INITIAL_PROGRESS: ProgressMetrics = {
  preAssessmentScore: null,
  postAssessmentScore: null,
  absoluteImprovement: null,
  relativeImprovement: null,
  modulesCompleted: [],
  timeSpentSeconds: 0,
  isDemoData: false,
  lastActive: Date.now(),
};

export class StorageService {
  public static loadProgress(): ProgressMetrics {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!data) return INITIAL_PROGRESS;
      return JSON.parse(data);
    } catch {
      return INITIAL_PROGRESS;
    }
  }

  public static saveProgress(progress: ProgressMetrics): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }

  public static loadMisconceptions(): LearnerMisconceptionState {
    try {
      const data = localStorage.getItem(MISCONCEPTION_STORAGE_KEY);
      if (!data) return INITIAL_MISCONCEPTION_STATE;
      return JSON.parse(data);
    } catch {
      return INITIAL_MISCONCEPTION_STATE;
    }
  }

  public static saveMisconceptions(state: LearnerMisconceptionState): void {
    try {
      localStorage.setItem(MISCONCEPTION_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save misconception state to localStorage', e);
    }
  }

  public static resetProgress(): void {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      localStorage.removeItem(MISCONCEPTION_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset progress', e);
    }
  }

  public static loadDemoData(): { progress: ProgressMetrics; misconceptions: LearnerMisconceptionState } {
    const demoProgress: ProgressMetrics = {
      preAssessmentScore: 37.5, // 3/8
      postAssessmentScore: 87.5, // 7/8
      absoluteImprovement: 50.0, // 50 percentage points
      relativeImprovement: 133.3, // % improvement
      modulesCompleted: ['m1', 'm2', 'm3', 'm4'],
      timeSpentSeconds: 1420, // ~23 mins
      isDemoData: true,
      lastActive: Date.now(),
    };

    const demoMisconceptions: LearnerMisconceptionState = {
      scores: {
        AMPLITUDE_VS_PROBABILITY: 2,
        SUPERPOSITION_COLLAPSE_CONFUSION: 1,
        HADAMARD_ALWAYS_PLUS: 1,
        IGNORING_PHASE: 2,
        EXACT_HALF_HALF_SAMPLING: 0,
        ENTANGLEMENT_FTL: 1,
        CORRELATION_VS_CAUSATION: 0,
        CNOT_APPLICATION: 0,
      },
      resolved: {
        AMPLITUDE_VS_PROBABILITY: true,
        SUPERPOSITION_COLLAPSE_CONFUSION: true,
        HADAMARD_ALWAYS_PLUS: true,
        IGNORING_PHASE: false,
        EXACT_HALF_HALF_SAMPLING: false,
        ENTANGLEMENT_FTL: true,
        CORRELATION_VS_CAUSATION: false,
        CNOT_APPLICATION: false,
      },
      history: [
        { timestamp: Date.now() - 3600000, questionId: 'pre-q1', selectedOptionId: 'opt-a', misconceptionId: 'AMPLITUDE_VS_PROBABILITY', isCorrect: false },
        { timestamp: Date.now() - 3000000, questionId: 'pre-q3', selectedOptionId: 'opt-a', misconceptionId: 'HADAMARD_ALWAYS_PLUS', isCorrect: false },
        { timestamp: Date.now() - 1200000, questionId: 'post-q1', selectedOptionId: 'opt-b', misconceptionId: 'AMPLITUDE_VS_PROBABILITY', isCorrect: true },
        { timestamp: Date.now() - 600000, questionId: 'post-q3', selectedOptionId: 'opt-b', misconceptionId: 'HADAMARD_ALWAYS_PLUS', isCorrect: true },
      ],
    };

    StorageService.saveProgress(demoProgress);
    StorageService.saveMisconceptions(demoMisconceptions);

    return { progress: demoProgress, misconceptions: demoMisconceptions };
  }
}
