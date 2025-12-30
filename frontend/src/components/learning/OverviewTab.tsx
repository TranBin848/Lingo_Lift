import { Card } from '../ui/card';
import { Clock, BookOpen, FileText, TrendingUp, Award, Calendar } from 'lucide-react';
import { mockLearningPaths } from '../../mocks/learningPaths';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
}

function StatCard({ icon, label, value, subtext, color }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtext && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function OverviewTab() {
  const learningPath = mockLearningPaths[0];
  
  // Mock data for statistics
  const stats = {
    totalStudyHours: 45,
    totalLessons: 28,
    completedLessons: 12,
    totalTests: 8,
    completedTests: 3,
    currentStreak: 7,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tổng quan học tập
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Theo dõi tiến trình và thành tích của bạn
        </p>
      </div>

      {/* Learning Profile */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Hồ sơ học tập
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Trình độ và mục tiêu của bạn
            </p>
          </div>
          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
            Band {learningPath?.currentBandScore || 'N/A'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
              <Award className="w-4 h-4" />
              <span className="text-sm">Trình độ hiện tại</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              Band {learningPath?.currentBandScore || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">IELTS Writing</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Mục tiêu</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Band {learningPath?.targetBandScore || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {learningPath?.daysRemaining} ngày còn lại
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Tiến độ</span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {learningPath?.progressPercentage || 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {learningPath?.completedPhases}/{learningPath?.totalPhases} chặng hoàn thành
            </p>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Clock className="w-6 h-6 text-white" />}
          label="Tổng thời lượng học"
          value={`${stats.totalStudyHours}h`}
          subtext="Tăng 5h so với tuần trước"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />

        <StatCard
          icon={<BookOpen className="w-6 h-6 text-white" />}
          label="Bài học"
          value={`${stats.completedLessons}/${stats.totalLessons}`}
          subtext={`${Math.round((stats.completedLessons / stats.totalLessons) * 100)}% hoàn thành`}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />

        <StatCard
          icon={<FileText className="w-6 h-6 text-white" />}
          label="Bài test"
          value={`${stats.completedTests}/${stats.totalTests}`}
          subtext={`${Math.round((stats.completedTests / stats.totalTests) * 100)}% hoàn thành`}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />

        <StatCard
          icon={<Award className="w-6 h-6 text-white" />}
          label="Chuỗi ngày học"
          value={`${stats.currentStreak} ngày`}
          subtext="Kỷ lục: 14 ngày"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />

        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          label="Điểm trung bình"
          value="7.2"
          subtext="Tăng 0.3 so với tháng trước"
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />

        <StatCard
          icon={<Calendar className="w-6 h-6 text-white" />}
          label="Thời gian còn lại"
          value={`${learningPath?.daysRemaining || 0} ngày`}
          subtext={`${learningPath?.estimatedDurationWeeks || 0} tuần`}
          color="bg-gradient-to-br from-pink-500 to-pink-600"
        />
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                Hoàn thành bài học: Linking Devices
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2 giờ trước</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                Hoàn thành Practice Test #3
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hôm qua</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                Đạt chuỗi học 7 ngày!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hôm nay</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
