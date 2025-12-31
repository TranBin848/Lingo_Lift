import { motion } from 'framer-motion';
import { 
  Clock, 
  FileText, 
  Eye, 
  Edit3, 
  Trophy,
  TrendingUp,
  ChevronRight,
  Target,
  Award
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { EssayStatusBadge, VersionBadge } from './EssayStatusBadge';
import type { 
  Task1Essay, 
  Task2Essay, 
  Task1Topic, 
  Task2Topic
} from '../../types/essay';
import {
  chartTypeLabels,
  questionTypeLabels,
  topicCategoryLabels,
  getBandScoreGradient
} from '../../types/essay';

// Format time from seconds
function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} phút`;
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Task 1 Essay Item
interface Task1EssayItemProps {
  essay: Task1Essay;
  topic: Task1Topic;
  bandScore?: number;
  onView: (essay: Task1Essay) => void;
  onRewrite: (topic: Task1Topic) => void;
}

function Task1EssayItem({ essay, topic, bandScore, onView, onRewrite }: Task1EssayItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
    >
      <Card className="p-4 bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Essay Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {chartTypeLabels[topic.chartType]}
                  </h4>
                  <VersionBadge version={essay.version} />
                  <EssayStatusBadge status={essay.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {topic.prompt.slice(0, 100)}...
                </p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(essay.timeSpentSeconds)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {essay.wordCount} từ
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" />
                    {topicCategoryLabels[topic.category]}
                  </span>
                  <span className="text-gray-400">
                    {formatDate(essay.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Score if graded */}
          {essay.status === 'Graded' && (
            <div className={`flex-shrink-0 text-center px-4 py-2 bg-gradient-to-r ${bandScore ? getBandScoreGradient(bandScore) : 'from-green-500 to-emerald-600'} rounded-lg`}>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-white" />
                <span className="text-lg font-bold text-white">
                  {bandScore ? bandScore.toFixed(1) : '-'}
                </span>
              </div>
              <p className="text-xs text-white/80">Band</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(essay)}
              className="border-gray-200 dark:border-gray-700 text-gray-600 hover:text-blue-600"
            >
              <Eye className="w-4 h-4 mr-1" />
              Xem lại
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRewrite(topic)}
              className="border-gray-200 dark:border-gray-700 text-gray-600 hover:text-purple-600"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Viết lại
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Task 2 Essay Item
interface Task2EssayItemProps {
  essay: Task2Essay;
  topic: Task2Topic;
  bandScore?: number;
  onView: (essay: Task2Essay) => void;
  onRewrite: (topic: Task2Topic) => void;
}

function Task2EssayItem({ essay, topic, bandScore, onView, onRewrite }: Task2EssayItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
    >
      <Card className="p-4 bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Essay Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {questionTypeLabels[topic.questionType]}
                  </h4>
                  <VersionBadge version={essay.version} />
                  <EssayStatusBadge status={essay.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {topic.prompt.slice(0, 100)}...
                </p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(essay.timeSpentSeconds)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {essay.wordCount} từ
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" />
                    {topicCategoryLabels[topic.category]}
                  </span>
                  <span className="text-gray-400">
                    {formatDate(essay.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Score if graded */}
          {essay.status === 'Graded' && (
            <div className={`flex-shrink-0 text-center px-4 py-2 bg-gradient-to-r ${bandScore ? getBandScoreGradient(bandScore) : 'from-purple-500 to-pink-600'} rounded-lg`}>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-white" />
                <span className="text-lg font-bold text-white">
                  {bandScore ? bandScore.toFixed(1) : '-'}
                </span>
              </div>
              <p className="text-xs text-white/80">Band</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(essay)}
              className="border-gray-200 dark:border-gray-700 text-gray-600 hover:text-blue-600"
            >
              <Eye className="w-4 h-4 mr-1" />
              Xem lại
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRewrite(topic)}
              className="border-gray-200 dark:border-gray-700 text-gray-600 hover:text-purple-600"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Viết lại
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Task 1 Essay List Props
interface Task1EssayListProps {
  essays: Task1Essay[];
  topics: Task1Topic[];
  getBandScore?: (essayId: string) => number | undefined;
  onViewEssay: (essay: Task1Essay) => void;
  onRewriteTopic: (topic: Task1Topic) => void;
  emptyMessage?: string;
}

export function Task1EssayList({
  essays,
  topics,
  getBandScore,
  onViewEssay,
  onRewriteTopic,
  emptyMessage = 'Bạn chưa có bài viết nào'
}: Task1EssayListProps) {
  if (essays.length === 0) {
    return (
      <Card className="p-8 bg-white dark:bg-gray-800 border-0 shadow-md text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {essays.map((essay, index) => {
        const topic = topics.find(t => t.id === essay.topicId);
        if (!topic) return null;
        
        return (
          <motion.div
            key={essay.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Task1EssayItem
              essay={essay}
              topic={topic}
              bandScore={getBandScore?.(essay.id)}
              onView={onViewEssay}
              onRewrite={onRewriteTopic}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Task 2 Essay List Props
interface Task2EssayListProps {
  essays: Task2Essay[];
  topics: Task2Topic[];
  getBandScore?: (essayId: string) => number | undefined;
  onViewEssay: (essay: Task2Essay) => void;
  onRewriteTopic: (topic: Task2Topic) => void;
  emptyMessage?: string;
}

export function Task2EssayList({
  essays,
  topics,
  getBandScore,
  onViewEssay,
  onRewriteTopic,
  emptyMessage = 'Bạn chưa có bài viết nào'
}: Task2EssayListProps) {
  if (essays.length === 0) {
    return (
      <Card className="p-8 bg-white dark:bg-gray-800 border-0 shadow-md text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {essays.map((essay, index) => {
        const topic = topics.find(t => t.id === essay.topicId);
        if (!topic) return null;
        
        return (
          <motion.div
            key={essay.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Task2EssayItem
              essay={essay}
              topic={topic}
              bandScore={getBandScore?.(essay.id)}
              onView={onViewEssay}
              onRewrite={onRewriteTopic}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Stats summary component
interface EssayStatsProps {
  totalEssays: number;
  gradedEssays: number;
  averageBand: number;
  totalWords: number;
}

export function EssayStats({ totalEssays, gradedEssays, averageBand, totalWords }: EssayStatsProps) {
  const stats = [
    {
      label: 'Tổng bài viết',
      value: totalEssays,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      label: 'Đã chấm điểm',
      value: gradedEssays,
      icon: Trophy,
      color: 'text-green-500'
    },
    {
      label: 'Điểm trung bình',
      value: averageBand.toFixed(1),
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      label: 'Tổng số từ',
      value: totalWords.toLocaleString(),
      icon: FileText,
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 bg-white dark:bg-gray-800 border-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// View All Button
interface ViewAllButtonProps {
  onClick: () => void;
  label?: string;
}

export function ViewAllButton({ onClick, label = 'Xem tất cả' }: ViewAllButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    >
      {label}
      <ChevronRight className="w-4 h-4 ml-1" />
    </Button>
  );
}
