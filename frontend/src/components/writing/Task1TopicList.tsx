/**
 * Task 1 Topic List Component
 * 
 * Displays a list of Task 1 topics with loading and error states
 * Uses the useTask1Topics hook for data fetching
 */

import { useState } from 'react';
import { useTask1Topics } from '../../hooks/useTask1Topics';
import type { Task1Type } from '../../types/task1-topic';
import { Loader2, AlertCircle, BookOpen, RefreshCw } from 'lucide-react';

/**
 * Loading Skeleton Component
 */
function TopicSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

/**
 * Empty State Component
 */
function EmptyState() {
  return (
    <div className="text-center py-12">
      <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No topics found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Try adjusting your filters or check back later
      </p>
    </div>
  );
}

/**
 * Error State Component
 */
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Error loading topics
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

/**
 * Task 1 Topic List Component
 */
export default function Task1TopicList() {
  const [taskType, setTaskType] = useState<Task1Type>('Academic');
  const [category, setCategory] = useState<string>('');

  // Fetch topics using the custom hook
  const { data: topics, loading, error, refetch } = useTask1Topics({
    taskType,
    category: category || undefined
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          IELTS Writing Task 1 Topics
        </h1>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Type
            </label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as Task1Type)}
              className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Academic">Academic</option>
              <option value="General">General Training</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category (Optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Education"
              className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && <TopicSkeleton />}

      {/* Error State */}
      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {/* Empty State */}
      {!loading && !error && topics.length === 0 && <EmptyState />}

      {/* Topics List */}
      {!loading && !error && topics.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found {topics.length} topic{topics.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={refetch}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {topics.map((topic) => (
            <div
              key={topic.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        topic.taskType === 'Academic'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {topic.taskType}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {topic.question}
                  </p>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  onClick={() => console.log('Start writing:', topic.id)}
                >
                  Start Writing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
