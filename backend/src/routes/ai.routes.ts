import { Router } from 'express'
import { chat, chatStream } from '../controllers/ai.Controller.js'

const router = Router()

// Non-stream chat
router.post('/chat', chat)

// Streaming chat via text/event-stream
router.post('/chat/stream', chatStream)

export default router
