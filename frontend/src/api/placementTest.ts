import { apiClient } from './client';

// ===== TYPES =====

export interface StartTestRequest {
  testType: 'Placement' | 'Progress' | 'Final';
}

export interface StartTestResponse {
  id: number;
  userId: number;
  type: string;
  overallBandScore: number;
  completedAt: string | null;
  createdAt: string;
  task1: Task1Result | null;
  task2: Task2Result | null;
  status: 'InProgress' | 'Completed';
}

export interface Task1SubmitRequest {
  taskType: string;
  prompt: string;
  imageUrl: string;
  essayText: string;
  timeTaken: number;
}

export interface Task1Result {
  id: number;
  taskType: string;
  prompt: string;
  imageUrl: string;
  essayText: string;
  wordCount: number;
  timeTaken: number;
  taskAchievement: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  overallScore: number;
  generalFeedback: string;
  strengths: string;
  weaknesses: string;
  createdAt: string;
}

export interface Task2SubmitRequest {
  prompt: string;
  questionType: string;
  essayText: string;
  timeTaken: number;
}

export interface Task2Result {
  id: number;
  prompt: string;
  questionType: string;
  essayText: string;
  wordCount: number;
  timeTaken: number;
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  overallScore: number;
  generalFeedback: string;
  strengths: string;
  weaknesses: string;
  createdAt: string;
}

// ===== API FUNCTIONS =====

/**
 * Bắt đầu bài kiểm tra placement test
 */
export const startPlacementTest = async (data: StartTestRequest): Promise<StartTestResponse> => {
  return apiClient.post<unknown, StartTestResponse>('/placement-tests/start', data);
};

/**
 * Nộp Task 1 (Academic Writing - mô tả biểu đồ/bảng/đồ thị)
 */
export const submitTask1 = async (testId: number, data: Task1SubmitRequest): Promise<Task1Result> => {
  return apiClient.post<unknown, Task1Result>(`/placement-tests/${testId}/task1/submit`, data);
};

/**
 * Nộp Task 2 (Essay - thảo luận quan điểm)
 */
export const submitTask2 = async (testId: number, data: Task2SubmitRequest): Promise<Task2Result> => {
  return apiClient.post<unknown, Task2Result>(`/placement-tests/${testId}/task2/submit`, data);
};
