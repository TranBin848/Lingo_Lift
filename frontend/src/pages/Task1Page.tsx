/**
 * Task 1 Page
 * 
 * Example page showing how to use Task 1 topic hooks
 * Demonstrates different use cases: list, detail, recommended, and random topics
 */

import { useState } from 'react';
import { 
  useTask1Topics, 
  useTask1TopicDetail,
  useRecommendedTask1Topics,
  useRandomTask1Topic
} from '../hooks/useTask1Topics';
import type { Task1Type } from '../types/task1-topic';
import { Loader2, Sparkles, Shuffle, BookOpen } from 'lucide-react';

export default function Task1Page() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  
  // Example 1: Get all Academic topics
  const { 
    data: academicTopics, 
    loading: academicLoading, 
    error: academicError 
  } = useTask1Topics({ taskType: 'Academic' });

  // Example 2: Get recommended topics
  const { 
    data: recommendedTopics, 
    loading: recommendedLoading 
  } = useRecommendedTask1Topics({ count: 3, taskType: 'Academic' });

  // Example 3: Get topic detail (when a topic is selected)
  const { 
    data: topicDetail, 
    loading: detailLoading 
  } = useTask1TopicDetail(selectedTopicId);

  // Example 4: Get random topic
  const { 
    data: randomTopic, 
    loading: randomLoading, 
    refetch: getNewRandomTopic 
  } = useRandomTask1Topic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Task 1 Topics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            IELTS Writing Task 1 Practice Topics
          </p>
        </div>

        {/* Recommended Topics Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
          </div>
          
          {recommendedLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {recommendedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTopicId(topic.id)}
                >
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    {topic.taskType}
                  </span>
                  <h3 className="font-medium mt-2 text-gray-900 dark:text-white line-clamp-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {topic.category}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Random Topic Section */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Random Topic
              </h2>
            </div>
            <button
              onClick={getNewRandomTopic}
              disabled={randomLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {randomLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Shuffle className="w-4 h-4" />
                  Get Random Topic
                </>
              )}
            </button>
          </div>
          
          {randomTopic && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                  {randomTopic.taskType}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {randomTopic.category}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {randomTopic.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {randomTopic.question}
              </p>
            </div>
          )}
        </section>

        {/* All Topics Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Academic Topics
            </h2>
          </div>
          
          {academicLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : academicError ? (
            <div className="text-center py-8 text-red-600">
              Error: {academicError}
            </div>
          ) : (
            <div className="space-y-3">
              {academicTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                    selectedTopicId === topic.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTopicId(topic.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {topic.taskType}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {topic.category}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {topic.question}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Topic Detail Modal/Panel */}
        {selectedTopicId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Topic Detail
                </h2>
                <button
                  onClick={() => setSelectedTopicId(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              {detailLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : topicDetail ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {topicDetail.taskType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                      {topicDetail.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {topicDetail.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {topicDetail.question}
                  </p>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Start Writing This Topic
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
