import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { API_BASE_URL } from '../constants'
import { useAuthStore } from '../stores/useAuth.Store'

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds default timeout (increased from 10s)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies for refresh-token
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from Zustand store (same as lib/axios.ts)
    const { accessToken } = useAuthStore.getState()
    
    console.log('Request Interceptor:', {
      url: config.url,
      method: config.method,
      hasToken: !!accessToken,
      token: accessToken ? accessToken.substring(0, 20) + '...' : 'none'
    });
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    // Temporarily disable auto-logout for debugging
    // if (error.response?.status === 401) {
    //   localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    //   localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    //   window.location.href = '/login'
    // }
    return Promise.reject(error.response?.data || error.message)
  }
)
