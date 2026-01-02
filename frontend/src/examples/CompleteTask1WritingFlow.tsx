/**
 * Complete Task 1 Writing Flow - Integration Example
 * 
 * Shows how Topic selection + Essay writing work together
 * This demonstrates the full user flow from topic selection to essay submission
 */

import { useState } from 'react';
import Task1TopicSelector from '../components/writing/Task1TopicSelector';
import Task1EssayForm from '../components/writing/Task1EssayForm';
import Task1EssayList from '../components/writing/Task1EssayList';
import { ArrowLeft, FileText, History } from 'lucide-react';

type ViewMode = 'select-topic' | 'write-essay' | 'view-history';

/**
 * Complete Task 1 Writing Flow
 * 
 * User flow:
 * 1. Select a topic from topic selector
 * 2. Write essay for that topic
 * 3. Submit essay
 * 4. View submission history
 * 5. Write another essay or select new topic
 */
export default function CompleteTask1WritingFlow() {
  const [viewMode, setViewMode] = useState<ViewMode>('select-topic');
  const [selectedTopic, setSelectedTopic] = useState<{
    id: number;
    title: string;
    question: string;
    taskType: string;
    category: string;
  } | null>(null);

  const handleTopicSelect = (
    topicId: number,
    topicData: {
      title: string;
      question: string;
      taskType: 'Academic' | 'General';
      category: string;
    }
  ) => {
    setSelectedTopic({
      id: topicId,
      ...topicData
    });
    setViewMode('write-essay');
  };

  const handleEssaySuccess = (essayId: number) => {
    console.log('Essay submitted successfully:', essayId);
    // Optionally show history
    setViewMode('view-history');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setViewMode('select-topic');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            IELTS Writing Task 1 Practice
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a topic, write your essay, and track your progress
          </p>
        </div>

        {/* View Mode: Select Topic */}
        {viewMode === 'select-topic' && (
          <Task1TopicSelector
            onSelectTopic={handleTopicSelect}
            defaultTaskType="Academic"
            showRecommended={true}
          />
        )}

        {/* View Mode: Write Essay or View History */}
        {viewMode !== 'select-topic' && selectedTopic && (
          <div>
            {/* Back Button and Topic Info */}
            <div className="mb-6">
              <button
                onClick={handleBackToTopics}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Topic Selection
              </button>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                    {selectedTopic.taskType}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {selectedTopic.category}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedTopic.title}
                </h2>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewMode('write-essay')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'write-essay'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                Write Essay
              </button>
              <button
                onClick={() => setViewMode('view-history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'view-history'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <History className="w-4 h-4" />
                History
              </button>
            </div>

            {/* Content */}
            {viewMode === 'write-essay' ? (
              <Task1EssayForm
                task1TopicId={selectedTopic.id}
                topicTitle={selectedTopic.title}
                topicQuestion={selectedTopic.question}
                onSuccess={handleEssaySuccess}
                minWords={150}
              />
            ) : (
              <Task1EssayList
                task1TopicId={selectedTopic.id}
                onSelectEssay={(essayId) => {
                  console.log('View essay detail:', essayId);
                  // Optionally navigate to essay detail page
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * INTEGRATION NOTES:
 * 
 * 1. Topic Selection Flow:
 *    - User selects topic from Task1TopicSelector
 *    - Topic data (id, title, question) is passed to essay form
 *    - This connects the Topic API with Essay API
 * 
 * 2. Essay Submission Flow:
 *    - User writes essay in Task1EssayForm
 *    - On submit, essay is posted to /api/task1-essays
 *    - Success callback switches to history view
 *    - History auto-updates to show new submission
 * 
 * 3. History Flow:
 *    - Task1EssayList fetches essays for current topic
 *    - Shows all previous submissions
 *    - User can click essay to view details (implement if needed)
 * 
 * 4. Navigation Flow:
 *    - User can go back to topic selection anytime
 *    - Can switch between write/history tabs
 *    - State is preserved during tab switches
 * 
 * 5. Data Refresh:
 *    - After submitting essay, history is automatically refreshed
 *    - useTask1EssaysByTopic refetches when topicId changes
 *    - Manual refetch available in history list
 */

/**
 * URL PARAMETER VERSION:
 * 
 * If you want to support direct URLs like /writing/task1/123
 */
/*
import { useParams, useNavigate } from 'react-router-dom';

export function Task1WritingPageWithParams() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'write' | 'history'>('write');

  const { data: topic } = useTask1TopicDetail(
    topicId ? parseInt(topicId) : null
  );

  if (!topic) return <div>Loading or not found...</div>;

  return (
    <div>
      <button onClick={() => navigate('/writing/task1')}>
        Back to Topics
      </button>
      
      // Rest of the component...
    </div>
  );
}
*/
