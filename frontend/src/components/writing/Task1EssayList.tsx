/**
 * Task 1 Essay List Component
 * 
 * Displays list of submitted essays for a topic
 * Shows submission history with timestamps
 */

import { useTask1EssaysByTopic } from '../../hooks/useTask1EssaysByTopic';
import { Loader2, FileText, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Task1EssayListProps {
  task1TopicId: number | null;
  onSelectEssay?: (essayId: number) => void;
}

/**
 * Loading Skeleton
 */
function EssayListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

/**
 * Empty State
 */
function EmptyState() {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No essays yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Submit your first essay to see it here
      </p>
    </div>
  );
}

/**
 * Error State
 */
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Failed to load essays
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

/**
 * Task 1 Essay List Component
 * 
 * @example
 * <Task1EssayList
 *   task1TopicId={123}
 *   onSelectEssay={(id) => console.log('Selected:', id)}
 * />
 */
export default function Task1EssayList({ task1TopicId, onSelectEssay }: Task1EssayListProps) {
  const { data: essays, loading, error, refetch } = useTask1EssaysByTopic(task1TopicId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Submission History
        </h3>
        {!loading && essays.length > 0 && (
          <button
            onClick={refetch}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && <EssayListSkeleton />}

      {/* Error State */}
      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {/* Empty State */}
      {!loading && !error && essays.length === 0 && <EmptyState />}

      {/* Essays List */}
      {!loading && !error && essays.length > 0 && (
        <div className="space-y-3">
          {essays.map((essay, index) => {
            const submittedDate = new Date(essay.createdAt);
            const timeAgo = formatDistanceToNow(submittedDate, { addSuffix: true });
            const wordCount = essay.content.trim().split(/\s+/).filter(w => w.length > 0).length;

            return (
              <div
                key={essay.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-transparent hover:border-blue-300 dark:hover:border-blue-700"
                onClick={() => onSelectEssay?.(essay.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Submission #{essays.length - index}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {timeAgo}
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                  {essay.content}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{submittedDate.toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
