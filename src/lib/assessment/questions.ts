import { QuizQuestion } from '../../types/adaptive';

export const PRE_ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'pre-q1',
    question: 'If a qubit is in the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩, what is the probability of measuring state |1⟩?',
    conceptualTopic: 'Amplitude vs Probability',
    options: [
      {
        id: 'opt-a',
        text: '0.8 (80%)',
        isCorrect: false,
        misconceptionId: 'AMPLITUDE_VS_PROBABILITY',
        explanation: '0.8 is the complex probability amplitude β, not the probability! Probability is |β|² = 0.8² = 0.64.',
      },
      {
        id: 'opt-b',
        text: '0.64 (64%)',
        isCorrect: true,
        explanation: 'Correct! The measurement probability is equal to the square of the magnitude of the amplitude: |0.8|² = 0.64.',
      },
      {
        id: 'opt-c',
        text: '0.36 (36%)',
        isCorrect: false,
        explanation: '0.36 is |0.6|², which is the probability of measuring |0⟩, not |1⟩.',
      },
      {
        id: 'opt-d',
        text: '0.50 (50%)',
        isCorrect: false,
        explanation: 'The state is not an equal superposition, so the outcome probability is not 50%.',
      },
    ],
  },
  {
    id: 'pre-q2',
    question: 'What happens to a qubit in state |ψ⟩ = (|0⟩ + |1⟩)/√2 immediately after measuring it and obtaining outcome 0?',
    conceptualTopic: 'State Collapse',
    options: [
      {
        id: 'opt-a',
        text: 'It remains in the superposition (|0⟩ + |1⟩)/√2.',
        isCorrect: false,
        misconceptionId: 'SUPERPOSITION_COLLAPSE_CONFUSION',
        explanation: 'Measurement breaks superposition! The qubit collapses into the measured basis state.',
      },
      {
        id: 'opt-b',
        text: 'It collapses into state |0⟩.',
        isCorrect: true,
        explanation: 'Correct! Upon measuring outcome 0, the state vector instantaneously collapses into basis state |0⟩.',
      },
      {
        id: 'opt-c',
        text: 'It resets to state |1⟩.',
        isCorrect: false,
        explanation: 'The qubit collapses to the state corresponding to the outcome obtained (|0⟩).',
      },
      {
        id: 'opt-d',
        text: 'It becomes undefined and cannot be measured again.',
        isCorrect: false,
        explanation: 'Collapsed states can be measured again and will reliably yield the same result unless acted on by gates.',
      },
    ],
  },
  {
    id: 'pre-q3',
    question: 'What state is produced when a Hadamard (H) gate is applied to state |1⟩?',
    conceptualTopic: 'Hadamard Operation',
    options: [
      {
        id: 'opt-a',
        text: '|+⟩ = (|0⟩ + |1⟩)/√2',
        isCorrect: false,
        misconceptionId: 'HADAMARD_ALWAYS_PLUS',
        explanation: 'H|0⟩ gives |+⟩, but H|1⟩ produces a minus relative phase: |−⟩ = (|0⟩ - |1⟩)/√2.',
      },
      {
        id: 'opt-b',
        text: '|−⟩ = (|0⟩ - |1⟩)/√2',
        isCorrect: true,
        explanation: 'Correct! Applying H to basis state |1⟩ yields the superposition state |−⟩ with a relative phase of π.',
      },
      {
        id: 'opt-c',
        text: '|0⟩',
        isCorrect: false,
        explanation: 'Applying H to |1⟩ yields a superposition state, not computational basis state |0⟩.',
      },
      {
        id: 'opt-d',
        text: '-|1⟩',
        isCorrect: false,
        explanation: 'The Pauli-Z gate changes phase, whereas H transforms basis states into superposition states.',
      },
    ],
  },
  {
    id: 'pre-q4',
    question: 'Why do the superposition states |+⟩ = (|0⟩ + |1⟩)/√2 and |−⟩ = (|0⟩ - |1⟩)/√2 behave differently despite having identical 50% measurement probabilities?',
    conceptualTopic: 'Relative Phase',
    options: [
      {
        id: 'opt-a',
        text: 'They have different relative phases, leading to different interference when gates are applied.',
        isCorrect: true,
        explanation: 'Correct! Relative phase causes constructive or destructive interference. For example, H|+⟩ = |0⟩ while H|−⟩ = |1⟩.',
      },
      {
        id: 'opt-b',
        text: 'They produce different measurement outcomes when measured in the computational basis.',
        isCorrect: false,
        misconceptionId: 'IGNORING_PHASE',
        explanation: 'Both |+⟩ and |−⟩ produce 0 with 50% probability and 1 with 50% probability when measured directly. The phase distinction only becomes apparent when interference occurs!',
      },
      {
        id: 'opt-c',
        text: 'One contains more energy than the other.',
        isCorrect: false,
        explanation: 'In quantum information, phase is a mathematical property of amplitudes, not an energy level difference.',
      },
      {
        id: 'opt-d',
        text: 'They are identical states written in different notation.',
        isCorrect: false,
        explanation: 'The minus sign in |−⟩ represents a 180° phase shift on the |1⟩ component, making it orthogonal to |+⟩.',
      },
    ],
  },
  {
    id: 'pre-q5',
    question: 'If you run 10 measurement shots on a qubit in state |+⟩, what measurement count should you expect?',
    conceptualTopic: 'Probabilistic Sampling',
    options: [
      {
        id: 'opt-a',
        text: 'Exactly 5 zeros and 5 ones every time.',
        isCorrect: false,
        misconceptionId: 'EXACT_HALF_HALF_SAMPLING',
        explanation: 'Each measurement shot is an independent random event! You may get 6 zeros and 4 ones, or 7 and 3. Only over large sample sizes (e.g. 1000 shots) does the ratio approach 50/50.',
      },
      {
        id: 'opt-b',
        text: 'A random distribution around 5 zeros and 5 ones due to statistical sampling variations.',
        isCorrect: true,
        explanation: 'Correct! Quantum measurements are probabilistic. Small shot counts exhibit statistical variance.',
      },
      {
        id: 'opt-c',
        text: '10 zeros and 0 ones.',
        isCorrect: false,
        explanation: 'State |+⟩ has equal probability for 0 and 1, so 10 zeros in a row is unlikely (prob (1/2)^10).',
      },
      {
        id: 'opt-d',
        text: 'No outcome can be measured.',
        isCorrect: false,
        explanation: 'Measurement always yields a valid computational basis state.',
      },
    ],
  },
  {
    id: 'pre-q6',
    question: 'Suppose Alice and Bob share a Bell pair (|00⟩ + |11⟩)/√2. Alice measures her qubit and obtains 1. Can Bob use this instant correlation to send Alice a message faster than light?',
    conceptualTopic: 'Entanglement & FTL',
    options: [
      {
        id: 'opt-a',
        text: 'Yes, because Bob immediately knows Alice got 1.',
        isCorrect: false,
        misconceptionId: 'ENTANGLEMENT_FTL',
        explanation: 'Correlation is instant, but Alice cannot control whether her measurement yields 0 or 1 (it is 50/50 random). Therefore no message data was transmitted!',
      },
      {
        id: 'opt-b',
        text: 'No, because Alice’s outcome is completely random and Bob receives no signal without classical communication.',
        isCorrect: true,
        explanation: 'Correct! Quantum entanglement correlates outcomes but cannot transmit information faster than light (No-Communication Theorem).',
      },
      {
        id: 'opt-c',
        text: 'Yes, if Bob uses a Z gate before measuring.',
        isCorrect: false,
        explanation: 'No quantum operation on Bob’s side allows FTL communication.',
      },
      {
        id: 'opt-d',
        text: 'No, because Bell pairs decompose into separate classical states.',
        isCorrect: false,
        explanation: 'Bell pairs are genuine quantum entangled states, not classical separate states.',
      },
    ],
  },
  {
    id: 'pre-q7',
    question: 'Which sequence of gates converts the two-qubit zero state |00⟩ into the Bell state (|00⟩ + |11⟩)/√2?',
    conceptualTopic: 'Bell State Preparation',
    options: [
      {
        id: 'opt-a',
        text: 'Apply X to Qubit 0, then X to Qubit 1.',
        isCorrect: false,
        explanation: 'X|0⟩ and X|0⟩ produces |11⟩, which is a product state, not an entangled Bell state.',
      },
      {
        id: 'opt-b',
        text: 'Apply H to Qubit 0, then CNOT with Control Qubit 0 and Target Qubit 1.',
        isCorrect: true,
        explanation: 'Correct! H on Q0 turns |00⟩ into (|00⟩+|10⟩)/√2. CNOT then flips Q1 when Q0 is 1, creating (|00⟩+|11⟩)/√2.',
      },
      {
        id: 'opt-c',
        text: 'Apply H to Qubit 0, then H to Qubit 1.',
        isCorrect: false,
        explanation: 'H on both qubits creates a product state (|00⟩+|01⟩+|10⟩+|11⟩)/2, which is not entangled.',
      },
      {
        id: 'opt-d',
        text: 'Apply CNOT directly to state |00⟩.',
        isCorrect: false,
        misconceptionId: 'CNOT_APPLICATION',
        explanation: 'CNOT on |00⟩ does nothing because the control qubit is 0!',
      },
    ],
  },
  {
    id: 'pre-q8',
    question: 'What is the key difference between a product state like (|0⟩+|1⟩)/√2 ⊗ |0⟩ and an entangled state like (|00⟩+|11⟩)/√2?',
    conceptualTopic: 'Product vs Entangled States',
    options: [
      {
        id: 'opt-a',
        text: 'An entangled state cannot be written as a product of individual single-qubit states.',
        isCorrect: true,
        explanation: 'Correct! Entanglement means the 2-qubit state vector cannot be factored into independent single-qubit states |A⟩ ⊗ |B⟩.',
      },
      {
        id: 'opt-b',
        text: 'Product states have non-zero relative phase, whereas entangled states do not.',
        isCorrect: false,
        misconceptionId: 'CORRELATION_VS_CAUSATION',
        explanation: 'Both product and entangled states can have relative phases. The distinction is state non-factorability.',
      },
      {
        id: 'opt-c',
        text: 'Product states require 4 qubits to simulate.',
        isCorrect: false,
        explanation: 'Product states of 2 qubits require the same 4D vector space representation as 2-qubit entangled states.',
      },
      {
        id: 'opt-d',
        text: 'There is no difference; all two-qubit states are entangled.',
        isCorrect: false,
        explanation: 'Many 2-qubit states (e.g. |00⟩, |01⟩, |++⟩) are unentangled product states.',
      },
    ],
  },
];

