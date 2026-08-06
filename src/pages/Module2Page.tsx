import React, { useState } from 'react';
import { GateType } from '../types/quantum';
import { QuantumSimulator } from '../lib/quantum/simulator';
import { GateMatrixDisplay } from '../components/quantum/GateMatrixDisplay';
import { StateVectorVisualizer } from '../components/quantum/StateVectorVisualizer';
import { PredictionPrompt } from '../components/learning/PredictionPrompt';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module2PageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const Module2Page: React.FC<Module2PageProps> = ({
  progress,
  misconceptions,
  onUpdateProgress,
  onUpdateMisconceptions,
}) => {
  const [sim] = useState(() => new QuantumSimulator(1));
  const [selectedGate, setSelectedGate] = useState<GateType>('H');
  const [, setStepCounter] = useState(0);

  const stateVector = sim.getStateVector();

  const handleApplyGate = (type: GateType) => {
    sim.applyGate(type, 0);
    setStepCounter(prev => prev + 1);
  };

  const handleReset = () => {
    sim.reset();
    setStepCounter(prev => prev + 1);
  };

  // Prediction Quiz
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = (optId: string) => {
    setQuizSelected(optId);
    setQuizSubmitted(true);

    const isCorrect = optId === 'opt-b';
    const nextMisc = AdaptiveEngine.evaluateAnswer(
      misconceptions,
      'm2-check1',
      optId,
      isCorrect,
      isCorrect ? undefined : 'HADAMARD_ALWAYS_PLUS'
    );
    onUpdateMisconceptions(nextMisc);
    StorageService.saveMisconceptions(nextMisc);

    if (!progress.modulesCompleted.includes('m2')) {
      const nextProg: ProgressMetrics = {
        ...progress,
        modulesCompleted: [...progress.modulesCompleted, 'm2'],
      };
      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
    }
  };

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">Module 2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Quantum Gates</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Learn how single-qubit quantum gates transform state vectors through matrix-vector multiplication and phase manipulation.
        </p>
      </div>

      {/* Gate Reference Catalog */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Single-Qubit Gate Catalog</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(['X', 'Y', 'Z', 'H', 'S', 'T'] as GateType[]).map(gType => (
            <GateMatrixDisplay
              key={gType}
              gateType={gType}
              selected={selectedGate === gType}
              onClick={() => setSelectedGate(gType)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Gate Application Canvas */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Single-Qubit Simulator Laboratory</h2>
            <p className="text-xs text-gray-400">Click a gate below to apply it to the current state vector.</p>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-200 text-xs font-mono rounded-lg transition flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset State to |0⟩</span>
          </button>
        </div>

        {/* Gate Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-gray-400">Apply Gate:</span>
          {(['X', 'Y', 'Z', 'H', 'S', 'T'] as GateType[]).map(gType => (
            <button
              key={gType}
              onClick={() => handleApplyGate(gType)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold font-mono text-xs rounded-lg shadow glow-violet transition"
            >
              Apply {gType}
            </button>
          ))}
        </div>

        {/* State Display */}
        <StateVectorVisualizer
          amplitudes={stateVector}
          numQubits={1}
          title="Current Simulated Qubit State"
        />
      </div>

      {/* Prediction Challenge */}
      <PredictionPrompt
        title="Formative Prediction Challenge"
        question="You start with a qubit in basis state |1⟩ and apply a Hadamard (H) gate. What state will result?"
        options={[
          {
            id: 'opt-a',
            label: '|+⟩ = (|0⟩ + |1⟩)/√2 (Equal superposition with positive phase)',
            isCorrect: false,
            explanation: 'H|0⟩ gives |+⟩. But applying H to |1⟩ creates a negative relative phase: |−⟩ = (|0⟩ - |1⟩)/√2.',
          },
          {
            id: 'opt-b',
            label: '|−⟩ = (|0⟩ - |1⟩)/√2 (Equal superposition with negative relative phase)',
            isCorrect: true,
            explanation: 'Correct! H|1⟩ = (|0⟩ - |1⟩)/√2. The minus sign represents a 180° phase flip on the |1⟩ component.',
          },
          {
            id: 'opt-c',
            label: '|0⟩ (Flips back to computational zero)',
            isCorrect: false,
            explanation: 'Applying X flips |1⟩ to |0⟩, whereas H converts basis state |1⟩ into superposition state |−⟩.',
          },
        ]}
      />

      {/* In-Module Formative Check */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white">Module 2 Concept Check</h3>
        <p className="text-sm text-gray-200">
          True or False: The Hadamard (H) gate always transforms any input state into state |+⟩.
        </p>

        <div className="space-y-2 text-xs font-mono">
          <button
            onClick={() => handleQuizSubmit('opt-a')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-a' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            True (Hadamard always outputs |+⟩)
          </button>
          <button
            onClick={() => handleQuizSubmit('opt-b')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-b' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            False (Hadamard is reversible: H|0⟩ = |+⟩, H|1⟩ = |−⟩, H|+⟩ = |0⟩, H|−⟩ = |1⟩)
          </button>
        </div>

        {quizSubmitted && (
          <MisconceptionFeedbackCard
            isCorrect={quizSelected === 'opt-b'}
            misconceptionId={quizSelected === 'opt-b' ? undefined : 'HADAMARD_ALWAYS_PLUS'}
            explanation={
              quizSelected === 'opt-b'
                ? 'Correct! H is unitary and self-inverse (H² = I). Input state dictates the output phase!'
                : 'False! H|1⟩ yields |−⟩ and H|+⟩ restores |0⟩. Assuming H always produces |+⟩ ignores relative phase.'
            }
          />
        )}

        <div className="flex justify-end pt-4">
          <Link
            to="/module/m3"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <span>Continue to Module 3: Measurement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
