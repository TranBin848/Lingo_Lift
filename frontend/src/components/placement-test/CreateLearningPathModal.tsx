import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Target, Sparkles, ArrowRight, Award } from 'lucide-react';
import { Button } from '../ui/button';

interface CreateLearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (targetBandScore: number, targetDate: string) => void;
  currentBandScore: number;
  isLoading?: boolean;
}

export function CreateLearningPathModal({
  isOpen,
  onClose,
  onSubmit,
  currentBandScore,
  isLoading = false
}: CreateLearningPathModalProps) {
  const [targetBandScore, setTargetBandScore] = useState<number>(
    Math.min(9, Math.ceil(currentBandScore) + 1)
  );
  const [targetDate, setTargetDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetDate && targetBandScore) {
      onSubmit(targetBandScore, targetDate);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (1 year from now)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const bandScoreOptions = [];
  for (let i = Math.ceil(currentBandScore) + 0.5; i <= 9; i += 0.5) {
    bandScoreOptions.push(i);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-5 bg-gradient-to-br from-blue-500 to-indigo-600">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Bắt đầu lộ trình học
                </h2>
                <p className="text-white/90 text-xs">
                  Thiết lập mục tiêu để AI tạo lộ trình phù hợp
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Current Score Info */}
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-blue-900 dark:text-blue-300">
                      Điểm hiện tại của bạn
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Band {currentBandScore.toFixed(1)}
                  </div>
                </div>

                {/* Target Band Score */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Target className="w-4 h-4" />
                    Mục tiêu Band Score
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bandScoreOptions.map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setTargetBandScore(score)}
                        className={`p-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                          targetBandScore === score
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-105'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Target Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4" />
                    Ngày mục tiêu
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={minDate}
                    max={maxDateStr}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    Chọn ngày bạn muốn đạt được mục tiêu
                  </p>
                </div>

                {/* Duration Estimate */}
                {targetDate && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                  >
                    <p className="text-sm text-purple-800 dark:text-purple-300">
                      <span className="font-semibold">Thời gian học:</span>{' '}
                      {Math.ceil(
                        (new Date(targetDate).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24 * 7)
                      )}{' '}
                      tuần
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!targetDate || isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang tạo...
                  </div>
                ) : (
                  <>
                    Bắt đầu ngay
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
