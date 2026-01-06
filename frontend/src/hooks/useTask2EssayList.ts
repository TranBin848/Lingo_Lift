/**
 * Hook for fetching Task 2 essay list
 */

import { useState, useEffect, useCallback } from 'react';
import { getAllTask2Essays } from '../services/task2Essay.service';
import type { Task2EssayQueryParams, Task2EssayListResponse } from '../types/task2-essay';

/**
 * Hook to fetch paginated list of Task 2 essays
 * 
 * @param params - Query parameters for filtering
 * @returns Hook result with essay list data, loading state, and refetch function
 * 
 * @example
 * const { data, isLoading, error, refetch } = useTask2EssayList({ 
 *   status: 'Graded',
 *   page: 1,
 *   pageSize: 10
 * });
 */
export function useTask2EssayList(params?: Task2EssayQueryParams) {
  const [data, setData] = useState<Task2EssayListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getAllTask2Essays(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch essays'));
      console.error('Error fetching Task 2 essays:', err);
    } finally {
      setIsLoading(false);
    }
  }, [params?.status, params?.task2TopicId, params?.page, params?.pageSize, params?.sortBy, params?.sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
