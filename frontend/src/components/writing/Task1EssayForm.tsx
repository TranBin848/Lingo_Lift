/**
 * Task 1 Essay Form Component
 * 
 * Form for writing and submitting Task 1 essays
 * Handles text input, word count, and submission
 */

import { useState, useEffect } from 'react';
import { useCreateTask1Essay } from '../../hooks/useCreateTask1Essay';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface Task1EssayFormProps {
  task1TopicId: number;
  topicTitle: string;
  topicQuestion: string;
  onSuccess?: (essayId: number) => void;
  minWords?: number;
}

/**
 * Task 1 Essay Form Component
 * 
 * @example
 * <Task1EssayForm
 *   task1TopicId={123}
 *   topicTitle="Housing Trends"
 *   topicQuestion="The bar chart shows..."
 *   onSuccess={(id) => console.log('Submitted:', id)}
 *   minWords={150}
 * />
 */
export default function Task1EssayForm({
  task1TopicId,
  topicTitle,
  topicQuestion,
  onSuccess,
  minWords = 150
}: Task1EssayFormProps) {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const { submit, loading, error, data, reset } = useCreateTask1Essay();

  // Calculate word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Call onSuccess callback when essay is submitted
  useEffect(() => {
    if (data && onSuccess) {
      onSuccess(data.id);
    }
  }, [data, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (wordCount < minWords) {
      alert(`Please write at least ${minWords} words. Current: ${wordCount} words.`);
      return;
    }

    const essay = await submit({
      task1TopicId,
      content: content.trim()
    });

    if (essay) {
      // Clear form on success
      setContent('');
      setWordCount(0);
    }
  };

  const handleReset = () => {
    setContent('');
    setWordCount(0);
    reset();
  };

  const isValid = wordCount >= minWords;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {/* Topic Info */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {topicTitle}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {topicQuestion}
        </p>
      </div>

      {/* Success Message */}
      {data && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
              Essay submitted successfully!
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your essay has been saved. You can continue practicing with another topic.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-green-700 dark:text-green-300 hover:underline"
          >
            Write Another
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
              Submission failed
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="text-sm text-red-700 dark:text-red-300 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Text Editor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Essay
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your Task 1 essay here..."
            rows={15}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-y"
          />
        </div>

        {/* Word Count and Submit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`text-sm font-medium ${
              isValid 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {wordCount} words
            </div>
            {!isValid && wordCount > 0 && (
              <div className="text-sm text-amber-600 dark:text-amber-400">
                Minimum: {minWords} words
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isValid || content.trim().length === 0}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Essay
              </>
            )}
          </button>
        </div>
      </form>

      {/* Helper Text */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>💡 Tips: Describe the main features, make comparisons, and use appropriate vocabulary.</p>
      </div>
    </div>
  );
}