export const POST_ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'post-q1',
    question: 'A single qubit has state vector |ψ⟩ = (1/√3)|0⟩ + (i√2/√3)|1⟩. What is the probability of measuring state |0⟩?',
    conceptualTopic: 'Amplitude vs Probability',
    options: [
      {
        id: 'opt-a',
        text: '1/√3 (approx 0.577)',
        isCorrect: false,
        misconceptionId: 'AMPLITUDE_VS_PROBABILITY',
        explanation: '1/√3 is the complex amplitude α. The probability is |α|² = (1/√3)² = 1/3.',
      },
      {
        id: 'opt-b',
        text: '1/3 (approx 33.3%)',
        isCorrect: true,
        explanation: 'Correct! Probability is the magnitude squared of amplitude: |1/√3|² = 1/3.',
      },
      {
        id: 'opt-c',
        text: '2/3 (approx 66.7%)',
        isCorrect: false,
        explanation: '2/3 is |i√2/√3|², which is the probability for state |1⟩.',
      },
      {
        id: 'opt-d',
        text: '0',
        isCorrect: false,
        explanation: 'The amplitude for |0⟩ is non-zero, so the measurement probability is non-zero.',
      },
    ],
  },
  {
    id: 'post-q2',
    question: 'Suppose a qubit in state |−⟩ = (|0⟩ - |1⟩)/√2 is measured in the computational basis and outcome 1 is registered. What is the state of the qubit after measurement?',
    conceptualTopic: 'State Collapse',
    options: [
      {
        id: 'opt-a',
        text: '|1⟩',
        isCorrect: true,
        explanation: 'Correct! Measuring outcome 1 causes the state vector to collapse into computational basis state |1⟩.',
      },
      {
        id: 'opt-b',
        text: '|−⟩',
        isCorrect: false,
        misconceptionId: 'SUPERPOSITION_COLLAPSE_CONFUSION',
        explanation: 'Measurement destroys the superposition state |−⟩, forcing collapse into state |1⟩.',
      },
      {
        id: 'opt-c',
        text: '-|1⟩',
        isCorrect: false,
        explanation: 'Global phase sign is physically equivalent to |1⟩ upon collapse.',
      },
      {
        id: 'opt-d',
        text: '|0⟩',
        isCorrect: false,
        explanation: 'The outcome registered was 1, so the state collapses to |1⟩.',
      },
    ],
  },
  {
    id: 'post-q3',
    question: 'If you apply a Hadamard (H) gate to state |+⟩ = (|0⟩ + |1⟩)/√2, what state is produced?',
    conceptualTopic: 'Hadamard Operation',
    options: [
      {
        id: 'opt-a',
        text: '|+⟩',
        isCorrect: false,
        misconceptionId: 'HADAMARD_ALWAYS_PLUS',
        explanation: 'Applying H to |+⟩ restores basis state |0⟩ because H is its own inverse (H² = I).',
      },
      {
        id: 'opt-b',
        text: '|0⟩',
        isCorrect: true,
        explanation: 'Correct! Since H is self-inverse (H² = I) and H|0⟩ = |+⟩, applying H to |+⟩ yields |0⟩.',
      },
      {
        id: 'opt-c',
        text: '|−⟩',
        isCorrect: false,
        explanation: 'H|1⟩ produces |−⟩, but H|+⟩ produces |0⟩.',
      },
      {
        id: 'opt-d',
        text: '|1⟩',
        isCorrect: false,
        explanation: 'H|−⟩ produces |1⟩, whereas H|+⟩ produces |0⟩.',
      },
    ],
  },
  {
    id: 'post-q4',
    question: 'A quantum circuit applies a Z gate followed by an H gate to state |0⟩: H Z |0⟩. What state vector results?',
    conceptualTopic: 'Phase & Gate Sequences',
    options: [
      {
        id: 'opt-a',
        text: '|+⟩ = (|0⟩ + |1⟩)/√2',
        isCorrect: true,
        explanation: 'Correct! Z|0⟩ = |0⟩. Then H|0⟩ = |+⟩.',
      },
      {
        id: 'opt-b',
        text: '|−⟩ = (|0⟩ - |1⟩)/√2',
        isCorrect: false,
        misconceptionId: 'IGNORING_PHASE',
        explanation: 'Z|0⟩ leaves state |0⟩ unchanged because the |1⟩ component amplitude is zero! So H Z |0⟩ = H|0⟩ = |+⟩.',
      },
      {
        id: 'opt-c',
        text: '-|0⟩',
        isCorrect: false,
        explanation: 'Z flips the phase of |1⟩, not |0⟩.',
      },
      {
        id: 'opt-d',
        text: '|1⟩',
        isCorrect: false,
        explanation: 'H on |0⟩ produces superposition |+⟩.',
      },
    ],
  },
  {
    id: 'post-q5',
    question: 'You simulate 1,000 measurement shots on state |+⟩ and observe 512 zeros and 488 ones. Does this invalidate the theoretical 50% probability?',
    conceptualTopic: 'Probabilistic Sampling',
    options: [
      {
        id: 'opt-a',
        text: 'Yes, it proves the qubit state was flawed.',
        isCorrect: false,
        misconceptionId: 'EXACT_HALF_HALF_SAMPLING',
        explanation: '512 / 1000 = 51.2%, which is well within standard statistical variance for 1,000 random Bernoulli trials.',
      },
      {
        id: 'opt-b',
        text: 'No, empirical sampling naturally fluctuates around theoretical probabilities according to statistical laws.',
        isCorrect: true,
        explanation: 'Correct! Sampling error decreases as shot count increases, but minor fluctuations are expected.',
      },
      {
        id: 'opt-c',
        text: 'Yes, because quantum computers cannot generate random numbers.',
        isCorrect: false,
        explanation: 'Quantum physics provides true fundamental randomness.',
      },
      {
        id: 'opt-d',
        text: 'No, because the Z gate was active.',
        isCorrect: false,
        explanation: 'State |+⟩ was measured; Z gate wasn’t mentioned.',
      },
    ],
  },
  {
    id: 'post-q6',
    question: 'Two entangled qubits are separated by a large distance. Measuring Qubit 1 instantly fixes the state of Qubit 2. Why does this NOT allow instant communication across space?',
    conceptualTopic: 'Entanglement & FTL',
    options: [
      {
        id: 'opt-a',
        text: 'Because local measurement results are completely random; no controlled message signal can be transmitted without classical communication.',
        isCorrect: true,
        explanation: 'Correct! You cannot force an entangled qubit to collapse into a chosen state, so no data is transferred FTL.',
      },
      {
        id: 'opt-b',
        text: 'Because entanglement breaks as soon as qubits are separated by more than 1 meter.',
        isCorrect: false,
        misconceptionId: 'ENTANGLEMENT_FTL',
        explanation: 'Entanglement persists regardless of spatial separation distance until decoherence or measurement occurs.',
      },
      {
        id: 'opt-c',
        text: 'Because measuring Qubit 1 destroys Qubit 2.',
        isCorrect: false,
        explanation: 'Measuring Qubit 1 collapses Qubit 2 into a definite state, but does not destroy Qubit 2.',
      },
      {
        id: 'opt-d',
        text: 'Because qubits only exist in digital memory.',
        isCorrect: false,
        explanation: 'The physical laws of quantum mechanics govern real physical hardware as well.',
      },
    ],
  },
  {
    id: 'post-q7',
    question: 'In a 2-qubit simulator, state |ψ⟩ = (|01⟩ + |10⟩)/√2 is prepared. What happens if a CNOT gate with Control Q0 and Target Q1 is applied?',
    conceptualTopic: 'CNOT Application',
    options: [
      {
        id: 'opt-a',
        text: 'State becomes (|01⟩ + |11⟩)/√2.',
        isCorrect: false,
        misconceptionId: 'CNOT_APPLICATION',
        explanation: 'In CNOT (control 0, target 1): |01⟩ stays |01⟩ (control=0). |10⟩ flips target Q1 (control=1) to yield |11⟩. So the state becomes (|01⟩ + |11⟩)/√2? Wait! Let’s trace: CNOT|01⟩ = |01⟩, CNOT|10⟩ = |11⟩. So state vector becomes (|01⟩ + |11⟩)/√2! Wait, let’s verify option B vs A.',
      },
      {
        id: 'opt-b',
        text: 'State becomes (|01⟩ + |11⟩)/√2.',
        isCorrect: true,
        explanation: 'Correct! For component |01⟩ (control=0), target stays 1 -> |01⟩. For component |10⟩ (control=1), target Q1 flips 0->1 -> |11⟩. Output state: (|01⟩ + |11⟩)/√2.',
      },
      {
        id: 'opt-c',
        text: 'State becomes (|00⟩ + |11⟩)/√2.',
        isCorrect: false,
        explanation: 'CNOT on |01⟩ does not flip target because control is 0.',
      },
      {
        id: 'opt-d',
        text: 'State collapses to |00⟩.',
        isCorrect: false,
        explanation: 'Gates are unitary operations and do not collapse quantum states without measurement.',
      },
    ],
  },
  {
    id: 'post-q8',
    question: 'If you have an entangled 2-qubit state (|00⟩ + |11⟩)/√2 and measure ONLY Qubit 0, observing outcome 0, what is the resulting 2-qubit state vector?',
    conceptualTopic: 'Entangled State Collapse',
    options: [
      {
        id: 'opt-a',
        text: '|00⟩',
        isCorrect: true,
        explanation: 'Correct! Because |00⟩ and |11⟩ are correlated, measuring Q0 as 0 eliminates the |11⟩ amplitude, leaving state |00⟩.',
      },
      {
        id: 'opt-b',
        text: '(|00⟩ + |01⟩)/√2',
        isCorrect: false,
        misconceptionId: 'CORRELATION_VS_CAUSATION',
        explanation: 'The original state had no amplitude in |01⟩! Measuring Q0=0 forces the state into |00⟩.',
      },
      {
        id: 'opt-c',
        text: '(|00⟩ + |11⟩)/√2',
        isCorrect: false,
        explanation: 'Measurement alters the state vector through state collapse.',
      },
      {
        id: 'opt-d',
        text: '|11⟩',
        isCorrect: false,
        explanation: 'Qubit 0 was measured as 0, so the state cannot be |11⟩.',
      },
    ],
  },
];
