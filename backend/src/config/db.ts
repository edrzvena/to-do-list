import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Pool = kumpulan koneksi ke database yang bisa dipakai ulang (lebih efisien)
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Cek koneksi pas server nyala
pool.connect()
  .then((client) => {
    console.log('✅ Connected to PostgreSQL')
    client.release()
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message)
  })
