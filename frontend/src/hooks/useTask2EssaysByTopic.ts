/**
 * useTask2EssaysByTopic Hook
 * 
 * Custom hook for fetching essays by topic ID
 * Handles loading, error states, and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import type { Task2Essay } from '../types/task2-essay';
import { getTask2EssaysByTopic } from '../services/task2Essay.service';

interface UseTask2EssaysByTopicState {
  data: Task2Essay[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching all essays for a specific Task 2 topic
 * 
 * @param task2TopicId - Topic ID to fetch essays for (null to skip fetching)
 * @returns Object with essays data, loading, error, and refetch function
 * 
 * @example
 * const { data: essays, loading, error, refetch } = useTask2EssaysByTopic(123);
 * 
 * // Refetch after submitting new essay
 * await submit(newEssay);
 * await refetch();
 */
export function useTask2EssaysByTopic(task2TopicId: number | null): UseTask2EssaysByTopicState {
  const [data, setData] = useState<Task2Essay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (task2TopicId === null) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const essays = await getTask2EssaysByTopic(task2TopicId);
      setData(essays);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch essays';
      setError(errorMessage);
      console.error('Error fetching Task 2 essays by topic:', err);
    } finally {
      setLoading(false);
    }
  }, [task2TopicId]);

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
