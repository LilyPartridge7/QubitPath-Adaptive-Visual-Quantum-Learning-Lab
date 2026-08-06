import React from 'react';
import { ProgressMetrics } from '../types/assessment';
import { LearnerMisconceptionState } from '../types/adaptive';
import { RecommendationBanner } from '../components/learning/RecommendationBanner';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { Award, TrendingUp, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResultsPageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ progress, misconceptions }) => {
  const recommendations = AdaptiveEngine.generateRecommendations(misconceptions);
  const resolvedConcepts = (Object.keys(misconceptions.resolved) as Array<keyof typeof misconceptions.resolved>).filter(
    k => misconceptions.resolved[k]
  );

  const preScore = progress.preAssessmentScore !== null ? progress.preAssessmentScore : 0;
  const postScore = progress.postAssessmentScore !== null ? progress.postAssessmentScore : 0;
  const gain = progress.absoluteImprovement !== null ? progress.absoluteImprovement : postScore - preScore;

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400">
            <Award className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Evaluation Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Measurable Learning Progress</h1>
          <p className="text-sm text-gray-400">Detailed breakdown of pre- vs post-assessment score gains and conceptual misconception reduction.</p>
        </div>

        {progress.isDemoData && (
          <div className="bg-amber-950/80 border border-amber-500/60 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Demonstration Data Mode</span>
          </div>
        )}
      </div>

      {/* Metrics Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Pre-Assessment Score</span>
          <span className="text-3xl font-extrabold text-cyan-400 font-mono">
            {progress.preAssessmentScore !== null ? `${preScore.toFixed(0)}%` : 'N/A'}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Post-Assessment Score</span>
          <span className="text-3xl font-extrabold text-purple-400 font-mono">
            {progress.postAssessmentScore !== null ? `${postScore.toFixed(0)}%` : 'N/A'}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1 bg-emerald-950/20 border-emerald-500/30">
          <span className="text-xs text-emerald-300 font-mono block">Absolute Gain</span>
          <span className="text-3xl font-extrabold text-emerald-400 font-mono">
            {gain >= 0 ? `+${gain.toFixed(0)}%` : `${gain.toFixed(0)}%`}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-400 font-mono block">Mastered Concepts</span>
          <span className="text-3xl font-extrabold text-cyan-300 font-mono">
            {resolvedConcepts.length} / 8
          </span>
        </div>
      </div>

      {/* Adaptive Recommendation Dashboard */}
      <RecommendationBanner recommendations={recommendations} resolvedConcepts={resolvedConcepts} />

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
        <Link
          to="/educator-analytics"
          className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-cyan-300 font-semibold text-xs rounded-xl transition flex items-center space-x-1.5"
        >
          <span>View Educator Analytics Summary</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/playground"
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
        >
          <span>Return to Quantum Playground</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
