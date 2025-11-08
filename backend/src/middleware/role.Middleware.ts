import type { Request, Response, NextFunction } from 'express'

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        role: string
      }
    }
  }
}

export const checkRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized - No user found' })
    }

    const userRole = req.user.role

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: 'Forbidden - You do not have permission to access this resource',
      })
    }

    next()
  }
}

export const isAdmin = checkRole('admin')
export const isTeacher = checkRole('teacher', 'admin')
export const isUser = checkRole('user', 'teacher', 'admin')
