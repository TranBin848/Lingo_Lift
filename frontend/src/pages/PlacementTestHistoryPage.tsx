import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Clock,
  Target,
  FileText,
} from "lucide-react";
import TestHistoryCard from "../components/placement/TestHistoryCard";
import type { StartTestResponse } from "../api/placementTest";
import { apiClient } from "../api/client";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end * 10) / 10);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded-lg" />
            <div className="h-4 w-24 bg-gray-100 rounded-lg" />
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-xl" />
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full" />
        <div className="flex gap-4">
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-10 w-full bg-gray-200 rounded-xl mt-2" />
      </div>
    </div>
  );
}

// Stats Card Component with animation
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  gradient,
  delay = 0,
  animate = false,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  subtext?: string;
  gradient: string;
  delay?: number;
  animate?: boolean;
}) {
  const animatedValue = useAnimatedCounter(
    typeof value === "number" ? value : 0,
    1200
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.15)",
      }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-indigo-200 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Gradient glow on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${gradient}`}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500 text-sm font-medium">{label}</span>
          <div className={`p-2.5 rounded-xl ${gradient}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {animate && typeof value === "number"
            ? animatedValue.toFixed(1)
            : value}
        </div>
        {subtext && (
          <div className="text-xs text-gray-400 mt-1 font-medium">
            {subtext}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Filter Button Component
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
          : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      {children}
    </motion.button>
  );
}

type FilterType =
  | "all"
  | "Placement"
  | "Progress"
  | "Final"
  | "completed"
  | "inProgress";

interface TestHistory {
  id: number;
  userId: number;
  type: string;
  overallBandScore: number;
  completedAt: string | null;
  createdAt: string;
  status: "InProgress" | "Completed";
  task1Score?: number;
  task2Score?: number;
}

export default function PlacementTestHistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "score">("newest");
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get<unknown, StartTestResponse[]>(
          "/placement-tests"
        );

        const transformedData: TestHistory[] = response.map((test) => ({
          id: test.id,
          userId: test.userId,
          type: test.type,
          overallBandScore: test.overallBandScore,
          completedAt: test.completedAt,
          createdAt: test.createdAt,
          status: test.status,
          task1Score: test.task1?.overallScore,
          task2Score: test.task2?.overallScore,
        }));

        setTestHistory(transformedData);
      } catch (err) {
        console.error("Failed to fetch test history:", err);
        setError("Không thể tải lịch sử kiểm tra. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestHistory();
  }, []);

  const filteredTests = testHistory.filter((test) => {
    if (filter === "all") return true;
    if (filter === "completed") return test.status === "Completed";
    if (filter === "inProgress") return test.status === "InProgress";
    return test.type === filter;
  });

  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "score") {
      return b.overallBandScore - a.overallBandScore;
    }
    return 0;
  });

  const completedTests = testHistory.filter((t) => t.status === "Completed");
  const averageScore =
    completedTests.length > 0
      ? completedTests.reduce((sum, t) => sum + t.overallBandScore, 0) /
        completedTests.length
      : 0;
  const highestScore =
    completedTests.length > 0
      ? Math.max(...completedTests.map((t) => t.overallBandScore))
      : 0;

  const handleViewDetails = (testId: number) => {
    navigate(`/placement-test-result/${testId}`);
  };

  const filterOptions = [
    { value: "all" as const, label: "Tất cả" },
    { value: "Placement" as const, label: "Đầu vào" },
    { value: "Progress" as const, label: "Tiến độ" },
    { value: "Final" as const, label: "Cuối khóa" },
    { value: "completed" as const, label: "Hoàn thành" },
    { value: "inProgress" as const, label: "Đang làm" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/learning-path"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 group transition-all duration-300"
            >
              <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              <span className="group-hover:underline underline-offset-4">
                Quay lại trang học tập
              </span>
            </Link>
          </motion.div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-start gap-5">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-indigo-500/25"
              >
                <History className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Lịch Sử Kiểm Tra
                  </h1>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </motion.div>
                </div>
                <p className="text-gray-600 text-lg max-w-xl">
                  Theo dõi tiến trình học tập và xem lại kết quả các bài kiểm
                  tra của bạn
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatCard
              icon={Calendar}
              label="Tổng số bài test"
              value={isLoading ? "--" : testHistory.length}
              subtext={`${completedTests.length} hoàn thành`}
              gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
              delay={0.1}
            />
            <StatCard
              icon={TrendingUp}
              label="Điểm trung bình"
              value={averageScore > 0 ? averageScore : "--"}
              subtext="Band Score"
              gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
              delay={0.2}
              animate={!isLoading}
            />
            <StatCard
              icon={Award}
              label="Điểm cao nhất"
              value={highestScore > 0 ? highestScore : "--"}
              subtext="Band Score"
              gradient="bg-gradient-to-br from-amber-500 to-orange-500"
              delay={0.3}
              animate={!isLoading}
            />
          </div>

          {/* Filters and Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter by type */}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Filter className="w-4 h-4 text-indigo-500" />
                  Lọc theo loại
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map(({ value, label }) => (
                    <FilterButton
                      key={value}
                      active={filter === value}
                      onClick={() => setFilter(value)}
                    >
                      {label}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="lg:w-52">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Target className="w-4 h-4 text-indigo-500" />
                  Sắp xếp
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest" | "score")
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white cursor-pointer hover:border-gray-300 transition-all duration-300"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="score">Điểm cao nhất</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Loading State - Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900">
                      Có lỗi xảy ra
                    </h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          <AnimatePresence mode="wait">
            {!isLoading && !error && sortedTests.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center"
                >
                  <FileText className="w-14 h-14 text-indigo-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Không tìm thấy bài kiểm tra nào
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                  {filter === "all"
                    ? "Bạn chưa làm bài kiểm tra nào. Hãy bắt đầu với bài kiểm tra đầu vào!"
                    : "Thử thay đổi bộ lọc để xem các bài kiểm tra khác"}
                </p>
                {filter === "all" && (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/placement-tests")}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25"
                  >
                    <Clock className="w-5 h-5" />
                    Làm bài kiểm tra đầu vào
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Test History Grid */}
          {!isLoading && !error && sortedTests.length > 0 && (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {sortedTests.map((test) => (
                  <motion.div
                    key={test.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TestHistoryCard
                      test={test}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Results Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
                  <span className="text-sm text-gray-500">
                    Hiển thị{" "}
                    <span className="font-semibold text-indigo-600">
                      {sortedTests.length}
                    </span>{" "}
                    / {testHistory.length} bài kiểm tra
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
