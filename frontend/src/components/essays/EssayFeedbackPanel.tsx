import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { FeedbackHeader } from './FeedbackHeader';
import { ScoreCard } from './ScoreCard';
import { CriteriaAccordion } from './CriteriaAccordion';
import { OverallFeedback } from './OverallFeedback';
import type { Task1Feedback, Task2Feedback } from '../../types/essay';
import { task1CriteriaLabels, task2CriteriaLabels } from '../../types/essay';

// Task 1 Feedback Panel
interface Task1FeedbackPanelProps {
  feedback: Task1Feedback;
  hasPreviousVersion?: boolean;
  onCompareVersions?: () => void;
}

export function Task1FeedbackPanel({
  feedback,
  hasPreviousVersion,
  onCompareVersions,
}: Task1FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Header */}
      <FeedbackHeader
        estimatedBandScore={feedback.estimatedBandScore}
        overallScore={feedback.overallScore}
        aiModel={feedback.aiModel}
        processingTimeMs={feedback.processingTimeMs}
      />

      {/* Score Breakdown */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Điểm chi tiết theo tiêu chí
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard
            title={task1CriteriaLabels.taskAchievement}
            score={feedback.taskAchievement.score}
            delay={0}
          />
          <ScoreCard
            title={task1CriteriaLabels.coherenceCohesion}
            score={feedback.coherenceCohesion.score}
            delay={100}
          />
          <ScoreCard
            title={task1CriteriaLabels.lexicalResource}
            score={feedback.lexicalResource.score}
            delay={200}
          />
          <ScoreCard
            title={task1CriteriaLabels.grammaticalRange}
            score={feedback.grammaticalRange.score}
            delay={300}
          />
        </div>
      </div>

      {/* Detailed Feedback */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Phân tích chi tiết
        </h2>
        <div className="space-y-4">
          <CriteriaAccordion
            title={task1CriteriaLabels.taskAchievement}
            feedback={feedback.taskAchievement}
            delay={400}
          />
          <CriteriaAccordion
            title={task1CriteriaLabels.coherenceCohesion}
            feedback={feedback.coherenceCohesion}
            delay={450}
          />
          <CriteriaAccordion
            title={task1CriteriaLabels.lexicalResource}
            feedback={feedback.lexicalResource}
            delay={500}
          />
          <CriteriaAccordion
            title={task1CriteriaLabels.grammaticalRange}
            feedback={feedback.grammaticalRange}
            delay={550}
          />
        </div>
      </div>

      {/* Overall Feedback */}
      <OverallFeedback
        overallComments={feedback.overallComments}
        recommendations={feedback.recommendations}
        hasPreviousVersion={hasPreviousVersion}
        onCompareVersions={onCompareVersions}
      />
    </motion.div>
  );
}

// Task 2 Feedback Panel
interface Task2FeedbackPanelProps {
  feedback: Task2Feedback;
  hasPreviousVersion?: boolean;
  onCompareVersions?: () => void;
}

export function Task2FeedbackPanel({
  feedback,
  hasPreviousVersion,
  onCompareVersions,
}: Task2FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Header */}
      <FeedbackHeader
        estimatedBandScore={feedback.estimatedBandScore}
        overallScore={feedback.overallScore}
        aiModel={feedback.aiModel}
        processingTimeMs={feedback.processingTimeMs}
      />

      {/* Score Breakdown */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Điểm chi tiết theo tiêu chí
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard
            title={task2CriteriaLabels.taskResponse}
            score={feedback.taskResponse.score}
            delay={0}
          />
          <ScoreCard
            title={task2CriteriaLabels.coherenceCohesion}
            score={feedback.coherenceCohesion.score}
            delay={100}
          />
          <ScoreCard
            title={task2CriteriaLabels.lexicalResource}
            score={feedback.lexicalResource.score}
            delay={200}
          />
          <ScoreCard
            title={task2CriteriaLabels.grammaticalRange}
            score={feedback.grammaticalRange.score}
            delay={300}
          />
        </div>
      </div>

      {/* Detailed Feedback */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Phân tích chi tiết
        </h2>
        <div className="space-y-4">
          <CriteriaAccordion
            title={task2CriteriaLabels.taskResponse}
            feedback={feedback.taskResponse}
            delay={400}
          />
          <CriteriaAccordion
            title={task2CriteriaLabels.coherenceCohesion}
            feedback={feedback.coherenceCohesion}
            delay={450}
          />
          <CriteriaAccordion
            title={task2CriteriaLabels.lexicalResource}
            feedback={feedback.lexicalResource}
            delay={500}
          />
          <CriteriaAccordion
            title={task2CriteriaLabels.grammaticalRange}
            feedback={feedback.grammaticalRange}
            delay={550}
          />
        </div>
      </div>

      {/* Overall Feedback */}
      <OverallFeedback
        overallComments={feedback.overallComments}
        recommendations={feedback.recommendations}
        hasPreviousVersion={hasPreviousVersion}
        onCompareVersions={onCompareVersions}
      />
    </motion.div>
  );
}

// Grading In Progress Component
export function GradingInProgress() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-16 h-16 text-indigo-600" />
      </motion.div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
        AI đang chấm bài...
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Vui lòng đợi trong giây lát
      </p>
    </motion.div>
  );
}

// No Feedback Available Component
export function NoFeedbackAvailable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Chưa có kết quả chấm bài
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Bài viết của bạn chưa được chấm điểm
      </p>
    </motion.div>
  );
}

// Main Feedback Display Component
interface EssayFeedbackDisplayProps {
  status: 'Draft' | 'Submitted' | 'Graded';
  feedback?: Task1Feedback | Task2Feedback;
  taskType: 'task1' | 'task2';
  hasPreviousVersion?: boolean;
  onCompareVersions?: () => void;
}

export function EssayFeedbackDisplay({
  status,
  feedback,
  taskType,
  hasPreviousVersion,
  onCompareVersions,
}: EssayFeedbackDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      {status === 'Draft' && (
        <NoFeedbackAvailable key="no-feedback" />
      )}
      
      {status === 'Submitted' && (
        <GradingInProgress key="grading" />
      )}
      
      {status === 'Graded' && feedback && (
        <motion.div key="graded">
          {taskType === 'task1' ? (
            <Task1FeedbackPanel
              feedback={feedback as Task1Feedback}
              hasPreviousVersion={hasPreviousVersion}
              onCompareVersions={onCompareVersions}
            />
          ) : (
            <Task2FeedbackPanel
              feedback={feedback as Task2Feedback}
              hasPreviousVersion={hasPreviousVersion}
              onCompareVersions={onCompareVersions}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
