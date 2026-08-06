import React, { useState } from 'react';
import { QuantumSimulator } from '../lib/quantum/simulator';
import { StateVectorVisualizer } from '../components/quantum/StateVectorVisualizer';
import { CircuitBoard } from '../components/quantum/CircuitBoard';
import { MeasurementHistogram } from '../components/quantum/MeasurementHistogram';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module4PageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const Module4Page: React.FC<Module4PageProps> = ({
  progress,
  misconceptions,
  onUpdateProgress,
  onUpdateMisconceptions,
}) => {
  const [sim] = useState(() => new QuantumSimulator(2));
  const [activeStep, setActiveStep] = useState(0);

  const handlePrepareBellState = () => {
    sim.reset();
    sim.applyGate('H', 0);
    sim.applyGate('CNOT', 1, 0); // ctrl: q0, tgt: q1
    setActiveStep(2);
  };

  const handleReset = () => {
    sim.reset();
    setActiveStep(0);
  };

  const stateVector = sim.getStateVector();
  const history = sim.getHistory();
  const gates = history.map(h => h.gateApplied).filter(Boolean) as any[];

  const [shots] = useState(100);
  const measurementResult = sim.runMeasurement(shots, 42);

  // Quiz
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = (optId: string) => {
    setQuizSelected(optId);
    setQuizSubmitted(true);

    const isCorrect = optId === 'opt-b';
    const nextMisc = AdaptiveEngine.evaluateAnswer(
      misconceptions,
      'm4-check1',
      optId,
      isCorrect,
      isCorrect ? undefined : 'ENTANGLEMENT_FTL'
    );
    onUpdateMisconceptions(nextMisc);
    StorageService.saveMisconceptions(nextMisc);

    if (!progress.modulesCompleted.includes('m4')) {
      const nextProg: ProgressMetrics = {
        ...progress,
        modulesCompleted: [...progress.modulesCompleted, 'm4'],
      };
      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
    }
  };

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Module 4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Quantum Entanglement</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Prepare the canonical Bell state (|00⟩ + |11⟩)/√2 using Hadamard and CNOT gates. Observe non-local correlations and understand why entanglement does not allow FTL messaging.
        </p>
      </div>

      {/* Bell State Recipe Interactive Studio */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Bell State Preparation Recipe</span>
            </h2>
            <p className="text-xs text-gray-400">Step 1: H on q0 → Step 2: CNOT (Ctrl: q0, Tgt: q1) → Bell State!</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrepareBellState}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow glow-cyan transition"
            >
              Auto-Prepare Bell State
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono rounded-xl transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 2-Qubit State Vector Display */}
        <StateVectorVisualizer
          amplitudes={stateVector}
          numQubits={2}
          title="2-Qubit State Vector Space (|00⟩, |01⟩, |10⟩, |11⟩)"
        />

        {/* Sampling Histogram */}
        <MeasurementHistogram result={measurementResult} />
      </div>

      {/* Debunking FTL Communication Section */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 space-y-3">
        <h3 className="text-base font-bold text-emerald-300">Why Entanglement Does NOT Enable Faster-Than-Light Communication</h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          Suppose Alice and Bob share the Bell state <span className="font-mono text-cyan-300 font-bold">(|00⟩ + |11⟩)/√2</span> across light-years. When Alice measures her qubit, she gets 0 or 1 with 50/50 probability. Bob’s qubit instantly collapses to match Alice’s value.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          However, Alice <em>cannot choose</em> whether she gets 0 or 1. Her measurement result is completely random. Because Bob only sees a random 50/50 stream of bits on his end, no message or data signal has traveled between them (No-Communication Theorem).
        </p>
      </div>

      {/* Concept Check */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white">Module 4 Concept Check</h3>
        <p className="text-sm text-gray-200">
          Can Alice transmit a binary secret message instantly to Bob by performing local measurements on an entangled Bell pair?
        </p>

        <div className="space-y-2 text-xs font-mono">
          <button
            onClick={() => handleQuizSubmit('opt-a')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-a' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            Yes, because quantum entanglement instantly teleports physical data across space.
          </button>
          <button
            onClick={() => handleQuizSubmit('opt-b')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-b' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            No, because local measurement results are fundamentally random. Classical signals are required to transmit information.
          </button>
        </div>

        {quizSubmitted && (
          <MisconceptionFeedbackCard
            isCorrect={quizSelected === 'opt-b'}
            misconceptionId={quizSelected === 'opt-b' ? undefined : 'ENTANGLEMENT_FTL'}
            explanation={
              quizSelected === 'opt-b'
                ? 'Correct! Entanglement correlates outcomes, but random measurement collapse prevents FTL message transmission.'
                : 'No! Entanglement correlates measurement outcomes, but because Alice’s outcome is random, no controllable message is transmitted.'
            }
          />
        )}

        <div className="flex justify-end pt-4">
          <Link
            to="/post-assessment"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <span>Proceed to Final Post-Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
