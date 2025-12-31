import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import type { LessonStatus } from '../../types/lesson';
import { statusLabels, statusColors } from '../../types/lesson';

interface LessonStatusBadgeProps {
  status: LessonStatus;
  progress?: number; // 0-100 for InProgress
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function LessonStatusBadge({ 
  status, 
  progress = 0,
  size = 'md',
  showLabel = true 
}: LessonStatusBadgeProps) {
  const colors = statusColors[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getIcon = () => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className={`${iconSizes[size]} ${colors.icon}`} />;
      case 'InProgress':
        return <Clock className={`${iconSizes[size]} ${colors.icon}`} />;
      default:
        return <Circle className={`${iconSizes[size]} ${colors.icon}`} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${sizeClasses[size]} ${colors.bg} ${colors.text}
      `}
    >
      {getIcon()}
      {showLabel && <span>{statusLabels[status]}</span>}
      
      {/* Progress indicator for InProgress status */}
      {status === 'InProgress' && progress > 0 && (
        <span className="ml-1 text-xs opacity-75">
          {progress}%
        </span>
      )}
    </motion.div>
  );
}

// Compact version for card use
export function LessonStatusIndicator({ 
  status,
  timeSpent 
}: { 
  status: LessonStatus;
  timeSpent?: number;
}) {
  const colors = statusColors[status];

  if (status === 'NotStarted') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-center gap-2 text-sm
        ${colors.text}
      `}
    >
      {status === 'Completed' && (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-medium">Hoàn thành</span>
          {timeSpent && (
            <span className="text-gray-500 text-xs">• {timeSpent} phút</span>
          )}
        </>
      )}
      {status === 'InProgress' && (
        <>
          <Clock className="w-4 h-4" />
          <span className="font-medium">Đang học</span>
          {timeSpent && (
            <span className="text-gray-500 text-xs">• {timeSpent} phút</span>
          )}
        </>
      )}
    </motion.div>
  );
}

// Progress bar component for lessons
export function LessonProgressBar({ 
  progress, 
  status 
}: { 
  progress: number; 
  status: LessonStatus;
}) {
  const getGradient = () => {
    switch (status) {
      case 'Completed':
        return 'from-green-500 to-emerald-500';
      case 'InProgress':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-gray-300 to-gray-400';
    }
  };

  return (
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${getGradient()} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}
