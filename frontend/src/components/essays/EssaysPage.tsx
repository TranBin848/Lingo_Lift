import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  PenTool, 
  FileText, 
  BarChart3,
  MessageSquare,
  Sparkles,
  BookOpen,
  History
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Task1TopicCard, Task2TopicCard } from './TopicCard';
import { Task1FilterBar, Task2FilterBar } from './TopicFilterBar';
import { Task1EssayEditor, Task2EssayEditor } from './EssayEditor';
import { Task1EssayList, Task2EssayList, EssayStats } from './EssayHistoryList';
import { Task1EssayViewer, Task2EssayViewer } from './EssayViewer';
import type { 
  Task1Topic, 
  Task2Topic,
  Task1Essay,
  Task2Essay,
  Task1TopicFilters,
  Task2TopicFilters,
  Task1EssayWithTopic,
  Task2EssayWithTopic
} from '../../types/essay';
import { 
  getTask1TopicsPublished, 
  getTask2TopicsPublished,
  getTask1EssaysWithTopics,
  getTask2EssaysWithTopics,
  getEssayStats,
  getTask1Feedback,
  getTask2Feedback
} from '../../mocks/essays';

type TaskTab = 'task1' | 'task2';
type ViewMode = 'topics' | 'writing' | 'history';

// Tab button component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function TabButton({ active, onClick, children, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors rounded-lg ${
        active 
          ? 'text-white z-10' 
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeEssayTab"
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg"
          transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

