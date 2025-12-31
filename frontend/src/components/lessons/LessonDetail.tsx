import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  BookOpen, 
  Target, 
  ChevronRight,
  CheckCircle2,
  Bookmark,
  Lightbulb,
  Quote,
  List,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { 
  LessonWithProgress,
  LessonSection,
  LessonStatus
} from '../../types/lesson';
import {
  categoryLabels,
  categoryColors,
  difficultyLabels,
  difficultyColors,
  focusAreaLabels
} from '../../types/lesson';
import { LessonStatusBadge, LessonProgressBar } from './LessonStatusBadge';
import { useState, useEffect } from 'react';

interface LessonDetailProps {
  lesson: LessonWithProgress;
  isOpen: boolean;
  onClose: () => void;
  onMarkComplete: (lessonId: string) => void;
  onContinueLater: (lessonId: string) => void;
}

// Content section renderer
function ContentSection({ 
  section, 
  index 
}: { 
  section: LessonSection; 
  index: number;
}) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: 'easeOut' as const
      }
    }
  };

  const renderContent = () => {
    switch (section.type) {
      case 'heading':
        return (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            {section.content}
          </h3>
        );

      case 'paragraph':
        return (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {section.content}
          </p>
        );

      case 'tip':
        return (
          <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-300 text-sm mb-1">Mẹo hay</p>
              <p className="text-amber-700 dark:text-amber-200 text-sm">{section.content}</p>
            </div>
          </div>
        );

      case 'example':
        return (
          <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl mb-4">
            <Quote className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1">Ví dụ</p>
              <p className="text-blue-700 dark:text-blue-200 text-sm italic">{section.content}</p>
            </div>
          </div>
        );

      case 'bulletList':
        return (
          <div className="mb-4">
            {section.content && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">{section.content}</p>
            )}
            <ul className="space-y-2">
              {section.items?.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        );

      case 'highlight':
        return (
          <div className="flex gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl mb-4">
            <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-purple-800 dark:text-purple-300 text-sm mb-1">Lưu ý quan trọng</p>
              <p className="text-purple-700 dark:text-purple-200 text-sm">{section.content}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible">
      {renderContent()}
    </motion.div>
  );
}

export function LessonDetail({ 
  lesson, 
  isOpen, 
  onClose,
  onMarkComplete,
  onContinueLater
}: LessonDetailProps) {
  const [timeSpent, setTimeSpent] = useState(lesson.progress?.timeSpentMinutes || 0);
  const [isScrolled, setIsScrolled] = useState(false);

  const status: LessonStatus = lesson.progress?.status || 'NotStarted';
  const categoryColor = categoryColors[lesson.category];
  const difficultyColor = difficultyColors[lesson.difficulty];

  // Track time spent (mock)
  useEffect(() => {
    if (!isOpen || status === 'Completed') return;
    
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isOpen, status]);

  // Handle scroll for sticky header effect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  const progressPercentage = Math.min(
    Math.round(timeSpent / lesson.estimatedDurationMinutes * 100),
    status === 'Completed' ? 100 : 95
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <motion.div 
              className={`
                sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-800
                transition-all duration-200
                ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-gray-900'}
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
                      <BookOpen className="w-3 h-3" />
                      {categoryLabels[lesson.category]}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor.bg} ${difficultyColor.text}`}>
                      {difficultyLabels[lesson.difficulty]}
                    </span>
                    <LessonStatusBadge status={status} size="sm" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {lesson.title}
                  </h2>
                </div>

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress bar */}
              {status !== 'NotStarted' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Tiến độ học</span>
                    <span className="font-medium text-blue-600">{progressPercentage}%</span>
                  </div>
                  <LessonProgressBar progress={progressPercentage} status={status} />
                </div>
              )}
            </motion.div>

            {/* Content */}
            <div 
              className="flex-1 overflow-y-auto px-6 py-6"
              onScroll={handleScroll}
            >
              {/* Overview card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-4 mb-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {lesson.estimatedDurationMinutes}
                      </p>
                      <p className="text-xs text-gray-500">phút</p>
                    </div>
                    <div className="text-center">
                      <Target className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {lesson.bandLevel}+
                      </p>
                      <p className="text-xs text-gray-500">Band phù hợp</p>
                    </div>
                    <div className="text-center col-span-2 sm:col-span-2">
                      <List className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {focusAreaLabels[lesson.focusArea]}
                      </p>
                      <p className="text-xs text-gray-500">Kỹ năng trọng tâm</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {lesson.description}
                </p>
              </motion.div>

              {/* Lesson content sections */}
              <div className="space-y-2">
                {lesson.contentData.sections.map((section, index) => (
                  <ContentSection 
                    key={section.id} 
                    section={section} 
                    index={index}
                  />
                ))}
              </div>

              {/* Time spent indicator */}
              {status !== 'NotStarted' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Thời gian đã học: <strong>{timeSpent} phút</strong></span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky bottom-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {status === 'Completed' ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-200 dark:border-gray-700"
                      onClick={onClose}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Đóng bài học
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white"
                      disabled
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Đã hoàn thành
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-200 dark:border-gray-700"
                      onClick={() => onContinueLater(lesson.id)}
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Tiếp tục học sau
                    </Button>
                    <Button
                      className={`flex-1 bg-gradient-to-r ${categoryColor.gradient} hover:opacity-90 text-white shadow-md`}
                      onClick={() => onMarkComplete(lesson.id)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Đánh dấu đã hoàn thành
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
