import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/database'
import aiRoutes from './routes/ai.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import placementTestRoutes from './routes/placementTest.routes.js'
import testResultRoutes from './routes/testResult.routes.js'
import cookieParserPkg from 'cookie-parser'
// cookie-parser may not have a default export depending on module interop settings.
const cookieParser = (cookieParserPkg as any)?.default ?? cookieParserPkg
import { protectRoute } from './middleware/auth.Middleware'
// // Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
// Enable CORS for the frontend origin and allow credentialed requests (cookies)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
// Health route
app.get('/', (_req, res) => {
  res.json({ message: 'Daily English API Server', version: '1.0.0' })
})

// AI routes
app.use('/api/ai', aiRoutes)

//public routes
app.use('/api/auth', authRoutes);

// Placement test routes (has both public and private routes)
app.use('/api/placement-tests', placementTestRoutes);

//private routes - Apply protection middleware to specific routes
app.use('/api/users', userRoutes);
app.use('/api/test-results', protectRoute, testResultRoutes);

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



