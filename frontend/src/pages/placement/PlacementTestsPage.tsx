import { useState, useEffect } from "react";
import { Plus, Search, Filter, AlertCircle, Loader2, BookOpen } from "lucide-react";
import { useAuthStore } from "../../stores/useAuth.Store";
import { useNavigate } from "react-router-dom";
import type { PlacementTest } from "../../services/placementTest.Service";
import ImprovedTestCard from "../../components/placement/ImprovedTestCard";
import { MOCK_PLACEMENT_TESTS } from "../../mocks/placementTests";

export default function PlacementTestsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [tests, setTests] = useState<PlacementTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const canManage = user?.role === 'admin' || user?.role === 'teacher';

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Uncomment when API is ready
      // const response = await placementTestService.getAllTests();
      // setTests(response.data);
      
      // Using mock data for now
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setTests(MOCK_PLACEMENT_TESTS as any);
    } catch (err) {
      console.error('Error loading tests:', err);
      setError('Không thể tải danh sách bài kiểm tra. Vui lòng thử lại.');
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
    navigate('/admin/placement-test/create');
  };

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && test.isActive) ||
                         (statusFilter === "inactive" && !test.isActive);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Đang tải danh sách bài kiểm tra...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Có lỗi xảy ra</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={loadTests}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced design */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Kiểm Tra Đầu Vào
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Đánh giá trình độ tiếng Anh của bạn với các bài kiểm tra chuyên nghiệp
                  </p>
                </div>
              </div>
            </div>
            {canManage && (
              <button
                onClick={handleCreateTest}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="w-5 h-5" />
                Tạo bài kiểm tra mới
              </button>
            )}
          </div>

          {/* Search and Filter with better design */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài kiểm tra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
                className="pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white shadow-sm min-w-[200px]"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all" 
                ? "Không tìm thấy bài kiểm tra nào" 
                : "Chưa có bài kiểm tra nào"
              }
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài kiểm tra phù hợp"
                : "Hãy tạo bài kiểm tra đầu tiên để bắt đầu hành trình học tiếng Anh"
              }
            </p>
            {canManage && !searchQuery && statusFilter === "all" && (
              <button
                onClick={handleCreateTest}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="w-5 h-5" />
                Tạo bài kiểm tra đầu tiên
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <ImprovedTestCard
                key={test._id}
                test={test}
                onTakeTest={handleTakeTest}
                onEditTest={handleEditTest}
              />
            ))}
          </div>
        )}

        {/* Results Info with better styling */}
        {filteredTests.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold text-blue-600">{filteredTests.length}</span> / {tests.length} bài kiểm tra
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}