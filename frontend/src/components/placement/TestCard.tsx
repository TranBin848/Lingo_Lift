import { Clock, BookOpen, Play, Edit } from "lucide-react";
import type { PlacementTest } from "../../services/placementTest.Service";
import { useAuthStore } from "../../stores/useAuth.Store";

interface TestCardProps {
  test: PlacementTest;
  onTakeTest: (testId: string) => void;
  onEditTest: (testId: string) => void;
}

export default function TestCard({ test, onTakeTest, onEditTest }: TestCardProps) {
  const { user } = useAuthStore();
  const canEdit = user?.role === 'admin' || user?.role === 'teacher';

  const getStatusBadge = () => {
    if (test.isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
          Đang hoạt động
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></div>
          Tạm dừng
        </span>
      );
    }
  };

  const getSectionIcons = (type: string) => {
    switch (type) {
      case 'pronunciation':
        return '🗣️';
      case 'grammar':
        return '📝';
      case 'vocabulary':
        return '📚';
      case 'listening':
        return '👂';
      case 'reading':
        return '📖';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{test.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{test.description}</p>
          </div>
          <div className="ml-4">
            {getStatusBadge()}
          </div>
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{test.totalQuestions} câu hỏi</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{test.totalTimeLimit ? `${test.totalTimeLimit} phút` : 'Không giới hạn'}</span>
          </div>
        </div>

        {/* Sections */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Các phần thi:</p>
          <div className="flex flex-wrap gap-2">
            {test.sections.map((section, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                <span className="mr-1">{getSectionIcons(section.type)}</span>
                {section.title} ({section.questions.length})
              </div>
            ))}
          </div>
        </div>

        {/* Version & Created by */}
        <div className="text-xs text-gray-500 mb-4">
          <div className="flex items-center justify-between">
            <span>Phiên bản: {test.version}</span>
            <span>Tạo bởi: {test.createdBy.displayName}</span>
          </div>
          <div className="mt-1">
            Cập nhật: {new Date(test.updatedAt).toLocaleDateString('vi-VN')}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center gap-3">
          {/* Take Test Button */}
          <button
            onClick={() => onTakeTest(test._id)}
            disabled={!test.isActive}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              test.isActive
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4" />
            {test.isActive ? 'Làm bài ngay' : 'Không khả dụng'}
          </button>

          {/* Edit Button (for admin/teacher) */}
          {canEdit && (
            <button
              onClick={() => onEditTest(test._id)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </button>
          )}
        </div>

        {/* Band Scores Preview */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-600 mb-2">Thang điểm:</p>
          <div className="flex flex-wrap gap-1">
            {test.scoringCriteria.bandScores.slice(0, 4).map((band) => (
              <div
                key={band.band}
                className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded font-medium"
              >
                Band {band.band}
              </div>
            ))}
            {test.scoringCriteria.bandScores.length > 4 && (
              <div className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">
                +{test.scoringCriteria.bandScores.length - 4} bands
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}