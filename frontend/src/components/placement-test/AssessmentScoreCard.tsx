import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  Target,
  MessageSquare,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../ui/card';
import type { Task1Assessment, Task2Assessment } from '../../types/placementTest';
import { getScoreColor, getScoreGradient, getQuestionTypeLabel } from '../../types/placementTest';

interface AssessmentScoreCardProps {
  assessment: Task1Assessment | Task2Assessment;
  taskNumber: 1 | 2;
  delay?: number;
}

type CriterionKey = 'taskAchievement' | 'taskResponse' | 'coherenceCohesion' | 'lexicalResource' | 'grammaticalRange';

export function AssessmentScoreCard({ assessment, taskNumber, delay = 0 }: AssessmentScoreCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score count-up
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const targetScore = assessment.overallScore;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setAnimatedScore(targetScore * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000 + 500);

    return () => clearTimeout(timeout);
  }, [assessment.overallScore, delay]);

  const criteria: { key: CriterionKey; label: string }[] = taskNumber === 1 
    ? [
        { key: 'taskAchievement', label: 'Task Achievement' },
        { key: 'coherenceCohesion', label: 'Coherence & Cohesion' },
        { key: 'lexicalResource', label: 'Lexical Resource' },
        { key: 'grammaticalRange', label: 'Grammatical Range' }
      ]
    : [
        { key: 'taskResponse', label: 'Task Response' },
        { key: 'coherenceCohesion', label: 'Coherence & Cohesion' },
        { key: 'lexicalResource', label: 'Lexical Resource' },
        { key: 'grammaticalRange', label: 'Grammatical Range' }
      ];

  const getScore = (key: CriterionKey): number => {
    if (key === 'taskAchievement' && 'taskAchievement' in assessment) {
      return assessment.taskAchievement;
    }
    if (key === 'taskResponse' && 'taskResponse' in assessment) {
      return assessment.taskResponse;
    }
    return assessment[key as keyof typeof assessment] as number;
  };

  const taskColor = taskNumber === 1 ? 'blue' : 'purple';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-xl">
        {/* Header */}
        <div className={`p-5 bg-gradient-to-r ${taskNumber === 1 ? 'from-blue-500 to-indigo-600' : 'from-purple-500 to-pink-600'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold">{taskNumber}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Task {taskNumber}</h3>
                <p className="text-white/80 text-sm">
                  {taskNumber === 1 
                    ? `${(assessment as Task1Assessment).taskType} Writing`
                    : getQuestionTypeLabel((assessment as Task2Assessment).questionType)
                  }
                </p>
              </div>
            </div>
            
            {/* Score */}
            <div className="text-right">
              <div className="text-4xl font-bold text-white">
                {animatedScore.toFixed(1)}
              </div>
              <div className="text-white/80 text-xs">Band Score</div>
            </div>
          </div>
        </div>

        {/* Criteria Scores */}
        <div className="p-5 space-y-4">
          {criteria.map((criterion, index) => {
            const score = getScore(criterion.key);
            return (
              <motion.div
                key={criterion.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 * (index + 1) }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{criterion.label}</span>
                  <span className={`font-semibold ${getScoreColor(score)}`}>
                    {score.toFixed(1)}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(score)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / 9) * 100}%` }}
                    transition={{ delay: delay + 0.2 + 0.1 * index, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {assessment.wordCount}
              </div>
              <div className="text-xs text-gray-500">Số từ</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {Math.floor(assessment.timeTaken / 60)}:{(assessment.timeTaken % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500">Thời gian</div>
            </div>
          </div>
        </div>

        {/* Expandable Feedback */}
        <div className="border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full px-5 py-3 flex items-center justify-between text-sm font-medium text-${taskColor}-600 dark:text-${taskColor}-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Xem phản hồi chi tiết
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 pb-5 space-y-4"
            >
              {/* General Feedback */}
              {assessment.generalFeedback && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      Nhận xét chung
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {assessment.generalFeedback}
                  </p>
                </div>
              )}

              {/* Strengths */}
              {assessment.strengths && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">
                      Điểm mạnh
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    {assessment.strengths}
                  </p>
                </div>
              )}

              {/* Weaknesses */}
              {assessment.weaknesses && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium text-amber-800 dark:text-amber-300 text-sm">
                      Cần cải thiện
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                    {assessment.weaknesses}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
