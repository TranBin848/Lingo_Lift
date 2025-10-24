import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { Lesson } from '../models/Lesson.model.js'
import { AppError } from '../middleware/error.middleware.js'

const router = Router()

// Get all lessons grouped by skill
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 })

    // Group by skill
    const grouped = {
      listening: lessons.filter((l) => l.skill === 'listening'),
      speaking: lessons.filter((l) => l.skill === 'speaking'),
      reading: lessons.filter((l) => l.skill === 'reading'),
      writing: lessons.filter((l) => l.skill === 'writing'),
    }

    res.json(grouped)
  } catch (error) {
    next(error)
  }
})

// Get lessons by skill
router.get('/:skill', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skill } = req.params
    const lessons = await Lesson.find({ skill }).sort({ createdAt: -1 })
    res.json(lessons)
  } catch (error) {
    next(error)
  }
})

// Get lesson by ID
router.get('/detail/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      throw new AppError('Lesson not found', 404)
    }
    res.json(lesson)
  } catch (error) {
    next(error)
  }
})

// Submit lesson completion (protected route can be added later)
router.post('/:id/complete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      throw new AppError('Lesson not found', 404)
    }

    // Simple validation logic (can be expanded)
    const { answer, score } = req.body
    let correct = false

    if (lesson.skill === 'reading' && lesson.answerIndex !== undefined) {
      correct = answer === lesson.answerIndex
    }

    res.json({
      success: true,
      data: {
        correct,
        score: correct ? 100 : score || 0,
      },
    })
  } catch (error) {
    next(error)
  }
})

export default router
