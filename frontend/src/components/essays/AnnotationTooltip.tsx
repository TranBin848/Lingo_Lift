import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  X,
} from "lucide-react";
import type {
  Task1Annotation,
  Task2Annotation,
  AnnotationType,
} from "../../types/essay";
import {
  annotationTypeLabels,
  annotationCategoryLabels,
  annotationSeverityLabels,
  annotationTypeColors,
  annotationSeverityColors,
  annotationCategoryColors,
} from "../../types/essay";

// Type icon component
function TypeIcon({
  type,
  className = "",
}: {
  type: AnnotationType;
  className?: string;
}) {
  switch (type) {
    case "Error":
      return <AlertCircle className={className} />;
    case "Suggestion":
      return <Lightbulb className={className} />;
    case "Highlight":
      return <CheckCircle className={className} />;
    default:
      return null;
  }
}

// Annotation Tooltip Props
interface AnnotationTooltipProps {
  annotation: Task1Annotation | Task2Annotation;
  position: { x: number; y: number };
  onClose: () => void;
  isVisible: boolean;
}

export function AnnotationTooltip({
  annotation,
  position,
  onClose,
  isVisible,
}: AnnotationTooltipProps) {
  const typeColors = annotationTypeColors[annotation.type];
  const severityColors = annotationSeverityColors[annotation.severity];
  const categoryColors = annotationCategoryColors[annotation.category];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: `${Math.min(position.x, window.innerWidth - 360)}px`,
            top: `${position.y + 10}px`,
            zIndex: 100,
          }}
          className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-3 ${typeColors.bg} border-b ${typeColors.border}`}
          >
            <div className="flex items-center gap-2">
              <TypeIcon
                type={annotation.type}
                className={`w-5 h-5 ${typeColors.text}`}
              />
              <span className={`font-semibold ${typeColors.text}`}>
                {annotationTypeLabels[annotation.type]}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-full ${typeColors.hoverBg} transition-colors`}
            >
              <X className={`w-4 h-4 ${typeColors.text}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Message */}
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {annotation.message}
            </p>

            {/* Suggested Correction */}
            {annotation.suggestedCorrection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span className="font-medium">Gợi ý sửa:</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  {annotation.suggestedCorrection}
                </p>
              </motion.div>
            )}

            {/* Explanation */}
            {annotation.explanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-gray-200 dark:border-gray-700 pl-3"
              >
                {annotation.explanation}
              </motion.div>
            )}

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {/* Category badge */}
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors.bg} ${categoryColors.text}`}
              >
                {annotationCategoryLabels[annotation.category]}
              </span>

              {/* Severity badge */}
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityColors.bg} ${severityColors.text}`}
              >
                {annotationSeverityLabels[annotation.severity]}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mini Tooltip for hover preview
interface MiniTooltipProps {
  message: string;
  type: AnnotationType;
  position: { x: number; y: number };
  isVisible: boolean;
}

export function MiniAnnotationTooltip({
  message,
  type,
  position,
  isVisible,
}: MiniTooltipProps) {
  const typeColors = annotationTypeColors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            left: `${Math.min(position.x, window.innerWidth - 280)}px`,
            top: `${position.y + 8}px`,
            zIndex: 90,
          }}
          className={`max-w-[260px] px-3 py-2 rounded-lg shadow-lg ${typeColors.bg} ${typeColors.border} border`}
        >
          <div className="flex items-start gap-2">
            <TypeIcon
              type={type}
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${typeColors.text}`}
            />
            <p className={`text-xs ${typeColors.text} line-clamp-2`}>
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
