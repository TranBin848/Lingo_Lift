import { motion } from 'framer-motion';
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
  LessonFilters,
  LessonCategory,
  LessonDifficulty,
  LessonStatus
} from '../../types/lesson';
import {
  categoryLabels,
  difficultyLabels,
  statusLabels
} from '../../types/lesson';
import { useState, useRef, useEffect } from 'react';

interface LessonFilterBarProps {
  filters: LessonFilters;
  onFiltersChange: (filters: LessonFilters) => void;
  totalCount: number;
  filteredCount: number;
}

// Custom dropdown component
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
        <span>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-1 z-50 min-w-[180px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
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
              key={option.value}
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

export function LessonFilterBar({ 
  filters, 
  onFiltersChange,
  totalCount,
  filteredCount
}: LessonFilterBarProps) {
  const [showFilters, setShowFilters] = useState(true);

  const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
    value: value as LessonCategory,
    label
  }));

  const difficultyOptions = Object.entries(difficultyLabels).map(([value, label]) => ({
    value: value as LessonDifficulty,
    label
  }));

  const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
    value: value as LessonStatus,
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
    filters.category !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.bandLevel !== 'all' ||
    filters.status !== 'all' ||
    filters.search !== '';

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      difficulty: 'all',
      bandLevel: 'all',
      status: 'all',
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
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm bài học theo tiêu đề hoặc kỹ năng…"
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

          {/* Toggle filters button (mobile) */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden border-gray-200 dark:border-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Bộ lọc
            {hasActiveFilters && (
              <span className="ml-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                {[filters.category, filters.difficulty, filters.bandLevel, filters.status]
                  .filter(f => f !== 'all').length + (filters.search ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Lọc theo:</span>
            </div>

            <FilterDropdown
              label="Danh mục"
              value={filters.category}
              options={categoryOptions}
              onChange={(value) => onFiltersChange({ ...filters, category: value })}
            />

            <FilterDropdown
              label="Độ khó"
              value={filters.difficulty}
              options={difficultyOptions}
              onChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
            />

            <FilterDropdown<number>
              label="Band"
              value={filters.bandLevel}
              options={bandLevelOptions}
              onChange={(value) => onFiltersChange({ ...filters, bandLevel: value })}
            />

            <FilterDropdown
              label="Trạng thái"
              value={filters.status}
              options={statusOptions}
              onChange={(value) => onFiltersChange({ ...filters, status: value })}
            />

            {/* Clear filters button */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="w-4 h-4 mr-1" />
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}

            {/* Results count */}
            <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              Hiển thị <span className="font-medium text-gray-900 dark:text-white">{filteredCount}</span> / {totalCount} bài học
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
