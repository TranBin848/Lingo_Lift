import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  PenTool,
  FileText,
  BarChart3,
  MessageSquare,
  Sparkles,
  BookOpen,
  History,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Task1TopicCard, Task2TopicCard } from "./TopicCard";
import { Task1FilterBar, Task2FilterBar } from "./TopicFilterBar";
import { Task1EssayEditor, Task2EssayEditor } from "./EssayEditor";
import { Task1EssayList, Task2EssayList, EssayStats } from "./EssayHistoryList";
import { Task1EssayViewer, Task2EssayViewer } from "./EssayViewer";
import type {
  Task1Topic,
  Task2Topic,
  Task1Essay,
  Task2Essay,
  Task1TopicFilters,
  Task2TopicFilters,
  Task1EssayWithTopic,
  Task2EssayWithTopic,
  ChartType,
  TopicCategory,
} from "../../types/essay";
import { getEssayStats } from "../../mocks/essays";
import { useTask1Topics } from "../../hooks/useTask1Topics";
import { useTask1Essays } from "../../hooks/useTask1Essays";
import { useTask1EssayList } from "../../hooks/useTask1EssayList";
import { useCreateTask1Essay } from "../../hooks/useCreateTask1Essay";
import { useTask2Topics } from "../../hooks/useTask2Topics";
import { useTask2Essays } from "../../hooks/useTask2Essays";
import { useTask2EssayList } from "../../hooks/useTask2EssayList";
import { useCreateTask2Essay } from "../../hooks/useCreateTask2Essay";
import type { Task1Topic as Task1TopicAPI } from "../../types/task1-topic";
import type { Task1Essay as Task1EssayAPI } from "../../types/task1-essay";
import type { Task2Topic as Task2TopicAPI } from "../../types/task2-topic";
import type { Task2Essay as Task2EssayAPI } from "../../types/task2-essay";

type TaskTab = "task1" | "task2";
type ViewMode = "topics" | "writing" | "history";

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
          ? "text-white z-10"
          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
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
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
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
          Luyện tập viết IELTS Task 1 & Task 2 với đa dạng đề bài thực tế. AI sẽ
          chấm điểm chi tiết theo 4 tiêu chí và đưa ra gợi ý cải thiện.
        </p>
      </div>
    </motion.div>
  );
}

// Props for EssaysPage
interface EssaysPageProps {
  initialTask?: "task1" | "task2";
  initialTopicId?: string;
}

