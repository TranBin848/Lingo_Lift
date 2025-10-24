import express, { type Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import authRoutes from './routes/auth.routes.js'
import lessonRoutes from './routes/lesson.routes.js'
import { errorHandler } from './middleware/error.middleware.js'

// Load environment variables
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (_req, res) => {
  res.json({ message: 'Daily English API Server', version: '1.0.0' })
})

app.use('/api/auth', authRoutes)
app.use('/api/lessons', lessonRoutes)

// Error handling middleware
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
