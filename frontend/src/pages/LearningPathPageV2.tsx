import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, HelpCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  LearningPathHero,
  PhaseTimeline,
  TodayFocusPanel,
  ProgressSummary,
  PathAdjustmentHistory,
} from "../components/learning-path-v2";
import {
  getCurrentLearningPath,
  getLearningPathPhases,
} from "../api/learningPath";
import type { LearningPathSummary, Phase as ApiPhase } from "../types/learningPath";
import type { TodayTask } from "../types/learningPathTypes";
import { ROUTES } from "../constants";
import {
  mockLearningPath,
  mockPhases,
  mockAdjustments,
  mockProgressRecords,
  mockTodayTasks,
  getCurrentPhase,
} from "../mocks/learningPathMock";

export default function LearningPathPageV2() {
  const navigate = useNavigate();

  // State management for API data
  const [learningPathSummary, setLearningPathSummary] = useState<LearningPathSummary | null>(null);
  const [apiPhases, setApiPhases] = useState<ApiPhase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current phase from mock data (until we integrate topics/lessons API)
  const currentPhase = getCurrentPhase(mockPhases);

  // Fetch learning path data from API
  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch current learning path summary
        const summary = await getCurrentLearningPath();
        setLearningPathSummary(summary);

        // Fetch phases for the learning path
        const phasesData = await getLearningPathPhases(summary.id);
        setApiPhases(phasesData);

        console.log('Learning Path Summary:', summary);
        console.log('Phases:', phasesData);
      } catch (err: unknown) {
        console.error('Error fetching learning path:', err);
        const errorMessage = err instanceof Error && (err as Error & { response?: { data?: { message?: string } } }).response?.data?.message 
          || 'Không thể tải lộ trình học. Vui lòng thử lại.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

  // Handler for continuing learning
  const handleContinue = useCallback(() => {
    // Navigate to the current active topic or lesson
    if (currentPhase) {
      const activeTask1 = currentPhase.task1Topics.find(
        (t) => t.status === "in-progress"
      );
      const activeTask2 = currentPhase.task2Topics.find(
        (t) => t.status === "in-progress"
      );

      if (activeTask1) {
        navigate(
          `${ROUTES.WRITING_PRACTICE}?task=task1&topicId=${activeTask1.topicId}`
        );
      } else if (activeTask2) {
        navigate(
          `${ROUTES.WRITING_PRACTICE}?task=task2&topicId=${activeTask2.topicId}`
        );
      } else {
        // Default to practice page
        navigate(ROUTES.WRITING_PRACTICE);
      }
    }
  }, [currentPhase, navigate]);

  // Handler for starting a specific topic
  const handleStartTopic = useCallback(
    (topicId: string, type: "task1" | "task2") => {
      // Navigate to writing practice page with topic selected
      navigate(`${ROUTES.WRITING_PRACTICE}?task=${type}&topicId=${topicId}`);
    },
    [navigate]
  );

  // Handler for starting a today task
  const handleStartTask = useCallback(
    (task: TodayTask) => {
      switch (task.type) {
        case "essay":
          if (task.relatedTopicId) {
            navigate(
              `${ROUTES.WRITING_PRACTICE}?topicId=${task.relatedTopicId}`
            );
          } else {
            navigate(ROUTES.WRITING_PRACTICE);
          }
          break;
        case "lesson":
          if (task.relatedTopicId) {
            navigate(`/lessons/${task.relatedTopicId}`);
          } else {
            navigate("/lessons");
          }
          break;
        case "practice":
          if (task.relatedTopicId) {
            navigate(
              `${ROUTES.WRITING_PRACTICE}?topicId=${task.relatedTopicId}`
            );
          } else {
            navigate(ROUTES.WRITING_PRACTICE);
          }
          break;
        default:
          navigate(ROUTES.WRITING_PRACTICE);
      }
    },
    [navigate]
  );

  // Handler for viewing adjustments
  const handleViewAdjustments = useCallback(() => {
    // Scroll to adjustments section
    document.getElementById("adjustments-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="inline-block w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">Đang tải lộ trình học...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                Không thể tải lộ trình học
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Thử lại
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid - Using mock data for UI components */}
        {!isLoading && !error && learningPathSummary && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* API Data Display - Real Learning Path Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                🎯 Lộ trình học tập của bạn
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Điểm hiện tại</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{learningPathSummary.currentBandScore}</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Điểm mục tiêu</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{learningPathSummary.targetBandScore}</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tiến độ</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{learningPathSummary.progressPercentage}%</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Giai đoạn</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{learningPathSummary.currentPhaseNumber}/{learningPathSummary.totalPhases}</p>
                </div>
              </div>
              
              {/* Phases from API */}
              {apiPhases.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    Các giai đoạn (từ API)
                  </h3>
                  <div className="space-y-3">
                    {apiPhases.map((phase) => (
                      <div 
                        key={phase.id}
                        className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                                {phase.phaseNumber}
                              </span>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{phase.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                phase.status === 'InProgress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                                phase.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                                'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {phase.status === 'InProgress' ? 'Đang học' : phase.status === 'Completed' ? 'Hoàn thành' : 'Chưa bắt đầu'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{phase.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                              <span>🕹️ {phase.durationWeeks} tuần</span>
                              <span>🎯 {phase.expectedBandScore.toFixed(1)} band</span>
                              <span>📌 {phase.primaryFocus}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Hero Section - Using Mock Data for UI */}
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

            {/* Phase Timeline - Using Mock Data for UI */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Lộ trình chi tiết (Mock UI)
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
                currentPhaseName={currentPhase?.title || "Giai đoạn hiện tại"}
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
                  Để đạt hiệu quả tốt nhất, hãy hoàn thành ít nhất 1 bài viết
                  mỗi ngày và dành 15-20 phút ôn lại feedback từ AI. Điều này
                  giúp bạn cải thiện nhanh hơn 40% so với việc chỉ viết mà không
                  review.
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
        )}
      </main>
    </div>
  );
}
