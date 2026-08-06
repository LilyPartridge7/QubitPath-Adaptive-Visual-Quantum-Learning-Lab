import React, { useState } from 'react';
import { HelpCircle, Eye, CheckCircle, AlertCircle } from 'lucide-react';

interface PredictionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

interface PredictionPromptProps {
  title: string;
  question: string;
  options: PredictionOption[];
  onObserved?: () => void;
}

export const PredictionPrompt: React.FC<PredictionPromptProps> = ({
  title,
  question,
  options,
  onObserved,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectedOpt = options.find(o => o.id === selectedId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setRevealed(true);
    if (onObserved) onObserved();
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col space-y-3">
      <div className="flex items-center space-x-2 text-cyan-400">
        <HelpCircle className="w-5 h-5 shrink-0" />
        <h4 className="font-bold text-sm uppercase tracking-wider">{title}</h4>
      </div>

      <p className="text-sm text-gray-200 font-medium">{question}</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-2">
          {options.map(opt => {
            const isSelected = selectedId === opt.id;
            let btnStyle = 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300';

            if (isSelected) {
              btnStyle = 'border-cyan-500 bg-cyan-950/50 text-cyan-200 glow-cyan';
            }

            if (revealed) {
              if (opt.isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200';
              } else if (isSelected) {
                btnStyle = 'border-red-500 bg-red-950/60 text-red-200';
              }
            }

            return (
              <label
                key={opt.id}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer text-xs font-mono transition ${btnStyle}`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="prediction"
                    value={opt.id}
                    disabled={revealed}
                    checked={isSelected}
                    onChange={() => setSelectedId(opt.id)}
                    className="accent-cyan-400"
                  />
                  <span>{opt.label}</span>
                </div>

                {revealed && opt.isCorrect && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {revealed && isSelected && !opt.isCorrect && (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
              </label>
            );
          })}
        </div>

        {!revealed ? (
          <button
            type="submit"
            disabled={!selectedId}
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg shadow transition flex items-center justify-center space-x-1 mt-2"
          >
            <Eye className="w-4 h-4" />
            <span>Submit Prediction & Observe Result</span>
          </button>
        ) : (
          <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs space-y-1 mt-3">
            <span className="font-bold text-cyan-300 block">Why did this happen?</span>
            <p className="text-gray-300 leading-relaxed">{selectedOpt?.explanation}</p>
          </div>
        )}
      </form>
    </div>
  );
};
