import React from 'react';
import { ProgressMetrics } from '../../types/assessment';
import { CheckCircle2, Circle, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgressTrackerProps {
  progress: ProgressMetrics;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const modules = [
    { id: 'm1', title: '1. From Bits to Qubits', path: '/module/m1' },
    { id: 'm2', title: '2. Quantum Gates', path: '/module/m2' },
    { id: 'm3', title: '3. Measurement', path: '/module/m3' },
    { id: 'm4', title: '4. Entanglement', path: '/module/m4' },
  ];

  const totalSteps = 6; // 4 modules + pre + post
  const completedCount =
    progress.modulesCompleted.length +
    (progress.preAssessmentScore !== null ? 1 : 0) +
    (progress.postAssessmentScore !== null ? 1 : 0);

  const pct = Math.round((completedCount / totalSteps) * 100);
  const minutesSpent = Math.max(1, Math.round(progress.timeSpentSeconds / 60));

  return (
    <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
      {progress.isDemoData && (
        <div className="bg-amber-950/70 border border-amber-500/50 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Demonstration Data Loaded</span>
          </span>
          <span className="text-[10px] bg-amber-900/80 px-2 py-0.5 rounded font-mono uppercase">
            Presentation Mode
          </span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-200">Learning Path Progress</h3>
          <p className="text-xs text-gray-400">{completedCount} of {totalSteps} Core Learning Milestones Completed</p>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs">
          <div className="flex items-center space-x-1 text-gray-300">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{minutesSpent}m spent</span>
          </div>

          {progress.absoluteImprovement !== null && (
            <div className="flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded">
              <TrendingUp className="w-4 h-4" />
              <span>+{progress.absoluteImprovement.toFixed(0)}% Score Gain</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-gray-800">
        <div
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-1 text-xs">
        {/* Pre-Assessment Tile */}
        <Link
          to="/pre-assessment"
          className={`p-2.5 rounded-lg border flex flex-col justify-between space-y-1.5 transition ${
            progress.preAssessmentScore !== null
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
              : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-cyan-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold font-mono text-[11px]">Pre-Test</span>
            {progress.preAssessmentScore !== null ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Circle className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <span className="text-[10px] text-gray-400">
            {progress.preAssessmentScore !== null ? `${progress.preAssessmentScore.toFixed(0)}% Score` : 'Take Diagnostic'}
          </span>
        </Link>

        {/* 4 Modules */}
        {modules.map(mod => {
          const isDone = progress.modulesCompleted.includes(mod.id);
          return (
            <Link
              key={mod.id}
              to={mod.path}
              className={`p-2.5 rounded-lg border flex flex-col justify-between space-y-1.5 transition ${
                isDone
                  ? 'bg-cyan-950/30 border-cyan-800/60 text-cyan-300'
                  : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold font-mono text-[11px] truncate">{mod.title.split('.')[1]}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-600 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-gray-400 truncate">{isDone ? 'Completed' : 'Start Module'}</span>
            </Link>
          );
        })}

        {/* Post-Assessment Tile */}
        <Link
          to="/post-assessment"
          className={`p-2.5 rounded-lg border flex flex-col justify-between space-y-1.5 transition ${
            progress.postAssessmentScore !== null
              ? 'bg-purple-950/30 border-purple-800/60 text-purple-300'
              : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-purple-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold font-mono text-[11px]">Post-Test</span>
            {progress.postAssessmentScore !== null ? (
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            ) : (
              <Circle className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <span className="text-[10px] text-gray-400">
            {progress.postAssessmentScore !== null ? `${progress.postAssessmentScore.toFixed(0)}% Score` : 'Final Assessment'}
          </span>
        </Link>
      </div>
    </div>
  );
};
