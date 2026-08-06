import React, { useState } from 'react';
import { PRE_ASSESSMENT_QUESTIONS } from '../lib/assessment/questions';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PreAssessmentPageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const PreAssessmentPage: React.FC<PreAssessmentPageProps> = ({
  progress,
  misconceptions,
  onUpdateProgress,
  onUpdateMisconceptions,
}) => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [submittedCurrent, setSubmittedCurrent] = useState(false);

  const question = PRE_ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (submittedCurrent) return;
    setSelectedOpt(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOpt) return;
    setSubmittedCurrent(true);

    const chosenOption = question.options.find(o => o.id === selectedOpt);
    const isCorrect = chosenOption?.isCorrect || false;

    // Record answer
    setUserAnswers(prev => ({ ...prev, [question.id]: selectedOpt }));

    // Evaluate misconception
    const nextMisc = AdaptiveEngine.evaluateAnswer(
      misconceptions,
      question.id,
      selectedOpt,
      isCorrect,
      chosenOption?.misconceptionId
    );
    onUpdateMisconceptions(nextMisc);
    StorageService.saveMisconceptions(nextMisc);
  };

  const handleNextQuestion = () => {
    if (currentIdx < PRE_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setSubmittedCurrent(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      PRE_ASSESSMENT_QUESTIONS.forEach(q => {
        const chosenId = userAnswers[q.id] || (q.id === question.id ? selectedOpt : null);
        const opt = q.options.find(o => o.id === chosenId);
        if (opt?.isCorrect) correctCount++;
      });

      const scorePct = (correctCount / PRE_ASSESSMENT_QUESTIONS.length) * 100;
      const nextProg: ProgressMetrics = {
        ...progress,
        preAssessmentScore: scorePct,
      };

      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
      navigate('/dashboard');
    }
  };

  const chosenOptObj = question.options.find(o => o.id === selectedOpt);

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Diagnostic Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Pre-Assessment</h1>
        </div>

        <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-3 py-1 rounded-full text-cyan-300">
          Question {currentIdx + 1} of {PRE_ASSESSMENT_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
        <div
          className="bg-cyan-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / PRE_ASSESSMENT_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Box */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 font-semibold">{question.conceptualTopic}</span>
          <h2 className="text-lg font-bold text-white leading-relaxed">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map(opt => {
            const isSelected = selectedOpt === opt.id;
            let style = 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300';

            if (isSelected) {
              style = 'border-cyan-500 bg-cyan-950/60 text-cyan-200 glow-cyan';
            }

            if (submittedCurrent) {
              if (opt.isCorrect) {
                style = 'border-emerald-500 bg-emerald-950/60 text-emerald-200';
              } else if (isSelected) {
                style = 'border-red-500 bg-red-950/60 text-red-200';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={submittedCurrent}
                className={`w-full p-4 rounded-xl border text-left text-sm font-sans transition flex items-center justify-between ${style}`}
              >
                <span>{opt.text}</span>
                {submittedCurrent && opt.isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!submittedCurrent ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedOpt}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow transition"
          >
            Confirm Answer
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            <MisconceptionFeedbackCard
              isCorrect={chosenOptObj?.isCorrect || false}
              misconceptionId={chosenOptObj?.isCorrect ? undefined : chosenOptObj?.misconceptionId}
              explanation={chosenOptObj?.explanation || ''}
            />

            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center space-x-1.5"
            >
              <span>{currentIdx < PRE_ASSESSMENT_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Pre-Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
