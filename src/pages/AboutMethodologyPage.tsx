import React from 'react';
import { BookOpen, ShieldCheck, Cpu, Lightbulb, CheckCircle2 } from 'lucide-react';

export const AboutMethodologyPage: React.FC = () => {
  const references = [
    {
      author: 'Nielsen, M. A., & Chuang, I. L.',
      year: '2010',
      title: 'Quantum Computation and Quantum Information (10th Anniversary Edition)',
      publisher: 'Cambridge University Press',
    },
    {
      author: 'Qiskit Textbook Development Team',
      year: '2023',
      title: 'Learn Quantum Computing with Qiskit',
      publisher: 'IBM Quantum Learning',
    },
    {
      author: 'Rieffel, E. G., & Polak, W. H.',
      year: '2011',
      title: 'Quantum Computing: A Gentle Introduction',
      publisher: 'MIT Press',
    },
    {
      author: 'Kaye, P., Laflamme, R., & Mosca, M.',
      year: '2007',
      title: 'An Introduction to Quantum Computing',
      publisher: 'Oxford University Press',
    },
  ];

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Design & Pedagogy</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Educational Methodology & Tech Report</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Detailed explanation of QubitPath’s pedagogical principles, misconceptions framework, software architecture, and academic references.
        </p>
      </div>

      {/* Core Pedagogical Principles */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <span>Implemented Educational Principles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h3 className="font-bold text-cyan-300 text-sm">1. Scaffolded Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              Concepts build sequentially from single-qubit basis states → unitary gates → measurement collapse → two-qubit Bell state entanglement.
            </p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h3 className="font-bold text-purple-300 text-sm">2. Prediction Before Observation</h3>
            <p className="text-gray-300 leading-relaxed">
              Learners commit to a prediction before applying gates or taking measurements, triggering cognitive engagement and active hypothesis testing.
            </p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h3 className="font-bold text-blue-300 text-sm">3. Immediate Formative Feedback</h3>
            <p className="text-gray-300 leading-relaxed">
              Incorrect answers trigger misconception-specific explanations, calling out exact physical principles and recommending targeted review modules.
            </p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h3 className="font-bold text-emerald-300 text-sm">4. Multiple Representations</h3>
            <p className="text-gray-300 leading-relaxed">
              Every quantum state is simultaneously presented as plain language, Dirac notation (|ψ⟩), 2x2/4x4 matrices, 3D Bloch sphere vector, and probability histograms.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack & Architecture */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <span>System Architecture & Quantum Simulator</span>
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed">
          QubitPath is built as a zero-dependency frontend application hosted on GitHub Pages. It incorporates a custom TypeScript state-vector engine supporting 1- and 2-qubit operations with complex arithmetic, state vector normalization checks, unit-tested gate matrices, and Mulberry32 seedable PRNG sampling.
        </p>
      </div>

      {/* References */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span>Academic & Literature References</span>
        </h2>

        <div className="space-y-3 text-xs">
          {references.map((ref, idx) => (
            <div key={idx} className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800 space-y-1">
              <span className="font-bold text-gray-200">{ref.author} ({ref.year}).</span>
              <p className="text-cyan-300 italic">{ref.title}.</p>
              <span className="text-gray-400 block">{ref.publisher}.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
