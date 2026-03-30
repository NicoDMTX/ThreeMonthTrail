import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit faire au moins 6 caractères' })
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cet email' })
    }

    // Créer l'utilisateur
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    })

    await user.save()

    // Générer le token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Erreur register:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Erreur login:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId
    const user = await User.findById(userId).select('-password')
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Erreur profile:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
