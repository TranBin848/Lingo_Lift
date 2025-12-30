import { useState, useEffect } from 'react';
import type { LearningPath, Phase } from '../types/learningPath';
import { getCurrentLearningPath, getLearningPathById, getPhaseById } from '../api/learningPath';

export const useLearningPath = () => {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentLearningPath();
        setLearningPath(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load learning path');
        console.error('Error fetching learning path:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentLearningPath();
      setLearningPath(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load learning path');
      console.error('Error fetching learning path:', err);
    } finally {
      setLoading(false);
    }
  };

  return { learningPath, loading, error, refetch };
};

export const useLearningPathById = (id: number | null) => {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchLearningPath = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLearningPathById(id);
        setLearningPath(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load learning path');
        console.error('Error fetching learning path:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [id]);

  return { learningPath, loading, error };
};

export const usePhase = (phaseId: number | null) => {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!phaseId) {
      setLoading(false);
      return;
    }

    const fetchPhase = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPhaseById(phaseId);
        setPhase(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load phase');
        console.error('Error fetching phase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhase();
  }, [phaseId]);

  return { phase, loading, error };
};
