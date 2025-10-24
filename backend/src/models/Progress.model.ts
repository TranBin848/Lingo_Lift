import mongoose, { Schema, type Document } from 'mongoose'
import type { SkillType } from './Lesson.model.js'

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId
  lessonId: mongoose.Types.ObjectId
  skill: SkillType
  completed: boolean
  score?: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const progressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    skill: {
      type: String,
      required: true,
      enum: ['listening', 'speaking', 'reading', 'writing'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    score: Number,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
)

// Compound index for user + lesson uniqueness
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true })

export const Progress = mongoose.model<IProgress>('Progress', progressSchema)
