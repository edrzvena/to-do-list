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

export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'in_progress' | 'done'

// Bentuk data task persis seperti di tabel `tasks`
export interface Task {
  id: number
  title: string
  description: string | null
  priority: TaskPriority
  status: TaskStatus
  deadline: Date | null
  assignee_id: number          // pemilik task
  created_by: number | null    // siapa yang bikin
  created_at: Date
  updated_at: Date
}
