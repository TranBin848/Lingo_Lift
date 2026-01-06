/**
 * Task 1 Essay Service
 * 
 * Service layer for IELTS Writing Task 1 essay API calls
 * Handles essay submission, retrieval, and management
 */

import api from '../lib/axios';
import type { Task1Essay, CreateTask1EssayPayload, Task1EssayQueryParams, Task1EssayListResponse } from '../types/task1-essay';

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
 * Get all Task 1 essays with optional filters
 * Returns paginated list of user's essays
 * 
 * @param params - Query parameters for filtering
 * @returns Promise with paginated essay list
 * 
 * @example
 * const result = await getAllTask1Essays({ status: 'Graded', page: 1, pageSize: 10 });
 */
export async function getAllTask1Essays(params?: Task1EssayQueryParams): Promise<Task1EssayListResponse> {
  // Convert camelCase to PascalCase for .NET backend
  const queryParams: Record<string, string> = {};
  
  if (params?.status) queryParams.Status = params.status;
  if (params?.task1TopicId) queryParams.Task1TopicId = params.task1TopicId.toString();
  if (params?.fromDate) queryParams.FromDate = params.fromDate;
  if (params?.toDate) queryParams.ToDate = params.toDate;
  if (params?.minWordCount) queryParams.MinWordCount = params.minWordCount.toString();
  if (params?.maxWordCount) queryParams.MaxWordCount = params.maxWordCount.toString();
  if (params?.page) queryParams.Page = params.page.toString();
  if (params?.pageSize) queryParams.PageSize = params.pageSize.toString();
  if (params?.sortBy) queryParams.SortBy = params.sortBy;
  if (params?.sortOrder) queryParams.SortOrder = params.sortOrder;
  
  const response = await api.get<Task1EssayListResponse>('/task1-essays', { params: queryParams });
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
