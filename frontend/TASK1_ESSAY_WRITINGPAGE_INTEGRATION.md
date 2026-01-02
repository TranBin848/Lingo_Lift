# Task 1 Essay API Integration - WritingPracticePage

## 📋 Tổng Quan

Đã tích hợp **API thật** cho **Task 1 Essays** vào trang Writing Practice, thay thế hoàn toàn mock data.

---

## ✅ Những Gì Đã Làm

### 1. **Tạo Hook Mới** `useTask1Essays`

**File:** `hooks/useTask1Essays.ts`

Hook để fetch TẤT CẢ essays của user hiện tại (không chỉ theo topic).

```typescript
const { data, loading, error, refetch } = useTask1Essays();
```

**Đặc điểm:**
- Tự động fetch khi component mount
- Loading state cho skeleton loader
- Error handling với retry capability
- Refetch function để refresh data sau khi submit

**API Endpoint:**
```
GET /task1-essays
```
Backend tự động filter theo authenticated user.

---

### 2. **Cập Nhật EssaysPage Component**

**File:** `components/essays/EssaysPage.tsx`

#### Thay Thế Mock Imports:

**TRƯỚC:**
```typescript
import {
  getTask1TopicsPublished,
  getTask1EssaysWithTopics,
  getTask1Feedback,
  getTask1Annotations
} from '../../mocks/essays';
```

**SAU:**
```typescript
// Task 1 sử dụng API thật
import { useTask1Topics } from '../../hooks/useTask1Topics';
import { useTask1Essays } from '../../hooks/useTask1Essays';
import { useCreateTask1Essay } from '../../hooks/useCreateTask1Essay';

// Task 2 vẫn dùng mock (chưa triển khai)
import {
  getTask2TopicsPublished,
  getTask2EssaysWithTopics,
  // ...
} from '../../mocks/essays';
```

#### Fetch Data Từ API:

```typescript
// Topics
const { data: task1TopicsData, isLoading: task1TopicsLoading } = useTask1Topics();

// Essays
const { data: task1EssaysData, loading: task1EssaysLoading, refetch: refetchTask1Essays } = useTask1Essays();

// Submit essay
const { submit: submitTask1Essay, isSubmitting, error, resetError } = useCreateTask1Essay();
```

#### Transform Data:

API data được transform sang format của component UI:

```typescript
// Task1TopicAPI → Task1Topic (component type)
const task1Topics = (task1TopicsData || []).map(topic => ({
  id: topic.id.toString(),
  prompt: topic.description,
  chartType: topic.task_type,
  imageUrl: topic.image_url,
  // ...
}));

// Task1EssayAPI → Task1EssayWithTopic
const task1Essays = (task1EssaysData || []).map(essay => ({
  id: essay.id.toString(),
  userId: essay.user_id.toString(),
  topicId: essay.task1_topic_id.toString(),
  content: essay.essay_text,
  wordCount: essay.word_count,
  // ...
}));
```

---

### 3. **Loading States**

#### Topics View với Skeleton Loader:

```typescript
{task1TopicsLoading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
    {[...Array(6)].map((_, i) => (
      <Card key={i} className="p-5 animate-pulse">
        {/* Skeleton */}
      </Card>
    ))}
  </div>
) : (
  // Actual content
)}
```

#### History View với Skeleton:

```typescript
{task1EssaysLoading ? (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="animate-pulse">
        {/* Skeleton */}
      </Card>
    ))}
  </div>
) : (
  <Task1EssayList essays={task1Essays} />
)}
```

---

### 4. **Error Handling**

#### Submit Error Notification:

Hiển thị error message khi submit essay thất bại:

```tsx
{task1SubmitError && (
  <motion.div className="fixed top-4 right-4 z-[60]">
    <Card className="p-4 bg-red-50">
      <div className="flex items-start gap-3">
        <AlertIcon />
        <div>
          <h3>Không thể nộp bài</h3>
          <p>{task1SubmitError}</p>
        </div>
        <button onClick={resetError}>✕</button>
      </div>
    </Card>
  </motion.div>
)}
```

