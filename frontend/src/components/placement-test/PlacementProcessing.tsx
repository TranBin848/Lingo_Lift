import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PlacementProcessingProps {
  currentTask?: 'task1' | 'task2' | 'overall';
}

export function PlacementProcessing({ currentTask = 'overall' }: PlacementProcessingProps) {
  const taskLabels = {
    task1: 'Task 1',
    task2: 'Task 2',
    overall: 'bài viết'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {/* Animated AI Icon */}
        <motion.div
          className="relative inline-flex items-center justify-center mb-8"
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-4 border-indigo-200 dark:border-indigo-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border-4 border-dashed border-purple-300 dark:border-purple-700"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner glow */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Icon */}
          <motion.div
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
        >
          AI đang phân tích {taskLabels[currentTask]} của bạn
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Vui lòng đợi trong giây lát, hệ thống đang đánh giá bài viết theo các tiêu chí IELTS...
        </motion.p>

        {/* Processing steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <ProcessingStep text="Phân tích cấu trúc bài viết" delay={0} />
          <ProcessingStep text="Đánh giá từ vựng & ngữ pháp" delay={1} />
          <ProcessingStep text="Kiểm tra tính mạch lạc" delay={2} />
          <ProcessingStep text="Tổng hợp điểm số" delay={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProcessingStep({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        delay: delay * 0.5 
      }}
      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-indigo-500"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: delay * 0.5 }}
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
    </motion.div>
  );
}
