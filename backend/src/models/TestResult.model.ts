import mongoose, { Schema, type Document } from 'mongoose'

// User's answer for a question
export interface IUserAnswer {
  questionId: number
  sectionType: 'pronunciation' | 'grammar' | 'vocabulary' | 'listening' | 'reading'
  userAnswer: string
  isCorrect: boolean
  score: number
  timeSpent?: number // in seconds
}

// Section result
export interface ISectionResult {
  sectionType: 'pronunciation' | 'grammar' | 'vocabulary' | 'listening' | 'reading'
  totalQuestions: number
  correctAnswers: number
  score: number // percentage
  timeSpent?: number // in seconds
  passed: boolean
}

// Main TestResult interface
export interface ITestResult extends Document {
  userId: mongoose.Types.ObjectId
  placementTestId: mongoose.Types.ObjectId
  testVersion: string
  
  // Test session info
  startedAt: Date
  completedAt?: Date
  isCompleted: boolean
  currentSection?: string
  
  // User answers
  userAnswers: IUserAnswer[]
  
  // Section results
  sectionResults: ISectionResult[]
  
  // Overall results
  totalScore: number // percentage
  bandScore: number
  level: string
  recommendation: string
  
  // Metadata
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

const userAnswerSchema = new Schema({
  questionId: { type: Number, required: true },
  sectionType: {
    type: String,
    enum: ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading'],
    required: true
  },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  score: { type: Number, required: true, min: 0 },
  timeSpent: { type: Number, min: 0 } // in seconds
}, { _id: false })

const sectionResultSchema = new Schema({
  sectionType: {
    type: String,
    enum: ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading'],
    required: true
  },
  totalQuestions: { type: Number, required: true, min: 0 },
  correctAnswers: { type: Number, required: true, min: 0 },
  score: { type: Number, required: true, min: 0, max: 100 },
  timeSpent: { type: Number, min: 0 }, // in seconds
  passed: { type: Boolean, required: true }
}, { _id: false })

const testResultSchema = new Schema<ITestResult>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  placementTestId: {
    type: Schema.Types.ObjectId,
    ref: 'PlacementTest',
    required: true
  },
  testVersion: {
    type: String,
    required: true
  },
  
  // Test session info
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  currentSection: {
    type: String,
    enum: ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading']
  },
  
  // User answers
  userAnswers: [userAnswerSchema],
  
  // Section results
  sectionResults: [sectionResultSchema],
  
  // Overall results
  totalScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  bandScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 1
  },
  level: {
    type: String,
    default: 'Beginner'
  },
  recommendation: {
    type: String,
    default: ''
  },
  
  // Metadata
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
})

// Indexes for better performance
testResultSchema.index({ userId: 1 })
testResultSchema.index({ placementTestId: 1 })
testResultSchema.index({ userId: 1, placementTestId: 1 })
testResultSchema.index({ isCompleted: 1 })
testResultSchema.index({ createdAt: -1 })

// Compound index for user's latest test
testResultSchema.index({ userId: 1, createdAt: -1 })

export const TestResult = mongoose.model<ITestResult>('TestResult', testResultSchema)