export type UserRole = 'member' | 'manager'

// Bentuk data user persis seperti di tabel `users`
export interface User {
  id: number
  name: string
  email: string
  password_hash: string
  role: UserRole
  team_id: number | null
  created_at: Date
}

// Data yang dibutuhkan untuk bikin user baru (register)
export interface CreateUserInput {
  name: string
  email: string
  password_hash: string
  role?: UserRole
  team_id?: number | null
}
