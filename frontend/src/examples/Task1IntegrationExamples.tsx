/**
 * Integration Example: How to use Task1TopicSelector in existing components
 * 
 * This file shows how to integrate the new API-based topic selector
 * into your existing essay writing components.
 */

import { useState } from 'react';
import Task1TopicSelector from '../components/writing/Task1TopicSelector';
import { Task1EssayEditor } from '../components/essays/EssayEditor';
import type { Task1Type } from '../types/task1-topic';

/**
 * Example 1: Simple Integration
 * Replace mock data topic selection with API-based selector
 */
export function SimpleIntegrationExample() {
  const [selectedTopic, setSelectedTopic] = useState<{
    id: number;
    title: string;
    question: string;
    taskType: Task1Type;
    category: string;
  } | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {!showEditor ? (
        <Task1TopicSelector
          onSelectTopic={(id, data) => {
            setSelectedTopic({ id, ...data });
            setShowEditor(true);
          }}
          defaultTaskType="Academic"
          showRecommended={true}
        />
      ) : (
        <div>
          <button
            onClick={() => setShowEditor(false)}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to topic selection
          </button>
          {selectedTopic && (
            <Task1EssayEditor
              topic={{
                id: selectedTopic.id.toString(),
                prompt: selectedTopic.question,
                // Map other fields as needed
              }}
              onBack={() => setShowEditor(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Example 2: Integration with Existing EssaysPage
 * 
 * Steps to integrate into src/components/essays/EssaysPage.tsx:
 */

/*
1. Import the new types and hooks:

import { useTask1Topics, useRecommendedTask1Topics } from '../../hooks/useTask1Topics';
import type { Task1Type as ApiTask1Type } from '../../types/task1-topic';

2. Replace getTask1TopicsPublished() with the hook:

// OLD:
const task1Topics = getTask1TopicsPublished();

// NEW:
const { 
  data: task1Topics, 
  loading: task1TopicsLoading, 
  error: task1TopicsError 
} = useTask1Topics({ 
  taskType: task1Filters.taskType === 'all' ? 'Academic' : task1Filters.taskType as ApiTask1Type 
});

3. Add loading state to the topics section:

{task1TopicsLoading && (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
  </div>
)}

4. Add error state:

{task1TopicsError && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <p className="text-red-800">Error loading topics: {task1TopicsError}</p>
  </div>
)}

5. Handle empty state:

{!task1TopicsLoading && !task1TopicsError && task1Topics.length === 0 && (
  <div className="text-center py-12">
    <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
    <p className="text-gray-600">Try adjusting your filters</p>
  </div>
)}

6. Map API data to UI component format:

// If your TopicCard expects different format, create a mapper:
const mappedTopics = task1Topics.map(apiTopic => ({
  id: apiTopic.id.toString(),
  prompt: apiTopic.question,
  taskType: apiTopic.taskType,
  category: apiTopic.category,
  // Add other fields with default values if needed
  chartType: 'bar' as const,
  difficulty: 'Intermediate' as const,
  // ... etc
}));

7. Update topic selection to use API IDs:

const handleTopicSelect = async (apiTopicId: number) => {
  // If you need full topic details, use the detail hook:
  const topicDetail = await getTask1TopicById(apiTopicId);
  setSelectedTask1Topic(mapApiTopicToUiTopic(topicDetail));
  setViewMode('writing');
};
*/

/**
 * Example 3: Side-by-side Migration (Gradual)
 * 
 * If you want to migrate gradually, use feature flag:
 */
export function GradualMigrationExample() {
  const [useNewApi, setUseNewApi] = useState(false);
  
  return (
    <div className="p-4">
      {/* Feature toggle for testing */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useNewApi}
            onChange={(e) => setUseNewApi(e.target.checked)}
          />
          <span className="text-sm font-medium">
            Use New API (Beta) - Toggle to test new implementation
          </span>
        </label>
      </div>

      {useNewApi ? (
        <Task1TopicSelector
          onSelectTopic={(id, data) => {
            console.log('Selected from API:', id, data);
          }}
        />
      ) : (
        <div>
          {/* Your existing mock data implementation */}
          <p className="text-gray-600">Using mock data (old implementation)</p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 4: Recommended Topics Widget
 * 
 * Add a recommended topics section to any page:
 */
export function RecommendedTopicsWidget() {
  const [taskType] = useState<Task1Type>('Academic');
  
  // This is how to use the hook
  const { 
    data: recommendedTopics, 
    loading, 
    error 
  } = useRecommendedTask1Topics({ 
    count: 3, 
    taskType 
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail for widget
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span>✨</span>
        Recommended Topics
      </h3>
      <div className="space-y-2">
        {recommendedTopics.map(topic => (
          <div
            key={topic.id}
            className="bg-white rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h4 className="font-medium text-sm text-gray-900 mb-1">
              {topic.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">
              {topic.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 5: Type Adapter/Mapper
 * 
 * If your UI expects different types than API provides:
 */
import type { Task1Topic as UiTask1Topic } from '../types/essay';
import type { Task1Topic as ApiTask1Topic } from '../types/task1-topic';

export function mapApiTopicToUiTopic(apiTopic: ApiTask1Topic): UiTask1Topic {
  return {
    id: apiTopic.id.toString(),
    prompt: apiTopic.question,
    taskType: apiTopic.taskType,
    chartType: 'bar', // Default or derive from category
    category: apiTopic.category as any,
    difficulty: 'Intermediate', // Default or fetch separately
    estimatedBandLevel: 6.5, // Default or fetch separately
    frequency: 'Common', // Default or fetch separately
    keywords: [], // Extract from question or fetch separately
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Use in component:
/*
const { data: apiTopics } = useTask1Topics({ taskType: 'Academic' });
const uiTopics = apiTopics.map(mapApiTopicToUiTopic);
*/

/**
 * Example 6: Filter Integration
 * 
 * Sync with existing filter UI:
 */
export function FilterIntegrationExample() {
  const [filters, setFilters] = useState({
    taskType: 'Academic' as Task1Type,
    category: '',
  });

  const { data: topics, loading } = useTask1Topics(filters);

  return (
    <div>
      {/* Your existing filter UI */}
      <div className="flex gap-4 mb-4">
        <select
          value={filters.taskType}
          onChange={(e) => setFilters({ ...filters, taskType: e.target.value as Task1Type })}
        >
          <option value="Academic">Academic</option>
          <option value="General">General</option>
        </select>
        
        <input
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          placeholder="Category"
        />
      </div>

      {/* Topics render */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {topics.map(topic => (
            <div key={topic.id}>{topic.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// Import this in components:
// import { useRecommendedTask1Topics } from '../../hooks/useTask1Topics';
