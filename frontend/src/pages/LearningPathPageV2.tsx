import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  LearningPathHero,
  PhaseTimeline,
  TodayFocusPanel,
  ProgressSummary,
  PathAdjustmentHistory
} from '../components/learning-path-v2';
import {
  mockLearningPath,
  mockPhases,
  mockAdjustments,
  mockProgressRecords,
  mockTodayTasks,
  getCurrentPhase
} from '../mocks/learningPathMock';
import type { PhaseTask1Topic, PhaseTask2Topic, TodayTask } from '../types/learningPathTypes';

export default function LearningPathPageV2() {
  const navigate = useNavigate();
  const [showAdjustments, setShowAdjustments] = useState(false);
  
  const currentPhase = getCurrentPhase(mockPhases);

  // Handler for continuing learning
  const handleContinue = useCallback(() => {
    // Navigate to the current active topic or lesson
    if (currentPhase) {
      const activeTask1 = currentPhase.task1Topics.find(t => t.status === 'in-progress');
      const activeTask2 = currentPhase.task2Topics.find(t => t.status === 'in-progress');
      
      if (activeTask1) {
        navigate(`/writing/task1/${activeTask1.topicId}`);
      } else if (activeTask2) {
        navigate(`/writing/task2/${activeTask2.topicId}`);
      } else {
        // Default to practice page
        navigate('/skills/writing');
      }
    }
  }, [currentPhase, navigate]);

  // Handler for starting a specific topic
  const handleStartTopic = useCallback((topic: PhaseTask1Topic | PhaseTask2Topic) => {
    const taskType = 'chartType' in topic ? 'task1' : 'task2';
    navigate(`/writing/${taskType}/${topic.topicId}`);
  }, [navigate]);

  // Handler for starting a today task
  const handleStartTask = useCallback((task: TodayTask) => {
    switch (task.taskType) {
      case 'essay':
        navigate(`/writing/${task.relatedTopicId}`);
        break;
      case 'lesson':
        navigate(`/lessons/${task.relatedTopicId}`);
        break;
      case 'practice':
        navigate(`/practice/${task.relatedTopicId}`);
        break;
      default:
        navigate('/skills/writing');
    }
  }, [navigate]);

  // Handler for viewing adjustments
  const handleViewAdjustments = useCallback(() => {
    setShowAdjustments(true);
    // Scroll to adjustments section
    document.getElementById('adjustments-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Lộ trình học tập
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  IELTS Writing - Cá nhân hóa theo năng lực
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <HelpCircle className="w-5 h-5 text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <LearningPathHero
              learningPath={mockLearningPath}
              onContinue={handleContinue}
              onViewAdjustments={handleViewAdjustments}
            />

            {/* Progress Summary */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tiến độ học tập
              </h2>
              <ProgressSummary progressRecords={mockProgressRecords} />
            </section>

            {/* Phase Timeline */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Các giai đoạn học tập
              </h2>
              <PhaseTimeline
                phases={mockPhases}
                onStartTopic={handleStartTopic}
              />
            </section>

            {/* Adjustment History */}
            <section id="adjustments-section">
              <PathAdjustmentHistory adjustments={mockAdjustments} />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Focus */}
            <div className="sticky top-24">
              <TodayFocusPanel
                tasks={mockTodayTasks}
                currentPhaseName={currentPhase?.phaseName || 'Giai đoạn hiện tại'}
                onStartTask={handleStartTask}
              />

              {/* Quick Tips Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                    Mẹo học tập
                  </h3>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  Để đạt hiệu quả tốt nhất, hãy hoàn thành ít nhất 1 bài viết mỗi ngày 
                  và dành 15-20 phút ôn lại feedback từ AI. Điều này giúp bạn 
                  cải thiện nhanh hơn 40% so với việc chỉ viết mà không review.
                </p>
              </motion.div>

              {/* Streak Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-300 mb-1">
                      Chuỗi học liên tiếp
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-purple-700 dark:text-purple-200">
                        7
                      </span>
                      <span className="text-sm text-purple-500 dark:text-purple-400">
                        ngày
                      </span>
                    </div>
                  </div>
                  <div className="text-5xl">🔥</div>
                </div>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-2">
                  Tiếp tục phát huy! Còn 3 ngày nữa để đạt milestone tiếp theo.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
