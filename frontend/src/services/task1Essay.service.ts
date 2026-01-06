/**
 * Task 1 Essay Service
 * 
 * Service layer for IELTS Writing Task 1 essay API calls
 * Handles essay submission, retrieval, and management
 */

import api from '../lib/axios';
import type { Task1Essay, CreateTask1EssayPayload, SubmitTask1EssayResponse } from '../types/task1-essay';

/**
 * Create a new Task 1 essay (save as draft)
 * 
 * @param payload - Essay content and topic ID
 * @returns Promise with created essay
 * 
 * @example
 * const essay = await createTask1Essay({
 *   task1TopicId: 123,
 *   essayText: 'The chart shows...',
 *   wordCount: 150,
 *   timeTaken: 1200
 * });
 */
export async function createTask1Essay(payload: CreateTask1EssayPayload): Promise<Task1Essay> {
  // Transform camelCase to PascalCase for .NET backend
  const requestBody = {
    Task1TopicId: payload.task1TopicId,
    TaskType: payload.taskType,
    EssayText: payload.essayText,
    WordCount: payload.wordCount,
    TimeTaken: payload.timeTaken,
  };
  const response = await api.post<{ message: string; data: Task1Essay }>('/task1-essays', requestBody);
  return response.data.data;
}

/**
 * Submit a Task 1 essay for grading
 * 
 * @param essayId - Essay ID to submit
 * @returns Promise with graded essay including feedback
 * 
 * @example
 * const result = await submitTask1Essay(123);
 * console.log(result.data.feedback);
 */
export async function submitTask1Essay(essayId: number): Promise<Task1Essay> {
  const response = await api.post<{ message: string; data: Task1Essay }>(`/task1-essays/${essayId}/submit`);
  return response.data.data;
}

/**
 * Create and submit a Task 1 essay in one step
 * First creates the essay, then submits it for grading
 * 
 * @param payload - Essay content and topic ID
 * @returns Promise with graded essay including feedback
 */
export async function createAndSubmitTask1Essay(payload: CreateTask1EssayPayload): Promise<Task1Essay> {
  // Step 1: Create the essay
  const essay = await createTask1Essay(payload);
  
  // Step 2: Submit for grading (backend will get essay data from database using id)
  const result = await submitTask1Essay(essay.id);
  
  return result;
}

/**
 * Get a single Task 1 essay by ID
 * 
 * @param id - Essay ID
 * @returns Promise with essay detail
 * 
 * @example
 * const essay = await getTask1EssayById(456);
 */
export async function getTask1EssayById(id: number): Promise<Task1Essay> {
  const response = await api.get<Task1Essay>(`/task1-essays/${id}`);
  return response.data;
}

/**
 * Get all essays for a specific Task 1 topic
 * Returns user's essay submission history for this topic
 * 
 * @param task1TopicId - Topic ID
 * @returns Promise with array of essays
 * 
 * @example
 * const essays = await getTask1EssaysByTopic(123);
 */
export async function getTask1EssaysByTopic(task1TopicId: number): Promise<Task1Essay[]> {
  const response = await api.get<Task1Essay[]>(`/task1-essays/by-topic/${task1TopicId}`);
  return response.data;
}