---

### 5. **Submit Flow**

#### Thay Thế Mock Submit:

**TRƯỚC:**
```typescript
const handleSubmit = (content, wordCount, timeSpent) => {
  console.log('Submitting essay...');
  // TODO: Implement API
};
```

**SAU:**
```typescript
const handleSubmit = async (content, wordCount, timeSpent) => {
  if (!selectedTask1Topic) return;

  try {
    // Submit to API
    await submitTask1Essay({
      task1_topic_id: parseInt(selectedTask1Topic.id),
      essay_text: content
    });
    
    // Refresh essays list
    await refetchTask1Essays();
    
    // Close editor and switch to history
    setViewMode('history');
    setSelectedTask1Topic(null);
  } catch (error) {
    console.error('Failed to submit:', error);
    // Error is handled by hook and shown in UI
  }
};
```

---

## 🎯 Luồng Hoạt Động

### 1. **Xem Danh Sách Topics**
```
User vào trang → useTask1Topics() fetch data
                ↓
         Show skeleton loader
                ↓
         Topics hiển thị
```

### 2. **Viết Essay**
```
User chọn topic → EssayEditor mở
                ↓
         User viết bài
                ↓
         Click Submit
                ↓
      submitTask1Essay() call API
                ↓
    POST /task1-essays {essay_text, task1_topic_id}
                ↓
         Thành công?
        /         \
      Yes          No
       ↓            ↓
  refetchTask1Essays()  Show error notification
       ↓
  Switch to History view
       ↓
  Hiển thị bài mới submit
```

### 3. **Xem Lịch Sử**
```
User click "Lịch sử" → useTask1Essays() fetch
                       ↓
                Show skeleton
                       ↓
                Hiển thị list essays
```

---

## 📊 API Coverage

| Feature | Endpoint | Hook | Status |
|---------|----------|------|--------|
| **Get all topics** | `GET /task1-topics` | `useTask1Topics` | ✅ Live |
| **Get recommended topics** | `GET /task1-topics/recommended` | `useTask1RecommendedTopics` | ✅ Live |
| **Get random topic** | `GET /task1-topics/random` | `useTask1RandomTopic` | ✅ Live |
| **Get all essays** | `GET /task1-essays` | `useTask1Essays` | ✅ Live |
| **Submit essay** | `POST /task1-essays` | `useCreateTask1Essay` | ✅ Live |
| **Get essay detail** | `GET /task1-essays/:id` | `useTask1EssayDetail` | ⏳ Available (chưa dùng) |

---

## 🚫 Mock Data Còn Lại

Các phần **VẪN DÙNG MOCK DATA** (chưa có API):

### Task 2 (Tất cả):
- `getTask2TopicsPublished()` - Task 2 topics
- `getTask2EssaysWithTopics()` - Task 2 essays
- `getTask2Feedback()` - Task 2 feedback
- `getTask2Annotations()` - Task 2 annotations

### Task 1 (Chỉ feedback/grading):
- `getTask1Feedback()` - **AI grading chưa có API**
- `getTask1Annotations()` - **Inline annotations chưa có API**

### Stats:
- `getEssayStats()` - Tổng số essays, avg band score, etc.

**Lý do:** Backend chưa implement AI grading feature. Hiện tại sau khi submit essay, server chỉ lưu vào database, chưa có API trả về feedback/band score.

---

## 🔄 Migration Guide

Nếu muốn chuyển Task 2 sang API thật, làm tương tự:

### Bước 1: Tạo types
```typescript
// types/task2-essay.ts
export interface Task2Essay {
  id: number;
  user_id: number;
  task2_topic_id: number;
  essay_text: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}
```

### Bước 2: Tạo service
```typescript
// services/task2Essay.service.ts
export async function createTask2Essay(payload) {
  const response = await axiosInstance.post('/task2-essays', payload);
  return response.data;
}
```

