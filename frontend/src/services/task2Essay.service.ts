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
  CreateTask2EssayResponse,
  Task2EssayQueryParams,
  Task2EssayListResponse
} from '../types/task2-essay';

/**
 * Create a new Task 2 essay (save as draft)
 * 
 * @param payload - Essay data (topic ID and content)
 * @returns Created essay data
 * 
 * @example
 * const newEssay = await createTask2Essay({
 *   task2TopicId: 123,
 *   essayText: "Many people believe that technology...",
 *   wordCount: 250,
 *   timeTaken: 2400
 * });
 */
export async function createTask2Essay(
  payload: CreateTask2EssayPayload
): Promise<CreateTask2EssayResponse> {
  // Transform camelCase to PascalCase for .NET backend
  const requestBody = {
    Task2TopicId: payload.task2TopicId,
    TaskType: payload.taskType,
    EssayText: payload.essayText,
    WordCount: payload.wordCount,
    TimeTaken: payload.timeTaken,
  };
  const response = await api.post<{ message: string; data: CreateTask2EssayResponse }>('/task2-essays', requestBody);
  return response.data.data;
}

/**
 * Submit a Task 2 essay for grading
 * 
 * @param essayId - Essay ID to submit
 * @returns Promise with graded essay including feedback
 * 
 * @example
 * const result = await submitTask2Essay(123);
 * console.log(result.data.feedback);
 */
export async function submitTask2Essay(essayId: number): Promise<Task2Essay> {
  const response = await api.post<{ message: string; data: Task2Essay }>(`/task2-essays/${essayId}/submit`);
  return response.data.data;
}

/**
 * Create and submit a Task 2 essay in one step
 * First creates the essay, then submits it for grading
 * 
 * @param payload - Essay content and topic ID
 * @returns Promise with graded essay including feedback
 */
export async function createAndSubmitTask2Essay(payload: CreateTask2EssayPayload): Promise<Task2Essay> {
  // Step 1: Create the essay
  const essay = await createTask2Essay(payload);
  
  // Step 2: Submit for grading (backend will get essay data from database using id)
  const result = await submitTask2Essay(essay.id);
  
  return result;
}

/**
 * Get all Task 2 essays with optional filters
 * Returns paginated list of user's essays
 * 
 * @param params - Query parameters for filtering
 * @returns Promise with paginated essay list
 * 
 * @example
 * const result = await getAllTask2Essays({ status: 'Graded', page: 1, pageSize: 10 });
 */
export async function getAllTask2Essays(params?: Task2EssayQueryParams): Promise<Task2EssayListResponse> {
  // Convert camelCase to PascalCase for .NET backend
  const queryParams: Record<string, string> = {};
  
  if (params?.status) queryParams.Status = params.status;
  if (params?.task2TopicId) queryParams.Task2TopicId = params.task2TopicId.toString();
  if (params?.fromDate) queryParams.FromDate = params.fromDate;
  if (params?.toDate) queryParams.ToDate = params.toDate;
  if (params?.minWordCount) queryParams.MinWordCount = params.minWordCount.toString();
  if (params?.maxWordCount) queryParams.MaxWordCount = params.maxWordCount.toString();
  if (params?.page) queryParams.Page = params.page.toString();
  if (params?.pageSize) queryParams.PageSize = params.pageSize.toString();
  if (params?.sortBy) queryParams.SortBy = params.sortBy;
  if (params?.sortOrder) queryParams.SortOrder = params.sortOrder;
  
  const response = await api.get<Task2EssayListResponse>('/task2-essays', { params: queryParams });
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
 * console.log(essay.essayText);
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
