import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Award,
  RefreshCw,
  Home
} from 'lucide-react';
import { Button } from '../ui/button';
import { AssessmentScoreCard } from './AssessmentScoreCard';
import { RecommendationPanel } from './RecommendationPanel';
import type { PlacementTest } from '../../types/placementTest';
import { getScoreGradient, getScoreLabel } from '../../types/placementTest';

interface PlacementResultProps {
  result: PlacementTest;
  onRetake: () => void;
  onGoHome: () => void;
  onStartLearning: () => void;
}

export function PlacementResult({ 
  result, 
  onRetake, 
  onGoHome, 
  onStartLearning 
}: PlacementResultProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate main score count-up
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    const targetScore = result.overallBandScore;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setAnimatedScore(targetScore * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timeout);
  }, [result.overallBandScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br ${getScoreGradient(result.overallBandScore)} opacity-20 blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br ${getScoreGradient(result.overallBandScore)} opacity-10 blur-3xl`} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-12 pb-8">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getScoreGradient(result.overallBandScore)} shadow-lg flex items-center justify-center`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Kết quả kiểm tra đầu vào
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bài kiểm tra hoàn thành lúc {result.completedAt?.toLocaleTimeString('vi-VN')}
            </p>
          </motion.div>

          {/* Main Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getScoreGradient(result.overallBandScore)} blur-2xl opacity-40`} />
              
              <div className={`relative px-12 py-8 rounded-3xl bg-gradient-to-br ${getScoreGradient(result.overallBandScore)} shadow-2xl`}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-6 h-6 text-white/80" />
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
                      Overall Band Score
                    </span>
                  </div>
                  <div className="text-7xl md:text-8xl font-bold text-white mb-2">
                    {animatedScore.toFixed(1)}
                  </div>
                  <div className="text-white/90 text-lg font-medium">
                    {getScoreLabel(result.overallBandScore)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6 text-center"
          >
            {result.task1Assessment && (
              <div className="px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {result.task1Assessment.overallScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Task 1</div>
              </div>
            )}
            {result.task2Assessment && (
              <div className="px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {result.task2Assessment.overallScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Task 2</div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.task1Assessment && (
            <AssessmentScoreCard 
              assessment={result.task1Assessment} 
              taskNumber={1}
              delay={0.6}
            />
          )}
          {result.task2Assessment && (
            <AssessmentScoreCard 
              assessment={result.task2Assessment} 
              taskNumber={2}
              delay={0.7}
            />
          )}
        </div>

        {/* Recommendation */}
        <RecommendationPanel 
          overallScore={result.overallBandScore}
          onStartLearning={onStartLearning}
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            variant="outline"
            onClick={onGoHome}
            className="w-full sm:w-auto border-gray-200 dark:border-gray-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
          <Button
            variant="outline"
            onClick={onRetake}
            className="w-full sm:w-auto border-gray-200 dark:border-gray-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm lại bài kiểm tra
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
