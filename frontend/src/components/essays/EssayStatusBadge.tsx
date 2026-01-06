import { motion } from 'framer-motion';
import { FileText, Send, CheckCircle2 } from 'lucide-react';
import type { EssayStatus } from '../../types/essay';
import { essayStatusLabels, essayStatusColors } from '../../types/essay';

interface EssayStatusBadgeProps {
  status: EssayStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function EssayStatusBadge({ 
  status, 
  size = 'md',
  showIcon = true 
}: EssayStatusBadgeProps) {
  const colors = essayStatusColors[status] || essayStatusColors['Draft']; // Fallback to Draft
  
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
      case 'Graded':
        return <CheckCircle2 className={`${iconSizes[size]} text-green-500`} />;
      case 'Submitted':
        return <Send className={`${iconSizes[size]} text-blue-500`} />;
      default:
        return <FileText className={`${iconSizes[size]} text-gray-400`} />;
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
      {showIcon && getIcon()}
      <span>{essayStatusLabels[status]}</span>
    </motion.div>
  );
}

// Animated status for grading
export function GradingStatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
      />
      <div>
        <p className="font-medium text-blue-800 dark:text-blue-300">
          AI đang chấm bài của bạn...
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Kết quả sẽ sẵn sàng trong vài phút
        </p>
      </div>
    </motion.div>
  );
}

// Version badge
export function VersionBadge({ version }: { version: number }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
      v{version}
    </span>
  );
}
