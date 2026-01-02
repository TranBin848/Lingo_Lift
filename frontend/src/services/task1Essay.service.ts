/**
 * Task 1 Essay Service
 * 
 * Service layer for IELTS Writing Task 1 essay API calls
 * Handles essay submission, retrieval, and management
 */

import api from '../lib/axios';
import type { Task1Essay, CreateTask1EssayPayload } from '../types/task1-essay';

/**
 * Create/Submit a new Task 1 essay
 * 
 * @param payload - Essay content and topic ID
 * @returns Promise with created essay
 * 
 * @example
 * const essay = await createTask1Essay({
 *   task1TopicId: 123,
 *   content: 'The chart shows...'
 * });
 */
export async function createTask1Essay(payload: CreateTask1EssayPayload): Promise<Task1Essay> {
  const response = await api.post<Task1Essay>('/task1-essays', payload);
  return response.data;
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
