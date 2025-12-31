import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Save, 
  ArrowRight, 
  AlertCircle,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { WritingTimer, WordCounter, TaskStatusIndicator } from './WritingComponents';
import type { Task1Prompt } from '../../types/placementTest';

interface Task1AssessmentEditorProps {
  prompt: Task1Prompt;
  onComplete: (essayText: string, wordCount: number, timeTaken: number) => void;
  onSaveDraft: (essayText: string) => void;
  initialContent?: string;
}

export function Task1AssessmentEditor({
  prompt,
  onComplete,
  onSaveDraft,
  initialContent = ''
}: Task1AssessmentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const targetWords = 150;

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

  const handleComplete = useCallback(() => {
    setIsTimerRunning(false);
    onComplete(content, wordCount, seconds);
  }, [content, wordCount, seconds, onComplete]);

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
              <TaskStatusIndicator taskNumber={1} status="active" />
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <span>Bài kiểm tra đầu vào</span>
                <span>•</span>
                <span>Phần 1/2</span>
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
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h2 className="font-bold text-gray-900 dark:text-white">Task 1</h2>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {prompt.taskType}
                </span>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {prompt.prompt}
                </p>
              </div>
            </Card>

            {/* Chart/Image */}
            {prompt.imageUrl && (
              <Card className="p-4 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Biểu đồ / Hình ảnh
                    </span>
                  </div>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Phóng to
                  </button>
                </div>
                <img
                  src={prompt.imageUrl}
                  alt="Task 1 Chart"
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                />
              </Card>
            )}

            {/* Reminder */}
            <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-0">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                    Lưu ý
                  </h3>
                  <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                    <li>• Viết ít nhất 150 từ</li>
                    <li>• Thời gian khuyến nghị: 20 phút</li>
                    <li>• Mô tả xu hướng chính và so sánh dữ liệu</li>
                  </ul>
                </div>
              </div>
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
                className="flex-1 min-h-[400px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 leading-relaxed"
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500">
                  Tự động lưu sau mỗi 30 giây
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSaving}
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
                    onClick={handleComplete}
                    disabled={wordCount < targetWords}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-md"
                  >
                    Hoàn thành Task 1
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && prompt.imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShowImageModal(false)}
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={prompt.imageUrl}
            alt="Task 1 Chart"
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
