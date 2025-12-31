import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface OverallFeedbackProps {
  overallComments: string;
  recommendations: string[];
  hasPreviousVersion?: boolean;
  onCompareVersions?: () => void;
}

export function OverallFeedback({
  overallComments,
  recommendations,
  hasPreviousVersion,
  onCompareVersions,
}: OverallFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Overall Comments Section */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Nhận xét tổng quan
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {overallComments}
        </p>
      </div>

      {/* Recommendations Section */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-500 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gợi ý cải thiện
          </h3>
        </div>
        
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <ArrowRight className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>{recommendation}</span>
            </motion.li>
          ))}
        </ul>

        {/* Version Comparison CTA */}
        {hasPreviousVersion && onCompareVersions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 pt-6 border-t border-amber-200 dark:border-amber-700"
          >
            <Button
              onClick={onCompareVersions}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              So sánh với phiên bản trước
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
