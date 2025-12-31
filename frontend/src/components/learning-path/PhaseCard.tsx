import { Card } from '../ui/card';
import type { Phase } from '../../types/learningPath';
import { Calendar, BookOpen, CheckCircle2, Clock, Target } from 'lucide-react';
import { format } from 'date-fns';

interface PhaseCardProps {
  phase: Phase;
  isActive: boolean;
}

const statusColors = {
  InProgress: 'bg-blue-500',
  Completed: 'bg-green-500',
  Pending: 'bg-gray-400',
};

const statusTextColors = {
  InProgress: 'text-blue-700 bg-blue-100',
  Completed: 'text-green-700 bg-green-100',
  Pending: 'text-gray-700 bg-gray-100',
};

const focusIcons: Record<string, string> = {
  CoherenceCohesion: '🔗',
  LexicalResource: '📚',
  TaskAchievement: '🎯',
  GrammaticalRangeAccuracy: '📝',
  AllAreas: '⭐',
};

export function PhaseCard({ phase, isActive }: PhaseCardProps) {
  const statusColor = statusColors[phase.status];
  const statusTextColor = statusTextColors[phase.status];

  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-lg ${
        isActive ? 'ring-2 ring-blue-500 shadow-xl' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            {phase.phaseNumber}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {phase.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {phase.description}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusTextColor}`}>
          {phase.status}
        </span>
      </div>

      {/* Focus Area */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <span className="text-2xl">{focusIcons[phase.primaryFocus] || '📖'}</span>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Primary Focus</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {phase.primaryFocus.replace(/([A-Z])/g, ' $1').trim()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {phase.durationWeeks} weeks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Target Band</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {phase.expectedBandScore}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>
          {format(new Date(phase.startDate), 'MMM dd')} -{' '}
          {format(new Date(phase.endDate), 'MMM dd, yyyy')}
        </span>
      </div>

      {/* Progress Bar */}
      {phase.status === 'InProgress' && phase.lessonProgressPercentage !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Lessons Progress
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {phase.completedLessons}/{phase.totalLessons}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`${statusColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${phase.lessonProgressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Topics Summary */}
      {(phase.totalTask1Topics || phase.totalTask2Topics) && (
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Task 1 Topics</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {phase.totalTask1Topics}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Task 2 Topics</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {phase.totalTask2Topics}
            </p>
          </div>
        </div>
      )}

      {/* Completed Badge */}
      {phase.status === 'Completed' && phase.actualBandScore && (
        <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-xs text-green-600 dark:text-green-400">Achieved Score</p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300">
              {phase.actualBandScore}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
