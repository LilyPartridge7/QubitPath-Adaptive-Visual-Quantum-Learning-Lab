export interface Complex {
  re: number;
  im: number;
}

export type BasisState1Q = '|0⟩' | '|1⟩';
export type BasisState2Q = '|00⟩' | '|01⟩' | '|10⟩' | '|11⟩';

export interface SingleQubitState {
  alpha: Complex; // amplitude for |0⟩
  beta: Complex;  // amplitude for |1⟩
}

export interface TwoQubitState {
  amplitudes: [Complex, Complex, Complex, Complex]; // |00⟩, |01⟩, |10⟩, |11⟩
}

export type QubitState = SingleQubitState | TwoQubitState;

export type GateType = 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T' | 'CNOT';

export interface Gate {
  id: string;
  type: GateType;
  targetQubit: number; // 0 or 1
  controlQubit?: number; // for CNOT (0 or 1)
  name: string;
  matrix: Complex[][];
  description: string;
}

export interface CircuitStep {
  stepIndex: number;
  gateApplied?: Gate;
  stateVector: Complex[];
  probabilities: number[];
  phases: number[]; // relative phase angles in radians
  explanation: {
    math: string;
    plain: string;
  };
}

export interface MeasurementResult {
  shots: number;
  counts: Record<string, number>;
  frequencies: Record<string, number>;
  probabilities: Record<string, number>;
  sampledSequence: string[];
}
