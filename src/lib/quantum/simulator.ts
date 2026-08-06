import { Complex, complex, add, multiply, magnitudeSq, scale, ZERO, ONE, I, SQRT1_2, NEG_SQRT1_2, phase } from './complex';
import { Gate, GateType, CircuitStep, MeasurementResult } from '../../types/quantum';
import { PRNG } from './prng';

// Gate Definitions
export const GATES: Record<GateType, { name: string; matrix: Complex[][]; description: string }> = {
  X: {
    name: 'X (NOT)',
    matrix: [
      [ZERO, ONE],
      [ONE, ZERO],
    ],
    description: 'Flips |0⟩ to |1⟩ and |1⟩ to |0⟩. Quantum bit-flip gate.',
  },
  Y: {
    name: 'Y (Bit & Phase Flip)',
    matrix: [
      [ZERO, { re: 0, im: -1 }],
      [{ re: 0, im: 1 }, ZERO],
    ],
    description: 'Flips bit and introduces a phase shift of i.',
  },
  Z: {
    name: 'Z (Phase Flip)',
    matrix: [
      [ONE, ZERO],
      [ZERO, { re: -1, im: 0 }],
    ],
    description: 'Leaves |0⟩ unchanged and flips phase of |1⟩ (|1⟩ → -|1⟩).',
  },
  H: {
    name: 'H (Hadamard)',
    matrix: [
      [SQRT1_2, SQRT1_2],
      [SQRT1_2, NEG_SQRT1_2],
    ],
    description: 'Creates equal superposition |+⟩ = (|0⟩ + |1⟩)/√2 from |0⟩.',
  },
  S: {
    name: 'S (Phase / √Z)',
    matrix: [
      [ONE, ZERO],
      [ZERO, I],
    ],
    description: 'Applies a 90° (π/2) phase shift to |1⟩.',
  },
  T: {
    name: 'T (π/4 Phase)',
    matrix: [
      [ONE, ZERO],
      [ZERO, { re: 1 / Math.SQRT2, im: 1 / Math.SQRT2 }],
    ],
    description: 'Applies a 45° (π/4) phase shift to |1⟩.',
  },
  CNOT: {
    name: 'CNOT (Controlled-NOT)',
    matrix: [
      [ONE, ZERO, ZERO, ZERO],
      [ZERO, ONE, ZERO, ZERO],
      [ZERO, ZERO, ZERO, ONE],
      [ZERO, ZERO, ONE, ZERO],
    ],
    description: 'Flips target qubit if and only if control qubit is |1⟩.',
  },
};

export class QuantumSimulator {
  private numQubits: number;
  private stateVector: Complex[];
  private history: CircuitStep[] = [];

  constructor(numQubits: 1 | 2 = 1) {
    if (numQubits !== 1 && numQubits !== 2) {
      throw new Error('QuantumSimulator only supports 1 or 2 qubits.');
    }
    this.numQubits = numQubits;
    this.stateVector = this.getInitialState();
    this.recordStep(0, undefined, 'Initial state set to computational zero state.');
  }

  private getInitialState(): Complex[] {
    if (this.numQubits === 1) {
      return [ONE, ZERO]; // |0⟩
    } else {
      return [ONE, ZERO, ZERO, ZERO]; // |00⟩
    }
  }

  public reset(): void {
    this.stateVector = this.getInitialState();
    this.history = [];
    this.recordStep(0, undefined, 'Circuit reset to initial zero state.');
  }

  public getNumQubits(): number {
    return this.numQubits;
  }

  public getStateVector(): Complex[] {
    return [...this.stateVector];
  }

  public setStateVector(vector: Complex[]): void {
    const expectedDim = Math.pow(2, this.numQubits);
    if (vector.length !== expectedDim) {
      throw new Error(`Invalid state vector dimension. Expected ${expectedDim}, got ${vector.length}.`);
    }

    // Validate numerical sanity
    for (const c of vector) {
      if (typeof c.re !== 'number' || typeof c.im !== 'number' || isNaN(c.re) || isNaN(c.im)) {
        throw new Error('State vector contains invalid numerical values (NaN or non-number).');
      }
    }

    // Validate normalization
    const normSq = vector.reduce((acc, c) => acc + magnitudeSq(c), 0);
    if (Math.abs(normSq - 1.0) > 1e-4) {
      throw new Error(`State vector normalization error: |ψ|² = ${normSq.toFixed(4)}, expected 1.0.`);
    }

    this.stateVector = [...vector];
  }

