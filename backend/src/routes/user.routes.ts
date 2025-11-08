import express from 'express'
import { authMe, getAllUsers, updateUserRole, deleteUser } from '../controllers/user.Controller.js';
import { protectRoute } from '../middleware/auth.Middleware.js';
import { isAdmin } from '../middleware/role.Middleware.js';

const router = express.Router();

// Protected routes
router.get('/me', protectRoute, authMe);

// Admin only routes
router.get('/all', protectRoute, isAdmin, getAllUsers);
router.patch('/:userId/role', protectRoute, isAdmin, updateUserRole);
router.delete('/:userId', protectRoute, isAdmin, deleteUser);

export default router;