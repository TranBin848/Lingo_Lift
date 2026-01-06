import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Settings,
  HelpCircle,
  AlertCircle,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle2,
  Play,
  Lock,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  Sparkles,
  Flame,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  getCurrentLearningPath,
  getLearningPathById,
} from "../api/learningPath";
import { getTask1Topics } from "../services/task1Topic.service";
import { getTask2Topics } from "../services/task2Topic.service";
import type { LearningPath, Phase } from "../types/learningPath";
import type { Task1Topic } from "../types/task1-topic";
import type { Task2Topic } from "../types/task2-topic";
import { ROUTES } from "../constants";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Progress Ring Component
function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className="text-blue-600 dark:text-blue-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {progress}%
        </span>
      </div>
    </div>
  );
}

// Phase Card Component
interface PhaseCardProps {
  phase: Phase;
  isExpanded: boolean;
  onToggle: () => void;
  onStartPractice: () => void;
  task1Topics: Task1Topic[];
  task2Topics: Task2Topic[];
  loadingTopics: boolean;
}

function PhaseCard({
  phase,
  isExpanded,
  onToggle,
  onStartPractice,
  task1Topics,
  task2Topics,
  loadingTopics,
}: PhaseCardProps) {
  const navigate = useNavigate();
  const isCurrentPhase = phase.status === "InProgress";
  const isCompleted = phase.status === "Completed";

  const getStatusConfig = () => {
    if (isCompleted) {
      return {
        icon: CheckCircle2,
        bg: "bg-green-500",
        text: "text-green-500",
        label: "Hoàn thành",
        borderColor: "border-green-200 dark:border-green-800",
        bgColor: "bg-green-50 dark:bg-green-900/10",
      };
    }
    if (isCurrentPhase) {
      return {
        icon: Play,
        bg: "bg-blue-500",
        text: "text-blue-500",
        label: "Đang học",
        borderColor: "border-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
      };
    }
    return {
      icon: Lock,
      bg: "bg-gray-400",
      text: "text-gray-400",
      label: "Chưa mở",
      borderColor: "border-gray-200 dark:border-gray-700",
      bgColor: "bg-gray-50 dark:bg-gray-800/50",
    };
  };

  const getFocusLabel = (focus: string) => {
    const labels: Record<string, string> = {
      GrammaticalRange: "Ngữ pháp",
      GrammaticalRangeAccuracy: "Ngữ pháp & Độ chính xác",
      CoherenceCohesion: "Mạch lạc & Liên kết",
      LexicalResource: "Từ vựng",
      TaskAchievement: "Hoàn thành bài",
      AllAreas: "Tất cả kỹ năng",
    };
    return labels[focus] || focus;
  };

  const getFocusColor = (focus: string) => {
    const colors: Record<string, string> = {
      GrammaticalRange:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
      GrammaticalRangeAccuracy:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
      CoherenceCohesion:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      LexicalResource:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      TaskAchievement:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      AllAreas:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    };
    return (
      colors[focus] ||
      "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    );
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const handleTopicClick = (topicId: number, taskType: "task1" | "task2") => {
    navigate(`${ROUTES.WRITING_PRACTICE}?task=${taskType}&topicId=${topicId}`);
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl border-2 transition-all overflow-hidden ${config.borderColor} ${config.bgColor}`}
    >
      {/* Phase Header */}
      <div className="p-5 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl ${config.bg} shadow-lg flex-shrink-0`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Chặng {phase.phaseNumber}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  isCurrentPhase
                    ? "bg-blue-500 text-white animate-pulse"
                    : isCompleted
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {config.label}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {phase.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {phase.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{phase.durationWeeks} tuần</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Target className="w-4 h-4" />
                <span>Band {phase.expectedBandScore}</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getFocusColor(
                  phase.primaryFocus
                )}`}
              >
                {getFocusLabel(phase.primaryFocus)}
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(phase.startDate).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(phase.endDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isCurrentPhase && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartPractice(phase.id);
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              >
                <Play className="w-4 h-4 mr-1" />
                Tiếp tục
              </Button>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Content - Topics */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-700">
              {loadingTopics ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                  <span className="ml-2 text-gray-500">Đang tải đề bài...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
                  {/* Task 1 Topics */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Task 1 - Mô tả biểu đồ
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        {task1Topics.length} đề
                      </span>
                    </div>
                    {task1Topics.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {task1Topics.slice(0, 5).map((topic) => (
                          <motion.div
                            key={topic.id}
                            whileHover={{ x: 4 }}
                            onClick={() => handleTopicClick(topic.id, "task1")}
                            className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {topic.prompt || topic.title}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                  <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                    {topic.chartType || "Chart"}
                                  </span>
                                  <span>{topic.category}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                        ))}
                        {task1Topics.length > 5 && (
                          <p className="text-xs text-center text-gray-500 pt-2">
                            +{task1Topics.length - 5} đề khác
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Chưa có đề Task 1</p>
                      </div>
                    )}
                  </div>

                  {/* Task 2 Topics */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Task 2 - Viết luận
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        {task2Topics.length} đề
                      </span>
                    </div>
                    {task2Topics.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {task2Topics.slice(0, 5).map((topic) => (
                          <motion.div
                            key={topic.id}
                            whileHover={{ x: 4 }}
                            onClick={() => handleTopicClick(topic.id, "task2")}
                            className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-purple-300 dark:hover:border-purple-600 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                  {topic.prompt || topic.topic}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                  <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                    {topic.questionType}
                                  </span>
                                  <span>{topic.category}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                        ))}
                        {task2Topics.length > 5 && (
                          <p className="text-xs text-center text-gray-500 pt-2">
                            +{task2Topics.length - 5} đề khác
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Chưa có đề Task 2</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Skeleton Loading
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}

export default function LearningPathPageV2() {
  const navigate = useNavigate();

  // State
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(null);
  const [phaseTopics, setPhaseTopics] = useState<{
    [phaseId: number]: { task1: Task1Topic[]; task2: Task2Topic[] };
  }>({});
  const [loadingTopics, setLoadingTopics] = useState<{
    [phaseId: number]: boolean;
  }>({});

  // Load topics for a phase
  const loadTopicsForPhase = useCallback(
    async (phaseId: number) => {
      if (phaseTopics[phaseId]) return; // Already loaded

      setLoadingTopics((prev) => ({ ...prev, [phaseId]: true }));

      try {
        // Fetch both Task 1 and Task 2 topics
        const [task1Data, task2Data] = await Promise.all([
          getTask1Topics({ taskType: "Academic" }),
          getTask2Topics({ taskType: "Academic" }),
        ]);

        setPhaseTopics((prev) => ({
          ...prev,
          [phaseId]: {
            task1: task1Data.slice(0, 10), // Limit for now
            task2: task2Data.slice(0, 10),
          },
        }));
      } catch (err) {
        console.error("Error loading topics:", err);
        setPhaseTopics((prev) => ({
          ...prev,
          [phaseId]: { task1: [], task2: [] },
        }));
      } finally {
        setLoadingTopics((prev) => ({ ...prev, [phaseId]: false }));
      }
    },
    [phaseTopics]
  );

  // Fetch learning path data
  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get current learning path summary first
        const summary = await getCurrentLearningPath();

        // Get full learning path with phases
        const fullPath = await getLearningPathById(summary.id);
        setLearningPath(fullPath);

        // Auto-expand current phase
        const currentPhase = fullPath.phases?.find(
          (p) => p.status === "InProgress"
        );
        if (currentPhase) {
          setExpandedPhaseId(currentPhase.id);
        }
      } catch (err: unknown) {
        console.error("Error fetching learning path:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Không thể tải lộ trình học. Vui lòng thử lại.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

  // Load topics when expandedPhaseId changes
  useEffect(() => {
    if (expandedPhaseId && !phaseTopics[expandedPhaseId]) {
      loadTopicsForPhase(expandedPhaseId);
    }
  }, [expandedPhaseId, phaseTopics, loadTopicsForPhase]);

  // Toggle phase expansion
  const handleTogglePhase = (phaseId: number) => {
    if (expandedPhaseId === phaseId) {
      setExpandedPhaseId(null);
    } else {
      setExpandedPhaseId(phaseId);
      loadTopicsForPhase(phaseId);
    }
  };

  // Start practice for a phase
  const handleStartPractice = useCallback(() => {
    navigate(ROUTES.WRITING_PRACTICE);
  }, [navigate]);

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!learningPath?.targetDate) return 0;
    const targetDate = new Date(learningPath.targetDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

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
        {isLoading && <LoadingSkeleton />}

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

        {/* Main Content */}
        {!isLoading && !error && learningPath && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Hero Section */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
                  animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-medium text-blue-100">
                      Lộ trình cá nhân hóa
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                    Chinh phục Band {learningPath.targetBandScore} 🎯
                  </h1>

                  <p className="text-blue-100 text-lg max-w-lg mb-4">
                    Từ Band {learningPath.currentBandScore} đến Band{" "}
                    {learningPath.targetBandScore} trong{" "}
                    {learningPath.estimatedDurationWeeks} tuần
                  </p>

                  {/* Status badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Còn {getDaysRemaining()} ngày
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <Flame className="w-4 h-4 text-orange-300" />
                      <span className="text-sm">7 ngày liên tiếp 🔥</span>
                    </div>
                    {!learningPath.isOnTrack && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/30 backdrop-blur-sm rounded-full">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">Cần tăng tốc</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="text-center">
                    <ProgressRing
                      progress={learningPath.progressPercentage}
                      size={140}
                      strokeWidth={12}
                    />
                    <p className="text-sm text-blue-200 mt-3">
                      Tiến độ lộ trình
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <motion.div variants={itemVariants}>
                <Card className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Band hiện tại
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {learningPath.currentBandScore}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mục tiêu
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {learningPath.targetBandScore}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Chặng
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {learningPath.currentPhaseNumber}/
                        {learningPath.totalPhases}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Thời gian
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {learningPath.estimatedDurationWeeks} tuần
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Timeline Progress Bar */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tiến trình học tập
                  </h2>
                  <span className="text-sm text-gray-500">
                    {learningPath.completedPhases}/{learningPath.totalPhases}{" "}
                    chặng hoàn thành
                  </span>
                </div>

                {/* Progress bar with phase markers */}
                <div className="relative mb-8">
                  <div className="absolute top-5 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${learningPath.progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between relative">
                    {learningPath.phases?.map((phase, index) => {
                      const isCompleted = phase.status === "Completed";
                      const isCurrent = phase.status === "InProgress";
                      return (
                        <motion.div
                          key={phase.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex flex-col items-center"
                          style={{
                            width: `${
                              100 / (learningPath.phases?.length || 1)
                            }%`,
                          }}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${
                              isCompleted
                                ? "bg-green-500"
                                : isCurrent
                                ? "bg-blue-500 ring-4 ring-blue-200 dark:ring-blue-900"
                                : "bg-gray-400"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : isCurrent ? (
                              <Play className="w-5 h-5 text-white" />
                            ) : (
                              <Lock className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2 text-center">
                            Chặng {phase.phaseNumber}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Phases List */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Các chặng học tập
              </h2>

              <div className="space-y-4">
                {learningPath.phases?.map((phase) => (
                  <PhaseCard
                    key={phase.id}
                    phase={phase}
                    isExpanded={expandedPhaseId === phase.id}
                    onToggle={() => handleTogglePhase(phase.id)}
                    onStartPractice={handleStartPractice}
                    task1Topics={phaseTopics[phase.id]?.task1 || []}
                    task2Topics={phaseTopics[phase.id]?.task2 || []}
                    loadingTopics={loadingTopics[phase.id] || false}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                    Mẹo học tập
                  </h3>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed mb-4">
                  Để đạt hiệu quả tốt nhất, hãy hoàn thành ít nhất 1 bài viết
                  mỗi ngày và dành 15-20 phút ôn lại feedback từ AI. Điều này
                  giúp bạn cải thiện nhanh hơn 40% so với việc chỉ viết mà không
                  review.
                </p>
                <Button
                  onClick={() => navigate(ROUTES.WRITING_PRACTICE)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Bắt đầu luyện tập ngay
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
