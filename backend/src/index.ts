import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// Load .env file into process.env — must be called before anything reads env vars
dotenv.config()
import weatherRouter from './routes/weather'
import chatRouter from './routes/chat'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000' // only allow our frontend in development
}))
app.use(express.json()) // parse JSON request bodies

// ── Routes ──────────────────────────────────────────────────
app.use('/api/weather', weatherRouter)
app.use('/api/chat', chatRouter)

// Health check — useful to verify the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── Error handler — must be registered LAST ─────────────────
app.use(errorHandler)

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})