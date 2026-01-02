/**
 * Task 2 Topics Hooks
 * 
 * Custom React hooks for fetching and managing Task 2 topic data
 * Handles loading states, error handling, and data caching
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  Task2Topic,
  GetTask2TopicsParams,
  GetRecommendedTask2TopicsParams
} from '../types/task2-topic';
import {
  getTask2Topics as fetchTask2Topics,
  getTask2TopicById as fetchTask2TopicById,
  getRecommendedTask2Topics as fetchRecommendedTask2Topics,
  getRandomTask2Topic as fetchRandomTask2Topic
} from '../services/task2Topic.service';

/**
 * Hook state interface
 */
interface UseTask2TopicsState {
  data: Task2Topic[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching Task 2 topics list with filtering
 * 
 * @param params - Query parameters for filtering topics
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: topics, loading, error, refetch } = useTask2Topics({ 
 *   taskType: 'Academic',
 *   category: 'Education'
 * });
 */
export function useTask2Topics(params: GetTask2TopicsParams): UseTask2TopicsState {
  const [data, setData] = useState<Task2Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topics = await fetchTask2Topics(params);
      setData(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Task 2 topics';
      setError(errorMessage);
      console.error('Error fetching Task 2 topics:', err);
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
interface UseTask2TopicDetailState {
  data: Task2Topic | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching a single Task 2 topic by ID
 * 
 * @param id - Topic ID to fetch
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: topic, loading, error } = useTask2TopicDetail(456);
 */
export function useTask2TopicDetail(id: number | null): UseTask2TopicDetailState {
  const [data, setData] = useState<Task2Topic | null>(null);
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
      const topic = await fetchTask2TopicById(id);
      setData(topic);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch topic detail';
      setError(errorMessage);
      console.error('Error fetching Task 2 topic detail:', err);
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
 * Hook for fetching recommended Task 2 topics
 * 
 * @param params - Query parameters (count and taskType)
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: recommended, loading } = useRecommendedTask2Topics({ 
 *   count: 5, 
 *   taskType: 'Academic' 
 * });
 */
export function useRecommendedTask2Topics(
  params: GetRecommendedTask2TopicsParams
): UseTask2TopicsState {
  const [data, setData] = useState<Task2Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topics = await fetchRecommendedTask2Topics(params);
      setData(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommended topics';
      setError(errorMessage);
      console.error('Error fetching recommended Task 2 topics:', err);
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
 * Hook for fetching a random Task 2 topic
 * 
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data: randomTopic, loading, refetch } = useRandomTask2Topic();
 * // Call refetch() to get a new random topic
 */
export function useRandomTask2Topic(): UseTask2TopicDetailState {
  const [data, setData] = useState<Task2Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topic = await fetchRandomTask2Topic();
      setData(topic);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch random topic';
      setError(errorMessage);
      console.error('Error fetching random Task 2 topic:', err);
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
