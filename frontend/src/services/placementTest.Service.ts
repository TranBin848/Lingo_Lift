import api from '../lib/axios'

export interface PlacementTest {
  _id: string
  title: string
  description: string
  version: string
  isActive: boolean
  sections: Section[]
  totalQuestions: number
  totalTimeLimit?: number
  scoringCriteria: {
    bandScores: BandScore[]
  }
  createdBy: {
    _id: string
    displayName: string
    username: string
  }
  updatedBy: {
    _id: string
    displayName: string
    username: string
  }
  createdAt: string
  updatedAt: string
}

export interface Section {
  type: 'pronunciation' | 'grammar' | 'vocabulary' | 'listening' | 'reading'
  title: string
  description: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
}

export interface Question {
  type: 'pronunciation' | 'grammar' | 'vocabulary' | 'listening' | 'reading'
  id: number
  text?: string
  expectedAnswer?: string
  question?: string
  audioUrl?: string
  passage?: string
  options?: string[]
  correctAnswer: string
  subType?: string
  wordBank?: string[]
}

export interface BandScore {
  band: number
  minScore: number
  maxScore: number
  description: string
}

export interface TestResult {
  _id: string
  userId: string
  placementTestId: string
  testVersion: string
  startedAt: string
  completedAt?: string
  isCompleted: boolean
  currentSection?: string
  totalScore: number
  bandScore: number
  level: string
  recommendation: string
}

export const placementTestService = {
  // Get active placement test (for students)
  getActiveTest: async (): Promise<PlacementTest> => {
    const res = await api.get('/placement-tests/active')
    return res.data.data
  },

  // Get all placement tests (for admin/teacher)
  getAllTests: async (params?: {
    page?: number
    limit?: number
    isActive?: boolean
  }): Promise<{
    data: PlacementTest[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }> => {
    const res = await api.get('/placement-tests', { params })
    return res.data
  },

  // Get placement test by ID
  getTestById: async (testId: string): Promise<PlacementTest> => {
    const res = await api.get(`/placement-tests/${testId}`)
    return res.data.data
  },

  // Create new placement test
  createTest: async (testData: Partial<PlacementTest>): Promise<PlacementTest> => {
    const res = await api.post('/placement-tests', testData)
    return res.data.data
  },

  // Update placement test
  updateTest: async (testId: string, testData: Partial<PlacementTest>): Promise<PlacementTest> => {
    const res = await api.put(`/placement-tests/${testId}`, testData)
    return res.data.data
  },

  // Toggle test active status
  toggleTestStatus: async (testId: string, isActive: boolean): Promise<PlacementTest> => {
    const res = await api.patch(`/placement-tests/${testId}/status`, { isActive })
    return res.data.data
  },

  // Delete placement test (admin only)
  deleteTest: async (testId: string): Promise<void> => {
    await api.delete(`/placement-tests/${testId}`)
  }
}

export const testResultService = {
  // Start test session
  startTest: async (placementTestId: string): Promise<TestResult> => {
    const res = await api.post('/test-results/start', { placementTestId })
    return res.data.data
  },

  // Submit section answers
  submitSection: async (testResultId: string, sectionData: {
    sectionType: string
    answers: Array<{
      questionId: number
      userAnswer: string
      timeSpent?: number
    }>
  }): Promise<{
    sectionResult: any
    nextSection: string
    isLastSection: boolean
  }> => {
    const res = await api.post(`/test-results/${testResultId}/submit-section`, sectionData)
    return res.data.data
  },

  // Complete test
  completeTest: async (testResultId: string): Promise<TestResult> => {
    const res = await api.post(`/test-results/${testResultId}/complete`)
    return res.data.data
  },

  // Get user's test results
  getMyResults: async (params?: {
    page?: number
    limit?: number
    isCompleted?: boolean
  }): Promise<{
    data: TestResult[]
    pagination: any
  }> => {
    const res = await api.get('/test-results/my-results', { params })
    return res.data
  }
}