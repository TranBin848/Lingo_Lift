import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getBandScoreColor, getBandScoreGradient } from '../../types/essay';

interface ScoreCardProps {
  title: string;
  score: number;
  delay?: number;
}

export function ScoreCard({ title, score, delay = 0 }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const colors = getBandScoreColor(score);
  const gradient = getBandScoreGradient(score);

  // Animate score count-up
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = score;
      const duration = 1000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(counter);
        } else {
          setDisplayScore(start);
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [score, delay]);

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth((score / 9) * 100);
    }, delay + 100);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`p-6 rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm`}
    >
      {/* Title and Score */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        <motion.div
          className={`text-3xl font-bold ${colors.text}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay / 1000 + 0.2, type: 'spring', stiffness: 200 }}
        >
          {displayScore.toFixed(1)}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{
              duration: 1,
              delay: delay / 1000 + 0.3,
              ease: 'easeOut',
            }}
          />
        </div>
        
        {/* Score markers */}
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>0</span>
          <span>9</span>
        </div>
      </div>

      {/* Band level indicator */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {score >= 8.0 && '🌟 Xuất sắc'}
        {score >= 7.0 && score < 8.0 && '✨ Rất tốt'}
        {score >= 6.0 && score < 7.0 && '👍 Tốt'}
        {score >= 5.0 && score < 6.0 && '📝 Khá'}
        {score < 5.0 && '📚 Cần cải thiện'}
      </div>
    </motion.div>
  );
}
