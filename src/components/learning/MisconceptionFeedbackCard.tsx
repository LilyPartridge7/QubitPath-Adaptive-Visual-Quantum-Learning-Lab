import React from 'react';
import { MisconceptionId } from '../../types/adaptive';
import { MISCONCEPTIONS } from '../../lib/adaptive/misconceptions';
import { AlertTriangle, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MisconceptionFeedbackCardProps {
  misconceptionId?: MisconceptionId;
  explanation: string;
  isCorrect: boolean;
  onRetry?: () => void;
}

export const MisconceptionFeedbackCard: React.FC<MisconceptionFeedbackCardProps> = ({
  misconceptionId,
  explanation,
  isCorrect,
  onRetry,
}) => {
  if (isCorrect) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl flex items-start space-x-3 text-emerald-200">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <span className="font-bold text-emerald-300">Correct Reasoning!</span>
          <p className="text-emerald-100/90 leading-relaxed">{explanation}</p>
        </div>
      </div>
    );
  }

  const misconception = misconceptionId ? MISCONCEPTIONS[misconceptionId] : null;

  return (
    <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl flex flex-col space-y-3">
      <div className="flex items-center space-x-2 text-amber-400">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <span className="font-bold text-sm uppercase tracking-wider">
          {misconception ? misconception.title : 'Concept Check Feedback'}
        </span>
      </div>

      <div className="text-sm text-gray-200 space-y-2">
        <p className="leading-relaxed"><strong className="text-amber-300">Explanation: </strong>{explanation}</p>

        {misconception && (
          <div className="bg-gray-900/80 p-3 rounded-lg border border-amber-500/20 text-xs space-y-1.5 mt-2">
            <div className="flex items-center space-x-1.5 text-cyan-300 font-semibold">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>Key Insight ({misconception.category}):</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{misconception.explanation}</p>
            <p className="text-purple-300 font-medium pt-1">💡 Remedy: {misconception.remedy}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs bg-amber-900/60 hover:bg-amber-800 border border-amber-500/40 text-amber-200 px-3 py-1.5 rounded transition"
          >
            Try Question Again
          </button>
        )}

        {misconception && (
          <Link
            to={`/module/${misconception.recommendedModuleId}`}
            className="text-xs bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-500/40 text-cyan-200 px-3 py-1.5 rounded transition flex items-center space-x-1 ml-auto"
          >
            <span>Review Recommended Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
