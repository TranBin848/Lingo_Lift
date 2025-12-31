// Lesson Types based on database schema

export type LessonCategory = 
  | 'Task1Academic' 
  | 'Task1General' 
  | 'Task2' 
  | 'Grammar' 
  | 'Vocabulary';

export type LessonDifficulty = 
  | 'Beginner' 
  | 'Intermediate' 
  | 'Advanced';

export type LessonStatus = 
  | 'NotStarted' 
  | 'InProgress' 
  | 'Completed';

export type FocusArea = 
  | 'TaskAchievement' 
  | 'CoherenceCohesion' 
  | 'LexicalResource' 
  | 'GrammarRangeAccuracy';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: LessonDifficulty;
  bandLevel: number;
  focusArea: FocusArea;
  estimatedDurationMinutes: number;
  orderIndex: number;
  isPublished: boolean;
  contentData: LessonContent;
  createdAt: string;
  updatedAt: string;
}

export interface LessonContent {
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  type: 'heading' | 'paragraph' | 'example' | 'tip' | 'bulletList' | 'highlight';
  content: string;
  items?: string[]; // For bullet lists
}

export interface UserLessonProgress {
  id: string;
  lessonId: string;
  userId: string;
  status: LessonStatus;
  timeSpentMinutes: number;
  completedAt: string | null;
  lastAccessedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonWithProgress extends Lesson {
  progress?: UserLessonProgress;
}

// Filter types
export interface LessonFilters {
  category: LessonCategory | 'all';
  difficulty: LessonDifficulty | 'all';
  bandLevel: number | 'all';
  status: LessonStatus | 'all';
  search: string;
}

// UI Label mappings
export const categoryLabels: Record<LessonCategory, string> = {
  Task1Academic: 'Task 1 Academic',
  Task1General: 'Task 1 General',
  Task2: 'Task 2',
  Grammar: 'Ngữ pháp',
  Vocabulary: 'Từ vựng',
};

export const difficultyLabels: Record<LessonDifficulty, string> = {
  Beginner: 'Cơ bản',
  Intermediate: 'Trung cấp',
  Advanced: 'Nâng cao',
};

export const statusLabels: Record<LessonStatus, string> = {
  NotStarted: 'Chưa học',
  InProgress: 'Đang học',
  Completed: 'Hoàn thành',
};

export const focusAreaLabels: Record<FocusArea, string> = {
  TaskAchievement: 'Task Achievement',
  CoherenceCohesion: 'Coherence & Cohesion',
  LexicalResource: 'Lexical Resource',
  GrammarRangeAccuracy: 'Grammar Range & Accuracy',
};

export const categoryColors: Record<LessonCategory, { bg: string; text: string; gradient: string }> = {
  Task1Academic: { 
    bg: 'bg-blue-100 dark:bg-blue-900/30', 
    text: 'text-blue-700 dark:text-blue-300',
    gradient: 'from-blue-500 to-blue-600'
  },
  Task1General: { 
    bg: 'bg-cyan-100 dark:bg-cyan-900/30', 
    text: 'text-cyan-700 dark:text-cyan-300',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  Task2: { 
    bg: 'bg-purple-100 dark:bg-purple-900/30', 
    text: 'text-purple-700 dark:text-purple-300',
    gradient: 'from-purple-500 to-purple-600'
  },
  Grammar: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-700 dark:text-green-300',
    gradient: 'from-green-500 to-emerald-600'
  },
  Vocabulary: { 
    bg: 'bg-orange-100 dark:bg-orange-900/30', 
    text: 'text-orange-700 dark:text-orange-300',
    gradient: 'from-orange-500 to-amber-600'
  },
};

export const difficultyColors: Record<LessonDifficulty, { bg: string; text: string }> = {
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

export const statusColors: Record<LessonStatus, { bg: string; text: string; icon: string }> = {
  NotStarted: { 
    bg: 'bg-gray-100 dark:bg-gray-800', 
    text: 'text-gray-600 dark:text-gray-400',
    icon: 'text-gray-400'
  },
  InProgress: { 
    bg: 'bg-blue-100 dark:bg-blue-900/30', 
    text: 'text-blue-700 dark:text-blue-300',
    icon: 'text-blue-500'
  },
  Completed: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-700 dark:text-green-300',
    icon: 'text-green-500'
  },
};
