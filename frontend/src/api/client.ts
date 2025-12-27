import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { API_BASE_URL } from '../constants'

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies for refresh-token
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from Zustand persist storage
    const authStorage = localStorage.getItem('auth-storage')
    let token = null
    
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage)
        token = parsed.state?.accessToken
      } catch (e) {
        console.error('Failed to parse auth storage:', e)
      }
    }
    
    console.log('Request Interceptor:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      token: token ? token.substring(0, 20) + '...' : 'none'
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
