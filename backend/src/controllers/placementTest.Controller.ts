import type { Request, Response } from 'express'
import { PlacementTest } from '../models/PlacementTest.model.js'
import { TestResult } from '../models/TestResult.model.js'
import mongoose from 'mongoose'

// Get active placement test (for students)
export const getActiveTest = async (req: Request, res: Response) => {
  try {
    const activeTest = await PlacementTest.findOne({ isActive: true })
      .populate('createdBy', 'displayName username')
      .populate('updatedBy', 'displayName username')

    if (!activeTest) {
      return res.status(404).json({
        success: false,
        message: 'No active placement test found'
      })
    }

    res.status(200).json({
      success: true,
      data: activeTest
    })
  } catch (error) {
    console.error('Error getting active test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get active test'
    })
  }
}

// Get all placement tests (for admin/teacher)
export const getAllTests = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query
    
    const filter: any = {}
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true'
    }

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: { createdAt: -1 },
      populate: [
        { path: 'createdBy', select: 'displayName username' },
        { path: 'updatedBy', select: 'displayName username' }
      ]
    }

    const tests = await PlacementTest.find(filter)
      .populate('createdBy', 'displayName username')
      .populate('updatedBy', 'displayName username')
      .sort({ createdAt: -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)

    const total = await PlacementTest.countDocuments(filter)

    res.status(200).json({
      success: true,
      data: tests,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    })
  } catch (error) {
    console.error('Error getting tests:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get tests'
    })
  }
}

// Get single placement test by ID
export const getTestById = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test ID'
      })
    }

    const test = await PlacementTest.findById(testId)
      .populate('createdBy', 'displayName username')
      .populate('updatedBy', 'displayName username')

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      })
    }

    res.status(200).json({
      success: true,
      data: test
    })
  } catch (error) {
    console.error('Error getting test by ID:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get test'
    })
  }
}

// Create new placement test (admin/teacher only)
export const createTest = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      version,
      sections,
      totalTimeLimit,
      scoringCriteria
    } = req.body

    // Validate required fields
    if (!title || !description || !sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and sections are required'
      })
    }

    // Calculate total questions
    const totalQuestions = sections.reduce((total: number, section: any) => 
      total + (section.questions?.length || 0), 0
    )

    if (totalQuestions === 0) {
      return res.status(400).json({
        success: false,
        message: 'Test must have at least one question'
      })
    }

    const newTest = new PlacementTest({
      title,
      description,
      version: version || '1.0.0',
      sections,
      totalQuestions,
      totalTimeLimit,
      scoringCriteria,
      createdBy: req.user?.userId,
      updatedBy: req.user?.userId
    })

    await newTest.save()

    res.status(201).json({
      success: true,
      data: newTest,
      message: 'Placement test created successfully'
    })
  } catch (error) {
    console.error('Error creating test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create test'
    })
  }
}

// Update placement test (admin/teacher only)
export const updateTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params
    const updateData = req.body

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test ID'
      })
    }

    // Recalculate total questions if sections are updated
    if (updateData.sections && Array.isArray(updateData.sections)) {
      updateData.totalQuestions = updateData.sections.reduce((total: number, section: any) => 
        total + (section.questions?.length || 0), 0
      )
    }

    // Update updatedBy field
    updateData.updatedBy = req.user?.userId

    const updatedTest = await PlacementTest.findByIdAndUpdate(
      testId,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'displayName username')
     .populate('updatedBy', 'displayName username')

    if (!updatedTest) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      })
    }

    res.status(200).json({
      success: true,
      data: updatedTest,
      message: 'Placement test updated successfully'
    })
  } catch (error) {
    console.error('Error updating test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update test'
    })
  }
}

// Delete placement test (admin only)
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test ID'
      })
    }

    // Check if test has any results
    const hasResults = await TestResult.countDocuments({ placementTestId: testId })
    
    if (hasResults > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete test that has user results. Consider deactivating instead.'
      })
    }

    const deletedTest = await PlacementTest.findByIdAndDelete(testId)

    if (!deletedTest) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Placement test deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting test:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete test'
    })
  }
}

// Activate/Deactivate placement test (admin/teacher only)
export const toggleTestStatus = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params
    const { isActive } = req.body

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid test ID'
      })
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean'
      })
    }

    // If activating, deactivate all other tests first
    if (isActive) {
      await PlacementTest.updateMany(
        { _id: { $ne: testId } },
        { isActive: false }
      )
    }

    const updatedTest = await PlacementTest.findByIdAndUpdate(
      testId,
      { 
        isActive,
        updatedBy: req.user?.userId
      },
      { new: true }
    )

    if (!updatedTest) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      })
    }

    res.status(200).json({
      success: true,
      data: updatedTest,
      message: `Test ${isActive ? 'activated' : 'deactivated'} successfully`
    })
  } catch (error) {
    console.error('Error toggling test status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update test status'
    })
  }
}