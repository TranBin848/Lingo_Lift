/**
 * Task 1 Topic Types
 * 
 * Types for IELTS Writing Task 1 topics and API responses
 */

export type Task1Type = 'Academic' | 'General';

/**
 * Task 1 Topic
 * Represents a single IELTS Writing Task 1 topic/question
 */
export interface Task1Topic {
  id: number;
  taskType: Task1Type;
  category: string;
  title: string;
  prompt: string; // Changed from 'question' to match backend
  imageUrl?: string; // Optional image URL for charts/graphs
  questionType?: string; // Optional question type
  chartType?: string; // Chart type (table, bar, line, etc.)
  difficulty?: string;
  estimatedBandLevel?: number;
  frequency?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Task 1 Topic List Response
 * Response structure for the topics list endpoint
 */
export interface Task1TopicListResponse {
  items: Task1Topic[];
}

/**
 * Query parameters for getting Task 1 topics list
 */
export interface GetTask1TopicsParams {
  taskType: Task1Type;
  category?: string;
}

/**
 * Query parameters for getting recommended topics
 */
export interface GetRecommendedTask1TopicsParams {
  count: number;
  taskType: Task1Type;
}
