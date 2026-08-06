import { describe, it, expect } from 'vitest';
import { AdaptiveEngine, INITIAL_MISCONCEPTION_STATE } from '../lib/adaptive/engine';
import { MISCONCEPTIONS } from '../lib/adaptive/misconceptions';

describe('AdaptiveEngine', () => {
  it('correctly records incorrect answers and increments misconception scores', () => {
    let state = INITIAL_MISCONCEPTION_STATE;
    state = AdaptiveEngine.evaluateAnswer(
      state,
      'q1',
      'opt-a',
      false,
      'AMPLITUDE_VS_PROBABILITY'
    );

    expect(state.scores['AMPLITUDE_VS_PROBABILITY']).toBe(1);
    expect(state.resolved['AMPLITUDE_VS_PROBABILITY']).toBe(false);
    expect(state.history.length).toBe(1);
  });

  it('marks misconceptions as resolved when answered correctly later', () => {
    let state = INITIAL_MISCONCEPTION_STATE;
    state = AdaptiveEngine.evaluateAnswer(
      state,
      'q1',
      'opt-a',
      false,
      'HADAMARD_ALWAYS_PLUS'
    );
    expect(state.scores['HADAMARD_ALWAYS_PLUS']).toBe(1);

    state = AdaptiveEngine.evaluateAnswer(
      state,
      'q2',
      'opt-b',
      true,
      'HADAMARD_ALWAYS_PLUS'
    );
    expect(state.resolved['HADAMARD_ALWAYS_PLUS']).toBe(true);
  });

  it('generates diagnostic recommendations sorted by priority', () => {
    let state = INITIAL_MISCONCEPTION_STATE;
    state = AdaptiveEngine.evaluateAnswer(state, 'q1', 'opt-a', false, 'AMPLITUDE_VS_PROBABILITY');
    state = AdaptiveEngine.evaluateAnswer(state, 'q2', 'opt-a', false, 'AMPLITUDE_VS_PROBABILITY'); // count = 2 -> HIGH urgency
    state = AdaptiveEngine.evaluateAnswer(state, 'q3', 'opt-a', false, 'IGNORING_PHASE'); // count = 1 -> MEDIUM urgency

    const recs = AdaptiveEngine.generateRecommendations(state);
    expect(recs.length).toBe(2);
    expect(recs[0].misconceptionId).toBe('AMPLITUDE_VS_PROBABILITY');
    expect(recs[0].urgency).toBe('HIGH');
    expect(recs[1].misconceptionId).toBe('IGNORING_PHASE');
    expect(recs[1].urgency).toBe('MEDIUM');
  });

  it('contains valid definitions for all registered misconceptions', () => {
    const keys = Object.keys(MISCONCEPTIONS);
    expect(keys.length).toBeGreaterThanOrEqual(8);
    keys.forEach(k => {
      const item = MISCONCEPTIONS[k as keyof typeof MISCONCEPTIONS];
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.explanation).toBeTruthy();
      expect(item.remedy).toBeTruthy();
    });
  });
});
