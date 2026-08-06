import React from 'react';
import { Complex, formatComplex, magnitudeSq, phase } from '../../lib/quantum/complex';

interface StateVectorVisualizerProps {
  amplitudes: Complex[];
  numQubits?: 1 | 2;
  title?: string;
}

export const StateVectorVisualizer: React.FC<StateVectorVisualizerProps> = ({
  amplitudes,
  numQubits = 1,
  title = 'State Vector & Probabilities',
}) => {
  const basisLabels = numQubits === 1 ? ['|0⟩', '|1⟩'] : ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
  const probabilities = amplitudes.map(c => magnitudeSq(c));
  const phases = amplitudes.map(c => phase(c));

  // Build Dirac Notation string
  const diracTerms = amplitudes
    .map((c, i) => {
      const prob = probabilities[i];
      if (prob < 1e-4) return null;
      const cStr = formatComplex(c);
      const formattedAmplitude = cStr === '1' ? '' : cStr === '-1' ? '-' : `(${cStr})`;
      return `${formattedAmplitude}${basisLabels[i]}`;
    })
    .filter(Boolean);

  const diracString = diracTerms.length > 0 ? diracTerms.join(' + ').replace(/\+ -/g, '- ') : '0';

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{title}</h3>
        <span className="text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">
          {numQubits}-Qubit State Space
        </span>
      </div>

      {/* Dirac Notation Box */}
      <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center">
        <span className="text-xs text-gray-400 block mb-1">State Dirac Representation</span>
        <div className="text-lg md:text-xl font-mono text-cyan-300 tracking-wide font-bold">
          |ψ⟩ = {diracString}
        </div>
      </div>

      {/* Amplitudes & Probabilities List */}
      <div className="grid grid-cols-1 gap-3">
        {basisLabels.map((label, idx) => {
          const amp = amplitudes[idx] || { re: 0, im: 0 };
          const prob = probabilities[idx] || 0;
          const pct = (prob * 100).toFixed(1);
          const phaseRad = phases[idx] || 0;
          const phaseDeg = ((((phaseRad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * 180 / Math.PI).toFixed(0);

          return (
            <div key={label} className="bg-gray-900/60 p-3 rounded-lg border border-gray-800/80 flex flex-col space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-cyan-400 text-sm">{label}</span>
                <div className="flex space-x-3 font-mono">
                  <span className="text-gray-300">amp = {formatComplex(amp)}</span>
                  <span className="text-purple-400">phase = {phaseDeg}°</span>
                  <span className="text-cyan-300 font-bold">P = {pct}%</span>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${Math.max(0, Math.min(100, prob * 100))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
