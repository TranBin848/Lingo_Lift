/**
 * Task 2 Essay Service
 * 
 * Service layer for Task 2 Essay API operations
 * Handles all HTTP requests related to Task 2 essays
 */

import api from '../lib/axios';
import type {
  Task2Essay,
  CreateTask2EssayPayload,
  CreateTask2EssayResponse
} from '../types/task2-essay';

/**
 * Create a new Task 2 essay
 * 
 * @param payload - Essay data (topic ID and content)
 * @returns Created essay data
 * 
 * @example
 * const newEssay = await createTask2Essay({
 *   task2_topic_id: 123,
 *   essay_text: "Many people believe that technology..."
 * });
 */
export async function createTask2Essay(
  payload: CreateTask2EssayPayload
): Promise<CreateTask2EssayResponse> {
  const response = await api.post<CreateTask2EssayResponse>('/task2-essays', payload);
  return response.data;
}

/**
 * Get Task 2 essay by ID
 * 
 * @param essayId - Essay ID
 * @returns Essay data
 * 
 * @example
 * const essay = await getTask2EssayById(456);
 * console.log(essay.essay_text);
 */
export async function getTask2EssayById(essayId: number): Promise<Task2Essay> {
  const response = await api.get<Task2Essay>(`/task2-essays/${essayId}`);
  return response.data;
}

/**
 * Get all essays for a specific Task 2 topic
 * 
 * @param task2TopicId - Topic ID
 * @returns Array of essays
 * 
 * @example
 * const essays = await getTask2EssaysByTopic(123);
 * console.log(`Found ${essays.length} essays`);
 */
export async function getTask2EssaysByTopic(task2TopicId: number): Promise<Task2Essay[]> {
  const response = await api.get<Task2Essay[]>(`/task2-essays/by-topic/${task2TopicId}`);
  return response.data;
}
