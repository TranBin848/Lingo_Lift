// Essay Types based on database schema

// Essay Status
export type EssayStatus = 'Draft' | 'Submitted' | 'Graded';

// Task 1 Types
export type Task1Type = 'Academic' | 'General';

// Chart Types for Task 1
export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'table' 
  | 'map' 
  | 'process' 
  | 'mixed'
  | 'letter';

// Question Types for Task 2
export type QuestionType = 
  | 'opinion' 
  | 'discussion' 
  | 'problem_solution' 
  | 'advantages_disadvantages' 
  | 'two_part'
  | 'direct_question';

// Topic Difficulty
export type TopicDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

// Topic Frequency
export type TopicFrequency = 'Common' | 'Occasional' | 'Rare';

// Topic Categories
export type TopicCategory = 
  | 'Education' 
  | 'Technology' 
  | 'Environment' 
  | 'Health' 
  | 'Society' 
  | 'Economy'
  | 'Government'
  | 'Culture'
  | 'Work'
  | 'Transportation'
  | 'Demographics'
  | 'Energy';

// Task 1 Topic
export interface Task1Topic {
  id: string;
  prompt: string;
  taskType: Task1Type;
  chartType: ChartType;
  category: TopicCategory;
  difficulty: TopicDifficulty;
  estimatedBandLevel: number;
  frequency: TopicFrequency;
  imageUrl?: string;
  keywords: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Task 2 Topic
export interface Task2Topic {
  id: string;
  prompt: string;
  questionType: QuestionType;
  category: TopicCategory;
  difficulty: TopicDifficulty;
  estimatedBandLevel: number;
  frequency: TopicFrequency;
  keywords: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Task 1 Essay
export interface Task1Essay {
  id: string;
  userId: string;
  topicId: string;
  content: string;
  wordCount: number;
  timeSpentSeconds: number;
  status: EssayStatus;
  version: number;
  previousVersionId?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  gradedAt?: string;
}

// Task 2 Essay
export interface Task2Essay {
  id: string;
  userId: string;
  topicId: string;
  content: string;
  wordCount: number;
  timeSpentSeconds: number;
  status: EssayStatus;
  version: number;
  previousVersionId?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  gradedAt?: string;
}

// Essay with Topic (for display)
export interface Task1EssayWithTopic extends Task1Essay {
  topic: Task1Topic;
}

export interface Task2EssayWithTopic extends Task2Essay {
  topic: Task2Topic;
}

// Filter types
export interface Task1TopicFilters {
  taskType: Task1Type | 'all';
  difficulty: TopicDifficulty | 'all';
  category: TopicCategory | 'all';
  bandLevel: number | 'all';
  chartType: ChartType | 'all';
  search: string;
}

export interface Task2TopicFilters {
  questionType: QuestionType | 'all';
  difficulty: TopicDifficulty | 'all';
  category: TopicCategory | 'all';
  bandLevel: number | 'all';
  search: string;
}

// UI Label mappings
export const essayStatusLabels: Record<EssayStatus, string> = {
  Draft: 'Bản nháp',
  Submitted: 'Đã nộp',
  Graded: 'Đã chấm',
};

export const task1TypeLabels: Record<Task1Type, string> = {
  Academic: 'Academic',
  General: 'General Training',
};

export const chartTypeLabels: Record<ChartType, string> = {
  bar: 'Biểu đồ cột',
  line: 'Biểu đồ đường',
  pie: 'Biểu đồ tròn',
  table: 'Bảng số liệu',
  map: 'Bản đồ',
  process: 'Quy trình',
  mixed: 'Biểu đồ kết hợp',
  letter: 'Thư',
};

export const questionTypeLabels: Record<QuestionType, string> = {
  opinion: 'Opinion Essay',
  discussion: 'Discussion Essay',
  problem_solution: 'Problem & Solution',
  advantages_disadvantages: 'Advantages & Disadvantages',
  two_part: 'Two-part Question',
  direct_question: 'Direct Question',
};

export const topicDifficultyLabels: Record<TopicDifficulty, string> = {
  Beginner: 'Cơ bản',
  Intermediate: 'Trung cấp',
  Advanced: 'Nâng cao',
};

export const topicFrequencyLabels: Record<TopicFrequency, string> = {
  Common: 'Phổ biến',
  Occasional: 'Thỉnh thoảng',
  Rare: 'Hiếm gặp',
};

export const topicCategoryLabels: Record<TopicCategory, string> = {
  Education: 'Giáo dục',
  Technology: 'Công nghệ',
  Environment: 'Môi trường',
  Health: 'Sức khỏe',
  Society: 'Xã hội',
  Economy: 'Kinh tế',
  Government: 'Chính phủ',
  Culture: 'Văn hóa',
  Work: 'Công việc',
  Transportation: 'Giao thông',
  Demographics: 'Dân số',
  Energy: 'Năng lượng',
};

// Color mappings
export const essayStatusColors: Record<EssayStatus, { bg: string; text: string }> = {
  Draft: { 
    bg: 'bg-gray-100 dark:bg-gray-800', 
    text: 'text-gray-600 dark:text-gray-400' 
  },
  Submitted: { 
    bg: 'bg-blue-100 dark:bg-blue-900/30', 
    text: 'text-blue-700 dark:text-blue-300' 
  },
  Graded: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-700 dark:text-green-300' 
  },
};

export const task1TypeColors: Record<Task1Type, { bg: string; text: string; gradient: string }> = {
  Academic: { 
    bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
    text: 'text-indigo-700 dark:text-indigo-300',
    gradient: 'from-indigo-500 to-purple-600'
  },
  General: { 
    bg: 'bg-teal-100 dark:bg-teal-900/30', 
    text: 'text-teal-700 dark:text-teal-300',
    gradient: 'from-teal-500 to-cyan-600'
  },
};

export const topicDifficultyColors: Record<TopicDifficulty, { bg: string; text: string }> = {
  Beginner: { 
    bg: 'bg-emerald-100 dark:bg-emerald-900/30', 
    text: 'text-emerald-700 dark:text-emerald-300' 
  },
  Intermediate: { 
    bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
    text: 'text-yellow-700 dark:text-yellow-300' 
  },
  Advanced: { 
    bg: 'bg-red-100 dark:bg-red-900/30', 
    text: 'text-red-700 dark:text-red-300' 
  },
};

export const topicFrequencyColors: Record<TopicFrequency, { bg: string; text: string }> = {
  Common: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-700 dark:text-green-300' 
  },
  Occasional: { 
    bg: 'bg-orange-100 dark:bg-orange-900/30', 
    text: 'text-orange-700 dark:text-orange-300' 
  },
  Rare: { 
    bg: 'bg-purple-100 dark:bg-purple-900/30', 
    text: 'text-purple-700 dark:text-purple-300' 
  },
};

