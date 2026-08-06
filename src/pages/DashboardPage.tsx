import React from 'react';
import { ProgressMetrics } from '../types/assessment';
import { LearnerMisconceptionState } from '../types/adaptive';
import { ProgressTracker } from '../components/learning/ProgressTracker';
import { RecommendationBanner } from '../components/learning/RecommendationBanner';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { Link } from 'react-router-dom';
import { Cpu, HelpCircle, BarChart3, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ progress, misconceptions }) => {
  const recommendations = AdaptiveEngine.generateRecommendations(misconceptions);
  const resolvedConcepts = (Object.keys(misconceptions.resolved) as Array<keyof typeof misconceptions.resolved>).filter(
    k => misconceptions.resolved[k]
  );

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Learning Path Dashboard</h1>
        <p className="text-sm text-gray-400">Track your progress across all four quantum modules and assessment milestones.</p>
      </div>

      {/* Progress Tracker Banner */}
      <ProgressTracker progress={progress} />

      {/* Adaptive Recommendation Dashboard */}
      <RecommendationBanner recommendations={recommendations} resolvedConcepts={resolvedConcepts} />

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link
          to="/pre-assessment"
          className="glass-panel-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Diagnostic Pre-Test</span>
            </div>
            <p className="text-xs text-gray-300">
              8-question baseline assessment to identify your current quantum intuition.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>{progress.preAssessmentScore !== null ? `Score: ${progress.preAssessmentScore.toFixed(0)}%` : 'Take Diagnostic'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          to="/playground"
          className="glass-panel-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-purple-400">
              <Cpu className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Quantum Playground</span>
            </div>
            <p className="text-xs text-gray-300">
              Open circuit canvas to construct 1 & 2 qubit circuits, step through states, and sample shots.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-purple-400">
            <span>Launch Circuit Canvas</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          to="/post-assessment"
          className="glass-panel-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <BarChart3 className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Post-Assessment</span>
            </div>
            <p className="text-xs text-gray-300">
              8-question final evaluation to measure your conceptual score gain and misconception reduction.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>{progress.postAssessmentScore !== null ? `Score: ${progress.postAssessmentScore.toFixed(0)}%` : 'Take Final Assessment'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
};
