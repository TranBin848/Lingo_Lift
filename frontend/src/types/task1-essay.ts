/**
 * Task 1 Essay Types
 * 
 * Types for IELTS Writing Task 1 essay submissions and responses
 */

/**
 * Task 1 Essay
 * Represents a submitted Task 1 essay
 */
export interface Task1Essay {
  id: number;
  task1TopicId: number;
  content: string;
  createdAt: string;
}

/**
 * Create Task 1 Essay Payload
 * Request body for creating a new essay submission
 */
export interface CreateTask1EssayPayload {
  task1TopicId: number;
  content: string;
}

/**
 * Task 1 Essay with Topic Info (for UI display)
 * Extended type that includes topic information
 */
export interface Task1EssayWithTopic extends Task1Essay {
  topicTitle?: string;
  topicQuestion?: string;
}
