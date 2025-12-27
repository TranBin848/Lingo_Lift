import { Calendar, Clock, TrendingUp, Eye, Award, CheckCircle } from "lucide-react";

interface TestHistoryCardProps {
  test: {
    id: number;
    userId?: number;
    type: string;
    overallBandScore: number;
    completedAt: string | null;
    createdAt: string;
    status: 'InProgress' | 'Completed';
    task1Score?: number;
    task2Score?: number;
  };
  onViewDetails: (testId: number) => void;
}

export default function TestHistoryCard({ test, onViewDetails }: TestHistoryCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Chưa hoàn thành';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBandColor = (score: number) => {
    if (score >= 7) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 5.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusBadge = () => {
    if (test.status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
          <CheckCircle className="w-3 h-3" />
          Hoàn thành
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
        <Clock className="w-3 h-3" />
        Đang làm
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">
                {test.type === 'Placement' && 'Kiểm tra đầu vào'}
                {test.type === 'Progress' && 'Kiểm tra tiến độ'}
                {test.type === 'Final' && 'Kiểm tra cuối khóa'}
              </h3>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(test.createdAt)}</span>
            </div>
          </div>

          {test.status === 'Completed' && test.overallBandScore > 0 && (
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {test.overallBandScore.toFixed(1)}
              </div>
              <div className="text-xs text-blue-100">Band Score</div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {test.status === 'Completed' && test.task1Score && test.task2Score ? (
          <>
            {/* Scores Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`rounded-lg p-3 border-2 ${getBandColor(test.task1Score)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">Task 1</span>
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold">{test.task1Score.toFixed(1)}</div>
              </div>

              <div className={`rounded-lg p-3 border-2 ${getBandColor(test.task2Score)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">Task 2</span>
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold">{test.task2Score.toFixed(1)}</div>
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Đánh giá tổng thể</span>
                <span className="font-medium">
                  {test.overallBandScore >= 7 && 'Xuất sắc'}
                  {test.overallBandScore >= 5.5 && test.overallBandScore < 7 && 'Khá tốt'}
                  {test.overallBandScore >= 4 && test.overallBandScore < 5.5 && 'Trung bình'}
                  {test.overallBandScore < 4 && 'Cần cải thiện'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    test.overallBandScore >= 7 ? 'bg-green-500' :
                    test.overallBandScore >= 5.5 ? 'bg-blue-500' :
                    test.overallBandScore >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(test.overallBandScore / 9) * 100}%` }}
                />
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => onViewDetails(test.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Xem chi tiết</span>
              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-gray-600 mb-4">Bài kiểm tra chưa hoàn thành</p>
            <button
              onClick={() => onViewDetails(test.id)}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Tiếp tục làm bài
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
