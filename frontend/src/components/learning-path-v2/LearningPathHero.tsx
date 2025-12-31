import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Target, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Play,
  Settings,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { LearningPath } from '../../types/learningPathTypes';
import { getLearningPathStatusLabel } from '../../types/learningPathTypes';
import { calculateProgressPercentage, getCurrentPhase } from '../../mocks/learningPathMock';

interface LearningPathHeroProps {
  learningPath: LearningPath;
  onContinue: () => void;
  onViewAdjustments: () => void;
}

export function LearningPathHero({ 
  learningPath, 
  onContinue, 
  onViewAdjustments 
}: LearningPathHeroProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedCurrentBand, setAnimatedCurrentBand] = useState(0);
  
  const progress = calculateProgressPercentage(learningPath);
  const currentPhase = getCurrentPhase(learningPath.phases);
  
  // Animate progress bar
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      
      setAnimatedProgress(progress * eased);
      setAnimatedCurrentBand(learningPath.currentBandScore * eased);
      
      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [progress, learningPath.currentBandScore]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusColor = () => {
    switch (learningPath.status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'Paused': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
      case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-xl">
        {/* Hero Gradient Header */}
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left - Band Score Journey */}
              <div className="flex items-center gap-6">
                {/* Current Band */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Hiện tại</div>
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    {animatedCurrentBand.toFixed(1)}
                  </div>
                </motion.div>
                
                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <TrendingUp className="w-8 h-8 text-white/80" />
                  <div className="text-white/60 text-xs mt-1">+{(learningPath.targetBandScore - learningPath.currentBandScore).toFixed(1)}</div>
                </motion.div>
                
                {/* Target Band */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Mục tiêu</div>
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    {learningPath.targetBandScore.toFixed(1)}
                  </div>
                </motion.div>
              </div>
              
              {/* Right - Status & Info */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                    {getLearningPathStatusLabel(learningPath.status)}
                  </span>
                  {currentPhase && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      {currentPhase.title}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Hoàn thành: {formatDate(learningPath.targetDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{learningPath.estimatedDurationWeeks} tuần</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between text-white/80 text-sm mb-2">
                <span>Tiến độ tổng thể</span>
                <span className="font-semibold">{animatedProgress.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${animatedProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>AI đang theo dõi và điều chỉnh lộ trình phù hợp với bạn</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onViewAdjustments}
              className="border-gray-200 dark:border-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Xem điều chỉnh
            </Button>
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-md"
            >
              <Play className="w-4 h-4 mr-2" />
              Tiếp tục học
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
