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
  username: string
  displayName: string
  avatarUrl?: string
  bio?: string
  phone?: string
  role: 'user' | 'admin' | 'teacher'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

// .NET API Auth Types
export interface RegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  email: string
  fullName: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  email: string
  fullName: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
  email: string
  fullName: string
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
