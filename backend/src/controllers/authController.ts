import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from '../models/userModel'
import { signToken } from '../utils/jwt'

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

// POST /api/auth/login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    // 1) Validasi input wajib
    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password wajib diisi' })
    }

    // 2) Cari user-nya
    const user = await findUserByEmail(email)
    if (!user) {
      // Sengaja disamain pesannya sama kasus password salah (lihat di bawah)
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    // 3) Cocokin password yang diketik sama hash di DB
    const passwordCocok = await bcrypt.compare(password, user.password_hash)
    if (!passwordCocok) {
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    // 4) Bikin token ("kasih gelang")
    const token = signToken({ id: user.id, role: user.role })

    // 5) Balikin token + data user TANPA password_hash
    const { password_hash: _, ...safeUser } = user
    return res.status(200).json({ message: 'Login berhasil', token, user: safeUser })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Terjadi kesalahan server' })
  }
}