  public getProbabilities(): number[] {
    return this.stateVector.map(c => magnitudeSq(c));
  }

  public getPhases(): number[] {
    return this.stateVector.map(c => phase(c));
  }

  public applyGate(gateType: GateType, targetQubit: number, controlQubit?: number): CircuitStep {
    if (gateType === 'CNOT' && this.numQubits !== 2) {
      throw new Error('CNOT gate requires a 2-qubit simulator.');
    }

    if (targetQubit < 0 || targetQubit >= this.numQubits) {
      throw new Error(`Invalid target qubit index ${targetQubit}. Must be within 0..${this.numQubits - 1}.`);
    }

    if (gateType === 'CNOT') {
      if (controlQubit === undefined || controlQubit < 0 || controlQubit >= 2) {
        throw new Error('CNOT gate requires a valid control qubit index (0 or 1).');
      }
      if (controlQubit === targetQubit) {
        throw new Error('Control and target qubits for CNOT must be distinct.');
      }
    }

    const gateObj: Gate = {
      id: `gate-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: gateType,
      targetQubit,
      controlQubit,
      name: GATES[gateType].name,
      matrix: GATES[gateType].matrix,
      description: GATES[gateType].description,
    };

    let nextState: Complex[];

    if (this.numQubits === 1) {
      nextState = this.apply1QubitGate(gateObj.matrix, this.stateVector);
    } else {
      if (gateType === 'CNOT') {
        nextState = this.applyCNOT(controlQubit!, targetQubit, this.stateVector);
      } else {
        nextState = this.apply1QubitGateTo2QubitSystem(gateObj.matrix, targetQubit, this.stateVector);
      }
    }

    this.stateVector = this.normalizeState(nextState);

    const stepIndex = this.history.length;
    const explanation = this.generateExplanation(gateObj);
    return this.recordStep(stepIndex, gateObj, explanation.plain, explanation.math);
  }

  private apply1QubitGate(matrix: Complex[][], state: Complex[]): Complex[] {
    // 2x2 matrix * 2x1 vector
    return [
      add(multiply(matrix[0][0], state[0]), multiply(matrix[0][1], state[1])),
      add(multiply(matrix[1][0], state[0]), multiply(matrix[1][1], state[1])),
    ];
  }

  private apply1QubitGateTo2QubitSystem(matrix: Complex[][], targetQubit: number, state: Complex[]): Complex[] {
    // State indices: 0: |00⟩, 1: |01⟩, 2: |10⟩, 3: |11⟩
    // targetQubit 0 is high bit, targetQubit 1 is low bit
    const result: Complex[] = [ZERO, ZERO, ZERO, ZERO];

    if (targetQubit === 0) {
      // Act on first qubit: pairs (0,2) and (1,3)
      for (let fixed = 0; fixed < 2; fixed++) {
        const idx0 = fixed;      // |0, fixed⟩
        const idx1 = 2 + fixed;  // |1, fixed⟩

        const in0 = state[idx0];
        const in1 = state[idx1];

        result[idx0] = add(multiply(matrix[0][0], in0), multiply(matrix[0][1], in1));
        result[idx1] = add(multiply(matrix[1][0], in0), multiply(matrix[1][1], in1));
      }
    } else {
      // Act on second qubit: pairs (0,1) and (2,3)
      for (let fixed = 0; fixed < 2; fixed++) {
        const idx0 = fixed * 2;     // |fixed, 0⟩
        const idx1 = fixed * 2 + 1; // |fixed, 1⟩

        const in0 = state[idx0];
        const in1 = state[idx1];

        result[idx0] = add(multiply(matrix[0][0], in0), multiply(matrix[0][1], in1));
        result[idx1] = add(multiply(matrix[1][0], in0), multiply(matrix[1][1], in1));
      }
    }

    return result;
  }

  private applyCNOT(control: number, target: number, state: Complex[]): Complex[] {
    const result = [...state];
    if (control === 0 && target === 1) {
      // Control is Q0, Target is Q1
      // If Q0 == 1, swap |10⟩ and |11⟩ (indices 2 and 3)
      result[2] = state[3];
      result[3] = state[2];
    } else if (control === 1 && target === 0) {
      // Control is Q1, Target is Q0
      // If Q1 == 1, swap |01⟩ and |11⟩ (indices 1 and 3)
      result[1] = state[3];
      result[3] = state[1];
    }
    return result;
  }

  private normalizeState(state: Complex[]): Complex[] {
    const sumSq = state.reduce((acc, c) => acc + magnitudeSq(c), 0);
    if (sumSq === 0) {
      throw new Error('Cannot normalize zero state vector.');
    }
    const norm = Math.sqrt(sumSq);
    return state.map(c => scale(c, 1 / norm));
  }

  private recordStep(
    stepIndex: number,
    gateApplied?: Gate,
    plainExplanation = '',
    mathExplanation = ''
  ): CircuitStep {
    const step: CircuitStep = {
      stepIndex,
      gateApplied,
      stateVector: [...this.stateVector],
      probabilities: this.getProbabilities(),
      phases: this.getPhases(),
      explanation: {
        plain: plainExplanation,
        math: mathExplanation,
      },
    };
    this.history.push(step);
    return step;
  }

  public getHistory(): CircuitStep[] {
    return [...this.history];
  }

  public stepTo(stepIndex: number): CircuitStep {
    if (stepIndex < 0 || stepIndex >= this.history.length) {
      throw new Error(`Invalid step index ${stepIndex}. History length is ${this.history.length}.`);
    }
    const step = this.history[stepIndex];
    this.stateVector = [...step.stateVector];
    return step;
  }

  public runMeasurement(shots = 1, seed = 42): MeasurementResult {
    const prng = new PRNG(seed);
    const probs = this.getProbabilities();
    const basisLabels =
      this.numQubits === 1 ? ['0', '1'] : ['00', '01', '10', '11'];

    const counts: Record<string, number> = {};
    basisLabels.forEach(label => (counts[label] = 0));

    const sampledSequence: string[] = [];

    for (let i = 0; i < shots; i++) {
      const rand = prng.next();
      let cumulative = 0;
      let selectedLabel = basisLabels[basisLabels.length - 1];

      for (let j = 0; j < probs.length; j++) {
        cumulative += probs[j];
        if (rand < cumulative) {
          selectedLabel = basisLabels[j];
          break;
        }
      }

      counts[selectedLabel] = (counts[selectedLabel] || 0) + 1;
      if (i < 100) {
        sampledSequence.push(selectedLabel);
      }
    }

    const frequencies: Record<string, number> = {};
    const probabilities: Record<string, number> = {};

    basisLabels.forEach((label, idx) => {
      frequencies[label] = counts[label] / shots;
      probabilities[label] = probs[idx];
    });

    return {
      shots,
      counts,
      frequencies,
      probabilities,
      sampledSequence,
    };
  }

  private generateExplanation(gate: Gate): { plain: string; math: string } {
    const qLabel = `q${gate.targetQubit}`;
    switch (gate.type) {
      case 'X':
        return {
          plain: `Applied X (NOT) gate to ${qLabel}. It swapped the amplitudes of |0⟩ and |1⟩.`,
          math: `X|0⟩ = |1⟩, X|1⟩ = |0⟩`,
        };
      case 'Y':
        return {
          plain: `Applied Y gate to ${qLabel}. It flipped the qubit state and added a complex phase shift of i.`,
          math: `Y|0⟩ = i|1⟩, Y|1⟩ = -i|0⟩`,
        };
      case 'Z':
        return {
          plain: `Applied Z (Phase Flip) gate to ${qLabel}. The state |0⟩ remains unchanged, while |1⟩ gets a phase flip (-|1⟩).`,
          math: `Z|0⟩ = |0⟩, Z|1⟩ = -|1⟩`,
        };
      case 'H':
        return {
          plain: `Applied Hadamard (H) gate to ${qLabel}. It converted a basis state into an equal superposition of |0⟩ and |1⟩.`,
          math: `H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩, H|1⟩ = (|0⟩ - |1⟩)/√2 = |−⟩`,
        };
      case 'S':
        return {
          plain: `Applied S gate to ${qLabel}. It added a 90° (π/2) relative phase shift to the |1⟩ state component.`,
          math: `S|0⟩ = |0⟩, S|1⟩ = i|1⟩`,
        };
      case 'T':
        return {
          plain: `Applied T gate to ${qLabel}. It added a 45° (π/4) relative phase shift to the |1⟩ state component.`,
          math: `T|0⟩ = |0⟩, T|1⟩ = e^(iπ/4)|1⟩`,
        };
      case 'CNOT':
        return {
          plain: `Applied CNOT gate with control q${gate.controlQubit} and target q${gate.targetQubit}. Target qubit was flipped whenever control was |1⟩.`,
          math: `CNOT|00⟩ = |00⟩, CNOT|10⟩ = |11⟩`,
        };
      default:
        return { plain: 'Applied gate.', math: '' };
    }
  }
}
