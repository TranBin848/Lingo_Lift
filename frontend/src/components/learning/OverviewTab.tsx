import { Card } from "../ui/card";
import {
  Clock,
  BookOpen,
  FileText,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  Target,
  Flame,
  ArrowRight,
  CheckCircle2,
  Zap,
  GraduationCap,
  Play,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getCurrentLearningPath, getLearningPathPhases } from "../../api/learningPath";
import type { LearningPathSummary, Phase } from "../../types/learningPath";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../stores/useAuth.Store";

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

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const startValue = countRef.current;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;

      countRef.current = currentValue;
      setCount(Math.round(currentValue * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, startAnimation: () => setHasStarted(true) };
}

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

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
}

function StatCard({ icon, label, value, subtext, color }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative p-6 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Gradient glow on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${color}`}
        />

        <div className="relative flex items-start gap-4">
          <motion.div
            className={`p-3 rounded-xl ${color} shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                {subtext}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Skeleton Loading Component
function OverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl" />

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
}

export function OverviewTab() {
  const [learningPath, setLearningPath] = useState<LearningPathSummary | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const bandScore = useAnimatedCounter(
    learningPath?.currentBandScore || 0,
    1500
  );
  const targetScore = useAnimatedCounter(
    learningPath?.targetBandScore || 0,
    1500
  );

  useEffect(() => {
    fetchLearningPath();
  }, []);

  useEffect(() => {
    if (learningPath) {
      bandScore.startAnimation();
      targetScore.startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learningPath]);

  const fetchLearningPath = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentLearningPath();
      setLearningPath(data);
      
      // Fetch phases if we have a learning path
      if (data?.id) {
        const phasesData = await getLearningPathPhases(data.id);
        setPhases(phasesData);
      }
    } catch (err: unknown) {
      console.error("Error fetching learning path:", err);
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Không thể tải lộ trình học"
          : "Không thể tải lộ trình học";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!learningPath?.targetDate) return 0;
    const targetDate = new Date(learningPath.targetDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Get current phase
  const getCurrentPhase = () => {
    return phases.find(p => p.status === 'InProgress') || phases[0];
  };

  // Get phase status icon and color
  const getPhaseStatusConfig = (status: string) => {
    switch (status) {
      case 'Completed':
        return { 
          icon: CheckCircle2, 
          bg: 'bg-green-500', 
          text: 'text-green-500',
          label: 'Hoàn thành'
        };
      case 'InProgress':
        return { 
          icon: Play, 
          bg: 'bg-blue-500', 
          text: 'text-blue-500',
          label: 'Đang học'
        };
      default:
        return { 
          icon: Lock, 
          bg: 'bg-gray-400', 
          text: 'text-gray-400',
          label: 'Chưa mở'
        };
    }
  };

  // Get focus label
  const getFocusLabel = (focus: string) => {
    const labels: Record<string, string> = {
      'GrammaticalRange': 'Ngữ pháp',
      'GrammaticalRangeAccuracy': 'Ngữ pháp & Độ chính xác',
      'CoherenceCohesion': 'Mạch lạc & Liên kết',
      'LexicalResource': 'Từ vựng',
      'TaskAchievement': 'Hoàn thành bài',
      'AllAreas': 'Tất cả kỹ năng'
    };
    return labels[focus] || focus;
  };

  // Mock data for statistics
  const stats = {
    totalStudyHours: 45,
    totalLessons: 28,
    completedLessons: 12,
    totalTests: 8,
    completedTests: 3,
    currentStreak: 7,
  };

  // Today's suggested activities
  const todayActivities = [
    {
      id: 1,
      title: "Hoàn thành bài học Writing Task 2",
      description: "Phát triển ý tưởng và cấu trúc bài luận",
      duration: "30 phút",
      type: "lesson",
      priority: "high",
    },
    {
      id: 2,
      title: "Luyện tập từ vựng chủ đề Environment",
      description: "20 từ vựng mới cần học",
      duration: "15 phút",
      type: "vocabulary",
      priority: "medium",
    },
    {
      id: 3,
      title: "Practice Test: Task 1 - Line Graph",
      description: "Mô tả biểu đồ đường",
      duration: "20 phút",
      type: "test",
      priority: "medium",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      title: "Hoàn thành bài học: Linking Devices",
      time: "2 giờ trước",
      icon: BookOpen,
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
    {
      id: 2,
      title: "Hoàn thành Practice Test #3",
      time: "Hôm qua",
      icon: FileText,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      id: 3,
      title: "Đạt chuỗi học 7 ngày!",
      time: "Hôm nay",
      icon: Award,
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    },
  ];

  if (loading) {
    return <OverviewSkeleton />;
  }

  if (error || !learningPath) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-12 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className="w-10 h-10 text-red-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Không thể tải dữ liệu
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {error ||
              "Bạn chưa có lộ trình học nào. Hãy tạo lộ trình học để bắt đầu hành trình chinh phục IELTS!"}
          </p>
          <Button
            onClick={fetchLearningPath}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Thử lại
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section with Greeting */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium text-blue-100">
                Chào buổi sáng!
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl lg:text-4xl font-bold mb-3"
            >
              Chào {user?.displayName || "bạn"} 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-100 text-lg max-w-lg"
            >
              Tiếp tục hành trình chinh phục IELTS của bạn. Bạn đang làm rất
              tốt!
            </motion.p>

            {/* Streak badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="font-semibold">
                {stats.currentStreak} ngày liên tiếp
              </span>
              <span className="text-blue-200">🔥</span>
            </motion.div>
          </div>

          {/* Band Score Card */}
          <motion.div
            variants={scaleVariants}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[200px]"
          >
            <div className="text-center">
              <p className="text-sm text-blue-200 mb-2">Band Score hiện tại</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold">{bandScore.count}</span>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center text-green-300"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-2xl font-bold ml-1">
                    {targetScore.count}
                  </span>
                </motion.div>
              </div>
              <p className="text-xs text-blue-200 mt-2">Mục tiêu của bạn</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<Clock className="w-6 h-6 text-white" />}
          label="Thời gian dự kiến"
          value={`${learningPath?.estimatedDurationWeeks || 0} tuần`}
          subtext={`${learningPath?.totalPhases || 0} chặng học`}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-white" />}
          label="Chặng hiện tại"
          value={`${learningPath?.currentPhaseNumber || 1}/${learningPath?.totalPhases || 4}`}
          subtext={`${learningPath?.completedPhases || 0} đã hoàn thành`}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          label="Tiến độ"
          value={`${learningPath?.progressPercentage || 0}%`}
          subtext="Hoàn thành lộ trình"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-white" />}
          label="Còn lại"
          value={`${calculateDaysRemaining()} ngày`}
          subtext={learningPath?.targetDate ? new Date(learningPath.targetDate).toLocaleDateString('vi-VN') : ''}
          color="bg-gradient-to-br from-pink-500 to-pink-600"
        />
      </motion.div>

      {/* Learning Path Phases */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Lộ trình học tập
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {learningPath?.completedPhases || 0}/{learningPath?.totalPhases || 0} chặng hoàn thành
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Mục tiêu Band {learningPath?.targetBandScore || 0}
              </span>
            </div>
          </div>

          {/* Timeline Progress */}
          <div className="relative mb-6">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${learningPath?.progressPercentage || 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between relative">
              {phases.map((phase, index) => {
                const config = getPhaseStatusConfig(phase.status);
                const IconComponent = config.icon;
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / phases.length}%` }}
                  >
                    <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center shadow-lg z-10`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
                      Chặng {phase.phaseNumber}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Phase Cards */}
          <div className="space-y-4">
            {phases.map((phase, index) => {
              const config = getPhaseStatusConfig(phase.status);
              const isCurrentPhase = phase.status === 'InProgress';
              
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isCurrentPhase 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : phase.status === 'Completed'
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${config.bg} shadow-lg`}>
                      <config.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          Chặng {phase.phaseNumber}: {phase.title}
                        </h4>
                        {isCurrentPhase && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full animate-pulse">
                            Đang học
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {phase.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{phase.durationWeeks} tuần</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Target className="w-4 h-4" />
                          <span>Band {phase.expectedBandScore}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                          phase.primaryFocus === 'GrammaticalRange' || phase.primaryFocus === 'GrammaticalRangeAccuracy'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : phase.primaryFocus === 'LexicalResource'
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                              : phase.primaryFocus === 'CoherenceCohesion'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {getFocusLabel(phase.primaryFocus)}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(phase.startDate).toLocaleDateString('vi-VN')} - {new Date(phase.endDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isCurrentPhase && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                          <Play className="w-4 h-4 mr-1" />
                          Tiếp tục
                        </Button>
                      </motion.div>
                    )}
                    {phase.status === 'Pending' && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Activities */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Hôm nay bạn nên làm gì?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đề xuất dựa trên tiến độ học
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {todayActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activity.priority === "high"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      {activity.type === "lesson" && (
                        <BookOpen
                          className={`w-5 h-5 ${
                            activity.priority === "high"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        />
                      )}
                      {activity.type === "vocabulary" && (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                      {activity.type === "test" && (
                        <Target className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {activity.duration}
                        </span>
                        {activity.priority === "high" && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                            Ưu tiên
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
                <Sparkles className="w-4 h-4 mr-2" />
                Bắt đầu học ngay
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Progress & Recent Activity */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Current Phase Details */}
          {getCurrentPhase() && (
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Chặng hiện tại
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getCurrentPhase()?.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <ProgressRing
                  progress={learningPath?.progressPercentage || 0}
                  size={140}
                  strokeWidth={12}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {learningPath?.currentBandScore || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Hiện tại</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {getCurrentPhase()?.expectedBandScore || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Mục tiêu chặng</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {learningPath?.targetBandScore || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Mục tiêu cuối</p>
                </div>
              </div>

              {/* Focus area for current phase */}
              {getCurrentPhase()?.primaryFocus && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-medium">Trọng tâm chặng này:</span>{" "}
                    {getFocusLabel(getCurrentPhase()?.primaryFocus || '')}
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Recent Activity */}
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Hoạt động gần đây
              </h3>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}
                  >
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
