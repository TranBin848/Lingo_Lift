import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Target
} from 'lucide-react';
import type { 
  LessonWithProgress,
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
import { useState } from 'react';

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
  onSelect: (lesson: LessonWithProgress) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      delay: index * 0.08,
    },
  }),
};

export function LessonCard({ lesson, index, onSelect }: LessonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const status: LessonStatus = lesson.progress?.status || 'NotStarted';
  const categoryColor = categoryColors[lesson.category];
  const difficultyColor = difficultyColors[lesson.difficulty];
  
  // Calculate progress percentage for InProgress lessons
  const progressPercentage = status === 'InProgress' 
    ? Math.min(
        Math.round((lesson.progress?.timeSpentMinutes || 0) / lesson.estimatedDurationMinutes * 100),
        95
      )
    : status === 'Completed' ? 100 : 0;

  const getCtaButton = () => {
    switch (status) {
      case 'Completed':
        return {
          text: 'Xem lại bài học',
          icon: <RotateCcw className="w-4 h-4" />,
          variant: 'outline' as const
        };
      case 'InProgress':
        return {
          text: 'Tiếp tục',
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'default' as const
        };
      default:
        return {
          text: 'Bắt đầu học',
          icon: <Play className="w-4 h-4" />,
          variant: 'default' as const
        };
    }
  };

  const cta = getCtaButton();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card 
          className={`
            relative overflow-hidden bg-white/90 dark:bg-gray-800/90 
            backdrop-blur-sm border-0 shadow-lg hover:shadow-xl 
            transition-all duration-300 cursor-pointer group
            ${status === 'Completed' ? 'ring-2 ring-green-200 dark:ring-green-800/50' : ''}
          `}
          onClick={() => onSelect(lesson)}
        >
          {/* Top gradient accent */}
          <div 
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColor.gradient}`}
          />

          {/* Hover glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${categoryColor.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 0.03 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative p-5">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Category badge */}
              <span 
                className={`
                  inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                  ${categoryColor.bg} ${categoryColor.text}
                `}
              >
                <BookOpen className="w-3 h-3" />
                {categoryLabels[lesson.category]}
              </span>
              
              {/* Difficulty badge */}
              <span 
                className={`
                  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${difficultyColor.bg} ${difficultyColor.text}
                `}
              >
                {difficultyLabels[lesson.difficulty]}
              </span>

              {/* Status badge - only show if not NotStarted */}
              {status !== 'NotStarted' && (
                <div className="ml-auto">
                  <LessonStatusBadge status={status} size="sm" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {lesson.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {lesson.description}
            </p>

            {/* Focus Area & Band Level */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                <Target className="w-3.5 h-3.5" />
                <span>{focusAreaLabels[lesson.focusArea]}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">
                Phù hợp band: {lesson.bandLevel}+
              </div>
            </div>

            {/* Progress bar for InProgress */}
            {status === 'InProgress' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Tiến độ học</span>
                  <span className="font-medium text-blue-600">{progressPercentage}%</span>
                </div>
                <LessonProgressBar progress={progressPercentage} status={status} />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              {/* Duration */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimatedDurationMinutes} phút</span>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0.8, x: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="sm" 
                  variant={cta.variant}
                  className={`
                    ${cta.variant === 'default' 
                      ? `bg-gradient-to-r ${categoryColor.gradient} hover:opacity-90 text-white shadow-md`
                      : 'border-gray-200 dark:border-gray-600'
                    }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(lesson);
                  }}
                >
                  {cta.icon}
                  <span className="ml-1.5">{cta.text}</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Compact card variant for sidebar or list view
export function LessonCardCompact({ 
  lesson, 
  onSelect 
}: { 
  lesson: LessonWithProgress; 
  onSelect: (lesson: LessonWithProgress) => void;
}) {
  const status: LessonStatus = lesson.progress?.status || 'NotStarted';
  const categoryColor = categoryColors[lesson.category];

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
      onClick={() => onSelect(lesson)}
    >
      <div 
        className={`
          w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
          ${categoryColor.bg}
        `}
      >
        <BookOpen className={`w-5 h-5 ${categoryColor.text}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 transition-colors">
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500">{lesson.estimatedDurationMinutes} phút</span>
          {status !== 'NotStarted' && (
            <LessonStatusBadge status={status} size="sm" showLabel={false} />
          )}
        </div>
      </div>
      
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
    </motion.div>
  );
}
