import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp,
  History,
  Calendar,
  Target,
  ArrowRight,
  Zap,
  AlertTriangle,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { Card } from '../ui/card';
import type { PathAdjustment, AdjustmentReason } from '../../types/learningPathTypes';
import { getAdjustmentReasonLabel } from '../../types/learningPathTypes';

interface PathAdjustmentHistoryProps {
  adjustments: PathAdjustment[];
}

function getReasonIcon(reason: AdjustmentReason) {
  switch (reason) {
    case 'FasterProgress':
      return Zap;
    case 'SlowerProgress':
      return RefreshCw;
    case 'WeakAreaIdentified':
      return AlertTriangle;
    case 'UserRequest':
      return Target;
    default:
      return TrendingUp;
  }
}

function getReasonColor(reason: AdjustmentReason) {
  switch (reason) {
    case 'FasterProgress':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-700 dark:text-emerald-300',
        icon: 'bg-emerald-500'
      };
    case 'SlowerProgress':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-300',
        icon: 'bg-amber-500'
      };
    case 'WeakAreaIdentified':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        icon: 'bg-red-500'
      };
    case 'UserRequest':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300',
        icon: 'bg-blue-500'
      };
    default:
      return {
        bg: 'bg-gray-100 dark:bg-gray-900/30',
        text: 'text-gray-700 dark:text-gray-300',
        icon: 'bg-gray-500'
      };
  }
}

export function PathAdjustmentHistory({ adjustments }: PathAdjustmentHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (adjustments.length === 0) {
    return null;
  }

  const sortedAdjustments = [...adjustments].sort(
    (a, b) => new Date(b.adjustmentDate).getTime() - new Date(a.adjustmentDate).getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden">
        {/* Header - Clickable to expand */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Lịch sử điều chỉnh lộ trình
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {adjustments.length} lần điều chỉnh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4">
                {sortedAdjustments.map((adjustment, index) => {
                  const colors = getReasonColor(adjustment.reason);
                  const Icon = getReasonIcon(adjustment.reason);
                  
                  return (
                    <motion.div
                      key={adjustment.adjustmentId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl ${colors.bg} border border-transparent`}
                    >
                      {/* Adjustment Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${colors.icon} flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className={`font-medium ${colors.text}`}>
                              {getAdjustmentReasonLabel(adjustment.reason)}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              {new Date(adjustment.adjustmentDate).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Changes Summary */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {adjustment.changesSummary}
                      </p>

                      {/* Before/After Comparison */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Target Band Change */}
                        {adjustment.previousTargetBand !== adjustment.newTargetBand && (
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <Target className="w-3 h-3 inline mr-1" />
                              Mục tiêu
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                {adjustment.previousTargetBand.toFixed(1)}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span className="font-bold text-gray-900 dark:text-white">
                                {adjustment.newTargetBand.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* End Date Change */}
                        {adjustment.previousEstimatedEndDate !== adjustment.newEstimatedEndDate && (
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Dự kiến hoàn thành
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-600 dark:text-gray-400 text-xs">
                                {new Date(adjustment.previousEstimatedEndDate).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span className="font-bold text-gray-900 dark:text-white text-xs">
                                {new Date(adjustment.newEstimatedEndDate).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
