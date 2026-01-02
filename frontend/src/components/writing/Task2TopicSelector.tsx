/**
 * Task 2 Topic Selector Component
 * 
 * A reusable component for selecting Task 2 essay topics
 * Integrates with existing essay writing system
 * Can be used in multiple pages (Writing Practice, Placement Test, etc.)
 */

import { useState, useCallback } from 'react';
import { useTask2Topics, useRecommendedTask2Topics } from '../../hooks/useTask2Topics';
import type { Task2Type } from '../../types/task2-topic';
import { 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Loader2,
  X,
  ChevronDown,
  FileText
} from 'lucide-react';

interface Task2TopicSelectorProps {
  onSelectTopic: (topicId: number, topicData: {
    topic: string;
    question: string;
    taskType: Task2Type;
    category: string;
  }) => void;
  defaultTaskType?: Task2Type;
  showRecommended?: boolean;
  maxHeight?: string;
}

/**
 * Task 2 Topic Selector
 * 
 * @example
 * <Task2TopicSelector
 *   onSelectTopic={(id, data) => {
 *     setSelectedTopic(data);
 *     setShowEditor(true);
 *   }}
 *   defaultTaskType="Academic"
 *   showRecommended={true}
 * />
 */
export default function Task2TopicSelector({
  onSelectTopic,
  defaultTaskType = 'Academic',
  showRecommended = true,
  maxHeight = '600px'
}: Task2TopicSelectorProps) {
  const [taskType, setTaskType] = useState<Task2Type>(defaultTaskType);
  const [category, setCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fetch all topics
  const { 
    data: allTopics, 
    loading: topicsLoading, 
    error: topicsError 
  } = useTask2Topics({
    taskType,
    category: category || undefined
  });

  // Fetch recommended topics
  const {
    data: recommendedTopics,
    loading: recommendedLoading
  } = useRecommendedTask2Topics({
    count: 3,
    taskType
  });

  // Filter topics by search term (client-side)
  const filteredTopics = allTopics.filter(topic => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      topic.topic.toLowerCase().includes(searchLower) ||
      topic.question.toLowerCase().includes(searchLower) ||
      topic.category.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectTopic = useCallback((topic: typeof allTopics[0]) => {
    onSelectTopic(topic.id, {
      topic: topic.topic,
      question: topic.question,
      taskType: topic.taskType,
      category: topic.category
    });
  }, [onSelectTopic]);

  // Get unique categories for filter
  const categories = Array.from(new Set(allTopics.map(t => t.category))).sort();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      {/* Header with Task Type Selector */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Select an Essay Topic
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTaskType('Academic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                taskType === 'Academic'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setTaskType('General')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                taskType === 'General'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              General
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search essay topics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
              showFilters
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {category && (
              <button
                onClick={() => setCategory('')}
                className="mt-2 text-sm text-purple-600 hover:text-purple-700"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div style={{ maxHeight }} className="overflow-y-auto">
        {/* Recommended Topics Section */}
        {showRecommended && !searchTerm && !category && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recommended for You
              </h3>
            </div>
            {recommendedLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="space-y-2">
                {recommendedTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic)}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          {topic.category}
                        </span>
                        <h4 className="font-medium text-gray-900 dark:text-white mt-2 line-clamp-1">
                          {topic.topic}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {topic.question}
                        </p>
                      </div>
                      <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Topics Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              All Topics
              {filteredTopics.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-400">
                  ({filteredTopics.length})
                </span>
              )}
            </h3>
          </div>

          {/* Loading State */}
          {topicsLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {topicsError && (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-2">
                Failed to load topics
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {topicsError}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!topicsLoading && !topicsError && filteredTopics.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                No topics found
              </p>
              {(searchTerm || category) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategory('');
                  }}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Topics List */}
          {!topicsLoading && !topicsError && filteredTopics.length > 0 && (
            <div className="space-y-2">
              {filteredTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all border border-transparent hover:border-purple-300 dark:hover:border-purple-700"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      topic.taskType === 'Academic'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}>
                      {topic.taskType}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {topic.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {topic.topic}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {topic.question}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
