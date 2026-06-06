import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from '../models/userModel'

// POST /api/auth/register
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role, team_id } = req.body

    // 1) Validasi input wajib
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, dan password wajib diisi' })
    }

    // 2) Cek email belum kepake
    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ message: 'Email sudah terdaftar' })
    }

    // 3) Hash password (JANGAN simpan password asli ke DB)
    const password_hash = await bcrypt.hash(password, 10)

    // 4) Simpan ke database
    const user = await createUser({ name, email, password_hash, role, team_id })

    // 5) Balikin data user TANPA password_hash
    const { password_hash: _, ...safeUser } = user
    return res.status(201).json({ message: 'Register berhasil', user: safeUser })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ message: 'Terjadi kesalahan server' })
  }
}
