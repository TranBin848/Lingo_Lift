/**
 * Task 2 Topic Types
 * 
 * Types for IELTS Writing Task 2 topics and API responses
 */

export type Task2Type = 'Academic' | 'General';

/**
 * Task 2 Topic
 * Represents a single IELTS Writing Task 2 topic/question
 */
export interface Task2Topic {
  id: number;
  taskType: Task2Type;
  category: string;
  topic: string;
  prompt: string; // Changed from 'question' to match backend
  questionType: string; // e.g., 'opinion', 'discussion', 'problem_solution'
  difficulty?: string;
  estimatedBandLevel?: number;
  frequency?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Task 2 Topic List Response
 * Response structure for the topics list endpoint
 */
export interface Task2TopicListResponse {
  items: Task2Topic[];
}

/**
 * Query parameters for getting Task 2 topics list
 */
export interface GetTask2TopicsParams {
  taskType: Task2Type;
  category?: string;
}

/**
 * Query parameters for getting recommended topics
 */
export interface GetRecommendedTask2TopicsParams {
  count: number;
  taskType: Task2Type;
}
