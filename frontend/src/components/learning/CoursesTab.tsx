import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Plus,
  Loader2,
  ArrowLeft,
  LayoutGrid,
  List,
  Calendar,
  Target,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";
import { LearningPathOverview } from "../learning-path/LearningPathOverview";
import { PhaseCard } from "../learning-path/PhaseCard";
import { PhaseTimeline } from "../learning-path/PhaseTimeline";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  createLearningPath,
  getAllLearningPaths,
} from "../../api/learningPath";
import { toast } from "sonner";
import type { LearningPath } from "../../types/learningPath";
import { motion, AnimatePresence } from "framer-motion";

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

const cardVariants = {
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

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalPhases: number;
  completedPhases: number;
  status: string;
  daysRemaining?: number;
  currentBand?: number;
  targetBand?: number;
  onClick: () => void;
}

function CourseCard({
  title,
  description,
  progress,
  totalPhases,
  completedPhases,
  status,
  daysRemaining,
  currentBand,
  targetBand,
  onClick,
}: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    Active: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
      label: "Đang học",
      dot: "bg-green-500",
    },
    Completed: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-300",
      label: "Hoàn thành",
      dot: "bg-blue-500",
    },
    Cancelled: {
      bg: "bg-gray-100 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-300",
      label: "Đã hủy",
      dot: "bg-gray-500",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.Active;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-blue-500 to-purple-500" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${config.bg} ${config.text}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
                    />
                    {config.label}
                  </span>
                  {daysRemaining !== undefined && status === "Active" && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysRemaining} ngày còn lại
                    </span>
                  )}
                </div>
              </div>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Band scores */}
          {currentBand && targetBand && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Band
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {currentBand}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {targetBand}
                </span>
                <span className="text-xs text-gray-500">(Mục tiêu)</span>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Tiến độ học tập
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {progress}%
              </span>
            </div>
            <div className="relative w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>
                  {completedPhases}/{totalPhases} chặng
                </span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                size="sm"
              >
                <Play className="w-4 h-4 mr-1" />
                Tiếp tục học
              </Button>
            </motion.div>
          </div>

          {/* Expandable phase breakdown */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Các chặng học tập:
                  </p>
                  <div className="space-y-2">
                    {Array.from({ length: totalPhases }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          index < completedPhases
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "bg-gray-50 dark:bg-gray-700/50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < completedPhases
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {index < completedPhases ? "✓" : index + 1}
                        </div>
                        <span
                          className={`text-sm ${
                            index < completedPhases
                              ? "text-green-700 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          Chặng {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

// Skeleton loading component
function CoursesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}

export function CoursesTab() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [view, setView] = useState<"timeline" | "grid">("timeline");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    targetBandScore: 7,
    targetDate: "",
  });

  // Fetch learning paths
  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllLearningPaths();
      setLearningPaths(data);
    } catch (err: unknown) {
      console.error("Error fetching learning paths:", err);
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Không thể tải danh sách lộ trình học"
          : "Không thể tải danh sách lộ trình học";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLearningPath = async () => {
    if (!formData.targetDate) {
      toast.error("Vui lòng chọn ngày mục tiêu");
      return;
    }

    if (formData.targetBandScore < 1 || formData.targetBandScore > 9) {
      toast.error("Band score phải từ 1 đến 9");
      return;
    }

    setIsCreating(true);
    try {
      const targetDate = new Date(formData.targetDate).toISOString();
      await createLearningPath({
        targetBandScore: formData.targetBandScore,
        targetDate: targetDate,
      });

      toast.success("Đã tạo lộ trình học thành công!");
      setIsDialogOpen(false);
      setFormData({ targetBandScore: 7, targetDate: "" });

      // Refetch learning paths
      await fetchLearningPaths();
    } catch (error: unknown) {
      console.error("Error creating learning path:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Có lỗi xảy ra khi tạo lộ trình học"
          : "Có lỗi xảy ra khi tạo lộ trình học";
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const courses = learningPaths.map((path) => ({
    id: path.id,
    title: `IELTS Writing: Band ${path.currentBandScore} → ${path.targetBandScore}`,
    description: `Lộ trình cá nhân hóa giúp bạn đạt mục tiêu Band ${path.targetBandScore}`,
    progress: path.progressPercentage,
    totalPhases: path.totalPhases,
    completedPhases: path.completedPhases,
    status: path.status,
    daysRemaining: path.daysRemaining,
    currentBand: path.currentBandScore,
    targetBand: path.targetBandScore,
    learningPath: path,
  }));

  if (selectedCourse !== null) {
    const course = courses.find((c) => c.id === selectedCourse);
    if (!course) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Back button and header */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setSelectedCourse(null)}
              className="gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {course.description}
            </p>
          </div>
        </div>

        {/* Learning Path Overview */}
        <LearningPathOverview learningPath={course.learningPath} />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Các chặng học
          </h2>
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("timeline")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "timeline"
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
              Timeline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "grid"
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </motion.button>
          </div>
        </div>

        {/* Timeline View */}
        <AnimatePresence mode="wait">
          {view === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <PhaseTimeline
                  phases={course.learningPath.phases}
                  currentPhaseNumber={course.learningPath.currentPhaseNumber}
                />
              </Card>
            </motion.div>
          )}

          {/* Grid View */}
          {view === "grid" && (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {course.learningPath.phases.map((phase) => (
                <motion.div key={phase.id} variants={cardVariants}>
                  <PhaseCard
                    phase={phase}
                    isActive={
                      phase.phaseNumber ===
                      course.learningPath.currentPhaseNumber
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (loading) {
    return <CoursesSkeleton />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <span className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </span>
            Các khóa học của bạn
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chọn khóa học để xem lộ trình chi tiết và tiếp tục học tập
          </p>
        </div>

        {/* Dialog đăng ký lộ trình mới */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                Đăng ký lộ trình mới
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Đăng ký lộ trình học mới
              </DialogTitle>
              <DialogDescription>
                Tạo lộ trình học IELTS Writing được cá nhân hóa dựa trên mục
                tiêu của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Band score mục tiêu
                </label>
                <Input
                  type="number"
                  min="1"
                  max="9"
                  step="0.5"
                  value={formData.targetBandScore}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetBandScore: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Nhập band score mục tiêu (1-9)"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
                <p className="text-xs text-gray-500">
                  Band score bạn muốn đạt được (từ 1.0 đến 9.0)
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Ngày mục tiêu
                </label>
                <Input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) =>
                    setFormData({ ...formData, targetDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
                <p className="text-xs text-gray-500">
                  Ngày bạn dự định hoàn thành lộ trình học
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isCreating}
                className="border-gray-200 dark:border-gray-700"
              >
                Hủy
              </Button>
              <Button
                onClick={handleCreateLearningPath}
                disabled={isCreating}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Tạo lộ trình
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div variants={cardVariants}>
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
              {error}
            </p>
            <Button
              onClick={fetchLearningPaths}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Thử lại
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Content */}
      {!error && (
        <>
          {/* Active Courses */}
          <motion.div variants={cardVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đang học ({courses.filter((c) => c.status === "Active").length})
              </h2>
            </div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {courses
                .filter((c) => c.status === "Active")
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    onClick={() => setSelectedCourse(course.id)}
                  />
                ))}
            </motion.div>
          </motion.div>

          {/* Completed Courses */}
          {courses.filter((c) => c.status === "Completed").length > 0 && (
            <motion.div variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Đã hoàn thành (
                  {courses.filter((c) => c.status === "Completed").length})
                </h2>
              </div>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {courses
                  .filter((c) => c.status === "Completed")
                  .map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      onClick={() => setSelectedCourse(course.id)}
                    />
                  ))}
              </motion.div>
            </motion.div>
          )}

          {/* Empty State */}
          {courses.length === 0 && (
            <motion.div variants={cardVariants}>
              <Card className="p-12 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Chưa có khóa học nào
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Bắt đầu hành trình chinh phục IELTS bằng cách tạo lộ trình học
                  được cá nhân hóa cho bạn
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Đăng ký lộ trình mới
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
