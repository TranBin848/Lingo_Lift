import type { Request, Response } from 'express'
import { User } from '../models/User.model.js'
import bcrypt from 'bcryptjs'

export const authMe = async (req: Request, res: Response) => {
    try{
        const user = req.user;
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching authenticated user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    })
  }
}

// Update user role (admin only)
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { role } = req.body

    // Validate role
    if (!['user', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be user, teacher, or admin',
      })
    }

    // Check if trying to update own role
    if (req.user?.userId === userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own role',
      })
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: user,
    })
  } catch (error) {
    console.error('Error updating user role:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
    })
  }
}

// Delete user (admin only)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    // Check if trying to delete own account
    if (req.user?.userId === userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      })
    }

    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    })
  }
}

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    console.log('=== Update Profile Request ===');
    console.log('User from middleware:', req.user);
    console.log('Request body:', req.body);
    
    const userId = req.user?._id
    const { displayName, dateOfBirth, phone, bio } = req.body

    if (!userId) {
      console.log('No userId found');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const updateData: any = {}
    if (displayName !== undefined) updateData.displayName = displayName
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth
    if (phone !== undefined) updateData.phone = phone
    if (bio !== undefined) updateData.bio = bio

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
    })
  }
}

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id
    const { currentPassword, newPassword } = req.body

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters',
      })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Error changing password:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
    })
  }
}