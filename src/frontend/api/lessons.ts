import { apiClient } from './client'
import type { Lesson, LessonsBySkill, ApiResponse } from '../types'

// Get all lessons grouped by skill
export const getAllLessons = async (): Promise<LessonsBySkill> => {
  return apiClient.get<unknown, LessonsBySkill>('/lessons')
}

// Get lessons by skill
export const getLessonsBySkill = async (skill: string): Promise<Lesson[]> => {
  return apiClient.get<unknown, Lesson[]>(`/lessons/${skill}`)
}

// Get lesson by ID
export const getLessonById = async (id: string): Promise<Lesson> => {
  return apiClient.get<unknown, Lesson>(`/lessons/detail/${id}`)
}

// Submit lesson completion
export const submitLessonCompletion = async (
  lessonId: string,
  data: { score?: number; answer?: string }
): Promise<ApiResponse<{ correct: boolean; score: number }>> => {
  return apiClient.post<unknown, ApiResponse<{ correct: boolean; score: number }>>(
    `/lessons/${lessonId}/complete`,
    data
  )
}
