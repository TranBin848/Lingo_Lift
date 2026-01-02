import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, FileText, Clock } from 'lucide-react';
import type { Task1EssayWithTopic, Task2EssayWithTopic } from '../../types/essay';

interface Task1EssayViewerProps {
  essay: Task1EssayWithTopic;
  feedback?: any; // AI feedback when available
  annotations?: any; // Inline annotations when available
  onClose: () => void;
}

interface Task2EssayViewerProps {
  essay: Task2EssayWithTopic;
  feedback?: any;
  annotations?: any;
  onClose: () => void;
}

export function Task1EssayViewer({ essay, feedback, annotations, onClose }: Task1EssayViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Task 1 Essay
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {essay.topic?.prompt || 'No topic available'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Essay Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{new Date(essay.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              <span>{essay.wordCount || essay.content.split(/\s+/).length} words</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{essay.status || 'Submitted'}</span>
            </div>
          </div>

          {/* Topic Info */}
          {essay.topic && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Topic Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-blue-800 dark:text-blue-400">Type:</span>
                  <span className="text-blue-700 dark:text-blue-300">{essay.topic.taskType}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-blue-800 dark:text-blue-400">Chart Type:</span>
                  <span className="text-blue-700 dark:text-blue-300 capitalize">{essay.topic.chartType}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-blue-800 dark:text-blue-400">Category:</span>
                  <span className="text-blue-700 dark:text-blue-300">{essay.topic.category}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-blue-800 dark:text-blue-400">Difficulty:</span>
                  <span className="text-blue-700 dark:text-blue-300">{essay.topic.difficulty}</span>
                </div>
              </div>
            </div>
          )}

          {/* Essay Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Your Essay
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {essay.content}
              </div>
            </div>
          </div>

          {/* Feedback Section - Placeholder */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
              AI Feedback
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-400">
              AI grading and feedback feature is coming soon! Your essay has been saved and will be graded automatically when the feature is available.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Task2EssayViewer({ essay, feedback, annotations, onClose }: Task2EssayViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Task 2 Essay
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {essay.topic?.prompt || 'No topic available'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Essay Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{new Date(essay.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              <span>{essay.wordCount || essay.content.split(/\s+/).length} words</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{essay.status || 'Submitted'}</span>
            </div>
          </div>

          {/* Topic Info */}
          {essay.topic && (
            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                Topic Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-purple-800 dark:text-purple-400">Question Type:</span>
                  <span className="text-purple-700 dark:text-purple-300 capitalize">
                    {essay.topic.questionType.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-purple-800 dark:text-purple-400">Category:</span>
                  <span className="text-purple-700 dark:text-purple-300">{essay.topic.category}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-purple-800 dark:text-purple-400">Difficulty:</span>
                  <span className="text-purple-700 dark:text-purple-300">{essay.topic.difficulty}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-purple-800 dark:text-purple-400">Band Level:</span>
                  <span className="text-purple-700 dark:text-purple-300">{essay.topic.estimatedBandLevel}</span>
                </div>
              </div>
            </div>
          )}

          {/* Essay Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Your Essay
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {essay.content}
              </div>
            </div>
          </div>

          {/* Feedback Section - Placeholder */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
              AI Feedback
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-400">
              AI grading and feedback feature is coming soon! Your essay has been saved and will be graded automatically when the feature is available.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
