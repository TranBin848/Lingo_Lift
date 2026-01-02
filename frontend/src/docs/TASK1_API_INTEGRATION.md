# Task 1 Topic Module - API Integration Guide

## 📁 File Structure

```
src/
├── types/
│   └── task1-topic.ts          # TypeScript types and interfaces
├── services/
│   └── task1Topic.service.ts   # API service layer
├── hooks/
│   └── useTask1Topics.ts       # Custom React hooks
├── components/
│   └── writing/
│       └── Task1TopicList.tsx  # Example component
└── pages/
    └── Task1Page.tsx           # Example page with all use cases
```

## 🎯 Quick Start

### 1. Basic Usage - Fetch Topics List

```typescript
import { useTask1Topics } from '../hooks/useTask1Topics';

function MyComponent() {
  const { data: topics, loading, error, refetch } = useTask1Topics({
    taskType: 'Academic',
    category: 'Education'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {topics.map(topic => (
        <div key={topic.id}>{topic.title}</div>
      ))}
    </div>
  );
}
```

### 2. Get Single Topic Detail

```typescript
import { useTask1TopicDetail } from '../hooks/useTask1Topics';

function TopicDetailComponent({ topicId }: { topicId: number }) {
  const { data: topic, loading, error } = useTask1TopicDetail(topicId);

  if (loading) return <div>Loading topic...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!topic) return <div>Topic not found</div>;
  
  return (
    <div>
      <h2>{topic.title}</h2>
      <p>{topic.question}</p>
      <span>Category: {topic.category}</span>
    </div>
  );
}
```

### 3. Get Recommended Topics

```typescript
import { useRecommendedTask1Topics } from '../hooks/useTask1Topics';

function RecommendedTopics() {
  const { data, loading } = useRecommendedTask1Topics({
    count: 5,
    taskType: 'Academic'
  });

  if (loading) return <div>Loading recommendations...</div>;
  
  return (
    <div>
      <h3>Recommended for You</h3>
      {data.map(topic => (
        <div key={topic.id}>{topic.title}</div>
      ))}
    </div>
  );
}
```

### 4. Get Random Topic

```typescript
import { useRandomTask1Topic } from '../hooks/useTask1Topics';

function RandomTopicButton() {
  const { data, loading, refetch } = useRandomTask1Topic();

  return (
    <div>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Topic'}
      </button>
      {data && (
        <div>
          <h4>{data.title}</h4>
          <p>{data.question}</p>
        </div>
      )}
    </div>
  );
}
```

## 📝 TypeScript Types

```typescript
// Task type
type Task1Type = 'Academic' | 'General';

// Main topic interface
interface Task1Topic {
  id: number;
  taskType: Task1Type;
  category: string;
  title: string;
  question: string;
}

// API response for list endpoint
interface Task1TopicListResponse {
  items: Task1Topic[];
}
```

## 🔧 Service Functions

All service functions are in `services/task1Topic.service.ts`:

```typescript
// Get all topics with filters
getTask1Topics(params: GetTask1TopicsParams): Promise<Task1Topic[]>

// Get single topic by ID
getTask1TopicById(id: number): Promise<Task1Topic>

// Get recommended topics
getRecommendedTask1Topics(params: GetRecommendedTask1TopicsParams): Promise<Task1Topic[]>

// Get random topic
getRandomTask1Topic(): Promise<Task1Topic>
```

## 🎣 Custom Hooks API

### useTask1Topics

```typescript
const {
  data,      // Task1Topic[] - Array of topics
  loading,   // boolean - Loading state
  error,     // string | null - Error message
  refetch    // () => Promise<void> - Refetch function
} = useTask1Topics({
  taskType: 'Academic' | 'General',
  category?: string  // Optional filter
});
```

### useTask1TopicDetail

```typescript
const {
  data,      // Task1Topic | null - Single topic
  loading,   // boolean - Loading state
  error,     // string | null - Error message
  refetch    // () => Promise<void> - Refetch function
} = useTask1TopicDetail(topicId);  // Pass null to skip fetching
```

### useRecommendedTask1Topics

```typescript
const {
  data,      // Task1Topic[] - Array of recommended topics
  loading,   // boolean - Loading state
  error,     // string | null - Error message
  refetch    // () => Promise<void> - Refetch function
} = useRecommendedTask1Topics({
  count: 5,
  taskType: 'Academic' | 'General'
});
```

### useRandomTask1Topic

```typescript
const {
  data,      // Task1Topic | null - Random topic
  loading,   // boolean - Loading state
  error,     // string | null - Error message
  refetch    // () => Promise<void> - Get new random topic
} = useRandomTask1Topic();

// Note: Does NOT fetch on mount, call refetch() to get a topic
```

## 🎨 UI States Best Practices

### Loading State

```typescript
{loading && (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    <span className="ml-2">Loading topics...</span>
  </div>
)}
```

### Error State

