import { pool } from '../config/db'
import { User, CreateUserInput } from '../types'

// Cari user berdasarkan email (buat cek apakah email udah kepake)
export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0] ?? null
}

// Cari user berdasarkan id (buat /me: ambil profil terbaru dari id di token)
export async function findUserById(id: number): Promise<User | null> {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0] ?? null
}

// Simpan user baru ke database
export async function createUser(input: CreateUserInput): Promise<User> {
  const { name, email, password_hash, role = 'member', team_id = null } = input

  const result = await pool.query<User>(
    `INSERT INTO users (name, email, password_hash, role, team_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, password_hash, role, team_id]
  )
  return result.rows[0]
}
