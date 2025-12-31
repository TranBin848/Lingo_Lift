import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  BookOpen, 
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Card } from '../ui/card';
import type { ProgressRecord } from '../../types/learningPathTypes';
import { getScoreTrendInsight } from '../../mocks/learningPathMock';

interface ProgressSummaryProps {
  progressRecords: ProgressRecord[];
}

export function ProgressSummary({ progressRecords }: ProgressSummaryProps) {
  // Get today's and recent stats
  const todayRecord = progressRecords.find(r => {
    const today = new Date();
    const recordDate = new Date(r.recordDate);
    return recordDate.toDateString() === today.toDateString();
  });
  
  // Last 7 days summary
  const last7Days = progressRecords.slice(-7);
  const weeklyStats = {
    essays: last7Days.reduce((sum, r) => sum + r.essaysWritten, 0),
    words: last7Days.reduce((sum, r) => sum + r.totalWordCount, 0),
    minutes: last7Days.reduce((sum, r) => sum + r.studyTimeMinutes, 0),
    lessons: last7Days.reduce((sum, r) => sum + r.lessonsCompleted, 0),
  };
  
  const trend = getScoreTrendInsight(progressRecords);

  const stats = [
    {
      icon: FileText,
      label: 'Bài viết hôm nay',
      value: todayRecord?.essaysWritten || 0,
      subValue: `${weeklyStats.essays} trong tuần`,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: BarChart3,
      label: 'Số từ viết hôm nay',
      value: todayRecord?.totalWordCount || 0,
      subValue: `${weeklyStats.words.toLocaleString()} trong tuần`,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: Clock,
      label: 'Thời gian học',
      value: `${todayRecord?.studyTimeMinutes || 0} phút`,
      subValue: `${Math.round(weeklyStats.minutes / 60)} giờ trong tuần`,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: BookOpen,
      label: 'Bài học hoàn thành',
      value: todayRecord?.lessonsCompleted || 0,
      subValue: `${weeklyStats.lessons} trong tuần`,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  // Simple chart data - last 7 days scores
  const chartData = last7Days.map(r => ({
    date: new Date(r.recordDate).toLocaleDateString('vi-VN', { weekday: 'short' }),
    score: r.averageBandScore
  }));

  const maxScore = Math.max(...chartData.map(d => d.score), 6);
  const minScore = Math.min(...chartData.map(d => d.score), 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className={`p-4 border-0 shadow-lg ${stat.bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.subValue}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Score Trend Chart */}
      <Card className="p-5 bg-white dark:bg-gray-800 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Xu hướng điểm số
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            7 ngày gần nhất
          </span>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          {chartData.map((data, index) => {
            const height = ((data.score - minScore + 0.5) / (maxScore - minScore + 0.5)) * 100;
            return (
              <motion.div
                key={index}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {data.score.toFixed(1)}
                </div>
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ height: `${height}%`, minHeight: '20px' }}
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {data.date}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trend Insight */}
        <div className={`p-3 rounded-lg ${
          trend.isPositive 
            ? 'bg-emerald-50 dark:bg-emerald-900/20' 
            : 'bg-amber-50 dark:bg-amber-900/20'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              trend.isPositive ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
            <span className={`text-sm font-medium ${
              trend.isPositive 
                ? 'text-emerald-700 dark:text-emerald-300' 
                : 'text-amber-700 dark:text-amber-300'
            }`}>
              {trend.text}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
