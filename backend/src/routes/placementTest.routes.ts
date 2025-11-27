import express from 'express'
import {
  getActiveTest,
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  toggleTestStatus
} from '../controllers/placementTest.Controller.js'
import { protectRoute } from '../middleware/auth.Middleware.js'
import { isAdmin, isTeacher } from '../middleware/role.Middleware.js'

const router = express.Router()

// Public routes (for students to take tests)
router.get('/active', getActiveTest)

// Protected routes - require authentication
router.use(protectRoute)

// Routes for admin and teachers
router.get('/', isTeacher, getAllTests)
router.get('/:testId', isTeacher, getTestById)
router.post('/', isTeacher, createTest)
router.put('/:testId', isTeacher, updateTest)
router.patch('/:testId/status', isTeacher, toggleTestStatus)

// Admin only routes
router.delete('/:testId', isAdmin, deleteTest)

export default router