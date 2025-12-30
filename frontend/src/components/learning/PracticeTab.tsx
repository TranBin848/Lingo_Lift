import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ClipboardCheck, FileText, Target, Clock, Play } from 'lucide-react';

interface TestCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  testCount: number;
  color: string;
}

function TestCategoryCard({ icon, title, description, testCount, color }: TestCategoryProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {testCount} bài test
            </span>
            <Button size="sm">
              <Play className="w-4 h-4 mr-2" />
              Luyện tập
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PracticeTab() {
  const testCategories = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6 text-white" />,
      title: 'IELTS Writing Task 1',
      description: 'Luyện tập mô tả biểu đồ, bảng số liệu, quy trình',
      testCount: 50,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 2,
      icon: <FileText className="w-6 h-6 text-white" />,
      title: 'IELTS Writing Task 2',
      description: 'Luyện tập viết luận, phát triển ý tưởng',
      testCount: 60,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 3,
      icon: <Target className="w-6 h-6 text-white" />,
      title: 'Full Mock Tests',
      description: 'Bài test mô phỏng đầy đủ như kỳ thi thật',
      testCount: 20,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'Timed Practice',
      description: 'Luyện tập theo thời gian, tăng tốc độ viết',
      testCount: 30,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Test Practice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Luyện tập với các dạng bài test khác nhau
        </p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
            <ClipboardCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Tính năng đang phát triển
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Chúng tôi đang xây dựng hệ thống luyện tập test hoàn chỉnh. Vui lòng quay lại sau!
            </p>
          </div>
        </div>
      </Card>

      {/* Test Categories Preview */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Các dạng bài test
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testCategories.map((category) => (
            <TestCategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Statistics Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Thống kê luyện tập
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Bài đã làm</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">7.2</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Điểm trung bình</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">85%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Độ chính xác</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">24h</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Thời gian luyện</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
