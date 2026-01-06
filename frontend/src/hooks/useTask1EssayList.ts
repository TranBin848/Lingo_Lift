/**
 * Hook for fetching Task 1 essay list
 */

import { useState, useEffect, useCallback } from 'react';
import { getAllTask1Essays } from '../services/task1Essay.service';
import type { Task1EssayQueryParams, Task1EssayListResponse } from '../types/task1-essay';

/**
 * Hook to fetch paginated list of Task 1 essays
 * 
 * @param params - Query parameters for filtering
 * @returns Hook result with essay list data, loading state, and refetch function
 * 
 * @example
 * const { data, isLoading, error, refetch } = useTask1EssayList({ 
 *   status: 'Graded',
 *   page: 1,
 *   pageSize: 10
 * });
 */
export function useTask1EssayList(params?: Task1EssayQueryParams) {
  const [data, setData] = useState<Task1EssayListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getAllTask1Essays(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch essays'));
      console.error('Error fetching Task 1 essays:', err);
    } finally {
      setIsLoading(false);
    }
  }, [params?.status, params?.task1TopicId, params?.page, params?.pageSize, params?.sortBy, params?.sortOrder]);

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
