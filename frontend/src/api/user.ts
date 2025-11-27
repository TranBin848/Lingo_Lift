import { apiClient } from './client'
import type { User, ApiResponse } from '../types'

export interface UpdateProfileData {
  displayName?: string
  dateOfBirth?: string
  phone?: string
  bio?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

// Update user profile
export const updateProfile = async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
  return apiClient.patch<unknown, ApiResponse<User>>('/users/profile', data)
}

// Change password
export const changePassword = async (data: ChangePasswordData): Promise<ApiResponse<null>> => {
  return apiClient.patch<unknown, ApiResponse<null>>('/users/change-password', data)
}

// Get current user info
export const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<unknown, User>('/users/me')
}
