import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './config/db'                       // jalanin koneksi DB pas server nyala
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' })
})

// Semua route auth diawali /api/auth  -> jadi register = /api/auth/register
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
