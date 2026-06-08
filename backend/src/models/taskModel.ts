import { pool } from '../config/db'
import { Task } from '../types'

// Ambil semua task milik 1 user (berdasarkan assignee_id = pemilik).
// Urut dari yang terbaru dibuat.
export async function findTasksByAssignee(assigneeId: number): Promise<Task[]> {
  const result = await pool.query<Task>(
    'SELECT * FROM tasks WHERE assignee_id = $1 ORDER BY created_at DESC',
    [assigneeId]
  )
  return result.rows
}
