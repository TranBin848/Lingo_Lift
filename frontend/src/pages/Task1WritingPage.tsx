/**
 * Task 1 Writing Page
 * 
 * Complete page for IELTS Writing Task 1 practice
 * Includes topic selection, essay writing, and submission history
 */

import { useState } from 'react';
import { useTask1TopicDetail } from '../hooks/useTask1Topics';
import Task1EssayForm from '../components/writing/Task1EssayForm';
import Task1EssayList from '../components/writing/Task1EssayList';
import { ArrowLeft, FileText, History, Loader2 } from 'lucide-react';

interface Task1WritingPageProps {
  topicId?: number; // Optional: can be passed from URL params
}

/**
 * Task 1 Writing Page
 * 
 * @example
 * // In router
 * <Route path="/writing/task1/:topicId" element={<Task1WritingPage />} />
 * 
 * // Or with prop
 * <Task1WritingPage topicId={123} />
 */
export default function Task1WritingPage({ topicId }: Task1WritingPageProps) {
  // For demo, using state. In real app, get from URL params or prop
  const [selectedTopicId] = useState<number | null>(topicId || 123);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch topic details
  const { data: topic, loading: topicLoading } = useTask1TopicDetail(selectedTopicId);

  const handleEssaySuccess = (essayId: number) => {
    console.log('Essay submitted successfully:', essayId);
    // Optionally switch to history view
    setShowHistory(true);
  };

  if (topicLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Topic not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please select a valid Task 1 topic
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                    {topic.taskType}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {topic.category}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  IELTS Writing Task 1
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowHistory(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              !showHistory
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Write Essay
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              showHistory
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Content */}
        {!showHistory ? (
          <Task1EssayForm
            task1TopicId={topic.id}
            topicTitle={topic.title}
            topicQuestion={topic.question}
            onSuccess={handleEssaySuccess}
            minWords={150}
          />
        ) : (
          <Task1EssayList
            task1TopicId={topic.id}
            onSelectEssay={(essayId) => {
              console.log('View essay:', essayId);
              // Optionally navigate to essay detail page
            }}
          />
        )}
      </div>
    </div>
  );
}
