import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Save, 
  Send, 
  AlertCircle,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { WritingTimer, WordCounter, TaskStatusIndicator } from './WritingComponents';
import type { Task2Prompt } from '../../types/placementTest';
import { getQuestionTypeLabel } from '../../types/placementTest';

interface Task2AssessmentEditorProps {
  prompt: Task2Prompt;
  onSubmit: (essayText: string, wordCount: number, timeTaken: number) => void;
  onSaveDraft: (essayText: string) => void;
  initialContent?: string;
  task1Completed?: boolean;
}

export function Task2AssessmentEditor({
  prompt,
  onSubmit,
  onSaveDraft,
  initialContent = '',
  task1Completed = true
}: Task2AssessmentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const targetWords = 250;

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (content.length === 0) return;
    
    const autoSaveInterval = setInterval(() => {
      onSaveDraft(content);
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [content, onSaveDraft]);

  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSaveDraft(content);
    setIsSaving(false);
  }, [content, onSaveDraft]);

  const handleSubmit = useCallback(async () => {
    if (wordCount < targetWords) return;
    
    setIsSubmitting(true);
    setIsTimerRunning(false);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(content, wordCount, seconds);
  }, [content, wordCount, seconds, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {task1Completed && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Task 1</span>
                  </div>
                )}
                <TaskStatusIndicator taskNumber={2} status="active" />
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <span>Bài kiểm tra đầu vào</span>
                <span>•</span>
                <span>Phần 2/2</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <WritingTimer seconds={seconds} isRunning={isTimerRunning} />
              <WordCounter count={wordCount} target={targetWords} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <h2 className="font-bold text-gray-900 dark:text-white">Task 2</h2>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {getQuestionTypeLabel(prompt.questionType)}
                </span>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {prompt.prompt}
                </p>
              </div>
            </Card>

            {/* Reminder */}
            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-0">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-1">
                    Lưu ý
                  </h3>
                  <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                    <li>• Viết ít nhất 250 từ</li>
                    <li>• Thời gian khuyến nghị: 40 phút</li>
                    <li>• Cấu trúc rõ ràng: Mở bài - Thân bài - Kết luận</li>
                    <li>• Trả lời đúng câu hỏi đề bài</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                💡 Mẹo viết hay
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                <li>• Giới thiệu rõ ràng quan điểm của bạn trong mở bài</li>
                <li>• Mỗi đoạn thân bài nên có 1 ý chính + ví dụ</li>
                <li>• Sử dụng từ nối để liên kết các ý</li>
                <li>• Tóm tắt lại quan điểm trong kết luận</li>
              </ul>
            </Card>
          </motion.div>

          {/* Right - Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 dark:text-white">Bài viết của bạn</h2>
              </div>

              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Bắt đầu viết bài của bạn tại đây..."
                className="flex-1 min-h-[450px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 leading-relaxed"
                disabled={isSubmitting}
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500">
                  Tự động lưu sau mỗi 30 giây
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSaving || isSubmitting}
                    className="border-gray-200 dark:border-gray-700"
                  >
                    {isSaving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Lưu tạm
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || wordCount < targetWords}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 text-white shadow-md"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Nộp bài kiểm tra
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
