import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  BookOpen, 
  Target,
  ArrowRight,
  Clock,
  Flame
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { TodayTask } from '../../types/learningPathTypes';

interface TodayFocusPanelProps {
  tasks: TodayTask[];
  currentPhaseName?: string;
  onStartTask: (task: TodayTask) => void;
}

export function TodayFocusPanel({ tasks, currentPhaseName, onStartTask }: TodayFocusPanelProps) {
  const highPriorityTasks = tasks.filter(t => t.priority === 'high');
  const otherTasks = tasks.filter(t => t.priority !== 'high');
  
  const totalMinutes = tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);

  const getTaskIcon = (type: TodayTask['type']) => {
    switch (type) {
      case 'essay': return FileText;
      case 'lesson': return BookOpen;
      case 'practice': return Target;
    }
  };

  const getTaskColor = (type: TodayTask['type']) => {
    switch (type) {
      case 'essay': return 'from-blue-500 to-indigo-600';
      case 'lesson': return 'from-emerald-500 to-teal-600';
      case 'practice': return 'from-purple-500 to-pink-600';
    }
  };

  const getTaskBadgeColor = (type: TodayTask['type']) => {
    switch (type) {
      case 'essay': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'lesson': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'practice': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
    }
  };

  const getTypeLabel = (type: TodayTask['type']) => {
    switch (type) {
      case 'essay': return 'Viết bài';
      case 'lesson': return 'Bài học';
      case 'practice': return 'Luyện tập';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-xl">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500 to-orange-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Hôm nay bạn nên làm gì?
                </h2>
                <p className="text-white/80 text-sm">
                  {currentPhaseName && `Dựa trên ${currentPhaseName}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white font-medium">~{totalMinutes} phút</span>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="p-5 space-y-4">
          {/* High Priority Tasks */}
          {highPriorityTasks.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ưu tiên cao</span>
              </div>
              {highPriorityTasks.map((task, index) => {
                const Icon = getTaskIcon(task.type);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTaskColor(task.type)} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {task.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTaskBadgeColor(task.type)}`}>
                            {getTypeLabel(task.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.estimatedMinutes} phút
                          </span>
                          {task.relatedPhase && (
                            <span>• {task.relatedPhase}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onStartTask(task)}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white shadow-md"
                    >
                      Bắt đầu
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Other Tasks */}
          {otherTasks.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Gợi ý thêm
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {otherTasks.map((task, index) => {
                  const Icon = getTaskIcon(task.type);
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + 0.1 * index }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer group"
                      onClick={() => onStartTask(task)}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTaskColor(task.type)} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{task.estimatedMinutes} phút</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
