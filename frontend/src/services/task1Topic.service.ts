/**
 * Task 1 Topic Service
 * 
 * Service layer for IELTS Writing Task 1 topic API calls
 * Handles all HTTP requests related to Task 1 topics
 */

import api from '../lib/axios';
import type {
  Task1Topic,
  Task1TopicListResponse,
  GetTask1TopicsParams,
  GetRecommendedTask1TopicsParams
} from '../types/task1-topic';

/**
 * Get all Task 1 topics with optional filtering
 * 
 * @param params - Query parameters for filtering
 * @returns Promise with list of topics
 * 
 * @example
 * const topics = await getTask1Topics({ taskType: 'Academic', category: 'Education' });
 */
export async function getTask1Topics(params: GetTask1TopicsParams): Promise<Task1Topic[]> {
  const response = await api.get<Task1TopicListResponse>('/task1-topics', {
    params
  });
  return response.data.items;
}

/**
 * Get a single Task 1 topic by ID
 * 
 * @param id - Topic ID
 * @returns Promise with topic detail
 * 
 * @example
 * const topic = await getTask1TopicById(123);
 */
export async function getTask1TopicById(id: number): Promise<Task1Topic> {
  const response = await api.get<Task1Topic>(`/task1-topics/${id}`);
  return response.data;
}

/**
 * Get recommended Task 1 topics for the user
 * Based on user's level and practice history
 * 
 * @param params - Query parameters (count and taskType)
 * @returns Promise with array of recommended topics
 * 
 * @example
 * const recommended = await getRecommendedTask1Topics({ count: 5, taskType: 'Academic' });
 */
export async function getRecommendedTask1Topics(
  params: GetRecommendedTask1TopicsParams
): Promise<Task1Topic[]> {
  const response = await api.get<Task1Topic[]>('/task1-topics/recommended', {
    params
  });
  return response.data;
}

/**
 * Get a random Task 1 topic
 * Useful for quick practice or testing
 * 
 * @returns Promise with a random topic
 * 
 * @example
 * const randomTopic = await getRandomTask1Topic();
 */
export async function getRandomTask1Topic(): Promise<Task1Topic> {
  const response = await api.get<Task1Topic>('/task1-topics/random');
  return response.data;
}
