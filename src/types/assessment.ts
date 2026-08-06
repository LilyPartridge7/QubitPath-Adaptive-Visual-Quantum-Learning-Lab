import { QuizQuestion } from './adaptive';

export interface AssessmentResult {
  completedAt: number;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  answers: Record<string, string>; // questionId -> selectedOptionId
  misconceptionsTriggered: string[];
}

export interface ProgressMetrics {
  preAssessmentScore: number | null; // percentage 0-100
  postAssessmentScore: number | null; // percentage 0-100
  absoluteImprovement: number | null; // percentage points
  relativeImprovement: number | null; // % improvement
  modulesCompleted: string[]; // ['m1', 'm2', 'm3', 'm4']
  timeSpentSeconds: number; // total time spent
  isDemoData: boolean;
  lastActive: number;
}
