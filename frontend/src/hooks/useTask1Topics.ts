/**
 * Task 1 Topics Hooks
 * 
 * Custom React hooks for fetching and managing Task 1 topic data
 * Handles loading states, error handling, and data caching
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  Task1Topic,
  GetTask1TopicsParams,
  GetRecommendedTask1TopicsParams
} from '../types/task1-topic';
import {
  getTask1Topics as fetchTask1Topics,
  getTask1TopicById as fetchTask1TopicById,
  getRecommendedTask1Topics as fetchRecommendedTask1Topics,
  getRandomTask1Topic as fetchRandomTask1Topic
} from '../services/task1Topic.service';

/**
 * Hook state interface
 */
interface UseTask1TopicsState {
  data: Task1Topic[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching Task 1 topics list with filtering
 * 
 * @param params - Query parameters for filtering topics
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: topics, loading, error, refetch } = useTask1Topics({ 
 *   taskType: 'Academic',
 *   category: 'Education'
 * });
 */
export function useTask1Topics(params: GetTask1TopicsParams): UseTask1TopicsState {
  const [data, setData] = useState<Task1Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topics = await fetchTask1Topics(params);
      setData(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Task 1 topics';
      setError(errorMessage);
      console.error('Error fetching Task 1 topics:', err);
    } finally {
      setLoading(false);
    }
  }, [params.taskType, params.category]);

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
 * Hook state interface for single topic
 */
interface UseTask1TopicDetailState {
  data: Task1Topic | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching a single Task 1 topic by ID
 * 
 * @param id - Topic ID to fetch
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: topic, loading, error } = useTask1TopicDetail(123);
 */
export function useTask1TopicDetail(id: number | null): UseTask1TopicDetailState {
  const [data, setData] = useState<Task1Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (id === null) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const topic = await fetchTask1TopicById(id);
      setData(topic);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch topic detail';
      setError(errorMessage);
      console.error('Error fetching Task 1 topic detail:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

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
 * Hook for fetching recommended Task 1 topics
 * 
 * @param params - Query parameters (count and taskType)
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: recommended, loading } = useRecommendedTask1Topics({ 
 *   count: 5, 
 *   taskType: 'Academic' 
 * });
 */
export function useRecommendedTask1Topics(
  params: GetRecommendedTask1TopicsParams
): UseTask1TopicsState {
  const [data, setData] = useState<Task1Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topics = await fetchRecommendedTask1Topics(params);
      setData(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommended topics';
      setError(errorMessage);
      console.error('Error fetching recommended Task 1 topics:', err);
    } finally {
      setLoading(false);
    }
  }, [params.count, params.taskType]);

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
 * Hook for fetching a random Task 1 topic
 * 
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: randomTopic, loading, refetch } = useRandomTask1Topic();
 * // Call refetch() to get a new random topic
 */
export function useRandomTask1Topic(): UseTask1TopicDetailState {
  const [data, setData] = useState<Task1Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topic = await fetchRandomTask1Topic();
      setData(topic);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch random topic';
      setError(errorMessage);
      console.error('Error fetching random Task 1 topic:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
