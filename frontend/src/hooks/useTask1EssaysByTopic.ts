/**
 * useTask1EssaysByTopic Hook
 * 
 * Custom hook for fetching essays by topic ID
 * Handles loading, error states, and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import type { Task1Essay } from '../types/task1-essay';
import { getTask1EssaysByTopic } from '../services/task1Essay.service';

interface UseTask1EssaysByTopicState {
  data: Task1Essay[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching all essays for a specific Task 1 topic
 * 
 * @param task1TopicId - Topic ID to fetch essays for (null to skip fetching)
 * @returns Object with essays data, loading, error, and refetch function
 * 
 * @example
 * const { data: essays, loading, error, refetch } = useTask1EssaysByTopic(123);
 * 
 * // Refetch after submitting new essay
 * await submit(newEssay);
 * await refetch();
 */
export function useTask1EssaysByTopic(task1TopicId: number | null): UseTask1EssaysByTopicState {
  const [data, setData] = useState<Task1Essay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (task1TopicId === null) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const essays = await getTask1EssaysByTopic(task1TopicId);
      setData(essays);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch essays';
      setError(errorMessage);
      console.error('Error fetching Task 1 essays by topic:', err);
    } finally {
      setLoading(false);
    }
  }, [task1TopicId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
