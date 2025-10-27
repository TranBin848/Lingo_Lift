import dotenv from "dotenv";
import { Router, Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = Router()
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || ''
if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI routes will fail until configured.')
}

const genAI = new GoogleGenerativeAI(API_KEY)
const MODEL_NAME = 'gemini-2.5-flash'

type ChatMessage = {
  role: 'user' | 'model'
  content: string
}

function toGeminiHistory(history: ChatMessage[] = []) {
  // Gemini requires the first history message to be from the user.
  // Trim any leading assistant/model messages.
  const firstUserIndex = history.findIndex((h) => h.role === 'user')
  const trimmed = firstUserIndex === -1 ? [] : history.slice(firstUserIndex)
  // Map to Gemini format
  return trimmed.map((m) => ({ role: m.role, parts: [{ text: m.content }] }))
}

// Non-stream chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history }: { message: string; history?: ChatMessage[] } = req.body
    if (!message) return res.status(400).json({ error: 'message is required' })

    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const chat = model.startChat({ history: toGeminiHistory(history) })
    const result = await chat.sendMessage(message)
    const text = result.response.text()
    return res.json({ text })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('AI /chat error:', message)
    return res.status(500).json({ error: 'AI chat failed', detail: message })
  }
})

// Streaming chat via text/event-stream
router.post('/chat/stream', async (req: Request, res: Response) => {
  try {
    const { message, history }: { message: string; history?: ChatMessage[] } = req.body
    if (!message) {
      res.writeHead(400, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      })
      res.write(`event: error\n`)
      res.write(`data: ${JSON.stringify({ error: 'message is required' })}\n\n`)
      return res.end()
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const chat = model.startChat({ history: toGeminiHistory(history) })
    const result = await chat.sendMessageStream(message)

    for await (const chunk of result.stream) {
      const chunkText = await chunk.text()
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
      }
    }
    res.write(`event: end\n`)
    res.write(`data: [DONE]\n\n`)
    res.end()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('AI /chat/stream error:', message)
    try {
      res.write(`event: error\n`)
      res.write(`data: ${JSON.stringify({ error: message || 'AI stream failed' })}\n\n`)
    } finally {
      res.end()
    }
  }
})

export default router
