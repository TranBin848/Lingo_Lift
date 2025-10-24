import type { Skill } from '../models/lesson'

export type { Skill, Lesson, LessonsBySkill } from '../models/lesson'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Progress Types
export interface UserProgress {
  userId: string
  lessonId: string
  skill: Skill
  completed: boolean
  score?: number
  completedAt?: string
}
