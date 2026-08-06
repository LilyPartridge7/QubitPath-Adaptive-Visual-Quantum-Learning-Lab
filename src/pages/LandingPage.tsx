import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, Cpu, Sparkles, BookOpen, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center space-y-6 pt-10 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2 glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>WISER Summer Program 2026 Industry Challenge Submission</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          An Adaptive Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">Quantum Learning Lab</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          QubitPath bridges plain-language explanations, mathematical representations, and interactive 1- and 2-qubit state-vector simulations to make quantum computing intuitive—driven by real-time misconception feedback.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/pre-assessment"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-xl glow-cyan transition transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <span>Start Diagnostic & Learning Path</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/playground"
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-cyan-300 font-semibold text-sm rounded-xl transition flex items-center space-x-2"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Try the Quantum Playground</span>
          </Link>
        </div>
      </section>

      {/* Target Audience & Problem Statement */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-lg font-bold text-cyan-300 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>The Challenge We Address</span>
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Beginners often encounter quantum computing either as dense matrix algebra or isolated code snippets. They memorize terms like <em>superposition</em> and <em>entanglement</em> without developing an intuitive understanding of how quantum states change when gates are applied.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-lg font-bold text-purple-300 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Target Learners</span>
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Undergraduates & high-school students with basic algebra knowledge</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Software developers transitioning into quantum computing</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Educators needing reusable interactive classroom demonstrations</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4 Interactive Modules Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">4 Scaffolded Learning Modules</h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            From single-qubit state vectors to two-qubit Bell state entanglement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Module 1</span>
              <h3 className="text-lg font-bold text-white">From Bits to Qubits</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Basis states |0⟩ & |1⟩, amplitudes α and β, normalization |α|² + |β|² = 1, and interactive Bloch sphere.
              </p>
            </div>
            <Link to="/module/m1" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
              <span>Explore Module 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">Module 2</span>
              <h3 className="text-lg font-bold text-white">Quantum Gates</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Single-qubit unitary gates (X, Y, Z, H, S, T), matrices, relative phase changes, and prediction before observation.
              </p>
            </div>
            <Link to="/module/m2" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1">
              <span>Explore Module 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">Module 3</span>
              <h3 className="text-lg font-bold text-white">Measurement</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                State collapse, 1 to 1,000 shot sampling, comparison histograms with theoretical probabilities, seedable PRNG.
              </p>
            </div>
            <Link to="/module/m3" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1">
              <span>Explore Module 3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Module 4</span>
              <h3 className="text-lg font-bold text-white">Entanglement</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                2-qubit product vs Bell states (|00⟩+|11⟩)/√2, CNOT operation, correlation, and debunking FTL communication.
              </p>
            </div>
            <Link to="/module/m4" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
              <span>Explore Module 4</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Misconception Engine Highlight */}
      <section className="glass-panel p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Why QubitPath is Different: <span className="text-cyan-400">Misconception-Driven Feedback</span>
        </h3>
        <p className="text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Unlike standard circuit tools, QubitPath evaluates learner predictions against 8 common quantum computing misconceptions. When you make a wrong choice, the system doesn’t just say "wrong"—it diagnoses <em>why</em> you thought that, explains the correct physical law, and points you to targeted review activities.
        </p>
      </section>
    </div>
  );
};
