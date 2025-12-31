import { motion } from 'framer-motion';

interface WritingTimerProps {
  seconds: number;
  isRunning?: boolean;
  className?: string;
}

export function WritingTimer({ seconds, isRunning = true, className = '' }: WritingTimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
        isRunning 
          ? 'bg-emerald-50 dark:bg-emerald-900/30' 
          : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        {isRunning && (
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <span className={`font-mono text-sm font-semibold ${
          isRunning 
            ? 'text-emerald-700 dark:text-emerald-400' 
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {formatTime()}
        </span>
      </div>
    </motion.div>
  );
}

interface WordCounterProps {
  count: number;
  target: number;
  className?: string;
}

export function WordCounter({ count, target, className = '' }: WordCounterProps) {
  const percentage = Math.min((count / target) * 100, 100);
  const isComplete = count >= target;

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${
          isComplete 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {count} / {target} từ
        </span>
        {isComplete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-emerald-500"
          >
            ✓
          </motion.span>
        )}
      </div>
      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isComplete 
              ? 'bg-emerald-500' 
              : 'bg-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

interface TaskStatusIndicatorProps {
  taskNumber: 1 | 2;
  status: 'active' | 'completed' | 'pending';
}

export function TaskStatusIndicator({ taskNumber, status }: TaskStatusIndicatorProps) {
  const statusConfig = {
    active: {
      bg: 'bg-blue-100 dark:bg-blue-900/40',
      text: 'text-blue-700 dark:text-blue-300',
      dot: 'bg-blue-500',
      label: `Đang làm Task ${taskNumber}`
    },
    completed: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/40',
      text: 'text-emerald-700 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      label: `Task ${taskNumber} hoàn thành`
    },
    pending: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-500 dark:text-gray-400',
      dot: 'bg-gray-400',
      label: `Task ${taskNumber} chưa làm`
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}
    >
      {status === 'active' && (
        <motion.div
          className={`w-2 h-2 rounded-full ${config.dot}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {status === 'completed' && (
        <span className="text-emerald-500 text-xs">✓</span>
      )}
      <span className={`text-xs font-medium ${config.text}`}>
        {config.label}
      </span>
    </motion.div>
  );
}
