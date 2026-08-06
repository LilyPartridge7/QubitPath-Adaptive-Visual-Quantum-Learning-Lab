import React from 'react';
import { DiagnosticRecommendation } from '../../types/adaptive';
import { MISCONCEPTIONS } from '../../lib/adaptive/misconceptions';
import { Award, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendationBannerProps {
  recommendations: DiagnosticRecommendation[];
  resolvedConcepts: string[];
}

export const RecommendationBanner: React.FC<RecommendationBannerProps> = ({
  recommendations,
  resolvedConcepts,
}) => {
  const topRec = recommendations[0];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-bold text-base uppercase tracking-wider">Adaptive Learning Dashboard</h3>
        </div>
        <span className="text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-1 rounded-full font-mono">
          Rule-Based Diagnostic Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strong Concepts */}
        <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Mastered / Improving Concepts ({resolvedConcepts.length})</span>
          </div>
          {resolvedConcepts.length > 0 ? (
            <ul className="space-y-1 text-xs text-emerald-200 list-disc list-inside">
              {resolvedConcepts.map(cId => {
                const info = MISCONCEPTIONS[cId as keyof typeof MISCONCEPTIONS];
                return <li key={cId}>{info ? info.title : cId}</li>;
              })}
            </ul>
          ) : (
            <p className="text-xs text-gray-400 italic">Complete module checks or assessments to track mastered topics.</p>
          )}
        </div>

        {/* Needs Review */}
        <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Concepts Needing Review ({recommendations.length})</span>
          </div>
          {recommendations.length > 0 ? (
            <ul className="space-y-1 text-xs text-amber-200 list-disc list-inside">
              {recommendations.map(r => (
                <li key={r.misconceptionId}>
                  <span className="font-medium">{r.title}</span> ({r.urgency} priority)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-300 font-medium">No misconceptions detected! You demonstrate clear conceptual understanding.</p>
          )}
        </div>
      </div>

      {/* Recommended Next Step Callout */}
      {topRec ? (
        <div className="bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-500/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              Recommended Next Activity
            </span>
            <h4 className="text-sm font-bold text-white">{topRec.title}</h4>
            <p className="text-xs text-gray-300">{topRec.remedy}</p>
          </div>

          <Link
            to={`/module/${topRec.targetModuleId}`}
            className="shrink-0 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-lg shadow-lg glow-cyan transition flex items-center space-x-1.5"
          >
            <span>Jump to Module</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900/60 border border-gray-800 p-3 rounded-xl flex items-center justify-between text-xs text-gray-300">
          <span>Ready to practice with open-ended circuits?</span>
          <Link
            to="/playground"
            className="px-3 py-1.5 bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-500/40 text-cyan-200 font-semibold rounded transition flex items-center space-x-1"
          >
            <span>Launch Quantum Playground</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
