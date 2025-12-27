import { apiClient } from './client'
import type { User, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, RefreshTokenResponse } from '../types'

// Register new user - .NET API
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return apiClient.post<unknown, RegisterResponse>('/Auth/register', data)
}

// Login user - .NET API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post<unknown, LoginResponse>('/Auth/login', data)
}

// Logout - .NET API
export const logout = async (): Promise<void> => {
  return apiClient.post<unknown, void>('/Auth/logout')
}

// Refresh Token - .NET API (uses cookies, withCredentials already set in client)
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  return apiClient.post<unknown, RefreshTokenResponse>('/Auth/refresh-token')
}

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<unknown, User>('/auth/me')
}
