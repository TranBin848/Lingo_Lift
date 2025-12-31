import { motion } from 'framer-motion';
import { X, Clock, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { EssayStatusBadge, VersionBadge } from './EssayStatusBadge';
import { EssayFeedbackDisplay } from './EssayFeedbackPanel';
import type { 
  Task1EssayWithTopic, 
  Task2EssayWithTopic,
  Task1Feedback,
  Task2Feedback
} from '../../types/essay';
import { 
  chartTypeLabels, 
  questionTypeLabels,
  topicCategoryLabels 
} from '../../types/essay';

// Format time
function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} phút`;
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Task 1 Essay Viewer
interface Task1EssayViewerProps {
  essay: Task1EssayWithTopic;
  feedback?: Task1Feedback;
  onClose: () => void;
  onCompareVersions?: () => void;
}

export function Task1EssayViewer({
  essay,
  feedback,
  onClose,
  onCompareVersions,
}: Task1EssayViewerProps) {
  const [activeTab, setActiveTab] = useState<'essay' | 'feedback'>(
    essay.status === 'Graded' && feedback ? 'feedback' : 'essay'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Task 1 - {chartTypeLabels[essay.topic.chartType]}
              </h2>
              <VersionBadge version={essay.version} />
              <EssayStatusBadge status={essay.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {essay.wordCount} từ
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(essay.timeSpentSeconds)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(essay.updatedAt)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('essay')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'essay'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Bài viết
          </button>
          {essay.status === 'Graded' && feedback && (
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'feedback'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Kết quả chấm bài
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'essay' ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Topic Prompt */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Đề bài:
                </h3>
                <p className="text-blue-800 dark:text-blue-300">
                  {essay.topic.prompt}
                </p>
                <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  Category: {topicCategoryLabels[essay.topic.category]}
                </div>
              </div>

              {/* Essay Content */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Bài viết của bạn:
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  {essay.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <EssayFeedbackDisplay
              status={essay.status}
              feedback={feedback}
              taskType="task1"
              hasPreviousVersion={!!essay.previousVersionId}
              onCompareVersions={onCompareVersions}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Task 2 Essay Viewer
interface Task2EssayViewerProps {
  essay: Task2EssayWithTopic;
  feedback?: Task2Feedback;
  onClose: () => void;
  onCompareVersions?: () => void;
}

export function Task2EssayViewer({
  essay,
  feedback,
  onClose,
  onCompareVersions,
}: Task2EssayViewerProps) {
  const [activeTab, setActiveTab] = useState<'essay' | 'feedback'>(
    essay.status === 'Graded' && feedback ? 'feedback' : 'essay'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Task 2 - {questionTypeLabels[essay.topic.questionType]}
              </h2>
              <VersionBadge version={essay.version} />
              <EssayStatusBadge status={essay.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {essay.wordCount} từ
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(essay.timeSpentSeconds)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(essay.updatedAt)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('essay')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'essay'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Bài viết
          </button>
          {essay.status === 'Graded' && feedback && (
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'feedback'
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Kết quả chấm bài
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'essay' ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Topic Prompt */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  Đề bài:
                </h3>
                <p className="text-purple-800 dark:text-purple-300">
                  {essay.topic.prompt}
                </p>
                <div className="mt-2 text-sm text-purple-600 dark:text-purple-400">
                  Category: {topicCategoryLabels[essay.topic.category]}
                </div>
              </div>

              {/* Essay Content */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Bài viết của bạn:
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  {essay.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <EssayFeedbackDisplay
              status={essay.status}
              feedback={feedback}
              taskType="task2"
              hasPreviousVersion={!!essay.previousVersionId}
              onCompareVersions={onCompareVersions}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
