/**
 * useCreateTask1Essay Hook
 * 
 * Custom hook for submitting Task 1 essays
 * Handles loading, error, and success states
 */

import { useState } from 'react';
import type { CreateTask1EssayPayload, Task1Essay } from '../types/task1-essay';
import { createTask1Essay } from '../services/task1Essay.service';

interface UseCreateTask1EssayState {
  data: Task1Essay | null;
  loading: boolean;
  error: string | null;
  submit: (payload: CreateTask1EssayPayload) => Promise<Task1Essay | null>;
  reset: () => void;
}

/**
 * Hook for creating/submitting a Task 1 essay
 * 
 * @returns Object with submit function, data, loading, error states
 * 
 * @example
 * const { submit, loading, error, data } = useCreateTask1Essay();
 * 
 * const handleSubmit = async () => {
 *   const essay = await submit({
 *     task1TopicId: 123,
 *     content: essayText
 *   });
 *   if (essay) {
 *     console.log('Essay submitted:', essay.id);
 *   }
 * };
 */
export function useCreateTask1Essay(): UseCreateTask1EssayState {
  const [data, setData] = useState<Task1Essay | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: CreateTask1EssayPayload): Promise<Task1Essay | null> => {
    try {
      setLoading(true);
      setError(null);
      const essay = await createTask1Essay(payload);
      setData(essay);
      return essay;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit essay';
      setError(errorMessage);
      console.error('Error submitting Task 1 essay:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    submit,
    reset
  };
}