```typescript
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-800">Error: {error}</p>
    <button onClick={refetch} className="mt-2 text-red-600">
      Try Again
    </button>
  </div>
)}
```

### Empty State

```typescript
{!loading && !error && data.length === 0 && (
  <div className="text-center py-12">
    <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No topics found
    </h3>
    <p className="text-gray-600">
      Try adjusting your filters
    </p>
  </div>
)}
```

## 🔐 Authentication

All API calls automatically include the Bearer token from `useAuthStore`:

```typescript
// In lib/axios.ts
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});
```

## 🚀 Advanced Usage

### Dynamic Filtering with State

```typescript
function FilterableTopicList() {
  const [filters, setFilters] = useState({
    taskType: 'Academic' as Task1Type,
    category: ''
  });

  const { data, loading } = useTask1Topics(filters);

  return (
    <div>
      <select 
        value={filters.taskType}
        onChange={(e) => setFilters({ ...filters, taskType: e.target.value as Task1Type })}
      >
        <option value="Academic">Academic</option>
        <option value="General">General Training</option>
      </select>
      
      <input
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        placeholder="Filter by category"
      />

      {/* Topics list */}
    </div>
  );
}
```

### Conditional Fetching

```typescript
function ConditionalTopicDetail({ topicId }: { topicId: number | null }) {
  // Pass null to skip fetching
  const { data, loading } = useTask1TopicDetail(topicId);

  // Hook will not fetch if topicId is null
  if (!topicId) return <div>No topic selected</div>;
  if (loading) return <div>Loading...</div>;
  
  return <div>{data?.title}</div>;
}
```

### Manual Refetch

```typescript
function TopicsWithRefresh() {
  const { data, loading, refetch } = useTask1Topics({
    taskType: 'Academic'
  });

  const handleRefresh = async () => {
    await refetch();
    console.log('Topics refreshed!');
  };

  return (
    <div>
      <button onClick={handleRefresh}>
        Refresh Topics
      </button>
      {/* Topics list */}
    </div>
  );
}
```

## 🔄 Migration from Mock Data

### Before (Mock Data)

```typescript
import { mockTask1Topics } from '../mocks/essays';

function OldComponent() {
  const topics = mockTask1Topics.filter(t => t.taskType === 'Academic');
  
  return (
    <div>
      {topics.map(topic => (
        <div key={topic.id}>{topic.prompt}</div>
      ))}
    </div>
  );
}
```

### After (Real API)

```typescript
import { useTask1Topics } from '../hooks/useTask1Topics';

function NewComponent() {
  const { data: topics, loading, error } = useTask1Topics({
    taskType: 'Academic'
  });

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {topics.map(topic => (
        <div key={topic.id}>{topic.question}</div>
      ))}
    </div>
  );
}
```

## ⚠️ Common Pitfalls

### 1. Don't fetch inside render

❌ **Wrong:**
```typescript
function BadComponent() {
  getTask1Topics({ taskType: 'Academic' }); // Don't call service directly
  return <div>...</div>;
}
```

✅ **Correct:**
```typescript
function GoodComponent() {
  const { data } = useTask1Topics({ taskType: 'Academic' }); // Use hook
  return <div>...</div>;
}
```

### 2. Handle all states

❌ **Wrong:**
```typescript
const { data } = useTask1Topics({ taskType: 'Academic' });
return <div>{data[0].title}</div>; // Might crash if data is empty
```

✅ **Correct:**
```typescript
const { data, loading, error } = useTask1Topics({ taskType: 'Academic' });
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (data.length === 0) return <div>No topics</div>;
return <div>{data[0].title}</div>;
```

### 3. Use proper type narrowing

❌ **Wrong:**
```typescript
const { data } = useTask1TopicDetail(topicId);
return <div>{data.title}</div>; // data might be null
```

✅ **Correct:**
```typescript
const { data } = useTask1TopicDetail(topicId);
if (!data) return <div>No topic</div>;
return <div>{data.title}</div>;
```

## 📦 Example Components

See the following files for complete examples:
- `components/writing/Task1TopicList.tsx` - Full list with filters and states
- `pages/Task1Page.tsx` - All hooks usage examples

## 🧪 Testing Tips

```typescript
// Mock the hook for testing
jest.mock('../hooks/useTask1Topics', () => ({
  useTask1Topics: () => ({
    data: [{ id: 1, title: 'Test Topic', /* ... */ }],
    loading: false,
    error: null,
    refetch: jest.fn()
  })
}));
```

## 🎯 Next Steps

1. Replace mock data in existing components
2. Add pagination support (extend service and hooks)
3. Add search functionality
4. Implement caching with React Query or SWR
5. Add optimistic updates for better UX

## 📞 Support

If you encounter issues:
1. Check that your token is valid
2. Verify API endpoint is correct in `lib/axios.ts`
3. Check network tab for API errors
4. Ensure types match backend response structure
