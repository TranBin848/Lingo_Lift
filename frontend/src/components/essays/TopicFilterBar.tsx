import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type {
  Task1TopicFilters,
  Task2TopicFilters,
  Task1Type,
  ChartType,
  QuestionType,
  TopicDifficulty,
  TopicCategory
} from '../../types/essay';
import {
  task1TypeLabels,
  chartTypeLabels,
  questionTypeLabels,
  topicDifficultyLabels,
  topicCategoryLabels
} from '../../types/essay';

// Generic dropdown component
function FilterDropdown<T extends string | number>({
  label,
  value,
  options,
  onChange,
  allLabel = 'Tất cả'
}: {
  label: string;
  value: T | 'all';
  options: { value: T; label: string }[];
  onChange: (value: T | 'all') => void;
  allLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = value === 'all' 
    ? allLabel 
    : options.find(o => o.value === value)?.label || allLabel;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
          transition-all duration-200
          ${value !== 'all' 
            ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
          }
        `}
      >
        <span className="text-gray-500 dark:text-gray-400 text-xs">{label}:</span>
        <span className="truncate max-w-[100px]">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-1 z-50 min-w-[180px] max-h-[300px] overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
        >
          <button
            onClick={() => { onChange('all'); setIsOpen(false); }}
            className={`
              w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700
              ${value === 'all' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300'}
            `}
          >
            {allLabel}
          </button>
          {options.map(option => (
            <button
              key={String(option.value)}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`
                w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700
                ${value === option.value ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300'}
              `}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Task 1 Filter Bar
interface Task1FilterBarProps {
  filters: Task1TopicFilters;
  onFiltersChange: (filters: Task1TopicFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export function Task1FilterBar({ 
  filters, 
  onFiltersChange,
  totalCount,
  filteredCount
}: Task1FilterBarProps) {
  const [showFilters, setShowFilters] = useState(true);

  const taskTypeOptions = Object.entries(task1TypeLabels).map(([value, label]) => ({
    value: value as Task1Type,
    label
  }));

  const chartTypeOptions = Object.entries(chartTypeLabels).map(([value, label]) => ({
    value: value as ChartType,
    label
  }));

  const difficultyOptions = Object.entries(topicDifficultyLabels).map(([value, label]) => ({
    value: value as TopicDifficulty,
    label
  }));

  const categoryOptions = Object.entries(topicCategoryLabels).map(([value, label]) => ({
    value: value as TopicCategory,
    label
  }));

  const bandLevelOptions = [
    { value: 5.0, label: 'Band 5.0+' },
    { value: 5.5, label: 'Band 5.5+' },
    { value: 6.0, label: 'Band 6.0+' },
    { value: 6.5, label: 'Band 6.5+' },
    { value: 7.0, label: 'Band 7.0+' },
    { value: 7.5, label: 'Band 7.5+' },
  ];

  const hasActiveFilters = 
    filters.taskType !== 'all' ||
    filters.chartType !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.category !== 'all' ||
    filters.bandLevel !== 'all' ||
    filters.search !== '';

  const clearFilters = () => {
    onFiltersChange({
      taskType: 'all',
      chartType: 'all',
      difficulty: 'all',
      category: 'all',
      bandLevel: 'all',
      search: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40"
    >
      <Card className="p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-lg">
        {/* Search and toggle row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm đề theo từ khóa..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {filters.search && (
              <button
                onClick={() => onFiltersChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden border-gray-200 dark:border-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Lọc:</span>
            </div>

            <FilterDropdown
              label="Loại"
              value={filters.taskType}
              options={taskTypeOptions}
              onChange={(value) => onFiltersChange({ ...filters, taskType: value })}
            />

            <FilterDropdown
              label="Biểu đồ"
              value={filters.chartType}
              options={chartTypeOptions}
              onChange={(value) => onFiltersChange({ ...filters, chartType: value })}
            />

            <FilterDropdown
              label="Độ khó"
              value={filters.difficulty}
              options={difficultyOptions}
              onChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
            />

            <FilterDropdown
              label="Chủ đề"
              value={filters.category}
              options={categoryOptions}
              onChange={(value) => onFiltersChange({ ...filters, category: value })}
            />

            <FilterDropdown<number>
              label="Band"
              value={filters.bandLevel}
              options={bandLevelOptions}
              onChange={(value) => onFiltersChange({ ...filters, bandLevel: value })}
            />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 mr-1" />
                Xóa bộ lọc
              </Button>
            )}

            <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{filteredCount}</span> / {totalCount} đề
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

// Task 2 Filter Bar
interface Task2FilterBarProps {
  filters: Task2TopicFilters;
  onFiltersChange: (filters: Task2TopicFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export function Task2FilterBar({ 
  filters, 
  onFiltersChange,
  totalCount,
  filteredCount
}: Task2FilterBarProps) {
  const [showFilters, setShowFilters] = useState(true);

  const questionTypeOptions = Object.entries(questionTypeLabels).map(([value, label]) => ({
    value: value as QuestionType,
    label
  }));

  const difficultyOptions = Object.entries(topicDifficultyLabels).map(([value, label]) => ({
    value: value as TopicDifficulty,
    label
  }));

  const categoryOptions = Object.entries(topicCategoryLabels).map(([value, label]) => ({
    value: value as TopicCategory,
    label
  }));

  const bandLevelOptions = [
    { value: 5.0, label: 'Band 5.0+' },
    { value: 5.5, label: 'Band 5.5+' },
    { value: 6.0, label: 'Band 6.0+' },
    { value: 6.5, label: 'Band 6.5+' },
    { value: 7.0, label: 'Band 7.0+' },
    { value: 7.5, label: 'Band 7.5+' },
  ];

  const hasActiveFilters = 
    filters.questionType !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.category !== 'all' ||
    filters.bandLevel !== 'all' ||
    filters.search !== '';

  const clearFilters = () => {
    onFiltersChange({
      questionType: 'all',
      difficulty: 'all',
      category: 'all',
      bandLevel: 'all',
      search: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40"
    >
      <Card className="p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm đề theo từ khóa..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {filters.search && (
              <button
                onClick={() => onFiltersChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden border-gray-200 dark:border-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Lọc:</span>
            </div>

            <FilterDropdown
              label="Dạng đề"
              value={filters.questionType}
              options={questionTypeOptions}
              onChange={(value) => onFiltersChange({ ...filters, questionType: value })}
            />

            <FilterDropdown
              label="Độ khó"
              value={filters.difficulty}
              options={difficultyOptions}
              onChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
            />

            <FilterDropdown
              label="Chủ đề"
              value={filters.category}
              options={categoryOptions}
              onChange={(value) => onFiltersChange({ ...filters, category: value })}
            />

            <FilterDropdown<number>
              label="Band"
              value={filters.bandLevel}
              options={bandLevelOptions}
              onChange={(value) => onFiltersChange({ ...filters, bandLevel: value })}
            />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 mr-1" />
                Xóa bộ lọc
              </Button>
            )}

            <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{filteredCount}</span> / {totalCount} đề
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
