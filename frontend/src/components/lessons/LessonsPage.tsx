import { motion } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Sparkles,
  Target,
  Flame
} from 'lucide-react';
import { Card } from '../ui/card';
import { LessonCard } from './LessonCard';
import { LessonFilterBar } from './LessonFilterBar';
import { LessonDetail } from './LessonDetail';
import type { 
  LessonFilters, 
  LessonWithProgress, 
  LessonStatus 
} from '../../types/lesson';
import { 
  getLessonsWithProgress, 
  getLessonStats 
} from '../../mocks/lessons';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function LessonsPage() {
  // State
  const [filters, setFilters] = useState<LessonFilters>({
    category: 'all',
    difficulty: 'all',
    bandLevel: 'all',
    status: 'all',
    search: ''
  });
  const [selectedLesson, setSelectedLesson] = useState<LessonWithProgress | null>(null);
  const [lessonsData, setLessonsData] = useState<LessonWithProgress[]>(
    getLessonsWithProgress()
  );

  // Get stats
  const stats = useMemo(() => getLessonStats(), []);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessonsData.filter(lesson => {
      // Category filter
      if (filters.category !== 'all' && lesson.category !== filters.category) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty !== 'all' && lesson.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Band level filter
      if (filters.bandLevel !== 'all' && lesson.bandLevel < filters.bandLevel) {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all') {
        const lessonStatus: LessonStatus = lesson.progress?.status || 'NotStarted';
        if (lessonStatus !== filters.status) {
          return false;
        }
      }
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(searchLower);
        const matchesDescription = lesson.description.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }
      
      return true;
    });
  }, [lessonsData, filters]);

  // Handlers
  const handleSelectLesson = useCallback((lesson: LessonWithProgress) => {
    setSelectedLesson(lesson);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedLesson(null);
  }, []);

  const handleMarkComplete = useCallback((lessonId: string) => {
    setLessonsData(prev => prev.map(lesson => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          progress: {
            id: `progress-${lessonId}`,
            lessonId,
            userId: 'user-001',
            status: 'Completed' as LessonStatus,
            timeSpentMinutes: lesson.progress?.timeSpentMinutes || lesson.estimatedDurationMinutes,
            completedAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            createdAt: lesson.progress?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
      }
      return lesson;
    }));
    
    // Update selected lesson if it's the one being marked
    setSelectedLesson(prev => {
      if (prev?.id === lessonId) {
        return {
          ...prev,
          progress: {
            id: `progress-${lessonId}`,
            lessonId,
            userId: 'user-001',
            status: 'Completed' as LessonStatus,
            timeSpentMinutes: prev.progress?.timeSpentMinutes || prev.estimatedDurationMinutes,
            completedAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            createdAt: prev.progress?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
      }
      return prev;
    });
  }, []);

  const handleContinueLater = useCallback((lessonId: string) => {
    setLessonsData(prev => prev.map(lesson => {
      if (lesson.id === lessonId && (!lesson.progress || lesson.progress.status === 'NotStarted')) {
        return {
          ...lesson,
          progress: {
            id: `progress-${lessonId}`,
            lessonId,
            userId: 'user-001',
            status: 'InProgress' as LessonStatus,
            timeSpentMinutes: 5, // Mock some time spent
            completedAt: null,
            lastAccessedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
      }
      return lesson;
    }));
    setSelectedLesson(null);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section */}
      <motion.div
        variants={headerVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-6 h-6 text-emerald-200" />
              </motion.div>
              <span className="text-sm font-medium text-emerald-100">Bài học luyện tập</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl lg:text-4xl font-bold mb-3"
            >
              Học theo từng bài ngắn 📚
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-emerald-100 text-lg max-w-xl mb-6"
            >
              Tập trung đúng kỹ năng để cải thiện band IELTS. Mỗi bài học được thiết kế ngắn gọn, dễ hiểu và áp dụng ngay.
            </motion.p>

            {/* Info chips */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm">
                <BookOpen className="w-4 h-4" />
                <span>{stats.total} bài học</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm">
                <Target className="w-4 h-4" />
                <span>Band 5.0 - 7.5</span>
              </div>
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[200px]"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/20 rounded-full mb-3"
              >
                <Flame className="w-7 h-7 text-orange-300" />
              </motion.div>
              <p className="text-3xl font-bold">{stats.completed}</p>
              <p className="text-sm text-emerald-200">bài đã hoàn thành</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            icon: BookOpen, 
            label: 'Tổng bài học', 
            value: stats.total, 
            color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' 
          },
          { 
            icon: CheckCircle2, 
            label: 'Hoàn thành', 
            value: stats.completed, 
            color: 'text-green-600 bg-green-100 dark:bg-green-900/30' 
          },
          { 
            icon: TrendingUp, 
            label: 'Đang học', 
            value: stats.inProgress, 
            color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' 
          },
          { 
            icon: Clock, 
            label: 'Tổng thời gian', 
            value: `${Math.round(stats.totalTimeMinutes / 60)}h`, 
            color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' 
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Bar */}
      <LessonFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        totalCount={lessonsData.length}
        filteredCount={filteredLessons.length}
      />

      {/* Lessons Grid */}
      {filteredLessons.length > 0 ? (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {filteredLessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              onSelect={handleSelectLesson}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy bài học
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </motion.div>
      )}

      {/* Coming Soon Banner */}
      <motion.div variants={cardVariants}>
        <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 border-2 border-emerald-200 dark:border-emerald-800/50">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-700/20 rounded-full blur-2xl" />

          <div className="relative flex items-center gap-6">
            <motion.div
              className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                Thêm bài học mới mỗi tuần
                <span className="px-2 py-0.5 text-xs font-medium bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-full">
                  Cập nhật liên tục
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Đội ngũ giáo viên IELTS 8.0+ liên tục cập nhật bài học mới, giúp bạn học tập hiệu quả và đạt mục tiêu nhanh chóng.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Lesson Detail Panel */}
      {selectedLesson && (
        <LessonDetail
          lesson={selectedLesson}
          isOpen={!!selectedLesson}
          onClose={handleCloseDetail}
          onMarkComplete={handleMarkComplete}
          onContinueLater={handleContinueLater}
        />
      )}
    </motion.div>
  );
}
