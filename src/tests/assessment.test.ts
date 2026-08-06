import { describe, it, expect } from 'vitest';
import { PRE_ASSESSMENT_QUESTIONS, POST_ASSESSMENT_QUESTIONS } from '../lib/assessment/questions';

describe('Assessment Question Banks', () => {
  it('pre-assessment contains exactly 8 questions with unique IDs and valid correct answers', () => {
    expect(PRE_ASSESSMENT_QUESTIONS.length).toBe(8);
    PRE_ASSESSMENT_QUESTIONS.forEach(q => {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.options.length).toBe(4);
      const correctCount = q.options.filter(o => o.isCorrect).length;
      expect(correctCount).toBe(1);
    });
  });

  it('post-assessment contains exactly 8 questions testing comparable concepts', () => {
    expect(POST_ASSESSMENT_QUESTIONS.length).toBe(8);
    POST_ASSESSMENT_QUESTIONS.forEach(q => {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.options.length).toBe(4);
      const correctCount = q.options.filter(o => o.isCorrect).length;
      expect(correctCount).toBe(1);
    });
  });
});
