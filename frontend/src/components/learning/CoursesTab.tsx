import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Clock, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { mockLearningPaths } from '../../mocks/learningPaths';
import { LearningPathOverview } from '../learning-path/LearningPathOverview';
import { PhaseCard } from '../learning-path/PhaseCard';
import { PhaseTimeline } from '../learning-path/PhaseTimeline';
import { useState } from 'react';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalPhases: number;
  completedPhases: number;
  status: string;
  onClick: () => void;
}

function CourseCard({
  title,
  description,
  progress,
  totalPhases,
  completedPhases,
  status,
  onClick,
}: CourseCardProps) {
  const statusColors = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Cancelled: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {status === 'Active' ? 'Đang học' : status === 'Completed' ? 'Hoàn thành' : 'Đã hủy'}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tiến độ</span>
          <span className="font-bold text-gray-900 dark:text-white">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pt-2">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {completedPhases}/{totalPhases} chặng
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function CoursesTab() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [view, setView] = useState<'timeline' | 'grid'>('timeline');

  const courses = mockLearningPaths.map((path) => ({
    id: path.id,
    title: `IELTS Writing: Band ${path.currentBandScore} → ${path.targetBandScore}`,
    description: `Lộ trình cá nhân hóa giúp bạn đạt mục tiêu Band ${path.targetBandScore}`,
    progress: path.progressPercentage,
    totalPhases: path.totalPhases,
    completedPhases: path.completedPhases,
    status: path.status,
    learningPath: path,
  }));

  if (selectedCourse !== null) {
    const course = courses.find((c) => c.id === selectedCourse);
    if (!course) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedCourse(null)}>
            ← Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
          </div>
        </div>

        {/* Learning Path Overview */}
        <LearningPathOverview learningPath={course.learningPath} />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Các chặng học</h2>
          <div className="flex gap-2">
            <Button
              variant={view === 'timeline' ? 'default' : 'outline'}
              onClick={() => setView('timeline')}
              size="sm"
            >
              Timeline
            </Button>
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              onClick={() => setView('grid')}
              size="sm"
            >
              Grid
            </Button>
          </div>
        </div>

        {/* Timeline View */}
        {view === 'timeline' && (
          <Card className="p-8">
            <PhaseTimeline
              phases={course.learningPath.phases}
              currentPhaseNumber={course.learningPath.currentPhaseNumber}
            />
          </Card>
        )}

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {course.learningPath.phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                isActive={phase.phaseNumber === course.learningPath.currentPhaseNumber}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Các khóa học của bạn
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Chọn khóa học để xem lộ trình chi tiết
        </p>
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Đang học ({courses.filter((c) => c.status === 'Active').length})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses
            .filter((c) => c.status === 'Active')
            .map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onClick={() => setSelectedCourse(course.id)}
              />
            ))}
        </div>
      </div>

      {/* Completed Courses */}
      {courses.filter((c) => c.status === 'Completed').length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Đã hoàn thành ({courses.filter((c) => c.status === 'Completed').length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses
              .filter((c) => c.status === 'Completed')
              .map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  onClick={() => setSelectedCourse(course.id)}
                />
              ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {courses.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Chưa có khóa học nào
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Hoàn thành bài kiểm tra đầu vào để nhận lộ trình học phù hợp
          </p>
          <Button>Làm bài kiểm tra</Button>
        </Card>
      )}
    </div>
  );
}
