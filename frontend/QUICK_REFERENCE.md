# Task 1 Topic API - Quick Reference Card

## 🚀 Quick Start (Copy & Paste)

### 1. Basic List
```typescript
import { useTask1Topics } from '../hooks/useTask1Topics';

const { data, loading, error } = useTask1Topics({ 
  taskType: 'Academic' 
});
```

### 2. Topic Detail
```typescript
import { useTask1TopicDetail } from '../hooks/useTask1Topics';

const { data: topic, loading } = useTask1TopicDetail(topicId);
```

### 3. Recommended
```typescript
import { useRecommendedTask1Topics } from '../hooks/useTask1Topics';

const { data } = useRecommendedTask1Topics({ 
  count: 5, 
  taskType: 'Academic' 
});
```

### 4. Random
```typescript
import { useRandomTask1Topic } from '../hooks/useTask1Topics';

const { data, refetch } = useRandomTask1Topic();
// Call refetch() to get new random topic
```

---

## 📦 Files Created

| File | Purpose |
|------|---------|
| `types/task1-topic.ts` | TypeScript types |
| `services/task1Topic.service.ts` | API calls |
| `hooks/useTask1Topics.ts` | React hooks |
| `components/writing/Task1TopicList.tsx` | Example list component |
| `components/writing/Task1TopicSelector.tsx` | Reusable selector |
| `pages/Task1Page.tsx` | Full example page |
| `examples/Task1IntegrationExamples.tsx` | Integration examples |
| `docs/TASK1_API_INTEGRATION.md` | Full documentation |
| `TASK1_IMPLEMENTATION_README.md` | Implementation summary |

---

## 🎯 Hook Return Values

```typescript
{
  data: Task1Topic[] | Task1Topic | null,  // The data
  loading: boolean,                        // Loading state
  error: string | null,                    // Error message
  refetch: () => Promise<void>             // Refetch function
}
```

---

## 🔧 Task1Topic Type

```typescript
{
  id: number,
  taskType: 'Academic' | 'General',
  category: string,
  title: string,
  question: string
}
```

---

## 🎨 UI States Template

```typescript
// Loading
{loading && <LoadingSkeleton />}

// Error
{error && <ErrorMessage error={error} onRetry={refetch} />}

// Empty
{!loading && !error && data.length === 0 && <EmptyState />}

// Success
{!loading && !error && data.length > 0 && (
  <div>{data.map(item => ...)}</div>
)}
```

---

## 🔄 Replace Mock Data

### Before:
```typescript
import { mockTask1Topics } from '../mocks/essays';
const topics = mockTask1Topics;
```

### After:
```typescript
import { useTask1Topics } from '../hooks/useTask1Topics';
const { data: topics, loading, error } = useTask1Topics({ 
  taskType: 'Academic' 
});
```

---

## 🌐 API Endpoints

| Method | Endpoint | Hook |
|--------|----------|------|
| GET | `/api/task1-topics` | `useTask1Topics` |
| GET | `/api/task1-topics/{id}` | `useTask1TopicDetail` |
| GET | `/api/task1-topics/recommended` | `useRecommendedTask1Topics` |
| GET | `/api/task1-topics/random` | `useRandomTask1Topic` |

---

## ✅ Authentication

✨ **Automatic!** Bearer token added by axios interceptor.

No manual configuration needed. Token from `useAuthStore` is automatically included.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Topics not loading | Check network tab, verify token |
| Type errors | Ensure correct import paths |
| Hook not updating | Check dependencies in useEffect |
| CORS errors | Backend CORS config |

---

## 💡 Tips

1. **Always handle loading and error states**
2. **Use refetch() for manual refresh**
3. **Pass null to useTask1TopicDetail to skip fetch**
4. **Memoize filters with useMemo for performance**
5. **Debounce search inputs**

---

## 📞 Example Usage

```typescript
function MyComponent() {
  const [taskType, setTaskType] = useState('Academic');
  
  const { data, loading, error, refetch } = useTask1Topics({ 
    taskType 
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map(topic => (
        <div key={topic.id}>
          <h3>{topic.title}</h3>
          <p>{topic.question}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎓 Next Steps

1. ✅ Test with real backend
2. ✅ Replace mock data in components
3. ⬜ Add pagination
4. ⬜ Implement caching (React Query)
5. ⬜ Add search functionality

---

**📚 For detailed documentation, see:**
- `docs/TASK1_API_INTEGRATION.md` - Full API docs
- `TASK1_IMPLEMENTATION_README.md` - Implementation guide
- `examples/Task1IntegrationExamples.tsx` - Code examples
