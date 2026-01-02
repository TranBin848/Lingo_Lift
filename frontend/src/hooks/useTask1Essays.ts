/**
 * useTask1Essays Hook
 * 
 * Custom hook for fetching all Task 1 essays for current user
 * Handles loading, error states, and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import type { Task1Essay } from '../types/task1-essay';
import api from '../lib/axios';

interface UseTask1EssaysState {
  data: Task1Essay[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching all Task 1 essays for the current user
 * 
 * @returns Object with essays data, loading, error, and refetch function
 * 
 * @example
 * const { data: essays, loading, error, refetch } = useTask1Essays();
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
export function useTask1Essays(): UseTask1EssaysState {
  const [data, setData] = useState<Task1Essay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all essays for current user
      // Note: Backend should filter by authenticated user automatically
      const response = await api.get<Task1Essay[]>('/task1-essays');
      
      // Handle both array response and object response
      const essays = Array.isArray(response.data) ? response.data : [];
      setData(essays);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch essays';
      setError(errorMessage);
      console.error('Error fetching Task 1 essays:', err);
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

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic usage:
 * ```tsx
 * function MyEssaysList() {
 *   const { data: essays, loading } = useTask1Essays();
 *   
 *   if (loading) return <LoadingSpinner />;
 *   
 *   return (
 *     <div>
 *       {essays.map(essay => (
 *         <EssayCard key={essay.id} essay={essay} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 * 
 * 2. With error handling:
 * ```tsx
 * function MyEssaysList() {
 *   const { data: essays, loading, error, refetch } = useTask1Essays();
 *   
 *   if (loading) return <LoadingSpinner />;
 *   
 *   if (error) {
 *     return (
 *       <div>
 *         <p>Error: {error}</p>
 *         <button onClick={refetch}>Retry</button>
 *       </div>
 *     );
 *   }
 *   
 *   return <EssayList essays={essays} />;
 * }
 * ```
 * 
 * 3. With refetch after action:
 * ```tsx
 * function EssayManager() {
 *   const { data: essays, refetch } = useTask1Essays();
 *   const { submit } = useCreateTask1Essay();
 *   
 *   const handleSubmit = async (essayData) => {
 *     await submit(essayData);
 *     await refetch(); // Refresh list
 *   };
 *   
 *   return <EssayForm onSubmit={handleSubmit} />;
 * }
 * ```
 */
