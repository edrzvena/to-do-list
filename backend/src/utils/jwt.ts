import jwt from 'jsonwebtoken'
import { UserRole } from '../types'

// Isi "gelang" / token — info yang kita titip di dalamnya.
// JANGAN taruh data sensitif (password, dll) di sini, isi token bisa dibaca siapa aja.
export interface JwtPayload {
  id: number
  role: UserRole
}

// Bikin token baru ("kasih gelang") buat user yang berhasil login
export function signToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET belum di-set di .env')
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)
}
