/**
 * Task 2 Essay Types
 * 
 * Type definitions for Task 2 Essay submission and retrieval
 * Based on backend API schema
 */

/**
 * Query parameters for fetching Task 2 essays
 */
export interface Task2EssayQueryParams {
  status?: 'Draft' | 'Submitted' | 'Graded';
  task2TopicId?: number;
  fromDate?: string;
  toDate?: string;
  minWordCount?: number;
  maxWordCount?: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response for Task 2 essays
 */
export interface Task2EssayListResponse {
  items: Task2Essay[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Task 2 Essay interface
 * Represents a submitted Task 2 essay
 */
export interface Task2Essay {
  id: number;
  userId?: number;
  task2TopicId: number;
  taskType?: string;
  essayText: string;
  wordCount: number;
  timeTaken?: number;
  version?: number;
  status: 'Draft' | 'Submitted' | 'Graded';
  submittedAt?: string;
  createdAt: string;
  updatedAt?: string;
  topicPrompt?: string;
  previousVersionId?: number | null;
  hasFeedback?: boolean;
  feedback?: Task2ApiFeedback;
}

/**
 * Payload for creating a new Task 2 essay
 */
export interface CreateTask2EssayPayload {
  task2TopicId: number;
  taskType: 'Academic' | 'General';
  essayText: string;
  wordCount: number;
  timeTaken: number;
}

/**
 * Response from create Task 2 essay endpoint
 */
export interface CreateTask2EssayResponse {
  id: number;
  userId: number;
  task2TopicId: number;
  essayText: string;
  wordCount: number;
  timeTaken: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * API Feedback Annotation
 */
export interface FeedbackAnnotation {
  id: number;
  type: 'Error' | 'Suggestion' | 'Highlight';
  startIndex: number;
  endIndex: number;
  originalText: string;
  category: string;
  severity: 'Minor' | 'Major' | 'Critical';
  message: string;
  suggestion: string;
}

/**
 * Score detail from API
 */
export interface ApiScoreDetail {
  score: number;
  comments: string;
  strengths: string;
  improvements: string;
}

/**
 * Task 2 API Feedback Response
 */
export interface Task2ApiFeedback {
  id: number;
  taskResponse?: ApiScoreDetail;
  taskAchievement?: ApiScoreDetail;
  coherenceCohesion: ApiScoreDetail;
  lexicalResource: ApiScoreDetail;
  grammaticalRange: ApiScoreDetail;
  overallScore: number;
  overallComments: string;
  recommendations: string;
  estimatedBandScore: number;
  aiModel: string;
  processingTimeMs: number | null;
  createdAt: string;
  annotations: FeedbackAnnotation[];
}

/**
 * Submit Essay Response
 */
export interface SubmitTask2EssayResponse {
  message: string;
  data: Task2Essay;
}
