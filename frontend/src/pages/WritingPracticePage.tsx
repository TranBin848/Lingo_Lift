import { useSearchParams } from "react-router-dom";
import { EssaysPage } from "../components/essays";

/**
 * Writing Practice Page
 *
 * Trang luyện tập viết IELTS bao gồm:
 * - Task 1 (Academic / General Training)
 * - Task 2 (Essay Writing)
 *
 * URL Parameters:
 * - task: 'task1' | 'task2' - Chọn tab Task
 * - topicId: string - ID của topic để tự động mở editor
 *
 * Features:
 * - Danh sách đề bài với bộ lọc
 * - Lịch sử bài viết
 * - Editor viết bài với word counter và timer
 * - AI feedback với điểm số chi tiết
 * - Inline annotations (lỗi, gợi ý, điểm tốt)
 */
export default function WritingPracticePage() {
  const [searchParams] = useSearchParams();
  
  // Get params directly from URL
  const task = searchParams.get("task") as "task1" | "task2" | null;
  const topicId = searchParams.get("topicId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-8 px-4 sm:px-6 lg:px-8">
      <EssaysPage 
        initialTask={task || undefined} 
        initialTopicId={topicId || undefined} 
      />
    </div>
  );
}
