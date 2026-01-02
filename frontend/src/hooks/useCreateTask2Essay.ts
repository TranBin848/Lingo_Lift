/**
 * useCreateTask2Essay Hook
 * 
 * Custom hook for submitting Task 2 essays
 * Manages loading, error, and success states
 */

import { useState } from 'react';
import type { CreateTask2EssayPayload, CreateTask2EssayResponse } from '../types/task2-essay';
import { createTask2Essay } from '../services/task2Essay.service';

interface UseCreateTask2EssayState {
  data: CreateTask2EssayResponse | null;
  isSubmitting: boolean;
  error: string | null;
  submit: (payload: CreateTask2EssayPayload) => Promise<CreateTask2EssayResponse>;
  reset: () => void;
  resetError: () => void;
}

/**
 * Hook for submitting Task 2 essays
 * 
 * @returns Object with submit function, loading/error states, and reset functions
 * 
 * @example
 * function EssayForm() {
 *   const { submit, isSubmitting, error } = useCreateTask2Essay();
 *   
 *   const handleSubmit = async () => {
 *     try {
 *       const result = await submit({
 *         task2_topic_id: 123,
 *         essay_text: content
 *       });
 *       console.log('Essay submitted:', result.id);
 *     } catch (err) {
 *       console.error('Submission failed');
 *     }
 *   };
 *   
 *   return (
 *     <button onClick={handleSubmit} disabled={isSubmitting}>
 *       {isSubmitting ? 'Submitting...' : 'Submit'}
 *     </button>
 *   );
 * }
 */
export function useCreateTask2Essay(): UseCreateTask2EssayState {
  const [data, setData] = useState<CreateTask2EssayResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: CreateTask2EssayPayload): Promise<CreateTask2EssayResponse> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const result = await createTask2Essay(payload);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit essay';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setData(null);
    setIsSubmitting(false);
    setError(null);
  };

  const resetError = () => {
    setError(null);
  };

  return {
    data,
    isSubmitting,
    error,
    submit,
    reset,
    resetError
  };
}
