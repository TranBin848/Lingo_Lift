import { Router } from 'express'
import type { Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js'
import { AppError } from '../middleware/error.middleware.js'
import type { AuthRequest } from '../middleware/auth.middleware.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

// Register
router.post('/register', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new AppError('User already exists', 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    })

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post('/login', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    // Find user with password
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401)
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    })

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
})

// Get current user
router.get('/me', protect, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
})

// Logout (client-side should remove token)
router.post('/logout', (_req, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' })
})

export default router
