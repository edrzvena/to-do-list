import { Router } from 'express'
import { getTasks } from '../controllers/taskController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

// Semua route task butuh login -> pasang satpam dulu sebelum controller
router.get('/', authMiddleware, getTasks)   // GET /api/tasks

export default router
