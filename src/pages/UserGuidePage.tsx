import React from 'react';
import { BookOpen, Cpu, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserGuidePage: React.FC = () => {
  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">User Documentation</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">User Guide & FAQ</h1>
        <p className="text-sm text-gray-400 max-w-3xl mt-1">
          Complete walkthrough of QubitPath’s visual controls, interactive circuit canvas, assessments, and presentation demo features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Card 1 */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-cyan-300 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>1. Taking the Pre-Assessment</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Begin by launching the 8-question Pre-Assessment. It establishes your baseline score and identifies any existing quantum misconceptions (e.g. amplitude vs probability confusion).
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-purple-300 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>2. Working Through the 4 Modules</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Follow the scaffolded modules in order. Use interactive sliders on the Bloch sphere, test gate applications, run 1 to 1,000 shot measurements, and prepare Bell states.
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-blue-300 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>3. Using the Quantum Playground</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Switch between 1-qubit and 2-qubit canvas modes. Click gate buttons to construct custom circuits. Step forward and backward through gate executions to inspect Dirac math and "Why did this happen?" explanations.
          </p>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>4. Presentation & Demo Data Mode</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            For live demonstrations or evaluations, click "Load Demo Data" in the navigation bar. This populates a sample learner profile clearly marked as "Demonstration Data" across all analytics views.
          </p>
        </div>
      </div>
    </div>
  );
};
