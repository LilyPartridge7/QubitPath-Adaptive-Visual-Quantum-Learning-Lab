import { describe, it, expect, beforeEach } from 'vitest';
import { QuantumSimulator } from '../lib/quantum/simulator';
import { complex, isEqual, magnitudeSq } from '../lib/quantum/complex';

describe('QuantumSimulator', () => {
  let sim1: QuantumSimulator;
  let sim2: QuantumSimulator;

  beforeEach(() => {
    sim1 = new QuantumSimulator(1);
    sim2 = new QuantumSimulator(2);
  });

  it('initializes single qubit in |0⟩ state', () => {
    const sv = sim1.getStateVector();
    expect(isEqual(sv[0], complex(1, 0))).toBe(true);
    expect(isEqual(sv[1], complex(0, 0))).toBe(true);
    const probs = sim1.getProbabilities();
    expect(probs[0]).toBeCloseTo(1.0);
    expect(probs[1]).toBeCloseTo(0.0);
  });

  it('transforms X|0⟩ = |1⟩', () => {
    sim1.applyGate('X', 0);
    const sv = sim1.getStateVector();
    expect(isEqual(sv[0], complex(0, 0))).toBe(true);
    expect(isEqual(sv[1], complex(1, 0))).toBe(true);
    const probs = sim1.getProbabilities();
    expect(probs[0]).toBeCloseTo(0.0);
    expect(probs[1]).toBeCloseTo(1.0);
  });

  it('transforms H|0⟩ = |+⟩', () => {
    sim1.applyGate('H', 0);
    const sv = sim1.getStateVector();
    const invSqrt2 = 1 / Math.SQRT2;
    expect(isEqual(sv[0], complex(invSqrt2, 0))).toBe(true);
    expect(isEqual(sv[1], complex(invSqrt2, 0))).toBe(true);
    const probs = sim1.getProbabilities();
    expect(probs[0]).toBeCloseTo(0.5);
    expect(probs[1]).toBeCloseTo(0.5);
  });

  it('verifies H applied twice returns original state (H² = I)', () => {
    sim1.applyGate('H', 0);
    sim1.applyGate('H', 0);
    const sv = sim1.getStateVector();
    expect(isEqual(sv[0], complex(1, 0))).toBe(true);
    expect(isEqual(sv[1], complex(0, 0))).toBe(true);
  });

  it('verifies Z|+⟩ = |−⟩', () => {
    sim1.applyGate('H', 0); // |+⟩ = (|0⟩ + |1⟩)/√2
    sim1.applyGate('Z', 0); // Z|+⟩ = (|0⟩ - |1⟩)/√2 = |−⟩
    const sv = sim1.getStateVector();
    const invSqrt2 = 1 / Math.SQRT2;
    expect(isEqual(sv[0], complex(invSqrt2, 0))).toBe(true);
    expect(isEqual(sv[1], complex(-invSqrt2, 0))).toBe(true);
  });

  it('generates Bell-state (|00⟩ + |11⟩)/√2', () => {
    sim2.applyGate('H', 0); // Q0 into superposition: (|00⟩ + |10⟩)/√2
    sim2.applyGate('CNOT', 1, 0); // Control: Q0, Target: Q1 -> (|00⟩ + |11⟩)/√2
    const sv = sim2.getStateVector();
    const invSqrt2 = 1 / Math.SQRT2;

    expect(isEqual(sv[0], complex(invSqrt2, 0))).toBe(true); // |00⟩
    expect(isEqual(sv[1], complex(0, 0))).toBe(true);        // |01⟩
    expect(isEqual(sv[2], complex(0, 0))).toBe(true);        // |10⟩
    expect(isEqual(sv[3], complex(invSqrt2, 0))).toBe(true); // |11⟩

    const probs = sim2.getProbabilities();
    expect(probs[0]).toBeCloseTo(0.5);
    expect(probs[1]).toBeCloseTo(0);
    expect(probs[2]).toBeCloseTo(0);
    expect(probs[3]).toBeCloseTo(0.5);
  });

  it('validates probability normalization', () => {
    sim1.applyGate('H', 0);
    sim1.applyGate('S', 0);
    sim1.applyGate('T', 0);
    const probs = sim1.getProbabilities();
    const sum = probs.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0);
  });

  it('produces measurement frequencies approaching expected probabilities', () => {
    sim1.applyGate('H', 0); // |+⟩ with 50% 0, 50% 1
    const res = sim1.runMeasurement(1000, 42); // 1000 shots with seed
    expect(res.shots).toBe(1000);
    expect(res.frequencies['0']).toBeGreaterThan(0.42);
    expect(res.frequencies['0']).toBeLessThan(0.58);
    expect(res.frequencies['1']).toBeGreaterThan(0.42);
    expect(res.frequencies['1']).toBeLessThan(0.58);
    expect(res.frequencies['0'] + res.frequencies['1']).toBeCloseTo(1.0);
  });

  it('handles invalid state vectors and qubit indices gracefully', () => {
    expect(() => sim1.applyGate('X', 5)).toThrow(/Invalid target qubit index/);
    expect(() => sim1.applyGate('CNOT', 1, 0)).toThrow(/CNOT gate requires a 2-qubit simulator/);
    expect(() => sim2.applyGate('CNOT', 0, 0)).toThrow(/must be distinct/);
    expect(() => sim1.setStateVector([complex(1, 0), complex(1, 0)])).toThrow(/normalization error/);
  });
});
