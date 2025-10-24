// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// App Configuration
export const APP_NAME = 'Daily English'
export const APP_VERSION = '1.0.0'

// Routes
export const ROUTES = {
  HOME: '/',
  LISTENING: '/listening',
  SPEAKING: '/speaking',
  READING: '/reading',
  WRITING: '/writing',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
} as const

// Skills
export const SKILLS = {
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  READING: 'reading',
  WRITING: 'writing',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const
