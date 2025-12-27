import { Clock, BookOpen, Play, Edit, ArrowRight, CheckCircle } from "lucide-react";
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
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Đang hoạt động
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
          Tạm dừng
        </span>
      );
    }
  };

  const getSectionIcons = (type: string) => {
    switch (type) {
      case 'pronunciation': return '🗣️';
      case 'grammar': return '📝';
      case 'vocabulary': return '📚';
      case 'listening': return '👂';
      case 'reading': return '📖';
      case 'writing': return '✍️';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">{test.title}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-blue-50 text-sm line-clamp-2">{test.description}</p>
          </div>
          <span className="text-xs font-medium text-blue-100 bg-blue-600/30 px-2 py-1 rounded-md">
            v{test.version}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="text-sm">
              <span className="font-semibold text-gray-900">{test.totalQuestions}</span> câu hỏi
            </span>
          </div>
          
          {test.totalTimeLimit && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm">
                <span className="font-semibold text-gray-900">{test.totalTimeLimit}</span> phút
              </span>
            </div>
          )}
        </div>

        {/* Sections */}
        {test.sections && test.sections.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Các kỹ năng
            </p>
            <div className="flex flex-wrap gap-2">
              {test.sections.map((section, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span>{getSectionIcons(section.type)}</span>
                  <span>{section.title}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onTakeTest(test._id)}
            disabled={!test.isActive}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all group"
          >
            <Play className="w-4 h-4" />
            <span>Làm bài test</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {canEdit && (
            <button
              onClick={() => onEditTest(test._id)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
