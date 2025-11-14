import type { Request, Response } from 'express'
import { TestResult } from '../models/TestResult.model.js'
import { PlacementTest } from '../models/PlacementTest.model.js'
import mongoose from 'mongoose'

// Start a new test session
export const startTest = async (req: Request, res: Response) => {
  try {
    const { placementTestId } = req.body
    const userId = req.user?.userId

    if (!mongoose.Types.ObjectId.isValid(placementTestId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test ID'
      })
    }

    // Check if test exists and is active
    const placementTest = await PlacementTest.findById(placementTestId)
    if (!placementTest) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      })
    }

    if (!placementTest.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Test is not currently active'
      })
    }

    // Check if user already has an incomplete test
    const existingIncompleteTest = await TestResult.findOne({
      userId,
      placementTestId,
      isCompleted: false
    })

    if (existingIncompleteTest) {
      return res.status(200).json({
        success: true,
        data: existingIncompleteTest,
        message: 'Resumed existing test session'
      })
    }

    // Create new test session
    const testResult = new TestResult({
      userId,
      placementTestId,
      testVersion: placementTest.version,
      startedAt: new Date(),
      currentSection: 'pronunciation',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    await testResult.save()

    res.status(201).json({
      success: true,
      data: testResult,
      message: 'Test session started successfully'
    })
  } catch (error) {
    console.error('Error starting test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to start test'
    })
  }
}

// Submit answers for a section
export const submitSectionAnswers = async (req: Request, res: Response) => {
  try {
    const { testResultId } = req.params
    const { sectionType, answers } = req.body
    const userId = req.user?.userId

    if (!mongoose.Types.ObjectId.isValid(testResultId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test result ID'
      })
    }

    // Validate input
    if (!sectionType || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Section type and answers are required'
      })
    }

    // Get test result
    const testResult = await TestResult.findOne({
      _id: testResultId,
      userId,
      isCompleted: false
    })

    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: 'Test session not found or already completed'
      })
    }

    // Get placement test for answer validation
    const placementTest = await PlacementTest.findById(testResult.placementTestId)
    if (!placementTest) {
      return res.status(404).json({
        success: false,
        message: 'Placement test not found'
      })
    }

    // Find the section in placement test
    const section = placementTest.sections.find(s => s.type === sectionType)
    if (!section) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section type'
      })
    }

    // Process answers and calculate scores
    const userAnswers = answers.map((answer: any) => {
      const question = section.questions.find(q => q.id === answer.questionId)
      if (!question) {
        return null
      }

      const isCorrect = question.correctAnswer.toLowerCase().trim() === 
                       answer.userAnswer.toLowerCase().trim()

      return {
        questionId: answer.questionId,
        sectionType,
        userAnswer: answer.userAnswer,
        isCorrect,
        score: isCorrect ? 1 : 0,
        timeSpent: answer.timeSpent || 0
      }
    }).filter(Boolean)

    // Calculate section result
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length
    const totalQuestions = section.questions.length
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
    const passed = score >= section.passingScore

    const sectionResult = {
      sectionType,
      totalQuestions,
      correctAnswers,
      score,
      timeSpent: userAnswers.reduce((total, a) => total + (a.timeSpent || 0), 0),
      passed
    }

    // Update test result
    testResult.userAnswers.push(...userAnswers)
    
    // Remove existing section result if any, then add new one
    testResult.sectionResults = testResult.sectionResults.filter(
      sr => sr.sectionType !== sectionType
    )
    testResult.sectionResults.push(sectionResult)

    // Update current section
    const sectionOrder = ['pronunciation', 'grammar', 'vocabulary', 'listening', 'reading']
    const currentIndex = sectionOrder.indexOf(sectionType)
    const nextSection = sectionOrder[currentIndex + 1]
    testResult.currentSection = nextSection

    await testResult.save()

    res.status(200).json({
      success: true,
      data: {
        sectionResult,
        nextSection,
        isLastSection: !nextSection
      },
      message: 'Section submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit section'
    })
  }
}

// Complete test and calculate final results
export const completeTest = async (req: Request, res: Response) => {
  try {
    const { testResultId } = req.params
    const userId = req.user?.userId

    if (!mongoose.Types.ObjectId.isValid(testResultId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test result ID'
      })
    }

    const testResult = await TestResult.findOne({
      _id: testResultId,
      userId,
      isCompleted: false
    }).populate('placementTestId')

    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: 'Test session not found or already completed'
      })
    }

    // Calculate overall score
    const totalScore = testResult.sectionResults.length > 0 ?
      testResult.sectionResults.reduce((sum, sr) => sum + sr.score, 0) / testResult.sectionResults.length : 0

    // Determine band score based on scoring criteria
    const placementTest = testResult.placementTestId as any
    let bandScore = 1
    let level = 'Beginner'
    let recommendation = 'Start with basic English fundamentals'

    if (placementTest.scoringCriteria?.bandScores) {
      for (const band of placementTest.scoringCriteria.bandScores) {
        if (totalScore >= band.minScore && totalScore <= band.maxScore) {
          bandScore = band.band
          level = band.description.split(' - ')[0] || level
          recommendation = band.description
          break
        }
      }
    }

    // Update test result
    testResult.isCompleted = true
    testResult.completedAt = new Date()
    testResult.totalScore = totalScore
    testResult.bandScore = bandScore
    testResult.level = level
    testResult.recommendation = recommendation

    await testResult.save()

    res.status(200).json({
      success: true,
      data: testResult,
      message: 'Test completed successfully'
    })
  } catch (error) {
    console.error('Error completing test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to complete test'
    })
  }
}

// Get user's test results
export const getUserTestResults = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { page = 1, limit = 10, isCompleted } = req.query

    const filter: any = { userId }
    if (isCompleted !== undefined) {
      filter.isCompleted = isCompleted === 'true'
    }

    const results = await TestResult.find(filter)
      .populate('placementTestId', 'title version')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))

    const total = await TestResult.countDocuments(filter)

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    })
  } catch (error) {
    console.error('Error getting user test results:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get test results'
    })
  }
}

// Get all test results (admin/teacher only)
export const getAllTestResults = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, userId, testId, isCompleted } = req.query

    const filter: any = {}
    if (userId && mongoose.Types.ObjectId.isValid(userId as string)) {
      filter.userId = userId
    }
    if (testId && mongoose.Types.ObjectId.isValid(testId as string)) {
      filter.placementTestId = testId
    }
    if (isCompleted !== undefined) {
      filter.isCompleted = isCompleted === 'true'
    }

    const results = await TestResult.find(filter)
      .populate('userId', 'displayName username email')
      .populate('placementTestId', 'title version')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))

    const total = await TestResult.countDocuments(filter)

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    })
  } catch (error) {
    console.error('Error getting all test results:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get test results'
    })
  }
}