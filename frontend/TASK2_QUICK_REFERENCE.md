# Task 2 Topic API - Quick Reference

## 🚀 Quick Copy-Paste Examples

### 1️⃣ **Basic List**
```typescript
import { useTask2Topics } from '../hooks/useTask2Topics';

const { data, loading, error } = useTask2Topics({ 
  taskType: 'Academic' 
});
```

### 2️⃣ **Topic Detail**
```typescript
import { useTask2TopicDetail } from '../hooks/useTask2Topics';

const { data: topic, loading } = useTask2TopicDetail(topicId);
```

### 3️⃣ **Recommended**
```typescript
import { useRecommendedTask2Topics } from '../hooks/useTask2Topics';

const { data } = useRecommendedTask2Topics({ 
  count: 5, 
  taskType: 'Academic' 
});
```

### 4️⃣ **Random**
```typescript
import { useRandomTask2Topic } from '../hooks/useTask2Topics';

const { data, refetch } = useRandomTask2Topic();
// Call refetch() to get new random
```

---

## 📦 **Files Created**

| File | Purpose |
|------|---------|
| `types/task2-topic.ts` | TypeScript types |
| `services/task2Topic.service.ts` | API service layer |
| `hooks/useTask2Topics.ts` | React hooks |
| `components/writing/Task2TopicList.tsx` | Example list |
| `components/writing/Task2TopicSelector.tsx` | Reusable selector |
| `pages/Task2Page.tsx` | Demo page |
| `TASK2_IMPLEMENTATION_README.md` | Full docs |

---

## 🔧 **Task2Topic Type**

```typescript
{
  id: number,
  taskType: 'Academic' | 'General',
  category: string,
  topic: string,      // Essay title
  question: string    // The question
}
```

---

## 🎯 **Hook Return Type**

```typescript
{
  data: Task2Topic[] | Task2Topic | null,
  loading: boolean,
  error: string | null,
  refetch: () => Promise<void>
}
```

---

## 🌐 **API Endpoints**

| Endpoint | Hook |
|----------|------|
| `GET /api/task2-topics` | `useTask2Topics` |
| `GET /api/task2-topics/{id}` | `useTask2TopicDetail` |
| `GET /api/task2-topics/recommended` | `useRecommendedTask2Topics` |
| `GET /api/task2-topics/random` | `useRandomTask2Topic` |

---

## 🎨 **UI States Template**

```typescript
{loading && <LoadingSkeleton />}
{error && <ErrorMessage error={error} onRetry={refetch} />}
{!loading && !error && data.length === 0 && <EmptyState />}
{!loading && !error && data.length > 0 && <DataDisplay />}
```

---

## 🔄 **Replace Mock Data**

### Before:
```typescript
import { mockTask2Topics } from '../mocks/essays';
const topics = mockTask2Topics;
```

### After:
```typescript
import { useTask2Topics } from '../hooks/useTask2Topics';
const { data: topics, loading, error } = useTask2Topics({ 
  taskType: 'Academic' 
});
```

---

## 💡 **Common Patterns**

### With Filters
```typescript
const [taskType, setTaskType] = useState('Academic');
const { data } = useTask2Topics({ taskType });
```

### Conditional Fetch
```typescript
const { data } = useTask2TopicDetail(topicId); // null to skip
```

### Manual Refresh
```typescript
const { refetch } = useTask2Topics({ taskType: 'Academic' });
<button onClick={refetch}>Refresh</button>
```

---

## 🔐 **Authentication**

✨ **Automatic!** Bearer token added by axios interceptor.

---

## 🐛 **Troubleshooting**

- **Not loading?** Check network tab, verify token
- **Type errors?** Check import paths
- **Hook not updating?** Check useCallback dependencies

---

## ✅ **Checklist**

- [x] Types created
- [x] Service layer implemented
- [x] Hooks created
- [x] Example components ready
- [x] Documentation complete
- [ ] Test with real API
- [ ] Replace mock data
- [ ] Deploy to production

---

**📚 Full docs:** `TASK2_IMPLEMENTATION_README.md`

**🎉 Ready to use!**
