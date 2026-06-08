import { Request, Response } from 'express'
import { findTasksByAssignee } from '../models/taskModel'

// GET /api/tasks  (butuh token -> lewat authMiddleware dulu)
// Balikin semua task milik user yang lagi login.
export async function getTasks(req: Request, res: Response) {
  try {
    // req.user udah diisi sama authMiddleware (id + role dari token)
    if (!req.user) {
      return res.status(401).json({ message: 'Token tidak valid' })
    }

    // Ambil task yang assignee_id-nya = id user di token
    const tasks = await findTasksByAssignee(req.user.id)
    return res.status(200).json({ tasks })
  } catch (err) {
    console.error('Get tasks error:', err)
    return res.status(500).json({ message: 'Terjadi kesalahan server' })
  }
}
