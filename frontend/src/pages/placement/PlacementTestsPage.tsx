import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useAuthStore } from "../../stores/useAuth.Store";
import { useNavigate, Link } from "react-router-dom";
import type { PlacementTest } from "../../services/placementTest.Service";
import ImprovedTestCard from "../../components/placement/ImprovedTestCard";
import { MOCK_PLACEMENT_TESTS } from "../../mocks/placementTests";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden relative">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded-lg" />
            <div className="h-4 w-32 bg-gray-100 rounded-lg" />
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
          <div className="h-8 w-20 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-12 w-full bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.2)" }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-indigo-200 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlacementTestsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [tests, setTests] = useState<PlacementTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const canManage = user?.role === "admin" || user?.role === "teacher";

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setTests(MOCK_PLACEMENT_TESTS as unknown as PlacementTest[]);
    } catch (err) {
      console.error("Error loading tests:", err);
      setError("Không thể tải danh sách bài kiểm tra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleTakeTest = (testId: string) => {
    navigate(`/placement-test/${testId}`);
  };

  const handleEditTest = (testId: string) => {
    navigate(`/admin/placement-test/edit/${testId}`);
  };

  const handleCreateTest = () => {
    navigate("/admin/placement-test/create");
  };

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && test.isActive) ||
      (statusFilter === "inactive" && !test.isActive);

    return matchesSearch && matchesStatus;
  });

  const activeTests = tests.filter((t) => t.isActive).length;
  const completedTests = 0; // TODO: Get from user data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative background elements */}
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-5">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-indigo-500/25"
                >
                  <BookOpen className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                      Kiểm Tra Đầu Vào
                    </h1>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </motion.div>
                  </div>
                  <p className="text-gray-600 text-lg max-w-xl">
                    Đánh giá chính xác trình độ tiếng Anh của bạn với các bài kiểm tra
                    được thiết kế theo chuẩn IELTS
                  </p>
                </div>
              </div>

              {canManage && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateTest}
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tạo bài kiểm tra mới
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatsCard
              icon={Target}
              label="Bài kiểm tra có sẵn"
              value={loading ? "..." : tests.length}
              color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              delay={0.1}
            />
            <StatsCard
              icon={CheckCircle2}
              label="Đang hoạt động"
              value={loading ? "..." : activeTests}
              color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              delay={0.2}
            />
            <StatsCard
              icon={Clock}
              label="Đã hoàn thành"
              value={completedTests}
              color="bg-gradient-to-br from-amber-500 to-orange-500"
              delay={0.3}
            />
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm bài kiểm tra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white shadow-sm transition-all duration-300 hover:border-gray-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "active" | "inactive")
                }
                className="pl-12 pr-10 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white shadow-sm min-w-[200px] cursor-pointer hover:border-gray-300 transition-all duration-300"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </motion.div>

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
                    <h3 className="font-semibold text-red-900">Có lỗi xảy ra</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={loadTests}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                  >
                    Thử lại
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State - Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          <AnimatePresence mode="wait">
            {!loading && !error && filteredTests.length === 0 && (
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
                  <Search className="w-14 h-14 text-indigo-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchQuery || statusFilter !== "all"
                    ? "Không tìm thấy bài kiểm tra nào"
                    : "Chưa có bài kiểm tra nào"}
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                  {searchQuery || statusFilter !== "all"
                    ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
                    : "Hãy tạo bài kiểm tra đầu tiên để bắt đầu"}
                </p>
                {canManage && !searchQuery && statusFilter === "all" && (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateTest}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25"
                  >
                    <Plus className="w-5 h-5" />
                    Tạo bài kiểm tra đầu tiên
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tests Grid */}
          {!loading && !error && filteredTests.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredTests.map((test) => (
                <motion.div
                  key={test._id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImprovedTestCard
                    test={test}
                    onTakeTest={handleTakeTest}
                    onEditTest={handleEditTest}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Results Info */}
          {!loading && filteredTests.length > 0 && (
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
                    {filteredTests.length}
                  </span>{" "}
                  / {tests.length} bài kiểm tra
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add shimmer animation keyframes via style tag */}
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