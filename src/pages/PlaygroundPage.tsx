import React, { useState } from 'react';
import { GateType, Gate } from '../types/quantum';
import { QuantumSimulator } from '../lib/quantum/simulator';
import { CircuitBoard } from '../components/quantum/CircuitBoard';
import { StateVectorVisualizer } from '../components/quantum/StateVectorVisualizer';
import { MeasurementHistogram } from '../components/quantum/MeasurementHistogram';
import { GateMatrixDisplay } from '../components/quantum/GateMatrixDisplay';
import { BlochSphere } from '../components/quantum/BlochSphere';
import { Cpu, RotateCcw, Sparkles, HelpCircle, Play } from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  const [numQubits, setNumQubits] = useState<1 | 2>(1);
  const [sim, setSim] = useState(() => new QuantumSimulator(1));
  const [activeStep, setActiveStep] = useState(0);
  const [gatesList, setGatesList] = useState<Gate[]>([]);
  const [shots, setShots] = useState(100);
  const [seed, setSeed] = useState(42);
  const [measurementResult, setMeasurementResult] = useState(() => sim.runMeasurement(100, 42));

  // Re-run simulator up to step
  const rebuildSimulator = (qCount: 1 | 2, gList: Gate[], stepIndex: number) => {
    const s = new QuantumSimulator(qCount);
    const toApply = gList.slice(0, stepIndex);
    toApply.forEach(g => {
      s.applyGate(g.type, g.targetQubit, g.controlQubit);
    });
    setSim(s);
    setMeasurementResult(s.runMeasurement(shots, seed));
  };

  const handleNumQubitsChange = (count: 1 | 2) => {
    setNumQubits(count);
    setGatesList([]);
    setActiveStep(0);
    rebuildSimulator(count, [], 0);
  };

  const handleAddGate = (type: GateType, targetQubit: number, controlQubit?: number) => {
    const newGate: Gate = {
      id: `gate-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      targetQubit,
      controlQubit,
      name: type,
      matrix: [],
      description: '',
    };
    const nextList = [...gatesList, newGate];
    const nextStep = nextList.length;
    setGatesList(nextList);
    setActiveStep(nextStep);
    rebuildSimulator(numQubits, nextList, nextStep);
  };

  const handleRemoveGate = (index: number) => {
    const nextList = gatesList.filter((_, i) => i !== index);
    const nextStep = Math.min(activeStep, nextList.length);
    setGatesList(nextList);
    setActiveStep(nextStep);
    rebuildSimulator(numQubits, nextList, nextStep);
  };

  const handleReset = () => {
    setGatesList([]);
    setActiveStep(0);
    rebuildSimulator(numQubits, [], 0);
  };

  const handleStepForward = () => {
    if (activeStep < gatesList.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      rebuildSimulator(numQubits, gatesList, nextStep);
    }
  };

  const handleStepBackward = () => {
    if (activeStep > 0) {
      const nextStep = activeStep - 1;
      setActiveStep(nextStep);
      rebuildSimulator(numQubits, gatesList, nextStep);
    }
  };

  const handleStepTo = (step: number) => {
    const validStep = Math.max(0, Math.min(gatesList.length, step));
    setActiveStep(validStep);
    rebuildSimulator(numQubits, gatesList, validStep);
  };

  // Example Circuit Presets
  const loadExampleCircuit = (exampleName: string) => {
    if (exampleName === 'coin-flip') {
      handleNumQubitsChange(1);
      setTimeout(() => {
        handleAddGate('H', 0);
      }, 50);
    } else if (exampleName === 'return-to-zero') {
      handleNumQubitsChange(1);
      setTimeout(() => {
        const list: Gate[] = [
          { id: '1', type: 'H', targetQubit: 0, name: 'H', matrix: [], description: '' },
          { id: '2', type: 'H', targetQubit: 0, name: 'H', matrix: [], description: '' },
        ];
        setGatesList(list);
        setActiveStep(2);
        rebuildSimulator(1, list, 2);
      }, 50);
    } else if (exampleName === 'phase-demo') {
      handleNumQubitsChange(1);
      setTimeout(() => {
        const list: Gate[] = [
          { id: '1', type: 'H', targetQubit: 0, name: 'H', matrix: [], description: '' },
          { id: '2', type: 'Z', targetQubit: 0, name: 'Z', matrix: [], description: '' },
          { id: '3', type: 'H', targetQubit: 0, name: 'H', matrix: [], description: '' },
        ];
        setGatesList(list);
        setActiveStep(3);
        rebuildSimulator(1, list, 3);
      }, 50);
    } else if (exampleName === 'bell-state') {
      handleNumQubitsChange(2);
      setTimeout(() => {
        const list: Gate[] = [
          { id: '1', type: 'H', targetQubit: 0, name: 'H', matrix: [], description: '' },
          { id: '2', type: 'CNOT', targetQubit: 1, controlQubit: 0, name: 'CNOT', matrix: [], description: '' },
        ];
        setGatesList(list);
        setActiveStep(2);
        rebuildSimulator(2, list, 2);
      }, 50);
    }
  };

  const currentHistory = sim.getHistory();
  const currentStepInfo = currentHistory[currentHistory.length - 1] || {
    explanation: { plain: 'Initial zero state.', math: '|0⟩' },
  };

  const lastGateApplied = gatesList[activeStep - 1];

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400">
            <Cpu className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Interactive Workbench</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Quantum Playground</h1>
          <p className="text-sm text-gray-400">Construct custom 1 & 2 qubit circuits, step through gate operations, and analyze measurement shot distributions.</p>
        </div>

        {/* Qubit Mode Selector */}
        <div className="flex items-center space-x-2 bg-gray-900 p-1.5 rounded-xl border border-gray-800">
          <span className="text-xs font-mono text-gray-400 px-2">Mode:</span>
          <button
            onClick={() => handleNumQubitsChange(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              numQubits === 1 ? 'bg-cyan-600 text-white shadow glow-cyan' : 'text-gray-400 hover:text-white'
            }`}
          >
            1-Qubit
          </button>
          <button
            onClick={() => handleNumQubitsChange(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              numQubits === 2 ? 'bg-purple-600 text-white shadow glow-violet' : 'text-gray-400 hover:text-white'
            }`}
          >
            2-Qubits
          </button>
        </div>
      </div>

      {/* Preset Circuit Launcher Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Load Example Circuit:</span>
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadExampleCircuit('coin-flip')}
            className="px-3 py-1 bg-gray-900 hover:bg-cyan-950 border border-gray-700 hover:border-cyan-500/40 text-cyan-300 text-xs rounded-lg transition"
          >
            Quantum Coin Flip (H)
          </button>
          <button
            onClick={() => loadExampleCircuit('return-to-zero')}
            className="px-3 py-1 bg-gray-900 hover:bg-cyan-950 border border-gray-700 hover:border-cyan-500/40 text-cyan-300 text-xs rounded-lg transition"
          >
            Return to Zero (H-H)
          </button>
          <button
            onClick={() => loadExampleCircuit('phase-demo')}
            className="px-3 py-1 bg-gray-900 hover:bg-purple-950 border border-gray-700 hover:border-purple-500/40 text-purple-300 text-xs rounded-lg transition"
          >
            Phase Flip (H-Z-H)
          </button>
          <button
            onClick={() => loadExampleCircuit('bell-state')}
            className="px-3 py-1 bg-gray-900 hover:bg-emerald-950 border border-gray-700 hover:border-emerald-500/40 text-emerald-300 text-xs rounded-lg transition font-semibold"
          >
            Bell-State Generator (H + CNOT)
          </button>
        </div>
      </div>

      {/* Circuit Board Grid */}
      <CircuitBoard
        numQubits={numQubits}
        gates={gatesList}
        activeStep={activeStep}
        onAddGate={handleAddGate}
        onRemoveGate={handleRemoveGate}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onStepTo={handleStepTo}
      />

      {/* Main Analysis Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: State Vector Visualizer & Bloch Sphere */}
        <div className="space-y-6">
          <StateVectorVisualizer
            amplitudes={sim.getStateVector()}
            numQubits={numQubits}
            title={`Step ${activeStep} State Vector`}
          />

          {numQubits === 1 && (
            <BlochSphere
              alpha={sim.getStateVector()[0]}
              beta={sim.getStateVector()[1]}
            />
          )}
        </div>

        {/* Right Col: Prominent "Why did this happen?" Panel & Measurement Histogram */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <HelpCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Why did this happen?</h3>
            </div>

            {lastGateApplied ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-cyan-300 font-mono font-bold">
                  <span>Gate: {lastGateApplied.type}</span>
                  <span>(Target: q{lastGateApplied.targetQubit})</span>
                </div>
                <p className="text-gray-200 leading-relaxed font-sans">{currentStepInfo.explanation.plain}</p>
                <div className="bg-gray-950 p-2.5 rounded border border-gray-800 font-mono text-cyan-400">
                  Math: {currentStepInfo.explanation.math || 'Matrix-vector multiplication applied.'}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Add a gate or load an example circuit above to inspect step-by-step mathematical explanations.</p>
            )}
          </div>

          <MeasurementHistogram result={measurementResult} />
        </div>
      </div>
    </div>
  );
};
