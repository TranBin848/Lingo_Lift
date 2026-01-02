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
  TaskType: string;
  Prompt: string;
  ImageUrl: string;
  EssayText: string;
  TimeTaken: number;
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
  Prompt: string;
  QuestionType: string;
  EssayText: string;
  TimeTaken: number;
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
 * AI grading may take up to 2 minutes
 */
export const submitTask1 = async (testId: number, data: Task1SubmitRequest): Promise<Task1Result> => {
  return apiClient.post<unknown, Task1Result>(
    `/placement-tests/${testId}/task1/submit`, 
    data,
    { timeout: 120000 } // 2 minutes timeout for AI grading
  );
};

/**
 * Nộp Task 2 (Essay - thảo luận quan điểm)
 * AI grading may take up to 2 minutes
 */
export const submitTask2 = async (testId: number, data: Task2SubmitRequest): Promise<Task2Result> => {
  return apiClient.post<unknown, Task2Result>(
    `/placement-tests/${testId}/task2/submit`, 
    data,
    { timeout: 120000 } // 2 minutes timeout for AI grading
  );
};

/**
 * Lấy chi tiết một placement test của user
 */
export const getPlacementTestById = async (testId: number): Promise<StartTestResponse> => {
  return apiClient.get<unknown, StartTestResponse>(`/placement-tests/${testId}`);
};

/**
 * Lấy placement test hiện tại của user
 */
export const getCurrentPlacementTest = async (): Promise<StartTestResponse> => {
  return apiClient.get<unknown, StartTestResponse>('/placement-tests/current');
};
