export type MisconceptionId =
  | 'AMPLITUDE_VS_PROBABILITY'
  | 'SUPERPOSITION_COLLAPSE_CONFUSION'
  | 'HADAMARD_ALWAYS_PLUS'
  | 'IGNORING_PHASE'
  | 'EXACT_HALF_HALF_SAMPLING'
  | 'ENTANGLEMENT_FTL'
  | 'CORRELATION_VS_CAUSATION'
  | 'CNOT_APPLICATION';

export interface Misconception {
  id: MisconceptionId;
  title: string;
  category: string;
  description: string;
  explanation: string;
  remedy: string;
  recommendedModuleId: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionId?: MisconceptionId;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  moduleId?: string;
  question: string;
  context?: string;
  options: QuizOption[];
  conceptualTopic: string;
}

export interface LearnerMisconceptionState {
  scores: Record<MisconceptionId, number>; // count of times triggered
  resolved: Record<MisconceptionId, boolean>;
  history: Array<{
    timestamp: number;
    questionId: string;
    selectedOptionId: string;
    misconceptionId?: MisconceptionId;
    isCorrect: boolean;
  }>;
}

export interface DiagnosticRecommendation {
  misconceptionId: MisconceptionId;
  title: string;
  description: string;
  remedy: string;
  targetModuleId: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
}
