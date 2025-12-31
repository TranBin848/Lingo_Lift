import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Clock, 
  FileText, 
  Save, 
  Send,
  Target,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  PieChart,
  Table,
  Map,
  RefreshCw,
  Shuffle,
  Mail,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { EssayStatusBadge } from './EssayStatusBadge';
import { Task1FeedbackPanel, Task2FeedbackPanel, GradingInProgress } from './EssayFeedbackPanel';
import type { 
  Task1Topic, 
  Task2Topic,
  EssayStatus,
  ChartType,
  Task1Feedback,
  Task2Feedback
} from '../../types/essay';
import {
  chartTypeLabels,
  topicDifficultyLabels,
  topicDifficultyColors,
  topicCategoryLabels
} from '../../types/essay';

// Mock AI grading function for Task 1
function generateMockTask1Feedback(_content: string, wordCount: number, _timeSpent: number): Task1Feedback {
  // Calculate scores based on word count and some randomness
  const baseScore = Math.min(5.0 + (wordCount / 100) * 0.5, 7.5);
  const variation = () => (Math.random() - 0.5) * 1.0;
  
  const taskAchievementScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const coherenceScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const lexicalScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const grammaticalScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  
  const avgScore = (taskAchievementScore + coherenceScore + lexicalScore + grammaticalScore) / 4;
  const roundedScore = Math.round(avgScore * 2) / 2; // Round to nearest 0.5

  return {
    essayId: 'new-essay-' + Date.now(),
    taskAchievement: {
      score: Math.round(taskAchievementScore * 2) / 2,
      comments: 'Bài viết đã mô tả được các thông tin chính từ biểu đồ. Cần thêm chi tiết số liệu cụ thể để đạt điểm cao hơn.',
      strengths: [
        'Giới thiệu rõ ràng về biểu đồ',
        'Nêu được các xu hướng chính',
        wordCount >= 150 ? 'Độ dài bài viết phù hợp' : 'Cần viết thêm để đạt số từ tối thiểu',
      ],
      improvements: [
        'Cần thêm số liệu cụ thể để minh họa',
        'Nên làm nổi bật các điểm đặc biệt trong biểu đồ',
        'Phần tổng kết có thể chi tiết hơn',
      ],
    },
    coherenceCohesion: {
      score: Math.round(coherenceScore * 2) / 2,
      comments: 'Cấu trúc bài viết rõ ràng với các đoạn văn được tổ chức tốt.',
      strengths: [
        'Cấu trúc bài viết logic',
        'Chia đoạn văn hợp lý',
      ],
      improvements: [
        'Cần đa dạng hơn trong việc sử dụng từ nối',
        'Một số đoạn văn có thể được kết nối mượt mà hơn',
      ],
    },
    lexicalResource: {
      score: Math.round(lexicalScore * 2) / 2,
      comments: 'Từ vựng sử dụng phù hợp với task. Cần mở rộng vốn từ học thuật.',
      strengths: [
        'Sử dụng từ vựng phù hợp ngữ cảnh',
        'Có paraphrase đề bài',
      ],
      improvements: [
        'Tránh lặp lại từ vựng',
        'Nên sử dụng thêm từ đồng nghĩa',
      ],
    },
    grammaticalRange: {
      score: Math.round(grammaticalScore * 2) / 2,
      comments: 'Ngữ pháp cơ bản chính xác. Cần sử dụng thêm câu phức.',
      strengths: [
        'Ít lỗi ngữ pháp nghiêm trọng',
        'Sử dụng đúng thì cơ bản',
      ],
      improvements: [
        'Nên sử dụng thêm câu phức',
        'Có thể đa dạng hóa cấu trúc câu hơn',
      ],
    },
    estimatedBandScore: roundedScore,
    overallScore: roundedScore,
    overallComments: `Bài viết Task 1 đạt band ${roundedScore}. Bạn đã hoàn thành nhiệm vụ mô tả biểu đồ. Để đạt điểm cao hơn, hãy tập trung vào việc thêm số liệu cụ thể, đa dạng từ vựng và sử dụng cấu trúc câu phức tạp hơn.`,
    recommendations: [
      'Luyện tập thêm về cách mô tả xu hướng với các cụm từ đa dạng',
      'Học thêm từ vựng về so sánh và tương phản',
      'Thực hành viết câu phức với nhiều mệnh đề',
      'Thử viết lại bài với nhiều chi tiết số liệu hơn',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 1500 + Math.random() * 1000,
    gradedAt: new Date().toISOString(),
  };
}

// Mock AI grading function for Task 2
function generateMockTask2Feedback(_content: string, wordCount: number, _timeSpent: number): Task2Feedback {
  const baseScore = Math.min(5.0 + (wordCount / 150) * 0.5, 7.5);
  const variation = () => (Math.random() - 0.5) * 1.0;
  
  const taskResponseScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const coherenceScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const lexicalScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  const grammaticalScore = Math.max(4.0, Math.min(9.0, baseScore + variation()));
  
  const avgScore = (taskResponseScore + coherenceScore + lexicalScore + grammaticalScore) / 4;
  const roundedScore = Math.round(avgScore * 2) / 2;

  return {
    essayId: 'new-essay-' + Date.now(),
    taskResponse: {
      score: Math.round(taskResponseScore * 2) / 2,
      comments: 'Bài viết đã trả lời câu hỏi và đưa ra quan điểm. Cần phát triển lập luận sâu hơn.',
      strengths: [
        'Quan điểm cá nhân rõ ràng',
        'Có ví dụ để minh họa',
        wordCount >= 250 ? 'Độ dài phù hợp' : 'Cần viết thêm để đạt số từ tối thiểu',
      ],
      improvements: [
        'Một số lập luận cần được phát triển sâu hơn',
        'Nên thêm ví dụ thực tế cho một số điểm',
        'Có thể phân tích counter-argument chi tiết hơn',
      ],
    },
    coherenceCohesion: {
      score: Math.round(coherenceScore * 2) / 2,
      comments: 'Bài viết có cấu trúc tốt với các đoạn văn được tổ chức logic.',
      strengths: [
        'Cấu trúc bài viết rõ ràng (intro-body-conclusion)',
        'Mỗi đoạn có topic sentence rõ ràng',
      ],
      improvements: [
        'Có thể cải thiện internal coherence trong một số đoạn',
        'Nên sử dụng đa dạng hơn các discourse markers',
      ],
    },
    lexicalResource: {
      score: Math.round(lexicalScore * 2) / 2,
      comments: 'Từ vựng phù hợp với topic. Có thể mở rộng thêm academic vocabulary.',
      strengths: [
        'Sử dụng từ vựng phù hợp',
        'Paraphrase đề bài tốt',
      ],
      improvements: [
        'Nên sử dụng thêm academic vocabulary',
        'Tránh lặp từ',
      ],
    },
    grammaticalRange: {
      score: Math.round(grammaticalScore * 2) / 2,
      comments: 'Ngữ pháp tốt với một số cấu trúc đa dạng. Cần thêm câu phức.',
      strengths: [
        'Sử dụng nhiều loại câu',
        'Ít lỗi ngữ pháp',
      ],
      improvements: [
        'Nên sử dụng thêm câu phức',
        'Có thể thử các cấu trúc nâng cao hơn',
      ],
    },
    estimatedBandScore: roundedScore,
    overallScore: roundedScore,
    overallComments: `Bài viết Task 2 đạt band ${roundedScore}. Bạn đã trình bày quan điểm rõ ràng và có lập luận hợp lý. Để đạt điểm cao hơn, hãy tập trung phát triển lập luận sâu hơn, sử dụng từ vựng học thuật và cấu trúc câu đa dạng.`,
    recommendations: [
      'Học cách phát triển ideas với more depth',
      'Thực hành thêm complex sentences',
      'Đọc các bài mẫu band 8.0 để học cách lập luận',
      'Thử viết lại bài với sophisticated arguments',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 1800 + Math.random() * 1200,
    gradedAt: new Date().toISOString(),
  };
}

// Chart type icon component
function ChartTypeIcon({ type, className = '' }: { type: ChartType; className?: string }) {
  const iconClass = `${className}`;
  
  switch (type) {
    case 'bar':
      return <BarChart3 className={iconClass} />;
    case 'line':
      return <TrendingUp className={iconClass} />;
    case 'pie':
      return <PieChart className={iconClass} />;
    case 'table':
      return <Table className={iconClass} />;
    case 'map':
      return <Map className={iconClass} />;
    case 'process':
      return <RefreshCw className={iconClass} />;
    case 'mixed':
      return <Shuffle className={iconClass} />;
    case 'letter':
      return <Mail className={iconClass} />;
    default:
      return <BarChart3 className={iconClass} />;
  }
}

// Timer component
function Timer({ seconds, isRunning }: { seconds: number; isRunning: boolean }) {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className={`w-4 h-4 ${isRunning ? 'text-blue-500' : 'text-gray-400'}`} />
      <span className={`font-mono ${isRunning ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
        {formatTime(seconds)}
      </span>
    </div>
  );
}

// Word count component
function WordCount({ count, target = 150 }: { count: number; target?: number }) {
  const percentage = Math.min((count / target) * 100, 100);
  const isEnough = count >= target;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <FileText className="w-4 h-4 text-gray-400" />
        <span className={`font-medium ${isEnough ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
          {count} từ
        </span>
        <span className="text-gray-400 text-xs">/ {target} từ tối thiểu</span>
      </div>
      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isEnough ? 'bg-green-500' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// Task 1 Editor Props
interface Task1EditorProps {
  topic: Task1Topic;
  onClose: () => void;
  onSaveDraft: (content: string, wordCount: number, timeSpent: number) => void;
  onSubmit: (content: string, wordCount: number, timeSpent: number) => void;
  initialContent?: string;
  initialStatus?: EssayStatus;
}

export function Task1EssayEditor({
  topic,
  onClose,
  onSaveDraft,
  onSubmit,
  initialContent = '',
  initialStatus = 'Draft'
}: Task1EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<EssayStatus>(initialStatus);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Task1Feedback | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const difficultyColor = topicDifficultyColors[topic.difficulty];

  // Word count
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-focus textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onSaveDraft(content, wordCount, seconds);
    setIsSaving(false);
  }, [content, wordCount, seconds, onSaveDraft]);

  const handleSubmit = useCallback(async () => {
    if (wordCount < 150) {
      alert('Bài viết cần ít nhất 150 từ');
      return;
    }
    
    setIsSubmitting(true);
    setIsTimerRunning(false);
    
    // Simulate submit delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus('Submitted');
    onSubmit(content, wordCount, seconds);
    setIsSubmitting(false);
    
    // Simulate AI grading (2-3 seconds delay)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Generate mock feedback
    const generatedFeedback = generateMockTask1Feedback(content, wordCount, seconds);
    setFeedback(generatedFeedback);
    setStatus('Graded');
  }, [content, wordCount, seconds, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">Task 1 - Writing</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ChartTypeIcon type={topic.chartType} className="w-4 h-4" />
                <span>{chartTypeLabels[topic.chartType]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Timer seconds={seconds} isRunning={isTimerRunning} />
            <EssayStatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-130px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Topic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <h2 className="font-bold text-gray-900 dark:text-white mb-3">Đề bài</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {topic.prompt}
                </p>
                
                {/* Task info */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${difficultyColor.bg} ${difficultyColor.text}`}>
                    {topicDifficultyLabels[topic.difficulty]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {topicCategoryLabels[topic.category]}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                    <Target className="w-3 h-3" />
                    Band {topic.estimatedBandLevel}+
                  </div>
                </div>
              </Card>

              {/* Image/Chart placeholder */}
              {topic.chartType !== 'letter' && (
                <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Biểu đồ / Hình ảnh
                  </h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <ChartTypeIcon type={topic.chartType} className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">{chartTypeLabels[topic.chartType]}</p>
                      <p className="text-xs mt-1">Hình ảnh minh họa</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Writing tips */}
              <Card className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Lưu ý
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Viết ít nhất 150 từ</li>
                  <li>• Thời gian khuyến nghị: 20 phút</li>
                  <li>• Bao gồm overview và các đặc điểm chính</li>
                </ul>
              </Card>
            </motion.div>

            {/* Right - Editor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 dark:text-white">Bài viết của bạn</h2>
                  <WordCount count={wordCount} target={150} />
                </div>

                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết bài của bạn tại đây..."
                  className="w-full h-[400px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 leading-relaxed"
                  disabled={status === 'Submitted' || status === 'Graded'}
                />
              </Card>

              {/* Grading status / Feedback */}
              <AnimatePresence mode="wait">
                {status === 'Submitted' && !feedback && (
                  <motion.div
                    key="grading-task1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <GradingInProgress />
                  </motion.div>
                )}
                {status === 'Graded' && feedback && (
                  <motion.div
                    key="feedback-task1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Task1FeedbackPanel feedback={feedback} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Tự động lưu sau mỗi thay đổi
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving || status === 'Submitted' || status === 'Graded'}
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
              Lưu bản nháp
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || status === 'Submitted' || status === 'Graded' || wordCount < 150}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-md"
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
              {status === 'Graded' ? 'Đã chấm xong' : 'Nộp bài cho AI chấm'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Task 2 Editor Props
interface Task2EditorProps {
  topic: Task2Topic;
  onClose: () => void;
  onSaveDraft: (content: string, wordCount: number, timeSpent: number) => void;
  onSubmit: (content: string, wordCount: number, timeSpent: number) => void;
  initialContent?: string;
  initialStatus?: EssayStatus;
}

export function Task2EssayEditor({
  topic,
  onClose,
  onSaveDraft,
  onSubmit,
  initialContent = '',
  initialStatus = 'Draft'
}: Task2EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<EssayStatus>(initialStatus);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Task2Feedback | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const difficultyColor = topicDifficultyColors[topic.difficulty];

  // Word count
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-focus textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSaveDraft(content, wordCount, seconds);
    setIsSaving(false);
  }, [content, wordCount, seconds, onSaveDraft]);

  const handleSubmit = useCallback(async () => {
    if (wordCount < 250) {
      alert('Bài viết cần ít nhất 250 từ');
      return;
    }
    
    setIsSubmitting(true);
    setIsTimerRunning(false);
    
    // Simulate submit delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus('Submitted');
    onSubmit(content, wordCount, seconds);
    setIsSubmitting(false);
    
    // Simulate AI grading (2-3 seconds delay)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Generate mock feedback
    const generatedFeedback = generateMockTask2Feedback(content, wordCount, seconds);
    setFeedback(generatedFeedback);
    setStatus('Graded');
  }, [content, wordCount, seconds, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">Task 2 - Writing</h1>
              <p className="text-sm text-gray-500">Essay</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Timer seconds={seconds} isRunning={isTimerRunning} />
            <EssayStatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-130px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Topic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <h2 className="font-bold text-gray-900 dark:text-white mb-3">Đề bài</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {topic.prompt}
                </p>
                
                {/* Task info */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${difficultyColor.bg} ${difficultyColor.text}`}>
                    {topicDifficultyLabels[topic.difficulty]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {topicCategoryLabels[topic.category]}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                    <Target className="w-3 h-3" />
                    Band {topic.estimatedBandLevel}+
                  </div>
                </div>
              </Card>

              {/* Keywords */}
              <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Từ khóa gợi ý</h3>
                <div className="flex flex-wrap gap-2">
                  {topic.keywords.map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Writing tips */}
              <Card className="p-5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50">
                <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Lưu ý
                </h3>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Viết ít nhất 250 từ</li>
                  <li>• Thời gian khuyến nghị: 40 phút</li>
                  <li>• Cấu trúc rõ ràng: Mở bài - Thân bài - Kết luận</li>
                  <li>• Trả lời đúng câu hỏi đề bài</li>
                </ul>
              </Card>
            </motion.div>

            {/* Right - Editor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 dark:text-white">Bài viết của bạn</h2>
                  <WordCount count={wordCount} target={250} />
                </div>

                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết bài của bạn tại đây..."
                  className="w-full h-[450px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 leading-relaxed"
                  disabled={status === 'Submitted' || status === 'Graded'}
                />
              </Card>

              {/* Grading status / Feedback */}
              <AnimatePresence mode="wait">
                {status === 'Submitted' && !feedback && (
                  <motion.div
                    key="grading-task2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <GradingInProgress />
                  </motion.div>
                )}
                {status === 'Graded' && feedback && (
                  <motion.div
                    key="feedback-task2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Task2FeedbackPanel feedback={feedback} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Tự động lưu sau mỗi thay đổi
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving || status === 'Submitted' || status === 'Graded'}
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
              Lưu bản nháp
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || status === 'Submitted' || status === 'Graded' || wordCount < 250}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 text-white shadow-md"
            >
              {status === 'Graded' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Đã chấm xong
                </>
              ) : isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {status !== 'Graded' && 'Nộp bài cho AI chấm'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
