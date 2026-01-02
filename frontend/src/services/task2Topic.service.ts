/**
 * Task 2 Topic Service
 * 
 * Service layer for IELTS Writing Task 2 topic API calls
 * Handles all HTTP requests related to Task 2 topics
 */

import api from '../lib/axios';
import type {
  Task2Topic,
  Task2TopicListResponse,
  GetTask2TopicsParams,
  GetRecommendedTask2TopicsParams
} from '../types/task2-topic';

/**
 * Get all Task 2 topics with optional filtering
 * 
 * @param params - Query parameters for filtering
 * @returns Promise with list of topics
 * 
 * @example
 * const topics = await getTask2Topics({ taskType: 'Academic', category: 'Education' });
 */
export async function getTask2Topics(params: GetTask2TopicsParams): Promise<Task2Topic[]> {
  const response = await api.get<Task2TopicListResponse>('/task2-topics', {
    params
  });
  return response.data.items;
}

/**
 * Get a single Task 2 topic by ID
 * 
 * @param id - Topic ID
 * @returns Promise with topic detail
 * 
 * @example
 * const topic = await getTask2TopicById(456);
 */
export async function getTask2TopicById(id: number): Promise<Task2Topic> {
  const response = await api.get<Task2Topic>(`/task2-topics/${id}`);
  return response.data;
}

/**
 * Get recommended Task 2 topics for the user
 * Based on user's level and practice history
 * 
 * @param params - Query parameters (count and taskType)
 * @returns Promise with array of recommended topics
 * 
 * @example
 * const recommended = await getRecommendedTask2Topics({ count: 5, taskType: 'Academic' });
 */
export async function getRecommendedTask2Topics(
  params: GetRecommendedTask2TopicsParams
): Promise<Task2Topic[]> {
  const response = await api.get<Task2Topic[]>('/task2-topics/recommended', {
    params
  });
  return response.data;
}

/**
 * Get a random Task 2 topic
 * Useful for quick practice or testing
 * 
 * @returns Promise with a random topic
 * 
 * @example
 * const randomTopic = await getRandomTask2Topic();
 */
export async function getRandomTask2Topic(): Promise<Task2Topic> {
  const response = await api.get<Task2Topic>('/task2-topics/random');
  return response.data;
}
