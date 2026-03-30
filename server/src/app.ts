import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Route non trouvée' })
})

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Erreur:', err)
  res.status(500).json({ error: 'Erreur serveur' })
})

export default app