import { apiClient } from './client';
import type { LearningPath, Phase } from '../types/learningPath';

// Lấy lộ trình học hiện tại
export const getCurrentLearningPath = async (): Promise<LearningPath> => {
  const response = await apiClient.get('/learning-paths/current');
  return response.data;
};

// Lấy chi tiết lộ trình học theo ID
export const getLearningPathById = async (id: number): Promise<LearningPath> => {
  const response = await apiClient.get(`/learning-paths/${id}`);
  return response.data;
};

// Lấy các chặng của lộ trình
export const getLearningPathPhases = async (learningPathId: number): Promise<Phase[]> => {
  const response = await apiClient.get(`/learning-paths/${learningPathId}/phases`);
  return response.data;
};

// Lấy một chặng cụ thể
export const getPhaseById = async (phaseId: number): Promise<Phase> => {
  const response = await apiClient.get(`/learning-paths/phases/${phaseId}`);
  return response.data;
};
