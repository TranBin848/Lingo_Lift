# Task 1 Essay API - Quick Reference

## 🚀 Quick Copy-Paste

### **1. Submit Essay**
```typescript
import { useCreateTask1Essay } from '../hooks/useCreateTask1Essay';

const { submit, loading, error } = useCreateTask1Essay();

const handleSubmit = async () => {
  const essay = await submit({
    task1TopicId: 123,
    content: 'The chart shows...'
  });
  if (essay) console.log('Success:', essay.id);
};
```

### **2. Get Essay History**
```typescript
import { useTask1EssaysByTopic } from '../hooks/useTask1EssaysByTopic';

const { data: essays, loading, refetch } = useTask1EssaysByTopic(topicId);
```

### **3. Complete Form**
```typescript
import Task1EssayForm from '../components/writing/Task1EssayForm';

<Task1EssayForm
  task1TopicId={123}
  topicTitle="Topic Title"
  topicQuestion="The question..."
  onSuccess={(id) => console.log('Submitted:', id)}
  minWords={150}
/>
```

### **4. Essay List**
```typescript
import Task1EssayList from '../components/writing/Task1EssayList';

<Task1EssayList
  task1TopicId={123}
  onSelectEssay={(id) => console.log('Selected:', id)}
/>
```

---

## 📦 **Files Created**

| File | Purpose |
|------|---------|
| `types/task1-essay.ts` | TypeScript types |
| `services/task1Essay.service.ts` | API calls |
| `hooks/useCreateTask1Essay.ts` | Submit hook |
| `hooks/useTask1EssaysByTopic.ts` | Fetch hook |
| `components/writing/Task1EssayForm.tsx` | Writing form |
| `components/writing/Task1EssayList.tsx` | History list |
| `pages/Task1WritingPage.tsx` | Complete page |

---

## 🔧 **Types**

```typescript
interface Task1Essay {
  id: number;
  task1TopicId: number;
  content: string;
  createdAt: string;
}

interface CreateTask1EssayPayload {
  task1TopicId: number;
  content: string;
}
```

---

## 🌐 **API Endpoints**

| Method | Endpoint | Hook |
|--------|----------|------|
| POST | `/api/task1-essays` | `useCreateTask1Essay` |
| GET | `/api/task1-essays/{id}` | `getTask1EssayById` |
| GET | `/api/task1-essays/by-topic/{topicId}` | `useTask1EssaysByTopic` |

---

## 🎯 **Hook Returns**

### useCreateTask1Essay
```typescript
{
  submit: (payload) => Promise<Task1Essay | null>,
  data: Task1Essay | null,
  loading: boolean,
  error: string | null,
  reset: () => void
}
```

### useTask1EssaysByTopic
```typescript
{
  data: Task1Essay[],
  loading: boolean,
  error: string | null,
  refetch: () => Promise<void>
}
```

---

## 💡 **Common Patterns**

### Submit with Success Handler
```typescript
const { submit } = useCreateTask1Essay();

const essay = await submit({ task1TopicId, content });
if (essay) {
  // Success
  navigate('/success');
} else {
  // Error (check error state)
}
```

### Refresh History After Submit
```typescript
const { submit } = useCreateTask1Essay();
const { refetch } = useTask1EssaysByTopic(topicId);

await submit({ task1TopicId, content });
await refetch(); // Update list
```

### Word Counter
```typescript
const words = content.trim().split(/\s+/).filter(w => w.length > 0);
const wordCount = words.length;
const isValid = wordCount >= 150;
```

---

## 🎨 **UI States**

### Form
- ✅ Idle (ready)
- ✅ Typing (word count)
- ✅ Submitting (disabled)
- ✅ Success (green message)
- ✅ Error (red message)

### List
- ✅ Loading (skeleton)
- ✅ Empty (message)
- ✅ Error (retry button)
- ✅ Data (essays)

---

## 🔐 **Authentication**

✨ **Automatic!** Bearer token via axios interceptor.

---

## 🐛 **Debug Checklist**

- [ ] Check network tab for API errors
- [ ] Verify Bearer token is present
- [ ] Check content is trimmed before submit
- [ ] Ensure topicId is a number
- [ ] Check word count calculation
- [ ] Verify refetch is called after submit

---

## ✅ **Integration Steps**

1. Import hooks
2. Replace mock submit with `useCreateTask1Essay`
3. Replace mock essays with `useTask1EssaysByTopic`
4. Add loading states
5. Handle success/error
6. Test with real API

---

**📚 Full docs:** `TASK1_ESSAY_IMPLEMENTATION.md`

**🎉 Ready to use!**
