// Placement Test Types based on database schema

export interface PlacementTest {
  id: string;
  userId: string;
  overallBandScore: number;
  completedAt?: Date;
  createdAt: Date;
  task1Assessment?: Task1Assessment;
  task2Assessment?: Task2Assessment;
}

export type Task1Type = 'Academic' | 'General';

export interface Task1Assessment {
  id: string;
  placementTestId: string;
  userId: string;
  taskType: Task1Type;
  prompt: string;
  imageUrl?: string;
  essayText: string;
  wordCount: number;
  timeTaken: number; // seconds
  
  // Scores (0-9 scale, 0.5 increments)
  taskAchievement: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  overallScore: number;
  
  // Feedback
  generalFeedback?: string;
  strengths?: string;
  weaknesses?: string;
  
  createdAt: Date;
}

export type Task2QuestionType = 
  | 'opinion' 
  | 'discussion' 
  | 'problem_solution' 
  | 'advantages_disadvantages'
  | 'two_part_question';

export interface Task2Assessment {
  id: string;
  placementTestId: string;
  userId: string;
  prompt: string;
  questionType: Task2QuestionType;
  essayText: string;
  wordCount: number;
  timeTaken: number; // seconds
  
  // Scores (0-9 scale, 0.5 increments)
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  overallScore: number;
  
  // Feedback
  generalFeedback?: string;
  strengths?: string;
  weaknesses?: string;
  
  createdAt: Date;
}

// Task prompts for the placement test
export interface Task1Prompt {
  id: string;
  taskType: Task1Type;
  prompt: string;
  imageUrl?: string;
}

export interface Task2Prompt {
  id: string;
  questionType: Task2QuestionType;
  prompt: string;
}

// Placement test state for the flow
export type PlacementTestStep = 
  | 'intro' 
  | 'task1' 
  | 'task2' 
  | 'processing' 
  | 'result';

export interface PlacementTestState {
  currentStep: PlacementTestStep;
  task1Draft?: {
    essayText: string;
    wordCount: number;
    timeTaken: number;
  };
  task2Draft?: {
    essayText: string;
    wordCount: number;
    timeTaken: number;
  };
  result?: PlacementTest;
}

// Score color helpers
export function getScoreColor(score: number): string {
  if (score >= 7.5) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 6.5) return 'text-blue-600 dark:text-blue-400';
  if (score >= 5.5) return 'text-yellow-600 dark:text-yellow-400';
  if (score >= 4.5) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

export function getScoreGradient(score: number): string {
  if (score >= 7.5) return 'from-emerald-500 to-teal-600';
  if (score >= 6.5) return 'from-blue-500 to-indigo-600';
  if (score >= 5.5) return 'from-yellow-500 to-amber-600';
  if (score >= 4.5) return 'from-orange-500 to-red-500';
  return 'from-red-500 to-rose-600';
}

export function getScoreLabel(score: number): string {
  if (score >= 8.5) return 'Xuất sắc';
  if (score >= 7.5) return 'Rất tốt';
  if (score >= 6.5) return 'Tốt';
  if (score >= 5.5) return 'Khá';
  if (score >= 4.5) return 'Trung bình';
  return 'Cần cải thiện';
}

export function getQuestionTypeLabel(type: Task2QuestionType): string {
  const labels: Record<Task2QuestionType, string> = {
    opinion: 'Quan điểm cá nhân',
    discussion: 'Thảo luận hai mặt',
    problem_solution: 'Vấn đề & Giải pháp',
    advantages_disadvantages: 'Ưu điểm & Nhược điểm',
    two_part_question: 'Câu hỏi hai phần'
  };
  return labels[type];
}
