import express from 'express'
import { authMe } from '../controllers/user.Controller.js';

const router = express.Router();

router.get('/me', authMe);

export default router;