import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, Filter, TrendingUp, Award, Calendar, AlertCircle } from "lucide-react";
import TestHistoryCard from "../components/placement/TestHistoryCard";
import type { StartTestResponse } from "../api/placementTest";
import { apiClient } from "../api/client";

type FilterType = 'all' | 'Placement' | 'Progress' | 'Final' | 'completed' | 'inProgress';

interface TestHistory {
  id: number;
  userId: number;
  type: string;
  overallBandScore: number;
  completedAt: string | null;
  createdAt: string;
  status: 'InProgress' | 'Completed';
  task1Score?: number;
  task2Score?: number;
}

export default function PlacementTestHistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'score'>('newest');
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch test history from API
  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Call API to get all placement tests for the current user
        const response = await apiClient.get<unknown, StartTestResponse[]>('/placement-tests');
        
        // Transform API response to TestHistory format
        const transformedData: TestHistory[] = response.map(test => ({
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
        console.error('Failed to fetch test history:', err);
        setError('Không thể tải lịch sử kiểm tra. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestHistory();
  }, []);

  // Filter tests
  const filteredTests = testHistory.filter(test => {
    if (filter === 'all') return true;
    if (filter === 'completed') return test.status === 'Completed';
    if (filter === 'inProgress') return test.status === 'InProgress';
    return test.type === filter;
  });

  // Sort tests
  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'score') {
      return b.overallBandScore - a.overallBandScore;
    }
    return 0;
  });

  // Calculate statistics
  const completedTests = testHistory.filter(t => t.status === 'Completed');
  const averageScore = completedTests.length > 0
    ? completedTests.reduce((sum, t) => sum + t.overallBandScore, 0) / completedTests.length
    : 0;
  const highestScore = completedTests.length > 0
    ? Math.max(...completedTests.map(t => t.overallBandScore))
    : 0;

  const handleViewDetails = (testId: number) => {
    // TODO: Navigate to test detail page or results page
    navigate(`/placement-test-result/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <History className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lịch Sử Kiểm Tra
              </h1>
              <p className="text-gray-600 mt-1">
                Xem lại các bài kiểm tra đã làm và theo dõi tiến độ của bạn
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Tổng số bài test</span>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : testHistory.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {completedTests.length} hoàn thành
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Điểm trung bình</span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {averageScore > 0 ? averageScore.toFixed(1) : '--'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Band Score
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Điểm cao nhất</span>
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {highestScore > 0 ? highestScore.toFixed(1) : '--'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Band Score
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter by type */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Lọc theo loại
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Tất cả' },
                  { value: 'Placement', label: 'Đầu vào' },
                  { value: 'Progress', label: 'Tiến độ' },
                  { value: 'Final', label: 'Cuối khóa' },
                  { value: 'completed', label: 'Hoàn thành' },
                  { value: 'inProgress', label: 'Đang làm' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value as FilterType)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      filter === value
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sắp xếp
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'score')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="score">Điểm cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Test History Grid */}
        {!isLoading && !error && sortedTests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Không tìm thấy bài kiểm tra nào
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Bạn chưa làm bài kiểm tra nào. Hãy bắt đầu với bài kiểm tra đầu vào!'
                : 'Thử thay đổi bộ lọc để xem các bài kiểm tra khác'
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/placement-tests')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              >
                Làm bài kiểm tra đầu vào
              </button>
            )}
          </div>
        ) : !isLoading && !error ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTests.map((test) => (
                <TestHistoryCard
                  key={test.id}
                  test={test}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Results Info */}
            <div className="mt-8 text-center">
              <div className="inline-block px-6 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">
                  Hiển thị <span className="font-semibold text-blue-600">{sortedTests.length}</span> / {testHistory.length} bài kiểm tra
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
