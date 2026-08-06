import React, { useState } from 'react';
import { POST_ASSESSMENT_QUESTIONS } from '../lib/assessment/questions';
import { MisconceptionFeedbackCard } from '../components/learning/MisconceptionFeedbackCard';
import { LearnerMisconceptionState } from '../types/adaptive';
import { AdaptiveEngine } from '../lib/adaptive/engine';
import { StorageService } from '../lib/storage/localStorage';
import { ProgressMetrics } from '../types/assessment';
import { BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PostAssessmentPageProps {
  progress: ProgressMetrics;
  misconceptions: LearnerMisconceptionState;
  onUpdateProgress: (p: ProgressMetrics) => void;
  onUpdateMisconceptions: (m: LearnerMisconceptionState) => void;
}

export const PostAssessmentPage: React.FC<PostAssessmentPageProps> = ({
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

  const question = POST_ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (submittedCurrent) return;
    setSelectedOpt(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOpt) return;
    setSubmittedCurrent(true);

    const chosenOption = question.options.find(o => o.id === selectedOpt);
    const isCorrect = chosenOption?.isCorrect || false;

    setUserAnswers(prev => ({ ...prev, [question.id]: selectedOpt }));

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
    if (currentIdx < POST_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setSubmittedCurrent(false);
    } else {
      let correctCount = 0;
      POST_ASSESSMENT_QUESTIONS.forEach(q => {
        const chosenId = userAnswers[q.id] || (q.id === question.id ? selectedOpt : null);
        const opt = q.options.find(o => o.id === chosenId);
        if (opt?.isCorrect) correctCount++;
      });

      const postScore = (correctCount / POST_ASSESSMENT_QUESTIONS.length) * 100;
      const preScore = progress.preAssessmentScore || 0;
      const absoluteGain = postScore - preScore;
      const relativeGain = preScore > 0 ? (absoluteGain / preScore) * 100 : postScore;

      const nextProg: ProgressMetrics = {
        ...progress,
        postAssessmentScore: postScore,
        absoluteImprovement: absoluteGain,
        relativeImprovement: relativeGain,
      };

      onUpdateProgress(nextProg);
      StorageService.saveProgress(nextProg);
      navigate('/results');
    }
  };

  const chosenOptObj = question.options.find(o => o.id === selectedOpt);

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-purple-400">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Final Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Post-Assessment</h1>
        </div>

        <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-3 py-1 rounded-full text-purple-300">
          Question {currentIdx + 1} of {POST_ASSESSMENT_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
        <div
          className="bg-purple-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / POST_ASSESSMENT_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Box */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-purple-400 font-semibold">{question.conceptualTopic}</span>
          <h2 className="text-lg font-bold text-white leading-relaxed">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map(opt => {
            const isSelected = selectedOpt === opt.id;
            let style = 'border-gray-800 bg-gray-900/60 hover:border-gray-700 text-gray-300';

            if (isSelected) {
              style = 'border-purple-500 bg-purple-950/60 text-purple-200 glow-violet';
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

        {!submittedCurrent ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedOpt}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow transition"
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
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-emerald-600 hover:from-purple-400 hover:to-emerald-500 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center space-x-1.5"
            >
              <span>{currentIdx < POST_ASSESSMENT_QUESTIONS.length - 1 ? 'Next Question' : 'Finish & View Measurable Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
