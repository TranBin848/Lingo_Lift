import mongoose, { Schema, type Document } from 'mongoose'

// Question types
export interface IPronunciationQuestion {
  type: 'pronunciation'
  id: number
  text: string
  expectedAnswer: string
}

export interface IGrammarQuestion {
  type: 'grammar'
  id: number
  question: string
  options?: string[]
  correctAnswer: string
  subType: 'multiple-choice' | 'error-correction'
}

export interface IVocabularyQuestion {
  type: 'vocabulary'
  id: number
  question: string
  options?: string[]
  correctAnswer: string
  subType: 'fill-blank' | 'synonym' | 'antonym'
}

export interface IListeningQuestion {
  type: 'listening'
  id: number
  audioUrl: string
  question: string
  options?: string[]
  correctAnswer: string
  subType: 'fill-blank' | 'image-based' | 'conversation'
}

export interface IReadingQuestion {
  type: 'reading'
  id: number
  passage?: string
  question: string
  options?: string[]
  correctAnswer: string
  subType: 'comprehension' | 'fill-blank'
  wordBank?: string[]
}

export type IQuestion = 
  | IPronunciationQuestion 
  | IGrammarQuestion 
  | IVocabularyQuestion 
  | IListeningQuestion 
  | IReadingQuestion

// Section interface
export interface ISection {
  type: 'pronunciation' | 'grammar' | 'vocabulary' | 'listening' | 'reading'
  title: string
  description: string
  questions: IQuestion[]
  timeLimit?: number // in minutes
  passingScore: number
}

// Main PlacementTest interface
export interface IPlacementTest extends Document {
  title: string
  description: string
  version: string
  isActive: boolean
  sections: ISection[]
  totalQuestions: number
  totalTimeLimit?: number // in minutes
  scoringCriteria: {
    bandScores: Array<{
      band: number
      minScore: number
      maxScore: number
      description: string
    }>
  }
  createdBy: mongoose.Types.ObjectId
  updatedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const questionSchema = new Schema({
  type: {
    type: String,
    enum: ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading'],
    required: true
  },
  id: { type: Number, required: true },
  text: { type: String }, // for pronunciation
  expectedAnswer: { type: String }, // for pronunciation
  question: { type: String }, // for other types
  audioUrl: { type: String }, // for listening
  passage: { type: String }, // for reading
  options: [{ type: String }], // for multiple choice
  correctAnswer: { type: String, required: true },
  subType: { type: String },
  wordBank: [{ type: String }] // for reading fill-blank
}, { _id: false })

const sectionSchema = new Schema({
  type: {
    type: String,
    enum: ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading'],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  timeLimit: { type: Number }, // in minutes
  passingScore: { type: Number, required: true, min: 0, max: 100 }
}, { _id: false })

const placementTestSchema = new Schema<IPlacementTest>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  version: {
    type: String,
    required: [true, 'Version is required'],
    trim: true,
    default: '1.0.0'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  sections: [sectionSchema],
  totalQuestions: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 question']
  },
  totalTimeLimit: {
    type: Number, // in minutes
    min: [1, 'Time limit must be at least 1 minute']
  },
  scoringCriteria: {
    bandScores: [{
      band: { type: Number, required: true, min: 1, max: 10 },
      minScore: { type: Number, required: true, min: 0, max: 100 },
      maxScore: { type: Number, required: true, min: 0, max: 100 },
      description: { type: String, required: true, trim: true }
    }]
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Indexes for better performance
placementTestSchema.index({ isActive: 1 })
placementTestSchema.index({ createdBy: 1 })
placementTestSchema.index({ version: 1 })

// Virtual for calculating total questions
placementTestSchema.pre('save', function(next) {
  this.totalQuestions = this.sections.reduce((total, section) => total + section.questions.length, 0)
  next()
})

export const PlacementTest = mongoose.model<IPlacementTest>('PlacementTest', placementTestSchema)