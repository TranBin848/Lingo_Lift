import express from 'express'
import {
  startTest,
  submitSectionAnswers,
  completeTest,
  getUserTestResults,
  getAllTestResults
} from '../controllers/testResult.Controller.js'
import { protectRoute } from '../middleware/auth.Middleware.js'
import { isTeacher } from '../middleware/role.Middleware.js'

const router = express.Router()

// All routes require authentication
router.use(protectRoute)

// Student routes
router.post('/start', startTest)
router.post('/:testResultId/submit-section', submitSectionAnswers)
router.post('/:testResultId/complete', completeTest)
router.get('/my-results', getUserTestResults)

// Admin/Teacher routes
router.get('/all', isTeacher, getAllTestResults)

export default router