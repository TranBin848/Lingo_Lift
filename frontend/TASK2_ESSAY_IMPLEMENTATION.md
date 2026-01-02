# Task 2 Essay API Integration - Complete

## ✅ Hoàn Thành

Đã tích hợp **API thật** cho **Task 2 Essays** vào trang Writing Practice.

---

## 📁 Files Created

### 1. **Types** - `types/task2-essay.ts`
```typescript
- Task2Essay
- CreateTask2EssayPayload
- CreateTask2EssayResponse
```

### 2. **Service Layer** - `services/task2Essay.service.ts`
```typescript
- createTask2Essay(payload)
- getTask2EssayById(id)
- getTask2EssaysByTopic(task2TopicId)
```

### 3. **Custom Hooks**
- `hooks/useCreateTask2Essay.ts` - Submit essays
- `hooks/useTask2Essays.ts` - Fetch all user essays
- `hooks/useTask2EssaysByTopic.ts` - Fetch essays by topic

### 4. **Updated Components**
- `components/essays/EssaysPage.tsx` - Integrated Task 2 API

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/task2-essays` | Submit new essay |
| GET | `/task2-essays` | Get all user essays |
| GET | `/task2-essays/:id` | Get essay detail |
| GET | `/task2-essays/by-topic/:topicId` | Get essays by topic |

---

## 🎯 Features Implemented

### ✅ Task 2 Topics
- Fetch from API: `GET /task2-topics`
- Loading skeleton during fetch
- Filter by question type, difficulty, category
- Click topic to start writing

### ✅ Task 2 Essay Submission
```typescript
const { submit, isSubmitting, error } = useCreateTask2Essay();

await submit({
  task2_topic_id: 123,
  essay_text: "Many people believe..."
});
```

### ✅ Essay History
- Fetch all essays: `GET /task2-essays`
- Loading skeleton
- Empty state when no essays
- Click essay to view detail

### ✅ UI States
- ⏳ Loading: Skeleton loaders
- ✅ Success: Auto-refresh + switch to history
- ❌ Error: Red notification with retry
- 📭 Empty: "Bạn chưa có bài viết Task 2 nào"

---

## 🔄 User Flow

```
1. User views Task 2 topics
   ↓
2. Click a topic → Editor opens
   ↓
3. Write essay (min 250 words)
   ↓
4. Click Submit
   ↓
5. POST /task2-essays
   ↓
6. Success → Refresh list → Switch to History
   ↓
7. View submitted essays
```

---

## 📊 Complete API Coverage

### Task 1 (100% Live)
| Feature | Status |
|---------|--------|
| Topics | ✅ API |
| Essays | ✅ API |
| Submit | ✅ API |

### Task 2 (100% Live)
| Feature | Status |
|---------|--------|
| Topics | ✅ API |
| Essays | ✅ API |
| Submit | ✅ API |

### Still Mock Data
| Feature | Reason |
|---------|--------|
| AI Feedback/Grading | Backend chưa implement |
| Inline Annotations | Backend chưa có API |
| Essay Stats | Tính toán từ mock data |

---

## 💻 Code Examples

### Submit Essay
```typescript
import { useCreateTask2Essay } from '../hooks/useCreateTask2Essay';

function EssayForm() {
  const { submit, isSubmitting, error } = useCreateTask2Essay();
  
  const handleSubmit = async (content: string) => {
    try {
      await submit({
        task2_topic_id: topicId,
        essay_text: content
      });
      alert('Submitted successfully!');
    } catch (err) {
      // Error displayed in UI automatically
    }
  };
  
  return (
    <button onClick={() => handleSubmit(content)} disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit Essay'}
    </button>
  );
}
```

### Fetch Essays
```typescript
import { useTask2Essays } from '../hooks/useTask2Essays';

function EssayHistory() {
  const { data: essays, loading, error, refetch } = useTask2Essays();
  
  if (loading) return <Skeleton />;
  if (error) return <Error message={error} onRetry={refetch} />;
  
  return (
    <div>
      {essays.map(essay => (
        <EssayCard key={essay.id} essay={essay} />
      ))}
    </div>
  );
}
```

---

## 🎨 UI Improvements

### Loading States
```tsx
{task2TopicsLoading ? (
  <div className="grid grid-cols-3 gap-5">
    {[...Array(6)].map((_, i) => (
      <Card key={i} className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded" />
      </Card>
    ))}
  </div>
) : (
  // Actual topics
)}
```

### Error Notifications
```tsx
{task2SubmitError && (
  <Card className="bg-red-50 border-red-200">
    <h3>Không thể nộp bài Task 2</h3>
    <p>{task2SubmitError}</p>
    <button onClick={resetError}>✕</button>
  </Card>
)}
```

---

## 🔍 Data Transformation

API response được transform sang UI types:

```typescript
// API Response
{
  id: 123,
  task2_topic_id: 456,
  essay_text: "...",
  word_count: 280,
  created_at: "2026-01-02T10:00:00Z"
}

// Transformed to
{
  id: "123",
  userId: "789",
  topicId: "456",
  content: "...",
  wordCount: 280,
  status: "submitted",
  submittedAt: "2026-01-02T10:00:00Z",
  topic: { /* Topic object */ }
}
```

---

## 🚀 Next Steps (Optional)

Khi backend implement AI grading:

1. Create feedback types
2. Create feedback service
3. Create feedback hooks
4. Update EssayViewer to show feedback

---

## 📝 Summary

✅ **Task 1 Essays**: Fully integrated with API  
✅ **Task 2 Essays**: Fully integrated with API  
⏳ **AI Grading**: Waiting for backend  

**Result**: Users can now practice both Task 1 and Task 2 with real backend, submit essays, and view submission history!

---

**Created**: 2026-01-02  
**Pattern**: Same as Task 1 Essay implementation  
**Status**: Production-ready ✨
