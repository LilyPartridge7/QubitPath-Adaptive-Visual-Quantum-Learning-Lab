import React from 'react';
import { ProgressMetrics } from '../types/assessment';
import { LearnerMisconceptionState } from '../types/adaptive';
import { MISCONCEPTIONS } from '../lib/adaptive/misconceptions';
import { BarChart3, Users, AlertCircle, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface EducatorAnalyticsPageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
}

export const EducatorAnalyticsPage: React.FC<EducatorAnalyticsPageProps> = ({
  progress,
  misconceptions,
}) => {
  const preScore = progress.preAssessmentScore !== null ? progress.preAssessmentScore : 0;
  const postScore = progress.postAssessmentScore !== null ? progress.postAssessmentScore : 0;
  const gain = progress.absoluteImprovement !== null ? progress.absoluteImprovement : postScore - preScore;

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400">
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Educator & Classroom Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Individual Learner Analytics</h1>
          <p className="text-sm text-gray-400 max-w-3xl mt-1">
            Summarizes an individual local learner's diagnostic performance, module completion, and misconception correction timeline.
          </p>
        </div>

        {progress.isDemoData && (
          <div className="bg-amber-950/80 border border-amber-500/60 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Demonstration Data Mode</span>
          </div>
        )}
      </div>

      {/* Scope Disclaimer Callout */}
      <div className="bg-gray-900/90 border border-cyan-500/30 p-4 rounded-xl text-xs text-gray-300 space-y-1">
        <span className="font-bold text-cyan-300 block uppercase tracking-wider">Scope Disclaimer</span>
        <p className="leading-relaxed">
          This dashboard summarizes an individual local learner's session data stored in browser LocalStorage. It is designed for classroom demonstration and self-directed monitoring, not a multi-user server backend.
        </p>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Pre- vs Post-Test Gain</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">
            {progress.preAssessmentScore !== null && progress.postAssessmentScore !== null
              ? `${preScore.toFixed(0)}% → ${postScore.toFixed(0)}% (+${gain.toFixed(0)} pts)`
              : 'Assessment Pending'}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Modules Completed</span>
          <span className="text-2xl font-extrabold text-cyan-400 font-mono">
            {progress.modulesCompleted.length} / 4 Modules
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Time Engaged</span>
          <span className="text-2xl font-extrabold text-purple-400 font-mono">
            {Math.max(1, Math.round(progress.timeSpentSeconds / 60))} Minutes
          </span>
        </div>
      </div>

      {/* Misconception Correction Matrix */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Diagnostic Misconception Breakdown</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase">
                <th className="pb-3">Misconception Category</th>
                <th className="pb-3 text-center">Trigger Count</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3">Recommended Module</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {(Object.keys(misconceptions.scores) as Array<keyof typeof misconceptions.scores>).map(key => {
                const info = MISCONCEPTIONS[key];
                const count = misconceptions.scores[key];
                const isResolved = misconceptions.resolved[key];

                return (
                  <tr key={key} className="hover:bg-gray-900/40">
                    <td className="py-3 font-sans font-medium text-white">{info ? info.title : key}</td>
                    <td className="py-3 text-center">{count}</td>
                    <td className="py-3 text-center">
                      {count === 0 ? (
                        <span className="text-gray-500">Not Triggered</span>
                      ) : isResolved ? (
                        <span className="text-emerald-400 font-bold flex items-center justify-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolved</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center justify-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Needs Review</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-sans text-cyan-400">{info ? `Module ${info.recommendedModuleId.toUpperCase()}` : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
