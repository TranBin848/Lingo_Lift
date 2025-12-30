import { Card } from '../ui/card';
import type { LearningPath } from '../../types/learningPath';
import { Calendar, Target, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface LearningPathOverviewProps {
  learningPath: LearningPath;
}

export function LearningPathOverview({ learningPath }: LearningPathOverviewProps) {
  const progressColor = learningPath.isOnTrack ? 'bg-green-500' : 'bg-amber-500';
  const statusColor = learningPath.status === 'Active' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Learning Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            From Band {learningPath.currentBandScore} to {learningPath.targetBandScore}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor}`}>
          {learningPath.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm">Target Score</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {learningPath.targetBandScore}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Target Date</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {format(new Date(learningPath.targetDate), 'MMM dd, yyyy')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Days Remaining</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {learningPath.daysRemaining}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Phases Complete</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {learningPath.completedPhases}/{learningPath.totalPhases}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Overall Progress
            </span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {learningPath.progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`${progressColor} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${learningPath.progressPercentage}%` }}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${progressColor}`} />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {learningPath.isOnTrack ? 'On Track' : 'Needs Attention'}
          </span>
        </div>
      </div>
    </Card>
  );
}
