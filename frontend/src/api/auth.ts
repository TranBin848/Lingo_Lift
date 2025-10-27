import { apiClient } from './client'
import type { User, AuthResponse, ApiResponse } from '../types'

// Register new user
export const register = async (data: {
  name: string
  email: string
  password: string
}): Promise<AuthResponse> => {
  return apiClient.post<unknown, AuthResponse>('/auth/register', data)
}

// Login user
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  return apiClient.post<unknown, AuthResponse>('/auth/login', data)
}

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<unknown, User>('/auth/me')
}

// Logout
export const logout = async (): Promise<ApiResponse<null>> => {
  return apiClient.post<unknown, ApiResponse<null>>('/auth/logout')
}
