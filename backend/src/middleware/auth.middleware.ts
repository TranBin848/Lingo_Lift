import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './error.middleware.js'

export interface AuthRequest extends Request {
  userId?: string
}

export const protect = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null

    if (!token) {
      throw new AppError('Not authorized, no token', 401)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string }
    req.userId = decoded.userId
    next()
  } catch (error) {
    next(new AppError('Not authorized, token failed', 401))
  }
}