### Bước 3: Tạo hooks
```typescript
// hooks/useTask2Essays.ts
export function useTask2Essays() {
  // Giống useTask1Essays
}

// hooks/useCreateTask2Essay.ts
export function useCreateTask2Essay() {
  // Giống useCreateTask1Essay
}
```

### Bước 4: Update EssaysPage
```typescript
const { data: task2EssaysData, loading: task2EssaysLoading } = useTask2Essays();
const { submit: submitTask2Essay } = useCreateTask2Essay();
```

---

## 🐛 Troubleshooting

### 1. **Essays không hiển thị**

**Nguyên nhân:** Backend chưa có API `/task1-essays` hoặc trả về format khác.

**Cách fix:**
- Check network tab xem API response
- Verify backend endpoint đã implement
- Check authentication token

### 2. **Submit thất bại**

**Nguyên nhân:** 
- Missing required fields
- Invalid topic ID
- Authentication failed

**Cách fix:**
```typescript
// Đảm bảo payload đúng format
{
  task1_topic_id: number, // Phải là số, không phải string
  essay_text: string      // Nội dung bài viết
}
```

### 3. **Loading mãi không dừng**

**Nguyên nhân:** API endpoint không tồn tại hoặc CORS error.

**Cách fix:**
- Check console errors
- Verify API base URL trong `lib/axios.ts`
- Check backend CORS settings

---

## 🎨 UI States

Component handle tất cả UI states:

| State | Condition | Display |
|-------|-----------|---------|
| **Loading** | `task1TopicsLoading === true` | Skeleton cards animation |
| **Empty** | `task1Topics.length === 0` | "Không tìm thấy đề bài" |
| **Error** | `error !== null` | Red notification card |
| **Success** | Data loaded | Topic cards / Essay list |
| **Submitting** | `isSubmitting === true` | Button disabled, spinner |

---

## ✨ Best Practices Đã Áp Dụng

1. **Clean Architecture:** Component → Hook → Service → API
2. **Loading States:** Skeleton loaders cho UX tốt hơn
3. **Error Handling:** User-friendly error messages
4. **Type Safety:** TypeScript strict mode, no `any` types
5. **Auto Refresh:** Refetch essays sau khi submit thành công
6. **Optimistic Updates:** Switch to history view ngay sau submit

---

## 📝 Next Steps

Khi backend implement AI grading:

1. Tạo types cho feedback:
```typescript
interface Task1FeedbackAPI {
  essay_id: number;
  band_score: number;
  task_achievement: { score: number; comments: string };
  // ...
}
```

2. Tạo service:
```typescript
export async function getTask1EssayFeedback(essayId: number) {
  const response = await axiosInstance.get(`/task1-essays/${essayId}/feedback`);
  return response.data;
}
```

3. Tạo hook:
```typescript
export function useTask1EssayFeedback(essayId: number) {
  // Fetch feedback
}
```

4. Update EssayViewer component để hiển thị feedback từ API thay vì mock.

---

## 🎉 Summary

✅ **Đã triển khai hoàn chỉnh:**
- Task 1 Topics: Fetch từ API thật
- Task 1 Essays: Submit & fetch từ API thật
- Loading states với skeleton loaders
- Error handling với user notifications
- Auto-refresh sau submit thành công

⏳ **Chưa triển khai (vì backend chưa có):**
- AI Feedback/Grading
- Inline annotations
- Task 2 Essays API

📊 **Kết quả:**
Người dùng giờ có thể:
1. Xem danh sách đề Task 1 thật từ database
2. Viết và submit bài essay
3. Bài essay được lưu vào database thật
4. Xem lịch sử các bài đã submit
5. Submit lại bài khác cho cùng hoặc khác topic

---

**Tác giả:** GitHub Copilot  
**Ngày:** 2026-01-02  
**Version:** 1.0
