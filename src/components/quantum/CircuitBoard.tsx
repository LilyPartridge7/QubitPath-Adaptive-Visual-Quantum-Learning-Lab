import React from 'react';
import { Gate, GateType } from '../../types/quantum';
import { Plus, Trash2, RotateCcw, SkipBack, SkipForward, Play } from 'lucide-react';

interface CircuitBoardProps {
  numQubits: 1 | 2;
  gates: Gate[];
  activeStep: number;
  onAddGate: (type: GateType, targetQubit: number, controlQubit?: number) => void;
  onRemoveGate: (index: number) => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onStepTo: (step: number) => void;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
  numQubits,
  gates,
  activeStep,
  onAddGate,
  onRemoveGate,
  onReset,
  onStepForward,
  onStepBackward,
  onStepTo,
}) => {
  const qubitLabels = numQubits === 1 ? ['q0'] : ['q0', 'q1'];

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col space-y-4">
      {/* Circuit Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Circuit Controls</span>
          <span className="text-xs bg-gray-800 text-cyan-300 px-2 py-0.5 rounded font-mono">
            Step {activeStep} / {gates.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onStepBackward}
            disabled={activeStep <= 0}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200 rounded transition"
            title="Step Backward"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onStepForward}
            disabled={activeStep >= gates.length}
            className="p-1.5 bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-500/40 text-cyan-200 rounded transition flex items-center space-x-1 text-xs"
            title="Step Forward"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step</span>
          </button>
          <button
            onClick={onReset}
            className="p-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-800/40 text-red-200 rounded transition flex items-center space-x-1 text-xs"
            title="Reset Circuit"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Visual Wires & Gates */}
      <div className="overflow-x-auto py-4 px-2 bg-gray-950/90 rounded-lg border border-gray-800 min-h-[160px] flex flex-col justify-center space-y-8">
        {qubitLabels.map((qLabel, qIdx) => (
          <div key={qLabel} className="relative flex items-center min-w-[500px]">
            {/* Qubit Label & Initial State */}
            <div className="w-20 flex items-center space-x-1 font-mono text-xs text-cyan-400 font-bold z-10 bg-gray-950 pr-2">
              <span>{qLabel}: |0⟩</span>
            </div>

            {/* Wire Line */}
            <div className="absolute left-16 right-4 h-0.5 bg-cyan-500/30 z-0" />

            {/* Gates on Wire */}
            <div className="flex items-center space-x-6 ml-20 z-10 min-h-[44px]">
              {gates.map((gate, gIdx) => {
                const isActive = activeStep > gIdx;
                const isTarget = gate.targetQubit === qIdx;
                const isControl = gate.controlQubit === qIdx;

                if (!isTarget && !isControl) {
                  // Empty wire segment
                  return <div key={gate.id} className="w-12 h-10 border-t-0 border-b-0 border-cyan-500/20" />;
                }

                if (gate.type === 'CNOT') {
                  if (isControl) {
                    return (
                      <div
                        key={gate.id}
                        onClick={() => onStepTo(gIdx + 1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition ${
                          isActive ? 'bg-purple-600 text-white shadow-lg glow-violet' : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                        title={`CNOT Control (Step ${gIdx + 1})`}
                      >
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={gate.id}
                        onClick={() => onStepTo(gIdx + 1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition font-bold font-mono text-lg ${
                          isActive ? 'bg-purple-600 text-white shadow-lg glow-violet' : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                        title={`CNOT Target (Step ${gIdx + 1})`}
                      >
                        ⊕
                      </div>
                    );
                  }
                }

                // Single qubit gate
                return (
                  <div
                    key={gate.id}
                    onClick={() => onStepTo(gIdx + 1)}
                    className={`relative group w-11 h-11 rounded-lg flex items-center justify-center cursor-pointer font-bold font-mono text-sm transition ${
                      isActive
                        ? 'bg-cyan-600 text-white shadow-lg glow-cyan border border-cyan-300'
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50'
                    }`}
                  >
                    <span>{gate.type}</span>

                    {/* Delete Gate Hover Icon */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRemoveGate(gIdx);
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow"
                      title="Remove Gate"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Gate Quick Toolbar */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-gray-400 font-semibold mr-2">Add Gate:</span>
        {(['X', 'Y', 'Z', 'H', 'S', 'T'] as GateType[]).map(type => (
          <button
            key={type}
            onClick={() => onAddGate(type, 0)}
            className="px-2.5 py-1 bg-gray-800 hover:bg-cyan-900/60 border border-gray-700 hover:border-cyan-500/50 text-cyan-300 text-xs font-mono rounded transition flex items-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>{type} (q0)</span>
          </button>
        ))}

        {numQubits === 2 && (
          <>
            {(['X', 'Y', 'Z', 'H', 'S', 'T'] as GateType[]).map(type => (
              <button
                key={`${type}-q1`}
                onClick={() => onAddGate(type, 1)}
                className="px-2 py-1 bg-gray-800 hover:bg-purple-900/60 border border-gray-700 hover:border-purple-500/50 text-purple-300 text-xs font-mono rounded transition flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>{type} (q1)</span>
              </button>
            ))}

            <button
              onClick={() => onAddGate('CNOT', 1, 0)}
              className="px-3 py-1 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/50 text-purple-200 text-xs font-mono rounded transition flex items-center space-x-1 font-semibold"
            >
              <Plus className="w-3 h-3" />
              <span>CNOT (Ctrl: q0, Tgt: q1)</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