// Main Essays Page
export function EssaysPage({ initialTask, initialTopicId }: EssaysPageProps) {
  // States
  const [activeTab, setActiveTab] = useState<TaskTab>(initialTask || "task1");
  const [viewMode, setViewMode] = useState<ViewMode>("topics");
  const [initialized, setInitialized] = useState(false);

  // Selected topic for writing
  const [selectedTask1Topic, setSelectedTask1Topic] =
    useState<Task1Topic | null>(null);
  const [selectedTask2Topic, setSelectedTask2Topic] =
    useState<Task2Topic | null>(null);

  // Selected essay for viewing
  const [viewingTask1Essay, setViewingTask1Essay] =
    useState<Task1EssayWithTopic | null>(null);
  const [viewingTask2Essay, setViewingTask2Essay] =
    useState<Task2EssayWithTopic | null>(null);

  // Filter states
  const [task1Filters, setTask1Filters] = useState<Task1TopicFilters>({
    taskType: "all",
    difficulty: "all",
    category: "all",
    bandLevel: "all",
    chartType: "all",
    search: "",
  });
  const [task2Filters, setTask2Filters] = useState<Task2TopicFilters>({
    questionType: "all",
    difficulty: "all",
    category: "all",
    bandLevel: "all",
    search: "",
  });

  // Get data from APIs
  const { data: task1TopicsData, loading: task1TopicsLoading } = useTask1Topics(
    {}
  );
  const { data: task2TopicsData, loading: task2TopicsLoading } = useTask2Topics(
    {}
  );
  const {
    data: task1EssaysData,
    loading: task1EssaysLoading,
    refetch: refetchTask1Essays,
  } = useTask1Essays();
  const {
    data: task2EssaysData,
    loading: task2EssaysLoading,
    refetch: refetchTask2Essays,
  } = useTask2Essays();
  
  // Use new API for essay list in history view
  const { 
    data: task1EssayListData, 
    isLoading: isLoadingTask1List,
    refetch: refetchTask1List 
  } = useTask1EssayList({ 
    page: 1, 
    pageSize: 50,
    sortBy: 'CreatedAt',
    sortOrder: 'desc'
  });
  
  const { 
    data: task2EssayListData, 
    isLoading: isLoadingTask2List,
    refetch: refetchTask2List 
  } = useTask2EssayList({ 
    page: 1, 
    pageSize: 50,
    sortBy: 'CreatedAt',
    sortOrder: 'desc'
  });
  const stats = getEssayStats();
  const {
    submit: submitTask1Essay,
    isSubmitting: isSubmittingTask1,
    error: task1SubmitError,
    resetError: resetTask1Error,
  } = useCreateTask1Essay();
  const {
    submit: submitTask2Essay,
    isSubmitting: isSubmittingTask2,
    error: task2SubmitError,
    resetError: resetTask2Error,
  } = useCreateTask2Essay();

  // Transform API data to match component types
  const task1Topics: Task1Topic[] = (task1TopicsData || []).map(
    (topic: Task1TopicAPI) => {
      // Map API difficulty to component difficulty
      let mappedDifficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
      if (topic.difficulty) {
        const diff = topic.difficulty.toLowerCase();
        if (diff === 'easy') mappedDifficulty = 'Beginner';
        else if (diff === 'medium') mappedDifficulty = 'Intermediate';
        else if (diff === 'hard') mappedDifficulty = 'Advanced';
      }

      return {
        id: topic.id.toString(),
        prompt: topic.description || topic.prompt || "",
        taskType: "Academic" as const,
        chartType: (topic.chartType?.toLowerCase() || topic.task_type?.toLowerCase() || "bar") as ChartType,
        imageUrl: topic.imageUrl || topic.image_url || "",
        sampleAnswer: topic.sample_answer || "",
        difficulty: mappedDifficulty,
        category: (topic.category || "Education") as TopicCategory,
        estimatedBandLevel: 6.5,
        frequency: "Common" as const,
        keywords: topic.vocabulary_list || [],
        isPublished: topic.isPublished !== undefined ? topic.isPublished : true,
        createdAt: topic.created_at || topic.createdAt,
        updatedAt: topic.updated_at || topic.updatedAt,
      };
    }
  );

  // Transform Task 1 Essays from new API for history view
  const task1EssaysFromList: Task1EssayWithTopic[] = (task1EssayListData?.items || []).map((essay) => ({
    id: essay.id.toString(),
    userId: essay.userId?.toString() || '',
    topicId: essay.task1TopicId.toString(),
    content: essay.essayText,
    wordCount: essay.wordCount,
    timeSpent: essay.timeTaken || 0,
    status: essay.status as 'Draft' | 'Submitted' | 'Graded',
    submittedAt: essay.submittedAt || essay.createdAt,
    feedback: essay.feedback,
    topic: task1Topics.find((t) => t.id === essay.task1TopicId.toString()) || {
      id: essay.task1TopicId.toString(),
      prompt: essay.topicPrompt || '',
      taskType: 'Academic',
      chartType: 'bar',
      imageUrl: '',
      sampleAnswer: '',
      difficulty: 'Intermediate',
      category: 'Other',
      estimatedBandLevel: 6.5,
      frequency: 'Common',
      keywords: [],
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }));

  const task1Essays: Task1EssayWithTopic[] = (
    Array.isArray(task1EssaysData) ? task1EssaysData : []
  ).map((essay: Task1EssayAPI) => ({
    id: essay.id.toString(),
    userId: essay.user_id.toString(),
    topicId: essay.task1_topic_id.toString(),
    content: essay.essay_text,
    wordCount: essay.word_count,
    timeSpent: 0,
    status: "submitted" as const,
    submittedAt: essay.created_at,
    topic: task1Topics.find((t) => t.id === essay.task1_topic_id.toString())!,
  }));

  // Transform Task 2 Topics
  const task2Topics: Task2Topic[] = (task2TopicsData || []).map(
    (topic: Task2TopicAPI) => {
      // Map API difficulty to component difficulty
      let mappedDifficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
      if (topic.difficulty) {
        const diff = topic.difficulty.toLowerCase();
        if (diff === 'easy') mappedDifficulty = 'Beginner';
        else if (diff === 'medium') mappedDifficulty = 'Intermediate';
        else if (diff === 'hard') mappedDifficulty = 'Advanced';
      }

      return {
        id: topic.id.toString(),
        prompt: topic.prompt || topic.question || "",
        questionType: (topic.questionType?.toLowerCase().replace(/[- ]/g, '_') || "opinion") as any,
        category: (topic.category || "Education") as TopicCategory,
        difficulty: mappedDifficulty,
        estimatedBandLevel: 6.5,
        frequency: "Common" as const,
        keywords: topic.keywords ? topic.keywords.split(',').map(k => k.trim()) : (topic.vocabulary_list || []),
        isPublished: topic.isPublished !== undefined ? topic.isPublished : true,
        createdAt: topic.createdAt || topic.created_at,
        updatedAt: topic.updatedAt || topic.updated_at,
      };
    }
  );

  // Transform Task 2 Essays from new API for history view
  const task2EssaysFromList: Task2EssayWithTopic[] = (task2EssayListData?.items || []).map((essay) => ({
    id: essay.id.toString(),
    userId: essay.userId?.toString() || '',
    topicId: essay.task2TopicId.toString(),
    content: essay.essayText,
    wordCount: essay.wordCount,
    timeSpent: essay.timeTaken || 0,
    status: essay.status as 'Draft' | 'Submitted' | 'Graded',
    submittedAt: essay.submittedAt || essay.createdAt,
    feedback: essay.feedback,
    topic: task2Topics.find((t) => t.id === essay.task2TopicId.toString()) || {
      id: essay.task2TopicId.toString(),
      prompt: essay.topicPrompt || '',
      questionType: 'opinion',
      category: 'Other',
      difficulty: 'Intermediate',
      estimatedBandLevel: 6.5,
      frequency: 'Common',
      keywords: [],
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }));

  // Transform Task 2 Essays
  const task2Essays: Task2EssayWithTopic[] = (
    Array.isArray(task2EssaysData) ? task2EssaysData : []
  ).map((essay: Task2EssayAPI) => ({
    id: essay.id.toString(),
    userId: essay.user_id.toString(),
    topicId: essay.task2_topic_id.toString(),
    content: essay.essay_text,
    wordCount: essay.word_count,
    timeSpent: 0,
    status: "submitted" as const,
    submittedAt: essay.created_at,
    topic: task2Topics.find((t) => t.id === essay.task2_topic_id.toString())!,
  }));

  // Auto-select topic from URL params
  useEffect(() => {
    // Don't re-initialize if already done
    if (initialized) return;
    
    // If no topicId provided, just set the active tab and mark initialized
    if (!initialTopicId) {
      if (initialTask) {
        setActiveTab(initialTask);
      }
      setInitialized(true);
      return;
    }

    // Wait for topics to load before trying to find the topic
    const isLoading = initialTask === "task2" ? task2TopicsLoading : task1TopicsLoading;
    if (isLoading) return;

    // Try to find topic based on initialTask hint first
    if (initialTask === "task2") {
      const task2Topic = task2Topics.find((t) => t.id === initialTopicId);
      if (task2Topic) {
        setActiveTab("task2");
        setSelectedTask2Topic(task2Topic);
        setViewMode("writing");
        setInitialized(true);
        return;
      }
    } else {
      const task1Topic = task1Topics.find((t) => t.id === initialTopicId);
      if (task1Topic) {
        setActiveTab("task1");
        setSelectedTask1Topic(task1Topic);
        setViewMode("writing");
        setInitialized(true);
        return;
      }
    }

    // Fallback: try both lists if not found in the expected one
    const task1Topic = task1Topics.find((t) => t.id === initialTopicId);
    if (task1Topic) {
      setActiveTab("task1");
      setSelectedTask1Topic(task1Topic);
      setViewMode("writing");
      setInitialized(true);
      return;
    }

    const task2Topic = task2Topics.find((t) => t.id === initialTopicId);
    if (task2Topic) {
      setActiveTab("task2");
      setSelectedTask2Topic(task2Topic);
      setViewMode("writing");
      setInitialized(true);
      return;
    }

    // Topic not found in either list, just set tab and mark initialized
    if (initialTask) {
      setActiveTab(initialTask);
    }
    setInitialized(true);
  }, [initialTopicId, initialTask, task1Topics, task2Topics, task1TopicsLoading, task2TopicsLoading, initialized]);

  // Filter Task 1 topics
  const filteredTask1Topics = useMemo(() => {
    return task1Topics.filter((topic) => {
      // Search
      if (task1Filters.search) {
        const searchLower = task1Filters.search.toLowerCase();
        if (!topic.prompt.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      // Chart type
      if (
        task1Filters.chartType !== "all" &&
        topic.chartType !== task1Filters.chartType
      ) {
        return false;
      }
      // Difficulty
      if (
        task1Filters.difficulty !== "all" &&
        topic.difficulty !== task1Filters.difficulty
      ) {
        return false;
      }
      // Category
      if (
        task1Filters.category !== "all" &&
        topic.category !== task1Filters.category
      ) {
        return false;
      }
      // Band level
      if (
        task1Filters.bandLevel !== "all" &&
        topic.estimatedBandLevel !== task1Filters.bandLevel
      ) {
        return false;
      }
      return true;
    });
  }, [task1Topics, task1Filters]);

  // Filter Task 2 topics
  const filteredTask2Topics = useMemo(() => {
    return task2Topics.filter((topic) => {
      // Search
      if (task2Filters.search) {
        const searchLower = task2Filters.search.toLowerCase();
        if (!topic.prompt.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      // Question type
      if (
        task2Filters.questionType !== "all" &&
        topic.questionType !== task2Filters.questionType
      ) {
        return false;
      }
      // Difficulty
      if (
        task2Filters.difficulty !== "all" &&
        topic.difficulty !== task2Filters.difficulty
      ) {
        return false;
      }
      // Category
      if (
        task2Filters.category !== "all" &&
        topic.category !== task2Filters.category
      ) {
        return false;
      }
      // Band level
      if (
        task2Filters.bandLevel !== "all" &&
        topic.estimatedBandLevel !== task2Filters.bandLevel
      ) {
        return false;
      }
      return true;
    });
  }, [task2Topics, task2Filters]);

  // Handlers
  const handleStartWritingTask1 = (topic: Task1Topic) => {
    setSelectedTask1Topic(topic);
    setViewMode("writing");
  };

  const handleStartWritingTask2 = (topic: Task2Topic) => {
    setSelectedTask2Topic(topic);
    setViewMode("writing");
  };

  const handleCloseEditor = () => {
    setSelectedTask1Topic(null);
    setSelectedTask2Topic(null);
    setViewMode("topics");
  };

  const handleSaveDraft = (
    content: string,
    wordCount: number,
    timeSpent: number
  ) => {
    console.log("Saving draft:", {
      content: content.slice(0, 50),
      wordCount,
      timeSpent,
    });
    // TODO: Implement save to backend
  };

  const handleSubmit = async (
    content: string,
    wordCount: number,
    timeSpent: number
  ) => {
    // EssayEditor already handles the submission via createAndSubmitTask1Essay/Task2Essay
    // This callback is just for notification and refreshing the list
    console.log('Essay submitted:', { content, wordCount, timeSpent });
    
    // Refresh essays list after submission
    if (selectedTask1Topic) {
      await refetchTask1Essays();
      await refetchTask1List();
    }
    if (selectedTask2Topic) {
      await refetchTask2Essays();
      await refetchTask2List();
    }
    
    // Don't close editor or change view - let the feedback display in editor
    // User can close manually when they're done reviewing
  };

  const handleViewTask1Essay = (essay: Task1Essay) => {
    // Find the full essay with topic
    const essayWithTopic = task1Essays.find((e) => e.id === essay.id);
    if (essayWithTopic) {
      setViewingTask1Essay(essayWithTopic);
    }
  };

  const handleViewTask2Essay = (essay: Task2Essay) => {
    // Find the full essay with topic
    const essayWithTopic = task2Essays.find((e) => e.id === essay.id);
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // If in writing mode, show editor
  if (viewMode === "writing") {
    return (
      <AnimatePresence mode="wait">
        {selectedTask1Topic && (
          <>
            {/* Task 1 Error notification */}
            {task1SubmitError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 z-[60] max-w-md"
              >
                <Card className="p-4 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 dark:text-red-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                        Không thể nộp bài Task 1
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {task1SubmitError}
                      </p>
                    </div>
                    <button
                      onClick={resetTask1Error}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
            <Task1EssayEditor
              key="task1-editor"
              topic={selectedTask1Topic}
              onClose={handleCloseEditor}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          </>
        )}
        {selectedTask2Topic && (
          <>
            {/* Task 2 Error notification */}
            {task2SubmitError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 z-[60] max-w-md"
              >
                <Card className="p-4 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 dark:text-red-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                        Không thể nộp bài Task 2
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {task2SubmitError}
                      </p>
                    </div>
                    <button
                      onClick={resetTask2Error}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
            <Task2EssayEditor
              key="task2-editor"
              topic={selectedTask2Topic}
              onClose={handleCloseEditor}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          </>
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
              active={activeTab === "task1"}
              onClick={() => setActiveTab("task1")}
              icon={<BarChart3 className="w-4 h-4" />}
            >
              Task 1
            </TabButton>
            <TabButton
              active={activeTab === "task2"}
              onClick={() => setActiveTab("task2")}
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Task 2
            </TabButton>
          </div>

          {/* View mode buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "topics" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("topics")}
              className={
                viewMode === "topics" ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Chọn đề
            </Button>
            <Button
              variant={viewMode === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("history")}
              className={
                viewMode === "history" ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              <History className="w-4 h-4 mr-1" />
              Lịch sử
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Task 1 Topics */}
          {activeTab === "task1" && viewMode === "topics" && (
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

              {task1TopicsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                  {[...Array(6)].map((_, i) => (
                    <Card
                      key={i}
                      className="p-5 animate-pulse bg-white dark:bg-gray-800 border-0 shadow-md"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
          )}

          {/* Task 2 Topics */}
          {activeTab === "task2" && viewMode === "topics" && (
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

              {task2TopicsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                  {[...Array(6)].map((_, i) => (
                    <Card
                      key={i}
                      className="p-5 animate-pulse bg-white dark:bg-gray-800 border-0 shadow-md"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
          )}

          {/* Task 1 History */}
          {activeTab === "task1" && viewMode === "history" && (
            <motion.div
              key="task1-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLoadingTask1List ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className="p-5 animate-pulse bg-white dark:bg-gray-800 border-0 shadow-md"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Task1EssayList
                  essays={task1EssaysFromList}
                  topics={task1Topics}
                  getBandScore={(essayId) => {
                    const essay = task1EssaysFromList.find(e => e.id === essayId);
                    return essay?.feedback?.overallScore;
                  }}
                  onViewEssay={handleViewTask1Essay}
                  onRewriteTopic={handleStartWritingTask1}
                  emptyMessage="Bạn chưa có bài viết Task 1 nào"
                />
              )}
            </motion.div>
          )}

          {/* Task 2 History */}
          {activeTab === "task2" && viewMode === "history" && (
            <motion.div
              key="task2-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLoadingTask2List ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className="p-5 animate-pulse bg-white dark:bg-gray-800 border-0 shadow-md"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Task2EssayList
                  essays={task2EssaysFromList}
                  topics={task2Topics}
                  getBandScore={(essayId) => {
                    const essay = task2EssaysFromList.find(e => e.id === essayId);
                    return essay?.feedback?.overallScore;
                  }}
                  onViewEssay={handleViewTask2Essay}
                  onRewriteTopic={handleStartWritingTask2}
                  emptyMessage="Bạn chưa có bài viết Task 2 nào"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Essay Viewer Modals */}
      <AnimatePresence>
        {viewingTask1Essay && (
          <Task1EssayViewer
            essay={viewingTask1Essay}
            onClose={handleCloseViewer}
          />
        )}
        {viewingTask2Essay && (
          <Task2EssayViewer
            essay={viewingTask2Essay}
            onClose={handleCloseViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
