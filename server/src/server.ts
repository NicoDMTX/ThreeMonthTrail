import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trail12km'

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connecté à MongoDB')
  } catch (error) {
    console.error('❌ Erreur connexion MongoDB:', error)
    process.exit(1)
  }
}

async function startServer() {
  await connectDB()
  
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
    console.log(`💾 MongoDB: ${MONGODB_URI}`)
  })
}

startServer()
