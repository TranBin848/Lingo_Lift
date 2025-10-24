import mongoose, { Schema, type Document } from 'mongoose'

export type SkillType = 'listening' | 'speaking' | 'reading' | 'writing'

export interface ILesson extends Document {
  skill: SkillType
  title: string
  prompt?: string
  content?: string
  passage?: string
  options?: string[]
  answerIndex?: number
  keywords?: string[]
  level: 'beginner' | 'intermediate' | 'advanced'
  createdAt: Date
  updatedAt: Date
}

const lessonSchema = new Schema<ILesson>(
  {
    skill: {
      type: String,
      required: true,
      enum: ['listening', 'speaking', 'reading', 'writing'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prompt: String,
    content: String,
    passage: String,
    options: [String],
    answerIndex: Number,
    keywords: [String],
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  {
    timestamps: true,
  }
)

export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema)
