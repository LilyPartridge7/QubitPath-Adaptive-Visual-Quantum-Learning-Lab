import React, { useState } from 'react';
import { QuantumSimulator } from '../lib/quantum/simulator';
import { StateVectorVisualizer } from '../components/quantum/StateVectorVisualizer';
import { MeasurementHistogram } from '../components/quantum/MeasurementHistogram';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { ArrowRight, RotateCcw, Play, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module3PageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const Module3Page: React.FC<Module3PageProps> = ({
  progress,
  misconceptions,
  onUpdateProgress,
  onUpdateMisconceptions,
}) => {
  const [sim] = useState(() => {
    const s = new QuantumSimulator(1);
    s.applyGate('H', 0); // Prepare |+⟩ equal superposition
    return s;
  });

  const [shots, setShots] = useState<number>(100);
  const [seed, setSeed] = useState<number>(42);
  const [measurementResult, setMeasurementResult] = useState(() => sim.runMeasurement(100, 42));

  const handleRunShots = (numShots: number) => {
    setShots(numShots);
    const newSeed = Math.floor(Math.random() * 10000);
    setSeed(newSeed);
    setMeasurementResult(sim.runMeasurement(numShots, newSeed));
  };

  const handleReset = () => {
    sim.reset();
    sim.applyGate('H', 0);
    setMeasurementResult(sim.runMeasurement(shots, seed));
  };

  // Quiz
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = (optId: string) => {
    setQuizSelected(optId);
    setQuizSubmitted(true);

    const isCorrect = optId === 'opt-b';
    const nextMisc = AdaptiveEngine.evaluateAnswer(
      misconceptions,
      'm3-check1',
      optId,
      isCorrect,
      isCorrect ? undefined : 'EXACT_HALF_HALF_SAMPLING'
    );
    onUpdateMisconceptions(nextMisc);
    StorageService.saveMisconceptions(nextMisc);

    if (!progress.modulesCompleted.includes('m3')) {
      const nextProg: ProgressMetrics = {
        ...progress,
        modulesCompleted: [...progress.modulesCompleted, 'm3'],
      };
      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
    }
  };

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">Module 3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Quantum Measurement & Sampling</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Understand state collapse, measurement sampling, shot variance, and how empirical histograms converge to theoretical probability amplitudes.
        </p>
      </div>

      {/* Simulated Sampling vs Real HW Callout */}
      <div className="bg-blue-950/40 border border-blue-500/40 p-4 rounded-xl flex items-start space-x-3 text-xs text-blue-200">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-blue-300">Simulated Sampling Note</span>
          <p className="leading-relaxed">
            This simulator runs locally in TypeScript using deterministic seedable pseudo-random sampling. Real quantum hardware involves physical noise, decoherence, and readout errors.
          </p>
        </div>
      </div>

      {/* Interactive Measurement Laboratory */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Measurement Shot Simulator (State: |+⟩)</h2>
            <p className="text-xs text-gray-400">Select shot count to execute repeated measurements on state |+⟩.</p>
          </div>

          {/* Shot buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-mono">Shots:</span>
            {[1, 10, 100, 1000].map(s => (
              <button
                key={s}
                onClick={() => handleRunShots(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  shots === s
                    ? 'bg-blue-600 text-white shadow glow-cyan'
                    : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-blue-500/50'
                }`}
              >
                {s} Shot{s > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* State Display & Histogram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StateVectorVisualizer
            amplitudes={sim.getStateVector()}
            numQubits={1}
            title="Pre-Measurement Theoretical State"
          />

          <MeasurementHistogram result={measurementResult} />
        </div>
      </div>

      {/* Concept Check */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white">Module 3 Concept Check</h3>
        <p className="text-sm text-gray-200">
          You run 10 shots on state |+⟩ = (|0⟩ + |1⟩)/√2 and observe 7 zeros and 3 ones. What does this outcome demonstrate?
        </p>

        <div className="space-y-2 text-xs font-mono">
          <button
            onClick={() => handleQuizSubmit('opt-a')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-a' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            The simulator is broken because state |+⟩ must give exactly 5 zeros and 5 ones.
          </button>
          <button
            onClick={() => handleQuizSubmit('opt-b')}
            className={`w-full p-3 rounded-lg border text-left transition ${
              quizSelected === 'opt-b' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200' : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
            }`}
          >
            Small sample sizes exhibit statistical fluctuation. Increasing shots (e.g. to 1,000) causes observed frequencies to converge to 50/50.
          </button>
        </div>

        {quizSubmitted && (
          <MisconceptionFeedbackCard
            isCorrect={quizSelected === 'opt-b'}
            misconceptionId={quizSelected === 'opt-b' ? undefined : 'EXACT_HALF_HALF_SAMPLING'}
            explanation={
              quizSelected === 'opt-b'
                ? 'Correct! Quantum sampling obeys statistical probability laws. Sample variance disappears as shot count grows.'
                : 'Small shot counts naturally fluctuate! A 50/50 probability does not force 10 shots to yield exactly 5 and 5.'
            }
          />
        )}

        <div className="flex justify-end pt-4">
          <Link
            to="/module/m4"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <span>Continue to Module 4: Entanglement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
