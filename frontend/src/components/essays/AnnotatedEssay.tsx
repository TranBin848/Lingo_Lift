import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Filter,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  ChevronDown,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../ui/button";
import { AnnotationTooltip, MiniAnnotationTooltip } from "./AnnotationTooltip";
import type {
  Task1Annotation,
  Task2Annotation,
  AnnotationType,
  AnnotationCategory,
  AnnotationSeverity,
  AnnotationFilters,
} from "../../types/essay";
import {
  annotationTypeLabels,
  annotationCategoryLabels,
  annotationSeverityLabels,
  annotationTypeColors,
  annotationSeverityColors,
  annotationCategoryColors,
} from "../../types/essay";

// Types
type Annotation = Task1Annotation | Task2Annotation;

interface TextSegment {
  text: string;
  startIndex: number;
  endIndex: number;
  annotation?: Annotation;
}

interface AnnotatedEssayProps {
  content: string;
  annotations: Annotation[];
  showAnnotations?: boolean;
}

// Filter Dropdown Component
interface FilterDropdownProps {
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
    color?: { bg: string; text: string };
  }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  icon,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {icon}
        <span className="text-gray-600 dark:text-gray-400">{label}:</span>
        <span
          className={`font-medium ${
            selectedOption?.color?.text || "text-gray-900 dark:text-white"
          }`}
        >
          {selectedOption?.label || "Tất cả"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  value === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                {option.color && (
                  <span className={`w-2 h-2 rounded-full ${option.color.bg}`} />
                )}
                <span
                  className={
                    option.color?.text || "text-gray-700 dark:text-gray-300"
                  }
                >
                  {option.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Annotation Filter Bar
interface AnnotationFilterBarProps {
  filters: AnnotationFilters;
  onFiltersChange: (filters: AnnotationFilters) => void;
  annotationCount: number;
  filteredCount: number;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
}

function AnnotationFilterBar({
  filters,
  onFiltersChange,
  annotationCount,
  filteredCount,
  showAnnotations,
  onToggleAnnotations,
}: AnnotationFilterBarProps) {
  const typeOptions = [
    { value: "all", label: "Tất cả" },
    {
      value: "Error",
      label: annotationTypeLabels.Error,
      color: annotationTypeColors.Error,
    },
    {
      value: "Suggestion",
      label: annotationTypeLabels.Suggestion,
      color: annotationTypeColors.Suggestion,
    },
    {
      value: "Highlight",
      label: annotationTypeLabels.Highlight,
      color: annotationTypeColors.Highlight,
    },
  ];

  const categoryOptions = [
    { value: "all", label: "Tất cả" },
    {
      value: "Grammar",
      label: annotationCategoryLabels.Grammar,
      color: annotationCategoryColors.Grammar,
    },
    {
      value: "Vocabulary",
      label: annotationCategoryLabels.Vocabulary,
      color: annotationCategoryColors.Vocabulary,
    },
    {
      value: "Coherence",
      label: annotationCategoryLabels.Coherence,
      color: annotationCategoryColors.Coherence,
    },
    {
      value: "TaskResponse",
      label: annotationCategoryLabels.TaskResponse,
      color: annotationCategoryColors.TaskResponse,
    },
  ];

  const severityOptions = [
    { value: "all", label: "Tất cả" },
    {
      value: "Critical",
      label: annotationSeverityLabels.Critical,
      color: annotationSeverityColors.Critical,
    },
    {
      value: "Major",
      label: annotationSeverityLabels.Major,
      color: annotationSeverityColors.Major,
    },
    {
      value: "Minor",
      label: annotationSeverityLabels.Minor,
      color: annotationSeverityColors.Minor,
    },
  ];

  const hasFilters =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.severity !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lọc chú thích
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({filteredCount}/{annotationCount} hiển thị)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleAnnotations}
            className="gap-2"
          >
            {showAnnotations ? (
              <>
                <EyeOff className="w-4 h-4" />
                Ẩn chú thích
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Hiện chú thích
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3">
        <FilterDropdown
          label="Loại"
          value={filters.type}
          options={typeOptions}
          onChange={(value) =>
            onFiltersChange({
              ...filters,
              type: value as AnnotationType | "all",
            })
          }
          icon={<AlertCircle className="w-4 h-4 text-gray-400" />}
        />

        <FilterDropdown
          label="Danh mục"
          value={filters.category}
          options={categoryOptions}
          onChange={(value) =>
            onFiltersChange({
              ...filters,
              category: value as AnnotationCategory | "all",
            })
          }
        />

        <FilterDropdown
          label="Mức độ"
          value={filters.severity}
          options={severityOptions}
          onChange={(value) =>
            onFiltersChange({
              ...filters,
              severity: value as AnnotationSeverity | "all",
            })
          }
        />

        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() =>
              onFiltersChange({ type: "all", category: "all", severity: "all" })
            }
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-3 h-3" />
            Xóa bộ lọc
          </motion.button>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Chú thích:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-red-500 rounded" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Lỗi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-blue-500 rounded" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Gợi ý
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Điểm tốt
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Annotation Statistics
interface AnnotationStatsProps {
  annotations: Annotation[];
}

function AnnotationStats({ annotations }: AnnotationStatsProps) {
  const stats = useMemo(() => {
    const byType = annotations.reduce((acc, ann) => {
      acc[ann.type] = (acc[ann.type] || 0) + 1;
      return acc;
    }, {} as Record<AnnotationType, number>);

    const byCategory = annotations.reduce((acc, ann) => {
      acc[ann.category] = (acc[ann.category] || 0) + 1;
      return acc;
    }, {} as Record<AnnotationCategory, number>);

    const bySeverity = annotations.reduce((acc, ann) => {
      acc[ann.severity] = (acc[ann.severity] || 0) + 1;
      return acc;
    }, {} as Record<AnnotationSeverity, number>);

    return { byType, byCategory, bySeverity };
  }, [annotations]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-3 gap-4 mt-6"
    >
      {/* By Type */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theo loại
        </h4>
        <div className="space-y-2">
          {(["Error", "Suggestion", "Highlight"] as AnnotationType[]).map(
            (type) => {
              const count = stats.byType[type] || 0;
              const colors = annotationTypeColors[type];
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {type === "Error" && (
                      <AlertCircle className={`w-4 h-4 ${colors.text}`} />
                    )}
                    {type === "Suggestion" && (
                      <Lightbulb className={`w-4 h-4 ${colors.text}`} />
                    )}
                    {type === "Highlight" && (
                      <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {annotationTypeLabels[type]}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* By Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theo danh mục
        </h4>
        <div className="space-y-2">
          {(
            [
              "Grammar",
              "Vocabulary",
              "Coherence",
              "TaskResponse",
            ] as AnnotationCategory[]
          ).map((cat) => {
            const count = stats.byCategory[cat] || 0;
            const colors = annotationCategoryColors[cat];
            return (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {annotationCategoryLabels[cat]}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* By Severity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theo mức độ
        </h4>
        <div className="space-y-2">
          {(["Critical", "Major", "Minor"] as AnnotationSeverity[]).map(
            (sev) => {
              const count = stats.bySeverity[sev] || 0;
              const colors = annotationSeverityColors[sev];
              return (
                <div key={sev} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {annotationSeverityLabels[sev]}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                  >
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Main AnnotatedEssay Component
export function AnnotatedEssay({
  content,
  annotations,
  showAnnotations: initialShowAnnotations = true,
}: AnnotatedEssayProps) {
  const [filters, setFilters] = useState<AnnotationFilters>({
    type: "all",
    category: "all",
    severity: "all",
  });
  const [showAnnotations, setShowAnnotations] = useState(
    initialShowAnnotations
  );
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Filter annotations
  const filteredAnnotations = useMemo(() => {
    return annotations.filter((ann) => {
      if (filters.type !== "all" && ann.type !== filters.type) return false;
      if (filters.category !== "all" && ann.category !== filters.category)
        return false;
      if (filters.severity !== "all" && ann.severity !== filters.severity)
        return false;
      return true;
    });
  }, [annotations, filters]);

  // Create text segments with annotations
  const segments = useMemo((): TextSegment[] => {
    if (!showAnnotations || filteredAnnotations.length === 0) {
      return [{ text: content, startIndex: 0, endIndex: content.length }];
    }

    // Sort annotations by start index
    const sortedAnnotations = [...filteredAnnotations].sort(
      (a, b) => a.startIndex - b.startIndex
    );

    const result: TextSegment[] = [];
    let currentIndex = 0;

    for (const annotation of sortedAnnotations) {
      // Clamp indices to content bounds
      const start = Math.max(
        0,
        Math.min(annotation.startIndex, content.length)
      );
      const end = Math.max(
        start,
        Math.min(annotation.endIndex, content.length)
      );

      // Add non-annotated text before this annotation
      if (start > currentIndex) {
        result.push({
          text: content.slice(currentIndex, start),
          startIndex: currentIndex,
          endIndex: start,
        });
      }

      // Add annotated text
      if (end > start) {
        result.push({
          text: content.slice(start, end),
          startIndex: start,
          endIndex: end,
          annotation,
        });
      }

      currentIndex = end;
    }

    // Add remaining text
    if (currentIndex < content.length) {
      result.push({
        text: content.slice(currentIndex),
        startIndex: currentIndex,
        endIndex: content.length,
      });
    }

    return result;
  }, [content, filteredAnnotations, showAnnotations]);

  // Handle annotation click
  const handleAnnotationClick = useCallback(
    (annotation: Annotation, event: React.MouseEvent) => {
      event.stopPropagation();
      setTooltipPosition({ x: event.clientX, y: event.clientY });
      setSelectedAnnotation(annotation);
      setHoveredAnnotation(null);
    },
    []
  );

  // Handle annotation hover
  const handleAnnotationHover = useCallback(
    (annotation: Annotation | null, event?: React.MouseEvent) => {
      if (selectedAnnotation) return; // Don't show hover tooltip when main tooltip is open

      if (annotation && event) {
        setHoverPosition({ x: event.clientX, y: event.clientY });
      }
      setHoveredAnnotation(annotation);
    },
    [selectedAnnotation]
  );

  // Close tooltip on outside click
  useEffect(() => {
    function handleClickOutside() {
      setSelectedAnnotation(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Get styles for annotated text
  const getAnnotationStyles = (annotation: Annotation): string => {
    const colors = annotationTypeColors[annotation.type];

    switch (annotation.type) {
      case "Error":
        return `underline decoration-wavy decoration-2 ${colors.underline} cursor-pointer transition-all hover:bg-red-50 dark:hover:bg-red-900/20`;
      case "Suggestion":
        return `underline decoration-dashed decoration-2 ${colors.underline} cursor-pointer transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20`;
      case "Highlight":
        return `${colors.bg} rounded px-0.5 cursor-pointer transition-all ${colors.hoverBg}`;
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      {annotations.length > 0 && (
        <AnnotationFilterBar
          filters={filters}
          onFiltersChange={setFilters}
          annotationCount={annotations.length}
          filteredCount={filteredAnnotations.length}
          showAnnotations={showAnnotations}
          onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
        />
      )}

      {/* Essay Content */}
      <motion.div
        layout
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Bài viết của bạn
        </h3>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {segments.map((segment, index) => {
              if (segment.annotation) {
                return (
                  <motion.span
                    key={index}
                    className={getAnnotationStyles(segment.annotation)}
                    onClick={(e) =>
                      handleAnnotationClick(segment.annotation!, e)
                    }
                    onMouseEnter={(e) =>
                      handleAnnotationHover(segment.annotation!, e)
                    }
                    onMouseLeave={() => handleAnnotationHover(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1 }}
                  >
                    {segment.text}
                  </motion.span>
                );
              }
              return <span key={index}>{segment.text}</span>;
            })}
          </p>
        </div>
      </motion.div>

      {/* Annotation Statistics */}
      {annotations.length > 0 && showAnnotations && (
        <AnnotationStats annotations={filteredAnnotations} />
      )}

      {/* Tooltips */}
      <AnnotationTooltip
        annotation={selectedAnnotation!}
        position={tooltipPosition}
        onClose={() => setSelectedAnnotation(null)}
        isVisible={!!selectedAnnotation}
      />

      <MiniAnnotationTooltip
        message={hoveredAnnotation?.message || ""}
        type={hoveredAnnotation?.type || "Suggestion"}
        position={hoverPosition}
        isVisible={!!hoveredAnnotation && !selectedAnnotation}
      />
    </div>
  );
}

export default AnnotatedEssay;
