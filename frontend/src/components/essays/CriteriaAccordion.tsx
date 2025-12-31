import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';
import type { CriterionFeedback } from '../../types/essay';

interface CriteriaAccordionProps {
  title: string;
  feedback: CriterionFeedback;
  delay?: number;
}

export function CriteriaAccordion({ title, feedback, delay = 0 }: CriteriaAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {feedback.score.toFixed(1)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-left">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-left">
              Band {feedback.score.toFixed(1)}
            </p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 space-y-6">
              {/* General Comments */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Nhận xét chung
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                  {feedback.comments}
                </p>
              </div>

              {/* Strengths */}
              {feedback.strengths.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Điểm mạnh
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {feedback.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {feedback.improvements.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Cần cải thiện
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {feedback.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-amber-500 mt-0.5">⚠</span>
                        <span>{improvement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
