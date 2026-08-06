import { MisconceptionId, LearnerMisconceptionState, DiagnosticRecommendation } from '../../types/adaptive';
import { MISCONCEPTIONS } from './misconceptions';

export const INITIAL_MISCONCEPTION_STATE: LearnerMisconceptionState = {
  scores: {
    AMPLITUDE_VS_PROBABILITY: 0,
    SUPERPOSITION_COLLAPSE_CONFUSION: 0,
    HADAMARD_ALWAYS_PLUS: 0,
    IGNORING_PHASE: 0,
    EXACT_HALF_HALF_SAMPLING: 0,
    ENTANGLEMENT_FTL: 0,
    CORRELATION_VS_CAUSATION: 0,
    CNOT_APPLICATION: 0,
  },
  resolved: {
    AMPLITUDE_VS_PROBABILITY: false,
    SUPERPOSITION_COLLAPSE_CONFUSION: false,
    HADAMARD_ALWAYS_PLUS: false,
    IGNORING_PHASE: false,
    EXACT_HALF_HALF_SAMPLING: false,
    ENTANGLEMENT_FTL: false,
    CORRELATION_VS_CAUSATION: false,
    CNOT_APPLICATION: false,
  },
  history: [],
};

export class AdaptiveEngine {
  public static evaluateAnswer(
    state: LearnerMisconceptionState,
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean,
    misconceptionId?: MisconceptionId
  ): LearnerMisconceptionState {
    const nextState: LearnerMisconceptionState = {
      scores: { ...state.scores },
      resolved: { ...state.resolved },
      history: [
        ...state.history,
        {
          timestamp: Date.now(),
          questionId,
          selectedOptionId,
          misconceptionId,
          isCorrect,
        },
      ],
    };

    if (!isCorrect && misconceptionId) {
      nextState.scores[misconceptionId] = (nextState.scores[misconceptionId] || 0) + 1;
      nextState.resolved[misconceptionId] = false;
    } else if (isCorrect && misconceptionId) {
      // If answered correctly on a concept previously triggered, mark as improving
      if (nextState.scores[misconceptionId] > 0) {
        nextState.resolved[misconceptionId] = true;
      }
    }

    return nextState;
  }

  public static generateRecommendations(state: LearnerMisconceptionState): DiagnosticRecommendation[] {
    const recommendations: DiagnosticRecommendation[] = [];

    const keys = Object.keys(state.scores) as MisconceptionId[];
    for (const key of keys) {
      const count = state.scores[key];
      const isResolved = state.resolved[key];

      if (count > 0 && !isResolved) {
        const info = MISCONCEPTIONS[key];
        const urgency = count >= 2 ? 'HIGH' : 'MEDIUM';

        recommendations.push({
          misconceptionId: key,
          title: info.title,
          description: info.description,
          remedy: info.remedy,
          targetModuleId: info.recommendedModuleId,
          urgency,
        });
      }
    }

    // Sort by urgency HIGH first
    return recommendations.sort((a, b) => (a.urgency === 'HIGH' ? -1 : 1));
  }
}
