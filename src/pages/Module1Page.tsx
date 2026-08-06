import React, { useState } from 'react';
import { Complex, complex, magnitudeSq, formatComplex } from '../lib/quantum/complex';
import { BlochSphere } from '../components/quantum/BlochSphere';
import { StateVectorVisualizer } from '../components/quantum/StateVectorVisualizer';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module1PageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const Module1Page: React.FC<Module1PageProps> = ({
  progress,
  misconceptions,
  onUpdateProgress,
  onUpdateMisconceptions,
}) => {
  const [alpha, setAlpha] = useState<Complex>({ re: 1, im: 0 }); // default |0⟩
  const [beta, setBeta] = useState<Complex>({ re: 0, im: 0 });

  // Preset State Handlers
  const setPreset = (preset: '|0⟩' | '|1⟩' | '|+⟩' | '|−⟩') => {
    const invSqrt2 = 1 / Math.SQRT2;
    switch (preset) {
      case '|0⟩':
        setAlpha({ re: 1, im: 0 });
        setBeta({ re: 0, im: 0 });
        break;
      case '|1⟩':
        setAlpha({ re: 0, im: 0 });
        setBeta({ re: 1, im: 0 });
        break;
      case '|+⟩':
        setAlpha({ re: invSqrt2, im: 0 });
        setBeta({ re: invSqrt2, im: 0 });
        break;
      case '|−⟩':
        setAlpha({ re: invSqrt2, im: 0 });
        setBeta({ re: -invSqrt2, im: 0 });
        break;
    }
  };

  // Quiz state
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = (optId: string) => {
    setQuizSelected(optId);
    setQuizSubmitted(true);

    const isCorrect = optId === 'opt-b';
    const nextMisc = AdaptiveEngine.evaluateAnswer(
      misconceptions,
      'm1-check1',
      optId,
      isCorrect,
      isCorrect ? undefined : 'AMPLITUDE_VS_PROBABILITY'
    );
    onUpdateMisconceptions(nextMisc);
    StorageService.saveMisconceptions(nextMisc);

    // Mark module completed
    if (!progress.modulesCompleted.includes('m1')) {
      const nextProg: ProgressMetrics = {
        ...progress,
        modulesCompleted: [...progress.modulesCompleted, 'm1'],
      };
      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
    }
  };

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Module Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Module 1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">From Bits to Qubits</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Explore the transition from classical binary bits to quantum states, probability amplitudes, normalization, and the Bloch sphere visualization.
        </p>
      </div>

      {/* Conceptual Text Scaffolding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <h3 className="text-sm font-bold text-cyan-300">1. Classical Bits vs Qubits</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            A classical bit is strictly <strong>0</strong> or <strong>1</strong> (a transistor switch). A quantum bit (qubit) exists in a continuous linear superposition state:
            <span className="block font-mono text-cyan-400 mt-1 font-bold text-center">|ψ⟩ = α|0⟩ + β|1⟩</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <h3 className="text-sm font-bold text-purple-300">2. Amplitudes vs Probabilities</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong>α</strong> and <strong>β</strong> are complex probability amplitudes. The probability of measuring state 0 is <strong>|α|²</strong>, and measuring state 1 is <strong>|β|²</strong>.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <h3 className="text-sm font-bold text-emerald-300">3. Normalization Condition</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Total probability must equal 100%:
            <span className="block font-mono text-emerald-400 mt-1 font-bold text-center">|α|² + |β|² = 1</span>
            Amplitudes can be negative or complex, leading to quantum interference!
          </p>
        </div>
      </div>

      {/* Interactive Visual Studio */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Single-Qubit State Laboratory</h2>
            <p className="text-xs text-gray-400">Select standard state presets or adjust theta/phi angles interactively.</p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-mono">Presets:</span>
            {(['|0⟩', '|1⟩', '|+⟩', '|−⟩'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className="px-3 py-1 bg-gray-900 hover:bg-cyan-950 border border-gray-700 hover:border-cyan-500/50 text-cyan-300 font-mono text-xs rounded-lg transition"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Bloch Sphere */}
          <BlochSphere
            alpha={alpha}
            beta={beta}
            interactive={true}
            onStateChange={(a, b) => {
              setAlpha(a);
              setBeta(b);
            }}
          />

          {/* State Vector & Dirac Representation */}
          <StateVectorVisualizer
            amplitudes={[alpha, beta]}
            numQubits={1}
            title="Interactive Qubit State Vector"
          />
        </div>
      </div>

      {/* Concept Check / Formative Assessment */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <span>Module 1 Formative Concept Check</span>
        </h3>

        <p className="text-sm text-gray-200">
          A single qubit is prepared in the state <span className="font-mono text-cyan-300">|ψ⟩ = (1/√2)|0⟩ + (i/√2)|1⟩</span>. What is the probability of measuring state |1⟩?
        </p>

        <div className="space-y-2 text-xs font-mono">
          {[
            { id: 'opt-a', label: 'i/√2 (approx 0.707i)', isCorrect: false },
            { id: 'opt-b', label: '1/2 (50%)', isCorrect: true },
            { id: 'opt-c', label: '1 (100%)', isCorrect: false },
            { id: 'opt-d', label: '0 (0%)', isCorrect: false },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleQuizSubmit(opt.id)}
              className={`w-full p-3 rounded-lg border text-left transition ${
                quizSelected === opt.id
                  ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200'
                  : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {quizSubmitted && (
          <MisconceptionFeedbackCard
            isCorrect={quizSelected === 'opt-b'}
            misconceptionId={quizSelected === 'opt-b' ? undefined : 'AMPLITUDE_VS_PROBABILITY'}
            explanation={
              quizSelected === 'opt-b'
                ? 'Correct! The amplitude β is i/√2. The measurement probability is |β|² = |i/√2|² = 1/2 = 50%.'
                : 'i/√2 is the complex amplitude β. Probability is always a real number equal to |β|² = |i/√2|² = 1/2.'
            }
          />
        )}

        <div className="flex justify-end pt-4">
          <Link
            to="/module/m2"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <span>Continue to Module 2: Quantum Gates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
