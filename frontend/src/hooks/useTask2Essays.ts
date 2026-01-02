/**
 * useTask2Essays Hook
 * 
 * Custom hook for fetching all Task 2 essays for current user
 * Handles loading, error states, and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import type { Task2Essay } from '../types/task2-essay';
import api from '../lib/axios';

interface UseTask2EssaysState {
  data: Task2Essay[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching all Task 2 essays for the current user
 * 
 * @returns Object with essays data, loading, error, and refetch function
 * 
 * @example
 * const { data: essays, loading, error, refetch } = useTask2Essays();
 * 
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * 
 * return (
 *   <div>
 *     {essays.map(essay => (
 *       <div key={essay.id}>{essay.essay_text}</div>
 *     ))}
 *   </div>
 * );
 */
export function useTask2Essays(): UseTask2EssaysState {
  const [data, setData] = useState<Task2Essay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all essays for current user
      // Note: Backend should filter by authenticated user automatically
      const response = await api.get<Task2Essay[]>('/task2-essays');
      
      // Handle both array response and object response
      const essays = Array.isArray(response.data) ? response.data : [];
      setData(essays);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch essays';
      setError(errorMessage);
      console.error('Error fetching Task 2 essays:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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
