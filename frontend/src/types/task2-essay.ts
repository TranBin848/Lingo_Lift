/**
 * Task 2 Essay Types
 * 
 * Type definitions for Task 2 Essay submission and retrieval
 * Based on backend API schema
 */

/**
 * Task 2 Essay interface
 * Represents a submitted Task 2 essay
 */
export interface Task2Essay {
  id: number;
  user_id: number;
  task2_topic_id: number;
  essay_text: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Payload for creating a new Task 2 essay
 */
export interface CreateTask2EssayPayload {
  task2_topic_id: number;
  essay_text: string;
}

/**
 * Response from create Task 2 essay endpoint
 */
export interface CreateTask2EssayResponse {
  id: number;
  user_id: number;
  task2_topic_id: number;
  essay_text: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Submit essay:
 * ```typescript
 * const payload: CreateTask2EssayPayload = {
 *   task2_topic_id: 123,
 *   essay_text: "Some people believe that..."
 * };
 * 
 * const result = await createTask2Essay(payload);
 * console.log(result.id); // Essay ID
 * ```
 * 
 * 2. Get essay detail:
 * ```typescript
 * const essay: Task2Essay = await getTask2EssayById(456);
 * console.log(essay.essay_text);
 * ```
 * 
 * 3. Get essays by topic:
 * ```typescript
 * const essays: Task2Essay[] = await getTask2EssaysByTopic(123);
 * essays.forEach(essay => console.log(essay.word_count));
 * ```
 */
