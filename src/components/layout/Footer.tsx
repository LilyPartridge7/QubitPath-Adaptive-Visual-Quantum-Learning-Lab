import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm">QubitPath</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-[11px]">
            An Adaptive Visual Quantum Learning Lab submitted for the WISER Summer Program 2026 Industry Challenge.
          </p>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Classical State-Vector Simulator (1-2 Qubits)</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Learning Modules</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/module/m1" className="hover:text-cyan-300 transition">1. From Bits to Qubits</Link></li>
            <li><Link to="/module/m2" className="hover:text-cyan-300 transition">2. Quantum Gates</Link></li>
            <li><Link to="/module/m3" className="hover:text-cyan-300 transition">3. Measurement</Link></li>
            <li><Link to="/module/m4" className="hover:text-cyan-300 transition">4. Entanglement</Link></li>
            <li><Link to="/playground" className="hover:text-cyan-300 transition">Quantum Playground</Link></li>
          </ul>
        </div>

        {/* Col 3: Assessments & Analytics */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Evaluation & Tools</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/pre-assessment" className="hover:text-cyan-300 transition">Diagnostic Pre-Assessment</Link></li>
            <li><Link to="/post-assessment" className="hover:text-cyan-300 transition">Post-Assessment</Link></li>
            <li><Link to="/results" className="hover:text-cyan-300 transition">Learning Progress & Results</Link></li>
            <li><Link to="/educator-analytics" className="hover:text-cyan-300 transition">Educator Analytics Summary</Link></li>
            <li><Link to="/user-guide" className="hover:text-cyan-300 transition">User Guide & FAQ</Link></li>
          </ul>
        </div>

        {/* Col 4: Author & Submission */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Challenge Submission</h4>
          <p className="text-[10px] text-gray-400">WISER Education Challenge 2026 Submission.</p>
          <ul className="space-y-1 text-[11px]">
            <li><Link to="/about" className="hover:text-cyan-300 transition">Educational Methodology & Tech Report</Link></li>
          </ul>
          <div className="pt-2 text-[10px] text-gray-400 space-y-1 font-mono">
            <p className="text-cyan-300 font-bold">Author: Yoon Yati Linn</p>
            <p>3rd Year CS Student, University of Information Technology (Myanmar)</p>
            <p>License: MIT Open Source</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-gray-900 text-center text-[10px] text-gray-500">
        QubitPath © 2026 — Created by Yoon Yati Linn for WISER Challenge. Built with React, TypeScript, Tailwind CSS, and Vitest.
      </div>
    </footer>
  );
};