// Hero section
function EssaysHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 lg:p-8 mb-8"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]" />
      
      {/* Floating icons */}
      <motion.div
        className="absolute top-4 right-4 text-white/20"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <PenTool className="w-20 h-20" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 right-20 text-white/10"
        animate={{ rotate: [0, -15, 15, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      >
        <FileText className="w-16 h-16" />
      </motion.div>

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Grading</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
          IELTS Writing Practice
        </h1>
        <p className="text-white/80 leading-relaxed">
          Luyện tập viết IELTS Task 1 & Task 2 với đa dạng đề bài thực tế. 
          AI sẽ chấm điểm chi tiết theo 4 tiêu chí và đưa ra gợi ý cải thiện.
        </p>
      </div>
    </motion.div>
  );
}

// Main Essays Page
export function EssaysPage() {
  // States
  const [activeTab, setActiveTab] = useState<TaskTab>('task1');
  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  
  // Selected topic for writing
  const [selectedTask1Topic, setSelectedTask1Topic] = useState<Task1Topic | null>(null);
  const [selectedTask2Topic, setSelectedTask2Topic] = useState<Task2Topic | null>(null);
  
  // Selected essay for viewing
  const [viewingTask1Essay, setViewingTask1Essay] = useState<Task1EssayWithTopic | null>(null);
  const [viewingTask2Essay, setViewingTask2Essay] = useState<Task2EssayWithTopic | null>(null);

  // Filter states
  const [task1Filters, setTask1Filters] = useState<Task1TopicFilters>({
    taskType: 'all',
    difficulty: 'all',
    category: 'all',
    bandLevel: 'all',
    chartType: 'all',
    search: ''
  });
  const [task2Filters, setTask2Filters] = useState<Task2TopicFilters>({
    questionType: 'all',
    difficulty: 'all',
    category: 'all',
    bandLevel: 'all',
    search: ''
  });

  // Get data
  const task1Topics = getTask1TopicsPublished();
  const task2Topics = getTask2TopicsPublished();
  const task1Essays = getTask1EssaysWithTopics();
  const task2Essays = getTask2EssaysWithTopics();
  const stats = getEssayStats();

  // Filter Task 1 topics
  const filteredTask1Topics = useMemo(() => {
    return task1Topics.filter(topic => {
      // Search
      if (task1Filters.search) {
        const searchLower = task1Filters.search.toLowerCase();
        if (!topic.prompt.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      // Chart type
      if (task1Filters.chartType !== 'all' && topic.chartType !== task1Filters.chartType) {
        return false;
      }
      // Difficulty
      if (task1Filters.difficulty !== 'all' && topic.difficulty !== task1Filters.difficulty) {
        return false;
      }
      // Category
      if (task1Filters.category !== 'all' && topic.category !== task1Filters.category) {
        return false;
      }
      // Band level
      if (task1Filters.bandLevel !== 'all' && topic.estimatedBandLevel !== task1Filters.bandLevel) {
        return false;
      }
      return true;
    });
  }, [task1Topics, task1Filters]);

  // Filter Task 2 topics
  const filteredTask2Topics = useMemo(() => {
    return task2Topics.filter(topic => {
      // Search
      if (task2Filters.search) {
        const searchLower = task2Filters.search.toLowerCase();
        if (!topic.prompt.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      // Question type
      if (task2Filters.questionType !== 'all' && topic.questionType !== task2Filters.questionType) {
        return false;
      }
      // Difficulty
      if (task2Filters.difficulty !== 'all' && topic.difficulty !== task2Filters.difficulty) {
        return false;
      }
      // Category
      if (task2Filters.category !== 'all' && topic.category !== task2Filters.category) {
        return false;
      }
      // Band level
      if (task2Filters.bandLevel !== 'all' && topic.estimatedBandLevel !== task2Filters.bandLevel) {
        return false;
      }
      return true;
    });
  }, [task2Topics, task2Filters]);

  // Handlers
  const handleStartWritingTask1 = (topic: Task1Topic) => {
    setSelectedTask1Topic(topic);
    setViewMode('writing');
  };

  const handleStartWritingTask2 = (topic: Task2Topic) => {
    setSelectedTask2Topic(topic);
    setViewMode('writing');
  };

  const handleCloseEditor = () => {
    setSelectedTask1Topic(null);
    setSelectedTask2Topic(null);
    setViewMode('topics');
  };

  const handleSaveDraft = (content: string, wordCount: number, timeSpent: number) => {
    console.log('Saving draft:', { content: content.slice(0, 50), wordCount, timeSpent });
    // TODO: Implement save to backend
  };

  const handleSubmit = (content: string, wordCount: number, timeSpent: number) => {
    console.log('Submitting essay:', { content: content.slice(0, 50), wordCount, timeSpent });
    // TODO: Implement submit to backend for grading
  };

  const handleViewTask1Essay = (essay: Task1Essay) => {
    // Find the full essay with topic
    const essayWithTopic = task1Essays.find(e => e.id === essay.id);
    if (essayWithTopic) {
      setViewingTask1Essay(essayWithTopic);
    }
  };

  const handleViewTask2Essay = (essay: Task2Essay) => {
    // Find the full essay with topic
    const essayWithTopic = task2Essays.find(e => e.id === essay.id);
    if (essayWithTopic) {
      setViewingTask2Essay(essayWithTopic);
    }
  };

  const handleCloseViewer = () => {
    setViewingTask1Essay(null);
    setViewingTask2Essay(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25
      }
    }
  };

  // If in writing mode, show editor
  if (viewMode === 'writing') {
    return (
      <AnimatePresence mode="wait">
        {selectedTask1Topic && (
          <Task1EssayEditor
            key="task1-editor"
            topic={selectedTask1Topic}
            onClose={handleCloseEditor}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        )}
        {selectedTask2Topic && (
          <Task2EssayEditor
            key="task2-editor"
            topic={selectedTask2Topic}
            onClose={handleCloseEditor}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <EssaysHero />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <EssayStats
            totalEssays={stats.totalEssays}
            gradedEssays={stats.graded}
            averageBand={0}
            totalWords={stats.totalWords}
          />
        </motion.div>

        {/* View mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          {/* Task tabs */}
          <div className="flex items-center p-1 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <TabButton
              active={activeTab === 'task1'}
              onClick={() => setActiveTab('task1')}
              icon={<BarChart3 className="w-4 h-4" />}
            >
              Task 1
            </TabButton>
            <TabButton
              active={activeTab === 'task2'}
              onClick={() => setActiveTab('task2')}
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Task 2
            </TabButton>
          </div>

          {/* View mode buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'topics' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('topics')}
              className={viewMode === 'topics' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Chọn đề
            </Button>
            <Button
              variant={viewMode === 'history' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('history')}
              className={viewMode === 'history' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <History className="w-4 h-4 mr-1" />
              Lịch sử
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Task 1 Topics */}
          {activeTab === 'task1' && viewMode === 'topics' && (
            <motion.div
              key="task1-topics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Task1FilterBar
                filters={task1Filters}
                onFiltersChange={setTask1Filters}
                totalCount={task1Topics.length}
                filteredCount={filteredTask1Topics.length}
              />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
              >
                {filteredTask1Topics.map((topic, index) => (
                  <motion.div key={topic.id} variants={itemVariants}>
                    <Task1TopicCard
                      topic={topic}
                      index={index}
                      onSelect={handleStartWritingTask1}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {filteredTask1Topics.length === 0 && (
                <Card className="p-12 text-center bg-white dark:bg-gray-800 border-0 shadow-md mt-6">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Không tìm thấy đề bài
                  </h3>
                  <p className="text-sm text-gray-500">
                    Thử thay đổi bộ lọc để xem thêm đề
                  </p>
                </Card>
              )}
            </motion.div>
          )}

          {/* Task 2 Topics */}
          {activeTab === 'task2' && viewMode === 'topics' && (
            <motion.div
              key="task2-topics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Task2FilterBar
                filters={task2Filters}
                onFiltersChange={setTask2Filters}
                totalCount={task2Topics.length}
                filteredCount={filteredTask2Topics.length}
              />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
              >
                {filteredTask2Topics.map((topic, index) => (
                  <motion.div key={topic.id} variants={itemVariants}>
                    <Task2TopicCard
                      topic={topic}
                      index={index}
                      onSelect={handleStartWritingTask2}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {filteredTask2Topics.length === 0 && (
                <Card className="p-12 text-center bg-white dark:bg-gray-800 border-0 shadow-md mt-6">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Không tìm thấy đề bài
                  </h3>
                  <p className="text-sm text-gray-500">
                    Thử thay đổi bộ lọc để xem thêm đề
                  </p>
                </Card>
              )}
            </motion.div>
          )}

          {/* Task 1 History */}
          {activeTab === 'task1' && viewMode === 'history' && (
            <motion.div
              key="task1-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Task1EssayList
                essays={task1Essays}
                topics={task1Topics}
                getBandScore={(essayId) => getTask1Feedback(essayId)?.estimatedBandScore}
                onViewEssay={handleViewTask1Essay}
                onRewriteTopic={handleStartWritingTask1}
                emptyMessage="Bạn chưa có bài viết Task 1 nào"
              />
            </motion.div>
          )}

          {/* Task 2 History */}
          {activeTab === 'task2' && viewMode === 'history' && (
            <motion.div
              key="task2-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Task2EssayList
                essays={task2Essays}
                topics={task2Topics}
                getBandScore={(essayId) => getTask2Feedback(essayId)?.estimatedBandScore}
                onViewEssay={handleViewTask2Essay}
                onRewriteTopic={handleStartWritingTask2}
                emptyMessage="Bạn chưa có bài viết Task 2 nào"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Essay Viewer Modals */}
      <AnimatePresence>
        {viewingTask1Essay && (
          <Task1EssayViewer
            essay={viewingTask1Essay}
            feedback={getTask1Feedback(viewingTask1Essay.id)}
            onClose={handleCloseViewer}
          />
        )}
        {viewingTask2Essay && (
          <Task2EssayViewer
            essay={viewingTask2Essay}
            feedback={getTask2Feedback(viewingTask2Essay.id)}
            onClose={handleCloseViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