export const chartTypeIcons: Record<ChartType, string> = {
  bar: '📊',
  line: '📈',
  pie: '🥧',
  table: '📋',
  map: '🗺️',
  process: '🔄',
  mixed: '📉',
  letter: '✉️',
};

// ===== AI FEEDBACK TYPES =====

// Criterion Feedback (detailed)
export interface CriterionFeedback {
  score: number; // 0-9 band score
  comments: string; // General comments for this criterion
  strengths: string[]; // What the student did well
  improvements: string[]; // What needs to be improved
}

// Task 1 Feedback
export interface Task1Feedback {
  essayId: string;
  taskAchievement: CriterionFeedback;
  coherenceCohesion: CriterionFeedback;
  lexicalResource: CriterionFeedback;
  grammaticalRange: CriterionFeedback;
  estimatedBandScore: number; // Overall band score
  overallScore: number; // Out of 9
  overallComments: string; // General evaluation
  recommendations: string[]; // Suggestions for improvement
  aiModel: string; // e.g., "GPT-4"
  processingTimeMs: number; // Time taken to grade
  gradedAt: string; // ISO timestamp
}

// Task 2 Feedback
export interface Task2Feedback {
  essayId: string;
  taskResponse: CriterionFeedback;
  coherenceCohesion: CriterionFeedback;
  lexicalResource: CriterionFeedback;
  grammaticalRange: CriterionFeedback;
  estimatedBandScore: number; // Overall band score
  overallScore: number; // Out of 9
  overallComments: string; // General evaluation
  recommendations: string[]; // Suggestions for improvement
  aiModel: string; // e.g., "GPT-4"
  processingTimeMs: number; // Time taken to grade
  gradedAt: string; // ISO timestamp
}

// Essay with Feedback (for display)
export interface Task1EssayWithFeedback extends Task1EssayWithTopic {
  feedback?: Task1Feedback;
}

export interface Task2EssayWithFeedback extends Task2EssayWithTopic {
  feedback?: Task2Feedback;
}

// Criterion names
export const task1CriteriaLabels = {
  taskAchievement: 'Task Achievement',
  coherenceCohesion: 'Coherence & Cohesion',
  lexicalResource: 'Lexical Resource',
  grammaticalRange: 'Grammatical Range & Accuracy',
} as const;

export const task2CriteriaLabels = {
  taskResponse: 'Task Response',
  coherenceCohesion: 'Coherence & Cohesion',
  lexicalResource: 'Lexical Resource',
  grammaticalRange: 'Grammatical Range & Accuracy',
} as const;

// Band score color mapping
export function getBandScoreColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 8.0) {
    return {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-700',
    };
  } else if (score >= 7.0) {
    return {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-700',
    };
  } else if (score >= 6.0) {
    return {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700',
    };
  } else if (score >= 5.0) {
    return {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-700',
    };
  } else {
    return {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-200 dark:border-red-700',
    };
  }
}

// Progress bar fill color based on score
export function getBandScoreGradient(score: number): string {
  if (score >= 8.0) return 'from-emerald-500 to-green-600';
  if (score >= 7.0) return 'from-green-500 to-emerald-600';
  if (score >= 6.0) return 'from-blue-500 to-indigo-600';
  if (score >= 5.0) return 'from-yellow-500 to-orange-600';
  return 'from-red-500 to-orange-600';
}
