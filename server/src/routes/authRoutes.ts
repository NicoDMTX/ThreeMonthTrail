import { Router } from 'express'
import { register, login, getProfile } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/register
router.post('/register', register)

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/profile (protégé)
router.get('/profile', authenticate, getProfile)

export default router
