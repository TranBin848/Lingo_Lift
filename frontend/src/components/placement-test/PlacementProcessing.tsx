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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {/* Animated AI Icon */}
        <motion.div
          className="relative inline-flex items-center justify-center mb-10"
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-36 h-36 rounded-full border-4 border-indigo-200 dark:border-indigo-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border-4 border-dashed border-purple-300 dark:border-purple-700"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner glow */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-60"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Icon */}
          <motion.div
            className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl"
            animate={{ 
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          AI đang phân tích {taskLabels[currentTask]} của bạn
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-10"
        >
          Vui lòng đợi trong giây lát, hệ thống đang đánh giá bài viết theo các tiêu chí IELTS...
        </motion.p>

        {/* Processing steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.2 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          delay: delay * 0.3
        }}
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {text}
      </span>
    </motion.div>
  );
}
